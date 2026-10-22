// Original L1: Comment: 
// Original L2: Explains the privacy model: PBKDF2 derives an AES-GCM key, while only metadata/ciphertext leave the encrypted save.
// Original L3: Clarifies that browser-origin encryption is local privacy, not an account or server identity.
// Original L4: Comment: 
/*
 * Password-protected profiles stay on this browser origin. PBKDF2 derives an AES-GCM key; only profile metadata
 * and ciphertext are stored outside the encrypted save. This is local privacy, not an online identity service.
 */
// Original L5: Comment: Browser-local multi-user profiles; profile data is encrypted with a password-derived AES-GCM key. */
/* Browser-local multi-user profiles; profile data is encrypted with a password-derived AES-GCM key. */
// Original L6: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
(function installLocalProfileManager() {
// Original L7: Defines DATABASE_KEY for use by the surrounding persistence logic.
  const DATABASE_KEY = 'ss_casino_profiles_v1';
// Original L8: Defines DATABASE_VERSION for use by the surrounding persistence logic.
  const DATABASE_VERSION = 1;
// Original L9: Defines RECOVERY_KEY for use by the surrounding persistence logic.
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
// Original L10: Defines FORMAT for use by the surrounding persistence logic.
  const FORMAT = 'ss-casino-encrypted-profile';
// Original L11: Comment: Expensive password derivation slows offline guessing; keep this setting stable so existing profiles still unlock.
  // Expensive password derivation slows offline guessing; keep this setting stable so existing profiles still unlock.
// Original L12: Sets PBKDF2 to 310,000 SHA-256 iterations; changing it would prevent existing profiles from deriving the same key.
  const PBKDF2_ITERATIONS = 310000;
// Original L13: Defines LEGACY_PROFILE_PREFIX for use by the surrounding persistence logic.
  const LEGACY_PROFILE_PREFIX = 'ss_casino_profile_v1_';
// Original L14: Defines LEGACY_KEYS for use by the surrounding persistence logic.
  const LEGACY_KEYS = [
// Original L15: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    'casino_hub_player', 'casino_hub_xp', 'casino_hub_debt',
// Original L16: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    'casino_hub_wheel', 'casino_hub_credit_limit', 'casino_hub_max_bet', 'casino_hub_settings',
// Original L17: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    'casino_hub_jackpot'
// Original L18: Closes the surrounding block or literal; no independent data transformation occurs here.
  ];
// Original L19: Comment: Defaults create a new profile or fill missing fields; valid balances from existing profiles are preserved.
  // Defaults create a new profile or fill missing fields; valid balances from existing profiles are preserved.
// Original L20: Defines the normalized save shape and defaults used for new or missing fields.
  const DEFAULT_SAVE = Object.freeze({
// Original L21: Initializes virtual-chip player values: 100 balance, level 1, zero XP/debt, 2,000 credit limit, and 100 minimum max bet.
    player: { balance: 100, lastSpinTime: 0, level: 1, xp: 0, debt: 0, creditLimit: 2000, maxBet: 100 },
// Original L22: Defines a named field in the save/profile or UI data structure.
    settings: { volume: 80, isMuted: false, theme: 'vegas' },
// Original L23: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    jackpot: 10000,
// Original L24: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    raceBet: null,
// Original L25: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    raceResultNotice: null,
// Original L26: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    raceExperience: null,
// Original L27: Defines a named field in the save/profile or UI data structure.
    slotBonuses: {},
// Original L28: Defines a named field in the save/profile or UI data structure.
    accomplishments: {},
// Original L29: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    revision: 0,
// Original L30: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    updatedAt: null
// Original L31: Closes the surrounding block or literal; no independent data transformation occurs here.
  });
// Original L32: Blank line separates related logic for readability.

// Original L33: Summarizes that this manager owns profile lifecycle, AES-GCM, legacy migration, and serialized writes.
  /** Owns profile creation, unlock, AES-GCM encryption, legacy migration, and ordered localStorage writes. */
// Original L34: Declares the class that groups this module’s related state and operations.
  class LocalProfileManager {
// Original L35: Implements this module operation and passes its validated result to the next persistence step.
    constructor() {
// Original L36: Stores the activeProfile runtime reference/state on this manager so later save operations can reuse it.
      this.activeProfile = null;
// Original L37: Stores the activeKey runtime reference/state on this manager so later save operations can reuse it.
      this.activeKey = null;
// Original L38: Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.
      this.currentSave = null;
// Original L39: Stores the database runtime reference/state on this manager so later save operations can reuse it.
      this.database = null;
// Original L40: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      this.saveQueue = Promise.resolve();
// Original L41: Finds or creates the UI element used to present this profile/save state.
      this.gate = document.getElementById('profile-gate');
// Original L42: Finds or creates the UI element used to present this profile/save state.
      this.content = document.getElementById('profile-gate-content');
// Original L43: Finds or creates the UI element used to present this profile/save state.
      this.profileButton = document.getElementById('btn-profile-manager');
// Original L44: Finds or creates the UI element used to present this profile/save state.
      this.profileName = document.getElementById('active-profile-name');
// Original L45: Stores the onProfileChanged runtime reference/state on this manager so later save operations can reuse it.
      this.onProfileChanged = null;
// Original L46: Stores the canSwitchProfile runtime reference/state on this manager so later save operations can reuse it.
      this.canSwitchProfile = () => true;
// Original L47: Stores the busy runtime reference/state on this manager so later save operations can reuse it.
      this.busy = false;
// Original L48: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L49: Blank line separates related logic for readability.

// Original L50: Implements this module operation and passes its validated result to the next persistence step.
    async initialize() {
// Original L51: Requires Web Crypto and a secure context (HTTPS/localhost); without them encrypted profiles are not created or changed.
      if (!window.crypto?.subtle || !window.isSecureContext) {
// Original L52: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.renderMessage('Secure browser storage is unavailable', 'Open the casino over HTTPS or on localhost in a modern browser to use encrypted profiles. No profile data was changed.');
// Original L53: Stops processing with a user-facing validation/storage error rather than accepting unsafe data.
        throw new Error('Web Crypto is required for encrypted local profiles.');
// Original L54: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L55: Stores the database runtime reference/state on this manager so later save operations can reuse it.
      this.database = this.readDatabase();
// Original L56: Connects this UI event to the corresponding save/profile action when the control exists.
      this.profileButton?.addEventListener('click', () => this.openSwitcher());
// Original L57: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.database.profiles.length === 0) {
// Original L58: Defines legacySave for use by the surrounding persistence logic.
        const legacySave = this.readLegacySave();
// Original L59: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        legacySave.legacyProfiles = this.readLegacyProfiles();
// Original L60: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        await this.showFirstProfileSetup(legacySave);
// Original L61: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (this.database.profiles.length) this.removeLegacyKeys();
// Original L62: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } else {
// Original L63: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        await this.showUnlockScreen();
// Original L64: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L65: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
      this.gate?.classList.add('hidden-view');
// Original L66: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.updateProfileButton();
// Original L67: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L68: Blank line separates related logic for readability.

// Original L69: Treats database JSON as untrusted input and refuses incomplete or unknown schemas.
    // Treat the persisted envelope as untrusted input and stop if its schema is incomplete or unknown.
// Original L70: Implements this module operation and passes its validated result to the next persistence step.
    readDatabase() {
// Original L71: Defines raw for use by the surrounding persistence logic.
      const raw = localStorage.getItem(DATABASE_KEY);
// Original L72: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!raw) return { version: DATABASE_VERSION, profiles: [] };
// Original L73: Defines value for use by the surrounding persistence logic.
      let value;
// Original L74: Deserializes JSON and feeds the resulting data into validation before it can affect live state.
      try { value = JSON.parse(raw); } catch (error) {
// Original L75: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.renderMessage('Local profile data could not be read', 'The profile database is malformed. Do not clear browser storage if you need these profiles.');
// Original L76: Stops processing with a user-facing validation/storage error rather than accepting unsafe data.
        throw new Error('Malformed local profile database.');
// Original L77: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L78: Accepts only database version 1 with an array of profiles, preventing accidental interpretation of another format.
      if (value?.version !== DATABASE_VERSION || !Array.isArray(value.profiles)) {
// Original L79: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.renderMessage('Unsupported local profile data', 'This profile database version is not supported by this app build. No data was changed.');
// Original L80: Stops processing with a user-facing validation/storage error rather than accepting unsafe data.
        throw new Error('Unsupported local profile database.');
// Original L81: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L82: Defines seen for use by the surrounding persistence logic.
      const seen = new Set();
// Original L83: Iterates through bounded saved records so each candidate can be validated before retention.
      for (const profile of value.profiles) {
// Original L84: Validates each profile’s string identifiers and ciphertext fields and rejects duplicate ids.
        if (!profile || typeof profile.id !== 'string' || typeof profile.name !== 'string' ||
// Original L85: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            typeof profile.salt !== 'string' || typeof profile.iv !== 'string' || typeof profile.ciphertext !== 'string' || seen.has(profile.id)) {
// Original L86: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.renderMessage('Local profile data could not be read', 'A profile record is incomplete or duplicated. No data was changed.');
// Original L87: Stops processing with a user-facing validation/storage error rather than accepting unsafe data.
          throw new Error('Invalid local profile record.');
// Original L88: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L89: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
        seen.add(profile.id);
// Original L90: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L91: Returns `value` (value) to the caller and exits this function.
      return value;
// Original L92: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L93: Blank line separates related logic for readability.

// Original L94: Reads old unencrypted localStorage keys as migration input, not as the new storage format.
    readLegacySave() {
// Original L95: Defines readJson for use by the surrounding persistence logic.
      const readJson = key => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (error) { return {}; } };
// Original L96: Defines oldPlayer for use by the surrounding persistence logic.
      const oldPlayer = readJson('casino_hub_player');
// Original L97: Defines oldXp for use by the surrounding persistence logic.
      const oldXp = readJson('casino_hub_xp');
// Original L98: Defines readNumber for use by the surrounding persistence logic.
      const readNumber = (value, fallback, minimum = 0) => {
// Original L99: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (value === null || value === undefined || value === '') return fallback;
// Original L100: Defines parsed for use by the surrounding persistence logic.
        const parsed = Number(value);
// Original L101: Returns checks uses checks whether `parsed` (parsed) is at least `minimum` (minimum) only if checks that `parsed` (parsed) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `parsed` (parsed), otherwise `fallback` (fallback) to the caller and exits this function.
        return Number.isFinite(parsed) && parsed >= minimum ? parsed : fallback;
// Original L102: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L103: Defines settings for use by the surrounding persistence logic.
      let settings = readJson('casino_hub_settings');
// Original L104: Defines themes for use by the surrounding persistence logic.
      const themes = ['vegas', 'midnight', 'gold', 'money'];
// Original L105: Assigns the computed settings value used by the surrounding validation or persistence step.
      settings = {
// Original L106: Clamps volume into 0–100 and rounds it, while restricting theme to the four known names.
        volume: Math.max(0, Math.min(100, Math.round(readNumber(settings.volume, 80)))),
// Original L107: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        isMuted: settings.isMuted === true,
// Original L108: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
// Original L109: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L110: Normalizes migrated legacy fields into the modern save shape before profile creation.
      return this.normalizeSave({
// Original L111: Defines a named field in the save/profile or UI data structure.
        player: {
// Original L112: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          balance: readNumber(oldPlayer.balance, 100),
// Original L113: Reads or writes browser-local storage; this is origin-local and not a server backup.
          lastSpinTime: readNumber(localStorage.getItem('casino_hub_wheel'), 0),
// Original L114: Defines field level as chooses the largest of 1, rounds calls `readNumber` with `oldXp.level` (the level property of oldXp); 1; 1 down to the next whole number.
          level: Math.max(1, Math.floor(readNumber(oldXp.level, 1, 1))),
// Original L115: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          xp: readNumber(oldXp.xp, 0),
// Original L116: Reads or writes browser-local storage; this is origin-local and not a server backup.
          debt: readNumber(localStorage.getItem('casino_hub_debt'), 0),
// Original L117: Reads or writes browser-local storage; this is origin-local and not a server backup.
          creditLimit: readNumber(localStorage.getItem('casino_hub_credit_limit'), 2000),
// Original L118: Reads or writes browser-local storage; this is origin-local and not a server backup.
          maxBet: readNumber(localStorage.getItem('casino_hub_max_bet'), 100, 100)
// Original L119: Closes the surrounding block or literal; no independent data transformation occurs here.
        },
// Original L120: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        settings,
// Original L121: Reads or writes browser-local storage; this is origin-local and not a server backup.
        jackpot: readNumber(localStorage.getItem('casino_hub_jackpot'), 10000)
// Original L122: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L123: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L124: Blank line separates related logic for readability.

// Original L125: Lists old guest-save keys that can be removed only after encrypted migration succeeds.
    removeLegacyKeys() {
// Original L126: Reads or writes browser-local storage; this is origin-local and not a server backup.
      LEGACY_KEYS.forEach(key => { try { localStorage.removeItem(key); } catch (error) { /* best effort */ } });
// Original L127: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L128: Reads or writes browser-local storage; this is origin-local and not a server backup.
        Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
// Original L129: Transforms or bounds the collection so only the intended normalized records continue.
          .filter(key => key?.startsWith(LEGACY_PROFILE_PREFIX))
// Original L130: Reads or writes browser-local storage; this is origin-local and not a server backup.
          .forEach(key => localStorage.removeItem(key));
// Original L131: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) { /* encrypted archive already protects profile saves */ }
// Original L132: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L133: Blank line separates related logic for readability.

// Original L134: Implements this module operation and passes its validated result to the next persistence step.
    readLegacyProfiles() {
// Original L135: Defines profiles for use by the surrounding persistence logic.
      const profiles = [];
// Original L136: Defines numberOr for use by the surrounding persistence logic.
      const numberOr = (value, fallback) => {
// Original L137: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (value === null || value === undefined || value === '') return fallback;
// Original L138: Defines number for use by the surrounding persistence logic.
        const number = Number(value);
// Original L139: Returns checks uses checks whether `number` (number) is at least 0 only if checks that `number` (number) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `number` (number), otherwise `fallback` (fallback) to the caller and exits this function.
        return Number.isFinite(number) && number >= 0 ? number : fallback;
// Original L140: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L141: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L142: Reads or writes browser-local storage; this is origin-local and not a server backup.
        for (let index = 0; index < localStorage.length; index++) {
// Original L143: Defines key for use by the surrounding persistence logic.
          const key = localStorage.key(index);
// Original L144: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (!key?.startsWith(LEGACY_PROFILE_PREFIX)) continue;
// Original L145: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
          try {
// Original L146: Defines record for use by the surrounding persistence logic.
            const record = JSON.parse(localStorage.getItem(key) || 'null');
// Original L147: Guards the following operation so invalid, missing, or unsafe state is not applied.
            if (!record?.uid || !record.profile || typeof record.profile !== 'object') continue;
// Original L148: Defines normalized for use by the surrounding persistence logic.
            const normalized = this.normalizeSave({ player: record.profile, settings: record.settings });
// Original L149: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
            profiles.push({
// Original L150: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
              updatedAtMs: numberOr(record.updatedAtMs, 0),
// Original L151: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
              player: normalized.player,
// Original L152: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
              settings: normalized.settings
// Original L153: Closes the surrounding block or literal; no independent data transformation occurs here.
            });
// Original L154: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          } catch (error) { /* Ignore malformed old caches; preserve valid ones. */ }
// Original L155: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L156: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) { return []; }
// Original L157: Sorts archived legacy profiles newest-first and retains at most 100 candidates.
      return profiles.sort((a, b) => b.updatedAtMs - a.updatedAtMs).slice(0, 100);
// Original L158: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L159: Blank line separates related logic for readability.

// Original L160: Begins bounded normalization of per-slot bonus state.
    normalizeSlotBonuses(value) {
// Original L161: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
// Original L162: Defines output for use by the surrounding persistence logic.
      const output = {};
// Original L163: Transforms or bounds the collection so only the intended normalized records continue.
      for (const [id, raw] of Object.entries(value).slice(0, 64)) {
// Original L164: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!/^[A-Za-z0-9_-]{1,64}$/.test(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) continue;
// Original L165: Defines safe for use by the surrounding persistence logic.
        const safe = {};
// Original L166: Accepts only safe nonnegative integers up to one million for counts.
        const count = (v, fallback = 0) => Number.isSafeInteger(v) && v >= 0 && v <= 1000000 ? v : fallback;
// Original L167: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        safe.freeSpinsRemaining = count(raw.freeSpinsRemaining);
// Original L168: Rounds locked stakes to cents and caps them at one million to limit impossible persisted balances.
        safe.lockedStake = Number.isFinite(raw.lockedStake) && raw.lockedStake >= 0 && raw.lockedStake <= 1000000 ? Math.round(raw.lockedStake * 100) / 100 : 0;
// Original L169: Rounds bonus totals to cents and caps them at 100 million.
        safe.bonusTotalWin = Number.isFinite(raw.bonusTotalWin) && raw.bonusTotalWin >= 0 && raw.bonusTotalWin <= 100000000 ? Math.round(raw.bonusTotalWin * 100) / 100 : 0;
// Original L170: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (raw.summary && typeof raw.summary === 'object' && !Array.isArray(raw.summary)) {
// Original L171: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          safe.summary = {};
// Original L172: Transforms or bounds the collection so only the intended normalized records continue.
          for (const [key, value] of Object.entries(raw.summary).slice(0, 16)) {
// Original L173: Guards the following operation so invalid, missing, or unsafe state is not applied.
            if (/^[A-Za-z0-9_-]{1,64}$/.test(key) && Number.isFinite(value) && value >= 0 && value <= 100000000) safe.summary[key] = value;
// Original L174: Closes the surrounding block or literal; no independent data transformation occurs here.
          }
// Original L175: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L176: Requires exactly a 5-by-3 boolean sticky-wild grid; otherwise creates an all-false grid.
        safe.stickyWildsGrid = Array.isArray(raw.stickyWildsGrid) && raw.stickyWildsGrid.length === 5 && raw.stickyWildsGrid.every(row => Array.isArray(row) && row.length === 3 && row.every(BooleanValue => typeof BooleanValue === 'boolean')) ? raw.stickyWildsGrid.map(row => row.slice()) : Array.from({ length: 5 }, () => [false, false, false]);
// Original L177: Defines result for use by the surrounding persistence logic.
        const result = raw.lastResult;
// Original L178: Accepts only pending/settled results with nonnegative finite stake and an array of lines.
        if (result && (result.status === 'pending' || result.status === 'settled') && Number.isFinite(result.stake) && result.stake >= 0 && Array.isArray(result.lines)) {
// Original L179: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
          safe.lastResult = { status: result.status, stake: Math.round(result.stake * 100) / 100, payout: Number.isFinite(result.payout) && result.payout >= 0 ? Math.round(result.payout * 100) / 100 : 0, lines: result.lines.slice(0, 32) };
// Original L180: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        } else safe.lastResult = null;
// Original L181: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        output[id] = safe;
// Original L182: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L183: Returns `output` (output) to the caller and exits this function.
      return output;
// Original L184: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L185: Begins bounded normalization of achievements, history, and counters.
    normalizeAccomplishments(value) {
// Original L186: Defines source for use by the surrounding persistence logic.
      const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
// Original L187: Deduplicates known-shaped achievement ids, limits each to 96 characters, and keeps at most 128.
      const safeIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => typeof id === 'string' && id.length <= 96).slice(0, 128))] : [];
// Original L188: Keeps only object history entries with string ids, truncates to the latest 50, and caps ids.
      const history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item === 'object' && typeof item.id === 'string').slice(-50).map(item => ({ ...item, id: item.id.slice(0, 96) })) : [];
// Original L189: Defines stats for use by the surrounding persistence logic.
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
// Original L190: Restricts achievement counters to safe integers from 0 through 100 million.
      const count = v => Number.isSafeInteger(v) && v >= 0 && v <= 100000000 ? v : 0;
// Original L191: Returns an object with fields version: 1; unlockedIds: `safeIds` (safe ids); selectedCosmetic: checks uses checks whether `source.selectedCosmetic.length` (the length property of source.selectedCosmetic) is at most 96 only if checks that gets the JavaScript type name of `source.selectedCosmetic` and "string" have the same value and type is truthy; otherwise keeps the falsy first value; if true chooses `source.selectedCosmetic` (the selected cosmetic property of source), otherwise "classic-cabinet"; history: `history` (history); stats: an object with fields games: calls `count` with `stats.games` (the games property of stats); wins: calls `count` with `stats.wins` (the wins property of stats); races: calls `count` with `stats.races` (the races property of stats); raceWins: calls `count` with `stats.raceWins` (the race wins property of stats) to the caller and exits this function.
      return { version: 1, unlockedIds: safeIds, selectedCosmetic: typeof source.selectedCosmetic === 'string' && source.selectedCosmetic.length <= 96 ? source.selectedCosmetic : 'classic-cabinet', history, stats: { games: count(stats.games), wins: count(stats.wins), races: count(stats.races), raceWins: count(stats.raceWins) } };
// Original L192: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L193: Defines normalizeSave as the trust boundary that whitelists fields and rejects impossible race records.
    // Trust boundary for stored or imported values: whitelist fields, clamp preferences, and reject impossible race data.
// Original L194: Implements this module operation and passes its validated result to the next persistence step.
    normalizeSave(value = {}) {
// Original L195: Defines input for use by the surrounding persistence logic.
      const input = value && typeof value === 'object' ? value : {};
// Original L196: Defines player for use by the surrounding persistence logic.
      const player = input.player && typeof input.player === 'object' ? input.player : {};
// Original L197: Defines settings for use by the surrounding persistence logic.
      const settings = input.settings && typeof input.settings === 'object' ? input.settings : {};
// Original L198: Defines numberOr for use by the surrounding persistence logic.
      const numberOr = (item, fallback, minimum = 0) => {
// Original L199: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (item === null || item === undefined || item === '') return fallback;
// Original L200: Defines number for use by the surrounding persistence logic.
        const number = Number(item);
// Original L201: Returns checks uses checks whether `number` (number) is at least `minimum` (minimum) only if checks that `number` (number) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `number` (number), otherwise `fallback` (fallback) to the caller and exits this function.
        return Number.isFinite(number) && number >= minimum ? number : fallback;
// Original L202: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L203: Defines themes for use by the surrounding persistence logic.
      const themes = ['vegas', 'midnight', 'gold', 'money'];
// Original L204: Defines raceBet for use by the surrounding persistence logic.
      const raceBet = input.raceBet && typeof input.raceBet === 'object' ? input.raceBet : null;
// Original L205: Defines raceResultNotice for use by the surrounding persistence logic.
      const raceResultNotice = input.raceResultNotice && typeof input.raceResultNotice === 'object' ? input.raceResultNotice : null;
// Original L206: Restricts runner ids to horse-1..horse-6 or lowercase alphanumeric horse/car ids, blocking arbitrary keys.
      const validRunnerId = value => typeof value === 'string' && /^(horse-(?:[1-6]|[a-z0-9-]+)|car-[a-z0-9-]+)$/.test(value);
// Original L207: Defines raceExperience for use by the surrounding persistence logic.
      const raceExperience = input.raceExperience && typeof input.raceExperience === 'object' ? input.raceExperience : null;
// Original L208: Defines normalizeCircuit for use by the surrounding persistence logic.
      const normalizeCircuit = (circuit, type) => {
// Original L209: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!circuit || typeof circuit !== 'object') return null;
// Original L210: Defines runners for use by the surrounding persistence logic.
        const runners = {};
// Original L211: Defines prefix for use by the surrounding persistence logic.
        const prefix = type === 'car' ? 'car-' : 'horse-';
// Original L212: Transforms or bounds the collection so only the intended normalized records continue.
        for (const [runnerId, value] of Object.entries(circuit.runners || {}).slice(0, 64)) {
// Original L213: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (!runnerId.startsWith(prefix) || !validRunnerId(runnerId) || !value || typeof value !== 'object') continue;
// Original L214: Defines starts for use by the surrounding persistence logic.
          const starts = numberOr(value.starts, 0, 0);
// Original L215: Defines wins for use by the surrounding persistence logic.
          const wins = numberOr(value.wins, 0, 0);
// Original L216: Requires race starts/wins to be safe integers, caps starts at one million, and enforces wins ≤ starts.
          if (Number.isSafeInteger(starts) && Number.isSafeInteger(wins) && starts <= 1_000_000 && wins <= starts) {
// Original L217: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            runners[runnerId] = { starts, wins };
// Original L218: Closes the surrounding block or literal; no independent data transformation occurs here.
          }
// Original L219: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L220: Defines cursor for use by the surrounding persistence logic.
        const cursor = circuit.lastProcessedRaceId;
// Original L221: Returns an object with fields lastProcessedRaceId: checks uses checks whether `cursor` (cursor) is at least 0 only if calls `Number.isSafeInteger` with `cursor` (cursor) is truthy; otherwise keeps the falsy first value; if true chooses `cursor` (cursor), otherwise null; runners: `runners` (runners) to the caller and exits this function.
        return {
// Original L222: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
          lastProcessedRaceId: Number.isSafeInteger(cursor) && cursor >= 0 ? cursor : null,
// Original L223: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          runners
// Original L224: Closes the surrounding block or literal; no independent data transformation occurs here.
        };
// Original L225: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L226: Defines safeRaceExperience for use by the surrounding persistence logic.
      const safeRaceExperience = raceExperience ? {
// Original L227: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        horse: normalizeCircuit(raceExperience.horse, 'horse'),
// Original L228: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        car: normalizeCircuit(raceExperience.car, 'car')
// Original L229: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } : null;
// Original L230: Accepts a race bet only when ids, runner names, positive stake, and odds 1–100 are valid.
      const safeRaceBet = raceBet && Number.isSafeInteger(Number(raceBet.raceId)) && Number(raceBet.raceId) >= 0 &&
// Original L231: Implements this module operation and passes its validated result to the next persistence step.
        validRunnerId(raceBet.runnerId) && validRunnerId(raceBet.winnerId) &&
// Original L232: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        (raceBet.raceType === undefined || raceBet.raceType === null || ['horse', 'car'].includes(raceBet.raceType)) &&
// Original L233: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
        Number.isFinite(Number(raceBet.stake)) && Number(raceBet.stake) > 0 &&
// Original L234: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
        Number.isFinite(Number(raceBet.odds)) && Number(raceBet.odds) >= 1 && Number(raceBet.odds) <= 100
// Original L235: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        ? {
// Original L236: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          raceId: Number(raceBet.raceId),
// Original L237: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          raceType: ['horse', 'car'].includes(raceBet.raceType) ? raceBet.raceType : null,
// Original L238: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          runnerId: raceBet.runnerId,
// Original L239: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          winnerId: raceBet.winnerId,
// Original L240: Rounds accepted race stakes to cents so arithmetic is stable across serialization.
          stake: Math.round(Number(raceBet.stake) * 100) / 100,
// Original L241: Defines field odds as divides rounds multiplies converts `raceBet.odds` (the odds property of raceBet) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.
          odds: Math.round(Number(raceBet.odds) * 100) / 100,
// Original L242: Allows only race durations from 110,000 to 200,000 ms; other values become null.
          durationMs: Number.isSafeInteger(Number(raceBet.durationMs)) &&
// Original L243: Implements this module operation and passes its validated result to the next persistence step.
            Number(raceBet.durationMs) >= 110_000 && Number(raceBet.durationMs) <= 200_000
// Original L244: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            ? Number(raceBet.durationMs)
// Original L245: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
            : null
// Original L246: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L247: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        : null;
// Original L248: Validates a race result notice before retaining it as settlement evidence.
      const safeRaceResultNotice = raceResultNotice && Number.isSafeInteger(Number(raceResultNotice.raceId)) && Number(raceResultNotice.raceId) >= 0 &&
// Original L249: Implements this module operation and passes its validated result to the next persistence step.
        validRunnerId(raceResultNotice.runnerId) && validRunnerId(raceResultNotice.winnerId) &&
// Original L250: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        (raceResultNotice.raceType === undefined || raceResultNotice.raceType === null || ['horse', 'car'].includes(raceResultNotice.raceType)) &&
// Original L251: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
        Number.isFinite(Number(raceResultNotice.stake)) && Number(raceResultNotice.stake) > 0 &&
// Original L252: Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.
        Number.isFinite(Number(raceResultNotice.payout)) && Number(raceResultNotice.payout) >= 0 &&
// Original L253: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        typeof raceResultNotice.won === 'boolean'
// Original L254: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        ? {
// Original L255: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          raceId: Number(raceResultNotice.raceId),
// Original L256: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          raceType: ['horse', 'car'].includes(raceResultNotice.raceType) ? raceResultNotice.raceType : null,
// Original L257: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          runnerId: raceResultNotice.runnerId,
// Original L258: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          winnerId: raceResultNotice.winnerId,
// Original L259: Defines field stake as divides rounds multiplies converts `raceResultNotice.stake` (the stake property of raceResultNotice) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.
          stake: Math.round(Number(raceResultNotice.stake) * 100) / 100,
// Original L260: Defines field payout as divides rounds multiplies converts `raceResultNotice.payout` (the payout property of raceResultNotice) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.
          payout: Math.round(Number(raceResultNotice.payout) * 100) / 100,
// Original L261: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          won: raceResultNotice.won
// Original L262: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L263: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        : null;
// Original L264: Returns a complete normalized save, ensuring every persisted subsystem gets bounded defaults.
      return {
// Original L265: Defines a named field in the save/profile or UI data structure.
        player: {
// Original L266: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          balance: numberOr(player.balance, 100),
// Original L267: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          lastSpinTime: numberOr(player.lastSpinTime, 0),
// Original L268: Defines field level as chooses the largest of 1, rounds calls `numberOr` with `player.level` (the level property of player); 1; 1 down to the next whole number.
          level: Math.max(1, Math.floor(numberOr(player.level, 1, 1))),
// Original L269: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          xp: numberOr(player.xp, 0),
// Original L270: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          debt: numberOr(player.debt, 0),
// Original L271: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          creditLimit: numberOr(player.creditLimit, 2000),
// Original L272: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          maxBet: numberOr(player.maxBet, 100, 100)
// Original L273: Closes the surrounding block or literal; no independent data transformation occurs here.
        },
// Original L274: Defines a named field in the save/profile or UI data structure.
        settings: {
// Original L275: Defines field volume as chooses the largest of 0, chooses the smallest of 100, rounds calls `numberOr` with `settings.volume` (the volume property of settings); 80 to the nearest whole number.
          volume: Math.max(0, Math.min(100, Math.round(numberOr(settings.volume, 80)))),
// Original L276: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          isMuted: settings.isMuted === true,
// Original L277: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
// Original L278: Closes the surrounding block or literal; no independent data transformation occurs here.
        },
// Original L279: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        jackpot: numberOr(input.jackpot, 10000),
// Original L280: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        raceBet: safeRaceBet,
// Original L281: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        raceResultNotice: safeRaceResultNotice,
// Original L282: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        raceExperience: safeRaceExperience,
// Original L283: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        slotBonuses: this.normalizeSlotBonuses(input.slotBonuses),
// Original L284: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        accomplishments: this.normalizeAccomplishments(input.accomplishments),
// Original L285: Keeps only nonnegative safe integer revisions, which support stale-save comparisons.
        revision: Number.isSafeInteger(input.revision) && input.revision >= 0 ? input.revision : 0,
// Original L286: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : null,
// Original L287: Transforms or bounds the collection so only the intended normalized records continue.
        legacyProfiles: Array.isArray(input.legacyProfiles) ? input.legacyProfiles.slice(0, 100).map(profile => {
// Original L288: Defines archived for use by the surrounding persistence logic.
          const archived = profile && typeof profile === 'object' ? profile : {};
// Original L289: Defines archivedSave for use by the surrounding persistence logic.
          const archivedSave = this.normalizeSave({ player: archived.player, settings: archived.settings });
// Original L290: Returns an object with fields updatedAtMs: calls `numberOr` with `archived.updatedAtMs` (the updated at ms property of archived); 0; player: `archivedSave.player` (the player property of archivedSave); settings: `archivedSave.settings` (the settings property of archivedSave) to the caller and exits this function.
          return { updatedAtMs: numberOr(archived.updatedAtMs, 0), player: archivedSave.player, settings: archivedSave.settings };
// Original L291: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        }) : []
// Original L292: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L293: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L294: Blank line separates related logic for readability.

// Original L295: Explains that each profile gets a random salt and the derived key is never persisted.
    // PBKDF2 uses a random per-profile salt; the derived key itself is not written into browser storage.
// Original L296: Implements this module operation and passes its validated result to the next persistence step.
    async deriveKey(password, salt) {
// Original L297: Imports the password bytes as PBKDF2 key material; the raw password is not stored.
      const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
// Original L298: Returns calls `crypto.subtle.deriveKey` with an object with fields name: "PBKDF2"; salt: `salt` (salt); iterations: `PBKDF2_ITERATIONS` (pbkdf2 iterations); hash: "SHA-256"; `material` (material); an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to the caller and exits this function.
      return crypto.subtle.deriveKey(
// Original L299: Derives with per-profile salt, 310,000 iterations, and SHA-256.
        { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
// Original L300: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        material,
// Original L301: Produces a non-extractable 256-bit AES-GCM key for authenticated encryption.
        { name: 'AES-GCM', length: 256 },
// Original L302: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        false,
// Original L303: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        ['encrypt', 'decrypt']
// Original L304: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      );
// Original L305: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L306: Blank line separates related logic for readability.

// Original L307: Binds ciphertext authentication to format, profile id, and name so metadata swaps fail decryption.
    additionalData(profile) {
// Original L308: Returns calls `new TextEncoder().encode` with a text template that combines fixed text with computed values `FORMAT` (format), `profile.id` (the id property of profile), `profile.name` (the name property of profile) to the caller and exits this function.
      return new TextEncoder().encode(`${FORMAT}:${profile.id}:${profile.name}`);
// Original L309: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L310: Blank line separates related logic for readability.

// Original L311: Explains the AES-GCM integrity boundary and fresh 96-bit IV requirement.
    // AES-GCM authenticates contents and profile identity; every encryption uses a fresh random 96-bit IV.
// Original L312: Implements this module operation and passes its validated result to the next persistence step.
    async encryptSave(profile, key, save) {
// Original L313: Generates a fresh random 12-byte IV for each encryption, preventing nonce reuse.
      const iv = crypto.getRandomValues(new Uint8Array(12));
// Original L314: Defines profileSave for use by the surrounding persistence logic.
      const profileSave = this.normalizeSave(save);
// Original L315: Omits jackpot from encrypted profile data because jackpot is shared/current runtime state in this app.
      delete profileSave.jackpot;
// Original L316: Defines ciphertext for use by the surrounding persistence logic.
      const ciphertext = await crypto.subtle.encrypt(
// Original L317: Defines a named field in the save/profile or UI data structure.
        { name: 'AES-GCM', iv, additionalData: this.additionalData(profile) },
// Original L318: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        key,
// Original L319: Serializes the normalized save as UTF-8 JSON before authenticated encryption.
        new TextEncoder().encode(JSON.stringify(profileSave))
// Original L320: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      );
// Original L321: Returns an object with fields iv: calls `this.toBase64` with `iv` (iv); ciphertext: calls `this.toBase64` with constructs a new instance of `Uint8Array` with `ciphertext` (ciphertext) to the caller and exits this function.
      return { iv: this.toBase64(iv), ciphertext: this.toBase64(new Uint8Array(ciphertext)) };
// Original L322: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L323: Blank line separates related logic for readability.

// Original L324: Notes that AES-GCM authentication turns wrong passwords or tampering into a failure, not partial plaintext.
    // Wrong passwords or modified ciphertext fail authentication instead of returning partial profile data.
// Original L325: Implements this module operation and passes its validated result to the next persistence step.
    async decryptSave(profile, key) {
// Original L326: Defines plaintext for use by the surrounding persistence logic.
      const plaintext = await crypto.subtle.decrypt(
// Original L327: Defines a named field in the save/profile or UI data structure.
        { name: 'AES-GCM', iv: this.fromBase64(profile.iv), additionalData: this.additionalData(profile) },
// Original L328: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        key,
// Original L329: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.fromBase64(profile.ciphertext)
// Original L330: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      );
// Original L331: Parses decrypted JSON then normalizes it again before returning it to game code.
      return this.normalizeSave(JSON.parse(new TextDecoder().decode(plaintext)));
// Original L332: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L333: Blank line separates related logic for readability.

// Original L334: Encodes bytes as base64 for JSON/localStorage transport; this is encoding, not hashing.
    toBase64(bytes) { return btoa(String.fromCharCode(...bytes)); }
// Original L335: Decodes base64 back to bytes for Web Crypto.
    fromBase64(text) { return Uint8Array.from(atob(text), character => character.charCodeAt(0)); }
// Original L336: Blank line separates related logic for readability.

// Original L337: Implements this module operation and passes its validated result to the next persistence step.
    writeDatabase() {
// Original L338: Defines text for use by the surrounding persistence logic.
      const text = JSON.stringify(this.database);
// Original L339: Serializes the profile database and writes it atomically through localStorage.
      try { localStorage.setItem(DATABASE_KEY, text); return true; }
// Original L340: Reports storage failure and returns false, so callers do not claim an unsaved write succeeded.
      catch (error) { window.LocalSave?.setStatus('Profile storage failed; no successful save was reported.', 'warning'); return false; }
// Original L341: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L342: Blank line separates related logic for readability.

// Original L343: Implements this module operation and passes its validated result to the next persistence step.
    setContent(title, description, includeCancel = false) {
// Original L344: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.replaceChildren();
// Original L345: Defines heading for use by the surrounding persistence logic.
      const heading = document.createElement('h2');
// Original L346: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      heading.id = 'profile-gate-title';
// Original L347: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      heading.textContent = title;
// Original L348: Defines subtitle for use by the surrounding persistence logic.
      const subtitle = document.createElement('p');
// Original L349: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      subtitle.className = 'profile-subtitle';
// Original L350: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      subtitle.textContent = description;
// Original L351: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.append(heading, subtitle);
// Original L352: Defines form for use by the surrounding persistence logic.
      const form = document.createElement('div');
// Original L353: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      form.className = 'profile-form';
// Original L354: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.append(form);
// Original L355: Defines feedback for use by the surrounding persistence logic.
      const feedback = document.createElement('div');
// Original L356: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      feedback.className = 'profile-feedback';
// Original L357: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      feedback.setAttribute('aria-live', 'polite');
// Original L358: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.append(feedback);
// Original L359: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (includeCancel) {
// Original L360: Defines cancel for use by the surrounding persistence logic.
        const cancel = document.createElement('button');
// Original L361: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        cancel.className = 'profile-secondary-btn';
// Original L362: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        cancel.type = 'button';
// Original L363: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        cancel.textContent = 'Cancel';
// Original L364: Connects this UI event to the corresponding save/profile action when the control exists.
        cancel.addEventListener('click', () => this.gate.classList.add('hidden-view'));
// Original L365: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        form.append(cancel);
// Original L366: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L367: Returns an object with fields form: `form` (form); feedback: `feedback` (feedback) to the caller and exits this function.
      return { form, feedback };
// Original L368: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L369: Blank line separates related logic for readability.

// Original L370: Implements this module operation and passes its validated result to the next persistence step.
    addField(form, labelText, type, autocomplete, maxLength = 64) {
// Original L371: Defines label for use by the surrounding persistence logic.
      const label = document.createElement('label');
// Original L372: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      label.className = 'profile-field';
// Original L373: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      label.textContent = labelText;
// Original L374: Defines input for use by the surrounding persistence logic.
      const input = document.createElement('input');
// Original L375: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      input.type = type;
// Original L376: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      input.autocomplete = autocomplete;
// Original L377: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      input.maxLength = maxLength;
// Original L378: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      input.required = true;
// Original L379: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (type === 'password') input.minLength = 8;
// Original L380: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      label.append(input);
// Original L381: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      form.append(label);
// Original L382: Returns `input` (input) to the caller and exits this function.
      return input;
// Original L383: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L384: Blank line separates related logic for readability.

// Original L385: Implements this module operation and passes its validated result to the next persistence step.
    addButton(form, text, className = 'profile-primary-btn') {
// Original L386: Defines button for use by the surrounding persistence logic.
      const button = document.createElement('button');
// Original L387: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      button.type = 'button';
// Original L388: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      button.className = className;
// Original L389: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      button.textContent = text;
// Original L390: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      form.append(button);
// Original L391: Returns `button` (button) to the caller and exits this function.
      return button;
// Original L392: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L393: Blank line separates related logic for readability.

// Original L394: Implements this module operation and passes its validated result to the next persistence step.
    addNote(text) {
// Original L395: Defines note for use by the surrounding persistence logic.
      const note = document.createElement('p');
// Original L396: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      note.className = 'profile-note';
// Original L397: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      note.textContent = text;
// Original L398: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.append(note);
// Original L399: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L400: Blank line separates related logic for readability.

// Original L401: Implements this module operation and passes its validated result to the next persistence step.
    renderMessage(title, message) {
// Original L402: Defines a local value for use by the surrounding persistence logic.
      const { feedback } = this.setContent(title, message);
// Original L403: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      feedback.textContent = 'No data has been changed.';
// Original L404: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L405: Blank line separates related logic for readability.

// Original L406: Implements this module operation and passes its validated result to the next persistence step.
    async showFirstProfileSetup(legacySave) {
// Original L407: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.gate?.classList.remove('hidden-view');
// Original L408: Defines a local value for use by the surrounding persistence logic.
      const { form, feedback } = this.setContent(
// Original L409: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        'Create your first profile',
// Original L410: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        'Set up a password-protected profile on this browser. Your game data will be encrypted and kept on this device.'
// Original L411: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      );
// Original L412: Detects old unencrypted keys or archived profiles to show a migration notice.
      const legacyDataExists = LEGACY_KEYS.some(key => localStorage.getItem(key) !== null) || this.readLegacyProfiles().length > 0;
// Original L413: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (legacyDataExists) {
// Original L414: Defines migration for use by the surrounding persistence logic.
        const migration = document.createElement('p');
// Original L415: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        migration.className = 'profile-migration-note';
// Original L416: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        migration.textContent = 'Your existing local casino progress will be moved into this first profile.';
// Original L417: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.content.insertBefore(migration, form);
// Original L418: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L419: Defines name for use by the surrounding persistence logic.
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
// Original L420: Defines password for use by the surrounding persistence logic.
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
// Original L421: Defines confirmation for use by the surrounding persistence logic.
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
// Original L422: Defines create for use by the surrounding persistence logic.
      const create = this.addButton(form, 'Create protected profile');
// Original L423: Connects this UI event to the corresponding save/profile action when the control exists.
      create.addEventListener('click', async () => {
// Original L424: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        feedback.textContent = '';
// Original L425: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
// Original L426: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
// Original L427: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
// Original L428: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        create.disabled = true;
// Original L429: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
        try {
// Original L430: Waits for the asynchronous storage, encryption, or UI operation before continuing.
          await this.createProfile(name.value, password.value, legacySave);
// Original L431: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (this.database.profiles.length) this.removeLegacyKeys();
// Original L432: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.updateProfileButton();
// Original L433: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        } catch (error) {
// Original L434: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          feedback.textContent = error.message || 'Could not create the profile. Check browser storage and try again.';
// Original L435: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          create.disabled = false;
// Original L436: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L437: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L438: Warns that profiles stay on this browser, passwords are not recoverable, and backups are needed for portability.
      this.addNote('Profiles are local to this browser and do not sync between devices. Keep your password safe: it cannot be reset or recovered. Export a save backup from inside the game for portability.');
// Original L439: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      await new Promise(resolve => { this.finishInitialSetup = resolve; });
// Original L440: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L441: Blank line separates related logic for readability.

// Original L442: Implements this module operation and passes its validated result to the next persistence step.
    async showUnlockScreen(isStartup = true) {
// Original L443: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.gate?.classList.remove('hidden-view');
// Original L444: Defines a local value for use by the surrounding persistence logic.
      const { form, feedback } = this.setContent(
// Original L445: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        'Choose a local profile',
// Original L446: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        'Enter that profile’s password to decrypt its casino save on this device.',
// Original L447: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        !isStartup
// Original L448: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      );
// Original L449: Defines list for use by the surrounding persistence logic.
      const list = document.createElement('div');
// Original L450: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      list.className = 'profile-list';
// Original L451: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.content.insertBefore(list, form);
// Original L452: Defines selected for use by the surrounding persistence logic.
      const selected = { profile: null };
// Original L453: Transforms or bounds the collection so only the intended normalized records continue.
      this.database.profiles.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(profile => {
// Original L454: Defines button for use by the surrounding persistence logic.
        const button = document.createElement('button');
// Original L455: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        button.type = 'button';
// Original L456: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        button.className = 'profile-choice-btn';
// Original L457: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        button.textContent = profile.name;
// Original L458: Connects this UI event to the corresponding save/profile action when the control exists.
        button.addEventListener('click', () => {
// Original L459: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          selected.profile = profile;
// Original L460: Finds or creates the UI element used to present this profile/save state.
          list.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
// Original L461: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          password.disabled = false;
// Original L462: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          unlock.disabled = false;
// Original L463: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          password.focus();
// Original L464: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          feedback.textContent = '';
// Original L465: Closes the surrounding block or literal; no independent data transformation occurs here.
        });
// Original L466: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        list.append(button);
// Original L467: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L468: Defines password for use by the surrounding persistence logic.
      const password = this.addField(form, 'Profile password', 'password', 'current-password', 128);
// Original L469: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      password.disabled = true;
// Original L470: Defines unlock for use by the surrounding persistence logic.
      const unlock = this.addButton(form, 'Unlock profile');
// Original L471: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      unlock.disabled = true;
// Original L472: Defines create for use by the surrounding persistence logic.
      const create = this.addButton(form, 'Create another profile', 'profile-secondary-btn');
// Original L473: Connects this UI event to the corresponding save/profile action when the control exists.
      create.addEventListener('click', () => this.showAdditionalProfileSetup());
// Original L474: Connects this UI event to the corresponding save/profile action when the control exists.
      unlock.addEventListener('click', async () => {
// Original L475: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!selected.profile) { feedback.textContent = 'Choose a profile first.'; return; }
// Original L476: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        unlock.disabled = true;
// Original L477: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        feedback.textContent = 'Unlocking…';
// Original L478: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
        try {
// Original L479: Defines profile for use by the surrounding persistence logic.
          const profile = selected.profile;
// Original L480: Defines key for use by the surrounding persistence logic.
          const key = await this.deriveKey(password.value, this.fromBase64(profile.salt));
// Original L481: Defines save for use by the surrounding persistence logic.
          const save = await this.decryptSave(profile, key);
// Original L482: Waits for the asynchronous storage, encryption, or UI operation before continuing.
          await this.activateProfile(profile, key, save);
// Original L483: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (isStartup) {
// Original L484: Guards the following operation so invalid, missing, or unsafe state is not applied.
            if (this.finishInitialUnlock) this.finishInitialUnlock();
// Original L485: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          } else {
// Original L486: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
            this.gate.classList.add('hidden-view');
// Original L487: Waits for the asynchronous storage, encryption, or UI operation before continuing.
            await this.onProfileChanged?.(this.getCurrentSave(), profile);
// Original L488: Closes the surrounding block or literal; no independent data transformation occurs here.
          }
// Original L489: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.updateProfileButton();
// Original L490: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        } catch (error) {
// Original L491: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          feedback.textContent = 'That password did not unlock this profile. Try again.';
// Original L492: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          password.value = '';
// Original L493: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          unlock.disabled = false;
// Original L494: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          password.focus();
// Original L495: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L496: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L497: Connects this UI event to the corresponding save/profile action when the control exists.
      password.addEventListener('keydown', event => { if (event.key === 'Enter' && !unlock.disabled) unlock.click(); });
// Original L498: Warns that forgetting the password makes encrypted data unrecoverable and nothing is synchronized.
      this.addNote('The password encrypts profile data in this browser. Forgetting it means the encrypted profile cannot be recovered. Profiles and passwords are not uploaded or synchronized.');
// Original L499: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (isStartup) await new Promise(resolve => { this.finishInitialUnlock = resolve; });
// Original L500: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L501: Blank line separates related logic for readability.

// Original L502: Implements this module operation and passes its validated result to the next persistence step.
    async showAdditionalProfileSetup() {
// Original L503: Defines a local value for use by the surrounding persistence logic.
      const { form, feedback } = this.setContent('Create a profile', 'Each profile has its own password, chips, level, loans, daily bonus, and settings.');
// Original L504: Defines back for use by the surrounding persistence logic.
      const back = this.addButton(form, 'Back to profile list', 'profile-secondary-btn');
// Original L505: Connects this UI event to the corresponding save/profile action when the control exists.
      back.addEventListener('click', () => this.showUnlockScreen(!this.activeProfile));
// Original L506: Defines name for use by the surrounding persistence logic.
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
// Original L507: Defines password for use by the surrounding persistence logic.
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
// Original L508: Defines confirmation for use by the surrounding persistence logic.
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
// Original L509: Defines create for use by the surrounding persistence logic.
      const create = this.addButton(form, 'Create and open profile');
// Original L510: Connects this UI event to the corresponding save/profile action when the control exists.
      create.addEventListener('click', async () => {
// Original L511: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        feedback.textContent = '';
// Original L512: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
// Original L513: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
// Original L514: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
// Original L515: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        create.disabled = true;
// Original L516: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
        try {
// Original L517: Defines profile for use by the surrounding persistence logic.
          const profile = await this.createProfile(name.value, password.value, DEFAULT_SAVE);
// Original L518: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (this.finishInitialUnlock) this.finishInitialUnlock();
// Original L519: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
          this.gate.classList.add('hidden-view');
// Original L520: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          this.updateProfileButton();
// Original L521: Waits for the asynchronous storage, encryption, or UI operation before continuing.
          await this.onProfileChanged?.(this.getCurrentSave(), profile);
// Original L522: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        } catch (error) {
// Original L523: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          feedback.textContent = error.message || 'Could not create the profile.';
// Original L524: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          create.disabled = false;
// Original L525: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L526: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L527: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L528: Blank line separates related logic for readability.

// Original L529: States that names are validated before fresh salt generation and encryption.
    // Validate and normalize names before generating fresh salt and encrypting the new profile save.
// Original L530: Implements this module operation and passes its validated result to the next persistence step.
    async createProfile(nameValue, password, initialSave) {
// Original L531: Defines name for use by the surrounding persistence logic.
      const name = nameValue.trim().replace(/\s+/g, ' ');
// Original L532: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!name || name.length > 24) throw new Error('Profile names must be 1–24 characters.');
// Original L533: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.database.profiles.some(profile => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
// Original L534: Stops processing with a user-facing validation/storage error rather than accepting unsafe data.
        throw new Error('A profile with that name already exists.');
// Original L535: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L536: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (password.length < 8 || password.length > 128) throw new Error('Passwords must be 8–128 characters.');
// Original L537: Defines profile for use by the surrounding persistence logic.
      const profile = {
// Original L538: Creates a random UUID and creation timestamp plus a random 16-byte salt; IV/ciphertext are filled after encryption.
        id: crypto.randomUUID(), name, createdAt: new Date().toISOString(),
// Original L539: Uses browser cryptography for password-derived key handling or authenticated profile encryption.
        salt: this.toBase64(crypto.getRandomValues(new Uint8Array(16))), iv: '', ciphertext: ''
// Original L540: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L541: Derives the profile key from the user password and generated salt.
      const key = await this.deriveKey(password, this.fromBase64(profile.salt));
// Original L542: Encrypts the initial normalized save before storing the profile record.
      const sealed = await this.encryptSave(profile, key, initialSave);
// Original L543: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      profile.iv = sealed.iv;
// Original L544: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      profile.ciphertext = sealed.ciphertext;
// Original L545: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
      this.database.profiles.push(profile);
// Original L546: Persists the profile and removes it again on storage failure, protecting legacy data from premature deletion.
      if (!this.writeDatabase()) { this.database.profiles = this.database.profiles.filter(item => item !== profile); throw new Error('Profile could not be durably saved. No legacy data was removed.'); }
// Original L547: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      await this.activateProfile(profile, key, initialSave);
// Original L548: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.finishInitialSetup) this.finishInitialSetup();
// Original L549: Returns `profile` (profile) to the caller and exits this function.
      return profile;
// Original L550: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L551: Blank line separates related logic for readability.

// Original L552: Implements this module operation and passes its validated result to the next persistence step.
    async activateProfile(profile, key, save) {
// Original L553: Waits for the asynchronous storage, encryption, or UI operation before continuing.
      await this.flushSave();
// Original L554: Stores the activeProfile runtime reference/state on this manager so later save operations can reuse it.
      this.activeProfile = profile;
// Original L555: Stores the activeKey runtime reference/state on this manager so later save operations can reuse it.
      this.activeKey = key;
// Original L556: Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.
      this.currentSave = this.normalizeSave(save);
// Original L557: Stores the lastDurableSave runtime reference/state on this manager so later save operations can reuse it.
      this.lastDurableSave = this.currentSave;
// Original L558: Stores the durableProfileId runtime reference/state on this manager so later save operations can reuse it.
      this.durableProfileId = profile.id;
// Original L559: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L560: Blank line separates related logic for readability.

// Original L561: Implements this module operation and passes its validated result to the next persistence step.
    openSwitcher() {
// Original L562: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.canSwitchProfile()) {
// Original L563: Implements this module operation and passes its validated result to the next persistence step.
        alert('Finish the current game round and return to the lobby before switching profiles.');
// Original L564: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        return;
// Original L565: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L566: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.gate?.classList.remove('hidden-view');
// Original L567: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.showUnlockScreen(false);
// Original L568: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L569: Blank line separates related logic for readability.

// Original L570: Implements this module operation and passes its validated result to the next persistence step.
    async getSelectedProfileAndUnlock(profile, password, feedback) {
// Original L571: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
      try {
// Original L572: Defines key for use by the surrounding persistence logic.
        const key = await this.deriveKey(password, this.fromBase64(profile.salt));
// Original L573: Defines save for use by the surrounding persistence logic.
        const save = await this.decryptSave(profile, key);
// Original L574: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        await this.activateProfile(profile, key, save);
// Original L575: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
        this.gate?.classList.add('hidden-view');
// Original L576: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        this.updateProfileButton();
// Original L577: Waits for the asynchronous storage, encryption, or UI operation before continuing.
        await this.onProfileChanged?.(this.getCurrentSave(), profile);
// Original L578: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      } catch (error) {
// Original L579: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        feedback.textContent = 'That password did not unlock this profile. Try again.';
// Original L580: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L581: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L582: Blank line separates related logic for readability.

// Original L583: Implements this module operation and passes its validated result to the next persistence step.
    getCurrentSave() {
// Original L584: Returns calls `this.normalizeSave` with uses `this.currentSave` (the current save property of this) when it is truthy, otherwise falls back to `DEFAULT_SAVE` (default save) to the caller and exits this function.
      return this.normalizeSave(this.currentSave || DEFAULT_SAVE);
// Original L585: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L586: Blank line separates related logic for readability.

// Original L587: Explains optimistic snapshots plus queued encryption: rapid updates stay ordered and profile switches cannot cross-write.
    // Snapshot normalized data and queue encryption so rapid updates stay ordered and profile switches cannot cross-write.
// Original L588: Implements this module operation and passes its validated result to the next persistence step.
    saveCurrent(partial = {}) {
// Original L589: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.activeProfile || !this.activeKey) return Promise.resolve(false);
// Original L590: Defines previous for use by the surrounding persistence logic.
      const previous = this.currentSave;
// Original L591: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.durableProfileId !== this.activeProfile.id || !this.lastDurableSave) { this.lastDurableSave = previous; this.durableProfileId = this.activeProfile.id; }
// Original L592: Merges partial changes, increments revision at least once, and stamps a fresh ISO timestamp.
      const snapshot = this.normalizeSave({ ...previous, ...partial, revision: Math.max(Number(previous?.revision) || 0, Number(partial.revision) || 0) + 1, updatedAt: new Date().toISOString() });
// Original L593: Defines changes for use by the surrounding persistence logic.
      const changes = Object.fromEntries(Object.keys(partial).map(key => [key, snapshot[key]]));
// Original L594: Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.
      this.currentSave = snapshot;
// Original L595: Defines profileId for use by the surrounding persistence logic.
      const profileId = this.activeProfile.id;
// Original L596: Defines task for use by the surrounding persistence logic.
      const task = this.saveQueue.catch(() => false).then(async () => {
// Original L597: Defines profile for use by the surrounding persistence logic.
        const profile = this.database.profiles.find(item => item.id === profileId);
// Original L598: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!profile || !this.activeKey || this.activeProfile?.id !== profileId) return false;
// Original L599: Comment: Rebase only this call's fields on the last successful write, not a failed optimistic predecessor.
        // Rebase only this call's fields on the last successful write, not a failed optimistic predecessor.
// Original L600: Rebases this write onto the last successful durable snapshot so a failed predecessor cannot contaminate it.
        const durableSnapshot = this.normalizeSave({ ...this.lastDurableSave, ...changes, revision: snapshot.revision, updatedAt: snapshot.updatedAt });
// Original L601: Defines oldRecord for use by the surrounding persistence logic.
        const oldRecord = { iv: profile.iv, ciphertext: profile.ciphertext, updatedAt: profile.updatedAt };
// Original L602: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
        try {
// Original L603: Encrypts the rebased snapshot with the active profile key.
          const sealed = await this.encryptSave(profile, this.activeKey, durableSnapshot);
// Original L604: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          profile.iv = sealed.iv; profile.ciphertext = sealed.ciphertext; profile.updatedAt = new Date().toISOString();
// Original L605: Refuses to report success unless the encrypted database write succeeds.
          if (!this.writeDatabase()) throw new Error('Profile storage failed');
// Original L606: Stores the lastDurableSave runtime reference/state on this manager so later save operations can reuse it.
          this.lastDurableSave = durableSnapshot;
// Original L607: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (this.currentSave === snapshot) this.currentSave = durableSnapshot;
// Original L608: Returns true to the caller and exits this function.
          return true;
// Original L609: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        } catch (error) {
// Original L610: Restores the previous ciphertext metadata after an encryption/storage failure.
          profile.iv = oldRecord.iv; profile.ciphertext = oldRecord.ciphertext; profile.updatedAt = oldRecord.updatedAt;
// Original L611: Guards the following operation so invalid, missing, or unsafe state is not applied.
          if (this.currentSave === snapshot) this.currentSave = this.lastDurableSave;
// Original L612: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
          console.error('Encrypted local profile save failed.', error);
// Original L613: Uses the browser UI/global integration to coordinate this save or profile operation.
          window.LocalSave?.setStatus('Profile encryption could not be saved to this browser. Export a backup and check available storage.', 'warning');
// Original L614: Returns false to the caller and exits this function.
          return false;
// Original L615: Closes the surrounding block or literal; no independent data transformation occurs here.
        }
// Original L616: Closes the surrounding block or literal; no independent data transformation occurs here.
      });
// Original L617: Stores the saveQueue runtime reference/state on this manager so later save operations can reuse it.
      this.saveQueue = task;
// Original L618: Returns `task` (task) to the caller and exits this function.
      return task;
// Original L619: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L620: Waits for queued encryption before switching active keys, preventing cross-profile writes.
    // Wait for the previous profile write before changing the active encryption key.
// Original L621: Waits for the asynchronous storage, encryption, or UI operation before continuing.
    async flushSave() { return await this.saveQueue.catch(() => false); }
// Original L622: Blank line separates related logic for readability.

// Original L623: Implements this module operation and passes its validated result to the next persistence step.
    updateProfileButton() {
// Original L624: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.profileName) this.profileName.textContent = this.activeProfile ? this.activeProfile.name : 'Choose profile';
// Original L625: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L626: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L627: Blank line separates related logic for readability.

// Original L628: Uses the browser UI/global integration to coordinate this save or profile operation.
  window.LocalProfileManager = LocalProfileManager;
// Original L629: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
})();
