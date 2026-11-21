// src/viewer/templates/motherTemplate.js - Heartfelt Mother (Maa) Celebration Template

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderMotherTemplate(container, data) {
  const polaroids = data.polaroids || [
    { title: "Her Gentle Smile 🌸", image: "/images/beautiful.jpg", note: "The warmth that heals every wound and lights up our darkest days." },
    { title: "Sacrifices & Love ❤️", image: "/images/always_you.jpg", note: "Giving up your sleep, your peace, and your dreams so ours could take flight." },
    { title: "My Guardian Angel 👑", image: "/images/sunset.jpg", note: "No matter how old I get, in your arms I am always safe." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="momPlayerSlot"></div>

    <div class="fam-page-viewport mother-viewport">
      <!-- Ambient Golden Petals Canvas -->
      <canvas id="momPetalCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge gold-badge">TO MY QUEEN & HEAVEN ON EARTH 👑🌸</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Queen, My Maa ❤️'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || 'In your smile lies my entire universe, and in your prayers I find my greatest strength.'}</p>
        
        <!-- Virtual Hug Button -->
        <button class="btn-fam-action btn-hug-mom" id="btnVirtualHug">
          🤗 Send Endless Virtual Hugs to Maa ❤️
        </button>
        <div id="hugFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- Superpowers of Mom -->
      <section class="fam-section">
        <h2 class="fam-section-title">✨ The Superpowers of Maa</h2>
        <p class="fam-section-sub">Qualities that make you the greatest human being on earth</p>

        <div class="superpowers-grid">
          <div class="superpower-card">
            <span class="sp-icon">🍲</span>
            <h3>The Master Chef of Love</h3>
            <p>Knowing our hunger before we even speak, and turning simple food into the sweetest warmth.</p>
          </div>
          <div class="superpower-card">
            <span class="sp-icon">🩹</span>
            <h3>The Silent Healer</h3>
            <p>One gentle touch on our forehead or one soft dua that makes all worries disappear.</p>
          </div>
          <div class="superpower-card">
            <span class="sp-icon">🛡️</span>
            <h3>The Iron Shield</h3>
            <p>Silently standing between us and every storm of life without asking for anything in return.</p>
          </div>
          <div class="superpower-card">
            <span class="sp-icon">🌟</span>
            <h3>The Endless Listener</h3>
            <p>Hearing every unspoken tear, understanding every silence, and always believing in us.</p>
          </div>
        </div>
      </section>

      <!-- Polaroid Memory Wall -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Cherished Memories With Maa</h2>
        <p class="fam-section-sub">Moments frozen in time, forever kept in my heart</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card">
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
        <h2 class="fam-section-title">💌 A Letter From My Soul</h2>
        <p class="fam-section-sub">Tap the wax seal to unfold words from the bottom of my heart</p>

        <div class="wax-envelope-wrap" id="momEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="momFlap"></div>

          <button class="wax-seal-button" id="momWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem">
              <span style="font-size:22px;">🌸</span>
            </div>
          </button>
        </div>
      </section>

      <!-- Official Gold-Foiled Certificate -->
      <section class="fam-section">
        <div class="luxury-award-certificate gold-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon">👑 OFFICIAL PROCLAMATION 👑</div>
          <h2 class="cert-heading">BEST MOTHER IN THE UNIVERSE</h2>
          <div class="cert-recipient">PRESENTED TO: <strong>${data.recipientName || 'MAA'}</strong></div>
          <p class="cert-body">
            Awarded with infinite love and gratitude for unconditional warmth, boundless patience, 
            delicious meals, and for being the most precious blessing in our lives.
          </p>
          <div class="cert-stamp">🌟 FOREVER ADORED 🌟</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="momLetterModal">
        <div class="blossom-modal-card">
          <button class="modal-close-btn" id="btnCloseMomLetter">&times;</button>
          <div class="modal-card-header">
            <h3 class="modal-card-title">To My Beloved Maa ❤️</h3>
            <p class="modal-card-sub">With all my love & gratitude</p>
          </div>
          <div class="modal-card-body" id="momTypewriterBody">
            <span id="typedMomText"></span><span class="typing-cursor">|</span>
          </div>
          <div class="modal-card-footer">
            <button class="btn-fam-action" id="btnShareMom">💌 Share with Maa</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init Audio Player
  initMusicPlayer(container.querySelector('#momPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "FOR MY QUEEN",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    }
  });

  // Ambient Golden Rose Petals Canvas
  const canvas = container.querySelector('#momPetalCanvas');
  const ctx = canvas.getContext('2d');
  function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const petals = [];
  for (let i = 0; i < 28; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 6 + 4,
      dy: Math.random() * 1.2 + 0.6,
      dx: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * Math.PI * 2,
      sway: Math.random() * Math.PI * 2,
      color: ['rgba(251, 113, 133, 0.45)', 'rgba(245, 158, 11, 0.35)', 'rgba(244, 114, 182, 0.4)'][Math.floor(Math.random() * 3)]
    });
  }

  function renderPetals() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of petals) {
      p.sway += 0.02;
      p.x += p.dx + Math.sin(p.sway) * 0.6;
      p.y += p.dy;
      p.rot += 0.015;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.r, p.r * 1.5, 0, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
    }
    requestAnimationFrame(renderPetals);
  }
  renderPetals();

  // Virtual Hug Heart Shower
  const btnHug = container.querySelector('#btnVirtualHug');
  const hugFeedback = container.querySelector('#hugFeedback');
  btnHug.addEventListener('click', () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#f472b6', '#ffffff']
    });
    btnHug.style.transform = 'scale(1.08)';
    setTimeout(() => btnHug.style.transform = 'scale(1)', 250);
    hugFeedback.innerHTML = "💖 Warm hug delivered straight to Maa's heart! You made her smile today! 🌸";
    hugFeedback.style.opacity = '1';
  });

  // Letter Modal & Typewriter
  const envelope = container.querySelector('#momEnvelope');
  const flap = container.querySelector('#momFlap');
  const waxSeal = container.querySelector('#momWaxSeal');
  const modal = container.querySelector('#momLetterModal');
  const closeBtn = container.querySelector('#btnCloseMomLetter');
  const typedEl = container.querySelector('#typedMomText');

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

  container.querySelector('#btnShareMom')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Website link copied! Send it directly to Maa on WhatsApp! 💖");
  });
}
