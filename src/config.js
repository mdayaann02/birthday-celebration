// src/config.js - Default configuration and state management for Birthday Website

export const DEFAULT_CONFIG = {
  general: {
    recipientName: "My Love",
    age: "15",
    themeColor: "#ff4d6d",
    audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
    audioSubtitle: "ROMANTIC SOUNDTRACK",
    audioSrc: "/audio/alfaaz.mp3",
    heroTitle: "Happy Birthday",
    heroSubtitle: "To the most special girl in my universe ✨"
  },
  
  photoRibbon: [
    { url: "/images/sunset.jpg", caption: "Golden Hour Glow" },
    { url: "/images/always_you.jpg", caption: "Every Moment With You" },
    { url: "/images/vogue_cover.jpg", caption: "Main Character Energy" },
    { url: "/images/beautiful.jpg", caption: "That Heart Melting Smile" },
    { url: "/images/pretty.jpg", caption: "Grace In Every Move" },
    { url: "/images/dream_girl.jpg", caption: "Living In A Dream" },
    { url: "/images/baddie.jpg", caption: "Confidence & Charm" },
    { url: "/images/queen.jpg", caption: "Forever My Queen" }
  ],

  polaroids: [
    {
      id: 1,
      title: "Baddie 😎",
      image: "/images/baddie.jpg",
      angle: -4,
      noteBadge: "N° 01",
      note: "You have that effortless aura and confidence that turns heads everywhere you go. Keep ruling the world, rockstar! 🌟"
    },
    {
      id: 2,
      title: "Always You 🫶",
      image: "/images/always_you.jpg",
      angle: 3,
      noteBadge: "N° 02",
      note: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶"
    },
    {
      id: 3,
      title: "Pretty ✨",
      image: "/images/pretty.jpg",
      angle: -2,
      noteBadge: "N° 03",
      note: "No camera or poetry in this world can ever truly capture how breathtaking you look when you're just being yourself. 🌸"
    },
    {
      id: 4,
      title: "Beautiful 🌸",
      image: "/images/beautiful.jpg",
      angle: 5,
      noteBadge: "N° 04",
      note: "Your heart is even more beautiful than your radiant smile, and that's saying a lot because your smile is pure sunshine. ☀️"
    },
    {
      id: 5,
      title: "Dream Girl 💫",
      image: "/images/dream_girl.jpg",
      angle: -5,
      noteBadge: "N° 05",
      note: "Before I met you, I thought perfection only existed in storybooks. You proved fairy tales can be real. 💖"
    },
    {
      id: 6,
      title: "Queen 👑",
      image: "/images/queen.jpg",
      angle: 2,
      noteBadge: "N° 06",
      note: "May you always wear your invisible crown with dignity, happiness, and all the love you deserve today and forever. 👑"
    }
  ],

  magazine: {
    coverTag: "SWEET SIXTEEN EDITION",
    vogueTitle: "VOGUE",
    issueText: "SPECIAL BIRTHDAY ISSUE",
    coverImage: "/images/vogue_cover.jpg",
    chapterTitle: "CHAPTER 01",
    chapterHeading: "THINGS ABOUT YOU",
    chapterSubheading: "GET TO KNOW MY SWEETEST GIRL & THE LOVE OF MY LIFE",
    editorialQuote: "Being with you makes every ordinary day feel like the sweetest dream come true.",
    editorialPhoto: "/images/sunset.jpg",
    reasons: [
      { num: "01", title: "MESMERIZING EYES", desc: "A single glance from you makes time stand completely still." },
      { num: "02", title: "SWEETEST SMILE", desc: "Lights up even my darkest days with pure warmth and light." },
      { num: "03", title: "GRACEFUL DANCER", desc: "Movement filled with poise, poetry, and effortless elegance." },
      { num: "04", title: "TRADITIONAL CHARM", desc: "Unmatched elegance and grace every time you dress traditionally." },
      { num: "05", title: "PURE HEART", desc: "Genuinely caring, deeply compassionate, and kind to everyone." },
      { num: "06", title: "INFECTIOUS LAUGH", desc: "That cute laugh that makes everyone around you instantly happy." },
      { num: "07", title: "MY SAFE PLACE", desc: "Where I can drop all pretenses and simply be my true self." },
      { num: "08", title: "UNMATCHED STYLE", desc: "Always effortlessly chic, turning ordinary moments into runaway looks." },
      { num: "09", title: "SOOTHING VOICE", desc: "Hearing you talk brings immediate peace to my most chaotic days." },
      { num: "10", title: "MY FOREVER CRUSH", desc: "Falling for you deeper and more authentically with each passing day." },
      { num: "11", title: "PURE MAGIC", desc: "Transforming small mundane moments into lifelong cherished memories." },
      { num: "12", title: "FOREVER MINE", desc: "The greatest blessing and the most beautiful chapter in my life." }
    ]
  },

  scratchCard: {
    badge: "WISHING YOU THE BEST DAY 💛",
    title: "Happy Birthday",
    subtitle: "To the most beautiful soul, may your year ahead shine as brightly as your smile.",
    hiddenSecret: "You are truly one of a kind. Thank you for filling every single day with happiness and love! 🎂🎉✨"
  },

  vipLanyard: {
    badgeType: "ALL-ACCESS VIP PASS",
    recipient: "SPECIAL VIP",
    edition: "BIRTHDAY EDITION 2026",
    photo: "/images/always_you.jpg",
    accessLevel: "LEVEL: UNLIMITED LOVE & HAPPINESS",
    barcodeNum: "SW-BDAY-2026-9999"
  },

  phoneChat: {
    time: "7:25 PM",
    contactName: "My Love ❤️",
    contactStatus: "iMessage • online now",
    avatar: "/images/dream_girl.jpg",
    messages: [
      { sender: "them", text: "Happppyeeee birthday! ❤️🎂", time: "7:25 PM" },
      { sender: "them", text: "ik last bday pr ek problem hogyi thi isliye ye wala bilkul special banaya! 🎁✨", time: "7:26 PM" },
      { sender: "them", text: "Hope this brings the biggest smile to your face today! 🥰", time: "7:26 PM" }
    ]
  }
};

const STORAGE_KEY = "birthday_website_config_v1";

export function loadConfig() {
  // 1. Check URL hash for shared configuration
  try {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#data=")) {
      const encoded = hash.substring(6);
      const jsonStr = decodeURIComponent(escape(atob(encoded)));
      const parsed = JSON.parse(jsonStr);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn("Failed to parse URL hash config:", err);
  }

  // 2. Check localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_CONFIG, ...parsed };
    }
  } catch (err) {
    console.warn("Failed to load from localStorage:", err);
  }

  return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
}

export function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (err) {
    console.error("Failed to save config:", err);
    return false;
  }
}

export function resetConfig() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    // clear hash if any
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    return JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  } catch (err) {
    console.error("Failed to reset config:", err);
    return DEFAULT_CONFIG;
  }
}

export function generateShareableUrl(config) {
  try {
    const jsonStr = JSON.stringify(config);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    return `${window.location.origin}${window.location.pathname}#data=${encoded}`;
  } catch (err) {
    console.error("Failed to generate share URL:", err);
    return window.location.href;
  }
}
