// src/viewer/templates/sisterTemplate.js - The Vault of Secrets, Wardrobe Thief & Forever Bestie (Sister Celebration - Page-By-Page)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderSisterTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Partner in Crime 💅", image: "/images/pretty.jpg", note: "From raiding each other's wardrobes to keeping the deepest secrets safe." },
    { title: "Chaos & Blackmail 📸", image: "/images/always_you.jpg", note: "Photos that could ruin each other's reputation, kept as supreme leverage! 😂" },
    { title: "Forever Bestie 💖", image: "/images/beautiful.jpg", note: "No matter how loud our fights get, you are the first person I run to." }
  ];

  const stolenWardrobeItems = [
    { id: 1, icon: "🧥", item: "The Oversized Hoodie", crime: "Stolen 4 months ago under 'just for 5 minutes', permanently assimilated into her wardrobe.", fine: "FINE: Buy 2 Large Bobas" },
    { id: 2, icon: "🕶️", item: "The Designer Sunglasses", crime: "Borrowed for a single aesthetic Instagram story, now lives permanently in her car.", fine: "FINE: 1 Full Outfit Loan" },
    { id: 3, icon: "🧴", item: "The Expensive Perfume", crime: "Said she only sprayed once, yet 40% of the bottle mysteriously disappeared overnight.", fine: "FINE: Free Dessert Treat" },
    { id: 4, icon: "🔌", item: "The Fast Phone Charger", crime: "Vanished from the living room, mysteriously discovered plugged behind her bed.", fine: "FINE: Immediate Return + Snack" }
  ];

  const gossipHotlineNotes = [
    { tag: "CODE RED 🚨", title: "The Parent Alert Signal", text: "One subtle cough or eye-roll across the dinner table that means: 'Shut up right now or we are both busted!'" },
    { tag: "2 AM RANT ☕", title: "Midnight Outfit Approval", text: "Sending 14 blurry mirror selfies at 1:45 AM demanding: 'Which dress makes me look like the main character?'" },
    { tag: "VAULT 🤫", title: "Mutual Blackmail Leverage", text: "A top-secret archive of middle-school photos that guarantees neither of us can ever run for public office." },
    { tag: "SISTER TAX 🍟", title: "The Food Confiscation Act", text: "Any fries, boba, or midnight snacks brought into this house are subject to a mandatory 50% sister tax." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sisPlayerSlot"></div>

    <div class="fam-page-viewport fam-storybook-viewport sister-viewport">
      <!-- Ambient Terracotta Shimmer Canvas -->
      <canvas id="sisStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="fam-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="fam-step-progress-track">
          <div class="fam-step-progress-fill" id="sisStepProgressFill" style="width: 16.6%;"></div>
        </div>
        <div class="fam-stage-indicator-bar">
          <div class="fam-stage-info-pill">
            <span class="stage-step-tag" id="sisStageStepPill">PAGE 1 OF 6</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="sisStageTitleText">Partner in Crime Opening 💅</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="fam-pages-container" id="sisPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="fam-page-card active" data-page="1">
          <header class="fam-hero-section">
            <div class="fam-badge terracotta-badge">💅 PARTNER IN CRIME, WARDROBE THIEF &amp; FOREVER BESTIE 💖✨</div>
            <h1 class="fam-hero-title">${data.heroTitle || 'To My Crazy, Annoying, Irreplaceable Sister 💅✨'}</h1>
            <p class="fam-hero-subtitle">${data.heroSubtitle || "We fight, we steal each other's clothes, we drive each other insane... but no one in this universe has my back like you do!"}</p>
            
            <div class="sis-quick-actions">
              <button class="btn-fam-action btn-sister-tax" id="btnSisterTax">
                🧋 Claim Mandatory Sibling Snack Tax 🍟
              </button>
            </div>
            <div id="sisTaxFeedback" class="fam-feedback-text"></div>
          </header>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-next" data-next="2">
              <span>Wardrobe Theft Tracker 👗</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: WARDROBE THEFT TRACKER -->
        <section class="fam-page-card" data-page="2">
          <div class="wardrobe-theft-card">
            <div class="theft-header">
              <span class="theft-alert-badge">EVIDENCE LOG 🚨</span>
              <h2 class="fam-section-title" style="margin-bottom:4px; text-align:center;">👗 Stolen Wardrobe Evidence Log</h2>
              <p class="fam-section-sub" style="text-align:center;">Items mysteriously missing from my closet, currently residing in hers</p>
            </div>

            <div class="theft-items-grid">
              ${stolenWardrobeItems.map(item => `
                <div class="theft-item-box" data-id="${item.id}">
                  <span class="theft-item-icon">${item.icon}</span>
                  <div class="theft-item-info">
                    <h4>${item.item}</h4>
                    <p class="theft-crime">${item.crime}</p>
                    <span class="theft-fine">${item.fine}</span>
                  </div>
                  <button type="button" class="btn-claim-fine" data-id="${item.id}">Claim Fine 🧋</button>
                </div>
              `).join('')}
            </div>
            <div class="theft-summary-pill" id="theftSummary">Tap 'Claim Fine' on items to collect sibling tax!</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="3">
              <span>2 AM Gossip Hotline ☕</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: GOSSIP HOTLINE -->
        <section class="fam-page-card" data-page="3">
          <h2 class="fam-section-title" style="text-align:center;">☕ The 2 AM Gossip &amp; Code Vault</h2>
          <p class="fam-section-sub" style="text-align:center;">Top-secret sister signals that nobody else in the family understands</p>

          <div class="gossip-cards-grid">
            ${gossipHotlineNotes.map(n => `
              <div class="gossip-signal-card">
                <span class="gossip-tag">${n.tag}</span>
                <h4>${n.title}</h4>
                <p>${n.text}</p>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="4">
              <span>Blackmail Photo Album 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: BLACKMAIL POLAROIDS -->
        <section class="fam-page-card" data-page="4">
          <h2 class="fam-section-title" style="text-align:center;">📸 Top-Secret Sibling Leverage Archive</h2>
          <p class="fam-section-sub" style="text-align:center;">Cute candid moments (and photos kept strictly for blackmail) 😂💅</p>

          <div class="fam-polaroid-row">
            ${polaroids.map((p, i) => `
              <div class="fam-polaroid-card sis-polaroid-card" data-i="${i}">
                <div class="washi-tape-strip">BEHNA</div>
                <div class="fam-pol-img-wrap">
                  <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
                </div>
                <h4 class="fam-pol-title">${p.title}</h4>
                <p class="fam-pol-note">${p.note || 'Partners in crime forever'}</p>
              </div>
            `).join('')}
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="5">
              <span>Read Sister Letter 💌</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: SISTER WAX SEAL LETTER -->
        <section class="fam-page-card" data-page="5">
          <h2 class="fam-section-title" style="text-align:center;">💌 Blossom Wax-Seal Sisterhood Letter</h2>
          <p class="fam-section-sub" style="text-align:center;">Tap the terracotta wax seal to unroll words from your partner-in-crime</p>

          <div class="wax-envelope-wrap sis-wax-envelope" id="sisEnvelope">
            <div class="envelope-back"></div>
            <div class="envelope-front"></div>
            <div class="envelope-flap" id="sisFlap"></div>

            <button class="wax-seal-button" id="sisWaxSeal" aria-label="Open letter">
              <div class="wax-seal-emblem">
                <span style="font-size:24px;">💅</span>
              </div>
            </button>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-fam-next" data-next="6">
              <span>Sister of the Universe Award 👑</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: CERTIFICATE & SHARE -->
        <section class="fam-page-card" data-page="6">
          <div class="luxury-award-certificate gold-cert">
            <div class="cert-border-corner tl"></div>
            <div class="cert-border-corner tr"></div>
            <div class="cert-border-corner bl"></div>
            <div class="cert-border-corner br"></div>

            <div class="cert-ribbon">👑 OFFICIAL PROCLAMATION 👑</div>
            <h2 class="cert-heading">BEST SISTER IN THE UNIVERSE</h2>
            <div class="cert-recipient">SOLEMNLY PRESENTED TO: <strong>${data.recipientName || 'BEHNA'}</strong></div>
            <p class="cert-body">
              Awarded for unmatched drama, master-level wardrobe theft, 2 AM gossip loyalty, 
              and for being the sweetest, most irreplaceable sister in the entire world.
            </p>
            <div class="cert-stamp">💖 FOREVER MY SISTER 💖</div>
          </div>
          <div class="fam-nav-dock">
            <button type="button" class="btn-fam-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-fam-replay" id="btnSisReplay">
              <span>💅 Replay Celebration ↺</span>
            </button>
          </div>
        </section>
      </main>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="sisLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY DEAREST SISTER 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseSisLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Dear Behna,</h3>
            <div class="modal-typewriter-text" id="sisLetterBody">
              ${(data.letter || `Dear Behna,\n\nEven though you steal my hoodies, use my expensive perfumes, and blame me for everything in front of parents — life without you would be so boring.\n\nThank you for being my 2 AM therapist, my secret keeper, and the only person who understands all my unhinged moods. No matter how much we argue, you are the first person I run to whenever life gets crazy.\n\nKeep shining, keep being dramatic, and remember I will always have your back no matter what.\n\nLove you endlessly! 💅💖✨`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Page switcher engine
  const sisPageTitles = [
    { num: 1, title: "Partner in Crime Opening 💅" },
    { num: 2, title: "Wardrobe Theft Tracker 👗" },
    { num: 3, title: "2 AM Gossip Hotline ☕" },
    { num: 4, title: "Blackmail Photo Album 📸" },
    { num: 5, title: "Blossom Wax-Seal Letter 💌" },
    { num: 6, title: "Best Sister in the Universe 👑" }
  ];

  const totalPages = sisPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#sisStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#sisStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#sisStageTitleText');
    if (titleText && sisPageTitles[currentPage - 1]) {
      titleText.textContent = sisPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.fam-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-fam-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-fam-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });
  container.querySelector('#btnSisReplay')?.addEventListener('click', () => goToPage(1));

  // Initialize background music player
  initMusicPlayer(container.querySelector('#sisPlayerSlot'), {
    audioTitle: data.audioTitle || "Sisterhood Anthems & Pop Acoustic",
    audioSubtitle: data.audioSubtitle || "SOUL SISTERS FOREVER",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient terracotta shimmer canvas
  const canvas = container.querySelector('#sisStarCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2.5,
      speedY: 0.3 + Math.random() * 0.7,
      alpha: 0.2 + Math.random() * 0.7,
      color: '#f97316'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach(s => {
        s.y -= s.speedY;
        if (s.y < 0) { s.y = height; s.x = Math.random() * width; }
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Interactive Wardrobe Theft Tracker
  let finesClaimed = 0;
  const theftSummary = container.querySelector('#theftSummary');
  container.querySelectorAll('.btn-claim-fine').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      const box = container.querySelector(`.theft-item-box[data-id="${id}"]`);
      if (!btn.disabled) {
        btn.disabled = true;
        btn.textContent = "FINE COLLECTED ✓";
        btn.style.background = "#22c55e";
        btn.style.color = "#fff";
        box?.classList.add('fine-paid');
        finesClaimed++;
        theftSummary.textContent = `🎉 ${finesClaimed} / 4 Fines Enforced! Sister debt is being settled! 🧋`;

        confetti({
          particleCount: 30,
          spread: 55,
          origin: { y: 0.4 },
          colors: ['#f97316', '#fed7aa', '#ffffff']
        });
      }
    });
  });

  // Sister Tax Button
  const btnTax = container.querySelector('#btnSisterTax');
  const taxFeedback = container.querySelector('#sisTaxFeedback');
  let taxCount = 0;
  btnTax?.addEventListener('click', () => {
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
}
