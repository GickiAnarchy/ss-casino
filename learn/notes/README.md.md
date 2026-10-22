# README.md

[Exact copy](../original/README.md)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
# S&S Casino Hub
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 2

```text

```

Blank line separates documentation topics.

### Line 3

```text
S&S Casino Hub is a static, vanilla HTML/CSS/JavaScript casino-style game. It uses **virtual chips only**: there are no deposits, cashouts, payment services, real-money wagers, or online game server.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: S&S Casino Hub is a static, vanilla HTML/CSS/JavaScript casino-style game. It uses **virtual chips only**: there are no deposits, cashouts, payment services, real-money wagers, or online game server.

### Line 4

```text

```

Blank line separates documentation topics.

### Line 5

```text
The lobby includes five slot tables grouped in a dedicated **Slot Room**, plus Coin Toss, Three Coin Toss, Blackjack, simulated horse/car racing, a daily bonus wheel, player levels, virtual-chip banking, and a browser-local demo jackpot.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: The lobby includes five slot tables grouped in a dedicated **Slot Room**, plus Coin Toss, Three Coin Toss, Blackjack, simulated horse/car racing, a daily bonus wheel, player levels, virtual-chip banking, and a browser-local demo jackpot.

### Line 6

```text

```

Blank line separates documentation topics.

### Line 7

```text
## Local gameplay and saves
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 8

```text

```

Blank line separates documentation topics.

### Line 9

```text
Wager controls now include separate Clear Bet and balance-aware Max buttons. Slots show paytables and line-by-line returns, preserve free spins and sticky wilds across refreshes, and summarize completed bonuses. Achievements unlock cosmetics only; race history and milestones stay local. Linked JSON files are checked for profile/revision conflicts before loading or writing, with encrypted recovery before an approved replacement.
```

This sentence teaches bonus durability, retained slot symbols, seeded local simulation in the casino and gives the reader context for why the design behaves this way: Wager controls now include separate Clear Bet and balance-aware Max buttons. Slots show paytables and line-by-line returns, preserve free spins and sticky wilds across refreshes, and summarize completed bonuses. Achievements unlock cosmetic

### Line 10

```text

```

Blank line separates documentation topics.

### Line 11

```text
See [gameplay and payout rules](docs/game-rules.md) and [local save recovery](docs/local-saves.md).
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: See [gameplay and payout rules](../original/docs/game-rules.md) and [local save recovery](../original/docs/local-saves.md).

### Line 12

```text

```

Blank line separates documentation topics.

### Line 13

```text
## Start here
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 14

```text

```

Blank line separates documentation topics.

### Line 15

```text
- [Beginner build-from-scratch tutorial](docs/building-from-scratch.md) — a guided explanation of the project, its architecture, how to run and test it, and how to add a themed slot table.
```

This bullet gives a concrete project responsibility or rule: [Beginner build-from-scratch tutorial](../original/docs/building-from-scratch.md) — a guided explanation of the project, its architecture, how to run and test it, and how to add a themed slot table.

### Line 16

```text
- [Local saves and profile guide](docs/local-saves.md) — profile encryption, browser storage, backups, imports, and linked files.
```

This bullet gives a concrete project responsibility or rule: [Local saves and profile guide](../original/docs/local-saves.md) — profile encryption, browser storage, backups, imports, and linked files.

### Line 17

```text

```

Blank line separates documentation topics.

### Line 18

```text
## Run and test locally
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 19

```text

```

Blank line separates documentation topics.

### Line 20

```text
You need a modern browser and Node.js 18 or newer for the included tests. There are no npm packages or build step.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: You need a modern browser and Node.js 18 or newer for the included tests. There are no npm packages or build step.

### Line 21

```text

```

Blank line separates documentation topics.

### Line 22

```text
From the repository root, start a local HTTP server:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: From the repository root, start a local HTTP server:

### Line 23

```text

```

Blank line separates documentation topics.

### Line 24

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 25

```text
python3 -m http.server 8000 --bind 127.0.0.1
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: python3 -m http.server 8000 --bind 127.0.0.1

### Line 26

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 27

```text

```

Blank line separates documentation topics.

### Line 28

```text
On Windows, the equivalent command is usually:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: On Windows, the equivalent command is usually:

### Line 29

```text

```

Blank line separates documentation topics.

### Line 30

```text
```powershell
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 31

```text
py -m http.server 8000 --bind 127.0.0.1
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: py -m http.server 8000 --bind 127.0.0.1

### Line 32

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 33

```text

```

Blank line separates documentation topics.

### Line 34

```text
Then visit <http://localhost:8000/>. **Use localhost instead of opening `index.html` as a `file://` URL**: password-protected profiles require the browser's Web Crypto API in a secure context, and modern browsers treat localhost as secure.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Then visit <http://localhost:8000/>. **Use localhost instead of opening `index.html` as a `file://` URL**: password-protected profiles require the browser's Web Crypto API in a secure context, and modern browsers treat localhost as secure.

### Line 35

```text

```

Blank line separates documentation topics.

### Line 36

```text
Run the automated tests in a second terminal from the project root:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: Run the automated tests in a second terminal from the project root:

### Line 37

```text

```

Blank line separates documentation topics.

### Line 38

```text
```sh
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 39

```text
node --test tests/*.test.js
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: node --test tests/*.test.js

### Line 40

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 41

```text

```

Blank line separates documentation topics.

### Line 42

```text
The tests use Node's built-in test runner and do not install dependencies.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The tests use Node's built-in test runner and do not install dependencies.

### Line 43

```text

```

Blank line separates documentation topics.

### Line 44

```text
## Project layout
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 45

```text

```

Blank line separates documentation topics.

### Line 46

```text
```text
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 47

```text
.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: .

### Line 48

```text
├── index.html                 # GitHub Pages entry point and reusable game markup/templates
```

This sentence teaches reusable HTML, static deployment in the casino and gives the reader context for why the design behaves this way: ├── index.html                 # GitHub Pages entry point and reusable game markup/templates

### Line 49

```text
├── assets/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── assets/

### Line 50

```text
│   ├── splash.png             # Locally served visual asset
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   ├── splash.png             # Locally served visual asset

### Line 51

```text
│   └── README.md              # Asset purpose and path guidance
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   └── README.md              # Asset purpose and path guidance

### Line 52

```text
├── src/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── src/

### Line 53

```text
│   ├── css/style.css          # Shared layout, themes, animation, and responsive rules
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   ├── css/style.css          # Shared layout, themes, animation, and responsive rules

### Line 54

```text
│   └── js/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   └── js/

### Line 55

```text
│       ├── models.js          # Validated in-memory Player model
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │       ├── models.js          # Validated in-memory Player model

### Line 56

```text
│       ├── local-save.js      # JSON backup/import and optional linked-file support
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │       ├── local-save.js      # JSON backup/import and optional linked-file support

### Line 57

```text
│       ├── profiles.js        # Encrypted browser-local profiles and migration
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │       ├── profiles.js        # Encrypted browser-local profiles and migration

### Line 58

```text
│       ├── race-engine.js     # Deterministic local horse/car simulation
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: │       ├── race-engine.js     # Deterministic local horse/car simulation

### Line 59

```text
│       ├── slot-bet-rules.js  # Cent-precision wager constraints shared by slot tables
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │       ├── slot-bet-rules.js  # Cent-precision wager constraints shared by slot tables

### Line 60

```text
│       ├── slot-templates.js  # Slot themes/catalog and generated Slot Room cards/views
```

This sentence teaches reusable HTML, data-driven machine registration in the casino and gives the reader context for why the design behaves this way: │       ├── slot-templates.js  # Slot themes/catalog and generated Slot Room cards/views

### Line 61

```text
│       └── app.js             # Browser bootstrap, game engines, and shared managers
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │       └── app.js             # Browser bootstrap, game engines, and shared managers

### Line 62

```text
├── tests/                     # Node test-runner suites; no third-party test framework
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── tests/                     # Node test-runner suites; no third-party test framework

### Line 63

```text
├── docs/
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: ├── docs/

### Line 64

```text
│   ├── building-from-scratch.md
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   ├── building-from-scratch.md

### Line 65

```text
│   └── local-saves.md
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: │   └── local-saves.md

### Line 66

```text
└── .vscode/launch.json        # Optional Chrome debugging configurations
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: └── .vscode/launch.json        # Optional Chrome debugging configurations

### Line 67

```text
```
```

This fence starts or ends a runnable command/code example; the contents show the exact project operation to copy or inspect.

### Line 68

```text

```

Blank line separates documentation topics.

### Line 69

```text
`index.html` deliberately stays at the repository root because GitHub Pages can serve it directly as the site home page. Source code and tests live below it so the root stays easy to navigate.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: `index.html` deliberately stays at the repository root because GitHub Pages can serve it directly as the site home page. Source code and tests live below it so the root stays easy to navigate.

### Line 70

```text

```

Blank line separates documentation topics.

### Line 71

```text
## Slot Room
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 72

```text

```

Blank line separates documentation topics.

### Line 73

```text
All five slot tables are grouped inside the lobby's **Slot Room**:
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: All five slot tables are grouped inside the lobby's **Slot Room**:

### Line 74

```text

```

Blank line separates documentation topics.

### Line 75

```text
1. Classic 3-Reel — high-stakes table, $5 minimum.
```

This numbered instruction gives an actionable build or verification step: Classic 3-Reel — high-stakes table, $5 minimum.

### Line 76

```text
2. 5-Reel Gem Quest — high-stakes table, $5 minimum, free spins and sticky wilds.
```

This numbered instruction gives an actionable build or verification step: 5-Reel Gem Quest — high-stakes table, $5 minimum, free spins and sticky wilds.

### Line 77

```text
3. Citrus Garden Penny Slots — $0.05–$5.00, in 5-cent steps.
```

This numbered instruction gives an actionable build or verification step: Citrus Garden Penny Slots — $0.05–$5.00, in 5-cent steps.

### Line 78

```text
4. Neon Midway Quarter Slots — $0.25–$25.00, in 25-cent steps.
```

This numbered instruction gives an actionable build or verification step: Neon Midway Quarter Slots — $0.25–$25.00, in 25-cent steps.

### Line 79

```text
5. Deep Sea Gem Quest — five-reel table, $0.25–$25.00, in 25-cent steps.
```

This numbered instruction gives an actionable build or verification step: Deep Sea Gem Quest — five-reel table, $0.25–$25.00, in 25-cent steps.

### Line 80

```text

```

Blank line separates documentation topics.

### Line 81

```text
The original two slot cards are written in `index.html`. The three additional themed cards are generated from the catalog in `src/js/slot-templates.js` and appended to the same `.slot-room-grid`. The matching reusable machine markup is stored in HTML `<template>` elements in `index.html`. `src/js/slot-bet-rules.js` performs wager calculations as integer cents to avoid floating-point rounding surprises.
```

This sentence teaches rounding-safe wager arithmetic, reusable HTML, data-driven machine registration in the casino and gives the reader context for why the design behaves this way: The original two slot cards are written in `index.html`. The three additional themed cards are generated from the catalog in `src/js/slot-templates.js` and appended to the same `.slot-room-grid`. The matching reusable machine markup is stor

### Line 82

```text

```

Blank line separates documentation topics.

### Line 83

```text
## Local-only player data
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 84

```text

```

Blank line separates documentation topics.

### Line 85

```text
Player progress is kept in this browser and website origin. Password-protected profiles derive a key from the profile password and encrypt profile data with AES-GCM. The demo jackpot is intentionally shared between profiles in the same browser origin and stored separately in local storage. Nothing is uploaded or synchronized by the game.
```

This sentence teaches authenticated local encryption in the casino and gives the reader context for why the design behaves this way: Player progress is kept in this browser and website origin. Password-protected profiles derive a key from the profile password and encrypt profile data with AES-GCM. The demo jackpot is intentionally shared between profiles in the same brow

### Line 86

```text

```

Blank line separates documentation topics.

### Line 87

```text
The **LOCAL SAVE** dialog can download a JSON backup, import a backup, or link a JSON file for automatic updates in supported desktop browsers. **Downloaded and linked JSON backups are not encrypted.** They contain game state and preferences, not the profile password or encryption key. See [Local saves and profiles](docs/local-saves.md) before moving or restoring data.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: The **LOCAL SAVE** dialog can download a JSON backup, import a backup, or link a JSON file for automatic updates in supported desktop browsers. **Downloaded and linked JSON backups are not encrypted.** They contain game state and preference

### Line 88

```text

```

Blank line separates documentation topics.

### Line 89

```text
New profiles and intentional casino-data resets start at $100.00. Valid saved balances are preserved when loading existing profiles. Save schemas are normalized and versioned so malformed or unsupported data is rejected rather than silently treated as a new save.
```

This sentence adds project-specific context about how the browser app is built, run, tested, or kept safe: New profiles and intentional casino-data resets start at $100.00. Valid saved balances are preserved when loading existing profiles. Save schemas are normalized and versioned so malformed or unsupported data is rejected rather than silently

### Line 90

```text

```

Blank line separates documentation topics.

### Line 91

```text
## Simulated racing
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 92

```text

```

Blank line separates documentation topics.

### Line 93

```text
Horse and car events are generated in the browser on the device's local clock. Events run hourly from 7 AM through 9 PM, alternating circuits: horses start at 7 AM and every two hours after; cars start at 8 AM and every two hours after. Previews and betting open 45 minutes before a race; betting closes five minutes before the start. Horse fields contain six runners, car fields eight, chosen from larger stable lists.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: Horse and car events are generated in the browser on the device's local clock. Events run hourly from 7 AM through 9 PM, alternating circuits: horses start at 7 AM and every two hours after; cars start at 8 AM and every two hours after. Pre

### Line 94

```text

```

Blank line separates documentation topics.

### Line 95

```text
A seeded pseudo-random generator makes race fields, duration, odds, and results repeatable after a refresh. Starts and wins affect later simulated ability and displayed chances. An open ticket, runner records, and unread result notice are saved to the active profile and portable backups. The game does not use a live sports feed, racing server, or external odds source.
```

This sentence teaches seeded local simulation in the casino and gives the reader context for why the design behaves this way: A seeded pseudo-random generator makes race fields, duration, odds, and results repeatable after a refresh. Starts and wins affect later simulated ability and displayed chances. An open ticket, runner records, and unread result notice are s

### Line 96

```text

```

Blank line separates documentation topics.

### Line 97

```text
## Development and publishing
```

This heading identifies the concept area, helping a beginner navigate the casino architecture, gameplay, storage, or workflow guide.

### Line 98

```text

```

Blank line separates documentation topics.

### Line 99

```text
Work on the `dev` branch for this project. This code organization keeps asset links relative to the root, so a static host can serve the same files without a bundler. The current reorganization and documentation were pushed to `dev` in commit `46e9692`; do not push future changes without the project owner’s explicit approval. Also check which branch GitHub Pages is configured to serve: a change on `dev` is not necessarily the public site source.
```

This sentence teaches static deployment in the casino and gives the reader context for why the design behaves this way: Work on the `dev` branch for this project. This code organization keeps asset links relative to the root, so a static host can serve the same files without a bundler. The current reorganization and documentation were pushed to `dev` in comm

### Line 100

```text

```

Blank line separates documentation topics.

### Line 101

```text
This is a virtual-credit entertainment project, not a gambling or payment product.
```

This sentence teaches non-cash economy in the casino and gives the reader context for why the design behaves this way: This is a virtual-credit entertainment project, not a gambling or payment product.
