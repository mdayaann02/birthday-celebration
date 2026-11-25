// src/viewer/templates/bestieGirlTemplate.js - Soul Sister, Partner in Crime & Main Character Energy (Page-By-Page)

import confetti from 'canvas-confetti';
import gsap from 'gsap';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { initMusicPlayer } from '../../components/musicPlayer.js';

// Tactile Sound Synthesizer
function playGirlTone(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    const now = ctx.currentTime;

    if (type === 'scratch') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.055);
    } else if (type === 'radio') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, now);
      osc.frequency.exponentialRampToValueAtTime(1150, now + 0.1);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } else if (type === 'pop') {
      [440, 554.37, 659.25, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0.15, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.38);
      });
    }
  } catch (e) {}
}

export function renderBestieGirlTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Main Character Energy 💅", image: "/images/baddie.jpg", note: "Every street is our personal runway and everywhere we go is a movie." },
    { title: "Unstoppable Duo 🌸", image: "/images/pretty.jpg", note: "The telepathic eye-contact across the room when someone says something unhinged." },
    { title: "Soul Sisters For Life ✨", image: "/images/dream_girl.jpg", note: "From 2 AM breakdown calls to screaming our favorite songs at the top of our lungs." }
  ];

  const emergencyStations = [
    { icon: "🚨", label: "CODE RED: Outfit Emergency", action: "Instant FaceTime dispatch with full closet veto power within 60 seconds." },
    { icon: "🧋", label: "CODE PINK: Emotional Boba Run", action: "Mandatory brown sugar milk tea delivery with 0% judgment and extra pearls." },
    { icon: "🕵️‍♀️", label: "CODE BLACK: FBI Deep Investigation", action: "10-minute thorough digital background check on that suspicious text message." },
    { icon: "👑", label: "CODE GOLD: Unconditional Hype Queen", action: "Leaving 45 flame emojis and hysterical commentary under her latest selfie." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="girlBestiePlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport bestie-girl-viewport">
      <!-- Ambient Rose Quartz Sparkle Canvas (60FPS) -->
      <canvas id="bestieGirlCanvas" class="blossom-bg-canvas" style="position:fixed; inset:0; pointer-events:none; z-index:1; width:100%; height:100%;"></canvas>

      <!-- SACRED SOUL SISTER OPENER GATE -->
      <div class="bro-gate ${window.isCelebrationEditorMode ? 'is-open' : ''}" id="bestieGirlGate" role="button" tabindex="0" aria-label="Tap to unlock Bestie celebration" style="background: radial-gradient(circle at center, #23081c 0%, #0c020a 80%);">
        <div class="bro-gate-circuit-bg" aria-hidden="true" style="opacity:0.25;"></div>
        <div class="bro-gate-centerpiece">
          <div class="bro-gate-energy-ring" style="border-color:#f472b6; box-shadow: 0 0 35px rgba(244,114,182,0.6);"></div>
          <div style="font-size:54px; margin-bottom:12px; filter: drop-shadow(0 0 18px rgba(244,114,182,0.8)); animation: floatMini 2.5s ease-in-out infinite alternate;">
            👯‍♀️💖
          </div>
          <div class="bro-gate-badge" style="background:rgba(244,114,182,0.18); border-color:#f472b6; color:#fbcfe8;">
            SOUL SISTER CELEBRATION
          </div>
          <h2 class="bro-gate-title" style="color:#fff; text-shadow:0 0 20px rgba(244,114,182,0.6);">
            To My Soul Sister, My Bestie 💅
          </h2>
          <p class="bro-gate-label" style="color:#cbd5e1; max-width:320px; margin:0 auto 18px;">
            Partner in crime, 2 AM therapist, and forever hype woman.
          </p>
          <div class="bro-gate-hint" style="color:#fbcfe8; border-color:rgba(244,114,182,0.4); background:rgba(244,114,182,0.12);">
            ✨ TAP TO ENTER SISTERHOOD REALM ✨
          </div>
        </div>
      </div>

      <!-- Multi-Page Content Cards Container (Continuous Immersive Flow) -->
      <main class="fam-pages-container" id="girlPagesContainer" style="display:flex; flex-direction:column; gap:28px;">
        <!-- PAGE 1: HERO & MAIN CHARACTER CROWN -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge gold-badge">👯‍♀️ SOUL SISTER, PARTNER IN CRIME &amp; HYPE WOMAN 💅✨</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Soul Sister, My Bestie 💅💖'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || 'In a world full of temporary people, you are my permanent home, my personal therapist, and my forever hype woman.'}</p>
            
            <!-- Main Character Crown Centerpiece -->
            <div class="bestie-crown-arena" id="bestieCrownArena" style="margin:20px auto 14px; text-align:center; cursor:pointer;">
              <div id="crownGlowCircle" style="width:110px; height:110px; margin:0 auto; border-radius:50%; background:radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(251,191,36,0.15) 70%, transparent 80%); display:flex; align-items:center; justify-content:center; box-shadow:0 0 25px rgba(244,114,182,0.3); transition:transform 0.3s ease;">
                <span id="bestieCrownIcon" style="font-size:52px; filter:drop-shadow(0 4px 12px rgba(244,114,182,0.4)); display:inline-block; transition:transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);">👑</span>
              </div>
              <div style="margin-top:10px; font-size:12px; font-weight:700; color:#db2777; letter-spacing:1px; text-transform:uppercase;">
                ✦ Tap Crown to Activate Main Character Energy ✦
              </div>
            </div>

            <div class="girl-quick-actions">
              <button class="btn-fam-action btn-hype-girl" id="btnHypeBestie">
                👑 Activate Unapologetic Bestie Hype Mode ✨
              </button>
            </div>
            <div id="hypeFeedback" class="fam-feedback-text"></div>

            <!-- GEN-Z RAGE-BAIT: RUNAWAY 3 AM VOICE NOTES BUTTON -->
            <div class="girl-ragebait-card" style="margin:22px auto 14px; background:rgba(255,255,255,0.96); border:1.5px solid rgba(244,114,182,0.6); border-radius:18px; padding:18px 16px; text-align:center; box-shadow:0 10px 28px rgba(244,114,182,0.25); max-width:440px;">
              <div style="font-size:11px; font-weight:800; color:#db2777; text-transform:uppercase; letter-spacing:1px; margin-bottom:6px;">
                🎀 THE UNHINGED BESTIE VAULT 🎀
              </div>
              <div style="font-size:15px; font-weight:800; color:#4c0527; margin-bottom:14px;">
                Should we permanently delete our 3 AM voice notes?
              </div>
              <div style="display:flex; justify-content:center; gap:12px; position:relative; min-height:52px; align-items:center;">
                <button type="button" class="btn-fam-action" id="btnDeleteVoiceNotes" style="background:#fce7f3; color:#831843; border-radius:20px; font-weight:800; padding:10px 22px; border:1px solid #f472b6; transition:transform 0.15s ease; user-select:none; -webkit-user-select:none;">
                  Delete Immediately 😂
                </button>
                <button type="button" class="btn-fam-action" id="btnKeepVoiceNotes" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; border-radius:20px; font-weight:800; padding:10px 22px; box-shadow:0 4px 14px rgba(236,72,153,0.35);">
                  Keep For Wedding Speech 💅
                </button>
              </div>
              <div id="girlRageToast" style="margin-top:10px; font-weight:800; font-size:13px; color:#e11d48; min-height:20px; transition:all 0.2s ease;"></div>
            </div>

            <!-- MAIN CHARACTER DELUSION & SLAY METER -->
            <div class="girl-aura-card" style="margin:16px auto; background:rgba(255,255,255,0.96); border:1.5px solid rgba(244,114,182,0.5); border-radius:18px; padding:16px; text-align:center; max-width:440px; box-shadow:0 8px 24px rgba(244,114,182,0.2);">
              <div style="font-size:11px; font-weight:800; color:#db2777; letter-spacing:1px; text-transform:uppercase; margin-bottom:4px;">
                💅 MAIN CHARACTER DELUSION LEVEL 💅
              </div>
              <div style="display:flex; align-items:center; justify-content:center; gap:8px; margin:8px 0;">
                <span style="font-size:32px; font-weight:900; color:#db2777; font-family:monospace;" id="girlAuraScore">+10,000,000</span>
                <span style="font-size:11px; font-weight:800; background:#fce7f3; color:#831843; padding:2px 8px; border-radius:10px; border:1px solid #f472b6;" id="girlAuraRank">CERTIFIED SLAYING 👑</span>
              </div>
              <div style="display:flex; justify-content:center; gap:8px; margin-top:10px;">
                <button type="button" id="btnSpillTea" style="background:linear-gradient(135deg, #ec4899, #db2777); color:#fff; font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; border:none; cursor:pointer; box-shadow:0 4px 10px rgba(236,72,153,0.3);">
                  ✨ Spill The Tea (+50k)
                </button>
                <button type="button" id="btnSendEmergencyBoba" style="background:#fff1f2; color:#be123c; border:1px solid #f43f5e; font-size:12px; font-weight:800; padding:8px 14px; border-radius:12px; cursor:pointer;">
                  🧋 Emergency Boba Run
                </button>
              </div>
            </div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Emergency Walkie-Talkie 📻</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: EMERGENCY DISPATCH WALKIE-TALKIE -->
        <section class="fam-page-card" data-page="2">
          <div class="girl-dispatch-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">✨ Bestie Emergency Dispatch 📻</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:16px;">
              24/7 hotline with zero questions asked and 100% unconditional backing.
            </p>

            <!-- Walkie-Talkie Radio Equalizer Centerpiece -->
            <div class="walkie-talkie-box" style="background:#831843; border:2px solid #f472b6; border-radius:16px; padding:18px; margin-bottom:16px; text-align:center; color:#fff;">
              <div style="font-size:11px; font-weight:800; letter-spacing:1.5px; color:#fbcfe8; margin-bottom:10px;">
                🔴 WALKIE-TALKIE DIRECT FREQUENCY: 104.5 FM (SOUL SISTERS)
              </div>
              
              <!-- Waveform equalizer bars -->
              <div id="radioEqualizer" style="display:flex; justify-content:center; align-items:flex-end; gap:5px; height:45px; margin-bottom:12px;">
                <div class="eq-bar" style="width:6px; height:20px; background:#f472b6; border-radius:3px;"></div>
                <div class="eq-bar" style="width:6px; height:35px; background:#fbbf24; border-radius:3px;"></div>
                <div class="eq-bar" style="width:6px; height:42px; background:#f472b6; border-radius:3px;"></div>
                <div class="eq-bar" style="width:6px; height:18px; background:#fbbf24; border-radius:3px;"></div>
                <div class="eq-bar" style="width:6px; height:38px; background:#f472b6; border-radius:3px;"></div>
                <div class="eq-bar" style="width:6px; height:25px; background:#fbbf24; border-radius:3px;"></div>
              </div>

              <button class="btn-fam-action" id="btnRadioPushToTalk" style="background:#db2777; color:#fff; border-radius:20px; font-weight:800; padding:8px 22px; border:1px solid #f472b6;">
                🎙️ PUSH TO TALK: "I NEED BOBAS NOW!"
              </button>
            </div>

            <div class="dispatch-stations-grid">
              ${emergencyStations.map((st, i) => `
                <div class="dispatch-station-btn btn-dispatch-station" data-idx="${i}" style="cursor:pointer; background:#fff1f2; padding:12px; border-radius:10px; border:1px solid #fecdd3; margin-bottom:10px;">
                  <div style="font-weight:700; color:#be123c; font-size:13px; margin-bottom:4px;">${st.icon} ${st.label}</div>
                  <div style="font-size:12px; color:#4c0519; line-height:1.4;">${st.action}</div>
                </div>
              `).join('')}
            </div>
            <div id="dispatchDisplayBox" style="display:none; text-align:center; padding:12px; background:#fff1f2; border-radius:10px; margin-top:10px;">
              <div id="dispatchBubble" style="font-size:13px; color:#be123c;"></div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>Main Character Gallery 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: MAIN CHARACTER GALLERY -->
        <section class="fam-page-card" data-page="3">
          <div class="fam-memories-card">
            <h2 class="fam-section-title" style="margin-bottom:6px; text-align:center;">📸 "Main Character Energy" Gallery</h2>
            <p class="fam-section-desc" style="text-align:center; margin-bottom:18px;">
              Proof that whenever we are together, the whole world turns into our background set.
            </p>

            <div class="fam-polaroid-gallery">
              ${polaroids.map((p, i) => `
                <div class="fam-polaroid-item" style="transition:transform 0.3s ease;">
                  <div class="fam-polaroid-tape" style="background:rgba(244,114,182,0.4);"></div>
                  <div class="fam-polaroid-img-frame">
                    <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/pretty.jpg'" />
                  </div>
                  <div class="fam-polaroid-label">${p.title || `Vibe #${i+1}`}</div>
                  <div class="fam-polaroid-note">${p.note || ''}</div>
                  <button type="button" class="btn-download-polaroid" title="Save keepsake polaroid" style="margin: 8px auto 2px auto;">
                    📸 Save Keepsake
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Gold Scratch-Off Pass 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: REAL METALLIC GOLD SCRATCH-OFF CARD -->
        <section class="fam-page-card" data-page="4">
          <div class="girl-scratch-card" style="text-align:center;">
            <h2 class="fam-section-title" style="margin-bottom:6px;">🎟️ Secret Soul Sister Pass</h2>
            <p class="fam-section-desc" style="margin-bottom:16px;">
              Scratch off the golden glitter foil with your finger or mouse to unlock your VIP Pass!
            </p>

            <!-- Interactive Scratch Card Canvas Frame -->
            <div style="position:relative; width:280px; height:160px; margin:0 auto 16px; border-radius:14px; overflow:hidden; box-shadow:0 8px 24px rgba(244,114,182,0.3); border:2px solid #f472b6;">
              <!-- Underneath secret prize content -->
              <div style="position:absolute; inset:0; background:radial-gradient(circle, #fff1f2, #ffe4e6); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:14px; box-sizing:border-box;">
                <div style="font-size:28px;">🏆👑💖</div>
                <div style="font-weight:900; font-size:14px; color:#be123c; margin-top:4px;">OFFICIAL SOUL SISTER FOR LIFE</div>
                <div style="font-size:11px; color:#831843; font-weight:700;">UNLIMITED BOBAS • LIFETIME IMMUNITY</div>
              </div>

              <!-- Scratch-off Canvas Foil Top Layer -->
              <canvas id="girlScratchCanvas" width="280" height="160" style="position:absolute; inset:0; width:100%; height:100%; cursor:crosshair; touch-action:none;"></canvas>
            </div>
            
            <div style="font-size:11px; font-weight:700; color:#db2777; text-transform:uppercase;">
              ✦ Rub Finger to Scratch Golden Foil ✦
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Soul Sister Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <div class="fam-letter-preview-card">
            <div class="letter-wax-envelope">
              <div class="letter-stamp-crest">👯‍♀️</div>
              <h3 class="letter-teaser-title">💌 Wax-Sealed Soul Sister Letter</h3>
              <p class="letter-teaser-sub">Sealed with endless gratitude, unhinged laughter, and pure love.</p>
              
              <div class="envelope-seal-trigger" id="girlWaxSeal" style="cursor:pointer; display:inline-block; margin:16px auto;">
                <div class="wax-seal-badge" style="background:#db2777; color:#fff; border:1px solid #fbcfe8; padding:12px 24px; border-radius:30px; font-weight:700; box-shadow:0 4px 14px rgba(219,39,119,0.4); display:flex; align-items:center; gap:8px;">
                  <span>🕯️</span> <span>Break Bestie Wax Seal &amp; Unfold</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Letter Modal Backdrop -->
          <div class="fam-letter-modal-backdrop" id="girlLetterModal">
            <div class="fam-letter-modal-paper" style="background:#fffcf7; color:#1c1216;">
              <button class="btn-close-letter-modal" id="btnCloseGirlLetter">✕</button>
              <div class="modal-letter-header">
                <span class="modal-crest">💖 💅 👯‍♀️</span>
                <h3>To My Soul Sister, My Ride or Die</h3>
              </div>
              <div class="modal-letter-text">
                ${data.letter ? data.letter.replace(/\n/g, '<br>') : `
                  My Dearest Bestie,<br><br>
                  I don't know what I did to deserve a friend like you, but I thank the universe every single day.<br><br>
                  You've seen me at my absolute best and my absolute messiest, and you loved me through all of it without hesitation.<br><br>
                  Thank you for being my constant sanity check, my favorite adventurer, and the one person I can be 100% myself with.<br><br>
                  Here is to a lifetime of late-night boba runs, uncontrolled laughing fits, and conquering the world together.<br><br>
                  I love you endlessly, my soul sister! 💖💅✨
                `}
              </div>
              <div class="modal-letter-footer">
                <span>Your Forever Partner in Crime,</span>
                <strong>${data.senderName || 'Your Ride or Die'} ✍️</strong>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Soul Sister Crown 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE -->
        <section class="fam-page-card" data-page="6">
          <div class="fam-cert-container">
            <div class="fam-cert-border gold-border" style="border-color:#f472b6; background:#fff1f2; color:#831843;">
              <div class="fam-cert-seal">👑</div>
              <div class="fam-cert-kicker" style="color:#db2777;">OFFICIAL SOUL SISTER CONFERMENT</div>
              <h2 class="fam-cert-title" style="color:#be123c;">SOUL SISTER OF THE CENTURY</h2>
              <div class="fam-cert-awarded-to" style="color:#9f1239;">This supreme honor is proudly awarded to:</div>
              <div class="fam-cert-recipient" style="color:#db2777;">${data.recipientName || 'My Bestie'}</div>
              <p class="fam-cert-citation" style="color:#831843;">
                For unmatched hype woman capabilities, superior telepathic communication, unconditional emotional bailout readiness, and being completely irreplaceable.
              </p>
              <div class="fam-cert-signature-row">
                <div class="cert-col">
                  <span class="cert-label" style="color:#be123c;">Status</span>
                  <strong style="color:#db2777;">LIFETIME VIP 💖</strong>
                </div>
                <div class="cert-col">
                  <span class="cert-label" style="color:#be123c;">Certified By</span>
                  <strong style="color:#db2777;">${data.senderName || 'Your Ride or Die'} ✍️</strong>
                </div>
              </div>
            </div>
          </div>

          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnGirlReplay">
              <span>💖 Replay Bestie's Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  // Page Switcher Navigation
  const girlPageTitles = [
    { num: 1, title: "Soul Sister Main Character 💅" },
    { num: 2, title: "Emergency Dispatch Walkie-Talkie 📻" },
    { num: 3, title: "Main Character Energy Gallery 📸" },
    { num: 4, title: "Secret Gold Scratch-Off Pass 🎟️" },
    { num: 5, title: "Wax-Sealed Soul Sister Letter 💌" },
    { num: 6, title: "Soul Sister of the Century 👑" }
  ];

  // Opener Gate Execution
  const girlGate = container.querySelector('#bestieGirlGate');
  if (girlGate) {
    const executeOpenGirlGate = () => {
      if (girlGate.classList.contains('is-open')) return;
      playGirlTone('chime');
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f472b6', '#fbbf24', '#f43f5e', '#ffffff']
      });
      girlGate.classList.add('is-open');
    };
    girlGate.addEventListener('click', executeOpenGirlGate);
  }

  const totalPages = girlPageTitles.length;
  let currentPage = 1;

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

  container.querySelectorAll('.btn-fam-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      playGirlTone('pop');
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      playGirlTone('pop');
      goToPage(prev);
    });
  });
  container.querySelector('#btnGirlReplay')?.addEventListener('click', () => {
    playGirlTone('pop');
    goToPage(1);
  });

  // Initialize background music player
  initMusicPlayer(container.querySelector('#girlBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Bestie Anthems & Pop Magic",
    audioSubtitle: data.audioSubtitle || "SOUL SISTER VIBES",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // =========================================================================
  // 1. ROSE QUARTZ SPARKLE CANVAS (60FPS)
  // =========================================================================
  const canvas = container.querySelector('#bestieGirlCanvas');
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

    const glitters = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.8,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.6,
      alpha: 0.2 + Math.random() * 0.7,
      color: Math.random() > 0.4 ? '#f472b6' : '#fbbf24'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      glitters.forEach(s => {
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
  // 2. PAGE 1: CROWN GLOW
  // =========================================================================
  const crownArena = container.querySelector('#bestieCrownArena');
  const crownIcon = container.querySelector('#bestieCrownIcon');
  const crownCircle = container.querySelector('#crownGlowCircle');

  crownArena?.addEventListener('click', () => {
    playGirlTone('pop');
    if (navigator.vibrate) navigator.vibrate([20, 30, 40]);

    gsap.timeline()
      .to(crownIcon, { scale: 1.5, rotate: 12, duration: 0.3, ease: 'back.out(2)' })
      .to(crownCircle, { scale: 1.35, boxShadow: '0 0 50px rgba(244,114,182,0.7)', duration: 0.35 }, '<')
      .to(crownIcon, { scale: 1.15, rotate: 0, duration: 0.3, ease: 'power2.out' })
      .to(crownCircle, { scale: 1, boxShadow: '0 0 25px rgba(244,114,182,0.3)', duration: 0.3 }, '<');

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.4 },
      colors: ['#f472b6', '#fbbf24', '#e11d48', '#ffffff']
    });
  });

  // =========================================================================
  // GEN-Z RAGE-BAIT: RUNAWAY 3 AM VOICE NOTES BUTTON & MAIN CHARACTER METER
  // =========================================================================
  const btnDeleteVoiceNotes = container.querySelector('#btnDeleteVoiceNotes');
  const btnKeepVoiceNotes = container.querySelector('#btnKeepVoiceNotes');
  const girlRageToast = container.querySelector('#girlRageToast');

  const girlRageQuotes = [
    "Girl really thought 💅💀",
    "DECLINED! Evidence preserved for your wedding roast speech 😂",
    "404: Delete button doesn't exist in our dictionary 🎀",
    "We are taking these voice notes to the grave 🔒",
    "L + Ratio + Zero shame in our sisterhood 💖",
    "Nice try, this drama is permanently archived! ✨"
  ];

  function dodgeVoiceNotesButton() {
    playGirlTone('sparkle');
    const x = (Math.random() - 0.5) * 160;
    const y = (Math.random() - 0.5) * 80;
    gsap.to(btnDeleteVoiceNotes, { x, y, duration: 0.2, ease: 'back.out(2)' });
    const randomQuote = girlRageQuotes[Math.floor(Math.random() * girlRageQuotes.length)];
    if (girlRageToast) girlRageToast.textContent = randomQuote;
    if (navigator.vibrate) navigator.vibrate(20);
  }

  btnDeleteVoiceNotes?.addEventListener('mouseenter', dodgeVoiceNotesButton);
  btnDeleteVoiceNotes?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeVoiceNotesButton();
  });

  btnKeepVoiceNotes?.addEventListener('click', () => {
    playGirlTone('chime');
    if (girlRageToast) girlRageToast.innerHTML = "💅 <strong>CHEF'S KISS!</strong> The sacred archive of unhinged moments remains eternal. ✨👑";
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#f472b6', '#fbbf24', '#e11d48', '#ffffff']
    });
  });

  // Main Character Aura & Delusion Tracker
  let girlAura = 10000000;
  const girlAuraScore = container.querySelector('#girlAuraScore');
  const girlAuraRank = container.querySelector('#girlAuraRank');
  const btnSpillTea = container.querySelector('#btnSpillTea');
  const btnSendEmergencyBoba = container.querySelector('#btnSendEmergencyBoba');

  btnSpillTea?.addEventListener('click', () => {
    girlAura += 50000;
    playGirlTone('sparkle');
    if (girlAuraScore) girlAuraScore.textContent = '+' + girlAura.toLocaleString();
    if (girlAuraRank) girlAuraRank.textContent = "COSMIC SLAYING DIVA 👑✨";
    gsap.fromTo(girlAuraScore, { scale: 1.3, color: '#ec4899' }, { scale: 1, color: '#db2777', duration: 0.3 });
  });

  btnSendEmergencyBoba?.addEventListener('click', () => {
    playGirlTone('chime');
    if (girlRageToast) girlRageToast.innerHTML = "🧋 <strong>BOBA DISPATCHED!</strong> Brown sugar boba & waffle fries on the way. 🧇✨";
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.4 },
      colors: ['#f472b6', '#fbbf24', '#ffffff']
    });
  });

  // =========================================================================
  // 3. PAGE 2: EMERGENCY WALKIE-TALKIE EQUALIZER
  // =========================================================================
  const btnRadio = container.querySelector('#btnRadioPushToTalk');
  const eqBars = container.querySelectorAll('.eq-bar');

  btnRadio?.addEventListener('click', () => {
    playGirlTone('radio');
    if (navigator.vibrate) navigator.vibrate([30, 40]);

    // Animate equalizer bars
    eqBars.forEach((bar, i) => {
      gsap.to(bar, {
        height: 15 + Math.random() * 28,
        duration: 0.15,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.04
      });
    });

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.4 },
      colors: ['#db2777', '#fbbf24', '#ffffff']
    });
  });

  // Emergency Stations Click
  const dispatchBox = container.querySelector('#dispatchDisplayBox');
  const dispatchBubble = container.querySelector('#dispatchBubble');
  container.querySelectorAll('.btn-dispatch-station').forEach(btn => {
    btn.addEventListener('click', () => {
      playGirlTone('radio');
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      const st = emergencyStations[idx];
      dispatchBox.style.display = 'block';
      dispatchBubble.innerHTML = `<strong>${st.icon} ${st.label}:</strong><br />${st.action}`;
      gsap.fromTo(dispatchBox, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.5)' });
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#f472b6', '#fbbf24', '#ffffff']
      });
    });
  });

  // =========================================================================
  // 4. PAGE 4: REAL HTML5 CANVAS GOLD SCRATCH-OFF CARD
  // =========================================================================
  const scratchCanvas = container.querySelector('#girlScratchCanvas');
  if (scratchCanvas) {
    const sCtx = scratchCanvas.getContext('2d');
    const sW = scratchCanvas.width;
    const sH = scratchCanvas.height;

    // Fill with metallic gold glitter gradient
    const grad = sCtx.createLinearGradient(0, 0, sW, sH);
    grad.addColorStop(0, '#d4af37');
    grad.addColorStop(0.3, '#fef08a');
    grad.addColorStop(0.6, '#d4af37');
    grad.addColorStop(1, '#ca8a04');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, sW, sH);

    // Add glitter particles
    sCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    for (let i = 0; i < 40; i++) {
      sCtx.beginPath();
      sCtx.arc(Math.random() * sW, Math.random() * sH, Math.random() * 2 + 1, 0, Math.PI * 2);
      sCtx.fill();
    }

    // Overlay text
    sCtx.fillStyle = '#713f12';
    sCtx.font = 'bold 14px sans-serif';
    sCtx.textAlign = 'center';
    sCtx.fillText('★ SCRATCH WITH FINGER TO UNLOCK ★', sW / 2, sH / 2 + 5);

    let isScratching = false;

    function scratch(e) {
      if (!isScratching) return;
      playGirlTone('scratch');
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const x = (clientX - rect.left) * (scratchCanvas.width / rect.width);
      const y = (clientY - rect.top) * (scratchCanvas.height / rect.height);

      sCtx.globalCompositeOperation = 'destination-out';
      sCtx.beginPath();
      sCtx.arc(x, y, 18, 0, Math.PI * 2);
      sCtx.fill();
    }

    scratchCanvas.addEventListener('pointerdown', (e) => {
      isScratching = true;
      scratchCanvas.setPointerCapture(e.pointerId);
      scratch(e);
    });
    scratchCanvas.addEventListener('pointermove', scratch);
    const stopScratch = () => { isScratching = false; };
    scratchCanvas.addEventListener('pointerup', stopScratch);
    scratchCanvas.addEventListener('pointercancel', stopScratch);
  }

  // Hype Button
  const btnHype = container.querySelector('#btnHypeBestie');
  const hypeFeedback = container.querySelector('#hypeFeedback');
  let hypeLevel = 100;
  btnHype?.addEventListener('click', () => {
    playGirlTone('pop');
    hypeLevel += 100;
    hypeFeedback.innerHTML = `👑 <strong>Bestie Hype Level: ${hypeLevel}%!</strong> Unapologetic main character energy activated. ✨`;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.35 },
      colors: ['#fbbf24', '#f472b6', '#e11d48', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#girlWaxSeal');
  const modal = container.querySelector('#girlLetterModal');
  const closeBtn = container.querySelector('#btnCloseGirlLetter');

  seal?.addEventListener('click', () => {
    playGirlTone('pop');
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f472b6', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  // =========================================================================
  // KEEPSAKE POLAROID DOWNLOAD & CINEMATIC MEDIUM ZOOM
  // =========================================================================
  try {
    mediumZoom(container.querySelectorAll('.fam-polaroid-img-frame img'), {
      background: 'rgba(10, 10, 15, 0.92)',
      margin: 24
    });
  } catch (_) {}

  container.querySelectorAll('.btn-download-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.fam-polaroid-item');
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
        link.download = `bestie-keepsake-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        btn.innerHTML = '✅ Saved to Device!';
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#fbbf24', '#f472b6', '#e11d48', '#ffffff']
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
