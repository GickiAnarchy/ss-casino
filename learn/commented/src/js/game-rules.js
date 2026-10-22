// Original L1: Comment documents how this part supports the virtual casino engine.
/* Pure virtual-credit rules shared by coin and card tables. */
// Original L2: Computes a bounded virtual-credit rule value used by the caller.
(function installGameRules(root) {
// Original L3: Converts finite nonnegative dollars to integer cents, avoiding floating-point drift.
  const cents = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value) * 100 + 1e-7)) : 0;
// Original L4: Returns the lesser of balance and cap, or zero if below minimum.
  const maximum = (balance, cap, minimum = 5) => {
// Original L5: Computes a bounded virtual-credit rule value used by the caller.
    const amount = Math.min(cents(balance), cents(cap));
// Original L6: Returns checks checks whether `amount` (amount) is at least calls `cents` with `minimum` (minimum); if true chooses divides `amount` (amount) by 100, otherwise 0 to the caller and exits this function.
    return amount >= cents(minimum) ? amount / 100 : 0;
// Original L7: Closes the current block or module.
  };
// Original L8: Checks minimum and maximum wager legality.
  const legal = (bet, balance, cap, minimum = 5) => cents(bet) >= cents(minimum) && cents(bet) <= cents(maximum(balance, cap, minimum));
// Original L9: Computes a bounded virtual-credit rule value used by the caller.
  const increase = (bet, balance, cap, minimum = 5) => {
// Original L10: Computes a bounded virtual-credit rule value used by the caller.
    const max = maximum(balance, cap, minimum);
// Original L11: Returns checks checks that `max` (max) and 0 have the same value and type; if true chooses 0, otherwise chooses the smallest of `max` (max), chooses the largest of `minimum` (minimum), divides adds `cents(bet)` and 500 (or joins them if a value is text) by 100 to the caller and exits this function.
    return max === 0 ? 0 : Math.min(max, Math.max(minimum, (cents(bet) + 500) / 100));
// Original L12: Closes the current block or module.
  };
// Original L13: Computes a bounded virtual-credit rule value used by the caller.
  const decrease = (bet, minimum = 5) => bet <= minimum ? minimum : Math.max(minimum, (cents(bet) - 500) / 100);
// Original L14: Validates three heads/tails picks and calculates the virtual coin result.
  const threeCoinResult = (choices, outcomes, stake) => {
// Original L15: Guards the following action so it runs only when the condition is true.
    if (!Array.isArray(choices) || !Array.isArray(outcomes) || choices.length !== 3 || outcomes.length !== 3 ||
// Original L16: Computes a bounded virtual-credit rule value used by the caller.
        !choices.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !outcomes.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !Number.isFinite(stake) || stake <= 0) {
// Original L17: Rejects invalid input/configuration immediately.
      throw new Error('Choose heads or tails for all three coins and a positive stake.');
// Original L18: Closes the current block or module.
    }
// Original L19: Counts position-by-position matches.
    const correct = choices.reduce((sum, choice, index) => sum + Number(choice === outcomes[index]), 0);
// Original L20: Comment documents how this part supports the virtual casino engine.
    // Doubling total returns for 2 and 3 matches: 93.75% expected gross return before cent rounding.
// Original L21: Pays 1.5x for two matches, doubling for each third match; fewer than two pays zero.
    const multiplier = correct >= 2 ? 1.5 * 2 ** (correct - 2) : 0;
// Original L22: Rounds gross return to cents.
    const payout = Math.round(stake * multiplier * 100) / 100;
// Original L23: Reports payout minus the original stake.
    return { correct, multiplier, payout, stake, net: Math.round((payout - stake) * 100) / 100 };
// Original L24: Closes the current block or module.
  };
// Original L25: Raises permanent credit and max-bet limits on level up.
  const levelReward = player => {
// Original L26: Computes a bounded virtual-credit rule value used by the caller.
    const level = player.level;
// Original L27: Computes a bounded virtual-credit rule value used by the caller.
    const bonus = level * 50;
// Original L28: Computes a bounded virtual-credit rule value used by the caller.
    player.creditLimit += 250;
// Original L29: Comment documents how this part supports the virtual casino engine.
    // The getter is balance-capped: never use it to increment the permanent limit.
// Original L30: Adds 500 to the profile max bet, avoiding a balance-capped getter.
    player.maxBet = player.toProfile().maxBet + 500;
// Original L31: Returns an object with fields level: `level` (level); bonus: `bonus` (bonus); creditIncrease: 250; maxIncrease: 500 to the caller and exits this function.
    return { level, bonus, creditIncrease: 250, maxIncrease: 500 };
// Original L32: Closes the current block or module.
  };
// Original L33: Validates three heads/tails picks and calculates the virtual coin result.
  const api = { maximum, legal, increase, decrease, threeCoinResult, levelReward };
// Original L34: Publishes the rules API to the browser or CommonJS test environment.
  root.GameRules = api;
// Original L35: Guards the following action so it runs only when the condition is true.
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
// Original L36: Computes a bounded virtual-credit rule value used by the caller.
})(typeof window === 'undefined' ? globalThis : window);
