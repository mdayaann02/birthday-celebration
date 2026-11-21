// src/viewer/templates/brotherTemplate.js - Brother (Bhai) Celebration Template

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBrotherTemplate(container, data) {
  const polaroids = data.polaroids || [
    { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
    { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
    { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="broPlayerSlot"></div>

    <div class="fam-page-viewport brother-viewport">
      <!-- Cyber Neon Particles Canvas -->
      <canvas id="broStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge cyan-badge">THE LIVING LEGEND & PARTNER IN CHAOS 🤜🤛🔥</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Brother in Chaos, The Legend 🤜🤛🔥'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "From wrestling over the TV remote to standing shoulder-to-shoulder through everything. Brotherhood forever!"}</p>
        
        <!-- Interactive Fist Bump Button -->
        <button class="btn-fam-action btn-fistbump" id="btnFistBump">
          🤜🤛 FIST BUMP FOR LIFE! 🔥
        </button>
        <div id="fistBumpFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- The Sacred Bhai Code -->
      <section class="fam-section">
        <h2 class="fam-section-title">⚡ The Sacred Bhai Code</h2>
        <p class="fam-section-sub">Unbreakable commandments written in stone</p>

        <div class="superpowers-grid">
          <div class="superpower-card bro-card">
            <span class="sp-icon">🎮</span>
            <h3>Player 1 & Player 2</h3>
            <p>Fighting over the controller, refusing to pass the turn, and screaming 'it lagged' when losing.</p>
          </div>
          <div class="superpower-card bro-card">
            <span class="sp-icon">🤝</span>
            <h3>The Ultimate Wingman</h3>
            <p>Covering up seamlessly with zero hesitation whenever questions are asked at home.</p>
          </div>
          <div class="superpower-card bro-card">
            <span class="sp-icon">🛡️</span>
            <h3>Unconditional Backup</h3>
            <p>No matter what time it is, one emergency phone call and I will be there before you finish the sentence.</p>
          </div>
          <div class="superpower-card bro-card">
            <span class="sp-icon">💸</span>
            <h3>The Borrowing Paradox</h3>
            <p>'Bro, can I wear your hoodie for just 5 minutes?' (Proceeds to never see that hoodie ever again).</p>
          </div>
        </div>
      </section>

      <!-- Polaroid Hall of Fame -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Brotherhood Hall of Fame</h2>
        <p class="fam-section-sub">Moments that prove we are an unstoppable chaotic force</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card bro-pol-card">
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3D Wax-Seal Brother Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 An Honest Word To My Brother</h2>
        <p class="fam-section-sub">Tap the seal to open a message straight from the heart</p>

        <div class="wax-envelope-wrap bro-envelope" id="broEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="broFlap"></div>

          <button class="wax-seal-button bro-seal" id="broWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem">
              <span style="font-size:22px;">🤜</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="broLetterModal">
        <div class="blossom-modal-card bro-modal">
          <button class="modal-close-btn" id="btnCloseBroLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">To My Brother, The Legend 🔥</h3>
            <p class="modal-card-sub">Brotherhood that lasts a lifetime</p>
          </div>
          <div class="modal-card-body" id="broTypewriterBody">
            <span id="typedBroText"></span><span class="typing-cursor">|</span>
          </div>
          <div class="modal-card-footer">
            <button class="btn-fam-action btn-fistbump" id="btnShareBro">💌 Send to Bhai</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init Audio Player
  initMusicPlayer(container.querySelector('#broPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "BROTHERHOOD CODE",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    }
  });

  // Cyber Neon Particles Canvas
  const canvas = container.querySelector('#broStarCanvas');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = [];
  for (let i = 0; i < 40; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      dy: -(Math.random() * 1.1 + 0.4),
      dx: (Math.random() - 0.5) * 0.4
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();
      ctx.restore();

      p.y += p.dy;
      p.x += p.dx;
      if (p.y < -10) p.y = canvas.height + 10;
    }
    requestAnimationFrame(renderParticles);
  }
  renderParticles();

  // Fist Bump Rumble Blast
  const btnFist = container.querySelector('#btnFistBump');
  const feedback = container.querySelector('#fistBumpFeedback');
  btnFist.addEventListener('click', () => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#38bdf8', '#fbbf24', '#ffffff']
    });
    btnFist.style.transform = 'scale(1.12)';
    setTimeout(() => btnFist.style.transform = 'scale(1)', 200);
    feedback.innerHTML = "💥 <strong>RESPECT LOCKED IN!</strong> Brotherhood is unbreakable forever! 🤜🤛🔥";
    feedback.style.opacity = '1';
  });

  // Letter Envelope & Typewriter
  const envelope = container.querySelector('#broEnvelope');
  const flap = container.querySelector('#broFlap');
  const waxSeal = container.querySelector('#broWaxSeal');
  const modal = container.querySelector('#broLetterModal');
  const closeBtn = container.querySelector('#btnCloseBroLetter');
  const typedEl = container.querySelector('#typedBroText');

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

  container.querySelector('#btnShareBro')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copied! Send it directly to Bhai on WhatsApp! 🔥");
  });
}
