/*
 * Password-protected profiles stay on this browser origin. PBKDF2 derives an AES-GCM key; only profile metadata
 * and ciphertext are stored outside the encrypted save. This is local privacy, not an online identity service.
 */
/* Browser-local multi-user profiles; profile data is encrypted with a password-derived AES-GCM key. */
(function installLocalProfileManager() {
  const DATABASE_KEY = 'ss_casino_profiles_v1';
  const DATABASE_VERSION = 1;
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
  const FORMAT = 'ss-casino-encrypted-profile';
  // Expensive password derivation slows offline guessing; keep this setting stable so existing profiles still unlock.
  const PBKDF2_ITERATIONS = 310000;
  const LEGACY_PROFILE_PREFIX = 'ss_casino_profile_v1_';
  const LEGACY_KEYS = [
    'casino_hub_player', 'casino_hub_xp', 'casino_hub_debt',
    'casino_hub_wheel', 'casino_hub_credit_limit', 'casino_hub_max_bet', 'casino_hub_settings',
    'casino_hub_jackpot'
  ];
  // Defaults create a new profile or fill missing fields; valid balances from existing profiles are preserved.
  const DEFAULT_SAVE = Object.freeze({
    player: { balance: 100, lastSpinTime: 0, level: 1, xp: 0, debt: 0, creditLimit: 2000, maxBet: 100 },
    settings: { volume: 80, isMuted: false, theme: 'vegas' },
    jackpot: 10000,
    raceBet: null,
    raceResultNotice: null,
    raceExperience: null,
    slotBonuses: {},
    accomplishments: {},
    revision: 0,
    updatedAt: null
  });

  /** Owns profile creation, unlock, AES-GCM encryption, legacy migration, and ordered localStorage writes. */
  class LocalProfileManager {
    constructor() {
      this.activeProfile = null;
      this.activeKey = null;
      this.currentSave = null;
      this.database = null;
      this.saveQueue = Promise.resolve();
      this.gate = document.getElementById('profile-gate');
      this.content = document.getElementById('profile-gate-content');
      this.profileButton = document.getElementById('btn-profile-manager');
      this.profileName = document.getElementById('active-profile-name');
      this.onProfileChanged = null;
      this.canSwitchProfile = () => true;
      this.busy = false;
    }

    async initialize() {
      if (!window.crypto?.subtle || !window.isSecureContext) {
        this.renderMessage('Secure browser storage is unavailable', 'Open the casino over HTTPS or on localhost in a modern browser to use encrypted profiles. No profile data was changed.');
        throw new Error('Web Crypto is required for encrypted local profiles.');
      }
      this.database = this.readDatabase();
      this.profileButton?.addEventListener('click', () => this.openSwitcher());
      if (this.database.profiles.length === 0) {
        const legacySave = this.readLegacySave();
        legacySave.legacyProfiles = this.readLegacyProfiles();
        await this.showFirstProfileSetup(legacySave);
        if (this.database.profiles.length) this.removeLegacyKeys();
      } else {
        await this.showUnlockScreen();
      }
      this.gate?.classList.add('hidden-view');
      this.updateProfileButton();
    }

    // Treat the persisted envelope as untrusted input and stop if its schema is incomplete or unknown.
    readDatabase() {
      const raw = localStorage.getItem(DATABASE_KEY);
      if (!raw) return { version: DATABASE_VERSION, profiles: [] };
      let value;
      try { value = JSON.parse(raw); } catch (error) {
        this.renderMessage('Local profile data could not be read', 'The profile database is malformed. Do not clear browser storage if you need these profiles.');
        throw new Error('Malformed local profile database.');
      }
      if (value?.version !== DATABASE_VERSION || !Array.isArray(value.profiles)) {
        this.renderMessage('Unsupported local profile data', 'This profile database version is not supported by this app build. No data was changed.');
        throw new Error('Unsupported local profile database.');
      }
      const seen = new Set();
      for (const profile of value.profiles) {
        if (!profile || typeof profile.id !== 'string' || typeof profile.name !== 'string' ||
            typeof profile.salt !== 'string' || typeof profile.iv !== 'string' || typeof profile.ciphertext !== 'string' || seen.has(profile.id)) {
          this.renderMessage('Local profile data could not be read', 'A profile record is incomplete or duplicated. No data was changed.');
          throw new Error('Invalid local profile record.');
        }
        seen.add(profile.id);
      }
      return value;
    }

    readLegacySave() {
      const readJson = key => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (error) { return {}; } };
      const oldPlayer = readJson('casino_hub_player');
      const oldXp = readJson('casino_hub_xp');
      const readNumber = (value, fallback, minimum = 0) => {
        if (value === null || value === undefined || value === '') return fallback;
        const parsed = Number(value);
        return Number.isFinite(parsed) && parsed >= minimum ? parsed : fallback;
      };
      let settings = readJson('casino_hub_settings');
      const themes = ['vegas', 'midnight', 'gold', 'money'];
      settings = {
        volume: Math.max(0, Math.min(100, Math.round(readNumber(settings.volume, 80)))),
        isMuted: settings.isMuted === true,
        theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
      };
      return this.normalizeSave({
        player: {
          balance: readNumber(oldPlayer.balance, 100),
          lastSpinTime: readNumber(localStorage.getItem('casino_hub_wheel'), 0),
          level: Math.max(1, Math.floor(readNumber(oldXp.level, 1, 1))),
          xp: readNumber(oldXp.xp, 0),
          debt: readNumber(localStorage.getItem('casino_hub_debt'), 0),
          creditLimit: readNumber(localStorage.getItem('casino_hub_credit_limit'), 2000),
          maxBet: readNumber(localStorage.getItem('casino_hub_max_bet'), 100, 100)
        },
        settings,
        jackpot: readNumber(localStorage.getItem('casino_hub_jackpot'), 10000)
      });
    }

    removeLegacyKeys() {
      LEGACY_KEYS.forEach(key => { try { localStorage.removeItem(key); } catch (error) { /* best effort */ } });
      try {
        Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
          .filter(key => key?.startsWith(LEGACY_PROFILE_PREFIX))
          .forEach(key => localStorage.removeItem(key));
      } catch (error) { /* encrypted archive already protects profile saves */ }
    }

    readLegacyProfiles() {
      const profiles = [];
      const numberOr = (value, fallback) => {
        if (value === null || value === undefined || value === '') return fallback;
        const number = Number(value);
        return Number.isFinite(number) && number >= 0 ? number : fallback;
      };
      try {
        for (let index = 0; index < localStorage.length; index++) {
          const key = localStorage.key(index);
          if (!key?.startsWith(LEGACY_PROFILE_PREFIX)) continue;
          try {
            const record = JSON.parse(localStorage.getItem(key) || 'null');
            if (!record?.uid || !record.profile || typeof record.profile !== 'object') continue;
            const normalized = this.normalizeSave({ player: record.profile, settings: record.settings });
            profiles.push({
              updatedAtMs: numberOr(record.updatedAtMs, 0),
              player: normalized.player,
              settings: normalized.settings
            });
          } catch (error) { /* Ignore malformed old caches; preserve valid ones. */ }
        }
      } catch (error) { return []; }
      return profiles.sort((a, b) => b.updatedAtMs - a.updatedAtMs).slice(0, 100);
    }

    normalizeSlotBonuses(value) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
      const output = {};
      for (const [id, raw] of Object.entries(value).slice(0, 64)) {
        if (!/^[A-Za-z0-9_-]{1,64}$/.test(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) continue;
        const safe = {};
        const count = (v, fallback = 0) => Number.isSafeInteger(v) && v >= 0 && v <= 1000000 ? v : fallback;
        safe.freeSpinsRemaining = count(raw.freeSpinsRemaining);
        safe.lockedStake = Number.isFinite(raw.lockedStake) && raw.lockedStake >= 0 && raw.lockedStake <= 1000000 ? Math.round(raw.lockedStake * 100) / 100 : 0;
        safe.bonusTotalWin = Number.isFinite(raw.bonusTotalWin) && raw.bonusTotalWin >= 0 && raw.bonusTotalWin <= 100000000 ? Math.round(raw.bonusTotalWin * 100) / 100 : 0;
        if (raw.summary && typeof raw.summary === 'object' && !Array.isArray(raw.summary)) {
          safe.summary = {};
          for (const [key, value] of Object.entries(raw.summary).slice(0, 16)) {
            if (/^[A-Za-z0-9_-]{1,64}$/.test(key) && Number.isFinite(value) && value >= 0 && value <= 100000000) safe.summary[key] = value;
          }
        }
        safe.stickyWildsGrid = Array.isArray(raw.stickyWildsGrid) && raw.stickyWildsGrid.length === 5 && raw.stickyWildsGrid.every(row => Array.isArray(row) && row.length === 3 && row.every(BooleanValue => typeof BooleanValue === 'boolean')) ? raw.stickyWildsGrid.map(row => row.slice()) : Array.from({ length: 5 }, () => [false, false, false]);
        const result = raw.lastResult;
        if (result && (result.status === 'pending' || result.status === 'settled') && Number.isFinite(result.stake) && result.stake >= 0 && Array.isArray(result.lines)) {
          safe.lastResult = { status: result.status, stake: Math.round(result.stake * 100) / 100, payout: Number.isFinite(result.payout) && result.payout >= 0 ? Math.round(result.payout * 100) / 100 : 0, lines: result.lines.slice(0, 32) };
        } else safe.lastResult = null;
        output[id] = safe;
      }
      return output;
    }
    normalizeAccomplishments(value) {
      const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
      const safeIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => typeof id === 'string' && id.length <= 96).slice(0, 128))] : [];
      const history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item === 'object' && typeof item.id === 'string').slice(-50).map(item => ({ ...item, id: item.id.slice(0, 96) })) : [];
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
      const count = v => Number.isSafeInteger(v) && v >= 0 && v <= 100000000 ? v : 0;
      return { version: 1, unlockedIds: safeIds, selectedCosmetic: typeof source.selectedCosmetic === 'string' && source.selectedCosmetic.length <= 96 ? source.selectedCosmetic : 'classic-cabinet', history, stats: { games: count(stats.games), wins: count(stats.wins), races: count(stats.races), raceWins: count(stats.raceWins) } };
    }
    // Trust boundary for stored or imported values: whitelist fields, clamp preferences, and reject impossible race data.
    normalizeSave(value = {}) {
      const input = value && typeof value === 'object' ? value : {};
      const player = input.player && typeof input.player === 'object' ? input.player : {};
      const settings = input.settings && typeof input.settings === 'object' ? input.settings : {};
      const numberOr = (item, fallback, minimum = 0) => {
        if (item === null || item === undefined || item === '') return fallback;
        const number = Number(item);
        return Number.isFinite(number) && number >= minimum ? number : fallback;
      };
      const themes = ['vegas', 'midnight', 'gold', 'money'];
      const raceBet = input.raceBet && typeof input.raceBet === 'object' ? input.raceBet : null;
      const raceResultNotice = input.raceResultNotice && typeof input.raceResultNotice === 'object' ? input.raceResultNotice : null;
      const validRunnerId = value => typeof value === 'string' && /^(horse-(?:[1-6]|[a-z0-9-]+)|car-[a-z0-9-]+)$/.test(value);
      const raceExperience = input.raceExperience && typeof input.raceExperience === 'object' ? input.raceExperience : null;
      const normalizeCircuit = (circuit, type) => {
        if (!circuit || typeof circuit !== 'object') return null;
        const runners = {};
        const prefix = type === 'car' ? 'car-' : 'horse-';
        for (const [runnerId, value] of Object.entries(circuit.runners || {}).slice(0, 64)) {
          if (!runnerId.startsWith(prefix) || !validRunnerId(runnerId) || !value || typeof value !== 'object') continue;
          const starts = numberOr(value.starts, 0, 0);
          const wins = numberOr(value.wins, 0, 0);
          if (Number.isSafeInteger(starts) && Number.isSafeInteger(wins) && starts <= 1_000_000 && wins <= starts) {
            runners[runnerId] = { starts, wins };
          }
        }
        const cursor = circuit.lastProcessedRaceId;
        return {
          lastProcessedRaceId: Number.isSafeInteger(cursor) && cursor >= 0 ? cursor : null,
          runners
        };
      };
      const safeRaceExperience = raceExperience ? {
        horse: normalizeCircuit(raceExperience.horse, 'horse'),
        car: normalizeCircuit(raceExperience.car, 'car')
      } : null;
      const safeRaceBet = raceBet && Number.isSafeInteger(Number(raceBet.raceId)) && Number(raceBet.raceId) >= 0 &&
        validRunnerId(raceBet.runnerId) && validRunnerId(raceBet.winnerId) &&
        (raceBet.raceType === undefined || raceBet.raceType === null || ['horse', 'car'].includes(raceBet.raceType)) &&
        Number.isFinite(Number(raceBet.stake)) && Number(raceBet.stake) > 0 &&
        Number.isFinite(Number(raceBet.odds)) && Number(raceBet.odds) >= 1 && Number(raceBet.odds) <= 100
        ? {
          raceId: Number(raceBet.raceId),
          raceType: ['horse', 'car'].includes(raceBet.raceType) ? raceBet.raceType : null,
          runnerId: raceBet.runnerId,
          winnerId: raceBet.winnerId,
          stake: Math.round(Number(raceBet.stake) * 100) / 100,
          odds: Math.round(Number(raceBet.odds) * 100) / 100,
          durationMs: Number.isSafeInteger(Number(raceBet.durationMs)) &&
            Number(raceBet.durationMs) >= 110_000 && Number(raceBet.durationMs) <= 200_000
            ? Number(raceBet.durationMs)
            : null
        }
        : null;
      const safeRaceResultNotice = raceResultNotice && Number.isSafeInteger(Number(raceResultNotice.raceId)) && Number(raceResultNotice.raceId) >= 0 &&
        validRunnerId(raceResultNotice.runnerId) && validRunnerId(raceResultNotice.winnerId) &&
        (raceResultNotice.raceType === undefined || raceResultNotice.raceType === null || ['horse', 'car'].includes(raceResultNotice.raceType)) &&
        Number.isFinite(Number(raceResultNotice.stake)) && Number(raceResultNotice.stake) > 0 &&
        Number.isFinite(Number(raceResultNotice.payout)) && Number(raceResultNotice.payout) >= 0 &&
        typeof raceResultNotice.won === 'boolean'
        ? {
          raceId: Number(raceResultNotice.raceId),
          raceType: ['horse', 'car'].includes(raceResultNotice.raceType) ? raceResultNotice.raceType : null,
          runnerId: raceResultNotice.runnerId,
          winnerId: raceResultNotice.winnerId,
          stake: Math.round(Number(raceResultNotice.stake) * 100) / 100,
          payout: Math.round(Number(raceResultNotice.payout) * 100) / 100,
          won: raceResultNotice.won
        }
        : null;
      return {
        player: {
          balance: numberOr(player.balance, 100),
          lastSpinTime: numberOr(player.lastSpinTime, 0),
          level: Math.max(1, Math.floor(numberOr(player.level, 1, 1))),
          xp: numberOr(player.xp, 0),
          debt: numberOr(player.debt, 0),
          creditLimit: numberOr(player.creditLimit, 2000),
          maxBet: numberOr(player.maxBet, 100, 100)
        },
        settings: {
          volume: Math.max(0, Math.min(100, Math.round(numberOr(settings.volume, 80)))),
          isMuted: settings.isMuted === true,
          theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
        },
        jackpot: numberOr(input.jackpot, 10000),
        raceBet: safeRaceBet,
        raceResultNotice: safeRaceResultNotice,
        raceExperience: safeRaceExperience,
        slotBonuses: this.normalizeSlotBonuses(input.slotBonuses),
        accomplishments: this.normalizeAccomplishments(input.accomplishments),
        revision: Number.isSafeInteger(input.revision) && input.revision >= 0 ? input.revision : 0,
        updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : null,
        legacyProfiles: Array.isArray(input.legacyProfiles) ? input.legacyProfiles.slice(0, 100).map(profile => {
          const archived = profile && typeof profile === 'object' ? profile : {};
          const archivedSave = this.normalizeSave({ player: archived.player, settings: archived.settings });
          return { updatedAtMs: numberOr(archived.updatedAtMs, 0), player: archivedSave.player, settings: archivedSave.settings };
        }) : []
      };
    }

    // PBKDF2 uses a random per-profile salt; the derived key itself is not written into browser storage.
    async deriveKey(password, salt) {
      const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
      return crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
        material,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
    }

    additionalData(profile) {
      return new TextEncoder().encode(`${FORMAT}:${profile.id}:${profile.name}`);
    }

    // AES-GCM authenticates contents and profile identity; every encryption uses a fresh random 96-bit IV.
    async encryptSave(profile, key, save) {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const profileSave = this.normalizeSave(save);
      delete profileSave.jackpot;
      const ciphertext = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv, additionalData: this.additionalData(profile) },
        key,
        new TextEncoder().encode(JSON.stringify(profileSave))
      );
      return { iv: this.toBase64(iv), ciphertext: this.toBase64(new Uint8Array(ciphertext)) };
    }

    // Wrong passwords or modified ciphertext fail authentication instead of returning partial profile data.
    async decryptSave(profile, key) {
      const plaintext = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: this.fromBase64(profile.iv), additionalData: this.additionalData(profile) },
        key,
        this.fromBase64(profile.ciphertext)
      );
      return this.normalizeSave(JSON.parse(new TextDecoder().decode(plaintext)));
    }

    toBase64(bytes) { return btoa(String.fromCharCode(...bytes)); }
    fromBase64(text) { return Uint8Array.from(atob(text), character => character.charCodeAt(0)); }

    writeDatabase() {
      const text = JSON.stringify(this.database);
      try { localStorage.setItem(DATABASE_KEY, text); return true; }
      catch (error) { window.LocalSave?.setStatus('Profile storage failed; no successful save was reported.', 'warning'); return false; }
    }

    setContent(title, description, includeCancel = false) {
      this.content.replaceChildren();
      const heading = document.createElement('h2');
      heading.id = 'profile-gate-title';
      heading.textContent = title;
      const subtitle = document.createElement('p');
      subtitle.className = 'profile-subtitle';
      subtitle.textContent = description;
      this.content.append(heading, subtitle);
      const form = document.createElement('div');
      form.className = 'profile-form';
      this.content.append(form);
      const feedback = document.createElement('div');
      feedback.className = 'profile-feedback';
      feedback.setAttribute('aria-live', 'polite');
      this.content.append(feedback);
      if (includeCancel) {
        const cancel = document.createElement('button');
        cancel.className = 'profile-secondary-btn';
        cancel.type = 'button';
        cancel.textContent = 'Cancel';
        cancel.addEventListener('click', () => this.gate.classList.add('hidden-view'));
        form.append(cancel);
      }
      return { form, feedback };
    }

    addField(form, labelText, type, autocomplete, maxLength = 64) {
      const label = document.createElement('label');
      label.className = 'profile-field';
      label.textContent = labelText;
      const input = document.createElement('input');
      input.type = type;
      input.autocomplete = autocomplete;
      input.maxLength = maxLength;
      input.required = true;
      if (type === 'password') input.minLength = 8;
      label.append(input);
      form.append(label);
      return input;
    }

    addButton(form, text, className = 'profile-primary-btn') {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = className;
      button.textContent = text;
      form.append(button);
      return button;
    }

    addNote(text) {
      const note = document.createElement('p');
      note.className = 'profile-note';
      note.textContent = text;
      this.content.append(note);
    }

    renderMessage(title, message) {
      const { feedback } = this.setContent(title, message);
      feedback.textContent = 'No data has been changed.';
    }

    async showFirstProfileSetup(legacySave) {
      this.gate?.classList.remove('hidden-view');
      const { form, feedback } = this.setContent(
        'Create your first profile',
        'Set up a password-protected profile on this browser. Your game data will be encrypted and kept on this device.'
      );
      const legacyDataExists = LEGACY_KEYS.some(key => localStorage.getItem(key) !== null) || this.readLegacyProfiles().length > 0;
      if (legacyDataExists) {
        const migration = document.createElement('p');
        migration.className = 'profile-migration-note';
        migration.textContent = 'Your existing local casino progress will be moved into this first profile.';
        this.content.insertBefore(migration, form);
      }
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
      const create = this.addButton(form, 'Create protected profile');
      create.addEventListener('click', async () => {
        feedback.textContent = '';
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
        create.disabled = true;
        try {
          await this.createProfile(name.value, password.value, legacySave);
          if (this.database.profiles.length) this.removeLegacyKeys();
          this.updateProfileButton();
        } catch (error) {
          feedback.textContent = error.message || 'Could not create the profile. Check browser storage and try again.';
          create.disabled = false;
        }
      });
      this.addNote('Profiles are local to this browser and do not sync between devices. Keep your password safe: it cannot be reset or recovered. Export a save backup from inside the game for portability.');
      await new Promise(resolve => { this.finishInitialSetup = resolve; });
    }

    async showUnlockScreen(isStartup = true) {
      this.gate?.classList.remove('hidden-view');
      const { form, feedback } = this.setContent(
        'Choose a local profile',
        'Enter that profile’s password to decrypt its casino save on this device.',
        !isStartup
      );
      const list = document.createElement('div');
      list.className = 'profile-list';
      this.content.insertBefore(list, form);
      const selected = { profile: null };
      this.database.profiles.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(profile => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'profile-choice-btn';
        button.textContent = profile.name;
        button.addEventListener('click', () => {
          selected.profile = profile;
          list.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
          password.disabled = false;
          unlock.disabled = false;
          password.focus();
          feedback.textContent = '';
        });
        list.append(button);
      });
      const password = this.addField(form, 'Profile password', 'password', 'current-password', 128);
      password.disabled = true;
      const unlock = this.addButton(form, 'Unlock profile');
      unlock.disabled = true;
      const create = this.addButton(form, 'Create another profile', 'profile-secondary-btn');
      create.addEventListener('click', () => this.showAdditionalProfileSetup());
      unlock.addEventListener('click', async () => {
        if (!selected.profile) { feedback.textContent = 'Choose a profile first.'; return; }
        unlock.disabled = true;
        feedback.textContent = 'Unlocking…';
        try {
          const profile = selected.profile;
          const key = await this.deriveKey(password.value, this.fromBase64(profile.salt));
          const save = await this.decryptSave(profile, key);
          await this.activateProfile(profile, key, save);
          if (isStartup) {
            if (this.finishInitialUnlock) this.finishInitialUnlock();
          } else {
            this.gate.classList.add('hidden-view');
            await this.onProfileChanged?.(this.getCurrentSave(), profile);
          }
          this.updateProfileButton();
        } catch (error) {
          feedback.textContent = 'That password did not unlock this profile. Try again.';
          password.value = '';
          unlock.disabled = false;
          password.focus();
        }
      });
      password.addEventListener('keydown', event => { if (event.key === 'Enter' && !unlock.disabled) unlock.click(); });
      this.addNote('The password encrypts profile data in this browser. Forgetting it means the encrypted profile cannot be recovered. Profiles and passwords are not uploaded or synchronized.');
      if (isStartup) await new Promise(resolve => { this.finishInitialUnlock = resolve; });
    }

    async showAdditionalProfileSetup() {
      const { form, feedback } = this.setContent('Create a profile', 'Each profile has its own password, chips, level, loans, daily bonus, and settings.');
      const back = this.addButton(form, 'Back to profile list', 'profile-secondary-btn');
      back.addEventListener('click', () => this.showUnlockScreen(!this.activeProfile));
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
      const create = this.addButton(form, 'Create and open profile');
      create.addEventListener('click', async () => {
        feedback.textContent = '';
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
        create.disabled = true;
        try {
          const profile = await this.createProfile(name.value, password.value, DEFAULT_SAVE);
          if (this.finishInitialUnlock) this.finishInitialUnlock();
          this.gate.classList.add('hidden-view');
          this.updateProfileButton();
          await this.onProfileChanged?.(this.getCurrentSave(), profile);
        } catch (error) {
          feedback.textContent = error.message || 'Could not create the profile.';
          create.disabled = false;
        }
      });
    }

    // Validate and normalize names before generating fresh salt and encrypting the new profile save.
    async createProfile(nameValue, password, initialSave) {
      const name = nameValue.trim().replace(/\s+/g, ' ');
      if (!name || name.length > 24) throw new Error('Profile names must be 1–24 characters.');
      if (this.database.profiles.some(profile => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
        throw new Error('A profile with that name already exists.');
      }
      if (password.length < 8 || password.length > 128) throw new Error('Passwords must be 8–128 characters.');
      const profile = {
        id: crypto.randomUUID(), name, createdAt: new Date().toISOString(),
        salt: this.toBase64(crypto.getRandomValues(new Uint8Array(16))), iv: '', ciphertext: ''
      };
      const key = await this.deriveKey(password, this.fromBase64(profile.salt));
      const sealed = await this.encryptSave(profile, key, initialSave);
      profile.iv = sealed.iv;
      profile.ciphertext = sealed.ciphertext;
      this.database.profiles.push(profile);
      if (!this.writeDatabase()) { this.database.profiles = this.database.profiles.filter(item => item !== profile); throw new Error('Profile could not be durably saved. No legacy data was removed.'); }
      await this.activateProfile(profile, key, initialSave);
      if (this.finishInitialSetup) this.finishInitialSetup();
      return profile;
    }

    async activateProfile(profile, key, save) {
      await this.flushSave();
      this.activeProfile = profile;
      this.activeKey = key;
      this.currentSave = this.normalizeSave(save);
      this.lastDurableSave = this.currentSave;
      this.durableProfileId = profile.id;
    }

    openSwitcher() {
      if (!this.canSwitchProfile()) {
        alert('Finish the current game round and return to the lobby before switching profiles.');
        return;
      }
      this.gate?.classList.remove('hidden-view');
      this.showUnlockScreen(false);
    }

    async getSelectedProfileAndUnlock(profile, password, feedback) {
      try {
        const key = await this.deriveKey(password, this.fromBase64(profile.salt));
        const save = await this.decryptSave(profile, key);
        await this.activateProfile(profile, key, save);
        this.gate?.classList.add('hidden-view');
        this.updateProfileButton();
        await this.onProfileChanged?.(this.getCurrentSave(), profile);
      } catch (error) {
        feedback.textContent = 'That password did not unlock this profile. Try again.';
      }
    }

    getCurrentSave() {
      return this.normalizeSave(this.currentSave || DEFAULT_SAVE);
    }

    // Snapshot normalized data and queue encryption so rapid updates stay ordered and profile switches cannot cross-write.
    saveCurrent(partial = {}) {
      if (!this.activeProfile || !this.activeKey) return Promise.resolve(false);
      const previous = this.currentSave;
      if (this.durableProfileId !== this.activeProfile.id || !this.lastDurableSave) { this.lastDurableSave = previous; this.durableProfileId = this.activeProfile.id; }
      const snapshot = this.normalizeSave({ ...previous, ...partial, revision: Math.max(Number(previous?.revision) || 0, Number(partial.revision) || 0) + 1, updatedAt: new Date().toISOString() });
      const changes = Object.fromEntries(Object.keys(partial).map(key => [key, snapshot[key]]));
      this.currentSave = snapshot;
      const profileId = this.activeProfile.id;
      const task = this.saveQueue.catch(() => false).then(async () => {
        const profile = this.database.profiles.find(item => item.id === profileId);
        if (!profile || !this.activeKey || this.activeProfile?.id !== profileId) return false;
        // Rebase only this call's fields on the last successful write, not a failed optimistic predecessor.
        const durableSnapshot = this.normalizeSave({ ...this.lastDurableSave, ...changes, revision: snapshot.revision, updatedAt: snapshot.updatedAt });
        const oldRecord = { iv: profile.iv, ciphertext: profile.ciphertext, updatedAt: profile.updatedAt };
        try {
          const sealed = await this.encryptSave(profile, this.activeKey, durableSnapshot);
          profile.iv = sealed.iv; profile.ciphertext = sealed.ciphertext; profile.updatedAt = new Date().toISOString();
          if (!this.writeDatabase()) throw new Error('Profile storage failed');
          this.lastDurableSave = durableSnapshot;
          if (this.currentSave === snapshot) this.currentSave = durableSnapshot;
          return true;
        } catch (error) {
          profile.iv = oldRecord.iv; profile.ciphertext = oldRecord.ciphertext; profile.updatedAt = oldRecord.updatedAt;
          if (this.currentSave === snapshot) this.currentSave = this.lastDurableSave;
          console.error('Encrypted local profile save failed.', error);
          window.LocalSave?.setStatus('Profile encryption could not be saved to this browser. Export a backup and check available storage.', 'warning');
          return false;
        }
      });
      this.saveQueue = task;
      return task;
    }
    // Wait for the previous profile write before changing the active encryption key.
    async flushSave() { return await this.saveQueue.catch(() => false); }

    updateProfileButton() {
      if (this.profileName) this.profileName.textContent = this.activeProfile ? this.activeProfile.name : 'Choose profile';
    }
  }

  window.LocalProfileManager = LocalProfileManager;
})();
