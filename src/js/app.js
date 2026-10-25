


/* Browser bootstrap waits for the HTML, unlocks or creates the local profile, and only then wires game systems to that save. */
document.addEventListener('DOMContentLoaded', async () => {
  const LocalProfiles = new window.LocalProfileManager();
  window.LocalProfiles = LocalProfiles;
  await LocalProfiles.initialize();

  // ==========================================
  // 1. SOUND FX & PARTICLE CANVAS ENGINE
  // ==========================================
  /** Small Web Audio and Canvas effects share one volume/mute control and need no external media files. */
  class FXEngine {
    constructor() {
      this.audioCtx = null;
      this.masterGain = null;
      this.volume = 0.8;
      this.isMuted = false;

      this.canvas = document.getElementById('fx-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];

      this.initCanvas();
      this.animateParticles();
    }

    initAudio() {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
          this.masterGain = this.audioCtx.createGain();
          this.updateGain();
          this.masterGain.connect(this.audioCtx.destination);
        }
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    setVolume(val) {
      this.volume = val;
      this.updateGain();
    }

    setMute(muted) {
      this.isMuted = muted;
      this.updateGain();
    }

    updateGain() {
      if (this.masterGain && this.audioCtx) {
        const effectiveVol = this.isMuted ? 0 : this.volume;
        this.masterGain.gain.setValueAtTime(effectiveVol, this.audioCtx.currentTime);
      }
    }

    playClick() {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.audioCtx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    }

    playReelStop(soundPreset = 'classic') {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      const presets = {
        classic: { start: 180, end: 40, type: 'triangle' },
        royal: { start: 330, end: 110, type: 'triangle' },
        garden: { start: 520, end: 260, type: 'sine' },
        neon: { start: 760, end: 180, type: 'square' },
        ocean: { start: 390, end: 95, type: 'sine' }
      };
      const preset = presets[soundPreset] || presets.classic;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = preset.type;
      osc.frequency.setValueAtTime(preset.start, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(preset.end, this.audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    }

    playCoinFlipSound() {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      for (let i = 0; i < 6; i++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200 + (i * 150), this.audioCtx.currentTime + (i * 0.1));

        gain.gain.setValueAtTime(0.1, this.audioCtx.currentTime + (i * 0.1));
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.1) + 0.08);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.audioCtx.currentTime + (i * 0.1));
        osc.stop(this.audioCtx.currentTime + (i * 0.1) + 0.08);
      }
    }

    playWinSound(soundPreset = 'classic') {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      const melodies = {
        classic: [523.25, 659.25, 783.99, 1046.50],
        royal: [392, 523.25, 659.25, 783.99],
        garden: [440, 554.37, 659.25, 880],
        neon: [587.33, 739.99, 880, 1174.66],
        ocean: [329.63, 392, 493.88, 659.25]
      };
      const notes = melodies[soundPreset] || melodies.classic;
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + (idx * 0.08));

        gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + (idx * 0.08));
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (idx * 0.08) + 0.25);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.audioCtx.currentTime + (idx * 0.08));
        osc.stop(this.audioCtx.currentTime + (idx * 0.08) + 0.25);
      });
    }

    playJackpotSound() {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      for (let i = 0; i < 12; i++) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300 + (i * 80), this.audioCtx.currentTime + (i * 0.06));

        gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + (i * 0.06));
        gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + (i * 0.06) + 0.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.audioCtx.currentTime + (i * 0.06));
        osc.stop(this.audioCtx.currentTime + (i * 0.06) + 0.2);
      }
    }

    initCanvas() {
      if (!this.canvas) return;
      const resize = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resize);
      resize();
    }

    spawnConfetti(count = 75) {
      if (!this.canvas) return;
      const colors = ['#ffd700', '#ff4d4d', '#4eef90', '#e056fd', '#00d2d3'];

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: this.canvas.width / 2 + (Math.random() * 200 - 100),
          y: this.canvas.height / 3,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.8) * 14,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          gravity: 0.35,
          rotation: Math.random() * 360,
          vRot: (Math.random() - 0.5) * 10
        });
      }
    }

    animateParticles() {
      if (this.ctx) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
          const p = this.particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.alpha -= 0.012;
          p.rotation += p.vRot;

          if (p.alpha <= 0 || p.y > this.canvas.height) {
            this.particles.splice(i, 1);
            continue;
          }

          this.ctx.save();
          this.ctx.globalAlpha = p.alpha;
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate((p.rotation * Math.PI) / 180);
          this.ctx.fillStyle = p.color;
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.ctx.restore();
        }
      }
      requestAnimationFrame(() => this.animateParticles());
    }
  }
  const FX = new FXEngine();

  // ==========================================
  // 2. BLACKJACK 21 TABLE ENGINE
  // ==========================================
  /** Blackjack is a state machine so betting, player actions, dealer play, and settlement cannot overlap. */
  class BlackjackEngine {
    constructor(hubController) {
      this.hub = hubController;
      this.bet = 10;
      this.deck = [];
      this.playerHand = [];
      this.dealerHand = [];
      this.gameState = 'BETTING'; // BETTING, PLAYER_TURN, DEALER_TURN, ENDED
      this.dealerHidden = true;

      this.bindElements();
      if (this.dealBtn) this.init();
    }

    bindElements() {
      this.betEl = document.getElementById('bet-bj-display');
      this.statusEl = document.getElementById('status-bj');
      this.dealBtn = document.getElementById('btn-bj-deal');
      this.hitBtn = document.getElementById('btn-bj-hit');
      this.standBtn = document.getElementById('btn-bj-stand');
      this.doubleBtn = document.getElementById('btn-bj-double');
      this.minusBtn = document.getElementById('btn-bj-minus');
      this.plusBtn = document.getElementById('btn-bj-plus');
      this.maxBtn = document.getElementById('btn-bj-max');
      this.clearBtn = document.getElementById('btn-bj-clear');

      this.dealerCardsEl = document.getElementById('bj-dealer-cards');
      this.playerCardsEl = document.getElementById('bj-player-cards');
      this.dealerScoreEl = document.getElementById('bj-dealer-score');
      this.playerScoreEl = document.getElementById('bj-player-score');
    }

    init() {
      this.updateUI();

      this.dealBtn.addEventListener('click', () => this.startHand());
      this.hitBtn.addEventListener('click', () => this.playerHit());
      this.standBtn.addEventListener('click', () => this.playerStand());
      this.doubleBtn.addEventListener('click', () => this.playerDoubleDown());

      const changeBet = action => {
        if (this.gameState !== 'BETTING') return;
        FX.playClick();
        this.bet = action();
        this.updateUI();
      };
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
    }

    createDeck() {
      const suits = [
        { symbol: '♠', isRed: false },
        { symbol: '♥', isRed: true },
        { symbol: '♦', isRed: true },
        { symbol: '♣', isRed: false }
      ];
      const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

      this.deck = [];
      suits.forEach(suit => {
        values.forEach(val => {
          this.deck.push({ value: val, suit: suit.symbol, isRed: suit.isRed });
        });
      });

      // Fisher-Yates Shuffle
      for (let i = this.deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
      }
    }

    drawCard() {
      if (this.deck.length === 0) this.createDeck();
      return this.deck.pop();
    }

    calculateHandValue(hand) {
      let value = 0;
      let aces = 0;

      hand.forEach(card => {
        if (card.value === 'A') {
          aces++;
          value += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
          value += 10;
        } else {
          value += parseInt(card.value, 10);
        }
      });

      while (value > 21 && aces > 0) {
        value -= 10;
        aces--;
      }

      return value;
    }

    startHand() {
      if (this.hub.isSettling || this.gameState !== 'BETTING' || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;

      FX.playClick();
      this.hub.modifyBalance(-this.bet);
      JackpotManager.contribute(this.bet * 0.015);
      window.XP.addWagerXP(this.bet);

      this.createDeck();
      this.playerHand = [this.drawCard(), this.drawCard()];
      this.dealerHand = [this.drawCard(), this.drawCard()];
      this.dealerHidden = true;
      this.gameState = 'PLAYER_TURN';

      this.setStatus('YOUR TURN — HIT, STAND, OR DOUBLE', 'status-spinning');
      this.renderHands();
      this.updateUI();

      // Check for Natural Blackjack
      if (this.calculateHandValue(this.playerHand) === 21) {
        this.dealerHidden = false;
        this.renderHands();
        if (this.calculateHandValue(this.dealerHand) === 21) {
          this.endHand('PUSH! Both hit Natural Blackjack.', 'status-spinning', this.bet);
        } else {
          const winAmount = this.bet + (this.bet * 1.5);
          this.endHand(`🎉 BLACKJACK! WON +$${winAmount}!`, 'status-win', winAmount);
        }
      }
    }

    playerHit() {
      if (this.gameState !== 'PLAYER_TURN') return;

      FX.playClick();
      this.playerHand.push(this.drawCard());
      this.renderHands();

      if (this.calculateHandValue(this.playerHand) > 21) {
        this.dealerHidden = false;
        this.renderHands();
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
      }
    }

    playerDoubleDown() {
      if (this.gameState !== 'PLAYER_TURN' || this.hub.balance < this.bet || this.playerHand.length !== 2) return;

      FX.playClick();
      this.hub.modifyBalance(-this.bet);
      JackpotManager.contribute(this.bet * 0.015);
      window.XP.addWagerXP(this.bet);

      this.bet *= 2;
      this.playerHand.push(this.drawCard());
      this.renderHands();

      if (this.calculateHandValue(this.playerHand) > 21) {
        this.dealerHidden = false;
        this.renderHands();
        this.endHand('BUST! Hand value exceeded 21.', 'status-loss', 0);
      } else {
        this.playerStand();
      }
    }

    async playerStand() {
      if (this.gameState !== 'PLAYER_TURN') return;

      FX.playClick();
      this.gameState = 'DEALER_TURN';
      this.dealerHidden = false;
      this.renderHands();
      this.setStatus('DEALER IS DRAWING...', 'status-spinning');
      this.updateUI();

      while (this.calculateHandValue(this.dealerHand) < 17) {
        await new Promise(r => setTimeout(r, 600));
        this.dealerHand.push(this.drawCard());
        FX.playReelStop();
        this.renderHands();
      }

      this.evaluateOutcome();
    }

    evaluateOutcome() {
      const pVal = this.calculateHandValue(this.playerHand);
      const dVal = this.calculateHandValue(this.dealerHand);

      if (dVal > 21) {
        this.endHand(`DEALER BUSTS (${dVal})! WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
      } else if (pVal > dVal) {
        this.endHand(`WINNER! ${pVal} BEATS ${dVal}. WON +$${this.bet * 2}!`, 'status-win', this.bet * 2);
      } else if (pVal === dVal) {
        this.endHand(`PUSH (${pVal} = ${dVal})! Bet refunded.`, 'status-spinning', this.bet);
      } else {
        this.endHand(`DEALER WINS (${dVal} vs ${pVal}).`, 'status-loss', 0);
      }
    }

    endHand(message, statusClass, payoutAmount) {
      if (this.gameState === 'ENDED' || this.gameState === 'BETTING') return;
      this.gameState = 'ENDED';
      window.Accomplishments?.recordGame('blackjack', { stake: this.bet, payout: payoutAmount });

      if (payoutAmount > 0) {
        this.hub.modifyBalance(payoutAmount);
        if (statusClass === 'status-win') {
          FX.playWinSound();
          FX.spawnConfetti(50);
        }
      } else {
        FX.playClick();
      }

      this.setStatus(message, statusClass);
      this.updateUI();
    }

    renderHands() {
      // Render Dealer Cards
      this.dealerCardsEl.innerHTML = '';
      this.dealerHand.forEach((card, idx) => {
        if (idx === 1 && this.dealerHidden) {
          const cardEl = document.createElement('div');
          cardEl.className = 'playing-card card-back';
          this.dealerCardsEl.appendChild(cardEl);
        } else {
          this.dealerCardsEl.appendChild(this.createCardElement(card));
        }
      });

      this.dealerScoreEl.textContent = this.dealerHidden ? '?' : this.calculateHandValue(this.dealerHand);

      // Render Player Cards
      this.playerCardsEl.innerHTML = '';
      this.playerHand.forEach(card => {
        this.playerCardsEl.appendChild(this.createCardElement(card));
      });

      this.playerScoreEl.textContent = this.calculateHandValue(this.playerHand);
    }

    createCardElement(card) {
      const el = document.createElement('div');
      el.className = `playing-card ${card.isRed ? 'red-suit' : ''}`;
      el.innerHTML = `
        <div class="card-top">${card.value}</div>
        <div class="card-center">${card.suit}</div>
        <div class="card-bottom">${card.value}</div>
      `;
      return el;
    }

    setStatus(text, statusClass) {
      this.statusEl.textContent = text;
      this.statusEl.className = 'status-banner';
      if (statusClass) this.statusEl.classList.add(statusClass);
    }

    updateUI() {
      this.betEl.textContent = window.SlotBetRules.format(this.bet);

      const isBetting = this.gameState === 'BETTING' || this.gameState === 'ENDED';
      const isPlayerTurn = this.gameState === 'PLAYER_TURN';
      this.maxBtn.disabled = !isBetting || window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet) === 0 || this.bet === window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
      this.clearBtn.disabled = !isBetting || this.bet === 0;

      if (isBetting) {
        this.dealBtn.classList.replace('hidden-view', 'active-view');
        this.hitBtn.classList.replace('active-view', 'hidden-view');
        this.standBtn.classList.replace('active-view', 'hidden-view');
        this.doubleBtn.classList.replace('active-view', 'hidden-view');

        this.dealBtn.disabled = !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
        this.minusBtn.disabled = this.bet <= 5;
        this.plusBtn.disabled = this.bet >= window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);

        if (this.gameState === 'ENDED') {
          this.dealBtn.textContent = 'DEAL AGAIN';
          this.gameState = 'BETTING';
        } else {
          this.dealBtn.textContent = 'DEAL HAND';
        }
      } else if (isPlayerTurn) {
        this.dealBtn.classList.replace('active-view', 'hidden-view');
        this.hitBtn.classList.replace('hidden-view', 'active-view');
        this.standBtn.classList.replace('hidden-view', 'active-view');

        if (this.playerHand.length === 2 && this.hub.balance >= this.bet) {
          this.doubleBtn.classList.replace('hidden-view', 'active-view');
        } else {
          this.doubleBtn.classList.replace('active-view', 'hidden-view');
        }

        this.minusBtn.disabled = true;
        this.plusBtn.disabled = true;
      } else {
        // Dealer turn
        this.hitBtn.classList.replace('active-view', 'hidden-view');
        this.standBtn.classList.replace('active-view', 'hidden-view');
        this.doubleBtn.classList.replace('active-view', 'hidden-view');
      }

      this.hub.updateGlobalUI();
    }
  }

  // ==========================================
  // 3. DAILY WHEEL MANAGER
  // ==========================================
  /** Draws the daily bonus wheel on Canvas and enforces a 24-hour cooldown using the active player save. */
  class DailyWheelManager {
    constructor(hubController) {
      this.hub = hubController;
      this.slices = [
        { label: '$50',   amount: 50,   color: '#e74c3c' },
        { label: '$100',  amount: 100,  color: '#3498db' },
        { label: 'Good Luck',  amount: 0,  color: '#2ecc71' },
        { label: '$500',  amount: 500,  color: '#9b59b6' },
        { label: '$150',  amount: 150,  color: '#e67e22' },
        { label: 'Good Luck', amount: 0, color: '#f1c40f' },
        { label: '$75',   amount: 75,   color: '#1abc9c' },
        { label: '$300',  amount: 300,  color: '#34495e' }
      ];

      this.currentAngle = 0;
      this.isSpinning = false;

      this.bindElements();
      this.initEvents();
      this.drawWheel(0);
      this.startTimerInterval();
    }

    bindElements() {
      this.modalEl = document.getElementById('modal-wheel');
      this.openBtn = document.getElementById('btn-open-wheel');
      this.closeBtn = document.getElementById('btn-close-wheel');
      this.spinBtn = document.getElementById('btn-spin-wheel');
      this.timerEl = document.getElementById('wheel-cooldown-timer');
      this.canvas = document.getElementById('wheel-canvas');
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    }

    initEvents() {
      this.openBtn?.addEventListener('click', () => {
        FX.playClick();
        this.updateUI();
        this.modalEl.classList.replace('hidden-view', 'active-view');
      });

      this.closeBtn?.addEventListener('click', () => {
        FX.playClick();
        this.modalEl.classList.replace('active-view', 'hidden-view');
      });

      this.spinBtn?.addEventListener('click', () => this.startSpin());
    }

    drawWheel(angleOffset) {
      if (!this.ctx || !this.canvas) return;

      const numSlices = this.slices.length;
      const arc = (Math.PI * 2) / numSlices;
      const centerX = this.canvas.width / 2;
      const centerY = this.canvas.height / 2;
      const radius = centerX - 10;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = 0; i < numSlices; i++) {
        const angle = angleOffset + (i * arc);

        this.ctx.beginPath();
        this.ctx.fillStyle = this.slices[i].color;
        this.ctx.moveTo(centerX, centerY);
        this.ctx.arc(centerX, centerY, radius, angle, angle + arc);
        this.ctx.fill();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.stroke();

        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(angle + arc / 2);
        this.ctx.textAlign = 'right';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 15px Segoe UI';
        this.ctx.fillText(this.slices[i].label, radius - 20, 5);
        this.ctx.restore();
      }

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      this.ctx.fillStyle = '#181820';
      this.ctx.fill();
      this.ctx.lineWidth = 4;
      this.ctx.strokeStyle = '#ffd700';
      this.ctx.stroke();
    }

    startSpin() {
      if (this.hub.isSettling || this.isSpinning || this.getRemainingCooldown() > 0) return;

      FX.playClick();
      this.isSpinning = true;
      this.spinBtn.disabled = true;

      const targetSliceIndex = Math.floor(Math.random() * this.slices.length);
      const sliceArc = (Math.PI * 2) / this.slices.length;
      const targetAngle = (Math.PI * 2 * 6) - (targetSliceIndex * sliceArc) - (sliceArc / 2) - (Math.PI / 2);

      const startTime = performance.now();
      const duration = 4000;

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        this.currentAngle = easeOut * targetAngle;

        this.drawWheel(this.currentAngle);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          this.isSpinning = false;
          this.hub.player.lastSpinTime = Date.now();
          this.saveState();

          const wonSlice = this.slices[targetSliceIndex];
          this.hub.modifyBalance(wonSlice.amount);
          
          if (wonSlice.amount !== 0) {
            FX.playJackpotSound();
            FX.spawnConfetti(100);
            alert(`🎉 DAILY BONUS CLAIMED!\nYou won +$${wonSlice.amount.toLocaleString()} Free Chips!`);
          } else {
            alert(`Today wasn't your day. Good luck though!`);
          }

            
          this.updateUI();
        }
      };

      requestAnimationFrame(animate);
    }

    getRemainingCooldown() {
      const cooldownMs = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - this.hub.player.lastSpinTime;
      return Math.max(0, cooldownMs - elapsed);
    }

    startTimerInterval() {
      setInterval(() => this.updateUI(), 1000);
    }

    updateUI() {
      const remaining = this.getRemainingCooldown();
      if (remaining > 0) {
        this.spinBtn.disabled = true;
        this.timerEl.classList.replace('hidden-view', 'active-view');

        const hrs = String(Math.floor(remaining / 3600000)).padStart(2, '0');
        const mins = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, '0');
        const secs = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0');
        this.timerEl.textContent = `NEXT SPIN IN: ${hrs}:${mins}:${secs}`;
      } else {
        this.spinBtn.disabled = this.isSpinning;
        this.timerEl.classList.replace('active-view', 'hidden-view');
      }
    }

    saveState() {
      this.hub.saveState();
    }

    resetState() {
      this.hub.player.lastSpinTime = 0;
      this.saveState();
      this.updateUI();
    }
  }

  // ==========================================
  // 4. SETTINGS & THEME MANAGER
  // ==========================================
  /** Keeps sound and CSS themes in sync with the controls and encrypted active-profile settings. */
  class SettingsManager {
    constructor(hubController) {
      this.hub = hubController;
      this.bindElements();
      this.loadSettings();
      this.initEvents();
    }

    bindElements() {
      this.modalEl = document.getElementById('modal-settings');
      this.openBtn = document.getElementById('btn-open-settings');
      this.closeBtn = document.getElementById('btn-close-settings');
      this.volumeSlider = document.getElementById('slider-volume');
      this.volumeDisplay = document.getElementById('volume-display-val');
      this.muteBtn = document.getElementById('btn-toggle-mute');
      this.themeBtns = document.querySelectorAll('.theme-btn');
    }

    initEvents() {
      this.openBtn?.addEventListener('click', () => {
        FX.playClick();
        this.modalEl.classList.replace('hidden-view', 'active-view');
      });

      this.closeBtn?.addEventListener('click', () => {
        FX.playClick();
        this.modalEl.classList.replace('active-view', 'hidden-view');
      });

      this.volumeSlider?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.volumeDisplay.textContent = `${val}%`;
        FX.setVolume(val / 100);
        this.saveSettings();
      });

      this.muteBtn?.addEventListener('click', () => {
        FX.playClick();
        this.isMuted = !this.isMuted;
        FX.setMute(this.isMuted);
        this.updateMuteUI();
        this.saveSettings();
      });

      this.themeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          FX.playClick();
          const theme = e.currentTarget.getAttribute('data-theme');
          this.applyTheme(theme);
          this.saveSettings();
        });
      });
    }

    applyTheme(themeName) {
      if (themeName === 'vegas') {
        document.body.removeAttribute('data-theme');
      } else {
        document.body.setAttribute('data-theme', themeName);
      }

      this.currentTheme = themeName;
      this.themeBtns.forEach(b => {
        if (b.getAttribute('data-theme') === themeName) {
          b.classList.add('active-theme');
        } else {
          b.classList.remove('active-theme');
        }
      });
    }

    updateMuteUI() {
      if (this.muteBtn) {
        if (this.isMuted) {
          this.muteBtn.textContent = 'MUTE: ON';
          this.muteBtn.classList.add('is-muted');
        } else {
          this.muteBtn.textContent = 'MUTE: OFF';
          this.muteBtn.classList.remove('is-muted');
        }
      }
    }

    saveSettings() {
      this.hub.saveState();
    }

    getSettings() {
      const volume = this.volumeSlider ? parseInt(this.volumeSlider.value, 10) : 80;
      return {
        volume: Number.isFinite(volume) ? Math.max(0, Math.min(100, volume)) : 80,
        isMuted: this.isMuted === true,
        theme: ['vegas', 'midnight', 'gold', 'money'].includes(this.currentTheme) ? this.currentTheme : 'vegas'
      };
    }

    applySettings(settings = {}) {
      const value = Number(settings.volume);
      const volume = Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : 80;
      const theme = ['vegas', 'midnight', 'gold', 'money'].includes(settings.theme) ? settings.theme : 'vegas';
      this.isMuted = settings.isMuted === true;
      if (this.volumeSlider) this.volumeSlider.value = String(volume);
      if (this.volumeDisplay) this.volumeDisplay.textContent = `${volume}%`;
      FX.setVolume(volume / 100);
      FX.setMute(this.isMuted);
      this.updateMuteUI();
      this.applyTheme(theme);
    }

    loadSettings() {
      const savedSettings = window.LocalProfiles?.getCurrentSave().settings || {};
      this.applySettings(savedSettings);
    }
  }

  // ==========================================
  // 5. XP & PLAYER LEVELING ENGINE
  // ==========================================
  /** Converts virtual wagers to level progress and non-monetary milestones; it does not change wager odds. */
  class XPManager {
    constructor(hubController) {
      this.hub = hubController;

      this.bindElements();
      this.updateUI();
    }

    bindElements() {
      this.levelBadgeEl = document.getElementById('player-level-badge');
      this.barFillEl = document.getElementById('xp-bar-fill');
      this.barTextEl = document.getElementById('xp-bar-text');
      this.vipTagEl = document.getElementById('vip-tier-tag');
    }

    addWagerXP(wagerAmount) {
      const xpEarned = Math.max(1, Math.floor(wagerAmount * 0.15));
      this.hub.player.xp += xpEarned;

      while (this.hub.player.xp >= this.getRequiredXP()) {
        this.hub.player.xp -= this.getRequiredXP();
        this.hub.player.level++;
        this.handleLevelUp();
      }

      this.saveState();
      this.updateUI();
    }

    getRequiredXP() {
      return Math.floor(100 * Math.pow(this.hub.player.level, 1.2));
    }

    getVIPTier() {
      if (this.hub.player.level >= 20) return 'DIAMOND';
      if (this.hub.player.level >= 15) return 'PLATINUM';
      if (this.hub.player.level >= 10) return 'GOLD';
      if (this.hub.player.level >= 5) return 'SILVER';
      return 'BRONZE';
    }

    handleLevelUp() {
      const { level, bonus: levelBonus } = window.GameRules.levelReward(this.hub.player);
      const tier = this.getVIPTier();
      this.hub.modifyBalance(levelBonus);
      FX.playJackpotSound();
      FX.spawnConfetti(120);
      setTimeout(() => {
        alert(`LEVEL UP! You reached Level ${level} (${tier})!\nAwarded +$${levelBonus} virtual-chip bonus! Credit Limit +$250!`);
      }, 200);
    }

    updateUI() {
      const required = this.getRequiredXP();
      const pct = Math.min(100, Math.floor((this.hub.player.xp / required) * 100));

      if (this.levelBadgeEl) this.levelBadgeEl.textContent = `LVL ${this.hub.player.level}`;
      if (this.barFillEl) this.barFillEl.style.width = `${pct}%`;
      if (this.barTextEl) this.barTextEl.textContent = `${this.hub.player.xp} / ${required} XP`;
      if (this.vipTagEl) this.vipTagEl.textContent = this.getVIPTier();
    }

    saveState() {
      this.hub.saveState();
    }

    resetState() {
      this.hub.player.level = 1;
      this.hub.player.xp = 0;
      this.saveState();
      this.updateUI();
    }
  }

  // ==========================================
  // 6. PROGRESSIVE JACKPOT MANAGER
  // ==========================================
  /** A browser-origin-local demo jackpot; storage events refresh other tabs without a game server. */
  class ProgressiveJackpotManager {
    constructor(initialAmount = 10000) {
      this.storageKey = 'ss_casino_shared_jackpot_v1';
      this.jackpotEl = document.getElementById('global-jackpot');
      window.addEventListener('storage', event => {
        if (event.key !== this.storageKey) return;
        const sharedAmount = Number(event.newValue);
        if (Number.isFinite(sharedAmount) && sharedAmount >= 0) {
          this.currentJackpot = sharedAmount;
          this.updateDisplay();
        }
      });
      this.loadState(initialAmount);
    }

    contribute(amount) {
      const contribution = Number(amount);
      if (!Number.isFinite(contribution) || contribution <= 0) return;
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
      this.currentJackpot += contribution;
      this.saveState();
      this.updateDisplay();
    }

    claimJackpot() {
      this.currentJackpot = this.readSharedAmount() ?? this.currentJackpot;
      const awarded = this.currentJackpot;
      this.currentJackpot = 5000;
      this.saveState();
      this.updateDisplay();
      return awarded;
    }

    readSharedAmount() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored === null) return null;
        const amount = Number(stored);
        return Number.isFinite(amount) && amount >= 0 ? amount : null;
      } catch (error) {
        return null;
      }
    }

    saveState() {
      try {
        localStorage.setItem(this.storageKey, String(this.currentJackpot));
      } catch (error) {
        console.error('Shared local jackpot could not be saved to this browser.', error);
      }
      window.LocalSave?.queueFileSave();
    }

    loadState(defaultAmount) {
      const sharedAmount = this.readSharedAmount();
      if (sharedAmount !== null) {
        this.currentJackpot = sharedAmount;
      } else {
        const saved = window.LocalProfiles?.getCurrentSave().jackpot;
        const legacyAmount = Number(saved);
        this.currentJackpot = Number.isFinite(legacyAmount) && legacyAmount >= 0 ? legacyAmount : defaultAmount;
        this.saveState();
      }
      this.updateDisplay();
    }

    setJackpot(amount) {
      const parsed = Number(amount);
      if (!Number.isFinite(parsed) || parsed < 0) return false;
      this.currentJackpot = parsed;
      this.saveState();
      this.updateDisplay();
      return true;
    }

    resetState() {
      this.currentJackpot = 10000;
      this.saveState();
      this.updateDisplay();
    }

    updateDisplay() {
      if (this.jackpotEl) {
        this.jackpotEl.textContent = `$${this.currentJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
  }

  const JackpotManager = new ProgressiveJackpotManager(10000);
  window.JackpotManager = JackpotManager;

  // ==========================================
  // 7. BANK & LOAN MANAGER
  // ==========================================
  /** Implements virtual-chip borrowing and repayment in the player model; no payment rail or real credit is involved. */
  class BankManager {
    constructor(hubController) {
      this.hub = hubController;
      this.interestRate = 0.10;

      this.bindElements();
      this.initEvents();
    }

    bindElements() {
      this.modalEl = document.getElementById('modal-bank');
      this.openBtn = document.getElementById('btn-open-bank');
      this.closeBtn = document.getElementById('btn-close-bank');
      this.debtDisplayEl = document.getElementById('bank-debt-display');
      this.creditDisplayEl = document.getElementById('bank-credit-display');
      this.repay100Btn = document.getElementById('btn-repay-100');
      this.repayAllBtn = document.getElementById('btn-repay-all');
    }

    initEvents() {
      this.openBtn?.addEventListener('click', () => {
        FX.playClick();
        this.updateModalUI();
        this.modalEl.classList.replace('hidden-view', 'active-view');
      });

      this.closeBtn?.addEventListener('click', () => {
        FX.playClick();
        this.modalEl.classList.replace('active-view', 'hidden-view');
      });

      document.querySelectorAll('.btn-preset-loan').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const amount = parseFloat(e.target.getAttribute('data-amount'));
          this.takeLoan(amount);
        });
      });

      this.repay100Btn?.addEventListener('click', () => this.repayLoan(100));
      this.repayAllBtn?.addEventListener('click', () => this.repayLoan(this.hub.player.debt));
    }

    takeLoan(amount) {
      if (this.hub.isSettling) return;
      if (this.hub.player.debt + amount > this.hub.player.creditLimit) {
        alert(`Loan request exceeds maximum credit limit of $${this.hub.player.creditLimit.toLocaleString()}!`);
        return;
      }

      const totalCharge = amount * (1 + this.interestRate);
      this.hub.player.debt += totalCharge;
      this.hub.modifyBalance(amount);

      FX.playWinSound();
      this.saveState();
      this.updateModalUI();
    }

    repayLoan(amount) {
      if (this.hub.isSettling) return;
      if (this.hub.player.debt <= 0) {
        alert('You currently have no outstanding debt!');
        return;
      }

      const payAmount = Math.min(amount, this.hub.player.debt, this.hub.balance);

      if (payAmount <= 0) {
        alert('Insufficient wallet funds to repay loan!');
        return;
      }

      this.hub.player.debt -= payAmount;
      this.hub.modifyBalance(-payAmount);

      FX.playClick();
      this.saveState();
      this.updateModalUI();
    }

    saveState() {
      this.hub.saveState();
    }

    resetState() {
      this.hub.player.debt = 0;
      this.saveState();
      this.updateModalUI();
    }

    updateModalUI() {
      if (this.debtDisplayEl) {
        this.debtDisplayEl.textContent = `$${this.hub.player.debt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (this.creditDisplayEl) {
        this.creditDisplayEl.textContent = `$${this.hub.player.creditLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
  }

  // ==========================================
  // 8. CENTRAL CASINO HUB CONTROLLER
  // ==========================================
  /** Owns the active Player, lobby navigation, and shared wallet display; games call it to settle chips. */
  class CasinoHubController {
    constructor(startingBalance = 100) {
      this.globalBalanceEl = document.getElementById('global-balance');
      this.lobbyView = document.getElementById('view-lobby');
      this.slotClassicView = document.getElementById('view-classic-slots');
      this.slot5ReelView = document.getElementById('view-5reel-slots');
      this.extraSlotViews = Array.from(document.querySelectorAll('[data-extra-slot-view]'));
      this.coinTossView = document.getElementById('view-coin-toss');
      this.threeCoinTossView = document.getElementById('view-three-coin-toss');
      this.blackjackView = document.getElementById('view-blackjack');
      this.raceView = document.getElementById('view-horse-racing');

      this.currentView = 'lobby';
      const profileSave = window.LocalProfiles.getCurrentSave();
      this.player = Player.fromProfile(profileSave.player, window.LocalProfiles.activeProfile?.name || 'Player');
      this.initEventListeners();
      this.updateGlobalUI();
    }

    get balance() {
      return this.player.balance;
    }

    set balance(value) {
      this.player.balance = value;
    }

    modifyBalance(amount) {
      this.balance = Math.round((this.balance + amount + Number.EPSILON) * 100) / 100;
      this.saveState();
      this.updateGlobalUI();
    }

    initEventListeners() {
      document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          FX.playClick();
          const gameTarget = e.target.getAttribute('data-game');
          this.switchView(gameTarget);
        });
      });

      document.querySelectorAll('.back-lobby-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          FX.playClick();
          this.switchView('lobby');
        });
      });

      document.getElementById('btn-reset-data')?.addEventListener('click', () => {
        if (confirm('Reset your casino balance to $100.00, credit, debt, level, XP, and shared jackpot? Your daily-wheel cooldown and race progress will be kept.')) {
          if (RaceGame?.hasPendingTicket() || !LocalProfiles.canSwitchProfile()) {
            alert('Wait for your simulated race to finish before resetting casino data.');
            return;
          }
          this.resetState();
          JackpotManager.resetState();
          window.Bank.resetState();
          window.XP.resetState();

          // Don't reset wheel
          // window.DailyWheel.resetState();

          alert('Casino state has been reset to defaults!');
        }
      });
    }

    switchView(viewName) {
      this.currentView = viewName;
      this.lobbyView.classList.replace('active-view', 'hidden-view');
      this.slotClassicView.classList.replace('active-view', 'hidden-view');
      this.slot5ReelView.classList.replace('active-view', 'hidden-view');
      this.extraSlotViews.forEach(view => view.classList.replace('active-view', 'hidden-view'));
      this.coinTossView.classList.replace('active-view', 'hidden-view');
      this.threeCoinTossView.classList.replace('active-view', 'hidden-view');
      this.blackjackView.classList.replace('active-view', 'hidden-view');
      this.raceView?.classList.replace('active-view', 'hidden-view');

      if (viewName === 'lobby') {
        this.lobbyView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'classic-slots') {
        this.slotClassicView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === '5reel-slots') {
        this.slot5ReelView.classList.replace('hidden-view', 'active-view');
      } else {
        const extraSlotView = this.extraSlotViews.find(view => view.dataset.gameView === viewName);
        if (extraSlotView) extraSlotView.classList.replace('hidden-view', 'active-view');
      }
      if (viewName === 'coin-toss') {
        this.coinTossView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'three-coin-toss') {
        this.threeCoinTossView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'blackjack') {
        this.blackjackView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'horse-racing') {
        this.raceView?.classList.replace('hidden-view', 'active-view');
      }
    }

    saveState() {
      const current = window.LocalProfiles?.getCurrentSave() || {};
      window.LocalProfiles?.saveCurrent({
        player: this.player.toProfile(),
        settings: window.CasinoSettings?.getSettings() || current.settings
      });
      window.LocalSave?.queueFileSave();
    }

    resetState() {
      this.balance = 100;
      this.player.debt = 0;
      this.player.creditLimit = 500;
      this.player.maxBet = 100;
      this.player.level = 1;
      this.player.xp = 0;
      this.saveState();
      this.updateGlobalUI();
    }

    updateGlobalUI() {
      if (this.globalBalanceEl) {
        this.globalBalanceEl.textContent = `$${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }

  }

  let RaceGame = null;
  const CasinoHub = new CasinoHubController(100);
  window.Bank = new BankManager(CasinoHub);
  window.XP = new XPManager(CasinoHub);
  window.DailyWheel = new DailyWheelManager(CasinoHub);
  window.CasinoSettings = new SettingsManager(CasinoHub);

  // ==========================================
  // 9. COIN TOSS TABLE ENGINE
  // ==========================================
  /** Handles a virtual double-or-nothing round and uses a busy flag to block duplicate flips. */
  class CoinTossEngine {
    constructor(hubController, triple = false) {
      this.hub = hubController;
      this.triple = triple;
      this.bet = 10;
      this.choices = triple ? [null, null, null] : ['HEADS'];
      this.isFlipping = false;
      const prefix = triple ? 'three-coin' : 'coin';
      this.rootEl = document.getElementById(`view-${triple ? 'three-coin-toss' : 'coin-toss'}`);
      this.betEl = document.getElementById(`bet-${prefix}-display`);
      this.statusEl = document.getElementById(`status-${prefix}`);
      this.flipBtn = document.getElementById(`btn-${prefix}-flip`);
      this.maxBtn = document.getElementById(`btn-${prefix}-max`);
      this.minusBtn = document.getElementById(`btn-${prefix}-minus`);
      this.plusBtn = document.getElementById(`btn-${prefix}-plus`);
      this.clearBtn = document.getElementById(`btn-${prefix}-clear`);
      this.coins = Array.from(this.rootEl.querySelectorAll('.coin'));
      this.choiceButtons = Array.from(this.rootEl.querySelectorAll('[data-coin-choice]'));
      this.choiceButtons.forEach(button => button.addEventListener('click', () => {
        if (this.isFlipping) return;
        this.choices[Number(button.dataset.coinIndex)] = button.dataset.coinChoice;
        FX.playClick();
        this.updateUI();
      }));
      const changeBet = action => {
        if (this.isFlipping) return;
        FX.playClick();
        this.bet = action();
        this.updateUI();
      };
      this.clearBtn.addEventListener('click', () => changeBet(() => 0));
      this.maxBtn.addEventListener('click', () => changeBet(() => window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet)));
      this.minusBtn.addEventListener('click', () => changeBet(() => window.GameRules.decrease(this.bet)));
      this.plusBtn.addEventListener('click', () => changeBet(() => window.GameRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
      this.flipBtn.addEventListener('click', () => this.startFlip());
      this.updateUI();
    }
    updateUI() {
      const max = window.GameRules.maximum(this.hub.balance, this.hub.player.maxBet);
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
      this.flipBtn.disabled = this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet);
      this.maxBtn.disabled = this.isFlipping || max === 0 || this.bet === max;
      this.clearBtn.disabled = this.isFlipping || this.bet === 0;
      this.minusBtn.disabled = this.isFlipping || this.bet <= 5;
      this.plusBtn.disabled = this.isFlipping || this.bet >= max;
      this.choiceButtons.forEach(button => {
        const chosen = this.choices[Number(button.dataset.coinIndex)] === button.dataset.coinChoice;
        button.classList.toggle('active-choice', chosen);
        button.setAttribute('aria-pressed', String(chosen));
        button.disabled = this.isFlipping;
      });
      this.hub.updateGlobalUI();
    }
    setStatus(text, statusClass) {
      this.statusEl.textContent = text;
      this.statusEl.className = `status-banner ${statusClass || ''}`;
    }
    async startFlip() {
      if (this.hub.isSettling || this.isFlipping || this.choices.some(choice => !choice) || !window.GameRules.legal(this.bet, this.hub.balance, this.hub.player.maxBet)) return;
      this.isFlipping = true;
      const stake = this.bet;
      const choices = [...this.choices];
      const outcomes = this.coins.map(() => Math.random() >= 0.5 ? 'HEADS' : 'TAILS');
      const result = this.triple ? window.GameRules.threeCoinResult(choices, outcomes, stake) : {
        correct: Number(choices[0] === outcomes[0]), stake,
        payout: choices[0] === outcomes[0] ? Math.round(stake * 200) / 100 : 0
      };
      // Settle before presentation: refresh cannot leave a wager deducted with an unpaid resolved flip.
      this.hub.modifyBalance(result.payout - stake);
      JackpotManager.contribute(stake * 0.015);
      window.XP.addWagerXP(stake);
      window.Accomplishments?.recordGame(this.triple ? 'three-coin' : 'coin', result);
      FX.playClick();
      FX.playCoinFlipSound();
      this.setStatus(this.triple ? 'FLIPPING ALL THREE COINS…' : 'FLIPPING COIN…', 'status-spinning');
      this.updateUI();
      await Promise.all(this.coins.map((coin, index) => new Promise(resolve => {
        let finished = false;
        const done = () => {
          if (finished) return;
          finished = true;
          coin.removeEventListener('animationend', done);
          coin.classList.remove('animate-heads', 'animate-tails');
          coin.style.transform = outcomes[index] === 'HEADS' ? 'rotateY(0deg)' : 'rotateY(180deg)';
          resolve();
        };
        coin.classList.remove('animate-heads', 'animate-tails');
        void coin.offsetHeight;
        coin.addEventListener('animationend', done);
        coin.classList.add(outcomes[index] === 'HEADS' ? 'animate-heads' : 'animate-tails');
        setTimeout(done, 2400); // Reduced motion / missing animation event must never lock the table.
      })));
      const net = Math.round((result.payout - stake) * 100) / 100;
      const matched = this.triple ? `${result.correct}/3 correct. ` : '';
      this.setStatus(`${outcomes.join(' / ')} — ${matched}Return ${window.SlotBetRules.format(result.payout)}; stake ${window.SlotBetRules.format(stake)}; net ${net >= 0 ? '+' : '-'}${window.SlotBetRules.format(Math.abs(net))}.`, result.payout > stake ? 'status-win' : 'status-loss');
      if (result.payout > stake) { FX.playWinSound(); FX.spawnConfetti(40); }
      this.isFlipping = false;
      this.updateUI();
    }
    resetForActiveProfile() {
      this.bet = 10;
      this.choices = this.triple ? [null, null, null] : ['HEADS'];
      this.setStatus(this.triple ? 'PREDICT ALL THREE COINS' : 'PICK HEADS OR TAILS');
      this.updateUI();
    }
  }
  class ThreeCoinToss extends CoinTossEngine {
    constructor(hubController) { super(hubController, true); }
  }

  // ==========================================
  // 10. CLASSIC 3-REEL SLOT ENGINE
  // ==========================================
  /** Reusable three-reel engine: each cabinet supplies its template, theme, and cent-safe wager limits. */
  class ClassicSlotEngine {
    constructor(hubController, options = {}) {
      this.hub = hubController;
      this.rootEl = document.getElementById(options.rootId || 'view-classic-slots');
      this.betRules = new window.SlotBetRules({
        minimum: options.minimumBet ?? 5,
        step: options.betStep ?? 5,
        maximum: options.maximumBet ?? Infinity,
        startingBet: options.startingBet ?? 10
      });
      this.theme = options.theme || {};
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);
      this.SYMBOL_SIZE = 90;
      this.REEL_COUNT = 3;
      this.VISIBLE_ROWS = 3;

      // More even common symbols and rarer specials reduce the classic slot hit rate.
      this.SYMBOLS = [
        { id: 'cherry', icon: '🍒', multiplier: 1,  weight: 28 },
        { id: 'lemon',  icon: '🍋', multiplier: 1,  weight: 25 },
        { id: 'orange', icon: '🍊', multiplier: 2,  weight: 22 },
        { id: 'bell',   icon: '🔔', multiplier: 4,  weight: 18 },
        { id: 'wild',   icon: '🃏', multiplier: 8,  weight: 5 },
        { id: 'seven',  icon: '7️⃣', multiplier: 15, weight: 2 }
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));

      this.PAYLINES = [
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
      ];

      this.bet = this.betRules.startingBet;
      this.isSpinning = false;
      this.currentGrid = [];

      this.bindElements();
      if (this.spinBtn) this.init();
    }

    bindElements() {
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel .strip') || []);
    }








    setStatus(text, statusClass) {
      this.statusEl.textContent = text;
      this.statusEl.className = 'status-banner';
      if (statusClass) this.statusEl.classList.add(statusClass);
    }

    getRandomSymbol() {
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
      let random = Math.random() * totalWeight;

      for (const symbol of this.SYMBOLS) {
        if (random < symbol.weight) return symbol;
        random -= symbol.weight;
      }
      return this.SYMBOLS[0];
    }

    renderStrip(stripEl, symbolArray) {
      stripEl.innerHTML = '';
      symbolArray.forEach(sym => {
        const div = document.createElement('div');
        div.className = 'symbol';
        if (sym.image) {
          const image = document.createElement('img');
          image.className = 'slot-symbol-image';
          image.src = sym.image;
          image.alt = sym.alt || '';
          div.appendChild(image);
        } else {
          div.textContent = sym.icon;
        }
        stripEl.appendChild(div);
      });
    }



    animateReel(stripEl, reelIndex, finalSymbols) {
      return new Promise(resolve => {
        const randomPaddingCount = 20 + (reelIndex * 8);
        const sequence = [];

        for (let i = 0; i < randomPaddingCount; i++) {
          sequence.push(this.getRandomSymbol());
        }
        sequence.push(...finalSymbols);

        this.renderStrip(stripEl, sequence);

        stripEl.classList.remove('is-spinning');
        stripEl.style.setProperty('--spin-target-y', '0px');
        stripEl.offsetHeight;

        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
        const duration = 1200 + (reelIndex * 600);

        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
        stripEl.classList.add('is-spinning');

        setTimeout(() => {
          FX.playReelStop(this.theme.sounds?.reelStop);
          resolve();
        }, duration);
      });
    }

    clearHighlights() {
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
    }


  }

  // ==========================================
  // 11. HIGH VOLATILITY 5-REEL ENGINE
  // ==========================================
  /** Five-reel engine adds ten paylines, scatter-triggered free spins, and sticky wilds to the shared chip loop. */
  class HighVolatilitySlotEngine {
    constructor(hubController, options = {}) {
      this.hub = hubController;
      this.rootEl = document.getElementById(options.rootId || 'view-5reel-slots');
      this.betRules = new window.SlotBetRules({
        minimum: options.minimumBet ?? 5,
        step: options.betStep ?? 5,
        maximum: options.maximumBet ?? Infinity,
        startingBet: options.startingBet ?? 10
      });
      this.theme = options.theme || {};
      window.SlotGameCatalog.applyTheme(this.rootEl, this.theme);

      this.SYMBOL_SIZE = 70;
      this.REEL_COUNT = 5;
      this.VISIBLE_ROWS = 3;

      // Lower special-symbol frequency and a tighter paytable make wins and bonuses rarer.
      this.SYMBOLS = [
        { id: 'ten',     icon: '🔟', mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
        { id: 'jack',    icon: '🇯',  mult: { 3: 1, 4: 2, 5: 4 },   weight: 15 },
        { id: 'queen',   icon: '🇶',  mult: { 3: 1, 4: 3, 5: 5 },   weight: 15 },
        { id: 'king',    icon: '🇰',  mult: { 3: 1, 4: 4, 5: 7 },   weight: 15 },
        { id: 'ace',     icon: '🇦',  mult: { 3: 1, 4: 5, 5: 8 },   weight: 15 },
        { id: 'ruby',    icon: '💎', mult: { 3: 2, 4: 10, 5: 20 }, weight: 15 },
        { id: 'crown',   icon: '👑', mult: { 3: 4, 4: 20, 5: 40 }, weight: 1 },
        { id: 'wild',    icon: '🃏', mult: { 3: 6, 4: 25, 5: 60 }, weight: 2, isWild: true },
        { id: 'scatter', icon: '⭐', mult: { 3: 1, 4: 4, 5: 20 },  weight: 1, isScatter: true }
      ].map(symbol => window.SlotGameCatalog.applySymbolTheme(symbol, this.theme));

      this.PAYLINES = [
        [[0,1], [1,1], [2,1], [3,1], [4,1]],
        [[0,0], [1,0], [2,0], [3,0], [4,0]],
        [[0,2], [1,2], [2,2], [3,2], [4,2]],
        [[0,0], [1,1], [2,2], [3,1], [4,0]],
        [[0,2], [1,1], [2,0], [3,1], [4,2]],
        [[0,0], [1,0], [2,1], [3,2], [4,2]],
        [[0,2], [1,2], [2,1], [3,0], [4,0]],
        [[0,1], [1,0], [2,0], [3,0], [4,1]],
        [[0,1], [1,2], [2,2], [3,2], [4,1]],
        [[0,0], [1,1], [2,0], [3,1], [4,0]]
      ];

      this.bet = this.betRules.startingBet;
      this.isSpinning = false;
      this.currentGrid = [];

      this.freeSpinsRemaining = 0;
      this.bonusTotalWin = 0;
      this.stickyWildsGrid = Array(5).fill(null).map(() => Array(3).fill(false));

      this.bindElements();
      if (this.spinBtn) this.init();
    }

    bindElements() {
      this.betEl = this.rootEl?.querySelector('[data-slot-bet]');
      this.statusEl = this.rootEl?.querySelector('[data-slot-status]');
      this.spinBtn = this.rootEl?.querySelector('[data-slot-spin]');
      this.maxBtn = this.rootEl?.querySelector('[data-slot-max]');
      this.minusBtn = this.rootEl?.querySelector('[data-slot-minus]');
      this.plusBtn = this.rootEl?.querySelector('[data-slot-plus]');
      this.bonusHudEl = this.rootEl?.querySelector('[data-slot-bonus-hud]');
      this.fsCountEl = this.rootEl?.querySelector('[data-slot-fs-count]');
      this.fsWinEl = this.rootEl?.querySelector('[data-slot-fs-win]');
      this.reelStrips = Array.from(this.rootEl?.querySelectorAll('.reel-5reel .strip') || []);
    }










    setStatus(text, statusClass) {
      this.statusEl.textContent = text;
      this.statusEl.className = 'status-banner';
      if (statusClass) this.statusEl.classList.add(statusClass);
    }

    getRandomSymbol() {
      const totalWeight = this.SYMBOLS.reduce((acc, s) => acc + s.weight, 0);
      let random = Math.random() * totalWeight;

      for (const symbol of this.SYMBOLS) {
        if (random < symbol.weight) return symbol;
        random -= symbol.weight;
      }
      return this.SYMBOLS[0];
    }

    renderStrip(stripEl, symbolArray) {
      stripEl.innerHTML = '';
      symbolArray.forEach(sym => {
        const div = document.createElement('div');
        div.className = 'symbol';
        if (sym.image) {
          const image = document.createElement('img');
          image.className = 'slot-symbol-image';
          image.src = sym.image;
          image.alt = sym.alt || '';
          div.appendChild(image);
        } else {
          div.textContent = sym.icon;
        }
        stripEl.appendChild(div);
      });
    }



    animateReel(stripEl, reelIndex, finalSymbols) {
      return new Promise(resolve => {
        const randomPaddingCount = 18 + (reelIndex * 6);
        const sequence = [];

        for (let i = 0; i < randomPaddingCount; i++) {
          sequence.push(this.getRandomSymbol());
        }
        sequence.push(...finalSymbols);

        this.renderStrip(stripEl, sequence);

        stripEl.classList.remove('is-spinning');
        stripEl.style.setProperty('--spin-target-y', '0px');
        stripEl.offsetHeight;

        const targetY = -((sequence.length - this.VISIBLE_ROWS) * this.SYMBOL_SIZE);
        const duration = 1000 + (reelIndex * 400);

        stripEl.style.setProperty('--spin-target-y', `${targetY}px`);
        stripEl.style.setProperty('--spin-duration', `${duration}ms`);
        stripEl.classList.add('is-spinning');

        setTimeout(() => {
          FX.playReelStop(this.theme.sounds?.reelStop);
          resolve();
        }, duration);
      });
    }

    clearHighlights() {
      this.rootEl.querySelectorAll('.symbol.highlight').forEach(el => el.classList.remove('highlight'));
    }

    applyStickyWildClasses() {
      for (let r = 0; r < this.REEL_COUNT; r++) {
        const reelEl = this.reelStrips[r];
        const visibleSymbols = Array.from(reelEl.children).slice(-this.VISIBLE_ROWS);
        for (let row = 0; row < this.VISIBLE_ROWS; row++) {
          if (this.stickyWildsGrid[r][row] && visibleSymbols[row]) {
            visibleSymbols[row].classList.add('sticky-wild');
          }
        }
      }
    }


  }


  //
  // 12. PAPER, ROCK, SCISSORS
  //
  class PRS {
    //TODO
  }


  // Slot settlement is committed once, before presentation. No animation callback pays chips.
  const blankSlotState = () => ({ freeSpinsRemaining: 0, lockedStake: 0, bonusTotalWin: 0,
    stickyWildsGrid: Array.from({ length: 5 }, () => Array(3).fill(false)), lastResult: null, summary: null });
  const slotMethods = {
    init() {
      const controls = this.plusBtn.parentElement;
      this.clearBtn = document.createElement('button');
      this.clearBtn.type = 'button'; this.clearBtn.className = 'btn-small';
      this.clearBtn.dataset.slotClear = ''; this.clearBtn.textContent = 'Clear bet'; controls.append(this.clearBtn);
      for (const [key, title] of [['paytable', 'Paytable'], ['breakdown', 'Last spin']]) {
        const panel = document.createElement(key === 'paytable' ? 'details' : 'section');
        panel.className = key === 'paytable' ? 'slot-paytable' : 'slot-result-breakdown';
        panel.setAttribute(`data-slot-${key}`, '');
        if (key === 'paytable') { const summary = document.createElement('summary'); summary.textContent = title; panel.append(summary); }
        const body = document.createElement('div'); panel.append(body);
        this.rootEl.querySelector('.slot-machine').append(panel);
        this[`${key}El`] = body;
      }
      this.renderPaytable();
      this.hydrateBonusState();
      for (let reel = 0; reel < this.REEL_COUNT; reel++) this.renderStrip(this.reelStrips[reel], Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
      if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
      const change = action => {
        if (this.isSpinning || this.freeSpinsRemaining > 0) return;
        FX.playClick(); this.bet = action(); this.updateUI();
      };
      this.clearBtn.addEventListener('click', () => change(() => 0));
      this.maxBtn.addEventListener('click', () => change(() => this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet)));
      this.minusBtn.addEventListener('click', () => change(() => this.betRules.decrease(this.bet)));
      this.plusBtn.addEventListener('click', () => change(() => this.bet <= 0 ? this.betRules.minimumCents / 100 : this.betRules.increase(this.bet, this.hub.balance, this.hub.player.maxBet)));
      this.spinBtn.addEventListener('click', () => this.startSpin());
      this.updateUI();
    },
    hydrateBonusState() {
      this.roundToken = (this.roundToken || 0) + 1;
      const saved = window.LocalProfiles.getCurrentSave().slotBonuses[this.rootEl.id];
      this.slotState = saved ? JSON.parse(JSON.stringify(saved)) : blankSlotState();
      this.freeSpinsRemaining = this.slotState.freeSpinsRemaining || 0;
      this.lockedStake = this.slotState.lockedStake || 0;
      this.bonusTotalWin = this.slotState.bonusTotalWin || 0;
      this.stickyWildsGrid = this.slotState.stickyWildsGrid || blankSlotState().stickyWildsGrid;
      if (this.freeSpinsRemaining > 0 && this.lockedStake > 0) {
        this.bet = this.lockedStake;
        this.setStatus('BONUS RESTORED — PRESS SPIN TO RESUME', 'status-bonus');
      }
      if (this.spinBtn && this.reelStrips.some(strip => strip.children.length)) {
        this.reelStrips.forEach((strip, reel) => this.renderStrip(strip, Array.from({ length: 3 }, (_, row) => this.freeSpinsRemaining > 0 && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol())));
        if (this.REEL_COUNT === 5) this.applyStickyWildClasses();
      }
      if (this.slotState.lastResult) this.showBreakdown(this.slotState.lastResult);
      if (this.slotState.summary?.totalWin !== undefined && !this.freeSpinsRemaining) {
        this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(this.slotState.summary.totalWin)}`, 'status-bonus');
      }
    },
    updateUI() {
      const bonus = this.freeSpinsRemaining > 0;
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
      const locked = this.isSpinning || bonus;
      this.betEl.textContent = window.SlotBetRules.format(this.bet);
      this.spinBtn.disabled = this.isSpinning || (!bonus && (this.bet <= 0 || this.bet > maximum));
      this.spinBtn.textContent = bonus ? `FREE SPIN (${this.freeSpinsRemaining} LEFT)` : 'SPIN';
      this.maxBtn.disabled = locked || maximum === 0 || this.bet === maximum;
      this.clearBtn.disabled = locked || this.bet === 0;
      this.minusBtn.disabled = locked || this.bet <= this.betRules.minimumCents / 100;
      this.plusBtn.disabled = locked || maximum === 0 || (this.bet > 0 && this.bet + this.betRules.stepCents / 100 > maximum);
      if (this.bonusHudEl) {
        this.bonusHudEl.classList.toggle('hidden-view', !bonus);
        this.bonusHudEl.classList.toggle('active-view', bonus);
        this.fsCountEl.textContent = this.freeSpinsRemaining;
        this.fsWinEl.textContent = window.SlotBetRules.format(this.bonusTotalWin);
      }
      this.hub.updateGlobalUI();
    },
    renderPaytable() {
      const note = document.createElement('p');
      note.textContent = `One displayed stake is debited for the whole spin. Each of the ${this.PAYLINES.length} winning lines pays displayed stake × its multiplier; line returns are added, not divided by the number of lines. This preserves existing payouts. Wilds substitute. Five-reel matches run left to right from reel 1.`;
      this.paytableEl.append(note);
      this.SYMBOLS.forEach(symbol => {
        const row = document.createElement('p');
        row.textContent = `${symbol.icon} ${symbol.id}: ${symbol.mult ? Object.entries(symbol.mult).map(([count, multiplier]) => `${count} matches = ${multiplier}×`).join('; ') : `3 matches = ${symbol.multiplier}×`}${symbol.isScatter ? ' anywhere; 3+ trigger 10 free spins when no spins remain' : ''}`;
        this.paytableEl.append(row);
      });
      if (this.REEL_COUNT === 5) {
        const jackpot = document.createElement('p'); jackpot.textContent = 'Five crowns on a line return the browser-local demo jackpot instead of the ordinary line/scatter total. Free spins retain the triggering stake; no new stake is charged. Wilds that land during free spins stay sticky until that bonus ends.'; this.paytableEl.append(jackpot);
      }
      const paths = document.createElement('p');
      paths.textContent = this.PAYLINES.map((line, i) => `Line ${i + 1}: ${line.map(([, row]) => ['top', 'middle', 'bottom'][row]).join(' → ')}`).join(' · ');
      this.paytableEl.append(paths);
    },
    showBreakdown(result) {
      if (!this.breakdownEl) return;
      this.breakdownEl.replaceChildren();
      const summary = document.createElement('p');
      summary.textContent = `Total stake ${window.SlotBetRules.format(result.stake)} · Total return ${window.SlotBetRules.format(result.payout)} · Net ${window.SlotBetRules.format(result.payout - result.stake)}${result.stake === 0 ? ' (free spin; locked bonus stake used for multipliers)' : ''}`;
      this.breakdownEl.append(summary);
      (result.lines || []).forEach(line => {
        const row = document.createElement('p'); row.textContent = `${line.line ? `Line ${line.line}` : 'Special return'}: ${line.symbol} · ${line.count} matched · ${window.SlotBetRules.format(line.payout)}`; this.breakdownEl.append(row);
      });
      if (!result.lines?.length) { const empty = document.createElement('p'); empty.textContent = 'No winning lines.'; this.breakdownEl.append(empty); }
    },
    async startSpin() {
      const free = this.freeSpinsRemaining > 0;
      if (window.DailyWheel?.isSpinning || (window.CasinoGames?.blackjack && !['BETTING', 'ENDED'].includes(window.CasinoGames.blackjack.gameState))) return;
      const maximum = this.betRules.getMaximum(this.hub.balance, this.hub.player.maxBet);
      if (this.isSpinning || this.hub.isSettling || (!free && (this.bet <= 0 || this.bet > maximum))) return;
      this.isSpinning = true; this.hub.isSettling = true; this.updateUI();
      const token = this.roundToken;
      const profileId = window.LocalProfiles.activeProfile.id;
      const beforeSave = window.LocalProfiles.getCurrentSave();
      const beforePlayer = this.hub.player.toProfile();
      const previous = JSON.parse(JSON.stringify(this.slotState));
      if (free) this.bet = this.lockedStake;
      const five = this.REEL_COUNT === 5;
      const grid = Array.from({ length: this.REEL_COUNT }, (_, reel) => Array.from({ length: 3 }, (_, row) => free && this.stickyWildsGrid[reel][row] ? this.SYMBOLS.find(symbol => symbol.isWild) : this.getRandomSymbol()));
      const calculated = window.SlotOutcomes.calculate(this, grid, five);
      const jackpotAmount = calculated.jackpotHit ? window.SlotBetRules.roundMoney((JackpotManager.readSharedAmount() ?? JackpotManager.currentJackpot) + (free ? 0 : this.bet * 0.015)) : 0;
      calculated.payout = calculated.jackpotHit ? jackpotAmount : calculated.lineTotal;
      if (calculated.jackpotHit) calculated.lines = [{ line: 0, symbol: 'demo jackpot (replaces ordinary return)', count: 5, payout: jackpotAmount }];
      else if (calculated.scatterCount >= 3) calculated.lines.push({ line: 0, symbol: 'scatter anywhere', count: calculated.scatterCount, payout: calculated.scatterPayout });
      if (free) previous.stickyWildsGrid = grid.map(column => column.map(symbol => symbol.isWild === true));
      const next = five ? window.SlotOutcomes.transition(previous, calculated, this.bet, free).state : { ...blankSlotState(), lastResult: { status: 'settled', stake: this.bet, payout: calculated.payout, lines: calculated.lines.map(({coordinates, ...line}) => line) } };
      const player = { ...beforePlayer, balance: window.SlotBetRules.roundMoney(beforePlayer.balance - (free ? 0 : this.bet) + calculated.payout) };
      let durable = false;
      try {
        durable = await window.LocalProfiles.saveCurrent({ player, slotBonuses: { ...beforeSave.slotBonuses, [this.rootEl.id]: next } });
      } catch (error) { console.error('Slot settlement could not be saved.', error); }
      if (!durable) {
        window.LocalProfiles.currentSave = beforeSave;
        this.hub.isSettling = false; this.isSpinning = false;
        this.setStatus('SAVE FAILED — spin not charged; bonus preserved. Check browser storage, then retry.', 'status-loss');
        this.updateUI(); return;
      }
      this.hub.player.loadProfile(player);
      this.slotState = next;
      this.freeSpinsRemaining = next.freeSpinsRemaining;
      this.lockedStake = next.lockedStake;
      this.bonusTotalWin = next.bonusTotalWin;
      this.stickyWildsGrid = next.stickyWildsGrid;
      this.hub.isSettling = false;
      if (calculated.jackpotHit) JackpotManager.setJackpot(5000);
      if (!free) { if (!calculated.jackpotHit) JackpotManager.contribute(this.bet * 0.015); window.XP.addWagerXP(this.bet); }
      window.Accomplishments?.recordGame(this.rootEl.id, { stake: free ? 0 : this.bet, payout: calculated.payout });
      window.LocalSave?.queueFileSave();
      FX.playClick(); this.clearHighlights();
      this.setStatus(free ? 'FREE SPIN…' : 'SPINNING…', 'status-spinning');
      try { await Promise.all(this.reelStrips.map((strip, index) => this.animateReel(strip, index, grid[index]))); }
      finally { this.isSpinning = false; }
      if (this.roundToken !== token || window.LocalProfiles.activeProfile.id !== profileId) return;
      this.currentGrid = grid;
      if (five) this.applyStickyWildClasses();
      calculated.lines.forEach(line => (line.coordinates || []).forEach(([reel, row]) => Array.from(this.reelStrips[reel].children).slice(-3)[row]?.classList.add('highlight')));
      this.showBreakdown(next.lastResult);
      if (next.summary?.totalWin !== undefined && !next.freeSpinsRemaining) this.setStatus(`BONUS COMPLETE — total return ${window.SlotBetRules.format(next.summary.totalWin)}`, 'status-bonus');
      else if (next.freeSpinsRemaining) this.setStatus(`${next.freeSpinsRemaining} FREE SPINS LEFT · bonus return ${window.SlotBetRules.format(next.bonusTotalWin)}`, 'status-bonus');
      else this.setStatus(calculated.payout > 0 ? `RETURN ${window.SlotBetRules.format(calculated.payout)}` : 'TRY AGAIN!', calculated.payout > 0 ? 'status-win' : 'status-loss');
      if (calculated.payout > 0) { FX.playWinSound(this.theme.sounds?.win); FX.spawnConfetti(50); }
      this.updateUI();
      // Explicit spins make recovery predictable; reload never auto-spends or replays a settled spin.
    }
  };
  Object.assign(ClassicSlotEngine.prototype, slotMethods);
  Object.assign(HighVolatilitySlotEngine.prototype, slotMethods);

  // Instantiate the two hand-authored high-stakes tables, then build catalog tables with their matching shared engine.
  // Slot rooms share reusable mechanics and are configured by the theme/template catalog.
  const ClassicSlots = new ClassicSlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('classicGold') });
  const FiveReelGame = new HighVolatilitySlotEngine(CasinoHub, { theme: window.SlotGameCatalog.getTheme('royalGems') });
  const ThemedSlotGames = window.SlotGameCatalog.games.map(game => {
    const options = { ...game, theme: game.theme };
    return game.engine === 'classic'
      ? new ClassicSlotEngine(CasinoHub, options)
      : new HighVolatilitySlotEngine(CasinoHub, options);
  });
  const SlotGames = [ClassicSlots, FiveReelGame, ...ThemedSlotGames];
  const CoinTossGame = new CoinTossEngine(CasinoHub);
  const ThreeCoinGame = new ThreeCoinToss(CasinoHub);
  const BlackjackGame = new BlackjackEngine(CasinoHub);
  window.CasinoGames = { hub: CasinoHub, slots: SlotGames, coin: CoinTossGame, threeCoin: ThreeCoinGame, blackjack: BlackjackGame };
  window.Accomplishments = new window.AccomplishmentManager(CasinoHub);

  // Initialize save controls before racing so startup overlays and linked-file state are settled predictably.
  window.LocalSave = new window.LocalSaveManager({
    hub: CasinoHub,
    jackpot: JackpotManager,
    bank: window.Bank,
    xp: window.XP,
    dailyWheel: window.DailyWheel,
    settings: window.CasinoSettings
  });
  window.canReplaceCasinoSave = () => !CasinoHub.isSettling && SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping && !window.DailyWheel.isSpinning && ['BETTING', 'ENDED'].includes(BlackjackGame.gameState) && !RaceGame?.hasPendingTicket();
  window.refreshCasinoSaveState = () => {
    SlotGames.forEach(game => { game.hydrateBonusState?.(); game.updateUI(); });
    CoinTossGame.resetForActiveProfile();
    ThreeCoinGame.resetForActiveProfile();
    BlackjackGame.updateUI();
    window.Accomplishments?.resetForActiveProfile();
  };
  await window.LocalSave.initialize();
  window.refreshCasinoSaveState();
  RaceGame = new window.RaceEngine(CasinoHub, { fx: FX, jackpot: JackpotManager, xp: window.XP });
  window.RaceGame = RaceGame;

  // Switching replaces ephemeral round memory, so permit it only when every game is safely between rounds.
  LocalProfiles.canSwitchProfile = () => (
    !CasinoHub.isSettling && CasinoHub.currentView === 'lobby' &&
    SlotGames.every(game => !game.isSpinning && !(game.freeSpinsRemaining > 0)) && !CoinTossGame.isFlipping && !ThreeCoinGame.isFlipping &&
    !window.DailyWheel.isSpinning &&
    !RaceGame.hasPendingTicket() &&
    ['BETTING', 'ENDED'].includes(BlackjackGame.gameState)
  );
  // Rebind each manager to the newly decrypted profile; the stable DOM stays while per-round memory is cleared.
  LocalProfiles.onProfileChanged = async (save, profile) => {
    await window.LocalSave.switchProfile();
    CasinoHub.player = Player.fromProfile(save.player, profile.name);
    CasinoHub.switchView('lobby');
    window.CasinoSettings.applySettings(save.settings);
    JackpotManager.loadState(10000);
    window.Bank.updateModalUI();
    window.XP.updateUI();
    window.DailyWheel.updateUI();

    SlotGames.forEach(game => {
      game.bet = game.betRules.startingBet;
      game.hydrateBonusState?.();
      game.setStatus(game.freeSpinsRemaining > 0 ? 'BONUS RESTORED — PRESS SPIN TO RESUME' : 'PRESS SPIN TO PLAY');
      game.updateUI();
    });
    CoinTossGame.resetForActiveProfile();
    ThreeCoinGame.resetForActiveProfile();
    BlackjackGame.bet = 10;
    BlackjackGame.deck = [];
    BlackjackGame.playerHand = [];
    BlackjackGame.dealerHand = [];
    BlackjackGame.dealerHidden = true;
    BlackjackGame.gameState = 'BETTING';
    BlackjackGame.playerCardsEl.innerHTML = '';
    BlackjackGame.dealerCardsEl.innerHTML = '';
    BlackjackGame.playerScoreEl.textContent = '0';
    BlackjackGame.dealerScoreEl.textContent = '0';
    BlackjackGame.setStatus('PLACE YOUR BET TO DEAL');
    BlackjackGame.updateUI();
    RaceGame.resetForActiveProfile();
    window.Accomplishments?.resetForActiveProfile();
    CasinoHub.saveState();
  };

});
