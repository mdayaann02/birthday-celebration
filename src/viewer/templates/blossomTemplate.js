// src/viewer/templates/blossomTemplate.js - Pro-Grade Cinematic Long Romance Masterpiece
// Complete unified experience powered by:
// 1. Viral Reel Blossom Opener | 2. Vector Cupid Archery | 3. Kinetic Typography Film |
// 4. Full-Screen 60fps Blossom Tree with Volumetric God Rays & Interactive Wind Petals |
// 5. Ultra-Realistic 3D Hardcover Memory Flipbook with StPageFlip Physical Curl & Touch Swipes |
// 6. Wax-Sealed Burn-To-Reveal Letter | 7. Three.js WebGL 3D Twilight Celestial Sky Lanterns Finale |
// 8. Lenis Smooth Momentum Scrolling | 9. Sticky Top Chapter Dock Navigation.

import gsap from 'gsap';
import confetti from 'canvas-confetti';
import * as THREE from 'three';
import Lenis from 'lenis';
import pkgPageFlip from 'page-flip';
import html2canvas from 'html2canvas';
import mediumZoom from 'medium-zoom';
import { soundFx } from '../audioSynth.js';

const PageFlip = pkgPageFlip?.PageFlip || pkgPageFlip;

// Register GSAP pen-stroke plugin for the hand-drawn underline
try {
  gsap.registerPlugin({
    name: 'drawn',
    init(target, value) {
      const len = target.getTotalLength();
      target.style.strokeDasharray = len;
      this.target = target;
      this.len = len;
      this.value = value;
    },
    render(ratio, data) {
      data.target.style.strokeDashoffset = data.len * (1 - data.value * ratio);
    },
  });
} catch (e) {
  // Ignore re-registration errors
}


function formatSpotifyEmbedUrl(url) {
  if (!url) return '';
  try {
    let clean = url.trim();
    const iframeMatch = clean.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) clean = iframeMatch[1];
    if (clean.includes('/embed/')) return clean;
    const match = clean.match(/open\.spotify\.com(?:\/intl-[a-z]{2})?\/(track|playlist|album|artist|show|episode)\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/${match[1]}/${match[2]}?utm_source=generator&theme=0`;
    }
    const uriMatch = clean.match(/spotify:(playlist|track|album|artist):([a-zA-Z0-9]+)/);
    if (uriMatch) {
      return `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}?utm_source=generator&theme=0`;
    }
    return clean;
  } catch (_) {
    return url;
  }
}

function formatYouTubeEmbedUrl(url) {
  if (!url) return '';
  try {
    let clean = url.trim();
    const iframeMatch = clean.match(/src=["']([^"']+)["']/i);
    if (iframeMatch) clean = iframeMatch[1];
    if (clean.includes('youtube.com/embed/')) return clean;
    const listMatch = clean.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (listMatch) {
      return `https://www.youtube.com/embed/videoseries?list=${listMatch[1]}`;
    }
    const vMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]+)/);
    if (vMatch) return `https://www.youtube.com/embed/${vMatch[1]}?autoplay=0&rel=0`;
    const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}?autoplay=0&rel=0`;
    const liveMatch = clean.match(/youtube\.com\/live\/([a-zA-Z0-9_-]+)/);
    if (liveMatch) return `https://www.youtube.com/embed/${liveMatch[1]}?autoplay=0&rel=0`;
    const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}?autoplay=0&rel=0`;
    return clean;
  } catch (_) {
    return url;
  }
}

export function renderBlossomTemplate(container, initialData = {}, isMakerReview = false) {
  const data = initialData || {};
  
  const rawSpotify = data.spotifyUrl || data.spotifyPlaylistUrl || data.spotifyEmbedUrl || data.spotifyEmbed || data.spotify || '';
  const rawYoutube = data.youtubeUrl || data.youtubePlaylistUrl || data.youtubeEmbedUrl || data.youtubeEmbed || data.youtube || '';
  const spotifyEmbed = formatSpotifyEmbedUrl(rawSpotify);
  const youtubeEmbed = formatYouTubeEmbedUrl(rawYoutube);
  const audioSrc = data.audioSrc || data.audioUrl || data.songUrl || data.musicUrl || '/audio/alfaaz.mp3';
  const audioTitle = data.audioTitle || data.songTitle || 'Our Romantic Theme';
  const recipient = data.recipientName || 'My Love';
  const sender = data.senderName || 'Yours Truly';

  const defaultPlaylist = [
    { id: 1, title: data.audioTitle || "Alfaaz", artist: data.audioSubtitle || "Hamza Malik & Zain Zohaib", src: data.audioSrc || "/audio/alfaaz.mp3", tag: "OUR THEME 🌸", duration: "3:42" },
    { id: 2, title: "Blossom Romance Symphony", artist: "Romantic Instrumental", src: "/audio/blossom_song.mp3", tag: "FIRST DATE 🫶", duration: "3:58" },
    { id: 3, title: "Happy Birthday Acoustic Wish", artist: "Acoustic Guitar & Piano", src: "/audio/song.mp3", tag: "SPECIAL CELEBRATION ✨", duration: "2:45" },
    { id: 4, title: "Always In My Heart", artist: "Soft Piano Reverie", src: "/audio/alfaaz.mp3", tag: "SWEET MOMENTS 💖", duration: "3:42" },
    { id: 5, title: "Golden Hour Sakura", artist: "Orchestral Blossom", src: "/audio/blossom_song.mp3", tag: "FOREVER YOURS 👑", duration: "3:58" }
  ];

  const playlist = (Array.isArray(data.playlist) && data.playlist.length > 0)
    ? data.playlist
    : defaultPlaylist;

  const polaroids = data.polaroids && data.polaroids.length > 0 ? data.polaroids : [
    { image: '/images/sunset.jpg', caption: 'Our favourite sunset walk 🌅', note: 'I knew right then and there that you were the one I want by my side forever.' },
    { image: '/images/always_you.jpg', caption: 'Always laughing with you 🫶', note: 'Your laugh is my absolute favourite melody in this entire universe.' },
    { image: '/images/pretty.jpg', caption: 'Your breathtaking smile ✨', note: 'You light up every single room you walk into just by being yourself.' },
    { image: '/images/dream_girl.jpg', caption: 'Adventures of a lifetime 💫', note: 'Every single step by your side feels like walking through paradise.' },
    { image: '/images/queen.jpg', caption: 'Forever my queen 👑', note: 'The kindest, most radiant soul. My heart belongs completely and unconditionally to you.' }
  ];

  const loveNotesList = data.loveNotes && data.loveNotes.length > 0 ? data.loveNotes : [
    "You are the prettiest sight in my entire universe 🌸",
    "Every moment with you feels like pure, effortless magic ✨",
    "Your smile is my absolute favourite thing in this world 🥰",
    "I fall in love with you all over again every single day 💖",
    "Thank you for being my constant happy place and home 🫶",
    "Here is to a lifetime of love and unforgettable memories 🥂"
  ];

  const reasonsList = data.reasons && data.reasons.length > 0 ? data.reasons : [
    "The way your eyes sparkle whenever you laugh wholeheartedly",
    "How you make every single ordinary day feel like home",
    "Your endless kindness and the purest, most compassionate heart",
    "How we can talk for hours about absolutely everything and nothing"
  ];

  const constellationsList = data.constellations && data.constellations.length > 0 ? data.constellations : [
    { title: "The First Spark", date: "Where It Began", note: "The exact moment the universe guided my eyes to yours, and my world changed forever.", x: 20, y: 32 },
    { title: "Midnight Drives", date: "2 AM Talks", note: "Late-night drives with windows down, singing along, sharing every quiet dream.", x: 45, y: 22 },
    { title: "Quiet Safe Harbor", date: "The Comfort", note: "Finding the only person in the world where silence feels completely peaceful and safe.", x: 78, y: 35 },
    { title: "The Turning Point", date: "I Just Knew", note: "The day I caught myself smiling at nothing, realizing I never want a tomorrow without you.", x: 32, y: 72 },
    { title: "Our North Star", date: "Forever Yours", note: "Through every storm, change of seasons, and adventure, you are my eternal guiding light.", x: 68, y: 76 }
  ];

  const milestonesList = data.milestones && data.milestones.length > 0 ? data.milestones : [
    {
      num: "01",
      icon: "✨",
      tag: "THE SPARK",
      title: "Where Our Story Began",
      date: "June 14, 2022",
      image: "/images/sunset.jpg",
      desc: "One single glance that stopped time. A brief hello that quietly turned into the most meaningful connection of my entire life."
    },
    {
      num: "02",
      icon: "🌙",
      tag: "THE CONFESSION",
      title: "Falling in Love with Your Soul",
      date: "August 28, 2022",
      image: "/images/always_you.jpg",
      desc: "Laughing so hard our ribs hurt, talking until 4 AM about childhood dreams and life philosophies. I realized I was falling completely."
    },
    {
      num: "03",
      icon: "🛡️",
      tag: "THE ANCHOR",
      title: "Weathering Every Storm Together",
      date: "February 12, 2023",
      image: "/images/pretty.jpg",
      desc: "Life isn't always sunny, but standing shoulder-to-shoulder with you proved that we can conquer any challenge as a team."
    },
    {
      num: "04",
      icon: "📸",
      tag: "THE ADVENTURES",
      title: "A Thousand Unfiltered Memories",
      date: "July 04, 2023",
      image: "/images/dream_girl.jpg",
      desc: "Spontaneous road trips, messy cooking experiments, late-night grocery runs. The ordinary world becomes pure magic with you."
    },
    {
      num: "05",
      icon: "💍",
      tag: "ETERNITY",
      title: "Today, Tomorrow & Across Lifetimes",
      date: "November 25, 2024",
      image: "/images/queen.jpg",
      desc: "In a world of fleeting moments, choosing you is the easiest decision I'll ever make. My heart is, and will forever be, your home."
    }
  ];

  const letterBody = data.letterText || `My Dearest ${recipient},

From the very first day you walked into my world, you brought soft colors, warmth, and a quiet joy I never knew existed. Watching you smile, hearing your voice, and growing beside you has been the greatest gift of my life.

Thank you for choosing me, for believing in us, and for making every sunrise brighter. No matter where life takes us, my hand will always be reaching for yours.

I love you endlessly, today, tomorrow, and through all our years to come. ♡`;

  container.innerHTML = `
    <div class="tree-film-stage scene" id="treeFilmStage">
      <!-- GLOBAL 60FPS THREE.JS GPU MASTER ENGINE -->
      <canvas class="romance-master-three-canvas" id="romanceMaster3D" aria-hidden="true"></canvas>

      <!-- CONTINUOUS AMBIENT SAKURA BLOSSOM PETALS RAIN -->
      <div class="ambient-sakura-rain-layer" id="ambientSakuraRain" aria-hidden="true">
        <span class="sakura-petal-rain sp-1"></span>
        <span class="sakura-petal-rain sp-2"></span>
        <span class="sakura-petal-rain sp-3"></span>
        <span class="sakura-petal-rain sp-4"></span>
        <span class="sakura-petal-rain sp-5"></span>
        <span class="sakura-petal-rain sp-6"></span>
        <span class="sakura-petal-rain sp-7"></span>
        <span class="sakura-petal-rain sp-8"></span>
        <span class="sakura-petal-rain sp-9"></span>
        <span class="sakura-petal-rain sp-10"></span>
        <span class="sakura-petal-rain sp-11"></span>
        <span class="sakura-petal-rain sp-12"></span>
        <span class="sakura-petal-rain sp-13"></span>
        <span class="sakura-petal-rain sp-14"></span>
      </div>

      <!-- CINEMATIC PORTAL FLASH TRANSITION OVERLAY -->
      <div class="portal-flash-overlay" id="portalFlashOverlay" aria-hidden="true"></div>
      <!-- ACT 0: VIRAL REEL BLOSSOM OPENING GATE (SCENE 1) -->
      <div class="gate" id="treeGate" role="button" tabindex="0" aria-label="Touch the blossom to unwrap">
        <div class="gate__sparkles" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="viral-flower-stage" style="margin-bottom: 12px;">
          <div class="viral-flower-btn" id="viralFlowerBtn">
            <svg class="viral-flower-svg" viewBox="0 0 100 100" width="135" height="135">
              <defs>
                <radialGradient id="vgSakura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#fff5f8" stop-opacity="0.95"/>
                  <stop offset="45%" stop-color="#fbcfe8" stop-opacity="0.92"/>
                  <stop offset="85%" stop-color="#f43f5e" stop-opacity="0.88"/>
                  <stop offset="100%" stop-color="#be123c" stop-opacity="0.85"/>
                </radialGradient>
                <filter id="vgGlow" x="-25%" y="-25%" width="150%" height="150%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <g filter="url(#vgGlow)">
                <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)"/>
                <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(72 50 50)"/>
                <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(144 50 50)"/>
                <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(216 50 50)"/>
                <path d="M50 50 C44 32 30 18 50 8 C70 18 56 32 50 50" fill="url(#vgSakura)" transform="rotate(288 50 50)"/>
                <circle cx="50" cy="50" r="7.5" fill="#e11d48"/>
                <circle cx="50" cy="50" r="3.5" fill="#fef08a"/>
              </g>
            </svg>
            <div class="viral-flower-glow-halo"></div>
          </div>
          <canvas id="blossomBurstCanvas" class="blossom-burst-canvas"></canvas>
        </div>
        <p class="gate__label">✦ Touch the blossom to bloom &amp; unwrap ✦<span class="gate__dots"><span>.</span><span>.</span><span>.</span></span></p>
      </div>

      <!-- ACT 4: PROCEDURAL CANVAS TREE -->
      <canvas id="treeCanvas" class="tree" aria-label="A blossom tree grows and blooms into a heart made of petals" role="img"></canvas>

      <!-- ACT 1: HERO ARCHERY & BEATING HEART TARGET -->
      <section class="hero" id="treeHero" aria-label="Draw the bow to open your card">
        <div class="hero__bg" aria-hidden="true"></div>
        <div class="hero__motes" id="treeMotes" aria-hidden="true"></div>

        <p class="hero__eyebrow" id="treeEyebrow">${data.eyebrow || `a little something, for ${recipient}`}</p>

        <!-- TARGET HEART -->
        <div class="targetWrap" aria-hidden="true">
          <div class="target" id="treeTarget">
            <span class="heart__glow" aria-hidden="true"></span>
            <span class="target__heart" id="treeTargetHeart">
              <svg class="heart__svg" viewBox="0 0 100 92" aria-hidden="true">
                <defs>
                  <radialGradient id="blossom_tree_hg" cx="38%" cy="30%" r="80%">
                    <stop offset="0%" stop-color="#ffd9e4" />
                    <stop offset="42%" stop-color="#ff6f97" />
                    <stop offset="82%" stop-color="#d81e57" />
                    <stop offset="100%" stop-color="#9d0f3e" />
                  </radialGradient>
                  <linearGradient id="blossom_tree_hsheen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="rgba(255,255,255,.85)" />
                    <stop offset="34%" stop-color="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#blossom_tree_hg)" />
                <path d="M50 86.5C26 68 10.5 53.6 10.5 34.6 10.5 20.4 21 11 33.2 11c8.6 0 14.2 4.7 16.8 11.4C52.6 15.7 58.2 11 66.8 11 79 11 89.5 20.4 89.5 34.6 89.5 53.6 74 68 50 86.5Z" fill="url(#blossom_tree_hsheen)" opacity=".7" />
                <ellipse cx="34" cy="30" rx="8.5" ry="5.4" fill="#fff" opacity=".72" style="mix-blend-mode:screen" />
              </svg>
            </span>
          </div>
        </div>

        <!-- RECURVE BOW + CUPID'S ARROW -->
        <div class="archery" id="treeArchery" role="button" tabindex="0" aria-label="Draw the bow and release to send the arrow to the heart">
          <div class="aim" id="treeAim" aria-hidden="true"></div>
          <svg class="bow" id="treeBow" viewBox="0 0 460 300" aria-hidden="true">
            <defs>
              <linearGradient id="blossom_limb" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#4a2a1a" />
                <stop offset=".18" stop-color="#6b3f24" />
                <stop offset=".5" stop-color="#8a5127" />
                <stop offset=".82" stop-color="#6b3f24" />
                <stop offset="1" stop-color="#4a2a1a" />
              </linearGradient>
              <linearGradient id="blossom_limbHi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="rgba(255,214,160,.8)" />
                <stop offset="1" stop-color="rgba(255,214,160,0)" />
              </linearGradient>
              <linearGradient id="blossom_grip" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#2a1a10" />
                <stop offset=".5" stop-color="#5a3822" />
                <stop offset="1" stop-color="#2a1a10" />
              </linearGradient>
            </defs>
            <path class="bow__limb" d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96" fill="none" stroke="url(#blossom_limb)" stroke-width="13" stroke-linecap="round" />
            <path class="bow__limbHi" d="M34 96 C 118 168, 168 240, 230 252 C 292 240, 342 168, 426 96" fill="none" stroke="url(#blossom_limbHi)" stroke-width="3" stroke-linecap="round" opacity=".7" />
            <path d="M34 96 C 22 82, 26 70, 40 66" fill="none" stroke="url(#blossom_limb)" stroke-width="8" stroke-linecap="round" />
            <path d="M426 96 C 438 82, 434 70, 420 66" fill="none" stroke="url(#blossom_limb)" stroke-width="8" stroke-linecap="round" />
            <rect x="216" y="206" width="28" height="70" rx="9" fill="url(#blossom_grip)" />
            <path d="M219 220h22 M219 236h22 M219 252h22" stroke="rgba(0,0,0,.35)" stroke-width="2" />
            <line class="bow__str" id="treeStrL" x1="40" y1="70" x2="230" y2="96" stroke="#9a8068" stroke-width="2.2" stroke-linecap="round" />
            <line class="bow__str" id="treeStrR" x1="420" y1="70" x2="230" y2="96" stroke="#9a8068" stroke-width="2.2" stroke-linecap="round" />
            <circle class="bow__serving" id="treeServing" cx="230" cy="96" r="4.5" fill="#6f5137" />
          </svg>

          <svg class="arrow" id="treeArrow" viewBox="0 0 64 220" aria-hidden="true">
            <defs>
              <linearGradient id="blossom_shaft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#4a2c14" />
                <stop offset=".5" stop-color="#8a5a2c" />
                <stop offset="1" stop-color="#3e2410" />
              </linearGradient>
              <linearGradient id="blossom_gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#ffe38c" />
                <stop offset=".45" stop-color="#f4a626" />
                <stop offset="1" stop-color="#a85f0e" />
              </linearGradient>
              <linearGradient id="blossom_feath" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#ff7f9c" />
                <stop offset=".5" stop-color="#e6396a" />
                <stop offset="1" stop-color="#a8154a" />
              </linearGradient>
              <linearGradient id="blossom_wing" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#ffffff" />
                <stop offset="1" stop-color="#ffe0c4" />
              </linearGradient>
            </defs>
            <rect x="29.4" y="30" width="5.2" height="168" rx="2.6" fill="url(#blossom_shaft)" />
            <g class="arrow__wings">
              <path class="wingL" d="M31 30 C 10 16, 2 20, 4 34 C 12 30, 20 32, 31 40 Z" fill="url(#blossom_wing)" stroke="rgba(196,132,58,.72)" stroke-width="1.2"/>
              <path class="wingR" d="M33 30 C 54 16, 62 20, 60 34 C 52 30, 44 32, 33 40 Z" fill="url(#blossom_wing)" stroke="rgba(196,132,58,.72)" stroke-width="1.2"/>
            </g>
            <path class="arrow__head" d="M32 12 C 30 7, 22 6.5, 21.5 13 C 21 18, 27 22, 32 27 C 37 22, 43 18, 42.5 13 C 42 6.5, 34 7, 32 12 Z" fill="url(#blossom_gold)" stroke="#a5701a" stroke-width=".8" />
            <ellipse cx="27" cy="13" rx="2.6" ry="1.7" fill="#fff" opacity=".8" style="mix-blend-mode:screen" />
            <g class="arrow__fletch">
              <path d="M32 150 C 16 156, 10 178, 15 200 C 24 194, 30 184, 32 176 Z" fill="url(#blossom_feath)" />
              <path d="M32 150 C 48 156, 54 178, 49 200 C 40 194, 34 184, 32 176 Z" fill="url(#blossom_feath)" opacity=".92" />
              <path d="M28 160l4 3 M26 170l6 3 M25 180l7 3" stroke="rgba(130,12,48,.45)" stroke-width="1" />
              <path d="M36 160l-4 3 M38 170l-6 3 M39 180l-7 3" stroke="rgba(130,12,48,.45)" stroke-width="1" />
            </g>
            <path d="M29 200 L32 205 L35 200" fill="none" stroke="#c9a25a" stroke-width="2" stroke-linecap="round"/>
            <circle id="treeTip" cx="32" cy="9" r="0.6" fill="none" />
          </svg>
        </div>

        <p class="hero__hint" id="treeHint">${data.hint || 'pull &amp; release'}</p>
        
        <button type="button" class="btn-quick-shoot-primary" id="btnTreeQuickShoot" style="position:absolute; bottom:16px; left:50%; transform:translateX(-50%); z-index:8;">
          🏹 Direct Cupid Strike 🎯
        </button>
      </section>

      <!-- ACT 2: ROSE FLOOD -->
      <div class="flood" id="treeFlood" aria-hidden="true"></div>

      <!-- ACT 3: KINETIC TYPOGRAPHY WISH -->
      <div class="field" id="treeField" aria-hidden="true">
        <div class="blob blob--1"></div>
        <div class="blob blob--2"></div>
        <div class="blob blob--3"></div>
        <div class="fgrid" id="treeFgrid"></div>
        <div class="fvignette"></div>

        <div class="camera" id="treeCamera">
          <p class="kEyebrow" id="treeKEyebrow">${data.kEyebrow || 'make a wish…'}</p>
          <h2 class="headline" id="treeHeadline">
            <span class="hl__line"><span class="mask"><span class="hl__word" id="treeWLine1">${data.wLine1 || 'Happy'}</span></span></span>
            <span class="hl__line"><span class="mask"><span class="hl__word" id="treeWLine2">${data.wLine2 || 'Birthday'}</span></span></span>
          </h2>
          <svg class="uline" id="treeUline" viewBox="0 0 300 26" fill="none" aria-hidden="true">
            <path class="uline__path" d="M8 16C56 7 132 4 178 6c30 1 78 5 114 12-40 3-108 4-176 3" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <p class="kSub" id="treeKSub">${data.kSub || 'to someone worth celebrating'}</p>
        </div>

        <div class="bar bar--top" id="treeBarTop"></div>
        <div class="bar bar--bot" id="treeBarBot"></div>
      </div>

      <!-- HANDOFF BLOOM -->
      <div class="bloom" id="treeBloom" aria-hidden="true"></div>

      <!-- ACT 4: CALLIGRAPHY WISH OVER TREE -->
      <div class="wish" id="treeWish" aria-hidden="true">
        <p class="wish__eyebrow" id="treeWEyebrow">${data.wEyebrow || 'and… make it count'}</p>
        <div class="wish__heroWrap"><h1 class="wish__hero" id="treeWHero">${data.wHero || `Happy Birthday, ${recipient}`}</h1></div>
        <span class="wish__rule" id="treeWRule"></span>
        <p class="wish__sub" id="treeWSub">${data.wSub || 'here’s to a year that blooms'}</p>
        <p class="loveHint" id="treeLoveHint">${data.loveHint || '✦ tap the blossoms ✦'}</p>
      </div>

      <!-- FLOATING LOVE NOTE BUBBLE -->
      <div class="loveNote" id="treeLoveNote" aria-hidden="true"><p id="treeLoveNoteText"></p></div>

      <!-- SHOOTING STAR -->
      <div class="star" id="treeStar" aria-hidden="true"></div>

      <!-- REPLAY & MEMORIES BUTTONS -->
      <button class="replay" id="treeReplay" type="button" hidden>
        <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
          <path d="M12 5V2L7 6l5 4V7a5 5 0 1 1-5 5H5a7 7 0 1 0 7-7z" fill="currentColor" />
        </svg>
        Again
      </button>

      <button class="btn-scene-next-hero tree-story-cta" id="treeMemoriesBtn" type="button" hidden>
        <span class="btn-next-spark">✦</span>
        <span class="btn-next-text">Continue to Chapter IV: Written in the Stars</span>
        <span class="btn-next-arrow">❯</span>
      </button>

      <!-- UPPER-RIGHT SPINNING MINI VINYL CD PLAYER -->
      <div class="corner-mini-cd-player" id="treeMusicToggle" role="button" aria-label="Toggle Music Player" title="Tap to Play / Pause Music">
        <div class="mini-cd-disc" id="treeMiniCd">
          <div class="cd-groove-rings"></div>
          <div class="cd-holo-sheen"></div>
          <div class="cd-center-sticker">
            <img src="${polaroids[0]?.image || '/images/sunset.jpg'}" class="cd-cover-art" alt="Cover" />
            <span class="cd-center-spindle"></span>
          </div>
        </div>
        <div class="cd-track-pill" id="treeTrackPill">
          <div class="cd-pill-equalizer"><span></span><span></span><span></span></div>
          <span class="cd-pill-title">${audioTitle}</span>
        </div>
        <audio id="treeAudio" loop preload="auto">
          <source src="${audioSrc}" type="audio/mpeg" />
        </audio>
      </div>

      <!-- ================= SCENE 4: CELESTIAL STARS (FULL-SCREEN 60FPS EXPERIENCE) ================= -->
      <section class="romance-fullscreen-scene scene-stars-fullscreen" data-scene="4" id="sceneConstellation" style="display:none; opacity:0;">
        <!-- Fullscreen Cosmic Canvas Engine -->
        <canvas id="constellationCanvas" class="constellation-fullscreen-canvas"></canvas>

        <!-- Top Floating Cinematic Header -->
        <div class="stars-floating-header">
          <span class="stars-eyebrow">CHAPTER IV • CELESTIAL ODYSSEY</span>
          <h2 class="stars-main-title">Written in the Stars</h2>
          <p class="stars-sub-hint">✦ Touch any star or watch our constellation connect across the cosmos 💫 ✦</p>
        </div>

        <!-- Floating Cosmic Glass Memory Card -->
        <div class="thanor-star-card" id="constellationMemoryCard" style="display:none;">
          <div class="thanor-card-header">
            <div class="thanor-star-icon-wrap">
              <span class="thanor-star-emoji">⭐</span>
              <span class="thanor-star-num" id="constNodeNum">STAR 01 / 05</span>
            </div>
            <div class="thanor-timer-badge">
              <span class="thanor-timer-text" id="thanorTimerText">Next in 3s</span>
              <div class="thanor-timer-bar-wrap">
                <div class="thanor-timer-bar-fill" id="thanorTimerBar"></div>
              </div>
            </div>
          </div>

          <div class="thanor-card-content">
            <h3 class="thanor-node-title" id="constNodeTitle">The First Spark</h3>
            <span class="thanor-node-date" id="constNodeDate">Where It Began</span>
            <p class="thanor-node-note" id="constNodeNote">The exact moment the universe guided my eyes to yours, and my world changed forever.</p>
          </div>

          <div class="thanor-card-footer">
            <span class="thanor-guidance-text">✦ Tracing our memories across eternity ✦</span>
            <button type="button" class="btn-thanor-next-star" id="btnThanorNextStar">Next Star ❯</button>
          </div>
        </div>

        <!-- Quick Selector Chips at bottom -->
        <div class="constellation-star-chips" id="constStarChips">
          ${constellationsList.map((c, i) => `
            <button type="button" class="const-star-chip ${i === 0 ? 'active' : ''}" data-idx="${i}">
              <span>✦</span> ${c.title}
            </button>
          `).join('')}
        </div>

        <!-- Hyperdrive Warp Overlay -->
        <div class="hyperdrive-warp-overlay" id="hyperdriveWarpOverlay">
          <div class="warp-speed-text">✦ ALL STARS ALIGNED • WARPING TO MIXTAPE ✦</div>
        </div>
      </section>

      <!-- ================= SCENE 5: INTERACTIVE MIXTAPE & REASONS ================= -->
      <section class="romance-fullscreen-scene scene-cassette-fullscreen" data-scene="5" id="sceneCassette" style="display:none; opacity:0;">
        <div class="scene-inner-wrap">
          <div class="romance-chapter-header">
            <span class="chapter-num-pill">CHAPTER V • THE SOUNDTRACK</span>
            <h3 class="chapter-title">The Soundtrack of Us</h3>
            <p class="chapter-desc">Our dedicated mixtape &amp; the reasons why my soul loves you forever 📻🌸</p>
          </div>

          <!-- Sakura Stereo Mixtape Cassette Player -->
          <div class="vintage-cassette-wrap" style="margin-bottom:24px; width:100%; max-width:540px;">
            <div class="cassette-body" id="vintageCassettePlayer">
              <div class="cassette-top-ridge"></div>
              <div class="cassette-label-area">
                <div class="cassette-label-header">
                  <span class="cassette-brand">🌸 SAKURA STEREO 90</span>
                  <span class="cassette-side">SIDE A • FOR ${recipient.toUpperCase()}</span>
                </div>
                <div class="cassette-title-line">
                  <span class="cassette-title-text" id="cassetteTitleText">${playlist[0].title} - ${playlist[0].artist || ''}</span>
                </div>
                <div class="cassette-window">
                  <div class="cassette-spool left-spool" id="spoolLeft">
                    <div class="spool-cog"></div>
                    <div class="tape-pack tape-pack-left" id="tapePackLeft"></div>
                  </div>
                  <div class="cassette-tape-bridge">
                    <div class="tape-ribbon-line"></div>
                  </div>
                  <div class="cassette-spool right-spool" id="spoolRight">
                    <div class="spool-cog"></div>
                    <div class="tape-pack tape-pack-right" id="tapePackRight"></div>
                  </div>
                </div>
                <div class="cassette-bottom-accent">
                  <span class="cassette-magnetic-head"></span>
                </div>
              </div>

              <!-- Cassette Scrub Progress Bar -->
              <div class="cassette-progress-container" id="cassetteProgressContainer">
                <span class="cassette-time-text" id="cassetteCurrentTime">0:00</span>
                <div class="cassette-progress-track" id="cassetteProgressTrack">
                  <div class="cassette-progress-fill" id="cassetteProgressBar"></div>
                </div>
                <span class="cassette-time-text" id="cassetteDuration">${playlist[0].duration || '3:45'}</span>
              </div>
            </div>

            <!-- Cassette Playback Controls -->
            <div class="cassette-deck-controls">
              <button type="button" class="btn-cassette-prev" id="btnCassettePrev" title="Previous Song">
                <span>⏮</span>
              </button>
              <button type="button" class="btn-cassette-play" id="btnCassettePlay">
                <span class="cassette-play-icon" id="cassettePlayIcon">▶</span>
                <span class="cassette-play-label" id="cassettePlayLabel">Play Melody</span>
              </button>
              <button type="button" class="btn-cassette-next" id="btnCassetteNext" title="Next Song">
                <span>⏭</span>
              </button>
              <div class="cassette-eq-bars" id="cassetteEqBars">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <!-- FULL VISIBLE INTERACTIVE PLAYLIST & STREAMING TABS -->
          <div class="mixtape-tracklist-card" id="mixtapeTracklist">
            <div class="tracklist-header">
              <div class="tracklist-header-left">
                <span class="tracklist-badge">🌸 CHERRY BLOSSOM TRACKLIST</span>
                <h4 class="tracklist-title">Our Romantic Playlist</h4>
              </div>
              <span class="tracklist-count" id="tracklistCount">${playlist.length} Songs</span>
            </div>

            <!-- Tab Switcher (Mixtape Tracks / Spotify / YouTube) -->
            <div class="mixtape-source-tabs" id="mixtapeSourceTabs">
              <button type="button" class="source-tab-btn active" data-source="native">
                <span>📻</span> Mixtape Songs
              </button>
              <button type="button" class="source-tab-btn" data-source="spotify">
                <span>🟢</span> Spotify Dedicated
              </button>
              <button type="button" class="source-tab-btn" data-source="youtube">
                <span>🔴</span> YouTube Playlist
              </button>
            </div>

            <!-- Tab 1: Native Playable Songs List (Always visible and clickable!) -->
            <div class="mixtape-tab-panel active" id="tabPanelNative">
              <div class="mixtape-songs-list" id="mixtapeSongsList">
                ${playlist.map((track, idx) => `
                  <div class="mixtape-song-row ${idx === 0 ? 'is-playing' : ''}" data-track-idx="${idx}" role="button" tabindex="0">
                    <div class="song-num-col">
                      <span class="song-num">${(idx + 1 < 10 ? '0' : '') + (idx + 1)}</span>
                      <div class="song-playing-bars"><span></span><span></span><span></span></div>
                    </div>
                    <div class="song-info-col">
                      <div class="song-name-row">
                        <span class="song-name">${track.title}</span>
                        ${track.tag ? `<span class="song-tag-pill">${track.tag}</span>` : ''}
                      </div>
                      <span class="song-artist">${track.artist || 'Romantic Dedication'}</span>
                    </div>
                    <div class="song-action-col">
                      <span class="song-duration">${track.duration || '3:45'}</span>
                      <button type="button" class="btn-play-song" aria-label="Play ${track.title}">
                        <span class="btn-song-icon">▶</span>
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Tab 2: Spotify Embed Container -->
            <div class="mixtape-tab-panel" id="tabPanelSpotify" style="display:none;">
              <div class="spotify-embed-container" style="width:100%; margin: 10px 0;">
                <div class="embed-header-badge"><span>🟢</span> SPOTIFY DEDICATED PLAYLIST</div>
                <iframe style="border-radius:18px; box-shadow:0 12px 36px rgba(0,0,0,0.5);" src="${spotifyEmbed || 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0'}" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              </div>
            </div>

            <!-- Tab 3: YouTube Embed Container -->
            <div class="mixtape-tab-panel" id="tabPanelYoutube" style="display:none;">
              <div class="youtube-embed-container" style="width:100%; margin: 10px 0;">
                <div class="embed-header-badge"><span>🔴</span> YOUTUBE SPECIAL PLAYLIST</div>
                <div class="youtube-responsive-box">
                  <iframe src="${youtubeEmbed || 'https://www.youtube.com/embed/videoseries?list=PL4fGSI1pDJn6O1E2_gWwO06j_qK9T7c04'}" title="YouTube player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>

          <div class="reasons-showcase-wrap" style="width:100%; max-width:540px; margin-bottom:20px;">
            <div class="reasons-deck-header">
              <span class="reasons-deck-badge">WHY I LOVE YOU</span>
              <h4 class="reasons-deck-title">Reasons You Own My Heart</h4>
            </div>

            <div class="reason-hero-card" id="reasonHeroCard">
              <div class="reason-card-gold-shine"></div>
              <span class="reason-card-badge" id="reasonCardBadge">REASON #1</span>
              <p class="reason-card-body" id="reasonCardBody">"${reasonsList[0]}"</p>
              <div class="reason-card-footer">
                <span class="reason-author">Forever Yours ♡</span>
                <span class="reason-card-heart">💖</span>
              </div>
            </div>

            <div class="reasons-actions-row">
              <button type="button" class="btn-shuffle-reasons" id="btnShuffleReasons">
                <span>✦</span> Shuffle Another Reason
              </button>
            </div>

            <div class="reasons-quick-pills" id="reasonsPills">
              ${reasonsList.map((_, i) => `
                <button type="button" class="reason-pill-item ${i === 0 ? 'active' : ''}" data-reason-idx="${i}">
                  #${i + 1}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Forward Navigation Action to Chapter VI -->
          <div class="scene-forward-action" style="margin-top:14px;">
            <button type="button" class="btn-scene-next-hero" id="btnMixtapeNextMilestones" data-target="6">
              <span class="btn-next-spark">🍃</span>
              <span class="btn-next-text">Step into Chapter VI: Story Milestones</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ================= SCENE 6: STORYTELLING MILESTONES (3D FLYING LEAF) ================= -->
      <section class="romance-fullscreen-scene" data-scene="6" id="sceneTimeline" style="display:none; opacity:0;">
        <div class="scene-inner-wrap">
          <div class="romance-chapter-header">
            <span class="chapter-num-pill">CHAPTER VI • TIMELESS MEMORIES</span>
            <h3 class="chapter-title">Our Storybook Milestones</h3>
            <p class="chapter-desc">Each chapter of us, carried on the gentle breeze of time 🍃</p>
          </div>

          <div class="story-milestones-stage" id="storyMilestonesStage">
            <div class="flying-leaves-sky" id="flyingLeavesSky" aria-hidden="true"></div>

            <div class="story-milestone-card" id="storyMilestoneCard">
              <div class="story-card-top-bar">
                <span class="story-card-badge" id="storyCardTag">${milestonesList[0]?.tag || 'THE SPARK'}</span>
                <span class="story-card-date" id="storyCardDate">${milestonesList[0]?.date || 'June 14, 2022'}</span>
              </div>

              <div class="story-card-media-wrapper">
                <img src="${milestonesList[0]?.image || '/images/sunset.jpg'}" class="story-card-photo" id="storyCardPhoto" alt="Milestone Photo" />
                <div class="story-card-photo-gloss"></div>
              </div>

              <div class="story-card-body">
                <h4 class="story-card-title" id="storyCardTitle">${milestonesList[0]?.title || 'Where Our Story Began'}</h4>
                <p class="story-card-desc" id="storyCardDesc">${milestonesList[0]?.desc || 'One single glance that stopped time. A brief hello that quietly turned into the most meaningful connection of my life.'}</p>
              </div>
            </div>

            <div class="story-milestone-nav">
              <div class="story-milestone-dots" id="storyMilestoneDots">
                ${milestonesList.map((_, i) => `
                  <span class="story-dot ${i === 0 ? 'active' : ''}" data-m-idx="${i}"></span>
                `).join('')}
              </div>
              <div class="story-milestone-counter" id="storyMilestoneCounter">Chapter 1 of ${milestonesList.length}</div>
              <button type="button" class="btn-fly-next-chapter" id="btnFlyNextMilestone">
                <span class="leaf-anim-icon">🍃</span>
                <span class="btn-fly-text" id="btnFlyText">Fly to Next Chapter</span>
                <span class="btn-fly-arrow">❯</span>
              </button>
            </div>
          </div>

          <div class="scene-forward-action" style="margin-top:20px;">
            <button type="button" class="btn-scene-next-hero" data-target="7">
              <span class="btn-next-spark">🔥</span>
              <span class="btn-next-text">Proceed to Chapter VII: The Sacred Letter</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ================= SCENE 7: SACRED MATCH BURNING LETTER ================= -->
      <section class="romance-fullscreen-scene scene-letter-fullscreen" data-scene="7" id="sceneLetter" style="display:none; opacity:0;">
        <div class="scene-inner-wrap">
          <div class="romance-chapter-header">
            <span class="chapter-num-pill">CHAPTER VII • THE CONFESSION</span>
            <h3 class="chapter-title">The Sacred Letter</h3>
            <p class="chapter-desc" id="letterInstructionText">⇄ Rub or drag the matchstick across the striker to ignite the flame &amp; melt the wax seal 🔥</p>
          </div>

          <div class="match-interactive-stage" id="matchInteractiveStage">
            <div class="match-striker-box" id="matchStrikerBox">
              <div class="match-striker-strip" id="matchStrikerStrip">
                <span class="striker-grit-texture"></span>
                <span class="striker-guidance-arrows">⇄ RUB MATCHSTICK HERE TO IGNITE ⇄</span>
              </div>
              <!-- 60FPS Sparks Canvas for physical friction rubbing -->
              <canvas id="matchSparksCanvas" class="match-sparks-canvas"></canvas>

              <div class="match-stick" id="matchStick" touch-action="none">
                <div class="match-head" id="matchHead">
                  <div class="match-flame" id="matchFlame" style="display:none;">
                    <div class="flame-outer"></div>
                    <div class="flame-mid"></div>
                    <div class="flame-core"></div>
                    <div class="flame-ember-sparks">
                      <span></span><span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
                <div class="match-wood"></div>
              </div>
            </div>

            <button type="button" class="btn-strike-match-action" id="btnStrikeMatch">
              <span class="match-icon">🔥</span> <span class="btn-match-text">Rub or Tap to Strike Match</span>
            </button>
          </div>

          <div class="wax-letter-container" id="waxLetterContainer" style="width:100%; max-width:580px; margin: 0 auto 24px;">
            <div class="wax-envelope-card" id="waxEnvelope">
              <div class="wax-seal-wrapper" id="waxSealWrapper">
                <div class="wax-seal-drip-pool"></div>
                <div class="wax-seal-stamp" id="waxSealStamp">
                  <span class="wax-monogram">👑</span>
                  <span class="wax-monogram-sub">ETERNAL</span>
                </div>
                <div class="wax-ember-cloud" id="waxEmberCloud"></div>
                <div class="wax-hint-text">Royal wax seal melts to reveal confession</div>
              </div>

              <!-- Animated Fiery Burn Overlay -->
              <div class="envelope-burn-mask" id="envelopeBurnMask" style="display:none;"></div>
              
              <div class="parchment-letter-body" id="parchmentLetter">
                <div class="parchment-gold-border">
                  <div class="parchment-header-crest">
                    <span class="crest-wings">❦</span>
                    <span class="crest-title">AMOR VINCIT OMNIA</span>
                    <span class="crest-wings">❦</span>
                  </div>
                  <div class="parchment-subcrest">SACRED TESTAMENT OF ETERNAL LOVE</div>
                  <div class="parchment-divider">✧ ✦ ✧</div>

                  <div class="letter-text-flow" id="letterTextFlow">
                    ${letterBody.split('\n\n').map(p => `<p class="letter-p">${p.split('\n').join('<br/>')}</p>`).join('')}
                  </div>

                  <div class="letter-signoff">
                    <div class="signoff-quote">"In every lifetime, in every universe — always you."</div>
                    <div class="signoff-heart">♡</div>
                    <div class="signoff-author">Yours Eternally, <strong>${sender}</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="scene-forward-action" id="letterForwardAction" style="margin-top:10px;">
            <button type="button" class="btn-scene-next-hero" id="btnLetterNextLanterns" data-target="8">
              <span class="btn-next-spark">🏮</span>
              <span class="btn-next-text">Step into Chapter VIII: Twilight Sky Lanterns</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ================= SCENE 8: TWILIGHT SKY LANTERNS ================= -->
      <section class="romance-fullscreen-scene" data-scene="8" id="sceneLanterns" style="display:none; opacity:0;">
        <div class="scene-inner-wrap">
          <div class="romance-chapter-header">
            <span class="chapter-num-pill">CHAPTER VIII • INFINITE WISHES</span>
            <h3 class="chapter-title">Twilight Sky Lanterns</h3>
            <p class="chapter-desc">Watch our wishes float gently into the night sky. Tap anywhere to release personal lanterns 🏮</p>
          </div>

          <div class="sky-lanterns-wrapper">
            <div class="lanterns-threejs-container" id="lanternsSkyStage"></div>
            <div class="floating-lantern-field" id="floatingLanternField" aria-hidden="true"></div>
            <div class="lanterns-actions">
              <button type="button" class="btn-release-lantern" id="btnReleaseMoreLanterns">
                ✨ Release 6 Sky Lanterns ✨
              </button>
            </div>
          </div>

          <div class="scene-forward-action">
            <button type="button" class="btn-scene-next-hero" data-target="9">
              <span class="btn-next-spark">💍</span>
              <span class="btn-next-text">Proceed to Chapter IX: Treaty of Eternal Devotion</span>
              <span class="btn-next-arrow">❯</span>
            </button>
          </div>
        </div>
      </section>

      <!-- ================= SCENE 9 & 10: TREATY OF DEVOTION & CLEAN REWATCH ================= -->
      <section class="romance-fullscreen-scene romance-grand-finale-scene" data-scene="9" id="sceneFinale" style="display:none; opacity:0;">
        <div class="scene-inner-wrap">
          <div class="romance-chapter-header">
            <span class="chapter-num-pill" style="background:rgba(244,63,94,0.18); border-color:#f43f5e; color:#f43f5e;">CHAPTER IX • SACRED TREATY</span>
            <h3 class="chapter-title" style="font-size:clamp(26px, 5.5vw, 40px); color:#ffffff; text-shadow:0 0 20px rgba(244,63,94,0.6);">Treaty of Eternal Devotion</h3>
            <p class="chapter-desc" style="color:rgba(255,255,255,0.85);">A sacred eternal covenant. Sign with your real hand &amp; affix our golden royal seal 💍</p>
          </div>

          <div class="treaty-scroll-frame">
            <div class="treaty-ornate-border">
              <div class="treaty-header-emblem">👑</div>
              <span class="treaty-sub-title">SOLEMN COVENANT OF LOVE</span>
              <h4 class="treaty-couple-names">${recipient} &amp; ${sender}</h4>
              
              <p class="treaty-vow-text" id="treatyVowDisplay">
                "${data.treatyVow || "I promise to love you on peaceful mornings and in wild storms, to cherish your laugh, to support your dreams, and to walk hand-in-hand with you through every tomorrow across lifetimes."}"
              </p>

              <!-- REAL INTERACTIVE DIGITAL SIGNATURE CANVAS -->
              <div class="treaty-signature-station">
                <div class="signature-canvas-label">
                  <span>DRAW YOUR SIGNATURE IN GOLDEN INK:</span>
                  <button type="button" class="btn-clear-sig" id="btnClearTreatySig">↺ Clear</button>
                </div>
                <div class="signature-canvas-wrapper" id="signatureCanvasWrapper">
                  <canvas id="treatySignatureCanvas" class="treaty-signature-canvas"></canvas>
                  <div class="signature-watermark-text" id="sigWatermark">Sign with finger or stylus here ✍️</div>
                </div>
                
                <div class="treaty-signature-footer">
                  <div class="treaty-date-col">
                    <span class="treaty-footer-label">DATE OF SIGNING</span>
                    <span class="treaty-footer-val">${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div class="treaty-seal-col">
                    <div class="golden-wax-stamp-stamp" id="goldenWaxStamp">
                      <span class="stamp-crest">💍</span>
                      <span class="stamp-text">ETERNAL</span>
                    </div>
                  </div>
                  <div class="treaty-witness-col">
                    <span class="treaty-footer-label">WITNESSED BY</span>
                    <span class="treaty-footer-val">The Stars &amp; Universe</span>
                  </div>
                </div>

                <div class="signature-status-badge" id="signatureStatusBadge" style="display:none;">
                  ✦ OFFICIALLY SIGNED &amp; AFFIXED FOR ETERNITY ✦
                </div>

                <button type="button" class="btn-affix-treaty" id="btnAffixTreaty">
                  💍 Affix Royal Seal &amp; Sign Treaty
                </button>
              </div>
            </div>
          </div>

          <!-- ACT X: HEARTFELT THANK YOU & CLEAN REWATCH OPTION -->
          <div class="masterpiece-thank-you-card" id="masterpieceThankYouCard">
            <div class="thank-you-crest">🌸</div>
            <h3 class="thank-you-title">Thank You, My Dearest ${recipient}</h3>
            <p class="thank-you-message">
              Every second by your side is a gift I cherish with all my soul. Thank you for filling my universe with soft light, endless laughter, and boundless warmth. Here is to our forever.
            </p>
            <div class="thank-you-signature">— Yours Forever, ${sender} ♡</div>

            <div class="masterpiece-watch-again-block">
              <button type="button" class="btn-watch-again-masterpiece" id="btnWatchAgainMasterpiece" title="Relive our story from the very beginning">
                <span class="watch-again-icon">↺</span>
                <span class="watch-again-text">Relive Our Story from the Beginning 🌸</span>
              </button>
              <p class="watch-again-note">Rewinds the music &amp; restarts our continuous romantic odyssey from Act 1</p>
            </div>
          </div>
        </div>
      </section>

      <!-- VIGNETTE & FINE GRAIN LENS -->
      <div class="grade" aria-hidden="true">
        <div class="grade__vignette"></div>
        <div class="grade__grain"></div>
      </div>
    </div>
  `;

  // DOM Elements
  const stage = container.querySelector('#treeFilmStage');
  const master3DCanvas = container.querySelector('#romanceMaster3D');
  const portalFlashOverlay = container.querySelector('#portalFlashOverlay');
  const gate = container.querySelector('#treeGate');
  const viralFlowerBtn = container.querySelector('#viralFlowerBtn');
  const burstCanvas = container.querySelector('#blossomBurstCanvas');
  const canvas = container.querySelector('#treeCanvas');
  const ctx = canvas.getContext('2d');

  const hero = container.querySelector('#treeHero');
  const eyebrow = container.querySelector('#treeEyebrow');
  const hint = container.querySelector('#treeHint');
  const motes = container.querySelector('#treeMotes');
  const target = container.querySelector('#treeTarget');
  const targetHeart = container.querySelector('#treeTargetHeart');
  const heartGlow = target.querySelector('.heart__glow');
  const aim = container.querySelector('#treeAim');

  const archery = container.querySelector('#treeArchery');
  const bow = container.querySelector('#treeBow');
  const arrow = container.querySelector('#treeArrow');
  const tip = container.querySelector('#treeTip');
  const strL = container.querySelector('#treeStrL');
  const strR = container.querySelector('#treeStrR');
  const serving = container.querySelector('#treeServing');
  const btnTreeQuickShoot = container.querySelector('#btnTreeQuickShoot');

  const flood = container.querySelector('#treeFlood');
  const field = container.querySelector('#treeField');
  const camera = container.querySelector('#treeCamera');
  const fgrid = container.querySelector('#treeFgrid');
  const kEyebrow = container.querySelector('#treeKEyebrow');
  const kSub = container.querySelector('#treeKSub');
  const barTop = container.querySelector('#treeBarTop');
  const barBot = container.querySelector('#treeBarBot');
  const uline = container.querySelector('#treeUline')?.querySelector('.uline__path');
  const bloom = container.querySelector('#treeBloom');

  const wishEl = container.querySelector('#treeWish');
  const replay = container.querySelector('#treeReplay');
  const memoriesBtn = container.querySelector('#treeMemoriesBtn');
  const memories = container.querySelector('#treeMemories');
  const memoriesClose = container.querySelector('#treeMemoriesClose');

  const loveNote = container.querySelector('#treeLoveNote');
  const loveNoteText = container.querySelector('#treeLoveNoteText');
  const starEl = container.querySelector('#treeStar');
  const wishBtn = container.querySelector('#treeWishBtn');
  const shuffleBtn = container.querySelector('#treeShuffleBtn');
  const shuffleText = container.querySelector('#treeShuffleText');

  // Mini CD Music controls
  const musicToggle = container.querySelector('#treeMusicToggle');
  const miniCd = container.querySelector('#treeMiniCd');
  const trackPill = container.querySelector('#treeTrackPill');
  const audioEl = container.querySelector('#treeAudio');

  // Chapter Dock Chips
  const dockChips = container.querySelectorAll('.romance-chip-btn');
  function setActiveDockChip(actName) {
    dockChips.forEach(b => {
      if (b.getAttribute('data-act') === actName) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
  }

  // Math helpers
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = (a) => a[(Math.random() * a.length) | 0];
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeOutBack = (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  // Tone & Audio generator
  let audioCtx = null;
  function chime(f1 = 720, f2 = 900) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const t0 = audioCtx.currentTime;
      [[f1, t0], [f2, t0 + 0.08]].forEach(([f, t]) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = 'sine';
        o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start(t);
        o.stop(t + 0.24);
      });
    } catch (_) {}
  }

  // Tactile paper turn sound for flipbook
  function playPageTurnSound() {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const bufferSize = Math.floor(audioCtx.sampleRate * 0.14);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const bufData = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        bufData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.035));
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1750;
      filter.Q.value = 1.1;
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.09, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.13);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();
    } catch (_) {}
  }

  // --- THREE.JS 3D TWILIGHT LANTERNS & CELESTIAL STARFIELD ---
  let threeLanternsSky = null;
  function initThreeLanternsSky(mountEl) {
    if (!mountEl || typeof window === 'undefined') return null;
    try {
      const w = mountEl.clientWidth || 440;
      const h = mountEl.clientHeight || 380;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, w / h, 1, 1000);
      camera.position.set(0, -10, 48);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:2;';
      mountEl.appendChild(renderer.domElement);

      // Starfield Points
      const starCount = 650;
      const starGeo = new THREE.BufferGeometry();
      const starPos = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount * 3; i += 3) {
        starPos[i] = (Math.random() - 0.5) * 160;
        starPos[i + 1] = (Math.random() - 0.5) * 140;
        starPos[i + 2] = (Math.random() - 0.5) * 100 - 20;
      }
      starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({
        color: 0xffeacc,
        size: 1.4,
        transparent: true,
        opacity: 0.85
      });
      const starField = new THREE.Points(starGeo, starMat);
      scene.add(starField);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffeedd, 0.7);
      scene.add(ambientLight);

      const moonLight = new THREE.DirectionalLight(0xffdfba, 1.2);
      moonLight.position.set(20, 40, 20);
      scene.add(moonLight);

      // Shared Lantern Geometry & Warm Emissive Material
      const lanternGeo = new THREE.CylinderGeometry(1.5, 1.7, 3.6, 10);
      const lanternMat = new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0xea580c,
        emissiveIntensity: 0.85,
        roughness: 0.35,
        metalness: 0.1
      });

      const lanternGroup = new THREE.Group();
      scene.add(lanternGroup);

      const lanterns = [];
      function addLanternMesh(initY = null) {
        const mesh = new THREE.Mesh(lanternGeo, lanternMat);
        mesh.position.x = (Math.random() - 0.5) * 42;
        mesh.position.y = initY !== null ? initY : -30 - Math.random() * 15;
        mesh.position.z = (Math.random() - 0.5) * 28;
        mesh.rotation.y = Math.random() * Math.PI * 2;
        mesh.rotation.z = (Math.random() - 0.5) * 0.25;
        const speed = Math.random() * 0.08 + 0.06;
        const swaySpeed = Math.random() * 1.6 + 0.8;
        const swayOffset = Math.random() * Math.PI * 2;
        lanternGroup.add(mesh);
        lanterns.push({ mesh, speed, swaySpeed, swayOffset });
      }

      for (let i = 0; i < 14; i++) {
        addLanternMesh(-25 + (i * 5) + Math.random() * 3);
      }

      let animId = 0;
      let clock = new THREE.Clock();
      let mousePX = 0, mousePY = 0;

      const handlePointer = (e) => {
        const rect = mountEl.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          mousePX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
          mousePY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
        }
      };
      mountEl.addEventListener('pointermove', handlePointer, { passive: true });

      function animate() {
        const time = clock.getElapsedTime();
        camera.position.x += (mousePX * 4 - camera.position.x) * 0.05;
        camera.position.y += (-10 + mousePY * 3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        for (let i = lanterns.length - 1; i >= 0; i--) {
          const l = lanterns[i];
          l.mesh.position.y += l.speed;
          l.mesh.position.x += Math.sin(time * l.swaySpeed + l.swayOffset) * 0.04;
          l.mesh.rotation.y += 0.006;
          if (l.mesh.position.y > 45) {
            l.mesh.position.y = -35;
            l.mesh.position.x = (Math.random() - 0.5) * 42;
          }
        }

        starMat.opacity = 0.72 + Math.sin(time * 2.5) * 0.22;
        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      }
      animate();

      return {
        releaseBatch(count = 6) {
          for (let i = 0; i < count; i++) {
            setTimeout(() => addLanternMesh(-32 - Math.random() * 6), i * 220);
          }
        },
        destroy() {
          if (animId) cancelAnimationFrame(animId);
          mountEl.removeEventListener('pointermove', handlePointer);
          renderer.dispose();
          starGeo.dispose();
          starMat.dispose();
          lanternGeo.dispose();
          lanternMat.dispose();
          if (renderer.domElement?.parentNode) {
            renderer.domElement.parentNode.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.warn("Three.js lantern scene setup error:", err);
      return null;
    }
  }

  // --- LENIS LUXURY MOMENTUM SCROLLING ---
  let lenisInstance = null;
  let lenisRafId = 0;
  function initLenisScroll() {
    if (lenisInstance || !memories || typeof window === 'undefined') return;
    try {
      lenisInstance = new Lenis({
        wrapper: memories,
        content: memories.firstElementChild || memories,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false
      });
      function raf(time) {
        lenisInstance?.raf(time);
        lenisRafId = requestAnimationFrame(raf);
      }
      lenisRafId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn("Lenis initialization skipped:", e);
    }
  }

  function destroyLenisScroll() {
    if (lenisRafId) cancelAnimationFrame(lenisRafId);
    if (lenisInstance) {
      lenisInstance.destroy();
      lenisInstance = null;
    }
  }

  // --- TREE ENGINE (Act 4) ---
  const BLOSSOM_PALETTES = [
    { c0: '#ffe1ec', c1: '#ff80aa' },
    { c0: '#ffd0e0', c1: '#f4577f' },
    { c0: '#ffc4d2', c1: '#e23b67' },
    { c0: '#ffd9c4', c1: '#ff8a5b' },
    { c0: '#ffeec2', c1: '#f6b13e' },
    { c0: '#ffd2e6', c1: '#e84d9a' },
  ];

  const TIMINGS = {
    trunkStart: 0.10,
    branchSpan: 1.80,
    bloomT0: 1.25,
    bloomSpan: 2.00,
    petalT0: 2.45,
    noteStart: 0.45,
    done: 4.60,
  };

  const SPRITE_SIZE = 168;

  function heartShape(c, x, top, w, h) {
    c.beginPath();
    c.moveTo(x, top + h * 0.28);
    c.bezierCurveTo(x, top, x - w * 0.5, top, x - w * 0.5, top + h * 0.28);
    c.bezierCurveTo(x - w * 0.5, top + h * 0.60, x - w * 0.16, top + h * 0.80, x, top + h);
    c.bezierCurveTo(x + w * 0.16, top + h * 0.80, x + w * 0.5, top + h * 0.60, x + w * 0.5, top + h * 0.28);
    c.bezierCurveTo(x + w * 0.5, top, x, top, x, top + h * 0.28);
    c.closePath();
  }

  function makeBlossom({ c0, c1 }, soft) {
    const cv = document.createElement('canvas');
    cv.width = cv.height = SPRITE_SIZE;
    const c = cv.getContext('2d');
    const w = SPRITE_SIZE * 0.62, h = SPRITE_SIZE * 0.58, x = SPRITE_SIZE / 2, top = SPRITE_SIZE * 0.17;

    c.save();
    c.shadowColor = 'rgba(150,38,72,0.32)';
    c.shadowBlur = SPRITE_SIZE * 0.085;
    c.shadowOffsetY = SPRITE_SIZE * 0.05;
    c.fillStyle = c1;
    heartShape(c, x, top, w, h);
    c.fill();
    c.restore();

    const g = c.createRadialGradient(x - w * 0.20, top + h * 0.20, h * 0.04, x, top + h * 0.42, h * 0.92);
    g.addColorStop(0, c0);
    g.addColorStop(0.55, c1);
    g.addColorStop(1, '#be123c');
    heartShape(c, x, top, w, h);
    c.fillStyle = g;
    c.fill();

    c.save();
    c.globalCompositeOperation = 'source-atop';
    const g2 = c.createLinearGradient(0, top, 0, top + h);
    g2.addColorStop(0, 'rgba(255,255,255,0.48)');
    g2.addColorStop(0.35, 'rgba(255,255,255,0)');
    g2.addColorStop(1, 'rgba(110,16,46,0.26)');
    c.fillStyle = g2;
    c.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    c.globalAlpha = 0.55;
    c.fillStyle = '#ffffff';
    c.beginPath();
    c.ellipse(x - w * 0.15, top + h * 0.24, w * 0.17, h * 0.11, -0.5, 0, Math.PI * 2);
    c.fill();
    c.restore();

    if (!soft) return cv;

    const cv2 = document.createElement('canvas');
    cv2.width = cv2.height = SPRITE_SIZE;
    const c2 = cv2.getContext('2d');
    c2.filter = 'blur(2.6px)';
    c2.drawImage(cv, 0, 0);
    c2.filter = 'none';
    c2.globalCompositeOperation = 'source-atop';
    c2.globalAlpha = 0.42;
    c2.fillStyle = '#fff3ea';
    c2.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE);
    return cv2;
  }

  function makeBokeh(rgb) {
    const S = 128, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    const g = c.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
    g.addColorStop(0, `rgba(${rgb},0.9)`);
    g.addColorStop(0.45, `rgba(${rgb},0.22)`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    c.fillStyle = g;
    c.fillRect(0, 0, S, S);
    return cv;
  }

  function makeSparkle() {
    const S = 64, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    const m = S / 2;
    const g = c.createRadialGradient(m, m, 0, m, m, m);
    g.addColorStop(0, 'rgba(255,255,255,0.95)');
    g.addColorStop(0.25, 'rgba(255,236,200,0.5)');
    g.addColorStop(1, 'rgba(255,236,200,0)');
    c.fillStyle = g;
    c.beginPath();
    c.arc(m, m, m, 0, 6.2832);
    c.fill();
    c.fillStyle = 'rgba(255,255,255,0.95)';
    c.translate(m, m);
    for (let k = 0; k < 2; k++) {
      c.beginPath();
      c.moveTo(0, -m);
      c.quadraticCurveTo(0, 0, m, 0);
      c.quadraticCurveTo(0, 0, 0, m);
      c.quadraticCurveTo(0, 0, -m, 0);
      c.quadraticCurveTo(0, 0, 0, -m);
      c.fill();
      c.rotate(Math.PI / 4);
      c.scale(0.5, 0.5);
    }
    return cv;
  }

  let SPR = { crisp: [], soft: [] }, BOKEH = [], SPARKLE = null;
  function buildSprites() {
    SPR = {
      crisp: BLOSSOM_PALETTES.map((b) => makeBlossom(b, false)),
      soft: BLOSSOM_PALETTES.map((b) => makeBlossom(b, true)),
    };
    BOKEH = [makeBokeh('255,224,188'), makeBokeh('255,196,214'), makeBokeh('255,238,210')];
    SPARKLE = makeSparkle();
  }

  function drawSprite(sprite, x, y, size, rot, alpha) {
    ctx.save();
    ctx.translate(x, y);
    if (rot) ctx.rotate(rot);
    ctx.globalAlpha = alpha;
    ctx.drawImage(sprite, -size * 0.5, -size * 0.47, size, size);
    ctx.restore();
  }

  let heartPoly = null;
  function buildHeartPoly() {
    const raw = [];
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (let i = 0; i <= 160; i++) {
      const t = (i / 160) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      raw.push([x, y]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2, hw = (maxX - minX) / 2, hh = (maxY - minY) / 2;
    heartPoly = raw.map(([x, y]) => [(x - midX) / hw, (y - midY) / hh]);
  }

  function pointInPoly(x, y) {
    let inside = false;
    const p = heartPoly;
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const xi = p[i][0], yi = p[i][1], xj = p[j][0], yj = p[j][1];
      if ((yi > y !== yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }

  let W = 0, H = 0, dpr = 1;
  let cx = 0, cy = 0, rx = 0, ry = 0, groundY = 0;
  let branches = [], hearts = [], petals = [], rested = [], orbs = [], floaters = [], twinkles = [];
  let bgGrad = null, glowGrad = null, groundGrad = null;

  const quad = (b, t) => {
    const m = 1 - t, a = m * m, k = 2 * m * t, d = t * t;
    return { x: a * b.x1 + k * b.cx + d * b.x2, y: a * b.y1 + k * b.cy + d * b.y2 };
  };

  function barkGrad(x1, y1, x2, y2, depth) {
    const g = ctx.createLinearGradient(x1, y1, x2, y2);
    g.addColorStop(0, `hsl(348 26% ${26 + depth * 3}%)`);
    g.addColorStop(1, `hsl(346 24% ${40 + depth * 5}%)`);
    return g;
  }

  function buildScene() {
    branches = []; hearts = []; petals = []; rested = []; twinkles = []; orbs = []; floaters = [];
    buildHeartPoly();

    const wide = W / H > 1.2;
    cx = W * (wide ? 0.57 : 0.5);
    cy = H * (wide ? 0.37 : 0.38);
    ry = Math.min(H * (wide ? 0.33 : 0.33), W * 0.34);
    rx = ry * 1.16;
    groundY = H * 0.93;

    bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#fff3e9');
    bgGrad.addColorStop(0.46, '#ffe7d6');
    bgGrad.addColorStop(0.78, '#fcd9c4');
    bgGrad.addColorStop(1, '#f3c4b5');

    glowGrad = ctx.createRadialGradient(cx, cy, ry * 0.1, cx, cy, ry * 1.55);
    glowGrad.addColorStop(0, 'rgba(255,219,170,0.6)');
    glowGrad.addColorStop(0.5, 'rgba(255,170,150,0.2)');
    glowGrad.addColorStop(1, 'rgba(255,170,150,0)');

    groundGrad = ctx.createRadialGradient(cx, H * 1.02, ry * 0.2, cx, H * 1.02, ry * 1.6);
    groundGrad.addColorStop(0, 'rgba(255,205,165,0.5)');
    groundGrad.addColorStop(1, 'rgba(255,205,165,0)');

    for (let i = 0; i < 11; i++) {
      orbs.push({
        x: rand(0, W), y: rand(0, H), r: rand(W * 0.05, W * 0.17),
        vy: rand(-6, -16), drift: rand(-0.3, 0.3), phase: rand(0, 6.28),
        alpha: rand(0.05, 0.13), sprite: pick(BOKEH)
      });
    }

    const FN = wide ? 18 : 15;
    for (let i = 0; i < FN; i++) {
      const depth = Math.random();
      floaters.push({
        x: rand(0, W), y: rand(-H * 0.1, H * 1.1), depth,
        idx: (Math.random() * BLOSSOM_PALETTES.length) | 0,
        box: lerp(Math.min(W, H) * 0.025, Math.min(W, H) * 0.075, depth),
        vy: lerp(7, 20, depth), sway: rand(8, 22), phase: rand(0, 6.28),
        rot: rand(-0.4, 0.4), vrot: rand(-0.5, 0.5),
        baseA: lerp(0.16, 0.5, depth), soft: depth < 0.45,
      });
    }

    const baseX = cx, baseY = H * 1.0;
    const trunkTopY = cy + ry * 0.62;
    const trunkW = Math.max(9, W * 0.024);
    const limbLen = ry * 0.6;
    const insidePx = (x, y, m = 0.9) => pointInPoly((x - cx) / (rx * m), (cy - y) / (ry * m));

    function addBranch(x, y, ang, len, w0, depth, t0) {
      let ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len, clipped = false;
      if (!insidePx(ex, ey)) {
        let lo = 0, hi = 1;
        for (let k = 0; k < 12; k++) {
          const mid = (lo + hi) / 2;
          insidePx(x + Math.cos(ang) * len * mid, y + Math.sin(ang) * len * mid) ? (lo = mid) : (hi = mid);
        }
        ex = x + Math.cos(ang) * len * lo;
        ey = y + Math.sin(ang) * len * lo;
        clipped = true;
      }
      const mx = (x + ex) / 2, my = (y + ey) / 2,
        perp = ang + Math.PI / 2,
        bend = rand(-1, 1) * len * 0.12,
        w1 = w0 * 0.66;
      branches.push({
        x1: x, y1: y, cx: mx + Math.cos(perp) * bend, cy: my + Math.sin(perp) * bend,
        x2: ex, y2: ey, w0, w1, t0, dur: Math.max(0.14, 0.32 - depth * 0.03), depth,
        grad: barkGrad(x, y, ex, ey, depth)
      });
      return { ex, ey, w1, clipped };
    }

    function grow(x, y, ang, len, w, depth, t0) {
      const r = addBranch(x, y, ang, len, w, depth, t0);
      if (r.clipped || depth >= 6 || len < ry * 0.06) return;
      const childT0 = t0 + (0.32 - depth * 0.03) * 0.6;
      const n = Math.random() < 0.55 ? 2 : 3;
      for (let i = 0; i < n; i++) {
        const spread = 0.6 * (i - (n - 1) / 2) + rand(-0.22, 0.22), lift = -0.06 + rand(-0.05, 0.05);
        grow(r.ex, r.ey, ang + spread + lift, len * rand(0.74, 0.84), r.w1, depth + 1, childT0 + i * 0.03);
      }
    }

    addBranch(baseX, baseY, -Math.PI / 2, baseY - trunkTopY, trunkW, 0, TIMINGS.trunkStart);
    branches[0].dur = 0.55;
    const limbT0 = TIMINGS.trunkStart + 0.36, L = 3;
    for (let i = 0; i < L; i++) {
      const ang = -Math.PI / 2 + 0.62 * (i - (L - 1) / 2) + rand(-0.12, 0.12);
      grow(baseX, trunkTopY, ang, limbLen, trunkW * 0.7, 1, limbT0 + i * 0.05);
    }

    const maxT0 = branches.reduce((m, b) => Math.max(m, b.t0 + b.dur), 0);
    const sc = (TIMINGS.branchSpan - TIMINGS.trunkStart) / (maxT0 - TIMINGS.trunkStart);
    for (const b of branches) b.t0 = TIMINGS.trunkStart + (b.t0 - TIMINGS.trunkStart) * sc;

    const COUNT = Math.round(clamp((rx * ry) / 56, 250, 440));
    const baseBox = clamp(Math.min(W, H) * 0.115, 30, 74);
    let guard = 0;
    while (hearts.length < COUNT && guard < COUNT * 50) {
      guard++;
      const u = rand(-1.06, 1.06), v = rand(-1.06, 1.06);
      if (!pointInPoly(u, v)) continue;
      const x = cx + u * rx, y = cy - v * ry;
      const d = clamp01(Math.hypot(u, v + 1) / 2.4);
      const t0 = TIMINGS.bloomT0 + d * (TIMINGS.bloomSpan * 0.82) + rand(0, TIMINGS.bloomSpan * 0.18);
      const soft = Math.random() < 0.42;
      hearts.push({
        x, y, idx: (Math.random() * BLOSSOM_PALETTES.length) | 0,
        soft, box: baseBox * (soft ? rand(0.6, 0.85) : rand(0.78, 1.12)),
        rot: rand(-0.55, 0.55), sway: rand(0, 6.28), t0
      });
    }
    hearts.sort((a, b) => (a.soft === b.soft ? a.y - b.y : a.soft ? -1 : 1));
  }

  function drawBackground() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = 1;
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawGodRays(t, intensity) {
    if (intensity <= 0) return;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    const ox = cx, oy = cy - ry * 0.35, R = Math.hypot(W, H) * 1.1;
    const rays = 9, sweep = Math.sin(t * 0.07) * 0.18;
    for (let i = 0; i < rays; i++) {
      const a = -Math.PI / 2 + sweep + (i - (rays - 1) / 2) * 0.2;
      const hw = 0.035 + 0.02 * (0.5 + 0.5 * Math.sin(t * 0.5 + i * 1.7));
      const a1 = a - hw, a2 = a + hw;
      const g = ctx.createLinearGradient(ox, oy, ox + Math.cos(a) * R, oy + Math.sin(a) * R);
      g.addColorStop(0, `rgba(255,232,190,${0.10 * intensity})`);
      g.addColorStop(0.5, `rgba(255,214,170,${0.05 * intensity})`);
      g.addColorStop(1, 'rgba(255,214,170,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(ox, oy);
      ctx.lineTo(ox + Math.cos(a1) * R, oy + Math.sin(a1) * R);
      ctx.lineTo(ox + Math.cos(a2) * R, oy + Math.sin(a2) * R);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  function drawGlow(t) {
    const gi = clamp01((t - TIMINGS.bloomT0) / (TIMINGS.bloomSpan * 0.9));
    if (gi <= 0) return;
    ctx.save();
    ctx.globalAlpha = gi;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function drawBokeh(t, dt) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (const o of orbs) {
      o.y += o.vy * dt;
      o.x += Math.sin(t * 0.3 + o.phase) * o.drift;
      if (o.y < -o.r) { o.y = H + o.r; o.x = rand(0, W); }
      ctx.globalAlpha = o.alpha;
      ctx.drawImage(o.sprite, o.x - o.r, o.y - o.r, o.r * 2, o.r * 2);
    }
    ctx.restore();
  }

  function drawFloaters(t, dt, front) {
    const appear = clamp01((t - 0.2) / 1.4);
    if (appear <= 0) return;
    for (const f of floaters) {
      if ((f.depth >= 0.6) !== front) continue;
      f.y -= f.vy * dt;
      f.x += Math.sin(t * 0.5 + f.phase) * f.sway * dt;
      f.rot += f.vrot * dt;
      if (f.y < -f.box) { f.y = H + f.box; f.x = rand(0, W); }
      drawSprite((f.soft ? SPR.soft : SPR.crisp)[f.idx], f.x, f.y, f.box, f.rot, f.baseA * appear);
    }
  }

  function drawBranches(t) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const b of branches) {
      const f = clamp01((t - b.t0) / b.dur);
      if (f <= 0) continue;
      const e = easeOutCubic(f);
      ctx.strokeStyle = b.grad;
      const steps = 12, last = Math.max(1, Math.ceil(steps * e));
      let prev = quad(b, 0);
      for (let i = 1; i <= last; i++) {
        const tt = Math.min(e, i / steps), p = quad(b, tt);
        ctx.lineWidth = lerp(b.w0, b.w1, tt);
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        prev = p;
      }
    }
  }

  function drawHearts(t) {
    const breathe = 1 + Math.sin(t * 0.8) * 0.012;
    for (const h of hearts) {
      const p = clamp01((t - h.t0) / 0.6);
      if (p <= 0) continue;
      const scale = Math.max(0, easeOutBack(p));
      let alpha = clamp01(p * 1.7);
      if (h.soft) alpha *= 0.8;
      const settled = clamp01((t - h.t0 - 0.6) / 0.7);
      const sway = settled * Math.sin(t * 1.5 + h.sway) * (h.box * 0.05);
      const rise = (1 - easeOutCubic(p)) * h.box * 0.45;
      const hx = cx + (h.x - cx) * breathe + sway;
      const hy = cy + (h.y - cy) * breathe - rise;
      drawSprite((h.soft ? SPR.soft : SPR.crisp)[h.idx], hx, hy, h.box * scale, h.rot + sway * 0.012, alpha);
    }
  }

  function updateTwinkles(t, dt) {
    const active = t > TIMINGS.bloomT0 + TIMINGS.bloomSpan * 0.45;
    if (active && twinkles.length < 9 && Math.random() < 0.5) {
      const h = hearts[(Math.random() * hearts.length) | 0];
      if (h) twinkles.push({ x: h.x, y: h.y, size: rand(0.6, 1.3) * (Math.min(W, H) * 0.05), age: 0, life: rand(0.7, 1.2), rot: rand(0, 6.28) });
    }
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = twinkles.length - 1; i >= 0; i--) {
      const s = twinkles[i];
      s.age += dt;
      const k = s.age / s.life;
      if (k >= 1) { twinkles.splice(i, 1); continue; }
      const a = Math.sin(k * Math.PI);
      drawSprite(SPARKLE, s.x, s.y, s.size * (0.6 + 0.4 * a), s.rot + k * 1.2, a);
    }
    ctx.restore();
  }

  let mouseX = -9999, mouseY = -9999, mouseActive = false;
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
    mouseActive = true;
  });
  canvas.addEventListener('pointerleave', () => { mouseActive = false; });

  function spawnPetal() {
    const h = hearts[(Math.random() * hearts.length) | 0];
    if (!h) return;
    petals.push({
      x: h.x + rand(-8, 8), y: h.y + rand(-8, 8), vy: rand(14, 30), vx: rand(-8, 8),
      sway: rand(0.6, 1.4), phase: rand(0, 6.28), box: h.box * rand(0.34, 0.6),
      idx: h.idx, rot: rand(0, 6.28), vrot: rand(-1.4, 1.4), age: 0,
      land: groundY + rand(-6, H * 0.05)
    });
  }

  function drawPetals(t, dt) {
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.age += dt;
      p.vy += 8 * dt;
      if (mouseActive) {
        const dx = p.x - mouseX, dy = p.y - mouseY, d2 = dx * dx + dy * dy, R = 90;
        if (d2 < R * R && d2 > 1) {
          const d = Math.sqrt(d2), push = (1 - d / R) * 70;
          p.x += (dx / d) * push * dt;
          p.y += (dy / d) * push * dt;
          p.vrot += (dx / d) * dt * 2;
        }
      }
      p.x += (p.vx + Math.sin(t * p.sway + p.phase) * 16) * dt;
      p.y += p.vy * dt;
      p.rot += p.vrot * dt;
      if (p.y >= p.land) {
        rested.push({ x: clamp(p.x, 6, W - 6), y: p.land, box: p.box, idx: p.idx, rot: p.rot, a: rand(0.7, 0.95) });
        if (rested.length > 90) rested.shift();
        petals.splice(i, 1);
        continue;
      }
      const a = p.age < 0.3 ? p.age / 0.3 : 1;
      drawSprite(SPR.crisp[p.idx], p.x, p.y, p.box, p.rot, a);
    }
  }

  function drawRested() {
    for (const r of rested) drawSprite(SPR.crisp[r.idx], r.x, r.y, r.box, r.rot, r.a);
  }

  function showWish(on) {
    if (wishEl) wishEl.classList.toggle('is-in', on);
  }

  function burstConfetti() {
    const colors = ['#ffcf6a', '#ff6f97', '#d4235c', '#ffe38c', '#fff3ea'];
    const bCx = W / 2, bCy = H * 0.38;
    for (let i = 0; i < 34; i++) {
      const el = document.createElement('span');
      const size = rand(5, 10);
      el.style.cssText = `position:absolute;left:${bCx}px;top:${bCy}px;width:${size}px;height:${size}px;
        border-radius:${Math.random() < 0.5 ? '50%' : '2px'};background:${pick(colors)};
        pointer-events:none;z-index:8;opacity:0.95;will-change:transform,opacity;`;
      stage.appendChild(el);
      const ang = rand(0, Math.PI * 2), dist = rand(80, 260);
      gsap.to(el, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist * 0.7 + rand(60, 140),
        rotation: rand(-260, 260),
        opacity: 0,
        duration: rand(1.1, 1.9),
        ease: 'power2.out',
        onComplete: () => el.remove(),
      });
    }
  }

  // Animation Loop
  let treeStartT = 0, treeLastT = 0, treeRAF = 0, lastPetal = 0, replayArmed = false, treeCompleted = false;

  function treeFrame(now) {
    if (!treeStartT) { treeStartT = now; treeLastT = now; }
    const t = (now - treeStartT) / 1000;
    const dt = Math.min(0.05, (now - treeLastT) / 1000);
    treeLastT = now;

    const rays = clamp01((t - TIMINGS.bloomT0) / TIMINGS.bloomSpan);

    drawBackground();
    drawGodRays(t, rays);
    drawGlow(t);
    drawBokeh(t, dt);
    drawFloaters(t, dt, false);
    drawBranches(t);
    drawHearts(t);
    updateTwinkles(t, dt);
    if (t > TIMINGS.petalT0 && now - lastPetal > 150) {
      spawnPetal();
      spawnPetal();
      lastPetal = now;
    }
    drawPetals(t, dt);
    drawRested();
    drawFloaters(t, dt, true);

    showWish(t >= TIMINGS.noteStart);

    if (!treeCompleted && t >= TIMINGS.done) {
      treeCompleted = true;
      burstConfetti();
    }
    if (!replayArmed && t >= TIMINGS.done + 1.0) {
      replayArmed = true;
      armReplay();
    }

    treeRAF = requestAnimationFrame(treeFrame);
  }

  function treeStart() {
    currentScene = 3;
    treeStartT = 0;
    treeLastT = 0;
    lastPetal = 0;
    replayArmed = false;
    treeCompleted = false;
    setActiveDockChip('tree');
    buildScene();
    if (!treeRAF) treeRAF = requestAnimationFrame(treeFrame);
  }

  function treeStop() {
    if (treeRAF) {
      cancelAnimationFrame(treeRAF);
      treeRAF = 0;
    }
    ctx.clearRect(0, 0, W, H);
  }

  // Split words for kinetic typography
  function splitWord(el) {
    if (!el || !el.textContent) return [];
    const chars = [...(el.textContent || '')];
    el.textContent = '';
    return chars.map((c) => {
      const s = document.createElement('span');
      s.className = 'hl__ch';
      s.textContent = c === ' ' ? '\u00A0' : c;
      el.appendChild(s);
      return s;
    });
  }

  const line1Chars = splitWord(container.querySelector('#treeWLine1'));
  const line2Chars = splitWord(container.querySelector('#treeWLine2'));
  const kChars = [...line1Chars, ...line2Chars];

  // Drifting motes
  function buildMotes() {
    if (!motes) return;
    motes.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      const m = document.createElement('span');
      m.className = 'mote';
      const s = rand(4, 12);
      m.style.width = m.style.height = `${s}px`;
      m.style.left = `${rand(4, 96)}%`;
      m.style.top = `${rand(10, 96)}%`;
      motes.appendChild(m);
      gsap.set(m, { opacity: rand(0.25, 0.7) });
      gsap.to(m, {
        y: -rand(40, 140), x: rand(-30, 30),
        duration: rand(7, 14), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: -rand(0, 8),
      });
      gsap.to(m, { opacity: rand(0.1, 0.5), duration: rand(2.5, 5), repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }
  }

  // --- CUPID ARCHERY RIG & PHYSICS (Act 1) ---
  let svgScale = 1, arrowBaseX = 0, arrowBaseY = 0, maxDraw = 120, curDraw = 0;
  let pullUX = 0, pullUY = 1;
  const REST_NOCK = 96;
  const nockProxy = { val: REST_NOCK };

  function applyNock() {
    const y = nockProxy.val;
    if (strL) strL.setAttribute('y2', y);
    if (strR) strR.setAttribute('y2', y);
    if (serving) serving.setAttribute('cy', y);
  }

  function refreshRig() {
    if (!archery || !bow || !arrow || !serving) return;
    const gripX = W * 0.24, gripY = H * 0.76;
    const heartX = W * 0.5, heartY = H * 0.33;
    const aimRad = Math.atan2(heartX - gripX, gripY - heartY);
    pullUX = -Math.sin(aimRad);
    pullUY = Math.cos(aimRad);

    nockProxy.val = REST_NOCK;
    applyNock();
    gsap.set(archery, { rotation: 0, scale: 1, x: 0, y: 0 });
    archery.style.left = '0px';
    archery.style.top = '0px';
    gsap.set(arrow, { x: 0, y: 0 });

    const aR = archery.getBoundingClientRect();
    const bR = bow.getBoundingClientRect();
    const sR = serving.getBoundingClientRect();
    const rR = arrow.getBoundingClientRect();
    svgScale = (bR.width || 120) / 460;
    const gripLX = bR.left - aR.left + 0.5 * bR.width;
    const gripLY = bR.top - aR.top + (240 / 300) * bR.height;
    const nockLX = sR.left - aR.left + 0.5 * sR.width;
    const nockLY = sR.top - aR.top + 0.5 * sR.height;
    arrowBaseX = nockLX - (rR.left - aR.left + 0.5 * rR.width);
    arrowBaseY = nockLY - (rR.top - aR.top + (205 / 220) * rR.height);

    archery.style.left = gripX - gripLX + 'px';
    archery.style.top = gripY - gripLY + 'px';
    gsap.set(archery, { transformOrigin: `${gripLX}px ${gripLY}px`, rotation: (aimRad * 180) / Math.PI });
    gsap.set(arrow, { x: arrowBaseX, y: arrowBaseY });
    maxDraw = Math.min(bR.height * 0.72, H * 0.16, 132);
    curDraw = 0;
  }

  function setDraw(d) {
    curDraw = clamp(d, 0, maxDraw);
    gsap.set(arrow, { x: arrowBaseX, y: arrowBaseY + curDraw });
    nockProxy.val = REST_NOCK + curDraw / svgScale;
    applyNock();
    gsap.set(aim, { opacity: 0.55 * (curDraw / maxDraw) });
  }

  let beatTL = null;
  function startBeat() {
    gsap.set(targetHeart, { scale: 1 });
    gsap.set(heartGlow, { scale: 1, opacity: 0.7 });
    if (beatTL) beatTL.kill();
    beatTL = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    beatTL
      .to(targetHeart, { scale: 1.07, duration: 0.13, ease: 'power2.out' }, 0)
      .to(heartGlow, { scale: 1.15, opacity: 0.9, duration: 0.13, ease: 'power2.out' }, 0)
      .to(targetHeart, { scale: 1.0, duration: 0.2, ease: 'power2.in' }, 0.13)
      .to(targetHeart, { scale: 1.05, duration: 0.12, ease: 'power2.out' }, 0.3)
      .to(targetHeart, { scale: 1.0, duration: 0.5, ease: 'power2.inOut' }, 0.42)
      .to(heartGlow, { scale: 1.0, opacity: 0.7, duration: 0.7, ease: 'power2.inOut' }, 0.3);
  }

  function stopBeat() {
    if (beatTL) {
      beatTL.kill();
      beatTL = null;
    }
    gsap.set(targetHeart, { scale: 1 });
  }

  function miniHeartSVG(fill) {
    return `<svg viewBox="0 0 24 22" width="100%" height="100%"><path d="M12 20C5.5 15 1.5 11.4 1.5 6.9 1.5 3.6 4 1.5 7 1.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3 0 5.5 2.1 5.5 5.4C23.5 11.4 19.5 15 12 20Z" fill="${fill}"/></svg>`;
  }

  function burstHearts() {
    const r = target.getBoundingClientRect();
    const hr = hero.getBoundingClientRect();
    const ox = r.left - hr.left + r.width / 2;
    const oy = r.top - hr.top + r.height * 0.42;
    const cols = ['#ff6f97', '#ffb14e', '#ff8fae', '#ffd36a', '#e23b67'];
    const frag = document.createDocumentFragment();
    const nodes = [];
    for (let i = 0; i < 12; i++) {
      const heart = i < 8;
      const el = document.createElement('span');
      el.className = 'burst';
      const s = heart ? rand(12, 22) : rand(4, 8);
      el.style.cssText = `position:absolute;left:${ox}px;top:${oy}px;width:${s}px;height:${s}px;margin:${-s / 2}px 0 0 ${-s / 2}px;pointer-events:none;z-index:4;`;
      if (heart) el.innerHTML = miniHeartSVG(pick(cols));
      else {
        el.style.borderRadius = '50%';
        el.style.background = 'radial-gradient(circle,#fff,rgba(255,210,150,0) 70%)';
      }
      frag.appendChild(el);
      nodes.push({ el, heart });
    }
    hero.appendChild(frag);
    nodes.forEach(({ el, heart }) => {
      const ang = rand(-Math.PI, 0);
      const dist = rand(heart ? 70 : 40, heart ? 190 : 120);
      gsap.to(el, {
        x: Math.cos(ang) * dist,
        y: Math.sin(ang) * dist - rand(10, 50),
        rotation: rand(-120, 120),
        scale: heart ? rand(0.7, 1.2) : rand(0.4, 1),
        duration: rand(0.7, 1.15),
        ease: 'power2.out',
      });
      gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        delay: rand(0.35, 0.6),
        ease: 'power1.in',
        onComplete: () => el.remove(),
      });
    });
  }

  function shotGeom() {
    const tipR = tip.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();
    const tipX = tipR.left + tipR.width / 2, tipY = tipR.top + tipR.height / 2;
    const tcx = tRect.left + tRect.width / 2, tcy = tRect.top + tRect.height / 2;
    const flightDist = Math.hypot(tcx - tipX, tcy - tipY);
    const fallPx = Math.min(H * 0.26, H - tcy - tRect.height * 0.4);
    const impactX = tcx, impactY = tcy + fallPx;
    const distC = Math.hypot(Math.max(impactX, W - impactX), Math.max(impactY, H - impactY));
    const reach = Math.hypot(W / 2, H / 2);

    return {
      arrowStartY: arrowBaseY + curDraw,
      arrowFlyY: arrowBaseY + curDraw - flightDist,
      drawnNock: REST_NOCK + curDraw / svgScale,
      fallPx,
      fx: impactX - W / 2,
      fy: impactY - H / 2,
      floodScale: (distC * 1.12) / 70,
      bloomScale: (reach * 1.2) / 30,
    };
  }

  let filmTL = null;
  function buildFilm(m) {
    const t = gsap.timeline({
      paused: true,
      onComplete: () => {
        gsap.set(field, { autoAlpha: 0 });
        currentScene = 3;
        setActiveDockChip('tree');
        treeStart();
        gsap.to(bloom, { autoAlpha: 0, duration: 1.15, ease: 'power2.out' });
      },
    });

    // Reset (t=0)
    t.set(target, { y: 0, scaleX: 1, scaleY: 1, opacity: 1 })
      .set(arrow, { opacity: 1, x: arrowBaseX, y: m.arrowStartY, scaleY: 1 })
      .set([flood, bloom], { autoAlpha: 0, scale: 0.001, x: 0, y: 0 })
      .set(flood, { x: m.fx, y: m.fy })
      .set(field, { autoAlpha: 0 })
      .set(container.querySelectorAll('.blob'), { opacity: 0 })
      .set(camera, { scale: 1, yPercent: 0 })
      .set(fgrid, { xPercent: 0, yPercent: 0 })
      .set(barTop, { yPercent: -100 })
      .set(barBot, { yPercent: 100 })
      .set(kEyebrow, { opacity: 0, y: 12 })
      .set(kSub, { opacity: 0, y: 12 })
      .set(kChars, { transformPerspective: 620, transformOrigin: '50% 100%', yPercent: 135, rotationX: -82 })
      .set(uline, { drawn: 0 });

    // The shot
    t.fromTo(nockProxy, { val: m.drawnNock }, { val: REST_NOCK, duration: 0.5, ease: 'elastic.out(1,0.34)', onUpdate: applyNock }, 0)
      .to(arrow, { y: m.arrowFlyY, duration: 0.26, ease: 'power2.in' }, 0)
      .to(arrow, { scaleY: 1.16, duration: 0.14, ease: 'power2.in' }, 0)
      .to(arrow, { scaleY: 1.0, duration: 0.1, ease: 'power1.out' }, 0.16)
      .to(aim, { opacity: 0, duration: 0.18 }, 0)
      .to([eyebrow, hint], { opacity: 0, duration: 0.2, ease: 'power1.out' }, 0);

    // The strike
    t.add(burstHearts, 0.26)
      .add(() => chime(880, 1100), 0.26)
      .to(target, { x: 7, y: -9, duration: 0.06, ease: 'power2.out' }, 0.26)
      .to(target, { x: 0, y: 0, duration: 0.32, ease: 'power2.out' }, 0.32)
      .to(target, { scale: 1.14, duration: 0.06, ease: 'power2.out' }, 0.26)
      .to(target, { scale: 1.0, duration: 0.26, ease: 'power2.inOut' }, 0.32)
      .to(arrow, { rotation: '+=4', duration: 0.05, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0.27)
      .set(arrow, { rotation: 0 }, 0.52)
      .to(arrow, { opacity: 0, duration: 0.16, ease: 'power1.out' }, 0.56);

    // The fall + flood
    t.to(target, { y: m.fallPx, scaleX: 0.84, scaleY: 1.3, duration: 0.34, ease: 'power1.in' }, 0.64)
      .to(target, { scaleX: 1.4, scaleY: 0.6, duration: 0.07, ease: 'power2.out' }, 0.98)
      .set(flood, { autoAlpha: 1 }, 1.00)
      .fromTo(flood, { scale: 0.02 }, { scale: m.floodScale, duration: 0.34, ease: 'power2.in' }, 1.00)
      .to(target, { opacity: 0, duration: 0.12, ease: 'power1.out' }, 1.06);

    // Rose field
    t.set(field, { autoAlpha: 1 }, 1.32)
      .set(hero, { autoAlpha: 0 }, 1.33)
      .to(container.querySelectorAll('.blob'), { opacity: 1, duration: 0.6, ease: 'power2.out' }, 1.34)
      .set(flood, { autoAlpha: 0 }, 1.36);

    // Camera push
    t.fromTo(camera, { scale: 1.0, yPercent: 0 }, { scale: 1.07, yPercent: -1.3, duration: 2.6, ease: 'none' }, 1.38)
      .fromTo(fgrid, { xPercent: 0, yPercent: 0 }, { xPercent: -1.5, yPercent: -1.0, duration: 2.6, ease: 'none' }, 1.38);

    // Cinema bars
    t.to(barTop, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, 1.5)
      .to(barBot, { yPercent: 0, duration: 0.6, ease: 'power2.out' }, 1.5);

    // Kinetic wish
    t.to(kEyebrow, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 1.54)
      .to(line1Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: 'power3.out', stagger: 0.033 }, 1.68)
      .to(line2Chars, { yPercent: 0, rotationX: 0, duration: 0.55, ease: 'power3.out', stagger: 0.033 }, 2.06)
      .to(uline, { drawn: 1, duration: 0.45, ease: 'power2.inOut' }, 2.54)
      .to(kSub, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, 2.74);

    // Bloom into tree
    t.to(barTop, { yPercent: -100, duration: 0.5, ease: 'power2.in' }, 3.32)
      .to(barBot, { yPercent: 100, duration: 0.5, ease: 'power2.in' }, 3.32)
      .set(bloom, { autoAlpha: 1 }, 3.42)
      .fromTo(bloom, { scale: 0.02 }, { scale: m.bloomScale, duration: 0.58, ease: 'power2.in' }, 3.42);

    return t;
  }

  let played = false, drawing = false, startPX = 0, startPY = 0, startDraw = 0;

  function fire() {
    if (played) return;
    played = true;
    drawing = false;
    stopBeat();
    chime(540, 780);
    filmTL = buildFilm(shotGeom());
    filmTL.play(0);
  }

  function springBack() {
    const from = curDraw;
    gsap.to({ d: from }, {
      d: 0, duration: 0.55, ease: 'elastic.out(1,0.4)',
      onUpdate() { setDraw(this.targets()[0].d); },
    });
  }

  function autoFire() {
    if (played) return;
    gsap.to({ d: curDraw }, {
      d: maxDraw * 0.94, duration: 0.62, ease: 'power2.inOut',
      onUpdate() { setDraw(this.targets()[0].d); },
      onComplete: () => gsap.delayedCall(0.16, fire),
    });
  }

  archery.addEventListener('pointerdown', (e) => {
    if (played) return;
    drawing = true;
    try { archery.setPointerCapture(e.pointerId); } catch (_) {}
    startPX = e.clientX;
    startPY = e.clientY;
    startDraw = curDraw;
    chime(440, 520);
    e.preventDefault();
  });

  archery.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    const proj = (e.clientX - startPX) * pullUX + (e.clientY - startPY) * pullUY;
    setDraw(startDraw + proj);
  });

  function endDraw() {
    if (!drawing) return;
    drawing = false;
    if (curDraw > maxDraw * 0.26) fire();
    else springBack();
  }

  archery.addEventListener('pointerup', endDraw);
  archery.addEventListener('pointercancel', endDraw);
  archery.addEventListener('keydown', (e) => {
    if (played) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      autoFire();
    }
  });

  btnTreeQuickShoot?.addEventListener('click', autoFire);

  function enterHero() {
    currentScene = 2;
    if (memoriesBtn) {
      memoriesBtn.classList.remove('is-shown');
      memoriesBtn.hidden = true;
      memoriesBtn.style.display = 'none';
    }
    setActiveDockChip('cupid');
    gsap.set(hero, { autoAlpha: 1 });
    refreshRig();
    setDraw(0);
    gsap.set([eyebrow, hint], { opacity: 0, y: 14 });
    gsap.set(target, { opacity: 0, y: 10, scaleX: 0.9, scaleY: 0.9 });
    gsap.set(archery, { opacity: 0, scale: 0.85 });
    gsap.set(heartGlow, { opacity: 0, scale: 1 });
    gsap.set(arrow, { opacity: 1 });

    const tl = gsap.timeline({ onComplete: startBeat });
    tl.to(target, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.8, ease: 'power3.out' }, 0.1)
      .to(heartGlow, { opacity: 0.7, duration: 0.8, ease: 'power2.out' }, 0.2)
      .to(archery, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.28)
      .to(eyebrow, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.4)
      .to(hint, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.7);
  }

  let treeAutoAdvanceTimer = null;
  function armReplay() {
    currentScene = 3;
    if (replay) {
      replay.hidden = false;
      replay.style.display = '';
      requestAnimationFrame(() => replay.classList.add('is-shown'));
    }
    if (memoriesBtn) {
      memoriesBtn.hidden = false;
      memoriesBtn.style.display = 'inline-flex';
      requestAnimationFrame(() => memoriesBtn.classList.add('is-shown'));
    }
    // Automatically glide to Chapter IV after 6 seconds if user is watching
    if (treeAutoAdvanceTimer) clearTimeout(treeAutoAdvanceTimer);
    treeAutoAdvanceTimer = setTimeout(() => {
      if (currentScene === 3) {
        if (memoriesBtn) {
          memoriesBtn.classList.remove('is-shown');
          memoriesBtn.hidden = true;
          memoriesBtn.style.display = 'none';
        }
        goToScene(4);
      }
    }, 6000);
  }

  function resetAll() {
    gateOpened = false;
    treeStop();
    showWish(false);
    replayArmed = false;
    treeCompleted = false;
    if (replay) {
      replay.classList.remove('is-shown');
      replay.hidden = true;
    }
    if (memoriesBtn) {
      memoriesBtn.classList.remove('is-shown');
      memoriesBtn.hidden = true;
      memoriesBtn.style.display = 'none';
    }
    if (filmTL) filmTL.pause(0);
    gsap.set([flood, bloom], { autoAlpha: 0 });
    gsap.set(field, { autoAlpha: 0 });
    gsap.set(arrow, { opacity: 1, scaleY: 1 });
    played = false;
    enterHero();
  }

  // Sizing & Canvas Init
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth || window.innerWidth;
    H = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    buildSprites();
    buildScene();
    if (played && filmTL) {
      const at = filmTL.time();
      const active = filmTL.isActive();
      filmTL = buildFilm(shotGeom());
      filmTL.pause(at);
      if (active) filmTL.play(at);
    } else {
      refreshRig();
      setDraw(0);
    }
  }

  let resizeRAF = 0;
  const onResize = () => {
    if (resizeRAF) return;
    resizeRAF = requestAnimationFrame(() => {
      resizeRAF = 0;
      resize();
    });
  };
  window.addEventListener('resize', onResize);

  resize();
  buildMotes();


  // Corner Mini Spinning CD Music Player & Safe Globals
  let zoomInstance = null;
  let isPlaying = false;
  let pillTimer = null;

  function showPill() {
    if (!trackPill) return;
    trackPill.classList.add('visible');
    clearTimeout(pillTimer);
    pillTimer = setTimeout(() => trackPill.classList.remove('visible'), 2600);
  }

  function setPlaying(playing) {
    isPlaying = playing;
    if (playing) {
      musicToggle?.classList.add('playing');
      miniCd?.classList.add('spinning');
      showPill();
    } else {
      musicToggle?.classList.remove('playing');
      miniCd?.classList.remove('spinning');
    }
    try {
      updateCassetteState(playing);
    } catch (_) {}
  }

  function startMusicAutoplay() {
    try {
      const isEditorMode = Boolean(window.isCelebrationEditorMode) ||
                           Boolean(document.querySelector('.studio-layout')) ||
                           Boolean(container.closest('.studio-layout')) ||
                           Boolean(container.closest('#previewContainer'));
      if (isEditorMode) return;
      if (!audioEl || isPlaying) return;
      audioEl.play().then(() => setPlaying(true)).catch(() => {});
    } catch (_) {}
  }

  musicToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setPlaying(false);
    } else {
      audioEl.play().then(() => setPlaying(true)).catch(() => {});
    }
  });

  // --- ACT 0: VIRAL REEL BLOSSOM OPENER ---
  let gateOpened = false;
  function openGate(e) {
    if (gateOpened) return;
    gateOpened = true;
    if (e && e.cancelable && e.type === 'touchstart') {
      try { e.preventDefault(); } catch (_) {}
    }

    try {
      chime(660, 880);
    } catch (_) {}

    try {
      startMusicAutoplay();
    } catch (_) {}

    if (viralFlowerBtn) {
      viralFlowerBtn.classList.add('bloomed');
    }

    // Burst particles
    try {
      if (burstCanvas) {
        const bCtx = burstCanvas.getContext('2d');
        const bW = (burstCanvas.width = 340);
        const bH = (burstCanvas.height = 340);
        burstCanvas.style.opacity = '1';
        const burstPetals = [];
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 8 + 3;
          burstPetals.push({
            x: bW / 2, y: bH / 2,
            vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
            size: Math.random() * 8 + 5, rot: Math.random() * Math.PI * 2,
            alpha: 1, color: ['#f43f5e', '#ec4899', '#fda4af', '#fbcfe8'][Math.floor(Math.random() * 4)]
          });
        }
        function renderBurst() {
          bCtx.clearRect(0, 0, bW, bH);
          let alive = false;
          for (let p of burstPetals) {
            p.x += p.vx; p.y += p.vy; p.alpha -= 0.025;
            if (p.alpha > 0) {
              alive = true;
              bCtx.save();
              bCtx.globalAlpha = p.alpha;
              bCtx.translate(p.x, p.y);
              bCtx.rotate(p.rot);
              bCtx.fillStyle = p.color;
              bCtx.beginPath();
              bCtx.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2);
              bCtx.fill();
              bCtx.restore();
            }
          }
          if (alive) requestAnimationFrame(renderBurst);
        }
        requestAnimationFrame(renderBurst);
      }
    } catch (_) {}

    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.45 } });
    } catch (_) {}

    setTimeout(() => {
      if (gate) gate.classList.add('is-open');
      currentScene = 2;
      enterHero();
    }, 550);
  }

  viralFlowerBtn?.addEventListener('click', openGate);
  viralFlowerBtn?.addEventListener('pointerdown', openGate);
  viralFlowerBtn?.addEventListener('touchstart', openGate, { passive: true });
  gate?.addEventListener('click', openGate);
  gate?.addEventListener('pointerdown', openGate);
  gate?.addEventListener('touchstart', openGate, { passive: true });
  gate?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openGate(e);
    }
  });

  if (isMakerReview) {
    setTimeout(openGate, 600);
  }

  replay?.addEventListener('click', resetAll);

  // Love note click on tree canvas
  let loveNoteTimer = 0;
  canvas.addEventListener('click', (e) => {
    if (!hearts.length || treeStartT === 0) return;
    const now = performance.now();
    const t = (now - treeStartT) / 1000;
    if (t < TIMINGS.bloomT0) return;
    const r = canvas.getBoundingClientRect();
    const clickX = e.clientX - r.left, clickY = e.clientY - r.top;
    let best = null, bestD = 28 * 28;
    for (const h of hearts) {
      const d2 = (h.x - clickX) * (h.x - clickX) + (h.y - clickY) * (h.y - clickY);
      const rad = Math.max(16, h.box * 0.5);
      if (d2 < rad * rad && d2 < bestD) {
        best = h;
        bestD = d2;
      }
    }
    if (!best) return;
    chime(660, 820);
    const idx = hearts.indexOf(best) % loveNotesList.length;
    loveNoteText.textContent = loveNotesList[idx];
    loveNote.style.left = best.x + 'px';
    loveNote.style.top = best.y + 'px';
    loveNote.classList.add('is-shown');
    clearTimeout(loveNoteTimer);
    loveNoteTimer = setTimeout(() => loveNote.classList.remove('is-shown'), 2600);
  });

  // =========================================================================
  // HIGH-PERFORMANCE 60FPS THREE.JS GPU MASTER ENGINE
  // =========================================================================
  const fallbackMaster3D = {
    setMode: () => {},
    dollyForward: (cb) => { if (cb) cb(); },
    releaseLanterns: () => {},
    destroy: () => {}
  };

  function initRomanceMaster3D(canvas) {
    if (!canvas || typeof window === 'undefined') return fallbackMaster3D;
    try {
      let w = window.innerWidth || 400;
      let h = window.innerHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.set(0, 0, 50);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    // 1. 3D Sakura Petals System (100 textured 3D petals with physics)
    const petalCount = 85;
    const petalGeo = new THREE.PlaneGeometry(1.2, 1.8, 2, 2);
    const pos = petalGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const py = pos.getY(i);
      pos.setZ(i, Math.sin((py + 0.9) / 1.8 * Math.PI) * 0.4);
    }
    petalGeo.computeVertexNormals();

    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffb7c5,
      emissive: 0x9f1239,
      emissiveIntensity: 0.18,
      roughness: 0.4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88
    });

    const petalsGroup = new THREE.Group();
    scene.add(petalsGroup);

    const petalData = [];
    for (let i = 0; i < petalCount; i++) {
      const mesh = new THREE.Mesh(petalGeo, petalMat);
      mesh.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 40
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = Math.random() * 0.6 + 0.6;
      mesh.scale.set(scale, scale, scale);
      petalsGroup.add(mesh);
      petalData.push({
        mesh,
        vy: -(Math.random() * 0.08 + 0.04),
        vx: (Math.random() - 0.5) * 0.03,
        vz: (Math.random() - 0.5) * 0.02,
        rx: Math.random() * 0.03,
        ry: Math.random() * 0.04,
        rz: Math.random() * 0.02,
        swayFreq: Math.random() * 2 + 1,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    // 2. 3D Celestial Starfield System (800 glowing stars)
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 160;
      starPositions[i + 1] = (Math.random() - 0.5) * 140;
      starPositions[i + 2] = (Math.random() - 0.5) * 120 - 20;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffedd5,
      size: 1.5,
      transparent: true,
      opacity: 0.75
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 3. 3D Floating Twilight Lanterns (Scene 9 & ambient)
    const lanternCount = 14;
    const lanternGeo = new THREE.CylinderGeometry(1.4, 1.7, 3.4, 8);
    const lanternMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      emissive: 0xd97706,
      emissiveIntensity: 0.8,
      roughness: 0.3
    });
    const lanternsGroup = new THREE.Group();
    scene.add(lanternsGroup);

    const lanternsData = [];
    for (let i = 0; i < lanternCount; i++) {
      const mesh = new THREE.Mesh(lanternGeo, lanternMat);
      mesh.position.set(
        (Math.random() - 0.5) * 60,
        -35 + i * 5,
        (Math.random() - 0.5) * 35
      );
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.scale.setScalar(Math.random() * 0.4 + 0.8);
      lanternsGroup.add(mesh);
      lanternsData.push({
        mesh,
        speed: Math.random() * 0.06 + 0.04,
        swaySpeed: Math.random() * 1.5 + 0.8,
        swayOffset: Math.random() * Math.PI * 2
      });
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfff1f2, 0.75);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffedd5, 1.2);
    directionalLight.position.set(20, 30, 25);
    scene.add(directionalLight);

    let currentMode = 'petals';
    let clock = new THREE.Clock();
    let rafId = 0;
    let mouseX = 0, mouseY = 0;

    function onPointerMove(e) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    function onResize() {
      w = window.innerWidth;
      h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize);

    function animate() {
      const time = clock.getElapsedTime();

      // Parallax camera tilt
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 2.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Update Petals
      if (petalsGroup.visible) {
        for (let i = 0; i < petalData.length; i++) {
          const p = petalData[i];
          p.mesh.position.y += p.vy;
          p.mesh.position.x += p.vx + Math.sin(time * p.swayFreq + p.swayOffset) * 0.03;
          p.mesh.position.z += p.vz;
          p.mesh.rotation.x += p.rx;
          p.mesh.rotation.y += p.ry;
          p.mesh.rotation.z += p.rz;

          if (p.mesh.position.y < -40) {
            p.mesh.position.y = 40;
            p.mesh.position.x = (Math.random() - 0.5) * 80;
          }
        }
      }

      // Update Stars
      starMat.opacity = 0.65 + Math.sin(time * 2) * 0.25;

      // Update Lanterns
      if (lanternsGroup.visible) {
        for (let i = 0; i < lanternsData.length; i++) {
          const l = lanternsData[i];
          l.mesh.position.y += l.speed;
          l.mesh.position.x += Math.sin(time * l.swaySpeed + l.swayOffset) * 0.03;
          l.mesh.rotation.y += 0.008;
          if (l.mesh.position.y > 45) {
            l.mesh.position.y = -35;
            l.mesh.position.x = (Math.random() - 0.5) * 60;
          }
        }
      }

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    }

    animate();

    return {
      setMode(mode) {
        currentMode = mode;
        // Keep 3D cherry blossom petals drifting across all scenes for authentic blossom aesthetic!
        petalsGroup.visible = true;
        if (mode === 'cosmos') {
          starField.visible = true;
          lanternsGroup.visible = false;
          starMat.size = 2.2;
          starMat.color.setHex(0xfbcfe8);
        } else if (mode === 'lanterns') {
          starField.visible = true;
          lanternsGroup.visible = true;
        } else {
          starField.visible = true;
          lanternsGroup.visible = (mode === 'finale');
        }
      },
      dollyForward(callback) {
        gsap.to(camera.position, {
          z: 20,
          duration: 0.42,
          ease: 'power2.in',
          onComplete: () => {
            if (callback) callback();
            gsap.fromTo(camera.position, { z: 75 }, { z: 50, duration: 0.52, ease: 'power3.out' });
          }
        });
      },
      releaseLanterns(count = 6) {
        for (let i = 0; i < count; i++) {
          const mesh = new THREE.Mesh(lanternGeo, lanternMat);
          mesh.position.set((Math.random() - 0.5) * 45, -34 - Math.random() * 8, (Math.random() - 0.5) * 30);
          mesh.scale.setScalar(Math.random() * 0.4 + 0.9);
          lanternsGroup.add(mesh);
          lanternsData.push({
            mesh,
            speed: Math.random() * 0.08 + 0.06,
            swaySpeed: Math.random() * 1.6 + 0.8,
            swayOffset: Math.random() * Math.PI * 2
          });
        }
      },
      destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onResize);
        renderer.dispose();
        petalGeo.dispose();
        petalMat.dispose();
        starGeo.dispose();
        starMat.dispose();
        lanternGeo.dispose();
        lanternMat.dispose();
      }
    };
    } catch (err) {
      console.warn("Three.js Master 3D fallback mode active:", err);
      return fallbackMaster3D;
    }
  }

  const master3D = initRomanceMaster3D(master3DCanvas) || fallbackMaster3D;

  // =========================================================================
  // ACTS IV - X: FULL-SCREEN CINEMATIC SCENE TRANSITIONS (CONTINUOUS & DYNAMIC)
  // =========================================================================
  let currentScene = 1;
  let isTransitioning = false;

  // Global transition & scene progression timers
  let starTimer = null;
  let starTimerInterval = null;
  let constRafId = 0;
  let mixtapeTimer = null;
  let reasonsAutoTimer = null;
  let milestoneTimer = null;
  let letterTimer = null;
  let lanternsTimer = null;

  function clearAllSceneTimers() {
    if (treeAutoAdvanceTimer) { clearTimeout(treeAutoAdvanceTimer); treeAutoAdvanceTimer = null; }
    if (starTimer) { clearTimeout(starTimer); starTimer = null; }
    if (starTimerInterval) { clearInterval(starTimerInterval); starTimerInterval = null; }
    if (constRafId) { cancelAnimationFrame(constRafId); constRafId = 0; }
    if (mixtapeTimer) { clearTimeout(mixtapeTimer); mixtapeTimer = null; }
    if (reasonsAutoTimer) { clearInterval(reasonsAutoTimer); reasonsAutoTimer = null; }
    if (milestoneTimer) { clearTimeout(milestoneTimer); milestoneTimer = null; }
    if (letterTimer) { clearTimeout(letterTimer); letterTimer = null; }
    if (lanternsTimer) { clearTimeout(lanternsTimer); lanternsTimer = null; }
  }

  function onSceneEnter(sceneNum) {
    if (sceneNum === 4) {
      startConstellationStage();
    } else if (sceneNum === 5) {
      startMixtapeStage();
    } else if (sceneNum === 6) {
      startStoryMilestones();
    } else if (sceneNum === 7) {
      startMatchLetter();
    } else if (sceneNum === 8) {
      startLanternsStage();
    } else if (sceneNum === 9) {
      setupSignatureCanvas();
    }
  }

  function goToScene(targetScene) {
    if (isTransitioning || targetScene === currentScene) return;
    if (targetScene < 1 || targetScene > 9) return;

    clearAllSceneTimers();
    isTransitioning = true;
    soundFx.whoosh();
    soundFx.sparkle();
    if (navigator.vibrate) navigator.vibrate([16, 32, 16]);

    // Flash portal transition overlay
    if (portalFlashOverlay) {
      gsap.fromTo(portalFlashOverlay, 
        { opacity: 0 }, 
        { opacity: 0.65, duration: 0.22, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }

    // ALWAYS hide the tree forward CTA and replay button whenever moving away from Scene 3
    if (memoriesBtn) {
      memoriesBtn.classList.remove('is-shown');
      memoriesBtn.hidden = true;
      memoriesBtn.style.display = 'none';
    }
    if (replay) {
      replay.classList.remove('is-shown');
      replay.hidden = true;
      replay.style.display = 'none';
    }

    // 3D Dolly Forward camera motion in Three.js
    if (master3D) {
      if (targetScene === 4) master3D.setMode('cosmos');
      else if (targetScene === 8) master3D.setMode('lanterns');
      else master3D.setMode('ambient');
      master3D.dollyForward();
    }

    setActiveDockChip(
      targetScene === 1 ? 'gate' :
      targetScene === 2 ? 'cupid' :
      targetScene === 3 ? 'tree' :
      targetScene === 4 ? 'stars' :
      targetScene === 5 ? 'cassette' :
      targetScene === 6 ? 'timeline' :
      targetScene === 7 ? 'letter' :
      targetScene === 8 ? 'lanterns' : 'finale'
    );

    // Hide all scenes first to ensure true full-screen isolation
    container.querySelectorAll('.romance-fullscreen-scene').forEach(sc => {
      const scIdx = parseInt(sc.getAttribute('data-scene') || '0', 10);
      if (scIdx !== targetScene) {
        sc.classList.remove('active');
        sc.style.display = 'none';
        gsap.set(sc, { opacity: 0 });
      }
    });

    if (targetScene === 1) {
      gate.classList.remove('is-open');
      gsap.set(gate, { opacity: 1, pointerEvents: 'auto' });
      gsap.set(hero, { autoAlpha: 0 });
      gsap.set(canvas, { opacity: 0 });
      treeStop();
      resetAll();
      currentScene = 1;
      isTransitioning = false;
    } else if (targetScene === 2) {
      gate.classList.add('is-open');
      gsap.set(gate, { opacity: 0, pointerEvents: 'none' });
      gsap.set(canvas, { opacity: 0 });
      treeStop();
      enterHero();
      currentScene = 2;
      isTransitioning = false;
    } else if (targetScene === 3) {
      gate.classList.add('is-open');
      gsap.set(gate, { opacity: 0, pointerEvents: 'none' });
      gsap.set(hero, { autoAlpha: 0 });
      gsap.to(canvas, { opacity: 1, duration: 0.4 });
      treeStart(); // Note: armReplay() is called when blooming finishes in treeFrame!
      currentScene = 3;
      isTransitioning = false;
    } else {
      gate.classList.add('is-open');
      gsap.set(gate, { opacity: 0, pointerEvents: 'none' });
      gsap.set(hero, { autoAlpha: 0 });
      gsap.set(canvas, { opacity: 0 });
      treeStop();

      const nextEl = container.querySelector(`.romance-fullscreen-scene[data-scene="${targetScene}"]`);
      if (nextEl) {
        nextEl.style.display = 'flex';
        nextEl.classList.add('active');
        nextEl.scrollTop = 0;
        gsap.fromTo(nextEl,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.48,
            ease: 'cubic-bezier(0.16, 1, 0.3, 1)',
            delay: 0.1,
            onComplete: () => {
              currentScene = targetScene;
              isTransitioning = false;
              onSceneEnter(targetScene);
            }
          }
        );
      } else {
        isTransitioning = false;
      }
    }
  }

  // Tree Memories Button transitions forward to Scene 4 (Written in the Stars)
  memoriesBtn?.addEventListener('click', () => {
    if (treeAutoAdvanceTimer) clearTimeout(treeAutoAdvanceTimer);
    memoriesBtn.classList.remove('is-shown');
    memoriesBtn.hidden = true;
    memoriesBtn.style.display = 'none';
    goToScene(4);
  });

  // Wire up all forward action buttons across all full-screen scenes
  container.querySelectorAll('.btn-scene-next-hero, .btn-scene-next').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const target = parseInt(btn.getAttribute('data-target') || btn.getAttribute('data-next') || '0', 10);
      if (target) goToScene(target);
    });
  });

  // =========================================================================
  // ACT IV: FULL-SCREEN 60FPS CELESTIAL STARS ENGINE (LIKE TREE CANVAS)
  // =========================================================================
  const constellationCanvas = container.querySelector('#constellationCanvas');
  const constellationCard = container.querySelector('#constellationMemoryCard');
  const constNodeNum = container.querySelector('#constNodeNum');
  const constNodeTitle = container.querySelector('#constNodeTitle');
  const constNodeDate = container.querySelector('#constNodeDate');
  const constNodeNote = container.querySelector('#constNodeNote');
  const thanorTimerBar = container.querySelector('#thanorTimerBar');
  const thanorTimerText = container.querySelector('#thanorTimerText');
  const btnThanorNextStar = container.querySelector('#btnThanorNextStar');
  const constStarChips = container.querySelectorAll('.const-star-chip');
  const hyperdriveWarpOverlay = container.querySelector('#hyperdriveWarpOverlay');

  let activeConstIdx = 0;
  let constEngineReady = false;
  let cCtx = null;
  let cW = 0, cH = 0;
  let bgStars = [];
  let shootingStars = [];
  let beamProgress = 1;
  let beamFromIdx = 0;
  let beamToIdx = 0;
  let isWarping = false;
  let warpParticles = [];
  let touchSparks = [];

  function resizeConstCanvas() {
    if (!constellationCanvas) return;
    cW = window.innerWidth || 400;
    cH = window.innerHeight || 700;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    constellationCanvas.width = cW * dpr;
    constellationCanvas.height = cH * dpr;
    constellationCanvas.style.width = cW + 'px';
    constellationCanvas.style.height = cH + 'px';
    if (!cCtx) cCtx = constellationCanvas.getContext('2d');
    cCtx.setTransform(1, 0, 0, 1, 0, 0);
    cCtx.scale(dpr, dpr);
  }

  function getNodePositions() {
    const isMobile = cW < 640;
    // Guaranteed 100% unobstructed celestial constellation layout:
    // Every star is positioned in the open celestial sky between y: 19% and y: 52%
    // Well below the top header and completely above the bottom memory card
    const coords = isMobile ? [
      { x: 0.18, y: 0.32 }, // Star 1: The First Spark (Left sky)
      { x: 0.38, y: 0.21 }, // Star 2: Midnight Drives (Upper-center sky)
      { x: 0.78, y: 0.23 }, // Star 3: Quiet Safe Harbor (Upper-right sky)
      { x: 0.82, y: 0.44 }, // Star 4: The Turning Point (Mid-right sky)
      { x: 0.48, y: 0.50 }  // Star 5: Our North Star (Lower-center apex)
    ] : [
      { x: 0.20, y: 0.34 }, // Star 1
      { x: 0.40, y: 0.22 }, // Star 2
      { x: 0.75, y: 0.25 }, // Star 3
      { x: 0.80, y: 0.46 }, // Star 4
      { x: 0.50, y: 0.52 }  // Star 5
    ];

    return coords.map((c, i) => ({
      x: c.x * cW,
      y: c.y * cH,
      title: constellationsList[i]?.title || `Star 0${i + 1}`,
      date: constellationsList[i]?.date || '',
      num: `0${i + 1}`
    }));
  }

  function maybeSpawnShootingStar() {
    if (shootingStars.length < 2 && Math.random() < 0.03) {
      shootingStars.push({
        x: Math.random() * cW * 0.8,
        y: Math.random() * cH * 0.4,
        len: Math.random() * 80 + 50,
        speed: Math.random() * 12 + 10,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015
      });
    }
  }

  function spawnTouchSparks(x, y) {
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = Math.random() * 5 + 2.5;
      touchSparks.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 2.5 + 1.2,
        alpha: 1,
        color: ['#fbbf24', '#f43f5e', '#ffffff', '#a855f7'][Math.floor(Math.random() * 4)]
      });
    }
  }

  function startConstellationStage() {
    if (!constellationCanvas) return;
    resizeConstCanvas();
    if (!constEngineReady) {
      constEngineReady = true;
      window.addEventListener('resize', resizeConstCanvas);

      // Initialize 120 background drifting & twinkling stars
      bgStars = [];
      for (let i = 0; i < 120; i++) {
        bgStars.push({
          x: Math.random() * cW,
          y: Math.random() * cH,
          r: Math.random() * 1.6 + 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 2 + 0.8,
          driftX: (Math.random() - 0.5) * 0.12,
          driftY: (Math.random() - 0.5) * 0.12
        });
      }

      // Tap / Touch anywhere on canvas advances star with spark ripple
      constellationCanvas.addEventListener('pointerdown', (e) => {
        const rect = constellationCanvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        spawnTouchSparks(clickX, clickY);

        const points = getNodePositions();
        for (let i = 0; i < points.length; i++) {
          const dist = Math.hypot(clickX - points[i].x, clickY - points[i].y);
          if (dist < 50) {
            selectConstellationNode(i, true);
            return;
          }
        }
        if (activeConstIdx < constellationsList.length - 1) {
          selectConstellationNode(activeConstIdx + 1, true);
        } else {
          triggerHyperdriveWarp();
        }
      });

      btnThanorNextStar?.addEventListener('click', () => {
        if (activeConstIdx < constellationsList.length - 1) {
          selectConstellationNode(activeConstIdx + 1, true);
        } else {
          triggerHyperdriveWarp();
        }
      });

      constStarChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const idx = parseInt(chip.getAttribute('data-idx') || '0', 10);
          selectConstellationNode(idx, true);
        });
      });
    }

    isWarping = false;
    touchSparks = [];
    shootingStars = [];
    const startTime = Date.now();

    function renderConstellationLoop() {
      if (currentScene !== 4) return;
      const elapsed = (Date.now() - startTime) / 1000;
      cCtx.clearRect(0, 0, cW, cH);

      if (isWarping) {
        cCtx.fillStyle = 'rgba(10, 4, 18, 0.32)';
        cCtx.fillRect(0, 0, cW, cH);
        cCtx.strokeStyle = '#ffffff';
        cCtx.lineWidth = 2.8;
        cCtx.shadowColor = '#fbbf24';
        cCtx.shadowBlur = 12;

        warpParticles.forEach(p => {
          p.z -= p.speed;
          if (p.z <= 0) {
            p.x = (Math.random() - 0.5) * cW * 2;
            p.y = (Math.random() - 0.5) * cH * 2;
            p.z = 1000;
          }
          const k = 300 / p.z;
          const px = p.x * k + cW / 2;
          const py = p.y * k + cH / 2;
          const prevK = 300 / (p.z + p.speed * 2.5);
          const prevX = p.x * prevK + cW / 2;
          const prevY = p.y * prevK + cH / 2;

          cCtx.beginPath();
          cCtx.moveTo(prevX, prevY);
          cCtx.lineTo(px, py);
          cCtx.stroke();
        });
        cCtx.shadowBlur = 0;
        constRafId = requestAnimationFrame(renderConstellationLoop);
        return;
      }

      // 1. Deep Galactic Space Gradient with Nebula Glow
      const bgGrad = cCtx.createRadialGradient(cW * 0.5, cH * 0.4, 50, cW * 0.5, cH * 0.4, Math.max(cW, cH) * 0.85);
      bgGrad.addColorStop(0, '#1c0c2e');
      bgGrad.addColorStop(0.35, '#130721');
      bgGrad.addColorStop(0.75, '#0a0311');
      bgGrad.addColorStop(1, '#050208');
      cCtx.fillStyle = bgGrad;
      cCtx.fillRect(0, 0, cW, cH);

      // Breathing Nebula Clouds
      const breathe = Math.sin(elapsed * 0.8) * 0.03;
      const neb1 = cCtx.createRadialGradient(cW * 0.3, cH * 0.35, 10, cW * 0.3, cH * 0.35, cW * 0.45);
      neb1.addColorStop(0, `rgba(244, 63, 94, ${(0.13 + breathe).toFixed(3)})`);
      neb1.addColorStop(1, 'transparent');
      cCtx.fillStyle = neb1;
      cCtx.fillRect(0, 0, cW, cH);

      const neb2 = cCtx.createRadialGradient(cW * 0.7, cH * 0.45, 10, cW * 0.7, cH * 0.45, cW * 0.5);
      neb2.addColorStop(0, `rgba(168, 85, 247, ${(0.13 - breathe).toFixed(3)})`);
      neb2.addColorStop(1, 'transparent');
      cCtx.fillStyle = neb2;
      cCtx.fillRect(0, 0, cW, cH);

      // 2. Background Twinkling & Drifting Stars
      bgStars.forEach(s => {
        s.x += s.driftX;
        s.y += s.driftY;
        if (s.x < 0) s.x = cW;
        if (s.x > cW) s.x = 0;
        if (s.y < 0) s.y = cH;
        if (s.y > cH) s.y = 0;

        const alpha = 0.25 + 0.65 * Math.sin(elapsed * s.speed + s.phase);
        cCtx.fillStyle = `rgba(255, 240, 225, ${Math.max(0.1, alpha.toFixed(2))})`;
        cCtx.beginPath();
        cCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        cCtx.fill();
      });

      // 3. Shooting stars
      maybeSpawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= ss.decay;
        if (ss.alpha <= 0) {
          shootingStars.splice(i, 1);
          continue;
        }
        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;
        const sGrad = cCtx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        sGrad.addColorStop(0, 'rgba(255,255,255,0)');
        sGrad.addColorStop(1, `rgba(255,255,255,${ss.alpha.toFixed(2)})`);
        cCtx.strokeStyle = sGrad;
        cCtx.lineWidth = 1.8;
        cCtx.beginPath();
        cCtx.moveTo(tailX, tailY);
        cCtx.lineTo(ss.x, ss.y);
        cCtx.stroke();
      }

      // 4. Touch sparks
      for (let i = touchSparks.length - 1; i >= 0; i--) {
        const sp = touchSparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= 0.035;
        if (sp.alpha <= 0) {
          touchSparks.splice(i, 1);
          continue;
        }
        cCtx.save();
        cCtx.globalAlpha = sp.alpha;
        cCtx.fillStyle = sp.color;
        cCtx.beginPath();
        cCtx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        cCtx.fill();
        cCtx.restore();
      }

      // 5. Calculate node positions (Guaranteed 100% visible in open sky)
      const points = getNodePositions();

      // 6. Faint Astrological Constellation Guide Lines (Shows full constellation map immediately)
      cCtx.save();
      cCtx.beginPath();
      cCtx.setLineDash([4, 6]);
      cCtx.lineWidth = 1.2;
      cCtx.strokeStyle = 'rgba(251, 191, 36, 0.22)';
      points.forEach((pt, i) => {
        if (i === 0) cCtx.moveTo(pt.x, pt.y);
        else cCtx.lineTo(pt.x, pt.y);
      });
      cCtx.closePath();
      cCtx.stroke();
      cCtx.restore();

      // 7. Active Illuminated Stardust Constellation Beams
      if (activeConstIdx > 0) {
        cCtx.save();
        cCtx.beginPath();
        cCtx.lineWidth = 2.8;
        cCtx.strokeStyle = '#fbbf24';
        cCtx.shadowColor = '#fbbf24';
        cCtx.shadowBlur = 12;
        for (let i = 0; i <= Math.min(beamFromIdx, activeConstIdx); i++) {
          if (i === 0) cCtx.moveTo(points[i].x, points[i].y);
          else cCtx.lineTo(points[i].x, points[i].y);
        }
        cCtx.stroke();
        cCtx.restore();
      }

      // Draw animated stardust laser beam from beamFromIdx to beamToIdx
      if (beamProgress < 1 && beamToIdx > beamFromIdx) {
        const p1 = points[beamFromIdx];
        const p2 = points[beamToIdx];
        const curX = p1.x + (p2.x - p1.x) * beamProgress;
        const curY = p1.y + (p2.y - p1.y) * beamProgress;

        cCtx.save();
        cCtx.beginPath();
        cCtx.lineWidth = 3.6;
        cCtx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
        cCtx.shadowColor = '#f43f5e';
        cCtx.shadowBlur = 16;
        cCtx.moveTo(p1.x, p1.y);
        cCtx.lineTo(curX, curY);
        cCtx.stroke();
        cCtx.restore();

        // Glowing sparkle at beam tip
        cCtx.beginPath();
        cCtx.arc(curX, curY, 4.5, 0, Math.PI * 2);
        cCtx.fillStyle = '#ffffff';
        cCtx.shadowColor = '#fbbf24';
        cCtx.shadowBlur = 10;
        cCtx.fill();
        cCtx.shadowBlur = 0;

        beamProgress += 0.045;
      }

      // 8. Draw the 5 Great Celestial Stars (Accurate, Assigned, and Radiant)
      points.forEach((pt, idx) => {
        const isActive = (idx === activeConstIdx);
        const isVisited = (idx <= activeConstIdx);
        const pulse = Math.sin(elapsed * 3.5 + idx) * 3;
        const outerR = isActive ? 24 + pulse : (isVisited ? 15 + pulse * 0.4 : 11);

        // A. Pulsating Starlight Corona Halo
        cCtx.beginPath();
        cCtx.arc(pt.x, pt.y, Math.max(4, outerR), 0, Math.PI * 2);
        cCtx.strokeStyle = isActive ? 'rgba(251, 191, 36, 0.95)' : (isVisited ? 'rgba(244, 63, 94, 0.7)' : 'rgba(255, 255, 255, 0.3)');
        cCtx.lineWidth = isActive ? 2.5 : 1.2;
        cCtx.stroke();

        // B. 6 Microscopic Orbiting Celestial Photons for Active Star
        if (isActive) {
          for (let k = 0; k < 6; k++) {
            const photonAngle = elapsed * 2.2 + (k * Math.PI / 3);
            const px = pt.x + Math.cos(photonAngle) * (outerR + 6);
            const py = pt.y + Math.sin(photonAngle) * ((outerR + 6) * 0.65);
            cCtx.beginPath();
            cCtx.arc(px, py, 1.4, 0, Math.PI * 2);
            cCtx.fillStyle = '#ffffff';
            cCtx.shadowColor = '#fbbf24';
            cCtx.shadowBlur = 6;
            cCtx.fill();
            cCtx.shadowBlur = 0;
          }
        }

        // C. Rotating Diamond Diffraction Spikes
        const spikeLen = isActive ? 22 + pulse * 0.6 : 12;
        const spikeRot = elapsed * 0.35 + idx;
        cCtx.save();
        cCtx.translate(pt.x, pt.y);
        cCtx.rotate(spikeRot);
        cCtx.strokeStyle = isActive ? '#fbbf24' : (isVisited ? 'rgba(251, 191, 36, 0.65)' : 'rgba(255, 255, 255, 0.3)');
        cCtx.lineWidth = isActive ? 2 : 1.2;
        cCtx.shadowColor = '#fbbf24';
        cCtx.shadowBlur = isActive ? 12 : 4;
        cCtx.beginPath();
        cCtx.moveTo(-spikeLen, 0); cCtx.lineTo(spikeLen, 0);
        cCtx.moveTo(0, -spikeLen); cCtx.lineTo(0, spikeLen);
        cCtx.stroke();
        // Secondary 45-degree subtle starburst cross
        cCtx.rotate(Math.PI / 4);
        cCtx.strokeStyle = isActive ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.15)';
        cCtx.lineWidth = 1;
        cCtx.beginPath();
        cCtx.moveTo(-spikeLen * 0.55, 0); cCtx.lineTo(spikeLen * 0.55, 0);
        cCtx.moveTo(0, -spikeLen * 0.55); cCtx.lineTo(0, spikeLen * 0.55);
        cCtx.stroke();
        cCtx.restore();

        // D. Diamond Core Star
        cCtx.beginPath();
        cCtx.arc(pt.x, pt.y, isActive ? 7 : (isVisited ? 5 : 3.8), 0, Math.PI * 2);
        cCtx.fillStyle = isActive ? '#ffffff' : (isVisited ? '#fef08a' : '#d1d5db');
        cCtx.shadowColor = isActive ? '#fbbf24' : '#f43f5e';
        cCtx.shadowBlur = isActive ? 20 : 6;
        cCtx.fill();
        cCtx.shadowBlur = 0;

        // E. Assigned Astrological Label on Canvas
        cCtx.save();
        cCtx.font = isActive ? 'bold 11px system-ui, sans-serif' : '500 10px system-ui, sans-serif';
        cCtx.textAlign = (pt.x > cW * 0.6) ? 'right' : 'left';
        const textX = (pt.x > cW * 0.6) ? pt.x - (outerR + 8) : pt.x + (outerR + 8);
        const textY = pt.y + 4;
        if (isActive) {
          cCtx.fillStyle = '#fbbf24';
          cCtx.shadowColor = '#fbbf24';
          cCtx.shadowBlur = 10;
        } else if (isVisited) {
          cCtx.fillStyle = 'rgba(255, 235, 245, 0.85)';
        } else {
          cCtx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        }
        cCtx.fillText(`✦ ${pt.num} ${pt.title}`, textX, textY);
        cCtx.restore();
      });

      constRafId = requestAnimationFrame(renderConstellationLoop);
    }

    renderConstellationLoop();
    selectConstellationNode(0);
  }

  function selectConstellationNode(idx, userInitiated = false) {
    if (idx < 0 || idx >= constellationsList.length) return;
    if (idx > activeConstIdx) {
      beamFromIdx = activeConstIdx;
      beamToIdx = idx;
      beamProgress = 0;
    }
    activeConstIdx = idx;
    const dataItem = constellationsList[idx];

    constStarChips.forEach((chip, i) => {
      chip.classList.toggle('active', i === idx);
    });

    if (constNodeNum) constNodeNum.textContent = `STAR 0${idx + 1} / 0${constellationsList.length}`;
    if (constNodeTitle) constNodeTitle.textContent = dataItem.title;
    if (constNodeDate) constNodeDate.textContent = dataItem.date;
    if (constNodeNote) constNodeNote.textContent = dataItem.note;

    if (constellationCard) {
      constellationCard.style.display = 'block';
      gsap.fromTo(constellationCard, 
        { opacity: 0, y: 15, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }

    chime(800 + idx * 80, 1100 + idx * 90);
    soundFx.sparkle();
    if (navigator.vibrate) navigator.vibrate([16, 28]);

    // Timer ring / bar
    if (starTimer) clearTimeout(starTimer);
    if (starTimerInterval) clearInterval(starTimerInterval);

    if (thanorTimerBar) {
      thanorTimerBar.style.transition = 'none';
      thanorTimerBar.style.width = '0%';
      requestAnimationFrame(() => {
        thanorTimerBar.style.transition = 'width 3.5s linear';
        thanorTimerBar.style.width = '100%';
      });
    }

    let timeLeft = 3;
    if (thanorTimerText) thanorTimerText.textContent = `Next in ${timeLeft}s`;
    starTimerInterval = setInterval(() => {
      timeLeft--;
      if (thanorTimerText && timeLeft >= 0) {
        thanorTimerText.textContent = (idx === constellationsList.length - 1) ? 'Warping...' : `Next in ${timeLeft}s`;
      }
    }, 1000);

    starTimer = setTimeout(() => {
      if (starTimerInterval) clearInterval(starTimerInterval);
      if (activeConstIdx < constellationsList.length - 1) {
        selectConstellationNode(activeConstIdx + 1);
      } else {
        triggerHyperdriveWarp();
      }
    }, 3500);
  }

  function triggerHyperdriveWarp() {
    if (starTimer) clearTimeout(starTimer);
    if (starTimerInterval) clearInterval(starTimerInterval);

    chime(528, 1056);
    soundFx.celebrate();
    if (hyperdriveWarpOverlay) {
      hyperdriveWarpOverlay.classList.add('active');
    }

    warpParticles = [];
    for (let i = 0; i < 220; i++) {
      warpParticles.push({
        x: (Math.random() - 0.5) * cW * 2,
        y: (Math.random() - 0.5) * cH * 2,
        z: Math.random() * 1000,
        speed: Math.random() * 25 + 30
      });
    }
    isWarping = true;

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#f43f5e', '#ffffff', '#a855f7']
    });

    if (master3D) master3D.dollyForward();

    setTimeout(() => {
      if (hyperdriveWarpOverlay) hyperdriveWarpOverlay.classList.remove('active');
      isWarping = false;
      goToScene(5);
    }, 1400);
  }

  // =========================================================================
  // ACT V: VINTAGE SAKURA CASSETTE DECK & INTERACTIVE PLAYLIST
  // =========================================================================
  const btnCassettePlay = container.querySelector('#btnCassettePlay');
  const btnCassettePrev = container.querySelector('#btnCassettePrev');
  const btnCassetteNext = container.querySelector('#btnCassetteNext');
  const cassettePlayIcon = container.querySelector('#cassettePlayIcon');
  const cassettePlayLabel = container.querySelector('#cassettePlayLabel');
  const cassetteTitleText = container.querySelector('#cassetteTitleText');
  const cassetteProgressBar = container.querySelector('#cassetteProgressBar');
  const cassetteProgressTrack = container.querySelector('#cassetteProgressTrack');
  const cassetteCurrentTime = container.querySelector('#cassetteCurrentTime');
  const cassetteDuration = container.querySelector('#cassetteDuration');
  const spoolLeft = container.querySelector('#spoolLeft');
  const spoolRight = container.querySelector('#spoolRight');
  const cassetteEqBars = container.querySelector('#cassetteEqBars');
  const btnShuffleReasons = container.querySelector('#btnShuffleReasons');
  const reasonHeroCard = container.querySelector('#reasonHeroCard');
  const reasonCardBadge = container.querySelector('#reasonCardBadge');
  const reasonCardBody = container.querySelector('#reasonCardBody');
  const reasonPillItems = container.querySelectorAll('.reason-pill-item');
  const btnMixtapeNextMilestones = container.querySelector('#btnMixtapeNextMilestones');

  let currentReasonIdx = 0;
  let currentTrackIdx = 0;

  function formatAudioTime(secs) {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateCassetteState(playing) {
    if (spoolLeft) spoolLeft.classList.toggle('spinning', playing);
    if (spoolRight) spoolRight.classList.toggle('spinning', playing);
    if (cassetteEqBars) cassetteEqBars.classList.toggle('active', playing);
    if (cassettePlayIcon) cassettePlayIcon.textContent = playing ? '❚❚' : '▶';
    if (cassettePlayLabel) cassettePlayLabel.textContent = playing ? 'Pause Melody' : 'Play Melody';

    // Update song row icons in tracklist
    const songRows = container.querySelectorAll('.mixtape-song-row');
    songRows.forEach((r, i) => {
      r.classList.toggle('is-playing', i === currentTrackIdx);
      const icon = r.querySelector('.btn-song-icon');
      if (icon) {
        icon.textContent = (i === currentTrackIdx && playing) ? '❚❚' : '▶';
      }
    });
  }

  function loadAndPlayTrack(idx, shouldAutoplay = true) {
    if (idx < 0) idx = playlist.length - 1;
    if (idx >= playlist.length) idx = 0;
    currentTrackIdx = idx;

    const track = playlist[currentTrackIdx];
    if (!track) return;

    if (cassetteTitleText) {
      cassetteTitleText.textContent = `${track.title} - ${track.artist || ''}`;
    }
    const cdTrackTitle = container.querySelector('#treeTrackPill .cd-pill-title');
    if (cdTrackTitle) {
      cdTrackTitle.textContent = track.title;
    }
    if (cassetteDuration && track.duration) {
      cassetteDuration.textContent = track.duration;
    }

    updateCassetteState(isPlaying);

    if (audioEl) {
      const currentSrc = audioEl.currentSrc || audioEl.src || '';
      if (!currentSrc.includes(track.src)) {
        audioEl.src = track.src;
      }
      if (shouldAutoplay) {
        audioEl.play().then(() => {
          setPlaying(true);
          updateCassetteState(true);
        }).catch(() => {});
      }
    }
  }

  // Bind track clicking in tracklist
  container.querySelectorAll('.mixtape-song-row').forEach(row => {
    row.addEventListener('click', () => {
      soundFx.pop(720);
      if (navigator.vibrate) navigator.vibrate(12);
      const idx = parseInt(row.getAttribute('data-track-idx') || '0', 10);
      if (idx === currentTrackIdx && isPlaying) {
        audioEl.pause();
        setPlaying(false);
        updateCassetteState(false);
      } else {
        loadAndPlayTrack(idx, true);
      }
    });
  });

  // Bind tab switching between Mixtape Tracks / Spotify / YouTube
  container.querySelectorAll('.source-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      soundFx.pop(650);
      const src = btn.getAttribute('data-source');
      container.querySelectorAll('.source-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const pNative = container.querySelector('#tabPanelNative');
      const pSpotify = container.querySelector('#tabPanelSpotify');
      const pYoutube = container.querySelector('#tabPanelYoutube');

      if (pNative) pNative.style.display = src === 'native' ? 'block' : 'none';
      if (pSpotify) pSpotify.style.display = src === 'spotify' ? 'block' : 'none';
      if (pYoutube) pYoutube.style.display = src === 'youtube' ? 'block' : 'none';
    });
  });

  // Track progress and time
  if (audioEl) {
    audioEl.addEventListener('timeupdate', () => {
      if (!audioEl.duration) return;
      const pct = (audioEl.currentTime / audioEl.duration) * 100;
      if (cassetteProgressBar) cassetteProgressBar.style.width = `${pct}%`;
      if (cassetteCurrentTime) cassetteCurrentTime.textContent = formatAudioTime(audioEl.currentTime);
      if (cassetteDuration && !isNaN(audioEl.duration)) {
        cassetteDuration.textContent = formatAudioTime(audioEl.duration);
      }
    });

    audioEl.addEventListener('ended', () => {
      loadAndPlayTrack(currentTrackIdx + 1, true);
    });
  }

  // Scrub bar clicking
  cassetteProgressTrack?.addEventListener('click', (e) => {
    if (!audioEl || !audioEl.duration) return;
    const rect = cassetteProgressTrack.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    audioEl.currentTime = pos * audioEl.duration;
  });

  btnCassettePlay?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!audioEl) return;
    if (isPlaying) {
      audioEl.pause();
      setPlaying(false);
      updateCassetteState(false);
    } else {
      audioEl.play().then(() => {
        setPlaying(true);
        updateCassetteState(true);
      }).catch(() => {});
    }
  });

  btnCassettePrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    soundFx.pop(600);
    loadAndPlayTrack(currentTrackIdx - 1, true);
  });

  btnCassetteNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    soundFx.pop(600);
    loadAndPlayTrack(currentTrackIdx + 1, true);
  });

  function showReason(idx) {
    currentReasonIdx = idx % reasonsList.length;
    if (reasonCardBadge) reasonCardBadge.textContent = `REASON #${currentReasonIdx + 1}`;
    if (reasonCardBody) reasonCardBody.textContent = `"${reasonsList[currentReasonIdx]}"`;

    reasonPillItems.forEach((pill, i) => {
      pill.classList.toggle('active', i === currentReasonIdx);
    });

    if (reasonHeroCard) {
      gsap.fromTo(reasonHeroCard, 
        { rotateY: 90, opacity: 0 }, 
        { rotateY: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }

  btnShuffleReasons?.addEventListener('click', () => {
    soundFx.pop(650);
    if (navigator.vibrate) navigator.vibrate(12);
    showReason(currentReasonIdx + 1);
  });

  reasonPillItems.forEach(pill => {
    pill.addEventListener('click', () => {
      soundFx.pop(720);
      const idx = parseInt(pill.getAttribute('data-reason-idx') || '0', 10);
      showReason(idx);
    });
  });

  btnMixtapeNextMilestones?.addEventListener('click', () => {
    goToScene(6);
  });

  function startMixtapeStage() {
    updateCassetteState(isPlaying);
    showReason(0);
    if (reasonsAutoTimer) clearInterval(reasonsAutoTimer);
    reasonsAutoTimer = setInterval(() => {
      if (currentScene === 5) showReason(currentReasonIdx + 1);
    }, 4500);

    // Ample comfortable listening time (60s)
    if (mixtapeTimer) clearTimeout(mixtapeTimer);
    mixtapeTimer = setTimeout(() => {
      if (currentScene === 5) goToScene(6);
    }, 60000);
  }

  // =========================================================================
  // ACT VI: STORYTELLING MILESTONES WITH 3D FLYING LEAF ANIMATION
  // =========================================================================
  const storyMilestoneCard = container.querySelector('#storyMilestoneCard');
  const storyCardTag = container.querySelector('#storyCardTag');
  const storyCardDate = container.querySelector('#storyCardDate');
  const storyCardPhoto = container.querySelector('#storyCardPhoto');
  const storyCardTitle = container.querySelector('#storyCardTitle');
  const storyCardDesc = container.querySelector('#storyCardDesc');
  const storyMilestoneDots = container.querySelectorAll('.story-dot');
  const storyMilestoneCounter = container.querySelector('#storyMilestoneCounter');
  const btnFlyNextMilestone = container.querySelector('#btnFlyNextMilestone');
  const btnFlyText = container.querySelector('#btnFlyText');
  const flyingLeavesSky = container.querySelector('#flyingLeavesSky');

  let currentMilestoneIdx = 0;

  function updateMilestoneCard() {
    const item = milestonesList[currentMilestoneIdx];
    if (!item) return;

    if (storyCardTag) storyCardTag.textContent = item.tag || `CHAPTER 0${currentMilestoneIdx + 1}`;
    if (storyCardDate) storyCardDate.textContent = item.date || '';
    if (storyCardPhoto) storyCardPhoto.src = item.image || '/images/sunset.jpg';
    if (storyCardTitle) storyCardTitle.textContent = item.title || '';
    if (storyCardDesc) storyCardDesc.textContent = item.desc || '';

    if (storyMilestoneCounter) {
      storyMilestoneCounter.textContent = `Chapter ${currentMilestoneIdx + 1} of ${milestonesList.length}`;
    }

    storyMilestoneDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentMilestoneIdx);
    });

    if (btnFlyText) {
      if (currentMilestoneIdx === milestonesList.length - 1) {
        btnFlyText.textContent = 'Whirlwind to The Sacred Letter 🔥';
      } else {
        btnFlyText.textContent = 'Fly to Next Chapter';
      }
    }
  }

  function spawnFlyingLeaves(count = 22) {
    if (!flyingLeavesSky) return;
    const leafIcons = ['🌸', '💮', '🌸', '🌺', '🌸', '✨'];
    for (let i = 0; i < count; i++) {
      const leaf = document.createElement('div');
      leaf.className = 'flying-leaf';
      leaf.textContent = leafIcons[Math.floor(Math.random() * leafIcons.length)];
      
      const startX = Math.random() * 90;
      const startY = Math.random() * 40 + 60;
      const targetX = startX + (Math.random() * 120 - 40);
      const targetY = -20 - Math.random() * 30;
      const rotZ = Math.random() * 720 - 360;
      const rotX = Math.random() * 360;
      const duration = 0.9 + Math.random() * 0.7;
      const delay = Math.random() * 0.22;
      const scale = 0.8 + Math.random() * 0.8;

      leaf.style.left = `${startX}%`;
      leaf.style.top = `${startY}%`;
      leaf.style.fontSize = `${20 * scale}px`;
      flyingLeavesSky.appendChild(leaf);

      gsap.to(leaf, {
        x: `${targetX - startX}vw`,
        y: `${targetY - startY}vh`,
        rotation: rotZ,
        rotationX: rotX,
        opacity: 0,
        duration: duration,
        delay: delay,
        ease: 'power1.out',
        onComplete: () => leaf.remove()
      });
    }
  }

  function flyToNextMilestone(userInitiated = false) {
    soundFx.whoosh();
    if (navigator.vibrate) navigator.vibrate(18);

    if (currentMilestoneIdx < milestonesList.length - 1) {
      spawnFlyingLeaves(18);
      gsap.to(storyMilestoneCard, {
        x: -300,
        rotation: -14,
        scale: 0.88,
        opacity: 0,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: () => {
          currentMilestoneIdx++;
          updateMilestoneCard();
          gsap.fromTo(storyMilestoneCard,
            { x: 300, rotation: 14, scale: 0.88, opacity: 0 },
            { x: 0, rotation: 0, scale: 1, opacity: 1, duration: 0.48, ease: 'back.out(1.2)' }
          );
          scheduleMilestoneAutoAdvance();
        }
      });
    } else {
      spawnFlyingLeaves(35);
      soundFx.whoosh();
      if (milestoneTimer) clearTimeout(milestoneTimer);
      setTimeout(() => {
        goToScene(7);
      }, 700);
    }
  }

  function scheduleMilestoneAutoAdvance() {
    if (milestoneTimer) clearTimeout(milestoneTimer);
    milestoneTimer = setTimeout(() => {
      if (currentScene === 6) flyToNextMilestone(false);
    }, 4500);
  }

  function startStoryMilestones() {
    currentMilestoneIdx = 0;
    updateMilestoneCard();
    scheduleMilestoneAutoAdvance();
  }

  btnFlyNextMilestone?.addEventListener('click', () => flyToNextMilestone(true));
  storyMilestoneCard?.addEventListener('click', () => flyToNextMilestone(true));

  // =========================================================================
  // ACT VII: SACRED LETTER WITH PHYSICAL MATCHSTICK RUBBING & BURNING
  // =========================================================================
  const btnStrikeMatch = container.querySelector('#btnStrikeMatch');
  const matchStick = container.querySelector('#matchStick');
  const matchHead = container.querySelector('#matchHead');
  const matchFlame = container.querySelector('#matchFlame');
  const matchStrikerStrip = container.querySelector('#matchStrikerStrip');
  const matchSparksCanvas = container.querySelector('#matchSparksCanvas');
  const waxSealStamp = container.querySelector('#waxSealStamp');
  const waxSealWrapper = container.querySelector('#waxSealWrapper');
  const envelopeBurnMask = container.querySelector('#envelopeBurnMask');
  const parchmentLetter = container.querySelector('#parchmentLetter');
  const letterInstructionText = container.querySelector('#letterInstructionText');
  const btnLetterNextLanterns = container.querySelector('#btnLetterNextLanterns');

  let matchStriken = false;
  let isRubbingMatch = false;
  let frictionScore = 0;
  let lastRubX = 0;
  let lastRubTime = 0;
  let matchSparksCtx = null;
  let matchParticles = [];
  let sparksAnimId = null;

  function initSparksCanvas() {
    if (!matchSparksCanvas) return;
    const rect = matchSparksCanvas.parentElement?.getBoundingClientRect();
    matchSparksCanvas.width = (rect && rect.width) ? rect.width : 280;
    matchSparksCanvas.height = 60;
    matchSparksCtx = matchSparksCanvas.getContext('2d');
  }

  function emitFrictionSparks(x, y, count = 12) {
    if (!matchSparksCanvas) return;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 1.05) + Math.random() * (Math.PI * 0.9);
      const speed = 2 + Math.random() * 5.2;
      matchParticles.push({
        x: x || matchSparksCanvas.width * 0.45,
        y: y || 22,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.035 + Math.random() * 0.04,
        size: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.35 ? '#ffaa00' : (Math.random() > 0.5 ? '#ff4500' : '#ffffff')
      });
    }
    if (!sparksAnimId) renderSparksLoop();
  }

  function renderSparksLoop() {
    if (!matchSparksCtx || !matchSparksCanvas) return;
    matchSparksCtx.clearRect(0, 0, matchSparksCanvas.width, matchSparksCanvas.height);
    for (let i = matchParticles.length - 1; i >= 0; i--) {
      const p = matchParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.life -= p.decay;

      if (p.life <= 0) {
        matchParticles.splice(i, 1);
        continue;
      }

      matchSparksCtx.save();
      matchSparksCtx.globalAlpha = p.life;
      matchSparksCtx.fillStyle = p.color;
      matchSparksCtx.shadowBlur = 8;
      matchSparksCtx.shadowColor = '#ff8c00';
      matchSparksCtx.beginPath();
      matchSparksCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      matchSparksCtx.fill();
      matchSparksCtx.restore();
    }

    if (matchParticles.length > 0) {
      sparksAnimId = requestAnimationFrame(renderSparksLoop);
    } else {
      sparksAnimId = null;
    }
  }

  function igniteMatchAction(userPhysicalStrike = false) {
    if (matchStriken) return;
    matchStriken = true;

    // Sound FX: energetic match ignition
    soundFx.matchIgnite();
    if (navigator.vibrate) navigator.vibrate([30, 50, 90]);

    if (letterInstructionText) {
      letterInstructionText.innerHTML = '🔥 Match Ignited! Melting the Royal Wax Seal...';
      letterInstructionText.style.color = '#f59e0b';
    }

    // Flash light & confetti spark burst
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.42 },
      colors: ['#ff4500', '#f59e0b', '#ffd700', '#ffffff']
    });

    if (matchFlame) matchFlame.style.display = 'block';
    if (matchHead) {
      matchHead.style.boxShadow = '0 0 25px #ff5722, 0 0 50px #ff9800';
    }

    // Glides burning matchstick down to the wax seal stamp on the envelope
    gsap.to(matchStick, {
      y: 78,
      x: 20,
      rotation: -12,
      duration: 0.65,
      ease: 'power2.inOut',
      onComplete: () => {
        // Wax sizzles and melts
        soundFx.waxSizzle();
        if (waxSealStamp) waxSealStamp.classList.add('burned');

        // Envelope fiery burn mask reveals burning hole
        if (envelopeBurnMask) {
          envelopeBurnMask.style.display = 'block';
          gsap.fromTo(envelopeBurnMask,
            { scale: 0.2, opacity: 0 },
            { scale: 1.3, opacity: 1, duration: 0.8, ease: 'power2.out' }
          );
        }

        setTimeout(() => {
          // Flame disappears and wax seal dissolves
          if (matchFlame) matchFlame.style.display = 'none';
          if (waxSealWrapper) waxSealWrapper.style.display = 'none';
          if (matchStick) gsap.to(matchStick, { opacity: 0, duration: 0.35 });
          if (envelopeBurnMask) gsap.to(envelopeBurnMask, { opacity: 0, duration: 0.5 });

          // Unfurl the Sacred Letter
          if (parchmentLetter) {
            parchmentLetter.classList.add('visible');
            gsap.fromTo(parchmentLetter,
              { opacity: 0, y: 35, scale: 0.94 },
              { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' }
            );
          }

          if (letterInstructionText) {
            letterInstructionText.innerHTML = '✨ Royal seal melted. Read our sacred confession below ♡';
            letterInstructionText.style.color = '#34d399';
          }

          // Auto-advance safety timer after comfortable reading time (35s)
          if (letterTimer) clearTimeout(letterTimer);
          letterTimer = setTimeout(() => {
            if (currentScene === 7) goToScene(8);
          }, 35000);
        }, 750);
      }
    });
  }

  // Bind physical pointer/touch rubbing on matchstick & striker
  function handlePointerDown(e) {
    if (matchStriken) return;
    isRubbingMatch = true;
    lastRubX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    lastRubTime = performance.now();
    initSparksCanvas();
  }

  function handlePointerMove(e) {
    if (!isRubbingMatch || matchStriken) return;
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const now = performance.now();
    const dx = clientX - lastRubX;
    const dt = Math.max(1, now - lastRubTime);
    const velocity = Math.abs(dx) / dt;

    if (Math.abs(dx) > 3) {
      // Move matchstick relative to rubbing
      const clampX = Math.max(-25, Math.min(65, dx * 0.8));
      gsap.to(matchStick, { x: clampX, duration: 0.08, overwrite: 'auto' });

      // If velocity is fast enough, emit sparks and scrape sound
      if (velocity > 0.12) {
        frictionScore += Math.abs(dx) * 1.25;
        soundFx.matchFriction();
        if (navigator.vibrate) navigator.vibrate(10);

        const stripRect = matchStrikerStrip?.getBoundingClientRect();
        const headRect = matchHead?.getBoundingClientRect();
        if (stripRect && headRect && matchSparksCanvas) {
          const sparkX = headRect.left - stripRect.left + 10;
          emitFrictionSparks(sparkX, 22, 10);
        }

        // Match head glows hotter
        if (matchHead) {
          const glowIntensity = Math.min(20, frictionScore * 0.22);
          matchHead.style.filter = `drop-shadow(0 0 ${glowIntensity}px #ff5722) brightness(${1 + frictionScore * 0.009})`;
        }
      }

      lastRubX = clientX;
      lastRubTime = now;

      // Ignition threshold reached!
      if (frictionScore >= 90) {
        isRubbingMatch = false;
        igniteMatchAction(true);
      }
    }
  }

  function handlePointerUp() {
    isRubbingMatch = false;
    if (!matchStriken && matchStick) {
      gsap.to(matchStick, { x: 0, duration: 0.25, ease: 'power2.out' });
      if (matchHead) matchHead.style.filter = '';
    }
  }

  if (matchStick) {
    matchStick.addEventListener('pointerdown', handlePointerDown);
    matchStick.addEventListener('touchstart', handlePointerDown, { passive: true });
  }
  if (matchStrikerStrip) {
    matchStrikerStrip.addEventListener('pointerdown', handlePointerDown);
    matchStrikerStrip.addEventListener('touchstart', handlePointerDown, { passive: true });
  }
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('touchmove', handlePointerMove, { passive: true });
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('touchend', handlePointerUp);

  // Quick button tap triggers full realistic stroke and ignition
  btnStrikeMatch?.addEventListener('click', () => {
    if (matchStriken) return;
    initSparksCanvas();
    // Friction stroke 1
    soundFx.matchFriction();
    emitFrictionSparks(50, 20, 12);
    gsap.to(matchStick, {
      x: 35,
      duration: 0.14,
      ease: 'power1.in',
      onComplete: () => {
        // Friction stroke 2
        soundFx.matchFriction();
        emitFrictionSparks(110, 20, 16);
        gsap.to(matchStick, {
          x: 10,
          duration: 0.12,
          ease: 'power1.out',
          onComplete: () => {
            igniteMatchAction(false);
          }
        });
      }
    });
  });

  btnLetterNextLanterns?.addEventListener('click', () => {
    goToScene(8);
  });

  function startMatchLetter() {
    initSparksCanvas();
    // Hint pulse if unattended
    if (!matchStriken) {
      if (letterTimer) clearTimeout(letterTimer);
      letterTimer = setTimeout(() => {
        if (currentScene === 7 && !matchStriken && btnStrikeMatch) {
          gsap.to(btnStrikeMatch, { scale: 1.08, repeat: 3, yoyo: true, duration: 0.3 });
        }
      }, 5000);
    }
  }

  // =========================================================================
  // ACT VIII: TWILIGHT SKY LANTERNS (THREE.JS WEBGL + RELEASE)
  // =========================================================================
  const btnReleaseMoreLanterns = container.querySelector('#btnReleaseMoreLanterns');
  const lanternField = container.querySelector('#floatingLanternField');

  function spawnOneLantern() {
    if (!lanternField) return;
    const l = document.createElement('div');
    l.className = 'twilight-lantern';
    const startX = Math.random() * 85 + 5;
    const duration = Math.random() * 5 + 7;
    const scale = Math.random() * 0.4 + 0.8;
    l.style.left = `${startX}%`;
    l.style.transform = `scale(${scale})`;
    l.style.animationDuration = `${duration}s`;
    l.innerHTML = `
      <div class="lantern-paper"><span class="lantern-heart">♡</span></div>
      <div class="lantern-flame"></div>
    `;
    lanternField.appendChild(l);
    setTimeout(() => { if (typeof l?.remove === 'function') l.remove(); }, duration * 1000);
  }

  function spawnLanternBatch(count = 4) {
    for (let i = 0; i < count; i++) setTimeout(spawnOneLantern, i * 350);
  }

  function startLanternsStage() {
    if (master3D) master3D.releaseLanterns(6);
    spawnLanternBatch(4);
    // Auto-advance to Chapter IX (Treaty) after 8s
    if (lanternsTimer) clearTimeout(lanternsTimer);
    lanternsTimer = setTimeout(() => {
      if (currentScene === 8) goToScene(9);
    }, 8500);
  }

  btnReleaseMoreLanterns?.addEventListener('click', () => {
    soundFx.sparkle();
    if (navigator.vibrate) navigator.vibrate(20);
    spawnLanternBatch(6);
    if (master3D) master3D.releaseLanterns(6);
  });

  // =========================================================================
  // ACT IX: SACRED TREATY OF DEVOTION & DIGITAL SIGNATURE
  // =========================================================================
  const sigCanvas = container.querySelector('#treatySignatureCanvas');
  const sigWatermark = container.querySelector('#sigWatermark');
  const btnClearTreatySig = container.querySelector('#btnClearTreatySig');
  const btnAffixTreaty = container.querySelector('#btnAffixTreaty');
  const goldenWaxStamp = container.querySelector('#goldenWaxStamp');
  const signatureStatusBadge = container.querySelector('#signatureStatusBadge');
  const masterpieceThankYouCard = container.querySelector('#masterpieceThankYouCard');
  const btnWatchAgainMasterpiece = container.querySelector('#btnWatchAgainMasterpiece');

  let isDrawingSig = false;
  let hasSignedTreaty = false;
  let isTreatyAffixed = false;
  let sigCtx = null;

  function setupSignatureCanvas() {
    if (!sigCanvas) return;
    sigCtx = sigCanvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = sigCanvas.getBoundingClientRect();
    const w = rect.width || 440;
    const h = rect.height || 140;

    sigCanvas.width = w * dpr;
    sigCanvas.height = h * dpr;
    sigCtx.scale(dpr, dpr);

    sigCtx.strokeStyle = '#f59e0b';
    sigCtx.lineWidth = 3.2;
    sigCtx.lineCap = 'round';
    sigCtx.lineJoin = 'round';
    sigCtx.shadowColor = 'rgba(245, 158, 11, 0.75)';
    sigCtx.shadowBlur = 6;
  }

  function getSigPos(e) {
    const rect = sigCanvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function startSigDraw(e) {
    if (isTreatyAffixed || !sigCtx) return;
    if (e.type === 'touchstart') e.preventDefault();
    isDrawingSig = true;
    hasSignedTreaty = true;
    if (sigWatermark) sigWatermark.style.opacity = '0';
    const pos = getSigPos(e);
    sigCtx.beginPath();
    sigCtx.moveTo(pos.x, pos.y);
  }

  function doSigDraw(e) {
    if (!isDrawingSig || isTreatyAffixed || !sigCtx) return;
    if (e.type === 'touchmove') e.preventDefault();
    const pos = getSigPos(e);
    sigCtx.lineTo(pos.x, pos.y);
    sigCtx.stroke();
  }

  function endSigDraw() {
    isDrawingSig = false;
  }

  if (sigCanvas) {
    sigCanvas.addEventListener('mousedown', startSigDraw);
    sigCanvas.addEventListener('mousemove', doSigDraw);
    window.addEventListener('mouseup', endSigDraw);
    sigCanvas.addEventListener('touchstart', startSigDraw, { passive: false });
    sigCanvas.addEventListener('touchmove', doSigDraw, { passive: false });
    sigCanvas.addEventListener('touchend', endSigDraw);
  }

  btnClearTreatySig?.addEventListener('click', () => {
    if (isTreatyAffixed || !sigCtx) return;
    sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    hasSignedTreaty = false;
    if (sigWatermark) sigWatermark.style.opacity = '0.6';
    soundFx.pop(450);
  });

  btnAffixTreaty?.addEventListener('click', () => {
    if (isTreatyAffixed) return;
    isTreatyAffixed = true;

    soundFx.celebrate();
    if (navigator.vibrate) navigator.vibrate([40, 80, 50, 100]);

    if (goldenWaxStamp) goldenWaxStamp.classList.add('stamped');
    if (signatureStatusBadge) signatureStatusBadge.style.display = 'block';
    btnAffixTreaty.innerHTML = '✨ Royal Treaty Officially Affixed &amp; Sealed! 💍';
    btnAffixTreaty.disabled = true;

    confetti({
      particleCount: 140,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#f43f5e', '#ffffff', '#fbbf24']
    });

    if (masterpieceThankYouCard) {
      masterpieceThankYouCard.style.display = 'block';
      gsap.fromTo(masterpieceThankYouCard,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' }
      );
    }
  });

  // =========================================================================
  // ACT X: HEARTFELT THANK YOU & CLEAN REWATCH OPTION
  // =========================================================================
  btnWatchAgainMasterpiece?.addEventListener('click', () => {
    clearAllSceneTimers();
    chime(650, 850);
    soundFx.whoosh();
    if (navigator.vibrate) navigator.vibrate([25, 45, 25]);

    // 1. Reset all state flags
    isTreatyAffixed = false;
    hasSignedTreaty = false;
    matchStriken = false;
    currentMilestoneIdx = 0;
    activeConstIdx = 0;

    if (sigCtx && sigCanvas) {
      sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    }
    if (sigWatermark) sigWatermark.style.opacity = '0.6';
    if (goldenWaxStamp) goldenWaxStamp.classList.remove('stamped');
    if (signatureStatusBadge) signatureStatusBadge.style.display = 'none';
    if (btnAffixTreaty) {
      btnAffixTreaty.innerHTML = '💍 Affix Royal Seal &amp; Sign Treaty';
      btnAffixTreaty.disabled = false;
    }
    if (waxSealStamp) waxSealStamp.classList.remove('burned');
    if (matchFlame) matchFlame.style.display = 'none';
    if (waxSealWrapper) waxSealWrapper.style.display = 'flex';
    if (parchmentLetter) parchmentLetter.classList.remove('visible');
    if (matchStick) {
      matchStick.style.opacity = '1';
      matchStick.style.transform = 'none';
    }
    if (matchHead) matchHead.style.filter = '';
    if (envelopeBurnMask) {
      envelopeBurnMask.style.display = 'none';
      envelopeBurnMask.style.opacity = '0';
    }
    if (letterInstructionText) {
      letterInstructionText.innerHTML = '⇄ Rub or drag the matchstick across the striker to ignite the flame &amp; melt the wax seal 🔥';
      letterInstructionText.style.color = '';
    }
    frictionScore = 0;
    isRubbingMatch = false;

    // 2. Hide all fullscreen scenes
    container.querySelectorAll('.romance-fullscreen-scene').forEach(sc => {
      sc.classList.remove('active');
      sc.style.display = 'none';
      gsap.set(sc, { opacity: 0 });
    });

    // 3. Fullscreen transition back to Scene 1 (Gate)
    goToScene(1);

    // 4. Rewind audio to 0:00 and autoplay
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().then(() => {
        setPlaying(true);
        updateCassetteState(true);
      }).catch(() => {});
    }
  });  // =========================================================================
  // ACT X: HEARTFELT THANK YOU & CLEAN REWATCH OPTION
  // =========================================================================
  btnWatchAgainMasterpiece?.addEventListener('click', () => {
    chime(650, 850);
    soundFx.whoosh();
    if (navigator.vibrate) navigator.vibrate([25, 45, 25]);

    // 1. Reset all state flags
    isTreatyAffixed = false;
    hasSignedTreaty = false;
    matchStriken = false;
    currentMilestoneIdx = 0;
    activeConstIdx = 0;

    if (sigCtx && sigCanvas) {
      sigCtx.clearRect(0, 0, sigCanvas.width, sigCanvas.height);
    }
    if (sigWatermark) sigWatermark.style.opacity = '0.6';
    if (goldenWaxStamp) goldenWaxStamp.classList.remove('stamped');
    if (signatureStatusBadge) signatureStatusBadge.style.display = 'none';
    if (btnAffixTreaty) {
      btnAffixTreaty.innerHTML = '💍 Affix Royal Seal &amp; Sign Treaty';
      btnAffixTreaty.disabled = false;
    }
    if (waxSealStamp) waxSealStamp.classList.remove('burned');
    if (matchFlame) matchFlame.style.display = 'none';
    if (waxSealWrapper) waxSealWrapper.style.display = 'flex';
    if (parchmentLetter) parchmentLetter.classList.remove('visible');
    if (matchStick) {
      matchStick.style.opacity = '1';
      matchStick.style.transform = 'none';
    }
    if (matchHead) matchHead.style.filter = '';
    if (envelopeBurnMask) {
      envelopeBurnMask.style.display = 'none';
      envelopeBurnMask.style.opacity = '0';
    }
    if (letterInstructionText) {
      letterInstructionText.innerHTML = '⇄ Rub or drag the matchstick across the striker to ignite the flame &amp; melt the wax seal 🔥';
      letterInstructionText.style.color = '';
    }
    frictionScore = 0;
    isRubbingMatch = false;

    // 2. Hide all fullscreen scenes
    container.querySelectorAll('.romance-fullscreen-scene').forEach(sc => {
      sc.classList.remove('active');
      sc.style.display = 'none';
      gsap.set(sc, { opacity: 0 });
    });

    // 3. Fullscreen transition back to Scene 1 (Gate)
    goToScene(1);

    // 4. Rewind audio to 0:00 and autoplay
    if (audioEl) {
      audioEl.currentTime = 0;
      audioEl.play().then(() => {
        setPlaying(true);
        updateCassetteState(true);
      }).catch(() => {});
    }

    // 5. Celebratory Confetti
    confetti({
      particleCount: 85,
      spread: 90,
      origin: { y: 0.45 },
      colors: ['#ff758c', '#ff7eb3', '#ffffff', '#fbbf24']
    });
  });

  return function cleanup() {
    window.removeEventListener('resize', onResize);
    try { treeStop(); } catch (_) {}
    try { stopBeat(); } catch (_) {}
    if (filmTL) try { filmTL.kill(); } catch (_) {}
    if (audioEl) try { audioEl.pause(); } catch (_) {}
    try { destroyLenisScroll(); } catch (_) {}
    if (constRafId) cancelAnimationFrame(constRafId);
    if (zoomInstance) {
      try { zoomInstance.detach(); } catch (_) {}
    }
    if (threeLanternsSky) {
      try { threeLanternsSky.destroy(); } catch (_) {}
    }
    if (master3D) {
      try { master3D.destroy(); } catch (_) {}
    }
  };
}
