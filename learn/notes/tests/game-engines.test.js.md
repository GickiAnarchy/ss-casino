# tests/game-engines.test.js

[Exact copy](../../original/tests/game-engines.test.source.js)

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
const GameRules = require('../src/js/game-rules.js');
```

This imports ../src/js/game-rules.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 6

```text
const SlotBetRules = require('../src/js/slot-bet-rules.js');
```

This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.

### Line 7

```text
const app = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
```

Calls `fs.readFileSync` with calls `require.resolve` with "../src/js/app.js"; "utf8"; stores the result in `app`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 8

```text
function engine(name, end) {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 9

```text
  const source = app.slice(app.indexOf(`  class ${name}`), app.indexOf(end, app.indexOf(`  class ${name}`)));
```

Copies a portion of `app` (app), from calls `app.indexOf` with a text template that combines fixed text with computed values `name` (name) up to but excluding calls `app.indexOf` with `end` (end); calls `app.indexOf` with a text template that combines fixed text with computed values `name` (name); stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 10

```text
  const fx = new Proxy({}, { get: () => () => {} });
```

Constructs a new instance of `Proxy` with an object with fields ; an object with fields get: a callback taking no parameters that a callback taking no parameters that runs its enclosed statements; stores the result in `fx`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 11

```text
  const context = { window: {GameRules, SlotBetRules, XP: { addWagerXP() {} }}, FX: fx, JackpotManager: {contribute(){}}, setTimeout: done => done(), console };
```

An object with fields window: an object with fields GameRules: `GameRules` (game rules); SlotBetRules: `SlotBetRules` (slot bet rules); XP: an object with fields addWagerXP: a callback taking no parameters that runs its enclosed statements; FX: `fx` (fx); JackpotManager: an object with fields contribute: a callback taking no parameters that runs its enclosed statements; setTimeout: a callback taking done that calls `done` with no arguments; console: `console` (console); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 12

```text
  return vm.runInNewContext(`${source}\n${name}`, context);
```

Returns calls `vm.runInNewContext` with a text template that combines fixed text with computed values `source` (source), `name` (name); `context` (context) to the caller and exits this function.

### Line 13

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 14

```text
function element() {
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 15

```text
  return { textContent: '', disabled: false, className: '', style: {}, classList: {add(){},remove(){},replace(){},toggle(){}}, setAttribute(){},addEventListener(){},removeEventListener(){},dataset:{} };
```

Returns an object with fields textContent: ""; disabled: false; className: ""; style: an object with fields ; classList: an object with fields add: a callback taking no parameters that runs its enclosed statements; remove: a callback taking no parameters that runs its enclosed statements; replace: a callback taking no parameters that runs its enclosed statements; toggle: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.

### Line 16

```text
}
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 17

```text
function hub(balance=100) { return {balance,player:{maxBet:100},modifyBalance(amount){this.balance=Math.round((this.balance+amount)*100)/100;},updateGlobalUI(){}}; }
```

This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.

### Line 18

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 19

```text
test('three-coin flip requires all predictions, rejects zero bet, and pays once even on duplicate call', async () => {
```

This test names the behavior under protection: three-coin flip requires all predictions, rejects zero bet, and pays once even on duplicate call.

### Line 20

```text
  const Coin = engine('CoinTossEngine', '  class ThreeCoinToss');
```

Calls `engine` with "CoinTossEngine"; "  class ThreeCoinToss"; stores the result in `Coin`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 21

```text
  const game = Object.create(Coin.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 22

```text
  Object.assign(game, { hub:hub(), triple:true,bet:10, choices:['HEADS',null,'HEADS'],isFlipping:false,coins:[element(),element(),element()],choiceButtons:[],betEl:element(),statusEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element() });
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 23

```text
  await game.startFlip(); assert.equal(game.hub.balance,100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly.

### Line 24

```text
  game.choices=['HEADS','HEADS','HEADS']; game.bet=0;
```

Sets `game.choices` (the choices property of game) to an array containing "HEADS", "HEADS", "HEADS".

### Line 25

```text
  await game.startFlip(); assert.equal(game.hub.balance,100);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly.

### Line 26

```text
  game.bet=10;
```

Sets `game.bet` (the bet property of game) to 10.

### Line 27

```text
  // All outcomes are made deterministic by overriding only this VM's random source.
```

This comment defines the test boundary and explains why the isolated fixture is safe: All outcomes are made deterministic by overriding only this VM's random source.

### Line 28

```text
  const contextSource = app.slice(app.indexOf('  class CoinTossEngine'),app.indexOf('  class ThreeCoinToss'));
```

Copies a portion of `app` (app), from calls `app.indexOf` with "  class CoinTossEngine" up to but excluding calls `app.indexOf` with "  class ThreeCoinToss"; stores the result in `contextSource`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 29

```text
  const Fixed = vm.runInNewContext(`${contextSource}\nCoinTossEngine`, {window:{GameRules,SlotBetRules,XP:{addWagerXP(){}}},FX:new Proxy({}, {get:()=>()=>{}}),JackpotManager:{contribute(){}},Math:Object.assign(Object.create(Math),{random:()=>0.75}),setTimeout:done=>done()});
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 30

```text
  Object.setPrototypeOf(game,Fixed.prototype);
```

Calls `Object.setPrototypeOf` with `game` (game); `Fixed.prototype` (the prototype property of Fixed).

### Line 31

```text
  const first=game.startFlip(); const second=game.startFlip();
```

Calls `game.startFlip` with no arguments; stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 32

```text
  await Promise.all([first,second]);
```

This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.

### Line 33

```text
  assert.equal(game.hub.balance,120);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,120)`; it requires that virtual-money and wager rule to match exactly.

### Line 34

```text
  assert.match(game.statusEl.textContent,/3\/3 correct/);
```

This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.

### Line 35

```text
  assert.equal(game.isFlipping,false);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.isFlipping,false)`; it requires that observable game or persistence rule to match exactly.

### Line 36

```text
  game.bet=0;game.updateUI();assert.equal(game.flipBtn.disabled,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.flipBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.

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
test('Max remains available when an old wager exceeds the remaining table balance', () => {
```

This test names the behavior under protection: Max remains available when an old wager exceeds the remaining table balance.

### Line 40

```text
  const Coin=engine('CoinTossEngine','  class ThreeCoinToss');
```

Calls `engine` with "CoinTossEngine"; "  class ThreeCoinToss"; stores the result in `Coin`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 41

```text
  const game=Object.create(Coin.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 42

```text
  Object.assign(game,{hub:hub(43.27),bet:100,choices:['HEADS'],isFlipping:false,choiceButtons:[],betEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 43

```text
  game.updateUI(); assert.equal(game.maxBtn.disabled,false); assert.equal(game.flipBtn.disabled,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,false)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.flipBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.

### Line 44

```text
  game.isFlipping=true;game.updateUI();assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.clearBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.

### Line 45

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.

### Line 46

```text

```

Blank line separates test setup from the next scenario for readability.

### Line 47

```text
test('blackjack will not deal a free hand or change active-round wagers', () => {
```

This test names the behavior under protection: blackjack will not deal a free hand or change active-round wagers.

### Line 48

```text
  const BJ=engine('BlackjackEngine','  // ==========================================');
```

Calls `engine` with "BlackjackEngine"; "  // =========================================="; stores the result in `BJ`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 49

```text
  const game=Object.create(BJ.prototype);
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 50

```text
  Object.assign(game,{hub:hub(),bet:0,gameState:'BETTING',betEl:element(),dealBtn:element(),hitBtn:element(),standBtn:element(),doubleBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
```

This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.

### Line 51

```text
  game.startHand();assert.equal(game.hub.balance,100);assert.equal(game.gameState,'BETTING');
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.gameState,'BETTING')`; it requires that observable game or persistence rule to match exactly.

### Line 52

```text
  game.updateUI();assert.equal(game.dealBtn.disabled,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.dealBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.

### Line 53

```text
  game.bet=10;game.gameState='PLAYER_TURN';game.playerHand=[];game.updateUI();
```

Sets `game.bet` (the bet property of game) to 10.

### Line 54

```text
  assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
```

This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.clearBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.

### Line 55

```text
});
```

This closes the test/helper block containing the setup and its behavior checks.
