# src/js/app.js

[Exact copy](../../../original/src/js/app.js)

Line numbers refer to the original file, before teaching comments.

### Line 1

```text
/* Browser bootstrap waits for the HTML, unlocks or creates the local profile, and only then wires game systems to that save. */
```

This top-level comment states the bootstrap contract: wait for the DOM, restore the active local profile, then connect every casino system to that player save.

### Line 2

```text
document.addEventListener('DOMContentLoaded', async () => {
```

Registers one asynchronous startup callback; none of the managers below can safely query their HTML controls until the browser has fired DOMContentLoaded.

### Line 3

```text
  const LocalProfiles = new window.LocalProfileManager();
```

Constructs the profile manager that decrypts/loads the player profiles stored by this app.

### Line 4

```text
  window.LocalProfiles = LocalProfiles;
```

Publishes that manager globally so later save, profile-switch, and reset code can use the same instance.

### Line 5

```text
  await LocalProfiles.initialize();
```

Waits for profile initialization to finish before reading player data; this prevents games from starting against an uninitialized save.

### Line 6

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 7

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 8

```text
  // 1. SOUND FX & PARTICLE CANVAS ENGINE
```

This comment documents the nearby casino behavior: 1. SOUND FX & PARTICLE CANVAS ENGINE.

### Line 9

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 10

```text
  /** Small Web Audio and Canvas effects share one volume/mute control and need no external media files. */
```

This comment documents the nearby casino behavior: Small Web Audio and Canvas effects share one volume/mute control and need no external media files..

### Line 11

```text
  class FXEngine {
```

Defines FXEngine, the shared Web Audio and canvas-particle service used by every table and the lobby.

### Line 12

```text
    constructor() {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 13

```text
      this.audioCtx = null;
```

Starts with no AudioContext; browsers commonly require it to be created after a user gesture.

### Line 14

```text
      this.masterGain = null;
```

Will hold the master GainNode through which all generated sounds are mixed.

### Line 15

```text
      this.volume = 0.8;
```

Stores the global sound level as a 0–1 value, initially 80%.

### Line 16

```text
      this.isMuted = false;
```

Tracks whether sound output is muted independently of the volume slider.

### Line 17

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 18

```text
      this.canvas = document.getElementById('fx-canvas');
```

Finds the full-screen effects canvas used for confetti.

### Line 19

```text
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
```

Gets its 2D drawing context when the canvas exists; otherwise effects can safely no-op.

### Line 20

```text
      this.particles = [];
```

Initializes the particle list that the animation loop updates and removes.

### Line 21

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 22

```text
      this.initCanvas();
```

Sizes the effects canvas to the viewport and installs resize handling.

### Line 23

```text
      this.animateParticles();
```

Starts the perpetual requestAnimationFrame particle renderer.

### Line 24

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 25

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 26

```text
    initAudio() {
```

Defines lazy audio initialization so mobile/browser autoplay restrictions are respected.

### Line 27

```text
      if (!this.audioCtx) {
```

Only creates audio once; subsequent sounds reuse the same graph.

### Line 28

```text
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
```

Selects the standard AudioContext or Safari WebKit fallback.

### Line 29

```text
        if (AudioContextClass) {
```

Checks that the browser actually exposes an audio API.

### Line 30

```text
          this.audioCtx = new AudioContextClass();
```

Creates the browser audio context after a permitted interaction.

### Line 31

```text
          this.masterGain = this.audioCtx.createGain();
```

Creates the master gain node used as the single volume/mute control.

### Line 32

```text
          this.updateGain();
```

Applies the current volume and mute state to the newly created gain node.

### Line 33

```text
          this.masterGain.connect(this.audioCtx.destination);
```

Routes master gain output to the speakers.

### Line 34

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 35

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 36

```text
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
```

Checks whether browser autoplay suspended the audio context.

### Line 37

```text
        this.audioCtx.resume();
```

Requests resume so queued effects can be heard after the user interacts.

### Line 38

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 39

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 40

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 41

```text
    setVolume(val) {
```

Defines the volume setter used by settings and restored saves.

### Line 42

```text
      this.volume = val;
```

Stores the caller’s normalized 0–1 volume value.

### Line 43

```text
      this.updateGain();
```

Immediately propagates that value to the master gain.

### Line 44

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 45

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 46

```text
    setMute(muted) {
```

Defines the mute setter used by the settings modal.

### Line 47

```text
      this.isMuted = muted;
```

Stores the boolean mute choice.

### Line 48

```text
      this.updateGain();
```

Recomputes effective gain so muting takes effect immediately.

### Line 49

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 50

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 51

```text
    updateGain() {
```

Defines the common gain calculation for all generated sounds.

### Line 52

```text
      if (this.masterGain && this.audioCtx) {
```

Avoids touching Web Audio nodes when audio is unavailable.

### Line 53

```text
        const effectiveVol = this.isMuted ? 0 : this.volume;
```

Uses zero gain when muted, otherwise the selected volume.

### Line 54

```text
        this.masterGain.gain.setValueAtTime(effectiveVol, this.audioCtx.currentTime);
```

Schedules the effective gain at the audio clock’s current time, avoiding abrupt stale settings.

### Line 55

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 56

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 57

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 58

```text
    playClick() {
```

Defines the short click sound used for controls.

### Line 59

```text
      this.initAudio();
```

Lazily unlocks audio before creating the click.

### Line 60

```text
      if (!this.audioCtx || this.isMuted) return;
```

Stops when audio is unsupported or muted, so UI actions still work silently.

### Line 61

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 62

```text
      const osc = this.audioCtx.createOscillator();
```

Creates a sine oscillator for a soft click tone.

### Line 63

```text
      const gain = this.audioCtx.createGain();
```

Creates an envelope gain node for the click’s volume.

### Line 64

```text
      osc.type = 'sine';
```

Chooses a sine waveform.

### Line 65

```text
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
```

Starts the tone at 600 Hz.

### Line 66

```text
      osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);
```

Exponential pitch sweep drops 600 Hz to 100 Hz over 50 ms.

### Line 67

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 68

```text
      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
```

Starts the click envelope at gain 0.15.

### Line 69

```text
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);
```

Fades the click to nearly silent gain 0.01 over 50 ms.

### Line 70

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 71

```text
      osc.connect(gain);
```

Connects oscillator output into its envelope.

### Line 72

```text
      gain.connect(this.masterGain);
```

Connects the envelope into the shared master gain.

### Line 73

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 74

```text
      osc.start();
```

Starts the oscillator immediately.

### Line 75

```text
      osc.stop(this.audioCtx.currentTime + 0.05);
```

Stops it after 50 ms, bounding the click duration.

### Line 76

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 77

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 78

```text
    playReelStop(soundPreset = 'classic') {
```

Defines a reel-stop sound whose preset changes pitch and waveform by cabinet theme.

### Line 79

```text
      this.initAudio();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 80

```text
      if (!this.audioCtx || this.isMuted) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 81

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 82

```text
      const presets = {
```

Lists theme-specific start/end frequencies and oscillator waveforms.

### Line 83

```text
        classic: { start: 180, end: 40, type: 'triangle' },
```

Defines configuration field `classic` with value `{ start: 180, end: 40, type: 'triangle' }`, supplying this exact symbol/theme/game setting.

### Line 84

```text
        royal: { start: 330, end: 110, type: 'triangle' },
```

Defines configuration field `royal` with value `{ start: 330, end: 110, type: 'triangle' }`, supplying this exact symbol/theme/game setting.

### Line 85

```text
        garden: { start: 520, end: 260, type: 'sine' },
```

Defines configuration field `garden` with value `{ start: 520, end: 260, type: 'sine' }`, supplying this exact symbol/theme/game setting.

### Line 86

```text
        neon: { start: 760, end: 180, type: 'square' },
```

Defines configuration field `neon` with value `{ start: 760, end: 180, type: 'square' }`, supplying this exact symbol/theme/game setting.

### Line 87

```text
        ocean: { start: 390, end: 95, type: 'sine' }
```

Defines configuration field `ocean` with value `{ start: 390, end: 95, type: 'sine' }`, supplying this exact symbol/theme/game setting.

### Line 88

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 89

```text
      const preset = presets[soundPreset] || presets.classic;
```

Selects the requested preset, falling back to classic for an unknown theme.

### Line 90

```text
      const osc = this.audioCtx.createOscillator();
```

Creates the reel-stop oscillator.

### Line 91

```text
      const gain = this.audioCtx.createGain();
```

Creates its volume envelope.

### Line 92

```text
      osc.type = preset.type;
```

Applies the selected waveform.

### Line 93

```text
      osc.frequency.setValueAtTime(preset.start, this.audioCtx.currentTime);
```

Starts at the preset’s upper pitch.

### Line 94

```text
      osc.frequency.exponentialRampToValueAtTime(preset.end, this.audioCtx.currentTime + 0.08);
```

Sweeps to the preset’s lower pitch over 80 ms.

### Line 95

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 96

```text
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
```

Starts the reel-stop at gain 0.3.

### Line 97

```text
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);
```

Fades it to 0.01 over 80 ms.

### Line 98

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 99

```text
      osc.connect(gain);
```

Routes oscillator through the envelope.

### Line 100

```text
      gain.connect(this.masterGain);
```

Routes the envelope to master output.

### Line 101

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 102

```text
      osc.start();
```

Starts the stop sound.

### Line 103

```text
      osc.stop(this.audioCtx.currentTime + 0.08);
```

Stops it after 80 ms.

### Line 104

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 105

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 106

```text
    playCoinFlipSound() {
```

Defines the six-step rising coin-flip sound.

### Line 107

```text
      this.initAudio();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 108

```text
      if (!this.audioCtx || this.isMuted) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 109

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 110

```text
      for (let i = 0; i < 6; i++) {
```

Schedules six tones, one every 100 ms.

### Line 111

```text
        const osc = this.audioCtx.createOscillator();
```

Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.

### Line 112

```text
        const gain = this.audioCtx.createGain();
```

Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.

### Line 113

```text
        osc.type = 'sine';
```

Applies this concrete value/expression `osc.type = 'sine'` to the surrounding casino engine state.

### Line 114

```text
        osc.frequency.setValueAtTime(1200 + (i * 150), this.audioCtx.currentTime + (i * 0.1));
```

Raises each note by 150 Hz, beginning at 1200 Hz, to suggest spinning metal.

### Line 115

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 116

```text
        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + (i * 0.1));
```

Starts each note at gain 0.1 at its offset.

### Line 117

```text
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.1) + 0.08);
```

Fades each note to 0.01 after 80 ms.

### Line 118

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 119

```text
        osc.connect(gain);
```

Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 120

```text
        gain.connect(this.masterGain);
```

Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 121

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 122

```text
        osc.start(this.audioCtx.currentTime + (i * 0.1));
```

Starts each oscillator at its scheduled offset.

### Line 123

```text
        osc.stop(this.audioCtx.currentTime + (i * 0.1) + 0.08);
```

Stops each note 80 ms after it starts.

### Line 124

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 125

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 126

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 127

```text
    playWinSound(soundPreset = 'classic') {
```

Defines the four-note win melody.

### Line 128

```text
      this.initAudio();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 129

```text
      if (!this.audioCtx || this.isMuted) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 130

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 131

```text
      const melodies = {
```

Provides theme-specific musical frequencies in Hz.

### Line 132

```text
        classic: [523.25, 659.25, 783.99, 1046.50],
```

Defines configuration field `classic` with value `[523.25, 659.25, 783.99, 1046.50]`, supplying this exact symbol/theme/game setting.

### Line 133

```text
        royal: [392, 523.25, 659.25, 783.99],
```

Defines configuration field `royal` with value `[392, 523.25, 659.25, 783.99]`, supplying this exact symbol/theme/game setting.

### Line 134

```text
        garden: [440, 554.37, 659.25, 880],
```

Defines configuration field `garden` with value `[440, 554.37, 659.25, 880]`, supplying this exact symbol/theme/game setting.

### Line 135

```text
        neon: [587.33, 739.99, 880, 1174.66],
```

Defines configuration field `neon` with value `[587.33, 739.99, 880, 1174.66]`, supplying this exact symbol/theme/game setting.

### Line 136

```text
        ocean: [329.63, 392, 493.88, 659.25]
```

Defines configuration field `ocean` with value `[329.63, 392, 493.88, 659.25]`, supplying this exact symbol/theme/game setting.

### Line 137

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 138

```text
      const notes = melodies[soundPreset] || melodies.classic;
```

Uses the chosen theme melody, classic if unrecognized.

### Line 139

```text
      notes.forEach((freq, idx) => {
```

Schedules one oscillator/envelope pair per note.

### Line 140

```text
        const osc = this.audioCtx.createOscillator();
```

Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.

### Line 141

```text
        const gain = this.audioCtx.createGain();
```

Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.

### Line 142

```text
        osc.type = 'triangle';
```

Uses triangle timbres for the win melody.

### Line 143

```text
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + (idx * 0.08));
```

Schedules each note 80 ms after the previous.

### Line 144

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 145

```text
        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + (idx * 0.08));
```

Starts every note at gain 0.2.

### Line 146

```text
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (idx * 0.08) + 0.25);
```

Fades each note over 250 ms.

### Line 147

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 148

```text
        osc.connect(gain);
```

Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 149

```text
        gain.connect(this.masterGain);
```

Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 150

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 151

```text
        osc.start(this.audioCtx.currentTime + (idx * 0.08));
```

Starts each note at its scheduled time.

### Line 152

```text
        osc.stop(this.audioCtx.currentTime + (idx * 0.08) + 0.25);
```

Stops each note after its 250 ms envelope.

### Line 153

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 154

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 155

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 156

```text
    playJackpotSound() {
```

Defines the louder twelve-note jackpot fanfare.

### Line 157

```text
      this.initAudio();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 158

```text
      if (!this.audioCtx || this.isMuted) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 159

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 160

```text
      for (let i = 0; i < 12; i++) {
```

Schedules twelve staggered notes 60 ms apart.

### Line 161

```text
        const osc = this.audioCtx.createOscillator();
```

Stores the result of `this.audioCtx.createOscillator()` in `const osc` for the current casino operation.

### Line 162

```text
        const gain = this.audioCtx.createGain();
```

Stores the result of `this.audioCtx.createGain()` in `const gain` for the current casino operation.

### Line 163

```text
        osc.type = 'sawtooth';
```

Uses sawtooth waves for a bright jackpot texture.

### Line 164

```text
        osc.frequency.setValueAtTime(300 + (i * 80), this.audioCtx.currentTime + (i * 0.06));
```

Raises pitch from 300 Hz by 80 Hz per note.

### Line 165

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 166

```text
        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + (i * 0.06));
```

Starts each fanfare note at gain 0.25.

### Line 167

```text
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.06) + 0.2);
```

Fades each note to 0.01 over 200 ms.

### Line 168

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 169

```text
        osc.connect(gain);
```

Invokes `osc.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 170

```text
        gain.connect(this.masterGain);
```

Invokes `gain.connect` here so the surrounding casino workflow performs the operation represented by this call.

### Line 171

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 172

```text
        osc.start(this.audioCtx.currentTime + (i * 0.06));
```

Starts each jackpot note at its offset.

### Line 173

```text
        osc.stop(this.audioCtx.currentTime + (i * 0.06) + 0.2);
```

Stops each note after 200 ms.

### Line 174

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 175

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 176

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 177

```text
    initCanvas() {
```

Defines canvas sizing for the particle effect.

### Line 178

```text
      if (!this.canvas) return;
```

No canvas means no visual effect work.

### Line 179

```text
      const resize = () => {
```

Creates a resize callback so effects cover the current viewport.

### Line 180

```text
        this.canvas.width = window.innerWidth;
```

Sets canvas pixel width to viewport width.

### Line 181

```text
        this.canvas.height = window.innerHeight;
```

Sets canvas pixel height to viewport height.

### Line 182

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 183

```text
      window.addEventListener('resize', resize);
```

Re-sizes effects whenever the window changes dimensions.

### Line 184

```text
      resize();
```

Runs the resize once immediately.

### Line 185

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 186

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 187

```text
    spawnConfetti(count = 75) {
```

Defines confetti creation; 75 particles is the default burst.

### Line 188

```text
      if (!this.canvas) return;
```

Skips particle creation without a canvas.

### Line 189

```text
      const colors = ['#ffd700', '#ff4d4d', '#4eef90', '#e056fd', '#00d2d3'];
```

Restricts confetti to the five casino accent colors.

### Line 190

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 191

```text
      for (let i = 0; i < count; i++) {
```

Creates the requested number of particle objects.

### Line 192

```text
        this.particles.push({
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 193

```text
          x: this.canvas.width / 2 + (Math.random() * 200 - 100),
```

Starts particles around the horizontal center with ±100 px spread.

### Line 194

```text
          y: this.canvas.height / 3,
```

Places the burst one-third down the viewport.

### Line 195

```text
          vx: (Math.random() - 0.5) * 12,
```

Gives each particle horizontal velocity between -6 and +6.

### Line 196

```text
          vy: (Math.random() - 0.8) * 14,
```

Gives upward-biased vertical velocity; negative values initially move upward.

### Line 197

```text
          size: Math.random() * 8 + 4,
```

Chooses a square size from 4 through 12 px.

### Line 198

```text
          color: colors[Math.floor(Math.random() * colors.length)],
```

Randomly chooses one of the five colors.

### Line 199

```text
          alpha: 1,
```

Particles begin fully opaque.

### Line 200

```text
          gravity: 0.35,
```

Gravity adds 0.35 px/frame to downward velocity.

### Line 201

```text
          rotation: Math.random() * 360,
```

Randomizes initial rotation in degrees.

### Line 202

```text
          vRot: (Math.random() - 0.5) * 10
```

Randomizes rotational speed between -5 and +5 degrees/frame.

### Line 203

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 204

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 205

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 206

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 207

```text
    animateParticles() {
```

Defines the animation loop for existing particles.

### Line 208

```text
      if (this.ctx) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 209

```text
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
```

Clears the previous full-canvas frame before redrawing.

### Line 210

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 211

```text
        for (let i = this.particles.length - 1; i >= 0; i--) {
```

Iterates backward so removing expired particles does not skip the next item.

### Line 212

```text
          const p = this.particles[i];
```

Names the current particle for physics and drawing.

### Line 213

```text
          p.x += p.vx;
```

Advances horizontal position by velocity.

### Line 214

```text
          p.y += p.vy;
```

Advances vertical position by velocity.

### Line 215

```text
          p.vy += p.gravity;
```

Applies gravity to vertical velocity.

### Line 216

```text
          p.alpha -= 0.012;
```

Reduces opacity by 0.012 each frame.

### Line 217

```text
          p.rotation += p.vRot;
```

Advances rotation by angular velocity.

### Line 218

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 219

```text
          if (p.alpha <= 0 || p.y > this.canvas.height) {
```

Expires invisible or off-bottom particles.

### Line 220

```text
            this.particles.splice(i, 1);
```

Removes the expired particle from the active array.

### Line 221

```text
            continue;
```

Skips drawing for the particle just removed.

### Line 222

```text
          }
```

Structural punctuation closes the surrounding block or statement.

### Line 223

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 224

```text
          this.ctx.save();
```

Saves canvas drawing state before transforms.

### Line 225

```text
          this.ctx.globalAlpha = p.alpha;
```

Uses particle opacity for alpha compositing.

### Line 226

```text
          this.ctx.translate(p.x, p.y);
```

Moves drawing origin to particle position.

### Line 227

```text
          this.ctx.rotate((p.rotation * Math.PI) / 180);
```

Rotates the square from degrees to radians.

### Line 228

```text
          this.ctx.fillStyle = p.color;
```

Selects the particle color.

### Line 229

```text
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
```

Draws a centered square with the particle size.

### Line 230

```text
          this.ctx.restore();
```

Restores the prior canvas transform/state.

### Line 231

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 232

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 233

```text
      requestAnimationFrame(() => this.animateParticles());
```

Schedules the next frame, keeping confetti animated.

### Line 234

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 235

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 236

```text
  const FX = new FXEngine();
```

Creates the singleton FX service used by all managers.

### Line 237

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 238

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 239

```text
  // 2. BLACKJACK 21 TABLE ENGINE
```

This comment documents the nearby casino behavior: 2. BLACKJACK 21 TABLE ENGINE.

### Line 240

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 241

```text
  /** Blackjack is a state machine so betting, player actions, dealer play, and settlement cannot overlap. */
```

Documents blackjack as mutually exclusive BETTING, PLAYER_TURN, DEALER_TURN, and ENDED states.

### Line 242

```text
  class BlackjackEngine {
```

Defines the blackjack table engine.

### Line 243

```text
    constructor(hubController) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 244

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 245

```text
      this.bet = 10;
```

Starts each hand with a $10 wager.

### Line 246

```text
      this.deck = [];
```

Holds the shuffled remaining cards.

### Line 247

```text
      this.playerHand = [];
```

Stores the player’s cards for the current hand.

### Line 248

```text
      this.dealerHand = [];
```

Stores the dealer’s cards for the current hand.

### Line 249

```text
      this.gameState = 'BETTING'; // BETTING, PLAYER_TURN, DEALER_TURN, ENDED
```

Initial state accepts wagers; later states gate legal actions.

### Line 250

```text
      this.dealerHidden = true;
```

Keeps dealer’s second card hidden until player action is complete.

### Line 251

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 252

```text
      this.bindElements();
```

Looks up blackjack controls and score areas.

### Line 253

```text
      if (this.dealBtn) this.init();
```

Initializes listeners only when this page has a deal button.

### Line 254

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 255

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 256

```text
    bindElements() {
```

Defines DOM lookup for blackjack controls.

### Line 257

```text
      this.betEl = document.getElementById('bet-bj-display');
```

Stores the result of `document.getElementById('bet-bj-display')` in `this.betEl` for the current casino operation.

### Line 258

```text
      this.statusEl = document.getElementById('status-bj');
```

Stores the result of `document.getElementById('status-bj')` in `this.statusEl` for the current casino operation.

### Line 259

```text
      this.dealBtn = document.getElementById('btn-bj-deal');
```

Stores the result of `document.getElementById('btn-bj-deal')` in `this.dealBtn` for the current casino operation.

### Line 260

```text
      this.hitBtn = document.getElementById('btn-bj-hit');
```

Stores the result of `document.getElementById('btn-bj-hit')` in `this.hitBtn` for the current casino operation.

### Line 261

```text
      this.standBtn = document.getElementById('btn-bj-stand');
```

Stores the result of `document.getElementById('btn-bj-stand')` in `this.standBtn` for the current casino operation.

### Line 262

```text
      this.doubleBtn = document.getElementById('btn-bj-double');
```

Stores the result of `document.getElementById('btn-bj-double')` in `this.doubleBtn` for the current casino operation.

### Line 263

```text
      this.minusBtn = document.getElementById('btn-bj-minus');
```

Stores the result of `document.getElementById('btn-bj-minus')` in `this.minusBtn` for the current casino operation.

### Line 264

```text
      this.plusBtn = document.getElementById('btn-bj-plus');
```

Stores the result of `document.getElementById('btn-bj-plus')` in `this.plusBtn` for the current casino operation.

### Line 265

```text
      this.maxBtn = document.getElementById('btn-bj-max');
```

Stores the result of `document.getElementById('btn-bj-max')` in `this.maxBtn` for the current casino operation.

### Line 266

```text
      this.clearBtn = document.getElementById('btn-bj-clear');
```

Stores the result of `document.getElementById('btn-bj-clear')` in `this.clearBtn` for the current casino operation.

### Line 267

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 268

```text
      this.dealerCardsEl = document.getElementById('bj-dealer-cards');
```

Stores the result of `document.getElementById('bj-dealer-cards')` in `this.dealerCardsEl` for the current casino operation.

### Line 269

```text
      this.playerCardsEl = document.getElementById('bj-player-cards');
```

Stores the result of `document.getElementById('bj-player-cards')` in `this.playerCardsEl` for the current casino operation.

### Line 270

```text
      this.dealerScoreEl = document.getElementById('bj-dealer-score');
```

Stores the result of `document.getElementById('bj-dealer-score')` in `this.dealerScoreEl` for the current casino operation.

### Line 271

```text
      this.playerScoreEl = document.getElementById('bj-player-score');
```

Stores the result of `document.getElementById('bj-player-score')` in `this.playerScoreEl` for the current casino operation.

### Line 272

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 273

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 274

```text
    init() {
```

Performs initial rendering and binds blackjack events.

### Line 275

```text
      this.updateUI();
```

Displays the initial $10 betting state.

### Line 276

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 277

```text
      this.dealBtn.addEventListener('click', () => this.startHand());
```

Deals only after the deal button is clicked.

### Line 278

```text
      this.hitBtn.addEventListener('click', () => this.playerHit());
```

Routes hit clicks to playerHit.

### Line 279

```text
      this.standBtn.addEventListener('click', () => this.playerStand());
```

Routes stand clicks to playerStand.

### Line 280

```text
      this.doubleBtn.addEventListener('click', () => this.playerDoubleDown());
```

Routes double-down clicks to playerDoubleDown.

### Line 281

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 282

```text
      const changeBet = action => {
```

Creates the shared bet-change guard for betting phase only.

### Line 283

```text
        if (this.gameState !== 'BETTING') return;
```

Prevents changing the wager during a hand.

### Line 284

```text
        FX.playClick();
```

Plays feedback for a valid bet-control action.

### Line 285

```text
        this.bet = action();
```

Computes and stores the new wager.

### Line 286

```text
        this.updateUI();
```

Refreshes wager buttons and wallet display.

### Line 287

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 288

```text
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
```

Clear sets the blackjack wager to zero.

### Line 289

```text
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
```

Max chooses the lesser of wallet and player maxBet.

### Line 290

```text
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
```

Minus delegates the step-down rule to GameRules.

### Line 291

```text
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
```

Plus delegates the step-up rule while respecting balance and maxBet.

### Line 292

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 293

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 294

```text
    createDeck() {
```

Builds a fresh standard 52-card deck.

### Line 295

```text
      const suits = [
```

Defines the four suits and their red/black display metadata.

### Line 296

```text
        { symbol: '♠', isRed: false },
```

Defines configuration field `{ symbol` with value `'♠', isRed: false }`, supplying this exact symbol/theme/game setting.

### Line 297

```text
        { symbol: '♥', isRed: true },
```

Defines configuration field `{ symbol` with value `'♥', isRed: true }`, supplying this exact symbol/theme/game setting.

### Line 298

```text
        { symbol: '♦', isRed: true },
```

Defines configuration field `{ symbol` with value `'♦', isRed: true }`, supplying this exact symbol/theme/game setting.

### Line 299

```text
        { symbol: '♣', isRed: false }
```

Defines configuration field `{ symbol` with value `'♣', isRed: false }`, supplying this exact symbol/theme/game setting.

### Line 300

```text
      ];
```

Applies this concrete value/expression `]` to the surrounding casino engine state.

### Line 301

```text
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
```

Defines thirteen ranks; face cards and ace are valued later.

### Line 302

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 303

```text
      this.deck = [];
```

Discards any old deck before rebuilding.

### Line 304

```text
      suits.forEach(suit => {
```

Iterates each suit.

### Line 305

```text
        values.forEach(val => {
```

Adds every rank for the current suit.

### Line 306

```text
          this.deck.push({ value: val, suit: suit.symbol, isRed: suit.isRed });
```

Stores rank, suit glyph, and color flag for one card.

### Line 307

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 308

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 309

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 310

```text
      // Fisher-Yates Shuffle
```

Uses Fisher–Yates to make an unbiased in-place shuffle.

### Line 311

```text
      for (let i = this.deck.length - 1; i > 0; i--) {
```

Walks backward through all positions except index zero.

### Line 312

```text
        const j = Math.floor(Math.random() * (i + 1));
```

Chooses a random remaining position from 0 through i.

### Line 313

```text
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
```

Swaps current card with the selected card.

### Line 314

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 315

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 316

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 317

```text
    drawCard() {
```

Defines drawing from the shuffled deck.

### Line 318

```text
      if (this.deck.length === 0) this.createDeck();
```

Rebuilds if all cards have been consumed.

### Line 319

```text
      return this.deck.pop();
```

Pops the top card from the deck.

### Line 320

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 321

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 322

```text
    calculateHandValue(hand) {
```

Computes blackjack totals with soft-ace adjustment.

### Line 323

```text
      let value = 0;
```

Accumulates the raw total.

### Line 324

```text
      let aces = 0;
```

Counts aces that can be downgraded from 11 to 1.

### Line 325

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 326

```text
      hand.forEach(card => {
```

Examines every card in the hand.

### Line 327

```text
        if (card.value === 'A') {
```

Identifies an ace.

### Line 328

```text
          aces++;
```

Records an ace for possible downgrade.

### Line 329

```text
          value += 11;
```

Initially values an ace at 11.

### Line 330

```text
        } else if (['K', 'Q', 'J'].includes(card.value)) {
```

Values J/Q/K at 10.

### Line 331

```text
          value += 10;
```

Applies this concrete value/expression `value += 10` to the surrounding casino engine state.

### Line 332

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 333

```text
          value += parseInt(card.value, 10);
```

Parses numbered ranks as their integer value.

### Line 334

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 335

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 336

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 337

```text
      while (value > 21 && aces > 0) {
```

Downgrades aces while the total busts.

### Line 338

```text
        value -= 10;
```

Changes one ace from 11 to 1 by subtracting 10.

### Line 339

```text
        aces--;
```

Consumes one available ace downgrade.

### Line 340

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 341

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 342

```text
      return value;
```

Returns the best total found.

### Line 343

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 344

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 345

```text
    startHand() {
```

Starts a hand only when not settling, in BETTING, and the wager passes legal/balance/max checks.

### Line 346

```text
      if (this.hub.isSettling || this.gameState !== 'BETTING' || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 347

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 348

```text
      FX.playClick();
```

Plays the deal sound.

### Line 349

```text
      this.hub.modifyBalance(-this.bet);
```

Debits the initial wager from the shared wallet.

### Line 350

```text
      JackpotManager.contribute(this.bet * 0.015);
```

Adds 1.5% of the wager to the progressive jackpot.

### Line 351

```text
      window.XP.addWagerXP(this.bet);
```

Awards wager XP based on the stake.

### Line 352

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 353

```text
      this.createDeck();
```

Creates and shuffles a new deck for the hand.

### Line 354

```text
      this.playerHand = [this.drawCard(), this.drawCard()];
```

Deals two cards to the player.

### Line 355

```text
      this.dealerHand = [this.drawCard(), this.drawCard()];
```

Deals two cards to the dealer.

### Line 356

```text
      this.dealerHidden = true;
```

Hides dealer hole card during player turn.

### Line 357

```text
      this.gameState = 'PLAYER_TURN';
```

Moves state to PLAYER_TURN.

### Line 358

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 359

```text
      this.setStatus('YOUR TURN — HIT, STAND, OR DOUBLE', 'status-spinning');
```

Shows available player actions.

### Line 360

```text
      this.renderHands();
```

Renders both hands with the hole card concealed.

### Line 361

```text
      this.updateUI();
```

Refreshes controls and balance.

### Line 362

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 363

```text
      // Check for Natural Blackjack
```

Checks for natural blackjack immediately after the deal.

### Line 364

```text
      if (this.calculateHandValue(this.playerHand) === 21) {
```

Recognizes a two-card total of exactly 21.

### Line 365

```text
        this.dealerHidden = false;
```

Reveals the dealer before natural settlement.

### Line 366

```text
        this.renderHands();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 367

```text
        if (this.calculateHandValue(this.dealerHand) === 21) {
```

Checks whether dealer also has natural 21.

### Line 368

```text
          this.endHand('PUSH! Both hit Natural Blackjack.', 'status-spinning', this.bet);
```

Returns the original stake for a push.

### Line 369

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 370

```text
          const winAmount = this.bet + (this.bet * 1.5);
```

Calculates blackjack return as stake plus 1.5× profit, i.e. 2.5× stake total.

### Line 371

```text
          this.endHand(`🎉 BLACKJACK! WON +$${winAmount}!`, 'status-win', winAmount);
```

Settles the player natural as a win.

### Line 372

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 373

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 374

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 375

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 376

```text
    playerHit() {
```

Defines the hit action.

### Line 377

```text
      if (this.gameState !== 'PLAYER_TURN') return;
```

Allows hit only during PLAYER_TURN.

### Line 378

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 379

```text
      FX.playClick();
```

Plays hit feedback.

### Line 380

```text
      this.playerHand.push(this.drawCard());
```

Adds one drawn card to player hand.

### Line 381

```text
      this.renderHands();
```

Updates rendered cards.

### Line 382

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 383

```text
      if (this.calculateHandValue(this.playerHand) > 21) {
```

Checks whether player total exceeded 21.

### Line 384

```text
        this.dealerHidden = false;
```

Reveals dealer after player busts.

### Line 385

```text
        this.renderHands();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 386

```text
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
```

Settles a bust with zero return.

### Line 387

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 388

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 389

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 390

```text
    playerDoubleDown() {
```

Defines double-down: one extra equal stake, one card, then forced stand.

### Line 391

```text
      if (this.gameState !== 'PLAYER_TURN' || this.hub.balance < this.bet || this.playerHand.length !== 2) return;
```

Requires player turn, enough wallet for second stake, and exactly two original cards.

### Line 392

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 393

```text
      FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 394

```text
      this.hub.modifyBalance(-this.bet);
```

Debits the extra stake.

### Line 395

```text
      JackpotManager.contribute(this.bet * 0.015);
```

Adds the second stake’s 1.5% contribution.

### Line 396

```text
      window.XP.addWagerXP(this.bet);
```

Awards XP for the additional stake.

### Line 397

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 398

```text
      this.bet *= 2;
```

Doubles the wager used for settlement.

### Line 399

```text
      this.playerHand.push(this.drawCard());
```

Deals the single double-down card.

### Line 400

```text
      this.renderHands();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 401

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 402

```text
      if (this.calculateHandValue(this.playerHand) > 21) {
```

Tests whether the doubled hand busts.

### Line 403

```text
        this.dealerHidden = false;
```

Reveals dealer on bust.

### Line 404

```text
        this.renderHands();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 405

```text
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
```

Settles double-down bust with no return.

### Line 406

```text
      } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 407

```text
        this.playerStand();
```

Otherwise forces dealer resolution after exactly one double card.

### Line 408

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 409

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 410

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 411

```text
    async playerStand() {
```

Defines asynchronous stand/dealer resolution.

### Line 412

```text
      if (this.gameState !== 'PLAYER_TURN') return;
```

Rejects stand outside PLAYER_TURN.

### Line 413

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 414

```text
      FX.playClick();
```

Plays stand feedback.

### Line 415

```text
      this.gameState = 'DEALER_TURN';
```

Transitions to DEALER_TURN.

### Line 416

```text
      this.dealerHidden = false;
```

Reveals dealer hand.

### Line 417

```text
      this.renderHands();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 418

```text
      this.setStatus('DEALER IS DRAWING...', 'status-spinning');
```

Displays dealer draw status.

### Line 419

```text
      this.updateUI();
```

Updates controls while dealer acts.

### Line 420

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 421

```text
      while (this.calculateHandValue(this.dealerHand) < 17) {
```

Dealer must draw until total reaches at least 17.

### Line 422

```text
        await new Promise(r => setTimeout(r, 600));
```

Waits 600 ms between dealer cards for visible pacing.

### Line 423

```text
        this.dealerHand.push(this.drawCard());
```

Draws another dealer card.

### Line 424

```text
        FX.playReelStop();
```

Uses a reel-stop sound for each dealer draw.

### Line 425

```text
        this.renderHands();
```

Renders the new dealer hand.

### Line 426

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 427

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 428

```text
      this.evaluateOutcome();
```

Compares final totals and pays the result.

### Line 429

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 430

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 431

```text
    evaluateOutcome() {
```

Defines blackjack outcome comparison.

### Line 432

```text
      const pVal = this.calculateHandValue(this.playerHand);
```

Computes player total.

### Line 433

```text
      const dVal = this.calculateHandValue(this.dealerHand);
```

Computes dealer total.

### Line 434

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 435

```text
      if (dVal > 21) {
```

Checks dealer bust above 21.

### Line 436

```text
        this.endHand(`DEALER BUSTS (${dVal})! WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
```

Pays 2× stake when dealer busts, including returned stake plus equal winnings.

### Line 437

```text
      } else if (pVal > dVal) {
```

Checks player total greater than dealer without busting.

### Line 438

```text
        this.endHand(`WINNER! ${pVal} BEATS ${dVal}. WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
```

Pays 2× stake for a normal win.

### Line 439

```text
      } else if (pVal === dVal) {
```

Checks equal totals for a push.

### Line 440

```text
        this.endHand(`PUSH (${pVal} = ${dVal})! Bet refunded.`, 'status-spinning', this.bet);
```

Returns exactly the stake on a push.

### Line 441

```text
      } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 442

```text
        this.endHand(`DEALER WINS (${dVal} vs ${pVal}).`, 'status-loss', 0);
```

Pays zero when dealer wins.

### Line 443

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 444

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 445

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 446

```text
    endHand(message, statusClass, payoutAmount) {
```

Defines one idempotent settlement path.

### Line 447

```text
      if (this.gameState === 'ENDED' || this.gameState === 'BETTING') return;
```

Rejects duplicate settlement or calls after returning to betting.

### Line 448

```text
      this.gameState = 'ENDED';
```

Marks hand ended before side effects.

### Line 449

```text
      window.Accomplishments?.recordGame('blackjack', { stake: this.bet, payout: payoutAmount });
```

Records stake and payout in accomplishments.

### Line 450

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 451

```text
      if (payoutAmount > 0) {
```

Checks whether any positive return is due.

### Line 452

```text
        this.hub.modifyBalance(payoutAmount);
```

Credits the payout to the shared wallet.

### Line 453

```text
        if (statusClass === 'status-win') {
```

Only winning settlements trigger celebration.

### Line 454

```text
          FX.playWinSound();
```

Plays the win melody.

### Line 455

```text
          FX.spawnConfetti(50);
```

Spawns 50 confetti particles.

### Line 456

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 457

```text
      } else {
```

Uses a click sound for zero-return outcomes.

### Line 458

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 459

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 460

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 461

```text
      this.setStatus(message, statusClass);
```

Displays outcome text and styling.

### Line 462

```text
      this.updateUI();
```

Refreshes buttons and global balance.

### Line 463

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 464

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 465

```text
    renderHands() {
```

Defines dealer/player DOM rendering.

### Line 466

```text
      // Render Dealer Cards
```

This comment documents the nearby casino behavior: Render Dealer Cards.

### Line 467

```text
      this.dealerCardsEl.innerHTML = '';
```

Clears old dealer cards.

### Line 468

```text
      this.dealerHand.forEach((card, idx) => {
```

Iterates dealer cards.

### Line 469

```text
        if (idx === 1 && this.dealerHidden) {
```

Hides only dealer index 1 while dealerHidden is true.

### Line 470

```text
          const cardEl = document.createElement('div');
```

Creates a visual card-back element.

### Line 471

```text
          cardEl.className = 'playing-card card-back';
```

Applies card-back styling.

### Line 472

```text
          this.dealerCardsEl.appendChild(cardEl);
```

Adds the hidden card to dealer display.

### Line 473

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 474

```text
          this.dealerCardsEl.appendChild(this.createCardElement(card));
```

Adds a visible card element otherwise.

### Line 475

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 476

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 477

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 478

```text
      this.dealerScoreEl.textContent = this.dealerHidden ? '?' : this.calculateHandValue(this.dealerHand);
```

Shows ? for hidden dealer score, otherwise calculated total.

### Line 479

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 480

```text
      // Render Player Cards
```

This comment documents the nearby casino behavior: Render Player Cards.

### Line 481

```text
      this.playerCardsEl.innerHTML = '';
```

Clears old player cards.

### Line 482

```text
      this.playerHand.forEach(card => {
```

Iterates player cards.

### Line 483

```text
        this.playerCardsEl.appendChild(this.createCardElement(card));
```

Appends each visible player card.

### Line 484

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 485

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 486

```text
      this.playerScoreEl.textContent = this.calculateHandValue(this.playerHand);
```

Displays the player total.

### Line 487

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 488

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 489

```text
    createCardElement(card) {
```

Builds one card’s DOM representation.

### Line 490

```text
      const el = document.createElement('div');
```

Creates a card container.

### Line 491

```text
      el.className = `playing-card ${card.isRed ? 'red-suit' : ''}`;
```

Adds playing-card and conditional red-suit classes.

### Line 492

```text
      el.innerHTML = `
```

Creates rank/suit/rank markup for the card face.

### Line 493

```text
        <div class="card-top">${card.value}</div>
```

Applies this concrete value/expression `<div class="card-top">${card.value}</div>` to the surrounding casino engine state.

### Line 494

```text
        <div class="card-center">${card.suit}</div>
```

Applies this concrete value/expression `<div class="card-center">${card.suit}</div>` to the surrounding casino engine state.

### Line 495

```text
        <div class="card-bottom">${card.value}</div>
```

Applies this concrete value/expression `<div class="card-bottom">${card.value}</div>` to the surrounding casino engine state.

### Line 496

```text
      `;
```

Applies this concrete value/expression ``` to the surrounding casino engine state.

### Line 497

```text
      return el;
```

Returns the card element for insertion.

### Line 498

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 499

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 500

```text
    setStatus(text, statusClass) {
```

Defines blackjack status rendering.

### Line 501

```text
      this.statusEl.textContent = text;
```

Sets visible status text.

### Line 502

```text
      this.statusEl.className = 'status-banner';
```

Resets status classes before applying the new result class.

### Line 503

```text
      if (statusClass) this.statusEl.classList.add(statusClass);
```

Adds win/loss/spinning styling when supplied.

### Line 504

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 505

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 506

```text
    updateUI() {
```

Defines control state synchronization.

### Line 507

```text
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
```

Formats wager using cent-safe slot formatting.

### Line 508

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 509

```text
      const isBetting = this.gameState === 'BETTING' || this.gameState === 'ENDED';
```

Treats BETTING and ENDED as wager/deal phases.

### Line 510

```text
      const isPlayerTurn = this.gameState === 'PLAYER_TURN';
```

Identifies the player-action phase.

### Line 511

```text
      this.maxBtn.disabled = !isBetting || window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet) === 0 || this.bet === window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
```

Disables max when not betting, no legal funds, or already at legal maximum.

### Line 512

```text
      this.clearBtn.disabled = !isBetting || this.bet === 0;
```

Disables clear when not betting or wager is already zero.

### Line 513

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 514

```text
      if (isBetting) {
```

Shows deal controls in betting/ended phases.

### Line 515

```text
        this.dealBtn.classList.replace('hidden-view', 'active-view');
```

Shows the deal button.

### Line 516

```text
        this.hitBtn.classList.replace('active-view', 'hidden-view');
```

Hides hit.

### Line 517

```text
        this.standBtn.classList.replace('active-view', 'hidden-view');
```

Hides stand.

### Line 518

```text
        this.doubleBtn.classList.replace('active-view', 'hidden-view');
```

Hides double.

### Line 519

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 520

```text
        this.dealBtn.disabled = !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
```

Enables deal only when GameRules says the wager is legal.

### Line 521

```text
        this.minusBtn.disabled = this.bet <= 5;
```

Prevents decreasing below the $5 blackjack floor.

### Line 522

```text
        this.plusBtn.disabled = this.bet >= window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
```

Prevents increasing beyond computed maximum.

### Line 523

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 524

```text
        if (this.gameState === 'ENDED') {
```

Handles the post-hand ENDED display.

### Line 525

```text
          this.dealBtn.textContent = 'DEAL AGAIN';
```

Changes deal label to DEAL AGAIN.

### Line 526

```text
          this.gameState = 'BETTING';
```

Immediately returns the state to BETTING after preparing that label.

### Line 527

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 528

```text
          this.dealBtn.textContent = 'DEAL HAND';
```

Uses DEAL HAND for a fresh betting phase.

### Line 529

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 530

```text
      } else if (isPlayerTurn) {
```

Handles player turn controls.

### Line 531

```text
        this.dealBtn.classList.replace('active-view', 'hidden-view');
```

Hides deal during a hand.

### Line 532

```text
        this.hitBtn.classList.replace('hidden-view', 'active-view');
```

Shows hit.

### Line 533

```text
        this.standBtn.classList.replace('hidden-view', 'active-view');
```

Shows stand.

### Line 534

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 535

```text
        if (this.playerHand.length === 2 && this.hub.balance >= this.bet) {
```

Allows double only with two cards and enough wallet for the second stake.

### Line 536

```text
          this.doubleBtn.classList.replace('hidden-view', 'active-view');
```

Shows double when legal.

### Line 537

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 538

```text
          this.doubleBtn.classList.replace('active-view', 'hidden-view');
```

Hides double otherwise.

### Line 539

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 540

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 541

```text
        this.minusBtn.disabled = true;
```

Freezes minus while a hand is active.

### Line 542

```text
        this.plusBtn.disabled = true;
```

Freezes plus while a hand is active.

### Line 543

```text
      } else {
```

Handles dealer-turn controls.

### Line 544

```text
        // Dealer turn
```

This comment documents the nearby casino behavior: Dealer turn.

### Line 545

```text
        this.hitBtn.classList.replace('active-view', 'hidden-view');
```

Hides hit while dealer draws.

### Line 546

```text
        this.standBtn.classList.replace('active-view', 'hidden-view');
```

Hides stand while dealer draws.

### Line 547

```text
        this.doubleBtn.classList.replace('active-view', 'hidden-view');
```

Hides double while dealer draws.

### Line 548

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 549

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 550

```text
      this.hub.updateGlobalUI();
```

Refreshes the shared wallet display.

### Line 551

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 552

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 553

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 554

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 555

```text
  // 3. DAILY WHEEL MANAGER
```

This comment documents the nearby casino behavior: 3. DAILY WHEEL MANAGER.

### Line 556

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 557

```text
  /** Draws the daily bonus wheel on Canvas and enforces a 24-hour cooldown using the active player save. */
```

This comment documents the nearby casino behavior: Draws the daily bonus wheel on Canvas and enforces a 24-hour cooldown using the active player save..

### Line 558

```text
  class DailyWheelManager {
```

Defines the daily wheel manager with an eight-slice reward list and 24-hour cooldown.

### Line 559

```text
    constructor(hubController) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 560

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 561

```text
      this.slices = [
```

Lists each wheel slice’s label, chip amount, and drawing color.

### Line 562

```text
        { label: '$50',   amount: 50,   color: '#e74c3c' },
```

Defines configuration field `{ label` with value `'$50',   amount: 50,   color: '#e74c3c' }`, supplying this exact symbol/theme/game setting.

### Line 563

```text
        { label: '$100',  amount: 100,  color: '#3498db' },
```

Defines configuration field `{ label` with value `'$100',  amount: 100,  color: '#3498db' }`, supplying this exact symbol/theme/game setting.

### Line 564

```text
        { label: '$250',  amount: 250,  color: '#2ecc71' },
```

Defines configuration field `{ label` with value `'$250',  amount: 250,  color: '#2ecc71' }`, supplying this exact symbol/theme/game setting.

### Line 565

```text
        { label: '$500',  amount: 500,  color: '#9b59b6' },
```

Defines configuration field `{ label` with value `'$500',  amount: 500,  color: '#9b59b6' }`, supplying this exact symbol/theme/game setting.

### Line 566

```text
        { label: '$150',  amount: 150,  color: '#e67e22' },
```

Defines configuration field `{ label` with value `'$150',  amount: 150,  color: '#e67e22' }`, supplying this exact symbol/theme/game setting.

### Line 567

```text
        { label: '$1,000',amount: 1000, color: '#f1c40f' },
```

Defines configuration field `{ label` with value `'$1,000',amount: 1000, color: '#f1c40f' }`, supplying this exact symbol/theme/game setting.

### Line 568

```text
        { label: '$75',   amount: 75,   color: '#1abc9c' },
```

Defines configuration field `{ label` with value `'$75',   amount: 75,   color: '#1abc9c' }`, supplying this exact symbol/theme/game setting.

### Line 569

```text
        { label: '$300',  amount: 300,  color: '#34495e' }
```

Defines configuration field `{ label` with value `'$300',  amount: 300,  color: '#34495e' }`, supplying this exact symbol/theme/game setting.

### Line 570

```text
      ];
```

Applies this concrete value/expression `]` to the surrounding casino engine state.

### Line 571

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 572

```text
      this.currentAngle = 0;
```

Starts wheel rotation at angle zero.

### Line 573

```text
      this.isSpinning = false;
```

Tracks whether animation is running.

### Line 574

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 575

```text
      this.bindElements();
```

Finds wheel modal controls and canvas.

### Line 576

```text
      this.initEvents();
```

Binds open, close, and spin events.

### Line 577

```text
      this.drawWheel(0);
```

Draws the wheel in its initial position.

### Line 578

```text
      this.startTimerInterval();
```

Starts the one-second cooldown display timer.

### Line 579

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 580

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 581

```text
    bindElements() {
```

Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.

### Line 582

```text
      this.modalEl = document.getElementById('modal-wheel');
```

Stores the result of `document.getElementById('modal-wheel')` in `this.modalEl` for the current casino operation.

### Line 583

```text
      this.openBtn = document.getElementById('btn-open-wheel');
```

Stores the result of `document.getElementById('btn-open-wheel')` in `this.openBtn` for the current casino operation.

### Line 584

```text
      this.closeBtn = document.getElementById('btn-close-wheel');
```

Stores the result of `document.getElementById('btn-close-wheel')` in `this.closeBtn` for the current casino operation.

### Line 585

```text
      this.spinBtn = document.getElementById('btn-spin-wheel');
```

Stores the result of `document.getElementById('btn-spin-wheel')` in `this.spinBtn` for the current casino operation.

### Line 586

```text
      this.timerEl = document.getElementById('wheel-cooldown-timer');
```

Stores the result of `document.getElementById('wheel-cooldown-timer')` in `this.timerEl` for the current casino operation.

### Line 587

```text
      this.canvas = document.getElementById('wheel-canvas');
```

Stores the result of `document.getElementById('wheel-canvas')` in `this.canvas` for the current casino operation.

### Line 588

```text
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
```

Stores the result of `this.canvas ? this.canvas.getContext('2d') : null` in `this.ctx` for the current casino operation.

### Line 589

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 590

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 591

```text
    initEvents() {
```

Invokes `initEvents` here so the surrounding casino workflow performs the operation represented by this call.

### Line 592

```text
      this.openBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.

### Line 593

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 594

```text
        this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 595

```text
        this.modalEl.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 596

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 597

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 598

```text
      this.closeBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.

### Line 599

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 600

```text
        this.modalEl.classList.replace('active-view', 'hidden-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 601

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 602

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 603

```text
      this.spinBtn?.addEventListener('click', () => this.startSpin());
```

Stores the result of `> this.startSpin())` in `this.spinBtn?.addEventListener('click', ()` for the current casino operation.

### Line 604

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 605

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 606

```text
    drawWheel(angleOffset) {
```

Defines canvas rendering for all wheel slices.

### Line 607

```text
      if (!this.ctx || !this.canvas) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 608

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 609

```text
      const numSlices = this.slices.length;
```

Uses the eight configured rewards.

### Line 610

```text
      const arc = (Math.PI * 2) / numSlices;
```

Divides a full 2π turn into equal slice arcs.

### Line 611

```text
      const centerX = this.canvas.width / 2;
```

Centers drawing horizontally.

### Line 612

```text
      const centerY = this.canvas.height / 2;
```

Centers drawing vertically.

### Line 613

```text
      const radius = centerX - 10;
```

Leaves a 10 px canvas margin.

### Line 614

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 615

```text
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
```

Clears the previous wheel frame.

### Line 616

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 617

```text
      for (let i = 0; i < numSlices; i++) {
```

Draws every slice.

### Line 618

```text
        const angle = angleOffset + (i * arc);
```

Offsets each slice by the current rotation.

### Line 619

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 620

```text
        this.ctx.beginPath();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 621

```text
        this.ctx.fillStyle = this.slices[i].color;
```

Stores the result of `this.slices[i].color` in `this.ctx.fillStyle` for the current casino operation.

### Line 622

```text
        this.ctx.moveTo(centerX, centerY);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 623

```text
        this.ctx.arc(centerX, centerY, radius, angle, angle + arc);
```

Draws one wedge from angle through angle plus one arc.

### Line 624

```text
        this.ctx.fill();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 625

```text
        this.ctx.lineWidth = 2;
```

Stores the result of `2` in `this.ctx.lineWidth` for the current casino operation.

### Line 626

```text
        this.ctx.strokeStyle = '#ffffff';
```

Stores the result of `'#ffffff'` in `this.ctx.strokeStyle` for the current casino operation.

### Line 627

```text
        this.ctx.stroke();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 628

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 629

```text
        this.ctx.save();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 630

```text
        this.ctx.translate(centerX, centerY);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 631

```text
        this.ctx.rotate(angle + arc / 2);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 632

```text
        this.ctx.textAlign = 'right';
```

Stores the result of `'right'` in `this.ctx.textAlign` for the current casino operation.

### Line 633

```text
        this.ctx.fillStyle = '#ffffff';
```

Stores the result of `'#ffffff'` in `this.ctx.fillStyle` for the current casino operation.

### Line 634

```text
        this.ctx.font = 'bold 15px Segoe UI';
```

Stores the result of `'bold 15px Segoe UI'` in `this.ctx.font` for the current casino operation.

### Line 635

```text
        this.ctx.fillText(this.slices[i].label, radius - 20, 5);
```

Writes the reward label near the wedge edge.

### Line 636

```text
        this.ctx.restore();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 637

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 638

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 639

```text
      this.ctx.beginPath();
```

Begins the center hub circle.

### Line 640

```text
      this.ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
```

Uses a 25 px radius for the hub.

### Line 641

```text
      this.ctx.fillStyle = '#181820';
```

Stores the result of `'#181820'` in `this.ctx.fillStyle` for the current casino operation.

### Line 642

```text
      this.ctx.fill();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 643

```text
      this.ctx.lineWidth = 4;
```

Stores the result of `4` in `this.ctx.lineWidth` for the current casino operation.

### Line 644

```text
      this.ctx.strokeStyle = '#ffd700';
```

Stores the result of `'#ffd700'` in `this.ctx.strokeStyle` for the current casino operation.

### Line 645

```text
      this.ctx.stroke();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 646

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 647

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 648

```text
    startSpin() {
```

Starts one eligible wheel spin.

### Line 649

```text
      if (this.hub.isSettling || this.isSpinning || this.getRemainingCooldown() > 0) return;
```

Blocks spins during settlement, another spin, or remaining cooldown.

### Line 650

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 651

```text
      FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 652

```text
      this.isSpinning = true;
```

Marks animation active.

### Line 653

```text
      this.spinBtn.disabled = true;
```

Disables the spin button against duplicate requests.

### Line 654

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 655

```text
      const targetSliceIndex = Math.floor(Math.random() * this.slices.length);
```

Randomly selects one reward index.

### Line 656

```text
      const sliceArc = (Math.PI * 2) / this.slices.length;
```

Computes one equal slice arc.

### Line 657

```text
      const targetAngle = (Math.PI * 2 * 6) - (targetSliceIndex * sliceArc) - (sliceArc / 2) - (Math.PI / 2);
```

Chooses six full turns plus the selected slice alignment under the pointer.

### Line 658

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 659

```text
      const startTime = performance.now();
```

Records the animation start timestamp.

### Line 660

```text
      const duration = 4000;
```

Runs the wheel for 4000 ms.

### Line 661

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 662

```text
      const animate = (now) => {
```

Stores the result of `(now) => {` in `const animate` for the current casino operation.

### Line 663

```text
        const elapsed = now - startTime;
```

Computes elapsed animation time.

### Line 664

```text
        const progress = Math.min(1, elapsed / duration);
```

Clamps progress to [0,1].

### Line 665

```text
        const easeOut = 1 - Math.pow(1 - progress, 3);
```

Applies cubic ease-out, fast initially and slow at the end.

### Line 666

```text
        this.currentAngle = easeOut * targetAngle;
```

Converts eased progress into the current angle.

### Line 667

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 668

```text
        this.drawWheel(this.currentAngle);
```

Redraws at that angle.

### Line 669

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 670

```text
        if (progress < 1) {
```

Continues frames until complete.

### Line 671

```text
          requestAnimationFrame(animate);
```

Schedules the shown delayed or next-frame casino work.

### Line 672

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 673

```text
          this.isSpinning = false;
```

Marks wheel idle at completion.

### Line 674

```text
          this.hub.player.lastSpinTime = Date.now();
```

Stores the current time as lastSpinTime.

### Line 675

```text
          this.saveState();
```

Persists cooldown state.

### Line 676

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 677

```text
          const wonSlice = this.slices[targetSliceIndex];
```

Gets the selected reward slice.

### Line 678

```text
          this.hub.modifyBalance(wonSlice.amount);
```

Credits its chip amount.

### Line 679

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 680

```text
          FX.playJackpotSound();
```

Plays jackpot fanfare.

### Line 681

```text
          FX.spawnConfetti(100);
```

Creates a 100-particle celebration.

### Line 682

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 683

```text
          alert(`🎉 DAILY BONUS CLAIMED!\nYou won +$${wonSlice.amount.toLocaleString()} Free Chips!`);
```

Informs the player of the exact free-chip reward.

### Line 684

```text
          this.updateUI();
```

Refreshes cooldown/button UI.

### Line 685

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 686

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 687

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 688

```text
      requestAnimationFrame(animate);
```

Schedules the shown delayed or next-frame casino work.

### Line 689

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 690

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 691

```text
    getRemainingCooldown() {
```

Defines remaining cooldown calculation.

### Line 692

```text
      const cooldownMs = 24 * 60 * 60 * 1000;
```

Sets cooldown to 24 hours in milliseconds.

### Line 693

```text
      const elapsed = Date.now() - this.hub.player.lastSpinTime;
```

Computes time since last spin.

### Line 694

```text
      return Math.max(0, cooldownMs - elapsed);
```

Never returns a negative remaining duration.

### Line 695

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 696

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 697

```text
    startTimerInterval() {
```

Defines the once-per-second timer.

### Line 698

```text
      setInterval(() => this.updateUI(), 1000);
```

Refreshes wheel UI every 1000 ms.

### Line 699

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 700

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 701

```text
    updateUI() {
```

Defines cooldown/button display updates.

### Line 702

```text
      const remaining = this.getRemainingCooldown();
```

Reads remaining milliseconds.

### Line 703

```text
      if (remaining > 0) {
```

Uses countdown mode while time remains.

### Line 704

```text
        this.spinBtn.disabled = true;
```

Stores the result of `true` in `this.spinBtn.disabled` for the current casino operation.

### Line 705

```text
        this.timerEl.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 706

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 707

```text
        const hrs = String(Math.floor(remaining / 3600000)).padStart(2, '0');
```

Converts remaining milliseconds to two-digit hours.

### Line 708

```text
        const mins = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
```

Extracts two-digit minutes after whole hours.

### Line 709

```text
        const secs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
```

Extracts two-digit seconds after whole minutes.

### Line 710

```text
        this.timerEl.textContent = `NEXT SPIN IN: ${hrs}:${mins}:${secs}`;
```

Displays the countdown string.

### Line 711

```text
      } else {
```

Uses ready mode after cooldown.

### Line 712

```text
        this.spinBtn.disabled = this.isSpinning;
```

Only leaves spin disabled if an animation is still active.

### Line 713

```text
        this.timerEl.classList.replace('active-view', 'hidden-view');
```

Hides the countdown timer.

### Line 714

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 715

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 716

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 717

```text
    saveState() {
```

Delegates wheel persistence to the hub.

### Line 718

```text
      this.hub.saveState();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 719

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 720

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 721

```text
    resetState() {
```

Defines wheel reset for administrative reset controls.

### Line 722

```text
      this.hub.player.lastSpinTime = 0;
```

Clears lastSpinTime, making the wheel immediately eligible.

### Line 723

```text
      this.saveState();
```

Persists the reset.

### Line 724

```text
      this.updateUI();
```

Refreshes the wheel UI.

### Line 725

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 726

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 727

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 728

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 729

```text
  // 4. SETTINGS & THEME MANAGER
```

This comment documents the nearby casino behavior: 4. SETTINGS & THEME MANAGER.

### Line 730

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 731

```text
  /** Keeps sound and CSS themes in sync with the controls and encrypted active-profile settings. */
```

This comment documents the nearby casino behavior: Keeps sound and CSS themes in sync with the controls and encrypted active-profile settings..

### Line 732

```text
  class SettingsManager {
```

Defines settings manager for volume, mute, and theme persistence.

### Line 733

```text
    constructor(hubController) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 734

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 735

```text
      this.bindElements();
```

Finds settings controls.

### Line 736

```text
      this.loadSettings();
```

Loads saved settings into controls and FX.

### Line 737

```text
      this.initEvents();
```

Binds settings events.

### Line 738

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 739

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 740

```text
    bindElements() {
```

Looks up modal and settings elements.

### Line 741

```text
      this.modalEl = document.getElementById('modal-settings');
```

Stores the result of `document.getElementById('modal-settings')` in `this.modalEl` for the current casino operation.

### Line 742

```text
      this.openBtn = document.getElementById('btn-open-settings');
```

Stores the result of `document.getElementById('btn-open-settings')` in `this.openBtn` for the current casino operation.

### Line 743

```text
      this.closeBtn = document.getElementById('btn-close-settings');
```

Stores the result of `document.getElementById('btn-close-settings')` in `this.closeBtn` for the current casino operation.

### Line 744

```text
      this.volumeSlider = document.getElementById('slider-volume');
```

Stores the result of `document.getElementById('slider-volume')` in `this.volumeSlider` for the current casino operation.

### Line 745

```text
      this.volumeDisplay = document.getElementById('volume-display-val');
```

Stores the result of `document.getElementById('volume-display-val')` in `this.volumeDisplay` for the current casino operation.

### Line 746

```text
      this.muteBtn = document.getElementById('btn-toggle-mute');
```

Stores the result of `document.getElementById('btn-toggle-mute')` in `this.muteBtn` for the current casino operation.

### Line 747

```text
      this.themeBtns = document.querySelectorAll('.theme-btn');
```

Stores the result of `document.querySelectorAll('.theme-btn')` in `this.themeBtns` for the current casino operation.

### Line 748

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 749

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 750

```text
    initEvents() {
```

Defines settings event handlers.

### Line 751

```text
      this.openBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.

### Line 752

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 753

```text
        this.modalEl.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 754

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 755

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 756

```text
      this.closeBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.

### Line 757

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 758

```text
        this.modalEl.classList.replace('active-view', 'hidden-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 759

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 760

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 761

```text
      this.volumeSlider?.addEventListener('input', (e) => {
```

Reads the slider’s integer percentage.

### Line 762

```text
        const val = parseInt(e.target.value, 10);
```

Stores the result of `parseInt(e.target.value, 10)` in `const val` for the current casino operation.

### Line 763

```text
        this.volumeDisplay.textContent = `${val}%`;
```

Displays the percentage.

### Line 764

```text
        FX.setVolume(val / 100);
```

Converts percent to FX’s 0–1 range.

### Line 765

```text
        this.saveSettings();
```

Persists the changed setting.

### Line 766

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 767

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 768

```text
      this.muteBtn?.addEventListener('click', () => {
```

Defines mute toggle behavior.

### Line 769

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 770

```text
        this.isMuted = !this.isMuted;
```

Flips current mute state.

### Line 771

```text
        FX.setMute(this.isMuted);
```

Applies mute to audio.

### Line 772

```text
        this.updateMuteUI();
```

Updates button label/class.

### Line 773

```text
        this.saveSettings();
```

Persists mute state.

### Line 774

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 775

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 776

```text
      this.themeBtns.forEach(btn => {
```

Binds every theme button.

### Line 777

```text
        btn.addEventListener('click', (e) => {
```

Registers the shown browser event handler so this casino control reacts to the specified event.

### Line 778

```text
          FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 779

```text
          const theme = e.currentTarget.getAttribute('data-theme');
```

Reads selected theme identifier.

### Line 780

```text
          this.applyTheme(theme);
```

Applies CSS theme and active selection.

### Line 781

```text
          this.saveSettings();
```

Persists theme.

### Line 782

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 783

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 784

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 785

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 786

```text
    applyTheme(themeName) {
```

Defines theme application.

### Line 787

```text
      if (themeName === 'vegas') {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 788

```text
        document.body.removeAttribute('data-theme');
```

Makes vegas the body default by removing data-theme.

### Line 789

```text
      } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 790

```text
        document.body.setAttribute('data-theme', themeName);
```

Sets body data-theme for non-default palettes.

### Line 791

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 792

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 793

```text
      this.currentTheme = themeName;
```

Remembers selected theme.

### Line 794

```text
      this.themeBtns.forEach(b => {
```

Updates active marker on every theme button.

### Line 795

```text
        if (b.getAttribute('data-theme') === themeName) {
```

Matches each button to selected theme.

### Line 796

```text
          b.classList.add('active-theme');
```

Marks selected theme.

### Line 797

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 798

```text
          b.classList.remove('active-theme');
```

Unmarks other themes.

### Line 799

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 800

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 801

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 802

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 803

```text
    updateMuteUI() {
```

Defines mute button rendering.

### Line 804

```text
      if (this.muteBtn) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 805

```text
        if (this.isMuted) {
```

Only updates an existing mute button.

### Line 806

```text
          this.muteBtn.textContent = 'MUTE: ON';
```

Shows MUTE: ON.

### Line 807

```text
          this.muteBtn.classList.add('is-muted');
```

Adds muted styling.

### Line 808

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 809

```text
          this.muteBtn.textContent = 'MUTE: OFF';
```

Shows MUTE: OFF.

### Line 810

```text
          this.muteBtn.classList.remove('is-muted');
```

Removes muted styling.

### Line 811

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 812

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 813

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 814

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 815

```text
    saveSettings() {
```

Persists current settings through the hub save.

### Line 816

```text
      this.hub.saveState();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 817

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 818

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 819

```text
    getSettings() {
```

Returns sanitized settings for profile storage.

### Line 820

```text
      const volume = this.volumeSlider ? parseInt(this.volumeSlider.value, 10) : 80;
```

Reads slider value or uses 80% default.

### Line 821

```text
      return {
```

Returns an object with fields volume: checks checks that `volume` (volume) is a finite number, excluding NaN and infinity; if true chooses chooses the largest of 0, chooses the smallest of 100, `volume` (volume), otherwise 80; isMuted: checks that `this.isMuted` (the is muted property of this) and true have the same value and type; theme: checks checks whether an array containing "vegas", "midnight", "gold", "money" contains `this.currentTheme` (the current theme property of this); if true chooses `this.currentTheme` (the current theme property of this), otherwise "vegas" to the caller and exits this function.

### Line 822

```text
        volume: Number.isFinite(volume) ? Math.max(0, Math.min(100, volume)) : 80,
```

Clamps valid volume to 0–100 and falls back to 80.

### Line 823

```text
        isMuted: this.isMuted === true,
```

Persists only a true boolean mute value.

### Line 824

```text
        theme: ['vegas', 'midnight', 'gold', 'money'].includes(this.currentTheme) ? this.currentTheme : 'vegas'
```

Accepts only the four supported theme names, defaulting to vegas.

### Line 825

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 826

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 827

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 828

```text
    applySettings(settings = {}) {
```

Applies a saved settings object safely.

### Line 829

```text
      const value = Number(settings.volume);
```

Converts saved volume to a number.

### Line 830

```text
      const volume = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 80;
```

Rounds and clamps finite volume, otherwise 80.

### Line 831

```text
      const theme = ['vegas', 'midnight', 'gold', 'money'].includes(settings.theme) ? settings.theme : 'vegas';
```

Accepts only known themes.

### Line 832

```text
      this.isMuted = settings.isMuted === true;
```

Restores exact boolean mute state.

### Line 833

```text
      if (this.volumeSlider) this.volumeSlider.value = String(volume);
```

Updates slider control.

### Line 834

```text
      if (this.volumeDisplay) this.volumeDisplay.textContent = `${volume}%`;
```

Updates displayed percent.

### Line 835

```text
      FX.setVolume(volume / 100);
```

Applies volume to FX.

### Line 836

```text
      FX.setMute(this.isMuted);
```

Applies mute to FX.

### Line 837

```text
      this.updateMuteUI();
```

Refreshes mute control.

### Line 838

```text
      this.applyTheme(theme);
```

Applies the theme.

### Line 839

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 840

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 841

```text
    loadSettings() {
```

Loads the active profile’s settings or defaults.

### Line 842

```text
      const savedSettings = window.LocalProfiles?.getCurrentSave().settings || {};
```

Reads settings from the active profile save.

### Line 843

```text
      this.applySettings(savedSettings);
```

Applies those saved values.

### Line 844

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 845

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 846

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 847

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 848

```text
  // 5. XP & PLAYER LEVELING ENGINE
```

This comment documents the nearby casino behavior: 5. XP & PLAYER LEVELING ENGINE.

### Line 849

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 850

```text
  /** Converts virtual wagers to level progress and non-monetary milestones; it does not change wager odds. */
```

This comment documents the nearby casino behavior: Converts virtual wagers to level progress and non-monetary milestones; it does not change wager odds..

### Line 851

```text
  class XPManager {
```

Defines XP and leveling as non-monetary progress attached to wagers.

### Line 852

```text
    constructor(hubController) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 853

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 854

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 855

```text
      this.bindElements();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 856

```text
      this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 857

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 858

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 859

```text
    bindElements() {
```

Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.

### Line 860

```text
      this.levelBadgeEl = document.getElementById('player-level-badge');
```

Stores the result of `document.getElementById('player-level-badge')` in `this.levelBadgeEl` for the current casino operation.

### Line 861

```text
      this.barFillEl = document.getElementById('xp-bar-fill');
```

Stores the result of `document.getElementById('xp-bar-fill')` in `this.barFillEl` for the current casino operation.

### Line 862

```text
      this.barTextEl = document.getElementById('xp-bar-text');
```

Stores the result of `document.getElementById('xp-bar-text')` in `this.barTextEl` for the current casino operation.

### Line 863

```text
      this.vipTagEl = document.getElementById('vip-tier-tag');
```

Stores the result of `document.getElementById('vip-tier-tag')` in `this.vipTagEl` for the current casino operation.

### Line 864

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 865

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 866

```text
    addWagerXP(wagerAmount) {
```

Converts a wager into XP at floor(0.15×wager), with a minimum of 1.

### Line 867

```text
      const xpEarned = Math.max(1, Math.floor(wagerAmount * 0.15));
```

Stores the result of `Math.max(1, Math.floor(wagerAmount * 0.15))` in `const xpEarned` for the current casino operation.

### Line 868

```text
      this.hub.player.xp += xpEarned;
```

Adds earned XP to the active player.

### Line 869

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 870

```text
      while (this.hub.player.xp >= this.getRequiredXP()) {
```

Loops while XP meets the current level threshold.

### Line 871

```text
        this.hub.player.xp -= this.getRequiredXP();
```

Carries excess XP forward by subtracting the threshold.

### Line 872

```text
        this.hub.player.level++;
```

Increments player level.

### Line 873

```text
        this.handleLevelUp();
```

Awards level-up effects.

### Line 874

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 875

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 876

```text
      this.saveState();
```

Persists XP/level changes.

### Line 877

```text
      this.updateUI();
```

Refreshes level and progress UI.

### Line 878

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 879

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 880

```text
    getRequiredXP() {
```

Defines nonlinear XP requirement.

### Line 881

```text
      return Math.floor(100 * Math.pow(this.hub.player.level, 1.2));
```

Computes floor(100×level^1.2).

### Line 882

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 883

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 884

```text
    getVIPTier() {
```

Maps level to VIP label.

### Line 885

```text
      if (this.hub.player.level >= 20) return 'DIAMOND';
```

Level 20+ is DIAMOND.

### Line 886

```text
      if (this.hub.player.level >= 15) return 'PLATINUM';
```

Level 15–19 is PLATINUM.

### Line 887

```text
      if (this.hub.player.level >= 10) return 'GOLD';
```

Level 10–14 is GOLD.

### Line 888

```text
      if (this.hub.player.level >= 5) return 'SILVER';
```

Level 5–9 is SILVER.

### Line 889

```text
      return 'BRONZE';
```

Below level 5 is BRONZE.

### Line 890

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 891

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 892

```text
    handleLevelUp() {
```

Defines level-up reward handling.

### Line 893

```text
      const { level, bonus: levelBonus } = window.GameRules.levelReward(this.hub.player);
```

Gets reward amount and resulting level from shared GameRules.

### Line 894

```text
      const tier = this.getVIPTier();
```

Computes the new VIP tier.

### Line 895

```text
      this.hub.modifyBalance(levelBonus);
```

Credits the virtual-chip level reward.

### Line 896

```text
      FX.playJackpotSound();
```

Plays jackpot fanfare.

### Line 897

```text
      FX.spawnConfetti(120);
```

Spawns 120 confetti particles.

### Line 898

```text
      setTimeout(() => {
```

Delays the alert so celebration rendering can begin.

### Line 899

```text
        alert(`LEVEL UP! You reached Level ${level} (${tier})!\nAwarded +$${levelBonus} virtual-chip bonus! Credit Limit +$250!`);
```

Explains level, tier, chip bonus, and credit-limit increase to the player.

### Line 900

```text
      }, 200);
```

Applies this concrete value/expression `}, 200)` to the surrounding casino engine state.

### Line 901

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 902

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 903

```text
    updateUI() {
```

Invokes `updateUI` here so the surrounding casino workflow performs the operation represented by this call.

### Line 904

```text
      const required = this.getRequiredXP();
```

Stores the result of `this.getRequiredXP()` in `const required` for the current casino operation.

### Line 905

```text
      const pct = Math.min(100, Math.floor((this.hub.player.xp / required) * 100));
```

Stores the result of `Math.min(100, Math.floor((this.hub.player.xp / required) * 100))` in `const pct` for the current casino operation.

### Line 906

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 907

```text
      if (this.levelBadgeEl) this.levelBadgeEl.textContent = `LVL ${this.hub.player.level}`;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 908

```text
      if (this.barFillEl) this.barFillEl.style.width = `${pct}%`;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 909

```text
      if (this.barTextEl) this.barTextEl.textContent = `${this.hub.player.xp} / ${required} XP`;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 910

```text
      if (this.vipTagEl) this.vipTagEl.textContent = this.getVIPTier();
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 911

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 912

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 913

```text
    saveState() {
```

Invokes `saveState` here so the surrounding casino workflow performs the operation represented by this call.

### Line 914

```text
      this.hub.saveState();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 915

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 916

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 917

```text
    resetState() {
```

Invokes `resetState` here so the surrounding casino workflow performs the operation represented by this call.

### Line 918

```text
      this.hub.player.level = 1;
```

Stores the result of `1` in `this.hub.player.level` for the current casino operation.

### Line 919

```text
      this.hub.player.xp = 0;
```

Stores the result of `0` in `this.hub.player.xp` for the current casino operation.

### Line 920

```text
      this.saveState();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 921

```text
      this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 922

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 923

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 924

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 925

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 926

```text
  // 6. PROGRESSIVE JACKPOT MANAGER
```

This comment documents the nearby casino behavior: 6. PROGRESSIVE JACKPOT MANAGER.

### Line 927

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 928

```text
  /** A browser-origin-local demo jackpot; storage events refresh other tabs without a game server. */
```

This comment documents the nearby casino behavior: A browser-origin-local demo jackpot; storage events refresh other tabs without a game server..

### Line 929

```text
  class ProgressiveJackpotManager {
```

Defines the browser-local progressive jackpot; other tabs synchronize through storage events.

### Line 930

```text
    constructor(initialAmount = 10000) {
```

Constructs the jackpot manager with $10,000 fallback.

### Line 931

```text
      this.storageKey = 'ss_casino_shared_jackpot_v1';
```

Uses this localStorage key for the shared browser jackpot.

### Line 932

```text
      this.jackpotEl = document.getElementById('global-jackpot');
```

Finds the global jackpot label.

### Line 933

```text
      window.addEventListener('storage', event => {
```

Listens for changes made by another browser tab.

### Line 934

```text
        if (event.key !== this.storageKey) return;
```

Ignores storage events for unrelated keys.

### Line 935

```text
        const sharedAmount = Number(event.newValue);
```

Converts stored text to a number.

### Line 936

```text
        if (Number.isFinite(sharedAmount) && sharedAmount >= 0) {
```

Accepts finite nonnegative shared jackpot values and redraws them.

### Line 937

```text
          this.currentJackpot = sharedAmount;
```

Stores the result of `sharedAmount` in `this.currentJackpot` for the current casino operation.

### Line 938

```text
          this.updateDisplay();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 939

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 940

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 941

```text
      this.loadState(initialAmount);
```

Loads shared/local saved amount.

### Line 942

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 943

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 944

```text
    contribute(amount) {
```

Adds a valid positive contribution.

### Line 945

```text
      const contribution = Number(amount);
```

Stores the result of `Number(amount)` in `const contribution` for the current casino operation.

### Line 946

```text
      if (!Number.isFinite(contribution) || contribution <= 0) return;
```

Normalizes caller amount to a number.

### Line 947

```text
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
```

Prefers the latest shared storage value before adding.

### Line 948

```text
      this.currentJackpot += contribution;
```

Adds contribution to current jackpot.

### Line 949

```text
      this.saveState();
```

Persists updated jackpot.

### Line 950

```text
      this.updateDisplay();
```

Refreshes jackpot display.

### Line 951

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 952

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 953

```text
    claimJackpot() {
```

Defines jackpot claim/reset-to-seed behavior.

### Line 954

```text
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
```

Stores the result of `this.readSharedAmount() ?? this.currentJackpot` in `this.currentJackpot` for the current casino operation.

### Line 955

```text
      const awarded = this.currentJackpot;
```

Captures amount awarded before reset.

### Line 956

```text
      this.currentJackpot = 5000;
```

Reseeds jackpot at $5,000 after claim.

### Line 957

```text
      this.saveState();
```

Persists the reseed.

### Line 958

```text
      this.updateDisplay();
```

Refreshes display.

### Line 959

```text
      return awarded;
```

Returns amount that was awarded.

### Line 960

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 961

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 962

```text
    readSharedAmount() {
```

Reads browser-shared jackpot safely.

### Line 963

```text
      try {
```

Applies this concrete value/expression `try {` to the surrounding casino engine state.

### Line 964

```text
        const stored = localStorage.getItem(this.storageKey);
```

Reads localStorage value.

### Line 965

```text
        if (stored === null) return null;
```

Distinguishes absent storage from zero.

### Line 966

```text
        const amount = Number(stored);
```

Accepts only finite nonnegative stored values.

### Line 967

```text
        return Number.isFinite(amount) && amount >= 0 ? amount : null;
```

Returns checks uses checks whether `amount` (amount) is at least 0 only if checks that `amount` (amount) is a finite number, excluding NaN and infinity is truthy; otherwise keeps the falsy first value; if true chooses `amount` (amount), otherwise null to the caller and exits this function.

### Line 968

```text
      } catch (error) {
```

Returns null when storage access or parsing fails.

### Line 969

```text
        return null;
```

Returns null to the caller and exits this function.

### Line 970

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 971

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 972

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 973

```text
    saveState() {
```

Defines jackpot persistence.

### Line 974

```text
      try {
```

Applies this concrete value/expression `try {` to the surrounding casino engine state.

### Line 975

```text
        localStorage.setItem(this.storageKey, String(this.currentJackpot));
```

Stores amount as text because localStorage stores strings.

### Line 976

```text
      } catch (error) {
```

Invokes `} catch` here so the surrounding casino workflow performs the operation represented by this call.

### Line 977

```text
        console.error('Shared local jackpot could not be saved to this browser.', error);
```

Logs storage failure without crashing gameplay.

### Line 978

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 979

```text
      window.LocalSave?.queueFileSave();
```

Queues linked-file persistence when available.

### Line 980

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 981

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 982

```text
    loadState(defaultAmount) {
```

Loads shared jackpot with a default fallback.

### Line 983

```text
      const sharedAmount = this.readSharedAmount();
```

Checks localStorage first.

### Line 984

```text
      if (sharedAmount !== null) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 985

```text
        this.currentJackpot = sharedAmount;
```

Uses valid shared value.

### Line 986

```text
      } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 987

```text
        const saved = window.LocalProfiles?.getCurrentSave().jackpot;
```

Falls back to the active profile’s saved legacy jackpot.

### Line 988

```text
        const legacyAmount = Number(saved);
```

Converts legacy saved amount.

### Line 989

```text
        this.currentJackpot = Number.isFinite(legacyAmount) && legacyAmount >= 0 ? legacyAmount : defaultAmount;
```

Accepts valid legacy amount, otherwise uses default.

### Line 990

```text
        this.saveState();
```

Writes the migrated/default amount to shared storage.

### Line 991

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 992

```text
      this.updateDisplay();
```

Updates visible jackpot.

### Line 993

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 994

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 995

```text
    setJackpot(amount) {
```

Defines validated administrative jackpot setter.

### Line 996

```text
      const parsed = Number(amount);
```

Stores the result of `Number(amount)` in `const parsed` for the current casino operation.

### Line 997

```text
      if (!Number.isFinite(parsed) || parsed < 0) return false;
```

Rejects nonnumeric or negative amounts.

### Line 998

```text
      this.currentJackpot = parsed;
```

Stores the requested amount.

### Line 999

```text
      this.saveState();
```

Persists it.

### Line 1000

```text
      this.updateDisplay();
```

Refreshes display.

### Line 1001

```text
      return true;
```

Reports success.

### Line 1002

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1003

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1004

```text
    resetState() {
```

Defines jackpot reset.

### Line 1005

```text
      this.currentJackpot = 10000;
```

Restores $10,000 seed.

### Line 1006

```text
      this.saveState();
```

Persists reset.

### Line 1007

```text
      this.updateDisplay();
```

Refreshes display.

### Line 1008

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1009

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1010

```text
    updateDisplay() {
```

Defines jackpot label formatting.

### Line 1011

```text
      if (this.jackpotEl) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1012

```text
        this.jackpotEl.textContent = `$${this.currentJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
```

Shows dollars with commas and exactly two decimals.

### Line 1013

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1014

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1015

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1016

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1017

```text
  const JackpotManager = new ProgressiveJackpotManager(10000);
```

Creates the singleton seeded at $10,000.

### Line 1018

```text
  window.JackpotManager = JackpotManager;
```

Publishes it for games and UI.

### Line 1019

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1020

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1021

```text
  // 7. BANK & LOAN MANAGER
```

This comment documents the nearby casino behavior: 7. BANK & LOAN MANAGER.

### Line 1022

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1023

```text
  /** Implements virtual-chip borrowing and repayment in the player model; no payment rail or real credit is involved. */
```

This comment documents the nearby casino behavior: Implements virtual-chip borrowing and repayment in the player model; no payment rail or real credit is involved..

### Line 1024

```text
  class BankManager {
```

Defines virtual-chip bank and loan manager; debt is not real credit.

### Line 1025

```text
    constructor(hubController) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1026

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 1027

```text
      this.interestRate = 0.10;
```

Sets loan interest to 10%.

### Line 1028

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1029

```text
      this.bindElements();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1030

```text
      this.initEvents();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1031

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1032

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1033

```text
    bindElements() {
```

Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1034

```text
      this.modalEl = document.getElementById('modal-bank');
```

Stores the result of `document.getElementById('modal-bank')` in `this.modalEl` for the current casino operation.

### Line 1035

```text
      this.openBtn = document.getElementById('btn-open-bank');
```

Stores the result of `document.getElementById('btn-open-bank')` in `this.openBtn` for the current casino operation.

### Line 1036

```text
      this.closeBtn = document.getElementById('btn-close-bank');
```

Stores the result of `document.getElementById('btn-close-bank')` in `this.closeBtn` for the current casino operation.

### Line 1037

```text
      this.debtDisplayEl = document.getElementById('bank-debt-display');
```

Stores the result of `document.getElementById('bank-debt-display')` in `this.debtDisplayEl` for the current casino operation.

### Line 1038

```text
      this.creditDisplayEl = document.getElementById('bank-credit-display');
```

Stores the result of `document.getElementById('bank-credit-display')` in `this.creditDisplayEl` for the current casino operation.

### Line 1039

```text
      this.repay100Btn = document.getElementById('btn-repay-100');
```

Stores the result of `document.getElementById('btn-repay-100')` in `this.repay100Btn` for the current casino operation.

### Line 1040

```text
      this.repayAllBtn = document.getElementById('btn-repay-all');
```

Stores the result of `document.getElementById('btn-repay-all')` in `this.repayAllBtn` for the current casino operation.

### Line 1041

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1042

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1043

```text
    initEvents() {
```

Invokes `initEvents` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1044

```text
      this.openBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.openBtn?.addEventListener('click', ()` for the current casino operation.

### Line 1045

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1046

```text
        this.updateModalUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1047

```text
        this.modalEl.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1048

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1049

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1050

```text
      this.closeBtn?.addEventListener('click', () => {
```

Stores the result of `> {` in `this.closeBtn?.addEventListener('click', ()` for the current casino operation.

### Line 1051

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1052

```text
        this.modalEl.classList.replace('active-view', 'hidden-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1053

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1054

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1055

```text
      document.querySelectorAll('.btn-preset-loan').forEach(btn => {
```

Invokes `document.querySelectorAll` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1056

```text
        btn.addEventListener('click', (e) => {
```

Registers the shown browser event handler so this casino control reacts to the specified event.

### Line 1057

```text
          const amount = parseFloat(e.target.getAttribute('data-amount'));
```

Stores the result of `parseFloat(e.target.getAttribute('data-amount'))` in `const amount` for the current casino operation.

### Line 1058

```text
          this.takeLoan(amount);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1059

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 1060

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1061

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1062

```text
      this.repay100Btn?.addEventListener('click', () => this.repayLoan(100));
```

Stores the result of `> this.repayLoan(100))` in `this.repay100Btn?.addEventListener('click', ()` for the current casino operation.

### Line 1063

```text
      this.repayAllBtn?.addEventListener('click', () => this.repayLoan(this.hub.player.debt));
```

Stores the result of `> this.repayLoan(this.hub.player.debt))` in `this.repayAllBtn?.addEventListener('click', ()` for the current casino operation.

### Line 1064

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1065

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1066

```text
    takeLoan(amount) {
```

Defines loan issuance.

### Line 1067

```text
      if (this.hub.isSettling) return;
```

Blocks loan changes during settlement.

### Line 1068

```text
      if (this.hub.player.debt + amount > this.hub.player.creditLimit) {
```

Rejects borrowing when existing debt plus requested principal exceeds creditLimit.

### Line 1069

```text
        alert(`Loan request exceeds maximum credit limit of $${this.hub.player.creditLimit.toLocaleString()}!`);
```

Explains the credit-limit rejection.

### Line 1070

```text
        return;
```

Applies this concrete value/expression `return` to the surrounding casino engine state.

### Line 1071

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1072

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1073

```text
      const totalCharge = amount * (1 + this.interestRate);
```

Charges principal×1.10, so a $100 loan creates $110 debt.

### Line 1074

```text
      this.hub.player.debt += totalCharge;
```

Adds the interest-bearing charge to debt.

### Line 1075

```text
      this.hub.modifyBalance(amount);
```

Adds only principal to wallet.

### Line 1076

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1077

```text
      FX.playWinSound();
```

Celebrates successful borrowing.

### Line 1078

```text
      this.saveState();
```

Persists debt and balance.

### Line 1079

```text
      this.updateModalUI();
```

Refreshes bank display.

### Line 1080

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1081

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1082

```text
    repayLoan(amount) {
```

Defines loan repayment.

### Line 1083

```text
      if (this.hub.isSettling) return;
```

Blocks repayment during settlement.

### Line 1084

```text
      if (this.hub.player.debt <= 0) {
```

Checks for no debt.

### Line 1085

```text
        alert('You currently have no outstanding debt!');
```

Explains that there is nothing to repay.

### Line 1086

```text
        return;
```

Applies this concrete value/expression `return` to the surrounding casino engine state.

### Line 1087

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1088

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1089

```text
      const payAmount = Math.min(amount, this.hub.player.debt, this.hub.balance);
```

Caps payment at requested amount, outstanding debt, and wallet balance.

### Line 1090

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1091

```text
      if (payAmount <= 0) {
```

Checks whether usable payment is zero.

### Line 1092

```text
        alert('Insufficient wallet funds to repay loan!');
```

Explains insufficient funds.

### Line 1093

```text
        return;
```

Applies this concrete value/expression `return` to the surrounding casino engine state.

### Line 1094

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1095

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1096

```text
      this.hub.player.debt -= payAmount;
```

Reduces debt by actual payment.

### Line 1097

```text
      this.hub.modifyBalance(-payAmount);
```

Debits wallet by same amount.

### Line 1098

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1099

```text
      FX.playClick();
```

Plays repayment feedback.

### Line 1100

```text
      this.saveState();
```

Persists repayment.

### Line 1101

```text
      this.updateModalUI();
```

Refreshes bank display.

### Line 1102

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1103

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1104

```text
    saveState() {
```

Invokes `saveState` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1105

```text
      this.hub.saveState();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1106

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1107

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1108

```text
    resetState() {
```

Defines bank reset.

### Line 1109

```text
      this.hub.player.debt = 0;
```

Clears debt while leaving credit limit for hub reset.

### Line 1110

```text
      this.saveState();
```

Persists reset.

### Line 1111

```text
      this.updateModalUI();
```

Refreshes modal.

### Line 1112

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1113

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1114

```text
    updateModalUI() {
```

Defines bank modal rendering.

### Line 1115

```text
      if (this.debtDisplayEl) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1116

```text
        this.debtDisplayEl.textContent = `$${this.hub.player.debt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
```

Displays debt as currency.

### Line 1117

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1118

```text
      if (this.creditDisplayEl) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1119

```text
        this.creditDisplayEl.textContent = `$${this.hub.player.creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
```

Displays current credit limit as currency.

### Line 1120

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1121

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1122

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1123

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1124

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1125

```text
  // 8. CENTRAL CASINO HUB CONTROLLER
```

This comment documents the nearby casino behavior: 8. CENTRAL CASINO HUB CONTROLLER.

### Line 1126

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1127

```text
  /** Owns the active Player, lobby navigation, and shared wallet display; games call it to settle chips. */
```

This comment documents the nearby casino behavior: Owns the active Player, lobby navigation, and shared wallet display; games call it to settle chips..

### Line 1128

```text
  class CasinoHubController {
```

Defines central hub owning player, wallet, navigation, and shared settlement lock.

### Line 1129

```text
    constructor(startingBalance = 100) {
```

Accepts a nominal $100 starting balance for initialization.

### Line 1130

```text
      this.globalBalanceEl = document.getElementById('global-balance');
```

Stores the result of `document.getElementById('global-balance')` in `this.globalBalanceEl` for the current casino operation.

### Line 1131

```text
      this.lobbyView = document.getElementById('view-lobby');
```

Stores the result of `document.getElementById('view-lobby')` in `this.lobbyView` for the current casino operation.

### Line 1132

```text
      this.slotClassicView = document.getElementById('view-classic-slots');
```

Stores the result of `document.getElementById('view-classic-slots')` in `this.slotClassicView` for the current casino operation.

### Line 1133

```text
      this.slot5ReelView = document.getElementById('view-5reel-slots');
```

Stores the result of `document.getElementById('view-5reel-slots')` in `this.slot5ReelView` for the current casino operation.

### Line 1134

```text
      this.extraSlotViews = Array.from(document.querySelectorAll('[data-extra-slot-view]'));
```

Stores the result of `Array.from(document.querySelectorAll('[data-extra-slot-view]'))` in `this.extraSlotViews` for the current casino operation.

### Line 1135

```text
      this.coinTossView = document.getElementById('view-coin-toss');
```

Stores the result of `document.getElementById('view-coin-toss')` in `this.coinTossView` for the current casino operation.

### Line 1136

```text
      this.threeCoinTossView = document.getElementById('view-three-coin-toss');
```

Stores the result of `document.getElementById('view-three-coin-toss')` in `this.threeCoinTossView` for the current casino operation.

### Line 1137

```text
      this.blackjackView = document.getElementById('view-blackjack');
```

Stores the result of `document.getElementById('view-blackjack')` in `this.blackjackView` for the current casino operation.

### Line 1138

```text
      this.raceView = document.getElementById('view-horse-racing');
```

Stores the result of `document.getElementById('view-horse-racing')` in `this.raceView` for the current casino operation.

### Line 1139

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1140

```text
      this.currentView = 'lobby';
```

Starts in lobby.

### Line 1141

```text
      const profileSave = window.LocalProfiles.getCurrentSave();
```

Reads the active profile save.

### Line 1142

```text
      this.player = Player.fromProfile(profileSave.player, window.LocalProfiles.activeProfile?.name || 'Player');
```

Builds the Player model from saved data and active profile name.

### Line 1143

```text
      this.initEventListeners();
```

Binds lobby/reset navigation.

### Line 1144

```text
      this.updateGlobalUI();
```

Displays restored balance.

### Line 1145

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1146

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1147

```text
    get balance() {
```

Exposes player.balance as the shared game wallet.

### Line 1148

```text
      return this.player.balance;
```

Returns `this.player.balance` (the balance property of this.player) to the caller and exits this function.

### Line 1149

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1150

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1151

```text
    set balance(value) {
```

Allows managers to set player balance.

### Line 1152

```text
      this.player.balance = value;
```

Stores the result of `value` in `this.player.balance` for the current casino operation.

### Line 1153

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1154

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1155

```text
    modifyBalance(amount) {
```

Defines atomic-looking wallet mutation used by games.

### Line 1156

```text
      this.balance = Math.round((this.balance + amount + Number.EPSILON) * 100) / 100;
```

Adds amount then rounds to cents; EPSILON reduces binary floating-point artifacts.

### Line 1157

```text
      this.saveState();
```

Persists every balance mutation.

### Line 1158

```text
      this.updateGlobalUI();
```

Refreshes global wallet text.

### Line 1159

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1160

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1161

```text
    initEventListeners() {
```

Defines hub navigation/reset events.

### Line 1162

```text
      document.querySelectorAll('.play-btn').forEach(btn => {
```

Binds every play button.

### Line 1163

```text
        btn.addEventListener('click', (e) => {
```

Registers the shown browser event handler so this casino control reacts to the specified event.

### Line 1164

```text
          FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1165

```text
          const gameTarget = e.target.getAttribute('data-game');
```

Reads target game identifier.

### Line 1166

```text
          this.switchView(gameTarget);
```

Switches to that game view.

### Line 1167

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 1168

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1169

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1170

```text
      document.querySelectorAll('.back-lobby-btn').forEach(btn => {
```

Binds lobby-return buttons.

### Line 1171

```text
        btn.addEventListener('click', () => {
```

Registers the shown browser event handler so this casino control reacts to the specified event.

### Line 1172

```text
          FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1173

```text
          this.switchView('lobby');
```

Returns to lobby.

### Line 1174

```text
        });
```

Structural punctuation closes the surrounding block or statement.

### Line 1175

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1176

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1177

```text
      document.getElementById('btn-reset-data')?.addEventListener('click', () => {
```

Binds the casino-data reset control.

### Line 1178

```text
        if (confirm('Reset your casino balance to $100.00, credit, debt, level, XP, and shared jackpot? Your daily-wheel cooldown and race progress will be kept.')) {
```

Requires explicit confirmation and explains preserved wheel/race state.

### Line 1179

```text
          if (RaceGame?.hasPendingTicket() || !LocalProfiles.canSwitchProfile()) {
```

Blocks reset while a race ticket is pending or profile switching is unsafe.

### Line 1180

```text
            alert('Wait for your simulated race to finish before resetting casino data.');
```

Invokes `alert` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1181

```text
            return;
```

Applies this concrete value/expression `return` to the surrounding casino engine state.

### Line 1182

```text
          }
```

Structural punctuation closes the surrounding block or statement.

### Line 1183

```text
          this.resetState();
```

Resets hub wallet/player fields.

### Line 1184

```text
          JackpotManager.resetState();
```

Resets shared jackpot.

### Line 1185

```text
          window.Bank.resetState();
```

Resets bank debt.

### Line 1186

```text
          window.XP.resetState();
```

Resets XP/level.

### Line 1187

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1188

```text
          // Don't reset wheel
```

This comment documents the nearby casino behavior: Don't reset wheel.

### Line 1189

```text
          // window.DailyWheel.resetState();
```

This comment documents the nearby casino behavior: window.DailyWheel.resetState();.

### Line 1190

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1191

```text
          alert('Casino state has been reset to defaults!');
```

Confirms reset completion.

### Line 1192

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1193

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1194

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1195

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1196

```text
    switchView(viewName) {
```

Defines view switching.

### Line 1197

```text
      this.currentView = viewName;
```

Stores current view name.

### Line 1198

```text
      this.lobbyView.classList.replace('active-view', 'hidden-view');
```

Hides lobby.

### Line 1199

```text
      this.slotClassicView.classList.replace('active-view', 'hidden-view');
```

Hides classic slots.

### Line 1200

```text
      this.slot5ReelView.classList.replace('active-view', 'hidden-view');
```

Hides five-reel slots.

### Line 1201

```text
      this.extraSlotViews.forEach(view => view.classList.replace('active-view', 'hidden-view'));
```

Hides catalog extra slot views.

### Line 1202

```text
      this.coinTossView.classList.replace('active-view', 'hidden-view');
```

Hides coin toss.

### Line 1203

```text
      this.threeCoinTossView.classList.replace('active-view', 'hidden-view');
```

Hides three-coin toss.

### Line 1204

```text
      this.blackjackView.classList.replace('active-view', 'hidden-view');
```

Hides blackjack.

### Line 1205

```text
      this.raceView?.classList.replace('active-view', 'hidden-view');
```

Hides optional racing view.

### Line 1206

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1207

```text
      if (viewName === 'lobby') {
```

Shows lobby for lobby target.

### Line 1208

```text
        this.lobbyView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1209

```text
      } else if (viewName === 'classic-slots') {
```

Shows classic slots.

### Line 1210

```text
        this.slotClassicView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1211

```text
      } else if (viewName === '5reel-slots') {
```

Shows five-reel slots.

### Line 1212

```text
        this.slot5ReelView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1213

```text
      } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 1214

```text
        const extraSlotView = this.extraSlotViews.find(view => view.dataset.gameView === viewName);
```

Finds catalog slot whose data-game-view matches target.

### Line 1215

```text
        if (extraSlotView) extraSlotView.classList.replace('hidden-view', 'active-view');
```

Shows matching catalog slot when found.

### Line 1216

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1217

```text
      if (viewName === 'coin-toss') {
```

Shows coin toss.

### Line 1218

```text
        this.coinTossView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1219

```text
      } else if (viewName === 'three-coin-toss') {
```

Shows three-coin toss.

### Line 1220

```text
        this.threeCoinTossView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1221

```text
      } else if (viewName === 'blackjack') {
```

Shows blackjack.

### Line 1222

```text
        this.blackjackView.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1223

```text
      } else if (viewName === 'horse-racing') {
```

Shows horse racing.

### Line 1224

```text
        this.raceView?.classList.replace('hidden-view', 'active-view');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1225

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1226

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1227

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1228

```text
    saveState() {
```

Defines hub save serialization.

### Line 1229

```text
      const current = window.LocalProfiles?.getCurrentSave() || {};
```

Reads current save so unrelated fields can be retained.

### Line 1230

```text
      window.LocalProfiles?.saveCurrent({
```

Writes updated player and settings into active profile.

### Line 1231

```text
        player: this.player.toProfile(),
```

Serializes Player model.

### Line 1232

```text
        settings: window.CasinoSettings?.getSettings() || current.settings
```

Preserves current settings if settings manager is unavailable.

### Line 1233

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1234

```text
      window.LocalSave?.queueFileSave();
```

Queues file export/sync.

### Line 1235

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1236

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1237

```text
    resetState() {
```

Defines casino reset values.

### Line 1238

```text
      this.balance = 100;
```

Restores wallet to $100.

### Line 1239

```text
      this.player.debt = 0;
```

Clears debt.

### Line 1240

```text
      this.player.creditLimit = 500;
```

Restores $500 credit limit.

### Line 1241

```text
      this.player.maxBet = 100;
```

Restores $100 max bet.

### Line 1242

```text
      this.player.level = 1;
```

Restores level 1.

### Line 1243

```text
      this.player.xp = 0;
```

Clears XP.

### Line 1244

```text
      this.saveState();
```

Persists reset player.

### Line 1245

```text
      this.updateGlobalUI();
```

Redraws wallet.

### Line 1246

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1247

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1248

```text
    updateGlobalUI() {
```

Defines global wallet rendering.

### Line 1249

```text
      if (this.globalBalanceEl) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1250

```text
        this.globalBalanceEl.textContent = `$${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
```

Formats balance with commas and cents.

### Line 1251

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1252

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1253

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1254

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1255

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1256

```text
  let RaceGame = null;
```

Holds race engine until its dependencies/startup are ready.

### Line 1257

```text
  const CasinoHub = new CasinoHubController(100);
```

Creates hub using nominal $100 default.

### Line 1258

```text
  window.Bank = new BankManager(CasinoHub);
```

Creates bank manager.

### Line 1259

```text
  window.XP = new XPManager(CasinoHub);
```

Creates XP manager.

### Line 1260

```text
  window.DailyWheel = new DailyWheelManager(CasinoHub);
```

Creates daily wheel manager.

### Line 1261

```text
  window.CasinoSettings = new SettingsManager(CasinoHub);
```

Creates settings manager.

### Line 1262

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1263

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1264

```text
  // 9. COIN TOSS TABLE ENGINE
```

This comment documents the nearby casino behavior: 9. COIN TOSS TABLE ENGINE.

### Line 1265

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1266

```text
  /** Handles a virtual double-or-nothing round and uses a busy flag to block duplicate flips. */
```

This comment documents the nearby casino behavior: Handles a virtual double-or-nothing round and uses a busy flag to block duplicate flips..

### Line 1267

```text
  class CoinTossEngine {
```

Defines coin toss engine for even-money and three-coin rounds.

### Line 1268

```text
    constructor(hubController, triple = false) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1269

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 1270

```text
      this.triple = triple;
```

Stores the result of `triple` in `this.triple` for the current casino operation.

### Line 1271

```text
      this.bet = 10;
```

Starts coin wager at $10.

### Line 1272

```text
      this.choices = triple ? [null, null, null] : ['HEADS'];
```

Uses one HEADS choice for single coin, three unset choices for triple.

### Line 1273

```text
      this.isFlipping = false;
```

Prevents duplicate flips.

### Line 1274

```text
      const prefix = triple ? 'three-coin' : 'coin';
```

Stores the result of `triple ? 'three-coin' : 'coin'` in `const prefix` for the current casino operation.

### Line 1275

```text
      this.rootEl = document.getElementById(`view-${triple ? 'three-coin-toss' : 'coin-toss'}`);
```

Stores the result of `document.getElementById(`view-${triple ? 'three-coin-toss' : 'coin-toss'}`)` in `this.rootEl` for the current casino operation.

### Line 1276

```text
      this.betEl = document.getElementById(`bet-${prefix}-display`);
```

Stores the result of `document.getElementById(`bet-${prefix}-display`)` in `this.betEl` for the current casino operation.

### Line 1277

```text
      this.statusEl = document.getElementById(`status-${prefix}`);
```

Stores the result of `document.getElementById(`status-${prefix}`)` in `this.statusEl` for the current casino operation.

### Line 1278

```text
      this.flipBtn = document.getElementById(`btn-${prefix}-flip`);
```

Stores the result of `document.getElementById(`btn-${prefix}-flip`)` in `this.flipBtn` for the current casino operation.

### Line 1279

```text
      this.maxBtn = document.getElementById(`btn-${prefix}-max`);
```

Stores the result of `document.getElementById(`btn-${prefix}-max`)` in `this.maxBtn` for the current casino operation.

### Line 1280

```text
      this.minusBtn = document.getElementById(`btn-${prefix}-minus`);
```

Stores the result of `document.getElementById(`btn-${prefix}-minus`)` in `this.minusBtn` for the current casino operation.

### Line 1281

```text
      this.plusBtn = document.getElementById(`btn-${prefix}-plus`);
```

Stores the result of `document.getElementById(`btn-${prefix}-plus`)` in `this.plusBtn` for the current casino operation.

### Line 1282

```text
      this.clearBtn = document.getElementById(`btn-${prefix}-clear`);
```

Stores the result of `document.getElementById(`btn-${prefix}-clear`)` in `this.clearBtn` for the current casino operation.

### Line 1283

```text
      this.coins = Array.from(this.rootEl.querySelectorAll('.coin'));
```

Stores the result of `Array.from(this.rootEl.querySelectorAll('.coin'))` in `this.coins` for the current casino operation.

### Line 1284

```text
      this.choiceButtons = Array.from(this.rootEl.querySelectorAll('[data-coin-choice]'));
```

Stores the result of `Array.from(this.rootEl.querySelectorAll('[data-coin-choice]'))` in `this.choiceButtons` for the current casino operation.

### Line 1285

```text
      this.choiceButtons.forEach(button => button.addEventListener('click', () => {
```

Stores the result of `> button.addEventListener('click', () => {` in `this.choiceButtons.forEach(button` for the current casino operation.

### Line 1286

```text
        if (this.isFlipping) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1287

```text
        this.choices[Number(button.dataset.coinIndex)] = button.dataset.coinChoice;
```

Stores the result of `button.dataset.coinChoice` in `this.choices[Number(button.dataset.coinIndex)]` for the current casino operation.

### Line 1288

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1289

```text
        this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1290

```text
      }));
```

Structural punctuation closes the surrounding block or statement.

### Line 1291

```text
      const changeBet = action => {
```

Stores the result of `action => {` in `const changeBet` for the current casino operation.

### Line 1292

```text
        if (this.isFlipping) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1293

```text
        FX.playClick();
```

Invokes `FX.playClick` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1294

```text
        this.bet = action();
```

Stores the result of `action()` in `this.bet` for the current casino operation.

### Line 1295

```text
        this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1296

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 1297

```text
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
```

Stores the result of `> changeBet(() => 0))` in `this.clearBtn.addEventListener('click', ()` for the current casino operation.

### Line 1298

```text
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
```

Stores the result of `> changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)))` in `this.maxBtn.addEventListener('click', ()` for the current casino operation.

### Line 1299

```text
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
```

Stores the result of `> changeBet(() => window.GameRules.decrease(this.bet)))` in `this.minusBtn.addEventListener('click', ()` for the current casino operation.

### Line 1300

```text
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
```

Stores the result of `> changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)))` in `this.plusBtn.addEventListener('click', ()` for the current casino operation.

### Line 1301

```text
      this.flipBtn.addEventListener('click', () => this.startFlip());
```

Stores the result of `> this.startFlip())` in `this.flipBtn.addEventListener('click', ()` for the current casino operation.

### Line 1302

```text
      this.updateUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1303

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1304

```text
    updateUI() {
```

Invokes `updateUI` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1305

```text
      const max = window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
```

Stores the result of `window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)` in `const max` for the current casino operation.

### Line 1306

```text
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
```

Stores the result of `window.SlotBetRules.format(this.bet)` in `this.betEl.textContent` for the current casino operation.

### Line 1307

```text
      this.flipBtn.disabled = this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
```

Stores the result of `this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)` in `this.flipBtn.disabled` for the current casino operation.

### Line 1308

```text
      this.maxBtn.disabled = this.isFlipping || max === 0 || this.bet === max;
```

Stores the result of `this.isFlipping || max === 0 || this.bet === max` in `this.maxBtn.disabled` for the current casino operation.

### Line 1309

```text
      this.clearBtn.disabled = this.isFlipping || this.bet === 0;
```

Stores the result of `this.isFlipping || this.bet === 0` in `this.clearBtn.disabled` for the current casino operation.

### Line 1310

```text
      this.minusBtn.disabled = this.isFlipping || this.bet <= 5;
```

Stores the result of `this.isFlipping || this.bet <= 5` in `this.minusBtn.disabled` for the current casino operation.

### Line 1311

```text
      this.plusBtn.disabled = this.isFlipping || this.bet >= max;
```

Stores the result of `this.isFlipping || this.bet >= max` in `this.plusBtn.disabled` for the current casino operation.

### Line 1312

```text
      this.choiceButtons.forEach(button => {
```

Stores the result of `> {` in `this.choiceButtons.forEach(button` for the current casino operation.

### Line 1313

```text
        const chosen = this.choices[Number(button.dataset.coinIndex)] === button.dataset.coinChoice;
```

Stores the result of `this.choices[Number(button.dataset.coinIndex)] === button.dataset.coinChoice` in `const chosen` for the current casino operation.

### Line 1314

```text
        button.classList.toggle('active-choice', chosen);
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1315

```text
        button.setAttribute('aria-pressed', String(chosen));
```

Invokes `button.setAttribute` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1316

```text
        button.disabled = this.isFlipping;
```

Applies this concrete value/expression `button.disabled = this.isFlipping` to the surrounding casino engine state.

### Line 1317

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1318

```text
      this.hub.updateGlobalUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1319

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1320

```text
    setStatus(text, statusClass) {
```

Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1321

```text
      this.statusEl.textContent = text;
```

Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.

### Line 1322

```text
      this.statusEl.className = `status-banner ${statusClass || ''}`;
```

Stores the result of ``status-banner ${statusClass || ''}`` in `this.statusEl.className` for the current casino operation.

### Line 1323

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1324

```text
    async startFlip() {
```

Defines asynchronous flip/settlement.

### Line 1325

```text
      if (this.hub.isSettling || this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;
```

Requires no global settling, no active flip, complete choices, and legal wager.

### Line 1326

```text
      this.isFlipping = true;
```

Locks the flip against duplicate clicks.

### Line 1327

```text
      const stake = this.bet;
```

Snapshots stake before any animation.

### Line 1328

```text
      const choices = [...this.choices];
```

Copies choices so later UI changes cannot alter this round.

### Line 1329

```text
      const outcomes = this.coins.map(() => Math.random() >= 0.5 ? 'HEADS' : 'TAILS');
```

Generates HEADS/TAILS independently with a 50% threshold per coin.

### Line 1330

```text
      const result = this.triple ? window.GameRules.threeCoinResult(choices, outcomes, stake) : {
```

Uses shared threeCoinResult for triple odds, otherwise builds a single-coin result.

### Line 1331

```text
        correct: Number(choices[0] === outcomes[0]), stake,
```

Records one correct prediction and stake for single coin.

### Line 1332

```text
        payout: choices[0] === outcomes[0] ? Math.round(stake * 200) / 100 : 0
```

Pays exactly 2× stake on a correct single prediction, rounded to cents; loses otherwise.

### Line 1333

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 1334

```text
      // Settle before presentation: refresh cannot leave a wager deducted with an unpaid resolved flip.
```

Commits wallet outcome before animation so reload cannot leave a resolved but unpaid wager.

### Line 1335

```text
      this.hub.modifyBalance(result.payout - stake);
```

Changes wallet by payout minus stake (win +stake, loss -stake).

### Line 1336

```text
      JackpotManager.contribute(stake * 0.015);
```

Adds 1.5% of stake to jackpot even though payout was already settled.

### Line 1337

```text
      window.XP.addWagerXP(stake);
```

Awards XP for the stake.

### Line 1338

```text
      window.Accomplishments?.recordGame(this.triple ? 'three-coin' : 'coin', result);
```

Records the resolved round.

### Line 1339

```text
      FX.playClick();
```

Plays click feedback.

### Line 1340

```text
      FX.playCoinFlipSound();
```

Starts the six-tone flip sound.

### Line 1341

```text
      this.setStatus(this.triple ? 'FLIPPING ALL THREE COINS…' : 'FLIPPING COIN…', 'status-spinning');
```

Shows flipping status.

### Line 1342

```text
      this.updateUI();
```

Disables controls during presentation.

### Line 1343

```text
      await Promise.all(this.coins.map((coin, index) => new Promise(resolve => {
```

Waits for all coin animations to finish.

### Line 1344

```text
        let finished = false;
```

Stores the result of `false` in `let finished` for the current casino operation.

### Line 1345

```text
        const done = () => {
```

Stores the result of `() => {` in `const done` for the current casino operation.

### Line 1346

```text
          if (finished) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1347

```text
          finished = true;
```

Applies this concrete value/expression `finished = true` to the surrounding casino engine state.

### Line 1348

```text
          coin.removeEventListener('animationend', done);
```

Makes each animation completion idempotent.

### Line 1349

```text
          coin.classList.remove('animate-heads', 'animate-tails');
```

Removes animation classes after completion.

### Line 1350

```text
          coin.style.transform = outcomes[index] === 'HEADS' ? 'rotateY(0deg)' : 'rotateY(180deg)';
```

Leaves the coin face matching generated outcome.

### Line 1351

```text
          resolve();
```

Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1352

```text
        };
```

Structural punctuation closes the surrounding block or statement.

### Line 1353

```text
        coin.classList.remove('animate-heads', 'animate-tails');
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1354

```text
        void coin.offsetHeight;
```

Applies this concrete value/expression `void coin.offsetHeight` to the surrounding casino engine state.

### Line 1355

```text
        coin.addEventListener('animationend', done);
```

Listens for CSS animation completion.

### Line 1356

```text
        coin.classList.add(outcomes[index] === 'HEADS' ? 'animate-heads' : 'animate-tails');
```

Starts heads or tails CSS animation according to outcome.

### Line 1357

```text
        setTimeout(done, 2400); // Reduced motion / missing animation event must never lock the table.
```

Fallback timeout at 2.4 seconds prevents reduced-motion/browser issues from locking play.

### Line 1358

```text
      })));
```

Structural punctuation closes the surrounding block or statement.

### Line 1359

```text
      const net = Math.round((result.payout - stake) * 100) / 100;
```

Computes cent-rounded net return.

### Line 1360

```text
      const matched = this.triple ? `${result.correct}/3 correct. ` : '';
```

Adds correct-count text for triple mode.

### Line 1361

```text
      this.setStatus(`${outcomes.join(' / ')} — ${matched}Return ${window.SlotBetRules.format(result.payout)}; stake ${window.SlotBetRules.format(stake)}; net ${net >= 0 ? '+' : '-'}${window.SlotBetRules.format(Math.abs(net))}.`, result.payout > stake ? 'status-win' : 'status-loss');
```

Reports outcomes, returned payout, stake, and signed net.

### Line 1362

```text
      if (result.payout > stake) { FX.playWinSound(); FX.spawnConfetti(40); }
```

Celebrates only when return exceeds stake.

### Line 1363

```text
      this.isFlipping = false;
```

Unlocks flip after presentation.

### Line 1364

```text
      this.updateUI();
```

Refreshes controls.

### Line 1365

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1366

```text
    resetForActiveProfile() {
```

Defines profile-switch reset for coin UI.

### Line 1367

```text
      this.bet = 10;
```

Restores $10 wager.

### Line 1368

```text
      this.choices = this.triple ? [null, null, null] : ['HEADS'];
```

Clears triple choices or defaults single choice to HEADS.

### Line 1369

```text
      this.setStatus(this.triple ? 'PREDICT ALL THREE COINS' : 'PICK HEADS OR TAILS');
```

Shows selection prompt.

### Line 1370

```text
      this.updateUI();
```

Refreshes controls.

### Line 1371

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1372

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1373

```text
  class ThreeCoinToss extends CoinTossEngine {
```

Defines the shown casino manager/engine type and its shared behavior.

### Line 1374

```text
    constructor(hubController) { super(hubController, true); }
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1375

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1376

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1377

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1378

```text
  // 10. CLASSIC 3-REEL SLOT ENGINE
```

This comment documents the nearby casino behavior: 10. CLASSIC 3-REEL SLOT ENGINE.

### Line 1379

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1380

```text
  /** Reusable three-reel engine: each cabinet supplies its template, theme, and cent-safe wager limits. */
```

This comment documents the nearby casino behavior: Reusable three-reel engine: each cabinet supplies its template, theme, and cent-safe wager limits..

### Line 1381

```text
  class ClassicSlotEngine {
```

Defines reusable three-reel slot engine.

### Line 1382

```text
    constructor(hubController, options = {}) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1383

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 1384

```text
      this.rootEl = document.getElementById(options.rootId || 'view-classic-slots');
```

Stores the result of `document.getElementById(options.rootId || 'view-classic-slots')` in `this.rootEl` for the current casino operation.

### Line 1385

```text
      this.betRules = new window.SlotBetRules({
```

Configures cent-safe minimum, step, maximum, and starting wager.

### Line 1386

```text
        minimum: options.minimumBet ?? 5,
```

Defines configuration field `minimum` with value `options.minimumBet ?? 5`, supplying this exact symbol/theme/game setting.

### Line 1387

```text
        step: options.betStep ?? 5,
```

Defines configuration field `step` with value `options.betStep ?? 5`, supplying this exact symbol/theme/game setting.

### Line 1388

```text
        maximum: options.maximumBet ?? Infinity,
```

Defines configuration field `maximum` with value `options.maximumBet ?? Infinity`, supplying this exact symbol/theme/game setting.

### Line 1389

```text
        startingBet: options.startingBet ?? 10
```

Defines configuration field `startingBet` with value `options.startingBet ?? 10`, supplying this exact symbol/theme/game setting.

### Line 1390

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1391

```text
      this.theme = options.theme || {};
```

Stores the result of `options.theme || {}` in `this.theme` for the current casino operation.

### Line 1392

```text
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1393

```text
      this.SYMBOL_SIZE = 90;
```

Uses 90 px symbol cells.

### Line 1394

```text
      this.REEL_COUNT = 3;
```

Models three reels.

### Line 1395

```text
      this.VISIBLE_ROWS = 3;
```

Shows three rows per reel.

### Line 1396

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1397

```text
      // More even common symbols and rarer specials reduce the classic slot hit rate.
```

This comment documents the nearby casino behavior: More even common symbols and rarer specials reduce the classic slot hit rate..

### Line 1398

```text
      this.SYMBOLS = [
```

Defines classic weighted pay symbols.

### Line 1399

```text
        { id: 'cherry', icon: '🍒', multiplier: 1,  weight: 28 },
```

Defines configuration field `{ id` with value `'cherry', icon: '🍒', multiplier: 1,  weight: 28 }`, supplying this exact symbol/theme/game setting.

### Line 1400

```text
        { id: 'lemon',  icon: '🍋', multiplier: 1,  weight: 25 },
```

Defines configuration field `{ id` with value `'lemon',  icon: '🍋', multiplier: 1,  weight: 25 }`, supplying this exact symbol/theme/game setting.

### Line 1401

```text
        { id: 'orange', icon: '🍊', multiplier: 2,  weight: 22 },
```

Defines configuration field `{ id` with value `'orange', icon: '🍊', multiplier: 2,  weight: 22 }`, supplying this exact symbol/theme/game setting.

### Line 1402

```text
        { id: 'bell',   icon: '🔔', multiplier: 4,  weight: 18 },
```

Defines configuration field `{ id` with value `'bell',   icon: '🔔', multiplier: 4,  weight: 18 }`, supplying this exact symbol/theme/game setting.

### Line 1403

```text
        { id: 'wild',   icon: '🃏', multiplier: 8,  weight: 5 },
```

Defines configuration field `{ id` with value `'wild',   icon: '🃏', multiplier: 8,  weight: 5 }`, supplying this exact symbol/theme/game setting.

### Line 1404

```text
        { id: 'seven',  icon: '7️⃣', multiplier: 15, weight: 2 }
```

Defines configuration field `{ id` with value `'seven',  icon: '7️⃣', multiplier: 15, weight: 2 }`, supplying this exact symbol/theme/game setting.

### Line 1405

```text
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));
```

Invokes `].map` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1406

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1407

```text
      this.PAYLINES = [
```

Defines five paylines as reel/row coordinates.

### Line 1408

```text
        [[0,0], [1,0], [2,0]],
```

Applies this concrete value/expression `[[0,0], [1,0], [2,0]],` to the surrounding casino engine state.

### Line 1409

```text
        [[0,1], [1,1], [2,1]],
```

Applies this concrete value/expression `[[0,1], [1,1], [2,1]],` to the surrounding casino engine state.

### Line 1410

```text
        [[0,2], [1,2], [2,2]],
```

Applies this concrete value/expression `[[0,2], [1,2], [2,2]],` to the surrounding casino engine state.

### Line 1411

```text
        [[0,0], [1,1], [2,2]],
```

Applies this concrete value/expression `[[0,0], [1,1], [2,2]],` to the surrounding casino engine state.

### Line 1412

```text
        [[0,2], [1,1], [2,0]]
```

Applies this concrete value/expression `[[0,2], [1,1], [2,0]]` to the surrounding casino engine state.

### Line 1413

```text
      ];
```

Applies this concrete value/expression `]` to the surrounding casino engine state.

### Line 1414

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1415

```text
      this.bet = this.betRules.startingBet;
```

Starts at configured bet.

### Line 1416

```text
      this.isSpinning = false;
```

Tracks reel animation.

### Line 1417

```text
      this.currentGrid = [];
```

Stores current resolved grid.

### Line 1418

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1419

```text
      this.bindElements();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1420

```text
      if (this.spinBtn) this.init();
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1421

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1422

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1423

```text
    bindElements() {
```

Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1424

```text
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-bet]')` in `this.betEl` for the current casino operation.

### Line 1425

```text
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-status]')` in `this.statusEl` for the current casino operation.

### Line 1426

```text
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-spin]')` in `this.spinBtn` for the current casino operation.

### Line 1427

```text
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-max]')` in `this.maxBtn` for the current casino operation.

### Line 1428

```text
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-minus]')` in `this.minusBtn` for the current casino operation.

### Line 1429

```text
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-plus]')` in `this.plusBtn` for the current casino operation.

### Line 1430

```text
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel .strip') || []);
```

Stores the result of `Array.from(this.rootEl?.querySelectorAll('.reel .strip') || [])` in `this.reelStrips` for the current casino operation.

### Line 1431

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1432

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1433

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1434

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1435

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1436

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1437

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1438

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1439

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1440

```text
    setStatus(text, statusClass) {
```

Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1441

```text
      this.statusEl.textContent = text;
```

Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.

### Line 1442

```text
      this.statusEl.className = 'status-banner';
```

Stores the result of `'status-banner'` in `this.statusEl.className` for the current casino operation.

### Line 1443

```text
      if (statusClass) this.statusEl.classList.add(statusClass);
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1444

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1445

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1446

```text
    getRandomSymbol() {
```

Defines weighted random symbol selection.

### Line 1447

```text
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
```

Sums all symbol weights.

### Line 1448

```text
      let random = Math.random() * totalWeight;
```

Draws a random point in the total-weight interval.

### Line 1449

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1450

```text
      for (const symbol of this.SYMBOLS) {
```

Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.

### Line 1451

```text
        if (random < symbol.weight) return symbol;
```

Selects the first symbol whose weight interval contains the draw.

### Line 1452

```text
        random -= symbol.weight;
```

Moves random point past the rejected symbol interval.

### Line 1453

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1454

```text
      return this.SYMBOLS[0];
```

Provides a defensive fallback symbol.

### Line 1455

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1456

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1457

```text
    renderStrip(stripEl, symbolArray) {
```

Renders a strip from symbols.

### Line 1458

```text
      stripEl.innerHTML = '';
```

Removes previous strip children.

### Line 1459

```text
      symbolArray.forEach(sym => {
```

Creates one DOM cell per symbol.

### Line 1460

```text
        const div = document.createElement('div');
```

Stores the result of `document.createElement('div')` in `const div` for the current casino operation.

### Line 1461

```text
        div.className = 'symbol';
```

Creates symbol cell.

### Line 1462

```text
        if (sym.image) {
```

Uses image-backed symbol when configured.

### Line 1463

```text
          const image = document.createElement('img');
```

Stores the result of `document.createElement('img')` in `const image` for the current casino operation.

### Line 1464

```text
          image.className = 'slot-symbol-image';
```

Applies this concrete value/expression `image.className = 'slot-symbol-image'` to the surrounding casino engine state.

### Line 1465

```text
          image.src = sym.image;
```

Loads configured symbol image.

### Line 1466

```text
          image.alt = sym.alt || '';
```

Supplies accessible alt text.

### Line 1467

```text
          div.appendChild(image);
```

Invokes `div.appendChild` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1468

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 1469

```text
          div.textContent = sym.icon;
```

Otherwise displays the symbol icon.

### Line 1470

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1471

```text
        stripEl.appendChild(div);
```

Adds cell to strip.

### Line 1472

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1473

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1474

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1475

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1476

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1477

```text
    animateReel(stripEl, reelIndex, finalSymbols) {
```

Animates one reel toward final symbols.

### Line 1478

```text
      return new Promise(resolve => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.

### Line 1479

```text
        const randomPaddingCount = 20 + (reelIndex * 8);
```

Makes later reels show longer random lead-in.

### Line 1480

```text
        const sequence = [];
```

Stores the result of `[]` in `const sequence` for the current casino operation.

### Line 1481

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1482

```text
        for (let i = 0; i < randomPaddingCount; i++) {
```

Builds random padding before final visible symbols.

### Line 1483

```text
          sequence.push(this.getRandomSymbol());
```

Appends weighted random symbol.

### Line 1484

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1485

```text
        sequence.push(...finalSymbols);
```

Appends the resolved final symbols.

### Line 1486

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1487

```text
        this.renderStrip(stripEl, sequence);
```

Renders full animation sequence.

### Line 1488

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1489

```text
        stripEl.classList.remove('is-spinning');
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1490

```text
        stripEl.style.setProperty('--spin-target-y', '0px');
```

Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1491

```text
        stripEl.offsetHeight;
```

Forces layout read to restart CSS transition from zero.

### Line 1492

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1493

```text
        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
```

Translates strip so its final three symbols occupy the viewport.

### Line 1494

```text
        const duration = 1200 + (reelIndex * 600);
```

Makes each later reel run 600 ms longer.

### Line 1495

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1496

```text
        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
```

Passes target translation to CSS.

### Line 1497

```text
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
```

Passes duration to CSS.

### Line 1498

```text
        stripEl.classList.add('is-spinning');
```

Starts CSS spin.

### Line 1499

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1500

```text
        setTimeout(() => {
```

Schedules the shown delayed or next-frame casino work.

### Line 1501

```text
          FX.playReelStop(this.theme.sounds?.reelStop);
```

Plays theme reel-stop sound when animation ends.

### Line 1502

```text
          resolve();
```

Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1503

```text
        }, duration);
```

Resolves animation promise after configured duration.

### Line 1504

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1505

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1506

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1507

```text
    clearHighlights() {
```

Invokes `clearHighlights` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1508

```text
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
```

Stores the result of `> el.classList.remove('highlight'))` in `this.rootEl.querySelectorAll('.symbol.highlight').forEach(el` for the current casino operation.

### Line 1509

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1510

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1511

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1512

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1513

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1514

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1515

```text
  // 11. HIGH VOLATILITY 5-REEL ENGINE
```

This comment documents the nearby casino behavior: 11. HIGH VOLATILITY 5-REEL ENGINE.

### Line 1516

```text
  // ==========================================
```

This comment documents the nearby casino behavior: ==========================================.

### Line 1517

```text
  /** Five-reel engine adds ten paylines, scatter-triggered free spins, and sticky wilds to the shared chip loop. */
```

This comment documents the nearby casino behavior: Five-reel engine adds ten paylines, scatter-triggered free spins, and sticky wilds to the shared chip loop..

### Line 1518

```text
  class HighVolatilitySlotEngine {
```

Defines five-reel high-volatility slot engine.

### Line 1519

```text
    constructor(hubController, options = {}) {
```

Invokes `constructor` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1520

```text
      this.hub = hubController;
```

Stores the result of `hubController` in `this.hub` for the current casino operation.

### Line 1521

```text
      this.rootEl = document.getElementById(options.rootId || 'view-5reel-slots');
```

Stores the result of `document.getElementById(options.rootId || 'view-5reel-slots')` in `this.rootEl` for the current casino operation.

### Line 1522

```text
      this.betRules = new window.SlotBetRules({
```

Selects five-reel root element.

### Line 1523

```text
        minimum: options.minimumBet ?? 5,
```

Configures its wager rules.

### Line 1524

```text
        step: options.betStep ?? 5,
```

Defines configuration field `step` with value `options.betStep ?? 5`, supplying this exact symbol/theme/game setting.

### Line 1525

```text
        maximum: options.maximumBet ?? Infinity,
```

Defines configuration field `maximum` with value `options.maximumBet ?? Infinity`, supplying this exact symbol/theme/game setting.

### Line 1526

```text
        startingBet: options.startingBet ?? 10
```

Defines configuration field `startingBet` with value `options.startingBet ?? 10`, supplying this exact symbol/theme/game setting.

### Line 1527

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1528

```text
      this.theme = options.theme || {};
```

Stores the result of `options.theme || {}` in `this.theme` for the current casino operation.

### Line 1529

```text
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1530

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1531

```text
      this.SYMBOL_SIZE = 70;
```

Uses 70 px cells.

### Line 1532

```text
      this.REEL_COUNT = 5;
```

Models five reels.

### Line 1533

```text
      this.VISIBLE_ROWS = 3;
```

Shows three rows each.

### Line 1534

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1535

```text
      // Lower special-symbol frequency and a tighter paytable make wins and bonuses rarer.
```

Documents rarer specials and tighter paytable.

### Line 1536

```text
      this.SYMBOLS = [
```

Defines weighted symbols, multipliers, wild/scatter flags.

### Line 1537

```text
        { id: 'ten',     icon: '🔟', mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
```

Defines configuration field `{ id` with value `'ten',     icon: '🔟', mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1538

```text
        { id: 'jack',    icon: '🇯',  mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
```

Defines configuration field `{ id` with value `'jack',    icon: '🇯',  mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1539

```text
        { id: 'queen',   icon: '🇶',  mult: { 3: 1, 4: 3, 5: 5 },   weight: 15 },
```

Defines configuration field `{ id` with value `'queen',   icon: '🇶',  mult: { 3: 1, 4: 3, 5: 5 },   weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1540

```text
        { id: 'king',    icon: '🇰',  mult: { 3: 1, 4: 4, 5: 7 },   weight: 15 },
```

Defines configuration field `{ id` with value `'king',    icon: '🇰',  mult: { 3: 1, 4: 4, 5: 7 },   weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1541

```text
        { id: 'ace',     icon: '🇦',  mult: { 3: 1, 4: 5, 5: 8 },   weight: 15 },
```

Defines configuration field `{ id` with value `'ace',     icon: '🇦',  mult: { 3: 1, 4: 5, 5: 8 },   weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1542

```text
        { id: 'ruby',    icon: '💎', mult: { 3: 2, 4: 10, 5: 20 }, weight: 15 },
```

Defines configuration field `{ id` with value `'ruby',    icon: '💎', mult: { 3: 2, 4: 10, 5: 20 }, weight: 15 }`, supplying this exact symbol/theme/game setting.

### Line 1543

```text
        { id: 'crown',   icon: '👑', mult: { 3: 4, 4: 20, 5: 40 }, weight: 1 },
```

Defines configuration field `{ id` with value `'crown',   icon: '👑', mult: { 3: 4, 4: 20, 5: 40 }, weight: 1 }`, supplying this exact symbol/theme/game setting.

### Line 1544

```text
        { id: 'wild',    icon: '🃏', mult: { 3: 6, 4: 25, 5: 60 }, weight: 2, isWild: true },
```

Defines configuration field `{ id` with value `'wild',    icon: '🃏', mult: { 3: 6, 4: 25, 5: 60 }, weight: 2, isWild: true }`, supplying this exact symbol/theme/game setting.

### Line 1545

```text
        { id: 'scatter', icon: '⭐', mult: { 3: 1, 4: 4, 5: 20 },  weight: 1, isScatter: true }
```

Defines configuration field `{ id` with value `'scatter', icon: '⭐', mult: { 3: 1, 4: 4, 5: 20 },  weight: 1, isScatter: true }`, supplying this exact symbol/theme/game setting.

### Line 1546

```text
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));
```

Invokes `].map` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1547

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1548

```text
      this.PAYLINES = [
```

Defines ten five-reel paylines.

### Line 1549

```text
        [[0,1], [1,1], [2,1], [3,1], [4,1]],
```

Applies this concrete value/expression `[[0,1], [1,1], [2,1], [3,1], [4,1]],` to the surrounding casino engine state.

### Line 1550

```text
        [[0,0], [1,0], [2,0], [3,0], [4,0]],
```

Applies this concrete value/expression `[[0,0], [1,0], [2,0], [3,0], [4,0]],` to the surrounding casino engine state.

### Line 1551

```text
        [[0,2], [1,2], [2,2], [3,2], [4,2]],
```

Applies this concrete value/expression `[[0,2], [1,2], [2,2], [3,2], [4,2]],` to the surrounding casino engine state.

### Line 1552

```text
        [[0,0], [1,1], [2,2], [3,1], [4,0]],
```

Applies this concrete value/expression `[[0,0], [1,1], [2,2], [3,1], [4,0]],` to the surrounding casino engine state.

### Line 1553

```text
        [[0,2], [1,1], [2,0], [3,1], [4,2]],
```

Applies this concrete value/expression `[[0,2], [1,1], [2,0], [3,1], [4,2]],` to the surrounding casino engine state.

### Line 1554

```text
        [[0,0], [1,0], [2,1], [3,2], [4,2]],
```

Applies this concrete value/expression `[[0,0], [1,0], [2,1], [3,2], [4,2]],` to the surrounding casino engine state.

### Line 1555

```text
        [[0,2], [1,2], [2,1], [3,0], [4,0]],
```

Applies this concrete value/expression `[[0,2], [1,2], [2,1], [3,0], [4,0]],` to the surrounding casino engine state.

### Line 1556

```text
        [[0,1], [1,0], [2,0], [3,0], [4,1]],
```

Applies this concrete value/expression `[[0,1], [1,0], [2,0], [3,0], [4,1]],` to the surrounding casino engine state.

### Line 1557

```text
        [[0,1], [1,2], [2,2], [3,2], [4,1]],
```

Applies this concrete value/expression `[[0,1], [1,2], [2,2], [3,2], [4,1]],` to the surrounding casino engine state.

### Line 1558

```text
        [[0,0], [1,1], [2,0], [3,1], [4,0]]
```

Applies this concrete value/expression `[[0,0], [1,1], [2,0], [3,1], [4,0]]` to the surrounding casino engine state.

### Line 1559

```text
      ];
```

Applies this concrete value/expression `]` to the surrounding casino engine state.

### Line 1560

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1561

```text
      this.bet = this.betRules.startingBet;
```

Starts configured bet.

### Line 1562

```text
      this.isSpinning = false;
```

Tracks spinning state.

### Line 1563

```text
      this.currentGrid = [];
```

Stores current grid.

### Line 1564

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1565

```text
      this.freeSpinsRemaining = 0;
```

Tracks free spins remaining.

### Line 1566

```text
      this.bonusTotalWin = 0;
```

Accumulates bonus returns.

### Line 1567

```text
      this.stickyWildsGrid = Array(5).fill(null).map(() => Array(3).fill(false));
```

Tracks sticky wild positions for 5×3 grid.

### Line 1568

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1569

```text
      this.bindElements();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1570

```text
      if (this.spinBtn) this.init();
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1571

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1572

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1573

```text
    bindElements() {
```

Invokes `bindElements` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1574

```text
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-bet]')` in `this.betEl` for the current casino operation.

### Line 1575

```text
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-status]')` in `this.statusEl` for the current casino operation.

### Line 1576

```text
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-spin]')` in `this.spinBtn` for the current casino operation.

### Line 1577

```text
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-max]')` in `this.maxBtn` for the current casino operation.

### Line 1578

```text
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-minus]')` in `this.minusBtn` for the current casino operation.

### Line 1579

```text
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-plus]')` in `this.plusBtn` for the current casino operation.

### Line 1580

```text
      this.bonusHudEl = this.rootEl?.querySelector('[data-slot-bonus-hud]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-bonus-hud]')` in `this.bonusHudEl` for the current casino operation.

### Line 1581

```text
      this.fsCountEl = this.rootEl?.querySelector('[data-slot-fs-count]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-fs-count]')` in `this.fsCountEl` for the current casino operation.

### Line 1582

```text
      this.fsWinEl = this.rootEl?.querySelector('[data-slot-fs-win]');
```

Stores the result of `this.rootEl?.querySelector('[data-slot-fs-win]')` in `this.fsWinEl` for the current casino operation.

### Line 1583

```text
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel-5reel .strip') || []);
```

Stores the result of `Array.from(this.rootEl?.querySelectorAll('.reel-5reel .strip') || [])` in `this.reelStrips` for the current casino operation.

### Line 1584

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1585

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1586

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1587

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1588

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1589

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1590

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1591

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1592

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1593

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1594

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1595

```text
    setStatus(text, statusClass) {
```

Invokes `setStatus` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1596

```text
      this.statusEl.textContent = text;
```

Stores the result of `text` in `this.statusEl.textContent` for the current casino operation.

### Line 1597

```text
      this.statusEl.className = 'status-banner';
```

Stores the result of `'status-banner'` in `this.statusEl.className` for the current casino operation.

### Line 1598

```text
      if (statusClass) this.statusEl.classList.add(statusClass);
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1599

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1600

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1601

```text
    getRandomSymbol() {
```

Invokes `getRandomSymbol` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1602

```text
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
```

Stores the result of `this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0)` in `const totalWeight` for the current casino operation.

### Line 1603

```text
      let random = Math.random() * totalWeight;
```

Stores the result of `Math.random() * totalWeight` in `let random` for the current casino operation.

### Line 1604

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1605

```text
      for (const symbol of this.SYMBOLS) {
```

Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.

### Line 1606

```text
        if (random < symbol.weight) return symbol;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1607

```text
        random -= symbol.weight;
```

Applies this concrete value/expression `random -= symbol.weight` to the surrounding casino engine state.

### Line 1608

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1609

```text
      return this.SYMBOLS[0];
```

Returns the entry at index/key 0 in `this.SYMBOLS` (the symbols property of this) to the caller and exits this function.

### Line 1610

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1611

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1612

```text
    renderStrip(stripEl, symbolArray) {
```

Invokes `renderStrip` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1613

```text
      stripEl.innerHTML = '';
```

Applies this concrete value/expression `stripEl.innerHTML = ''` to the surrounding casino engine state.

### Line 1614

```text
      symbolArray.forEach(sym => {
```

Invokes `symbolArray.forEach` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1615

```text
        const div = document.createElement('div');
```

Stores the result of `document.createElement('div')` in `const div` for the current casino operation.

### Line 1616

```text
        div.className = 'symbol';
```

Applies this concrete value/expression `div.className = 'symbol'` to the surrounding casino engine state.

### Line 1617

```text
        if (sym.image) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1618

```text
          const image = document.createElement('img');
```

Stores the result of `document.createElement('img')` in `const image` for the current casino operation.

### Line 1619

```text
          image.className = 'slot-symbol-image';
```

Applies this concrete value/expression `image.className = 'slot-symbol-image'` to the surrounding casino engine state.

### Line 1620

```text
          image.src = sym.image;
```

Applies this concrete value/expression `image.src = sym.image` to the surrounding casino engine state.

### Line 1621

```text
          image.alt = sym.alt || '';
```

Applies this concrete value/expression `image.alt = sym.alt || ''` to the surrounding casino engine state.

### Line 1622

```text
          div.appendChild(image);
```

Invokes `div.appendChild` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1623

```text
        } else {
```

Applies this concrete value/expression `} else {` to the surrounding casino engine state.

### Line 1624

```text
          div.textContent = sym.icon;
```

Writes the shown value into the related casino status/display element.

### Line 1625

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1626

```text
        stripEl.appendChild(div);
```

Invokes `stripEl.appendChild` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1627

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1628

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1629

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1630

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1631

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1632

```text
    animateReel(stripEl, reelIndex, finalSymbols) {
```

Invokes `animateReel` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1633

```text
      return new Promise(resolve => {
```

Returns constructs a new instance of `Promise` with a callback taking resolve that runs its enclosed statements to the caller and exits this function.

### Line 1634

```text
        const randomPaddingCount = 18 + (reelIndex * 6);
```

Stores the result of `18 + (reelIndex * 6)` in `const randomPaddingCount` for the current casino operation.

### Line 1635

```text
        const sequence = [];
```

Stores the result of `[]` in `const sequence` for the current casino operation.

### Line 1636

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1637

```text
        for (let i = 0; i < randomPaddingCount; i++) {
```

Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.

### Line 1638

```text
          sequence.push(this.getRandomSymbol());
```

Invokes `sequence.push` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1639

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1640

```text
        sequence.push(...finalSymbols);
```

Invokes `sequence.push` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1641

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1642

```text
        this.renderStrip(stripEl, sequence);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1643

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1644

```text
        stripEl.classList.remove('is-spinning');
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1645

```text
        stripEl.style.setProperty('--spin-target-y', '0px');
```

Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1646

```text
        stripEl.offsetHeight;
```

Applies this concrete value/expression `stripEl.offsetHeight` to the surrounding casino engine state.

### Line 1647

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1648

```text
        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
```

Stores the result of `-((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE)` in `const targetY` for the current casino operation.

### Line 1649

```text
        const duration = 1000 + (reelIndex * 400);
```

Stores the result of `1000 + (reelIndex * 400)` in `const duration` for the current casino operation.

### Line 1650

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1651

```text
        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
```

Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1652

```text
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
```

Invokes `stripEl.style.setProperty` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1653

```text
        stripEl.classList.add('is-spinning');
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1654

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1655

```text
        setTimeout(() => {
```

Schedules the shown delayed or next-frame casino work.

### Line 1656

```text
          FX.playReelStop(this.theme.sounds?.reelStop);
```

Invokes `FX.playReelStop` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1657

```text
          resolve();
```

Invokes `resolve` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1658

```text
        }, duration);
```

Applies this concrete value/expression `}, duration)` to the surrounding casino engine state.

### Line 1659

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1660

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1661

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1662

```text
    clearHighlights() {
```

Invokes `clearHighlights` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1663

```text
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
```

Stores the result of `> el.classList.remove('highlight'))` in `this.rootEl.querySelectorAll('.symbol.highlight').forEach(el` for the current casino operation.

### Line 1664

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1665

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1666

```text
    applyStickyWildClasses() {
```

Applies sticky-wild CSS to visible reel cells.

### Line 1667

```text
      for (let r = 0; r < this.REEL_COUNT; r++) {
```

Visits all five reels.

### Line 1668

```text
        const reelEl = this.reelStrips[r];
```

Stores the result of `this.reelStrips[r]` in `const reelEl` for the current casino operation.

### Line 1669

```text
        const visibleSymbols = Array.from(reelEl.children).slice(-this.VISIBLE_ROWS);
```

Uses last three rendered cells as visible rows.

### Line 1670

```text
        for (let row = 0; row < this.VISIBLE_ROWS; row++) {
```

Repeats the enclosed operation across the shown cards, symbols, controls, or animation steps.

### Line 1671

```text
          if (this.stickyWildsGrid[r][row] && visibleSymbols[row]) {
```

Marks a visible cell when its saved position is sticky wild.

### Line 1672

```text
            visibleSymbols[row].classList.add('sticky-wild');
```

Changes the shown CSS class so the corresponding casino control/view has the intended visible state.

### Line 1673

```text
          }
```

Structural punctuation closes the surrounding block or statement.

### Line 1674

```text
        }
```

Structural punctuation closes the surrounding block or statement.

### Line 1675

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1676

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1677

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1678

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1679

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1680

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1681

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1682

```text
  //
```

This comment documents the nearby casino behavior: .

### Line 1683

```text
  // 12. PAPER, ROCK, SCISSORS
```

This comment documents the nearby casino behavior: 12. PAPER, ROCK, SCISSORS.

### Line 1684

```text
  //
```

This comment documents the nearby casino behavior: .

### Line 1685

```text
  class PRS {
```

Declares a placeholder PRS class; it has no implementation.

### Line 1686

```text
    //TODO
```

Marks paper-rock-scissors as TODO.

### Line 1687

```text
  }
```

Structural punctuation closes the surrounding block or statement.

### Line 1688

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1689

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1690

```text
  // Slot settlement is committed once, before presentation. No animation callback pays chips.
```

States that slot settlement happens before visual animation.

### Line 1691

```text
  const blankSlotState = () => ({ freeSpinsRemaining: 0, lockedStake: 0, bonusTotalWin: 0,
```

Creates clean bonus state: no free spins, no locked stake, no bonus total, empty sticky grid, and no prior result/summary.

### Line 1692

```text
    stickyWildsGrid: Array.from({ length: 5 }, () => Array(3).fill(false)), lastResult: null, summary: null });
```

Defines configuration field `stickyWildsGrid` with value `Array.from({ length: 5 }, () => Array(3).fill(false)), lastResult: null, summary: null });`, supplying this exact symbol/theme/game setting.

### Line 1693

```text
  const slotMethods = {
```

Collects shared slot methods mixed into both slot engines.

### Line 1694

```text
    init() {
```

Invokes `init` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1695

```text
      const controls = this.plusBtn.parentElement;
```

Uses bet-control parent as insertion point.

### Line 1696

```text
      this.clearBtn = document.createElement('button');
```

Creates a clear-bet button.

### Line 1697

```text
      this.clearBtn.type = 'button'; this.clearBtn.className = 'btn-small';
```

Configures the button as a small normal button.

### Line 1698

```text
      this.clearBtn.dataset.slotClear = ''; this.clearBtn.textContent = 'Clear bet'; controls.append(this.clearBtn);
```

Labels and appends the clear control.

### Line 1699

```text
      for (const [key, title] of [['paytable', 'Paytable'], ['breakdown', 'Last spin']]) {
```

Adds paytable and last-spin panels.

### Line 1700

```text
        const panel = document.createElement(key === 'paytable' ? 'details' : 'section');
```

Uses details for collapsible paytable and section for result breakdown.

### Line 1701

```text
        panel.className = key === 'paytable' ? 'slot-paytable' : 'slot-result-breakdown';
```

Adds panel styling class.

### Line 1702

```text
        panel.setAttribute(`data-slot-${key}`, '');
```

Adds a data attribute used to find the panel.

### Line 1703

```text
        if (key === 'paytable') { const summary = document.createElement('summary'); summary.textContent = title; panel.append(summary); }
```

Adds paytable summary title when applicable.

### Line 1704

```text
        const body = document.createElement('div'); panel.append(body);
```

Adds body container.

### Line 1705

```text
        this.rootEl.querySelector('.slot-machine').append(panel);
```

Appends panel to slot machine.

### Line 1706

```text
        this[`${key}El`] = body;
```

Sets the entry at index/key a text template that combines fixed text with computed values `key` (key) in this object instance to `body` (body).

### Line 1707

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1708

```text
      this.renderPaytable();
```

Builds paytable text.

### Line 1709

```text
      this.hydrateBonusState();
```

Restores saved bonus state.

### Line 1710

```text
      for (let reel = 0; reel < this.REEL_COUNT; reel++) this.renderStrip(this.reelStrips[reel], Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
```

Renders initial three symbols per reel, preserving sticky wilds during a resumed bonus.

### Line 1711

```text
      if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
```

Applies sticky styling for five-reel games.

### Line 1712

```text
      const change = action => {
```

Creates guarded bet changes.

### Line 1713

```text
        if (this.isSpinning || this.freeSpinsRemaining > 0) return;
```

Disallows bet changes while spinning or free-spin bonus is active.

### Line 1714

```text
        FX.playClick(); this.bet = action(); this.updateUI();
```

Plays click, computes wager, and updates UI.

### Line 1715

```text
      };
```

Structural punctuation closes the surrounding block or statement.

### Line 1716

```text
      this.clearBtn.addEventListener('click', () => change(() => 0));
```

Clear sets wager to zero.

### Line 1717

```text
      this.maxBtn.addEventListener('click', () => change(() => this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet)));
```

Max uses wallet/maxBet-limited wager.

### Line 1718

```text
      this.minusBtn.addEventListener('click', () => change(() => this.betRules.decrease(this.bet)));
```

Decreases wager by configured step.

### Line 1719

```text
      this.plusBtn.addEventListener('click', () => change(() => this.bet <= 0 ? this.betRules.minimumCents / 100 : this.betRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
```

Starts from minimum when zero, otherwise increases by configured step.

### Line 1720

```text
      this.spinBtn.addEventListener('click', () => this.startSpin());
```

Starts a spin on click.

### Line 1721

```text
      this.updateUI();
```

Initializes controls.

### Line 1722

```text
    },
```

Structural punctuation closes the surrounding block or statement.

### Line 1723

```text
    hydrateBonusState() {
```

Defines bonus-state hydration from the active profile.

### Line 1724

```text
      this.roundToken = (this.roundToken || 0) + 1;
```

Advances round token so stale animation callbacks can be ignored.

### Line 1725

```text
      const saved = window.LocalProfiles.getCurrentSave().slotBonuses[this.rootEl.id];
```

Reads this cabinet’s saved slot bonus object.

### Line 1726

```text
      this.slotState = saved ? JSON.parse(JSON.stringify(saved)) : blankSlotState();
```

Deep-copies saved state or creates a fresh state.

### Line 1727

```text
      this.freeSpinsRemaining = this.slotState.freeSpinsRemaining || 0;
```

Restores free-spin count.

### Line 1728

```text
      this.lockedStake = this.slotState.lockedStake || 0;
```

Restores locked triggering stake.

### Line 1729

```text
      this.bonusTotalWin = this.slotState.bonusTotalWin || 0;
```

Restores accumulated bonus return.

### Line 1730

```text
      this.stickyWildsGrid = this.slotState.stickyWildsGrid || blankSlotState().stickyWildsGrid;
```

Restores sticky positions or an empty 5×3 grid.

### Line 1731

```text
      if (this.freeSpinsRemaining > 0 && this.lockedStake > 0) {
```

Detects resumable bonus with stake locked.

### Line 1732

```text
        this.bet = this.lockedStake;
```

Uses the triggering stake for resumed free-spin multipliers.

### Line 1733

```text
        this.setStatus('BONUS RESTORED — PRESS SPIN TO RESUME', 'status-bonus');
```

Prompts explicit resume rather than auto-spinning.

### Line 1734

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1735

```text
      if (this.spinBtn && this.reelStrips.some(strip => strip.children.length)) {
```

Re-renders strips when initialized and cells exist.

### Line 1736

```text
        this.reelStrips.forEach((strip, reel) => this.renderStrip(strip, Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol())));
```

Restores sticky wild symbols in visible positions.

### Line 1737

```text
        if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
```

Reapplies sticky classes.

### Line 1738

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1739

```text
      if (this.slotState.lastResult) this.showBreakdown(this.slotState.lastResult);
```

Restores last-spin breakdown.

### Line 1740

```text
      if (this.slotState.summary?.totalWin !== undefined && !this.freeSpinsRemaining) {
```

Shows completed bonus summary when no spins remain.

### Line 1741

```text
        this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(this.slotState.summary.totalWin)}`, 'status-bonus');
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1742

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1743

```text
    },
```

Structural punctuation closes the surrounding block or statement.

### Line 1744

```text
    updateUI() {
```

Defines slot controls/HUD update.

### Line 1745

```text
      const bonus = this.freeSpinsRemaining > 0;
```

Marks bonus mode when free spins remain.

### Line 1746

```text
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
```

Computes maximum legal wager.

### Line 1747

```text
      const locked = this.isSpinning || bonus;
```

Locks controls during animation or bonus.

### Line 1748

```text
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
```

Formats current wager.

### Line 1749

```text
      this.spinBtn.disabled = this.isSpinning || (!bonus && (this.bet <= 0 || this.bet > maximum));
```

Disables spin for active animation or invalid paid wager.

### Line 1750

```text
      this.spinBtn.textContent = bonus ? `FREE SPIN (${this.freeSpinsRemaining} LEFT)` : 'SPIN';
```

Labels spin as FREE SPIN with remaining count or normal SPIN.

### Line 1751

```text
      this.maxBtn.disabled = locked || maximum === 0 || this.bet === maximum;
```

Disables max while locked, broke, or already maxed.

### Line 1752

```text
      this.clearBtn.disabled = locked || this.bet === 0;
```

Disables clear while locked or zero.

### Line 1753

```text
      this.minusBtn.disabled = locked || this.bet <= this.betRules.minimumCents / 100;
```

Disables minus below configured minimum.

### Line 1754

```text
      this.plusBtn.disabled = locked || maximum === 0 || (this.bet > 0 && this.bet + this.betRules.stepCents / 100 > maximum);
```

Disables plus when locked, broke, or next step exceeds maximum.

### Line 1755

```text
      if (this.bonusHudEl) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1756

```text
        this.bonusHudEl.classList.toggle('hidden-view', !bonus);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1757

```text
        this.bonusHudEl.classList.toggle('active-view', bonus);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1758

```text
        this.fsCountEl.textContent = this.freeSpinsRemaining;
```

Stores the result of `this.freeSpinsRemaining` in `this.fsCountEl.textContent` for the current casino operation.

### Line 1759

```text
        this.fsWinEl.textContent = window.SlotBetRules.format(this.bonusTotalWin);
```

Stores the result of `window.SlotBetRules.format(this.bonusTotalWin)` in `this.fsWinEl.textContent` for the current casino operation.

### Line 1760

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1761

```text
      this.hub.updateGlobalUI();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1762

```text
    },
```

Structural punctuation closes the surrounding block or statement.

### Line 1763

```text
    renderPaytable() {
```

Defines paytable rendering.

### Line 1764

```text
      const note = document.createElement('p');
```

Stores the result of `document.createElement('p')` in `const note` for the current casino operation.

### Line 1765

```text
      note.textContent = `One displayed stake is debited for the whole spin. Each of the ${this.PAYLINES.length} winning lines pays displayed stake × its multiplier; line returns are added, not divided by the number of lines. This preserves existing payouts. Wilds substitute. Five-reel matches run left to right from reel 1.`;
```

Explains one stake per spin, additive line returns, wild substitution, left-to-right five-reel matching, and preserved payout semantics.

### Line 1766

```text
      this.paytableEl.append(note);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1767

```text
      this.SYMBOLS.forEach(symbol => {
```

Lists each symbol’s configured multipliers and bonus behavior.

### Line 1768

```text
        const row = document.createElement('p');
```

Stores the result of `document.createElement('p')` in `const row` for the current casino operation.

### Line 1769

```text
        row.textContent = `${symbol.icon} ${symbol.id}: ${symbol.mult ? Object.entries(symbol.mult).map(([count, multiplier]) => `${count} matches = ${multiplier}×`).join('; ') : `3 matches = ${symbol.multiplier}×`}${symbol.isScatter ? ' anywhere; 3+ trigger 10 free spins when no spins remain' : ''}`;
```

Displays ordinary multipliers; scatter says anywhere and triggers 10 free spins when no paid/free spins remain.

### Line 1770

```text
        this.paytableEl.append(row);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1771

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1772

```text
      if (this.REEL_COUNT === 5) {
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1773

```text
        const jackpot = document.createElement('p'); jackpot.textContent = 'Five crowns on a line return the browser-local demo jackpot instead of the ordinary line/scatter total. Free spins retain the triggering stake; no new stake is charged. Wilds that land during free spins stay sticky until that bonus ends.'; this.paytableEl.append(jackpot);
```

Documents five-crown jackpot replacement, locked triggering stake, and sticky wild lifetime.

### Line 1774

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1775

```text
      const paths = document.createElement('p');
```

Stores the result of `document.createElement('p')` in `const paths` for the current casino operation.

### Line 1776

```text
      paths.textContent = this.PAYLINES.map((line, i) => `Line ${i + 1}: ${line.map(([, row]) => ['top', 'middle', 'bottom'][row]).join(' → ')}`).join(' · ');
```

Displays the exact row path for each payline.

### Line 1777

```text
      this.paytableEl.append(paths);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1778

```text
    },
```

Structural punctuation closes the surrounding block or statement.

### Line 1779

```text
    showBreakdown(result) {
```

Defines last-spin breakdown rendering.

### Line 1780

```text
      if (!this.breakdownEl) return;
```

Guards this operation so it runs only when the shown game-state condition is true.

### Line 1781

```text
      this.breakdownEl.replaceChildren();
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1782

```text
      const summary = document.createElement('p');
```

Clears prior breakdown.

### Line 1783

```text
      summary.textContent = `Total stake ${window.SlotBetRules.format(result.stake)} · Total return ${window.SlotBetRules.format(result.payout)} · Net ${window.SlotBetRules.format(result.payout - result.stake)}${result.stake === 0 ? ' (free spin; locked bonus stake used for multipliers)' : ''}`;
```

Shows total stake, return, net, and special free-spin stake note.

### Line 1784

```text
      this.breakdownEl.append(summary);
```

Updates the current casino object or shared browser state as indicated by this statement.

### Line 1785

```text
      (result.lines || []).forEach(line => {
```

Invokes `` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1786

```text
        const row = document.createElement('p'); row.textContent = `${line.line ? `Line ${line.line}` : 'Special return'}: ${line.symbol} · ${line.count} matched · ${window.SlotBetRules.format(line.payout)}`; this.breakdownEl.append(row);
```

Lists each ordinary/special return with symbol, match count, and payout.

### Line 1787

```text
      });
```

Structural punctuation closes the surrounding block or statement.

### Line 1788

```text
      if (!result.lines?.length) { const empty = document.createElement('p'); empty.textContent = 'No winning lines.'; this.breakdownEl.append(empty); }
```

States when no line won.

### Line 1789

```text
    },
```

Structural punctuation closes the surrounding block or statement.

### Line 1790

```text
    async startSpin() {
```

Defines slot spin with settlement-before-animation.

### Line 1791

```text
      const free = this.freeSpinsRemaining > 0;
```

Detects whether this is a free spin.

### Line 1792

```text
      if (window.DailyWheel?.isSpinning || (window.CasinoGames?.blackjack && !['BETTING', 'ENDED'].includes(window.CasinoGames.blackjack.gameState))) return;
```

Blocks while wheel spins or blackjack is in an unresolved hand.

### Line 1793

```text
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
```

Computes maximum paid wager.

### Line 1794

```text
      if (this.isSpinning || this.hub.isSettling || (!free && (this.bet <= 0 || this.bet > maximum))) return;
```

Rejects duplicate spins, global settlement conflicts, and invalid paid wagers.

### Line 1795

```text
      this.isSpinning = true; this.hub.isSettling = true; this.updateUI();
```

Locks settlement and updates controls before calculation.

### Line 1796

```text
      const token = this.roundToken;
```

Captures round token for stale-callback protection.

### Line 1797

```text
      const profileId = window.LocalProfiles.activeProfile.id;
```

Captures active profile id.

### Line 1798

```text
      const beforeSave = window.LocalProfiles.getCurrentSave();
```

Snapshots current save for rollback.

### Line 1799

```text
      const beforePlayer = this.hub.player.toProfile();
```

Snapshots player state before settlement.

### Line 1800

```text
      const previous = JSON.parse(JSON.stringify(this.slotState));
```

Snapshots bonus state for transition/rollback.

### Line 1801

```text
      if (free) this.bet = this.lockedStake;
```

Uses locked triggering stake during free spins.

### Line 1802

```text
      const five = this.REEL_COUNT === 5;
```

Identifies five-reel rules.

### Line 1803

```text
      const grid = Array.from({ length: this.REEL_COUNT }, (_, reel) => Array.from({ length: 3 }, (_, row) => free && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
```

Generates a 3-row grid per reel, preserving sticky wilds in bonus mode.

### Line 1804

```text
      const calculated = window.SlotOutcomes.calculate(this, grid, five);
```

Calculates line, scatter, and jackpot outcome through SlotOutcomes.

### Line 1805

```text
      const jackpotAmount = calculated.jackpotHit ? window.SlotBetRules.roundMoney((JackpotManager.readSharedAmount() ?? JackpotManager.currentJackpot) + (free ? 0 : this.bet * 0.015)) : 0;
```

For jackpot hits, uses shared jackpot plus 1.5% of paid stake, but no added contribution on free spin.

### Line 1806

```text
      calculated.payout = calculated.jackpotHit ? jackpotAmount : calculated.lineTotal;
```

Uses jackpot amount for jackpot hits, otherwise ordinary line total.

### Line 1807

```text
      if (calculated.jackpotHit) calculated.lines = [{ line: 0, symbol: 'demo jackpot (replaces ordinary return)', count: 5, payout: jackpotAmount }];
```

Replaces ordinary lines with one explicit jackpot return entry.

### Line 1808

```text
      else if (calculated.scatterCount >= 3) calculated.lines.push({ line: 0, symbol: 'scatter anywhere', count: calculated.scatterCount, payout: calculated.scatterPayout });
```

Adds scatter return entry when at least three scatters appear.

### Line 1809

```text
      if (free) previous.stickyWildsGrid = grid.map(column => column.map(symbol => symbol.isWild === true));
```

During free spins, records all wild positions as sticky for the next state.

### Line 1810

```text
      const next = five ? window.SlotOutcomes.transition(previous, calculated, this.bet, free).state : { ...blankSlotState(), lastResult: { status: 'settled', stake: this.bet, payout: calculated.payout, lines: calculated.lines.map(({coordinates, ...line}) => line) } };
```

Transitions five-reel bonus state; classic stores only settled result.

### Line 1811

```text
      const player = { ...beforePlayer, balance: window.SlotBetRules.roundMoney(beforePlayer.balance - (free ? 0 : this.bet) + calculated.payout) };
```

Computes wallet after paid stake deduction and payout, with no stake deduction for free spins.

### Line 1812

```text
      let durable = false;
```

Tracks whether profile save committed.

### Line 1813

```text
      try {
```

Applies this concrete value/expression `try {` to the surrounding casino engine state.

### Line 1814

```text
        durable = await window.LocalProfiles.saveCurrent({ player, slotBonuses: { ...beforeSave.slotBonuses, [this.rootEl.id]: next } });
```

Atomically saves player and cabinet bonus state.

### Line 1815

```text
      } catch (error) { console.error('Slot settlement could not be saved.', error); }
```

Logs durable-save failure.

### Line 1816

```text
      if (!durable) {
```

Handles failed settlement commit.

### Line 1817

```text
        window.LocalProfiles.currentSave = beforeSave;
```

Restores pre-spin profile snapshot.

### Line 1818

```text
        this.hub.isSettling = false; this.isSpinning = false;
```

Releases locks without charging the spin.

### Line 1819

```text
        this.setStatus('SAVE FAILED — spin not charged; bonus preserved. Check browser storage, then retry.', 'status-loss');
```

Explains safe retry and preserved bonus.

### Line 1820

```text
        this.updateUI(); return;
```

Refreshes controls after rollback.

### Line 1821

```text
      }
```

Structural punctuation closes the surrounding block or statement.

### Line 1822

```text
      this.hub.player.loadProfile(player);
```

Loads committed player into live model.

### Line 1823

```text
      this.slotState = next;
```

Installs committed bonus state.

### Line 1824

```text
      this.freeSpinsRemaining = next.freeSpinsRemaining;
```

Updates free-spin counter.

### Line 1825

```text
      this.lockedStake = next.lockedStake;
```

Updates locked stake.

### Line 1826

```text
      this.bonusTotalWin = next.bonusTotalWin;
```

Updates bonus total.

### Line 1827

```text
      this.stickyWildsGrid = next.stickyWildsGrid;
```

Updates sticky grid.

### Line 1828

```text
      this.hub.isSettling = false;
```

Releases global settlement lock after durable save.

### Line 1829

```text
      if (calculated.jackpotHit) JackpotManager.setJackpot(5000);
```

Reseeds jackpot at $5,000 after a hit.

### Line 1830

```text
      if (!free) { if (!calculated.jackpotHit) JackpotManager.contribute(this.bet * 0.015); window.XP.addWagerXP(this.bet); }
```

For paid non-jackpot spins, contributes 1.5% and awards wager XP.

### Line 1831

```text
      window.Accomplishments?.recordGame(this.rootEl.id, { stake: free ? 0 : this.bet, payout: calculated.payout });
```

Records the settled slot round.

### Line 1832

```text
      window.LocalSave?.queueFileSave();
```

Queues file persistence.

### Line 1833

```text
      FX.playClick(); this.clearHighlights();
```

Plays click feedback and removes previous highlights.

### Line 1834

```text
      this.setStatus(free ? 'FREE SPIN…' : 'SPINNING…', 'status-spinning');
```

Shows free-spin or paid-spin animation status.

### Line 1835

```text
      try { await Promise.all(this.reelStrips.map((strip, index) => this.animateReel(strip, index, grid[index]))); }
```

Animates all reels concurrently.

### Line 1836

```text
      finally { this.isSpinning = false; }
```

Always releases local spinning flag after animation.

### Line 1837

```text
      if (this.roundToken !== token || window.LocalProfiles.activeProfile.id !== profileId) return;
```

Aborts stale UI updates after profile switch/new round token.

### Line 1838

```text
      this.currentGrid = grid;
```

Stores displayed resolved grid.

### Line 1839

```text
      if (five) this.applyStickyWildClasses();
```

Adds sticky-wild styling for five reels.

### Line 1840

```text
      calculated.lines.forEach(line => (line.coordinates || []).forEach(([reel, row]) => Array.from(this.reelStrips[reel].children).slice(-3)[row]?.classList.add('highlight')));
```

Highlights every cell belonging to winning line coordinates.

### Line 1841

```text
      this.showBreakdown(next.lastResult);
```

Displays persisted result details.

### Line 1842

```text
      if (next.summary?.totalWin !== undefined && !next.freeSpinsRemaining) this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(next.summary.totalWin)}`, 'status-bonus');
```

Shows completed bonus total.

### Line 1843

```text
      else if (next.freeSpinsRemaining) this.setStatus(`${next.freeSpinsRemaining} FREE SPINS LEFT · bonus return ${window.SlotBetRules.format(next.bonusTotalWin)}`, 'status-bonus');
```

Shows remaining free spins and accumulated bonus return.

### Line 1844

```text
      else this.setStatus(calculated.payout > 0 ? `RETURN ${window.SlotBetRules.format(calculated.payout)}` : 'TRY AGAIN!', calculated.payout > 0 ? 'status-win' : 'status-loss');
```

Shows ordinary return or loss message.

### Line 1845

```text
      if (calculated.payout > 0) { FX.playWinSound(this.theme.sounds?.win); FX.spawnConfetti(50); }
```

Celebrates any positive return.

### Line 1846

```text
      this.updateUI();
```

Refreshes buttons/HUD.

### Line 1847

```text
      // Explicit spins make recovery predictable; reload never auto-spends or replays a settled spin.
```

Documents that reload recovery requires a deliberate spin and never auto-spends.

### Line 1848

```text
    }
```

Structural punctuation closes the surrounding block or statement.

### Line 1849

```text
  };
```

Structural punctuation closes the surrounding block or statement.

### Line 1850

```text
  Object.assign(ClassicSlotEngine.prototype, slotMethods);
```

Mixes shared methods into classic prototype.

### Line 1851

```text
  Object.assign(HighVolatilitySlotEngine.prototype, slotMethods);
```

Mixes shared methods into five-reel prototype.

### Line 1852

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1853

```text
  // Instantiate the two hand-authored high-stakes tables, then build catalog tables with their matching shared engine.
```

This comment documents the nearby casino behavior: Instantiate the two hand-authored high-stakes tables, then build catalog tables with their matching shared engine..

### Line 1854

```text
  // Slot rooms share reusable mechanics and are configured by the theme/template catalog.
```

This comment documents the nearby casino behavior: Slot rooms share reusable mechanics and are configured by the theme/template catalog..

### Line 1855

```text
  const ClassicSlots = new ClassicSlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('classicGold') });
```

Creates hand-authored classic cabinet with classicGold theme.

### Line 1856

```text
  const FiveReelGame = new HighVolatilitySlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('royalGems') });
```

Creates hand-authored five-reel cabinet with royalGems theme.

### Line 1857

```text
  const ThemedSlotGames = window.SlotGameCatalog.games.map(game => {
```

Builds configured catalog cabinets.

### Line 1858

```text
    const options = { ...game, theme: game.theme };
```

Copies each catalog game options and theme.

### Line 1859

```text
    return game.engine === 'classic'
```

Returns checks checks that `game.engine` (the engine property of game) and "classic" have the same value and type; if true chooses constructs a new instance of `ClassicSlotEngine` with `CasinoHub` (casino hub); `options` (options), otherwise constructs a new instance of `HighVolatilitySlotEngine` with `CasinoHub` (casino hub); `options` (options) to the caller and exits this function.

### Line 1860

```text
      ? new ClassicSlotEngine(CasinoHub, options)
```

Creates classic themed cabinet.

### Line 1861

```text
      : new HighVolatilitySlotEngine(CasinoHub, options);
```

Creates five-reel themed cabinet.

### Line 1862

```text
  });
```

Structural punctuation closes the surrounding block or statement.

### Line 1863

```text
  const SlotGames = [ClassicSlots, FiveReelGame, ...ThemedSlotGames];
```

Combines all slot engines into one list.

### Line 1864

```text
  const CoinTossGame = new CoinTossEngine(CasinoHub);
```

Creates single-coin table.

### Line 1865

```text
  const ThreeCoinGame = new ThreeCoinToss(CasinoHub);
```

Creates three-coin table.

### Line 1866

```text
  const BlackjackGame = new BlackjackEngine(CasinoHub);
```

Creates blackjack table.

### Line 1867

```text
  window.CasinoGames = { hub: CasinoHub, slots: SlotGames, coin: CoinTossGame, threeCoin: ThreeCoinGame, blackjack: BlackjackGame };
```

Publishes game instances for other managers/UI.

### Line 1868

```text
  window.Accomplishments = new window.AccomplishmentManager(CasinoHub);
```

Creates accomplishments tracker after games exist.

### Line 1869

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1870

```text
  // Initialize save controls before racing so startup overlays and linked-file state are settled predictably.
```

This comment documents the nearby casino behavior: Initialize save controls before racing so startup overlays and linked-file state are settled predictably..

### Line 1871

```text
  window.LocalSave = new window.LocalSaveManager({
```

Creates file-save manager with all stateful managers injected.

### Line 1872

```text
    hub: CasinoHub,
```

Defines configuration field `hub` with value `CasinoHub`, supplying this exact symbol/theme/game setting.

### Line 1873

```text
    jackpot: JackpotManager,
```

Defines configuration field `jackpot` with value `JackpotManager`, supplying this exact symbol/theme/game setting.

### Line 1874

```text
    bank: window.Bank,
```

Defines configuration field `bank` with value `window.Bank`, supplying this exact symbol/theme/game setting.

### Line 1875

```text
    xp: window.XP,
```

Defines configuration field `xp` with value `window.XP`, supplying this exact symbol/theme/game setting.

### Line 1876

```text
    dailyWheel: window.DailyWheel,
```

Defines configuration field `dailyWheel` with value `window.DailyWheel`, supplying this exact symbol/theme/game setting.

### Line 1877

```text
    settings: window.CasinoSettings
```

Defines configuration field `settings` with value `window.CasinoSettings`, supplying this exact symbol/theme/game setting.

### Line 1878

```text
  });
```

Structural punctuation closes the surrounding block or statement.

### Line 1879

```text
  window.canReplaceCasinoSave = () => !CasinoHub.isSettling && SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping && !window.DailyWheel.isSpinning && ['BETTING', 'ENDED'].includes(BlackjackGame.gameState) && !RaceGame?.hasPendingTicket();
```

Defines whether profile save replacement is safe: no settlement/animations/free spins, wheel spin, coin flip, unresolved blackjack, or race ticket.

### Line 1880

```text
  window.refreshCasinoSaveState = () => {
```

Defines refresh after profile load.

### Line 1881

```text
    SlotGames.forEach(game => { game.hydrateBonusState?.(); game.updateUI(); });
```

Rehydrates each slot bonus and redraws controls.

### Line 1882

```text
    CoinTossGame.resetForActiveProfile();
```

Resets single-coin ephemeral choices.

### Line 1883

```text
    ThreeCoinGame.resetForActiveProfile();
```

Resets three-coin ephemeral choices.

### Line 1884

```text
    BlackjackGame.updateUI();
```

Refreshes blackjack controls.

### Line 1885

```text
    window.Accomplishments?.resetForActiveProfile();
```

Clears active-profile accomplishment view.

### Line 1886

```text
  };
```

Structural punctuation closes the surrounding block or statement.

### Line 1887

```text
  await window.LocalSave.initialize();
```

Waits for save manager initialization.

### Line 1888

```text
  window.refreshCasinoSaveState();
```

Refreshes all game state from initialized save.

### Line 1889

```text
  RaceGame = new window.RaceEngine(CasinoHub, { fx: FX, jackpot: JackpotManager, xp: window.XP });
```

Creates race engine after save infrastructure is ready.

### Line 1890

```text
  window.RaceGame = RaceGame;
```

Publishes race engine globally.

### Line 1891

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1892

```text
  // Switching replaces ephemeral round memory, so permit it only when every game is safely between rounds.
```

This comment documents the nearby casino behavior: Switching replaces ephemeral round memory, so permit it only when every game is safely between rounds..

### Line 1893

```text
  LocalProfiles.canSwitchProfile = () => (
```

Allows profile switch only at lobby and between all safe round boundaries.

### Line 1894

```text
    !CasinoHub.isSettling && CasinoHub.currentView === 'lobby' &&
```

Applies this concrete value/expression `!CasinoHub.isSettling && CasinoHub.currentView === 'lobby' &&` to the surrounding casino engine state.

### Line 1895

```text
    SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping &&
```

Invokes `SlotGames.every` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1896

```text
    !window.DailyWheel.isSpinning &&
```

Applies this concrete value/expression `!window.DailyWheel.isSpinning &&` to the surrounding casino engine state.

### Line 1897

```text
    !RaceGame.hasPendingTicket() &&
```

Invokes `!RaceGame.hasPendingTicket` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1898

```text
    ['BETTING', 'ENDED'].includes(BlackjackGame.gameState)
```

Invokes `['BETTING', 'ENDED'].includes` here so the surrounding casino workflow performs the operation represented by this call.

### Line 1899

```text
  );
```

Structural punctuation closes the surrounding block or statement.

### Line 1900

```text
  // Rebind each manager to the newly decrypted profile; the stable DOM stays while per-round memory is cleared.
```

Documents profile rebinding and ephemeral-round clearing.

### Line 1901

```text
  LocalProfiles.onProfileChanged = async (save, profile) => {
```

Registers asynchronous profile-change handler.

### Line 1902

```text
    await window.LocalSave.switchProfile();
```

Switches save manager to newly active profile.

### Line 1903

```text
    CasinoHub.player = Player.fromProfile(save.player, profile.name);
```

Rebuilds hub Player from new profile.

### Line 1904

```text
    CasinoHub.switchView('lobby');
```

Returns to lobby.

### Line 1905

```text
    window.CasinoSettings.applySettings(save.settings);
```

Applies profile settings.

### Line 1906

```text
    JackpotManager.loadState(10000);
```

Reloads shared/legacy jackpot.

### Line 1907

```text
    window.Bank.updateModalUI();
```

Refreshes bank values.

### Line 1908

```text
    window.XP.updateUI();
```

Refreshes XP values.

### Line 1909

```text
    window.DailyWheel.updateUI();
```

Refreshes wheel cooldown.

### Line 1910

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1911

```text
    SlotGames.forEach(game => {
```

Reinitializes each slot cabinet for profile.

### Line 1912

```text
      game.bet = game.betRules.startingBet;
```

Restores each cabinet starting wager.

### Line 1913

```text
      game.hydrateBonusState?.();
```

Hydrates saved bonus state.

### Line 1914

```text
      game.setStatus(game.freeSpinsRemaining > 0 ? 'BONUS RESTORED — PRESS SPIN TO RESUME' : 'PRESS SPIN TO PLAY');
```

Shows resume prompt or normal spin prompt.

### Line 1915

```text
      game.updateUI();
```

Refreshes cabinet controls.

### Line 1916

```text
    });
```

Structural punctuation closes the surrounding block or statement.

### Line 1917

```text
    CoinTossGame.resetForActiveProfile();
```

Resets single coin state.

### Line 1918

```text
    ThreeCoinGame.resetForActiveProfile();
```

Resets triple coin state.

### Line 1919

```text
    BlackjackGame.bet = 10;
```

Restores blackjack wager.

### Line 1920

```text
    BlackjackGame.deck = [];
```

Discards old deck.

### Line 1921

```text
    BlackjackGame.playerHand = [];
```

Clears player hand.

### Line 1922

```text
    BlackjackGame.dealerHand = [];
```

Clears dealer hand.

### Line 1923

```text
    BlackjackGame.dealerHidden = true;
```

Restores hidden dealer hole-card state.

### Line 1924

```text
    BlackjackGame.gameState = 'BETTING';
```

Returns blackjack to BETTING.

### Line 1925

```text
    BlackjackGame.playerCardsEl.innerHTML = '';
```

Clears player card DOM.

### Line 1926

```text
    BlackjackGame.dealerCardsEl.innerHTML = '';
```

Clears dealer card DOM.

### Line 1927

```text
    BlackjackGame.playerScoreEl.textContent = '0';
```

Resets player score label.

### Line 1928

```text
    BlackjackGame.dealerScoreEl.textContent = '0';
```

Resets dealer score label.

### Line 1929

```text
    BlackjackGame.setStatus('PLACE YOUR BET TO DEAL');
```

Shows fresh blackjack prompt.

### Line 1930

```text
    BlackjackGame.updateUI();
```

Refreshes blackjack controls.

### Line 1931

```text
    RaceGame.resetForActiveProfile();
```

Resets race ephemeral state.

### Line 1932

```text
    window.Accomplishments?.resetForActiveProfile();
```

Clears accomplishments for the new profile.

### Line 1933

```text
    CasinoHub.saveState();
```

Persists the hub’s newly rebound profile state.

### Line 1934

```text
  };
```

Structural punctuation closes the surrounding block or statement.

### Line 1935

```text

```

Blank line separates adjacent bootstrap/engine logic for readability.

### Line 1936

```text
});
```

Closes the DOMContentLoaded bootstrap callback.
