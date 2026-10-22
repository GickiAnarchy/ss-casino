// Original L1: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L4: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L5: This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.
const SlotBetRules = require('../src/js/slot-bet-rules.js');
// Original L6: This imports ../src/js/slot-outcomes.js so the test exercises the real game/persistence API rather than a duplicate.
const SlotOutcomes = require('../src/js/slot-outcomes.js');
// Original L7: Calls `fs.readFileSync` with calls `require.resolve` with "../src/js/app.js"; "utf8"; stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.
const source = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
// Original L8: Copies a portion of `source` (source), from calls `source.indexOf` with "  class ClassicSlotEngine" up to but excluding calls `source.indexOf` with "  // Instantiate the two hand-authored"; stores the result in `classes`. const prevents reassignment of this binding, not mutation inside its object/array.
const classes = source.slice(source.indexOf('  class ClassicSlotEngine'), source.indexOf('  // Instantiate the two hand-authored'));
// Original L9: A callback taking value that decodes JSON text encodes `value` (value) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.
const copy = value => JSON.parse(JSON.stringify(value));
// Original L10: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function fixture(five = true, durable = true) {
// Original L11: An object with fields slotBonuses: an object with fields ; player: an object with fields balance: 100; maxBet: 100; stores the result in `saved`. let allows the binding to be reassigned.
  let saved = { slotBonuses: {}, player: {balance:100,maxBet:100} };
// Original L12: 0; stores the result in `writes`. let allows the binding to be reassigned. 0; stores the result in `animations`. let allows the binding to be reassigned.
  let writes = 0, animations = 0;
// Original L13: An object with fields balance: 100; maxBet: 100; toProfile: a callback taking no parameters that runs its enclosed statements; loadProfile: a callback taking value that runs its enclosed statements; stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.
  const player = { balance:100, maxBet:100, toProfile(){return {balance:this.balance,maxBet:100};},loadProfile(value){this.balance=value.balance;} };
// Original L14: An object with fields player: `player` (player); balance: a callback taking no parameters that runs its enclosed statements; updateGlobalUI: a callback taking no parameters that runs its enclosed statements; stores the result in `hub`. const prevents reassignment of this binding, not mutation inside its object/array.
  const hub = {player, get balance(){return player.balance;},updateGlobalUI(){}};
// Original L15: An object with fields activeProfile: an object with fields id: "qa"; getCurrentSave: a callback taking no parameters that calls `copy` with `saved` (saved); saveCurrent: a callback taking partial that runs its enclosed statements; stores the result in `profiles`. const prevents reassignment of this binding, not mutation inside its object/array.
  const profiles = {activeProfile:{id:'qa'},getCurrentSave:()=>copy(saved),saveCurrent:async partial=>{writes++;if(durable)saved={...saved,...copy(partial)};return durable;}};
// Original L16: Constructs a new instance of `Proxy` with an object with fields ; an object with fields get: a callback taking no parameters that a callback taking no parameters that runs its enclosed statements; stores the result in `fx`. const prevents reassignment of this binding, not mutation inside its object/array.
  const fx = new Proxy({}, {get:()=>()=>{}});
// Original L17: An object with fields window: an object with fields SlotBetRules: `SlotBetRules` (slot bet rules); SlotOutcomes: `SlotOutcomes` (slot outcomes); SlotGameCatalog: an object with fields applyTheme: a callback taking no parameters that runs its enclosed statements; applySymbolTheme: a callback taking symbol that `symbol` (symbol); LocalProfiles: `profiles` (profiles); XP: an object with fields addWagerXP: a callback taking no parameters that runs its enclosed statements; document: an object with fields getElementById: a callback taking no parameters that null; FX: `fx` (fx); JackpotManager: an object with fields contribute: a callback taking no parameters that runs its enclosed statements; readSharedAmount: a callback taking no parameters that 10000; setJackpot: a callback taking no parameters that runs its enclosed statements; console: `console` (console); setTimeout: `setTimeout` (set timeout); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context = {window:{SlotBetRules,SlotOutcomes,SlotGameCatalog:{applyTheme(){},applySymbolTheme:symbol=>symbol},LocalProfiles:profiles,XP:{addWagerXP(){}}},document:{getElementById:()=>null},FX:fx,JackpotManager:{contribute(){},readSharedAmount:()=>10000,setJackpot(){}},console,setTimeout};
// Original L18: Calls `vm.runInNewContext` with a text template that combines fixed text with computed values `classes` (classes); `context` (context); stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.
  const result = vm.runInNewContext(`${classes}\n({ClassicSlotEngine,HighVolatilitySlotEngine,blankSlotState})`,context);
// Original L19: Constructs a new instance of `five?result.HighVolatilitySlotEngine:result.ClassicSlotEngine` with `hub` (hub); stores the result in `game`. const prevents reassignment of this binding, not mutation inside its object/array.
  const game = new (five?result.HighVolatilitySlotEngine:result.ClassicSlotEngine)(hub);
// Original L20: Sets `game.rootEl` (the root el property of game) to an object with fields id: "qa-slot"; querySelectorAll: a callback taking no parameters that an array containing .
  game.rootEl={id:'qa-slot',querySelectorAll:()=>[]};
// Original L21: Sets `game.slotState` (the slot state property of game) to calls `result.blankSlotState` with no arguments.
  game.slotState=result.blankSlotState(); game.freeSpinsRemaining=0;game.roundToken=1;
// Original L22: Sets `game.clearHighlights` (the clear highlights property of game) to a callback taking no parameters that runs its enclosed statements.
  game.clearHighlights=()=>{};game.updateUI=()=>{};game.setStatus=text=>game.status=text;game.showBreakdown=result=>game.breakdown=result;
// Original L23: Sets `game.reelStrips` (the reel strips property of game) to calls `Array.from` with an object with fields length: `game.REEL_COUNT` (the reel count property of game); a callback taking no parameters that an object with fields children: an array containing .
  game.reelStrips=Array.from({length:game.REEL_COUNT},()=>({children:[]}));
// Original L24: This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.
  game.animateReel=async()=>{assert.ok(writes>0,'must durably settle before animation');animations++;};
// Original L25: Returns an object with fields game: `game` (game); profiles: `profiles` (profiles); hub: `hub` (hub); result: `result` (result); saved: a callback taking no parameters that runs its enclosed statements; writes: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.
  return {game,profiles,hub,result,get saved(){return saved;},get writes(){return writes;},get animations(){return animations;},setSave:value=>{saved=value;}};
// Original L26: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L27: Blank line separates test setup from the next scenario for readability.

// Original L28: This test names the behavior under protection: original classic and five-reel multipliers, weights, reel dimensions, and jackpot replacement stay unchanged.
test('original classic and five-reel multipliers, weights, reel dimensions, and jackpot replacement stay unchanged',()=>{
// Original L29: `fixture(false).game` (the game property of fixture(false)); stores the result in `classic`. const prevents reassignment of this binding, not mutation inside its object/array. `fixture().game` (the game property of fixture()); stores the result in `five`. const prevents reassignment of this binding, not mutation inside its object/array.
  const classic=fixture(false).game, five=fixture().game;
// Original L30: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(Array.from(classic.SYMBOLS,s=>[s.id,s.multiplier,s.weight]),[['cherry',1,28],['lemon',1,25],['orange',2,22],['bell',4,18],['wild',8,5],['seven',15,2]])`; it requires that player-facing UI guardrail to match exactly.
  assert.deepEqual(Array.from(classic.SYMBOLS,s=>[s.id,s.multiplier,s.weight]),[['cherry',1,28],['lemon',1,25],['orange',2,22],['bell',4,18],['wild',8,5],['seven',15,2]]);
// Original L31: This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(Array.from(five.SYMBOLS,s=>s.weight),[15,15,15,15,15,15,1,2,1])`; it requires that durable save/recovery rule to match exactly.
  assert.deepEqual(Array.from(five.SYMBOLS,s=>s.weight),[15,15,15,15,15,15,1,2,1]);
// Original L32: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(five.SYMBOL_SIZE,70)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(five.SYMBOL_SIZE,70);
// Original L33: Returns the first item of `five.SYMBOLS` (the symbols property of five) matching a callback taking s that checks that `s.id` (the id property of s) and "ten" have the same value and type, or undefined; stores the result in `ten`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ten=five.SYMBOLS.find(s=>s.id==='ten');
// Original L34: Calls `Array.from` with an object with fields length: 5; a callback taking no parameters that an array containing `ten` (ten), `ten` (ten), `ten` (ten); stores the result in `grid`. const prevents reassignment of this binding, not mutation inside its object/array.
  const grid=Array.from({length:5},()=>[ten,ten,ten]);
// Original L35: Calls `SlotOutcomes.calculate` with `five` (five); `grid` (grid); true; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.
  const result=SlotOutcomes.calculate(five,grid,true);
// Original L36: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.lineTotal,400)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.lines.length,10)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(result.lineTotal,400);assert.equal(result.lines.length,10);
// Original L37: Returns the first item of `five.SYMBOLS` (the symbols property of five) matching a callback taking s that checks that `s.id` (the id property of s) and "crown" have the same value and type, or undefined; stores the result in `crown`. const prevents reassignment of this binding, not mutation inside its object/array.
  const crown=five.SYMBOLS.find(s=>s.id==='crown');
// Original L38: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotOutcomes.calculate(five,Array.from({length:5},()=>[crown,crown,crown]),true).jackpotHit,true)`; it requires that durable save/recovery rule to match exactly.
  assert.equal(SlotOutcomes.calculate(five,Array.from({length:5},()=>[crown,crown,crown]),true).jackpotHit,true);
// Original L39: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L40: Blank line separates test setup from the next scenario for readability.

// Original L41: This test names the behavior under protection: earned free spins settle atomically and refresh hydrates without paying them again.
test('earned free spins settle atomically and refresh hydrates without paying them again',async()=>{
// Original L42: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture(),g=f.game;
// Original L43: Returns the first item of `g.SYMBOLS` (the symbols property of g) matching a callback taking s that `s.isScatter` (the is scatter property of s), or undefined; stores the result in `scatter`. const prevents reassignment of this binding, not mutation inside its object/array.
  const scatter=g.SYMBOLS.find(s=>s.isScatter);
// Original L44: Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that `scatter` (scatter).
  g.getRandomSymbol=()=>scatter;
// Original L45: This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.
  await g.startSpin();
// Original L46: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,1)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,290)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,10)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.writes,1);assert.equal(f.hub.balance,290);assert.equal(g.freeSpinsRemaining,10);
// Original L47: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].lockedStake,10)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.saved.slotBonuses['qa-slot'].lockedStake,10);
// Original L48: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].lastResult.stake,10)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(f.saved.slotBonuses['qa-slot'].lastResult.stake,10);
// Original L49: `f.writes` (the writes property of f); stores the result in `count`. const prevents reassignment of this binding, not mutation inside its object/array. `f.hub.balance` (the balance property of f.hub); stores the result in `balance`. const prevents reassignment of this binding, not mutation inside its object/array.
  const count=f.writes,balance=f.hub.balance;
// Original L50: Calls `g.hydrateBonusState` with no arguments.
  g.hydrateBonusState();g.hydrateBonusState();
// Original L51: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,count)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,balance)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,10)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.writes,count);assert.equal(f.hub.balance,balance);assert.equal(g.freeSpinsRemaining,10);
// Original L52: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L53: Blank line separates test setup from the next scenario for readability.

// Original L54: This test names the behavior under protection: last free-spin return is included in a durable end summary and costs zero stake.
test('last free-spin return is included in a durable end summary and costs zero stake',async()=>{
// Original L55: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture(),g=f.game;
// Original L56: Returns the first item of `g.SYMBOLS` (the symbols property of g) matching a callback taking s that checks that `s.id` (the id property of s) and "ten" have the same value and type, or undefined; stores the result in `ten`. const prevents reassignment of this binding, not mutation inside its object/array.
  const ten=g.SYMBOLS.find(s=>s.id==='ten');g.getRandomSymbol=()=>ten;
// Original L57: Sets `g.slotState` (the slot state property of g) to an object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 1; lockedStake: 10; bonusTotalWin: 25.
  g.slotState={...copy(g.slotState),freeSpinsRemaining:1,lockedStake:10,bonusTotalWin:25};
// Original L58: Sets `g.freeSpinsRemaining` (the free spins remaining property of g) to 1.
  g.freeSpinsRemaining=1;g.lockedStake=10;g.bonusTotalWin=25;
// Original L59: This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.
  await g.startSpin();
// Original L60: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,500)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,0)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.hub.balance,500);assert.equal(g.freeSpinsRemaining,0);
// Original L61: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].summary.totalWin,425)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.saved.slotBonuses['qa-slot'].summary.totalWin,425);
// Original L62: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.breakdown.stake,0)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.breakdown.payout,400)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(g.breakdown.stake,0);assert.equal(g.breakdown.payout,400);
// Original L63: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(g.status,/BONUS COMPLETE/);
// Original L64: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,500)`; it requires that virtual-money and wager rule to match exactly.
  g.hydrateBonusState();assert.match(g.status,/425/);assert.equal(f.hub.balance,500);
// Original L65: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L66: Blank line separates test setup from the next scenario for readability.

// Original L67: This test names the behavior under protection: failed durable storage does not charge a spin, decrement free spins, animate, or auto-advance.
test('failed durable storage does not charge a spin, decrement free spins, animate, or auto-advance',async()=>{
// Original L68: Calls `fixture` with true; false; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture(true,false),g=f.game;
// Original L69: Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that the entry at index/key 0 in `g.SYMBOLS` (the symbols property of g).
  g.getRandomSymbol=()=>g.SYMBOLS[0];
// Original L70: Sets `g.slotState` (the slot state property of g) to an object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 3; lockedStake: 10; bonusTotalWin: 25.
  g.slotState={...copy(g.slotState),freeSpinsRemaining:3,lockedStake:10,bonusTotalWin:25};
// Original L71: Sets `g.freeSpinsRemaining` (the free spins remaining property of g) to 3.
  g.freeSpinsRemaining=3;g.lockedStake=10;g.bonusTotalWin=25;
// Original L72: This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.
  await g.startSpin();
// Original L73: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,3)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.bonusTotalWin,25)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(f.hub.balance,100);assert.equal(g.freeSpinsRemaining,3);assert.equal(g.bonusTotalWin,25);
// Original L74: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.animations,0)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.isSpinning,false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.isSettling,false)`; it requires that observable game or persistence rule to match exactly. This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.equal(f.animations,0);assert.equal(g.isSpinning,false);assert.equal(f.hub.isSettling,false);assert.match(g.status,/SAVE FAILED/);
// Original L75: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L76: Blank line separates test setup from the next scenario for readability.

// Original L77: This test names the behavior under protection: sticky wilds survive settlement and locked bonus stake is restored independently of wallet limits.
test('sticky wilds survive settlement and locked bonus stake is restored independently of wallet limits',async()=>{
// Original L78: Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.
  const f=fixture(),g=f.game;
// Original L79: An object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 2; lockedStake: 10; bonusTotalWin: 0; stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.
  const saved={...copy(g.slotState),freeSpinsRemaining:2,lockedStake:10,bonusTotalWin:0};saved.stickyWildsGrid[0][0]=true;
// Original L80: Calls `f.setSave` with an object with fields slotBonuses: an object with fields 'qa-slot': `saved` (saved); player: an object with fields balance: 1; maxBet: 100.
  f.setSave({slotBonuses:{'qa-slot':saved},player:{balance:1,maxBet:100}});f.hub.player.balance=1;
// Original L81: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.bet,10)`; it requires that virtual-money and wager rule to match exactly.
  g.bet=0;g.hydrateBonusState();assert.equal(g.bet,10);
// Original L82: Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that the entry at index/key 0 in `g.SYMBOLS` (the symbols property of g).
  g.getRandomSymbol=()=>g.SYMBOLS[0];
// Original L83: This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.
  await g.startSpin();
// Original L84: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.currentGrid[0][0].isWild,true)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(g.currentGrid[0][0].isWild,true);
// Original L85: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].stickyWildsGrid[0][0],true)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.saved.slotBonuses['qa-slot'].stickyWildsGrid[0][0],true);
// Original L86: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].freeSpinsRemaining,1)`; it requires that profile bonus/achievement rule to match exactly.
  assert.equal(f.saved.slotBonuses['qa-slot'].freeSpinsRemaining,1);
// Original L87: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L88: Blank line separates test setup from the next scenario for readability.

// Original L89: This test names the behavior under protection: cleared and over-limit slot stakes cannot start a spin; Max ceiling honors denominations.
test('cleared and over-limit slot stakes cannot start a spin; Max ceiling honors denominations',async()=>{
// Original L90: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,0)`; it requires that durable save/recovery rule to match exactly.
  const f=fixture(false),g=f.game;g.bet=0;await g.startSpin();assert.equal(f.writes,0);
// Original L91: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,0)`; it requires that durable save/recovery rule to match exactly.
  g.bet=101;await g.startSpin();assert.equal(f.writes,0);
// Original L92: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new SlotBetRules({minimum:.25,step:.25,maximum:25}).getMaximum(7.13,100),7)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(new SlotBetRules({minimum:.25,step:.25,maximum:25}).getMaximum(7.13,100),7);
// Original L93: This closes the test/helper block containing the setup and its behavior checks.
});
