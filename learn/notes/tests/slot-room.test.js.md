# tests/slot-room.test.js

[Exact copy](../../original/tests/slot-room.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Guard the lobby grouping contract and static asset paths without adding a DOM
```

This comment defines the test boundary and explains why the isolated fixture is safe: Guard the lobby grouping contract and static asset paths without adding a DOM

### Line 2

```text
// dependency to this vanilla project.
```

This comment defines the test boundary and explains why the isolated fixture is safe: dependency to this vanilla project.

### Line 3

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const fs = require('node:fs');
```

This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const path = require('node:path');
```

This imports node:path so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 7

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 8

```text
const projectRoot = path.resolve(__dirname, '..');
```

Calls `path.resolve` with `__dirname` (  dirname); ".."; stores the result in `projectRoot`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
```

Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `projectRoot` (project root); "utf8"; stores the result in `html`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
const catalog = fs.readFileSync(path.join(projectRoot, 'src/js/slot-templates.js'), 'utf8');
```

Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `projectRoot` (project root); "utf8"; stores the result in `catalog`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 11

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 12

```text
function elementByClass(source, tag, className, from = 0) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 13

```text
  const opening = new RegExp(`<${tag}\\b[^>]*\\bclass=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i');
```

Constructs a new instance of `RegExp` with a text template that combines fixed text with computed values `tag` (tag), `className` (class name); "i"; stores the result in `opening`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 14

```text
  const match = opening.exec(source.slice(from));
```

Calls `opening.exec` with copies a portion of `source` (source), from `from` (from) to the end; stores the result in `match`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 15

```text
  assert.ok(match, `Missing ${tag}.${className}`);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 16

```text
  const start = from + match.index;
```

Adds `from` (from) and `match.index` (the index property of match) (or joins them if a value is text); stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 17

```text
  const tokenPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
```

Constructs a new instance of `RegExp` with a text template that combines fixed text with computed values `tag` (tag); "gi"; stores the result in `tokenPattern`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 18

```text
  tokenPattern.lastIndex = start + match[0].length;
```

Sets `tokenPattern.lastIndex` (the last index property of tokenPattern) to adds `start` (start) and `match[0].length` (the length property of match[0]) (or joins them if a value is text).

### Line 19

```text
  let depth = 1;
```

1; stores the result in `depth`. let allows the binding to be reassigned.

### Line 20

```text
  let token;
```

No value; stores the result in `token`. let allows the binding to be reassigned.

### Line 21

```text
  while ((token = tokenPattern.exec(source))) {
```

Repeats its body while sets `token` (token) to calls `tokenPattern.exec` with `source` (source) remains truthy.

### Line 22

```text
    if (token[0][1] === '/') depth -= 1;
```

Checks whether checks that the entry at index/key 1 in the entry at index/key 0 in `token` (token) and "/" have the same value and type; runs the following statement/block only when truthy, otherwise runs the else branch.

### Line 23

```text
    else if (!/\/\s*>$/.test(token[0])) depth += 1;
```

Checks whether negates the truthiness of checks whether the regular expression the regular expression `/\/\s*>$/` used to match text matches the entry at index/key 0 in `token` (token); runs the following statement/block only when truthy.

### Line 24

```text
    if (depth === 0) return source.slice(start, tokenPattern.lastIndex);
```

Returns copies a portion of `source` (source), from `start` (start) up to but excluding `tokenPattern.lastIndex` (the last index property of tokenPattern) to the caller and exits this function.

### Line 25

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 26

```text
  assert.fail(`Unclosed ${tag}.${className}`);
```

This assertion verifies the scenario’s observable contract instead of depending on an internal implementation detail.

### Line 27

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 28

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 29

```text
function lobbyMarkup() {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 30

```text
  const start = html.indexOf('<section id="view-lobby"');
```

Calls `html.indexOf` with "<section id=\"view-lobby\""; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 31

```text
  assert.notEqual(start, -1, 'Missing lobby view');
```

This assertion verifies the scenario’s observable contract instead of depending on an internal implementation detail.

### Line 32

```text
  return elementByClass(html.slice(start), 'section', 'view-screen');
```

Returns calls `elementByClass` with copies a portion of `html` (html), from `start` (start) to the end; "section"; "view-screen" to the caller and exits this function.

### Line 33

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 34

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 35

```text
function dataGames(source) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 36

```text
  return [...source.matchAll(/data-game="([^"]+)"/g)].map(match => match[1]);
```

Returns transforms each item of an array containing the expanded entries/properties from calls `source.matchAll` with the regular expression `/data-game="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array to the caller and exits this function.

### Line 37

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 38

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 39

```text
test('the original classic and five-reel slot cards live in the dedicated Slot Room', () => {
```

This test names the behavior under protection: the original classic and five-reel slot cards live in the dedicated Slot Room.

### Line 40

```text
  const slotRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-slot-room');
```

Calls `elementByClass` with calls `lobbyMarkup` with no arguments; "section"; "lobby-slot-room"; stores the result in `slotRoom`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  assert.match(slotRoom, /data-game="classic-slots"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 42

```text
  assert.match(slotRoom, /data-game="5reel-slots"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 43

```text
  assert.match(slotRoom, /class="slot-room-grid"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 44

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 45

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 46

```text
test('the general lobby grid contains only non-slot, non-coin games', () => {
```

This test names the behavior under protection: the general lobby grid contains only non-slot, non-coin games.

### Line 47

```text
  const lobby = lobbyMarkup();
```

Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 48

```text
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
```

Calls `elementByClass` with `lobby` (lobby); "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 49

```text
  const coinRoomStart = lobby.indexOf(coinRoom);
```

Calls `lobby.indexOf` with `coinRoom` (coin room); stores the result in `coinRoomStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
  const generalGrid = elementByClass(lobby, 'div', 'game-grid', coinRoomStart + coinRoom.length);
```

Calls `elementByClass` with `lobby` (lobby); "div"; "game-grid"; adds `coinRoomStart` (coin room start) and `coinRoom.length` (the length property of coinRoom) (or joins them if a value is text); stores the result in `generalGrid`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 51

```text
  assert.deepEqual(dataGames(generalGrid), ['blackjack', 'horse-racing']);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(dataGames(generalGrid), ['blackjack', 'horse-racing'])`; it requires that observable game or persistence rule to match exactly.

### Line 52

```text
  assert.doesNotMatch(generalGrid, /data-game="(?:coin-toss|three-coin-toss|classic-slots|5reel-slots|penny-slots|quarter-slots|quarter-gem-quest)"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 53

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 54

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 55

```text
test('the two coin game links appear only inside the dedicated Coin Flip Room', () => {
```

This test names the behavior under protection: the two coin game links appear only inside the dedicated Coin Flip Room.

### Line 56

```text
  const lobby = lobbyMarkup();
```

Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 57

```text
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
```

Calls `elementByClass` with `lobby` (lobby); "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 58

```text
  assert.deepEqual(dataGames(coinRoom), ['coin-toss', 'three-coin-toss']);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(dataGames(coinRoom), ['coin-toss', 'three-coin-toss'])`; it requires that observable game or persistence rule to match exactly.

### Line 59

```text
  assert.equal((html.match(/data-game="(?:coin-toss|three-coin-toss)"/g) || []).length, 2);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((html.match(/data-game="(?:coin-toss|three-coin-toss)"/g) || []).length, 2)`; it requires that observable game or persistence rule to match exactly.

### Line 60

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 61

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 62

```text
test('lobby room heading IDs are unique and referenced by their room sections', () => {
```

This test names the behavior under protection: lobby room heading IDs are unique and referenced by their room sections.

### Line 63

```text
  const lobby = lobbyMarkup();
```

Calls `lobbyMarkup` with no arguments; stores the result in `lobby`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 64

```text
  const ids = [...lobby.matchAll(/<h3\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
```

Transforms each item of an array containing the expanded entries/properties from calls `lobby.matchAll` with the regular expression `/<h3\b[^>]*\bid="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 65

```text
  assert.equal(new Set(ids).size, ids.length, 'Lobby heading IDs must be unique');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(ids).size, ids.length, 'Lobby heading IDs must be unique')`; it requires that observable game or persistence rule to match exactly.

### Line 66

```text
  for (const labelledBy of [...lobby.matchAll(/<section\b[^>]*\baria-labelledby="([^"]+)"/g)].map(match => match[1])) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 67

```text
    assert.ok(ids.includes(labelledBy), `aria-labelledby must target a lobby heading: ${labelledBy}`);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 68

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 69

```text
  assert.match(lobby, /<section class="lobby-coin-room"\s[^>]*aria-labelledby="coin-room-title"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 70

```text
  assert.match(lobby, /<h3\b[^>]*id="coin-room-title"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 71

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 72

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 73

```text
test('nested structural tags in the lobby are balanced and properly nested', () => {
```

This test names the behavior under protection: nested structural tags in the lobby are balanced and properly nested.

### Line 74

```text
  const stack = [];
```

An array containing ; stores the result in `stack`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 75

```text
  const structural = /<!--[^]*?-->|<\/?(section|details|summary|div|article)\b[^>]*>/gi;
```

The regular expression `/<!--[^]*?-->|<\/?(section|details|summary|div|article)\b[^>]*>/gi` used to match text; stores the result in `structural`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 76

```text
  for (const match of lobbyMarkup().matchAll(structural)) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 77

```text
    if (match[0].startsWith('<!--')) continue;
```

Checks whether calls `match[0].startsWith` with "<!--"; runs the following statement/block only when truthy.

### Line 78

```text
    const [, tag] = match;
```

`match` (match); stores the result in `[, tag]`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 79

```text
    if (match[0][1] === '/') assert.equal(stack.pop(), tag.toLowerCase(), `Mismatched closing tag: ${match[0]}`);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(stack.pop(), tag.toLowerCase(), `Mismatched closing tag: ${match[0]}`)`; it requires that observable game or persistence rule to match exactly.

### Line 80

```text
    else if (!/\/\s*>$/.test(match[0])) stack.push(tag.toLowerCase());
```

Checks whether negates the truthiness of checks whether the regular expression the regular expression `/\/\s*>$/` used to match text matches the entry at index/key 0 in `match` (match); runs the following statement/block only when truthy.

### Line 81

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 82

```text
  assert.deepEqual(stack, [], 'Lobby structural tags must be balanced');
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(stack, [], 'Lobby structural tags must be balanced')`; it requires that virtual-money and wager rule to match exactly.

### Line 83

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 84

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 85

```text
test('coin cards use card-icon, including the three-coin marker', () => {
```

This test names the behavior under protection: coin cards use card-icon, including the three-coin marker.

### Line 86

```text
  const coinRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-coin-room');
```

Calls `elementByClass` with calls `lobbyMarkup` with no arguments; "section"; "lobby-coin-room"; stores the result in `coinRoom`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 87

```text
  assert.doesNotMatch(coinRoom, /class="game-icon"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 88

```text
  assert.equal((coinRoom.match(/class="card-icon"/g) || []).length, 2);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((coinRoom.match(/class="card-icon"/g) || []).length, 2)`; it requires that player-facing UI guardrail to match exactly.

### Line 89

```text
  assert.match(coinRoom, /<div class="card-icon"[^>]*>3×<\/div>/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 90

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 91

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 92

```text
test('catalog-driven themed machines render into the same Slot Room grid', () => {
```

This test names the behavior under protection: catalog-driven themed machines render into the same Slot Room grid.

### Line 93

```text
  const gameList = catalog.match(/const games = \[([\s\S]*?)\n  \];/);
```

Calls `catalog.match` with the regular expression `/const games = \[([\s\S]*?)\n  \];/` used to match text; stores the result in `gameList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 94

```text
  assert.ok(gameList, 'The themed machine catalog should be present');
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 95

```text
  const ids = [...gameList[1].matchAll(/id: '([^']+)'/g)].map(match => match[1]);
```

Transforms each item of an array containing the expanded entries/properties from calls `gameList[1].matchAll` with the regular expression `/id: '([^']+)'/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 96

```text
  assert.deepEqual(ids, ['penny-slots', 'quarter-slots', 'quarter-gem-quest']);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(ids, ['penny-slots', 'quarter-slots', 'quarter-gem-quest'])`; it requires that observable game or persistence rule to match exactly.

### Line 97

```text
  assert.match(catalog, /document\.querySelector\('\.slot-room-grid'\)/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 98

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 99

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 100

```text
test('every local script, stylesheet, and image referenced by the root page exists', () => {
```

This test names the behavior under protection: every local script, stylesheet, and image referenced by the root page exists.

### Line 101

```text
  const references = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)]
```

Keeps only items of transforms each item of an array containing the expanded entries/properties from calls `html.matchAll` with the regular expression `/\b(?:src|href)="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 0 in splits `match[1]` into an array using separator "?" and returns a new array for which a callback taking reference that negates the truthiness of checks whether the regular expression the regular expression `/^(?:[a-z]+:|#|\/\/)/i` used to match text matches `reference` (reference) returns truthy; stores the result in `references`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 102

```text
    .map(match => match[1].split('?')[0])
```

Splits the entry at index/key 1 in `match` (match) into an array using separator "?".

### Line 103

```text
    .filter(reference => !/^(?:[a-z]+:|#|\/\/)/i.test(reference));
```

Checks whether the regular expression the regular expression `/^(?:[a-z]+:|#|\/\/)/i` used to match text matches `reference` (reference).

### Line 104

```text
  assert.ok(references.length > 0, 'The entry point should reference local assets');
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 105

```text
  for (const reference of references) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 106

```text
    assert.ok(fs.existsSync(path.join(projectRoot, reference)), `Missing local page asset: ${reference}`);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 107

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 108

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
