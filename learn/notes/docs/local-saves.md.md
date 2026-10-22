# docs/local-saves.md

[Exact copy](../../original/docs/local-saves.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# S&S Casino Hub local saves and profiles
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 2

```text

```

Blank line separates documentation topics.

### Line 3

```text
The game has **no online save service**. It stores progress in the current browser profile and website origin. A save made on `localhost` is separate from one made on GitHub Pages, another browser profile, or another device.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: The game has **no online save service**. It stores progress in the current browser profile and website origin. A save made on `localhost` is separate from one made on GitHub Pages, another browser profile, or another device.

### Line 4

```text

```

Blank line separates documentation topics.

### Line 5

```text
## Password-protected profiles
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 6

```text

```

Blank line separates documentation topics.

### Line 7

```text
- Create a profile with a unique name and password (8–128 characters), then unlock it when you open the hosted app.
```

This bullet gives a concrete project responsibility or rule: Create a profile with a unique name and password (8–128 characters), then unlock it when you open the hosted app.

### Line 8

```text
- Each profile has its own virtual chips, level, debt, daily-wheel cooldown, settings, race ticket, race records, and race-result notice.
```

This bullet gives a concrete project responsibility or rule: Each profile has its own virtual chips, level, debt, daily-wheel cooldown, settings, race ticket, race records, and race-result notice.

### Line 9

```text
- Profile data is encrypted locally with AES-GCM. A key is derived from the password using PBKDF2 and a per-profile random salt. The password and derived key are not stored in the profile database.
```

This bullet gives a concrete project responsibility or rule: Profile data is encrypted locally with AES-GCM. A key is derived from the password using PBKDF2 and a per-profile random salt. The password and derived key are not stored in the profile database.

### Line 10

```text
- The demo jackpot is shared among profiles in the same browser and website origin. It is stored separately in browser local storage, not inside each encrypted profile.
```

This bullet gives a concrete project responsibility or rule: The demo jackpot is shared among profiles in the same browser and website origin. It is stored separately in browser local storage, not inside each encrypted profile.

### Line 11

```text
- Existing guest progress is migrated into the first profile created after profile support is enabled. Valid existing balances are retained.
```

This bullet gives a concrete project responsibility or rule: Existing guest progress is migrated into the first profile created after profile support is enabled. Valid existing balances are retained.

### Line 12

```text
- Switching profiles is allowed only in the lobby when game rounds, free spins, a wheel spin, and a race ticket are not active. Profile passwords cannot be reset or recovered.
```

This bullet gives a concrete project responsibility or rule: Switching profiles is allowed only in the lobby when game rounds, free spins, a wheel spin, and a race ticket are not active. Profile passwords cannot be reset or recovered.

### Line 13

```text
- Encryption protects saved data at rest in the browser. It is not an online account, a sync service, or protection from someone who controls an already-unlocked browser.
```

This bullet gives a concrete project responsibility or rule: Encryption protects saved data at rest in the browser. It is not an online account, a sync service, or protection from someone who controls an already-unlocked browser.

### Line 14

```text

```

Blank line separates documentation topics.

### Line 15

```text
## Save-file options
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 16

```text

```

Blank line separates documentation topics.

### Line 17

```text
Open **LOCAL SAVE** in the game:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Open **LOCAL SAVE** in the game:

### Line 18

```text

```

Blank line separates documentation topics.

### Line 19

```text
- **Choose / link a save file** — supported desktop browsers can link a JSON file. Linked files carry the active profile ID, revision, and timestamp. A stale, legacy, or different-profile file is never silently loaded or overwritten; divergent files require an explicit replacement confirmation. Before replacement, the previous active profile state is encrypted with that profile key and written to a durable per-profile recovery snapshot. Later changes are written back only after a successful atomic file write. Browser permission may need to be granted again.
```

This bullet gives a concrete project responsibility or rule: **Choose / link a save file** — supported desktop browsers can link a JSON file. Linked files carry the active profile ID, revision, and timestamp. A stale, legacy, or different-profile file is never silently loaded or o

### Line 20

```text
- **Download save backup** — downloads the active profile's portable game state and the current shared jackpot as JSON.
```

This bullet gives a concrete project responsibility or rule: **Download save backup** — downloads the active profile's portable game state and the current shared jackpot as JSON.

### Line 21

```text
- **Import save file** — validates and loads a supported JSON backup after asking before replacing the active profile's current game state.
```

This bullet gives a concrete project responsibility or rule: **Import save file** — validates and loads a supported JSON backup after asking before replacing the active profile's current game state.

### Line 22

```text
- **Recover older local profile** — where compatible older local caches exist, offers the encrypted previous profile snapshot for recovery after confirmation (and still supports compatible older local caches). Legacy caches are retained until the new encrypted profile has been durably written.
```

This bullet gives a concrete project responsibility or rule: **Recover older local profile** — where compatible older local caches exist, offers the encrypted previous profile snapshot for recovery after confirmation (and still supports compatible older local caches). Legacy cache

### Line 23

```text

```

Blank line separates documentation topics.

### Line 24

```text
**A JSON backup is not encrypted.** It does not include the profile password or encryption key. Treat the file like an unprotected copy of the game progress. The regular browser profile save remains encrypted.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: **A JSON backup is not encrypted.** It does not include the profile password or encryption key. Treat the file like an unprotected copy of the game progress. The regular browser profile save remains encrypted.

### Line 25

```text

```

Blank line separates documentation topics.

### Line 26

```text
Direct file linking uses the browser's File System Access API where available. Browser-local profile saves and the download/import options continue to work when it is not available. IndexedDB remembers the browser file handle; after switching profiles, link a file again for the newly active profile. Clearing browser site data, changing the browser profile, or using another device can remove access to local saves; export a backup if you need portability.
```

This sentence teaches file-handle persistence in the casino and gives the reader context for why the design behaves this way: Direct file linking uses the browser's File System Access API where available. Browser-local profile saves and the download/import options continue to work when it is not available. IndexedDB remembers the browser file handle; after switchi

### Line 27

```text

```

Blank line separates documentation topics.

### Line 28

```text
## Run the game locally
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 29

```text

```

Blank line separates documentation topics.

### Line 30

```text
Run the server from the **repository root** (the directory containing `index.html`), not from this `docs` folder:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Run the server from the **repository root** (the directory containing `index.html`), not from this `docs` folder:

### Line 31

```text

```

Blank line separates documentation topics.

### Line 32

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 33

```text
python3 -m http.server 8000 --bind 127.0.0.1
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: python3 -m http.server 8000 --bind 127.0.0.1

### Line 34

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 35

```text

```

Blank line separates documentation topics.

### Line 36

```text
On Windows, use `py -m http.server 8000 --bind 127.0.0.1`. Then open <http://localhost:8000/>. No Firebase project, API key, account, or online save service is needed. Localhost is used because browsers require a secure context for Web Crypto, which encrypts profiles.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: On Windows, use `py -m http.server 8000 --bind 127.0.0.1`. Then open <http://localhost:8000/>. No Firebase project, API key, account, or online save service is needed. Localhost is used because browsers require a secure context for Web Cryp

### Line 37

```text

```

Blank line separates documentation topics.

### Line 38

```text
Automated tests can be run from the repository root with:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Automated tests can be run from the repository root with:

### Line 39

```text

```

Blank line separates documentation topics.

### Line 40

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 41

```text
node --test tests/*.test.js
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: node --test tests/*.test.js

### Line 42

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 43

```text

```

Blank line separates documentation topics.

### Line 44

```text
The casino uses virtual credits only and does not support deposits, cashouts, or real-money gambling.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: The casino uses virtual credits only and does not support deposits, cashouts, or real-money gambling.

### Line 45

```text

```

Blank line separates documentation topics.

### Line 46

```text

```

Blank line separates documentation topics.

### Line 47

```text
## Revisions, recovery, and failures
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 48

```text

```

Blank line separates documentation topics.

### Line 49

```text
Every normalized profile save carries a monotonic `revision` and `updatedAt` timestamp. Optional `slotBonuses` and `accomplishments` maps are validated and carried through encrypted saves, JSON backups, imports, and recovery snapshots. A replacement first stores `ss_casino_recovery_snapshot_v1:<profile-id>` as an encrypted, profile-tagged record in browser storage; if recovery or encrypted browser storage fails, the live state is not replaced and the UI reports the failure. The LOCAL SAVE dialog exposes **Restore previous save** for the active profile. A linked-file write failure pauses that link while the browser profile stays active. JSON backups remain unencrypted and should be treated as sensitive.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Every normalized profile save carries a monotonic `revision` and `updatedAt` timestamp. Optional `slotBonuses` and `accomplishments` maps are validated and carried through encrypted saves, JSON backups, imports, and recovery snapshots. A re
