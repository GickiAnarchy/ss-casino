const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const rules = require('../src/js/game-rules.js');
const Player = vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/models.js'), 'utf8') + '\nPlayer', { window: {} });

test('table Max uses the remaining cent balance, never more than the configured cap', () => {
  assert.equal(rules.maximum(43.27, 100), 43.27);
  assert.equal(rules.maximum(1000, 100), 100);
  assert.equal(rules.maximum(4.99, 100), 0);
  assert.equal(rules.maximum(0, 100), 0);
  assert.equal(rules.maximum(NaN, 100), 0);
  assert.equal(rules.legal(0, 100, 100), false);
  assert.equal(rules.legal(100, 43.27, 100), false);
  assert.equal(rules.legal(43.27, 43.27, 100), true);
  assert.equal(rules.increase(0, 100, 100), 5);
  assert.equal(rules.increase(40, 43.27, 100), 43.27);
});

test('every prediction/outcome combination settles three coins with doubling payouts', () => {
  const patterns = Array.from({ length: 8 }, (_, bits) => Array.from({ length: 3 }, (_, i) => bits & (1 << i) ? 'HEADS' : 'TAILS'));
  for (const choices of patterns) {
    let total = 0;
    for (const outcomes of patterns) {
      const result = rules.threeCoinResult(choices, outcomes, 10);
      const correct = choices.filter((choice, i) => choice === outcomes[i]).length;
      assert.equal(result.correct, correct);
      assert.equal(result.payout, [0, 0, 15, 30][correct]);
      assert.equal(result.net, result.payout - 10);
      total += result.payout;
    }
    assert.equal(total / patterns.length, 9.375);
  }
  assert.throws(() => rules.threeCoinResult(['HEADS', null, 'TAILS'], ['HEADS','TAILS','TAILS'], 10));
  assert.throws(() => rules.threeCoinResult(['HEADS','HEADS','TAILS'], ['HEADS','TAILS','TAILS'], 0));
});

test('fifth levels award rewards and low balance cannot shrink permanent wager limit', () => {
  for (const level of [2, 5, 10, 15]) {
    const player = new Player({ balance: 7, maxBet: 1100, level });
    const reward = rules.levelReward(player);
    assert.equal(reward.bonus, level * 50);
    assert.equal(reward.level, level);
    assert.equal(player.creditLimit, 2250);
    assert.equal(player.toProfile().maxBet, 1600);
  }
});

test('all static live game identifiers are unique, including three-coin controls', () => {
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8').replace(/<template\b[\s\S]*?<\/template>/g, '');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  assert.match(html, /data-game="three-coin-toss"/);
  assert.equal((html.match(/data-coin-choice=/g) || []).length, 8);
});
