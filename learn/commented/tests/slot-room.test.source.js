// Original L1: This comment defines the test boundary and explains why the isolated fixture is safe: Guard the lobby grouping contract and static asset paths without adding a DOM
// Guard the lobby grouping contract and static asset paths without adding a DOM
// Original L2: This comment defines the test boundary and explains why the isolated fixture is safe: dependency to this vanilla project.
// dependency to this vanilla project.
// Original L3: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L4: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L5: This imports node:path so the test exercises the real game/persistence API rather than a duplicate.
const path = require('node:path');
// Original L6: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L7: Blank line separates test setup from the next scenario for readability.

// Original L8: Calls `path.resolve` with `__dirname` (  dirname); ".."; stores the result in `projectRoot`. const prevents reassignment of this binding, not mutation inside its object/array.
const projectRoot = path.resolve(__dirname, '..');
// Original L9: Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `projectRoot` (project root); "utf8"; stores the result in `html`. const prevents reassignment of this binding, not mutation inside its object/array.
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
// Original L10: Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `projectRoot` (project root); "utf8"; stores the result in `catalog`. const prevents reassignment of this binding, not mutation inside its object/array.
const catalog = fs.readFileSync(path.join(projectRoot, 'src/js/slot-templates.js'), 'utf8');
// Original L11: Blank line separates test setup from the next scenario for readability.

// Original L12: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function elementByClass(source, tag, className, from = 0) {
// Original L13: Constructs a new instance of `RegExp` with a text template that combines fixed text with computed values `tag` (tag), `className` (class name); "i"; stores the result in `opening`. const prevents reassignment of this binding, not mutation inside its object/array.
  const opening = new RegExp(`<${tag}\\b[^>]*\\bclass=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i');
// Original L14: Calls `opening.exec` with copies a portion of `source` (source), from `from` (from) to the end; stores the result in `match`. const prevents reassignment of this binding, not mutation inside its object/array.
  const match = opening.exec(source.slice(from));
// Original L15: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(match, `Missing ${tag}.${className}`);
// Original L16: Adds `from` (from) and `match.index` (the index property of match) (or joins them if a value is text); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = from + match.index;
// Original L17: Constructs a new instance of `RegExp` with a text template that combines fixed text with computed values `tag` (tag); "gi"; stores the result in `tokenPattern`. const prevents reassignment of this binding, not mutation inside its object/array.
  const tokenPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
// Original L18: Sets `tokenPattern.lastIndex` (the last index property of tokenPattern) to adds `start` (start) and `match[0].length` (the length property of match[0]) (or joins them if a value is text).
  tokenPattern.lastIndex = start + match[0].length;
// Original L19: 1; stores the result in `depth`. let allows the binding to be reassigned.
  let depth = 1;
// Original L20: No value; stores the result in `token`. let allows the binding to be reassigned.
  let token;
// Original L21: Repeats its body while sets `token` (token) to calls `tokenPattern.exec` with `source` (source) remains truthy.
  while ((token = tokenPattern.exec(source))) {
// Original L22: Checks whether checks that the entry at index/key 1 in the entry at index/key 0 in `token` (token) and "/" have the same value and type; runs the following statement/block only when truthy, otherwise runs the else branch.
    if (token[0][1] === '/') depth -= 1;
// Original L23: Checks whether negates the truthiness of checks whether the regular expression the regular expression `/\/\s*>$/` used to match text matches the entry at index/key 0 in `token` (token); runs the following statement/block only when truthy.
    else if (!/\/\s*>$/.test(token[0])) depth += 1;
// Original L24: Returns copies a portion of `source` (source), from `start` (start) up to but excluding `tokenPattern.lastIndex` (the last index property of tokenPattern) to the caller and exits this function.
    if (depth === 0) return source.slice(start, tokenPattern.lastIndex);
// Original L25: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L26: This assertion verifies the scenario’s observable contract instead of depending on an internal implementation detail.
  assert.fail(`Unclosed ${tag}.${className}`);
// Original L27: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L28: Blank line separates test setup from the next scenario for readability.

// Original L29: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function lobbyMarkup() {
// Original L30: Calls `html.indexOf` with "<section id=\"view-lobby\""; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = html.indexOf('<section id="view-lobby"');
// Original L31: This assertion verifies the scenario’s observable contract instead of depending on an internal implementation detail.
  assert.notEqual(start, -1, 'Missing lobby view');
// Original L32: Returns calls `elementByClass` with copies a portion of `html` (html), from `start` (start) to the end; "section"; "view-screen" to the caller and exits this function.
  return elementByClass(html.slice(start), 'section', 'view-screen');
// Original L33: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L34: Blank line separates test setup from the next scenario for readability.

// Original L35: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function dataGames(source) {
// Original L36: Returns transforms each item of an array containing the expanded entries/properties from calls `source.matchAll` with the regular expression `/data-game="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array to the caller and exits this function.
  return [...source.matchAll(/data-game="([^"]+)"/g)].map(match => match[1]);
// Original L37: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L38: Blank line separates test setup from the next scenario for readability.

// Original L39: This test names the behavior under protection: the original classic and five-reel slot cards live in the dedicated Slot Room.
test('the original classic and five-reel slot cards live in the dedicated Slot Room', () => {
// Original L40: Calls `elementByClass` with calls `lobbyMarkup` with no arguments; "section"; "lobby-slot-room"; stores the result in `slotRoom`. const prevents reassignment of this binding, not mutation inside its object/array.
  const slotRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-slot-room');
// Original L41: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(slotRoom, /data-game="classic-slots"/);
// Original L42: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(slotRoom, /data-game="5reel-slots"/);
// Original L43: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(slotRoom, /class="slot-room-grid"/);
// Original L44: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L45: Blank line separates test setup from the next scenario for readability.

// Original L46: This test names the behavior under protection: the general lobby grid contains only non-slot, non-coin games.
test('the general lobby grid contains only non-slot, non-coin games', () => {
// Original L47: Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.
  const lobby = lobbyMarkup();
// Original L48: Calls `elementByClass` with `lobby` (lobby); "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
// Original L49: Calls `lobby.indexOf` with `coinRoom` (coin room); stores the result in `coinRoomStart`. const prevents reassignment of this binding, not mutation inside its object/array.
  const coinRoomStart = lobby.indexOf(coinRoom);
// Original L50: Calls `elementByClass` with `lobby` (lobby); "div"; "game-grid"; adds `coinRoomStart` (coin room start) and `coinRoom.length` (the length property of coinRoom) (or joins them if a value is text); stores the result in `generalGrid`. const prevents reassignment of this binding, not mutation inside its object/array.
  const generalGrid = elementByClass(lobby, 'div', 'game-grid', coinRoomStart + coinRoom.length);
// Original L51: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(dataGames(generalGrid), ['blackjack', 'horse-racing'])`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(dataGames(generalGrid), ['blackjack', 'horse-racing']);
// Original L52: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.doesNotMatch(generalGrid, /data-game="(?:coin-toss|three-coin-toss|classic-slots|5reel-slots|penny-slots|quarter-slots|quarter-gem-quest)"/);
// Original L53: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L54: Blank line separates test setup from the next scenario for readability.

// Original L55: This test names the behavior under protection: the two coin game links appear only inside the dedicated Coin Flip Room.
test('the two coin game links appear only inside the dedicated Coin Flip Room', () => {
// Original L56: Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.
  const lobby = lobbyMarkup();
// Original L57: Calls `elementByClass` with `lobby` (lobby); "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
// Original L58: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(dataGames(coinRoom), ['coin-toss', 'three-coin-toss'])`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(dataGames(coinRoom), ['coin-toss', 'three-coin-toss']);
// Original L59: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((html.match(/data-game="(?:coin-toss|three-coin-toss)"/g) || []).length, 2)`; it requires that observable game or persistence rule to match exactly.
  assert.equal((html.match(/data-game="(?:coin-toss|three-coin-toss)"/g) || []).length, 2);
// Original L60: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L61: Blank line separates test setup from the next scenario for readability.

// Original L62: This test names the behavior under protection: lobby room heading IDs are unique and referenced by their room sections.
test('lobby room heading IDs are unique and referenced by their room sections', () => {
// Original L63: Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.
  const lobby = lobbyMarkup();
// Original L64: Transforms each item of an array containing the expanded entries/properties from calls `lobby.matchAll` with the regular expression `/<h3\b[^>]*\bid="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ids = [...lobby.matchAll(/<h3\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
// Original L65: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(ids).size, ids.length, 'Lobby heading IDs must be unique')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(new Set(ids).size, ids.length, 'Lobby heading IDs must be unique');
// Original L66: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const labelledBy of [...lobby.matchAll(/<section\b[^>]*\baria-labelledby="([^"]+)"/g)].map(match => match[1])) {
// Original L67: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
    assert.ok(ids.includes(labelledBy), `aria-labelledby must target a lobby heading: ${labelledBy}`);
// Original L68: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L69: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(lobby, /<section class="lobby-coin-room"\s[^>]*aria-labelledby="coin-room-title"/);
// Original L70: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(lobby, /<h3\b[^>]*id="coin-room-title"/);
// Original L71: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L72: Blank line separates test setup from the next scenario for readability.

// Original L73: This test names the behavior under protection: nested structural tags in the lobby are balanced and properly nested.
test('nested structural tags in the lobby are balanced and properly nested', () => {
// Original L74: An array containing ; stores the result in `stack`. const prevents reassignment of this binding, not mutation inside its object/array.
  const stack = [];
// Original L75: The regular expression `/<!--[^]*?-->|<\/?(section|details|summary|div|article)\b[^>]*>/gi` used to match text; stores the result in `structural`. const prevents reassignment of this binding, not mutation inside its object/array.
  const structural = /<!--[^]*?-->|<\/?(section|details|summary|div|article)\b[^>]*>/gi;
// Original L76: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const match of lobbyMarkup().matchAll(structural)) {
// Original L77: Checks whether calls `match[0].startsWith` with "<!--"; runs the following statement/block only when truthy.
    if (match[0].startsWith('<!--')) continue;
// Original L78: `match` (match); stores the result in `[, tag]`. const prevents reassignment of this binding, not mutation inside its object/array.
    const [, tag] = match;
// Original L79: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(stack.pop(), tag.toLowerCase(), `Mismatched closing tag: ${match[0]}`)`; it requires that observable game or persistence rule to match exactly.
    if (match[0][1] === '/') assert.equal(stack.pop(), tag.toLowerCase(), `Mismatched closing tag: ${match[0]}`);
// Original L80: Checks whether negates the truthiness of checks whether the regular expression the regular expression `/\/\s*>$/` used to match text matches the entry at index/key 0 in `match` (match); runs the following statement/block only when truthy.
    else if (!/\/\s*>$/.test(match[0])) stack.push(tag.toLowerCase());
// Original L81: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L82: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(stack, [], 'Lobby structural tags must be balanced')`; it requires that virtual-money and wager rule to match exactly.
  assert.deepEqual(stack, [], 'Lobby structural tags must be balanced');
// Original L83: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L84: Blank line separates test setup from the next scenario for readability.

// Original L85: This test names the behavior under protection: coin cards use card-icon, including the three-coin marker.
test('coin cards use card-icon, including the three-coin marker', () => {
// Original L86: Calls `elementByClass` with calls `lobbyMarkup` with no arguments; "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.
  const coinRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-coin-room');
// Original L87: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.doesNotMatch(coinRoom, /class="game-icon"/);
// Original L88: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((coinRoom.match(/class="card-icon"/g) || []).length, 2)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal((coinRoom.match(/class="card-icon"/g) || []).length, 2);
// Original L89: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(coinRoom, /<div class="card-icon"[^>]*>3×<\/div>/);
// Original L90: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L91: Blank line separates test setup from the next scenario for readability.

// Original L92: This test names the behavior under protection: catalog-driven themed machines render into the same Slot Room grid.
test('catalog-driven themed machines render into the same Slot Room grid', () => {
// Original L93: Calls `catalog.match` with the regular expression `/const games = \[([\s\S]*?)\n  \];/` used to match text; stores the result in `gameList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const gameList = catalog.match(/const games = \[([\s\S]*?)\n  \];/);
// Original L94: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(gameList, 'The themed machine catalog should be present');
// Original L95: Transforms each item of an array containing the expanded entries/properties from calls `gameList[1].matchAll` with the regular expression `/id: '([^']+)'/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ids = [...gameList[1].matchAll(/id: '([^']+)'/g)].map(match => match[1]);
// Original L96: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(ids, ['penny-slots', 'quarter-slots', 'quarter-gem-quest'])`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(ids, ['penny-slots', 'quarter-slots', 'quarter-gem-quest']);
// Original L97: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(catalog, /document\.querySelector\('\.slot-room-grid'\)/);
// Original L98: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L99: Blank line separates test setup from the next scenario for readability.

// Original L100: This test names the behavior under protection: every local script, stylesheet, and image referenced by the root page exists.
test('every local script, stylesheet, and image referenced by the root page exists', () => {
// Original L101: Keeps only items of transforms each item of an array containing the expanded entries/properties from calls `html.matchAll` with the regular expression `/\b(?:src|href)="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 0 in splits `match[1]` into an array using separator "?" and returns a new array for which a callback taking reference that negates the truthiness of checks whether the regular expression the regular expression `/^(?:[a-z]+:|#|\/\/)/i` used to match text matches `reference` (reference) returns truthy; stores the result in `references`. const prevents reassignment of this binding, not mutation inside its object/array.
  const references = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)]
// Original L102: Splits the entry at index/key 1 in `match` (match) into an array using separator "?".
    .map(match => match[1].split('?')[0])
// Original L103: Checks whether the regular expression the regular expression `/^(?:[a-z]+:|#|\/\/)/i` used to match text matches `reference` (reference).
    .filter(reference => !/^(?:[a-z]+:|#|\/\/)/i.test(reference));
// Original L104: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(references.length > 0, 'The entry point should reference local assets');
// Original L105: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const reference of references) {
// Original L106: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
    assert.ok(fs.existsSync(path.join(projectRoot, reference)), `Missing local page asset: ${reference}`);
// Original L107: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L108: This closes the test/helper block containing the setup and its behavior checks.
});
