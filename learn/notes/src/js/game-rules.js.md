# src/js/game-rules.js

[Exact copy](../../../original/src/js/game-rules.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Pure virtual-credit rules shared by coin and card tables. */
```

Comment documents how this part supports the virtual casino engine.

### Line 2

```text
(function installGameRules(root) {
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 3

```text
  const cents = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value) * 100 + 1e-7)) : 0;
```

Converts finite nonnegative dollars to integer cents, avoiding floating-point drift.

### Line 4

```text
  const maximum = (balance, cap, minimum = 5) => {
```

Returns the lesser of balance and cap, or zero if below minimum.

### Line 5

```text
    const amount = Math.min(cents(balance), cents(cap));
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 6

```text
    return amount >= cents(minimum) ? amount / 100 : 0;
```

Returns checks checks whether `amount` (amount) is at least calls `cents` with `minimum` (minimum); if true chooses divides `amount` (amount) by 100, otherwise 0 to the caller and exits this function.

### Line 7

```text
  };
```

Closes the current block or module.

### Line 8

```text
  const legal = (bet, balance, cap, minimum = 5) => cents(bet) >= cents(minimum) && cents(bet) <= cents(maximum(balance, cap, minimum));
```

Checks minimum and maximum wager legality.

### Line 9

```text
  const increase = (bet, balance, cap, minimum = 5) => {
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 10

```text
    const max = maximum(balance, cap, minimum);
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 11

```text
    return max === 0 ? 0 : Math.min(max, Math.max(minimum, (cents(bet) + 500) / 100));
```

Returns checks checks that `max` (max) and 0 have the same value and type; if true chooses 0, otherwise chooses the smallest of `max` (max), chooses the largest of `minimum` (minimum), divides adds `cents(bet)` and 500 (or joins them if a value is text) by 100 to the caller and exits this function.

### Line 12

```text
  };
```

Closes the current block or module.

### Line 13

```text
  const decrease = (bet, minimum = 5) => bet <= minimum ? minimum : Math.max(minimum, (cents(bet) - 500) / 100);
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 14

```text
  const threeCoinResult = (choices, outcomes, stake) => {
```

Validates three heads/tails picks and calculates the virtual coin result.

### Line 15

```text
    if (!Array.isArray(choices) || !Array.isArray(outcomes) || choices.length !== 3 || outcomes.length !== 3 ||
```

Guards the following action so it runs only when the condition is true.

### Line 16

```text
        !choices.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !outcomes.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !Number.isFinite(stake) || stake <= 0) {
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 17

```text
      throw new Error('Choose heads or tails for all three coins and a positive stake.');
```

Rejects invalid input/configuration immediately.

### Line 18

```text
    }
```

Closes the current block or module.

### Line 19

```text
    const correct = choices.reduce((sum, choice, index) => sum + Number(choice === outcomes[index]), 0);
```

Counts position-by-position matches.

### Line 20

```text
    // Doubling total returns for 2 and 3 matches: 93.75% expected gross return before cent rounding.
```

Comment documents how this part supports the virtual casino engine.

### Line 21

```text
    const multiplier = correct >= 2 ? 1.5 * 2 ** (correct - 2) : 0;
```

Pays 1.5x for two matches, doubling for each third match; fewer than two pays zero.

### Line 22

```text
    const payout = Math.round(stake * multiplier * 100) / 100;
```

Rounds gross return to cents.

### Line 23

```text
    return { correct, multiplier, payout, stake, net: Math.round((payout - stake) * 100) / 100 };
```

Reports payout minus the original stake.

### Line 24

```text
  };
```

Closes the current block or module.

### Line 25

```text
  const levelReward = player => {
```

Raises permanent credit and max-bet limits on level up.

### Line 26

```text
    const level = player.level;
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 27

```text
    const bonus = level * 50;
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 28

```text
    player.creditLimit += 250;
```

Computes a bounded virtual-credit rule value used by the caller.

### Line 29

```text
    // The getter is balance-capped: never use it to increment the permanent limit.
```

Comment documents how this part supports the virtual casino engine.

### Line 30

```text
    player.maxBet = player.toProfile().maxBet + 500;
```

Adds 500 to the profile max bet, avoiding a balance-capped getter.

### Line 31

```text
    return { level, bonus, creditIncrease: 250, maxIncrease: 500 };
```

Returns an object with fields level: `level` (level); bonus: `bonus` (bonus); creditIncrease: 250; maxIncrease: 500 to the caller and exits this function.

### Line 32

```text
  };
```

Closes the current block or module.

### Line 33

```text
  const api = { maximum, legal, increase, decrease, threeCoinResult, levelReward };
```

Validates three heads/tails picks and calculates the virtual coin result.

### Line 34

```text
  root.GameRules = api;
```

Publishes the rules API to the browser or CommonJS test environment.

### Line 35

```text
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
```

Guards the following action so it runs only when the condition is true.

### Line 36

```text
})(typeof window === 'undefined' ? globalThis : window);
```

Computes a bounded virtual-credit rule value used by the caller.
