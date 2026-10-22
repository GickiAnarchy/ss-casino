// Original L1: Comment documents how this part supports the virtual casino engine.
/* Shared slot currency rules use integer cents to avoid familiar binary floating-point drift in wager steps and payouts. */
// Original L2: Calculates one bounded integer-cent wager value for the slot controls.
(function installSlotBetRules() {
// Original L3: Comment documents how this part supports the virtual casino engine.
  /** Encapsulates each table's minimum, increment, ceiling, and starting wager as reusable configuration. */
// Original L4: Encapsulates each slot table minimum, step, ceiling, and starting wager.
  class SlotBetRules {
// Original L5: Initial cabinet wager.
    constructor({ minimum, step, maximum = Infinity, startingBet = minimum } = {}) {
// Original L6: Stores wager policy as integer cents.
      const minimumCents = SlotBetRules.toCents(minimum);
// Original L7: Calculates one bounded integer-cent wager value for the slot controls.
      const stepCents = SlotBetRules.toCents(step);
// Original L8: Preserves an unlimited ceiling.
      const maximumCents = maximum === Infinity ? Infinity : SlotBetRules.toCents(maximum);
// Original L9: Stores wager policy as integer cents.
      if (minimumCents < 1 || stepCents < 1 || maximumCents < minimumCents) {
// Original L10: Rejects invalid input/configuration immediately.
        throw new RangeError('Slot bet minimum, step, and maximum must be valid positive cent amounts.');
// Original L11: Closes the current block or module.
      }
// Original L12: Stores wager policy as integer cents.
      this.minimumCents = minimumCents;
// Original L13: Stores the validated integer-cent wager policy on this rules object.
      this.stepCents = stepCents;
// Original L14: Stores the validated integer-cent wager policy on this rules object.
      this.maximumCents = maximumCents;
// Original L15: Stores wager policy as integer cents.
      this.startingBet = Math.max(minimumCents, SlotBetRules.toCents(startingBet)) / 100;
// Original L16: Closes the current block or module.
    }
// Original L17: Blank line separates related code sections.

// Original L18: Comment documents how this part supports the virtual casino engine.
    // Convert at the input boundary; perform stake arithmetic as integers until the UI needs dollars again.
// Original L19: Converts input dollars to nearest cents.
    static toCents(amount) {
// Original L20: Returns rounds multiplies adds converts `amount` (amount) to a number (invalid numeric text becomes NaN) and `Number.EPSILON` (the epsilon property of Number) (or joins them if a value is text) by 100 to the nearest whole number to the caller and exits this function.
      return Math.round((Number(amount) + Number.EPSILON) * 100);
// Original L21: Closes the current block or module.
    }
// Original L22: Blank line separates related code sections.

// Original L23: Rounds dollars to two decimals.
    static roundMoney(amount) {
// Original L24: Returns divides rounds multiplies adds converts `amount` (amount) to a number (invalid numeric text becomes NaN) and `Number.EPSILON` (the epsilon property of Number) (or joins them if a value is text) by 100 to the nearest whole number by 100 to the caller and exits this function.
      return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
// Original L25: Closes the current block or module.
    }
// Original L26: Blank line separates related code sections.

// Original L27: Formats slot money as USD with two decimals.
    static format(amount) {
// Original L28: Returns calls `new Intl.NumberFormat('en-US', {         style: 'currency',         currency: 'USD',         minimumFractionDigits: 2,         maximumFractionDigits: 2       }).format` with calls `SlotBetRules.roundMoney` with `amount` (amount) to the caller and exits this function.
      return new Intl.NumberFormat('en-US', {
// Original L29: Configures US-dollar formatting so slot wagers display consistently.
        style: 'currency',
// Original L30: Configures US-dollar formatting so slot wagers display consistently.
        currency: 'USD',
// Original L31: Calculates one bounded integer-cent wager value for the slot controls.
        minimumFractionDigits: 2,
// Original L32: Calculates one bounded integer-cent wager value for the slot controls.
        maximumFractionDigits: 2
// Original L33: Calculates one bounded integer-cent wager value for the slot controls.
      }).format(SlotBetRules.roundMoney(amount));
// Original L34: Closes the current block or module.
    }
// Original L35: Blank line separates related code sections.

// Original L36: Comment documents how this part supports the virtual casino engine.
    // The affordable ceiling must also be a legal table increment, not merely an amount below the wallet balance.
// Original L37: Finds the highest affordable wager that lands on a legal step.
    getMaximum(balance, playerMaximum) {
// Original L38: Takes the minimum of wallet, player cap, and table cap.
      const affordableCents = Math.min(
// Original L39: Calculates one bounded integer-cent wager value for the slot controls.
        SlotBetRules.toCents(balance),
// Original L40: Calculates one bounded integer-cent wager value for the slot controls.
        SlotBetRules.toCents(playerMaximum),
// Original L41: Stores the validated integer-cent wager policy on this rules object.
        this.maximumCents
// Original L42: Calculates one bounded integer-cent wager value for the slot controls.
      );
// Original L43: Stores wager policy as integer cents.
      if (affordableCents < this.minimumCents) return 0;
// Original L44: Stores wager policy as integer cents.
      const steps = Math.floor((affordableCents - this.minimumCents) / this.stepCents);
// Original L45: Stores wager policy as integer cents.
      return (this.minimumCents + steps * this.stepCents) / 100;
// Original L46: Closes the current block or module.
    }
// Original L47: Blank line separates related code sections.

// Original L48: Comment documents how this part supports the virtual casino engine.
    // Stop at the highest affordable legal step so a button cannot create a rejected wager.
// Original L49: Moves up one legal step without exceeding the affordable maximum.
    increase(current, balance, playerMaximum) {
// Original L50: Returns the lesser of balance and cap, or zero if below minimum.
      const maximum = this.getMaximum(balance, playerMaximum);
// Original L51: Guards the following action so it runs only when the condition is true.
      if (maximum === 0) return current;
// Original L52: Stores the validated integer-cent wager policy on this rules object.
      const nextCents = SlotBetRules.toCents(current) + this.stepCents;
// Original L53: Returns divides chooses the smallest of calls `SlotBetRules.toCents` with `maximum` (maximum), `nextCents` (next cents) by 100 to the caller and exits this function.
      return Math.min(SlotBetRules.toCents(maximum), nextCents) / 100;
// Original L54: Closes the current block or module.
    }
// Original L55: Blank line separates related code sections.

// Original L56: Moves down one step but never below minimum.
    decrease(current) {
// Original L57: Stores wager policy as integer cents.
      return Math.max(this.minimumCents, SlotBetRules.toCents(current) - this.stepCents) / 100;
// Original L58: Closes the current block or module.
    }
// Original L59: Closes the current block or module.
  }
// Original L60: Blank line separates related code sections.

// Original L61: Guards the following action so it runs only when the condition is true.
  if (typeof window !== 'undefined') window.SlotBetRules = SlotBetRules;
// Original L62: Guards the following action so it runs only when the condition is true.
  if (typeof module !== 'undefined' && module.exports) module.exports = SlotBetRules;
// Original L63: Closes the current block or module.
})();
