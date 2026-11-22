// src/viewer/templates/sisterTemplate.js - Partner in Crime, Wardrobe Thief & Irreplaceable Behna (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playSisTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.03);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === 'shutter') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.16);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.19);
    } else if (type === 'sparkle') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.42);
      });
    }
  } catch (e) {}
}

export function renderSisterTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Partner in Crime 💅", image: "/images/pretty.jpg", note: "From raiding each other's wardrobes to keeping the deepest secrets safe." },
    { title: "Chaos & Blackmail 📸", image: "/images/always_you.jpg", note: "Photos that could ruin each other's reputation, kept as supreme leverage! 😂" },
    { title: "Forever Bestie 💖", image: "/images/beautiful.jpg", note: "No matter how loud our fights get, you are the first person I run to." }
  ];

  const stolenItems = [
    { id: 1, icon: "🧥", item: "Oversized Vintage Hoodie", victim: "Worn without permission for 6 months straight", fine: "1x Large Iced Boba" },
    { id: 2, icon: "🎧", item: "Noise-Cancelling AirPods", victim: "Found mysteriously under her bedroom pillow", fine: "Late-night drive snack" },
    { id: 3, icon: "🍫", item: "Emergency Stash of Dark Chocolate", victim: "Disappeared from the fridge within 20 minutes", fine: "Unlimited fries order" },
    { id: 4, icon: "🧢", item: "Favorite Baseball Cap", victim: "Spotted in her Instagram story looking cute", fine: "Public apology statement" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sisPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport sister-viewport">
      <!-- Ambient Terracotta & Rose Quartz Shimmer Canvas -->
      <canvas id="sisStarCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="sisStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="sisStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="sisStageTitleText">Partner in Crime Opening 💅</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="sisPagesContainer">
        <!-- PAGE 1: HERO & RUNAWAY "WHO IS SMARTER?" BUTTON -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge terracotta-badge">💅 TO MY PERPETUAL HEADACHE &amp; FOREVER BEST FRIEND 💖✨</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Crazy, Annoying, Irreplaceable Sister 💅✨'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'We fight, we steal each other’s clothes, we drive each other insane... but no one has my back like you do!'}</p>
            
            <!-- Interactive "Who is Smarter?" Debate Game -->
            <div class="sister-debate-box" style="margin:20px auto 14px; background:#fff7ed; padding:16px; border-radius:14px; border:1px solid #fdba74; text-align:center;">
              <div style="font-size:12px; font-weight:800; color:#ea580c; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                ⚡ THE ETERNAL SIBLING TRUTH TEST ⚡
              </div>
              <div style="font-size:15px; font-weight:700; color:#431407; margin-bottom:14px;">
                Who is objectively the smarter sibling?
              </div>

              <div style="display:flex; justify-content:center; gap:12px; position:relative; min-height:50px;">
                <button type="button" class="btn-fam-action" id="btnVoteSister" style="background:#ea580c; color:#fff; border-radius:20px; font-weight:800; padding:8px 20px;">
                  Obviously Sister 👑
                </button>
                <button type="button" class="btn-fam-action" id="btnVoteSibling" style="background:#e2e8f0; color:#475569; border-radius:20px; font-weight:800; padding:8px 20px; transition:transform 0.15s ease;">
                  Me (Never!) 😂
                </button>
              </div>
            </div>

            <div class="sis-quick-actions">
              <button class="btn-fam-action btn-tax-sis" id="btnSisterTax">
                🧋 Enforce Sibling Snack Tax (Boba + Fries) 🍟
              </button>
            </div>
            <div id="sisTaxFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Stolen Wardrobe Evidence 👗</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: INTERACTIVE WARDROBE THEFT LOG -->
        <section class="fam-page-card" data-page="2">
          <div class="sis-wardrobe-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">👗 Stolen Wardrobe Evidence Log</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Items 'borrowed indefinitely' without notice. Tap to claim snack reparations!
            </p>

            <div class="theft-items-grid">
              ${stolenItems.map(s => `
                <div class="theft-item-box" data-id="${s.id}" style="position:relative; background:#fff7ed; padding:14px; border-radius:12px; border:1px solid #fdba74; margin-bottom:10px; cursor:pointer; transition:transform 0.2s ease;">
                  <div style="display:flex; align-items:center; gap:12px;">
                    <div class="hanger-icon" style="font-size:32px; transform-origin:top center; transition:transform 0.3s ease;">${s.icon}</div>
                    <div style="flex:1;">
                      <h4 style="margin:0 0 4px 0; font-size:14px; color:#9a3412;">${s.item}</h4>
                      <p style="margin:0 0 6px 0; font-size:12px; color:#78350f;">${s.victim}</p>
                      <span style="font-size:11px; font-weight:700; color:#ea580c; background:#ffedd5; padding:2px 8px; border-radius:10px;">Fine: ${s.fine}</span>
                    </div>
                  </div>
                  <div style="margin-top:10px; text-align:right;">
                    <button type="button" class="btn-claim-fine" data-id="${s.id}" style="font-size:11px; font-weight:700; padding:4px 12px; border-radius:12px; border:none; background:#ea580c; color:#fff; cursor:pointer;">
                      CLAIM REPARATIONS 🧋
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
            <div id="theftSummary" style="text-align:center; font-size:12px; font-weight:700; color:#c2410c; margin-top:10px;"></div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>The 2 AM Gossip Safe ☕</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: ROTARY COMBINATION SAFE (THE GOSSIP VAULT) -->
        <section class="fam-page-card" data-page="3">
          <div class="sis-gossip-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">☕ The 2 AM Gossip &amp; Code Vault</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Where family tea, secret crushes, and middle-of-the-night confessions are locked under armed guard.
            </p>

            <!-- Rotary Combination Safe Lock Interactive Centerpiece -->
            <div class="safe-dial-wrap" style="text-align:center; margin:16px auto;">
              <div id="safeRotaryDial" style="width:170px; height:170px; margin:0 auto; border-radius:50%; background:radial-gradient(circle, #431407 0%, #1c0a03 100%); border:5px solid #ea580c; position:relative; cursor:pointer; box-shadow:0 8px 24px rgba(234,88,12,0.35);">
                <div style="position:absolute; top:8px; left:50%; transform:translateX(-50%); color:#fbbf24; font-weight:900; font-size:14px;">00</div>
                <div style="position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#fbbf24; font-weight:900; font-size:14px;">25</div>
                <div style="position:absolute; bottom:8px; left:50%; transform:translateX(-50%); color:#fbbf24; font-weight:900; font-size:14px;">50</div>
                <div style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#fbbf24; font-weight:900; font-size:14px;">75</div>
                <div id="dialIndicatorNeedle" style="position:absolute; top:50%; left:50%; width:4px; height:70px; background:#ef4444; transform:translate(-50%, -50%) rotate(0deg); transform-origin:center center; border-radius:2px;"></div>
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:22px; height:22px; border-radius:50%; background:#ea580c; border:2px solid #fff;"></div>
              </div>
              <div style="margin-top:10px; font-size:12px; font-weight:700; color:#ea580c;">
                ✦ Spin Dial to Crack Secret Safe ✦
              </div>

              <!-- Unlocked Secret Memories Box -->
              <div id="safeUnlockedContent" style="display:none; margin-top:16px; background:#fff7ed; border:2px dashed #ea580c; border-radius:12px; padding:16px;">
                <div style="font-size:24px; margin-bottom:6px;">🔓✨</div>
                <h4 style="margin:0 0 6px 0; color:#9a3412;">SAFE CRACKED: TOP SECRET SISTER CODES</h4>
                <p style="margin:0; font-size:13px; line-height:1.5; color:#78350f;">
                  “No matter who comes and goes, you and I are locked in forever. The 2 AM gossip sessions never expire, and our secrets go into the grave with us.” 🔒💖
                </p>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Blackmail Archive 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: INSTANT POLAROID CAMERA -->
        <section class="fam-page-card" data-page="4">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 Top-Secret Sibling Leverage Archive</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Photographic evidence capable of ending reputations. Kept purely for negotiation leverage!
            </p>

            <!-- Camera Shutter Snap Centerpiece -->
            <div style="text-align:center; margin-bottom:18px;">
              <button class="btn-fam-action" id="btnSnapPolaroidCamera" style="background:#ea580c; color:#fff; border-radius:20px; font-weight:800; padding:8px 22px;">
                📸 Snap New Sister Blackmail Polaroid
              </button>
            </div>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:rgba(234,88,12,0.4);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/pretty.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Leverage #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Sisterhood Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: SISTERHOOD LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">💅</div>
              <h3 class="letter-teaser-title">💌 Blossom Wax-Seal Sisterhood Letter</h3>
              <p class="letter-teaser-sub">Sealed with unconditional love, boba debt, and zero regrets.</p>
              
              <div class="envelope-seal-trigger" id="sisWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#ea580c; color:#fff; border:1px solid #fed7aa; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(234,88,12,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Sister Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="sisLetterModal">
            <div class="fam-letter-modal-paper" style="background:#fffcf7; color:#1c1216;">
              <button class="btn-close-letter-modal" id="btnCloseSisLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">💅 💖 ✨</span>
                <h3>To My Sister, My Forever Partner in Crime</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  Dear Behna,<br><br>
                  Even though you steal my things and blame me for everything in front of Mom, I wouldn't trade you for the world!<br><br>
                  Thank you for being my secret keeper, my 2 AM gossip buddy, and my forever best friend.<br><br>
                  Whatever life throws at us, remember I will always be right by your side (and will still tease you forever).<br><br>
                  Love you endlessly, my favourite sister! 💖💅✨
                `}
              </div>
              <div class="modal-letter-footer">
                <span>With Love &amp; Endless Blackmail,</span>
                <strong>${data.senderName || 'Your Crazy Sibling'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Sisterhood Crown 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#ea580c; background:#fff7ed; color:#431407;">
              <div class="fam-cert-seal">👑</div>
              <div class="fam-cert-kicker" style="color:#ea580c;">OFFICIAL SIBLING AWARDS COMMISSION</div>
              <h2 class="fam-cert-title" style="color:#9a3412;">BEST SISTER IN THE UNIVERSE</h2>
              <div class="fam-cert-awarded-to" style="color:#78350f;">This award of supreme distinction is granted to:</div>
              <div class="fam-cert-recipient" style="color:#ea580c;">${data.recipientName || 'Behna'}</div>
              <p class="fam-cert-citation" style="color:#431407;">
                For master-level wardrobe infiltration, unmatched 2 AM tea-spilling, fierce loyalty when it matters most, and being completely irreplaceable.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label" style="color:#9a3412;">Sister Status</span>
                  <strong style="color:#ea580c;">QUEEN OF CHAOS 💅</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label" style="color:#9a3412;">Conferred By</span>
                  <strong style="color:#ea580c;">${data.senderName || 'Your Loving Sibling'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnSisReplay">
              <span>💅 Replay Behna's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Navigation
  const sisPageTitles = [
    { num: 1, title: "Partner in Crime Opening 💅" },
    { num: 2, title: "Stolen Wardrobe Evidence Log 👗" },
    { num: 3, title: "The 2 AM Gossip Safe ☕" },
    { num: 4, title: "Top-Secret Blackmail Archive 📸" },
    { num: 5, title: "Blossom Wax-Seal Sisterhood Letter 💌" },
    { num: 6, title: "Best Sister in the Universe 👑" }
  ];

  const totalPages = sisPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#sisStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    const stepPill = container.querySelector('#sisStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#sisStageTitleText');
    if (titleText && sisPageTitles[currentPage - 1]) {
      titleText.textContent = sisPageTitles[currentPage - 1].title;
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
      playSisTone('sparkle');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playSisTone('sparkle');
      goToPage(prev);
    });
  });
  container.querySelector('#btnSisReplay')?.addEventListener('click', () => {
    playSisTone('sparkle');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#sisPlayerSlot'), {
    audioTitle: data.audioTitle || "Sister Anthems & Acoustic Vibes",
    audioSubtitle: data.audioSubtitle || "SOUL SISTERS FOREVER",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. TERRACOTTA & ROSE QUARTZ SHIMMER CANVAS (60FPS)
  // =========================================================================
  const canvas = container.querySelector('#sisStarCanvas');
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

    const sparkles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.8,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      alpha: 0.2 + Math.random() * 0.7,
      color: Math.random() > 0.4 ? '#f97316' : '#f472b6'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach(s => {
        s.y -= s.speedY;
        s.x += s.speedX;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
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
  // 2. PAGE 1: RUNAWAY "WHO IS SMARTER?" BUTTON
  // =========================================================================
  const btnVoteSibling = container.querySelector('#btnVoteSibling');
  const btnVoteSister = container.querySelector('#btnVoteSister');

  function dodgeButton() {
    playSisTone('tick');
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 80;
    gsap.to(btnVoteSibling, { x, y, duration: 0.2, ease: 'back.out(2)' });
  }

  btnVoteSibling?.addEventListener('mouseenter', dodgeButton);
  btnVoteSibling?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
  });

  btnVoteSister?.addEventListener('click', () => {
    playSisTone('sparkle');
    gsap.fromTo(btnVoteSister, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#ea580c', '#fbbf24', '#f472b6', '#ffffff']
    });
  });

  // =========================================================================
  // 3. PAGE 2: WARDROBE HANGER SWING & FINE COLLECTION
  // =========================================================================
  let finesClaimed = 0;
  const theftSummary = container.querySelector('#theftSummary');
  container.querySelectorAll('.theft-item-box').forEach(box => {
    box.addEventListener('click', () => {
      const hanger = box.querySelector('.hanger-icon');
      playSisTone('tick');
      gsap.fromTo(hanger, { rotate: 20 }, { rotate: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
  });

  container.querySelectorAll('.btn-claim-fine').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      playSisTone('sparkle');
      const id = btn.getAttribute('data-id');
      const box = container.querySelector(`.theft-item-box[data-id="${id}"]`);
      if (!btn.disabled) {
        btn.disabled = true;
        btn.textContent = "FINE COLLECTED ✓";
        btn.style.background = "#22c55e";
        box?.classList.add('fine-paid');
        finesClaimed++;
        theftSummary.textContent = `🎉 ${finesClaimed} / 4 Fines Enforced! Sister boba debt is being settled! 🧋`;

        confetti({
          particleCount: 30,
          spread: 55,
          origin: { y: 0.4 },
          colors: ['#ea580c', '#f97316', '#ffffff']
        });
      }
    });
  });

  // =========================================================================
  // 4. PAGE 3: ROTARY SAFE COMBINATION DIAL
  // =========================================================================
  const dial = container.querySelector('#safeRotaryDial');
  const needleEl = container.querySelector('#dialIndicatorNeedle');
  const unlockedContent = container.querySelector('#safeUnlockedContent');
  let currentRot = 0;

  dial?.addEventListener('click', () => {
    playSisTone('tick');
    currentRot += 120;
    gsap.to(needleEl, {
      rotate: currentRot,
      duration: 0.5,
      ease: 'back.out(1.5)',
      onComplete: () => {
        playSisTone('shutter');
        unlockedContent.style.display = 'block';
        gsap.fromTo(unlockedContent, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' });
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.4 },
          colors: ['#ea580c', '#fbbf24', '#ffffff']
        });
      }
    });
  });

  // Camera Flash Snapshot
  container.querySelector('#btnSnapPolaroidCamera')?.addEventListener('click', () => {
    playSisTone('shutter');
    if (navigator.vibrate) navigator.vibrate([20, 30]);

    // Screen flash
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.inset = '0';
    flash.style.background = '#ffffff';
    flash.style.zIndex = '9999';
    flash.style.pointerEvents = 'none';
    flash.style.opacity = '1';
    document.body.appendChild(flash);
    gsap.to(flash, { opacity: 0, duration: 0.35, onComplete: () => flash.remove() });

    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.45 },
      colors: ['#ea580c', '#fbbf24', '#ffffff']
    });
  });

  // Sister Tax Button
  const btnTax = container.querySelector('#btnSisterTax');
  const taxFeedback = container.querySelector('#sisTaxFeedback');
  let taxCount = 0;
  btnTax?.addEventListener('click', () => {
    playSisTone('sparkle');
    taxCount++;
    taxFeedback.innerHTML = `🧋 <strong>Sibling Snack Tax Enforced (${taxCount}x)!</strong> Mandatory Iced Boba & Fries dispatch authorized. 🍟✨`;
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#f97316', '#fbbf24', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#sisWaxSeal');
  const modal = container.querySelector('#sisLetterModal');
  const closeBtn = container.querySelector('#btnCloseSisLetter');

  seal?.addEventListener('click', () => {
    playSisTone('sparkle');
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#f97316', '#fed7aa', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
