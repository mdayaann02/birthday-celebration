// src/viewer/templates/anniversaryTemplate.js - Ultra-Aesthetic Romantic Anniversary Celebration

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderAnniversaryTemplate(container, data) {
  const startDate = new Date(data.anniversaryStartDate || "2023-11-28T00:00").getTime();
  const polaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
    { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I realized I never want to watch a sunset with anyone else." },
    { title: "Endless Laughter & Joy 🫶", image: "/images/always_you.jpg", note: "Smiling so much my cheeks hurt. You bring pure sunshine into my days." },
    { title: "Forever & Always 💍", image: "/images/dream_girl.jpg", note: "A lifetime of choosing you, loving you, and growing with you." }
  ];

  container.innerHTML = `
    <!-- Top Audio Player Slot -->
    <div id="anniPlayerSlot"></div>

    <!-- Floating Bokeh & Petal Canvas -->
    <canvas id="anniCanvas" class="blossom-bg-canvas"></canvas>

    <div class="anniversary-page-wrap">
      <!-- Hero Section -->
      <section class="anniversary-hero">
        <div class="anni-badge">✨ CELEBRATING OUR LOVE STORY ✨</div>
        <h1 class="anni-main-title">${data.heroTitle || 'Happy Anniversary'}</h1>
        <p class="anni-sub-title">${data.heroSubtitle || 'Every day with you is my favorite day ❤️'}</p>

        <!-- Live Together Love Counter -->
        <div class="anni-counter-glass">
          <div class="anni-counter-heading">TOGETHER FOR</div>
          <div class="anni-timer-grid">
            <div class="anni-timer-unit">
              <span class="anni-timer-num" id="ltDays">0</span>
              <span class="anni-timer-lbl">Days</span>
            </div>
            <span class="anni-colon">:</span>
            <div class="anni-timer-unit">
              <span class="anni-timer-num" id="ltHours">00</span>
              <span class="anni-timer-lbl">Hours</span>
            </div>
            <span class="anni-colon">:</span>
            <div class="anni-timer-unit">
              <span class="anni-timer-num" id="ltMins">00</span>
              <span class="anni-timer-lbl">Mins</span>
            </div>
            <span class="anni-colon">:</span>
            <div class="anni-timer-unit">
              <span class="anni-timer-num" id="ltSecs">00</span>
              <span class="anni-timer-lbl">Secs</span>
            </div>
          </div>
          <p class="anni-counter-note">...and falling deeper in love with you every single second 💖</p>
        </div>
      </section>

      <!-- Our Journey Timeline -->
      <section class="anni-section">
        <div class="anni-section-tag">CHAPTERS OF US</div>
        <h2 class="anni-section-head">Our Beautiful Journey</h2>
        <div class="anni-timeline">
          ${(data.milestones || []).map((m, idx) => `
            <div class="anni-timeline-item">
              <div class="anni-timeline-node">💍</div>
              <div class="anni-timeline-content">
                <span class="anni-timeline-year">${m.year}</span>
                <p class="anni-timeline-desc">${m.text}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Promises & Vows -->
      <section class="anni-section">
        <div class="anni-section-tag">FROM THE DEPTHS OF MY HEART</div>
        <h2 class="anni-section-head">My Vows to You</h2>
        <div class="anni-vows-grid">
          ${(data.vows || []).map((vow, i) => `
            <div class="anni-vow-card">
              <div class="anni-vow-icon">💌</div>
              <p class="anni-vow-text">"${vow}"</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Anniversary Cherished Moments Polaroid Gallery -->
      <section class="anni-section">
        <div class="anni-section-tag">UNFORGETTABLE MEMORIES</div>
        <h2 class="anni-section-head">Moments of Us 📸</h2>
        <div class="anni-polaroid-gallery">
          ${polaroids.map((p, i) => `
            <div class="anni-polaroid-item">
              <div class="anni-polaroid-frame">
                <img src="${p.image}" alt="${p.title || 'Anniversary Memory'}" onerror="this.src='/images/sunset.jpg'" />
              </div>
              <div class="anni-polaroid-caption">
                <h4 class="anni-pol-title">${p.title || `Memory #${i+1}`}</h4>
                <p class="anni-pol-note">${p.note || p.caption || ''}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Romantic Love Letter with Wax Seal -->
      <section class="anni-section" style="padding-bottom: 70px;">
        <div class="anni-letter-card">
          <div class="anni-letter-header">
            <h3>To My Forever, ${data.recipientName || 'My Love'}</h3>
            <span class="anni-letter-date">Together Forever</span>
          </div>
          <div class="anni-letter-body">
            <p>${data.letter || 'Thank you for choosing me every single day. You are my home, my peace, and my greatest adventure.'}</p>
          </div>
          <div class="anni-letter-sign">
            Forever with all my heart,<br />
            <strong>${data.senderName || 'Yours Truly'} ❤️</strong>
          </div>
          <div style="text-align:center; margin-top:28px;">
            <button class="anni-heart-shower-btn" id="btnHeartShower">
              💖 Send Heart Shower 💖
            </button>
          </div>
        </div>
      </section>
    </div>
  `;

  // Init Floating Bokeh Canvas
  const canvas = container.querySelector('#anniCanvas');
  if (canvas) {
    const cCtx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 5 + 2,
        vy: -(Math.random() * 0.8 + 0.4),
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function draw() {
      cCtx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        cCtx.save();
        cCtx.beginPath();
        cCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cCtx.fillStyle = `rgba(244, 114, 182, ${p.alpha})`;
        cCtx.shadowBlur = 10;
        cCtx.shadowColor = '#f472b6';
        cCtx.fill();
        cCtx.restore();

        p.y += p.vy;
        if (p.y < -10) p.y = canvas.height + 10;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#anniPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Our Love Symphony",
      audioSubtitle: data.audioSubtitle || "ANNIVERSARY EDITION",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Start love counter timer
  const elD = container.querySelector('#ltDays');
  const elH = container.querySelector('#ltHours');
  const elM = container.querySelector('#ltMins');
  const elS = container.querySelector('#ltSecs');

  function updateLoveTimer() {
    const elapsed = Date.now() - startDate;
    const d = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const h = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
    const m = Math.floor((elapsed / 1000 / 60) % 60);
    const s = Math.floor((elapsed / 1000) % 60);

    if (elD) elD.textContent = d;
    if (elH) elH.textContent = h < 10 ? `0${h}` : h;
    if (elM) elM.textContent = m < 10 ? `0${m}` : m;
    if (elS) elS.textContent = s < 10 ? `0${s}` : s;
  }
  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);

  // Heart shower button
  container.querySelector('#btnHeartShower')?.addEventListener('click', () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#d4af37', '#fff', '#fbcfe8']
    });
  });
}
