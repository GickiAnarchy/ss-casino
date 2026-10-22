# src/js/slot-bet-rules.js

[Exact copy](../../../original/src/js/slot-bet-rules.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Shared slot currency rules use integer cents to avoid familiar binary floating-point drift in wager steps and payouts. */
```

Comment documents how this part supports the virtual casino engine.

### Line 2

```text
(function installSlotBetRules() {
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 3

```text
  /** Encapsulates each table's minimum, increment, ceiling, and starting wager as reusable configuration. */
```

Comment documents how this part supports the virtual casino engine.

### Line 4

```text
  class SlotBetRules {
```

Encapsulates each slot table minimum, step, ceiling, and starting wager.

### Line 5

```text
    constructor({ minimum, step, maximum = Infinity, startingBet = minimum } = {}) {
```

Initial cabinet wager.

### Line 6

```text
      const minimumCents = SlotBetRules.toCents(minimum);
```

Stores wager policy as integer cents.

### Line 7

```text
      const stepCents = SlotBetRules.toCents(step);
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 8

```text
      const maximumCents = maximum === Infinity ? Infinity : SlotBetRules.toCents(maximum);
```

Preserves an unlimited ceiling.

### Line 9

```text
      if (minimumCents < 1 || stepCents < 1 || maximumCents < minimumCents) {
```

Stores wager policy as integer cents.

### Line 10

```text
        throw new RangeError('Slot bet minimum, step, and maximum must be valid positive cent amounts.');
```

Rejects invalid input/configuration immediately.

### Line 11

```text
      }
```

Closes the current block or module.

### Line 12

```text
      this.minimumCents = minimumCents;
```

Stores wager policy as integer cents.

### Line 13

```text
      this.stepCents = stepCents;
```

Stores the validated integer-cent wager policy on this rules object.

### Line 14

```text
      this.maximumCents = maximumCents;
```

Stores the validated integer-cent wager policy on this rules object.

### Line 15

```text
      this.startingBet = Math.max(minimumCents, SlotBetRules.toCents(startingBet)) / 100;
```

Stores wager policy as integer cents.

### Line 16

```text
    }
```

Closes the current block or module.

### Line 17

```text

```

Blank line separates related code sections.

### Line 18

```text
    // Convert at the input boundary; perform stake arithmetic as integers until the UI needs dollars again.
```

Comment documents how this part supports the virtual casino engine.

### Line 19

```text
    static toCents(amount) {
```

Converts input dollars to nearest cents.

### Line 20

```text
      return Math.round((Number(amount) + Number.EPSILON) * 100);
```

Returns rounds multiplies adds converts `amount` (amount) to a number (invalid numeric text becomes NaN) and `Number.EPSILON` (the epsilon property of Number) (or joins them if a value is text) by 100 to the nearest whole number to the caller and exits this function.

### Line 21

```text
    }
```

Closes the current block or module.

### Line 22

```text

```

Blank line separates related code sections.

### Line 23

```text
    static roundMoney(amount) {
```

Rounds dollars to two decimals.

### Line 24

```text
      return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
```

Returns divides rounds multiplies adds converts `amount` (amount) to a number (invalid numeric text becomes NaN) and `Number.EPSILON` (the epsilon property of Number) (or joins them if a value is text) by 100 to the nearest whole number by 100 to the caller and exits this function.

### Line 25

```text
    }
```

Closes the current block or module.

### Line 26

```text

```

Blank line separates related code sections.

### Line 27

```text
    static format(amount) {
```

Formats slot money as USD with two decimals.

### Line 28

```text
      return new Intl.NumberFormat('en-US', {
```

Returns calls `new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format` with calls `SlotBetRules.roundMoney` with `amount` (amount) to the caller and exits this function.

### Line 29

```text
        style: 'currency',
```

Configures US-dollar formatting so slot wagers display consistently.

### Line 30

```text
        currency: 'USD',
```

Configures US-dollar formatting so slot wagers display consistently.

### Line 31

```text
        minimumFractionDigits: 2,
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 32

```text
        maximumFractionDigits: 2
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 33

```text
      }).format(SlotBetRules.roundMoney(amount));
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 34

```text
    }
```

Closes the current block or module.

### Line 35

```text

```

Blank line separates related code sections.

### Line 36

```text
    // The affordable ceiling must also be a legal table increment, not merely an amount below the wallet balance.
```

Comment documents how this part supports the virtual casino engine.

### Line 37

```text
    getMaximum(balance, playerMaximum) {
```

Finds the highest affordable wager that lands on a legal step.

### Line 38

```text
      const affordableCents = Math.min(
```

Takes the minimum of wallet, player cap, and table cap.

### Line 39

```text
        SlotBetRules.toCents(balance),
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 40

```text
        SlotBetRules.toCents(playerMaximum),
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 41

```text
        this.maximumCents
```

Stores the validated integer-cent wager policy on this rules object.

### Line 42

```text
      );
```

Calculates one bounded integer-cent wager value for the slot controls.

### Line 43

```text
      if (affordableCents < this.minimumCents) return 0;
```

Stores wager policy as integer cents.

### Line 44

```text
      const steps = Math.floor((affordableCents - this.minimumCents) / this.stepCents);
```

Stores wager policy as integer cents.

### Line 45

```text
      return (this.minimumCents + steps * this.stepCents) / 100;
```

Stores wager policy as integer cents.

### Line 46

```text
    }
```

Closes the current block or module.

### Line 47

```text

```

Blank line separates related code sections.

### Line 48

```text
    // Stop at the highest affordable legal step so a button cannot create a rejected wager.
```

Comment documents how this part supports the virtual casino engine.

### Line 49

```text
    increase(current, balance, playerMaximum) {
```

Moves up one legal step without exceeding the affordable maximum.

### Line 50

```text
      const maximum = this.getMaximum(balance, playerMaximum);
```

Returns the lesser of balance and cap, or zero if below minimum.

### Line 51

```text
      if (maximum === 0) return current;
```

Guards the following action so it runs only when the condition is true.

### Line 52

```text
      const nextCents = SlotBetRules.toCents(current) + this.stepCents;
```

Stores the validated integer-cent wager policy on this rules object.

### Line 53

```text
      return Math.min(SlotBetRules.toCents(maximum), nextCents) / 100;
```

Returns divides chooses the smallest of calls `SlotBetRules.toCents` with `maximum` (maximum), `nextCents` (next cents) by 100 to the caller and exits this function.

### Line 54

```text
    }
```

Closes the current block or module.

### Line 55

```text

```

Blank line separates related code sections.

### Line 56

```text
    decrease(current) {
```

Moves down one step but never below minimum.

### Line 57

```text
      return Math.max(this.minimumCents, SlotBetRules.toCents(current) - this.stepCents) / 100;
```

Stores wager policy as integer cents.

### Line 58

```text
    }
```

Closes the current block or module.

### Line 59

```text
  }
```

Closes the current block or module.

### Line 60

```text

```

Blank line separates related code sections.

### Line 61

```text
  if (typeof window !== 'undefined') window.SlotBetRules = SlotBetRules;
```

Guards the following action so it runs only when the condition is true.

### Line 62

```text
  if (typeof module !== 'undefined' && module.exports) module.exports = SlotBetRules;
```

Guards the following action so it runs only when the condition is true.

### Line 63

```text
})();
```

Closes the current block or module.
