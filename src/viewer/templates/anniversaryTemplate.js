// src/viewer/templates/anniversaryTemplate.js - Romantic Anniversary Template Viewer

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderAnniversaryTemplate(container, data) {
  const startDate = new Date(data.anniversaryStartDate || "2023-11-28T00:00").getTime();

  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="anniPlayerSlot"></div>

    <section class="anniversary-hero">
      <div class="anni-bokeh"></div>
      <div class="section-tag" style="color: #f3e5ab;">CELEBRATING OUR LOVE STORY</div>
      <h1 class="hero-title" style="font-size: clamp(34px, 7vw, 64px);">${data.heroTitle || 'Happy Anniversary'}</h1>
      <p class="hero-subtitle" style="color: #ffb3c1;">${data.heroSubtitle || 'Every day with you is my favorite day ❤️'}</p>

      <!-- Live Together Love Counter -->
      <div class="love-counter-box">
        <div class="love-counter-title">TOGETHER FOR</div>
        <div class="love-timer-grid">
          <div class="love-time-card">
            <span class="lt-num" id="ltDays">0</span>
            <span class="lt-label">Days</span>
          </div>
          <div class="love-time-card">
            <span class="lt-num" id="ltHours">0</span>
            <span class="lt-label">Hours</span>
          </div>
          <div class="love-time-card">
            <span class="lt-num" id="ltMins">0</span>
            <span class="lt-label">Minutes</span>
          </div>
          <div class="love-time-card">
            <span class="lt-num" id="ltSecs">0</span>
            <span class="lt-label">Seconds</span>
          </div>
        </div>
        <div class="love-counter-sub">...and falling in love with you more every single second! 💖</div>
      </div>
    </section>

    <!-- Our Journey Milestones -->
    <section class="milestones-section">
      <div class="section-tag" style="text-align:center; color: #d4af37;">CHAPTERS OF US</div>
      <h2 class="section-heading" style="text-align:center;">Our Beautiful Journey</h2>
      
      <div class="milestones-timeline">
        ${(data.milestones || []).map((m, idx) => `
          <div class="milestone-card">
            <div class="milestone-dot"></div>
            <div class="milestone-year">${m.year}</div>
            <p class="milestone-text">${m.text}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Love Vows & Promises -->
    <section class="vows-section">
      <div class="section-tag" style="text-align:center; color: #ff758f;">FROM THE DEPTHS OF MY HEART</div>
      <h2 class="section-heading" style="text-align:center;">My Promises to You</h2>

      <div class="vows-grid">
        ${(data.vows || []).map((vow, i) => `
          <div class="vow-card">
            <div class="vow-heart">💍</div>
            <p class="vow-text">"${vow}"</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Romantic Love Letter -->
    <section class="letter-section">
      <div class="letter-parchment">
        <div class="letter-header">To My Forever, ${data.recipientName || 'My Love'}</div>
        <p class="letter-body">${data.letter || 'Thank you for choosing me every single day. You are my home.'}</p>
        <div class="letter-sign">Forever with you,<br />${data.senderName || 'Yours Truly'} ❤️</div>
        
        <div style="text-align:center; margin-top: 30px;">
          <button class="btn-heart-shower" id="btnHeartShower">
            💖 Send Heart Shower 💖
          </button>
        </div>
      </div>
    </section>
  `;

  // Init Player
  initMusicPlayer(container.querySelector('#anniPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Our Love Symphony",
      audioSubtitle: data.audioSubtitle || "ANNIVERSARY EDITION",
      audioSrc: data.audioSrc || "/audio/song.mp3"
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
    if (elH) elH.textContent = h;
    if (elM) elM.textContent = m;
    if (elS) elS.textContent = s;
  }
  updateLoveTimer();
  setInterval(updateLoveTimer, 1000);

  // Heart shower button
  container.querySelector('#btnHeartShower')?.addEventListener('click', () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.7 },
      colors: ['#ff4d6d', '#ff758f', '#d4af37', '#fff']
    });
  });
}
