// src/viewer/templates/bestieGirlTemplate.js - The Soul Sister & Partner-in-Crime Aesthetic Experience

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBestieGirlTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : (data.cards || [
    { title: "Sunset Gossips ☕🌅", image: "/images/sunset.jpg", note: "Late night iced coffee runs and dissecting our entire lives in the car." },
    { title: "Unstoppable Laughs 😂", image: "/images/always_you.jpg", note: "Laughing so hard our stomachs hurt until we couldn't breathe." },
    { title: "Main Character Energy 💅", image: "/images/pretty.jpg", note: "Serving looks and turning heads everywhere we walk in together." },
    { title: "Soul Sisters Forever 👯‍♀️", image: "/images/dream_girl.jpg", note: "You are the sister I got to choose in this lifetime." },
    { title: "Forever My Favorite 👑", image: "/images/queen.jpg", note: "To 100 more years of crazy memories, luxury, and peace!" }
  ]);

  const emergencyStations = [
    { icon: "🧋", label: "Emergency Boba Dispatch", action: "Deploying 70% Sugar Brown Sugar Boba straight to your door right now! 🛵✨" },
    { icon: "👗", label: "Urgent Outfit Approval", action: "10/10 STUNNING! Main character energy, wear the second shoes, you look angelic! 👑" },
    { icon: "🎙️", label: "2 AM Life Rant Protocol", action: "Listening to your 8-minute voice note on 1.5x speed with complete emotional support! 🍿" },
    { icon: "👑", label: "#1 Hype Woman Hotline", action: "Nobody on this planet compares to you. Remember who you are, Queen! 💖✨" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="girlBestiePlayerSlot"></div>

    <div class="fam-page-viewport bestie-girl-viewport">
      <!-- Ambient Rose Quartz Sparkle Canvas -->
      <canvas id="bestieGirlCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge gold-badge">👯‍♀️ SOUL SISTER, PARTNER IN CRIME &amp; HYPE WOMAN 💅✨</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Soul Sister, My Bestie 💅💖'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "We do crazy, unhinged things together every day... so I built this special aesthetic website just for you!"}</p>
        
        <div class="sis-quick-actions">
          <button class="btn-fam-action btn-hype-bestie" id="btnHypeBestie">
            ✨ Hype Up My Bestie 1000% 👑
          </button>
        </div>
        <div id="hypeFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- MODULE 1: The 24/7 Bestie Emergency Dispatch -->
      <section class="fam-section">
        <div class="bestie-dispatch-card">
          <div class="dispatch-header">
            <span class="dispatch-tag">24/7 SISTERHOOD HOTLINE 🚨</span>
            <h2 class="fam-section-title" style="margin-bottom:4px;">✨ Bestie Emergency Dispatch</h2>
            <p class="fam-section-sub">Tap any emergency button below to trigger immediate bestie backup</p>
          </div>

          <div class="dispatch-grid">
            ${emergencyStations.map((s, i) => `
              <button type="button" class="btn-dispatch-station" data-idx="${i}">
                <span class="station-icon">${s.icon}</span>
                <span class="station-label">${s.label}</span>
              </button>
            `).join('')}
          </div>

          <div class="dispatch-display-box" id="dispatchDisplayBox" style="display:none;">
            <div class="dispatch-bubble" id="dispatchBubble"></div>
          </div>
        </div>
      </section>

      <!-- MODULE 2: "Main Character Energy" 3D Swipe Polaroid Gallery -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Iconic Bestie Memories</h2>
        <p class="fam-section-sub">Swipe and tap our favorite unhinged moments together</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card bestie-girl-card" data-i="${i}">
              <div class="bestie-sparkle-badge">MAIN CHARACTER ✨</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title || p.caption}" onerror="this.src='/images/pretty.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title || p.caption || `Memory #${i+1}`}</h4>
              <p class="fam-pol-note">${p.note || 'Always shining'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: Golden Scratch-Off Bestie Ticket -->
      <section class="fam-section">
        <div class="bestie-scratch-card">
          <h2 class="fam-section-title" style="margin-bottom:6px;">🎟️ Secret Bestie VIP Pass</h2>
          <p class="fam-section-sub">Tap or scratch below to reveal your permanent bestie reward</p>

          <div class="scratch-reveal-box" id="scratchRevealBox">
            <div class="scratch-secret-text">
              ✨ <strong>LIFETIME SOUL SISTER PERK:</strong><br />
              Unlimited 24/7 Venting, Emergency Iced Boba, 100% Wardrobe Borrowing Rights &amp; Matching Bail Money! ♡
            </div>
          </div>
        </div>
      </section>

      <!-- MODULE 4: Wax-Sealed Soul Sister Typewriter Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter For My Soul Sister</h2>
        <p class="fam-section-sub">Tap the wax seal to unlock words straight from my heart</p>

        <div class="wax-envelope-wrap bestie-wax-envelope" id="girlEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="girlFlap"></div>

          <button class="wax-seal-button" id="girlWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem gold-emblem">
              <span style="font-size:24px;">👑</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Official Soul Sister Proclamation -->
      <section class="fam-section">
        <div class="luxury-award-certificate gold-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon">✨ OFFICIAL BESTIE CHARTER ✨</div>
          <h2 class="cert-heading" style="color:#d4af37;">WORLD'S MOST ICONIC BESTIE</h2>
          <div class="cert-recipient">SOLEMNLY BESTOWED UPON: <strong>${data.recipientName || 'MY BESTIE'}</strong></div>
          <p class="cert-body">
            Conferred with endless love and hype for being the sweetest, funniest, most supportive soul sister. 
            May this year bring you unstoppable success, peace, luxury, and infinite laughter!
          </p>
          <div class="cert-stamp">💖 SOUL SISTERS 4L 💖</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="girlLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY SOUL SISTER 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseGirlLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Hey Gorgeous,</h3>
            <div class="modal-typewriter-text" id="girlLetterBody">
              ${(data.letterBody || data.letter || `Happiest Birthday to my favorite human in the world! 🧚‍♀️💖\n\nI honestly don’t know what I would do without our 2 AM rants, emergency outfit approvals, and laughing so hard at things nobody else finds funny.\n\nYou are the sister I got to choose. Thank you for always listening, never judging, and being the warmest, brightest light in my life.\n\nI hope this year brings you all the happiness, luxury, peace, and dreams you truly deserve. You are the main character and don’t you ever forget it! 🥰\n\nI love you endlessly, my soul sister! 🫂🧿✨`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#girlBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Bestie Forever Soundtrack",
    audioSubtitle: data.audioSubtitle || "SOUL SISTER VIBES 💅",
    audioSrc: data.audioSrc || "/audio/blossom_song.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/pretty.jpg" }]
  });

  // Ambient rose sparkles canvas
  const canvas = container.querySelector('#bestieGirlCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.3 + Math.random() * 0.7,
      color: Math.random() > 0.5 ? '#f472b6' : '#fbbf24'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach(s => {
        s.y -= s.speedY;
        if (s.y < 0) { s.y = height; s.x = Math.random() * width; }
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Emergency Dispatch Stations logic
  const dispatchBox = container.querySelector('#dispatchDisplayBox');
  const dispatchBubble = container.querySelector('#dispatchBubble');
  container.querySelectorAll('.btn-dispatch-station').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const st = emergencyStations[idx];
      dispatchBox.style.display = 'block';
      dispatchBubble.innerHTML = `<strong>${st.icon} ${st.label}:</strong><br />${st.action}`;
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#f472b6', '#fbbf24', '#ffffff']
      });
    });
  });

  // Hype Button
  const btnHype = container.querySelector('#btnHypeBestie');
  const hypeFeedback = container.querySelector('#hypeFeedback');
  let hypeLevel = 100;
  btnHype?.addEventListener('click', () => {
    hypeLevel += 100;
    hypeFeedback.innerHTML = `👑 <strong>Bestie Hype Level: ${hypeLevel}%!</strong> Unapologetic main character energy activated. ✨`;
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#fbbf24', '#f472b6', '#e11d48', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#girlWaxSeal');
  const modal = container.querySelector('#girlLetterModal');
  const closeBtn = container.querySelector('#btnCloseGirlLetter');

  seal?.addEventListener('click', () => {
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f472b6', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
