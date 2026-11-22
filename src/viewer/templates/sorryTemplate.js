// src/viewer/templates/sorryTemplate.js - Multi-Page Sincere Apology & Playful Reconciliation Experience

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
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

  const creatorPhoto = data.creatorPhoto || "/images/always_you.jpg";

  const pageTitles = [
    { num: 1, icon: "💌", title: "The Sincere Confession" },
    { num: 2, icon: "🥊", title: "Interactive Venting Room" },
    { num: 3, icon: "⚖️", title: "Legal Penance Treaty" },
    { num: 4, icon: "📸", title: "Cherished Memories" },
    { num: 5, icon: "📜", title: "Official Peace Treaty" },
    { num: 6, icon: "🎟️", title: "VIP Reconciliation Coupons" },
    { num: 7, icon: "💖", title: "The Final Forgiveness Verdict" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-storybook-viewport">
      <!-- Ambient Sparkle Mesh Canvas -->
      <canvas id="sorryCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Untouchable Non-Interactive Stage Progress Bar (Top tabs are disabled & replaced by pure passive progress tracker) -->
      <header class="sorry-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="sorry-step-progress-track">
          <div class="sorry-step-progress-fill" id="stepProgressFill" style="width: 14%;"></div>
        </div>

        <div class="sorry-stage-indicator-bar">
          <div class="sorry-stage-info-pill">
            <span class="stage-step-tag" id="stageStepPill">STAGE 1 OF 7</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="stageTitleText">The Sincere Confession 💌</span>
          </div>
          <div class="sorry-stage-locked-tag">
            <span>🔒 Sincere Order Enforced</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Slider Container -->
      <main class="sorry-pages-container" id="sorryPagesContainer">
        
        <!-- PAGE 1: 💌 THE SINCERE CONFESSION -->
        <section class="sorry-page-card active" data-page="1">
          <div class="sorry-hero-wrap">
            <!-- INTERACTIVE 60FPS RAINSTORM TO RADIANT RAINBOW & KINTSUGI MENDED HEART ARENA -->
            <div class="sorry-rain-arena" id="sorryRainArena" style="position:relative; width:100%; max-width:440px; min-height:260px; margin:14px auto 18px auto; border-radius:22px; overflow:hidden; background:linear-gradient(180deg, rgba(15,23,42,0.94) 0%, rgba(30,41,59,0.96) 100%); border:1.5px solid rgba(148,163,184,0.3); box-shadow:0 12px 36px rgba(0,0,0,0.45); text-align:center; padding:16px 14px 18px 14px; box-sizing:border-box;">
              
              <!-- Interactive Rain Canvas -->
              <canvas id="kintsugiRainCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

              <!-- Radiant Rainbow Arc -->
              <div id="kintsugiRainbow" style="position:absolute; top:-30px; left:50%; transform:translateX(-50%); width:340px; height:180px; border-radius:180px 180px 0 0; background:radial-gradient(ellipse at bottom, transparent 48%, rgba(255,0,0,0.38) 50%, rgba(255,127,0,0.38) 54%, rgba(255,255,0,0.38) 58%, rgba(0,255,0,0.38) 62%, rgba(0,127,255,0.38) 66%, rgba(75,0,130,0.38) 70%, rgba(148,0,211,0.38) 74%, transparent 78%); opacity:0; pointer-events:none; z-index:2; filter:blur(1px); transition:opacity 0.8s ease;"></div>

              <!-- Header Status Badge -->
              <div style="position:relative; z-index:3; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding:0 6px;">
                <span id="stormStatePill" style="font-size:11px; font-weight:800; letter-spacing:0.8px; background:rgba(239,68,68,0.22); color:#fca5a5; border:1px solid rgba(239,68,68,0.4); padding:4px 10px; border-radius:20px; text-transform:uppercase;">
                  🌧️ Gloomy Storm Active
                </span>
                <span id="heartBatteryVal" style="font-size:12px; font-weight:800; color:#fbbf24;">
                  Heart Level: 12% 💔
                </span>
              </div>

              <!-- Kintsugi Heart Stage -->
              <div class="kintsugi-stage" id="kintsugiStage" style="position:relative; z-index:3; width:160px; height:140px; margin:0 auto 10px auto; cursor:pointer;" title="Tap to mend heart with gold">
                <!-- Left Heart Half -->
                <svg id="heartHalfLeft" viewBox="0 0 100 160" style="position:absolute; left:14px; top:0; width:65px; height:125px; filter:drop-shadow(0 6px 14px rgba(225,29,72,0.45)); transform:rotate(-8deg) translateX(-5px); transition:transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
                  <path d="M 95 30 C 95 10, 70 0, 45 0 C 20 0, 0 20, 0 55 C 0 95, 45 130, 95 155 Z" fill="url(#leftHeartGrad)"/>
                  <defs>
                    <linearGradient id="leftHeartGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#f43f5e"/>
                      <stop offset="100%" stop-color="#be123c"/>
                    </linearGradient>
                  </defs>
                </svg>

                <!-- Right Heart Half -->
                <svg id="heartHalfRight" viewBox="0 0 100 160" style="position:absolute; right:14px; top:0; width:65px; height:125px; filter:drop-shadow(0 6px 14px rgba(225,29,72,0.45)); transform:rotate(8deg) translateX(5px); transition:transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);">
                  <path d="M 5 30 C 5 10, 30 0, 55 0 C 80 0, 100 20, 100 55 C 100 95, 55 130, 5 155 Z" fill="url(#rightHeartGrad)"/>
                  <defs>
                    <linearGradient id="rightHeartGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#fb7185"/>
                      <stop offset="100%" stop-color="#e11d48"/>
                    </linearGradient>
                  </defs>
                </svg>

                <!-- Glowing Golden Kintsugi Seam -->
                <svg id="kintsugiGoldSeam" viewBox="0 0 40 160" style="position:absolute; left:50%; top:0; transform:translateX(-50%); width:34px; height:130px; z-index:4; opacity:0.3; filter:drop-shadow(0 0 6px #ffd700); transition:opacity 0.4s ease;">
                  <path d="M 20 5 L 26 35 L 14 65 L 25 95 L 16 125 L 20 155" fill="none" stroke="#ffd700" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="26" cy="35" r="3" fill="#ffffff" />
                  <circle cx="14" cy="65" r="3" fill="#ffffff" />
                  <circle cx="25" cy="95" r="3" fill="#ffffff" />
                </svg>

                <!-- Center Healing Golden Aura -->
                <div id="kintsugiAura" style="position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:75px; height:75px; border-radius:50%; background:radial-gradient(circle, #fde047 0%, #ca8a04 50%, transparent 75%); opacity:0; pointer-events:none; filter:blur(4px); transition:opacity 0.4s ease;"></div>
              </div>

              <!-- Dynamic Speech / Quote Banner -->
              <div id="sorryMendBanner" style="position:relative; z-index:3; font-size:12.5px; font-weight:700; color:#f8fafc; background:rgba(0,0,0,0.5); padding:8px 14px; border-radius:12px; border:1px solid rgba(255,255,255,0.12); margin-bottom:12px; min-height:20px; transition:all 0.3s ease;">
                "Tap heart or button to mend our bond with pure golden kintsugi 🥺✨"
              </div>

              <!-- Interactive Action Buttons -->
              <div style="position:relative; z-index:3; display:flex; justify-content:center; gap:8px;">
                <button type="button" id="btnMendKintsugi" style="background:linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%); color:#0f172a; font-weight:900; font-size:12px; border:none; padding:8px 16px; border-radius:20px; cursor:pointer; box-shadow:0 4px 16px rgba(245,158,11,0.4); display:inline-flex; align-items:center; gap:5px;">
                  ✨ Mend With Gold
                </button>
                <button type="button" id="btnWipeStorm" style="background:linear-gradient(135deg, #38bdf8 0%, #0284c7 100%); color:#ffffff; font-weight:800; font-size:12px; border:none; padding:8px 15px; border-radius:20px; cursor:pointer; box-shadow:0 4px 14px rgba(2,132,199,0.35); display:inline-flex; align-items:center; gap:5px;">
                  🌈 Clear Rainstorm
                </button>
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
              You have every right to be mad. Tap any item below to throw it right at my face!
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

              <!-- Interactive Reaction Avatar with Real Photo & Dynamic Stick-On Decals -->
              <div class="vent-avatar-stage">
                <div class="vent-avatar-character vent-target-frame" id="ventAvatar">
                  <img src="${creatorPhoto}" alt="${senderName}" class="vent-creator-img" id="ventCreatorImg" onerror="this.src='/images/always_you.jpg'" />
                  <div class="vent-decals-layer" id="ventDecalsLayer"></div>
                  <div class="vent-face-expression-pill" id="avatarFace">🥺</div>
                </div>
                <div class="vent-reaction-bubble" id="ventBubble">
                  "I know you're mad at me... I'm listening 🥺"
                </div>
                <button type="button" class="btn-wipe-face" id="btnWipeFace">
                  🧻 Wipe Face Clean
                </button>
              </div>

              <!-- Throwable Arsenal (Cake, Teddy, Tomato, Slipper, Water, Egg) -->
              <div class="throwables-grid">
                <button type="button" class="btn-throwable" data-type="cake" title="Throw Birthday Cake">
                  <span class="throw-icon">🎂</span>
                  <span class="throw-label">Cake Splat</span>
                  <span class="throw-sub">Splat! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="teddy" title="Throw Soft Teddy">
                  <span class="throw-icon">🧸</span>
                  <span class="throw-label">Soft Teddy</span>
                  <span class="throw-sub">Boing! (-15% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="tomato" title="Throw Juicy Tomato">
                  <span class="throw-icon">🍅</span>
                  <span class="throw-label">Juicy Tomato</span>
                  <span class="throw-sub">Squish! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="slipper" title="Throw Flying Slipper">
                  <span class="throw-icon">🩴</span>
                  <span class="throw-label">The Chappal</span>
                  <span class="throw-sub">WHACK! (-25% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="water" title="Throw Water Balloon">
                  <span class="throw-icon">💧</span>
                  <span class="throw-label">Water Splash</span>
                  <span class="throw-sub">Splash! (-20% Mad)</span>
                </button>
                <button type="button" class="btn-throwable" data-type="egg" title="Throw Rotten Egg">
                  <span class="throw-icon">🥚</span>
                  <span class="throw-label">Rotten Egg</span>
                  <span class="throw-sub">Crack! (-20% Mad)</span>
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
            <h2 class="sorry-section-title">Pick & Add My Punishments! ⚖️</h2>
            <p class="sorry-section-subtitle">
              Check off what you want me to do, or type your own custom punishments below! I promise to execute all of them with zero complaining:
            </p>

            <!-- Viewer Custom Punishment Input -->
            <div class="add-punishment-bar" style="margin-bottom:16px; display:flex; gap:8px;">
              <input type="text" id="inpCustomPunishment" class="inp-custom-punishment" placeholder="Type custom punishment (e.g. Buy me 5 bobas, fold laundry)..." maxlength="120" style="flex:1; background:rgba(255,255,255,0.08); border:1.5px solid rgba(251,191,36,0.4); border-radius:14px; padding:12px 14px; color:#fff; font-size:13px; outline:none; transition:border-color 0.2s;" />
              <button type="button" id="btnAddPunishment" class="btn-add-punishment" style="background:linear-gradient(135deg, #fbbf24, #f59e0b); color:#1c1216; border:none; padding:0 18px; border-radius:14px; font-weight:800; font-size:13px; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px; box-shadow:0 4px 14px rgba(251,191,36,0.35); transition:transform 0.15s;">
                <span>+ Add</span>
              </button>
            </div>

            <!-- Summary badge -->
            <div id="punishmentCountBadge" style="margin-bottom:12px; font-size:12px; color:#fbbf24; font-weight:700;">
              ⚖️ Loading punishments...
            </div>

            <div class="penance-grid" id="penanceGrid"></div>

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
                      <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 6px auto 2px auto; background: linear-gradient(135deg, #f43f5e, #e11d48); color:#fff; border:none; padding:6px 14px; border-radius:18px; font-size:11px; font-weight:800; cursor:pointer; box-shadow:0 3px 10px rgba(225,29,72,0.3); display:inline-flex; align-items:center; gap:5px; pointer-events:auto;">
                        📸 Save Keepsake
                      </button>
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

              <!-- Interactive 2-Second Hold Seal & Wax Stamp Arena -->
              <div class="treaty-holding-dock" style="margin-top:16px; display:flex; flex-direction:column; align-items:center;">
                <!-- Circular Progress Press-and-Hold Button -->
                <div class="treaty-hold-seal-wrapper" style="position:relative; width:104px; height:104px; margin:0 auto; user-select:none; -webkit-user-select:none; touch-action:none;">
                  <!-- SVG Progress Ring -->
                  <svg class="treaty-hold-svg" width="104" height="104" viewBox="0 0 104 104" style="position:absolute; top:0; left:0; transform:rotate(-90deg); pointer-events:none;">
                    <circle cx="52" cy="52" r="46" stroke="rgba(217, 119, 6, 0.22)" stroke-width="7" fill="none" />
                    <circle id="treatyHoldRing" cx="52" cy="52" r="46" stroke="#d97706" stroke-width="7" stroke-linecap="round" fill="none"
                      stroke-dasharray="289" stroke-dashoffset="289" style="transition: stroke-dashoffset 0.05s linear;" />
                  </svg>
                  <!-- Center Hold Button -->
                  <div class="treaty-hold-button" id="treatyHoldButton" role="button" aria-label="Hold for 2 seconds to ratify peace treaty"
                    style="position:absolute; inset:8px; border-radius:50%; background:radial-gradient(circle, #78350f 0%, #451a03 100%); border:3px solid #f59e0b; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 6px 20px rgba(180,83,9,0.5); transition:transform 0.15s, box-shadow 0.15s;">
                    <span class="treaty-btn-icon" id="treatyBtnIcon" style="font-size:32px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));">👑</span>
                  </div>
                </div>

                <!-- Linear Progress Bar -->
                <div class="treaty-hold-timer-bar-wrap" style="width:200px; height:6px; background:rgba(0,0,0,0.15); border-radius:10px; margin-top:14px; overflow:hidden;">
                  <div id="treatyHoldLinearBar" style="width:0%; height:100%; background:linear-gradient(90deg, #f59e0b, #ef4444); border-radius:10px; transition:width 0.05s linear;"></div>
                </div>

                <!-- Real-time instruction text -->
                <div class="treaty-hold-instruction" id="treatyHoldInstruction" style="margin-top:8px; font-size:12.5px; font-weight:800; color:#78350f;">
                  👆 Press & Hold for 2 Seconds to Ratify Peace Treaty!
                </div>

                <!-- Celebratory YAYYY! CONVINCED! Banner (Appears after 2s hold) -->
                <div class="treaty-convinced-card" id="treatyConvincedCard" style="display:none; margin-top:18px; width:100%; max-width:440px; background:linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius:20px; padding:20px 16px; color:#fff; box-shadow:0 12px 35px rgba(16,185,129,0.45); border:2px solid #34d399; text-align:center;">
                  <div class="convinced-badge-emoji" style="font-size:42px; margin-bottom:4px; animation:bounce 0.8s infinite;">🎉🥳💖</div>
                  <h3 style="font-family:'Playfair Display',serif; font-size:24px; font-weight:900; margin:0 0 6px 0; color:#fff; letter-spacing:0.5px;">
                    YAYYY! CONVINCED! 🎉
                  </h3>
                  <p style="font-size:13.5px; margin:0 0 12px 0; line-height:1.45; color:#ecfdf5;">
                    The Peace Treaty is officially ratified & sealed by Her Majesty! We are back together! 🥰💖
                  </p>
                  <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(0,0,0,0.22); padding:6px 14px; border-radius:20px; font-size:11.5px; font-weight:800; border:1px solid rgba(255,255,255,0.3);">
                    <span>👑 SIGNED & SEALED BY QUEEN ${recipientName.toUpperCase()}</span>
                  </div>
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

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#stepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Untouchable Stage Banner (Never clickable pills)
    const stepPill = container.querySelector('#stageStepPill');
    if (stepPill) stepPill.textContent = `STAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#stageTitleText');
    if (titleText && pageTitles[currentPage - 1]) {
      titleText.textContent = `${pageTitles[currentPage - 1].title} ${pageTitles[currentPage - 1].icon}`;
    }

    // Update Page View
    container.querySelectorAll('.sorry-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    // Scroll smoothly to top of viewport
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Top header is a 100% passive progress tracker (jumping ahead is strictly prohibited)
  // Navigation happens purely through the sincere interactive stage actions below

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
  // STAGE 2: VENTING ROOM WITH REAL PHOTO & DYNAMIC STICK-ON DECALS
  // ==========================================
  const ventAvatar = container.querySelector('#ventAvatar');
  const avatarFace = container.querySelector('#avatarFace');
  const ventBubble = container.querySelector('#ventBubble');
  const angerGaugeFill = container.querySelector('#angerGaugeFill');
  const angerValText = container.querySelector('#angerValText');
  const ventCounter = container.querySelector('#ventCounterText');
  const ventDecalsLayer = container.querySelector('#ventDecalsLayer');
  const btnWipeFace = container.querySelector('#btnWipeFace');

  const funnyReactions = [
    "Ouch! That cake cream got right in my eye! 🥺🍰",
    "Direct hit with the chappal! Your aim is legendary 🩴😂",
    "Tomato squished on my nose! Still smiling because you're cute! 🍅🫶",
    "A teddy to the cheek! Softer than expected 🧸🥰",
    "Water balloon exploded! Now I'm cute AND drenched 💧",
    "Rotten egg hit! Okay I definitely deserved that one 🥚😭",
    "I'm staying right here until your heart feels warm again ❤️",
    "Throw another one! I can take a hundred more for you! 🫶",
    "Is that beautiful smile finally returning? 🥺✨"
  ];

  const throwableMap = {
    cake: {
      sound: 'splat',
      icon: '🎂',
      decal: '🍰',
      angerDelta: 20
    },
    teddy: {
      sound: 'boing',
      icon: '🧸',
      decal: '🧸',
      angerDelta: 15
    },
    tomato: {
      sound: 'splat',
      icon: '🍅',
      decal: '🍅',
      angerDelta: 20
    },
    slipper: {
      sound: 'boing',
      icon: '🩴',
      decal: '🩴',
      angerDelta: 25
    },
    water: {
      sound: 'splash',
      icon: '💧',
      decal: '💧',
      angerDelta: 20
    },
    egg: {
      sound: 'splat',
      icon: '🥚',
      decal: '🍳',
      angerDelta: 20
    }
  };

  container.querySelectorAll('.btn-throwable').forEach(btn => {
    btn.addEventListener('click', () => {
      ventCount++;
      const type = btn.getAttribute('data-type') || 'cake';
      const def = throwableMap[type] || throwableMap.cake;

      // Deduct anger
      angerLevel = Math.max(0, angerLevel - def.angerDelta);
      if (angerGaugeFill) angerGaugeFill.style.width = `${angerLevel}%`;
      if (angerValText) {
        if (angerLevel > 70) angerValText.textContent = `${angerLevel}% (Furious)`;
        else if (angerLevel > 40) angerValText.textContent = `${angerLevel}% (Softening up)`;
        else if (angerLevel > 0) angerValText.textContent = `${angerLevel}% (Almost Giggling)`;
        else angerValText.textContent = `0% (Anger Fully Melted 😇)`;
      }

      // Fly projectile from clicked button towards the face center
      try {
        const btnRect = btn.getBoundingClientRect();
        const avatarRect = ventAvatar ? ventAvatar.getBoundingClientRect() : null;
        if (avatarRect) {
          const projectile = document.createElement('div');
          projectile.className = 'flying-projectile';
          projectile.textContent = def.icon;
          projectile.style.left = `${btnRect.left + btnRect.width / 2}px`;
          projectile.style.top = `${btnRect.top + btnRect.height / 2}px`;
          projectile.style.transform = 'translate(-50%, -50%) scale(0.6)';
          projectile.style.opacity = '1';
          document.body.appendChild(projectile);

          requestAnimationFrame(() => {
            const targetX = avatarRect.left + avatarRect.width / 2 - (btnRect.left + btnRect.width / 2);
            const targetY = avatarRect.top + avatarRect.height / 2 - (btnRect.top + btnRect.height / 2);
            projectile.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.6) rotate(${Math.random() * 360}deg)`;
          });

          setTimeout(() => {
            projectile.remove();
          }, 290);
        }
      } catch (err) {
        console.warn("Projectile animation:", err);
      }

      // Sound feedback
      playSound(def.sound);

      // Vibrate
      if (navigator.vibrate) navigator.vibrate([25, 35, 25]);

      // Wobble Avatar Face
      if (ventAvatar) {
        ventAvatar.classList.remove('wobble-hit');
        void ventAvatar.offsetWidth;
        ventAvatar.classList.add('wobble-hit');
      }

      // Dynamically Stick Decal onto Avatar Face!
      if (ventDecalsLayer) {
        const decal = document.createElement('div');
        decal.className = `vent-decal decal-${type}`;
        // Randomized location inside face boundaries (18% to 76%)
        const rx = 18 + Math.random() * 58;
        const ry = 18 + Math.random() * 58;
        const rot = -35 + Math.random() * 70;
        const scale = 0.85 + Math.random() * 0.45;
        decal.style.left = `${rx}%`;
        decal.style.top = `${ry}%`;
        decal.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`;
        decal.textContent = def.decal;
        ventDecalsLayer.appendChild(decal);
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
        ventCounter.innerHTML = `Hits landed: <strong>${ventCount}</strong> items stuck on face!`;
      }
    });
  });

  // Wipe Face Clean Button
  btnWipeFace?.addEventListener('click', () => {
    if (ventDecalsLayer) {
      ventDecalsLayer.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      ventDecalsLayer.style.opacity = '0';
      ventDecalsLayer.style.transform = 'scale(0.85)';
      setTimeout(() => {
        ventDecalsLayer.innerHTML = '';
        ventDecalsLayer.style.opacity = '1';
        ventDecalsLayer.style.transform = 'none';
        ventDecalsLayer.style.transition = '';
      }, 260);
    }
    if (ventBubble) {
      ventBubble.textContent = "Face wiped sparkling clean! Ready if you want to throw more 🥺🧻";
      ventBubble.style.animation = 'none';
      void ventBubble.offsetWidth;
      ventBubble.style.animation = 'popBubble 0.3s ease';
    }
    if (avatarFace) avatarFace.textContent = "🥺";
    playSound('boing');
    if (navigator.vibrate) navigator.vibrate(25);
  });

  // ==========================================
  // STAGE 3: INTERACTIVE PENANCES & VIEWER PUNISHMENTS
  // ==========================================
  let viewerPunishments = [
    ...(penances && penances.length > 0 ? penances : [
      "Buy your favorite Iced Boba / Treat right now 🧋",
      "30-minute soothing massage whenever you ask 💆‍♀️",
      "Order whatever food you are craving tonight, my treat 🍕",
      "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
      "Fold all your laundry & do your chores this weekend 🧹",
      "Write 100 cute post-it notes of things I adore about you 📝"
    ])
  ].map((text, i) => ({
    id: `punishment_default_${i}`,
    text,
    checked: true,
    isCustom: false
  }));

  const penanceGrid = container.querySelector('#penanceGrid');
  const punishmentCountBadge = container.querySelector('#punishmentCountBadge');
  const inpCustomPunishment = container.querySelector('#inpCustomPunishment');
  const btnAddPunishment = container.querySelector('#btnAddPunishment');
  const btnSignPenance = container.querySelector('#btnSignPenance');
  const penanceStampedBadge = container.querySelector('#penanceStampedBadge');

  function renderPenanceGrid() {
    if (!penanceGrid) return;

    penanceGrid.innerHTML = viewerPunishments.map((item, i) => `
      <div class="penance-item-card ${item.checked ? 'checked' : ''}" data-id="${item.id}" style="cursor:pointer; user-select:none; transition:all 0.2s ease;">
        <div class="penance-check-box" style="${item.checked ? '' : 'background:rgba(255,255,255,0.15); color:transparent; box-shadow:none;'}">
          ${item.checked ? '✓' : ''}
        </div>
        <div class="penance-item-content">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="penance-badge" style="${item.isCustom ? 'color:#38bdf8;' : ''}">
              ${item.isCustom ? '⭐ CUSTOM PUNISHMENT' : `PUNISHMENT #0${i + 1}`}
            </span>
            ${item.isCustom ? `
              <button type="button" class="btn-del-penance" data-id="${item.id}" title="Remove custom punishment" style="background:transparent; border:none; color:#f87171; font-size:14px; cursor:pointer; padding:2px 6px;">✕</button>
            ` : ''}
          </div>
          <p class="penance-text" style="${item.checked ? '' : 'opacity:0.55; text-decoration:line-through;'}">${item.text}</p>
        </div>
      </div>
    `).join('');

    const activeCount = viewerPunishments.filter(p => p.checked).length;
    if (punishmentCountBadge) {
      if (activeCount === 0) {
        punishmentCountBadge.textContent = "⚖️ No punishments selected (He got off easy! Tap items to select or add above)";
        punishmentCountBadge.style.color = "#94a3b8";
      } else {
        punishmentCountBadge.textContent = `⚖️ ${activeCount} punishment${activeCount > 1 ? 's' : ''} assigned to boyfriend!`;
        punishmentCountBadge.style.color = "#fbbf24";
      }
    }

    // Toggle punishment check
    penanceGrid.querySelectorAll('.penance-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-del-penance')) return;
        const id = card.getAttribute('data-id');
        const target = viewerPunishments.find(p => p.id === id);
        if (target) {
          target.checked = !target.checked;
          playSound(target.checked ? 'boing' : 'splat');
          if (navigator.vibrate) navigator.vibrate(18);
          renderPenanceGrid();
        }
      });
    });

    // Delete custom item
    penanceGrid.querySelectorAll('.btn-del-penance').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        viewerPunishments = viewerPunishments.filter(p => p.id !== id);
        playSound('splat');
        if (navigator.vibrate) navigator.vibrate(20);
        renderPenanceGrid();
      });
    });
  }

  function handleAddCustomPunishment() {
    if (!inpCustomPunishment) return;
    const val = inpCustomPunishment.value.trim();
    if (!val) {
      inpCustomPunishment.focus();
      return;
    }
    viewerPunishments.push({
      id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      text: val,
      checked: true,
      isCustom: true
    });
    inpCustomPunishment.value = '';
    renderPenanceGrid();
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate(30);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });
  }

  btnAddPunishment?.addEventListener('click', handleAddCustomPunishment);
  inpCustomPunishment?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomPunishment();
    }
  });

  btnSignPenance?.addEventListener('click', () => {
    penancesSigned = true;
    playSound('stamp');
    if (navigator.vibrate) navigator.vibrate(40);
    btnSignPenance.style.display = 'none';
    if (penanceStampedBadge) {
      penanceStampedBadge.style.display = 'inline-block';
      penanceStampedBadge.style.animation = 'stampPop 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.65 }
    });
  });

  // Initial render of punishment deed
  renderPenanceGrid();

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
  // STAGE 5: PEACE TREATY - 2-SECOND HOLD & YAYYY CONVINCED ANIMATION
  // ==========================================
  const treatyHoldBtn = container.querySelector('#treatyHoldButton');
  const treatyHoldRing = container.querySelector('#treatyHoldRing');
  const treatyHoldLinearBar = container.querySelector('#treatyHoldLinearBar');
  const treatyHoldInstruction = container.querySelector('#treatyHoldInstruction');
  const treatyConvincedCard = container.querySelector('#treatyConvincedCard');
  const treatyBtnIcon = container.querySelector('#treatyBtnIcon');

  const ringCircumference = 289; // 2 * PI * 46
  const requiredHoldMs = 2000; // Exact 2.0s hold
  let holdStartTime = 0;
  let holdRafId = null;
  let isHoldActive = false;

  function onHoldStart(e) {
    if (treatySigned) return;
    if (e.cancelable) e.preventDefault();
    isHoldActive = true;
    holdStartTime = performance.now();
    treatyHoldBtn?.classList.add('holding');

    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "Hold firmly... Signing peace treaty... ⏳";
      treatyHoldInstruction.style.color = "#d97706";
    }
    if (navigator.vibrate) navigator.vibrate(25);

    function step(now) {
      if (!isHoldActive) return;
      const elapsed = now - holdStartTime;
      const progress = Math.min(1, elapsed / requiredHoldMs);

      // Smooth SVG Progress Ring
      if (treatyHoldRing) {
        treatyHoldRing.style.strokeDashoffset = `${ringCircumference * (1 - progress)}`;
      }
      // Linear Progress Fill
      if (treatyHoldLinearBar) {
        treatyHoldLinearBar.style.width = `${progress * 100}%`;
      }

      if (progress >= 1) {
        onHoldComplete();
      } else {
        holdRafId = requestAnimationFrame(step);
      }
    }

    holdRafId = requestAnimationFrame(step);
  }

  function onHoldEnd() {
    if (treatySigned) return;
    if (!isHoldActive) return;
    isHoldActive = false;
    if (holdRafId) cancelAnimationFrame(holdRafId);
    treatyHoldBtn?.classList.remove('holding');

    // Smooth reset
    if (treatyHoldRing) {
      treatyHoldRing.style.strokeDashoffset = `${ringCircumference}`;
    }
    if (treatyHoldLinearBar) {
      treatyHoldLinearBar.style.width = `0%`;
    }
    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "👆 Press & Hold for 2 full seconds to sign!";
      treatyHoldInstruction.style.color = "#78350f";
    }
  }

  function onHoldComplete() {
    treatySigned = true;
    isHoldActive = false;
    if (holdRafId) cancelAnimationFrame(holdRafId);

    // Audio effects
    playSound('stamp');
    setTimeout(() => playSound('chime'), 200);

    // Tactile vibration
    if (navigator.vibrate) navigator.vibrate([60, 100, 60, 140]);

    if (treatyBtnIcon) treatyBtnIcon.textContent = "✅";
    if (treatyHoldBtn) {
      treatyHoldBtn.style.background = "#10b981";
      treatyHoldBtn.style.borderColor = "#34d399";
      treatyHoldBtn.style.transform = "scale(1.05)";
    }
    if (treatyHoldInstruction) {
      treatyHoldInstruction.textContent = "✨ Treaty Officially Ratified by Her Majesty!";
      treatyHoldInstruction.style.color = "#059669";
    }

    // Celebratory YAYYY! CONVINCED! Confetti Blast
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ff4d6d', '#fbbf24', '#10b981', '#38bdf8', '#ffd700']
    });
    setTimeout(() => {
      confetti({
        particleCount: 75,
        spread: 120,
        origin: { y: 0.5 },
        colors: ['#34d399', '#f43f5e', '#a855f7', '#fbbf24']
      });
    }, 380);

    // Pop up the YAYYY! CONVINCED! Banner with elastic bounce
    if (treatyConvincedCard) {
      treatyConvincedCard.style.display = 'block';
      gsap.fromTo(treatyConvincedCard,
        { scale: 0.65, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.65, ease: 'back.out(2)' }
      );
    }
  }

  // Pointer & Touch Events for 100% Mobile & Desktop Accuracy
  treatyHoldBtn?.addEventListener('pointerdown', onHoldStart);
  window.addEventListener('pointerup', onHoldEnd);
  window.addEventListener('pointercancel', onHoldEnd);
  treatyHoldBtn?.addEventListener('touchstart', onHoldStart, { passive: false });
  window.addEventListener('touchend', onHoldEnd);
  window.addEventListener('touchcancel', onHoldEnd);

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

  // =========================================================================
  // LIVING RAIN-TO-SUNSHINE CLEARING SKY CANVAS (60FPS)
  // =========================================================================
  let isForgiven = false;
  const sCanvas = container.querySelector('#sorryCanvas');
  if (sCanvas) {
    const sCtx = sCanvas.getContext('2d');
    let sW = (sCanvas.width = window.innerWidth);
    let sH = (sCanvas.height = window.innerHeight);

    const raindrops = Array.from({ length: 45 }, () => ({
      x: Math.random() * sW,
      y: Math.random() * sH,
      len: 12 + Math.random() * 15,
      speedY: 7 + Math.random() * 8,
      speedX: -1 + (Math.random() - 0.5) * 0.5,
      alpha: 0.2 + Math.random() * 0.4
    }));

    const sunnyHearts = Array.from({ length: 28 }, () => ({
      x: Math.random() * sW,
      y: sH + Math.random() * 50,
      size: 8 + Math.random() * 12,
      speedY: 0.8 + Math.random() * 1.4,
      rot: Math.random() * 360,
      alpha: 0.3 + Math.random() * 0.5,
      color: ['#ff4d6d', '#f43f5e', '#fbbf24', '#f472b6'][Math.floor(Math.random() * 4)]
    }));

    function animSorry() {
      sCtx.clearRect(0, 0, sW, sH);

      if (!isForgiven) {
        sCtx.strokeStyle = 'rgba(186, 230, 253, 0.4)';
        sCtx.lineWidth = 1.5;
        sCtx.lineCap = 'round';
        for (const r of raindrops) {
          r.y += r.speedY;
          r.x += r.speedX;
          if (r.y > sH) {
            r.y = -20;
            r.x = Math.random() * sW;
          }
          sCtx.beginPath();
          sCtx.moveTo(r.x, r.y);
          sCtx.lineTo(r.x + r.speedX * 2, r.y + r.len);
          sCtx.stroke();
        }
      } else {
        for (const h of sunnyHearts) {
          h.y -= h.speedY;
          if (h.y < -20) {
            h.y = sH + 20;
            h.x = Math.random() * sW;
          }
          sCtx.save();
          sCtx.translate(h.x, h.y);
          sCtx.fillStyle = h.color;
          sCtx.globalAlpha = h.alpha;
          sCtx.beginPath();
          sCtx.arc(0, 0, h.size * 0.4, 0, Math.PI * 2);
          sCtx.fill();
          sCtx.restore();
        }
      }
      requestAnimationFrame(animSorry);
    }
    requestAnimationFrame(animSorry);

    window.addEventListener('resize', () => {
      sW = sCanvas.width = window.innerWidth;
      sH = sCanvas.height = window.innerHeight;
    });
  }

  btnYes?.addEventListener('click', () => {
    isForgiven = true;
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

    // Compile chosen and custom punishments assigned by the viewer
    const chosenList = viewerPunishments.filter(p => p.checked).map(p => p.text);
    let punishmentsText = "";
    if (chosenList.length > 0) {
      punishmentsText = `\n\n⚖️ Here are the punishments you MUST complete for me:\n` +
        chosenList.map((p, idx) => `${idx + 1}. ${p}`).join('\n');
    } else {
      punishmentsText = `\n\nYou got off easy with no punishments this time, but don't mess up again! 😜`;
    }

    // Set WhatsApp hug link with punishments list
    const hugMsg = `I forgive you, ${senderName}! ❤️🫂${punishmentsText}\n\nOur peace treaty is officially signed! See you soon 🥰✨`;
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

  // =========================================================================
  // INTERACTIVE 60FPS RAINSTORM TO RADIANT RAINBOW & KINTSUGI MENDED HEART ARENA
  // =========================================================================
  const kCanvas = container.querySelector('#kintsugiRainCanvas');
  const kStage = container.querySelector('#kintsugiStage');
  const btnMend = container.querySelector('#btnMendKintsugi');
  const btnWipe = container.querySelector('#btnWipeStorm');
  const heartLeft = container.querySelector('#heartHalfLeft');
  const heartRight = container.querySelector('#heartHalfRight');
  const goldSeam = container.querySelector('#kintsugiGoldSeam');
  const goldAura = container.querySelector('#kintsugiAura');
  const rainbow = container.querySelector('#kintsugiRainbow');
  const stormPill = container.querySelector('#stormStatePill');
  const battVal = container.querySelector('#heartBatteryVal');
  const mendBanner = container.querySelector('#sorryMendBanner');

  let isHeartMended = false;

  if (kCanvas) {
    const kCtx = kCanvas.getContext('2d');
    let kW = (kCanvas.width = kCanvas.offsetWidth || 380);
    let kH = (kCanvas.height = 260);

    // Raindrops when storm active, golden sparkle motes when mended
    const drops = Array.from({ length: 32 }, () => ({
      x: Math.random() * kW,
      y: Math.random() * kH,
      vy: 2.5 + Math.random() * 4,
      vx: (Math.random() - 0.5) * 0.8,
      len: 8 + Math.random() * 12,
      alpha: 0.25 + Math.random() * 0.5
    }));

    const goldMotes = Array.from({ length: 28 }, () => ({
      x: Math.random() * kW,
      y: Math.random() * kH,
      vy: 0.4 + Math.random() * 0.8,
      vx: (Math.random() - 0.5) * 0.6,
      r: 1 + Math.random() * 2.5,
      alpha: 0.3 + Math.random() * 0.7
    }));

    function renderKintsugiCanvas() {
      kW = kCanvas.width = kCanvas.offsetWidth || 380;
      kH = kCanvas.height = 260;
      kCtx.clearRect(0, 0, kW, kH);

      if (!isHeartMended) {
        // Falling rain
        kCtx.strokeStyle = 'rgba(186, 230, 253, 0.45)';
        kCtx.lineWidth = 1.5;
        kCtx.lineCap = 'round';
        drops.forEach(d => {
          d.y += d.vy;
          d.x += d.vx;
          if (d.y > kH) {
            d.y = -15;
            d.x = Math.random() * kW;
          }
          kCtx.globalAlpha = d.alpha;
          kCtx.beginPath();
          kCtx.moveTo(d.x, d.y);
          kCtx.lineTo(d.x + d.vx * 2, d.y + d.len);
          kCtx.stroke();
        });
      } else {
        // Rising golden kintsugi motes
        goldMotes.forEach(m => {
          m.y -= m.vy;
          m.x += m.vx;
          if (m.y < -10) {
            m.y = kH + 10;
            m.x = Math.random() * kW;
          }
          kCtx.fillStyle = '#fbbf24';
          kCtx.globalAlpha = m.alpha;
          kCtx.beginPath();
          kCtx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          kCtx.fill();
        });
      }
      kCtx.globalAlpha = 1;
      requestAnimationFrame(renderKintsugiCanvas);
    }
    requestAnimationFrame(renderKintsugiCanvas);
  }

  const mendQuotes = [
    "✨ \"In Japanese Kintsugi, broken things are mended with gold to become even more cherished.\"",
    "💖 \"Every crack in our journey is filled with pure gold and deeper love.\"",
    "🌈 \"The storm has passed — only warmth, understanding, and joy ahead.\"",
    "🫶 \"Thank you for healing our bond. You mean the entire world to me.\""
  ];
  let mendQuoteIdx = 0;

  function triggerMendHeart() {
    isHeartMended = true;
    playSound('chime');
    if (navigator.vibrate) navigator.vibrate([40, 80, 40]);

    // Animate heart halves locking together seamlessly
    gsap.to(heartLeft, {
      rotate: 0,
      x: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });
    gsap.to(heartRight, {
      rotate: 0,
      x: 0,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    // Flare golden seam and glowing aura
    gsap.to(goldSeam, {
      opacity: 1,
      scale: 1.15,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
    gsap.to(goldAura, {
      opacity: 0.85,
      scale: 1.4,
      duration: 0.5,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });

    // Reveal glowing rainbow
    if (rainbow) rainbow.style.opacity = '1';

    // Update status pills and battery
    if (stormPill) {
      stormPill.textContent = "🌈 Radiant Skies • Bond Healed";
      stormPill.style.background = "rgba(16, 185, 129, 0.25)";
      stormPill.style.color = "#6ee7b7";
      stormPill.style.borderColor = "rgba(16, 185, 129, 0.5)";
    }
    if (battVal) {
      battVal.textContent = "Heart Level: 100% 💖 (Fully Restored)";
      battVal.style.color = "#34d399";
    }

    mendQuoteIdx = (mendQuoteIdx + 1) % mendQuotes.length;
    if (mendBanner) {
      mendBanner.textContent = mendQuotes[mendQuoteIdx];
      gsap.fromTo(mendBanner, { scale: 0.92 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    }

    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.45 },
      colors: ['#ffd700', '#f59e0b', '#f43f5e', '#38bdf8', '#ffffff']
    });
  }

  kStage?.addEventListener('click', triggerMendHeart);
  btnMend?.addEventListener('click', triggerMendHeart);
  btnWipe?.addEventListener('click', triggerMendHeart);

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.polaroid-front img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.sorry-polaroid-card') || btn.closest('.polaroid-front');
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
        link.download = `apology-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#ff4d6d', '#fbbf24', '#f59e0b', '#38bdf8']
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
