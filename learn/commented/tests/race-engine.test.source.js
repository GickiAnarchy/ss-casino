// Original L1: This comment defines the test boundary and explains why the isolated fixture is safe: Headless tests exercise seeded race generation, schedules, recovery, and UI guardrails without changing a real profile.
// Headless tests exercise seeded race generation, schedules, recovery, and UI guardrails without changing a real profile.
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L4: This imports node:path so the test exercises the real game/persistence API rather than a duplicate.
const path = require('node:path');
// Original L5: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L6: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L7: Blank line separates test setup from the next scenario for readability.

// Original L8: An object with fields window: an object with fields ; document: an object with fields ; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
const context = { window: {}, document: {} };
// Original L9: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/race-engine.js'), 'utf8'), context);
// Original L10: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
const engine = Object.create(context.window.RaceEngine.prototype);
// Original L11: Blank line separates test setup from the next scenario for readability.

// Original L12: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function finalTrackPositions(race) {
// Original L13: Transforms each item of `race.entrants` (the entrants property of race) using a callback taking runner that runs its enclosed statements and returns a new array; stores the result in `lanes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const lanes = race.entrants.map(runner => {
// Original L14: An object with fields style: an object with fields ; stores the result in `token`. const prevents reassignment of this binding, not mutation inside its object/array.
    const token = { style: {} };
// Original L15: Returns an object with fields dataset: an object with fields runnerId: `runner.id` (the id property of runner); querySelector: a callback taking no parameters that `token` (token); classList: an object with fields toggle: a callback taking no parameters that runs its enclosed statements; token: `token` (token) to the caller and exits this function.
    return {
// Original L16: Defines field dataset as an object with fields runnerId: `runner.id` (the id property of runner).
      dataset: { runnerId: runner.id },
// Original L17: Defines field querySelector as a callback taking no parameters that `token` (token).
      querySelector: () => token,
// Original L18: Defines field classList as an object with fields toggle: a callback taking no parameters that runs its enclosed statements.
      classList: { toggle() {} },
// Original L19: Defines field token as `token` (token).
      token
// Original L20: This closes the test/helper block containing the setup and its behavior checks.
    };
// Original L21: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L22: Sets `engine.trackEl` (the track el property of engine) to an object with fields querySelectorAll: a callback taking no parameters that `lanes` (lanes).
  engine.trackEl = { querySelectorAll: () => lanes };
// Original L23: Calls `engine.updateTrackPositions` with `race` (race); 1; true.
  engine.updateTrackPositions(race, 1, true);
// Original L24: Returns constructs a new instance of `Map` with transforms each item of `lanes` (lanes) using a callback taking lane that an array containing `lane.dataset.runnerId` (the runner id property of lane.dataset), calls `Number.parseFloat` with `lane.token.style.left` and returns a new array to the caller and exits this function.
  return new Map(lanes.map(lane => [lane.dataset.runnerId, Number.parseFloat(lane.token.style.left)]));
// Original L25: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L26: Blank line separates test setup from the next scenario for readability.

// Original L27: This test names the behavior under protection: horse fields contain six entrants and car fields contain eight unique entrants from larger stables.
test('horse fields contain six entrants and car fields contain eight unique entrants from larger stables', () => {
// Original L28: Gets constructs a new instance of `Date` with 2026; 9; 15; 9 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eventId = new Date(2026, 9, 15, 9).getTime();
// Original L29: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const [type, expectedFieldSize] of [['horse', 6], ['car', 8]]) {
// Original L30: Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.
    const race = engine.createRace(eventId, type);
// Original L31: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.entrants.length, expectedFieldSize)`; it requires that deterministic racing rule to match exactly.
    assert.equal(race.entrants.length, expectedFieldSize);
// Original L32: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(race.entrants.map(runner => runner.id)).size, expectedFieldSize)`; it requires that deterministic racing rule to match exactly.
    assert.equal(new Set(race.entrants.map(runner => runner.id)).size, expectedFieldSize);
// Original L33: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
    assert.ok(race.entrants.every(runner => runner.id.startsWith(`${type}-`)));
// Original L34: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L35: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L36: Blank line separates test setup from the next scenario for readability.

// Original L37: This test names the behavior under protection: race fields, odds, and winner are deterministic for a scheduled race.
test('race fields, odds, and winner are deterministic for a scheduled race', () => {
// Original L38: Gets constructs a new instance of `Date` with 2026; 9; 15; 11 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eventId = new Date(2026, 9, 15, 11).getTime();
// Original L39: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const type of ['horse', 'car']) {
// Original L40: Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.
    const first = engine.createRace(eventId, type);
// Original L41: Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `second`. const prevents reassignment of this binding, not mutation inside its object/array.
    const second = engine.createRace(eventId, type);
// Original L42: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(first.winnerId, second.winnerId)`; it requires that deterministic racing rule to match exactly.
    assert.equal(first.winnerId, second.winnerId);
// Original L43: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id)`; it requires that deterministic racing rule to match exactly.
    assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
// Original L44: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.odds), second.entrants.map(runner => runner.odds)`; it requires that deterministic racing rule to match exactly.
    assert.deepEqual(first.entrants.map(runner => runner.odds), second.entrants.map(runner => runner.odds));
// Original L45: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L46: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L47: Blank line separates test setup from the next scenario for readability.

// Original L48: This test names the behavior under protection: existing explicitly typed tickets reconstruct their original race outcome.
test('existing explicitly typed tickets reconstruct their original race outcome', () => {
// Original L49: Gets constructs a new instance of `Date` with 2026; 9; 15; 9 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eventId = new Date(2026, 9, 15, 9).getTime();
// Original L50: Calls `engine.createRace` with `eventId` (event id); "car"; stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.
  const race = engine.createRace(eventId, 'car');
// Original L51: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.durationMs, 139_000)`; it requires that deterministic racing rule to match exactly.
  assert.equal(race.durationMs, 139_000);
// Original L52: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.winnerId, 'car-turbo-tiger')`; it requires that deterministic racing rule to match exactly.
  assert.equal(race.winnerId, 'car-turbo-tiger');
// Original L53: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.entrants.map(runner => runner.id).join(','), 'car-lime-machine,car-turbo-tiger,car-ironclad,car-drift-king,car-blue-lightning,car-desert-fox,car-pink-nitro,car-midnight-rally')`; it requires that deterministic racing rule to match exactly.
  assert.equal(race.entrants.map(runner => runner.id).join(','), 'car-lime-machine,car-turbo-tiger,car-ironclad,car-drift-king,car-blue-lightning,car-desert-fox,car-pink-nitro,car-midnight-rally');
// Original L54: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L55: Blank line separates test setup from the next scenario for readability.

// Original L56: This test names the behavior under protection: the selected winner is furthest along the track at the finish.
test('the selected winner is furthest along the track at the finish', () => {
// Original L57: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (let raceNumber = 1; raceNumber <= 500; raceNumber += 1) {
// Original L58: Multiplies multiplies multiplies multiplies `raceNumber` (race number) by 2 by 60 by 60 by 1000; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const eventId = raceNumber * 2 * 60 * 60 * 1000;
// Original L59: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
    for (const type of ['horse', 'car']) {
// Original L60: Calls `engine.createRace` with `eventId` (event id); `type` (type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.
      const race = engine.createRace(eventId, type);
// Original L61: Calls `finalTrackPositions` with `race` (race); stores the result in `positions`. const prevents reassignment of this binding, not mutation inside its object/array.
      const positions = finalTrackPositions(race);
// Original L62: Calls `positions.get` with `race.winnerId` (the winner id property of race); stores the result in `winnerPosition`. const prevents reassignment of this binding, not mutation inside its object/array.
      const winnerPosition = positions.get(race.winnerId);
// Original L63: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
      assert.ok(winnerPosition >= 97, `${type} race ${raceNumber}: winner should reach the finish line`);
// Original L64: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
      for (const [runnerId, position] of positions) {
// Original L65: Checks whether checks that `runnerId` (runner id) and `race.winnerId` (the winner id property of race) differ in value or type; runs the following statement/block only when truthy.
        if (runnerId !== race.winnerId) {
// Original L66: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
          assert.ok(winnerPosition > position, `${type} race ${raceNumber}: winner should finish ahead of ${runnerId}`);
// Original L67: This closes the test/helper block containing the setup and its behavior checks.
        }
// Original L68: This closes the test/helper block containing the setup and its behavior checks.
      }
// Original L69: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L70: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L71: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L72: Blank line separates test setup from the next scenario for readability.

// Original L73: This test names the behavior under protection: the local schedule runs hourly from 7 AM to 9 PM and skips overnight.
test('the local schedule runs hourly from 7 AM to 9 PM and skips overnight', () => {
// Original L74: Gets constructs a new instance of `Date` with 2026; 9; 15; 6; 59 as milliseconds since 1970-01-01 UTC; stores the result in `earlyMorning`. const prevents reassignment of this binding, not mutation inside its object/array.
  const earlyMorning = new Date(2026, 9, 15, 6, 59).getTime();
// Original L75: Gets constructs a new instance of `Date` with 2026; 9; 15; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `sevenAm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const sevenAm = new Date(2026, 9, 15, 7, 0).getTime();
// Original L76: Gets constructs a new instance of `Date` with 2026; 9; 15; 8; 0 as milliseconds since 1970-01-01 UTC; stores the result in `eightAm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eightAm = new Date(2026, 9, 15, 8, 0).getTime();
// Original L77: Gets constructs a new instance of `Date` with 2026; 9; 15; 10; 0 as milliseconds since 1970-01-01 UTC; stores the result in `tenAm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const tenAm = new Date(2026, 9, 15, 10, 0).getTime();
// Original L78: Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 0 as milliseconds since 1970-01-01 UTC; stores the result in `ninePm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
// Original L79: Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `nextMorning`. const prevents reassignment of this binding, not mutation inside its object/array.
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
// Original L80: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm);
// Original L81: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(sevenAm), eightAm)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextRaceStart(sevenAm), eightAm);
// Original L82: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(ninePm), nextMorning)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
// Original L83: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm);
// Original L84: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), tenAm)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), tenAm);
// Original L85: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L86: Blank line separates test setup from the next scenario for readability.

// Original L87: This test names the behavior under protection: horse and car races alternate on every daytime hourly slot.
test('horse and car races alternate on every daytime hourly slot', () => {
// Original L88: Gets constructs a new instance of `Date` with 2026; 9; 15; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = new Date(2026, 9, 15, 7, 0).getTime();
// Original L89: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (let slotIndex = 0; slotIndex < 15; slotIndex += 1) {
// Original L90: Adds `start` (start) and multiplies multiplies multiplies `slotIndex` (slot index) by 60 by 60 by 1000 (or joins them if a value is text); stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
    const eventId = start + slotIndex * 60 * 60 * 1000;
// Original L91: Checks checks that takes the remainder of `slotIndex` (slot index) divided by 2 and 0 have the same value and type; if true chooses "horse", otherwise "car"; stores the result in `expectedType`. const prevents reassignment of this binding, not mutation inside its object/array.
    const expectedType = slotIndex % 2 === 0 ? 'horse' : 'car';
// Original L92: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceType(eventId), expectedType)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.getScheduledRaceType(eventId), expectedType);
// Original L93: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.createRace(eventId).type, expectedType)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.createRace(eventId).type, expectedType);
// Original L94: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L95: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getScheduledRaceType(new Date(2026, 9, 16, 7, 0).getTime()), 'horse')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getScheduledRaceType(new Date(2026, 9, 16, 7, 0).getTime()), 'horse');
// Original L96: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L97: Blank line separates test setup from the next scenario for readability.

// Original L98: This test names the behavior under protection: race previews and betting open 45 minutes before each race; betting closes five minutes before start.
test('race previews and betting open 45 minutes before each race; betting closes five minutes before start', () => {
// Original L99: Gets constructs a new instance of `Date` with 2026; 9; 15; 13; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = new Date(2026, 9, 15, 13, 0).getTime();
// Original L100: Subtracts multiplies multiplies 45 by 60 by 1000 from `start` (start); stores the result in `previewOpens`. const prevents reassignment of this binding, not mutation inside its object/array.
  const previewOpens = start - 45 * 60 * 1000;
// Original L101: Subtracts multiplies multiplies 5 by 60 by 1000 from `start` (start); stores the result in `bettingCloses`. const prevents reassignment of this binding, not mutation inside its object/array.
  const bettingCloses = start - 5 * 60 * 1000;
// Original L102: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, previewOpens - 1), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens - 1), false);
// Original L103: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, previewOpens - 1), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isBettingOpenFor(start, previewOpens - 1), false);
// Original L104: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, previewOpens), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens), true);
// Original L105: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, previewOpens), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isBettingOpenFor(start, previewOpens), true);
// Original L106: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses - 1), true)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(engine.isBettingOpenFor(start, bettingCloses - 1), true);
// Original L107: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(start, bettingCloses), true)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(engine.isRacePreviewOpenFor(start, bettingCloses), true);
// Original L108: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses), false)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(engine.isBettingOpenFor(start, bettingCloses), false);
// Original L109: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(start, bettingCloses + 60 * 1000), false)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(engine.isBettingOpenFor(start, bettingCloses + 60 * 1000), false);
// Original L110: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L111: Blank line separates test setup from the next scenario for readability.

// Original L112: This test names the behavior under protection: overnight racing stays closed until the next 6:15 AM preview and betting window.
test('overnight racing stays closed until the next 6:15 AM preview and betting window', () => {
// Original L113: Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 0 as milliseconds since 1970-01-01 UTC; stores the result in `ninePm`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
// Original L114: Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `nextMorning`. const prevents reassignment of this binding, not mutation inside its object/array.
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
// Original L115: Gets constructs a new instance of `Date` with 2026; 9; 16; 6; 15 as milliseconds since 1970-01-01 UTC; stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.
  const opensAt = new Date(2026, 9, 16, 6, 15).getTime();
// Original L116: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const now of [
// Original L117: Gets constructs a new instance of `Date` with 2026; 9; 15; 21; 6 as milliseconds since 1970-01-01 UTC.
    new Date(2026, 9, 15, 21, 6).getTime(),
// Original L118: Gets constructs a new instance of `Date` with 2026; 9; 15; 23; 59; 59 as milliseconds since 1970-01-01 UTC.
    new Date(2026, 9, 15, 23, 59, 59).getTime(),
// Original L119: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
    opensAt - 1
// Original L120: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
  ]) {
// Original L121: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(now), nextMorning)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.getNextRaceStart(now), nextMorning);
// Original L122: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextBettingOpen(now), opensAt)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.getNextBettingOpen(now), opensAt);
// Original L123: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(nextMorning, now), false)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.isRacePreviewOpenFor(nextMorning, now), false);
// Original L124: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.canBetNow.call({ ticket: null, getNextRaceStart: engine.getNextRaceStart, isBettingOpenFor: engine.isBettingOpenFor }, now), false)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(engine.canBetNow.call({ ticket: null, getNextRaceStart: engine.getNextRaceStart, isBettingOpenFor: engine.isBettingOpenFor }, now), false);
// Original L125: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L126: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isRacePreviewOpenFor(nextMorning, opensAt), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isRacePreviewOpenFor(nextMorning, opensAt), true);
// Original L127: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.isBettingOpenFor(nextMorning, opensAt), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.isBettingOpenFor(nextMorning, opensAt), true);
// Original L128: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextBettingOpen(opensAt - 1), opensAt)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextBettingOpen(opensAt - 1), opensAt);
// Original L129: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(engine.getNextRaceStart(ninePm), nextMorning)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
// Original L130: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L131: Blank line separates test setup from the next scenario for readability.

// Original L132: This test names the behavior under protection: closed race UI hides upcoming details and disables all betting actions.
test('closed race UI hides upcoming details and disables all betting actions', () => {
// Original L133: Gets constructs a new instance of `Date` with 2026; 9; 16; 7; 0 as milliseconds since 1970-01-01 UTC; stores the result in `start`. const prevents reassignment of this binding, not mutation inside its object/array.
  const start = new Date(2026, 9, 16, 7, 0).getTime();
// Original L134: Subtracts multiplies multiplies 45 by 60 by 1000 from `start` (start); stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.
  const opensAt = start - 45 * 60 * 1000;
// Original L135: An object with fields textContent: ""; stores the result in `label`. const prevents reassignment of this binding, not mutation inside its object/array.
  const label = { textContent: '' };
// Original L136: Constructs a new instance of `Set` with no arguments; stores the result in `classes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const classes = new Set();
// Original L137: An object with fields textContent: ""; classList: an object with fields remove: a callback taking ...names that runs a callback taking name that `classes.delete(name)` once per item of `names` (names); add: a callback taking name that calls `classes.add` with `name` (name); stores the result in `status`. const prevents reassignment of this binding, not mutation inside its object/array.
  const status = { textContent: '', classList: {
// Original L138: Defines field remove as a callback taking ...names that runs a callback taking name that calls `classes.delete` with `name` (name) once per item of `names` (names).
    remove: (...names) => names.forEach(name => classes.delete(name)),
// Original L139: Defines field add as a callback taking name that calls `classes.add` with `name` (name).
    add: name => classes.add(name)
// Original L140: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
  } };
// Original L141: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const closed = Object.assign(Object.create(context.window.RaceEngine.prototype), {
// Original L142: Defines field isRacePreviewOpen as false.
    isRacePreviewOpen: false,
// Original L143: Defines field isRaceInProgress as false.
    isRaceInProgress: false,
// Original L144: Defines field isResultDisplay as false.
    isResultDisplay: false,
// Original L145: Defines field raceTitleEl as an object with fields textContent: "".
    raceTitleEl: { textContent: '' },
// Original L146: Defines field raceNumberEl as an object with fields textContent: "".
    raceNumberEl: { textContent: '' },
// Original L147: Defines field phaseEl as an object with fields textContent: "".
    phaseEl: { textContent: '' },
// Original L148: Defines field countdownEl as an object with fields textContent: ""; parentElement: an object with fields querySelector: a callback taking no parameters that `label` (label).
    countdownEl: { textContent: '', parentElement: { querySelector: () => label } },
// Original L149: Defines field startTimeEl as an object with fields textContent: "".
    startTimeEl: { textContent: '' },
// Original L150: Defines field raceDurationEl as an object with fields textContent: "".
    raceDurationEl: { textContent: '' },
// Original L151: Defines field targetTextEl as an object with fields textContent: "".
    targetTextEl: { textContent: '' },
// Original L152: Defines field trackCaptionEl as an object with fields textContent: "".
    trackCaptionEl: { textContent: '' },
// Original L153: Defines field statusEl as `status` (status).
    statusEl: status,
// Original L154: Defines field getNextBettingOpen as a callback taking no parameters that `opensAt` (opens at).
    getNextBettingOpen: () => opensAt,
// Original L155: Defines field raceStartTime as a callback taking no parameters that "6:15 AM".
    raceStartTime: () => '6:15 AM',
// Original L156: Defines field formatCountdown as a callback taking no parameters that "00:15:00".
    formatCountdown: () => '00:15:00'
// Original L157: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L158: Calls `closed.updateClockAndStatus` with null; null; subtracts multiplies multiplies 15 by 60 by 1000 from `opensAt` (opens at); 0.
  closed.updateClockAndStatus(null, null, opensAt - 15 * 60 * 1000, 0);
// Original L159: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceTitleEl.textContent, 'Racing Closed')`; it requires that deterministic racing rule to match exactly.
  assert.equal(closed.raceTitleEl.textContent, 'Racing Closed');
// Original L160: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceNumberEl.textContent, '—')`; it requires that deterministic racing rule to match exactly.
  assert.equal(closed.raceNumberEl.textContent, '—');
// Original L161: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.phaseEl.textContent, 'CLOSED')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(closed.phaseEl.textContent, 'CLOSED');
// Original L162: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(label.textContent, 'BETTING OPENS IN')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(label.textContent, 'BETTING OPENS IN');
// Original L163: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.countdownEl.textContent, '00:15:00')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(closed.countdownEl.textContent, '00:15:00');
// Original L164: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.startTimeEl.textContent, '—')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(closed.startTimeEl.textContent, '—');
// Original L165: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(closed.raceDurationEl.textContent, '—')`; it requires that deterministic racing rule to match exactly.
  assert.equal(closed.raceDurationEl.textContent, '—');
// Original L166: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(status.textContent, /^CLOSED — RACING RESUMES AT 6:15 AM$/);
// Original L167: Blank line separates test setup from the next scenario for readability.

// Original L168: An object with fields children: an array containing an object with fields name: "leaked preview"; replaceChildren: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking name, value that runs its enclosed statements; stores the result in `runnerList`. const prevents reassignment of this binding, not mutation inside its object/array.
  const runnerList = { children: [{ name: 'leaked preview' }], replaceChildren() { this.children = []; }, setAttribute(name, value) { this[name] = value; } };
// Original L169: An object with fields children: an array containing an object with fields name: "leaked track"; replaceChildren: a callback taking no parameters that runs its enclosed statements; stores the result in `track`. const prevents reassignment of this binding, not mutation inside its object/array.
  const track = { children: [{ name: 'leaked track' }], replaceChildren() { this.children = []; } };
// Original L170: Sets `closed.runnerListEl` (the runner list el property of closed) to `runnerList` (runner list).
  closed.runnerListEl = runnerList;
// Original L171: Sets `closed.trackEl` (the track el property of closed) to `track` (track).
  closed.trackEl = track;
// Original L172: Calls `closed.renderRunnerOptions` with null.
  closed.renderRunnerOptions(null);
// Original L173: Calls `closed.renderTrack` with null.
  closed.renderTrack(null);
// Original L174: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(runnerList.children, [])`; it requires that deterministic racing rule to match exactly.
  assert.deepEqual(runnerList.children, []);
// Original L175: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(track.children, [])`; it requires that player-facing UI guardrail to match exactly.
  assert.deepEqual(track.children, []);
// Original L176: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(runnerList['aria-label'], 'Race runners hidden until the preview opens')`; it requires that deterministic racing rule to match exactly.
  assert.equal(runnerList['aria-label'], 'Race runners hidden until the preview opens');
// Original L177: Blank line separates test setup from the next scenario for readability.

// Original L178: A callback taking no parameters that an object with fields disabled: false; textContent: ""; listeners: an object with fields ; addEventListener: a callback taking type, handler that runs its enclosed statements; stores the result in `makeButton`. const prevents reassignment of this binding, not mutation inside its object/array.
  const makeButton = () => ({ disabled: false, textContent: '', listeners: {}, addEventListener(type, handler) { this.listeners[type] = handler; } });
// Original L179: An object with fields dataset: an object with fields runnerId: "horse-copper-comet"; disabled: false; classList: an object with fields toggle: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking no parameters that runs its enclosed statements; stores the result in `option`. const prevents reassignment of this binding, not mutation inside its object/array.
  const option = {
// Original L180: Defines field dataset as an object with fields runnerId: "horse-copper-comet".
    dataset: { runnerId: 'horse-copper-comet' }, disabled: false,
// Original L181: Defines field classList as an object with fields toggle: a callback taking no parameters that runs its enclosed statements.
    classList: { toggle() {} }, setAttribute() {}
// Original L182: This closes the test/helper block containing the setup and its behavior checks.
  };
// Original L183: An object with fields addEventListener: a callback taking type, handler that runs its enclosed statements; listeners: an object with fields ; querySelectorAll: a callback taking no parameters that an array containing `option` (option); stores the result in `runnerListWithOption`. const prevents reassignment of this binding, not mutation inside its object/array.
  const runnerListWithOption = { addEventListener(type, handler) { this.listeners[type] = handler; }, listeners: {}, querySelectorAll: () => [option] };
// Original L184: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const controls = Object.assign(Object.create(context.window.RaceEngine.prototype), {
// Original L185: Defines field bet as 10.
    bet: 10, selectedHorseId: null, targetRaceId: start, raceType: 'horse',
// Original L186: Defines field isRacePreviewOpen as false.
    isRacePreviewOpen: false, isBettingOpen: false, ticket: null,
// Original L187: Defines field hub as an object with fields balance: 100; player: an object with fields maxBet: 100.
    hub: { balance: 100, player: { maxBet: 100 } },
// Original L188: Defines field minusBtn as calls `makeButton` with no arguments.
    minusBtn: makeButton(), plusBtn: makeButton(), maxBtn: makeButton(), placeBtn: makeButton(),
// Original L189: Defines field runnerListEl as `runnerListWithOption` (runner list with option).
    runnerListEl: runnerListWithOption, betDisplayEl: { textContent: '' }, estimatedReturnEl: { textContent: '' },
// Original L190: Defines field canBetNow as a callback taking no parameters that false.
    canBetNow: () => false,
// Original L191: Defines field maxStake as a callback taking no parameters that 100.
    maxStake: () => 100,
// Original L192: Defines field formatMoney as a callback taking amount that a text template that combines fixed text with computed values formats `amount` (amount) as text with 2 digits after the decimal point.
    formatMoney: amount => `$${amount.toFixed(2)}`,
// Original L193: Defines field createRace as a callback taking no parameters that an object with fields entrants: an array containing an object with fields id: "horse-copper-comet"; odds: 2.
    createRace: () => ({ entrants: [{ id: 'horse-copper-comet', odds: 2 }] }),
// Original L194: Defines field getNextRaceStart as a callback taking no parameters that `start` (start).
    getNextRaceStart: () => start
// Original L195: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L196: Calls `controls.bindEvents` with no arguments.
  controls.bindEvents();
// Original L197: Calls `controls.updateRunnerSelection` with no arguments.
  controls.updateRunnerSelection();
// Original L198: Calls `controls.updateBetControls` with no arguments.
  controls.updateBetControls();
// Original L199: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(option.disabled, true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(option.disabled, true);
// Original L200: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.minusBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(controls.minusBtn.disabled, true);
// Original L201: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.plusBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(controls.plusBtn.disabled, true);
// Original L202: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.maxBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(controls.maxBtn.disabled, true);
// Original L203: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.placeBtn.disabled, true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(controls.placeBtn.disabled, true);
// Original L204: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.placeBtn.textContent, 'RACING CLOSED')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(controls.placeBtn.textContent, 'RACING CLOSED');
// Original L205: Blank line separates test setup from the next scenario for readability.

// Original L206: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const button of [controls.minusBtn, controls.plusBtn, controls.maxBtn]) button.listeners.click();
// Original L207: Sets `option.disabled` (the disabled property of option) to false.
  option.disabled = false;
// Original L208: Calls `runnerListWithOption.listeners.click` with an object with fields target: an object with fields closest: a callback taking no parameters that `option` (option).
  runnerListWithOption.listeners.click({ target: { closest: () => option } });
// Original L209: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.selectedHorseId, null)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(controls.selectedHorseId, null);
// Original L210: Sets `controls.selectedHorseId` (the selected horse id property of controls) to "horse-copper-comet".
  controls.selectedHorseId = 'horse-copper-comet';
// Original L211: Calls `controls.placeBtn.listeners.click` with no arguments.
  controls.placeBtn.listeners.click();
// Original L212: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.bet, 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(controls.bet, 10);
// Original L213: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.selectedHorseId, 'horse-copper-comet')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(controls.selectedHorseId, 'horse-copper-comet');
// Original L214: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.hub.balance, 100)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(controls.hub.balance, 100);
// Original L215: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(controls.ticket, null)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(controls.ticket, null);
// Original L216: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L217: Blank line separates test setup from the next scenario for readability.

// Original L218: This test names the behavior under protection: race starts and wins change a returning runner’s simulated win chance.
test('race starts and wins change a returning runner’s simulated win chance', () => {
// Original L219: Gets constructs a new instance of `Date` with 2026; 9; 15; 15 as milliseconds since 1970-01-01 UTC; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eventId = new Date(2026, 9, 15, 15).getTime();
// Original L220: Sets `engine.experience` (the experience property of engine) to an object with fields horse: an object with fields runners: an object with fields ; car: an object with fields runners: an object with fields .
  engine.experience = { horse: { runners: {} }, car: { runners: {} } };
// Original L221: Calls `engine.createRace` with `eventId` (event id); "horse"; stores the result in `noviceRace`. const prevents reassignment of this binding, not mutation inside its object/array.
  const noviceRace = engine.createRace(eventId, 'horse');
// Original L222: The entry at index/key 0 in `noviceRace.entrants` (the entrants property of noviceRace); stores the result in `returningRunner`. const prevents reassignment of this binding, not mutation inside its object/array.
  const returningRunner = noviceRace.entrants[0];
// Original L223: `returningRunner.winProbability` (the win probability property of returningRunner); stores the result in `noviceChance`. const prevents reassignment of this binding, not mutation inside its object/array.
  const noviceChance = returningRunner.winProbability;
// Original L224: Sets the entry at index/key `returningRunner.id` (the id property of returningRunner) in `engine.experience.horse.runners` (the runners property of engine.experience.horse) to an object with fields starts: 100; wins: 50.
  engine.experience.horse.runners[returningRunner.id] = { starts: 100, wins: 50 };
// Original L225: Calls `engine.createRace` with `eventId` (event id); "horse"; stores the result in `experiencedRace`. const prevents reassignment of this binding, not mutation inside its object/array.
  const experiencedRace = engine.createRace(eventId, 'horse');
// Original L226: Returns the first item of `experiencedRace.entrants` (the entrants property of experiencedRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `returningRunner.id` (the id property of returningRunner) have the same value and type, or undefined; stores the result in `experiencedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.
  const experiencedRunner = experiencedRace.entrants.find(runner => runner.id === returningRunner.id);
// Original L227: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(experiencedRunner.winProbability > noviceChance);
// Original L228: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(experiencedRunner.starts, 100)`; it requires that deterministic racing rule to match exactly.
  assert.equal(experiencedRunner.starts, 100);
// Original L229: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(experiencedRunner.wins, 50)`; it requires that deterministic racing rule to match exactly.
  assert.equal(experiencedRunner.wins, 50);
// Original L230: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L231: Blank line separates test setup from the next scenario for readability.

// Original L232: This test names the behavior under protection: completed scheduled races advance starts and win records on both circuits.
test('completed scheduled races advance starts and win records on both circuits', () => {
// Original L233: Gets constructs a new instance of `Date` with 2026; 9; 15; 21 as milliseconds since 1970-01-01 UTC; stores the result in `previousEvening`. const prevents reassignment of this binding, not mutation inside its object/array.
  const previousEvening = new Date(2026, 9, 15, 21).getTime();
// Original L234: Gets constructs a new instance of `Date` with 2026; 9; 16; 7 as milliseconds since 1970-01-01 UTC; stores the result in `morningRace`. const prevents reassignment of this binding, not mutation inside its object/array.
  const morningRace = new Date(2026, 9, 16, 7).getTime();
// Original L235: Gets constructs a new instance of `Date` with 2026; 9; 16; 8 as milliseconds since 1970-01-01 UTC; stores the result in `nextCircuitRace`. const prevents reassignment of this binding, not mutation inside its object/array.
  const nextCircuitRace = new Date(2026, 9, 16, 8).getTime();
// Original L236: Adds `nextCircuitRace` (next circuit race) and 200001 (or joins them if a value is text); stores the result in `now`. const prevents reassignment of this binding, not mutation inside its object/array.
  const now = nextCircuitRace + 200_001;
// Original L237: Sets `engine.experience` (the experience property of engine) to an object with fields horse: an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields ; car: an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .
  engine.experience = {
// Original L238: Defines field horse as an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .
    horse: { lastProcessedRaceId: previousEvening, runners: {} },
// Original L239: Defines field car as an object with fields lastProcessedRaceId: `previousEvening` (previous evening); runners: an object with fields .
    car: { lastProcessedRaceId: previousEvening, runners: {} }
// Original L240: This closes the test/helper block containing the setup and its behavior checks.
  };
// Original L241: 0; stores the result in `saveCount`. let allows the binding to be reassigned.
  let saveCount = 0;
// Original L242: Sets `engine.saveExperience` (the save experience property of engine) to a callback taking no parameters that runs its enclosed statements.
  engine.saveExperience = () => { saveCount += 1; };
// Original L243: Blank line separates test setup from the next scenario for readability.

// Original L244: Calls `engine.processCompletedRaces` with `now` (now).
  engine.processCompletedRaces(now);
// Original L245: Blank line separates test setup from the next scenario for readability.

// Original L246: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (const [type, expectedStarts, expectedLastRaceId] of [
// Original L247: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
    ['horse', 6, morningRace],
// Original L248: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
    ['car', 8, nextCircuitRace]
// Original L249: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
  ]) {
// Original L250: The entry at index/key `type` (type) in `engine.experience` (the experience property of engine); stores the result in `circuit`. const prevents reassignment of this binding, not mutation inside its object/array.
    const circuit = engine.experience[type];
// Original L251: Combines the items of lists the own property values of `circuit.runners` (the runners property of circuit) with a callback taking total, runner that an object with fields starts: adds `total.starts` (the starts property of total) and `runner.starts` (the starts property of runner) (or joins them if a value is text); wins: adds `total.wins` (the wins property of total) and `runner.wins` (the wins property of runner) (or joins them if a value is text), starting with an object with fields starts: 0; wins: 0; stores the result in `totals`. const prevents reassignment of this binding, not mutation inside its object/array.
    const totals = Object.values(circuit.runners).reduce((total, runner) => ({
// Original L252: Defines field starts as adds `total.starts` (the starts property of total) and `runner.starts` (the starts property of runner) (or joins them if a value is text).
      starts: total.starts + runner.starts,
// Original L253: Defines field wins as adds `total.wins` (the wins property of total) and `runner.wins` (the wins property of runner) (or joins them if a value is text).
      wins: total.wins + runner.wins
// Original L254: Defines field starts as 0.
    }), { starts: 0, wins: 0 });
// Original L255: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(circuit.lastProcessedRaceId, expectedLastRaceId)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(circuit.lastProcessedRaceId, expectedLastRaceId);
// Original L256: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(totals.starts, expectedStarts)`; it requires that deterministic racing rule to match exactly.
    assert.equal(totals.starts, expectedStarts);
// Original L257: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(totals.wins, 1)`; it requires that deterministic racing rule to match exactly.
    assert.equal(totals.wins, 1);
// Original L258: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L259: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(saveCount, 1)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(saveCount, 1);
// Original L260: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L261: Blank line separates test setup from the next scenario for readability.

// Original L262: This test names the behavior under protection: legacy horse race results remain reproducible for existing saved tickets.
test('legacy horse race results remain reproducible for existing saved tickets', () => {
// Original L263: 123456000; stores the result in `eventId`. const prevents reassignment of this binding, not mutation inside its object/array.
  const eventId = 123_456_000;
// Original L264: Calls `engine.createLegacyRace` with `eventId` (event id); stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.
  const first = engine.createLegacyRace(eventId);
// Original L265: Calls `engine.createLegacyRace` with `eventId` (event id); stores the result in `second`. const prevents reassignment of this binding, not mutation inside its object/array.
  const second = engine.createLegacyRace(eventId);
// Original L266: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(first.winnerId, second.winnerId)`; it requires that deterministic racing rule to match exactly.
  assert.equal(first.winnerId, second.winnerId);
// Original L267: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id)`; it requires that deterministic racing rule to match exactly.
  assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
// Original L268: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L269: This test names the behavior under protection: race Max uses remaining cents; Clear Bet changes neither balance nor a placed ticket.
test('race Max uses remaining cents; Clear Bet changes neither balance nor a placed ticket', () => {
// Original L270: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const race=Object.create(context.window.RaceEngine.prototype);const listeners={};
// Original L271: A callback taking name that an object with fields addEventListener: a callback taking _event, fn that runs its enclosed statements; stores the result in `button`. const prevents reassignment of this binding, not mutation inside its object/array.
  const button=name=>({addEventListener:(_event,fn)=>{listeners[name]=fn;}});
// Original L272: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  Object.assign(race,{hub:{balance:43.27,player:{maxBet:100}},bet:10,maxBtn:button('max'),clearBtn:button('clear'),modeButtons:[],canBetNow:()=>!race.ticket,updateBetControls(){}});
// Original L273: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,43.27)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.hub.balance,43.27)`; it requires that virtual-money and wager rule to match exactly.
  race.bindEvents();listeners.max();assert.equal(race.bet,43.27);assert.equal(race.hub.balance,43.27);
// Original L274: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,0)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.hub.balance,43.27)`; it requires that virtual-money and wager rule to match exactly.
  listeners.clear();assert.equal(race.bet,0);assert.equal(race.hub.balance,43.27);
// Original L275: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.bet,10)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(race.ticket.stake,10)`; it requires that virtual-money and wager rule to match exactly.
  race.ticket={stake:10};race.bet=10;listeners.clear();listeners.max();assert.equal(race.bet,10);assert.equal(race.ticket.stake,10);
// Original L276: This closes the test/helper block containing the setup and its behavior checks.
});
