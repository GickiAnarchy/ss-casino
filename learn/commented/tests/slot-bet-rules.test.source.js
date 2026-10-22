// Original L1: This comment defines the test boundary and explains why the isolated fixture is safe: Exercise bet math at the boundaries where binary floating-point often creates visible one-cent errors.
// Exercise bet math at the boundaries where binary floating-point often creates visible one-cent errors.
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L4: This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.
const SlotBetRules = require('../src/js/slot-bet-rules.js');
// Original L5: Blank line separates test setup from the next scenario for readability.

// Original L6: This test names the behavior under protection: penny slots step in five-cent increments and cap at five dollars.
test('penny slots step in five-cent increments and cap at five dollars', () => {
// Original L7: Constructs a new instance of `SlotBetRules` with an object with fields minimum: 0.05; step: 0.05; maximum: 5; startingBet: 0.05; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.
  const bets = new SlotBetRules({ minimum: 0.05, step: 0.05, maximum: 5, startingBet: 0.05 });
// Original L8: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 5)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(100, 100), 5);
// Original L9: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.05, 100, 100), 0.1)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.increase(0.05, 100, 100), 0.1);
// Original L10: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.1, 100, 100), 0.15)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.increase(0.1, 100, 100), 0.15);
// Original L11: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(4.95, 100, 100), 5)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.increase(4.95, 100, 100), 5);
// Original L12: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.decrease(0.05), 0.05)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.decrease(0.05), 0.05);
// Original L13: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L14: Blank line separates test setup from the next scenario for readability.

// Original L15: This test names the behavior under protection: quarter slots step in twenty-five-cent increments and honor balance and profile limits.
test('quarter slots step in twenty-five-cent increments and honor balance and profile limits', () => {
// Original L16: Constructs a new instance of `SlotBetRules` with an object with fields minimum: 0.25; step: 0.25; maximum: 25; startingBet: 0.25; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.
  const bets = new SlotBetRules({ minimum: 0.25, step: 0.25, maximum: 25, startingBet: 0.25 });
// Original L17: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 25)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(100, 100), 25);
// Original L18: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(3.4, 100), 3.25)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(3.4, 100), 3.25);
// Original L19: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 2), 2)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(100, 2), 2);
// Original L20: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(0.2, 100), 0)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(0.2, 100), 0);
// Original L21: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.25, 1, 100), 0.5)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.increase(0.25, 1, 100), 0.5);
// Original L22: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L23: Blank line separates test setup from the next scenario for readability.

// Original L24: This test names the behavior under protection: slot currency displays cents consistently.
test('slot currency displays cents consistently', () => {
// Original L25: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(0.05), '$0.05')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(SlotBetRules.format(0.05), '$0.05');
// Original L26: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(1), '$1.00')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(SlotBetRules.format(1), '$1.00');
// Original L27: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(0.1 * 3), '$0.30')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(SlotBetRules.format(0.1 * 3), '$0.30');
// Original L28: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L29: Blank line separates test setup from the next scenario for readability.

// Original L30: This test names the behavior under protection: existing high-stakes tables retain a five-dollar minimum and five-dollar steps.
test('existing high-stakes tables retain a five-dollar minimum and five-dollar steps', () => {
// Original L31: Constructs a new instance of `SlotBetRules` with an object with fields minimum: 5; step: 5; maximum: `Infinity` (infinity); startingBet: 10; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.
  const bets = new SlotBetRules({ minimum: 5, step: 5, maximum: Infinity, startingBet: 10 });
// Original L32: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.decrease(10), 5)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.decrease(10), 5);
// Original L33: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 100)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(100, 100), 100);
// Original L34: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(12, 100), 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(bets.getMaximum(12, 100), 10);
// Original L35: This closes the test/helper block containing the setup and its behavior checks.
});
