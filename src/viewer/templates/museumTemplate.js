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
import { getMediaFromIndexedDB } from '../../models/siteStorage.js';

// Procedural Canvas Texture Generator for French Herringbone / Parquet Wood Floor
function createParquetTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Warm blonde European museum oak base
  ctx.fillStyle = '#614d3b';
  ctx.fillRect(0, 0, 1024, 1024);

  const tileW = 64;
  const tileH = 16;
  const rows = Math.ceil(1024 / tileH);
  const cols = Math.ceil(1024 / tileW);

  // Parquet wood slats with refined tonal variations and satin finish
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * tileW;
      const y = r * tileH;
      const toneVariance = Math.floor((Math.sin(r * 12.3 + c * 33.7) * 0.5 + 0.5) * 42);
      const rVal = 102 + toneVariance;
      const gVal = 78 + Math.floor(toneVariance * 0.82);
      const bVal = 58 + Math.floor(toneVariance * 0.65);

      ctx.fillStyle = `rgb(${rVal}, ${gVal}, ${bVal})`;
      ctx.fillRect(x, y, tileW - 1, tileH - 1);

      // Fine wood grain lines
      ctx.strokeStyle = `rgba(45, 30, 18, 0.28)`;
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
  const grad = ctx.createRadialGradient(512, 512, 120, 512, 512, 750);
  grad.addColorStop(0, 'rgba(255, 248, 235, 0.12)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 48);
  return texture;
}

// Procedural Canvas Texture for Entrance Brass Plaque (High-Res 2048x1536)
function drawPlaqueCanvas(canvas, ctx, title, subtitle, dedication, sender, date) {
  const W = 2048;
  const H = 1536;
  canvas.width = W;
  canvas.height = H;

  // Rich metallic brushed brass gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, '#f5dfa2');
  grad.addColorStop(0.2, '#d4af37');
  grad.addColorStop(0.4, '#fff4cb');
  grad.addColorStop(0.65, '#c59a27');
  grad.addColorStop(0.85, '#e8c25e');
  grad.addColorStop(1, '#a67c1e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Fine brushed horizontal metal grain
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.16)';
  ctx.lineWidth = 2;
  for (let i = 0; i < H; i += 4) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(W, i);
    ctx.stroke();
  }

  // Deep engraved dark streaks for realistic brass depth
  ctx.strokeStyle = 'rgba(70, 48, 8, 0.09)';
  ctx.lineWidth = 2;
  for (let i = 2; i < H; i += 8) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(W, i);
    ctx.stroke();
  }

  // Triple architectural engraved borders
  // Outer deep groove
  ctx.strokeStyle = '#4a3309';
  ctx.lineWidth = 18;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  // Bevel highlight
  ctx.strokeStyle = 'rgba(255, 248, 220, 0.85)';
  ctx.lineWidth = 6;
  ctx.strokeRect(76, 76, W - 152, H - 152);

  // Inner dark inset
  ctx.strokeStyle = '#634b18';
  ctx.lineWidth = 4;
  ctx.strokeRect(92, 92, W - 184, H - 184);

  // 4 Heavy Brass Corner Bolts with specular highlights
  const boltRadius = 26;
  const boltOffsets = [
    [104, 104],
    [W - 104, 104],
    [104, H - 104],
    [W - 104, H - 104]
  ];
  boltOffsets.forEach(([bx, by]) => {
    ctx.fillStyle = '#2b1b05';
    ctx.beginPath();
    ctx.arc(bx, by, boltRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fce49b';
    ctx.beginPath();
    ctx.arc(bx - 5, by - 5, boltRadius * 0.55, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#1a1003';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(bx - 14, by);
    ctx.lineTo(bx + 14, by);
    ctx.stroke();
  });

  // Typography Settings
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 1. Classical Crest / Embellishment
  ctx.fillStyle = '#3a2707';
  ctx.font = 'bold 64px "Cinzel", "Times New Roman", serif';
  ctx.fillText('🏛️', W / 2, 220);

  // 2. Museum Latin Header
  ctx.font = 'bold 46px "Cinzel", "Times New Roman", serif';
  ctx.fillStyle = '#3d2b09';
  ctx.fillText('GALLERIA D’AMORE', W / 2, 310);

  // Subtle engraved gold divider
  ctx.strokeStyle = '#5a3f12';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 280, 355);
  ctx.lineTo(W / 2 + 280, 355);
  ctx.stroke();

  ctx.fillStyle = '#7a5a1e';
  ctx.beginPath();
  ctx.arc(W / 2, 355, 6, 0, Math.PI * 2);
  ctx.fill();

  // 3. Exhibition Title (Deep Engraved Chiseled Look)
  ctx.fillStyle = '#221603';
  ctx.font = 'bold 84px "Cinzel", "Playfair Display", "Georgia", serif';
  const displayTitle = (title || 'THE MUSEUM OF US').toUpperCase();
  ctx.fillText(displayTitle, W / 2, 470);

  // 4. Subtitle / Dedication Header
  ctx.fillStyle = '#5c4212';
  ctx.font = 'italic 50px "Playfair Display", "Georgia", serif';
  ctx.fillText(subtitle || 'Dedicated to My Beloved', W / 2, 570);

  // 5. Dedication Paragraph Text (Word-wrapped with elegant leading)
  ctx.fillStyle = '#2b1d06';
  ctx.font = '42px "Playfair Display", "Georgia", serif';
  const text = dedication || 'A curated exhibition of our smiles, quiet nights, and an eternal love that words could never hold.';
  const words = text.split(' ');
  let currentLine = '';
  let lineY = 710;
  const maxLineWidth = 1600;
  const lineHeight = 68;

  for (let n = 0; n < words.length; n++) {
    const testLine = currentLine + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxLineWidth && n > 0) {
      ctx.fillText(currentLine.trim(), W / 2, lineY);
      currentLine = words[n] + ' ';
      lineY += lineHeight;
    } else {
      currentLine = testLine;
    }
  }
  ctx.fillText(currentLine.trim(), W / 2, lineY);

  // Divider above Curator Credits
  ctx.strokeStyle = 'rgba(90, 63, 18, 0.4)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 350, 1220);
  ctx.lineTo(W / 2 + 350, 1220);
  ctx.stroke();

  // 6. Curator Tag & Author
  ctx.fillStyle = '#422e0a';
  ctx.font = 'bold 38px "Cinzel", "Georgia", serif';
  ctx.fillText(`CURATED WITH ENDLESS LOVE BY ${(sender || 'YOURS ALWAYS').toUpperCase()}`, W / 2, 1280);

  // 7. Establishment & Permanent Collection Tag
  ctx.fillStyle = '#664c18';
  ctx.font = 'italic 34px "Cinzel", "Times New Roman", serif';
  ctx.fillText(`${date || 'Est. November 2026'} • PERMANENT ARCHIVAL EXHIBITION`, W / 2, 1345);
}

function createPlaqueTexture(title, subtitle, dedication, sender, date) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  drawPlaqueCanvas(canvas, ctx, title, subtitle, dedication, sender, date);

  const texture = new THREE.CanvasTexture(canvas);
  if ('colorSpace' in texture && THREE.SRGBColorSpace) {
    texture.colorSpace = THREE.SRGBColorSpace;
  }
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      drawPlaqueCanvas(canvas, ctx, title, subtitle, dedication, sender, date);
      texture.needsUpdate = true;
    }).catch(() => {});
  }

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

// Procedural Wall Plaster / Paint texture with architectural micro-grain (Gallery White)
function createWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Pristine Architectural Museum Gallery White
  ctx.fillStyle = '#faf9f6';
  ctx.fillRect(0, 0, 1024, 1024);

  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const grain = (Math.random() - 0.5) * 6;
    d[i] = Math.min(255, Math.max(0, d[i] + grain));
    d[i + 1] = Math.min(255, Math.max(0, d[i + 1] + grain));
    d[i + 2] = Math.min(255, Math.max(0, d[i + 2] + grain));
  }
  ctx.putImageData(imgData, 0, 0);

  // Very subtle vertical roller variation
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.fillRect(0, 0, 1024, 1024);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 8);
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
          <button type="button" class="btn-museum-mode-toggle mode-tour" id="btnModeToggle" title="Current: Guided Tour • Tap to switch to Free Walk">
            <span class="mode-icon" id="modeToggleIcon">🧭</span>
            <span class="mode-label" id="modeToggleLabel">Guided Tour</span>
            <span class="mode-toggle-arrow">⇄</span>
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
        <div class="museum-stand-prompt" id="standPrompt" style="display:none; flex-direction:column; align-items:center; gap:8px;">
          <div class="bench-movie-hud" id="benchMovieHud" style="background:rgba(18,14,12,0.88); border:1.5px solid rgba(212,175,55,0.45); border-radius:16px; padding:8px 16px; font-size:12px; color:#f5e6ca; backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); box-shadow:0 8px 24px rgba(0,0,0,0.6); display:none; align-items:center; gap:8px; max-width:100%; text-align:center;">
            <span id="benchMovieHudIcon" style="font-size:15px;">🎬</span>
            <span id="benchMovieHudText" style="font-weight:600; line-height:1.3;">Waiting for partner to sit beside you to start our movie...</span>
            <button type="button" id="btnSoloMoviePreview" title="Preview movie now" style="display:none; background:rgba(212,175,55,0.25); border:1px solid #d4af37; color:#ffd700; border-radius:12px; padding:3px 10px; font-size:11px; font-weight:700; cursor:pointer; flex-shrink:0;">▶️ Preview</button>
            <button type="button" id="btnMovieUnmute" title="Unmute movie audio" style="display:none; background:rgba(212,35,92,0.3); border:1px solid #f472b6; color:#fff; border-radius:12px; padding:3px 10px; font-size:11px; font-weight:700; cursor:pointer; flex-shrink:0;">🔊 Unmute</button>
          </div>
          <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
            <button type="button" class="btn-stand-bench" id="btnStandBench" title="Stand up and continue walking">
              <span class="stand-icon">🚶</span>
              <span>Stand Up & Explore</span>
            </button>
            <button type="button" class="btn-open-proposal-bench" id="btnOpenProposalBench" title="Read The Masterpiece Proposal">
              <span>💍 The Proposal</span>
            </button>
          </div>
        </div>
        <div class="museum-art-prompt-badge" id="artPromptBadge" style="display:none;">
          <span>🔍 Tap artwork to inspect</span>
        </div>
      </div>

      <!-- Pop-Out Interactive Actions (Right Down Corner Pop-Out Drawer) -->
      <div class="museum-corner-interact" id="cornerInteractZone" style="display:none;">
        <!-- Popped-Out Action Drawer Panel (Initially popped in) -->
        <div class="museum-multiplayer-dock" id="multiplayerDock" style="display:none;">
          <div class="dock-panel-top">
            <div class="multiplayer-status-pill" id="multiStatusPill">
              <span class="pulse-indicator"></span>
              <span id="multiStatusText">Exploring Solo</span>
              <span class="peer-count-badge" id="peerCountBadge" style="display:none;">1</span>
            </div>
            <div class="multi-avatar-badge" id="multiAvatarBadge">
              <span class="my-avatar-tag" id="myAvatarTag">👦 You</span>
            </div>
            <button type="button" class="btn-close-dock-panel" id="btnCloseDockPanel" title="Pop In Menu">✕</button>
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
        </div>

        <!-- Floating Pop-Out Trigger Button in Right Down Corner -->
        <button type="button" class="btn-dock-launcher" id="btnToggleDock" title="Open Interactive Actions">
          <span class="launcher-pulse-dot" id="launcherPulseDot"></span>
          <span class="launcher-icon" id="launcherIcon">✨</span>
          <span class="launcher-label" id="launcherLabel">Actions</span>
          <span class="launcher-peer-badge" id="launcherPeerBadge" style="display:none;">1</span>
        </button>
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
  scene.background = new THREE.Color(0xf6f5f2);
  scene.fog = new THREE.Fog(0xf5f4f0, 45, 220);

  const camera = new THREE.PerspectiveCamera(
    60,
    canvasContainer.clientWidth / canvasContainer.clientHeight,
    0.1,
    250
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  canvasContainer.appendChild(renderer.domElement);

  // Museum Ambient & Architectural Sky Lighting
  const ambientLight = new THREE.AmbientLight(0xfff8ee, 0.9);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe8e2d8, 0.7);
  hemiLight.position.set(0, 18, 0);
  scene.add(hemiLight);

  // Gallery Dimensions (Grand Monumental Museum Wing)
  const hallWidth = 18;
  const hallHeight = 8.2;
  const artworkSpacing = 14;
  const totalArtworks = artworks.length;
  const hallLength = Math.max(90, (totalArtworks / 2 + 2) * artworkSpacing + 35);
  const rotundaZ = -(hallLength - 16);
  const benchZ = rotundaZ + 9.5;
  const cinemaZ = rotundaZ + 0.25;

  // 1. Floor Mesh (French Blonde Oak Herringbone Parquet with Satin Sheen)
  const floorTexture = createParquetTexture();
  const floorGeo = new THREE.PlaneGeometry(hallWidth * 2.5, hallLength + 60);
  const floorMat = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.22,
    metalness: 0.04
  });
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.position.set(0, 0, -hallLength / 2 + 5);
  scene.add(floorMesh);

  // 2. Ceiling Mesh (Pristine White Architectural Ceiling with Central Skylights)
  const ceilingGeo = new THREE.PlaneGeometry(hallWidth * 2.5, hallLength + 60);
  const ceilingMat = new THREE.MeshStandardMaterial({
    color: 0xfcfbfa,
    roughness: 0.92
  });
  const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
  ceilingMesh.rotation.x = Math.PI / 2;
  ceilingMesh.position.set(0, hallHeight, -hallLength / 2 + 5);
  scene.add(ceilingMesh);

  // Central Frosted Glass Skylight Grid (diffused natural daylight)
  const skylightW = 5.2;
  const skylightGeo = new THREE.PlaneGeometry(skylightW, hallLength + 20);
  const skylightMat = new THREE.MeshStandardMaterial({
    color: 0xedf5fa,
    roughness: 0.28,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
    emissive: 0x22272e
  });
  const skylightMesh = new THREE.Mesh(skylightGeo, skylightMat);
  skylightMesh.rotation.x = Math.PI / 2;
  skylightMesh.position.set(0, hallHeight - 0.02, -hallLength / 2 + 5);
  scene.add(skylightMesh);

  // Skylight bronze architectural mullion frames
  const mullionGeo = new THREE.BoxGeometry(0.12, 0.08, hallLength + 20);
  const mullionMat = new THREE.MeshStandardMaterial({ color: 0x231d18, metalness: 0.75, roughness: 0.3 });
  const mulL = new THREE.Mesh(mullionGeo, mullionMat);
  mulL.position.set(-skylightW / 2, hallHeight - 0.03, -hallLength / 2 + 5);
  scene.add(mulL);
  const mulR = new THREE.Mesh(mullionGeo, mullionMat);
  mulR.position.set(skylightW / 2, hallHeight - 0.03, -hallLength / 2 + 5);
  scene.add(mulR);

  // Transverse Skylight Ribs spaced along the hall
  for (let sz = 6; sz >= rotundaZ - 4; sz -= 7) {
    const rib = new THREE.Mesh(new THREE.BoxGeometry(skylightW, 0.08, 0.12), mullionMat);
    rib.position.set(0, hallHeight - 0.03, sz);
    scene.add(rib);
  }

  // Soft Natural Daylight Downlights along center spine
  for (let lz = 2; lz >= rotundaZ + 8; lz -= 20) {
    const skyDownlight = new THREE.PointLight(0xfffdf7, 1.35, 38, 1.15);
    skyDownlight.position.set(0, hallHeight - 0.4, lz);
    scene.add(skyDownlight);
  }

  // 3. Dual Track Lights Rails along Ceiling
  const trackGeo = new THREE.BoxGeometry(0.22, 0.12, hallLength + 30);
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x181818, metalness: 0.88, roughness: 0.25 });
  const trackLeft = new THREE.Mesh(trackGeo, trackMat);
  trackLeft.position.set(-hallWidth / 2 + 3.4, hallHeight - 0.08, -hallLength / 2 + 5);
  scene.add(trackLeft);

  const trackRight = new THREE.Mesh(trackGeo, trackMat);
  trackRight.position.set(hallWidth / 2 - 3.4, hallHeight - 0.08, -hallLength / 2 + 5);
  scene.add(trackRight);

  // 4. White Walls (Pristine Architectural Gallery White)
  const wallTexture = createWallTexture();
  const wallMat = new THREE.MeshStandardMaterial({
    map: wallTexture,
    color: 0xffffff,
    roughness: 0.92,
    metalness: 0.01
  });

  // Left Wall
  const sideWallGeo = new THREE.PlaneGeometry(hallLength + 40, hallHeight);
  const leftWall = new THREE.Mesh(sideWallGeo, wallMat);
  leftWall.position.set(-hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
  leftWall.rotation.y = Math.PI / 2;
  scene.add(leftWall);

  // Right Wall
  const rightWall = new THREE.Mesh(sideWallGeo, wallMat);
  rightWall.position.set(hallWidth / 2, hallHeight / 2, -hallLength / 2 + 5);
  rightWall.rotation.y = -Math.PI / 2;
  scene.add(rightWall);

  // Entrance Back Wall (behind player at start)
  const entranceWallGeo = new THREE.PlaneGeometry(hallWidth, hallHeight);
  const entranceBackWall = new THREE.Mesh(entranceWallGeo, wallMat);
  entranceBackWall.position.set(0, hallHeight / 2, 8.5);
  entranceBackWall.rotation.y = Math.PI;
  scene.add(entranceBackWall);

  // 3D Architectural Pilasters between Artwork bays along Left & Right walls
  const pilasterGeo = new THREE.BoxGeometry(0.72, hallHeight, 0.32);
  const pilasterMat = new THREE.MeshStandardMaterial({ color: 0xfbfbfa, roughness: 0.9 });
  const pilasterGoldTrimMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.75, roughness: 0.3 });

  const numPilasters = Math.ceil(totalArtworks / 2) + 2;
  for (let p = 0; p <= numPilasters; p++) {
    const pz = - (p * artworkSpacing + 2.0);
    if (pz < rotundaZ + 4) continue;

    // Left Pilaster
    const pLeft = new THREE.Mesh(pilasterGeo, pilasterMat);
    pLeft.position.set(-hallWidth / 2 + 0.16, hallHeight / 2, pz);
    scene.add(pLeft);

    const trimL = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.08, 0.36), pilasterGoldTrimMat);
    trimL.position.set(-hallWidth / 2 + 0.16, hallHeight - 0.5, pz);
    scene.add(trimL);

    // Right Pilaster
    const pRight = new THREE.Mesh(pilasterGeo, pilasterMat);
    pRight.position.set(hallWidth / 2 - 0.16, hallHeight / 2, pz);
    scene.add(pRight);

    const trimR = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.08, 0.36), pilasterGoldTrimMat);
    trimR.position.set(hallWidth / 2 - 0.16, hallHeight - 0.5, pz);
    scene.add(trimR);
  }

  // Luxury Two-Tier Carrara Marble & Gold Baseboards
  const baseboardGeo = new THREE.BoxGeometry(0.12, 0.45, hallLength + 40);
  const baseboardMat = new THREE.MeshStandardMaterial({ color: 0xf5f4f0, roughness: 0.4, metalness: 0.08 });
  const bbLeft = new THREE.Mesh(baseboardGeo, baseboardMat);
  bbLeft.position.set(-hallWidth / 2 + 0.06, 0.225, -hallLength / 2 + 5);
  scene.add(bbLeft);

  const bbRight = new THREE.Mesh(baseboardGeo, baseboardMat);
  bbRight.position.set(hallWidth / 2 - 0.06, 0.225, -hallLength / 2 + 5);
  scene.add(bbRight);

  // Continuous Architectural Crown Molding along Ceiling Edges
  const crownGeo = new THREE.BoxGeometry(0.16, 0.25, hallLength + 40);
  const crownMat = new THREE.MeshStandardMaterial({ color: 0xfcfbfa, roughness: 0.9 });
  const crownL = new THREE.Mesh(crownGeo, crownMat);
  crownL.position.set(-hallWidth / 2 + 0.08, hallHeight - 0.125, -hallLength / 2 + 5);
  scene.add(crownL);

  const crownR = new THREE.Mesh(crownGeo, crownMat);
  crownR.position.set(hallWidth / 2 - 0.08, hallHeight - 0.125, -hallLength / 2 + 5);
  scene.add(crownR);

  // 5. Entrance Dedication Plaque on Entrance Feature Wall
  const entrancePlaqueTexture = createPlaqueTexture(
    museumTitle,
    museumSubtitle,
    museumDedication,
    senderName,
    establishmentDate
  );

  const entrancePlaqueGroup = new THREE.Group();
  entrancePlaqueGroup.position.set(0, 3.6, 4.2);
  entrancePlaqueGroup.rotation.y = Math.PI; // Face towards camera at z = -1.2 (pointing down -Z)

  // Outer Gilded Gold Frame (Mounting backplate)
  const plaqueFrameGeo = new THREE.BoxGeometry(5.8, 4.4, 0.12);
  const plaqueFrameMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.82,
    roughness: 0.28
  });
  const plaqueFrame = new THREE.Mesh(plaqueFrameGeo, plaqueFrameMat);
  plaqueFrame.position.set(0, 0, -0.06); // Pushed back so it acts as back-frame!
  entrancePlaqueGroup.add(plaqueFrame);

  // Raised Inner Bevel Border
  const innerBevelGeo = new THREE.BoxGeometry(5.5, 4.1, 0.08);
  const innerBevelMat = new THREE.MeshStandardMaterial({
    color: 0x8a6e27,
    metalness: 0.75,
    roughness: 0.35
  });
  const innerBevel = new THREE.Mesh(innerBevelGeo, innerBevelMat);
  innerBevel.position.set(0, 0, -0.02);
  entrancePlaqueGroup.add(innerBevel);

  // Brushed Brass Dedication Plate with Engraved Typography
  const plaqueMat = new THREE.MeshStandardMaterial({
    map: entrancePlaqueTexture,
    metalness: 0.55,
    roughness: 0.35,
    side: THREE.FrontSide
  });
  const plaquePlateGeo = new THREE.PlaneGeometry(5.3, 3.9);
  const entrancePlaque = new THREE.Mesh(plaquePlateGeo, plaqueMat);
  entrancePlaque.position.set(0, 0, 0.03); // In front of frame!
  entrancePlaqueGroup.add(entrancePlaque);

  // 4 Corner Architectural Brass Mounting Bolts (3D details)
  const boltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.08, 16);
  boltGeo.rotateX(Math.PI / 2);
  const boltMat = new THREE.MeshStandardMaterial({ color: 0x4a370e, metalness: 0.9, roughness: 0.2 });
  [
    [-2.45, 1.75],
    [2.45, 1.75],
    [-2.45, -1.75],
    [2.45, -1.75]
  ].forEach(([bx, by]) => {
    const bolt = new THREE.Mesh(boltGeo, boltMat);
    bolt.position.set(bx, by, 0.045);
    entrancePlaqueGroup.add(bolt);
  });

  scene.add(entrancePlaqueGroup);

  // Dual Ceiling Museum Framing Spotlights aimed at Entrance Plaque
  const plaqueSpotTarget = new THREE.Object3D();
  plaqueSpotTarget.position.set(0, 3.6, 4.2);
  scene.add(plaqueSpotTarget);

  const plaqueSpotL = new THREE.SpotLight(0xfff5e4, 4.5, 18, Math.PI / 4.8, 0.58, 1.15);
  plaqueSpotL.position.set(-2.2, hallHeight - 0.25, 1.2);
  plaqueSpotL.target = plaqueSpotTarget;
  scene.add(plaqueSpotL);

  const plaqueSpotR = new THREE.SpotLight(0xfff5e4, 4.5, 18, Math.PI / 4.8, 0.58, 1.15);
  plaqueSpotR.position.set(2.2, hallHeight - 0.25, 1.2);
  plaqueSpotR.target = plaqueSpotTarget;
  scene.add(plaqueSpotR);

  // 6. Framed Artworks along Left and Right walls
  const interactiveArtworks = [];
  const textureLoader = new THREE.TextureLoader();
  textureLoader.setCrossOrigin('anonymous');

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
    const zPos = - (pairIndex * artworkSpacing + 9.0);
    const xPos = isLeft ? (-hallWidth / 2 + 0.18) : (hallWidth / 2 - 0.18);
    const rotY = isLeft ? Math.PI / 2 : -Math.PI / 2;

    const group = new THREE.Group();
    group.position.set(xPos, 3.2, zPos);
    group.rotation.y = rotY;

    // Outer Grand Beveled Gold Frame (4.2m x 3.1m)
    const frameW = 4.2;
    const frameH = 3.1;
    const frameDepth = 0.16;
    const outerFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameW, frameH, frameDepth),
      goldFrameMat
    );
    group.add(outerFrame);

    // Archival Museum White Mat Passe-partout
    const matMesh = new THREE.Mesh(
      new THREE.BoxGeometry(frameW - 0.35, frameH - 0.35, frameDepth + 0.02),
      matBorderMat
    );
    group.add(matMesh);

    // Canvas Image
    const canvasW = frameW - 0.85;
    const canvasH = frameH - 0.85;
    const canvasGeo = new THREE.PlaneGeometry(canvasW, canvasH);

    const canvasMat = new THREE.MeshStandardMaterial({
      roughness: 0.38,
      metalness: 0.02
    });

    // Load photo texture with robust asynchronous onLoad & fallback
    const photoTexture = textureLoader.load(
      art.image,
      (loadedTex) => {
        if ('colorSpace' in loadedTex && THREE.SRGBColorSpace) {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
        }
        loadedTex.generateMipmaps = true;
        loadedTex.needsUpdate = true;
        canvasMat.map = loadedTex;
        canvasMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.warn('Artwork texture load error, falling back to /images/sunset.jpg:', art.image, err);
        textureLoader.load('/images/sunset.jpg', (fallbackTex) => {
          if ('colorSpace' in fallbackTex && THREE.SRGBColorSpace) {
            fallbackTex.colorSpace = THREE.SRGBColorSpace;
          }
          canvasMat.map = fallbackTex;
          canvasMat.needsUpdate = true;
        });
      }
    );
    canvasMat.map = photoTexture;

    const canvasMesh = new THREE.Mesh(canvasGeo, canvasMat);
    canvasMesh.position.z = frameDepth / 2 + 0.04;
    group.add(canvasMesh);

    // Brass Curatorial Placard below Frame
    const placardTex = createPlacardTexture(index, art.title, art.date);
    const placardMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 0.55, 0.05),
      new THREE.MeshStandardMaterial({ map: placardTex, metalness: 0.72, roughness: 0.32 })
    );
    placardMesh.position.set(0, -frameH / 2 - 0.5, 0.04);
    group.add(placardMesh);

    // Dedicated targets for spotlights so meshes are NEVER detached from their parent group
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(xPos, 3.2, zPos);
    scene.add(spotTarget);

    const placardTarget = new THREE.Object3D();
    placardTarget.position.set(xPos, 3.2 - frameH / 2 - 0.5, zPos);
    scene.add(placardTarget);

    // Dedicated Ceiling Museum Track Projector Spotlight (30° angle down to canvas)
    const spotX = isLeft ? (-hallWidth / 2 + 3.4) : (hallWidth / 2 - 3.4);
    const spotLight = new THREE.SpotLight(0xfff8ee, 5.5, 22, Math.PI / 5.2, 0.65, 1.15);
    spotLight.position.set(spotX, hallHeight - 0.15, zPos);
    spotLight.target = spotTarget;
    scene.add(spotLight);

    // Pin-spot accent on Placard
    const pinSpot = new THREE.SpotLight(0xffedd2, 2.2, 14, Math.PI / 7, 0.5, 1.2);
    pinSpot.position.set(spotX, hallHeight - 0.25, zPos);
    pinSpot.target = placardTarget;
    scene.add(pinSpot);

    // 3D Track Lighting Fixture Body on the ceiling rail
    const fixtureGroup = new THREE.Group();
    fixtureGroup.position.set(spotX, hallHeight - 0.08, zPos);
    const fixtureBase = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.24), trackMat);
    const fixtureCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.32, 14), trackMat);
    fixtureCyl.rotation.z = isLeft ? -0.45 : 0.45;
    fixtureCyl.position.y = -0.15;
    fixtureGroup.add(fixtureBase);
    fixtureGroup.add(fixtureCyl);
    scene.add(fixtureGroup);

    scene.add(group);

    // Store metadata for raycasting & interaction
    interactiveArtworks.push({
      mesh: canvasMesh,
      frameGroup: group,
      data: art,
      index,
      lookPosition: new THREE.Vector3(
        isLeft ? xPos + 4.2 : xPos - 4.2,
        3.0,
        zPos
      ),
      targetLookAt: new THREE.Vector3(xPos, 3.0, zPos)
    });
  });

  // 7. Grand Centerpiece Rotunda & Cinema Amphitheater
  const rotundaWallGeo = new THREE.PlaneGeometry(hallWidth * 2.2, hallHeight);
  const backWall = new THREE.Mesh(rotundaWallGeo, wallMat);
  backWall.position.set(0, hallHeight / 2, rotundaZ);
  scene.add(backWall);

  // Grand Centerpiece Cinema Screen (10.8m x 6.4m)
  const screenW = 10.8;
  const screenH = 6.4;
  const cinemaScreenGroup = new THREE.Group();
  cinemaScreenGroup.position.set(0, 4.2, cinemaZ);

  const cinemaFrame = new THREE.Mesh(
    new THREE.BoxGeometry(screenW + 0.6, screenH + 0.6, 0.18),
    goldFrameMat
  );
  cinemaScreenGroup.add(cinemaFrame);

  const cpCanvasMat = new THREE.MeshStandardMaterial({
    roughness: 0.35,
    metalness: 0.05
  });

  const centerpieceTex = textureLoader.load(
    centerpieceImage,
    (loadedTex) => {
      if ('colorSpace' in loadedTex && THREE.SRGBColorSpace) {
        loadedTex.colorSpace = THREE.SRGBColorSpace;
      }
      loadedTex.generateMipmaps = true;
      loadedTex.needsUpdate = true;
      cpCanvasMat.map = loadedTex;
      cpCanvasMat.needsUpdate = true;
    },
    undefined,
    (err) => {
      console.warn("Failed to load centerpiece image:", centerpieceImage, err);
      textureLoader.load('/images/queen.jpg', (fallbackTex) => {
        if ('colorSpace' in fallbackTex && THREE.SRGBColorSpace) {
          fallbackTex.colorSpace = THREE.SRGBColorSpace;
        }
        cpCanvasMat.map = fallbackTex;
        cpCanvasMat.needsUpdate = true;
      });
    }
  );
  cpCanvasMat.map = centerpieceTex;

  const cinemaCanvas = new THREE.Mesh(
    new THREE.PlaneGeometry(screenW, screenH),
    cpCanvasMat
  );
  cinemaCanvas.position.z = 0.14;
  cinemaScreenGroup.add(cinemaCanvas);

  // Cinema Couple Video Element (Synchronized bench movie player)
  let videoSrc = data.centerpieceVideo || '/video/couple_memories.mp4';
  const cinemaVideoElem = document.createElement('video');
  cinemaVideoElem.id = 'museumCinemaVideo';
  cinemaVideoElem.src = videoSrc;
  cinemaVideoElem.crossOrigin = 'anonymous';
  cinemaVideoElem.playsInline = true;
  cinemaVideoElem.webkitPlaysInline = true;
  cinemaVideoElem.loop = true;
  cinemaVideoElem.preload = 'auto';
  cinemaVideoElem.style.display = 'none';
  document.body.appendChild(cinemaVideoElem);

  // If running in browser and user uploaded a local video cached in IndexedDB
  if (typeof window !== 'undefined' && (!data.centerpieceVideo || data.centerpieceVideo.startsWith('blob:'))) {
    getMediaFromIndexedDB('custom_museum_video').then((cachedBlob) => {
      if (cachedBlob && cinemaVideoElem) {
        cinemaVideoElem.src = URL.createObjectURL(cachedBlob);
        cinemaVideoElem.load();
      }
    }).catch((e) => {
      console.warn("Could not retrieve cached video:", e);
    });
  }

  cinemaVideoElem.addEventListener('error', (e) => {
    console.warn("Custom video failed to play from", cinemaVideoElem.src, "falling back to /video/couple_memories.mp4", e);
    if (!cinemaVideoElem.src.endsWith('/video/couple_memories.mp4')) {
      cinemaVideoElem.src = '/video/couple_memories.mp4';
      cinemaVideoElem.load();
    }
  });

  let cinemaVideoTexture = null;
  function getCinemaVideoTexture() {
    if (!cinemaVideoTexture) {
      cinemaVideoTexture = new THREE.VideoTexture(cinemaVideoElem);
      cinemaVideoTexture.minFilter = THREE.LinearFilter;
      cinemaVideoTexture.magFilter = THREE.LinearFilter;
      cinemaVideoTexture.format = THREE.RGBAFormat;
      cinemaVideoTexture.generateMipmaps = false;
      if ('colorSpace' in cinemaVideoTexture && THREE.SRGBColorSpace) {
        cinemaVideoTexture.colorSpace = THREE.SRGBColorSpace;
      }
    }
    return cinemaVideoTexture;
  }

  // Centerpiece Placard
  const cpPlacardTex = createPlacardTexture(99, centerpieceTitle, 'Permanent Masterpiece');
  const cpPlacard = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.7, 0.05),
    new THREE.MeshStandardMaterial({ map: cpPlacardTex, metalness: 0.72, roughness: 0.32 })
  );
  cpPlacard.position.set(0, -screenH / 2 - 0.55, 0.05);
  cinemaScreenGroup.add(cpPlacard);

  scene.add(cinemaScreenGroup);

  // Dedicated spotlight target for Centerpiece screen (never detaches cinemaCanvas)
  const cpSpotTarget = new THREE.Object3D();
  cpSpotTarget.position.set(0, 4.2, cinemaZ);
  scene.add(cpSpotTarget);

  // Centerpiece Ceiling Spotlights (Warm Dramatic Theatrical Spotlight)
  const cpSpot = new THREE.SpotLight(0xfff6e5, 6.5, 30, Math.PI / 4.2, 0.6, 1.1);
  cpSpot.position.set(0, hallHeight - 0.3, benchZ);
  cpSpot.target = cpSpotTarget;
  scene.add(cpSpot);

  // 8. Gallery Tufted Leather Bench in Front of Centerpiece
  const benchGroup = new THREE.Group();
  benchGroup.position.set(0, 0, benchZ);

  const benchSeat = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.48, 1.25),
    new THREE.MeshStandardMaterial({ color: 0x24150e, roughness: 0.42, metalness: 0.08 })
  );
  benchSeat.position.y = 0.55;
  benchGroup.add(benchSeat);

  // Bench walnut & brass legs
  const legGeo = new THREE.CylinderGeometry(0.06, 0.05, 0.35, 12);
  const legMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.85, roughness: 0.28 });
  const legPositions = [
    [-1.9, 0.18, -0.45],
    [1.9, 0.18, -0.45],
    [-1.9, 0.18, 0.45],
    [1.9, 0.18, 0.45]
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
      cameraPos: new THREE.Vector3(0, 3.2, -1.2),
      lookAt: new THREE.Vector3(0, 3.6, 4.2)
    }
  ];

  artworks.forEach((art, idx) => {
    const isLeft = idx % 2 === 0;
    const pairIndex = Math.floor(idx / 2);
    const zPos = - (pairIndex * artworkSpacing + 9.0);
    const xPos = isLeft ? (-hallWidth / 2 + 0.18) : (hallWidth / 2 - 0.18);

    waypoints.push({
      id: `art_${idx}`,
      title: art.title,
      subtitle: art.desc || `Curated Memory: ${art.date}`,
      stepLabel: `EXHIBIT ${String(idx + 1).padStart(2, '0')} OF ${String(artworks.length).padStart(2, '0')}`,
      cameraPos: new THREE.Vector3(
        isLeft ? xPos + 4.2 : xPos - 4.2,
        3.0,
        zPos + (isLeft ? 0.4 : -0.4)
      ),
      lookAt: new THREE.Vector3(xPos, 3.0, zPos),
      artworkIndex: idx
    });
  });

  // Final Waypoint: The Grand Centerpiece Cinema
  waypoints.push({
    id: 'centerpiece',
    title: centerpieceTitle,
    subtitle: proposalQuestion,
    stepLabel: 'THE MASTERPIECE',
    cameraPos: new THREE.Vector3(0, 2.6, benchZ + 2.5),
    lookAt: new THREE.Vector3(0, 4.0, cinemaZ),
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

  const btnModeToggle = container.querySelector('#btnModeToggle');
  const modeToggleIcon = container.querySelector('#modeToggleIcon');
  const modeToggleLabel = container.querySelector('#modeToggleLabel');
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

  const cornerInteractZone = container.querySelector('#cornerInteractZone');
  const btnToggleDock = container.querySelector('#btnToggleDock');
  const btnCloseDockPanel = container.querySelector('#btnCloseDockPanel');
  const launcherIcon = container.querySelector('#launcherIcon');
  const launcherLabel = container.querySelector('#launcherLabel');
  const launcherPeerBadge = container.querySelector('#launcherPeerBadge');
  const multiplayerDock = container.querySelector('#multiplayerDock');
  const multiStatusText = container.querySelector('#multiStatusText');
  const peerCountBadge = container.querySelector('#peerCountBadge');
  const btnDockWave = container.querySelector('#btnDockWave');
  const btnDockHeart = container.querySelector('#btnDockHeart');
  const btnDockChat = container.querySelector('#btnDockChat');
  const btnDockSit = container.querySelector('#btnDockSit');
  const btnDockPropose = container.querySelector('#btnDockPropose');
  const myAvatarTag = container.querySelector('#myAvatarTag');
  let isDockPoppedOut = false;

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
  const peerSeatedMap = new Map(); // userId -> boolean (whether seated on bench)
  let isSoloPreviewMovie = false;
  let isPlayingBenchMovie = false;
  let bgMusicWasPlaying = false;
  let savedBgMusicVol = 1.0;
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
    if (launcherPeerBadge) {
      launcherPeerBadge.textContent = String(peerCount + 1);
      launcherPeerBadge.style.display = peerCount > 0 ? 'inline-flex' : 'none';
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
          if (peer.isSeated) {
            peerSeatedMap.set(userId, true);
            const peerBenchX = peer.gender === 'male' ? -0.75 : 0.75;
            pAvatar.group.position.set(peerBenchX, 0, benchZ);
            pAvatar.group.rotation.y = Math.PI;
            pAvatar.setSeated(true);
          }
          soundFx.sparkle();
        } catch (err) {
          console.error('Failed to spawn peer avatar:', err);
        }
      } else {
        const rec = peerAvatarsMap.get(userId);
        rec.targetPos.set(peer.x || 0, peer.y || 0, peer.z || 3.2);
        rec.targetRotY = peer.rotY || 0;
        rec.isWalking = Boolean(peer.isWalking);
        if (peer.isSeated) {
          peerSeatedMap.set(userId, true);
          rec.avatar.setSeated(true);
        }
      }
    });

    // Remove left peers
    peerAvatarsMap.forEach((val, userId) => {
      if (!peers.has(userId)) {
        scene.remove(val.avatar.group);
        val.avatar.dispose();
        peerAvatarsMap.delete(userId);
        peerSeatedMap.delete(userId);
      }
    });

    if (typeof checkBenchVideoPlayback === 'function') {
      checkBenchVideoPlayback();
    }
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
      peerSeatedMap.set(data.userId, true);
      const peerBenchX = data.gender === 'male' ? -0.75 : 0.75;
      rec.targetPos.set(peerBenchX, 0, benchZ);
      rec.avatar.group.position.set(peerBenchX, 0, benchZ);
      rec.avatar.group.rotation.y = Math.PI;
      rec.avatar.setSeated(true);
      if (typeof checkBenchVideoPlayback === 'function') checkBenchVideoPlayback();
    } else if (data.action === 'stand') {
      peerSeatedMap.delete(data.userId);
      rec.avatar.setSeated(false);
      rec.avatar.group.position.set(0, 0, benchZ + 2.0);
      if (typeof checkBenchVideoPlayback === 'function') checkBenchVideoPlayback();
    } else if (data.action === 'bench_video_sync') {
      if (cinemaVideoElem && typeof data.currentTime === 'number') {
        if (Math.abs(cinemaVideoElem.currentTime - data.currentTime) > 1.5) {
          cinemaVideoElem.currentTime = data.currentTime;
        }
      }
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
    if (cornerInteractZone) {
      cornerInteractZone.style.display = 'flex';
    }
    setDockPoppedOut(false);

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
  // BOTTOM-RIGHT CORNER POP-OUT INTERACTIVE ACTIONS DRAWER
  // --------------------------------------------------------------------------
  function setDockPoppedOut(open) {
    isDockPoppedOut = open;
    if (!multiplayerDock) return;
    if (open) {
      multiplayerDock.style.display = 'flex';
      gsap.fromTo(multiplayerDock,
        { scale: 0.85, opacity: 0, y: 15, transformOrigin: 'bottom right' },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }
      );
      if (btnToggleDock) {
        btnToggleDock.classList.add('active');
        if (launcherIcon) launcherIcon.textContent = '✕';
        if (launcherLabel) launcherLabel.textContent = 'Hide';
      }
    } else {
      gsap.to(multiplayerDock, {
        scale: 0.85,
        opacity: 0,
        y: 15,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          multiplayerDock.style.display = 'none';
        }
      });
      if (btnToggleDock) {
        btnToggleDock.classList.remove('active');
        if (launcherIcon) launcherIcon.textContent = '✨';
        if (launcherLabel) launcherLabel.textContent = 'Actions';
      }
    }
  }

  btnToggleDock?.addEventListener('click', () => {
    soundFx.pop(460);
    setDockPoppedOut(!isDockPoppedOut);
  });

  btnCloseDockPanel?.addEventListener('click', () => {
    soundFx.pop(400);
    setDockPoppedOut(false);
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
      setDockPoppedOut(false);

      // Proposer sees status banner waiting for partner
      if (realtimeProposalBanner) {
        if (realtimeBannerEyebrow) realtimeBannerEyebrow.textContent = '💍 YOU ARE PROPOSING';
        if (realtimeBannerTitle) realtimeBannerTitle.textContent = 'On One Knee ✨';
        if (realtimeBannerQuestion) realtimeBannerQuestion.textContent = `${proposalQuestion}`;
        if (realtimeBannerActions) realtimeBannerActions.style.display = 'flex';
        if (realtimeCelebrateBox) realtimeCelebrateBox.style.display = 'none';
        if (btnStandRealtimeProposal) btnStandRealtimeProposal.style.display = 'inline-flex';
        if (btnAcceptRealtimeProposal) btnAcceptRealtimeProposal.style.display = 'none';
        if (btnRunawayNoProposal) btnRunawayNoProposal.style.display = 'none';
        realtimeProposalBanner.style.display = 'flex';
        gsap.fromTo('#realtimeProposalBanner .proposal-banner-card',
          { scale: 0.85, opacity: 0, y: -20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
        );
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
  btnCloseRealtimeBanner?.addEventListener('click', () => {
    soundFx.pop(400);
    if (realtimeProposalBanner) realtimeProposalBanner.style.display = 'none';
  });
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
  const benchMovieHud = container.querySelector('#benchMovieHud');
  const benchMovieHudIcon = container.querySelector('#benchMovieHudIcon');
  const benchMovieHudText = container.querySelector('#benchMovieHudText');
  const btnSoloMoviePreview = container.querySelector('#btnSoloMoviePreview');
  const btnMovieUnmute = container.querySelector('#btnMovieUnmute');
  const artPromptBadge = container.querySelector('#artPromptBadge');
  const btnSitBench = container.querySelector('#btnSitBench');
  const btnStandBench = container.querySelector('#btnStandBench');
  const btnOpenProposalBench = container.querySelector('#btnOpenProposalBench');

  let isSeatedOnBench = false;

  btnSoloMoviePreview?.addEventListener('click', () => {
    isSoloPreviewMovie = true;
    soundFx.sparkle();
    checkBenchVideoPlayback();
  });

  btnMovieUnmute?.addEventListener('click', () => {
    if (cinemaVideoElem) {
      cinemaVideoElem.muted = false;
      cinemaVideoElem.volume = 1.0;
    }
    if (btnMovieUnmute) btnMovieUnmute.style.display = 'none';
    soundFx.sparkle();
  });

  function startBenchMovie() {
    if (isPlayingBenchMovie) return;
    isPlayingBenchMovie = true;
    const vTex = getCinemaVideoTexture();
    if (cinemaCanvas && vTex) {
      cinemaCanvas.material.map = vTex;
      cinemaCanvas.material.needsUpdate = true;
    }

    // Theater ambiance: dim spotlights and gallery ambient light
    gsap.to(ambientLight, { intensity: 0.12, duration: 1.2 });
    gsap.to(hemiLight, { intensity: 0.08, duration: 1.2 });
    gsap.to(cpSpot, { intensity: 6.0, duration: 1.2 });

    // Duck background soundtrack so lovers can hear the movie clearly
    const audioElem = musicMount?.querySelector('audio');
    if (audioElem && !audioElem.paused) {
      bgMusicWasPlaying = true;
      savedBgMusicVol = (typeof audioElem.volume === 'number') ? audioElem.volume : 1.0;
      gsap.to(audioElem, { volume: 0.1, duration: 0.8 });
    }

    // Play video with audio; fallback to muted if browser restricted
    const playPromise = cinemaVideoElem.play();
    if (playPromise !== undefined) {
      playPromise.catch(err => {
        console.warn("Autoplay with sound restricted by browser; playing muted:", err);
        cinemaVideoElem.muted = true;
        if (btnMovieUnmute) btnMovieUnmute.style.display = 'inline-block';
        cinemaVideoElem.play().catch(e => console.error("Movie play failed:", e));
      });
    }

    if (multiplayer) {
      multiplayer.sendAction('bench_video_sync', { currentTime: cinemaVideoElem.currentTime, isPlaying: true });
    }
  }

  function pauseBenchMovie() {
    if (!isPlayingBenchMovie) return;
    isPlayingBenchMovie = false;
    cinemaVideoElem.pause();

    if (cinemaCanvas && centerpieceTex) {
      cinemaCanvas.material.map = centerpieceTex;
      cinemaCanvas.material.needsUpdate = true;
    }

    // Restore seated lighting
    if (isSeatedOnBench) {
      gsap.to(ambientLight, { intensity: 0.22, duration: 1.0 });
      gsap.to(hemiLight, { intensity: 0.15, duration: 1.0 });
      gsap.to(cpSpot, { intensity: 5.5, duration: 1.0 });
    }

    // Restore background soundtrack
    const audioElem = musicMount?.querySelector('audio');
    if (audioElem && bgMusicWasPlaying) {
      gsap.to(audioElem, { volume: savedBgMusicVol, duration: 0.8 });
      bgMusicWasPlaying = false;
    }

    if (multiplayer) {
      multiplayer.sendAction('bench_video_sync', { currentTime: cinemaVideoElem.currentTime, isPlaying: false });
    }
  }

  function checkBenchVideoPlayback() {
    const hasPeers = peerAvatarsMap && peerAvatarsMap.size > 0;
    const isPeerSitting = peerSeatedMap && peerSeatedMap.size > 0;

    // RULE: Video plays ONLY IF both sit together on the bench (or solo preview is intentionally clicked)
    const canPlay = isSeatedOnBench && (isPeerSitting || (!hasPeers && isSoloPreviewMovie));

    if (benchMovieHud) {
      if (isSeatedOnBench) {
        benchMovieHud.style.display = 'flex';
        if (canPlay) {
          if (benchMovieHudIcon) benchMovieHudIcon.textContent = '🎬';
          if (benchMovieHudText) {
            benchMovieHudText.textContent = hasPeers
              ? 'Movie Playing • Enjoying our memories together ✨'
              : 'Movie Playing (Solo Preview) ✨';
          }
          if (btnSoloMoviePreview) btnSoloMoviePreview.style.display = 'none';
          if (btnMovieUnmute) btnMovieUnmute.style.display = cinemaVideoElem.muted ? 'inline-block' : 'none';
        } else {
          if (benchMovieHudIcon) benchMovieHudIcon.textContent = '🛋️';
          if (benchMovieHudText) {
            benchMovieHudText.textContent = hasPeers
              ? 'Seated on bench • Waiting for partner to sit beside you to start our movie 🎬✨'
              : 'Waiting for your partner to join & sit beside you to start movie 🎬';
          }
          if (btnSoloMoviePreview) btnSoloMoviePreview.style.display = 'inline-block';
          if (btnMovieUnmute) btnMovieUnmute.style.display = 'none';
        }
      } else {
        benchMovieHud.style.display = 'none';
        isSoloPreviewMovie = false;
      }
    }

    if (canPlay && !isPlayingBenchMovie) {
      startBenchMovie();
    } else if (!canPlay && isPlayingBenchMovie) {
      pauseBenchMovie();
    }
  }

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

    const myBenchX = (userProfile.gender === 'male') ? -0.75 : 0.75;
    if (localAvatar) {
      localAvatar.group.position.set(myBenchX, 0, benchZ);
      localAvatar.group.rotation.y = Math.PI; // Face cinema screen
      localAvatar.setSeated(true);
    }
    if (multiplayer) {
      multiplayer.sendAction('sit');
      multiplayer.sendMove(myBenchX, 0, benchZ, Math.PI, false, true);
    }

    // Cinematic mood lighting (dim ambient spotlights)
    gsap.to(ambientLight, { intensity: 0.22, duration: 1.4 });
    gsap.to(hemiLight, { intensity: 0.15, duration: 1.4 });
    gsap.to(cpSpot, { intensity: 6.5, duration: 1.4 });

    // Smoothly drop camera to romantic seated height facing the screen
    gsap.to(camera.position, {
      x: 0,
      y: 2.2,
      z: benchZ + 3.2,
      duration: 1.8,
      ease: 'power2.inOut'
    });
    gsap.to(currentLookAtTarget, {
      x: 0,
      y: 4.0,
      z: cinemaZ,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(currentLookAtTarget)
    });

    checkBenchVideoPlayback();
  }

  function standUpFromBench() {
    soundFx.pop(520);
    isSeatedOnBench = false;
    isSoloPreviewMovie = false;
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
      localAvatar.group.position.set(0, 0, benchZ + 2.0);
      localAvatar.group.rotation.y = Math.PI;
    }
    if (multiplayer) {
      multiplayer.sendAction('stand');
      multiplayer.sendMove(0, 0, benchZ + 2.0, Math.PI, false, false);
    }

    checkBenchVideoPlayback();

    // Restore museum lighting
    gsap.to(ambientLight, { intensity: 0.9, duration: 1.2 });
    gsap.to(hemiLight, { intensity: 0.7, duration: 1.2 });
    gsap.to(cpSpot, { intensity: 5.5, duration: 1.2 });

    walkYaw = 0;
    walkPitch = 0.05;
  }

  btnSitBench?.addEventListener('click', sitOnBench);
  btnStandBench?.addEventListener('click', standUpFromBench);
  btnOpenProposalBench?.addEventListener('click', () => {
    soundFx.sparkle();
    toggleKneelingProposal();
  });

  function updateModeButtonUI(mode) {
    if (!btnModeToggle) return;
    if (mode === 'tour') {
      btnModeToggle.className = 'btn-museum-mode-toggle mode-tour';
      if (modeToggleIcon) modeToggleIcon.textContent = '🧭';
      if (modeToggleLabel) modeToggleLabel.textContent = 'Guided Tour';
      btnModeToggle.title = 'Currently in Guided Tour • Tap to switch to Free Walk';
    } else {
      btnModeToggle.className = 'btn-museum-mode-toggle mode-walk';
      if (modeToggleIcon) modeToggleIcon.textContent = '🚶';
      if (modeToggleLabel) modeToggleLabel.textContent = 'Free Walk';
      btnModeToggle.title = 'Currently in Free Walk • Tap to switch to Guided Tour';
    }
  }

  function setMode(mode) {
    currentMode = mode;
    clearTimeout(tourAdvanceTimeout);
    updateModeButtonUI(mode);

    if (mode === 'tour') {
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

  btnModeToggle?.addEventListener('click', () => {
    soundFx.pop(480);
    const nextMode = currentMode === 'tour' ? 'walk' : 'tour';
    setMode(nextMode);
  });
  updateModeButtonUI(currentMode);

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
    // Moving mouse up tilts camera up (natural non-inverted look), moving mouse down tilts down
    walkYaw -= dx * 0.0035;
    walkPitch += dy * 0.003;
    walkPitch = Math.max(-0.45, Math.min(0.65, walkPitch));
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
          // Swiping up tilts camera up (natural non-inverted look), swiping down tilts down
          walkYaw -= dx * 0.0045;
          walkPitch += dy * 0.0035;
          walkPitch = Math.max(-0.45, Math.min(0.65, walkPitch));
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
    if (cornerInteractZone) cornerInteractZone.style.display = 'none';
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
        if (cornerInteractZone && hasEnteredMuseum) {
          cornerInteractZone.style.display = 'flex';
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

    // Bench movie video texture render update
    if (isPlayingBenchMovie && cinemaVideoTexture) {
      cinemaVideoTexture.needsUpdate = true;
    }

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
        localAvatar.group.position.x = Math.max(-hallWidth / 2 + 1.8, Math.min(hallWidth / 2 - 1.8, localAvatar.group.position.x));
        localAvatar.group.position.z = Math.max(rotundaZ + 2.8, Math.min(6.5, localAvatar.group.position.z));
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
            isWalking,
            isSeatedOnBench
          );
        }

        // TPP Chase Camera Positioning (behind avatar, looking forward)
        // Dynamically glide camera closer & lower when kneeling to showcase the ring box & proposal
        const isKneelingNow = localAvatar.isKneeling();
        const camDist = isKneelingNow ? 3.2 : 4.4;
        const camHeight = isKneelingNow ? 1.55 : 2.25;
        const focusY = isKneelingNow ? 1.05 : 1.5;

        const desiredCamX = localAvatar.group.position.x + Math.sin(walkYaw) * Math.cos(walkPitch) * camDist;
        const desiredCamY = localAvatar.group.position.y + camHeight + Math.sin(walkPitch) * camDist;
        const desiredCamZ = localAvatar.group.position.z + Math.cos(walkYaw) * Math.cos(walkPitch) * camDist;

        camera.position.lerp(new THREE.Vector3(desiredCamX, desiredCamY, desiredCamZ), 0.16);

        currentLookAtTarget.set(
          localAvatar.group.position.x,
          localAvatar.group.position.y + focusY - Math.sin(walkPitch) * 0.8,
          localAvatar.group.position.z
        );
        camera.lookAt(currentLookAtTarget);
      } else if (localAvatar && isSeatedOnBench) {
        localAvatar.update(delta, false, 0);
        if (multiplayer && (now - lastMoveBroadcastTime > 1500)) {
          lastMoveBroadcastTime = now;
          const myBenchX = (userProfile.gender === 'male') ? -0.75 : 0.75;
          multiplayer.sendMove(myBenchX, 0, benchZ, Math.PI, false, true);
        }
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
      const benchPos = new THREE.Vector3(0, 1.7, benchZ);
      const currentPos = localAvatar ? localAvatar.group.position : camera.position;
      const distToBench = currentPos.distanceTo(benchPos);
      if (distToBench < 5.5 && !isSeatedOnBench) {
        if (benchPrompt) benchPrompt.style.display = 'block';
      } else {
        if (benchPrompt) benchPrompt.style.display = 'none';
      }

      // Nearby artwork hint badge
      let nearArt = null;
      for (const art of interactiveArtworks) {
        const d = currentPos.distanceTo(art.targetLookAt);
        if (d < 4.5) {
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
    peerSeatedMap.clear();

    if (cinemaVideoElem) {
      cinemaVideoElem.pause();
      cinemaVideoElem.src = '';
      cinemaVideoElem.remove();
    }
    if (cinemaVideoTexture) {
      cinemaVideoTexture.dispose();
      cinemaVideoTexture = null;
    }

    renderer.dispose();
  };
}
