// src/viewer/templates/friendshipTemplate.js - Best Friends Forever Luxury Celebration (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playBffTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'slap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.14);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } else if (type === 'clink') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1550, now);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.52);
    } else if (type === 'chime') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.18, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.48);
      });
    }
  } catch (e) {}
}

export function renderFriendshipTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Partners in Crime 👯", image: "/images/sunset.jpg", note: "From crazy spontaneous plans to endless uncontrollable laughter." },
    { title: "Best Friends Forever 🥂", image: "/images/always_you.jpg", note: "Thank you for always having my back no matter what." },
    { title: "Unstoppable Duo 🌟", image: "/images/baddie.jpg", note: "Here's to a lifetime of chaotic adventures and memories!" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="bffPlayerSlot"></div>

    <div class="bff-page-viewport bff-storybook-viewport">
      <!-- Ambient Friendship Constellations Canvas (60FPS) -->
      <canvas id="bffCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED BEST FRIENDS OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="friendshipGate" role="button" tabindex="0" aria-label="Tap to unlock friendship celebration" style="background: radial-gradient(circle at center, #241407 0%, #0c0602 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#f59e0b; box-shadow: 0 0 35px rgba(245,158,11,0.6);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(245,158,11,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            👯‍♀️🥂
          </div>
          <div class="bro-gate-badge" style="background:rgba(245,158,11,0.18); border-color:#f59e0b; color:#fde68a;">
            BEST FRIENDS FOREVER
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(245,158,11,0.6);">
            To My Partner in Crime ✨
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            Unstoppable duo, uncontrollable laughter, and lifetime memories.
          </p>
          <div class="bro-gate-hint" style="color:#fde68a; border-color:rgba(245,158,11,0.4); background:rgba(245,158,11,0.12);">
            🥂 TAP TO ENTER FRIENDSHIP ARENA ✨
          </div>
        </div>
      </div>

      <main class="bff-pages-container" id="bffPagesContainer" style="display:flex; flex-direction:column; gap:28px;">
        <!-- PAGE 1: HERO & INTERACTIVE HIGH-FIVE ARENA -->
        <section class="bff-page-card active" data-page="1">
          <div class="bff-hero-wrap">
            <div class="bff-tag">PARTNERS IN CRIME 🏆</div>
            <h1 class="bff-hero-title">${data.heroTitle || 'Cheers to My Best Friend!'}</h1>
            <p class="bff-hero-sub">${data.heroSubtitle || 'To the one who knows all my secrets and loves me anyway! 😂'}</p>
            
            <!-- High-Five Slap Arena Centerpiece -->
            <div class="bff-highfive-arena" id="bffHighFiveArena" style="position:relative; width:220px; height:130px; margin:22px auto 12px; cursor:pointer; display:flex; align-items:center; justify-content:center;">
              <div id="leftHand" style="font-size:52px; transform:translateX(-30px); transition:transform 0.2s ease;">🫲</div>
              <div id="highFiveShockwave" style="position:absolute; width:60px; height:60px; border-radius:50%; border:3px solid #2ed573; opacity:0; pointer-events:none;"></div>
              <div id="rightHand" style="font-size:52px; transform:translateX(30px); transition:transform 0.2s ease;">🫱</div>
            </div>
            
            <div id="highFiveStreakCounter" style="text-align:center; font-size:13px; font-weight:800; color:#2ed573; letter-spacing:1px; text-transform:uppercase;">
              ✦ TAP TO SLAP HIGH-FIVE (STREAK: 0) ✦
            </div>
          </div>

          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-next" data-next="2">
              <span>View Distinction Certificate 🎖️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: LUXURY CERTIFICATE -->
        <section class="bff-page-card" data-page="2">
          <div class="bff-cert-luxury">
            <div class="cert-gold-frame" style="border:3px solid #d4af37; background:#fffdf8; padding:24px; border-radius:16px; box-shadow:0 10px 30px rgba(212,175,55,0.2); text-align:center;">
              <div class="cert-seal-ribbon" style="font-size:40px; margin-bottom:8px;">🎖️</div>
              <div class="cert-header-tag" style="font-size:11px; font-weight:800; color:#b45309; letter-spacing:1.5px;">OFFICIAL CERTIFICATE OF DISTINCTION</div>
              <h2 class="cert-main-name" style="font-size:22px; color:#78350f; margin:8px 0;">BEST HUMAN BEING ALIVE</h2>
              <div class="cert-sub-text" style="font-size:13px; color:#8c7882;">This prestigious recognition is proudly presented to:</div>
              <div class="cert-recipient-name" style="font-size:20px; font-weight:800; color:#b45309; margin:8px 0;">${data.recipientName || 'My Bestie'}</div>
              <p class="cert-award-reason" style="font-size:13px; line-height:1.6; color:#2d1a24; font-style:italic;">
                ${data.awardReason || 'For exceptional tolerance of my 2 AM drama, unconditional loyalty, unmatched humor, and being an elite gossip partner.'}
              </p>
              <div class="cert-sign-row" style="display:flex; justify-content:space-around; margin-top:16px; border-top:1px dashed #d4af37; padding-top:12px;">
                <div>
                  <span class="cert-sign-label" style="display:block; font-size:11px; color:#8c7882;">Date Awarded</span>
                  <strong class="cert-sign-val" style="color:#78350f; font-size:12px;">Today &amp; Forever</strong>
                </div>
                <div>
                  <span class="cert-sign-label" style="display:block; font-size:11px; color:#8c7882;">Certified By</span>
                  <strong class="cert-sign-val" style="color:#78350f; font-size:12px;">${data.senderName || 'Your Ride or Die'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-bff-next" data-next="3">
              <span>Unforgettable Chaos Episodes ⚡</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: SILLY MEMORIES HALL OF FAME -->
        <section class="bff-page-card" data-page="3">
          <div class="bff-memories-section">
            <div class="bff-tag">HALL OF FAME</div>
            <h2 class="bff-section-title">Unforgettable Chaos</h2>

            <div class="bff-cards-grid" style="display:flex; flex-direction:column; gap:12px; margin-top:14px;">
              ${(data.sillyMemories || [
                { title: "The 2 AM Phone Calls", text: "When we solve all of the world's problems while laughing until our stomachs hurt." },
                { title: "Unspoken Telepathy", text: "That one look across the room that says everything without saying a single word." },
                { title: "Emergency Getaways", text: "Spontaneous drives, bad decisions, and unforgettable adventures." },
                { title: "Unconditional Hype", text: "Being each other's #1 cheerleader in every room we walk into." }
              ]).map(m => `
                <div class="bff-memory-card" style="background:#fffcf7; border:1px solid rgba(46,213,115,0.3); border-radius:12px; padding:14px; box-shadow:0 4px 14px rgba(46,213,115,0.08);">
                  <h4 style="margin:0 0 6px 0; color:#2ed573; font-size:15px;">⚡ ${m.title}</h4>
                  <p style="margin:0; font-size:13px; line-height:1.5; color:#2d1a24;">${m.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-bff-next" data-next="4">
              <span>Bestie Memories &amp; Toast 🥂</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: BESTIE MEMORIES & CLINKING TOAST -->
        <section class="bff-page-card" data-page="4">
          <div class="bff-memories-section">
            <div class="bff-tag">LIFETIME MEMORIES</div>
            <h2 class="bff-section-title">Moments We Will Never Forget</h2>
            <div class="bff-polaroids-grid" style="display:flex; gap:12px; overflow-x:auto; padding:10px 0;">
              ${polaroids.map((p, i) => `
                <div class="bff-polaroid-card" style="min-width:200px; background:#fff; padding:10px; border-radius:12px; box-shadow:0 4px 14px rgba(0,0,0,0.08); border:1px solid #eee;">
                  <div class="bff-polaroid-frame" style="border-radius:8px; overflow:hidden; height:180px;">
                    <img src="${p.image}" alt="${p.title || 'Bestie Memory'}" onerror="this.src='/images/sunset.jpg'" style="width:100%; height:100%; object-fit:cover;" />
                  </div>
                  <div class="bff-polaroid-info" style="margin-top:8px; text-align:center;">
                    <h4 class="bff-pol-title" style="margin:0 0 4px 0; font-size:13px; color:#2d1a24;">${p.title || `Memory #${i+1}`}</h4>
                    <p class="bff-pol-note" style="margin:0; font-size:11px; color:#8c7882;">${p.note || p.caption || ''}</p>
                    <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 6px auto 2px auto; background:linear-gradient(135deg, #2ed573, #10b981); color:#fff; border:none; padding:5px 12px; border-radius:16px; font-size:11px; font-weight:800; cursor:pointer;">
                      📸 Save Keepsake
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Clinking Toast Button -->
            <div style="text-align:center; margin: 30px 0 10px;">
              <button class="btn-bff-toast" id="btnBffToast" style="background:linear-gradient(135deg, #2ed573, #10b981); color:#fff; border-radius:30px; font-weight:800; padding:12px 28px; border:none; box-shadow:0 6px 20px rgba(46,213,115,0.4); cursor:pointer;">
                🥂 Toast to 100 More Years of Friendship! 🥂
              </button>
            </div>
          </div>
          <div class="bff-nav-dock">
            <button type="button" class="btn-bff-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-bff-replay" id="btnBffReplay">
              <span>🥂 Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Engine
  const bffPageTitles = [
    { num: 1, title: "Partners in Crime 🏆" },
    { num: 2, title: "Official Distinction Certificate 🎖️" },
    { num: 3, title: "Unforgettable Chaos Episodes ⚡" },
    { num: 4, title: "Bestie Memories & Toast 🥂" }
  ];

  // Opener Gate Execution
  const bffGate = container.querySelector('#friendshipGate');
  if (bffGate) {
    const executeOpenBffGate = () => {
      if (bffGate.classList.contains('is-open')) return;
      playBffTone('chime');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f59e0b', '#fbbf24', '#2ed573', '#ffffff']
      });
      bffGate.classList.add('is-open');
    };
    bffGate.addEventListener('click', executeOpenBffGate);
  }

  const totalPages = bffPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    const targetPage = Math.max(1, Math.min(totalPages, page));
    const cards = container.querySelectorAll('.bff-page-card');
    const currentCard = container.querySelector(`.bff-page-card[data-page="${currentPage}"]`);
    const targetCard = container.querySelector(`.bff-page-card[data-page="${targetPage}"]`);
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

  container.querySelectorAll('.btn-bff-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playBffTone('chime');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-bff-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playBffTone('chime');
      goToPage(prev);
    });
  });
  container.querySelector('#btnBffReplay')?.addEventListener('click', () => {
    playBffTone('clink');
    goToPage(1);
  });

  // =========================================================================
  // 1. FRIENDSHIP CONSTELLATIONS CANVAS (60FPS)
  // =========================================================================
  const bCanvas = container.querySelector('#bffCanvas');
  if (bCanvas) {
    bCanvas.width = window.innerWidth;
    bCanvas.height = window.innerHeight;
    const bCtx = bCanvas.getContext('2d');
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        x: Math.random() * bCanvas.width,
        y: Math.random() * bCanvas.height,
        r: Math.random() * 3 + 1.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.6 + 0.2),
        alpha: Math.random() * 0.6 + 0.3
      });
    }

    function renderConstellations() {
      bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);

      // Draw constellation connecting lines between close stars
      bCtx.strokeStyle = 'rgba(46, 213, 115, 0.15)';
      bCtx.lineWidth = 1;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            bCtx.beginPath();
            bCtx.moveTo(stars[i].x, stars[i].y);
            bCtx.lineTo(stars[j].x, stars[j].y);
            bCtx.stroke();
          }
        }
      }

      // Draw glowing stars
      for (let s of stars) {
        bCtx.save();
        bCtx.beginPath();
        bCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        bCtx.fillStyle = `rgba(46, 213, 115, ${s.alpha})`;
        bCtx.shadowBlur = 8;
        bCtx.shadowColor = '#2ed573';
        bCtx.fill();
        bCtx.restore();

        s.y += s.vy;
        s.x += s.vx;
        if (s.y < -10) {
          s.y = bCanvas.height + 10;
          s.x = Math.random() * bCanvas.width;
        }
      }
      requestAnimationFrame(renderConstellations);
    }
    renderConstellations();

    window.addEventListener('resize', () => {
      bCanvas.width = window.innerWidth;
      bCanvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // 2. PAGE 1: HIGH-FIVE SLAP ARENA
  // =========================================================================
  const highFiveArena = container.querySelector('#bffHighFiveArena');
  const leftHand = container.querySelector('#leftHand');
  const rightHand = container.querySelector('#rightHand');
  const shockwave = container.querySelector('#highFiveShockwave');
  const streakCounter = container.querySelector('#highFiveStreakCounter');
  let streak = 0;

  highFiveArena?.addEventListener('click', () => {
    playBffTone('slap');
    streak++;
    if (navigator.vibrate) navigator.vibrate([25, 35]);

    gsap.timeline()
      .to([leftHand, rightHand], { x: 0, duration: 0.12, ease: 'power2.in' })
      .to(shockwave, { scale: 2.5, opacity: 0.8, duration: 0.12 }, '<')
      .to(leftHand, { x: -30, duration: 0.22, ease: 'back.out(2)' })
      .to(rightHand, { x: 30, duration: 0.22, ease: 'back.out(2)' }, '<')
      .to(shockwave, { scale: 0.5, opacity: 0, duration: 0.2 }, '<');

    streakCounter.textContent = `✦ HIGH-FIVE STREAK: x${streak} 🔥 (KEEP SLAPPING!) ✦`;

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.38 },
      colors: ['#2ed573', '#ffa502', '#70a1ff', '#ffffff']
    });
  });

  // Init Music Player
  initMusicPlayer(container.querySelector('#bffPlayerSlot'), {
    audioTitle: data.audioTitle || "Memories & Laughter",
    audioSubtitle: data.audioSubtitle || "BESTIE ANTHEM",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Toast Button
  container.querySelector('#btnBffToast')?.addEventListener('click', () => {
    playBffTone('clink');
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#2ed573', '#ffa502', '#ff4757', '#ffffff', '#70a1ff']
    });
  });

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.bff-polaroid-frame img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.bff-polaroid-card');
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
        link.download = `bff-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#2ed573', '#ffa502', '#ff4757', '#ffffff']
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
