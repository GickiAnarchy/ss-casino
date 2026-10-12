# S&S Casino Hub local saves

The game does not use accounts, Firebase, or an online save service. Player progress, daily-wheel cooldown, audio/theme preferences, and the local demo jackpot are kept on the device. The browser's local storage is updated automatically as the game changes.

## Save-file options

Open **LOCAL SAVE** in the game:

- **Choose / link a save file** — supported desktop browsers (such as current Chromium browsers) can link a JSON file. After the user chooses the file, the game loads it (if it already contains a valid save) and updates it as play continues. Browser permission may need to be granted again later.
- **Download save backup** — downloads the current save as a JSON file. Keep the backup somewhere safe or copy it to another device manually.
- **Import save file** — loads a previously downloaded save into this browser after confirmation. Importing replaces this browser's current casino state.
- **Recover older local profile** — if an earlier version left a profile cache in this browser, this offers the most recently updated cache for recovery after confirmation. The original cache is left untouched.

If direct file linking is unavailable in the browser, browser-local saving continues to work and the download/import options remain available. Browser storage belongs to the browser profile and website origin; clearing site data or using another browser/device does not transfer it. Back up or export the JSON file if you need portability. Save files contain virtual-chip game state and preferences only, not passwords or account credentials.

## Run locally

Serve this directory over HTTP(S), for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. No Firebase setup or API keys are required. Local storage is origin-specific, so saves made on `localhost` are separate from saves made on the hosted site.

The game uses virtual credits only and does not support deposits, cashouts, or real-money gambling.
