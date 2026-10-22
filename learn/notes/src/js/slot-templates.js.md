# src/js/slot-templates.js

[Exact copy](../../../original/src/js/slot-templates.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/*
```

Comment documents how this part supports the virtual casino engine.

### Line 2

```text
 * Catalog data is separate from spin mechanics so a new themed table can select a template, palette, and stake policy
```

Comment documents how this part supports the virtual casino engine.

### Line 3

```text
 * without copying an engine. The catalog also creates its lobby card and hidden play view.
```

Comment documents how this part supports the virtual casino engine.

### Line 4

```text
 */
```

Comment documents how this part supports the virtual casino engine.

### Line 5

```text
/* Slot themes and stake presets live in one catalog so new tables reuse the same engines and the dedicated Slot Room. */
```

Comment documents how this part supports the virtual casino engine.

### Line 6

```text
(function installSlotGameCatalog() {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 7

```text
  // A theme is data: CSS colors, optional symbol substitutions, and sound-preset names.
```

Comment documents how this part supports the virtual casino engine.

### Line 8

```text
  const themes = {
```

Private theme catalog containing colors, icons, and sounds.

### Line 9

```text
    classicGold: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 10

```text
      id: 'classic-gold',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 11

```text
      label: 'Classic Gold',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 12

```text
      cardIcon: '🎰',
```

Chooses the lobby icon shown for this themed cabinet.

### Line 13

```text
      colors: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 14

```text
        'machine-start': '#2a2a35', 'machine-end': '#141419', 'accent': '#ffd700',
```

Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.

### Line 15

```text
        frame: '#15151b', 'reel': '#181820', 'symbol': '#1d1d26', 'symbol-border': '#2a2a38',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 16

```text
        highlight: '#3b3111', 'button-start': '#ffd700', 'button-end': '#b8860b'
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 17

```text
      },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 18

```text
      sounds: { reelStop: 'classic', win: 'classic' }
```

Selects the sound preset used for reel stops and wins.

### Line 19

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 20

```text
    royalGems: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 21

```text
      id: 'royal-gems',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 22

```text
      label: 'Royal Gems',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 23

```text
      cardIcon: '💎',
```

Chooses the lobby icon shown for this themed cabinet.

### Line 24

```text
      colors: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 25

```text
        'machine-start': '#29213d', 'machine-end': '#100d1b', 'accent': '#c9a7ff',
```

Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.

### Line 26

```text
        frame: '#120e1e', 'reel': '#201631', 'symbol': '#271b3a', 'symbol-border': '#493364',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 27

```text
        highlight: '#4c3272', 'button-start': '#bf87ff', 'button-end': '#7042b8'
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 28

```text
      },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 29

```text
      symbols: { ruby: '💎', crown: '👑', wild: '🃏', scatter: '⭐' },
```

Begins the optional symbol-to-icon substitutions for this theme.

### Line 30

```text
      sounds: { reelStop: 'royal', win: 'royal' }
```

Selects the sound preset used for reel stops and wins.

### Line 31

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 32

```text
    citrusGarden: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 33

```text
      id: 'citrus-garden',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 34

```text
      label: 'Citrus Garden',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 35

```text
      cardIcon: '🍋',
```

Chooses the lobby icon shown for this themed cabinet.

### Line 36

```text
      colors: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 37

```text
        'machine-start': '#28452e', 'machine-end': '#0f1c14', 'accent': '#9be564',
```

Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.

### Line 38

```text
        frame: '#0d1b12', 'reel': '#17271b', 'symbol': '#1d3021', 'symbol-border': '#37533b',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 39

```text
        highlight: '#405b26', 'button-start': '#a8ee5e', 'button-end': '#559936'
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 40

```text
      },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 41

```text
      symbols: { cherry: '🍓', lemon: '🍋', orange: '🍊', bell: '🌼', wild: '🦋', seven: '🍀' },
```

Begins the optional symbol-to-icon substitutions for this theme.

### Line 42

```text
      sounds: { reelStop: 'garden', win: 'garden' }
```

Selects the sound preset used for reel stops and wins.

### Line 43

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 44

```text
    neonMidway: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 45

```text
      id: 'neon-midway',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 46

```text
      label: 'Neon Midway',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 47

```text
      cardIcon: '🌙',
```

Chooses the lobby icon shown for this themed cabinet.

### Line 48

```text
      colors: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 49

```text
        'machine-start': '#27133f', 'machine-end': '#080d20', 'accent': '#58f4ff',
```

Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.

### Line 50

```text
        frame: '#090e20', 'reel': '#151531', 'symbol': '#1d1c3b', 'symbol-border': '#39366d',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 51

```text
        highlight: '#3d286d', 'button-start': '#63f3ff', 'button-end': '#8456ef'
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 52

```text
      },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 53

```text
      symbols: { cherry: '🌙', lemon: '⚡', orange: '🔮', bell: '🎛️', wild: '👾', seven: '7️⃣' },
```

Begins the optional symbol-to-icon substitutions for this theme.

### Line 54

```text
      sounds: { reelStop: 'neon', win: 'neon' }
```

Selects the sound preset used for reel stops and wins.

### Line 55

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 56

```text
    deepSea: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 57

```text
      id: 'deep-sea',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 58

```text
      label: 'Deep Sea',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 59

```text
      cardIcon: '🐚',
```

Chooses the lobby icon shown for this themed cabinet.

### Line 60

```text
      colors: {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 61

```text
        'machine-start': '#123c56', 'machine-end': '#071522', 'accent': '#57e3dc',
```

Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.

### Line 62

```text
        frame: '#061824', 'reel': '#0c2a3a', 'symbol': '#103448', 'symbol-border': '#1a5260',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 63

```text
        highlight: '#155662', 'button-start': '#62f0d5', 'button-end': '#1687a4'
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 64

```text
      },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 65

```text
      symbols: { ten: '🐚', jack: '🐠', queen: '🧜', king: '🐙', ace: '🐬', ruby: '🪸', crown: '🐳', wild: '🦑', scatter: '⭐' },
```

Begins the optional symbol-to-icon substitutions for this theme.

### Line 66

```text
      sounds: { reelStop: 'ocean', win: 'ocean' }
```

Selects the sound preset used for reel stops and wins.

### Line 67

```text
    }
```

Closes the current block or module.

### Line 68

```text
  };
```

Closes the current block or module.

### Line 69

```text

```

Blank line separates related code sections.

### Line 70

```text
  // One configuration describes a cabinet; decimal stake values are later validated by integer-cent rules.
```

Comment documents how this part supports the virtual casino engine.

### Line 71

```text
  const games = [
```

Catalog of slot cabinets and their stake policies.

### Line 72

```text
    {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 73

```text
      id: 'penny-slots',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 74

```text
      engine: 'classic',
```

Chooses the payout/spin engine that interprets this cabinet.

### Line 75

```text
      templateId: 'slot-template-classic',
```

Names the HTML template cloned for this cabinet.

### Line 76

```text
      title: 'Citrus Garden Penny Slots',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 77

```text
      description: 'A bright 3-reel fruit-and-flower table with five paylines.',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 78

```text
      stakes: '$0.05–$5.00 · 5¢ steps',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 79

```text
      themeId: 'citrusGarden',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 80

```text
      minimumBet: 0.05,
```

Cabinet minimum wager.

### Line 81

```text
      betStep: 0.05,
```

Cabinet wager increment.

### Line 82

```text
      maximumBet: 5,
```

Cabinet hard wager ceiling.

### Line 83

```text
      startingBet: 0.05
```

Initial cabinet wager.

### Line 84

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 85

```text
    {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 86

```text
      id: 'quarter-slots',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 87

```text
      engine: 'classic',
```

Chooses the payout/spin engine that interprets this cabinet.

### Line 88

```text
      templateId: 'slot-template-classic',
```

Names the HTML template cloned for this cabinet.

### Line 89

```text
      title: 'Neon Midway Quarter Slots',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 90

```text
      description: 'A glowing 3-reel arcade table with five paylines.',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 91

```text
      stakes: '$0.25–$25.00 · 25¢ steps',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 92

```text
      themeId: 'neonMidway',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 93

```text
      minimumBet: 0.25,
```

Cabinet minimum wager.

### Line 94

```text
      betStep: 0.25,
```

Cabinet wager increment.

### Line 95

```text
      maximumBet: 25,
```

Cabinet hard wager ceiling.

### Line 96

```text
      startingBet: 0.25
```

Initial cabinet wager.

### Line 97

```text
    },
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 98

```text
    {
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 99

```text
      id: 'quarter-gem-quest',
```

Gives this slot theme or game a stable identifier/display label used to select and render it.

### Line 100

```text
      engine: 'five-reel',
```

Chooses the payout/spin engine that interprets this cabinet.

### Line 101

```text
      templateId: 'slot-template-gem-quest',
```

Names the HTML template cloned for this cabinet.

### Line 102

```text
      title: 'Deep Sea Gem Quest',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 103

```text
      description: 'A 5-reel underwater adventure with free spins and sticky wilds.',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 104

```text
      stakes: '$0.25–$25.00 · 25¢ steps',
```

Supplies the player-facing cabinet title, description, or stake-range text.

### Line 105

```text
      themeId: 'deepSea',
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 106

```text
      minimumBet: 0.25,
```

Cabinet minimum wager.

### Line 107

```text
      betStep: 0.25,
```

Cabinet wager increment.

### Line 108

```text
      maximumBet: 25,
```

Cabinet hard wager ceiling.

### Line 109

```text
      startingBet: 0.25
```

Initial cabinet wager.

### Line 110

```text
    }
```

Closes the current block or module.

### Line 111

```text
  ];
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 112

```text

```

Blank line separates related code sections.

### Line 113

```text
  // CSS custom properties let one reusable stylesheet skin different machines without duplicating layout rules.
```

Comment documents how this part supports the virtual casino engine.

### Line 114

```text
  function applyTheme(root, theme) {
```

Applies a theme’s CSS variables and background to a machine.

### Line 115

```text
    if (!root || !theme) return;
```

Guards the following action so it runs only when the condition is true.

### Line 116

```text
    const target = root.classList.contains('slot-machine') ? root : (root.querySelector('.slot-machine') || root);
```

Accepts matching three-reel symbols with wild substitution, or identifies the five-reel run symbol.

### Line 117

```text
    target.classList.add('theme-slot-machine');
```

Adds the shared themed-machine CSS class.

### Line 118

```text
    target.dataset.theme = theme.id || '';
```

Stores the theme ID in the DOM.

### Line 119

```text
    Object.entries(theme.colors || {}).forEach(([name, value]) => {
```

Writes each color as a --slot-* CSS variable.

### Line 120

```text
      target.style.setProperty(`--slot-${name}`, value);
```

Changes the cloned machine’s inline CSS so this theme’s visual value takes effect.

### Line 121

```text
    });
```

Closes the current block or module.

### Line 122

```text
    const image = theme.backgroundImage
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 123

```text
      ? `url("${String(theme.backgroundImage).replace(/["\\]/g, '\\$&')}")`
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 124

```text
      : 'none';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 125

```text
    target.style.setProperty('--slot-background-image', image);
```

Changes the cloned machine’s inline CSS so this theme’s visual value takes effect.

### Line 126

```text
  }
```

Closes the current block or module.

### Line 127

```text

```

Blank line separates related code sections.

### Line 128

```text
  // Clone symbol records before replacement so one cabinet cannot mutate another cabinet's shared paytable data.
```

Comment documents how this part supports the virtual casino engine.

### Line 129

```text
  function applySymbolTheme(symbol, theme) {
```

Clones a symbol and applies cabinet-specific icon/image/alt overrides.

### Line 130

```text
    const override = theme?.symbols?.[symbol.id];
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 131

```text
    if (typeof override === 'string') return { ...symbol, icon: override };
```

Guards the following action so it runs only when the condition is true.

### Line 132

```text
    if (override && typeof override === 'object') {
```

Guards the following action so it runs only when the condition is true.

### Line 133

```text
      return {
```

Returns an object with fields copied from `symbol` (symbol); icon: uses `override.icon` (the icon property of override) unless it is null or undefined, then falls back to `symbol.icon` (the icon property of symbol); image: uses `override.image` (the image property of override) unless it is null or undefined, then falls back to `symbol.image` (the image property of symbol); alt: uses uses `override.alt` (the alt property of override) unless it is null or undefined, then falls back to `symbol.alt` (the alt property of symbol) unless it is null or undefined, then falls back to `symbol.id` (the id property of symbol) to the caller and exits this function.

### Line 134

```text
        ...symbol,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 135

```text
        icon: override.icon ?? symbol.icon,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 136

```text
        image: override.image ?? symbol.image,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 137

```text
        alt: override.alt ?? symbol.alt ?? symbol.id
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 138

```text
      };
```

Closes the current block or module.

### Line 139

```text
    }
```

Closes the current block or module.

### Line 140

```text
    return { ...symbol };
```

Returns an object with fields copied from `symbol` (symbol) to the caller and exits this function.

### Line 141

```text
  }
```

Closes the current block or module.

### Line 142

```text

```

Blank line separates related code sections.

### Line 143

```text
  // Add catalog cards before DOMContentLoaded so the central controller can wire all play buttons in one pass.
```

Comment documents how this part supports the virtual casino engine.

### Line 144

```text
  function render() {
```

Builds lobby cards and hidden play views for catalog games.

### Line 145

```text
    // The static high-stakes tables and generated catalog tables share this container, keeping every slot choice in one lobby room.
```

Comment documents how this part supports the virtual casino engine.

### Line 146

```text
    const cardGrid = document.querySelector('.slot-room-grid');
```

Finds a specific control inside the cloned view so its player-facing text can be filled.

### Line 147

```text
    const viewHost = document.getElementById('app-container');
```

Creates the DOM element needed for this lobby card or game control.

### Line 148

```text
    if (!cardGrid || !viewHost) return;
```

Guards the following action so it runs only when the condition is true.

### Line 149

```text

```

Blank line separates related code sections.

### Line 150

```text
    games.forEach(game => {
```

Processes every configured cabinet.

### Line 151

```text
      const theme = themes[game.themeId];
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 152

```text
      const card = document.createElement('article');
```

Creates the DOM element needed for this lobby card or game control.

### Line 153

```text
      card.className = 'game-card themed-slot-card';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 154

```text
      const icon = document.createElement('div');
```

Creates the DOM element needed for this lobby card or game control.

### Line 155

```text
      icon.className = 'card-icon';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 156

```text
      icon.textContent = theme.cardIcon;
```

Writes the configured catalog value into the corresponding visible lobby/view label.

### Line 157

```text
      const heading = document.createElement('h3');
```

Creates the DOM element needed for this lobby card or game control.

### Line 158

```text
      heading.textContent = game.title;
```

Writes the configured catalog value into the corresponding visible lobby/view label.

### Line 159

```text
      const description = document.createElement('p');
```

Creates the DOM element needed for this lobby card or game control.

### Line 160

```text
      description.textContent = game.description;
```

Writes the configured catalog value into the corresponding visible lobby/view label.

### Line 161

```text
      const stakes = document.createElement('p');
```

Creates the DOM element needed for this lobby card or game control.

### Line 162

```text
      stakes.className = 'slot-stakes-note';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 163

```text
      stakes.textContent = game.stakes;
```

Writes the configured catalog value into the corresponding visible lobby/view label.

### Line 164

```text
      const button = document.createElement('button');
```

Creates the DOM element needed for this lobby card or game control.

### Line 165

```text
      button.type = 'button';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 166

```text
      button.className = 'play-btn';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 167

```text
      button.dataset.game = game.id;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 168

```text
      button.textContent = 'PLAY NOW';
```

Writes the configured catalog value into the corresponding visible lobby/view label.

### Line 169

```text
      card.append(icon, heading, description, stakes, button);
```

Assembles the lobby card contents.

### Line 170

```text
      cardGrid.appendChild(card);
```

Adds the newly built DOM element to its parent so players can see/use it.

### Line 171

```text

```

Blank line separates related code sections.

### Line 172

```text
      const template = document.getElementById(game.templateId);
```

Creates the DOM element needed for this lobby card or game control.

### Line 173

```text
      if (!template?.content?.firstElementChild) throw new Error(`Missing slot template: ${game.templateId}`);
```

Guards the following action so it runs only when the condition is true.

### Line 174

```text
      const view = template.content.firstElementChild.cloneNode(true);
```

Clones the matching HTML template, failing if it is missing.

### Line 175

```text
      view.id = `view-${game.id}`;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 176

```text
      view.classList.add('view-screen', 'hidden-view');
```

Marks the cloned game view as controller-managed and hidden initially.

### Line 177

```text
      view.dataset.extraSlotView = 'true';
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 178

```text
      view.dataset.gameView = game.id;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 179

```text
      view.dataset.engine = game.engine;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 180

```text
      view.dataset.theme = theme.id;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 181

```text
      view.querySelector('[data-slot-title]').textContent = game.title;
```

Finds a specific control inside the cloned view so its player-facing text can be filled.

### Line 182

```text
      view.querySelector('[data-slot-status]').textContent = 'PRESS SPIN TO PLAY';
```

Finds a specific control inside the cloned view so its player-facing text can be filled.

### Line 183

```text
      view.querySelector('[data-slot-stakes]').textContent = game.stakes;
```

Finds a specific control inside the cloned view so its player-facing text can be filled.

### Line 184

```text
      applyTheme(view.querySelector('.theme-slot-machine'), theme);
```

Skins the cloned machine.

### Line 185

```text
      viewHost.appendChild(view);
```

Adds the playable view to the application.

### Line 186

```text
      game.theme = theme;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 187

```text
      game.rootId = view.id;
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 188

```text
    });
```

Closes the current block or module.

### Line 189

```text
  }
```

Closes the current block or module.

### Line 190

```text

```

Blank line separates related code sections.

### Line 191

```text
  // Expose only the small catalog API required by the engines; keep configuration tables private in this closure.
```

Comment documents how this part supports the virtual casino engine.

### Line 192

```text
  window.SlotGameCatalog = {
```

Exposes catalog data and only the helpers engines need.

### Line 193

```text
    games,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 194

```text
    themes,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 195

```text
    applyTheme,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 196

```text
    applySymbolTheme,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 197

```text
    getTheme: id => themes[id] || themes.classicGold,
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 198

```text
    render
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 199

```text
  };
```

Closes the current block or module.

### Line 200

```text
  render();
```

Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.

### Line 201

```text
})();
```

Closes the current block or module.
