# tests/profile-durability.test.js

[Exact copy](../../original/tests/profile-durability.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 2

```text
const fs = require('node:fs');
```

This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.

### Line 3

```text
const path = require('node:path');
```

This imports node:path so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 7

```text
function manager() {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 8

```text
  const storage = {};
```

An object with fields ; stores the result in `storage`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
  const context = { window: {}, document: { getElementById: () => null }, localStorage: {
```

An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; localStorage: an object with fields getItem: a callback taking key that uses the entry at index/key `key` (key) in `storage` (storage) unless it is null or undefined, then falls back to null; setItem: a callback taking key, value that runs its enclosed statements; removeItem: a callback taking key that removes the object property the entry at index/key `key` (key) in `storage` (storage); crypto: an object with fields ; console: `console` (console); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
    getItem: key => storage[key] ?? null,
```

Defines field getItem as a callback taking key that uses the entry at index/key `key` (key) in `storage` (storage) unless it is null or undefined, then falls back to null.

### Line 11

```text
    setItem: (key, value) => { if (storage.fail) throw new Error('quota'); storage[key] = String(value); },
```

Throws constructs a new instance of `Error` with "quota"; normal execution stops until a matching catch handles it.

### Line 12

```text
    removeItem: key => delete storage[key]
```

Defines field removeItem as a callback taking key that removes the object property the entry at index/key `key` (key) in `storage` (storage).

### Line 13

```text
  }, crypto: {}, console };
```

Defines field crypto as an object with fields .

### Line 14

```text
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 15

```text
  const instance = Object.create(context.window.LocalProfileManager.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 16

```text
  instance.database = { profiles: [{ id: 'p', iv: 'old-iv', ciphertext: 'old-cipher' }] };
```

Sets `instance.database` (the database property of instance) to an object with fields profiles: an array containing an object with fields id: "p"; iv: "old-iv"; ciphertext: "old-cipher".

### Line 17

```text
  instance.activeProfile = instance.database.profiles[0]; instance.activeKey = {};
```

Sets `instance.activeProfile` (the active profile property of instance) to the entry at index/key 0 in `instance.database.profiles` (the profiles property of instance.database).

### Line 18

```text
  instance.currentSave = { player: { balance: 10 }, revision: 4, updatedAt: null };
```

Sets `instance.currentSave` (the current save property of instance) to an object with fields player: an object with fields balance: 10; revision: 4; updatedAt: null.

### Line 19

```text
  instance.saveQueue = Promise.resolve(true);
```

Sets `instance.saveQueue` (the save queue property of instance) to calls `Promise.resolve` with true.

### Line 20

```text
  instance.normalizeSave = value => value;
```

Sets `instance.normalizeSave` (the normalize save property of instance) to a callback taking value that `value` (value).

### Line 21

```text
  instance.encryptSave = async () => ({ iv: 'new-iv', ciphertext: 'new-cipher' });
```

Sets `instance.encryptSave` (the encrypt save property of instance) to a callback taking no parameters that an object with fields iv: "new-iv"; ciphertext: "new-cipher".

### Line 22

```text
  instance.writeDatabase = () => !storage.fail;
```

Sets `instance.writeDatabase` (the write database property of instance) to a callback taking no parameters that negates the truthiness of `storage.fail` (the fail property of storage).

### Line 23

```text
  return { instance, storage };
```

Returns an object with fields instance: `instance` (instance); storage: `storage` (storage) to the caller and exits this function.

### Line 24

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 25

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 26

```text
test('failed encrypted save restores current model and ciphertext for retry', async () => {
```

This test names the behavior under protection: failed encrypted save restores current model and ciphertext for retry.

### Line 27

```text
  const { instance, storage } = manager();
```

Calls `manager` with no arguments; stores the result in `{ instance, storage }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 28

```text
  storage.fail = true;
```

Sets `storage.fail` (the fail property of storage) to true.

### Line 29

```text
  assert.equal(await instance.saveCurrent({ player: { balance: 20 } }), false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({ player: { balance: 20 } }), false)`; it requires that virtual-money and wager rule to match exactly.

### Line 30

```text
  assert.equal(instance.currentSave.player.balance, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 31

```text
  assert.equal(instance.activeProfile.iv, 'old-iv');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.iv, 'old-iv')`; it requires that durable save/recovery rule to match exactly.

### Line 32

```text
  assert.equal(instance.activeProfile.ciphertext, 'old-cipher');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.ciphertext, 'old-cipher')`; it requires that durable save/recovery rule to match exactly.

### Line 33

```text
  delete storage.fail;
```

Removes the object property `storage.fail` (the fail property of storage).

### Line 34

```text
  assert.equal(await instance.saveCurrent({ player: { balance: 30 } }), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({ player: { balance: 30 } }), true)`; it requires that virtual-money and wager rule to match exactly.

### Line 35

```text
  assert.equal(instance.currentSave.player.balance, 30);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 30)`; it requires that virtual-money and wager rule to match exactly.

### Line 36

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 37

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 38

```text
test('save queue serializes writes and does not leave rejected promises', async () => {
```

This test names the behavior under protection: save queue serializes writes and does not leave rejected promises.

### Line 39

```text
  const { instance } = manager(); let order = [];
```

Calls `manager` with no arguments; stores the result in `{ instance }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 40

```text
  instance.encryptSave = async (_p, _k, save) => { order.push(save.player.balance); return { iv: String(save.player.balance), ciphertext: String(save.player.balance) }; };
```

Returns an object with fields iv: converts `save.player.balance` (the balance property of save.player) to text; ciphertext: converts `save.player.balance` (the balance property of save.player) to text to the caller and exits this function.

### Line 41

```text
  assert.equal(await Promise.all([instance.saveCurrent({ player: { balance: 11 } }), instance.saveCurrent({ player: { balance: 12 } })]).then(values => values.every(Boolean)), true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await Promise.all([instance.saveCurrent({ player: { balance: 11 } }), instance.saveCurrent({ player: { balance: 12 } })]).then(values => values.every(Boolean)), true)`; it requires that virtual-money and wager rule to match exactly.

### Line 42

```text
  assert.deepEqual(order, [11, 12]);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(order, [11, 12])`; it requires that observable game or persistence rule to match exactly.

### Line 43

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 44

```text
test('a successful queued partial save cannot resurrect a failed wallet write', async () => {
```

This test names the behavior under protection: a successful queued partial save cannot resurrect a failed wallet write.

### Line 45

```text
  const { instance } = manager();
```

Calls `manager` with no arguments; stores the result in `{ instance }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 46

```text
  let writes = 0;
```

0; stores the result in `writes`. let allows the binding to be reassigned.

### Line 47

```text
  const encrypted = [];
```

An array containing ; stores the result in `encrypted`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 48

```text
  instance.writeDatabase = () => ++writes > 1;
```

Sets `instance.writeDatabase` (the write database property of instance) to a callback taking no parameters that checks whether increases `writes` (writes) by 1 is greater than 1.

### Line 49

```text
  instance.encryptSave = async (_profile, _key, save) => {
```

Sets `instance.encryptSave` (the encrypt save property of instance) to a callback taking _profile, _key, save that runs its enclosed statements.

### Line 50

```text
    encrypted.push(JSON.parse(JSON.stringify(save)));
```

Appends decodes JSON text encodes `save` (save) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error to `encrypted` (encrypted).

### Line 51

```text
    return { iv: String(save.player.balance), ciphertext: JSON.stringify(save) };
```

Returns an object with fields iv: converts `save.player.balance` (the balance property of save.player) to text; ciphertext: encodes `save` (save) as JSON text for storage or transport to the caller and exits this function.

### Line 52

```text
  };
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 53

```text
  const wallet = instance.saveCurrent({ player: { balance: 20 } });
```

Calls `instance.saveCurrent` with an object with fields player: an object with fields balance: 20; stores the result in `wallet`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 54

```text
  const milestone = instance.saveCurrent({ accomplishments: { stats: { games: 1 } } });
```

Calls `instance.saveCurrent` with an object with fields accomplishments: an object with fields stats: an object with fields games: 1; stores the result in `milestone`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 55

```text
  assert.deepEqual(await Promise.all([wallet, milestone]), [false, true]);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(await Promise.all([wallet, milestone]), [false, true])`; it requires that observable game or persistence rule to match exactly.

### Line 56

```text
  assert.equal(encrypted[1].player.balance, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(encrypted[1].player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 57

```text
  assert.equal(instance.currentSave.player.balance, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 58

```text
  assert.equal(instance.currentSave.accomplishments.stats.games, 1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.accomplishments.stats.games, 1)`; it requires that durable save/recovery rule to match exactly.

### Line 59

```text
  assert.equal(JSON.parse(instance.activeProfile.ciphertext).player.balance, 10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.parse(instance.activeProfile.ciphertext).player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.

### Line 60

```text
  assert.equal(instance.currentSave.revision, 6);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.revision, 6)`; it requires that durable save/recovery rule to match exactly.

### Line 61

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 62

```text
test('chained failed writes return to the last durable snapshot', async () => {
```

This test names the behavior under protection: chained failed writes return to the last durable snapshot.

### Line 63

```text
  const { instance, storage } = manager(); storage.fail = true;
```

Calls `manager` with no arguments; stores the result in `{ instance, storage }`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 64

```text
  assert.deepEqual(await Promise.all([instance.saveCurrent({player:{balance:20}}),instance.saveCurrent({player:{balance:30}})]),[false,false]);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(await Promise.all([instance.saveCurrent({player:{balance:20}}),instance.saveCurrent({player:{balance:30}})]),[false,false])`; it requires that virtual-money and wager rule to match exactly.

### Line 65

```text
  assert.equal(instance.currentSave.player.balance,10);assert.equal(instance.activeProfile.iv,'old-iv');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance,10)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.iv,'old-iv')`; it requires that durable save/recovery rule to match exactly.

### Line 66

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 67

```text
test('recovering a newer revision continues monotonically', async () => {
```

This test names the behavior under protection: recovering a newer revision continues monotonically.

### Line 68

```text
  const { instance } = manager();assert.equal(await instance.saveCurrent({revision:200,player:{balance:20}}),true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({revision:200,player:{balance:20}}),true)`; it requires that virtual-money and wager rule to match exactly.

### Line 69

```text
  assert.equal(instance.currentSave.revision,201);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.revision,201)`; it requires that durable save/recovery rule to match exactly.

### Line 70

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 71

```text
test('real AES-GCM profile encryption preserves Money Green and bonus state without plaintext storage', async () => {
```

This test names the behavior under protection: real AES-GCM profile encryption preserves Money Green and bonus state without plaintext storage.

### Line 72

```text
  const crypto = require('node:crypto').webcrypto;
```

This imports node:crypto so the test exercises the real game/persistence API rather than a duplicate.

### Line 73

```text
  const context = {window:{},document:{getElementById:()=>null},crypto,TextEncoder,TextDecoder,btoa,atob,console};
```

An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; crypto: `crypto` (crypto); TextEncoder: `TextEncoder` (text encoder); TextDecoder: `TextDecoder` (text decoder); btoa: `btoa` (btoa); and further fields; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 74

```text
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../src/js/profiles.js'),'utf8'),context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 75

```text
  const profileManager=Object.create(context.window.LocalProfileManager.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 76

```text
  const profile={id:'qa-encryption',name:'Local QA'};
```

An object with fields id: "qa-encryption"; name: "Local QA"; stores the result in `profile`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 77

```text
  const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
```

Waits for calls `crypto.subtle.generateKey` with an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to finish before continuing; rejection throws into surrounding error handling; stores the result in `key`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 78

```text
  const value={player:{balance:43.27,maxBet:1600},settings:{theme:'money'},slotBonuses:{table:{freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]}}}};
```

An object with fields player: an object with fields balance: 43.27; maxBet: 1600; settings: an object with fields theme: "money"; slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: 4; lockedStake: 10; bonusTotalWin: 22.5; stickyWildsGrid: calls `Array.from` with an object with fields length: 5; a callback taking no parameters that `[false,true,false]`; lastResult: an object with fields status: "settled"; stake: 0; payout: 12.5; lines: an array containing ; stores the result in `value`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 79

```text
  const sealed=await profileManager.encryptSave(profile,key,value);
```

Waits for calls `profileManager.encryptSave` with `profile` (profile); `key` (key); `value` (value) to finish before continuing; rejection throws into surrounding error handling; stores the result in `sealed`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 80

```text
  assert.equal(JSON.stringify(sealed).includes('freeSpinsRemaining'),false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.stringify(sealed).includes('freeSpinsRemaining'),false)`; it requires that profile bonus/achievement rule to match exactly.

### Line 81

```text
  const recovered=await profileManager.decryptSave({...profile,...sealed},key);
```

Waits for calls `profileManager.decryptSave` with an object with fields copied from `profile` (profile); copied from `sealed` (sealed); `key` (key) to finish before continuing; rejection throws into surrounding error handling; stores the result in `recovered`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 82

```text
  assert.equal(recovered.player.balance,43.27);assert.equal(recovered.player.maxBet,1600);assert.equal(recovered.settings.theme,'money');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.player.balance,43.27)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.player.maxBet,1600)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly.

### Line 83

```text
  assert.equal(recovered.slotBonuses.table.freeSpinsRemaining,4);assert.equal(recovered.slotBonuses.table.stickyWildsGrid[0][1],true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.slotBonuses.table.freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.slotBonuses.table.stickyWildsGrid[0][1],true)`; it requires that profile bonus/achievement rule to match exactly.

### Line 84

```text
  const wrongKey=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
```

Waits for calls `crypto.subtle.generateKey` with an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to finish before continuing; rejection throws into surrounding error handling; stores the result in `wrongKey`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 85

```text
  await assert.rejects(()=>profileManager.decryptSave({...profile,...sealed},wrongKey));
```

This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.

### Line 86

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
