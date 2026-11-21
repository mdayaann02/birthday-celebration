// src/viewer/templates/friendshipTemplate.js - Best Friends Forever Celebration Viewer

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderFriendshipTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="bffPlayerSlot"></div>

    <section class="bff-hero">
      <div class="section-tag" style="color: #2ed573;">PARTNERS IN CRIME</div>
      <h1 class="hero-title" style="color: #fff;">${data.heroTitle || 'Cheers to My Best Friend!'}</h1>
      <p class="hero-subtitle" style="color: #7bed9f;">${data.heroSubtitle || 'To the one who knows all my secrets and loves me anyway! 😂'}</p>

      <!-- Official Certificate of Awesomeness -->
      <div class="bff-certificate">
        <div class="cert-border">
          <div class="cert-badge">🏆 OFFICIAL CERTIFICATE 🏆</div>
          <h2 class="cert-title">BEST HUMAN BEING ALIVE</h2>
          <div class="cert-presented">This prestigious award is proudly presented to:</div>
          <div class="cert-recipient">${data.recipientName || 'My Bestie'}</div>
          <p class="cert-desc">${data.awardReason || 'For exceptional tolerance of my 2 AM drama, unconditional loyalty, and being an elite gossip partner.'}</p>
          <div class="cert-signature">Certified by: ${data.senderName || 'Your Ride or Die'} ✍️</div>
        </div>
      </div>
    </section>

    <!-- Silly Memories Hall of Fame -->
    <section class="bff-memories-section">
      <div class="section-tag" style="text-align:center; color: #2ed573;">HALL OF FAME</div>
      <h2 class="section-heading" style="text-align:center;">Unforgettable Chaos</h2>

      <div class="bff-memories-grid">
        ${(data.sillyMemories || []).map((m, i) => `
          <div class="bff-memory-card">
            <div class="bff-card-num">#${i+1}</div>
            <h3 class="bff-card-title">${m.title}</h3>
            <p class="bff-card-text">${m.text}</p>
          </div>
        `).join('')}
      </div>

      <div style="text-align:center; margin-top: 40px;">
        <button class="btn-bff-toast" id="btnBffToast">
          🥂 Toast to 100 More Years of Friendship! 🥂
        </button>
      </div>
    </section>
  `;

  // Init Player
  initMusicPlayer(container.querySelector('#bffPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Memories & Laughter",
      audioSubtitle: data.audioSubtitle || "BESTIE ANTHEM",
      audioSrc: data.audioSrc || "/audio/song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Confetti Toast Button
  container.querySelector('#btnBffToast')?.addEventListener('click', () => {
    confetti({
      particleCount: 100,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#2ed573', '#ffa502', '#ff4757', '#ffffff']
    });
  });
}
