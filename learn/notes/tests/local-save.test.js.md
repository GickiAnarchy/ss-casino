# tests/local-save.test.js

[Exact copy](../../original/tests/local-save.test.source.js)

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
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const clone = value => JSON.parse(JSON.stringify(value));
```

A callback taking value that decodes JSON text encodes `value` (value) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error; stores the result in `clone`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 6

```text
function fixture() {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 7

```text
  const storage = new Map(); let fail = false, confirmResult = true, confirmations = 0, encryptionInput;
```

Constructs a new instance of `Map` with no arguments; stores the result in `storage`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
  let current = {player:{balance:100,maxBet:100},settings:{volume:80,isMuted:false,theme:'money'},jackpot:10000,raceBet:null,raceResultNotice:null,raceExperience:null,slotBonuses:{},accomplishments:{},revision:4,updatedAt:'2026-10-18T01:00:00.000Z'};
```

An object with fields player: an object with fields balance: 100; maxBet: 100; settings: an object with fields volume: 80; isMuted: false; theme: "money"; jackpot: 10000; raceBet: null; raceResultNotice: null; raceExperience: null; and further fields; stores the result in `current`. let allows the binding to be reassigned.

### Line 9

```text
  const localStorage = {getItem:key=>storage.get(key)??null,setItem:(key,value)=>{if(fail)throw Error('quota');storage.set(key,value);},removeItem:key=>storage.delete(key)};
```

An object with fields getItem: a callback taking key that uses calls `storage.get` with `key` (key) unless it is null or undefined, then falls back to null; setItem: a callback taking key, value that runs its enclosed statements; removeItem: a callback taking key that calls `storage.delete` with `key` (key); stores the result in `localStorage`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
  const profiles = {activeProfile:{id:'profile-a',name:'QA'},activeKey:{},getCurrentSave:()=>clone(current),normalizeSave:value=>({...clone(current),...clone(value)}),flushSave:async()=>true,encryptSave:async(_p,_k,value)=>{encryptionInput=clone(value);return {iv:'random-iv',ciphertext:'encrypted-previous-save'};},decryptSave:async()=>clone(encryptionInput),saveCurrent:async value=>{if(fail)return false;current={...clone(value),revision:Math.max(current.revision,value.revision||0)+1};return true;}};
```

An object with fields activeProfile: an object with fields id: "profile-a"; name: "QA"; activeKey: an object with fields ; getCurrentSave: a callback taking no parameters that calls `clone` with `current` (current); normalizeSave: a callback taking value that an object with fields copied from calls `clone` with `current` (current); copied from calls `clone` with `value` (value); flushSave: a callback taking no parameters that true; encryptSave: a callback taking _p, _k, value that runs its enclosed statements; and further fields; stores the result in `profiles`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 11

```text
  const context={window:{LocalProfiles:profiles},document:{getElementById:()=>null,addEventListener(){}},localStorage,confirm:()=>{confirmations++;return confirmResult;},alert(){},Player:{numberOr:(v,f,min=0)=>v!=null&&Number.isFinite(Number(v))&&Number(v)>=min?Number(v):f,fromProfile:value=>({...value,toProfile:()=>clone(value)})},console};
```

An object with fields window: an object with fields LocalProfiles: `profiles` (profiles); document: an object with fields getElementById: a callback taking no parameters that null; addEventListener: a callback taking no parameters that runs its enclosed statements; localStorage: `localStorage` (local storage); confirm: a callback taking no parameters that runs its enclosed statements; alert: a callback taking no parameters that runs its enclosed statements; Player: an object with fields numberOr: a callback taking v, f, min=0 that checks uses `Number(v)>=min` only if `v!=null&&Number.isFinite(Number(v))` is truthy; otherwise keeps the falsy first value; if true chooses converts `v` (v) to a number (invalid numeric text becomes NaN), otherwise `f` (f); fromProfile: a callback taking value that an object with fields copied from `value` (value); toProfile: a callback taking no parameters that `clone(value)`; and further fields; stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 12

```text
  vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/local-save.js'),'utf8'),context);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 13

```text
  const manager=Object.create(context.window.LocalSaveManager.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 14

```text
  Object.assign(manager,{fileHandle:null,fileWriteQueue:Promise.resolve(true),lastLinkedBytes:null,lastLinkedRevision:null,status:{dataset:{},textContent:''},hub:{player:{...current.player,toProfile:()=>clone(current.player)},updateGlobalUI(){}},settings:{getSettings:()=>clone(current.settings),applySettings(){}},jackpot:{currentJackpot:10000,setJackpot(){}},showSplash(){},refreshLegacyRecoveryOption(){}});
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 15

```text
  function fileHandle(value) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 16

```text
    let bytes=typeof value==='string'?value:JSON.stringify(value);let writes=0;
```

Checks checks that gets the JavaScript type name of `value` (value) and "string" have the same value and type; if true chooses `value` (value), otherwise encodes `value` (value) as JSON text for storage or transport; stores the result in `bytes`. let allows the binding to be reassigned.

### Line 17

```text
    return {name:'qa.json',queryPermission:async()=> 'granted',getFile:async()=>({size:bytes.length,text:async()=>bytes}),createWritable:async()=>({write:async text=>{writes++;bytes=text;},close:async()=>{}}),get bytes(){return bytes;},set bytes(value){bytes=value;},get writes(){return writes;}};
```

Returns an object with fields name: "qa.json"; queryPermission: a callback taking no parameters that "granted"; getFile: a callback taking no parameters that an object with fields size: `bytes.length` (the length property of bytes); text: a callback taking no parameters that `bytes` (bytes); createWritable: a callback taking no parameters that an object with fields write: a callback taking text that runs its enclosed statements; close: a callback taking no parameters that runs its enclosed statements; bytes: a callback taking no parameters that runs its enclosed statements; bytes: a callback taking value that runs its enclosed statements; and further fields to the caller and exits this function.

### Line 18

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 19

```text
  return {manager,profiles,storage,context,fileHandle,get current(){return current;},get encryptionInput(){return encryptionInput;},get confirmations(){return confirmations;},setConfirm:value=>{confirmResult=value;},setFail:value=>{fail=value;}};
```

Returns an object with fields manager: `manager` (manager); profiles: `profiles` (profiles); storage: `storage` (storage); context: `context` (context); fileHandle: `fileHandle` (file handle); current: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.

### Line 20

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 21

```text
function portable(f, partial={}){return {...f.manager.createSave(),...partial};}
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 22

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 23

```text
test('stale, mismatched, and legacy linked files stay untouched even after later autosave',async()=>{
```

This test names the behavior under protection: stale, mismatched, and legacy linked files stay untouched even after later autosave.

### Line 24

```text
  for(const partial of [{revision:1},{profileId:'profile-b'},{schemaVersion:1},{revision:99,updatedAt:'2020-01-01T00:00:00.000Z'}]){
```

This loop repeats the same check across game types, outcomes, or saves so the rule is not accidentally true only for one fixture.

### Line 25

```text
    const f=fixture();const file=f.fileHandle(portable(f,partial));const original=file.bytes;
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 26

```text
    f.manager.readStoredHandle=async()=>file;
```

Sets `f.manager.readStoredHandle` (the read stored handle property of f.manager) to a callback taking no parameters that `file` (file).

### Line 27

```text
    await f.manager.initialize();assert.equal(f.manager.fileHandle,null);assert.equal(f.current.player.balance,100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly.

### Line 28

```text
    assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,original);assert.equal(file.writes,0);assert.equal(f.confirmations,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.bytes,original)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.confirmations,0)`; it requires that observable game or persistence rule to match exactly.

### Line 29

```text
    assert.equal(f.manager.status.dataset.state,'warning');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'warning')`; it requires that player-facing UI guardrail to match exactly.

### Line 30

```text
  }
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 31

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 32

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 33

```text
test('same-revision bonus divergence prompts; declining keeps both copies and pauses file saves',async()=>{
```

This test names the behavior under protection: same-revision bonus divergence prompts; declining keeps both copies and pauses file saves.

### Line 34

```text
  const f=fixture();f.setConfirm(false);const file=f.fileHandle(portable(f,{slotBonuses:{'bonus-table':{freeSpinsRemaining:5}}}));
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
  f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
```

Sets `f.manager.readStoredHandle` (the read stored handle property of f.manager) to a callback taking no parameters that `file` (file).

### Line 36

```text
  assert.equal(f.confirmations,1);assert.equal(f.manager.fileHandle,null);assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.writes,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.confirmations,1)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly.

### Line 37

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 38

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 39

```text
test('accepting a newer linked save encrypts the previous browser progress, not incoming progress',async()=>{
```

This test names the behavior under protection: accepting a newer linked save encrypts the previous browser progress, not incoming progress.

### Line 40

```text
  const f=fixture();const incoming=portable(f,{revision:10,updatedAt:'2026-10-18T02:00:00.000Z',player:{balance:777,maxBet:100}});
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  const file=f.fileHandle(incoming);f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
```

Calls `f.fileHandle` with `incoming` (incoming); stores the result in `file`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 42

```text
  assert.equal(f.current.player.balance,777);assert.equal(f.encryptionInput.player.balance,100);assert.ok(f.current.revision>10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,777)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.encryptionInput.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 43

```text
  const recovery=JSON.parse(f.storage.get(f.manager.recoveryKey()));
```

Decodes JSON text calls `f.storage.get` with calls `f.manager.recoveryKey` with no arguments into JavaScript data; malformed JSON throws an error; stores the result in `recovery`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 44

```text
  assert.equal(recovery.ciphertext,'encrypted-previous-save');assert.equal(recovery.profileId,'profile-a');assert.equal('player' in recovery,false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovery.ciphertext,'encrypted-previous-save')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(recovery.profileId,'profile-a')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal('player' in recovery,false)`; it requires that durable save/recovery rule to match exactly.

### Line 45

```text
  assert.equal(f.manager.fileHandle,file);assert.equal(file.writes,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,file)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly.

### Line 46

```text
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(JSON.parse(file.bytes).player.balance,777);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(JSON.parse(file.bytes).player.balance,777)`; it requires that virtual-money and wager rule to match exactly.

### Line 47

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 48

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 49

```text
test('recovery quota failure and browser-save failure never replace live progress or prior recovery',async()=>{
```

This test names the behavior under protection: recovery quota failure and browser-save failure never replace live progress or prior recovery.

### Line 50

```text
  const f=fixture();f.storage.set(f.manager.recoveryKey(),'previous-recovery');f.setFail(true);
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 51

```text
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery')`; it requires that durable save/recovery rule to match exactly.

### Line 52

```text
  f.setFail(false);f.profiles.saveCurrent=async()=>false;
```

Calls `f.setFail` with false.

### Line 53

```text
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.current.player.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery')`; it requires that durable save/recovery rule to match exactly.

### Line 54

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 55

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 56

```text
test('external file modification pauses writes and queued write failures resolve false',async()=>{
```

This test names the behavior under protection: external file modification pauses writes and queued write failures resolve false.

### Line 57

```text
  const f=fixture();const file=f.fileHandle(portable(f));f.manager.fileHandle=file;f.manager.lastLinkedBytes=file.bytes;file.bytes='external-edit';
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 58

```text
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,'external-edit');assert.equal(file.writes,0);assert.equal(f.manager.fileHandle,null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.bytes,'external-edit')`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,0)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly.

### Line 59

```text
  const broken=f.fileHandle('');broken.createWritable=async()=>{throw Error('disk full');};f.manager.fileHandle=broken;f.manager.lastLinkedBytes='';
```

Calls `f.fileHandle` with ""; stores the result in `broken`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 60

```text
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(f.manager.status.dataset.state,'warning');assert.equal(f.manager.fileHandle,null);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'warning')`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.fileHandle,null)`; it requires that durable save/recovery rule to match exactly.

### Line 61

```text
  const good=f.fileHandle('');f.manager.fileHandle=good;f.manager.lastLinkedBytes='';
```

Calls `f.fileHandle` with ""; stores the result in `good`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 62

```text
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(good.writes,1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.queueFileSave(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(good.writes,1)`; it requires that durable save/recovery rule to match exactly.

### Line 63

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 64

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 65

```text
test('new empty file linking succeeds only after handle persistence and a confirmed write',async()=>{
```

This test names the behavior under protection: new empty file linking succeeds only after handle persistence and a confirmed write.

### Line 66

```text
  const f=fixture();const file=f.fileHandle('');f.context.window.showSaveFilePicker=async()=>file;f.manager.storeHandle=async()=>true;
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 67

```text
  assert.equal(await f.manager.linkFile(),true);assert.equal(file.writes,1);assert.equal(f.manager.status.dataset.state,'linked');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(await f.manager.linkFile(),true)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(file.writes,1)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.manager.status.dataset.state,'linked')`; it requires that player-facing UI guardrail to match exactly.

### Line 68

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 69

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 70

```text
test('portable saves retain Money Green and all optional progress maps',()=>{
```

This test names the behavior under protection: portable saves retain Money Green and all optional progress maps.

### Line 71

```text
  const f=fixture();const saved=f.manager.createSave();assert.equal(saved.settings.theme,'money');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(saved.settings.theme,'money')`; it requires that profile bonus/achievement rule to match exactly.

### Line 72

```text
  const parsed=f.manager.parseSave(JSON.stringify({...saved,slotBonuses:{table:{freeSpinsRemaining:4}},accomplishments:{stats:{games:5}}}));
```

Calls `f.manager.parseSave` with encodes an object with fields copied from `saved` (saved); slotBonuses: an object with fields table: an object with fields freeSpinsRemaining: 4; accomplishments: an object with fields stats: an object with fields games: 5 as JSON text for storage or transport; stores the result in `parsed`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 73

```text
  assert.equal(parsed.slotBonuses.table.freeSpinsRemaining,4);assert.equal(parsed.accomplishments.stats.games,5);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(parsed.slotBonuses.table.freeSpinsRemaining,4)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(parsed.accomplishments.stats.games,5)`; it requires that observable game or persistence rule to match exactly.

### Line 74

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
