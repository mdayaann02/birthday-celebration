// src/viewer/templates/fatherTemplate.js - The Anchor, Life Compass & Hero (Father Celebration - Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playDadTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.04);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.045);
    } else if (type === 'brass') {
      [130.81, 164.81, 196.00, 261.63].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.15, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.65);
      });
    } else if (type === 'strike') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    }
  } catch (e) {}
}

export function renderFatherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Quiet Strength 🛡️", image: "/images/sunset.jpg", note: "Working through sleepless days so our future would shine bright." },
    { title: "Life's Compass 🧭", image: "/images/always_you.jpg", note: "Teaching us integrity, honor, and how to stand tall in any storm." },
    { title: "My First Hero 🌟", image: "/images/dream_girl.jpg", note: "No cape, no armor, just a father who gave us everything." }
  ];

  const compassVirtues = [
    { dir: "N", angle: 0, label: "NORTH: INTEGRITY 🧭", quote: "A man's true wealth is his word. Stand firm on your principles, even when standing completely alone." },
    { dir: "E", angle: 90, label: "EAST: SILENT SACRIFICE 🛡️", quote: "Never let the world see you sweat when shielding those you love. Work quietly; let your character be your voice." },
    { dir: "S", angle: 180, label: "SOUTH: UNWAVERING GRIT 🔨", quote: "Tough times never last, but tough people do. Get back up, brush the dust off, and keep moving forward." },
    { dir: "W", angle: 270, label: "WEST: UNCONDITIONAL SHELTER 🌟", quote: "No matter how high you climb or how hard you stumble, Papa's door and arms will always be wide open." }
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

    <div class="fam-page-viewport fam-storybook-viewport father-viewport">
      <!-- Ambient Bronze Stardust Canvas (60FPS Celestial) -->
      <canvas id="dadStarCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="dadStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="dadStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="dadStageTitleText">The First Hero Tribute 🌟</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="dadPagesContainer">
        <!-- PAGE 1: HERO & SHIELD OF HONOR -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge bronze-badge">🧭 TO MY LIFE'S STEADY ANCHOR &amp; FIRST HERO 🛡️🌟</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Father: The Unsung Hero 🌟'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || "A father's sacrifice is quiet, yet it moves mountains. Thank you for being the unshakeable foundation of my life."}</p>
            
            <!-- Interactive Golden Shield of Honor Centerpiece -->
            <div class="dad-shield-arena" id="dadShieldArena" style="margin:24px auto 14px; text-align:center; cursor:pointer;">
              <div class="shield-glowing-ring" id="shieldGlowRing" style="width:110px; height:110px; margin:0 auto; border-radius:50%; background:radial-gradient(circle, rgba(217,119,6,0.35) 0%, rgba(197,155,39,0.15) 60%, transparent 80%); display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(197,155,39,0.3); transition:transform 0.3s ease;">
                <span id="dadShieldIcon" style="font-size:52px; filter:drop-shadow(0 4px 12px rgba(180,83,9,0.4)); display:inline-block; transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">🛡️</span>
              </div>
              <div style="margin-top:10px; font-size:12px; font-weight:700; color:#d97706; letter-spacing:1px; text-transform:uppercase;">
                ✦ Tap Shield of Honor to Forge Strength ✦
              </div>
            </div>

            <div class="dad-quick-actions">
              <button class="btn-fam-action btn-trophy-dad" id="btnAwardTrophy">
                🏆 Present #1 Best Father Medal of Honor 🌟
              </button>
            </div>
            <div id="trophyFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Papa's Wisdom Compass 🧭</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: 3D MAGNETIC WISDOM COMPASS -->
        <section class="fam-page-card" data-page="2">
          <div class="dad-compass-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">🧭 Papa's Wisdom Compass</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Whenever life feels uncertain, a father's principles point to true north. Spin or drag the brass compass.
            </p>

            <div class="compass-interactive-wrap" style="position:relative; width:220px; height:220px; margin:0 auto 16px;">
              <div class="compass-bezel" id="dadCompassArena" style="width:220px; height:220px; border-radius:50%; background:radial-gradient(circle, #2d2013 0%, #17100b 100%); border:4px solid #c59b27; box-shadow:0 8px 30px rgba(0,0,0,0.5), inset 0 0 20px rgba(197,155,39,0.3); position:relative; cursor:pointer;">
                <!-- Dial markings -->
                <div style="position:absolute; top:8px; left:50%; transform:translateX(-50%); font-weight:900; color:#fbbf24; font-size:14px;">N</div>
                <div style="position:absolute; bottom:8px; left:50%; transform:translateX(-50%); font-weight:900; color:#c59b27; font-size:14px;">S</div>
                <div style="position:absolute; right:10px; top:50%; transform:translateY(-50%); font-weight:900; color:#c59b27; font-size:14px;">E</div>
                <div style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-weight:900; color:#c59b27; font-size:14px;">W</div>
                
                <!-- Center Pivot -->
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:16px; height:16px; border-radius:50%; background:#c59b27; border:2px solid #fff; z-index:3; box-shadow:0 0 10px rgba(197,155,39,0.6);"></div>

                <!-- 3D Magnetic Needle -->
                <div id="compassNeedle" style="position:absolute; top:50%; left:50%; width:8px; height:150px; transform:translate(-50%, -50%) rotate(0deg); transform-origin:center center; transition:transform 0.2s ease-out; z-index:2; pointer-events:none;">
                  <div style="width:0; height:0; border-left:7px solid transparent; border-right:7px solid transparent; border-bottom:75px solid #dc2626; margin:0 auto; filter:drop-shadow(0 -2px 6px rgba(220,38,38,0.5));"></div>
                  <div style="width:0; height:0; border-left:7px solid transparent; border-right:7px solid transparent; border-top:75px solid #94a3b8; margin:0 auto;"></div>
                </div>
              </div>
            </div>

            <!-- Spin / Direction Controls -->
            <div style="text-align:center; margin-bottom:14px;">
              <button class="btn-fam-action" id="btnSpinCompass" style="padding:8px 18px; font-size:13px; background:linear-gradient(135deg, #b45309, #78350f); color:#fef3c7; border:1px solid #c59b27; border-radius:20px; font-weight:700;">
                🎲 Spin Papa's Compass Dial
              </button>
            </div>

            <div class="compass-virtues-grid" style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-bottom:14px;">
              ${compassVirtues.map((v, i) => `
                <button type="button" class="compass-dir-btn ${i === 0 ? 'active' : ''}" data-dir="${i}" style="padding:6px 12px; border-radius:8px; border:1px solid rgba(197,155,39,0.4); background:rgba(45,32,19,0.6); color:#fef3c7; font-weight:700; font-size:12px; cursor:pointer;">
                  ${v.dir} (${v.label.split(':')[0]})
                </button>
              `).join('')}
            </div>

            <div class="compass-lesson-card" id="compassLessonCard" style="background:#261b12; border:1px solid #c59b27; border-radius:12px; padding:16px; text-align:center; color:#fef3c7;">
              <div class="compass-lesson-badge" id="lessonBadge" style="font-size:12px; font-weight:800; color:#fbbf24; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">NORTH: INTEGRITY 🧭</div>
              <p class="compass-lesson-quote" id="lessonQuote" style="font-size:14px; line-height:1.6; font-style:italic; margin:0;">“${compassVirtues[0].quote}”</p>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Unspoken Battles 🛡️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: MECHANICAL POCKET WATCH & BATTLES -->
        <section class="fam-page-card" data-page="3">
          <div class="dad-sacrifices-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">🛡️ The Unspoken Battles Timeline</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              A father absorbs the shocks of the world so his children only feel the cushions.
            </p>

            <!-- Vintage Mechanical Pocket Watch Canvas -->
            <div style="position:relative; width:150px; height:150px; margin:0 auto 18px;" id="dadWatchArena">
              <canvas id="dadWatchCanvas" width="150" height="150" style="width:150px; height:150px; display:block; margin:0 auto; cursor:pointer;"></canvas>
              <div style="text-align:center; font-size:11px; font-weight:700; color:#c59b27; margin-top:2px;">
                ✦ Papa's Enduring Hours ⏳ ✦
              </div>
            </div>

            <div class="sacrifice-timeline-list">
              ${sacrificeRoadmap.map(s => `
                <div class="sacrifice-timeline-item" style="display:flex; gap:12px; margin-bottom:12px; background:rgba(45,32,19,0.5); padding:12px; border-radius:10px; border:1px solid rgba(197,155,39,0.25);">
                  <div style="font-size:24px;">${s.icon}</div>
                  <div>
                    <h4 style="margin:0 0 4px 0; font-size:14px; color:#fbbf24;">${s.title}</h4>
                    <p style="margin:0; font-size:12px; line-height:1.5; color:#d1c2af;">${s.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Heritage Memories 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: HERITAGE POLAROIDS -->
        <section class="fam-page-card" data-page="4">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 Heritage Moments With Papa</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:18px;">
              Lessons taught not with words, but through steadfast action and integrity.
            </p>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:rgba(197,155,39,0.4);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Heritage #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Bronze Signet Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: BRONZE SIGNET LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">🛡️</div>
              <h3 class="letter-teaser-title">💌 Bronze Signet Respect Letter</h3>
              <p class="letter-teaser-sub">Sealed with boundless honor and eternal respect for Papa.</p>
              
              <div class="envelope-seal-trigger" id="dadWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#78350f; color:#fef3c7; border:1px solid #c59b27; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(120,53,15,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Signet Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="dadLetterModal">
            <div class="fam-letter-modal-paper" style="background:#fffcf7; color:#1c1216;">
              <button class="btn-close-letter-modal" id="btnCloseDadLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">🛡️ 🧭 🌟</span>
                <h3>To Papa, My Greatest Hero &amp; Guide</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  Dear Papa,<br><br>
                  You worked tirelessly through every storm without ever complaining, just so our future could shine bright.<br><br>
                  Whenever I felt lost, your steady guidance was my compass. You showed me what honor, courage, and true sacrifice mean.<br><br>
                  Thank you for being my biggest hero and greatest support. I am who I am today because of you.<br><br>
                  Happy celebration, Papa! 🌟🛡️❤️
                `}
              </div>
              <div class="modal-letter-footer">
                <span>With Boundless Respect &amp; Honor,</span>
                <strong>${data.senderName || 'Your Proud Child'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Papa's Medal of Honor 🌟</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE OF HONOR -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#c59b27; background:#fffdf8;">
              <div class="fam-cert-seal">🌟</div>
              <div class="fam-cert-kicker" style="color:#b45309;">HALL OF FAME &amp; LIFETIME TRIBUTE</div>
              <h2 class="fam-cert-title" style="color:#78350f;">GREATEST FATHER IN THE UNIVERSE</h2>
              <div class="fam-cert-awarded-to">This gold medal of honor is proudly presented to:</div>
              <div class="fam-cert-recipient" style="color:#b45309;">${data.recipientName || 'Beloved Papa'}</div>
              <p class="fam-cert-citation">
                For standing tall when life was tough, teaching us integrity through your every action, and shielding our family with unwavering courage and love.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label">Official Honor</span>
                  <strong>Eternal Rock &amp; Anchor 🛡️</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label">Presented By</span>
                  <strong>${data.senderName || 'Your Grateful Family'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnDadReplay">
              <span>🌟 Replay Papa's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Engine
  const dadPageTitles = [
    { num: 1, title: "The First Hero Tribute 🌟" },
    { num: 2, title: "Papa's Wisdom Compass 🧭" },
    { num: 3, title: "Unspoken Battles Timeline 🛡️" },
    { num: 4, title: "Heritage Moments With Papa 📸" },
    { num: 5, title: "Bronze Signet Respect Letter 💌" },
    { num: 6, title: "Greatest Father in the Universe 🌟" }
  ];

  const totalPages = dadPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#dadStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#dadStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#dadStageTitleText');
    if (titleText && dadPageTitles[currentPage - 1]) {
      titleText.textContent = dadPageTitles[currentPage - 1].title;
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
      playDadTone('tick');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playDadTone('tick');
      goToPage(prev);
    });
  });
  container.querySelector('#btnDadReplay')?.addEventListener('click', () => {
    playDadTone('brass');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#dadPlayerSlot'), {
    audioTitle: data.audioTitle || "Father's Anchor Soundtrack",
    audioSubtitle: data.audioSubtitle || "THE PILLAR OF STRENGTH",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. CELESTIAL BRONZE STARDUST CANVAS (60FPS INTERACTIVE)
  // =========================================================================
  const canvas = container.querySelector('#dadStarCanvas');
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

    const stars = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedY: 0.3 + Math.random() * 0.6,
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: 0.2 + Math.random() * 0.7,
      color: Math.random() > 0.3 ? '#c59b27' : '#fef3c7'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(s => {
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
  // 2. PAGE 1: INTERACTIVE GOLDEN SHIELD FORGE
  // =========================================================================
  const shieldArena = container.querySelector('#dadShieldArena');
  const shieldIcon = container.querySelector('#dadShieldIcon');
  const shieldRing = container.querySelector('#shieldGlowRing');

  shieldArena?.addEventListener('click', () => {
    playDadTone('brass');
    if (navigator.vibrate) navigator.vibrate([40, 50, 60]);

    gsap.timeline()
      .to(shieldIcon, { scale: 1.45, rotate: -10, duration: 0.25, ease: 'back.out(2)' })
      .to(shieldRing, { scale: 1.3, boxShadow: '0 0 50px rgba(197,155,39,0.7)', duration: 0.3 }, '<')
      .to(shieldIcon, { scale: 1.15, rotate: 0, duration: 0.35, ease: 'power2.out' })
      .to(shieldRing, { scale: 1, boxShadow: '0 0 25px rgba(197,155,39,0.3)', duration: 0.35 }, '<');

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#c59b27', '#d97706', '#fbbf24', '#ffffff']
    });
  });

  // =========================================================================
  // 3. PAGE 2: 3D MAGNETIC COMPASS & DIAL PHYSICS
  // =========================================================================
  const needle = container.querySelector('#compassNeedle');
  const compassArena = container.querySelector('#dadCompassArena');
  const lessonBadge = container.querySelector('#lessonBadge');
  const lessonQuote = container.querySelector('#lessonQuote');
  const dirBtns = container.querySelectorAll('.compass-dir-btn');
  const btnSpin = container.querySelector('#btnSpinCompass');

  let currentAngle = 0;

  function setCompassAngle(targetAngle, virtue) {
    playDadTone('tick');
    currentAngle = targetAngle;
    gsap.to(needle, {
      rotate: targetAngle,
      duration: 0.7,
      ease: 'elastic.out(1, 0.4)'
    });

    if (virtue) {
      lessonBadge.textContent = virtue.label;
      lessonQuote.textContent = `“${virtue.quote}”`;
    }
  }

  dirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-dir'), 10);
      const v = compassVirtues[idx];
      dirBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      setCompassAngle(v.angle, v);

      confetti({
        particleCount: 25,
        spread: 50,
        origin: { y: 0.4 },
        colors: ['#c59b27', '#d97706', '#fef3c7', '#ffffff']
      });
    });
  });

  // Rapid Spin Dial
  btnSpin?.addEventListener('click', () => {
    playDadTone('strike');
    const randomVirtueIdx = Math.floor(Math.random() * compassVirtues.length);
    const chosen = compassVirtues[randomVirtueIdx];
    const spinRotations = 720 + chosen.angle;

    gsap.to(needle, {
      rotate: spinRotations,
      duration: 1.4,
      ease: 'power3.out',
      onComplete: () => {
        playDadTone('tick');
        dirBtns.forEach(b => b.classList.remove('active'));
        dirBtns[randomVirtueIdx]?.classList.add('active');
        lessonBadge.textContent = chosen.label;
        lessonQuote.textContent = `“${chosen.quote}”`;

        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.4 },
          colors: ['#c59b27', '#fbbf24', '#ffffff']
        });
      }
    });
  });

  // =========================================================================
  // 4. PAGE 3: MECHANICAL POCKET WATCH CANVAS
  // =========================================================================
  const watchCanvas = container.querySelector('#dadWatchCanvas');
  const watchArena = container.querySelector('#dadWatchArena');

  if (watchCanvas) {
    const wCtx = watchCanvas.getContext('2d');
    const wW = watchCanvas.width;
    const wH = watchCanvas.height;
    let watchSec = 0;

    function renderWatch() {
      wCtx.clearRect(0, 0, wW, wH);
      watchSec += 0.03;

      wCtx.save();
      // Brass Outer Case
      wCtx.beginPath();
      wCtx.arc(75, 75, 65, 0, Math.PI * 2);
      wCtx.fillStyle = '#261b12';
      wCtx.fill();
      wCtx.lineWidth = 4;
      wCtx.strokeStyle = '#c59b27';
      wCtx.stroke();

      // Top Crown / Ring
      wCtx.beginPath();
      wCtx.arc(75, 8, 7, 0, Math.PI * 2);
      wCtx.strokeStyle = '#c59b27';
      wCtx.lineWidth = 3;
      wCtx.stroke();

      // Inner Dial Rim
      wCtx.beginPath();
      wCtx.arc(75, 75, 54, 0, Math.PI * 2);
      wCtx.fillStyle = '#fffdf8';
      wCtx.fill();

      // Hour ticks
      wCtx.strokeStyle = '#78350f';
      wCtx.lineWidth = 2;
      for (let i = 0; i < 12; i++) {
        const rad = (i * Math.PI) / 6;
        const x1 = 75 + Math.cos(rad) * 44;
        const y1 = 75 + Math.sin(rad) * 44;
        const x2 = 75 + Math.cos(rad) * 50;
        const y2 = 75 + Math.sin(rad) * 50;
        wCtx.beginPath();
        wCtx.moveTo(x1, y1);
        wCtx.lineTo(x2, y2);
        wCtx.stroke();
      }

      // Hour Hand
      const hrRad = (watchSec * 0.08) % (Math.PI * 2);
      wCtx.beginPath();
      wCtx.moveTo(75, 75);
      wCtx.lineTo(75 + Math.cos(hrRad) * 26, 75 + Math.sin(hrRad) * 26);
      wCtx.lineWidth = 3;
      wCtx.strokeStyle = '#1c1216';
      wCtx.stroke();

      // Minute Hand
      const minRad = (watchSec * 0.3) % (Math.PI * 2);
      wCtx.beginPath();
      wCtx.moveTo(75, 75);
      wCtx.lineTo(75 + Math.cos(minRad) * 38, 75 + Math.sin(minRad) * 38);
      wCtx.lineWidth = 2;
      wCtx.strokeStyle = '#78350f';
      wCtx.stroke();

      // Seconds Hand (Smooth Sweep)
      const secRad = watchSec % (Math.PI * 2);
      wCtx.beginPath();
      wCtx.moveTo(75, 75);
      wCtx.lineTo(75 + Math.cos(secRad) * 46, 75 + Math.sin(secRad) * 46);
      wCtx.lineWidth = 1;
      wCtx.strokeStyle = '#dc2626';
      wCtx.stroke();

      // Center Pin
      wCtx.beginPath();
      wCtx.arc(75, 75, 4, 0, Math.PI * 2);
      wCtx.fillStyle = '#c59b27';
      wCtx.fill();

      wCtx.restore();
      requestAnimationFrame(renderWatch);
    }
    requestAnimationFrame(renderWatch);
  }

  watchArena?.addEventListener('click', () => {
    playDadTone('tick');
    gsap.fromTo(watchArena, { scale: 0.94 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
  });

  // Trophy Button
  const btnTrophy = container.querySelector('#btnAwardTrophy');
  const trophyFeedback = container.querySelector('#trophyFeedback');
  btnTrophy?.addEventListener('click', () => {
    playDadTone('brass');
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
    playDadTone('brass');
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
