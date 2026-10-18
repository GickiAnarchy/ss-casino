const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const GameRules = require('../src/js/game-rules.js');
const SlotBetRules = require('../src/js/slot-bet-rules.js');
const app = fs.readFileSync(require.resolve('../src/js/app.js'), 'utf8');
function engine(name, end) {
  const source = app.slice(app.indexOf(`  class ${name}`), app.indexOf(end, app.indexOf(`  class ${name}`)));
  const fx = new Proxy({}, { get: () => () => {} });
  const context = { window: {GameRules, SlotBetRules, XP: { addWagerXP() {} }}, FX: fx, JackpotManager: {contribute(){}}, setTimeout: done => done(), console };
  return vm.runInNewContext(`${source}\n${name}`, context);
}
function element() {
  return { textContent: '', disabled: false, className: '', style: {}, classList: {add(){},remove(){},replace(){},toggle(){}}, setAttribute(){},addEventListener(){},removeEventListener(){},dataset:{} };
}
function hub(balance=100) { return {balance,player:{maxBet:100},modifyBalance(amount){this.balance=Math.round((this.balance+amount)*100)/100;},updateGlobalUI(){}}; }

test('three-coin flip requires all predictions, rejects zero bet, and pays once even on duplicate call', async () => {
  const Coin = engine('CoinTossEngine', '  class ThreeCoinToss');
  const game = Object.create(Coin.prototype);
  Object.assign(game, { hub:hub(), triple:true,bet:10, choices:['HEADS',null,'HEADS'],isFlipping:false,coins:[element(),element(),element()],choiceButtons:[],betEl:element(),statusEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element() });
  await game.startFlip(); assert.equal(game.hub.balance,100);
  game.choices=['HEADS','HEADS','HEADS']; game.bet=0;
  await game.startFlip(); assert.equal(game.hub.balance,100);
  game.bet=10;
  // All outcomes are made deterministic by overriding only this VM's random source.
  const contextSource = app.slice(app.indexOf('  class CoinTossEngine'),app.indexOf('  class ThreeCoinToss'));
  const Fixed = vm.runInNewContext(`${contextSource}\nCoinTossEngine`, {window:{GameRules,SlotBetRules,XP:{addWagerXP(){}}},FX:new Proxy({}, {get:()=>()=>{}}),JackpotManager:{contribute(){}},Math:Object.assign(Object.create(Math),{random:()=>0.75}),setTimeout:done=>done()});
  Object.setPrototypeOf(game,Fixed.prototype);
  const first=game.startFlip(); const second=game.startFlip();
  await Promise.all([first,second]);
  assert.equal(game.hub.balance,120);
  assert.match(game.statusEl.textContent,/3\/3 correct/);
  assert.equal(game.isFlipping,false);
  game.bet=0;game.updateUI();assert.equal(game.flipBtn.disabled,true);
});

test('Max remains available when an old wager exceeds the remaining table balance', () => {
  const Coin=engine('CoinTossEngine','  class ThreeCoinToss');
  const game=Object.create(Coin.prototype);
  Object.assign(game,{hub:hub(43.27),bet:100,choices:['HEADS'],isFlipping:false,choiceButtons:[],betEl:element(),flipBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
  game.updateUI(); assert.equal(game.maxBtn.disabled,false); assert.equal(game.flipBtn.disabled,true);
  game.isFlipping=true;game.updateUI();assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
});

test('blackjack will not deal a free hand or change active-round wagers', () => {
  const BJ=engine('BlackjackEngine','  // ==========================================');
  const game=Object.create(BJ.prototype);
  Object.assign(game,{hub:hub(),bet:0,gameState:'BETTING',betEl:element(),dealBtn:element(),hitBtn:element(),standBtn:element(),doubleBtn:element(),maxBtn:element(),clearBtn:element(),minusBtn:element(),plusBtn:element()});
  game.startHand();assert.equal(game.hub.balance,100);assert.equal(game.gameState,'BETTING');
  game.updateUI();assert.equal(game.dealBtn.disabled,true);
  game.bet=10;game.gameState='PLAYER_TURN';game.playerHand=[];game.updateUI();
  assert.equal(game.clearBtn.disabled,true);assert.equal(game.maxBtn.disabled,true);
});
