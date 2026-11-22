// src/viewer/templates/bestieGirlTemplate.js - The Viral Blossom Girl Bestie / Soul Sister Experience

import { renderBlossomTemplate } from './blossomTemplate.js';

export function renderBestieGirlTemplate(container, initialData = {}, isMakerReview = false) {
  const girlData = {
    recipientName: "My Bestie",
    senderName: "Your Soul Sister",
    passcode: "1234",
    audioSrc: "/audio/blossom_song.mp3",
    audioTitle: "Bestie Forever Soundtrack",
    audioSubtitle: "SOUL SISTER VIBES",
    blossomPrompt: "Touch our friendship charm 🌸",
    keypadTitle: "Bestie Security Check 🔐",
    keypadSubtitle: "Enter our secret code",
    introHeading: "Hey Gorgeous ✨",
    introLine1: "We do crazy, unhinged things together every day...",
    introLine2: "So I made this special website just for you.",
    cupidPrompt: "Bestie Love Shot 🏹🌸",
    cupidHint: "Aim for my heart, soul sister...",
    flamePrompt: "Touch the sparkler to light up our memories ✨",
    cakeHeadline: "Happy Birthday to My Bestie! 🎂",
    cakeSubtext: "Make a wish and tap the candles ✨",
    memoriesHeading: "CRAZY BESTIE MEMORIES",
    memoriesSubtitle: "Swipe the cards ✨",
    treePrompt: "The Bestie Wishing Tree 🌸",
    treeSub: "Tap the glowing blossoms to reveal secret whispers...",
    loveWhispers: [
      "You are the sister I got to choose 👯‍♀️",
      "Thank you for laughing at all my terrible jokes 😂",
      "Late night iced coffee runs forever ☕",
      "Always your #1 hype woman and cheerleader 👑",
      "I would help you hide a body, no questions asked 🤫",
      "To a lifetime of luxury, peace and unstoppable laughs 🥂"
    ],
    cards: [
      { image: "/images/sunset.jpg", caption: "Sunset gossips & iced coffee runs ☕🌅" },
      { image: "/images/always_you.jpg", caption: "Laughing so hard our stomachs hurt 😂" },
      { image: "/images/pretty.jpg", caption: "Serving absolute main character energy 💅" },
      { image: "/images/dream_girl.jpg", caption: "Partners in crime through everything 👯‍♀️" },
      { image: "/images/queen.jpg", caption: "Forever my favorite human in the world 👑" }
    ],
    lampPrompt: "DRAG THE FAIRY LIGHT STRING DOWN",
    constellationTitle: "Besties Under The Stars ✨",
    scratchTitle: "Secret Bestie VIP Pass 🎟️",
    scratchSub: "Scratch with your finger to reveal your surprise!",
    scratchPrize: "LIFETIME BESTIE PASS: 24/7 Venting, Emergency Boba & Matching Bail Money ♡",
    letterPrompt: "A Letter For My Soul Sister",
    letterSubprompt: "Tap the envelope to unseal",
    letterModalTitle: "Happy Birthday Bestie ✨",
    letterModalSub: "For my soul sister ♡",
    letterBody: `Happiest Birthday to my favorite girl! 🧚‍♀️💖

I honestly don’t know what I would do without our 2 AM rants, emergency outfit approvals, and laughing at things nobody else finds funny.

You are the sister I got to choose. Thank you for always listening, never judging, and being the warmest, brightest light in my life.

I hope this year brings you all the happiness, luxury, peace, and dreams you truly deserve. You are the main character and don’t you ever forget it! 🥰

I love you endlessly, my soul sister! 🫂🧿✨`,
    ...initialData
  };

  renderBlossomTemplate(container, girlData, isMakerReview);

  // Apply girl bestie pastel theme
  const appViewport = container.querySelector('.blossom-app-viewport');
  if (appViewport) {
    appViewport.classList.add('bestie-girl-theme');
  }
}
