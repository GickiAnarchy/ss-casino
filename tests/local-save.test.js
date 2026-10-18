const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');
const clone = value => JSON.parse(JSON.stringify(value));
function fixture() {
  const storage = new Map(); let fail = false, confirmResult = true, confirmations = 0, encryptionInput;
  let current = {player:{balance:100,maxBet:100},settings:{volume:80,isMuted:false,theme:'money'},jackpot:10000,raceBet:null,raceResultNotice:null,raceExperience:null,slotBonuses:{},accomplishments:{},revision:4,updatedAt:'2026-10-18T01:00:00.000Z'};
  const localStorage = {getItem:key=>storage.get(key)??null,setItem:(key,value)=>{if(fail)throw Error('quota');storage.set(key,value);},removeItem:key=>storage.delete(key)};
  const profiles = {activeProfile:{id:'profile-a',name:'QA'},activeKey:{},getCurrentSave:()=>clone(current),normalizeSave:value=>({...clone(current),...clone(value)}),flushSave:async()=>true,encryptSave:async(_p,_k,value)=>{encryptionInput=clone(value);return {iv:'random-iv',ciphertext:'encrypted-previous-save'};},decryptSave:async()=>clone(encryptionInput),saveCurrent:async value=>{if(fail)return false;current={...clone(value),revision:Math.max(current.revision,value.revision||0)+1};return true;}};
  const context={window:{LocalProfiles:profiles},document:{getElementById:()=>null,addEventListener(){}},localStorage,confirm:()=>{confirmations++;return confirmResult;},alert(){},Player:{numberOr:(v,f,min=0)=>v!=null&&Number.isFinite(Number(v))&&Number(v)>=min?Number(v):f,fromProfile:value=>({...value,toProfile:()=>clone(value)})},console};
  vm.runInNewContext(fs.readFileSync(require.resolve('../src/js/local-save.js'),'utf8'),context);
  const manager=Object.create(context.window.LocalSaveManager.prototype);
  Object.assign(manager,{fileHandle:null,fileWriteQueue:Promise.resolve(true),lastLinkedBytes:null,lastLinkedRevision:null,status:{dataset:{},textContent:''},hub:{player:{...current.player,toProfile:()=>clone(current.player)},updateGlobalUI(){}},settings:{getSettings:()=>clone(current.settings),applySettings(){}},jackpot:{currentJackpot:10000,setJackpot(){}},showSplash(){},refreshLegacyRecoveryOption(){}});
  function fileHandle(value) {
    let bytes=typeof value==='string'?value:JSON.stringify(value);let writes=0;
    return {name:'qa.json',queryPermission:async()=> 'granted',getFile:async()=>({size:bytes.length,text:async()=>bytes}),createWritable:async()=>({write:async text=>{writes++;bytes=text;},close:async()=>{}}),get bytes(){return bytes;},set bytes(value){bytes=value;},get writes(){return writes;}};
  }
  return {manager,profiles,storage,context,fileHandle,get current(){return current;},get encryptionInput(){return encryptionInput;},get confirmations(){return confirmations;},setConfirm:value=>{confirmResult=value;},setFail:value=>{fail=value;}};
}
function portable(f, partial={}){return {...f.manager.createSave(),...partial};}

test('stale, mismatched, and legacy linked files stay untouched even after later autosave',async()=>{
  for(const partial of [{revision:1},{profileId:'profile-b'},{schemaVersion:1},{revision:99,updatedAt:'2020-01-01T00:00:00.000Z'}]){
    const f=fixture();const file=f.fileHandle(portable(f,partial));const original=file.bytes;
    f.manager.readStoredHandle=async()=>file;
    await f.manager.initialize();assert.equal(f.manager.fileHandle,null);assert.equal(f.current.player.balance,100);
    assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,original);assert.equal(file.writes,0);assert.equal(f.confirmations,0);
    assert.equal(f.manager.status.dataset.state,'warning');
  }
});

test('same-revision bonus divergence prompts; declining keeps both copies and pauses file saves',async()=>{
  const f=fixture();f.setConfirm(false);const file=f.fileHandle(portable(f,{slotBonuses:{'bonus-table':{freeSpinsRemaining:5}}}));
  f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
  assert.equal(f.confirmations,1);assert.equal(f.manager.fileHandle,null);assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.writes,0);
});

test('accepting a newer linked save encrypts the previous browser progress, not incoming progress',async()=>{
  const f=fixture();const incoming=portable(f,{revision:10,updatedAt:'2026-10-18T02:00:00.000Z',player:{balance:777,maxBet:100}});
  const file=f.fileHandle(incoming);f.manager.readStoredHandle=async()=>file;await f.manager.initialize();
  assert.equal(f.current.player.balance,777);assert.equal(f.encryptionInput.player.balance,100);assert.ok(f.current.revision>10);
  const recovery=JSON.parse(f.storage.get(f.manager.recoveryKey()));
  assert.equal(recovery.ciphertext,'encrypted-previous-save');assert.equal(recovery.profileId,'profile-a');assert.equal('player' in recovery,false);
  assert.equal(f.manager.fileHandle,file);assert.equal(file.writes,0);
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(JSON.parse(file.bytes).player.balance,777);
});

test('recovery quota failure and browser-save failure never replace live progress or prior recovery',async()=>{
  const f=fixture();f.storage.set(f.manager.recoveryKey(),'previous-recovery');f.setFail(true);
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
  f.setFail(false);f.profiles.saveCurrent=async()=>false;
  assert.equal(await f.manager.applySave(portable(f,{player:{balance:1}})),false);assert.equal(f.current.player.balance,100);assert.equal(f.storage.get(f.manager.recoveryKey()),'previous-recovery');
});

test('external file modification pauses writes and queued write failures resolve false',async()=>{
  const f=fixture();const file=f.fileHandle(portable(f));f.manager.fileHandle=file;f.manager.lastLinkedBytes=file.bytes;file.bytes='external-edit';
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(file.bytes,'external-edit');assert.equal(file.writes,0);assert.equal(f.manager.fileHandle,null);
  const broken=f.fileHandle('');broken.createWritable=async()=>{throw Error('disk full');};f.manager.fileHandle=broken;f.manager.lastLinkedBytes='';
  assert.equal(await f.manager.queueFileSave(),false);assert.equal(f.manager.status.dataset.state,'warning');assert.equal(f.manager.fileHandle,null);
  const good=f.fileHandle('');f.manager.fileHandle=good;f.manager.lastLinkedBytes='';
  assert.equal(await f.manager.queueFileSave(),true);assert.equal(good.writes,1);
});

test('new empty file linking succeeds only after handle persistence and a confirmed write',async()=>{
  const f=fixture();const file=f.fileHandle('');f.context.window.showSaveFilePicker=async()=>file;f.manager.storeHandle=async()=>true;
  assert.equal(await f.manager.linkFile(),true);assert.equal(file.writes,1);assert.equal(f.manager.status.dataset.state,'linked');
});

test('portable saves retain Money Green and all optional progress maps',()=>{
  const f=fixture();const saved=f.manager.createSave();assert.equal(saved.settings.theme,'money');
  const parsed=f.manager.parseSave(JSON.stringify({...saved,slotBonuses:{table:{freeSpinsRemaining:4}},accomplishments:{stats:{games:5}}}));
  assert.equal(parsed.slotBonuses.table.freeSpinsRemaining,4);assert.equal(parsed.accomplishments.stats.games,5);
});
