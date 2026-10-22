# src/js/models.js

[Exact copy](../../../original/src/js/models.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Player is the validated in-memory value object shared by game logic and local persistence. */
```

Comment: Player is the validated in-memory value object shared by game logic and local persistence. */

### Line 2

```text
/**
```

Comment: 

### Line 3

```text
 * In-memory game profile. Only virtual-chip progress is persisted locally;
```

States that only virtual-chip progress is persisted; credentials never belong in Player.

### Line 4

```text
 * credentials are not part of the game or save data.
```

Comment: credentials are not part of the game or save data.

### Line 5

```text
 */
```

Comment: 

### Line 6

```text
/** Keeps numeric game state together and exposes an explicit save shape instead of serializing runtime objects. */
```

Explains why an explicit save shape is safer than serializing runtime methods/objects.

### Line 7

```text
class Player {
```

Declares the class that groups this module’s related state and operations.

### Line 8

```text
  constructor({
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 9

```text
    name = 'Guest',
```

Assigns the computed name value used by the surrounding validation or persistence step.

### Line 10

```text
    balance = 100,
```

Assigns the computed balance value used by the surrounding validation or persistence step.

### Line 11

```text
    lastSpinTime = 0,
```

Assigns the computed lastSpinTime value used by the surrounding validation or persistence step.

### Line 12

```text
    level = 1,
```

Assigns the computed level value used by the surrounding validation or persistence step.

### Line 13

```text
    xp = 0,
```

Assigns the computed xp value used by the surrounding validation or persistence step.

### Line 14

```text
    debt = 0,
```

Assigns the computed debt value used by the surrounding validation or persistence step.

### Line 15

```text
    creditLimit = 2000,
```

Assigns the computed creditLimit value used by the surrounding validation or persistence step.

### Line 16

```text
    maxBet = 100
```

Assigns the computed maxBet value used by the surrounding validation or persistence step.

### Line 17

```text
  } = {}) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 18

```text
    this.name = name;
```

Stores the name runtime reference/state on this manager so later save operations can reuse it.

### Line 19

```text
    this.balance = Player.numberOr(balance, 100, 0);
```

Normalizes balance to a finite nonnegative number, defaulting to 100.

### Line 20

```text
    this.lastSpinTime = Player.numberOr(lastSpinTime, 0, 0);
```

Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.

### Line 21

```text
    this.level = Math.max(1, Math.floor(Player.numberOr(level, 1, 1)));
```

Floors level and enforces a minimum of 1 after numeric validation.

### Line 22

```text
    this.xp = Player.numberOr(xp, 0, 0);
```

Stores the xp runtime reference/state on this manager so later save operations can reuse it.

### Line 23

```text
    this.debt = Player.numberOr(debt, 0, 0);
```

Stores the debt runtime reference/state on this manager so later save operations can reuse it.

### Line 24

```text
    this.creditLimit = Player.numberOr(creditLimit, 2000, 0);
```

Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.

### Line 25

```text
    this._maxBet = Player.numberOr(maxBet, 100, 1);
```

Stores a private max-bet setting with a minimum of 1; the getter later limits it by balance.

### Line 26

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 27

```text

```

Blank line separates related logic for readability.

### Line 28

```text
  get maxBet() {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 29

```text
    // Returns the configured max bet, safely capped by the current balance
```

Documents that displayed/usable max bet cannot exceed current balance.

### Line 30

```text
    return Math.min(this._maxBet, this.balance);
```

Returns the smaller of configured max bet and balance, preventing a bet larger than available chips.

### Line 31

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 32

```text

```

Blank line separates related logic for readability.

### Line 33

```text
  set maxBet(amount) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 34

```text
    this._maxBet = Player.numberOr(amount, 100, 1);
```

Stores the _maxBet runtime reference/state on this manager so later save operations can reuse it.

### Line 35

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 36

```text

```

Blank line separates related logic for readability.

### Line 37

```text
  /** Load the existing browser-local save keys so current guest progress survives. */
```

Comment: Load the existing browser-local save keys so current guest progress survives. */

### Line 38

```text
  static fromLocalStorage(defaultBalance = 100, storage = window.localStorage) {
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 39

```text
    const player = new Player({ balance: defaultBalance });
```

Defines player for use by the surrounding persistence logic.

### Line 40

```text
    player.loadLocalState(storage);
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 41

```text
    return player;
```

Returns `player` (player) to the caller and exits this function.

### Line 42

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 43

```text

```

Blank line separates related logic for readability.

### Line 44

```text
  /** Restore a validated profile from a local save file. */
```

Comment: Restore a validated profile from a local save file. */

### Line 45

```text
  static fromProfile(profile = {}, name = 'Player') {
```

Rebuilds a Player from whitelisted profile fields rather than trusting arbitrary object properties.

### Line 46

```text
    return new Player({
```

Returns constructs a new instance of `Player` with an object with fields name: `name` (name); balance: `profile.balance` (the balance property of profile); lastSpinTime: `profile.lastSpinTime` (the last spin time property of profile); level: `profile.level` (the level property of profile); xp: `profile.xp` (the xp property of profile); debt: `profile.debt` (the debt property of profile); and further fields to the caller and exits this function.

### Line 47

```text
      name,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 48

```text
      balance: profile.balance,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 49

```text
      lastSpinTime: profile.lastSpinTime,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 50

```text
      level: profile.level,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 51

```text
      xp: profile.xp,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 52

```text
      debt: profile.debt,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 53

```text
      creditLimit: profile.creditLimit,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 54

```text
      maxBet: profile.maxBet
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 55

```text
    });
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 56

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 57

```text

```

Blank line separates related logic for readability.

### Line 58

```text
  loadProfile(profile = {}) {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 59

```text
    const safe = Player.fromProfile(profile, this.name);
```

Uses the same validated conversion path when loading a profile into an existing player.

### Line 60

```text
    this.balance = safe.balance;
```

Stores the balance runtime reference/state on this manager so later save operations can reuse it.

### Line 61

```text
    this.lastSpinTime = safe.lastSpinTime;
```

Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.

### Line 62

```text
    this.level = safe.level;
```

Stores the level runtime reference/state on this manager so later save operations can reuse it.

### Line 63

```text
    this.xp = safe.xp;
```

Stores the xp runtime reference/state on this manager so later save operations can reuse it.

### Line 64

```text
    this.debt = safe.debt;
```

Stores the debt runtime reference/state on this manager so later save operations can reuse it.

### Line 65

```text
    this.creditLimit = safe.creditLimit;
```

Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.

### Line 66

```text
    this.maxBet = safe.toProfile().maxBet;
```

Copies the normalized configured max bet, preserving the explicit save value rather than the balance-capped getter.

### Line 67

```text
    return this;
```

Returns this object instance to the caller and exits this function.

### Line 68

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 69

```text

```

Blank line separates related logic for readability.

### Line 70

```text
  /** Explicit list of player fields stored in a local save. */
```

Defines the exact player fields that are serialized into local saves.

### Line 71

```text
  toProfile() {
```

Implements this module operation and passes its validated result to the next persistence step.

### Line 72

```text
    return {
```

Returns an object with fields balance: `this.balance` (the balance property of this); lastSpinTime: `this.lastSpinTime` (the last spin time property of this); level: `this.level` (the level property of this); xp: `this.xp` (the xp property of this); debt: `this.debt` (the debt property of this); creditLimit: `this.creditLimit` (the credit limit property of this); and further fields to the caller and exits this function.

### Line 73

```text
      balance: this.balance,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 74

```text
      lastSpinTime: this.lastSpinTime,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 75

```text
      level: this.level,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 76

```text
      xp: this.xp,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 77

```text
      debt: this.debt,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 78

```text
      creditLimit: this.creditLimit,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 79

```text
      maxBet: this._maxBet
```

Exports the uncapped private max-bet setting so it can be restored when balance changes.

### Line 80

```text
    };
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 81

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 82

```text

```

Blank line separates related logic for readability.

### Line 83

```text
  loadLocalState(storage = window.localStorage) {
```

Loads the legacy guest keys as a migration-compatible fallback.

### Line 84

```text
    let balanceSave = {};
```

Defines balanceSave for use by the surrounding persistence logic.

### Line 85

```text
    let xpSave = {};
```

Defines xpSave for use by the surrounding persistence logic.

### Line 86

```text

```

Blank line separates related logic for readability.

### Line 87

```text
    try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 88

```text
      balanceSave = JSON.parse(storage.getItem('casino_hub_player') || '{}');
```

Parses the old balance JSON; malformed data leaves the constructor default intact.

### Line 89

```text
    } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 90

```text
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
```

Comment: Ignore malformed legacy JSON and keep safe defaults for that save field.

### Line 91

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 92

```text

```

Blank line separates related logic for readability.

### Line 93

```text
    try {
```

Creates an error boundary so malformed storage or unavailable browser APIs do not destroy usable local progress.

### Line 94

```text
      xpSave = JSON.parse(storage.getItem('casino_hub_xp') || '{}');
```

Parses old XP/level JSON separately so one corrupt legacy key does not erase the other.

### Line 95

```text
    } catch (error) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 96

```text
      // Ignore malformed legacy JSON and keep safe defaults for that save field.
```

Comment: Ignore malformed legacy JSON and keep safe defaults for that save field.

### Line 97

```text
    }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 98

```text

```

Blank line separates related logic for readability.

### Line 99

```text
    this.balance = Player.numberOr(balanceSave.balance, this.balance, 0);
```

Validates the old balance before putting it into memory.

### Line 100

```text
    this.level = Math.max(1, Math.floor(Player.numberOr(xpSave.level, this.level, 1)));
```

Floors legacy level and keeps it at least 1.

### Line 101

```text
    this.xp = Player.numberOr(xpSave.xp, this.xp, 0);
```

Stores the xp runtime reference/state on this manager so later save operations can reuse it.

### Line 102

```text
    this.debt = Player.numberOr(storage.getItem('casino_hub_debt'), this.debt, 0);
```

Stores the debt runtime reference/state on this manager so later save operations can reuse it.

### Line 103

```text
    this.lastSpinTime = Player.numberOr(storage.getItem('casino_hub_wheel'), this.lastSpinTime, 0);
```

Stores the lastSpinTime runtime reference/state on this manager so later save operations can reuse it.

### Line 104

```text
    this.creditLimit = Player.numberOr(
```

Stores the creditLimit runtime reference/state on this manager so later save operations can reuse it.

### Line 105

```text
      storage.getItem('casino_hub_credit_limit'),
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 106

```text
      this.creditLimit,
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 107

```text
      0
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 108

```text
    );
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 109

```text
    this.maxBet = Player.numberOr(storage.getItem('casino_hub_max_bet'), this._maxBet, 100);
```

Requires legacy max bet to be at least 100, matching the established betting floor.

### Line 110

```text
    return this;
```

Returns this object instance to the caller and exits this function.

### Line 111

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 112

```text

```

Blank line separates related logic for readability.

### Line 113

```text
  /** Preserve the established guest-save keys and data formats. */
```

Documents preservation of the old guest key names/formats during migration.

### Line 114

```text
  saveLocalState(storage = window.localStorage) {
```

Reads or writes browser-local storage; this is origin-local and not a server backup.

### Line 115

```text
    storage.setItem('casino_hub_player', JSON.stringify({ balance: this.balance }));
```

Serializes only balance into the old player key.

### Line 116

```text
    storage.setItem('casino_hub_xp', JSON.stringify({ level: this.level, xp: this.xp }));
```

Serializes level and XP into the old XP key.

### Line 117

```text
    storage.setItem('casino_hub_debt', String(this.debt));
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 118

```text
    storage.setItem('casino_hub_wheel', String(this.lastSpinTime));
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 119

```text
    storage.setItem('casino_hub_credit_limit', String(this.creditLimit));
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 120

```text
    storage.setItem('casino_hub_max_bet', String(this._maxBet));
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 121

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 122

```text

```

Blank line separates related logic for readability.

### Line 123

```text
  /** Accept only finite numbers above the caller-provided floor; malformed saved values fall back safely. */
```

Defines numeric validation used throughout Player: finite numbers must meet the requested floor.

### Line 124

```text
  static numberOr(value, fallback, minimum) {
```

Carries out the surrounding save/profile operation while preserving the module’s validation and local-only boundary.

### Line 125

```text
    if (value === null || value === undefined || value === '') return fallback;
```

Guards the following operation so invalid, missing, or unsafe state is not applied.

### Line 126

```text
    const number = Number(value);
```

Defines number for use by the surrounding persistence logic.

### Line 127

```text
    return Number.isFinite(number) && number >= minimum ? number : fallback;
```

Returns the parsed number only when finite and above the minimum; otherwise returns the safe fallback.

### Line 128

```text
  }
```

Closes the surrounding block or literal; no independent data transformation occurs here.

### Line 129

```text
}
```

Closes the surrounding block or literal; no independent data transformation occurs here.
