// Use a tiny VM browser shim so encrypted-profile save normalization can be tested without a real browser or touching user storage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {}, document: { getElementById: () => null } };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
const manager = Object.create(context.window.LocalProfileManager.prototype);

test('new profiles default to $100 while existing saved balances are preserved', () => {
  assert.equal(manager.normalizeSave({}).player.balance, 100);
  assert.equal(manager.normalizeSave({ player: { balance: 812.34 } }).player.balance, 812.34);
});

test('profile saves preserve horse and car records and typed betting tickets', () => {
  const save = manager.normalizeSave({
    raceBet: {
      raceId: 123,
      raceType: 'car',
      runnerId: 'car-neon-viper',
      winnerId: 'car-polar-star',
      stake: 5,
      odds: 3.25,
      durationMs: 120000
    },
    raceExperience: {
      horse: { lastProcessedRaceId: 10, runners: { 'horse-copper-comet': { starts: 12, wins: 3 } } },
      car: { lastProcessedRaceId: 20, runners: { 'car-neon-viper': { starts: 5, wins: 2 } } }
    }
  });

  assert.equal(save.raceBet.raceType, 'car');
  assert.equal(save.raceBet.runnerId, 'car-neon-viper');
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'].starts, 12);
  assert.equal(save.raceExperience.car.runners['car-neon-viper'].wins, 2);
});

test('legacy horse tickets remain valid and default to the horse circuit', () => {
  const save = manager.normalizeSave({
    raceBet: { raceId: 123, runnerId: 'horse-1', winnerId: 'horse-2', stake: 5, odds: 3, durationMs: 120000 }
  });
  assert.equal(save.raceBet.raceType, null);
  assert.equal(save.raceBet.runnerId, 'horse-1');
});

test('an absent experience cursor stays missing instead of becoming Unix time zero', () => {
  const save = manager.normalizeSave({
    raceExperience: {
      horse: { lastProcessedRaceId: null, runners: {} },
      car: { runners: {} }
    }
  });
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
  assert.equal(save.raceExperience.car.lastProcessedRaceId, null);
});

test('profile validation removes impossible race records', () => {
  const save = manager.normalizeSave({
    raceExperience: {
      horse: { lastProcessedRaceId: -1, runners: { 'horse-copper-comet': { starts: 3, wins: 4 } } },
      car: { lastProcessedRaceId: 20, runners: { 'horse-copper-comet': { starts: 4, wins: 1 } } }
    }
  });
  assert.equal(save.raceExperience.horse.lastProcessedRaceId, null);
  assert.equal(save.raceExperience.horse.runners['horse-copper-comet'], undefined);
  assert.equal(save.raceExperience.car.runners['horse-copper-comet'], undefined);
});
test('Money Green and bonus state survive repeated normalization', () => {
  const bonus={freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]},summary:{totalWin:22.5}};
  const save=manager.normalizeSave(manager.normalizeSave({settings:{theme:'money'},slotBonuses:{'view-5reel-slots':bonus}}));
  assert.equal(save.settings.theme,'money');assert.equal(save.slotBonuses['view-5reel-slots'].freeSpinsRemaining,4);
  assert.equal(save.slotBonuses['view-5reel-slots'].stickyWildsGrid[2][1],true);assert.equal(save.slotBonuses['view-5reel-slots'].summary.totalWin,22.5);
});
test('invalid bonus counters and sticky grids are sanitized', () => {
  const save=manager.normalizeSave({slotBonuses:{table:{freeSpinsRemaining:-3,lockedStake:Infinity,stickyWildsGrid:[[true]]}}});
  assert.equal(save.slotBonuses.table.freeSpinsRemaining,0);assert.equal(save.slotBonuses.table.lockedStake,0);
  assert.equal(save.slotBonuses.table.stickyWildsGrid.length,5);assert.equal(save.slotBonuses.table.stickyWildsGrid[0].length,3);
});
