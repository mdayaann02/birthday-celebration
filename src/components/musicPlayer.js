// src/components/musicPlayer.js - Floating Ambient Music Player Bar

export function initMusicPlayer(container, config) {
  const { audioTitle, audioSubtitle, audioSrc } = config.general;

  container.innerHTML = `
    <div class="music-player-bar" id="musicPlayerBar">
      <div class="vinyl-thumb" id="vinylThumb">
        <img src="${config.photoRibbon[0]?.url || '/images/sunset.jpg'}" alt="Cover" />
      </div>
      <div class="track-info">
        <div class="track-title" id="playerTitle">${audioTitle || "Sweety's Song"}</div>
        <div class="track-sub" id="playerSub">${audioSubtitle || "BIRTHDAY PLAYLIST"}</div>
      </div>
      <div class="player-controls">
        <button class="btn-play-pause" id="btnPlayPause" aria-label="Play / Pause">
          <svg id="iconPlay" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <svg id="iconPause" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        </button>
        <div class="progress-container" id="playerProgressContainer">
          <div class="progress-bar-fill" id="playerProgressBar"></div>
        </div>
        <span class="time-display" id="playerTime">0:00</span>
      </div>
    </div>
    <audio id="globalAudio" preload="auto">
      <source src="${audioSrc || '/audio/song.mp3'}" type="audio/mpeg">
    </audio>
  `;

  const audio = document.getElementById("globalAudio");
  const btnPlay = document.getElementById("btnPlayPause");
  const iconPlay = document.getElementById("iconPlay");
  const iconPause = document.getElementById("iconPause");
  const vinylThumb = document.getElementById("vinylThumb");
  const progressBar = document.getElementById("playerProgressBar");
  const progressContainer = document.getElementById("playerProgressContainer");
  const timeDisplay = document.getElementById("playerTime");

  let isPlaying = false;

  function updatePlayState(playing) {
    isPlaying = playing;
    if (playing) {
      iconPlay.style.display = "none";
      iconPause.style.display = "block";
      vinylThumb.classList.add("spinning");
    } else {
      iconPlay.style.display = "block";
      iconPause.style.display = "none";
      vinylThumb.classList.remove("spinning");
    }
  }

  btnPlay.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => updatePlayState(true)).catch(err => {
        console.warn("Audio playback prevented:", err);
      });
    } else {
      audio.pause();
      updatePlayState(false);
    }
  });

  // Global user interaction trigger for autoplay policy
  const onFirstInteraction = () => {
    if (audio.paused && !isPlaying) {
      audio.play().then(() => {
        updatePlayState(true);
      }).catch(() => {});
    }
    window.removeEventListener("click", onFirstInteraction);
    window.removeEventListener("touchstart", onFirstInteraction);
  };
  window.addEventListener("click", onFirstInteraction, { once: true });
  window.addEventListener("touchstart", onFirstInteraction, { once: true });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${pct}%`;
    const curMins = Math.floor(audio.currentTime / 60);
    const curSecs = Math.floor(audio.currentTime % 60);
    timeDisplay.textContent = `${curMins}:${curSecs < 10 ? '0' : ''}${curSecs}`;
  });

  audio.addEventListener("ended", () => {
    updatePlayState(false);
    progressBar.style.width = "0%";
  });

  progressContainer.addEventListener("click", (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (audio.duration) {
      audio.currentTime = pos * audio.duration;
    }
  });
}
