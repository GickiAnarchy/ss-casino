const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

function manager() {
  const storage = {};
  const context = { window: {}, document: { getElementById: () => null }, localStorage: {
    getItem: key => storage[key] ?? null,
    setItem: (key, value) => { if (storage.fail) throw new Error('quota'); storage[key] = String(value); },
    removeItem: key => delete storage[key]
  }, crypto: {}, console };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../src/js/profiles.js'), 'utf8'), context);
  const instance = Object.create(context.window.LocalProfileManager.prototype);
  instance.database = { profiles: [{ id: 'p', iv: 'old-iv', ciphertext: 'old-cipher' }] };
  instance.activeProfile = instance.database.profiles[0]; instance.activeKey = {};
  instance.currentSave = { player: { balance: 10 }, revision: 4, updatedAt: null };
  instance.saveQueue = Promise.resolve(true);
  instance.normalizeSave = value => value;
  instance.encryptSave = async () => ({ iv: 'new-iv', ciphertext: 'new-cipher' });
  instance.writeDatabase = () => !storage.fail;
  return { instance, storage };
}

test('failed encrypted save restores current model and ciphertext for retry', async () => {
  const { instance, storage } = manager();
  storage.fail = true;
  assert.equal(await instance.saveCurrent({ player: { balance: 20 } }), false);
  assert.equal(instance.currentSave.player.balance, 10);
  assert.equal(instance.activeProfile.iv, 'old-iv');
  assert.equal(instance.activeProfile.ciphertext, 'old-cipher');
  delete storage.fail;
  assert.equal(await instance.saveCurrent({ player: { balance: 30 } }), true);
  assert.equal(instance.currentSave.player.balance, 30);
});

test('save queue serializes writes and does not leave rejected promises', async () => {
  const { instance } = manager(); let order = [];
  instance.encryptSave = async (_p, _k, save) => { order.push(save.player.balance); return { iv: String(save.player.balance), ciphertext: String(save.player.balance) }; };
  assert.equal(await Promise.all([instance.saveCurrent({ player: { balance: 11 } }), instance.saveCurrent({ player: { balance: 12 } })]).then(values => values.every(Boolean)), true);
  assert.deepEqual(order, [11, 12]);
});
test('a successful queued partial save cannot resurrect a failed wallet write', async () => {
  const { instance } = manager();
  let writes = 0;
  const encrypted = [];
  instance.writeDatabase = () => ++writes > 1;
  instance.encryptSave = async (_profile, _key, save) => {
    encrypted.push(JSON.parse(JSON.stringify(save)));
    return { iv: String(save.player.balance), ciphertext: JSON.stringify(save) };
  };
  const wallet = instance.saveCurrent({ player: { balance: 20 } });
  const milestone = instance.saveCurrent({ accomplishments: { stats: { games: 1 } } });
  assert.deepEqual(await Promise.all([wallet, milestone]), [false, true]);
  assert.equal(encrypted[1].player.balance, 10);
  assert.equal(instance.currentSave.player.balance, 10);
  assert.equal(instance.currentSave.accomplishments.stats.games, 1);
  assert.equal(JSON.parse(instance.activeProfile.ciphertext).player.balance, 10);
  assert.equal(instance.currentSave.revision, 6);
});
test('chained failed writes return to the last durable snapshot', async () => {
  const { instance, storage } = manager(); storage.fail = true;
  assert.deepEqual(await Promise.all([instance.saveCurrent({player:{balance:20}}),instance.saveCurrent({player:{balance:30}})]),[false,false]);
  assert.equal(instance.currentSave.player.balance,10);assert.equal(instance.activeProfile.iv,'old-iv');
});
test('recovering a newer revision continues monotonically', async () => {
  const { instance } = manager();assert.equal(await instance.saveCurrent({revision:200,player:{balance:20}}),true);
  assert.equal(instance.currentSave.revision,201);
});
test('real AES-GCM profile encryption preserves Money Green and bonus state without plaintext storage', async () => {
  const crypto = require('node:crypto').webcrypto;
  const context = {window:{},document:{getElementById:()=>null},crypto,TextEncoder,TextDecoder,btoa,atob,console};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../src/js/profiles.js'),'utf8'),context);
  const profileManager=Object.create(context.window.LocalProfileManager.prototype);
  const profile={id:'qa-encryption',name:'Local QA'};
  const key=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  const value={player:{balance:43.27,maxBet:1600},settings:{theme:'money'},slotBonuses:{table:{freeSpinsRemaining:4,lockedStake:10,bonusTotalWin:22.5,stickyWildsGrid:Array.from({length:5},()=>[false,true,false]),lastResult:{status:'settled',stake:0,payout:12.5,lines:[]}}}};
  const sealed=await profileManager.encryptSave(profile,key,value);
  assert.equal(JSON.stringify(sealed).includes('freeSpinsRemaining'),false);
  const recovered=await profileManager.decryptSave({...profile,...sealed},key);
  assert.equal(recovered.player.balance,43.27);assert.equal(recovered.player.maxBet,1600);assert.equal(recovered.settings.theme,'money');
  assert.equal(recovered.slotBonuses.table.freeSpinsRemaining,4);assert.equal(recovered.slotBonuses.table.stickyWildsGrid[0][1],true);
  const wrongKey=await crypto.subtle.generateKey({name:'AES-GCM',length:256},false,['encrypt','decrypt']);
  await assert.rejects(()=>profileManager.decryptSave({...profile,...sealed},wrongKey));
});
