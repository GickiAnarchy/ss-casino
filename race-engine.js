/* Local-only, scheduled horse races for the virtual-chip casino. */
(function installRaceEngine() {
  const RACE_INTERVAL_MS = 60_000;
  const RACE_LENGTH_MS = 12_000;
  const RESULT_DISPLAY_MS = 3_000;
  const BET_STEP = 5;
  const CENTS = 100;
  const HORSES = [
    { id: 'horse-1', name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
    { id: 'horse-2', name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
    { id: 'horse-3', name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
    { id: 'horse-4', name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
    { id: 'horse-5', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
    { id: 'horse-6', name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' }
  ];
  class RaceEngine {
    constructor(hub, { fx, jackpot, xp } = {}) {
      this.hub = hub;
      this.fx = fx;
      this.jackpot = jackpot;
      this.xp = xp;
      this.bet = 10;
      this.selectedHorseId = null;
      this.targetRaceId = null;
      this.trackRaceId = null;
      this.ticket = null;
      this.lastResultText = '';
      this.isRaceInProgress = false;
      this.isResultDisplay = false;
      this.bindElements();
      this.bindEvents();
      this.loadProfileTicket();
      this.update();

      // The clock is local to this browser; no server, live-data feed, or paid service is needed.
      window.setInterval(() => this.update(), 250);
    }

    bindElements() {
      this.statusEl = document.getElementById('race-status');
      this.raceNumberEl = document.getElementById('race-number');
      this.phaseEl = document.getElementById('race-phase-label');
      this.countdownEl = document.getElementById('race-countdown');
      this.startTimeEl = document.getElementById('race-start-time');
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
    }

    bindEvents() {
      this.minusBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = Math.max(BET_STEP, this.roundMoney(this.bet - BET_STEP));
        this.updateBetControls();
      });
      this.plusBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = Math.min(this.maxStake(), this.roundMoney(this.bet + BET_STEP));
        this.updateBetControls();
      });
      this.maxBtn?.addEventListener('click', () => {
        this.fx?.playClick();
        this.bet = this.maxStake();
        this.updateBetControls();
      });
      this.placeBtn?.addEventListener('click', () => this.placeBet());
      this.runnerListEl?.addEventListener('click', event => {
        const option = event.target.closest('[data-runner-id]');
        if (!option || option.disabled || this.ticket || this.isRaceInProgress) return;
        this.fx?.playClick();
        this.selectedHorseId = option.dataset.runnerId;
        this.updateRunnerSelection();
        this.updateBetControls();
      });
    }

    loadProfileTicket() {
      // Keep an unsettled wager inside the encrypted profile save so a refresh cannot discard it.
      this.ticket = window.LocalProfiles?.getCurrentSave().raceBet || null;
    }

    resetForActiveProfile() {
      this.bet = 10;
      this.selectedHorseId = null;
      this.targetRaceId = null;
      this.trackRaceId = null;
      this.lastResultText = '';
      this.loadProfileTicket();
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

    makeRandom(eventId) {
      // Seed each scheduled race by its start time so a saved ticket resolves to the same field after reload.
      let state = (Math.floor(eventId / RACE_INTERVAL_MS) * 2_654_435_761 + 1_013_904_223) >>> 0;
      return () => {
        state = (state + 0x6D2B79F5) >>> 0;
        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
      };
    }

    createRace(eventId) {
      const random = this.makeRandom(eventId);
      const entrants = HORSES.map((horse, index) => ({
        ...horse,
        ability: 0.9 + random() * 0.2,
        finishFactor: 0.74 + random() * 0.2,
        index
      }));
      const weights = entrants.map(horse => Math.pow(horse.ability, 8));
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
      entrants.forEach((horse, index) => {
        horse.winProbability = weights[index] / totalWeight;
        // Decimal odds include the returned stake and bake in a small virtual-chip house margin.
        horse.odds = Math.max(1.2, Math.floor((0.92 / horse.winProbability) * 100) / 100);
      });

      let draw = random() * totalWeight;
      let winnerIndex = weights.findIndex(weight => {
        draw -= weight;
        return draw < 0;
      });
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;

      return {
        eventId,
        number: Math.floor(eventId / RACE_INTERVAL_MS),
        entrants,
        winnerId: entrants[winnerIndex].id
      };
    }

    raceStartTime(eventId) {
      return new Date(eventId).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    }

    formatMoney(value) {
      return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    formatCountdown(milliseconds) {
      const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
    }

    update() {
      const now = Date.now();
      const currentStart = Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS;
      const elapsed = now - currentStart;
      this.isRaceInProgress = elapsed < RACE_LENGTH_MS;
      this.isResultDisplay = !this.isRaceInProgress && elapsed < RACE_LENGTH_MS + RESULT_DISPLAY_MS;
      const nextRaceId = currentStart + RACE_INTERVAL_MS;

      // A ticket is cleared before crediting its payout; that ordering makes settlement safe to retry after reload.
      if (this.ticket && now >= this.ticket.raceId + RACE_LENGTH_MS) this.settleTicket();

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
        this.isRaceInProgress ? elapsed / RACE_LENGTH_MS : (this.isResultDisplay ? 1 : 0),
        trackIsCurrent
      );
      this.updateClockAndStatus(bettingRace, now, nextRaceId - now);
      this.updateRunnerSelection();
      this.updateBetControls();
      this.updateTicketNote();
    }

    updateClockAndStatus(bettingRace, now, remaining) {
      const raceNumber = `#${bettingRace.number.toLocaleString('en-US')}`;
      const activeTicket = this.ticket;
      if (this.raceNumberEl) this.raceNumberEl.textContent = raceNumber;
      if (this.phaseEl) this.phaseEl.textContent = this.isRaceInProgress
        ? 'RACING'
        : (this.isResultDisplay ? 'RESULTS' : 'BETTING OPEN');
      const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
      if (countdownLabel) countdownLabel.textContent = this.isRaceInProgress ? 'FINISH IN' : 'STARTS IN';
      if (this.countdownEl) this.countdownEl.textContent = this.isRaceInProgress
        ? this.formatCountdown(RACE_LENGTH_MS - (now % RACE_INTERVAL_MS))
        : this.formatCountdown(remaining);
      if (this.startTimeEl) this.startTimeEl.textContent = this.raceStartTime(bettingRace.eventId);
      if (this.targetTextEl) {
        const targetMessage = this.isRaceInProgress
          ? `Choose a runner for race ${raceNumber}; betting opens when the current sprint finishes.`
          : (this.isResultDisplay
            ? `The previous sprint is complete. You may place one win bet for race ${raceNumber}.`
            : `Pick one horse to win in race ${raceNumber}. Bets close when the race starts.`);
        this.targetTextEl.textContent = targetMessage;
      }
      if (this.trackCaptionEl) this.trackCaptionEl.textContent = this.isRaceInProgress
        ? `RACE #${Math.floor(now / RACE_INTERVAL_MS).toLocaleString('en-US')} — LIVE SIMULATION`
        : (this.isResultDisplay
          ? `RACE #${Math.floor(now / RACE_INTERVAL_MS).toLocaleString('en-US')} — FINAL RESULT`
          : `RACE #${bettingRace.number.toLocaleString('en-US')} — NEXT FIELD PREVIEW`);

      if (this.statusEl) {
        if (this.isRaceInProgress) {
          this.setStatus(activeTicket?.raceId === Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS
            ? `YOUR BET IS RUNNING — ${this.formatCountdown(RACE_LENGTH_MS - (now % RACE_INTERVAL_MS))} TO FINISH`
            : `RACE IN PROGRESS — BETTING OPENS AFTER THE FINISH`, 'status-spinning');
        } else if (this.isResultDisplay) {
          const finishedRace = this.createRace(Math.floor(now / RACE_INTERVAL_MS) * RACE_INTERVAL_MS);
          const winner = HORSES.find(horse => horse.id === finishedRace.winnerId);
          this.setStatus(`RACE FINISHED — ${winner?.name || 'WINNER'} TAKES THE SPRINT`, 'status-win');
        } else {
          this.setStatus(`BETTING OPEN — RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-spinning');
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

    updateRunnerSelection() {
      if (!this.runnerListEl) return;
      this.runnerListEl.querySelectorAll('[data-runner-id]').forEach(button => {
        const isSelected = button.dataset.runnerId === this.selectedHorseId;
        button.classList.toggle('is-selected', isSelected);
        button.setAttribute('aria-pressed', String(isSelected));
        button.disabled = this.isRaceInProgress || Boolean(this.ticket);
      });
    }

    updateBetControls() {
      if (this.betDisplayEl) this.betDisplayEl.textContent = this.formatMoney(this.bet);
      const selectedHorse = this.createRace(this.targetRaceId || (Math.floor(Date.now() / RACE_INTERVAL_MS) + 1) * RACE_INTERVAL_MS)
        .entrants.find(horse => horse.id === this.selectedHorseId);
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

    updateTicketNote() {
      if (!this.ticketNoteEl) return;
      if (this.lastResultText) {
        this.ticketNoteEl.textContent = this.lastResultText;
        return;
      }
      if (this.ticket) {
        const horse = HORSES.find(item => item.id === this.ticket.runnerId);
        const potential = this.roundMoney(this.ticket.stake * this.ticket.odds);
        this.ticketNoteEl.textContent = `Locked ticket: ${this.formatMoney(this.ticket.stake)} on ${horse?.name || 'your runner'} at ${this.ticket.odds.toFixed(2)}×. Potential total return: ${this.formatMoney(potential)}.`;
        return;
      }
      this.ticketNoteEl.textContent = 'One win bet per race. Your stake is virtual chips only.';
    }

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
        winnerId: bettingRace.winnerId
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

    settleTicket() {
      const ticket = this.ticket;
      if (!ticket) return;
      const horse = HORSES.find(item => item.id === ticket.runnerId);
      const won = ticket.runnerId === ticket.winnerId;
      const payout = won ? this.roundMoney(ticket.stake * ticket.odds) : 0;

      // Clear first and save the new balance in one encrypted profile update to prevent duplicate payouts.
      this.ticket = null;
      if (payout > 0) this.hub.balance = this.roundMoney(this.hub.balance + payout);
      window.LocalProfiles?.saveCurrent({
        player: this.hub.player.toProfile(),
        raceBet: null
      });
      this.hub.updateGlobalUI();
      window.LocalSave?.queueFileSave();

      if (won) {
        this.lastResultText = `WIN! ${horse?.name || 'Your horse'} finished first. Total return: ${this.formatMoney(payout)}.`;
        this.fx?.playWinSound();
        this.fx?.spawnConfetti(55);
      } else {
        const winner = HORSES.find(item => item.id === ticket.winnerId);
        this.lastResultText = `${horse?.name || 'Your horse'} did not win. ${winner?.name || 'Another runner'} took the race.`;
        this.fx?.playClick();
      }
      this.update();
    }
  }

  window.RaceEngine = RaceEngine;
})();
