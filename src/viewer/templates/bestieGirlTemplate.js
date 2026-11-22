// src/viewer/templates/bestieGirlTemplate.js - The Soul Sister & Partner-in-Crime Aesthetic Experience (Page-By-Page)

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

    <div class="fam-page-viewport fam-storybook-viewport bestie-girl-viewport">
      <!-- Ambient Rose Quartz Sparkle Canvas -->
      <canvas id="bestieGirlCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="girlStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="girlStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="girlStageTitleText">Soul Sister Main Character 💅</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="girlPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="fam-page-card active" data-page="1">
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
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Bestie Emergency Dispatch 🚨</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: EMERGENCY DISPATCH -->
        <section class="fam-page-card" data-page="2">
          <div class="bestie-dispatch-card">
            <div class="dispatch-header">
              <span class="dispatch-tag">24/7 SISTERHOOD HOTLINE 🚨</span>
              <h2 class="fam-section-title" style="margin-bottom:4px; text-align:center;">✨ Bestie Emergency Dispatch</h2>
              <p class="fam-section-sub" style="text-align:center;">Tap any emergency button below to trigger immediate bestie backup</p>
            </div>

            <div class="dispatch-buttons-grid">
              ${emergencyStations.map((st, i) => `
                <button type="button" class="btn-dispatch-station" data-idx="${i}">
                  <span class="station-icon">${st.icon}</span>
                  <span class="station-label">${st.label}</span>
                </button>
              `).join('')}
            </div>

            <div class="dispatch-live-response" id="dispatchDisplayBox" style="display:none;">
              <div class="dispatch-bubble" id="dispatchBubble"></div>
            </div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Main Character Scrapbook 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: POLAROIDS SCRAPBOOK -->
        <section class="fam-page-card" data-page="3">
          <h2 class="fam-section-title" style="text-align:center;">📸 "Main Character Energy" Gallery</h2>
          <p class="fam-section-sub" style="text-align:center;">Serving looks, laughing until we cry, and making history together</p>

          <div class="fam-polaroid-row">
            ${polaroids.map((p, i) => `
              <div class="fam-polaroid-card girl-bestie-polaroid" data-i="${i}">
                <div class="bestie-sparkle-pin">💖</div>
                <div class="fam-pol-img-wrap">
                  <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="fam-pol-title">${p.title}</h4>
                <p class="fam-pol-note">${p.note || 'Soul sisters forever'}</p>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Scratch VIP Pass 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: GOLDEN SCRATCH TICKET -->
        <section class="fam-page-card" data-page="4">
          <div class="luxury-scratch-card bestie-scratch-card">
            <div class="scratch-badge">VIP BESTIE PASS 🎟️</div>
            <h3 class="scratch-headline">Secret Soul Sister Pass</h3>
            <p class="scratch-instruction">Scratch the holographic ticket with your finger to reveal your lifetime privileges</p>

            <div class="scratch-canvas-wrap">
              <div class="scratch-secret-content">
                <span style="font-size:36px; display:block; margin-bottom:6px;">☕✨</span>
                <strong style="color:#f472b6; font-size:15px; display:block; margin-bottom:4px;">LIFETIME UNLIMITED PRIVILEGES</strong>
                <p style="font-size:12.5px; color:#fff; line-height:1.45; margin:0;">
                  Unlimited 2 AM Venting, Emergency Iced Coffee Runs, Outfit Validation &amp; Matching Bail Money Forever! ♡
                </p>
              </div>
            </div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Soul Sister Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <h2 class="fam-section-title" style="text-align:center;">💌 Wax-Sealed Soul Sister Letter</h2>
          <p class="fam-section-sub" style="text-align:center;">Tap the rose wax seal to unroll heartfelt words for my favorite human</p>

          <div class="wax-envelope-wrap girl-wax-envelope" id="girlEnvelope">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="girlFlap"></div>

            <button class="wax-seal-button" id="girlWaxSeal" aria-label="Open letter">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">👯‍♀️</span>
              </div>
            </button>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Soul Sister Proclamation 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE & SHARE -->
        <section class="fam-page-card" data-page="6">
          <div class="luxury-award-certificate gold-cert">
            <div class="cert-border-corner tl"></div>
            <div class="cert-border-corner tr"></div>
            <div class="cert-border-corner bl"></div>
            <div class="cert-border-corner br"></div>

            <div class="cert-ribbon">👑 OFFICIAL PROCLAMATION 👑</div>
            <h2 class="cert-heading">SOUL SISTER OF THE CENTURY</h2>
            <div class="cert-recipient">SOLEMNLY PRESENTED TO: <strong>${data.recipientName || 'MY BESTIE'}</strong></div>
            <p class="cert-body">
              Conferred with boundless love for serving undeniable main character energy, 
              answering 2 AM emergency life rants, and being the warmest, most radiant soul in my world.
            </p>
            <div class="cert-stamp">💖 SOUL SISTERS FOR LIFE 💖</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnGirlReplay">
              <span>💖 Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>

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
              ${(data.letter || `Happiest celebration to my favorite girl in the world! 🧚‍♀️💖\n\nI honestly don’t know what I would do without our 2 AM rants, emergency outfit approvals, and laughing at things nobody else finds funny.\n\nYou are the sister I got to choose in this lifetime. Thank you for always listening, never judging, and being the brightest light in my life.\n\nI hope this year brings you all the luxury, peace, and big dreams you truly deserve. You are the main character and don’t you ever forget it!\n\nLove you endlessly, my soul sister! 🫂🧿✨`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page switcher engine
  const girlPageTitles = [
    { num: 1, title: "Soul Sister Main Character 💅" },
    { num: 2, title: "Bestie Emergency Dispatch 🚨" },
    { num: 3, title: "Main Character Scrapbook 📸" },
    { num: 4, title: "Golden Scratch VIP Pass 🎟️" },
    { num: 5, title: "Soul Sister Letter 💌" },
    { num: 6, title: "Soul Sister of the Century 👑" }
  ];

  const totalPages = girlPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#girlStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#girlStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#girlStageTitleText');
    if (titleText && girlPageTitles[currentPage - 1]) {
      titleText.textContent = girlPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.fam-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-fam-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });
  container.querySelector('#btnGirlReplay')?.addEventListener('click', () => goToPage(1));

  // Initialize background music player
  initMusicPlayer(container.querySelector('#girlBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Bestie Anthems & Pop Magic",
    audioSubtitle: data.audioSubtitle || "SOUL SISTER VIBES",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient rose quartz sparkle canvas
  const canvas = container.querySelector('#bestieGirlCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const glitters = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedY: 0.3 + Math.random() * 0.7,
      alpha: 0.2 + Math.random() * 0.7,
      color: '#f472b6'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      glitters.forEach(s => {
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
