/* Payout arithmetic is independent from animation and persistence. Multipliers and symbol weights remain cabinet-defined. */
(function installSlotOutcomes(root) {
  const money = value => Math.round((value + Number.EPSILON) * 100) / 100;
  function calculate(game, grid, five = false) {
    const lines = [];
    let jackpotHit = false;
    game.PAYLINES.forEach((line, index) => {
      const symbols = line.map(([reel, row]) => grid[reel][row]);
      let target, count;
      if (!five) {
        const nonWild = symbols.filter(symbol => symbol.id !== 'wild');
        target = nonWild.length === 0 ? game.SYMBOLS.find(symbol => symbol.id === 'wild') : (symbols.every(symbol => symbol.id === nonWild[0].id || symbol.id === 'wild') ? nonWild[0] : null);
        count = target ? 3 : 0;
      } else {
        target = symbols.find(symbol => !symbol.isWild && !symbol.isScatter) || game.SYMBOLS.find(symbol => symbol.isWild);
        count = 0;
        for (const symbol of symbols) {
          if (symbol.id === target.id || symbol.isWild) count++;
          else break;
        }
        if (count === 5 && target.id === 'crown') jackpotHit = true;
      }
      const multiplier = target && (five ? target.mult[count] : target.multiplier);
      if (count >= 3 && multiplier) lines.push({ line: index + 1, symbol: target.id, count, payout: money(game.bet * multiplier), coordinates: line.slice(0, count) });
    });
    const scatterCount = five ? grid.flat().filter(symbol => symbol.isScatter).length : 0;
    const scatter = scatterCount >= 3 ? game.bet * game.SYMBOLS.find(symbol => symbol.isScatter).mult[Math.min(scatterCount, 5)] : 0;
    // The legacy five-reel jackpot replaces (does not add to) ordinary line/scatter returns.
    const lineTotal = money(lines.reduce((sum, line) => sum + game.bet * (five ? game.SYMBOLS.find(symbol => symbol.id === line.symbol).mult[line.count] : game.SYMBOLS.find(symbol => symbol.id === line.symbol).multiplier), 0) + scatter);
    return { lines, scatterCount, scatterPayout: money(scatter), lineTotal, jackpotHit };
  }
  function transition(previous, result, stake, free) {
    const state = JSON.parse(JSON.stringify(previous));
    state.freeSpinsRemaining = free ? Math.max(0, state.freeSpinsRemaining - 1) : 0;
    if (!free) { state.bonusTotalWin = 0; state.summary = null; state.lockedStake = stake; }
    let triggered = false;
    if (result.scatterCount >= 3 && state.freeSpinsRemaining === 0) {
      state.freeSpinsRemaining = 10;
      if (!free) state.bonusTotalWin = 0;
      state.stickyWildsGrid = Array.from({length: 5}, () => Array(3).fill(false));
      triggered = true;
    }
    if (free || triggered) state.bonusTotalWin = money(state.bonusTotalWin + result.payout);
    if (free && state.freeSpinsRemaining === 0) state.summary = { totalWin: state.bonusTotalWin };
    state.lastResult = { status: 'settled', stake: free ? 0 : stake, payout: result.payout, lines: result.lines.map(({coordinates, ...line}) => line) };
    return { state, triggered };
  }
  const api = { calculate, transition, money };
  root.SlotOutcomes = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
