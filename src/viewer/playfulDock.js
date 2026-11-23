// src/viewer/playfulDock.js - Floating Tactile Celebration & Reaction Dock
// Gives recipients playful micro-interactions (Confetti Cannons, Heart Fountains, Sparkles, and Love Surge).

import confetti from 'canvas-confetti';
import { soundFx } from './audioSynth.js';

export function initPlayfulDock(container = document.body, data = {}) {
  // Only mount celebration reaction dock in viewer celebration mode, not builder editor mode
  if (window.isCelebrationEditorMode) return;

  // Avoid duplicate injection
  if (document.getElementById('playfulReactionDock')) return;

  const recipientName = data.recipientName || 'You';
  let celebrationCount = parseInt(localStorage.getItem('celebration_reactions_count') || '12', 10);
  let isMinimized = false;

  const dockEl = document.createElement('div');
  dockEl.id = 'playfulReactionDock';
  dockEl.className = 'playful-reaction-dock';

  dockEl.innerHTML = `
    <!-- Minimized Toggle Pill -->
    <button type="button" class="btn-reaction-toggle" id="btnReactionToggle" title="Open Celebration Reactions" aria-label="Celebration Dock">
      <span class="reaction-toggle-icon">🎉</span>
      <span class="reaction-badge-num" id="reactionCounterBadge">${celebrationCount}</span>
    </button>

    <!-- Expanded Action Cluster -->
    <div class="reaction-cluster-bar" id="reactionClusterBar">
      <button type="button" class="btn-react-item" id="btnReactConfetti" title="Fire Confetti Cannon">
        <span class="react-emoji">🎉</span>
        <span class="react-label">Popper</span>
      </button>

      <button type="button" class="btn-react-item" id="btnReactHeart" title="Spray Floating Hearts">
        <span class="react-emoji">💖</span>
        <span class="react-label">Love</span>
      </button>

      <button type="button" class="btn-react-item" id="btnReactSparkle" title="Golden Magic Shower">
        <span class="react-emoji">✨</span>
        <span class="react-label">Sparkle</span>
      </button>

      <button type="button" class="btn-react-item btn-react-surge" id="btnReactSurge" title="Hold to Send 100% Love">
        <span class="react-emoji">🔋</span>
        <span class="react-label">Charge</span>
      </button>

      <button type="button" class="btn-react-minimize" id="btnReactMinimize" title="Minimize Dock">
        ✕
      </button>
    </div>

    <!-- Surge Energy Modal / Overlay (triggered by Hold to Charge) -->
    <div class="surge-energy-overlay" id="surgeEnergyOverlay" style="display:none;">
      <div class="surge-energy-card">
        <div class="surge-orb-container" id="surgeOrb">
          <div class="surge-orb-ring ring-3"></div>
          <div class="surge-orb-ring ring-2"></div>
          <div class="surge-orb-ring ring-1"></div>
          <div class="surge-orb-core">
            <span id="surgePercentText">0%</span>
          </div>
        </div>
        <h3 class="surge-card-title">Charging Celebration Energy...</h3>
        <p class="surge-card-desc">Press and hold to power up 100% love for <strong>${recipientName}</strong>!</p>
        <button type="button" class="btn-surge-hold" id="btnSurgeHold">
          ⚡ HOLD TO CHARGE ⚡
        </button>
        <button type="button" class="btn-surge-close" id="btnSurgeClose">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(dockEl);

  const btnToggle = dockEl.querySelector('#btnReactionToggle');
  const clusterBar = dockEl.querySelector('#reactionClusterBar');
  const counterBadge = dockEl.querySelector('#reactionCounterBadge');
  const btnConfetti = dockEl.querySelector('#btnReactConfetti');
  const btnHeart = dockEl.querySelector('#btnReactHeart');
  const btnSparkle = dockEl.querySelector('#btnReactSparkle');
  const btnSurge = dockEl.querySelector('#btnReactSurge');
  const btnMinimize = dockEl.querySelector('#btnReactMinimize');

  const surgeOverlay = dockEl.querySelector('#surgeEnergyOverlay');
  const btnSurgeHold = dockEl.querySelector('#btnSurgeHold');
  const btnSurgeClose = dockEl.querySelector('#btnSurgeClose');
  const surgePercentText = dockEl.querySelector('#surgePercentText');
  const surgeOrb = dockEl.querySelector('#surgeOrb');

  function incrementCounter(amount = 1) {
    celebrationCount += amount;
    counterBadge.textContent = celebrationCount;
    localStorage.setItem('celebration_reactions_count', celebrationCount.toString());

    counterBadge.classList.add('pulse');
    setTimeout(() => counterBadge.classList.remove('pulse'), 400);
  }

  // Toggle Minimize / Expand
  btnToggle.addEventListener('click', () => {
    isMinimized = false;
    clusterBar.classList.add('visible');
    btnToggle.style.display = 'none';
    if (navigator.vibrate) navigator.vibrate(10);
    soundFx.pop(650);
  });

  btnMinimize.addEventListener('click', () => {
    isMinimized = true;
    clusterBar.classList.remove('visible');
    btnToggle.style.display = 'inline-flex';
    if (navigator.vibrate) navigator.vibrate(8);
  });

  // Confetti Cannon Action
  btnConfetti.addEventListener('click', (e) => {
    soundFx.pop(720);
    soundFx.celebrate();
    if (navigator.vibrate) navigator.vibrate([15, 30, 20]);
    incrementCounter(5);

    // Left cannon
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0.05, y: 0.95 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#22c55e']
    });

    // Right cannon
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 0.95, y: 0.95 },
      colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7', '#22c55e']
    });
  });

  // Floating Hearts Action
  btnHeart.addEventListener('click', (e) => {
    soundFx.pop(840);
    soundFx.heartbeat();
    if (navigator.vibrate) navigator.vibrate(15);
    incrementCounter(3);

    const rect = btnHeart.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top;

    const emojis = ['💖', '💕', '🥰', '🌸', '✨', '❤️'];
    for (let i = 0; i < 7; i++) {
      setTimeout(() => {
        const span = document.createElement('span');
        span.className = 'playful-flying-emoji';
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const offsetX = (Math.random() - 0.5) * 160;
        const offsetY = -Math.random() * 220 - 80;
        const rot = (Math.random() - 0.5) * 50;

        span.style.cssText = `
          position: fixed;
          left: ${originX}px;
          top: ${originY}px;
          font-size: ${Math.random() * 12 + 24}px;
          pointer-events: none;
          z-index: 999999;
          transform: translate(-50%, -50%) scale(0.85);
          transition: transform 0.95s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          opacity: 0;
        `;
        document.body.appendChild(span);

        requestAnimationFrame(() => {
          span.style.opacity = '1';
          span.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1.3) rotate(${rot}deg)`;
          setTimeout(() => {
            span.style.opacity = '0';
          }, 450);
        });

        setTimeout(() => span.remove(), 1200);
      }, i * 65);
    }
  });

  // Sparkle Stardust Action
  btnSparkle.addEventListener('click', () => {
    soundFx.sparkle();
    if (navigator.vibrate) navigator.vibrate(12);
    incrementCounter(2);

    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 0.4 },
      shapes: ['star', 'circle'],
      colors: ['#fbbf24', '#fef08a', '#ffffff', '#fed7aa'],
      gravity: 0.6,
      scalar: 1.1
    });
  });

  // Hold to Charge Energy Surge Mini-Game
  btnSurge.addEventListener('click', () => {
    surgeOverlay.style.display = 'flex';
    surgePercentText.textContent = '0%';
    surgeOrb.classList.remove('charged');
    soundFx.pop(500);
  });

  btnSurgeClose.addEventListener('click', () => {
    surgeOverlay.style.display = 'none';
  });

  let chargeProgress = 0;
  let chargeInterval = null;

  function startCharging() {
    chargeProgress = 0;
    surgeOrb.classList.add('charging');
    soundFx.pop(400);

    chargeInterval = setInterval(() => {
      chargeProgress += 2.5;
      if (chargeProgress > 100) chargeProgress = 100;

      surgePercentText.textContent = `${Math.floor(chargeProgress)}%`;
      if (navigator.vibrate && Math.floor(chargeProgress) % 15 === 0) {
        navigator.vibrate(8);
      }

      if (chargeProgress >= 100) {
        stopCharging();
        triggerSupernova();
      }
    }, 45);
  }

  function stopCharging() {
    if (chargeInterval) {
      clearInterval(chargeInterval);
      chargeInterval = null;
    }
    surgeOrb.classList.remove('charging');
  }

  function triggerSupernova() {
    surgeOrb.classList.add('charged');
    soundFx.celebrate();
    if (navigator.vibrate) navigator.vibrate([40, 60, 80, 100]);
    incrementCounter(50);

    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8', '#22c55e']
    });

    surgePercentText.textContent = 'MAX! 💖';

    setTimeout(() => {
      surgeOverlay.style.display = 'none';
    }, 1800);
  }

  btnSurgeHold.addEventListener('pointerdown', startCharging);
  btnSurgeHold.addEventListener('pointerup', stopCharging);
  btnSurgeHold.addEventListener('pointerleave', stopCharging);
}
