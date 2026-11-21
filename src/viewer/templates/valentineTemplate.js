// src/viewer/templates/valentineTemplate.js - Valentine & Proposal Template Viewer

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';

export function renderValentineTemplate(container, data) {
  container.innerHTML = `
    <!-- Top Audio Player -->
    <div id="valPlayerSlot"></div>

    <section class="valentine-hero">
      <div class="val-petal-field" id="valPetalField"></div>
      <div class="section-tag" style="color: #ffd166;">A CONFESSION OF LOVE</div>
      <h1 class="hero-title" style="color: #fff;">${data.heroTitle || 'To The One Who Stole My Heart'}</h1>
      <p class="hero-subtitle" style="color: #ff99c8;">${data.heroSubtitle || 'Every love song makes complete sense now 🌹'}</p>

      <!-- Interactive Wax Seal Envelope -->
      <div class="envelope-container" id="envelopeContainer">
        <div class="envelope-wrap" id="envelopeWrap">
          <div class="envelope-flap"></div>
          <div class="envelope-seal" id="waxSeal">💌<br /><span style="font-size:9px;">TAP TO OPEN</span></div>
          <div class="envelope-letter" id="envelopeLetter">
            <div class="letter-top-tag">DEAR ${data.recipientName || 'SWEETHEART'}</div>
            <p class="letter-text">${data.loveLetter || 'You walked into my life and made everything magical. I cherish every moment with you.'}</p>
            <div class="letter-bottom-sign">With all my love,<br />${data.senderName || 'Your Admirer'} ❤️</div>
          </div>
        </div>
      </div>
      <div class="envelope-hint">👆 Tap the wax seal to read the secret letter!</div>
    </section>

    <!-- The Proposal / Question Section -->
    <section class="proposal-section">
      <div class="proposal-card">
        <div class="proposal-heart-pulse">💖</div>
        <h2 class="proposal-question">${data.proposalQuestion || 'Will You Be My Valentine & Forever? ❤️'}</h2>
        
        <div class="proposal-buttons-wrap">
          <button class="btn-proposal-yes" id="btnProposalYes">
            YES! A Million Times YES! 💍
          </button>
          <button class="btn-proposal-no" id="btnProposalNo">
            No 🙈
          </button>
        </div>

        <div class="proposal-accepted-box" id="proposalAcceptedBox" style="display:none;">
          <h3 style="font-family:'Playfair Display', serif; font-size:28px; color:var(--primary); margin-bottom:10px;">
            SHE SAID YES! 🥂✨
          </h3>
          <p style="font-size:16px; color:#ddd;">
            Here's to us, our endless smiles, inside jokes, and a lifetime of love. You are my forever! ❤️
          </p>
        </div>
      </div>
    </section>
  `;

  // Init Player
  initMusicPlayer(container.querySelector('#valPlayerSlot'), {
    general: {
      audioTitle: data.audioTitle || "Can't Help Falling in Love",
      audioSubtitle: data.audioSubtitle || "VALENTINE SPECIAL",
      audioSrc: data.audioSrc || "/audio/song.mp3"
    },
    photoRibbon: [{ url: "/images/sunset.jpg" }]
  });

  // Falling petals generator
  const petalField = container.querySelector('#valPetalField');
  if (petalField) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "rose-petal";
      p.textContent = Math.random() > 0.5 ? "🌹" : "🌸";
      p.style.left = `${Math.random() * 95}%`;
      p.style.animationDuration = `${7 + Math.random() * 8}s`;
      p.style.animationDelay = `${Math.random() * 8}s`;
      petalField.appendChild(p);
    }
  }

  // Wax seal envelope interaction
  const seal = container.querySelector('#waxSeal');
  const letter = container.querySelector('#envelopeLetter');
  seal?.addEventListener('click', () => {
    letter?.classList.toggle('pulled-out');
    seal.style.display = 'none';
  });

  // Runaway NO button
  const btnNo = container.querySelector('#btnProposalNo');
  const btnYes = container.querySelector('#btnProposalYes');
  const acceptedBox = container.querySelector('#proposalAcceptedBox');

  function dodgeNo() {
    const rx = (Math.random() - 0.5) * 240;
    const ry = (Math.random() - 0.5) * 140;
    btnNo.style.transform = `translate(${rx}px, ${ry}px)`;
  }
  btnNo?.addEventListener('mouseover', dodgeNo);
  btnNo?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    dodgeNo();
  });

  btnYes?.addEventListener('click', () => {
    btnNo.style.display = 'none';
    btnYes.style.display = 'none';
    acceptedBox.style.display = 'block';

    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ff3366', '#ff758f', '#ffd166', '#ffffff']
    });
  });
}
