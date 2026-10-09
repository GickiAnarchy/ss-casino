/* global firebase, Player */
(function installAccountSyncManager() {
  const DEFAULT_SETTINGS = Object.freeze({ volume: 80, isMuted: false, theme: 'vegas' });
  const PROFILE_CACHE_PREFIX = 'ss_casino_profile_v1_';
  const THEMES = new Set(['vegas', 'midnight', 'gold']);

  class AccountSyncManager {
    constructor({ hub, bank, xp, dailyWheel, settings }) {
      this.hub = hub;
      this.bank = bank;
      this.xp = xp;
      this.dailyWheel = dailyWheel;
      this.settings = settings;
      this.auth = null;
      this.db = null;
      this.profileRef = null;
      this.unsubscribeProfile = null;
      this.currentUser = null;
      this.authReady = false;
      this.localVersion = 0;
      this.remoteRevision = 0;
      this.lastCloudSavedAtMs = 0;
      this.lastLocalSavedAtMs = 0;
      this.currentCacheRecord = null;
      this.pendingTimer = null;
      this.syncInProgress = false;
      this.authMode = 'signin';
      this.bindElements();
      this.bindEvents();
      this.renderAccountUI();
      this.start();
    }

    bindElements() {
      this.openButton = document.getElementById('btn-open-account');
      this.modal = document.getElementById('modal-account');
      this.closeButton = document.getElementById('btn-close-account');
      this.form = document.getElementById('account-form');
      this.emailInput = document.getElementById('account-email');
      this.passwordInput = document.getElementById('account-password');
      this.submitButton = document.getElementById('btn-account-submit');
      this.modeButton = document.getElementById('btn-account-mode');
      this.resetPasswordButton = document.getElementById('btn-reset-password');
      this.signOutButton = document.getElementById('btn-account-signout');
      this.formMessage = document.getElementById('account-form-message');
      this.accountIdentity = document.getElementById('account-identity');
      this.syncStatus = document.getElementById('account-sync-status');
      this.startupOverlay = document.getElementById('startup-overlay');
      this.startupMessage = document.getElementById('startup-message');
    }

    bindEvents() {
      this.openButton?.addEventListener('click', () => this.openModal());
      this.closeButton?.addEventListener('click', () => this.closeModal());
      this.modal?.addEventListener('click', (event) => {
        if (event.target === this.modal) this.closeModal();
      });
      this.modeButton?.addEventListener('click', () => this.toggleAuthMode());
      this.resetPasswordButton?.addEventListener('click', () => this.sendPasswordReset());
      this.signOutButton?.addEventListener('click', () => this.signOut());
      this.form?.addEventListener('submit', (event) => {
        event.preventDefault();
        this.submitAuthForm();
      });
      window.addEventListener('online', () => {
        if (this.currentUser) this.scheduleSync(0);
      });
    }

    async start() {
      this.setStartupMessage('Checking your local save and account…');
      const config = window.SS_CASINO_FIREBASE_CONFIG;
      if (!window.firebase || !config?.apiKey || !config?.projectId) {
        await this.activateGuest('Account service is unavailable. Guest progress is saved on this device.');
        return;
      }

      try {
        const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        try {
          await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        } catch (error) {
          // The SDK may already have selected local persistence or the browser may restrict it.
        }
        this.auth.onAuthStateChanged(
          (user) => { this.handleAuthState(user).catch((error) => this.handleAuthFailure(error)); },
          (error) => this.handleAuthFailure(error)
        );
      } catch (error) {
        await this.activateGuest('Account service could not start. Guest progress remains available on this device.');
      }
    }

    async handleAuthState(user) {
      if (user) {
        await this.loadAccount(user);
      } else {
        await this.activateGuest('Playing as a guest. Progress is saved on this device.');
      }
    }

    async handleAuthFailure(error) {
      // Never log authentication values or error objects that may contain user data.
      console.warn('Firebase Authentication is temporarily unavailable.');
      if (!this.authReady && !this.currentUser) {
        await this.activateGuest('Account service is offline. Guest progress is saved on this device.');
      } else {
        this.setSyncStatus('Account connection was interrupted. Your latest progress is still saved on this device.', 'warning');
      }
    }

    async activateGuest(statusMessage) {
      this.authReady = false;
      this.setStartupMessage('Loading your guest save…');
      this.startupOverlay?.classList.remove('hidden-view');
      this.stopProfileListener();
      this.currentUser = null;
      this.profileRef = null;
      this.clearPendingSync();
      this.hub.player = Player.fromLocalStorage(1000);
      this.settings.loadSettings();
      this.refreshGameUI();
      this.authReady = true;
      this.writeGuestCache();
      this.setSyncStatus(statusMessage, 'local');
      this.releaseStartupGate();
      this.renderAccountUI();
    }

    async loadAccount(user) {
      if (this.currentUser?.uid === user.uid && this.authReady) {
        this.renderAccountUI();
        return;
      }

      this.authReady = false;
      this.setStartupMessage('Loading your account save…');
      this.startupOverlay?.classList.remove('hidden-view');
      this.stopProfileListener();
      this.clearPendingSync();
      this.currentUser = user;
      this.profileRef = this.db.collection('users').doc(user.uid);
      const cached = this.readAccountCache(user.uid);
      let remote = null;
      let cloudReadable = false;

      try {
        const document = await this.profileRef.get();
        cloudReadable = true;
        remote = document.exists ? this.normalizeRecord(document.data(), user.uid) : null;
      } catch (error) {
        // Use only this UID's cache (or clean defaults), never the guest or another account.
      }

      let selected;
      let shouldUpload = false;
      if (remote && cached) {
        selected = cached.updatedAtMs > remote.updatedAtMs ? cached : remote;
        shouldUpload = selected === cached && cached.updatedAtMs > remote.updatedAtMs;
      } else if (remote) {
        selected = remote;
      } else if (cached) {
        selected = cached;
        shouldUpload = cloudReadable;
      } else {
        selected = this.defaultRecord();
        shouldUpload = cloudReadable;
      }

      this.lastCloudSavedAtMs = remote?.updatedAtMs || 0;
      this.remoteRevision = remote?.revision || 0;
      this.lastLocalSavedAtMs = selected.updatedAtMs || 0;
      this.localVersion++;
      this.currentCacheRecord = selected;
      this.applyRecord(selected);
      this.writeAccountCache(user.uid, selected);
      this.authReady = true;
      this.releaseStartupGate();
      this.renderAccountUI();

      if (!cloudReadable) {
        this.setSyncStatus(
          cached ? 'Account loaded from this device. Cloud is unavailable; changes will sync when it reconnects.' : 'Account is signed in, but its cloud save could not be reached. A separate local account save is active.',
          'warning'
        );
      } else if (shouldUpload) {
        this.setSyncStatus(remote ? 'This device had the newer save; syncing it to your account…' : 'Creating this account’s separate save…', 'pending');
        this.scheduleSync(0);
      } else {
        this.setSyncStatus('Account save loaded. Changes are saved locally and synced to your account.', 'synced');
      }

      this.subscribeToCloudProfile();
    }

    defaultRecord() {
      return {
        schemaVersion: 1,
        updatedAtMs: Date.now(),
        revision: 0,
        profile: new Player().toProfile(),
        settings: { ...DEFAULT_SETTINGS }
      };
    }

    normalizeRecord(value, uid) {
      const data = value && typeof value === 'object' ? value : {};
      const profile = Player.fromProfile(data.profile || {}).toProfile();
      return {
        schemaVersion: 1,
        uid,
        updatedAtMs: Player.numberOr(data.updatedAtMs, 0, 0),
        revision: Math.max(0, Math.floor(Player.numberOr(data.revision, 0, 0))),
        profile,
        settings: this.normalizeSettings(data.settings)
      };
    }

    normalizeSettings(value) {
      const input = value && typeof value === 'object' ? value : {};
      const volume = Math.round(Player.numberOr(input.volume, DEFAULT_SETTINGS.volume, 0));
      return {
        volume: Math.min(100, volume),
        isMuted: input.isMuted === true,
        theme: THEMES.has(input.theme) ? input.theme : DEFAULT_SETTINGS.theme
      };
    }

    accountCacheKey(uid) {
      return `${PROFILE_CACHE_PREFIX}${uid}`;
    }

    readAccountCache(uid) {
      try {
        const raw = localStorage.getItem(this.accountCacheKey(uid));
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || data.uid !== uid || !data.profile) return null;
        return this.normalizeRecord(data, uid);
      } catch (error) {
        return null;
      }
    }

    writeAccountCache(uid, record) {
      const normalized = this.normalizeRecord(record, uid);
      const cache = { ...normalized, uid };
      try {
        localStorage.setItem(this.accountCacheKey(uid), JSON.stringify(cache));
        this.currentCacheRecord = cache;
        return true;
      } catch (error) {
        this.setSyncStatus('Browser storage is full or unavailable. Cloud sync will continue when possible.', 'warning');
        return false;
      }
    }

    writeGuestCache() {
      try {
        this.hub.player.saveLocalState();
      } catch (error) {
        this.setSyncStatus('Browser storage is unavailable. Your guest progress is currently in memory only.', 'warning');
      }
    }

    applyRecord(record) {
      const safe = this.normalizeRecord(record, this.currentUser?.uid || 'guest');
      this.hub.player = Player.fromProfile(safe.profile, this.currentUser?.email || 'Guest');
      this.settings.applySettings(safe.settings);
      this.refreshGameUI();
    }

    refreshGameUI() {
      this.hub.updateGlobalUI();
      this.bank.updateModalUI();
      this.xp.updateUI();
      this.dailyWheel.updateUI();
    }

    nextSavedAtMs() {
      return Math.max(Date.now(), this.lastLocalSavedAtMs + 1, this.lastCloudSavedAtMs + 1);
    }

    handleLocalSave() {
      if (!this.authReady) return;
      if (!this.currentUser) {
        this.writeGuestCache();
        return;
      }

      const uid = this.currentUser.uid;
      const record = {
        schemaVersion: 1,
        uid,
        updatedAtMs: this.nextSavedAtMs(),
        revision: this.remoteRevision,
        profile: this.hub.player.toProfile(),
        settings: this.settings.getSettings()
      };
      this.lastLocalSavedAtMs = record.updatedAtMs;
      this.localVersion++;
      this.currentCacheRecord = record;
      this.writeAccountCache(uid, record);
      this.setSyncStatus('Saved on this device. Syncing your account…', 'pending');
      this.scheduleSync(700);
    }

    scheduleSync(delay = 700) {
      if (!this.currentUser || !this.profileRef || !this.authReady) return;
      if (this.pendingTimer) clearTimeout(this.pendingTimer);
      this.pendingTimer = setTimeout(() => {
        this.pendingTimer = null;
        this.flushSync().catch(() => {
          this.setSyncStatus('Could not sync right now. Your latest save is safe on this device.', 'warning');
        });
      }, delay);
    }

    clearPendingSync() {
      if (this.pendingTimer) clearTimeout(this.pendingTimer);
      this.pendingTimer = null;
    }

    async flushSync() {
      if (!this.currentUser || !this.profileRef || !this.authReady || this.syncInProgress) return;
      const uid = this.currentUser.uid;
      const capturedVersion = this.localVersion;
      const localRecord = this.currentCacheRecord || {
        schemaVersion: 1,
        updatedAtMs: this.nextSavedAtMs(),
        revision: this.remoteRevision,
        profile: this.hub.player.toProfile(),
        settings: this.settings.getSettings()
      };
      this.syncInProgress = true;

      try {
        const outcome = await this.db.runTransaction(async (transaction) => {
          const document = await transaction.get(this.profileRef);
          const remote = document.exists ? this.normalizeRecord(document.data(), uid) : null;
          if (remote && remote.updatedAtMs > localRecord.updatedAtMs) {
            return { won: false, remote };
          }
          const revision = Math.max(remote?.revision || 0, this.remoteRevision) + 1;
          const payload = {
            schemaVersion: 1,
            updatedAtMs: localRecord.updatedAtMs,
            revision,
            profile: localRecord.profile,
            settings: this.normalizeSettings(localRecord.settings)
          };
          transaction.set(this.profileRef, payload);
          return { won: true, payload };
        });

        if (!this.currentUser || this.currentUser.uid !== uid) return;
        if (outcome.won) {
          this.remoteRevision = outcome.payload.revision;
          this.lastCloudSavedAtMs = outcome.payload.updatedAtMs;
          if (capturedVersion === this.localVersion) {
            this.setSyncStatus('Saved on this device and synced to your account.', 'synced');
          } else {
            this.scheduleSync(0);
          }
        } else {
          const remote = outcome.remote;
          this.remoteRevision = remote.revision;
          this.lastCloudSavedAtMs = remote.updatedAtMs;
          if (this.lastLocalSavedAtMs > remote.updatedAtMs || capturedVersion !== this.localVersion) {
            if (capturedVersion !== this.localVersion && this.lastLocalSavedAtMs <= remote.updatedAtMs) {
              const rebased = {
                schemaVersion: 1,
                uid,
                updatedAtMs: Math.max(Date.now(), remote.updatedAtMs + 1, this.lastLocalSavedAtMs + 1),
                revision: remote.revision,
                profile: this.hub.player.toProfile(),
                settings: this.settings.getSettings()
              };
              this.lastLocalSavedAtMs = rebased.updatedAtMs;
              this.localVersion++;
              this.currentCacheRecord = rebased;
              this.writeAccountCache(uid, rebased);
            }
            this.scheduleSync(0);
          } else {
            this.lastLocalSavedAtMs = remote.updatedAtMs;
            this.currentCacheRecord = remote;
            this.writeAccountCache(uid, remote);
            this.applyRecord(remote);
            this.setSyncStatus('A newer account save was restored from another device.', 'synced');
          }
        }
      } finally {
        this.syncInProgress = false;
      }
    }

    subscribeToCloudProfile() {
      this.stopProfileListener();
      if (!this.profileRef) return;
      this.unsubscribeProfile = this.profileRef.onSnapshot((document) => {
        if (!document.exists || !this.currentUser) return;
        const remote = this.normalizeRecord(document.data(), this.currentUser.uid);
        if (remote.updatedAtMs <= this.lastCloudSavedAtMs) return;
        this.lastCloudSavedAtMs = remote.updatedAtMs;
        this.remoteRevision = remote.revision;

        if (this.lastLocalSavedAtMs > remote.updatedAtMs) {
          this.scheduleSync(0);
          return;
        }

        this.lastLocalSavedAtMs = remote.updatedAtMs;
        this.localVersion++;
        this.currentCacheRecord = remote;
        this.writeAccountCache(this.currentUser.uid, remote);
        this.applyRecord(remote);
        this.setSyncStatus('A newer account save was synced to this device.', 'synced');
      }, () => {
        this.setSyncStatus('Live sync is unavailable. Saves will retry when you make another change.', 'warning');
      });
    }

    stopProfileListener() {
      if (typeof this.unsubscribeProfile === 'function') this.unsubscribeProfile();
      this.unsubscribeProfile = null;
    }

    openModal() {
      this.formMessage.textContent = '';
      this.modal?.classList.replace('hidden-view', 'active-view');
      this.renderAccountUI();
      if (!this.currentUser) this.emailInput?.focus();
    }

    closeModal() {
      this.modal?.classList.replace('active-view', 'hidden-view');
    }

    toggleAuthMode() {
      this.authMode = this.authMode === 'signin' ? 'signup' : 'signin';
      this.formMessage.textContent = '';
      this.renderAccountUI();
    }

    renderAccountUI() {
      const signedIn = !!this.currentUser;
      if (this.openButton) {
        this.openButton.textContent = signedIn ? `👤 ${this.currentUser.email || 'Account'}` : '👤 SIGN IN';
        this.openButton.setAttribute('aria-label', signedIn ? `Account: ${this.currentUser.email || 'signed in'}` : 'Sign in or create an account');
      }
      if (this.accountIdentity) {
        this.accountIdentity.textContent = signedIn ? `Signed in as ${this.currentUser.email || 'your account'}` : 'Guest play is available without an account.';
      }
      if (this.form) this.form.classList.toggle('hidden-view', signedIn);
      if (this.signOutButton) this.signOutButton.classList.toggle('hidden-view', !signedIn);
      if (this.modeButton) {
        this.modeButton.classList.toggle('hidden-view', signedIn);
        this.modeButton.textContent = this.authMode === 'signin' ? 'Create a new account' : 'Already have an account? Sign in';
      }
      if (this.resetPasswordButton) this.resetPasswordButton.classList.toggle('hidden-view', signedIn || this.authMode !== 'signin');
      if (this.submitButton) this.submitButton.textContent = this.authMode === 'signin' ? 'Sign in' : 'Create account';
      if (this.passwordInput) this.passwordInput.autocomplete = this.authMode === 'signin' ? 'current-password' : 'new-password';
    }

    setStartupMessage(message) {
      if (this.startupMessage) this.startupMessage.textContent = message;
    }

    releaseStartupGate() {
      this.startupOverlay?.classList.add('hidden-view');
    }

    setSyncStatus(message, state = 'local') {
      if (!this.syncStatus) return;
      this.syncStatus.textContent = message;
      this.syncStatus.dataset.state = state;
    }

    safeAuthErrorCode(error) {
      const code = error?.code;
      return typeof code === 'string' && code.length <= 80 && /^auth\/[a-z0-9._-]+$/.test(code)
        ? code
        : 'auth/unknown';
    }

    friendlyAuthError(error, includeCode = false) {
      const messages = {
        'auth/email-already-in-use': 'An account already uses that email. Sign in instead.',
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/weak-password': 'Choose a password with at least 6 characters.',
        'auth/user-not-found': 'No account was found for that email.',
        'auth/wrong-password': 'The email or password is incorrect.',
        'auth/invalid-credential': 'The email or password is incorrect.',
        'auth/too-many-requests': 'Too many attempts. Wait a little and try again.',
        'auth/network-request-failed': 'Network unavailable. Check your connection and try again.',
        'auth/unauthorized-domain': 'This website is not authorized for Firebase sign-in yet.'
      };
      const message = messages[error?.code] || 'Sign-in could not be completed. Check your details and try again.';
      return includeCode ? `${message} (Firebase code: ${this.safeAuthErrorCode(error)})` : message;
    }

    async submitAuthForm() {
      if (!this.auth) {
        this.formMessage.textContent = 'Account sign-in is currently unavailable. You can continue as a guest.';
        return;
      }
      const email = this.emailInput.value.trim();
      const password = this.passwordInput.value;
      if (!email || !password) {
        this.formMessage.textContent = 'Enter your email and password to continue.';
        return;
      }
      if (this.authMode === 'signup' && password.length < 6) {
        this.formMessage.textContent = 'Choose a password with at least 6 characters.';
        return;
      }

      this.submitButton.disabled = true;
      this.formMessage.textContent = this.authMode === 'signin' ? 'Signing in…' : 'Creating your account…';
      try {
        if (this.authMode === 'signin') {
          await this.auth.signInWithEmailAndPassword(email, password);
        } else {
          await this.auth.createUserWithEmailAndPassword(email, password);
        }
        this.passwordInput.value = '';
        this.formMessage.textContent = 'Account connected. Loading your separate save…';
      } catch (error) {
        this.formMessage.textContent = this.friendlyAuthError(error, true);
        this.passwordInput.value = '';
      } finally {
        this.submitButton.disabled = false;
      }
    }

    async sendPasswordReset() {
      const email = this.emailInput?.value.trim();
      if (!email) {
        this.formMessage.textContent = 'Enter your email address first.';
        this.emailInput?.focus();
        return;
      }
      this.resetPasswordButton.disabled = true;
      try {
        await this.auth.sendPasswordResetEmail(email);
        this.formMessage.textContent = 'If an account exists for that email, a password-reset message has been sent.';
      } catch (error) {
        this.formMessage.textContent = this.friendlyAuthError(error);
      } finally {
        this.resetPasswordButton.disabled = false;
      }
    }

    async signOut() {
      if (!this.auth) return;
      this.signOutButton.disabled = true;
      try {
        this.clearPendingSync();
        try {
          await this.flushSync();
        } catch (error) {
          // Local account cache remains safe even if the network write cannot finish.
        }
        await this.auth.signOut();
        this.closeModal();
      } catch (error) {
        this.formMessage.textContent = 'Sign-out failed. Please try again.';
      } finally {
        this.signOutButton.disabled = false;
      }
    }
  }

  window.AccountSyncManager = AccountSyncManager;
})();
