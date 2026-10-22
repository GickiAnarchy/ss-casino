# Architectural walkthrough (current source)

S&S Casino Hub is a static browser app: `index.html` is the entry document, CSS supplies presentation, and classic scripts load into one browser global environment. There is no build step or server API in the current README. `app.js` is the composition root; it discovers DOM controls and coordinates independent managers.

## Request-to-screen path

1. The browser parses `index.html`, including the lobby markup and script/style references.
2. CSS establishes casino themes, cabinet layout, controls, responsive behavior, and animation classes.
3. The JavaScript files define models, rules, persistence, game engines, and managers. Their order matters because later code can use earlier globals.
4. The application bootstrap in `app.js` reads current profile/save data, creates the game and UI managers, and attaches event listeners.
5. A click changes in-memory state. Rules/engines calculate the result; UI rendering updates DOM nodes.
6. Persistence modules serialize approved state. Profiles protect local profile data with Web Crypto where the browser supports it; local saves also support JSON backup/import and linked-file workflows.
7. Tests exercise pure rules, models, persistence, profiles, slots, racing, and achievements without requiring a browser page.

## Responsibility boundaries

- `models.js` validates player-shaped data; it should not need to know about button markup.
- `game-rules.js` and `slot-bet-rules.js` express constraints and calculations that can be tested independently.
- `slot-outcomes.js`, `slot-templates.js`, and `race-engine.js` produce game-specific data/results.
- `local-save.js` and `profiles.js` own serialization, migration, encryption, recovery, and conflict checks.
- `accomplishments.js` consumes completed game/race events and persists cosmetic progress.
- `app.js` is intentionally broad because it is the integration layer: wiring is its job, not the place to hide rule definitions.

## Read alongside source

Use the exact mirrored file for truth. In any explanation, line references point to that mirror, not to a regenerated or reformatted version. Historical folders outside this repository were not copied or treated as authoritative.
