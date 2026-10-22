# tests/accomplishments.test.js

[Exact copy](../../original/tests/accomplishments.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 2

```text
const fs = require('node:fs');
```

This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.

### Line 3

```text
const path = require('node:path');
```

This imports node:path so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 7

```text
function makeManager(save = {}) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 8

```text
  const writes = [];
```

An array containing ; stores the result in `writes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
  const context = {
```

An object with fields window: an object with fields LocalProfiles: an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes); LocalSave: an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
    window: {
```

Defines field window as an object with fields LocalProfiles: an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes); LocalSave: an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements.

### Line 11

```text
      LocalProfiles: {
```

Defines field LocalProfiles as an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes).

### Line 12

```text
        getCurrentSave: () => save,
```

Defines field getCurrentSave as a callback taking no parameters that `save` (save).

### Line 13

```text
        saveCurrent: partial => writes.push(partial)
```

Defines field saveCurrent as a callback taking partial that appends `partial` (partial) to `writes` (writes).

### Line 14

```text
      },
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 15

```text
      LocalSave: { queueFileSave() {} }
```

Defines field LocalSave as an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements.

### Line 16

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 17

```text
  };
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 18

```text
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/accomplishments.js'), 'utf8'), context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 19

```text
  return { manager: new context.window.AccomplishmentManager({}), writes, context };
```

Returns an object with fields manager: constructs a new instance of `context.window.AccomplishmentManager` with an object with fields ; writes: `writes` (writes); context: `context` (context) to the caller and exits this function.

### Line 20

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 21

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 22

```text
test('new manager exposes isolated, stable accomplishment schema', () => {
```

This test names the behavior under protection: new manager exposes isolated, stable accomplishment schema.

### Line 23

```text
  const { manager } = makeManager();
```

Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 24

```text
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState())), {
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(JSON.parse(JSON.stringify(manager.getState())), {)`; it requires that observable game or persistence rule to match exactly.

### Line 25

```text
    version: 1,
```

Defines field version as 1.

### Line 26

```text
    unlockedIds: [],
```

Defines field unlockedIds as an array containing .

### Line 27

```text
    selectedCosmetic: 'classic-cabinet',
```

Defines field selectedCosmetic as "classic-cabinet".

### Line 28

```text
    history: [],
```

Defines field history as an array containing .

### Line 29

```text
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
```

Defines field stats as an object with fields games: 0; wins: 0; races: 0; raceWins: 0.

### Line 30

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 31

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 32

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 33

```text
test('game and race records are idempotent and unlock milestones', () => {
```

This test names the behavior under protection: game and race records are idempotent and unlock milestones.

### Line 34

```text
  const { manager } = makeManager();
```

Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
  assert.ok(manager.recordGame('blackjack', { id: 'hand-1', won: true }));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 36

```text
  assert.equal(manager.recordGame('blackjack', { id: 'hand-1', won: true }), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.recordGame('blackjack', { id: 'hand-1', won: true }), false)`; it requires that observable game or persistence rule to match exactly.

### Line 37

```text
  for (let index = 2; index <= 10; index += 1) manager.recordGame('blackjack', { id: `hand-${index}`, won: index % 2 === 0 });
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 38

```text
  assert.equal(manager.getState().stats.games, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().stats.games, 10)`; it requires that observable game or persistence rule to match exactly.

### Line 39

```text
  assert.ok(manager.isUnlocked('first-game'));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 40

```text
  assert.ok(manager.isUnlocked('games-10'));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 41

```text
  assert.ok(manager.isUnlocked('first-win'));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 42

```text
  assert.ok(manager.recordRace({ raceId: 100, raceType: 'horse', won: true, payout: 20 }));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 43

```text
  assert.equal(manager.recordRace({ raceId: 100, raceType: 'horse', won: true }), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.recordRace({ raceId: 100, raceType: 'horse', won: true }), false)`; it requires that deterministic racing rule to match exactly.

### Line 44

```text
  assert.equal(manager.getState().stats.raceWins, 1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().stats.raceWins, 1)`; it requires that deterministic racing rule to match exactly.

### Line 45

```text
  assert.ok(manager.isUnlocked('first-race'));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 46

```text
  assert.ok(manager.isUnlocked('race-win'));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 47

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 48

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 49

```text
test('history is bounded to 50 unique entries', () => {
```

This test names the behavior under protection: history is bounded to 50 unique entries.

### Line 50

```text
  const { manager } = makeManager();
```

Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 51

```text
  for (let index = 0; index < 55; index += 1) manager.recordGame('coin-toss', { id: `round-${index}`, won: false });
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 52

```text
  const state = manager.getState();
```

Calls `manager.getState` with no arguments; stores the result in `state`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 53

```text
  assert.equal(state.history.length, 50);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(state.history.length, 50)`; it requires that profile bonus/achievement rule to match exactly.

### Line 54

```text
  assert.equal(state.history[0].id, 'game:round-5');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(state.history[0].id, 'game:round-5')`; it requires that profile bonus/achievement rule to match exactly.

### Line 55

```text
  assert.equal(new Set(state.history.map(item => item.id)).size, 50);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(state.history.map(item => item.id)).size, 50)`; it requires that profile bonus/achievement rule to match exactly.

### Line 56

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 57

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 58

```text
test('cosmetic selection is locked until its achievement and persists only accomplishment data', () => {
```

This test names the behavior under protection: cosmetic selection is locked until its achievement and persists only accomplishment data.

### Line 59

```text
  const { manager, writes } = makeManager();
```

Calls `makeManager` with no arguments; stores the result in `{ manager, writes }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 60

```text
  assert.equal(manager.selectCosmetic('neon-cabinet'), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.selectCosmetic('neon-cabinet'), false)`; it requires that observable game or persistence rule to match exactly.

### Line 61

```text
  for (let index = 0; index < 10; index += 1) manager.recordGame('slots', { id: `spin-${index}`, won: false });
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 62

```text
  assert.equal(manager.selectCosmetic('neon-cabinet'), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.selectCosmetic('neon-cabinet'), true)`; it requires that observable game or persistence rule to match exactly.

### Line 63

```text
  assert.equal(manager.getState().selectedCosmetic, 'neon-cabinet');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().selectedCosmetic, 'neon-cabinet')`; it requires that observable game or persistence rule to match exactly.

### Line 64

```text
  assert.ok(writes.every(write => Object.keys(write).length === 1 && write.accomplishments));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 65

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 66

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 67

```text
test('loading another save resets state and does not leak profile history', () => {
```

This test names the behavior under protection: loading another save resets state and does not leak profile history.

### Line 68

```text
  const save = { accomplishments: { unlockedIds: ['first-win'], selectedCosmetic: 'royal-cabinet', history: [{ id: 'old', kind: 'game' }], stats: { games: 2, wins: 1 } } };
```

An object with fields accomplishments: an object with fields unlockedIds: an array containing "first-win"; selectedCosmetic: "royal-cabinet"; history: an array containing an object with fields id: "old"; kind: "game"; stats: an object with fields games: 2; wins: 1; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 69

```text
  const { manager } = makeManager(save);
```

Calls `makeManager` with `save` (save); stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 70

```text
  assert.equal(manager.getState().history[0].id, 'old');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().history[0].id, 'old')`; it requires that profile bonus/achievement rule to match exactly.

### Line 71

```text
  save.accomplishments = { unlockedIds: [], history: [], stats: {} };
```

Sets `save.accomplishments` (the accomplishments property of save) to an object with fields unlockedIds: an array containing ; history: an array containing ; stats: an object with fields .

### Line 72

```text
  manager.resetForActiveProfile();
```

Calls `manager.resetForActiveProfile` with no arguments.

### Line 73

```text
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState().history)), []);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(JSON.parse(JSON.stringify(manager.getState().history)), [])`; it requires that profile bonus/achievement rule to match exactly.

### Line 74

```text
  assert.equal(manager.getState().selectedCosmetic, 'classic-cabinet');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().selectedCosmetic, 'classic-cabinet')`; it requires that player-facing UI guardrail to match exactly.

### Line 75

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
