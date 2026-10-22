# index.html

[Exact copy](../original/index.html)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
<!DOCTYPE html>
```

Declares HTML5 so the browser uses standards mode.

### Line 2

```text
<html lang="en">
```

<html> is a html with lang='en'.

### Line 3

```text
<head>
```

<head> is a head.

### Line 4

```text
  <!-- Keep the public entry point at the repository root for GitHub Pages. Deferred scripts execute in this order after HTML parsing, so each global API exists before its dependants and before app.js boots. -->
```

Comment: Keep the public entry point at the repository root for GitHub Pages. Deferred scripts execute in this order after HTML parsing, so each global API exists before its dependants and before app.js boots..

### Line 5

```text
  <meta charset="UTF-8">
```

<meta> is a document metadata with charset='UTF-8'.

### Line 6

```text
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

<meta> is a document metadata with name='viewport', content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'.

### Line 7

```text
  <title>S&S Casino Hub — Simulated Racing</title>
```

<title> is a title with S, S, Casino, Hub, Simulated, Racing, title and displays 'S&S Casino Hub — Simulated Racing'.

### Line 8

```text
  <link rel="stylesheet" href="src/css/style.css?v=coin-room-20261018">
```

<link> is a external stylesheet link with rel='stylesheet', href='src/css/style.css?v=coin-room-20261018'.

### Line 9

```text
  <script src="src/js/models.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/models.js?v=local-games-20261018', defer, script.

### Line 10

```text
  <script src="src/js/local-save.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/local-save.js?v=local-games-20261018', defer, script.

### Line 11

```text
  <script src="src/js/profiles.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/profiles.js?v=local-games-20261018', defer, script.

### Line 12

```text
  <script src="src/js/race-engine.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/race-engine.js?v=local-games-20261018', defer, script.

### Line 13

```text
  <script src="src/js/slot-bet-rules.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/slot-bet-rules.js?v=local-games-20261018', defer, script.

### Line 14

```text
  <script src="src/js/slot-templates.js?v=slot-themes-20261016" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/slot-templates.js?v=slot-themes-20261016', defer, script.

### Line 15

```text
  <script src="src/js/slot-outcomes.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/slot-outcomes.js?v=local-games-20261018', defer, script.

### Line 16

```text
  <script src="src/js/game-rules.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/game-rules.js?v=local-games-20261018', defer, script.

### Line 17

```text
  <script src="src/js/accomplishments.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/accomplishments.js?v=local-games-20261018', defer, script.

### Line 18

```text
  <script src="src/js/app.js?v=local-games-20261018" defer></script>
```

<script> is a deferred JavaScript dependency with src='src/js/app.js?v=local-games-20261018', defer, script.

### Line 19

```text
</head>
```

Closes the head element opened by the surrounding markup.

### Line 20

```text
<body>
```

<body> is a body.

### Line 21

```text

```

Blank line separates nearby markup sections.

### Line 22

```text
  <!-- Fullscreen Particle FX Canvas -->
```

Comment: Fullscreen Particle FX Canvas.

### Line 23

```text
  <canvas id="fx-canvas"></canvas>
```

<canvas> is a drawing surface with id='fx-canvas', canvas.

### Line 24

```text

```

Blank line separates nearby markup sections.

### Line 25

```text
  <div id="startup-overlay" class="startup-overlay" role="status" aria-live="polite">
```

<div> is a layout container with id='startup-overlay', class='startup-overlay', role='status', aria-live='polite'.

### Line 26

```text
    <div class="startup-card">
```

<div> is a layout container with class='startup-card'.

### Line 27

```text
      <span class="startup-spinner" aria-hidden="true"></span>
```

<span> is a inline status/text element with class='startup-spinner', aria-hidden='true', span.

### Line 28

```text
      <span id="startup-message">Loading your local save…</span>
```

<span> is a inline status/text element with id='startup-message', Loading, your, local, save, span and displays 'Loading your local save…'.

### Line 29

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 30

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 31

```text

```

Blank line separates nearby markup sections.

### Line 32

```text
  <div id="profile-gate" class="profile-gate" role="dialog" aria-modal="true" aria-labelledby="profile-gate-title">
```

<div> is a layout container with id='profile-gate', class='profile-gate', role='dialog', aria-modal='true', aria-labelledby='profile-gate-title'.

### Line 33

```text
    <div class="profile-card">
```

<div> is a layout container with class='profile-card'.

### Line 34

```text
      <div id="profile-gate-content"></div>
```

<div> is a layout container with id='profile-gate-content', div.

### Line 35

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 36

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 37

```text

```

Blank line separates nearby markup sections.

### Line 38

```text
  <!-- Global Casino Header -->
```

Comment: Global Casino Header.

### Line 39

```text
  <header class="global-bar">
```

<header> is a header region with class='global-bar'.

### Line 40

```text
    <div class="logo-area">
```

<div> is a layout container with class='logo-area'.

### Line 41

```text
      <div class="logo-title">Sluts and Slots</div>
```

<div> is a layout container with class='logo-title', Sluts, and, Slots, div and displays 'Sluts and Slots'.

### Line 42

```text
      <!-- Progressive Jackpot Ticker moved right under the title for compactness -->
```

Comment: Progressive Jackpot Ticker moved right under the title for compactness.

### Line 43

```text
      <div class="jackpot-ticker-container">
```

<div> is a layout container with class='jackpot-ticker-container'.

### Line 44

```text
        <span class="jackpot-label">JACKPOT</span>
```

<span> is a inline status/text element with class='jackpot-label', JACKPOT, span and displays 'JACKPOT'.

### Line 45

```text
        <span id="global-jackpot" class="jackpot-amount">$10,000.00</span>
```

<span> is a inline status/text element with id='global-jackpot', class='jackpot-amount', 10, 000, 00, span and displays '$10,000.00'.

### Line 46

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 47

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 48

```text

```

Blank line separates nearby markup sections.

### Line 49

```text
    <!-- XP Level & Progress Header Widget -->
```

Comment: XP Level & Progress Header Widget.

### Line 50

```text
    <div class="xp-header-widget">
```

<div> is a layout container with class='xp-header-widget'.

### Line 51

```text
      <div class="level-badge" id="player-level-badge">LVL 1</div>
```

<div> is a layout container with class='level-badge', id='player-level-badge', LVL, 1, div and displays 'LVL 1'.

### Line 52

```text
      <div class="xp-bar-container">
```

<div> is a layout container with class='xp-bar-container'.

### Line 53

```text
        <div class="xp-bar-fill" id="xp-bar-fill" style="width: 0%;"></div>
```

<div> is a layout container with class='xp-bar-fill', id='xp-bar-fill', style='width: 0%;', div.

### Line 54

```text
        <span class="xp-bar-text" id="xp-bar-text">0 / 100 XP</span>
```

<span> is a inline status/text element with class='xp-bar-text', id='xp-bar-text', 0, 100, XP, span and displays '0 / 100 XP'.

### Line 55

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 56

```text
      <span class="vip-tier-tag" id="vip-tier-tag">BRONZE</span>
```

<span> is a inline status/text element with class='vip-tier-tag', id='vip-tier-tag', BRONZE, span and displays 'BRONZE'.

### Line 57

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 58

```text

```

Blank line separates nearby markup sections.

### Line 59

```text
    <div class="header-right">
```

<div> is a layout container with class='header-right'.

### Line 60

```text
      <button id="btn-profile-manager" class="profile-header-btn" type="button" aria-label="Switch local profile">👤 <span id="active-profile-name">Profile</span></button>
```

<button> is a interactive button with id='btn-profile-manager', class='profile-header-btn', type='button', aria-label='Switch local profile', span, id='active-profile-name', Profile, span, button and displays '👤 Profile'.

### Line 61

```text
      <button id="btn-open-settings" class="icon-btn" type="button" title="Casino Settings">⚙️</button>
```

<button> is a interactive button with id='btn-open-settings', class='icon-btn', type='button', title='Casino Settings', button and displays '⚙️'.

### Line 62

```text
      <div class="wallet-display">
```

<div> is a layout container with class='wallet-display'.

### Line 63

```text
        <span class="wallet-label">BALANCE</span>
```

<span> is a inline status/text element with class='wallet-label', BALANCE, span and displays 'BALANCE'.

### Line 64

```text
          <span id="global-balance" class="wallet-amount">$100.00</span>
```

<span> is a inline status/text element with id='global-balance', class='wallet-amount', 100, 00, span and displays '$100.00'.

### Line 65

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 66

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 67

```text
  </header>
```

Closes the header element opened by the surrounding markup.

### Line 68

```text

```

Blank line separates nearby markup sections.

### Line 69

```text
  <aside id="race-result-notice" class="race-result-notice hidden-view" role="status" aria-live="polite">
```

<aside> is a complementary status region with id='race-result-notice', class='race-result-notice hidden-view', role='status', aria-live='polite'.

### Line 70

```text
    <p id="race-result-notice-text"></p>
```

<p> is a paragraph with id='race-result-notice-text', p.

### Line 71

```text
    <div class="race-result-actions">
```

<div> is a layout container with class='race-result-actions'.

### Line 72

```text
      <button id="btn-view-race-results" class="race-result-action-btn" type="button">View race results</button>
```

<button> is a interactive button with id='btn-view-race-results', class='race-result-action-btn', type='button', View, race, results, button and displays 'View race results'.

### Line 73

```text
      <button id="btn-dismiss-race-result" class="race-result-dismiss-btn" type="button">Dismiss</button>
```

<button> is a interactive button with id='btn-dismiss-race-result', class='race-result-dismiss-btn', type='button', Dismiss, button and displays 'Dismiss'.

### Line 74

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 75

```text
  </aside>
```

Closes the aside element opened by the surrounding markup.

### Line 76

```text

```

Blank line separates nearby markup sections.

### Line 77

```text
  <!-- LOCAL SAVE CONTROLS -->
```

Comment: LOCAL SAVE CONTROLS.

### Line 78

```text
  <div id="modal-local-save" class="modal-overlay hidden-view" role="dialog" aria-modal="true" aria-labelledby="local-save-title">
```

<div> is a layout container with id='modal-local-save', class='modal-overlay hidden-view', role='dialog', aria-modal='true', aria-labelledby='local-save-title'.

### Line 79

```text
    <div class="modal-card local-save-modal-card">
```

<div> is a layout container with class='modal-card local-save-modal-card'.

### Line 80

```text
      <button id="btn-close-local-save" class="modal-close-btn" type="button" aria-label="Close local save dialog">&times;</button>
```

<button> is a interactive button with id='btn-close-local-save', class='modal-close-btn', type='button', aria-label='Close local save dialog', times, button and displays '&times;'.

### Line 81

```text
      <h2 id="local-save-title">💾 LOCAL SAVE</h2>
```

<h2> is a section heading with id='local-save-title', LOCAL, SAVE, h2 and displays '💾 LOCAL SAVE'.

### Line 82

```text
      <p class="modal-subtitle">Game progress and preferences stay on this device.</p>
```

<p> is a paragraph with class='modal-subtitle', Game, progress, and, preferences, stay, on, this, device, p and displays 'Game progress and preferences stay on this device.'.

### Line 83

```text
      <div id="local-save-status" class="local-save-status" aria-live="polite" data-state="local">Saved automatically in this browser.</div>
```

<div> is a layout container with id='local-save-status', class='local-save-status', aria-live='polite', data-state='local', Saved, automatically, in, this, browser, div and displays 'Saved automatically in this browser.'.

### Line 84

```text
      <div class="local-save-actions">
```

<div> is a layout container with class='local-save-actions'.

### Line 85

```text
        <button id="btn-link-save-file" class="local-save-action-btn" type="button">Choose / link a save file</button>
```

<button> is a interactive button with id='btn-link-save-file', class='local-save-action-btn', type='button', Choose, link, a, save, file, button and displays 'Choose / link a save file'.

### Line 86

```text
        <button id="btn-export-save" class="local-save-secondary-btn" type="button">Download save backup</button>
```

<button> is a interactive button with id='btn-export-save', class='local-save-secondary-btn', type='button', Download, save, backup, button and displays 'Download save backup'.

### Line 87

```text
        <button id="btn-import-save" class="local-save-secondary-btn" type="button">Import save file</button>
```

<button> is a interactive button with id='btn-import-save', class='local-save-secondary-btn', type='button', Import, save, file, button and displays 'Import save file'.

### Line 88

```text
        <button id="btn-recover-legacy-save" class="local-save-secondary-btn hidden-view" type="button">Recover older local profile</button>
```

<button> is a interactive button with id='btn-recover-legacy-save', class='local-save-secondary-btn hidden-view', type='button', Recover, older, local, profile, button and displays 'Recover older local profile'.

### Line 89

```text
        <input id="local-save-import-input" type="file" accept=".json,application/json" hidden>
```

<input> is a form control with id='local-save-import-input', type='file', accept='.json,application/json', hidden.

### Line 90

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 91

```text
      <p class="local-save-note">Browser saves are automatic on this device. On supported desktop browsers, link a JSON file to keep it updated automatically. Otherwise, download a backup and import it when needed.</p>
```

<p> is a paragraph with class='local-save-note', Browser, saves, are, automatic, on, this, device, On, supported, desktop, browsers, link, a, JSON, file, to, keep, it, updated, automatically, Otherwise, download, a, backup, and, import, it, when, needed, p and displays 'Browser saves are automatic on this device. On supported desktop browsers, link a JSON file to keep it updated automatically. Otherwise, download a backup and import it when needed.'.

### Line 92

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 93

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 94

```text

```

Blank line separates nearby markup sections.

### Line 95

```text
  <!-- DAILY WHEEL MODAL OVERLAY -->
```

Comment: DAILY WHEEL MODAL OVERLAY.

### Line 96

```text
  <div id="modal-wheel" class="modal-overlay hidden-view">
```

<div> is a layout container with id='modal-wheel', class='modal-overlay hidden-view'.

### Line 97

```text
    <div class="modal-card wheel-modal-card">
```

<div> is a layout container with class='modal-card wheel-modal-card'.

### Line 98

```text
      <button id="btn-close-wheel" class="modal-close-btn">&times;</button>
```

<button> is a interactive button with id='btn-close-wheel', class='modal-close-btn', times, button and displays '&times;'.

### Line 99

```text
      <h2>🎡 DAILY LUCKY WHEEL</h2>
```

<h2> is a section heading with DAILY, LUCKY, WHEEL, h2 and displays '🎡 DAILY LUCKY WHEEL'.

### Line 100

```text
      <p class="modal-subtitle">Spin once every 24 hours to claim free bonus chips!</p>
```

<p> is a paragraph with class='modal-subtitle', Spin, once, every, 24, hours, to, claim, free, bonus, chips, p and displays 'Spin once every 24 hours to claim free bonus chips!'.

### Line 101

```text

```

Blank line separates nearby markup sections.

### Line 102

```text
      <div class="wheel-stage-container">
```

<div> is a layout container with class='wheel-stage-container'.

### Line 103

```text
        <div class="wheel-pointer">▼</div>
```

<div> is a layout container with class='wheel-pointer', div and displays '▼'.

### Line 104

```text
        <canvas id="wheel-canvas" width="320" height="320"></canvas>
```

<canvas> is a drawing surface with id='wheel-canvas', width='320', height='320', canvas.

### Line 105

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 106

```text

```

Blank line separates nearby markup sections.

### Line 107

```text
      <div class="wheel-action-area">
```

<div> is a layout container with class='wheel-action-area'.

### Line 108

```text
        <div id="wheel-cooldown-timer" class="cooldown-badge hidden-view">NEXT SPIN IN: 23:59:59</div>
```

<div> is a layout container with id='wheel-cooldown-timer', class='cooldown-badge hidden-view', NEXT, SPIN, IN:, 23:59:59, div and displays 'NEXT SPIN IN: 23:59:59'.

### Line 109

```text
        <button id="btn-spin-wheel" class="spin-wheel-btn">SPIN WHEEL NOW</button>
```

<button> is a interactive button with id='btn-spin-wheel', class='spin-wheel-btn', SPIN, WHEEL, NOW, button and displays 'SPIN WHEEL NOW'.

### Line 110

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 111

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 112

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 113

```text

```

Blank line separates nearby markup sections.

### Line 114

```text
  <!-- SETTINGS MODAL OVERLAY -->
```

Comment: SETTINGS MODAL OVERLAY.

### Line 115

```text
  <div id="modal-settings" class="modal-overlay hidden-view">
```

<div> is a layout container with id='modal-settings', class='modal-overlay hidden-view'.

### Line 116

```text
    <div class="modal-card">
```

<div> is a layout container with class='modal-card'.

### Line 117

```text
      <button id="btn-close-settings" class="modal-close-btn">&times;</button>
```

<button> is a interactive button with id='btn-close-settings', class='modal-close-btn', times, button and displays '&times;'.

### Line 118

```text
      <h2>⚙️ CASINO SETTINGS</h2>
```

<h2> is a section heading with CASINO, SETTINGS, h2 and displays '⚙️ CASINO SETTINGS'.

### Line 119

```text
      <p class="modal-subtitle">Customize sound effects and visual appearance.</p>
```

<p> is a paragraph with class='modal-subtitle', Customize, sound, effects, and, visual, appearance, p and displays 'Customize sound effects and visual appearance.'.

### Line 120

```text

```

Blank line separates nearby markup sections.

### Line 121

```text
      <div class="settings-section">
```

<div> is a layout container with class='settings-section'.

### Line 122

```text
        <h3>🔊 AUDIO MIXER</h3>
```

<h3> is a subheading with AUDIO, MIXER, h3 and displays '🔊 AUDIO MIXER'.

### Line 123

```text
        <div class="setting-row">
```

<div> is a layout container with class='setting-row'.

### Line 124

```text
          <label for="slider-volume">Master Volume</label>
```

<label> is a form label with for='slider-volume', Master, Volume, label and displays 'Master Volume'.

### Line 125

```text
          <div class="volume-control">
```

<div> is a layout container with class='volume-control'.

### Line 126

```text
            <input type="range" id="slider-volume" min="0" max="100" value="80">
```

<input> is a form control with type='range', id='slider-volume', min='0', max='100', value='80'.

### Line 127

```text
            <span id="volume-display-val">80%</span>
```

<span> is a inline status/text element with id='volume-display-val', 80, span and displays '80%'.

### Line 128

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 129

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 130

```text
        <div class="setting-row">
```

<div> is a layout container with class='setting-row'.

### Line 131

```text
          <label>Mute Sound Effects</label>
```

<label> is a form label with Mute, Sound, Effects, label and displays 'Mute Sound Effects'.

### Line 132

```text
          <button id="btn-toggle-mute" class="toggle-btn">MUTE: OFF</button>
```

<button> is a interactive button with id='btn-toggle-mute', class='toggle-btn', MUTE:, OFF, button and displays 'MUTE: OFF'.

### Line 133

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 134

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 135

```text

```

Blank line separates nearby markup sections.

### Line 136

```text
      <div class="settings-section">
```

<div> is a layout container with class='settings-section'.

### Line 137

```text
        <h3>🎨 VISUAL THEME</h3>
```

<h3> is a subheading with VISUAL, THEME, h3 and displays '🎨 VISUAL THEME'.

### Line 138

```text
        <div class="theme-selector-grid">
```

<div> is a layout container with class='theme-selector-grid'.

### Line 139

```text
          <button class="theme-btn active-theme" data-theme="vegas">
```

<button> is a interactive button with class='theme-btn active-theme', data-theme='vegas'.

### Line 140

```text
            <span class="theme-swatch swatch-vegas"></span>
```

<span> is a inline status/text element with class='theme-swatch swatch-vegas', span.

### Line 141

```text
            Vegas Purple
```

Text shown to players: Vegas Purple

### Line 142

```text
          </button>
```

Closes the button element opened by the surrounding markup.

### Line 143

```text
          <button class="theme-btn" data-theme="midnight">
```

<button> is a interactive button with class='theme-btn', data-theme='midnight'.

### Line 144

```text
            <span class="theme-swatch swatch-midnight"></span>
```

<span> is a inline status/text element with class='theme-swatch swatch-midnight', span.

### Line 145

```text
            Midnight Dark
```

Text shown to players: Midnight Dark

### Line 146

```text
          </button>
```

Closes the button element opened by the surrounding markup.

### Line 147

```text
          <button class="theme-btn" data-theme="gold">
```

<button> is a interactive button with class='theme-btn', data-theme='gold'.

### Line 148

```text
            <span class="theme-swatch swatch-gold"></span>
```

<span> is a inline status/text element with class='theme-swatch swatch-gold', span.

### Line 149

```text
            High Roller Gold
```

Text shown to players: High Roller Gold

### Line 150

```text
          </button>
```

Closes the button element opened by the surrounding markup.

### Line 151

```text
          <button class="theme-btn" data-theme="money">
```

<button> is a interactive button with class='theme-btn', data-theme='money'.

### Line 152

```text
            <span class="theme-swatch swatch-money"></span>
```

<span> is a inline status/text element with class='theme-swatch swatch-money', span.

### Line 153

```text
            Money Green
```

Text shown to players: Money Green

### Line 154

```text
          </button>
```

Closes the button element opened by the surrounding markup.

### Line 155

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 156

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 157

```text

```

Blank line separates nearby markup sections.

### Line 158

```text
      <div class="settings-section settings-reset-section">
```

<div> is a layout container with class='settings-section settings-reset-section'.

### Line 159

```text
        <h3>🛠️ CASINO DATA</h3> 
```

<h3> is a subheading with CASINO, DATA, h3 and displays '🛠️ CASINO DATA'.

### Line 160

```text
        <div class="data-row">
```

<div> is a layout container with class='data-row'.

### Line 161

```text
          <p class="settings-reset-note">Local save file import or export. Bind a file to save data to.</p>
```

<p> is a paragraph with class='settings-reset-note', Local, save, file, import, or, export, Bind, a, file, to, save, data, to, p and displays 'Local save file import or export. Bind a file to save data to.'.

### Line 162

```text
          <button id="btn-open-local-save" class="settings-reset-btn reset-data-btn" aria-label="Manage local saves">💾 SAVE</button>
```

<button> is a interactive button with id='btn-open-local-save', class='settings-reset-btn reset-data-btn', aria-label='Manage local saves', SAVE, button and displays '💾 SAVE'.

### Line 163

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 164

```text
        <hr class="settings-hr">
```

<hr> is a hr with class='settings-hr'.

### Line 165

```text
        <div class="data-row">
```

<div> is a layout container with class='data-row'.

### Line 166

```text
          <p class="settings-reset-note">Reset your balance, credit, debt, level, XP, and the shared jackpot. Your profile, settings, race progress, and daily-wheel cooldown will stay intact.</p>
```

<p> is a paragraph with class='settings-reset-note', Reset, your, balance, credit, debt, level, XP, and, the, shared, jackpot, Your, profile, settings, race, progress, and, daily-wheel, cooldown, will, stay, intact, p and displays 'Reset your balance, credit, debt, level, XP, and the shared jackpot. Your profile, settings, race progress, and daily-wheel cooldown will stay intact.'.

### Line 167

```text
          <button id="btn-reset-data" class="reset-data-btn settings-reset-btn" type="button" title="Reset casino data">🔄 Reset casino data</button>
```

<button> is a interactive button with id='btn-reset-data', class='reset-data-btn settings-reset-btn', type='button', title='Reset casino data', Reset, casino, data, button and displays '🔄 Reset casino data'.

### Line 168

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 169

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 170

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 171

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 172

```text

```

Blank line separates nearby markup sections.

### Line 173

```text
  <!-- BANK MODAL OVERLAY -->
```

Comment: BANK MODAL OVERLAY.

### Line 174

```text
  <div id="modal-bank" class="modal-overlay hidden-view">
```

<div> is a layout container with id='modal-bank', class='modal-overlay hidden-view'.

### Line 175

```text
    <div class="modal-card">
```

<div> is a layout container with class='modal-card'.

### Line 176

```text
      <button id="btn-close-bank" class="modal-close-btn">&times;</button>
```

<button> is a interactive button with id='btn-close-bank', class='modal-close-btn', times, button and displays '&times;'.

### Line 177

```text
      <h2>🏦 CASINO BANK & LOAN VAULT</h2>
```

<h2> is a section heading with CASINO, BANK, LOAN, VAULT, h2 and displays '🏦 CASINO BANK & LOAN VAULT'.

### Line 178

```text
      <p class="modal-subtitle">Borrow extra funds or repay your outstanding debt.</p>
```

<p> is a paragraph with class='modal-subtitle', Borrow, extra, funds, or, repay, your, outstanding, debt, p and displays 'Borrow extra funds or repay your outstanding debt.'.

### Line 179

```text

```

Blank line separates nearby markup sections.

### Line 180

```text
      <div class="bank-stats-grid">
```

<div> is a layout container with class='bank-stats-grid'.

### Line 181

```text
        <div class="bank-stat-card">
```

<div> is a layout container with class='bank-stat-card'.

### Line 182

```text
          <span class="stat-label">OUTSTANDING DEBT</span>
```

<span> is a inline status/text element with class='stat-label', OUTSTANDING, DEBT, span and displays 'OUTSTANDING DEBT'.

### Line 183

```text
          <span id="bank-debt-display" class="stat-value debt-color">$0.00</span>
```

<span> is a inline status/text element with id='bank-debt-display', class='stat-value debt-color', 0, 00, span and displays '$0.00'.

### Line 184

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 185

```text
        <div class="bank-stat-card">
```

<div> is a layout container with class='bank-stat-card'.

### Line 186

```text
          <span class="stat-label">CREDIT LIMIT</span>
```

<span> is a inline status/text element with class='stat-label', CREDIT, LIMIT, span and displays 'CREDIT LIMIT'.

### Line 187

```text
          <span id="bank-credit-display" class="stat-value">$2,000.00</span>
```

<span> is a inline status/text element with id='bank-credit-display', class='stat-value', 2, 000, 00, span and displays '$2,000.00'.

### Line 188

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 189

```text
        <div class="bank-stat-card">
```

<div> is a layout container with class='bank-stat-card'.

### Line 190

```text
          <span class="stat-label">INTEREST RATE</span>
```

<span> is a inline status/text element with class='stat-label', INTEREST, RATE, span and displays 'INTEREST RATE'.

### Line 191

```text
          <span class="stat-value">10%</span>
```

<span> is a inline status/text element with class='stat-value', 10, span and displays '10%'.

### Line 192

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 193

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 194

```text

```

Blank line separates nearby markup sections.

### Line 195

```text
      <div class="bank-actions-container">
```

<div> is a layout container with class='bank-actions-container'.

### Line 196

```text
        <div class="bank-action-box">
```

<div> is a layout container with class='bank-action-box'.

### Line 197

```text
          <h3>BORROW CASH</h3>
```

<h3> is a subheading with BORROW, CASH, h3 and displays 'BORROW CASH'.

### Line 198

```text
          <p>Get instant chip credit (10% flat fee added to debt).</p>
```

<p> is a paragraph with Get, instant, chip, credit, 10, flat, fee, added, to, debt, p and displays 'Get instant chip credit (10% flat fee added to debt).'.

### Line 199

```text
          <div class="action-inputs">
```

<div> is a layout container with class='action-inputs'.

### Line 200

```text
            <button class="btn-preset-loan" data-amount="100">+$100</button>
```

<button> is a interactive button with class='btn-preset-loan', data-amount='100', 100, button and displays '+$100'.

### Line 201

```text
            <button class="btn-preset-loan" data-amount="250">+$250</button>
```

<button> is a interactive button with class='btn-preset-loan', data-amount='250', 250, button and displays '+$250'.

### Line 202

```text
            <button class="btn-preset-loan" data-amount="500">+$500</button>
```

<button> is a interactive button with class='btn-preset-loan', data-amount='500', 500, button and displays '+$500'.

### Line 203

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 204

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 205

```text

```

Blank line separates nearby markup sections.

### Line 206

```text
        <div class="bank-action-box">
```

<div> is a layout container with class='bank-action-box'.

### Line 207

```text
          <h3>REPAY DEBT</h3>
```

<h3> is a subheading with REPAY, DEBT, h3 and displays 'REPAY DEBT'.

### Line 208

```text
          <p>Deduct debt balance from your current wallet.</p>
```

<p> is a paragraph with Deduct, debt, balance, from, your, current, wallet, p and displays 'Deduct debt balance from your current wallet.'.

### Line 209

```text
          <div class="action-inputs">
```

<div> is a layout container with class='action-inputs'.

### Line 210

```text
            <button id="btn-repay-100" class="btn-repay">Pay $100</button>
```

<button> is a interactive button with id='btn-repay-100', class='btn-repay', Pay, 100, button and displays 'Pay $100'.

### Line 211

```text
            <button id="btn-repay-all" class="btn-repay btn-repay-max">Pay All Debt</button>
```

<button> is a interactive button with id='btn-repay-all', class='btn-repay btn-repay-max', Pay, All, Debt, button and displays 'Pay All Debt'.

### Line 212

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 213

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 214

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 215

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 216

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 217

```text

```

Blank line separates nearby markup sections.

### Line 218

```text
  <main id="app-container">
```

<main> is a primary application content with id='app-container'.

### Line 219

```text
    
```

Blank line separates nearby markup sections.

### Line 220

```text
    <!-- The lobby groups every slot choice in one dedicated room; the general game grid below is reserved for non-slot tables. -->
```

Comment: The lobby groups every slot choice in one dedicated room; the general game grid below is reserved for non-slot tables..

### Line 221

```text
    <section id="view-lobby" class="view-screen active-view">
```

<section> is a page/view section with id='view-lobby', class='view-screen active-view'.

### Line 222

```text
      <div class="lobby-header">
```

<div> is a layout container with class='lobby-header'.

### Line 223

```text
        <h2>SELECT A ROOM</h2>
```

<h2> is a section heading with SELECT, A, ROOM, h2 and displays 'SELECT A ROOM'.

### Line 224

```text
        <p>Pick a room to travel to.</p>
```

<p> is a paragraph with Pick, a, room, to, travel, to, p and displays 'Pick a room to travel to.'.

### Line 225

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 226

```text

```

Blank line separates nearby markup sections.

### Line 227

```text
      <section class="lobby-slot-room" aria-labelledby="slot-room-title">
```

<section> is a page/view section with class='lobby-slot-room', aria-labelledby='slot-room-title'.

### Line 228

```text
        <details>
```

<details> is a collapsible disclosure panel.

### Line 229

```text
          <summary>
```

<summary> is a clickable disclosure heading.

### Line 230

```text
            <div class="lobby-slot-room-heading">
```

<div> is a layout container with class='lobby-slot-room-heading'.

### Line 231

```text
              <div>
```

<div> is a layout container.

### Line 232

```text
                <p class="lobby-room-kicker">SLOT TABLES</p>
```

<p> is a paragraph with class='lobby-room-kicker', SLOT, TABLES, p and displays 'SLOT TABLES'.

### Line 233

```text
                <h3 id="slot-room-title">Slot Room</h3>
```

<h3> is a subheading with id='slot-room-title', Slot, Room, h3 and displays 'Slot Room'.

### Line 234

```text
                <p>Choose a three-reel or five-reel machine and its stake level.</p>
```

<p> is a paragraph with Choose, a, three-reel, or, five-reel, machine, and, its, stake, level, p and displays 'Choose a three-reel or five-reel machine and its stake level.'.

### Line 235

```text
              </div>
```

Closes the div element opened by the surrounding markup.

### Line 236

```text
              <span class="lobby-room-emblem" aria-hidden="true">🎰 💎</span>
```

<span> is a inline status/text element with class='lobby-room-emblem', aria-hidden='true', span and displays '🎰 💎'.

### Line 237

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 238

```text
          </summary>
```

Closes the summary element opened by the surrounding markup.

### Line 239

```text
          <div class="slot-room-grid">
```

<div> is a layout container with class='slot-room-grid'.

### Line 240

```text
          <!-- The two original high-stakes tables stay hand-authored; themed catalog tables are added to this same grid by slot-templates.js. -->
```

Comment: The two original high-stakes tables stay hand-authored; themed catalog tables are added to this same grid by slot-templates.js..

### Line 241

```text
          <article class="game-card">
```

<article> is a self-contained content card with class='game-card'.

### Line 242

```text
            <div class="card-icon" aria-hidden="true">🎰</div>
```

<div> is a layout container with class='card-icon', aria-hidden='true', div and displays '🎰'.

### Line 243

```text
            <h3>Classic 3-Reel</h3>
```

<h3> is a subheading with Classic, 3-Reel, h3 and displays 'Classic 3-Reel'.

### Line 244

```text
            <p>High stakes: $5 minimum. Traditional 3-reel slot machine with wild payouts.</p>
```

<p> is a paragraph with High, stakes:, 5, minimum, Traditional, 3-reel, slot, machine, with, wild, payouts, p and displays 'High stakes: $5 minimum. Traditional 3-reel slot machine with wild payouts.'.

### Line 245

```text
            <button class="play-btn" type="button" data-game="classic-slots">PLAY NOW</button>
```

<button> is a interactive button with class='play-btn', type='button', data-game='classic-slots', PLAY, NOW, button and displays 'PLAY NOW'.

### Line 246

```text
          </article>
```

Closes the article element opened by the surrounding markup.

### Line 247

```text
          <article class="game-card">
```

<article> is a self-contained content card with class='game-card'.

### Line 248

```text
            <div class="card-icon" aria-hidden="true">💎</div>
```

<div> is a layout container with class='card-icon', aria-hidden='true', div and displays '💎'.

### Line 249

```text
            <h3>5-Reel Gem Quest</h3>
```

<h3> is a subheading with 5-Reel, Gem, Quest, h3 and displays '5-Reel Gem Quest'.

### Line 250

```text
            <p>High stakes: $5 minimum. Five reels, Free Spins, Sticky Wilds &amp; Jackpot.</p>
```

<p> is a paragraph with High, stakes:, 5, minimum, Five, reels, Free, Spins, Sticky, Wilds, amp, Jackpot, p and displays 'High stakes: $5 minimum. Five reels, Free Spins, Sticky Wilds &amp; Jackpot.'.

### Line 251

```text
            <button class="play-btn" type="button" data-game="5reel-slots">PLAY NOW</button>
```

<button> is a interactive button with class='play-btn', type='button', data-game='5reel-slots', PLAY, NOW, button and displays 'PLAY NOW'.

### Line 252

```text
          </article>
```

Closes the article element opened by the surrounding markup.

### Line 253

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 254

```text
        </details>
```

Closes the details element opened by the surrounding markup.

### Line 255

```text
      </section>
```

Closes the section element opened by the surrounding markup.

### Line 256

```text

```

Blank line separates nearby markup sections.

### Line 257

```text
      <!-- These cards intentionally exclude all slot games; their launch buttons share one data-game navigation contract. -->
```

Comment: These cards intentionally exclude all slot games; their launch buttons share one data-game navigation contract..

### Line 258

```text
      <section class="lobby-coin-room" aria-labelledby="coin-room-title">
```

<section> is a page/view section with class='lobby-coin-room', aria-labelledby='coin-room-title'.

### Line 259

```text
        <details>
```

<details> is a collapsible disclosure panel.

### Line 260

```text
          <summary>
```

<summary> is a clickable disclosure heading.

### Line 261

```text
            <div class="lobby-coin-room-heading">
```

<div> is a layout container with class='lobby-coin-room-heading'.

### Line 262

```text
              <div>
```

<div> is a layout container.

### Line 263

```text
                <p class="lobby-room-kicker">COIN FLIPPING</p>
```

<p> is a paragraph with class='lobby-room-kicker', COIN, FLIPPING, p and displays 'COIN FLIPPING'.

### Line 264

```text
                <h3 id="coin-room-title">Coin Flip Room</h3>
```

<h3> is a subheading with id='coin-room-title', Coin, Flip, Room, h3 and displays 'Coin Flip Room'.

### Line 265

```text
                <p>Choose a three-coin or single-coin game.</p>
```

<p> is a paragraph with Choose, a, three-coin, or, single-coin, game, p and displays 'Choose a three-coin or single-coin game.'.

### Line 266

```text
              </div>
```

Closes the div element opened by the surrounding markup.

### Line 267

```text
              <span class="lobby-room-emblem" aria-hidden="true">🪙</span>
```

<span> is a inline status/text element with class='lobby-room-emblem', aria-hidden='true', span and displays '🪙'.

### Line 268

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 269

```text
          </summary>
```

Closes the summary element opened by the surrounding markup.

### Line 270

```text
          <div class="game-grid">
```

<div> is a layout container with class='game-grid'.

### Line 271

```text
            <!-- Coin Toss Card -->
```

Comment: Coin Toss Card.

### Line 272

```text
            <div class="game-card">
```

<div> is a layout container with class='game-card'.

### Line 273

```text
              <div class="card-icon">🪙</div>
```

<div> is a layout container with class='card-icon', div and displays '🪙'.

### Line 274

```text
              <h3>High Roller Coin Toss</h3>
```

<h3> is a subheading with High, Roller, Coin, Toss, h3 and displays 'High Roller Coin Toss'.

### Line 275

```text
              <p>Double or nothing! Flip the gold coin for instant 2x payouts.</p>
```

<p> is a paragraph with Double, or, nothing, Flip, the, gold, coin, for, instant, 2x, payouts, p and displays 'Double or nothing! Flip the gold coin for instant 2x payouts.'.

### Line 276

```text
              <button class="play-btn" data-game="coin-toss">PLAY NOW</button>
```

<button> is a interactive button with class='play-btn', data-game='coin-toss', PLAY, NOW, button and displays 'PLAY NOW'.

### Line 277

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 278

```text
            <div class="game-card">
```

<div> is a layout container with class='game-card'.

### Line 279

```text
              <div class="card-icon" aria-hidden="true">3×</div>
```

<div> is a layout container with class='card-icon', aria-hidden='true', 3, div and displays '3×'.

### Line 280

```text
              <h3>Three Coin Toss</h3>
```

<h3> is a subheading with Three, Coin, Toss, h3 and displays 'Three Coin Toss'.

### Line 281

```text
              <p>Predict all three coins. Match 2 for 1.5× or all 3 for 3× total return.</p>
```

<p> is a paragraph with Predict, all, three, coins, Match, 2, for, 1, 5, or, all, 3, for, 3, total, return, p and displays 'Predict all three coins. Match 2 for 1.5× or all 3 for 3× total return.'.

### Line 282

```text
              <button class="play-btn" data-game="three-coin-toss">PLAY NOW</button>
```

<button> is a interactive button with class='play-btn', data-game='three-coin-toss', PLAY, NOW, button and displays 'PLAY NOW'.

### Line 283

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 284

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 285

```text
        </details>
```

Closes the details element opened by the surrounding markup.

### Line 286

```text
      </section>
```

Closes the section element opened by the surrounding markup.

### Line 287

```text

```

Blank line separates nearby markup sections.

### Line 288

```text
      <div class="game-grid">
```

<div> is a layout container with class='game-grid'.

### Line 289

```text
        <!-- Blackjack 21 Card -->
```

Comment: Blackjack 21 Card.

### Line 290

```text
        <div class="game-card">
```

<div> is a layout container with class='game-card'.

### Line 291

```text
          <div class="card-icon">🃏</div>
```

<div> is a layout container with class='card-icon', div and displays '🃏'.

### Line 292

```text
          <h3>Blackjack 21</h3>
```

<h3> is a subheading with Blackjack, 21, h3 and displays 'Blackjack 21'.

### Line 293

```text
          <p>Beat the dealer! Hit, Stand, or Double Down for 3:2 Blackjack payouts.</p>
```

<p> is a paragraph with Beat, the, dealer, Hit, Stand, or, Double, Down, for, 3:2, Blackjack, payouts, p and displays 'Beat the dealer! Hit, Stand, or Double Down for 3:2 Blackjack payouts.'.

### Line 294

```text
          <button class="play-btn" data-game="blackjack">PLAY NOW</button>
```

<button> is a interactive button with class='play-btn', data-game='blackjack', PLAY, NOW, button and displays 'PLAY NOW'.

### Line 295

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 296

```text

```

Blank line separates nearby markup sections.

### Line 297

```text
        <!-- Race Card -->
```

Comment: Race Card.

### Line 298

```text
        <div class="game-card">
```

<div> is a layout container with class='game-card'.

### Line 299

```text
          <div class="card-icon">🏁</div>
```

<div> is a layout container with class='card-icon', div and displays '🏁'.

### Line 300

```text
          <h3>Racing</h3>
```

<h3> is a subheading with Racing, h3 and displays 'Racing'.

### Line 301

```text
          <p>Back a horse or car in daytime races. Form and race experience affect each runner's simulated win chance.</p>
```

<p> is a paragraph with Back, a, horse, or, car, in, daytime, races, Form, and, race, experience, affect, each, runner, s, simulated, win, chance, p and displays "Back a horse or car in daytime races. Form and race experience affect each runner's simulated win chance.".

### Line 302

```text
          <button class="play-btn" data-game="horse-racing">RACE NOW</button>
```

<button> is a interactive button with class='play-btn', data-game='horse-racing', RACE, NOW, button and displays 'RACE NOW'.

### Line 303

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 304

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 305

```text

```

Blank line separates nearby markup sections.

### Line 306

```text
      <section class="lobby-services-room" aria-labelledby="lobby-services-title">
```

<section> is a page/view section with class='lobby-services-room', aria-labelledby='lobby-services-title'.

### Line 307

```text
        <div class="lobby-services-heading">
```

<div> is a layout container with class='lobby-services-heading'.

### Line 308

```text
          <div>
```

<div> is a layout container.

### Line 309

```text
            <p class="lobby-room-kicker">CASINO SERVICES</p>
```

<p> is a paragraph with class='lobby-room-kicker', CASINO, SERVICES, p and displays 'CASINO SERVICES'.

### Line 310

```text
            <h3 id="lobby-services-title">Rewards &amp; Banking Room</h3>
```

<h3> is a subheading with id='lobby-services-title', Rewards, amp, Banking, Room, h3 and displays 'Rewards &amp; Banking Room'.

### Line 311

```text
            <p>Claim a daily bonus or manage your virtual-chip credit.</p>
```

<p> is a paragraph with Claim, a, daily, bonus, or, manage, your, virtual-chip, credit, p and displays 'Claim a daily bonus or manage your virtual-chip credit.'.

### Line 312

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 313

```text
          <span class="lobby-room-emblem" aria-hidden="true">🎁 🏦</span>
```

<span> is a inline status/text element with class='lobby-room-emblem', aria-hidden='true', span and displays '🎁 🏦'.

### Line 314

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 315

```text
        <div class="lobby-service-grid">
```

<div> is a layout container with class='lobby-service-grid'.

### Line 316

```text
          <article class="lobby-service-card">
```

<article> is a self-contained content card with class='lobby-service-card'.

### Line 317

```text
            <span class="lobby-service-icon" aria-hidden="true">🎡</span>
```

<span> is a inline status/text element with class='lobby-service-icon', aria-hidden='true', span and displays '🎡'.

### Line 318

```text
            <div class="lobby-service-copy">
```

<div> is a layout container with class='lobby-service-copy'.

### Line 319

```text
              <h4>Daily Lucky Wheel</h4>
```

<h4> is a service heading with Daily, Lucky, Wheel, h4 and displays 'Daily Lucky Wheel'.

### Line 320

```text
              <p>Spin once every 24 hours for free bonus chips.</p>
```

<p> is a paragraph with Spin, once, every, 24, hours, for, free, bonus, chips, p and displays 'Spin once every 24 hours for free bonus chips.'.

### Line 321

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 322

```text
            <button id="btn-open-wheel" class="lobby-service-btn wheel-header-btn" type="button" aria-haspopup="dialog" aria-controls="modal-wheel">Open daily wheel</button>
```

<button> is a interactive button with id='btn-open-wheel', class='lobby-service-btn wheel-header-btn', type='button', aria-haspopup='dialog', aria-controls='modal-wheel', Open, daily, wheel, button and displays 'Open daily wheel'.

### Line 323

```text
          </article>
```

Closes the article element opened by the surrounding markup.

### Line 324

```text
          <article class="lobby-service-card">
```

<article> is a self-contained content card with class='lobby-service-card'.

### Line 325

```text
            <span class="lobby-service-icon" aria-hidden="true">🏦</span>
```

<span> is a inline status/text element with class='lobby-service-icon', aria-hidden='true', span and displays '🏦'.

### Line 326

```text
            <div class="lobby-service-copy">
```

<div> is a layout container with class='lobby-service-copy'.

### Line 327

```text
              <h4>Casino Bank</h4>
```

<h4> is a service heading with Casino, Bank, h4 and displays 'Casino Bank'.

### Line 328

```text
              <p>Borrow virtual chips or repay outstanding debt.</p>
```

<p> is a paragraph with Borrow, virtual, chips, or, repay, outstanding, debt, p and displays 'Borrow virtual chips or repay outstanding debt.'.

### Line 329

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 330

```text
            <button id="btn-open-bank" class="lobby-service-btn bank-btn" type="button" aria-haspopup="dialog" aria-controls="modal-bank">Visit the bank</button>
```

<button> is a interactive button with id='btn-open-bank', class='lobby-service-btn bank-btn', type='button', aria-haspopup='dialog', aria-controls='modal-bank', Visit, the, bank, button and displays 'Visit the bank'.

### Line 331

```text
          </article>
```

Closes the article element opened by the surrounding markup.

### Line 332

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 333

```text
      </section>
```

Closes the section element opened by the surrounding markup.

### Line 334

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 335

```text

```

Blank line separates nearby markup sections.

### Line 336

```text
    <!-- LOCAL SIMULATED RACING VIEW -->
```

Comment: LOCAL SIMULATED RACING VIEW.

### Line 337

```text
    <section id="view-horse-racing" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-horse-racing', class='view-screen hidden-view'.

### Line 338

```text
      <button class="back-lobby-btn" type="button">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', type='button', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 339

```text
      <div class="slot-machine race-machine">
```

<div> is a layout container with class='slot-machine race-machine'.

### Line 340

```text
        <div class="header race-header">
```

<div> is a layout container with class='header race-header'.

### Line 341

```text
          <h1 id="race-title">Horse Racing</h1>
```

<h1> is a top-level heading with id='race-title', Horse, Racing, h1 and displays 'Horse Racing'.

### Line 342

```text
          <p class="race-local-note">A race every hour from 7 AM–9 PM local time, alternating horse and car • previews and betting open 45 minutes before each start • bets close 5 minutes before • closed overnight • virtual chips only</p>
```

<p> is a paragraph with class='race-local-note', A, race, every, hour, from, 7, AM, 9, PM, local, time, alternating, horse, and, car, previews, and, betting, open, 45, minutes, before, each, start, bets, close, 5, minutes, before, closed, overnight, virtual, chips, only, p and displays 'A race every hour from 7 AM–9 PM local time, alternating horse and car • previews and betting open 45 minutes before each start • bets close 5 minutes before • closed overnight • virtual chips only'.

### Line 343

```text
          <div class="race-mode-switch" role="group" aria-label="Alternating hourly race schedule">
```

<div> is a layout container with class='race-mode-switch', role='group', aria-label='Alternating hourly race schedule'.

### Line 344

```text
            <span data-race-type="horse">🏇 Horse Racing · 7 AM, then every 2 hours</span>
```

<span> is a inline status/text element with data-race-type='horse', Horse, Racing, 7, AM, then, every, 2, hours, span and displays '🏇 Horse Racing · 7 AM, then every 2 hours'.

### Line 345

```text
            <span data-race-type="car">🏎️ Car Racing · 8 AM, then every 2 hours</span>
```

<span> is a inline status/text element with data-race-type='car', Car, Racing, 8, AM, then, every, 2, hours, span and displays '🏎️ Car Racing · 8 AM, then every 2 hours'.

### Line 346

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 347

```text
          <div id="race-status" class="status-banner status-spinning" role="status" aria-live="polite">Loading the next local race…</div>
```

<div> is a layout container with id='race-status', class='status-banner status-spinning', role='status', aria-live='polite', Loading, the, next, local, race, div and displays 'Loading the next local race…'.

### Line 348

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 349

```text

```

Blank line separates nearby markup sections.

### Line 350

```text
        <div class="race-info-strip" aria-label="Race details">
```

<div> is a layout container with class='race-info-strip', aria-label='Race details'.

### Line 351

```text
          <div class="race-info-item"><span>BETTING FOR</span><strong id="race-number">—</strong></div>
```

<div> is a layout container with class='race-info-item', span, BETTING, FOR, span, strong, id='race-number', strong, div and displays 'BETTING FOR—'.

### Line 352

```text
          <div class="race-info-item"><span>PHASE</span><strong id="race-phase-label">—</strong></div>
```

<div> is a layout container with class='race-info-item', span, PHASE, span, strong, id='race-phase-label', strong, div and displays 'PHASE—'.

### Line 353

```text
          <div class="race-info-item"><span>STARTS IN</span><strong id="race-countdown">—</strong></div>
```

<div> is a layout container with class='race-info-item', span, STARTS, IN, span, strong, id='race-countdown', strong, div and displays 'STARTS IN—'.

### Line 354

```text
          <div class="race-info-item"><span>NEXT LOCAL START</span><strong id="race-start-time">—</strong></div>
```

<div> is a layout container with class='race-info-item', span, NEXT, LOCAL, START, span, strong, id='race-start-time', strong, div and displays 'NEXT LOCAL START—'.

### Line 355

```text
          <!--<div class="race-info-item"><span>SPRINT LENGTH</span><strong id="race-duration">—</strong></div>-->
```

Comment: <div class="race-info-item"><span>SPRINT LENGTH</span><strong id="race-duration">—</strong></div>.

### Line 356

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 357

```text

```

Blank line separates nearby markup sections.

### Line 358

```text
        <div class="race-stage">
```

<div> is a layout container with class='race-stage'.

### Line 359

```text
          <div class="race-track-heading"><span id="race-track-caption">NEXT RACE PREVIEW</span><span class="race-finish-label">FINISH</span></div>
```

<div> is a layout container with class='race-track-heading', span, id='race-track-caption', NEXT, RACE, PREVIEW, span, span, class='race-finish-label', FINISH, span, div and displays 'NEXT RACE PREVIEWFINISH'.

### Line 360

```text
          <div id="race-track" class="race-track" aria-label="Animated simulated race track"></div>
```

<div> is a layout container with id='race-track', class='race-track', aria-label='Animated simulated race track', div.

### Line 361

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 362

```text

```

Blank line separates nearby markup sections.

### Line 363

```text
        <div class="race-betting-panel">
```

<div> is a layout container with class='race-betting-panel'.

### Line 364

```text
          <div class="race-panel-heading">
```

<div> is a layout container with class='race-panel-heading'.

### Line 365

```text
            <h2>Choose a winner</h2>
```

<h2> is a section heading with Choose, a, winner, h2 and displays 'Choose a winner'.

### Line 366

```text
            <p id="race-target-text">Choose a runner. Betting closes five minutes before the race starts.</p>
```

<p> is a paragraph with id='race-target-text', Choose, a, runner, Betting, closes, five, minutes, before, the, race, starts, p and displays 'Choose a runner. Betting closes five minutes before the race starts.'.

### Line 367

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 368

```text
          <div id="race-runner-list" class="race-runner-list" role="group" aria-label="Choose a horse to win"></div>
```

<div> is a layout container with id='race-runner-list', class='race-runner-list', role='group', aria-label='Choose a horse to win', div.

### Line 369

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 370

```text

```

Blank line separates nearby markup sections.

### Line 371

```text
        <div class="dashboard race-dashboard">
```

<div> is a layout container with class='dashboard race-dashboard'.

### Line 372

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 373

```text
            <span class="label">Win Bet</span>
```

<span> is a inline status/text element with class='label', Win, Bet, span and displays 'Win Bet'.

### Line 374

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 375

```text
              <button id="btn-race-minus" class="btn-small" type="button" aria-label="Decrease race bet">−</button>
```

<button> is a interactive button with id='btn-race-minus', class='btn-small', type='button', aria-label='Decrease race bet', button and displays '−'.

### Line 376

```text
              <span id="race-bet-display" class="value">$10.00</span>
```

<span> is a inline status/text element with id='race-bet-display', class='value', 10, 00, span and displays '$10.00'.

### Line 377

```text
              <button id="btn-race-plus" class="btn-small" type="button" aria-label="Increase race bet">+</button>
```

<button> is a interactive button with id='btn-race-plus', class='btn-small', type='button', aria-label='Increase race bet', button and displays '+'.

### Line 378

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 379

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 380

```text
          <div class="card race-return-card">
```

<div> is a layout container with class='card race-return-card'.

### Line 381

```text
            <span class="label">Potential total return</span>
```

<span> is a inline status/text element with class='label', Potential, total, return, span and displays 'Potential total return'.

### Line 382

```text
            <span id="race-estimated-return" class="value">$0.00</span>
```

<span> is a inline status/text element with id='race-estimated-return', class='value', 0, 00, span and displays '$0.00'.

### Line 383

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 384

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 385

```text

```

Blank line separates nearby markup sections.

### Line 386

```text
        <div class="actions race-actions">
```

<div> is a layout container with class='actions race-actions'.

### Line 387

```text
          <button id="btn-race-clear" class="btn-small" type="button">Clear bet</button>
```

<button> is a interactive button with id='btn-race-clear', class='btn-small', type='button', Clear, bet, button and displays 'Clear bet'.

### Line 388

```text
          <button id="btn-race-max" class="max-btn" type="button">MAX BET</button>
```

<button> is a interactive button with id='btn-race-max', class='max-btn', type='button', MAX, BET, button and displays 'MAX BET'.

### Line 389

```text
          <button id="btn-race-bet" class="spin-btn" type="button" disabled>SELECT A HORSE</button>
```

<button> is a interactive button with id='btn-race-bet', class='spin-btn', type='button', disabled, SELECT, A, HORSE, button and displays 'SELECT A HORSE'.

### Line 390

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 391

```text
        <p id="race-ticket-note" class="race-ticket-note" role="status" aria-live="polite">One open ticket at a time across both circuits. Your stake is virtual chips only.</p>
```

<p> is a paragraph with id='race-ticket-note', class='race-ticket-note', role='status', aria-live='polite', One, open, ticket, at, a, time, across, both, circuits, Your, stake, is, virtual, chips, only, p and displays 'One open ticket at a time across both circuits. Your stake is virtual chips only.'.

### Line 392

```text
        <p class="race-odds-note">Horse races field 6 runners and car races field 8 from expanding stables. Starts and wins affect future simulated ability and displayed win chances. Odds show total return including your stake. Race schedules and results use this device's local clock; there is no live sports feed.</p>
```

<p> is a paragraph with class='race-odds-note', Horse, races, field, 6, runners, and, car, races, field, 8, from, expanding, stables, Starts, and, wins, affect, future, simulated, ability, and, displayed, win, chances, Odds, show, total, return, including, your, stake, Race, schedules, and, results, use, this, device, s, local, clock, there, is, no, live, sports, feed, p and displays "Horse races field 6 runners and car races field 8 from expanding stables. Starts and wins affect future simulated ability and displayed win chances. Odds show total return including your stake. Race schedules and results use this device's local clock; there is no live sports feed.".

### Line 393

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 394

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 395

```text

```

Blank line separates nearby markup sections.

### Line 396

```text
    <!-- BLACKJACK 21 VIEW -->
```

Comment: BLACKJACK 21 VIEW.

### Line 397

```text
    <section id="view-blackjack" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-blackjack', class='view-screen hidden-view'.

### Line 398

```text
      <button class="back-lobby-btn">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 399

```text
      
```

Blank line separates nearby markup sections.

### Line 400

```text
      <div class="slot-machine blackjack-table">
```

<div> is a layout container with class='slot-machine blackjack-table'.

### Line 401

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 402

```text
          <h1>Blackjack 21</h1>
```

<h1> is a top-level heading with Blackjack, 21, h1 and displays 'Blackjack 21'.

### Line 403

```text
          <div id="status-bj" class="status-banner">PLACE YOUR BET TO DEAL</div>
```

<div> is a layout container with id='status-bj', class='status-banner', PLACE, YOUR, BET, TO, DEAL, div and displays 'PLACE YOUR BET TO DEAL'.

### Line 404

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 405

```text

```

Blank line separates nearby markup sections.

### Line 406

```text
        <!-- Felt Play Table Area -->
```

Comment: Felt Play Table Area.

### Line 407

```text
        <div class="felt-table">
```

<div> is a layout container with class='felt-table'.

### Line 408

```text
          <!-- Dealer Area -->
```

Comment: Dealer Area.

### Line 409

```text
          <div class="hand-section">
```

<div> is a layout container with class='hand-section'.

### Line 410

```text
            <div class="hand-header">
```

<div> is a layout container with class='hand-header'.

### Line 411

```text
              <span>DEALER HAND</span>
```

<span> is a inline status/text element with DEALER, HAND, span and displays 'DEALER HAND'.

### Line 412

```text
              <span id="bj-dealer-score" class="score-badge">0</span>
```

<span> is a inline status/text element with id='bj-dealer-score', class='score-badge', 0, span and displays '0'.

### Line 413

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 414

```text
            <div id="bj-dealer-cards" class="cards-container"></div>
```

<div> is a layout container with id='bj-dealer-cards', class='cards-container', div.

### Line 415

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 416

```text

```

Blank line separates nearby markup sections.

### Line 417

```text
          <!-- Divider Line -->
```

Comment: Divider Line.

### Line 418

```text
          <div class="table-divider"><span>BLACKJACK PAYS 3 TO 2 — DEALER MUST STAND ON 17</span></div>
```

<div> is a layout container with class='table-divider', span, BLACKJACK, PAYS, 3, TO, 2, DEALER, MUST, STAND, ON, 17, span, div and displays 'BLACKJACK PAYS 3 TO 2 — DEALER MUST STAND ON 17'.

### Line 419

```text

```

Blank line separates nearby markup sections.

### Line 420

```text
          <!-- Player Area -->
```

Comment: Player Area.

### Line 421

```text
          <div class="hand-section">
```

<div> is a layout container with class='hand-section'.

### Line 422

```text
            <div class="hand-header">
```

<div> is a layout container with class='hand-header'.

### Line 423

```text
              <span>YOUR HAND</span>
```

<span> is a inline status/text element with YOUR, HAND, span and displays 'YOUR HAND'.

### Line 424

```text
              <span id="bj-player-score" class="score-badge">0</span>
```

<span> is a inline status/text element with id='bj-player-score', class='score-badge', 0, span and displays '0'.

### Line 425

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 426

```text
            <div id="bj-player-cards" class="cards-container"></div>
```

<div> is a layout container with id='bj-player-cards', class='cards-container', div.

### Line 427

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 428

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 429

```text

```

Blank line separates nearby markup sections.

### Line 430

```text
        <!-- Controls Dashboard -->
```

Comment: Controls Dashboard.

### Line 431

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 432

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 433

```text
            <span class="label">Current Bet</span>
```

<span> is a inline status/text element with class='label', Current, Bet, span and displays 'Current Bet'.

### Line 434

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 435

```text
              <button id="btn-bj-minus" class="btn-small">-</button>
```

<button> is a interactive button with id='btn-bj-minus', class='btn-small', -, button and displays '-'.

### Line 436

```text
              <span id="bet-bj-display" class="value">$10</span>
```

<span> is a inline status/text element with id='bet-bj-display', class='value', 10, span and displays '$10'.

### Line 437

```text
              <button id="btn-bj-plus" class="btn-small">+</button>
```

<button> is a interactive button with id='btn-bj-plus', class='btn-small', button and displays '+'.

### Line 438

```text
              <button id="btn-bj-max" class="max-btn" type="button">MAX</button>
```

<button> is a interactive button with id='btn-bj-max', class='max-btn', type='button', MAX, button and displays 'MAX'.

### Line 439

```text
              <button id="btn-bj-clear" class="btn-small" type="button">Clear bet</button>
```

<button> is a interactive button with id='btn-bj-clear', class='btn-small', type='button', Clear, bet, button and displays 'Clear bet'.

### Line 440

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 441

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 442

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 443

```text

```

Blank line separates nearby markup sections.

### Line 444

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 445

```text
          <button id="btn-bj-deal" class="spin-btn">DEAL HAND</button>
```

<button> is a interactive button with id='btn-bj-deal', class='spin-btn', DEAL, HAND, button and displays 'DEAL HAND'.

### Line 446

```text
          <button id="btn-bj-hit" class="action-btn-green hidden-view">HIT</button>
```

<button> is a interactive button with id='btn-bj-hit', class='action-btn-green hidden-view', HIT, button and displays 'HIT'.

### Line 447

```text
          <button id="btn-bj-stand" class="action-btn-red hidden-view">STAND</button>
```

<button> is a interactive button with id='btn-bj-stand', class='action-btn-red hidden-view', STAND, button and displays 'STAND'.

### Line 448

```text
          <button id="btn-bj-double" class="action-btn-gold hidden-view">DOUBLE DOWN</button>
```

<button> is a interactive button with id='btn-bj-double', class='action-btn-gold hidden-view', DOUBLE, DOWN, button and displays 'DOUBLE DOWN'.

### Line 449

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 450

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 451

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 452

```text

```

Blank line separates nearby markup sections.

### Line 453

```text
    <!-- COIN TOSS ROOM -->
```

Comment: COIN TOSS ROOM.

### Line 454

```text
    <section id="view-coin-toss" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-coin-toss', class='view-screen hidden-view'.

### Line 455

```text
      <button class="back-lobby-btn">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 456

```text
      
```

Blank line separates nearby markup sections.

### Line 457

```text
      <div class="slot-machine coin-toss-machine">
```

<div> is a layout container with class='slot-machine coin-toss-machine'.

### Line 458

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 459

```text
          <h1>Coin Toss</h1>
```

<h1> is a top-level heading with Coin, Toss, h1 and displays 'Coin Toss'.

### Line 460

```text
          <div id="status-coin" class="status-banner">PICK HEADS OR TAILS</div>
```

<div> is a layout container with id='status-coin', class='status-banner', PICK, HEADS, OR, TAILS, div and displays 'PICK HEADS OR TAILS'.

### Line 461

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 462

```text

```

Blank line separates nearby markup sections.

### Line 463

```text
        <div class="coin-stage">
```

<div> is a layout container with class='coin-stage'.

### Line 464

```text
          <div id="coin-element" class="coin">
```

<div> is a layout container with id='coin-element', class='coin'.

### Line 465

```text
            <div class="coin-face coin-heads">🪙<br><span>HEADS</span></div>
```

<div> is a layout container with class='coin-face coin-heads', br, span, HEADS, span, div and displays '🪙HEADS'.

### Line 466

```text
            <div class="coin-face coin-tails">👑<br><span>TAILS</span></div>
```

<div> is a layout container with class='coin-face coin-tails', br, span, TAILS, span, div and displays '👑TAILS'.

### Line 467

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 468

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 469

```text

```

Blank line separates nearby markup sections.

### Line 470

```text
        <div class="choice-selector">
```

<div> is a layout container with class='choice-selector'.

### Line 471

```text
          <button id="btn-pick-heads" data-coin-index="0" data-coin-choice="HEADS" class="choice-btn active-choice">HEADS (2x)</button>
```

<button> is a interactive button with id='btn-pick-heads', data-coin-index='0', data-coin-choice='HEADS', class='choice-btn active-choice', HEADS, 2x, button and displays 'HEADS (2x)'.

### Line 472

```text
          <button id="btn-pick-tails" data-coin-index="0" data-coin-choice="TAILS" class="choice-btn">TAILS (2x)</button>
```

<button> is a interactive button with id='btn-pick-tails', data-coin-index='0', data-coin-choice='TAILS', class='choice-btn', TAILS, 2x, button and displays 'TAILS (2x)'.

### Line 473

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 474

```text

```

Blank line separates nearby markup sections.

### Line 475

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 476

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 477

```text
            <span class="label">Current Bet</span>
```

<span> is a inline status/text element with class='label', Current, Bet, span and displays 'Current Bet'.

### Line 478

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 479

```text
              <button id="btn-coin-minus" class="btn-small">-</button>
```

<button> is a interactive button with id='btn-coin-minus', class='btn-small', -, button and displays '-'.

### Line 480

```text
              <span id="bet-coin-display" class="value">$10</span>
```

<span> is a inline status/text element with id='bet-coin-display', class='value', 10, span and displays '$10'.

### Line 481

```text
              <button id="btn-coin-plus" class="btn-small">+</button>
```

<button> is a interactive button with id='btn-coin-plus', class='btn-small', button and displays '+'.

### Line 482

```text
              <button id="btn-coin-clear" class="btn-small" type="button">Clear bet</button>
```

<button> is a interactive button with id='btn-coin-clear', class='btn-small', type='button', Clear, bet, button and displays 'Clear bet'.

### Line 483

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 484

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 485

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 486

```text

```

Blank line separates nearby markup sections.

### Line 487

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 488

```text
          <button id="btn-coin-max" class="max-btn">MAX</button>
```

<button> is a interactive button with id='btn-coin-max', class='max-btn', MAX, button and displays 'MAX'.

### Line 489

```text
          <button id="btn-coin-flip" class="spin-btn">FLIP COIN</button>
```

<button> is a interactive button with id='btn-coin-flip', class='spin-btn', FLIP, COIN, button and displays 'FLIP COIN'.

### Line 490

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 491

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 492

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 493

```text
    
```

Blank line separates nearby markup sections.

### Line 494

```text
    <section id="view-three-coin-toss" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-three-coin-toss', class='view-screen hidden-view'.

### Line 495

```text
      <button class="back-lobby-btn">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 496

```text
      
```

Blank line separates nearby markup sections.

### Line 497

```text
      <div class="slot-machine three-coin-toss-machine">
```

<div> is a layout container with class='slot-machine three-coin-toss-machine'.

### Line 498

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 499

```text
          <h1>3x Coin Toss</h1>
```

<h1> is a top-level heading with 3x, Coin, Toss, h1 and displays '3x Coin Toss'.

### Line 500

```text
          <div id="status-three-coin" class="status-banner">PREDICT ALL THREE COINS</div>
```

<div> is a layout container with id='status-three-coin', class='status-banner', PREDICT, ALL, THREE, COINS, div and displays 'PREDICT ALL THREE COINS'.

### Line 501

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 502

```text

```

Blank line separates nearby markup sections.

### Line 503

```text
        <div class="three-coin-stage">
```

<div> is a layout container with class='three-coin-stage'.

### Line 504

```text
          <div id="coin-a-element" class="coin">
```

<div> is a layout container with id='coin-a-element', class='coin'.

### Line 505

```text
            <div class="coin-face coin-heads">🪙<br><span>HEADS</span></div>
```

<div> is a layout container with class='coin-face coin-heads', br, span, HEADS, span, div and displays '🪙HEADS'.

### Line 506

```text
            <div class="coin-face coin-tails">👑<br><span>TAILS</span></div>
```

<div> is a layout container with class='coin-face coin-tails', br, span, TAILS, span, div and displays '👑TAILS'.

### Line 507

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 508

```text
          <div id="coin-b-element" class="coin">
```

<div> is a layout container with id='coin-b-element', class='coin'.

### Line 509

```text
            <div class="coin-face coin-heads">🪙<br><span>HEADS</span></div>
```

<div> is a layout container with class='coin-face coin-heads', br, span, HEADS, span, div and displays '🪙HEADS'.

### Line 510

```text
            <div class="coin-face coin-tails">👑<br><span>TAILS</span></div>
```

<div> is a layout container with class='coin-face coin-tails', br, span, TAILS, span, div and displays '👑TAILS'.

### Line 511

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 512

```text
          <div id="coin-c-element" class="coin">
```

<div> is a layout container with id='coin-c-element', class='coin'.

### Line 513

```text
            <div class="coin-face coin-heads">🪙<br><span>HEADS</span></div>
```

<div> is a layout container with class='coin-face coin-heads', br, span, HEADS, span, div and displays '🪙HEADS'.

### Line 514

```text
            <div class="coin-face coin-tails">👑<br><span>TAILS</span></div>
```

<div> is a layout container with class='coin-face coin-tails', br, span, TAILS, span, div and displays '👑TAILS'.

### Line 515

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 516

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 517

```text

```

Blank line separates nearby markup sections.

### Line 518

```text
        <p class="game-rules-note">Predict each coin, then flip all three. 0–1 correct: no return. 2 correct: 1.5× total return. 3 correct: 3× total return. Returns include your stake; the payout doubles from 2 to 3 correct.</p>
```

<p> is a paragraph with class='game-rules-note', Predict, each, coin, then, flip, all, three, 0, 1, correct:, no, return, 2, correct:, 1, 5, total, return, 3, correct:, 3, total, return, Returns, include, your, stake, the, payout, doubles, from, 2, to, 3, correct, p and displays 'Predict each coin, then flip all three. 0–1 correct: no return. 2 correct: 1.5× total return. 3 correct: 3× total return. Returns include your stake; the payout doubles from 2 to 3 correct.'.

### Line 519

```text
        <div class="three-coin-choices">
```

<div> is a layout container with class='three-coin-choices'.

### Line 520

```text
          <fieldset><legend>Coin 1</legend><button type="button" class="choice-btn" data-coin-index="0" data-coin-choice="HEADS" aria-pressed="false">Heads</button><button type="button" class="choice-btn" data-coin-index="0" data-coin-choice="TAILS" aria-pressed="false">Tails</button></fieldset>
```

<fieldset> is a choice group with legend, Coin, 1, legend, button, type='button', class='choice-btn', data-coin-index='0', data-coin-choice='HEADS', aria-pressed='false', Heads, button, button, type='button', class='choice-btn', data-coin-index='0', data-coin-choice='TAILS', aria-pressed='false', Tails, button, fieldset and displays 'Coin 1HeadsTails'.

### Line 521

```text
          <fieldset><legend>Coin 2</legend><button type="button" class="choice-btn" data-coin-index="1" data-coin-choice="HEADS" aria-pressed="false">Heads</button><button type="button" class="choice-btn" data-coin-index="1" data-coin-choice="TAILS" aria-pressed="false">Tails</button></fieldset>
```

<fieldset> is a choice group with legend, Coin, 2, legend, button, type='button', class='choice-btn', data-coin-index='1', data-coin-choice='HEADS', aria-pressed='false', Heads, button, button, type='button', class='choice-btn', data-coin-index='1', data-coin-choice='TAILS', aria-pressed='false', Tails, button, fieldset and displays 'Coin 2HeadsTails'.

### Line 522

```text
          <fieldset><legend>Coin 3</legend><button type="button" class="choice-btn" data-coin-index="2" data-coin-choice="HEADS" aria-pressed="false">Heads</button><button type="button" class="choice-btn" data-coin-index="2" data-coin-choice="TAILS" aria-pressed="false">Tails</button></fieldset>
```

<fieldset> is a choice group with legend, Coin, 3, legend, button, type='button', class='choice-btn', data-coin-index='2', data-coin-choice='HEADS', aria-pressed='false', Heads, button, button, type='button', class='choice-btn', data-coin-index='2', data-coin-choice='TAILS', aria-pressed='false', Tails, button, fieldset and displays 'Coin 3HeadsTails'.

### Line 523

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 524

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 525

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 526

```text
            <span class="label">Current Bet</span>
```

<span> is a inline status/text element with class='label', Current, Bet, span and displays 'Current Bet'.

### Line 527

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 528

```text
              <button id="btn-three-coin-minus" class="btn-small">-</button>
```

<button> is a interactive button with id='btn-three-coin-minus', class='btn-small', -, button and displays '-'.

### Line 529

```text
              <span id="bet-three-coin-display" class="value">$10</span>
```

<span> is a inline status/text element with id='bet-three-coin-display', class='value', 10, span and displays '$10'.

### Line 530

```text
              <button id="btn-three-coin-plus" class="btn-small">+</button>
```

<button> is a interactive button with id='btn-three-coin-plus', class='btn-small', button and displays '+'.

### Line 531

```text
              <button id="btn-three-coin-clear" class="btn-small">Clear Bet</button>
```

<button> is a interactive button with id='btn-three-coin-clear', class='btn-small', Clear, Bet, button and displays 'Clear Bet'.

### Line 532

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 533

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 534

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 535

```text

```

Blank line separates nearby markup sections.

### Line 536

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 537

```text
          <button id="btn-three-coin-max" class="max-btn">MAX</button>
```

<button> is a interactive button with id='btn-three-coin-max', class='max-btn', MAX, button and displays 'MAX'.

### Line 538

```text
          <button id="btn-three-coin-flip" class="spin-btn">FLIP COINS</button>
```

<button> is a interactive button with id='btn-three-coin-flip', class='spin-btn', FLIP, COINS, button and displays 'FLIP COINS'.

### Line 539

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 540

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 541

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 542

```text

```

Blank line separates nearby markup sections.

### Line 543

```text

```

Blank line separates nearby markup sections.

### Line 544

```text
    <!-- 5-REEL SLOTS VIEW -->
```

Comment: 5-REEL SLOTS VIEW.

### Line 545

```text
    <section id="view-5reel-slots" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-5reel-slots', class='view-screen hidden-view'.

### Line 546

```text
      <button class="back-lobby-btn">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 547

```text
      
```

Blank line separates nearby markup sections.

### Line 548

```text
      <div class="slot-machine slot-5reel">
```

<div> is a layout container with class='slot-machine slot-5reel'.

### Line 549

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 550

```text
          <h1>Gem Quest 5x3</h1>
```

<h1> is a top-level heading with Gem, Quest, 5x3, h1 and displays 'Gem Quest 5x3'.

### Line 551

```text
          <p class="slot-theme-stakes">HIGH STAKES · $5 MINIMUM</p>
```

<p> is a paragraph with class='slot-theme-stakes', HIGH, STAKES, 5, MINIMUM, p and displays 'HIGH STAKES · $5 MINIMUM'.

### Line 552

```text
          <div id="status-5reel" class="status-banner" data-slot-status>PRESS SPIN TO PLAY</div>
```

<div> is a layout container with id='status-5reel', class='status-banner', data-slot-status, PRESS, SPIN, TO, PLAY, div and displays 'PRESS SPIN TO PLAY'.

### Line 553

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 554

```text

```

Blank line separates nearby markup sections.

### Line 555

```text
        <div id="bonus-hud-5reel" class="bonus-hud hidden-view" data-slot-bonus-hud>
```

<div> is a layout container with id='bonus-hud-5reel', class='bonus-hud hidden-view', data-slot-bonus-hud.

### Line 556

```text
          <div class="bonus-stat">FREE SPINS: <span id="fs-remaining-count" data-slot-fs-count>0</span></div>
```

<div> is a layout container with class='bonus-stat', FREE, SPINS:, span, id='fs-remaining-count', data-slot-fs-count, 0, span, div and displays 'FREE SPINS: 0'.

### Line 557

```text
          <div class="bonus-stat">BONUS WIN: <span id="fs-total-win" data-slot-fs-win>$0.00</span></div>
```

<div> is a layout container with class='bonus-stat', BONUS, WIN:, span, id='fs-total-win', data-slot-fs-win, 0, 00, span, div and displays 'BONUS WIN: $0.00'.

### Line 558

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 559

```text

```

Blank line separates nearby markup sections.

### Line 560

```text
        <div class="reels-viewport-5reel">
```

<div> is a layout container with class='reels-viewport-5reel'.

### Line 561

```text
          <div class="reel-5reel" id="reel5-0"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', id='reel5-0', div, class='strip', div, div.

### Line 562

```text
          <div class="reel-5reel" id="reel5-1"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', id='reel5-1', div, class='strip', div, div.

### Line 563

```text
          <div class="reel-5reel" id="reel5-2"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', id='reel5-2', div, class='strip', div, div.

### Line 564

```text
          <div class="reel-5reel" id="reel5-3"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', id='reel5-3', div, class='strip', div, div.

### Line 565

```text
          <div class="reel-5reel" id="reel5-4"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', id='reel5-4', div, class='strip', div, div.

### Line 566

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 567

```text

```

Blank line separates nearby markup sections.

### Line 568

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 569

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 570

```text
            <span class="label">Total stake · 10 paylines</span>
```

<span> is a inline status/text element with class='label', Total, stake, 10, paylines, span and displays 'Total stake · 10 paylines'.

### Line 571

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 572

```text
              <button id="btn5-minus" class="btn-small" data-slot-minus type="button" aria-label="Decrease bet">-</button>
```

<button> is a interactive button with id='btn5-minus', class='btn-small', data-slot-minus, type='button', aria-label='Decrease bet', -, button and displays '-'.

### Line 573

```text
              <span id="bet5-display" class="value" data-slot-bet>$10.00</span>
```

<span> is a inline status/text element with id='bet5-display', class='value', data-slot-bet, 10, 00, span and displays '$10.00'.

### Line 574

```text
              <button id="btn5-plus" class="btn-small" data-slot-plus type="button" aria-label="Increase bet">+</button>
```

<button> is a interactive button with id='btn5-plus', class='btn-small', data-slot-plus, type='button', aria-label='Increase bet', button and displays '+'.

### Line 575

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 576

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 577

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 578

```text

```

Blank line separates nearby markup sections.

### Line 579

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 580

```text
          <button id="btn5-max" class="max-btn" data-slot-max type="button">MAX</button>
```

<button> is a interactive button with id='btn5-max', class='max-btn', data-slot-max, type='button', MAX, button and displays 'MAX'.

### Line 581

```text
          <button id="btn5-spin" class="spin-btn" data-slot-spin type="button">SPIN</button>
```

<button> is a interactive button with id='btn5-spin', class='spin-btn', data-slot-spin, type='button', SPIN, button and displays 'SPIN'.

### Line 582

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 583

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 584

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 585

```text

```

Blank line separates nearby markup sections.

### Line 586

```text
    <!-- CLASSIC SLOTS VIEW -->
```

Comment: CLASSIC SLOTS VIEW.

### Line 587

```text
    <section id="view-classic-slots" class="view-screen hidden-view">
```

<section> is a page/view section with id='view-classic-slots', class='view-screen hidden-view'.

### Line 588

```text
      <button class="back-lobby-btn">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 589

```text
      
```

Blank line separates nearby markup sections.

### Line 590

```text
      <div class="slot-machine">
```

<div> is a layout container with class='slot-machine'.

### Line 591

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 592

```text
          <h1>Classic 3-Reel</h1>
```

<h1> is a top-level heading with Classic, 3-Reel, h1 and displays 'Classic 3-Reel'.

### Line 593

```text
          <p class="slot-theme-stakes">HIGH STAKES · $5 MINIMUM</p>
```

<p> is a paragraph with class='slot-theme-stakes', HIGH, STAKES, 5, MINIMUM, p and displays 'HIGH STAKES · $5 MINIMUM'.

### Line 594

```text
          <div id="status" class="status-banner" data-slot-status>PRESS SPIN TO PLAY</div>
```

<div> is a layout container with id='status', class='status-banner', data-slot-status, PRESS, SPIN, TO, PLAY, div and displays 'PRESS SPIN TO PLAY'.

### Line 595

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 596

```text

```

Blank line separates nearby markup sections.

### Line 597

```text
        <div class="reels-viewport">
```

<div> is a layout container with class='reels-viewport'.

### Line 598

```text
          <div class="payline-overlay"></div>
```

<div> is a layout container with class='payline-overlay', div.

### Line 599

```text
          <div class="reel" id="reel-0"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', id='reel-0', div, class='strip', div, div.

### Line 600

```text
          <div class="reel" id="reel-1"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', id='reel-1', div, class='strip', div, div.

### Line 601

```text
          <div class="reel" id="reel-2"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', id='reel-2', div, class='strip', div, div.

### Line 602

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 603

```text

```

Blank line separates nearby markup sections.

### Line 604

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 605

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 606

```text
            <span class="label">Current Bet</span>
```

<span> is a inline status/text element with class='label', Current, Bet, span and displays 'Current Bet'.

### Line 607

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 608

```text
              <button id="btn-minus" class="btn-small" data-slot-minus type="button" aria-label="Decrease bet">-</button>
```

<button> is a interactive button with id='btn-minus', class='btn-small', data-slot-minus, type='button', aria-label='Decrease bet', -, button and displays '-'.

### Line 609

```text
              <span id="bet-display" class="value" data-slot-bet>$10.00</span>
```

<span> is a inline status/text element with id='bet-display', class='value', data-slot-bet, 10, 00, span and displays '$10.00'.

### Line 610

```text
              <button id="btn-plus" class="btn-small" data-slot-plus type="button" aria-label="Increase bet">+</button>
```

<button> is a interactive button with id='btn-plus', class='btn-small', data-slot-plus, type='button', aria-label='Increase bet', button and displays '+'.

### Line 611

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 612

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 613

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 614

```text

```

Blank line separates nearby markup sections.

### Line 615

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 616

```text
          <button id="btn-max" class="max-btn" data-slot-max type="button">MAX</button>
```

<button> is a interactive button with id='btn-max', class='max-btn', data-slot-max, type='button', MAX, button and displays 'MAX'.

### Line 617

```text
          <button id="btn-spin" class="spin-btn" data-slot-spin type="button">SPIN</button>
```

<button> is a interactive button with id='btn-spin', class='spin-btn', data-slot-spin, type='button', SPIN, button and displays 'SPIN'.

### Line 618

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 619

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 620

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 621

```text

```

Blank line separates nearby markup sections.

### Line 622

```text
  </main>
```

Closes the main element opened by the surrounding markup.

### Line 623

```text

```

Blank line separates nearby markup sections.

### Line 624

```text
  <template id="slot-template-classic">
```

<template> is a inert reusable DOM template with id='slot-template-classic'.

### Line 625

```text
    <section>
```

<section> is a page/view section.

### Line 626

```text
      <button class="back-lobby-btn" type="button">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', type='button', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 627

```text
      <div class="slot-machine theme-slot-machine">
```

<div> is a layout container with class='slot-machine theme-slot-machine'.

### Line 628

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 629

```text
          <h1 data-slot-title></h1>
```

<h1> is a top-level heading with data-slot-title, h1.

### Line 630

```text
          <p class="slot-theme-stakes" data-slot-stakes></p>
```

<p> is a paragraph with class='slot-theme-stakes', data-slot-stakes, p.

### Line 631

```text
          <div class="status-banner" data-slot-status role="status" aria-live="polite"></div>
```

<div> is a layout container with class='status-banner', data-slot-status, role='status', aria-live='polite', div.

### Line 632

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 633

```text
        <div class="reels-viewport">
```

<div> is a layout container with class='reels-viewport'.

### Line 634

```text
          <div class="payline-overlay"></div>
```

<div> is a layout container with class='payline-overlay', div.

### Line 635

```text
          <div class="reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', div, class='strip', div, div.

### Line 636

```text
          <div class="reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', div, class='strip', div, div.

### Line 637

```text
          <div class="reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel', div, class='strip', div, div.

### Line 638

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 639

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 640

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 641

```text
            <span class="label">Total stake · 5 paylines</span>
```

<span> is a inline status/text element with class='label', Total, stake, 5, paylines, span and displays 'Total stake · 5 paylines'.

### Line 642

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 643

```text
              <button class="btn-small" data-slot-minus type="button" aria-label="Decrease bet">−</button>
```

<button> is a interactive button with class='btn-small', data-slot-minus, type='button', aria-label='Decrease bet', button and displays '−'.

### Line 644

```text
              <span class="value" data-slot-bet></span>
```

<span> is a inline status/text element with class='value', data-slot-bet, span.

### Line 645

```text
              <button class="btn-small" data-slot-plus type="button" aria-label="Increase bet">+</button>
```

<button> is a interactive button with class='btn-small', data-slot-plus, type='button', aria-label='Increase bet', button and displays '+'.

### Line 646

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 647

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 648

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 649

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 650

```text
          <button class="max-btn" data-slot-max type="button">MAX</button>
```

<button> is a interactive button with class='max-btn', data-slot-max, type='button', MAX, button and displays 'MAX'.

### Line 651

```text
          <button class="spin-btn" data-slot-spin type="button">SPIN</button>
```

<button> is a interactive button with class='spin-btn', data-slot-spin, type='button', SPIN, button and displays 'SPIN'.

### Line 652

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 653

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 654

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 655

```text
  </template>
```

Closes the template element opened by the surrounding markup.

### Line 656

```text

```

Blank line separates nearby markup sections.

### Line 657

```text
  <template id="slot-template-gem-quest">
```

<template> is a inert reusable DOM template with id='slot-template-gem-quest'.

### Line 658

```text
    <section>
```

<section> is a page/view section.

### Line 659

```text
      <button class="back-lobby-btn" type="button">⬅ BACK TO LOBBY</button>
```

<button> is a interactive button with class='back-lobby-btn', type='button', BACK, TO, LOBBY, button and displays '⬅ BACK TO LOBBY'.

### Line 660

```text
      <div class="slot-machine slot-5reel theme-slot-machine">
```

<div> is a layout container with class='slot-machine slot-5reel theme-slot-machine'.

### Line 661

```text
        <div class="header">
```

<div> is a layout container with class='header'.

### Line 662

```text
          <h1 data-slot-title></h1>
```

<h1> is a top-level heading with data-slot-title, h1.

### Line 663

```text
          <p class="slot-theme-stakes" data-slot-stakes></p>
```

<p> is a paragraph with class='slot-theme-stakes', data-slot-stakes, p.

### Line 664

```text
          <div class="status-banner" data-slot-status role="status" aria-live="polite"></div>
```

<div> is a layout container with class='status-banner', data-slot-status, role='status', aria-live='polite', div.

### Line 665

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 666

```text
        <div class="bonus-hud hidden-view" data-slot-bonus-hud>
```

<div> is a layout container with class='bonus-hud hidden-view', data-slot-bonus-hud.

### Line 667

```text
          <div class="bonus-stat">FREE SPINS: <span data-slot-fs-count>0</span></div>
```

<div> is a layout container with class='bonus-stat', FREE, SPINS:, span, data-slot-fs-count, 0, span, div and displays 'FREE SPINS: 0'.

### Line 668

```text
          <div class="bonus-stat">BONUS WIN: <span data-slot-fs-win>$0.00</span></div>
```

<div> is a layout container with class='bonus-stat', BONUS, WIN:, span, data-slot-fs-win, 0, 00, span, div and displays 'BONUS WIN: $0.00'.

### Line 669

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 670

```text
        <div class="reels-viewport-5reel">
```

<div> is a layout container with class='reels-viewport-5reel'.

### Line 671

```text
          <div class="reel-5reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', div, class='strip', div, div.

### Line 672

```text
          <div class="reel-5reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', div, class='strip', div, div.

### Line 673

```text
          <div class="reel-5reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', div, class='strip', div, div.

### Line 674

```text
          <div class="reel-5reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', div, class='strip', div, div.

### Line 675

```text
          <div class="reel-5reel"><div class="strip"></div></div>
```

<div> is a layout container with class='reel-5reel', div, class='strip', div, div.

### Line 676

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 677

```text
        <div class="dashboard">
```

<div> is a layout container with class='dashboard'.

### Line 678

```text
          <div class="card">
```

<div> is a layout container with class='card'.

### Line 679

```text
            <span class="label">Total stake · 10 paylines</span>
```

<span> is a inline status/text element with class='label', Total, stake, 10, paylines, span and displays 'Total stake · 10 paylines'.

### Line 680

```text
            <div class="bet-controls">
```

<div> is a layout container with class='bet-controls'.

### Line 681

```text
              <button class="btn-small" data-slot-minus type="button" aria-label="Decrease bet">−</button>
```

<button> is a interactive button with class='btn-small', data-slot-minus, type='button', aria-label='Decrease bet', button and displays '−'.

### Line 682

```text
              <span class="value" data-slot-bet></span>
```

<span> is a inline status/text element with class='value', data-slot-bet, span.

### Line 683

```text
              <button class="btn-small" data-slot-plus type="button" aria-label="Increase bet">+</button>
```

<button> is a interactive button with class='btn-small', data-slot-plus, type='button', aria-label='Increase bet', button and displays '+'.

### Line 684

```text
            </div>
```

Closes the div element opened by the surrounding markup.

### Line 685

```text
          </div>
```

Closes the div element opened by the surrounding markup.

### Line 686

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 687

```text
        <div class="actions">
```

<div> is a layout container with class='actions'.

### Line 688

```text
          <button class="max-btn" data-slot-max type="button">MAX</button>
```

<button> is a interactive button with class='max-btn', data-slot-max, type='button', MAX, button and displays 'MAX'.

### Line 689

```text
          <button class="spin-btn" data-slot-spin type="button">SPIN</button>
```

<button> is a interactive button with class='spin-btn', data-slot-spin, type='button', SPIN, button and displays 'SPIN'.

### Line 690

```text
        </div>
```

Closes the div element opened by the surrounding markup.

### Line 691

```text
      </div>
```

Closes the div element opened by the surrounding markup.

### Line 692

```text
    </section>
```

Closes the section element opened by the surrounding markup.

### Line 693

```text
  </template>
```

Closes the template element opened by the surrounding markup.

### Line 694

```text

```

Blank line separates nearby markup sections.

### Line 695

```text
  <div class="splash-modal hidden-view" id="splash-modal" role="dialog" aria-modal="true" aria-labelledby="splash-title">
```

<div> is a layout container with class='splash-modal hidden-view', id='splash-modal', role='dialog', aria-modal='true', aria-labelledby='splash-title'.

### Line 696

```text
    <img src="assets/splash.png" alt="" class="splash-logo" id="splash-logo" />
```

<img> is a image with src='assets/splash.png', alt='', class='splash-logo', id='splash-logo'.

### Line 697

```text
    <div class="splash-copy">
```

<div> is a layout container with class='splash-copy'.

### Line 698

```text
      <p class="splash-kicker">Welcome To</p>
```

<p> is a paragraph with class='splash-kicker', Welcome, To, p and displays 'Welcome To'.

### Line 699

```text
      <h1 id="splash-title">Sluts &amp; Slots Casino</h1>
```

<h1> is a top-level heading with id='splash-title', Sluts, amp, Slots, Casino, h1 and displays 'Sluts &amp; Slots Casino'.

### Line 700

```text
      <p class="splash-tagline">Slots · table games · racing</p>
```

<p> is a paragraph with class='splash-tagline', Slots, table, games, racing, p and displays 'Slots · table games · racing'.

### Line 701

```text
      <p class="splash-disclaimer">Just-for-fun play</p>
```

<p> is a paragraph with class='splash-disclaimer', Just-for-fun, play, p and displays 'Just-for-fun play'.

### Line 702

```text
    </div>
```

Closes the div element opened by the surrounding markup.

### Line 703

```text
    <button class="splash-skip" id="btn-skip-splash" type="button">Skip intro</button>
```

<button> is a interactive button with class='splash-skip', id='btn-skip-splash', type='button', Skip, intro, button and displays 'Skip intro'.

### Line 704

```text
  </div>
```

Closes the div element opened by the surrounding markup.

### Line 705

```text

```

Blank line separates nearby markup sections.

### Line 706

```text
</body>
```

Closes the body element opened by the surrounding markup.

### Line 707

```text
</html>
```

Closes the html element opened by the surrounding markup.
