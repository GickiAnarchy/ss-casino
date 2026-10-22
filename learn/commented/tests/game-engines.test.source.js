// Original L1: This imports node:test so the test exercises the real game/persistence API rather than a duplicate.
const test = require('node:test');
// Original L2: This imports node:assert/strict so the test exercises the real game/persistence API rather than a duplicate.
const assert = require('node:assert/strict');
// Original L3: This imports node:fs so the test exercises the real game/persistence API rather than a duplicate.
const fs = require('node:fs');
// Original L4: This imports node:vm so the test exercises the real game/persistence API rather than a duplicate.
const vm = require('node:vm');
// Original L5: This imports ../src/js/game-rules.js so the test exercises the real game/persistence API rather than a duplicate.
const GameRules = require('../src/js/game-rules.js');
// Original L6: This imports ../src/js/slot-bet-rules.js so the test exercises the real game/persistence API rather than a duplicate.
const SlotBetRules = require('../src/js/slot-bet-rules.js');
// Original L7: Calls `fs.readFileSync` with calls `require.resolve` with "../src/js/app.js"; "utf8"; stores the result in `app`. const prevents reassignment of this binding, not mutation inside its object/array.
const app = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
// Original L8: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function engine(name, end) {
// Original L9: Copies a portion of `app` (app), from calls `app.indexOf` with a text template that combines fixed text with computed values `name` (name) up to but excluding calls `app.indexOf` with `end` (end); calls `app.indexOf` with a text template that combines fixed text with computed values `name` (name); stores the result in `source`. const prevents reassignment of this binding, not mutation inside its object/array.
  const source = app.slice(app.indexOf(`  class ${name}`), app.indexOf(end, app.indexOf(`  class ${name}`)));
// Original L10: Constructs a new instance of `Proxy` with an object with fields ; an object with fields get: a callback taking no parameters that a callback taking no parameters that runs its enclosed statements; stores the result in `fx`. const prevents reassignment of this binding, not mutation inside its object/array.
  const fx = new Proxy({}, { get: () => () => {} });
// Original L11: An object with fields window: an object with fields GameRules: `GameRules` (game rules); SlotBetRules: `SlotBetRules` (slot bet rules); XP: an object with fields addWagerXP: a callback taking no parameters that runs its enclosed statements; FX: `fx` (fx); JackpotManager: an object with fields contribute: a callback taking no parameters that runs its enclosed statements; setTimeout: a callback taking done that calls `done` with no arguments; console: `console` (console); stores the result in `context`. const prevents reassignment of this binding, not mutation inside its object/array.
  const context = { window: {GameRules, SlotBetRules, XP: { addWagerXP() {} }}, FX: fx, JackpotManager: {contribute(){}}, setTimeout: done => done(), console };
// Original L12: Returns calls `vm.runInNewContext` with a text template that combines fixed text with computed values `source` (source), `name` (name); `context` (context) to the caller and exits this function.
  return vm.runInNewContext(`${source}\n${name}`, context);
// Original L13: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L14: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function element() {
// Original L15: Returns an object with fields textContent: ""; disabled: false; className: ""; style: an object with fields ; classList: an object with fields add: a callback taking no parameters that runs its enclosed statements; remove: a callback taking no parameters that runs its enclosed statements; replace: a callback taking no parameters that runs its enclosed statements; toggle: a callback taking no parameters that runs its enclosed statements; setAttribute: a callback taking no parameters that runs its enclosed statements; and further fields to the caller and exits this function.
  return { textContent: '', disabled: false, className: '', style: {}, classList: {add(){},remove(){},replace(){},toggle(){}}, setAttribute(){},addEventListener(){},removeEventListener(){},dataset:{} };
// Original L16: This closes the test/helper block containing the setup and its behavior checks.
}
// Original L17: This helper creates a repeatable fixture or derived observation, keeping the scenario focused on one casino rule.
function hub(balance=100) { return {balance,player:{maxBet:100},modifyBalance(amount){this.balance=Math.round((this.balance+amount)*100)/100;},updateGlobalUI(){}}; }
// Original L18: Blank line separates test setup from the next scenario for readability.

// Original L19: This test names the behavior under protection: three-coin flip requires all predictions, rejects zero bet, and pays once even on duplicate call.
test('three-coin flip requires all predictions, rejects zero bet, and pays once even on duplicate call', async () => {
// Original L20: Calls `engine` with "CoinTossEngine"; "  class ThreeCoinToss"; stores the result in `Coin`. const prevents reassignment of this binding, not mutation inside its object/array.
  const Coin = engine('CoinTossEngine', '  class ThreeCoinToss');
// Original L21: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const game = Object.create(Coin.prototype);
// Original L22: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  Object.assign(game, { hub:hub(), triple:true,bet:10, choices:['HEADS',null,'HEADS'],isFlipping:false,coins:[element(),element(),element()],choiceButtons:[],betEl:element(),statusEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element() });
// Original L23: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly.
  await game.startFlip(); assert.equal(game.hub.balance,100);
// Original L24: Sets `game.choices` (the choices property of game) to an array containing "HEADS", "HEADS", "HEADS".
  game.choices=['HEADS','HEADS','HEADS']; game.bet=0;
// Original L25: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly.
  await game.startFlip(); assert.equal(game.hub.balance,100);
// Original L26: Sets `game.bet` (the bet property of game) to 10.
  game.bet=10;
// Original L27: This comment defines the test boundary and explains why the isolated fixture is safe: All outcomes are made deterministic by overriding only this VM's random source.
  // All outcomes are made deterministic by overriding only this VM's random source.
// Original L28: Copies a portion of `app` (app), from calls `app.indexOf` with "  class CoinTossEngine" up to but excluding calls `app.indexOf` with "  class ThreeCoinToss"; stores the result in `contextSource`. const prevents reassignment of this binding, not mutation inside its object/array.
  const contextSource = app.slice(app.indexOf('  class CoinTossEngine'),app.indexOf('  class ThreeCoinToss'));
// Original L29: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const Fixed = vm.runInNewContext(`${contextSource}\nCoinTossEngine`, {window:{GameRules,SlotBetRules,XP:{addWagerXP(){}}},FX:new Proxy({}, {get:()=>()=>{}}),JackpotManager:{contribute(){}},Math:Object.assign(Object.create(Math),{random:()=>0.75}),setTimeout:done=>done()});
// Original L30: Calls `Object.setPrototypeOf` with `game` (game); `Fixed.prototype` (the prototype property of Fixed).
  Object.setPrototypeOf(game,Fixed.prototype);
// Original L31: Calls `game.startFlip` with no arguments; stores the result in `first`. const prevents reassignment of this binding, not mutation inside its object/array.
  const first=game.startFlip(); const second=game.startFlip();
// Original L32: This waits for settlement or storage to finish before inspecting state, so the result describes durable behavior rather than an intermediate animation.
  await Promise.all([first,second]);
// Original L33: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,120)`; it requires that virtual-money and wager rule to match exactly.
  assert.equal(game.hub.balance,120);
// Original L34: This assertion checks player-facing text or markup against the required pattern, proving the UI communicates the correct game phase or grouping.
  assert.match(game.statusEl.textContent,/3\/3 correct/);
// Original L35: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.isFlipping,false)`; it requires that observable game or persistence rule to match exactly.
  assert.equal(game.isFlipping,false);
// Original L36: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.flipBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.
  game.bet=0;game.updateUI();assert.equal(game.flipBtn.disabled,true);
// Original L37: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L38: Blank line separates test setup from the next scenario for readability.

// Original L39: This test names the behavior under protection: Max remains available when an old wager exceeds the remaining table balance.
test('Max remains available when an old wager exceeds the remaining table balance', () => {
// Original L40: Calls `engine` with "CoinTossEngine"; "  class ThreeCoinToss"; stores the result in `Coin`. const prevents reassignment of this binding, not mutation inside its object/array.
  const Coin=engine('CoinTossEngine','  class ThreeCoinToss');
// Original L41: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const game=Object.create(Coin.prototype);
// Original L42: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  Object.assign(game,{hub:hub(43.27),bet:100,choices:['HEADS'],isFlipping:false,choiceButtons:[],betEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
// Original L43: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,false)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.flipBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.
  game.updateUI(); assert.equal(game.maxBtn.disabled,false); assert.equal(game.flipBtn.disabled,true);
// Original L44: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.clearBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.
  game.isFlipping=true;game.updateUI();assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
// Original L45: This closes the test/helper block containing the setup and its behavior checks.
});
// Original L46: Blank line separates test setup from the next scenario for readability.

// Original L47: This test names the behavior under protection: blackjack will not deal a free hand or change active-round wagers.
test('blackjack will not deal a free hand or change active-round wagers', () => {
// Original L48: Calls `engine` with "BlackjackEngine"; "  // =========================================="; stores the result in `BJ`. const prevents reassignment of this binding, not mutation inside its object/array.
  const BJ=engine('BlackjackEngine','  // ==========================================');
// Original L49: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  const game=Object.create(BJ.prototype);
// Original L50: This builds an isolated browser-like object with only the APIs needed, avoiding real DOM, storage, and player data.
  Object.assign(game,{hub:hub(),bet:0,gameState:'BETTING',betEl:element(),dealBtn:element(),hitBtn:element(),standBtn:element(),doubleBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
// Original L51: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.hub.balance,100)`; it requires that virtual-money and wager rule to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.gameState,'BETTING')`; it requires that observable game or persistence rule to match exactly.
  game.startHand();assert.equal(game.hub.balance,100);assert.equal(game.gameState,'BETTING');
// Original L52: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.dealBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.
  game.updateUI();assert.equal(game.dealBtn.disabled,true);
// Original L53: Sets `game.bet` (the bet property of game) to 10.
  game.bet=10;game.gameState='PLAYER_TURN';game.playerHand=[];game.updateUI();
// Original L54: This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.clearBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly. This equal assertion compares the actual expression and expected argument(s) shown in `assert.equal(game.maxBtn.disabled,true)`; it requires that player-facing UI guardrail to match exactly.
  assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
// Original L55: This closes the test/helper block containing the setup and its behavior checks.
});
