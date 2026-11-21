// src/viewer/templates/sisterTemplate.js - Sister (Behna) Celebration Template

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderSisterTemplate(container, data) {
  const polaroids = data.polaroids || [
    { title: "Partner in Crime 💅", image: "/images/pretty.jpg", note: "From raiding each other's wardrobes to keeping the deepest secrets safe." },
    { title: "Chaos & Blackmail 📸", image: "/images/always_you.jpg", note: "Photos that could ruin each other's reputation, kept as supreme leverage! 😂" },
    { title: "Forever Bestie 💖", image: "/images/beautiful.jpg", note: "No matter how loud our fights get, you are the first person I run to." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sisPlayerSlot"></div>

    <div class="fam-page-viewport sister-viewport">
      <!-- Neon Sparkles & Stars Canvas -->
      <canvas id="sisStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge purple-badge">PARTNER IN CRIME & FOREVER SOULMATE 💅💖</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Crazy, Annoying, Irreplaceable Sister 💅✨'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "We fight, we steal each other's clothes, we drive each other insane... but no one in this universe has my back like you do!"}</p>
      </header>

      <!-- Interactive Sister Banter Game: Who is Smarter? -->
      <section class="fam-section">
        <div class="sister-banter-card">
          <div class="banter-emoji">🤔💅</div>
          <h2 class="banter-query">THE ULTIMATE SIBLING SETTLEMENT: WHO IS SMARTER?</h2>
          <p class="banter-desc">Be completely honest. The universe is watching.</p>

          <div class="banter-buttons-row">
            <button class="btn-sister-smart" id="btnSisterSmart">
              Obviously My Sister 💅👑
            </button>
            <button class="btn-sister-me" id="btnMeSmart">
              I am smarter! 🧠
            </button>
          </div>

          <div class="banter-result" id="banterResult" style="display:none;"></div>
        </div>
      </section>

      <!-- The Sister Survival Commandments -->
      <section class="fam-section">
        <h2 class="fam-section-title">📜 The Sacred Sister Commandments</h2>
        <p class="fam-section-sub">Unwritten rules that govern our chaotic sisterhood</p>

        <div class="superpowers-grid">
          <div class="superpower-card sister-card">
            <span class="sp-icon">👗</span>
            <h3>The Wardrobe Clause</h3>
            <p>'What is yours is automatically mine, but don't you dare touch my new dress without written permission.'</p>
          </div>
          <div class="superpower-card sister-card">
            <span class="sp-icon">🤫</span>
            <h3>The Vault of Secrets</h3>
            <p>Late night gossips, secret crushes, and wild confessions that are strictly protected from parents.</p>
          </div>
          <div class="superpower-card sister-card">
            <span class="sp-icon">🍕</span>
            <h3>The Food Tax</h3>
            <p>If you order midnight snacks or bring fries home, exactly 50% belongs to me by divine sibling law.</p>
          </div>
          <div class="superpower-card sister-card">
            <span class="sp-icon">🥊</span>
            <h3>The Double Standard</h3>
            <p>'I can roast and roast you 24/7, but if anyone else makes you cry, I will end them without hesitation.'</p>
          </div>
        </div>
      </section>

      <!-- Polaroid Memory Wall -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Sibling Chaos & Sweet Memories</h2>
        <p class="fam-section-sub">Evidence that we are the coolest duo in history</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card sister-pol-card">
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3D Wax-Seal Love Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter For My Forever Bestie</h2>
        <p class="fam-section-sub">Tap the wax seal to unfold our deepest sister bond</p>

        <div class="wax-envelope-wrap sister-envelope" id="sisEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="sisFlap"></div>

          <button class="wax-seal-button sister-seal" id="sisWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem">
              <span style="font-size:22px;">💅</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="sisLetterModal">
        <div class="blossom-modal-card sister-modal">
          <button class="modal-close-btn" id="btnCloseSisLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">To My Irreplaceable Sister 💖</h3>
            <p class="modal-card-sub">Partner in crime forever & always</p>
          </div>
          <div class="modal-card-body" id="sisTypewriterBody">
            <span id="typedSisText"></span><span class="typing-cursor">|</span>
          </div>
          <div class="modal-card-footer">
            <button class="btn-fam-action btn-sister-share" id="btnShareSis">💌 Send to Behna</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init Audio Player
  initMusicPlayer(container.querySelector('#sisPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "SISTER ANTHEM",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    }
  });

  // Ambient Purple / Lavender Sparkles Canvas
  const canvas = container.querySelector('#sisStarCanvas');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const sparkles = [];
  for (let i = 0; i < 35; i++) {
    sparkles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      dy: -(Math.random() * 0.8 + 0.3)
    });
  }

  function renderSparkles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of sparkles) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(192, 132, 252, ${s.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#c084fc';
      ctx.fill();
      ctx.restore();

      s.y += s.dy;
      if (s.y < -10) s.y = canvas.height + 10;
    }
    requestAnimationFrame(renderSparkles);
  }
  renderSparkles();

  // Playful Runaway Button Logic
  const btnSisterSmart = container.querySelector('#btnSisterSmart');
  const btnMeSmart = container.querySelector('#btnMeSmart');
  const banterResult = container.querySelector('#banterResult');

  btnSisterSmart.addEventListener('click', () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#c084fc', '#f472b6', '#fbbf24', '#ffffff']
    });
    banterResult.style.display = 'block';
    banterResult.innerHTML = "👑 <strong>FACTS ONLY!</strong> You admitted it! The Queen of the house wins as usual! 💅✨";
  });

  const evasiveQuotes = [
    "Nice try! 🏃‍♀️",
    "Keep dreaming! 😂",
    "Ask Mom first! 🙈",
    "In your wildest dreams! 💅",
    "404: Braincell not found! 💀",
    "Delete your search history first! 😜"
  ];
  let quoteIdx = 0;

  function dodge() {
    const rx = (Math.random() - 0.5) * 220;
    const ry = (Math.random() - 0.5) * 140;
    btnMeSmart.style.transform = `translate(${rx}px, ${ry}px)`;
    btnMeSmart.innerText = evasiveQuotes[quoteIdx % evasiveQuotes.length];
    quoteIdx++;
  }
  btnMeSmart.addEventListener('mouseenter', dodge);
  btnMeSmart.addEventListener('touchstart', (e) => { e.preventDefault(); dodge(); });

  // Letter Envelope & Typewriter
  const envelope = container.querySelector('#sisEnvelope');
  const flap = container.querySelector('#sisFlap');
  const waxSeal = container.querySelector('#sisWaxSeal');
  const modal = container.querySelector('#sisLetterModal');
  const closeBtn = container.querySelector('#btnCloseSisLetter');
  const typedEl = container.querySelector('#typedSisText');

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

  container.querySelector('#btnShareSis')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copied! Send it directly to Behna on WhatsApp! 💖");
  });
}
