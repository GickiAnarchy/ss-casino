(function installSlotGameCatalog() {
  const themes = {
    classicGold: {
      id: 'classic-gold',
      label: 'Classic Gold',
      cardIcon: '🎰',
      colors: {
        'machine-start': '#2a2a35', 'machine-end': '#141419', 'accent': '#ffd700',
        frame: '#15151b', 'reel': '#181820', 'symbol': '#1d1d26', 'symbol-border': '#2a2a38',
        highlight: '#3b3111', 'button-start': '#ffd700', 'button-end': '#b8860b'
      },
      sounds: { reelStop: 'classic', win: 'classic' }
    },
    royalGems: {
      id: 'royal-gems',
      label: 'Royal Gems',
      cardIcon: '💎',
      colors: {
        'machine-start': '#29213d', 'machine-end': '#100d1b', 'accent': '#c9a7ff',
        frame: '#120e1e', 'reel': '#201631', 'symbol': '#271b3a', 'symbol-border': '#493364',
        highlight: '#4c3272', 'button-start': '#bf87ff', 'button-end': '#7042b8'
      },
      symbols: { ruby: '💎', crown: '👑', wild: '🃏', scatter: '⭐' },
      sounds: { reelStop: 'royal', win: 'royal' }
    },
    citrusGarden: {
      id: 'citrus-garden',
      label: 'Citrus Garden',
      cardIcon: '🍋',
      colors: {
        'machine-start': '#28452e', 'machine-end': '#0f1c14', 'accent': '#9be564',
        frame: '#0d1b12', 'reel': '#17271b', 'symbol': '#1d3021', 'symbol-border': '#37533b',
        highlight: '#405b26', 'button-start': '#a8ee5e', 'button-end': '#559936'
      },
      symbols: { cherry: '🍓', lemon: '🍋', orange: '🍊', bell: '🌼', wild: '🦋', seven: '🍀' },
      sounds: { reelStop: 'garden', win: 'garden' }
    },
    neonMidway: {
      id: 'neon-midway',
      label: 'Neon Midway',
      cardIcon: '🌙',
      colors: {
        'machine-start': '#27133f', 'machine-end': '#080d20', 'accent': '#58f4ff',
        frame: '#090e20', 'reel': '#151531', 'symbol': '#1d1c3b', 'symbol-border': '#39366d',
        highlight: '#3d286d', 'button-start': '#63f3ff', 'button-end': '#8456ef'
      },
      symbols: { cherry: '🌙', lemon: '⚡', orange: '🔮', bell: '🎛️', wild: '👾', seven: '7️⃣' },
      sounds: { reelStop: 'neon', win: 'neon' }
    },
    deepSea: {
      id: 'deep-sea',
      label: 'Deep Sea',
      cardIcon: '🐚',
      colors: {
        'machine-start': '#123c56', 'machine-end': '#071522', 'accent': '#57e3dc',
        frame: '#061824', 'reel': '#0c2a3a', 'symbol': '#103448', 'symbol-border': '#1a5260',
        highlight: '#155662', 'button-start': '#62f0d5', 'button-end': '#1687a4'
      },
      symbols: { ten: '🐚', jack: '🐠', queen: '🧜', king: '🐙', ace: '🐬', ruby: '🪸', crown: '🐳', wild: '🦑', scatter: '⭐' },
      sounds: { reelStop: 'ocean', win: 'ocean' }
    }
  };

  const games = [
    {
      id: 'penny-slots',
      engine: 'classic',
      templateId: 'slot-template-classic',
      title: 'Citrus Garden Penny Slots',
      description: 'A bright 3-reel fruit-and-flower table with five paylines.',
      stakes: '$0.05–$5.00 · 5¢ steps',
      themeId: 'citrusGarden',
      minimumBet: 0.05,
      betStep: 0.05,
      maximumBet: 5,
      startingBet: 0.05
    },
    {
      id: 'quarter-slots',
      engine: 'classic',
      templateId: 'slot-template-classic',
      title: 'Neon Midway Quarter Slots',
      description: 'A glowing 3-reel arcade table with five paylines.',
      stakes: '$0.25–$25.00 · 25¢ steps',
      themeId: 'neonMidway',
      minimumBet: 0.25,
      betStep: 0.25,
      maximumBet: 25,
      startingBet: 0.25
    },
    {
      id: 'quarter-gem-quest',
      engine: 'five-reel',
      templateId: 'slot-template-gem-quest',
      title: 'Deep Sea Gem Quest',
      description: 'A 5-reel underwater adventure with free spins and sticky wilds.',
      stakes: '$0.25–$25.00 · 25¢ steps',
      themeId: 'deepSea',
      minimumBet: 0.25,
      betStep: 0.25,
      maximumBet: 25,
      startingBet: 0.25
    }
  ];

  function applyTheme(root, theme) {
    if (!root || !theme) return;
    const target = root.classList.contains('slot-machine') ? root : (root.querySelector('.slot-machine') || root);
    target.classList.add('theme-slot-machine');
    target.dataset.theme = theme.id || '';
    Object.entries(theme.colors || {}).forEach(([name, value]) => {
      target.style.setProperty(`--slot-${name}`, value);
    });
    const image = theme.backgroundImage
      ? `url("${String(theme.backgroundImage).replace(/["\\]/g, '\\$&')}")`
      : 'none';
    target.style.setProperty('--slot-background-image', image);
  }

  function applySymbolTheme(symbol, theme) {
    const override = theme?.symbols?.[symbol.id];
    if (typeof override === 'string') return { ...symbol, icon: override };
    if (override && typeof override === 'object') {
      return {
        ...symbol,
        icon: override.icon ?? symbol.icon,
        image: override.image ?? symbol.image,
        alt: override.alt ?? symbol.alt ?? symbol.id
      };
    }
    return { ...symbol };
  }

  function render() {
    const cardGrid = document.querySelector('.game-grid');
    const viewHost = document.getElementById('app-container');
    if (!cardGrid || !viewHost) return;
    const nonSlotAnchor = cardGrid.querySelector('[data-game="coin-toss"]')?.closest('.game-card');

    games.forEach(game => {
      const theme = themes[game.themeId];
      const card = document.createElement('article');
      card.className = 'game-card themed-slot-card';
      const icon = document.createElement('div');
      icon.className = 'card-icon';
      icon.textContent = theme.cardIcon;
      const heading = document.createElement('h3');
      heading.textContent = game.title;
      const description = document.createElement('p');
      description.textContent = game.description;
      const stakes = document.createElement('p');
      stakes.className = 'slot-stakes-note';
      stakes.textContent = game.stakes;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'play-btn';
      button.dataset.game = game.id;
      button.textContent = 'PLAY NOW';
      card.append(icon, heading, description, stakes, button);
      cardGrid.insertBefore(card, nonSlotAnchor || null);

      const template = document.getElementById(game.templateId);
      if (!template?.content?.firstElementChild) throw new Error(`Missing slot template: ${game.templateId}`);
      const view = template.content.firstElementChild.cloneNode(true);
      view.id = `view-${game.id}`;
      view.classList.add('view-screen', 'hidden-view');
      view.dataset.extraSlotView = 'true';
      view.dataset.gameView = game.id;
      view.dataset.engine = game.engine;
      view.dataset.theme = theme.id;
      view.querySelector('[data-slot-title]').textContent = game.title;
      view.querySelector('[data-slot-status]').textContent = 'PRESS SPIN TO PLAY';
      view.querySelector('[data-slot-stakes]').textContent = game.stakes;
      applyTheme(view.querySelector('.theme-slot-machine'), theme);
      viewHost.appendChild(view);
      game.theme = theme;
      game.rootId = view.id;
    });
  }

  window.SlotGameCatalog = {
    games,
    themes,
    applyTheme,
    applySymbolTheme,
    getTheme: id => themes[id] || themes.classicGold,
    render
  };
  render();
})();
