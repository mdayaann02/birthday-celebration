// src/components/musicPlayer.js - Sleek Spinning Mini CD Player (Upper Right Corner)

export function initMusicPlayer(container, config = {}) {
  if (!container) return;
  const general = config.general || config || {};
  const audioTitle = general.audioTitle || config.audioTitle || "Romantic Track";
  const audioSubtitle = general.audioSubtitle || config.audioSubtitle || "CELEBRATION";
  const audioSrc = general.audioSrc || config.audioSrc || "/audio/alfaaz.mp3";
  const coverUrl = config.photoRibbon?.[0]?.url || 
                   config.polaroids?.[0]?.image || 
                   config.photos?.[0] ||
                   general.photoRibbon?.[0]?.url || 
                   general.polaroids?.[0]?.image || 
                   '/images/sunset.jpg';

  container.innerHTML = `
    <div class="corner-mini-cd-player" id="cornerCdPlayer" role="button" aria-label="Toggle Music Player" title="Tap to Play / Pause Music">
      <!-- Spinning Mini Vinyl CD Disc -->
      <div class="mini-cd-disc" id="miniCdDisc">
        <div class="cd-groove-rings"></div>
        <div class="cd-holo-sheen"></div>
        <div class="cd-center-sticker">
          <img src="${coverUrl}" class="cd-cover-art" id="cdCoverArt" alt="Cover" onerror="this.src='/images/sunset.jpg'" />
          <span class="cd-center-spindle"></span>
        </div>
      </div>

      <!-- Compact Audio Status & Track Badge -->
      <div class="cd-track-pill" id="cdTrackPill">
        <div class="cd-pill-equalizer" id="cdEqualizer">
          <span></span><span></span><span></span>
        </div>
        <span class="cd-pill-title" id="cdPillTitle">${audioTitle || "Romantic Track"}</span>
      </div>

      <audio id="globalAudio" preload="auto" loop>
        <source src="${audioSrc || '/audio/alfaaz.mp3'}" type="audio/mpeg">
      </audio>
    </div>
  `;

  const audio = container.querySelector('#globalAudio');
  const cdDisc = container.querySelector('#miniCdDisc');
  const cdPlayer = container.querySelector('#cornerCdPlayer');
  const cdPill = container.querySelector('#cdTrackPill');
  const cdTitle = container.querySelector('#cdPillTitle');

  if (!audio || !cdPlayer) return;

  let isPlaying = false;
  let pillTimer = null;

  function showPillBriefly(duration = 2600) {
    if (cdPill) {
      cdPill.classList.add('visible');
      clearTimeout(pillTimer);
      pillTimer = setTimeout(() => {
        cdPill.classList.remove('visible');
      }, duration);
    }
  }

  function setPlayingState(playing) {
    isPlaying = playing;
    if (playing) {
      if (cdDisc) cdDisc.classList.add('spinning');
      if (cdPlayer) cdPlayer.classList.add('is-playing');
      showPillBriefly();
    } else {
      if (cdDisc) cdDisc.classList.remove('spinning');
      if (cdPlayer) cdPlayer.classList.remove('is-playing');
    }
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        setPlayingState(true);
      }).catch(err => {
        console.warn("Audio playback waiting for gesture:", err);
      });
    } else {
      audio.pause();
      setPlayingState(false);
    }
    if (navigator.vibrate) navigator.vibrate(20);
  }

  cdPlayer.addEventListener('click', togglePlay);

  // In editor mode, NEVER autoplay on click/touch/interaction!
  const isEditorMode = Boolean(window.isCelebrationEditorMode) ||
                       Boolean(document.querySelector('.studio-layout')) ||
                       Boolean(container.closest('.studio-layout')) ||
                       Boolean(container.closest('#previewContainer'));

  if (!isEditorMode) {
    // Auto-play on first touch/click anywhere on page ONLY in recipient viewer mode
    const onFirstInteraction = () => {
      if (audio.paused && !isPlaying) {
        audio.play().then(() => {
          setPlayingState(true);
        }).catch(() => {});
      }
      window.removeEventListener('click', onFirstInteraction);
      window.removeEventListener('touchstart', onFirstInteraction);
      window.removeEventListener('pointerdown', onFirstInteraction);
    };

    window.addEventListener('click', onFirstInteraction, { once: true });
    window.addEventListener('touchstart', onFirstInteraction, { once: true });
    window.addEventListener('pointerdown', onFirstInteraction, { once: true });
  }

  audio.addEventListener('play', () => setPlayingState(true));
  audio.addEventListener('pause', () => setPlayingState(false));
  audio.addEventListener('ended', () => setPlayingState(false));
}
