// src/viewer/templates/motherTemplate.js - The Sanctuary of Warmth & Eternal Dua (Mother Celebration)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderMotherTemplate(container, data) {
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Her Gentle Smile 🌸", image: "/images/beautiful.jpg", note: "The warmth that heals every wound and lights up our darkest days." },
    { title: "Sacrifices & Love ❤️", image: "/images/always_you.jpg", note: "Giving up your sleep, your peace, and your dreams so ours could take flight." },
    { title: "My Guardian Angel 👑", image: "/images/sunset.jpg", note: "No matter how old I get, in your arms I am always safe." }
  ];

  const maternalDuas = [
    { title: "Dua for Protection 🛡️", text: "May my silent prayers forever be your shield in every storm, lighting your path wherever you wander in this life." },
    { title: "Dua for Joy & Light ✨", text: "May your heart never know sorrow, and may your face always shine with the radiant smile that makes my entire world bright." },
    { title: "Dua for Victory & Dreams 🌟", text: "May every door of goodness and abundance swing wide open for you, and may every dream you strive for be blessed." },
    { title: "Dua for Inner Peace 🕊️", text: "Whenever life feels heavy, remember that my heart is holding you in prayer at every sunrise and every sunset." },
    { title: "The Eternal Maternal Blessing 🤍", text: "Seeing you happy, healthy, and kind is the greatest reward of my life. You will always be my precious blessing." }
  ];

  const comfortRecipes = [
    { icon: "☕", title: "Morning Elaichi Chai", desc: "Brewed fresh with love, curing every worry before the rest of the world even wakes up.", secret: "Secret ingredient: Unconditional patience" },
    { icon: "🍲", title: "Maa's Healing Soup", desc: "The warm bowl brought to your bedside on sick days that no medicine on earth can rival.", secret: "Secret ingredient: A tender forehead touch" },
    { icon: "🫓", title: "Ghee Rotis With Extra Love", desc: "Always counting our plates first, serving seconds before we even ask, never resting until we are full.", secret: "Secret ingredient: Selfless generosity" },
    { icon: "🍪", title: "The Secret Treat Stash", desc: "Mysteriously hidden in the top pantry shelf, saved especially to brighten up gloomy afternoons.", secret: "Secret ingredient: A mother's watchful eye" }
  ];

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="momPlayerSlot"></div>

    <div class="fam-page-viewport mother-viewport">
      <!-- Ambient Golden Petals Canvas -->
      <canvas id="momPetalCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Royal Maternal Hero -->
      <header class="fam-hero-section">
        <div class="fam-badge gold-badge">🌸 TO MY HEAVEN ON EARTH & GUARDIAN ANGEL 👑</div>
        <h1 class="fam-hero-title">${data.heroTitle || 'To My Queen, My Beloved Maa ❤️'}</h1>
        <p class="fam-hero-subtitle">${data.heroSubtitle || 'In your gentle smile lies my entire universe, and in your quiet prayers I find my greatest strength.'}</p>
        
        <div class="mom-quick-actions">
          <button class="btn-fam-action btn-hug-mom" id="btnVirtualHug">
            🤗 Send Warm Hug &amp; Salam to Maa ❤️
          </button>
        </div>
        <div id="hugFeedback" class="fam-feedback-text"></div>
      </header>

      <!-- MODULE 1: The Interactive Living Dua Jar -->
      <section class="fam-section">
        <div class="dua-jar-card">
          <div class="dua-jar-icon-wrap" id="duaJarTrigger" title="Tap to draw a blessing">
            <div class="dua-jar-glow"></div>
            <div class="dua-jar-visual">🫙</div>
            <span class="dua-jar-sparkle-pill">✨ TAP THE JAR ✨</span>
          </div>
          <h2 class="fam-section-title" style="margin-top:14px;">Maa's Living Jar of Duas 🤲🌸</h2>
          <p class="fam-section-sub">Tap the glass jar to draw a personalized handwritten maternal prayer</p>
          
          <div class="dua-scroll-reveal" id="duaScrollReveal" style="display:none;">
            <div class="dua-scroll-paper">
              <span class="dua-scroll-badge" id="duaBadge">DUA OF PROTECTION</span>
              <p class="dua-scroll-text" id="duaText"></p>
              <span class="dua-scroll-footer">— Sealed With Maa's Eternal Love ♡</span>
            </div>
          </div>
          <div class="dua-counter-pill" id="duaCounter">Tap the jar to draw your first blessing (5 Available)</div>
        </div>
      </section>

      <!-- MODULE 2: Recipes of Love (Maa's Culinary Comfort Deck) -->
      <section class="fam-section">
        <h2 class="fam-section-title">🍲 Recipes of Pure Love</h2>
        <p class="fam-section-sub">Comfort foods and silent remedies that healed every heartache</p>

        <div class="superpowers-grid mother-recipe-grid">
          ${comfortRecipes.map((r, i) => `
            <div class="superpower-card mom-comfort-card" data-card="${i}">
              <span class="sp-icon">${r.icon}</span>
              <h3>${r.title}</h3>
              <p>${r.desc}</p>
              <div class="mom-card-secret-tag">${r.secret}</div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 3: Pressed-Flower Polaroid Scrapbook -->
      <section class="fam-section">
        <h2 class="fam-section-title">📸 Cherished Memories With Maa</h2>
        <p class="fam-section-sub">Moments frozen in time, preserved like pressed flowers in my heart</p>

        <div class="fam-polaroid-row">
          ${polaroids.map((p, i) => `
            <div class="fam-polaroid-card mom-polaroid-card" data-i="${i}">
              <div class="pressed-flower-pin">🌸</div>
              <div class="fam-pol-img-wrap">
                <img src="${p.image}" alt="${p.title}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <h4 class="fam-pol-title">${p.title}</h4>
              <p class="fam-pol-note">${p.note || 'Always in my heart'}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- MODULE 4: 3D Wax-Seal Love Letter -->
      <section class="fam-section">
        <h2 class="fam-section-title">💌 A Letter From My Deepest Soul</h2>
        <p class="fam-section-sub">Tap the rose wax seal to unfold words rarely spoken out loud</p>

        <div class="wax-envelope-wrap mom-wax-envelope" id="momEnvelope">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="momFlap"></div>

          <button class="wax-seal-button" id="momWaxSeal" aria-label="Open letter">
            <div class="wax-seal-emblem">
              <span style="font-size:24px;">🌸</span>
            </div>
          </button>
        </div>
      </section>

      <!-- MODULE 5: Official Gold-Foiled Certificate -->
      <section class="fam-section">
        <div class="luxury-award-certificate gold-cert">
          <div class="cert-border-corner tl"></div>
          <div class="cert-border-corner tr"></div>
          <div class="cert-border-corner bl"></div>
          <div class="cert-border-corner br"></div>

          <div class="cert-ribbon">👑 SUPREME IMPERIAL CITATION 👑</div>
          <h2 class="cert-heading">GREATEST MOTHER IN THE UNIVERSE</h2>
          <div class="cert-recipient">SOLEMNLY PRESENTED TO: <strong>${data.recipientName || 'MAA'}</strong></div>
          <p class="cert-body">
            Awarded with infinite love, honor, and gratitude for your boundless warmth, unconditional forgiveness, 
            delicious meals made with care, and for being the most precious sanctuary in our lives.
          </p>
          <div class="cert-stamp">🌟 FOREVER ADORED &amp; CHERISHED 🌟</div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="momLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-card-header">
            <span class="modal-badge-tag">FOR MY BELOVED MAA 💌</span>
            <button class="btn-close-blossom-modal" id="btnCloseMomLetter">✕</button>
          </div>
          <div class="modal-letter-scrollable">
            <h3 class="modal-letter-title">Dearest Maa,</h3>
            <div class="modal-typewriter-text" id="momLetterBody">
              ${(data.letter || `Dearest Maa,\n\nWords fall short whenever I try to express how grateful I am to have you as my mother.\n\nFrom staying awake through feverish nights to celebrating my smallest victories as if they conquered the world — you have given me everything without ever asking for anything in return.\n\nYour prayers are the reason I stand tall today. Your gentle smile is the cure to all my worries. Thank you for your warmth, your boundless patience, and your endless love.\n\nMay Allah bless you with long life, radiant health, peace, and eternal happiness. Happy Celebration, my Queen. I love you endlessly! ❤️`).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize background music player
  initMusicPlayer(container.querySelector('#momPlayerSlot'), {
    audioTitle: data.audioTitle || "Maa's Lullaby & Acoustic Score",
    audioSubtitle: data.audioSubtitle || "SANCTUARY OF PEACE",
    audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
    photoRibbon: [{ url: polaroids[0]?.image || "/images/sunset.jpg" }]
  });

  // Ambient gold-rose petal particle canvas
  const canvas = container.querySelector('#momPetalCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    const petals = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 5 + Math.random() * 8,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.45)' : 'rgba(244, 114, 182, 0.35)'
    }));

    function anim() {
      ctx.clearRect(0, 0, width, height);
      petals.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rot += p.rotSpeed;
        if (p.y > height) { p.y = -10; p.x = Math.random() * width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      requestAnimationFrame(anim);
    }
    anim();
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  }

  // Interactive Living Dua Jar logic
  let currentDuaIdx = 0;
  const jarTrigger = container.querySelector('#duaJarTrigger');
  const duaReveal = container.querySelector('#duaScrollReveal');
  const duaBadge = container.querySelector('#duaBadge');
  const duaText = container.querySelector('#duaText');
  const duaCounter = container.querySelector('#duaCounter');

  jarTrigger?.addEventListener('click', () => {
    const dua = maternalDuas[currentDuaIdx % maternalDuas.length];
    currentDuaIdx++;

    duaBadge.textContent = dua.title;
    duaText.textContent = `“${dua.text}”`;
    duaReveal.style.display = 'block';
    duaReveal.classList.remove('paper-unfold-anim');
    void duaReveal.offsetWidth;
    duaReveal.classList.add('paper-unfold-anim');

    duaCounter.textContent = `Dua #${((currentDuaIdx - 1) % maternalDuas.length) + 1} of ${maternalDuas.length} Drawn ✨ (Tap to draw another)`;

    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#d4af37', '#fef08a', '#f472b6', '#ffffff']
    });
  });

  // Virtual Hug Button
  const btnHug = container.querySelector('#btnVirtualHug');
  const hugFeedback = container.querySelector('#hugFeedback');
  let hugCount = 0;
  btnHug?.addEventListener('click', () => {
    hugCount++;
    hugFeedback.innerHTML = `❤️ <strong>${hugCount} Warm Hug${hugCount > 1 ? 's' : ''} Sent!</strong> May Maa always be enveloped in peace and blessings. ✨`;
    confetti({
      particleCount: 45,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#e11d48', '#d4af37', '#f472b6', '#ffffff']
    });
  });

  // Letter Modal handlers
  const seal = container.querySelector('#momWaxSeal');
  const modal = container.querySelector('#momLetterModal');
  const closeBtn = container.querySelector('#btnCloseMomLetter');

  seal?.addEventListener('click', () => {
    modal?.classList.add('active');
    confetti({
      particleCount: 50,
      spread: 65,
      origin: { y: 0.55 },
      colors: ['#d4af37', '#f472b6', '#ffffff']
    });
  });

  closeBtn?.addEventListener('click', () => modal?.classList.remove('active'));
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}
