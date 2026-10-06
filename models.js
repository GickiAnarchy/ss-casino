/**
 * In-memory source of truth for the current account-free casino session.
 * The app deliberately does not create accounts, authenticate players, or sync
 * player data to a server; game progress remains in this browser's localStorage.
 *
 * `password` is a future-only placeholder for a possible account feature. It
 * is never read by game behavior and is intentionally excluded from every
 * localStorage payload below. Do not collect or persist a real password here.
 */
class Player {
  constructor({
    name = 'Guest',
    balance = 1000,
    lastSpinTime = 0,
    level = 1,
    xp = 0,
    debt = 0,
    creditLimit = 2000
  } = {}) {
    this.name = name;
    this.password = ''; // Future-only placeholder; not used by the account-free game.
    this.balance = balance;
    this.lastSpinTime = lastSpinTime;
    this.level = level;
    this.xp = xp;
    this.debt = debt;
    this.creditLimit = creditLimit;
  }

  /** Load the existing browser-local save keys so current players keep progress. */
  static fromLocalStorage(defaultBalance = 1000, storage = window.localStorage) {
    const player = new Player({ balance: defaultBalance });
    player.loadLocalState(storage);
    return player;
  }

  loadLocalState(storage = window.localStorage) {
    let balanceSave = {};
    let xpSave = {};

    try {
      balanceSave = JSON.parse(storage.getItem('casino_hub_player') || '{}');
    } catch (error) {
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
    }

    try {
      xpSave = JSON.parse(storage.getItem('casino_hub_xp') || '{}');
    } catch (error) {
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
    }

    this.balance = Player.numberOr(balanceSave.balance, this.balance, 0);
    this.level = Math.max(1, Math.floor(Player.numberOr(xpSave.level, this.level, 1)));
    this.xp = Player.numberOr(xpSave.xp, this.xp, 0);
    this.debt = Player.numberOr(storage.getItem('casino_hub_debt'), this.debt, 0);
    this.lastSpinTime = Player.numberOr(storage.getItem('casino_hub_wheel'), this.lastSpinTime, 0);
    // Older saves did not store the credit limit; preserve their established $2,000 default.
    this.creditLimit = Player.numberOr(
      storage.getItem('casino_hub_credit_limit'),
      this.creditLimit,
      0
    );
    return this;
  }

  /**
   * Keep the established localStorage keys and data formats for backwards
   * compatibility. Each payload is explicit so `password` can never leak.
   */
  saveLocalState(storage = window.localStorage) {
    storage.setItem('casino_hub_player', JSON.stringify({ balance: this.balance }));
    storage.setItem('casino_hub_xp', JSON.stringify({ level: this.level, xp: this.xp }));
    storage.setItem('casino_hub_debt', String(this.debt));
    storage.setItem('casino_hub_wheel', String(this.lastSpinTime));
    storage.setItem('casino_hub_credit_limit', String(this.creditLimit));
  }

  static numberOr(value, fallback, minimum) {
    if (value === null || value === undefined || value === '') return fallback;
    const number = Number(value);
    return Number.isFinite(number) && number >= minimum ? number : fallback;
  }
}
