// src/viewer/templates/birthdayTemplate.js - Dynamic Persona-Adaptive Birthday Celebration Viewer (Page-By-Page Experience)

import confetti from 'canvas-confetti';
import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initHeroSection } from '../../components/heroSection.js';
import { initPhotoRibbon } from '../../components/photoRibbon.js';
import { initPolaroidWall } from '../../components/polaroidWall.js';
import { initFlipBook } from '../../components/flipBook.js';
import { initScratchCard } from '../../components/scratchCard.js';
import { initVipLanyard } from '../../components/vipLanyard.js';
import { initPhoneChat } from '../../components/phoneChat.js';

export function renderBirthdayTemplate(container, data) {
  const recipientName = data.recipientName || "My Special One";

  // Dynamic Persona Presets (Adapts themes, titles, quotes, badges & secrets based on recipient)
  const PERSONAS = {
    bestfriend_female: {
      id: "bestfriend_female",
      name: "Bestie Girl",
      icon: "👯‍♀️",
      themeClass: "bday-theme-bestfriend_female",
      heroBadge: "SOUL SISTER FOR LIFE 👯‍♀️💅",
      heroTitle: data.heroTitle || `Happy Birthday to My Girl Bestie! 👯‍♀️💅`,
      heroSubtitle: data.heroSubtitle || "To my partner-in-crime, 2 AM therapist & favorite human in the universe ✨",
      vogueTitle: "SOUL SISTER",
      coverTag: "SWEET BESTIE EDITION",
      chapterHeading: `MEMORIES WITH ${recipientName.toUpperCase()}`,
      chapterSubheading: "UNFILTERED SECRETS & 2 AM LIFE TALKS",
      editorialQuote: data.magazine?.quote || "You are the sister I got to choose. Life without our chaotic laughs would be so boring! 💅",
      scratchBadge: "FOR MY FAVORITE HUMAN 💖",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "To the main character who lights up every room she walks into ✨",
      scratchSecret: "You are irreplaceable! Unlimited iced coffee & emergency gossip passes for life! ☕✨",
      lanyardBadge: "SOUL SISTER VIP PASS",
      lanyardAccess: "LEVEL: MAIN CHARACTER PRIVILEGES",
      contactName: `${recipientName} 💅💖`,
      defaultChat: [
        "HAPPY BIRTHDAY MY GORGEOUS BESTIE! 🎂💖",
        "I literally don't know what I would do without our 2 AM rants! 😭✨",
        "Getting ready to celebrate you all night long! Serving main character energy! 🥂💅"
      ]
    },

    bestfriend: {
      id: "bestfriend",
      name: "Best Friend",
      icon: "🤜🤛",
      themeClass: "bday-theme-bestfriend",
      heroBadge: "THE LIVING LEGEND 🤜🤛👑",
      heroTitle: data.heroTitle || "Happy Birthday Bro! 🤜🤛⚡",
      heroSubtitle: data.heroSubtitle || "To the realest guy I know — brothers by choice, legends by birth!",
      vogueTitle: "BRO CODE",
      coverTag: "LEGEND EDITION",
      chapterHeading: `THE LEGEND OF ${recipientName.toUpperCase()}`,
      chapterSubheading: "UNBREAKABLE BROTHERHOOD & BIG WINS",
      editorialQuote: data.magazine?.quote || "Having a best friend who always has your back through every storm is the rarest gift. Ride or die forever!",
      scratchBadge: "A TOAST TO MY GUY 🍻",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "Here is to another year of conquering goals and making legendary memories.",
      scratchSecret: "To 100 more years of crazy adventures, big wins, and late-night drives! Drinks on me! 🍻🔥",
      lanyardBadge: "RIDE OR DIE BROTHERHOOD",
      lanyardAccess: "LEVEL: BROTHERHOOD FOR LIFE",
      contactName: `${recipientName} 🤜🤛`,
      defaultChat: [
        "Yo happy birthday my brother! 👑🔥",
        "Another year of being absolute legends in everything we do! ⚡",
        "Big celebration tonight, get ready! 🍻"
      ]
    },

    brother: {
      id: "brother",
      name: "Brother",
      icon: "👦",
      themeClass: "bday-theme-brother",
      heroBadge: "BROTHER IN CHAOS 👦🔥",
      heroTitle: data.heroTitle || "Happy Birthday Bhai! 👦🔥",
      heroSubtitle: data.heroSubtitle || "From fighting over the TV remote to standing shoulder-to-shoulder through everything!",
      vogueTitle: "BROTHERHOOD",
      coverTag: "BHAI SPECIAL",
      chapterHeading: `CHRONICLES OF ${recipientName.toUpperCase()}`,
      chapterSubheading: "SURVIVING SIBLING CHAOS TOGETHER",
      editorialQuote: data.magazine?.quote || "No matter how much we roast each other, you're the one person I can always count on without hesitation.",
      scratchBadge: "PROUD OF YOU BHAI 🌟",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "Wishing you unstoppable growth, big money, and supreme happiness.",
      scratchSecret: "You'll always be my partner-in-crime! Keep winning and making us proud! 🤜🤛⚡",
      lanyardBadge: "LEGENDARY BHAI PASS",
      lanyardAccess: "LEVEL: LIFETIME BROTHER SECURITY",
      contactName: `${recipientName} 👦🔥`,
      defaultChat: [
        "Happy Birthday Bhai! 🎂👑",
        "Stop stealing my clothes now that you're an adult 😂",
        "Proud of you always bro! Fist bump forever! 🤜🤛❤️"
      ]
    },

    sister: {
      id: "sister",
      name: "Sister",
      icon: "👧",
      themeClass: "bday-theme-sister",
      heroBadge: "IRREPLACEABLE SISTER 👧✨",
      heroTitle: data.heroTitle || "Happy Birthday Dearest Behna! 👧✨",
      heroSubtitle: data.heroSubtitle || "To my sweet, crazy, irreplaceable sister who makes home feel so lively!",
      vogueTitle: "SISTERHOOD",
      coverTag: "BEHNA EDITION",
      chapterHeading: `ALL ABOUT ${recipientName.toUpperCase()}`,
      chapterSubheading: "WHY YOU ARE ADORED (EVEN WHEN ANNOYING 😂)",
      editorialQuote: data.magazine?.quote || "A sister is both your mirror and your biggest cheerleader. I'm blessed to have you in my corner!",
      scratchBadge: "SWEETEST SISTER 🌸",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "May your day be filled with sweet surprises, laughter, and pure happiness.",
      scratchSecret: "I promise to always protect you and only steal your snacks occasionally! 🥰💖",
      lanyardBadge: "ALL-STAR BEHNA VIP",
      lanyardAccess: "LEVEL: UNCONDITIONAL SISTER LOVE",
      contactName: `${recipientName} 👧💖`,
      defaultChat: [
        "Happy Birthday Behna! 🎂✨",
        "Hope your day is as sweet, fabulous, and dramatic as you are! 💅",
        "Love you always! 🥰"
      ]
    },

    teacher: {
      id: "teacher",
      name: "Teacher / Mentor",
      icon: "🎓",
      themeClass: "bday-theme-teacher",
      heroBadge: "HONORING AN INSPIRING MENTOR 🎓📚",
      heroTitle: data.heroTitle || "Happy Birthday Respected Teacher! 🎓🌟",
      heroSubtitle: data.heroSubtitle || "Thank you for inspiring minds, touching hearts, and illuminating our journey with wisdom.",
      vogueTitle: "MENTOR",
      coverTag: "WISDOM EDITION",
      chapterHeading: `LESSONS FROM ${recipientName.toUpperCase()}`,
      chapterSubheading: "A TRIBUTE TO A MENTOR WHO CHANGED LIVES",
      editorialQuote: data.magazine?.quote || "A truly great teacher inspires hope, ignites the imagination, and instills an eternal love of learning.",
      scratchBadge: "RESPECT & GRATITUDE 🌟",
      scratchTitle: `Happy Birthday ${recipientName}!`,
      scratchSubtitle: "May your year ahead be blessed with health, peace, honor, and deep fulfillment.",
      scratchSecret: "A truly great mentor is hard to find, difficult to part with, and impossible to forget! 📚🍎✨",
      lanyardBadge: "HONORED MENTOR ALL-ACCESS PASS",
      lanyardAccess: "LEVEL: ETERNAL RESPECT & GRATITUDE",
      contactName: `${recipientName} 🎓`,
      defaultChat: [
        "Wishing you a very Happy Birthday, Sir / Ma'am! 🎓🌟",
        "Thank you for your invaluable guidance, patience, and selfless wisdom.",
        "May your year ahead be blessed with health, peace, and boundless joy! 🙏✨"
      ]
    },

    mother: {
      id: "mother",
      name: "Mother (Maa)",
      icon: "👩",
      themeClass: "bday-theme-mother",
      heroBadge: "TO MY QUEEN, MY MAA 🌸👑",
      heroTitle: data.heroTitle || "Happy Birthday to My Queen, Maa! 🌸👑",
      heroSubtitle: data.heroSubtitle || "In your gentle smile lies my entire universe, and in your prayers I find my greatest strength.",
      vogueTitle: "QUEEN",
      coverTag: "MAA SPECIAL",
      chapterHeading: `THE SUPERPOWERS OF ${recipientName.toUpperCase()}`,
      chapterSubheading: "UNCONDITIONAL LOVE, SACRIFICE & WARMTH",
      editorialQuote: data.magazine?.quote || "Maa, no words will ever be enough to thank you for everything you silently do for our happiness.",
      scratchBadge: "ENDLESS LOVE FOR MAA ❤️",
      scratchTitle: `Happy Birthday Maa!`,
      scratchSubtitle: "To the purest soul on earth, may your days be blessed with radiant health and joy.",
      scratchSecret: "May Allah bless you with a hundred years of radiant smiles, health, and endless peace! 🌸🧿",
      lanyardBadge: "QUEEN OF OUR HEARTS VIP",
      lanyardAccess: "LEVEL: INFINITE DEVOTION & GRATITUDE",
      contactName: `${recipientName} 🌸❤️`,
      defaultChat: [
        "Happy Birthday Maa! 🌸👑",
        "You are the heart and soul of our home.",
        "Love you more than words can ever describe! ❤️"
      ]
    },

    father: {
      id: "father",
      name: "Father (Papa)",
      icon: "👨",
      themeClass: "bday-theme-father",
      heroBadge: "TO MY HERO, MY PAPA 🌟🛡️",
      heroTitle: data.heroTitle || "Happy Birthday to My Hero, Papa! 🌟🛡️",
      heroSubtitle: data.heroSubtitle || "A father's quiet strength moves mountains. Thank you for being my rock and greatest shield.",
      vogueTitle: "HERO",
      coverTag: "PAPA SPECIAL",
      chapterHeading: `PILLARS OF STRENGTH - ${recipientName.toUpperCase()}`,
      chapterSubheading: "LESSONS IN INTEGRITY, HONOR & COURAGE",
      editorialQuote: data.magazine?.quote || "A father doesn't just tell you how to live; he lives with quiet integrity and lets you watch him do it.",
      scratchBadge: "PROUDEST CHILD 🌟",
      scratchTitle: `Happy Birthday Papa!`,
      scratchSubtitle: "Thank you for being our family's steady rock and highest inspiration.",
      scratchSecret: "Thank you for working tirelessly through every storm so our future could shine bright, Papa! 🌟🛡️",
      lanyardBadge: "GREATEST HERO VIP PASS",
      lanyardAccess: "LEVEL: ETERNAL RESPECT & HONOR",
      contactName: `${recipientName} 🌟🛡️`,
      defaultChat: [
        "Happy Birthday Papa! 🌟🎂",
        "Thank you for always being our rock, shelter, and greatest pride.",
        "Wishing you health, happiness, and long life always! ❤️"
      ]
    },

    special: {
      id: "special",
      name: "Special Someone",
      icon: "💖",
      themeClass: "bday-theme-special",
      heroBadge: "CELEBRATING A QUEEN 👑✨",
      heroTitle: data.heroTitle || "Happy Birthday",
      heroSubtitle: data.heroSubtitle || "To the most special soul in my universe ✨",
      vogueTitle: data.magazine?.title || "VOGUE",
      coverTag: "SWEET SPECIAL EDITION",
      chapterHeading: `THINGS ABOUT ${recipientName.toUpperCase()}`,
      chapterSubheading: "GET TO KNOW MY SWEETEST GIRL",
      editorialQuote: data.magazine?.quote || "Being with you makes every ordinary day feel like the sweetest dream come true.",
      scratchBadge: "WISHING YOU THE BEST DAY 💛",
      scratchTitle: data.scratchWish?.title || `Happy Birthday ${recipientName}`,
      scratchSubtitle: data.scratchWish?.message || "To the most beautiful soul, may your year ahead shine as brightly as your smile.",
      scratchSecret: "You make this world so much brighter! I love you endlessly! 🎂✨",
      lanyardBadge: "ALL-ACCESS VIP PASS",
      lanyardAccess: "LEVEL: UNLIMITED LOVE & HAPPINESS",
      contactName: `${recipientName} ❤️`,
      defaultChat: [
        "Happppyeeee birthday! ❤️🎂",
        "Hope this brings the biggest smile to your face today! 🥰",
        "I love you more than words can ever say! 💖✨"
      ]
    }
  };

  // Determine starting persona (configured by creator or fallback to special)
  let activePersonaKey = data.recipientPersona || 'special';
  if (!PERSONAS[activePersonaKey]) activePersonaKey = 'special';

  // Build component config for a given persona
  function buildConfigForPersona(key) {
    const p = PERSONAS[key] || PERSONAS.special;

    const polaroidsList = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Baddie 😎", image: "/images/baddie.jpg", note: "You have that effortless aura and confidence that turns heads everywhere! 🌟" },
      { title: "Always You 🫶", image: "/images/always_you.jpg", note: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶" },
      { title: "Pretty ✨", image: "/images/pretty.jpg", note: "No poetry in this world can ever truly capture how breathtaking you look. 🌸" },
      { title: "Beautiful 🌸", image: "/images/beautiful.jpg", note: "Your heart is even more radiant than your smile, and that's saying a lot! ☀️" },
      { title: "Dream Girl 💫", image: "/images/dream_girl.jpg", note: "Before I met you, I thought perfection only existed in storybooks. 💖" },
      { title: "Queen 👑", image: "/images/queen.jpg", note: "May you always wear your invisible crown with happiness, peace, and endless love! 👑" }
    ];

    return {
      general: {
        recipientName: recipientName,
        age: data.age || "15",
        audioTitle: data.audioTitle || "Alfaaz - Hamza Malik & Zain Zohaib",
        audioSubtitle: data.audioSubtitle || "BIRTHDAY PLAYLIST",
        audioSrc: data.audioSrc || "/audio/alfaaz.mp3",
        heroTitle: p.heroTitle,
        heroSubtitle: p.heroSubtitle,
        heroBadge: p.heroBadge
      },
      photoRibbon: polaroidsList.map(item => ({
        url: item.image || item.url || "/images/sunset.jpg",
        caption: item.caption || item.title || "Special Moment"
      })),
      polaroids: polaroidsList.map((item, i) => ({
        id: i + 1,
        title: item.title,
        image: item.image,
        angle: i % 2 === 0 ? -4 : 4,
        noteBadge: `N° 0${i + 1}`,
        note: item.note
      })),
      magazine: {
        coverTag: p.coverTag,
        vogueTitle: p.vogueTitle,
        chapterTitle: "CHAPTER 01",
        chapterHeading: p.chapterHeading,
        chapterSubheading: p.chapterSubheading,
        editorialQuote: p.editorialQuote,
        editorialPhoto: data.magazine?.photo || polaroidsList[0]?.image || "/images/sunset.jpg",
        reasons: (data.magazine?.reasons || [
          "Mesmerizing presence that lifts everyone up",
          "Sweetest smile that melts away worries",
          "Pure heart that genuinely cares",
          "Infectious laughter that brightens every room",
          "Our safest haven and happiest memory",
          "Unconditional love and loyalty"
        ]).map((r, i) => ({
          num: i < 9 ? `0${i+1}` : `${i+1}`,
          title: typeof r === 'string' ? r : (r.title || `Reason ${i+1}`),
          desc: typeof r === 'string' ? "One of the countless reasons why you're adored." : (r.desc || "")
        }))
      },
      scratchCard: {
        badge: p.scratchBadge,
        title: p.scratchTitle,
        subtitle: p.scratchSubtitle,
        hiddenSecret: p.scratchSecret
      },
      vipLanyard: {
        badgeType: p.lanyardBadge,
        recipient: recipientName.toUpperCase(),
        edition: "BIRTHDAY SPECIAL EDITION",
        photo: polaroidsList[1]?.image || polaroidsList[0]?.image || "/images/always_you.jpg",
        accessLevel: p.lanyardAccess,
        barcodeNum: `BDAY-${Date.now().toString().slice(-6)}`
      },
      phoneChat: {
        time: "7:25 PM",
        contactName: p.contactName,
        contactStatus: "iMessage • online now",
        avatar: polaroidsList[0]?.image || "/images/dream_girl.jpg",
        messages: ((data.chatMessages && data.chatMessages.length > 0) ? data.chatMessages : p.defaultChat).map(msg => ({
          sender: "them",
          text: msg,
          time: "7:25 PM"
        }))
      }
    };
  }

  // Initial markup structure
  const personaList = Object.values(PERSONAS);

  container.innerHTML = `
    <!-- Top Audio Player Slot (Kept intact so audio never restarts on theme change) -->
    <div id="tpPlayerSlot"></div>

    <!-- Recipient Persona Theme Switcher Bar -->
    <nav class="bday-persona-switcher-wrap" aria-label="Recipient Persona Theme Switcher">
      <div class="bday-persona-label">
        <span>✨ RECIPIENT THEME:</span>
      </div>
      <div class="bday-persona-pills-track" id="bdayPersonaPillsTrack">
        ${personaList.map(p => `
          <button type="button" class="btn-persona-pill ${p.id === activePersonaKey ? 'active' : ''}" data-persona="${p.id}" title="Switch theme for ${p.name}">
            <span>${p.icon}</span>
            <span>${p.name}</span>
          </button>
        `).join('')}
      </div>
    </nav>

    <!-- Dynamic Theme Container & Page-By-Page Storybook Viewport -->
    <div class="bday-persona-stage bday-storybook-viewport ${PERSONAS[activePersonaKey].themeClass}" id="bdayDynamicStage">
      
      <!-- Stage Progress Bar & Passive Indicator -->
      <header class="bday-floating-nav" style="pointer-events:none; user-select:none;">
        <div class="bday-step-progress-track">
          <div class="bday-step-progress-fill" id="bdayStepProgressFill" style="width: 14.3%;"></div>
        </div>
        <div class="bday-stage-indicator-bar">
          <div class="bday-stage-info-pill">
            <span class="stage-step-tag" id="bdayStageStepPill">PAGE 1 OF 7</span>
            <span class="stage-step-separator">•</span>
            <span class="stage-title-text" id="bdayStageTitleText">The Grand Birthday Opening ✨</span>
          </div>
        </div>
      </header>

      <!-- Multi-Page Content Cards Container -->
      <main class="bday-pages-container" id="bdayPagesContainer">
        <!-- PAGE 1: HERO -->
        <section class="bday-page-card active" data-page="1">
          <div id="tpHeroSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-next" data-next="2">
              <span>Explore Memory Lane 📸</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 2: MEMORIES (RIBBON & POLAROIDS) -->
        <section class="bday-page-card" data-page="2">
          <div id="tpRibbonSlot"></div>
          <div id="tpPolaroidSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="1">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="3">
              <span>Flip Birthday Magazine 📖</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 3: VOGUE / MAGAZINE FLIPBOOK -->
        <section class="bday-page-card" data-page="3">
          <div id="tpFlipSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="2">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="4">
              <span>Scratch Secret Ticket 🎟️</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 4: SCRATCH CARD -->
        <section class="bday-page-card" data-page="4">
          <div id="tpScratchSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="3">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="5">
              <span>Claim VIP Pass 🪪</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 5: VIP LANYARD PASS -->
        <section class="bday-page-card" data-page="5">
          <div id="tpLanyardSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="4">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="6">
              <span>Check Birthday Chat 💬</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 6: IMESSAGE PHONE CHAT -->
        <section class="bday-page-card" data-page="6">
          <div id="tpChatSlot"></div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="5">⬅ Back</button>
            <button type="button" class="btn-bday-next" data-next="7">
              <span>Make a Birthday Wish 🎂</span>
              <span>➔</span>
            </button>
          </div>
        </section>

        <!-- PAGE 7: GRAND CAKE & FINALE -->
        <section class="bday-page-card" data-page="7">
          <div class="bday-finale-card">
            <div class="bday-finale-cake-wrap" id="bdayFinaleCake">
              <span class="bday-cake-emoji">🎂</span>
            </div>
            <div class="bday-cake-tap-hint">✨ TAP THE CAKE TO BLOW CANDLES ✨</div>
            <h2 class="bday-finale-title" id="bdayFinaleHeadline">Happy Birthday, ${recipientName}! 🎉</h2>
            <p class="bday-finale-msg" id="bdayFinaleSubtitle">
              Wishing you a year filled with boundless laughter, wild dreams fulfilled, and infinite blessings! ✨
            </p>
            <button type="button" class="btn-fam-action btn-hug-mom" id="bdayConfettiBurst" style="margin-top:10px; width:100%; max-width:320px;">
              🎆 Tap for Fireworks Shower 🎊
            </button>
          </div>
          <div class="bday-nav-dock">
            <button type="button" class="btn-bday-prev" data-prev="6">⬅ Back</button>
            <button type="button" class="btn-bday-replay" id="btnBdayReplay">
              <span>🎉 Replay from Start ↺</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  `;

  const bdayPageTitles = [
    { num: 1, title: "The Grand Birthday Opening ✨" },
    { num: 2, title: "Memory Lane & Polaroids 📸" },
    { num: 3, title: "Birthday Vogue Magazine 📖" },
    { num: 4, title: "Golden Scratch Secret Ticket 🎟️" },
    { num: 5, title: "All-Access VIP Lanyard Pass 🪪" },
    { num: 6, title: "iMessage Midnight Celebration Chat 💬" },
    { num: 7, title: "Make a Birthday Wish & Cake 🎂" }
  ];

  const totalPages = bdayPageTitles.length;
  let currentPage = 1;

  function goToPage(page) {
    currentPage = Math.max(1, Math.min(totalPages, page));

    // Update Progress Bar
    const progressPct = Math.round((currentPage / totalPages) * 100);
    const fill = container.querySelector('#bdayStepProgressFill');
    if (fill) fill.style.width = `${progressPct}%`;

    // Update Stage Indicator Banner
    const stepPill = container.querySelector('#bdayStageStepPill');
    if (stepPill) stepPill.textContent = `PAGE ${currentPage} OF ${totalPages}`;
    const titleText = container.querySelector('#bdayStageTitleText');
    if (titleText && bdayPageTitles[currentPage - 1]) {
      titleText.textContent = bdayPageTitles[currentPage - 1].title;
    }

    // Update Page View
    container.querySelectorAll('.bday-page-card').forEach(card => {
      card.classList.toggle('active', parseInt(card.getAttribute('data-page')) === currentPage);
    });

    // Smooth scroll to stage top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (navigator.vibrate) navigator.vibrate(15);
  }

  // Bind Next / Prev buttons
  container.querySelectorAll('.btn-bday-next').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = parseInt(btn.getAttribute('data-next'));
      goToPage(next);
    });
  });
  container.querySelectorAll('.btn-bday-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      const prev = parseInt(btn.getAttribute('data-prev'));
      goToPage(prev);
    });
  });

  // Cake blowing & confetti effects in finale
  const finaleCake = container.querySelector('#bdayFinaleCake');
  const btnFireworks = container.querySelector('#bdayConfettiBurst');
  const btnReplay = container.querySelector('#btnBdayReplay');

  function triggerCelebrationConfetti() {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#fbbf24', '#38bdf8', '#c084fc', '#ffffff']
    });
  }

  finaleCake?.addEventListener('click', () => {
    triggerCelebrationConfetti();
    const cakeHint = container.querySelector('.bday-cake-tap-hint');
    if (cakeHint) cakeHint.textContent = "✨ WISH MADE! MAY IT COME TRUE! 🥳🎂";
  });

  btnFireworks?.addEventListener('click', triggerCelebrationConfetti);
  btnReplay?.addEventListener('click', () => goToPage(1));

  // Initialize Audio Player once
  const initialConfig = buildConfigForPersona(activePersonaKey);
  initMusicPlayer(container.querySelector('#tpPlayerSlot'), initialConfig);

  // Render Section Components inside Dynamic Stage
  function renderDynamicSections(cfg) {
    initHeroSection(container.querySelector('#tpHeroSlot'), cfg);
    initPhotoRibbon(container.querySelector('#tpRibbonSlot'), cfg);
    initPolaroidWall(container.querySelector('#tpPolaroidSlot'), cfg);
    initFlipBook(container.querySelector('#tpFlipSlot'), cfg);
    initScratchCard(container.querySelector('#tpScratchSlot'), cfg);
    initVipLanyard(container.querySelector('#tpLanyardSlot'), cfg);
    initPhoneChat(container.querySelector('#tpChatSlot'), cfg);
  }

  // Initial mount
  renderDynamicSections(initialConfig);

  // Bind Persona Switcher Pill clicks
  const pillsTrack = container.querySelector('#bdayPersonaPillsTrack');
  const stage = container.querySelector('#bdayDynamicStage');

  pillsTrack?.querySelectorAll('.btn-persona-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedPersona = btn.getAttribute('data-persona');
      if (selectedPersona === activePersonaKey) return;

      activePersonaKey = selectedPersona;

      // Update Active Pill
      pillsTrack.querySelectorAll('.btn-persona-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-persona') === activePersonaKey);
      });

      // Update Theme Class on Stage
      const p = PERSONAS[activePersonaKey] || PERSONAS.special;
      stage.className = `bday-persona-stage bday-storybook-viewport ${p.themeClass}`;

      // Smooth Fade Transition & Re-render Components
      stage.style.opacity = '0.4';
      stage.style.transform = 'translateY(8px)';
      stage.style.transition = 'opacity 0.25s ease, transform 0.25s ease';

      setTimeout(() => {
        const newCfg = buildConfigForPersona(activePersonaKey);
        renderDynamicSections(newCfg);
        stage.style.opacity = '1';
        stage.style.transform = 'none';
      }, 250);

      if (navigator.vibrate) navigator.vibrate(20);
    });
  });
}
