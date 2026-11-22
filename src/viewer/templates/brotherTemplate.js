// src/viewer/templates/brotherTemplate.js - Chaos Legend, Gaming Rival & Ride-or-Die (Brother Celebration - Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBrotherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
    { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
    { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
  ];

  const broCodeClauses = [
    { id: 1, title: "Clause 01: The 5th Amendment of Siblings 🤫", rule: "Never, under any circumstance, snitch to parents. What happens between brothers stays between brothers." },
    { id: 2, title: "Clause 02: The 3 AM Ride Protocol 🚗💨", rule: "If you call at 3 AM saying 'pick me up', the only acceptable response is 'Send location, I am outside.'" },
    { id: 3, title: "Clause 03: The Last Slice Duel 🍕", rule: "The final pizza slice or fry must be contested in high-stakes combat or split strictly 50/50." },
    { id: 4, title: "Clause 04: The Lag Defense Act 🎮", rule: "Whenever a match is lost in FIFA, COD, or Valorant, it was 100% caused by server ping or a broken controller." },
    { id: 5, title: "Clause 05: Unconditional World Defense 🛡️", rule: "We reserve exclusive lifetime rights to roast each other, but if anyone in the outside world tries, they get destroyed." }
  ];

  const statMetrics = [
    { label: "Loyalty Level 🛡️", val: "100%", width: "100%" },
    { label: "Roast Resistance 🥊", val: "99.9%", width: "99%" },
    { label: "Gaming Saltiness 🎮", val: "100%", width: "100%" },
    { label: "Borrowing Clothes Without Asking 🧥", val: "95%", width: "95%" },
    { label: "Emergency Bail Readiness ⚡", val: "INFINITE", width: "100%" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="broPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport brother-viewport">
      <!-- Ambient Amber Ember Particles Canvas -->
      <canvas id="broStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="broStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="broStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="broStageTitleText">The Bhai Bro-Code Opening 🤜🤛</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="broPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge amber-badge">🤜🤛 THE LIVING LEGEND &amp; PARTNER IN CHAOS 🔥⚡</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Brother in Chaos, The Legend 🤜🤛🔥'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || "From wrestling over the TV remote to having each other's back through every storm. Brotherhood forever!"}</p>
            
            <div class="bro-quick-actions">
              <button class="btn-fam-action btn-fistbump" id="btnFistBump">
                🤜🤛 FIST BUMP OF BROTHERHOOD! 🔥
              </button>
            </div>
            <div id="fistBumpFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>The Official Bro-Code 📜</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: BRO CODE PUNCHCARD -->
        <section class="fam-page-card" data-page="2">
          <div class="bhai-code-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📜 The Official Bhai Bro-Code</h2>
            <p class="fam-section-sub" style="text-align:center;">Tap each rule row below to stamp and officially ratify the sacred laws of brotherhood</p>

            <div class="punchcard-table">
              ${broCodeClauses.map(c => `
                <div class="punchcard-row" data-id="${c.id}">
                  <div class="punch-stamp-slot" id="punchSlot_${c.id}">
                    <span class="stamp-icon">⭕</span>
                  </div>
                  <div class="punch-rule-text">
                    <h4>${c.title}</h4>
                    <p>${c.rule}</p>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="punch-counter-pill" id="punchCounter">0 / 5 Clauses Ratified (Tap each row above)</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Co-Op Battle &amp; Life Stats 🎮</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: STATS METRICS -->
        <section class="fam-page-card" data-page="3">
          <h2 class="fam-section-title" style="text-align:center;">🎮 Sibling Co-Op &amp; Battle Stats</h2>
          <p class="fam-section-sub" style="text-align:center;">Scientific measurement of our chaotic, unstoppable partnership</p>

          <div class="bhai-stats-grid">
            ${statMetrics.map(s => `
              <div class="stat-gauge-card">
                <div class="stat-gauge-header">
                  <span class="stat-gauge-label">${s.label}</span>
                  <span class="stat-gauge-val">${s.val}</span>
                </div>
                <div class="stat-gauge-track">
                  <div class="stat-gauge-fill" style="width: ${s.width};"></div>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Chaos Adventure Polaroids 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: POLAROIDS -->
        <section class="fam-page-card" data-page="4">
          <h2 class="fam-section-title" style="text-align:center;">📸 Chronicles of Absolute Chaos</h2>
          <p class="fam-section-sub" style="text-align:center;">Adventures, bad ideas that seemed great at the time, and timeless wins</p>

          <div class="fam-polaroid-row">
            ${polaroids.map((p, i) => `
              <div class="fam-polaroid-card bro-polaroid-card" data-i="${i}">
                <div class="bhai-hazard-tag">LEGEND</div>
                <div class="fam-pol-img-wrap">
                  <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="fam-pol-title">${p.title}</h4>
                <p class="fam-pol-note">${p.note || 'Ride or die'}</p>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Read Bro Treaty 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: BRO WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <h2 class="fam-section-title" style="text-align:center;">💌 The Bro-Fist Sealed Treaty</h2>
          <p class="fam-section-sub" style="text-align:center;">Tap the wax seal to unlock words from your brother in chaos</p>

          <div class="wax-envelope-wrap bro-wax-envelope" id="broEnvelope">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="broFlap"></div>

            <button class="wax-seal-button" id="broWaxSeal" aria-label="Open letter">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">🤜🤛</span>
              </div>
            </button>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Certified Legend Citation 🏆</span>
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

            <div class="cert-ribbon">🔥 BROTHER OF THE YEAR 🔥</div>
            <h2 class="cert-heading">CERTIFIED LIVING LEGEND</h2>
            <div class="cert-recipient">SOLEMNLY CONFERRED UPON: <strong>${data.recipientName || 'BHAI'}</strong></div>
            <p class="cert-body">
              For elite gaming co-op, emergency ride responsiveness, unwavering loyalty, 
              and for being the greatest brother on this planet.
            </p>
            <div class="cert-stamp">⚡ BROTHERS FOR LIFE ⚡</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnBroReplay">
              <span>🔥 Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="broLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY BROTHER 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseBroLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Dear Bhai,</h3>
            <div class="modal-typewriter-text" id="broLetterBody">
              ${(data.letter || `Dear Bhai,\n\nWe have broken things, blamed each other, fought over controllers, and laughed until our stomachs hurt.\n\nYou're not just my brother; you are the one person in this world I can call at any ungodly hour with zero explanation needed. You always have my back, and I will always have yours.\n\nKeep conquering goals, making power moves, and living like the absolute legend you are.\n\nFist bump forever! 🤜🤛🔥`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page switcher engine
  const broPageTitles = [
    { num: 1, title: "The Bhai Bro-Code Opening 🤜🤛" },
    { num: 2, title: "The Official Bro-Code 📜" },
    { num: 3, title: "Co-Op Battle & Life Stats 🎮" },
    { num: 4, title: "Chaos Adventure Polaroids 📸" },
    { num: 5, title: "The Bro-Fist Sealed Treaty 💌" },
    { num: 6, title: "Certified Legend Citation 🏆" }
  ];

  const totalPages = broPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#broStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#broStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#broStageTitleText');
    if (titleText && broPageTitles[currentPage - 1]) {
      titleText.textContent = broPageTitles[currentPage - 1].title;
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
  container.querySelector('#btnBroReplay')?.addEventListener('click', () => goToPage(1));

  // Initialize background music player
  initMusicPlayer(container.querySelector('#broPlayerSlot'), {
    audioTitle: data.audioTitle || "Bhai Anthems & Electric Beats",
    audioSubtitle: data.audioSubtitle || "THE LEGENDARY BROTHERHOOD",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient amber ember particles canvas
  const canvas = container.querySelector('#broStarCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const embers = Array.from({ length: 26 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.4 + Math.random() * 0.9,
      speedX: (Math.random() - 0.5) * 0.6,
      alpha: 0.3 + Math.random() * 0.6,
      color: '#f59e0b'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      embers.forEach(e => {
        e.y -= e.speedY;
        e.x += e.speedX;
        if (e.y < 0) { e.y = height; e.x = Math.random() * width; }
        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
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

  // Interactive Punchcard Logic
  let stampedCount = 0;
  const punchCounter = container.querySelector('#punchCounter');
  container.querySelectorAll('.punchcard-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      const slot = container.querySelector(`#punchSlot_${id}`);
      if (!row.classList.contains('stamped')) {
        row.classList.add('stamped');
        if (slot) slot.innerHTML = `<span class="stamp-icon stamped-check">✓</span>`;
        stampedCount++;
        punchCounter.textContent = `${stampedCount} / 5 Clauses Ratified ✓ (All Enforced!)`;

        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.4 },
          colors: ['#f59e0b', '#d97706', '#ffffff']
        });
      }
    });
  });

  // Fist Bump Button
  const btnFist = container.querySelector('#btnFistBump');
  const fistFeedback = container.querySelector('#fistBumpFeedback');
  let bumpCount = 0;
  btnFist?.addEventListener('click', () => {
    bumpCount++;
    fistFeedback.innerHTML = `🔥 <strong>${bumpCount} Massive Fist Bump${bumpCount > 1 ? 's' : ''} Exchanged!</strong> Unstoppable brotherhood for life. 🤜🤛`;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.35 },
      colors: ['#f59e0b', '#d97706', '#ea580c', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#broWaxSeal');
  const modal = container.querySelector('#broLetterModal');
  const closeBtn = container.querySelector('#btnCloseBroLetter');

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
