// src/viewer/templates/brotherTemplate.js - The Sacred Bhai Bro-Code & Chaotic Sibling Alliance (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playBroTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'engine') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const startFreq = 65 + Math.random() * 20;
      const endFreq = 175 + Math.random() * 45;
      osc.frequency.setValueAtTime(startFreq, now);
      osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.24);
      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.26);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.27);
    } else if (type === 'nitro') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.35);
      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'stamp') {
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
    { title: "Gaming Battles 🎮", image: "/images/vogue_cover.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
    { title: "Brothers for Life 🤜🤛", image: "/images/sunset.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
  ];

  const defaultBroClauses = [
    { id: 1, title: "Clause 1: Never Snitch to Mom 🤐", text: "What happens in the sibling chaos stays strictly in the sibling chaos. Zero exceptions under parent interrogation." },
    { id: 2, title: "Clause 2: The Sacred Last Slice Rule 🍕", text: "You must always loudly ask 'Anyone want this?' while already taking a huge bite out of it." },
    { id: 3, title: "Clause 3: TV Controller & Shotgun Privilege 🎮", text: "He who shouts 'SHOTGUN' or grabs the player 1 controller first owns the sovereign rights forever." },
    { id: 4, title: "Clause 4: 2 AM Bailout Guarantee 🚗", text: "No questions asked. If your brother calls at 2 AM stranded with a flat tire or bad date, you pull up immediately." },
    { id: 5, title: "Clause 5: Instant Defense in Public 🛡️", text: "We might roast and tackle each other at home, but if anyone from the outside touches a hair on you, they answer to me." }
  ];

  let broCodeClauses = (data.broCodeClauses && data.broCodeClauses.length > 0)
    ? JSON.parse(JSON.stringify(data.broCodeClauses))
    : defaultBroClauses;

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="broPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport brother-viewport">
      <!-- Ambient Cyber Amber/Cyan Sparks Canvas -->
      <canvas id="broStarCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="broStepProgressFill" style="width: 20%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="broStageStepPill">PAGE 1 OF 5</span>
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

            <!-- DYNAMIC 60FPS SUPERBIKE HIGHWAY SPRINT ARENA -->
            <div class="bro-bike-arena" id="broBikeArena" style="position:relative; width:100%; max-width:440px; margin:20px auto 14px; border-radius:18px; overflow:hidden; background:linear-gradient(180deg, #090d16 0%, #111827 50%, #1f2937 100%); border:2px solid rgba(245, 158, 11, 0.4); box-shadow:0 12px 35px rgba(0,0,0,0.5), 0 0 20px rgba(245, 158, 11, 0.2);">
              <!-- Canvas for dynamic road, speed lines, exhaust flames, nitro sparks -->
              <canvas id="broBikeCanvas" style="width:100%; height:210px; display:block;"></canvas>

              <!-- Speedometer HUD overlay -->
              <div style="position:absolute; top:12px; left:14px; display:flex; align-items:center; gap:8px; pointer-events:none; z-index:3;">
                <div style="background:rgba(15, 23, 42, 0.88); border:1px solid #f59e0b; padding:4px 10px; border-radius:8px; display:flex; align-items:baseline; gap:4px; box-shadow:0 4px 10px rgba(0,0,0,0.4);">
                  <span style="font-size:18px; font-weight:900; color:#fbbf24; font-family:monospace;" id="broSpeedVal">060</span>
                  <span style="font-size:10px; font-weight:700; color:#94a3b8;">KM/H</span>
                </div>
                <div id="broGearPill" style="background:#dc2626; color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:6px; letter-spacing:1px;">GEAR 3</div>
              </div>

              <!-- Milestone Banner Overlay that flies past on highway -->
              <div id="broMilestoneBanner" style="position:absolute; top:14px; right:14px; background:linear-gradient(90deg, #f59e0b, #dc2626); color:#fff; font-size:10px; font-weight:800; padding:4px 10px; border-radius:20px; letter-spacing:0.8px; opacity:0; transform:translateY(-8px); transition:all 0.3s ease; pointer-events:none; z-index:3; box-shadow:0 2px 10px rgba(220,38,38,0.4);">
                🔥 DAY ONE BROTHER
              </div>

              <!-- Bottom Interactive Throttle & Boost Controls -->
              <div style="position:absolute; bottom:10px; inset-x:0; display:flex; justify-content:center; gap:8px; padding:0 12px; z-index:4;">
                <button type="button" class="btn-bike-throttle" id="btnBroRev" style="flex:1; background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; font-weight:900; font-size:12px; padding:9px 12px; border-radius:12px; border:none; box-shadow:0 4px 12px rgba(245,158,11,0.4); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; user-select:none; -webkit-user-select:none;">
                  <span>🏍️ HOLD / TAP THROTTLE</span>
                </button>
                <button type="button" class="btn-bike-nitro" id="btnBroNitro" style="background:linear-gradient(135deg, #06b6d4, #2563eb); color:#fff; font-weight:900; font-size:12px; padding:9px 14px; border-radius:12px; border:none; box-shadow:0 4px 14px rgba(6,182,212,0.4); cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px; user-select:none; -webkit-user-select:none;">
                  <span>🔥 NITRO 200+</span>
                </button>
              </div>
            </div>

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
                <span class="punch-counter" id="punchCounter" style="font-size:12px; color:#d97706; font-weight:700;">0 / ${broCodeClauses.length} Clauses Ratified</span>
              </div>

              <div class="punchcard-list" id="broPunchcardList">
                ${broCodeClauses.map(c => `
                  <div class="punchcard-row" data-id="${c.id}" style="position:relative; cursor:pointer; background:#0f172a; padding:14px; border-radius:14px; margin-bottom:12px; border:1.5px solid rgba(245,158,11,0.4); box-shadow:0 4px 14px rgba(0,0,0,0.4); transition:all 0.2s ease;">
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

              <!-- Dynamic Bro Add Clause Form -->
              <div style="margin-top:14px; text-align:center; display:flex; flex-direction:column; gap:8px; align-items:center;">
                <button type="button" class="btn-add-bro-clause" id="btnToggleBroAddClause" style="margin: 0 auto;">
                  <span>➕ Add My Custom Bro-Code Clause (For Bro) ✍️</span>
                </button>

                <div id="broAddClauseInlineBox" style="display:none; width:100%; text-align:left; background:#1e293b; border:1.5px dashed #f59e0b; border-radius:14px; padding:14px; box-sizing:border-box;">
                  <div style="font-weight:800; font-size:12px; color:#fbbf24; margin-bottom:8px;">
                    ✍️ ADD BRO-CODE CLAUSE TO CONSTITUTION:
                  </div>
                  <input type="text" id="newBroClauseTitle" placeholder="Clause Title (e.g. Clause ${broCodeClauses.length + 1}: FIFA Loser Buys Shawarma 🍕)" style="width:100%; box-sizing:border-box; padding:8px 10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:#fff; font-size:12px; margin-bottom:8px;" />
                  <textarea id="newBroClauseText" rows="2" placeholder="The sibling rule description..." style="width:100%; box-sizing:border-box; padding:8px 10px; background:#0f172a; border:1px solid #f59e0b; border-radius:8px; color:#fff; font-size:12px; margin-bottom:8px;"></textarea>
                  <div style="display:flex; gap:8px;">
                    <button type="button" id="btnConfirmAddBroClause" style="flex:1; background:linear-gradient(135deg, #10b981, #059669); color:#fff; font-weight:800; font-size:12px; padding:8px 12px; border-radius:8px; border:none; cursor:pointer;">
                      ✅ Ratify & Add Clause
                    </button>
                    <button type="button" id="btnCancelAddBroClause" style="background:#334155; color:#94a3b8; font-weight:700; font-size:12px; padding:8px 12px; border-radius:8px; border:none; cursor:pointer;">
                      Cancel
                    </button>
                  </div>
                </div>

                <!-- Rubber Stamp All Action -->
                <button class="btn-fam-action" id="btnStampAllBro" style="background:linear-gradient(135deg, #dc2626, #991b1b); color:#fff; border-radius:20px; font-weight:800; padding:8px 20px; border:2px solid #f87171; margin-top:2px;">
                  🔴 SLAM "BRO-CODE RATIFIED" RUBBER STAMP
                </button>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Chronicles of Chaos 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: POLAROIDS SCRAPBOOK -->
        <section class="fam-page-card" data-page="3">
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
                  <button type="button" class="btn-download-polaroid" title="Save high-res keepsake" style="margin: 8px auto 2px auto;">
                    📸 Save Keepsake
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Bro-Fist Sealed Treaty 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: BROTHERHOOD TREATY LETTER -->
        <section class="fam-page-card" data-page="4">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">🤜🤛</div>
              <h3 class="letter-teaser-title">💌 The Bro-Fist Sealed Treaty</h3>
              <p class="letter-teaser-sub">Sealed with zero cheese and 100% unbreakable brotherhood.</p>
              
              <div class="envelope-seal-trigger" id="broWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; border:2px solid #fbbf24; padding:12px 24px; border-radius:30px; font-weight:900; box-shadow:0 6px 20px rgba(245,158,11,0.5); display:flex; align-items:center; gap:8px;">
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
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Bhai Hall of Fame 🏆</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: CERTIFIED LIVING LEGEND -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#f59e0b; background:#0b1120; color:#fef3c7; box-shadow:0 12px 35px rgba(245,158,11,0.25);">
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
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
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
    { num: 3, title: "Chronicles of Absolute Chaos 📸" },
    { num: 4, title: "Bro-Fist Sealed Treaty 💌" },
    { num: 5, title: "Certified Living Legend 🏆" }
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

    if (!window.isCelebrationEditorMode) { window.scrollTo({ top: 0, behavior: 'smooth' }); } else if (container) { container.scrollTop = 0; }
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
  // 1B. PAGE 1: 60FPS INTERACTIVE SUPERBIKE HIGHWAY RUN ARENA 🏍️💨
  // =========================================================================
  const bikeCanvas = container.querySelector('#broBikeCanvas');
  const speedValEl = container.querySelector('#broSpeedVal');
  const gearPillEl = container.querySelector('#broGearPill');
  const milestoneEl = container.querySelector('#broMilestoneBanner');
  const btnRev = container.querySelector('#btnBroRev');
  const btnNitro = container.querySelector('#btnBroNitro');

  if (bikeCanvas) {
    const bCtx = bikeCanvas.getContext('2d');
    let bWidth = (bikeCanvas.width = bikeCanvas.offsetWidth || 380);
    let bHeight = (bikeCanvas.height = 210);

    let currentSpeed = 60; // km/h
    let targetSpeed = 60;
    let roadOffset = 0;
    let isReving = false;
    let isNitro = false;
    let flames = [];
    let smokeParticles = [];
    let milestoneIndex = 0;
    const milestones = [
      "🔥 DAY ONE BROTHER",
      "⚡ RIDE OR DIE ALLIANCE",
      "👑 UNSTOPPABLE BROHOOD",
      "🚀 TOP SPEED 240 KM/H!"
    ];

    function spawnFlame(isBlue = false) {
      flames.push({
        x: bWidth / 2 + (Math.random() - 0.5) * 8,
        y: bHeight - 32,
        vx: (Math.random() - 0.5) * 2,
        vy: 2 + Math.random() * 4,
        size: 3 + Math.random() * 6,
        alpha: 1,
        color: isBlue ? '#06b6d4' : (Math.random() > 0.4 ? '#f59e0b' : '#ef4444')
      });
    }

    function spawnSmoke() {
      smokeParticles.push({
        x: bWidth / 2 + (Math.random() - 0.5) * 16,
        y: bHeight - 25,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1 + Math.random() * 2,
        size: 4 + Math.random() * 8,
        alpha: 0.6
      });
    }

    function triggerMilestone() {
      if (!milestoneEl) return;
      milestoneEl.textContent = milestones[milestoneIndex % milestones.length];
      milestoneIndex++;
      gsap.fromTo(milestoneEl, 
        { opacity: 0, y: -10, scale: 0.8 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }
      );
      setTimeout(() => {
        gsap.to(milestoneEl, { opacity: 0, y: -8, duration: 0.3 });
      }, 1800);
    }

    // Interactive button controls
    function startRev() {
      isReving = true;
      targetSpeed = 160;
      playBroTone('engine');
      if (navigator.vibrate) navigator.vibrate([20, 30]);
    }

    function stopRev() {
      isReving = false;
      if (!isNitro) targetSpeed = 60;
    }

    btnRev?.addEventListener('pointerdown', startRev);
    btnRev?.addEventListener('pointerup', stopRev);
    btnRev?.addEventListener('pointercancel', stopRev);
    btnRev?.addEventListener('click', () => {
      startRev();
      setTimeout(stopRev, 600);
    });

    btnNitro?.addEventListener('click', () => {
      isNitro = true;
      targetSpeed = 240;
      playBroTone('nitro');
      if (navigator.vibrate) navigator.vibrate([40, 50, 60]);
      triggerMilestone();
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#06b6d4', '#f59e0b', '#ef4444']
      });
      setTimeout(() => {
        isNitro = false;
        targetSpeed = isReving ? 160 : 60;
      }, 2200);
    });

    function renderBike() {
      bWidth = bikeCanvas.width = bikeCanvas.offsetWidth || 380;
      bHeight = bikeCanvas.height = 210;

      // Speed interpolation
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;
      roadOffset = (roadOffset + currentSpeed * 0.12) % 60;

      // HUD updates
      if (speedValEl) speedValEl.textContent = String(Math.round(currentSpeed)).padStart(3, '0');
      if (gearPillEl) {
        const gear = currentSpeed > 200 ? 'NITRO' : currentSpeed > 150 ? 'GEAR 6' : currentSpeed > 100 ? 'GEAR 5' : 'GEAR 3';
        gearPillEl.textContent = gear;
        gearPillEl.style.background = currentSpeed > 200 ? 'linear-gradient(90deg, #06b6d4, #3b82f6)' : '#dc2626';
      }

      // Draw Horizon & Sky
      const skyGrad = bCtx.createLinearGradient(0, 0, 0, 75);
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(0.5, '#451a03');
      skyGrad.addColorStop(1, '#78350f');
      bCtx.fillStyle = skyGrad;
      bCtx.fillRect(0, 0, bWidth, 75);

      // Sunset sun
      bCtx.fillStyle = '#f59e0b';
      bCtx.beginPath();
      bCtx.arc(bWidth / 2, 60, 22, 0, Math.PI * 2);
      bCtx.fill();

      // Mountain peaks
      bCtx.fillStyle = '#1e1b4b';
      bCtx.beginPath();
      bCtx.moveTo(0, 75);
      bCtx.lineTo(bWidth * 0.2, 45);
      bCtx.lineTo(bWidth * 0.4, 75);
      bCtx.lineTo(bWidth * 0.65, 40);
      bCtx.lineTo(bWidth * 0.85, 75);
      bCtx.lineTo(bWidth, 60);
      bCtx.lineTo(bWidth, 75);
      bCtx.closePath();
      bCtx.fill();

      // Draw Perspective Asphalt Road
      const roadGrad = bCtx.createLinearGradient(0, 75, 0, bHeight);
      roadGrad.addColorStop(0, '#1e293b');
      roadGrad.addColorStop(1, '#0f172a');
      bCtx.fillStyle = roadGrad;
      bCtx.beginPath();
      bCtx.moveTo(bWidth * 0.38, 75);
      bCtx.lineTo(bWidth * 0.62, 75);
      bCtx.lineTo(bWidth * 0.95, bHeight);
      bCtx.lineTo(bWidth * 0.05, bHeight);
      bCtx.closePath();
      bCtx.fill();

      // Yellow Road center dashed stripes
      bCtx.strokeStyle = '#fbbf24';
      bCtx.lineWidth = 4;
      bCtx.setLineDash([20, 16]);
      bCtx.lineDashOffset = -roadOffset;
      bCtx.beginPath();
      bCtx.moveTo(bWidth / 2, 75);
      bCtx.lineTo(bWidth / 2, bHeight);
      bCtx.stroke();
      bCtx.setLineDash([]);

      // Neon road borders
      bCtx.strokeStyle = '#f59e0b';
      bCtx.lineWidth = 2;
      bCtx.beginPath();
      bCtx.moveTo(bWidth * 0.38, 75);
      bCtx.lineTo(bWidth * 0.05, bHeight);
      bCtx.moveTo(bWidth * 0.62, 75);
      bCtx.lineTo(bWidth * 0.95, bHeight);
      bCtx.stroke();

      // Spawn Exhaust flames & smoke when accelerating
      if (isReving || isNitro || currentSpeed > 100) {
        spawnFlame(isNitro);
        if (Math.random() > 0.4) spawnSmoke();
      }

      // Update & Draw Smoke
      smokeParticles.forEach((sp, idx) => {
        sp.y += sp.vy;
        sp.x += sp.vx;
        sp.alpha -= 0.02;
        sp.size += 0.3;
        if (sp.alpha <= 0) {
          smokeParticles.splice(idx, 1);
          return;
        }
        bCtx.fillStyle = `rgba(148, 163, 184, ${sp.alpha})`;
        bCtx.beginPath();
        bCtx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        bCtx.fill();
      });

      // Update & Draw Exhaust Flames
      flames.forEach((fl, idx) => {
        fl.y += fl.vy;
        fl.x += fl.vx;
        fl.alpha -= 0.05;
        fl.size *= 0.92;
        if (fl.alpha <= 0) {
          flames.splice(idx, 1);
          return;
        }
        bCtx.fillStyle = fl.color;
        bCtx.globalAlpha = fl.alpha;
        bCtx.beginPath();
        bCtx.arc(fl.x, fl.y, fl.size, 0, Math.PI * 2);
        bCtx.fill();
        bCtx.globalAlpha = 1;
      });

      // Draw Superbike & Rider (Perspective rear view)
      const bikeX = bWidth / 2 + (Math.sin(Date.now() * 0.015) * (currentSpeed > 150 ? 1.5 : 0.5));
      const bikeY = bHeight - 48;

      // Bike shadow
      bCtx.fillStyle = 'rgba(0,0,0,0.45)';
      bCtx.beginPath();
      bCtx.ellipse(bikeX, bikeY + 22, 28, 7, 0, 0, Math.PI * 2);
      bCtx.fill();

      // Rear superbike wheel (wide racing slick)
      bCtx.fillStyle = '#0f172a';
      bCtx.beginPath();
      bCtx.roundRect(bikeX - 10, bikeY + 2, 20, 24, 6);
      bCtx.fill();

      // Rim reflection
      bCtx.strokeStyle = isNitro ? '#06b6d4' : '#f59e0b';
      bCtx.lineWidth = 2.5;
      bCtx.beginPath();
      bCtx.arc(bikeX, bikeY + 14, 7, 0, Math.PI * 2);
      bCtx.stroke();

      // Dual Exhaust Pipes
      bCtx.fillStyle = '#94a3b8';
      bCtx.fillRect(bikeX - 15, bikeY + 4, 4, 10);
      bCtx.fillRect(bikeX + 11, bikeY + 4, 4, 10);

      // Superbike Aerodynamic Tail Cowl
      bCtx.fillStyle = isNitro ? '#0284c7' : '#ea580c';
      bCtx.beginPath();
      bCtx.moveTo(bikeX - 18, bikeY - 2);
      bCtx.lineTo(bikeX + 18, bikeY - 2);
      bCtx.lineTo(bikeX + 8, bikeY + 12);
      bCtx.lineTo(bikeX - 8, bikeY + 12);
      bCtx.closePath();
      bCtx.fill();

      // Glowing LED Brake Light
      bCtx.fillStyle = '#ef4444';
      bCtx.shadowColor = '#ef4444';
      bCtx.shadowBlur = 10;
      bCtx.fillRect(bikeX - 7, bikeY + 1, 14, 4);
      bCtx.shadowBlur = 0;

      // Rider Torso & Racing Leathers
      bCtx.fillStyle = '#1e293b';
      bCtx.beginPath();
      bCtx.ellipse(bikeX, bikeY - 18, 16, 12, 0, 0, Math.PI * 2);
      bCtx.fill();

      // Rider Helmet
      bCtx.fillStyle = '#0f172a';
      bCtx.beginPath();
      bCtx.arc(bikeX, bikeY - 30, 11, 0, Math.PI * 2);
      bCtx.fill();

      // Visor with reflection
      bCtx.fillStyle = isNitro ? '#38bdf8' : '#fbbf24';
      bCtx.fillRect(bikeX - 7, bikeY - 32, 14, 4);

      requestAnimationFrame(renderBike);
    }
    requestAnimationFrame(renderBike);
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
  // 3. PAGE 2: TACTILE RUBBER STAMP RATIFICATION & BRO ADD CLAUSE
  // =========================================================================
  let stampedCount = 0;
  const punchCounter = container.querySelector('#punchCounter');
  const listContainer = container.querySelector('#broPunchcardList');
  const btnStampAll = container.querySelector('#btnStampAllBro');

  function updatePunchCounter() {
    if (punchCounter) {
      punchCounter.textContent = `${stampedCount} / ${broCodeClauses.length} Clauses Ratified ${stampedCount >= broCodeClauses.length ? '✓ (All Enforced!)' : ''}`;
    }
  }

  function stampRow(row) {
    if (!row.classList.contains('stamped')) {
      row.classList.add('stamped');
      const id = row.getAttribute('data-id');
      const slot = row.querySelector(`#punchSlot_${id}`) || row.querySelector('.punchcard-slot');
      playBroTone('stamp');

      if (slot) {
        slot.style.background = '#dc2626';
        slot.style.borderColor = '#ef4444';
        slot.innerHTML = `<span style="color:#fff; font-size:16px;">✓</span>`;
        gsap.fromTo(slot, { scale: 2, rotate: -20 }, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2)' });
      }

      stampedCount++;
      updatePunchCounter();

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.45 },
        colors: ['#dc2626', '#f59e0b', '#ffffff']
      });
    }
  }

  function bindRowClickListeners() {
    container.querySelectorAll('.punchcard-row').forEach(row => {
      row.onclick = () => stampRow(row);
    });
  }
  bindRowClickListeners();
  updatePunchCounter();

  btnStampAll?.addEventListener('click', () => {
    container.querySelectorAll('.punchcard-row').forEach(r => stampRow(r));
  });

  // Bro Add Clause controls
  const btnToggleAdd = container.querySelector('#btnToggleBroAddClause');
  const boxAdd = container.querySelector('#broAddClauseInlineBox');
  const btnCancelAdd = container.querySelector('#btnCancelAddBroClause');
  const btnConfirmAdd = container.querySelector('#btnConfirmAddBroClause');
  const inpTitle = container.querySelector('#newBroClauseTitle');
  const inpText = container.querySelector('#newBroClauseText');

  btnToggleAdd?.addEventListener('click', () => {
    if (boxAdd) {
      const isHidden = boxAdd.style.display === 'none';
      boxAdd.style.display = isHidden ? 'block' : 'none';
      if (isHidden && inpTitle) inpTitle.focus();
    }
  });

  btnCancelAdd?.addEventListener('click', () => {
    if (boxAdd) boxAdd.style.display = 'none';
  });

  btnConfirmAdd?.addEventListener('click', () => {
    const titleVal = inpTitle?.value?.trim() || `Clause ${broCodeClauses.length + 1}: Bro Honor Rule 🤜🤛`;
    const textVal = inpText?.value?.trim() || `Agreed and ratified by Bhai under sovereign sibling treaty.`;

    const newClause = {
      id: Date.now(),
      title: titleVal,
      text: textVal
    };

    broCodeClauses.push(newClause);
    data.broCodeClauses = broCodeClauses;

    // Render new row
    const rowEl = document.createElement('div');
    rowEl.className = 'punchcard-row';
    rowEl.setAttribute('data-id', newClause.id);
    rowEl.style.cssText = 'position:relative; cursor:pointer; background:#0f172a; padding:14px; border-radius:14px; margin-bottom:12px; border:1.5px solid rgba(245,158,11,0.4); box-shadow:0 4px 14px rgba(0,0,0,0.4); transition:all 0.2s ease;';
    rowEl.innerHTML = `
      <div class="punchcard-info">
        <h4 style="margin:0 0 4px 0; color:#fbbf24; font-size:14px;">${newClause.title}</h4>
        <p style="margin:0; font-size:12px; line-height:1.45; color:#cbd5e1;">${newClause.text}</p>
      </div>
      <div class="punchcard-slot" id="punchSlot_${newClause.id}" style="position:absolute; right:12px; top:50%; transform:translateY(-50%); width:32px; height:32px; border-radius:50%; border:2px dashed #f59e0b; display:flex; align-items:center; justify-content:center; font-weight:900;">
        <span class="stamp-slot-empty"></span>
      </div>
    `;

    listContainer?.appendChild(rowEl);
    bindRowClickListeners();
    updatePunchCounter();

    // Auto-stamp the newly added clause with celebration
    stampRow(rowEl);
    playBroTone('arcade');

    // Reset inputs & close
    if (inpTitle) inpTitle.value = '';
    if (inpText) inpText.value = '';
    if (boxAdd) boxAdd.style.display = 'none';

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10b981', '#f59e0b', '#dc2626', '#ffffff']
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

  // HTML2Canvas Keepsake Polaroid download
  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.fam-polaroid-item');
      if (!card) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Rendering...';
      btn.disabled = true;
      html2canvas(card, { scale: 2, useCORS: true, backgroundColor: '#ffffff' }).then(cvs => {
        const a = document.createElement('a');
        a.download = `bhai-polaroid-keepsake-${Date.now()}.png`;
        a.href = cvs.toDataURL('image/png');
        a.click();
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        btn.innerHTML = '✓ Saved to Photos!';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2200);
      }).catch(err => {
        console.error('Download error:', err);
        btn.innerHTML = 'Download Failed';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 2000);
      });
    });
  });

  // Medium Zoom on Polaroid Images
  try {
    mediumZoom(container.querySelectorAll('.fam-polaroid-img-frame img'), {
      margin: 18,
      background: 'rgba(15, 10, 25, 0.92)'
    });
  } catch (e) {}
}
