/* Player is the validated in-memory value object shared by game logic and local persistence. */
/**
 * In-memory game profile. Only virtual-chip progress is persisted locally;
 * credentials are not part of the game or save data.
 */
/** Keeps numeric game state together and exposes an explicit save shape instead of serializing runtime objects. */
class Player {
  constructor({
    name = 'Guest',
    balance = 100,
    lastSpinTime = 0,
    level = 1,
    xp = 0,
    debt = 0,
    creditLimit = 2000,
    maxBet = 100
  } = {}) {
    this.name = name;
    this.balance = Player.numberOr(balance, 100, 0);
    this.lastSpinTime = Player.numberOr(lastSpinTime, 0, 0);
    this.level = Math.max(1, Math.floor(Player.numberOr(level, 1, 1)));
    this.xp = Player.numberOr(xp, 0, 0);
    this.debt = Player.numberOr(debt, 0, 0);
    this.creditLimit = Player.numberOr(creditLimit, 2000, 0);
    this._maxBet = Player.numberOr(maxBet, 100, 1);
  }

  get maxBet() {
    // Returns the configured max bet, safely capped by the current balance
    return Math.min(this._maxBet, this.balance);
  }

  set maxBet(amount) {
    this._maxBet = Player.numberOr(amount, 100, 1);
  }

  /** Load the existing browser-local save keys so current guest progress survives. */
  static fromLocalStorage(defaultBalance = 100, storage = window.localStorage) {
    const player = new Player({ balance: defaultBalance });
    player.loadLocalState(storage);
    return player;
  }

  /** Restore a validated profile from a local save file. */
  static fromProfile(profile = {}, name = 'Player') {
    return new Player({
      name,
      balance: profile.balance,
      lastSpinTime: profile.lastSpinTime,
      level: profile.level,
      xp: profile.xp,
      debt: profile.debt,
      creditLimit: profile.creditLimit,
      maxBet: profile.maxBet
    });
  }

  loadProfile(profile = {}) {
    const safe = Player.fromProfile(profile, this.name);
    this.balance = safe.balance;
    this.lastSpinTime = safe.lastSpinTime;
    this.level = safe.level;
    this.xp = safe.xp;
    this.debt = safe.debt;
    this.creditLimit = safe.creditLimit;
    this.maxBet = safe.maxBet;
    return this;
  }

  /** Explicit list of player fields stored in a local save. */
  toProfile() {
    return {
      balance: this.balance,
      lastSpinTime: this.lastSpinTime,
      level: this.level,
      xp: this.xp,
      debt: this.debt,
      creditLimit: this.creditLimit,
      maxBet: this._maxBet
    };
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
    this.creditLimit = Player.numberOr(
      storage.getItem('casino_hub_credit_limit'),
      this.creditLimit,
      0
    );
    this.maxBet = Player.numberOr(storage.getItem('casino_hub_max_bet'), this._maxBet, 100);
    return this;
  }

  /** Preserve the established guest-save keys and data formats. */
  saveLocalState(storage = window.localStorage) {
    storage.setItem('casino_hub_player', JSON.stringify({ balance: this.balance }));
    storage.setItem('casino_hub_xp', JSON.stringify({ level: this.level, xp: this.xp }));
    storage.setItem('casino_hub_debt', String(this.debt));
    storage.setItem('casino_hub_wheel', String(this.lastSpinTime));
    storage.setItem('casino_hub_credit_limit', String(this.creditLimit));
    storage.setItem('casino_hub_max_bet', String(this._maxBet));
  }

  /** Accept only finite numbers above the caller-provided floor; malformed saved values fall back safely. */
  static numberOr(value, fallback, minimum) {
    if (value === null || value === undefined || value === '') return fallback;
    const number = Number(value);
    return Number.isFinite(number) && number >= minimum ? number : fallback;
  }
}
