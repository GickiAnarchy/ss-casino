/* Local-only achievements, cosmetic cabinet unlocks, and bounded game history. */
(function installAccomplishmentManager() {
  const VERSION = 1;
  const HISTORY_LIMIT = 50;
  const DEFAULT_COSMETIC = 'classic-cabinet';

  const ACHIEVEMENTS = Object.freeze([
    { id: 'first-game', title: 'First Spin', description: 'Complete your first casino game.', cosmetic: 'gold-trim' },
    { id: 'games-10', title: 'Regular', description: 'Complete 10 casino games.', cosmetic: 'neon-cabinet' },
    { id: 'first-win', title: 'Winner', description: 'Win your first casino game.', cosmetic: 'royal-cabinet' },
    { id: 'wins-10', title: 'Hot Streak', description: 'Win 10 casino games.', cosmetic: 'ruby-cabinet' },
    { id: 'first-race', title: 'At the Races', description: 'Settle your first race ticket.', cosmetic: 'racing-cabinet' },
    { id: 'race-win', title: 'Photo Finish', description: 'Win a race ticket.', cosmetic: 'checkered-cabinet' },
    { id: 'races-10', title: 'Track Regular', description: 'Settle 10 race tickets.', cosmetic: 'midnight-cabinet' }
  ]);
  const COSMETICS = Object.freeze([
    { id: DEFAULT_COSMETIC, name: 'Classic Cabinet', className: 'cabinet-cosmetic-classic' },
    { id: 'gold-trim', name: 'Gold Trim', className: 'cabinet-cosmetic-gold' },
    { id: 'neon-cabinet', name: 'Neon Glow', className: 'cabinet-cosmetic-neon' },
    { id: 'royal-cabinet', name: 'Royal Velvet', className: 'cabinet-cosmetic-royal' },
    { id: 'ruby-cabinet', name: 'Ruby Lights', className: 'cabinet-cosmetic-ruby' },
    { id: 'racing-cabinet', name: 'Racing Green', className: 'cabinet-cosmetic-racing' },
    { id: 'checkered-cabinet', name: 'Checkered Flag', className: 'cabinet-cosmetic-checkered' },
    { id: 'midnight-cabinet', name: 'Midnight Track', className: 'cabinet-cosmetic-midnight' }
  ]);

  const blankState = () => ({
    version: VERSION,
    unlockedIds: [],
    selectedCosmetic: DEFAULT_COSMETIC,
    history: [],
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
  });

  class AccomplishmentManager {
    constructor(hub) {
      this.hub = hub;
      this.sequence = 0;
      this.state = this.loadState();
      this.applyCosmetic();
      this.mountPanel();
    }

    loadState() {
      const saved = window.LocalProfiles?.getCurrentSave?.()?.accomplishments;
      const source = saved && typeof saved === 'object' ? saved : {};
      const state = blankState();
      state.unlockedIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => ACHIEVEMENTS.some(item => item.id === id)))] : [];
      state.selectedCosmetic = COSMETICS.some(item => item.id === source.selectedCosmetic) ? source.selectedCosmetic : DEFAULT_COSMETIC;
      state.history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item.id === 'string').slice(-HISTORY_LIMIT) : [];
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
      state.stats = {
        games: this.safeCount(stats.games), wins: this.safeCount(stats.wins),
        races: this.safeCount(stats.races), raceWins: this.safeCount(stats.raceWins)
      };
      return state;
    }

    safeCount(value) { return Number.isSafeInteger(value) && value >= 0 ? value : 0; }

    getState() {
      return JSON.parse(JSON.stringify(this.state));
    }

    getAchievements() { return ACHIEVEMENTS.slice(); }
    getCosmetics() { return COSMETICS.slice(); }
    isUnlocked(id) { return this.state.unlockedIds.includes(id); }

    persist() {
      const snapshot = this.getState();
      window.LocalProfiles?.saveCurrent?.({ accomplishments: snapshot });
      window.LocalSave?.queueFileSave?.();
      this.applyCosmetic();
      this.renderPanel();
    }

    unlock(id) {
      const item = ACHIEVEMENTS.find(entry => entry.id === id);
      if (!item || this.isUnlocked(id)) return false;
      this.state.unlockedIds.push(id);
      if (item.cosmetic && COSMETICS.some(cosmetic => cosmetic.id === item.cosmetic) && !this.state.selectedCosmetic) this.state.selectedCosmetic = item.cosmetic;
      return true;
    }

    makeId(prefix, value) {
      return `${prefix}:${String(value)}`.slice(0, 180);
    }

    appendHistory(entry) {
      if (this.state.history.some(item => item.id === entry.id)) return false;
      this.state.history.push(entry);
      if (this.state.history.length > HISTORY_LIMIT) this.state.history = this.state.history.slice(-HISTORY_LIMIT);
      return true;
    }

    // Record completed non-racing games. Pass a stable id/roundId when available for retry-safe hooks.
    recordGame(game, result = {}) {
      if (game && typeof game === 'object') { result = game; game = result.game || result.gameId || 'casino'; }
      const source = result && typeof result === 'object' ? result : {};
      const name = String(game || source.game || 'casino').slice(0, 40);
      const outcome = source.won === true || source.win === true || source.correct === true || source.outcome === 'win' ||
        (Number.isFinite(Number(source.payout)) && Number(source.payout) > Number(source.stake || 0)) ? 'win' : 'loss';
      const stable = source.id || source.roundId || source.gameId || source.timestamp || `auto:${Date.now()}:${this.sequence++}`;
      const entry = { id: this.makeId('game', stable), kind: 'game', game: name, outcome, at: Number.isFinite(source.at) ? source.at : Date.now() };
      if (!this.appendHistory(entry)) return false;
      this.state.stats.games += 1;
      if (outcome === 'win') this.state.stats.wins += 1;
      this.unlock('first-game');
      if (this.state.stats.games >= 10) this.unlock('games-10');
      if (outcome === 'win') { this.unlock('first-win'); if (this.state.stats.wins >= 10) this.unlock('wins-10'); }
      this.persist();
      return entry;
    }

    // Record only actual settled race notices; race-engine calls this after settlement, never for previews.
    recordRace(notice) {
      if (!notice || typeof notice !== 'object' || !Number.isSafeInteger(Number(notice.raceId))) return false;
      const id = this.makeId('race', `${notice.raceType || 'horse'}:${Number(notice.raceId)}`);
      const entry = { id, kind: 'race', raceId: Number(notice.raceId), raceType: notice.raceType || null, won: notice.won === true, payout: Number(notice.payout) || 0, at: Date.now() };
      if (!this.appendHistory(entry)) return false;
      this.state.stats.races += 1;
      if (entry.won) this.state.stats.raceWins += 1;
      this.unlock('first-race');
      if (entry.won) this.unlock('race-win');
      if (this.state.stats.races >= 10) this.unlock('races-10');
      this.persist();
      return entry;
    }

    selectCosmetic(id) {
      if (!COSMETICS.some(item => item.id === id) || (id !== DEFAULT_COSMETIC && !this.state.unlockedIds.includes(ACHIEVEMENTS.find(a => a.cosmetic === id)?.id))) return false;
      this.state.selectedCosmetic = id;
      this.persist();
      return true;
    }

    resetForActiveProfile() {
      this.state = this.loadState();
      this.applyCosmetic();
      this.renderPanel();
    }

    applyCosmetic() {
      if (typeof document === 'undefined' || !document.body) return;
      [...document.body.classList].filter(name => name.startsWith('cabinet-cosmetic-')).forEach(name => document.body.classList.remove(name));
      const cosmetic = COSMETICS.find(item => item.id === this.state.selectedCosmetic) || COSMETICS[0];
      document.body.classList.add(cosmetic.className);
    }

    mountPanel() {
      if (typeof document === 'undefined') return;
      const lobby = document.getElementById('view-lobby');
      if (!lobby || document.getElementById('accomplishments-panel')) return;
      const panel = document.createElement('section');
      panel.id = 'accomplishments-panel'; panel.className = 'accomplishments-panel'; panel.setAttribute('aria-labelledby', 'accomplishments-title');
      panel.innerHTML = '<div><p class="lobby-room-kicker">PLAYER CABINET</p><h3 id="accomplishments-title">Achievements &amp; Cosmetics</h3><p class="accomplishments-summary"></p></div><div class="accomplishments-list"></div><div class="accomplishments-history"></div><label>Cabinet style <select class="accomplishments-select"></select></label>';
      lobby.appendChild(panel); this.panel = panel; this.renderPanel();
    }

    renderPanel() {
      if (!this.panel) return;
      const summary = this.panel.querySelector('.accomplishments-summary');
      const list = this.panel.querySelector('.accomplishments-list');
      const select = this.panel.querySelector('.accomplishments-select');
      const history = this.panel.querySelector('.accomplishments-history');
      if (history) {
        const races = this.state.history.filter(item => item.kind === 'race').slice(-10).reverse();
        history.replaceChildren();
        const heading = document.createElement('h4'); heading.textContent = 'Recent race tickets'; history.append(heading);
        if (!races.length) { const empty = document.createElement('p'); empty.textContent = 'Settled horse and car tickets will appear here.'; history.append(empty); }
        races.forEach(entry => { const row = document.createElement('p'); row.textContent = `${entry.raceType === 'car' ? 'Car' : 'Horse'} · ${new Date(entry.raceId).toLocaleString()} · ${entry.won ? 'Won' : 'Lost'} · total return $${Number(entry.payout).toFixed(2)}`; history.append(row); });
      }
      if (summary) summary.textContent = `${this.state.unlockedIds.length}/${ACHIEVEMENTS.length} achievements unlocked • ${this.state.stats.games} games • ${this.state.stats.races} settled races`;
      if (list) list.textContent = ACHIEVEMENTS.map(item => `${this.isUnlocked(item.id) ? '✓' : '○'} ${item.title}`).join('  ·  ');
      if (select && !select.options.length) COSMETICS.forEach(item => { const option = document.createElement('option'); option.value = item.id; option.textContent = item.name; option.disabled = item.id !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === item.id)?.id); select.appendChild(option); });
      if (select) {
        Array.from(select.options).forEach(option => { option.disabled = option.value !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === option.value)?.id); });
        select.value = this.state.selectedCosmetic; select.onchange = () => this.selectCosmetic(select.value); }
    }
  }

  window.AccomplishmentManager = AccomplishmentManager;
  window.AccomplishmentCatalog = { achievements: ACHIEVEMENTS, cosmetics: COSMETICS, historyLimit: HISTORY_LIMIT };
})();
