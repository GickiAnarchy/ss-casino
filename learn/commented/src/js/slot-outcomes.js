// Original L1: Comment documents how this part supports the virtual casino engine.
/* Payout arithmetic is independent from animation and persistence. Multipliers and symbol weights remain cabinet-defined. */
// Original L2: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
(function installSlotOutcomes(root) {
// Original L3: Rounds payout arithmetic to cents.
  const money = value => Math.round((value + Number.EPSILON) * 100) / 100;
// Original L4: Evaluates payline and scatter payouts independent of animation.
  function calculate(game, grid, five = false) {
// Original L5: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
    const lines = [];
// Original L6: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
    let jackpotHit = false;
// Original L7: Checks each configured payline.
    game.PAYLINES.forEach((line, index) => {
// Original L8: Reads symbols from the grid at the line coordinates.
      const symbols = line.map(([reel, row]) => grid[reel][row]);
// Original L9: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
      let target, count;
// Original L10: Guards the following action so it runs only when the condition is true.
      if (!five) {
// Original L11: Finds ordinary symbols so wilds can substitute.
        const nonWild = symbols.filter(symbol => symbol.id !== 'wild');
// Original L12: Finds ordinary symbols so wilds can substitute.
        target = nonWild.length === 0 ? game.SYMBOLS.find(symbol => symbol.id === 'wild') : (symbols.every(symbol => symbol.id === nonWild[0].id || symbol.id === 'wild') ? nonWild[0] : null);
// Original L13: A valid classic line pays as three matching symbols.
        count = target ? 3 : 0;
// Original L14: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
      } else {
// Original L15: Accepts matching three-reel symbols with wild substitution, or identifies the five-reel run symbol.
        target = symbols.find(symbol => !symbol.isWild && !symbol.isScatter) || game.SYMBOLS.find(symbol => symbol.isWild);
// Original L16: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
        count = 0;
// Original L17: Counts only a consecutive prefix of matching/wild symbols.
        for (const symbol of symbols) {
// Original L18: Guards the following action so it runs only when the condition is true.
          if (symbol.id === target.id || symbol.isWild) count++;
// Original L19: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
          else break;
// Original L20: Closes the current block or module.
        }
// Original L21: Flags five crowns as the legacy jackpot trigger.
        if (count === 5 && target.id === 'crown') jackpotHit = true;
// Original L22: Closes the current block or module.
      }
// Original L23: Pays 1.5x for two matches, doubling for each third match; fewer than two pays zero.
      const multiplier = target && (five ? target.mult[count] : target.multiplier);
// Original L24: Records a paying line and its gross stake-times-multiplier return.
      if (count >= 3 && multiplier) lines.push({ line: index + 1, symbol: target.id, count, payout: money(game.bet * multiplier), coordinates: line.slice(0, count) });
// Original L25: Closes the current block or module.
    });
// Original L26: Counts scatters across the whole five-reel grid.
    const scatterCount = five ? grid.flat().filter(symbol => symbol.isScatter).length : 0;
// Original L27: Counts scatters across the whole five-reel grid.
    const scatter = scatterCount >= 3 ? game.bet * game.SYMBOLS.find(symbol => symbol.isScatter).mult[Math.min(scatterCount, 5)] : 0;
// Original L28: Comment documents how this part supports the virtual casino engine.
    // The legacy five-reel jackpot replaces (does not add to) ordinary line/scatter returns.
// Original L29: Adds line and scatter returns and rounds to cents.
    const lineTotal = money(lines.reduce((sum, line) => sum + game.bet * (five ? game.SYMBOLS.find(symbol => symbol.id === line.symbol).mult[line.count] : game.SYMBOLS.find(symbol => symbol.id === line.symbol).multiplier), 0) + scatter);
// Original L30: Counts scatters across the whole five-reel grid.
    return { lines, scatterCount, scatterPayout: money(scatter), lineTotal, jackpotHit };
// Original L31: Closes the current block or module.
  }
// Original L32: Advances free-spin state and records one settled spin.
  function transition(previous, result, stake, free) {
// Original L33: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
    const state = JSON.parse(JSON.stringify(previous));
// Original L34: Consumes a free spin, or clears the counter for an ordinary spin.
    state.freeSpinsRemaining = free ? Math.max(0, state.freeSpinsRemaining - 1) : 0;
// Original L35: Resets/accumulates the free-spin total.
    if (!free) { state.bonusTotalWin = 0; state.summary = null; state.lockedStake = stake; }
// Original L36: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
    let triggered = false;
// Original L37: Counts scatters across the whole five-reel grid.
    if (result.scatterCount >= 3 && state.freeSpinsRemaining === 0) {
// Original L38: Consumes a free spin, or clears the counter for an ordinary spin.
      state.freeSpinsRemaining = 10;
// Original L39: Resets/accumulates the free-spin total.
      if (!free) state.bonusTotalWin = 0;
// Original L40: Initializes a 5-by-3 sticky-wild flag grid.
      state.stickyWildsGrid = Array.from({length: 5}, () => Array(3).fill(false));
// Original L41: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
      triggered = true;
// Original L42: Closes the current block or module.
    }
// Original L43: Resets/accumulates the free-spin total.
    if (free || triggered) state.bonusTotalWin = money(state.bonusTotalWin + result.payout);
// Original L44: Consumes a free spin, or clears the counter for an ordinary spin.
    if (free && state.freeSpinsRemaining === 0) state.summary = { totalWin: state.bonusTotalWin };
// Original L45: Stores settled stake, payout, and line summary; free-spin stake is zero.
    state.lastResult = { status: 'settled', stake: free ? 0 : stake, payout: result.payout, lines: result.lines.map(({coordinates, ...line}) => line) };
// Original L46: Returns an object with fields state: `state` (state); triggered: `triggered` (triggered) to the caller and exits this function.
    return { state, triggered };
// Original L47: Closes the current block or module.
  }
// Original L48: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
  const api = { calculate, transition, money };
// Original L49: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
  root.SlotOutcomes = api;
// Original L50: Guards the following action so it runs only when the condition is true.
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
// Original L51: Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
})(typeof window === 'undefined' ? globalThis : window);
