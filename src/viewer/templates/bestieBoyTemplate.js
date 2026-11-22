// src/viewer/templates/bestieBoyTemplate.js - The Viral Blossom Bro Bestie / Ride-or-Die Experience

import { renderBlossomTemplate } from './blossomTemplate.js';

export function renderBestieBoyTemplate(container, initialData = {}, isMakerReview = false) {
  const boyData = {
    recipientName: "Bhai / My Guy",
    senderName: "Your Bro",
    passcode: "1234",
    audioSrc: "/audio/blossom_song.mp3",
    audioTitle: "Brotherhood Anthem",
    audioSubtitle: "RIDE OR DIE ⚡",
    blossomPrompt: "Fist bump to unlock the bro vault 👊⚡",
    keypadTitle: "Bro-Code Security Vault 🛡️",
    keypadSubtitle: "Only real ones enter",
    introHeading: "Yo Brother 👑",
    introLine1: "No cringe emotional speeches, you already know what it is...",
    introLine2: "I built this legendary website just for you, my guy.",
    cupidPrompt: "Bro Strike 🏹⚡",
    cupidHint: "Aim for the target, my brother...",
    flamePrompt: "Touch the lighter flame to ignite 🔥",
    cakeHeadline: "Happy Birthday to My Brother! 🎂",
    cakeSubtext: "Make a wish and blow out the candles 👑",
    memoriesHeading: "LEGENDARY BRO MEMORIES",
    memoriesSubtitle: "Swipe the cards ✨",
    treePrompt: "The Brotherhood Pillar ⚡",
    treeSub: "Tap the glowing badges to reveal brotherhood code...",
    loveWhispers: [
      "Ride or die forever, no matter what 🏍️",
      "Brothers by choice, legends by birth 👑",
      "Always having each other's back through every storm 🛡️",
      "Unstoppable co-op duo in gaming and life 🎮",
      "Ready to ride at 3 AM with zero questions asked 🦅",
      "To 100 more years of crazy adventures and big wins 🍻"
    ],
    cards: [
      { image: "/images/sunset.jpg", caption: "Late night drives & deep life talks 🚗💨" },
      { image: "/images/always_you.jpg", caption: "Surviving chaos together since day one ⚡" },
      { image: "/images/dream_girl.jpg", caption: "Epic gaming sessions until 4 AM 🎮" },
      { image: "/images/pretty.jpg", caption: "Brothers by choice, legends by birth 👑" },
      { image: "/images/queen.jpg", caption: "To 100 more years of crazy adventures 🍻" }
    ],
    lampPrompt: "PULL DOWN THE TACTICAL NEON SWITCH",
    constellationTitle: "Brothers Under The Stars ⚡",
    scratchTitle: "Official Bro-Code VIP Pass 🎟️",
    scratchSub: "Scratch with your finger to reveal your prize!",
    scratchPrize: "LIFETIME WINGMAN PASS: 3AM Emergency Ride, Zero Questions Asked & Unconditional Loyalty 👊",
    letterPrompt: "Brotherhood Letter, Just For You",
    letterSubprompt: "Tap the seal to unlock",
    letterModalTitle: "Happy Birthday, My Brother 👑",
    letterModalSub: "Ride or Die Forever ⚡",
    letterBody: `Happiest Birthday, my brother! 👑🎂

People come and go, but having a brother who always has your back through every high and low is the rarest blessing in this world.

From late-night drives and gaming grinds to pushing each other to level up in life — thank you for being the most genuine, loyal guy I know.

I pray this year brings you unstoppable success, big money, peace, and everything you are grinding for.

Brothers for life, no matter where life takes us. Ride or die forever! 👊🔥🧿`,
    ...initialData
  };

  renderBlossomTemplate(container, boyData, isMakerReview);

  // Apply cool cyber neon bro theme
  const appViewport = container.querySelector('.blossom-app-viewport');
  if (appViewport) {
    appViewport.classList.add('bestie-boy-theme');
  }
}
