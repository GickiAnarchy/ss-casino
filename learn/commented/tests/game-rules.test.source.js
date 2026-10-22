// Original L1: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L4: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L5: This imports ../src/js/game-rules.js so the test exercises the real game/persistence API rather than a duplicate.
const rules = require('../src/js/game-rules.js');
// Original L6: Calls `vm.runInNewContext` with adds calls `fs.readFileSync` with calls `require.resolve` with "../src/js/models.js"; "utf8" and "\nPlayer" (or joins them if a value is text); an object with fields window: an object with fields ; stores the result in `Player`. const prevents reassignment of this binding, not mutation inside its object/array.
const Player = vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/models.js'), 'utf8') + '\nPlayer', { window: {} });
// Original L7: Blank line separates test setup from the next scenario for readability.

// Original L8: This test names the behavior under protection: table Max uses the remaining cent balance, never more than the configured cap.
test('table Max uses the remaining cent balance, never more than the configured cap', () => {
// Original L9: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(43.27, 100), 43.27)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(rules.maximum(43.27, 100), 43.27);
// Original L10: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(1000, 100), 100)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(rules.maximum(1000, 100), 100);
// Original L11: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(4.99, 100), 0)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(rules.maximum(4.99, 100), 0);
// Original L12: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(0, 100), 0)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(rules.maximum(0, 100), 0);
// Original L13: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(NaN, 100), 0)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(rules.maximum(NaN, 100), 0);
// Original L14: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(0, 100, 100), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(rules.legal(0, 100, 100), false);
// Original L15: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(100, 43.27, 100), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(rules.legal(100, 43.27, 100), false);
// Original L16: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(43.27, 43.27, 100), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(rules.legal(43.27, 43.27, 100), true);
// Original L17: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.increase(0, 100, 100), 5)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(rules.increase(0, 100, 100), 5);
// Original L18: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.increase(40, 43.27, 100), 43.27)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(rules.increase(40, 43.27, 100), 43.27);
// Original L19: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L20: Blank line separates test setup from the next scenario for readability.

// Original L21: This test names the behavior under protection: every prediction/outcome combination settles three coins with doubling payouts.
test('every prediction/outcome combination settles three coins with doubling payouts', () => {
// Original L22: Calls `Array.from` with an object with fields length: 8; a callback taking _, bits that calls `Array.from` with an object with fields length: 3; a callback taking _, i that checks `bits & (1 << i)`; if true chooses "HEADS", otherwise "TAILS"; stores the result in `patterns`. const prevents reassignment of this binding, not mutation inside its object/array.
  const patterns = Array.from({ length: 8 }, (_, bits) => Array.from({ length: 3 }, (_, i) => bits & (1 << i) ? 'HEADS' : 'TAILS'));
// Original L23: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const choices of patterns) {
// Original L24: 0; stores the result in `total`. let allows the binding to be reassigned.
    let total = 0;
// Original L25: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
    for (const outcomes of patterns) {
// Original L26: Calls `rules.threeCoinResult` with `choices` (choices); `outcomes` (outcomes); 10; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.
      const result = rules.threeCoinResult(choices, outcomes, 10);
// Original L27: `choices.filter((choice, i) => choice === outcomes[i]).length` (the length property of choices.filter((choice, i) => choice === outcomes[i])); stores the result in `correct`. const prevents reassignment of this binding, not mutation inside its object/array.
      const correct = choices.filter((choice, i) => choice === outcomes[i]).length;
// Original L28: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.correct, correct)`; it requires that observable game or persistence rule to match exactly.
      assert.equal(result.correct, correct);
// Original L29: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.payout, [0, 0, 15, 30][correct])`; it requires that virtual-money and wager rule to match exactly.
      assert.equal(result.payout, [0, 0, 15, 30][correct]);
// Original L30: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.net, result.payout - 10)`; it requires that virtual-money and wager rule to match exactly.
      assert.equal(result.net, result.payout - 10);
// Original L31: Adds to `total` (total) using `result.payout` (the payout property of result).
      total += result.payout;
// Original L32: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L33: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(total / patterns.length, 9.375)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(total / patterns.length, 9.375);
// Original L34: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L35: This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.
  assert.throws(() => rules.threeCoinResult(['HEADS', null, 'TAILS'], ['HEADS','TAILS','TAILS'], 10));
// Original L36: This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.
  assert.throws(() => rules.threeCoinResult(['HEADS','HEADS','TAILS'], ['HEADS','TAILS','TAILS'], 0));
// Original L37: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L38: Blank line separates test setup from the next scenario for readability.

// Original L39: This test names the behavior under protection: fifth levels award rewards and low balance cannot shrink permanent wager limit.
test('fifth levels award rewards and low balance cannot shrink permanent wager limit', () => {
// Original L40: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const level of [2, 5, 10, 15]) {
// Original L41: Constructs a new instance of `Player` with an object with fields balance: 7; maxBet: 1100; level: `level` (level); stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.
    const player = new Player({ balance: 7, maxBet: 1100, level });
// Original L42: Calls `rules.levelReward` with `player` (player); stores the result in `reward`. const prevents reassignment of this binding, not mutation inside its object/array.
    const reward = rules.levelReward(player);
// Original L43: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(reward.bonus, level * 50)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(reward.bonus, level * 50);
// Original L44: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(reward.level, level)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(reward.level, level);
// Original L45: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.creditLimit, 2250)`; it requires that virtual-money and wager rule to match exactly.
    assert.equal(player.creditLimit, 2250);
// Original L46: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.toProfile().maxBet, 1600)`; it requires that virtual-money and wager rule to match exactly.
    assert.equal(player.toProfile().maxBet, 1600);
// Original L47: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L48: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L49: Blank line separates test setup from the next scenario for readability.

// Original L50: This test names the behavior under protection: all static live game identifiers are unique, including three-coin controls.
test('all static live game identifiers are unique, including three-coin controls', () => {
// Original L51: Replaces matches of the regular expression `/<template\b[\s\S]*?<\/template>/g` used to match text in calls `fs.readFileSync` with calls `require.resolve` with "../index.html"; "utf8" with ""; stores the result in `html`. const prevents reassignment of this binding, not mutation inside its object/array.
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8').replace(/<template\b[\s\S]*?<\/template>/g, '');
// Original L52: Transforms each item of an array containing the expanded entries/properties from calls `html.matchAll` with the regular expression `/\bid="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
// Original L53: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(ids).size, ids.length)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(new Set(ids).size, ids.length);
// Original L54: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(html, /data-game="three-coin-toss"/);
// Original L55: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((html.match(/data-coin-choice=/g) || []).length, 8)`; it requires that observable game or persistence rule to match exactly.
  assert.equal((html.match(/data-coin-choice=/g) || []).length, 8);
// Original L56: This closes the test/helper block containing the setup and its behavior checks.
});
