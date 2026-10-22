// Original L1: Comment documents how this part supports the virtual casino engine.
// Original L2: Comment documents how this part supports the virtual casino engine.
// Original L3: Comment documents how this part supports the virtual casino engine.
// Original L4: Comment documents how this part supports the virtual casino engine.
/*
 * Catalog data is separate from spin mechanics so a new themed table can select a template, palette, and stake policy
 * without copying an engine. The catalog also creates its lobby card and hidden play view.
 */
// Original L5: Comment documents how this part supports the virtual casino engine.
/* Slot themes and stake presets live in one catalog so new tables reuse the same engines and the dedicated Slot Room. */
// Original L6: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
(function installSlotGameCatalog() {
// Original L7: Comment documents how this part supports the virtual casino engine.
  // A theme is data: CSS colors, optional symbol substitutions, and sound-preset names.
// Original L8: Private theme catalog containing colors, icons, and sounds.
  const themes = {
// Original L9: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    classicGold: {
// Original L10: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'classic-gold',
// Original L11: Gives this slot theme or game a stable identifier/display label used to select and render it.
      label: 'Classic Gold',
// Original L12: Chooses the lobby icon shown for this themed cabinet.
      cardIcon: '🎰',
// Original L13: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      colors: {
// Original L14: Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.
        'machine-start': '#2a2a35', 'machine-end': '#141419', 'accent': '#ffd700',
// Original L15: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        frame: '#15151b', 'reel': '#181820', 'symbol': '#1d1d26', 'symbol-border': '#2a2a38',
// Original L16: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        highlight: '#3b3111', 'button-start': '#ffd700', 'button-end': '#b8860b'
// Original L17: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      },
// Original L18: Selects the sound preset used for reel stops and wins.
      sounds: { reelStop: 'classic', win: 'classic' }
// Original L19: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L20: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    royalGems: {
// Original L21: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'royal-gems',
// Original L22: Gives this slot theme or game a stable identifier/display label used to select and render it.
      label: 'Royal Gems',
// Original L23: Chooses the lobby icon shown for this themed cabinet.
      cardIcon: '💎',
// Original L24: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      colors: {
// Original L25: Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.
        'machine-start': '#29213d', 'machine-end': '#100d1b', 'accent': '#c9a7ff',
// Original L26: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        frame: '#120e1e', 'reel': '#201631', 'symbol': '#271b3a', 'symbol-border': '#493364',
// Original L27: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        highlight: '#4c3272', 'button-start': '#bf87ff', 'button-end': '#7042b8'
// Original L28: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      },
// Original L29: Begins the optional symbol-to-icon substitutions for this theme.
      symbols: { ruby: '💎', crown: '👑', wild: '🃏', scatter: '⭐' },
// Original L30: Selects the sound preset used for reel stops and wins.
      sounds: { reelStop: 'royal', win: 'royal' }
// Original L31: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L32: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    citrusGarden: {
// Original L33: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'citrus-garden',
// Original L34: Gives this slot theme or game a stable identifier/display label used to select and render it.
      label: 'Citrus Garden',
// Original L35: Chooses the lobby icon shown for this themed cabinet.
      cardIcon: '🍋',
// Original L36: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      colors: {
// Original L37: Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.
        'machine-start': '#28452e', 'machine-end': '#0f1c14', 'accent': '#9be564',
// Original L38: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        frame: '#0d1b12', 'reel': '#17271b', 'symbol': '#1d3021', 'symbol-border': '#37533b',
// Original L39: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        highlight: '#405b26', 'button-start': '#a8ee5e', 'button-end': '#559936'
// Original L40: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      },
// Original L41: Begins the optional symbol-to-icon substitutions for this theme.
      symbols: { cherry: '🍓', lemon: '🍋', orange: '🍊', bell: '🌼', wild: '🦋', seven: '🍀' },
// Original L42: Selects the sound preset used for reel stops and wins.
      sounds: { reelStop: 'garden', win: 'garden' }
// Original L43: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L44: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    neonMidway: {
// Original L45: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'neon-midway',
// Original L46: Gives this slot theme or game a stable identifier/display label used to select and render it.
      label: 'Neon Midway',
// Original L47: Chooses the lobby icon shown for this themed cabinet.
      cardIcon: '🌙',
// Original L48: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      colors: {
// Original L49: Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.
        'machine-start': '#27133f', 'machine-end': '#080d20', 'accent': '#58f4ff',
// Original L50: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        frame: '#090e20', 'reel': '#151531', 'symbol': '#1d1c3b', 'symbol-border': '#39366d',
// Original L51: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        highlight: '#3d286d', 'button-start': '#63f3ff', 'button-end': '#8456ef'
// Original L52: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      },
// Original L53: Begins the optional symbol-to-icon substitutions for this theme.
      symbols: { cherry: '🌙', lemon: '⚡', orange: '🔮', bell: '🎛️', wild: '👾', seven: '7️⃣' },
// Original L54: Selects the sound preset used for reel stops and wins.
      sounds: { reelStop: 'neon', win: 'neon' }
// Original L55: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L56: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    deepSea: {
// Original L57: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'deep-sea',
// Original L58: Gives this slot theme or game a stable identifier/display label used to select and render it.
      label: 'Deep Sea',
// Original L59: Chooses the lobby icon shown for this themed cabinet.
      cardIcon: '🐚',
// Original L60: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      colors: {
// Original L61: Theme data assigns a CSS custom-property name to a concrete machine color, controlling the cabinet’s visual skin.
        'machine-start': '#123c56', 'machine-end': '#071522', 'accent': '#57e3dc',
// Original L62: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        frame: '#061824', 'reel': '#0c2a3a', 'symbol': '#103448', 'symbol-border': '#1a5260',
// Original L63: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        highlight: '#155662', 'button-start': '#62f0d5', 'button-end': '#1687a4'
// Original L64: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      },
// Original L65: Begins the optional symbol-to-icon substitutions for this theme.
      symbols: { ten: '🐚', jack: '🐠', queen: '🧜', king: '🐙', ace: '🐬', ruby: '🪸', crown: '🐳', wild: '🦑', scatter: '⭐' },
// Original L66: Selects the sound preset used for reel stops and wins.
      sounds: { reelStop: 'ocean', win: 'ocean' }
// Original L67: Closes the current block or module.
    }
// Original L68: Closes the current block or module.
  };
// Original L69: Blank line separates related code sections.

// Original L70: Comment documents how this part supports the virtual casino engine.
  // One configuration describes a cabinet; decimal stake values are later validated by integer-cent rules.
// Original L71: Catalog of slot cabinets and their stake policies.
  const games = [
// Original L72: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    {
// Original L73: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'penny-slots',
// Original L74: Chooses the payout/spin engine that interprets this cabinet.
      engine: 'classic',
// Original L75: Names the HTML template cloned for this cabinet.
      templateId: 'slot-template-classic',
// Original L76: Supplies the player-facing cabinet title, description, or stake-range text.
      title: 'Citrus Garden Penny Slots',
// Original L77: Supplies the player-facing cabinet title, description, or stake-range text.
      description: 'A bright 3-reel fruit-and-flower table with five paylines.',
// Original L78: Supplies the player-facing cabinet title, description, or stake-range text.
      stakes: '$0.05–$5.00 · 5¢ steps',
// Original L79: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      themeId: 'citrusGarden',
// Original L80: Cabinet minimum wager.
      minimumBet: 0.05,
// Original L81: Cabinet wager increment.
      betStep: 0.05,
// Original L82: Cabinet hard wager ceiling.
      maximumBet: 5,
// Original L83: Initial cabinet wager.
      startingBet: 0.05
// Original L84: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L85: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    {
// Original L86: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'quarter-slots',
// Original L87: Chooses the payout/spin engine that interprets this cabinet.
      engine: 'classic',
// Original L88: Names the HTML template cloned for this cabinet.
      templateId: 'slot-template-classic',
// Original L89: Supplies the player-facing cabinet title, description, or stake-range text.
      title: 'Neon Midway Quarter Slots',
// Original L90: Supplies the player-facing cabinet title, description, or stake-range text.
      description: 'A glowing 3-reel arcade table with five paylines.',
// Original L91: Supplies the player-facing cabinet title, description, or stake-range text.
      stakes: '$0.25–$25.00 · 25¢ steps',
// Original L92: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      themeId: 'neonMidway',
// Original L93: Cabinet minimum wager.
      minimumBet: 0.25,
// Original L94: Cabinet wager increment.
      betStep: 0.25,
// Original L95: Cabinet hard wager ceiling.
      maximumBet: 25,
// Original L96: Initial cabinet wager.
      startingBet: 0.25
// Original L97: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    },
// Original L98: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    {
// Original L99: Gives this slot theme or game a stable identifier/display label used to select and render it.
      id: 'quarter-gem-quest',
// Original L100: Chooses the payout/spin engine that interprets this cabinet.
      engine: 'five-reel',
// Original L101: Names the HTML template cloned for this cabinet.
      templateId: 'slot-template-gem-quest',
// Original L102: Supplies the player-facing cabinet title, description, or stake-range text.
      title: 'Deep Sea Gem Quest',
// Original L103: Supplies the player-facing cabinet title, description, or stake-range text.
      description: 'A 5-reel underwater adventure with free spins and sticky wilds.',
// Original L104: Supplies the player-facing cabinet title, description, or stake-range text.
      stakes: '$0.25–$25.00 · 25¢ steps',
// Original L105: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      themeId: 'deepSea',
// Original L106: Cabinet minimum wager.
      minimumBet: 0.25,
// Original L107: Cabinet wager increment.
      betStep: 0.25,
// Original L108: Cabinet hard wager ceiling.
      maximumBet: 25,
// Original L109: Initial cabinet wager.
      startingBet: 0.25
// Original L110: Closes the current block or module.
    }
// Original L111: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
  ];
// Original L112: Blank line separates related code sections.

// Original L113: Comment documents how this part supports the virtual casino engine.
  // CSS custom properties let one reusable stylesheet skin different machines without duplicating layout rules.
// Original L114: Applies a theme’s CSS variables and background to a machine.
  function applyTheme(root, theme) {
// Original L115: Guards the following action so it runs only when the condition is true.
    if (!root || !theme) return;
// Original L116: Accepts matching three-reel symbols with wild substitution, or identifies the five-reel run symbol.
    const target = root.classList.contains('slot-machine') ? root : (root.querySelector('.slot-machine') || root);
// Original L117: Adds the shared themed-machine CSS class.
    target.classList.add('theme-slot-machine');
// Original L118: Stores the theme ID in the DOM.
    target.dataset.theme = theme.id || '';
// Original L119: Writes each color as a --slot-* CSS variable.
    Object.entries(theme.colors || {}).forEach(([name, value]) => {
// Original L120: Changes the cloned machine’s inline CSS so this theme’s visual value takes effect.
      target.style.setProperty(`--slot-${name}`, value);
// Original L121: Closes the current block or module.
    });
// Original L122: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    const image = theme.backgroundImage
// Original L123: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      ? `url("${String(theme.backgroundImage).replace(/["\\]/g, '\\$&')}")`
// Original L124: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      : 'none';
// Original L125: Changes the cloned machine’s inline CSS so this theme’s visual value takes effect.
    target.style.setProperty('--slot-background-image', image);
// Original L126: Closes the current block or module.
  }
// Original L127: Blank line separates related code sections.

// Original L128: Comment documents how this part supports the virtual casino engine.
  // Clone symbol records before replacement so one cabinet cannot mutate another cabinet's shared paytable data.
// Original L129: Clones a symbol and applies cabinet-specific icon/image/alt overrides.
  function applySymbolTheme(symbol, theme) {
// Original L130: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    const override = theme?.symbols?.[symbol.id];
// Original L131: Guards the following action so it runs only when the condition is true.
    if (typeof override === 'string') return { ...symbol, icon: override };
// Original L132: Guards the following action so it runs only when the condition is true.
    if (override && typeof override === 'object') {
// Original L133: Returns an object with fields copied from `symbol` (symbol); icon: uses `override.icon` (the icon property of override) unless it is null or undefined, then falls back to `symbol.icon` (the icon property of symbol); image: uses `override.image` (the image property of override) unless it is null or undefined, then falls back to `symbol.image` (the image property of symbol); alt: uses uses `override.alt` (the alt property of override) unless it is null or undefined, then falls back to `symbol.alt` (the alt property of symbol) unless it is null or undefined, then falls back to `symbol.id` (the id property of symbol) to the caller and exits this function.
      return {
// Original L134: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        ...symbol,
// Original L135: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        icon: override.icon ?? symbol.icon,
// Original L136: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        image: override.image ?? symbol.image,
// Original L137: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
        alt: override.alt ?? symbol.alt ?? symbol.id
// Original L138: Closes the current block or module.
      };
// Original L139: Closes the current block or module.
    }
// Original L140: Returns an object with fields copied from `symbol` (symbol) to the caller and exits this function.
    return { ...symbol };
// Original L141: Closes the current block or module.
  }
// Original L142: Blank line separates related code sections.

// Original L143: Comment documents how this part supports the virtual casino engine.
  // Add catalog cards before DOMContentLoaded so the central controller can wire all play buttons in one pass.
// Original L144: Builds lobby cards and hidden play views for catalog games.
  function render() {
// Original L145: Comment documents how this part supports the virtual casino engine.
    // The static high-stakes tables and generated catalog tables share this container, keeping every slot choice in one lobby room.
// Original L146: Finds a specific control inside the cloned view so its player-facing text can be filled.
    const cardGrid = document.querySelector('.slot-room-grid');
// Original L147: Creates the DOM element needed for this lobby card or game control.
    const viewHost = document.getElementById('app-container');
// Original L148: Guards the following action so it runs only when the condition is true.
    if (!cardGrid || !viewHost) return;
// Original L149: Blank line separates related code sections.

// Original L150: Processes every configured cabinet.
    games.forEach(game => {
// Original L151: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      const theme = themes[game.themeId];
// Original L152: Creates the DOM element needed for this lobby card or game control.
      const card = document.createElement('article');
// Original L153: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      card.className = 'game-card themed-slot-card';
// Original L154: Creates the DOM element needed for this lobby card or game control.
      const icon = document.createElement('div');
// Original L155: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      icon.className = 'card-icon';
// Original L156: Writes the configured catalog value into the corresponding visible lobby/view label.
      icon.textContent = theme.cardIcon;
// Original L157: Creates the DOM element needed for this lobby card or game control.
      const heading = document.createElement('h3');
// Original L158: Writes the configured catalog value into the corresponding visible lobby/view label.
      heading.textContent = game.title;
// Original L159: Creates the DOM element needed for this lobby card or game control.
      const description = document.createElement('p');
// Original L160: Writes the configured catalog value into the corresponding visible lobby/view label.
      description.textContent = game.description;
// Original L161: Creates the DOM element needed for this lobby card or game control.
      const stakes = document.createElement('p');
// Original L162: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      stakes.className = 'slot-stakes-note';
// Original L163: Writes the configured catalog value into the corresponding visible lobby/view label.
      stakes.textContent = game.stakes;
// Original L164: Creates the DOM element needed for this lobby card or game control.
      const button = document.createElement('button');
// Original L165: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      button.type = 'button';
// Original L166: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      button.className = 'play-btn';
// Original L167: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      button.dataset.game = game.id;
// Original L168: Writes the configured catalog value into the corresponding visible lobby/view label.
      button.textContent = 'PLAY NOW';
// Original L169: Assembles the lobby card contents.
      card.append(icon, heading, description, stakes, button);
// Original L170: Adds the newly built DOM element to its parent so players can see/use it.
      cardGrid.appendChild(card);
// Original L171: Blank line separates related code sections.

// Original L172: Creates the DOM element needed for this lobby card or game control.
      const template = document.getElementById(game.templateId);
// Original L173: Guards the following action so it runs only when the condition is true.
      if (!template?.content?.firstElementChild) throw new Error(`Missing slot template: ${game.templateId}`);
// Original L174: Clones the matching HTML template, failing if it is missing.
      const view = template.content.firstElementChild.cloneNode(true);
// Original L175: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      view.id = `view-${game.id}`;
// Original L176: Marks the cloned game view as controller-managed and hidden initially.
      view.classList.add('view-screen', 'hidden-view');
// Original L177: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      view.dataset.extraSlotView = 'true';
// Original L178: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      view.dataset.gameView = game.id;
// Original L179: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      view.dataset.engine = game.engine;
// Original L180: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      view.dataset.theme = theme.id;
// Original L181: Finds a specific control inside the cloned view so its player-facing text can be filled.
      view.querySelector('[data-slot-title]').textContent = game.title;
// Original L182: Finds a specific control inside the cloned view so its player-facing text can be filled.
      view.querySelector('[data-slot-status]').textContent = 'PRESS SPIN TO PLAY';
// Original L183: Finds a specific control inside the cloned view so its player-facing text can be filled.
      view.querySelector('[data-slot-stakes]').textContent = game.stakes;
// Original L184: Skins the cloned machine.
      applyTheme(view.querySelector('.theme-slot-machine'), theme);
// Original L185: Adds the playable view to the application.
      viewHost.appendChild(view);
// Original L186: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      game.theme = theme;
// Original L187: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
      game.rootId = view.id;
// Original L188: Closes the current block or module.
    });
// Original L189: Closes the current block or module.
  }
// Original L190: Blank line separates related code sections.

// Original L191: Comment documents how this part supports the virtual casino engine.
  // Expose only the small catalog API required by the engines; keep configuration tables private in this closure.
// Original L192: Exposes catalog data and only the helpers engines need.
  window.SlotGameCatalog = {
// Original L193: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    games,
// Original L194: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    themes,
// Original L195: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    applyTheme,
// Original L196: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    applySymbolTheme,
// Original L197: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    getTheme: id => themes[id] || themes.classicGold,
// Original L198: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
    render
// Original L199: Closes the current block or module.
  };
// Original L200: Defines part of the private slot catalog/theme configuration consumed when the lobby is rendered.
  render();
// Original L201: Closes the current block or module.
})();
