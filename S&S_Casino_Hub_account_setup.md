# S&S Casino Hub account setup

## Firebase console checklist

1. Open the Firebase project **ss-casino**.
2. In **Authentication → Sign-in method**, enable **Email/Password**.
3. In **Firestore Database**, create a database if one does not already exist.
4. Publish the rules from [`firestore.rules`](./firestore.rules). These rules allow a signed-in player to read and write only `users/{their-auth-uid}`; do not replace them with open test-mode rules.
5. Serve this app from an HTTP(S) origin and add that hostname under **Authentication → Settings → Authorized domains** if it is not already listed. A deployed HTTPS host is recommended; `localhost` works for local development.

The Firebase web configuration is embedded in `app.js` for the browser SDK. No service-account key or server credential is used. The app does not log passwords or Firebase configuration values.

## What the app stores

- **Signed-in players:** wallet balance, XP/level, loan debt, daily-wheel cooldown, and audio/theme settings are stored in the Firestore document `users/{uid}`. Each account is loaded before play and autosave is enabled only after that profile has loaded successfully.
- **Guests:** retain the existing browser-local save behavior in `localStorage`.
- **Existing guest progress is not automatically copied into a new account.** A first-time account starts with its own default profile; the guest save remains on that browser.
- The jackpot ticker is deliberately labeled **LOCAL DEMO JACKPOT**. It stays in browser storage and is not a shared or globally synchronized prize pool.
- This feature only adds accounts and persistence; it does not add real-money betting, payment, or server-side anti-cheat validation.

## Local run and checks

Serve the folder over HTTP, for example with `python3 -m http.server 8000`, then open `http://localhost:8000/`. Firebase Auth and Firestore must be enabled and the rules above published for account mode. If Firestore cannot read an account document, gameplay remains locked until the player signs out or the Firebase setup is corrected; the app does not fall back to another player's or the guest's local progress.
