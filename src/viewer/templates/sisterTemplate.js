// src/viewer/templates/sisterTemplate.js - Partner in Crime, Wardrobe Thief & Irreplaceable Behna (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playSisTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'giggle') {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.2, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.32);
      });
    } else if (type === 'swing') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.21);
    } else if (type === 'tick') {
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
    { id: 1, icon: "🧸", item: "Giant Fluffy Plushie Teddy", victim: "Kidnapped and made permanent centerpiece on her bed", fine: "Unlimited Cuddles & Boba 🧋" },
    { id: 2, icon: "🧥", item: "Cozy Oversized Pink Hoodie", victim: "Claimed as 'Barbie loungewear' for 6 months straight", fine: "Sweet Treats & Ice Cream 🍨" },
    { id: 3, icon: "💄", item: "Favorite Lip Oil & Blush Tint", victim: "Mysteriously vanished into her cute pink handbag", fine: "Matcha Latte Treat 🍵" },
    { id: 4, icon: "🎧", item: "Pastel Pink Noise-Cancelling AirPods", victim: "Spotted in her car playlist dancing to pop hits", fine: "Late-Night Food Run 🍟" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sisPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport sister-viewport">
      <!-- Ambient Terracotta & Rose Quartz Shimmer Canvas -->
      <canvas id="sisStarCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED SISTERHOOD OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="sisterGate" role="button" tabindex="0" aria-label="Tap to unlock Sisterhood celebration" style="background: radial-gradient(circle at center, #23081e 0%, #0c020a 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#ec4899; box-shadow: 0 0 35px rgba(236,72,153,0.6);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(236,72,153,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            🎀🧸
          </div>
          <div class="bro-gate-badge" style="background:rgba(236,72,153,0.18); border-color:#ec4899; color:#fbcfe8;">
            OFFICIAL SISTERHOOD REALM
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(236,72,153,0.6);">
            To My Crazy, Annoying, Irreplaceable Sister 💅✨
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            We fight, we steal each other's clothes... but no one has my back like you do!
          </p>
          <div class="bro-gate-hint" style="color:#fbcfe8; border-color:rgba(236,72,153,0.4); background:rgba(236,72,153,0.12);">
            🎀 TAP TO UNLOCK SISTERHOOD VAULT ✨
          </div>
        </div>
      </div>

      <!-- Multi-Page Content Cards Container (Continuous Immersive Flow) -->
      <main class="fam-pages-container" id="sisPagesContainer" style="display:flex; flex-direction:column; gap:28px;">
        <!-- PAGE 1: HERO & RUNAWAY "WHO IS SMARTER?" BUTTON -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge sister-barbie-badge" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; border:1px solid #fbcfe8; box-shadow:0 4px 14px rgba(236,72,153,0.35);">🎀 BARBIE DREAMHOUSE &amp; PLUSHIE TEDDY BESTIES 🧸💖</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Crazy, Annoying, Irreplaceable Sister 💅✨'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'We fight, we steal each other’s clothes, we drive each other insane... but no one has my back like you do!'}</p>

            <!-- DYNAMIC 60FPS HANGING PLUSHIE TEDDY BEAR SWING ARENA -->
            <div class="sis-teddy-arena" id="sisTeddyArena" style="position:relative; width:100%; max-width:400px; margin:16px auto; min-height:260px; text-align:center; overflow:hidden; border-radius:20px; background:radial-gradient(120% 90% at 50% 20%, #fff7ed 0%, #fdf2f8 50%, #fce7f3 100%); border:2px solid rgba(244, 114, 182, 0.45); box-shadow:0 12px 35px rgba(244, 114, 182, 0.22);">
              <!-- Floating pastel sparkles & hearts canvas -->
              <canvas id="sisTeddyCanvas" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></canvas>

              <!-- Hanging ribbons & interactive swing assembly -->
              <div id="sisTeddyRig" style="position:relative; width:180px; margin:0 auto; transform-origin: top center; cursor:grab; touch-action:none; z-index:3; user-select:none; -webkit-user-select:none;">
                <svg width="180" height="240" viewBox="0 0 180 240" style="display:block; margin:0 auto; overflow:visible;">
                  <defs>
                    <linearGradient id="ribbonGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#f472b6" />
                      <stop offset="100%" stop-color="#fb7185" />
                    </linearGradient>
                    <linearGradient id="teddyGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="#c28859" />
                      <stop offset="100%" stop-color="#9a5b2d" />
                    </linearGradient>
                    <linearGradient id="bellyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#f5d7b5" />
                      <stop offset="100%" stop-color="#e8bf95" />
                    </linearGradient>
                  </defs>

                  <!-- Left Ribbon -->
                  <line x1="45" y1="0" x2="45" y2="155" stroke="url(#ribbonGrad)" stroke-width="3" stroke-linecap="round" />
                  <circle cx="45" cy="15" r="4.5" fill="#fb7185" />

                  <!-- Right Ribbon -->
                  <line x1="135" y1="0" x2="135" y2="155" stroke="url(#ribbonGrad)" stroke-width="3" stroke-linecap="round" />
                  <circle cx="135" cy="15" r="4.5" fill="#fb7185" />

                  <!-- Wooden Swing Plank -->
                  <rect x="25" y="152" width="130" height="12" rx="6" fill="#854d0e" stroke="#713f12" stroke-width="1.5" />
                  <rect x="30" y="154" width="120" height="3" rx="1.5" fill="#a16207" />

                  <!-- TEDDY BEAR BODY -->
                  <g id="teddyBearG">
                    <!-- Left Ear -->
                    <circle cx="60" cy="72" r="16" fill="url(#teddyGrad)" />
                    <circle cx="60" cy="72" r="9" fill="#fbcfe8" />
                    <!-- Right Ear -->
                    <circle cx="120" cy="72" r="16" fill="url(#teddyGrad)" />
                    <circle cx="120" cy="72" r="9" fill="#fbcfe8" />

                    <!-- Head -->
                    <circle cx="90" cy="95" r="34" fill="url(#teddyGrad)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.15))" />

                    <!-- Muzzle / Snout -->
                    <ellipse cx="90" cy="104" rx="17" ry="13" fill="url(#bellyGrad)" />
                    <ellipse cx="90" cy="98" rx="6" ry="4.5" fill="#451a03" />
                    <path d="M 86 104 Q 90 109 94 104" stroke="#451a03" stroke-width="2" fill="none" stroke-linecap="round" />

                    <!-- Blushing Cheeks -->
                    <ellipse id="blushLeft" cx="72" cy="102" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />
                    <ellipse id="blushRight" cx="108" cy="102" rx="7" ry="4" fill="#f43f5e" opacity="0.45" />

                    <!-- Eyes -->
                    <circle cx="78" cy="90" r="5" fill="#1e1b4b" />
                    <circle cx="76.5" cy="88.5" r="1.8" fill="#ffffff" />
                    <circle cx="102" cy="90" r="5" fill="#1e1b4b" />
                    <circle cx="100.5" cy="88.5" r="1.8" fill="#ffffff" />

                    <!-- Body / Torso -->
                    <ellipse cx="90" cy="140" rx="30" ry="24" fill="url(#teddyGrad)" />
                    <ellipse cx="90" cy="140" rx="19" ry="16" fill="url(#bellyGrad)" />

                    <!-- Cute Pink Bowtie -->
                    <path d="M 80 120 L 90 124 L 80 128 Z" fill="#ec4899" />
                    <path d="M 100 120 L 90 124 L 100 128 Z" fill="#ec4899" />
                    <circle cx="90" cy="124" r="3.5" fill="#f43f5e" />

                    <!-- Left & Right Paws holding rope -->
                    <ellipse id="teddyPawLeft" cx="52" cy="132" rx="11" ry="8" fill="url(#teddyGrad)" transform="rotate(-15 52 132)" />
                    <circle cx="52" cy="132" r="5" fill="#fbcfe8" />
                    <ellipse id="teddyPawRight" cx="128" cy="132" rx="11" ry="8" fill="url(#teddyGrad)" transform="rotate(15 128 132)" />
                    <circle cx="128" cy="132" r="5" fill="#fbcfe8" />

                    <!-- Feet sitting on swing -->
                    <ellipse cx="65" cy="154" rx="13" ry="9" fill="url(#teddyGrad)" />
                    <circle cx="65" cy="154" r="5" fill="#fbcfe8" />
                    <ellipse cx="115" cy="154" rx="13" ry="9" fill="url(#teddyGrad)" />
                    <circle cx="115" cy="154" r="5" fill="#fbcfe8" />
                  </g>
                </svg>
              </div>

              <!-- Speech Bubble from Teddy -->
              <div id="teddySpeechBubble" style="position:relative; z-index:4; display:inline-block; background:#fff; padding:6px 14px; border-radius:18px; border:1px solid #f472b6; font-size:12px; font-weight:700; color:#831843; box-shadow:0 4px 12px rgba(244,114,182,0.25); margin-top:4px; transition:transform 0.2s ease;">
                🌸 "Drag to swing me or tap for sister love!"
              </div>

              <div style="font-size:11px; font-weight:600; color:#db2777; margin:6px 0 10px; letter-spacing:0.5px;">
                ✦ Touch &amp; Drag Swing • Tap Teddy to Tickle ✦
              </div>
            </div>

            <!-- Interactive "Who is Smarter?" Debate Game -->
            <div class="sister-debate-box" style="margin:20px auto 14px; background:rgba(255,255,255,0.94); padding:18px 16px; border-radius:18px; border:1.5px solid rgba(244,114,182,0.55); text-align:center; box-shadow:0 10px 28px rgba(244,114,182,0.2);">
              <div style="font-size:12px; font-weight:800; color:#db2777; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                🎀 THE ETERNAL SIBLING TRUTH TEST 🎀
              </div>
              <div style="font-size:15px; font-weight:800; color:#4c0527; margin-bottom:14px;">
                Who is objectively the smarter sibling?
              </div>

              <div style="display:flex; justify-content:center; gap:12px; position:relative; min-height:50px;">
                <button type="button" class="btn-fam-action" id="btnVoteSister" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; border-radius:20px; font-weight:800; padding:9px 22px; box-shadow:0 4px 14px rgba(236,72,153,0.35);">
                  Obviously Sister 👑
                </button>
                <button type="button" class="btn-fam-action" id="btnVoteSibling" style="background:#fce7f3; color:#701a40; border-radius:20px; font-weight:800; padding:9px 22px; border:1px solid #f472b6; transition:transform 0.15s ease;">
                  Me (Never!) 😂
                </button>
              </div>
              <div id="siblingDodgeToast" style="margin-top:10px; font-weight:800; font-size:13px; color:#e11d48; min-height:20px; transition:all 0.2s ease;"></div>
            </div>

            <!-- SISTER SLAYING AURA & BOBA DEBT TRACKER -->
            <div class="sis-aura-box" style="margin:16px auto; background:rgba(255,255,255,0.95); border:1.5px solid rgba(244,114,182,0.5); border-radius:18px; padding:16px; text-align:center; max-width:440px; box-shadow:0 8px 24px rgba(244,114,182,0.2);">
              <div style="font-size:11px; font-weight:800; color:#db2777; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">
                💅 MAIN CHARACTER AURA &amp; SLAY METER 💅
              </div>
              <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin:8px 0;">
                <span style="font-size:32px; font-weight:900; color:#db2777; font-family:monospace;" id="sisAuraScore">+9,999,999</span>
                <span style="font-size:11px; font-weight:800; background:#fce7f3; color:#831843; padding:2px 8px; border-radius:10px; border:1px solid #f472b6;" id="sisAuraRank">QUEEN SLAYING 👑</span>
              </div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:10px;">
                <button type="button" id="btnSlayAura" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 4px 10px rgba(236,72,153,0.3);">
                  💅 Boost Slay Aura (+50k)
                </button>
                <button type="button" id="btnPayBoba" style="background:#fff1f2; color:#be123c; border:1px solid #f43f5e; font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; cursor:pointer;">
                  🧋 Pay Boba Debt
                </button>
              </div>
            </div>

            <div class="sis-quick-actions">
              <button class="btn-fam-action btn-tax-sis" id="btnSisterTax" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; font-weight:800; box-shadow:0 6px 20px rgba(236,72,153,0.35);">
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
                <div class="theft-item-box" data-id="${s.id}" style="position:relative; background:rgba(255,255,255,0.94); padding:16px; border-radius:16px; border:1.5px solid rgba(244,114,182,0.45); margin-bottom:12px; cursor:pointer; box-shadow:0 6px 18px rgba(244,114,182,0.15); transition:transform 0.2s ease;">
                  <div style="display:flex; align-items:center; gap:14px;">
                    <div class="hanger-icon" style="font-size:34px; transform-origin:top center; transition:transform 0.3s ease;">${s.icon}</div>
                    <div style="flex:1;">
                      <h4 style="margin:0 0 4px 0; font-size:14.5px; font-weight:800; color:#831843;">${s.item}</h4>
                      <p style="margin:0 0 6px 0; font-size:12px; line-height:1.4; color:#4c0527;">${s.victim}</p>
                      <span style="font-size:11px; font-weight:800; color:#9d174d; background:#fce7f3; padding:3px 10px; border-radius:12px; border:1px solid #f472b6;">Fine: ${s.fine}</span>
                    </div>
                  </div>
                  <div style="margin-top:12px; text-align:right;">
                    <button type="button" class="btn-claim-fine" data-id="${s.id}" style="font-size:11.5px; font-weight:800; padding:6px 14px; border-radius:14px; border:none; background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; cursor:pointer; box-shadow:0 3px 10px rgba(236,72,153,0.3);">
                      CLAIM REPARATIONS 🧋
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
            <div id="theftSummary" style="text-align:center; font-size:12.5px; font-weight:800; color:#831843; margin-top:12px;"></div>
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
              <div id="safeRotaryDial" style="width:170px; height:170px; margin:0 auto; border-radius:50%; background:radial-gradient(circle, #831843 0%, #3b0724 100%); border:5px solid #ec4899; position:relative; cursor:pointer; box-shadow:0 8px 26px rgba(236,72,153,0.4);">
                <div style="position:absolute; top:8px; left:50%; transform:translateX(-50%); color:#fce7f3; font-weight:900; font-size:14px;">00</div>
                <div style="position:absolute; right:10px; top:50%; transform:translateY(-50%); color:#fce7f3; font-weight:900; font-size:14px;">25</div>
                <div style="position:absolute; bottom:8px; left:50%; transform:translateX(-50%); color:#fce7f3; font-weight:900; font-size:14px;">50</div>
                <div style="position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#fce7f3; font-weight:900; font-size:14px;">75</div>
                <div id="dialIndicatorNeedle" style="position:absolute; top:50%; left:50%; width:4px; height:70px; background:#fb7185; transform:translate(-50%, -50%) rotate(0deg); transform-origin:center center; border-radius:2px; box-shadow:0 0 8px #fb7185;"></div>
                <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:24px; height:24px; border-radius:50%; background:#ec4899; border:2px solid #fff; display:flex; align-items:center; justify-content:center; font-size:11px;">🧸</div>
              </div>
              <div style="margin-top:10px; font-size:12px; font-weight:800; color:#831843;">
                ✦ Spin Dial to Crack Secret Safe ✦
              </div>

              <!-- Unlocked Secret Memories Box -->
              <div id="safeUnlockedContent" style="display:none; margin-top:16px; background:rgba(255,255,255,0.95); border:2px dashed #ec4899; border-radius:16px; padding:18px; box-shadow:0 8px 24px rgba(236,72,153,0.2);">
                <div style="font-size:28px; margin-bottom:6px;">🔓🎀💖</div>
                <h4 style="margin:0 0 6px 0; color:#831843; font-size:15px; font-weight:900;">SAFE CRACKED: TOP SECRET SISTER CODES</h4>
                <p style="margin:0; font-size:13.5px; line-height:1.55; color:#4c0527;">
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
              <button class="btn-fam-action" id="btnSnapPolaroidCamera" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; border-radius:20px; font-weight:800; padding:9px 24px; box-shadow:0 4px 16px rgba(236,72,153,0.35);">
                📸 Snap New Sister Blackmail Polaroid
              </button>
            </div>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:linear-gradient(135deg, #f472b6, #ec4899);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/pretty.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Leverage #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                  <button type="button" class="btn-download-polaroid" title="Save high-res keepsake" style="margin: 8px auto 2px auto;">
                    📸 Save Keepsake
                  </button>
                </div>
              `).join('')}
            </div>

            <!-- TOP SECRET SISTER MYSTERY GIFT BOX (GEN-Z RAGE-BAIT UNBOXING) -->
            <div class="sis-mystery-box-arena" style="margin:28px auto 14px; background:linear-gradient(135deg, #fff1f2 0%, #fdf2f8 100%); border:2px dashed #f472b6; border-radius:20px; padding:22px 18px; text-align:center; max-width:440px; box-shadow:0 10px 25px rgba(244,114,182,0.25);">
              <div style="font-size:11px; font-weight:800; color:#db2777; letter-spacing:1.5px; text-transform:uppercase; margin-bottom:6px;">
                🎁 TOP SECRET SISTER BIRTHDAY DROP 🎁
              </div>
              <h3 style="color:#831843; font-size:17px; font-weight:900; margin:0 0 6px 0;">
                The Ultimate VIP Mystery Gift Box
              </h3>
              <p style="color:#9d174d; font-size:12px; margin:0 0 16px 0;">
                Is it a Dyson Airwrap? Sephora spree? Or Taylor Swift front-row tickets? Tap to unbox!
              </p>

              <div id="sisBoxGraphic" style="font-size:64px; margin:8px auto 14px; cursor:pointer; display:inline-block; transition:transform 0.2s ease;">
                🎁
              </div>

              <div style="margin-bottom:12px;">
                <button type="button" id="btnUnboxSisBox" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; font-size:13px; font-weight:900; padding:10px 24px; border-radius:24px; border:none; cursor:pointer; box-shadow:0 6px 20px rgba(236,72,153,0.35); text-transform:uppercase; letter-spacing:0.8px;">
                  ✦ Tap To Unbox Mystery Gift ✦
                </button>
              </div>

              <!-- Unboxed Reveal Card -->
              <div id="sisBoxReveal" style="display:none; background:#ffffff; border:1.5px solid #f43f5e; border-radius:14px; padding:16px; margin-top:14px; text-align:left; animation:fadeInUp 0.4s ease;">
                <div style="text-align:center; font-size:15px; font-weight:900; color:#e11d48; margin-bottom:8px; text-transform:uppercase;">
                  💀 YOU REALLY THOUGHT YOU WERE GETTING A DYSON 💀
                </div>
                <p style="text-align:center; color:#4c0527; font-size:12px; margin:0 0 12px 0;">
                  Nice try! But you just unlocked exclusive lifetime sister rights:
                </p>
                <div style="font-size:12px; color:#831843; display:flex; flex-direction:column; gap:6px; line-height:1.4;">
                  <div>✦ <strong>1x Permanent Closet Raiding License</strong> (You already do it anyway)</div>
                  <div>✦ <strong>1x Personal Uber Driver Voucher</strong> (Subject to driver's mood)</div>
                  <div>✦ <strong>Unlimited 2 AM Emergency Gossip Calls</strong> (Spill all the tea)</div>
                  <div style="color:#e11d48; font-weight:800; margin-top:4px;">✦ Payment Due: You buy iced matcha lattes tomorrow 🍵</div>
                </div>
                <div style="margin-top:12px; text-align:center;">
                  <span style="display:inline-block; background:#ffe4e6; color:#e11d48; font-size:11px; font-weight:800; padding:4px 12px; border-radius:12px; border:1px solid #fecdd3;">
                    ✓ SISTER PRIVILEGES UNLOCKED (+9,999,999 AURA)
                  </span>
                </div>
              </div>
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
              <h3 class="letter-teaser-title" style="color:#831843;">💌 Barbie Wax-Seal Sisterhood Letter</h3>
              <p class="letter-teaser-sub" style="color:#4c0527;">Sealed with unconditional love, boba debt, and zero regrets.</p>
              
              <div class="envelope-seal-trigger" id="sisWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; border:1.5px solid #fbcfe8; padding:12px 24px; border-radius:30px; font-weight:800; box-shadow:0 6px 20px rgba(236,72,153,0.4); display:flex; align-items:center; gap:8px;">
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
            <div class="fam-cert-border gold-border" style="border-color:#ec4899; background:rgba(255,255,255,0.96); color:#3b0724; box-shadow:0 12px 35px rgba(236,72,153,0.25);">
              <div class="fam-cert-seal">👑</div>
              <div class="fam-cert-kicker" style="color:#db2777; font-weight:900;">BARBIE DREAMHOUSE SIBLING COMMISSION</div>
              <h2 class="fam-cert-title" style="color:#831843;">BEST SISTER IN THE UNIVERSE</h2>
              <div class="fam-cert-awarded-to" style="color:#701a40; font-weight:700;">This award of supreme distinction is granted to:</div>
              <div class="fam-cert-recipient" style="color:#db2777;">${data.recipientName || 'Behna'}</div>
              <p class="fam-cert-citation" style="color:#4c0527;">
                For master-level wardrobe infiltration, unmatched 2 AM tea-spilling, fierce loyalty when it matters most, and being completely irreplaceable.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label" style="color:#701a40;">Sister Status</span>
                  <strong style="color:#db2777;">BARBIE QUEEN &amp; TEDDY BESTIE 🎀</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label" style="color:#701a40;">Conferred By</span>
                  <strong style="color:#db2777;">${data.senderName || 'Your Loving Sibling'} ✍️</strong>
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

  // Opener Gate Execution
  const sisGate = container.querySelector('#sisterGate');
  if (sisGate) {
    const executeOpenSisGate = () => {
      if (sisGate.classList.contains('is-open')) return;
      playSisTone('sparkle');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#ec4899', '#f472b6', '#fbbf24', '#ffffff']
      });
      sisGate.classList.add('is-open');
    };
    sisGate.addEventListener('click', executeOpenSisGate);
  }

  const totalPages = sisPageTitles.length;
  let currentPage = 1;

  function scrollToActiveTop() {
    const chassis = container?.closest ? (container.closest('.preview-frame-container') || container.closest('#previewContainer')) : null;
    if (chassis) {
      chassis.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

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
          scrollToActiveTop();

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
      scrollToActiveTop();
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Activate Page 1 initially
  goToPage(1);

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
  // 1B. PAGE 1: 60FPS PHYSICS-BASED HANGING PLUSHIE TEDDY BEAR SWING 🧸🌸
  // =========================================================================
  const teddyRig = container.querySelector('#sisTeddyRig');
  const teddySpeech = container.querySelector('#teddySpeechBubble');
  const teddyCanvas = container.querySelector('#sisTeddyCanvas');
  const blushLeft = container.querySelector('#blushLeft');
  const blushRight = container.querySelector('#blushRight');
  const pawLeft = container.querySelector('#teddyPawLeft');
  const pawRight = container.querySelector('#teddyPawRight');

  if (teddyRig) {
    let currentAngle = 0;
    let targetAngle = 0;
    let angularVelocity = 0;
    let isDragging = false;
    let startX = 0;
    let quoteIdx = 0;

    const sisterQuotes = [
      "🌸 \"You're the sweetest sister in the world!\"",
      "👗 \"Even though you stole my favorite hoodie! 😂\"",
      "👑 \"Forever my partner-in-crime and best friend!\"",
      "🧸 \"Always here for warm hugs and iced boba!\"",
      "✨ \"Nobody understands my humor like you do!\""
    ];

    // Floating pastel hearts & sparkles canvas
    if (teddyCanvas) {
      const tCtx = teddyCanvas.getContext('2d');
      let tW = (teddyCanvas.width = teddyCanvas.offsetWidth || 380);
      let tH = (teddyCanvas.height = 260);

      const floaters = Array.from({ length: 18 }, () => ({
        x: Math.random() * tW,
        y: Math.random() * tH,
        vy: 0.4 + Math.random() * 0.6,
        vx: (Math.random() - 0.5) * 0.5,
        size: 3 + Math.random() * 5,
        alpha: 0.3 + Math.random() * 0.5,
        isHeart: Math.random() > 0.5
      }));

      function renderFloaters() {
        tW = teddyCanvas.width = teddyCanvas.offsetWidth || 380;
        tH = teddyCanvas.height = 260;
        tCtx.clearRect(0, 0, tW, tH);

        floaters.forEach(f => {
          f.y -= f.vy;
          f.x += f.vx;
          if (f.y < -10) {
            f.y = tH + 10;
            f.x = Math.random() * tW;
          }

          tCtx.globalAlpha = f.alpha;
          if (f.isHeart) {
            tCtx.fillStyle = '#f472b6';
            tCtx.font = `${f.size * 2}px sans-serif`;
            tCtx.fillText('♥', f.x, f.y);
          } else {
            tCtx.fillStyle = '#fbbf24';
            tCtx.beginPath();
            tCtx.arc(f.x, f.y, f.size / 2, 0, Math.PI * 2);
            tCtx.fill();
          }
        });
        tCtx.globalAlpha = 1;
        requestAnimationFrame(renderFloaters);
      }
      requestAnimationFrame(renderFloaters);
    }

    // Interactive Drag to Swing
    teddyRig.addEventListener('pointerdown', (e) => {
      isDragging = true;
      startX = e.clientX;
      teddyRig.style.cursor = 'grabbing';
      teddyRig.setPointerCapture(e.pointerId);
    });

    teddyRig.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      targetAngle = Math.max(-38, Math.min(38, deltaX * 0.28));
      currentAngle = targetAngle;
      teddyRig.style.transform = `rotate(${currentAngle}deg)`;
    });

    function releaseDrag() {
      if (!isDragging) return;
      isDragging = false;
      teddyRig.style.cursor = 'grab';
      playSisTone('swing');
      if (navigator.vibrate) navigator.vibrate(15);
    }

    teddyRig.addEventListener('pointerup', releaseDrag);
    teddyRig.addEventListener('pointercancel', releaseDrag);

    // Tap Teddy to Tickle & Wave
    teddyRig.addEventListener('click', (e) => {
      if (Math.abs(targetAngle) > 8) return;
      playSisTone('giggle');
      if (navigator.vibrate) navigator.vibrate([20, 25]);

      // Wave paws & blush
      gsap.timeline()
        .to([pawLeft, pawRight], { y: -8, duration: 0.15, yoyo: true, repeat: 3, ease: 'power1.inOut' })
        .to([blushLeft, blushRight], { opacity: 0.9, duration: 0.2, yoyo: true, repeat: 1 }, '<');

      // Update Speech Bubble
      quoteIdx = (quoteIdx + 1) % sisterQuotes.length;
      if (teddySpeech) {
        teddySpeech.textContent = sisterQuotes[quoteIdx];
        gsap.fromTo(teddySpeech, { scale: 0.85 }, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      }

      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.35 },
        colors: ['#f472b6', '#fbcfe8', '#fbbf24', '#ffffff']
      });
    });

    // 60FPS Pendulum Spring Physics loop
    let lastTime = performance.now();
    function animateSwing(now) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      if (!isDragging) {
        const gravityForce = -currentAngle * 12;
        angularVelocity += gravityForce * dt;
        angularVelocity *= 0.965;
        currentAngle += angularVelocity * dt;

        if (Math.abs(currentAngle) < 0.5 && Math.abs(angularVelocity) < 1) {
          currentAngle = Math.sin(now * 0.0022) * 4.5;
        }

        teddyRig.style.transform = `rotate(${currentAngle}deg)`;
      }

      requestAnimationFrame(animateSwing);
    }
    requestAnimationFrame(animateSwing);
  }

  // =========================================================================
  // 2. PAGE 1: RUNAWAY "WHO IS SMARTER?" BUTTON & SISTER SLAYING AURA
  // =========================================================================
  const btnVoteSibling = container.querySelector('#btnVoteSibling');
  const btnVoteSister = container.querySelector('#btnVoteSister');
  const siblingDodgeToast = container.querySelector('#siblingDodgeToast');

  const sisRageQuotes = [
    "Bro really thought 💀",
    "Error 404: Evidence Not Found 📉",
    "Nice try lil bro! Mom literally told me I'm the favorite 😌💅",
    "-100,000 Aura for even trying 📉",
    "L + Ratio + She's older/smarter 💀",
    "Delusional behavior detected! Try again never 💅"
  ];

  function dodgeButton() {
    playSisTone('tick');
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 80;
    gsap.to(btnVoteSibling, { x, y, duration: 0.2, ease: 'back.out(2)' });
    const randomQuote = sisRageQuotes[Math.floor(Math.random() * sisRageQuotes.length)];
    if (siblingDodgeToast) siblingDodgeToast.textContent = randomQuote;
    if (navigator.vibrate) navigator.vibrate(20);
  }

  btnVoteSibling?.addEventListener('mouseenter', dodgeButton);
  btnVoteSibling?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeButton();
  });

  btnVoteSister?.addEventListener('click', () => {
    playSisTone('sparkle');
    if (siblingDodgeToast) siblingDodgeToast.innerHTML = "✨ <strong>QUEEN SUPREMACY CONFIRMED!</strong> Universal sibling order restored. 👑💅";
    gsap.fromTo(btnVoteSister, { scale: 1.4 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#ea580c', '#fbbf24', '#f472b6', '#ffffff']
    });
  });

  // Sister Aura & Boba Tracker
  let sisAura = 9999999;
  const sisAuraScore = container.querySelector('#sisAuraScore');
  const sisAuraRank = container.querySelector('#sisAuraRank');
  const btnSlayAura = container.querySelector('#btnSlayAura');
  const btnPayBoba = container.querySelector('#btnPayBoba');

  btnSlayAura?.addEventListener('click', () => {
    sisAura += 50000;
    playSisTone('sparkle');
    if (sisAuraScore) sisAuraScore.textContent = '+' + sisAura.toLocaleString();
    if (sisAuraRank) sisAuraRank.textContent = "COSMIC SLAYER 👑✨";
    gsap.fromTo(sisAuraScore, { scale: 1.3, color: '#ec4899' }, { scale: 1, color: '#db2777', duration: 0.3 });
  });

  btnPayBoba?.addEventListener('click', () => {
    playSisTone('sparkle');
    if (siblingDodgeToast) siblingDodgeToast.innerHTML = "🧋 <strong>BOBA DEBT CLEARED!</strong> Temporary sibling immunity granted for 24 hours. 🍟";
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#f472b6', '#fbbf24', '#ffffff']
    });
  });

  // Top Secret Sister Mystery Gift Box
  const btnUnboxSisBox = container.querySelector('#btnUnboxSisBox');
  const sisBoxGraphic = container.querySelector('#sisBoxGraphic');
  const sisBoxReveal = container.querySelector('#sisBoxReveal');
  let isSisBoxUnboxed = false;

  function unboxSisterBox() {
    if (isSisBoxUnboxed) return;
    isSisBoxUnboxed = true;
    playSisTone('tick');
    if (navigator.vibrate) navigator.vibrate([40, 60, 100]);

    gsap.timeline()
      .to(sisBoxGraphic, { rotation: -15, scale: 1.25, duration: 0.1, yoyo: true, repeat: 5 })
      .to(sisBoxGraphic, { scale: 1.4, duration: 0.2, ease: 'back.out(2)' })
      .call(() => {
        playSisTone('sparkle');
        sisBoxGraphic.textContent = "💖 🎁 💖";
        if (sisBoxReveal) sisBoxReveal.style.display = 'block';
        if (btnUnboxSisBox) {
          btnUnboxSisBox.textContent = "✓ SURPRISE UNVEILED";
          btnUnboxSisBox.style.opacity = '0.7';
          btnUnboxSisBox.style.pointerEvents = 'none';
        }
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ec4899', '#f43f5e', '#fbbf24', '#ffffff']
        });
      });
  }

  btnUnboxSisBox?.addEventListener('click', unboxSisterBox);
  sisBoxGraphic?.addEventListener('click', unboxSisterBox);

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
        a.download = `behna-polaroid-keepsake-${Date.now()}.png`;
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
      background: 'rgba(25, 15, 25, 0.92)'
    });
  } catch (e) {}
}
