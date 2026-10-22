# tests/bonus-recovery.test.js

[Exact copy](../../original/tests/bonus-recovery.test.source.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
const test = require('node:test');
```

This imports node:test so the test exercises the real game/persistence API rather than a duplicate.

### Line 2

```text
const assert = require('node:assert/strict');
```

This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.

### Line 3

```text
const fs = require('node:fs');
```

This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.

### Line 4

```text
const vm = require('node:vm');
```

This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.

### Line 5

```text
const SlotBetRules = require('../src/js/slot-bet-rules.js');
```

This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text
const SlotOutcomes = require('../src/js/slot-outcomes.js');
```

This imports ../src/js/slot-outcomes.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 7

```text
const source = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
```

Calls `fs.readFileSync` with calls `require.resolve` with "../src/js/app.js"; "utf8"; stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
const classes = source.slice(source.indexOf('  class ClassicSlotEngine'), source.indexOf('  // Instantiate the two hand-authored'));
```

Copies a portion of `source` (source), from calls `source.indexOf` with "  class ClassicSlotEngine" up to but excluding calls `source.indexOf` with "  // Instantiate the two hand-authored"; stores the result in `classes`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 9

```text
const copy = value => JSON.parse(JSON.stringify(value));
```

A callback taking value that decodes JSON text encodes `value` (value) as JSON text for storage or transport into JavaScript data; malformed JSON throws an error; stores the result in `copy`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
function fixture(five = true, durable = true) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 11

```text
  let saved = { slotBonuses: {}, player: {balance:100,maxBet:100} };
```

An object with fields slotBonuses: an object with fields ; player: an object with fields balance: 100; maxBet: 100; stores the result in `saved`. let allows the binding to be reassigned.

### Line 12

```text
  let writes = 0, animations = 0;
```

0; stores the result in `writes`. let allows the binding to be reassigned. 0; stores the result in `animations`. let allows the binding to be reassigned.

### Line 13

```text
  const player = { balance:100, maxBet:100, toProfile(){return {balance:this.balance,maxBet:100};},loadProfile(value){this.balance=value.balance;} };
```

An object with fields balance: 100; maxBet: 100; toProfile: a callback taking no parameters that runs its enclosed statements; loadProfile: a callback taking value that runs its enclosed statements; stores the result in `player`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 14

```text
  const hub = {player, get balance(){return player.balance;},updateGlobalUI(){}};
```

An object with fields player: `player` (player); balance: a callback taking no parameters that runs its enclosed statements; updateGlobalUI: a callback taking no parameters that runs its enclosed statements; stores the result in `hub`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 15

```text
  const profiles = {activeProfile:{id:'qa'},getCurrentSave:()=>copy(saved),saveCurrent:async partial=>{writes++;if(durable)saved={...saved,...copy(partial)};return durable;}};
```

An object with fields activeProfile: an object with fields id: "qa"; getCurrentSave: a callback taking no parameters that calls `copy` with `saved` (saved); saveCurrent: a callback taking partial that runs its enclosed statements; stores the result in `profiles`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 16

```text
  const fx = new Proxy({}, {get:()=>()=>{}});
```

Constructs a new instance of `Proxy` with an object with fields ; an object with fields get: a callback taking no parameters that a callback taking no parameters that runs its enclosed statements; stores the result in `fx`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 17

```text
  const context = {window:{SlotBetRules,SlotOutcomes,SlotGameCatalog:{applyTheme(){},applySymbolTheme:symbol=>symbol},LocalProfiles:profiles,XP:{addWagerXP(){}}},document:{getElementById:()=>null},FX:fx,JackpotManager:{contribute(){},readSharedAmount:()=>10000,setJackpot(){}},console,setTimeout};
```

An object with fields window: an object with fields SlotBetRules: `SlotBetRules` (slot bet rules); SlotOutcomes: `SlotOutcomes` (slot outcomes); SlotGameCatalog: an object with fields applyTheme: a callback taking no parameters that runs its enclosed statements; applySymbolTheme: a callback taking symbol that `symbol` (symbol); LocalProfiles: `profiles` (profiles); XP: an object with fields addWagerXP: a callback taking no parameters that runs its enclosed statements; document: an object with fields getElementById: a callback taking no parameters that null; FX: `fx` (fx); JackpotManager: an object with fields contribute: a callback taking no parameters that runs its enclosed statements; readSharedAmount: a callback taking no parameters that 10000; setJackpot: a callback taking no parameters that runs its enclosed statements; console: `console` (console); setTimeout: `setTimeout` (set timeout); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 18

```text
  const result = vm.runInNewContext(`${classes}\n({ClassicSlotEngine,HighVolatilitySlotEngine,blankSlotState})`,context);
```

Calls `vm.runInNewContext` with a text template that combines fixed text with computed values `classes` (classes); `context` (context); stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 19

```text
  const game = new (five?result.HighVolatilitySlotEngine:result.ClassicSlotEngine)(hub);
```

Constructs a new instance of `five?result.HighVolatilitySlotEngine:result.ClassicSlotEngine` with `hub` (hub); stores the result in `game`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 20

```text
  game.rootEl={id:'qa-slot',querySelectorAll:()=>[]};
```

Sets `game.rootEl` (the root el property of game) to an object with fields id: "qa-slot"; querySelectorAll: a callback taking no parameters that an array containing .

### Line 21

```text
  game.slotState=result.blankSlotState(); game.freeSpinsRemaining=0;game.roundToken=1;
```

Sets `game.slotState` (the slot state property of game) to calls `result.blankSlotState` with no arguments.

### Line 22

```text
  game.clearHighlights=()=>{};game.updateUI=()=>{};game.setStatus=text=>game.status=text;game.showBreakdown=result=>game.breakdown=result;
```

Sets `game.clearHighlights` (the clear highlights property of game) to a callback taking no parameters that runs its enclosed statements.

### Line 23

```text
  game.reelStrips=Array.from({length:game.REEL_COUNT},()=>({children:[]}));
```

Sets `game.reelStrips` (the reel strips property of game) to calls `Array.from` with an object with fields length: `game.REEL_COUNT` (the reel count property of game); a callback taking no parameters that an object with fields children: an array containing .

### Line 24

```text
  game.animateReel=async()=>{assert.ok(writes>0,'must durably settle before animation');animations++;};
```

This assertion requires the condition to be truthy, confirming the fixture produced the required valid, unlocked, ahead, or successful casino outcome.

### Line 25

```text
  return {game,profiles,hub,result,get saved(){return saved;},get writes(){return writes;},get animations(){return animations;},setSave:value=>{saved=value;}};
```

Returns an object with fields game: `game` (game); profiles: `profiles` (profiles); hub: `hub` (hub); result: `result` (result); saved: a callback taking no parameters that runs its enclosed statements; writes: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.

### Line 26

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 27

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 28

```text
test('original classic and five-reel multipliers, weights, reel dimensions, and jackpot replacement stay unchanged',()=>{
```

This test names the behavior under protection: original classic and five-reel multipliers, weights, reel dimensions, and jackpot replacement stay unchanged.

### Line 29

```text
  const classic=fixture(false).game, five=fixture().game;
```

`fixture(false).game` (the game property of fixture(false)); stores the result in `classic`. const prevents reassignment of this binding, not mutation inside its object/array. `fixture().game` (the game property of fixture()); stores the result in `five`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 30

```text
  assert.deepEqual(Array.from(classic.SYMBOLS,s=>[s.id,s.multiplier,s.weight]),[['cherry',1,28],['lemon',1,25],['orange',2,22],['bell',4,18],['wild',8,5],['seven',15,2]]);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(Array.from(classic.SYMBOLS,s=>[s.id,s.multiplier,s.weight]),[['cherry',1,28],['lemon',1,25],['orange',2,22],['bell',4,18],['wild',8,5],['seven',15,2]])`; it requires that player-facing UI guardrail to match exactly.

### Line 31

```text
  assert.deepEqual(Array.from(five.SYMBOLS,s=>s.weight),[15,15,15,15,15,15,1,2,1]);
```

This deepEqual assertion compares the actual expression and expected argument(s) shown in `assert.deepEqual(Array.from(five.SYMBOLS,s=>s.weight),[15,15,15,15,15,15,1,2,1])`; it requires that durable save/recovery rule to match exactly.

### Line 32

```text
  assert.equal(five.SYMBOL_SIZE,70);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(five.SYMBOL_SIZE,70)`; it requires that durable save/recovery rule to match exactly.

### Line 33

```text
  const ten=five.SYMBOLS.find(s=>s.id==='ten');
```

Returns the first item of `five.SYMBOLS` (the symbols property of five) matching a callback taking s that checks that `s.id` (the id property of s) and "ten" have the same value and type, or undefined; stores the result in `ten`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 34

```text
  const grid=Array.from({length:5},()=>[ten,ten,ten]);
```

Calls `Array.from` with an object with fields length: 5; a callback taking no parameters that an array containing `ten` (ten), `ten` (ten), `ten` (ten); stores the result in `grid`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 35

```text
  const result=SlotOutcomes.calculate(five,grid,true);
```

Calls `SlotOutcomes.calculate` with `five` (five); `grid` (grid); true; stores the result in `result`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 36

```text
  assert.equal(result.lineTotal,400);assert.equal(result.lines.length,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.lineTotal,400)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(result.lines.length,10)`; it requires that observable game or persistence rule to match exactly.

### Line 37

```text
  const crown=five.SYMBOLS.find(s=>s.id==='crown');
```

Returns the first item of `five.SYMBOLS` (the symbols property of five) matching a callback taking s that checks that `s.id` (the id property of s) and "crown" have the same value and type, or undefined; stores the result in `crown`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 38

```text
  assert.equal(SlotOutcomes.calculate(five,Array.from({length:5},()=>[crown,crown,crown]),true).jackpotHit,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(SlotOutcomes.calculate(five,Array.from({length:5},()=>[crown,crown,crown]),true).jackpotHit,true)`; it requires that durable save/recovery rule to match exactly.

### Line 39

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 40

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 41

```text
test('earned free spins settle atomically and refresh hydrates without paying them again',async()=>{
```

This test names the behavior under protection: earned free spins settle atomically and refresh hydrates without paying them again.

### Line 42

```text
  const f=fixture(),g=f.game;
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 43

```text
  const scatter=g.SYMBOLS.find(s=>s.isScatter);
```

Returns the first item of `g.SYMBOLS` (the symbols property of g) matching a callback taking s that `s.isScatter` (the is scatter property of s), or undefined; stores the result in `scatter`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 44

```text
  g.getRandomSymbol=()=>scatter;
```

Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that `scatter` (scatter).

### Line 45

```text
  await g.startSpin();
```

This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.

### Line 46

```text
  assert.equal(f.writes,1);assert.equal(f.hub.balance,290);assert.equal(g.freeSpinsRemaining,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,1)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,290)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,10)`; it requires that profile bonus/achievement rule to match exactly.

### Line 47

```text
  assert.equal(f.saved.slotBonuses['qa-slot'].lockedStake,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].lockedStake,10)`; it requires that profile bonus/achievement rule to match exactly.

### Line 48

```text
  assert.equal(f.saved.slotBonuses['qa-slot'].lastResult.stake,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].lastResult.stake,10)`; it requires that virtual-money and wager rule to match exactly.

### Line 49

```text
  const count=f.writes,balance=f.hub.balance;
```

`f.writes` (the writes property of f); stores the result in `count`. const prevents reassignment of this binding, not mutation inside its object/array. `f.hub.balance` (the balance property of f.hub); stores the result in `balance`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 50

```text
  g.hydrateBonusState();g.hydrateBonusState();
```

Calls `g.hydrateBonusState` with no arguments.

### Line 51

```text
  assert.equal(f.writes,count);assert.equal(f.hub.balance,balance);assert.equal(g.freeSpinsRemaining,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,count)`; it requires that durable save/recovery rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,balance)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,10)`; it requires that profile bonus/achievement rule to match exactly.

### Line 52

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 53

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 54

```text
test('last free-spin return is included in a durable end summary and costs zero stake',async()=>{
```

This test names the behavior under protection: last free-spin return is included in a durable end summary and costs zero stake.

### Line 55

```text
  const f=fixture(),g=f.game;
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 56

```text
  const ten=g.SYMBOLS.find(s=>s.id==='ten');g.getRandomSymbol=()=>ten;
```

Returns the first item of `g.SYMBOLS` (the symbols property of g) matching a callback taking s that checks that `s.id` (the id property of s) and "ten" have the same value and type, or undefined; stores the result in `ten`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 57

```text
  g.slotState={...copy(g.slotState),freeSpinsRemaining:1,lockedStake:10,bonusTotalWin:25};
```

Sets `g.slotState` (the slot state property of g) to an object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 1; lockedStake: 10; bonusTotalWin: 25.

### Line 58

```text
  g.freeSpinsRemaining=1;g.lockedStake=10;g.bonusTotalWin=25;
```

Sets `g.freeSpinsRemaining` (the free spins remaining property of g) to 1.

### Line 59

```text
  await g.startSpin();
```

This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.

### Line 60

```text
  assert.equal(f.hub.balance,500);assert.equal(g.freeSpinsRemaining,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,500)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,0)`; it requires that profile bonus/achievement rule to match exactly.

### Line 61

```text
  assert.equal(f.saved.slotBonuses['qa-slot'].summary.totalWin,425);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].summary.totalWin,425)`; it requires that profile bonus/achievement rule to match exactly.

### Line 62

```text
  assert.equal(g.breakdown.stake,0);assert.equal(g.breakdown.payout,400);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.breakdown.stake,0)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.breakdown.payout,400)`; it requires that virtual-money and wager rule to match exactly.

### Line 63

```text
  assert.match(g.status,/BONUS COMPLETE/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 64

```text
  g.hydrateBonusState();assert.match(g.status,/425/);assert.equal(f.hub.balance,500);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,500)`; it requires that virtual-money and wager rule to match exactly.

### Line 65

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 66

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 67

```text
test('failed durable storage does not charge a spin, decrement free spins, animate, or auto-advance',async()=>{
```

This test names the behavior under protection: failed durable storage does not charge a spin, decrement free spins, animate, or auto-advance.

### Line 68

```text
  const f=fixture(true,false),g=f.game;
```

Calls `fixture` with true; false; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 69

```text
  g.getRandomSymbol=()=>g.SYMBOLS[0];
```

Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that the entry at index/key 0 in `g.SYMBOLS` (the symbols property of g).

### Line 70

```text
  g.slotState={...copy(g.slotState),freeSpinsRemaining:3,lockedStake:10,bonusTotalWin:25};
```

Sets `g.slotState` (the slot state property of g) to an object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 3; lockedStake: 10; bonusTotalWin: 25.

### Line 71

```text
  g.freeSpinsRemaining=3;g.lockedStake=10;g.bonusTotalWin=25;
```

Sets `g.freeSpinsRemaining` (the free spins remaining property of g) to 3.

### Line 72

```text
  await g.startSpin();
```

This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.

### Line 73

```text
  assert.equal(f.hub.balance,100);assert.equal(g.freeSpinsRemaining,3);assert.equal(g.bonusTotalWin,25);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.freeSpinsRemaining,3)`; it requires that profile bonus/achievement rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.bonusTotalWin,25)`; it requires that observable game or persistence rule to match exactly.

### Line 74

```text
  assert.equal(f.animations,0);assert.equal(g.isSpinning,false);assert.equal(f.hub.isSettling,false);assert.match(g.status,/SAVE FAILED/);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.animations,0)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.isSpinning,false)`; it requires that observable game or persistence rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.hub.isSettling,false)`; it requires that observable game or persistence rule to match exactly. This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 75

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 76

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 77

```text
test('sticky wilds survive settlement and locked bonus stake is restored independently of wallet limits',async()=>{
```

This test names the behavior under protection: sticky wilds survive settlement and locked bonus stake is restored independently of wallet limits.

### Line 78

```text
  const f=fixture(),g=f.game;
```

Calls `fixture` with no arguments; stores the result in `f`. const prevents reassignment of this binding, not mutation inside its object/array. `f.game` (the game property of f); stores the result in `g`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 79

```text
  const saved={...copy(g.slotState),freeSpinsRemaining:2,lockedStake:10,bonusTotalWin:0};saved.stickyWildsGrid[0][0]=true;
```

An object with fields copied from calls `copy` with `g.slotState` (the slot state property of g); freeSpinsRemaining: 2; lockedStake: 10; bonusTotalWin: 0; stores the result in `saved`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 80

```text
  f.setSave({slotBonuses:{'qa-slot':saved},player:{balance:1,maxBet:100}});f.hub.player.balance=1;
```

Calls `f.setSave` with an object with fields slotBonuses: an object with fields 'qa-slot': `saved` (saved); player: an object with fields balance: 1; maxBet: 100.

### Line 81

```text
  g.bet=0;g.hydrateBonusState();assert.equal(g.bet,10);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.bet,10)`; it requires that virtual-money and wager rule to match exactly.

### Line 82

```text
  g.getRandomSymbol=()=>g.SYMBOLS[0];
```

Sets `g.getRandomSymbol` (the get random symbol property of g) to a callback taking no parameters that the entry at index/key 0 in `g.SYMBOLS` (the symbols property of g).

### Line 83

```text
  await g.startSpin();
```

This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.

### Line 84

```text
  assert.equal(g.currentGrid[0][0].isWild,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(g.currentGrid[0][0].isWild,true)`; it requires that observable game or persistence rule to match exactly.

### Line 85

```text
  assert.equal(f.saved.slotBonuses['qa-slot'].stickyWildsGrid[0][0],true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].stickyWildsGrid[0][0],true)`; it requires that profile bonus/achievement rule to match exactly.

### Line 86

```text
  assert.equal(f.saved.slotBonuses['qa-slot'].freeSpinsRemaining,1);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.saved.slotBonuses['qa-slot'].freeSpinsRemaining,1)`; it requires that profile bonus/achievement rule to match exactly.

### Line 87

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 88

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 89

```text
test('cleared and over-limit slot stakes cannot start a spin; Max ceiling honors denominations',async()=>{
```

This test names the behavior under protection: cleared and over-limit slot stakes cannot start a spin; Max ceiling honors denominations.

### Line 90

```text
  const f=fixture(false),g=f.game;g.bet=0;await g.startSpin();assert.equal(f.writes,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,0)`; it requires that durable save/recovery rule to match exactly.

### Line 91

```text
  g.bet=101;await g.startSpin();assert.equal(f.writes,0);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(f.writes,0)`; it requires that durable save/recovery rule to match exactly.

### Line 92

```text
  assert.equal(new SlotBetRules({minimum:.25,step:.25,maximum:25}).getMaximum(7.13,100),7);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(new SlotBetRules({minimum:.25,step:.25,maximum:25}).getMaximum(7.13,100),7)`; it requires that virtual-money and wager rule to match exactly.

### Line 93

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
