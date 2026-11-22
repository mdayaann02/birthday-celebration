// src/viewer/templates/sorryTemplate.js - Multi-Page Sincere Apology & Playful Reconciliation Experience

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Web Audio Sound Synthesizer for tactile feedback
function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;

    if (type === 'boing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.28);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'splat') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'splash') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'stamp') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'chime') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.22, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.45);
      });
    }
  } catch {}
}

export function renderSorryTemplate(container, data) {
  let currentPage = 1;
  const totalPages = 7;
  let angerLevel = 100;
  let ventCount = 0;
  let penancesSigned = false;
  let treatySigned = false;

  const recipientName = data.recipientName || 'My Dearest';
  const senderName = data.senderName || 'Yours Truly';
  const heroTitle = data.heroTitle || "I'm Truly Sorry";
  const heroSubtitle = data.heroSubtitle || "My universe feels heavy and completely empty when we aren't okay 🥺";
  const apologyMessage = data.apologyMessage || "I know I made a mistake, and seeing you upset hurts me more than anything. My intention was never to make you feel hurt or unheard. You mean everything to me, and I take full accountability.";

  const penances = (data.penances && data.penances.length > 0) ? data.penances : [
    "Buy your favorite Iced Boba / Treat right now 🧋",
    "30-minute soothing massage whenever you ask 💆‍♀️",
    "Order whatever food you are craving tonight, my treat 🍕",
    "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
    "Fold all your laundry & do your chores this weekend 🧹",
    "Write 100 cute post-it notes of things I adore about you 📝"
  ];

  const treatyClauses = (data.treatyClauses && data.treatyClauses.length > 0) ? data.treatyClauses : [
    "Party A (The Cutest Girl) is officially declared 100% Right in all past, present, and future disputes.",
    "Party B must deliver hugs, kisses, and forehead kisses upon demand.",
    "Permanent hoodie and jacket theft rights are granted with zero retaliation.",
    "All future disagreements must be settled immediately with dessert and boba.",
    "No going to sleep angry ever again — cuddles are mandatory."
  ];

  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your laugh so much 🌅", note: "You looked so peaceful here. I promise to always protect your happiness." },
    { image: "/images/always_you.jpg", caption: "You are the brightest light in my world 🫶", note: "Even on my gloomiest days, one smile from you fixes everything." },
    { image: "/images/pretty.jpg", caption: "I never want to see you hurt ever again ✨", note: "You deserve the gentlest, sweetest love in the universe. I'm learning every day." }
  ];

  const coupons = (data.coupons && data.coupons.length > 0) ? data.coupons : [
    { icon: "🎟️", title: "Get Out of Jail Free", desc: "Win any future argument instantly with no rebuttal!" },
    { icon: "🍫", title: "Midnight Craving Pass", desc: "Redeemable 24/7 for chocolates, snacks, or fast food." },
    { icon: "🧸", title: "Unlimited Bear Hugs", desc: "Non-expiring voucher for long, tight, comforting hugs." },
    { icon: "👑", title: "Queen For A Day", desc: "He must obey your every cute command for 24 hours." }
  ];

  const pageTitles = [
    { num: 1, icon: "💌", title: "Confession" },
    { num: 2, icon: "🥊", title: "Vent Room" },
    { num: 3, icon: "⚖️", title: "Penance" },
    { num: 4, icon: "📸", title: "Memories" },
    { num: 5, icon: "📜", title: "Peace Treaty" },
    { num: 6, icon: "🎟️", title: "Coupons" },
    { num: 7, icon: "💖", title: "Verdict" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-storybook-viewport">
      <!-- Ambient Sparkle Mesh Canvas -->
      <canvas id="sorryCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Floating Header Progress & Page Navigation Capsule -->
      <header class="sorry-floating-nav">
        <div class="sorry-step-progress-track">
          <div class="sorry-step-progress-fill" id="stepProgressFill" style="width: 14%;"></div>
        </div>

        <nav class="sorry-tabs-capsule" id="sorryTabsCapsule" aria-label="Apology Story Pages">
          ${pageTitles.map(p => `
            <button type="button" class="sorry-tab-pill ${p.num === 1 ? 'active' : ''}" data-page="${p.num}">
              <span class="sorry-tab-icon">${p.icon}</span>
              <span class="sorry-tab-label">${p.title}</span>
            </button>
          `).join('')}
        </nav>
      </header>

      <!-- Multi-Page Content Slider Container -->
      <main class="sorry-pages-container" id="sorryPagesContainer">
        
        <!-- PAGE 1: 💌 THE SINCERE CONFESSION -->
        <section class="sorry-page-card active" data-page="1">
          <div class="sorry-hero-wrap">
            <div class="sorry-heartbeat-box">
              <span class="heart-pulse-icon">💔</span>
              <div class="heart-battery-info">
                <span class="battery-label">BOYFRIEND HEART LEVEL:</span>
                <div class="battery-bar"><div class="battery-fill" style="width: 12%;"></div></div>
                <span class="battery-text">12% (Severely Weakened Without You 🥺)</span>
              </div>
            </div>

            <div class="sorry-emoji-display" id="avatarEmoji">🥺</div>
            <h1 class="sorry-hero-title">${heroTitle}</h1>
            <p class="sorry-hero-sub">${heroSubtitle}</p>

            <!-- Wax-Sealed Confession Letter -->
            <div class="sorry-glass-letter">
              <div class="letter-wax-seal">
                <span>❤️</span>
              </div>
              <div class="sorry-card-greeting">Dearest ${recipientName},</div>
              <p class="sorry-card-text typewriter-effect">${apologyMessage}</p>
              <div class="sorry-card-sign">— Sincerely & Lovingly, ${senderName} 🫶</div>
            </div>

            <div class="sorry-next-dock">
              <button type="button" class="btn-sorry-next" data-next="2">
                Let Out Your Anger in the Vent Room 🥊 &rarr;
              </button>
            </div>
          </div>
        </section>

        <!-- PAGE 2: 🥊 THE INTERACTIVE VENTING ROOM -->
        <section class="sorry-page-card" data-page="2">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 2: CATHARTIC VENTING</div>
            <h2 class="sorry-section-title">Take Your Anger Out On Me! 🥊</h2>
            <p class="sorry-section-subtitle">
              You have every right to be mad. Tap any item below to throw it at me safely!
            </p>

            <div class="vent-chamber-card">
              <!-- Anger Thermometer Gauge -->
              <div class="anger-gauge-wrap">
                <div class="anger-gauge-header">
                  <span class="anger-gauge-title">🔥 ANGER THERMOMETER:</span>
                  <span class="anger-gauge-val" id="angerValText">100% FURIOUS</span>
                </div>
                <div class="anger-gauge-track">
                  <div class="anger-gauge-fill" id="angerGaugeFill" style="width: 100%;"></div>
                </div>
              </div>

              <!-- Interactive Reaction Avatar -->
              <div class="vent-avatar-stage">
                <div class="vent-avatar-character" id="ventAvatar">
                  <span class="vent-avatar-face" id="avatarFace">🥺</span>
                  <div class="vent-splat-overlay" id="ventSplat"></div>
                </div>
                <div class="vent-reaction-bubble" id="ventBubble">
                  "I know you're mad at me... I'm listening 🥺"
                </div>
              </div>

              <!-- Throwable Arsenal -->
              <div class="throwables-grid">
                <button type="button" class="btn-throwable" data-type="pillow" title="Throw Soft Pillow">
                  <span class="throw-icon">🧸</span>
                  <span class="throw-label">Soft Teddy</span>
                  <span class="throw-sub">Boing! (-15% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="cupcake" title="Throw Cupcake">
                  <span class="throw-icon">🧁</span>
                  <span class="throw-label">Cupcake</span>
                  <span class="throw-sub">Splat! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="water" title="Throw Water Balloon">
                  <span class="throw-icon">💧</span>
                  <span class="throw-label">Water Splash</span>
                  <span class="throw-sub">Splash! (-25% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="feather" title="Tickle Feather">
                  <span class="throw-icon">🪶</span>
                  <span class="throw-label">Magic Feather</span>
                  <span class="throw-sub">Tickle! (-20% Mad)</span>
                </button>
              </div>

              <div class="vent-counter-text" id="ventCounterText">
                Hits landed: <strong>0</strong> times
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="1">&larr; Back to Letter</button>
              <button type="button" class="btn-sorry-next" data-next="3">Choose My Punishments ⚖️ &rarr;</button>
            </div>
          </div>
        </section>

        <!-- PAGE 3: ⚖️ THE PUNISHMENT DEED / PENANCE -->
        <section class="sorry-page-card" data-page="3">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 3: ATONEMENT & PENANCE</div>
            <h2 class="sorry-section-title">Pick My Punishments! ⚖️</h2>
            <p class="sorry-section-subtitle">
              I agree to execute all of these for you with zero complaining:
            </p>

            <div class="penance-grid" id="penanceGrid">
              ${penances.map((p, i) => `
                <div class="penance-item-card checked" data-i="${i}">
                  <div class="penance-check-box">✓</div>
                  <div class="penance-item-content">
                    <span class="penance-badge">PUNISHMENT #0${i+1}</span>
                    <p class="penance-text">${p}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Legally Binding Acceptance Stamp -->
            <div class="penance-signing-dock">
              <button type="button" class="btn-sign-penance" id="btnSignPenance">
                ⚖️ Stamp These As Legally Binding
              </button>
              <div class="penance-stamped-badge" id="penanceStampedBadge" style="display:none;">
                🔴 ACCEPTED & GUARANTEED BY BOYFRIEND
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="2">&larr; Back to Venting</button>
              <button type="button" class="btn-sorry-next" data-next="4">Look At Our Memories 📸 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- PAGE 4: 📸 MEMORY SCRAPBOOK -->
        <section class="sorry-page-card" data-page="4">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 4: WHY YOU MEAN THE WORLD</div>
            <h2 class="sorry-section-title">Remember Why We Fell In Love 📸</h2>
            <p class="sorry-section-subtitle">
              Tap any polaroid to flip it and read the secret memory on the back:
            </p>

            <div class="sorry-polaroids-deck">
              ${polaroids.map((p, i) => `
                <div class="sorry-polaroid-card" data-card-idx="${i}">
                  <div class="polaroid-flipper">
                    <!-- Front of Polaroid -->
                    <div class="polaroid-front">
                      <div class="polaroid-img-frame">
                        <img src="${p.image}" alt="Memory" onerror="this.src='/images/sunset.jpg'" />
                        <span class="polaroid-tap-hint">Tap to flip 🔄</span>
                      </div>
                      <div class="polaroid-caption">${p.caption}</div>
                    </div>
                    <!-- Back of Polaroid -->
                    <div class="polaroid-back">
                      <div class="polaroid-back-note">
                        <span class="note-quote-mark">“</span>
                        <p>${p.note || p.caption}</p>
                        <span class="note-author">— Forever Yours ❤️</span>
                      </div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="3">&larr; Back to Penance</button>
              <button type="button" class="btn-sorry-next" data-next="5">Sign The Peace Treaty 📜 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- PAGE 5: 📜 THE OFFICIAL PEACE TREATY -->
        <section class="sorry-page-card" data-page="5">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 5: LEGAL DIPLOMACY</div>
            <h2 class="sorry-section-title">Official Relationship Peace Treaty 📜</h2>
            <p class="sorry-section-subtitle">
              An unbreachable contract protecting your peace and royal happiness:
            </p>

            <div class="treaty-document-card">
              <div class="treaty-header">
                <span class="treaty-crest">👑</span>
                <h3 class="treaty-title">THE SWEETHEART ACCORDS</h3>
                <span class="treaty-parties">Between: ${recipientName} (The Queen) & ${senderName} (The Dork)</span>
              </div>

              <div class="treaty-articles-list">
                ${treatyClauses.map((clause, idx) => `
                  <div class="treaty-article">
                    <span class="article-num">Article ${['I', 'II', 'III', 'IV', 'V', 'VI'][idx] || (idx+1)}:</span>
                    <p class="article-text">${clause}</p>
                  </div>
                `).join('')}
              </div>

              <!-- Interactive Fingerprint Scanner -->
              <div class="fingerprint-scanner-area">
                <div class="scanner-pad" id="scannerPad" role="button" aria-label="Press and hold to sign">
                  <div class="scanner-laser-line"></div>
                  <span class="scanner-icon">👆</span>
                  <div class="scanner-ring"></div>
                </div>
                <div class="scanner-instruction" id="scannerInstruction">
                  Press & Hold Your Thumb For 2 Seconds To Ratify
                </div>
                <div class="treaty-gold-seal" id="treatyGoldSeal" style="display:none;">
                  <span class="seal-icon">🎖️</span>
                  <span>RATIFIED WITH LOVE BY HER MAJESTY</span>
                </div>
              </div>
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="4">&larr; Back to Memories</button>
              <button type="button" class="btn-sorry-next" data-next="6">Claim Your Love Coupons 🎟️ &rarr;</button>
            </div>
          </div>
        </section>

        <!-- PAGE 6: 🎟️ RECONCILIATION COUPONS -->
        <section class="sorry-page-card" data-page="6">
          <div class="sorry-section-wrap">
            <div class="sorry-tag">STAGE 6: RECONCILIATION GIFTS</div>
            <h2 class="sorry-section-title">Claim Your Peace Vouchers 🎟️</h2>
            <p class="sorry-section-subtitle">
              Tap any coupon below to claim it. Non-expiring and redeemable anytime!
            </p>

            <div class="coupons-grid">
              ${coupons.map((c, i) => `
                <div class="sorry-coupon-card" data-coupon-idx="${i}">
                  <div class="coupon-left-icon">${c.icon}</div>
                  <div class="coupon-details">
                    <h4 class="coupon-name">${c.title}</h4>
                    <p class="coupon-desc">${c.desc}</p>
                  </div>
                  <button type="button" class="btn-claim-coupon">
                    Claim
                  </button>
                </div>
              `).join('')}
            </div>

            <div class="sorry-nav-buttons">
              <button type="button" class="btn-sorry-prev" data-prev="5">&larr; Back to Treaty</button>
              <button type="button" class="btn-sorry-next" data-next="7">The Final Verdict 💖 &rarr;</button>
            </div>
          </div>
        </section>

        <!-- PAGE 7: 💖 THE FORGIVENESS VERDICT -->
        <section class="sorry-page-card" data-page="7">
          <div class="sorry-section-wrap" style="text-align:center;">
            <div class="sorry-tag">FINAL STAGE: THE VERDICT</div>
            <div class="verdict-avatar-pulse">🥺👉👈</div>
            <h2 class="sorry-section-title" style="font-size:32px; margin-top:8px;">
              Will You Please Forgive Me? ❤️
            </h2>
            <p class="sorry-section-subtitle" style="max-width:480px; margin:0 auto 28px;">
              I love you with every beat of my heart. Life is too gray and quiet without your laughter.
            </p>

            <div class="sorry-decision-area" id="sorryDecisionArea">
              <button class="btn-forgive-yes" id="btnForgiveYes">
                YES, I Forgive You! ❤️🫂
              </button>
              <button class="btn-forgive-no" id="btnForgiveNo">
                No 😠
              </button>
            </div>

            <!-- Celebration Certificate of Forgiveness -->
            <div class="sorry-success-card" id="forgiveSuccessCard" style="display:none;">
              <div class="success-confetti-badge">🎉🫂💖</div>
              <h3 class="success-title">WE ARE OFFICIALLY BACK!</h3>
              <p class="success-msg">
                You just made my universe light up again! I promise to cherish, respect, and love you better every single day.
              </p>

              <div class="success-actions-dock">
                <a href="#" class="btn-whatsapp-hug" id="btnWhatsappHug" target="_blank">
                  💬 Send Hug To Him on WhatsApp
                </a>
                <button type="button" class="btn-celebrate-more" id="btnCelebrateMore">
                  🎊 More Confetti!
                </button>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  `;

  // Init Music Player
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: data.audioSubtitle || "I'M SO SORRY",
      audioSrc: data.audioSrc || "/audio/alfaaz.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Page Switcher Engine
  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Tab Pills
    container.querySelectorAll('.sorry-tab-pill').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.getAttribute('data-page')) === currentPage);
    });

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#stepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Page View
    container.querySelectorAll('.sorry-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    // Scroll smoothly to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Tab Pills
  container.querySelectorAll('.sorry-tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = parseInt(btn.getAttribute('data-page'));
      goToPage(p);
    });
  });

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-sorry-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-sorry-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });

  // ==========================================
  // STAGE 2: VENTING ROOM INTERACTION
  // ==========================================
  const ventAvatar = container.querySelector('#ventAvatar');
  const avatarFace = container.querySelector('#avatarFace');
  const ventBubble = container.querySelector('#ventBubble');
  const ventSplat = container.querySelector('#ventSplat');
  const angerGaugeFill = container.querySelector('#angerGaugeFill');
  const angerValText = container.querySelector('#angerValText');
  const ventCounter = container.querySelector('#ventCounterText');

  const funnyReactions = [
    "Ouch! I deserved that throw 🥺",
    "Direct hit! Your aim is scary good! 🎯",
    "Still smiling because at least you're looking at me! 😂",
    "Cupcake frosting is surprisingly sweet though! 🧁",
    "Water balloon hit! Now I'm cute AND soaked 💧",
    "I'm staying right here until you feel better ❤️",
    "Throw one more! I can take it 🧸",
    "Is that beautiful smile starting to return? 🥺"
  ];

  container.querySelectorAll('.btn-throwable').forEach(btn => {
    btn.addEventListener('click', () => {
      ventCount++;
      const type = btn.getAttribute('data-type');
      
      // Sound feedback
      if (type === 'pillow') playSound('boing');
      else if (type === 'cupcake') playSound('splat');
      else if (type === 'water') playSound('splash');
      else playSound('boing');

      // Vibrate
      if (navigator.vibrate) navigator.vibrate([20, 30, 20]);

      // Deduct anger
      angerLevel = Math.max(0, angerLevel - (type === 'water' ? 25 : 18));
      if (angerGaugeFill) angerGaugeFill.style.width = `${angerLevel}%`;
      if (angerValText) {
        if (angerLevel > 70) angerValText.textContent = `${angerLevel}% (Furious)`;
        else if (angerLevel > 40) angerValText.textContent = `${angerLevel}% (Softening up)`;
        else if (angerLevel > 0) angerValText.textContent = `${angerLevel}% (Almost Giggling)`;
        else angerValText.textContent = `0% (Anger Fully Melted 😇)`;
      }

      // Wobble Avatar
      ventAvatar?.classList.remove('wobble-hit');
      void ventAvatar?.offsetWidth; // re-trigger animation
      ventAvatar?.classList.add('wobble-hit');

      // Splat effect for cupcake
      if (type === 'cupcake' && ventSplat) {
        ventSplat.style.display = 'block';
        setTimeout(() => { if (ventSplat) ventSplat.style.display = 'none'; }, 1800);
      }

      // Reaction text
      if (ventBubble) {
        ventBubble.textContent = funnyReactions[ventCount % funnyReactions.length];
        ventBubble.style.animation = 'none';
        void ventBubble.offsetWidth;
        ventBubble.style.animation = 'popBubble 0.3s ease';
      }

      // Avatar expression
      if (avatarFace) {
        if (angerLevel === 0) avatarFace.textContent = "🥰";
        else if (angerLevel < 35) avatarFace.textContent = "🫶";
        else if (angerLevel < 70) avatarFace.textContent = "🤕";
        else avatarFace.textContent = "😭";
      }

      // Counter
      if (ventCounter) {
        ventCounter.innerHTML = `Hits landed: <strong>${ventCount}</strong> times (Anger dropping fast!)`;
      }
    });
  });

  // ==========================================
  // STAGE 3: PENANCES SIGNING
  // ==========================================
  const btnSignPenance = container.querySelector('#btnSignPenance');
  const penanceStampedBadge = container.querySelector('#penanceStampedBadge');

  btnSignPenance?.addEventListener('click', () => {
    penancesSigned = true;
    playSound('stamp');
    if (navigator.vibrate) navigator.vibrate(40);
    btnSignPenance.style.display = 'none';
    if (penanceStampedBadge) {
      penanceStampedBadge.style.display = 'inline-block';
      penanceStampedBadge.style.animation = 'stampPop 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
  });

  // ==========================================
  // STAGE 4: POLAROIDS 3D FLIP
  // ==========================================
  container.querySelectorAll('.sorry-polaroid-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
      if (navigator.vibrate) navigator.vibrate(15);
    });
  });

  // ==========================================
  // STAGE 5: PEACE TREATY SCANNER
  // ==========================================
  const scannerPad = container.querySelector('#scannerPad');
  const scannerInstruction = container.querySelector('#scannerInstruction');
  const treatyGoldSeal = container.querySelector('#treatyGoldSeal');
  let scanTimer = null;

  function startScan(e) {
    if (treatySigned) return;
    if (e.cancelable) e.preventDefault();
    scannerPad?.classList.add('scanning');
    if (scannerInstruction) scannerInstruction.textContent = "Scanning Royal Fingerprint... Hold Still! ⏳";

    scanTimer = setTimeout(() => {
      treatySigned = true;
      playSound('stamp');
      playSound('chime');
      if (navigator.vibrate) navigator.vibrate([40, 80, 40]);
      scannerPad?.classList.remove('scanning');
      scannerPad?.classList.add('scanned-success');
      if (scannerInstruction) scannerInstruction.textContent = "Fingerprint Verified! Treaty Formally Sealed ✨";
      if (treatyGoldSeal) {
        treatyGoldSeal.style.display = 'flex';
        treatyGoldSeal.style.animation = 'stampPop 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      }
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }, 1800);
  }

  function cancelScan() {
    if (treatySigned) return;
    if (scanTimer) clearTimeout(scanTimer);
    scannerPad?.classList.remove('scanning');
    if (scannerInstruction) scannerInstruction.textContent = "Press & Hold Your Thumb For 2 Seconds To Ratify";
  }

  scannerPad?.addEventListener('mousedown', startScan);
  scannerPad?.addEventListener('mouseup', cancelScan);
  scannerPad?.addEventListener('mouseleave', cancelScan);
  scannerPad?.addEventListener('touchstart', startScan, { passive: false });
  scannerPad?.addEventListener('touchend', cancelScan);
  scannerPad?.addEventListener('touchcancel', cancelScan);

  // ==========================================
  // STAGE 6: COUPONS CLAIMING
  // ==========================================
  container.querySelectorAll('.sorry-coupon-card').forEach(card => {
    const btn = card.querySelector('.btn-claim-coupon');
    btn?.addEventListener('click', () => {
      playSound('chime');
      if (navigator.vibrate) navigator.vibrate(25);
      card.classList.add('claimed');
      btn.textContent = "Claimed ✓";
      btn.style.background = "#22c55e";
      btn.style.borderColor = "#22c55e";
      confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    });
  });

  // ==========================================
  // STAGE 7: RUNAWAY NO & YES VERDICT
  // ==========================================
  const btnNo = container.querySelector('#btnForgiveNo');
  const btnYes = container.querySelector('#btnForgiveYes');
  const successCard = container.querySelector('#forgiveSuccessCard');
  const btnWhatsappHug = container.querySelector('#btnWhatsappHug');
  const btnCelebrateMore = container.querySelector('#btnCelebrateMore');

  const runawayQuotes = [
    "No 😠",
    "Nice try! 😜",
    "You know you miss me! 🥰",
    "I'll make you breakfast in bed! 🥞",
    "Look into my puppy eyes 🐶",
    "Can't catch me! 🏃‍♂️💨",
    "Tap YES instead! ❤️",
    "Please baby? 🥺",
    "I'm on my knees! 🧎‍♂️",
    "Unlimited cuddles guaranteed! 🧸",
    "You know I love you! 💕"
  ];
  let quoteIdx = 0;
  let dodgeCount = 0;

  function dodgeNo() {
    dodgeCount++;
    playSound('boing');
    const rx = (Math.random() - 0.5) * 240;
    const ry = (Math.random() - 0.5) * 160;
    const scale = Math.max(0.75, 1 - dodgeCount * 0.04);
    btnNo.style.transform = `translate(${rx}px, ${ry}px) scale(${scale})`;
    quoteIdx = (quoteIdx + 1) % runawayQuotes.length;
    btnNo.textContent = runawayQuotes[quoteIdx];
    if (navigator.vibrate) navigator.vibrate(15);
  }

  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('touchstart', (e) => {
    if (e.cancelable) e.preventDefault();
    dodgeNo();
  });

  btnYes?.addEventListener('click', () => {
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate([50, 100, 50]);

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#fbbf24', '#10b981', '#38bdf8', '#fff']
    });

    // Hide decision buttons & show success card
    btnNo.style.display = 'none';
    btnYes.style.display = 'none';
    if (successCard) {
      successCard.style.display = 'block';
      successCard.style.animation = 'scaleUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    // Set WhatsApp hug link
    const hugMsg = `I forgive you, ${senderName}! ❤️🫂 But you still owe me my boba, massage, and penance tasks! 🥰✨`;
    if (btnWhatsappHug) {
      btnWhatsappHug.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(hugMsg)}`;
    }
  });

  btnCelebrateMore?.addEventListener('click', () => {
    playSound('chime');
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 }
    });
  });
}
