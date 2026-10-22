// Original L1: This comment defines the test boundary and explains why the isolated fixture is safe: Use a tiny VM browser shim so encrypted-profile save normalization can be tested without a real browser or touching user storage.
// Use a tiny VM browser shim so encrypted-profile save normalization can be tested without a real browser or touching user storage.
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

// Original L8: An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
const context = { window: {}, document: { getElementById: () => null } };
// Original L9: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
// Original L10: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
const manager = Object.create(context.window.LocalProfileManager.prototype);
// Original L11: Blank line separates test setup from the next scenario for readability.

// Original L12: This test names the behavior under protection: new profiles default to $100 while existing saved balances are preserved.
test('new profiles default to $100 while existing saved balances are preserved', () => {
// Original L13: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.normalizeSave({}).player.balance, 100)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(manager.normalizeSave({}).player.balance, 100);
// Original L14: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.normalizeSave({ player: { balance: 812.34 } }).player.balance, 812.34)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(manager.normalizeSave({ player: { balance: 812.34 } }).player.balance, 812.34);
// Original L15: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L16: Blank line separates test setup from the next scenario for readability.

// Original L17: This test names the behavior under protection: profile saves preserve horse and car records and typed betting tickets.
test('profile saves preserve horse and car records and typed betting tickets', () => {
// Original L18: Calls `manager.normalizeSave` with an object with fields raceBet: an object with fields raceId: 123; raceType: "car"; runnerId: "car-neon-viper"; winnerId: "car-polar-star"; stake: 5; odds: 3.25; and further fields; raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': `{ starts: 12, wins: 3 }`; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': `{ starts: 5, wins: 2 }`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save = manager.normalizeSave({
// Original L19: Defines field raceBet as an object with fields raceId: 123; raceType: "car"; runnerId: "car-neon-viper"; winnerId: "car-polar-star"; stake: 5; odds: 3.25; and further fields.
    raceBet: {
// Original L20: Defines field raceId as 123.
      raceId: 123,
// Original L21: Defines field raceType as "car".
      raceType: 'car',
// Original L22: Defines field runnerId as "car-neon-viper".
      runnerId: 'car-neon-viper',
// Original L23: Defines field winnerId as "car-polar-star".
      winnerId: 'car-polar-star',
// Original L24: Defines field stake as 5.
      stake: 5,
// Original L25: Defines field odds as 3.25.
      odds: 3.25,
// Original L26: Defines field durationMs as 120000.
      durationMs: 120000
// Original L27: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
    },
// Original L28: Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': an object with fields starts: 12; wins: 3; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': an object with fields starts: 5; wins: 2.
    raceExperience: {
// Original L29: Defines field horse as an object with fields lastProcessedRaceId: 10; runners: an object with fields 'horse-copper-comet': an object with fields starts: 12; wins: 3.
      horse: { lastProcessedRaceId: 10, runners: { 'horse-copper-comet': { starts: 12, wins: 3 } } },
// Original L30: Defines field car as an object with fields lastProcessedRaceId: 20; runners: an object with fields 'car-neon-viper': an object with fields starts: 5; wins: 2.
      car: { lastProcessedRaceId: 20, runners: { 'car-neon-viper': { starts: 5, wins: 2 } } }
// Original L31: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L32: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L33: Blank line separates test setup from the next scenario for readability.

// Original L34: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.raceType, 'car')`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceBet.raceType, 'car');
// Original L35: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.runnerId, 'car-neon-viper')`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceBet.runnerId, 'car-neon-viper');
// Original L36: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.runners['horse-copper-comet'].starts, 12)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'].starts, 12);
// Original L37: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.runners['car-neon-viper'].wins, 2)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.car.runners['car-neon-viper'].wins, 2);
// Original L38: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L39: Blank line separates test setup from the next scenario for readability.

// Original L40: This test names the behavior under protection: legacy horse tickets remain valid and default to the horse circuit.
test('legacy horse tickets remain valid and default to the horse circuit', () => {
// Original L41: Calls `manager.normalizeSave` with an object with fields raceBet: an object with fields raceId: 123; runnerId: "horse-1"; winnerId: "horse-2"; stake: 5; odds: 3; durationMs: 120000; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save = manager.normalizeSave({
// Original L42: Defines field raceBet as an object with fields raceId: 123; runnerId: "horse-1"; winnerId: "horse-2"; stake: 5; odds: 3; durationMs: 120000.
    raceBet: { raceId: 123, runnerId: 'horse-1', winnerId: 'horse-2', stake: 5, odds: 3, durationMs: 120000 }
// Original L43: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L44: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.raceType, null)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceBet.raceType, null);
// Original L45: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceBet.runnerId, 'horse-1')`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceBet.runnerId, 'horse-1');
// Original L46: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L47: Blank line separates test setup from the next scenario for readability.

// Original L48: This test names the behavior under protection: an absent experience cursor stays missing instead of becoming Unix time zero.
test('an absent experience cursor stays missing instead of becoming Unix time zero', () => {
// Original L49: Calls `manager.normalizeSave` with an object with fields raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: null; runners: an object with fields ; car: an object with fields runners: an object with fields ; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save = manager.normalizeSave({
// Original L50: Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: null; runners: an object with fields ; car: an object with fields runners: an object with fields .
    raceExperience: {
// Original L51: Defines field horse as an object with fields lastProcessedRaceId: null; runners: an object with fields .
      horse: { lastProcessedRaceId: null, runners: {} },
// Original L52: Defines field car as an object with fields runners: an object with fields .
      car: { runners: {} }
// Original L53: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L54: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L55: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
// Original L56: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.car.lastProcessedRaceId, null);
// Original L57: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L58: Blank line separates test setup from the next scenario for readability.

// Original L59: This test names the behavior under protection: profile validation removes impossible race records.
test('profile validation removes impossible race records', () => {
// Original L60: Calls `manager.normalizeSave` with an object with fields raceExperience: an object with fields horse: an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': `{ starts: 3, wins: 4 }`; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': `{ starts: 4, wins: 1 }`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save = manager.normalizeSave({
// Original L61: Defines field raceExperience as an object with fields horse: an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': an object with fields starts: 3; wins: 4; car: an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': an object with fields starts: 4; wins: 1.
    raceExperience: {
// Original L62: Defines field horse as an object with fields lastProcessedRaceId: changes the numeric sign of 1; runners: an object with fields 'horse-copper-comet': an object with fields starts: 3; wins: 4.
      horse: { lastProcessedRaceId: -1, runners: { 'horse-copper-comet': { starts: 3, wins: 4 } } },
// Original L63: Defines field car as an object with fields lastProcessedRaceId: 20; runners: an object with fields 'horse-copper-comet': an object with fields starts: 4; wins: 1.
      car: { lastProcessedRaceId: 20, runners: { 'horse-copper-comet': { starts: 4, wins: 1 } } }
// Original L64: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L65: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L66: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.lastProcessedRaceId, null)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
// Original L67: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.horse.runners['horse-copper-comet'], undefined)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'], undefined);
// Original L68: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.raceExperience.car.runners['horse-copper-comet'], undefined)`; it requires that deterministic racing rule to match exactly.
  assert.equal(save.raceExperience.car.runners['horse-copper-comet'], undefined);
// Original L69: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L70: This test names the behavior under protection: Money Green and bonus state survive repeated normalization.
test('Money Green and bonus state survive repeated normalization', () => {
// Original L71: An object with fields freeSpinsRemaining: 4; lockedStake: 10; bonusTotalWin: 22.5; stickyWildsGrid: calls `Array.from` with an object with fields length: 5; a callback taking no parameters that an array containing false, true, false; lastResult: an object with fields status: "settled"; stake: 0; payout: 12.5; lines: an array containing ; summary: an object with fields totalWin: 22.5; stores the result in `bonus`. const prevents reassignment of this binding, not mutation inside its object/array.
  const bonus={freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]},summary:{totalWin:22.5}};
// Original L72: Calls `manager.normalizeSave` with calls `manager.normalizeSave` with an object with fields settings: an object with fields theme: "money"; slotBonuses: an object with fields 'view-5reel-slots': `bonus` (bonus); stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save=manager.normalizeSave(manager.normalizeSave({settings:{theme:'money'},slotBonuses:{'view-5reel-slots':bonus}}));
// Original L73: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(save.settings.theme,'money');assert.equal(save.slotBonuses['view-5reel-slots'].freeSpinsRemaining,4);
// Original L74: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].stickyWildsGrid[2][1],true)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses['view-5reel-slots'].summary.totalWin,22.5)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(save.slotBonuses['view-5reel-slots'].stickyWildsGrid[2][1],true);assert.equal(save.slotBonuses['view-5reel-slots'].summary.totalWin,22.5);
// Original L75: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L76: This test names the behavior under protection: invalid bonus counters and sticky grids are sanitized.
test('invalid bonus counters and sticky grids are sanitized', () => {
// Original L77: Calls `manager.normalizeSave` with an object with fields slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: changes the numeric sign of 3; lockedStake: `Infinity` (infinity); stickyWildsGrid: an array containing `[true]`; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save=manager.normalizeSave({slotBonuses:{table:{freeSpinsRemaining:-3,lockedStake:Infinity,stickyWildsGrid:[[true]]}}});
// Original L78: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.freeSpinsRemaining,0)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.lockedStake,0)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(save.slotBonuses.table.freeSpinsRemaining,0);assert.equal(save.slotBonuses.table.lockedStake,0);
// Original L79: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.stickyWildsGrid.length,5)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(save.slotBonuses.table.stickyWildsGrid[0].length,3)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(save.slotBonuses.table.stickyWildsGrid.length,5);assert.equal(save.slotBonuses.table.stickyWildsGrid[0].length,3);
// Original L80: This closes the test/helper block containing the setup and its behavior checks.
});
