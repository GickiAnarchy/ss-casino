# S&S Casino Hub accounts and cloud saves

## Firebase project

The browser app is configured for the existing Firebase project `ss-casino` using `firebase-config.js`. Its web API key is client configuration, not an authorization credential; Firestore Security Rules—not secrecy of the web config—protect player records. No service-account key or server credential is used.

The existing project is on the Spark plan, has Email/Password Authentication enabled, and already has a default Cloud Firestore database. Keep the project on Spark; this game uses only virtual chips and does not need billing, Cloud Functions, Storage, or paid services.

For GitHub Pages at `https://gickianarchy.github.io/ss-casino/`, make sure `gickianarchy.github.io` is listed under **Authentication → Settings → Authorized domains**. `localhost` may be added for local testing. Do not create a player account for the project owner as part of setup.

The app's Firestore rules are in [`firestore.rules`](./firestore.rules) and `firebase.json` points the Firebase CLI at them. Publish with:

```sh
firebase deploy --only firestore:rules --project ss-casino
```

The rules allow a signed-in user to get and replace only `users/{their-auth-uid}`, validate the permitted profile/settings fields, deny collection listing, and deny deletion. They never allow access to another UID's document.

## Save behavior

- Guests keep the existing `localStorage` save keys and can play without signing in.
- Signed-in players have a separate browser cache namespaced by Firebase UID and one Firestore document at `users/{uid}`. The game waits for the saved account profile to load before gameplay is enabled.
- A new account starts with a clean 1,000-chip profile; guest progress is not silently copied into it. Signing out returns to the device's guest save.
- If a signed-in player's device is offline, the account's own cached profile remains playable and local-first; it is queued for sync when connectivity returns. If neither cloud nor that UID's local cache can be read, the game uses a clean account profile, never guest or another account's state.
- The game compares save timestamps at sign-in and uses a Firestore transaction plus a live document listener to resolve conflicts. The newer save wins; if this device has the newer save, it is uploaded, while a newer cloud save is applied locally.
- Synced fields are virtual-chip balance, level/XP, debt/credit limit, daily-wheel cooldown, and audio/theme preferences. The progressive jackpot is explicitly a local demo value and remains device-local.
- Passwords are entered only into Firebase Authentication calls. They are not part of the `Player` model, browser save payloads, or Firestore documents. Firebase Auth's own session persistence is used for sign-in continuity.

This feature does not add deposits, cashouts, real-money wagering, or server-side verification of game outcomes. Players can still alter their own virtual-chip state through a modified browser; the service is a casual game save, not an anti-cheat or financial ledger.

## Local run and checks

Serve the directory over HTTP(S), for example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. Firebase Auth and Firestore must be reachable, the project rules must be published, and the page's hostname must be authorized for account mode. If the cloud service is unavailable, guest play stays local; a signed-in profile does not fall back to a different account's data.
