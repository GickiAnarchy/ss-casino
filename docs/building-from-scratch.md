# Build S&S Casino Hub from Scratch: A Beginner's Guide

This tutorial explains how to think about and build this project one layer at a time. It assumes you are learning web development and may not yet know how HTML, CSS, JavaScript, browser storage, or tests fit together. The codebase is a real static web app, so there is no server framework to install and no build command that hides what the browser runs.

> The casino uses virtual credits only. It has no deposits, cashouts, real-money wagers, online game server, live sports feed, or account sync service.

## 1. What you are building

A browser loads three kinds of files:

- **HTML** describes the page structure: headings, buttons, game screens, dialogs, and reusable slot-machine templates.
- **CSS** controls how that structure looks: colors, layout, responsive behavior, and animations.
- **JavaScript** makes the page interactive: changing balances, spinning reels, saving progress, and updating the screen.

S&S Casino Hub deliberately uses plain HTML, CSS, and JavaScript. A static host such as GitHub Pages can serve the files directly. There is no build step, server-side code, database service, or npm dependency. This makes the source easier to inspect and lets the same files run locally and on a static host.

The lobby has a dedicated **Slot Room** containing all five slot choices. Coin Toss, Blackjack, and Racing remain separate games. The app also includes a daily bonus wheel, local profiles, settings, a virtual bank, player levels, and a browser-local demo jackpot.

## 2. Tools to install

You need:

1. A modern browser, such as Chrome, Firefox, Edge, or Safari.
2. A text editor. Visual Studio Code is optional; any editor that handles plain text works.
3. Node.js 18 or newer if you want to run the automated tests. The project uses Node's built-in test runner and installs no test packages.
4. Python 3 if you want the simple built-in local web server. Most systems have it already. The Windows launcher is commonly named `py`.
5. Git if you want to track your changes.

You do **not** need a Firebase account, an API key, a casino service, a package installation, or a payment provider.

## 3. Create a project folder

For a new project, create a folder and change into it. The `dev` branch is used for this project's development work:

```sh
mkdir ss-casino
cd ss-casino
git init -b dev
```

If you are working in the existing repository instead, first check that it is on `dev` and that you understand any local changes before editing:

```sh
git status --short --branch
git branch --show-current
```

Do not overwrite files containing player data. In this project, player data lives in the browser's site storage or in a user-selected save backup, not in the source folder.

Create the folders below. The root `index.html` is intentional: static hosting looks for it as the site's home page.

```text
ss-casino/
├── index.html
├── assets/
├── src/
│   ├── css/
│   └── js/
├── tests/
└── docs/
```

What belongs where:

- `index.html`: the page shell and the static pieces of the user interface.
- `src/css/`: site styles.
- `src/js/`: browser code, separated into modules by responsibility.
- `assets/`: local images or other static files.
- `tests/`: automated checks run by Node.
- `docs/`: explanations for people using or maintaining the project.

This is a simple organization rule, not a browser requirement. The browser can load a file from any directory as long as the path in HTML is correct. A clear structure makes it easier for a beginner to find the right file.

## 4. Start with the page shell

Create `index.html` with the minimum valid document structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>S&amp;S Casino Hub</title>
  <link rel="stylesheet" href="src/css/style.css">
  <script src="src/js/models.js" defer></script>
  <script src="src/js/local-save.js" defer></script>
  <script src="src/js/profiles.js" defer></script>
  <script src="src/js/race-engine.js" defer></script>
  <script src="src/js/slot-bet-rules.js" defer></script>
  <script src="src/js/slot-templates.js" defer></script>
  <script src="src/js/app.js" defer></script>
</head>
<body>
  <header><!-- global balance and profile controls --></header>
  <main id="app-container"><!-- lobby and game views --></main>
</body>
</html>
```

The `defer` attribute tells the browser to download a script without blocking HTML parsing, then run it after the document has been parsed. Deferred scripts run in document order. Order matters because later files call APIs created by earlier files: the model loads before save/profile code, and the slot catalog loads before the app controller creates slot engines.

Keep the script tags in one list in `index.html`. That gives a beginner one visible place to understand the app's startup order. This project uses browser globals rather than ES-module imports; the globals are explicitly attached to `window` so other deferred scripts can use them.

### 4.1 Build the lobby and give slots their own room

Use semantic sections and headings to show that the slot machines belong together. A simplified example:

```html
<section id="view-lobby" class="view-screen active-view">
  <header class="lobby-header">
    <h2>Select a room</h2>
    <p>Choose a game to play.</p>
  </header>

  <section class="lobby-slot-room" aria-labelledby="slot-room-title">
    <h3 id="slot-room-title">Slot Room</h3>
    <div class="slot-room-grid">
      <!-- Hand-authored cards for the original machines go here. -->
    </div>
  </section>

  <div class="game-grid">
    <!-- Coin Toss, Blackjack, and Racing cards go here. -->
  </div>
</section>
```

The `aria-labelledby` attribute connects the room's accessible name to its heading. The `.slot-room-grid` is a deliberate contract: the slot catalog looks for that class and appends the themed slot cards there. Keeping the slot cards separate from `.game-grid` prevents future machines from drifting back into the general game list.

Every play button has a `data-game` attribute:

```html
<button type="button" class="play-btn" data-game="blackjack">Play now</button>
```

A `data-*` attribute stores a small string of app-specific data on an HTML element. Here it is the navigation key. JavaScript reads it when the user clicks the button. `type="button"` prevents the button from accidentally submitting a form if the markup is later nested inside one.

### 4.2 Give each game a view

A game view is a section in the same page. The app hides all but the selected one by toggling CSS classes:

```html
<section id="view-blackjack" class="view-screen hidden-view">
  <button type="button" class="back-lobby-btn">Back to lobby</button>
  <!-- Blackjack table and controls -->
</section>
```

The lobby is marked `active-view` at first, and other views start as `hidden-view`. This is simpler than navigating between separate HTML files because the wallet and game engines can stay alive while the player switches views.

### 4.3 Make reusable slot templates

A `<template>` is stored in the document but is not displayed until JavaScript clones its contents. One classic-slot template can therefore create several machines without copying the same controls and layout:

```html
<template id="slot-template-classic">
  <section>
    <button type="button" class="back-lobby-btn">Back to lobby</button>
    <div class="slot-machine theme-slot-machine">
      <h1 data-slot-title></h1>
      <p data-slot-stakes></p>
      <div data-slot-status role="status" aria-live="polite"></div>
      <div class="reels-viewport"><!-- reel strips --></div>
      <button type="button" data-slot-spin>Spin</button>
    </div>
  </section>
</template>
```

The `data-slot-*` attributes are stable hooks that the engine uses to find controls. They separate the engine from specific element IDs, which makes the template reusable. The five-reel template has additional markup for its bonus panel and five reels.

Use `aria-live="polite"` for status text that changes during play so assistive technology can announce results without interrupting the current reading.

## 5. Add visual rules in CSS

Create `src/css/style.css`. Start with a few shared values:

```css
:root {
  --gold-primary: #ffd700;
  --panel-bg: #1e1e24;
  --bg-primary: radial-gradient(circle, #4a0d66, #0f081d);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Segoe UI", Tahoma, sans-serif;
}

body {
  min-height: 100vh;
  background: var(--bg-primary);
  color: #fff;
}

.hidden-view { display: none !important; }
.active-view { display: block; }
```

The custom properties beginning with `--` are CSS variables. They centralize the palette so themes can change the same values in one place. `box-sizing: border-box` makes declared widths include padding and borders, which makes card sizing more predictable.

Use CSS Grid for card collections because it automatically lays cards out in rows and can adapt to available space:

```css
.slot-room-grid,
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

`auto-fit` creates as many columns as fit. `minmax(250px, 1fr)` asks each column to stay at least 250 pixels wide while sharing the remaining space. On a narrow screen, fewer columns fit and the room naturally becomes a single column.

The actual stylesheet also includes responsive breakpoints, slot-reel windows, card styles, buttons, modals, race tracks, reduced-motion support, and theme-variable consumers. Comments in the file explain why the broader rules are grouped together.

### 5.1 Theme the whole page and each slot cabinet

There are two independent theme systems:

- The **page theme** (`vegas`, `midnight`, or `gold`) changes shared CSS variables on the `<body>`.
- A **slot-machine theme** gives one cabinet its own accent, reel, symbol, and button colors.

Keeping them separate lets a player choose an overall site style without erasing the identity of the Citrus Garden or Deep Sea machine. Slot theme values are written as CSS custom properties such as `--slot-accent`; the shared `.theme-slot-machine` rules read those values.

## 6. Model the player and use cents for wagers

### 6.1 The `Player` model

`src/js/models.js` defines a `Player` class. It keeps related player state—balance, level, experience, debt, credit limit, and maximum wager—in one object. It also has `toProfile()` and `fromProfile()` methods to convert between a live object and a plain data record.

That explicit conversion is important: browser saves should contain only intended game fields, not methods or temporary animation state. Numeric input passes through `numberOr()` so a malformed or negative value cannot blindly become part of the in-memory model.

A new profile starts at $100.00, but loading a real saved profile must preserve its valid balance. Defaults are for missing or invalid data, not permission to overwrite progress.

### 6.2 Why money is stored as integer cents during calculations

JavaScript uses binary floating-point numbers. Many decimal fractions, including 0.1, cannot be represented exactly. A calculation such as `0.1 + 0.2` can produce a value that displays as `0.30000000000000004`.

`src/js/slot-bet-rules.js` converts a dollar amount into integer cents with `toCents()`, performs limits and increments using integers, then converts back for display. A $0.05 minimum with $0.05 steps therefore stays exactly on legal increments. The module also checks the player's wallet, their personal maximum, and the table maximum together.

All tables share these rules but pass different configuration:

- A penny table: minimum $0.05, step $0.05, maximum $5.00.
- A quarter table: minimum $0.25, step $0.25, maximum $25.00.
- The original high-stakes tables: minimum and step $5.00, bounded by the player's affordable maximum.

Payouts still display two decimal places. Integer cents reduce the common source of rounding surprises; they do not turn the game into a financial ledger.

## 7. Organize game logic into engines and managers

`src/js/app.js` is the browser controller. It waits for the page, creates the shared managers, connects controls to events, and hosts the game engines. It is large because the project intentionally avoids a framework and has multiple games; the comments divide it into understandable systems.

A **manager** owns a shared service such as settings, XP, the bank, or the daily wheel. An **engine** owns one game's round state and rules. A game's engine asks the central casino hub to change the wallet rather than directly editing unrelated interface elements.

### 7.1 The central casino hub

`CasinoHubController` owns the active `Player`, the current view, and the global balance display. `modifyBalance(amount)` rounds to cents, saves, and refreshes the displayed wallet. `switchView(name)` hides the prior section and reveals the selected game view.

This avoids making a separate copy of the player's balance inside every game. The game may remember its current wager, but the hub remains the source of truth for the wallet.

### 7.2 Sound and celebration effects

`FXEngine` creates short tones with the Web Audio API and particles on a Canvas. A user click is used to initialize or resume audio because browsers normally restrict sound that starts without a user gesture. The master gain node applies volume and mute settings to sounds. The Canvas is a visual layer with `pointer-events: none`, so confetti cannot block clicks.

This approach avoids remote sound files and keeps effects optional. If the browser lacks an audio context or canvas, the app can skip those effects rather than relying on an external service.

### 7.3 Coin Toss

The coin-toss engine tracks the chosen side, current wager, and `isFlipping` flag. The busy flag disables actions while CSS animation runs and prevents a double click from charging the player twice. A completed virtual round calls the hub to deduct the wager or award the result.

### 7.4 Blackjack

Blackjack uses a finite set of game states: `BETTING`, `PLAYER_TURN`, `DEALER_TURN`, and `ENDED`. The state decides which controls are visible. A deck is shuffled with the Fisher–Yates algorithm: walk backward through an array, choose a random remaining position, and swap those two cards.

Aces are first counted as 11. If the total exceeds 21, the value is reduced by 10 for as many aces as needed, making each such ace count as 1. When the player stands, the dealer draws until reaching 17 or more. The engine settles wins, losses, pushes, and natural blackjack, then returns to betting for the next hand.

### 7.5 Daily bonus wheel

The wheel is drawn with the Canvas 2D API. JavaScript chooses a prize, animates a rotation with `requestAnimationFrame`, and records the completion time. A 24-hour cooldown is computed from the saved timestamp. The wheel's prize list and displayed wheel use the same slice array, so the visual and the credited prize stay aligned.

### 7.6 Experience and levels

`XPManager` awards experience from virtual wagers and loops through level-ups if a large award crosses more than one threshold. It updates the level badge and progress bar. Reaching milestones can grant virtual-chip bonuses. XP changes progression, not the casino's random draw or the race result.

### 7.7 Local jackpot and bank

The demo jackpot is stored under its own browser local-storage key and is shared by profiles within that browser origin. A browser `storage` event updates other tabs when that key changes. Slot wagers contribute a small fraction; a jackpot feature awards the current value and resets it. It is explicitly a local demo value, not a shared online prize pool.

The bank modifies only virtual chips and a local debt field. A loan adds a stated flat fee to virtual debt; repayment is capped by debt and the current virtual balance. Neither action contacts a financial institution.

## 8. Build reusable slot machines

### 8.1 Catalog versus engine

The slot project separates three ideas:

1. **Template** — the reusable HTML cabinet layout.
2. **Catalog entry** — one machine's ID, name, stake limits, selected template, and theme.
3. **Engine** — the shared rules for a three-reel or five-reel machine.

This separation is why adding a color theme does not require copying the animation, bet handling, or payout code.

`src/js/slot-templates.js` contains a `themes` object and a `games` array. When it loads, `render()` finds `.slot-room-grid`, creates a card for every catalog entry, clones the matching HTML template, fills title/stake/status labels, applies CSS variables, and appends the game view to `#app-container`.

The generated view receives an ID such as `view-penny-slots` and `data-game-view="penny-slots"`. The main controller uses those identifiers to find the right view when the card is clicked. Because `slot-templates.js` is deferred before `app.js`, the cards and views exist when the controller binds buttons.

### 8.2 Three-reel game loop

The classic engine:

1. Finds its controls by `data-slot-*` attributes.
2. Checks the legal maximum wager against wallet balance and player limit.
3. Deducts the wager once and awards XP/contributes to the demo jackpot.
4. Chooses a final symbol grid using weighted random symbol selection.
5. Builds a longer strip with random symbols and the final results at the end.
6. Animates each reel to its result; later reels stop after a longer duration to create a staggered effect.
7. Evaluates each configured payline, substitutes wild symbols, highlights wins, and adds the payout to the wallet.
8. Re-enables controls and displays a result message.

The final result is chosen before the animation. The moving strip is presentation; it does not decide the outcome after a wager has been charged. That separation is easier to reason about and keeps the screen in sync with the payout.

### 8.3 Five-reel bonus features

The five-reel engine uses five columns and three visible rows. A payline is a list of `[reel, row]` positions; a win evaluator reads the symbol in each position. The `SYMBOLS` list contains each symbol's weight and payout multiplier. A lower weight means a symbol is less likely to be selected by the weighted chooser.

This table also keeps `freeSpinsRemaining`, cumulative bonus winnings, and a 5-by-3 sticky-wild grid. Scatter symbols can trigger bonus spins, and wilds that land in appropriate positions can be retained during the bonus sequence. While free spins remain, wager buttons are disabled and the bonus status is shown. The free-spin sequence uses the wager of the paid spin that started the bonus.

To protect yourself from accidental feature changes, add a test or manually verify the trigger, counter, retained wilds, payout, and transition back to paid spins whenever you edit the bonus rules.

## 9. Add another themed slot table

The current themed tables demonstrate the extension pattern. To add another catalog-driven machine:

1. Choose `classic` or `five-reel`. Reuse a template and engine before deciding a new engine is necessary.
2. Add a theme object in `src/js/slot-templates.js`. Supply an unused key, a display label, a card icon, colors for the cabinet/reels/symbols/buttons, optional symbol replacements, and sound preset names already supported by `FXEngine`.
3. Add a record to the `games` array. Give it a unique `id`, set `engine` to exactly `classic` or `five-reel`, reference the matching `templateId`, add a title and description, select the `themeId`, and provide `minimumBet`, `betStep`, `maximumBet`, and `startingBet`.
4. Keep the `stakes` string consistent with the numeric values. It is visible on the lobby card and inside the machine.
5. Use unique IDs. The ID becomes part of the view ID and is used to navigate to that table.
6. If a theme uses an image, put it in `assets/`, give it appropriate alternative text, and remember that URL paths are resolved relative to the page unless your code makes an explicit base URL.
7. Run the tests, then load the local site and verify the new card appears **inside Slot Room**, its play button opens the correct view, its stake controls stop at the right values, and its payouts update the shared balance.

The catalog's renderer targets `.slot-room-grid`; changing that selector back to `.game-grid` would break the room grouping. Keep the static original cards in `index.html` and generated themed cards in the catalog.

## 10. Keep player progress local

### 10.1 Browser storage concepts

`localStorage` is a small key/value store scoped to the browser profile and website origin. A value is text, so the app serializes plain objects with `JSON.stringify()` and reads them back with `JSON.parse()`. It persists after a tab closes, but it does not automatically sync to a different browser or computer.

S&S Casino Hub uses browser local storage for the encrypted profile database and the shared demo jackpot. `IndexedDB` is used to remember a file handle for optional linked-save support, because file handles are structured objects rather than plain text.

### 10.2 Password-protected profiles

`src/js/profiles.js` owns profile creation, unlock, encryption, and save updates. At a beginner level, the flow is:

1. Create a random per-profile salt.
2. Convert the password to bytes and derive a key with PBKDF2 and SHA-256.
3. Encrypt the normalized profile save with AES-GCM and a fresh random initialization vector.
4. Store the profile name/ID, salt, IV, and ciphertext in browser local storage.
5. When unlocking, derive a key from the entered password and saved salt, then ask AES-GCM to authenticate and decrypt the ciphertext.

AES-GCM both encrypts the content and detects unauthorized changes. The profile ID and name are included as additional authenticated data so a ciphertext cannot be silently moved to a different profile identity. The code validates the database and normalizes values when they are loaded.

This design is for local-at-rest privacy, not an identity system or an online account. A person who controls the browser while a profile is unlocked can use the app. If the password is forgotten, the profile cannot be decrypted. The Web Crypto API requires HTTPS or a browser-recognized secure context; `localhost` is recognized for development. Do not open the page with `file://` and expect encrypted profile setup to work.

### 10.3 Migrations and compatibility

The profile manager reads older local-save fields, normalizes them, then migrates them into the first encrypted profile. It removes old legacy keys only after creating the new profile. Normalization preserves a valid existing balance and applies defaults only where a field is absent or invalid. Race tickets also carry compatibility fields so previously saved event results can still be reconstructed.

Changing a storage key, record shape, or algorithm is a data-format change. Before doing so, decide how existing saves will migrate. Do not simply delete old keys or replace them with defaults; that can destroy progress.

### 10.4 Export, import, and linked files

`src/js/local-save.js` builds a versioned JSON backup containing the player's game state, preferences, and jackpot. It does not include profile passwords or encryption keys. The JSON backup is **not encrypted**, even though the normal browser profile database is.

The browser File System Access API can link a user-selected JSON file on supported desktop browsers. The app writes sequentially through a promise queue so rapid games events do not save out of order. A browser permission may have to be granted again. If linking is unsupported, the player can still download and import backups.

Import is validated before it changes live state and asks before replacing the active progress. This is important because a valid backup can still be the wrong backup for the currently open profile.

See [Local saves and profiles](local-saves.md) for the complete user-facing details and limitations.

## 11. Simulate horse and car races locally

The race engine is in `src/js/race-engine.js` and does not call a sports feed or server. It uses the device's local calendar:

- Race start times are each hour from 7 AM through 9 PM.
- Horse events begin at 7 AM and occupy every other hourly slot.
- Car events begin at 8 AM and occupy the alternating slots.
- Previews and betting open 45 minutes before a start; betting closes five minutes before.
- No new events are scheduled overnight.
- Horse fields have six entrants and car fields eight.

A **seed** is a repeatable starting number used by a pseudo-random generator. The event time, circuit, and random-stream value form the seed. Rebuilding the same event therefore returns the same entrants, duration, odds, and winner. The generator is chosen for reproducibility, not for security or real-money fairness.

Each runner has stable identity, plus saved starts and wins. Experience/form changes ability and advertised chances in later generated events. The winning runner's finish factor is adjusted so the on-screen animation agrees with the seeded winner.

When a player places a bet, the profile saves the event ID, circuit type, runner ID, winner ID, stake, odds, and duration. The stake is deducted then. On a later browser visit, the engine reconstructs that event and settles the ticket from its saved result. It also processes completed events missed while the browser was closed so runner experience can advance. One open ticket is allowed across both circuits.

The project keeps a legacy race generator for old ticket formats. It is not the current race schedule; it exists so an older saved bet can be settled using its original deterministic result. Removing it without migrating old tickets could change or invalidate saved outcomes.

## 12. Write automated tests

Node includes a basic test runner. A test file imports the module or reads it into a lightweight VM environment, calls a behavior, and makes assertions about the expected result.

Run all tests from the repository root:

```sh
node --test tests/*.test.js
```

The suites cover:

- `tests/models.test.js`: the default $100 profile and preservation of a valid saved balance.
- `tests/profiles.test.js`: defaulting and normalization of horse/car experience, tickets, and invalid runner records.
- `tests/race-engine.test.js`: deterministic fields, odds, schedule timing, overnight closure, UI betting guards, experience changes, catch-up processing, and old tickets.
- `tests/slot-bet-rules.test.js`: penny/quarter increments, affordability, maximums, and two-decimal formatting.
- `tests/slot-room.test.js`: room markup, the original slot-card placement, the dynamic catalog target, and valid local HTML asset paths.

A VM (virtual machine) test context is a small isolated JavaScript environment. These tests use it to load browser-oriented classes without creating a real browser or touching someone's actual profile. A DOM mock is not a substitute for manual browser testing, but it allows logic to be checked quickly and repeatedly.

When changing rules, add a test for the new rule and at least one boundary. For example, when changing a 25-cent step, test both the maximum legal amount and the next amount beyond it.

## 13. Run a manual browser check

Start a local server from the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

On Windows, try `py -m http.server 8000 --bind 127.0.0.1`. Open <http://localhost:8000/>. Keep the server terminal open while using the site; stop it with `Ctrl+C` when finished.

Verify at least these paths:

1. **First profile:** create a profile, close the tab, reopen the local URL, and unlock it.
2. **Balance preservation:** play a harmless virtual round or use an existing local profile, reload, and confirm the balance remains.
3. **Slot Room:** confirm all five slot cards are together and the non-slot cards remain outside that section.
4. **Machine navigation:** open each slot table and return to the lobby. Confirm titles, theme colors, and stake labels match.
5. **Wager boundaries:** increase/decrease a penny and quarter wager; confirm limits and increments are correct.
6. **Bonus features:** test free spins/sticky wilds if a bonus is triggered; confirm the wager is not charged again for each free spin.
7. **Other games:** test a Coin Toss result and a short Blackjack hand; confirm the balance updates once per round.
8. **Daily wheel:** check the cooldown label after a completed spin.
9. **Race screen:** inspect the next event, its countdown, and the betting cutoff. When racing is closed, confirm upcoming runner details are hidden and controls are disabled.
10. **Save backup:** export a backup and inspect that it is JSON. Remember it is not encrypted. Import only a backup you intend to use, because import replaces active game state after confirmation.
11. **Responsive screen:** reduce the browser width and verify room cards, header controls, and game controls fit without horizontal scrolling.
12. **Console/network:** inspect developer tools for JavaScript errors or failed local asset requests. Since this is static and local-only, the app should not require a casino API or remote save service.

Use a throwaway local browser profile if you need to test profile creation and recovery. Browser site data is persistent. Do not clear the user's real browser storage just to test a code change.

## 14. Keep the HTML and static paths deployable

A static host serves the directory as files. Since the page is at the repository root, a reference such as `src/js/app.js` means “the `src/js/app.js` file below this page's directory.” The stylesheet, script tags, and splash image all use relative paths.

When moving a file, update every link that points to it. Search before and after the move:

```sh
rg -n 'src=|href=|LOCAL_SAVES|require\(' index.html README.md docs src tests
```

Do not move `index.html` into `src/` unless you also change the host's document-root configuration. GitHub Pages commonly serves the root `index.html` automatically.

The current project has no bundler, so every JavaScript file requested by `index.html` is downloaded separately. That makes script order visible and simple; the trade-off is that adding many files means adding script tags and keeping their order correct.

## 15. Change and publish carefully

Before committing, check what changed and run tests:

```sh
git status --short --branch
git diff --check
node --test tests/*.test.js
```

Then review the actual diff, especially HTML paths, profile storage, and any code that could reset user progress. A local change does not reach GitHub Pages until it is published through the project's configured branch or deployment workflow. The project owner asked that current changes not be pushed until specifically allowed; keep this work local until that permission changes.

If deployment is later approved, first check which branch/source GitHub Pages is configured to publish. Developing on `dev` does not automatically mean the site is served from `dev`. Do not assume that a push to the development branch deploys the production site.

## 16. Beginner glossary

| Term | Meaning in this project |
|---|---|
| Browser origin | The combination of scheme, host, and port. Local storage on `http://localhost:8000` differs from storage on the hosted site. |
| Catalog | Data that describes available themed machines without containing their spin algorithms. |
| DOM | The browser's in-memory representation of the HTML page; JavaScript queries and updates it. |
| Engine | The code that runs a game round, such as the slot or race engine. |
| Event listener | A function the browser calls when something happens, commonly a button click. |
| Integer cents | Dollars represented as an integer number of cents, such as `$1.25` becoming `125`, for predictable arithmetic. |
| Local storage | Persistent origin-scoped string key/value storage provided by the browser. |
| Normalization | Checking input fields and converting them into safe, expected formats before the app uses them. |
| Seeded pseudo-random generator | A repeatable random-like sequence derived from a known starting value. |
| Template | Inert HTML that JavaScript clones to create a reusable machine view. |
| Virtual machine (VM) test | A separate JavaScript context used by tests to load code without a full browser. |
| Web Crypto | The browser API used for secure password derivation and AES-GCM encryption. |

## 17. Final design principles

When extending the project, follow these rules:

1. Keep the project static unless a real requirement justifies adding a backend.
2. Keep every slot card in `.slot-room-grid` and every game key unique.
3. Reuse templates and engines when only the theme or stake configuration changes.
4. Calculate wagers in integer cents and normalize imported values.
5. Preserve valid existing saves; never replace them with defaults during a code reorganization.
6. Keep the profile password and encryption key out of backups and logs.
7. Explain compatibility-sensitive code, especially save migrations and legacy race tickets.
8. Test both code rules and the browser experience.
9. Make no claim that locally simulated races or jackpot values are live or shared online.
10. Confirm the deployment source branch before publishing static files.
