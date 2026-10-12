# S&S Casino Hub local saves

The game does not use Firebase or an online save service. It supports multiple password-protected profiles stored in this browser. Profile data is encrypted locally with AES-GCM using a key derived from the profile password; only the profile name and encryption metadata are stored outside the encrypted save. Nothing is uploaded or synchronized.

## Local profiles

- Create a profile with a unique name and password (at least 8 characters), then unlock it whenever the hosted app is opened.
- Each profile has its own chips, level, debt, daily-wheel cooldown, audio/theme preferences, and demo jackpot. Use the profile button in the header to switch profiles; switching is allowed only when no game round is active and you are in the lobby.
- Existing browser-local guest progress is moved into the first profile created after this update.
- Passwords cannot be reset or recovered. If a password is forgotten, the encrypted profile cannot be unlocked. Profiles are specific to this browser profile and website origin, so they do not automatically move to another device.
- The password protects and encrypts the local profile while it is stored. This is not an online identity service or protection against someone who controls the browser while a profile is already unlocked.

## Save-file options

Open **LOCAL SAVE** in the game:

- **Choose / link a save file** — supported desktop browsers (such as current Chromium browsers) can link a JSON file. After the user chooses the file, the game loads it (if it already contains a valid save) and updates it as play continues. Browser permission may need to be granted again later.
- **Download save backup** — downloads the active profile's game state as a JSON file. The backup does not contain the profile password and is not encrypted; store it somewhere safe or copy it to another device manually.
- **Import save file** — loads a previously downloaded save into the currently unlocked profile after confirmation. Importing replaces that profile's current casino state.
- **Recover older local profile** — if an earlier version left profile caches in this browser, those caches are encrypted into the first profile created after this update. While that profile is unlocked, this option can recover the most recently updated cache after confirmation.

If direct file linking is unavailable in the browser, browser-local saving continues to work and the download/import options remain available. Each profile has its own linked-file association; after switching profiles, choose/link a file again if you want file auto-save for the new active profile. Links created by versions before multi-profile support should be relinked. Browser storage belongs to the browser profile and website origin; clearing site data or using another browser/device does not transfer it. Back up or export the JSON file if you need portability. Save files contain virtual-chip game state and preferences only, not passwords or account credentials.

## Run locally

Serve this directory over HTTP(S), for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. No Firebase setup or API keys are required. Local storage is origin-specific, so saves made on `localhost` are separate from saves made on the hosted site.

The game uses virtual credits only and does not support deposits, cashouts, or real-money gambling.
