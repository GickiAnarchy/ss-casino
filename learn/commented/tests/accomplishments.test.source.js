// Original L1: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L2: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L3: This imports node:path so the test exercises the real game/persistence API rather than a duplicate.
const path = require('node:path');
// Original L4: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L5: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L6: Blank line separates test setup from the next scenario for readability.

// Original L7: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function makeManager(save = {}) {
// Original L8: An array containing ; stores the result in `writes`. const prevents reassignment of this binding, not mutation inside its object/array.
  const writes = [];
// Original L9: An object with fields window: an object with fields LocalProfiles: an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes); LocalSave: an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context = {
// Original L10: Defines field window as an object with fields LocalProfiles: an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes); LocalSave: an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements.
    window: {
// Original L11: Defines field LocalProfiles as an object with fields getCurrentSave: a callback taking no parameters that `save` (save); saveCurrent: a callback taking partial that appends `partial` (partial) to `writes` (writes).
      LocalProfiles: {
// Original L12: Defines field getCurrentSave as a callback taking no parameters that `save` (save).
        getCurrentSave: () => save,
// Original L13: Defines field saveCurrent as a callback taking partial that appends `partial` (partial) to `writes` (writes).
        saveCurrent: partial => writes.push(partial)
// Original L14: This line prepares or drives the isolated scenario so later assertions can verify the actual game rule or persistence contract.
      },
// Original L15: Defines field LocalSave as an object with fields queueFileSave: a callback taking no parameters that runs its enclosed statements.
      LocalSave: { queueFileSave() {} }
// Original L16: This closes the test/helper block containing the setup and its behavior checks.
    }
// Original L17: This closes the test/helper block containing the setup and its behavior checks.
  };
// Original L18: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/accomplishments.js'), 'utf8'), context);
// Original L19: Returns an object with fields manager: constructs a new instance of `context.window.AccomplishmentManager` with an object with fields ; writes: `writes` (writes); context: `context` (context) to the caller and exits this function.
  return { manager: new context.window.AccomplishmentManager({}), writes, context };
// Original L20: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L21: Blank line separates test setup from the next scenario for readability.

// Original L22: This test names the behavior under protection: new manager exposes isolated, stable accomplishment schema.
test('new manager exposes isolated, stable accomplishment schema', () => {
// Original L23: Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { manager } = makeManager();
// Original L24: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(JSON.parse(JSON.stringify(manager.getState())), {)`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState())), {
// Original L25: Defines field version as 1.
    version: 1,
// Original L26: Defines field unlockedIds as an array containing .
    unlockedIds: [],
// Original L27: Defines field selectedCosmetic as "classic-cabinet".
    selectedCosmetic: 'classic-cabinet',
// Original L28: Defines field history as an array containing .
    history: [],
// Original L29: Defines field stats as an object with fields games: 0; wins: 0; races: 0; raceWins: 0.
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
// Original L30: This closes the test/helper block containing the setup and its behavior checks.
  });
// Original L31: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L32: Blank line separates test setup from the next scenario for readability.

// Original L33: This test names the behavior under protection: game and race records are idempotent and unlock milestones.
test('game and race records are idempotent and unlock milestones', () => {
// Original L34: Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { manager } = makeManager();
// Original L35: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.recordGame('blackjack', { id: 'hand-1', won: true }));
// Original L36: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.recordGame('blackjack', { id: 'hand-1', won: true }), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(manager.recordGame('blackjack', { id: 'hand-1', won: true }), false);
// Original L37: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (let index = 2; index <= 10; index += 1) manager.recordGame('blackjack', { id: `hand-${index}`, won: index % 2 === 0 });
// Original L38: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().stats.games, 10)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(manager.getState().stats.games, 10);
// Original L39: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.isUnlocked('first-game'));
// Original L40: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.isUnlocked('games-10'));
// Original L41: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.isUnlocked('first-win'));
// Original L42: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.recordRace({ raceId: 100, raceType: 'horse', won: true, payout: 20 }));
// Original L43: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.recordRace({ raceId: 100, raceType: 'horse', won: true }), false)`; it requires that deterministic racing rule to match exactly.
  assert.equal(manager.recordRace({ raceId: 100, raceType: 'horse', won: true }), false);
// Original L44: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().stats.raceWins, 1)`; it requires that deterministic racing rule to match exactly.
  assert.equal(manager.getState().stats.raceWins, 1);
// Original L45: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.isUnlocked('first-race'));
// Original L46: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(manager.isUnlocked('race-win'));
// Original L47: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L48: Blank line separates test setup from the next scenario for readability.

// Original L49: This test names the behavior under protection: history is bounded to 50 unique entries.
test('history is bounded to 50 unique entries', () => {
// Original L50: Calls `makeManager` with no arguments; stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { manager } = makeManager();
// Original L51: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (let index = 0; index < 55; index += 1) manager.recordGame('coin-toss', { id: `round-${index}`, won: false });
// Original L52: Calls `manager.getState` with no arguments; stores the result in `state`. const prevents reassignment of this binding, not mutation inside its object/array.
  const state = manager.getState();
// Original L53: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(state.history.length, 50)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(state.history.length, 50);
// Original L54: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(state.history[0].id, 'game:round-5')`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(state.history[0].id, 'game:round-5');
// Original L55: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new Set(state.history.map(item => item.id)).size, 50)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(new Set(state.history.map(item => item.id)).size, 50);
// Original L56: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L57: Blank line separates test setup from the next scenario for readability.

// Original L58: This test names the behavior under protection: cosmetic selection is locked until its achievement and persists only accomplishment data.
test('cosmetic selection is locked until its achievement and persists only accomplishment data', () => {
// Original L59: Calls `makeManager` with no arguments; stores the result in `{ manager, writes }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { manager, writes } = makeManager();
// Original L60: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.selectCosmetic('neon-cabinet'), false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(manager.selectCosmetic('neon-cabinet'), false);
// Original L61: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for (let index = 0; index < 10; index += 1) manager.recordGame('slots', { id: `spin-${index}`, won: false });
// Original L62: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.selectCosmetic('neon-cabinet'), true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(manager.selectCosmetic('neon-cabinet'), true);
// Original L63: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().selectedCosmetic, 'neon-cabinet')`; it requires that observable game or persistence rule to match exactly.
  assert.equal(manager.getState().selectedCosmetic, 'neon-cabinet');
// Original L64: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.ok(writes.every(write => Object.keys(write).length === 1 && write.accomplishments));
// Original L65: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L66: Blank line separates test setup from the next scenario for readability.

// Original L67: This test names the behavior under protection: loading another save resets state and does not leak profile history.
test('loading another save resets state and does not leak profile history', () => {
// Original L68: An object with fields accomplishments: an object with fields unlockedIds: an array containing "first-win"; selectedCosmetic: "royal-cabinet"; history: an array containing an object with fields id: "old"; kind: "game"; stats: an object with fields games: 2; wins: 1; stores the result in `save`. const prevents reassignment of this binding, not mutation inside its object/array.
  const save = { accomplishments: { unlockedIds: ['first-win'], selectedCosmetic: 'royal-cabinet', history: [{ id: 'old', kind: 'game' }], stats: { games: 2, wins: 1 } } };
// Original L69: Calls `makeManager` with `save` (save); stores the result in `{ manager }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { manager } = makeManager(save);
// Original L70: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().history[0].id, 'old')`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(manager.getState().history[0].id, 'old');
// Original L71: Sets `save.accomplishments` (the accomplishments property of save) to an object with fields unlockedIds: an array containing ; history: an array containing ; stats: an object with fields .
  save.accomplishments = { unlockedIds: [], history: [], stats: {} };
// Original L72: Calls `manager.resetForActiveProfile` with no arguments.
  manager.resetForActiveProfile();
// Original L73: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(JSON.parse(JSON.stringify(manager.getState().history)), [])`; it requires that profile bonus/achievement rule to match exactly.
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState().history)), []);
// Original L74: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(manager.getState().selectedCosmetic, 'classic-cabinet')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(manager.getState().selectedCosmetic, 'classic-cabinet');
// Original L75: This closes the test/helper block containing the setup and its behavior checks.
});
