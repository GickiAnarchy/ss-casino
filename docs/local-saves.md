# S&S Casino Hub local saves and profiles

The game has **no online save service**. It stores progress in the current browser profile and website origin. A save made on `localhost` is separate from one made on GitHub Pages, another browser profile, or another device.

## Password-protected profiles

- Create a profile with a unique name and password (8–128 characters), then unlock it when you open the hosted app.
- Each profile has its own virtual chips, level, debt, daily-wheel cooldown, settings, race ticket, race records, and race-result notice.
- Profile data is encrypted locally with AES-GCM. A key is derived from the password using PBKDF2 and a per-profile random salt. The password and derived key are not stored in the profile database.
- The demo jackpot is shared among profiles in the same browser and website origin. It is stored separately in browser local storage, not inside each encrypted profile.
- Existing guest progress is migrated into the first profile created after profile support is enabled. Valid existing balances are retained.
- Switching profiles is allowed only in the lobby when game rounds, free spins, a wheel spin, and a race ticket are not active. Profile passwords cannot be reset or recovered.
- Encryption protects saved data at rest in the browser. It is not an online account, a sync service, or protection from someone who controls an already-unlocked browser.

## Save-file options

Open **LOCAL SAVE** in the game:

- **Choose / link a save file** — supported desktop browsers can link a JSON file. Linked files carry the active profile ID, revision, and timestamp. A stale, legacy, or different-profile file is never silently loaded or overwritten; divergent files require an explicit replacement confirmation. Before replacement, the previous active profile state is encrypted with that profile key and written to a durable per-profile recovery snapshot. Later changes are written back only after a successful atomic file write. Browser permission may need to be granted again.
- **Download save backup** — downloads the active profile's portable game state and the current shared jackpot as JSON.
- **Import save file** — validates and loads a supported JSON backup after asking before replacing the active profile's current game state.
- **Recover older local profile** — where compatible older local caches exist, offers the encrypted previous profile snapshot for recovery after confirmation (and still supports compatible older local caches). Legacy caches are retained until the new encrypted profile has been durably written.

**A JSON backup is not encrypted.** It does not include the profile password or encryption key. Treat the file like an unprotected copy of the game progress. The regular browser profile save remains encrypted.

Direct file linking uses the browser's File System Access API where available. Browser-local profile saves and the download/import options continue to work when it is not available. IndexedDB remembers the browser file handle; after switching profiles, link a file again for the newly active profile. Clearing browser site data, changing the browser profile, or using another device can remove access to local saves; export a backup if you need portability.

## Run the game locally

Run the server from the **repository root** (the directory containing `index.html`), not from this `docs` folder:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, use `py -m http.server 8000 --bind 127.0.0.1`. Then open <http://localhost:8000/>. No Firebase project, API key, account, or online save service is needed. Localhost is used because browsers require a secure context for Web Crypto, which encrypts profiles.

Automated tests can be run from the repository root with:

```sh
node --test tests/*.test.js
```

The casino uses virtual credits only and does not support deposits, cashouts, or real-money gambling.


## Revisions, recovery, and failures

Every normalized profile save carries a monotonic `revision` and `updatedAt` timestamp. Optional `slotBonuses` and `accomplishments` maps are validated and carried through encrypted saves, JSON backups, imports, and recovery snapshots. A replacement first stores `ss_casino_recovery_snapshot_v1:<profile-id>` as an encrypted, profile-tagged record in browser storage; if recovery or encrypted browser storage fails, the live state is not replaced and the UI reports the failure. The LOCAL SAVE dialog exposes **Restore previous save** for the active profile. A linked-file write failure pauses that link while the browser profile stays active. JSON backups remain unencrypted and should be treated as sensitive.
