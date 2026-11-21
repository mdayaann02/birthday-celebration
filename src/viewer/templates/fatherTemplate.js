// src/viewer/templates/fatherTemplate.js - Father (Papa) Celebration Template

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderFatherTemplate(container, data) {
  const polaroids = data.polaroids || [
    { title: "Quiet Strength 🛡️", image: "/images/sunset.jpg", note: "Working through sleepless days so our future would shine bright." },
    { title: "Life's Compass 🧭", image: "/images/always_you.jpg", note: "Teaching us integrity, honor, and how to stand tall in any storm." },
    { title: "My First Hero 🌟", image: "/images/dream_girl.jpg", note: "No cape, no armor, just a father who gave us everything." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="dadPlayerSlot"></div>

    <div class="fam-page-viewport father-viewport">
      <!-- Constellation Stars Canvas -->
      <canvas id="dadStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge blue-gold-badge">TO MY FIRST HERO & GREATEST SHIELD 🌟🛡️</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My First Hero, My Father 🌟'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "A father's love is quiet, yet it moves mountains. Thank you for being my rock and greatest inspiration."}</p>
        
        <!-- Trophy Celebration Button -->
        <button class="btn-fam-action btn-trophy-dad" id="btnAwardTrophy">
          🏆 Present #1 Best Dad Trophy 🌟
        </button>
        <div id="trophyFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- 3D Gold Trophy Display -->
      <section class="fam-section">
        <div class="dad-trophy-card" id="dadTrophyCard">
          <div class="trophy-glow"></div>
          <div class="trophy-icon">🏆</div>
          <h3 class="trophy-title">WORLDWIDE BEST DAD AWARD</h3>
          <p class="trophy-sub">Officially certified for endless patience, hard work, and unconditional guidance.</p>
          <div class="trophy-badge">CERTIFIED #1 HERO</div>
        </div>
      </section>

      <!-- Pillars of Papa's Wisdom -->
      <section class="fam-section">
        <h2 class="fam-section-title">🧭 Pillars of Papa's Wisdom</h2>
        <p class="fam-section-sub">Lessons that built the foundation of our character</p>

        <div class="superpowers-grid">
          <div class="superpower-card dad-card">
            <span class="sp-icon">🛡️</span>
            <h3>Unspoken Protection</h3>
            <p>Standing tall in every crisis, absorbing the burdens of the world so his family could rest in peace.</p>
          </div>
          <div class="superpower-card dad-card">
            <span class="sp-icon">🔨</span>
            <h3>The Work Ethic of a Giant</h3>
            <p>Never asking for praise, waking up before the sunrise, and dedicating his entire life for our dreams.</p>
          </div>
          <div class="superpower-card dad-card">
            <span class="sp-icon">🧭</span>
            <h3>The Moral Compass</h3>
            <p>Showing that true greatness is never about noise, but about honesty, humility, and keeping one's word.</p>
          </div>
          <div class="superpower-card dad-card">
            <span class="sp-icon">🤝</span>
            <h3>The Gentle Rock</h3>
            <p>Just one firm handshake or silent pat on the shoulder that says: 'I believe in you, keep going.'</p>
          </div>
        </div>
      </section>

      <!-- Polaroid Memory Album -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Unforgettable Memories With Papa</h2>
        <p class="fam-section-sub">Memories of life lessons, adventures, and quiet triumphs</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card dad-pol-card">
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3D Wax-Seal Respect Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter of Gratitude & Respect</h2>
        <p class="fam-section-sub">Tap the wax seal to read words rarely spoken out loud</p>

        <div class="wax-envelope-wrap dad-envelope" id="dadEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="dadFlap"></div>

          <button class="wax-seal-button dad-seal" id="dadWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem">
              <span style="font-size:22px;">🌟</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="dadLetterModal">
        <div class="blossom-modal-card dad-modal">
          <button class="modal-close-btn" id="btnCloseDadLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">To My Father, My Guide 🌟</h3>
            <p class="modal-card-sub">With highest honor and love</p>
          </div>
          <div class="modal-card-body" id="dadTypewriterBody">
            <span id="typedDadText"></span><span class="typing-cursor">|</span>
          </div>
          <div class="modal-card-footer">
            <button class="btn-fam-action btn-trophy-dad" id="btnShareDad">💌 Share with Papa</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init Audio Player
  initMusicPlayer(container.querySelector('#dadPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "FOR MY HERO",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    }
  });

  // Constellation Star Canvas
  const canvas = container.querySelector('#dadStarCanvas');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const stars = [];
  for (let i = 0; i < 45; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      alpha: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2
    });
  }

  function renderStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of stars) {
      s.phase += 0.02;
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(251, 191, 36, ${s.alpha * (0.6 + 0.4 * Math.sin(s.phase))})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#fbbf24';
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(renderStars);
  }
  renderStars();

  // Trophy Button & Confetti
  const btnAward = container.querySelector('#btnAwardTrophy');
  const trophyFeedback = container.querySelector('#trophyFeedback');
  const trophyCard = container.querySelector('#dadTrophyCard');

  btnAward.addEventListener('click', () => {
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#3b82f6', '#ffffff', '#60a5fa']
    });
    trophyCard.classList.add('glow-pulse');
    trophyFeedback.innerHTML = "🏆 Proudly awarded to Papa: The undisputed champion of our family! 🌟";
    trophyFeedback.style.opacity = '1';
  });

  // Letter Envelope & Typewriter
  const envelope = container.querySelector('#dadEnvelope');
  const flap = container.querySelector('#dadFlap');
  const waxSeal = container.querySelector('#dadWaxSeal');
  const modal = container.querySelector('#dadLetterModal');
  const closeBtn = container.querySelector('#btnCloseDadLetter');
  const typedEl = container.querySelector('#typedDadText');

  function openLetter() {
    waxSeal.classList.add('cracked');
    flap.classList.add('open');
    setTimeout(() => {
      modal.classList.add('show');
      typewriter(data.letter || "");
    }, 450);
  }

  function typewriter(text) {
    typedEl.innerHTML = "";
    let i = 0;
    function type() {
      if (i < text.length) {
        const c = text.charAt(i);
        typedEl.innerHTML += c === '\n' ? '<br/>' : c;
        i++;
        setTimeout(type, 22);
      }
    }
    type();
  }

  envelope.addEventListener('click', openLetter);
  closeBtn.addEventListener('click', () => modal.classList.remove('show'));

  container.querySelector('#btnShareDad')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copied! Send it directly to Papa! 🌟");
  });
}
