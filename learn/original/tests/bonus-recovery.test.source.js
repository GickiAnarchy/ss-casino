const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const SlotBetRules = require('../src/js/slot-bet-rules.js');
const SlotOutcomes = require('../src/js/slot-outcomes.js');
const source = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
const classes = source.slice(source.indexOf('  class ClassicSlotEngine'), source.indexOf('  // Instantiate the two hand-authored'));
const copy = value => JSON.parse(JSON.stringify(value));
function fixture(five = true, durable = true) {
  let saved = { slotBonuses: {}, player: {balance:100,maxBet:100} };
  let writes = 0, animations = 0;
  const player = { balance:100, maxBet:100, toProfile(){return {balance:this.balance,maxBet:100};},loadProfile(value){this.balance=value.balance;} };
  const hub = {player, get balance(){return player.balance;},updateGlobalUI(){}};
  const profiles = {activeProfile:{id:'qa'},getCurrentSave:()=>copy(saved),saveCurrent:async partial=>{writes++;if(durable)saved={...saved,...copy(partial)};return durable;}};
  const fx = new Proxy({}, {get:()=>()=>{}});
  const context = {window:{SlotBetRules,SlotOutcomes,SlotGameCatalog:{applyTheme(){},applySymbolTheme:symbol=>symbol},LocalProfiles:profiles,XP:{addWagerXP(){}}},document:{getElementById:()=>null},FX:fx,JackpotManager:{contribute(){},readSharedAmount:()=>10000,setJackpot(){}},console,setTimeout};
  const result = vm.runInNewContext(`${classes}\n({ClassicSlotEngine,HighVolatilitySlotEngine,blankSlotState})`,context);
  const game = new (five?result.HighVolatilitySlotEngine:result.ClassicSlotEngine)(hub);
  game.rootEl={id:'qa-slot',querySelectorAll:()=>[]};
  game.slotState=result.blankSlotState(); game.freeSpinsRemaining=0;game.roundToken=1;
  game.clearHighlights=()=>{};game.updateUI=()=>{};game.setStatus=text=>game.status=text;game.showBreakdown=result=>game.breakdown=result;
  game.reelStrips=Array.from({length:game.REEL_COUNT},()=>({children:[]}));
  game.animateReel=async()=>{assert.ok(writes>0,'must durably settle before animation');animations++;};
  return {game,profiles,hub,result,get saved(){return saved;},get writes(){return writes;},get animations(){return animations;},setSave:value=>{saved=value;}};
}

test('original classic and five-reel multipliers, weights, reel dimensions, and jackpot replacement stay unchanged',()=>{
  const classic=fixture(false).game, five=fixture().game;
  assert.deepEqual(Array.from(classic.SYMBOLS,s=>[s.id,s.multiplier,s.weight]),[['cherry',1,28],['lemon',1,25],['orange',2,22],['bell',4,18],['wild',8,5],['seven',15,2]]);
  assert.deepEqual(Array.from(five.SYMBOLS,s=>s.weight),[15,15,15,15,15,15,1,2,1]);
  assert.equal(five.SYMBOL_SIZE,70);
  const ten=five.SYMBOLS.find(s=>s.id==='ten');
  const grid=Array.from({length:5},()=>[ten,ten,ten]);
  const result=SlotOutcomes.calculate(five,grid,true);
  assert.equal(result.lineTotal,400);assert.equal(result.lines.length,10);
  const crown=five.SYMBOLS.find(s=>s.id==='crown');
  assert.equal(SlotOutcomes.calculate(five,Array.from({length:5},()=>[crown,crown,crown]),true).jackpotHit,true);
});

test('earned free spins settle atomically and refresh hydrates without paying them again',async()=>{
  const f=fixture(),g=f.game;
  const scatter=g.SYMBOLS.find(s=>s.isScatter);
  g.getRandomSymbol=()=>scatter;
  await g.startSpin();
  assert.equal(f.writes,1);assert.equal(f.hub.balance,290);assert.equal(g.freeSpinsRemaining,10);
  assert.equal(f.saved.slotBonuses['qa-slot'].lockedStake,10);
  assert.equal(f.saved.slotBonuses['qa-slot'].lastResult.stake,10);
  const count=f.writes,balance=f.hub.balance;
  g.hydrateBonusState();g.hydrateBonusState();
  assert.equal(f.writes,count);assert.equal(f.hub.balance,balance);assert.equal(g.freeSpinsRemaining,10);
});

test('last free-spin return is included in a durable end summary and costs zero stake',async()=>{
  const f=fixture(),g=f.game;
  const ten=g.SYMBOLS.find(s=>s.id==='ten');g.getRandomSymbol=()=>ten;
  g.slotState={...copy(g.slotState),freeSpinsRemaining:1,lockedStake:10,bonusTotalWin:25};
  g.freeSpinsRemaining=1;g.lockedStake=10;g.bonusTotalWin=25;
  await g.startSpin();
  assert.equal(f.hub.balance,500);assert.equal(g.freeSpinsRemaining,0);
  assert.equal(f.saved.slotBonuses['qa-slot'].summary.totalWin,425);
  assert.equal(g.breakdown.stake,0);assert.equal(g.breakdown.payout,400);
  assert.match(g.status,/BONUS COMPLETE/);
  g.hydrateBonusState();assert.match(g.status,/425/);assert.equal(f.hub.balance,500);
});

test('failed durable storage does not charge a spin, decrement free spins, animate, or auto-advance',async()=>{
  const f=fixture(true,false),g=f.game;
  g.getRandomSymbol=()=>g.SYMBOLS[0];
  g.slotState={...copy(g.slotState),freeSpinsRemaining:3,lockedStake:10,bonusTotalWin:25};
  g.freeSpinsRemaining=3;g.lockedStake=10;g.bonusTotalWin=25;
  await g.startSpin();
  assert.equal(f.hub.balance,100);assert.equal(g.freeSpinsRemaining,3);assert.equal(g.bonusTotalWin,25);
  assert.equal(f.animations,0);assert.equal(g.isSpinning,false);assert.equal(f.hub.isSettling,false);assert.match(g.status,/SAVE FAILED/);
});

test('sticky wilds survive settlement and locked bonus stake is restored independently of wallet limits',async()=>{
  const f=fixture(),g=f.game;
  const saved={...copy(g.slotState),freeSpinsRemaining:2,lockedStake:10,bonusTotalWin:0};saved.stickyWildsGrid[0][0]=true;
  f.setSave({slotBonuses:{'qa-slot':saved},player:{balance:1,maxBet:100}});f.hub.player.balance=1;
  g.bet=0;g.hydrateBonusState();assert.equal(g.bet,10);
  g.getRandomSymbol=()=>g.SYMBOLS[0];
  await g.startSpin();
  assert.equal(g.currentGrid[0][0].isWild,true);
  assert.equal(f.saved.slotBonuses['qa-slot'].stickyWildsGrid[0][0],true);
  assert.equal(f.saved.slotBonuses['qa-slot'].freeSpinsRemaining,1);
});

test('cleared and over-limit slot stakes cannot start a spin; Max ceiling honors denominations',async()=>{
  const f=fixture(false),g=f.game;g.bet=0;await g.startSpin();assert.equal(f.writes,0);
  g.bet=101;await g.startSpin();assert.equal(f.writes,0);
  assert.equal(new SlotBetRules({minimum:.25,step:.25,maximum:25}).getMaximum(7.13,100),7);
});
