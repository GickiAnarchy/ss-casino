# src/js/local-save.js

[Exact copy](../../../original/src/js/local-save.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/*
```

Comment: 

### Line 2

```text
 * Local save-file controller: encrypted browser profiles are the normal store; JSON backups and linked files are
```

Comment: Local save-file controller: encrypted browser profiles are the normal store; JSON backups and linked files are

### Line 3

```text
 * optional portability tools. Backup JSON is unencrypted, so this module never describes it as an encrypted profile.
```

Comment: optional portability tools. Backup JSON is unencrypted, so this module never describes it as an encrypted profile.

### Line 4

```text
 */
```

Comment: 

### Line 5

```text
/* global Player */
```

Comment: global Player */

### Line 6

```text
(function installLocalSaveManager() {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 7

```text
  const FILE_FORMAT = 'ss-casino-local-save';
```

Names the portable JSON envelope so imports cannot be mistaken for unrelated JSON.

### Line 8

```text
  const FILE_SCHEMA_VERSION = 2;
```

Sets the current portable-save schema to version 2; older version 1 files are accepted then normalized.

### Line 9

```text
  const RECOVERY_KEY = 'ss_casino_recovery_snapshot_v1';
```

Prefixes encrypted recovery records in localStorage and scopes them by active profile later.

### Line 10

```text
  const MAX_JSON_BYTES = 1024 * 1024;
```

Rejects imported text over one mebibyte before JSON parsing, limiting memory/abuse exposure.

### Line 11

```text
  const HANDLE_DB_NAME = 'ss-casino-local-save-files';
```

Defines HANDLE_DB_NAME for use by the surrounding persistence logic.

### Line 12

```text
  const HANDLE_STORE_NAME = 'handles';
```

Defines HANDLE_STORE_NAME for use by the surrounding persistence logic.

### Line 13

```text
  const HANDLE_KEY = 'primary-save-file';
```

Defines HANDLE_KEY for use by the surrounding persistence logic.

### Line 14

```text
  const DEFAULT_SETTINGS = Object.freeze({ volume: 80, isMuted: false, theme: 'vegas' });
```

Defines the user-facing defaults: 80% volume, sound enabled, and the Vegas theme.

### Line 15

```text
  const THEMES = new Set(['vegas', 'midnight', 'gold', 'money']);
```

Whitelists the only theme identifiers that can survive normalization.

### Line 16

```text

```

Blank line separates related logic for readability.

### Line 17

```text
  /** Coordinates backup/import, optional File System Access linking, and UI refresh after a save is loaded. */
```

Comment: Coordinates backup/import, optional File System Access linking, and UI refresh after a save is loaded. */

### Line 18

```text
  class LocalSaveManager {
```

Declares the class that groups this module’s related state and operations.

### Line 19

```text
    constructor({ hub, jackpot, bank, xp, dailyWheel, settings }) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 20

```text
      this.hub = hub;
```

Stores the hub runtime reference/state on this manager so later save operations can reuse it.

### Line 21

```text
      this.jackpot = jackpot;
```

Stores the jackpot runtime reference/state on this manager so later save operations can reuse it.

### Line 22

```text
      this.bank = bank;
```

Stores the bank runtime reference/state on this manager so later save operations can reuse it.

### Line 23

```text
      this.xp = xp;
```

Stores the xp runtime reference/state on this manager so later save operations can reuse it.

### Line 24

```text
      this.dailyWheel = dailyWheel;
```

Stores the dailyWheel runtime reference/state on this manager so later save operations can reuse it.

### Line 25

```text
      this.settings = settings;
```

Stores the settings runtime reference/state on this manager so later save operations can reuse it.

### Line 26

```text
      this.fileHandle = null;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 27

```text
      this.fileWriteQueue = Promise.resolve(true);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 28

```text
      this.lastLinkedRevision = null;
```

Stores the lastLinkedRevision runtime reference/state on this manager so later save operations can reuse it.

### Line 29

```text
      this.lastLinkedBytes = null;
```

Stores the lastLinkedBytes runtime reference/state on this manager so later save operations can reuse it.

### Line 30

```text
      this.openButton = document.getElementById('btn-open-local-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 31

```text
      this.modal = document.getElementById('modal-local-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 32

```text
      this.closeButton = document.getElementById('btn-close-local-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 33

```text
      this.linkButton = document.getElementById('btn-link-save-file');
```

Finds or creates the UI element used to present this profile/save state.

### Line 34

```text
      this.exportButton = document.getElementById('btn-export-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 35

```text
      this.importButton = document.getElementById('btn-import-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 36

```text
      this.recoverButton = document.getElementById('btn-recover-legacy-save');
```

Finds or creates the UI element used to present this profile/save state.

### Line 37

```text
      this.importInput = document.getElementById('local-save-import-input');
```

Finds or creates the UI element used to present this profile/save state.

### Line 38

```text
      this.status = document.getElementById('local-save-status');
```

Finds or creates the UI element used to present this profile/save state.

### Line 39

```text
      this.startupOverlay = document.getElementById('startup-overlay');
```

Finds or creates the UI element used to present this profile/save state.

### Line 40

```text
      this.splashModal = document.getElementById('splash-modal');
```

Finds or creates the UI element used to present this profile/save state.

### Line 41

```text
      this.skipSplashButton = document.getElementById('btn-skip-splash');
```

Finds or creates the UI element used to present this profile/save state.

### Line 42

```text
      this.splashReturnFocus = null;
```

Stores the splashReturnFocus runtime reference/state on this manager so later save operations can reuse it.

### Line 43

```text
      this.bindEvents();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 44

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 45

```text

```

Blank line separates related logic for readability.

### Line 46

```text
    // Keep event wiring together so each control has one clear save action.
```

Comment: Keep event wiring together so each control has one clear save action.

### Line 47

```text
    bindEvents() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 48

```text
      this.openButton?.addEventListener('click', () => this.openModal());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 49

```text
      this.closeButton?.addEventListener('click', () => this.closeModal());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 50

```text
      this.modal?.addEventListener('click', (event) => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 51

```text
        if (event.target === this.modal) this.closeModal();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 52

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 53

```text
      this.linkButton?.addEventListener('click', () => this.linkFile());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 54

```text
      this.exportButton?.addEventListener('click', () => this.downloadBackup());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 55

```text
      this.importButton?.addEventListener('click', () => this.importInput?.click());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 56

```text
      this.recoverButton?.addEventListener('click', () => this.recoverLegacyProfile());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 57

```text
      this.importInput?.addEventListener('change', (event) => this.importSelectedFile(event));
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 58

```text
      this.skipSplashButton?.addEventListener('click', () => this.dismissSplash());
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 59

```text
      this.splashModal?.addEventListener('animationend', (event) => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 60

```text
        if (event.target === this.splashModal && event.animationName === 'ambientGlow') {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 61

```text
          this.dismissSplash();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 62

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 63

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 64

```text
      document.addEventListener('keydown', (event) => {
```

Connects this UI event to the corresponding save/profile action when the control exists.

### Line 65

```text
        if (!this.splashModal?.classList.contains('active-view')) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 66

```text
        if (event.key === 'Escape') this.dismissSplash();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 67

```text
        if (event.key === 'Tab') {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 68

```text
          event.preventDefault();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 69

```text
          this.skipSplashButton?.focus();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 70

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 71

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 72

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 73

```text

```

Blank line separates related logic for readability.

### Line 74

```text
    // Restore an authorized file handle when possible, while retaining browser-local saving as the fallback.
```

Comment: Restore an authorized file handle when possible, while retaining browser-local saving as the fallback.

### Line 75

```text
    async initialize() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 76

```text
      this.setStatus('Encrypted browser save is active. File auto-save is optional.', 'local');
```

Advertises that the normal browser save is encrypted while linked-file auto-save is optional.

### Line 77

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 78

```text
        const handle = await this.readStoredHandle();
```

Defines handle for use by the surrounding persistence logic.

### Line 79

```text
        if (handle) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 80

```text
          if (await handle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
```

Requests read/write permission for the remembered FileSystem handle; anything other than granted pauses auto-save.

### Line 81

```text
            this.setStatus('Browser save is active. Reconnect the linked file to resume file auto-save.', 'warning');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 82

```text
          } else {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 83

```text
            const file = await handle.getFile();
```

Defines file for use by the surrounding persistence logic.

### Line 84

```text
            const bytes = file.size ? await file.text() : '';
```

Defines bytes for use by the surrounding persistence logic.

### Line 85

```text
            let accepted = true;
```

Defines accepted for use by the surrounding persistence logic.

### Line 86

```text
            if (bytes) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 87

```text
              const saved = this.parseSave(bytes);
```

Defines saved for use by the surrounding persistence logic.

### Line 88

```text
              const current = this.createSave();
```

Defines current for use by the surrounding persistence logic.

### Line 89

```text
              const olderDate = Number.isFinite(Date.parse(saved.updatedAt)) && Number.isFinite(Date.parse(current.updatedAt)) && Date.parse(saved.updatedAt) < Date.parse(current.updatedAt);
```

Compares valid ISO/date strings so an older linked backup is not allowed to overwrite newer browser progress.

### Line 90

```text
              if (saved.legacy || saved.profileId !== current.profileId || saved.revision < current.revision || olderDate) {
```

Rejects legacy, cross-profile, lower-revision, or older-date files, preventing stale/cross-user replacement.

### Line 91

```text
                accepted = false;
```

Assigns the computed accepted value used by the surrounding validation or persistence step.

### Line 92

```text
                this.setStatus('Linked file is stale, legacy, or belongs to another profile. Neither save was replaced; file auto-save is paused. Import it only if you want to recover that progress.', 'warning');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 93

```text
              } else if (!this.isSameSave(saved, current)) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 94

```text
                accepted = confirm('The linked file differs from this browser profile. Load it instead? The current browser progress will be preserved in an encrypted recovery snapshot. Cancel keeps both saves unchanged and pauses file auto-save.');
```

Requires explicit confirmation before loading a differing file and promises an encrypted recovery snapshot first.

### Line 95

```text
                if (accepted) accepted = await this.applySave(saved);
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 96

```text
                else this.setStatus('Both saves were kept unchanged. File auto-save is paused until you review and reconnect the file.', 'warning');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 97

```text
              }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 98

```text
            }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 99

```text
            if (accepted) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 100

```text
              this.fileHandle = handle; this.lastLinkedBytes = bytes;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 101

```text
              if (bytes || await this.writeToLinkedFile()) this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 102

```text
            } else this.fileHandle = null;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 103

```text
          }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 104

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 105

```text
      } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 106

```text
        this.fileHandle = null;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 107

```text
        this.setStatus('Browser save is active. The linked file could not be read; reconnect it or import a backup.', 'warning');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 108

```text
      } finally {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 109

```text
        this.refreshLegacyRecoveryOption();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 110

```text
        this.startupOverlay?.classList.add('hidden-view');
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 111

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 112

```text
      this.showSplash();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 113

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 114

```text

```

Blank line separates related logic for readability.

### Line 115

```text
    showSplash() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 116

```text
      if (!this.splashModal) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 117

```text
      this.splashReturnFocus = document.activeElement;
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 118

```text
      this.splashModal.classList.replace('hidden-view', 'active-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 119

```text
      this.skipSplashButton?.focus({ preventScroll: true });
```

Defines a named field in the save/profile or UI data structure.

### Line 120

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 121

```text

```

Blank line separates related logic for readability.

### Line 122

```text
    dismissSplash() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 123

```text
      if (!this.splashModal?.classList.contains('active-view')) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 124

```text
      this.splashModal.classList.replace('active-view', 'hidden-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 125

```text
      if (this.splashReturnFocus?.isConnected) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 126

```text
        this.splashReturnFocus.focus({ preventScroll: true });
```

Defines a named field in the save/profile or UI data structure.

### Line 127

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 128

```text
      this.splashReturnFocus = null;
```

Stores the splashReturnFocus runtime reference/state on this manager so later save operations can reuse it.

### Line 129

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 130

```text

```

Blank line separates related logic for readability.

### Line 131

```text
    openModal() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 132

```text
      this.modal?.classList.replace('hidden-view', 'active-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 133

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 134

```text

```

Blank line separates related logic for readability.

### Line 135

```text
    closeModal() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 136

```text
      this.modal?.classList.replace('active-view', 'hidden-view');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 137

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 138

```text

```

Blank line separates related logic for readability.

### Line 139

```text
    setStatus(message, state = 'local') {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 140

```text
      if (!this.status) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 141

```text
      this.status.textContent = message;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 142

```text
      this.status.dataset.state = state;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 143

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 144

```text

```

Blank line separates related logic for readability.

### Line 145

```text
    recoveryKey() { return `${RECOVERY_KEY}:${window.LocalProfiles?.activeProfile?.id || 'none'}`; }
```

Builds a per-profile recovery-storage key, using “none” before a profile exists.

### Line 146

```text

```

Blank line separates related logic for readability.

### Line 147

```text
    currentRevision() { return Number(window.LocalProfiles?.getCurrentSave()?.revision) || 0; }
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 148

```text
    isSameSave(a, b) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 149

```text
      const fields = ['profileId','revision','updatedAt','player','settings','jackpot','raceBet','raceResultNotice','raceExperience','slotBonuses','accomplishments'];
```

Chooses the portable fields whose JSON equality determines whether browser and linked saves differ.

### Line 150

```text
      return fields.every(field => JSON.stringify(a?.[field]) === JSON.stringify(b?.[field]));
```

Deep-compares selected fields through JSON serialization; this is equality, not cryptographic integrity.

### Line 151

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 152

```text
    // Whitelist portable game fields; never include the profile password, encryption key, or browser credentials.
```

Documents the portability boundary: passwords, encryption keys, and browser credentials are intentionally excluded.

### Line 153

```text
    createSave() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 154

```text
      const profile = window.LocalProfiles?.activeProfile;
```

Defines profile for use by the surrounding persistence logic.

### Line 155

```text
      const current = window.LocalProfiles?.getCurrentSave() || {};
```

Defines current for use by the surrounding persistence logic.

### Line 156

```text
      return {
```

Returns an object with fields format: `FILE_FORMAT` (file format); schemaVersion: `FILE_SCHEMA_VERSION` (file schema version); profileId: uses `profile?.id` (the id property of profile); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to null; revision: uses converts `current.revision` (the revision property of current) to a number (invalid numeric text becomes NaN) when it is truthy, otherwise falls back to 0; updatedAt: uses `current.updatedAt` (the updated at property of current) when it is truthy, otherwise falls back to formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; player: calls `this.hub.player.toProfile` with no arguments; and further fields to the caller and exits this function.

### Line 157

```text
        format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
```

Writes the format marker and current schema number into every backup.

### Line 158

```text
        profileId: profile?.id || null, revision: Number(current.revision) || 0,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 159

```text
        updatedAt: current.updatedAt || new Date().toISOString(),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 160

```text
        player: this.hub.player.toProfile(), settings: this.normalizeSettings(this.settings.getSettings()),
```

Serializes only the validated player/settings and game-progress fields, not profile secrets.

### Line 161

```text
        jackpot: Player.numberOr(this.jackpot.currentJackpot, 10000, 0),
```

Persists the jackpot as a finite nonnegative number, defaulting to 10,000 when invalid.

### Line 162

```text
        raceBet: current.raceBet || null, raceResultNotice: current.raceResultNotice || null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 163

```text
        raceExperience: current.raceExperience || null, slotBonuses: current.slotBonuses || {}, accomplishments: current.accomplishments || {}
```

Defines a named field in the save/profile or UI data structure.

### Line 164

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 165

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 166

```text
    // Validate the versioned envelope and normalize fields before imported JSON reaches live game state.
```

Marks parseSave as the trust boundary where version and field normalization happen before game mutation.

### Line 167

```text
    parseSave(text) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 168

```text
      if (typeof text !== 'string' || text.length > MAX_JSON_BYTES) throw new Error('The save file is too large.');
```

Limits input length and rejects non-string input before parsing attacker-controlled JSON.

### Line 169

```text
      const data = JSON.parse(text);
```

Defines data for use by the surrounding persistence logic.

### Line 170

```text
      if (!data || data.format !== FILE_FORMAT || ![1, FILE_SCHEMA_VERSION].includes(data.schemaVersion)) throw new Error('This is not a supported S&S Casino Hub save file.');
```

Requires the expected format and only schema 1 or 2, blocking arbitrary JSON from import.

### Line 171

```text
      const normalized = window.LocalProfiles?.normalizeSave(data) || {};
```

Delegates field clamping and whitelisting to the profile manager.

### Line 172

```text
      const jackpot = Player.numberOr(data.jackpot, NaN, 0);
```

Revalidates jackpot as a finite value at least zero; malformed jackpot data aborts import.

### Line 173

```text
      if (!Number.isFinite(jackpot)) throw new Error('The save file has an invalid jackpot value.');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 174

```text
      return { ...normalized, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION,
```

Returns an object with fields copied from `normalized` (normalized); format: `FILE_FORMAT` (file format); schemaVersion: `FILE_SCHEMA_VERSION` (file schema version); profileId: checks checks that gets the JavaScript type name of `data.profileId` (the profile id property of data) and "string" have the same value and type; if true chooses `data.profileId` (the profile id property of data), otherwise null; revision: checks uses checks whether `data.revision` (the revision property of data) is at least 0 only if calls `Number.isSafeInteger` with `data.revision` (the revision property of data) is truthy; otherwise keeps the falsy first value; if true chooses `data.revision` (the revision property of data), otherwise 0; updatedAt: checks checks that gets the JavaScript type name of `data.updatedAt` (the updated at property of data) and "string" have the same value and type; if true chooses `data.updatedAt` (the updated at property of data), otherwise formats constructs a new instance of `Date` with no arguments as a UTC ISO date-time string; and further fields to the caller and exits this function.

### Line 175

```text
        profileId: typeof data.profileId === 'string' ? data.profileId : null,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 176

```text
        revision: Number.isSafeInteger(data.revision) && data.revision >= 0 ? data.revision : 0,
```

Accepts numeric input only when it is finite/safe and satisfies the surrounding domain limits.

### Line 177

```text
        updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : new Date().toISOString(),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 178

```text
        jackpot, legacy: data.schemaVersion !== FILE_SCHEMA_VERSION || !data.profileId };
```

Marks version-1 or profile-less files as legacy so they cannot silently replace a current profile.

### Line 179

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 180

```text
    normalizeSettings(value) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 181

```text
      const input = value && typeof value === 'object' ? value : {};
```

Defines input for use by the surrounding persistence logic.

### Line 182

```text
      const volume = Math.round(Player.numberOr(input.volume, DEFAULT_SETTINGS.volume, 0));
```

Rounds volume to an integer after numeric fallback, making the UI setting predictable.

### Line 183

```text
      return {
```

Returns an object with fields volume: chooses the smallest of 100, `volume` (volume); isMuted: checks that `input.isMuted` (the is muted property of input) and true have the same value and type; theme: checks calls `THEMES.has` with `input.theme` (the theme property of input); if true chooses `input.theme` (the theme property of input), otherwise `DEFAULT_SETTINGS.theme` (the theme property of DEFAULT_SETTINGS) to the caller and exits this function.

### Line 184

```text
        volume: Math.min(100, volume),
```

Caps volume at 100 while retaining a lower bound from numberOr.

### Line 185

```text
        isMuted: input.isMuted === true,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 186

```text
        theme: THEMES.has(input.theme) ? input.theme : DEFAULT_SETTINGS.theme
```

Accepts only the four theme values; unknown themes fall back to Vegas.

### Line 187

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 188

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 189

```text

```

Blank line separates related logic for readability.

### Line 190

```text
    readLegacyProfiles() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 191

```text
      const archived = window.LocalProfiles?.getCurrentSave().legacyProfiles || [];
```

Defines archived for use by the surrounding persistence logic.

### Line 192

```text
      return archived.map(profile => ({
```

Returns sorts transforms each item of `archived` (archived) using a callback taking profile that an object with fields updatedAtMs: calls `Player.numberOr` with `profile.updatedAtMs`; 0; 0; player: calls `Player.fromProfile(profile.player).toProfile` with no arguments; settings: calls `this.normalizeSettings` with `profile.settings` and returns a new array in place using comparison a callback taking a, b that subtracts `a.updatedAtMs` (the updated at ms property of a) from `b.updatedAtMs` (the updated at ms property of b) to the caller and exits this function.

### Line 193

```text
        updatedAtMs: Player.numberOr(profile.updatedAtMs, 0, 0),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 194

```text
        player: Player.fromProfile(profile.player).toProfile(),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 195

```text
        settings: this.normalizeSettings(profile.settings)
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 196

```text
      })).sort((a, b) => b.updatedAtMs - a.updatedAtMs);
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 197

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 198

```text

```

Blank line separates related logic for readability.

### Line 199

```text
    refreshLegacyRecoveryOption() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 200

```text
      let hasRecovery = false;
```

Defines hasRecovery for use by the surrounding persistence logic.

### Line 201

```text
      try { hasRecovery = !!localStorage.getItem(this.recoveryKey()); } catch (error) { /* Keep the browser save usable. */ }
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 202

```text
      const profiles = this.readLegacyProfiles();
```

Defines profiles for use by the surrounding persistence logic.

### Line 203

```text
      this.recoverButton?.classList.toggle('hidden-view', !hasRecovery && !profiles.length);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 204

```text
      if (this.recoverButton) this.recoverButton.textContent = hasRecovery ? 'Restore previous save' : 'Recover older local profile';
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 205

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 206

```text

```

Blank line separates related logic for readability.

### Line 207

```text
    async recoverLegacyProfile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 208

```text
      if (!this.canReplaceSave()) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 209

```text
      let save = null;
```

Defines save for use by the surrounding persistence logic.

### Line 210

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 211

```text
        const record = JSON.parse(localStorage.getItem(this.recoveryKey()) || 'null');
```

Defines record for use by the surrounding persistence logic.

### Line 212

```text
        const profile = window.LocalProfiles?.activeProfile;
```

Defines profile for use by the surrounding persistence logic.

### Line 213

```text
        if (record?.format === 'ss-casino-encrypted-recovery' && record.profileId === profile?.id && profile && window.LocalProfiles?.activeKey) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 214

```text
          save = await window.LocalProfiles.decryptSave({ ...profile, iv: record.iv, ciphertext: record.ciphertext }, window.LocalProfiles.activeKey);
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 215

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 216

```text
      } catch (error) { save = null; }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 217

```text
      if (!save) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 218

```text
        const profiles = this.readLegacyProfiles();
```

Defines profiles for use by the surrounding persistence logic.

### Line 219

```text
        if (!profiles.length) { this.refreshLegacyRecoveryOption(); return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 220

```text
        const newest = profiles[0]; save = { player: newest.player, settings: newest.settings, jackpot: this.jackpot.currentJackpot };
```

Defines newest for use by the surrounding persistence logic.

### Line 221

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 222

```text
      if (!confirm('Replace this browser save with the encrypted recovery snapshot? The current save will remain protected until replacement succeeds.')) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 223

```text
      const applied = await this.applySave({ ...save, format: FILE_FORMAT, schemaVersion: FILE_SCHEMA_VERSION, profileId: window.LocalProfiles?.activeProfile?.id || null, revision: this.currentRevision() + 1, updatedAt: new Date().toISOString() });
```

Defines applied for use by the surrounding persistence logic.

### Line 224

```text
      if (applied) this.refreshLegacyRecoveryOption();
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 225

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 226

```text
    canReplaceSave() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 227

```text
      if (typeof window.canReplaceCasinoSave === 'function' && !window.canReplaceCasinoSave()) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 228

```text
        this.setStatus('Finish the active game and return to the lobby before replacing a save.', 'warning');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 229

```text
        return false;
```

Returns false to the caller and exits this function.

### Line 230

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 231

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 232

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 233

```text
    // Apply validated data only after a durable recovery snapshot and a successful browser save.
```

States the replacement ordering: durable encrypted recovery must exist before live state changes.

### Line 234

```text
    async applySave(save) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 235

```text
      if (!this.canReplaceSave()) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 236

```text
      const profiles = window.LocalProfiles; const current = { ...(profiles?.getCurrentSave?.() || {}), player: this.hub.player.toProfile(), settings: this.settings.getSettings() };
```

Defines profiles for use by the surrounding persistence logic.

### Line 237

```text
      let previousRecovery;
```

Defines previousRecovery for use by the surrounding persistence logic.

### Line 238

```text
      try { previousRecovery = localStorage.getItem(this.recoveryKey()); }
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 239

```text
      catch (error) { this.setStatus('Browser storage could not be read; no progress was replaced.', 'warning'); return false; }
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 240

```text
      const restoreRecovery = () => { try { if (previousRecovery === null) localStorage.removeItem(this.recoveryKey()); else localStorage.setItem(this.recoveryKey(), previousRecovery); } catch (error) {} };
```

Defines restoreRecovery for use by the surrounding persistence logic.

### Line 241

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 242

```text
        await profiles?.flushSave?.();
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 243

```text
        const active = profiles?.activeProfile, key = profiles?.activeKey;
```

Defines active for use by the surrounding persistence logic.

### Line 244

```text
        if (!active || !key || typeof profiles.encryptSave !== 'function') throw new Error('No active encryption key');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 245

```text
        const sealed = await profiles.encryptSave(active, key, current);
```

Encrypts the current browser save with the active password-derived key before replacement.

### Line 246

```text
        localStorage.setItem(this.recoveryKey(), JSON.stringify({ format: 'ss-casino-encrypted-recovery', profileId: active.id, iv: sealed.iv, ciphertext: sealed.ciphertext }));
```

Stores only the recovery envelope’s profile id, IV, and ciphertext; the recovery snapshot is encrypted.

### Line 247

```text
      } catch (error) { this.setStatus('Could not create a durable encrypted recovery snapshot; no save was replaced.', 'warning'); return false; }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 248

```text
      const next = profiles?.normalizeSave ? profiles.normalizeSave({ ...current, ...save, jackpot: Number.isFinite(save.jackpot) ? save.jackpot : this.jackpot.currentJackpot, revision: save.revision, updatedAt: save.updatedAt }) : { ...current, ...save };
```

Defines next for use by the surrounding persistence logic.

### Line 249

```text
      this.fileHandle = null;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 250

```text
      const durable = await (profiles?.saveCurrent?.(next) ?? false);
```

Defines durable for use by the surrounding persistence logic.

### Line 251

```text
      if (!durable) { profiles.currentSave = current; restoreRecovery(); this.setStatus('Browser storage failed; replacement was not durably saved.', 'warning'); return false; }
```

Rolls back the in-memory current save and recovery record if durable replacement fails.

### Line 252

```text
      this.hub.player = Player.fromProfile(next.player, profiles?.activeProfile?.name || 'Player'); this.settings.applySettings?.(next.settings); this.jackpot.setJackpot?.(next.jackpot);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 253

```text
      window.RaceGame?.resetForActiveProfile?.(); await window.refreshCasinoSaveState?.(next); this.hub.updateGlobalUI?.(); this.bank?.updateModalUI?.(); this.xp?.updateUI?.(); this.dailyWheel?.updateUI?.();
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 254

```text
      this.refreshLegacyRecoveryOption();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 255

```text
      this.setStatus('Local save loaded. The previous progress is available with Restore previous save.', 'local'); return true;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 256

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 257

```text
    // Linking needs the user's explicit browser file-picker choice; unsupported browsers keep download/import backups.
```

Explains that linking requires an explicit picker and manual JSON remains the fallback.

### Line 258

```text
    async linkFile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 259

```text
      if (typeof window.showSaveFilePicker !== 'function') { this.setStatus('Direct file auto-save is not supported in this browser. Use Download save backup and Import save file instead.', 'warning'); return false; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 260

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 261

```text
        const handle = await window.showSaveFilePicker({ suggestedName: 'ss-casino-save.json', types: [{ description: 'S&S Casino Hub save file', accept: { 'application/json': ['.json'] } }] });
```

Defines handle for use by the surrounding persistence logic.

### Line 262

```text
        const file = await handle.getFile(); let existingSave = null; let bytes = '';
```

Defines file for use by the surrounding persistence logic.

### Line 263

```text
        if (file.size > 0) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 264

```text
          bytes = await file.text(); try { existingSave = this.parseSave(bytes); } catch (error) { alert('That file is not a valid S&S Casino Hub save. Choose a different file or import a valid JSON backup.'); return false; }
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 265

```text
          const activeId = window.LocalProfiles?.activeProfile?.id || null;
```

Defines activeId for use by the surrounding persistence logic.

### Line 266

```text
          if (existingSave.legacy || (existingSave.profileId && existingSave.profileId !== activeId) || existingSave.revision < this.currentRevision() || Date.parse(existingSave.updatedAt) < Date.parse(this.createSave().updatedAt)) { this.setStatus('Linked save is stale, legacy, or for another profile. It was not loaded or overwritten; use Import after reviewing it.', 'warning'); return false; }
```

Rejects a linked file from another profile or an older revision/date before any overwrite.

### Line 267

```text
          if (!this.isSameSave(existingSave, this.createSave()) && (!this.canReplaceSave() || !confirm('This file differs from the current browser save. Replace the browser save with it?'))) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 268

```text
        }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 269

```text
        if (existingSave && !await this.applySave(existingSave)) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 270

```text
        this.fileHandle = handle; if (!await this.storeHandle(handle)) { this.fileHandle = null; return false; }
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 271

```text
        this.lastLinkedBytes = bytes; this.lastLinkedRevision = existingSave?.revision ?? this.currentRevision();
```

Stores the lastLinkedBytes runtime reference/state on this manager so later save operations can reuse it.

### Line 272

```text
        if (!await this.writeToLinkedFile()) { this.fileHandle = null; return false; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 273

```text
        this.setStatus(`Saved in this browser and linked file: ${handle.name}`, 'linked'); return true;
```

Defines a named field in the save/profile or UI data structure.

### Line 274

```text
      } catch (error) { if (error?.name !== 'AbortError') this.setStatus('Could not link that file. Browser-local saving is still active; use Download save backup instead.', 'warning'); return false; }
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 275

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 276

```text

```

Blank line separates related logic for readability.

### Line 277

```text
    // A promise queue keeps rapid writes ordered so an older save cannot finish after and replace a newer one.
```

Explains why serialized file writes are queued: completion order must match save order.

### Line 278

```text
    queueFileSave() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 279

```text
      if (!this.fileHandle) return Promise.resolve(false); const fileHandle = this.fileHandle; const saveText = JSON.stringify(this.createSave(), null, 2);
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 280

```text
      this.fileWriteQueue = this.fileWriteQueue.catch(() => false).then(async () => {
```

Stores the fileWriteQueue runtime reference/state on this manager so later save operations can reuse it.

### Line 281

```text
        if (this.fileHandle !== fileHandle) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 282

```text
        if (await window.LocalProfiles?.flushSave?.() === false) { this.fileHandle = null; this.setStatus('Browser storage failed; file auto-save is paused to protect the backup.', 'warning'); return false; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 283

```text
        const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
```

Defines file for use by the surrounding persistence logic.

### Line 284

```text
        if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused. Review it and link it again.', 'warning'); return false; }
```

Detects external edits by comparing exact prior file text, then pauses rather than overwriting them.

### Line 285

```text
        const writable = await fileHandle.createWritable(); await writable.write(saveText); await writable.close(); this.lastLinkedBytes = saveText; this.lastLinkedRevision = this.createSave().revision; this.setStatus(`Saved in this browser and linked file: ${fileHandle.name}`, 'linked'); return true;
```

Defines writable for use by the surrounding persistence logic.

### Line 286

```text
      }).catch(error => { this.fileHandle = null; this.setStatus('Linked file auto-save failed; browser save remains active and file linking is paused.', 'warning'); return false; }); return this.fileWriteQueue;
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 287

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 288

```text
    async writeToLinkedFile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 289

```text
      if (!this.fileHandle) return false; const fileHandle = this.fileHandle; const file = await fileHandle.getFile(); const existing = file.size ? await file.text() : '';
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 290

```text
      if (this.lastLinkedBytes !== null && existing !== this.lastLinkedBytes) { this.fileHandle = null; this.setStatus('The linked file changed outside the game; auto-save is paused.', 'warning'); return false; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 291

```text
      const text = JSON.stringify(this.createSave(), null, 2); const writable = await fileHandle.createWritable(); await writable.write(text); await writable.close(); this.lastLinkedBytes = text; return true;
```

Defines text for use by the surrounding persistence logic.

### Line 292

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 293

```text

```

Blank line separates related logic for readability.

### Line 294

```text
    async switchProfile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 295

```text
      await this.fileWriteQueue.catch(() => {});
```

Waits for the asynchronous storage, encryption, or UI operation before continuing.

### Line 296

```text
      this.fileHandle = null; this.lastLinkedBytes = null;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 297

```text
      this.refreshLegacyRecoveryOption();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 298

```text
      this.setStatus('Encrypted profile save is active in this browser. Choose a save file to link this profile.', 'local');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 299

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 300

```text

```

Blank line separates related logic for readability.

### Line 301

```text
    // A Blob URL lets the browser download a portable JSON copy without uploading anything.
```

Clarifies that backup download is local browser output and does not upload save data.

### Line 302

```text
    downloadBackup() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 303

```text
      const blob = new Blob([JSON.stringify(this.createSave(), null, 2)], { type: 'application/json' });
```

Defines blob for use by the surrounding persistence logic.

### Line 304

```text
      const url = URL.createObjectURL(blob);
```

Defines url for use by the surrounding persistence logic.

### Line 305

```text
      const link = document.createElement('a');
```

Defines link for use by the surrounding persistence logic.

### Line 306

```text
      link.href = url;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 307

```text
      link.download = `ss-casino-save-${new Date().toISOString().slice(0, 10)}.json`;
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 308

```text
      document.body.appendChild(link);
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 309

```text
      link.click();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 310

```text
      link.remove();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 311

```text
      URL.revokeObjectURL(url);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 312

```text
      this.setStatus('Save backup downloaded to your device.', this.fileHandle ? 'linked' : 'local');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 313

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 314

```text

```

Blank line separates related logic for readability.

### Line 315

```text
    // Confirm before replacing the active save and clear the input so the same file can be selected again.
```

Comment: Confirm before replacing the active save and clear the input so the same file can be selected again.

### Line 316

```text
    async importSelectedFile(event) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 317

```text
      const file = event.target.files?.[0];
```

Defines file for use by the surrounding persistence logic.

### Line 318

```text
      if (!file) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 319

```text
      try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 320

```text
        const save = this.parseSave(await file.text());
```

Defines save for use by the surrounding persistence logic.

### Line 321

```text
        if (!this.canReplaceSave()) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 322

```text
        if (!confirm('Importing this file replaces the casino save currently stored in this browser. Continue?')) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 323

```text
        this.fileHandle = null;
```

Stores the fileHandle runtime reference/state on this manager so later save operations can reuse it.

### Line 324

```text
        const applied = await this.applySave(save);
```

Defines applied for use by the surrounding persistence logic.

### Line 325

```text
        if (!applied) throw new Error('Save replacement was not durable.');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 326

```text
      } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 327

```text
        alert(error instanceof SyntaxError ? 'The selected file is not valid JSON.' : (error.message || 'Could not import this save file.'));
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 328

```text
      } finally {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 329

```text
        event.target.value = '';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 330

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 331

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 332

```text

```

Blank line separates related logic for readability.

### Line 333

```text
    // IndexedDB stores FileSystemFileHandle objects because localStorage cannot structured-clone browser file handles.
```

Uses IndexedDB because FileSystemFileHandle objects cannot be stored in localStorage.

### Line 334

```text
    openHandleDatabase() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 335

```text
      if (!window.indexedDB) return Promise.resolve(null);
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 336

```text
      return new Promise((resolve, reject) => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.

### Line 337

```text
        const request = indexedDB.open(HANDLE_DB_NAME, 1);
```

Defines request for use by the surrounding persistence logic.

### Line 338

```text
        request.onupgradeneeded = () => {
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 339

```text
          if (!request.result.objectStoreNames.contains(HANDLE_STORE_NAME)) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 340

```text
            request.result.createObjectStore(HANDLE_STORE_NAME);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 341

```text
          }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 342

```text
        };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 343

```text
        request.onsuccess = () => resolve(request.result);
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 344

```text
        request.onerror = () => reject(request.error);
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 345

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 346

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 347

```text

```

Blank line separates related logic for readability.

### Line 348

```text
    async readStoredHandle() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 349

```text
      const db = await this.openHandleDatabase();
```

Defines db for use by the surrounding persistence logic.

### Line 350

```text
      if (!db) return null;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 351

```text
      return new Promise((resolve, reject) => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.

### Line 352

```text
        const request = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(this.getHandleKey());
```

Defines request for use by the surrounding persistence logic.

### Line 353

```text
        request.onsuccess = () => {
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 354

```text
          if (request.result || this.getHandleKey() === HANDLE_KEY) { db.close(); resolve(request.result || null); return; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 355

```text
          const legacy = db.transaction(HANDLE_STORE_NAME, 'readonly').objectStore(HANDLE_STORE_NAME).get(HANDLE_KEY);
```

Defines legacy for use by the surrounding persistence logic.

### Line 356

```text
          legacy.onsuccess = () => { db.close(); resolve(legacy.result || null); };
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 357

```text
          legacy.onerror = () => { db.close(); reject(legacy.error); };
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 358

```text
        };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 359

```text
        request.onerror = () => { db.close(); reject(request.error); };
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 360

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 361

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 362

```text

```

Blank line separates related logic for readability.

### Line 363

```text
    async storeHandle(handle) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 364

```text
      const db = await this.openHandleDatabase();
```

Defines db for use by the surrounding persistence logic.

### Line 365

```text
      if (!db) { this.setStatus('This browser cannot remember file links. Browser saving and manual backups remain available.', 'warning'); return false; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 366

```text
      return new Promise((resolve, reject) => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve, reject that runs its enclosed statements to the caller and exits this function.

### Line 367

```text
        const transaction = db.transaction(HANDLE_STORE_NAME, 'readwrite');
```

Defines transaction for use by the surrounding persistence logic.

### Line 368

```text
        transaction.objectStore(HANDLE_STORE_NAME).put(handle, this.getHandleKey());
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 369

```text
        transaction.oncomplete = () => { db.close(); resolve(true); };
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 370

```text
        transaction.onerror = () => { db.close(); reject(transaction.error); };
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 371

```text
      });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 372

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 373

```text

```

Blank line separates related logic for readability.

### Line 374

```text
    getHandleKey() {
```

Uses a profile-specific handle key so different local profiles do not share linked files.

### Line 375

```text
      const profileId = window.LocalProfiles?.activeProfile?.id;
```

Defines profileId for use by the surrounding persistence logic.

### Line 376

```text
      return profileId ? `profile-save-file:${profileId}` : HANDLE_KEY;
```

Returns checks `profileId` (profile id); if true chooses a text template that combines fixed text with computed values `profileId` (profile id), otherwise `HANDLE_KEY` (handle key) to the caller and exits this function.

### Line 377

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 378

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 379

```text

```

Blank line separates related logic for readability.

### Line 380

```text
  window.LocalSaveManager = LocalSaveManager;
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 381

```text
})();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
