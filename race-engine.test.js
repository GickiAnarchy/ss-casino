const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, 'race-engine.js'), 'utf8'), context);
const engine = Object.create(context.window.RaceEngine.prototype);

function finalTrackPositions(race) {
  const lanes = race.entrants.map(horse => {
    const token = { style: {} };
    return {
      dataset: { runnerId: horse.id },
      querySelector: () => token,
      classList: { toggle() {} },
      token
    };
  });
  engine.trackEl = { querySelectorAll: () => lanes };
  engine.updateTrackPositions(race, 1, true);
  return new Map(lanes.map(lane => [lane.dataset.runnerId, Number.parseFloat(lane.token.style.left)]));
}

test('the selected winner is the furthest horse along the track at the finish', () => {
  for (let raceNumber = 1; raceNumber <= 500; raceNumber += 1) {
    const eventId = raceNumber * 660_000;
    const race = engine.createRace(eventId);
    const positions = finalTrackPositions(race);
    const winnerPosition = positions.get(race.winnerId);

    assert.ok(winnerPosition >= 97, `race ${raceNumber}: winner should reach the finish line`);
    for (const [horseId, position] of positions) {
      if (horseId !== race.winnerId) {
        assert.ok(winnerPosition > position, `race ${raceNumber}: winner should finish ahead of ${horseId}`);
      }
    }
  }
});

test('race winner and entrant order remain repeatable for a scheduled race', () => {
  const first = engine.createRace(123_456_000);
  const second = engine.createRace(123_456_000);
  assert.equal(first.winnerId, second.winnerId);
  assert.deepEqual(first.entrants.map(horse => horse.id), second.entrants.map(horse => horse.id));
});
