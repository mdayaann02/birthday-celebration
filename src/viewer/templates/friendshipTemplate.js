// src/viewer/templates/friendshipTemplate.js - Best Friends Forever Luxury Celebration

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderFriendshipTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="bffPlayerSlot"></div>

    <div class="bff-page-viewport">
      <!-- Ambient Sparkle Canvas -->
      <canvas id="bffCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <section class="bff-hero-wrap">
        <div class="bff-tag">PARTNERS IN CRIME 🏆</div>
        <h1 class="bff-hero-title">${data.heroTitle || 'Cheers to My Best Friend!'}</h1>
        <p class="bff-hero-sub">${data.heroSubtitle || 'To the one who knows all my secrets and loves me anyway! 😂'}</p>

        <!-- Official Luxury Certificate of Awesomeness -->
        <div class="bff-cert-luxury">
          <div class="cert-gold-frame">
            <div class="cert-seal-ribbon">🎖️</div>
            <div class="cert-header-tag">OFFICIAL CERTIFICATE OF DISTINCTION</div>
            <h2 class="cert-main-name">BEST HUMAN BEING ALIVE</h2>
            <div class="cert-sub-text">This prestigious recognition is proudly presented to:</div>
            <div class="cert-recipient-name">${data.recipientName || 'My Bestie'}</div>
            <p class="cert-award-reason">${data.awardReason || 'For exceptional tolerance of my 2 AM drama, unconditional loyalty, unmatched humor, and being an elite gossip partner.'}</p>
            <div class="cert-sign-row">
              <div>
                <span class="cert-sign-label">Date Awarded</span>
                <strong class="cert-sign-val">Today & Forever</strong>
              </div>
              <div>
                <span class="cert-sign-label">Certified By</span>
                <strong class="cert-sign-val">${data.senderName || 'Your Ride or Die'} ✍️</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Silly Memories Hall of Fame -->
      <section class="bff-memories-section">
        <div class="bff-tag">HALL OF FAME</div>
        <h2 class="bff-section-title">Unforgettable Chaos</h2>

        <div class="bff-cards-grid">
          ${(data.sillyMemories || [
            { title: "The 2 AM Phone Calls", text: "When we solve all of the world's problems while laughing until our stomachs hurt." },
            { title: "Unspoken Telepathy", text: "That one look across the room that says everything without saying a single word." },
            { title: "Through Thick and Thin", text: "No matter how chaotic life gets, having you in my corner makes everything okay." }
          ]).map((m, i) => `
            <div class="bff-chaos-card">
              <span class="bff-card-badge">EPISODE 0${i+1}</span>
              <h3 class="bff-card-title">${m.title}</h3>
              <p class="bff-card-desc">${m.text}</p>
            </div>
          `).join('')}
        </div>

        <div style="text-align:center; margin: 40px 0 60px;">
          <button class="btn-bff-toast" id="btnBffToast">
            🥂 Toast to 100 More Years of Friendship! 🥂
          </button>
        </div>
      </section>
    </div>
  `;

  // Sparkles canvas
  const bCanvas = container.querySelector('#bffCanvas');
  if (bCanvas) {
    bCanvas.width = window.innerWidth;
    bCanvas.height = window.innerHeight;
    const bCtx = bCanvas.getContext('2d');
    const stars = [];
    for (let i = 0; i < 25; i++) {
      stars.push({
        x: Math.random() * bCanvas.width,
        y: Math.random() * bCanvas.height,
        r: Math.random() * 4 + 2,
        vy: -(Math.random() * 0.8 + 0.3),
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    function renderStars() {
      bCtx.clearRect(0, 0, bCanvas.width, bCanvas.height);
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
        if (s.y < -10) s.y = bCanvas.height + 10;
      }
      requestAnimationFrame(renderStars);
    }
    renderStars();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#bffPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Memories & Laughter",
      audioSubtitle: data.audioSubtitle || "BESTIE ANTHEM",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Confetti Toast Button
  container.querySelector('#btnBffToast')?.addEventListener('click', () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#2ed573', '#ffa502', '#ff4757', '#ffffff', '#70a1ff']
    });
  });
}
