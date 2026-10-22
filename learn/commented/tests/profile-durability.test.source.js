// Original L1: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L2: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L3: This imports node:path so the test exercises the real game/persistence API rather than a duplicate.
const path = require('node:path');
// Original L4: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L5: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L6: Blank line separates test setup from the next scenario for readability.

// Original L7: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function manager() {
// Original L8: An object with fields ; stores the result in `storage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const storage = {};
// Original L9: An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; localStorage: an object with fields getItem: a callback taking key that uses the entry at index/key `key` (key) in `storage` (storage) unless it is null or undefined, then falls back to null; setItem: a callback taking key, value that runs its enclosed statements; removeItem: a callback taking key that removes the object property the entry at index/key `key` (key) in `storage` (storage); crypto: an object with fields ; console: `console` (console); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context = { window: {}, document: { getElementById: () => null }, localStorage: {
// Original L10: Defines field getItem as a callback taking key that uses the entry at index/key `key` (key) in `storage` (storage) unless it is null or undefined, then falls back to null.
    getItem: key => storage[key] ?? null,
// Original L11: Throws constructs a new instance of `Error` with "quota"; normal execution stops until a matching catch handles it.
    setItem: (key, value) => { if (storage.fail) throw new Error('quota'); storage[key] = String(value); },
// Original L12: Defines field removeItem as a callback taking key that removes the object property the entry at index/key `key` (key) in `storage` (storage).
    removeItem: key => delete storage[key]
// Original L13: Defines field crypto as an object with fields .
  }, crypto: {}, console };
// Original L14: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
// Original L15: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const instance = Object.create(context.window.LocalProfileManager.prototype);
// Original L16: Sets `instance.database` (the database property of instance) to an object with fields profiles: an array containing an object with fields id: "p"; iv: "old-iv"; ciphertext: "old-cipher".
  instance.database = { profiles: [{ id: 'p', iv: 'old-iv', ciphertext: 'old-cipher' }] };
// Original L17: Sets `instance.activeProfile` (the active profile property of instance) to the entry at index/key 0 in `instance.database.profiles` (the profiles property of instance.database).
  instance.activeProfile = instance.database.profiles[0]; instance.activeKey = {};
// Original L18: Sets `instance.currentSave` (the current save property of instance) to an object with fields player: an object with fields balance: 10; revision: 4; updatedAt: null.
  instance.currentSave = { player: { balance: 10 }, revision: 4, updatedAt: null };
// Original L19: Sets `instance.saveQueue` (the save queue property of instance) to calls `Promise.resolve` with true.
  instance.saveQueue = Promise.resolve(true);
// Original L20: Sets `instance.normalizeSave` (the normalize save property of instance) to a callback taking value that `value` (value).
  instance.normalizeSave = value => value;
// Original L21: Sets `instance.encryptSave` (the encrypt save property of instance) to a callback taking no parameters that an object with fields iv: "new-iv"; ciphertext: "new-cipher".
  instance.encryptSave = async () => ({ iv: 'new-iv', ciphertext: 'new-cipher' });
// Original L22: Sets `instance.writeDatabase` (the write database property of instance) to a callback taking no parameters that negates the truthiness of `storage.fail` (the fail property of storage).
  instance.writeDatabase = () => !storage.fail;
// Original L23: Returns an object with fields instance: `instance` (instance); storage: `storage` (storage) to the caller and exits this function.
  return { instance, storage };
// Original L24: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L25: Blank line separates test setup from the next scenario for readability.

// Original L26: This test names the behavior under protection: failed encrypted save restores current model and ciphertext for retry.
test('failed encrypted save restores current model and ciphertext for retry', async () => {
// Original L27: Calls `manager` with no arguments; stores the result in `{ instance, storage }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { instance, storage } = manager();
// Original L28: Sets `storage.fail` (the fail property of storage) to true.
  storage.fail = true;
// Original L29: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({ player: { balance: 20 } }), false)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(await instance.saveCurrent({ player: { balance: 20 } }), false);
// Original L30: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(instance.currentSave.player.balance, 10);
// Original L31: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.iv, 'old-iv')`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.activeProfile.iv, 'old-iv');
// Original L32: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.ciphertext, 'old-cipher')`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.activeProfile.ciphertext, 'old-cipher');
// Original L33: Removes the object property `storage.fail` (the fail property of storage).
  delete storage.fail;
// Original L34: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({ player: { balance: 30 } }), true)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(await instance.saveCurrent({ player: { balance: 30 } }), true);
// Original L35: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 30)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(instance.currentSave.player.balance, 30);
// Original L36: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L37: Blank line separates test setup from the next scenario for readability.

// Original L38: This test names the behavior under protection: save queue serializes writes and does not leave rejected promises.
test('save queue serializes writes and does not leave rejected promises', async () => {
// Original L39: Calls `manager` with no arguments; stores the result in `{ instance }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { instance } = manager(); let order = [];
// Original L40: Returns an object with fields iv: converts `save.player.balance` (the balance property of save.player) to text; ciphertext: converts `save.player.balance` (the balance property of save.player) to text to the caller and exits this function.
  instance.encryptSave = async (_p, _k, save) => { order.push(save.player.balance); return { iv: String(save.player.balance), ciphertext: String(save.player.balance) }; };
// Original L41: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await Promise.all([instance.saveCurrent({ player: { balance: 11 } }), instance.saveCurrent({ player: { balance: 12 } })]).then(values => values.every(Boolean)), true)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(await Promise.all([instance.saveCurrent({ player: { balance: 11 } }), instance.saveCurrent({ player: { balance: 12 } })]).then(values => values.every(Boolean)), true);
// Original L42: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(order, [11, 12])`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(order, [11, 12]);
// Original L43: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L44: This test names the behavior under protection: a successful queued partial save cannot resurrect a failed wallet write.
test('a successful queued partial save cannot resurrect a failed wallet write', async () => {
// Original L45: Calls `manager` with no arguments; stores the result in `{ instance }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { instance } = manager();
// Original L46: 0; stores the result in `writes`. let allows the binding to be reassigned.
  let writes = 0;
// Original L47: An array containing ; stores the result in `encrypted`. const prevents reassignment of this binding, not mutation inside its object/array.
  const encrypted = [];
// Original L48: Sets `instance.writeDatabase` (the write database property of instance) to a callback taking no parameters that checks whether increases `writes` (writes) by 1 is greater than 1.
  instance.writeDatabase = () => ++writes > 1;
// Original L49: Sets `instance.encryptSave` (the encrypt save property of instance) to a callback taking _profile, _key, save that runs its enclosed statements.
  instance.encryptSave = async (_profile, _key, save) => {
// Original L50: Appends decodes JSON text encodes `save` (save) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error to `encrypted` (encrypted).
    encrypted.push(JSON.parse(JSON.stringify(save)));
// Original L51: Returns an object with fields iv: converts `save.player.balance` (the balance property of save.player) to text; ciphertext: encodes `save` (save) as JSON text for storage or transport to the caller and exits this function.
    return { iv: String(save.player.balance), ciphertext: JSON.stringify(save) };
// Original L52: This closes the test/helper block containing the setup and its behavior checks.
  };
// Original L53: Calls `instance.saveCurrent` with an object with fields player: an object with fields balance: 20; stores the result in `wallet`. const prevents reassignment of this binding, not mutation inside its object/array.
  const wallet = instance.saveCurrent({ player: { balance: 20 } });
// Original L54: Calls `instance.saveCurrent` with an object with fields accomplishments: an object with fields stats: an object with fields games: 1; stores the result in `milestone`. const prevents reassignment of this binding, not mutation inside its object/array.
  const milestone = instance.saveCurrent({ accomplishments: { stats: { games: 1 } } });
// Original L55: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(await Promise.all([wallet, milestone]), [false, true])`; it requires that observable game or persistence rule to match exactly.
  assert.deepEqual(await Promise.all([wallet, milestone]), [false, true]);
// Original L56: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(encrypted[1].player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(encrypted[1].player.balance, 10);
// Original L57: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(instance.currentSave.player.balance, 10);
// Original L58: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.accomplishments.stats.games, 1)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.currentSave.accomplishments.stats.games, 1);
// Original L59: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.parse(instance.activeProfile.ciphertext).player.balance, 10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(JSON.parse(instance.activeProfile.ciphertext).player.balance, 10);
// Original L60: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.revision, 6)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.currentSave.revision, 6);
// Original L61: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L62: This test names the behavior under protection: chained failed writes return to the last durable snapshot.
test('chained failed writes return to the last durable snapshot', async () => {
// Original L63: Calls `manager` with no arguments; stores the result in `{ instance, storage }`. const prevents reassignment of this binding, not mutation inside its object/array.
  const { instance, storage } = manager(); storage.fail = true;
// Original L64: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(await Promise.all([instance.saveCurrent({player:{balance:20}}),instance.saveCurrent({player:{balance:30}})]),[false,false])`; it requires that virtual-money and wager rule to match exactly.
  assert.deepEqual(await Promise.all([instance.saveCurrent({player:{balance:20}}),instance.saveCurrent({player:{balance:30}})]),[false,false]);
// Original L65: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.player.balance,10)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.activeProfile.iv,'old-iv')`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.currentSave.player.balance,10);assert.equal(instance.activeProfile.iv,'old-iv');
// Original L66: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L67: This test names the behavior under protection: recovering a newer revision continues monotonically.
test('recovering a newer revision continues monotonically', async () => {
// Original L68: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await instance.saveCurrent({revision:200,player:{balance:20}}),true)`; it requires that virtual-money and wager rule to match exactly.
  const { instance } = manager();assert.equal(await instance.saveCurrent({revision:200,player:{balance:20}}),true);
// Original L69: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(instance.currentSave.revision,201)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(instance.currentSave.revision,201);
// Original L70: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L71: This test names the behavior under protection: real AES-GCM profile encryption preserves Money Green and bonus state without plaintext storage.
test('real AES-GCM profile encryption preserves Money Green and bonus state without plaintext storage', async () => {
// Original L72: This imports node:crypto so the test exercises the real game/persistence API rather than a duplicate.
  const crypto = require('node:crypto').webcrypto;
// Original L73: An object with fields window: an object with fields ; document: an object with fields getElementById: a callback taking no parameters that null; crypto: `crypto` (crypto); TextEncoder: `TextEncoder` (text encoder); TextDecoder: `TextDecoder` (text decoder); btoa: `btoa` (btoa); and further fields; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context = {window:{},document:{getElementById:()=>null},crypto,TextEncoder,TextDecoder,btoa,atob,console};
// Original L74: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../src/js/profiles.js'),'utf8'),context);
// Original L75: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const profileManager=Object.create(context.window.LocalProfileManager.prototype);
// Original L76: An object with fields id: "qa-encryption"; name: "Local QA"; stores the result in `profile`. const prevents reassignment of this binding, not mutation inside its object/array.
  const profile={id:'qa-encryption',name:'Local QA'};
// Original L77: Waits for calls `crypto.subtle.generateKey` with an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to finish before continuing; rejection throws into surrounding error handling; stores the result in `key`. const prevents reassignment of this binding, not mutation inside its object/array.
  const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
// Original L78: An object with fields player: an object with fields balance: 43.27; maxBet: 1600; settings: an object with fields theme: "money"; slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: 4; lockedStake: 10; bonusTotalWin: 22.5; stickyWildsGrid: calls `Array.from` with an object with fields length: 5; a callback taking no parameters that `[false,true,false]`; lastResult: an object with fields status: "settled"; stake: 0; payout: 12.5; lines: an array containing ; stores the result in `value`. const prevents reassignment of this binding, not mutation inside its object/array.
  const value={player:{balance:43.27,maxBet:1600},settings:{theme:'money'},slotBonuses:{table:{freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]}}}};
// Original L79: Waits for calls `profileManager.encryptSave` with `profile` (profile); `key` (key); `value` (value) to finish before continuing; rejection throws into surrounding error handling; stores the result in `sealed`. const prevents reassignment of this binding, not mutation inside its object/array.
  const sealed=await profileManager.encryptSave(profile,key,value);
// Original L80: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.stringify(sealed).includes('freeSpinsRemaining'),false)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(JSON.stringify(sealed).includes('freeSpinsRemaining'),false);
// Original L81: Waits for calls `profileManager.decryptSave` with an object with fields copied from `profile` (profile); copied from `sealed` (sealed); `key` (key) to finish before continuing; rejection throws into surrounding error handling; stores the result in `recovered`. const prevents reassignment of this binding, not mutation inside its object/array.
  const recovered=await profileManager.decryptSave({...profile,...sealed},key);
// Original L82: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.player.balance,43.27)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.player.maxBet,1600)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(recovered.player.balance,43.27);assert.equal(recovered.player.maxBet,1600);assert.equal(recovered.settings.theme,'money');
// Original L83: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.slotBonuses.table.freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovered.slotBonuses.table.stickyWildsGrid[0][1],true)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(recovered.slotBonuses.table.freeSpinsRemaining,4);assert.equal(recovered.slotBonuses.table.stickyWildsGrid[0][1],true);
// Original L84: Waits for calls `crypto.subtle.generateKey` with an object with fields name: "AES-GCM"; length: 256; false; an array containing "encrypt", "decrypt" to finish before continuing; rejection throws into surrounding error handling; stores the result in `wrongKey`. const prevents reassignment of this binding, not mutation inside its object/array.
  const wrongKey=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
// Original L85: This assertion requires invalid input or a wrong decryption key to fail, so malformed wagers and unreadable profile data cannot be accepted.
  await assert.rejects(()=>profileManager.decryptSave({...profile,...sealed},wrongKey));
// Original L86: This closes the test/helper block containing the setup and its behavior checks.
});
