// Original L1: Comment documents how this part supports the virtual casino engine.
// Original L2: Comment documents how this part supports the virtual casino engine.
// Original L3: Comment documents how this part supports the virtual casino engine.
// Original L4: Comment documents how this part supports the virtual casino engine.
/*
 * Deterministic, browser-only racing: seeded schedules make previews, results, and unsettled tickets reproducible
 * after refresh; the encrypted active profile stores runner experience and pending outcomes.
 */
// Original L5: Comment documents how this part supports the virtual casino engine.
/* Local-only horse and car racing circuits for the virtual-chip casino. */
// Original L6: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
(function installRaceEngine() {
// Original L7: Comment documents how this part supports the virtual casino engine.
  // Race slots use the browser's local time: 7 AM through 9 PM, alternating circuits hourly.
// Original L8: Comment documents how this part supports the virtual casino engine.
  // Keep the former two-hour seed bucket so saved tickets reproduce their original races.
// Original L9: Legacy two-hour seed bucket keeps saved race tickets reproducible.
  const RACE_SEED_INTERVAL_MS = 2 * 60 * 60 * 1000;
// Original L10: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
  const RACE_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
// Original L11: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
  const RACES_PER_DAY = RACE_HOURS.length;
// Original L12: Opens preview and controls 45 minutes before start.
  const RACE_PREVIEW_OPEN_MS = 45 * 60 * 1000;
// Original L13: Closes betting five minutes before start.
  const BETTING_CUTOFF_MS = 5 * 60 * 1000;
// Original L14: Shortest simulated race is 110 seconds.
  const MIN_RACE_DURATION_SECONDS = 110;
// Original L15: Longest simulated race is 200 seconds.
  const MAX_RACE_DURATION_SECONDS = 200;
// Original L16: Shows a finished result for 120 seconds.
  const RESULT_DISPLAY_MS = 120_000;
// Original L17: Race wagers change in five-chip steps.
  const BET_STEP = 5;
// Original L18: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  const CENTS = 100;
// Original L19: Horse fields contain six entrants.
  const HORSE_FIELD_SIZE = 6;
// Original L20: Car fields contain eight entrants.
  const CAR_FIELD_SIZE = 8;
// Original L21: Prior starts can raise ability by at most 22%.
  const MAX_EXPERIENCE_BOOST = 0.22;
// Original L22: Blank line separates related code sections.

// Original L23: Comment documents how this part supports the virtual casino engine.
  // Each stable keeps an identity across races so its experience and record persist.
// Original L24: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  const MASTER_HORSES = [
// Original L25: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-copper-comet', name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
// Original L26: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-velvet-thunder', name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
// Original L27: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-lucky-lantern', name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
// Original L28: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-midnight-marigold', name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
// Original L29: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
// Original L30: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-golden-gallop', name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
// Original L31: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-thunder-spirit', name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
// Original L32: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-midnight-dash', name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
// Original L33: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-silver-blaze', name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
// Original L34: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-galloping-ghost', name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
// Original L35: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-copper-penny', name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
// Original L36: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-shadow-runner', name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
// Original L37: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-out-of-this-world', name: 'Out of This World', silks: '👽', lane: '#2e50d5' },
// Original L38: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-bombs-away', name: 'Bombs Away', silks: '💣', lane: '#44a3d3' },
// Original L39: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-velvet-rocket', name: 'Velvet Rocket', silks: '🚀', lane: '#8e44ad' },
// Original L40: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-wildflower', name: 'Wildflower', silks: '🌼', lane: '#f39c12' },
// Original L41: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-iron-hoof', name: 'Iron Hoof', silks: '🧲', lane: '#7f8c8d' },
// Original L42: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-storm-chaser', name: 'Storm Chaser', silks: '🌩️', lane: '#2980b9' },
// Original L43: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-peppermint', name: 'Peppermint', silks: '🍬', lane: '#16a085' },
// Original L44: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-starling', name: 'Starling', silks: '⭐', lane: '#c0392b' },
// Original L45: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-quiet-thunder', name: 'Quiet Thunder', silks: '🐎', lane: '#6c5ce7' },
// Original L46: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-ember-trail', name: 'Ember Trail', silks: '🔥', lane: '#d35400' },
// Original L47: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-sunrise-sprint', name: 'Sunrise Sprint', silks: '🌅', lane: '#e84393' },
// Original L48: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'horse-blue-comet', name: 'Blue Comet', silks: '☄️', lane: '#0984e3' }
// Original L49: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  ];
// Original L50: Blank line separates related code sections.

// Original L51: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  const MASTER_CARS = [
// Original L52: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-neon-viper', name: 'Neon Viper', silks: '🏎️', lane: '#e74c3c' },
// Original L53: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-midnight-rally', name: 'Midnight Rally', silks: '🚗', lane: '#34495e' },
// Original L54: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-golden-apex', name: 'Golden Apex', silks: '🏁', lane: '#f1c40f' },
// Original L55: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-turbo-tiger', name: 'Turbo Tiger', silks: '🐯', lane: '#e67e22' },
// Original L56: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-electric-comet', name: 'Electric Comet', silks: '⚡', lane: '#3498db' },
// Original L57: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-velvet-gt', name: 'Velvet GT', silks: '🟣', lane: '#9b59b6' },
// Original L58: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-green-machine', name: 'Green Machine', silks: '🟢', lane: '#2ecc71' },
// Original L59: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
// Original L60: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-rocket-88', name: 'Rocket 88', silks: '🚀', lane: '#8e44ad' },
// Original L61: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-drift-king', name: 'Drift King', silks: '🛞', lane: '#16a085' },
// Original L62: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-blue-lightning', name: 'Blue Lightning', silks: '🌩️', lane: '#2980b9' },
// Original L63: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-ruby-racer', name: 'Ruby Racer', silks: '🏎️', lane: '#c0392b' },
// Original L64: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-desert-fox', name: 'Desert Fox', silks: '🦊', lane: '#d35400' },
// Original L65: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-lime-machine', name: 'Lime Machine', silks: '🍋', lane: '#27ae60' },
// Original L66: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-night-owl', name: 'Night Owl', silks: '🦉', lane: '#6c5ce7' },
// Original L67: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-pink-nitro', name: 'Pink Nitro', silks: '💨', lane: '#e84393' },
// Original L68: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-ironclad', name: 'Ironclad', silks: '🛡️', lane: '#7f8c8d' },
// Original L69: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-sunrise-coupe', name: 'Sunrise Coupe', silks: '🌅', lane: '#f39c12' },
// Original L70: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-copperhead', name: 'Copperhead', silks: '🐍', lane: '#d35400' },
// Original L71: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-starlight', name: 'Starlight', silks: '✨', lane: '#95a5a6' },
// Original L72: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-rapid-rabbit', name: 'Rapid Rabbit', silks: '🐇', lane: '#1abc9c' },
// Original L73: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-blackout', name: 'Blackout', silks: '🌑', lane: '#2c3e50' },
// Original L74: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-apricot-flash', name: 'Apricot Flash', silks: '🍑', lane: '#e17055' },
// Original L75: Catalog record supplies stable identity and display metadata used by the UI.
    { id: 'car-polar-star', name: 'Polar Star', silks: '❄️', lane: '#00cec9' }
// Original L76: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  ];
// Original L77: Blank line separates related code sections.

// Original L78: Comment documents how this part supports the virtual casino engine.
  // Kept only so old horse tickets/result notices still make sense after this update.
// Original L79: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  const LEGACY_HORSES = [
// Original L80: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
// Original L81: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
// Original L82: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
// Original L83: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
// Original L84: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
// Original L85: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
// Original L86: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
// Original L87: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
// Original L88: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
// Original L89: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
// Original L90: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
// Original L91: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
// Original L92: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Out of this World', silks: '👽', lane: '#2e50d5' },
// Original L93: Catalog record supplies stable identity and display metadata used by the UI.
    { name: 'Bombs Away', silks: '💣', lane: '#44a3d3' }
// Original L94: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  ];
// Original L95: Blank line separates related code sections.

// Original L96: Comment documents how this part supports the virtual casino engine.
  /** Controls local race timing, generated fields, animation, betting, tickets, and between-session settlement. */
// Original L97: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  class RaceEngine {
// Original L98: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    constructor(hub, { fx, jackpot, xp } = {}) {
// Original L99: Sets `this.hub` (the hub property of this) to `hub` (hub).
      this.hub = hub;
// Original L100: Sets `this.fx` (the fx property of this) to `fx` (fx).
      this.fx = fx;
// Original L101: Sets `this.jackpot` (the jackpot property of this) to `jackpot` (jackpot).
      this.jackpot = jackpot;
// Original L102: Sets `this.xp` (the xp property of this) to `xp` (xp).
      this.xp = xp;
// Original L103: Sets `this.bet` (the bet property of this) to 10.
      this.bet = 10;
// Original L104: Sets `this.raceType` (the race type property of this) to "horse".
      this.raceType = 'horse';
// Original L105: Sets `this.selectedHorseId` (the selected horse id property of this) to null.
      this.selectedHorseId = null;
// Original L106: Sets `this.targetRaceId` (the target race id property of this) to null.
      this.targetRaceId = null;
// Original L107: Sets `this.trackRaceId` (the track race id property of this) to null.
      this.trackRaceId = null;
// Original L108: Sets `this.trackRaceType` (the track race type property of this) to null.
      this.trackRaceType = null;
// Original L109: Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.
      this.ticket = null;
// Original L110: Sets `this.raceResultNotice` (the race result notice property of this) to null.
      this.raceResultNotice = null;
// Original L111: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = '';
// Original L112: Sets `this.isRaceInProgress` (the is race in progress property of this) to false.
      this.isRaceInProgress = false;
// Original L113: Sets `this.isResultDisplay` (the is result display property of this) to false.
      this.isResultDisplay = false;
// Original L114: Sets `this.isRacePreviewOpen` (the is race preview open property of this) to false.
      this.isRacePreviewOpen = false;
// Original L115: Sets `this.isBettingOpen` (the is betting open property of this) to false.
      this.isBettingOpen = false;
// Original L116: Sets `this.experience` (the experience property of this) to calls `this.loadExperience` with no arguments.
      this.experience = this.loadExperience();
// Original L117: Blank line separates related code sections.

// Original L118: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.bindElements();
// Original L119: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.bindEvents();
// Original L120: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.loadProfileTicket();
// Original L121: Guards the following action so it runs only when the condition is true.
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
// Original L122: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.initializeExperience(Date.now());
// Original L123: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
// Original L124: Recomputes phase, preview, track, controls, and due-ticket settlement.
      this.update();
// Original L125: Blank line separates related code sections.

// Original L126: Comment documents how this part supports the virtual casino engine.
      // The race clock and experience records are local to this browser; no live feed or paid service is used.
// Original L127: Recomputes phase, preview, track, controls, and due-ticket settlement.
      window.setInterval(() => this.update(), 250);
// Original L128: Closes the current block or module.
    }
// Original L129: Blank line separates related code sections.

// Original L130: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    bindElements() {
// Original L131: Looks up the named race display/control element so later updates can change it.
      this.statusEl = document.getElementById('race-status');
// Original L132: Looks up the named race display/control element so later updates can change it.
      this.raceTitleEl = document.getElementById('race-title');
// Original L133: Looks up the named race display/control element so later updates can change it.
      this.raceNumberEl = document.getElementById('race-number');
// Original L134: Looks up the named race display/control element so later updates can change it.
      this.phaseEl = document.getElementById('race-phase-label');
// Original L135: Looks up the named race display/control element so later updates can change it.
      this.countdownEl = document.getElementById('race-countdown');
// Original L136: Looks up the named race display/control element so later updates can change it.
      this.startTimeEl = document.getElementById('race-start-time');
// Original L137: Looks up the named race display/control element so later updates can change it.
      this.raceDurationEl = document.getElementById('race-duration');
// Original L138: Looks up the named race display/control element so later updates can change it.
      this.trackCaptionEl = document.getElementById('race-track-caption');
// Original L139: Looks up the named race display/control element so later updates can change it.
      this.trackEl = document.getElementById('race-track');
// Original L140: Looks up the named race display/control element so later updates can change it.
      this.targetTextEl = document.getElementById('race-target-text');
// Original L141: Looks up the named race display/control element so later updates can change it.
      this.runnerListEl = document.getElementById('race-runner-list');
// Original L142: Looks up the named race display/control element so later updates can change it.
      this.betDisplayEl = document.getElementById('race-bet-display');
// Original L143: Looks up the named race display/control element so later updates can change it.
      this.estimatedReturnEl = document.getElementById('race-estimated-return');
// Original L144: Looks up the named race display/control element so later updates can change it.
      this.ticketNoteEl = document.getElementById('race-ticket-note');
// Original L145: Looks up the named race display/control element so later updates can change it.
      this.minusBtn = document.getElementById('btn-race-minus');
// Original L146: Looks up the named race display/control element so later updates can change it.
      this.plusBtn = document.getElementById('btn-race-plus');
// Original L147: Looks up the named race display/control element so later updates can change it.
      this.maxBtn = document.getElementById('btn-race-max');
// Original L148: Looks up the named race display/control element so later updates can change it.
      this.clearBtn = document.getElementById('btn-race-clear');
// Original L149: Looks up the named race display/control element so later updates can change it.
      this.placeBtn = document.getElementById('btn-race-bet');
// Original L150: Looks up the named race display/control element so later updates can change it.
      this.resultNoticeEl = document.getElementById('race-result-notice');
// Original L151: Looks up the named race display/control element so later updates can change it.
      this.resultNoticeTextEl = document.getElementById('race-result-notice-text');
// Original L152: Looks up the named race display/control element so later updates can change it.
      this.viewResultsBtn = document.getElementById('btn-view-race-results');
// Original L153: Looks up the named race display/control element so later updates can change it.
      this.dismissResultBtn = document.getElementById('btn-dismiss-race-result');
// Original L154: Finds the relevant race control or runner nodes in the DOM.
      this.modeButtons = [...document.querySelectorAll('[data-race-type]')];
// Original L155: Closes the current block or module.
    }
// Original L156: Blank line separates related code sections.

// Original L157: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    bindEvents() {
// Original L158: Connects a user action to the matching betting, selection, or result handler.
      this.minusBtn?.addEventListener('click', () => {
// Original L159: Guards the following action so it runs only when the condition is true.
        if (!this.canBetNow()) return;
// Original L160: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playClick();
// Original L161: Race wagers change in five-chip steps.
        this.bet = Math.max(BET_STEP, this.roundMoney(this.bet - BET_STEP));
// Original L162: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateBetControls();
// Original L163: Closes the current block or module.
      });
// Original L164: Connects a user action to the matching betting, selection, or result handler.
      this.plusBtn?.addEventListener('click', () => {
// Original L165: Guards the following action so it runs only when the condition is true.
        if (!this.canBetNow()) return;
// Original L166: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playClick();
// Original L167: Race wagers change in five-chip steps.
        this.bet = Math.min(this.maxStake(), this.roundMoney(this.bet + BET_STEP));
// Original L168: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateBetControls();
// Original L169: Closes the current block or module.
      });
// Original L170: Connects a user action to the matching betting, selection, or result handler.
      this.maxBtn?.addEventListener('click', () => {
// Original L171: Guards the following action so it runs only when the condition is true.
        if (!this.canBetNow()) return;
// Original L172: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playClick();
// Original L173: Caps a wager at both wallet balance and player maxBet.
        const maximum = this.maxStake();
// Original L174: Sets `this.bet` (the bet property of this) to `maximum` (maximum).
        this.bet = maximum;
// Original L175: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateBetControls();
// Original L176: Closes the current block or module.
      });
// Original L177: Connects a user action to the matching betting, selection, or result handler.
      this.clearBtn?.addEventListener('click', () => {
// Original L178: Guards the following action so it runs only when the condition is true.
        if (!this.canBetNow()) return;
// Original L179: Sets `this.bet` (the bet property of this) to 0.
        this.bet = 0;
// Original L180: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateBetControls();
// Original L181: Closes the current block or module.
      });
// Original L182: Validates and records one ticket, deducting its stake once.
      this.placeBtn?.addEventListener('click', () => this.placeBet());
// Original L183: Connects a user action to the matching betting, selection, or result handler.
      this.viewResultsBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(true));
// Original L184: Connects a user action to the matching betting, selection, or result handler.
      this.dismissResultBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(false));
// Original L185: Connects a user action to the matching betting, selection, or result handler.
      this.runnerListEl?.addEventListener('click', event => {
// Original L186: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const option = event.target.closest('[data-runner-id]');
// Original L187: Guards the following action so it runs only when the condition is true.
        if (!option || option.disabled || !this.canBetNow()) return;
// Original L188: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playClick();
// Original L189: Sets `this.selectedHorseId` (the selected horse id property of this) to `option.dataset.runnerId` (the runner id property of option.dataset).
        this.selectedHorseId = option.dataset.runnerId;
// Original L190: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateRunnerSelection();
// Original L191: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.updateBetControls();
// Original L192: Closes the current block or module.
      });
// Original L193: Closes the current block or module.
    }
// Original L194: Blank line separates related code sections.

// Original L195: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    loadProfileTicket() {
// Original L196: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const save = window.LocalProfiles?.getCurrentSave();
// Original L197: Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.
      this.ticket = save?.raceBet || null;
// Original L198: Sets `this.raceResultNotice` (the race result notice property of this) to uses `save?.raceResultNotice` (the race result notice property of save); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to null.
      this.raceResultNotice = save?.raceResultNotice || null;
// Original L199: Closes the current block or module.
    }
// Original L200: Blank line separates related code sections.

// Original L201: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    loadExperience() {
// Original L202: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const save = window.LocalProfiles?.getCurrentSave();
// Original L203: Returns checks uses checks that gets the JavaScript type name of `save.raceExperience` (the race experience property of save) and "object" have the same value and type only if `save?.raceExperience` (the race experience property of save); optional chaining stops with undefined if a guarded receiver is null or undefined is truthy; otherwise keeps the falsy first value; if true chooses `save.raceExperience` (the race experience property of save), otherwise an object with fields horse: null; car: null to the caller and exits this function.
      return save?.raceExperience && typeof save.raceExperience === 'object'
// Original L204: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ? save.raceExperience
// Original L205: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        : { horse: null, car: null };
// Original L206: Closes the current block or module.
    }
// Original L207: Blank line separates related code sections.

// Original L208: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    initializeExperience(now) {
// Original L209: Longest simulated race is 200 seconds.
      const firstCursor = this.getScheduledRaceAtOrBefore(now - MAX_RACE_DURATION_SECONDS * 1000) || 0;
// Original L210: Repeats the operation for the relevant entries.
      for (const type of ['horse', 'car']) {
// Original L211: Guards the following action so it runs only when the condition is true.
        if (!this.experience[type] || typeof this.experience[type] !== 'object') {
// Original L212: Sets the entry at index/key `type` (type) in `this.experience` (the experience property of this) to an object with fields lastProcessedRaceId: `firstCursor` (first cursor); runners: an object with fields .
          this.experience[type] = { lastProcessedRaceId: firstCursor, runners: {} };
// Original L213: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        } else {
// Original L214: Updates `this.experience[type].runners` (the runners property of this.experience[type]) using an object with fields .
          this.experience[type].runners ||= {};
// Original L215: Guards the following action so it runs only when the condition is true.
          if (!Number.isSafeInteger(this.experience[type].lastProcessedRaceId)) {
// Original L216: Sets `this.experience[type].lastProcessedRaceId` (the last processed race id property of this.experience[type]) to `firstCursor` (first cursor).
            this.experience[type].lastProcessedRaceId = firstCursor;
// Original L217: Closes the current block or module.
          }
// Original L218: Closes the current block or module.
        }
// Original L219: Closes the current block or module.
      }
// Original L220: Closes the current block or module.
    }
// Original L221: Blank line separates related code sections.

// Original L222: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    resetForActiveProfile() {
// Original L223: Sets `this.bet` (the bet property of this) to 10.
      this.bet = 10;
// Original L224: Sets `this.selectedHorseId` (the selected horse id property of this) to null.
      this.selectedHorseId = null;
// Original L225: Sets `this.targetRaceId` (the target race id property of this) to null.
      this.targetRaceId = null;
// Original L226: Sets `this.trackRaceId` (the track race id property of this) to null.
      this.trackRaceId = null;
// Original L227: Sets `this.trackRaceType` (the track race type property of this) to null.
      this.trackRaceType = null;
// Original L228: Sets `this.experience` (the experience property of this) to calls `this.loadExperience` with no arguments.
      this.experience = this.loadExperience();
// Original L229: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.loadProfileTicket();
// Original L230: Guards the following action so it runs only when the condition is true.
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
// Original L231: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.initializeExperience(Date.now());
// Original L232: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
// Original L233: Recomputes phase, preview, track, controls, and due-ticket settlement.
      this.update();
// Original L234: Closes the current block or module.
    }
// Original L235: Blank line separates related code sections.

// Original L236: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    hasPendingTicket() {
// Original L237: Returns converts `this.ticket` (the ticket property of this) to true or false according to truthiness to the caller and exits this function.
      return Boolean(this.ticket);
// Original L238: Closes the current block or module.
    }
// Original L239: Blank line separates related code sections.

// Original L240: Rounds chip money to cents before display or settlement.
    roundMoney(value) {
// Original L241: Returns divides rounds multiplies converts `value` (value) to a number (invalid numeric text becomes NaN) by `CENTS` (cents) to the nearest whole number by `CENTS` (cents) to the caller and exits this function.
      return Math.round(Number(value) * CENTS) / CENTS;
// Original L242: Closes the current block or module.
    }
// Original L243: Blank line separates related code sections.

// Original L244: Caps a wager at both wallet balance and player maxBet.
    maxStake() {
// Original L245: Returns chooses the largest of 0, calls `this.roundMoney` with chooses the smallest of `this.hub.balance` (the balance property of this.hub), `this.hub.player.maxBet` (the max bet property of this.hub.player) to the caller and exits this function.
      return Math.max(0, this.roundMoney(Math.min(this.hub.balance, this.hub.player.maxBet)));
// Original L246: Closes the current block or module.
    }
// Original L247: Blank line separates related code sections.

// Original L248: Stores this race engine state for later timing, rendering, or settlement decisions.
    getMaster(type = this.raceType) {
// Original L249: Returns checks checks that `type` (type) and "car" have the same value and type; if true chooses `MASTER_CARS` (master cars), otherwise `MASTER_HORSES` (master horses) to the caller and exits this function.
      return type === 'car' ? MASTER_CARS : MASTER_HORSES;
// Original L250: Closes the current block or module.
    }
// Original L251: Blank line separates related code sections.

// Original L252: Reads safe integer starts and wins for a persistent runner.
    getRunnerStats(type, runnerId) {
// Original L253: Uses the entry at index/key `runnerId` (runner id) in `this.experience?.[type]?.runners` (the runners property of this.experience?.[type]); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to an object with fields ; stores the result in `stats`. const prevents reassignment of this binding, not mutation inside its object/array.
      const stats = this.experience?.[type]?.runners?.[runnerId] || {};
// Original L254: Returns an object with fields starts: checks uses checks whether `stats.starts` (the starts property of stats) is greater than 0 only if calls `Number.isSafeInteger` with `stats.starts` (the starts property of stats) is truthy; otherwise keeps the falsy first value; if true chooses `stats.starts` (the starts property of stats), otherwise 0; wins: checks uses checks whether `stats.wins` (the wins property of stats) is greater than 0 only if calls `Number.isSafeInteger` with `stats.wins` (the wins property of stats) is truthy; otherwise keeps the falsy first value; if true chooses `stats.wins` (the wins property of stats), otherwise 0 to the caller and exits this function.
      return {
// Original L255: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        starts: Number.isSafeInteger(stats.starts) && stats.starts > 0 ? stats.starts : 0,
// Original L256: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        wins: Number.isSafeInteger(stats.wins) && stats.wins > 0 ? stats.wins : 0
// Original L257: Closes the current block or module.
      };
// Original L258: Closes the current block or module.
    }
// Original L259: Blank line separates related code sections.

// Original L260: Comment documents how this part supports the virtual casino engine.
    // Race slots are created in local time, so the quiet overnight window follows the user's device clock.
// Original L261: Comment documents how this part supports the virtual casino engine.
    // Use the device calendar and timezone so daytime race times match the player clock.
// Original L262: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    getScheduledRaceAtOrBefore(timestamp) {
// Original L263: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const instant = new Date(timestamp);
// Original L264: Repeats the operation for the relevant entries.
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
// Original L265: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const date = new Date(instant);
// Original L266: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        date.setHours(0, 0, 0, 0);
// Original L267: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        date.setDate(date.getDate() - dayOffset);
// Original L268: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
        for (let index = RACE_HOURS.length - 1; index >= 0; index -= 1) {
// Original L269: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          const slot = new Date(date);
// Original L270: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
          slot.setHours(RACE_HOURS[index], 0, 0, 0);
// Original L271: Guards the following action so it runs only when the condition is true.
          if (slot.getTime() <= timestamp) return slot.getTime();
// Original L272: Closes the current block or module.
        }
// Original L273: Closes the current block or module.
      }
// Original L274: Returns null to the caller and exits this function.
      return null;
// Original L275: Closes the current block or module.
    }
// Original L276: Blank line separates related code sections.

// Original L277: Comment documents how this part supports the virtual casino engine.
    // Scan local calendar hours instead of adding fixed 24-hour blocks, which can fail across daylight-saving changes.
// Original L278: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    getNextRaceStart(timestamp) {
// Original L279: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const instant = new Date(timestamp);
// Original L280: Repeats the operation for the relevant entries.
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
// Original L281: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const date = new Date(instant);
// Original L282: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        date.setHours(0, 0, 0, 0);
// Original L283: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        date.setDate(date.getDate() + dayOffset);
// Original L284: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
        for (const hour of RACE_HOURS) {
// Original L285: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          const slot = new Date(date);
// Original L286: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          slot.setHours(hour, 0, 0, 0);
// Original L287: Guards the following action so it runs only when the condition is true.
          if (slot.getTime() > timestamp) return slot.getTime();
// Original L288: Closes the current block or module.
        }
// Original L289: Closes the current block or module.
      }
// Original L290: Returns null to the caller and exits this function.
      return null;
// Original L291: Closes the current block or module.
    }
// Original L292: Blank line separates related code sections.

// Original L293: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    getScheduledRaceType(eventId) {
// Original L294: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
      const slotIndex = RACE_HOURS.indexOf(new Date(eventId).getHours());
// Original L295: Returns checks uses checks that takes the remainder of `slotIndex` (slot index) divided by 2 and 1 have the same value and type only if checks whether `slotIndex` (slot index) is at least 0 is truthy; otherwise keeps the falsy first value; if true chooses "car", otherwise "horse" to the caller and exits this function.
      return slotIndex >= 0 && slotIndex % 2 === 1 ? 'car' : 'horse';
// Original L296: Closes the current block or module.
    }
// Original L297: Blank line separates related code sections.

// Original L298: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    getRaceNumber(eventId) {
// Original L299: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const date = new Date(eventId);
// Original L300: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
// Original L301: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const yearStartUtc = Date.UTC(date.getFullYear(), 0, 1);
// Original L302: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
      const dayOfYear = Math.floor((dateUtc - yearStartUtc) / 86_400_000);
// Original L303: Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.
      const slotIndex = Math.max(0, RACE_HOURS.indexOf(date.getHours()));
// Original L304: Number of daily race slots used in race numbering.
      return dayOfYear * RACES_PER_DAY + slotIndex + 1;
// Original L305: Closes the current block or module.
    }
// Original L306: Blank line separates related code sections.

// Original L307: True only during the 45-minute-to-5-minute-before-start window.
    isBettingOpenFor(raceId, now) {
// Original L308: Opens preview and controls 45 minutes before start.
      return now >= raceId - RACE_PREVIEW_OPEN_MS && now < raceId - BETTING_CUTOFF_MS;
// Original L309: Closes the current block or module.
    }
// Original L310: Blank line separates related code sections.

// Original L311: True from 45 minutes before start onward.
    isRacePreviewOpenFor(raceId, now) {
// Original L312: Opens preview and controls 45 minutes before start.
      return now >= raceId - RACE_PREVIEW_OPEN_MS;
// Original L313: Closes the current block or module.
    }
// Original L314: Blank line separates related code sections.

// Original L315: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    getNextBettingOpen(timestamp) {
// Original L316: Calls `this.getNextRaceStart` with `timestamp` (timestamp); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.
      const nextRaceId = this.getNextRaceStart(timestamp);
// Original L317: Opens preview and controls 45 minutes before start.
      return nextRaceId ? nextRaceId - RACE_PREVIEW_OPEN_MS : null;
// Original L318: Closes the current block or module.
    }
// Original L319: Blank line separates related code sections.

// Original L320: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    canBetNow(now = Date.now()) {
// Original L321: Guards the following action so it runs only when the condition is true.
      if (this.ticket) return false;
// Original L322: Calls `this.getNextRaceStart` with `now` (now); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.
      const nextRaceId = this.getNextRaceStart(now);
// Original L323: True only during the 45-minute-to-5-minute-before-start window.
      return Boolean(nextRaceId && this.isBettingOpenFor(nextRaceId, now));
// Original L324: Closes the current block or module.
    }
// Original L325: Blank line separates related code sections.

// Original L326: Comment documents how this part supports the virtual casino engine.
    // Seed each event and race type so refreshes and profile reloads reproduce the same field and outcome.
// Original L327: Comment documents how this part supports the virtual casino engine.
    // This small seeded PRNG provides repeatability, not cryptographic security; outcomes are virtual local simulations.
// Original L328: Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.
    makeRandom(eventId, type = this.raceType, stream = 0) {
// Original L329: Separates horse and car random streams.
      const typeSeed = type === 'car' ? 0x5bd1e995 : 0x27d4eb2f;
// Original L330: Legacy two-hour seed bucket keeps saved race tickets reproducible.
      let state = (Math.floor(eventId / RACE_SEED_INTERVAL_MS) * 2_654_435_761 + 1_013_904_223 + typeSeed + stream) >>> 0;
// Original L331: Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.
      return () => {
// Original L332: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        state = (state + 0x6D2B79F5) >>> 0;
// Original L333: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        let value = state;
// Original L334: Performs repeatable 32-bit multiplication for PRNG mixing.
        value = Math.imul(value ^ (value >>> 15), value | 1);
// Original L335: Performs repeatable 32-bit multiplication for PRNG mixing.
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
// Original L336: Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
// Original L337: Closes the current block or module.
      };
// Original L338: Closes the current block or module.
    }
// Original L339: Blank line separates related code sections.

// Original L340: Comment documents how this part supports the virtual casino engine.
    // Stable inputs derive entrants, odds, duration, and winner so a refresh cannot reroll an offered event.
// Original L341: Builds duration, entrants, odds, weighted winner, and animation order.
    createRace(eventId, type = this.getScheduledRaceType(eventId)) {
// Original L342: Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.
      const random = this.makeRandom(eventId, type);
// Original L343: Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.
      const durationRandom = this.makeRandom(eventId, type, 0x9e3779b9);
// Original L344: Shortest simulated race is 110 seconds.
      const durationSeconds = MIN_RACE_DURATION_SECONDS + Math.floor(
// Original L345: Shortest simulated race is 110 seconds.
        durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1)
// Original L346: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      );
// Original L347: An array containing the expanded entries/properties from calls `this.getMaster` with `type` (type); stores the result in `master`. const prevents reassignment of this binding, not mutation inside its object/array.
      const master = [...this.getMaster(type)];
// Original L348: Fisher-Yates shuffles the roster with the seeded stream.
      for (let i = master.length - 1; i > 0; i -= 1) {
// Original L349: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
        const j = Math.floor(random() * (i + 1));
// Original L350: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        [master[i], master[j]] = [master[j], master[i]];
// Original L351: Closes the current block or module.
      }
// Original L352: Blank line separates related code sections.

// Original L353: Horse fields contain six entrants.
      const fieldSize = type === 'car' ? CAR_FIELD_SIZE : HORSE_FIELD_SIZE;
// Original L354: Selects six horses or eight cars.
      const entrants = master.slice(0, fieldSize).map((runner, index) => {
// Original L355: Reads safe integer starts and wins for a persistent runner.
        const stats = this.getRunnerStats(type, runner.id);
// Original L356: Prior starts can raise ability by at most 22%.
        const experienceBoost = Math.min(MAX_EXPERIENCE_BOOST, stats.starts * 0.0033);
// Original L357: Smoothed win form uses wins+1 over starts+2 so new runners do not have extreme estimates.
        const form = (stats.wins + 1) / (stats.starts + 2);
// Original L358: Maps form to a modest 0.9–1.1 ability multiplier.
        const formMultiplier = 0.9 + form * 0.2;
// Original L359: Seeded base ability ranges from 0.88 to 1.12.
        const baseAbility = 0.88 + random() * 0.24;
// Original L360: Returns an object with fields copied from `runner` (runner); ability: multiplies multiplies `baseAbility` (base ability) by adds 1 and `experienceBoost` (experience boost) (or joins them if a value is text) by `formMultiplier` (form multiplier); finishFactor: adds 0.74 and multiplies calls `random` with no arguments by 0.2 (or joins them if a value is text); starts: `stats.starts` (the starts property of stats); wins: `stats.wins` (the wins property of stats); index: `index` (index) to the caller and exits this function.
        return {
// Original L361: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ...runner,
// Original L362: Adds 0.33% ability per start, capped at 22%.
          ability: baseAbility * (1 + experienceBoost) * formMultiplier,
// Original L363: Seeded animation speed ranges from 0.74 to 0.94.
          finishFactor: 0.74 + random() * 0.2,
// Original L364: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          starts: stats.starts,
// Original L365: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          wins: stats.wins,
// Original L366: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          index
// Original L367: Closes the current block or module.
        };
// Original L368: Closes the current block or module.
      });
// Original L369: Blank line separates related code sections.

// Original L370: Comment documents how this part supports the virtual casino engine.
      // Both prior starts and the win record influence current ability, odds, and simulated win chance.
// Original L371: Raises ability to the eighth power, strongly weighting better runners.
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
// Original L372: Sum of weights is the probability denominator.
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
// Original L373: Applies the enclosed update to every matching runner, DOM node, or saved record.
      entrants.forEach((runner, index) => {
// Original L374: Sum of weights is the probability denominator.
        runner.winProbability = weights[index] / totalWeight;
// Original L375: Normalizes each weight into a win probability.
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
// Original L376: Closes the current block or module.
      });
// Original L377: Blank line separates related code sections.

// Original L378: Sum of weights is the probability denominator.
      let draw = random() * totalWeight;
// Original L379: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      let winnerIndex = weights.findIndex(weight => {
// Original L380: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        draw -= weight;
// Original L381: Returns checks whether `draw` (draw) is less than 0 to the caller and exits this function.
        return draw < 0;
// Original L382: Closes the current block or module.
      });
// Original L383: Guards the following action so it runs only when the condition is true.
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;
// Original L384: Blank line separates related code sections.

// Original L385: Comment documents how this part supports the virtual casino engine.
      // The on-screen sprint finishes in the same order as its seeded result.
// Original L386: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const winner = entrants[winnerIndex];
// Original L387: Seeded animation speed ranges from 0.74 to 0.94.
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
// Original L388: Seeded animation speed ranges from 0.74 to 0.94.
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);
// Original L389: Blank line separates related code sections.

// Original L390: Returns an object with fields eventId: `eventId` (event id); number: calls `this.getRaceNumber` with `eventId` (event id); type: `type` (type); durationMs: multiplies `durationSeconds` (duration seconds) by 1000; entrants: `entrants` (entrants); winnerId: `entrants[winnerIndex].id` (the id property of entrants[winnerIndex]) to the caller and exits this function.
      return {
// Original L391: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        eventId,
// Original L392: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        number: this.getRaceNumber(eventId),
// Original L393: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        type,
// Original L394: Chooses an inclusive 110–200 second duration.
        durationMs: durationSeconds * 1000,
// Original L395: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        entrants,
// Original L396: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        winnerId: entrants[winnerIndex].id
// Original L397: Closes the current block or module.
      };
// Original L398: Closes the current block or module.
    }
// Original L399: Blank line separates related code sections.

// Original L400: Comment documents how this part supports the virtual casino engine.
    // Re-create tickets from the previous 11-minute schedule only for old saved horse bets/notices.
// Original L401: Comment documents how this part supports the virtual casino engine.
    // Preserve the old seed and runner IDs only to settle saved tickets created by the former schedule format.
// Original L402: Rebuilds old horse-ticket races using the former 11-minute seed format.
    createLegacyRace(eventId) {
// Original L403: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const oldInterval = 660_000;
// Original L404: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const random = () => {
// Original L405: Builds a repeatable unsigned 32-bit seed.
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223) >>> 0;
// Original L406: Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.
        return () => {
// Original L407: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          state = (state + 0x6D2B79F5) >>> 0;
// Original L408: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          let value = state;
// Original L409: Performs repeatable 32-bit multiplication for PRNG mixing.
          value = Math.imul(value ^ (value >>> 15), value | 1);
// Original L410: Performs repeatable 32-bit multiplication for PRNG mixing.
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
// Original L411: Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
// Original L412: Closes the current block or module.
        };
// Original L413: Closes the current block or module.
      };
// Original L414: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const rand = random();
// Original L415: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const durationRandom = (() => {
// Original L416: Builds a repeatable unsigned 32-bit seed.
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223 + 0x9e3779b9) >>> 0;
// Original L417: Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.
        return () => {
// Original L418: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          state = (state + 0x6D2B79F5) >>> 0;
// Original L419: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          let value = state;
// Original L420: Performs repeatable 32-bit multiplication for PRNG mixing.
          value = Math.imul(value ^ (value >>> 15), value | 1);
// Original L421: Performs repeatable 32-bit multiplication for PRNG mixing.
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
// Original L422: Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
// Original L423: Closes the current block or module.
        };
// Original L424: Closes the current block or module.
      })();
// Original L425: Shortest simulated race is 110 seconds.
      const durationMs = (MIN_RACE_DURATION_SECONDS + Math.floor(durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1))) * 1000;
// Original L426: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const shuffled = [...LEGACY_HORSES];
// Original L427: Repeats the operation for the relevant entries.
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
// Original L428: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
        const j = Math.floor(rand() * (i + 1));
// Original L429: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
// Original L430: Closes the current block or module.
      }
// Original L431: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const entrants = shuffled.slice(0, 6).map((runner, index) => ({
// Original L432: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ...runner,
// Original L433: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        id: `horse-${index + 1}`,
// Original L434: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ability: 0.9 + rand() * 0.2,
// Original L435: Seeded animation speed ranges from 0.74 to 0.94.
        finishFactor: 0.74 + rand() * 0.2,
// Original L436: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        index
// Original L437: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      }));
// Original L438: Raises ability to the eighth power, strongly weighting better runners.
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
// Original L439: Sum of weights is the probability denominator.
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
// Original L440: Applies the enclosed update to every matching runner, DOM node, or saved record.
      entrants.forEach((runner, index) => {
// Original L441: Sum of weights is the probability denominator.
        runner.winProbability = weights[index] / totalWeight;
// Original L442: Normalizes each weight into a win probability.
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
// Original L443: Closes the current block or module.
      });
// Original L444: Sum of weights is the probability denominator.
      let draw = rand() * totalWeight;
// Original L445: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      let winnerIndex = weights.findIndex(weight => { draw -= weight; return draw < 0; });
// Original L446: Guards the following action so it runs only when the condition is true.
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;
// Original L447: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const winner = entrants[winnerIndex];
// Original L448: Seeded animation speed ranges from 0.74 to 0.94.
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
// Original L449: Seeded animation speed ranges from 0.74 to 0.94.
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);
// Original L450: Returns an object with fields eventId: `eventId` (event id); number: rounds divides `eventId` (event id) by `oldInterval` (old interval) down to the next whole number; type: "horse"; durationMs: `durationMs` (duration ms); entrants: `entrants` (entrants); winnerId: `entrants[winnerIndex].id` (the id property of entrants[winnerIndex]) to the caller and exits this function.
      return { eventId, number: Math.floor(eventId / oldInterval), type: 'horse', durationMs, entrants, winnerId: entrants[winnerIndex].id };
// Original L451: Closes the current block or module.
    }
// Original L452: Blank line separates related code sections.

// Original L453: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    raceStartTime(eventId) {
// Original L454: Returns calls `new Date(eventId).toLocaleTimeString` with an array containing ; an object with fields hour: "numeric"; minute: "2-digit" to the caller and exits this function.
      return new Date(eventId).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
// Original L455: Closes the current block or module.
    }
// Original L456: Blank line separates related code sections.

// Original L457: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    raceDateTime(eventId) {
// Original L458: Returns function toLocaleString() { [native code] } to the caller and exits this function.
      return new Date(eventId).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
// Original L459: Closes the current block or module.
    }
// Original L460: Blank line separates related code sections.

// Original L461: Displays virtual chips as US currency with two decimals.
    formatMoney(value) {
// Original L462: Returns a text template that combines fixed text with computed values function toLocaleString() { [native code] } to the caller and exits this function.
      return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// Original L463: Closes the current block or module.
    }
// Original L464: Blank line separates related code sections.

// Original L465: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
    formatCountdown(milliseconds) {
// Original L466: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
      const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
// Original L467: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
      const hours = Math.floor(seconds / 3600);
// Original L468: Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.
      const minutes = Math.floor((seconds % 3600) / 60);
// Original L469: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const remainder = seconds % 60;
// Original L470: Returns checks checks whether `hours` (hours) is greater than 0; if true chooses a text template that combines fixed text with computed values adds padding "0" to the beginning of converts `hours` (hours) to text until it has length 2, adds padding "0" to the beginning of converts `minutes` (minutes) to text until it has length 2, adds padding "0" to the beginning of converts `remainder` (remainder) to text until it has length 2, otherwise a text template that combines fixed text with computed values adds padding "0" to the beginning of converts `minutes` (minutes) to text until it has length 2, adds padding "0" to the beginning of converts `remainder` (remainder) to text until it has length 2 to the caller and exits this function.
      return hours > 0
// Original L471: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
// Original L472: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        : `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
// Original L473: Closes the current block or module.
    }
// Original L474: Blank line separates related code sections.

// Original L475: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    formatRaceResult(notice) {
// Original L476: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const isLegacy = !['horse', 'car'].includes(notice.raceType);
// Original L477: Rebuilds old horse-ticket races using the former 11-minute seed format.
      const race = isLegacy ? this.createLegacyRace(notice.raceId) : this.createRace(notice.raceId, notice.raceType);
// Original L478: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const runner = race.entrants.find(item => item.id === notice.runnerId);
// Original L479: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const winner = race.entrants.find(item => item.id === notice.winnerId);
// Original L480: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const label = isLegacy ? `Race #${race.number.toLocaleString('en-US')}` : `${notice.raceType === 'car' ? 'Car' : 'Horse'} race #${race.number.toLocaleString('en-US')}`;
// Original L481: Guards the following action so it runs only when the condition is true.
      if (notice.won) {
// Original L482: Displays virtual chips as US currency with two decimals.
        return `${label}: ${runner?.name || 'Your runner'} won! Your bet returned ${this.formatMoney(notice.payout)} including your stake.`;
// Original L483: Closes the current block or module.
      }
// Original L484: Displays virtual chips as US currency with two decimals.
      return `${label}: ${runner?.name || 'Your runner'} did not win; ${winner?.name || 'another runner'} took the race. Your ${this.formatMoney(notice.stake)} stake was lost.`;
// Original L485: Closes the current block or module.
    }
// Original L486: Blank line separates related code sections.

// Original L487: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    renderRaceResultNotice() {
// Original L488: Guards the following action so it runs only when the condition is true.
      if (!this.resultNoticeEl) return;
// Original L489: Guards the following action so it runs only when the condition is true.
      if (!this.raceResultNotice) {
// Original L490: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.resultNoticeEl.classList.add('hidden-view');
// Original L491: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        return;
// Original L492: Closes the current block or module.
      }
// Original L493: Calls `this.formatRaceResult` with `this.raceResultNotice` (the race result notice property of this); stores the result in `message`. const prevents reassignment of this binding, not mutation inside its object/array.
      const message = this.formatRaceResult(this.raceResultNotice);
// Original L494: Guards the following action so it runs only when the condition is true.
      if (this.resultNoticeTextEl && this.resultNoticeTextEl.textContent !== message) {
// Original L495: Sets `this.resultNoticeTextEl.textContent` (the text content property of this.resultNoticeTextEl) to `message` (message).
        this.resultNoticeTextEl.textContent = message;
// Original L496: Closes the current block or module.
      }
// Original L497: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.resultNoticeEl.classList.remove('hidden-view');
// Original L498: Closes the current block or module.
    }
// Original L499: Blank line separates related code sections.

// Original L500: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    acknowledgeRaceNotice(openRace) {
// Original L501: `this.raceResultNotice` (the race result notice property of this); stores the result in `notice`. const prevents reassignment of this binding, not mutation inside its object/array.
      const notice = this.raceResultNotice;
// Original L502: Guards the following action so it runs only when the condition is true.
      if (!notice) return;
// Original L503: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = this.formatRaceResult(notice);
// Original L504: Sets `this.raceResultNotice` (the race result notice property of this) to null.
      this.raceResultNotice = null;
// Original L505: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalProfiles?.saveCurrent({ raceResultNotice: null });
// Original L506: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalSave?.queueFileSave();
// Original L507: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.renderRaceResultNotice();
// Original L508: Guards the following action so it runs only when the condition is true.
      if (openRace) {
// Original L509: Guards the following action so it runs only when the condition is true.
        if (['horse', 'car'].includes(notice.raceType)) this.raceType = notice.raceType;
// Original L510: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.hub.switchView('horse-racing');
// Original L511: Recomputes phase, preview, track, controls, and due-ticket settlement.
        this.update();
// Original L512: Closes the current block or module.
      }
// Original L513: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateTicketNote();
// Original L514: Closes the current block or module.
    }
// Original L515: Blank line separates related code sections.

// Original L516: Comment documents how this part supports the virtual casino engine.
    // Simulate completed events missed while the browser was closed, so experience keeps progressing.
// Original L517: Comment documents how this part supports the virtual casino engine.
    // Advance missed events when the player returns so runner records do not require an open tab all day.
// Original L518: Catches up runner starts/wins for races missed while the browser was closed.
    processCompletedRaces(now) {
// Original L519: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      let changed = false;
// Original L520: Repeats the operation for the relevant entries.
      for (const type of ['horse', 'car']) {
// Original L521: The entry at index/key `type` (type) in `this.experience` (the experience property of this); stores the result in `circuit`. const prevents reassignment of this binding, not mutation inside its object/array.
        const circuit = this.experience[type];
// Original L522: Calls `this.getNextRaceStart` with `circuit.lastProcessedRaceId` (the last processed race id property of circuit); stores the result in `nextId`. let allows the binding to be reassigned.
        let nextId = this.getNextRaceStart(circuit.lastProcessedRaceId);
// Original L523: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        let processedCount = 0;
// Original L524: Caps catch-up at 1,000 events per update.
        while (nextId && processedCount < 1000) {
// Original L525: Calls `this.getScheduledRaceType` with `nextId` (next id); stores the result in `scheduledType`. const prevents reassignment of this binding, not mutation inside its object/array.
          const scheduledType = this.getScheduledRaceType(nextId);
// Original L526: Calls `this.createRace` with `nextId` (next id); `scheduledType` (scheduled type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.
          const race = this.createRace(nextId, scheduledType);
// Original L527: Guards the following action so it runs only when the condition is true.
          if (nextId + race.durationMs > now) break;
// Original L528: Guards the following action so it runs only when the condition is true.
          if (scheduledType === type) {
// Original L529: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            const runners = circuit.runners;
// Original L530: Adds one start to every entrant and one win to the deterministic winner.
            race.entrants.forEach(runner => {
// Original L531: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
              const stats = runners[runner.id] || { starts: 0, wins: 0 };
// Original L532: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
              stats.starts += 1;
// Original L533: Guards the following action so it runs only when the condition is true.
              if (runner.id === race.winnerId) stats.wins += 1;
// Original L534: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
              runners[runner.id] = stats;
// Original L535: Closes the current block or module.
            });
// Original L536: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            circuit.lastProcessedRaceId = nextId;
// Original L537: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            changed = true;
// Original L538: Closes the current block or module.
          }
// Original L539: Sets `nextId` (next id) to calls `this.getNextRaceStart` with `nextId` (next id).
          nextId = this.getNextRaceStart(nextId);
// Original L540: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          processedCount += 1;
// Original L541: Closes the current block or module.
        }
// Original L542: Closes the current block or module.
      }
// Original L543: Guards the following action so it runs only when the condition is true.
      if (changed) this.saveExperience();
// Original L544: Closes the current block or module.
    }
// Original L545: Blank line separates related code sections.

// Original L546: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    saveExperience() {
// Original L547: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalProfiles?.saveCurrent({ raceExperience: this.experience });
// Original L548: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalSave?.queueFileSave();
// Original L549: Closes the current block or module.
    }
// Original L550: Blank line separates related code sections.

// Original L551: Comment documents how this part supports the virtual casino engine.
    // One clock tick derives the live race and next betting race, then refreshes the dependent UI.
// Original L552: Recomputes phase, preview, track, controls, and due-ticket settlement.
    update() {
// Original L553: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const now = Date.now();
// Original L554: Catches up runner starts/wins for races missed while the browser was closed.
      this.processCompletedRaces(now);
// Original L555: Calls `this.getScheduledRaceAtOrBefore` with `now` (now); stores the result in `currentStart`. const prevents reassignment of this binding, not mutation inside its object/array.
      const currentStart = this.getScheduledRaceAtOrBefore(now);
// Original L556: Checks `currentStart` (current start); if true chooses calls `this.createRace` with `currentStart` (current start), otherwise null; stores the result in `activeRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const activeRace = currentStart ? this.createRace(currentStart) : null;
// Original L557: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const activeRaceEnd = activeRace ? activeRace.eventId + activeRace.durationMs : 0;
// Original L558: Sets `this.isRaceInProgress` (the is race in progress property of this) to converts uses checks whether `now` (now) is less than `activeRaceEnd` (active race end) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness.
      this.isRaceInProgress = Boolean(activeRace && now < activeRaceEnd);
// Original L559: Shows a finished result for 120 seconds.
      this.isResultDisplay = Boolean(activeRace && !this.isRaceInProgress && now < activeRaceEnd + RESULT_DISPLAY_MS);
// Original L560: Calls `this.getNextRaceStart` with `now` (now); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.
      const nextRaceId = this.getNextRaceStart(now);
// Original L561: Calls `this.createRace` with `nextRaceId` (next race id); stores the result in `bettingRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const bettingRace = this.createRace(nextRaceId);
// Original L562: Sets `this.raceType` (the race type property of this) to `bettingRace.type` (the type property of bettingRace).
      this.raceType = bettingRace.type;
// Original L563: `this.isRacePreviewOpen` (the is race preview open property of this); stores the result in `wasRacePreviewOpen`. const prevents reassignment of this binding, not mutation inside its object/array.
      const wasRacePreviewOpen = this.isRacePreviewOpen;
// Original L564: True from 45 minutes before start onward.
      this.isRacePreviewOpen = this.isRacePreviewOpenFor(bettingRace.eventId, now);
// Original L565: True only during the 45-minute-to-5-minute-before-start window.
      this.isBettingOpen = this.isBettingOpenFor(bettingRace.eventId, now);
// Original L566: Blank line separates related code sections.

// Original L567: Comment documents how this part supports the virtual casino engine.
      // Tickets retain their stored event result, so profile reloads cannot alter a wager already placed.
// Original L568: Uses `this.ticket?.durationMs` (the duration ms property of this.ticket); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to checks `this.ticket` (the ticket property of this); if true chooses checks `this.ticket.raceType` (the race type property of this.ticket); if true chooses `this.createRace(this.ticket.raceId, this.ticket.raceType).durationMs` (the duration ms property of this.createRace(this.ticket.raceId, this.ticket.raceType)), otherwise `this.createLegacyRace(this.ticket.raceId).durationMs` (the duration ms property of this.createLegacyRace(this.ticket.raceId)), otherwise 0; stores the result in `ticketDuration`. const prevents reassignment of this binding, not mutation inside its object/array.
      const ticketDuration = this.ticket?.durationMs || (this.ticket
// Original L569: Rebuilds old horse-ticket races using the former 11-minute seed format.
        ? (this.ticket.raceType ? this.createRace(this.ticket.raceId, this.ticket.raceType).durationMs : this.createLegacyRace(this.ticket.raceId).durationMs)
// Original L570: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        : 0);
// Original L571: Reconstructs the locked seeded result and settles the saved ticket.
      if (this.ticket && now >= this.ticket.raceId + ticketDuration) this.settleTicket();
// Original L572: Blank line separates related code sections.

// Original L573: Converts uses uses `this.isRaceInProgress` (the is race in progress property of this) when it is truthy, otherwise falls back to `this.isResultDisplay` (the is result display property of this) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `trackIsCurrent`. const prevents reassignment of this binding, not mutation inside its object/array.
      const trackIsCurrent = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
// Original L574: Checks `trackIsCurrent` (track is current); if true chooses `activeRace` (active race), otherwise checks `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses `bettingRace` (betting race), otherwise null; stores the result in `trackRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const trackRace = trackIsCurrent ? activeRace : (this.isRacePreviewOpen ? bettingRace : null);
// Original L575: Checks that `this.targetRaceId` (the target race id property of this) and `bettingRace.eventId` (the event id property of bettingRace) differ in value or type; stores the result in `targetRaceChanged`. const prevents reassignment of this binding, not mutation inside its object/array.
      const targetRaceChanged = this.targetRaceId !== bettingRace.eventId;
// Original L576: Guards the following action so it runs only when the condition is true.
      if (targetRaceChanged) {
// Original L577: Sets `this.targetRaceId` (the target race id property of this) to `bettingRace.eventId` (the event id property of bettingRace).
        this.targetRaceId = bettingRace.eventId;
// Original L578: Sets `this.selectedHorseId` (the selected horse id property of this) to null.
        this.selectedHorseId = null;
// Original L579: Stores settled stake, payout, and line summary; free-spin stake is zero.
        this.lastResultText = '';
// Original L580: Closes the current block or module.
      }
// Original L581: Guards the following action so it runs only when the condition is true.
      if (targetRaceChanged || wasRacePreviewOpen !== this.isRacePreviewOpen) {
// Original L582: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.renderRunnerOptions(this.isRacePreviewOpen ? bettingRace : null);
// Original L583: Guards the following action so it runs only when the condition is true.
        if (!this.isRacePreviewOpen) this.selectedHorseId = null;
// Original L584: Closes the current block or module.
      }
// Original L585: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const trackRaceId = trackRace?.eventId || null;
// Original L586: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const trackRaceType = trackRace?.type || null;
// Original L587: Guards the following action so it runs only when the condition is true.
      if (this.trackRaceId !== trackRaceId || this.trackRaceType !== trackRaceType) {
// Original L588: Sets `this.trackRaceId` (the track race id property of this) to `trackRaceId` (track race id).
        this.trackRaceId = trackRaceId;
// Original L589: Sets `this.trackRaceType` (the track race type property of this) to `trackRaceType` (track race type).
        this.trackRaceType = trackRaceType;
// Original L590: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.renderTrack(trackRace);
// Original L591: Closes the current block or module.
      }
// Original L592: Checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses divides subtracts `activeRace.eventId` (the event id property of activeRace) from `now` (now) by `activeRace.durationMs` (the duration ms property of activeRace), otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses 1, otherwise 0; stores the result in `progress`. const prevents reassignment of this binding, not mutation inside its object/array.
      const progress = this.isRaceInProgress
// Original L593: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ? (now - activeRace.eventId) / activeRace.durationMs
// Original L594: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        : (this.isResultDisplay ? 1 : 0);
// Original L595: Guards the following action so it runs only when the condition is true.
      if (trackRace) this.updateTrackPositions(trackRace, progress, trackIsCurrent);
// Original L596: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateClockAndStatus(bettingRace, activeRace, now, nextRaceId - now);
// Original L597: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateRunnerSelection();
// Original L598: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateBetControls();
// Original L599: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateTicketNote();
// Original L600: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.updateModeButtons(trackIsCurrent ? activeRace.type : (this.isRacePreviewOpen ? bettingRace.type : null));
// Original L601: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.renderRaceResultNotice();
// Original L602: Closes the current block or module.
    }
// Original L603: Blank line separates related code sections.

// Original L604: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateClockAndStatus(bettingRace, activeRace, now, remaining) {
// Original L605: Converts uses uses `this.isRaceInProgress` (the is race in progress property of this) when it is truthy, otherwise falls back to `this.isResultDisplay` (the is result display property of this) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `showingActiveRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const showingActiveRace = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
// Original L606: Guards the following action so it runs only when the condition is true.
      if (!showingActiveRace && !this.isRacePreviewOpen) {
// Original L607: Calls `this.getNextBettingOpen` with `now` (now); stores the result in `nextOpen`. const prevents reassignment of this binding, not mutation inside its object/array.
        const nextOpen = this.getNextBettingOpen(now);
// Original L608: Calls `this.raceStartTime` with `nextOpen` (next open); stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.
        const opensAt = this.raceStartTime(nextOpen);
// Original L609: Guards the following action so it runs only when the condition is true.
        if (this.raceTitleEl) this.raceTitleEl.textContent = 'Racing Closed';
// Original L610: Guards the following action so it runs only when the condition is true.
        if (this.raceNumberEl) this.raceNumberEl.textContent = '—';
// Original L611: Guards the following action so it runs only when the condition is true.
        if (this.phaseEl) this.phaseEl.textContent = 'CLOSED';
// Original L612: Finds the relevant race control or runner nodes in the DOM.
        const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
// Original L613: Guards the following action so it runs only when the condition is true.
        if (countdownLabel) countdownLabel.textContent = 'BETTING OPENS IN';
// Original L614: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
        if (this.countdownEl) this.countdownEl.textContent = this.formatCountdown(nextOpen - now);
// Original L615: Guards the following action so it runs only when the condition is true.
        if (this.startTimeEl) this.startTimeEl.textContent = '—';
// Original L616: Guards the following action so it runs only when the condition is true.
        if (this.raceDurationEl) this.raceDurationEl.textContent = '—';
// Original L617: Guards the following action so it runs only when the condition is true.
        if (this.targetTextEl) this.targetTextEl.textContent = `Racing is closed. The next preview and betting open at ${opensAt}.`;
// Original L618: Guards the following action so it runs only when the condition is true.
        if (this.trackCaptionEl) this.trackCaptionEl.textContent = 'RACING CLOSED';
// Original L619: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.setStatus(`CLOSED — RACING RESUMES AT ${opensAt}`, 'status-loss');
// Original L620: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        return;
// Original L621: Closes the current block or module.
      }
// Original L622: Blank line separates related code sections.

// Original L623: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const raceNumber = `#${bettingRace.number.toLocaleString('en-US')}`;
// Original L624: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const displayedRace = showingActiveRace ? activeRace : bettingRace;
// Original L625: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const displayedRaceNumber = `#${displayedRace.number.toLocaleString('en-US')}`;
// Original L626: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const typeLabel = bettingRace.type === 'car' ? 'car' : 'horse';
// Original L627: Guards the following action so it runs only when the condition is true.
      if (this.raceTitleEl) this.raceTitleEl.textContent = displayedRace.type === 'car' ? 'Circuit Racing' : 'Horse Racing';
// Original L628: Guards the following action so it runs only when the condition is true.
      if (this.raceNumberEl) this.raceNumberEl.textContent = displayedRaceNumber;
// Original L629: Guards the following action so it runs only when the condition is true.
      if (this.phaseEl) {
// Original L630: Sets `this.phaseEl.textContent` (the text content property of this.phaseEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses "RACING", otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses "RESULTS", otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses "BETTING OPEN", otherwise "BETTING CLOSED".
        this.phaseEl.textContent = this.isRaceInProgress
// Original L631: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? 'RACING'
// Original L632: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : (this.isResultDisplay ? 'RESULTS' : (this.isBettingOpen ? 'BETTING OPEN' : 'BETTING CLOSED'));
// Original L633: Closes the current block or module.
      }
// Original L634: Finds the relevant race control or runner nodes in the DOM.
      const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
// Original L635: Guards the following action so it runs only when the condition is true.
      if (countdownLabel) countdownLabel.textContent = this.isRaceInProgress ? 'FINISH IN' : 'NEXT STARTS IN';
// Original L636: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const displayRace = displayedRace;
// Original L637: Guards the following action so it runs only when the condition is true.
      if (this.countdownEl) this.countdownEl.textContent = this.isRaceInProgress
// Original L638: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
        ? this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))
// Original L639: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
        : this.formatCountdown(remaining);
// Original L640: Guards the following action so it runs only when the condition is true.
      if (this.startTimeEl) this.startTimeEl.textContent = this.raceDateTime(displayedRace.eventId);
// Original L641: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
      if (this.raceDurationEl) this.raceDurationEl.textContent = this.formatCountdown(displayRace.durationMs);
// Original L642: Guards the following action so it runs only when the condition is true.
      if (this.targetTextEl) {
// Original L643: Closes betting five minutes before start.
        const cutoff = this.raceStartTime(bettingRace.eventId - BETTING_CUTOFF_MS);
// Original L644: Opens preview and controls 45 minutes before start.
        const nextOpen = this.raceStartTime(bettingRace.eventId - RACE_PREVIEW_OPEN_MS);
// Original L645: Checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses a text template that combines fixed text with computed values `nextOpen` (next open), otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses a text template that combines fixed text with computed values checks checks that `bettingRace.type` and "car" have the same value and type; if true chooses "car", otherwise "horse", `typeLabel` (type label), `raceNumber` (race number), `cutoff` (cutoff), otherwise a text template that combines fixed text with computed values `typeLabel` (type label), `raceNumber` (race number), calls `this.raceStartTime` with `bettingRace.eventId` (the event id property of bettingRace); stores the result in `targetMessage`. const prevents reassignment of this binding, not mutation inside its object/array.
        const targetMessage = !this.isRacePreviewOpen
// Original L646: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? `The next preview and betting open at ${nextOpen}.`
// Original L647: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : (this.isBettingOpen
// Original L648: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            ? `Choose a ${bettingRace.type === 'car' ? 'car' : 'horse'} for ${typeLabel} race ${raceNumber}. Betting closes at ${cutoff}, five minutes before the start.`
// Original L649: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            : `Betting is closed for ${typeLabel} race ${raceNumber}. The next field starts at ${this.raceStartTime(bettingRace.eventId)}.`);
// Original L650: Sets `this.targetTextEl.textContent` (the text content property of this.targetTextEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses a text template that combines fixed text with computed values `activeRace.type` (the type property of activeRace), `targetMessage` (target message), otherwise `targetMessage` (target message).
        this.targetTextEl.textContent = this.isRaceInProgress
// Original L651: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? `The current ${activeRace.type} race is underway. ${targetMessage}`
// Original L652: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : targetMessage;
// Original L653: Closes the current block or module.
      }
// Original L654: Guards the following action so it runs only when the condition is true.
      if (this.trackCaptionEl) {
// Original L655: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const currentNo = activeRace ? `#${activeRace.number.toLocaleString('en-US')}` : '';
// Original L656: Sets `this.trackCaptionEl.textContent` (the text content property of this.trackCaptionEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses a text template that combines fixed text with computed values checks checks that `activeRace.type` and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE", `currentNo` (current no), otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses a text template that combines fixed text with computed values checks `activeRace.type === 'car'`; if true chooses "CAR", otherwise "HORSE", `currentNo` (current no), otherwise a text template that combines fixed text with computed values checks `bettingRace.type === 'car'`; if true chooses "CAR", otherwise "HORSE", `raceNumber` (race number).
        this.trackCaptionEl.textContent = this.isRaceInProgress
// Original L657: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — LIVE`
// Original L658: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : (this.isResultDisplay
// Original L659: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — FINAL RESULT`
// Original L660: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
            : `${bettingRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${raceNumber} — NEXT FIELD PREVIEW`);
// Original L661: Closes the current block or module.
      }
// Original L662: Blank line separates related code sections.

// Original L663: Guards the following action so it runs only when the condition is true.
      if (this.statusEl) {
// Original L664: Guards the following action so it runs only when the condition is true.
        if (this.isRaceInProgress) {
// Original L665: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE IN PROGRESS — ${this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))} TO FINISH`, 'status-spinning');
// Original L666: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        } else if (this.isResultDisplay) {
// Original L667: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          const winner = activeRace.entrants.find(runner => runner.id === activeRace.winnerId);
// Original L668: Calls `this.setStatus` with a text template that combines fixed text with computed values checks checks that `activeRace.type` (the type property of activeRace) and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE", uses `winner?.name` (the name property of winner); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "WINNER"; "status-win".
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE FINISHED — ${winner?.name || 'WINNER'} TAKES THE WIN`, 'status-win');
// Original L669: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        } else if (!this.isBettingOpen) {
// Original L670: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
          this.setStatus(`BETTING CLOSED — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-loss');
// Original L671: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        } else {
// Original L672: Formats a nonnegative countdown as HH:MM:SS or MM:SS.
          this.setStatus(`BETTING OPEN — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-spinning');
// Original L673: Closes the current block or module.
        }
// Original L674: Closes the current block or module.
      }
// Original L675: Closes the current block or module.
    }
// Original L676: Blank line separates related code sections.

// Original L677: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    setStatus(message, statusClass) {
// Original L678: Guards the following action so it runs only when the condition is true.
      if (!this.statusEl) return;
// Original L679: Sets `this.statusEl.textContent` (the text content property of this.statusEl) to `message` (message).
      this.statusEl.textContent = message;
// Original L680: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.statusEl.classList.remove('status-spinning', 'status-win', 'status-loss');
// Original L681: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.statusEl.classList.add(statusClass);
// Original L682: Closes the current block or module.
    }
// Original L683: Blank line separates related code sections.

// Original L684: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    renderRunnerOptions(race) {
// Original L685: Guards the following action so it runs only when the condition is true.
      if (!this.runnerListEl) return;
// Original L686: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.runnerListEl.replaceChildren();
// Original L687: Guards the following action so it runs only when the condition is true.
      if (!race) {
// Original L688: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.runnerListEl.setAttribute('aria-label', 'Race runners hidden until the preview opens');
// Original L689: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        return;
// Original L690: Closes the current block or module.
      }
// Original L691: Calls `this.runnerListEl.setAttribute` with "aria-label"; a text template that combines fixed text with computed values checks checks that `race.type` (the type property of race) and "car" have the same value and type; if true chooses "car", otherwise "horse".
      this.runnerListEl.setAttribute('aria-label', `Choose a ${race.type === 'car' ? 'car' : 'horse'} to win`);
// Original L692: Adds one start to every entrant and one win to the deterministic winner.
      race.entrants.forEach((runner, index) => {
// Original L693: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const button = document.createElement('button');
// Original L694: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.type = 'button';
// Original L695: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.className = 'race-runner-option';
// Original L696: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.dataset.runnerId = runner.id;
// Original L697: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.setAttribute('aria-pressed', 'false');
// Original L698: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const silks = document.createElement('span');
// Original L699: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        silks.className = 'race-runner-silks';
// Original L700: Updates the visible race text for the player.
        silks.textContent = runner.silks;
// Original L701: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const details = document.createElement('span');
// Original L702: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        details.className = 'race-runner-details';
// Original L703: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const name = document.createElement('strong');
// Original L704: Updates the visible race text for the player.
        name.textContent = `${index + 1}. ${runner.name}`;
// Original L705: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const probability = document.createElement('small');
// Original L706: Normalizes each weight into a win probability.
        probability.textContent = `${Math.round(runner.winProbability * 100)}% chance • ${runner.starts} starts / ${runner.wins} wins`;
// Original L707: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        details.append(name, probability);
// Original L708: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const odds = document.createElement('span');
// Original L709: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        odds.className = 'race-runner-odds';
// Original L710: Calculates a house-adjusted total-return multiple: about 0.92/probability, floored at 1.20x.
        odds.textContent = `${runner.odds.toFixed(2)}×`;
// Original L711: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const oddsCaption = document.createElement('small');
// Original L712: Updates the visible race text for the player.
        oddsCaption.textContent = 'total return';
// Original L713: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const oddsWrap = document.createElement('span');
// Original L714: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        oddsWrap.className = 'race-odds-wrap';
// Original L715: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        oddsWrap.append(odds, oddsCaption);
// Original L716: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.append(silks, details, oddsWrap);
// Original L717: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.runnerListEl.appendChild(button);
// Original L718: Closes the current block or module.
      });
// Original L719: Closes the current block or module.
    }
// Original L720: Blank line separates related code sections.

// Original L721: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    renderTrack(race) {
// Original L722: Guards the following action so it runs only when the condition is true.
      if (!this.trackEl) return;
// Original L723: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.trackEl.replaceChildren();
// Original L724: Guards the following action so it runs only when the condition is true.
      if (!race) return;
// Original L725: Adds one start to every entrant and one win to the deterministic winner.
      race.entrants.forEach((runner, index) => {
// Original L726: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const lane = document.createElement('div');
// Original L727: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        lane.className = `race-lane ${race.type === 'car' ? 'race-car-lane' : 'race-horse-lane'}`;
// Original L728: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        lane.dataset.runnerId = runner.id;
// Original L729: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const laneNumber = document.createElement('span');
// Original L730: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        laneNumber.className = 'race-lane-number';
// Original L731: Updates the visible race text for the player.
        laneNumber.textContent = String(index + 1);
// Original L732: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const rail = document.createElement('div');
// Original L733: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        rail.className = 'race-lane-rail';
// Original L734: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const finish = document.createElement('span');
// Original L735: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        finish.className = 'race-finish-line';
// Original L736: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        finish.setAttribute('aria-hidden', 'true');
// Original L737: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const token = document.createElement('span');
// Original L738: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        token.className = race.type === 'car' ? 'race-horse-token race-car-token' : 'race-horse-token';
// Original L739: Updates the visible race text for the player.
        token.textContent = runner.silks;
// Original L740: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        token.setAttribute('aria-label', runner.name);
// Original L741: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        token.style.setProperty('--silks-color', runner.lane);
// Original L742: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        rail.append(finish, token);
// Original L743: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const name = document.createElement('span');
// Original L744: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        name.className = 'race-lane-name';
// Original L745: Updates the visible race text for the player.
        name.textContent = runner.name;
// Original L746: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        lane.append(laneNumber, rail, name);
// Original L747: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.trackEl.appendChild(lane);
// Original L748: Closes the current block or module.
      });
// Original L749: Closes the current block or module.
    }
// Original L750: Blank line separates related code sections.

// Original L751: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateTrackPositions(race, progress, isRunning) {
// Original L752: Guards the following action so it runs only when the condition is true.
      if (!this.trackEl) return;
// Original L753: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const winnerId = race.winnerId;
// Original L754: Finds the relevant race control or runner nodes in the DOM.
      this.trackEl.querySelectorAll('.race-lane').forEach(lane => {
// Original L755: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const runner = race.entrants.find(item => item.id === lane.dataset.runnerId);
// Original L756: Finds the relevant race control or runner nodes in the DOM.
        const token = lane.querySelector('.race-horse-token');
// Original L757: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const isWinner = runner?.id === winnerId;
// Original L758: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const position = isRunning
// Original L759: Seeded animation speed ranges from 0.74 to 0.94.
          ? Math.min(isWinner ? 100 : 94, progress * runner.finishFactor * 100)
// Original L760: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : 0;
// Original L761: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        token.style.left = `${position}%`;
// Original L762: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        lane.classList.toggle('is-race-winner', isWinner && isRunning && progress >= 1);
// Original L763: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        lane.classList.toggle('is-race-running', isRunning);
// Original L764: Closes the current block or module.
      });
// Original L765: Closes the current block or module.
    }
// Original L766: Blank line separates related code sections.

// Original L767: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateRunnerSelection() {
// Original L768: Guards the following action so it runs only when the condition is true.
      if (!this.runnerListEl) return;
// Original L769: Finds the relevant race control or runner nodes in the DOM.
      this.runnerListEl.querySelectorAll('[data-runner-id]').forEach(button => {
// Original L770: Checks that `button.dataset.runnerId` (the runner id property of button.dataset) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type; stores the result in `isSelected`. const prevents reassignment of this binding, not mutation inside its object/array.
        const isSelected = button.dataset.runnerId === this.selectedHorseId;
// Original L771: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.classList.toggle('is-selected', isSelected);
// Original L772: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        button.setAttribute('aria-pressed', String(isSelected));
// Original L773: Sets `button.disabled` (the disabled property of button) to uses negates the truthiness of `this.isBettingOpen` (the is betting open property of this) when it is truthy, otherwise falls back to converts `this.ticket` (the ticket property of this) to true or false according to truthiness.
        button.disabled = !this.isBettingOpen || Boolean(this.ticket);
// Original L774: Closes the current block or module.
      });
// Original L775: Closes the current block or module.
    }
// Original L776: Blank line separates related code sections.

// Original L777: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateModeButtons(visibleRaceType = null) {
// Original L778: Runs a callback taking item that runs its enclosed statements once per item of `this.modeButtons` (the mode buttons property of this).
      this.modeButtons.forEach(item => {
// Original L779: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        const active = Boolean(visibleRaceType && item.dataset.raceType === visibleRaceType);
// Original L780: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        item.classList.toggle('is-active', active);
// Original L781: Guards the following action so it runs only when the condition is true.
        if (active) item.setAttribute('aria-current', 'true');
// Original L782: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        else item.removeAttribute('aria-current');
// Original L783: Closes the current block or module.
      });
// Original L784: Closes the current block or module.
    }
// Original L785: Blank line separates related code sections.

// Original L786: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateBetControls() {
// Original L787: Displays virtual chips as US currency with two decimals.
      if (this.betDisplayEl) this.betDisplayEl.textContent = this.formatMoney(this.bet);
// Original L788: Calls `this.createRace` with uses `this.targetRaceId` (the target race id property of this) when it is truthy, otherwise falls back to calls `this.getNextRaceStart` with reads the current time as milliseconds since 1970-01-01 UTC; stores the result in `currentRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const currentRace = this.createRace(this.targetRaceId || this.getNextRaceStart(Date.now()));
// Original L789: Returns the first item of `currentRace.entrants` (the entrants property of currentRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type, or undefined; stores the result in `selectedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.
      const selectedRunner = currentRace.entrants.find(runner => runner.id === this.selectedHorseId);
// Original L790: Checks `selectedRunner` (selected runner); if true chooses calls `this.roundMoney` with multiplies `this.bet` (the bet property of this) by `selectedRunner.odds` (the odds property of selectedRunner), otherwise 0; stores the result in `potential`. const prevents reassignment of this binding, not mutation inside its object/array.
      const potential = selectedRunner ? this.roundMoney(this.bet * selectedRunner.odds) : 0;
// Original L791: Displays virtual chips as US currency with two decimals.
      if (this.estimatedReturnEl) this.estimatedReturnEl.textContent = this.formatMoney(potential);
// Original L792: Caps a wager at both wallet balance and player maxBet.
      const maximum = this.maxStake();
// Original L793: Uses negates the truthiness of `this.ticket` (the ticket property of this) only if `this.isBettingOpen` (the is betting open property of this) is truthy; otherwise keeps the falsy first value; stores the result in `betOpen`. const prevents reassignment of this binding, not mutation inside its object/array.
      const betOpen = this.isBettingOpen && !this.ticket;
// Original L794: Race wagers change in five-chip steps.
      if (this.minusBtn) this.minusBtn.disabled = !betOpen || this.bet <= BET_STEP;
// Original L795: Race wagers change in five-chip steps.
      if (this.plusBtn) this.plusBtn.disabled = !betOpen || this.bet + BET_STEP > maximum;
// Original L796: Guards the following action so it runs only when the condition is true.
      if (this.maxBtn) {
// Original L797: Sets `this.maxBtn.disabled` (the disabled property of this.maxBtn) to uses uses negates the truthiness of `betOpen` (bet open) when it is truthy, otherwise falls back to checks whether `maximum` (maximum) is at most 0 when it is truthy, otherwise falls back to checks that `this.bet` (the bet property of this) and `maximum` (maximum) have the same value and type.
        this.maxBtn.disabled = !betOpen || maximum <= 0 || this.bet === maximum;
// Original L798: Sets `this.maxBtn.textContent` (the text content property of this.maxBtn) to "MAX BET".
        this.maxBtn.textContent = 'MAX BET';
// Original L799: Closes the current block or module.
      }
// Original L800: Guards the following action so it runs only when the condition is true.
      if (this.clearBtn) this.clearBtn.disabled = !betOpen || this.bet === 0;
// Original L801: Guards the following action so it runs only when the condition is true.
      if (this.placeBtn) {
// Original L802: Sets `this.placeBtn.disabled` (the disabled property of this.placeBtn) to uses uses uses negates the truthiness of `betOpen` (bet open) when it is truthy, otherwise falls back to negates the truthiness of `selectedRunner` (selected runner) when it is truthy, otherwise falls back to checks whether `this.bet` (the bet property of this) is at most 0 when it is truthy, otherwise falls back to checks whether `this.bet` (the bet property of this) is greater than `maximum` (maximum).
        this.placeBtn.disabled = !betOpen || !selectedRunner || this.bet <= 0 || this.bet > maximum;
// Original L803: Sets `this.placeBtn.textContent` (the text content property of this.placeBtn) to checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses "RACING CLOSED", otherwise checks `selectedRunner` (selected runner); if true chooses a text template that combines fixed text with computed values calls `this.formatMoney` with `this.bet`, otherwise checks negates the truthiness of `this.isBettingOpen`; if true chooses "BETTING CLOSED", otherwise a text template that combines fixed text with computed values `this.raceType === 'car' ? 'CAR' : 'HORSE'`.
        this.placeBtn.textContent = !this.isRacePreviewOpen
// Original L804: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? 'RACING CLOSED'
// Original L805: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : (selectedRunner
// Original L806: Displays virtual chips as US currency with two decimals.
            ? `PLACE WIN BET • ${this.formatMoney(this.bet)}`
// Original L807: Checks negates the truthiness of `this.isBettingOpen` (the is betting open property of this); if true chooses "BETTING CLOSED", otherwise a text template that combines fixed text with computed values checks checks that `this.raceType` (the race type property of this) and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE".
            : (!this.isBettingOpen ? 'BETTING CLOSED' : `SELECT A ${this.raceType === 'car' ? 'CAR' : 'HORSE'}`));
// Original L808: Closes the current block or module.
      }
// Original L809: Closes the current block or module.
    }
// Original L810: Blank line separates related code sections.

// Original L811: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
    updateTicketNote() {
// Original L812: Guards the following action so it runs only when the condition is true.
      if (!this.ticketNoteEl) return;
// Original L813: Stores settled stake, payout, and line summary; free-spin stake is zero.
      if (this.lastResultText) {
// Original L814: Stores settled stake, payout, and line summary; free-spin stake is zero.
        this.ticketNoteEl.textContent = this.lastResultText;
// Original L815: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        return;
// Original L816: Closes the current block or module.
      }
// Original L817: Guards the following action so it runs only when the condition is true.
      if (this.ticket) {
// Original L818: Negates the truthiness of checks whether an array containing "horse", "car" contains `this.ticket.raceType` (the race type property of this.ticket); stores the result in `legacy`. const prevents reassignment of this binding, not mutation inside its object/array.
        const legacy = !['horse', 'car'].includes(this.ticket.raceType);
// Original L819: Checks `legacy` (legacy); if true chooses "horse", otherwise `this.ticket.raceType` (the race type property of this.ticket); stores the result in `type`. const prevents reassignment of this binding, not mutation inside its object/array.
        const type = legacy ? 'horse' : this.ticket.raceType;
// Original L820: Rebuilds old horse-ticket races using the former 11-minute seed format.
        const currentRace = legacy ? this.createLegacyRace(this.ticket.raceId) : this.createRace(this.ticket.raceId, type);
// Original L821: Returns the first item of `currentRace.entrants` (the entrants property of currentRace) matching a callback taking item that checks that `item.id` (the id property of item) and `this.ticket.runnerId` (the runner id property of this.ticket) have the same value and type, or undefined; stores the result in `runner`. const prevents reassignment of this binding, not mutation inside its object/array.
        const runner = currentRace.entrants.find(item => item.id === this.ticket.runnerId);
// Original L822: Calls `this.roundMoney` with multiplies `this.ticket.stake` (the stake property of this.ticket) by `this.ticket.odds` (the odds property of this.ticket); stores the result in `potential`. const prevents reassignment of this binding, not mutation inside its object/array.
        const potential = this.roundMoney(this.ticket.stake * this.ticket.odds);
// Original L823: Displays virtual chips as US currency with two decimals.
        this.ticketNoteEl.textContent = `Locked ticket: ${this.formatMoney(this.ticket.stake)} on ${runner?.name || 'your runner'} in the ${type} race at ${this.raceStartTime(this.ticket.raceId)}, ${this.ticket.odds.toFixed(2)}×. Potential total return: ${this.formatMoney(potential)}.`;
// Original L824: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        return;
// Original L825: Closes the current block or module.
      }
// Original L826: Sets `this.ticketNoteEl.textContent` (the text content property of this.ticketNoteEl) to checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses "Racing is closed. Preview and betting open 45 minutes before the next race. Virtual chips only.", otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses "One open ticket at a time across both circuits. Virtual chips only.", otherwise "Betting closes five minutes before each start. Your chips are virtual only.".
      this.ticketNoteEl.textContent = !this.isRacePreviewOpen
// Original L827: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        ? 'Racing is closed. Preview and betting open 45 minutes before the next race. Virtual chips only.'
// Original L828: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        : (this.isBettingOpen
// Original L829: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          ? 'One open ticket at a time across both circuits. Virtual chips only.'
// Original L830: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
          : 'Betting closes five minutes before each start. Your chips are virtual only.');
// Original L831: Closes the current block or module.
    }
// Original L832: Blank line separates related code sections.

// Original L833: Comment documents how this part supports the virtual casino engine.
    // Record the event, runner, stake, odds, and duration before settlement; deduct the stake only once.
// Original L834: Validates and records one ticket, deducting its stake once.
    placeBet() {
// Original L835: Guards the following action so it runs only when the condition is true.
      if (this.hub.isSettling) return;
// Original L836: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const now = Date.now();
// Original L837: Calls `this.getNextRaceStart` with `now` (now); stores the result in `raceId`. const prevents reassignment of this binding, not mutation inside its object/array.
      const raceId = this.getNextRaceStart(now);
// Original L838: Calls `this.createRace` with `raceId` (race id); stores the result in `bettingRace`. const prevents reassignment of this binding, not mutation inside its object/array.
      const bettingRace = this.createRace(raceId);
// Original L839: Returns the first item of `bettingRace.entrants` (the entrants property of bettingRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type, or undefined; stores the result in `selectedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.
      const selectedRunner = bettingRace.entrants.find(runner => runner.id === this.selectedHorseId);
// Original L840: Caps a wager at both wallet balance and player maxBet.
      const maximum = this.maxStake();
// Original L841: Guards the following action so it runs only when the condition is true.
      if (!this.canBetNow(now) || !selectedRunner || !Number.isFinite(this.bet) || this.bet <= 0 || this.bet > maximum) return;
// Original L842: Blank line separates related code sections.

// Original L843: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.fx?.playClick();
// Original L844: Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.
      this.ticket = {
// Original L845: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceId: bettingRace.eventId,
// Original L846: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceType: bettingRace.type,
// Original L847: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        runnerId: selectedRunner.id,
// Original L848: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        stake: this.roundMoney(this.bet),
// Original L849: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        odds: selectedRunner.odds,
// Original L850: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        winnerId: bettingRace.winnerId,
// Original L851: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        durationMs: bettingRace.durationMs
// Original L852: Closes the current block or module.
      };
// Original L853: Deducts the stake at placement or credits a winning return at settlement.
      this.hub.balance = this.roundMoney(this.hub.balance - this.ticket.stake);
// Original L854: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalProfiles?.saveCurrent({
// Original L855: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        player: this.hub.player.toProfile(),
// Original L856: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceBet: this.ticket
// Original L857: Closes the current block or module.
      });
// Original L858: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.hub.updateGlobalUI();
// Original L859: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalSave?.queueFileSave();
// Original L860: Contributes 1.5% of the stake to the optional jackpot.
      this.jackpot?.contribute(this.ticket.stake * 0.015);
// Original L861: Awards wager XP based on stake.
      this.xp?.addWagerXP(this.ticket.stake);
// Original L862: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = '';
// Original L863: Recomputes phase, preview, track, controls, and due-ticket settlement.
      this.update();
// Original L864: Closes the current block or module.
    }
// Original L865: Blank line separates related code sections.

// Original L866: Comment documents how this part supports the virtual casino engine.
    // Reconstruct the recorded seeded result and settle the saved ticket even if the player returns later.
// Original L867: Reconstructs the locked seeded result and settles the saved ticket.
    settleTicket() {
// Original L868: Guards the following action so it runs only when the condition is true.
      if (this.hub.isSettling) return; // The regular update loop retries once the atomic wallet write completes.
// Original L869: `this.ticket` (the ticket property of this); stores the result in `ticket`. const prevents reassignment of this binding, not mutation inside its object/array.
      const ticket = this.ticket;
// Original L870: Guards the following action so it runs only when the condition is true.
      if (!ticket) return;
// Original L871: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const legacy = !['horse', 'car'].includes(ticket.raceType);
// Original L872: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const raceType = legacy ? 'horse' : ticket.raceType;
// Original L873: Rebuilds old horse-ticket races using the former 11-minute seed format.
      const finishedRace = legacy ? this.createLegacyRace(ticket.raceId) : this.createRace(ticket.raceId, raceType);
// Original L874: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const winnerId = ticket.winnerId || finishedRace.winnerId;
// Original L875: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const won = ticket.runnerId === winnerId;
// Original L876: Rounds gross return to cents.
      const payout = won ? this.roundMoney(ticket.stake * ticket.odds) : 0;
// Original L877: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      const notice = {
// Original L878: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceId: ticket.raceId,
// Original L879: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceType: legacy ? null : raceType,
// Original L880: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        runnerId: ticket.runnerId,
// Original L881: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        winnerId,
// Original L882: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        stake: ticket.stake,
// Original L883: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        payout,
// Original L884: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        won
// Original L885: Closes the current block or module.
      };
// Original L886: Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.
      this.ticket = null;
// Original L887: Sets `this.raceResultNotice` (the race result notice property of this) to `notice` (notice).
      this.raceResultNotice = notice;
// Original L888: Deducts the stake at placement or credits a winning return at settlement.
      if (payout > 0) this.hub.balance = this.roundMoney(this.hub.balance + payout);
// Original L889: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalProfiles?.saveCurrent({
// Original L890: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        player: this.hub.player.toProfile(),
// Original L891: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceBet: null,
// Original L892: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        raceResultNotice: notice
// Original L893: Closes the current block or module.
      });
// Original L894: Records the result for accomplishments.
      window.Accomplishments?.recordRace?.(notice);
// Original L895: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.hub.updateGlobalUI();
// Original L896: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      window.LocalSave?.queueFileSave();
// Original L897: Stores settled stake, payout, and line summary; free-spin stake is zero.
      this.lastResultText = this.formatRaceResult(notice);
// Original L898: Guards the following action so it runs only when the condition is true.
      if (won) {
// Original L899: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playWinSound();
// Original L900: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.spawnConfetti(55);
// Original L901: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      } else {
// Original L902: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
        this.fx?.playClick();
// Original L903: Closes the current block or module.
      }
// Original L904: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
      this.renderRaceResultNotice();
// Original L905: Recomputes phase, preview, track, controls, and due-ticket settlement.
      this.update();
// Original L906: Closes the current block or module.
    }
// Original L907: Closes the current block or module.
  }
// Original L908: Blank line separates related code sections.

// Original L909: Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.
  window.RaceEngine = RaceEngine;
// Original L910: Closes the current block or module.
})();
