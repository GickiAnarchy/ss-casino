// Original L1: This top-level comment states the bootstrap contract: wait for the DOM, restore the active local profile, then connect every casino system to that player save.
/* Browser bootstrap waits for the HTML, unlocks or creates the local profile, and only then wires game systems to that save. */
// Original L2: Registers one asynchronous startup callback; none of the managers below can safely query their HTML controls until the browser has fired DOMContentLoaded.
document.addEventListener('DOMContentLoaded', async () => {
// Original L3: Constructs the profile manager that decrypts/loads the player profiles stored by this app.
  const LocalProfiles = new window.LocalProfileManager();
// Original L4: Publishes that manager globally so later save, profile-switch, and reset code can use the same instance.
  window.LocalProfiles = LocalProfiles;
// Original L5: Waits for profile initialization to finish before reading player data; this prevents games from starting against an uninitialized save.
  await LocalProfiles.initialize();
// Original L6: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L7: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L8: This comment documents the nearby casino behavior: 1. SOUND FX & PARTICLE CANVAS ENGINE.
  // 1. SOUND FX & PARTICLE CANVAS ENGINE
// Original L9: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L10: This comment documents the nearby casino behavior: Small Web Audio and Canvas effects share one volume/mute control and need no external media files..
  /** Small Web Audio and Canvas effects share one volume/mute control and need no external media files. */
// Original L11: Defines FXEngine, the shared Web Audio and canvas-particle service used by every table and the lobby.
  class FXEngine {
// Original L12: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor() {
// Original L13: Starts with no AudioContext; browsers commonly require it to be created after a user gesture.
      this.audioCtx = null;
// Original L14: Will hold the master GainNode through which all generated sounds are mixed.
      this.masterGain = null;
// Original L15: Stores the global sound level as a 0–1 value, initially 80%.
      this.volume = 0.8;
// Original L16: Tracks whether sound output is muted independently of the volume slider.
      this.isMuted = false;
// Original L17: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L18: Finds the full-screen effects canvas used for confetti.
      this.canvas = document.getElementById('fx-canvas');
// Original L19: Gets its 2D drawing context when the canvas exists; otherwise effects can safely no-op.
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
// Original L20: Initializes the particle list that the animation loop updates and removes.
      this.particles = [];
// Original L21: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L22: Sizes the effects canvas to the viewport and installs resize handling.
      this.initCanvas();
// Original L23: Starts the perpetual requestAnimationFrame particle renderer.
      this.animateParticles();
// Original L24: Structural punctuation closes the surrounding block or statement.
    }
// Original L25: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L26: Defines lazy audio initialization so mobile/browser autoplay restrictions are respected.
    initAudio() {
// Original L27: Only creates audio once; subsequent sounds reuse the same graph.
      if (!this.audioCtx) {
// Original L28: Selects the standard AudioContext or Safari WebKit fallback.
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
// Original L29: Checks that the browser actually exposes an audio API.
        if (AudioContextClass) {
// Original L30: Creates the browser audio context after a permitted interaction.
          this.audioCtx = new AudioContextClass();
// Original L31: Creates the master gain node used as the single volume/mute control.
          this.masterGain = this.audioCtx.createGain();
// Original L32: Applies the current volume and mute state to the newly created gain node.
          this.updateGain();
// Original L33: Routes master gain output to the speakers.
          this.masterGain.connect(this.audioCtx.destination);
// Original L34: Structural punctuation closes the surrounding block or statement.
        }
// Original L35: Structural punctuation closes the surrounding block or statement.
      }
// Original L36: Checks whether browser autoplay suspended the audio context.
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
// Original L37: Requests resume so queued effects can be heard after the user interacts.
        this.audioCtx.resume();
// Original L38: Structural punctuation closes the surrounding block or statement.
      }
// Original L39: Structural punctuation closes the surrounding block or statement.
    }
// Original L40: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L41: Defines the volume setter used by settings and restored saves.
    setVolume(val) {
// Original L42: Stores the caller’s normalized 0–1 volume value.
      this.volume = val;
// Original L43: Immediately propagates that value to the master gain.
      this.updateGain();
// Original L44: Structural punctuation closes the surrounding block or statement.
    }
// Original L45: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L46: Defines the mute setter used by the settings modal.
    setMute(muted) {
// Original L47: Stores the boolean mute choice.
      this.isMuted = muted;
// Original L48: Recomputes effective gain so muting takes effect immediately.
      this.updateGain();
// Original L49: Structural punctuation closes the surrounding block or statement.
    }
// Original L50: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L51: Defines the common gain calculation for all generated sounds.
    updateGain() {
// Original L52: Avoids touching Web Audio nodes when audio is unavailable.
      if (this.masterGain && this.audioCtx) {
// Original L53: Uses zero gain when muted, otherwise the selected volume.
        const effectiveVol = this.isMuted ? 0 : this.volume;
// Original L54: Schedules the effective gain at the audio clock’s current time, avoiding abrupt stale settings.
        this.masterGain.gain.setValueAtTime(effectiveVol, this.audioCtx.currentTime);
// Original L55: Structural punctuation closes the surrounding block or statement.
      }
// Original L56: Structural punctuation closes the surrounding block or statement.
    }
// Original L57: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L58: Defines the short click sound used for controls.
    playClick() {
// Original L59: Lazily unlocks audio before creating the click.
      this.initAudio();
// Original L60: Stops when audio is unsupported or muted, so UI actions still work silently.
      if (!this.audioCtx || this.isMuted) return;
// Original L61: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L62: Creates a sine oscillator for a soft click tone.
      const osc = this.audioCtx.createOscillator();
// Original L63: Creates an envelope gain node for the click’s volume.
      const gain = this.audioCtx.createGain();
// Original L64: Chooses a sine waveform.
      osc.type = 'sine';
// Original L65: Starts the tone at 600 Hz.
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
// Original L66: Exponential pitch sweep drops 600 Hz to 100 Hz over 50 ms.
      osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);
// Original L67: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L68: Starts the click envelope at gain 0.15.
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
// Original L69: Fades the click to nearly silent gain 0.01 over 50 ms.
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);
// Original L70: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L71: Connects oscillator output into its envelope.
      osc.connect(gain);
// Original L72: Connects the envelope into the shared master gain.
      gain.connect(this.masterGain);
// Original L73: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L74: Starts the oscillator immediately.
      osc.start();
// Original L75: Stops it after 50 ms, bounding the click duration.
      osc.stop(this.audioCtx.currentTime + 0.05);
// Original L76: Structural punctuation closes the surrounding block or statement.
    }
// Original L77: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L78: Defines a reel-stop sound whose preset changes pitch and waveform by cabinet theme.
    playReelStop(soundPreset = 'classic') {
// Original L79: Updates the current casino object or shared browser state as indicated by this statement.
      this.initAudio();
// Original L80: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.audioCtx || this.isMuted) return;
// Original L81: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L82: Lists theme-specific start/end frequencies and oscillator waveforms.
      const presets = {
// Original L83: Defines configuration field `classic` with value `{ start: 180, end: 40, type: 'triangle' }`, supplying this exact symbol/theme/game setting.
        classic: { start: 180, end: 40, type: 'triangle' },
// Original L84: Defines configuration field `royal` with value `{ start: 330, end: 110, type: 'triangle' }`, supplying this exact symbol/theme/game setting.
        royal: { start: 330, end: 110, type: 'triangle' },
// Original L85: Defines configuration field `garden` with value `{ start: 520, end: 260, type: 'sine' }`, supplying this exact symbol/theme/game setting.
        garden: { start: 520, end: 260, type: 'sine' },
// Original L86: Defines configuration field `neon` with value `{ start: 760, end: 180, type: 'square' }`, supplying this exact symbol/theme/game setting.
        neon: { start: 760, end: 180, type: 'square' },
// Original L87: Defines configuration field `ocean` with value `{ start: 390, end: 95, type: 'sine' }`, supplying this exact symbol/theme/game setting.
        ocean: { start: 390, end: 95, type: 'sine' }
// Original L88: Structural punctuation closes the surrounding block or statement.
      };
// Original L89: Selects the requested preset, falling back to classic for an unknown theme.
      const preset = presets[soundPreset] || presets.classic;
// Original L90: Creates the reel-stop oscillator.
      const osc = this.audioCtx.createOscillator();
// Original L91: Creates its volume envelope.
      const gain = this.audioCtx.createGain();
// Original L92: Applies the selected waveform.
      osc.type = preset.type;
// Original L93: Starts at the preset’s upper pitch.
      osc.frequency.setValueAtTime(preset.start, this.audioCtx.currentTime);
// Original L94: Sweeps to the preset’s lower pitch over 80 ms.
      osc.frequency.exponentialRampToValueAtTime(preset.end, this.audioCtx.currentTime + 0.08);
// Original L95: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L96: Starts the reel-stop at gain 0.3.
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
// Original L97: Fades it to 0.01 over 80 ms.
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);
// Original L98: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L99: Routes oscillator through the envelope.
      osc.connect(gain);
// Original L100: Routes the envelope to master output.
      gain.connect(this.masterGain);
// Original L101: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L102: Starts the stop sound.
      osc.start();
// Original L103: Stops it after 80 ms.
      osc.stop(this.audioCtx.currentTime + 0.08);
// Original L104: Structural punctuation closes the surrounding block or statement.
    }
// Original L105: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L106: Defines the six-step rising coin-flip sound.
    playCoinFlipSound() {
// Original L107: Updates the current casino object or shared browser state as indicated by this statement.
      this.initAudio();
// Original L108: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.audioCtx || this.isMuted) return;
// Original L109: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L110: Schedules six tones, one every 100 ms.
      for (let i = 0; i < 6; i++) {
// Original L111: Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.
        const osc = this.audioCtx.createOscillator();
// Original L112: Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.
        const gain = this.audioCtx.createGain();
// Original L113: Applies this concrete value/expression `osc.type = 'sine'` to the surrounding casino engine state.
        osc.type = 'sine';
// Original L114: Raises each note by 150 Hz, beginning at 1200 Hz, to suggest spinning metal.
        osc.frequency.setValueAtTime(1200 + (i * 150), this.audioCtx.currentTime + (i * 0.1));
// Original L115: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L116: Starts each note at gain 0.1 at its offset.
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + (i * 0.1));
// Original L117: Fades each note to 0.01 after 80 ms.
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.1) + 0.08);
// Original L118: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L119: Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.
        osc.connect(gain);
// Original L120: Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.
        gain.connect(this.masterGain);
// Original L121: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L122: Starts each oscillator at its scheduled offset.
        osc.start(this.audioCtx.currentTime + (i * 0.1));
// Original L123: Stops each note 80 ms after it starts.
        osc.stop(this.audioCtx.currentTime + (i * 0.1) + 0.08);
// Original L124: Structural punctuation closes the surrounding block or statement.
      }
// Original L125: Structural punctuation closes the surrounding block or statement.
    }
// Original L126: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L127: Defines the four-note win melody.
    playWinSound(soundPreset = 'classic') {
// Original L128: Updates the current casino object or shared browser state as indicated by this statement.
      this.initAudio();
// Original L129: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.audioCtx || this.isMuted) return;
// Original L130: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L131: Provides theme-specific musical frequencies in Hz.
      const melodies = {
// Original L132: Defines configuration field `classic` with value `[523.25, 659.25, 783.99, 1046.50]`, supplying this exact symbol/theme/game setting.
        classic: [523.25, 659.25, 783.99, 1046.50],
// Original L133: Defines configuration field `royal` with value `[392, 523.25, 659.25, 783.99]`, supplying this exact symbol/theme/game setting.
        royal: [392, 523.25, 659.25, 783.99],
// Original L134: Defines configuration field `garden` with value `[440, 554.37, 659.25, 880]`, supplying this exact symbol/theme/game setting.
        garden: [440, 554.37, 659.25, 880],
// Original L135: Defines configuration field `neon` with value `[587.33, 739.99, 880, 1174.66]`, supplying this exact symbol/theme/game setting.
        neon: [587.33, 739.99, 880, 1174.66],
// Original L136: Defines configuration field `ocean` with value `[329.63, 392, 493.88, 659.25]`, supplying this exact symbol/theme/game setting.
        ocean: [329.63, 392, 493.88, 659.25]
// Original L137: Structural punctuation closes the surrounding block or statement.
      };
// Original L138: Uses the chosen theme melody, classic if unrecognized.
      const notes = melodies[soundPreset] || melodies.classic;
// Original L139: Schedules one oscillator/envelope pair per note.
      notes.forEach((freq, idx) => {
// Original L140: Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.
        const osc = this.audioCtx.createOscillator();
// Original L141: Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.
        const gain = this.audioCtx.createGain();
// Original L142: Uses triangle timbres for the win melody.
        osc.type = 'triangle';
// Original L143: Schedules each note 80 ms after the previous.
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + (idx * 0.08));
// Original L144: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L145: Starts every note at gain 0.2.
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + (idx * 0.08));
// Original L146: Fades each note over 250 ms.
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (idx * 0.08) + 0.25);
// Original L147: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L148: Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.
        osc.connect(gain);
// Original L149: Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.
        gain.connect(this.masterGain);
// Original L150: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L151: Starts each note at its scheduled time.
        osc.start(this.audioCtx.currentTime + (idx * 0.08));
// Original L152: Stops each note after its 250 ms envelope.
        osc.stop(this.audioCtx.currentTime + (idx * 0.08) + 0.25);
// Original L153: Structural punctuation closes the surrounding block or statement.
      });
// Original L154: Structural punctuation closes the surrounding block or statement.
    }
// Original L155: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L156: Defines the louder twelve-note jackpot fanfare.
    playJackpotSound() {
// Original L157: Updates the current casino object or shared browser state as indicated by this statement.
      this.initAudio();
// Original L158: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.audioCtx || this.isMuted) return;
// Original L159: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L160: Schedules twelve staggered notes 60 ms apart.
      for (let i = 0; i < 12; i++) {
// Original L161: Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.
        const osc = this.audioCtx.createOscillator();
// Original L162: Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.
        const gain = this.audioCtx.createGain();
// Original L163: Uses sawtooth waves for a bright jackpot texture.
        osc.type = 'sawtooth';
// Original L164: Raises pitch from 300 Hz by 80 Hz per note.
        osc.frequency.setValueAtTime(300 + (i * 80), this.audioCtx.currentTime + (i * 0.06));
// Original L165: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L166: Starts each fanfare note at gain 0.25.
        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + (i * 0.06));
// Original L167: Fades each note to 0.01 over 200 ms.
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.06) + 0.2);
// Original L168: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L169: Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.
        osc.connect(gain);
// Original L170: Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.
        gain.connect(this.masterGain);
// Original L171: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L172: Starts each jackpot note at its offset.
        osc.start(this.audioCtx.currentTime + (i * 0.06));
// Original L173: Stops each note after 200 ms.
        osc.stop(this.audioCtx.currentTime + (i * 0.06) + 0.2);
// Original L174: Structural punctuation closes the surrounding block or statement.
      }
// Original L175: Structural punctuation closes the surrounding block or statement.
    }
// Original L176: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L177: Defines canvas sizing for the particle effect.
    initCanvas() {
// Original L178: No canvas means no visual effect work.
      if (!this.canvas) return;
// Original L179: Creates a resize callback so effects cover the current viewport.
      const resize = () => {
// Original L180: Sets canvas pixel width to viewport width.
        this.canvas.width = window.innerWidth;
// Original L181: Sets canvas pixel height to viewport height.
        this.canvas.height = window.innerHeight;
// Original L182: Structural punctuation closes the surrounding block or statement.
      };
// Original L183: Re-sizes effects whenever the window changes dimensions.
      window.addEventListener('resize', resize);
// Original L184: Runs the resize once immediately.
      resize();
// Original L185: Structural punctuation closes the surrounding block or statement.
    }
// Original L186: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L187: Defines confetti creation; 75 particles is the default burst.
    spawnConfetti(count = 75) {
// Original L188: Skips particle creation without a canvas.
      if (!this.canvas) return;
// Original L189: Restricts confetti to the five casino accent colors.
      const colors = ['#ffd700', '#ff4d4d', '#4eef90', '#e056fd', '#00d2d3'];
// Original L190: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L191: Creates the requested number of particle objects.
      for (let i = 0; i < count; i++) {
// Original L192: Updates the current casino object or shared browser state as indicated by this statement.
        this.particles.push({
// Original L193: Starts particles around the horizontal center with ±100 px spread.
          x: this.canvas.width / 2 + (Math.random() * 200 - 100),
// Original L194: Places the burst one-third down the viewport.
          y: this.canvas.height / 3,
// Original L195: Gives each particle horizontal velocity between -6 and +6.
          vx: (Math.random() - 0.5) * 12,
// Original L196: Gives upward-biased vertical velocity; negative values initially move upward.
          vy: (Math.random() - 0.8) * 14,
// Original L197: Chooses a square size from 4 through 12 px.
          size: Math.random() * 8 + 4,
// Original L198: Randomly chooses one of the five colors.
          color: colors[Math.floor(Math.random() * colors.length)],
// Original L199: Particles begin fully opaque.
          alpha: 1,
// Original L200: Gravity adds 0.35 px/frame to downward velocity.
          gravity: 0.35,
// Original L201: Randomizes initial rotation in degrees.
          rotation: Math.random() * 360,
// Original L202: Randomizes rotational speed between -5 and +5 degrees/frame.
          vRot: (Math.random() - 0.5) * 10
// Original L203: Structural punctuation closes the surrounding block or statement.
        });
// Original L204: Structural punctuation closes the surrounding block or statement.
      }
// Original L205: Structural punctuation closes the surrounding block or statement.
    }
// Original L206: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L207: Defines the animation loop for existing particles.
    animateParticles() {
// Original L208: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.ctx) {
// Original L209: Clears the previous full-canvas frame before redrawing.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// Original L210: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L211: Iterates backward so removing expired particles does not skip the next item.
        for (let i = this.particles.length - 1; i >= 0; i--) {
// Original L212: Names the current particle for physics and drawing.
          const p = this.particles[i];
// Original L213: Advances horizontal position by velocity.
          p.x += p.vx;
// Original L214: Advances vertical position by velocity.
          p.y += p.vy;
// Original L215: Applies gravity to vertical velocity.
          p.vy += p.gravity;
// Original L216: Reduces opacity by 0.012 each frame.
          p.alpha -= 0.012;
// Original L217: Advances rotation by angular velocity.
          p.rotation += p.vRot;
// Original L218: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L219: Expires invisible or off-bottom particles.
          if (p.alpha <= 0 || p.y > this.canvas.height) {
// Original L220: Removes the expired particle from the active array.
            this.particles.splice(i, 1);
// Original L221: Skips drawing for the particle just removed.
            continue;
// Original L222: Structural punctuation closes the surrounding block or statement.
          }
// Original L223: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L224: Saves canvas drawing state before transforms.
          this.ctx.save();
// Original L225: Uses particle opacity for alpha compositing.
          this.ctx.globalAlpha = p.alpha;
// Original L226: Moves drawing origin to particle position.
          this.ctx.translate(p.x, p.y);
// Original L227: Rotates the square from degrees to radians.
          this.ctx.rotate((p.rotation * Math.PI) / 180);
// Original L228: Selects the particle color.
          this.ctx.fillStyle = p.color;
// Original L229: Draws a centered square with the particle size.
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
// Original L230: Restores the prior canvas transform/state.
          this.ctx.restore();
// Original L231: Structural punctuation closes the surrounding block or statement.
        }
// Original L232: Structural punctuation closes the surrounding block or statement.
      }
// Original L233: Schedules the next frame, keeping confetti animated.
      requestAnimationFrame(() => this.animateParticles());
// Original L234: Structural punctuation closes the surrounding block or statement.
    }
// Original L235: Structural punctuation closes the surrounding block or statement.
  }
// Original L236: Creates the singleton FX service used by all managers.
  const FX = new FXEngine();
// Original L237: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L238: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L239: This comment documents the nearby casino behavior: 2. BLACKJACK 21 TABLE ENGINE.
  // 2. BLACKJACK 21 TABLE ENGINE
// Original L240: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L241: Documents blackjack as mutually exclusive BETTING, PLAYER_TURN, DEALER_TURN, and ENDED states.
  /** Blackjack is a state machine so betting, player actions, dealer play, and settlement cannot overlap. */
// Original L242: Defines the blackjack table engine.
  class BlackjackEngine {
// Original L243: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) {
// Original L244: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L245: Starts each hand with a $10 wager.
      this.bet = 10;
// Original L246: Holds the shuffled remaining cards.
      this.deck = [];
// Original L247: Stores the player’s cards for the current hand.
      this.playerHand = [];
// Original L248: Stores the dealer’s cards for the current hand.
      this.dealerHand = [];
// Original L249: Initial state accepts wagers; later states gate legal actions.
      this.gameState = 'BETTING'; // BETTING, PLAYER_TURN, DEALER_TURN, ENDED
// Original L250: Keeps dealer’s second card hidden until player action is complete.
      this.dealerHidden = true;
// Original L251: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L252: Looks up blackjack controls and score areas.
      this.bindElements();
// Original L253: Initializes listeners only when this page has a deal button.
      if (this.dealBtn) this.init();
// Original L254: Structural punctuation closes the surrounding block or statement.
    }
// Original L255: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L256: Defines DOM lookup for blackjack controls.
    bindElements() {
// Original L257: Stores the result of `document.getElementById('bet-bj-display')` in `this.betEl` for the current casino operation.
      this.betEl = document.getElementById('bet-bj-display');
// Original L258: Stores the result of `document.getElementById('status-bj')` in `this.statusEl` for the current casino operation.
      this.statusEl = document.getElementById('status-bj');
// Original L259: Stores the result of `document.getElementById('btn-bj-deal')` in `this.dealBtn` for the current casino operation.
      this.dealBtn = document.getElementById('btn-bj-deal');
// Original L260: Stores the result of `document.getElementById('btn-bj-hit')` in `this.hitBtn` for the current casino operation.
      this.hitBtn = document.getElementById('btn-bj-hit');
// Original L261: Stores the result of `document.getElementById('btn-bj-stand')` in `this.standBtn` for the current casino operation.
      this.standBtn = document.getElementById('btn-bj-stand');
// Original L262: Stores the result of `document.getElementById('btn-bj-double')` in `this.doubleBtn` for the current casino operation.
      this.doubleBtn = document.getElementById('btn-bj-double');
// Original L263: Stores the result of `document.getElementById('btn-bj-minus')` in `this.minusBtn` for the current casino operation.
      this.minusBtn = document.getElementById('btn-bj-minus');
// Original L264: Stores the result of `document.getElementById('btn-bj-plus')` in `this.plusBtn` for the current casino operation.
      this.plusBtn = document.getElementById('btn-bj-plus');
// Original L265: Stores the result of `document.getElementById('btn-bj-max')` in `this.maxBtn` for the current casino operation.
      this.maxBtn = document.getElementById('btn-bj-max');
// Original L266: Stores the result of `document.getElementById('btn-bj-clear')` in `this.clearBtn` for the current casino operation.
      this.clearBtn = document.getElementById('btn-bj-clear');
// Original L267: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L268: Stores the result of `document.getElementById('bj-dealer-cards')` in `this.dealerCardsEl` for the current casino operation.
      this.dealerCardsEl = document.getElementById('bj-dealer-cards');
// Original L269: Stores the result of `document.getElementById('bj-player-cards')` in `this.playerCardsEl` for the current casino operation.
      this.playerCardsEl = document.getElementById('bj-player-cards');
// Original L270: Stores the result of `document.getElementById('bj-dealer-score')` in `this.dealerScoreEl` for the current casino operation.
      this.dealerScoreEl = document.getElementById('bj-dealer-score');
// Original L271: Stores the result of `document.getElementById('bj-player-score')` in `this.playerScoreEl` for the current casino operation.
      this.playerScoreEl = document.getElementById('bj-player-score');
// Original L272: Structural punctuation closes the surrounding block or statement.
    }
// Original L273: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L274: Performs initial rendering and binds blackjack events.
    init() {
// Original L275: Displays the initial $10 betting state.
      this.updateUI();
// Original L276: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L277: Deals only after the deal button is clicked.
      this.dealBtn.addEventListener('click', () => this.startHand());
// Original L278: Routes hit clicks to playerHit.
      this.hitBtn.addEventListener('click', () => this.playerHit());
// Original L279: Routes stand clicks to playerStand.
      this.standBtn.addEventListener('click', () => this.playerStand());
// Original L280: Routes double-down clicks to playerDoubleDown.
      this.doubleBtn.addEventListener('click', () => this.playerDoubleDown());
// Original L281: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L282: Creates the shared bet-change guard for betting phase only.
      const changeBet = action => {
// Original L283: Prevents changing the wager during a hand.
        if (this.gameState !== 'BETTING') return;
// Original L284: Plays feedback for a valid bet-control action.
        FX.playClick();
// Original L285: Computes and stores the new wager.
        this.bet = action();
// Original L286: Refreshes wager buttons and wallet display.
        this.updateUI();
// Original L287: Structural punctuation closes the surrounding block or statement.
      };
// Original L288: Clear sets the blackjack wager to zero.
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
// Original L289: Max chooses the lesser of wallet and player maxBet.
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
// Original L290: Minus delegates the step-down rule to GameRules.
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
// Original L291: Plus delegates the step-up rule while respecting balance and maxBet.
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
// Original L292: Structural punctuation closes the surrounding block or statement.
    }
// Original L293: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L294: Builds a fresh standard 52-card deck.
    createDeck() {
// Original L295: Defines the four suits and their red/black display metadata.
      const suits = [
// Original L296: Defines configuration field `{ symbol` with value `'♠', isRed: false }`, supplying this exact symbol/theme/game setting.
        { symbol: '♠', isRed: false },
// Original L297: Defines configuration field `{ symbol` with value `'♥', isRed: true }`, supplying this exact symbol/theme/game setting.
        { symbol: '♥', isRed: true },
// Original L298: Defines configuration field `{ symbol` with value `'♦', isRed: true }`, supplying this exact symbol/theme/game setting.
        { symbol: '♦', isRed: true },
// Original L299: Defines configuration field `{ symbol` with value `'♣', isRed: false }`, supplying this exact symbol/theme/game setting.
        { symbol: '♣', isRed: false }
// Original L300: Applies this concrete value/expression `]` to the surrounding casino engine state.
      ];
// Original L301: Defines thirteen ranks; face cards and ace are valued later.
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// Original L302: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L303: Discards any old deck before rebuilding.
      this.deck = [];
// Original L304: Iterates each suit.
      suits.forEach(suit => {
// Original L305: Adds every rank for the current suit.
        values.forEach(val => {
// Original L306: Stores rank, suit glyph, and color flag for one card.
          this.deck.push({ value: val, suit: suit.symbol, isRed: suit.isRed });
// Original L307: Structural punctuation closes the surrounding block or statement.
        });
// Original L308: Structural punctuation closes the surrounding block or statement.
      });
// Original L309: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L310: Uses Fisher–Yates to make an unbiased in-place shuffle.
      // Fisher-Yates Shuffle
// Original L311: Walks backward through all positions except index zero.
      for (let i = this.deck.length - 1; i > 0; i--) {
// Original L312: Chooses a random remaining position from 0 through i.
        const j = Math.floor(Math.random() * (i + 1));
// Original L313: Swaps current card with the selected card.
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
// Original L314: Structural punctuation closes the surrounding block or statement.
      }
// Original L315: Structural punctuation closes the surrounding block or statement.
    }
// Original L316: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L317: Defines drawing from the shuffled deck.
    drawCard() {
// Original L318: Rebuilds if all cards have been consumed.
      if (this.deck.length === 0) this.createDeck();
// Original L319: Pops the top card from the deck.
      return this.deck.pop();
// Original L320: Structural punctuation closes the surrounding block or statement.
    }
// Original L321: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L322: Computes blackjack totals with soft-ace adjustment.
    calculateHandValue(hand) {
// Original L323: Accumulates the raw total.
      let value = 0;
// Original L324: Counts aces that can be downgraded from 11 to 1.
      let aces = 0;
// Original L325: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L326: Examines every card in the hand.
      hand.forEach(card => {
// Original L327: Identifies an ace.
        if (card.value === 'A') {
// Original L328: Records an ace for possible downgrade.
          aces++;
// Original L329: Initially values an ace at 11.
          value += 11;
// Original L330: Values J/Q/K at 10.
        } else if (['K', 'Q', 'J'].includes(card.value)) {
// Original L331: Applies this concrete value/expression `value += 10` to the surrounding casino engine state.
          value += 10;
// Original L332: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L333: Parses numbered ranks as their integer value.
          value += parseInt(card.value, 10);
// Original L334: Structural punctuation closes the surrounding block or statement.
        }
// Original L335: Structural punctuation closes the surrounding block or statement.
      });
// Original L336: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L337: Downgrades aces while the total busts.
      while (value > 21 && aces > 0) {
// Original L338: Changes one ace from 11 to 1 by subtracting 10.
        value -= 10;
// Original L339: Consumes one available ace downgrade.
        aces--;
// Original L340: Structural punctuation closes the surrounding block or statement.
      }
// Original L341: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L342: Returns the best total found.
      return value;
// Original L343: Structural punctuation closes the surrounding block or statement.
    }
// Original L344: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L345: Starts a hand only when not settling, in BETTING, and the wager passes legal/balance/max checks.
    startHand() {
// Original L346: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.hub.isSettling || this.gameState !== 'BETTING' || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;
// Original L347: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L348: Plays the deal sound.
      FX.playClick();
// Original L349: Debits the initial wager from the shared wallet.
      this.hub.modifyBalance(-this.bet);
// Original L350: Adds 1.5% of the wager to the progressive jackpot.
      JackpotManager.contribute(this.bet * 0.015);
// Original L351: Awards wager XP based on the stake.
      window.XP.addWagerXP(this.bet);
// Original L352: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L353: Creates and shuffles a new deck for the hand.
      this.createDeck();
// Original L354: Deals two cards to the player.
      this.playerHand = [this.drawCard(), this.drawCard()];
// Original L355: Deals two cards to the dealer.
      this.dealerHand = [this.drawCard(), this.drawCard()];
// Original L356: Hides dealer hole card during player turn.
      this.dealerHidden = true;
// Original L357: Moves state to PLAYER_TURN.
      this.gameState = 'PLAYER_TURN';
// Original L358: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L359: Shows available player actions.
      this.setStatus('YOUR TURN — HIT, STAND, OR DOUBLE', 'status-spinning');
// Original L360: Renders both hands with the hole card concealed.
      this.renderHands();
// Original L361: Refreshes controls and balance.
      this.updateUI();
// Original L362: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L363: Checks for natural blackjack immediately after the deal.
      // Check for Natural Blackjack
// Original L364: Recognizes a two-card total of exactly 21.
      if (this.calculateHandValue(this.playerHand) === 21) {
// Original L365: Reveals the dealer before natural settlement.
        this.dealerHidden = false;
// Original L366: Updates the current casino object or shared browser state as indicated by this statement.
        this.renderHands();
// Original L367: Checks whether dealer also has natural 21.
        if (this.calculateHandValue(this.dealerHand) === 21) {
// Original L368: Returns the original stake for a push.
          this.endHand('PUSH! Both hit Natural Blackjack.', 'status-spinning', this.bet);
// Original L369: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L370: Calculates blackjack return as stake plus 1.5× profit, i.e. 2.5× stake total.
          const winAmount = this.bet + (this.bet * 1.5);
// Original L371: Settles the player natural as a win.
          this.endHand(`🎉 BLACKJACK! WON +$${winAmount}!`, 'status-win', winAmount);
// Original L372: Structural punctuation closes the surrounding block or statement.
        }
// Original L373: Structural punctuation closes the surrounding block or statement.
      }
// Original L374: Structural punctuation closes the surrounding block or statement.
    }
// Original L375: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L376: Defines the hit action.
    playerHit() {
// Original L377: Allows hit only during PLAYER_TURN.
      if (this.gameState !== 'PLAYER_TURN') return;
// Original L378: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L379: Plays hit feedback.
      FX.playClick();
// Original L380: Adds one drawn card to player hand.
      this.playerHand.push(this.drawCard());
// Original L381: Updates rendered cards.
      this.renderHands();
// Original L382: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L383: Checks whether player total exceeded 21.
      if (this.calculateHandValue(this.playerHand) > 21) {
// Original L384: Reveals dealer after player busts.
        this.dealerHidden = false;
// Original L385: Updates the current casino object or shared browser state as indicated by this statement.
        this.renderHands();
// Original L386: Settles a bust with zero return.
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
// Original L387: Structural punctuation closes the surrounding block or statement.
      }
// Original L388: Structural punctuation closes the surrounding block or statement.
    }
// Original L389: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L390: Defines double-down: one extra equal stake, one card, then forced stand.
    playerDoubleDown() {
// Original L391: Requires player turn, enough wallet for second stake, and exactly two original cards.
      if (this.gameState !== 'PLAYER_TURN' || this.hub.balance < this.bet || this.playerHand.length !== 2) return;
// Original L392: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L393: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
      FX.playClick();
// Original L394: Debits the extra stake.
      this.hub.modifyBalance(-this.bet);
// Original L395: Adds the second stake’s 1.5% contribution.
      JackpotManager.contribute(this.bet * 0.015);
// Original L396: Awards XP for the additional stake.
      window.XP.addWagerXP(this.bet);
// Original L397: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L398: Doubles the wager used for settlement.
      this.bet *= 2;
// Original L399: Deals the single double-down card.
      this.playerHand.push(this.drawCard());
// Original L400: Updates the current casino object or shared browser state as indicated by this statement.
      this.renderHands();
// Original L401: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L402: Tests whether the doubled hand busts.
      if (this.calculateHandValue(this.playerHand) > 21) {
// Original L403: Reveals dealer on bust.
        this.dealerHidden = false;
// Original L404: Updates the current casino object or shared browser state as indicated by this statement.
        this.renderHands();
// Original L405: Settles double-down bust with no return.
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
// Original L406: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
      } else {
// Original L407: Otherwise forces dealer resolution after exactly one double card.
        this.playerStand();
// Original L408: Structural punctuation closes the surrounding block or statement.
      }
// Original L409: Structural punctuation closes the surrounding block or statement.
    }
// Original L410: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L411: Defines asynchronous stand/dealer resolution.
    async playerStand() {
// Original L412: Rejects stand outside PLAYER_TURN.
      if (this.gameState !== 'PLAYER_TURN') return;
// Original L413: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L414: Plays stand feedback.
      FX.playClick();
// Original L415: Transitions to DEALER_TURN.
      this.gameState = 'DEALER_TURN';
// Original L416: Reveals dealer hand.
      this.dealerHidden = false;
// Original L417: Updates the current casino object or shared browser state as indicated by this statement.
      this.renderHands();
// Original L418: Displays dealer draw status.
      this.setStatus('DEALER IS DRAWING...', 'status-spinning');
// Original L419: Updates controls while dealer acts.
      this.updateUI();
// Original L420: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L421: Dealer must draw until total reaches at least 17.
      while (this.calculateHandValue(this.dealerHand) < 17) {
// Original L422: Waits 600 ms between dealer cards for visible pacing.
        await new Promise(r => setTimeout(r, 600));
// Original L423: Draws another dealer card.
        this.dealerHand.push(this.drawCard());
// Original L424: Uses a reel-stop sound for each dealer draw.
        FX.playReelStop();
// Original L425: Renders the new dealer hand.
        this.renderHands();
// Original L426: Structural punctuation closes the surrounding block or statement.
      }
// Original L427: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L428: Compares final totals and pays the result.
      this.evaluateOutcome();
// Original L429: Structural punctuation closes the surrounding block or statement.
    }
// Original L430: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L431: Defines blackjack outcome comparison.
    evaluateOutcome() {
// Original L432: Computes player total.
      const pVal = this.calculateHandValue(this.playerHand);
// Original L433: Computes dealer total.
      const dVal = this.calculateHandValue(this.dealerHand);
// Original L434: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L435: Checks dealer bust above 21.
      if (dVal > 21) {
// Original L436: Pays 2× stake when dealer busts, including returned stake plus equal winnings.
        this.endHand(`DEALER BUSTS (${dVal})! WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
// Original L437: Checks player total greater than dealer without busting.
      } else if (pVal > dVal) {
// Original L438: Pays 2× stake for a normal win.
        this.endHand(`WINNER! ${pVal} BEATS ${dVal}. WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
// Original L439: Checks equal totals for a push.
      } else if (pVal === dVal) {
// Original L440: Returns exactly the stake on a push.
        this.endHand(`PUSH (${pVal} = ${dVal})! Bet refunded.`, 'status-spinning', this.bet);
// Original L441: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
      } else {
// Original L442: Pays zero when dealer wins.
        this.endHand(`DEALER WINS (${dVal} vs ${pVal}).`, 'status-loss', 0);
// Original L443: Structural punctuation closes the surrounding block or statement.
      }
// Original L444: Structural punctuation closes the surrounding block or statement.
    }
// Original L445: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L446: Defines one idempotent settlement path.
    endHand(message, statusClass, payoutAmount) {
// Original L447: Rejects duplicate settlement or calls after returning to betting.
      if (this.gameState === 'ENDED' || this.gameState === 'BETTING') return;
// Original L448: Marks hand ended before side effects.
      this.gameState = 'ENDED';
// Original L449: Records stake and payout in accomplishments.
      window.Accomplishments?.recordGame('blackjack', { stake: this.bet, payout: payoutAmount });
// Original L450: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L451: Checks whether any positive return is due.
      if (payoutAmount > 0) {
// Original L452: Credits the payout to the shared wallet.
        this.hub.modifyBalance(payoutAmount);
// Original L453: Only winning settlements trigger celebration.
        if (statusClass === 'status-win') {
// Original L454: Plays the win melody.
          FX.playWinSound();
// Original L455: Spawns 50 confetti particles.
          FX.spawnConfetti(50);
// Original L456: Structural punctuation closes the surrounding block or statement.
        }
// Original L457: Uses a click sound for zero-return outcomes.
      } else {
// Original L458: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L459: Structural punctuation closes the surrounding block or statement.
      }
// Original L460: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L461: Displays outcome text and styling.
      this.setStatus(message, statusClass);
// Original L462: Refreshes buttons and global balance.
      this.updateUI();
// Original L463: Structural punctuation closes the surrounding block or statement.
    }
// Original L464: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L465: Defines dealer/player DOM rendering.
    renderHands() {
// Original L466: This comment documents the nearby casino behavior: Render Dealer Cards.
      // Render Dealer Cards
// Original L467: Clears old dealer cards.
      this.dealerCardsEl.innerHTML = '';
// Original L468: Iterates dealer cards.
      this.dealerHand.forEach((card, idx) => {
// Original L469: Hides only dealer index 1 while dealerHidden is true.
        if (idx === 1 && this.dealerHidden) {
// Original L470: Creates a visual card-back element.
          const cardEl = document.createElement('div');
// Original L471: Applies card-back styling.
          cardEl.className = 'playing-card card-back';
// Original L472: Adds the hidden card to dealer display.
          this.dealerCardsEl.appendChild(cardEl);
// Original L473: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L474: Adds a visible card element otherwise.
          this.dealerCardsEl.appendChild(this.createCardElement(card));
// Original L475: Structural punctuation closes the surrounding block or statement.
        }
// Original L476: Structural punctuation closes the surrounding block or statement.
      });
// Original L477: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L478: Shows ? for hidden dealer score, otherwise calculated total.
      this.dealerScoreEl.textContent = this.dealerHidden ? '?' : this.calculateHandValue(this.dealerHand);
// Original L479: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L480: This comment documents the nearby casino behavior: Render Player Cards.
      // Render Player Cards
// Original L481: Clears old player cards.
      this.playerCardsEl.innerHTML = '';
// Original L482: Iterates player cards.
      this.playerHand.forEach(card => {
// Original L483: Appends each visible player card.
        this.playerCardsEl.appendChild(this.createCardElement(card));
// Original L484: Structural punctuation closes the surrounding block or statement.
      });
// Original L485: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L486: Displays the player total.
      this.playerScoreEl.textContent = this.calculateHandValue(this.playerHand);
// Original L487: Structural punctuation closes the surrounding block or statement.
    }
// Original L488: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L489: Builds one card’s DOM representation.
    createCardElement(card) {
// Original L490: Creates a card container.
      const el = document.createElement('div');
// Original L491: Adds playing-card and conditional red-suit classes.
      el.className = `playing-card ${card.isRed ? 'red-suit' : ''}`;
// Original L492: Creates rank/suit/rank markup for the card face.
// Original L493: Applies this concrete value/expression `<div class="card-top">${card.value}</div>` to the surrounding casino engine state.
// Original L494: Applies this concrete value/expression `<div class="card-center">${card.suit}</div>` to the surrounding casino engine state.
// Original L495: Applies this concrete value/expression `<div class="card-bottom">${card.value}</div>` to the surrounding casino engine state.
// Original L496: Applies this concrete value/expression ``` to the surrounding casino engine state.
      el.innerHTML = `
        <div class="card-top">${card.value}</div>
        <div class="card-center">${card.suit}</div>
        <div class="card-bottom">${card.value}</div>
      `;
// Original L497: Returns the card element for insertion.
      return el;
// Original L498: Structural punctuation closes the surrounding block or statement.
    }
// Original L499: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L500: Defines blackjack status rendering.
    setStatus(text, statusClass) {
// Original L501: Sets visible status text.
      this.statusEl.textContent = text;
// Original L502: Resets status classes before applying the new result class.
      this.statusEl.className = 'status-banner';
// Original L503: Adds win/loss/spinning styling when supplied.
      if (statusClass) this.statusEl.classList.add(statusClass);
// Original L504: Structural punctuation closes the surrounding block or statement.
    }
// Original L505: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L506: Defines control state synchronization.
    updateUI() {
// Original L507: Formats wager using cent-safe slot formatting.
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
// Original L508: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L509: Treats BETTING and ENDED as wager/deal phases.
      const isBetting = this.gameState === 'BETTING' || this.gameState === 'ENDED';
// Original L510: Identifies the player-action phase.
      const isPlayerTurn = this.gameState === 'PLAYER_TURN';
// Original L511: Disables max when not betting, no legal funds, or already at legal maximum.
      this.maxBtn.disabled = !isBetting || window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet) === 0 || this.bet === window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
// Original L512: Disables clear when not betting or wager is already zero.
      this.clearBtn.disabled = !isBetting || this.bet === 0;
// Original L513: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L514: Shows deal controls in betting/ended phases.
      if (isBetting) {
// Original L515: Shows the deal button.
        this.dealBtn.classList.replace('hidden-view', 'active-view');
// Original L516: Hides hit.
        this.hitBtn.classList.replace('active-view', 'hidden-view');
// Original L517: Hides stand.
        this.standBtn.classList.replace('active-view', 'hidden-view');
// Original L518: Hides double.
        this.doubleBtn.classList.replace('active-view', 'hidden-view');
// Original L519: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L520: Enables deal only when GameRules says the wager is legal.
        this.dealBtn.disabled = !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
// Original L521: Prevents decreasing below the $5 blackjack floor.
        this.minusBtn.disabled = this.bet <= 5;
// Original L522: Prevents increasing beyond computed maximum.
        this.plusBtn.disabled = this.bet >= window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
// Original L523: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L524: Handles the post-hand ENDED display.
        if (this.gameState === 'ENDED') {
// Original L525: Changes deal label to DEAL AGAIN.
          this.dealBtn.textContent = 'DEAL AGAIN';
// Original L526: Immediately returns the state to BETTING after preparing that label.
          this.gameState = 'BETTING';
// Original L527: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L528: Uses DEAL HAND for a fresh betting phase.
          this.dealBtn.textContent = 'DEAL HAND';
// Original L529: Structural punctuation closes the surrounding block or statement.
        }
// Original L530: Handles player turn controls.
      } else if (isPlayerTurn) {
// Original L531: Hides deal during a hand.
        this.dealBtn.classList.replace('active-view', 'hidden-view');
// Original L532: Shows hit.
        this.hitBtn.classList.replace('hidden-view', 'active-view');
// Original L533: Shows stand.
        this.standBtn.classList.replace('hidden-view', 'active-view');
// Original L534: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L535: Allows double only with two cards and enough wallet for the second stake.
        if (this.playerHand.length === 2 && this.hub.balance >= this.bet) {
// Original L536: Shows double when legal.
          this.doubleBtn.classList.replace('hidden-view', 'active-view');
// Original L537: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L538: Hides double otherwise.
          this.doubleBtn.classList.replace('active-view', 'hidden-view');
// Original L539: Structural punctuation closes the surrounding block or statement.
        }
// Original L540: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L541: Freezes minus while a hand is active.
        this.minusBtn.disabled = true;
// Original L542: Freezes plus while a hand is active.
        this.plusBtn.disabled = true;
// Original L543: Handles dealer-turn controls.
      } else {
// Original L544: This comment documents the nearby casino behavior: Dealer turn.
        // Dealer turn
// Original L545: Hides hit while dealer draws.
        this.hitBtn.classList.replace('active-view', 'hidden-view');
// Original L546: Hides stand while dealer draws.
        this.standBtn.classList.replace('active-view', 'hidden-view');
// Original L547: Hides double while dealer draws.
        this.doubleBtn.classList.replace('active-view', 'hidden-view');
// Original L548: Structural punctuation closes the surrounding block or statement.
      }
// Original L549: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L550: Refreshes the shared wallet display.
      this.hub.updateGlobalUI();
// Original L551: Structural punctuation closes the surrounding block or statement.
    }
// Original L552: Structural punctuation closes the surrounding block or statement.
  }
// Original L553: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L554: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L555: This comment documents the nearby casino behavior: 3. DAILY WHEEL MANAGER.
  // 3. DAILY WHEEL MANAGER
// Original L556: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L557: This comment documents the nearby casino behavior: Draws the daily bonus wheel on Canvas and enforces a 24-hour cooldown using the active player save..
  /** Draws the daily bonus wheel on Canvas and enforces a 24-hour cooldown using the active player save. */
// Original L558: Defines the daily wheel manager with an eight-slice reward list and 24-hour cooldown.
  class DailyWheelManager {
// Original L559: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) {
// Original L560: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L561: Lists each wheel slice’s label, chip amount, and drawing color.
      this.slices = [
// Original L562: Defines configuration field `{ label` with value `'$50',   amount: 50,   color: '#e74c3c' }`, supplying this exact symbol/theme/game setting.
        { label: '$50',   amount: 50,   color: '#e74c3c' },
// Original L563: Defines configuration field `{ label` with value `'$100',  amount: 100,  color: '#3498db' }`, supplying this exact symbol/theme/game setting.
        { label: '$100',  amount: 100,  color: '#3498db' },
// Original L564: Defines configuration field `{ label` with value `'$250',  amount: 250,  color: '#2ecc71' }`, supplying this exact symbol/theme/game setting.
        { label: '$250',  amount: 250,  color: '#2ecc71' },
// Original L565: Defines configuration field `{ label` with value `'$500',  amount: 500,  color: '#9b59b6' }`, supplying this exact symbol/theme/game setting.
        { label: '$500',  amount: 500,  color: '#9b59b6' },
// Original L566: Defines configuration field `{ label` with value `'$150',  amount: 150,  color: '#e67e22' }`, supplying this exact symbol/theme/game setting.
        { label: '$150',  amount: 150,  color: '#e67e22' },
// Original L567: Defines configuration field `{ label` with value `'$1,000',amount: 1000, color: '#f1c40f' }`, supplying this exact symbol/theme/game setting.
        { label: '$1,000',amount: 1000, color: '#f1c40f' },
// Original L568: Defines configuration field `{ label` with value `'$75',   amount: 75,   color: '#1abc9c' }`, supplying this exact symbol/theme/game setting.
        { label: '$75',   amount: 75,   color: '#1abc9c' },
// Original L569: Defines configuration field `{ label` with value `'$300',  amount: 300,  color: '#34495e' }`, supplying this exact symbol/theme/game setting.
        { label: '$300',  amount: 300,  color: '#34495e' }
// Original L570: Applies this concrete value/expression `]` to the surrounding casino engine state.
      ];
// Original L571: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L572: Starts wheel rotation at angle zero.
      this.currentAngle = 0;
// Original L573: Tracks whether animation is running.
      this.isSpinning = false;
// Original L574: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L575: Finds wheel modal controls and canvas.
      this.bindElements();
// Original L576: Binds open, close, and spin events.
      this.initEvents();
// Original L577: Draws the wheel in its initial position.
      this.drawWheel(0);
// Original L578: Starts the one-second cooldown display timer.
      this.startTimerInterval();
// Original L579: Structural punctuation closes the surrounding block or statement.
    }
// Original L580: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L581: Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.
    bindElements() {
// Original L582: Stores the result of `document.getElementById('modal-wheel')` in `this.modalEl` for the current casino operation.
      this.modalEl = document.getElementById('modal-wheel');
// Original L583: Stores the result of `document.getElementById('btn-open-wheel')` in `this.openBtn` for the current casino operation.
      this.openBtn = document.getElementById('btn-open-wheel');
// Original L584: Stores the result of `document.getElementById('btn-close-wheel')` in `this.closeBtn` for the current casino operation.
      this.closeBtn = document.getElementById('btn-close-wheel');
// Original L585: Stores the result of `document.getElementById('btn-spin-wheel')` in `this.spinBtn` for the current casino operation.
      this.spinBtn = document.getElementById('btn-spin-wheel');
// Original L586: Stores the result of `document.getElementById('wheel-cooldown-timer')` in `this.timerEl` for the current casino operation.
      this.timerEl = document.getElementById('wheel-cooldown-timer');
// Original L587: Stores the result of `document.getElementById('wheel-canvas')` in `this.canvas` for the current casino operation.
      this.canvas = document.getElementById('wheel-canvas');
// Original L588: Stores the result of `this.canvas ? this.canvas.getContext('2d') : null` in `this.ctx` for the current casino operation.
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
// Original L589: Structural punctuation closes the surrounding block or statement.
    }
// Original L590: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L591: Invokes `initEvents` here so the surrounding casino workflow performs the operation represented by this call.
    initEvents() {
// Original L592: Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.
      this.openBtn?.addEventListener('click', () => {
// Original L593: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L594: Updates the current casino object or shared browser state as indicated by this statement.
        this.updateUI();
// Original L595: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('hidden-view', 'active-view');
// Original L596: Structural punctuation closes the surrounding block or statement.
      });
// Original L597: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L598: Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.
      this.closeBtn?.addEventListener('click', () => {
// Original L599: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L600: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('active-view', 'hidden-view');
// Original L601: Structural punctuation closes the surrounding block or statement.
      });
// Original L602: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L603: Stores the result of `> this.startSpin())` in `this.spinBtn?.addEventListener('click', ()` for the current casino operation.
      this.spinBtn?.addEventListener('click', () => this.startSpin());
// Original L604: Structural punctuation closes the surrounding block or statement.
    }
// Original L605: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L606: Defines canvas rendering for all wheel slices.
    drawWheel(angleOffset) {
// Original L607: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.ctx || !this.canvas) return;
// Original L608: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L609: Uses the eight configured rewards.
      const numSlices = this.slices.length;
// Original L610: Divides a full 2π turn into equal slice arcs.
      const arc = (Math.PI * 2) / numSlices;
// Original L611: Centers drawing horizontally.
      const centerX = this.canvas.width / 2;
// Original L612: Centers drawing vertically.
      const centerY = this.canvas.height / 2;
// Original L613: Leaves a 10 px canvas margin.
      const radius = centerX - 10;
// Original L614: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L615: Clears the previous wheel frame.
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
// Original L616: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L617: Draws every slice.
      for (let i = 0; i < numSlices; i++) {
// Original L618: Offsets each slice by the current rotation.
        const angle = angleOffset + (i * arc);
// Original L619: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L620: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.beginPath();
// Original L621: Stores the result of `this.slices[i].color` in `this.ctx.fillStyle` for the current casino operation.
        this.ctx.fillStyle = this.slices[i].color;
// Original L622: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.moveTo(centerX, centerY);
// Original L623: Draws one wedge from angle through angle plus one arc.
        this.ctx.arc(centerX, centerY, radius, angle, angle + arc);
// Original L624: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.fill();
// Original L625: Stores the result of `2` in `this.ctx.lineWidth` for the current casino operation.
        this.ctx.lineWidth = 2;
// Original L626: Stores the result of `'#ffffff'` in `this.ctx.strokeStyle` for the current casino operation.
        this.ctx.strokeStyle = '#ffffff';
// Original L627: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.stroke();
// Original L628: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L629: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.save();
// Original L630: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.translate(centerX, centerY);
// Original L631: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.rotate(angle + arc / 2);
// Original L632: Stores the result of `'right'` in `this.ctx.textAlign` for the current casino operation.
        this.ctx.textAlign = 'right';
// Original L633: Stores the result of `'#ffffff'` in `this.ctx.fillStyle` for the current casino operation.
        this.ctx.fillStyle = '#ffffff';
// Original L634: Stores the result of `'bold 15px Segoe UI'` in `this.ctx.font` for the current casino operation.
        this.ctx.font = 'bold 15px Segoe UI';
// Original L635: Writes the reward label near the wedge edge.
        this.ctx.fillText(this.slices[i].label, radius - 20, 5);
// Original L636: Updates the current casino object or shared browser state as indicated by this statement.
        this.ctx.restore();
// Original L637: Structural punctuation closes the surrounding block or statement.
      }
// Original L638: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L639: Begins the center hub circle.
      this.ctx.beginPath();
// Original L640: Uses a 25 px radius for the hub.
      this.ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
// Original L641: Stores the result of `'#181820'` in `this.ctx.fillStyle` for the current casino operation.
      this.ctx.fillStyle = '#181820';
// Original L642: Updates the current casino object or shared browser state as indicated by this statement.
      this.ctx.fill();
// Original L643: Stores the result of `4` in `this.ctx.lineWidth` for the current casino operation.
      this.ctx.lineWidth = 4;
// Original L644: Stores the result of `'#ffd700'` in `this.ctx.strokeStyle` for the current casino operation.
      this.ctx.strokeStyle = '#ffd700';
// Original L645: Updates the current casino object or shared browser state as indicated by this statement.
      this.ctx.stroke();
// Original L646: Structural punctuation closes the surrounding block or statement.
    }
// Original L647: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L648: Starts one eligible wheel spin.
    startSpin() {
// Original L649: Blocks spins during settlement, another spin, or remaining cooldown.
      if (this.hub.isSettling || this.isSpinning || this.getRemainingCooldown() > 0) return;
// Original L650: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L651: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
      FX.playClick();
// Original L652: Marks animation active.
      this.isSpinning = true;
// Original L653: Disables the spin button against duplicate requests.
      this.spinBtn.disabled = true;
// Original L654: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L655: Randomly selects one reward index.
      const targetSliceIndex = Math.floor(Math.random() * this.slices.length);
// Original L656: Computes one equal slice arc.
      const sliceArc = (Math.PI * 2) / this.slices.length;
// Original L657: Chooses six full turns plus the selected slice alignment under the pointer.
      const targetAngle = (Math.PI * 2 * 6) - (targetSliceIndex * sliceArc) - (sliceArc / 2) - (Math.PI / 2);
// Original L658: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L659: Records the animation start timestamp.
      const startTime = performance.now();
// Original L660: Runs the wheel for 4000 ms.
      const duration = 4000;
// Original L661: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L662: Stores the result of `(now) => {` in `const animate` for the current casino operation.
      const animate = (now) => {
// Original L663: Computes elapsed animation time.
        const elapsed = now - startTime;
// Original L664: Clamps progress to [0,1].
        const progress = Math.min(1, elapsed / duration);
// Original L665: Applies cubic ease-out, fast initially and slow at the end.
        const easeOut = 1 - Math.pow(1 - progress, 3);
// Original L666: Converts eased progress into the current angle.
        this.currentAngle = easeOut * targetAngle;
// Original L667: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L668: Redraws at that angle.
        this.drawWheel(this.currentAngle);
// Original L669: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L670: Continues frames until complete.
        if (progress < 1) {
// Original L671: Schedules the shown delayed or next-frame casino work.
          requestAnimationFrame(animate);
// Original L672: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L673: Marks wheel idle at completion.
          this.isSpinning = false;
// Original L674: Stores the current time as lastSpinTime.
          this.hub.player.lastSpinTime = Date.now();
// Original L675: Persists cooldown state.
          this.saveState();
// Original L676: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L677: Gets the selected reward slice.
          const wonSlice = this.slices[targetSliceIndex];
// Original L678: Credits its chip amount.
          this.hub.modifyBalance(wonSlice.amount);
// Original L679: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L680: Plays jackpot fanfare.
          FX.playJackpotSound();
// Original L681: Creates a 100-particle celebration.
          FX.spawnConfetti(100);
// Original L682: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L683: Informs the player of the exact free-chip reward.
          alert(`🎉 DAILY BONUS CLAIMED!\nYou won +$${wonSlice.amount.toLocaleString()} Free Chips!`);
// Original L684: Refreshes cooldown/button UI.
          this.updateUI();
// Original L685: Structural punctuation closes the surrounding block or statement.
        }
// Original L686: Structural punctuation closes the surrounding block or statement.
      };
// Original L687: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L688: Schedules the shown delayed or next-frame casino work.
      requestAnimationFrame(animate);
// Original L689: Structural punctuation closes the surrounding block or statement.
    }
// Original L690: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L691: Defines remaining cooldown calculation.
    getRemainingCooldown() {
// Original L692: Sets cooldown to 24 hours in milliseconds.
      const cooldownMs = 24 * 60 * 60 * 1000;
// Original L693: Computes time since last spin.
      const elapsed = Date.now() - this.hub.player.lastSpinTime;
// Original L694: Never returns a negative remaining duration.
      return Math.max(0, cooldownMs - elapsed);
// Original L695: Structural punctuation closes the surrounding block or statement.
    }
// Original L696: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L697: Defines the once-per-second timer.
    startTimerInterval() {
// Original L698: Refreshes wheel UI every 1000 ms.
      setInterval(() => this.updateUI(), 1000);
// Original L699: Structural punctuation closes the surrounding block or statement.
    }
// Original L700: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L701: Defines cooldown/button display updates.
    updateUI() {
// Original L702: Reads remaining milliseconds.
      const remaining = this.getRemainingCooldown();
// Original L703: Uses countdown mode while time remains.
      if (remaining > 0) {
// Original L704: Stores the result of `true` in `this.spinBtn.disabled` for the current casino operation.
        this.spinBtn.disabled = true;
// Original L705: Updates the current casino object or shared browser state as indicated by this statement.
        this.timerEl.classList.replace('hidden-view', 'active-view');
// Original L706: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L707: Converts remaining milliseconds to two-digit hours.
        const hrs = String(Math.floor(remaining / 3600000)).padStart(2, '0');
// Original L708: Extracts two-digit minutes after whole hours.
        const mins = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
// Original L709: Extracts two-digit seconds after whole minutes.
        const secs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
// Original L710: Displays the countdown string.
        this.timerEl.textContent = `NEXT SPIN IN: ${hrs}:${mins}:${secs}`;
// Original L711: Uses ready mode after cooldown.
      } else {
// Original L712: Only leaves spin disabled if an animation is still active.
        this.spinBtn.disabled = this.isSpinning;
// Original L713: Hides the countdown timer.
        this.timerEl.classList.replace('active-view', 'hidden-view');
// Original L714: Structural punctuation closes the surrounding block or statement.
      }
// Original L715: Structural punctuation closes the surrounding block or statement.
    }
// Original L716: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L717: Delegates wheel persistence to the hub.
    saveState() {
// Original L718: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.saveState();
// Original L719: Structural punctuation closes the surrounding block or statement.
    }
// Original L720: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L721: Defines wheel reset for administrative reset controls.
    resetState() {
// Original L722: Clears lastSpinTime, making the wheel immediately eligible.
      this.hub.player.lastSpinTime = 0;
// Original L723: Persists the reset.
      this.saveState();
// Original L724: Refreshes the wheel UI.
      this.updateUI();
// Original L725: Structural punctuation closes the surrounding block or statement.
    }
// Original L726: Structural punctuation closes the surrounding block or statement.
  }
// Original L727: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L728: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L729: This comment documents the nearby casino behavior: 4. SETTINGS & THEME MANAGER.
  // 4. SETTINGS & THEME MANAGER
// Original L730: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L731: This comment documents the nearby casino behavior: Keeps sound and CSS themes in sync with the controls and encrypted active-profile settings..
  /** Keeps sound and CSS themes in sync with the controls and encrypted active-profile settings. */
// Original L732: Defines settings manager for volume, mute, and theme persistence.
  class SettingsManager {
// Original L733: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) {
// Original L734: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L735: Finds settings controls.
      this.bindElements();
// Original L736: Loads saved settings into controls and FX.
      this.loadSettings();
// Original L737: Binds settings events.
      this.initEvents();
// Original L738: Structural punctuation closes the surrounding block or statement.
    }
// Original L739: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L740: Looks up modal and settings elements.
    bindElements() {
// Original L741: Stores the result of `document.getElementById('modal-settings')` in `this.modalEl` for the current casino operation.
      this.modalEl = document.getElementById('modal-settings');
// Original L742: Stores the result of `document.getElementById('btn-open-settings')` in `this.openBtn` for the current casino operation.
      this.openBtn = document.getElementById('btn-open-settings');
// Original L743: Stores the result of `document.getElementById('btn-close-settings')` in `this.closeBtn` for the current casino operation.
      this.closeBtn = document.getElementById('btn-close-settings');
// Original L744: Stores the result of `document.getElementById('slider-volume')` in `this.volumeSlider` for the current casino operation.
      this.volumeSlider = document.getElementById('slider-volume');
// Original L745: Stores the result of `document.getElementById('volume-display-val')` in `this.volumeDisplay` for the current casino operation.
      this.volumeDisplay = document.getElementById('volume-display-val');
// Original L746: Stores the result of `document.getElementById('btn-toggle-mute')` in `this.muteBtn` for the current casino operation.
      this.muteBtn = document.getElementById('btn-toggle-mute');
// Original L747: Stores the result of `document.querySelectorAll('.theme-btn')` in `this.themeBtns` for the current casino operation.
      this.themeBtns = document.querySelectorAll('.theme-btn');
// Original L748: Structural punctuation closes the surrounding block or statement.
    }
// Original L749: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L750: Defines settings event handlers.
    initEvents() {
// Original L751: Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.
      this.openBtn?.addEventListener('click', () => {
// Original L752: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L753: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('hidden-view', 'active-view');
// Original L754: Structural punctuation closes the surrounding block or statement.
      });
// Original L755: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L756: Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.
      this.closeBtn?.addEventListener('click', () => {
// Original L757: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L758: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('active-view', 'hidden-view');
// Original L759: Structural punctuation closes the surrounding block or statement.
      });
// Original L760: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L761: Reads the slider’s integer percentage.
      this.volumeSlider?.addEventListener('input', (e) => {
// Original L762: Stores the result of `parseInt(e.target.value, 10)` in `const val` for the current casino operation.
        const val = parseInt(e.target.value, 10);
// Original L763: Displays the percentage.
        this.volumeDisplay.textContent = `${val}%`;
// Original L764: Converts percent to FX’s 0–1 range.
        FX.setVolume(val / 100);
// Original L765: Persists the changed setting.
        this.saveSettings();
// Original L766: Structural punctuation closes the surrounding block or statement.
      });
// Original L767: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L768: Defines mute toggle behavior.
      this.muteBtn?.addEventListener('click', () => {
// Original L769: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L770: Flips current mute state.
        this.isMuted = !this.isMuted;
// Original L771: Applies mute to audio.
        FX.setMute(this.isMuted);
// Original L772: Updates button label/class.
        this.updateMuteUI();
// Original L773: Persists mute state.
        this.saveSettings();
// Original L774: Structural punctuation closes the surrounding block or statement.
      });
// Original L775: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L776: Binds every theme button.
      this.themeBtns.forEach(btn => {
// Original L777: Registers the shown browser event handler so this casino control reacts to the specified event.
        btn.addEventListener('click', (e) => {
// Original L778: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
          FX.playClick();
// Original L779: Reads selected theme identifier.
          const theme = e.currentTarget.getAttribute('data-theme');
// Original L780: Applies CSS theme and active selection.
          this.applyTheme(theme);
// Original L781: Persists theme.
          this.saveSettings();
// Original L782: Structural punctuation closes the surrounding block or statement.
        });
// Original L783: Structural punctuation closes the surrounding block or statement.
      });
// Original L784: Structural punctuation closes the surrounding block or statement.
    }
// Original L785: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L786: Defines theme application.
    applyTheme(themeName) {
// Original L787: Guards this operation so it runs only when the shown game-state condition is true.
      if (themeName === 'vegas') {
// Original L788: Makes vegas the body default by removing data-theme.
        document.body.removeAttribute('data-theme');
// Original L789: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
      } else {
// Original L790: Sets body data-theme for non-default palettes.
        document.body.setAttribute('data-theme', themeName);
// Original L791: Structural punctuation closes the surrounding block or statement.
      }
// Original L792: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L793: Remembers selected theme.
      this.currentTheme = themeName;
// Original L794: Updates active marker on every theme button.
      this.themeBtns.forEach(b => {
// Original L795: Matches each button to selected theme.
        if (b.getAttribute('data-theme') === themeName) {
// Original L796: Marks selected theme.
          b.classList.add('active-theme');
// Original L797: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L798: Unmarks other themes.
          b.classList.remove('active-theme');
// Original L799: Structural punctuation closes the surrounding block or statement.
        }
// Original L800: Structural punctuation closes the surrounding block or statement.
      });
// Original L801: Structural punctuation closes the surrounding block or statement.
    }
// Original L802: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L803: Defines mute button rendering.
    updateMuteUI() {
// Original L804: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.muteBtn) {
// Original L805: Only updates an existing mute button.
        if (this.isMuted) {
// Original L806: Shows MUTE: ON.
          this.muteBtn.textContent = 'MUTE: ON';
// Original L807: Adds muted styling.
          this.muteBtn.classList.add('is-muted');
// Original L808: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L809: Shows MUTE: OFF.
          this.muteBtn.textContent = 'MUTE: OFF';
// Original L810: Removes muted styling.
          this.muteBtn.classList.remove('is-muted');
// Original L811: Structural punctuation closes the surrounding block or statement.
        }
// Original L812: Structural punctuation closes the surrounding block or statement.
      }
// Original L813: Structural punctuation closes the surrounding block or statement.
    }
// Original L814: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L815: Persists current settings through the hub save.
    saveSettings() {
// Original L816: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.saveState();
// Original L817: Structural punctuation closes the surrounding block or statement.
    }
// Original L818: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L819: Returns sanitized settings for profile storage.
    getSettings() {
// Original L820: Reads slider value or uses 80% default.
      const volume = this.volumeSlider ? parseInt(this.volumeSlider.value, 10) : 80;
// Original L821: Returns an object with fields volume: checks checks that `volume` (volume) is a finite number, excluding NaN and infinity; if true chooses chooses the largest of 0, chooses the smallest of 100, `volume` (volume), otherwise 80; isMuted: checks that `this.isMuted` (the is muted property of this) and true have the same value and type; theme: checks checks whether an array containing "vegas", "midnight", "gold", "money" contains `this.currentTheme` (the current theme property of this); if true chooses `this.currentTheme` (the current theme property of this), otherwise "vegas" to the caller and exits this function.
      return {
// Original L822: Clamps valid volume to 0–100 and falls back to 80.
        volume: Number.isFinite(volume) ? Math.max(0, Math.min(100, volume)) : 80,
// Original L823: Persists only a true boolean mute value.
        isMuted: this.isMuted === true,
// Original L824: Accepts only the four supported theme names, defaulting to vegas.
        theme: ['vegas', 'midnight', 'gold', 'money'].includes(this.currentTheme) ? this.currentTheme : 'vegas'
// Original L825: Structural punctuation closes the surrounding block or statement.
      };
// Original L826: Structural punctuation closes the surrounding block or statement.
    }
// Original L827: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L828: Applies a saved settings object safely.
    applySettings(settings = {}) {
// Original L829: Converts saved volume to a number.
      const value = Number(settings.volume);
// Original L830: Rounds and clamps finite volume, otherwise 80.
      const volume = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 80;
// Original L831: Accepts only known themes.
      const theme = ['vegas', 'midnight', 'gold', 'money'].includes(settings.theme) ? settings.theme : 'vegas';
// Original L832: Restores exact boolean mute state.
      this.isMuted = settings.isMuted === true;
// Original L833: Updates slider control.
      if (this.volumeSlider) this.volumeSlider.value = String(volume);
// Original L834: Updates displayed percent.
      if (this.volumeDisplay) this.volumeDisplay.textContent = `${volume}%`;
// Original L835: Applies volume to FX.
      FX.setVolume(volume / 100);
// Original L836: Applies mute to FX.
      FX.setMute(this.isMuted);
// Original L837: Refreshes mute control.
      this.updateMuteUI();
// Original L838: Applies the theme.
      this.applyTheme(theme);
// Original L839: Structural punctuation closes the surrounding block or statement.
    }
// Original L840: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L841: Loads the active profile’s settings or defaults.
    loadSettings() {
// Original L842: Reads settings from the active profile save.
      const savedSettings = window.LocalProfiles?.getCurrentSave().settings || {};
// Original L843: Applies those saved values.
      this.applySettings(savedSettings);
// Original L844: Structural punctuation closes the surrounding block or statement.
    }
// Original L845: Structural punctuation closes the surrounding block or statement.
  }
// Original L846: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L847: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L848: This comment documents the nearby casino behavior: 5. XP & PLAYER LEVELING ENGINE.
  // 5. XP & PLAYER LEVELING ENGINE
// Original L849: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L850: This comment documents the nearby casino behavior: Converts virtual wagers to level progress and non-monetary milestones; it does not change wager odds..
  /** Converts virtual wagers to level progress and non-monetary milestones; it does not change wager odds. */
// Original L851: Defines XP and leveling as non-monetary progress attached to wagers.
  class XPManager {
// Original L852: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) {
// Original L853: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L854: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L855: Updates the current casino object or shared browser state as indicated by this statement.
      this.bindElements();
// Original L856: Updates the current casino object or shared browser state as indicated by this statement.
      this.updateUI();
// Original L857: Structural punctuation closes the surrounding block or statement.
    }
// Original L858: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L859: Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.
    bindElements() {
// Original L860: Stores the result of `document.getElementById('player-level-badge')` in `this.levelBadgeEl` for the current casino operation.
      this.levelBadgeEl = document.getElementById('player-level-badge');
// Original L861: Stores the result of `document.getElementById('xp-bar-fill')` in `this.barFillEl` for the current casino operation.
      this.barFillEl = document.getElementById('xp-bar-fill');
// Original L862: Stores the result of `document.getElementById('xp-bar-text')` in `this.barTextEl` for the current casino operation.
      this.barTextEl = document.getElementById('xp-bar-text');
// Original L863: Stores the result of `document.getElementById('vip-tier-tag')` in `this.vipTagEl` for the current casino operation.
      this.vipTagEl = document.getElementById('vip-tier-tag');
// Original L864: Structural punctuation closes the surrounding block or statement.
    }
// Original L865: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L866: Converts a wager into XP at floor(0.15×wager), with a minimum of 1.
    addWagerXP(wagerAmount) {
// Original L867: Stores the result of `Math.max(1, Math.floor(wagerAmount * 0.15))` in `const xpEarned` for the current casino operation.
      const xpEarned = Math.max(1, Math.floor(wagerAmount * 0.15));
// Original L868: Adds earned XP to the active player.
      this.hub.player.xp += xpEarned;
// Original L869: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L870: Loops while XP meets the current level threshold.
      while (this.hub.player.xp >= this.getRequiredXP()) {
// Original L871: Carries excess XP forward by subtracting the threshold.
        this.hub.player.xp -= this.getRequiredXP();
// Original L872: Increments player level.
        this.hub.player.level++;
// Original L873: Awards level-up effects.
        this.handleLevelUp();
// Original L874: Structural punctuation closes the surrounding block or statement.
      }
// Original L875: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L876: Persists XP/level changes.
      this.saveState();
// Original L877: Refreshes level and progress UI.
      this.updateUI();
// Original L878: Structural punctuation closes the surrounding block or statement.
    }
// Original L879: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L880: Defines nonlinear XP requirement.
    getRequiredXP() {
// Original L881: Computes floor(100×level^1.2).
      return Math.floor(100 * Math.pow(this.hub.player.level, 1.2));
// Original L882: Structural punctuation closes the surrounding block or statement.
    }
// Original L883: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L884: Maps level to VIP label.
    getVIPTier() {
// Original L885: Level 20+ is DIAMOND.
      if (this.hub.player.level >= 20) return 'DIAMOND';
// Original L886: Level 15–19 is PLATINUM.
      if (this.hub.player.level >= 15) return 'PLATINUM';
// Original L887: Level 10–14 is GOLD.
      if (this.hub.player.level >= 10) return 'GOLD';
// Original L888: Level 5–9 is SILVER.
      if (this.hub.player.level >= 5) return 'SILVER';
// Original L889: Below level 5 is BRONZE.
      return 'BRONZE';
// Original L890: Structural punctuation closes the surrounding block or statement.
    }
// Original L891: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L892: Defines level-up reward handling.
    handleLevelUp() {
// Original L893: Gets reward amount and resulting level from shared GameRules.
      const { level, bonus: levelBonus } = window.GameRules.levelReward(this.hub.player);
// Original L894: Computes the new VIP tier.
      const tier = this.getVIPTier();
// Original L895: Credits the virtual-chip level reward.
      this.hub.modifyBalance(levelBonus);
// Original L896: Plays jackpot fanfare.
      FX.playJackpotSound();
// Original L897: Spawns 120 confetti particles.
      FX.spawnConfetti(120);
// Original L898: Delays the alert so celebration rendering can begin.
      setTimeout(() => {
// Original L899: Explains level, tier, chip bonus, and credit-limit increase to the player.
        alert(`LEVEL UP! You reached Level ${level} (${tier})!\nAwarded +$${levelBonus} virtual-chip bonus! Credit Limit +$250!`);
// Original L900: Applies this concrete value/expression `}, 200)` to the surrounding casino engine state.
      }, 200);
// Original L901: Structural punctuation closes the surrounding block or statement.
    }
// Original L902: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L903: Invokes `updateUI` here so the surrounding casino workflow performs the operation represented by this call.
    updateUI() {
// Original L904: Stores the result of `this.getRequiredXP()` in `const required` for the current casino operation.
      const required = this.getRequiredXP();
// Original L905: Stores the result of `Math.min(100, Math.floor((this.hub.player.xp / required) * 100))` in `const pct` for the current casino operation.
      const pct = Math.min(100, Math.floor((this.hub.player.xp / required) * 100));
// Original L906: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L907: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.levelBadgeEl) this.levelBadgeEl.textContent = `LVL ${this.hub.player.level}`;
// Original L908: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.barFillEl) this.barFillEl.style.width = `${pct}%`;
// Original L909: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.barTextEl) this.barTextEl.textContent = `${this.hub.player.xp} / ${required} XP`;
// Original L910: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.vipTagEl) this.vipTagEl.textContent = this.getVIPTier();
// Original L911: Structural punctuation closes the surrounding block or statement.
    }
// Original L912: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L913: Invokes `saveState` here so the surrounding casino workflow performs the operation represented by this call.
    saveState() {
// Original L914: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.saveState();
// Original L915: Structural punctuation closes the surrounding block or statement.
    }
// Original L916: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L917: Invokes `resetState` here so the surrounding casino workflow performs the operation represented by this call.
    resetState() {
// Original L918: Stores the result of `1` in `this.hub.player.level` for the current casino operation.
      this.hub.player.level = 1;
// Original L919: Stores the result of `0` in `this.hub.player.xp` for the current casino operation.
      this.hub.player.xp = 0;
// Original L920: Updates the current casino object or shared browser state as indicated by this statement.
      this.saveState();
// Original L921: Updates the current casino object or shared browser state as indicated by this statement.
      this.updateUI();
// Original L922: Structural punctuation closes the surrounding block or statement.
    }
// Original L923: Structural punctuation closes the surrounding block or statement.
  }
// Original L924: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L925: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L926: This comment documents the nearby casino behavior: 6. PROGRESSIVE JACKPOT MANAGER.
  // 6. PROGRESSIVE JACKPOT MANAGER
// Original L927: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L928: This comment documents the nearby casino behavior: A browser-origin-local demo jackpot; storage events refresh other tabs without a game server..
  /** A browser-origin-local demo jackpot; storage events refresh other tabs without a game server. */
// Original L929: Defines the browser-local progressive jackpot; other tabs synchronize through storage events.
  class ProgressiveJackpotManager {
// Original L930: Constructs the jackpot manager with $10,000 fallback.
    constructor(initialAmount = 10000) {
// Original L931: Uses this localStorage key for the shared browser jackpot.
      this.storageKey = 'ss_casino_shared_jackpot_v1';
// Original L932: Finds the global jackpot label.
      this.jackpotEl = document.getElementById('global-jackpot');
// Original L933: Listens for changes made by another browser tab.
      window.addEventListener('storage', event => {
// Original L934: Ignores storage events for unrelated keys.
        if (event.key !== this.storageKey) return;
// Original L935: Converts stored text to a number.
        const sharedAmount = Number(event.newValue);
// Original L936: Accepts finite nonnegative shared jackpot values and redraws them.
        if (Number.isFinite(sharedAmount) && sharedAmount >= 0) {
// Original L937: Stores the result of `sharedAmount` in `this.currentJackpot` for the current casino operation.
          this.currentJackpot = sharedAmount;
// Original L938: Updates the current casino object or shared browser state as indicated by this statement.
          this.updateDisplay();
// Original L939: Structural punctuation closes the surrounding block or statement.
        }
// Original L940: Structural punctuation closes the surrounding block or statement.
      });
// Original L941: Loads shared/local saved amount.
      this.loadState(initialAmount);
// Original L942: Structural punctuation closes the surrounding block or statement.
    }
// Original L943: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L944: Adds a valid positive contribution.
    contribute(amount) {
// Original L945: Stores the result of `Number(amount)` in `const contribution` for the current casino operation.
      const contribution = Number(amount);
// Original L946: Normalizes caller amount to a number.
      if (!Number.isFinite(contribution) || contribution <= 0) return;
// Original L947: Prefers the latest shared storage value before adding.
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
// Original L948: Adds contribution to current jackpot.
      this.currentJackpot += contribution;
// Original L949: Persists updated jackpot.
      this.saveState();
// Original L950: Refreshes jackpot display.
      this.updateDisplay();
// Original L951: Structural punctuation closes the surrounding block or statement.
    }
// Original L952: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L953: Defines jackpot claim/reset-to-seed behavior.
    claimJackpot() {
// Original L954: Stores the result of `this.readSharedAmount() ?? this.currentJackpot` in `this.currentJackpot` for the current casino operation.
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
// Original L955: Captures amount awarded before reset.
      const awarded = this.currentJackpot;
// Original L956: Reseeds jackpot at $5,000 after claim.
      this.currentJackpot = 5000;
// Original L957: Persists the reseed.
      this.saveState();
// Original L958: Refreshes display.
      this.updateDisplay();
// Original L959: Returns amount that was awarded.
      return awarded;
// Original L960: Structural punctuation closes the surrounding block or statement.
    }
// Original L961: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L962: Reads browser-shared jackpot safely.
    readSharedAmount() {
// Original L963: Applies this concrete value/expression `try {` to the surrounding casino engine state.
      try {
// Original L964: Reads localStorage value.
        const stored = localStorage.getItem(this.storageKey);
// Original L965: Distinguishes absent storage from zero.
        if (stored === null) return null;
// Original L966: Accepts only finite nonnegative stored values.
        const amount = Number(stored);
// Original L967: Returns checks uses checks whether `amount` (amount) is at least 0 only if checks that `amount` (amount) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `amount` (amount), otherwise null to the caller and exits this function.
        return Number.isFinite(amount) && amount >= 0 ? amount : null;
// Original L968: Returns null when storage access or parsing fails.
      } catch (error) {
// Original L969: Returns null to the caller and exits this function.
        return null;
// Original L970: Structural punctuation closes the surrounding block or statement.
      }
// Original L971: Structural punctuation closes the surrounding block or statement.
    }
// Original L972: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L973: Defines jackpot persistence.
    saveState() {
// Original L974: Applies this concrete value/expression `try {` to the surrounding casino engine state.
      try {
// Original L975: Stores amount as text because localStorage stores strings.
        localStorage.setItem(this.storageKey, String(this.currentJackpot));
// Original L976: Invokes `} catch` here so the surrounding casino workflow performs the operation represented by this call.
      } catch (error) {
// Original L977: Logs storage failure without crashing gameplay.
        console.error('Shared local jackpot could not be saved to this browser.', error);
// Original L978: Structural punctuation closes the surrounding block or statement.
      }
// Original L979: Queues linked-file persistence when available.
      window.LocalSave?.queueFileSave();
// Original L980: Structural punctuation closes the surrounding block or statement.
    }
// Original L981: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L982: Loads shared jackpot with a default fallback.
    loadState(defaultAmount) {
// Original L983: Checks localStorage first.
      const sharedAmount = this.readSharedAmount();
// Original L984: Guards this operation so it runs only when the shown game-state condition is true.
      if (sharedAmount !== null) {
// Original L985: Uses valid shared value.
        this.currentJackpot = sharedAmount;
// Original L986: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
      } else {
// Original L987: Falls back to the active profile’s saved legacy jackpot.
        const saved = window.LocalProfiles?.getCurrentSave().jackpot;
// Original L988: Converts legacy saved amount.
        const legacyAmount = Number(saved);
// Original L989: Accepts valid legacy amount, otherwise uses default.
        this.currentJackpot = Number.isFinite(legacyAmount) && legacyAmount >= 0 ? legacyAmount : defaultAmount;
// Original L990: Writes the migrated/default amount to shared storage.
        this.saveState();
// Original L991: Structural punctuation closes the surrounding block or statement.
      }
// Original L992: Updates visible jackpot.
      this.updateDisplay();
// Original L993: Structural punctuation closes the surrounding block or statement.
    }
// Original L994: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L995: Defines validated administrative jackpot setter.
    setJackpot(amount) {
// Original L996: Stores the result of `Number(amount)` in `const parsed` for the current casino operation.
      const parsed = Number(amount);
// Original L997: Rejects nonnumeric or negative amounts.
      if (!Number.isFinite(parsed) || parsed < 0) return false;
// Original L998: Stores the requested amount.
      this.currentJackpot = parsed;
// Original L999: Persists it.
      this.saveState();
// Original L1000: Refreshes display.
      this.updateDisplay();
// Original L1001: Reports success.
      return true;
// Original L1002: Structural punctuation closes the surrounding block or statement.
    }
// Original L1003: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1004: Defines jackpot reset.
    resetState() {
// Original L1005: Restores $10,000 seed.
      this.currentJackpot = 10000;
// Original L1006: Persists reset.
      this.saveState();
// Original L1007: Refreshes display.
      this.updateDisplay();
// Original L1008: Structural punctuation closes the surrounding block or statement.
    }
// Original L1009: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1010: Defines jackpot label formatting.
    updateDisplay() {
// Original L1011: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.jackpotEl) {
// Original L1012: Shows dollars with commas and exactly two decimals.
        this.jackpotEl.textContent = `$${this.currentJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// Original L1013: Structural punctuation closes the surrounding block or statement.
      }
// Original L1014: Structural punctuation closes the surrounding block or statement.
    }
// Original L1015: Structural punctuation closes the surrounding block or statement.
  }
// Original L1016: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1017: Creates the singleton seeded at $10,000.
  const JackpotManager = new ProgressiveJackpotManager(10000);
// Original L1018: Publishes it for games and UI.
  window.JackpotManager = JackpotManager;
// Original L1019: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1020: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1021: This comment documents the nearby casino behavior: 7. BANK & LOAN MANAGER.
  // 7. BANK & LOAN MANAGER
// Original L1022: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1023: This comment documents the nearby casino behavior: Implements virtual-chip borrowing and repayment in the player model; no payment rail or real credit is involved..
  /** Implements virtual-chip borrowing and repayment in the player model; no payment rail or real credit is involved. */
// Original L1024: Defines virtual-chip bank and loan manager; debt is not real credit.
  class BankManager {
// Original L1025: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) {
// Original L1026: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L1027: Sets loan interest to 10%.
      this.interestRate = 0.10;
// Original L1028: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1029: Updates the current casino object or shared browser state as indicated by this statement.
      this.bindElements();
// Original L1030: Updates the current casino object or shared browser state as indicated by this statement.
      this.initEvents();
// Original L1031: Structural punctuation closes the surrounding block or statement.
    }
// Original L1032: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1033: Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.
    bindElements() {
// Original L1034: Stores the result of `document.getElementById('modal-bank')` in `this.modalEl` for the current casino operation.
      this.modalEl = document.getElementById('modal-bank');
// Original L1035: Stores the result of `document.getElementById('btn-open-bank')` in `this.openBtn` for the current casino operation.
      this.openBtn = document.getElementById('btn-open-bank');
// Original L1036: Stores the result of `document.getElementById('btn-close-bank')` in `this.closeBtn` for the current casino operation.
      this.closeBtn = document.getElementById('btn-close-bank');
// Original L1037: Stores the result of `document.getElementById('bank-debt-display')` in `this.debtDisplayEl` for the current casino operation.
      this.debtDisplayEl = document.getElementById('bank-debt-display');
// Original L1038: Stores the result of `document.getElementById('bank-credit-display')` in `this.creditDisplayEl` for the current casino operation.
      this.creditDisplayEl = document.getElementById('bank-credit-display');
// Original L1039: Stores the result of `document.getElementById('btn-repay-100')` in `this.repay100Btn` for the current casino operation.
      this.repay100Btn = document.getElementById('btn-repay-100');
// Original L1040: Stores the result of `document.getElementById('btn-repay-all')` in `this.repayAllBtn` for the current casino operation.
      this.repayAllBtn = document.getElementById('btn-repay-all');
// Original L1041: Structural punctuation closes the surrounding block or statement.
    }
// Original L1042: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1043: Invokes `initEvents` here so the surrounding casino workflow performs the operation represented by this call.
    initEvents() {
// Original L1044: Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.
      this.openBtn?.addEventListener('click', () => {
// Original L1045: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L1046: Updates the current casino object or shared browser state as indicated by this statement.
        this.updateModalUI();
// Original L1047: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('hidden-view', 'active-view');
// Original L1048: Structural punctuation closes the surrounding block or statement.
      });
// Original L1049: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1050: Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.
      this.closeBtn?.addEventListener('click', () => {
// Original L1051: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L1052: Updates the current casino object or shared browser state as indicated by this statement.
        this.modalEl.classList.replace('active-view', 'hidden-view');
// Original L1053: Structural punctuation closes the surrounding block or statement.
      });
// Original L1054: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1055: Invokes `document.querySelectorAll` here so the surrounding casino workflow performs the operation represented by this call.
      document.querySelectorAll('.btn-preset-loan').forEach(btn => {
// Original L1056: Registers the shown browser event handler so this casino control reacts to the specified event.
        btn.addEventListener('click', (e) => {
// Original L1057: Stores the result of `parseFloat(e.target.getAttribute('data-amount'))` in `const amount` for the current casino operation.
          const amount = parseFloat(e.target.getAttribute('data-amount'));
// Original L1058: Updates the current casino object or shared browser state as indicated by this statement.
          this.takeLoan(amount);
// Original L1059: Structural punctuation closes the surrounding block or statement.
        });
// Original L1060: Structural punctuation closes the surrounding block or statement.
      });
// Original L1061: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1062: Stores the result of `> this.repayLoan(100))` in `this.repay100Btn?.addEventListener('click', ()` for the current casino operation.
      this.repay100Btn?.addEventListener('click', () => this.repayLoan(100));
// Original L1063: Stores the result of `> this.repayLoan(this.hub.player.debt))` in `this.repayAllBtn?.addEventListener('click', ()` for the current casino operation.
      this.repayAllBtn?.addEventListener('click', () => this.repayLoan(this.hub.player.debt));
// Original L1064: Structural punctuation closes the surrounding block or statement.
    }
// Original L1065: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1066: Defines loan issuance.
    takeLoan(amount) {
// Original L1067: Blocks loan changes during settlement.
      if (this.hub.isSettling) return;
// Original L1068: Rejects borrowing when existing debt plus requested principal exceeds creditLimit.
      if (this.hub.player.debt + amount > this.hub.player.creditLimit) {
// Original L1069: Explains the credit-limit rejection.
        alert(`Loan request exceeds maximum credit limit of $${this.hub.player.creditLimit.toLocaleString()}!`);
// Original L1070: Applies this concrete value/expression `return` to the surrounding casino engine state.
        return;
// Original L1071: Structural punctuation closes the surrounding block or statement.
      }
// Original L1072: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1073: Charges principal×1.10, so a $100 loan creates $110 debt.
      const totalCharge = amount * (1 + this.interestRate);
// Original L1074: Adds the interest-bearing charge to debt.
      this.hub.player.debt += totalCharge;
// Original L1075: Adds only principal to wallet.
      this.hub.modifyBalance(amount);
// Original L1076: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1077: Celebrates successful borrowing.
      FX.playWinSound();
// Original L1078: Persists debt and balance.
      this.saveState();
// Original L1079: Refreshes bank display.
      this.updateModalUI();
// Original L1080: Structural punctuation closes the surrounding block or statement.
    }
// Original L1081: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1082: Defines loan repayment.
    repayLoan(amount) {
// Original L1083: Blocks repayment during settlement.
      if (this.hub.isSettling) return;
// Original L1084: Checks for no debt.
      if (this.hub.player.debt <= 0) {
// Original L1085: Explains that there is nothing to repay.
        alert('You currently have no outstanding debt!');
// Original L1086: Applies this concrete value/expression `return` to the surrounding casino engine state.
        return;
// Original L1087: Structural punctuation closes the surrounding block or statement.
      }
// Original L1088: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1089: Caps payment at requested amount, outstanding debt, and wallet balance.
      const payAmount = Math.min(amount, this.hub.player.debt, this.hub.balance);
// Original L1090: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1091: Checks whether usable payment is zero.
      if (payAmount <= 0) {
// Original L1092: Explains insufficient funds.
        alert('Insufficient wallet funds to repay loan!');
// Original L1093: Applies this concrete value/expression `return` to the surrounding casino engine state.
        return;
// Original L1094: Structural punctuation closes the surrounding block or statement.
      }
// Original L1095: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1096: Reduces debt by actual payment.
      this.hub.player.debt -= payAmount;
// Original L1097: Debits wallet by same amount.
      this.hub.modifyBalance(-payAmount);
// Original L1098: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1099: Plays repayment feedback.
      FX.playClick();
// Original L1100: Persists repayment.
      this.saveState();
// Original L1101: Refreshes bank display.
      this.updateModalUI();
// Original L1102: Structural punctuation closes the surrounding block or statement.
    }
// Original L1103: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1104: Invokes `saveState` here so the surrounding casino workflow performs the operation represented by this call.
    saveState() {
// Original L1105: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.saveState();
// Original L1106: Structural punctuation closes the surrounding block or statement.
    }
// Original L1107: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1108: Defines bank reset.
    resetState() {
// Original L1109: Clears debt while leaving credit limit for hub reset.
      this.hub.player.debt = 0;
// Original L1110: Persists reset.
      this.saveState();
// Original L1111: Refreshes modal.
      this.updateModalUI();
// Original L1112: Structural punctuation closes the surrounding block or statement.
    }
// Original L1113: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1114: Defines bank modal rendering.
    updateModalUI() {
// Original L1115: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.debtDisplayEl) {
// Original L1116: Displays debt as currency.
        this.debtDisplayEl.textContent = `$${this.hub.player.debt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// Original L1117: Structural punctuation closes the surrounding block or statement.
      }
// Original L1118: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.creditDisplayEl) {
// Original L1119: Displays current credit limit as currency.
        this.creditDisplayEl.textContent = `$${this.hub.player.creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// Original L1120: Structural punctuation closes the surrounding block or statement.
      }
// Original L1121: Structural punctuation closes the surrounding block or statement.
    }
// Original L1122: Structural punctuation closes the surrounding block or statement.
  }
// Original L1123: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1124: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1125: This comment documents the nearby casino behavior: 8. CENTRAL CASINO HUB CONTROLLER.
  // 8. CENTRAL CASINO HUB CONTROLLER
// Original L1126: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1127: This comment documents the nearby casino behavior: Owns the active Player, lobby navigation, and shared wallet display; games call it to settle chips..
  /** Owns the active Player, lobby navigation, and shared wallet display; games call it to settle chips. */
// Original L1128: Defines central hub owning player, wallet, navigation, and shared settlement lock.
  class CasinoHubController {
// Original L1129: Accepts a nominal $100 starting balance for initialization.
    constructor(startingBalance = 100) {
// Original L1130: Stores the result of `document.getElementById('global-balance')` in `this.globalBalanceEl` for the current casino operation.
      this.globalBalanceEl = document.getElementById('global-balance');
// Original L1131: Stores the result of `document.getElementById('view-lobby')` in `this.lobbyView` for the current casino operation.
      this.lobbyView = document.getElementById('view-lobby');
// Original L1132: Stores the result of `document.getElementById('view-classic-slots')` in `this.slotClassicView` for the current casino operation.
      this.slotClassicView = document.getElementById('view-classic-slots');
// Original L1133: Stores the result of `document.getElementById('view-5reel-slots')` in `this.slot5ReelView` for the current casino operation.
      this.slot5ReelView = document.getElementById('view-5reel-slots');
// Original L1134: Stores the result of `Array.from(document.querySelectorAll('[data-extra-slot-view]'))` in `this.extraSlotViews` for the current casino operation.
      this.extraSlotViews = Array.from(document.querySelectorAll('[data-extra-slot-view]'));
// Original L1135: Stores the result of `document.getElementById('view-coin-toss')` in `this.coinTossView` for the current casino operation.
      this.coinTossView = document.getElementById('view-coin-toss');
// Original L1136: Stores the result of `document.getElementById('view-three-coin-toss')` in `this.threeCoinTossView` for the current casino operation.
      this.threeCoinTossView = document.getElementById('view-three-coin-toss');
// Original L1137: Stores the result of `document.getElementById('view-blackjack')` in `this.blackjackView` for the current casino operation.
      this.blackjackView = document.getElementById('view-blackjack');
// Original L1138: Stores the result of `document.getElementById('view-horse-racing')` in `this.raceView` for the current casino operation.
      this.raceView = document.getElementById('view-horse-racing');
// Original L1139: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1140: Starts in lobby.
      this.currentView = 'lobby';
// Original L1141: Reads the active profile save.
      const profileSave = window.LocalProfiles.getCurrentSave();
// Original L1142: Builds the Player model from saved data and active profile name.
      this.player = Player.fromProfile(profileSave.player, window.LocalProfiles.activeProfile?.name || 'Player');
// Original L1143: Binds lobby/reset navigation.
      this.initEventListeners();
// Original L1144: Displays restored balance.
      this.updateGlobalUI();
// Original L1145: Structural punctuation closes the surrounding block or statement.
    }
// Original L1146: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1147: Exposes player.balance as the shared game wallet.
    get balance() {
// Original L1148: Returns `this.player.balance` (the balance property of this.player) to the caller and exits this function.
      return this.player.balance;
// Original L1149: Structural punctuation closes the surrounding block or statement.
    }
// Original L1150: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1151: Allows managers to set player balance.
    set balance(value) {
// Original L1152: Stores the result of `value` in `this.player.balance` for the current casino operation.
      this.player.balance = value;
// Original L1153: Structural punctuation closes the surrounding block or statement.
    }
// Original L1154: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1155: Defines atomic-looking wallet mutation used by games.
    modifyBalance(amount) {
// Original L1156: Adds amount then rounds to cents; EPSILON reduces binary floating-point artifacts.
      this.balance = Math.round((this.balance + amount + Number.EPSILON) * 100) / 100;
// Original L1157: Persists every balance mutation.
      this.saveState();
// Original L1158: Refreshes global wallet text.
      this.updateGlobalUI();
// Original L1159: Structural punctuation closes the surrounding block or statement.
    }
// Original L1160: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1161: Defines hub navigation/reset events.
    initEventListeners() {
// Original L1162: Binds every play button.
      document.querySelectorAll('.play-btn').forEach(btn => {
// Original L1163: Registers the shown browser event handler so this casino control reacts to the specified event.
        btn.addEventListener('click', (e) => {
// Original L1164: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
          FX.playClick();
// Original L1165: Reads target game identifier.
          const gameTarget = e.target.getAttribute('data-game');
// Original L1166: Switches to that game view.
          this.switchView(gameTarget);
// Original L1167: Structural punctuation closes the surrounding block or statement.
        });
// Original L1168: Structural punctuation closes the surrounding block or statement.
      });
// Original L1169: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1170: Binds lobby-return buttons.
      document.querySelectorAll('.back-lobby-btn').forEach(btn => {
// Original L1171: Registers the shown browser event handler so this casino control reacts to the specified event.
        btn.addEventListener('click', () => {
// Original L1172: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
          FX.playClick();
// Original L1173: Returns to lobby.
          this.switchView('lobby');
// Original L1174: Structural punctuation closes the surrounding block or statement.
        });
// Original L1175: Structural punctuation closes the surrounding block or statement.
      });
// Original L1176: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1177: Binds the casino-data reset control.
      document.getElementById('btn-reset-data')?.addEventListener('click', () => {
// Original L1178: Requires explicit confirmation and explains preserved wheel/race state.
        if (confirm('Reset your casino balance to $100.00, credit, debt, level, XP, and shared jackpot? Your daily-wheel cooldown and race progress will be kept.')) {
// Original L1179: Blocks reset while a race ticket is pending or profile switching is unsafe.
          if (RaceGame?.hasPendingTicket() || !LocalProfiles.canSwitchProfile()) {
// Original L1180: Invokes `alert` here so the surrounding casino workflow performs the operation represented by this call.
            alert('Wait for your simulated race to finish before resetting casino data.');
// Original L1181: Applies this concrete value/expression `return` to the surrounding casino engine state.
            return;
// Original L1182: Structural punctuation closes the surrounding block or statement.
          }
// Original L1183: Resets hub wallet/player fields.
          this.resetState();
// Original L1184: Resets shared jackpot.
          JackpotManager.resetState();
// Original L1185: Resets bank debt.
          window.Bank.resetState();
// Original L1186: Resets XP/level.
          window.XP.resetState();
// Original L1187: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1188: This comment documents the nearby casino behavior: Don't reset wheel.
          // Don't reset wheel
// Original L1189: This comment documents the nearby casino behavior: window.DailyWheel.resetState();.
          // window.DailyWheel.resetState();
// Original L1190: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1191: Confirms reset completion.
          alert('Casino state has been reset to defaults!');
// Original L1192: Structural punctuation closes the surrounding block or statement.
        }
// Original L1193: Structural punctuation closes the surrounding block or statement.
      });
// Original L1194: Structural punctuation closes the surrounding block or statement.
    }
// Original L1195: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1196: Defines view switching.
    switchView(viewName) {
// Original L1197: Stores current view name.
      this.currentView = viewName;
// Original L1198: Hides lobby.
      this.lobbyView.classList.replace('active-view', 'hidden-view');
// Original L1199: Hides classic slots.
      this.slotClassicView.classList.replace('active-view', 'hidden-view');
// Original L1200: Hides five-reel slots.
      this.slot5ReelView.classList.replace('active-view', 'hidden-view');
// Original L1201: Hides catalog extra slot views.
      this.extraSlotViews.forEach(view => view.classList.replace('active-view', 'hidden-view'));
// Original L1202: Hides coin toss.
      this.coinTossView.classList.replace('active-view', 'hidden-view');
// Original L1203: Hides three-coin toss.
      this.threeCoinTossView.classList.replace('active-view', 'hidden-view');
// Original L1204: Hides blackjack.
      this.blackjackView.classList.replace('active-view', 'hidden-view');
// Original L1205: Hides optional racing view.
      this.raceView?.classList.replace('active-view', 'hidden-view');
// Original L1206: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1207: Shows lobby for lobby target.
      if (viewName === 'lobby') {
// Original L1208: Updates the current casino object or shared browser state as indicated by this statement.
        this.lobbyView.classList.replace('hidden-view', 'active-view');
// Original L1209: Shows classic slots.
      } else if (viewName === 'classic-slots') {
// Original L1210: Updates the current casino object or shared browser state as indicated by this statement.
        this.slotClassicView.classList.replace('hidden-view', 'active-view');
// Original L1211: Shows five-reel slots.
      } else if (viewName === '5reel-slots') {
// Original L1212: Updates the current casino object or shared browser state as indicated by this statement.
        this.slot5ReelView.classList.replace('hidden-view', 'active-view');
// Original L1213: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
      } else {
// Original L1214: Finds catalog slot whose data-game-view matches target.
        const extraSlotView = this.extraSlotViews.find(view => view.dataset.gameView === viewName);
// Original L1215: Shows matching catalog slot when found.
        if (extraSlotView) extraSlotView.classList.replace('hidden-view', 'active-view');
// Original L1216: Structural punctuation closes the surrounding block or statement.
      }
// Original L1217: Shows coin toss.
      if (viewName === 'coin-toss') {
// Original L1218: Updates the current casino object or shared browser state as indicated by this statement.
        this.coinTossView.classList.replace('hidden-view', 'active-view');
// Original L1219: Shows three-coin toss.
      } else if (viewName === 'three-coin-toss') {
// Original L1220: Updates the current casino object or shared browser state as indicated by this statement.
        this.threeCoinTossView.classList.replace('hidden-view', 'active-view');
// Original L1221: Shows blackjack.
      } else if (viewName === 'blackjack') {
// Original L1222: Updates the current casino object or shared browser state as indicated by this statement.
        this.blackjackView.classList.replace('hidden-view', 'active-view');
// Original L1223: Shows horse racing.
      } else if (viewName === 'horse-racing') {
// Original L1224: Updates the current casino object or shared browser state as indicated by this statement.
        this.raceView?.classList.replace('hidden-view', 'active-view');
// Original L1225: Structural punctuation closes the surrounding block or statement.
      }
// Original L1226: Structural punctuation closes the surrounding block or statement.
    }
// Original L1227: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1228: Defines hub save serialization.
    saveState() {
// Original L1229: Reads current save so unrelated fields can be retained.
      const current = window.LocalProfiles?.getCurrentSave() || {};
// Original L1230: Writes updated player and settings into active profile.
      window.LocalProfiles?.saveCurrent({
// Original L1231: Serializes Player model.
        player: this.player.toProfile(),
// Original L1232: Preserves current settings if settings manager is unavailable.
        settings: window.CasinoSettings?.getSettings() || current.settings
// Original L1233: Structural punctuation closes the surrounding block or statement.
      });
// Original L1234: Queues file export/sync.
      window.LocalSave?.queueFileSave();
// Original L1235: Structural punctuation closes the surrounding block or statement.
    }
// Original L1236: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1237: Defines casino reset values.
    resetState() {
// Original L1238: Restores wallet to $100.
      this.balance = 100;
// Original L1239: Clears debt.
      this.player.debt = 0;
// Original L1240: Restores $500 credit limit.
      this.player.creditLimit = 500;
// Original L1241: Restores $100 max bet.
      this.player.maxBet = 100;
// Original L1242: Restores level 1.
      this.player.level = 1;
// Original L1243: Clears XP.
      this.player.xp = 0;
// Original L1244: Persists reset player.
      this.saveState();
// Original L1245: Redraws wallet.
      this.updateGlobalUI();
// Original L1246: Structural punctuation closes the surrounding block or statement.
    }
// Original L1247: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1248: Defines global wallet rendering.
    updateGlobalUI() {
// Original L1249: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.globalBalanceEl) {
// Original L1250: Formats balance with commas and cents.
        this.globalBalanceEl.textContent = `$${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
// Original L1251: Structural punctuation closes the surrounding block or statement.
      }
// Original L1252: Structural punctuation closes the surrounding block or statement.
    }
// Original L1253: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1254: Structural punctuation closes the surrounding block or statement.
  }
// Original L1255: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1256: Holds race engine until its dependencies/startup are ready.
  let RaceGame = null;
// Original L1257: Creates hub using nominal $100 default.
  const CasinoHub = new CasinoHubController(100);
// Original L1258: Creates bank manager.
  window.Bank = new BankManager(CasinoHub);
// Original L1259: Creates XP manager.
  window.XP = new XPManager(CasinoHub);
// Original L1260: Creates daily wheel manager.
  window.DailyWheel = new DailyWheelManager(CasinoHub);
// Original L1261: Creates settings manager.
  window.CasinoSettings = new SettingsManager(CasinoHub);
// Original L1262: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1263: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1264: This comment documents the nearby casino behavior: 9. COIN TOSS TABLE ENGINE.
  // 9. COIN TOSS TABLE ENGINE
// Original L1265: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1266: This comment documents the nearby casino behavior: Handles a virtual double-or-nothing round and uses a busy flag to block duplicate flips..
  /** Handles a virtual double-or-nothing round and uses a busy flag to block duplicate flips. */
// Original L1267: Defines coin toss engine for even-money and three-coin rounds.
  class CoinTossEngine {
// Original L1268: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController, triple = false) {
// Original L1269: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L1270: Stores the result of `triple` in `this.triple` for the current casino operation.
      this.triple = triple;
// Original L1271: Starts coin wager at $10.
      this.bet = 10;
// Original L1272: Uses one HEADS choice for single coin, three unset choices for triple.
      this.choices = triple ? [null, null, null] : ['HEADS'];
// Original L1273: Prevents duplicate flips.
      this.isFlipping = false;
// Original L1274: Stores the result of `triple ? 'three-coin' : 'coin'` in `const prefix` for the current casino operation.
      const prefix = triple ? 'three-coin' : 'coin';
// Original L1275: Stores the result of `document.getElementById(`view-${triple ? 'three-coin-toss' : 'coin-toss'}`)` in `this.rootEl` for the current casino operation.
      this.rootEl = document.getElementById(`view-${triple ? 'three-coin-toss' : 'coin-toss'}`);
// Original L1276: Stores the result of `document.getElementById(`bet-${prefix}-display`)` in `this.betEl` for the current casino operation.
      this.betEl = document.getElementById(`bet-${prefix}-display`);
// Original L1277: Stores the result of `document.getElementById(`status-${prefix}`)` in `this.statusEl` for the current casino operation.
      this.statusEl = document.getElementById(`status-${prefix}`);
// Original L1278: Stores the result of `document.getElementById(`btn-${prefix}-flip`)` in `this.flipBtn` for the current casino operation.
      this.flipBtn = document.getElementById(`btn-${prefix}-flip`);
// Original L1279: Stores the result of `document.getElementById(`btn-${prefix}-max`)` in `this.maxBtn` for the current casino operation.
      this.maxBtn = document.getElementById(`btn-${prefix}-max`);
// Original L1280: Stores the result of `document.getElementById(`btn-${prefix}-minus`)` in `this.minusBtn` for the current casino operation.
      this.minusBtn = document.getElementById(`btn-${prefix}-minus`);
// Original L1281: Stores the result of `document.getElementById(`btn-${prefix}-plus`)` in `this.plusBtn` for the current casino operation.
      this.plusBtn = document.getElementById(`btn-${prefix}-plus`);
// Original L1282: Stores the result of `document.getElementById(`btn-${prefix}-clear`)` in `this.clearBtn` for the current casino operation.
      this.clearBtn = document.getElementById(`btn-${prefix}-clear`);
// Original L1283: Stores the result of `Array.from(this.rootEl.querySelectorAll('.coin'))` in `this.coins` for the current casino operation.
      this.coins = Array.from(this.rootEl.querySelectorAll('.coin'));
// Original L1284: Stores the result of `Array.from(this.rootEl.querySelectorAll('[data-coin-choice]'))` in `this.choiceButtons` for the current casino operation.
      this.choiceButtons = Array.from(this.rootEl.querySelectorAll('[data-coin-choice]'));
// Original L1285: Stores the result of `> button.addEventListener('click', () => {` in `this.choiceButtons.forEach(button` for the current casino operation.
      this.choiceButtons.forEach(button => button.addEventListener('click', () => {
// Original L1286: Guards this operation so it runs only when the shown game-state condition is true.
        if (this.isFlipping) return;
// Original L1287: Stores the result of `button.dataset.coinChoice` in `this.choices[Number(button.dataset.coinIndex)]` for the current casino operation.
        this.choices[Number(button.dataset.coinIndex)] = button.dataset.coinChoice;
// Original L1288: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L1289: Updates the current casino object or shared browser state as indicated by this statement.
        this.updateUI();
// Original L1290: Structural punctuation closes the surrounding block or statement.
      }));
// Original L1291: Stores the result of `action => {` in `const changeBet` for the current casino operation.
      const changeBet = action => {
// Original L1292: Guards this operation so it runs only when the shown game-state condition is true.
        if (this.isFlipping) return;
// Original L1293: Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.
        FX.playClick();
// Original L1294: Stores the result of `action()` in `this.bet` for the current casino operation.
        this.bet = action();
// Original L1295: Updates the current casino object or shared browser state as indicated by this statement.
        this.updateUI();
// Original L1296: Structural punctuation closes the surrounding block or statement.
      };
// Original L1297: Stores the result of `> changeBet(() => 0))` in `this.clearBtn.addEventListener('click', ()` for the current casino operation.
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
// Original L1298: Stores the result of `> changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)))` in `this.maxBtn.addEventListener('click', ()` for the current casino operation.
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
// Original L1299: Stores the result of `> changeBet(() => window.GameRules.decrease(this.bet)))` in `this.minusBtn.addEventListener('click', ()` for the current casino operation.
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
// Original L1300: Stores the result of `> changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)))` in `this.plusBtn.addEventListener('click', ()` for the current casino operation.
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
// Original L1301: Stores the result of `> this.startFlip())` in `this.flipBtn.addEventListener('click', ()` for the current casino operation.
      this.flipBtn.addEventListener('click', () => this.startFlip());
// Original L1302: Updates the current casino object or shared browser state as indicated by this statement.
      this.updateUI();
// Original L1303: Structural punctuation closes the surrounding block or statement.
    }
// Original L1304: Invokes `updateUI` here so the surrounding casino workflow performs the operation represented by this call.
    updateUI() {
// Original L1305: Stores the result of `window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)` in `const max` for the current casino operation.
      const max = window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
// Original L1306: Stores the result of `window.SlotBetRules.format(this.bet)` in `this.betEl.textContent` for the current casino operation.
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
// Original L1307: Stores the result of `this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)` in `this.flipBtn.disabled` for the current casino operation.
      this.flipBtn.disabled = this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
// Original L1308: Stores the result of `this.isFlipping || max === 0 || this.bet === max` in `this.maxBtn.disabled` for the current casino operation.
      this.maxBtn.disabled = this.isFlipping || max === 0 || this.bet === max;
// Original L1309: Stores the result of `this.isFlipping || this.bet === 0` in `this.clearBtn.disabled` for the current casino operation.
      this.clearBtn.disabled = this.isFlipping || this.bet === 0;
// Original L1310: Stores the result of `this.isFlipping || this.bet <= 5` in `this.minusBtn.disabled` for the current casino operation.
      this.minusBtn.disabled = this.isFlipping || this.bet <= 5;
// Original L1311: Stores the result of `this.isFlipping || this.bet >= max` in `this.plusBtn.disabled` for the current casino operation.
      this.plusBtn.disabled = this.isFlipping || this.bet >= max;
// Original L1312: Stores the result of `> {` in `this.choiceButtons.forEach(button` for the current casino operation.
      this.choiceButtons.forEach(button => {
// Original L1313: Stores the result of `this.choices[Number(button.dataset.coinIndex)] === button.dataset.coinChoice` in `const chosen` for the current casino operation.
        const chosen = this.choices[Number(button.dataset.coinIndex)] === button.dataset.coinChoice;
// Original L1314: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
        button.classList.toggle('active-choice', chosen);
// Original L1315: Invokes `button.setAttribute` here so the surrounding casino workflow performs the operation represented by this call.
        button.setAttribute('aria-pressed', String(chosen));
// Original L1316: Applies this concrete value/expression `button.disabled = this.isFlipping` to the surrounding casino engine state.
        button.disabled = this.isFlipping;
// Original L1317: Structural punctuation closes the surrounding block or statement.
      });
// Original L1318: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.updateGlobalUI();
// Original L1319: Structural punctuation closes the surrounding block or statement.
    }
// Original L1320: Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.
    setStatus(text, statusClass) {
// Original L1321: Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.
      this.statusEl.textContent = text;
// Original L1322: Stores the result of ``status-banner ${statusClass || ''}`` in `this.statusEl.className` for the current casino operation.
      this.statusEl.className = `status-banner ${statusClass || ''}`;
// Original L1323: Structural punctuation closes the surrounding block or statement.
    }
// Original L1324: Defines asynchronous flip/settlement.
    async startFlip() {
// Original L1325: Requires no global settling, no active flip, complete choices, and legal wager.
      if (this.hub.isSettling || this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;
// Original L1326: Locks the flip against duplicate clicks.
      this.isFlipping = true;
// Original L1327: Snapshots stake before any animation.
      const stake = this.bet;
// Original L1328: Copies choices so later UI changes cannot alter this round.
      const choices = [...this.choices];
// Original L1329: Generates HEADS/TAILS independently with a 50% threshold per coin.
      const outcomes = this.coins.map(() => Math.random() >= 0.5 ? 'HEADS' : 'TAILS');
// Original L1330: Uses shared threeCoinResult for triple odds, otherwise builds a single-coin result.
      const result = this.triple ? window.GameRules.threeCoinResult(choices, outcomes, stake) : {
// Original L1331: Records one correct prediction and stake for single coin.
        correct: Number(choices[0] === outcomes[0]), stake,
// Original L1332: Pays exactly 2× stake on a correct single prediction, rounded to cents; loses otherwise.
        payout: choices[0] === outcomes[0] ? Math.round(stake * 200) / 100 : 0
// Original L1333: Structural punctuation closes the surrounding block or statement.
      };
// Original L1334: Commits wallet outcome before animation so reload cannot leave a resolved but unpaid wager.
      // Settle before presentation: refresh cannot leave a wager deducted with an unpaid resolved flip.
// Original L1335: Changes wallet by payout minus stake (win +stake, loss -stake).
      this.hub.modifyBalance(result.payout - stake);
// Original L1336: Adds 1.5% of stake to jackpot even though payout was already settled.
      JackpotManager.contribute(stake * 0.015);
// Original L1337: Awards XP for the stake.
      window.XP.addWagerXP(stake);
// Original L1338: Records the resolved round.
      window.Accomplishments?.recordGame(this.triple ? 'three-coin' : 'coin', result);
// Original L1339: Plays click feedback.
      FX.playClick();
// Original L1340: Starts the six-tone flip sound.
      FX.playCoinFlipSound();
// Original L1341: Shows flipping status.
      this.setStatus(this.triple ? 'FLIPPING ALL THREE COINS…' : 'FLIPPING COIN…', 'status-spinning');
// Original L1342: Disables controls during presentation.
      this.updateUI();
// Original L1343: Waits for all coin animations to finish.
      await Promise.all(this.coins.map((coin, index) => new Promise(resolve => {
// Original L1344: Stores the result of `false` in `let finished` for the current casino operation.
        let finished = false;
// Original L1345: Stores the result of `() => {` in `const done` for the current casino operation.
        const done = () => {
// Original L1346: Guards this operation so it runs only when the shown game-state condition is true.
          if (finished) return;
// Original L1347: Applies this concrete value/expression `finished = true` to the surrounding casino engine state.
          finished = true;
// Original L1348: Makes each animation completion idempotent.
          coin.removeEventListener('animationend', done);
// Original L1349: Removes animation classes after completion.
          coin.classList.remove('animate-heads', 'animate-tails');
// Original L1350: Leaves the coin face matching generated outcome.
          coin.style.transform = outcomes[index] === 'HEADS' ? 'rotateY(0deg)' : 'rotateY(180deg)';
// Original L1351: Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.
          resolve();
// Original L1352: Structural punctuation closes the surrounding block or statement.
        };
// Original L1353: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
        coin.classList.remove('animate-heads', 'animate-tails');
// Original L1354: Applies this concrete value/expression `void coin.offsetHeight` to the surrounding casino engine state.
        void coin.offsetHeight;
// Original L1355: Listens for CSS animation completion.
        coin.addEventListener('animationend', done);
// Original L1356: Starts heads or tails CSS animation according to outcome.
        coin.classList.add(outcomes[index] === 'HEADS' ? 'animate-heads' : 'animate-tails');
// Original L1357: Fallback timeout at 2.4 seconds prevents reduced-motion/browser issues from locking play.
        setTimeout(done, 2400); // Reduced motion / missing animation event must never lock the table.
// Original L1358: Structural punctuation closes the surrounding block or statement.
      })));
// Original L1359: Computes cent-rounded net return.
      const net = Math.round((result.payout - stake) * 100) / 100;
// Original L1360: Adds correct-count text for triple mode.
      const matched = this.triple ? `${result.correct}/3 correct. ` : '';
// Original L1361: Reports outcomes, returned payout, stake, and signed net.
      this.setStatus(`${outcomes.join(' / ')} — ${matched}Return ${window.SlotBetRules.format(result.payout)}; stake ${window.SlotBetRules.format(stake)}; net ${net >= 0 ? '+' : '-'}${window.SlotBetRules.format(Math.abs(net))}.`, result.payout > stake ? 'status-win' : 'status-loss');
// Original L1362: Celebrates only when return exceeds stake.
      if (result.payout > stake) { FX.playWinSound(); FX.spawnConfetti(40); }
// Original L1363: Unlocks flip after presentation.
      this.isFlipping = false;
// Original L1364: Refreshes controls.
      this.updateUI();
// Original L1365: Structural punctuation closes the surrounding block or statement.
    }
// Original L1366: Defines profile-switch reset for coin UI.
    resetForActiveProfile() {
// Original L1367: Restores $10 wager.
      this.bet = 10;
// Original L1368: Clears triple choices or defaults single choice to HEADS.
      this.choices = this.triple ? [null, null, null] : ['HEADS'];
// Original L1369: Shows selection prompt.
      this.setStatus(this.triple ? 'PREDICT ALL THREE COINS' : 'PICK HEADS OR TAILS');
// Original L1370: Refreshes controls.
      this.updateUI();
// Original L1371: Structural punctuation closes the surrounding block or statement.
    }
// Original L1372: Structural punctuation closes the surrounding block or statement.
  }
// Original L1373: Defines the shown casino manager/engine type and its shared behavior.
  class ThreeCoinToss extends CoinTossEngine {
// Original L1374: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController) { super(hubController, true); }
// Original L1375: Structural punctuation closes the surrounding block or statement.
  }
// Original L1376: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1377: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1378: This comment documents the nearby casino behavior: 10. CLASSIC 3-REEL SLOT ENGINE.
  // 10. CLASSIC 3-REEL SLOT ENGINE
// Original L1379: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1380: This comment documents the nearby casino behavior: Reusable three-reel engine: each cabinet supplies its template, theme, and cent-safe wager limits..
  /** Reusable three-reel engine: each cabinet supplies its template, theme, and cent-safe wager limits. */
// Original L1381: Defines reusable three-reel slot engine.
  class ClassicSlotEngine {
// Original L1382: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController, options = {}) {
// Original L1383: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L1384: Stores the result of `document.getElementById(options.rootId || 'view-classic-slots')` in `this.rootEl` for the current casino operation.
      this.rootEl = document.getElementById(options.rootId || 'view-classic-slots');
// Original L1385: Configures cent-safe minimum, step, maximum, and starting wager.
      this.betRules = new window.SlotBetRules({
// Original L1386: Defines configuration field `minimum` with value `options.minimumBet ?? 5`, supplying this exact symbol/theme/game setting.
        minimum: options.minimumBet ?? 5,
// Original L1387: Defines configuration field `step` with value `options.betStep ?? 5`, supplying this exact symbol/theme/game setting.
        step: options.betStep ?? 5,
// Original L1388: Defines configuration field `maximum` with value `options.maximumBet ?? Infinity`, supplying this exact symbol/theme/game setting.
        maximum: options.maximumBet ?? Infinity,
// Original L1389: Defines configuration field `startingBet` with value `options.startingBet ?? 10`, supplying this exact symbol/theme/game setting.
        startingBet: options.startingBet ?? 10
// Original L1390: Structural punctuation closes the surrounding block or statement.
      });
// Original L1391: Stores the result of `options.theme || {}` in `this.theme` for the current casino operation.
      this.theme = options.theme || {};
// Original L1392: Updates the current casino object or shared browser state as indicated by this statement.
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);
// Original L1393: Uses 90 px symbol cells.
      this.SYMBOL_SIZE = 90;
// Original L1394: Models three reels.
      this.REEL_COUNT = 3;
// Original L1395: Shows three rows per reel.
      this.VISIBLE_ROWS = 3;
// Original L1396: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1397: This comment documents the nearby casino behavior: More even common symbols and rarer specials reduce the classic slot hit rate..
      // More even common symbols and rarer specials reduce the classic slot hit rate.
// Original L1398: Defines classic weighted pay symbols.
      this.SYMBOLS = [
// Original L1399: Defines configuration field `{ id` with value `'cherry', icon: '🍒', multiplier: 1,  weight: 28 }`, supplying this exact symbol/theme/game setting.
        { id: 'cherry', icon: '🍒', multiplier: 1,  weight: 28 },
// Original L1400: Defines configuration field `{ id` with value `'lemon',  icon: '🍋', multiplier: 1,  weight: 25 }`, supplying this exact symbol/theme/game setting.
        { id: 'lemon',  icon: '🍋', multiplier: 1,  weight: 25 },
// Original L1401: Defines configuration field `{ id` with value `'orange', icon: '🍊', multiplier: 2,  weight: 22 }`, supplying this exact symbol/theme/game setting.
        { id: 'orange', icon: '🍊', multiplier: 2,  weight: 22 },
// Original L1402: Defines configuration field `{ id` with value `'bell',   icon: '🔔', multiplier: 4,  weight: 18 }`, supplying this exact symbol/theme/game setting.
        { id: 'bell',   icon: '🔔', multiplier: 4,  weight: 18 },
// Original L1403: Defines configuration field `{ id` with value `'wild',   icon: '🃏', multiplier: 8,  weight: 5 }`, supplying this exact symbol/theme/game setting.
        { id: 'wild',   icon: '🃏', multiplier: 8,  weight: 5 },
// Original L1404: Defines configuration field `{ id` with value `'seven',  icon: '7️⃣', multiplier: 15, weight: 2 }`, supplying this exact symbol/theme/game setting.
        { id: 'seven',  icon: '7️⃣', multiplier: 15, weight: 2 }
// Original L1405: Invokes `].map` here so the surrounding casino workflow performs the operation represented by this call.
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));
// Original L1406: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1407: Defines five paylines as reel/row coordinates.
      this.PAYLINES = [
// Original L1408: Applies this concrete value/expression `[[0,0], [1,0], [2,0]],` to the surrounding casino engine state.
        [[0,0], [1,0], [2,0]],
// Original L1409: Applies this concrete value/expression `[[0,1], [1,1], [2,1]],` to the surrounding casino engine state.
        [[0,1], [1,1], [2,1]],
// Original L1410: Applies this concrete value/expression `[[0,2], [1,2], [2,2]],` to the surrounding casino engine state.
        [[0,2], [1,2], [2,2]],
// Original L1411: Applies this concrete value/expression `[[0,0], [1,1], [2,2]],` to the surrounding casino engine state.
        [[0,0], [1,1], [2,2]],
// Original L1412: Applies this concrete value/expression `[[0,2], [1,1], [2,0]]` to the surrounding casino engine state.
        [[0,2], [1,1], [2,0]]
// Original L1413: Applies this concrete value/expression `]` to the surrounding casino engine state.
      ];
// Original L1414: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1415: Starts at configured bet.
      this.bet = this.betRules.startingBet;
// Original L1416: Tracks reel animation.
      this.isSpinning = false;
// Original L1417: Stores current resolved grid.
      this.currentGrid = [];
// Original L1418: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1419: Updates the current casino object or shared browser state as indicated by this statement.
      this.bindElements();
// Original L1420: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.spinBtn) this.init();
// Original L1421: Structural punctuation closes the surrounding block or statement.
    }
// Original L1422: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1423: Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.
    bindElements() {
// Original L1424: Stores the result of `this.rootEl?.querySelector('[data-slot-bet]')` in `this.betEl` for the current casino operation.
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
// Original L1425: Stores the result of `this.rootEl?.querySelector('[data-slot-status]')` in `this.statusEl` for the current casino operation.
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
// Original L1426: Stores the result of `this.rootEl?.querySelector('[data-slot-spin]')` in `this.spinBtn` for the current casino operation.
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
// Original L1427: Stores the result of `this.rootEl?.querySelector('[data-slot-max]')` in `this.maxBtn` for the current casino operation.
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
// Original L1428: Stores the result of `this.rootEl?.querySelector('[data-slot-minus]')` in `this.minusBtn` for the current casino operation.
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
// Original L1429: Stores the result of `this.rootEl?.querySelector('[data-slot-plus]')` in `this.plusBtn` for the current casino operation.
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
// Original L1430: Stores the result of `Array.from(this.rootEl?.querySelectorAll('.reel .strip') || [])` in `this.reelStrips` for the current casino operation.
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel .strip') || []);
// Original L1431: Structural punctuation closes the surrounding block or statement.
    }
// Original L1432: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1433: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1434: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1435: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1436: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1437: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1438: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1439: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1440: Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.
    setStatus(text, statusClass) {
// Original L1441: Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.
      this.statusEl.textContent = text;
// Original L1442: Stores the result of `'status-banner'` in `this.statusEl.className` for the current casino operation.
      this.statusEl.className = 'status-banner';
// Original L1443: Guards this operation so it runs only when the shown game-state condition is true.
      if (statusClass) this.statusEl.classList.add(statusClass);
// Original L1444: Structural punctuation closes the surrounding block or statement.
    }
// Original L1445: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1446: Defines weighted random symbol selection.
    getRandomSymbol() {
// Original L1447: Sums all symbol weights.
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
// Original L1448: Draws a random point in the total-weight interval.
      let random = Math.random() * totalWeight;
// Original L1449: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1450: Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.
      for (const symbol of this.SYMBOLS) {
// Original L1451: Selects the first symbol whose weight interval contains the draw.
        if (random < symbol.weight) return symbol;
// Original L1452: Moves random point past the rejected symbol interval.
        random -= symbol.weight;
// Original L1453: Structural punctuation closes the surrounding block or statement.
      }
// Original L1454: Provides a defensive fallback symbol.
      return this.SYMBOLS[0];
// Original L1455: Structural punctuation closes the surrounding block or statement.
    }
// Original L1456: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1457: Renders a strip from symbols.
    renderStrip(stripEl, symbolArray) {
// Original L1458: Removes previous strip children.
      stripEl.innerHTML = '';
// Original L1459: Creates one DOM cell per symbol.
      symbolArray.forEach(sym => {
// Original L1460: Stores the result of `document.createElement('div')` in `const div` for the current casino operation.
        const div = document.createElement('div');
// Original L1461: Creates symbol cell.
        div.className = 'symbol';
// Original L1462: Uses image-backed symbol when configured.
        if (sym.image) {
// Original L1463: Stores the result of `document.createElement('img')` in `const image` for the current casino operation.
          const image = document.createElement('img');
// Original L1464: Applies this concrete value/expression `image.className = 'slot-symbol-image'` to the surrounding casino engine state.
          image.className = 'slot-symbol-image';
// Original L1465: Loads configured symbol image.
          image.src = sym.image;
// Original L1466: Supplies accessible alt text.
          image.alt = sym.alt || '';
// Original L1467: Invokes `div.appendChild` here so the surrounding casino workflow performs the operation represented by this call.
          div.appendChild(image);
// Original L1468: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L1469: Otherwise displays the symbol icon.
          div.textContent = sym.icon;
// Original L1470: Structural punctuation closes the surrounding block or statement.
        }
// Original L1471: Adds cell to strip.
        stripEl.appendChild(div);
// Original L1472: Structural punctuation closes the surrounding block or statement.
      });
// Original L1473: Structural punctuation closes the surrounding block or statement.
    }
// Original L1474: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1475: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1476: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1477: Animates one reel toward final symbols.
    animateReel(stripEl, reelIndex, finalSymbols) {
// Original L1478: Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.
      return new Promise(resolve => {
// Original L1479: Makes later reels show longer random lead-in.
        const randomPaddingCount = 20 + (reelIndex * 8);
// Original L1480: Stores the result of `[]` in `const sequence` for the current casino operation.
        const sequence = [];
// Original L1481: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1482: Builds random padding before final visible symbols.
        for (let i = 0; i < randomPaddingCount; i++) {
// Original L1483: Appends weighted random symbol.
          sequence.push(this.getRandomSymbol());
// Original L1484: Structural punctuation closes the surrounding block or statement.
        }
// Original L1485: Appends the resolved final symbols.
        sequence.push(...finalSymbols);
// Original L1486: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1487: Renders full animation sequence.
        this.renderStrip(stripEl, sequence);
// Original L1488: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1489: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
        stripEl.classList.remove('is-spinning');
// Original L1490: Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.
        stripEl.style.setProperty('--spin-target-y', '0px');
// Original L1491: Forces layout read to restart CSS transition from zero.
        stripEl.offsetHeight;
// Original L1492: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1493: Translates strip so its final three symbols occupy the viewport.
        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
// Original L1494: Makes each later reel run 600 ms longer.
        const duration = 1200 + (reelIndex * 600);
// Original L1495: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1496: Passes target translation to CSS.
        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
// Original L1497: Passes duration to CSS.
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
// Original L1498: Starts CSS spin.
        stripEl.classList.add('is-spinning');
// Original L1499: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1500: Schedules the shown delayed or next-frame casino work.
        setTimeout(() => {
// Original L1501: Plays theme reel-stop sound when animation ends.
          FX.playReelStop(this.theme.sounds?.reelStop);
// Original L1502: Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.
          resolve();
// Original L1503: Resolves animation promise after configured duration.
        }, duration);
// Original L1504: Structural punctuation closes the surrounding block or statement.
      });
// Original L1505: Structural punctuation closes the surrounding block or statement.
    }
// Original L1506: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1507: Invokes `clearHighlights` here so the surrounding casino workflow performs the operation represented by this call.
    clearHighlights() {
// Original L1508: Stores the result of `> el.classList.remove('highlight'))` in `this.rootEl.querySelectorAll('.symbol.highlight').forEach(el` for the current casino operation.
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
// Original L1509: Structural punctuation closes the surrounding block or statement.
    }
// Original L1510: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1511: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1512: Structural punctuation closes the surrounding block or statement.
  }
// Original L1513: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1514: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1515: This comment documents the nearby casino behavior: 11. HIGH VOLATILITY 5-REEL ENGINE.
  // 11. HIGH VOLATILITY 5-REEL ENGINE
// Original L1516: This comment documents the nearby casino behavior: ==========================================.
  // ==========================================
// Original L1517: This comment documents the nearby casino behavior: Five-reel engine adds ten paylines, scatter-triggered free spins, and sticky wilds to the shared chip loop..
  /** Five-reel engine adds ten paylines, scatter-triggered free spins, and sticky wilds to the shared chip loop. */
// Original L1518: Defines five-reel high-volatility slot engine.
  class HighVolatilitySlotEngine {
// Original L1519: Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.
    constructor(hubController, options = {}) {
// Original L1520: Stores the result of `hubController` in `this.hub` for the current casino operation.
      this.hub = hubController;
// Original L1521: Stores the result of `document.getElementById(options.rootId || 'view-5reel-slots')` in `this.rootEl` for the current casino operation.
      this.rootEl = document.getElementById(options.rootId || 'view-5reel-slots');
// Original L1522: Selects five-reel root element.
      this.betRules = new window.SlotBetRules({
// Original L1523: Configures its wager rules.
        minimum: options.minimumBet ?? 5,
// Original L1524: Defines configuration field `step` with value `options.betStep ?? 5`, supplying this exact symbol/theme/game setting.
        step: options.betStep ?? 5,
// Original L1525: Defines configuration field `maximum` with value `options.maximumBet ?? Infinity`, supplying this exact symbol/theme/game setting.
        maximum: options.maximumBet ?? Infinity,
// Original L1526: Defines configuration field `startingBet` with value `options.startingBet ?? 10`, supplying this exact symbol/theme/game setting.
        startingBet: options.startingBet ?? 10
// Original L1527: Structural punctuation closes the surrounding block or statement.
      });
// Original L1528: Stores the result of `options.theme || {}` in `this.theme` for the current casino operation.
      this.theme = options.theme || {};
// Original L1529: Updates the current casino object or shared browser state as indicated by this statement.
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);
// Original L1530: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1531: Uses 70 px cells.
      this.SYMBOL_SIZE = 70;
// Original L1532: Models five reels.
      this.REEL_COUNT = 5;
// Original L1533: Shows three rows each.
      this.VISIBLE_ROWS = 3;
// Original L1534: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1535: Documents rarer specials and tighter paytable.
      // Lower special-symbol frequency and a tighter paytable make wins and bonuses rarer.
// Original L1536: Defines weighted symbols, multipliers, wild/scatter flags.
      this.SYMBOLS = [
// Original L1537: Defines configuration field `{ id` with value `'ten',     icon: '🔟', mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'ten',     icon: '🔟', mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
// Original L1538: Defines configuration field `{ id` with value `'jack',    icon: '🇯',  mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'jack',    icon: '🇯',  mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
// Original L1539: Defines configuration field `{ id` with value `'queen',   icon: '🇶',  mult: { 3: 1, 4: 3, 5: 5 },   weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'queen',   icon: '🇶',  mult: { 3: 1, 4: 3, 5: 5 },   weight: 15 },
// Original L1540: Defines configuration field `{ id` with value `'king',    icon: '🇰',  mult: { 3: 1, 4: 4, 5: 7 },   weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'king',    icon: '🇰',  mult: { 3: 1, 4: 4, 5: 7 },   weight: 15 },
// Original L1541: Defines configuration field `{ id` with value `'ace',     icon: '🇦',  mult: { 3: 1, 4: 5, 5: 8 },   weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'ace',     icon: '🇦',  mult: { 3: 1, 4: 5, 5: 8 },   weight: 15 },
// Original L1542: Defines configuration field `{ id` with value `'ruby',    icon: '💎', mult: { 3: 2, 4: 10, 5: 20 }, weight: 15 }`, supplying this exact symbol/theme/game setting.
        { id: 'ruby',    icon: '💎', mult: { 3: 2, 4: 10, 5: 20 }, weight: 15 },
// Original L1543: Defines configuration field `{ id` with value `'crown',   icon: '👑', mult: { 3: 4, 4: 20, 5: 40 }, weight: 1 }`, supplying this exact symbol/theme/game setting.
        { id: 'crown',   icon: '👑', mult: { 3: 4, 4: 20, 5: 40 }, weight: 1 },
// Original L1544: Defines configuration field `{ id` with value `'wild',    icon: '🃏', mult: { 3: 6, 4: 25, 5: 60 }, weight: 2, isWild: true }`, supplying this exact symbol/theme/game setting.
        { id: 'wild',    icon: '🃏', mult: { 3: 6, 4: 25, 5: 60 }, weight: 2, isWild: true },
// Original L1545: Defines configuration field `{ id` with value `'scatter', icon: '⭐', mult: { 3: 1, 4: 4, 5: 20 },  weight: 1, isScatter: true }`, supplying this exact symbol/theme/game setting.
        { id: 'scatter', icon: '⭐', mult: { 3: 1, 4: 4, 5: 20 },  weight: 1, isScatter: true }
// Original L1546: Invokes `].map` here so the surrounding casino workflow performs the operation represented by this call.
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));
// Original L1547: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1548: Defines ten five-reel paylines.
      this.PAYLINES = [
// Original L1549: Applies this concrete value/expression `[[0,1], [1,1], [2,1], [3,1], [4,1]],` to the surrounding casino engine state.
        [[0,1], [1,1], [2,1], [3,1], [4,1]],
// Original L1550: Applies this concrete value/expression `[[0,0], [1,0], [2,0], [3,0], [4,0]],` to the surrounding casino engine state.
        [[0,0], [1,0], [2,0], [3,0], [4,0]],
// Original L1551: Applies this concrete value/expression `[[0,2], [1,2], [2,2], [3,2], [4,2]],` to the surrounding casino engine state.
        [[0,2], [1,2], [2,2], [3,2], [4,2]],
// Original L1552: Applies this concrete value/expression `[[0,0], [1,1], [2,2], [3,1], [4,0]],` to the surrounding casino engine state.
        [[0,0], [1,1], [2,2], [3,1], [4,0]],
// Original L1553: Applies this concrete value/expression `[[0,2], [1,1], [2,0], [3,1], [4,2]],` to the surrounding casino engine state.
        [[0,2], [1,1], [2,0], [3,1], [4,2]],
// Original L1554: Applies this concrete value/expression `[[0,0], [1,0], [2,1], [3,2], [4,2]],` to the surrounding casino engine state.
        [[0,0], [1,0], [2,1], [3,2], [4,2]],
// Original L1555: Applies this concrete value/expression `[[0,2], [1,2], [2,1], [3,0], [4,0]],` to the surrounding casino engine state.
        [[0,2], [1,2], [2,1], [3,0], [4,0]],
// Original L1556: Applies this concrete value/expression `[[0,1], [1,0], [2,0], [3,0], [4,1]],` to the surrounding casino engine state.
        [[0,1], [1,0], [2,0], [3,0], [4,1]],
// Original L1557: Applies this concrete value/expression `[[0,1], [1,2], [2,2], [3,2], [4,1]],` to the surrounding casino engine state.
        [[0,1], [1,2], [2,2], [3,2], [4,1]],
// Original L1558: Applies this concrete value/expression `[[0,0], [1,1], [2,0], [3,1], [4,0]]` to the surrounding casino engine state.
        [[0,0], [1,1], [2,0], [3,1], [4,0]]
// Original L1559: Applies this concrete value/expression `]` to the surrounding casino engine state.
      ];
// Original L1560: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1561: Starts configured bet.
      this.bet = this.betRules.startingBet;
// Original L1562: Tracks spinning state.
      this.isSpinning = false;
// Original L1563: Stores current grid.
      this.currentGrid = [];
// Original L1564: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1565: Tracks free spins remaining.
      this.freeSpinsRemaining = 0;
// Original L1566: Accumulates bonus returns.
      this.bonusTotalWin = 0;
// Original L1567: Tracks sticky wild positions for 5×3 grid.
      this.stickyWildsGrid = Array(5).fill(null).map(() => Array(3).fill(false));
// Original L1568: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1569: Updates the current casino object or shared browser state as indicated by this statement.
      this.bindElements();
// Original L1570: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.spinBtn) this.init();
// Original L1571: Structural punctuation closes the surrounding block or statement.
    }
// Original L1572: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1573: Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.
    bindElements() {
// Original L1574: Stores the result of `this.rootEl?.querySelector('[data-slot-bet]')` in `this.betEl` for the current casino operation.
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
// Original L1575: Stores the result of `this.rootEl?.querySelector('[data-slot-status]')` in `this.statusEl` for the current casino operation.
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
// Original L1576: Stores the result of `this.rootEl?.querySelector('[data-slot-spin]')` in `this.spinBtn` for the current casino operation.
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
// Original L1577: Stores the result of `this.rootEl?.querySelector('[data-slot-max]')` in `this.maxBtn` for the current casino operation.
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
// Original L1578: Stores the result of `this.rootEl?.querySelector('[data-slot-minus]')` in `this.minusBtn` for the current casino operation.
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
// Original L1579: Stores the result of `this.rootEl?.querySelector('[data-slot-plus]')` in `this.plusBtn` for the current casino operation.
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
// Original L1580: Stores the result of `this.rootEl?.querySelector('[data-slot-bonus-hud]')` in `this.bonusHudEl` for the current casino operation.
      this.bonusHudEl = this.rootEl?.querySelector('[data-slot-bonus-hud]');
// Original L1581: Stores the result of `this.rootEl?.querySelector('[data-slot-fs-count]')` in `this.fsCountEl` for the current casino operation.
      this.fsCountEl = this.rootEl?.querySelector('[data-slot-fs-count]');
// Original L1582: Stores the result of `this.rootEl?.querySelector('[data-slot-fs-win]')` in `this.fsWinEl` for the current casino operation.
      this.fsWinEl = this.rootEl?.querySelector('[data-slot-fs-win]');
// Original L1583: Stores the result of `Array.from(this.rootEl?.querySelectorAll('.reel-5reel .strip') || [])` in `this.reelStrips` for the current casino operation.
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel-5reel .strip') || []);
// Original L1584: Structural punctuation closes the surrounding block or statement.
    }
// Original L1585: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1586: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1587: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1588: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1589: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1590: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1591: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1592: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1593: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1594: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1595: Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.
    setStatus(text, statusClass) {
// Original L1596: Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.
      this.statusEl.textContent = text;
// Original L1597: Stores the result of `'status-banner'` in `this.statusEl.className` for the current casino operation.
      this.statusEl.className = 'status-banner';
// Original L1598: Guards this operation so it runs only when the shown game-state condition is true.
      if (statusClass) this.statusEl.classList.add(statusClass);
// Original L1599: Structural punctuation closes the surrounding block or statement.
    }
// Original L1600: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1601: Invokes `getRandomSymbol` here so the surrounding casino workflow performs the operation represented by this call.
    getRandomSymbol() {
// Original L1602: Stores the result of `this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0)` in `const totalWeight` for the current casino operation.
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
// Original L1603: Stores the result of `Math.random() * totalWeight` in `let random` for the current casino operation.
      let random = Math.random() * totalWeight;
// Original L1604: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1605: Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.
      for (const symbol of this.SYMBOLS) {
// Original L1606: Guards this operation so it runs only when the shown game-state condition is true.
        if (random < symbol.weight) return symbol;
// Original L1607: Applies this concrete value/expression `random -= symbol.weight` to the surrounding casino engine state.
        random -= symbol.weight;
// Original L1608: Structural punctuation closes the surrounding block or statement.
      }
// Original L1609: Returns the entry at index/key 0 in `this.SYMBOLS` (the symbols property of this) to the caller and exits this function.
      return this.SYMBOLS[0];
// Original L1610: Structural punctuation closes the surrounding block or statement.
    }
// Original L1611: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1612: Invokes `renderStrip` here so the surrounding casino workflow performs the operation represented by this call.
    renderStrip(stripEl, symbolArray) {
// Original L1613: Applies this concrete value/expression `stripEl.innerHTML = ''` to the surrounding casino engine state.
      stripEl.innerHTML = '';
// Original L1614: Invokes `symbolArray.forEach` here so the surrounding casino workflow performs the operation represented by this call.
      symbolArray.forEach(sym => {
// Original L1615: Stores the result of `document.createElement('div')` in `const div` for the current casino operation.
        const div = document.createElement('div');
// Original L1616: Applies this concrete value/expression `div.className = 'symbol'` to the surrounding casino engine state.
        div.className = 'symbol';
// Original L1617: Guards this operation so it runs only when the shown game-state condition is true.
        if (sym.image) {
// Original L1618: Stores the result of `document.createElement('img')` in `const image` for the current casino operation.
          const image = document.createElement('img');
// Original L1619: Applies this concrete value/expression `image.className = 'slot-symbol-image'` to the surrounding casino engine state.
          image.className = 'slot-symbol-image';
// Original L1620: Applies this concrete value/expression `image.src = sym.image` to the surrounding casino engine state.
          image.src = sym.image;
// Original L1621: Applies this concrete value/expression `image.alt = sym.alt || ''` to the surrounding casino engine state.
          image.alt = sym.alt || '';
// Original L1622: Invokes `div.appendChild` here so the surrounding casino workflow performs the operation represented by this call.
          div.appendChild(image);
// Original L1623: Applies this concrete value/expression `} else {` to the surrounding casino engine state.
        } else {
// Original L1624: Writes the shown value into the related casino status/display element.
          div.textContent = sym.icon;
// Original L1625: Structural punctuation closes the surrounding block or statement.
        }
// Original L1626: Invokes `stripEl.appendChild` here so the surrounding casino workflow performs the operation represented by this call.
        stripEl.appendChild(div);
// Original L1627: Structural punctuation closes the surrounding block or statement.
      });
// Original L1628: Structural punctuation closes the surrounding block or statement.
    }
// Original L1629: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1630: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1631: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1632: Invokes `animateReel` here so the surrounding casino workflow performs the operation represented by this call.
    animateReel(stripEl, reelIndex, finalSymbols) {
// Original L1633: Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.
      return new Promise(resolve => {
// Original L1634: Stores the result of `18 + (reelIndex * 6)` in `const randomPaddingCount` for the current casino operation.
        const randomPaddingCount = 18 + (reelIndex * 6);
// Original L1635: Stores the result of `[]` in `const sequence` for the current casino operation.
        const sequence = [];
// Original L1636: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1637: Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.
        for (let i = 0; i < randomPaddingCount; i++) {
// Original L1638: Invokes `sequence.push` here so the surrounding casino workflow performs the operation represented by this call.
          sequence.push(this.getRandomSymbol());
// Original L1639: Structural punctuation closes the surrounding block or statement.
        }
// Original L1640: Invokes `sequence.push` here so the surrounding casino workflow performs the operation represented by this call.
        sequence.push(...finalSymbols);
// Original L1641: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1642: Updates the current casino object or shared browser state as indicated by this statement.
        this.renderStrip(stripEl, sequence);
// Original L1643: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1644: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
        stripEl.classList.remove('is-spinning');
// Original L1645: Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.
        stripEl.style.setProperty('--spin-target-y', '0px');
// Original L1646: Applies this concrete value/expression `stripEl.offsetHeight` to the surrounding casino engine state.
        stripEl.offsetHeight;
// Original L1647: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1648: Stores the result of `-((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE)` in `const targetY` for the current casino operation.
        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
// Original L1649: Stores the result of `1000 + (reelIndex * 400)` in `const duration` for the current casino operation.
        const duration = 1000 + (reelIndex * 400);
// Original L1650: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1651: Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.
        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
// Original L1652: Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
// Original L1653: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
        stripEl.classList.add('is-spinning');
// Original L1654: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1655: Schedules the shown delayed or next-frame casino work.
        setTimeout(() => {
// Original L1656: Invokes `FX.playReelStop` here so the surrounding casino workflow performs the operation represented by this call.
          FX.playReelStop(this.theme.sounds?.reelStop);
// Original L1657: Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.
          resolve();
// Original L1658: Applies this concrete value/expression `}, duration)` to the surrounding casino engine state.
        }, duration);
// Original L1659: Structural punctuation closes the surrounding block or statement.
      });
// Original L1660: Structural punctuation closes the surrounding block or statement.
    }
// Original L1661: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1662: Invokes `clearHighlights` here so the surrounding casino workflow performs the operation represented by this call.
    clearHighlights() {
// Original L1663: Stores the result of `> el.classList.remove('highlight'))` in `this.rootEl.querySelectorAll('.symbol.highlight').forEach(el` for the current casino operation.
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
// Original L1664: Structural punctuation closes the surrounding block or statement.
    }
// Original L1665: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1666: Applies sticky-wild CSS to visible reel cells.
    applyStickyWildClasses() {
// Original L1667: Visits all five reels.
      for (let r = 0; r < this.REEL_COUNT; r++) {
// Original L1668: Stores the result of `this.reelStrips[r]` in `const reelEl` for the current casino operation.
        const reelEl = this.reelStrips[r];
// Original L1669: Uses last three rendered cells as visible rows.
        const visibleSymbols = Array.from(reelEl.children).slice(-this.VISIBLE_ROWS);
// Original L1670: Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.
        for (let row = 0; row < this.VISIBLE_ROWS; row++) {
// Original L1671: Marks a visible cell when its saved position is sticky wild.
          if (this.stickyWildsGrid[r][row] && visibleSymbols[row]) {
// Original L1672: Changes the shown CSS class so the corresponding casino control/view has the intended visible state.
            visibleSymbols[row].classList.add('sticky-wild');
// Original L1673: Structural punctuation closes the surrounding block or statement.
          }
// Original L1674: Structural punctuation closes the surrounding block or statement.
        }
// Original L1675: Structural punctuation closes the surrounding block or statement.
      }
// Original L1676: Structural punctuation closes the surrounding block or statement.
    }
// Original L1677: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1678: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1679: Structural punctuation closes the surrounding block or statement.
  }
// Original L1680: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1681: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1682: This comment documents the nearby casino behavior: .
  //
// Original L1683: This comment documents the nearby casino behavior: 12. PAPER, ROCK, SCISSORS.
  // 12. PAPER, ROCK, SCISSORS
// Original L1684: This comment documents the nearby casino behavior: .
  //
// Original L1685: Declares a placeholder PRS class; it has no implementation.
  class PRS {
// Original L1686: Marks paper-rock-scissors as TODO.
    //TODO
// Original L1687: Structural punctuation closes the surrounding block or statement.
  }
// Original L1688: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1689: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1690: States that slot settlement happens before visual animation.
  // Slot settlement is committed once, before presentation. No animation callback pays chips.
// Original L1691: Creates clean bonus state: no free spins, no locked stake, no bonus total, empty sticky grid, and no prior result/summary.
  const blankSlotState = () => ({ freeSpinsRemaining: 0, lockedStake: 0, bonusTotalWin: 0,
// Original L1692: Defines configuration field `stickyWildsGrid` with value `Array.from({ length: 5 }, () => Array(3).fill(false)), lastResult: null, summary: null });`, supplying this exact symbol/theme/game setting.
    stickyWildsGrid: Array.from({ length: 5 }, () => Array(3).fill(false)), lastResult: null, summary: null });
// Original L1693: Collects shared slot methods mixed into both slot engines.
  const slotMethods = {
// Original L1694: Invokes `init` here so the surrounding casino workflow performs the operation represented by this call.
    init() {
// Original L1695: Uses bet-control parent as insertion point.
      const controls = this.plusBtn.parentElement;
// Original L1696: Creates a clear-bet button.
      this.clearBtn = document.createElement('button');
// Original L1697: Configures the button as a small normal button.
      this.clearBtn.type = 'button'; this.clearBtn.className = 'btn-small';
// Original L1698: Labels and appends the clear control.
      this.clearBtn.dataset.slotClear = ''; this.clearBtn.textContent = 'Clear bet'; controls.append(this.clearBtn);
// Original L1699: Adds paytable and last-spin panels.
      for (const [key, title] of [['paytable', 'Paytable'], ['breakdown', 'Last spin']]) {
// Original L1700: Uses details for collapsible paytable and section for result breakdown.
        const panel = document.createElement(key === 'paytable' ? 'details' : 'section');
// Original L1701: Adds panel styling class.
        panel.className = key === 'paytable' ? 'slot-paytable' : 'slot-result-breakdown';
// Original L1702: Adds a data attribute used to find the panel.
        panel.setAttribute(`data-slot-${key}`, '');
// Original L1703: Adds paytable summary title when applicable.
        if (key === 'paytable') { const summary = document.createElement('summary'); summary.textContent = title; panel.append(summary); }
// Original L1704: Adds body container.
        const body = document.createElement('div'); panel.append(body);
// Original L1705: Appends panel to slot machine.
        this.rootEl.querySelector('.slot-machine').append(panel);
// Original L1706: Sets the entry at index/key a text template that combines fixed text with computed values `key` (key) in this object instance to `body` (body).
        this[`${key}El`] = body;
// Original L1707: Structural punctuation closes the surrounding block or statement.
      }
// Original L1708: Builds paytable text.
      this.renderPaytable();
// Original L1709: Restores saved bonus state.
      this.hydrateBonusState();
// Original L1710: Renders initial three symbols per reel, preserving sticky wilds during a resumed bonus.
      for (let reel = 0; reel < this.REEL_COUNT; reel++) this.renderStrip(this.reelStrips[reel], Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
// Original L1711: Applies sticky styling for five-reel games.
      if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
// Original L1712: Creates guarded bet changes.
      const change = action => {
// Original L1713: Disallows bet changes while spinning or free-spin bonus is active.
        if (this.isSpinning || this.freeSpinsRemaining > 0) return;
// Original L1714: Plays click, computes wager, and updates UI.
        FX.playClick(); this.bet = action(); this.updateUI();
// Original L1715: Structural punctuation closes the surrounding block or statement.
      };
// Original L1716: Clear sets wager to zero.
      this.clearBtn.addEventListener('click', () => change(() => 0));
// Original L1717: Max uses wallet/maxBet-limited wager.
      this.maxBtn.addEventListener('click', () => change(() => this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet)));
// Original L1718: Decreases wager by configured step.
      this.minusBtn.addEventListener('click', () => change(() => this.betRules.decrease(this.bet)));
// Original L1719: Starts from minimum when zero, otherwise increases by configured step.
      this.plusBtn.addEventListener('click', () => change(() => this.bet <= 0 ? this.betRules.minimumCents / 100 : this.betRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
// Original L1720: Starts a spin on click.
      this.spinBtn.addEventListener('click', () => this.startSpin());
// Original L1721: Initializes controls.
      this.updateUI();
// Original L1722: Structural punctuation closes the surrounding block or statement.
    },
// Original L1723: Defines bonus-state hydration from the active profile.
    hydrateBonusState() {
// Original L1724: Advances round token so stale animation callbacks can be ignored.
      this.roundToken = (this.roundToken || 0) + 1;
// Original L1725: Reads this cabinet’s saved slot bonus object.
      const saved = window.LocalProfiles.getCurrentSave().slotBonuses[this.rootEl.id];
// Original L1726: Deep-copies saved state or creates a fresh state.
      this.slotState = saved ? JSON.parse(JSON.stringify(saved)) : blankSlotState();
// Original L1727: Restores free-spin count.
      this.freeSpinsRemaining = this.slotState.freeSpinsRemaining || 0;
// Original L1728: Restores locked triggering stake.
      this.lockedStake = this.slotState.lockedStake || 0;
// Original L1729: Restores accumulated bonus return.
      this.bonusTotalWin = this.slotState.bonusTotalWin || 0;
// Original L1730: Restores sticky positions or an empty 5×3 grid.
      this.stickyWildsGrid = this.slotState.stickyWildsGrid || blankSlotState().stickyWildsGrid;
// Original L1731: Detects resumable bonus with stake locked.
      if (this.freeSpinsRemaining > 0 && this.lockedStake > 0) {
// Original L1732: Uses the triggering stake for resumed free-spin multipliers.
        this.bet = this.lockedStake;
// Original L1733: Prompts explicit resume rather than auto-spinning.
        this.setStatus('BONUS RESTORED — PRESS SPIN TO RESUME', 'status-bonus');
// Original L1734: Structural punctuation closes the surrounding block or statement.
      }
// Original L1735: Re-renders strips when initialized and cells exist.
      if (this.spinBtn && this.reelStrips.some(strip => strip.children.length)) {
// Original L1736: Restores sticky wild symbols in visible positions.
        this.reelStrips.forEach((strip, reel) => this.renderStrip(strip, Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol())));
// Original L1737: Reapplies sticky classes.
        if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
// Original L1738: Structural punctuation closes the surrounding block or statement.
      }
// Original L1739: Restores last-spin breakdown.
      if (this.slotState.lastResult) this.showBreakdown(this.slotState.lastResult);
// Original L1740: Shows completed bonus summary when no spins remain.
      if (this.slotState.summary?.totalWin !== undefined && !this.freeSpinsRemaining) {
// Original L1741: Updates the current casino object or shared browser state as indicated by this statement.
        this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(this.slotState.summary.totalWin)}`, 'status-bonus');
// Original L1742: Structural punctuation closes the surrounding block or statement.
      }
// Original L1743: Structural punctuation closes the surrounding block or statement.
    },
// Original L1744: Defines slot controls/HUD update.
    updateUI() {
// Original L1745: Marks bonus mode when free spins remain.
      const bonus = this.freeSpinsRemaining > 0;
// Original L1746: Computes maximum legal wager.
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
// Original L1747: Locks controls during animation or bonus.
      const locked = this.isSpinning || bonus;
// Original L1748: Formats current wager.
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
// Original L1749: Disables spin for active animation or invalid paid wager.
      this.spinBtn.disabled = this.isSpinning || (!bonus && (this.bet <= 0 || this.bet > maximum));
// Original L1750: Labels spin as FREE SPIN with remaining count or normal SPIN.
      this.spinBtn.textContent = bonus ? `FREE SPIN (${this.freeSpinsRemaining} LEFT)` : 'SPIN';
// Original L1751: Disables max while locked, broke, or already maxed.
      this.maxBtn.disabled = locked || maximum === 0 || this.bet === maximum;
// Original L1752: Disables clear while locked or zero.
      this.clearBtn.disabled = locked || this.bet === 0;
// Original L1753: Disables minus below configured minimum.
      this.minusBtn.disabled = locked || this.bet <= this.betRules.minimumCents / 100;
// Original L1754: Disables plus when locked, broke, or next step exceeds maximum.
      this.plusBtn.disabled = locked || maximum === 0 || (this.bet > 0 && this.bet + this.betRules.stepCents / 100 > maximum);
// Original L1755: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.bonusHudEl) {
// Original L1756: Updates the current casino object or shared browser state as indicated by this statement.
        this.bonusHudEl.classList.toggle('hidden-view', !bonus);
// Original L1757: Updates the current casino object or shared browser state as indicated by this statement.
        this.bonusHudEl.classList.toggle('active-view', bonus);
// Original L1758: Stores the result of `this.freeSpinsRemaining` in `this.fsCountEl.textContent` for the current casino operation.
        this.fsCountEl.textContent = this.freeSpinsRemaining;
// Original L1759: Stores the result of `window.SlotBetRules.format(this.bonusTotalWin)` in `this.fsWinEl.textContent` for the current casino operation.
        this.fsWinEl.textContent = window.SlotBetRules.format(this.bonusTotalWin);
// Original L1760: Structural punctuation closes the surrounding block or statement.
      }
// Original L1761: Updates the current casino object or shared browser state as indicated by this statement.
      this.hub.updateGlobalUI();
// Original L1762: Structural punctuation closes the surrounding block or statement.
    },
// Original L1763: Defines paytable rendering.
    renderPaytable() {
// Original L1764: Stores the result of `document.createElement('p')` in `const note` for the current casino operation.
      const note = document.createElement('p');
// Original L1765: Explains one stake per spin, additive line returns, wild substitution, left-to-right five-reel matching, and preserved payout semantics.
      note.textContent = `One displayed stake is debited for the whole spin. Each of the ${this.PAYLINES.length} winning lines pays displayed stake × its multiplier; line returns are added, not divided by the number of lines. This preserves existing payouts. Wilds substitute. Five-reel matches run left to right from reel 1.`;
// Original L1766: Updates the current casino object or shared browser state as indicated by this statement.
      this.paytableEl.append(note);
// Original L1767: Lists each symbol’s configured multipliers and bonus behavior.
      this.SYMBOLS.forEach(symbol => {
// Original L1768: Stores the result of `document.createElement('p')` in `const row` for the current casino operation.
        const row = document.createElement('p');
// Original L1769: Displays ordinary multipliers; scatter says anywhere and triggers 10 free spins when no paid/free spins remain.
        row.textContent = `${symbol.icon} ${symbol.id}: ${symbol.mult ? Object.entries(symbol.mult).map(([count, multiplier]) => `${count} matches = ${multiplier}×`).join('; ') : `3 matches = ${symbol.multiplier}×`}${symbol.isScatter ? ' anywhere; 3+ trigger 10 free spins when no spins remain' : ''}`;
// Original L1770: Updates the current casino object or shared browser state as indicated by this statement.
        this.paytableEl.append(row);
// Original L1771: Structural punctuation closes the surrounding block or statement.
      });
// Original L1772: Guards this operation so it runs only when the shown game-state condition is true.
      if (this.REEL_COUNT === 5) {
// Original L1773: Documents five-crown jackpot replacement, locked triggering stake, and sticky wild lifetime.
        const jackpot = document.createElement('p'); jackpot.textContent = 'Five crowns on a line return the browser-local demo jackpot instead of the ordinary line/scatter total. Free spins retain the triggering stake; no new stake is charged. Wilds that land during free spins stay sticky until that bonus ends.'; this.paytableEl.append(jackpot);
// Original L1774: Structural punctuation closes the surrounding block or statement.
      }
// Original L1775: Stores the result of `document.createElement('p')` in `const paths` for the current casino operation.
      const paths = document.createElement('p');
// Original L1776: Displays the exact row path for each payline.
      paths.textContent = this.PAYLINES.map((line, i) => `Line ${i + 1}: ${line.map(([, row]) => ['top', 'middle', 'bottom'][row]).join(' → ')}`).join(' · ');
// Original L1777: Updates the current casino object or shared browser state as indicated by this statement.
      this.paytableEl.append(paths);
// Original L1778: Structural punctuation closes the surrounding block or statement.
    },
// Original L1779: Defines last-spin breakdown rendering.
    showBreakdown(result) {
// Original L1780: Guards this operation so it runs only when the shown game-state condition is true.
      if (!this.breakdownEl) return;
// Original L1781: Updates the current casino object or shared browser state as indicated by this statement.
      this.breakdownEl.replaceChildren();
// Original L1782: Clears prior breakdown.
      const summary = document.createElement('p');
// Original L1783: Shows total stake, return, net, and special free-spin stake note.
      summary.textContent = `Total stake ${window.SlotBetRules.format(result.stake)} · Total return ${window.SlotBetRules.format(result.payout)} · Net ${window.SlotBetRules.format(result.payout - result.stake)}${result.stake === 0 ? ' (free spin; locked bonus stake used for multipliers)' : ''}`;
// Original L1784: Updates the current casino object or shared browser state as indicated by this statement.
      this.breakdownEl.append(summary);
// Original L1785: Invokes `` here so the surrounding casino workflow performs the operation represented by this call.
      (result.lines || []).forEach(line => {
// Original L1786: Lists each ordinary/special return with symbol, match count, and payout.
        const row = document.createElement('p'); row.textContent = `${line.line ? `Line ${line.line}` : 'Special return'}: ${line.symbol} · ${line.count} matched · ${window.SlotBetRules.format(line.payout)}`; this.breakdownEl.append(row);
// Original L1787: Structural punctuation closes the surrounding block or statement.
      });
// Original L1788: States when no line won.
      if (!result.lines?.length) { const empty = document.createElement('p'); empty.textContent = 'No winning lines.'; this.breakdownEl.append(empty); }
// Original L1789: Structural punctuation closes the surrounding block or statement.
    },
// Original L1790: Defines slot spin with settlement-before-animation.
    async startSpin() {
// Original L1791: Detects whether this is a free spin.
      const free = this.freeSpinsRemaining > 0;
// Original L1792: Blocks while wheel spins or blackjack is in an unresolved hand.
      if (window.DailyWheel?.isSpinning || (window.CasinoGames?.blackjack && !['BETTING', 'ENDED'].includes(window.CasinoGames.blackjack.gameState))) return;
// Original L1793: Computes maximum paid wager.
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
// Original L1794: Rejects duplicate spins, global settlement conflicts, and invalid paid wagers.
      if (this.isSpinning || this.hub.isSettling || (!free && (this.bet <= 0 || this.bet > maximum))) return;
// Original L1795: Locks settlement and updates controls before calculation.
      this.isSpinning = true; this.hub.isSettling = true; this.updateUI();
// Original L1796: Captures round token for stale-callback protection.
      const token = this.roundToken;
// Original L1797: Captures active profile id.
      const profileId = window.LocalProfiles.activeProfile.id;
// Original L1798: Snapshots current save for rollback.
      const beforeSave = window.LocalProfiles.getCurrentSave();
// Original L1799: Snapshots player state before settlement.
      const beforePlayer = this.hub.player.toProfile();
// Original L1800: Snapshots bonus state for transition/rollback.
      const previous = JSON.parse(JSON.stringify(this.slotState));
// Original L1801: Uses locked triggering stake during free spins.
      if (free) this.bet = this.lockedStake;
// Original L1802: Identifies five-reel rules.
      const five = this.REEL_COUNT === 5;
// Original L1803: Generates a 3-row grid per reel, preserving sticky wilds in bonus mode.
      const grid = Array.from({ length: this.REEL_COUNT }, (_, reel) => Array.from({ length: 3 }, (_, row) => free && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
// Original L1804: Calculates line, scatter, and jackpot outcome through SlotOutcomes.
      const calculated = window.SlotOutcomes.calculate(this, grid, five);
// Original L1805: For jackpot hits, uses shared jackpot plus 1.5% of paid stake, but no added contribution on free spin.
      const jackpotAmount = calculated.jackpotHit ? window.SlotBetRules.roundMoney((JackpotManager.readSharedAmount() ?? JackpotManager.currentJackpot) + (free ? 0 : this.bet * 0.015)) : 0;
// Original L1806: Uses jackpot amount for jackpot hits, otherwise ordinary line total.
      calculated.payout = calculated.jackpotHit ? jackpotAmount : calculated.lineTotal;
// Original L1807: Replaces ordinary lines with one explicit jackpot return entry.
      if (calculated.jackpotHit) calculated.lines = [{ line: 0, symbol: 'demo jackpot (replaces ordinary return)', count: 5, payout: jackpotAmount }];
// Original L1808: Adds scatter return entry when at least three scatters appear.
      else if (calculated.scatterCount >= 3) calculated.lines.push({ line: 0, symbol: 'scatter anywhere', count: calculated.scatterCount, payout: calculated.scatterPayout });
// Original L1809: During free spins, records all wild positions as sticky for the next state.
      if (free) previous.stickyWildsGrid = grid.map(column => column.map(symbol => symbol.isWild === true));
// Original L1810: Transitions five-reel bonus state; classic stores only settled result.
      const next = five ? window.SlotOutcomes.transition(previous, calculated, this.bet, free).state : { ...blankSlotState(), lastResult: { status: 'settled', stake: this.bet, payout: calculated.payout, lines: calculated.lines.map(({coordinates, ...line}) => line) } };
// Original L1811: Computes wallet after paid stake deduction and payout, with no stake deduction for free spins.
      const player = { ...beforePlayer, balance: window.SlotBetRules.roundMoney(beforePlayer.balance - (free ? 0 : this.bet) + calculated.payout) };
// Original L1812: Tracks whether profile save committed.
      let durable = false;
// Original L1813: Applies this concrete value/expression `try {` to the surrounding casino engine state.
      try {
// Original L1814: Atomically saves player and cabinet bonus state.
        durable = await window.LocalProfiles.saveCurrent({ player, slotBonuses: { ...beforeSave.slotBonuses, [this.rootEl.id]: next } });
// Original L1815: Logs durable-save failure.
      } catch (error) { console.error('Slot settlement could not be saved.', error); }
// Original L1816: Handles failed settlement commit.
      if (!durable) {
// Original L1817: Restores pre-spin profile snapshot.
        window.LocalProfiles.currentSave = beforeSave;
// Original L1818: Releases locks without charging the spin.
        this.hub.isSettling = false; this.isSpinning = false;
// Original L1819: Explains safe retry and preserved bonus.
        this.setStatus('SAVE FAILED — spin not charged; bonus preserved. Check browser storage, then retry.', 'status-loss');
// Original L1820: Refreshes controls after rollback.
        this.updateUI(); return;
// Original L1821: Structural punctuation closes the surrounding block or statement.
      }
// Original L1822: Loads committed player into live model.
      this.hub.player.loadProfile(player);
// Original L1823: Installs committed bonus state.
      this.slotState = next;
// Original L1824: Updates free-spin counter.
      this.freeSpinsRemaining = next.freeSpinsRemaining;
// Original L1825: Updates locked stake.
      this.lockedStake = next.lockedStake;
// Original L1826: Updates bonus total.
      this.bonusTotalWin = next.bonusTotalWin;
// Original L1827: Updates sticky grid.
      this.stickyWildsGrid = next.stickyWildsGrid;
// Original L1828: Releases global settlement lock after durable save.
      this.hub.isSettling = false;
// Original L1829: Reseeds jackpot at $5,000 after a hit.
      if (calculated.jackpotHit) JackpotManager.setJackpot(5000);
// Original L1830: For paid non-jackpot spins, contributes 1.5% and awards wager XP.
      if (!free) { if (!calculated.jackpotHit) JackpotManager.contribute(this.bet * 0.015); window.XP.addWagerXP(this.bet); }
// Original L1831: Records the settled slot round.
      window.Accomplishments?.recordGame(this.rootEl.id, { stake: free ? 0 : this.bet, payout: calculated.payout });
// Original L1832: Queues file persistence.
      window.LocalSave?.queueFileSave();
// Original L1833: Plays click feedback and removes previous highlights.
      FX.playClick(); this.clearHighlights();
// Original L1834: Shows free-spin or paid-spin animation status.
      this.setStatus(free ? 'FREE SPIN…' : 'SPINNING…', 'status-spinning');
// Original L1835: Animates all reels concurrently.
      try { await Promise.all(this.reelStrips.map((strip, index) => this.animateReel(strip, index, grid[index]))); }
// Original L1836: Always releases local spinning flag after animation.
      finally { this.isSpinning = false; }
// Original L1837: Aborts stale UI updates after profile switch/new round token.
      if (this.roundToken !== token || window.LocalProfiles.activeProfile.id !== profileId) return;
// Original L1838: Stores displayed resolved grid.
      this.currentGrid = grid;
// Original L1839: Adds sticky-wild styling for five reels.
      if (five) this.applyStickyWildClasses();
// Original L1840: Highlights every cell belonging to winning line coordinates.
      calculated.lines.forEach(line => (line.coordinates || []).forEach(([reel, row]) => Array.from(this.reelStrips[reel].children).slice(-3)[row]?.classList.add('highlight')));
// Original L1841: Displays persisted result details.
      this.showBreakdown(next.lastResult);
// Original L1842: Shows completed bonus total.
      if (next.summary?.totalWin !== undefined && !next.freeSpinsRemaining) this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(next.summary.totalWin)}`, 'status-bonus');
// Original L1843: Shows remaining free spins and accumulated bonus return.
      else if (next.freeSpinsRemaining) this.setStatus(`${next.freeSpinsRemaining} FREE SPINS LEFT · bonus return ${window.SlotBetRules.format(next.bonusTotalWin)}`, 'status-bonus');
// Original L1844: Shows ordinary return or loss message.
      else this.setStatus(calculated.payout > 0 ? `RETURN ${window.SlotBetRules.format(calculated.payout)}` : 'TRY AGAIN!', calculated.payout > 0 ? 'status-win' : 'status-loss');
// Original L1845: Celebrates any positive return.
      if (calculated.payout > 0) { FX.playWinSound(this.theme.sounds?.win); FX.spawnConfetti(50); }
// Original L1846: Refreshes buttons/HUD.
      this.updateUI();
// Original L1847: Documents that reload recovery requires a deliberate spin and never auto-spends.
      // Explicit spins make recovery predictable; reload never auto-spends or replays a settled spin.
// Original L1848: Structural punctuation closes the surrounding block or statement.
    }
// Original L1849: Structural punctuation closes the surrounding block or statement.
  };
// Original L1850: Mixes shared methods into classic prototype.
  Object.assign(ClassicSlotEngine.prototype, slotMethods);
// Original L1851: Mixes shared methods into five-reel prototype.
  Object.assign(HighVolatilitySlotEngine.prototype, slotMethods);
// Original L1852: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1853: This comment documents the nearby casino behavior: Instantiate the two hand-authored high-stakes tables, then build catalog tables with their matching shared engine..
  // Instantiate the two hand-authored high-stakes tables, then build catalog tables with their matching shared engine.
// Original L1854: This comment documents the nearby casino behavior: Slot rooms share reusable mechanics and are configured by the theme/template catalog..
  // Slot rooms share reusable mechanics and are configured by the theme/template catalog.
// Original L1855: Creates hand-authored classic cabinet with classicGold theme.
  const ClassicSlots = new ClassicSlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('classicGold') });
// Original L1856: Creates hand-authored five-reel cabinet with royalGems theme.
  const FiveReelGame = new HighVolatilitySlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('royalGems') });
// Original L1857: Builds configured catalog cabinets.
  const ThemedSlotGames = window.SlotGameCatalog.games.map(game => {
// Original L1858: Copies each catalog game options and theme.
    const options = { ...game, theme: game.theme };
// Original L1859: Returns checks checks that `game.engine` (the engine property of game) and "classic" have the same value and type; if true chooses constructs a new instance of `ClassicSlotEngine` with `CasinoHub` (casino hub); `options` (options), otherwise constructs a new instance of `HighVolatilitySlotEngine` with `CasinoHub` (casino hub); `options` (options) to the caller and exits this function.
    return game.engine === 'classic'
// Original L1860: Creates classic themed cabinet.
      ? new ClassicSlotEngine(CasinoHub, options)
// Original L1861: Creates five-reel themed cabinet.
      : new HighVolatilitySlotEngine(CasinoHub, options);
// Original L1862: Structural punctuation closes the surrounding block or statement.
  });
// Original L1863: Combines all slot engines into one list.
  const SlotGames = [ClassicSlots, FiveReelGame, ...ThemedSlotGames];
// Original L1864: Creates single-coin table.
  const CoinTossGame = new CoinTossEngine(CasinoHub);
// Original L1865: Creates three-coin table.
  const ThreeCoinGame = new ThreeCoinToss(CasinoHub);
// Original L1866: Creates blackjack table.
  const BlackjackGame = new BlackjackEngine(CasinoHub);
// Original L1867: Publishes game instances for other managers/UI.
  window.CasinoGames = { hub: CasinoHub, slots: SlotGames, coin: CoinTossGame, threeCoin: ThreeCoinGame, blackjack: BlackjackGame };
// Original L1868: Creates accomplishments tracker after games exist.
  window.Accomplishments = new window.AccomplishmentManager(CasinoHub);
// Original L1869: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1870: This comment documents the nearby casino behavior: Initialize save controls before racing so startup overlays and linked-file state are settled predictably..
  // Initialize save controls before racing so startup overlays and linked-file state are settled predictably.
// Original L1871: Creates file-save manager with all stateful managers injected.
  window.LocalSave = new window.LocalSaveManager({
// Original L1872: Defines configuration field `hub` with value `CasinoHub`, supplying this exact symbol/theme/game setting.
    hub: CasinoHub,
// Original L1873: Defines configuration field `jackpot` with value `JackpotManager`, supplying this exact symbol/theme/game setting.
    jackpot: JackpotManager,
// Original L1874: Defines configuration field `bank` with value `window.Bank`, supplying this exact symbol/theme/game setting.
    bank: window.Bank,
// Original L1875: Defines configuration field `xp` with value `window.XP`, supplying this exact symbol/theme/game setting.
    xp: window.XP,
// Original L1876: Defines configuration field `dailyWheel` with value `window.DailyWheel`, supplying this exact symbol/theme/game setting.
    dailyWheel: window.DailyWheel,
// Original L1877: Defines configuration field `settings` with value `window.CasinoSettings`, supplying this exact symbol/theme/game setting.
    settings: window.CasinoSettings
// Original L1878: Structural punctuation closes the surrounding block or statement.
  });
// Original L1879: Defines whether profile save replacement is safe: no settlement/animations/free spins, wheel spin, coin flip, unresolved blackjack, or race ticket.
  window.canReplaceCasinoSave = () => !CasinoHub.isSettling && SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping && !window.DailyWheel.isSpinning && ['BETTING', 'ENDED'].includes(BlackjackGame.gameState) && !RaceGame?.hasPendingTicket();
// Original L1880: Defines refresh after profile load.
  window.refreshCasinoSaveState = () => {
// Original L1881: Rehydrates each slot bonus and redraws controls.
    SlotGames.forEach(game => { game.hydrateBonusState?.(); game.updateUI(); });
// Original L1882: Resets single-coin ephemeral choices.
    CoinTossGame.resetForActiveProfile();
// Original L1883: Resets three-coin ephemeral choices.
    ThreeCoinGame.resetForActiveProfile();
// Original L1884: Refreshes blackjack controls.
    BlackjackGame.updateUI();
// Original L1885: Clears active-profile accomplishment view.
    window.Accomplishments?.resetForActiveProfile();
// Original L1886: Structural punctuation closes the surrounding block or statement.
  };
// Original L1887: Waits for save manager initialization.
  await window.LocalSave.initialize();
// Original L1888: Refreshes all game state from initialized save.
  window.refreshCasinoSaveState();
// Original L1889: Creates race engine after save infrastructure is ready.
  RaceGame = new window.RaceEngine(CasinoHub, { fx: FX, jackpot: JackpotManager, xp: window.XP });
// Original L1890: Publishes race engine globally.
  window.RaceGame = RaceGame;
// Original L1891: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1892: This comment documents the nearby casino behavior: Switching replaces ephemeral round memory, so permit it only when every game is safely between rounds..
  // Switching replaces ephemeral round memory, so permit it only when every game is safely between rounds.
// Original L1893: Allows profile switch only at lobby and between all safe round boundaries.
  LocalProfiles.canSwitchProfile = () => (
// Original L1894: Applies this concrete value/expression `!CasinoHub.isSettling && CasinoHub.currentView === 'lobby' &&` to the surrounding casino engine state.
    !CasinoHub.isSettling && CasinoHub.currentView === 'lobby' &&
// Original L1895: Invokes `SlotGames.every` here so the surrounding casino workflow performs the operation represented by this call.
    SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping &&
// Original L1896: Applies this concrete value/expression `!window.DailyWheel.isSpinning &&` to the surrounding casino engine state.
    !window.DailyWheel.isSpinning &&
// Original L1897: Invokes `!RaceGame.hasPendingTicket` here so the surrounding casino workflow performs the operation represented by this call.
    !RaceGame.hasPendingTicket() &&
// Original L1898: Invokes `['BETTING', 'ENDED'].includes` here so the surrounding casino workflow performs the operation represented by this call.
    ['BETTING', 'ENDED'].includes(BlackjackGame.gameState)
// Original L1899: Structural punctuation closes the surrounding block or statement.
  );
// Original L1900: Documents profile rebinding and ephemeral-round clearing.
  // Rebind each manager to the newly decrypted profile; the stable DOM stays while per-round memory is cleared.
// Original L1901: Registers asynchronous profile-change handler.
  LocalProfiles.onProfileChanged = async (save, profile) => {
// Original L1902: Switches save manager to newly active profile.
    await window.LocalSave.switchProfile();
// Original L1903: Rebuilds hub Player from new profile.
    CasinoHub.player = Player.fromProfile(save.player, profile.name);
// Original L1904: Returns to lobby.
    CasinoHub.switchView('lobby');
// Original L1905: Applies profile settings.
    window.CasinoSettings.applySettings(save.settings);
// Original L1906: Reloads shared/legacy jackpot.
    JackpotManager.loadState(10000);
// Original L1907: Refreshes bank values.
    window.Bank.updateModalUI();
// Original L1908: Refreshes XP values.
    window.XP.updateUI();
// Original L1909: Refreshes wheel cooldown.
    window.DailyWheel.updateUI();
// Original L1910: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1911: Reinitializes each slot cabinet for profile.
    SlotGames.forEach(game => {
// Original L1912: Restores each cabinet starting wager.
      game.bet = game.betRules.startingBet;
// Original L1913: Hydrates saved bonus state.
      game.hydrateBonusState?.();
// Original L1914: Shows resume prompt or normal spin prompt.
      game.setStatus(game.freeSpinsRemaining > 0 ? 'BONUS RESTORED — PRESS SPIN TO RESUME' : 'PRESS SPIN TO PLAY');
// Original L1915: Refreshes cabinet controls.
      game.updateUI();
// Original L1916: Structural punctuation closes the surrounding block or statement.
    });
// Original L1917: Resets single coin state.
    CoinTossGame.resetForActiveProfile();
// Original L1918: Resets triple coin state.
    ThreeCoinGame.resetForActiveProfile();
// Original L1919: Restores blackjack wager.
    BlackjackGame.bet = 10;
// Original L1920: Discards old deck.
    BlackjackGame.deck = [];
// Original L1921: Clears player hand.
    BlackjackGame.playerHand = [];
// Original L1922: Clears dealer hand.
    BlackjackGame.dealerHand = [];
// Original L1923: Restores hidden dealer hole-card state.
    BlackjackGame.dealerHidden = true;
// Original L1924: Returns blackjack to BETTING.
    BlackjackGame.gameState = 'BETTING';
// Original L1925: Clears player card DOM.
    BlackjackGame.playerCardsEl.innerHTML = '';
// Original L1926: Clears dealer card DOM.
    BlackjackGame.dealerCardsEl.innerHTML = '';
// Original L1927: Resets player score label.
    BlackjackGame.playerScoreEl.textContent = '0';
// Original L1928: Resets dealer score label.
    BlackjackGame.dealerScoreEl.textContent = '0';
// Original L1929: Shows fresh blackjack prompt.
    BlackjackGame.setStatus('PLACE YOUR BET TO DEAL');
// Original L1930: Refreshes blackjack controls.
    BlackjackGame.updateUI();
// Original L1931: Resets race ephemeral state.
    RaceGame.resetForActiveProfile();
// Original L1932: Clears accomplishments for the new profile.
    window.Accomplishments?.resetForActiveProfile();
// Original L1933: Persists the hub’s newly rebound profile state.
    CasinoHub.saveState();
// Original L1934: Structural punctuation closes the surrounding block or statement.
  };
// Original L1935: Blank line separates adjacent bootstrap/engine logic for readability.

// Original L1936: Closes the DOMContentLoaded bootstrap callback.
});
