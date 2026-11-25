// src/viewer/templates/museumTemplate.js - The 3D Interactive Virtual Art Museum
// Inspired by Giftvera's "Our Museum" (giftvera.com/product/our-museum)
// Features:
// 1. Full 3D Gallery: Architectural halls, polished wood parquet floor, spotlights, moldings.
// 2. Entrance Dedication Plaque: Metallic brushed brass plaque with engraved typography.
// 3. Framed Artworks: 3D beveled gold/wood frames with dynamic photos, brass placards, and spotlights.
// 4. Centerpiece Cinema Chamber: Grand projection screen, gallery leather bench, and romantic lighting.
// 5. Interactive Proposal / Question: Screen dims lights, asks the big question with heart confetti cascade!
// 6. Dual Navigation: Automated Cinematic Guided Tour mode + Free Walk FPS mode (joystick on mobile, WASD on desktop).
// 7. Tactile Audio Synthesizer: Footstep sounds, spotlight chimes, celebration fanfare, and soundtrack.

import * as THREE from 'three';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { soundFx } from '../audioSynth.js';
import { create3DAvatar } from './museumAvatar.js';
import { MuseumMultiplayer } from './museumMultiplayer.js';

// Procedural Canvas Texture Generator for French Herringbone / Parquet Wood Floor
function createParquetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm oak museum floor base
  ctx.fillStyle = '#2b1d14';
  ctx.fillRect(0, 0, 1024, 1024);

  const tileW = 64;
  const tileH = 16;
  const rows = Math.ceil(1024 / tileH);
  const cols = Math.ceil(1024 / tileW);

  // Parquet wood slats with subtle tonal variations
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isAlt = (r + c) % 2 === 0;
      const x = c * tileW;
      const y = r * tileH;
      const toneVariance = Math.floor((Math.sin(r * 12.3 + c * 33.7) * 0.5 + 0.5) * 35);
      const rVal = 44 + toneVariance;
      const gVal = 28 + Math.floor(toneVariance * 0.7);
      const bVal = 18 + Math.floor(toneVariance * 0.5);

      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
      ctx.fillRect(x, y, tileW - 1, tileH - 1);

      // Wood grain lines
      ctx.strokeStyle = `rgba(15, 10, 5, 0.35)`;
      ctx.lineWidth = 1;
      for (let g = 0; g < 3; g++) {
        const lineY = y + 3 + g * 4;
        ctx.beginPath();
        ctx.moveTo(x, lineY);
        ctx.lineTo(x + tileW, lineY);
        ctx.stroke();
      }
    }
  }

  // Soft museum gallery polish sheen
  const grad = ctx.createRadialGradient(512, 512, 100, 512, 512, 700);
  grad.addColorStop(0, 'rgba(255, 235, 205, 0.08)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.25)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 30);
  return texture;
}

// Procedural Canvas Texture for Entrance Brass Plaque
function createPlaqueTexture(title, subtitle, dedication, sender, date) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');

  // Brushed gold / brass gradient background
  const grad = ctx.createLinearGradient(0, 0, 1024, 768);
  grad.addColorStop(0, '#e8cf96');
  grad.addColorStop(0.25, '#d4b368');
  grad.addColorStop(0.5, '#edd9a8');
  grad.addColorStop(0.75, '#b89445');
  grad.addColorStop(1, '#dfc480');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 768);

  // Brushed metal fine streaks
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 768; i += 2) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(1024, i);
    ctx.stroke();
  }

  // Border engravings
  ctx.strokeStyle = '#634b18';
  ctx.lineWidth = 10;
  ctx.strokeRect(28, 28, 1024 - 56, 768 - 56);

  ctx.strokeStyle = '#fbf0d0';
  ctx.lineWidth = 3;
  ctx.strokeRect(38, 38, 1024 - 76, 768 - 76);

  ctx.strokeStyle = '#7c5f22';
  ctx.lineWidth = 2;
  ctx.strokeRect(46, 46, 1024 - 92, 768 - 92);

  // Brass bolts in corners
  const boltRadius = 14;
  const boltOffsets = [
    [54, 54],
    [1024 - 54, 54],
    [54, 768 - 54],
    [1024 - 54, 768 - 54]
  ];
  boltOffsets.forEach(([bx, by]) => {
    ctx.fillStyle = '#4a370e';
    ctx.beginPath();
    ctx.arc(bx, by, boltRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffd97d';
    ctx.beginPath();
    ctx.arc(bx - 3, by - 3, boltRadius * 0.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#2d2107';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(bx - 8, by);
    ctx.lineTo(bx + 8, by);
    ctx.stroke();
  });

  // Typography
  ctx.textAlign = 'center';

  // Monogram / emblem
  ctx.fillStyle = '#4a350e';
  ctx.font = 'bold 36px "Cinzel", "Times New Roman", serif';
  ctx.fillText('🏛️', 512, 130);

  // Top Museum Header
  ctx.font = 'bold 30px "Cinzel", "Times New Roman", serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('GALLERIA D’AMORE', 512, 180);

  // Decorative divider
  ctx.strokeStyle = '#7c5f22';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(350, 205);
  ctx.lineTo(674, 205);
  ctx.stroke();

  // Museum Title
  ctx.fillStyle = '#2d2007';
  ctx.font = 'bold 50px "Cinzel", "Georgia", serif';
  ctx.fillText((title || 'THE MUSEUM OF US').toUpperCase(), 512, 275);

  // Subtitle
  ctx.fillStyle = '#614815';
  ctx.font = 'italic 26px "Playfair Display", "Georgia", serif';
  ctx.fillText(subtitle || 'Dedicated to My One & Only', 512, 325);

  // Dedication Body Text (word wrapped)
  ctx.fillStyle = '#3a2b0c';
  ctx.font = '24px "Playfair Display", "Georgia", serif';
  const text = dedication || 'A curated exhibition of our smiles, cherished memories, and an eternal love that words could never hold.';
  const words = text.split(' ');
  let line = '';
  let lineY = 405;
  const maxW = 820;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxW && n > 0) {
      ctx.fillText(line, 512, lineY);
      line = words[n] + ' ';
      lineY += 40;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 512, lineY);

  // Bottom Curator & Date
  ctx.fillStyle = '#5c4314';
  ctx.font = 'bold 22px "Cinzel", "Georgia", serif';
  ctx.fillText(`Curated with Endless Love by ${sender || 'Yours Always'}`, 512, 650);

  ctx.font = 'italic 20px "Cinzel", "Times New Roman", serif';
  ctx.fillText(date || 'Permanent Collection • Forever & Always', 512, 690);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Procedural Canvas Texture for Individual Artwork Brass Placard
function createPlacardTexture(index, title, date) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 512, 160);
  grad.addColorStop(0, '#e5ce95');
  grad.addColorStop(0.5, '#f5e3ba');
  grad.addColorStop(1, '#cdae68');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = '#6b501a';
  ctx.lineWidth = 5;
  ctx.strokeRect(8, 8, 512 - 16, 160 - 16);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#6b501a';
  ctx.font = 'bold 15px "Cinzel", serif';
  ctx.fillText(`EXHIBIT NO. ${String(index + 1).padStart(2, '0')}`, 256, 42);

  ctx.fillStyle = '#2b1b05';
  ctx.font = 'bold 24px "Cinzel", "Georgia", serif';
  const displayTitle = title.length > 28 ? title.slice(0, 27) + '…' : title;
  ctx.fillText(displayTitle, 256, 85);

  ctx.fillStyle = '#5a4214';
  ctx.font = 'italic 16px "Playfair Display", serif';
  ctx.fillText(date || 'Curated Moment', 256, 122);

  return new THREE.CanvasTexture(canvas);
}

// Procedural Wall Plaster / Paint texture with micro-grain
function createWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f6f3ed';
  ctx.fillRect(0, 0, 512, 512);

  const imgData = ctx.getImageData(0, 0, 512, 512);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const grain = (Math.random() - 0.5) * 12;
    d[i] = Math.min(255, Math.max(0, d[i] + grain));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + grain));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 4);
  return texture;
}

export function renderMuseumTemplate(container, data, isMakerReview = false) {
  // Extract and sanitize template data
  const recipientName = data.recipientName || 'My Love';
  const senderName = data.senderName || 'Yours Always';
  const museumTitle = data.museumTitle || 'The Museum of Us';
  const museumSubtitle = data.museumSubtitle || `Dedicated to ${recipientName}`;
  const museumDedication = data.museumDedication || 'A curated exhibition of our smiles, quiet nights, and an eternal love that words could never hold.';
  const establishmentDate = data.establishmentDate || 'Est. November 2026';
  const centerpieceTitle = data.centerpieceTitle || 'The Masterpiece of My Heart';
  const centerpieceImage = data.centerpieceImage || '/images/queen.jpg';
  const proposalQuestion = data.proposalQuestion || 'Will you walk through every chapter of life with me?';
  const proposalSubtitle = data.proposalSubtitle || 'Every single day with you is my greatest adventure. Will you be mine forever?';
  const proposalYesBtn = data.proposalYesBtn || 'Yes, Forever & Always! 💍💖';
  const proposalCelebrateTitle = data.proposalCelebrateTitle || 'She Said Yes! 💍✨';
  const proposalCelebrateMsg = data.proposalCelebrateMsg || 'From this moment until eternity, my heart is completely yours. Welcome to our forever.';

  // Gather artworks from data.photos, data.polaroids, or fallbacks
  let artworks = [];
  if (Array.isArray(data.photos) && data.photos.length > 0) {
    artworks = data.photos;
  } else if (Array.isArray(data.polaroids) && data.polaroids.length > 0) {
    artworks = data.polaroids.map((p, idx) => ({
      id: idx + 1,
      image: p.image,
      title: p.caption || p.title || `Memory #${idx + 1}`,
      date: p.date || 'Sweet Moment',
      desc: p.note || 'A memory forever etched in gold upon the walls of my heart.'
    }));
  } else {
    artworks = [
      { id: 1, image: '/images/sunset.jpg', title: 'The Golden Spark', date: 'The Day We Met', desc: 'The exact moment our paths crossed. The light hit your eyes just right, and suddenly every ordinary thing became magical.' },
      { id: 2, image: '/images/always_you.jpg', title: 'Unstoppable Laughter', date: 'Summer Afternoon', desc: 'Laughing until our stomachs ached over silly inside jokes that nobody else would ever understand.' },
      { id: 3, image: '/images/pretty.jpg', title: 'Quiet Sanctuary', date: 'Late Night Talks', desc: 'Sitting under the city lights, talking about childhood dreams and future hopes until 3 AM.' },
      { id: 4, image: '/images/dream_girl.jpg', title: 'Breathtaking Grace', date: 'An Unforgettable Evening', desc: 'In a room full of people, my eyes only ever search for you. You take my breath away every day.' },
      { id: 5, image: '/images/vogue_cover.jpg', title: 'High Fashion & Adventure', date: 'Our Roadtrip', desc: 'Singing along at the top of our lungs with the windows down. Anywhere with you is paradise.' },
      { id: 6, image: '/images/queen.jpg', title: 'My Eternal Muse', date: 'Forever & Always', desc: 'You are not just a chapter in my story — you are the entire book. My muse, my best friend, and my whole heart.' }
    ];
  }

  // HTML Structure for Museum: 3D Viewport + HUD + Guided Tour Dock + Modals
  container.innerHTML = `
    <div class="museum-app-viewport" id="museumViewport">
      <!-- 3D WebGL Canvas Container -->
      <div id="threeMuseumCanvas" class="three-museum-canvas"></div>

      <!-- Museum Top Status Header -->
      <header class="museum-top-header" id="museumHeader">
        <div class="museum-brand">
          <span class="museum-monogram">🏛️</span>
          <div class="museum-brand-text">
            <h1 class="museum-brand-title">${museumTitle}</h1>
            <span class="museum-brand-sub">${museumSubtitle}</span>
          </div>
        </div>

        <div class="museum-top-controls">
          <button type="button" class="btn-museum-mode active" id="btnTourMode" title="Cinematic Guided Tour">
            <span class="mode-icon">🧭</span>
            <span class="mode-label">Guided Tour</span>
          </button>
          <button type="button" class="btn-museum-mode" id="btnWalkMode" title="Free Walkthrough Exploration">
            <span class="mode-icon">🚶</span>
            <span class="mode-label">Free Walk</span>
          </button>
          <button type="button" class="btn-museum-icon" id="btnFullscreenToggle" title="Toggle Fullscreen (Landscape)">
            <span id="fullscreenIcon">⛶</span>
          </button>
          <button type="button" class="btn-museum-icon" id="btnAudioToggle" title="Toggle Museum Soundtrack">
            <span id="audioIcon">🎵</span>
          </button>
        </div>
      </header>

      <!-- Visitor Onboarding Modal (Avatar & Name Selection) -->
      <div class="museum-visitor-modal" id="visitorModal">
        <div class="visitor-modal-backdrop"></div>
        <div class="visitor-modal-card">
          <div class="visitor-gold-crest">🏛️ ✨</div>
          <span class="visitor-eyebrow">THE 3D VIRTUAL GALLERY</span>
          <h2 class="visitor-modal-title">Enter Our Museum</h2>
          <p class="visitor-modal-sub">
            Dedicated to <strong>${recipientName}</strong>. Choose your avatar to step inside the 3D gallery together in third-person view.
          </p>

          <div class="visitor-form-group">
            <label class="visitor-field-label" for="visitorNameInput">Your Name</label>
            <div class="visitor-input-wrap">
              <span class="visitor-input-icon">👤</span>
              <input type="text" id="visitorNameInput" class="visitor-name-input" placeholder="Enter your name..." value="${recipientName}" maxlength="20" />
            </div>
          </div>

          <div class="visitor-gender-selector">
            <label class="visitor-field-label">Choose Avatar Attire</label>
            <div class="gender-cards-grid">
              <div class="gender-card male active" id="genderCardMale" data-gender="male">
                <div class="gender-card-badge">👦 GENTLEMAN</div>
                <div class="gender-card-preview blue">
                  <div class="gender-avatar-icon">🤵</div>
                  <span class="suit-swatch blue"></span>
                </div>
                <h4 class="gender-card-title">Royal Blue Suit</h4>
                <p class="gender-card-sub">Blue suit & bowtie</p>
                <div class="gender-radio-ring"><span class="ring-dot"></span></div>
              </div>

              <div class="gender-card female" id="genderCardFemale" data-gender="female">
                <div class="gender-card-badge">👧 LADY</div>
                <div class="gender-card-preview pink">
                  <div class="gender-avatar-icon">👗</div>
                  <span class="suit-swatch pink"></span>
                </div>
                <h4 class="gender-card-title">Rose Pink Gown</h4>
                <p class="gender-card-sub">Pink designer dress</p>
                <div class="gender-radio-ring"><span class="ring-dot"></span></div>
              </div>
            </div>
          </div>

          <div class="visitor-multiplayer-hint">
            <span class="live-dot"></span>
            <span>Real-time multiplayer active • Share link to meet inside!</span>
          </div>

          <button type="button" class="btn-enter-museum" id="btnEnterMuseum">
            <span>Step Inside Gallery 🏛️✨</span>
          </button>
        </div>
      </div>

      <!-- Landscape & Fullscreen Orientation Prompt Overlay -->
      <div class="museum-rotate-overlay" id="museumRotateOverlay" style="display:none;">
        <div class="rotate-backdrop"></div>
        <div class="rotate-card">
          <div class="rotate-phone-anim">
            <div class="phone-device">
              <div class="phone-notch"></div>
              <div class="phone-screen">🏛️</div>
            </div>
            <div class="rotate-arrow">↻</div>
          </div>
          <span class="rotate-badge">CINEMATIC WIDESCREEN EXPERIENCE</span>
          <h2 class="rotate-title">Please Rotate Your Device</h2>
          <p class="rotate-sub">
            <strong>${museumTitle}</strong> is built to be experienced in landscape mode. Rotate your phone horizontally and go fullscreen for the true 3D walk.
          </p>
          <div class="rotate-action-col">
            <button type="button" class="btn-rotate-fullscreen" id="btnRotateFullscreen">
              <span>⛶ Go Fullscreen & Rotate</span>
            </button>
            <button type="button" class="btn-rotate-dismiss" id="btnRotateDismiss">
              <span>Continue in portrait anyway</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Atmospheric Museum Sound & Audio Player Mount -->
      <div id="museumMusicPlayerMount" style="display:none;"></div>

      <!-- Touch Controls for Mobile Free-Walk -->
      <div class="museum-mobile-controls" id="museumMobileControls" style="display:none;">
        <div class="virtual-joystick-zone" id="joystickZone">
          <div class="virtual-joystick-base" id="joystickBase">
            <div class="virtual-joystick-stick" id="joystickStick"></div>
          </div>
        </div>
        <div class="mobile-look-hint">
          <span>👆 Drag screen to look around • Tap paintings to inspect</span>
        </div>
      </div>

      <!-- Desktop Walk Hints -->
      <div class="museum-desktop-hint" id="desktopHint" style="display:none;">
        <div class="hint-pill">
          <span>⌨️ <strong>WASD / Arrow Keys</strong> to Walk</span>
          <span class="hint-dot">•</span>
          <span>🖱️ <strong>Click & Drag</strong> to Look</span>
          <span class="hint-dot">•</span>
          <span>🔍 <strong>Click Artwork</strong> to Inspect</span>
        </div>
      </div>

      <!-- Guided Tour Bottom Dock -->
      <div class="museum-tour-dock" id="museumTourDock">
        <div class="tour-dock-inner">
          <button type="button" class="btn-tour-nav" id="btnPrevArtwork" title="Previous Exhibit">
            <span>❮</span>
          </button>
          
          <button type="button" class="btn-tour-play" id="btnPlayPauseTour" title="Pause / Resume Tour">
            <span id="tourPlayIcon">⏸</span>
          </button>
          
          <button type="button" class="btn-tour-nav" id="btnNextArtwork" title="Next Exhibit">
            <span>❯</span>
          </button>

          <div class="tour-caption-box" id="tourCaptionBox">
            <span class="tour-step-badge" id="tourStepBadge">ENTRANCE</span>
            <h3 class="tour-caption-title" id="tourCaptionTitle">${museumTitle}</h3>
            <p class="tour-caption-sub" id="tourCaptionSub">Begin your journey through the halls of our love.</p>
          </div>

          <button type="button" class="btn-tour-centerpiece" id="btnJumpCenterpiece" title="Jump to Grand Centerpiece">
            <span>🎬 The Centerpiece</span>
          </button>
        </div>
      </div>

      <!-- Interactive Walk Prompts (Bench & Nearby Artworks) -->
      <div class="museum-walk-prompts" id="museumWalkPrompts">
        <div class="museum-bench-prompt" id="benchPrompt" style="display:none;">
          <button type="button" class="btn-sit-bench" id="btnSitBench" title="Take a seat on the gallery bench">
            <span class="sit-icon">🛋️</span>
            <span class="sit-label">Take a Seat on the Gallery Bench</span>
          </button>
        </div>
        <div class="museum-stand-prompt" id="standPrompt" style="display:none;">
          <button type="button" class="btn-stand-bench" id="btnStandBench" title="Stand up and continue walking">
            <span class="stand-icon">🚶</span>
            <span>Stand Up & Explore</span>
          </button>
          <button type="button" class="btn-open-proposal-bench" id="btnOpenProposalBench" title="Read The Masterpiece Proposal">
            <span>💍 The Proposal</span>
          </button>
        </div>
        <div class="museum-art-prompt-badge" id="artPromptBadge" style="display:none;">
          <span>🔍 Tap artwork to inspect</span>
        </div>
      </div>

      <!-- Multiplayer Interaction Dock (Bottom Floating Bar) -->
      <div class="museum-multiplayer-dock" id="multiplayerDock" style="display:none;">
        <div class="multi-dock-left">
          <div class="multiplayer-status-pill" id="multiStatusPill">
            <span class="pulse-indicator"></span>
            <span id="multiStatusText">Exploring Solo</span>
            <span class="peer-count-badge" id="peerCountBadge" style="display:none;">1</span>
          </div>
        </div>

        <div class="multi-dock-center">
          <button type="button" class="btn-dock-action" id="btnDockWave" title="Wave to everyone">
            <span class="action-emoji">👋</span>
            <span class="action-text">Wave</span>
          </button>
          <button type="button" class="btn-dock-action" id="btnDockHeart" title="Send glowing hearts">
            <span class="action-emoji">💖</span>
            <span class="action-text">Hearts</span>
          </button>
          <button type="button" class="btn-dock-action" id="btnDockChat" title="Quick Chat & Reactions">
            <span class="action-emoji">💬</span>
            <span class="action-text">React</span>
          </button>
          <button type="button" class="btn-dock-action" id="btnDockSit" title="Sit Together on Gallery Bench">
            <span class="action-emoji">🛋️</span>
            <span class="action-text">Sit Together</span>
          </button>
          <button type="button" class="btn-dock-action btn-dock-propose" id="btnDockPropose" title="Kneel down on one knee to propose">
            <span class="action-emoji">💍</span>
            <span class="action-text">Propose</span>
          </button>
        </div>

        <div class="multi-dock-right">
          <div class="multi-avatar-badge" id="multiAvatarBadge">
            <span class="my-avatar-tag" id="myAvatarTag">👦 You</span>
          </div>
        </div>
      </div>

      <!-- Floating Interactive Proposal Notification Bullet (Shown to girl first) -->
      <div class="proposal-bullet" id="proposalBullet" style="display:none;" role="button" tabindex="0" title="Click to open proposal">
        <div class="bullet-sparkle">💍 ✨</div>
        <div class="bullet-text-wrap">
          <span class="bullet-eyebrow" id="bulletEyebrow">PROPOSAL FOR YOU</span>
          <span class="bullet-title" id="bulletTitle">A Special Question Awaits...</span>
        </div>
        <div class="bullet-badge-tap">
          <span>Tap to Open 💌</span>
        </div>
      </div>

      <!-- Real-Time Interactive Kneeling Proposal Banner / Full Message Modal -->
      <div class="realtime-proposal-banner" id="realtimeProposalBanner" style="display:none;">
        <div class="proposal-banner-backdrop" id="realtimeProposalBackdrop"></div>
        <div class="proposal-banner-card">
          <button type="button" class="btn-close-banner" id="btnCloseRealtimeBanner">✕</button>
          <div class="proposal-banner-seal">💍 ✨</div>
          <span class="proposal-banner-eyebrow" id="realtimeBannerEyebrow">REAL-TIME 3D PROPOSAL</span>
          <h3 class="proposal-banner-title" id="realtimeBannerTitle">On Bended Knee For You</h3>
          <p class="proposal-banner-question" id="realtimeBannerQuestion">${proposalQuestion}</p>
          <div class="proposal-banner-actions" id="realtimeBannerActions">
            <button type="button" class="btn-banner-accept" id="btnAcceptRealtimeProposal">
              <span>${proposalYesBtn}</span>
            </button>
            <button type="button" class="btn-banner-runaway-no" id="btnRunawayNoProposal">
              <span>No 💔</span>
            </button>
            <button type="button" class="btn-banner-stand" id="btnStandRealtimeProposal" style="display:none;">
              <span>Stand Up</span>
            </button>
          </div>
          <!-- Real-Time Celebration Box -->
          <div class="realtime-celebrate-box" id="realtimeCelebrateBox" style="display:none;">
            <div class="celebrate-sparkles">✨ 💍 🥂 💖 🕊️ ✨</div>
            <h3 class="celebrate-title">${proposalCelebrateTitle}</h3>
            <p class="celebrate-text">${proposalCelebrateMsg}</p>
            <div class="celebrate-badge">ACCEPTED IN REAL-TIME • FOREVER & ALWAYS</div>
            <button type="button" class="btn-banner-done" id="btnDoneRealtimeProposal">
              <span>Continue Exploring 🏛️</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Quick Reaction & Chat Tray -->
      <div class="museum-chat-tray" id="museumChatTray" style="display:none;">
        <div class="chat-tray-header">
          <span>💬 Reaction or Floating Message</span>
          <button type="button" class="btn-close-tray" id="btnCloseChatTray">✕</button>
        </div>
        <div class="chat-preset-chips">
          <button type="button" class="chat-preset-chip" data-msg="❤️ I love you!">❤️ I love you!</button>
          <button type="button" class="chat-preset-chip" data-msg="✨ Look at this masterpiece!">✨ Look at this!</button>
          <button type="button" class="chat-preset-chip" data-msg="🥰 You look so gorgeous!">🥰 You look so gorgeous!</button>
          <button type="button" class="chat-preset-chip" data-msg="💍 Forever & always!">💍 Forever & always!</button>
          <button type="button" class="chat-preset-chip" data-msg="🚶 Follow me!">🚶 Follow me!</button>
          <button type="button" class="chat-preset-chip" data-msg="🛋️ Let's sit together!">🛋️ Let's sit together!</button>
        </div>
        <div class="chat-input-row">
          <input type="text" id="chatCustomInput" placeholder="Type a message to float over your avatar..." maxlength="30" />
          <button type="button" id="btnSendCustomChat" class="btn-send-chat">Send ✉️</button>
        </div>
      </div>

      <!-- Artwork Inspection Overlay Modal -->
      <div class="museum-artwork-modal" id="artworkModal" style="display:none;">
        <div class="artwork-modal-backdrop" id="artworkModalBackdrop"></div>
        <div class="artwork-modal-card">
          <button type="button" class="btn-close-artwork" id="btnCloseArtwork" title="Return to Gallery">✕</button>
          <div class="artwork-modal-content">
            <div class="artwork-modal-frame">
              <img id="modalArtworkImg" src="" alt="Museum Artwork" />
            </div>
            <div class="artwork-modal-info">
              <div class="artwork-plaque-tag" id="modalArtworkTag">EXHIBIT NO. 01</div>
              <h2 class="artwork-modal-title" id="modalArtworkTitle">Artwork Title</h2>
              <div class="artwork-modal-date" id="modalArtworkDate">Date</div>
              <div class="artwork-gold-separator"></div>
              <p class="artwork-modal-desc" id="modalArtworkDesc">Artwork description and memories.</p>
              <div class="artwork-modal-actions">
                <button type="button" class="btn-modal-action" id="btnModalPrev">❮ Previous</button>
                <button type="button" class="btn-modal-action" id="btnModalNext">Next ❯</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Centerpiece Proposal / Cinema Modal -->
      <div class="museum-proposal-modal" id="proposalModal" style="display:none;">
        <div class="proposal-modal-backdrop" id="proposalModalBackdrop"></div>
        <div class="proposal-modal-card" id="proposalCard">
          <button type="button" class="btn-close-proposal" id="btnCloseProposal" title="Return to Gallery">✕</button>
          <div class="proposal-gold-seal">🏛️ 💍</div>
          <span class="proposal-eyebrow">THE GRAND EXHIBIT</span>
          <h2 class="proposal-title" id="proposalTitle">${proposalQuestion}</h2>
          <p class="proposal-subtitle" id="proposalSub">${proposalSubtitle}</p>
          
          <div class="proposal-centerpiece-preview">
            <img src="${centerpieceImage}" id="proposalCenterpieceImg" alt="${centerpieceTitle}" />
            <div class="preview-caption">${centerpieceTitle}</div>
          </div>

          <div class="proposal-action-row" id="proposalActionRow">
            <button type="button" class="btn-proposal-yes" id="btnProposalYes">
              <span>${proposalYesBtn}</span>
            </button>
            <button type="button" class="btn-proposal-no" id="btnProposalNo">
              <span>Let me think... 🤔</span>
            </button>
          </div>

          <!-- Celebration Reveal Area (Revealed on YES) -->
          <div class="proposal-celebrate-box" id="proposalCelebrateBox" style="display:none;">
            <div class="celebrate-sparkles">✨ 💍 🥂 💖 🕊️ ✨</div>
            <h3 class="celebrate-title">${proposalCelebrateTitle}</h3>
            <p class="celebrate-text">${proposalCelebrateMsg}</p>
            <div class="celebrate-badge">OUR PERMANENT EXHIBITION • FOREVER & ALWAYS</div>
            <button type="button" class="btn-celebrate-done" id="btnCelebrateDone">
              <span>Return to Walk the Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Music Player if audio source provided
  const musicMount = container.querySelector('#museumMusicPlayerMount');
  let audioPlayerInstance = null;
  if (data.audioSrc) {
    audioPlayerInstance = initMusicPlayer(musicMount, {
      src: data.audioSrc,
      title: data.audioTitle || 'Museum Romantic Soundtrack',
      subtitle: data.audioSubtitle || 'Acoustic Reverie'
    });
  }

  // Bind Audio toggle
  let isMuted = false;
  const btnAudioToggle = container.querySelector('#btnAudioToggle');
  const audioIcon = container.querySelector('#audioIcon');
  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', () => {
      isMuted = !isMuted;
      audioIcon.textContent = isMuted ? '🔇' : '🎵';
      const audioElem = musicMount.querySelector('audio');
      if (audioElem) {
        audioElem.muted = isMuted;
        if (!isMuted && audioElem.paused) audioElem.play().catch(() => {});
      }
    });
  }

  // --------------------------------------------------------------------------
  // THREE.JS 3D SCENE SETUP
  // --------------------------------------------------------------------------
  const canvasContainer = container.querySelector('#threeMuseumCanvas');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e0b0a);
  scene.fog = new THREE.FogExp2(0x120e0c, 0.015);

  const camera = new THREE.PerspectiveCamera(
    60,
    canvasContainer.clientWidth / canvasContainer.clientHeight,
    0.1,
    200
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  canvasContainer.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.75);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xd0c4b2, 0.45);
  hemiLight.position.set(0, 10, 0);
  scene.add(hemiLight);

  // Gallery Dimensions
  const hallWidth = 11;
  const hallHeight = 5.8;
  const artworkSpacing = 9.5;
  const totalArtworks = artworks.length;
  const hallLength = Math.max(65, (totalArtworks / 2 + 2) * artworkSpacing + 25);
  const rotundaZ = -(hallLength - 12);

  // 1. Floor Mesh
  const floorTexture = createParquetTexture();
  const floorGeo = new THREE.PlaneGeometry(hallWidth * 2.2, hallLength + 30);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.28,
    metalness: 0.08
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(0, 0, -hallLength / 2 + 5);
  scene.add(floorMesh);

  // 2. Ceiling Mesh
  const ceilingGeo = new THREE.PlaneGeometry(hallWidth * 2.2, hallLength + 30);
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0x1b1614,
    roughness: 0.85
  });
  const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceilingMesh.rotation.x = Math.PI / 2;
  ceilingMesh.position.set(0, hallHeight, -hallLength / 2 + 5);
  scene.add(ceilingMesh);

  // Track lights rail along ceiling
  const trackGeo = new THREE.BoxGeometry(0.18, 0.1, hallLength + 20);
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9, roughness: 0.2 });
  const trackLeft = new THREE.Mesh(trackGeo, trackMat);
  trackLeft.position.set(-hallWidth / 2 + 1.2, hallHeight - 0.06, -hallLength / 2 + 5);
  scene.add(trackLeft);

  const trackRight = new THREE.Mesh(trackGeo, trackMat);
  trackRight.position.set(hallWidth / 2 - 1.2, hallHeight - 0.06, -hallLength / 2 + 5);
  scene.add(trackRight);

  // 3. Walls
  const wallTexture = createWallTexture();
  const wallMat = new THREE.MeshStandardMaterial({
    map: wallTexture,
    roughness: 0.85,
    metalness: 0.05
  });

  // Left Wall
  const leftWallGeo = new THREE.PlaneGeometry(hallLength + 30, hallHeight);
  const leftWall = new THREE.Mesh(leftWallGeo, wallMat);
  leftWall.position.set(-hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(leftWallGeo, wallMat);
  rightWall.position.set(hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Entrance Back Wall (behind player at start)
  const entranceWallGeo = new THREE.PlaneGeometry(hallWidth, hallHeight);
  const entranceBackWall = new THREE.Mesh(entranceWallGeo, wallMat);
  entranceBackWall.position.set(0, hallHeight / 2, 7.5);
  scene.add(entranceBackWall);

  // Baseboards (Dark Walnut) along Left & Right
  const baseboardGeo = new THREE.BoxGeometry(0.1, 0.32, hallLength + 30);
  const baseboardMat = new THREE.MeshStandardMaterial({ color: 0x24160e, roughness: 0.4 });
  const bbLeft = new THREE.Mesh(baseboardGeo, baseboardMat);
  bbLeft.position.set(-hallWidth / 2 + 0.05, 0.16, -hallLength / 2 + 5);
  scene.add(bbLeft);

  const bbRight = new THREE.Mesh(baseboardGeo, baseboardMat);
  bbRight.position.set(hallWidth / 2 - 0.05, 0.16, -hallLength / 2 + 5);
  scene.add(bbRight);

  // 4. Entrance Dedication Plaque on Entrance Feature Wall
  // We place a grand entrance partition archway at z = 2
  const entrancePlaqueTexture = createPlaqueTexture(
    museumTitle,
    museumSubtitle,
    museumDedication,
    senderName,
    establishmentDate
  );

  const plaqueGeo = new THREE.BoxGeometry(4.2, 3.15, 0.08);
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: entrancePlaqueTexture,
    metalness: 0.65,
    roughness: 0.32
  });
  const entrancePlaque = new THREE.Mesh(plaqueGeo, plaqueMat);
  entrancePlaque.position.set(0, 2.7, 3.8);
  scene.add(entrancePlaque);

  // Spotlight shining on Entrance Plaque
  const plaqueSpot = new THREE.SpotLight(0xfff0d0, 2.8, 12, Math.PI / 5, 0.5, 1.2);
  plaqueSpot.position.set(0, hallHeight - 0.2, 1.5);
  plaqueSpot.target = entrancePlaque;
  scene.add(plaqueSpot);
  scene.add(plaqueSpot.target);

  // 5. Framed Artworks along Left and Right walls
  const interactiveArtworks = [];
  const textureLoader = new THREE.TextureLoader();

  // Shared frame materials
  const goldFrameMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.78,
    roughness: 0.32
  });
  const matBorderMat = new THREE.MeshStandardMaterial({
    color: 0xfffdfa,
    roughness: 0.95
  });

  artworks.forEach((art, index) => {
    const isLeft = index % 2 === 0;
    const pairIndex = Math.floor(index / 2);
    const zPos = - (pairIndex * artworkSpacing + 7.5);
    const xPos = isLeft ? (-hallWidth / 2 + 0.16) : (hallWidth / 2 - 0.16);
    const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

    const group = new THREE.Group();
    group.position.set(xPos, 2.6, zPos);
    group.rotation.y = rotY;

    // Outer Beveled Frame
    const frameW = 3.2;
    const frameH = 2.4;
    const frameDepth = 0.12;
    const outerFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameW, frameH, frameDepth),
      goldFrameMat
    );
    group.add(outerFrame);

    // Passe-partout / White Mat border
    const matMesh = new THREE.Mesh(
      new THREE.BoxGeometry(frameW - 0.28, frameH - 0.28, frameDepth + 0.02),
      matBorderMat
    );
    group.add(matMesh);

    // Canvas Image
    const canvasW = frameW - 0.65;
    const canvasH = frameH - 0.65;
    const canvasGeo = new THREE.PlaneGeometry(canvasW, canvasH);

    // Load photo texture with fallback
    const photoTexture = textureLoader.load(
      art.image,
      undefined,
      undefined,
      () => {
        // Fallback on error
        const fallbackTex = textureLoader.load('/images/sunset.jpg');
        canvasMesh.material.map = fallbackTex;
        canvasMesh.material.needsUpdate = true;
      }
    );

    const canvasMat = new THREE.MeshStandardMaterial({
      map: photoTexture,
      roughness: 0.38,
      metalness: 0.02
    });
    const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
    canvasMesh.position.z = frameDepth / 2 + 0.02;
    group.add(canvasMesh);

    // Brass Placard below Frame
    const placardTex = createPlacardTexture(index, art.title, art.date);
    const placardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.5, 0.04),
      new THREE.MeshStandardMaterial({ map: placardTex, metalness: 0.7, roughness: 0.35 })
    );
    placardMesh.position.set(0, -frameH / 2 - 0.42, 0);
    group.add(placardMesh);

    // Dedicated Ceiling Spotlight directly onto frame
    const spotX = isLeft ? (-hallWidth / 2 + 2.2) : (hallWidth / 2 - 2.2);
    const spotLight = new THREE.SpotLight(0xfff7e8, 3.2, 10, Math.PI / 6, 0.6, 1.2);
    spotLight.position.set(spotX, hallHeight - 0.15, zPos);
    spotLight.target = canvasMesh;
    scene.add(spotLight);
    scene.add(spotLight.target);

    // Small fixture cylinder on the ceiling track
    const fixture = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.14, 0.22, 12),
      trackMat
    );
    fixture.position.set(spotX, hallHeight - 0.1, zPos);
    scene.add(fixture);

    scene.add(group);

    // Store metadata for raycasting & interaction
    interactiveArtworks.push({
      mesh: canvasMesh,
      frameGroup: group,
      data: art,
      index,
      lookPosition: new THREE.Vector3(
        isLeft ? xPos + 2.8 : xPos - 2.8,
        2.5,
        zPos
      ),
      targetLookAt: new THREE.Vector3(xPos, 2.5, zPos)
    });
  });

  // 6. Grand Centerpiece Rotunda & Cinema Room
  // Back Wall of the Museum
  const rotundaWallGeo = new THREE.PlaneGeometry(hallWidth * 1.8, hallHeight);
  const backWall = new THREE.Mesh(rotundaWallGeo, wallMat);
  backWall.position.set(0, hallHeight / 2, rotundaZ);
  scene.add(backWall);

  // Grand Centerpiece Cinema Screen
  const screenW = 6.8;
  const screenH = 4.0;
  const cinemaScreenGroup = new THREE.Group();
  cinemaScreenGroup.position.set(0, 2.9, rotundaZ + 0.18);

  const cinemaFrame = new THREE.Mesh(
    new THREE.BoxGeometry(screenW + 0.4, screenH + 0.4, 0.12),
    goldFrameMat
  );
  cinemaScreenGroup.add(cinemaFrame);

  const centerpieceTex = textureLoader.load(centerpieceImage);
  const cinemaCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW, screenH),
    new THREE.MeshStandardMaterial({
      map: centerpieceTex,
      roughness: 0.35,
      metalness: 0.05
    })
  );
  cinemaCanvas.position.z = 0.08;
  cinemaScreenGroup.add(cinemaCanvas);

  // Centerpiece Placard
  const cpPlacardTex = createPlacardTexture(99, centerpieceTitle, 'Permanent Masterpiece');
  const cpPlacard = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 0.6, 0.04),
    new THREE.MeshStandardMaterial({ map: cpPlacardTex, metalness: 0.7, roughness: 0.35 })
  );
  cpPlacard.position.set(0, -screenH / 2 - 0.45, 0.05);
  cinemaScreenGroup.add(cpPlacard);

  scene.add(cinemaScreenGroup);

  // Centerpiece Ceiling Spotlight (Warm Dramatic Spotlight)
  const cpSpot = new THREE.SpotLight(0xffedd0, 4.5, 16, Math.PI / 4.5, 0.55, 1.2);
  cpSpot.position.set(0, hallHeight - 0.2, rotundaZ + 5.5);
  cpSpot.target = cinemaCanvas;
  scene.add(cpSpot);
  scene.add(cpSpot.target);

  // 7. Gallery Tufted Leather Bench in Front of Centerpiece
  const benchGroup = new THREE.Group();
  benchGroup.position.set(0, 0, rotundaZ + 5.8);

  const benchSeat = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.45, 1.1),
    new THREE.MeshStandardMaterial({ color: 0x22130c, roughness: 0.45, metalness: 0.1 })
  );
  benchSeat.position.y = 0.55;
  benchGroup.add(benchSeat);

  // Bench walnut legs
  const legGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.35, 10);
  const legMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.3 });
  const legPositions = [
    [-1.4, 0.18, -0.4],
    [1.4, 0.18, -0.4],
    [-1.4, 0.18, 0.4],
    [1.4, 0.18, 0.4]
  ];
  legPositions.forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(legGeo, legMat);
    leg.position.set(lx, ly, lz);
    benchGroup.add(leg);
  });
  scene.add(benchGroup);

  // --------------------------------------------------------------------------
  // CAMERA WAYPOINTS & GUIDED TOUR ENGINE
  // --------------------------------------------------------------------------
  const waypoints = [
    {
      id: 'entrance',
      title: museumTitle,
      subtitle: museumSubtitle,
      stepLabel: 'ENTRANCE VESTIBULE',
      cameraPos: new THREE.Vector3(0, 2.3, 0.4),
      lookAt: new THREE.Vector3(0, 2.6, 3.8)
    }
  ];

  artworks.forEach((art, idx) => {
    const isLeft = idx % 2 === 0;
    const pairIndex = Math.floor(idx / 2);
    const zPos = - (pairIndex * artworkSpacing + 7.5);
    const xPos = isLeft ? (-hallWidth / 2 + 0.16) : (hallWidth / 2 - 0.16);

    waypoints.push({
      id: `art_${idx}`,
      title: art.title,
      subtitle: art.desc || `Curated Memory: ${art.date}`,
      stepLabel: `EXHIBIT ${String(idx + 1).padStart(2, '0')} OF ${String(artworks.length).padStart(2, '0')}`,
      cameraPos: new THREE.Vector3(
        isLeft ? xPos + 3.2 : xPos - 3.2,
        2.45,
        zPos + (isLeft ? 0.3 : -0.3)
      ),
      lookAt: new THREE.Vector3(xPos, 2.45, zPos),
      artworkIndex: idx
    });
  });

  // Final Waypoint: The Grand Centerpiece Cinema
  waypoints.push({
    id: 'centerpiece',
    title: centerpieceTitle,
    subtitle: proposalQuestion,
    stepLabel: 'THE MASTERPIECE',
    cameraPos: new THREE.Vector3(0, 2.1, rotundaZ + 6.2),
    lookAt: new THREE.Vector3(0, 2.8, rotundaZ + 0.18),
    isCenterpiece: true
  });

  // State Management
  let currentMode = 'tour'; // 'tour' or 'walk'
  let tourIndex = 0;
  let isTourPlaying = true;
  let tourAdvanceTimeout = null;
  const currentLookAtTarget = new THREE.Vector3().copy(waypoints[0].lookAt);

  // Set initial camera position facing Dedication Plaque
  camera.position.copy(waypoints[0].cameraPos);
  camera.lookAt(currentLookAtTarget);

  // Navigation HUD Elements
  const tourStepBadge = container.querySelector('#tourStepBadge');
  const tourCaptionTitle = container.querySelector('#tourCaptionTitle');
  const tourCaptionSub = container.querySelector('#tourCaptionSub');
  const btnPlayPauseTour = container.querySelector('#btnPlayPauseTour');
  const tourPlayIcon = container.querySelector('#tourPlayIcon');
  const btnPrevArtwork = container.querySelector('#btnPrevArtwork');
  const btnNextArtwork = container.querySelector('#btnNextArtwork');
  const btnJumpCenterpiece = container.querySelector('#btnJumpCenterpiece');

  const btnTourMode = container.querySelector('#btnTourMode');
  const btnWalkMode = container.querySelector('#btnWalkMode');
  const museumTourDock = container.querySelector('#museumTourDock');
  const mobileControls = container.querySelector('#museumMobileControls');
  const desktopHint = container.querySelector('#desktopHint');

  // Move camera smoothly to a waypoint
  function goToWaypoint(index, duration = 2.2) {
    if (index < 0 || index >= waypoints.length) return;
    tourIndex = index;
    const targetWp = waypoints[tourIndex];

    // Update HUD Text
    if (tourStepBadge) tourStepBadge.textContent = targetWp.stepLabel;
    if (tourCaptionTitle) tourCaptionTitle.textContent = targetWp.title;
    if (tourCaptionSub) tourCaptionSub.textContent = targetWp.subtitle;

    // Play subtle camera swoop sound
    soundFx.sparkle();

    // Kill any active camera tweens
    gsap.killTweensOf(camera.position);
    gsap.killTweensOf(currentLookAtTarget);

    gsap.to(camera.position, {
      x: targetWp.cameraPos.x,
      y: targetWp.cameraPos.y,
      z: targetWp.cameraPos.z,
      duration: duration,
      ease: 'power2.inOut'
    });

    gsap.to(currentLookAtTarget, {
      x: targetWp.lookAt.x,
      y: targetWp.lookAt.y,
      z: targetWp.lookAt.z,
      duration: duration,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(currentLookAtTarget);
      },
      onComplete: () => {
        // If arrived at Centerpiece in tour mode, trigger Proposal Climax!
        if (targetWp.isCenterpiece) {
          showProposalModal();
          return;
        }

        // If tour is playing, queue next advancement after 5.5s
        if (isTourPlaying && currentMode === 'tour') {
          clearTimeout(tourAdvanceTimeout);
          tourAdvanceTimeout = setTimeout(() => {
            if (isTourPlaying && currentMode === 'tour') {
              if (tourIndex < waypoints.length - 1) {
                goToWaypoint(tourIndex + 1);
              } else {
                goToWaypoint(0);
              }
            }
          }, 5500);
        }
      }
    });
  }

  // Tour controls
  if (btnNextArtwork) {
    btnNextArtwork.addEventListener('click', () => {
      clearTimeout(tourAdvanceTimeout);
      const nextIdx = (tourIndex + 1) % waypoints.length;
      goToWaypoint(nextIdx);
    });
  }

  if (btnPrevArtwork) {
    btnPrevArtwork.addEventListener('click', () => {
      clearTimeout(tourAdvanceTimeout);
      const prevIdx = (tourIndex - 1 + waypoints.length) % waypoints.length;
      goToWaypoint(prevIdx);
    });
  }

  if (btnPlayPauseTour) {
    btnPlayPauseTour.addEventListener('click', () => {
      isTourPlaying = !isTourPlaying;
      if (tourPlayIcon) tourPlayIcon.textContent = isTourPlaying ? '⏸' : '▶';
      if (isTourPlaying) {
        goToWaypoint(tourIndex);
      } else {
        clearTimeout(tourAdvanceTimeout);
      }
    });
  }

  if (btnJumpCenterpiece) {
    btnJumpCenterpiece.addEventListener('click', () => {
      clearTimeout(tourAdvanceTimeout);
      goToWaypoint(waypoints.length - 1);
    });
  }

  // --------------------------------------------------------------------------
  // VISITOR ONBOARDING & REAL-TIME MULTIPLAYER SYSTEM
  // --------------------------------------------------------------------------
  const visitorModal = container.querySelector('#visitorModal');
  const visitorNameInput = container.querySelector('#visitorNameInput');
  const genderCardMale = container.querySelector('#genderCardMale');
  const genderCardFemale = container.querySelector('#genderCardFemale');
  const btnEnterMuseum = container.querySelector('#btnEnterMuseum');

  const multiplayerDock = container.querySelector('#multiplayerDock');
  const multiStatusText = container.querySelector('#multiStatusText');
  const peerCountBadge = container.querySelector('#peerCountBadge');
  const btnDockWave = container.querySelector('#btnDockWave');
  const btnDockHeart = container.querySelector('#btnDockHeart');
  const btnDockChat = container.querySelector('#btnDockChat');
  const btnDockSit = container.querySelector('#btnDockSit');
  const btnDockPropose = container.querySelector('#btnDockPropose');
  const myAvatarTag = container.querySelector('#myAvatarTag');

  // Real-Time Proposal Banner Elements
  const proposalBullet = container.querySelector('#proposalBullet');
  const bulletEyebrow = container.querySelector('#bulletEyebrow');
  const bulletTitle = container.querySelector('#bulletTitle');
  const realtimeProposalBanner = container.querySelector('#realtimeProposalBanner');
  const realtimeProposalBackdrop = container.querySelector('#realtimeProposalBackdrop');
  const btnCloseRealtimeBanner = container.querySelector('#btnCloseRealtimeBanner');
  const btnAcceptRealtimeProposal = container.querySelector('#btnAcceptRealtimeProposal');
  const btnRunawayNoProposal = container.querySelector('#btnRunawayNoProposal');
  const btnStandRealtimeProposal = container.querySelector('#btnStandRealtimeProposal');
  const btnDoneRealtimeProposal = container.querySelector('#btnDoneRealtimeProposal');
  const realtimeBannerActions = container.querySelector('#realtimeBannerActions');
  const realtimeCelebrateBox = container.querySelector('#realtimeCelebrateBox');
  const realtimeBannerEyebrow = container.querySelector('#realtimeBannerEyebrow');
  const realtimeBannerTitle = container.querySelector('#realtimeBannerTitle');
  const realtimeBannerQuestion = container.querySelector('#realtimeBannerQuestion');

  const museumChatTray = container.querySelector('#museumChatTray');
  const btnCloseChatTray = container.querySelector('#btnCloseChatTray');
  const chatCustomInput = container.querySelector('#chatCustomInput');
  const btnSendCustomChat = container.querySelector('#btnSendCustomChat');

  let selectedGender = 'male';
  let userProfile = {
    name: recipientName || 'Visitor',
    gender: 'male'
  };

  let localAvatar = null;
  let multiplayer = null;
  const peerAvatarsMap = new Map(); // userId -> { avatar, targetPos, targetRotY, isWalking }
  let hasEnteredMuseum = false;
  let lastTime = performance.now();
  let lastMoveBroadcastTime = 0;

  // Gender Selection
  genderCardMale?.addEventListener('click', () => {
    soundFx.pop(460);
    selectedGender = 'male';
    genderCardMale.classList.add('active');
    genderCardFemale.classList.remove('active');
  });

  genderCardFemale?.addEventListener('click', () => {
    soundFx.pop(540);
    selectedGender = 'female';
    genderCardFemale.classList.add('active');
    genderCardMale.classList.remove('active');
  });

  // Multiplayer Peer Callbacks
  function onPeerUpdate(peers) {
    const peerCount = peers.size;
    if (peerCountBadge) {
      peerCountBadge.textContent = String(peerCount + 1);
      peerCountBadge.style.display = peerCount > 0 ? 'inline-flex' : 'none';
    }
    if (multiStatusText) {
      if (peerCount === 0) {
        multiStatusText.textContent = 'Exploring Solo';
      } else if (peerCount === 1) {
        const first = Array.from(peers.values())[0];
        multiStatusText.textContent = `With ${first.name || 'Friend'} ✨`;
      } else {
        multiStatusText.textContent = `${peerCount + 1} Exploring Together ✨`;
      }
    }

    // Sync peer 3D avatars
    peers.forEach((peer, userId) => {
      if (!peerAvatarsMap.has(userId)) {
        try {
          const pAvatar = create3DAvatar(peer.name, peer.gender, false);
          pAvatar.group.position.set(peer.x || 0, peer.y || 0, peer.z || 3.2);
          pAvatar.group.rotation.y = peer.rotY || Math.PI;
          scene.add(pAvatar.group);
          peerAvatarsMap.set(userId, {
            avatar: pAvatar,
            targetPos: new THREE.Vector3(peer.x || 0, peer.y || 0, peer.z || 3.2),
            targetRotY: peer.rotY || Math.PI,
            isWalking: Boolean(peer.isWalking)
          });
          soundFx.sparkle();
        } catch (err) {
          console.error('Failed to spawn peer avatar:', err);
        }
      } else {
        const rec = peerAvatarsMap.get(userId);
        rec.targetPos.set(peer.x || 0, peer.y || 0, peer.z || 3.2);
        rec.targetRotY = peer.rotY || 0;
        rec.isWalking = Boolean(peer.isWalking);
      }
    });

    // Remove left peers
    peerAvatarsMap.forEach((val, userId) => {
      if (!peers.has(userId)) {
        scene.remove(val.avatar.group);
        val.avatar.dispose();
        peerAvatarsMap.delete(userId);
      }
    });
  }

  function onPeerAction(data) {
    const rec = peerAvatarsMap.get(data.userId);
    if (!rec) return;

    if (data.action === 'wave') {
      rec.avatar.playGesture('wave');
      soundFx.sparkle();
    } else if (data.action === 'heart') {
      const targetPos = localAvatar ? localAvatar.group.position : null;
      rec.avatar.burstHearts(scene, targetPos);
      soundFx.sparkle();
    } else if (data.action === 'sit') {
      const peerBenchX = data.gender === 'male' ? -0.55 : 0.55;
      rec.targetPos.set(peerBenchX, 0, rotundaZ + 5.8);
      rec.avatar.group.position.set(peerBenchX, 0, rotundaZ + 5.8);
      rec.avatar.group.rotation.y = Math.PI;
      rec.avatar.setSeated(true);
    } else if (data.action === 'stand') {
      rec.avatar.setSeated(false);
      rec.avatar.group.position.set(0, 0, rotundaZ + 7.2);
    } else if (data.action === 'propose_kneel') {
      // 3D Romantic Real-Time Kneeling Proposal from peer
      rec.avatar.setKneeling(true);

      if (localAvatar) {
        // Proposer faces recipient
        const dx = localAvatar.group.position.x - rec.avatar.group.position.x;
        const dz = localAvatar.group.position.z - rec.avatar.group.position.z;
        rec.avatar.group.rotation.y = Math.atan2(dx, dz);

        // Local recipient turns toward kneeling partner and enters romantic surprise pose
        localAvatar.group.rotation.y = Math.atan2(-dx, -dz);
        localAvatar.setSurprise(true);
      }

      activeProposalData = data;
      soundFx.sparkle();

      // Show floating interactive proposal notification bullet to recipient
      if (proposalBullet) {
        if (bulletEyebrow) bulletEyebrow.textContent = `💍 ${data.proposerName ? data.proposerName.toUpperCase() : 'YOUR LOVE'} IS ASKING...`;
        if (bulletTitle) bulletTitle.textContent = 'Special Proposal For You ✨';
        proposalBullet.style.display = 'flex';
        gsap.fromTo(proposalBullet,
          { scale: 0.7, opacity: 0, y: -25 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }
        );
      }
    } else if (data.action === 'propose_accept') {
      triggerConfettiBlasters();

      if (localAvatar) {
        localAvatar.burstHearts(scene, rec.avatar.group.position);
        localAvatar.setSurprise(false);
        localAvatar.playGesture('wave');
      }
      rec.avatar.burstHearts(scene, localAvatar ? localAvatar.group.position : null);

      if (proposalBullet) proposalBullet.style.display = 'none';

      if (realtimeProposalBanner) {
        if (realtimeBannerActions) realtimeBannerActions.style.display = 'none';
        if (realtimeCelebrateBox) {
          const cTitle = realtimeCelebrateBox.querySelector('.celebrate-title');
          const cMsg = realtimeCelebrateBox.querySelector('.celebrate-text');
          if (cTitle) cTitle.textContent = 'She Said YES! 💍💖';
          if (cMsg) cMsg.textContent = `${data.acceptorName || 'She'} accepted your proposal! A lifetime of happiness begins now.`;
          realtimeCelebrateBox.style.display = 'block';
          gsap.fromTo(realtimeCelebrateBox,
            { scale: 0.88, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' }
          );
        }
        realtimeProposalBanner.style.display = 'flex';
      }
    } else if (data.action === 'propose_stand') {
      rec.avatar.setKneeling(false);
      if (localAvatar) localAvatar.setSurprise(false);
      if (proposalBullet) proposalBullet.style.display = 'none';
      if (realtimeProposalBanner) realtimeProposalBanner.style.display = 'none';
    }
  }

  function onPeerChat(data) {
    const rec = peerAvatarsMap.get(data.userId);
    if (rec && data.text) {
      rec.avatar.showChatBubble(data.text);
      soundFx.pop(580);
    }
  }

  // Enter Museum Action
  function enterMuseum() {
    if (hasEnteredMuseum) return;
    hasEnteredMuseum = true;

    const nameVal = (visitorNameInput ? visitorNameInput.value.trim() : '') || recipientName || 'Visitor';
    userProfile.name = nameVal;
    userProfile.gender = selectedGender;

    soundFx.sparkle();

    if (visitorModal) {
      gsap.to(visitorModal, {
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
        onComplete: () => {
          visitorModal.style.display = 'none';
        }
      });
    }

    // Spawn 3D local avatar
    try {
      localAvatar = create3DAvatar(userProfile.name, userProfile.gender, true);
      localAvatar.group.position.set(0, 0, 3.2);
      localAvatar.group.rotation.y = Math.PI; // Face forward down the grand hall (-Z)
      scene.add(localAvatar.group);

      // Snap camera directly to TPP behind avatar
      walkYaw = 0;
      walkPitch = 0.05;
      camera.position.set(0, 1.95, 3.2 + 3.8);
      currentLookAtTarget.set(0, 1.35, 3.2);
      camera.lookAt(currentLookAtTarget);
    } catch (err) {
      console.error('Failed to create localAvatar:', err);
    }

    // Update HUD
    if (myAvatarTag) {
      myAvatarTag.textContent = `${userProfile.gender === 'male' ? '👦' : '👧'} ${userProfile.name}`;
    }
    if (multiplayerDock) {
      multiplayerDock.style.display = 'flex';
    }

    // Connect real-time multiplayer
    const roomName = (data.passcode || data.slug || data.id || 'our_museum')
      .toString().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    multiplayer = new MuseumMultiplayer(
      roomName,
      userProfile,
      onPeerUpdate,
      onPeerAction,
      onPeerChat
    );

    // Switch to Walk mode (TPP View)
    setMode('walk');

    // Auto-play soundtrack if provided
    const audioElem = musicMount?.querySelector('audio');
    if (audioElem && !isMuted) {
      audioElem.play().catch(() => {});
    }
  }

  btnEnterMuseum?.addEventListener('click', enterMuseum);

  // Multiplayer Dock Buttons
  btnDockWave?.addEventListener('click', () => {
    soundFx.sparkle();
    if (localAvatar) localAvatar.playGesture('wave');
    if (multiplayer) multiplayer.sendAction('wave');
  });

  btnDockHeart?.addEventListener('click', () => {
    soundFx.sparkle();
    let targetPos = null;
    if (peerAvatarsMap.size > 0) {
      const first = Array.from(peerAvatarsMap.values())[0];
      targetPos = first.avatar.group.position;
    }
    if (localAvatar) localAvatar.burstHearts(scene, targetPos);
    if (multiplayer) multiplayer.sendAction('heart');
  });

  btnDockChat?.addEventListener('click', () => {
    if (museumChatTray) {
      const isVisible = museumChatTray.style.display === 'block';
      museumChatTray.style.display = isVisible ? 'none' : 'block';
      if (!isVisible && chatCustomInput) {
        setTimeout(() => chatCustomInput.focus(), 100);
      }
    }
  });

  btnCloseChatTray?.addEventListener('click', () => {
    if (museumChatTray) museumChatTray.style.display = 'none';
  });

  container.querySelectorAll('.chat-preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const msg = chip.getAttribute('data-msg');
      sendChat(msg);
    });
  });

  function sendChat(text) {
    if (!text || !text.trim()) return;
    const clean = text.trim();
    if (localAvatar) localAvatar.showChatBubble(clean);
    if (multiplayer) multiplayer.sendChat(clean);
    soundFx.pop(640);
    if (museumChatTray) museumChatTray.style.display = 'none';
    if (chatCustomInput) chatCustomInput.value = '';
  }

  btnSendCustomChat?.addEventListener('click', () => {
    sendChat(chatCustomInput?.value);
  });

  chatCustomInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sendChat(chatCustomInput.value);
    }
  });

  btnDockSit?.addEventListener('click', () => {
    if (isSeatedOnBench) {
      standUpFromBench();
    } else {
      sitOnBench();
    }
  });

  // --------------------------------------------------------------------------
  // REAL-TIME 3D PROPOSAL SYSTEM (ONE KNEE + VELVET RING BOX + BULLET & RUNAWAY NO)
  // --------------------------------------------------------------------------
  let activeProposalData = null;
  let runawayNoCount = 0;
  const runawayPhrases = [
    "Are you sure? 😜",
    "Can't click me! 🥰",
    "You have to say YES! 💍",
    "Only YES is allowed! 💖",
    "Nice try! 😘",
    "Destiny says YES! ✨"
  ];

  function triggerConfettiBlasters() {
    soundFx.sparkle();
    const end = Date.now() + 6 * 1000;
    const colors = ['#e63946', '#ffb703', '#f4a261', '#e76f51', '#ffffff', '#ffd166', '#ec4899', '#f43f5e', '#a855f7'];

    // Heavy initial blast from bottom-left and bottom-right cannons
    confetti({
      particleCount: 85,
      angle: 60,
      spread: 75,
      origin: { x: 0, y: 0.88 },
      colors
    });
    confetti({
      particleCount: 85,
      angle: 120,
      spread: 75,
      origin: { x: 1, y: 0.88 },
      colors
    });
    confetti({
      particleCount: 65,
      spread: 95,
      origin: { x: 0.5, y: 0.65 },
      colors
    });

    // Repeating barrage waves
    (function blasterVolley() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.88 },
        colors
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.88 },
        colors
      });
      if (Math.random() < 0.35) {
        confetti({
          particleCount: 10,
          spread: 80,
          origin: { x: 0.5, y: 0.6 },
          colors
        });
      }

      if (Date.now() < end) {
        requestAnimationFrame(blasterVolley);
      }
    }());
  }

  function dodgeRunawayButton(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    soundFx.pop(440);
    runawayNoCount++;

    const randomX = (Math.random() - 0.5) * 240;
    const randomY = (Math.random() - 0.5) * 120;

    const phrase = runawayPhrases[(runawayNoCount - 1) % runawayPhrases.length];
    const span = btnRunawayNoProposal?.querySelector('span');
    if (span) span.textContent = phrase;

    gsap.to(btnRunawayNoProposal, {
      x: randomX,
      y: randomY,
      duration: 0.22,
      ease: 'power2.out'
    });
  }

  btnRunawayNoProposal?.addEventListener('mouseenter', dodgeRunawayButton);
  btnRunawayNoProposal?.addEventListener('pointerenter', dodgeRunawayButton);
  btnRunawayNoProposal?.addEventListener('touchstart', dodgeRunawayButton, { passive: false });
  btnRunawayNoProposal?.addEventListener('click', dodgeRunawayButton);

  function openFullProposalMessage() {
    soundFx.sparkle();
    if (proposalBullet) proposalBullet.style.display = 'none';

    if (realtimeProposalBanner) {
      const proposerName = activeProposalData?.proposerName || 'Your Love';
      const question = activeProposalData?.question || proposalQuestion;

      if (realtimeBannerEyebrow) realtimeBannerEyebrow.textContent = `💍 ${proposerName.toUpperCase()} ASKS FOR YOUR HAND`;
      if (realtimeBannerTitle) realtimeBannerTitle.textContent = `${proposerName} On Bended Knee`;
      if (realtimeBannerQuestion) realtimeBannerQuestion.textContent = question;
      if (realtimeBannerActions) realtimeBannerActions.style.display = 'flex';
      if (realtimeCelebrateBox) realtimeCelebrateBox.style.display = 'none';
      if (btnStandRealtimeProposal) btnStandRealtimeProposal.style.display = 'none';
      if (btnAcceptRealtimeProposal) btnAcceptRealtimeProposal.style.display = 'inline-flex';
      if (btnRunawayNoProposal) {
        btnRunawayNoProposal.style.display = 'inline-flex';
        gsap.set(btnRunawayNoProposal, { x: 0, y: 0 });
        const span = btnRunawayNoProposal.querySelector('span');
        if (span) span.textContent = 'No 💔';
        runawayNoCount = 0;
      }
      realtimeProposalBanner.style.display = 'flex';
      gsap.fromTo('#realtimeProposalBanner .proposal-banner-card',
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
      );
    }
  }

  proposalBullet?.addEventListener('click', openFullProposalMessage);

  function toggleKneelingProposal() {
    if (!localAvatar) return;
    soundFx.sparkle();

    const isCurrentlyKneeling = localAvatar.isKneeling();
    if (isCurrentlyKneeling) {
      standFromProposal();
    } else {
      if (isSeatedOnBench) {
        standUpFromBench();
      }

      // Turn towards peer if nearby
      if (peerAvatarsMap.size > 0) {
        const firstPeer = Array.from(peerAvatarsMap.values())[0];
        const peerPos = firstPeer.avatar.group.position;
        const dx = peerPos.x - localAvatar.group.position.x;
        const dz = peerPos.z - localAvatar.group.position.z;
        localAvatar.group.rotation.y = Math.atan2(dx, dz);
      }

      localAvatar.setKneeling(true);
      if (btnDockPropose) btnDockPropose.classList.add('active');

      // Proposer sees status banner waiting for partner
      if (realtimeProposalBanner) {
        if (realtimeBannerEyebrow) realtimeBannerEyebrow.textContent = '💍 YOU ARE PROPOSING ON ONE KNEE';
        if (realtimeBannerTitle) realtimeBannerTitle.textContent = 'Presenting The Ring Box ✨';
        if (realtimeBannerQuestion) realtimeBannerQuestion.textContent = `${proposalQuestion}\n(Waiting for her reply 💖)`;
        if (realtimeBannerActions) realtimeBannerActions.style.display = 'flex';
        if (realtimeCelebrateBox) realtimeCelebrateBox.style.display = 'none';
        if (btnStandRealtimeProposal) btnStandRealtimeProposal.style.display = 'inline-flex';
        if (btnAcceptRealtimeProposal) btnAcceptRealtimeProposal.style.display = 'none';
        if (btnRunawayNoProposal) btnRunawayNoProposal.style.display = 'none';
        realtimeProposalBanner.style.display = 'flex';
      }

      if (multiplayer) {
        multiplayer.sendAction('propose_kneel', {
          question: proposalQuestion,
          proposerName: userProfile.name,
          proposerGender: userProfile.gender
        });
      }
    }
  }

  function standFromProposal() {
    if (localAvatar) {
      localAvatar.setKneeling(false);
      localAvatar.setSurprise(false);
    }
    if (btnDockPropose) btnDockPropose.classList.remove('active');
    if (proposalBullet) proposalBullet.style.display = 'none';
    if (realtimeProposalBanner) realtimeProposalBanner.style.display = 'none';
    if (multiplayer) {
      multiplayer.sendAction('propose_stand');
    }
  }

  function acceptProposal() {
    triggerConfettiBlasters();

    let targetPos = null;
    if (peerAvatarsMap.size > 0) {
      const firstPeer = Array.from(peerAvatarsMap.values())[0];
      targetPos = firstPeer.avatar.group.position;
      firstPeer.avatar.burstHearts(scene, localAvatar ? localAvatar.group.position : null);
    }
    if (localAvatar) {
      localAvatar.burstHearts(scene, targetPos);
      localAvatar.setSurprise(false);
      localAvatar.playGesture('wave');
    }

    if (proposalBullet) proposalBullet.style.display = 'none';

    if (realtimeBannerActions) realtimeBannerActions.style.display = 'none';
    if (realtimeCelebrateBox) {
      const cTitle = realtimeCelebrateBox.querySelector('.celebrate-title');
      const cMsg = realtimeCelebrateBox.querySelector('.celebrate-text');
      if (cTitle) cTitle.textContent = proposalCelebrateTitle || 'She Said YES! 💍🥂💖';
      if (cMsg) cMsg.textContent = proposalCelebrateMsg || 'Accepted in real-time. A lifetime of happiness begins now!';
      realtimeCelebrateBox.style.display = 'block';
      gsap.fromTo(realtimeCelebrateBox,
        { scale: 0.88, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' }
      );
    }

    if (multiplayer) {
      multiplayer.sendAction('propose_accept', {
        acceptorName: userProfile.name
      });
    }
  }

  btnDockPropose?.addEventListener('click', toggleKneelingProposal);
  btnAcceptRealtimeProposal?.addEventListener('click', acceptProposal);
  btnStandRealtimeProposal?.addEventListener('click', standFromProposal);
  btnCloseRealtimeBanner?.addEventListener('click', standFromProposal);
  realtimeProposalBackdrop?.addEventListener('click', standFromProposal);
  btnDoneRealtimeProposal?.addEventListener('click', standFromProposal);

  // --------------------------------------------------------------------------
  // FREE WALK CONTROLLER (TPP with WASD / Joystick + Camera Orbit)
  // --------------------------------------------------------------------------
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  let walkYaw = 0; // 0 faces forward towards gallery hall (-Z)
  let walkPitch = 0.05;
  const moveDirection = { forward: 0, right: 0 };
  const keysDown = {};

  // Interactive Prompts (Bench & Artworks)
  const benchPrompt = container.querySelector('#benchPrompt');
  const standPrompt = container.querySelector('#standPrompt');
  const artPromptBadge = container.querySelector('#artPromptBadge');
  const btnSitBench = container.querySelector('#btnSitBench');
  const btnStandBench = container.querySelector('#btnStandBench');
  const btnOpenProposalBench = container.querySelector('#btnOpenProposalBench');

  let isSeatedOnBench = false;

  function sitOnBench() {
    soundFx.pop(480);
    isSeatedOnBench = true;
    if (benchPrompt) benchPrompt.style.display = 'none';
    if (standPrompt) standPrompt.style.display = 'flex';

    // Update Dock Button Label & Icon
    if (btnDockSit) {
      const em = btnDockSit.querySelector('.action-emoji');
      const tx = btnDockSit.querySelector('.action-text');
      if (em) em.textContent = '🚶';
      if (tx) tx.textContent = 'Stand Up';
      btnDockSit.title = 'Stand up from bench';
    }

    const myBenchX = (userProfile.gender === 'male') ? -0.55 : 0.55;
    if (localAvatar) {
      localAvatar.group.position.set(myBenchX, 0, rotundaZ + 5.8);
      localAvatar.group.rotation.y = Math.PI; // Face cinema screen
      localAvatar.setSeated(true);
    }
    if (multiplayer) {
      multiplayer.sendAction('sit');
    }

    // Cinematic mood lighting (dim ambient spotlights)
    gsap.to(ambientLight, { intensity: 0.22, duration: 1.4 });
    gsap.to(hemiLight, { intensity: 0.15, duration: 1.4 });
    gsap.to(cpSpot, { intensity: 5.5, duration: 1.4 });

    // Smoothly drop camera to romantic seated height facing the screen
    gsap.to(camera.position, {
      x: 0,
      y: 1.8,
      z: rotundaZ + 8.4,
      duration: 1.8,
      ease: 'power2.inOut'
    });
    gsap.to(currentLookAtTarget, {
      x: 0,
      y: 2.6,
      z: rotundaZ + 0.18,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(currentLookAtTarget)
    });
  }

  function standUpFromBench() {
    soundFx.pop(520);
    isSeatedOnBench = false;
    if (standPrompt) standPrompt.style.display = 'none';

    // Reset Dock Button Label & Icon
    if (btnDockSit) {
      const em = btnDockSit.querySelector('.action-emoji');
      const tx = btnDockSit.querySelector('.action-text');
      if (em) em.textContent = '🛋️';
      if (tx) tx.textContent = 'Sit Together';
      btnDockSit.title = 'Sit together on the gallery bench';
    }

    if (localAvatar) {
      localAvatar.setSeated(false);
      localAvatar.group.position.set(0, 0, rotundaZ + 7.4);
      localAvatar.group.rotation.y = Math.PI;
    }
    if (multiplayer) {
      multiplayer.sendAction('stand');
    }

    // Restore museum lighting
    gsap.to(ambientLight, { intensity: 0.75, duration: 1.2 });
    gsap.to(hemiLight, { intensity: 0.45, duration: 1.2 });
    gsap.to(cpSpot, { intensity: 4.5, duration: 1.2 });

    walkYaw = 0;
    walkPitch = 0.05;
  }

  btnSitBench?.addEventListener('click', sitOnBench);
  btnStandBench?.addEventListener('click', standUpFromBench);
  btnOpenProposalBench?.addEventListener('click', () => {
    soundFx.sparkle();
    toggleKneelingProposal();
  });

  function setMode(mode) {
    currentMode = mode;
    clearTimeout(tourAdvanceTimeout);

    if (mode === 'tour') {
      btnTourMode?.classList.add('active');
      btnWalkMode?.classList.remove('active');
      museumTourDock.style.display = 'block';
      mobileControls.style.display = 'none';
      desktopHint.style.display = 'none';
      if (standPrompt) standPrompt.style.display = 'none';
      if (benchPrompt) benchPrompt.style.display = 'none';
      isSeatedOnBench = false;
      isTourPlaying = true;
      if (tourPlayIcon) tourPlayIcon.textContent = '⏸';
      goToWaypoint(tourIndex);
    } else {
      btnWalkMode?.classList.add('active');
      btnTourMode?.classList.remove('active');
      museumTourDock.style.display = 'none';
      if (isTouchDevice) {
        mobileControls.style.display = 'block';
      } else {
        desktopHint.style.display = 'block';
      }
      isTourPlaying = false;
      walkYaw = 0;
      walkPitch = 0.05;
    }
  }

  btnTourMode?.addEventListener('click', () => setMode('tour'));
  btnWalkMode?.addEventListener('click', () => setMode('walk'));

  // Desktop Keyboard Walk (WASD / Arrow Keys)
  window.addEventListener('keydown', (e) => {
    if (currentMode !== 'walk') return;
    keysDown[e.key.toLowerCase()] = true;
  });

  window.addEventListener('keyup', (e) => {
    if (currentMode !== 'walk') return;
    keysDown[e.key.toLowerCase()] = false;
  });

  // Desktop Mouse Drag to Look
  let isPointerDragging = false;
  let prevMouseX = 0;
  let prevMouseY = 0;

  canvasContainer.addEventListener('mousedown', (e) => {
    if (currentMode !== 'walk' || isSeatedOnBench) return;
    isPointerDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPointerDragging || currentMode !== 'walk' || isSeatedOnBench) return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    // Moving mouse to the right rotates camera smoothly to the right
    walkYaw -= dx * 0.0035;
    walkPitch -= dy * 0.003;
    walkPitch = Math.max(-0.35, Math.min(0.65, walkPitch));
  });

  window.addEventListener('mouseup', () => {
    isPointerDragging = false;
  });

  // Mobile Virtual Joystick & Touch Drag Look
  const joystickBase = container.querySelector('#joystickBase');
  const joystickStick = container.querySelector('#joystickStick');
  let joystickTouchId = null;
  let lookTouchId = null;
  let prevTouchLookX = 0;
  let prevTouchLookY = 0;

  if (joystickBase) {
    joystickBase.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.changedTouches[0];
      joystickTouchId = touch.identifier;
      handleJoystickMove(touch);
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === joystickTouchId) {
          handleJoystickMove(touch);
        } else if (touch.identifier === lookTouchId && currentMode === 'walk' && !isSeatedOnBench) {
          const dx = touch.clientX - prevTouchLookX;
          const dy = touch.clientY - prevTouchLookY;
          prevTouchLookX = touch.clientX;
          prevTouchLookY = touch.clientY;
          // Swiping right rotates camera smoothly to the right
          walkYaw -= dx * 0.0045;
          walkPitch -= dy * 0.0035;
          walkPitch = Math.max(-0.35, Math.min(0.65, walkPitch));
        }
      }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        if (touch.identifier === joystickTouchId) {
          joystickTouchId = null;
          moveDirection.forward = 0;
          moveDirection.right = 0;
          if (joystickStick) joystickStick.style.transform = `translate(0px, 0px)`;
        } else if (touch.identifier === lookTouchId) {
          lookTouchId = null;
        }
      }
    });

    function handleJoystickMove(touch) {
      const rect = joystickBase.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      let dx = touch.clientX - centerX;
      let dy = touch.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      const maxDist = rect.width / 2;

      if (dist > maxDist) {
        dx = (dx / dist) * maxDist;
        dy = (dy / dist) * maxDist;
      }

      if (joystickStick) {
        joystickStick.style.transform = `translate(${dx}px, ${dy}px)`;
      }

      moveDirection.right = dx / maxDist;
      moveDirection.forward = -dy / maxDist;
    }
  }

  // Mobile Right Screen Touch to Look
  canvasContainer.addEventListener('touchstart', (e) => {
    if (currentMode !== 'walk') return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i];
      // Only capture touch if it's on right 65% of screen
      if (touch.clientX > window.innerWidth * 0.35 && lookTouchId === null) {
        lookTouchId = touch.identifier;
        prevTouchLookX = touch.clientX;
        prevTouchLookY = touch.clientY;
      }
    }
  }, { passive: true });

  // --------------------------------------------------------------------------
  // RAYCASTING: CLICK OR TAP PAINTING TO INSPECT
  // --------------------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onCanvasClick(clientX, clientY) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check click on Dedication Plaque
    const plaqueHit = raycaster.intersectObject(entrancePlaque);
    if (plaqueHit.length > 0) {
      soundFx.sparkle();
      goToWaypoint(0);
      return;
    }

    // Check click on Centerpiece Screen
    const cpHit = raycaster.intersectObject(cinemaCanvas);
    if (cpHit.length > 0) {
      soundFx.sparkle();
      showProposalModal();
      return;
    }

    // Check click on Gallery Bench
    const benchHit = raycaster.intersectObject(benchSeat);
    if (benchHit.length > 0) {
      if (isSeatedOnBench) {
        standUpFromBench();
      } else {
        sitOnBench();
      }
      return;
    }

    // Check click on Artworks
    const meshes = interactiveArtworks.map(item => item.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const targetArt = interactiveArtworks.find(item => item.mesh === hitMesh);
      if (targetArt) {
        soundFx.pop(620);
        openArtworkModal(targetArt.index);
      }
    }
  }

  renderer.domElement.addEventListener('click', (e) => {
    // Only handle click if not dragging heavily
    onCanvasClick(e.clientX, e.clientY);
  });

  // --------------------------------------------------------------------------
  // ARTWORK INSPECTION MODAL
  // --------------------------------------------------------------------------
  const artworkModal = container.querySelector('#artworkModal');
  const artworkModalBackdrop = container.querySelector('#artworkModalBackdrop');
  const btnCloseArtwork = container.querySelector('#btnCloseArtwork');
  const modalArtworkImg = container.querySelector('#modalArtworkImg');
  const modalArtworkTag = container.querySelector('#modalArtworkTag');
  const modalArtworkTitle = container.querySelector('#modalArtworkTitle');
  const modalArtworkDate = container.querySelector('#modalArtworkDate');
  const modalArtworkDesc = container.querySelector('#modalArtworkDesc');
  const btnModalPrev = container.querySelector('#btnModalPrev');
  const btnModalNext = container.querySelector('#btnModalNext');

  let activeModalArtworkIndex = 0;

  function openArtworkModal(index) {
    if (index < 0 || index >= artworks.length) return;
    activeModalArtworkIndex = index;
    const art = artworks[index];

    modalArtworkImg.src = art.image;
    modalArtworkTag.textContent = `EXHIBIT NO. ${String(index + 1).padStart(2, '0')} OF ${String(artworks.length).padStart(2, '0')}`;
    modalArtworkTitle.textContent = art.title;
    modalArtworkDate.textContent = art.date || 'Curated Moment';
    modalArtworkDesc.textContent = art.desc || 'A memory forever treasured in the gallery of our love.';

    artworkModal.style.display = 'flex';
    gsap.fromTo(artworkModal.querySelector('.artwork-modal-card'),
      { scale: 0.9, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }
    );

    // Also smoothly fly camera towards artwork in 3D
    const artItem = interactiveArtworks[index];
    if (artItem) {
      gsap.to(camera.position, {
        x: artItem.lookPosition.x,
        y: artItem.lookPosition.y,
        z: artItem.lookPosition.z,
        duration: 1.4,
        ease: 'power2.inOut'
      });
      gsap.to(currentLookAtTarget, {
        x: artItem.targetLookAt.x,
        y: artItem.targetLookAt.y,
        z: artItem.targetLookAt.z,
        duration: 1.4,
        ease: 'power2.inOut',
        onUpdate: () => camera.lookAt(currentLookAtTarget)
      });
    }
  }

  function closeArtworkModal() {
    gsap.to(artworkModal.querySelector('.artwork-modal-card'), {
      scale: 0.92,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        artworkModal.style.display = 'none';
      }
    });
  }

  btnCloseArtwork?.addEventListener('click', closeArtworkModal);
  artworkModalBackdrop?.addEventListener('click', closeArtworkModal);

  btnModalPrev?.addEventListener('click', () => {
    soundFx.pop(480);
    const prev = (activeModalArtworkIndex - 1 + artworks.length) % artworks.length;
    openArtworkModal(prev);
  });

  btnModalNext?.addEventListener('click', () => {
    soundFx.pop(580);
    const next = (activeModalArtworkIndex + 1) % artworks.length;
    openArtworkModal(next);
  });

  // --------------------------------------------------------------------------
  // PROPOSAL / CENTERPIECE MODAL & CELEBRATION
  // --------------------------------------------------------------------------
  const proposalModal = container.querySelector('#proposalModal');
  const proposalModalBackdrop = container.querySelector('#proposalModalBackdrop');
  const btnCloseProposal = container.querySelector('#btnCloseProposal');
  const btnProposalYes = container.querySelector('#btnProposalYes');
  const btnProposalNo = container.querySelector('#btnProposalNo');
  const proposalActionRow = container.querySelector('#proposalActionRow');
  const proposalCelebrateBox = container.querySelector('#proposalCelebrateBox');
  const btnCelebrateDone = container.querySelector('#btnCelebrateDone');

  function showProposalModal() {
    proposalModal.style.display = 'flex';
    if (multiplayerDock) multiplayerDock.style.display = 'none';
    gsap.fromTo('#proposalCard',
      { scale: 0.88, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' }
    );
  }

  function hideProposalModal() {
    gsap.to('#proposalCard', {
      scale: 0.9,
      opacity: 0,
      y: 20,
      duration: 0.25,
      onComplete: () => {
        proposalModal.style.display = 'none';
        if (multiplayerDock && hasEnteredMuseum) {
          multiplayerDock.style.display = 'flex';
        }
      }
    });
  }

  btnCloseProposal?.addEventListener('click', hideProposalModal);
  proposalModalBackdrop?.addEventListener('click', hideProposalModal);

  if (btnProposalYes) {
    btnProposalYes.addEventListener('click', () => {
      // 1. Triumphant Heart Confetti Cannon
      soundFx.sparkle();
      const end = Date.now() + 4 * 1000;
      const colors = ['#e63946', '#ffb703', '#f4a261', '#e76f51', '#ffffff', '#ffd166'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());

      // 2. Hide Action Row and Reveal Celebration Certificate Box
      proposalActionRow.style.display = 'none';
      proposalCelebrateBox.style.display = 'block';
      gsap.fromTo(proposalCelebrateBox,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)' }
      );
    });
  }

  // Playful 'Let me think' button dodges on hover/tap
  if (btnProposalNo) {
    btnProposalNo.addEventListener('mouseenter', () => {
      const randomX = (Math.random() - 0.5) * 140;
      const randomY = (Math.random() - 0.5) * 60;
      gsap.to(btnProposalNo, { x: randomX, y: randomY, duration: 0.25, ease: 'power2.out' });
    });
    btnProposalNo.addEventListener('click', () => {
      soundFx.pop(320);
      btnProposalNo.textContent = 'You know you love me! 🥰';
      setTimeout(() => {
        btnProposalNo.textContent = 'Yes! 💖';
        btnProposalYes.click();
      }, 1200);
    });
  }

  if (btnCelebrateDone) {
    btnCelebrateDone.addEventListener('click', () => {
      hideProposalModal();
      setMode('walk');
    });
  }

  // --------------------------------------------------------------------------
  // ANIMATION & RENDER LOOP
  // --------------------------------------------------------------------------
  let animationFrameId = null;
  const walkSpeed = 0.09;
  let footstepTimer = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // Process Walk Mode (Third-Person Perspective TPP)
    if (currentMode === 'walk') {
      if (localAvatar && !isSeatedOnBench) {
        let forwardDelta = 0;
        let strafeDelta = 0;

        // Keyboard input
        if (keysDown['w'] || keysDown['arrowup']) forwardDelta += 1;
        if (keysDown['s'] || keysDown['arrowdown']) forwardDelta -= 1;
        if (keysDown['a'] || keysDown['arrowleft']) strafeDelta -= 1;
        if (keysDown['d'] || keysDown['arrowright']) strafeDelta += 1;

        // Mobile joystick input
        forwardDelta += moveDirection.forward;
        strafeDelta += moveDirection.right;

        const mag = Math.hypot(forwardDelta, strafeDelta);
        const isWalking = mag > 0.08 && !localAvatar.isKneeling();

        // If kneeling and player attempts to walk, stand up gracefully
        if (localAvatar.isKneeling() && mag > 0.08) {
          standFromProposal();
        }

        if (isWalking) {
          const normFwd = (forwardDelta / Math.max(1, mag)) * walkSpeed;
          const normStf = (strafeDelta / Math.max(1, mag)) * walkSpeed;

          // Camera horizontal forward direction (XZ plane: looking into gallery towards -Z when walkYaw = 0)
          const camFwd = new THREE.Vector3(-Math.sin(walkYaw), 0, -Math.cos(walkYaw)).normalize();
          const camRight = new THREE.Vector3().crossVectors(camFwd, new THREE.Vector3(0, 1, 0)).normalize();

          const moveVec = new THREE.Vector3()
            .addScaledVector(camFwd, normFwd)
            .addScaledVector(camRight, normStf);

          localAvatar.group.position.add(moveVec);

          // Smoothly turn avatar towards movement direction
          const targetAngle = Math.atan2(moveVec.x, moveVec.z);
          let diffAngle = targetAngle - localAvatar.group.rotation.y;
          while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
          while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
          localAvatar.group.rotation.y += diffAngle * 0.22;

          footstepTimer += 1;
          if (footstepTimer % 22 === 0) {
            soundFx.pop(220);
          }
        }

        // Keep inside museum bounds
        localAvatar.group.position.x = Math.max(-hallWidth / 2 + 1.2, Math.min(hallWidth / 2 - 1.2, localAvatar.group.position.x));
        localAvatar.group.position.z = Math.max(rotundaZ + 2.0, Math.min(6.2, localAvatar.group.position.z));
        localAvatar.group.position.y = 0;

        // Animate local avatar limbs
        localAvatar.update(delta, isWalking, 1.0);

        // Sync movement to multiplayer peers
        if (multiplayer && (isWalking || now - lastMoveBroadcastTime > 200)) {
          lastMoveBroadcastTime = now;
          multiplayer.sendMove(
            localAvatar.group.position.x,
            localAvatar.group.position.y,
            localAvatar.group.position.z,
            localAvatar.group.rotation.y,
            isWalking
          );
        }

        // TPP Chase Camera Positioning (behind avatar, looking forward)
        const camDist = 3.8;
        const camHeight = 1.95;
        const desiredCamX = localAvatar.group.position.x + Math.sin(walkYaw) * Math.cos(walkPitch) * camDist;
        const desiredCamY = localAvatar.group.position.y + camHeight + Math.sin(walkPitch) * camDist;
        const desiredCamZ = localAvatar.group.position.z + Math.cos(walkYaw) * Math.cos(walkPitch) * camDist;

        camera.position.lerp(new THREE.Vector3(desiredCamX, desiredCamY, desiredCamZ), 0.16);

        currentLookAtTarget.set(
          localAvatar.group.position.x,
          localAvatar.group.position.y + 1.35,
          localAvatar.group.position.z
        );
        camera.lookAt(currentLookAtTarget);
      } else if (localAvatar && isSeatedOnBench) {
        localAvatar.update(delta, false, 0);
      }
    }

    // Update remote peer avatars
    peerAvatarsMap.forEach((val) => {
      val.avatar.group.position.lerp(val.targetPos, 0.22);
      let dRot = val.targetRotY - val.avatar.group.rotation.y;
      while (dRot < -Math.PI) dRot += Math.PI * 2;
      while (dRot > Math.PI) dRot -= Math.PI * 2;
      val.avatar.group.rotation.y += dRot * 0.22;
      val.avatar.update(delta, val.isWalking, 1.0);
    });

    // Proximity checks when in walk mode
    if (currentMode === 'walk') {
      const benchPos = new THREE.Vector3(0, 1.7, rotundaZ + 5.8);
      const currentPos = localAvatar ? localAvatar.group.position : camera.position;
      const distToBench = currentPos.distanceTo(benchPos);
      if (distToBench < 4.5 && !isSeatedOnBench) {
        if (benchPrompt) benchPrompt.style.display = 'block';
      } else {
        if (benchPrompt) benchPrompt.style.display = 'none';
      }

      // Nearby artwork hint badge
      let nearArt = null;
      for (const art of interactiveArtworks) {
        const d = currentPos.distanceTo(art.targetLookAt);
        if (d < 3.8) {
          nearArt = art;
          break;
        }
      }
      if (nearArt && !isSeatedOnBench) {
        if (artPromptBadge) {
          artPromptBadge.style.display = 'block';
          artPromptBadge.innerHTML = `<span>🔍 Tap to view Exhibit #${nearArt.index + 1}: ${nearArt.data.title}</span>`;
        }
      } else {
        if (artPromptBadge) artPromptBadge.style.display = 'none';
      }
    } else {
      if (benchPrompt) benchPrompt.style.display = 'none';
      if (artPromptBadge) artPromptBadge.style.display = 'none';
    }

    renderer.render(scene, camera);
  }

  animate();

  // Initial tour trigger
  goToWaypoint(0, 1.2);

  // Resize handler
  function onWindowResize() {
    if (!canvasContainer) return;
    camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    checkOrientationPrompt();
  }
  window.addEventListener('resize', onWindowResize);

  // Landscape Mode & Fullscreen Handling
  const rotateOverlay = container.querySelector('#museumRotateOverlay');
  const btnRotateFullscreen = container.querySelector('#btnRotateFullscreen');
  const btnRotateDismiss = container.querySelector('#btnRotateDismiss');
  const btnFullscreenToggle = container.querySelector('#btnFullscreenToggle');
  const fullscreenIcon = container.querySelector('#fullscreenIcon');

  let userDismissedPortrait = false;

  function isPortraitMode() {
    return window.innerHeight > window.innerWidth;
  }

  function checkOrientationPrompt() {
    if (!rotateOverlay) return;
    // Never prompt inside studio editor mode or preview container
    if (window.isCelebrationEditorMode || 
        container.closest('.preview-frame-container') || 
        container.closest('.studio-preview-pane') || 
        container.closest('.studio-layout') ||
        document.body.classList.contains('is-editor-mode')) {
      rotateOverlay.style.display = 'none';
      return;
    }
    const isPortrait = isPortraitMode();
    // Only prompt if in portrait and user hasn't explicitly dismissed it for this session
    if (isPortrait && !userDismissedPortrait) {
      rotateOverlay.style.display = 'flex';
      gsap.fromTo(rotateOverlay.querySelector('.rotate-card'),
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    } else {
      rotateOverlay.style.display = 'none';
    }
  }

  // Request Fullscreen & Landscape Screen Lock
  async function triggerFullscreenAndLandscape() {
    soundFx.sparkle();
    const docEl = document.documentElement;
    try {
      if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
        if (req) {
          await req.call(docEl);
        }
      }
    } catch (e) {
      console.warn('Fullscreen request:', e);
    }

    try {
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape').catch(() => {});
      }
    } catch (e) {
      console.warn('Orientation lock:', e);
    }

    // Hide prompt
    if (rotateOverlay) rotateOverlay.style.display = 'none';
    userDismissedPortrait = true;
  }

  btnRotateFullscreen?.addEventListener('click', triggerFullscreenAndLandscape);

  btnRotateDismiss?.addEventListener('click', () => {
    soundFx.pop(400);
    userDismissedPortrait = true;
    if (rotateOverlay) rotateOverlay.style.display = 'none';
  });

  // Fullscreen header button
  function toggleFullscreen() {
    soundFx.pop(540);
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      const docEl = document.documentElement;
      const req = docEl.requestFullscreen || docEl.webkitRequestFullscreen || docEl.mozRequestFullScreen || docEl.msRequestFullscreen;
      if (req) req.call(docEl).catch(() => {});
      try {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock('landscape').catch(() => {});
        }
      } catch (e) {}
    } else {
      const exit = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
      if (exit) exit.call(document).catch(() => {});
    }
  }

  btnFullscreenToggle?.addEventListener('click', toggleFullscreen);

  function updateFullscreenIcon() {
    const isFs = Boolean(document.fullscreenElement || document.webkitFullscreenElement);
    if (fullscreenIcon) {
      fullscreenIcon.textContent = isFs ? '✕' : '⛶';
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenIcon);
  document.addEventListener('webkitfullscreenchange', updateFullscreenIcon);

  // Check orientation on mount & orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      onWindowResize();
      checkOrientationPrompt();
    }, 200);
  });

  // Initial check
  checkOrientationPrompt();

  // Cleanup handler when switching templates
  container._museumCleanup = () => {
    cancelAnimationFrame(animationFrameId);
    clearTimeout(tourAdvanceTimeout);
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('fullscreenchange', updateFullscreenIcon);
    document.removeEventListener('webkitfullscreenchange', updateFullscreenIcon);

    if (multiplayer) {
      multiplayer.destroy();
      multiplayer = null;
    }
    if (localAvatar) {
      scene.remove(localAvatar.group);
      localAvatar.dispose();
      localAvatar = null;
    }
    peerAvatarsMap.forEach((val) => {
      scene.remove(val.avatar.group);
      val.avatar.dispose();
    });
    peerAvatarsMap.clear();

    renderer.dispose();
  };
}
