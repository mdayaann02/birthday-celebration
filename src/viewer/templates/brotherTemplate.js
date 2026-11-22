// src/viewer/templates/brotherTemplate.js - Chaos Legend, Gaming Rival & Ride-or-Die (Brother Celebration)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderBrotherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
    { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
    { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
  ];

  const broCodeClauses = [
    { id: 1, title: "Clause 01: The 5th Amendment of Siblings 🤫", rule: "Never, under any circumstance, snitch to parents. What happens between brothers stays between brothers." },
    { id: 2, title: "Clause 02: The 3 AM Ride Protocol 🚗💨", rule: "If you call at 3 AM saying 'pick me up', the only acceptable response is 'Send location, I am outside.'" },
    { id: 3, title: "Clause 03: The Last Slice Duel 🍕", rule: "The final pizza slice or fry must be contested in high-stakes combat or split strictly 50/50." },
    { id: 4, title: "Clause 04: The Lag Defense Act 🎮", rule: "Whenever a match is lost in FIFA, COD, or Valorant, it was 100% caused by server ping or a broken controller." },
    { id: 5, title: "Clause 05: Unconditional World Defense 🛡️", rule: "We reserve exclusive lifetime rights to roast each other, but if anyone in the outside world tries, they get destroyed." }
  ];

  const statMetrics = [
    { label: "Loyalty Level 🛡️", val: "100%", width: "100%" },
    { label: "Roast Resistance 🥊", val: "99.9%", width: "99%" },
    { label: "Gaming Saltiness 🎮", val: "100%", width: "100%" },
    { label: "Borrowing Clothes Without Asking 🧥", val: "95%", width: "95%" },
    { label: "Emergency Bail Readiness ⚡", val: "INFINITE", width: "100%" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="broPlayerSlot"></div>

    <div class="fam-page-viewport brother-viewport">
      <!-- Ambient Amber Ember Particles Canvas -->
      <canvas id="broStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Streetwear/Legend Hero Section -->
      <header class="fam-hero-section">
        <div class="fam-badge amber-badge">🤜🤛 THE LIVING LEGEND &amp; PARTNER IN CHAOS 🔥⚡</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Brother in Chaos, The Legend 🤜🤛🔥'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || "From wrestling over the TV remote to having each other's back through every storm. Brotherhood forever!"}</p>
        
        <div class="bro-quick-actions">
          <button class="btn-fam-action btn-fistbump" id="btnFistBump">
            🤜🤛 FIST BUMP OF BROTHERHOOD! 🔥
          </button>
        </div>
        <div id="fistBumpFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- MODULE 1: The Official Bhai Bro-Code Punchcard -->
      <section class="fam-section">
        <div class="bro-code-punchcard">
          <div class="punchcard-header">
            <span class="punchcard-tag">OFFICIAL SIBLING PACT</span>
            <h2 class="punchcard-title">📜 The Sacred Bhai Bro-Code</h2>
            <p class="punchcard-sub">Tap each clause to stamp it officially enforced and ratify our pact</p>
          </div>

          <div class="punchcard-items-list">
            ${broCodeClauses.map(c => `
              <div class="punchcard-row" data-id="${c.id}">
                <div class="punch-stamp-slot" id="punchSlot_${c.id}" title="Tap to stamp clause">
                  <span class="stamp-icon">⭕</span>
                </div>
                <div class="punch-content-col">
                  <h4 class="punch-item-title">${c.title}</h4>
                  <p class="punch-item-rule">${c.rule}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <div class="punch-counter-pill" id="punchCounter">0 / 5 Clauses Ratified — Tap circles to stamp ✓</div>
        </div>
      </section>

      <!-- MODULE 2: Co-Op Battle & Life Stats -->
      <section class="fam-section">
        <h2 class="fam-section-title">⚡ Player 1 &amp; Player 2 Battle Stats</h2>
        <p class="fam-section-sub">Real metrics of our unstoppable co-op duo</p>

        <div class="bro-stats-card">
          ${statMetrics.map(m => `
            <div class="bro-stat-meter-row">
              <div class="meter-info">
                <span class="meter-label">${m.label}</span>
                <span class="meter-val">${m.val}</span>
              </div>
              <div class="meter-track">
                <div class="meter-fill" style="width: ${m.width};"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: Chaos Adventure Polaroids -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Brotherhood Hall of Fame</h2>
        <p class="fam-section-sub">Evidence that we are the wildest, most chaotic duo in history</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card bro-pol-card" data-i="${i}">
              <div class="bro-hazard-tape">HAZARD // BROTHER</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note || 'Ride or die'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 4: Bro-Fist Wax-Seal Treaty -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 An Honest Word To My Brother</h2>
        <p class="fam-section-sub">Tap the bro-fist wax seal to unlock a message straight from the heart</p>

        <div class="wax-envelope-wrap bro-wax-envelope" id="broEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="broFlap"></div>

          <button class="wax-seal-button" id="broWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem amber-emblem">
              <span style="font-size:24px;">🤜🤛</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Metallic "Certified Legend" Pass -->
      <section class="fam-section">
        <div class="luxury-award-certificate amber-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon amber-ribbon">🔥 RIDE OR DIE OFFICIAL CREDENTIALS 🔥</div>
          <h2 class="cert-heading" style="color:#f59e0b;">CERTIFIED LIVING LEGEND</h2>
          <div class="cert-recipient">OFFICIALLY ISSUED TO: <strong>${data.recipientName || 'MY GUY / BHAI'}</strong></div>
          <p class="cert-body">
            Entitled to lifetime 24/7 wingman backup, emergency bailouts with zero questions asked, 
            exclusive wardrobe raiding immunities, and unconditional brotherly loyalty forever.
          </p>
          <div class="cert-stamp amber-stamp">⚡ BROTHERS FOR LIFE ⚡</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="broLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">BROTHERHOOD DISPATCH 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseBroLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Yo Brother,</h3>
            <div class="modal-typewriter-text" id="broLetterBody">
              ${(data.letter || `Yo Brother,\n\nNo cringe emotional speeches — you already know what it is.\n\nFrom late-night drives with music blasting to gaming marathons and covering for each other at home, there is literally nobody else on this planet I would rather have in my corner.\n\nPeople come and go, but having a brother who stands by you through every win, every mistake, and every wild adventure is the rarest blessing. Thank you for always being genuine, loyal, and real.\n\nWhatever you grind for this year, go take it. I’ve got your back forever.\n\nRide or die for life, my brother! 👊🔥🧿`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#broPlayerSlot'), {
    audioTitle: data.audioTitle || "Brotherhood Anthem & Beat",
    audioSubtitle: data.audioSubtitle || "RIDE OR DIE ⚡",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient warm amber particles canvas
  const canvas = container.querySelector('#broStarCanvas');
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

  // Interactive Punchcard Logic
  let stampedCount = 0;
  const punchCounter = container.querySelector('#punchCounter');
  container.querySelectorAll('.punchcard-row').forEach(row => {
    row.addEventListener('click', () => {
      const id = row.getAttribute('data-id');
      const slot = container.querySelector(`#punchSlot_${id}`);
      if (!row.classList.contains('stamped')) {
        row.classList.add('stamped');
        if (slot) slot.innerHTML = `<span class="stamp-icon stamped-check">✓</span>`;
        stampedCount++;
        punchCounter.textContent = `${stampedCount} / 5 Clauses Ratified ✓ (All Enforced!)`;

        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.4 },
          colors: ['#f59e0b', '#d97706', '#ffffff']
        });
      }
    });
  });

  // Fist Bump Button
  const btnFist = container.querySelector('#btnFistBump');
  const fistFeedback = container.querySelector('#fistBumpFeedback');
  let bumpCount = 0;
  btnFist?.addEventListener('click', () => {
    bumpCount++;
    fistFeedback.innerHTML = `🔥 <strong>${bumpCount} Massive Fist Bump${bumpCount > 1 ? 's' : ''} Exchanged!</strong> Unstoppable brotherhood for life. 🤜🤛`;
    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.35 },
      colors: ['#f59e0b', '#d97706', '#ea580c', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#broWaxSeal');
  const modal = container.querySelector('#broLetterModal');
  const closeBtn = container.querySelector('#btnCloseBroLetter');

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
