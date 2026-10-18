// Guard the lobby grouping contract and static asset paths without adding a DOM
// dependency to this vanilla project.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const catalog = fs.readFileSync(path.join(projectRoot, 'src/js/slot-templates.js'), 'utf8');

function elementByClass(source, tag, className, from = 0) {
  const opening = new RegExp(`<${tag}\\b[^>]*\\bclass=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i');
  const match = opening.exec(source.slice(from));
  assert.ok(match, `Missing ${tag}.${className}`);
  const start = from + match.index;
  const tokenPattern = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  tokenPattern.lastIndex = start + match[0].length;
  let depth = 1;
  let token;
  while ((token = tokenPattern.exec(source))) {
    if (token[0][1] === '/') depth -= 1;
    else if (!/\/\s*>$/.test(token[0])) depth += 1;
    if (depth === 0) return source.slice(start, tokenPattern.lastIndex);
  }
  assert.fail(`Unclosed ${tag}.${className}`);
}

function lobbyMarkup() {
  const start = html.indexOf('<section id="view-lobby"');
  assert.notEqual(start, -1, 'Missing lobby view');
  return elementByClass(html.slice(start), 'section', 'view-screen');
}

function dataGames(source) {
  return [...source.matchAll(/data-game="([^"]+)"/g)].map(match => match[1]);
}

test('the original classic and five-reel slot cards live in the dedicated Slot Room', () => {
  const slotRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-slot-room');
  assert.match(slotRoom, /data-game="classic-slots"/);
  assert.match(slotRoom, /data-game="5reel-slots"/);
  assert.match(slotRoom, /class="slot-room-grid"/);
});

test('the general lobby grid contains only non-slot, non-coin games', () => {
  const lobby = lobbyMarkup();
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
  const coinRoomStart = lobby.indexOf(coinRoom);
  const generalGrid = elementByClass(lobby, 'div', 'game-grid', coinRoomStart + coinRoom.length);
  assert.deepEqual(dataGames(generalGrid), ['blackjack', 'horse-racing']);
  assert.doesNotMatch(generalGrid, /data-game="(?:coin-toss|three-coin-toss|classic-slots|5reel-slots|penny-slots|quarter-slots|quarter-gem-quest)"/);
});

test('the two coin game links appear only inside the dedicated Coin Flip Room', () => {
  const lobby = lobbyMarkup();
  const coinRoom = elementByClass(lobby, 'section', 'lobby-coin-room');
  assert.deepEqual(dataGames(coinRoom), ['coin-toss', 'three-coin-toss']);
  assert.equal((html.match(/data-game="(?:coin-toss|three-coin-toss)"/g) || []).length, 2);
});

test('lobby room heading IDs are unique and referenced by their room sections', () => {
  const lobby = lobbyMarkup();
  const ids = [...lobby.matchAll(/<h3\b[^>]*\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length, 'Lobby heading IDs must be unique');
  for (const labelledBy of [...lobby.matchAll(/<section\b[^>]*\baria-labelledby="([^"]+)"/g)].map(match => match[1])) {
    assert.ok(ids.includes(labelledBy), `aria-labelledby must target a lobby heading: ${labelledBy}`);
  }
  assert.match(lobby, /<section class="lobby-coin-room"\s[^>]*aria-labelledby="coin-room-title"/);
  assert.match(lobby, /<h3\b[^>]*id="coin-room-title"/);
});

test('nested structural tags in the lobby are balanced and properly nested', () => {
  const stack = [];
  const structural = /<!--[^]*?-->|<\/?(section|details|summary|div|article)\b[^>]*>/gi;
  for (const match of lobbyMarkup().matchAll(structural)) {
    if (match[0].startsWith('<!--')) continue;
    const [, tag] = match;
    if (match[0][1] === '/') assert.equal(stack.pop(), tag.toLowerCase(), `Mismatched closing tag: ${match[0]}`);
    else if (!/\/\s*>$/.test(match[0])) stack.push(tag.toLowerCase());
  }
  assert.deepEqual(stack, [], 'Lobby structural tags must be balanced');
});

test('coin cards use card-icon, including the three-coin marker', () => {
  const coinRoom = elementByClass(lobbyMarkup(), 'section', 'lobby-coin-room');
  assert.doesNotMatch(coinRoom, /class="game-icon"/);
  assert.equal((coinRoom.match(/class="card-icon"/g) || []).length, 2);
  assert.match(coinRoom, /<div class="card-icon"[^>]*>3×<\/div>/);
});

test('catalog-driven themed machines render into the same Slot Room grid', () => {
  const gameList = catalog.match(/const games = \[([\s\S]*?)\n  \];/);
  assert.ok(gameList, 'The themed machine catalog should be present');
  const ids = [...gameList[1].matchAll(/id: '([^']+)'/g)].map(match => match[1]);
  assert.deepEqual(ids, ['penny-slots', 'quarter-slots', 'quarter-gem-quest']);
  assert.match(catalog, /document\.querySelector\('\.slot-room-grid'\)/);
});

test('every local script, stylesheet, and image referenced by the root page exists', () => {
  const references = [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)]
    .map(match => match[1].split('?')[0])
    .filter(reference => !/^(?:[a-z]+:|#|\/\/)/i.test(reference));
  assert.ok(references.length > 0, 'The entry point should reference local assets');
  for (const reference of references) {
    assert.ok(fs.existsSync(path.join(projectRoot, reference)), `Missing local page asset: ${reference}`);
  }
});
