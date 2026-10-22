# src/js/accomplishments.js

[Exact copy](../../../original/src/js/accomplishments.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Local-only achievements, cosmetic cabinet unlocks, and bounded game history. */
```

Defines achievements as local progress, cosmetic unlocks, and bounded history rather than server awards.

### Line 2

```text
(function installAccomplishmentManager() {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 3

```text
  const VERSION = 1;
```

Sets achievement-state schema version 1.

### Line 4

```text
  const HISTORY_LIMIT = 50;
```

Limits retained history to 50 entries.

### Line 5

```text
  const DEFAULT_COSMETIC = 'classic-cabinet';
```

Defines DEFAULT_COSMETIC for use by the surrounding persistence logic.

### Line 6

```text

```

Blank line separates related logic for readability.

### Line 7

```text
  const ACHIEVEMENTS = Object.freeze([
```

Begins the fixed achievement catalog.

### Line 8

```text
    { id: 'first-game', title: 'First Spin', description: 'Complete your first casino game.', cosmetic: 'gold-trim' },
```

Unlocks Gold Trim after the first completed casino game.

### Line 9

```text
    { id: 'games-10', title: 'Regular', description: 'Complete 10 casino games.', cosmetic: 'neon-cabinet' },
```

Unlocks Neon Glow at 10 completed casino games.

### Line 10

```text
    { id: 'first-win', title: 'Winner', description: 'Win your first casino game.', cosmetic: 'royal-cabinet' },
```

Unlocks Royal Velvet after the first detected game win.

### Line 11

```text
    { id: 'wins-10', title: 'Hot Streak', description: 'Win 10 casino games.', cosmetic: 'ruby-cabinet' },
```

Unlocks Ruby Lights at 10 wins.

### Line 12

```text
    { id: 'first-race', title: 'At the Races', description: 'Settle your first race ticket.', cosmetic: 'racing-cabinet' },
```

Unlocks Racing Green after the first settled race ticket.

### Line 13

```text
    { id: 'race-win', title: 'Photo Finish', description: 'Win a race ticket.', cosmetic: 'checkered-cabinet' },
```

Unlocks Checkered Flag after any winning race ticket.

### Line 14

```text
    { id: 'races-10', title: 'Track Regular', description: 'Settle 10 race tickets.', cosmetic: 'midnight-cabinet' }
```

Unlocks Midnight Track after 10 settled race tickets.

### Line 15

```text
  ]);
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 16

```text
  const COSMETICS = Object.freeze([
```

Defines COSMETICS for use by the surrounding persistence logic.

### Line 17

```text
    { id: DEFAULT_COSMETIC, name: 'Classic Cabinet', className: 'cabinet-cosmetic-classic' },
```

Defines a named field in the save/profile or UI data structure.

### Line 18

```text
    { id: 'gold-trim', name: 'Gold Trim', className: 'cabinet-cosmetic-gold' },
```

Defines a named field in the save/profile or UI data structure.

### Line 19

```text
    { id: 'neon-cabinet', name: 'Neon Glow', className: 'cabinet-cosmetic-neon' },
```

Defines a named field in the save/profile or UI data structure.

### Line 20

```text
    { id: 'royal-cabinet', name: 'Royal Velvet', className: 'cabinet-cosmetic-royal' },
```

Defines a named field in the save/profile or UI data structure.

### Line 21

```text
    { id: 'ruby-cabinet', name: 'Ruby Lights', className: 'cabinet-cosmetic-ruby' },
```

Defines a named field in the save/profile or UI data structure.

### Line 22

```text
    { id: 'racing-cabinet', name: 'Racing Green', className: 'cabinet-cosmetic-racing' },
```

Defines a named field in the save/profile or UI data structure.

### Line 23

```text
    { id: 'checkered-cabinet', name: 'Checkered Flag', className: 'cabinet-cosmetic-checkered' },
```

Defines a named field in the save/profile or UI data structure.

### Line 24

```text
    { id: 'midnight-cabinet', name: 'Midnight Track', className: 'cabinet-cosmetic-midnight' }
```

Defines a named field in the save/profile or UI data structure.

### Line 25

```text
  ]);
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 26

```text

```

Blank line separates related logic for readability.

### Line 27

```text
  const blankState = () => ({
```

Creates a fresh zeroed achievement state for a profile.

### Line 28

```text
    version: VERSION,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 29

```text
    unlockedIds: [],
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 30

```text
    selectedCosmetic: DEFAULT_COSMETIC,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 31

```text
    history: [],
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 32

```text
    stats: { games: 0, wins: 0, races: 0, raceWins: 0 }
```

Initializes game/race counters and win counters at zero.

### Line 33

```text
  });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 34

```text

```

Blank line separates related logic for readability.

### Line 35

```text
  class AccomplishmentManager {
```

Declares the class that groups this module’s related state and operations.

### Line 36

```text
    constructor(hub) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 37

```text
      this.hub = hub;
```

Stores the hub runtime reference/state on this manager so later save operations can reuse it.

### Line 38

```text
      this.sequence = 0;
```

Stores the sequence runtime reference/state on this manager so later save operations can reuse it.

### Line 39

```text
      this.state = this.loadState();
```

Stores the state runtime reference/state on this manager so later save operations can reuse it.

### Line 40

```text
      this.applyCosmetic();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 41

```text
      this.mountPanel();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 42

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 43

```text

```

Blank line separates related logic for readability.

### Line 44

```text
    loadState() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 45

```text
      const saved = window.LocalProfiles?.getCurrentSave?.()?.accomplishments;
```

Defines saved for use by the surrounding persistence logic.

### Line 46

```text
      const source = saved && typeof saved === 'object' ? saved : {};
```

Defines source for use by the surrounding persistence logic.

### Line 47

```text
      const state = blankState();
```

Defines state for use by the surrounding persistence logic.

### Line 48

```text
      state.unlockedIds = Array.isArray(source.unlockedIds) ? [...new Set(source.unlockedIds.filter(id => ACHIEVEMENTS.some(item => item.id === id)))] : [];
```

Keeps only catalog achievement ids and deduplicates them.

### Line 49

```text
      state.selectedCosmetic = COSMETICS.some(item => item.id === source.selectedCosmetic) ? source.selectedCosmetic : DEFAULT_COSMETIC;
```

Allows only catalog cosmetics, otherwise selecting the classic default.

### Line 50

```text
      state.history = Array.isArray(source.history) ? source.history.filter(item => item && typeof item.id === 'string').slice(-HISTORY_LIMIT) : [];
```

Retains only object history entries and the newest 50.

### Line 51

```text
      const stats = source.stats && typeof source.stats === 'object' ? source.stats : {};
```

Defines stats for use by the surrounding persistence logic.

### Line 52

```text
      state.stats = {
```

Starts normalized achievement-stat reconstruction.

### Line 53

```text
        games: this.safeCount(stats.games), wins: this.safeCount(stats.wins),
```

Counts games and wins using safe nonnegative integers.

### Line 54

```text
        races: this.safeCount(stats.races), raceWins: this.safeCount(stats.raceWins)
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 55

```text
      };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 56

```text
      return state;
```

Returns `state` (state) to the caller and exits this function.

### Line 57

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 58

```text

```

Blank line separates related logic for readability.

### Line 59

```text
    safeCount(value) { return Number.isSafeInteger(value) && value >= 0 ? value : 0; }
```

Rejects non-safe or negative counters instead of allowing corrupted achievement math.

### Line 60

```text

```

Blank line separates related logic for readability.

### Line 61

```text
    getState() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 62

```text
      return JSON.parse(JSON.stringify(this.state));
```

Deep-clones state through JSON so callers cannot mutate live achievement state.

### Line 63

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 64

```text

```

Blank line separates related logic for readability.

### Line 65

```text
    getAchievements() { return ACHIEVEMENTS.slice(); }
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 66

```text
    getCosmetics() { return COSMETICS.slice(); }
```

Transforms or bounds the collection so only the intended normalized records continue.

### Line 67

```text
    isUnlocked(id) { return this.state.unlockedIds.includes(id); }
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 68

```text

```

Blank line separates related logic for readability.

### Line 69

```text
    persist() {
```

Persists a snapshot through encrypted profile storage, queues linked-file save, and refreshes UI.

### Line 70

```text
      const snapshot = this.getState();
```

Defines snapshot for use by the surrounding persistence logic.

### Line 71

```text
      window.LocalProfiles?.saveCurrent?.({ accomplishments: snapshot });
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 72

```text
      window.LocalSave?.queueFileSave?.();
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 73

```text
      this.applyCosmetic();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 74

```text
      this.renderPanel();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 75

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 76

```text

```

Blank line separates related logic for readability.

### Line 77

```text
    unlock(id) {
```

Finds a catalog entry and prevents duplicate unlocks.

### Line 78

```text
      const item = ACHIEVEMENTS.find(entry => entry.id === id);
```

Defines item for use by the surrounding persistence logic.

### Line 79

```text
      if (!item || this.isUnlocked(id)) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 80

```text
      this.state.unlockedIds.push(id);
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 81

```text
      if (item.cosmetic && COSMETICS.some(cosmetic => cosmetic.id === item.cosmetic) && !this.state.selectedCosmetic) this.state.selectedCosmetic = item.cosmetic;
```

Auto-selects an unlocked cosmetic only when a valid cosmetic mapping exists and no selection is set.

### Line 82

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 83

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 84

```text

```

Blank line separates related logic for readability.

### Line 85

```text
    makeId(prefix, value) {
```

Builds bounded stable ids from a prefix and value for retry-safe history deduplication.

### Line 86

```text
      return `${prefix}:${String(value)}`.slice(0, 180);
```

Returns copies a portion of a text template that combines fixed text with computed values `prefix` (prefix), converts `value` (value) to text, from 0 up to but excluding 180 to the caller and exits this function.

### Line 87

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 88

```text

```

Blank line separates related logic for readability.

### Line 89

```text
    appendHistory(entry) {
```

Starts history insertion with duplicate-id protection.

### Line 90

```text
      if (this.state.history.some(item => item.id === entry.id)) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 91

```text
      this.state.history.push(entry);
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 92

```text
      if (this.state.history.length > HISTORY_LIMIT) this.state.history = this.state.history.slice(-HISTORY_LIMIT);
```

Drops oldest entries beyond the 50-entry history limit.

### Line 93

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 94

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 95

```text

```

Blank line separates related logic for readability.

### Line 96

```text
    // Record completed non-racing games. Pass a stable id/roundId when available for retry-safe hooks.
```

Documents that game hooks should supply stable ids so retries do not double-count.

### Line 97

```text
    recordGame(game, result = {}) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 98

```text
      if (game && typeof game === 'object') { result = game; game = result.game || result.gameId || 'casino'; }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 99

```text
      const source = result && typeof result === 'object' ? result : {};
```

Defines source for use by the surrounding persistence logic.

### Line 100

```text
      const name = String(game || source.game || 'casino').slice(0, 40);
```

Defines name for use by the surrounding persistence logic.

### Line 101

```text
      const outcome = source.won === true || source.win === true || source.correct === true || source.outcome === 'win' ||
```

Classifies a result as win from explicit flags or payout greater than stake; otherwise it is a loss.

### Line 102

```text
        (Number.isFinite(Number(source.payout)) && Number(source.payout) > Number(source.stake || 0)) ? 'win' : 'loss';
```

Uses payout strictly above stake as an additional win criterion.

### Line 103

```text
      const stable = source.id || source.roundId || source.gameId || source.timestamp || `auto:${Date.now()}:${this.sequence++}`;
```

Prefers supplied id/roundId/gameId/timestamp and otherwise creates a unique time/sequence id.

### Line 104

```text
      const entry = { id: this.makeId('game', stable), kind: 'game', game: name, outcome, at: Number.isFinite(source.at) ? source.at : Date.now() };
```

Stores bounded game name, outcome, and timestamp as one history event.

### Line 105

```text
      if (!this.appendHistory(entry)) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 106

```text
      this.state.stats.games += 1;
```

Stops before math/persistence when the event id was already recorded.

### Line 107

```text
      if (outcome === 'win') this.state.stats.wins += 1;
```

Increments total completed-game count once.

### Line 108

```text
      this.unlock('first-game');
```

Increments wins only for the computed win outcome.

### Line 109

```text
      if (this.state.stats.games >= 10) this.unlock('games-10');
```

Unlocks first-game and the 10-game threshold from the cumulative counter.

### Line 110

```text
      if (outcome === 'win') { this.unlock('first-win'); if (this.state.stats.wins >= 10) this.unlock('wins-10'); }
```

Unlocks first-win and the 10-win threshold only on wins.

### Line 111

```text
      this.persist();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 112

```text
      return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 113

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 114

```text

```

Blank line separates related logic for readability.

### Line 115

```text
    // Record only actual settled race notices; race-engine calls this after settlement, never for previews.
```

States that races count only after actual settlement, never previews.

### Line 116

```text
    recordRace(notice) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 117

```text
      if (!notice || typeof notice !== 'object' || !Number.isSafeInteger(Number(notice.raceId))) return false;
```

Requires an object with a safe integer race id before recording.

### Line 118

```text
      const id = this.makeId('race', `${notice.raceType || 'horse'}:${Number(notice.raceId)}`);
```

Makes race identity stable by combining type and race id.

### Line 119

```text
      const entry = { id, kind: 'race', raceId: Number(notice.raceId), raceType: notice.raceType || null, won: notice.won === true, payout: Number(notice.payout) || 0, at: Date.now() };
```

Stores normalized race type, boolean win, nonnegative payout fallback, and current time.

### Line 120

```text
      if (!this.appendHistory(entry)) return false;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 121

```text
      this.state.stats.races += 1;
```

Increments settled-race count once per unique ticket.

### Line 122

```text
      if (entry.won) this.state.stats.raceWins += 1;
```

Increments race wins only when the notice says won.

### Line 123

```text
      this.unlock('first-race');
```

Unlocks the first-race milestone after any settlement.

### Line 124

```text
      if (entry.won) this.unlock('race-win');
```

Unlocks race-win only for winning settlements.

### Line 125

```text
      if (this.state.stats.races >= 10) this.unlock('races-10');
```

Unlocks races-10 when settled races reach ten.

### Line 126

```text
      this.persist();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 127

```text
      return entry;
```

Returns `entry` (entry) to the caller and exits this function.

### Line 128

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 129

```text

```

Blank line separates related logic for readability.

### Line 130

```text
    selectCosmetic(id) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 131

```text
      if (!COSMETICS.some(item => item.id === id) || (id !== DEFAULT_COSMETIC && !this.state.unlockedIds.includes(ACHIEVEMENTS.find(a => a.cosmetic === id)?.id))) return false;
```

Allows default or unlocked mapped cosmetics only; locked cosmetics cannot be selected.

### Line 132

```text
      this.state.selectedCosmetic = id;
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 133

```text
      this.persist();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 134

```text
      return true;
```

Returns true to the caller and exits this function.

### Line 135

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 136

```text

```

Blank line separates related logic for readability.

### Line 137

```text
    resetForActiveProfile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 138

```text
      this.state = this.loadState();
```

Stores the state runtime reference/state on this manager so later save operations can reuse it.

### Line 139

```text
      this.applyCosmetic();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 140

```text
      this.renderPanel();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 141

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 142

```text

```

Blank line separates related logic for readability.

### Line 143

```text
    applyCosmetic() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 144

```text
      if (typeof document === 'undefined' || !document.body) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 145

```text
      [...document.body.classList].filter(name => name.startsWith('cabinet-cosmetic-')).forEach(name => document.body.classList.remove(name));
```

Removes previously applied cabinet classes before adding the selected class.

### Line 146

```text
      const cosmetic = COSMETICS.find(item => item.id === this.state.selectedCosmetic) || COSMETICS[0];
```

Defines cosmetic for use by the surrounding persistence logic.

### Line 147

```text
      document.body.classList.add(cosmetic.className);
```

Adds the validated item to the in-memory collection used by subsequent persistence/UI updates.

### Line 148

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 149

```text

```

Blank line separates related logic for readability.

### Line 150

```text
    mountPanel() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 151

```text
      if (typeof document === 'undefined') return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 152

```text
      const lobby = document.getElementById('view-lobby');
```

Defines lobby for use by the surrounding persistence logic.

### Line 153

```text
      if (!lobby || document.getElementById('accomplishments-panel')) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 154

```text
      const panel = document.createElement('section');
```

Defines panel for use by the surrounding persistence logic.

### Line 155

```text
      panel.id = 'accomplishments-panel'; panel.className = 'accomplishments-panel'; panel.setAttribute('aria-labelledby', 'accomplishments-title');
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 156

```text
      panel.innerHTML = '<div><p class="lobby-room-kicker">PLAYER CABINET</p><h3 id="accomplishments-title">Achievements &amp; Cosmetics</h3><p class="accomplishments-summary"></p></div><div class="accomplishments-list"></div><div class="accomplishments-history"></div><label>Cabinet style <select class="accomplishments-select"></select></label>';
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 157

```text
      lobby.appendChild(panel); this.panel = panel; this.renderPanel();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 158

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 159

```text

```

Blank line separates related logic for readability.

### Line 160

```text
    renderPanel() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 161

```text
      if (!this.panel) return;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 162

```text
      const summary = this.panel.querySelector('.accomplishments-summary');
```

Defines summary for use by the surrounding persistence logic.

### Line 163

```text
      const list = this.panel.querySelector('.accomplishments-list');
```

Defines list for use by the surrounding persistence logic.

### Line 164

```text
      const select = this.panel.querySelector('.accomplishments-select');
```

Defines select for use by the surrounding persistence logic.

### Line 165

```text
      const history = this.panel.querySelector('.accomplishments-history');
```

Defines history for use by the surrounding persistence logic.

### Line 166

```text
      if (history) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 167

```text
        const races = this.state.history.filter(item => item.kind === 'race').slice(-10).reverse();
```

Selects the ten newest race entries and reverses them for newest-first display.

### Line 168

```text
        history.replaceChildren();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 169

```text
        const heading = document.createElement('h4'); heading.textContent = 'Recent race tickets'; history.append(heading);
```

Defines heading for use by the surrounding persistence logic.

### Line 170

```text
        if (!races.length) { const empty = document.createElement('p'); empty.textContent = 'Settled horse and car tickets will appear here.'; history.append(empty); }
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 171

```text
        races.forEach(entry => { const row = document.createElement('p'); row.textContent = `${entry.raceType === 'car' ? 'Car' : 'Horse'} · ${new Date(entry.raceId).toLocaleString()} · ${entry.won ? 'Won' : 'Lost'} · total return $${Number(entry.payout).toFixed(2)}`; history.append(row); });
```

Formats race id as a date, reports win/loss, and shows payout to cents; race ids must therefore be date-like for useful display.

### Line 172

```text
      }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 173

```text
      if (summary) summary.textContent = `${this.state.unlockedIds.length}/${ACHIEVEMENTS.length} achievements unlocked • ${this.state.stats.games} games • ${this.state.stats.races} settled races`;
```

Displays achievement count plus games and settled-race totals.

### Line 174

```text
      if (list) list.textContent = ACHIEVEMENTS.map(item => `${this.isUnlocked(item.id) ? '✓' : '○'} ${item.title}`).join('  ·  ');
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 175

```text
      if (select && !select.options.length) COSMETICS.forEach(item => { const option = document.createElement('option'); option.value = item.id; option.textContent = item.name; option.disabled = item.id !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === item.id)?.id); select.appendChild(option); });
```

Creates each cosmetic option and disables non-default styles until their achievement is unlocked.

### Line 176

```text
      if (select) {
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 177

```text
        Array.from(select.options).forEach(option => { option.disabled = option.value !== DEFAULT_COSMETIC && !this.isUnlocked(ACHIEVEMENTS.find(a => a.cosmetic === option.value)?.id); });
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 178

```text
        select.value = this.state.selectedCosmetic; select.onchange = () => this.selectCosmetic(select.value); }
```

Defines a callback that carries this event, collection, or asynchronous result into the next save operation.

### Line 179

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 180

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 181

```text

```

Blank line separates related logic for readability.

### Line 182

```text
  window.AccomplishmentManager = AccomplishmentManager;
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 183

```text
  window.AccomplishmentCatalog = { achievements: ACHIEVEMENTS, cosmetics: COSMETICS, historyLimit: HISTORY_LIMIT };
```

Uses the browser UI/global integration to coordinate this save or profile operation.

### Line 184

```text
})();
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
