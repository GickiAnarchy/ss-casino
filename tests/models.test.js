// These focused tests protect the model's safe defaults and, especially, old saved balances during code reorganization.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const context = { window: {} };
const source = fs.readFileSync(path.join(__dirname, '../src/js/models.js'), 'utf8');
const Player = vm.runInNewContext(`${source}\nPlayer`, context);

test('a new Player starts at $100', () => {
  assert.equal(new Player().balance, 100);
});

test('loading an existing profile keeps its saved bankroll', () => {
  assert.equal(Player.fromProfile({ balance: 1000 }).balance, 1000);
});
