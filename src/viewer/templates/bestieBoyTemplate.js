// src/viewer/templates/bestieBoyTemplate.js - The Ride-or-Die Brotherhood Vault (Bro Bestie Experience)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBestieBoyTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : (data.cards || [
    { title: "Late Night Drives 🚗💨", image: "/images/sunset.jpg", note: "Windows down, music blasting, talking about life and making big plans." },
    { title: "Surviving Chaos Since Day One ⚡", image: "/images/always_you.jpg", note: "From terrible ideas that somehow worked to legendary wins." },
    { title: "Epic Gaming Sessions 🎮", image: "/images/dream_girl.jpg", note: "3 AM tournaments, blaming lag, and screaming at the TV screen together." },
    { title: "Brothers By Choice 👑", image: "/images/pretty.jpg", note: "People come and go, but real brothers stay solid through every storm." },
    { title: "To 100 More Years 🍻", image: "/images/queen.jpg", note: "Big money, peace, good health, and unstoppable success. Cheers!" }
  ]);

  const wingmanStats = [
    { label: "Unbreakable Loyalty 🛡️", val: "100%", width: "100%" },
    { label: "Wingman Readiness 🦅", val: "100%", width: "100%" },
    { label: "3 AM Car Playlist Taste 🎵", val: "10/10", width: "100%" },
    { label: "Gaming Co-Op Backup 🎮", val: "INFINITE", width: "100%" },
    { label: "Roasting Without Hesitation 🥊", val: "99.9%", width: "99%" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="boyBestiePlayerSlot"></div>

    <div class="fam-page-viewport bestie-boy-viewport">
      <!-- Ambient Amber Stardust Canvas -->
      <canvas id="bestieBoyCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge amber-badge">👊 RIDE OR DIE, UNBREAKABLE BROTHERHOOD ⚡🔥</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Day One, My Brother 👊⚡'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "No cringe emotional speeches — you already know what it is. I built this legendary website just for you, my guy."}</p>
        
        <div class="bro-quick-actions">
          <button class="btn-fam-action btn-fistbump" id="btnBroVaultFist">
            🤜🤛 PLEDGE UNCONDITIONAL BROTHERHOOD 🔥
          </button>
        </div>
        <div id="broVaultFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- MODULE 1: The Wingman Scorecard & Legend Stats -->
      <section class="fam-section">
        <div class="bro-stats-card bestie-boy-stats">
          <div class="theft-header" style="margin-bottom:14px;">
            <span class="theft-badge" style="background:rgba(245,158,11,0.2); border-color:#f59e0b; color:#fbbf24;">VERIFIED METRICS ⚡</span>
            <h2 class="fam-section-title" style="margin-bottom:4px;">📊 The Wingman Reliability Scorecard</h2>
            <p class="fam-section-sub">Official combat &amp; loyalty stats of our duo</p>
          </div>

          ${wingmanStats.map(m => `
            <div class="bro-stat-meter-row">
              <div class="meter-info">
                <span class="meter-label">${m.label}</span>
                <span class="meter-val" style="color:#fbbf24;">${m.val}</span>
              </div>
              <div class="meter-track">
                <div class="meter-fill" style="width: ${m.width}; background:linear-gradient(90deg, #d97706, #fbbf24);"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 2: Legendary Adventure Polaroids -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Legendary Brotherhood Moments</h2>
        <p class="fam-section-sub">Memories of midnight drives, big wins, and chaotic plans</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card bestie-boy-card" data-i="${i}">
              <div class="bro-hazard-tape">RIDE OR DIE // 4L</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title || p.caption}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title || p.caption || `Memory #${i+1}`}</h4>
              <p class="fam-pol-note">${p.note || 'Unstoppable together'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: The Bro-Code VIP Pass -->
      <section class="fam-section">
        <div class="bestie-scratch-card bestie-boy-pass">
          <h2 class="fam-section-title" style="margin-bottom:6px;">🎟️ Lifetime Wingman Pass</h2>
          <p class="fam-section-sub">Granted for life with permanent privileges</p>

          <div class="scratch-reveal-box" style="border-color:#f59e0b; background:rgba(245,158,11,0.08);">
            <div class="scratch-secret-text" style="color:#fef3c7;">
              ⚡ <strong>LIFETIME BROTHERHOOD IMMUNITIES:</strong><br />
              3 AM Emergency Pickup with Zero Questions Asked, Permanent Passenger Seat DJ Rights, and Unconditional Loyalty for Life! 👊
            </div>
          </div>
        </div>
      </section>

      <!-- MODULE 4: Bro-Fist Wax-Sealed Brotherhood Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 An Honest Word To My Brother</h2>
        <p class="fam-section-sub">Tap the seal to unlock words straight from the heart</p>

        <div class="wax-envelope-wrap bro-wax-envelope" id="boyEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="boyFlap"></div>

          <button class="wax-seal-button" id="boyWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem amber-emblem">
              <span style="font-size:24px;">👊</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Certified Living Legend Citation -->
      <section class="fam-section">
        <div class="luxury-award-certificate amber-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon amber-ribbon">⚡ BROTHERS FOR LIFE // 4L ⚡</div>
          <h2 class="cert-heading" style="color:#f59e0b;">CERTIFIED LIVING LEGEND</h2>
          <div class="cert-recipient">SOLEMNLY BESTOWED UPON: <strong>${data.recipientName || 'MY GUY / BHAI'}</strong></div>
          <p class="cert-body">
            Conferred for always standing solid, never switching up, pushing each other to level up, 
            and being the most genuine, ride-or-die brother anyone could ask for.
          </p>
          <div class="cert-stamp amber-stamp">🔥 UNSTOPPABLE FORCE 🔥</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="boyLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">BROTHERHOOD DISPATCH 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseBoyLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Yo Brother,</h3>
            <div class="modal-typewriter-text" id="boyLetterBody">
              ${(data.letterBody || data.letter || `Happiest Birthday, my brother! 👑🎂\n\nPeople come and go, but having a brother who always has your back through every high and low is the rarest blessing in this world.\n\nFrom late-night drives and gaming grinds to pushing each other to level up in life — thank you for being the most genuine, loyal guy I know.\n\nI pray this year brings you unstoppable success, big money, peace, and everything you are grinding for.\n\nBrothers for life, no matter where life takes us. Ride or die forever! 👊🔥🧿`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#boyBestiePlayerSlot'), {
    audioTitle: data.audioTitle || "Brotherhood Anthem",
    audioSubtitle: data.audioSubtitle || "RIDE OR DIE ⚡",
    audioSrc: data.audioSrc || "/audio/blossom_song.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient amber stardust canvas
  const canvas = container.querySelector('#bestieBoyCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.3 + Math.random() * 0.7,
      color: Math.random() > 0.5 ? '#f59e0b' : '#d97706'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.y -= p.speedY;
        if (p.y < 0) { p.y = height; p.x = Math.random() * width; }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Fist Bump Button
  const btnFist = container.querySelector('#btnBroVaultFist');
  const feedback = container.querySelector('#broVaultFeedback');
  let count = 0;
  btnFist?.addEventListener('click', () => {
    count++;
    feedback.innerHTML = `🔥 <strong>${count} Fist Bump${count > 1 ? 's' : ''} Locked!</strong> Solid for life. 🤜🤛`;
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.35 },
      colors: ['#f59e0b', '#d97706', '#ea580c', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#boyWaxSeal');
  const modal = container.querySelector('#boyLetterModal');
  const closeBtn = container.querySelector('#btnCloseBoyLetter');

  seal?.addEventListener('click', () => {
    modal?.classList.add('active');
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#d97706', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
