// src/viewer/templates/birthdayTemplate.js - Blossom-Grade Immersive Birthday Celebration Experience
// Features: Interactive Celebration Vault Opener, 60fps Kinetic Helium Balloons Canvas,
// Interactive Balloon Popping Mini-Game, 3D Multi-Tier Cake with Blowable Candles & Smoke Physics,
// Memory Lane Polaroids, Vogue Magazine Editorial, Golden Scratch Card & VIP Pass in a seamless continuous flow.

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

  // Synthesize Web Audio Chimes & Celebration Tones (shared AudioContext to avoid browser limit)
  let sharedAudioCtx = null;
  function playBdayTone(type = 'chime') {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!sharedAudioCtx) sharedAudioCtx = new AudioCtx();
      if (sharedAudioCtx.state === 'suspended') sharedAudioCtx.resume();
      const ctx = sharedAudioCtx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'chime') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
        osc.start();
        osc.stop(ctx.currentTime + 0.55);
      } else if (type === 'pop') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.start();
        osc.stop(ctx.currentTime + 0.14);
      } else if (type === 'cheer') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.type = 'sine';
          o.frequency.value = freq;
          o.connect(g);
          g.connect(ctx.destination);
          g.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);
          o.start(ctx.currentTime + i * 0.08);
          o.stop(ctx.currentTime + i * 0.08 + 0.6);
        });
      }
    } catch {
      // AudioContext unavailable
    }
  }

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="tpMusicSlot" style="position:relative; z-index:100;"></div>

    <!-- Floating Background Canvas for Balloons and Twinkling Confetti -->
    <canvas id="bdayAnimCanvas" class="bday-anim-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

    <div class="bday-persona-stage bday-storybook-viewport bday-theme-romantic" id="bdayDynamicStage" style="position:relative; z-index:10; max-width:820px; margin:0 auto; padding: 0 16px 80px;">
      
      <!-- SACRED BIRTHDAY CELEBRATION OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="bdayGate" role="button" tabindex="0" aria-label="Tap to unlock the birthday celebration" style="background: radial-gradient(circle at center, #1e112a 0%, #080c18 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#f59e0b; box-shadow: 0 0 35px rgba(245,158,11,0.5);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(245,158,11,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            🎂✨
          </div>
          <div class="bro-gate-badge" style="background:rgba(245,158,11,0.18); border-color:#f59e0b; color:#fbbf24;">
            ROYAL BIRTHDAY CELEBRATION
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(245,158,11,0.6);">
            Happy Birthday, ${recipientName}!
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            A deeply personalized, interactive celebration made with boundless love.
          </p>
          <div class="bro-gate-hint" style="color:#fbbf24; border-color:rgba(245,158,11,0.4); background:rgba(245,158,11,0.12);">
            ✨ TAP TO IGNITE THE CELEBRATION ✨
          </div>
        </div>
      </div>

      <!-- FOCUSED CHAPTER JOURNEY FLOW (ONE IMMERSIVE SCENE AT A TIME) -->
      <main class="bday-flow-container" id="bdayPagesContainer" style="display:flex; flex-direction:column;">
        
        <!-- CHAPTER 1: HERO & INTERACTIVE BALLOON POPPING MINI-GAME -->
        <section class="bday-story-card active" data-chapter="1" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div id="tpHeroSlot"></div>

          <!-- Interactive Balloon Pop Game -->
          <div class="bday-interactive-balloons-box" style="margin-top:20px; background:rgba(30,41,59,0.7); border:1.5px dashed rgba(245,158,11,0.4); border-radius:18px; padding:16px; text-align:center;">
            <p style="font-size:12px; font-weight:800; letter-spacing:1px; color:#fbbf24; margin: 0 0 12px 0;">
              🎈 TAP THE BALLOONS TO POP BIRTHDAY WISHES 🎈
            </p>
            <div class="balloon-pop-row" id="balloonPopRow" style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap;">
              <div class="pop-balloon b-red" data-wish="Boundless Joy & Laughter 🌟" role="button" tabindex="0">🎈<span>1</span></div>
              <div class="pop-balloon b-gold" data-wish="Big Wins & Success 🏆" role="button" tabindex="0">🎈<span>2</span></div>
              <div class="pop-balloon b-pink" data-wish="Infinite Love & Warmth 💖" role="button" tabindex="0">🎈<span>3</span></div>
              <div class="pop-balloon b-blue" data-wish="Wild Unforgettable Adventures 🚀" role="button" tabindex="0">🎈<span>4</span></div>
              <div class="pop-balloon b-purple" data-wish="Lifelong Peace & Smiles ✨" role="button" tabindex="0">🎈<span>5</span></div>
            </div>
            <div class="balloon-wish-bubble" id="balloonWishBubble" style="margin-top:12px; min-height:24px; font-weight:700; color:#38bdf8; font-size:13px;"></div>
          </div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-next" data-next="2" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>The Wish Cake 🎂</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 2: 3D MULTI-TIER CAKE & CANDLE BLOWING CEREMONY -->
        <section class="bday-story-card" data-chapter="2" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); text-align:center; backdrop-filter:blur(14px);">
          <div class="bday-finale-card">
            <span style="display:inline-block; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#f59e0b; background:rgba(245,158,11,0.15); padding:4px 12px; border-radius:20px; border:1px solid rgba(245,158,11,0.4); margin-bottom:14px;">
              SACRED BIRTHDAY RITUAL 🎂
            </span>

            <!-- Realistic 3D Interactive Cake Stage -->
            <div class="realistic-cake-stage" id="cakeStage" style="cursor:pointer; margin:10px auto 20px;">
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

            <div class="bday-cake-tap-hint" id="cakeTapHint" style="font-weight:800; font-size:11.5px; color:#fbbf24; margin-bottom:8px;">
              ✨ TAP THE CAKE OR BUTTON BELOW TO BLOW CANDLES ✨
            </div>
            <h2 class="bday-finale-title" id="bdayFinaleHeadline" style="color:#fff; font-size:22px; font-weight:800; margin:0 0 6px 0;">
              Make A Wish, ${recipientName}! 🎉
            </h2>
            <p class="bday-finale-msg" id="bdayFinaleSubtitle" style="color:#94a3b8; font-size:13px; max-width:440px; margin:0 auto 16px;">
              Close your eyes, think of your biggest dream for the year ahead, and blow out the candles!
            </p>

            <button type="button" class="btn-fam-action btn-blow-cake-action" id="btnBlowCandles" style="width:100%; max-width:320px; font-size:13.5px; padding:12px 20px; border-radius:14px; background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; font-weight:800; cursor:pointer; border:none; box-shadow:0 6px 20px rgba(245,158,11,0.4);">
              💨 Blow Out Candles &amp; Make A Wish 🎂
            </button>
          </div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="3" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Stardust Memories 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 3: MEMORY LANE (PHOTO RIBBON & POLAROID SCRAPBOOK) -->
        <section class="bday-story-card" data-chapter="3" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div style="text-align:center; margin-bottom:14px;">
            <span style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#f59e0b; background:rgba(245,158,11,0.15); padding:4px 12px; border-radius:20px; border:1px solid rgba(245,158,11,0.4);">
              CHRONICLES OF CELEBRATION 📸
            </span>
            <h3 style="color:#fff; font-size:18px; font-weight:800; margin:8px 0 4px 0;">Moments Frozen in Stardust</h3>
          </div>
          <div id="tpRibbonSlot"></div>
          <div id="tpPolaroidSlot"></div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="4" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Celebration Flipbook 📖</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 4: CELEBRATION MAGAZINE FLIPBOOK -->
        <section class="bday-story-card" data-chapter="4" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div id="tpFlipSlot"></div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="5" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>Confidential Wish 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 5: SCRATCH-OFF SECRET SURPRISE TICKET -->
        <section class="bday-story-card" data-chapter="5" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div style="text-align:center; margin-bottom:12px;">
            <span style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#f59e0b; background:rgba(245,158,11,0.15); padding:4px 12px; border-radius:20px; border:1px solid rgba(245,158,11,0.4);">
              CONFIDENTIAL WISH 🎟️
            </span>
          </div>
          <div id="tpScratchSlot"></div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="6" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000;">
              <span>VIP All-Access Pass 🪪</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 6: VIP LANYARD PASS & CELEBRATION FINALE -->
        <section class="bday-story-card" data-chapter="6" style="background:rgba(18,22,36,0.9); border:1.5px solid rgba(245,158,11,0.4); border-radius:24px; padding:20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); text-align:center; backdrop-filter:blur(14px);">
          <div style="margin-bottom:14px;">
            <span style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#f59e0b; background:rgba(245,158,11,0.15); padding:4px 12px; border-radius:20px; border:1px solid rgba(245,158,11,0.4);">
              OFFICIAL ALL-ACCESS PASS 🪪
            </span>
          </div>
          <div id="tpLanyardSlot"></div>
          <div id="tpChatSlot" style="margin-top:20px;"></div>

          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-bday-replay" id="btnBdayReplay" style="background:linear-gradient(135deg, #f59e0b, #d97706); color:#000; padding:10px 20px; border-radius:24px; font-weight:800; border:none; cursor:pointer;">
              <span>🎉 Replay Celebration ↺</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  `;

  // Opener Gate Execution
  const gateEl = container.querySelector('#bdayGate');
  if (gateEl) {
    const executeOpenGate = () => {
      if (gateEl.classList.contains('is-open')) return;
      playBdayTone('cheer');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#f43f5e', '#38bdf8', '#ffffff']
      });
      gateEl.classList.add('is-open');
    };
    gateEl.addEventListener('click', executeOpenGate);
  }

  // Chapter-by-Chapter Journey Navigation
  let currentBdayChapter = 1;
  const totalBdayChapters = 6;

  function scrollToActiveTop() {
    const chassis = container?.closest ? (container.closest('.preview-frame-container') || container.closest('#previewContainer')) : null;
    if (chassis) {
      chassis.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }

  function goToBdayChapter(ch) {
    const targetCh = Math.max(1, Math.min(totalBdayChapters, ch));
    const cards = container.querySelectorAll('.bday-story-card');
    const currentCard = container.querySelector(`.bday-story-card[data-chapter="${currentBdayChapter}"]`);
    const targetCard = container.querySelector(`.bday-story-card[data-chapter="${targetCh}"]`);
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
          currentBdayChapter = targetCh;
        }
      });
    } else {
      cards.forEach(c => {
        if (c.getAttribute('data-chapter') == targetCh) {
          c.style.display = 'block';
          c.classList.add('active');
          c.style.opacity = '1';
        } else {
          c.style.display = 'none';
          c.classList.remove('active');
        }
      });
      currentBdayChapter = targetCh;
      scrollToActiveTop();
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  container.querySelectorAll('.btn-bday-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playBdayTone('chime');
      goToBdayChapter(next);
    });
  });

  container.querySelectorAll('.btn-bday-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playBdayTone('chime');
      goToBdayChapter(prev);
    });
  });

  container.querySelector('#btnBdayReplay')?.addEventListener('click', () => {
    playBdayTone('cheer');
    goToBdayChapter(1);
  });

  // Activate Chapter 1 initially
  goToBdayChapter(1);

  // =========================================================================
  // 60FPS BACKGROUND BALLOONS & CONFETTI CANVAS ANIMATION
  // =========================================================================
  const animCanvas = container.querySelector('#bdayAnimCanvas');
  let bdayAnimId = null;
  let onBdayResize = null;
  if (animCanvas) {
    const aCtx = animCanvas.getContext('2d');
    let cw = (animCanvas.width = window.innerWidth);
    let ch = (animCanvas.height = window.innerHeight);

    onBdayResize = () => {
      if (!animCanvas) return;
      cw = animCanvas.width = window.innerWidth;
      ch = animCanvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onBdayResize);

    const balloonColors = ['#f43f5e', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899'];
    const balloons = [];
    const balloonCount = Math.min(22, Math.floor(cw / 35));

    for (let i = 0; i < balloonCount; i++) {
      balloons.push({
        x: Math.random() * cw,
        y: ch + Math.random() * ch * 0.8,
        radius: 14 + Math.random() * 16,
        speed: 0.6 + Math.random() * 0.9,
        swingOffset: Math.random() * Math.PI * 2,
        swingAmp: 18 + Math.random() * 20,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        stringLength: 35 + Math.random() * 20
      });
    }

    const confettiFlakes = [];
    for (let i = 0; i < 30; i++) {
      confettiFlakes.push({
        x: Math.random() * cw,
        y: Math.random() * ch,
        size: 3 + Math.random() * 4,
        speedY: 0.4 + Math.random() * 0.8,
        speedX: -0.3 + Math.random() * 0.6,
        color: balloonColors[Math.floor(Math.random() * balloonColors.length)],
        rot: Math.random() * Math.PI,
        rotSpeed: 0.02 + Math.random() * 0.04
      });
    }

    function renderBdayCanvas() {
      aCtx.clearRect(0, 0, cw, ch);

      // Render drifting background balloons
      for (let i = 0; i < balloons.length; i++) {
        const b = balloons[i];
        b.y -= b.speed;
        b.swingOffset += 0.015;
        const currentX = b.x + Math.sin(b.swingOffset) * b.swingAmp;

        if (b.y + b.radius * 2 < -50) {
          b.y = ch + 40;
          b.x = Math.random() * cw;
        }

        aCtx.save();
        aCtx.fillStyle = b.color;
        aCtx.globalAlpha = 0.45;
        aCtx.beginPath();
        aCtx.ellipse(currentX, b.y, b.radius * 0.85, b.radius, 0, 0, Math.PI * 2);
        aCtx.fill();

        // Highlight sheen
        aCtx.fillStyle = '#ffffff';
        aCtx.globalAlpha = 0.25;
        aCtx.beginPath();
        aCtx.ellipse(currentX - b.radius * 0.3, b.y - b.radius * 0.4, b.radius * 0.2, b.radius * 0.3, -Math.PI / 6, 0, Math.PI * 2);
        aCtx.fill();

        // Balloon string
        aCtx.strokeStyle = 'rgba(255,255,255,0.3)';
        aCtx.lineWidth = 1;
        aCtx.beginPath();
        aCtx.moveTo(currentX, b.y + b.radius);
        aCtx.quadraticCurveTo(currentX + Math.sin(b.swingOffset * 2) * 8, b.y + b.radius + b.stringLength * 0.5, currentX, b.y + b.radius + b.stringLength);
        aCtx.stroke();
        aCtx.restore();
      }

      // Render gentle falling confetti
      for (let i = 0; i < confettiFlakes.length; i++) {
        const c = confettiFlakes[i];
        c.y += c.speedY;
        c.x += c.speedX;
        c.rot += c.rotSpeed;

        if (c.y > ch + 10) {
          c.y = -10;
          c.x = Math.random() * cw;
        }

        aCtx.save();
        aCtx.translate(c.x, c.y);
        aCtx.rotate(c.rot);
        aCtx.fillStyle = c.color;
        aCtx.globalAlpha = 0.5;
        aCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size * 0.7);
        aCtx.restore();
      }

      bdayAnimId = requestAnimationFrame(renderBdayCanvas);
    }
    renderBdayCanvas();
  }

  // =========================================================================
  // INTERACTIVE BALLOON POPPING MINI-GAME
  // =========================================================================
  const balloonPopRow = container.querySelector('#balloonPopRow');
  const balloonWishBubble = container.querySelector('#balloonWishBubble');

  if (balloonPopRow) {
    const popItems = balloonPopRow.querySelectorAll('.pop-balloon');
    popItems.forEach(b => {
      b.addEventListener('click', (e) => {
        if (b.classList.contains('popped')) return;
        b.classList.add('popped');
        playBdayTone('pop');

        const wish = b.getAttribute('data-wish') || 'Infinite Happiness! ✨';
        if (balloonWishBubble) {
          balloonWishBubble.textContent = `✨ ${wish} ✨`;
          gsap.fromTo(balloonWishBubble, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25 });
        }

        const rect = b.getBoundingClientRect();
        confetti({
          particleCount: 22,
          spread: 45,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight
          }
        });

        gsap.to(b, {
          scale: 1.4,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            b.style.visibility = 'hidden';
          }
        });
      });
    });
  }

  // =========================================================================
  // 3D MULTI-TIER CAKE & CANDLE BLOWING ACTION
  // =========================================================================
  const cakeStage = container.querySelector('#cakeStage');
  const btnBlowCandles = container.querySelector('#btnBlowCandles');
  const cakeTapHint = container.querySelector('#cakeTapHint');
  const smokeField = container.querySelector('#candleSmokeField');
  let candlesBlown = false;

  function blowOutCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    playBdayTone('cheer');

    const flames = container.querySelectorAll('.candle-flame');
    flames.forEach(f => {
      gsap.to(f, {
        scale: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in'
      });
    });

    if (smokeField) {
      for (let i = 0; i < 16; i++) {
        const s = document.createElement('div');
        s.className = 'smoke-particle';
        s.style.left = `${45 + (Math.random() - 0.5) * 40}%`;
        s.style.top = `${25 + (Math.random() - 0.5) * 15}%`;
        smokeField.appendChild(s);
        gsap.to(s, {
          y: -40 - Math.random() * 40,
          x: (Math.random() - 0.5) * 30,
          opacity: 0,
          scale: 2.2,
          duration: 1.2 + Math.random() * 0.8,
          onComplete: () => s.remove()
        });
      }
    }

    if (cakeTapHint) {
      cakeTapHint.innerHTML = '🎉 WISH GRANTED! MAY ALL YOUR DREAMS COME TRUE! ✨';
      cakeTapHint.style.color = '#10b981';
    }

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#f43f5e', '#10b981', '#3b82f6', '#ffffff']
    });

    if (btnBlowCandles) {
      btnBlowCandles.textContent = '✨ Wish Made! Candles Blown! 🎂';
      btnBlowCandles.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      btnBlowCandles.style.color = '#fff';
    }
  }

  cakeStage?.addEventListener('click', blowOutCandles);
  btnBlowCandles?.addEventListener('click', blowOutCandles);

  // Mount internal components
  initMusicPlayer(container.querySelector('#tpMusicSlot'), {
    ...data,
    audioSrc: data.audioSrc || '/audio/song.mp3',
    audioTitle: data.audioTitle || `Happy Birthday Acoustic Wish`
  });

  initHeroSection(container.querySelector('#tpHeroSlot'), {
    ...data,
    badgeText: data.heroBadge || "ROYAL BIRTHDAY CELEBRATION 🎂✨",
    title: data.heroTitle || `Happy Birthday, ${recipientName}! 🎉`,
    subtitle: data.heroSubtitle || "Celebrating the most extraordinary soul on their special day ✨"
  });

  initPhotoRibbon(container.querySelector('#tpRibbonSlot'), data);
  initPolaroidWall(container.querySelector('#tpPolaroidSlot'), data);

  initFlipBook(container.querySelector('#tpFlipSlot'), {
    ...data,
    magazine: {
      ...(data.magazine || {}),
      title: data.magazine?.title || "BIRTHDAY EDITION",
      quote: data.magazine?.quote || "To another year of laughing until our stomachs hurt and living life like the main character."
    }
  });

  initScratchCard(container.querySelector('#tpScratchSlot'), {
    ...data,
    scratchBadge: "SECRET BIRTHDAY REVEAL 🎟️",
    scratchTitle: `For ${recipientName}`,
    scratchSubtitle: "Scratch with your finger to unlock your mystery birthday gift!",
    scratchSecret: data.scratchSecret || "Unlimited hugs, supreme happiness, and a celebration feast on me! 🥂✨"
  });

  initVipLanyard(container.querySelector('#tpLanyardSlot'), {
    ...data,
    lanyardBadge: "VIP BIRTHDAY ALL-ACCESS PASS",
    lanyardAccess: "STATUS: SUPREME VIP GUEST OF HONOR",
    recipientName
  });

  initPhoneChat(container.querySelector('#tpChatSlot'), {
    ...data,
    contactName: `${recipientName} 🎂✨`,
    defaultChat: [
      `HAPPY BIRTHDAY ${recipientName.toUpperCase()}! 🎂💖`,
      "Today is all about celebrating YOU! ✨",
      "May this year bring you unstoppable success, joy, and peace! 🥂🎉"
    ]
  });

  return () => {
    if (bdayAnimId) cancelAnimationFrame(bdayAnimId);
    if (onBdayResize) window.removeEventListener('resize', onBdayResize);
    if (sharedAudioCtx && sharedAudioCtx.state !== 'closed') {
      sharedAudioCtx.close().catch(() => {});
      sharedAudioCtx = null;
    }
  };
}
