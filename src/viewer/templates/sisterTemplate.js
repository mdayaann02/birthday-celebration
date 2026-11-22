// src/viewer/templates/sisterTemplate.js - The Vault of Secrets, Wardrobe Thief & Forever Bestie (Sister Celebration)

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

    <div class="fam-page-viewport sister-viewport">
      <!-- Ambient Terracotta Shimmer Canvas -->
      <canvas id="sisStarCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Warm Terracotta Hero Section -->
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

      <!-- MODULE 1: The Interactive Wardrobe Theft Tracker -->
      <section class="fam-section">
        <div class="wardrobe-theft-card">
          <div class="theft-header">
            <span class="theft-badge">EVIDENCE DOSSIER 🚨</span>
            <h2 class="fam-section-title" style="margin-bottom:4px;">👗 The Wardrobe Theft Tracker</h2>
            <p class="fam-section-sub">Tap stolen items to calculate her penalty fines and log the confessions</p>
          </div>

          <div class="theft-items-grid">
            ${stolenWardrobeItems.map(item => `
              <div class="theft-item-box" data-id="${item.id}">
                <div class="theft-item-icon">${item.icon}</div>
                <h4 class="theft-item-name">${item.item}</h4>
                <p class="theft-item-crime">${item.crime}</p>
                <div class="theft-fine-tag" id="fineTag_${item.id}">${item.fine}</div>
                <button type="button" class="btn-claim-fine" data-id="${item.id}">Claim Fine 💸</button>
              </div>
            `).join('')}
          </div>
          <div class="theft-summary-pill" id="theftSummary">Tap buttons to enforce fines on her stolen loot!</div>
        </div>
      </section>

      <!-- MODULE 2: The 2 AM Gossip Hotline & Secret Code Words -->
      <section class="fam-section">
        <h2 class="fam-section-title">🤫 The 2 AM Gossip Vault &amp; Code Words</h2>
        <p class="fam-section-sub">Unbreakable sisterhood inside jokes and secret protocols</p>

        <div class="superpowers-grid sister-hotline-grid">
          ${gossipHotlineNotes.map((g, i) => `
            <div class="superpower-card sister-gossip-card" data-idx="${i}">
              <div class="gossip-tag-pill">${g.tag}</div>
              <h3>${g.title}</h3>
              <p>${g.text}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: Sisterhood Polaroids & Scrapbook -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Sibling Chaos &amp; Cherished Memories</h2>
        <p class="fam-section-sub">Proof that we are the coolest, most iconic duo in history</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card sister-pol-card" data-i="${i}">
              <div class="sister-tape-tag">SOUL SISTERS ✨</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/pretty.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note || 'Partners in crime'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 4: Blossom Wax-Seal Sisterhood Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter For My Forever Bestie</h2>
        <p class="fam-section-sub">Tap the floral wax seal to unfold words from the bottom of my heart</p>

        <div class="wax-envelope-wrap sis-wax-envelope" id="sisEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="sisFlap"></div>

          <button class="wax-seal-button" id="sisWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem terracotta-emblem">
              <span style="font-size:24px;">💅</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Soul Sister VIP Pass -->
      <section class="fam-section">
        <div class="luxury-award-certificate terracotta-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon terracotta-ribbon">💖 LIFETIME SISTERHOOD CHARTER 💖</div>
          <h2 class="cert-heading" style="color:#f97316;">OFFICIAL SOUL SISTER &amp; QUEEN</h2>
          <div class="cert-recipient">SOLEMNLY BESTOWED UPON: <strong>${data.recipientName || 'MY SISTER'}</strong></div>
          <p class="cert-body">
            Entitled to unlimited 2 AM outfit consultations, lifelong immunity for stolen hoodies, 
            emergency boba deliveries, and an unbreakable bond that outshines the entire universe.
          </p>
          <div class="cert-stamp terracotta-stamp">✨ FOREVER BESTIES ✨</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="sisLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY CRAZY SISTER 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseSisLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Dearest Behna,</h3>
            <div class="modal-typewriter-text" id="sisLetterBody">
              ${(data.letter || `Dearest Behna,\n\nWe fight over the dumbest things, steal each other's clothes, and know exactly which buttons to push to drive each other crazy...\n\nBut truth is, I don’t know what I would do in this world without you. You are my secret keeper, my comedy partner, and the first person I want to text whenever something funny or dramatic happens.\n\nThank you for always having my back, for giving me honest advice even when I don't want to hear it, and for being the sweetest, funniest sister anyone could ask for.\n\nMay this year bring you endless happiness, all the outfits you dream of, and unstoppable success. Happy Celebration! I love you endlessly, my soul sister! 💅💖✨`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#sisPlayerSlot'), {
    audioTitle: data.audioTitle || "Sisterhood Vibes & Acoustic Track",
    audioSubtitle: data.audioSubtitle || "SOUL SISTERS FOREVER 💅",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/pretty.jpg" }]
  });

  // Ambient terracotta sparkle canvas
  const canvas = container.querySelector('#sisStarCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const sparkles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1.5 + Math.random() * 3,
      speedY: 0.4 + Math.random() * 0.8,
      color: Math.random() > 0.5 ? '#f97316' : '#fed7aa'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      sparkles.forEach(s => {
        s.y -= s.speedY;
        if (s.y < 0) { s.y = height; s.x = Math.random() * width; }
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
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

  // Interactive Wardrobe Theft Tracker logic
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
