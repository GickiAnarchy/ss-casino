// Guard the lobby grouping contract and static asset paths without adding a DOM dependency to this vanilla project.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const projectRoot = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf8');
const catalog = fs.readFileSync(path.join(projectRoot, 'src/js/slot-templates.js'), 'utf8');

function sectionBetween(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(start, -1, `Missing start marker: ${startMarker}`);
  assert.notEqual(end, -1, `Missing end marker: ${endMarker}`);
  return source.slice(start, end);
}

test('the original classic and five-reel slot cards live in the dedicated Slot Room', () => {
  const slotRoom = sectionBetween(html, '<section class="lobby-slot-room"', '<!-- These cards intentionally exclude');
  assert.match(slotRoom, /data-game="classic-slots"/);
  assert.match(slotRoom, /data-game="5reel-slots"/);
  assert.match(slotRoom, /class="slot-room-grid"/);
});

test('the general lobby grid contains only non-slot games', () => {
  const generalGrid = sectionBetween(html, '<div class="game-grid">', '<section class="lobby-services-room"');
  assert.match(generalGrid, /data-game="coin-toss"/);
  assert.match(generalGrid, /data-game="blackjack"/);
  assert.match(generalGrid, /data-game="horse-racing"/);
  assert.doesNotMatch(generalGrid, /data-game="(?:classic-slots|5reel-slots|penny-slots|quarter-slots|quarter-gem-quest)"/);
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
