/*
 * Local save-file controller: encrypted browser profiles are the normal store; JSON backups and linked files are
 * optional portability tools. Backup JSON is unencrypted, so this module never describes it as an encrypted profile.
 */
/* global Player */
(function installLocalSaveManager() {
  const FILE_FORMAT = 'ss-casino-local-save';
  const FILE_SCHEMA_VERSION = 2;
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
  const MAX_JSON_BYTES = 1024 * 1024;
  const HANDLE_DB_NAME = 'ss-casino-local-save-files';
  const HANDLE_STORE_NAME = 'handles';
  const HANDLE_KEY = 'primary-save-file';
  const DEFAULT_SETTINGS = Object.freeze({ volume: 80, isMuted: false, theme: 'vegas' });
  const THEMES = new Set(['vegas', 'midnight', 'gold', 'money']);

  /** Coordinates backup/import, optional File System Access linking, and UI refresh after a save is loaded. */
  class LocalSaveManager {
    constructor({ hub, jackpot, bank, xp, dailyWheel, settings }) {
      this.hub = hub;
      this.jackpot = jackpot;
      this.bank = bank;
      this.xp = xp;
      this.dailyWheel = dailyWheel;
      this.settings = settings;
      this.fileHandle = null;
      this.fileWriteQueue = Promise.resolve(true);
      this.lastLinkedRevision = null;
      this.lastLinkedBytes = null;
      this.openButton = document.getElementById('btn-open-local-save');
      this.modal = document.getElementById('modal-local-save');
      this.closeButton = document.getElementById('btn-close-local-save');
      this.linkButton = document.getElementById('btn-link-save-file');
      this.exportButton = document.getElementById('btn-export-save');
      this.importButton = document.getElementById('btn-import-save');
      this.recoverButton = document.getElementById('btn-recover-legacy-save');
      this.importInput = document.getElementById('local-save-import-input');
      this.status = document.getElementById('local-save-status');
      this.startupOverlay = document.getElementById('startup-overlay');
      this.splashModal = document.getElementById('splash-modal');
      this.skipSplashButton = document.getElementById('btn-skip-splash');
      this.splashReturnFocus = null;
      this.bindEvents();
    }

    // Keep event wiring together so each control has one clear save action.
    bindEvents() {
      this.openButton?.addEventListener('click', () => this.openModal());
      this.closeButton?.addEventListener('click', () => this.closeModal());
      this.modal?.addEventListener('click', (event) => {
        if (event.target === this.modal) this.closeModal();
      });
      this.linkButton?.addEventListener('click', () => this.linkFile());
      this.exportButton?.addEventListener('click', () => this.downloadBackup());
      this.importButton?.addEventListener('click', () => this.importInput?.click());
      this.recoverButton?.addEventListener('click', () => this.recoverLegacyProfile());
      this.importInput?.addEventListener('change', (event) => this.importSelectedFile(event));
      this.skipSplashButton?.addEventListener('click', () => this.dismissSplash());
      this.splashModal?.addEventListener('animationend', (event) => {
        if (event.target === this.splashModal && event.animationName === 'ambientGlow') {
          this.dismissSplash();
        }
      });
      document.addEventListener('keydown', (event) => {
        if (!this.splashModal?.classList.contains('active-view')) return;
        if (event.key === 'Escape') this.dismissSplash();
        if (event.key === 'Tab') {
          event.preventDefault();
          this.skipSplashButton?.focus();
        }
      });
    }

    // Restore an authorized file handle when possible, while retaining browser-local saving as the fallback.
    async initialize() {
      this.setStatus('Encrypted browser save is active. File auto-save is optional.', 'local');
      try {
        const handle = await this.readStoredHandle();
        if (handle) {
          if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
            this.setStatus('Browser save is active. Reconnect the linked file to resume file auto-save.', 'warning');
          } else {
            const file = await handle.getFile();
            const bytes = file.size ? await file.text() : '';
            let accepted = true;
            if (bytes) {
              const saved = this.parseSave(bytes);
              const current = this.createSave();
              const olderDate = Number.isFinite(Date.parse(saved.updatedAt)) && Number.isFinite(Date.parse(current.updatedAt)) && Date.parse(saved.updatedAt) < Date.parse(current.updatedAt);
              if (saved.legacy || saved.profileId !== current.profileId || saved.revision < current.revision || olderDate) {
                accepted = false;
                this.setStatus('Linked file is stale, legacy, or belongs to another profile. Neither save was replaced; file auto-save is paused. Import it only if you want to recover that progress.', 'warning');
              } else if (!this.isSameSave(saved, current)) {
                accepted = confirm('The linked file differs from this browser profile. Load it instead? The current browser progress will be preserved in an encrypted recovery snapshot. Cancel keeps both saves unchanged and pauses file auto-save.');
                if (accepted) accepted = await this.applySave(saved);
                else this.setStatus('Both saves were kept unchanged. File auto-save is paused until you review and reconnect the file.', 'warning');
              }
            }
            if (accepted) {
              this.fileHandle = handle; this.lastLinkedBytes = bytes;
              if (bytes || await this.writeToLinkedFile()) this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked');
            } else this.fileHandle = null;
          }
        }
      } catch (error) {
        this.fileHandle = null;
        this.setStatus('Browser save is active. The linked file could not be read; reconnect it or import a backup.', 'warning');
      } finally {
        this.refreshLegacyRecoveryOption();
        this.startupOverlay?.classList.add('hidden-view');
      }
      this.showSplash();
    }

    showSplash() {
      if (!this.splashModal) return;
      this.splashReturnFocus = document.activeElement;
      this.splashModal.classList.replace('hidden-view', 'active-view');
      this.skipSplashButton?.focus({ preventScroll: true });
    }

    dismissSplash() {
      if (!this.splashModal?.classList.contains('active-view')) return;
      this.splashModal.classList.replace('active-view', 'hidden-view');
      if (this.splashReturnFocus?.isConnected) {
        this.splashReturnFocus.focus({ preventScroll: true });
      }
      this.splashReturnFocus = null;
    }

    openModal() {
      this.modal?.classList.replace('hidden-view', 'active-view');
    }

    closeModal() {
      this.modal?.classList.replace('active-view', 'hidden-view');
    }

    setStatus(message, state = 'local') {
      if (!this.status) return;
      this.status.textContent = message;
      this.status.dataset.state = state;
    }

    recoveryKey() { return `${RECOVERY_KEY}:${window.LocalProfiles?.activeProfile?.id || 'none'}`; }

    currentRevision() { return Number(window.LocalProfiles?.getCurrentSave()?.revision) || 0; }
    isSameSave(a, b) {
      const fields = ['profileId','revision','updatedAt','player','settings','jackpot','raceBet','raceResultNotice','raceExperience','slotBonuses','accomplishments'];
      return fields.every(field => JSON.stringify(a?.[field]) === JSON.stringify(b?.[field]));
    }
    // Whitelist portable game fields; never include the profile password, encryption key, or browser credentials.
    createSave() {
      const profile = window.LocalProfiles?.activeProfile;
      const current = window.LocalProfiles?.getCurrentSave() || {};
      return {
        format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
        profileId: profile?.id || null, revision: Number(current.revision) || 0,
        updatedAt: current.updatedAt || new Date().toISOString(),
        player: this.hub.player.toProfile(), settings: this.normalizeSettings(this.settings.getSettings()),
        jackpot: Player.numberOr(this.jackpot.currentJackpot, 10000, 0),
        raceBet: current.raceBet || null, raceResultNotice: current.raceResultNotice || null,
        raceExperience: current.raceExperience || null, slotBonuses: current.slotBonuses || {}, accomplishments: current.accomplishments || {}
      };
    }
    // Validate the versioned envelope and normalize fields before imported JSON reaches live game state.
    parseSave(text) {
      if (typeof text !== 'string' || text.length > MAX_JSON_BYTES) throw new Error('The save file is too large.');
      const data = JSON.parse(text);
      if (!data || data.format !== FILE_FORMAT || ![1, FILE_SCHEMA_VERSION].includes(data.schemaVersion)) throw new Error('This is not a supported S&S Casino Hub save file.');
      const normalized = window.LocalProfiles?.normalizeSave(data) || {};
      const jackpot = Player.numberOr(data.jackpot, NaN, 0);
      if (!Number.isFinite(jackpot)) throw new Error('The save file has an invalid jackpot value.');
      return { ...normalized, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
        profileId: typeof data.profileId === 'string' ? data.profileId : null,
        revision: Number.isSafeInteger(data.revision) && data.revision >= 0 ? data.revision : 0,
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
        jackpot, legacy: data.schemaVersion !== FILE_SCHEMA_VERSION || !data.profileId };
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

    readLegacyProfiles() {
      const archived = window.LocalProfiles?.getCurrentSave().legacyProfiles || [];
      return archived.map(profile => ({
        updatedAtMs: Player.numberOr(profile.updatedAtMs, 0, 0),
        player: Player.fromProfile(profile.player).toProfile(),
        settings: this.normalizeSettings(profile.settings)
      })).sort((a, b) => b.updatedAtMs - a.updatedAtMs);
    }

    refreshLegacyRecoveryOption() {
      let hasRecovery = false;
      try { hasRecovery = !!localStorage.getItem(this.recoveryKey()); } catch (error) { /* Keep the browser save usable. */ }
      const profiles = this.readLegacyProfiles();
      this.recoverButton?.classList.toggle('hidden-view', !hasRecovery && !profiles.length);
      if (this.recoverButton) this.recoverButton.textContent = hasRecovery ? 'Restore previous save' : 'Recover older local profile';
    }

    async recoverLegacyProfile() {
      if (!this.canReplaceSave()) return;
      let save = null;
      try {
        const record = JSON.parse(localStorage.getItem(this.recoveryKey()) || 'null');
        const profile = window.LocalProfiles?.activeProfile;
        if (record?.format === 'ss-casino-encrypted-recovery' && record.profileId === profile?.id && profile && window.LocalProfiles?.activeKey) {
          save = await window.LocalProfiles.decryptSave({ ...profile, iv: record.iv, ciphertext: record.ciphertext }, window.LocalProfiles.activeKey);
        }
      } catch (error) { save = null; }
      if (!save) {
        const profiles = this.readLegacyProfiles();
        if (!profiles.length) { this.refreshLegacyRecoveryOption(); return; }
        const newest = profiles[0]; save = { player: newest.player, settings: newest.settings, jackpot: this.jackpot.currentJackpot };
      }
      if (!confirm('Replace this browser save with the encrypted recovery snapshot? The current save will remain protected until replacement succeeds.')) return;
      const applied = await this.applySave({ ...save, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION, profileId: window.LocalProfiles?.activeProfile?.id || null, revision: this.currentRevision() + 1, updatedAt: new Date().toISOString() });
      if (applied) this.refreshLegacyRecoveryOption();
    }
    canReplaceSave() {
      if (typeof window.canReplaceCasinoSave === 'function' && !window.canReplaceCasinoSave()) {
        this.setStatus('Finish the active game and return to the lobby before replacing a save.', 'warning');
        return false;
      }
      return true;
    }
    // Apply validated data only after a durable recovery snapshot and a successful browser save.
    async applySave(save) {
      if (!this.canReplaceSave()) return false;
      const profiles = window.LocalProfiles; const current = { ...(profiles?.getCurrentSave?.() || {}), player: this.hub.player.toProfile(), settings: this.settings.getSettings() };
      let previousRecovery;
      try { previousRecovery = localStorage.getItem(this.recoveryKey()); }
      catch (error) { this.setStatus('Browser storage could not be read; no progress was replaced.', 'warning'); return false; }
      const restoreRecovery = () => { try { if (previousRecovery === null) localStorage.removeItem(this.recoveryKey()); else localStorage.setItem(this.recoveryKey(), previousRecovery); } catch (error) {} };
      try {
        await profiles?.flushSave?.();
        const active = profiles?.activeProfile, key = profiles?.activeKey;
        if (!active || !key || typeof profiles.encryptSave !== 'function') throw new Error('No active encryption key');
        const sealed = await profiles.encryptSave(active, key, current);
        localStorage.setItem(this.recoveryKey(), JSON.stringify({ format: 'ss-casino-encrypted-recovery', profileId: active.id, iv: sealed.iv, ciphertext: sealed.ciphertext }));
      } catch (error) { this.setStatus('Could not create a durable encrypted recovery snapshot; no save was replaced.', 'warning'); return false; }
      const next = profiles?.normalizeSave ? profiles.normalizeSave({ ...current, ...save, jackpot: Number.isFinite(save.jackpot) ? save.jackpot : this.jackpot.currentJackpot, revision: save.revision, updatedAt: save.updatedAt }) : { ...current, ...save };
      this.fileHandle = null;
      const durable = await (profiles?.saveCurrent?.(next) ?? false);
      if (!durable) { profiles.currentSave = current; restoreRecovery(); this.setStatus('Browser storage failed; replacement was not durably saved.', 'warning'); return false; }
      this.hub.player = Player.fromProfile(next.player, profiles?.activeProfile?.name || 'Player'); this.settings.applySettings?.(next.settings); this.jackpot.setJackpot?.(next.jackpot);
      window.RaceGame?.resetForActiveProfile?.(); await window.refreshCasinoSaveState?.(next); this.hub.updateGlobalUI?.(); this.bank?.updateModalUI?.(); this.xp?.updateUI?.(); this.dailyWheel?.updateUI?.();
      this.refreshLegacyRecoveryOption();
      this.setStatus('Local save loaded. The previous progress is available with Restore previous save.', 'local'); return true;
    }
    // Linking needs the user's explicit browser file-picker choice; unsupported browsers keep download/import backups.
    async linkFile() {
      if (typeof window.showSaveFilePicker !== 'function') { this.setStatus('Direct file auto-save is not supported in this browser. Use Download save backup and Import save file instead.', 'warning'); return false; }
      try {
        const handle = await window.showSaveFilePicker({ suggestedName: 'ss-casino-save.json', types: [{ description: 'S&S Casino Hub save file', accept: { 'application/json': ['.json'] } }] });
        const file = await handle.getFile(); let existingSave = null; let bytes = '';
        if (file.size > 0) {
          bytes = await file.text(); try { existingSave = this.parseSave(bytes); } catch (error) { alert('That file is not a valid S&S Casino Hub save. Choose a different file or import a valid JSON backup.'); return false; }
          const activeId = window.LocalProfiles?.activeProfile?.id || null;
          if (existingSave.legacy || (existingSave.profileId && existingSave.profileId !== activeId) || existingSave.revision < this.currentRevision() || Date.parse(existingSave.updatedAt) < Date.parse(this.createSave().updatedAt)) { this.setStatus('Linked save is stale, legacy, or for another profile. It was not loaded or overwritten; use Import after reviewing it.', 'warning'); return false; }
          if (!this.isSameSave(existingSave, this.createSave()) && (!this.canReplaceSave() || !confirm('This file differs from the current browser save. Replace the browser save with it?'))) return false;
        }
        if (existingSave && !await this.applySave(existingSave)) return false;
        this.fileHandle = handle; if (!await this.storeHandle(handle)) { this.fileHandle = null; return false; }
        this.lastLinkedBytes = bytes; this.lastLinkedRevision = existingSave?.revision ?? this.currentRevision();
        if (!await this.writeToLinkedFile()) { this.fileHandle = null; return false; }
        this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked'); return true;
      } catch (error) { if (error?.name !== 'AbortError') this.setStatus('Could not link that file. Browser-local saving is still active; use Download save backup instead.', 'warning'); return false; }
    }

    // A promise queue keeps rapid writes ordered so an older save cannot finish after and replace a newer one.
    queueFileSave() {
      if (!this.fileHandle) return Promise.resolve(false); const fileHandle = this.fileHandle; const saveText = JSON.stringify(this.createSave(), null, 2);
      this.fileWriteQueue = this.fileWriteQueue.catch(() => false).then(async () => {
        if (this.fileHandle !== fileHandle) return false;
        if (await window.LocalProfiles?.flushSave?.() === false) { this.fileHandle = null; this.setStatus('Browser storage failed; file auto-save is paused to protect the backup.', 'warning'); return false; }
        const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
        if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused. Review it and link it again.', 'warning'); return false; }
        const writable = await fileHandle.createWritable(); await writable.write(saveText); await writable.close(); this.lastLinkedBytes = saveText; this.lastLinkedRevision = this.createSave().revision; this.setStatus(`Saved in this browser and linked file: ${fileHandle.name}`, 'linked'); return true;
      }).catch(error => { this.fileHandle = null; this.setStatus('Linked file auto-save failed; browser save remains active and file linking is paused.', 'warning'); return false; }); return this.fileWriteQueue;
    }
    async writeToLinkedFile() {
      if (!this.fileHandle) return false; const fileHandle = this.fileHandle; const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
      if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused.', 'warning'); return false; }
      const text = JSON.stringify(this.createSave(), null, 2); const writable = await fileHandle.createWritable(); await writable.write(text); await writable.close(); this.lastLinkedBytes = text; return true;
    }

    async switchProfile() {
      await this.fileWriteQueue.catch(() => {});
      this.fileHandle = null; this.lastLinkedBytes = null;
      this.refreshLegacyRecoveryOption();
      this.setStatus('Encrypted profile save is active in this browser. Choose a save file to link this profile.', 'local');
    }

    // A Blob URL lets the browser download a portable JSON copy without uploading anything.
    downloadBackup() {
      const blob = new Blob([JSON.stringify(this.createSave(), null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ss-casino-save-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      this.setStatus('Save backup downloaded to your device.', this.fileHandle ? 'linked' : 'local');
    }

    // Confirm before replacing the active save and clear the input so the same file can be selected again.
    async importSelectedFile(event) {
      const file = event.target.files?.[0];
      if (!file) return;
      try {
        const save = this.parseSave(await file.text());
        if (!this.canReplaceSave()) return;
        if (!confirm('Importing this file replaces the casino save currently stored in this browser. Continue?')) return;
        this.fileHandle = null;
        const applied = await this.applySave(save);
        if (!applied) throw new Error('Save replacement was not durable.');
      } catch (error) {
        alert(error instanceof SyntaxError ? 'The selected file is not valid JSON.' : (error.message || 'Could not import this save file.'));
      } finally {
        event.target.value = '';
      }
    }

    // IndexedDB stores FileSystemFileHandle objects because localStorage cannot structured-clone browser file handles.
    openHandleDatabase() {
      if (!window.indexedDB) return Promise.resolve(null);
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(HANDLE_DB_NAME, 1);
        request.onupgradeneeded = () => {
          if (!request.result.objectStoreNames.contains(HANDLE_STORE_NAME)) {
            request.result.createObjectStore(HANDLE_STORE_NAME);
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    async readStoredHandle() {
      const db = await this.openHandleDatabase();
      if (!db) return null;
      return new Promise((resolve, reject) => {
        const request = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(this.getHandleKey());
        request.onsuccess = () => {
          if (request.result || this.getHandleKey() === HANDLE_KEY) { db.close(); resolve(request.result || null); return; }
          const legacy = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(HANDLE_KEY);
          legacy.onsuccess = () => { db.close(); resolve(legacy.result || null); };
          legacy.onerror = () => { db.close(); reject(legacy.error); };
        };
        request.onerror = () => { db.close(); reject(request.error); };
      });
    }

    async storeHandle(handle) {
      const db = await this.openHandleDatabase();
      if (!db) { this.setStatus('This browser cannot remember file links. Browser saving and manual backups remain available.', 'warning'); return false; }
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(HANDLE_STORE_NAME, 'readwrite');
        transaction.objectStore(HANDLE_STORE_NAME).put(handle, this.getHandleKey());
        transaction.oncomplete = () => { db.close(); resolve(true); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
      });
    }

    getHandleKey() {
      const profileId = window.LocalProfiles?.activeProfile?.id;
      return profileId ? `profile-save-file:${profileId}` : HANDLE_KEY;
    }
  }

  window.LocalSaveManager = LocalSaveManager;
})();
