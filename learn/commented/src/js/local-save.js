// Original L1: Comment: 
// Original L2: Comment: Local save-file controller: encrypted browser profiles are the normal store; JSON backups and linked files are
// Original L3: Comment: optional portability tools. Backup JSON is unencrypted, so this module never describes it as an encrypted profile.
// Original L4: Comment: 
/*
 * Local save-file controller: encrypted browser profiles are the normal store; JSON backups and linked files are
 * optional portability tools. Backup JSON is unencrypted, so this module never describes it as an encrypted profile.
 */
// Original L5: Comment: global Player */
/* global Player */
// Original L6: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
(function installLocalSaveManager() {
// Original L7: Names the portable JSON envelope so imports cannot be mistaken for unrelated JSON.
  const FILE_FORMAT = 'ss-casino-local-save';
// Original L8: Sets the current portable-save schema to version 2; older version 1 files are accepted then normalized.
  const FILE_SCHEMA_VERSION = 2;
// Original L9: Prefixes encrypted recovery records in localStorage and scopes them by active profile later.
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
// Original L10: Rejects imported text over one mebibyte before JSON parsing, limiting memory/abuse exposure.
  const MAX_JSON_BYTES = 1024 * 1024;
// Original L11: Defines HANDLE_DB_NAME for use by the surrounding persistence logic.
  const HANDLE_DB_NAME = 'ss-casino-local-save-files';
// Original L12: Defines HANDLE_STORE_NAME for use by the surrounding persistence logic.
  const HANDLE_STORE_NAME = 'handles';
// Original L13: Defines HANDLE_KEY for use by the surrounding persistence logic.
  const HANDLE_KEY = 'primary-save-file';
// Original L14: Defines the user-facing defaults: 80% volume, sound enabled, and the Vegas theme.
  const DEFAULT_SETTINGS = Object.freeze({ volume: 80, isMuted: false, theme: 'vegas' });
// Original L15: Whitelists the only theme identifiers that can survive normalization.
  const THEMES = new Set(['vegas', 'midnight', 'gold', 'money']);
// Original L16: Blank line separates related logic for readability.

// Original L17: Comment: Coordinates backup/import, optional File System Access linking, and UI refresh after a save is loaded. */
  /** Coordinates backup/import, optional File System Access linking, and UI refresh after a save is loaded. */
// Original L18: Declares the class that groups this module’s related state and operations.
  class LocalSaveManager {
// Original L19: Implements this module operation and passes its validated result to the next persistence step.
    constructor({ hub, jackpot, bank, xp, dailyWheel, settings }) {
// Original L20: Stores the hub runtime reference/state on this manager so later save operations can reuse it.
      this.hub = hub;
// Original L21: Stores the jackpot runtime reference/state on this manager so later save operations can reuse it.
      this.jackpot = jackpot;
// Original L22: Stores the bank runtime reference/state on this manager so later save operations can reuse it.
      this.bank = bank;
// Original L23: Stores the xp runtime reference/state on this manager so later save operations can reuse it.
      this.xp = xp;
// Original L24: Stores the dailyWheel runtime reference/state on this manager so later save operations can reuse it.
      this.dailyWheel = dailyWheel;
// Original L25: Stores the settings runtime reference/state on this manager so later save operations can reuse it.
      this.settings = settings;
// Original L26: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
      this.fileHandle = null;
// Original L27: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      this.fileWriteQueue = Promise.resolve(true);
// Original L28: Stores the lastLinkedRevision runtime reference/state on this manager so later save operations can reuse it.
      this.lastLinkedRevision = null;
// Original L29: Stores the lastLinkedBytes runtime reference/state on this manager so later save operations can reuse it.
      this.lastLinkedBytes = null;
// Original L30: Finds or creates the UI element used to present this profile/save state.
      this.openButton = document.getElementById('btn-open-local-save');
// Original L31: Finds or creates the UI element used to present this profile/save state.
      this.modal = document.getElementById('modal-local-save');
// Original L32: Finds or creates the UI element used to present this profile/save state.
      this.closeButton = document.getElementById('btn-close-local-save');
// Original L33: Finds or creates the UI element used to present this profile/save state.
      this.linkButton = document.getElementById('btn-link-save-file');
// Original L34: Finds or creates the UI element used to present this profile/save state.
      this.exportButton = document.getElementById('btn-export-save');
// Original L35: Finds or creates the UI element used to present this profile/save state.
      this.importButton = document.getElementById('btn-import-save');
// Original L36: Finds or creates the UI element used to present this profile/save state.
      this.recoverButton = document.getElementById('btn-recover-legacy-save');
// Original L37: Finds or creates the UI element used to present this profile/save state.
      this.importInput = document.getElementById('local-save-import-input');
// Original L38: Finds or creates the UI element used to present this profile/save state.
      this.status = document.getElementById('local-save-status');
// Original L39: Finds or creates the UI element used to present this profile/save state.
      this.startupOverlay = document.getElementById('startup-overlay');
// Original L40: Finds or creates the UI element used to present this profile/save state.
      this.splashModal = document.getElementById('splash-modal');
// Original L41: Finds or creates the UI element used to present this profile/save state.
      this.skipSplashButton = document.getElementById('btn-skip-splash');
// Original L42: Stores the splashReturnFocus runtime reference/state on this manager so later save operations can reuse it.
      this.splashReturnFocus = null;
// Original L43: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.bindEvents();
// Original L44: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L45: Blank line separates related logic for readability.

// Original L46: Comment: Keep event wiring together so each control has one clear save action.
    // Keep event wiring together so each control has one clear save action.
// Original L47: Implements this module operation and passes its validated result to the next persistence step.
    bindEvents() {
// Original L48: Connects this UI event to the corresponding save/profile action when the control exists.
      this.openButton?.addEventListener('click', () => this.openModal());
// Original L49: Connects this UI event to the corresponding save/profile action when the control exists.
      this.closeButton?.addEventListener('click', () => this.closeModal());
// Original L50: Connects this UI event to the corresponding save/profile action when the control exists.
      this.modal?.addEventListener('click', (event) => {
// Original L51: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (event.target === this.modal) this.closeModal();
// Original L52: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L53: Connects this UI event to the corresponding save/profile action when the control exists.
      this.linkButton?.addEventListener('click', () => this.linkFile());
// Original L54: Connects this UI event to the corresponding save/profile action when the control exists.
      this.exportButton?.addEventListener('click', () => this.downloadBackup());
// Original L55: Connects this UI event to the corresponding save/profile action when the control exists.
      this.importButton?.addEventListener('click', () => this.importInput?.click());
// Original L56: Connects this UI event to the corresponding save/profile action when the control exists.
      this.recoverButton?.addEventListener('click', () => this.recoverLegacyProfile());
// Original L57: Connects this UI event to the corresponding save/profile action when the control exists.
      this.importInput?.addEventListener('change', (event) => this.importSelectedFile(event));
// Original L58: Connects this UI event to the corresponding save/profile action when the control exists.
      this.skipSplashButton?.addEventListener('click', () => this.dismissSplash());
// Original L59: Connects this UI event to the corresponding save/profile action when the control exists.
      this.splashModal?.addEventListener('animationend', (event) => {
// Original L60: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (event.target === this.splashModal && event.animationName === 'ambientGlow') {
// Original L61: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.dismissSplash();
// Original L62: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L63: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L64: Connects this UI event to the corresponding save/profile action when the control exists.
      document.addEventListener('keydown', (event) => {
// Original L65: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!this.splashModal?.classList.contains('active-view')) return;
// Original L66: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (event.key === 'Escape') this.dismissSplash();
// Original L67: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (event.key === 'Tab') {
// Original L68: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          event.preventDefault();
// Original L69: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.skipSplashButton?.focus();
// Original L70: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L71: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L72: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L73: Blank line separates related logic for readability.

// Original L74: Comment: Restore an authorized file handle when possible, while retaining browser-local saving as the fallback.
    // Restore an authorized file handle when possible, while retaining browser-local saving as the fallback.
// Original L75: Implements this module operation and passes its validated result to the next persistence step.
    async initialize() {
// Original L76: Advertises that the normal browser save is encrypted while linked-file auto-save is optional.
      this.setStatus('Encrypted browser save is active. File auto-save is optional.', 'local');
// Original L77: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L78: Defines handle for use by the surrounding persistence logic.
        const handle = await this.readStoredHandle();
// Original L79: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (handle) {
// Original L80: Requests read/write permission for the remembered FileSystem handle; anything other than granted pauses auto-save.
          if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
// Original L81: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            this.setStatus('Browser save is active. Reconnect the linked file to resume file auto-save.', 'warning');
// Original L82: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          } else {
// Original L83: Defines file for use by the surrounding persistence logic.
            const file = await handle.getFile();
// Original L84: Defines bytes for use by the surrounding persistence logic.
            const bytes = file.size ? await file.text() : '';
// Original L85: Defines accepted for use by the surrounding persistence logic.
            let accepted = true;
// Original L86: Guards the following operation so invalid, missing, or unsafe state is not applied.
            if (bytes) {
// Original L87: Defines saved for use by the surrounding persistence logic.
              const saved = this.parseSave(bytes);
// Original L88: Defines current for use by the surrounding persistence logic.
              const current = this.createSave();
// Original L89: Compares valid ISO/date strings so an older linked backup is not allowed to overwrite newer browser progress.
              const olderDate = Number.isFinite(Date.parse(saved.updatedAt)) && Number.isFinite(Date.parse(current.updatedAt)) && Date.parse(saved.updatedAt) < Date.parse(current.updatedAt);
// Original L90: Rejects legacy, cross-profile, lower-revision, or older-date files, preventing stale/cross-user replacement.
              if (saved.legacy || saved.profileId !== current.profileId || saved.revision < current.revision || olderDate) {
// Original L91: Assigns the computed accepted value used by the surrounding validation or persistence step.
                accepted = false;
// Original L92: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
                this.setStatus('Linked file is stale, legacy, or belongs to another profile. Neither save was replaced; file auto-save is paused. Import it only if you want to recover that progress.', 'warning');
// Original L93: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
              } else if (!this.isSameSave(saved, current)) {
// Original L94: Requires explicit confirmation before loading a differing file and promises an encrypted recovery snapshot first.
                accepted = confirm('The linked file differs from this browser profile. Load it instead? The current browser progress will be preserved in an encrypted recovery snapshot. Cancel keeps both saves unchanged and pauses file auto-save.');
// Original L95: Guards the following operation so invalid, missing, or unsafe state is not applied.
                if (accepted) accepted = await this.applySave(saved);
// Original L96: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
                else this.setStatus('Both saves were kept unchanged. File auto-save is paused until you review and reconnect the file.', 'warning');
// Original L97: Closes the surrounding block or literal; no independent data transformation occurs here.
              }
// Original L98: Closes the surrounding block or literal; no independent data transformation occurs here.
            }
// Original L99: Guards the following operation so invalid, missing, or unsafe state is not applied.
            if (accepted) {
// Original L100: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
              this.fileHandle = handle; this.lastLinkedBytes = bytes;
// Original L101: Guards the following operation so invalid, missing, or unsafe state is not applied.
              if (bytes || await this.writeToLinkedFile()) this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked');
// Original L102: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            } else this.fileHandle = null;
// Original L103: Closes the surrounding block or literal; no independent data transformation occurs here.
          }
// Original L104: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L105: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) {
// Original L106: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
        this.fileHandle = null;
// Original L107: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.setStatus('Browser save is active. The linked file could not be read; reconnect it or import a backup.', 'warning');
// Original L108: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } finally {
// Original L109: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.refreshLegacyRecoveryOption();
// Original L110: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
        this.startupOverlay?.classList.add('hidden-view');
// Original L111: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L112: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.showSplash();
// Original L113: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L114: Blank line separates related logic for readability.

// Original L115: Implements this module operation and passes its validated result to the next persistence step.
    showSplash() {
// Original L116: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.splashModal) return;
// Original L117: Uses the browser UI/global integration to coordinate this save or profile operation.
      this.splashReturnFocus = document.activeElement;
// Original L118: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.splashModal.classList.replace('hidden-view', 'active-view');
// Original L119: Defines a named field in the save/profile or UI data structure.
      this.skipSplashButton?.focus({ preventScroll: true });
// Original L120: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L121: Blank line separates related logic for readability.

// Original L122: Implements this module operation and passes its validated result to the next persistence step.
    dismissSplash() {
// Original L123: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.splashModal?.classList.contains('active-view')) return;
// Original L124: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.splashModal.classList.replace('active-view', 'hidden-view');
// Original L125: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.splashReturnFocus?.isConnected) {
// Original L126: Defines a named field in the save/profile or UI data structure.
        this.splashReturnFocus.focus({ preventScroll: true });
// Original L127: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L128: Stores the splashReturnFocus runtime reference/state on this manager so later save operations can reuse it.
      this.splashReturnFocus = null;
// Original L129: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L130: Blank line separates related logic for readability.

// Original L131: Implements this module operation and passes its validated result to the next persistence step.
    openModal() {
// Original L132: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.modal?.classList.replace('hidden-view', 'active-view');
// Original L133: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L134: Blank line separates related logic for readability.

// Original L135: Implements this module operation and passes its validated result to the next persistence step.
    closeModal() {
// Original L136: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.modal?.classList.replace('active-view', 'hidden-view');
// Original L137: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L138: Blank line separates related logic for readability.

// Original L139: Implements this module operation and passes its validated result to the next persistence step.
    setStatus(message, state = 'local') {
// Original L140: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.status) return;
// Original L141: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.status.textContent = message;
// Original L142: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.status.dataset.state = state;
// Original L143: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L144: Blank line separates related logic for readability.

// Original L145: Builds a per-profile recovery-storage key, using “none” before a profile exists.
    recoveryKey() { return `${RECOVERY_KEY}:${window.LocalProfiles?.activeProfile?.id || 'none'}`; }
// Original L146: Blank line separates related logic for readability.

// Original L147: Uses the browser UI/global integration to coordinate this save or profile operation.
    currentRevision() { return Number(window.LocalProfiles?.getCurrentSave()?.revision) || 0; }
// Original L148: Implements this module operation and passes its validated result to the next persistence step.
    isSameSave(a, b) {
// Original L149: Chooses the portable fields whose JSON equality determines whether browser and linked saves differ.
      const fields = ['profileId','revision','updatedAt','player','settings','jackpot','raceBet','raceResultNotice','raceExperience','slotBonuses','accomplishments'];
// Original L150: Deep-compares selected fields through JSON serialization; this is equality, not cryptographic integrity.
      return fields.every(field => JSON.stringify(a?.[field]) === JSON.stringify(b?.[field]));
// Original L151: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L152: Documents the portability boundary: passwords, encryption keys, and browser credentials are intentionally excluded.
    // Whitelist portable game fields; never include the profile password, encryption key, or browser credentials.
// Original L153: Implements this module operation and passes its validated result to the next persistence step.
    createSave() {
// Original L154: Defines profile for use by the surrounding persistence logic.
      const profile = window.LocalProfiles?.activeProfile;
// Original L155: Defines current for use by the surrounding persistence logic.
      const current = window.LocalProfiles?.getCurrentSave() || {};
// Original L156: Returns an object with fields format: `FILE_FORMAT` (file format); schemaVersion: `FILE_SCHEMA_VERSION` (file schema version); profileId: uses `profile?.id` (the id property of profile); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to null; revision: uses converts `current.revision` (the revision property of current) to a number (invalid numeric text becomes NaN) when it is truthy, otherwise falls back to 0; updatedAt: uses `current.updatedAt` (the updated at property of current) when it is truthy, otherwise falls back to formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; player: calls `this.hub.player.toProfile` with no arguments; and further fields to the caller and exits this function.
      return {
// Original L157: Writes the format marker and current schema number into every backup.
        format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
// Original L158: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        profileId: profile?.id || null, revision: Number(current.revision) || 0,
// Original L159: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        updatedAt: current.updatedAt || new Date().toISOString(),
// Original L160: Serializes only the validated player/settings and game-progress fields, not profile secrets.
        player: this.hub.player.toProfile(), settings: this.normalizeSettings(this.settings.getSettings()),
// Original L161: Persists the jackpot as a finite nonnegative number, defaulting to 10,000 when invalid.
        jackpot: Player.numberOr(this.jackpot.currentJackpot, 10000, 0),
// Original L162: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        raceBet: current.raceBet || null, raceResultNotice: current.raceResultNotice || null,
// Original L163: Defines a named field in the save/profile or UI data structure.
        raceExperience: current.raceExperience || null, slotBonuses: current.slotBonuses || {}, accomplishments: current.accomplishments || {}
// Original L164: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L165: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L166: Marks parseSave as the trust boundary where version and field normalization happen before game mutation.
    // Validate the versioned envelope and normalize fields before imported JSON reaches live game state.
// Original L167: Implements this module operation and passes its validated result to the next persistence step.
    parseSave(text) {
// Original L168: Limits input length and rejects non-string input before parsing attacker-controlled JSON.
      if (typeof text !== 'string' || text.length > MAX_JSON_BYTES) throw new Error('The save file is too large.');
// Original L169: Defines data for use by the surrounding persistence logic.
      const data = JSON.parse(text);
// Original L170: Requires the expected format and only schema 1 or 2, blocking arbitrary JSON from import.
      if (!data || data.format !== FILE_FORMAT || ![1, FILE_SCHEMA_VERSION].includes(data.schemaVersion)) throw new Error('This is not a supported S&S Casino Hub save file.');
// Original L171: Delegates field clamping and whitelisting to the profile manager.
      const normalized = window.LocalProfiles?.normalizeSave(data) || {};
// Original L172: Revalidates jackpot as a finite value at least zero; malformed jackpot data aborts import.
      const jackpot = Player.numberOr(data.jackpot, NaN, 0);
// Original L173: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!Number.isFinite(jackpot)) throw new Error('The save file has an invalid jackpot value.');
// Original L174: Returns an object with fields copied from `normalized` (normalized); format: `FILE_FORMAT` (file format); schemaVersion: `FILE_SCHEMA_VERSION` (file schema version); profileId: checks checks that gets the JavaScript type name of `data.profileId` (the profile id property of data) and "string" have the same value and type; if true chooses `data.profileId` (the profile id property of data), otherwise null; revision: checks uses checks whether `data.revision` (the revision property of data) is at least 0 only if calls `Number.isSafeInteger` with `data.revision` (the revision property of data) is truthy; otherwise keeps the falsy first value; if true chooses `data.revision` (the revision property of data), otherwise 0; updatedAt: checks checks that gets the JavaScript type name of `data.updatedAt` (the updated at property of data) and "string" have the same value and type; if true chooses `data.updatedAt` (the updated at property of data), otherwise formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; and further fields to the caller and exits this function.
      return { ...normalized, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
// Original L175: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        profileId: typeof data.profileId === 'string' ? data.profileId : null,
// Original L176: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
        revision: Number.isSafeInteger(data.revision) && data.revision >= 0 ? data.revision : 0,
// Original L177: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
// Original L178: Marks version-1 or profile-less files as legacy so they cannot silently replace a current profile.
        jackpot, legacy: data.schemaVersion !== FILE_SCHEMA_VERSION || !data.profileId };
// Original L179: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L180: Implements this module operation and passes its validated result to the next persistence step.
    normalizeSettings(value) {
// Original L181: Defines input for use by the surrounding persistence logic.
      const input = value && typeof value === 'object' ? value : {};
// Original L182: Rounds volume to an integer after numeric fallback, making the UI setting predictable.
      const volume = Math.round(Player.numberOr(input.volume, DEFAULT_SETTINGS.volume, 0));
// Original L183: Returns an object with fields volume: chooses the smallest of 100, `volume` (volume); isMuted: checks that `input.isMuted` (the is muted property of input) and true have the same value and type; theme: checks calls `THEMES.has` with `input.theme` (the theme property of input); if true chooses `input.theme` (the theme property of input), otherwise `DEFAULT_SETTINGS.theme` (the theme property of DEFAULT_SETTINGS) to the caller and exits this function.
      return {
// Original L184: Caps volume at 100 while retaining a lower bound from numberOr.
        volume: Math.min(100, volume),
// Original L185: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        isMuted: input.isMuted === true,
// Original L186: Accepts only the four theme values; unknown themes fall back to Vegas.
        theme: THEMES.has(input.theme) ? input.theme : DEFAULT_SETTINGS.theme
// Original L187: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L188: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L189: Blank line separates related logic for readability.

// Original L190: Implements this module operation and passes its validated result to the next persistence step.
    readLegacyProfiles() {
// Original L191: Defines archived for use by the surrounding persistence logic.
      const archived = window.LocalProfiles?.getCurrentSave().legacyProfiles || [];
// Original L192: Returns sorts transforms each item of `archived` (archived) using a callback taking profile that an object with fields updatedAtMs: calls `Player.numberOr` with `profile.updatedAtMs`; 0; 0; player: calls `Player.fromProfile(profile.player).toProfile` with no arguments; settings: calls `this.normalizeSettings` with `profile.settings` and returns a new array in place using comparison a callback taking a, b that subtracts `a.updatedAtMs` (the updated at ms property of a) from `b.updatedAtMs` (the updated at ms property of b) to the caller and exits this function.
      return archived.map(profile => ({
// Original L193: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        updatedAtMs: Player.numberOr(profile.updatedAtMs, 0, 0),
// Original L194: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        player: Player.fromProfile(profile.player).toProfile(),
// Original L195: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        settings: this.normalizeSettings(profile.settings)
// Original L196: Transforms or bounds the collection so only the intended normalized records continue.
      })).sort((a, b) => b.updatedAtMs - a.updatedAtMs);
// Original L197: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L198: Blank line separates related logic for readability.

// Original L199: Implements this module operation and passes its validated result to the next persistence step.
    refreshLegacyRecoveryOption() {
// Original L200: Defines hasRecovery for use by the surrounding persistence logic.
      let hasRecovery = false;
// Original L201: Reads or writes browser-local storage; this is origin-local and not a server backup.
      try { hasRecovery = !!localStorage.getItem(this.recoveryKey()); } catch (error) { /* Keep the browser save usable. */ }
// Original L202: Defines profiles for use by the surrounding persistence logic.
      const profiles = this.readLegacyProfiles();
// Original L203: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.recoverButton?.classList.toggle('hidden-view', !hasRecovery && !profiles.length);
// Original L204: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.recoverButton) this.recoverButton.textContent = hasRecovery ? 'Restore previous save' : 'Recover older local profile';
// Original L205: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L206: Blank line separates related logic for readability.

// Original L207: Implements this module operation and passes its validated result to the next persistence step.
    async recoverLegacyProfile() {
// Original L208: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.canReplaceSave()) return;
// Original L209: Defines save for use by the surrounding persistence logic.
      let save = null;
// Original L210: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L211: Defines record for use by the surrounding persistence logic.
        const record = JSON.parse(localStorage.getItem(this.recoveryKey()) || 'null');
// Original L212: Defines profile for use by the surrounding persistence logic.
        const profile = window.LocalProfiles?.activeProfile;
// Original L213: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (record?.format === 'ss-casino-encrypted-recovery' && record.profileId === profile?.id && profile && window.LocalProfiles?.activeKey) {
// Original L214: Waits for the asynchronous storage, encryption, or UI operation before continuing.
          save = await window.LocalProfiles.decryptSave({ ...profile, iv: record.iv, ciphertext: record.ciphertext }, window.LocalProfiles.activeKey);
// Original L215: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L216: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) { save = null; }
// Original L217: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!save) {
// Original L218: Defines profiles for use by the surrounding persistence logic.
        const profiles = this.readLegacyProfiles();
// Original L219: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!profiles.length) { this.refreshLegacyRecoveryOption(); return; }
// Original L220: Defines newest for use by the surrounding persistence logic.
        const newest = profiles[0]; save = { player: newest.player, settings: newest.settings, jackpot: this.jackpot.currentJackpot };
// Original L221: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L222: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!confirm('Replace this browser save with the encrypted recovery snapshot? The current save will remain protected until replacement succeeds.')) return;
// Original L223: Defines applied for use by the surrounding persistence logic.
      const applied = await this.applySave({ ...save, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION, profileId: window.LocalProfiles?.activeProfile?.id || null, revision: this.currentRevision() + 1, updatedAt: new Date().toISOString() });
// Original L224: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (applied) this.refreshLegacyRecoveryOption();
// Original L225: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L226: Implements this module operation and passes its validated result to the next persistence step.
    canReplaceSave() {
// Original L227: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (typeof window.canReplaceCasinoSave === 'function' && !window.canReplaceCasinoSave()) {
// Original L228: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.setStatus('Finish the active game and return to the lobby before replacing a save.', 'warning');
// Original L229: Returns false to the caller and exits this function.
        return false;
// Original L230: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L231: Returns true to the caller and exits this function.
      return true;
// Original L232: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L233: States the replacement ordering: durable encrypted recovery must exist before live state changes.
    // Apply validated data only after a durable recovery snapshot and a successful browser save.
// Original L234: Implements this module operation and passes its validated result to the next persistence step.
    async applySave(save) {
// Original L235: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.canReplaceSave()) return false;
// Original L236: Defines profiles for use by the surrounding persistence logic.
      const profiles = window.LocalProfiles; const current = { ...(profiles?.getCurrentSave?.() || {}), player: this.hub.player.toProfile(), settings: this.settings.getSettings() };
// Original L237: Defines previousRecovery for use by the surrounding persistence logic.
      let previousRecovery;
// Original L238: Reads or writes browser-local storage; this is origin-local and not a server backup.
      try { previousRecovery = localStorage.getItem(this.recoveryKey()); }
// Original L239: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      catch (error) { this.setStatus('Browser storage could not be read; no progress was replaced.', 'warning'); return false; }
// Original L240: Defines restoreRecovery for use by the surrounding persistence logic.
      const restoreRecovery = () => { try { if (previousRecovery === null) localStorage.removeItem(this.recoveryKey()); else localStorage.setItem(this.recoveryKey(), previousRecovery); } catch (error) {} };
// Original L241: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L242: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        await profiles?.flushSave?.();
// Original L243: Defines active for use by the surrounding persistence logic.
        const active = profiles?.activeProfile, key = profiles?.activeKey;
// Original L244: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!active || !key || typeof profiles.encryptSave !== 'function') throw new Error('No active encryption key');
// Original L245: Encrypts the current browser save with the active password-derived key before replacement.
        const sealed = await profiles.encryptSave(active, key, current);
// Original L246: Stores only the recovery envelope’s profile id, IV, and ciphertext; the recovery snapshot is encrypted.
        localStorage.setItem(this.recoveryKey(), JSON.stringify({ format: 'ss-casino-encrypted-recovery', profileId: active.id, iv: sealed.iv, ciphertext: sealed.ciphertext }));
// Original L247: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) { this.setStatus('Could not create a durable encrypted recovery snapshot; no save was replaced.', 'warning'); return false; }
// Original L248: Defines next for use by the surrounding persistence logic.
      const next = profiles?.normalizeSave ? profiles.normalizeSave({ ...current, ...save, jackpot: Number.isFinite(save.jackpot) ? save.jackpot : this.jackpot.currentJackpot, revision: save.revision, updatedAt: save.updatedAt }) : { ...current, ...save };
// Original L249: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
      this.fileHandle = null;
// Original L250: Defines durable for use by the surrounding persistence logic.
      const durable = await (profiles?.saveCurrent?.(next) ?? false);
// Original L251: Rolls back the in-memory current save and recovery record if durable replacement fails.
      if (!durable) { profiles.currentSave = current; restoreRecovery(); this.setStatus('Browser storage failed; replacement was not durably saved.', 'warning'); return false; }
// Original L252: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.hub.player = Player.fromProfile(next.player, profiles?.activeProfile?.name || 'Player'); this.settings.applySettings?.(next.settings); this.jackpot.setJackpot?.(next.jackpot);
// Original L253: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      window.RaceGame?.resetForActiveProfile?.(); await window.refreshCasinoSaveState?.(next); this.hub.updateGlobalUI?.(); this.bank?.updateModalUI?.(); this.xp?.updateUI?.(); this.dailyWheel?.updateUI?.();
// Original L254: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.refreshLegacyRecoveryOption();
// Original L255: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.setStatus('Local save loaded. The previous progress is available with Restore previous save.', 'local'); return true;
// Original L256: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L257: Explains that linking requires an explicit picker and manual JSON remains the fallback.
    // Linking needs the user's explicit browser file-picker choice; unsupported browsers keep download/import backups.
// Original L258: Implements this module operation and passes its validated result to the next persistence step.
    async linkFile() {
// Original L259: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (typeof window.showSaveFilePicker !== 'function') { this.setStatus('Direct file auto-save is not supported in this browser. Use Download save backup and Import save file instead.', 'warning'); return false; }
// Original L260: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L261: Defines handle for use by the surrounding persistence logic.
        const handle = await window.showSaveFilePicker({ suggestedName: 'ss-casino-save.json', types: [{ description: 'S&S Casino Hub save file', accept: { 'application/json': ['.json'] } }] });
// Original L262: Defines file for use by the surrounding persistence logic.
        const file = await handle.getFile(); let existingSave = null; let bytes = '';
// Original L263: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (file.size > 0) {
// Original L264: Waits for the asynchronous storage, encryption, or UI operation before continuing.
          bytes = await file.text(); try { existingSave = this.parseSave(bytes); } catch (error) { alert('That file is not a valid S&S Casino Hub save. Choose a different file or import a valid JSON backup.'); return false; }
// Original L265: Defines activeId for use by the surrounding persistence logic.
          const activeId = window.LocalProfiles?.activeProfile?.id || null;
// Original L266: Rejects a linked file from another profile or an older revision/date before any overwrite.
          if (existingSave.legacy || (existingSave.profileId && existingSave.profileId !== activeId) || existingSave.revision < this.currentRevision() || Date.parse(existingSave.updatedAt) < Date.parse(this.createSave().updatedAt)) { this.setStatus('Linked save is stale, legacy, or for another profile. It was not loaded or overwritten; use Import after reviewing it.', 'warning'); return false; }
// Original L267: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (!this.isSameSave(existingSave, this.createSave()) && (!this.canReplaceSave() || !confirm('This file differs from the current browser save. Replace the browser save with it?'))) return false;
// Original L268: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L269: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (existingSave && !await this.applySave(existingSave)) return false;
// Original L270: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        this.fileHandle = handle; if (!await this.storeHandle(handle)) { this.fileHandle = null; return false; }
// Original L271: Stores the lastLinkedBytes runtime reference/state on this manager so later save operations can reuse it.
        this.lastLinkedBytes = bytes; this.lastLinkedRevision = existingSave?.revision ?? this.currentRevision();
// Original L272: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!await this.writeToLinkedFile()) { this.fileHandle = null; return false; }
// Original L273: Defines a named field in the save/profile or UI data structure.
        this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked'); return true;
// Original L274: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) { if (error?.name !== 'AbortError') this.setStatus('Could not link that file. Browser-local saving is still active; use Download save backup instead.', 'warning'); return false; }
// Original L275: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L276: Blank line separates related logic for readability.

// Original L277: Explains why serialized file writes are queued: completion order must match save order.
    // A promise queue keeps rapid writes ordered so an older save cannot finish after and replace a newer one.
// Original L278: Implements this module operation and passes its validated result to the next persistence step.
    queueFileSave() {
// Original L279: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.fileHandle) return Promise.resolve(false); const fileHandle = this.fileHandle; const saveText = JSON.stringify(this.createSave(), null, 2);
// Original L280: Stores the fileWriteQueue runtime reference/state on this manager so later save operations can reuse it.
      this.fileWriteQueue = this.fileWriteQueue.catch(() => false).then(async () => {
// Original L281: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (this.fileHandle !== fileHandle) return false;
// Original L282: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (await window.LocalProfiles?.flushSave?.() === false) { this.fileHandle = null; this.setStatus('Browser storage failed; file auto-save is paused to protect the backup.', 'warning'); return false; }
// Original L283: Defines file for use by the surrounding persistence logic.
        const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
// Original L284: Detects external edits by comparing exact prior file text, then pauses rather than overwriting them.
        if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused. Review it and link it again.', 'warning'); return false; }
// Original L285: Defines writable for use by the surrounding persistence logic.
        const writable = await fileHandle.createWritable(); await writable.write(saveText); await writable.close(); this.lastLinkedBytes = saveText; this.lastLinkedRevision = this.createSave().revision; this.setStatus(`Saved in this browser and linked file: ${fileHandle.name}`, 'linked'); return true;
// Original L286: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
      }).catch(error => { this.fileHandle = null; this.setStatus('Linked file auto-save failed; browser save remains active and file linking is paused.', 'warning'); return false; }); return this.fileWriteQueue;
// Original L287: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L288: Implements this module operation and passes its validated result to the next persistence step.
    async writeToLinkedFile() {
// Original L289: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.fileHandle) return false; const fileHandle = this.fileHandle; const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
// Original L290: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused.', 'warning'); return false; }
// Original L291: Defines text for use by the surrounding persistence logic.
      const text = JSON.stringify(this.createSave(), null, 2); const writable = await fileHandle.createWritable(); await writable.write(text); await writable.close(); this.lastLinkedBytes = text; return true;
// Original L292: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L293: Blank line separates related logic for readability.

// Original L294: Implements this module operation and passes its validated result to the next persistence step.
    async switchProfile() {
// Original L295: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      await this.fileWriteQueue.catch(() => {});
// Original L296: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
      this.fileHandle = null; this.lastLinkedBytes = null;
// Original L297: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.refreshLegacyRecoveryOption();
// Original L298: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.setStatus('Encrypted profile save is active in this browser. Choose a save file to link this profile.', 'local');
// Original L299: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L300: Blank line separates related logic for readability.

// Original L301: Clarifies that backup download is local browser output and does not upload save data.
    // A Blob URL lets the browser download a portable JSON copy without uploading anything.
// Original L302: Implements this module operation and passes its validated result to the next persistence step.
    downloadBackup() {
// Original L303: Defines blob for use by the surrounding persistence logic.
      const blob = new Blob([JSON.stringify(this.createSave(), null, 2)], { type: 'application/json' });
// Original L304: Defines url for use by the surrounding persistence logic.
      const url = URL.createObjectURL(blob);
// Original L305: Defines link for use by the surrounding persistence logic.
      const link = document.createElement('a');
// Original L306: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      link.href = url;
// Original L307: Transforms or bounds the collection so only the intended normalized records continue.
      link.download = `ss-casino-save-${new Date().toISOString().slice(0, 10)}.json`;
// Original L308: Uses the browser UI/global integration to coordinate this save or profile operation.
      document.body.appendChild(link);
// Original L309: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      link.click();
// Original L310: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      link.remove();
// Original L311: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      URL.revokeObjectURL(url);
// Original L312: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.setStatus('Save backup downloaded to your device.', this.fileHandle ? 'linked' : 'local');
// Original L313: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L314: Blank line separates related logic for readability.

// Original L315: Comment: Confirm before replacing the active save and clear the input so the same file can be selected again.
    // Confirm before replacing the active save and clear the input so the same file can be selected again.
// Original L316: Implements this module operation and passes its validated result to the next persistence step.
    async importSelectedFile(event) {
// Original L317: Defines file for use by the surrounding persistence logic.
      const file = event.target.files?.[0];
// Original L318: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!file) return;
// Original L319: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L320: Defines save for use by the surrounding persistence logic.
        const save = this.parseSave(await file.text());
// Original L321: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!this.canReplaceSave()) return;
// Original L322: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!confirm('Importing this file replaces the casino save currently stored in this browser. Continue?')) return;
// Original L323: Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.
        this.fileHandle = null;
// Original L324: Defines applied for use by the surrounding persistence logic.
        const applied = await this.applySave(save);
// Original L325: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!applied) throw new Error('Save replacement was not durable.');
// Original L326: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) {
// Original L327: Implements this module operation and passes its validated result to the next persistence step.
        alert(error instanceof SyntaxError ? 'The selected file is not valid JSON.' : (error.message || 'Could not import this save file.'));
// Original L328: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } finally {
// Original L329: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        event.target.value = '';
// Original L330: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L331: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L332: Blank line separates related logic for readability.

// Original L333: Uses IndexedDB because FileSystemFileHandle objects cannot be stored in localStorage.
    // IndexedDB stores FileSystemFileHandle objects because localStorage cannot structured-clone browser file handles.
// Original L334: Implements this module operation and passes its validated result to the next persistence step.
    openHandleDatabase() {
// Original L335: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!window.indexedDB) return Promise.resolve(null);
// Original L336: Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.
      return new Promise((resolve, reject) => {
// Original L337: Defines request for use by the surrounding persistence logic.
        const request = indexedDB.open(HANDLE_DB_NAME, 1);
// Original L338: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        request.onupgradeneeded = () => {
// Original L339: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (!request.result.objectStoreNames.contains(HANDLE_STORE_NAME)) {
// Original L340: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            request.result.createObjectStore(HANDLE_STORE_NAME);
// Original L341: Closes the surrounding block or literal; no independent data transformation occurs here.
          }
// Original L342: Closes the surrounding block or literal; no independent data transformation occurs here.
        };
// Original L343: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        request.onsuccess = () => resolve(request.result);
// Original L344: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        request.onerror = () => reject(request.error);
// Original L345: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L346: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L347: Blank line separates related logic for readability.

// Original L348: Implements this module operation and passes its validated result to the next persistence step.
    async readStoredHandle() {
// Original L349: Defines db for use by the surrounding persistence logic.
      const db = await this.openHandleDatabase();
// Original L350: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!db) return null;
// Original L351: Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.
      return new Promise((resolve, reject) => {
// Original L352: Defines request for use by the surrounding persistence logic.
        const request = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(this.getHandleKey());
// Original L353: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        request.onsuccess = () => {
// Original L354: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (request.result || this.getHandleKey() === HANDLE_KEY) { db.close(); resolve(request.result || null); return; }
// Original L355: Defines legacy for use by the surrounding persistence logic.
          const legacy = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(HANDLE_KEY);
// Original L356: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
          legacy.onsuccess = () => { db.close(); resolve(legacy.result || null); };
// Original L357: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
          legacy.onerror = () => { db.close(); reject(legacy.error); };
// Original L358: Closes the surrounding block or literal; no independent data transformation occurs here.
        };
// Original L359: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        request.onerror = () => { db.close(); reject(request.error); };
// Original L360: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L361: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L362: Blank line separates related logic for readability.

// Original L363: Implements this module operation and passes its validated result to the next persistence step.
    async storeHandle(handle) {
// Original L364: Defines db for use by the surrounding persistence logic.
      const db = await this.openHandleDatabase();
// Original L365: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!db) { this.setStatus('This browser cannot remember file links. Browser saving and manual backups remain available.', 'warning'); return false; }
// Original L366: Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.
      return new Promise((resolve, reject) => {
// Original L367: Defines transaction for use by the surrounding persistence logic.
        const transaction = db.transaction(HANDLE_STORE_NAME, 'readwrite');
// Original L368: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        transaction.objectStore(HANDLE_STORE_NAME).put(handle, this.getHandleKey());
// Original L369: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        transaction.oncomplete = () => { db.close(); resolve(true); };
// Original L370: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        transaction.onerror = () => { db.close(); reject(transaction.error); };
// Original L371: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L372: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L373: Blank line separates related logic for readability.

// Original L374: Uses a profile-specific handle key so different local profiles do not share linked files.
    getHandleKey() {
// Original L375: Defines profileId for use by the surrounding persistence logic.
      const profileId = window.LocalProfiles?.activeProfile?.id;
// Original L376: Returns checks `profileId` (profile id); if true chooses a text template that combines fixed text with computed values `profileId` (profile id), otherwise `HANDLE_KEY` (handle key) to the caller and exits this function.
      return profileId ? `profile-save-file:${profileId}` : HANDLE_KEY;
// Original L377: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L378: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L379: Blank line separates related logic for readability.

// Original L380: Uses the browser UI/global integration to coordinate this save or profile operation.
  window.LocalSaveManager = LocalSaveManager;
// Original L381: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
})();
