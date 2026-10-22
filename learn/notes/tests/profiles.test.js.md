# tests/profiles.test.js

[Exact copy](../../original/tests/profiles.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Use a tiny VM browser shim so encrypted-profile save normalization can be tested without a real browser or touching user storage.
```

This comment defines the test boundary and explains why the isolated fixture is safe: Use a tiny VM browser shim so encrypted-profile save normalization can be tested without a real browser or touching user storage.

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
const context = { window: {}, document: { getElementById: () => null } };
```

An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 10

```text
const manager = Object.create(context.window.LocalProfileManager.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 11

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 12

```text
test('new profiles default to $100 while existing saved balances are preserved', () => {
```

This test names the behavior under protection: new profiles default to $100 while existing saved balances are preserved.

### Line 13

```text
  assert.equal(manager.normalizeSave({}).player.balance, 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.normalizeSave({}).player.balance, 100)`; it requires that virtual-money and wager rule to match exactly.

### Line 14

```text
  assert.equal(manager.normalizeSave({ player: { balance: 812.34 } }).player.balance, 812.34);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.normalizeSave({ player: { balance: 812.34 } }).player.balance, 812.34)`; it requires that virtual-money and wager rule to match exactly.

### Line 15

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 16

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 17

```text
test('profile saves preserve horse and car records and typed betting tickets', () => {
```

This test names the behavior under protection: profile saves preserve horse and car records and typed betting tickets.

### Line 18

```text
  const save = manager.normalizeSave({
```

Calls `manager.normalizeSave` with an object with fields raceBet: an object with fields raceId: 123; raceType: "car"; runnerId: "car-neon-viper"; winnerId: "car-polar-star"; stake: 5; odds: 3.25; and further fields; raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': `{ starts: 12, wins: 3 }`; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': `{ starts: 5, wins: 2 }`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 19

```text
    raceBet: {
```

Defines field raceBet as an object with fields raceId: 123; raceType: "car"; runnerId: "car-neon-viper"; winnerId: "car-polar-star"; stake: 5; odds: 3.25; and further fields.

### Line 20

```text
      raceId: 123,
```

Defines field raceId as 123.

### Line 21

```text
      raceType: 'car',
```

Defines field raceType as "car".

### Line 22

```text
      runnerId: 'car-neon-viper',
```

Defines field runnerId as "car-neon-viper".

### Line 23

```text
      winnerId: 'car-polar-star',
```

Defines field winnerId as "car-polar-star".

### Line 24

```text
      stake: 5,
```

Defines field stake as 5.

### Line 25

```text
      odds: 3.25,
```

Defines field odds as 3.25.

### Line 26

```text
      durationMs: 120000
```

Defines field durationMs as 120000.

### Line 27

```text
    },
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 28

```text
    raceExperience: {
```

Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': an object with fields starts: 12; wins: 3; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': an object with fields starts: 5; wins: 2.

### Line 29

```text
      horse: { lastProcessedRaceId: 10, runners: { 'horse-copper-comet': { starts: 12, wins: 3 } } },
```

Defines field horse as an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': an object with fields starts: 12; wins: 3.

### Line 30

```text
      car: { lastProcessedRaceId: 20, runners: { 'car-neon-viper': { starts: 5, wins: 2 } } }
```

Defines field car as an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': an object with fields starts: 5; wins: 2.

### Line 31

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 32

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 33

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 34

```text
  assert.equal(save.raceBet.raceType, 'car');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.raceType, 'car')`; it requires that deterministic racing rule to match exactly.

### Line 35

```text
  assert.equal(save.raceBet.runnerId, 'car-neon-viper');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.runnerId, 'car-neon-viper')`; it requires that deterministic racing rule to match exactly.

### Line 36

```text
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'].starts, 12);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.runners['horse-copper-comet'].starts, 12)`; it requires that deterministic racing rule to match exactly.

### Line 37

```text
  assert.equal(save.raceExperience.car.runners['car-neon-viper'].wins, 2);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.runners['car-neon-viper'].wins, 2)`; it requires that deterministic racing rule to match exactly.

### Line 38

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 39

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 40

```text
test('legacy horse tickets remain valid and default to the horse circuit', () => {
```

This test names the behavior under protection: legacy horse tickets remain valid and default to the horse circuit.

### Line 41

```text
  const save = manager.normalizeSave({
```

Calls `manager.normalizeSave` with an object with fields raceBet: an object with fields raceId: 123; runnerId: "horse-1"; winnerId: "horse-2"; stake: 5; odds: 3; durationMs: 120000; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
    raceBet: { raceId: 123, runnerId: 'horse-1', winnerId: 'horse-2', stake: 5, odds: 3, durationMs: 120000 }
```

Defines field raceBet as an object with fields raceId: 123; runnerId: "horse-1"; winnerId: "horse-2"; stake: 5; odds: 3; durationMs: 120000.

### Line 43

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 44

```text
  assert.equal(save.raceBet.raceType, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.raceType, null)`; it requires that deterministic racing rule to match exactly.

### Line 45

```text
  assert.equal(save.raceBet.runnerId, 'horse-1');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.runnerId, 'horse-1')`; it requires that deterministic racing rule to match exactly.

### Line 46

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 47

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 48

```text
test('an absent experience cursor stays missing instead of becoming Unix time zero', () => {
```

This test names the behavior under protection: an absent experience cursor stays missing instead of becoming Unix time zero.

### Line 49

```text
  const save = manager.normalizeSave({
```

Calls `manager.normalizeSave` with an object with fields raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: null; runners: an object with fields ; car: an object with fields runners: an object with fields ; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
    raceExperience: {
```

Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: null; runners: an object with fields ; car: an object with fields runners: an object with fields .

### Line 51

```text
      horse: { lastProcessedRaceId: null, runners: {} },
```

Defines field horse as an object with fields lastProcessedRaceId: null; runners: an object with fields .

### Line 52

```text
      car: { runners: {} }
```

Defines field car as an object with fields runners: an object with fields .

### Line 53

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 54

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 55

```text
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.

### Line 56

```text
  assert.equal(save.raceExperience.car.lastProcessedRaceId, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.

### Line 57

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 58

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 59

```text
test('profile validation removes impossible race records', () => {
```

This test names the behavior under protection: profile validation removes impossible race records.

### Line 60

```text
  const save = manager.normalizeSave({
```

Calls `manager.normalizeSave` with an object with fields raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': `{ starts: 3, wins: 4 }`; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': `{ starts: 4, wins: 1 }`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 61

```text
    raceExperience: {
```

Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': an object with fields starts: 3; wins: 4; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': an object with fields starts: 4; wins: 1.

### Line 62

```text
      horse: { lastProcessedRaceId: -1, runners: { 'horse-copper-comet': { starts: 3, wins: 4 } } },
```

Defines field horse as an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': an object with fields starts: 3; wins: 4.

### Line 63

```text
      car: { lastProcessedRaceId: 20, runners: { 'horse-copper-comet': { starts: 4, wins: 1 } } }
```

Defines field car as an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': an object with fields starts: 4; wins: 1.

### Line 64

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 65

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 66

```text
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.

### Line 67

```text
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'], undefined);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.runners['horse-copper-comet'], undefined)`; it requires that deterministic racing rule to match exactly.

### Line 68

```text
  assert.equal(save.raceExperience.car.runners['horse-copper-comet'], undefined);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.runners['horse-copper-comet'], undefined)`; it requires that deterministic racing rule to match exactly.

### Line 69

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 70

```text
test('Money Green and bonus state survive repeated normalization', () => {
```

This test names the behavior under protection: Money Green and bonus state survive repeated normalization.

### Line 71

```text
  const bonus={freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]},summary:{totalWin:22.5}};
```

An object with fields freeSpinsRemaining: 4; lockedStake: 10; bonusTotalWin: 22.5; stickyWildsGrid: calls `Array.from` with an object with fields length: 5; a callback taking no parameters that an array containing false, true, false; lastResult: an object with fields status: "settled"; stake: 0; payout: 12.5; lines: an array containing ; summary: an object with fields totalWin: 22.5; stores the result in `bonus`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 72

```text
  const save=manager.normalizeSave(manager.normalizeSave({settings:{theme:'money'},slotBonuses:{'view-5reel-slots':bonus}}));
```

Calls `manager.normalizeSave` with calls `manager.normalizeSave` with an object with fields settings: an object with fields theme: "money"; slotBonuses: an object with fields 'view-5reel-slots': `bonus` (bonus); stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 73

```text
  assert.equal(save.settings.theme,'money');assert.equal(save.slotBonuses['view-5reel-slots'].freeSpinsRemaining,4);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly.

### Line 74

```text
  assert.equal(save.slotBonuses['view-5reel-slots'].stickyWildsGrid[2][1],true);assert.equal(save.slotBonuses['view-5reel-slots'].summary.totalWin,22.5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].stickyWildsGrid[2][1],true)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].summary.totalWin,22.5)`; it requires that profile bonus/achievement rule to match exactly.

### Line 75

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 76

```text
test('invalid bonus counters and sticky grids are sanitized', () => {
```

This test names the behavior under protection: invalid bonus counters and sticky grids are sanitized.

### Line 77

```text
  const save=manager.normalizeSave({slotBonuses:{table:{freeSpinsRemaining:-3,lockedStake:Infinity,stickyWildsGrid:[[true]]}}});
```

Calls `manager.normalizeSave` with an object with fields slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: changes the numeric sign of 3; lockedStake: `Infinity` (infinity); stickyWildsGrid: an array containing `[true]`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 78

```text
  assert.equal(save.slotBonuses.table.freeSpinsRemaining,0);assert.equal(save.slotBonuses.table.lockedStake,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.freeSpinsRemaining,0)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.lockedStake,0)`; it requires that profile bonus/achievement rule to match exactly.

### Line 79

```text
  assert.equal(save.slotBonuses.table.stickyWildsGrid.length,5);assert.equal(save.slotBonuses.table.stickyWildsGrid[0].length,3);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.stickyWildsGrid.length,5)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.stickyWildsGrid[0].length,3)`; it requires that profile bonus/achievement rule to match exactly.

### Line 80

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
