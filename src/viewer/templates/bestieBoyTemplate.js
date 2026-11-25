// src/viewer/templates/bestieBoyTemplate.js - Day One Bro, Unbreakable Wingman & Brother for Life (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playBoyTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'scratch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(500 + Math.random() * 350, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (type === 'clink') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1450, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.46);
    } else if (type === 'ping') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(1250, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    }
  } catch (e) {}
}

export function renderBestieBoyTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Day One Legends 👊", image: "/images/sunset.jpg", note: "From day one until the wheels fall off. Real brotherhood never dies." },
    { title: "Chaos on Two Wheels 🏍️", image: "/images/always_you.jpg", note: "Late-night highway runs, sketchy plans that worked out, and unmatched laughs." },
    { title: "Brothers by Choice ⚡", image: "/images/dream_girl.jpg", note: "No matter how much time passes, we pick up right where we left off." }
  ];

  const wingmanCriteria = [
    { label: "Emergency Bailout Availability", score: "100%", desc: "Pulls up within 15 minutes when things get weird." },
    { label: "Wingman Deflection Reflexes", score: "99.8%", desc: "Takes one for the team without hesitating." },
    { label: "Secret Keeping Security", score: "Military Grade", desc: "Secrets are locked in an airtight vault." },
    { label: "Roasting & Honesty Level", score: "10/10 Brutal", desc: "Tells you the raw truth before anyone else." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="boyBestiePlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport bestie-boy-viewport">
      <!-- Ambient Amber/Cobalt Stardust Canvas (60FPS) -->
      <canvas id="bestieBoyCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED RIDE OR DIE BRO OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="bestieBoyGate" role="button" tabindex="0" aria-label="Tap to strike the sacred Bro Code" style="background: radial-gradient(circle at center, #101c2e 0%, #040810 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#38bdf8; box-shadow: 0 0 35px rgba(56,189,248,0.6);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(56,189,248,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            👊⚡
          </div>
          <div class="bro-gate-badge" style="background:rgba(56,189,248,0.18); border-color:#38bdf8; color:#bae6fd;">
            RIDE OR DIE BROTHERHOOD
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(56,189,248,0.6);">
            To My Day One, My Brother 👊
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            Unbreakable bro code, legendary adventures, and zero snitching.
          </p>
          <div class="bro-gate-hint" style="color:#bae6fd; border-color:rgba(56,189,248,0.4); background:rgba(56,189,248,0.12);">
            👊 TAP TO STRIKE THE BRO CODE ⚡
          </div>
        </div>
      </div>

      <!-- Multi-Page Content Cards Container (Continuous Immersive Flow) -->
      <main class="fam-pages-container" id="boyPagesContainer" style="display:flex; flex-direction:column; gap:28px;">
        <!-- PAGE 1: HERO & CLINKING CHEERS STEINS -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge amber-badge">👊 RIDE OR DIE, UNBREAKABLE BROTHERHOOD ⚡🔥</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Day One, My Brother 👊⚡'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'Through every win, every bad decision, and every crazy adventure, you are the one person I can always count on.'}</p>
            
            <!-- Clinking Cheers Steins Centerpiece -->
            <div class="boy-cheers-arena" id="boyCheersArena" style="position:relative; width:220px; height:120px; margin:20px auto 14px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <div id="leftMug" style="font-size:48px; transform:translateX(-30px); transition:transform 0.2s ease;">🍻</div>
              <div id="cheersFoamBurst" style="position:absolute; width:50px; height:50px; border-radius:50%; background:radial-gradient(circle, #fbbf24, transparent); opacity:0; pointer-events:none;"></div>
              <div id="rightMug" style="font-size:48px; transform:translateX(30px); transition:transform 0.2s ease;">🍻</div>
            </div>
            <div style="text-align:center; font-size:12px; font-weight:700; color:#f59e0b; letter-spacing:1px; text-transform:uppercase;">
              ✦ Tap Steins to Smash Brotherhood Toast ✦
            </div>

            <div class="boy-quick-actions" style="margin-top:16px;">
              <button class="btn-fam-action btn-vault-fist" id="btnBroVaultFist">
                👊 Exchange Lifetime Brotherhood Fist Bump 🔥
              </button>
            </div>
            <div id="broVaultFeedback" class="fam-feedback-text"></div>

            <!-- GEN-Z RAGE-BAIT: RUNAWAY GROUP CHAT LEAK BUTTON -->
            <div class="boy-ragebait-card" style="margin:22px auto 14px; background:rgba(15,23,42,0.92); border:1.5px solid rgba(245,158,11,0.5); border-radius:18px; padding:18px 16px; text-align:center; box-shadow:0 10px 28px rgba(0,0,0,0.4); max-width:440px;">
              <div style="font-size:11px; font-weight:800; color:#f59e0b; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                ⚡ THE SACRED GROUP CHAT PROTOCOL ⚡
              </div>
              <div style="font-size:15px; font-weight:800; color:#fff; margin-bottom:14px;">
                Should we leak the 3 AM screenshots to the public?
              </div>
              <div style="display:flex; justify-content:center; gap:12px; position:relative; min-height:52px; align-items:center;">
                <button type="button" class="btn-fam-action" id="btnLeakChat" style="background:#1e293b; color:#fbbf24; border-radius:20px; font-weight:800; padding:10px 22px; border:1px solid #f59e0b; transition:transform 0.15s ease; user-select:none; -webkit-user-select:none;">
                  Leak Everything 😂
                </button>
                <button type="button" class="btn-fam-action" id="btnProtectChat" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; border-radius:20px; font-weight:800; padding:10px 22px; box-shadow:0 4px 14px rgba(245,158,11,0.4);">
                  Protect Code of Silence 🔒
                </button>
              </div>
              <div id="boyRageToast" style="margin-top:10px; font-weight:800; font-size:13px; color:#f87171; min-height:20px; transition:all 0.2s ease;"></div>
            </div>

            <!-- WINGMAN AURA METER -->
            <div class="boy-aura-card" style="margin:16px auto; background:rgba(15,23,42,0.92); border:1.5px solid rgba(56,189,248,0.4); border-radius:18px; padding:16px; text-align:center; max-width:440px; box-shadow:0 8px 24px rgba(0,0,0,0.3);">
              <div style="font-size:11px; font-weight:800; color:#38bdf8; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">
                ⚡ DAY ONE WINGMAN AURA LEVEL ⚡
              </div>
              <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin:8px 0;">
                <span style="font-size:32px; font-weight:900; color:#38bdf8; font-family:monospace;" id="boyAuraScore">+1,000,000</span>
                <span style="font-size:11px; font-weight:800; background:#0369a1; color:#e0f2fe; padding:2px 8px; border-radius:10px;" id="boyAuraRank">CERTIFIED GIGACHAD 🗿</span>
              </div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:10px;">
                <button type="button" id="btnBoostBoyAura" style="background:linear-gradient(135deg, #06b6d4, #0284c7); color:#fff; font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; border:none; cursor:pointer;">
                  ⚡ Clutch Play (+25k)
                </button>
                <button type="button" id="btnLeftOnRead" style="background:rgba(239,68,68,0.2); color:#fca5a5; border:1px solid rgba(239,68,68,0.4); font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; cursor:pointer;">
                  💀 Left on Read (-10k)
                </button>
              </div>
            </div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Wingman Radar Scorecard 📊</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: WINGMAN RADAR SCANNER -->
        <section class="fam-page-card" data-page="2">
          <div class="boy-scorecard-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📊 The Wingman Reliability Scorecard</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Audited by the Universal Brotherhood Association. Certified 100% reliable.
            </p>

            <!-- Rotating Radar Scanner Centerpiece -->
            <div class="radar-scanner-box" style="width:160px; height:160px; margin:0 auto 16px; border-radius:50%; background:radial-gradient(circle, #022c22 0%, #064e3b 100%); border:3px solid #10b981; position:relative; overflow:hidden; box-shadow:0 0 20px rgba(16,185,129,0.3); cursor:pointer;" id="radarScannerArena">
              <!-- Radar grid rings -->
              <div style="position:absolute; inset:20px; border:1px solid rgba(16,185,129,0.4); border-radius:50%;"></div>
              <div style="position:absolute; inset:45px; border:1px solid rgba(16,185,129,0.3); border-radius:50%;"></div>
              <!-- Radar sweeping line -->
              <div id="radarSweepLine" style="position:absolute; top:50%; left:50%; width:75px; height:2px; background:linear-gradient(90deg, #10b981, transparent); transform-origin:left center; transform:rotate(0deg);"></div>
              <!-- Center blip -->
              <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:10px; height:10px; border-radius:50%; background:#34d399; box-shadow:0 0 8px #34d399;"></div>
            </div>
            <div style="text-align:center; font-size:11px; font-weight:700; color:#10b981; margin-bottom:14px;">
              ✦ Tap Radar to Ping Wingman Location ✦
            </div>

            <div class="scorecard-criteria-list">
              ${wingmanCriteria.map(c => `
                <div style="background:#1e140d; padding:12px; border-radius:10px; border:1px solid rgba(245,158,11,0.25); margin-bottom:8px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <strong style="color:#fbbf24; font-size:13px;">${c.label}</strong>
                    <span style="font-weight:900; color:#10b981; font-size:13px;">${c.score}</span>
                  </div>
                  <p style="margin:0; font-size:12px; color:#cbd5e1;">${c.desc}</p>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Day One Hall of Fame 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: DAY ONE HALL OF FAME -->
        <section class="fam-page-card" data-page="3">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 The Day One Hall of Fame</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:18px;">
              Moments that cemented an unbreakable brotherhood across the years.
            </p>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:rgba(245,158,11,0.5);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Memory #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                  <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 8px auto 2px auto;">
                    📸 Save Keepsake
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Silver Scratch Pass 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: REAL METALLIC SILVER SCRATCH-OFF CARD -->
        <section class="fam-page-card" data-page="4">
          <div class="boy-scratch-card" style="text-align:center;">
            <h2 class="fam-section-title" style="margin-bottom:6px;">🎟️ The Official Day One Pass</h2>
            <p class="fam-section-desc" style="margin-bottom:16px;">
              Scratch off the metallic silver foil with your finger or mouse to reveal your lifetime credentials!
            </p>

            <!-- Interactive Scratch Card Canvas Frame -->
            <div style="position:relative; width:280px; height:160px; margin:0 auto 16px; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(245,158,11,0.3); border:2px solid #f59e0b;">
              <!-- Underneath secret prize content -->
              <div style="position:absolute; inset:0; background:radial-gradient(circle, #1e140d, #0d0805); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:14px; box-sizing:border-box; color:#fff;">
                <div style="font-size:28px;">🏆⚡👊</div>
                <div style="font-weight:900; font-size:14px; color:#fbbf24; margin-top:4px;">LIFETIME WINGMAN PASS</div>
                <div style="font-size:11px; color:#cbd5e1; font-weight:700;">PRIORITY BAILOUT • 24/7 BROTHERHOOD</div>
              </div>

              <!-- Scratch-off Canvas Foil Top Layer -->
              <canvas id="boyScratchCanvas" width="280" height="160" style="position:absolute; inset:0; width:100%; height:100%; cursor:crosshair; touch-action:none;"></canvas>
            </div>
            
            <div style="font-size:11px; font-weight:700; color:#f59e0b; text-transform:uppercase;">
              ✦ Rub Finger to Scratch Silver Foil ✦
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Brotherhood Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: BROTHERHOOD LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">👊</div>
              <h3 class="letter-teaser-title">💌 Bro-Fist Wax-Sealed Brotherhood Letter</h3>
              <p class="letter-teaser-sub">Sealed with loyalty, mutual respect, and zero sugarcoating.</p>
              
              <div class="envelope-seal-trigger" id="boyWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#ea580c; color:#fff; border:1px solid #f59e0b; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(234,88,12,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Bro Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="boyLetterModal">
            <div class="fam-letter-modal-paper" style="background:#fffcf7; color:#1c1216;">
              <button class="btn-close-letter-modal" id="btnCloseBoyLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">👊 ⚡ 🔥</span>
                <h3>To My Brother, My Day One</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  Yo Brother,<br><br>
                  People come and go, but having a brother who has your back through thick and thin is the biggest blessing in life.<br><br>
                  From wild schemes that almost got us into serious trouble to the quiet moments where we pushed each other to be better, you've always stood solid.<br><br>
                  Thank you for being someone I never have to fake it with. Here's to 100 more years of crazy adventures and unbroken loyalty.<br><br>
                  Fist bump forever, my brother! 👊⚡🔥
                `}
              </div>
              <div class="modal-letter-footer">
                <span>Solid for Life,</span>
                <strong>${data.senderName || 'Your Day One'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Living Legend Crown 🏆</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#f59e0b; background:#1e140d; color:#fef3c7;">
              <div class="fam-cert-seal">🏆</div>
              <div class="fam-cert-kicker" style="color:#f59e0b;">OFFICIAL BROTHERHOOD CONFERMENT</div>
              <h2 class="fam-cert-title" style="color:#fbbf24;">CERTIFIED LIVING LEGEND</h2>
              <div class="fam-cert-awarded-to" style="color:#cbd5e1;">This title of sovereign supremacy is awarded to:</div>
              <div class="fam-cert-recipient" style="color:#f59e0b;">${data.recipientName || 'Bro'}</div>
              <p class="fam-cert-citation" style="color:#e2e8f0;">
                For flawless loyalty, legendary clutch moments, unmatched wingman execution, and being an irreplaceable brother for life.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label" style="color:#94a3b8;">Bro-Code Status</span>
                  <strong style="color:#fbbf24;">LIFETIME DAY ONE 👊</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label" style="color:#94a3b8;">Confirmed By</span>
                  <strong style="color:#fbbf24;">${data.senderName || 'Your Day One'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnBoyReplay">
              <span>🔥 Replay Bro's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Navigation
  const boyPageTitles = [
    { num: 1, title: "Bro Code Opening 👊⚡" },
    { num: 2, title: "Wingman Radar Scorecard 📊" },
    { num: 3, title: "Day One Hall of Fame 📸" },
    { num: 4, title: "The Official Day One Pass 🎟️" },
    { num: 5, title: "Brotherhood Letter 💌" },
    { num: 6, title: "Certified Living Legend 🏆" }
  ];

  // Opener Gate Execution
  const boyGate = container.querySelector('#bestieBoyGate');
  if (boyGate) {
    const executeOpenBoyGate = () => {
      if (boyGate.classList.contains('is-open')) return;
      playBoyTone('clink');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#38bdf8', '#0ea5e9', '#f59e0b', '#ffffff']
      });
      boyGate.classList.add('is-open');
    };
    boyGate.addEventListener('click', executeOpenBoyGate);
  }

  const totalPages = boyPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    const targetPage = Math.max(1, Math.min(totalPages, page));
    const cards = container.querySelectorAll('.fam-page-card');
    const currentCard = container.querySelector(`.fam-page-card[data-page="${currentPage}"]`);
    const targetCard = container.querySelector(`.fam-page-card[data-page="${targetPage}"]`);
    if (!targetCard) return;

    if (currentCard && currentCard !== targetCard) {
      gsap.to(currentCard, {
        opacity: 0,
        y: -15,
        scale: 0.98,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => {
          cards.forEach(c => {
            c.style.display = 'none';
            c.classList.remove('active');
          });
          targetCard.style.display = 'block';
          targetCard.style.opacity = '0';
          targetCard.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });

          gsap.fromTo(targetCard,
            { opacity: 0, y: 20, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.2)' }
          );
          currentPage = targetPage;
        }
      });
    } else {
      cards.forEach(c => {
        if (c.getAttribute('data-page') == targetPage) {
          c.style.display = 'block';
          c.classList.add('active');
          c.style.opacity = '1';
        } else {
          c.style.display = 'none';
          c.classList.remove('active');
        }
      });
      currentPage = targetPage;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Activate Page 1 initially
  goToPage(1);

  container.querySelectorAll('.btn-fam-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playBoyTone('clink');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playBoyTone('clink');
      goToPage(prev);
    });
  });
  container.querySelector('#btnBoyReplay')?.addEventListener('click', () => {
    playBoyTone('clink');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#boyBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Day One Anthem & Heavy Bass",
    audioSubtitle: data.audioSubtitle || "BROTHERHOOD FOR LIFE",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. AMBER & COBALT STARDUST CANVAS (60FPS)
  // =========================================================================
  const canvas = container.querySelector('#bestieBoyCanvas');
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

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      color: Math.random() > 0.4 ? '#f59e0b' : '#38bdf8'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    requestAnimationFrame(anim);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // 2. PAGE 1: CLINKING CHEERS STEINS
  // =========================================================================
  const cheersArena = container.querySelector('#boyCheersArena');
  const leftMug = container.querySelector('#leftMug');
  const rightMug = container.querySelector('#rightMug');
  const foamBurst = container.querySelector('#cheersFoamBurst');

  cheersArena?.addEventListener('click', () => {
    playBoyTone('clink');
    if (navigator.vibrate) navigator.vibrate([25, 35, 50]);

    gsap.timeline()
      .to([leftMug, rightMug], { x: 0, duration: 0.15, ease: 'power2.in' })
      .to(foamBurst, { scale: 2.2, opacity: 0.85, duration: 0.15 }, '<')
      .to(leftMug, { x: -30, duration: 0.25, ease: 'back.out(2)' })
      .to(rightMug, { x: 30, duration: 0.25, ease: 'back.out(2)' }, '<')
      .to(foamBurst, { scale: 0.5, opacity: 0, duration: 0.25 }, '<');

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.38 },
      colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#ffffff']
    });
  });

  // =========================================================================
  // GEN-Z RAGE-BAIT: RUNAWAY GROUP CHAT BUTTON & WINGMAN AURA
  // =========================================================================
  const btnLeakChat = container.querySelector('#btnLeakChat');
  const btnProtectChat = container.querySelector('#btnProtectChat');
  const boyRageToast = container.querySelector('#boyRageToast');

  const boyRageQuotes = [
    "Bro really thought 💀",
    "DECLINED! Federal group chat treaty violated 😂",
    "Error 404: Snitches Not Found 📉",
    "-500,000 Aura for even thinking about it 🗿",
    "L + Ratio + Zero loyalty detected 🧢",
    "Nice try, this vault is encrypted forever 🔒"
  ];

  function dodgeLeakButton() {
    playBoyTone('clink');
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 80;
    gsap.to(btnLeakChat, { x, y, duration: 0.2, ease: 'back.out(2)' });
    const randomQuote = boyRageQuotes[Math.floor(Math.random() * boyRageQuotes.length)];
    if (boyRageToast) boyRageToast.textContent = randomQuote;
    if (navigator.vibrate) navigator.vibrate(20);
  }

  btnLeakChat?.addEventListener('mouseenter', dodgeLeakButton);
  btnLeakChat?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeLeakButton();
  });

  btnProtectChat?.addEventListener('click', () => {
    playBoyTone('ping');
    if (boyRageToast) boyRageToast.innerHTML = "🔒 <strong>BROTHERHOOD CODE HONORED!</strong> Secrets safe in the vault forever. 👊🔥";
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#38bdf8', '#fbbf24', '#10b981', '#ffffff']
    });
  });

  // Wingman Aura Tracker
  let boyAura = 1000000;
  const boyAuraScore = container.querySelector('#boyAuraScore');
  const boyAuraRank = container.querySelector('#boyAuraRank');
  const btnBoostBoyAura = container.querySelector('#btnBoostBoyAura');
  const btnLeftOnRead = container.querySelector('#btnLeftOnRead');

  btnBoostBoyAura?.addEventListener('click', () => {
    boyAura += 25000;
    playBoyTone('clink');
    if (boyAuraScore) boyAuraScore.textContent = '+' + boyAura.toLocaleString();
    if (boyAuraRank) boyAuraRank.textContent = "COSMIC GIGACHAD 🗿⚡";
    gsap.fromTo(boyAuraScore, { scale: 1.3, color: '#34d399' }, { scale: 1, color: '#38bdf8', duration: 0.3 });
  });

  btnLeftOnRead?.addEventListener('click', () => {
    boyAura -= 10000;
    playBoyTone('clink');
    if (boyAuraScore) boyAuraScore.textContent = (boyAura >= 0 ? '+' : '') + boyAura.toLocaleString();
    if (boyAuraRank) boyAuraRank.textContent = "TEMPORARY SNOOZE 📉";
    gsap.fromTo(boyAuraScore, { scale: 0.85, color: '#f87171' }, { scale: 1, color: '#38bdf8', duration: 0.3 });
  });

  // =========================================================================
  // 3. PAGE 2: RADAR SWEEP SCANNER
  // =========================================================================
  const radarArena = container.querySelector('#radarScannerArena');
  const sweepLine = container.querySelector('#radarSweepLine');
  let radarAngle = 0;

  function animRadar() {
    radarAngle += 2.5;
    if (sweepLine) sweepLine.style.transform = `rotate(${radarAngle}deg)`;
    requestAnimationFrame(animRadar);
  }
  requestAnimationFrame(animRadar);

  radarArena?.addEventListener('click', () => {
    playBoyTone('ping');
    gsap.fromTo(radarArena, { scale: 1.1 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#10b981', '#34d399', '#ffffff']
    });
  });

  // =========================================================================
  // 4. PAGE 4: REAL HTML5 CANVAS SILVER SCRATCH-OFF CARD
  // =========================================================================
  const scratchCanvas = container.querySelector('#boyScratchCanvas');
  if (scratchCanvas) {
    const sCtx = scratchCanvas.getContext('2d');
    const sW = scratchCanvas.width;
    const sH = scratchCanvas.height;

    // Metallic silver foil gradient
    const grad = sCtx.createLinearGradient(0, 0, sW, sH);
    grad.addColorStop(0, '#94a3b8');
    grad.addColorStop(0.3, '#f1f5f9');
    grad.addColorStop(0.6, '#cbd5e1');
    grad.addColorStop(1, '#64748b');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, sW, sH);

    // Silver flakes
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 40; i++) {
      sCtx.beginPath();
      sCtx.arc(Math.random() * sW, Math.random() * sH, Math.random() * 2 + 1, 0, Math.PI * 2);
      sCtx.fill();
    }

    // Overlay text
    sCtx.fillStyle = '#1e293b';
    sCtx.font = 'bold 14px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('★ SCRATCH WITH FINGER TO UNLOCK ★', sW / 2, sH / 2 + 5);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      playBoyTone('scratch');
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const x = (clientX - rect.left) * (scratchCanvas.width / rect.width);
      const y = (clientY - rect.top) * (scratchCanvas.height / rect.height);

      sCtx.globalCompositeOperation = 'destination-out';
      sCtx.beginPath();
      sCtx.arc(x, y, 18, 0, Math.PI * 2);
      sCtx.fill();
    }

    scratchCanvas.addEventListener('pointerdown', (e) => {
      isScratching = true;
      scratchCanvas.setPointerCapture(e.pointerId);
      scratch(e);
    });
    scratchCanvas.addEventListener('pointermove', scratch);
    const stopScratch = () => { isScratching = false; };
    scratchCanvas.addEventListener('pointerup', stopScratch);
    scratchCanvas.addEventListener('pointercancel', stopScratch);
  }

  // Fist Bump Button
  const btnFist = container.querySelector('#btnBroVaultFist');
  const feedback = container.querySelector('#broVaultFeedback');
  let count = 0;
  btnFist?.addEventListener('click', () => {
    playBoyTone('clink');
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
    playBoyTone('clink');
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

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.fam-polaroid-img-frame img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.fam-polaroid-item');
      if (!card) return;
      const originalText = btn.innerHTML;
      btn.innerHTML = '⏳ Rendering...';
      btn.style.opacity = '0.7';

      html2canvas(card, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      }).then(canvas => {
        const link = document.createElement('a');
        link.download = `bestie-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#f59e0b', '#d97706', '#ea580c', '#ffffff']
        });
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.opacity = '1';
        }, 2200);
      }).catch(() => {
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
      });
    });
  });
}
