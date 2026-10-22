# tests/slot-bet-rules.test.js

[Exact copy](../../original/tests/slot-bet-rules.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Exercise bet math at the boundaries where binary floating-point often creates visible one-cent errors.
```

This comment defines the test boundary and explains why the isolated fixture is safe: Exercise bet math at the boundaries where binary floating-point often creates visible one-cent errors.

### Line 2

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 3

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const SlotBetRules = require('../src/js/slot-bet-rules.js');
```

This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 6

```text
test('penny slots step in five-cent increments and cap at five dollars', () => {
```

This test names the behavior under protection: penny slots step in five-cent increments and cap at five dollars.

### Line 7

```text
  const bets = new SlotBetRules({ minimum: 0.05, step: 0.05, maximum: 5, startingBet: 0.05 });
```

Constructs a new instance of `SlotBetRules` with an object with fields minimum: 0.05; step: 0.05; maximum: 5; startingBet: 0.05; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
  assert.equal(bets.getMaximum(100, 100), 5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 5)`; it requires that virtual-money and wager rule to match exactly.

### Line 9

```text
  assert.equal(bets.increase(0.05, 100, 100), 0.1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.05, 100, 100), 0.1)`; it requires that virtual-money and wager rule to match exactly.

### Line 10

```text
  assert.equal(bets.increase(0.1, 100, 100), 0.15);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.1, 100, 100), 0.15)`; it requires that virtual-money and wager rule to match exactly.

### Line 11

```text
  assert.equal(bets.increase(4.95, 100, 100), 5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(4.95, 100, 100), 5)`; it requires that virtual-money and wager rule to match exactly.

### Line 12

```text
  assert.equal(bets.decrease(0.05), 0.05);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.decrease(0.05), 0.05)`; it requires that virtual-money and wager rule to match exactly.

### Line 13

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 14

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 15

```text
test('quarter slots step in twenty-five-cent increments and honor balance and profile limits', () => {
```

This test names the behavior under protection: quarter slots step in twenty-five-cent increments and honor balance and profile limits.

### Line 16

```text
  const bets = new SlotBetRules({ minimum: 0.25, step: 0.25, maximum: 25, startingBet: 0.25 });
```

Constructs a new instance of `SlotBetRules` with an object with fields minimum: 0.25; step: 0.25; maximum: 25; startingBet: 0.25; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 17

```text
  assert.equal(bets.getMaximum(100, 100), 25);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 25)`; it requires that virtual-money and wager rule to match exactly.

### Line 18

```text
  assert.equal(bets.getMaximum(3.4, 100), 3.25);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(3.4, 100), 3.25)`; it requires that virtual-money and wager rule to match exactly.

### Line 19

```text
  assert.equal(bets.getMaximum(100, 2), 2);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 2), 2)`; it requires that virtual-money and wager rule to match exactly.

### Line 20

```text
  assert.equal(bets.getMaximum(0.2, 100), 0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(0.2, 100), 0)`; it requires that virtual-money and wager rule to match exactly.

### Line 21

```text
  assert.equal(bets.increase(0.25, 1, 100), 0.5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.increase(0.25, 1, 100), 0.5)`; it requires that virtual-money and wager rule to match exactly.

### Line 22

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 23

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 24

```text
test('slot currency displays cents consistently', () => {
```

This test names the behavior under protection: slot currency displays cents consistently.

### Line 25

```text
  assert.equal(SlotBetRules.format(0.05), '$0.05');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(0.05), '$0.05')`; it requires that observable game or persistence rule to match exactly.

### Line 26

```text
  assert.equal(SlotBetRules.format(1), '$1.00');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(1), '$1.00')`; it requires that observable game or persistence rule to match exactly.

### Line 27

```text
  assert.equal(SlotBetRules.format(0.1 * 3), '$0.30');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotBetRules.format(0.1 * 3), '$0.30')`; it requires that observable game or persistence rule to match exactly.

### Line 28

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 29

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 30

```text
test('existing high-stakes tables retain a five-dollar minimum and five-dollar steps', () => {
```

This test names the behavior under protection: existing high-stakes tables retain a five-dollar minimum and five-dollar steps.

### Line 31

```text
  const bets = new SlotBetRules({ minimum: 5, step: 5, maximum: Infinity, startingBet: 10 });
```

Constructs a new instance of `SlotBetRules` with an object with fields minimum: 5; step: 5; maximum: `Infinity` (infinity); startingBet: 10; stores the result in `bets`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 32

```text
  assert.equal(bets.decrease(10), 5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.decrease(10), 5)`; it requires that virtual-money and wager rule to match exactly.

### Line 33

```text
  assert.equal(bets.getMaximum(100, 100), 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(100, 100), 100)`; it requires that virtual-money and wager rule to match exactly.

### Line 34

```text
  assert.equal(bets.getMaximum(12, 100), 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(bets.getMaximum(12, 100), 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 35

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
