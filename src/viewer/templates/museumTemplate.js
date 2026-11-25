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
        <div class="proposal-modal-backdrop"></div>
        <div class="proposal-modal-card" id="proposalCard">
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
  // FREE WALK CONTROLLER (WASD / Joystick + Look)
  // --------------------------------------------------------------------------
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  let walkYaw = 0;
  let walkPitch = 0;
  const moveDirection = { forward: 0, right: 0 };
  const keysDown = {};

  function setMode(mode) {
    currentMode = mode;
    clearTimeout(tourAdvanceTimeout);

    if (mode === 'tour') {
      btnTourMode?.classList.add('active');
      btnWalkMode?.classList.remove('active');
      museumTourDock.style.display = 'block';
      mobileControls.style.display = 'none';
      desktopHint.style.display = 'none';
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
      // Initialize walk orientation from current camera position
      walkYaw = Math.atan2(currentLookAtTarget.x - camera.position.x, currentLookAtTarget.z - camera.position.z);
      walkPitch = 0;
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
    if (currentMode !== 'walk') return;
    isPointerDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPointerDragging || currentMode !== 'walk') return;
    const dx = e.clientX - prevMouseX;
    const dy = e.clientY - prevMouseY;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;

    walkYaw -= dx * 0.004;
    walkPitch -= dy * 0.003;
    walkPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, walkPitch));
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
        } else if (touch.identifier === lookTouchId && currentMode === 'walk') {
          const dx = touch.clientX - prevTouchLookX;
          const dy = touch.clientY - prevTouchLookY;
          prevTouchLookX = touch.clientX;
          prevTouchLookY = touch.clientY;
          walkYaw -= dx * 0.005;
          walkPitch -= dy * 0.004;
          walkPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, walkPitch));
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
  const btnProposalYes = container.querySelector('#btnProposalYes');
  const btnProposalNo = container.querySelector('#btnProposalNo');
  const proposalActionRow = container.querySelector('#proposalActionRow');
  const proposalCelebrateBox = container.querySelector('#proposalCelebrateBox');
  const btnCelebrateDone = container.querySelector('#btnCelebrateDone');

  function showProposalModal() {
    proposalModal.style.display = 'flex';
    gsap.fromTo('#proposalCard',
      { scale: 0.85, opacity: 0, y: 40 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.4)' }
    );
  }

  function hideProposalModal() {
    gsap.to('#proposalCard', {
      scale: 0.9,
      opacity: 0,
      y: 30,
      duration: 0.3,
      onComplete: () => {
        proposalModal.style.display = 'none';
      }
    });
  }

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
  const walkSpeed = 0.085;
  let footstepTimer = 0;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    // If in Free Walk Mode, process movement
    if (currentMode === 'walk') {
      let forwardDelta = 0;
      let strafeDelta = 0;

      // Keyboard input
      if (keysDown['w'] || keysDown['arrowup']) forwardDelta += 1;
      if (keysDown['s'] || keysDown['arrowdown']) forwardDelta -= 1;
      if (keysDown['a'] || keysDown['arrowleft']) strafeDelta -= 1;
      if (keysDown['d'] || keysDown['arrowright']) strafeDelta += 1;

      // Add mobile joystick input
      forwardDelta += moveDirection.forward;
      strafeDelta += moveDirection.right;

      // Normalize if diagonal
      const mag = Math.hypot(forwardDelta, strafeDelta);
      if (mag > 0.05) {
        const normFwd = (forwardDelta / Math.max(1, mag)) * walkSpeed;
        const normStf = (strafeDelta / Math.max(1, mag)) * walkSpeed;

        const sinYaw = Math.sin(walkYaw);
        const cosYaw = Math.cos(walkYaw);

        camera.position.x += normFwd * sinYaw + normStf * cosYaw;
        camera.position.z += normFwd * cosYaw - normStf * sinYaw;

        // Collision bounds (keep inside gallery hall)
        camera.position.x = Math.max(-hallWidth / 2 + 1.2, Math.min(hallWidth / 2 - 1.2, camera.position.x));
        camera.position.z = Math.max(rotundaZ + 2.0, Math.min(6.2, camera.position.z));
        camera.position.y = 1.7; // Human eye-level

        // Gentle footstep sounds
        footstepTimer += 1;
        if (footstepTimer % 24 === 0) {
          soundFx.pop(220);
        }
      }

      // Update camera lookAt vector based on walkYaw and walkPitch
      const lookDist = 5;
      currentLookAtTarget.set(
        camera.position.x + Math.sin(walkYaw) * Math.cos(walkPitch) * lookDist,
        camera.position.y + Math.sin(walkPitch) * lookDist,
        camera.position.z + Math.cos(walkYaw) * Math.cos(walkPitch) * lookDist
      );
      camera.lookAt(currentLookAtTarget);
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
    renderer.dispose();
  };
}
