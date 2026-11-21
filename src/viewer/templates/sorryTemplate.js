// src/viewer/templates/sorryTemplate.js - Sincere Apology & Reconciliation Experience

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderSorryTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="sorryPlayerSlot"></div>

    <div class="sorry-page-viewport">
      <!-- Ambient Sparkle Canvas -->
      <canvas id="sorryCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Main Section -->
      <section class="sorry-hero-wrap">
        <div class="sorry-emoji-display" id="avatarEmoji">🥺</div>
        <h1 class="sorry-hero-title">${data.heroTitle || "I'm Really Sorry"}</h1>
        <p class="sorry-hero-sub">${data.heroSubtitle || "My world feels heavy and empty when we aren't okay 🥺"}</p>

        <!-- Apology Frosted Letter Card -->
        <div class="sorry-glass-card">
          <div class="sorry-card-greeting">Dearest ${data.recipientName || 'My Love'},</div>
          <p class="sorry-card-text">${data.apologyMessage || "I know I made a mistake, and I am genuinely sorry from the bottom of my heart. Your happiness means everything to me."}</p>
          <div class="sorry-card-sign">— Sincerely, ${data.senderName || 'Me'} 🫶</div>
        </div>
      </section>

      <!-- Interactive Mood Check Slider -->
      <section class="sorry-section">
        <div class="sorry-tag">CURRENT MOOD CHECK</div>
        <h2 class="sorry-section-title">How Mad Are You Right Now?</h2>

        <div class="sorry-mood-box">
          <div class="sorry-mood-big-emoji" id="moodEmoji">🥺</div>
          <div class="sorry-mood-status" id="moodStatusText">Listening and softening up a little...</div>
          
          <input 
            type="range" 
            min="1" 
            max="4" 
            value="2" 
            class="sorry-range-input" 
            id="moodSlider" 
          />
          
          <div class="sorry-mood-markers">
            <span>😡 Furious</span>
            <span>😐 Upset</span>
            <span>🥺 Listening</span>
            <span>❤️ Forgiven</span>
          </div>
        </div>
      </section>

      <!-- Sincere Promises -->
      <section class="sorry-section">
        <div class="sorry-tag">MOVING FORWARD TOGETHER</div>
        <h2 class="sorry-section-title">My Promises to You</h2>

        <div class="sorry-promises-list">
          ${(data.promises || [
            "To listen first and understand before reacting.",
            "To never take your patience and love for granted.",
            "To communicate openly with gentleness and honesty."
          ]).map((p, i) => `
            <div class="sorry-promise-item">
              <span class="promise-badge">0${i+1}</span>
              <p class="promise-desc">${p}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Interactive Forgiveness Decision with Runaway NO button -->
      <section class="sorry-section" style="padding-bottom: 70px;">
        <h2 class="sorry-section-title" style="font-size:26px;">Will You Please Forgive Me? 🥺</h2>
        <div class="sorry-decision-area">
          <button class="btn-forgive-yes" id="btnForgiveYes">
            YES, I Forgive You! ❤️
          </button>
          <button class="btn-forgive-no" id="btnForgiveNo">
            No 😠
          </button>
        </div>
        <div class="sorry-success-card" id="forgiveSuccessCard" style="display:none;">
          <div style="font-size:42px; margin-bottom:8px;">🎉🫂💖</div>
          <h3>You Just Made My Universe Shine Again!</h3>
          <p>Thank you for your forgiving heart. I promise to cherish you and love you better every single day!</p>
        </div>
      </section>
    </div>
  `;

  // Init Player
  initMusicPlayer(container.querySelector('#sorryPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Words From My Heart",
      audioSubtitle: data.audioSubtitle || "I'M SO SORRY",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Mood Slider Logic
  const slider = container.querySelector('#moodSlider');
  const moodEmoji = container.querySelector('#moodEmoji');
  const moodStatus = container.querySelector('#moodStatusText');
  const heroEmoji = container.querySelector('#avatarEmoji');

  const moods = {
    1: { emoji: "😡", text: "Extremely Mad! (I completely understand why...)", hero: "😭" },
    2: { emoji: "😐", text: "Still Annoyed (Taking time to process...)", hero: "🥺" },
    3: { emoji: "🥺", text: "Softening up and ready to talk...", hero: "🫶" },
    4: { emoji: "🥰", text: "Ready to forgive and hug it out! ❤️", hero: "💖" }
  };

  slider?.addEventListener('input', (e) => {
    const val = e.target.value;
    const m = moods[val];
    if (moodEmoji) moodEmoji.textContent = m.emoji;
    if (moodStatus) moodStatus.textContent = m.text;
    if (heroEmoji) heroEmoji.textContent = m.hero;
  });

  // Playful Runaway NO button
  const btnNo = container.querySelector('#btnForgiveNo');
  const btnYes = container.querySelector('#btnForgiveYes');
  const successCard = container.querySelector('#forgiveSuccessCard');

  const funnyQuotes = [
    "No 😠",
    "Nice try! 😜",
    "Can't click me! 😂",
    "You know you love me! 🥰",
    "Click YES instead! ❤️",
    "Pleaseee? 🥺"
  ];
  let quoteIdx = 0;

  function dodgeNo() {
    const rx = (Math.random() - 0.5) * 220;
    const ry = (Math.random() - 0.5) * 140;
    btnNo.style.transform = `translate(${rx}px, ${ry}px)`;
    quoteIdx = (quoteIdx + 1) % funnyQuotes.length;
    btnNo.textContent = funnyQuotes[quoteIdx];
  }

  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNo();
  });

  btnYes?.addEventListener('click', () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#748ffc', '#f43f5e', '#ffd166', '#fff']
    });
    btnNo.style.display = 'none';
    btnYes.style.display = 'none';
    if (successCard) successCard.style.display = 'block';
  });
}
