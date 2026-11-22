// src/viewer/templates/fatherTemplate.js - The Anchor, Life Compass & Hero (Father Celebration)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderFatherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Quiet Strength 🛡️", image: "/images/sunset.jpg", note: "Working through sleepless days so our future would shine bright." },
    { title: "Life's Compass 🧭", image: "/images/always_you.jpg", note: "Teaching us integrity, honor, and how to stand tall in any storm." },
    { title: "My First Hero 🌟", image: "/images/dream_girl.jpg", note: "No cape, no armor, just a father who gave us everything." }
  ];

  const compassVirtues = [
    { dir: "N", label: "NORTH: INTEGRITY 🧭", quote: "A man's true wealth is his word. Stand firm on your principles, even when standing completely alone." },
    { dir: "E", label: "EAST: SILENT SACRIFICE 🛡️", quote: "Never let the world see you sweat when shielding those you love. Work quietly; let your character be your voice." },
    { dir: "S", label: "SOUTH: UNWAVERING GRIT 🔨", quote: "Tough times never last, but tough people do. Get back up, brush the dust off, and keep moving forward." },
    { dir: "W", label: "WEST: UNCONDITIONAL SHELTER 🌟", quote: "No matter how high you climb or how hard you stumble, Papa's door and arms will always be wide open." }
  ];

  const sacrificeRoadmap = [
    { icon: "🌅", title: "The 5 AM Dawn Grinds", desc: "Waking up before the world stirred, enduring long hours and weary commutes so our dreams never faced a ceiling." },
    { icon: "🛡️", title: "The Invisible Armor", desc: "Absorbing life's heaviest financial and emotional burdens in complete silence, ensuring we only knew peace." },
    { icon: "🚲", title: "The Steady Guiding Hand", desc: "Running behind our first bicycle, letting go just in time, teaching us that falling is only the start of learning to fly." },
    { icon: "🌟", title: "The Silent Cheerleader", desc: "Standing quietly in the back row with tears of pride in his eyes, never claiming credit for the wings he built for us." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="dadPlayerSlot"></div>

    <div class="fam-page-viewport father-viewport">
      <!-- Ambient Bronze Stardust Canvas -->
      <canvas id="dadStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge bronze-badge">🧭 TO MY LIFE'S STEADY ANCHOR &amp; FIRST HERO 🛡️🌟</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Father: The Unsung Hero 🌟'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "A father's sacrifice is quiet, yet it moves mountains. Thank you for being the unshakeable foundation of my life."}</p>
        
        <div class="dad-quick-actions">
          <button class="btn-fam-action btn-trophy-dad" id="btnAwardTrophy">
            🏆 Present #1 Best Father Medal of Honor 🌟
          </button>
        </div>
        <div id="trophyFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- MODULE 1: The Interactive Life Compass -->
      <section class="fam-section">
        <div class="dad-compass-card">
          <h2 class="fam-section-title" style="margin-bottom:6px;">🧭 Papa's Wisdom Compass</h2>
          <p class="fam-section-sub">Tap any cardinal direction (N, E, S, W) to spin the compass needle and reveal Papa's life lessons</p>

          <div class="compass-interactive-assembly">
            <div class="compass-dial-bezel" id="compassBezel">
              <div class="compass-needle" id="compassNeedle">
                <div class="needle-tip-north"></div>
                <div class="needle-center-pin"></div>
                <div class="needle-tip-south"></div>
              </div>
              <button class="compass-dir-btn btn-north active" data-dir="0" title="North: Integrity">N</button>
              <button class="compass-dir-btn btn-east" data-dir="1" title="East: Sacrifice">E</button>
              <button class="compass-dir-btn btn-south" data-dir="2" title="South: Grit">S</button>
              <button class="compass-dir-btn btn-west" data-dir="3" title="West: Shelter">W</button>
            </div>
          </div>

          <div class="compass-lesson-display" id="compassLessonBox">
            <span class="lesson-badge-pill" id="lessonBadge">${compassVirtues[0].label}</span>
            <p class="lesson-quote-body" id="lessonQuote">“${compassVirtues[0].quote}”</p>
            <span class="lesson-author-tag">— Words of Wisdom from Papa</span>
          </div>
        </div>
      </section>

      <!-- MODULE 2: The Unsung Battles Timeline -->
      <section class="fam-section">
        <h2 class="fam-section-title">🛡️ The Silent Battles He Fought</h2>
        <p class="fam-section-sub">Sacrifices made without demanding applause or asking for reward</p>

        <div class="superpowers-grid dad-timeline-grid">
          ${sacrificeRoadmap.map((s, i) => `
            <div class="superpower-card dad-sacrifice-card" data-idx="${i}">
              <span class="sp-icon">${s.icon}</span>
              <h3>${s.title}</h3>
              <p>${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: Father & Child Heritage Polaroids -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Heritage Memories With Papa</h2>
        <p class="fam-section-sub">Moments of quiet pride, hearty laughter, and unbreakable guidance</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card dad-pol-card" data-i="${i}">
              <div class="dad-brass-pin">🧭</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note || 'Cherished forever'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 4: Bronze Signet Wax-Seal Respect Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter of Honor & Gratitude</h2>
        <p class="fam-section-sub">Tap the bronze signet wax seal to read words rarely spoken out loud</p>

        <div class="wax-envelope-wrap dad-wax-envelope" id="dadEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="dadFlap"></div>

          <button class="wax-seal-button" id="dadWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem bronze-emblem">
              <span style="font-size:24px;">🛡️</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Medal & Imperial Certificate of Honor -->
      <section class="fam-section">
        <div class="luxury-award-certificate bronze-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon bronze-ribbon">🛡️ HIGHEST CITATION OF VALOR &amp; HONOR 🛡️</div>
          <h2 class="cert-heading" style="color:#d4af37;">CHAMPION FATHER OF ALL TIME</h2>
          <div class="cert-recipient">SOLEMNLY CONFERRED UPON: <strong>${data.recipientName || 'PAPA'}</strong></div>
          <p class="cert-body">
            Conferred with profound respect, love, and awe for decades of tireless dedication, unshakeable integrity, 
            protecting our family from every storm, and being the truest hero we will ever know.
          </p>
          <div class="cert-stamp bronze-stamp">🌟 UNBREAKABLE ANCHOR &amp; HERO 🌟</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="dadLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY HERO, PAPA 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseDadLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Dear Papa,</h3>
            <div class="modal-typewriter-text" id="dadLetterBody">
              ${(data.letter || `Dear Papa,\n\nI may not say this out loud often enough, but I watch you every single day with immense respect and pride.\n\nYou have taught me what honor, grit, and sacrifice truly look like — not through grand speeches, but through your quiet actions and tireless dedication to our family.\n\nEvery comfortable night we slept, every opportunity we were given, and every dream we pursued was paved by your sleepless hours and silent sacrifices. You took the brunt of the world so we could walk with our heads held high.\n\nThank you for being my anchor, my teacher, and my greatest inspiration. I pray for your good health, long life, and endless peace.\n\nWith deepest love, respect, and gratitude, your child. 🌟`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#dadPlayerSlot'), {
    audioTitle: data.audioTitle || "Father's Anchor Soundtrack",
    audioSubtitle: data.audioSubtitle || "THE PILLAR OF STRENGTH",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient bronze stardust canvas
  const canvas = container.querySelector('#dadStarCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const stars = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedY: 0.2 + Math.random() * 0.5,
      alpha: 0.2 + Math.random() * 0.7,
      color: '#c59b27'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
        s.y -= s.speedY;
        if (s.y < 0) { s.y = height; s.x = Math.random() * width; }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Interactive Compass Logic
  const needle = container.querySelector('#compassNeedle');
  const lessonBadge = container.querySelector('#lessonBadge');
  const lessonQuote = container.querySelector('#lessonQuote');
  const dirBtns = container.querySelectorAll('.compass-dir-btn');

  const angles = [0, 90, 180, 270];

  dirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-dir'), 10);
      const v = compassVirtues[idx];
      dirBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (needle) {
        needle.style.transform = `translate(-50%, -50%) rotate(${angles[idx]}deg)`;
      }

      lessonBadge.textContent = v.label;
      lessonQuote.textContent = `“${v.quote}”`;

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.4 },
        colors: ['#c59b27', '#d97706', '#fef3c7', '#ffffff']
      });
    });
  });

  // Trophy Button
  const btnTrophy = container.querySelector('#btnAwardTrophy');
  const trophyFeedback = container.querySelector('#trophyFeedback');
  btnTrophy?.addEventListener('click', () => {
    trophyFeedback.innerHTML = `🏆 <strong>#1 Best Father Medal Awarded!</strong> To the man whose strength and integrity guide our lives every single day. 🌟`;
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.35 },
      colors: ['#c59b27', '#d97706', '#fbbf24', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#dadWaxSeal');
  const modal = container.querySelector('#dadLetterModal');
  const closeBtn = container.querySelector('#btnCloseDadLetter');

  seal?.addEventListener('click', () => {
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#c59b27', '#d97706', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
