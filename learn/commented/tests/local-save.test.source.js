// Original L1: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L2: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L3: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L4: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L5: A callback taking value that decodes JSON text encodes `value` (value) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error; stores the result in `clone`. const prevents reassignment of this binding, not mutation inside its object/array.
const clone = value => JSON.parse(JSON.stringify(value));
// Original L6: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function fixture() {
// Original L7: Constructs a new instance of `Map` with no arguments; stores the result in `storage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const storage = new Map(); let fail = false, confirmResult = true, confirmations = 0, encryptionInput;
// Original L8: An object with fields player: an object with fields balance: 100; maxBet: 100; settings: an object with fields volume: 80; isMuted: false; theme: "money"; jackpot: 10000; raceBet: null; raceResultNotice: null; raceExperience: null; and further fields; stores the result in `current`. let allows the binding to be reassigned.
  let current = {player:{balance:100,maxBet:100},settings:{volume:80,isMuted:false,theme:'money'},jackpot:10000,raceBet:null,raceResultNotice:null,raceExperience:null,slotBonuses:{},accomplishments:{},revision:4,updatedAt:'2026-10-18T01:00:00.000Z'};
// Original L9: An object with fields getItem: a callback taking key that uses calls `storage.get` with `key` (key) unless it is null or undefined, then falls back to null; setItem: a callback taking key, value that runs its enclosed statements; removeItem: a callback taking key that calls `storage.delete` with `key` (key); stores the result in `localStorage`. const prevents reassignment of this binding, not mutation inside its object/array.
  const localStorage = {getItem:key=>storage.get(key)??null,setItem:(key,value)=>{if(fail)throw Error('quota');storage.set(key,value);},removeItem:key=>storage.delete(key)};
// Original L10: An object with fields activeProfile: an object with fields id: "profile-a"; name: "QA"; activeKey: an object with fields ; getCurrentSave: a callback taking no parameters that calls `clone` with `current` (current); normalizeSave: a callback taking value that an object with fields copied from calls `clone` with `current` (current); copied from calls `clone` with `value` (value); flushSave: a callback taking no parameters that true; encryptSave: a callback taking _p, _k, value that runs its enclosed statements; and further fields; stores the result in `profiles`. const prevents reassignment of this binding, not mutation inside its object/array.
  const profiles = {activeProfile:{id:'profile-a',name:'QA'},activeKey:{},getCurrentSave:()=>clone(current),normalizeSave:value=>({...clone(current),...clone(value)}),flushSave:async()=>true,encryptSave:async(_p,_k,value)=>{encryptionInput=clone(value);return {iv:'random-iv',ciphertext:'encrypted-previous-save'};},decryptSave:async()=>clone(encryptionInput),saveCurrent:async value=>{if(fail)return false;current={...clone(value),revision:Math.max(current.revision,value.revision||0)+1};return true;}};
// Original L11: An object with fields window: an object with fields LocalProfiles: `profiles` (profiles); document: an object with fields getElementById: a callback taking no parameters that null; addEventListener: a callback taking no parameters that runs its enclosed statements; localStorage: `localStorage` (local storage); confirm: a callback taking no parameters that runs its enclosed statements; alert: a callback taking no parameters that runs its enclosed statements; Player: an object with fields numberOr: a callback taking v, f, min=0 that checks uses `Number(v)>=min` only if `v!=null&&Number.isFinite(Number(v))` is truthy; otherwise keeps the falsy first value; if true chooses converts `v` (v) to a number (invalid numeric text becomes NaN), otherwise `f` (f); fromProfile: a callback taking value that an object with fields copied from `value` (value); toProfile: a callback taking no parameters that `clone(value)`; and further fields; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context={window:{LocalProfiles:profiles},document:{getElementById:()=>null,addEventListener(){}},localStorage,confirm:()=>{confirmations++;return confirmResult;},alert(){},Player:{numberOr:(v,f,min=0)=>v!=null&&Number.isFinite(Number(v))&&Number(v)>=min?Number(v):f,fromProfile:value=>({...value,toProfile:()=>clone(value)})},console};
// Original L12: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/local-save.js'),'utf8'),context);
// Original L13: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const manager=Object.create(context.window.LocalSaveManager.prototype);
// Original L14: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  Object.assign(manager,{fileHandle:null,fileWriteQueue:Promise.resolve(true),lastLinkedBytes:null,lastLinkedRevision:null,status:{dataset:{},textContent:''},hub:{player:{...current.player,toProfile:()=>clone(current.player)},updateGlobalUI(){}},settings:{getSettings:()=>clone(current.settings),applySettings(){}},jackpot:{currentJackpot:10000,setJackpot(){}},showSplash(){},refreshLegacyRecoveryOption(){}});
// Original L15: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
  function fileHandle(value) {
// Original L16: Checks checks that gets the JavaScript type name of `value` (value) and "string" have the same value and type; if true chooses `value` (value), otherwise encodes `value` (value) as JSON text for storage or transport; stores the result in `bytes`. let allows the binding to be reassigned.
    let bytes=typeof value==='string'?value:JSON.stringify(value);let writes=0;
// Original L17: Returns an object with fields name: "qa.json"; queryPermission: a callback taking no parameters that "granted"; getFile: a callback taking no parameters that an object with fields size: `bytes.length` (the length property of bytes); text: a callback taking no parameters that `bytes` (bytes); createWritable: a callback taking no parameters that an object with fields write: a callback taking text that runs its enclosed statements; close: a callback taking no parameters that runs its enclosed statements; bytes: a callback taking no parameters that runs its enclosed statements; bytes: a callback taking value that runs its enclosed statements; and further fields to the caller and exits this function.
    return {name:'qa.json',queryPermission:async()=> 'granted',getFile:async()=>({size:bytes.length,text:async()=>bytes}),createWritable:async()=>({write:async text=>{writes++;bytes=text;},close:async()=>{}}),get bytes(){return bytes;},set bytes(value){bytes=value;},get writes(){return writes;}};
// Original L18: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L19: Returns an object with fields manager: `manager` (manager); profiles: `profiles` (profiles); storage: `storage` (storage); context: `context` (context); fileHandle: `fileHandle` (file handle); current: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.
  return {manager,profiles,storage,context,fileHandle,get current(){return current;},get encryptionInput(){return encryptionInput;},get confirmations(){return confirmations;},setConfirm:value=>{confirmResult=value;},setFail:value=>{fail=value;}};
// Original L20: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L21: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function portable(f, partial={}){return {...f.manager.createSave(),...partial};}
// Original L22: Blank line separates test setup from the next scenario for readability.

// Original L23: This test names the behavior under protection: stale, mismatched, and legacy linked files stay untouched even after later autosave.
test('stale, mismatched, and legacy linked files stay untouched even after later autosave',async()=>{
// Original L24: This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.
  for(const partial of [{revision:1},{profileId:'profile-b'},{schemaVersion:1},{revision:99,updatedAt:'2020-01-01T00:00:00.000Z'}]){
// Original L25: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
    const f=fixture();const file=f.fileHandle(portable(f,partial));const original=file.bytes;
// Original L26: Sets `f.manager.readStoredHandle` (the read stored handle property of f.manager) to a callback taking no parameters that `file` (file).
    f.manager.readStoredHandle=async()=>file;
// Original L27: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly.
    await f.manager.initialize();assert.equal(f.manager.fileHandle,null);assert.equal(f.current.player.balance,100);
// Original L28: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.bytes,original)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.confirmations,0)`; it requires that observable game or persistence rule to match exactly.
    assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,original);assert.equal(file.writes,0);assert.equal(f.confirmations,0);
// Original L29: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'warning')`; it requires that player-facing UI guardrail to match exactly.
    assert.equal(f.manager.status.dataset.state,'warning');
// Original L30: This closes the test/helper block containing the setup and its behavior checks.
  }
// Original L31: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L32: Blank line separates test setup from the next scenario for readability.

// Original L33: This test names the behavior under protection: same-revision bonus divergence prompts; declining keeps both copies and pauses file saves.
test('same-revision bonus divergence prompts; declining keeps both copies and pauses file saves',async()=>{
// Original L34: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture();f.setConfirm(false);const file=f.fileHandle(portable(f,{slotBonuses:{'bonus-table':{freeSpinsRemaining:5}}}));
// Original L35: Sets `f.manager.readStoredHandle` (the read stored handle property of f.manager) to a callback taking no parameters that `file` (file).
  f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
// Original L36: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.confirmations,1)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(f.confirmations,1);assert.equal(f.manager.fileHandle,null);assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.writes,0);
// Original L37: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L38: Blank line separates test setup from the next scenario for readability.

// Original L39: This test names the behavior under protection: accepting a newer linked save encrypts the previous browser progress, not incoming progress.
test('accepting a newer linked save encrypts the previous browser progress, not incoming progress',async()=>{
// Original L40: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture();const incoming=portable(f,{revision:10,updatedAt:'2026-10-18T02:00:00.000Z',player:{balance:777,maxBet:100}});
// Original L41: Calls `f.fileHandle` with `incoming` (incoming); stores the result in `file`. const prevents reassignment of this binding, not mutation inside its object/array.
  const file=f.fileHandle(incoming);f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
// Original L42: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,777)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.encryptionInput.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  assert.equal(f.current.player.balance,777);assert.equal(f.encryptionInput.player.balance,100);assert.ok(f.current.revision>10);
// Original L43: Decodes JSON text calls `f.storage.get` with calls `f.manager.recoveryKey` with no arguments into JavaScript data; malformed JSON throws an error; stores the result in `recovery`. const prevents reassignment of this binding, not mutation inside its object/array.
  const recovery=JSON.parse(f.storage.get(f.manager.recoveryKey()));
// Original L44: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovery.ciphertext,'encrypted-previous-save')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovery.profileId,'profile-a')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal('player' in recovery,false)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(recovery.ciphertext,'encrypted-previous-save');assert.equal(recovery.profileId,'profile-a');assert.equal('player' in recovery,false);
// Original L45: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,file)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(f.manager.fileHandle,file);assert.equal(file.writes,0);
// Original L46: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.parse(file.bytes).player.balance,777)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(JSON.parse(file.bytes).player.balance,777);
// Original L47: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L48: Blank line separates test setup from the next scenario for readability.

// Original L49: This test names the behavior under protection: recovery quota failure and browser-save failure never replace live progress or prior recovery.
test('recovery quota failure and browser-save failure never replace live progress or prior recovery',async()=>{
// Original L50: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture();f.storage.set(f.manager.recoveryKey(),'previous-recovery');f.setFail(true);
// Original L51: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery')`; it requires that durable save/recovery rule to match exactly.
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
// Original L52: Calls `f.setFail` with false.
  f.setFail(false);f.profiles.saveCurrent=async()=>false;
// Original L53: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery')`; it requires that durable save/recovery rule to match exactly.
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
// Original L54: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L55: Blank line separates test setup from the next scenario for readability.

// Original L56: This test names the behavior under protection: external file modification pauses writes and queued write failures resolve false.
test('external file modification pauses writes and queued write failures resolve false',async()=>{
// Original L57: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture();const file=f.fileHandle(portable(f));f.manager.fileHandle=file;f.manager.lastLinkedBytes=file.bytes;file.bytes='external-edit';
// Original L58: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.bytes,'external-edit')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,'external-edit');assert.equal(file.writes,0);assert.equal(f.manager.fileHandle,null);
// Original L59: Calls `f.fileHandle` with ""; stores the result in `broken`. const prevents reassignment of this binding, not mutation inside its object/array.
  const broken=f.fileHandle('');broken.createWritable=async()=>{throw Error('disk full');};f.manager.fileHandle=broken;f.manager.lastLinkedBytes='';
// Original L60: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'warning')`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(f.manager.status.dataset.state,'warning');assert.equal(f.manager.fileHandle,null);
// Original L61: Calls `f.fileHandle` with ""; stores the result in `good`. const prevents reassignment of this binding, not mutation inside its object/array.
  const good=f.fileHandle('');f.manager.fileHandle=good;f.manager.lastLinkedBytes='';
// Original L62: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(good.writes,1)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(good.writes,1);
// Original L63: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L64: Blank line separates test setup from the next scenario for readability.

// Original L65: This test names the behavior under protection: new empty file linking succeeds only after handle persistence and a confirmed write.
test('new empty file linking succeeds only after handle persistence and a confirmed write',async()=>{
// Original L66: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture();const file=f.fileHandle('');f.context.window.showSaveFilePicker=async()=>file;f.manager.storeHandle=async()=>true;
// Original L67: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.linkFile(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,1)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'linked')`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(await f.manager.linkFile(),true);assert.equal(file.writes,1);assert.equal(f.manager.status.dataset.state,'linked');
// Original L68: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L69: Blank line separates test setup from the next scenario for readability.

// Original L70: This test names the behavior under protection: portable saves retain Money Green and all optional progress maps.
test('portable saves retain Money Green and all optional progress maps',()=>{
// Original L71: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(saved.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly.
  const f=fixture();const saved=f.manager.createSave();assert.equal(saved.settings.theme,'money');
// Original L72: Calls `f.manager.parseSave` with encodes an object with fields copied from `saved` (saved); slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: 4; accomplishments: an object with fields stats: an object with fields games: 5 as JSON text for storage or transport; stores the result in `parsed`. const prevents reassignment of this binding, not mutation inside its object/array.
  const parsed=f.manager.parseSave(JSON.stringify({...saved,slotBonuses:{table:{freeSpinsRemaining:4}},accomplishments:{stats:{games:5}}}));
// Original L73: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(parsed.slotBonuses.table.freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(parsed.accomplishments.stats.games,5)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(parsed.slotBonuses.table.freeSpinsRemaining,4);assert.equal(parsed.accomplishments.stats.games,5);
// Original L74: This closes the test/helper block containing the setup and its behavior checks.
});
