// src/viewer/templates/valentineTemplate.js - Blossom-Grade Immersive Valentine Romance Experience
// Features: Sacred Beating Heart Opener Gate, 60fps Falling Rose Petals Canvas,
// Interactive Cupid Archery Game, Wax-Sealed Valentine Parchment, Cherished Polaroids & Forever Devotion Seal in a continuous flow.

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderValentineTemplate(container, data) {
  const recipient = data.recipientName || 'My Valentine';
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "The Way You Smile 💖", image: "/images/always_you.jpg", note: "The whole room lights up every single time you laugh." },
    { title: "Sweetest Memories 🌸", image: "/images/sunset.jpg", note: "Every moment with you feels like our favorite song playing on repeat." },
    { title: "Forever Yours 🌹", image: "/images/dream_girl.jpg", note: "No matter where life takes us, my heart will always belong to you." }
  ];

  // Synthesize Web Audio Harp & Heartbeat
  function playValTone(type = 'chime') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'heartbeat') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(90, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
      } else {
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
    <!-- Top Audio Player -->
    <div id="valPlayerSlot" style="position:relative; z-index:100;"></div>

    <!-- Fireworks & Celebration Canvas -->
    <canvas id="valFireworksCanvas" style="position:fixed; inset:0; pointer-events:none; z-index:2; width:100%; height:100%;"></canvas>

    <div class="val-page-viewport val-storybook-viewport" style="position:relative; z-index:10; max-width:820px; margin:0 auto; padding:0 16px 80px;">
      
      <!-- Falling Rose Petals Canvas -->
      <canvas id="valPetalCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED VALENTINE OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="valGate" role="button" tabindex="0" aria-label="Tap to unlock Valentine confession" style="background: radial-gradient(circle at center, #24040d 0%, #080104 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#f43f5e; box-shadow: 0 0 35px rgba(244,63,94,0.6);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(244,63,94,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            💘🌹
          </div>
          <div class="bro-gate-badge" style="background:rgba(244,63,94,0.18); border-color:#f43f5e; color:#fca5a5;">
            CONFESSION OF DEVOTION
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(244,63,94,0.6);">
            Will You Be My Valentine, ${recipient}?
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            Cupid struck my heart the moment you walked into my world.
          </p>
          <div class="bro-gate-hint" style="color:#fca5a5; border-color:rgba(244,63,94,0.4); background:rgba(244,63,94,0.12);">
            🏹 TAP TO UNSEAL MY HEART ❤️
          </div>
        </div>
      </div>

      <!-- FOCUSED CHAPTER JOURNEY FLOW (ONE IMMERSIVE SCENE AT A TIME) -->
      <main class="val-flow-container" style="display:flex; flex-direction:column;">
        
        <!-- CHAPTER 1: CUPID'S ARCHERY GAME -->
        <section class="val-story-card active" data-chapter="1" style="background:rgba(26,6,15,0.92); border:1.5px solid rgba(244,63,94,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px); text-align:center;">
          <div class="val-tag" style="display:inline-block; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fca5a5; background:rgba(244,63,94,0.15); padding:4px 14px; border-radius:20px; border:1px solid rgba(244,63,94,0.4); margin-bottom:14px;">
            CUPID'S SACRED ARROW 🏹❤️
          </div>
          <h1 class="val-hero-title" style="color:#fff; font-size:28px; font-weight:900; margin:0 0 8px 0;">
            ${data.heroTitle || 'Cupid Struck My Heart'}
          </h1>
          <p class="val-hero-sub" style="color:#fecdd3; font-size:14px; margin:0 0 20px 0;">
            ${data.heroSubtitle || 'Pull back the recurve bow and strike my heart to begin our romantic confession...'}</p>

          <!-- Interactive Archery Arena -->
          <div class="val-archery-box" id="valArcheryBox" style="position:relative; width:100%; max-width:340px; height:240px; margin:0 auto; background:rgba(255,255,255,0.04); border:1px solid rgba(244,63,94,0.3); border-radius:20px; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:space-between; padding:16px;">
            <!-- Floating Target Heart -->
            <div class="val-target-heart" id="valTargetHeart" style="position:relative; cursor:pointer;">
              <span style="font-size:46px; display:inline-block; animation: pulse 1.5s infinite;">💖</span>
            </div>

            <!-- Recurve Bow -->
            <div class="val-bow-rig" id="valBowRig" style="cursor:pointer; text-align:center;">
              <div id="valArrow" style="font-size:28px; transform:translateY(0); transition:transform 0.1s ease;">🏹</div>
              <p style="font-size:11px; font-weight:700; color:#fb7185; margin-top:4px;">▼ PULL OR TAP TO SHOOT ▼</p>
            </div>

            <button type="button" class="btn-fam-action btn-quick-cupid" id="btnValDirectShoot" style="font-size:12px; padding:8px 18px; border-radius:14px; background:linear-gradient(135deg, #f43f5e, #be123c); border:none; color:#fff; font-weight:800; cursor:pointer; box-shadow:0 4px 15px rgba(244,63,94,0.4);">
              🎯 Direct Cupid Strike
            </button>
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-next" data-next="2" style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff;">
              <span>Love Letter of Devotion 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 2: WAX SEAL LETTER -->
        <section class="val-story-card" data-chapter="2" style="background:rgba(26,6,15,0.92); border:1.5px solid rgba(244,63,94,0.4); border-radius:24px; padding:28px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px); text-align:center;">
          <div class="val-tag" style="display:inline-block; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fca5a5; background:rgba(244,63,94,0.15); padding:4px 14px; border-radius:20px; border:1px solid rgba(244,63,94,0.4); margin-bottom:14px;">
            A CONFESSION OF DEVOTION 🌹
          </div>
          <h2 class="val-hero-title" style="color:#fff; font-size:22px; font-weight:800; margin:0 0 6px 0;">My Heart, In Words</h2>
          <p class="val-hero-sub" style="color:#fecdd3; font-size:13px; margin:0 0 18px 0;">Tap the ruby wax seal to unroll the heartfelt love letter</p>

          <div class="wax-envelope-wrap" id="valEnvelope" style="margin:16px auto; cursor:pointer;">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="valFlap"></div>
            <button class="wax-seal-button" id="valWaxSeal" title="Tap to unseal letter" style="border:none; background:none; cursor:pointer;">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">💌</span>
              </div>
            </button>
          </div>
          <p class="envelope-subtitle" style="margin-top:14px; font-size:12px; color:#fca5a5; font-weight:700;">👆 Tap the wax seal to read!</p>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="3" style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff;">
              <span>Cherished Memories 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 3: POLAROIDS -->
        <section class="val-story-card" data-chapter="3" style="background:rgba(26,6,15,0.92); border:1.5px solid rgba(244,63,94,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px);">
          <div class="val-tag" style="text-align:center; font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fca5a5; margin-bottom:6px;">WHY I FELL FOR YOU 📸</div>
          <h2 class="val-memories-title" style="text-align:center; color:#fff; font-size:22px; font-weight:800; margin:0 0 20px 0;">Cherished Moments With You</h2>
          <div class="val-polaroids-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:18px;">
            ${polaroids.map(p => `
              <div class="val-polaroid-card" style="background:#fff; color:#0f172a; border-radius:14px; padding:12px; box-shadow:0 10px 25px rgba(0,0,0,0.4); text-align:center;">
                <div class="val-polaroid-img-frame" style="width:100%; height:200px; border-radius:10px; overflow:hidden; margin-bottom:10px;">
                  <img src="${p.image}" alt="${p.title || 'Valentine Memory'}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="val-polaroid-caption" style="margin:0 0 4px 0; font-size:14px; font-weight:800; color:#0f172a;">${p.title}</h4>
                <p class="val-polaroid-note" style="margin:0; font-size:12px; color:#475569; line-height:1.4;">${p.note || ''}</p>
              </div>
            `).join('')}
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="4" style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff;">
              <span>Love Quiz Trivia 🎯</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 4: LOVE QUIZ -->
        <section class="val-story-card" data-chapter="4" style="background:rgba(26,6,15,0.92); border:1.5px solid rgba(244,63,94,0.4); border-radius:24px; padding:24px 20px; box-shadow:0 12px 35px rgba(0,0,0,0.6); backdrop-filter:blur(14px); text-align:center;">
          <div class="val-tag" style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fca5a5; margin-bottom:6px;">HOW DEEPLY DO YOU KNOW MY HEART? 🎯</div>
          <h2 class="val-quiz-title" style="color:#fff; font-size:22px; font-weight:800; margin:0 0 16px 0;">Our Sweet Love Trivia</h2>
          <div class="val-quiz-box" style="background:rgba(255,255,255,0.04); border:1px solid rgba(244,63,94,0.3); border-radius:18px; padding:20px; max-width:440px; margin:0 auto;">
            <p style="font-size:15px; font-weight:700; color:#fff; margin:0 0 16px 0;">Where does my heart feel most at peace?</p>
            <div style="display:flex; flex-direction:column; gap:10px;">
              <button type="button" class="val-quiz-btn" data-correct="false" style="padding:12px; border-radius:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; font-weight:700; cursor:pointer;">At the most luxurious places on earth</button>
              <button type="button" class="val-quiz-btn" data-correct="true" style="padding:12px; border-radius:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; font-weight:700; cursor:pointer;">Right beside you, anywhere in the world ❤️</button>
              <button type="button" class="val-quiz-btn" data-correct="false" style="padding:12px; border-radius:12px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; font-weight:700; cursor:pointer;">Only when eating my favorite dessert</button>
            </div>
            <div id="valQuizFeedback" style="margin-top:14px; font-weight:800; font-size:13px; min-height:22px;"></div>
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-val-next" data-next="5" style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff;">
              <span>Forever Devotion Seal 🌹</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- CHAPTER 5: FOREVER DEVOTION SEAL -->
        <section class="val-story-card" data-chapter="5" style="background:linear-gradient(135deg, rgba(35,5,15,0.95), rgba(15,2,8,0.98)); border:2px solid rgba(244,63,94,0.45); border-radius:24px; padding:28px 20px; box-shadow:0 16px 40px rgba(0,0,0,0.7); text-align:center;">
          <div style="font-size:42px; margin-bottom:8px;">🌹💍✨</div>
          <h2 style="color:#fb7185; font-size:24px; font-weight:900; margin:0 0 10px 0;">Forever My Valentine</h2>
          <p style="color:#fecdd3; font-size:13.5px; line-height:1.6; max-width:520px; margin:0 auto 20px;">
            "You are my today and all of my tomorrows."
          </p>
          <div style="display:inline-flex; align-items:center; gap:8px; padding:8px 20px; background:rgba(244,63,94,0.18); border:1px solid #f43f5e; border-radius:30px; color:#fff; font-weight:800; font-size:13px;">
            ❤️ Forever In Love, ${data.senderName || 'Yours Completely'}
          </div>

          <div class="val-nav-dock">
            <button type="button" class="btn-val-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-val-replay" id="btnValReplay" style="background:linear-gradient(135deg, #f43f5e, #be123c); color:#fff; padding:10px 20px; border-radius:24px; font-weight:800; border:none; cursor:pointer;">
              <span>🌹 Replay Valentine's Love ↺</span>
            </button>
          </div>
        </section>

      </main>
    </div>

    <!-- WAX SEAL MODAL -->
    <div class="wax-letter-modal neu-modal-overlay" id="valLetterModal">
      <div class="wax-letter-parchment" style="max-width:500px; max-height:85vh; overflow-y:auto;">
        <button class="btn-close-parchment" id="btnCloseValLetter">✕</button>
        <div class="parchment-gold-seal">💌</div>
        <h3 class="parchment-title" style="margin-top:10px;">To My Valentine, ${recipient}</h3>
        <div class="parchment-body" style="white-space: pre-line; line-height:1.7; font-size:14px; color:#332211;">
          ${data.letter || `My Dearest Valentine,

You are the greatest blessing life has ever given me. Every laugh we share, every quiet moment, and every dream we build together is precious beyond words.

I promise to hold your hand through every season, to celebrate your victories, and to love you more with every passing second.

Happy Valentine's Day, my forever love.`}
        </div>
        <div class="parchment-signature" style="margin-top:20px; font-weight:800; color:#881337;">
          ${data.senderName || 'Yours Always 🌹'}
        </div>
      </div>
    </div>
  `;

  // Opener Gate Execution
  const gateEl = container.querySelector('#valGate');
  if (gateEl) {
    const executeOpenGate = () => {
      if (gateEl.classList.contains('is-open')) return;
      playValTone('chime');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#be123c', '#fb7185', '#ffffff']
      });
      gateEl.classList.add('is-open');
    };
    gateEl.addEventListener('click', executeOpenGate);
  }

  // Interactive Archery Rig
  const bowRig = container.querySelector('#valBowRig');
  const arrowEl = container.querySelector('#valArrow');
  const targetHeart = container.querySelector('#valTargetHeart');
  const btnDirectShoot = container.querySelector('#btnValDirectShoot');

  function shootArrow() {
    playValTone('heartbeat');
    if (arrowEl) {
      gsap.to(arrowEl, {
        y: -120,
        opacity: 0,
        duration: 0.25,
        onComplete: () => {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.45 },
            colors: ['#f43f5e', '#fb7185', '#ffffff']
          });
          gsap.fromTo(targetHeart, { scale: 1.6 }, { scale: 1, duration: 0.4, ease: 'bounce.out' });
          gsap.set(arrowEl, { y: 0, opacity: 1, delay: 0.5 });
        }
      });
    }
  }

  bowRig?.addEventListener('click', shootArrow);
  btnDirectShoot?.addEventListener('click', shootArrow);

  // Wax Seal Letter Modal
  const sealBtn = container.querySelector('#valWaxSeal');
  const modal = container.querySelector('#valLetterModal');
  const closeModal = container.querySelector('#btnCloseValLetter');

  sealBtn?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(20);
    modal.classList.add('visible');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  });

  closeModal?.addEventListener('click', () => {
    modal.classList.remove('visible');
  });

  // Love Quiz Interactions
  const quizFeedback = container.querySelector('#valQuizFeedback');
  container.querySelectorAll('.val-quiz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const isCorrect = btn.getAttribute('data-correct') === 'true';
      if (isCorrect) {
        playValTone('chime');
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        btn.style.borderColor = '#10b981';
        if (quizFeedback) {
          quizFeedback.textContent = '🎉 That is right! My heart is at peace wherever you are! ✨';
          quizFeedback.style.color = '#10b981';
        }
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } else {
        btn.style.background = 'rgba(239,68,68,0.2)';
        btn.style.borderColor = '#ef4444';
        if (quizFeedback) {
          quizFeedback.textContent = 'Aww sweet, but guess again! ❤️';
          quizFeedback.style.color = '#f87171';
        }
      }
    });
  });

  // Chapter-by-Chapter Journey Navigation
  let currentValChapter = 1;
  const totalValChapters = 5;

  function goToValChapter(ch) {
    const targetCh = Math.max(1, Math.min(totalValChapters, ch));
    const cards = container.querySelectorAll('.val-story-card');
    const currentCard = container.querySelector(`.val-story-card[data-chapter="${currentValChapter}"]`);
    const targetCard = container.querySelector(`.val-story-card[data-chapter="${targetCh}"]`);
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
          currentValChapter = targetCh;
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
      currentValChapter = targetCh;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (navigator.vibrate) navigator.vibrate(15);
  }

  container.querySelectorAll('.btn-val-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playValTone('chime');
      goToValChapter(next);
    });
  });

  container.querySelectorAll('.btn-val-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playValTone('chime');
      goToValChapter(prev);
    });
  });

  container.querySelector('#btnValReplay')?.addEventListener('click', () => {
    playValTone('chime');
    goToValChapter(1);
  });

  // Activate Chapter 1 initially
  goToValChapter(1);

  // Top music player
  initMusicPlayer(container.querySelector('#valPlayerSlot'), {
    ...data,
    audioSrc: data.audioSrc || '/audio/alfaaz.mp3',
    audioTitle: data.audioTitle || `Romantic Serenade`
  });
}
