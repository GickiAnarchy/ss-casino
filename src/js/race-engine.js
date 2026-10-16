/*
 * Deterministic, browser-only racing: seeded schedules make previews, results, and unsettled tickets reproducible
 * after refresh; the encrypted active profile stores runner experience and pending outcomes.
 */
/* Local-only horse and car racing circuits for the virtual-chip casino. */
(function installRaceEngine() {
  // Race slots use the browser's local time: 7 AM through 9 PM, alternating circuits hourly.
  // Keep the former two-hour seed bucket so saved tickets reproduce their original races.
  const RACE_SEED_INTERVAL_MS = 2 * 60 * 60 * 1000;
  const RACE_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const RACES_PER_DAY = RACE_HOURS.length;
  const RACE_PREVIEW_OPEN_MS = 45 * 60 * 1000;
  const BETTING_CUTOFF_MS = 5 * 60 * 1000;
  const MIN_RACE_DURATION_SECONDS = 110;
  const MAX_RACE_DURATION_SECONDS = 200;
  const RESULT_DISPLAY_MS = 120_000;
  const BET_STEP = 5;
  const CENTS = 100;
  const HORSE_FIELD_SIZE = 6;
  const CAR_FIELD_SIZE = 8;
  const MAX_EXPERIENCE_BOOST = 0.22;

  // Each stable keeps an identity across races so its experience and record persist.
  const MASTER_HORSES = [
    { id: 'horse-copper-comet', name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
    { id: 'horse-velvet-thunder', name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
    { id: 'horse-lucky-lantern', name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
    { id: 'horse-midnight-marigold', name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
    { id: 'horse-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
    { id: 'horse-golden-gallop', name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
    { id: 'horse-thunder-spirit', name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
    { id: 'horse-midnight-dash', name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
    { id: 'horse-silver-blaze', name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
    { id: 'horse-galloping-ghost', name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
    { id: 'horse-copper-penny', name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
    { id: 'horse-shadow-runner', name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
    { id: 'horse-out-of-this-world', name: 'Out of This World', silks: '👽', lane: '#2e50d5' },
    { id: 'horse-bombs-away', name: 'Bombs Away', silks: '💣', lane: '#44a3d3' },
    { id: 'horse-velvet-rocket', name: 'Velvet Rocket', silks: '🚀', lane: '#8e44ad' },
    { id: 'horse-wildflower', name: 'Wildflower', silks: '🌼', lane: '#f39c12' },
    { id: 'horse-iron-hoof', name: 'Iron Hoof', silks: '🧲', lane: '#7f8c8d' },
    { id: 'horse-storm-chaser', name: 'Storm Chaser', silks: '🌩️', lane: '#2980b9' },
    { id: 'horse-peppermint', name: 'Peppermint', silks: '🍬', lane: '#16a085' },
    { id: 'horse-starling', name: 'Starling', silks: '⭐', lane: '#c0392b' },
    { id: 'horse-quiet-thunder', name: 'Quiet Thunder', silks: '🐎', lane: '#6c5ce7' },
    { id: 'horse-ember-trail', name: 'Ember Trail', silks: '🔥', lane: '#d35400' },
    { id: 'horse-sunrise-sprint', name: 'Sunrise Sprint', silks: '🌅', lane: '#e84393' },
    { id: 'horse-blue-comet', name: 'Blue Comet', silks: '☄️', lane: '#0984e3' }
  ];

  const MASTER_CARS = [
    { id: 'car-neon-viper', name: 'Neon Viper', silks: '🏎️', lane: '#e74c3c' },
    { id: 'car-midnight-rally', name: 'Midnight Rally', silks: '🚗', lane: '#34495e' },
    { id: 'car-golden-apex', name: 'Golden Apex', silks: '🏁', lane: '#f1c40f' },
    { id: 'car-turbo-tiger', name: 'Turbo Tiger', silks: '🐯', lane: '#e67e22' },
    { id: 'car-electric-comet', name: 'Electric Comet', silks: '⚡', lane: '#3498db' },
    { id: 'car-velvet-gt', name: 'Velvet GT', silks: '🟣', lane: '#9b59b6' },
    { id: 'car-green-machine', name: 'Green Machine', silks: '🟢', lane: '#2ecc71' },
    { id: 'car-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
    { id: 'car-rocket-88', name: 'Rocket 88', silks: '🚀', lane: '#8e44ad' },
    { id: 'car-drift-king', name: 'Drift King', silks: '🛞', lane: '#16a085' },
    { id: 'car-blue-lightning', name: 'Blue Lightning', silks: '🌩️', lane: '#2980b9' },
    { id: 'car-ruby-racer', name: 'Ruby Racer', silks: '🏎️', lane: '#c0392b' },
    { id: 'car-desert-fox', name: 'Desert Fox', silks: '🦊', lane: '#d35400' },
    { id: 'car-lime-machine', name: 'Lime Machine', silks: '🍋', lane: '#27ae60' },
    { id: 'car-night-owl', name: 'Night Owl', silks: '🦉', lane: '#6c5ce7' },
    { id: 'car-pink-nitro', name: 'Pink Nitro', silks: '💨', lane: '#e84393' },
    { id: 'car-ironclad', name: 'Ironclad', silks: '🛡️', lane: '#7f8c8d' },
    { id: 'car-sunrise-coupe', name: 'Sunrise Coupe', silks: '🌅', lane: '#f39c12' },
    { id: 'car-copperhead', name: 'Copperhead', silks: '🐍', lane: '#d35400' },
    { id: 'car-starlight', name: 'Starlight', silks: '✨', lane: '#95a5a6' },
    { id: 'car-rapid-rabbit', name: 'Rapid Rabbit', silks: '🐇', lane: '#1abc9c' },
    { id: 'car-blackout', name: 'Blackout', silks: '🌑', lane: '#2c3e50' },
    { id: 'car-apricot-flash', name: 'Apricot Flash', silks: '🍑', lane: '#e17055' },
    { id: 'car-polar-star', name: 'Polar Star', silks: '❄️', lane: '#00cec9' }
  ];

  // Kept only so old horse tickets/result notices still make sense after this update.
  const LEGACY_HORSES = [
    { name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
    { name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
    { name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
    { name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
    { name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
    { name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
    { name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
    { name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
    { name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
    { name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
    { name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
    { name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
    { name: 'Out of this World', silks: '👽', lane: '#2e50d5' },
    { name: 'Bombs Away', silks: '💣', lane: '#44a3d3' }
  ];

  /** Controls local race timing, generated fields, animation, betting, tickets, and between-session settlement. */
  class RaceEngine {
    constructor(hub, { fx, jackpot, xp } = {}) {
      this.hub = hub;
      this.fx = fx;
      this.jackpot = jackpot;
      this.xp = xp;
      this.bet = 10;
      this.raceType = 'horse';
      this.selectedHorseId = null;
      this.targetRaceId = null;
      this.trackRaceId = null;
      this.trackRaceType = null;
      this.ticket = null;
      this.raceResultNotice = null;
      this.lastResultText = '';
      this.isRaceInProgress = false;
      this.isResultDisplay = false;
      this.isRacePreviewOpen = false;
      this.isBettingOpen = false;
      this.experience = this.loadExperience();

      this.bindElements();
      this.bindEvents();
      this.loadProfileTicket();
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
      this.initializeExperience(Date.now());
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
      this.update();

      // The race clock and experience records are local to this browser; no live feed or paid service is used.
      window.setInterval(() => this.update(), 250);
    }

    bindElements() {
      this.statusEl = document.getElementById('race-status');
      this.raceTitleEl = document.getElementById('race-title');
      this.raceNumberEl = document.getElementById('race-number');
      this.phaseEl = document.getElementById('race-phase-label');
      this.countdownEl = document.getElementById('race-countdown');
      this.startTimeEl = document.getElementById('race-start-time');
      this.raceDurationEl = document.getElementById('race-duration');
      this.trackCaptionEl = document.getElementById('race-track-caption');
      this.trackEl = document.getElementById('race-track');
      this.targetTextEl = document.getElementById('race-target-text');
      this.runnerListEl = document.getElementById('race-runner-list');
      this.betDisplayEl = document.getElementById('race-bet-display');
      this.estimatedReturnEl = document.getElementById('race-estimated-return');
      this.ticketNoteEl = document.getElementById('race-ticket-note');
      this.minusBtn = document.getElementById('btn-race-minus');
      this.plusBtn = document.getElementById('btn-race-plus');
      this.maxBtn = document.getElementById('btn-race-max');
      this.placeBtn = document.getElementById('btn-race-bet');
      this.resultNoticeEl = document.getElementById('race-result-notice');
      this.resultNoticeTextEl = document.getElementById('race-result-notice-text');
      this.viewResultsBtn = document.getElementById('btn-view-race-results');
      this.dismissResultBtn = document.getElementById('btn-dismiss-race-result');
      this.modeButtons = [...document.querySelectorAll('[data-race-type]')];
    }

    bindEvents() {
      this.minusBtn?.addEventListener('click', () => {
        if (!this.canBetNow()) return;
        this.fx?.playClick();
        this.bet = Math.max(BET_STEP, this.roundMoney(this.bet - BET_STEP));
        this.updateBetControls();
      });
      this.plusBtn?.addEventListener('click', () => {
        if (!this.canBetNow()) return;
        this.fx?.playClick();
        this.bet = Math.min(this.maxStake(), this.roundMoney(this.bet + BET_STEP));
        this.updateBetControls();
      });
      this.maxBtn?.addEventListener('click', () => {
        if (!this.canBetNow()) return;
        this.fx?.playClick();
        this.bet = this.maxStake();
        this.updateBetControls();
      });
      this.placeBtn?.addEventListener('click', () => this.placeBet());
      this.viewResultsBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(true));
      this.dismissResultBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(false));
      this.runnerListEl?.addEventListener('click', event => {
        const option = event.target.closest('[data-runner-id]');
        if (!option || option.disabled || !this.canBetNow()) return;
        this.fx?.playClick();
        this.selectedHorseId = option.dataset.runnerId;
        this.updateRunnerSelection();
        this.updateBetControls();
      });
    }

    loadProfileTicket() {
      const save = window.LocalProfiles?.getCurrentSave();
      this.ticket = save?.raceBet || null;
      this.raceResultNotice = save?.raceResultNotice || null;
    }

    loadExperience() {
      const save = window.LocalProfiles?.getCurrentSave();
      return save?.raceExperience && typeof save.raceExperience === 'object'
        ? save.raceExperience
        : { horse: null, car: null };
    }

    initializeExperience(now) {
      const firstCursor = this.getScheduledRaceAtOrBefore(now - MAX_RACE_DURATION_SECONDS * 1000) || 0;
      for (const type of ['horse', 'car']) {
        if (!this.experience[type] || typeof this.experience[type] !== 'object') {
          this.experience[type] = { lastProcessedRaceId: firstCursor, runners: {} };
        } else {
          this.experience[type].runners ||= {};
          if (!Number.isSafeInteger(this.experience[type].lastProcessedRaceId)) {
            this.experience[type].lastProcessedRaceId = firstCursor;
          }
        }
      }
    }

    resetForActiveProfile() {
      this.bet = 10;
      this.selectedHorseId = null;
      this.targetRaceId = null;
      this.trackRaceId = null;
      this.trackRaceType = null;
      this.experience = this.loadExperience();
      this.loadProfileTicket();
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
      this.initializeExperience(Date.now());
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
      this.update();
    }

    hasPendingTicket() {
      return Boolean(this.ticket);
    }

    roundMoney(value) {
      return Math.round(Number(value) * CENTS) / CENTS;
    }

    maxStake() {
      return Math.max(0, this.roundMoney(Math.min(this.hub.balance, this.hub.player.maxBet)));
    }

    getMaster(type = this.raceType) {
      return type === 'car' ? MASTER_CARS : MASTER_HORSES;
    }

    getRunnerStats(type, runnerId) {
      const stats = this.experience?.[type]?.runners?.[runnerId] || {};
      return {
        starts: Number.isSafeInteger(stats.starts) && stats.starts > 0 ? stats.starts : 0,
        wins: Number.isSafeInteger(stats.wins) && stats.wins > 0 ? stats.wins : 0
      };
    }

    // Race slots are created in local time, so the quiet overnight window follows the user's device clock.
    // Use the device calendar and timezone so daytime race times match the player clock.
    getScheduledRaceAtOrBefore(timestamp) {
      const instant = new Date(timestamp);
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
        const date = new Date(instant);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - dayOffset);
        for (let index = RACE_HOURS.length - 1; index >= 0; index -= 1) {
          const slot = new Date(date);
          slot.setHours(RACE_HOURS[index], 0, 0, 0);
          if (slot.getTime() <= timestamp) return slot.getTime();
        }
      }
      return null;
    }

    // Scan local calendar hours instead of adding fixed 24-hour blocks, which can fail across daylight-saving changes.
    getNextRaceStart(timestamp) {
      const instant = new Date(timestamp);
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
        const date = new Date(instant);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + dayOffset);
        for (const hour of RACE_HOURS) {
          const slot = new Date(date);
          slot.setHours(hour, 0, 0, 0);
          if (slot.getTime() > timestamp) return slot.getTime();
        }
      }
      return null;
    }

    getScheduledRaceType(eventId) {
      const slotIndex = RACE_HOURS.indexOf(new Date(eventId).getHours());
      return slotIndex >= 0 && slotIndex % 2 === 1 ? 'car' : 'horse';
    }

    getRaceNumber(eventId) {
      const date = new Date(eventId);
      const dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
      const yearStartUtc = Date.UTC(date.getFullYear(), 0, 1);
      const dayOfYear = Math.floor((dateUtc - yearStartUtc) / 86_400_000);
      const slotIndex = Math.max(0, RACE_HOURS.indexOf(date.getHours()));
      return dayOfYear * RACES_PER_DAY + slotIndex + 1;
    }

    isBettingOpenFor(raceId, now) {
      return now >= raceId - RACE_PREVIEW_OPEN_MS && now < raceId - BETTING_CUTOFF_MS;
    }

    isRacePreviewOpenFor(raceId, now) {
      return now >= raceId - RACE_PREVIEW_OPEN_MS;
    }

    getNextBettingOpen(timestamp) {
      const nextRaceId = this.getNextRaceStart(timestamp);
      return nextRaceId ? nextRaceId - RACE_PREVIEW_OPEN_MS : null;
    }

    canBetNow(now = Date.now()) {
      if (this.ticket) return false;
      const nextRaceId = this.getNextRaceStart(now);
      return Boolean(nextRaceId && this.isBettingOpenFor(nextRaceId, now));
    }

    // Seed each event and race type so refreshes and profile reloads reproduce the same field and outcome.
    // This small seeded PRNG provides repeatability, not cryptographic security; outcomes are virtual local simulations.
    makeRandom(eventId, type = this.raceType, stream = 0) {
      const typeSeed = type === 'car' ? 0x5bd1e995 : 0x27d4eb2f;
      let state = (Math.floor(eventId / RACE_SEED_INTERVAL_MS) * 2_654_435_761 + 1_013_904_223 + typeSeed + stream) >>> 0;
      return () => {
        state = (state + 0x6D2B79F5) >>> 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
      };
    }

    // Stable inputs derive entrants, odds, duration, and winner so a refresh cannot reroll an offered event.
    createRace(eventId, type = this.getScheduledRaceType(eventId)) {
      const random = this.makeRandom(eventId, type);
      const durationRandom = this.makeRandom(eventId, type, 0x9e3779b9);
      const durationSeconds = MIN_RACE_DURATION_SECONDS + Math.floor(
        durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1)
      );
      const master = [...this.getMaster(type)];
      for (let i = master.length - 1; i > 0; i -= 1) {
        const j = Math.floor(random() * (i + 1));
        [master[i], master[j]] = [master[j], master[i]];
      }

      const fieldSize = type === 'car' ? CAR_FIELD_SIZE : HORSE_FIELD_SIZE;
      const entrants = master.slice(0, fieldSize).map((runner, index) => {
        const stats = this.getRunnerStats(type, runner.id);
        const experienceBoost = Math.min(MAX_EXPERIENCE_BOOST, stats.starts * 0.0033);
        const form = (stats.wins + 1) / (stats.starts + 2);
        const formMultiplier = 0.9 + form * 0.2;
        const baseAbility = 0.88 + random() * 0.24;
        return {
          ...runner,
          ability: baseAbility * (1 + experienceBoost) * formMultiplier,
          finishFactor: 0.74 + random() * 0.2,
          starts: stats.starts,
          wins: stats.wins,
          index
        };
      });

      // Both prior starts and the win record influence current ability, odds, and simulated win chance.
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      entrants.forEach((runner, index) => {
        runner.winProbability = weights[index] / totalWeight;
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
      });

      let draw = random() * totalWeight;
      let winnerIndex = weights.findIndex(weight => {
        draw -= weight;
        return draw < 0;
      });
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;

      // The on-screen sprint finishes in the same order as its seeded result.
      const winner = entrants[winnerIndex];
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);

      return {
        eventId,
        number: this.getRaceNumber(eventId),
        type,
        durationMs: durationSeconds * 1000,
        entrants,
        winnerId: entrants[winnerIndex].id
      };
    }

    // Re-create tickets from the previous 11-minute schedule only for old saved horse bets/notices.
    // Preserve the old seed and runner IDs only to settle saved tickets created by the former schedule format.
    createLegacyRace(eventId) {
      const oldInterval = 660_000;
      const random = () => {
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223) >>> 0;
        return () => {
          state = (state + 0x6D2B79F5) >>> 0;
          let value = state;
          value = Math.imul(value ^ (value >>> 15), value | 1);
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
        };
      };
      const rand = random();
      const durationRandom = (() => {
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223 + 0x9e3779b9) >>> 0;
        return () => {
          state = (state + 0x6D2B79F5) >>> 0;
          let value = state;
          value = Math.imul(value ^ (value >>> 15), value | 1);
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
        };
      })();
      const durationMs = (MIN_RACE_DURATION_SECONDS + Math.floor(durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1))) * 1000;
      const shuffled = [...LEGACY_HORSES];
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      const entrants = shuffled.slice(0, 6).map((runner, index) => ({
        ...runner,
        id: `horse-${index + 1}`,
        ability: 0.9 + rand() * 0.2,
        finishFactor: 0.74 + rand() * 0.2,
        index
      }));
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      entrants.forEach((runner, index) => {
        runner.winProbability = weights[index] / totalWeight;
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
      });
      let draw = rand() * totalWeight;
      let winnerIndex = weights.findIndex(weight => { draw -= weight; return draw < 0; });
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;
      const winner = entrants[winnerIndex];
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);
      return { eventId, number: Math.floor(eventId / oldInterval), type: 'horse', durationMs, entrants, winnerId: entrants[winnerIndex].id };
    }

    raceStartTime(eventId) {
      return new Date(eventId).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    raceDateTime(eventId) {
      return new Date(eventId).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }

    formatMoney(value) {
      return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    formatCountdown(milliseconds) {
      const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;
      return hours > 0
        ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
        : `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
    }

    formatRaceResult(notice) {
      const isLegacy = !['horse', 'car'].includes(notice.raceType);
      const race = isLegacy ? this.createLegacyRace(notice.raceId) : this.createRace(notice.raceId, notice.raceType);
      const runner = race.entrants.find(item => item.id === notice.runnerId);
      const winner = race.entrants.find(item => item.id === notice.winnerId);
      const label = isLegacy ? `Race #${race.number.toLocaleString('en-US')}` : `${notice.raceType === 'car' ? 'Car' : 'Horse'} race #${race.number.toLocaleString('en-US')}`;
      if (notice.won) {
        return `${label}: ${runner?.name || 'Your runner'} won! Your bet returned ${this.formatMoney(notice.payout)} including your stake.`;
      }
      return `${label}: ${runner?.name || 'Your runner'} did not win; ${winner?.name || 'another runner'} took the race. Your ${this.formatMoney(notice.stake)} stake was lost.`;
    }

    renderRaceResultNotice() {
      if (!this.resultNoticeEl) return;
      if (!this.raceResultNotice) {
        this.resultNoticeEl.classList.add('hidden-view');
        return;
      }
      const message = this.formatRaceResult(this.raceResultNotice);
      if (this.resultNoticeTextEl && this.resultNoticeTextEl.textContent !== message) {
        this.resultNoticeTextEl.textContent = message;
      }
      this.resultNoticeEl.classList.remove('hidden-view');
    }

    acknowledgeRaceNotice(openRace) {
      const notice = this.raceResultNotice;
      if (!notice) return;
      this.lastResultText = this.formatRaceResult(notice);
      this.raceResultNotice = null;
      window.LocalProfiles?.saveCurrent({ raceResultNotice: null });
      window.LocalSave?.queueFileSave();
      this.renderRaceResultNotice();
      if (openRace) {
        if (['horse', 'car'].includes(notice.raceType)) this.raceType = notice.raceType;
        this.hub.switchView('horse-racing');
        this.update();
      }
      this.updateTicketNote();
    }

    // Simulate completed events missed while the browser was closed, so experience keeps progressing.
    // Advance missed events when the player returns so runner records do not require an open tab all day.
    processCompletedRaces(now) {
      let changed = false;
      for (const type of ['horse', 'car']) {
        const circuit = this.experience[type];
        let nextId = this.getNextRaceStart(circuit.lastProcessedRaceId);
        let processedCount = 0;
        while (nextId && processedCount < 1000) {
          const scheduledType = this.getScheduledRaceType(nextId);
          const race = this.createRace(nextId, scheduledType);
          if (nextId + race.durationMs > now) break;
          if (scheduledType === type) {
            const runners = circuit.runners;
            race.entrants.forEach(runner => {
              const stats = runners[runner.id] || { starts: 0, wins: 0 };
              stats.starts += 1;
              if (runner.id === race.winnerId) stats.wins += 1;
              runners[runner.id] = stats;
            });
            circuit.lastProcessedRaceId = nextId;
            changed = true;
          }
          nextId = this.getNextRaceStart(nextId);
          processedCount += 1;
        }
      }
      if (changed) this.saveExperience();
    }

    saveExperience() {
      window.LocalProfiles?.saveCurrent({ raceExperience: this.experience });
      window.LocalSave?.queueFileSave();
    }

    // One clock tick derives the live race and next betting race, then refreshes the dependent UI.
    update() {
      const now = Date.now();
      this.processCompletedRaces(now);
      const currentStart = this.getScheduledRaceAtOrBefore(now);
      const activeRace = currentStart ? this.createRace(currentStart) : null;
      const activeRaceEnd = activeRace ? activeRace.eventId + activeRace.durationMs : 0;
      this.isRaceInProgress = Boolean(activeRace && now < activeRaceEnd);
      this.isResultDisplay = Boolean(activeRace && !this.isRaceInProgress && now < activeRaceEnd + RESULT_DISPLAY_MS);
      const nextRaceId = this.getNextRaceStart(now);
      const bettingRace = this.createRace(nextRaceId);
      this.raceType = bettingRace.type;
      const wasRacePreviewOpen = this.isRacePreviewOpen;
      this.isRacePreviewOpen = this.isRacePreviewOpenFor(bettingRace.eventId, now);
      this.isBettingOpen = this.isBettingOpenFor(bettingRace.eventId, now);

      // Tickets retain their stored event result, so profile reloads cannot alter a wager already placed.
      const ticketDuration = this.ticket?.durationMs || (this.ticket
        ? (this.ticket.raceType ? this.createRace(this.ticket.raceId, this.ticket.raceType).durationMs : this.createLegacyRace(this.ticket.raceId).durationMs)
        : 0);
      if (this.ticket && now >= this.ticket.raceId + ticketDuration) this.settleTicket();

      const trackIsCurrent = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
      const trackRace = trackIsCurrent ? activeRace : (this.isRacePreviewOpen ? bettingRace : null);
      const targetRaceChanged = this.targetRaceId !== bettingRace.eventId;
      if (targetRaceChanged) {
        this.targetRaceId = bettingRace.eventId;
        this.selectedHorseId = null;
        this.lastResultText = '';
      }
      if (targetRaceChanged || wasRacePreviewOpen !== this.isRacePreviewOpen) {
        this.renderRunnerOptions(this.isRacePreviewOpen ? bettingRace : null);
        if (!this.isRacePreviewOpen) this.selectedHorseId = null;
      }
      const trackRaceId = trackRace?.eventId || null;
      const trackRaceType = trackRace?.type || null;
      if (this.trackRaceId !== trackRaceId || this.trackRaceType !== trackRaceType) {
        this.trackRaceId = trackRaceId;
        this.trackRaceType = trackRaceType;
        this.renderTrack(trackRace);
      }
      const progress = this.isRaceInProgress
        ? (now - activeRace.eventId) / activeRace.durationMs
        : (this.isResultDisplay ? 1 : 0);
      if (trackRace) this.updateTrackPositions(trackRace, progress, trackIsCurrent);
      this.updateClockAndStatus(bettingRace, activeRace, now, nextRaceId - now);
      this.updateRunnerSelection();
      this.updateBetControls();
      this.updateTicketNote();
      this.updateModeButtons(trackIsCurrent ? activeRace.type : (this.isRacePreviewOpen ? bettingRace.type : null));
      this.renderRaceResultNotice();
    }

    updateClockAndStatus(bettingRace, activeRace, now, remaining) {
      const showingActiveRace = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
      if (!showingActiveRace && !this.isRacePreviewOpen) {
        const nextOpen = this.getNextBettingOpen(now);
        const opensAt = this.raceStartTime(nextOpen);
        if (this.raceTitleEl) this.raceTitleEl.textContent = 'Racing Closed';
        if (this.raceNumberEl) this.raceNumberEl.textContent = '—';
        if (this.phaseEl) this.phaseEl.textContent = 'CLOSED';
        const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
        if (countdownLabel) countdownLabel.textContent = 'BETTING OPENS IN';
        if (this.countdownEl) this.countdownEl.textContent = this.formatCountdown(nextOpen - now);
        if (this.startTimeEl) this.startTimeEl.textContent = '—';
        if (this.raceDurationEl) this.raceDurationEl.textContent = '—';
        if (this.targetTextEl) this.targetTextEl.textContent = `Racing is closed. The next preview and betting open at ${opensAt}.`;
        if (this.trackCaptionEl) this.trackCaptionEl.textContent = 'RACING CLOSED';
        this.setStatus(`CLOSED — RACING RESUMES AT ${opensAt}`, 'status-loss');
        return;
      }

      const raceNumber = `#${bettingRace.number.toLocaleString('en-US')}`;
      const displayedRace = showingActiveRace ? activeRace : bettingRace;
      const displayedRaceNumber = `#${displayedRace.number.toLocaleString('en-US')}`;
      const typeLabel = bettingRace.type === 'car' ? 'car' : 'horse';
      if (this.raceTitleEl) this.raceTitleEl.textContent = displayedRace.type === 'car' ? 'Circuit Racing' : 'Horse Racing';
      if (this.raceNumberEl) this.raceNumberEl.textContent = displayedRaceNumber;
      if (this.phaseEl) {
        this.phaseEl.textContent = this.isRaceInProgress
          ? 'RACING'
          : (this.isResultDisplay ? 'RESULTS' : (this.isBettingOpen ? 'BETTING OPEN' : 'BETTING CLOSED'));
      }
      const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
      if (countdownLabel) countdownLabel.textContent = this.isRaceInProgress ? 'FINISH IN' : 'NEXT STARTS IN';
      const displayRace = displayedRace;
      if (this.countdownEl) this.countdownEl.textContent = this.isRaceInProgress
        ? this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))
        : this.formatCountdown(remaining);
      if (this.startTimeEl) this.startTimeEl.textContent = this.raceDateTime(displayedRace.eventId);
      if (this.raceDurationEl) this.raceDurationEl.textContent = this.formatCountdown(displayRace.durationMs);
      if (this.targetTextEl) {
        const cutoff = this.raceStartTime(bettingRace.eventId - BETTING_CUTOFF_MS);
        const nextOpen = this.raceStartTime(bettingRace.eventId - RACE_PREVIEW_OPEN_MS);
        const targetMessage = !this.isRacePreviewOpen
          ? `The next preview and betting open at ${nextOpen}.`
          : (this.isBettingOpen
            ? `Choose a ${bettingRace.type === 'car' ? 'car' : 'horse'} for ${typeLabel} race ${raceNumber}. Betting closes at ${cutoff}, five minutes before the start.`
            : `Betting is closed for ${typeLabel} race ${raceNumber}. The next field starts at ${this.raceStartTime(bettingRace.eventId)}.`);
        this.targetTextEl.textContent = this.isRaceInProgress
          ? `The current ${activeRace.type} race is underway. ${targetMessage}`
          : targetMessage;
      }
      if (this.trackCaptionEl) {
        const currentNo = activeRace ? `#${activeRace.number.toLocaleString('en-US')}` : '';
        this.trackCaptionEl.textContent = this.isRaceInProgress
          ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — LIVE`
          : (this.isResultDisplay
            ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — FINAL RESULT`
            : `${bettingRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${raceNumber} — NEXT FIELD PREVIEW`);
      }

      if (this.statusEl) {
        if (this.isRaceInProgress) {
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE IN PROGRESS — ${this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))} TO FINISH`, 'status-spinning');
        } else if (this.isResultDisplay) {
          const winner = activeRace.entrants.find(runner => runner.id === activeRace.winnerId);
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE FINISHED — ${winner?.name || 'WINNER'} TAKES THE WIN`, 'status-win');
        } else if (!this.isBettingOpen) {
          this.setStatus(`BETTING CLOSED — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-loss');
        } else {
          this.setStatus(`BETTING OPEN — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-spinning');
        }
      }
    }

    setStatus(message, statusClass) {
      if (!this.statusEl) return;
      this.statusEl.textContent = message;
      this.statusEl.classList.remove('status-spinning', 'status-win', 'status-loss');
      this.statusEl.classList.add(statusClass);
    }

    renderRunnerOptions(race) {
      if (!this.runnerListEl) return;
      this.runnerListEl.replaceChildren();
      if (!race) {
        this.runnerListEl.setAttribute('aria-label', 'Race runners hidden until the preview opens');
        return;
      }
      this.runnerListEl.setAttribute('aria-label', `Choose a ${race.type === 'car' ? 'car' : 'horse'} to win`);
      race.entrants.forEach((runner, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'race-runner-option';
        button.dataset.runnerId = runner.id;
        button.setAttribute('aria-pressed', 'false');
        const silks = document.createElement('span');
        silks.className = 'race-runner-silks';
        silks.textContent = runner.silks;
        const details = document.createElement('span');
        details.className = 'race-runner-details';
        const name = document.createElement('strong');
        name.textContent = `${index + 1}. ${runner.name}`;
        const probability = document.createElement('small');
        probability.textContent = `${Math.round(runner.winProbability * 100)}% chance • ${runner.starts} starts / ${runner.wins} wins`;
        details.append(name, probability);
        const odds = document.createElement('span');
        odds.className = 'race-runner-odds';
        odds.textContent = `${runner.odds.toFixed(2)}×`;
        const oddsCaption = document.createElement('small');
        oddsCaption.textContent = 'total return';
        const oddsWrap = document.createElement('span');
        oddsWrap.className = 'race-odds-wrap';
        oddsWrap.append(odds, oddsCaption);
        button.append(silks, details, oddsWrap);
        this.runnerListEl.appendChild(button);
      });
    }

    renderTrack(race) {
      if (!this.trackEl) return;
      this.trackEl.replaceChildren();
      if (!race) return;
      race.entrants.forEach((runner, index) => {
        const lane = document.createElement('div');
        lane.className = `race-lane ${race.type === 'car' ? 'race-car-lane' : 'race-horse-lane'}`;
        lane.dataset.runnerId = runner.id;
        const laneNumber = document.createElement('span');
        laneNumber.className = 'race-lane-number';
        laneNumber.textContent = String(index + 1);
        const rail = document.createElement('div');
        rail.className = 'race-lane-rail';
        const finish = document.createElement('span');
        finish.className = 'race-finish-line';
        finish.setAttribute('aria-hidden', 'true');
        const token = document.createElement('span');
        token.className = race.type === 'car' ? 'race-horse-token race-car-token' : 'race-horse-token';
        token.textContent = runner.silks;
        token.setAttribute('aria-label', runner.name);
        token.style.setProperty('--silks-color', runner.lane);
        rail.append(finish, token);
        const name = document.createElement('span');
        name.className = 'race-lane-name';
        name.textContent = runner.name;
        lane.append(laneNumber, rail, name);
        this.trackEl.appendChild(lane);
      });
    }

    updateTrackPositions(race, progress, isRunning) {
      if (!this.trackEl) return;
      const winnerId = race.winnerId;
      this.trackEl.querySelectorAll('.race-lane').forEach(lane => {
        const runner = race.entrants.find(item => item.id === lane.dataset.runnerId);
        const token = lane.querySelector('.race-horse-token');
        const isWinner = runner?.id === winnerId;
        const position = isRunning
          ? Math.min(isWinner ? 100 : 94, progress * runner.finishFactor * 100)
          : 0;
        token.style.left = `${position}%`;
        lane.classList.toggle('is-race-winner', isWinner && isRunning && progress >= 1);
        lane.classList.toggle('is-race-running', isRunning);
      });
    }

    updateRunnerSelection() {
      if (!this.runnerListEl) return;
      this.runnerListEl.querySelectorAll('[data-runner-id]').forEach(button => {
        const isSelected = button.dataset.runnerId === this.selectedHorseId;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
        button.disabled = !this.isBettingOpen || Boolean(this.ticket);
      });
    }

    updateModeButtons(visibleRaceType = null) {
      this.modeButtons.forEach(item => {
        const active = Boolean(visibleRaceType && item.dataset.raceType === visibleRaceType);
        item.classList.toggle('is-active', active);
        if (active) item.setAttribute('aria-current', 'true');
        else item.removeAttribute('aria-current');
      });
    }

    updateBetControls() {
      if (this.betDisplayEl) this.betDisplayEl.textContent = this.formatMoney(this.bet);
      const currentRace = this.createRace(this.targetRaceId || this.getNextRaceStart(Date.now()));
      const selectedRunner = currentRace.entrants.find(runner => runner.id === this.selectedHorseId);
      const potential = selectedRunner ? this.roundMoney(this.bet * selectedRunner.odds) : 0;
      if (this.estimatedReturnEl) this.estimatedReturnEl.textContent = this.formatMoney(potential);
      const maximum = this.maxStake();
      const betOpen = this.isBettingOpen && !this.ticket;
      if (this.minusBtn) this.minusBtn.disabled = !betOpen || this.bet <= BET_STEP;
      if (this.plusBtn) this.plusBtn.disabled = !betOpen || this.bet + BET_STEP > maximum;
      if (this.maxBtn) this.maxBtn.disabled = !betOpen || maximum <= 0 || this.bet >= maximum;
      if (this.placeBtn) {
        this.placeBtn.disabled = !betOpen || !selectedRunner || this.bet <= 0 || this.bet > maximum;
        this.placeBtn.textContent = !this.isRacePreviewOpen
          ? 'RACING CLOSED'
          : (selectedRunner
            ? `PLACE WIN BET • ${this.formatMoney(this.bet)}`
            : (!this.isBettingOpen ? 'BETTING CLOSED' : `SELECT A ${this.raceType === 'car' ? 'CAR' : 'HORSE'}`));
      }
    }

    updateTicketNote() {
      if (!this.ticketNoteEl) return;
      if (this.lastResultText) {
        this.ticketNoteEl.textContent = this.lastResultText;
        return;
      }
      if (this.ticket) {
        const legacy = !['horse', 'car'].includes(this.ticket.raceType);
        const type = legacy ? 'horse' : this.ticket.raceType;
        const currentRace = legacy ? this.createLegacyRace(this.ticket.raceId) : this.createRace(this.ticket.raceId, type);
        const runner = currentRace.entrants.find(item => item.id === this.ticket.runnerId);
        const potential = this.roundMoney(this.ticket.stake * this.ticket.odds);
        this.ticketNoteEl.textContent = `Locked ticket: ${this.formatMoney(this.ticket.stake)} on ${runner?.name || 'your runner'} in the ${type} race at ${this.raceStartTime(this.ticket.raceId)}, ${this.ticket.odds.toFixed(2)}×. Potential total return: ${this.formatMoney(potential)}.`;
        return;
      }
      this.ticketNoteEl.textContent = !this.isRacePreviewOpen
        ? 'Racing is closed. Preview and betting open 45 minutes before the next race. Virtual chips only.'
        : (this.isBettingOpen
          ? 'One open ticket at a time across both circuits. Virtual chips only.'
          : 'Betting closes five minutes before each start. Your chips are virtual only.');
    }

    // Record the event, runner, stake, odds, and duration before settlement; deduct the stake only once.
    placeBet() {
      const now = Date.now();
      const raceId = this.getNextRaceStart(now);
      const bettingRace = this.createRace(raceId);
      const selectedRunner = bettingRace.entrants.find(runner => runner.id === this.selectedHorseId);
      const maximum = this.maxStake();
      if (!this.canBetNow(now) || !selectedRunner || this.bet <= 0 || this.bet > maximum) return;

      this.fx?.playClick();
      this.ticket = {
        raceId: bettingRace.eventId,
        raceType: bettingRace.type,
        runnerId: selectedRunner.id,
        stake: this.roundMoney(this.bet),
        odds: selectedRunner.odds,
        winnerId: bettingRace.winnerId,
        durationMs: bettingRace.durationMs
      };
      this.hub.balance = this.roundMoney(this.hub.balance - this.ticket.stake);
      window.LocalProfiles?.saveCurrent({
        player: this.hub.player.toProfile(),
        raceBet: this.ticket
      });
      this.hub.updateGlobalUI();
      window.LocalSave?.queueFileSave();
      this.jackpot?.contribute(this.ticket.stake * 0.015);
      this.xp?.addWagerXP(this.ticket.stake);
      this.lastResultText = '';
      this.update();
    }

    // Reconstruct the recorded seeded result and settle the saved ticket even if the player returns later.
    settleTicket() {
      const ticket = this.ticket;
      if (!ticket) return;
      const legacy = !['horse', 'car'].includes(ticket.raceType);
      const raceType = legacy ? 'horse' : ticket.raceType;
      const finishedRace = legacy ? this.createLegacyRace(ticket.raceId) : this.createRace(ticket.raceId, raceType);
      const winnerId = ticket.winnerId || finishedRace.winnerId;
      const won = ticket.runnerId === winnerId;
      const payout = won ? this.roundMoney(ticket.stake * ticket.odds) : 0;
      const notice = {
        raceId: ticket.raceId,
        raceType: legacy ? null : raceType,
        runnerId: ticket.runnerId,
        winnerId,
        stake: ticket.stake,
        payout,
        won
      };
      this.ticket = null;
      this.raceResultNotice = notice;
      if (payout > 0) this.hub.balance = this.roundMoney(this.hub.balance + payout);
      window.LocalProfiles?.saveCurrent({
        player: this.hub.player.toProfile(),
        raceBet: null,
        raceResultNotice: notice
      });
      this.hub.updateGlobalUI();
      window.LocalSave?.queueFileSave();
      this.lastResultText = this.formatRaceResult(notice);
      if (won) {
        this.fx?.playWinSound();
        this.fx?.spawnConfetti(55);
      } else {
        this.fx?.playClick();
      }
      this.renderRaceResultNotice();
      this.update();
    }
  }

  window.RaceEngine = RaceEngine;
})();
