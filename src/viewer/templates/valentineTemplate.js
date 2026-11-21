// src/viewer/templates/valentineTemplate.js - Ultra-Aesthetic Valentine & Proposal Confession

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderValentineTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="valPlayerSlot"></div>

    <div class="val-page-viewport">
      <!-- Falling Rose Petals Canvas -->
      <canvas id="valPetalCanvas" class="blossom-bg-canvas"></canvas>

      <!-- Hero Section -->
      <section class="val-hero-wrap">
        <div class="val-tag">A CONFESSION OF LOVE 🌹</div>
        <h1 class="val-hero-title">${data.heroTitle || 'To The One Who Stole My Heart'}</h1>
        <p class="val-hero-sub">${data.heroSubtitle || 'Every love song makes complete sense now that you are in my life ❤️'}</p>

        <!-- 3D Pastel Envelope with Wax Seal -->
        <div class="wax-envelope-wrap" id="valEnvelope" style="margin-top:20px;">
          <div class="envelope-back"></div>
          <div class="envelope-front"></div>
          <div class="envelope-flap" id="valFlap"></div>

          <button class="wax-seal-button" id="valWaxSeal" title="Tap to unseal letter">
            <div class="wax-seal-emblem">
              <span style="font-size:22px;">💌</span>
            </div>
          </button>
        </div>
        <p class="envelope-subtitle" style="margin-top:16px;">👆 Tap the wax seal to read the secret letter!</p>
      </section>

      <!-- Proposal Question Section -->
      <section class="val-proposal-section">
        <div class="val-proposal-card">
          <div class="val-neon-heart">💖</div>
          <h2 class="val-proposal-query">${data.proposalQuestion || 'Will You Be My Valentine & Forever? ❤️'}</h2>
          
          <div class="val-decision-buttons">
            <button class="btn-val-yes" id="btnProposalYes">
              YES! A Million Times YES! 💍
            </button>
            <button class="btn-val-no" id="btnProposalNo">
              No 🙈
            </button>
          </div>

          <div class="val-accepted-banner" id="valAcceptedBanner" style="display:none;">
            <div style="font-size:46px; margin-bottom:8px;">🥂💍✨</div>
            <h3 class="val-accepted-heading">SHE SAID YES!</h3>
            <p class="val-accepted-text">Here is to us, our endless smiles, silly inside jokes, and a lifetime of love. You are my forever! ❤️🌹</p>
          </div>
        </div>
      </section>

      <!-- Letter Modal Backdrop -->
      <div class="blossom-letter-modal-backdrop" id="valLetterModal">
        <div class="blossom-modal-card">
          <div class="modal-corner c-tl">┌</div>
          <div class="modal-corner c-tr">┐</div>
          <div class="modal-corner c-bl">└</div>
          <div class="modal-corner c-br">┘</div>
          
          <button class="modal-close-btn" id="btnCloseValLetter">&times;</button>

          <div class="modal-card-header">
            <h3 class="modal-card-title">My Heart, Just For You ✨</h3>
            <p class="modal-card-sub">To: ${data.recipientName || 'My Dearest'}</p>
          </div>

          <div class="modal-card-body" id="valLetterBody">
            <span id="typedValText"></span><span class="typing-cursor">|</span>
          </div>

          <div class="modal-card-footer">
            <button class="btn-share-story" id="btnValHeartBurst" style="width:100%;">
              💖 Send Love Explosion 💖
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Falling Petals Canvas
  const pCanvas = container.querySelector('#valPetalCanvas');
  if (pCanvas) {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
    const pCtx = pCanvas.getContext('2d');
    const petals = [];
    for (let i = 0; i < 26; i++) {
      petals.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        r: Math.random() * 8 + 4,
        vx: (Math.random() - 0.5) * 1,
        vy: Math.random() * 1.4 + 0.8,
        rot: Math.random() * 360
      });
    }

    function renderPetals() {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (let p of petals) {
        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate((p.rot * Math.PI) / 180);
        pCtx.beginPath();
        pCtx.ellipse(0, 0, p.r, p.r * 1.5, 0, 0, Math.PI * 2);
        pCtx.fillStyle = 'rgba(244, 63, 94, 0.75)';
        pCtx.fill();
        pCtx.restore();

        p.x += p.vx;
        p.y += p.vy;
        p.rot += 1;
        if (p.y > pCanvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * pCanvas.width;
        }
      }
      requestAnimationFrame(renderPetals);
    }
    renderPetals();
  }

  // Init Music Player
  initMusicPlayer(container.querySelector('#valPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Can't Help Falling in Love",
      audioSubtitle: data.audioSubtitle || "VALENTINE SPECIAL",
      audioSrc: data.audioSrc || "/audio/blossom_song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Wax Seal Envelope Unseal Animation
  const waxBtn = container.querySelector('#valWaxSeal');
  const flap = container.querySelector('#valFlap');
  const modal = container.querySelector('#valLetterModal');
  const closeBtn = container.querySelector('#btnCloseValLetter');
  const typedEl = container.querySelector('#typedValText');

  waxBtn?.addEventListener('click', () => {
    waxBtn.classList.add('cracked');
    flap.classList.add('open');

    setTimeout(() => {
      modal.classList.add('show');
      // Typewriter letter
      const text = data.loveLetter || 'You walked into my life so gently, but turned it into the most magical journey. Your smile is my daily dose of peace, and your voice makes everything else fade away. I want to spend all my tomorrows making you smile as bright as you make mine.';
      typedEl.innerHTML = "";
      let idx = 0;
      function type() {
        if (idx < text.length) {
          typedEl.innerHTML += text[idx] === '\n' ? '<br/>' : text[idx];
          idx++;
          setTimeout(type, 28);
        }
      }
      type();
    }, 550);
  });

  closeBtn?.addEventListener('click', () => {
    modal.classList.remove('show');
  });

  // Heart burst button
  container.querySelector('#btnValHeartBurst')?.addEventListener('click', () => {
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.65 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff']
    });
  });

  // Playful dodging NO button
  const btnNo = container.querySelector('#btnProposalNo');
  const btnYes = container.querySelector('#btnProposalYes');
  const acceptedBanner = container.querySelector('#valAcceptedBanner');

  const funnyNoResponses = [
    "No 🙈",
    "Oops, missed! 😜",
    "Try again! 😂",
    "Are you sure? 🥺",
    "Just click YES! 💍",
    "Still can't click! 💖"
  ];
  let noIdx = 0;

  function dodgeNo() {
    const rx = (Math.random() - 0.5) * 240;
    const ry = (Math.random() - 0.5) * 140;
    btnNo.style.transform = `translate(${rx}px, ${ry}px)`;
    noIdx = (noIdx + 1) % funnyNoResponses.length;
    btnNo.textContent = funnyNoResponses[noIdx];
  }

  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNo();
  });

  btnYes?.addEventListener('click', () => {
    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff', '#ec4899']
    });
    btnNo.style.display = 'none';
    btnYes.style.display = 'none';
    if (acceptedBanner) acceptedBanner.style.display = 'block';
  });
}
