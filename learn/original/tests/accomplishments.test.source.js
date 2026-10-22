const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function makeManager(save = {}) {
  const writes = [];
  const context = {
    window: {
      LocalProfiles: {
        getCurrentSave: () => save,
        saveCurrent: partial => writes.push(partial)
      },
      LocalSave: { queueFileSave() {} }
    }
  };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/accomplishments.js'), 'utf8'), context);
  return { manager: new context.window.AccomplishmentManager({}), writes, context };
}

test('new manager exposes isolated, stable accomplishment schema', () => {
  const { manager } = makeManager();
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState())), {
    version: 1,
    unlockedIds: [],
    selectedCosmetic: 'classic-cabinet',
    history: [],
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
  });
});

test('game and race records are idempotent and unlock milestones', () => {
  const { manager } = makeManager();
  assert.ok(manager.recordGame('blackjack', { id: 'hand-1', won: true }));
  assert.equal(manager.recordGame('blackjack', { id: 'hand-1', won: true }), false);
  for (let index = 2; index <= 10; index += 1) manager.recordGame('blackjack', { id: `hand-${index}`, won: index % 2 === 0 });
  assert.equal(manager.getState().stats.games, 10);
  assert.ok(manager.isUnlocked('first-game'));
  assert.ok(manager.isUnlocked('games-10'));
  assert.ok(manager.isUnlocked('first-win'));
  assert.ok(manager.recordRace({ raceId: 100, raceType: 'horse', won: true, payout: 20 }));
  assert.equal(manager.recordRace({ raceId: 100, raceType: 'horse', won: true }), false);
  assert.equal(manager.getState().stats.raceWins, 1);
  assert.ok(manager.isUnlocked('first-race'));
  assert.ok(manager.isUnlocked('race-win'));
});

test('history is bounded to 50 unique entries', () => {
  const { manager } = makeManager();
  for (let index = 0; index < 55; index += 1) manager.recordGame('coin-toss', { id: `round-${index}`, won: false });
  const state = manager.getState();
  assert.equal(state.history.length, 50);
  assert.equal(state.history[0].id, 'game:round-5');
  assert.equal(new Set(state.history.map(item => item.id)).size, 50);
});

test('cosmetic selection is locked until its achievement and persists only accomplishment data', () => {
  const { manager, writes } = makeManager();
  assert.equal(manager.selectCosmetic('neon-cabinet'), false);
  for (let index = 0; index < 10; index += 1) manager.recordGame('slots', { id: `spin-${index}`, won: false });
  assert.equal(manager.selectCosmetic('neon-cabinet'), true);
  assert.equal(manager.getState().selectedCosmetic, 'neon-cabinet');
  assert.ok(writes.every(write => Object.keys(write).length === 1 && write.accomplishments));
});

test('loading another save resets state and does not leak profile history', () => {
  const save = { accomplishments: { unlockedIds: ['first-win'], selectedCosmetic: 'royal-cabinet', history: [{ id: 'old', kind: 'game' }], stats: { games: 2, wins: 1 } } };
  const { manager } = makeManager(save);
  assert.equal(manager.getState().history[0].id, 'old');
  save.accomplishments = { unlockedIds: [], history: [], stats: {} };
  manager.resetForActiveProfile();
  assert.deepEqual(JSON.parse(JSON.stringify(manager.getState().history)), []);
  assert.equal(manager.getState().selectedCosmetic, 'classic-cabinet');
});
