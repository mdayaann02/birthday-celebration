// src/viewer/templates/birthdayTemplate.js - Dynamic Persona-Adaptive Birthday Celebration Viewer
// Features: 60fps Canvas Helium Balloons & Twinkling Confetti, Interactive Balloon Popping Mini-Game,
// 3D Multi-Tier Cake with Blowable Candles & Smoke Physics, Persona Selector, and Multi-Page Storybook.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initHeroSection } from '../../components/heroSection.js';
import { initPhotoRibbon } from '../../components/photoRibbon.js';
import { initPolaroidWall } from '../../components/polaroidWall.js';
import { initFlipBook } from '../../components/flipBook.js';
import { initScratchCard } from '../../components/scratchCard.js';
import { initVipLanyard } from '../../components/vipLanyard.js';
import { initPhoneChat } from '../../components/phoneChat.js';

export function renderBirthdayTemplate(container, data) {
  const recipientName = data.recipientName || "My Special One";

  // Dynamic Persona Presets
  const PERSONAS = {
    bestfriend_female: {
      id: "bestfriend_female",
      name: "Bestie Girl",
      icon: "👯‍♀️",
      themeClass: "bday-theme-bestfriend_female",
      heroBadge: "SOUL SISTER FOR LIFE 👯‍♀️💅",
      heroTitle: data.heroTitle || `Happy Birthday to My Girl Bestie! 👯‍♀️💅`,
      heroSubtitle: data.heroSubtitle || "To my partner-in-crime, 2 AM therapist & favorite human in the universe ✨",
      vogueTitle: "SOUL SISTER",
      coverTag: "SWEET BESTIE EDITION",
      chapterHeading: `MEMORIES WITH ${recipientName.toUpperCase()}`,
      chapterSubheading: "UNFILTERED SECRETS & 2 AM LIFE TALKS",
      editorialQuote: data.magazine?.quote || "You are the sister I got to choose. Life without our chaotic laughs would be so boring! 💅",
      scratchBadge: "FOR MY FAVORITE HUMAN 💖",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "To the main character who lights up every room she walks into ✨",
      scratchSecret: "You are irreplaceable! Unlimited iced coffee & emergency gossip passes for life! ☕✨",
      lanyardBadge: "SOUL SISTER VIP PASS",
      lanyardAccess: "LEVEL: MAIN CHARACTER PRIVILEGES",
      contactName: `${recipientName} 💅💖`,
      defaultChat: [
        "HAPPY BIRTHDAY MY GORGEOUS BESTIE! 🎂💖",
        "I literally don't know what I would do without our 2 AM rants! 😭✨",
        "Getting ready to celebrate you all night long! Serving main character energy! 🥂💅"
      ]
    },
    bestfriend: {
      id: "bestfriend",
      name: "Best Friend",
      icon: "🤜🤛",
      themeClass: "bday-theme-bestfriend",
      heroBadge: "THE LIVING LEGEND 🤜🤛👑",
      heroTitle: data.heroTitle || "Happy Birthday Bro! 🤜🤛⚡",
      heroSubtitle: data.heroSubtitle || "To the realest guy I know — brothers by choice, legends by birth!",
      vogueTitle: "BRO CODE",
      coverTag: "LEGEND EDITION",
      chapterHeading: `THE LEGEND OF ${recipientName.toUpperCase()}`,
      chapterSubheading: "UNBREAKABLE BROTHERHOOD & BIG WINS",
      editorialQuote: data.magazine?.quote || "Having a best friend who always has your back through every storm is the rarest gift. Ride or die forever!",
      scratchBadge: "A TOAST TO MY GUY 🍻",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "Here is to another year of conquering goals and making legendary memories.",
      scratchSecret: "To 100 more years of crazy adventures, big wins, and late-night drives! Drinks on me! 🍻🔥",
      lanyardBadge: "RIDE OR DIE BROTHERHOOD",
      lanyardAccess: "LEVEL: BROTHERHOOD FOR LIFE",
      contactName: `${recipientName} 🤜🤛`,
      defaultChat: [
        "Yo happy birthday my brother! 👑🔥",
        "Another year of being absolute legends in everything we do! ⚡",
        "Big celebration tonight, get ready! 🍻"
      ]
    },
    brother: {
      id: "brother",
      name: "Brother",
      icon: "👦",
      themeClass: "bday-theme-brother",
      heroBadge: "BROTHER IN CHAOS 👦🔥",
      heroTitle: data.heroTitle || "Happy Birthday Bhai! 👦🔥",
      heroSubtitle: data.heroSubtitle || "From fighting over the TV remote to standing shoulder-to-shoulder through everything!",
      vogueTitle: "BROTHERHOOD",
      coverTag: "BHAI SPECIAL",
      chapterHeading: `CHRONICLES OF ${recipientName.toUpperCase()}`,
      chapterSubheading: "SURVIVING SIBLING CHAOS TOGETHER",
      editorialQuote: data.magazine?.quote || "No matter how much we roast each other, you're the one person I can always count on without hesitation.",
      scratchBadge: "PROUD OF YOU BHAI 🌟",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "Wishing you unstoppable growth, big money, and supreme happiness.",
      scratchSecret: "You'll always be my partner-in-crime! Keep winning and making us proud! 🤜🤛⚡",
      lanyardBadge: "LEGENDARY BHAI PASS",
      lanyardAccess: "LEVEL: LIFETIME BROTHER SECURITY",
      contactName: `${recipientName} 👦🔥`,
      defaultChat: [
        "Happy Birthday Bhai! 🎂👑",
        "Stop stealing my clothes now that you're an adult 😂",
        "Proud of you always bro! Fist bump forever! 🤜🤛❤️"
      ]
    },
    sister: {
      id: "sister",
      name: "Sister",
      icon: "👧",
      themeClass: "bday-theme-sister",
      heroBadge: "ANGEL & DRAMA QUEEN 👧✨",
      heroTitle: data.heroTitle || "Happy Birthday Behna! 👧🌸",
      heroSubtitle: data.heroSubtitle || "To my lifetime secret keeper, closet thief, and guardian angel!",
      vogueTitle: "SWEET SISTER",
      coverTag: "BEHNA SPECIAL",
      chapterHeading: `STORIES WITH ${recipientName.toUpperCase()}`,
      chapterSubheading: "FROM SECRET VAULTS TO LATE-NIGHT CONFESSIONS",
      editorialQuote: data.magazine?.quote || "A sister is a little bit of childhood that can never be lost. Thank you for always bringing sunlight into my world.",
      scratchBadge: "FOR MY LITTLE STAR 🌸",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "May your year ahead sparkle with endless smiles, pure joy, and blessings.",
      scratchSecret: "You're getting whatever gift you want this year! (I promise to stop stealing your hoodies 😜) 💖✨",
      lanyardBadge: "ROYAL SISTER VIP",
      lanyardAccess: "LEVEL: UNLIMITED SIS PRIVILEGES",
      contactName: `${recipientName} 👧🌸`,
      defaultChat: [
        "HAPPY BIRTHDAY MY SWEET SISTER! 🎂💖",
        "You are truly the heart of our whole family! ✨",
        "Huge birthday treat pending on you! Love you tons! 🥰🌸"
      ]
    },
    romantic: {
      id: "romantic",
      name: "Lover",
      icon: "💖",
      themeClass: "bday-theme-romantic",
      heroBadge: "MY WHOLE HEART & SOUL 💖✨",
      heroTitle: data.heroTitle || `Happy Birthday My Love, ${recipientName}! 💖`,
      heroSubtitle: data.heroSubtitle || "Every second with you is my favourite paradise on earth ✨",
      vogueTitle: "VOGUE LOVE",
      coverTag: "SOULMATE SPECIAL",
      chapterHeading: `FOREVER WITH ${recipientName.toUpperCase()}`,
      chapterSubheading: "OUR ROMANTIC UNIVERSE IN PICTURES",
      editorialQuote: data.magazine?.quote || "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
      scratchBadge: "A LOVE LETTER IN GOLD 💌",
      scratchTitle: `Happy Birthday My Forever!`,
      scratchSubtitle: "To the person who makes every heartbeat count.",
      scratchSecret: "You have my whole heart forever and always. A lifetime of stargazing & romantic candlelit dates awaits us! 💍💖",
      lanyardBadge: "VIP SOULMATE PASS",
      lanyardAccess: "LEVEL: KEY TO MY HEART FOREVER",
      contactName: `${recipientName} 💖`,
      defaultChat: [
        "Happy Birthday to the love of my entire life! 🎂💖",
        "Thank you for being my dream come true every single day. ✨",
        "I love you more than all the stars in the universe! Forever yours. 💍❤️"
      ]
    }
  };

  let activePersonaKey = data.persona && PERSONAS[data.persona] ? data.persona : "bestfriend_female";

  container.innerHTML = `
    <!-- Floating Background Canvas for Balloons and Twinkling Confetti -->
    <canvas id="bdayAnimCanvas" class="bday-anim-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

    <!-- Top Music Player Container -->
    <div id="tpMusicSlot" style="position:relative; z-index:100;"></div>

    <!-- Interactive Persona Switcher -->
    <nav class="bday-persona-selector-dock" aria-label="Birthday Persona Presets" style="position:relative; z-index:90;">
      <div class="bday-persona-scroll">
        ${Object.values(PERSONAS).map(p => `
          <button type="button" class="bday-persona-chip ${p.id === activePersonaKey ? 'active' : ''}" data-persona="${p.id}">
            <span class="persona-chip-icon">${p.icon}</span>
            <span>${p.name}</span>
          </button>
        `).join('')}
      </div>
    </nav>

    <!-- Storybook Viewport -->
    <div class="bday-persona-stage bday-storybook-viewport ${PERSONAS[activePersonaKey].themeClass}" id="bdayDynamicStage" style="position:relative; z-index:10;">
      
      <!-- Stage Progress Indicator Bar -->
      <header class="bday-floating-nav" style="user-select:none;">
        <div class="bday-step-progress-track">
          <div class="bday-step-progress-fill" id="bdayStepProgressFill" style="width: 14.3%;"></div>
        </div>
        <div class="bday-stage-indicator-bar">
          <div class="bday-stage-info-pill">
            <span class="stage-step-tag" id="bdayStageStepPill">PAGE 1 OF 7</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="bdayStageTitleText">The Grand Birthday Opening ✨</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="bday-pages-container" id="bdayPagesContainer">
        
        <!-- PAGE 1: HERO & INTERACTIVE BALLOON POPPING MINI-GAME -->
        <section class="bday-page-card active" data-page="1">
          <div id="tpHeroSlot"></div>

          <!-- Interactive Balloon Pop Game -->
          <div class="bday-interactive-balloons-box">
            <p style="font-size:12px; font-weight:800; letter-spacing:1px; color:#fbbf24; margin: 0 0 10px 0;">
              🎈 TAP THE BALLOONS TO POP BIRTHDAY WISHES 🎈
            </p>
            <div class="balloon-pop-row" id="balloonPopRow">
              <div class="pop-balloon b-red" data-wish="Boundless Joy 🌟" role="button" tabindex="0">🎈<span>1</span></div>
              <div class="pop-balloon b-gold" data-wish="Big Success 🏆" role="button" tabindex="0">🎈<span>2</span></div>
              <div class="pop-balloon b-pink" data-wish="Infinite Love 💖" role="button" tabindex="0">🎈<span>3</span></div>
              <div class="pop-balloon b-blue" data-wish="Wild Adventures 🚀" role="button" tabindex="0">🎈<span>4</span></div>
              <div class="pop-balloon b-purple" data-wish="Lifelong Smiles ✨" role="button" tabindex="0">🎈<span>5</span></div>
            </div>
            <div class="balloon-wish-bubble" id="balloonWishBubble"></div>
          </div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-next" data-next="2">
              <span>Explore Memory Lane 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: MEMORIES (RIBBON & POLAROIDS) -->
        <section class="bday-page-card" data-page="2">
          <div id="tpRibbonSlot"></div>
          <div id="tpPolaroidSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="3">
              <span>Flip Birthday Magazine 📖</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: VOGUE / MAGAZINE FLIPBOOK -->
        <section class="bday-page-card" data-page="3">
          <div id="tpFlipSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="4">
              <span>Scratch Secret Ticket 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: SCRATCH CARD -->
        <section class="bday-page-card" data-page="4">
          <div id="tpScratchSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="5">
              <span>Claim VIP Pass 🪪</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: VIP LANYARD PASS -->
        <section class="bday-page-card" data-page="5">
          <div id="tpLanyardSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="6">
              <span>Check Birthday Chat 💬</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: IMESSAGE PHONE CHAT -->
        <section class="bday-page-card" data-page="6">
          <div id="tpChatSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="7">
              <span>Blow Birthday Candles 🎂</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 7: 3D MULTI-TIER CAKE & CANDLE BLOWING FINALE -->
        <section class="bday-page-card" data-page="7">
          <div class="bday-finale-card">
            
            <!-- Realistic 3D Interactive Cake Stage -->
            <div class="realistic-cake-stage" id="cakeStage">
              <!-- Animated Candle Flames -->
              <div class="cake-candles-row" id="cakeCandlesRow">
                <div class="cake-candle">
                  <div class="candle-flame"></div>
                  <div class="candle-wick"></div>
                  <div class="candle-body"></div>
                </div>
                <div class="cake-candle central">
                  <div class="candle-flame"></div>
                  <div class="candle-wick"></div>
                  <div class="candle-body"></div>
                </div>
                <div class="cake-candle">
                  <div class="candle-flame"></div>
                  <div class="candle-wick"></div>
                  <div class="candle-body"></div>
                </div>
              </div>

              <!-- Smoke Wisps on blow out -->
              <div class="candle-smoke-field" id="candleSmokeField"></div>

              <!-- Cake Tiers -->
              <div class="cake-tier tier-top">
                <div class="cake-frosting-drips"></div>
                <div class="cake-berries">🍓 ✨ 🍓</div>
              </div>
              <div class="cake-tier tier-base">
                <div class="cake-ribbon"></div>
              </div>
              <div class="cake-plate"></div>
            </div>

            <div class="bday-cake-tap-hint" id="cakeTapHint">✨ TAP THE CAKE OR BUTTON BELOW TO BLOW CANDLES ✨</div>
            <h2 class="bday-finale-title" id="bdayFinaleHeadline">Happy Birthday, ${recipientName}! 🎉</h2>
            <p class="bday-finale-msg" id="bdayFinaleSubtitle">
              Wishing you a year filled with boundless laughter, wild dreams fulfilled, and infinite blessings! ✨
            </p>

            <button type="button" class="btn-fam-action btn-blow-cake-action" id="btnBlowCandles" style="width:100%; max-width:320px; font-size:14px; padding:13px 20px; border-radius:14px; color:#fff; font-weight:800; cursor:pointer; margin-top:8px;">
              💨 Blow Out Candles &amp; Make A Wish 🎂
            </button>
          </div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="6">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="1">
              <span>Replay From Start 🔄</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  `;

  // =========================================================================
  // 60FPS BACKGROUND BALLOONS & CONFETTI CANVAS ANIMATION
  // =========================================================================
  const animCanvas = container.querySelector('#bdayAnimCanvas');
  if (animCanvas) {
    const aCtx = animCanvas.getContext('2d');
    let cw = (animCanvas.width = window.innerWidth);
    let ch = (animCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      cw = animCanvas.width = window.innerWidth;
      ch = animCanvas.height = window.innerHeight;
    });

    const floatingBalloons = [];
    const colors = ['#f43f5e', '#fbbf24', '#3b82f6', '#10b981', '#a855f7', '#ec4899'];
    for (let i = 0; i < 18; i++) {
      floatingBalloons.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        r: Math.random() * 14 + 12,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 0.9 + 0.4,
        wiggle: Math.random() * Math.PI * 2,
        wiggleSpeed: Math.random() * 0.03 + 0.015,
        alpha: Math.random() * 0.4 + 0.35
      });
    }

    function renderBdayCanvas() {
      aCtx.clearRect(0, 0, cw, ch);

      for (let b of floatingBalloons) {
        b.y -= b.speed;
        b.wiggle += b.wiggleSpeed;
        const currentX = b.x + Math.sin(b.wiggle) * 15;

        if (b.y < -40) {
          b.y = ch + 40;
          b.x = Math.random() * cw;
        }

        aCtx.save();
        aCtx.globalAlpha = b.alpha;
        aCtx.fillStyle = b.color;

        // Balloon oval body
        aCtx.beginPath();
        aCtx.ellipse(currentX, b.y, b.r, b.r * 1.25, 0, 0, Math.PI * 2);
        aCtx.fill();

        // Balloon string
        aCtx.strokeStyle = 'rgba(255,255,255,0.3)';
        aCtx.lineWidth = 1;
        aCtx.beginPath();
        aCtx.moveTo(currentX, b.y + b.r * 1.25);
        aCtx.quadraticCurveTo(currentX + 5, b.y + b.r * 1.25 + 15, currentX - 2, b.y + b.r * 1.25 + 30);
        aCtx.stroke();

        aCtx.restore();
      }

      requestAnimationFrame(renderBdayCanvas);
    }
    requestAnimationFrame(renderBdayCanvas);
  }

  // =========================================================================
  // INTERACTIVE BALLOON POPPING MINI-GAME
  // =========================================================================
  const popBalloons = container.querySelectorAll('.pop-balloon');
  const wishBubble = container.querySelector('#balloonWishBubble');

  popBalloons.forEach(b => {
    b.addEventListener('click', () => {
      if (b.classList.contains('popped')) return;
      b.classList.add('popped');
      if (navigator.vibrate) navigator.vibrate([20, 30]);

      const wish = b.getAttribute('data-wish') || 'Infinite Happiness ✨';
      if (wishBubble) {
        wishBubble.innerHTML = `🎉 Popped: <strong>${wish}</strong>`;
        gsap.fromTo(wishBubble, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });
      }

      // Small confetti burst
      const rect = b.getBoundingClientRect();
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x: (rect.left + rect.width / 2) / window.innerWidth, y: (rect.top + rect.height / 2) / window.innerHeight },
        colors: ['#ff4d6d', '#fbbf24', '#38bdf8', '#34d399']
      });
    });
  });

  // =========================================================================
  // CAKE CANDLES BLOWING & SMOKE PARTICLES
  // =========================================================================
  const btnBlowCandles = container.querySelector('#btnBlowCandles');
  const cakeStage = container.querySelector('#cakeStage');
  const flames = container.querySelectorAll('.candle-flame');
  const smokeField = container.querySelector('#candleSmokeField');
  const cakeTapHint = container.querySelector('#cakeTapHint');
  let candlesBlown = false;

  function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    if (navigator.vibrate) navigator.vibrate([30, 40, 50]);

    flames.forEach(f => f.classList.add('extinguished'));
    if (cakeTapHint) cakeTapHint.textContent = "🎂 CANDLES BLOWN! MAKE A WISH! ✨";

    // Smoke effect
    if (smokeField) {
      for (let i = 0; i < 9; i++) {
        const s = document.createElement('div');
        s.className = 'smoke-particle';
        s.style.left = `${45 + (Math.random() - 0.5) * 20}%`;
        s.style.animationDelay = `${i * 0.1}s`;
        smokeField.appendChild(s);
        setTimeout(() => s.remove(), 2000);
      }
    }

    // Grand Confetti Blast
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#fbbf24', '#10b981', '#3b82f6', '#f43f5e']
    });

    if (btnBlowCandles) {
      btnBlowCandles.innerHTML = `🎉 Wish Granted! More Fireworks 🎆`;
      btnBlowCandles.addEventListener('click', () => {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      });
    }
  }

  cakeStage?.addEventListener('click', blowOutCandles);
  btnBlowCandles?.addEventListener('click', blowOutCandles);

  // =========================================================================
  // MULTI-PAGE STORYBOOK CONTROLLER
  // =========================================================================
  const stage = container.querySelector('#bdayDynamicStage');
  const pages = container.querySelectorAll('.bday-page-card');
  const progressFill = container.querySelector('#bdayStepProgressFill');
  const stageStepPill = container.querySelector('#bdayStageStepPill');
  const stageTitleText = container.querySelector('#bdayStageTitleText');

  const STAGE_TITLES = {
    1: "The Grand Birthday Opening ✨",
    2: "Golden Polaroid Memories 📸",
    3: "Celebrity Magazine Cover 📖",
    4: "Golden Scratch Surprise 🎟️",
    5: "VIP All-Access Pass 🪪",
    6: "Birthday Chat Messages 💬",
    7: "Candle Blowing & Finale 🎂"
  };

  function goToPage(pageNum) {
    const p = Math.max(1, Math.min(pageNum, 7));
    pages.forEach(page => {
      page.classList.toggle('active', parseInt(page.getAttribute('data-page'), 10) === p);
    });

    if (progressFill) progressFill.style.width = `${(p / 7) * 100}%`;
    if (stageStepPill) stageStepPill.textContent = `PAGE ${p} OF 7`;
    if (stageTitleText) stageTitleText.textContent = STAGE_TITLES[p] || "Birthday Journey";

    if (navigator.vibrate) navigator.vibrate(12);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  container.querySelectorAll('.btn-bday-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'), 10);
      goToPage(next);
    });
  });

  container.querySelectorAll('.btn-bday-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'), 10);
      goToPage(prev);
    });
  });

  // Mount components
  function mountAllComponents(pKey) {
    const p = PERSONAS[pKey] || PERSONAS.bestfriend_female;

    initMusicPlayer(container.querySelector('#tpMusicSlot'), {
      ...data,
      audioSrc: data.audioSrc || '/audio/alfaaz.mp3',
      audioTitle: data.audioTitle || `${p.name} Special Track`
    });

    initHeroSection(container.querySelector('#tpHeroSlot'), {
      ...data,
      badgeText: p.heroBadge,
      title: p.heroTitle,
      subtitle: p.heroSubtitle
    });

    initPhotoRibbon(container.querySelector('#tpRibbonSlot'), data);
    initPolaroidWall(container.querySelector('#tpPolaroidSlot'), data);

    initFlipBook(container.querySelector('#tpFlipSlot'), {
      ...data,
      magazine: {
        ...(data.magazine || {}),
        title: p.vogueTitle,
        coverTag: p.coverTag,
        quote: p.editorialQuote
      }
    });

    initScratchCard(container.querySelector('#tpScratchSlot'), {
      ...data,
      badge: p.scratchBadge,
      title: p.scratchTitle,
      subtitle: p.scratchSubtitle,
      secretMessage: p.scratchSecret
    });

    initVipLanyard(container.querySelector('#tpLanyardSlot'), {
      ...data,
      recipientName: recipientName,
      badgeNumber: p.lanyardBadge,
      accessLevel: p.lanyardAccess
    });

    initPhoneChat(container.querySelector('#tpChatSlot'), {
      ...data,
      contactName: p.contactName,
      messages: p.defaultChat
    });
  }

  mountAllComponents(activePersonaKey);

  // Persona switcher click handler
  container.querySelectorAll('.bday-persona-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const pKey = chip.getAttribute('data-persona');
      if (pKey && PERSONAS[pKey]) {
        activePersonaKey = pKey;
        container.querySelectorAll('.bday-persona-chip').forEach(c => c.classList.toggle('active', c === chip));
        mountAllComponents(activePersonaKey);
        if (navigator.vibrate) navigator.vibrate(15);
      }
    });
  });
}
