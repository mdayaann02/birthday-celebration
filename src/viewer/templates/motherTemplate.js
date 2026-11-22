// src/viewer/templates/motherTemplate.js - The Sanctuary of Warmth & Eternal Dua (Mother Celebration - Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playMomTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'harp') {
      [261.63, 329.63, 392.00, 523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.18, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.55);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.6);
      });
    } else if (type === 'chime') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.42);
    } else if (type === 'warmth') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(330, now + 0.2);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {}
}

export function renderMotherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Her Gentle Smile 🌸", image: "/images/beautiful.jpg", note: "The warmth that heals every wound and lights up our darkest days." },
    { title: "Sacrifices & Love ❤️", image: "/images/always_you.jpg", note: "Giving up your sleep, your peace, and your dreams so ours could take flight." },
    { title: "My Guardian Angel 👑", image: "/images/sunset.jpg", note: "No matter how old I get, in your arms I am always safe." }
  ];

  const maternalDuas = [
    { title: "Dua for Protection 🛡️", text: "May my silent prayers forever be your shield in every storm, lighting your path wherever you wander in this life." },
    { title: "Dua for Joy & Light ✨", text: "May your heart never know sorrow, and may your face always shine with the radiant smile that makes my entire world bright." },
    { title: "Dua for Victory & Dreams 🌟", text: "May every door of goodness and abundance swing wide open for you, and may every dream you strive for be blessed." },
    { title: "Dua for Inner Peace 🕊️", text: "Whenever life feels heavy, remember that my heart is holding you in prayer at every sunrise and every sunset." },
    { title: "The Eternal Maternal Blessing 🤍", text: "Seeing you happy, healthy, and kind is the greatest reward of my life. You will always be my precious blessing." }
  ];

  const comfortRecipes = [
    { icon: "☕", title: "Morning Elaichi Chai", desc: "Brewed fresh with love, curing every worry before the rest of the world even wakes up.", secret: "Secret ingredient: Unconditional patience" },
    { icon: "🍲", title: "Maa's Healing Soup", desc: "The warm bowl brought to your bedside on sick days that no medicine on earth can rival.", secret: "Secret ingredient: A tender forehead touch" },
    { icon: "🫓", title: "Ghee Rotis With Extra Love", desc: "Always counting our plates first, serving seconds before we even ask, never resting until we are full.", secret: "Secret ingredient: Selfless generosity" },
    { icon: "🍪", title: "The Secret Treat Stash", desc: "Mysteriously hidden in the top pantry shelf, saved especially to brighten up gloomy afternoons.", secret: "Secret ingredient: A mother's watchful eye" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="momPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport mother-viewport">
      <!-- Ambient Golden Petals Canvas (60FPS Interactive Physics) -->
      <canvas id="momPetalCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="momStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="momStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="momStageTitleText">Royal Maternal Tribute 👑</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="momPagesContainer">
        <!-- PAGE 1: HERO & BLOOMING LOTUS BLESSING -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge gold-badge">🌸 TO MY HEAVEN ON EARTH &amp; GUARDIAN ANGEL 👑</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Queen, My Beloved Maa ❤️'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'In your gentle smile lies my entire universe, and in your quiet prayers I find my greatest strength.'}</p>
            
            <!-- Interactive Blooming Lotus Centerpiece -->
            <div class="mom-lotus-arena" id="momLotusArena" style="margin:24px auto 14px; text-align:center; cursor:pointer;">
              <div class="lotus-glowing-ring" id="lotusGlowRing" style="width:110px; height:110px; margin:0 auto; border-radius:50%; background:radial-gradient(circle, rgba(254,240,138,0.4) 0%, rgba(244,114,182,0.15) 60%, transparent 80%); display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(212,175,55,0.25); transition:transform 0.3s ease;">
                <span id="momLotusIcon" style="font-size:52px; filter:drop-shadow(0 4px 12px rgba(212,35,92,0.3)); display:inline-block; transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">🪷</span>
              </div>
              <div style="margin-top:10px; font-size:12px; font-weight:700; color:#b45309; letter-spacing:1px; text-transform:uppercase;">
                ✦ Tap Lotus to Unfurl Maa's Blessing ✦
              </div>
            </div>

            <div class="mom-quick-actions">
              <button class="btn-fam-action btn-hug-mom" id="btnVirtualHug">
                🤗 Send Warm Hug &amp; Salam to Maa ❤️
              </button>
            </div>
            <div id="hugFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Open Maa's Dua Jar 🤲</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: LIVING DUA JAR ON CANVAS -->
        <section class="fam-page-card" data-page="2">
          <div class="dad-compass-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">Maa's Living Jar of Duas 🤲🌸</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              Every prayer a mother whispers leaves an eternal shield around your heart. Tap the bottle to draw a blessed star.
            </p>

            <!-- Interactive Canvas Lucky Stars Jar -->
            <div style="position:relative; width:220px; height:240px; margin:0 auto; cursor:pointer;" id="duaJarTrigger">
              <canvas id="momJarCanvas" width="220" height="240" style="width:220px; height:240px; display:block; margin:0 auto;"></canvas>
              <div style="position:absolute; bottom:6px; left:0; right:0; text-align:center; font-size:11px; font-weight:700; color:#d97706; text-transform:uppercase; letter-spacing:0.8px;">
                ✦ Tap Jar to Draw a Dua ✦
              </div>
            </div>

            <!-- Scroll Reveal Box with 3D unfold -->
            <div class="dua-scroll-reveal" id="duaScrollReveal" style="display:none; margin-top:18px;">
              <div class="dua-scroll-body" style="background:#fffaf0; border:1.5px solid rgba(212,175,55,0.4); border-radius:14px; padding:18px; box-shadow:0 8px 24px rgba(212,175,55,0.15); text-align:center;">
                <span class="dua-scroll-badge" id="duaBadge" style="display:inline-block; padding:4px 12px; background:rgba(212,175,55,0.18); color:#b45309; border-radius:20px; font-size:12px; font-weight:700; margin-bottom:10px;">Dua for Protection 🛡️</span>
                <p class="dua-scroll-text" id="duaText" style="font-size:15px; line-height:1.6; color:#2d1a24; font-style:italic; margin:0 0 10px 0;">“May my silent prayers forever be your shield in every storm.”</p>
                <div class="dua-scroll-counter" id="duaCounter" style="font-size:11px; color:#8c7882; font-weight:600;">Dua #1 of 5 Drawn ✨</div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Recipes of Pure Love 🍲</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: STEAMING CHAI & RECIPES OF LOVE -->
        <section class="fam-page-card" data-page="3">
          <div class="mom-recipes-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">🍲 Recipes of Pure Love</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              No master chef on earth can replicate the healing warmth of a mother’s kitchen.
            </p>

            <!-- Steaming Chai Interactive Canvas Centerpiece -->
            <div style="position:relative; width:160px; height:140px; margin:0 auto 16px; cursor:pointer;" id="chaiCupArena">
              <canvas id="momChaiCanvas" width="160" height="140" style="width:160px; height:140px; display:block; margin:0 auto;"></canvas>
              <div style="text-align:center; font-size:11px; font-weight:700; color:#d97706; margin-top:-6px;">
                ✦ Tap Cup for Fresh Steam &amp; Warmth ✦
              </div>
            </div>

            <div class="recipe-cards-grid">
              ${comfortRecipes.map(r => `
                <div class="recipe-dish-box">
                  <div class="recipe-dish-icon">${r.icon}</div>
                  <div class="recipe-dish-info">
                    <h4 class="recipe-dish-title">${r.title}</h4>
                    <p class="recipe-dish-desc">${r.desc}</p>
                    <div class="recipe-secret-tag">${r.secret}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Cherished Memories 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: POLAROIDS SCRAPBOOK -->
        <section class="fam-page-card" data-page="4">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 Cherished Memories With Maa</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:18px;">
              Frozen frames of unconditional warmth, guidance, and purest comfort.
            </p>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/beautiful.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Memory #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>A Letter From My Soul 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">👑</div>
              <h3 class="letter-teaser-title">💌 A Letter From My Deepest Soul</h3>
              <p class="letter-teaser-sub">Sealed with eternal gratitude and a thousand prayers for Maa.</p>
              
              <div class="envelope-seal-trigger" id="momWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#b91c1c; color:#fef08a; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(185,28,28,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Royal Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="momLetterModal">
            <div class="fam-letter-modal-paper">
              <button class="btn-close-letter-modal" id="btnCloseMomLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">🌸 👑 🌸</span>
                <h3>Dearest Maa, My Whole Universe</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  Dearest Maa,<br><br>
                  From the moment I took my very first breath, your gentle arms have been my safest home and greatest sanctuary.<br><br>
                  You worked quietly through endless days and sleepless nights, making sacrifices the world will never know, all to give me wings to fly.<br><br>
                  Whenever I stumble or lose my way, it is your silent prayers that catch me, lift me up, and remind me of who I am.<br><br>
                  Thank you for being my anchor, my sweetest comfort, and my greatest blessing. May Allah forever shower you with boundless health, radiant joy, and peace.<br><br>
                  I love you more than all the stars in the night sky. Happy Celebration, my Queen! 🌸👑❤️
                `}
              </div>
              <div class="modal-letter-footer">
                <span>With Eternal Devotion &amp; Duas,</span>
                <strong>${data.senderName || 'Your Loving Child'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Maa's Royal Crown 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: ROYAL CERTIFICATE -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border">
              <div class="fam-cert-seal">👑</div>
              <div class="fam-cert-kicker">ROYAL PROCLAMATION &amp; ETERNAL DISTINCTION</div>
              <h2 class="fam-cert-title">GREATEST MOTHER IN THE UNIVERSE</h2>
              <div class="fam-cert-awarded-to">This sacred honor is forever bestowed upon:</div>
              <div class="fam-cert-recipient">${data.recipientName || 'Beloved Maa'}</div>
              <p class="fam-cert-citation">
                For giving up sleep so we could dream, enduring quiet battles so we only knew peace, and loving us with an ocean of patience that no earthly reward can ever measure.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label">Seal of Authenticity</span>
                  <strong>Eternal Heart &amp; Soul 🤍</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label">Conferred By</span>
                  <strong>${data.senderName || 'Your Grateful Family'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnMomReplay">
              <span>🌸 Replay Maa's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Navigation
  const momPageTitles = [
    { num: 1, title: "Royal Maternal Tribute 👑" },
    { num: 2, title: "Maa's Living Jar of Duas 🤲🌸" },
    { num: 3, title: "Recipes of Pure Love 🍲" },
    { num: 4, title: "Cherished Memories With Maa 📸" },
    { num: 5, title: "A Letter From My Soul 💌" },
    { num: 6, title: "Royal Proclamation of Honor 👑" }
  ];

  const totalPages = momPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#momStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#momStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#momStageTitleText');
    if (titleText && momPageTitles[currentPage - 1]) {
      titleText.textContent = momPageTitles[currentPage - 1].title;
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
      playMomTone('chime');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playMomTone('chime');
      goToPage(prev);
    });
  });
  container.querySelector('#btnMomReplay')?.addEventListener('click', () => {
    playMomTone('harp');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#momPlayerSlot'), {
    audioTitle: data.audioTitle || "Maa's Lullaby & Acoustic Score",
    audioSubtitle: data.audioSubtitle || "SANCTUARY OF PEACE",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. AMBIENT FLUID GOLD-ROSE PETALS CANVAS (60FPS INTERACTIVE)
  // =========================================================================
  const canvas = container.querySelector('#momPetalCanvas');
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

    const petals = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 6 + Math.random() * 8,
      speedY: 0.8 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(244, 114, 182, 0.35)'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        // Soft attraction/drift towards pointer
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          p.x += (dx / dist) * 0.4;
        }

        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
  // 2. PAGE 1: INTERACTIVE BLOOMING LOTUS BLESSING
  // =========================================================================
  const lotusArena = container.querySelector('#momLotusArena');
  const lotusIcon = container.querySelector('#momLotusIcon');
  const lotusRing = container.querySelector('#lotusGlowRing');

  lotusArena?.addEventListener('click', () => {
    playMomTone('harp');
    if (navigator.vibrate) navigator.vibrate([30, 40, 50]);

    // GSAP blossom bloom & glow expansion
    gsap.timeline()
      .to(lotusIcon, { scale: 1.5, rotate: 15, duration: 0.3, ease: 'back.out(2)' })
      .to(lotusRing, { scale: 1.35, boxShadow: '0 0 45px rgba(212,175,55,0.6)', duration: 0.4 }, '<')
      .to(lotusIcon, { scale: 1.15, rotate: 0, duration: 0.35, ease: 'power2.out' })
      .to(lotusRing, { scale: 1, boxShadow: '0 0 25px rgba(212,175,55,0.25)', duration: 0.4 }, '<');

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.42 },
      colors: ['#d4af37', '#fef08a', '#f472b6', '#ffffff']
    });
  });

  // =========================================================================
  // 3. PAGE 2: LIVING DUA JAR ON CANVAS (LUCKY STARS PHYSICS)
  // =========================================================================
  const jarCanvas = container.querySelector('#momJarCanvas');
  const jarTrigger = container.querySelector('#duaJarTrigger');
  const duaReveal = container.querySelector('#duaScrollReveal');
  const duaBadge = container.querySelector('#duaBadge');
  const duaText = container.querySelector('#duaText');
  const duaCounter = container.querySelector('#duaCounter');

  let currentDuaIdx = 0;

  if (jarCanvas) {
    const jCtx = jarCanvas.getContext('2d');
    const jW = jarCanvas.width;
    const jH = jarCanvas.height;

    // Glowing origami stars in jar
    const stars = Array.from({ length: 9 }, (_, i) => ({
      x: 70 + (i % 3) * 38 + (Math.random() - 0.5) * 12,
      y: 110 + Math.floor(i / 3) * 32 + (Math.random() - 0.5) * 10,
      r: 10 + Math.random() * 4,
      color: ['#fbbf24', '#f59e0b', '#f472b6', '#fef08a', '#ec4899'][i % 5],
      vy: (Math.random() - 0.5) * 0.4,
      vx: (Math.random() - 0.5) * 0.4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.03
    }));

    function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function renderJar() {
      jCtx.clearRect(0, 0, jW, jH);

      // Draw Glass Jar Silhouette
      jCtx.save();
      // Glass body outline
      jCtx.strokeStyle = 'rgba(212, 175, 55, 0.6)';
      jCtx.lineWidth = 3;
      jCtx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      
      jCtx.beginPath();
      // Cork / Lid
      jCtx.roundRect(80, 20, 60, 16, [4, 4, 0, 0]);
      jCtx.fillStyle = '#b45309';
      jCtx.fill();
      jCtx.stroke();

      // Jar Neck & Body
      jCtx.beginPath();
      jCtx.moveTo(85, 36);
      jCtx.lineTo(60, 65);
      jCtx.quadraticCurveTo(45, 75, 45, 100);
      jCtx.lineTo(45, 195);
      jCtx.quadraticCurveTo(45, 215, 65, 215);
      jCtx.lineTo(155, 215);
      jCtx.quadraticCurveTo(175, 215, 175, 195);
      jCtx.lineTo(175, 100);
      jCtx.quadraticCurveTo(175, 75, 160, 65);
      jCtx.lineTo(135, 36);
      jCtx.closePath();

      jCtx.fillStyle = 'rgba(254, 243, 199, 0.15)';
      jCtx.fill();
      jCtx.stroke();

      // Glass shine highlight
      jCtx.beginPath();
      jCtx.moveTo(56, 95);
      jCtx.lineTo(56, 185);
      jCtx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      jCtx.lineWidth = 4;
      jCtx.lineCap = 'round';
      jCtx.stroke();
      jCtx.restore();

      // Draw bouncing origami stars inside jar bounds
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.angle += s.spin;

        if (s.x < 65 || s.x > 155) s.vx *= -1;
        if (s.y < 85 || s.y > 200) s.vy *= -1;

        jCtx.save();
        jCtx.translate(s.x, s.y);
        jCtx.rotate(s.angle);
        drawStar(jCtx, 0, 0, 5, s.r, s.r * 0.5, s.color);
        jCtx.restore();
      }

      requestAnimationFrame(renderJar);
    }
    requestAnimationFrame(renderJar);
  }

  jarTrigger?.addEventListener('click', () => {
    playMomTone('harp');
    const dua = maternalDuas[currentDuaIdx % maternalDuas.length];
    currentDuaIdx++;

    duaBadge.textContent = dua.title;
    duaText.textContent = `“${dua.text}”`;
    duaReveal.style.display = 'block';

    // GSAP 3D Unfold
    gsap.fromTo(duaReveal, 
      { rotateX: 60, scale: 0.85, opacity: 0 },
      { rotateX: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.5)' }
    );

    duaCounter.textContent = `Dua #${((currentDuaIdx - 1) % maternalDuas.length) + 1} of ${maternalDuas.length} Drawn ✨ (Tap jar for another)`;

    confetti({
      particleCount: 40,
      spread: 65,
      origin: { y: 0.45 },
      colors: ['#d4af37', '#fef08a', '#f472b6', '#ffffff']
    });
  });

  // =========================================================================
  // 4. PAGE 3: STEAMING CHAI INTERACTIVE CANVAS
  // =========================================================================
  const chaiCanvas = container.querySelector('#momChaiCanvas');
  const chaiArena = container.querySelector('#chaiCupArena');

  if (chaiCanvas) {
    const cCtx = chaiCanvas.getContext('2d');
    const cW = chaiCanvas.width;
    const cH = chaiCanvas.height;

    const steams = Array.from({ length: 12 }, () => ({
      x: 75 + (Math.random() - 0.5) * 35,
      y: 75 + Math.random() * 20,
      r: 4 + Math.random() * 6,
      vy: -(0.7 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.5,
      alpha: 0.5 + Math.random() * 0.4
    }));

    function renderChai() {
      cCtx.clearRect(0, 0, cW, cH);

      // Draw Chai Cup & Saucer
      cCtx.save();
      // Saucer
      cCtx.fillStyle = '#fef3c7';
      cCtx.strokeStyle = '#d4af37';
      cCtx.lineWidth = 2;
      cCtx.beginPath();
      cCtx.ellipse(80, 115, 45, 10, 0, 0, Math.PI * 2);
      cCtx.fill();
      cCtx.stroke();

      // Cup Body
      cCtx.beginPath();
      cCtx.moveTo(52, 75);
      cCtx.quadraticCurveTo(55, 110, 80, 110);
      cCtx.quadraticCurveTo(105, 110, 108, 75);
      cCtx.closePath();
      cCtx.fillStyle = '#ffffff';
      cCtx.fill();
      cCtx.stroke();

      // Cup Handle
      cCtx.beginPath();
      cCtx.arc(114, 90, 10, -Math.PI * 0.4, Math.PI * 0.5);
      cCtx.strokeStyle = '#d4af37';
      cCtx.lineWidth = 3;
      cCtx.stroke();

      // Chai Liquid
      cCtx.beginPath();
      cCtx.ellipse(80, 75, 27, 6, 0, 0, Math.PI * 2);
      cCtx.fillStyle = '#92400e';
      cCtx.fill();

      // Elaichi aroma heart / steam
      for (const s of steams) {
        s.y += s.vy;
        s.x += s.vx + Math.sin(s.y * 0.05) * 0.4;
        s.alpha -= 0.008;

        if (s.y < 15 || s.alpha <= 0) {
          s.y = 75;
          s.x = 80 + (Math.random() - 0.5) * 30;
          s.alpha = 0.5 + Math.random() * 0.4;
        }

        cCtx.fillStyle = `rgba(255, 240, 220, ${Math.max(0, s.alpha)})`;
        cCtx.beginPath();
        cCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cCtx.fill();
      }

      cCtx.restore();
      requestAnimationFrame(renderChai);
    }
    requestAnimationFrame(renderChai);
  }

  chaiArena?.addEventListener('click', () => {
    playMomTone('warmth');
    gsap.fromTo(chaiArena, { scale: 0.92 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#f59e0b', '#fbbf24', '#ffffff']
    });
  });

  // Virtual Hug Button
  const btnHug = container.querySelector('#btnVirtualHug');
  const hugFeedback = container.querySelector('#hugFeedback');
  let hugCount = 0;
  btnHug?.addEventListener('click', () => {
    playMomTone('warmth');
    hugCount++;
    hugFeedback.innerHTML = `❤️ <strong>${hugCount} Warm Hug${hugCount > 1 ? 's' : ''} Sent!</strong> May Maa always be enveloped in peace and blessings. ✨`;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.35 },
      colors: ['#e11d48', '#d4af37', '#f472b6', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#momWaxSeal');
  const modal = container.querySelector('#momLetterModal');
  const closeBtn = container.querySelector('#btnCloseMomLetter');

  seal?.addEventListener('click', () => {
    playMomTone('harp');
    modal?.classList.add('active');
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.55 },
      colors: ['#d4af37', '#f472b6', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
