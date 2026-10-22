# tests/race-engine.test.js

[Exact copy](../../original/tests/race-engine.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
// Headless tests exercise seeded race generation, schedules, recovery, and UI guardrails without changing a real profile.
```

This comment defines the test boundary and explains why the isolated fixture is safe: Headless tests exercise seeded race generation, schedules, recovery, and UI guardrails without changing a real profile.

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
const context = { window: {}, document: {} };
```

An object with fields window: an object with fields ; document: an object with fields ; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/race-engine.js'), 'utf8'), context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 10

```text
const engine = Object.create(context.window.RaceEngine.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 11

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 12

```text
function finalTrackPositions(race) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 13

```text
  const lanes = race.entrants.map(runner => {
```

Transforms each item of `race.entrants` (the entrants property of race) using a callback taking runner that runs its enclosed statements and returns a new array; stores the result in `lanes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 14

```text
    const token = { style: {} };
```

An object with fields style: an object with fields ; stores the result in `token`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 15

```text
    return {
```

Returns an object with fields dataset: an object with fields runnerId: `runner.id` (the id property of runner); querySelector: a callback taking no parameters that `token` (token); classList: an object with fields toggle: a callback taking no parameters that runs its enclosed statements; token: `token` (token) to the caller and exits this function.

### Line 16

```text
      dataset: { runnerId: runner.id },
```

Defines field dataset as an object with fields runnerId: `runner.id` (the id property of runner).

### Line 17

```text
      querySelector: () => token,
```

Defines field querySelector as a callback taking no parameters that `token` (token).

### Line 18

```text
      classList: { toggle() {} },
```

Defines field classList as an object with fields toggle: a callback taking no parameters that runs its enclosed statements.

### Line 19

```text
      token
```

Defines field token as `token` (token).

### Line 20

```text
    };
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 21

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 22

```text
  engine.trackEl = { querySelectorAll: () => lanes };
```

Sets `engine.trackEl` (the track el property of engine) to an object with fields querySelectorAll: a callback taking no parameters that `lanes` (lanes).

### Line 23

```text
  engine.updateTrackPositions(race, 1, true);
```

Calls `engine.updateTrackPositions` with `race` (race); 1; true.

### Line 24

```text
  return new Map(lanes.map(lane => [lane.dataset.runnerId, Number.parseFloat(lane.token.style.left)]));
```

Returns constructs a new instance of `Map` with transforms each item of `lanes` (lanes) using a callback taking lane that an array containing `lane.dataset.runnerId` (the runner id property of lane.dataset), calls `Number.parseFloat` with `lane.token.style.left` and returns a new array to the caller and exits this function.

### Line 25

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 26

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 27

```text
test('horse fields contain six entrants and car fields contain eight unique entrants from larger stables', () => {
```

This test names the behavior under protection: horse fields contain six entrants and car fields contain eight unique entrants from larger stables.

### Line 28

```text
  const eventId = new Date(2026, 9, 15, 9).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 9 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 29

```text
  for (const [type, expectedFieldSize] of [['horse', 6], ['car', 8]]) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 30

```text
    const race = engine.createRace(eventId, type);
```

Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 31

```text
    assert.equal(race.entrants.length, expectedFieldSize);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.entrants.length, expectedFieldSize)`; it requires that deterministic racing rule to match exactly.

### Line 32

```text
    assert.equal(new Set(race.entrants.map(runner => runner.id)).size, expectedFieldSize);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(race.entrants.map(runner => runner.id)).size, expectedFieldSize)`; it requires that deterministic racing rule to match exactly.

### Line 33

```text
    assert.ok(race.entrants.every(runner => runner.id.startsWith(`${type}-`)));
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 34

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 35

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 36

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 37

```text
test('race fields, odds, and winner are deterministic for a scheduled race', () => {
```

This test names the behavior under protection: race fields, odds, and winner are deterministic for a scheduled race.

### Line 38

```text
  const eventId = new Date(2026, 9, 15, 11).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 11 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 39

```text
  for (const type of ['horse', 'car']) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 40

```text
    const first = engine.createRace(eventId, type);
```

Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
    const second = engine.createRace(eventId, type);
```

Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `second`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
    assert.equal(first.winnerId, second.winnerId);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(first.winnerId, second.winnerId)`; it requires that deterministic racing rule to match exactly.

### Line 43

```text
    assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id)`; it requires that deterministic racing rule to match exactly.

### Line 44

```text
    assert.deepEqual(first.entrants.map(runner => runner.odds), second.entrants.map(runner => runner.odds));
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.odds), second.entrants.map(runner => runner.odds)`; it requires that deterministic racing rule to match exactly.

### Line 45

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

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
test('existing explicitly typed tickets reconstruct their original race outcome', () => {
```

This test names the behavior under protection: existing explicitly typed tickets reconstruct their original race outcome.

### Line 49

```text
  const eventId = new Date(2026, 9, 15, 9).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 9 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
  const race = engine.createRace(eventId, 'car');
```

Calls `engine.createRace` with `eventId` (event id); "car"; stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 51

```text
  assert.equal(race.durationMs, 139_000);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.durationMs, 139_000)`; it requires that deterministic racing rule to match exactly.

### Line 52

```text
  assert.equal(race.winnerId, 'car-turbo-tiger');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.winnerId, 'car-turbo-tiger')`; it requires that deterministic racing rule to match exactly.

### Line 53

```text
  assert.equal(race.entrants.map(runner => runner.id).join(','), 'car-lime-machine,car-turbo-tiger,car-ironclad,car-drift-king,car-blue-lightning,car-desert-fox,car-pink-nitro,car-midnight-rally');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.entrants.map(runner => runner.id).join(','), 'car-lime-machine,car-turbo-tiger,car-ironclad,car-drift-king,car-blue-lightning,car-desert-fox,car-pink-nitro,car-midnight-rally')`; it requires that deterministic racing rule to match exactly.

### Line 54

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 55

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 56

```text
test('the selected winner is furthest along the track at the finish', () => {
```

This test names the behavior under protection: the selected winner is furthest along the track at the finish.

### Line 57

```text
  for (let raceNumber = 1; raceNumber <= 500; raceNumber += 1) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 58

```text
    const eventId = raceNumber * 2 * 60 * 60 * 1000;
```

Multiplies multiplies multiplies multiplies `raceNumber` (race number) by 2 by 60 by 60 by 1000; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 59

```text
    for (const type of ['horse', 'car']) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 60

```text
      const race = engine.createRace(eventId, type);
```

Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 61

```text
      const positions = finalTrackPositions(race);
```

Calls `finalTrackPositions` with `race` (race); stores the result in `positions`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 62

```text
      const winnerPosition = positions.get(race.winnerId);
```

Calls `positions.get` with `race.winnerId` (the winner id property of race); stores the result in `winnerPosition`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 63

```text
      assert.ok(winnerPosition >= 97, `${type} race ${raceNumber}: winner should reach the finish line`);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 64

```text
      for (const [runnerId, position] of positions) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 65

```text
        if (runnerId !== race.winnerId) {
```

Checks whether checks that `runnerId` (runner id) and `race.winnerId` (the winner id property of race) differ in value or type; runs the following statement/block only when truthy.

### Line 66

```text
          assert.ok(winnerPosition > position, `${type} race ${raceNumber}: winner should finish ahead of ${runnerId}`);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 67

```text
        }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 68

```text
      }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 69

```text
    }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 70

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 71

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 72

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 73

```text
test('the local schedule runs hourly from 7 AM to 9 PM and skips overnight', () => {
```

This test names the behavior under protection: the local schedule runs hourly from 7 AM to 9 PM and skips overnight.

### Line 74

```text
  const earlyMorning = new Date(2026, 9, 15, 6, 59).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 6; 59 as milliseconds since 1970-01-01 UTC; stores the result in `earlyMorning`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 75

```text
  const sevenAm = new Date(2026, 9, 15, 7, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `sevenAm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 76

```text
  const eightAm = new Date(2026, 9, 15, 8, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 8; 0 as milliseconds since 1970-01-01 UTC; stores the result in `eightAm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 77

```text
  const tenAm = new Date(2026, 9, 15, 10, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 10; 0 as milliseconds since 1970-01-01 UTC; stores the result in `tenAm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 78

```text
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 0 as milliseconds since 1970-01-01 UTC; stores the result in `ninePm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 79

```text
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `nextMorning`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 80

```text
  assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm)`; it requires that observable game or persistence rule to match exactly.

### Line 81

```text
  assert.equal(engine.getNextRaceStart(sevenAm), eightAm);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(sevenAm), eightAm)`; it requires that observable game or persistence rule to match exactly.

### Line 82

```text
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(ninePm), nextMorning)`; it requires that observable game or persistence rule to match exactly.

### Line 83

```text
  assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm)`; it requires that observable game or persistence rule to match exactly.

### Line 84

```text
  assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), tenAm);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), tenAm)`; it requires that observable game or persistence rule to match exactly.

### Line 85

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 86

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 87

```text
test('horse and car races alternate on every daytime hourly slot', () => {
```

This test names the behavior under protection: horse and car races alternate on every daytime hourly slot.

### Line 88

```text
  const start = new Date(2026, 9, 15, 7, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 89

```text
  for (let slotIndex = 0; slotIndex < 15; slotIndex += 1) {
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 90

```text
    const eventId = start + slotIndex * 60 * 60 * 1000;
```

Adds `start` (start) and multiplies multiplies multiplies `slotIndex` (slot index) by 60 by 60 by 1000 (or joins them if a value is text); stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 91

```text
    const expectedType = slotIndex % 2 === 0 ? 'horse' : 'car';
```

Checks checks that takes the remainder of `slotIndex` (slot index) divided by 2 and 0 have the same value and type; if true chooses "horse", otherwise "car"; stores the result in `expectedType`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 92

```text
    assert.equal(engine.getScheduledRaceType(eventId), expectedType);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceType(eventId), expectedType)`; it requires that observable game or persistence rule to match exactly.

### Line 93

```text
    assert.equal(engine.createRace(eventId).type, expectedType);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.createRace(eventId).type, expectedType)`; it requires that observable game or persistence rule to match exactly.

### Line 94

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 95

```text
  assert.equal(engine.getScheduledRaceType(new Date(2026, 9, 16, 7, 0).getTime()), 'horse');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceType(new Date(2026, 9, 16, 7, 0).getTime()), 'horse')`; it requires that observable game or persistence rule to match exactly.

### Line 96

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 97

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 98

```text
test('race previews and betting open 45 minutes before each race; betting closes five minutes before start', () => {
```

This test names the behavior under protection: race previews and betting open 45 minutes before each race; betting closes five minutes before start.

### Line 99

```text
  const start = new Date(2026, 9, 15, 13, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 13; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 100

```text
  const previewOpens = start - 45 * 60 * 1000;
```

Subtracts multiplies multiplies 45 by 60 by 1000 from `start` (start); stores the result in `previewOpens`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 101

```text
  const bettingCloses = start - 5 * 60 * 1000;
```

Subtracts multiplies multiplies 5 by 60 by 1000 from `start` (start); stores the result in `bettingCloses`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 102

```text
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens - 1), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, previewOpens - 1), false)`; it requires that observable game or persistence rule to match exactly.

### Line 103

```text
  assert.equal(engine.isBettingOpenFor(start, previewOpens - 1), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, previewOpens - 1), false)`; it requires that observable game or persistence rule to match exactly.

### Line 104

```text
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, previewOpens), true)`; it requires that observable game or persistence rule to match exactly.

### Line 105

```text
  assert.equal(engine.isBettingOpenFor(start, previewOpens), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, previewOpens), true)`; it requires that observable game or persistence rule to match exactly.

### Line 106

```text
  assert.equal(engine.isBettingOpenFor(start, bettingCloses - 1), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses - 1), true)`; it requires that virtual-money and wager rule to match exactly.

### Line 107

```text
  assert.equal(engine.isRacePreviewOpenFor(start, bettingCloses), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, bettingCloses), true)`; it requires that virtual-money and wager rule to match exactly.

### Line 108

```text
  assert.equal(engine.isBettingOpenFor(start, bettingCloses), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses), false)`; it requires that virtual-money and wager rule to match exactly.

### Line 109

```text
  assert.equal(engine.isBettingOpenFor(start, bettingCloses + 60 * 1000), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses + 60 * 1000), false)`; it requires that virtual-money and wager rule to match exactly.

### Line 110

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 111

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 112

```text
test('overnight racing stays closed until the next 6:15 AM preview and betting window', () => {
```

This test names the behavior under protection: overnight racing stays closed until the next 6:15 AM preview and betting window.

### Line 113

```text
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 0 as milliseconds since 1970-01-01 UTC; stores the result in `ninePm`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 114

```text
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `nextMorning`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 115

```text
  const opensAt = new Date(2026, 9, 16, 6, 15).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 6; 15 as milliseconds since 1970-01-01 UTC; stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 116

```text
  for (const now of [
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 117

```text
    new Date(2026, 9, 15, 21, 6).getTime(),
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 6 as milliseconds since 1970-01-01 UTC.

### Line 118

```text
    new Date(2026, 9, 15, 23, 59, 59).getTime(),
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 23; 59; 59 as milliseconds since 1970-01-01 UTC.

### Line 119

```text
    opensAt - 1
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 120

```text
  ]) {
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 121

```text
    assert.equal(engine.getNextRaceStart(now), nextMorning);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(now), nextMorning)`; it requires that observable game or persistence rule to match exactly.

### Line 122

```text
    assert.equal(engine.getNextBettingOpen(now), opensAt);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextBettingOpen(now), opensAt)`; it requires that observable game or persistence rule to match exactly.

### Line 123

```text
    assert.equal(engine.isRacePreviewOpenFor(nextMorning, now), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(nextMorning, now), false)`; it requires that observable game or persistence rule to match exactly.

### Line 124

```text
    assert.equal(engine.canBetNow.call({ ticket: null, getNextRaceStart: engine.getNextRaceStart, isBettingOpenFor: engine.isBettingOpenFor }, now), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.canBetNow.call({ ticket: null, getNextRaceStart: engine.getNextRaceStart, isBettingOpenFor: engine.isBettingOpenFor }, now), false)`; it requires that observable game or persistence rule to match exactly.

### Line 125

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 126

```text
  assert.equal(engine.isRacePreviewOpenFor(nextMorning, opensAt), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(nextMorning, opensAt), true)`; it requires that observable game or persistence rule to match exactly.

### Line 127

```text
  assert.equal(engine.isBettingOpenFor(nextMorning, opensAt), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(nextMorning, opensAt), true)`; it requires that observable game or persistence rule to match exactly.

### Line 128

```text
  assert.equal(engine.getNextBettingOpen(opensAt - 1), opensAt);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextBettingOpen(opensAt - 1), opensAt)`; it requires that observable game or persistence rule to match exactly.

### Line 129

```text
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(ninePm), nextMorning)`; it requires that observable game or persistence rule to match exactly.

### Line 130

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 131

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 132

```text
test('closed race UI hides upcoming details and disables all betting actions', () => {
```

This test names the behavior under protection: closed race UI hides upcoming details and disables all betting actions.

### Line 133

```text
  const start = new Date(2026, 9, 16, 7, 0).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 134

```text
  const opensAt = start - 45 * 60 * 1000;
```

Subtracts multiplies multiplies 45 by 60 by 1000 from `start` (start); stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 135

```text
  const label = { textContent: '' };
```

An object with fields textContent: ""; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 136

```text
  const classes = new Set();
```

Constructs a new instance of `Set` with no arguments; stores the result in `classes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 137

```text
  const status = { textContent: '', classList: {
```

An object with fields textContent: ""; classList: an object with fields remove: a callback taking ...names that runs a callback taking name that `classes.delete(name)` once per item of `names` (names); add: a callback taking name that calls `classes.add` with `name` (name); stores the result in `status`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 138

```text
    remove: (...names) => names.forEach(name => classes.delete(name)),
```

Defines field remove as a callback taking ...names that runs a callback taking name that calls `classes.delete` with `name` (name) once per item of `names` (names).

### Line 139

```text
    add: name => classes.add(name)
```

Defines field add as a callback taking name that calls `classes.add` with `name` (name).

### Line 140

```text
  } };
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 141

```text
  const closed = Object.assign(Object.create(context.window.RaceEngine.prototype), {
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 142

```text
    isRacePreviewOpen: false,
```

Defines field isRacePreviewOpen as false.

### Line 143

```text
    isRaceInProgress: false,
```

Defines field isRaceInProgress as false.

### Line 144

```text
    isResultDisplay: false,
```

Defines field isResultDisplay as false.

### Line 145

```text
    raceTitleEl: { textContent: '' },
```

Defines field raceTitleEl as an object with fields textContent: "".

### Line 146

```text
    raceNumberEl: { textContent: '' },
```

Defines field raceNumberEl as an object with fields textContent: "".

### Line 147

```text
    phaseEl: { textContent: '' },
```

Defines field phaseEl as an object with fields textContent: "".

### Line 148

```text
    countdownEl: { textContent: '', parentElement: { querySelector: () => label } },
```

Defines field countdownEl as an object with fields textContent: ""; parentElement: an object with fields querySelector: a callback taking no parameters that `label` (label).

### Line 149

```text
    startTimeEl: { textContent: '' },
```

Defines field startTimeEl as an object with fields textContent: "".

### Line 150

```text
    raceDurationEl: { textContent: '' },
```

Defines field raceDurationEl as an object with fields textContent: "".

### Line 151

```text
    targetTextEl: { textContent: '' },
```

Defines field targetTextEl as an object with fields textContent: "".

### Line 152

```text
    trackCaptionEl: { textContent: '' },
```

Defines field trackCaptionEl as an object with fields textContent: "".

### Line 153

```text
    statusEl: status,
```

Defines field statusEl as `status` (status).

### Line 154

```text
    getNextBettingOpen: () => opensAt,
```

Defines field getNextBettingOpen as a callback taking no parameters that `opensAt` (opens at).

### Line 155

```text
    raceStartTime: () => '6:15 AM',
```

Defines field raceStartTime as a callback taking no parameters that "6:15 AM".

### Line 156

```text
    formatCountdown: () => '00:15:00'
```

Defines field formatCountdown as a callback taking no parameters that "00:15:00".

### Line 157

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 158

```text
  closed.updateClockAndStatus(null, null, opensAt - 15 * 60 * 1000, 0);
```

Calls `closed.updateClockAndStatus` with null; null; subtracts multiplies multiplies 15 by 60 by 1000 from `opensAt` (opens at); 0.

### Line 159

```text
  assert.equal(closed.raceTitleEl.textContent, 'Racing Closed');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceTitleEl.textContent, 'Racing Closed')`; it requires that deterministic racing rule to match exactly.

### Line 160

```text
  assert.equal(closed.raceNumberEl.textContent, '—');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceNumberEl.textContent, '—')`; it requires that deterministic racing rule to match exactly.

### Line 161

```text
  assert.equal(closed.phaseEl.textContent, 'CLOSED');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.phaseEl.textContent, 'CLOSED')`; it requires that player-facing UI guardrail to match exactly.

### Line 162

```text
  assert.equal(label.textContent, 'BETTING OPENS IN');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(label.textContent, 'BETTING OPENS IN')`; it requires that player-facing UI guardrail to match exactly.

### Line 163

```text
  assert.equal(closed.countdownEl.textContent, '00:15:00');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.countdownEl.textContent, '00:15:00')`; it requires that player-facing UI guardrail to match exactly.

### Line 164

```text
  assert.equal(closed.startTimeEl.textContent, '—');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.startTimeEl.textContent, '—')`; it requires that player-facing UI guardrail to match exactly.

### Line 165

```text
  assert.equal(closed.raceDurationEl.textContent, '—');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceDurationEl.textContent, '—')`; it requires that deterministic racing rule to match exactly.

### Line 166

```text
  assert.match(status.textContent, /^CLOSED — RACING RESUMES AT 6:15 AM$/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 167

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 168

```text
  const runnerList = { children: [{ name: 'leaked preview' }], replaceChildren() { this.children = []; }, setAttribute(name, value) { this[name] = value; } };
```

An object with fields children: an array containing an object with fields name: "leaked preview"; replaceChildren: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking name, value that runs its enclosed statements; stores the result in `runnerList`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 169

```text
  const track = { children: [{ name: 'leaked track' }], replaceChildren() { this.children = []; } };
```

An object with fields children: an array containing an object with fields name: "leaked track"; replaceChildren: a callback taking no parameters that runs its enclosed statements; stores the result in `track`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 170

```text
  closed.runnerListEl = runnerList;
```

Sets `closed.runnerListEl` (the runner list el property of closed) to `runnerList` (runner list).

### Line 171

```text
  closed.trackEl = track;
```

Sets `closed.trackEl` (the track el property of closed) to `track` (track).

### Line 172

```text
  closed.renderRunnerOptions(null);
```

Calls `closed.renderRunnerOptions` with null.

### Line 173

```text
  closed.renderTrack(null);
```

Calls `closed.renderTrack` with null.

### Line 174

```text
  assert.deepEqual(runnerList.children, []);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(runnerList.children, [])`; it requires that deterministic racing rule to match exactly.

### Line 175

```text
  assert.deepEqual(track.children, []);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(track.children, [])`; it requires that player-facing UI guardrail to match exactly.

### Line 176

```text
  assert.equal(runnerList['aria-label'], 'Race runners hidden until the preview opens');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(runnerList['aria-label'], 'Race runners hidden until the preview opens')`; it requires that deterministic racing rule to match exactly.

### Line 177

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 178

```text
  const makeButton = () => ({ disabled: false, textContent: '', listeners: {}, addEventListener(type, handler) { this.listeners[type] = handler; } });
```

A callback taking no parameters that an object with fields disabled: false; textContent: ""; listeners: an object with fields ; addEventListener: a callback taking type, handler that runs its enclosed statements; stores the result in `makeButton`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 179

```text
  const option = {
```

An object with fields dataset: an object with fields runnerId: "horse-copper-comet"; disabled: false; classList: an object with fields toggle: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking no parameters that runs its enclosed statements; stores the result in `option`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 180

```text
    dataset: { runnerId: 'horse-copper-comet' }, disabled: false,
```

Defines field dataset as an object with fields runnerId: "horse-copper-comet".

### Line 181

```text
    classList: { toggle() {} }, setAttribute() {}
```

Defines field classList as an object with fields toggle: a callback taking no parameters that runs its enclosed statements.

### Line 182

```text
  };
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 183

```text
  const runnerListWithOption = { addEventListener(type, handler) { this.listeners[type] = handler; }, listeners: {}, querySelectorAll: () => [option] };
```

An object with fields addEventListener: a callback taking type, handler that runs its enclosed statements; listeners: an object with fields ; querySelectorAll: a callback taking no parameters that an array containing `option` (option); stores the result in `runnerListWithOption`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 184

```text
  const controls = Object.assign(Object.create(context.window.RaceEngine.prototype), {
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 185

```text
    bet: 10, selectedHorseId: null, targetRaceId: start, raceType: 'horse',
```

Defines field bet as 10.

### Line 186

```text
    isRacePreviewOpen: false, isBettingOpen: false, ticket: null,
```

Defines field isRacePreviewOpen as false.

### Line 187

```text
    hub: { balance: 100, player: { maxBet: 100 } },
```

Defines field hub as an object with fields balance: 100; player: an object with fields maxBet: 100.

### Line 188

```text
    minusBtn: makeButton(), plusBtn: makeButton(), maxBtn: makeButton(), placeBtn: makeButton(),
```

Defines field minusBtn as calls `makeButton` with no arguments.

### Line 189

```text
    runnerListEl: runnerListWithOption, betDisplayEl: { textContent: '' }, estimatedReturnEl: { textContent: '' },
```

Defines field runnerListEl as `runnerListWithOption` (runner list with option).

### Line 190

```text
    canBetNow: () => false,
```

Defines field canBetNow as a callback taking no parameters that false.

### Line 191

```text
    maxStake: () => 100,
```

Defines field maxStake as a callback taking no parameters that 100.

### Line 192

```text
    formatMoney: amount => `$${amount.toFixed(2)}`,
```

Defines field formatMoney as a callback taking amount that a text template that combines fixed text with computed values formats `amount` (amount) as text with 2 digits after the decimal point.

### Line 193

```text
    createRace: () => ({ entrants: [{ id: 'horse-copper-comet', odds: 2 }] }),
```

Defines field createRace as a callback taking no parameters that an object with fields entrants: an array containing an object with fields id: "horse-copper-comet"; odds: 2.

### Line 194

```text
    getNextRaceStart: () => start
```

Defines field getNextRaceStart as a callback taking no parameters that `start` (start).

### Line 195

```text
  });
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 196

```text
  controls.bindEvents();
```

Calls `controls.bindEvents` with no arguments.

### Line 197

```text
  controls.updateRunnerSelection();
```

Calls `controls.updateRunnerSelection` with no arguments.

### Line 198

```text
  controls.updateBetControls();
```

Calls `controls.updateBetControls` with no arguments.

### Line 199

```text
  assert.equal(option.disabled, true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(option.disabled, true)`; it requires that player-facing UI guardrail to match exactly.

### Line 200

```text
  assert.equal(controls.minusBtn.disabled, true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.minusBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.

### Line 201

```text
  assert.equal(controls.plusBtn.disabled, true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.plusBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.

### Line 202

```text
  assert.equal(controls.maxBtn.disabled, true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.maxBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.

### Line 203

```text
  assert.equal(controls.placeBtn.disabled, true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.placeBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.

### Line 204

```text
  assert.equal(controls.placeBtn.textContent, 'RACING CLOSED');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.placeBtn.textContent, 'RACING CLOSED')`; it requires that player-facing UI guardrail to match exactly.

### Line 205

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 206

```text
  for (const button of [controls.minusBtn, controls.plusBtn, controls.maxBtn]) button.listeners.click();
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 207

```text
  option.disabled = false;
```

Sets `option.disabled` (the disabled property of option) to false.

### Line 208

```text
  runnerListWithOption.listeners.click({ target: { closest: () => option } });
```

Calls `runnerListWithOption.listeners.click` with an object with fields target: an object with fields closest: a callback taking no parameters that `option` (option).

### Line 209

```text
  assert.equal(controls.selectedHorseId, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.selectedHorseId, null)`; it requires that observable game or persistence rule to match exactly.

### Line 210

```text
  controls.selectedHorseId = 'horse-copper-comet';
```

Sets `controls.selectedHorseId` (the selected horse id property of controls) to "horse-copper-comet".

### Line 211

```text
  controls.placeBtn.listeners.click();
```

Calls `controls.placeBtn.listeners.click` with no arguments.

### Line 212

```text
  assert.equal(controls.bet, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.bet, 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 213

```text
  assert.equal(controls.selectedHorseId, 'horse-copper-comet');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.selectedHorseId, 'horse-copper-comet')`; it requires that observable game or persistence rule to match exactly.

### Line 214

```text
  assert.equal(controls.hub.balance, 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.hub.balance, 100)`; it requires that virtual-money and wager rule to match exactly.

### Line 215

```text
  assert.equal(controls.ticket, null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.ticket, null)`; it requires that observable game or persistence rule to match exactly.

### Line 216

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 217

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 218

```text
test('race starts and wins change a returning runner’s simulated win chance', () => {
```

This test names the behavior under protection: race starts and wins change a returning runner’s simulated win chance.

### Line 219

```text
  const eventId = new Date(2026, 9, 15, 15).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 15 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 220

```text
  engine.experience = { horse: { runners: {} }, car: { runners: {} } };
```

Sets `engine.experience` (the experience property of engine) to an object with fields horse: an object with fields runners: an object with fields ; car: an object with fields runners: an object with fields .

### Line 221

```text
  const noviceRace = engine.createRace(eventId, 'horse');
```

Calls `engine.createRace` with `eventId` (event id); "horse"; stores the result in `noviceRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 222

```text
  const returningRunner = noviceRace.entrants[0];
```

The entry at index/key 0 in `noviceRace.entrants` (the entrants property of noviceRace); stores the result in `returningRunner`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 223

```text
  const noviceChance = returningRunner.winProbability;
```

`returningRunner.winProbability` (the win probability property of returningRunner); stores the result in `noviceChance`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 224

```text
  engine.experience.horse.runners[returningRunner.id] = { starts: 100, wins: 50 };
```

Sets the entry at index/key `returningRunner.id` (the id property of returningRunner) in `engine.experience.horse.runners` (the runners property of engine.experience.horse) to an object with fields starts: 100; wins: 50.

### Line 225

```text
  const experiencedRace = engine.createRace(eventId, 'horse');
```

Calls `engine.createRace` with `eventId` (event id); "horse"; stores the result in `experiencedRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 226

```text
  const experiencedRunner = experiencedRace.entrants.find(runner => runner.id === returningRunner.id);
```

Returns the first item of `experiencedRace.entrants` (the entrants property of experiencedRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `returningRunner.id` (the id property of returningRunner) have the same value and type, or undefined; stores the result in `experiencedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 227

```text
  assert.ok(experiencedRunner.winProbability > noviceChance);
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 228

```text
  assert.equal(experiencedRunner.starts, 100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(experiencedRunner.starts, 100)`; it requires that deterministic racing rule to match exactly.

### Line 229

```text
  assert.equal(experiencedRunner.wins, 50);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(experiencedRunner.wins, 50)`; it requires that deterministic racing rule to match exactly.

### Line 230

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 231

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 232

```text
test('completed scheduled races advance starts and win records on both circuits', () => {
```

This test names the behavior under protection: completed scheduled races advance starts and win records on both circuits.

### Line 233

```text
  const previousEvening = new Date(2026, 9, 15, 21).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 15; 21 as milliseconds since 1970-01-01 UTC; stores the result in `previousEvening`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 234

```text
  const morningRace = new Date(2026, 9, 16, 7).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 7 as milliseconds since 1970-01-01 UTC; stores the result in `morningRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 235

```text
  const nextCircuitRace = new Date(2026, 9, 16, 8).getTime();
```

Gets constructs a new instance of `Date` with 2026; 9; 16; 8 as milliseconds since 1970-01-01 UTC; stores the result in `nextCircuitRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 236

```text
  const now = nextCircuitRace + 200_001;
```

Adds `nextCircuitRace` (next circuit race) and 200001 (or joins them if a value is text); stores the result in `now`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 237

```text
  engine.experience = {
```

Sets `engine.experience` (the experience property of engine) to an object with fields horse: an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields ; car: an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .

### Line 238

```text
    horse: { lastProcessedRaceId: previousEvening, runners: {} },
```

Defines field horse as an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .

### Line 239

```text
    car: { lastProcessedRaceId: previousEvening, runners: {} }
```

Defines field car as an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .

### Line 240

```text
  };
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 241

```text
  let saveCount = 0;
```

0; stores the result in `saveCount`. let allows the binding to be reassigned.

### Line 242

```text
  engine.saveExperience = () => { saveCount += 1; };
```

Sets `engine.saveExperience` (the save experience property of engine) to a callback taking no parameters that runs its enclosed statements.

### Line 243

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 244

```text
  engine.processCompletedRaces(now);
```

Calls `engine.processCompletedRaces` with `now` (now).

### Line 245

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 246

```text
  for (const [type, expectedStarts, expectedLastRaceId] of [
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 247

```text
    ['horse', 6, morningRace],
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 248

```text
    ['car', 8, nextCircuitRace]
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 249

```text
  ]) {
```

This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.

### Line 250

```text
    const circuit = engine.experience[type];
```

The entry at index/key `type` (type) in `engine.experience` (the experience property of engine); stores the result in `circuit`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 251

```text
    const totals = Object.values(circuit.runners).reduce((total, runner) => ({
```

Combines the items of lists the own property values of `circuit.runners` (the runners property of circuit) with a callback taking total, runner that an object with fields starts: adds `total.starts` (the starts property of total) and `runner.starts` (the starts property of runner) (or joins them if a value is text); wins: adds `total.wins` (the wins property of total) and `runner.wins` (the wins property of runner) (or joins them if a value is text), starting with an object with fields starts: 0; wins: 0; stores the result in `totals`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 252

```text
      starts: total.starts + runner.starts,
```

Defines field starts as adds `total.starts` (the starts property of total) and `runner.starts` (the starts property of runner) (or joins them if a value is text).

### Line 253

```text
      wins: total.wins + runner.wins
```

Defines field wins as adds `total.wins` (the wins property of total) and `runner.wins` (the wins property of runner) (or joins them if a value is text).

### Line 254

```text
    }), { starts: 0, wins: 0 });
```

Defines field starts as 0.

### Line 255

```text
    assert.equal(circuit.lastProcessedRaceId, expectedLastRaceId);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(circuit.lastProcessedRaceId, expectedLastRaceId)`; it requires that observable game or persistence rule to match exactly.

### Line 256

```text
    assert.equal(totals.starts, expectedStarts);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(totals.starts, expectedStarts)`; it requires that deterministic racing rule to match exactly.

### Line 257

```text
    assert.equal(totals.wins, 1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(totals.wins, 1)`; it requires that deterministic racing rule to match exactly.

### Line 258

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 259

```text
  assert.equal(saveCount, 1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(saveCount, 1)`; it requires that observable game or persistence rule to match exactly.

### Line 260

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 261

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 262

```text
test('legacy horse race results remain reproducible for existing saved tickets', () => {
```

This test names the behavior under protection: legacy horse race results remain reproducible for existing saved tickets.

### Line 263

```text
  const eventId = 123_456_000;
```

123456000; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 264

```text
  const first = engine.createLegacyRace(eventId);
```

Calls `engine.createLegacyRace` with `eventId` (event id); stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 265

```text
  const second = engine.createLegacyRace(eventId);
```

Calls `engine.createLegacyRace` with `eventId` (event id); stores the result in `second`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 266

```text
  assert.equal(first.winnerId, second.winnerId);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(first.winnerId, second.winnerId)`; it requires that deterministic racing rule to match exactly.

### Line 267

```text
  assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id)`; it requires that deterministic racing rule to match exactly.

### Line 268

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 269

```text
test('race Max uses remaining cents; Clear Bet changes neither balance nor a placed ticket', () => {
```

This test names the behavior under protection: race Max uses remaining cents; Clear Bet changes neither balance nor a placed ticket.

### Line 270

```text
  const race=Object.create(context.window.RaceEngine.prototype);const listeners={};
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 271

```text
  const button=name=>({addEventListener:(_event,fn)=>{listeners[name]=fn;}});
```

A callback taking name that an object with fields addEventListener: a callback taking _event, fn that runs its enclosed statements; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 272

```text
  Object.assign(race,{hub:{balance:43.27,player:{maxBet:100}},bet:10,maxBtn:button('max'),clearBtn:button('clear'),modeButtons:[],canBetNow:()=>!race.ticket,updateBetControls(){}});
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 273

```text
  race.bindEvents();listeners.max();assert.equal(race.bet,43.27);assert.equal(race.hub.balance,43.27);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,43.27)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.hub.balance,43.27)`; it requires that virtual-money and wager rule to match exactly.

### Line 274

```text
  listeners.clear();assert.equal(race.bet,0);assert.equal(race.hub.balance,43.27);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,0)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.hub.balance,43.27)`; it requires that virtual-money and wager rule to match exactly.

### Line 275

```text
  race.ticket={stake:10};race.bet=10;listeners.clear();listeners.max();assert.equal(race.bet,10);assert.equal(race.ticket.stake,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,10)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.ticket.stake,10)`; it requires that virtual-money and wager rule to match exactly.

### Line 276

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
