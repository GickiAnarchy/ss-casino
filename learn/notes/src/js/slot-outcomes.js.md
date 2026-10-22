# src/js/slot-outcomes.js

[Exact copy](../../../original/src/js/slot-outcomes.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Payout arithmetic is independent from animation and persistence. Multipliers and symbol weights remain cabinet-defined. */
```

Comment documents how this part supports the virtual casino engine.

### Line 2

```text
(function installSlotOutcomes(root) {
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 3

```text
  const money = value => Math.round((value + Number.EPSILON) * 100) / 100;
```

Rounds payout arithmetic to cents.

### Line 4

```text
  function calculate(game, grid, five = false) {
```

Evaluates payline and scatter payouts independent of animation.

### Line 5

```text
    const lines = [];
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 6

```text
    let jackpotHit = false;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 7

```text
    game.PAYLINES.forEach((line, index) => {
```

Checks each configured payline.

### Line 8

```text
      const symbols = line.map(([reel, row]) => grid[reel][row]);
```

Reads symbols from the grid at the line coordinates.

### Line 9

```text
      let target, count;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 10

```text
      if (!five) {
```

Guards the following action so it runs only when the condition is true.

### Line 11

```text
        const nonWild = symbols.filter(symbol => symbol.id !== 'wild');
```

Finds ordinary symbols so wilds can substitute.

### Line 12

```text
        target = nonWild.length === 0 ? game.SYMBOLS.find(symbol => symbol.id === 'wild') : (symbols.every(symbol => symbol.id === nonWild[0].id || symbol.id === 'wild') ? nonWild[0] : null);
```

Finds ordinary symbols so wilds can substitute.

### Line 13

```text
        count = target ? 3 : 0;
```

A valid classic line pays as three matching symbols.

### Line 14

```text
      } else {
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 15

```text
        target = symbols.find(symbol => !symbol.isWild && !symbol.isScatter) || game.SYMBOLS.find(symbol => symbol.isWild);
```

Accepts matching three-reel symbols with wild substitution, or identifies the five-reel run symbol.

### Line 16

```text
        count = 0;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 17

```text
        for (const symbol of symbols) {
```

Counts only a consecutive prefix of matching/wild symbols.

### Line 18

```text
          if (symbol.id === target.id || symbol.isWild) count++;
```

Guards the following action so it runs only when the condition is true.

### Line 19

```text
          else break;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 20

```text
        }
```

Closes the current block or module.

### Line 21

```text
        if (count === 5 && target.id === 'crown') jackpotHit = true;
```

Flags five crowns as the legacy jackpot trigger.

### Line 22

```text
      }
```

Closes the current block or module.

### Line 23

```text
      const multiplier = target && (five ? target.mult[count] : target.multiplier);
```

Pays 1.5x for two matches, doubling for each third match; fewer than two pays zero.

### Line 24

```text
      if (count >= 3 && multiplier) lines.push({ line: index + 1, symbol: target.id, count, payout: money(game.bet * multiplier), coordinates: line.slice(0, count) });
```

Records a paying line and its gross stake-times-multiplier return.

### Line 25

```text
    });
```

Closes the current block or module.

### Line 26

```text
    const scatterCount = five ? grid.flat().filter(symbol => symbol.isScatter).length : 0;
```

Counts scatters across the whole five-reel grid.

### Line 27

```text
    const scatter = scatterCount >= 3 ? game.bet * game.SYMBOLS.find(symbol => symbol.isScatter).mult[Math.min(scatterCount, 5)] : 0;
```

Counts scatters across the whole five-reel grid.

### Line 28

```text
    // The legacy five-reel jackpot replaces (does not add to) ordinary line/scatter returns.
```

Comment documents how this part supports the virtual casino engine.

### Line 29

```text
    const lineTotal = money(lines.reduce((sum, line) => sum + game.bet * (five ? game.SYMBOLS.find(symbol => symbol.id === line.symbol).mult[line.count] : game.SYMBOLS.find(symbol => symbol.id === line.symbol).multiplier), 0) + scatter);
```

Adds line and scatter returns and rounds to cents.

### Line 30

```text
    return { lines, scatterCount, scatterPayout: money(scatter), lineTotal, jackpotHit };
```

Counts scatters across the whole five-reel grid.

### Line 31

```text
  }
```

Closes the current block or module.

### Line 32

```text
  function transition(previous, result, stake, free) {
```

Advances free-spin state and records one settled spin.

### Line 33

```text
    const state = JSON.parse(JSON.stringify(previous));
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 34

```text
    state.freeSpinsRemaining = free ? Math.max(0, state.freeSpinsRemaining - 1) : 0;
```

Consumes a free spin, or clears the counter for an ordinary spin.

### Line 35

```text
    if (!free) { state.bonusTotalWin = 0; state.summary = null; state.lockedStake = stake; }
```

Resets/accumulates the free-spin total.

### Line 36

```text
    let triggered = false;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 37

```text
    if (result.scatterCount >= 3 && state.freeSpinsRemaining === 0) {
```

Counts scatters across the whole five-reel grid.

### Line 38

```text
      state.freeSpinsRemaining = 10;
```

Consumes a free spin, or clears the counter for an ordinary spin.

### Line 39

```text
      if (!free) state.bonusTotalWin = 0;
```

Resets/accumulates the free-spin total.

### Line 40

```text
      state.stickyWildsGrid = Array.from({length: 5}, () => Array(3).fill(false));
```

Initializes a 5-by-3 sticky-wild flag grid.

### Line 41

```text
      triggered = true;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 42

```text
    }
```

Closes the current block or module.

### Line 43

```text
    if (free || triggered) state.bonusTotalWin = money(state.bonusTotalWin + result.payout);
```

Resets/accumulates the free-spin total.

### Line 44

```text
    if (free && state.freeSpinsRemaining === 0) state.summary = { totalWin: state.bonusTotalWin };
```

Consumes a free spin, or clears the counter for an ordinary spin.

### Line 45

```text
    state.lastResult = { status: 'settled', stake: free ? 0 : stake, payout: result.payout, lines: result.lines.map(({coordinates, ...line}) => line) };
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 46

```text
    return { state, triggered };
```

Returns an object with fields state: `state` (state); triggered: `triggered` (triggered) to the caller and exits this function.

### Line 47

```text
  }
```

Closes the current block or module.

### Line 48

```text
  const api = { calculate, transition, money };
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 49

```text
  root.SlotOutcomes = api;
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.

### Line 50

```text
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
```

Guards the following action so it runs only when the condition is true.

### Line 51

```text
})(typeof window === 'undefined' ? globalThis : window);
```

Performs the surrounding payline, scatter, or free-spin calculation using the configured table data.
