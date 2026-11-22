// src/viewer/templates/bestieBoyTemplate.js - The Ride-or-Die Brotherhood Vault (Bro Bestie Experience - Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBestieBoyTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : (data.cards || [
    { title: "Late Night Drives 🚗💨", image: "/images/sunset.jpg", note: "Windows down, music blasting, talking about life and making big plans." },
    { title: "Surviving Chaos Since Day One ⚡", image: "/images/always_you.jpg", note: "From terrible ideas that somehow worked to legendary wins." },
    { title: "Epic Gaming Sessions 🎮", image: "/images/dream_girl.jpg", note: "3 AM tournaments, blaming lag, and screaming at the TV screen together." },
    { title: "Brothers By Choice 👑", image: "/images/pretty.jpg", note: "People come and go, but real brothers stay solid through every storm." },
    { title: "To 100 More Years 🍻", image: "/images/queen.jpg", note: "Big money, peace, good health, and unstoppable success. Cheers!" }
  ]);

  const wingmanStats = [
    { label: "Unbreakable Loyalty 🛡️", val: "100%", width: "100%" },
    { label: "Wingman Readiness 🦅", val: "100%", width: "100%" },
    { label: "3 AM Car Playlist Taste 🎵", val: "10/10", width: "100%" },
    { label: "Gaming Co-Op Backup 🎮", val: "INFINITE", width: "100%" },
    { label: "Roasting Without Hesitation 🥊", val: "99.9%", width: "99%" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="boyBestiePlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport bestie-boy-viewport">
      <!-- Ambient Amber Stardust Canvas -->
      <canvas id="bestieBoyCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="boyStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="boyStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="boyStageTitleText">Bro Code Opening 👊⚡</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="boyPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge amber-badge">👊 RIDE OR DIE, UNBREAKABLE BROTHERHOOD ⚡🔥</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Day One, My Brother 👊⚡'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || "No cringe emotional speeches — you already know what it is. I built this legendary website just for you, my guy."}</p>
            
            <div class="bro-quick-actions">
              <button class="btn-fam-action btn-fistbump" id="btnBroVaultFist">
                🤜🤛 PLEDGE UNCONDITIONAL BROTHERHOOD 🔥
              </button>
            </div>
            <div id="broVaultFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Wingman Scorecard &amp; Stats 📊</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: WINGMAN SCORECARD -->
        <section class="fam-page-card" data-page="2">
          <div class="bro-stats-card bestie-boy-stats">
            <div class="theft-header" style="margin-bottom:14px;">
              <span class="theft-badge" style="background:rgba(245,158,11,0.2); border-color:#f59e0b; color:#fbbf24;">VERIFIED METRICS ⚡</span>
              <h2 class="fam-section-title" style="margin-bottom:4px; text-align:center;">📊 The Wingman Reliability Scorecard</h2>
              <p class="fam-section-sub" style="text-align:center;">Real-world assessment of our brotherhood &amp; late-night ride readiness</p>
            </div>

            <div class="bhai-stats-grid">
              ${wingmanStats.map(s => `
                <div class="stat-gauge-card">
                  <div class="stat-gauge-header">
                    <span class="stat-gauge-label">${s.label}</span>
                    <span class="stat-gauge-val">${s.val}</span>
                  </div>
                  <div class="stat-gauge-track">
                    <div class="stat-gauge-fill" style="width: ${s.width}; background:linear-gradient(90deg, #f59e0b, #fbbf24);"></div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Legendary Adventures 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: POLAROIDS SCRAPBOOK -->
        <section class="fam-page-card" data-page="3">
          <h2 class="fam-section-title" style="text-align:center;">📸 The Day One Hall of Fame</h2>
          <p class="fam-section-sub" style="text-align:center;">Late night car talks, wild wins, and legendary memories that stay between us</p>

          <div class="fam-polaroid-row">
            ${polaroids.map((p, i) => `
              <div class="fam-polaroid-card boy-bestie-polaroid" data-i="${i}">
                <div class="bhai-hazard-tag" style="background:#f59e0b; color:#000;">DAY ONE</div>
                <div class="fam-pol-img-wrap">
                  <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="fam-pol-title">${p.title}</h4>
                <p class="fam-pol-note">${p.note || 'Ride or die forever'}</p>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Bro-Code VIP Pass 🪪</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: METALLIC SCRATCH PASS -->
        <section class="fam-page-card" data-page="4">
          <div class="luxury-scratch-card boy-scratch-card">
            <div class="scratch-badge" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">LIFETIME PASS 🪪</div>
            <h3 class="scratch-headline">The Official Day One Pass</h3>
            <p class="scratch-instruction">Scratch the metallic card below to reveal your permanent brotherhood perks</p>

            <div class="scratch-canvas-wrap">
              <div class="scratch-secret-content">
                <span style="font-size:36px; display:block; margin-bottom:6px;">🍻⚡</span>
                <strong style="color:#fbbf24; font-size:15px; display:block; margin-bottom:4px;">OFFICIAL RIDE-OR-DIE PRIVILEGES</strong>
                <p style="font-size:12.5px; color:#fff; line-height:1.45; margin:0;">
                  Unlimited 3 AM Pickup Pass, Drinks On Me Forever, Unconditional Wingman Defense &amp; Zero Judgments For Life! 🤜🤛
                </p>
              </div>
            </div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Bro-Fist Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <h2 class="fam-section-title" style="text-align:center;">💌 Bro-Fist Wax-Sealed Brotherhood Letter</h2>
          <p class="fam-section-sub" style="text-align:center;">Tap the wax seal to unroll a message from your brother</p>

          <div class="wax-envelope-wrap boy-wax-envelope" id="boyEnvelope">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="boyFlap"></div>

            <button class="wax-seal-button" id="boyWaxSeal" aria-label="Open letter">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">👊</span>
              </div>
            </button>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Living Legend Citation 🏅</span>
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

            <div class="cert-ribbon" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">⚡ HALL OF FAME ⚡</div>
            <h2 class="cert-heading">CERTIFIED LIVING LEGEND</h2>
            <div class="cert-recipient">SOLEMNLY CONFERRED UPON: <strong>${data.recipientName || 'MY GUY'}</strong></div>
            <p class="cert-body">
              Awarded for remaining solid through every storm, undefeated loyalty, late-night car playlists, 
              and for being a true brother in every sense of the word.
            </p>
            <div class="cert-stamp" style="border-color:#fbbf24; color:#fbbf24;">👊 DAY ONE BROTHERHOOD 👊</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnBoyReplay">
              <span>⚡ Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="boyLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag" style="background:#f59e0b; color:#000;">BROTHERHOOD CODE 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseBoyLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Yo My Guy,</h3>
            <div class="modal-typewriter-text" id="boyLetterBody">
              ${(data.letter || `Yo my brother,\n\nWe have talked about conquering the world, laughed at crazy plans that almost got us locked up, and pushed each other to level up every single day.\n\nIn a world full of fake people, having someone who stays 100% solid no matter what is the rarest gift. You're not just a best friend; you're family.\n\nHere’s to another year of big wins, late night drives, wealth, and conquering every goal we set.\n\nFist bump forever! 👊⚡🔥`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page switcher engine
  const boyPageTitles = [
    { num: 1, title: "Bro Code Opening 👊⚡" },
    { num: 2, title: "Wingman Scorecard & Stats 📊" },
    { num: 3, title: "Day One Hall of Fame 📸" },
    { num: 4, title: "Bro-Code VIP Pass 🪪" },
    { num: 5, title: "Bro-Fist Letter 💌" },
    { num: 6, title: "Certified Living Legend 🏅" }
  ];

  const totalPages = boyPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#boyStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#boyStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#boyStageTitleText');
    if (titleText && boyPageTitles[currentPage - 1]) {
      titleText.textContent = boyPageTitles[currentPage - 1].title;
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
  container.querySelector('#btnBoyReplay')?.addEventListener('click', () => goToPage(1));

  // Initialize background music player
  initMusicPlayer(container.querySelector('#boyBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Day One Anthem & Heavy Bass",
    audioSubtitle: data.audioSubtitle || "BROTHERHOOD FOR LIFE",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient amber stardust canvas
  const canvas = container.querySelector('#bestieBoyCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.3 + Math.random() * 0.7,
      color: Math.random() > 0.5 ? '#f59e0b' : '#d97706'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) { p.y = height; p.x = Math.random() * width; }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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

  // Fist Bump Button
  const btnFist = container.querySelector('#btnBroVaultFist');
  const feedback = container.querySelector('#broVaultFeedback');
  let count = 0;
  btnFist?.addEventListener('click', () => {
    count++;
    feedback.innerHTML = `🔥 <strong>${count} Fist Bump${count > 1 ? 's' : ''} Locked!</strong> Solid for life. 🤜🤛`;
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#f59e0b', '#d97706', '#ea580c', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#boyWaxSeal');
  const modal = container.querySelector('#boyLetterModal');
  const closeBtn = container.querySelector('#btnCloseBoyLetter');

  seal?.addEventListener('click', () => {
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#d97706', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
