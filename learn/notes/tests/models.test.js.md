# tests/models.test.js

[Exact copy](../../original/tests/models.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// These focused tests protect the model's safe defaults and, especially, old saved balances during code reorganization.
```

This comment defines the test boundary and explains why the isolated fixture is safe: These focused tests protect the model's safe defaults and, especially, old saved balances during code reorganization.

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
const path = require('node:path');
```

This imports node:path so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 7

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 8

```text
const context = { window: {} };
```

An object with fields window: an object with fields ; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
const source = fs.readFileSync(path.join(__dirname, '../src/js/models.js'), 'utf8');
```

Calls `fs.readFileSync` with joins the items of `path` (path) into text separated by `__dirname` (  dirname); "utf8"; stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
const Player = vm.runInNewContext(`${source}\nPlayer`, context);
```

Calls `vm.runInNewContext` with a text template that combines fixed text with computed values `source` (source); `context` (context); stores the result in `Player`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 11

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 12

```text
test('a new Player starts at $100', () => {
```

This test names the behavior under protection: a new Player starts at $100.

### Line 13

```text
  assert.equal(new Player().balance, 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Player().balance, 100)`; it requires that virtual-money and wager rule to match exactly.

### Line 14

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 15

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 16

```text
test('loading an existing profile keeps its saved bankroll', () => {
```

This test names the behavior under protection: loading an existing profile keeps its saved bankroll.

### Line 17

```text
  assert.equal(Player.fromProfile({ balance: 1000 }).balance, 1000);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(Player.fromProfile({ balance: 1000 }).balance, 1000)`; it requires that virtual-money and wager rule to match exactly.

### Line 18

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 19

```text
test('low-balance reload never shrinks the permanent wager limit', () => {
```

This test names the behavior under protection: low-balance reload never shrinks the permanent wager limit.

### Line 20

```text
  const player = new Player({balance:7,maxBet:1600});player.loadProfile(player.toProfile());
```

Constructs a new instance of `Player` with an object with fields balance: 7; maxBet: 1600; stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 21

```text
  assert.equal(player.maxBet,7);assert.equal(player.toProfile().maxBet,1600);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.maxBet,7)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(player.toProfile().maxBet,1600)`; it requires that virtual-money and wager rule to match exactly.

### Line 22

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
