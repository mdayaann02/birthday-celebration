// src/viewer/templates/sorryTemplate.js - Sincere Apology Template Viewer

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderSorryTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sorryPlayerSlot"></div>

    <section class="sorry-hero">
      <div class="sorry-emoji-avatar" id="avatarEmoji">🥺</div>
      <h1 class="hero-title" style="color: #fff;">${data.heroTitle || "I'm Really Sorry"}</h1>
      <p class="hero-subtitle" style="color: #a5b4fc;">${data.heroSubtitle || "My world feels heavy and empty when we aren't okay 🥺"}</p>

      <!-- Heartfelt Apology Card -->
      <div class="sorry-card">
        <div class="sorry-recipient">Dearest ${data.recipientName || 'My Love'},</div>
        <p class="sorry-message">${data.apologyMessage || "I know I made a mistake, and I am genuinely sorry from the bottom of my heart."}</p>
        <div class="sorry-sign">— Sincerely, ${data.senderName || 'Me'}</div>
      </div>
    </section>

    <!-- Interactive Anger Meter / Mood Slider -->
    <section class="mood-slider-section">
      <div class="section-tag" style="text-align:center; color:#93c5fd;">CURRENT MOOD CHECK</div>
      <h2 class="section-heading" style="text-align:center;">Are You Still Mad at Me?</h2>

      <div class="mood-box">
        <div class="mood-display-emoji" id="moodEmoji">🥺</div>
        <div class="mood-status-text" id="moodStatusText">Softening a little bit...</div>
        
        <input 
          type="range" 
          min="1" 
          max="4" 
          value="2" 
          class="mood-range-input" 
          id="moodSlider" 
        />
        
        <div class="mood-labels">
          <span>😡 Furious</span>
          <span>😐 Annoyed</span>
          <span>🥺 Listening</span>
          <span>❤️ Forgiven</span>
        </div>
      </div>
    </section>

    <!-- Promises & Reasons -->
    <section class="promises-section">
      <div class="section-tag" style="text-align:center; color:#93c5fd;">MOVING FORWARD</div>
      <h2 class="section-heading" style="text-align:center;">My Promises to You</h2>

      <div class="promises-list">
        ${(data.promises || []).map((p, i) => `
          <div class="promise-card">
            <span class="promise-num">0${i+1}.</span>
            <p class="promise-text">${p}</p>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Interactive Forgiveness Decision with Runaway NO button -->
    <section class="forgive-decision-section">
      <h2 class="section-heading" style="text-align:center;">Will You Please Forgive Me? 🥺</h2>
      <div class="forgive-buttons-wrap">
        <button class="btn-forgive-yes" id="btnForgiveYes">
          YES, I Forgive You! ❤️
        </button>
        <button class="btn-forgive-no" id="btnForgiveNo">
          No 😠
        </button>
      </div>
      <div class="forgiveness-success-msg" id="forgiveSuccessMsg" style="display:none;">
        🎉 You just made my entire universe shine again! I promise to make it up to you every day! Thank you so much! ❤️🥺✨
      </div>
    </section>
  `;

  // Init Player
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Words From My Heart",
      audioSubtitle: data.audioSubtitle || "I'M SO SORRY",
      audioSrc: data.audioSrc || "/audio/song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Mood Slider logic
  const slider = container.querySelector('#moodSlider');
  const moodEmoji = container.querySelector('#moodEmoji');
  const moodStatus = container.querySelector('#moodStatusText');
  const heroEmoji = container.querySelector('#avatarEmoji');

  const moods = {
    1: { emoji: "😡", text: "Extremely Mad! (I totally understand why...)", hero: "😭" },
    2: { emoji: "😐", text: "Still annoyed, but willing to hear you out.", hero: "🥺" },
    3: { emoji: "🥺", text: "Heart is softening... feeling the sincere love.", hero: "🫶" },
    4: { emoji: "❤️", text: "Forgiven! Let's hug and be happy again! 🥰", hero: "🥰" }
  };

  slider?.addEventListener('input', (e) => {
    const val = e.target.value;
    const item = moods[val] || moods[2];
    moodEmoji.textContent = item.emoji;
    moodStatus.textContent = item.text;
    heroEmoji.textContent = item.hero;
    if (val === "4") {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    }
  });

  // Runaway NO button logic
  const btnNo = container.querySelector('#btnForgiveNo');
  const btnYes = container.querySelector('#btnForgiveYes');
  const successMsg = container.querySelector('#forgiveSuccessMsg');

  function moveNoButton() {
    const randX = (Math.random() - 0.5) * 220;
    const randY = (Math.random() - 0.5) * 120;
    btnNo.style.transform = `translate(${randX}px, ${randY}px)`;
  }

  btnNo?.addEventListener('mouseover', moveNoButton);
  btnNo?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
  });

  btnYes?.addEventListener('click', () => {
    btnNo.style.display = 'none';
    btnYes.style.transform = 'scale(1.15)';
    btnYes.textContent = 'YOU ARE FORGIVEN! ❤️';
    successMsg.style.display = 'block';

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#a5b4fc', '#ffffff']
    });
  });
}
