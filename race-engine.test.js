const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'race-engine.js'), 'utf8'), context);
const engine = Object.create(context.window.RaceEngine.prototype);

function finalTrackPositions(race) {
  const lanes = race.entrants.map(runner => {
    const token = { style: {} };
    return {
      dataset: { runnerId: runner.id },
      querySelector: () => token,
      classList: { toggle() {} },
      token
    };
  });
  engine.trackEl = { querySelectorAll: () => lanes };
  engine.updateTrackPositions(race, 1, true);
  return new Map(lanes.map(lane => [lane.dataset.runnerId, Number.parseFloat(lane.token.style.left)]));
}

test('horse and car fields each contain ten unique entrants from larger stables', () => {
  const eventId = new Date(2026, 9, 15, 9).getTime();
  for (const type of ['horse', 'car']) {
    const race = engine.createRace(eventId, type);
    assert.equal(race.entrants.length, 10);
    assert.equal(new Set(race.entrants.map(runner => runner.id)).size, 10);
    assert.ok(race.entrants.every(runner => runner.id.startsWith(`${type}-`)));
  }
});

test('race fields, odds, and winner are deterministic for a scheduled race', () => {
  const eventId = new Date(2026, 9, 15, 11).getTime();
  for (const type of ['horse', 'car']) {
    const first = engine.createRace(eventId, type);
    const second = engine.createRace(eventId, type);
    assert.equal(first.winnerId, second.winnerId);
    assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
    assert.deepEqual(first.entrants.map(runner => runner.odds), second.entrants.map(runner => runner.odds));
  }
});

test('the selected winner is furthest along the track at the finish', () => {
  for (let raceNumber = 1; raceNumber <= 500; raceNumber += 1) {
    const eventId = raceNumber * 2 * 60 * 60 * 1000;
    for (const type of ['horse', 'car']) {
      const race = engine.createRace(eventId, type);
      const positions = finalTrackPositions(race);
      const winnerPosition = positions.get(race.winnerId);
      assert.ok(winnerPosition >= 97, `${type} race ${raceNumber}: winner should reach the finish line`);
      for (const [runnerId, position] of positions) {
        if (runnerId !== race.winnerId) {
          assert.ok(winnerPosition > position, `${type} race ${raceNumber}: winner should finish ahead of ${runnerId}`);
        }
      }
    }
  }
});

test('the local schedule runs every two hours from 7 AM to 9 PM and skips overnight', () => {
  const earlyMorning = new Date(2026, 9, 15, 6, 59).getTime();
  const sevenAm = new Date(2026, 9, 15, 7, 0).getTime();
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
  assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm);
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
  assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm);
  assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), new Date(2026, 9, 15, 11, 0).getTime());
});

test('betting closes exactly five minutes before each race start', () => {
  const start = new Date(2026, 9, 15, 13, 0).getTime();
  assert.equal(engine.isBettingOpenFor(start, start - 5 * 60 * 1000 - 1), true);
  assert.equal(engine.isBettingOpenFor(start, start - 5 * 60 * 1000), false);
  assert.equal(engine.isBettingOpenFor(start, start - 4 * 60 * 1000), false);
});

test('race starts and wins change a returning runner’s simulated win chance', () => {
  const eventId = new Date(2026, 9, 15, 15).getTime();
  engine.experience = { horse: { runners: {} }, car: { runners: {} } };
  const noviceRace = engine.createRace(eventId, 'horse');
  const returningRunner = noviceRace.entrants[0];
  const noviceChance = returningRunner.winProbability;
  engine.experience.horse.runners[returningRunner.id] = { starts: 100, wins: 50 };
  const experiencedRace = engine.createRace(eventId, 'horse');
  const experiencedRunner = experiencedRace.entrants.find(runner => runner.id === returningRunner.id);
  assert.ok(experiencedRunner.winProbability > noviceChance);
  assert.equal(experiencedRunner.starts, 100);
  assert.equal(experiencedRunner.wins, 50);
});

test('completed scheduled races advance starts and win records on both circuits', () => {
  const previousEvening = new Date(2026, 9, 15, 21).getTime();
  const morningRace = new Date(2026, 9, 16, 7).getTime();
  const now = morningRace + 200_001;
  engine.experience = {
    horse: { lastProcessedRaceId: previousEvening, runners: {} },
    car: { lastProcessedRaceId: previousEvening, runners: {} }
  };
  let saveCount = 0;
  engine.saveExperience = () => { saveCount += 1; };

  engine.processCompletedRaces(now);

  for (const type of ['horse', 'car']) {
    const circuit = engine.experience[type];
    const totals = Object.values(circuit.runners).reduce((total, runner) => ({
      starts: total.starts + runner.starts,
      wins: total.wins + runner.wins
    }), { starts: 0, wins: 0 });
    assert.equal(circuit.lastProcessedRaceId, morningRace);
    assert.equal(totals.starts, 10);
    assert.equal(totals.wins, 1);
  }
  assert.equal(saveCount, 1);
});

test('legacy horse race results remain reproducible for existing saved tickets', () => {
  const eventId = 123_456_000;
  const first = engine.createLegacyRace(eventId);
  const second = engine.createLegacyRace(eventId);
  assert.equal(first.winnerId, second.winnerId);
  assert.deepEqual(first.entrants.map(runner => runner.id), second.entrants.map(runner => runner.id));
});
