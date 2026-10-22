# src/js/race-engine.js

[Exact copy](../../../original/src/js/race-engine.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/*
```

Comment documents how this part supports the virtual casino engine.

### Line 2

```text
 * Deterministic, browser-only racing: seeded schedules make previews, results, and unsettled tickets reproducible
```

Comment documents how this part supports the virtual casino engine.

### Line 3

```text
 * after refresh; the encrypted active profile stores runner experience and pending outcomes.
```

Comment documents how this part supports the virtual casino engine.

### Line 4

```text
 */
```

Comment documents how this part supports the virtual casino engine.

### Line 5

```text
/* Local-only horse and car racing circuits for the virtual-chip casino. */
```

Comment documents how this part supports the virtual casino engine.

### Line 6

```text
(function installRaceEngine() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 7

```text
  // Race slots use the browser's local time: 7 AM through 9 PM, alternating circuits hourly.
```

Comment documents how this part supports the virtual casino engine.

### Line 8

```text
  // Keep the former two-hour seed bucket so saved tickets reproduce their original races.
```

Comment documents how this part supports the virtual casino engine.

### Line 9

```text
  const RACE_SEED_INTERVAL_MS = 2 * 60 * 60 * 1000;
```

Legacy two-hour seed bucket keeps saved race tickets reproducible.

### Line 10

```text
  const RACE_HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 11

```text
  const RACES_PER_DAY = RACE_HOURS.length;
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 12

```text
  const RACE_PREVIEW_OPEN_MS = 45 * 60 * 1000;
```

Opens preview and controls 45 minutes before start.

### Line 13

```text
  const BETTING_CUTOFF_MS = 5 * 60 * 1000;
```

Closes betting five minutes before start.

### Line 14

```text
  const MIN_RACE_DURATION_SECONDS = 110;
```

Shortest simulated race is 110 seconds.

### Line 15

```text
  const MAX_RACE_DURATION_SECONDS = 200;
```

Longest simulated race is 200 seconds.

### Line 16

```text
  const RESULT_DISPLAY_MS = 120_000;
```

Shows a finished result for 120 seconds.

### Line 17

```text
  const BET_STEP = 5;
```

Race wagers change in five-chip steps.

### Line 18

```text
  const CENTS = 100;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 19

```text
  const HORSE_FIELD_SIZE = 6;
```

Horse fields contain six entrants.

### Line 20

```text
  const CAR_FIELD_SIZE = 8;
```

Car fields contain eight entrants.

### Line 21

```text
  const MAX_EXPERIENCE_BOOST = 0.22;
```

Prior starts can raise ability by at most 22%.

### Line 22

```text

```

Blank line separates related code sections.

### Line 23

```text
  // Each stable keeps an identity across races so its experience and record persist.
```

Comment documents how this part supports the virtual casino engine.

### Line 24

```text
  const MASTER_HORSES = [
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 25

```text
    { id: 'horse-copper-comet', name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 26

```text
    { id: 'horse-velvet-thunder', name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 27

```text
    { id: 'horse-lucky-lantern', name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 28

```text
    { id: 'horse-midnight-marigold', name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 29

```text
    { id: 'horse-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 30

```text
    { id: 'horse-golden-gallop', name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 31

```text
    { id: 'horse-thunder-spirit', name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 32

```text
    { id: 'horse-midnight-dash', name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 33

```text
    { id: 'horse-silver-blaze', name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 34

```text
    { id: 'horse-galloping-ghost', name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 35

```text
    { id: 'horse-copper-penny', name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 36

```text
    { id: 'horse-shadow-runner', name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 37

```text
    { id: 'horse-out-of-this-world', name: 'Out of This World', silks: '👽', lane: '#2e50d5' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 38

```text
    { id: 'horse-bombs-away', name: 'Bombs Away', silks: '💣', lane: '#44a3d3' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 39

```text
    { id: 'horse-velvet-rocket', name: 'Velvet Rocket', silks: '🚀', lane: '#8e44ad' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 40

```text
    { id: 'horse-wildflower', name: 'Wildflower', silks: '🌼', lane: '#f39c12' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 41

```text
    { id: 'horse-iron-hoof', name: 'Iron Hoof', silks: '🧲', lane: '#7f8c8d' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 42

```text
    { id: 'horse-storm-chaser', name: 'Storm Chaser', silks: '🌩️', lane: '#2980b9' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 43

```text
    { id: 'horse-peppermint', name: 'Peppermint', silks: '🍬', lane: '#16a085' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 44

```text
    { id: 'horse-starling', name: 'Starling', silks: '⭐', lane: '#c0392b' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 45

```text
    { id: 'horse-quiet-thunder', name: 'Quiet Thunder', silks: '🐎', lane: '#6c5ce7' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 46

```text
    { id: 'horse-ember-trail', name: 'Ember Trail', silks: '🔥', lane: '#d35400' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 47

```text
    { id: 'horse-sunrise-sprint', name: 'Sunrise Sprint', silks: '🌅', lane: '#e84393' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 48

```text
    { id: 'horse-blue-comet', name: 'Blue Comet', silks: '☄️', lane: '#0984e3' }
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 49

```text
  ];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 50

```text

```

Blank line separates related code sections.

### Line 51

```text
  const MASTER_CARS = [
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 52

```text
    { id: 'car-neon-viper', name: 'Neon Viper', silks: '🏎️', lane: '#e74c3c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 53

```text
    { id: 'car-midnight-rally', name: 'Midnight Rally', silks: '🚗', lane: '#34495e' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 54

```text
    { id: 'car-golden-apex', name: 'Golden Apex', silks: '🏁', lane: '#f1c40f' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 55

```text
    { id: 'car-turbo-tiger', name: 'Turbo Tiger', silks: '🐯', lane: '#e67e22' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 56

```text
    { id: 'car-electric-comet', name: 'Electric Comet', silks: '⚡', lane: '#3498db' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 57

```text
    { id: 'car-velvet-gt', name: 'Velvet GT', silks: '🟣', lane: '#9b59b6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 58

```text
    { id: 'car-green-machine', name: 'Green Machine', silks: '🟢', lane: '#2ecc71' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 59

```text
    { id: 'car-silver-streak', name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 60

```text
    { id: 'car-rocket-88', name: 'Rocket 88', silks: '🚀', lane: '#8e44ad' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 61

```text
    { id: 'car-drift-king', name: 'Drift King', silks: '🛞', lane: '#16a085' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 62

```text
    { id: 'car-blue-lightning', name: 'Blue Lightning', silks: '🌩️', lane: '#2980b9' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 63

```text
    { id: 'car-ruby-racer', name: 'Ruby Racer', silks: '🏎️', lane: '#c0392b' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 64

```text
    { id: 'car-desert-fox', name: 'Desert Fox', silks: '🦊', lane: '#d35400' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 65

```text
    { id: 'car-lime-machine', name: 'Lime Machine', silks: '🍋', lane: '#27ae60' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 66

```text
    { id: 'car-night-owl', name: 'Night Owl', silks: '🦉', lane: '#6c5ce7' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 67

```text
    { id: 'car-pink-nitro', name: 'Pink Nitro', silks: '💨', lane: '#e84393' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 68

```text
    { id: 'car-ironclad', name: 'Ironclad', silks: '🛡️', lane: '#7f8c8d' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 69

```text
    { id: 'car-sunrise-coupe', name: 'Sunrise Coupe', silks: '🌅', lane: '#f39c12' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 70

```text
    { id: 'car-copperhead', name: 'Copperhead', silks: '🐍', lane: '#d35400' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 71

```text
    { id: 'car-starlight', name: 'Starlight', silks: '✨', lane: '#95a5a6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 72

```text
    { id: 'car-rapid-rabbit', name: 'Rapid Rabbit', silks: '🐇', lane: '#1abc9c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 73

```text
    { id: 'car-blackout', name: 'Blackout', silks: '🌑', lane: '#2c3e50' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 74

```text
    { id: 'car-apricot-flash', name: 'Apricot Flash', silks: '🍑', lane: '#e17055' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 75

```text
    { id: 'car-polar-star', name: 'Polar Star', silks: '❄️', lane: '#00cec9' }
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 76

```text
  ];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 77

```text

```

Blank line separates related code sections.

### Line 78

```text
  // Kept only so old horse tickets/result notices still make sense after this update.
```

Comment documents how this part supports the virtual casino engine.

### Line 79

```text
  const LEGACY_HORSES = [
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 80

```text
    { name: 'Copper Comet', silks: '🟠', lane: '#e67e22' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 81

```text
    { name: 'Velvet Thunder', silks: '🟣', lane: '#9b59b6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 82

```text
    { name: 'Lucky Lantern', silks: '🟡', lane: '#f1c40f' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 83

```text
    { name: 'Midnight Marigold', silks: '🔵', lane: '#3498db' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 84

```text
    { name: 'Silver Streak', silks: '⚪', lane: '#bdc3c7' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 85

```text
    { name: 'Golden Gallop', silks: '🟢', lane: '#2ecc71' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 86

```text
    { name: 'Thunder Spirit', silks: '⚡', lane: '#e74c3c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 87

```text
    { name: 'Midnight Dash', silks: '🌙', lane: '#34495e' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 88

```text
    { name: 'Silver Blaze', silks: '✨', lane: '#95a5a6' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 89

```text
    { name: 'Galloping Ghost', silks: '👻', lane: '#1abc9c' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 90

```text
    { name: 'Copper Penny', silks: '🪙', lane: '#d35400' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 91

```text
    { name: 'Shadow Runner', silks: '👤', lane: '#2c3e50' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 92

```text
    { name: 'Out of this World', silks: '👽', lane: '#2e50d5' },
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 93

```text
    { name: 'Bombs Away', silks: '💣', lane: '#44a3d3' }
```

Catalog record supplies stable identity and display metadata used by the UI.

### Line 94

```text
  ];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 95

```text

```

Blank line separates related code sections.

### Line 96

```text
  /** Controls local race timing, generated fields, animation, betting, tickets, and between-session settlement. */
```

Comment documents how this part supports the virtual casino engine.

### Line 97

```text
  class RaceEngine {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 98

```text
    constructor(hub, { fx, jackpot, xp } = {}) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 99

```text
      this.hub = hub;
```

Sets `this.hub` (the hub property of this) to `hub` (hub).

### Line 100

```text
      this.fx = fx;
```

Sets `this.fx` (the fx property of this) to `fx` (fx).

### Line 101

```text
      this.jackpot = jackpot;
```

Sets `this.jackpot` (the jackpot property of this) to `jackpot` (jackpot).

### Line 102

```text
      this.xp = xp;
```

Sets `this.xp` (the xp property of this) to `xp` (xp).

### Line 103

```text
      this.bet = 10;
```

Sets `this.bet` (the bet property of this) to 10.

### Line 104

```text
      this.raceType = 'horse';
```

Sets `this.raceType` (the race type property of this) to "horse".

### Line 105

```text
      this.selectedHorseId = null;
```

Sets `this.selectedHorseId` (the selected horse id property of this) to null.

### Line 106

```text
      this.targetRaceId = null;
```

Sets `this.targetRaceId` (the target race id property of this) to null.

### Line 107

```text
      this.trackRaceId = null;
```

Sets `this.trackRaceId` (the track race id property of this) to null.

### Line 108

```text
      this.trackRaceType = null;
```

Sets `this.trackRaceType` (the track race type property of this) to null.

### Line 109

```text
      this.ticket = null;
```

Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.

### Line 110

```text
      this.raceResultNotice = null;
```

Sets `this.raceResultNotice` (the race result notice property of this) to null.

### Line 111

```text
      this.lastResultText = '';
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 112

```text
      this.isRaceInProgress = false;
```

Sets `this.isRaceInProgress` (the is race in progress property of this) to false.

### Line 113

```text
      this.isResultDisplay = false;
```

Sets `this.isResultDisplay` (the is result display property of this) to false.

### Line 114

```text
      this.isRacePreviewOpen = false;
```

Sets `this.isRacePreviewOpen` (the is race preview open property of this) to false.

### Line 115

```text
      this.isBettingOpen = false;
```

Sets `this.isBettingOpen` (the is betting open property of this) to false.

### Line 116

```text
      this.experience = this.loadExperience();
```

Sets `this.experience` (the experience property of this) to calls `this.loadExperience` with no arguments.

### Line 117

```text

```

Blank line separates related code sections.

### Line 118

```text
      this.bindElements();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 119

```text
      this.bindEvents();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 120

```text
      this.loadProfileTicket();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 121

```text
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
```

Guards the following action so it runs only when the condition is true.

### Line 122

```text
      this.initializeExperience(Date.now());
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 123

```text
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 124

```text
      this.update();
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 125

```text

```

Blank line separates related code sections.

### Line 126

```text
      // The race clock and experience records are local to this browser; no live feed or paid service is used.
```

Comment documents how this part supports the virtual casino engine.

### Line 127

```text
      window.setInterval(() => this.update(), 250);
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 128

```text
    }
```

Closes the current block or module.

### Line 129

```text

```

Blank line separates related code sections.

### Line 130

```text
    bindElements() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 131

```text
      this.statusEl = document.getElementById('race-status');
```

Looks up the named race display/control element so later updates can change it.

### Line 132

```text
      this.raceTitleEl = document.getElementById('race-title');
```

Looks up the named race display/control element so later updates can change it.

### Line 133

```text
      this.raceNumberEl = document.getElementById('race-number');
```

Looks up the named race display/control element so later updates can change it.

### Line 134

```text
      this.phaseEl = document.getElementById('race-phase-label');
```

Looks up the named race display/control element so later updates can change it.

### Line 135

```text
      this.countdownEl = document.getElementById('race-countdown');
```

Looks up the named race display/control element so later updates can change it.

### Line 136

```text
      this.startTimeEl = document.getElementById('race-start-time');
```

Looks up the named race display/control element so later updates can change it.

### Line 137

```text
      this.raceDurationEl = document.getElementById('race-duration');
```

Looks up the named race display/control element so later updates can change it.

### Line 138

```text
      this.trackCaptionEl = document.getElementById('race-track-caption');
```

Looks up the named race display/control element so later updates can change it.

### Line 139

```text
      this.trackEl = document.getElementById('race-track');
```

Looks up the named race display/control element so later updates can change it.

### Line 140

```text
      this.targetTextEl = document.getElementById('race-target-text');
```

Looks up the named race display/control element so later updates can change it.

### Line 141

```text
      this.runnerListEl = document.getElementById('race-runner-list');
```

Looks up the named race display/control element so later updates can change it.

### Line 142

```text
      this.betDisplayEl = document.getElementById('race-bet-display');
```

Looks up the named race display/control element so later updates can change it.

### Line 143

```text
      this.estimatedReturnEl = document.getElementById('race-estimated-return');
```

Looks up the named race display/control element so later updates can change it.

### Line 144

```text
      this.ticketNoteEl = document.getElementById('race-ticket-note');
```

Looks up the named race display/control element so later updates can change it.

### Line 145

```text
      this.minusBtn = document.getElementById('btn-race-minus');
```

Looks up the named race display/control element so later updates can change it.

### Line 146

```text
      this.plusBtn = document.getElementById('btn-race-plus');
```

Looks up the named race display/control element so later updates can change it.

### Line 147

```text
      this.maxBtn = document.getElementById('btn-race-max');
```

Looks up the named race display/control element so later updates can change it.

### Line 148

```text
      this.clearBtn = document.getElementById('btn-race-clear');
```

Looks up the named race display/control element so later updates can change it.

### Line 149

```text
      this.placeBtn = document.getElementById('btn-race-bet');
```

Looks up the named race display/control element so later updates can change it.

### Line 150

```text
      this.resultNoticeEl = document.getElementById('race-result-notice');
```

Looks up the named race display/control element so later updates can change it.

### Line 151

```text
      this.resultNoticeTextEl = document.getElementById('race-result-notice-text');
```

Looks up the named race display/control element so later updates can change it.

### Line 152

```text
      this.viewResultsBtn = document.getElementById('btn-view-race-results');
```

Looks up the named race display/control element so later updates can change it.

### Line 153

```text
      this.dismissResultBtn = document.getElementById('btn-dismiss-race-result');
```

Looks up the named race display/control element so later updates can change it.

### Line 154

```text
      this.modeButtons = [...document.querySelectorAll('[data-race-type]')];
```

Finds the relevant race control or runner nodes in the DOM.

### Line 155

```text
    }
```

Closes the current block or module.

### Line 156

```text

```

Blank line separates related code sections.

### Line 157

```text
    bindEvents() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 158

```text
      this.minusBtn?.addEventListener('click', () => {
```

Connects a user action to the matching betting, selection, or result handler.

### Line 159

```text
        if (!this.canBetNow()) return;
```

Guards the following action so it runs only when the condition is true.

### Line 160

```text
        this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 161

```text
        this.bet = Math.max(BET_STEP, this.roundMoney(this.bet - BET_STEP));
```

Race wagers change in five-chip steps.

### Line 162

```text
        this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 163

```text
      });
```

Closes the current block or module.

### Line 164

```text
      this.plusBtn?.addEventListener('click', () => {
```

Connects a user action to the matching betting, selection, or result handler.

### Line 165

```text
        if (!this.canBetNow()) return;
```

Guards the following action so it runs only when the condition is true.

### Line 166

```text
        this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 167

```text
        this.bet = Math.min(this.maxStake(), this.roundMoney(this.bet + BET_STEP));
```

Race wagers change in five-chip steps.

### Line 168

```text
        this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 169

```text
      });
```

Closes the current block or module.

### Line 170

```text
      this.maxBtn?.addEventListener('click', () => {
```

Connects a user action to the matching betting, selection, or result handler.

### Line 171

```text
        if (!this.canBetNow()) return;
```

Guards the following action so it runs only when the condition is true.

### Line 172

```text
        this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 173

```text
        const maximum = this.maxStake();
```

Caps a wager at both wallet balance and player maxBet.

### Line 174

```text
        this.bet = maximum;
```

Sets `this.bet` (the bet property of this) to `maximum` (maximum).

### Line 175

```text
        this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 176

```text
      });
```

Closes the current block or module.

### Line 177

```text
      this.clearBtn?.addEventListener('click', () => {
```

Connects a user action to the matching betting, selection, or result handler.

### Line 178

```text
        if (!this.canBetNow()) return;
```

Guards the following action so it runs only when the condition is true.

### Line 179

```text
        this.bet = 0;
```

Sets `this.bet` (the bet property of this) to 0.

### Line 180

```text
        this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 181

```text
      });
```

Closes the current block or module.

### Line 182

```text
      this.placeBtn?.addEventListener('click', () => this.placeBet());
```

Validates and records one ticket, deducting its stake once.

### Line 183

```text
      this.viewResultsBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(true));
```

Connects a user action to the matching betting, selection, or result handler.

### Line 184

```text
      this.dismissResultBtn?.addEventListener('click', () => this.acknowledgeRaceNotice(false));
```

Connects a user action to the matching betting, selection, or result handler.

### Line 185

```text
      this.runnerListEl?.addEventListener('click', event => {
```

Connects a user action to the matching betting, selection, or result handler.

### Line 186

```text
        const option = event.target.closest('[data-runner-id]');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 187

```text
        if (!option || option.disabled || !this.canBetNow()) return;
```

Guards the following action so it runs only when the condition is true.

### Line 188

```text
        this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 189

```text
        this.selectedHorseId = option.dataset.runnerId;
```

Sets `this.selectedHorseId` (the selected horse id property of this) to `option.dataset.runnerId` (the runner id property of option.dataset).

### Line 190

```text
        this.updateRunnerSelection();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 191

```text
        this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 192

```text
      });
```

Closes the current block or module.

### Line 193

```text
    }
```

Closes the current block or module.

### Line 194

```text

```

Blank line separates related code sections.

### Line 195

```text
    loadProfileTicket() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 196

```text
      const save = window.LocalProfiles?.getCurrentSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 197

```text
      this.ticket = save?.raceBet || null;
```

Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.

### Line 198

```text
      this.raceResultNotice = save?.raceResultNotice || null;
```

Sets `this.raceResultNotice` (the race result notice property of this) to uses `save?.raceResultNotice` (the race result notice property of save); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to null.

### Line 199

```text
    }
```

Closes the current block or module.

### Line 200

```text

```

Blank line separates related code sections.

### Line 201

```text
    loadExperience() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 202

```text
      const save = window.LocalProfiles?.getCurrentSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 203

```text
      return save?.raceExperience && typeof save.raceExperience === 'object'
```

Returns checks uses checks that gets the JavaScript type name of `save.raceExperience` (the race experience property of save) and "object" have the same value and type only if `save?.raceExperience` (the race experience property of save); optional chaining stops with undefined if a guarded receiver is null or undefined is truthy; otherwise keeps the falsy first value; if true chooses `save.raceExperience` (the race experience property of save), otherwise an object with fields horse: null; car: null to the caller and exits this function.

### Line 204

```text
        ? save.raceExperience
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 205

```text
        : { horse: null, car: null };
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 206

```text
    }
```

Closes the current block or module.

### Line 207

```text

```

Blank line separates related code sections.

### Line 208

```text
    initializeExperience(now) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 209

```text
      const firstCursor = this.getScheduledRaceAtOrBefore(now - MAX_RACE_DURATION_SECONDS * 1000) || 0;
```

Longest simulated race is 200 seconds.

### Line 210

```text
      for (const type of ['horse', 'car']) {
```

Repeats the operation for the relevant entries.

### Line 211

```text
        if (!this.experience[type] || typeof this.experience[type] !== 'object') {
```

Guards the following action so it runs only when the condition is true.

### Line 212

```text
          this.experience[type] = { lastProcessedRaceId: firstCursor, runners: {} };
```

Sets the entry at index/key `type` (type) in `this.experience` (the experience property of this) to an object with fields lastProcessedRaceId: `firstCursor` (first cursor); runners: an object with fields .

### Line 213

```text
        } else {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 214

```text
          this.experience[type].runners ||= {};
```

Updates `this.experience[type].runners` (the runners property of this.experience[type]) using an object with fields .

### Line 215

```text
          if (!Number.isSafeInteger(this.experience[type].lastProcessedRaceId)) {
```

Guards the following action so it runs only when the condition is true.

### Line 216

```text
            this.experience[type].lastProcessedRaceId = firstCursor;
```

Sets `this.experience[type].lastProcessedRaceId` (the last processed race id property of this.experience[type]) to `firstCursor` (first cursor).

### Line 217

```text
          }
```

Closes the current block or module.

### Line 218

```text
        }
```

Closes the current block or module.

### Line 219

```text
      }
```

Closes the current block or module.

### Line 220

```text
    }
```

Closes the current block or module.

### Line 221

```text

```

Blank line separates related code sections.

### Line 222

```text
    resetForActiveProfile() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 223

```text
      this.bet = 10;
```

Sets `this.bet` (the bet property of this) to 10.

### Line 224

```text
      this.selectedHorseId = null;
```

Sets `this.selectedHorseId` (the selected horse id property of this) to null.

### Line 225

```text
      this.targetRaceId = null;
```

Sets `this.targetRaceId` (the target race id property of this) to null.

### Line 226

```text
      this.trackRaceId = null;
```

Sets `this.trackRaceId` (the track race id property of this) to null.

### Line 227

```text
      this.trackRaceType = null;
```

Sets `this.trackRaceType` (the track race type property of this) to null.

### Line 228

```text
      this.experience = this.loadExperience();
```

Sets `this.experience` (the experience property of this) to calls `this.loadExperience` with no arguments.

### Line 229

```text
      this.loadProfileTicket();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 230

```text
      if (this.ticket) this.raceType = this.ticket.raceType === 'car' ? 'car' : 'horse';
```

Guards the following action so it runs only when the condition is true.

### Line 231

```text
      this.initializeExperience(Date.now());
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 232

```text
      this.lastResultText = this.raceResultNotice ? this.formatRaceResult(this.raceResultNotice) : '';
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 233

```text
      this.update();
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 234

```text
    }
```

Closes the current block or module.

### Line 235

```text

```

Blank line separates related code sections.

### Line 236

```text
    hasPendingTicket() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 237

```text
      return Boolean(this.ticket);
```

Returns converts `this.ticket` (the ticket property of this) to true or false according to truthiness to the caller and exits this function.

### Line 238

```text
    }
```

Closes the current block or module.

### Line 239

```text

```

Blank line separates related code sections.

### Line 240

```text
    roundMoney(value) {
```

Rounds chip money to cents before display or settlement.

### Line 241

```text
      return Math.round(Number(value) * CENTS) / CENTS;
```

Returns divides rounds multiplies converts `value` (value) to a number (invalid numeric text becomes NaN) by `CENTS` (cents) to the nearest whole number by `CENTS` (cents) to the caller and exits this function.

### Line 242

```text
    }
```

Closes the current block or module.

### Line 243

```text

```

Blank line separates related code sections.

### Line 244

```text
    maxStake() {
```

Caps a wager at both wallet balance and player maxBet.

### Line 245

```text
      return Math.max(0, this.roundMoney(Math.min(this.hub.balance, this.hub.player.maxBet)));
```

Returns chooses the largest of 0, calls `this.roundMoney` with chooses the smallest of `this.hub.balance` (the balance property of this.hub), `this.hub.player.maxBet` (the max bet property of this.hub.player) to the caller and exits this function.

### Line 246

```text
    }
```

Closes the current block or module.

### Line 247

```text

```

Blank line separates related code sections.

### Line 248

```text
    getMaster(type = this.raceType) {
```

Stores this race engine state for later timing, rendering, or settlement decisions.

### Line 249

```text
      return type === 'car' ? MASTER_CARS : MASTER_HORSES;
```

Returns checks checks that `type` (type) and "car" have the same value and type; if true chooses `MASTER_CARS` (master cars), otherwise `MASTER_HORSES` (master horses) to the caller and exits this function.

### Line 250

```text
    }
```

Closes the current block or module.

### Line 251

```text

```

Blank line separates related code sections.

### Line 252

```text
    getRunnerStats(type, runnerId) {
```

Reads safe integer starts and wins for a persistent runner.

### Line 253

```text
      const stats = this.experience?.[type]?.runners?.[runnerId] || {};
```

Uses the entry at index/key `runnerId` (runner id) in `this.experience?.[type]?.runners` (the runners property of this.experience?.[type]); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to an object with fields ; stores the result in `stats`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 254

```text
      return {
```

Returns an object with fields starts: checks uses checks whether `stats.starts` (the starts property of stats) is greater than 0 only if calls `Number.isSafeInteger` with `stats.starts` (the starts property of stats) is truthy; otherwise keeps the falsy first value; if true chooses `stats.starts` (the starts property of stats), otherwise 0; wins: checks uses checks whether `stats.wins` (the wins property of stats) is greater than 0 only if calls `Number.isSafeInteger` with `stats.wins` (the wins property of stats) is truthy; otherwise keeps the falsy first value; if true chooses `stats.wins` (the wins property of stats), otherwise 0 to the caller and exits this function.

### Line 255

```text
        starts: Number.isSafeInteger(stats.starts) && stats.starts > 0 ? stats.starts : 0,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 256

```text
        wins: Number.isSafeInteger(stats.wins) && stats.wins > 0 ? stats.wins : 0
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 257

```text
      };
```

Closes the current block or module.

### Line 258

```text
    }
```

Closes the current block or module.

### Line 259

```text

```

Blank line separates related code sections.

### Line 260

```text
    // Race slots are created in local time, so the quiet overnight window follows the user's device clock.
```

Comment documents how this part supports the virtual casino engine.

### Line 261

```text
    // Use the device calendar and timezone so daytime race times match the player clock.
```

Comment documents how this part supports the virtual casino engine.

### Line 262

```text
    getScheduledRaceAtOrBefore(timestamp) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 263

```text
      const instant = new Date(timestamp);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 264

```text
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
```

Repeats the operation for the relevant entries.

### Line 265

```text
        const date = new Date(instant);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 266

```text
        date.setHours(0, 0, 0, 0);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 267

```text
        date.setDate(date.getDate() - dayOffset);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 268

```text
        for (let index = RACE_HOURS.length - 1; index >= 0; index -= 1) {
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 269

```text
          const slot = new Date(date);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 270

```text
          slot.setHours(RACE_HOURS[index], 0, 0, 0);
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 271

```text
          if (slot.getTime() <= timestamp) return slot.getTime();
```

Guards the following action so it runs only when the condition is true.

### Line 272

```text
        }
```

Closes the current block or module.

### Line 273

```text
      }
```

Closes the current block or module.

### Line 274

```text
      return null;
```

Returns null to the caller and exits this function.

### Line 275

```text
    }
```

Closes the current block or module.

### Line 276

```text

```

Blank line separates related code sections.

### Line 277

```text
    // Scan local calendar hours instead of adding fixed 24-hour blocks, which can fail across daylight-saving changes.
```

Comment documents how this part supports the virtual casino engine.

### Line 278

```text
    getNextRaceStart(timestamp) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 279

```text
      const instant = new Date(timestamp);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 280

```text
      for (let dayOffset = 0; dayOffset <= 2; dayOffset += 1) {
```

Repeats the operation for the relevant entries.

### Line 281

```text
        const date = new Date(instant);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 282

```text
        date.setHours(0, 0, 0, 0);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 283

```text
        date.setDate(date.getDate() + dayOffset);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 284

```text
        for (const hour of RACE_HOURS) {
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 285

```text
          const slot = new Date(date);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 286

```text
          slot.setHours(hour, 0, 0, 0);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 287

```text
          if (slot.getTime() > timestamp) return slot.getTime();
```

Guards the following action so it runs only when the condition is true.

### Line 288

```text
        }
```

Closes the current block or module.

### Line 289

```text
      }
```

Closes the current block or module.

### Line 290

```text
      return null;
```

Returns null to the caller and exits this function.

### Line 291

```text
    }
```

Closes the current block or module.

### Line 292

```text

```

Blank line separates related code sections.

### Line 293

```text
    getScheduledRaceType(eventId) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 294

```text
      const slotIndex = RACE_HOURS.indexOf(new Date(eventId).getHours());
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 295

```text
      return slotIndex >= 0 && slotIndex % 2 === 1 ? 'car' : 'horse';
```

Returns checks uses checks that takes the remainder of `slotIndex` (slot index) divided by 2 and 1 have the same value and type only if checks whether `slotIndex` (slot index) is at least 0 is truthy; otherwise keeps the falsy first value; if true chooses "car", otherwise "horse" to the caller and exits this function.

### Line 296

```text
    }
```

Closes the current block or module.

### Line 297

```text

```

Blank line separates related code sections.

### Line 298

```text
    getRaceNumber(eventId) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 299

```text
      const date = new Date(eventId);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 300

```text
      const dateUtc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 301

```text
      const yearStartUtc = Date.UTC(date.getFullYear(), 0, 1);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 302

```text
      const dayOfYear = Math.floor((dateUtc - yearStartUtc) / 86_400_000);
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 303

```text
      const slotIndex = Math.max(0, RACE_HOURS.indexOf(date.getHours()));
```

Allowed local start hours: 7 AM through 9 PM, giving 15 races daily.

### Line 304

```text
      return dayOfYear * RACES_PER_DAY + slotIndex + 1;
```

Number of daily race slots used in race numbering.

### Line 305

```text
    }
```

Closes the current block or module.

### Line 306

```text

```

Blank line separates related code sections.

### Line 307

```text
    isBettingOpenFor(raceId, now) {
```

True only during the 45-minute-to-5-minute-before-start window.

### Line 308

```text
      return now >= raceId - RACE_PREVIEW_OPEN_MS && now < raceId - BETTING_CUTOFF_MS;
```

Opens preview and controls 45 minutes before start.

### Line 309

```text
    }
```

Closes the current block or module.

### Line 310

```text

```

Blank line separates related code sections.

### Line 311

```text
    isRacePreviewOpenFor(raceId, now) {
```

True from 45 minutes before start onward.

### Line 312

```text
      return now >= raceId - RACE_PREVIEW_OPEN_MS;
```

Opens preview and controls 45 minutes before start.

### Line 313

```text
    }
```

Closes the current block or module.

### Line 314

```text

```

Blank line separates related code sections.

### Line 315

```text
    getNextBettingOpen(timestamp) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 316

```text
      const nextRaceId = this.getNextRaceStart(timestamp);
```

Calls `this.getNextRaceStart` with `timestamp` (timestamp); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 317

```text
      return nextRaceId ? nextRaceId - RACE_PREVIEW_OPEN_MS : null;
```

Opens preview and controls 45 minutes before start.

### Line 318

```text
    }
```

Closes the current block or module.

### Line 319

```text

```

Blank line separates related code sections.

### Line 320

```text
    canBetNow(now = Date.now()) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 321

```text
      if (this.ticket) return false;
```

Guards the following action so it runs only when the condition is true.

### Line 322

```text
      const nextRaceId = this.getNextRaceStart(now);
```

Calls `this.getNextRaceStart` with `now` (now); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 323

```text
      return Boolean(nextRaceId && this.isBettingOpenFor(nextRaceId, now));
```

True only during the 45-minute-to-5-minute-before-start window.

### Line 324

```text
    }
```

Closes the current block or module.

### Line 325

```text

```

Blank line separates related code sections.

### Line 326

```text
    // Seed each event and race type so refreshes and profile reloads reproduce the same field and outcome.
```

Comment documents how this part supports the virtual casino engine.

### Line 327

```text
    // This small seeded PRNG provides repeatability, not cryptographic security; outcomes are virtual local simulations.
```

Comment documents how this part supports the virtual casino engine.

### Line 328

```text
    makeRandom(eventId, type = this.raceType, stream = 0) {
```

Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.

### Line 329

```text
      const typeSeed = type === 'car' ? 0x5bd1e995 : 0x27d4eb2f;
```

Separates horse and car random streams.

### Line 330

```text
      let state = (Math.floor(eventId / RACE_SEED_INTERVAL_MS) * 2_654_435_761 + 1_013_904_223 + typeSeed + stream) >>> 0;
```

Legacy two-hour seed bucket keeps saved race tickets reproducible.

### Line 331

```text
      return () => {
```

Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.

### Line 332

```text
        state = (state + 0x6D2B79F5) >>> 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 333

```text
        let value = state;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 334

```text
        value = Math.imul(value ^ (value >>> 15), value | 1);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 335

```text
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 336

```text
        return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
```

Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.

### Line 337

```text
      };
```

Closes the current block or module.

### Line 338

```text
    }
```

Closes the current block or module.

### Line 339

```text

```

Blank line separates related code sections.

### Line 340

```text
    // Stable inputs derive entrants, odds, duration, and winner so a refresh cannot reroll an offered event.
```

Comment documents how this part supports the virtual casino engine.

### Line 341

```text
    createRace(eventId, type = this.getScheduledRaceType(eventId)) {
```

Builds duration, entrants, odds, weighted winner, and animation order.

### Line 342

```text
      const random = this.makeRandom(eventId, type);
```

Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.

### Line 343

```text
      const durationRandom = this.makeRandom(eventId, type, 0x9e3779b9);
```

Creates deterministic, non-cryptographic random numbers keyed by event/type/stream.

### Line 344

```text
      const durationSeconds = MIN_RACE_DURATION_SECONDS + Math.floor(
```

Shortest simulated race is 110 seconds.

### Line 345

```text
        durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1)
```

Shortest simulated race is 110 seconds.

### Line 346

```text
      );
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 347

```text
      const master = [...this.getMaster(type)];
```

An array containing the expanded entries/properties from calls `this.getMaster` with `type` (type); stores the result in `master`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 348

```text
      for (let i = master.length - 1; i > 0; i -= 1) {
```

Fisher-Yates shuffles the roster with the seeded stream.

### Line 349

```text
        const j = Math.floor(random() * (i + 1));
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 350

```text
        [master[i], master[j]] = [master[j], master[i]];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 351

```text
      }
```

Closes the current block or module.

### Line 352

```text

```

Blank line separates related code sections.

### Line 353

```text
      const fieldSize = type === 'car' ? CAR_FIELD_SIZE : HORSE_FIELD_SIZE;
```

Horse fields contain six entrants.

### Line 354

```text
      const entrants = master.slice(0, fieldSize).map((runner, index) => {
```

Selects six horses or eight cars.

### Line 355

```text
        const stats = this.getRunnerStats(type, runner.id);
```

Reads safe integer starts and wins for a persistent runner.

### Line 356

```text
        const experienceBoost = Math.min(MAX_EXPERIENCE_BOOST, stats.starts * 0.0033);
```

Prior starts can raise ability by at most 22%.

### Line 357

```text
        const form = (stats.wins + 1) / (stats.starts + 2);
```

Smoothed win form uses wins+1 over starts+2 so new runners do not have extreme estimates.

### Line 358

```text
        const formMultiplier = 0.9 + form * 0.2;
```

Maps form to a modest 0.9–1.1 ability multiplier.

### Line 359

```text
        const baseAbility = 0.88 + random() * 0.24;
```

Seeded base ability ranges from 0.88 to 1.12.

### Line 360

```text
        return {
```

Returns an object with fields copied from `runner` (runner); ability: multiplies multiplies `baseAbility` (base ability) by adds 1 and `experienceBoost` (experience boost) (or joins them if a value is text) by `formMultiplier` (form multiplier); finishFactor: adds 0.74 and multiplies calls `random` with no arguments by 0.2 (or joins them if a value is text); starts: `stats.starts` (the starts property of stats); wins: `stats.wins` (the wins property of stats); index: `index` (index) to the caller and exits this function.

### Line 361

```text
          ...runner,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 362

```text
          ability: baseAbility * (1 + experienceBoost) * formMultiplier,
```

Adds 0.33% ability per start, capped at 22%.

### Line 363

```text
          finishFactor: 0.74 + random() * 0.2,
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 364

```text
          starts: stats.starts,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 365

```text
          wins: stats.wins,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 366

```text
          index
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 367

```text
        };
```

Closes the current block or module.

### Line 368

```text
      });
```

Closes the current block or module.

### Line 369

```text

```

Blank line separates related code sections.

### Line 370

```text
      // Both prior starts and the win record influence current ability, odds, and simulated win chance.
```

Comment documents how this part supports the virtual casino engine.

### Line 371

```text
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
```

Raises ability to the eighth power, strongly weighting better runners.

### Line 372

```text
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
```

Sum of weights is the probability denominator.

### Line 373

```text
      entrants.forEach((runner, index) => {
```

Applies the enclosed update to every matching runner, DOM node, or saved record.

### Line 374

```text
        runner.winProbability = weights[index] / totalWeight;
```

Sum of weights is the probability denominator.

### Line 375

```text
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
```

Normalizes each weight into a win probability.

### Line 376

```text
      });
```

Closes the current block or module.

### Line 377

```text

```

Blank line separates related code sections.

### Line 378

```text
      let draw = random() * totalWeight;
```

Sum of weights is the probability denominator.

### Line 379

```text
      let winnerIndex = weights.findIndex(weight => {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 380

```text
        draw -= weight;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 381

```text
        return draw < 0;
```

Returns checks whether `draw` (draw) is less than 0 to the caller and exits this function.

### Line 382

```text
      });
```

Closes the current block or module.

### Line 383

```text
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;
```

Guards the following action so it runs only when the condition is true.

### Line 384

```text

```

Blank line separates related code sections.

### Line 385

```text
      // The on-screen sprint finishes in the same order as its seeded result.
```

Comment documents how this part supports the virtual casino engine.

### Line 386

```text
      const winner = entrants[winnerIndex];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 387

```text
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 388

```text
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 389

```text

```

Blank line separates related code sections.

### Line 390

```text
      return {
```

Returns an object with fields eventId: `eventId` (event id); number: calls `this.getRaceNumber` with `eventId` (event id); type: `type` (type); durationMs: multiplies `durationSeconds` (duration seconds) by 1000; entrants: `entrants` (entrants); winnerId: `entrants[winnerIndex].id` (the id property of entrants[winnerIndex]) to the caller and exits this function.

### Line 391

```text
        eventId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 392

```text
        number: this.getRaceNumber(eventId),
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 393

```text
        type,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 394

```text
        durationMs: durationSeconds * 1000,
```

Chooses an inclusive 110–200 second duration.

### Line 395

```text
        entrants,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 396

```text
        winnerId: entrants[winnerIndex].id
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 397

```text
      };
```

Closes the current block or module.

### Line 398

```text
    }
```

Closes the current block or module.

### Line 399

```text

```

Blank line separates related code sections.

### Line 400

```text
    // Re-create tickets from the previous 11-minute schedule only for old saved horse bets/notices.
```

Comment documents how this part supports the virtual casino engine.

### Line 401

```text
    // Preserve the old seed and runner IDs only to settle saved tickets created by the former schedule format.
```

Comment documents how this part supports the virtual casino engine.

### Line 402

```text
    createLegacyRace(eventId) {
```

Rebuilds old horse-ticket races using the former 11-minute seed format.

### Line 403

```text
      const oldInterval = 660_000;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 404

```text
      const random = () => {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 405

```text
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223) >>> 0;
```

Builds a repeatable unsigned 32-bit seed.

### Line 406

```text
        return () => {
```

Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.

### Line 407

```text
          state = (state + 0x6D2B79F5) >>> 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 408

```text
          let value = state;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 409

```text
          value = Math.imul(value ^ (value >>> 15), value | 1);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 410

```text
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 411

```text
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
```

Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.

### Line 412

```text
        };
```

Closes the current block or module.

### Line 413

```text
      };
```

Closes the current block or module.

### Line 414

```text
      const rand = random();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 415

```text
      const durationRandom = (() => {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 416

```text
        let state = (Math.floor(eventId / oldInterval) * 2_654_435_761 + 1_013_904_223 + 0x9e3779b9) >>> 0;
```

Builds a repeatable unsigned 32-bit seed.

### Line 417

```text
        return () => {
```

Returns a callback taking no parameters that runs its enclosed statements to the caller and exits this function.

### Line 418

```text
          state = (state + 0x6D2B79F5) >>> 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 419

```text
          let value = state;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 420

```text
          value = Math.imul(value ^ (value >>> 15), value | 1);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 421

```text
          value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
```

Performs repeatable 32-bit multiplication for PRNG mixing.

### Line 422

```text
          return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
```

Normalizes the mixed integer to a decimal from 0 inclusive to 1 exclusive.

### Line 423

```text
        };
```

Closes the current block or module.

### Line 424

```text
      })();
```

Closes the current block or module.

### Line 425

```text
      const durationMs = (MIN_RACE_DURATION_SECONDS + Math.floor(durationRandom() * (MAX_RACE_DURATION_SECONDS - MIN_RACE_DURATION_SECONDS + 1))) * 1000;
```

Shortest simulated race is 110 seconds.

### Line 426

```text
      const shuffled = [...LEGACY_HORSES];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 427

```text
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
```

Repeats the operation for the relevant entries.

### Line 428

```text
        const j = Math.floor(rand() * (i + 1));
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 429

```text
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 430

```text
      }
```

Closes the current block or module.

### Line 431

```text
      const entrants = shuffled.slice(0, 6).map((runner, index) => ({
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 432

```text
        ...runner,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 433

```text
        id: `horse-${index + 1}`,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 434

```text
        ability: 0.9 + rand() * 0.2,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 435

```text
        finishFactor: 0.74 + rand() * 0.2,
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 436

```text
        index
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 437

```text
      }));
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 438

```text
      const weights = entrants.map(runner => Math.pow(runner.ability, 8));
```

Raises ability to the eighth power, strongly weighting better runners.

### Line 439

```text
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
```

Sum of weights is the probability denominator.

### Line 440

```text
      entrants.forEach((runner, index) => {
```

Applies the enclosed update to every matching runner, DOM node, or saved record.

### Line 441

```text
        runner.winProbability = weights[index] / totalWeight;
```

Sum of weights is the probability denominator.

### Line 442

```text
        runner.odds = Math.max(1.2, Math.floor((0.92 / runner.winProbability) * 100) / 100);
```

Normalizes each weight into a win probability.

### Line 443

```text
      });
```

Closes the current block or module.

### Line 444

```text
      let draw = rand() * totalWeight;
```

Sum of weights is the probability denominator.

### Line 445

```text
      let winnerIndex = weights.findIndex(weight => { draw -= weight; return draw < 0; });
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 446

```text
      if (winnerIndex < 0) winnerIndex = entrants.length - 1;
```

Guards the following action so it runs only when the condition is true.

### Line 447

```text
      const winner = entrants[winnerIndex];
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 448

```text
      const fastestRival = Math.max(...entrants.filter((_, index) => index !== winnerIndex).map(runner => runner.finishFactor));
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 449

```text
      winner.finishFactor = Math.max(winner.finishFactor, fastestRival + 0.03, 0.97);
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 450

```text
      return { eventId, number: Math.floor(eventId / oldInterval), type: 'horse', durationMs, entrants, winnerId: entrants[winnerIndex].id };
```

Returns an object with fields eventId: `eventId` (event id); number: rounds divides `eventId` (event id) by `oldInterval` (old interval) down to the next whole number; type: "horse"; durationMs: `durationMs` (duration ms); entrants: `entrants` (entrants); winnerId: `entrants[winnerIndex].id` (the id property of entrants[winnerIndex]) to the caller and exits this function.

### Line 451

```text
    }
```

Closes the current block or module.

### Line 452

```text

```

Blank line separates related code sections.

### Line 453

```text
    raceStartTime(eventId) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 454

```text
      return new Date(eventId).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
```

Returns calls `new Date(eventId).toLocaleTimeString` with an array containing ; an object with fields hour: "numeric"; minute: "2-digit" to the caller and exits this function.

### Line 455

```text
    }
```

Closes the current block or module.

### Line 456

```text

```

Blank line separates related code sections.

### Line 457

```text
    raceDateTime(eventId) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 458

```text
      return new Date(eventId).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
```

Returns function toLocaleString() { [native code] } to the caller and exits this function.

### Line 459

```text
    }
```

Closes the current block or module.

### Line 460

```text

```

Blank line separates related code sections.

### Line 461

```text
    formatMoney(value) {
```

Displays virtual chips as US currency with two decimals.

### Line 462

```text
      return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
```

Returns a text template that combines fixed text with computed values function toLocaleString() { [native code] } to the caller and exits this function.

### Line 463

```text
    }
```

Closes the current block or module.

### Line 464

```text

```

Blank line separates related code sections.

### Line 465

```text
    formatCountdown(milliseconds) {
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 466

```text
      const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 467

```text
      const hours = Math.floor(seconds / 3600);
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 468

```text
      const minutes = Math.floor((seconds % 3600) / 60);
```

Uses the shown numeric operation to keep race timing, stake, probability, or animation within its configured bounds.

### Line 469

```text
      const remainder = seconds % 60;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 470

```text
      return hours > 0
```

Returns checks checks whether `hours` (hours) is greater than 0; if true chooses a text template that combines fixed text with computed values adds padding "0" to the beginning of converts `hours` (hours) to text until it has length 2, adds padding "0" to the beginning of converts `minutes` (minutes) to text until it has length 2, adds padding "0" to the beginning of converts `remainder` (remainder) to text until it has length 2, otherwise a text template that combines fixed text with computed values adds padding "0" to the beginning of converts `minutes` (minutes) to text until it has length 2, adds padding "0" to the beginning of converts `remainder` (remainder) to text until it has length 2 to the caller and exits this function.

### Line 471

```text
        ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 472

```text
        : `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 473

```text
    }
```

Closes the current block or module.

### Line 474

```text

```

Blank line separates related code sections.

### Line 475

```text
    formatRaceResult(notice) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 476

```text
      const isLegacy = !['horse', 'car'].includes(notice.raceType);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 477

```text
      const race = isLegacy ? this.createLegacyRace(notice.raceId) : this.createRace(notice.raceId, notice.raceType);
```

Rebuilds old horse-ticket races using the former 11-minute seed format.

### Line 478

```text
      const runner = race.entrants.find(item => item.id === notice.runnerId);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 479

```text
      const winner = race.entrants.find(item => item.id === notice.winnerId);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 480

```text
      const label = isLegacy ? `Race #${race.number.toLocaleString('en-US')}` : `${notice.raceType === 'car' ? 'Car' : 'Horse'} race #${race.number.toLocaleString('en-US')}`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 481

```text
      if (notice.won) {
```

Guards the following action so it runs only when the condition is true.

### Line 482

```text
        return `${label}: ${runner?.name || 'Your runner'} won! Your bet returned ${this.formatMoney(notice.payout)} including your stake.`;
```

Displays virtual chips as US currency with two decimals.

### Line 483

```text
      }
```

Closes the current block or module.

### Line 484

```text
      return `${label}: ${runner?.name || 'Your runner'} did not win; ${winner?.name || 'another runner'} took the race. Your ${this.formatMoney(notice.stake)} stake was lost.`;
```

Displays virtual chips as US currency with two decimals.

### Line 485

```text
    }
```

Closes the current block or module.

### Line 486

```text

```

Blank line separates related code sections.

### Line 487

```text
    renderRaceResultNotice() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 488

```text
      if (!this.resultNoticeEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 489

```text
      if (!this.raceResultNotice) {
```

Guards the following action so it runs only when the condition is true.

### Line 490

```text
        this.resultNoticeEl.classList.add('hidden-view');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 491

```text
        return;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 492

```text
      }
```

Closes the current block or module.

### Line 493

```text
      const message = this.formatRaceResult(this.raceResultNotice);
```

Calls `this.formatRaceResult` with `this.raceResultNotice` (the race result notice property of this); stores the result in `message`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 494

```text
      if (this.resultNoticeTextEl && this.resultNoticeTextEl.textContent !== message) {
```

Guards the following action so it runs only when the condition is true.

### Line 495

```text
        this.resultNoticeTextEl.textContent = message;
```

Sets `this.resultNoticeTextEl.textContent` (the text content property of this.resultNoticeTextEl) to `message` (message).

### Line 496

```text
      }
```

Closes the current block or module.

### Line 497

```text
      this.resultNoticeEl.classList.remove('hidden-view');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 498

```text
    }
```

Closes the current block or module.

### Line 499

```text

```

Blank line separates related code sections.

### Line 500

```text
    acknowledgeRaceNotice(openRace) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 501

```text
      const notice = this.raceResultNotice;
```

`this.raceResultNotice` (the race result notice property of this); stores the result in `notice`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 502

```text
      if (!notice) return;
```

Guards the following action so it runs only when the condition is true.

### Line 503

```text
      this.lastResultText = this.formatRaceResult(notice);
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 504

```text
      this.raceResultNotice = null;
```

Sets `this.raceResultNotice` (the race result notice property of this) to null.

### Line 505

```text
      window.LocalProfiles?.saveCurrent({ raceResultNotice: null });
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 506

```text
      window.LocalSave?.queueFileSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 507

```text
      this.renderRaceResultNotice();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 508

```text
      if (openRace) {
```

Guards the following action so it runs only when the condition is true.

### Line 509

```text
        if (['horse', 'car'].includes(notice.raceType)) this.raceType = notice.raceType;
```

Guards the following action so it runs only when the condition is true.

### Line 510

```text
        this.hub.switchView('horse-racing');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 511

```text
        this.update();
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 512

```text
      }
```

Closes the current block or module.

### Line 513

```text
      this.updateTicketNote();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 514

```text
    }
```

Closes the current block or module.

### Line 515

```text

```

Blank line separates related code sections.

### Line 516

```text
    // Simulate completed events missed while the browser was closed, so experience keeps progressing.
```

Comment documents how this part supports the virtual casino engine.

### Line 517

```text
    // Advance missed events when the player returns so runner records do not require an open tab all day.
```

Comment documents how this part supports the virtual casino engine.

### Line 518

```text
    processCompletedRaces(now) {
```

Catches up runner starts/wins for races missed while the browser was closed.

### Line 519

```text
      let changed = false;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 520

```text
      for (const type of ['horse', 'car']) {
```

Repeats the operation for the relevant entries.

### Line 521

```text
        const circuit = this.experience[type];
```

The entry at index/key `type` (type) in `this.experience` (the experience property of this); stores the result in `circuit`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 522

```text
        let nextId = this.getNextRaceStart(circuit.lastProcessedRaceId);
```

Calls `this.getNextRaceStart` with `circuit.lastProcessedRaceId` (the last processed race id property of circuit); stores the result in `nextId`. let allows the binding to be reassigned.

### Line 523

```text
        let processedCount = 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 524

```text
        while (nextId && processedCount < 1000) {
```

Caps catch-up at 1,000 events per update.

### Line 525

```text
          const scheduledType = this.getScheduledRaceType(nextId);
```

Calls `this.getScheduledRaceType` with `nextId` (next id); stores the result in `scheduledType`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 526

```text
          const race = this.createRace(nextId, scheduledType);
```

Calls `this.createRace` with `nextId` (next id); `scheduledType` (scheduled type); stores the result in `race`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 527

```text
          if (nextId + race.durationMs > now) break;
```

Guards the following action so it runs only when the condition is true.

### Line 528

```text
          if (scheduledType === type) {
```

Guards the following action so it runs only when the condition is true.

### Line 529

```text
            const runners = circuit.runners;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 530

```text
            race.entrants.forEach(runner => {
```

Adds one start to every entrant and one win to the deterministic winner.

### Line 531

```text
              const stats = runners[runner.id] || { starts: 0, wins: 0 };
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 532

```text
              stats.starts += 1;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 533

```text
              if (runner.id === race.winnerId) stats.wins += 1;
```

Guards the following action so it runs only when the condition is true.

### Line 534

```text
              runners[runner.id] = stats;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 535

```text
            });
```

Closes the current block or module.

### Line 536

```text
            circuit.lastProcessedRaceId = nextId;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 537

```text
            changed = true;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 538

```text
          }
```

Closes the current block or module.

### Line 539

```text
          nextId = this.getNextRaceStart(nextId);
```

Sets `nextId` (next id) to calls `this.getNextRaceStart` with `nextId` (next id).

### Line 540

```text
          processedCount += 1;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 541

```text
        }
```

Closes the current block or module.

### Line 542

```text
      }
```

Closes the current block or module.

### Line 543

```text
      if (changed) this.saveExperience();
```

Guards the following action so it runs only when the condition is true.

### Line 544

```text
    }
```

Closes the current block or module.

### Line 545

```text

```

Blank line separates related code sections.

### Line 546

```text
    saveExperience() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 547

```text
      window.LocalProfiles?.saveCurrent({ raceExperience: this.experience });
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 548

```text
      window.LocalSave?.queueFileSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 549

```text
    }
```

Closes the current block or module.

### Line 550

```text

```

Blank line separates related code sections.

### Line 551

```text
    // One clock tick derives the live race and next betting race, then refreshes the dependent UI.
```

Comment documents how this part supports the virtual casino engine.

### Line 552

```text
    update() {
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 553

```text
      const now = Date.now();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 554

```text
      this.processCompletedRaces(now);
```

Catches up runner starts/wins for races missed while the browser was closed.

### Line 555

```text
      const currentStart = this.getScheduledRaceAtOrBefore(now);
```

Calls `this.getScheduledRaceAtOrBefore` with `now` (now); stores the result in `currentStart`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 556

```text
      const activeRace = currentStart ? this.createRace(currentStart) : null;
```

Checks `currentStart` (current start); if true chooses calls `this.createRace` with `currentStart` (current start), otherwise null; stores the result in `activeRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 557

```text
      const activeRaceEnd = activeRace ? activeRace.eventId + activeRace.durationMs : 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 558

```text
      this.isRaceInProgress = Boolean(activeRace && now < activeRaceEnd);
```

Sets `this.isRaceInProgress` (the is race in progress property of this) to converts uses checks whether `now` (now) is less than `activeRaceEnd` (active race end) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness.

### Line 559

```text
      this.isResultDisplay = Boolean(activeRace && !this.isRaceInProgress && now < activeRaceEnd + RESULT_DISPLAY_MS);
```

Shows a finished result for 120 seconds.

### Line 560

```text
      const nextRaceId = this.getNextRaceStart(now);
```

Calls `this.getNextRaceStart` with `now` (now); stores the result in `nextRaceId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 561

```text
      const bettingRace = this.createRace(nextRaceId);
```

Calls `this.createRace` with `nextRaceId` (next race id); stores the result in `bettingRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 562

```text
      this.raceType = bettingRace.type;
```

Sets `this.raceType` (the race type property of this) to `bettingRace.type` (the type property of bettingRace).

### Line 563

```text
      const wasRacePreviewOpen = this.isRacePreviewOpen;
```

`this.isRacePreviewOpen` (the is race preview open property of this); stores the result in `wasRacePreviewOpen`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 564

```text
      this.isRacePreviewOpen = this.isRacePreviewOpenFor(bettingRace.eventId, now);
```

True from 45 minutes before start onward.

### Line 565

```text
      this.isBettingOpen = this.isBettingOpenFor(bettingRace.eventId, now);
```

True only during the 45-minute-to-5-minute-before-start window.

### Line 566

```text

```

Blank line separates related code sections.

### Line 567

```text
      // Tickets retain their stored event result, so profile reloads cannot alter a wager already placed.
```

Comment documents how this part supports the virtual casino engine.

### Line 568

```text
      const ticketDuration = this.ticket?.durationMs || (this.ticket
```

Uses `this.ticket?.durationMs` (the duration ms property of this.ticket); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to checks `this.ticket` (the ticket property of this); if true chooses checks `this.ticket.raceType` (the race type property of this.ticket); if true chooses `this.createRace(this.ticket.raceId, this.ticket.raceType).durationMs` (the duration ms property of this.createRace(this.ticket.raceId, this.ticket.raceType)), otherwise `this.createLegacyRace(this.ticket.raceId).durationMs` (the duration ms property of this.createLegacyRace(this.ticket.raceId)), otherwise 0; stores the result in `ticketDuration`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 569

```text
        ? (this.ticket.raceType ? this.createRace(this.ticket.raceId, this.ticket.raceType).durationMs : this.createLegacyRace(this.ticket.raceId).durationMs)
```

Rebuilds old horse-ticket races using the former 11-minute seed format.

### Line 570

```text
        : 0);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 571

```text
      if (this.ticket && now >= this.ticket.raceId + ticketDuration) this.settleTicket();
```

Reconstructs the locked seeded result and settles the saved ticket.

### Line 572

```text

```

Blank line separates related code sections.

### Line 573

```text
      const trackIsCurrent = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
```

Converts uses uses `this.isRaceInProgress` (the is race in progress property of this) when it is truthy, otherwise falls back to `this.isResultDisplay` (the is result display property of this) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `trackIsCurrent`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 574

```text
      const trackRace = trackIsCurrent ? activeRace : (this.isRacePreviewOpen ? bettingRace : null);
```

Checks `trackIsCurrent` (track is current); if true chooses `activeRace` (active race), otherwise checks `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses `bettingRace` (betting race), otherwise null; stores the result in `trackRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 575

```text
      const targetRaceChanged = this.targetRaceId !== bettingRace.eventId;
```

Checks that `this.targetRaceId` (the target race id property of this) and `bettingRace.eventId` (the event id property of bettingRace) differ in value or type; stores the result in `targetRaceChanged`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 576

```text
      if (targetRaceChanged) {
```

Guards the following action so it runs only when the condition is true.

### Line 577

```text
        this.targetRaceId = bettingRace.eventId;
```

Sets `this.targetRaceId` (the target race id property of this) to `bettingRace.eventId` (the event id property of bettingRace).

### Line 578

```text
        this.selectedHorseId = null;
```

Sets `this.selectedHorseId` (the selected horse id property of this) to null.

### Line 579

```text
        this.lastResultText = '';
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 580

```text
      }
```

Closes the current block or module.

### Line 581

```text
      if (targetRaceChanged || wasRacePreviewOpen !== this.isRacePreviewOpen) {
```

Guards the following action so it runs only when the condition is true.

### Line 582

```text
        this.renderRunnerOptions(this.isRacePreviewOpen ? bettingRace : null);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 583

```text
        if (!this.isRacePreviewOpen) this.selectedHorseId = null;
```

Guards the following action so it runs only when the condition is true.

### Line 584

```text
      }
```

Closes the current block or module.

### Line 585

```text
      const trackRaceId = trackRace?.eventId || null;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 586

```text
      const trackRaceType = trackRace?.type || null;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 587

```text
      if (this.trackRaceId !== trackRaceId || this.trackRaceType !== trackRaceType) {
```

Guards the following action so it runs only when the condition is true.

### Line 588

```text
        this.trackRaceId = trackRaceId;
```

Sets `this.trackRaceId` (the track race id property of this) to `trackRaceId` (track race id).

### Line 589

```text
        this.trackRaceType = trackRaceType;
```

Sets `this.trackRaceType` (the track race type property of this) to `trackRaceType` (track race type).

### Line 590

```text
        this.renderTrack(trackRace);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 591

```text
      }
```

Closes the current block or module.

### Line 592

```text
      const progress = this.isRaceInProgress
```

Checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses divides subtracts `activeRace.eventId` (the event id property of activeRace) from `now` (now) by `activeRace.durationMs` (the duration ms property of activeRace), otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses 1, otherwise 0; stores the result in `progress`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 593

```text
        ? (now - activeRace.eventId) / activeRace.durationMs
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 594

```text
        : (this.isResultDisplay ? 1 : 0);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 595

```text
      if (trackRace) this.updateTrackPositions(trackRace, progress, trackIsCurrent);
```

Guards the following action so it runs only when the condition is true.

### Line 596

```text
      this.updateClockAndStatus(bettingRace, activeRace, now, nextRaceId - now);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 597

```text
      this.updateRunnerSelection();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 598

```text
      this.updateBetControls();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 599

```text
      this.updateTicketNote();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 600

```text
      this.updateModeButtons(trackIsCurrent ? activeRace.type : (this.isRacePreviewOpen ? bettingRace.type : null));
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 601

```text
      this.renderRaceResultNotice();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 602

```text
    }
```

Closes the current block or module.

### Line 603

```text

```

Blank line separates related code sections.

### Line 604

```text
    updateClockAndStatus(bettingRace, activeRace, now, remaining) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 605

```text
      const showingActiveRace = Boolean(activeRace && (this.isRaceInProgress || this.isResultDisplay));
```

Converts uses uses `this.isRaceInProgress` (the is race in progress property of this) when it is truthy, otherwise falls back to `this.isResultDisplay` (the is result display property of this) only if `activeRace` (active race) is truthy; otherwise keeps the falsy first value to true or false according to truthiness; stores the result in `showingActiveRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 606

```text
      if (!showingActiveRace && !this.isRacePreviewOpen) {
```

Guards the following action so it runs only when the condition is true.

### Line 607

```text
        const nextOpen = this.getNextBettingOpen(now);
```

Calls `this.getNextBettingOpen` with `now` (now); stores the result in `nextOpen`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 608

```text
        const opensAt = this.raceStartTime(nextOpen);
```

Calls `this.raceStartTime` with `nextOpen` (next open); stores the result in `opensAt`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 609

```text
        if (this.raceTitleEl) this.raceTitleEl.textContent = 'Racing Closed';
```

Guards the following action so it runs only when the condition is true.

### Line 610

```text
        if (this.raceNumberEl) this.raceNumberEl.textContent = '—';
```

Guards the following action so it runs only when the condition is true.

### Line 611

```text
        if (this.phaseEl) this.phaseEl.textContent = 'CLOSED';
```

Guards the following action so it runs only when the condition is true.

### Line 612

```text
        const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
```

Finds the relevant race control or runner nodes in the DOM.

### Line 613

```text
        if (countdownLabel) countdownLabel.textContent = 'BETTING OPENS IN';
```

Guards the following action so it runs only when the condition is true.

### Line 614

```text
        if (this.countdownEl) this.countdownEl.textContent = this.formatCountdown(nextOpen - now);
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 615

```text
        if (this.startTimeEl) this.startTimeEl.textContent = '—';
```

Guards the following action so it runs only when the condition is true.

### Line 616

```text
        if (this.raceDurationEl) this.raceDurationEl.textContent = '—';
```

Guards the following action so it runs only when the condition is true.

### Line 617

```text
        if (this.targetTextEl) this.targetTextEl.textContent = `Racing is closed. The next preview and betting open at ${opensAt}.`;
```

Guards the following action so it runs only when the condition is true.

### Line 618

```text
        if (this.trackCaptionEl) this.trackCaptionEl.textContent = 'RACING CLOSED';
```

Guards the following action so it runs only when the condition is true.

### Line 619

```text
        this.setStatus(`CLOSED — RACING RESUMES AT ${opensAt}`, 'status-loss');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 620

```text
        return;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 621

```text
      }
```

Closes the current block or module.

### Line 622

```text

```

Blank line separates related code sections.

### Line 623

```text
      const raceNumber = `#${bettingRace.number.toLocaleString('en-US')}`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 624

```text
      const displayedRace = showingActiveRace ? activeRace : bettingRace;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 625

```text
      const displayedRaceNumber = `#${displayedRace.number.toLocaleString('en-US')}`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 626

```text
      const typeLabel = bettingRace.type === 'car' ? 'car' : 'horse';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 627

```text
      if (this.raceTitleEl) this.raceTitleEl.textContent = displayedRace.type === 'car' ? 'Circuit Racing' : 'Horse Racing';
```

Guards the following action so it runs only when the condition is true.

### Line 628

```text
      if (this.raceNumberEl) this.raceNumberEl.textContent = displayedRaceNumber;
```

Guards the following action so it runs only when the condition is true.

### Line 629

```text
      if (this.phaseEl) {
```

Guards the following action so it runs only when the condition is true.

### Line 630

```text
        this.phaseEl.textContent = this.isRaceInProgress
```

Sets `this.phaseEl.textContent` (the text content property of this.phaseEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses "RACING", otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses "RESULTS", otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses "BETTING OPEN", otherwise "BETTING CLOSED".

### Line 631

```text
          ? 'RACING'
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 632

```text
          : (this.isResultDisplay ? 'RESULTS' : (this.isBettingOpen ? 'BETTING OPEN' : 'BETTING CLOSED'));
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 633

```text
      }
```

Closes the current block or module.

### Line 634

```text
      const countdownLabel = this.countdownEl?.parentElement?.querySelector('span');
```

Finds the relevant race control or runner nodes in the DOM.

### Line 635

```text
      if (countdownLabel) countdownLabel.textContent = this.isRaceInProgress ? 'FINISH IN' : 'NEXT STARTS IN';
```

Guards the following action so it runs only when the condition is true.

### Line 636

```text
      const displayRace = displayedRace;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 637

```text
      if (this.countdownEl) this.countdownEl.textContent = this.isRaceInProgress
```

Guards the following action so it runs only when the condition is true.

### Line 638

```text
        ? this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 639

```text
        : this.formatCountdown(remaining);
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 640

```text
      if (this.startTimeEl) this.startTimeEl.textContent = this.raceDateTime(displayedRace.eventId);
```

Guards the following action so it runs only when the condition is true.

### Line 641

```text
      if (this.raceDurationEl) this.raceDurationEl.textContent = this.formatCountdown(displayRace.durationMs);
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 642

```text
      if (this.targetTextEl) {
```

Guards the following action so it runs only when the condition is true.

### Line 643

```text
        const cutoff = this.raceStartTime(bettingRace.eventId - BETTING_CUTOFF_MS);
```

Closes betting five minutes before start.

### Line 644

```text
        const nextOpen = this.raceStartTime(bettingRace.eventId - RACE_PREVIEW_OPEN_MS);
```

Opens preview and controls 45 minutes before start.

### Line 645

```text
        const targetMessage = !this.isRacePreviewOpen
```

Checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses a text template that combines fixed text with computed values `nextOpen` (next open), otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses a text template that combines fixed text with computed values checks checks that `bettingRace.type` and "car" have the same value and type; if true chooses "car", otherwise "horse", `typeLabel` (type label), `raceNumber` (race number), `cutoff` (cutoff), otherwise a text template that combines fixed text with computed values `typeLabel` (type label), `raceNumber` (race number), calls `this.raceStartTime` with `bettingRace.eventId` (the event id property of bettingRace); stores the result in `targetMessage`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 646

```text
          ? `The next preview and betting open at ${nextOpen}.`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 647

```text
          : (this.isBettingOpen
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 648

```text
            ? `Choose a ${bettingRace.type === 'car' ? 'car' : 'horse'} for ${typeLabel} race ${raceNumber}. Betting closes at ${cutoff}, five minutes before the start.`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 649

```text
            : `Betting is closed for ${typeLabel} race ${raceNumber}. The next field starts at ${this.raceStartTime(bettingRace.eventId)}.`);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 650

```text
        this.targetTextEl.textContent = this.isRaceInProgress
```

Sets `this.targetTextEl.textContent` (the text content property of this.targetTextEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses a text template that combines fixed text with computed values `activeRace.type` (the type property of activeRace), `targetMessage` (target message), otherwise `targetMessage` (target message).

### Line 651

```text
          ? `The current ${activeRace.type} race is underway. ${targetMessage}`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 652

```text
          : targetMessage;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 653

```text
      }
```

Closes the current block or module.

### Line 654

```text
      if (this.trackCaptionEl) {
```

Guards the following action so it runs only when the condition is true.

### Line 655

```text
        const currentNo = activeRace ? `#${activeRace.number.toLocaleString('en-US')}` : '';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 656

```text
        this.trackCaptionEl.textContent = this.isRaceInProgress
```

Sets `this.trackCaptionEl.textContent` (the text content property of this.trackCaptionEl) to checks `this.isRaceInProgress` (the is race in progress property of this); if true chooses a text template that combines fixed text with computed values checks checks that `activeRace.type` and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE", `currentNo` (current no), otherwise checks `this.isResultDisplay` (the is result display property of this); if true chooses a text template that combines fixed text with computed values checks `activeRace.type === 'car'`; if true chooses "CAR", otherwise "HORSE", `currentNo` (current no), otherwise a text template that combines fixed text with computed values checks `bettingRace.type === 'car'`; if true chooses "CAR", otherwise "HORSE", `raceNumber` (race number).

### Line 657

```text
          ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — LIVE`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 658

```text
          : (this.isResultDisplay
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 659

```text
            ? `${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${currentNo} — FINAL RESULT`
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 660

```text
            : `${bettingRace.type === 'car' ? 'CAR' : 'HORSE'} RACE ${raceNumber} — NEXT FIELD PREVIEW`);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 661

```text
      }
```

Closes the current block or module.

### Line 662

```text

```

Blank line separates related code sections.

### Line 663

```text
      if (this.statusEl) {
```

Guards the following action so it runs only when the condition is true.

### Line 664

```text
        if (this.isRaceInProgress) {
```

Guards the following action so it runs only when the condition is true.

### Line 665

```text
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE IN PROGRESS — ${this.formatCountdown(activeRace.durationMs - (now - activeRace.eventId))} TO FINISH`, 'status-spinning');
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 666

```text
        } else if (this.isResultDisplay) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 667

```text
          const winner = activeRace.entrants.find(runner => runner.id === activeRace.winnerId);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 668

```text
          this.setStatus(`${activeRace.type === 'car' ? 'CAR' : 'HORSE'} RACE FINISHED — ${winner?.name || 'WINNER'} TAKES THE WIN`, 'status-win');
```

Calls `this.setStatus` with a text template that combines fixed text with computed values checks checks that `activeRace.type` (the type property of activeRace) and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE", uses `winner?.name` (the name property of winner); optional chaining stops with undefined if a guarded receiver is null or undefined when it is truthy, otherwise falls back to "WINNER"; "status-win".

### Line 669

```text
        } else if (!this.isBettingOpen) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 670

```text
          this.setStatus(`BETTING CLOSED — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-loss');
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 671

```text
        } else {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 672

```text
          this.setStatus(`BETTING OPEN — ${typeLabel.toUpperCase()} RACE ${raceNumber} STARTS IN ${this.formatCountdown(remaining)}`, 'status-spinning');
```

Formats a nonnegative countdown as HH:MM:SS or MM:SS.

### Line 673

```text
        }
```

Closes the current block or module.

### Line 674

```text
      }
```

Closes the current block or module.

### Line 675

```text
    }
```

Closes the current block or module.

### Line 676

```text

```

Blank line separates related code sections.

### Line 677

```text
    setStatus(message, statusClass) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 678

```text
      if (!this.statusEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 679

```text
      this.statusEl.textContent = message;
```

Sets `this.statusEl.textContent` (the text content property of this.statusEl) to `message` (message).

### Line 680

```text
      this.statusEl.classList.remove('status-spinning', 'status-win', 'status-loss');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 681

```text
      this.statusEl.classList.add(statusClass);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 682

```text
    }
```

Closes the current block or module.

### Line 683

```text

```

Blank line separates related code sections.

### Line 684

```text
    renderRunnerOptions(race) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 685

```text
      if (!this.runnerListEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 686

```text
      this.runnerListEl.replaceChildren();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 687

```text
      if (!race) {
```

Guards the following action so it runs only when the condition is true.

### Line 688

```text
        this.runnerListEl.setAttribute('aria-label', 'Race runners hidden until the preview opens');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 689

```text
        return;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 690

```text
      }
```

Closes the current block or module.

### Line 691

```text
      this.runnerListEl.setAttribute('aria-label', `Choose a ${race.type === 'car' ? 'car' : 'horse'} to win`);
```

Calls `this.runnerListEl.setAttribute` with "aria-label"; a text template that combines fixed text with computed values checks checks that `race.type` (the type property of race) and "car" have the same value and type; if true chooses "car", otherwise "horse".

### Line 692

```text
      race.entrants.forEach((runner, index) => {
```

Adds one start to every entrant and one win to the deterministic winner.

### Line 693

```text
        const button = document.createElement('button');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 694

```text
        button.type = 'button';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 695

```text
        button.className = 'race-runner-option';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 696

```text
        button.dataset.runnerId = runner.id;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 697

```text
        button.setAttribute('aria-pressed', 'false');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 698

```text
        const silks = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 699

```text
        silks.className = 'race-runner-silks';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 700

```text
        silks.textContent = runner.silks;
```

Updates the visible race text for the player.

### Line 701

```text
        const details = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 702

```text
        details.className = 'race-runner-details';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 703

```text
        const name = document.createElement('strong');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 704

```text
        name.textContent = `${index + 1}. ${runner.name}`;
```

Updates the visible race text for the player.

### Line 705

```text
        const probability = document.createElement('small');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 706

```text
        probability.textContent = `${Math.round(runner.winProbability * 100)}% chance • ${runner.starts} starts / ${runner.wins} wins`;
```

Normalizes each weight into a win probability.

### Line 707

```text
        details.append(name, probability);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 708

```text
        const odds = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 709

```text
        odds.className = 'race-runner-odds';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 710

```text
        odds.textContent = `${runner.odds.toFixed(2)}×`;
```

Calculates a house-adjusted total-return multiple: about 0.92/probability, floored at 1.20x.

### Line 711

```text
        const oddsCaption = document.createElement('small');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 712

```text
        oddsCaption.textContent = 'total return';
```

Updates the visible race text for the player.

### Line 713

```text
        const oddsWrap = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 714

```text
        oddsWrap.className = 'race-odds-wrap';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 715

```text
        oddsWrap.append(odds, oddsCaption);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 716

```text
        button.append(silks, details, oddsWrap);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 717

```text
        this.runnerListEl.appendChild(button);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 718

```text
      });
```

Closes the current block or module.

### Line 719

```text
    }
```

Closes the current block or module.

### Line 720

```text

```

Blank line separates related code sections.

### Line 721

```text
    renderTrack(race) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 722

```text
      if (!this.trackEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 723

```text
      this.trackEl.replaceChildren();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 724

```text
      if (!race) return;
```

Guards the following action so it runs only when the condition is true.

### Line 725

```text
      race.entrants.forEach((runner, index) => {
```

Adds one start to every entrant and one win to the deterministic winner.

### Line 726

```text
        const lane = document.createElement('div');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 727

```text
        lane.className = `race-lane ${race.type === 'car' ? 'race-car-lane' : 'race-horse-lane'}`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 728

```text
        lane.dataset.runnerId = runner.id;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 729

```text
        const laneNumber = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 730

```text
        laneNumber.className = 'race-lane-number';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 731

```text
        laneNumber.textContent = String(index + 1);
```

Updates the visible race text for the player.

### Line 732

```text
        const rail = document.createElement('div');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 733

```text
        rail.className = 'race-lane-rail';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 734

```text
        const finish = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 735

```text
        finish.className = 'race-finish-line';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 736

```text
        finish.setAttribute('aria-hidden', 'true');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 737

```text
        const token = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 738

```text
        token.className = race.type === 'car' ? 'race-horse-token race-car-token' : 'race-horse-token';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 739

```text
        token.textContent = runner.silks;
```

Updates the visible race text for the player.

### Line 740

```text
        token.setAttribute('aria-label', runner.name);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 741

```text
        token.style.setProperty('--silks-color', runner.lane);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 742

```text
        rail.append(finish, token);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 743

```text
        const name = document.createElement('span');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 744

```text
        name.className = 'race-lane-name';
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 745

```text
        name.textContent = runner.name;
```

Updates the visible race text for the player.

### Line 746

```text
        lane.append(laneNumber, rail, name);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 747

```text
        this.trackEl.appendChild(lane);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 748

```text
      });
```

Closes the current block or module.

### Line 749

```text
    }
```

Closes the current block or module.

### Line 750

```text

```

Blank line separates related code sections.

### Line 751

```text
    updateTrackPositions(race, progress, isRunning) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 752

```text
      if (!this.trackEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 753

```text
      const winnerId = race.winnerId;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 754

```text
      this.trackEl.querySelectorAll('.race-lane').forEach(lane => {
```

Finds the relevant race control or runner nodes in the DOM.

### Line 755

```text
        const runner = race.entrants.find(item => item.id === lane.dataset.runnerId);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 756

```text
        const token = lane.querySelector('.race-horse-token');
```

Finds the relevant race control or runner nodes in the DOM.

### Line 757

```text
        const isWinner = runner?.id === winnerId;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 758

```text
        const position = isRunning
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 759

```text
          ? Math.min(isWinner ? 100 : 94, progress * runner.finishFactor * 100)
```

Seeded animation speed ranges from 0.74 to 0.94.

### Line 760

```text
          : 0;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 761

```text
        token.style.left = `${position}%`;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 762

```text
        lane.classList.toggle('is-race-winner', isWinner && isRunning && progress >= 1);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 763

```text
        lane.classList.toggle('is-race-running', isRunning);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 764

```text
      });
```

Closes the current block or module.

### Line 765

```text
    }
```

Closes the current block or module.

### Line 766

```text

```

Blank line separates related code sections.

### Line 767

```text
    updateRunnerSelection() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 768

```text
      if (!this.runnerListEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 769

```text
      this.runnerListEl.querySelectorAll('[data-runner-id]').forEach(button => {
```

Finds the relevant race control or runner nodes in the DOM.

### Line 770

```text
        const isSelected = button.dataset.runnerId === this.selectedHorseId;
```

Checks that `button.dataset.runnerId` (the runner id property of button.dataset) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type; stores the result in `isSelected`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 771

```text
        button.classList.toggle('is-selected', isSelected);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 772

```text
        button.setAttribute('aria-pressed', String(isSelected));
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 773

```text
        button.disabled = !this.isBettingOpen || Boolean(this.ticket);
```

Sets `button.disabled` (the disabled property of button) to uses negates the truthiness of `this.isBettingOpen` (the is betting open property of this) when it is truthy, otherwise falls back to converts `this.ticket` (the ticket property of this) to true or false according to truthiness.

### Line 774

```text
      });
```

Closes the current block or module.

### Line 775

```text
    }
```

Closes the current block or module.

### Line 776

```text

```

Blank line separates related code sections.

### Line 777

```text
    updateModeButtons(visibleRaceType = null) {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 778

```text
      this.modeButtons.forEach(item => {
```

Runs a callback taking item that runs its enclosed statements once per item of `this.modeButtons` (the mode buttons property of this).

### Line 779

```text
        const active = Boolean(visibleRaceType && item.dataset.raceType === visibleRaceType);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 780

```text
        item.classList.toggle('is-active', active);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 781

```text
        if (active) item.setAttribute('aria-current', 'true');
```

Guards the following action so it runs only when the condition is true.

### Line 782

```text
        else item.removeAttribute('aria-current');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 783

```text
      });
```

Closes the current block or module.

### Line 784

```text
    }
```

Closes the current block or module.

### Line 785

```text

```

Blank line separates related code sections.

### Line 786

```text
    updateBetControls() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 787

```text
      if (this.betDisplayEl) this.betDisplayEl.textContent = this.formatMoney(this.bet);
```

Displays virtual chips as US currency with two decimals.

### Line 788

```text
      const currentRace = this.createRace(this.targetRaceId || this.getNextRaceStart(Date.now()));
```

Calls `this.createRace` with uses `this.targetRaceId` (the target race id property of this) when it is truthy, otherwise falls back to calls `this.getNextRaceStart` with reads the current time as milliseconds since 1970-01-01 UTC; stores the result in `currentRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 789

```text
      const selectedRunner = currentRace.entrants.find(runner => runner.id === this.selectedHorseId);
```

Returns the first item of `currentRace.entrants` (the entrants property of currentRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type, or undefined; stores the result in `selectedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 790

```text
      const potential = selectedRunner ? this.roundMoney(this.bet * selectedRunner.odds) : 0;
```

Checks `selectedRunner` (selected runner); if true chooses calls `this.roundMoney` with multiplies `this.bet` (the bet property of this) by `selectedRunner.odds` (the odds property of selectedRunner), otherwise 0; stores the result in `potential`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 791

```text
      if (this.estimatedReturnEl) this.estimatedReturnEl.textContent = this.formatMoney(potential);
```

Displays virtual chips as US currency with two decimals.

### Line 792

```text
      const maximum = this.maxStake();
```

Caps a wager at both wallet balance and player maxBet.

### Line 793

```text
      const betOpen = this.isBettingOpen && !this.ticket;
```

Uses negates the truthiness of `this.ticket` (the ticket property of this) only if `this.isBettingOpen` (the is betting open property of this) is truthy; otherwise keeps the falsy first value; stores the result in `betOpen`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 794

```text
      if (this.minusBtn) this.minusBtn.disabled = !betOpen || this.bet <= BET_STEP;
```

Race wagers change in five-chip steps.

### Line 795

```text
      if (this.plusBtn) this.plusBtn.disabled = !betOpen || this.bet + BET_STEP > maximum;
```

Race wagers change in five-chip steps.

### Line 796

```text
      if (this.maxBtn) {
```

Guards the following action so it runs only when the condition is true.

### Line 797

```text
        this.maxBtn.disabled = !betOpen || maximum <= 0 || this.bet === maximum;
```

Sets `this.maxBtn.disabled` (the disabled property of this.maxBtn) to uses uses negates the truthiness of `betOpen` (bet open) when it is truthy, otherwise falls back to checks whether `maximum` (maximum) is at most 0 when it is truthy, otherwise falls back to checks that `this.bet` (the bet property of this) and `maximum` (maximum) have the same value and type.

### Line 798

```text
        this.maxBtn.textContent = 'MAX BET';
```

Sets `this.maxBtn.textContent` (the text content property of this.maxBtn) to "MAX BET".

### Line 799

```text
      }
```

Closes the current block or module.

### Line 800

```text
      if (this.clearBtn) this.clearBtn.disabled = !betOpen || this.bet === 0;
```

Guards the following action so it runs only when the condition is true.

### Line 801

```text
      if (this.placeBtn) {
```

Guards the following action so it runs only when the condition is true.

### Line 802

```text
        this.placeBtn.disabled = !betOpen || !selectedRunner || this.bet <= 0 || this.bet > maximum;
```

Sets `this.placeBtn.disabled` (the disabled property of this.placeBtn) to uses uses uses negates the truthiness of `betOpen` (bet open) when it is truthy, otherwise falls back to negates the truthiness of `selectedRunner` (selected runner) when it is truthy, otherwise falls back to checks whether `this.bet` (the bet property of this) is at most 0 when it is truthy, otherwise falls back to checks whether `this.bet` (the bet property of this) is greater than `maximum` (maximum).

### Line 803

```text
        this.placeBtn.textContent = !this.isRacePreviewOpen
```

Sets `this.placeBtn.textContent` (the text content property of this.placeBtn) to checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses "RACING CLOSED", otherwise checks `selectedRunner` (selected runner); if true chooses a text template that combines fixed text with computed values calls `this.formatMoney` with `this.bet`, otherwise checks negates the truthiness of `this.isBettingOpen`; if true chooses "BETTING CLOSED", otherwise a text template that combines fixed text with computed values `this.raceType === 'car' ? 'CAR' : 'HORSE'`.

### Line 804

```text
          ? 'RACING CLOSED'
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 805

```text
          : (selectedRunner
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 806

```text
            ? `PLACE WIN BET • ${this.formatMoney(this.bet)}`
```

Displays virtual chips as US currency with two decimals.

### Line 807

```text
            : (!this.isBettingOpen ? 'BETTING CLOSED' : `SELECT A ${this.raceType === 'car' ? 'CAR' : 'HORSE'}`));
```

Checks negates the truthiness of `this.isBettingOpen` (the is betting open property of this); if true chooses "BETTING CLOSED", otherwise a text template that combines fixed text with computed values checks checks that `this.raceType` (the race type property of this) and "car" have the same value and type; if true chooses "CAR", otherwise "HORSE".

### Line 808

```text
      }
```

Closes the current block or module.

### Line 809

```text
    }
```

Closes the current block or module.

### Line 810

```text

```

Blank line separates related code sections.

### Line 811

```text
    updateTicketNote() {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 812

```text
      if (!this.ticketNoteEl) return;
```

Guards the following action so it runs only when the condition is true.

### Line 813

```text
      if (this.lastResultText) {
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 814

```text
        this.ticketNoteEl.textContent = this.lastResultText;
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 815

```text
        return;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 816

```text
      }
```

Closes the current block or module.

### Line 817

```text
      if (this.ticket) {
```

Guards the following action so it runs only when the condition is true.

### Line 818

```text
        const legacy = !['horse', 'car'].includes(this.ticket.raceType);
```

Negates the truthiness of checks whether an array containing "horse", "car" contains `this.ticket.raceType` (the race type property of this.ticket); stores the result in `legacy`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 819

```text
        const type = legacy ? 'horse' : this.ticket.raceType;
```

Checks `legacy` (legacy); if true chooses "horse", otherwise `this.ticket.raceType` (the race type property of this.ticket); stores the result in `type`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 820

```text
        const currentRace = legacy ? this.createLegacyRace(this.ticket.raceId) : this.createRace(this.ticket.raceId, type);
```

Rebuilds old horse-ticket races using the former 11-minute seed format.

### Line 821

```text
        const runner = currentRace.entrants.find(item => item.id === this.ticket.runnerId);
```

Returns the first item of `currentRace.entrants` (the entrants property of currentRace) matching a callback taking item that checks that `item.id` (the id property of item) and `this.ticket.runnerId` (the runner id property of this.ticket) have the same value and type, or undefined; stores the result in `runner`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 822

```text
        const potential = this.roundMoney(this.ticket.stake * this.ticket.odds);
```

Calls `this.roundMoney` with multiplies `this.ticket.stake` (the stake property of this.ticket) by `this.ticket.odds` (the odds property of this.ticket); stores the result in `potential`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 823

```text
        this.ticketNoteEl.textContent = `Locked ticket: ${this.formatMoney(this.ticket.stake)} on ${runner?.name || 'your runner'} in the ${type} race at ${this.raceStartTime(this.ticket.raceId)}, ${this.ticket.odds.toFixed(2)}×. Potential total return: ${this.formatMoney(potential)}.`;
```

Displays virtual chips as US currency with two decimals.

### Line 824

```text
        return;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 825

```text
      }
```

Closes the current block or module.

### Line 826

```text
      this.ticketNoteEl.textContent = !this.isRacePreviewOpen
```

Sets `this.ticketNoteEl.textContent` (the text content property of this.ticketNoteEl) to checks negates the truthiness of `this.isRacePreviewOpen` (the is race preview open property of this); if true chooses "Racing is closed. Preview and betting open 45 minutes before the next race. Virtual chips only.", otherwise checks `this.isBettingOpen` (the is betting open property of this); if true chooses "One open ticket at a time across both circuits. Virtual chips only.", otherwise "Betting closes five minutes before each start. Your chips are virtual only.".

### Line 827

```text
        ? 'Racing is closed. Preview and betting open 45 minutes before the next race. Virtual chips only.'
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 828

```text
        : (this.isBettingOpen
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 829

```text
          ? 'One open ticket at a time across both circuits. Virtual chips only.'
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 830

```text
          : 'Betting closes five minutes before each start. Your chips are virtual only.');
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 831

```text
    }
```

Closes the current block or module.

### Line 832

```text

```

Blank line separates related code sections.

### Line 833

```text
    // Record the event, runner, stake, odds, and duration before settlement; deduct the stake only once.
```

Comment documents how this part supports the virtual casino engine.

### Line 834

```text
    placeBet() {
```

Validates and records one ticket, deducting its stake once.

### Line 835

```text
      if (this.hub.isSettling) return;
```

Guards the following action so it runs only when the condition is true.

### Line 836

```text
      const now = Date.now();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 837

```text
      const raceId = this.getNextRaceStart(now);
```

Calls `this.getNextRaceStart` with `now` (now); stores the result in `raceId`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 838

```text
      const bettingRace = this.createRace(raceId);
```

Calls `this.createRace` with `raceId` (race id); stores the result in `bettingRace`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 839

```text
      const selectedRunner = bettingRace.entrants.find(runner => runner.id === this.selectedHorseId);
```

Returns the first item of `bettingRace.entrants` (the entrants property of bettingRace) matching a callback taking runner that checks that `runner.id` (the id property of runner) and `this.selectedHorseId` (the selected horse id property of this) have the same value and type, or undefined; stores the result in `selectedRunner`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 840

```text
      const maximum = this.maxStake();
```

Caps a wager at both wallet balance and player maxBet.

### Line 841

```text
      if (!this.canBetNow(now) || !selectedRunner || !Number.isFinite(this.bet) || this.bet <= 0 || this.bet > maximum) return;
```

Guards the following action so it runs only when the condition is true.

### Line 842

```text

```

Blank line separates related code sections.

### Line 843

```text
      this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 844

```text
      this.ticket = {
```

Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.

### Line 845

```text
        raceId: bettingRace.eventId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 846

```text
        raceType: bettingRace.type,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 847

```text
        runnerId: selectedRunner.id,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 848

```text
        stake: this.roundMoney(this.bet),
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 849

```text
        odds: selectedRunner.odds,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 850

```text
        winnerId: bettingRace.winnerId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 851

```text
        durationMs: bettingRace.durationMs
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 852

```text
      };
```

Closes the current block or module.

### Line 853

```text
      this.hub.balance = this.roundMoney(this.hub.balance - this.ticket.stake);
```

Deducts the stake at placement or credits a winning return at settlement.

### Line 854

```text
      window.LocalProfiles?.saveCurrent({
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 855

```text
        player: this.hub.player.toProfile(),
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 856

```text
        raceBet: this.ticket
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 857

```text
      });
```

Closes the current block or module.

### Line 858

```text
      this.hub.updateGlobalUI();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 859

```text
      window.LocalSave?.queueFileSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 860

```text
      this.jackpot?.contribute(this.ticket.stake * 0.015);
```

Contributes 1.5% of the stake to the optional jackpot.

### Line 861

```text
      this.xp?.addWagerXP(this.ticket.stake);
```

Awards wager XP based on stake.

### Line 862

```text
      this.lastResultText = '';
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 863

```text
      this.update();
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 864

```text
    }
```

Closes the current block or module.

### Line 865

```text

```

Blank line separates related code sections.

### Line 866

```text
    // Reconstruct the recorded seeded result and settle the saved ticket even if the player returns later.
```

Comment documents how this part supports the virtual casino engine.

### Line 867

```text
    settleTicket() {
```

Reconstructs the locked seeded result and settles the saved ticket.

### Line 868

```text
      if (this.hub.isSettling) return; // The regular update loop retries once the atomic wallet write completes.
```

Guards the following action so it runs only when the condition is true.

### Line 869

```text
      const ticket = this.ticket;
```

`this.ticket` (the ticket property of this); stores the result in `ticket`. const prevents reassignment of this binding, not mutation inside its object/array.

### Line 870

```text
      if (!ticket) return;
```

Guards the following action so it runs only when the condition is true.

### Line 871

```text
      const legacy = !['horse', 'car'].includes(ticket.raceType);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 872

```text
      const raceType = legacy ? 'horse' : ticket.raceType;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 873

```text
      const finishedRace = legacy ? this.createLegacyRace(ticket.raceId) : this.createRace(ticket.raceId, raceType);
```

Rebuilds old horse-ticket races using the former 11-minute seed format.

### Line 874

```text
      const winnerId = ticket.winnerId || finishedRace.winnerId;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 875

```text
      const won = ticket.runnerId === winnerId;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 876

```text
      const payout = won ? this.roundMoney(ticket.stake * ticket.odds) : 0;
```

Rounds gross return to cents.

### Line 877

```text
      const notice = {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 878

```text
        raceId: ticket.raceId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 879

```text
        raceType: legacy ? null : raceType,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 880

```text
        runnerId: ticket.runnerId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 881

```text
        winnerId,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 882

```text
        stake: ticket.stake,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 883

```text
        payout,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 884

```text
        won
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 885

```text
      };
```

Closes the current block or module.

### Line 886

```text
      this.ticket = null;
```

Locks event, runner, stake, odds, winner seed, and duration so refresh cannot reroll it.

### Line 887

```text
      this.raceResultNotice = notice;
```

Sets `this.raceResultNotice` (the race result notice property of this) to `notice` (notice).

### Line 888

```text
      if (payout > 0) this.hub.balance = this.roundMoney(this.hub.balance + payout);
```

Deducts the stake at placement or credits a winning return at settlement.

### Line 889

```text
      window.LocalProfiles?.saveCurrent({
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 890

```text
        player: this.hub.player.toProfile(),
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 891

```text
        raceBet: null,
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 892

```text
        raceResultNotice: notice
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 893

```text
      });
```

Closes the current block or module.

### Line 894

```text
      window.Accomplishments?.recordRace?.(notice);
```

Records the result for accomplishments.

### Line 895

```text
      this.hub.updateGlobalUI();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 896

```text
      window.LocalSave?.queueFileSave();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 897

```text
      this.lastResultText = this.formatRaceResult(notice);
```

Stores settled stake, payout, and line summary; free-spin stake is zero.

### Line 898

```text
      if (won) {
```

Guards the following action so it runs only when the condition is true.

### Line 899

```text
        this.fx?.playWinSound();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 900

```text
        this.fx?.spawnConfetti(55);
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 901

```text
      } else {
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 902

```text
        this.fx?.playClick();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 903

```text
      }
```

Closes the current block or module.

### Line 904

```text
      this.renderRaceResultNotice();
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 905

```text
      this.update();
```

Recomputes phase, preview, track, controls, and due-ticket settlement.

### Line 906

```text
    }
```

Closes the current block or module.

### Line 907

```text
  }
```

Closes the current block or module.

### Line 908

```text

```

Blank line separates related code sections.

### Line 909

```text
  window.RaceEngine = RaceEngine;
```

Computes a value used by the surrounding race timing, field-generation, rendering, or settlement step.

### Line 910

```text
})();
```

Closes the current block or module.
