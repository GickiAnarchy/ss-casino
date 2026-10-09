/**
 * In-memory game profile. Authentication credentials belong exclusively to
 * Firebase Authentication; Player never receives or persists a password.
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
    this.balance = Player.numberOr(balance, 1000, 0);
    this.lastSpinTime = Player.numberOr(lastSpinTime, 0, 0);
    this.level = Math.max(1, Math.floor(Player.numberOr(level, 1, 1)));
    this.xp = Player.numberOr(xp, 0, 0);
    this.debt = Player.numberOr(debt, 0, 0);
    this.creditLimit = Player.numberOr(creditLimit, 2000, 0);
  }

  /** Load the existing browser-local save keys so current guest progress survives. */
  static fromLocalStorage(defaultBalance = 1000, storage = window.localStorage) {
    const player = new Player({ balance: defaultBalance });
    player.loadLocalState(storage);
    return player;
  }

  /** Restore a validated profile from the account cache or Firestore. */
  static fromProfile(profile = {}, name = 'Player') {
    return new Player({
      name,
      balance: profile.balance,
      lastSpinTime: profile.lastSpinTime,
      level: profile.level,
      xp: profile.xp,
      debt: profile.debt,
      creditLimit: profile.creditLimit
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
    return this;
  }

  /** The only fields permitted in a local account cache or Firestore document. */
  toProfile() {
    return {
      balance: this.balance,
      lastSpinTime: this.lastSpinTime,
      level: this.level,
      xp: this.xp,
      debt: this.debt,
      creditLimit: this.creditLimit
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
    return this;
  }

  /** Preserve the established guest-save keys and data formats. */
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
