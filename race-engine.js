/* Local-only, scheduled horse races for the virtual-chip casino. */
(function installRaceEngine() {
  // Define timing constants for the race schedule, per-race sprint duration range, result display, and currency steps.
  const RACE_INTERVAL_MS = 660_000; // Time between race starts (11 minutes)
  const MIN_RACE_DURATION_SECONDS = 110; // Each race lasts at least 1 minute 50 seconds
  const MAX_RACE_DURATION_SECONDS = 200; // Each race lasts at most 3 minutes 20 seconds
  const RESULT_DISPLAY_MS = 120_000; // Time results are shown before clearing (2 minutes)
  const BET_STEP = 5; // Minimum incremental change for bets
  const CENTS = 100; // Multiplier for currency rounding

  // Expanded master list of horse names, emojis/silks, and track lane colors
  const MASTER_HORSES = [
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
    { name: 'Out of this World', silks: '👽', lane: '#2e50d5'},
    { name: 'Bombs Away', silks: '💣', lane: '#44a3d3' }
  ];

  // Core RaceEngine class responsible for managing race states, UI updates, and betting logic
  class RaceEngine {
    constructor(hub, { fx, jackpot, xp } = {}) {
      this.hub = hub; // Reference to the main casino hub/state manager
      this.fx = fx; // Sound and visual effects handler
      this.jackpot = jackpot; // Jackpot system reference
      this.xp = xp; // Experience points system reference
      this.bet = 10; // Default bet amount
      this.selectedHorseId = null; // ID of the currently selected horse for betting
      this.targetRaceId = null; // ID of the race currently targeted for bets
      this.trackRaceId = null; // ID of the race currently rendered on the track
      this.ticket = null; // Active player betting ticket, if any
      this.raceResultNotice = null; // Saved result waiting for this profile to view or dismiss
      this.lastResultText = ''; // Text summary of the most recent race outcome
      this.isRaceInProgress = false; // Flag indicating if a race is actively running
      this.isResultDisplay = false; // Flag indicating if the race results are currently being displayed
      
      this.bindElements(); // Cache DOM element references
      this.bindEvents(); // Attach event listeners to UI controls
      this.loadProfileTicket(); // Load any saved pending wager from profile storage
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
      this.update(); // Initial update to render the UI state

      // The clock is local to this browser; no server, live-data feed, or paid service is needed.
      // Poll the engine update method every 250ms to keep timers, countdowns, and race animations smooth.
      window.setInterval(() => this.update(), 250);
    }

    // Cache all necessary DOM elements used by the race engine UI
    bindElements() {
      this.statusEl = document.getElementById('race-status');
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
    }

    // Attach event listeners for betting controls (plus, minus, max, place bet) and runner selection
    bindEvents() {
      // Decrease bet amount button handler
      this.minusBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = Math.max(BET_STEP, this.roundMoney(this.bet - BET_STEP));
        this.updateBetControls();
      });
      // Increase bet amount button handler
      this.plusBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = Math.min(this.maxStake(), this.roundMoney(this.bet + BET_STEP));
        this.updateBetControls();
      });
      // Maximize bet amount button handler
      this.maxBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = this.maxStake();
        this.updateBetControls();
      });
      // Place bet button handler
      this.placeBtn?.addEventListener('click', () => this.placeBet());
      this.viewResultsBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(true));
      this.dismissResultBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(false));
      // Runner list selection handler
      this.runnerListEl?.addEventListener('click', event => {
        const option = event.target.closest('[data-runner-id]');
        if (!option || option.disabled || this.ticket || this.isRaceInProgress) return;
        this.fx?.playClick();
        this.selectedHorseId = option.dataset.runnerId;
        this.updateRunnerSelection();
        this.updateBetControls();
      });
    }

    // Load an unsettled wager from the encrypted profile save so a refresh cannot discard it
    loadProfileTicket() {
      const save = window.LocalProfiles?.getCurrentSave();
      this.ticket = save?.raceBet || null;
      this.raceResultNotice = save?.raceResultNotice || null;
    }

    // Reset race states when switching to a different active profile
    resetForActiveProfile() {
      this.bet = 10;
      this.selectedHorseId = null;
      this.targetRaceId = null;
      this.trackRaceId = null;
      this.loadProfileTicket();
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
      this.update();
    }

    // Returns true if there is currently an active, pending ticket
    hasPendingTicket() {
      return Boolean(this.ticket);
    }

    // Utility function to round money values to two decimal places
    roundMoney(value) {
      return Math.round(Number(value) * CENTS) / CENTS;
    }

    // Calculates the maximum allowable stake based on player balance and max bet limits
    maxStake() {
      return Math.max(0, this.roundMoney(Math.min(this.hub.balance, this.hub.player.maxBet)));
    }

    // Seed each scheduled race by its start time so a saved ticket resolves to the same field after reload
    makeRandom(eventId, stream = 0) {
      let state = (Math.floor(eventId / RACE_INTERVAL_MS) * 2_654_435_761 + 1_013_904_223 + stream) >>> 0;
      return () => {
        state = (state + 0x6D2B79F5) >>> 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
      };
    }

    // Generates a race object including randomized entrants, abilities, odds, and deterministically chosen winner
    createRace(eventId) {
      const random = this.makeRandom(eventId);
      // A separate seeded stream varies each duration without changing existing horse fields or results.
      const durationRandom = this.makeRandom(eventId, 0x9e3779b9);
      const durationSeconds = MIN_RACE_DURATION_SECONDS + Math.floor(
        durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1)
      );

      // Shuffle the master list using the seeded random generator to pick 6 unique horses
      const shuffledMaster = [...MASTER_HORSES];
      for (let i = shuffledMaster.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [shuffledMaster[i], shuffledMaster[j]] = [shuffledMaster[j], shuffledMaster[i]];
      }

      const selectedHorses = shuffledMaster.slice(0, 6);

      // Map selected horses into active entrants with abilities and finish factors
      const entrants = selectedHorses.map((horse, index) => ({
        ...horse,
        id: `horse-${index + 1}`,
        ability: 0.9 + random() * 0.2,
        finishFactor: 0.74 + random() * 0.2,
        index
      }));

      // Calculate win weights and probabilities
      const weights = entrants.map(horse => Math.pow(horse.ability, 8));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      entrants.forEach((horse, index) => {
        horse.winProbability = weights[index] / totalWeight;
        // Decimal odds include the returned stake and bake in a small virtual-chip house margin.
        horse.odds = Math.max(1.2, Math.floor((0.92 / horse.winProbability) * 100) / 100);
      });

      // Determine the winning horse based on weighted random draw
      let draw = random() * totalWeight;
      let winnerIndex = weights.findIndex(weight => {
        draw -= weight;
        return draw < 0;
      });
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;

      return {
        eventId,
        number: Math.floor(eventId / RACE_INTERVAL_MS),
        durationMs: durationSeconds * 1000,
        entrants,
        winnerId: entrants[winnerIndex].id
      };
    }

    // Format event ID timestamp into a local time string
    raceStartTime(eventId) {
      return new Date(eventId).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    // Format monetary value with currency symbol and two decimal places
    formatMoney(value) {
      return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Format milliseconds into a MM:SS countdown string
    formatCountdown(milliseconds) {
      const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
    }

    // Build the same readable result whenever a saved notice is shown again after login.
    formatRaceResult(notice) {
      const race = this.createRace(notice.raceId);
      const horse = race.entrants.find(item => item.id === notice.runnerId);
      const winner = race.entrants.find(item => item.id === notice.winnerId);
      const raceLabel = `Race #${race.number.toLocaleString('en-US')}`;
      if (notice.won) {
        return `${raceLabel} finished: ${horse?.name || 'Your horse'} won! Your bet returned ${this.formatMoney(notice.payout)} including your stake.`;
      }
      return `${raceLabel} finished: ${horse?.name || 'Your horse'} did not win; ${winner?.name || 'another runner'} took the race. Your ${this.formatMoney(notice.stake)} stake was lost.`;
    }

    // Keep offline results visible across profile loads until the player views or dismisses the notice.
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
      if (openRace) this.hub.switchView('horse-racing');
      this.updateTicketNote();
    }

    // Main update tick function executed regularly to handle state changes, settling tickets, and refreshing UI
    update() {
      const now = Date.now();
      const currentStart = Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS;
      const elapsed = now - currentStart;
      const activeRace = this.createRace(currentStart);
      this.isRaceInProgress = elapsed < activeRace.durationMs;
      this.isResultDisplay = !this.isRaceInProgress && elapsed < activeRace.durationMs + RESULT_DISPLAY_MS;
      const nextRaceId = currentStart + RACE_INTERVAL_MS;

      // A ticket is cleared before crediting its payout; that ordering makes settlement safe to retry after reload.
      const ticketDuration = this.ticket?.durationMs || (this.ticket ? this.createRace(this.ticket.raceId).durationMs : 0);
      if (this.ticket && now >= this.ticket.raceId + ticketDuration) this.settleTicket();

      const bettingRace = this.createRace(nextRaceId);
      const trackIsCurrent = this.isRaceInProgress || this.isResultDisplay;
      const trackRace = trackIsCurrent ? this.createRace(currentStart) : bettingRace;
      if (this.targetRaceId !== bettingRace.eventId) {
        this.targetRaceId = bettingRace.eventId;
        this.selectedHorseId = null;
        this.lastResultText = '';
        this.renderRunnerOptions(bettingRace);
      }
      if (this.trackRaceId !== trackRace.eventId) {
        this.trackRaceId = trackRace.eventId;
        this.renderTrack(trackRace);
      }
      this.updateTrackPositions(
        trackRace,
        this.isRaceInProgress ? elapsed / activeRace.durationMs : (this.isResultDisplay ? 1 : 0),
        trackIsCurrent
      );
      this.updateClockAndStatus(bettingRace, activeRace, now, nextRaceId - now);
      this.updateRunnerSelection();
      this.updateBetControls();
      this.updateTicketNote();
      this.renderRaceResultNotice();
    }

    // Updates the clock, status messages, countdown timer, and header texts
    updateClockAndStatus(bettingRace, activeRace, now, remaining) {
      const raceNumber = `#${bettingRace.number.toLocaleString('en-US')}`;
      const activeTicket = this.ticket;
      if (this.raceNumberEl) this.raceNumberEl.textContent = raceNumber;
      if (this.phaseEl) this.phaseEl.textContent = this.isRaceInProgress
        ? 'RACING'
        : (this.isResultDisplay ? 'RESULTS' : 'BETTING OPEN');
      const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
      if (countdownLabel) countdownLabel.textContent = this.isRaceInProgress ? 'FINISH IN' : 'STARTS IN';
      const displayRace = this.isRaceInProgress || this.isResultDisplay ? activeRace : bettingRace;
      if (this.countdownEl) this.countdownEl.textContent = this.isRaceInProgress
        ? this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))
        : this.formatCountdown(remaining);
      if (this.startTimeEl) this.startTimeEl.textContent = this.raceStartTime(bettingRace.eventId);
      if (this.raceDurationEl) this.raceDurationEl.textContent = this.formatCountdown(displayRace.durationMs);
      if (this.targetTextEl) {
        const targetMessage = this.isRaceInProgress
          ? `Choose a runner for race ${raceNumber}; betting opens when the current sprint finishes.`
          : (this.isResultDisplay
            ? `The previous sprint is complete. You may place one win bet for race ${raceNumber}.`
            : `Pick one horse to win in race ${raceNumber}. Bets close when the race starts.`);
        this.targetTextEl.textContent = targetMessage;
      }
      if (this.trackCaptionEl) this.trackCaptionEl.textContent = this.isRaceInProgress
        ? `RACE #${activeRace.number.toLocaleString('en-US')} — LIVE SIMULATION`
        : (this.isResultDisplay
          ? `RACE #${activeRace.number.toLocaleString('en-US')} — FINAL RESULT`
          : `RACE #${bettingRace.number.toLocaleString('en-US')} — NEXT FIELD PREVIEW`);

      if (this.statusEl) {
        if (this.isRaceInProgress) {
          this.setStatus(activeTicket?.raceId === Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS
            ? `YOUR BET IS RUNNING — ${this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))} TO FINISH`
            : `RACE IN PROGRESS — BETTING OPENS AFTER THE FINISH`, 'status-spinning');
        } else if (this.isResultDisplay) {
          const finishedRace = this.createRace(Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS);
          const activeEntrants = finishedRace.entrants;
          const winner = activeEntrants.find(horse => horse.id === finishedRace.winnerId);
          this.setStatus(`RACE FINISHED — ${winner?.name || 'WINNER'} TAKES THE SPRINT`, 'status-win');
        } else {
          this.setStatus(`BETTING OPEN — RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-spinning');
        }
      }
    }

    // Helper to set the status bar text and style class
    setStatus(message, statusClass) {
      if (!this.statusEl) return;
      this.statusEl.textContent = message;
      this.statusEl.classList.remove('status-spinning', 'status-win', 'status-loss');
      this.statusEl.classList.add(statusClass);
    }

    // Renders the list of selectable horses for betting in the UI
    renderRunnerOptions(race) {
      if (!this.runnerListEl) return;
      this.runnerListEl.replaceChildren();
      race.entrants.forEach((horse, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'race-runner-option';
        button.dataset.runnerId = horse.id;
        button.setAttribute('aria-pressed', 'false');
        const silks = document.createElement('span');
        silks.className = 'race-runner-silks';
        silks.textContent = horse.silks;
        const details = document.createElement('span');
        details.className = 'race-runner-details';
        const name = document.createElement('strong');
        name.textContent = `${index + 1}. ${horse.name}`;
        const probability = document.createElement('small');
        probability.textContent = `${Math.round(horse.winProbability * 100)}% simulated win chance`;
        details.append(name, probability);
        const odds = document.createElement('span');
        odds.className = 'race-runner-odds';
        odds.textContent = `${horse.odds.toFixed(2)}×`;
        const oddsCaption = document.createElement('small');
        oddsCaption.textContent = 'total return';
        const oddsWrap = document.createElement('span');
        oddsWrap.className = 'race-odds-wrap';
        oddsWrap.append(odds, oddsCaption);
        button.append(silks, details, oddsWrap);
        this.runnerListEl.appendChild(button);
      });
    }

    // Renders the track lanes and horse tokens for the active/preview race
    renderTrack(race) {
      if (!this.trackEl) return;
      this.trackEl.replaceChildren();
      race.entrants.forEach((horse, index) => {
        const lane = document.createElement('div');
        lane.className = 'race-lane';
        lane.dataset.runnerId = horse.id;
        const laneNumber = document.createElement('span');
        laneNumber.className = 'race-lane-number';
        laneNumber.textContent = String(index + 1);
        const rail = document.createElement('div');
        rail.className = 'race-lane-rail';
        const finish = document.createElement('span');
        finish.className = 'race-finish-line';
        finish.setAttribute('aria-hidden', 'true');
        const token = document.createElement('span');
        token.className = 'race-horse-token';
        token.textContent = horse.silks;
        token.setAttribute('aria-label', horse.name);
        token.style.setProperty('--silks-color', horse.lane);
        rail.append(finish, token);
        const name = document.createElement('span');
        name.className = 'race-lane-name';
        name.textContent = horse.name;
        lane.append(laneNumber, rail, name);
        this.trackEl.appendChild(lane);
      });
    }

    // Updates the horizontal positions of horse tokens along the track lanes based on progress
    updateTrackPositions(race, progress, isRunning) {
      if (!this.trackEl) return;
      const winnerId = race.winnerId;
      this.trackEl.querySelectorAll('.race-lane').forEach(lane => {
        const horse = race.entrants.find(entrant => entrant.id === lane.dataset.runnerId);
        const token = lane.querySelector('.race-horse-token');
        const isWinner = horse?.id === winnerId;
        const position = isRunning
          ? Math.min(isWinner && progress >= 1 ? 100 : 94, progress * horse.finishFactor * 100)
          : 0;
        token.style.left = `${position}%`;
        lane.classList.toggle('is-race-winner', isWinner && isRunning && progress >= 1);
        lane.classList.toggle('is-race-running', isRunning);
      });
    }

    // Updates visual selection state and disabled attributes on runner buttons
    updateRunnerSelection() {
      if (!this.runnerListEl) return;
      this.runnerListEl.querySelectorAll('[data-runner-id]').forEach(button => {
        const isSelected = button.dataset.runnerId === this.selectedHorseId;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
        button.disabled = this.isRaceInProgress || Boolean(this.ticket);
      });
    }

    // Updates bet amount displays, estimated returns, and control button states
    updateBetControls() {
      if (this.betDisplayEl) this.betDisplayEl.textContent = this.formatMoney(this.bet);
      const currentRace = this.createRace(this.targetRaceId || (Math.floor(Date.now() / RACE_INTERVAL_MS) + 1) * RACE_INTERVAL_MS);
      const selectedHorse = currentRace.entrants.find(horse => horse.id === this.selectedHorseId);
      const potential = selectedHorse ? this.roundMoney(this.bet * selectedHorse.odds) : 0;
      if (this.estimatedReturnEl) this.estimatedReturnEl.textContent = this.formatMoney(potential);
      const maximum = this.maxStake();
      const betOpen = !this.isRaceInProgress && !this.ticket;
      if (this.minusBtn) this.minusBtn.disabled = !betOpen || this.bet <= BET_STEP;
      if (this.plusBtn) this.plusBtn.disabled = !betOpen || this.bet + BET_STEP > maximum;
      if (this.maxBtn) this.maxBtn.disabled = !betOpen || maximum <= 0 || this.bet >= maximum;
      if (this.placeBtn) {
        this.placeBtn.disabled = !betOpen || !selectedHorse || this.bet <= 0 || this.bet > maximum;
        this.placeBtn.textContent = selectedHorse
          ? `PLACE WIN BET • ${this.formatMoney(this.bet)}`
          : 'SELECT A HORSE';
      }
    }

    // Updates informational notes regarding active tickets or recent results
    updateTicketNote() {
      if (!this.ticketNoteEl) return;
      if (this.lastResultText) {
        this.ticketNoteEl.textContent = this.lastResultText;
        return;
      }
      if (this.ticket) {
        const currentRace = this.createRace(this.ticket.raceId);
        const horse = currentRace.entrants.find(item => item.id === this.ticket.runnerId);
        const potential = this.roundMoney(this.ticket.stake * this.ticket.odds);
        this.ticketNoteEl.textContent = `Locked ticket: ${this.formatMoney(this.ticket.stake)} on ${horse?.name || 'your runner'} at ${this.ticket.odds.toFixed(2)}×. Potential total return: ${this.formatMoney(potential)}.`;
        return;
      }
      this.ticketNoteEl.textContent = 'One win bet per race. Your stake is virtual chips only.';
    }

    // Handles placing a bet, updating wallet balances, saving profile data, and contributing to jackpots/XP
    placeBet() {
      const now = Date.now();
      const currentStart = Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS;
      const bettingRace = this.createRace(currentStart + RACE_INTERVAL_MS);
      const selectedHorse = bettingRace.entrants.find(horse => horse.id === this.selectedHorseId);
      const maximum = this.maxStake();
      if (this.isRaceInProgress || this.ticket || !selectedHorse || this.bet <= 0 || this.bet > maximum) return;

      this.fx?.playClick();
      this.ticket = {
        raceId: bettingRace.eventId,
        runnerId: selectedHorse.id,
        stake: this.roundMoney(this.bet),
        odds: selectedHorse.odds,
        winnerId: bettingRace.winnerId,
        durationMs: bettingRace.durationMs
      };

      // Save the wallet deduction and its ticket together, so reloading cannot leave only one side of the wager.
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

    // Resolves a finished race ticket, calculates payouts, updates balances, and triggers audio/visual effects
    settleTicket() {
      const ticket = this.ticket;
      if (!ticket) return;
      const finishedRace = this.createRace(ticket.raceId);
      const won = ticket.runnerId === ticket.winnerId;
      const payout = won ? this.roundMoney(ticket.stake * ticket.odds) : 0;
      const notice = {
        raceId: ticket.raceId,
        runnerId: ticket.runnerId,
        winnerId: ticket.winnerId,
        stake: ticket.stake,
        payout,
        won
      };

      // Save the cleared ticket, payout, and unread result together to prevent double settlement or missed notices.
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

      if (won) {
        this.lastResultText = this.formatRaceResult(notice);
        this.fx?.playWinSound();
        this.fx?.spawnConfetti(55);
      } else {
        this.lastResultText = this.formatRaceResult(notice);
        this.fx?.playClick();
      }
      this.renderRaceResultNotice();
      this.update();
    }
  }

  // Expose RaceEngine globally
  window.RaceEngine = RaceEngine;
})();
