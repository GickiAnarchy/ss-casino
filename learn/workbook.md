# S&S Casino: A Beginner’s Code Workbook

This workbook is a guided tour of the **S&S Casino Hub** in `/workspace/ss-casino`. It is a browser game with virtual chips, not a gambling or payment service. Read the source alongside the lessons: the commented learning copy of each file is linked as `commented/{sourcepath}`, and the plain-language note is linked as `notes/{sourcepath}.md`.

> Safety rule: use a throwaway profile or a backup while learning. These exercises are read-only or use fresh in-memory values. **Do not overwrite an existing save.**

## 1. How the page becomes an application

Start at [`index.html`](commented/index.html) and its [notes](notes/index.html.md). The HTML supplies the controls and views: buttons have IDs such as `btn-three-coin-flip`, and game cards use `data-game` values for navigation. The stylesheet is loaded first with `<link rel="stylesheet" href="src/css/style.css...">`. CSS is presentation, not game logic. For example, [`src/css/style.css`](commented/src/css/style.css) defines shared color variables in `:root`; the `body[data-theme]` rules swap those variables without rewriting every component.

The JavaScript files use classic browser scripts, not ES modules. Every script has `defer`. That matters: the browser parses the HTML, then runs deferred scripts **in the order written**, after parsing. The order is a dependency plan:

1. `models.js` defines `Player` and profile-shaped data.
2. `local-save.js` manages portable JSON and linked files.
3. `profiles.js` manages encrypted browser profiles.
4. `race-engine.js` defines racing.
5. Slot helpers load next.
6. `game-rules.js` exposes shared betting and coin rules.
7. `accomplishments.js` records history.
8. `app.js` boots the hub and wires the UI.

See [`src/js/models.js`](commented/src/js/models.js), [`src/js/game-rules.js`](commented/src/js/game-rules.js), and [`src/js/app.js`](commented/src/js/app.js). Because these are classic scripts, they communicate through globals such as `window.GameRules`, `window.LocalProfiles`, and `window.RaceGame`. Moving a provider below its consumer can produce an undefined global. `app.js` still waits for `DOMContentLoaded`, creates `new window.LocalProfileManager()`, and awaits `initialize()` before constructing game systems. That prevents the games from starting against an unknown profile.

## 2. Trace one three-coin wager

The most useful way to learn is to follow one round from click to settlement. The three-coin table is created by `new ThreeCoinToss(CasinoHub)`, which extends `CoinTossEngine` in `app.js`. The engine stores `this.bet` and `this.choices`, then attaches listeners to the choice buttons and the flip button.

**Step 1: choose and validate.** Clicking a choice writes `button.dataset.coinChoice` into the matching index of `this.choices`. The bet controls call `window.GameRules.maximum`, `increase`, or `decrease`. `maximum(balance, cap)` converts to cents, respects both the wallet and `player.maxBet`, and returns zero when the minimum $5 bet cannot be met. `legal(bet, balance, cap)` checks the minimum and upper bound. Thus the UI disables Flip unless all three choices exist and the wager is legal.

**Step 2: create outcomes.** `startFlip()` first checks `hub.isSettling`, `this.isFlipping`, complete choices, and `GameRules.legal`. It copies the stake and choices, then makes one outcome per coin with `Math.random() >= 0.5 ? 'HEADS' : 'TAILS'`. This is a local simulation; no server decides the result.

**Step 3: settle the rules.** For three coins, `startFlip()` calls `window.GameRules.threeCoinResult(choices, outcomes, stake)`. In [`game-rules.js`](commented/src/js/game-rules.js) and its [notes](notes/src/js/game-rules.js.md), `correct` counts matching indexes. Zero or one match pays 0; two matches use a 1.5 multiplier; three matches use 3.0. With a $10 stake, the gross returns are `$0`, `$0`, `$15`, or `$30`; `net` is payout minus stake. The helper validates that every entry is HEADS or TAILS and that stake is positive.

**Step 4: change the wallet.** Back in `startFlip()`, `this.hub.modifyBalance(result.payout - stake)` applies the net result. A $10 wager with two matches therefore changes the wallet by `+$5`; a loss changes it by `-$10`. Then `Accomplishments.recordGame(...)` records the game, `hub.updateGlobalUI()` refreshes the balance, and `LocalSave.queueFileSave()` asks the linked-file layer to catch up. The animation and status banner are separate from the accounting: they show outcomes, return, stake, and net, but do not determine them. The one-coin table follows the same path but uses an inline double-or-nothing payout rather than `threeCoinResult`.

## 3. Profiles and persistence: what survives a refresh?

There are two different persistence ideas. The active profile is stored in browser `localStorage` as an encrypted envelope; a backup/export is a portable JSON file. Read [`src/js/profiles.js`](commented/src/js/profiles.js) and its [notes](notes/src/js/profiles.js.md).

At startup, `LocalProfileManager.initialize()` requires `window.crypto.subtle` and a secure context (HTTPS or localhost). It reads the profile database, validates its version and record shape, then shows either first-profile setup or an unlock screen. A password is imported as PBKDF2 material, and `deriveKey` uses a random per-profile salt, SHA-256, and 310,000 iterations to derive a 256-bit AES-GCM key. `encryptSave()` uses a fresh random 96-bit IV and authenticated additional data tied to the profile. The key and password are not written to storage.

A game change calls `saveCurrent(...)`. The manager merges the change into the current save, increments its revision, encrypts the durable snapshot, and queues the write. `flushSave()` waits for the queue. The save includes player balance, level, XP, debt, settings, jackpot, race ticket/result, slot bonuses, and accomplishments. The code normalizes imported or stored data rather than trusting arbitrary JSON.

`local-save.js` is the portability layer. `createSave()` deliberately whitelists game fields and excludes the password, encryption key, and browser credentials. Browser saving is automatic. On supported desktop browsers, `linkFile()` can connect a JSON file and `writeToLinkedFile()` keeps it updated after the encrypted browser save succeeds. `downloadBackup()` creates a JSON Blob. **That export is unencrypted JSON**, even though the normal browser profile is encrypted. Anyone who obtains the backup can read or edit its contents, so treat it like a sensitive file. Importing is guarded by `parseSave()`, size limits, schema checks, normalization, revisions, and a recovery snapshot before replacement. Never experiment by importing over your real profile: make a copy and use a test profile.

## 4. Random race versus real money

The race room is also local and virtual. [`src/js/race-engine.js`](commented/src/js/race-engine.js) and its [notes](notes/src/js/race-engine.js.md) say the clock uses the device’s local time, with scheduled hours from 7 AM through 9 PM. A seeded schedule reconstructs previews and unsettled tickets after refresh. `createRace()` generates the field; a ticket records runner, winner/target information, stake, odds, and duration. Once the race is complete, `settleTicket()` reconstructs the recorded race, calculates `won`, computes `payout = stake * odds` when won, clears the ticket, updates the balance, records a notice, and saves it.

“Seeded” does **not** mean guaranteed, live, fair, or profitable. The race is not connected to a track, sportsbook, payment processor, or real-time feed. The source explicitly describes it as browser-only. Device clock changes, local storage loss, a modified client, or a copied JSON export are not protections you would accept in a real-money system. Never use the virtual odds or results to make a financial claim. This is a useful lesson in state machines and reproducibility, not a betting product.

## 5. Tests: make small claims executable

The repository has Node’s built-in test files, including [`tests/game-rules.test.js`](commented/tests/game-rules.test.source.js) and its [notes](notes/tests/game-rules.test.js.md), plus tests for profiles, save durability, races, slots, models, and accomplishments. There is no `package.json` script in the current root, so run the suite directly from `/workspace/ss-casino`:

```bash
node --test tests/*.test.js
```

The coin test tries all 8 choice patterns against all 8 outcome patterns, checks payouts `[0, 0, 15, 30]`, checks net values, and verifies invalid inputs throw. Other tests assert unique HTML IDs and the presence of `data-game="three-coin-toss"`. Tests are especially valuable here because money-like values are rounded to cents and persistence has failure cases.

## 6. Five safe exercises (with answers)

Do these by reading source or using Node snippets that do not open the browser and do not call `saveCurrent()`.

### Exercise 1 — script order
Why does `app.js` come after `models.js`, `profiles.js`, and `game-rules.js`?

**Answer:** Classic scripts expose globals. `app.js` constructs `LocalProfileManager` and game engines that depend on those APIs. `defer` preserves the written order after HTML parsing.

### Exercise 2 — calculate a coin return
For choices `HEADS, TAILS, HEADS`, outcomes `HEADS, HEADS, HEADS`, and stake `$20`, what are `correct`, `payout`, and `net`?

**Answer:** Two matches, so `correct = 2`, `payout = $30`, and `net = +$10`.

### Exercise 3 — follow a loss
A $10 three-coin wager gets one correct answer. Which helper computes the result, and what wallet change follows?

**Answer:** `GameRules.threeCoinResult()` returns payout `$0` and net `-$10`; `CoinTossEngine.startFlip()` applies that net through `hub.modifyBalance(result.payout - stake)`.

### Exercise 4 — classify storage
Is a downloaded backup encrypted? Is the normal active profile encrypted?

**Answer:** The downloaded `downloadBackup()` JSON is unencrypted. The active profile uses password-derived AES-GCM ciphertext in browser storage; this is local privacy, not an online account.

### Exercise 5 — race or real service?
What makes a race reproducible after refresh, and what does that not prove?

**Answer:** A seeded, browser-local schedule and saved ticket let `settleTicket()` reconstruct the same event. It does not prove a live feed, real-money integrity, fairness, or profitability.

## Next reading

For a longer design explanation, compare the original [game rules](commented/docs/game-rules.md) and [local saves](commented/docs/local-saves.md) with their [game-rules notes](notes/docs/game-rules.md.md) and [local-saves notes](notes/docs/local-saves.md.md). Keep the source, the test expectations, and the safety boundary in view: this project is excellent practice for UI events, deterministic state, validation, and browser cryptography precisely because it does **not** handle real money.
