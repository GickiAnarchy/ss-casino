# S&S Casino Hub

S&S Casino Hub is a static, vanilla HTML/CSS/JavaScript casino-style game. It uses **virtual chips only**: there are no deposits, cashouts, payment services, real-money wagers, or online game server.

The lobby includes five slot tables grouped in a dedicated **Slot Room**, plus Coin Toss, Three Coin Toss, Blackjack, simulated horse/car racing, a daily bonus wheel, player levels, virtual-chip banking, and a browser-local demo jackpot.

## Local gameplay and saves

Wager controls now include separate Clear Bet and balance-aware Max buttons. Slots show paytables and line-by-line returns, preserve free spins and sticky wilds across refreshes, and summarize completed bonuses. Achievements unlock cosmetics only; race history and milestones stay local. Linked JSON files are checked for profile/revision conflicts before loading or writing, with encrypted recovery before an approved replacement.

See [gameplay and payout rules](docs/game-rules.md) and [local save recovery](docs/local-saves.md).

## Start here

- [Beginner build-from-scratch tutorial](docs/building-from-scratch.md) — a guided explanation of the project, its architecture, how to run and test it, and how to add a themed slot table.
- [Local saves and profile guide](docs/local-saves.md) — profile encryption, browser storage, backups, imports, and linked files.

## Run and test locally

You need a modern browser and Node.js 18 or newer for the included tests. There are no npm packages or build step.

From the repository root, start a local HTTP server:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, the equivalent command is usually:

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Then visit <http://localhost:8000/>. **Use localhost instead of opening `index.html` as a `file://` URL**: password-protected profiles require the browser's Web Crypto API in a secure context, and modern browsers treat localhost as secure.

Run the automated tests in a second terminal from the project root:

```sh
node --test tests/*.test.js
```

The tests use Node's built-in test runner and do not install dependencies.

## Project layout

```text
.
├── index.html                 # GitHub Pages entry point and reusable game markup/templates
├── assets/
│   ├── splash.png             # Locally served visual asset
│   └── README.md              # Asset purpose and path guidance
├── src/
│   ├── css/style.css          # Shared layout, themes, animation, and responsive rules
│   └── js/
│       ├── models.js          # Validated in-memory Player model
│       ├── local-save.js      # JSON backup/import and optional linked-file support
│       ├── profiles.js        # Encrypted browser-local profiles and migration
│       ├── race-engine.js     # Deterministic local horse/car simulation
│       ├── slot-bet-rules.js  # Cent-precision wager constraints shared by slot tables
│       ├── slot-templates.js  # Slot themes/catalog and generated Slot Room cards/views
│       └── app.js             # Browser bootstrap, game engines, and shared managers
├── tests/                     # Node test-runner suites; no third-party test framework
├── docs/
│   ├── building-from-scratch.md
│   └── local-saves.md
└── .vscode/launch.json        # Optional Chrome debugging configurations
```

`index.html` deliberately stays at the repository root because GitHub Pages can serve it directly as the site home page. Source code and tests live below it so the root stays easy to navigate.

## Slot Room

All five slot tables are grouped inside the lobby's **Slot Room**:

1. Classic 3-Reel — high-stakes table, $5 minimum.
2. 5-Reel Gem Quest — high-stakes table, $5 minimum, free spins and sticky wilds.
3. Citrus Garden Penny Slots — $0.05–$5.00, in 5-cent steps.
4. Neon Midway Quarter Slots — $0.25–$25.00, in 25-cent steps.
5. Deep Sea Gem Quest — five-reel table, $0.25–$25.00, in 25-cent steps.

The original two slot cards are written in `index.html`. The three additional themed cards are generated from the catalog in `src/js/slot-templates.js` and appended to the same `.slot-room-grid`. The matching reusable machine markup is stored in HTML `<template>` elements in `index.html`. `src/js/slot-bet-rules.js` performs wager calculations as integer cents to avoid floating-point rounding surprises.

## Local-only player data

Player progress is kept in this browser and website origin. Password-protected profiles derive a key from the profile password and encrypt profile data with AES-GCM. The demo jackpot is intentionally shared between profiles in the same browser origin and stored separately in local storage. Nothing is uploaded or synchronized by the game.

The **LOCAL SAVE** dialog can download a JSON backup, import a backup, or link a JSON file for automatic updates in supported desktop browsers. **Downloaded and linked JSON backups are not encrypted.** They contain game state and preferences, not the profile password or encryption key. See [Local saves and profiles](docs/local-saves.md) before moving or restoring data.

New profiles and intentional casino-data resets start at $100.00. Valid saved balances are preserved when loading existing profiles. Save schemas are normalized and versioned so malformed or unsupported data is rejected rather than silently treated as a new save.

## Simulated racing

Horse and car events are generated in the browser on the device's local clock. Events run hourly from 7 AM through 9 PM, alternating circuits: horses start at 7 AM and every two hours after; cars start at 8 AM and every two hours after. Previews and betting open 45 minutes before a race; betting closes five minutes before the start. Horse fields contain six runners, car fields eight, chosen from larger stable lists.

A seeded pseudo-random generator makes race fields, duration, odds, and results repeatable after a refresh. Starts and wins affect later simulated ability and displayed chances. An open ticket, runner records, and unread result notice are saved to the active profile and portable backups. The game does not use a live sports feed, racing server, or external odds source.

## Development and publishing

Work on the `dev` branch for this project. This code organization keeps asset links relative to the root, so a static host can serve the same files without a bundler. The current reorganization and documentation were pushed to `dev` in commit `46e9692`; do not push future changes without the project owner’s explicit approval. Also check which branch GitHub Pages is configured to serve: a change on `dev` is not necessarily the public site source.

This is a virtual-credit entertainment project, not a gambling or payment product.
