// src/viewer/templates/brotherTemplate.js - The Sacred Bhai Bro-Code & Chaotic Sibling Alliance (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playBroTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'stamp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.14);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'fist') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'arcade') {
      [220, 440, 660, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.11);
      });
    }
  } catch (e) {}
}

export function renderBrotherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
    { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
    { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
  ];

  const broCodeClauses = [
    { id: 1, title: "Clause 1: Never Snitch to Mom 🤐", text: "What happens in the sibling chaos stays strictly in the sibling chaos. Zero exceptions under parent interrogation." },
    { id: 2, title: "Clause 2: The Sacred Last Slice Rule 🍕", text: "You must always loudly ask 'Anyone want this?' while already taking a huge bite out of it." },
    { id: 3, title: "Clause 3: TV Controller & Shotgun Privilege 🎮", text: "He who shouts 'SHOTGUN' or grabs the player 1 controller first owns the sovereign rights forever." },
    { id: 4, title: "Clause 4: 2 AM Bailout Guarantee 🚗", text: "No questions asked. If your brother calls at 2 AM stranded with a flat tire or bad date, you pull up immediately." },
    { id: 5, title: "Clause 5: Instant Defense in Public 🛡️", text: "We might roast and tackle each other at home, but if anyone from the outside touches a hair on you, they answer to me." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="broPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport brother-viewport">
      <!-- Ambient Cyber Amber/Cyan Sparks Canvas -->
      <canvas id="broStarCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

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
        <!-- PAGE 1: HERO & FIST BUMP SLAM ARENA -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge amber-badge">🤜🤛 TO MY BROTHER IN CHAOS &amp; DAY ONE RIVAL 🔥⚡</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Brother in Chaos, The Legend 🤜🤛🔥'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'From wrestling over the TV remote to standing shoulder-to-shoulder through everything. Brotherhood forever!'}</p>
            
            <!-- Interactive Slamming Fist Bump Centerpiece -->
            <div class="bro-fist-arena" id="broFistArena" style="position:relative; width:240px; height:120px; margin:20px auto 14px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <div id="leftFist" style="font-size:52px; transform:translateX(-40px); transition:transform 0.2s ease;">🤜</div>
              <div id="fistSparksRing" style="position:absolute; width:60px; height:60px; border-radius:50%; background:radial-gradient(circle, #f59e0b, transparent); opacity:0; pointer-events:none;"></div>
              <div id="rightFist" style="font-size:52px; transform:translateX(40px); transition:transform 0.2s ease;">🤛</div>
            </div>
            <div style="text-align:center; font-size:12px; font-weight:700; color:#f59e0b; letter-spacing:1px; text-transform:uppercase;">
              ✦ Tap Fists to Slam Brotherhood Bump ✦
            </div>

            <div class="bro-quick-actions" style="margin-top:16px;">
              <button class="btn-fam-action btn-fist-bro" id="btnFistBump">
                🤜🤛 Lock In Brotherhood Fist Bump 🔥
              </button>
            </div>
            <div id="fistBumpFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>The Sacred Bro-Code 📜</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: TACTILE BRO-CODE RUBBER STAMP -->
        <section class="fam-page-card" data-page="2">
          <div class="bro-code-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📜 The Official Bhai Bro-Code</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Non-negotiable sibling constitution passed down across generations. Tap clauses to stamp them approved!
            </p>

            <div class="punchcard-container" id="punchcardContainer">
              <div class="punchcard-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                <span class="punchcard-tag" style="font-weight:700; color:#f59e0b;">BRO-CODE CONSTITUTION</span>
                <span class="punch-counter" id="punchCounter" style="font-size:12px; color:#d97706; font-weight:700;">0 / 5 Clauses Ratified</span>
              </div>

              <div class="punchcard-list">
                ${broCodeClauses.map(c => `
                  <div class="punchcard-row" data-id="${c.id}" style="position:relative; cursor:pointer; background:#1e140d; padding:12px; border-radius:10px; margin-bottom:10px; border:1px solid rgba(245,158,11,0.3); transition:all 0.2s ease;">
                    <div class="punchcard-info">
                      <h4 style="margin:0 0 4px 0; color:#fbbf24; font-size:14px;">${c.title}</h4>
                      <p style="margin:0; font-size:12px; line-height:1.45; color:#cbd5e1;">${c.text}</p>
                    </div>
                    <div class="punchcard-slot" id="punchSlot_${c.id}" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); width:32px; height:32px; border-radius:50%; border:2px dashed #f59e0b; display:flex; align-items:center; justify-content:center; font-weight:900;">
                      <span class="stamp-slot-empty"></span>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- Rubber Stamp All Action -->
              <div style="text-align:center; margin-top:14px;">
                <button class="btn-fam-action" id="btnStampAllBro" style="background:linear-gradient(135deg, #dc2626, #991b1b); color:#fff; border-radius:20px; font-weight:800; padding:8px 20px; border:2px solid #f87171;">
                  🔴 SLAM "BRO-CODE RATIFIED" RUBBER STAMP
                </button>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Arcade Turbo Overdrive 🎮</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: ARCADE CO-OP & TURBO OVERDRIVE -->
        <section class="fam-page-card" data-page="3">
          <div class="bro-gaming-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">🎮 Sibling Co-Op &amp; Battle Stats</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Countless all-nighters, broken controllers, and 1v1 rematches that ended in fist fights.
            </p>

            <!-- Arcade Turbo Overdrive Interactive Centerpiece -->
            <div class="arcade-gauge-wrap" style="background:#0f172a; border:2px solid #06b6d4; border-radius:14px; padding:18px; margin-bottom:18px; text-align:center;">
              <div style="font-size:12px; font-weight:800; color:#38bdf8; letter-spacing:1.5px; margin-bottom:6px;">⚡ BHAI ENERGY COMBO OVERDRIVE ⚡</div>
              
              <div style="position:relative; width:100%; height:26px; background:#1e293b; border-radius:13px; overflow:hidden; border:2px solid #0891b2; margin-bottom:10px;">
                <div id="arcadePowerFill" style="width:25%; height:100%; background:linear-gradient(90deg, #06b6d4, #f59e0b, #ef4444); border-radius:11px; transition:width 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);"></div>
              </div>
              
              <div id="arcadeLevelText" style="font-size:16px; font-weight:900; color:#fbbf24; margin-bottom:12px;">LEVEL 100 BROTHER (TAP TO BOOST!)</div>
              
              <button class="btn-fam-action" id="btnBoostBroPower" style="background:#0891b2; color:#fff; font-weight:800; border-radius:24px; padding:8px 24px; border:1px solid #38bdf8;">
                🚀 BOOST OVERDRIVE (+500 XP)
              </button>
            </div>

            <div class="gaming-stats-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <div style="background:#1e140d; padding:12px; border-radius:10px; border:1px solid rgba(245,158,11,0.25); text-align:center;">
                <div style="font-size:24px;">🕹️</div>
                <div style="font-size:18px; font-weight:800; color:#fbbf24;">9,999+</div>
                <div style="font-size:11px; color:#cbd5e1;">Hours Battling Together</div>
              </div>
              <div style="background:#1e140d; padding:12px; border-radius:10px; border:1px solid rgba(245,158,11,0.25); text-align:center;">
                <div style="font-size:24px;">🍕</div>
                <div style="font-size:18px; font-weight:800; color:#fbbf24;">100%</div>
                <div style="font-size:11px; color:#cbd5e1;">Last Slice Theft Success</div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Chronicles of Chaos 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: POLAROIDS SCRAPBOOK -->
        <section class="fam-page-card" data-page="4">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 Chronicles of Absolute Chaos</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:18px;">
              Evidence of our craziest schemes, dumbest ideas, and best memories.
            </p>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:rgba(245,158,11,0.5);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Chaos #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Bro-Fist Sealed Treaty 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: BROTHERHOOD TREATY LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">🤜🤛</div>
              <h3 class="letter-teaser-title">💌 The Bro-Fist Sealed Treaty</h3>
              <p class="letter-teaser-sub">Sealed with zero cheese and 100% unbreakable brotherhood.</p>
              
              <div class="envelope-seal-trigger" id="broWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#ea580c; color:#fff; border:1px solid #f59e0b; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(234,88,12,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Bro Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="broLetterModal">
            <div class="fam-letter-modal-paper" style="background:#fffcf7; color:#1c1216;">
              <button class="btn-close-letter-modal" id="btnCloseBroLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">🤜🤛 🔥 ⚡</span>
                <h3>To Bhai, The Living Legend</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  Dear Bhai,<br><br>
                  We've broken things, made crazy memories, fought like wild animals, and laughed until our stomachs hurt.<br><br>
                  You're not just my brother; you're the one person I can count on anytime, anywhere, with zero questions asked.<br><br>
                  Here's to the brotherhood that will never break. Keep being the absolute legend you are!<br><br>
                  Fist bump forever, bro! 🤜🤛🔥
                `}
              </div>
              <div class="modal-letter-footer">
                <span>Brotherhood Locked For Life,</span>
                <strong>${data.senderName || 'Your Brother in Chaos'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Bhai Hall of Fame 🏆</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFIED LIVING LEGEND -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#f59e0b; background:#1e140d; color:#fef3c7;">
              <div class="fam-cert-seal">🏆</div>
              <div class="fam-cert-kicker" style="color:#f59e0b;">OFFICIAL SIBLING ALLIANCE &amp; HALL OF FAME</div>
              <h2 class="fam-cert-title" style="color:#fbbf24;">CERTIFIED LIVING LEGEND</h2>
              <div class="fam-cert-awarded-to" style="color:#cbd5e1;">This title of sovereign supremacy is awarded to:</div>
              <div class="fam-cert-recipient" style="color:#f59e0b;">${data.recipientName || 'Bhai'}</div>
              <p class="fam-cert-citation" style="color:#e2e8f0;">
                For elite co-op gaming clutches, non-snitching loyalty, unparalleled remote-stealing reflexes, and being the best brother on earth.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label" style="color:#94a3b8;">Bro-Code Stamp</span>
                  <strong style="color:#fbbf24;">RATIFIED FOREVER 🤜🤛</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label" style="color:#94a3b8;">Ratified By</span>
                  <strong style="color:#fbbf24;">${data.senderName || 'Your Brother in Chaos'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnBroReplay">
              <span>🔥 Replay Bhai's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Navigation
  const broPageTitles = [
    { num: 1, title: "The Bhai Bro-Code Opening 🤜🤛" },
    { num: 2, title: "The Sacred Bro-Code 📜" },
    { num: 3, title: "Arcade Co-Op & Turbo Overdrive 🎮" },
    { num: 4, title: "Chronicles of Absolute Chaos 📸" },
    { num: 5, title: "Bro-Fist Sealed Treaty 💌" },
    { num: 6, title: "Certified Living Legend 🏆" }
  ];

  const totalPages = broPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#broStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    const stepPill = container.querySelector('#broStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#broStageTitleText');
    if (titleText && broPageTitles[currentPage - 1]) {
      titleText.textContent = broPageTitles[currentPage - 1].title;
    }

    container.querySelectorAll('.fam-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  container.querySelectorAll('.btn-fam-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playBroTone('arcade');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playBroTone('arcade');
      goToPage(prev);
    });
  });
  container.querySelector('#btnBroReplay')?.addEventListener('click', () => {
    playBroTone('fist');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#broPlayerSlot'), {
    audioTitle: data.audioTitle || "Bhai Anthems & Electric Beats",
    audioSubtitle: data.audioSubtitle || "THE LEGENDARY BROTHERHOOD",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. CYBER NEON SPARKS CANVAS (60FPS INTERACTIVE)
  // =========================================================================
  const canvas = container.querySelector('#broStarCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    const embers = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      alpha: 0.3 + Math.random() * 0.6,
      color: Math.random() > 0.4 ? '#f59e0b' : '#06b6d4'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      embers.forEach(e => {
        e.y -= e.speedY;
        e.x += e.speedX;
        if (e.y < 0) {
          e.y = height;
          e.x = Math.random() * width;
        }

        ctx.fillStyle = e.color;
        ctx.globalAlpha = e.alpha;
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // 2. PAGE 1: SLAMMING FIST BUMP PHYSICS
  // =========================================================================
  const fistArena = container.querySelector('#broFistArena');
  const leftFist = container.querySelector('#leftFist');
  const rightFist = container.querySelector('#rightFist');
  const sparksRing = container.querySelector('#fistSparksRing');
  const btnFist = container.querySelector('#btnFistBump');
  const fistFeedback = container.querySelector('#fistBumpFeedback');
  let bumpCount = 0;

  function executeFistBump() {
    playBroTone('fist');
    bumpCount++;
    if (navigator.vibrate) navigator.vibrate([30, 40, 60]);

    // Slam fists together in center
    gsap.timeline()
      .to([leftFist, rightFist], { x: 0, duration: 0.15, ease: 'power2.in' })
      .to(sparksRing, { scale: 2.2, opacity: 0.9, duration: 0.15 }, '<')
      .to([leftFist], { x: -40, duration: 0.25, ease: 'back.out(2)' })
      .to([rightFist], { x: 40, duration: 0.25, ease: 'back.out(2)' }, '<')
      .to(sparksRing, { scale: 0.5, opacity: 0, duration: 0.25 }, '<');

    fistFeedback.innerHTML = `🔥 <strong>${bumpCount} Massive Fist Bump${bumpCount > 1 ? 's' : ''} Exchanged!</strong> Unstoppable brotherhood for life. 🤜🤛`;

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.38 },
      colors: ['#f59e0b', '#d97706', '#06b6d4', '#ef4444', '#ffffff']
    });
  }

  fistArena?.addEventListener('click', executeFistBump);
  btnFist?.addEventListener('click', executeFistBump);

  // =========================================================================
  // 3. PAGE 2: TACTILE RUBBER STAMP RATIFICATION
  // =========================================================================
  let stampedCount = 0;
  const punchCounter = container.querySelector('#punchCounter');
  const rows = container.querySelectorAll('.punchcard-row');
  const btnStampAll = container.querySelector('#btnStampAllBro');

  function stampRow(row) {
    if (!row.classList.contains('stamped')) {
      row.classList.add('stamped');
      const id = row.getAttribute('data-id');
      const slot = container.querySelector(`#punchSlot_${id}`);
      playBroTone('stamp');

      if (slot) {
        slot.style.background = '#dc2626';
        slot.style.borderColor = '#ef4444';
        slot.innerHTML = `<span style="color:#fff; font-size:16px;">✓</span>`;
        gsap.fromTo(slot, { scale: 2, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' });
      }

      stampedCount++;
      punchCounter.textContent = `${stampedCount} / 5 Clauses Ratified ✓ (All Enforced!)`;

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.45 },
        colors: ['#dc2626', '#f59e0b', '#ffffff']
      });
    }
  }

  rows.forEach(row => {
    row.addEventListener('click', () => stampRow(row));
  });

  btnStampAll?.addEventListener('click', () => {
    rows.forEach(r => stampRow(r));
  });

  // =========================================================================
  // 4. PAGE 3: ARCADE TURBO OVERDRIVE
  // =========================================================================
  const btnBoost = container.querySelector('#btnBoostBroPower');
  const powerFill = container.querySelector('#arcadePowerFill');
  const levelText = container.querySelector('#arcadeLevelText');
  let currentPower = 25;
  let brotherLevel = 100;

  btnBoost?.addEventListener('click', () => {
    playBroTone('arcade');
    currentPower = Math.min(100, currentPower + 25);
    brotherLevel += 200;

    powerFill.style.width = `${currentPower}%`;
    levelText.textContent = `LEVEL ${brotherLevel} BROTHER OVERDRIVE 🔥`;

    gsap.fromTo(levelText, { scale: 1.3 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#06b6d4', '#f59e0b', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#broWaxSeal');
  const modal = container.querySelector('#broLetterModal');
  const closeBtn = container.querySelector('#btnCloseBroLetter');

  seal?.addEventListener('click', () => {
    playBroTone('fist');
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
