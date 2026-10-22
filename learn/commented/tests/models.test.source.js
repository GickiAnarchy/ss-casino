// Original L1: This comment defines the test boundary and explains why the isolated fixture is safe: These focused tests protect the model's safe defaults and, especially, old saved balances during code reorganization.
// These focused tests protect the model's safe defaults and, especially, old saved balances during code reorganization.
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L4: This imports node:path so the test exercises the real game/persistence API rather than a duplicate.
const path = require('node:path');
// Original L5: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L6: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L7: Blank line separates test setup from the next scenario for readability.

// Original L8: An object with fields window: an object with fields ; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
const context = { window: {} };
// Original L9: Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `__dirname` (  dirname); "utf8"; stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.
const source = fs.readFileSync(path.join(__dirname, '../src/js/models.js'), 'utf8');
// Original L10: Calls `vm.runInNewContext` with a text template that combines fixed text with computed values `source` (source); `context` (context); stores the result in `Player`. const prevents reassignment of this binding, not mutation inside its object/array.
const Player = vm.runInNewContext(`${source}\nPlayer`, context);
// Original L11: Blank line separates test setup from the next scenario for readability.

// Original L12: This test names the behavior under protection: a new Player starts at $100.
test('a new Player starts at $100', () => {
// Original L13: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Player().balance, 100)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(new Player().balance, 100);
// Original L14: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L15: Blank line separates test setup from the next scenario for readability.

// Original L16: This test names the behavior under protection: loading an existing profile keeps its saved bankroll.
test('loading an existing profile keeps its saved bankroll', () => {
// Original L17: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(Player.fromProfile({ balance: 1000 }).balance, 1000)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(Player.fromProfile({ balance: 1000 }).balance, 1000);
// Original L18: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L19: This test names the behavior under protection: low-balance reload never shrinks the permanent wager limit.
test('low-balance reload never shrinks the permanent wager limit', () => {
// Original L20: Constructs a new instance of `Player` with an object with fields balance: 7; maxBet: 1600; stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.
  const player = new Player({balance:7,maxBet:1600});player.loadProfile(player.toProfile());
// Original L21: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.maxBet,7)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.toProfile().maxBet,1600)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(player.maxBet,7);assert.equal(player.toProfile().maxBet,1600);
// Original L22: This closes the test/helper block containing the setup and its behavior checks.
});
