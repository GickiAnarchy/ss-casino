# src/js/profiles.js

[Exact copy](../../../original/src/js/profiles.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/*
```

Comment: 

### Line 2

```text
 * Password-protected profiles stay on this browser origin. PBKDF2 derives an AES-GCM key; only profile metadata
```

Explains the privacy model: PBKDF2 derives an AES-GCM key, while only metadata/ciphertext leave the encrypted save.

### Line 3

```text
 * and ciphertext are stored outside the encrypted save. This is local privacy, not an online identity service.
```

Clarifies that browser-origin encryption is local privacy, not an account or server identity.

### Line 4

```text
 */
```

Comment: 

### Line 5

```text
/* Browser-local multi-user profiles; profile data is encrypted with a password-derived AES-GCM key. */
```

Comment: Browser-local multi-user profiles; profile data is encrypted with a password-derived AES-GCM key. */

### Line 6

```text
(function installLocalProfileManager() {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 7

```text
  const DATABASE_KEY = 'ss_casino_profiles_v1';
```

Defines DATABASE_KEY for use by the surrounding persistence logic.

### Line 8

```text
  const DATABASE_VERSION = 1;
```

Defines DATABASE_VERSION for use by the surrounding persistence logic.

### Line 9

```text
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
```

Defines RECOVERY_KEY for use by the surrounding persistence logic.

### Line 10

```text
  const FORMAT = 'ss-casino-encrypted-profile';
```

Defines FORMAT for use by the surrounding persistence logic.

### Line 11

```text
  // Expensive password derivation slows offline guessing; keep this setting stable so existing profiles still unlock.
```

Comment: Expensive password derivation slows offline guessing; keep this setting stable so existing profiles still unlock.

### Line 12

```text
  const PBKDF2_ITERATIONS = 310000;
```

Sets PBKDF2 to 310,000 SHA-256 iterations; changing it would prevent existing profiles from deriving the same key.

### Line 13

```text
  const LEGACY_PROFILE_PREFIX = 'ss_casino_profile_v1_';
```

Defines LEGACY_PROFILE_PREFIX for use by the surrounding persistence logic.

### Line 14

```text
  const LEGACY_KEYS = [
```

Defines LEGACY_KEYS for use by the surrounding persistence logic.

### Line 15

```text
    'casino_hub_player', 'casino_hub_xp', 'casino_hub_debt',
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 16

```text
    'casino_hub_wheel', 'casino_hub_credit_limit', 'casino_hub_max_bet', 'casino_hub_settings',
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 17

```text
    'casino_hub_jackpot'
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 18

```text
  ];
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 19

```text
  // Defaults create a new profile or fill missing fields; valid balances from existing profiles are preserved.
```

Comment: Defaults create a new profile or fill missing fields; valid balances from existing profiles are preserved.

### Line 20

```text
  const DEFAULT_SAVE = Object.freeze({
```

Defines the normalized save shape and defaults used for new or missing fields.

### Line 21

```text
    player: { balance: 100, lastSpinTime: 0, level: 1, xp: 0, debt: 0, creditLimit: 2000, maxBet: 100 },
```

Initializes virtual-chip player values: 100 balance, level 1, zero XP/debt, 2,000 credit limit, and 100 minimum max bet.

### Line 22

```text
    settings: { volume: 80, isMuted: false, theme: 'vegas' },
```

Defines a named field in the save/profile or UI data structure.

### Line 23

```text
    jackpot: 10000,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 24

```text
    raceBet: null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 25

```text
    raceResultNotice: null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 26

```text
    raceExperience: null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 27

```text
    slotBonuses: {},
```

Defines a named field in the save/profile or UI data structure.

### Line 28

```text
    accomplishments: {},
```

Defines a named field in the save/profile or UI data structure.

### Line 29

```text
    revision: 0,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 30

```text
    updatedAt: null
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 31

```text
  });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 32

```text

```

Blank line separates related logic for readability.

### Line 33

```text
  /** Owns profile creation, unlock, AES-GCM encryption, legacy migration, and ordered localStorage writes. */
```

Summarizes that this manager owns profile lifecycle, AES-GCM, legacy migration, and serialized writes.

### Line 34

```text
  class LocalProfileManager {
```

Declares the class that groups this module’s related state and operations.

### Line 35

```text
    constructor() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 36

```text
      this.activeProfile = null;
```

Stores the activeProfile runtime reference/state on this manager so later save operations can reuse it.

### Line 37

```text
      this.activeKey = null;
```

Stores the activeKey runtime reference/state on this manager so later save operations can reuse it.

### Line 38

```text
      this.currentSave = null;
```

Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.

### Line 39

```text
      this.database = null;
```

Stores the database runtime reference/state on this manager so later save operations can reuse it.

### Line 40

```text
      this.saveQueue = Promise.resolve();
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 41

```text
      this.gate = document.getElementById('profile-gate');
```

Finds or creates the UI element used to present this profile/save state.

### Line 42

```text
      this.content = document.getElementById('profile-gate-content');
```

Finds or creates the UI element used to present this profile/save state.

### Line 43

```text
      this.profileButton = document.getElementById('btn-profile-manager');
```

Finds or creates the UI element used to present this profile/save state.

### Line 44

```text
      this.profileName = document.getElementById('active-profile-name');
```

Finds or creates the UI element used to present this profile/save state.

### Line 45

```text
      this.onProfileChanged = null;
```

Stores the onProfileChanged runtime reference/state on this manager so later save operations can reuse it.

### Line 46

```text
      this.canSwitchProfile = () => true;
```

Stores the canSwitchProfile runtime reference/state on this manager so later save operations can reuse it.

### Line 47

```text
      this.busy = false;
```

Stores the busy runtime reference/state on this manager so later save operations can reuse it.

### Line 48

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 49

```text

```

Blank line separates related logic for readability.

### Line 50

```text
    async initialize() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 51

```text
      if (!window.crypto?.subtle || !window.isSecureContext) {
```

Requires Web Crypto and a secure context (HTTPS/localhost); without them encrypted profiles are not created or changed.

### Line 52

```text
        this.renderMessage('Secure browser storage is unavailable', 'Open the casino over HTTPS or on localhost in a modern browser to use encrypted profiles. No profile data was changed.');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 53

```text
        throw new Error('Web Crypto is required for encrypted local profiles.');
```

Stops processing with a user-facing validation/storage error rather than accepting unsafe data.

### Line 54

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 55

```text
      this.database = this.readDatabase();
```

Stores the database runtime reference/state on this manager so later save operations can reuse it.

### Line 56

```text
      this.profileButton?.addEventListener('click', () => this.openSwitcher());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 57

```text
      if (this.database.profiles.length === 0) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 58

```text
        const legacySave = this.readLegacySave();
```

Defines legacySave for use by the surrounding persistence logic.

### Line 59

```text
        legacySave.legacyProfiles = this.readLegacyProfiles();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 60

```text
        await this.showFirstProfileSetup(legacySave);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 61

```text
        if (this.database.profiles.length) this.removeLegacyKeys();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 62

```text
      } else {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 63

```text
        await this.showUnlockScreen();
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 64

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 65

```text
      this.gate?.classList.add('hidden-view');
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 66

```text
      this.updateProfileButton();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 67

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 68

```text

```

Blank line separates related logic for readability.

### Line 69

```text
    // Treat the persisted envelope as untrusted input and stop if its schema is incomplete or unknown.
```

Treats database JSON as untrusted input and refuses incomplete or unknown schemas.

### Line 70

```text
    readDatabase() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 71

```text
      const raw = localStorage.getItem(DATABASE_KEY);
```

Defines raw for use by the surrounding persistence logic.

### Line 72

```text
      if (!raw) return { version: DATABASE_VERSION, profiles: [] };
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 73

```text
      let value;
```

Defines value for use by the surrounding persistence logic.

### Line 74

```text
      try { value = JSON.parse(raw); } catch (error) {
```

Deserializes JSON and feeds the resulting data into validation before it can affect live state.

### Line 75

```text
        this.renderMessage('Local profile data could not be read', 'The profile database is malformed. Do not clear browser storage if you need these profiles.');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 76

```text
        throw new Error('Malformed local profile database.');
```

Stops processing with a user-facing validation/storage error rather than accepting unsafe data.

### Line 77

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 78

```text
      if (value?.version !== DATABASE_VERSION || !Array.isArray(value.profiles)) {
```

Accepts only database version 1 with an array of profiles, preventing accidental interpretation of another format.

### Line 79

```text
        this.renderMessage('Unsupported local profile data', 'This profile database version is not supported by this app build. No data was changed.');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 80

```text
        throw new Error('Unsupported local profile database.');
```

Stops processing with a user-facing validation/storage error rather than accepting unsafe data.

### Line 81

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 82

```text
      const seen = new Set();
```

Defines seen for use by the surrounding persistence logic.

### Line 83

```text
      for (const profile of value.profiles) {
```

Iterates through bounded saved records so each candidate can be validated before retention.

### Line 84

```text
        if (!profile || typeof profile.id !== 'string' || typeof profile.name !== 'string' ||
```

Validates each profile’s string identifiers and ciphertext fields and rejects duplicate ids.

### Line 85

```text
            typeof profile.salt !== 'string' || typeof profile.iv !== 'string' || typeof profile.ciphertext !== 'string' || seen.has(profile.id)) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 86

```text
          this.renderMessage('Local profile data could not be read', 'A profile record is incomplete or duplicated. No data was changed.');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 87

```text
          throw new Error('Invalid local profile record.');
```

Stops processing with a user-facing validation/storage error rather than accepting unsafe data.

### Line 88

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 89

```text
        seen.add(profile.id);
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 90

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 91

```text
      return value;
```

Returns `value` (value) to the caller and exits this function.

### Line 92

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 93

```text

```

Blank line separates related logic for readability.

### Line 94

```text
    readLegacySave() {
```

Reads old unencrypted localStorage keys as migration input, not as the new storage format.

### Line 95

```text
      const readJson = key => { try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch (error) { return {}; } };
```

Defines readJson for use by the surrounding persistence logic.

### Line 96

```text
      const oldPlayer = readJson('casino_hub_player');
```

Defines oldPlayer for use by the surrounding persistence logic.

### Line 97

```text
      const oldXp = readJson('casino_hub_xp');
```

Defines oldXp for use by the surrounding persistence logic.

### Line 98

```text
      const readNumber = (value, fallback, minimum = 0) => {
```

Defines readNumber for use by the surrounding persistence logic.

### Line 99

```text
        if (value === null || value === undefined || value === '') return fallback;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 100

```text
        const parsed = Number(value);
```

Defines parsed for use by the surrounding persistence logic.

### Line 101

```text
        return Number.isFinite(parsed) && parsed >= minimum ? parsed : fallback;
```

Returns checks uses checks whether `parsed` (parsed) is at least `minimum` (minimum) only if checks that `parsed` (parsed) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `parsed` (parsed), otherwise `fallback` (fallback) to the caller and exits this function.

### Line 102

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 103

```text
      let settings = readJson('casino_hub_settings');
```

Defines settings for use by the surrounding persistence logic.

### Line 104

```text
      const themes = ['vegas', 'midnight', 'gold', 'money'];
```

Defines themes for use by the surrounding persistence logic.

### Line 105

```text
      settings = {
```

Assigns the computed settings value used by the surrounding validation or persistence step.

### Line 106

```text
        volume: Math.max(0, Math.min(100, Math.round(readNumber(settings.volume, 80)))),
```

Clamps volume into 0–100 and rounds it, while restricting theme to the four known names.

### Line 107

```text
        isMuted: settings.isMuted === true,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 108

```text
        theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 109

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 110

```text
      return this.normalizeSave({
```

Normalizes migrated legacy fields into the modern save shape before profile creation.

### Line 111

```text
        player: {
```

Defines a named field in the save/profile or UI data structure.

### Line 112

```text
          balance: readNumber(oldPlayer.balance, 100),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 113

```text
          lastSpinTime: readNumber(localStorage.getItem('casino_hub_wheel'), 0),
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 114

```text
          level: Math.max(1, Math.floor(readNumber(oldXp.level, 1, 1))),
```

Defines field level as chooses the largest of 1, rounds calls `readNumber` with `oldXp.level` (the level property of oldXp); 1; 1 down to the next whole number.

### Line 115

```text
          xp: readNumber(oldXp.xp, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 116

```text
          debt: readNumber(localStorage.getItem('casino_hub_debt'), 0),
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 117

```text
          creditLimit: readNumber(localStorage.getItem('casino_hub_credit_limit'), 2000),
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 118

```text
          maxBet: readNumber(localStorage.getItem('casino_hub_max_bet'), 100, 100)
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 119

```text
        },
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 120

```text
        settings,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 121

```text
        jackpot: readNumber(localStorage.getItem('casino_hub_jackpot'), 10000)
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 122

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 123

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 124

```text

```

Blank line separates related logic for readability.

### Line 125

```text
    removeLegacyKeys() {
```

Lists old guest-save keys that can be removed only after encrypted migration succeeds.

### Line 126

```text
      LEGACY_KEYS.forEach(key => { try { localStorage.removeItem(key); } catch (error) { /* best effort */ } });
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 127

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 128

```text
        Array.from({ length: localStorage.length }, (_, index) => localStorage.key(index))
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 129

```text
          .filter(key => key?.startsWith(LEGACY_PROFILE_PREFIX))
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 130

```text
          .forEach(key => localStorage.removeItem(key));
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 131

```text
      } catch (error) { /* encrypted archive already protects profile saves */ }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 132

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 133

```text

```

Blank line separates related logic for readability.

### Line 134

```text
    readLegacyProfiles() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 135

```text
      const profiles = [];
```

Defines profiles for use by the surrounding persistence logic.

### Line 136

```text
      const numberOr = (value, fallback) => {
```

Defines numberOr for use by the surrounding persistence logic.

### Line 137

```text
        if (value === null || value === undefined || value === '') return fallback;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 138

```text
        const number = Number(value);
```

Defines number for use by the surrounding persistence logic.

### Line 139

```text
        return Number.isFinite(number) && number >= 0 ? number : fallback;
```

Returns checks uses checks whether `number` (number) is at least 0 only if checks that `number` (number) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `number` (number), otherwise `fallback` (fallback) to the caller and exits this function.

### Line 140

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 141

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 142

```text
        for (let index = 0; index < localStorage.length; index++) {
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 143

```text
          const key = localStorage.key(index);
```

Defines key for use by the surrounding persistence logic.

### Line 144

```text
          if (!key?.startsWith(LEGACY_PROFILE_PREFIX)) continue;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 145

```text
          try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 146

```text
            const record = JSON.parse(localStorage.getItem(key) || 'null');
```

Defines record for use by the surrounding persistence logic.

### Line 147

```text
            if (!record?.uid || !record.profile || typeof record.profile !== 'object') continue;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 148

```text
            const normalized = this.normalizeSave({ player: record.profile, settings: record.settings });
```

Defines normalized for use by the surrounding persistence logic.

### Line 149

```text
            profiles.push({
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 150

```text
              updatedAtMs: numberOr(record.updatedAtMs, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 151

```text
              player: normalized.player,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 152

```text
              settings: normalized.settings
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 153

```text
            });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 154

```text
          } catch (error) { /* Ignore malformed old caches; preserve valid ones. */ }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 155

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 156

```text
      } catch (error) { return []; }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 157

```text
      return profiles.sort((a, b) => b.updatedAtMs - a.updatedAtMs).slice(0, 100);
```

Sorts archived legacy profiles newest-first and retains at most 100 candidates.

### Line 158

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 159

```text

```

Blank line separates related logic for readability.

### Line 160

```text
    normalizeSlotBonuses(value) {
```

Begins bounded normalization of per-slot bonus state.

### Line 161

```text
      if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 162

```text
      const output = {};
```

Defines output for use by the surrounding persistence logic.

### Line 163

```text
      for (const [id, raw] of Object.entries(value).slice(0, 64)) {
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 164

```text
        if (!/^[A-Za-z0-9_-]{1,64}$/.test(id) || !raw || typeof raw !== 'object' || Array.isArray(raw)) continue;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 165

```text
        const safe = {};
```

Defines safe for use by the surrounding persistence logic.

### Line 166

```text
        const count = (v, fallback = 0) => Number.isSafeInteger(v) && v >= 0 && v <= 1000000 ? v : fallback;
```

Accepts only safe nonnegative integers up to one million for counts.

### Line 167

```text
        safe.freeSpinsRemaining = count(raw.freeSpinsRemaining);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 168

```text
        safe.lockedStake = Number.isFinite(raw.lockedStake) && raw.lockedStake >= 0 && raw.lockedStake <= 1000000 ? Math.round(raw.lockedStake * 100) / 100 : 0;
```

Rounds locked stakes to cents and caps them at one million to limit impossible persisted balances.

### Line 169

```text
        safe.bonusTotalWin = Number.isFinite(raw.bonusTotalWin) && raw.bonusTotalWin >= 0 && raw.bonusTotalWin <= 100000000 ? Math.round(raw.bonusTotalWin * 100) / 100 : 0;
```

Rounds bonus totals to cents and caps them at 100 million.

### Line 170

```text
        if (raw.summary && typeof raw.summary === 'object' && !Array.isArray(raw.summary)) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 171

```text
          safe.summary = {};
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 172

```text
          for (const [key, value] of Object.entries(raw.summary).slice(0, 16)) {
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 173

```text
            if (/^[A-Za-z0-9_-]{1,64}$/.test(key) && Number.isFinite(value) && value >= 0 && value <= 100000000) safe.summary[key] = value;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 174

```text
          }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 175

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 176

```text
        safe.stickyWildsGrid = Array.isArray(raw.stickyWildsGrid) && raw.stickyWildsGrid.length === 5 && raw.stickyWildsGrid.every(row => Array.isArray(row) && row.length === 3 && row.every(BooleanValue => typeof BooleanValue === 'boolean')) ? raw.stickyWildsGrid.map(row => row.slice()) : Array.from({ length: 5 }, () => [false, false, false]);
```

Requires exactly a 5-by-3 boolean sticky-wild grid; otherwise creates an all-false grid.

### Line 177

```text
        const result = raw.lastResult;
```

Defines result for use by the surrounding persistence logic.

### Line 178

```text
        if (result && (result.status === 'pending' || result.status === 'settled') && Number.isFinite(result.stake) && result.stake >= 0 && Array.isArray(result.lines)) {
```

Accepts only pending/settled results with nonnegative finite stake and an array of lines.

### Line 179

```text
          safe.lastResult = { status: result.status, stake: Math.round(result.stake * 100) / 100, payout: Number.isFinite(result.payout) && result.payout >= 0 ? Math.round(result.payout * 100) / 100 : 0, lines: result.lines.slice(0, 32) };
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 180

```text
        } else safe.lastResult = null;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 181

```text
        output[id] = safe;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 182

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 183

```text
      return output;
```

Returns `output` (output) to the caller and exits this function.

### Line 184

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 185

```text
    normalizeAccomplishments(value) {
```

Begins bounded normalization of achievements, history, and counters.

### Line 186

```text
      const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
```

Defines source for use by the surrounding persistence logic.

### Line 187

```text
      const safeIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => typeof id === 'string' && id.length <= 96).slice(0, 128))] : [];
```

Deduplicates known-shaped achievement ids, limits each to 96 characters, and keeps at most 128.

### Line 188

```text
      const history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item === 'object' && typeof item.id === 'string').slice(-50).map(item => ({ ...item, id: item.id.slice(0, 96) })) : [];
```

Keeps only object history entries with string ids, truncates to the latest 50, and caps ids.

### Line 189

```text
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
```

Defines stats for use by the surrounding persistence logic.

### Line 190

```text
      const count = v => Number.isSafeInteger(v) && v >= 0 && v <= 100000000 ? v : 0;
```

Restricts achievement counters to safe integers from 0 through 100 million.

### Line 191

```text
      return { version: 1, unlockedIds: safeIds, selectedCosmetic: typeof source.selectedCosmetic === 'string' && source.selectedCosmetic.length <= 96 ? source.selectedCosmetic : 'classic-cabinet', history, stats: { games: count(stats.games), wins: count(stats.wins), races: count(stats.races), raceWins: count(stats.raceWins) } };
```

Returns an object with fields version: 1; unlockedIds: `safeIds` (safe ids); selectedCosmetic: checks uses checks whether `source.selectedCosmetic.length` (the length property of source.selectedCosmetic) is at most 96 only if checks that gets the JavaScript type name of `source.selectedCosmetic` and "string" have the same value and type is truthy; otherwise keeps the falsy first value; if true chooses `source.selectedCosmetic` (the selected cosmetic property of source), otherwise "classic-cabinet"; history: `history` (history); stats: an object with fields games: calls `count` with `stats.games` (the games property of stats); wins: calls `count` with `stats.wins` (the wins property of stats); races: calls `count` with `stats.races` (the races property of stats); raceWins: calls `count` with `stats.raceWins` (the race wins property of stats) to the caller and exits this function.

### Line 192

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 193

```text
    // Trust boundary for stored or imported values: whitelist fields, clamp preferences, and reject impossible race data.
```

Defines normalizeSave as the trust boundary that whitelists fields and rejects impossible race records.

### Line 194

```text
    normalizeSave(value = {}) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 195

```text
      const input = value && typeof value === 'object' ? value : {};
```

Defines input for use by the surrounding persistence logic.

### Line 196

```text
      const player = input.player && typeof input.player === 'object' ? input.player : {};
```

Defines player for use by the surrounding persistence logic.

### Line 197

```text
      const settings = input.settings && typeof input.settings === 'object' ? input.settings : {};
```

Defines settings for use by the surrounding persistence logic.

### Line 198

```text
      const numberOr = (item, fallback, minimum = 0) => {
```

Defines numberOr for use by the surrounding persistence logic.

### Line 199

```text
        if (item === null || item === undefined || item === '') return fallback;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 200

```text
        const number = Number(item);
```

Defines number for use by the surrounding persistence logic.

### Line 201

```text
        return Number.isFinite(number) && number >= minimum ? number : fallback;
```

Returns checks uses checks whether `number` (number) is at least `minimum` (minimum) only if checks that `number` (number) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `number` (number), otherwise `fallback` (fallback) to the caller and exits this function.

### Line 202

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 203

```text
      const themes = ['vegas', 'midnight', 'gold', 'money'];
```

Defines themes for use by the surrounding persistence logic.

### Line 204

```text
      const raceBet = input.raceBet && typeof input.raceBet === 'object' ? input.raceBet : null;
```

Defines raceBet for use by the surrounding persistence logic.

### Line 205

```text
      const raceResultNotice = input.raceResultNotice && typeof input.raceResultNotice === 'object' ? input.raceResultNotice : null;
```

Defines raceResultNotice for use by the surrounding persistence logic.

### Line 206

```text
      const validRunnerId = value => typeof value === 'string' && /^(horse-(?:[1-6]|[a-z0-9-]+)|car-[a-z0-9-]+)$/.test(value);
```

Restricts runner ids to horse-1..horse-6 or lowercase alphanumeric horse/car ids, blocking arbitrary keys.

### Line 207

```text
      const raceExperience = input.raceExperience && typeof input.raceExperience === 'object' ? input.raceExperience : null;
```

Defines raceExperience for use by the surrounding persistence logic.

### Line 208

```text
      const normalizeCircuit = (circuit, type) => {
```

Defines normalizeCircuit for use by the surrounding persistence logic.

### Line 209

```text
        if (!circuit || typeof circuit !== 'object') return null;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 210

```text
        const runners = {};
```

Defines runners for use by the surrounding persistence logic.

### Line 211

```text
        const prefix = type === 'car' ? 'car-' : 'horse-';
```

Defines prefix for use by the surrounding persistence logic.

### Line 212

```text
        for (const [runnerId, value] of Object.entries(circuit.runners || {}).slice(0, 64)) {
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 213

```text
          if (!runnerId.startsWith(prefix) || !validRunnerId(runnerId) || !value || typeof value !== 'object') continue;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 214

```text
          const starts = numberOr(value.starts, 0, 0);
```

Defines starts for use by the surrounding persistence logic.

### Line 215

```text
          const wins = numberOr(value.wins, 0, 0);
```

Defines wins for use by the surrounding persistence logic.

### Line 216

```text
          if (Number.isSafeInteger(starts) && Number.isSafeInteger(wins) && starts <= 1_000_000 && wins <= starts) {
```

Requires race starts/wins to be safe integers, caps starts at one million, and enforces wins ≤ starts.

### Line 217

```text
            runners[runnerId] = { starts, wins };
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 218

```text
          }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 219

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 220

```text
        const cursor = circuit.lastProcessedRaceId;
```

Defines cursor for use by the surrounding persistence logic.

### Line 221

```text
        return {
```

Returns an object with fields lastProcessedRaceId: checks uses checks whether `cursor` (cursor) is at least 0 only if calls `Number.isSafeInteger` with `cursor` (cursor) is truthy; otherwise keeps the falsy first value; if true chooses `cursor` (cursor), otherwise null; runners: `runners` (runners) to the caller and exits this function.

### Line 222

```text
          lastProcessedRaceId: Number.isSafeInteger(cursor) && cursor >= 0 ? cursor : null,
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 223

```text
          runners
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 224

```text
        };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 225

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 226

```text
      const safeRaceExperience = raceExperience ? {
```

Defines safeRaceExperience for use by the surrounding persistence logic.

### Line 227

```text
        horse: normalizeCircuit(raceExperience.horse, 'horse'),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 228

```text
        car: normalizeCircuit(raceExperience.car, 'car')
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 229

```text
      } : null;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 230

```text
      const safeRaceBet = raceBet && Number.isSafeInteger(Number(raceBet.raceId)) && Number(raceBet.raceId) >= 0 &&
```

Accepts a race bet only when ids, runner names, positive stake, and odds 1–100 are valid.

### Line 231

```text
        validRunnerId(raceBet.runnerId) && validRunnerId(raceBet.winnerId) &&
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 232

```text
        (raceBet.raceType === undefined || raceBet.raceType === null || ['horse', 'car'].includes(raceBet.raceType)) &&
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 233

```text
        Number.isFinite(Number(raceBet.stake)) && Number(raceBet.stake) > 0 &&
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 234

```text
        Number.isFinite(Number(raceBet.odds)) && Number(raceBet.odds) >= 1 && Number(raceBet.odds) <= 100
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 235

```text
        ? {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 236

```text
          raceId: Number(raceBet.raceId),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 237

```text
          raceType: ['horse', 'car'].includes(raceBet.raceType) ? raceBet.raceType : null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 238

```text
          runnerId: raceBet.runnerId,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 239

```text
          winnerId: raceBet.winnerId,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 240

```text
          stake: Math.round(Number(raceBet.stake) * 100) / 100,
```

Rounds accepted race stakes to cents so arithmetic is stable across serialization.

### Line 241

```text
          odds: Math.round(Number(raceBet.odds) * 100) / 100,
```

Defines field odds as divides rounds multiplies converts `raceBet.odds` (the odds property of raceBet) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.

### Line 242

```text
          durationMs: Number.isSafeInteger(Number(raceBet.durationMs)) &&
```

Allows only race durations from 110,000 to 200,000 ms; other values become null.

### Line 243

```text
            Number(raceBet.durationMs) >= 110_000 && Number(raceBet.durationMs) <= 200_000
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 244

```text
            ? Number(raceBet.durationMs)
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 245

```text
            : null
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 246

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 247

```text
        : null;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 248

```text
      const safeRaceResultNotice = raceResultNotice && Number.isSafeInteger(Number(raceResultNotice.raceId)) && Number(raceResultNotice.raceId) >= 0 &&
```

Validates a race result notice before retaining it as settlement evidence.

### Line 249

```text
        validRunnerId(raceResultNotice.runnerId) && validRunnerId(raceResultNotice.winnerId) &&
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 250

```text
        (raceResultNotice.raceType === undefined || raceResultNotice.raceType === null || ['horse', 'car'].includes(raceResultNotice.raceType)) &&
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 251

```text
        Number.isFinite(Number(raceResultNotice.stake)) && Number(raceResultNotice.stake) > 0 &&
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 252

```text
        Number.isFinite(Number(raceResultNotice.payout)) && Number(raceResultNotice.payout) >= 0 &&
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 253

```text
        typeof raceResultNotice.won === 'boolean'
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 254

```text
        ? {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 255

```text
          raceId: Number(raceResultNotice.raceId),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 256

```text
          raceType: ['horse', 'car'].includes(raceResultNotice.raceType) ? raceResultNotice.raceType : null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 257

```text
          runnerId: raceResultNotice.runnerId,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 258

```text
          winnerId: raceResultNotice.winnerId,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 259

```text
          stake: Math.round(Number(raceResultNotice.stake) * 100) / 100,
```

Defines field stake as divides rounds multiplies converts `raceResultNotice.stake` (the stake property of raceResultNotice) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.

### Line 260

```text
          payout: Math.round(Number(raceResultNotice.payout) * 100) / 100,
```

Defines field payout as divides rounds multiplies converts `raceResultNotice.payout` (the payout property of raceResultNotice) to a number (invalid numeric text becomes NaN) by 100 to the nearest whole number by 100.

### Line 261

```text
          won: raceResultNotice.won
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 262

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 263

```text
        : null;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 264

```text
      return {
```

Returns a complete normalized save, ensuring every persisted subsystem gets bounded defaults.

### Line 265

```text
        player: {
```

Defines a named field in the save/profile or UI data structure.

### Line 266

```text
          balance: numberOr(player.balance, 100),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 267

```text
          lastSpinTime: numberOr(player.lastSpinTime, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 268

```text
          level: Math.max(1, Math.floor(numberOr(player.level, 1, 1))),
```

Defines field level as chooses the largest of 1, rounds calls `numberOr` with `player.level` (the level property of player); 1; 1 down to the next whole number.

### Line 269

```text
          xp: numberOr(player.xp, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 270

```text
          debt: numberOr(player.debt, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 271

```text
          creditLimit: numberOr(player.creditLimit, 2000),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 272

```text
          maxBet: numberOr(player.maxBet, 100, 100)
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 273

```text
        },
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 274

```text
        settings: {
```

Defines a named field in the save/profile or UI data structure.

### Line 275

```text
          volume: Math.max(0, Math.min(100, Math.round(numberOr(settings.volume, 80)))),
```

Defines field volume as chooses the largest of 0, chooses the smallest of 100, rounds calls `numberOr` with `settings.volume` (the volume property of settings); 80 to the nearest whole number.

### Line 276

```text
          isMuted: settings.isMuted === true,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 277

```text
          theme: themes.includes(settings.theme) ? settings.theme : 'vegas'
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 278

```text
        },
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 279

```text
        jackpot: numberOr(input.jackpot, 10000),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 280

```text
        raceBet: safeRaceBet,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 281

```text
        raceResultNotice: safeRaceResultNotice,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 282

```text
        raceExperience: safeRaceExperience,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 283

```text
        slotBonuses: this.normalizeSlotBonuses(input.slotBonuses),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 284

```text
        accomplishments: this.normalizeAccomplishments(input.accomplishments),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 285

```text
        revision: Number.isSafeInteger(input.revision) && input.revision >= 0 ? input.revision : 0,
```

Keeps only nonnegative safe integer revisions, which support stale-save comparisons.

### Line 286

```text
        updatedAt: typeof input.updatedAt === 'string' ? input.updatedAt : null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 287

```text
        legacyProfiles: Array.isArray(input.legacyProfiles) ? input.legacyProfiles.slice(0, 100).map(profile => {
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 288

```text
          const archived = profile && typeof profile === 'object' ? profile : {};
```

Defines archived for use by the surrounding persistence logic.

### Line 289

```text
          const archivedSave = this.normalizeSave({ player: archived.player, settings: archived.settings });
```

Defines archivedSave for use by the surrounding persistence logic.

### Line 290

```text
          return { updatedAtMs: numberOr(archived.updatedAtMs, 0), player: archivedSave.player, settings: archivedSave.settings };
```

Returns an object with fields updatedAtMs: calls `numberOr` with `archived.updatedAtMs` (the updated at ms property of archived); 0; player: `archivedSave.player` (the player property of archivedSave); settings: `archivedSave.settings` (the settings property of archivedSave) to the caller and exits this function.

### Line 291

```text
        }) : []
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 292

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 293

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 294

```text

```

Blank line separates related logic for readability.

### Line 295

```text
    // PBKDF2 uses a random per-profile salt; the derived key itself is not written into browser storage.
```

Explains that each profile gets a random salt and the derived key is never persisted.

### Line 296

```text
    async deriveKey(password, salt) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 297

```text
      const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
```

Imports the password bytes as PBKDF2 key material; the raw password is not stored.

### Line 298

```text
      return crypto.subtle.deriveKey(
```

Returns calls `crypto.subtle.deriveKey` with an object with fields name: "PBKDF2"; salt: `salt` (salt); iterations: `PBKDF2_ITERATIONS` (pbkdf2 iterations); hash: "SHA-256"; `material` (material); an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to the caller and exits this function.

### Line 299

```text
        { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
```

Derives with per-profile salt, 310,000 iterations, and SHA-256.

### Line 300

```text
        material,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 301

```text
        { name: 'AES-GCM', length: 256 },
```

Produces a non-extractable 256-bit AES-GCM key for authenticated encryption.

### Line 302

```text
        false,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 303

```text
        ['encrypt', 'decrypt']
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 304

```text
      );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 305

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 306

```text

```

Blank line separates related logic for readability.

### Line 307

```text
    additionalData(profile) {
```

Binds ciphertext authentication to format, profile id, and name so metadata swaps fail decryption.

### Line 308

```text
      return new TextEncoder().encode(`${FORMAT}:${profile.id}:${profile.name}`);
```

Returns calls `new TextEncoder().encode` with a text template that combines fixed text with computed values `FORMAT` (format), `profile.id` (the id property of profile), `profile.name` (the name property of profile) to the caller and exits this function.

### Line 309

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 310

```text

```

Blank line separates related logic for readability.

### Line 311

```text
    // AES-GCM authenticates contents and profile identity; every encryption uses a fresh random 96-bit IV.
```

Explains the AES-GCM integrity boundary and fresh 96-bit IV requirement.

### Line 312

```text
    async encryptSave(profile, key, save) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 313

```text
      const iv = crypto.getRandomValues(new Uint8Array(12));
```

Generates a fresh random 12-byte IV for each encryption, preventing nonce reuse.

### Line 314

```text
      const profileSave = this.normalizeSave(save);
```

Defines profileSave for use by the surrounding persistence logic.

### Line 315

```text
      delete profileSave.jackpot;
```

Omits jackpot from encrypted profile data because jackpot is shared/current runtime state in this app.

### Line 316

```text
      const ciphertext = await crypto.subtle.encrypt(
```

Defines ciphertext for use by the surrounding persistence logic.

### Line 317

```text
        { name: 'AES-GCM', iv, additionalData: this.additionalData(profile) },
```

Defines a named field in the save/profile or UI data structure.

### Line 318

```text
        key,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 319

```text
        new TextEncoder().encode(JSON.stringify(profileSave))
```

Serializes the normalized save as UTF-8 JSON before authenticated encryption.

### Line 320

```text
      );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 321

```text
      return { iv: this.toBase64(iv), ciphertext: this.toBase64(new Uint8Array(ciphertext)) };
```

Returns an object with fields iv: calls `this.toBase64` with `iv` (iv); ciphertext: calls `this.toBase64` with constructs a new instance of `Uint8Array` with `ciphertext` (ciphertext) to the caller and exits this function.

### Line 322

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 323

```text

```

Blank line separates related logic for readability.

### Line 324

```text
    // Wrong passwords or modified ciphertext fail authentication instead of returning partial profile data.
```

Notes that AES-GCM authentication turns wrong passwords or tampering into a failure, not partial plaintext.

### Line 325

```text
    async decryptSave(profile, key) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 326

```text
      const plaintext = await crypto.subtle.decrypt(
```

Defines plaintext for use by the surrounding persistence logic.

### Line 327

```text
        { name: 'AES-GCM', iv: this.fromBase64(profile.iv), additionalData: this.additionalData(profile) },
```

Defines a named field in the save/profile or UI data structure.

### Line 328

```text
        key,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 329

```text
        this.fromBase64(profile.ciphertext)
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 330

```text
      );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 331

```text
      return this.normalizeSave(JSON.parse(new TextDecoder().decode(plaintext)));
```

Parses decrypted JSON then normalizes it again before returning it to game code.

### Line 332

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 333

```text

```

Blank line separates related logic for readability.

### Line 334

```text
    toBase64(bytes) { return btoa(String.fromCharCode(...bytes)); }
```

Encodes bytes as base64 for JSON/localStorage transport; this is encoding, not hashing.

### Line 335

```text
    fromBase64(text) { return Uint8Array.from(atob(text), character => character.charCodeAt(0)); }
```

Decodes base64 back to bytes for Web Crypto.

### Line 336

```text

```

Blank line separates related logic for readability.

### Line 337

```text
    writeDatabase() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 338

```text
      const text = JSON.stringify(this.database);
```

Defines text for use by the surrounding persistence logic.

### Line 339

```text
      try { localStorage.setItem(DATABASE_KEY, text); return true; }
```

Serializes the profile database and writes it atomically through localStorage.

### Line 340

```text
      catch (error) { window.LocalSave?.setStatus('Profile storage failed; no successful save was reported.', 'warning'); return false; }
```

Reports storage failure and returns false, so callers do not claim an unsaved write succeeded.

### Line 341

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 342

```text

```

Blank line separates related logic for readability.

### Line 343

```text
    setContent(title, description, includeCancel = false) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 344

```text
      this.content.replaceChildren();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 345

```text
      const heading = document.createElement('h2');
```

Defines heading for use by the surrounding persistence logic.

### Line 346

```text
      heading.id = 'profile-gate-title';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 347

```text
      heading.textContent = title;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 348

```text
      const subtitle = document.createElement('p');
```

Defines subtitle for use by the surrounding persistence logic.

### Line 349

```text
      subtitle.className = 'profile-subtitle';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 350

```text
      subtitle.textContent = description;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 351

```text
      this.content.append(heading, subtitle);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 352

```text
      const form = document.createElement('div');
```

Defines form for use by the surrounding persistence logic.

### Line 353

```text
      form.className = 'profile-form';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 354

```text
      this.content.append(form);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 355

```text
      const feedback = document.createElement('div');
```

Defines feedback for use by the surrounding persistence logic.

### Line 356

```text
      feedback.className = 'profile-feedback';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 357

```text
      feedback.setAttribute('aria-live', 'polite');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 358

```text
      this.content.append(feedback);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 359

```text
      if (includeCancel) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 360

```text
        const cancel = document.createElement('button');
```

Defines cancel for use by the surrounding persistence logic.

### Line 361

```text
        cancel.className = 'profile-secondary-btn';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 362

```text
        cancel.type = 'button';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 363

```text
        cancel.textContent = 'Cancel';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 364

```text
        cancel.addEventListener('click', () => this.gate.classList.add('hidden-view'));
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 365

```text
        form.append(cancel);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 366

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 367

```text
      return { form, feedback };
```

Returns an object with fields form: `form` (form); feedback: `feedback` (feedback) to the caller and exits this function.

### Line 368

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 369

```text

```

Blank line separates related logic for readability.

### Line 370

```text
    addField(form, labelText, type, autocomplete, maxLength = 64) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 371

```text
      const label = document.createElement('label');
```

Defines label for use by the surrounding persistence logic.

### Line 372

```text
      label.className = 'profile-field';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 373

```text
      label.textContent = labelText;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 374

```text
      const input = document.createElement('input');
```

Defines input for use by the surrounding persistence logic.

### Line 375

```text
      input.type = type;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 376

```text
      input.autocomplete = autocomplete;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 377

```text
      input.maxLength = maxLength;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 378

```text
      input.required = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 379

```text
      if (type === 'password') input.minLength = 8;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 380

```text
      label.append(input);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 381

```text
      form.append(label);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 382

```text
      return input;
```

Returns `input` (input) to the caller and exits this function.

### Line 383

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 384

```text

```

Blank line separates related logic for readability.

### Line 385

```text
    addButton(form, text, className = 'profile-primary-btn') {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 386

```text
      const button = document.createElement('button');
```

Defines button for use by the surrounding persistence logic.

### Line 387

```text
      button.type = 'button';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 388

```text
      button.className = className;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 389

```text
      button.textContent = text;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 390

```text
      form.append(button);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 391

```text
      return button;
```

Returns `button` (button) to the caller and exits this function.

### Line 392

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 393

```text

```

Blank line separates related logic for readability.

### Line 394

```text
    addNote(text) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 395

```text
      const note = document.createElement('p');
```

Defines note for use by the surrounding persistence logic.

### Line 396

```text
      note.className = 'profile-note';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 397

```text
      note.textContent = text;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 398

```text
      this.content.append(note);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 399

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 400

```text

```

Blank line separates related logic for readability.

### Line 401

```text
    renderMessage(title, message) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 402

```text
      const { feedback } = this.setContent(title, message);
```

Defines a local value for use by the surrounding persistence logic.

### Line 403

```text
      feedback.textContent = 'No data has been changed.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 404

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 405

```text

```

Blank line separates related logic for readability.

### Line 406

```text
    async showFirstProfileSetup(legacySave) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 407

```text
      this.gate?.classList.remove('hidden-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 408

```text
      const { form, feedback } = this.setContent(
```

Defines a local value for use by the surrounding persistence logic.

### Line 409

```text
        'Create your first profile',
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 410

```text
        'Set up a password-protected profile on this browser. Your game data will be encrypted and kept on this device.'
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 411

```text
      );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 412

```text
      const legacyDataExists = LEGACY_KEYS.some(key => localStorage.getItem(key) !== null) || this.readLegacyProfiles().length > 0;
```

Detects old unencrypted keys or archived profiles to show a migration notice.

### Line 413

```text
      if (legacyDataExists) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 414

```text
        const migration = document.createElement('p');
```

Defines migration for use by the surrounding persistence logic.

### Line 415

```text
        migration.className = 'profile-migration-note';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 416

```text
        migration.textContent = 'Your existing local casino progress will be moved into this first profile.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 417

```text
        this.content.insertBefore(migration, form);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 418

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 419

```text
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
```

Defines name for use by the surrounding persistence logic.

### Line 420

```text
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
```

Defines password for use by the surrounding persistence logic.

### Line 421

```text
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
```

Defines confirmation for use by the surrounding persistence logic.

### Line 422

```text
      const create = this.addButton(form, 'Create protected profile');
```

Defines create for use by the surrounding persistence logic.

### Line 423

```text
      create.addEventListener('click', async () => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 424

```text
        feedback.textContent = '';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 425

```text
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 426

```text
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 427

```text
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 428

```text
        create.disabled = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 429

```text
        try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 430

```text
          await this.createProfile(name.value, password.value, legacySave);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 431

```text
          if (this.database.profiles.length) this.removeLegacyKeys();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 432

```text
          this.updateProfileButton();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 433

```text
        } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 434

```text
          feedback.textContent = error.message || 'Could not create the profile. Check browser storage and try again.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 435

```text
          create.disabled = false;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 436

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 437

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 438

```text
      this.addNote('Profiles are local to this browser and do not sync between devices. Keep your password safe: it cannot be reset or recovered. Export a save backup from inside the game for portability.');
```

Warns that profiles stay on this browser, passwords are not recoverable, and backups are needed for portability.

### Line 439

```text
      await new Promise(resolve => { this.finishInitialSetup = resolve; });
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 440

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 441

```text

```

Blank line separates related logic for readability.

### Line 442

```text
    async showUnlockScreen(isStartup = true) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 443

```text
      this.gate?.classList.remove('hidden-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 444

```text
      const { form, feedback } = this.setContent(
```

Defines a local value for use by the surrounding persistence logic.

### Line 445

```text
        'Choose a local profile',
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 446

```text
        'Enter that profile’s password to decrypt its casino save on this device.',
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 447

```text
        !isStartup
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 448

```text
      );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 449

```text
      const list = document.createElement('div');
```

Defines list for use by the surrounding persistence logic.

### Line 450

```text
      list.className = 'profile-list';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 451

```text
      this.content.insertBefore(list, form);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 452

```text
      const selected = { profile: null };
```

Defines selected for use by the surrounding persistence logic.

### Line 453

```text
      this.database.profiles.slice().sort((a, b) => a.name.localeCompare(b.name)).forEach(profile => {
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 454

```text
        const button = document.createElement('button');
```

Defines button for use by the surrounding persistence logic.

### Line 455

```text
        button.type = 'button';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 456

```text
        button.className = 'profile-choice-btn';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 457

```text
        button.textContent = profile.name;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 458

```text
        button.addEventListener('click', () => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 459

```text
          selected.profile = profile;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 460

```text
          list.querySelectorAll('button').forEach(item => item.classList.toggle('selected', item === button));
```

Finds or creates the UI element used to present this profile/save state.

### Line 461

```text
          password.disabled = false;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 462

```text
          unlock.disabled = false;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 463

```text
          password.focus();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 464

```text
          feedback.textContent = '';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 465

```text
        });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 466

```text
        list.append(button);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 467

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 468

```text
      const password = this.addField(form, 'Profile password', 'password', 'current-password', 128);
```

Defines password for use by the surrounding persistence logic.

### Line 469

```text
      password.disabled = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 470

```text
      const unlock = this.addButton(form, 'Unlock profile');
```

Defines unlock for use by the surrounding persistence logic.

### Line 471

```text
      unlock.disabled = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 472

```text
      const create = this.addButton(form, 'Create another profile', 'profile-secondary-btn');
```

Defines create for use by the surrounding persistence logic.

### Line 473

```text
      create.addEventListener('click', () => this.showAdditionalProfileSetup());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 474

```text
      unlock.addEventListener('click', async () => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 475

```text
        if (!selected.profile) { feedback.textContent = 'Choose a profile first.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 476

```text
        unlock.disabled = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 477

```text
        feedback.textContent = 'Unlocking…';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 478

```text
        try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 479

```text
          const profile = selected.profile;
```

Defines profile for use by the surrounding persistence logic.

### Line 480

```text
          const key = await this.deriveKey(password.value, this.fromBase64(profile.salt));
```

Defines key for use by the surrounding persistence logic.

### Line 481

```text
          const save = await this.decryptSave(profile, key);
```

Defines save for use by the surrounding persistence logic.

### Line 482

```text
          await this.activateProfile(profile, key, save);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 483

```text
          if (isStartup) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 484

```text
            if (this.finishInitialUnlock) this.finishInitialUnlock();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 485

```text
          } else {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 486

```text
            this.gate.classList.add('hidden-view');
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 487

```text
            await this.onProfileChanged?.(this.getCurrentSave(), profile);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 488

```text
          }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 489

```text
          this.updateProfileButton();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 490

```text
        } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 491

```text
          feedback.textContent = 'That password did not unlock this profile. Try again.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 492

```text
          password.value = '';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 493

```text
          unlock.disabled = false;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 494

```text
          password.focus();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 495

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 496

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 497

```text
      password.addEventListener('keydown', event => { if (event.key === 'Enter' && !unlock.disabled) unlock.click(); });
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 498

```text
      this.addNote('The password encrypts profile data in this browser. Forgetting it means the encrypted profile cannot be recovered. Profiles and passwords are not uploaded or synchronized.');
```

Warns that forgetting the password makes encrypted data unrecoverable and nothing is synchronized.

### Line 499

```text
      if (isStartup) await new Promise(resolve => { this.finishInitialUnlock = resolve; });
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 500

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 501

```text

```

Blank line separates related logic for readability.

### Line 502

```text
    async showAdditionalProfileSetup() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 503

```text
      const { form, feedback } = this.setContent('Create a profile', 'Each profile has its own password, chips, level, loans, daily bonus, and settings.');
```

Defines a local value for use by the surrounding persistence logic.

### Line 504

```text
      const back = this.addButton(form, 'Back to profile list', 'profile-secondary-btn');
```

Defines back for use by the surrounding persistence logic.

### Line 505

```text
      back.addEventListener('click', () => this.showUnlockScreen(!this.activeProfile));
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 506

```text
      const name = this.addField(form, 'Profile name', 'text', 'nickname', 24);
```

Defines name for use by the surrounding persistence logic.

### Line 507

```text
      const password = this.addField(form, 'Password (at least 8 characters)', 'password', 'new-password', 128);
```

Defines password for use by the surrounding persistence logic.

### Line 508

```text
      const confirmation = this.addField(form, 'Confirm password', 'password', 'new-password', 128);
```

Defines confirmation for use by the surrounding persistence logic.

### Line 509

```text
      const create = this.addButton(form, 'Create and open profile');
```

Defines create for use by the surrounding persistence logic.

### Line 510

```text
      create.addEventListener('click', async () => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 511

```text
        feedback.textContent = '';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 512

```text
        if (!name.value.trim()) { feedback.textContent = 'Enter a profile name.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 513

```text
        if (password.value.length < 8) { feedback.textContent = 'Use a password with at least 8 characters.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 514

```text
        if (password.value !== confirmation.value) { feedback.textContent = 'The passwords do not match.'; return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 515

```text
        create.disabled = true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 516

```text
        try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 517

```text
          const profile = await this.createProfile(name.value, password.value, DEFAULT_SAVE);
```

Defines profile for use by the surrounding persistence logic.

### Line 518

```text
          if (this.finishInitialUnlock) this.finishInitialUnlock();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 519

```text
          this.gate.classList.add('hidden-view');
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 520

```text
          this.updateProfileButton();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 521

```text
          await this.onProfileChanged?.(this.getCurrentSave(), profile);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 522

```text
        } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 523

```text
          feedback.textContent = error.message || 'Could not create the profile.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 524

```text
          create.disabled = false;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 525

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 526

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 527

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 528

```text

```

Blank line separates related logic for readability.

### Line 529

```text
    // Validate and normalize names before generating fresh salt and encrypting the new profile save.
```

States that names are validated before fresh salt generation and encryption.

### Line 530

```text
    async createProfile(nameValue, password, initialSave) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 531

```text
      const name = nameValue.trim().replace(/\s+/g, ' ');
```

Defines name for use by the surrounding persistence logic.

### Line 532

```text
      if (!name || name.length > 24) throw new Error('Profile names must be 1–24 characters.');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 533

```text
      if (this.database.profiles.some(profile => profile.name.toLocaleLowerCase() === name.toLocaleLowerCase())) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 534

```text
        throw new Error('A profile with that name already exists.');
```

Stops processing with a user-facing validation/storage error rather than accepting unsafe data.

### Line 535

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 536

```text
      if (password.length < 8 || password.length > 128) throw new Error('Passwords must be 8–128 characters.');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 537

```text
      const profile = {
```

Defines profile for use by the surrounding persistence logic.

### Line 538

```text
        id: crypto.randomUUID(), name, createdAt: new Date().toISOString(),
```

Creates a random UUID and creation timestamp plus a random 16-byte salt; IV/ciphertext are filled after encryption.

### Line 539

```text
        salt: this.toBase64(crypto.getRandomValues(new Uint8Array(16))), iv: '', ciphertext: ''
```

Uses browser cryptography for password-derived key handling or authenticated profile encryption.

### Line 540

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 541

```text
      const key = await this.deriveKey(password, this.fromBase64(profile.salt));
```

Derives the profile key from the user password and generated salt.

### Line 542

```text
      const sealed = await this.encryptSave(profile, key, initialSave);
```

Encrypts the initial normalized save before storing the profile record.

### Line 543

```text
      profile.iv = sealed.iv;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 544

```text
      profile.ciphertext = sealed.ciphertext;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 545

```text
      this.database.profiles.push(profile);
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 546

```text
      if (!this.writeDatabase()) { this.database.profiles = this.database.profiles.filter(item => item !== profile); throw new Error('Profile could not be durably saved. No legacy data was removed.'); }
```

Persists the profile and removes it again on storage failure, protecting legacy data from premature deletion.

### Line 547

```text
      await this.activateProfile(profile, key, initialSave);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 548

```text
      if (this.finishInitialSetup) this.finishInitialSetup();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 549

```text
      return profile;
```

Returns `profile` (profile) to the caller and exits this function.

### Line 550

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 551

```text

```

Blank line separates related logic for readability.

### Line 552

```text
    async activateProfile(profile, key, save) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 553

```text
      await this.flushSave();
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 554

```text
      this.activeProfile = profile;
```

Stores the activeProfile runtime reference/state on this manager so later save operations can reuse it.

### Line 555

```text
      this.activeKey = key;
```

Stores the activeKey runtime reference/state on this manager so later save operations can reuse it.

### Line 556

```text
      this.currentSave = this.normalizeSave(save);
```

Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.

### Line 557

```text
      this.lastDurableSave = this.currentSave;
```

Stores the lastDurableSave runtime reference/state on this manager so later save operations can reuse it.

### Line 558

```text
      this.durableProfileId = profile.id;
```

Stores the durableProfileId runtime reference/state on this manager so later save operations can reuse it.

### Line 559

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 560

```text

```

Blank line separates related logic for readability.

### Line 561

```text
    openSwitcher() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 562

```text
      if (!this.canSwitchProfile()) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 563

```text
        alert('Finish the current game round and return to the lobby before switching profiles.');
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 564

```text
        return;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 565

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 566

```text
      this.gate?.classList.remove('hidden-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 567

```text
      this.showUnlockScreen(false);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 568

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 569

```text

```

Blank line separates related logic for readability.

### Line 570

```text
    async getSelectedProfileAndUnlock(profile, password, feedback) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 571

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 572

```text
        const key = await this.deriveKey(password, this.fromBase64(profile.salt));
```

Defines key for use by the surrounding persistence logic.

### Line 573

```text
        const save = await this.decryptSave(profile, key);
```

Defines save for use by the surrounding persistence logic.

### Line 574

```text
        await this.activateProfile(profile, key, save);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 575

```text
        this.gate?.classList.add('hidden-view');
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 576

```text
        this.updateProfileButton();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 577

```text
        await this.onProfileChanged?.(this.getCurrentSave(), profile);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 578

```text
      } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 579

```text
        feedback.textContent = 'That password did not unlock this profile. Try again.';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 580

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 581

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 582

```text

```

Blank line separates related logic for readability.

### Line 583

```text
    getCurrentSave() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 584

```text
      return this.normalizeSave(this.currentSave || DEFAULT_SAVE);
```

Returns calls `this.normalizeSave` with uses `this.currentSave` (the current save property of this) when it is truthy, otherwise falls back to `DEFAULT_SAVE` (default save) to the caller and exits this function.

### Line 585

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 586

```text

```

Blank line separates related logic for readability.

### Line 587

```text
    // Snapshot normalized data and queue encryption so rapid updates stay ordered and profile switches cannot cross-write.
```

Explains optimistic snapshots plus queued encryption: rapid updates stay ordered and profile switches cannot cross-write.

### Line 588

```text
    saveCurrent(partial = {}) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 589

```text
      if (!this.activeProfile || !this.activeKey) return Promise.resolve(false);
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 590

```text
      const previous = this.currentSave;
```

Defines previous for use by the surrounding persistence logic.

### Line 591

```text
      if (this.durableProfileId !== this.activeProfile.id || !this.lastDurableSave) { this.lastDurableSave = previous; this.durableProfileId = this.activeProfile.id; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 592

```text
      const snapshot = this.normalizeSave({ ...previous, ...partial, revision: Math.max(Number(previous?.revision) || 0, Number(partial.revision) || 0) + 1, updatedAt: new Date().toISOString() });
```

Merges partial changes, increments revision at least once, and stamps a fresh ISO timestamp.

### Line 593

```text
      const changes = Object.fromEntries(Object.keys(partial).map(key => [key, snapshot[key]]));
```

Defines changes for use by the surrounding persistence logic.

### Line 594

```text
      this.currentSave = snapshot;
```

Stores the currentSave runtime reference/state on this manager so later save operations can reuse it.

### Line 595

```text
      const profileId = this.activeProfile.id;
```

Defines profileId for use by the surrounding persistence logic.

### Line 596

```text
      const task = this.saveQueue.catch(() => false).then(async () => {
```

Defines task for use by the surrounding persistence logic.

### Line 597

```text
        const profile = this.database.profiles.find(item => item.id === profileId);
```

Defines profile for use by the surrounding persistence logic.

### Line 598

```text
        if (!profile || !this.activeKey || this.activeProfile?.id !== profileId) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 599

```text
        // Rebase only this call's fields on the last successful write, not a failed optimistic predecessor.
```

Comment: Rebase only this call's fields on the last successful write, not a failed optimistic predecessor.

### Line 600

```text
        const durableSnapshot = this.normalizeSave({ ...this.lastDurableSave, ...changes, revision: snapshot.revision, updatedAt: snapshot.updatedAt });
```

Rebases this write onto the last successful durable snapshot so a failed predecessor cannot contaminate it.

### Line 601

```text
        const oldRecord = { iv: profile.iv, ciphertext: profile.ciphertext, updatedAt: profile.updatedAt };
```

Defines oldRecord for use by the surrounding persistence logic.

### Line 602

```text
        try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 603

```text
          const sealed = await this.encryptSave(profile, this.activeKey, durableSnapshot);
```

Encrypts the rebased snapshot with the active profile key.

### Line 604

```text
          profile.iv = sealed.iv; profile.ciphertext = sealed.ciphertext; profile.updatedAt = new Date().toISOString();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 605

```text
          if (!this.writeDatabase()) throw new Error('Profile storage failed');
```

Refuses to report success unless the encrypted database write succeeds.

### Line 606

```text
          this.lastDurableSave = durableSnapshot;
```

Stores the lastDurableSave runtime reference/state on this manager so later save operations can reuse it.

### Line 607

```text
          if (this.currentSave === snapshot) this.currentSave = durableSnapshot;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 608

```text
          return true;
```

Returns true to the caller and exits this function.

### Line 609

```text
        } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 610

```text
          profile.iv = oldRecord.iv; profile.ciphertext = oldRecord.ciphertext; profile.updatedAt = oldRecord.updatedAt;
```

Restores the previous ciphertext metadata after an encryption/storage failure.

### Line 611

```text
          if (this.currentSave === snapshot) this.currentSave = this.lastDurableSave;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 612

```text
          console.error('Encrypted local profile save failed.', error);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 613

```text
          window.LocalSave?.setStatus('Profile encryption could not be saved to this browser. Export a backup and check available storage.', 'warning');
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 614

```text
          return false;
```

Returns false to the caller and exits this function.

### Line 615

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 616

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 617

```text
      this.saveQueue = task;
```

Stores the saveQueue runtime reference/state on this manager so later save operations can reuse it.

### Line 618

```text
      return task;
```

Returns `task` (task) to the caller and exits this function.

### Line 619

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 620

```text
    // Wait for the previous profile write before changing the active encryption key.
```

Waits for queued encryption before switching active keys, preventing cross-profile writes.

### Line 621

```text
    async flushSave() { return await this.saveQueue.catch(() => false); }
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 622

```text

```

Blank line separates related logic for readability.

### Line 623

```text
    updateProfileButton() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 624

```text
      if (this.profileName) this.profileName.textContent = this.activeProfile ? this.activeProfile.name : 'Choose profile';
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 625

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 626

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 627

```text

```

Blank line separates related logic for readability.

### Line 628

```text
  window.LocalProfileManager = LocalProfileManager;
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 629

```text
})();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
