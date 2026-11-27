// src/viewer/templates/birthdayTemplate.js
// Relationship-Adaptive Cinematic Birthday Celebration Experience (Acts I–VIII + Finale)

import confetti from 'canvas-confetti';
import './birthday.css';
import { getRelationshipTheme, GentleBirthdaySynth } from './birthdayThemes.js';

function esc(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getHeroSvgMarkup(visualType, primary, accent) {
  if (visualType === 'constellation') {
    return `
      <svg viewBox="0 0 400 400" style="width:100%;height:100%;display:block;">
        <defs>
          <radialGradient id="bdConstGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${accent}" stop-opacity="0.32"/>
            <stop offset="100%" stop-color="${primary}" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="165" fill="url(#bdConstGlow)"/>
        <circle cx="200" cy="200" r="135" fill="none" stroke="rgba(255,255,255,0.12)" stroke-dasharray="4 6"/>
        <circle cx="200" cy="200" r="88" fill="none" stroke="rgba(255,255,255,0.1)" stroke-dasharray="2 5"/>
        <polyline points="85,120 195,82 308,132 280,272 135,285 85,120" fill="none" stroke="${accent}" stroke-width="1.8" stroke-opacity="0.65"/>
        <line x1="195" y1="82" x2="200" y2="200" stroke="${primary}" stroke-width="1.4" stroke-opacity="0.5"/>
        <line x1="85" y1="120" x2="280" y2="272" stroke="${primary}" stroke-width="1.2" stroke-opacity="0.4"/>
        <circle cx="200" cy="200" r="10" fill="${accent}"/>
      </svg>
    `;
  }
  if (visualType === 'oak') {
    return `
      <svg viewBox="0 0 400 400" style="width:100%;height:100%;display:block;">
        <defs>
          <radialGradient id="bdOakGlow" cx="50%" cy="42%" r="50%">
            <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="200" cy="175" r="150" fill="url(#bdOakGlow)"/>
        <path d="M188 355 C190 295 192 245 192 195 C175 160 140 138 110 120 M208 355 C206 295 204 245 204 195 C225 162 260 142 292 122 M198 220 C198 175 198 130 198 86" stroke="${accent}" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.82"/>
        <circle cx="200" cy="145" r="108" fill="${primary}" opacity="0.16"/>
        <circle cx="145" cy="155" r="70" fill="${accent}" opacity="0.14"/>
        <circle cx="255" cy="155" r="70" fill="${primary}" opacity="0.14"/>
      </svg>
    `;
  }
  // Default: blossom / memoryTree
  return `
    <svg viewBox="0 0 400 400" style="width:100%;height:100%;display:block;">
      <defs>
        <radialGradient id="bdTreeGlow" cx="50%" cy="42%" r="52%">
          <stop offset="0%" stop-color="${primary}" stop-opacity="0.34"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <circle cx="200" cy="180" r="155" fill="url(#bdTreeGlow)"/>
      <path d="M196 355 Q196 270 198 205 Q165 155 112 126 M202 355 Q204 265 202 200 Q242 158 292 130 M200 220 Q200 155 200 92" stroke="#f5d08a" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.88"/>
      <circle cx="200" cy="138" r="96" fill="${primary}" opacity="0.18"/>
      <circle cx="136" cy="158" r="64" fill="${accent}" opacity="0.15"/>
      <circle cx="266" cy="158" r="64" fill="${primary}" opacity="0.16"/>
    </svg>
  `;
}

export function renderBirthdayTemplate(container, rawData = {}) {
  const relationId = rawData.relationship || rawData.recipientPersona || 'friend';
  const theme = getRelationshipTheme(relationId);
  const d = theme.defaults;

  const recipientName = (rawData.recipientName || d.recipientName || 'Friend').trim();
  const nickname = (rawData.nickname || d.nickname || '').trim();
  const senderName = (rawData.senderName || d.senderName || 'With Love').trim();
  const age = (rawData.age || d.age || '').trim();
  const eventDate = rawData.eventDate ? new Date(rawData.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const primaryColor = rawData.primaryColor || theme.palette.primary;
  const accentColor = rawData.accentColor || theme.palette.accent;
  const fontMood = rawData.fontMood || theme.typography.display;

  const heroTagline = (rawData.heroSubtitle || theme.acts.act2Tagline).trim();
  const heroNotes = (Array.isArray(rawData.heroNotes) && rawData.heroNotes.length > 0) ? rawData.heroNotes : d.heroNotes;
  const milestones = (Array.isArray(rawData.milestones) && rawData.milestones.length > 0) ? rawData.milestones : d.milestones;
  const appreciationReasons = (Array.isArray(rawData.appreciationReasons) && rawData.appreciationReasons.length > 0) ? rawData.appreciationReasons : d.appreciationReasons;
  const photos = (Array.isArray(rawData.photos) && rawData.photos.length > 0)
    ? rawData.photos
    : (Array.isArray(rawData.polaroids) && rawData.polaroids.length > 0)
      ? rawData.polaroids.map(p => ({ image: p.image, date: p.date || 'Memory', category: p.category || 'Moments', caption: p.note || p.caption || p.title || '' }))
      : d.photos;

  const tracks = (Array.isArray(rawData.playlist) && rawData.playlist.length > 0)
    ? rawData.playlist
    : [{ id: 1, title: rawData.audioTitle || d.tracks[0].title, artist: rawData.audioSubtitle || d.tracks[0].artist, src: rawData.audioSrc || d.tracks[0].src, tag: 'BIRTHDAY THEME', duration: '2:45' }, ...d.tracks.slice(1)];

  const spotifyUrl = rawData.spotifyUrl || 'https://open.spotify.com/';
  const youtubeUrl = rawData.youtubeUrl || 'https://www.youtube.com/';

  const letterSalutation = rawData.letterSalutation || d.letterSalutation;
  const letterBody = rawData.letterBody || rawData.letterText || d.letterBody;
  const letterSignoff = rawData.letterSignoff || d.letterSignoff;
  const lanternWishes = (Array.isArray(rawData.lanternWishes) && rawData.lanternWishes.length > 0) ? rawData.lanternWishes : d.lanternWishes;
  const pactTitle = rawData.pactTitle || theme.acts.act8Title || d.pactTitle;
  const pactVow = rawData.pactVow || rawData.treatyVow || d.pactVow;
  const pactWitness = rawData.pactWitness || d.pactWitness;

  const nodePositions = [
    { x: 22, y: 30 }, { x: 50, y: 20 }, { x: 78, y: 32 },
    { x: 18, y: 64 }, { x: 80, y: 66 }, { x: 50, y: 48 },
    { x: 35, y: 78 }, { x: 66, y: 78 }
  ];

  container.innerHTML = `
    <div class="bday-cinematic-root" id="bdayRoot" style="
      --bd-bg-dark: ${theme.palette.bgDark};
      --bd-bg-mid: ${theme.palette.bgMid};
      --bd-bg-card: ${theme.palette.bgCard};
      --bd-surface-light: ${theme.palette.surfaceLight};
      --bd-ink-dark: ${theme.palette.inkDark};
      --bd-ink-light: ${theme.palette.inkLight};
      --bd-primary: ${primaryColor};
      --bd-accent: ${accentColor};
      --bd-secondary: ${theme.palette.secondary};
      --bd-glow: ${theme.palette.glow};
      --bd-font-display: ${fontMood};
      --bd-font-body: ${theme.typography.body};
      --bd-font-script: ${theme.typography.script};
    ">
      <canvas class="bday-particles-canvas" id="bdParticlesCanvas"></canvas>
      <div class="bday-flash-overlay" id="bdFlashOverlay"></div>

      <!-- Preloader -->
      <div class="bday-preloader" id="bdPreloader">
        <div class="bday-preloader-emblem">${theme.emoji}</div>
        <div class="bday-preloader-title">Opening Celebration...</div>
        <div class="bday-preloader-sub">${esc(theme.acts.preloaderSub)}</div>
      </div>

      <!-- Persistent Floating Corner Controls -->
      <div class="bday-corner-controls">
        <button type="button" class="bday-pill-btn bday-fullscreen-pill" id="bdBtnFullscreen">
          <span>⛶</span><span id="bdFsLabel">Full Screen</span>
        </button>

        <button type="button" class="bday-pill-btn bday-vinyl-pill" id="bdBtnVinyl">
          <span class="bday-vinyl-disc" id="bdVinylDisc">🎵</span>
          <span class="bday-vinyl-meta">
            <span class="bday-vinyl-title" id="bdVinylTitle">${esc(tracks[0]?.title || 'Birthday Melody')}</span>
            <span class="bday-vinyl-state" id="bdVinylState">Tap to Play</span>
          </span>
        </button>

        <button type="button" class="bday-pill-btn bday-confetti-pill" id="bdBtnConfetti">
          <span>🎉</span>
          <span class="bday-confetti-count" id="bdConfettiCount">0</span>
        </button>
      </div>

      <div class="bday-acts-stage">
        <!-- ACT I: Two-Stage Tactile Reveal -->
        <section class="bday-act is-active is-visible" data-act="1">
          <div class="bday-reveal-stage" id="bdStage1">
            <div style="font-size:11px; letter-spacing:2.4px; text-transform:uppercase; color:var(--bd-accent); margin-bottom:18px; font-weight:700;">
              ${esc(theme.label)} Edition • For ${esc(recipientName)}
            </div>
            <button type="button" class="bday-emblem-trigger" id="bdBtnEmblemUnwrap" aria-label="Unwrap celebration">
              <span class="bday-emblem-halo"></span>
              <span class="bday-emblem-icon">${theme.emoji}</span>
            </button>
            <div class="bday-italic-prompt">${esc(theme.acts.act1Prompt)}</div>
          </div>

          <div class="bday-reveal-stage" id="bdStage2" style="display:none;">
            <div style="font-size:42px; margin-bottom:10px;">✨</div>
            <h2 class="bday-chapter-title" style="margin-bottom:6px;">Ready to Begin, ${esc(recipientName)}?</h2>
            <p style="font-size:13.5px; color:rgba(255,255,255,0.75); margin-bottom:6px;">${esc(theme.acts.act1Stage2Prompt)}</p>
            <div class="bday-pull-track" id="bdPullTrack">
              <div class="bday-pull-fill" id="bdPullFill"></div>
              <div class="bday-pull-label">SLIDE TO LAUNCH →</div>
              <div class="bday-pull-knob" id="bdPullKnob">➜</div>
            </div>
            <button type="button" class="bday-ghost-btn" id="bdBtnStage2Tap">${esc(theme.acts.act1Stage2Btn)} ✨</button>
          </div>
        </section>

        <!-- ACT II: Interactive Hero Showcase -->
        <section class="bday-act" data-act="2">
          <div class="bday-inner">
            <div class="bday-hero-grid">
              <div>
                <div class="bday-chapter-kicker">${esc(theme.acts.act2Kicker)}</div>
                <h1 class="bday-hero-headline">
                  Happy Birthday, ${esc(recipientName)}
                  ${age ? `<span class="bday-age-pill">${esc(age)}</span>` : ''}
                </h1>
                ${nickname ? `<div style="font-size:13px; color:var(--bd-accent); font-weight:700; margin-bottom:10px;">✨ Known affectionately as "${esc(nickname)}"</div>` : ''}
                <p class="bday-hero-tagline">${esc(heroTagline)}</p>

                <div class="bday-hero-wish-card" id="bdHeroWishCard">
                  <div style="font-size:11px; font-weight:800; letter-spacing:1.4px; text-transform:uppercase; color:var(--bd-primary); margin-bottom:6px;" id="bdHeroNoteLabel">
                    Tap a glowing node to reveal a wish
                  </div>
                  <div style="font-size:15px; line-height:1.55; font-weight:500;" id="bdHeroNoteText">
                    Every glowing point holds a personal note crafted just for you. Tap any node on the ${theme.heroVisual === 'constellation' ? 'constellation' : 'keepsake tree'}!
                  </div>
                </div>

                <button type="button" class="bday-cta-btn is-locked" id="bdBtnToAct3" disabled>
                  <span>Continue to Milestones</span><span>→</span>
                </button>
              </div>

              <div class="bday-svg-stage" id="bdHeroSvgStage">
                ${getHeroSvgMarkup(theme.heroVisual, primaryColor, accentColor)}
                ${heroNotes.slice(0, 8).map((n, idx) => {
                  const pos = nodePositions[idx % nodePositions.length];
                  return `<button type="button" class="bday-node-btn" data-node-idx="${idx}" style="left:${pos.x}%; top:${pos.y}%;">✦ ${esc(n.label)}</button>`;
                }).join('')}
              </div>
            </div>
          </div>
        </section>

        <!-- ACT III: The Milestone Timeline -->
        <section class="bday-act" data-act="3">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act3Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(theme.acts.act3Title)}</h2>
              <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; margin-top:14px;" id="bdMilestonePills">
                ${milestones.map((m, idx) => `<button type="button" class="bday-ghost-btn ${idx === 0 ? 'is-active' : ''}" data-ms-jump="${idx}">${esc(m.num || String(idx + 1).padStart(2, '0'))}</button>`).join('')}
              </div>
            </div>

            <div class="bday-timeline-wrap">
              <div class="bday-timeline-rail"><div class="bday-timeline-rail-fill" id="bdTimelineFill"></div></div>
              ${milestones.map((m, idx) => `
                <div class="bday-milestone-item ${idx === 0 ? 'is-unlocked is-current' : ''}" data-ms-item="${idx}">
                  <button type="button" class="bday-milestone-node" data-ms-jump="${idx}">${esc(m.num || String(idx + 1).padStart(2, '0'))}</button>
                  <div class="bday-milestone-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:6px; flex-wrap:wrap;">
                      <span style="font-size:10.5px; font-weight:800; letter-spacing:1.4px; color:var(--bd-accent); text-transform:uppercase;">${esc(m.tag || 'MILESTONE')}</span>
                      <span style="font-size:11.5px; color:rgba(255,255,255,0.62);">${esc(m.date || '')}</span>
                    </div>
                    <h3 style="font-family:var(--bd-font-display); font-size:19px; margin:0 0 6px; color:#fff;">${esc(m.title)}</h3>
                    <p style="font-size:14px; line-height:1.6; color:rgba(255,255,255,0.82); margin:0;">${esc(m.desc)}</p>
                  </div>
                </div>
              `).join('')}
            </div>

            <div style="text-align:center; margin-top:26px; display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
              <button type="button" class="bday-ghost-btn" id="bdBtnNextMilestone">Next Milestone ↓</button>
              <button type="button" class="bday-cta-btn" id="bdBtnToAct4"><span>Enter Soundtrack & Appreciation</span><span>→</span></button>
            </div>
          </div>
        </section>

        <!-- ACT IV: Soundtrack & Appreciation Deck -->
        <section class="bday-act" data-act="4">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act4Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(theme.acts.act4Title)}</h2>
            </div>

            <div class="bday-deck-grid">
              <!-- Cassette Player -->
              <div class="bday-deck-card">
                <div style="display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap;">
                  <button type="button" class="bday-ghost-btn is-active" data-deck-tab="mixtape">Mixtape</button>
                  <button type="button" class="bday-ghost-btn" data-deck-tab="spotify">Spotify</button>
                  <button type="button" class="bday-ghost-btn" data-deck-tab="youtube">YouTube</button>
                </div>

                <div id="bdTabMixtape">
                  <div class="bday-cassette-shell">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                      <span style="font-size:10.5px; font-weight:800; letter-spacing:1.5px; color:var(--bd-accent);" id="bdTrackTag">${esc(tracks[0]?.tag || 'MIXTAPE')}</span>
                      <div class="bday-eq-bars" id="bdEqBars">
                        <span class="bday-eq-bar"></span><span class="bday-eq-bar"></span><span class="bday-eq-bar"></span><span class="bday-eq-bar"></span>
                      </div>
                    </div>
                    <div class="bday-cassette-reels">
                      <div class="bday-reel" id="bdReelL">◉</div>
                      <div style="text-align:center; padding:0 10px; flex:1;">
                        <div style="font-weight:700; font-size:15px; color:#fff;" id="bdTrackTitle">${esc(tracks[0]?.title || 'Birthday Melody')}</div>
                        <div style="font-size:12px; color:rgba(255,255,255,0.68);" id="bdTrackArtist">${esc(tracks[0]?.artist || 'Acoustic')}</div>
                      </div>
                      <div class="bday-reel" id="bdReelR">◉</div>
                    </div>
                    <div style="height:6px; border-radius:999px; background:rgba(255,255,255,0.12); overflow:hidden; margin-top:8px;">
                      <div id="bdProgressBar" style="height:100%; width:0%; background:linear-gradient(90deg, var(--bd-primary), var(--bd-accent)); transition:width 0.25s linear;"></div>
                    </div>
                  </div>
                  <div style="display:flex; justify-content:center; align-items:center; gap:14px;">
                    <button type="button" class="bday-ghost-btn" id="bdBtnPrevTrack">⏮</button>
                    <button type="button" class="bday-cta-btn" style="padding:11px 22px;" id="bdBtnPlayPause">▶ Play</button>
                    <button type="button" class="bday-ghost-btn" id="bdBtnNextTrack">⏭</button>
                  </div>
                </div>

                <div id="bdTabSpotify" style="display:none; text-align:center; padding:24px 12px;">
                  <div style="font-size:36px; margin-bottom:10px;">🎧</div>
                  <p style="font-size:14px; color:rgba(255,255,255,0.8); margin-bottom:16px;">Open the curated Spotify celebration playlist in a new tab.</p>
                  <a href="${esc(spotifyUrl)}" target="_blank" rel="noopener noreferrer" class="bday-cta-btn" style="text-decoration:none;">Open on Spotify ↗</a>
                </div>

                <div id="bdTabYoutube" style="display:none; text-align:center; padding:24px 12px;">
                  <div style="font-size:36px; margin-bottom:10px;">📺</div>
                  <p style="font-size:14px; color:rgba(255,255,255,0.8); margin-bottom:16px;">Watch and listen to the dedicated YouTube birthday track.</p>
                  <a href="${esc(youtubeUrl)}" target="_blank" rel="noopener noreferrer" class="bday-cta-btn" style="text-decoration:none;">Watch on YouTube ↗</a>
                </div>
              </div>

              <!-- Appreciation Card -->
              <div class="bday-deck-card" style="display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                  <div style="font-size:11px; font-weight:800; letter-spacing:1.6px; text-transform:uppercase; color:var(--bd-accent); margin-bottom:8px;">APPRECIATION DECK</div>
                  <h3 style="font-family:var(--bd-font-display); font-size:22px; margin:0 0 16px;">${esc(theme.acts.act4AppreciationTitle)}</h3>
                  <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:16px; padding:18px; min-height:110px;">
                    <div style="font-size:12px; font-weight:800; color:var(--bd-primary); margin-bottom:6px;" id="bdReasonNum">REASON #1</div>
                    <div style="font-size:16px; line-height:1.55; color:#fff;" id="bdReasonText">${esc(appreciationReasons[0] || '')}</div>
                  </div>
                </div>
                <div style="margin-top:16px;">
                  <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                    ${appreciationReasons.map((_, idx) => `<button type="button" class="bday-ghost-btn ${idx === 0 ? 'is-active' : ''}" data-reason-idx="${idx}">#${idx + 1}</button>`).join('')}
                  </div>
                  <button type="button" class="bday-ghost-btn" id="bdBtnShuffleReason">🎲 Shuffle Another</button>
                </div>
              </div>
            </div>

            <div style="text-align:center; margin-top:28px;">
              <button type="button" class="bday-cta-btn" id="bdBtnToAct5"><span>Open Floating Memories Gallery</span><span>→</span></button>
            </div>
          </div>
        </section>

        <!-- ACT V: Floating Memories Gallery -->
        <section class="bday-act" data-act="5">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act5Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(theme.acts.act5Title)}</h2>
              <div style="display:flex; justify-content:center; gap:10px; margin-top:14px; flex-wrap:wrap;">
                <button type="button" class="bday-ghost-btn is-active" id="bdViewCarousel">3D Floating Carousel</button>
                <button type="button" class="bday-ghost-btn" id="bdViewBook">Keepsake Book View</button>
              </div>
            </div>

            <div id="bdCarouselMode">
              <div class="bday-carousel-stage" id="bdCarouselStage">
                <div class="bday-carousel-ring" id="bdCarouselRing">
                  ${photos.map((p, idx) => `
                    <div class="bday-carousel-card" data-photo-idx="${idx}">
                      <img src="${esc(p.image || '/images/sunset.jpg')}" alt="${esc(p.caption || 'Memory')}" onerror="this.src='/images/sunset.jpg'" />
                      <div style="padding:8px 10px;">
                        <div style="font-size:10px; font-weight:800; color:var(--bd-primary); text-transform:uppercase;">${esc(p.category || 'Memory')} • ${esc(p.date || '')}</div>
                        <div style="font-size:12px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(p.caption || '')}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div style="display:flex; justify-content:center; gap:12px; margin-top:10px;">
                <button type="button" class="bday-ghost-btn" id="bdCarPrev">← Rotate</button>
                <button type="button" class="bday-ghost-btn" id="bdCarNext">Rotate →</button>
              </div>
            </div>

            <div id="bdBookMode" style="display:none;">
              <div class="bday-book-grid">
                ${photos.map((p, idx) => `
                  <div class="bday-deck-card" style="padding:12px; cursor:pointer;" data-photo-idx="${idx}">
                    <img src="${esc(p.image || '/images/sunset.jpg')}" alt="${esc(p.caption || 'Memory')}" style="width:100%; height:180px; object-fit:cover; border-radius:12px; margin-bottom:10px;" onerror="this.src='/images/sunset.jpg'" />
                    <div style="font-size:11px; font-weight:800; color:var(--bd-accent);">${esc(p.category || 'Memory')} • ${esc(p.date || '')}</div>
                    <div style="font-size:13.5px; margin-top:4px; color:#fff;">${esc(p.caption || '')}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="bday-deck-card" style="margin-top:20px; text-align:center;" id="bdPhotoDetailCard">
              <div style="font-size:11px; font-weight:800; color:var(--bd-accent); letter-spacing:1.2px; text-transform:uppercase;" id="bdPhotoDetailMeta">${esc(photos[0]?.category || 'Memory')} • ${esc(photos[0]?.date || '')}</div>
              <div style="font-size:15.5px; margin-top:6px; color:#fff;" id="bdPhotoDetailCaption">${esc(photos[0]?.caption || '')}</div>
            </div>

            <div style="text-align:center; margin-top:26px;">
              <button type="button" class="bday-cta-btn" id="bdBtnToAct6"><span>Unseal the Birthday Letter</span><span>→</span></button>
            </div>
          </div>
        </section>

        <!-- ACT VI: Tactile Sealed Letter -->
        <section class="bday-act" data-act="6">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act6Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(theme.acts.act6Title)}</h2>
            </div>

            <div class="bday-envelope-wrap">
              <div class="bday-envelope" id="bdEnvelopeCard">
                <button type="button" class="bday-wax-seal" id="bdWaxSeal" aria-label="Ignite and unseal letter">🕯️</button>
                <div style="font-size:12px; font-weight:800; letter-spacing:1.8px; color:var(--bd-accent); margin-bottom:8px;">RUB OR TAP TO IGNITE & UNSEAL</div>
                <p style="font-size:14px; color:rgba(255,255,255,0.75); margin:0;">A sealed birthday letter from ${esc(senderName)} awaits inside.</p>
              </div>

              <div class="bday-letter-paper" id="bdLetterPaper" style="display:none;">
                <div style="font-family:var(--bd-font-script); font-size:24px; font-weight:700; color:var(--bd-primary); margin-bottom:12px;">${esc(letterSalutation)}</div>
                <div style="font-size:15.5px; line-height:1.78; white-space:pre-line; margin-bottom:20px;">${esc(letterBody)}</div>
                <div style="font-family:var(--bd-font-script); font-size:20px; font-style:italic; text-align:right; color:var(--bd-ink-dark);">
                  ${esc(letterSignoff)}<br/><strong>${esc(senderName)}</strong>
                </div>
              </div>
            </div>

            <div style="text-align:center; margin-top:26px;">
              <button type="button" class="bday-cta-btn" id="bdBtnToAct7"><span>Step Into the Wishing Sky</span><span>→</span></button>
            </div>
          </div>
        </section>

        <!-- ACT VII: Twilight Sky Lanterns -->
        <section class="bday-act" data-act="7">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act7Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(theme.acts.act7Title)}</h2>
            </div>

            <div class="bday-sky-stage" id="bdSkyStage">
              <div style="font-size:12.5px; color:rgba(255,255,255,0.78); background:rgba(0,0,0,0.35); padding:6px 14px; border-radius:999px;">
                Tap anywhere in the night sky to launch a glowing wish ✨
              </div>
              <div style="z-index:5; display:flex; gap:12px; flex-wrap:wrap; justify-content:center;">
                <button type="button" class="bday-cta-btn" id="bdBtnLaunchLanterns">🏮 ${esc(theme.acts.act7Button)}</button>
                <button type="button" class="bday-ghost-btn" id="bdBtnToAct8">Sign Keepsake Pact →</button>
              </div>
            </div>
          </div>
        </section>

        <!-- ACT VIII: Interactive Keepsake Pact / Tribute Seal -->
        <section class="bday-act" data-act="8">
          <div class="bday-inner">
            <div class="bday-chapter-header">
              <div class="bday-chapter-kicker">${esc(theme.acts.act8Chapter)}</div>
              <h2 class="bday-chapter-title">${esc(pactTitle)}</h2>
            </div>

            <div class="bday-pact-card">
              <div style="display:flex; justify-content:space-between; font-size:11.5px; font-weight:700; color:#6b5c4d; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
                <span>DATE: ${esc(eventDate)}</span>
                <span>FOR: ${esc(recipientName)}</span>
              </div>
              <p style="font-family:var(--bd-font-script); font-size:20px; line-height:1.55; margin:0 0 18px;">"${esc(pactVow)}"</p>

              <div style="font-size:12px; font-weight:700; margin-bottom:6px;">Sign in Golden Ink below:</div>
              <canvas class="bday-sig-canvas" id="bdSigCanvas" width="560" height="140"></canvas>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; flex-wrap:wrap; gap:10px;">
                <span style="font-size:12px; color:#6b5c4d; font-style:italic;">${esc(pactWitness)} • ${esc(senderName)}</span>
                <div style="display:flex; gap:8px;">
                  <button type="button" class="bday-ghost-btn" style="color:var(--bd-ink-dark); border-color:rgba(0,0,0,0.2);" id="bdBtnClearSig">Clear</button>
                  <button type="button" class="bday-cta-btn" style="padding:10px 18px;" id="bdBtnAffixSeal">🖋️ Affix Official Seal & Sign</button>
                </div>
              </div>

              <div id="bdSealedResult" style="display:none; text-align:center; margin-top:14px;">
                <div class="bday-sealed-stamp">${esc(theme.acts.act8Badge)}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- FINALE: Closing Tribute & Replay -->
        <section class="bday-act" data-act="9">
          <div class="bday-inner" style="text-align:center; max-width:620px;">
            <div style="font-size:62px; margin-bottom:14px; filter:drop-shadow(0 0 24px var(--bd-glow));">${theme.emoji}</div>
            <h2 class="bday-chapter-title" style="font-size:clamp(30px, 6vw, 48px);">${esc(theme.acts.finaleTitle)}</h2>
            <p style="font-size:16px; line-height:1.7; color:rgba(255,255,255,0.85); margin:14px 0 26px;">
              Happy Birthday, ${esc(recipientName)}. May every wish you made tonight find its way to you.<br/>
              <span style="color:var(--bd-accent); font-weight:700;">— ${esc(senderName)}</span>
            </p>
            <button type="button" class="bday-cta-btn" id="bdBtnReplay">↺ ${esc(theme.acts.finaleButton)}</button>
          </div>
        </section>
      </div>
    </div>
  `;

  const rootEl = container.querySelector('#bdayRoot');
  const synth = new GentleBirthdaySynth();
  let audioEl = null;
  let currentTrackIdx = 0;
  let isPlaying = false;
  let confettiClicks = 0;
  let currentAct = 1;
  let currentMsIdx = 0;
  let currentReasonIdx = 0;
  let carouselIndex = 0;
  let hasSigned = false;
  let rafId = null;

  // Preloader fadeout
  const preloader = rootEl.querySelector('#bdPreloader');
  const preloaderTimer = setTimeout(() => {
    if (preloader) preloader.classList.add('is-hidden');
  }, 650);

  // Ambient 60fps Particle Engine
  const pCanvas = rootEl.querySelector('#bdParticlesCanvas');
  const pCtx = pCanvas.getContext('2d');
  const particles = Array.from({ length: 42 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: 1.5 + Math.random() * 3.5,
    vx: (Math.random() - 0.5) * 0.45,
    vy: theme.particles === 'embers' || theme.particles === 'sparks' ? -(0.35 + Math.random() * 0.7) : (0.25 + Math.random() * 0.6),
    alpha: 0.25 + Math.random() * 0.65
  }));

  function resizeCanvas() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function renderParticles() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -10) p.y = pCanvas.height + 10;
      if (p.y > pCanvas.height + 10) p.y = -10;
      if (p.x < -10) p.x = pCanvas.width + 10;
      if (p.x > pCanvas.width + 10) p.x = -10;

      pCtx.save();
      pCtx.globalAlpha = p.alpha;
      pCtx.fillStyle = Math.random() > 0.4 ? accentColor : primaryColor;
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      pCtx.fill();
      pCtx.restore();
    }
    rafId = requestAnimationFrame(renderParticles);
  }
  rafId = requestAnimationFrame(renderParticles);

  // Audio Management (MP3 + Web Audio fallback)
  const vinylDisc = rootEl.querySelector('#bdVinylDisc');
  const vinylTitle = rootEl.querySelector('#bdVinylTitle');
  const vinylState = rootEl.querySelector('#bdVinylState');
  const reelL = rootEl.querySelector('#bdReelL');
  const reelR = rootEl.querySelector('#bdReelR');
  const eqBars = rootEl.querySelector('#bdEqBars');
  const btnPlayPause = rootEl.querySelector('#bdBtnPlayPause');
  const trackTitleEl = rootEl.querySelector('#bdTrackTitle');
  const trackArtistEl = rootEl.querySelector('#bdTrackArtist');
  const trackTagEl = rootEl.querySelector('#bdTrackTag');
  const progressBar = rootEl.querySelector('#bdProgressBar');

  function syncAudioUi() {
    vinylDisc.classList.toggle('is-spinning', isPlaying);
    reelL.classList.toggle('is-spinning', isPlaying);
    reelR.classList.toggle('is-spinning', isPlaying);
    eqBars.classList.toggle('is-playing', isPlaying);
    vinylState.textContent = isPlaying ? 'Playing' : 'Paused';
    btnPlayPause.textContent = isPlaying ? '⏸ Pause' : '▶ Play';
  }

  function loadAndPlayTrack(idx, autoPlay = true) {
    currentTrackIdx = (idx + tracks.length) % tracks.length;
    const t = tracks[currentTrackIdx];
    vinylTitle.textContent = t.title;
    trackTitleEl.textContent = t.title;
    trackArtistEl.textContent = t.artist;
    trackTagEl.textContent = t.tag || 'MIXTAPE';

    if (audioEl) {
      audioEl.pause();
      audioEl = null;
    }
    synth.stopLoop();

    if (!autoPlay) {
      isPlaying = false;
      syncAudioUi();
      return;
    }

    if (t.src) {
      audioEl = new Audio(t.src);
      audioEl.loop = true;
      audioEl.volume = 0.65;
      audioEl.addEventListener('timeupdate', () => {
        if (audioEl && audioEl.duration) {
          progressBar.style.width = `${(audioEl.currentTime / audioEl.duration) * 100}%`;
        }
      });
      audioEl.play().then(() => {
        isPlaying = true;
        syncAudioUi();
      }).catch(() => {
        // Seamless Web Audio gentle birthday melody fallback
        synth.startLoop();
        isPlaying = true;
        syncAudioUi();
      });
    } else {
      synth.startLoop();
      isPlaying = true;
      syncAudioUi();
    }
  }

  function togglePlay() {
    if (isPlaying) {
      if (audioEl) audioEl.pause();
      synth.stopLoop();
      isPlaying = false;
      syncAudioUi();
    } else {
      if (audioEl) {
        audioEl.play().catch(() => synth.startLoop());
        isPlaying = true;
        syncAudioUi();
      } else {
        loadAndPlayTrack(currentTrackIdx, true);
      }
    }
  }

  // Corner controls
  rootEl.querySelector('#bdBtnFullscreen').addEventListener('click', () => {
    const fsLabel = rootEl.querySelector('#bdFsLabel');
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
      fsLabel.textContent = 'Exit Full';
    } else {
      document.exitFullscreen?.().catch(() => {});
      fsLabel.textContent = 'Full Screen';
    }
  });

  rootEl.querySelector('#bdBtnVinyl').addEventListener('click', (e) => {
    const pill = e.currentTarget;
    pill.classList.toggle('is-expanded');
    togglePlay();
  });

  rootEl.querySelector('#bdBtnConfetti').addEventListener('click', () => {
    confettiClicks += 1;
    rootEl.querySelector('#bdConfettiCount').textContent = String(confettiClicks);
    synth.playSpark();
    confetti({ particleCount: 45, spread: 70, origin: { x: 0.9, y: 0.85 }, colors: [primaryColor, accentColor, '#ffffff'] });
  });

  // Act navigation helper
  function goToAct(actNum) {
    currentAct = actNum;
    rootEl.querySelectorAll('.bday-act').forEach((sec) => {
      const n = Number(sec.dataset.act);
      sec.classList.remove('is-visible');
      sec.classList.remove('is-active');
      if (n === actNum) {
        sec.classList.add('is-active');
        requestAnimationFrame(() => sec.classList.add('is-visible'));
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Act I: Stage 1 & Stage 2
  const stage1 = rootEl.querySelector('#bdStage1');
  const stage2 = rootEl.querySelector('#bdStage2');
  const flashOverlay = rootEl.querySelector('#bdFlashOverlay');

  rootEl.querySelector('#bdBtnEmblemUnwrap').addEventListener('click', () => {
    synth.playChime();
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.55 }, colors: [primaryColor, accentColor, '#ffffff'] });
    if (!window.isCelebrationEditorMode) {
      loadAndPlayTrack(0, true);
    }
    stage1.style.display = 'none';
    stage2.style.display = 'flex';
  });

  function launchIntoAct2() {
    synth.playChime();
    flashOverlay.classList.add('is-flashing');
    setTimeout(() => {
      goToAct(2);
      flashOverlay.classList.remove('is-flashing');
    }, 320);
  }

  rootEl.querySelector('#bdBtnStage2Tap').addEventListener('click', launchIntoAct2);

  // Pull slider mechanics
  const pullTrack = rootEl.querySelector('#bdPullTrack');
  const pullKnob = rootEl.querySelector('#bdPullKnob');
  const pullFill = rootEl.querySelector('#bdPullFill');
  let draggingPull = false;

  pullKnob.addEventListener('pointerdown', (e) => {
    draggingPull = true;
    pullKnob.setPointerCapture(e.pointerId);
  });
  pullKnob.addEventListener('pointermove', (e) => {
    if (!draggingPull) return;
    const rect = pullTrack.getBoundingClientRect();
    const maxX = rect.width - 62;
    const x = Math.max(0, Math.min(maxX, e.clientX - rect.left - 25));
    pullKnob.style.left = `${6 + x}px`;
    const pct = Math.round((x / maxX) * 100);
    pullFill.style.width = `${pct}%`;
    if (pct >= 88) {
      draggingPull = false;
      launchIntoAct2();
    }
  });
  pullKnob.addEventListener('pointerup', () => {
    if (!draggingPull) return;
    draggingPull = false;
    pullKnob.style.left = '6px';
    pullFill.style.width = '0%';
  });

  // Act II: Interactive Hero Nodes
  const btnToAct3 = rootEl.querySelector('#bdBtnToAct3');
  rootEl.querySelectorAll('[data-node-idx]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.nodeIdx);
      const note = heroNotes[idx];
      if (!note) return;
      synth.playSpark();
      btn.classList.add('is-visited');
      rootEl.querySelector('#bdHeroNoteLabel').textContent = `✦ ${note.label}`;
      rootEl.querySelector('#bdHeroNoteText').textContent = note.text;
      btnToAct3.classList.remove('is-locked');
      btnToAct3.disabled = false;
    });
  });
  btnToAct3.addEventListener('click', () => {
    if (!btnToAct3.disabled) goToAct(3);
  });

  // Act III: Milestones
  function selectMilestone(idx) {
    currentMsIdx = Math.max(0, Math.min(milestones.length - 1, idx));
    const fillPct = Math.round(((currentMsIdx + 1) / milestones.length) * 100);
    rootEl.querySelector('#bdTimelineFill').style.height = `${fillPct}%`;
    rootEl.querySelectorAll('[data-ms-item]').forEach((el) => {
      const n = Number(el.dataset.msItem);
      el.classList.toggle('is-unlocked', n <= currentMsIdx);
      el.classList.toggle('is-current', n === currentMsIdx);
    });
    rootEl.querySelectorAll('[data-ms-jump]').forEach((pill) => {
      if (pill.closest('#bdMilestonePills')) {
        pill.classList.toggle('is-active', Number(pill.dataset.msJump) === currentMsIdx);
      }
    });
  }
  rootEl.querySelectorAll('[data-ms-jump]').forEach((btn) => {
    btn.addEventListener('click', () => {
      synth.playSpark();
      selectMilestone(Number(btn.dataset.msJump));
    });
  });
  rootEl.querySelector('#bdBtnNextMilestone').addEventListener('click', () => {
    synth.playSpark();
    selectMilestone((currentMsIdx + 1) % milestones.length);
  });
  rootEl.querySelector('#bdBtnToAct4').addEventListener('click', () => goToAct(4));

  // Act IV: Deck & Appreciation
  rootEl.querySelectorAll('[data-deck-tab]').forEach((tab) => {
    tab.addEventListener('click', () => {
      rootEl.querySelectorAll('[data-deck-tab]').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      const target = tab.dataset.deckTab;
      rootEl.querySelector('#bdTabMixtape').style.display = target === 'mixtape' ? 'block' : 'none';
      rootEl.querySelector('#bdTabSpotify').style.display = target === 'spotify' ? 'block' : 'none';
      rootEl.querySelector('#bdTabYoutube').style.display = target === 'youtube' ? 'block' : 'none';
    });
  });
  btnPlayPause.addEventListener('click', togglePlay);
  rootEl.querySelector('#bdBtnPrevTrack').addEventListener('click', () => loadAndPlayTrack(currentTrackIdx - 1, true));
  rootEl.querySelector('#bdBtnNextTrack').addEventListener('click', () => loadAndPlayTrack(currentTrackIdx + 1, true));

  function showReason(idx) {
    currentReasonIdx = idx % appreciationReasons.length;
    rootEl.querySelector('#bdReasonNum').textContent = `REASON #${currentReasonIdx + 1}`;
    rootEl.querySelector('#bdReasonText').textContent = appreciationReasons[currentReasonIdx] || '';
    rootEl.querySelectorAll('[data-reason-idx]').forEach((b) => {
      b.classList.toggle('is-active', Number(b.dataset.reasonIdx) === currentReasonIdx);
    });
  }
  rootEl.querySelectorAll('[data-reason-idx]').forEach((btn) => {
    btn.addEventListener('click', () => showReason(Number(btn.dataset.reasonIdx)));
  });
  rootEl.querySelector('#bdBtnShuffleReason').addEventListener('click', () => {
    synth.playSpark();
    showReason((currentReasonIdx + 1) % appreciationReasons.length);
  });
  rootEl.querySelector('#bdBtnToAct5').addEventListener('click', () => goToAct(5));

  // Act V: 3D Carousel & Book View
  const ring = rootEl.querySelector('#bdCarouselRing');
  const cards = Array.from(rootEl.querySelectorAll('.bday-carousel-card'));
  const totalPhotos = Math.max(1, cards.length);
  const angleStep = 360 / totalPhotos;
  const radius = Math.max(190, totalPhotos * 42);

  function updateCarousel() {
    cards.forEach((card, i) => {
      card.style.transform = `rotateY(${i * angleStep}deg) translateZ(${radius}px)`;
    });
    ring.style.transform = `translateZ(-${radius}px) rotateY(${-carouselIndex * angleStep}deg)`;
    const activePhoto = photos[((carouselIndex % totalPhotos) + totalPhotos) % totalPhotos];
    if (activePhoto) {
      rootEl.querySelector('#bdPhotoDetailMeta').textContent = `${activePhoto.category || 'Memory'} • ${activePhoto.date || ''}`;
      rootEl.querySelector('#bdPhotoDetailCaption').textContent = activePhoto.caption || '';
    }
  }
  updateCarousel();

  rootEl.querySelector('#bdCarPrev').addEventListener('click', () => { carouselIndex -= 1; updateCarousel(); });
  rootEl.querySelector('#bdCarNext').addEventListener('click', () => { carouselIndex += 1; updateCarousel(); });
  rootEl.querySelectorAll('[data-photo-idx]').forEach((card) => {
    card.addEventListener('click', () => {
      carouselIndex = Number(card.dataset.photoIdx);
      updateCarousel();
    });
  });

  // Touch swipe on carousel
  let carStartX = 0;
  const carStage = rootEl.querySelector('#bdCarouselStage');
  carStage.addEventListener('pointerdown', (e) => { carStartX = e.clientX; });
  carStage.addEventListener('pointerup', (e) => {
    const dx = e.clientX - carStartX;
    if (Math.abs(dx) > 30) {
      carouselIndex += dx < 0 ? 1 : -1;
      updateCarousel();
    }
  });

  rootEl.querySelector('#bdViewCarousel').addEventListener('click', (e) => {
    e.currentTarget.classList.add('is-active');
    rootEl.querySelector('#bdViewBook').classList.remove('is-active');
    rootEl.querySelector('#bdCarouselMode').style.display = 'block';
    rootEl.querySelector('#bdBookMode').style.display = 'none';
  });
  rootEl.querySelector('#bdViewBook').addEventListener('click', (e) => {
    e.currentTarget.classList.add('is-active');
    rootEl.querySelector('#bdViewCarousel').classList.remove('is-active');
    rootEl.querySelector('#bdCarouselMode').style.display = 'none';
    rootEl.querySelector('#bdBookMode').style.display = 'block';
  });
  rootEl.querySelector('#bdBtnToAct6').addEventListener('click', () => goToAct(6));

  // Act VI: Wax Seal Ignition
  const waxSeal = rootEl.querySelector('#bdWaxSeal');
  waxSeal.addEventListener('click', () => {
    synth.playChime();
    waxSeal.classList.add('is-melting');
    setTimeout(() => {
      rootEl.querySelector('#bdEnvelopeCard').style.display = 'none';
      rootEl.querySelector('#bdLetterPaper').style.display = 'block';
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: [primaryColor, accentColor] });
    }, 360);
  });
  rootEl.querySelector('#bdBtnToAct7').addEventListener('click', () => goToAct(7));

  // Act VII: Twilight Sky Lanterns
  const skyStage = rootEl.querySelector('#bdSkyStage');
  let wishCursor = 0;
  function spawnLantern(xPct, wishText) {
    const lantern = document.createElement('div');
    lantern.className = 'bday-lantern';
    lantern.style.left = `${Math.max(8, Math.min(88, xPct))}%`;
    lantern.innerHTML = `
      <div class="bday-lantern-body"></div>
      <div class="bday-lantern-wish">${esc(wishText)}</div>
    `;
    skyStage.appendChild(lantern);
    setTimeout(() => lantern.remove(), 9200);
  }

  skyStage.addEventListener('click', (e) => {
    if (e.target.closest('button')) return;
    const rect = skyStage.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const wish = lanternWishes[wishCursor % lanternWishes.length];
    wishCursor += 1;
    synth.playSpark();
    spawnLantern(xPct, wish);
  });

  rootEl.querySelector('#bdBtnLaunchLanterns').addEventListener('click', () => {
    synth.playChime();
    lanternWishes.forEach((w, i) => {
      setTimeout(() => spawnLantern(15 + (i * 18) % 72, w), i * 320);
    });
  });
  rootEl.querySelector('#bdBtnToAct8').addEventListener('click', () => goToAct(8));

  // Act VIII: Golden Ink Signature Canvas
  const sigCanvas = rootEl.querySelector('#bdSigCanvas');
  const sigCtx = sigCanvas.getContext('2d');
  let drawingSig = false;

  function getSigPos(e) {
    const rect = sigCanvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * sigCanvas.width,
      y: ((e.clientY - rect.top) / rect.height) * sigCanvas.height
    };
  }

  sigCanvas.addEventListener('pointerdown', (e) => {
    drawingSig = true;
    hasSigned = true;
    sigCanvas.setPointerCapture(e.pointerId);
    const pt = getSigPos(e);
    sigCtx.strokeStyle = '#b45309';
    sigCtx.lineWidth = 3.2;
    sigCtx.lineCap = 'round';
    sigCtx.lineJoin = 'round';
    sigCtx.beginPath();
    sigCtx.moveTo(pt.x, pt.y);
  });
  sigCanvas.addEventListener('pointermove', (e) => {
    if (!drawingSig) return;
    const pt = getSigPos(e);
    sigCtx.lineTo(pt.x, pt.y);
    sigCtx.stroke();
  });
  sigCanvas.addEventListener('pointerup', () => { drawingSig = false; });

  rootEl.querySelector('#bdBtnClearSig').addEventListener('click', () => {
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    hasSigned = false;
  });

  rootEl.querySelector('#bdBtnAffixSeal').addEventListener('click', () => {
    if (!hasSigned) {
      // Auto-draw a graceful flourish if user clicks seal directly
      sigCtx.strokeStyle = '#b45309';
      sigCtx.lineWidth = 3;
      sigCtx.beginPath();
      sigCtx.moveTo(160, 82);
      sigCtx.bezierCurveTo(220, 42, 310, 108, 390, 66);
      sigCtx.stroke();
      hasSigned = true;
    }
    synth.playChime();
    rootEl.querySelector('#bdSealedResult').style.display = 'block';
    confetti({ particleCount: 95, spread: 90, origin: { y: 0.65 }, colors: [primaryColor, accentColor, '#ffffff'] });
    setTimeout(() => goToAct(9), 1100);
  });

  // Finale: Replay
  rootEl.querySelector('#bdBtnReplay').addEventListener('click', () => {
    if (audioEl) { audioEl.pause(); audioEl.currentTime = 0; }
    synth.stopLoop();
    isPlaying = false;
    syncAudioUi();
    stage1.style.display = 'flex';
    stage2.style.display = 'none';
    pullKnob.style.left = '6px';
    pullFill.style.width = '0%';
    rootEl.querySelector('#bdEnvelopeCard').style.display = 'block';
    rootEl.querySelector('#bdLetterPaper').style.display = 'none';
    waxSeal.classList.remove('is-melting');
    goToAct(1);
  });

  // Cleanup hook for Studio preview switching
  const cleanup = () => {
    clearTimeout(preloaderTimer);
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resizeCanvas);
    if (audioEl) {
      audioEl.pause();
      audioEl = null;
    }
    synth.destroy();
  };
  container._cleanup = cleanup;
  return cleanup;
}
