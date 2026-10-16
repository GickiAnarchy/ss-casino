const assert = require('node:assert/strict');
const test = require('node:test');
const SlotBetRules = require('./slot-bet-rules.js');

test('penny slots step in five-cent increments and cap at five dollars', () => {
  const bets = new SlotBetRules({ minimum: 0.05, step: 0.05, maximum: 5, startingBet: 0.05 });
  assert.equal(bets.getMaximum(100, 100), 5);
  assert.equal(bets.increase(0.05, 100, 100), 0.1);
  assert.equal(bets.increase(0.1, 100, 100), 0.15);
  assert.equal(bets.increase(4.95, 100, 100), 5);
  assert.equal(bets.decrease(0.05), 0.05);
});

test('quarter slots step in twenty-five-cent increments and honor balance and profile limits', () => {
  const bets = new SlotBetRules({ minimum: 0.25, step: 0.25, maximum: 25, startingBet: 0.25 });
  assert.equal(bets.getMaximum(100, 100), 25);
  assert.equal(bets.getMaximum(3.4, 100), 3.25);
  assert.equal(bets.getMaximum(100, 2), 2);
  assert.equal(bets.getMaximum(0.2, 100), 0);
  assert.equal(bets.increase(0.25, 1, 100), 0.5);
});

test('slot currency displays cents consistently', () => {
  assert.equal(SlotBetRules.format(0.05), '$0.05');
  assert.equal(SlotBetRules.format(1), '$1.00');
  assert.equal(SlotBetRules.format(0.1 * 3), '$0.30');
});

test('existing high-stakes tables retain a five-dollar minimum and five-dollar steps', () => {
  const bets = new SlotBetRules({ minimum: 5, step: 5, maximum: Infinity, startingBet: 10 });
  assert.equal(bets.decrease(10), 5);
  assert.equal(bets.getMaximum(100, 100), 100);
  assert.equal(bets.getMaximum(12, 100), 10);
});
