// Original L1: Comment: Player is the validated in-memory value object shared by game logic and local persistence. */
/* Player is the validated in-memory value object shared by game logic and local persistence. */
// Original L2: Comment: 
// Original L3: States that only virtual-chip progress is persisted; credentials never belong in Player.
// Original L4: Comment: credentials are not part of the game or save data.
// Original L5: Comment: 
/**
 * In-memory game profile. Only virtual-chip progress is persisted locally;
 * credentials are not part of the game or save data.
 */
// Original L6: Explains why an explicit save shape is safer than serializing runtime methods/objects.
/** Keeps numeric game state together and exposes an explicit save shape instead of serializing runtime objects. */
// Original L7: Declares the class that groups this module’s related state and operations.
class Player {
// Original L8: Implements this module operation and passes its validated result to the next persistence step.
  constructor({
// Original L9: Assigns the computed name value used by the surrounding validation or persistence step.
    name = 'Guest',
// Original L10: Assigns the computed balance value used by the surrounding validation or persistence step.
    balance = 100,
// Original L11: Assigns the computed lastSpinTime value used by the surrounding validation or persistence step.
    lastSpinTime = 0,
// Original L12: Assigns the computed level value used by the surrounding validation or persistence step.
    level = 1,
// Original L13: Assigns the computed xp value used by the surrounding validation or persistence step.
    xp = 0,
// Original L14: Assigns the computed debt value used by the surrounding validation or persistence step.
    debt = 0,
// Original L15: Assigns the computed creditLimit value used by the surrounding validation or persistence step.
    creditLimit = 2000,
// Original L16: Assigns the computed maxBet value used by the surrounding validation or persistence step.
    maxBet = 100
// Original L17: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
  } = {}) {
// Original L18: Stores the name runtime reference/state on this manager so later save operations can reuse it.
    this.name = name;
// Original L19: Normalizes balance to a finite nonnegative number, defaulting to 100.
    this.balance = Player.numberOr(balance, 100, 0);
// Original L20: Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.
    this.lastSpinTime = Player.numberOr(lastSpinTime, 0, 0);
// Original L21: Floors level and enforces a minimum of 1 after numeric validation.
    this.level = Math.max(1, Math.floor(Player.numberOr(level, 1, 1)));
// Original L22: Stores the xp runtime reference/state on this manager so later save operations can reuse it.
    this.xp = Player.numberOr(xp, 0, 0);
// Original L23: Stores the debt runtime reference/state on this manager so later save operations can reuse it.
    this.debt = Player.numberOr(debt, 0, 0);
// Original L24: Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.
    this.creditLimit = Player.numberOr(creditLimit, 2000, 0);
// Original L25: Stores a private max-bet setting with a minimum of 1; the getter later limits it by balance.
    this._maxBet = Player.numberOr(maxBet, 100, 1);
// Original L26: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L27: Blank line separates related logic for readability.

// Original L28: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
  get maxBet() {
// Original L29: Documents that displayed/usable max bet cannot exceed current balance.
    // Returns the configured max bet, safely capped by the current balance
// Original L30: Returns the smaller of configured max bet and balance, preventing a bet larger than available chips.
    return Math.min(this._maxBet, this.balance);
// Original L31: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L32: Blank line separates related logic for readability.

// Original L33: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
  set maxBet(amount) {
// Original L34: Stores the _maxBet runtime reference/state on this manager so later save operations can reuse it.
    this._maxBet = Player.numberOr(amount, 100, 1);
// Original L35: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L36: Blank line separates related logic for readability.

// Original L37: Comment: Load the existing browser-local save keys so current guest progress survives. */
  /** Load the existing browser-local save keys so current guest progress survives. */
// Original L38: Reads or writes browser-local storage; this is origin-local and not a server backup.
  static fromLocalStorage(defaultBalance = 100, storage = window.localStorage) {
// Original L39: Defines player for use by the surrounding persistence logic.
    const player = new Player({ balance: defaultBalance });
// Original L40: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    player.loadLocalState(storage);
// Original L41: Returns `player` (player) to the caller and exits this function.
    return player;
// Original L42: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L43: Blank line separates related logic for readability.

// Original L44: Comment: Restore a validated profile from a local save file. */
  /** Restore a validated profile from a local save file. */
// Original L45: Rebuilds a Player from whitelisted profile fields rather than trusting arbitrary object properties.
  static fromProfile(profile = {}, name = 'Player') {
// Original L46: Returns constructs a new instance of `Player` with an object with fields name: `name` (name); balance: `profile.balance` (the balance property of profile); lastSpinTime: `profile.lastSpinTime` (the last spin time property of profile); level: `profile.level` (the level property of profile); xp: `profile.xp` (the xp property of profile); debt: `profile.debt` (the debt property of profile); and further fields to the caller and exits this function.
    return new Player({
// Original L47: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      name,
// Original L48: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      balance: profile.balance,
// Original L49: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      lastSpinTime: profile.lastSpinTime,
// Original L50: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      level: profile.level,
// Original L51: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      xp: profile.xp,
// Original L52: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      debt: profile.debt,
// Original L53: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      creditLimit: profile.creditLimit,
// Original L54: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      maxBet: profile.maxBet
// Original L55: Closes the surrounding block or literal; no independent data transformation occurs here.
    });
// Original L56: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L57: Blank line separates related logic for readability.

// Original L58: Implements this module operation and passes its validated result to the next persistence step.
  loadProfile(profile = {}) {
// Original L59: Uses the same validated conversion path when loading a profile into an existing player.
    const safe = Player.fromProfile(profile, this.name);
// Original L60: Stores the balance runtime reference/state on this manager so later save operations can reuse it.
    this.balance = safe.balance;
// Original L61: Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.
    this.lastSpinTime = safe.lastSpinTime;
// Original L62: Stores the level runtime reference/state on this manager so later save operations can reuse it.
    this.level = safe.level;
// Original L63: Stores the xp runtime reference/state on this manager so later save operations can reuse it.
    this.xp = safe.xp;
// Original L64: Stores the debt runtime reference/state on this manager so later save operations can reuse it.
    this.debt = safe.debt;
// Original L65: Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.
    this.creditLimit = safe.creditLimit;
// Original L66: Copies the normalized configured max bet, preserving the explicit save value rather than the balance-capped getter.
    this.maxBet = safe.toProfile().maxBet;
// Original L67: Returns this object instance to the caller and exits this function.
    return this;
// Original L68: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L69: Blank line separates related logic for readability.

// Original L70: Defines the exact player fields that are serialized into local saves.
  /** Explicit list of player fields stored in a local save. */
// Original L71: Implements this module operation and passes its validated result to the next persistence step.
  toProfile() {
// Original L72: Returns an object with fields balance: `this.balance` (the balance property of this); lastSpinTime: `this.lastSpinTime` (the last spin time property of this); level: `this.level` (the level property of this); xp: `this.xp` (the xp property of this); debt: `this.debt` (the debt property of this); creditLimit: `this.creditLimit` (the credit limit property of this); and further fields to the caller and exits this function.
    return {
// Original L73: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      balance: this.balance,
// Original L74: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      lastSpinTime: this.lastSpinTime,
// Original L75: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      level: this.level,
// Original L76: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      xp: this.xp,
// Original L77: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      debt: this.debt,
// Original L78: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      creditLimit: this.creditLimit,
// Original L79: Exports the uncapped private max-bet setting so it can be restored when balance changes.
      maxBet: this._maxBet
// Original L80: Closes the surrounding block or literal; no independent data transformation occurs here.
    };
// Original L81: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L82: Blank line separates related logic for readability.

// Original L83: Loads the legacy guest keys as a migration-compatible fallback.
  loadLocalState(storage = window.localStorage) {
// Original L84: Defines balanceSave for use by the surrounding persistence logic.
    let balanceSave = {};
// Original L85: Defines xpSave for use by the surrounding persistence logic.
    let xpSave = {};
// Original L86: Blank line separates related logic for readability.

// Original L87: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
    try {
// Original L88: Parses the old balance JSON; malformed data leaves the constructor default intact.
      balanceSave = JSON.parse(storage.getItem('casino_hub_player') || '{}');
// Original L89: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    } catch (error) {
// Original L90: Comment: Ignore malformed legacy JSON and keep safe defaults for that save field.
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
// Original L91: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L92: Blank line separates related logic for readability.

// Original L93: Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.
    try {
// Original L94: Parses old XP/level JSON separately so one corrupt legacy key does not erase the other.
      xpSave = JSON.parse(storage.getItem('casino_hub_xp') || '{}');
// Original L95: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    } catch (error) {
// Original L96: Comment: Ignore malformed legacy JSON and keep safe defaults for that save field.
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
// Original L97: Closes the surrounding block or literal; no independent data transformation occurs here.
    }
// Original L98: Blank line separates related logic for readability.

// Original L99: Validates the old balance before putting it into memory.
    this.balance = Player.numberOr(balanceSave.balance, this.balance, 0);
// Original L100: Floors legacy level and keeps it at least 1.
    this.level = Math.max(1, Math.floor(Player.numberOr(xpSave.level, this.level, 1)));
// Original L101: Stores the xp runtime reference/state on this manager so later save operations can reuse it.
    this.xp = Player.numberOr(xpSave.xp, this.xp, 0);
// Original L102: Stores the debt runtime reference/state on this manager so later save operations can reuse it.
    this.debt = Player.numberOr(storage.getItem('casino_hub_debt'), this.debt, 0);
// Original L103: Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.
    this.lastSpinTime = Player.numberOr(storage.getItem('casino_hub_wheel'), this.lastSpinTime, 0);
// Original L104: Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.
    this.creditLimit = Player.numberOr(
// Original L105: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      storage.getItem('casino_hub_credit_limit'),
// Original L106: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      this.creditLimit,
// Original L107: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
      0
// Original L108: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    );
// Original L109: Requires legacy max bet to be at least 100, matching the established betting floor.
    this.maxBet = Player.numberOr(storage.getItem('casino_hub_max_bet'), this._maxBet, 100);
// Original L110: Returns this object instance to the caller and exits this function.
    return this;
// Original L111: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L112: Blank line separates related logic for readability.

// Original L113: Documents preservation of the old guest key names/formats during migration.
  /** Preserve the established guest-save keys and data formats. */
// Original L114: Reads or writes browser-local storage; this is origin-local and not a server backup.
  saveLocalState(storage = window.localStorage) {
// Original L115: Serializes only balance into the old player key.
    storage.setItem('casino_hub_player', JSON.stringify({ balance: this.balance }));
// Original L116: Serializes level and XP into the old XP key.
    storage.setItem('casino_hub_xp', JSON.stringify({ level: this.level, xp: this.xp }));
// Original L117: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    storage.setItem('casino_hub_debt', String(this.debt));
// Original L118: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    storage.setItem('casino_hub_wheel', String(this.lastSpinTime));
// Original L119: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    storage.setItem('casino_hub_credit_limit', String(this.creditLimit));
// Original L120: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
    storage.setItem('casino_hub_max_bet', String(this._maxBet));
// Original L121: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L122: Blank line separates related logic for readability.

// Original L123: Defines numeric validation used throughout Player: finite numbers must meet the requested floor.
  /** Accept only finite numbers above the caller-provided floor; malformed saved values fall back safely. */
// Original L124: Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.
  static numberOr(value, fallback, minimum) {
// Original L125: Guards the following operation so invalid, missing, or unsafe state is not applied.
    if (value === null || value === undefined || value === '') return fallback;
// Original L126: Defines number for use by the surrounding persistence logic.
    const number = Number(value);
// Original L127: Returns the parsed number only when finite and above the minimum; otherwise returns the safe fallback.
    return Number.isFinite(number) && number >= minimum ? number : fallback;
// Original L128: Closes the surrounding block or literal; no independent data transformation occurs here.
  }
// Original L129: Closes the surrounding block or literal; no independent data transformation occurs here.
}
