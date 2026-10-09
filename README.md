# S&S Casino Hub

A static, virtual-chip casino game with Classic Slots, Gem Quest 5-Reel Slots, Coin Toss, Blackjack 21, a daily bonus wheel, player leveling, and a local demo jackpot.

## Accounts and saves

Play as a guest with browser-local saves, or create/sign in to an account with Firebase Email/Password Authentication. Signed-in saves sync to the player's UID-owned Firestore profile and remain cached separately on that device. Guest progress is not silently imported into a new account. Passwords are handled by Firebase Authentication and never stored in game state or Firestore.

Firebase setup and local testing: [`S&S_Casino_Hub_account_setup.md`](./S%26S_Casino_Hub_account_setup.md). Firestore rules: [`firestore.rules`](./firestore.rules).

This game uses virtual credits only. It does not support deposits, cashouts, or real-money gambling.
