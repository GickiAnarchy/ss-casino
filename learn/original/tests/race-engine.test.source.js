// Headless tests exercise seeded race generation, schedules, recovery, and UI guardrails without changing a real profile.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {}, document: {} };
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/race-engine.js'), 'utf8'), context);
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

test('horse fields contain six entrants and car fields contain eight unique entrants from larger stables', () => {
  const eventId = new Date(2026, 9, 15, 9).getTime();
  for (const [type, expectedFieldSize] of [['horse', 6], ['car', 8]]) {
    const race = engine.createRace(eventId, type);
    assert.equal(race.entrants.length, expectedFieldSize);
    assert.equal(new Set(race.entrants.map(runner => runner.id)).size, expectedFieldSize);
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

test('existing explicitly typed tickets reconstruct their original race outcome', () => {
  const eventId = new Date(2026, 9, 15, 9).getTime();
  const race = engine.createRace(eventId, 'car');
  assert.equal(race.durationMs, 139_000);
  assert.equal(race.winnerId, 'car-turbo-tiger');
  assert.equal(race.entrants.map(runner => runner.id).join(','), 'car-lime-machine,car-turbo-tiger,car-ironclad,car-drift-king,car-blue-lightning,car-desert-fox,car-pink-nitro,car-midnight-rally');
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

test('the local schedule runs hourly from 7 AM to 9 PM and skips overnight', () => {
  const earlyMorning = new Date(2026, 9, 15, 6, 59).getTime();
  const sevenAm = new Date(2026, 9, 15, 7, 0).getTime();
  const eightAm = new Date(2026, 9, 15, 8, 0).getTime();
  const tenAm = new Date(2026, 9, 15, 10, 0).getTime();
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
  assert.equal(engine.getNextRaceStart(earlyMorning), sevenAm);
  assert.equal(engine.getNextRaceStart(sevenAm), eightAm);
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
  assert.equal(engine.getScheduledRaceAtOrBefore(new Date(2026, 9, 15, 23, 30).getTime()), ninePm);
  assert.equal(engine.getNextRaceStart(new Date(2026, 9, 15, 9, 0).getTime()), tenAm);
});

test('horse and car races alternate on every daytime hourly slot', () => {
  const start = new Date(2026, 9, 15, 7, 0).getTime();
  for (let slotIndex = 0; slotIndex < 15; slotIndex += 1) {
    const eventId = start + slotIndex * 60 * 60 * 1000;
    const expectedType = slotIndex % 2 === 0 ? 'horse' : 'car';
    assert.equal(engine.getScheduledRaceType(eventId), expectedType);
    assert.equal(engine.createRace(eventId).type, expectedType);
  }
  assert.equal(engine.getScheduledRaceType(new Date(2026, 9, 16, 7, 0).getTime()), 'horse');
});

test('race previews and betting open 45 minutes before each race; betting closes five minutes before start', () => {
  const start = new Date(2026, 9, 15, 13, 0).getTime();
  const previewOpens = start - 45 * 60 * 1000;
  const bettingCloses = start - 5 * 60 * 1000;
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens - 1), false);
  assert.equal(engine.isBettingOpenFor(start, previewOpens - 1), false);
  assert.equal(engine.isRacePreviewOpenFor(start, previewOpens), true);
  assert.equal(engine.isBettingOpenFor(start, previewOpens), true);
  assert.equal(engine.isBettingOpenFor(start, bettingCloses - 1), true);
  assert.equal(engine.isRacePreviewOpenFor(start, bettingCloses), true);
  assert.equal(engine.isBettingOpenFor(start, bettingCloses), false);
  assert.equal(engine.isBettingOpenFor(start, bettingCloses + 60 * 1000), false);
});

test('overnight racing stays closed until the next 6:15 AM preview and betting window', () => {
  const ninePm = new Date(2026, 9, 15, 21, 0).getTime();
  const nextMorning = new Date(2026, 9, 16, 7, 0).getTime();
  const opensAt = new Date(2026, 9, 16, 6, 15).getTime();
  for (const now of [
    new Date(2026, 9, 15, 21, 6).getTime(),
    new Date(2026, 9, 15, 23, 59, 59).getTime(),
    opensAt - 1
  ]) {
    assert.equal(engine.getNextRaceStart(now), nextMorning);
    assert.equal(engine.getNextBettingOpen(now), opensAt);
    assert.equal(engine.isRacePreviewOpenFor(nextMorning, now), false);
    assert.equal(engine.canBetNow.call({ ticket: null, getNextRaceStart: engine.getNextRaceStart, isBettingOpenFor: engine.isBettingOpenFor }, now), false);
  }
  assert.equal(engine.isRacePreviewOpenFor(nextMorning, opensAt), true);
  assert.equal(engine.isBettingOpenFor(nextMorning, opensAt), true);
  assert.equal(engine.getNextBettingOpen(opensAt - 1), opensAt);
  assert.equal(engine.getNextRaceStart(ninePm), nextMorning);
});

test('closed race UI hides upcoming details and disables all betting actions', () => {
  const start = new Date(2026, 9, 16, 7, 0).getTime();
  const opensAt = start - 45 * 60 * 1000;
  const label = { textContent: '' };
  const classes = new Set();
  const status = { textContent: '', classList: {
    remove: (...names) => names.forEach(name => classes.delete(name)),
    add: name => classes.add(name)
  } };
  const closed = Object.assign(Object.create(context.window.RaceEngine.prototype), {
    isRacePreviewOpen: false,
    isRaceInProgress: false,
    isResultDisplay: false,
    raceTitleEl: { textContent: '' },
    raceNumberEl: { textContent: '' },
    phaseEl: { textContent: '' },
    countdownEl: { textContent: '', parentElement: { querySelector: () => label } },
    startTimeEl: { textContent: '' },
    raceDurationEl: { textContent: '' },
    targetTextEl: { textContent: '' },
    trackCaptionEl: { textContent: '' },
    statusEl: status,
    getNextBettingOpen: () => opensAt,
    raceStartTime: () => '6:15 AM',
    formatCountdown: () => '00:15:00'
  });
  closed.updateClockAndStatus(null, null, opensAt - 15 * 60 * 1000, 0);
  assert.equal(closed.raceTitleEl.textContent, 'Racing Closed');
  assert.equal(closed.raceNumberEl.textContent, '—');
  assert.equal(closed.phaseEl.textContent, 'CLOSED');
  assert.equal(label.textContent, 'BETTING OPENS IN');
  assert.equal(closed.countdownEl.textContent, '00:15:00');
  assert.equal(closed.startTimeEl.textContent, '—');
  assert.equal(closed.raceDurationEl.textContent, '—');
  assert.match(status.textContent, /^CLOSED — RACING RESUMES AT 6:15 AM$/);

  const runnerList = { children: [{ name: 'leaked preview' }], replaceChildren() { this.children = []; }, setAttribute(name, value) { this[name] = value; } };
  const track = { children: [{ name: 'leaked track' }], replaceChildren() { this.children = []; } };
  closed.runnerListEl = runnerList;
  closed.trackEl = track;
  closed.renderRunnerOptions(null);
  closed.renderTrack(null);
  assert.deepEqual(runnerList.children, []);
  assert.deepEqual(track.children, []);
  assert.equal(runnerList['aria-label'], 'Race runners hidden until the preview opens');

  const makeButton = () => ({ disabled: false, textContent: '', listeners: {}, addEventListener(type, handler) { this.listeners[type] = handler; } });
  const option = {
    dataset: { runnerId: 'horse-copper-comet' }, disabled: false,
    classList: { toggle() {} }, setAttribute() {}
  };
  const runnerListWithOption = { addEventListener(type, handler) { this.listeners[type] = handler; }, listeners: {}, querySelectorAll: () => [option] };
  const controls = Object.assign(Object.create(context.window.RaceEngine.prototype), {
    bet: 10, selectedHorseId: null, targetRaceId: start, raceType: 'horse',
    isRacePreviewOpen: false, isBettingOpen: false, ticket: null,
    hub: { balance: 100, player: { maxBet: 100 } },
    minusBtn: makeButton(), plusBtn: makeButton(), maxBtn: makeButton(), placeBtn: makeButton(),
    runnerListEl: runnerListWithOption, betDisplayEl: { textContent: '' }, estimatedReturnEl: { textContent: '' },
    canBetNow: () => false,
    maxStake: () => 100,
    formatMoney: amount => `$${amount.toFixed(2)}`,
    createRace: () => ({ entrants: [{ id: 'horse-copper-comet', odds: 2 }] }),
    getNextRaceStart: () => start
  });
  controls.bindEvents();
  controls.updateRunnerSelection();
  controls.updateBetControls();
  assert.equal(option.disabled, true);
  assert.equal(controls.minusBtn.disabled, true);
  assert.equal(controls.plusBtn.disabled, true);
  assert.equal(controls.maxBtn.disabled, true);
  assert.equal(controls.placeBtn.disabled, true);
  assert.equal(controls.placeBtn.textContent, 'RACING CLOSED');

  for (const button of [controls.minusBtn, controls.plusBtn, controls.maxBtn]) button.listeners.click();
  option.disabled = false;
  runnerListWithOption.listeners.click({ target: { closest: () => option } });
  assert.equal(controls.selectedHorseId, null);
  controls.selectedHorseId = 'horse-copper-comet';
  controls.placeBtn.listeners.click();
  assert.equal(controls.bet, 10);
  assert.equal(controls.selectedHorseId, 'horse-copper-comet');
  assert.equal(controls.hub.balance, 100);
  assert.equal(controls.ticket, null);
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
  const nextCircuitRace = new Date(2026, 9, 16, 8).getTime();
  const now = nextCircuitRace + 200_001;
  engine.experience = {
    horse: { lastProcessedRaceId: previousEvening, runners: {} },
    car: { lastProcessedRaceId: previousEvening, runners: {} }
  };
  let saveCount = 0;
  engine.saveExperience = () => { saveCount += 1; };

  engine.processCompletedRaces(now);

  for (const [type, expectedStarts, expectedLastRaceId] of [
    ['horse', 6, morningRace],
    ['car', 8, nextCircuitRace]
  ]) {
    const circuit = engine.experience[type];
    const totals = Object.values(circuit.runners).reduce((total, runner) => ({
      starts: total.starts + runner.starts,
      wins: total.wins + runner.wins
    }), { starts: 0, wins: 0 });
    assert.equal(circuit.lastProcessedRaceId, expectedLastRaceId);
    assert.equal(totals.starts, expectedStarts);
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
test('race Max uses remaining cents; Clear Bet changes neither balance nor a placed ticket', () => {
  const race=Object.create(context.window.RaceEngine.prototype);const listeners={};
  const button=name=>({addEventListener:(_event,fn)=>{listeners[name]=fn;}});
  Object.assign(race,{hub:{balance:43.27,player:{maxBet:100}},bet:10,maxBtn:button('max'),clearBtn:button('clear'),modeButtons:[],canBetNow:()=>!race.ticket,updateBetControls(){}});
  race.bindEvents();listeners.max();assert.equal(race.bet,43.27);assert.equal(race.hub.balance,43.27);
  listeners.clear();assert.equal(race.bet,0);assert.equal(race.hub.balance,43.27);
  race.ticket={stake:10};race.bet=10;listeners.clear();listeners.max();assert.equal(race.bet,10);assert.equal(race.ticket.stake,10);
});
