(function installSlotBetRules() {
  class SlotBetRules {
    constructor({ minimum, step, maximum = Infinity, startingBet = minimum } = {}) {
      const minimumCents = SlotBetRules.toCents(minimum);
      const stepCents = SlotBetRules.toCents(step);
      const maximumCents = maximum === Infinity ? Infinity : SlotBetRules.toCents(maximum);
      if (minimumCents < 1 || stepCents < 1 || maximumCents < minimumCents) {
        throw new RangeError('Slot bet minimum, step, and maximum must be valid positive cent amounts.');
      }
      this.minimumCents = minimumCents;
      this.stepCents = stepCents;
      this.maximumCents = maximumCents;
      this.startingBet = Math.max(minimumCents, SlotBetRules.toCents(startingBet)) / 100;
    }

    static toCents(amount) {
      return Math.round((Number(amount) + Number.EPSILON) * 100);
    }

    static roundMoney(amount) {
      return Math.round((Number(amount) + Number.EPSILON) * 100) / 100;
    }

    static format(amount) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(SlotBetRules.roundMoney(amount));
    }

    getMaximum(balance, playerMaximum) {
      const affordableCents = Math.min(
        SlotBetRules.toCents(balance),
        SlotBetRules.toCents(playerMaximum),
        this.maximumCents
      );
      if (affordableCents < this.minimumCents) return 0;
      const steps = Math.floor((affordableCents - this.minimumCents) / this.stepCents);
      return (this.minimumCents + steps * this.stepCents) / 100;
    }

    increase(current, balance, playerMaximum) {
      const maximum = this.getMaximum(balance, playerMaximum);
      if (maximum === 0) return current;
      const nextCents = SlotBetRules.toCents(current) + this.stepCents;
      return Math.min(SlotBetRules.toCents(maximum), nextCents) / 100;
    }

    decrease(current) {
      return Math.max(this.minimumCents, SlotBetRules.toCents(current) - this.stepCents) / 100;
    }
  }

  if (typeof window !== 'undefined') window.SlotBetRules = SlotBetRules;
  if (typeof module !== 'undefined' && module.exports) module.exports = SlotBetRules;
})();
