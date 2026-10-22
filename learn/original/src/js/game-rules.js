/* Pure virtual-credit rules shared by coin and card tables. */
(function installGameRules(root) {
  const cents = value => Number.isFinite(Number(value)) ? Math.max(0, Math.floor(Number(value) * 100 + 1e-7)) : 0;
  const maximum = (balance, cap, minimum = 5) => {
    const amount = Math.min(cents(balance), cents(cap));
    return amount >= cents(minimum) ? amount / 100 : 0;
  };
  const legal = (bet, balance, cap, minimum = 5) => cents(bet) >= cents(minimum) && cents(bet) <= cents(maximum(balance, cap, minimum));
  const increase = (bet, balance, cap, minimum = 5) => {
    const max = maximum(balance, cap, minimum);
    return max === 0 ? 0 : Math.min(max, Math.max(minimum, (cents(bet) + 500) / 100));
  };
  const decrease = (bet, minimum = 5) => bet <= minimum ? minimum : Math.max(minimum, (cents(bet) - 500) / 100);
  const threeCoinResult = (choices, outcomes, stake) => {
    if (!Array.isArray(choices) || !Array.isArray(outcomes) || choices.length !== 3 || outcomes.length !== 3 ||
        !choices.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !outcomes.every(choice => ['HEADS', 'TAILS'].includes(choice)) || !Number.isFinite(stake) || stake <= 0) {
      throw new Error('Choose heads or tails for all three coins and a positive stake.');
    }
    const correct = choices.reduce((sum, choice, index) => sum + Number(choice === outcomes[index]), 0);
    // Doubling total returns for 2 and 3 matches: 93.75% expected gross return before cent rounding.
    const multiplier = correct >= 2 ? 1.5 * 2 ** (correct - 2) : 0;
    const payout = Math.round(stake * multiplier * 100) / 100;
    return { correct, multiplier, payout, stake, net: Math.round((payout - stake) * 100) / 100 };
  };
  const levelReward = player => {
    const level = player.level;
    const bonus = level * 50;
    player.creditLimit += 250;
    // The getter is balance-capped: never use it to increment the permanent limit.
    player.maxBet = player.toProfile().maxBet + 500;
    return { level, bonus, creditIncrease: 250, maxIncrease: 500 };
  };
  const api = { maximum, legal, increase, decrease, threeCoinResult, levelReward };
  root.GameRules = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window === 'undefined' ? globalThis : window);
