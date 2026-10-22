// Original L1: Defines achievements as local progress, cosmetic unlocks, and bounded history rather than server awards.
/* Local-only achievements, cosmetic cabinet unlocks, and bounded game history. */
// Original L2: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
(function installAccomplishmentManager() {
// Original L3: Sets achievement-state schema version 1.
  const VERSION = 1;
// Original L4: Limits retained history to 50 entries.
  const HISTORY_LIMIT = 50;
// Original L5: Defines DEFAULT_COSMETIC for use by the surrounding persistence logic.
  const DEFAULT_COSMETIC = 'classic-cabinet';
// Original L6: Blank line separates related logic for readability.

// Original L7: Begins the fixed achievement catalog.
  const ACHIEVEMENTS = Object.freeze([
// Original L8: Unlocks Gold Trim after the first completed casino game.
    { id: 'first-game', title: 'First Spin', description: 'Complete your first casino game.', cosmetic: 'gold-trim' },
// Original L9: Unlocks Neon Glow at 10 completed casino games.
    { id: 'games-10', title: 'Regular', description: 'Complete 10 casino games.', cosmetic: 'neon-cabinet' },
// Original L10: Unlocks Royal Velvet after the first detected game win.
    { id: 'first-win', title: 'Winner', description: 'Win your first casino game.', cosmetic: 'royal-cabinet' },
// Original L11: Unlocks Ruby Lights at 10 wins.
    { id: 'wins-10', title: 'Hot Streak', description: 'Win 10 casino games.', cosmetic: 'ruby-cabinet' },
// Original L12: Unlocks Racing Green after the first settled race ticket.
    { id: 'first-race', title: 'At the Races', description: 'Settle your first race ticket.', cosmetic: 'racing-cabinet' },
// Original L13: Unlocks Checkered Flag after any winning race ticket.
    { id: 'race-win', title: 'Photo Finish', description: 'Win a race ticket.', cosmetic: 'checkered-cabinet' },
// Original L14: Unlocks Midnight Track after 10 settled race tickets.
    { id: 'races-10', title: 'Track Regular', description: 'Settle 10 race tickets.', cosmetic: 'midnight-cabinet' }
// Original L15: Closes the surrounding block or literal; no independent data transformation occurs here.
  ]);
// Original L16: Defines COSMETICS for use by the surrounding persistence logic.
  const COSMETICS = Object.freeze([
// Original L17: Defines a named field in the save/profile or UI data structure.
    { id: DEFAULT_COSMETIC, name: 'Classic Cabinet', className: 'cabinet-cosmetic-classic' },
// Original L18: Defines a named field in the save/profile or UI data structure.
    { id: 'gold-trim', name: 'Gold Trim', className: 'cabinet-cosmetic-gold' },
// Original L19: Defines a named field in the save/profile or UI data structure.
    { id: 'neon-cabinet', name: 'Neon Glow', className: 'cabinet-cosmetic-neon' },
// Original L20: Defines a named field in the save/profile or UI data structure.
    { id: 'royal-cabinet', name: 'Royal Velvet', className: 'cabinet-cosmetic-royal' },
// Original L21: Defines a named field in the save/profile or UI data structure.
    { id: 'ruby-cabinet', name: 'Ruby Lights', className: 'cabinet-cosmetic-ruby' },
// Original L22: Defines a named field in the save/profile or UI data structure.
    { id: 'racing-cabinet', name: 'Racing Green', className: 'cabinet-cosmetic-racing' },
// Original L23: Defines a named field in the save/profile or UI data structure.
    { id: 'checkered-cabinet', name: 'Checkered Flag', className: 'cabinet-cosmetic-checkered' },
// Original L24: Defines a named field in the save/profile or UI data structure.
    { id: 'midnight-cabinet', name: 'Midnight Track', className: 'cabinet-cosmetic-midnight' }
// Original L25: Closes the surrounding block or literal; no independent data transformation occurs here.
  ]);
// Original L26: Blank line separates related logic for readability.

// Original L27: Creates a fresh zeroed achievement state for a profile.
  const blankState = () => ({
// Original L28: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    version: VERSION,
// Original L29: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    unlockedIds: [],
// Original L30: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    selectedCosmetic: DEFAULT_COSMETIC,
// Original L31: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    history: [],
// Original L32: Initializes game/race counters and win counters at zero.
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
// Original L33: Closes the surrounding block or literal; no independent data transformation occurs here.
  });
// Original L34: Blank line separates related logic for readability.

// Original L35: Declares the class that groups this module’s related state and operations.
  class AccomplishmentManager {
// Original L36: Implements this module operation and passes its validated result to the next persistence step.
    constructor(hub) {
// Original L37: Stores the hub runtime reference/state on this manager so later save operations can reuse it.
      this.hub = hub;
// Original L38: Stores the sequence runtime reference/state on this manager so later save operations can reuse it.
      this.sequence = 0;
// Original L39: Stores the state runtime reference/state on this manager so later save operations can reuse it.
      this.state = this.loadState();
// Original L40: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.applyCosmetic();
// Original L41: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.mountPanel();
// Original L42: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L43: Blank line separates related logic for readability.

// Original L44: Implements this module operation and passes its validated result to the next persistence step.
    loadState() {
// Original L45: Defines saved for use by the surrounding persistence logic.
      const saved = window.LocalProfiles?.getCurrentSave?.()?.accomplishments;
// Original L46: Defines source for use by the surrounding persistence logic.
      const source = saved && typeof saved === 'object' ? saved : {};
// Original L47: Defines state for use by the surrounding persistence logic.
      const state = blankState();
// Original L48: Keeps only catalog achievement ids and deduplicates them.
      state.unlockedIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => ACHIEVEMENTS.some(item => item.id === id)))] : [];
// Original L49: Allows only catalog cosmetics, otherwise selecting the classic default.
      state.selectedCosmetic = COSMETICS.some(item => item.id === source.selectedCosmetic) ? source.selectedCosmetic : DEFAULT_COSMETIC;
// Original L50: Retains only object history entries and the newest 50.
      state.history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item.id === 'string').slice(-HISTORY_LIMIT) : [];
// Original L51: Defines stats for use by the surrounding persistence logic.
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
// Original L52: Starts normalized achievement-stat reconstruction.
      state.stats = {
// Original L53: Counts games and wins using safe nonnegative integers.
        games: this.safeCount(stats.games), wins: this.safeCount(stats.wins),
// Original L54: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        races: this.safeCount(stats.races), raceWins: this.safeCount(stats.raceWins)
// Original L55: Closes the surrounding block or literal; no independent data transformation occurs here.
      };
// Original L56: Returns `state` (state) to the caller and exits this function.
      return state;
// Original L57: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L58: Blank line separates related logic for readability.

// Original L59: Rejects non-safe or negative counters instead of allowing corrupted achievement math.
    safeCount(value) { return Number.isSafeInteger(value) && value >= 0 ? value : 0; }
// Original L60: Blank line separates related logic for readability.

// Original L61: Implements this module operation and passes its validated result to the next persistence step.
    getState() {
// Original L62: Deep-clones state through JSON so callers cannot mutate live achievement state.
      return JSON.parse(JSON.stringify(this.state));
// Original L63: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L64: Blank line separates related logic for readability.

// Original L65: Transforms or bounds the collection so only the intended normalized records continue.
    getAchievements() { return ACHIEVEMENTS.slice(); }
// Original L66: Transforms or bounds the collection so only the intended normalized records continue.
    getCosmetics() { return COSMETICS.slice(); }
// Original L67: Implements this module operation and passes its validated result to the next persistence step.
    isUnlocked(id) { return this.state.unlockedIds.includes(id); }
// Original L68: Blank line separates related logic for readability.

// Original L69: Persists a snapshot through encrypted profile storage, queues linked-file save, and refreshes UI.
    persist() {
// Original L70: Defines snapshot for use by the surrounding persistence logic.
      const snapshot = this.getState();
// Original L71: Uses the browser UI/global integration to coordinate this save or profile operation.
      window.LocalProfiles?.saveCurrent?.({ accomplishments: snapshot });
// Original L72: Uses the browser UI/global integration to coordinate this save or profile operation.
      window.LocalSave?.queueFileSave?.();
// Original L73: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.applyCosmetic();
// Original L74: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.renderPanel();
// Original L75: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L76: Blank line separates related logic for readability.

// Original L77: Finds a catalog entry and prevents duplicate unlocks.
    unlock(id) {
// Original L78: Defines item for use by the surrounding persistence logic.
      const item = ACHIEVEMENTS.find(entry => entry.id === id);
// Original L79: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!item || this.isUnlocked(id)) return false;
// Original L80: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
      this.state.unlockedIds.push(id);
// Original L81: Auto-selects an unlocked cosmetic only when a valid cosmetic mapping exists and no selection is set.
      if (item.cosmetic && COSMETICS.some(cosmetic => cosmetic.id === item.cosmetic) && !this.state.selectedCosmetic) this.state.selectedCosmetic = item.cosmetic;
// Original L82: Returns true to the caller and exits this function.
      return true;
// Original L83: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L84: Blank line separates related logic for readability.

// Original L85: Builds bounded stable ids from a prefix and value for retry-safe history deduplication.
    makeId(prefix, value) {
// Original L86: Returns copies a portion of a text template that combines fixed text with computed values `prefix` (prefix), converts `value` (value) to text, from 0 up to but excluding 180 to the caller and exits this function.
      return `${prefix}:${String(value)}`.slice(0, 180);
// Original L87: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L88: Blank line separates related logic for readability.

// Original L89: Starts history insertion with duplicate-id protection.
    appendHistory(entry) {
// Original L90: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (this.state.history.some(item => item.id === entry.id)) return false;
// Original L91: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
      this.state.history.push(entry);
// Original L92: Drops oldest entries beyond the 50-entry history limit.
      if (this.state.history.length > HISTORY_LIMIT) this.state.history = this.state.history.slice(-HISTORY_LIMIT);
// Original L93: Returns true to the caller and exits this function.
      return true;
// Original L94: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L95: Blank line separates related logic for readability.

// Original L96: Documents that game hooks should supply stable ids so retries do not double-count.
    // Record completed non-racing games. Pass a stable id/roundId when available for retry-safe hooks.
// Original L97: Implements this module operation and passes its validated result to the next persistence step.
    recordGame(game, result = {}) {
// Original L98: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (game && typeof game === 'object') { result = game; game = result.game || result.gameId || 'casino'; }
// Original L99: Defines source for use by the surrounding persistence logic.
      const source = result && typeof result === 'object' ? result : {};
// Original L100: Defines name for use by the surrounding persistence logic.
      const name = String(game || source.game || 'casino').slice(0, 40);
// Original L101: Classifies a result as win from explicit flags or payout greater than stake; otherwise it is a loss.
      const outcome = source.won === true || source.win === true || source.correct === true || source.outcome === 'win' ||
// Original L102: Uses payout strictly above stake as an additional win criterion.
        (Number.isFinite(Number(source.payout)) && Number(source.payout) > Number(source.stake || 0)) ? 'win' : 'loss';
// Original L103: Prefers supplied id/roundId/gameId/timestamp and otherwise creates a unique time/sequence id.
      const stable = source.id || source.roundId || source.gameId || source.timestamp || `auto:${Date.now()}:${this.sequence++}`;
// Original L104: Stores bounded game name, outcome, and timestamp as one history event.
      const entry = { id: this.makeId('game', stable), kind: 'game', game: name, outcome, at: Number.isFinite(source.at) ? source.at : Date.now() };
// Original L105: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.appendHistory(entry)) return false;
// Original L106: Stops before math/persistence when the event id was already recorded.
      this.state.stats.games += 1;
// Original L107: Increments total completed-game count once.
      if (outcome === 'win') this.state.stats.wins += 1;
// Original L108: Increments wins only for the computed win outcome.
      this.unlock('first-game');
// Original L109: Unlocks first-game and the 10-game threshold from the cumulative counter.
      if (this.state.stats.games >= 10) this.unlock('games-10');
// Original L110: Unlocks first-win and the 10-win threshold only on wins.
      if (outcome === 'win') { this.unlock('first-win'); if (this.state.stats.wins >= 10) this.unlock('wins-10'); }
// Original L111: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.persist();
// Original L112: Returns `entry` (entry) to the caller and exits this function.
      return entry;
// Original L113: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L114: Blank line separates related logic for readability.

// Original L115: States that races count only after actual settlement, never previews.
    // Record only actual settled race notices; race-engine calls this after settlement, never for previews.
// Original L116: Implements this module operation and passes its validated result to the next persistence step.
    recordRace(notice) {
// Original L117: Requires an object with a safe integer race id before recording.
      if (!notice || typeof notice !== 'object' || !Number.isSafeInteger(Number(notice.raceId))) return false;
// Original L118: Makes race identity stable by combining type and race id.
      const id = this.makeId('race', `${notice.raceType || 'horse'}:${Number(notice.raceId)}`);
// Original L119: Stores normalized race type, boolean win, nonnegative payout fallback, and current time.
      const entry = { id, kind: 'race', raceId: Number(notice.raceId), raceType: notice.raceType || null, won: notice.won === true, payout: Number(notice.payout) || 0, at: Date.now() };
// Original L120: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.appendHistory(entry)) return false;
// Original L121: Increments settled-race count once per unique ticket.
      this.state.stats.races += 1;
// Original L122: Increments race wins only when the notice says won.
      if (entry.won) this.state.stats.raceWins += 1;
// Original L123: Unlocks the first-race milestone after any settlement.
      this.unlock('first-race');
// Original L124: Unlocks race-win only for winning settlements.
      if (entry.won) this.unlock('race-win');
// Original L125: Unlocks races-10 when settled races reach ten.
      if (this.state.stats.races >= 10) this.unlock('races-10');
// Original L126: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.persist();
// Original L127: Returns `entry` (entry) to the caller and exits this function.
      return entry;
// Original L128: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L129: Blank line separates related logic for readability.

// Original L130: Implements this module operation and passes its validated result to the next persistence step.
    selectCosmetic(id) {
// Original L131: Allows default or unlocked mapped cosmetics only; locked cosmetics cannot be selected.
      if (!COSMETICS.some(item => item.id === id) || (id !== DEFAULT_COSMETIC && !this.state.unlockedIds.includes(ACHIEVEMENTS.find(a => a.cosmetic === id)?.id))) return false;
// Original L132: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.state.selectedCosmetic = id;
// Original L133: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.persist();
// Original L134: Returns true to the caller and exits this function.
      return true;
// Original L135: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L136: Blank line separates related logic for readability.

// Original L137: Implements this module operation and passes its validated result to the next persistence step.
    resetForActiveProfile() {
// Original L138: Stores the state runtime reference/state on this manager so later save operations can reuse it.
      this.state = this.loadState();
// Original L139: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.applyCosmetic();
// Original L140: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.renderPanel();
// Original L141: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L142: Blank line separates related logic for readability.

// Original L143: Implements this module operation and passes its validated result to the next persistence step.
    applyCosmetic() {
// Original L144: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (typeof document === 'undefined' || !document.body) return;
// Original L145: Removes previously applied cabinet classes before adding the selected class.
      [...document.body.classList].filter(name => name.startsWith('cabinet-cosmetic-')).forEach(name => document.body.classList.remove(name));
// Original L146: Defines cosmetic for use by the surrounding persistence logic.
      const cosmetic = COSMETICS.find(item => item.id === this.state.selectedCosmetic) || COSMETICS[0];
// Original L147: Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.
      document.body.classList.add(cosmetic.className);
// Original L148: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L149: Blank line separates related logic for readability.

// Original L150: Implements this module operation and passes its validated result to the next persistence step.
    mountPanel() {
// Original L151: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (typeof document === 'undefined') return;
// Original L152: Defines lobby for use by the surrounding persistence logic.
      const lobby = document.getElementById('view-lobby');
// Original L153: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!lobby || document.getElementById('accomplishments-panel')) return;
// Original L154: Defines panel for use by the surrounding persistence logic.
      const panel = document.createElement('section');
// Original L155: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      panel.id = 'accomplishments-panel'; panel.className = 'accomplishments-panel'; panel.setAttribute('aria-labelledby', 'accomplishments-title');
// Original L156: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      panel.innerHTML = '<div><p class="lobby-room-kicker">PLAYER CABINET</p><h3 id="accomplishments-title">Achievements &amp; Cosmetics</h3><p class="accomplishments-summary"></p></div><div class="accomplishments-list"></div><div class="accomplishments-history"></div><label>Cabinet style <select class="accomplishments-select"></select></label>';
// Original L157: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      lobby.appendChild(panel); this.panel = panel; this.renderPanel();
// Original L158: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L159: Blank line separates related logic for readability.

// Original L160: Implements this module operation and passes its validated result to the next persistence step.
    renderPanel() {
// Original L161: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (!this.panel) return;
// Original L162: Defines summary for use by the surrounding persistence logic.
      const summary = this.panel.querySelector('.accomplishments-summary');
// Original L163: Defines list for use by the surrounding persistence logic.
      const list = this.panel.querySelector('.accomplishments-list');
// Original L164: Defines select for use by the surrounding persistence logic.
      const select = this.panel.querySelector('.accomplishments-select');
// Original L165: Defines history for use by the surrounding persistence logic.
      const history = this.panel.querySelector('.accomplishments-history');
// Original L166: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (history) {
// Original L167: Selects the ten newest race entries and reverses them for newest-first display.
        const races = this.state.history.filter(item => item.kind === 'race').slice(-10).reverse();
// Original L168: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
        history.replaceChildren();
// Original L169: Defines heading for use by the surrounding persistence logic.
        const heading = document.createElement('h4'); heading.textContent = 'Recent race tickets'; history.append(heading);
// Original L170: Guards the following operation so invalid, missing, or unsafe state is not applied.
        if (!races.length) { const empty = document.createElement('p'); empty.textContent = 'Settled horse and car tickets will appear here.'; history.append(empty); }
// Original L171: Formats race id as a date, reports win/loss, and shows payout to cents; race ids must therefore be date-like for useful display.
        races.forEach(entry => { const row = document.createElement('p'); row.textContent = `${entry.raceType === 'car' ? 'Car' : 'Horse'} · ${new Date(entry.raceId).toLocaleString()} · ${entry.won ? 'Won' : 'Lost'} · total return $${Number(entry.payout).toFixed(2)}`; history.append(row); });
// Original L172: Closes the surrounding block or literal; no independent data transformation occurs here.
      }
// Original L173: Displays achievement count plus games and settled-race totals.
      if (summary) summary.textContent = `${this.state.unlockedIds.length}/${ACHIEVEMENTS.length} achievements unlocked • ${this.state.stats.games} games • ${this.state.stats.races} settled races`;
// Original L174: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (list) list.textContent = ACHIEVEMENTS.map(item => `${this.isUnlocked(item.id) ? '✓' : '○'} ${item.title}`).join('  ·  ');
// Original L175: Creates each cosmetic option and disables non-default styles until their achievement is unlocked.
      if (select && !select.options.length) COSMETICS.forEach(item => { const option = document.createElement('option'); option.value = item.id; option.textContent = item.name; option.disabled = item.id !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === item.id)?.id); select.appendChild(option); });
// Original L176: Guards the following operation so invalid, missing, or unsafe state is not applied.
      if (select) {
// Original L177: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        Array.from(select.options).forEach(option => { option.disabled = option.value !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === option.value)?.id); });
// Original L178: Defines a callback that carries this event, collection, or asynchronous result into the next save operation.
        select.value = this.state.selectedCosmetic; select.onchange = () => this.selectCosmetic(select.value); }
// Original L179: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L180: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L181: Blank line separates related logic for readability.

// Original L182: Uses the browser UI/global integration to coordinate this save or profile operation.
  window.AccomplishmentManager = AccomplishmentManager;
// Original L183: Uses the browser UI/global integration to coordinate this save or profile operation.
  window.AccomplishmentCatalog = { achievements: ACHIEVEMENTS, cosmetics: COSMETICS, historyLimit: HISTORY_LIMIT };
// Original L184: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
})();
