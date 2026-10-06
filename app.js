document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SOUND FX & PARTICLE CANVAS ENGINE
  // ==========================================
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

    playReelStop() {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.08);

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

    playWinSound() {
      this.initAudio();
      if (!this.audioCtx || this.isMuted) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
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

      this.minusBtn.addEventListener('click', () => { FX.playClick(); if (this.bet > 5) { this.bet -= 5; this.updateUI(); } });
      this.plusBtn.addEventListener('click', () => {
        FX.playClick();
        if (this.bet + 5 <= Math.min(this.hub.balance, 100)) {
          this.bet += 5;
          this.updateUI();
        }
      });
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
      if (this.gameState !== 'BETTING' || this.hub.balance < this.bet) return;

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
      this.gameState = 'ENDED';

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
      this.betEl.textContent = `$${this.bet}`;

      const isBetting = this.gameState === 'BETTING' || this.gameState === 'ENDED';
      const isPlayerTurn = this.gameState === 'PLAYER_TURN';

      if (isBetting) {
        this.dealBtn.classList.replace('hidden-view', 'active-view');
        this.hitBtn.classList.replace('active-view', 'hidden-view');
        this.standBtn.classList.replace('active-view', 'hidden-view');
        this.doubleBtn.classList.replace('active-view', 'hidden-view');

        this.dealBtn.disabled = this.hub.balance < this.bet;
        this.minusBtn.disabled = false;
        this.plusBtn.disabled = false;

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
  class DailyWheelManager {
    constructor(hubController) {
      this.hub = hubController;
      this.slices = [
        { label: '$50',   amount: 50,   color: '#e74c3c' },
        { label: '$100',  amount: 100,  color: '#3498db' },
        { label: '$250',  amount: 250,  color: '#2ecc71' },
        { label: '$500',  amount: 500,  color: '#9b59b6' },
        { label: '$150',  amount: 150,  color: '#e67e22' },
        { label: '$1,000',amount: 1000, color: '#f1c40f' },
        { label: '$75',   amount: 75,   color: '#1abc9c' },
        { label: '$300',  amount: 300,  color: '#34495e' }
      ];

      this.currentAngle = 0;
      this.isSpinning = false;
      this.lastSpinTime = 0;

      this.bindElements();
      this.loadState();
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
      if (this.isSpinning || this.getRemainingCooldown() > 0) return;

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
          this.lastSpinTime = Date.now();
          this.saveState();

          const wonSlice = this.slices[targetSliceIndex];
          this.hub.modifyBalance(wonSlice.amount);
          
          FX.playJackpotSound();
          FX.spawnConfetti(100);

          alert(`🎉 DAILY BONUS CLAIMED!\nYou won +$${wonSlice.amount.toLocaleString()} Free Chips!`);
          this.updateUI();
        }
      };

      requestAnimationFrame(animate);
    }

    getRemainingCooldown() {
      const cooldownMs = 24 * 60 * 60 * 1000;
      const elapsed = Date.now() - this.lastSpinTime;
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
      localStorage.setItem('casino_hub_wheel', this.lastSpinTime.toString());
    }

    loadState() {
      const saved = localStorage.getItem('casino_hub_wheel');
      this.lastSpinTime = saved ? parseInt(saved, 10) : 0;
    }

    resetState() {
      this.lastSpinTime = 0;
      this.saveState();
      this.updateUI();
    }
  }

  // ==========================================
  // 4. SETTINGS & THEME MANAGER
  // ==========================================
  class SettingsManager {
    constructor() {
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
      const settings = {
        volume: this.volumeSlider ? parseInt(this.volumeSlider.value, 10) : 80,
        isMuted: this.isMuted,
        theme: this.currentTheme || 'vegas'
      };
      localStorage.setItem('casino_hub_settings', JSON.stringify(settings));
    }

    loadSettings() {
      const saved = localStorage.getItem('casino_hub_settings');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const vol = parsed.volume ?? 80;
          this.isMuted = parsed.isMuted ?? false;
          const theme = parsed.theme ?? 'vegas';

          if (this.volumeSlider) this.volumeSlider.value = vol;
          if (this.volumeDisplay) this.volumeDisplay.textContent = `${vol}%`;

          FX.setVolume(vol / 100);
          FX.setMute(this.isMuted);
          this.updateMuteUI();
          this.applyTheme(theme);
        } catch (e) {
          this.applyTheme('vegas');
        }
      } else {
        this.applyTheme('vegas');
      }
    }
  }

  // ==========================================
  // 5. XP & PLAYER LEVELING ENGINE
  // ==========================================
  class XPManager {
    constructor(hubController) {
      this.hub = hubController;
      this.level = 1;
      this.xp = 0;

      this.bindElements();
      this.loadState();
      this.updateUI();
    }

    bindElements() {
      this.levelBadgeEl = document.getElementById('player-level-badge');
      this.barFillEl = document.getElementById('xp-bar-fill');
      this.barTextEl = document.getElementById('xp-bar-text');
      this.vipTagEl = document.getElementById('vip-tier-tag');
    }

    addWagerXP(wagerAmount) {
      const xpEarned = Math.max(1, Math.floor(wagerAmount * 0.5));
      this.xp += xpEarned;

      while (this.xp >= this.getRequiredXP()) {
        this.xp -= this.getRequiredXP();
        this.level++;
        this.handleLevelUp();
      }

      this.saveState();
      this.updateUI();
    }

    getRequiredXP() {
      return Math.floor(100 * Math.pow(this.level, 1.2));
    }

    getVIPTier() {
      if (this.level >= 20) return 'DIAMOND';
      if (this.level >= 15) return 'PLATINUM';
      if (this.level >= 10) return 'GOLD';
      if (this.level >= 5) return 'SILVER';
      return 'BRONZE';
    }

    handleLevelUp() {
      const levelBonus = this.level * 50;
      this.hub.modifyBalance(levelBonus);
      if (window.Bank) window.Bank.maxCreditLimit += 250;

      FX.playJackpotSound();
      FX.spawnConfetti(120);

      setTimeout(() => {
        alert(`🎉 LEVEL UP! You reached Level ${this.level} (${this.getVIPTier()})!\nAwarded +$${levelBonus} Cash Bonus! Credit Limit +$250!`);
      }, 200);
    }

    updateUI() {
      const required = this.getRequiredXP();
      const pct = Math.min(100, Math.floor((this.xp / required) * 100));

      if (this.levelBadgeEl) this.levelBadgeEl.textContent = `LVL ${this.level}`;
      if (this.barFillEl) this.barFillEl.style.width = `${pct}%`;
      if (this.barTextEl) this.barTextEl.textContent = `${this.xp} / ${required} XP`;
      if (this.vipTagEl) this.vipTagEl.textContent = this.getVIPTier();
    }

    saveState() {
      const data = { level: this.level, xp: this.xp };
      localStorage.setItem('casino_hub_xp', JSON.stringify(data));
    }

    loadState() {
      const saved = localStorage.getItem('casino_hub_xp');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          this.level = parsed.level ?? 1;
          this.xp = parsed.xp ?? 0;
        } catch (e) {
          this.level = 1;
          this.xp = 0;
        }
      }
    }

    resetState() {
      this.level = 1;
      this.xp = 0;
      this.saveState();
      this.updateUI();
    }
  }

  // ==========================================
  // 6. PROGRESSIVE JACKPOT MANAGER
  // ==========================================
  class ProgressiveJackpotManager {
    constructor(initialAmount = 10000) {
      this.jackpotEl = document.getElementById('global-jackpot');
      this.loadState(initialAmount);
    }

    contribute(amount) {
      this.currentJackpot += amount;
      this.saveState();
      this.updateDisplay();
    }

    claimJackpot() {
      const awarded = this.currentJackpot;
      this.currentJackpot = 5000;
      this.saveState();
      this.updateDisplay();
      return awarded;
    }

    saveState() {
      localStorage.setItem('casino_hub_jackpot', this.currentJackpot.toString());
    }

    loadState(defaultAmount) {
      const saved = localStorage.getItem('casino_hub_jackpot');
      this.currentJackpot = saved ? parseFloat(saved) : defaultAmount;
      this.updateDisplay();
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

  // ==========================================
  // 7. BANK & LOAN MANAGER
  // ==========================================
  class BankManager {
    constructor(hubController) {
      this.hub = hubController;
      this.interestRate = 0.10;
      this.maxCreditLimit = 2000;
      
      this.bindElements();
      this.loadState();
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
      this.repayAllBtn?.addEventListener('click', () => this.repayLoan(this.currentDebt));
    }

    takeLoan(amount) {
      if (this.currentDebt + amount > this.maxCreditLimit) {
        alert(`Loan request exceeds maximum credit limit of $${this.maxCreditLimit.toLocaleString()}!`);
        return;
      }

      const totalCharge = amount * (1 + this.interestRate);
      this.currentDebt += totalCharge;
      this.hub.modifyBalance(amount);
      
      FX.playWinSound();
      this.saveState();
      this.updateModalUI();
    }

    repayLoan(amount) {
      if (this.currentDebt <= 0) {
        alert('You currently have no outstanding debt!');
        return;
      }

      const payAmount = Math.min(amount, this.currentDebt, this.hub.balance);

      if (payAmount <= 0) {
        alert('Insufficient wallet funds to repay loan!');
        return;
      }

      this.currentDebt -= payAmount;
      this.hub.modifyBalance(-payAmount);

      FX.playClick();
      this.saveState();
      this.updateModalUI();
    }

    saveState() {
      localStorage.setItem('casino_hub_debt', this.currentDebt.toString());
    }

    loadState() {
      const saved = localStorage.getItem('casino_hub_debt');
      this.currentDebt = saved ? parseFloat(saved) : 0;
    }

    resetState() {
      this.currentDebt = 0;
      this.saveState();
      this.updateModalUI();
    }

    updateModalUI() {
      if (this.debtDisplayEl) {
        this.debtDisplayEl.textContent = `$${this.currentDebt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
      if (this.creditDisplayEl) {
        this.creditDisplayEl.textContent = `$${this.maxCreditLimit.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }
  }

  // ==========================================
  // 8. CENTRAL CASINO HUB CONTROLLER
  // ==========================================
  class CasinoHubController {
    constructor(startingBalance = 1000) {
      this.globalBalanceEl = document.getElementById('global-balance');
      this.lobbyView = document.getElementById('view-lobby');
      this.slotClassicView = document.getElementById('view-classic-slots');
      this.slot5ReelView = document.getElementById('view-5reel-slots');
      this.coinTossView = document.getElementById('view-coin-toss');
      this.blackjackView = document.getElementById('view-blackjack');
      
      this.loadState(startingBalance);
      this.initEventListeners();
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
        if (confirm('Are you sure you want to reset your casino balance, loans, XP, and daily wheel?')) {
          this.resetState();
          JackpotManager.resetState();
          window.Bank.resetState();
          window.XP.resetState();
          window.DailyWheel.resetState();
          alert('Casino state has been reset to defaults!');
        }
      });
    }

    switchView(viewName) {
      this.currentView = viewName;
      this.lobbyView.classList.replace('active-view', 'hidden-view');
      this.slotClassicView.classList.replace('active-view', 'hidden-view');
      this.slot5ReelView.classList.replace('active-view', 'hidden-view');
      this.coinTossView.classList.replace('active-view', 'hidden-view');
      this.blackjackView.classList.replace('active-view', 'hidden-view');

      if (viewName === 'lobby') {
        this.lobbyView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'classic-slots') {
        this.slotClassicView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === '5reel-slots') {
        this.slot5ReelView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'coin-toss') {
        this.coinTossView.classList.replace('hidden-view', 'active-view');
      } else if (viewName === 'blackjack') {
        this.blackjackView.classList.replace('hidden-view', 'active-view');
      }
    }

    saveState() {
      const data = { balance: this.balance };
      localStorage.setItem('casino_hub_player', JSON.stringify(data));
    }

    loadState(defaultBalance) {
      const saved = localStorage.getItem('casino_hub_player');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          this.balance = data.balance ?? defaultBalance;
        } catch (e) {
          this.balance = defaultBalance;
        }
      } else {
        this.balance = defaultBalance;
      }
    }

    resetState() {
      this.balance = 1000;
      this.saveState();
      this.updateGlobalUI();
    }

    updateGlobalUI() {
      if (this.globalBalanceEl) {
        this.globalBalanceEl.textContent = `$${this.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      }
    }

    modifyBalance(amount) {
      this.balance += amount;
      this.saveState();
      this.updateGlobalUI();
    }
  }

  const CasinoHub = new CasinoHubController(1000);
  window.Bank = new BankManager(CasinoHub);
  window.XP = new XPManager(CasinoHub);
  window.DailyWheel = new DailyWheelManager(CasinoHub);
  window.CasinoSettings = new SettingsManager();

  // ==========================================
  // 9. COIN TOSS TABLE ENGINE
  // ==========================================
  class CoinTossEngine {
    constructor(hubController) {
      this.hub = hubController;
      this.bet = 10;
      this.selectedChoice = 'HEADS';
      this.isFlipping = false;

      this.bindElements();
      if (this.flipBtn) this.init();
    }

    bindElements() {
      this.betEl = document.getElementById('bet-coin-display');
      this.statusEl = document.getElementById('status-coin');
      this.flipBtn = document.getElementById('btn-coin-flip');
      this.maxBtn = document.getElementById('btn-coin-max');
      this.minusBtn = document.getElementById('btn-coin-minus');
      this.plusBtn = document.getElementById('btn-coin-plus');
      this.coinEl = document.getElementById('coin-element');
      this.headsBtn = document.getElementById('btn-pick-heads');
      this.tailsBtn = document.getElementById('btn-pick-tails');
    }

    init() {
      this.updateUI();

      this.headsBtn.addEventListener('click', () => {
        if (this.isFlipping) return;
        FX.playClick();
        this.selectedChoice = 'HEADS';
        this.headsBtn.classList.add('active-choice');
        this.tailsBtn.classList.remove('active-choice');
      });

      this.tailsBtn.addEventListener('click', () => {
        if (this.isFlipping) return;
        FX.playClick();
        this.selectedChoice = 'TAILS';
        this.tailsBtn.classList.add('active-choice');
        this.headsBtn.classList.remove('active-choice');
      });

      this.flipBtn.addEventListener('click', () => this.startFlip());
      this.maxBtn.addEventListener('click', () => { FX.playClick(); this.bet = 100; this.updateUI(); });
      this.minusBtn.addEventListener('click', () => { FX.playClick(); if (this.bet > 5) { this.bet -= 5; this.updateUI(); } });
      this.plusBtn.addEventListener('click', () => {
        FX.playClick();
        if (this.bet + 5 <= Math.min(this.hub.balance, 100)) {
          this.bet += 5;
          this.updateUI();
        }
      });
    }

    updateUI() {
      this.betEl.textContent = `$${this.bet}`;
      this.flipBtn.disabled = this.isFlipping || this.hub.balance < this.bet;
      this.maxBtn.disabled = this.isFlipping;
      this.minusBtn.disabled = this.isFlipping;
      this.plusBtn.disabled = this.isFlipping;
      this.hub.updateGlobalUI();
    }

    setStatus(text, statusClass) {
      this.statusEl.textContent = text;
      this.statusEl.className = 'status-banner';
      if (statusClass) this.statusEl.classList.add(statusClass);
    }

    startFlip() {
      if (this.isFlipping || this.hub.balance < this.bet) return;

      FX.playClick();
      FX.playCoinFlipSound();
      this.isFlipping = true;

      this.hub.modifyBalance(-this.bet);
      JackpotManager.contribute(this.bet * 0.015);
      window.XP.addWagerXP(this.bet);

      this.setStatus('FLIPPING COIN...', 'status-spinning');
      this.updateUI();

      const isHeads = Math.random() >= 0.5;
      const outcome = isHeads ? 'HEADS' : 'TAILS';

      this.coinEl.classList.remove('animate-heads', 'animate-tails');
      this.coinEl.offsetHeight;

      this.coinEl.classList.add(isHeads ? 'animate-heads' : 'animate-tails');

      this.coinEl.addEventListener('animationend', () => {
        this.coinEl.style.transform = isHeads ? 'rotateY(0deg)' : 'rotateY(180deg)';
        this.coinEl.classList.remove('animate-heads', 'animate-tails');
        
        this.evaluateFlip(outcome);
        this.isFlipping = false;
        this.updateUI();
      }, { once: true });
    }

    evaluateFlip(outcome) {
      if (this.selectedChoice === outcome) {
        const winAmount = this.bet * 2;
        this.hub.modifyBalance(winAmount);
        FX.playWinSound();
        FX.spawnConfetti(40);
        this.setStatus(`LANDED ON ${outcome}! WIN +$${winAmount}`, 'status-win');
      } else {
        this.setStatus(`LANDED ON ${outcome}. TRY AGAIN!`, 'status-loss');
      }
    }
  }

  // ==========================================
  // 10. CLASSIC 3-REEL SLOT ENGINE
  // ==========================================
  class ClassicSlotEngine {
    constructor(hubController) {
      this.hub = hubController;
      this.SYMBOL_SIZE = 90;
      this.REEL_COUNT = 3;
      this.VISIBLE_ROWS = 3;

      this.SYMBOLS = [
        { id: 'cherry', icon: '🍒', multiplier: 3,   weight: 35 },
        { id: 'lemon',  icon: '🍋', multiplier: 5,   weight: 25.5 },
        { id: 'orange', icon: '🍊', multiplier: 10,  weight: 20 },
        { id: 'bell',   icon: '🔔', multiplier: 30,  weight: 10 },
        { id: 'wild',   icon: '🃏', multiplier: 50,  weight: 6.5 },
        { id: 'seven',  icon: '7️⃣', multiplier: 100, weight: 3 }
      ];

      this.PAYLINES = [
        [[0,0], [1,0], [2,0]],
        [[0,1], [1,1], [2,1]],
        [[0,2], [1,2], [2,2]],
        [[0,0], [1,1], [2,2]],
        [[0,2], [1,1], [2,0]]
      ];

      this.bet = 10;
      this.isSpinning = false;
      this.currentGrid = [];

      this.bindElements();
      if (this.spinBtn) this.init();
    }

    bindElements() {
      this.betEl = document.getElementById('bet-display');
      this.statusEl = document.getElementById('status');
      this.spinBtn = document.getElementById('btn-spin');
      this.maxBtn = document.getElementById('btn-max');
      this.minusBtn = document.getElementById('btn-minus');
      this.plusBtn = document.getElementById('btn-plus');
      this.reelStrips = [
        document.querySelector('#reel-0 .strip'),
        document.querySelector('#reel-1 .strip'),
        document.querySelector('#reel-2 .strip')
      ];
    }

    init() {
      this.updateUI();

      for (let r = 0; r < this.REEL_COUNT; r++) {
        const initial = [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
        this.renderStrip(this.reelStrips[r], initial);
      }

      this.spinBtn.addEventListener('click', () => this.startSpin());
      this.maxBtn.addEventListener('click', () => { FX.playClick(); this.bet = 100; this.updateUI(); });
      this.minusBtn.addEventListener('click', () => { FX.playClick(); if (this.bet > 5) { this.bet -= 5; this.updateUI(); } });
      this.plusBtn.addEventListener('click', () => {
        FX.playClick();
        if (this.bet + 5 <= Math.min(this.hub.balance, 100)) {
          this.bet += 5;
          this.updateUI();
        }
      });
    }

    updateUI() {
      this.betEl.textContent = `$${this.bet}`;
      this.spinBtn.disabled = this.isSpinning || this.hub.balance < this.bet;
      this.maxBtn.disabled = this.isSpinning;
      this.minusBtn.disabled = this.isSpinning;
      this.plusBtn.disabled = this.isSpinning;
      this.hub.updateGlobalUI();
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
        div.textContent = sym.icon;
        stripEl.appendChild(div);
      });
    }

    async startSpin() {
      if (this.isSpinning || this.hub.balance < this.bet) return;

      FX.playClick();
      this.clearHighlights();
      this.isSpinning = true;
      this.hub.modifyBalance(-this.bet);
      JackpotManager.contribute(this.bet * 0.015);
      window.XP.addWagerXP(this.bet);

      this.setStatus('SPINNING...', 'status-spinning');
      this.updateUI();

      const finalGrid = [
        [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()],
        [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()],
        [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()]
      ];

      const spinPromises = this.reelStrips.map((strip, idx) => {
        return this.animateReel(strip, idx, finalGrid[idx]);
      });

      await Promise.all(spinPromises);

      this.currentGrid = finalGrid;
      this.evaluateResults();
      this.isSpinning = false;
      this.updateUI();
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
          FX.playReelStop();
          resolve();
        }, duration);
      });
    }

    clearHighlights() {
      document.querySelectorAll('#view-classic-slots .symbol.highlight').forEach(el => el.classList.remove('highlight'));
    }

    evaluateResults() {
      let totalWin = 0;

      this.PAYLINES.forEach(line => {
        const [p1, p2, p3] = line;
        const sym1 = this.currentGrid[p1[0]][p1[1]];
        const sym2 = this.currentGrid[p2[0]][p2[1]];
        const sym3 = this.currentGrid[p3[0]][p3[1]];

        const nonWilds = [sym1, sym2, sym3].filter(s => s.id !== 'wild');
        const matchedSymbol = nonWilds.length === 0 
          ? this.SYMBOLS.find(s => s.id === 'wild') 
          : ([sym1, sym2, sym3].every(s => s.id === nonWilds[0].id || s.id === 'wild') ? nonWilds[0] : null);

        if (matchedSymbol) {
          totalWin += this.bet * matchedSymbol.multiplier;

          line.forEach(([reelIdx, rowIdx]) => {
            const reelEl = this.reelStrips[reelIdx];
            const visibleSymbols = Array.from(reelEl.children).slice(-this.VISIBLE_ROWS);
            if (visibleSymbols[rowIdx]) visibleSymbols[rowIdx].classList.add('highlight');
          });
        }
      });

      if (totalWin > 0) {
        this.hub.modifyBalance(totalWin);
        FX.playWinSound();
        FX.spawnConfetti(50);
        this.setStatus(`WINNER! +$${totalWin.toLocaleString()}`, 'status-win');
      } else {
        this.setStatus(this.hub.balance < this.bet ? 'NO FUNDS AVAILABLE' : 'TRY AGAIN!', 'status-loss');
      }
    }
  }

  // ==========================================
  // 11. HIGH VOLATILITY 5-REEL ENGINE
  // ==========================================
  class HighVolatilitySlotEngine {
    constructor(hubController) {
      this.hub = hubController;
      
      this.SYMBOL_SIZE = 70;
      this.REEL_COUNT = 5;
      this.VISIBLE_ROWS = 3;

      this.SYMBOLS = [
        { id: 'ten',     icon: '🔟', mult: { 3: 2, 4: 5, 5: 10 },    weight: 30 },
        { id: 'jack',    icon: '🇯',  mult: { 3: 2, 4: 5, 5: 12 },    weight: 25 },
        { id: 'queen',   icon: '🇶',  mult: { 3: 3, 4: 8, 5: 15 },    weight: 20 },
        { id: 'king',    icon: '🇰',  mult: { 3: 4, 4: 10, 5: 20 },   weight: 15 },
        { id: 'ace',     icon: '🇦',  mult: { 3: 5, 4: 12, 5: 25 },   weight: 12 },
        { id: 'ruby',    icon: '💎', mult: { 3: 10, 4: 25, 5: 75 },  weight: 8 },
        { id: 'crown',   icon: '👑', mult: { 3: 20, 4: 50, 5: 150 }, weight: 4 },
        { id: 'wild',    icon: '🃏', mult: { 3: 30, 4: 100, 5: 300 },weight: 3, isWild: true },
        { id: 'scatter', icon: '⭐', mult: { 3: 5, 4: 20, 5: 100 },  weight: 3, isScatter: true }
      ];

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

      this.bet = 10;
      this.isSpinning = false;
      this.currentGrid = [];

      this.freeSpinsRemaining = 0;
      this.bonusTotalWin = 0;
      this.stickyWildsGrid = Array(5).fill(null).map(() => Array(3).fill(false));

      this.bindElements();
      if (this.spinBtn) this.init();
    }

    bindElements() {
      this.betEl = document.getElementById('bet5-display');
      this.statusEl = document.getElementById('status-5reel');
      this.spinBtn = document.getElementById('btn5-spin');
      this.maxBtn = document.getElementById('btn5-max');
      this.minusBtn = document.getElementById('btn5-minus');
      this.plusBtn = document.getElementById('btn5-plus');
      this.bonusHudEl = document.getElementById('bonus-hud-5reel');
      this.fsCountEl = document.getElementById('fs-remaining-count');
      this.fsWinEl = document.getElementById('fs-total-win');

      this.reelStrips = [
        document.querySelector('#reel5-0 .strip'),
        document.querySelector('#reel5-1 .strip'),
        document.querySelector('#reel5-2 .strip'),
        document.querySelector('#reel5-3 .strip'),
        document.querySelector('#reel5-4 .strip')
      ];
    }

    init() {
      this.updateUI();

      for (let r = 0; r < this.REEL_COUNT; r++) {
        const initial = [this.getRandomSymbol(), this.getRandomSymbol(), this.getRandomSymbol()];
        this.renderStrip(this.reelStrips[r], initial);
      }

      this.spinBtn.addEventListener('click', () => this.startSpin());
      this.maxBtn.addEventListener('click', () => { FX.playClick(); if (this.freeSpinsRemaining === 0) { this.bet = 100; this.updateUI(); } });
      this.minusBtn.addEventListener('click', () => { FX.playClick(); if (this.freeSpinsRemaining === 0 && this.bet > 5) { this.bet -= 5; this.updateUI(); } });
      this.plusBtn.addEventListener('click', () => {
        FX.playClick();
        if (this.freeSpinsRemaining === 0 && this.bet + 5 <= Math.min(this.hub.balance, 100)) {
          this.bet += 5;
          this.updateUI();
        }
      });
    }

    updateUI() {
      this.betEl.textContent = `$${this.bet}`;
      
      const inFreeSpins = this.freeSpinsRemaining > 0;
      this.spinBtn.disabled = this.isSpinning || (!inFreeSpins && this.hub.balance < this.bet);
      this.maxBtn.disabled = this.isSpinning || inFreeSpins;
      this.minusBtn.disabled = this.isSpinning || inFreeSpins;
      this.plusBtn.disabled = this.isSpinning || inFreeSpins;

      if (inFreeSpins) {
        this.bonusHudEl.classList.replace('hidden-view', 'active-view');
        this.fsCountEl.textContent = this.freeSpinsRemaining;
        this.fsWinEl.textContent = `$${this.bonusTotalWin.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
      } else {
        this.bonusHudEl.classList.replace('active-view', 'hidden-view');
      }

      this.hub.updateGlobalUI();
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
        div.textContent = sym.icon;
        stripEl.appendChild(div);
      });
    }

    async startSpin() {
      if (this.isSpinning) return;

      const isFreeSpin = this.freeSpinsRemaining > 0;
      if (!isFreeSpin && this.hub.balance < this.bet) return;

      FX.playClick();
      this.clearHighlights();
      this.isSpinning = true;

      if (isFreeSpin) {
        this.freeSpinsRemaining--;
        this.setStatus(`FREE SPIN (${this.freeSpinsRemaining} LEFT)`, 'status-bonus');
      } else {
        this.hub.modifyBalance(-this.bet);
        JackpotManager.contribute(this.bet * 0.015);
        window.XP.addWagerXP(this.bet);
        this.setStatus('SPINNING REELS...', 'status-spinning');
      }

      this.updateUI();

      const finalGrid = [];
      const wildSym = this.SYMBOLS.find(s => s.isWild);

      for (let r = 0; r < this.REEL_COUNT; r++) {
        const reelSymbols = [];
        for (let row = 0; row < this.VISIBLE_ROWS; row++) {
          if (isFreeSpin && this.stickyWildsGrid[r][row]) {
            reelSymbols.push(wildSym);
          } else {
            reelSymbols.push(this.getRandomSymbol());
          }
        }
        finalGrid.push(reelSymbols);
      }

      const spinPromises = this.reelStrips.map((strip, idx) => {
        return this.animateReel(strip, idx, finalGrid[idx]);
      });

      await Promise.all(spinPromises);

      this.currentGrid = finalGrid;

      if (isFreeSpin) {
        for (let r = 0; r < this.REEL_COUNT; r++) {
          for (let row = 0; row < this.VISIBLE_ROWS; row++) {
            if (this.currentGrid[r][row].isWild) {
              this.stickyWildsGrid[r][row] = true;
            }
          }
        }
      }

      this.applyStickyWildClasses();
      this.evaluateResults();

      this.isSpinning = false;
      this.updateUI();

      if (this.freeSpinsRemaining > 0) {
        setTimeout(() => this.startSpin(), 800);
      }
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
          FX.playReelStop();
          resolve();
        }, duration);
      });
    }

    clearHighlights() {
      document.querySelectorAll('#view-5reel-slots .symbol.highlight').forEach(el => el.classList.remove('highlight'));
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

    evaluateResults() {
      let spinWin = 0;
      let jackpotHit = false;

      // 1. Line Evaluation
      this.PAYLINES.forEach(line => {
        const lineSymbols = line.map(([reel, row]) => this.currentGrid[reel][row]);
        const firstNonWild = lineSymbols.find(s => !s.isWild && !s.isScatter);
        const targetSymbol = firstNonWild || this.SYMBOLS.find(s => s.isWild);

        if (targetSymbol.isScatter) return;

        let matchCount = 0;
        for (let i = 0; i < lineSymbols.length; i++) {
          const sym = lineSymbols[i];
          if (sym.id === targetSymbol.id || sym.isWild) {
            matchCount++;
          } else {
            break;
          }
        }

        if (matchCount === 5 && targetSymbol.id === 'crown') {
          jackpotHit = true;
        }

        if (matchCount >= 3 && targetSymbol.mult[matchCount]) {
          const payout = this.bet * targetSymbol.mult[matchCount];
          spinWin += payout;

          for (let i = 0; i < matchCount; i++) {
            const [reelIdx, rowIdx] = line[i];
            const reelEl = this.reelStrips[reelIdx];
            const visibleSymbols = Array.from(reelEl.children).slice(-this.VISIBLE_ROWS);
            if (visibleSymbols[rowIdx]) visibleSymbols[rowIdx].classList.add('highlight');
          }
        }
      });

      // 2. Scatter & Bonus Trigger Evaluation
      let scatterCount = 0;
      this.currentGrid.forEach(reel => {
        reel.forEach(sym => {
          if (sym.isScatter) scatterCount++;
        });
      });

      if (scatterCount >= 3) {
        const scatterSym = this.SYMBOLS.find(s => s.isScatter);
        spinWin += this.bet * scatterSym.mult[Math.min(scatterCount, 5)];

        if (this.freeSpinsRemaining === 0) {
          this.freeSpinsRemaining = 10;
          this.bonusTotalWin = 0;
          this.stickyWildsGrid = Array(5).fill(null).map(() => Array(3).fill(false));
          this.setStatus('🎉 10 FREE SPINS TRIGGERED!', 'status-bonus');
          FX.playWinSound();
          FX.spawnConfetti(60);
        }
      }

      // 3. Process Jackpot / Standard Payouts
      if (jackpotHit) {
        const jackpotPayout = JackpotManager.claimJackpot();
        this.hub.modifyBalance(jackpotPayout);
        FX.playJackpotSound();
        FX.spawnConfetti(200);
        this.setStatus(`🚨 MEGA JACKPOT WIN! +$${jackpotPayout.toLocaleString()}`, 'status-jackpot');
      } else if (spinWin > 0) {
        this.hub.modifyBalance(spinWin);
        FX.playWinSound();
        FX.spawnConfetti(40);

        if (this.freeSpinsRemaining > 0 || this.bonusTotalWin > 0) {
          this.bonusTotalWin += spinWin;
        }

        this.setStatus(`WIN! +$${spinWin.toLocaleString()}`, 'status-win');
      } else if (this.freeSpinsRemaining === 0 && this.bonusTotalWin === 0) {
        this.setStatus(this.hub.balance < this.bet ? 'OUT OF FUNDS' : 'TRY AGAIN!', 'status-loss');
      }
    }
  }

  // Instantiation
  const ClassicSlots = new ClassicSlotEngine(CasinoHub);
  const FiveReelGame = new HighVolatilitySlotEngine(CasinoHub);
  const CoinTossGame = new CoinTossEngine(CasinoHub);
  const BlackjackGame = new BlackjackEngine(CasinoHub);



});
