# tests/game-rules.test.js

[Exact copy](../../original/tests/game-rules.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 2

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 3

```text
const fs = require('node:fs');
```

This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const rules = require('../src/js/game-rules.js');
```

This imports ../src/js/game-rules.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text
const Player = vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/models.js'), 'utf8') + '\nPlayer', { window: {} });
```

Calls `vm.runInNewContext` with adds calls `fs.readFileSync` with calls `require.resolve` with "../src/js/models.js"; "utf8" and "\nPlayer" (or joins them if a value is text); an object with fields window: an object with fields ; stores the result in `Player`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 7

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 8

```text
test('table Max uses the remaining cent balance, never more than the configured cap', () => {
```

This test names the behavior under protection: table Max uses the remaining cent balance, never more than the configured cap.

### Line 9

```text
  assert.equal(rules.maximum(43.27, 100), 43.27);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(43.27, 100), 43.27)`; it requires that virtual-money and wager rule to match exactly.

### Line 10

```text
  assert.equal(rules.maximum(1000, 100), 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(1000, 100), 100)`; it requires that virtual-money and wager rule to match exactly.

### Line 11

```text
  assert.equal(rules.maximum(4.99, 100), 0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(4.99, 100), 0)`; it requires that virtual-money and wager rule to match exactly.

### Line 12

```text
  assert.equal(rules.maximum(0, 100), 0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(0, 100), 0)`; it requires that virtual-money and wager rule to match exactly.

### Line 13

```text
  assert.equal(rules.maximum(NaN, 100), 0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.maximum(NaN, 100), 0)`; it requires that virtual-money and wager rule to match exactly.

### Line 14

```text
  assert.equal(rules.legal(0, 100, 100), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(0, 100, 100), false)`; it requires that observable game or persistence rule to match exactly.

### Line 15

```text
  assert.equal(rules.legal(100, 43.27, 100), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(100, 43.27, 100), false)`; it requires that observable game or persistence rule to match exactly.

### Line 16

```text
  assert.equal(rules.legal(43.27, 43.27, 100), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.legal(43.27, 43.27, 100), true)`; it requires that observable game or persistence rule to match exactly.

### Line 17

```text
  assert.equal(rules.increase(0, 100, 100), 5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.increase(0, 100, 100), 5)`; it requires that observable game or persistence rule to match exactly.

### Line 18

```text
  assert.equal(rules.increase(40, 43.27, 100), 43.27);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(rules.increase(40, 43.27, 100), 43.27)`; it requires that observable game or persistence rule to match exactly.

### Line 19

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 20

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 21

```text
test('every prediction/outcome combination settles three coins with doubling payouts', () => {
```

This test names the behavior under protection: every prediction/outcome combination settles three coins with doubling payouts.

### Line 22

```text
  const patterns = Array.from({ length: 8 }, (_, bits) => Array.from({ length: 3 }, (_, i) => bits & (1 << i) ? 'HEADS' : 'TAILS'));
```

Calls `Array.from` with an object with fields length: 8; a callback taking _, bits that calls `Array.from` with an object with fields length: 3; a callback taking _, i that checks `bits & (1 << i)`; if true chooses "HEADS", otherwise "TAILS"; stores the result in `patterns`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 23

```text
  for (const choices of patterns) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 24

```text
    let total = 0;
```

0; stores the result in `total`. let allows the binding to be reassigned.

### Line 25

```text
    for (const outcomes of patterns) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 26

```text
      const result = rules.threeCoinResult(choices, outcomes, 10);
```

Calls `rules.threeCoinResult` with `choices` (choices); `outcomes` (outcomes); 10; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 27

```text
      const correct = choices.filter((choice, i) => choice === outcomes[i]).length;
```

`choices.filter((choice, i) => choice === outcomes[i]).length` (the length property of choices.filter((choice, i) => choice === outcomes[i])); stores the result in `correct`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 28

```text
      assert.equal(result.correct, correct);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.correct, correct)`; it requires that observable game or persistence rule to match exactly.

### Line 29

```text
      assert.equal(result.payout, [0, 0, 15, 30][correct]);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.payout, [0, 0, 15, 30][correct])`; it requires that virtual-money and wager rule to match exactly.

### Line 30

```text
      assert.equal(result.net, result.payout - 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.net, result.payout - 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 31

```text
      total += result.payout;
```

Adds to `total` (total) using `result.payout` (the payout property of result).

### Line 32

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 33

```text
    assert.equal(total / patterns.length, 9.375);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(total / patterns.length, 9.375)`; it requires that observable game or persistence rule to match exactly.

### Line 34

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 35

```text
  assert.throws(() => rules.threeCoinResult(['HEADS', null, 'TAILS'], ['HEADS','TAILS','TAILS'], 10));
```

This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.

### Line 36

```text
  assert.throws(() => rules.threeCoinResult(['HEADS','HEADS','TAILS'], ['HEADS','TAILS','TAILS'], 0));
```

This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.

### Line 37

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 38

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 39

```text
test('fifth levels award rewards and low balance cannot shrink permanent wager limit', () => {
```

This test names the behavior under protection: fifth levels award rewards and low balance cannot shrink permanent wager limit.

### Line 40

```text
  for (const level of [2, 5, 10, 15]) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 41

```text
    const player = new Player({ balance: 7, maxBet: 1100, level });
```

Constructs a new instance of `Player` with an object with fields balance: 7; maxBet: 1100; level: `level` (level); stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
    const reward = rules.levelReward(player);
```

Calls `rules.levelReward` with `player` (player); stores the result in `reward`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 43

```text
    assert.equal(reward.bonus, level * 50);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(reward.bonus, level * 50)`; it requires that observable game or persistence rule to match exactly.

### Line 44

```text
    assert.equal(reward.level, level);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(reward.level, level)`; it requires that observable game or persistence rule to match exactly.

### Line 45

```text
    assert.equal(player.creditLimit, 2250);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.creditLimit, 2250)`; it requires that virtual-money and wager rule to match exactly.

### Line 46

```text
    assert.equal(player.toProfile().maxBet, 1600);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.toProfile().maxBet, 1600)`; it requires that virtual-money and wager rule to match exactly.

### Line 47

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 48

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 49

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 50

```text
test('all static live game identifiers are unique, including three-coin controls', () => {
```

This test names the behavior under protection: all static live game identifiers are unique, including three-coin controls.

### Line 51

```text
  const html = fs.readFileSync(require.resolve('../index.html'), 'utf8').replace(/<template\b[\s\S]*?<\/template>/g, '');
```

Replaces matches of the regular expression `/<template\b[\s\S]*?<\/template>/g` used to match text in calls `fs.readFileSync` with calls `require.resolve` with "../index.html"; "utf8" with ""; stores the result in `html`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 52

```text
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
```

Transforms each item of an array containing the expanded entries/properties from calls `html.matchAll` with the regular expression `/\bid="([^"]+)"/g` used to match text using a callback taking match that the entry at index/key 1 in `match` (match) and returns a new array; stores the result in `ids`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 53

```text
  assert.equal(new Set(ids).size, ids.length);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(ids).size, ids.length)`; it requires that observable game or persistence rule to match exactly.

### Line 54

```text
  assert.match(html, /data-game="three-coin-toss"/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 55

```text
  assert.equal((html.match(/data-coin-choice=/g) || []).length, 8);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal((html.match(/data-coin-choice=/g) || []).length, 8)`; it requires that observable game or persistence rule to match exactly.

### Line 56

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
