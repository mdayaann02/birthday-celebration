// src/models/templateRegistry.js - Templates Registry & Schema

export const TEMPLATES = {
  tree: {
    id: "tree",
    name: "Cupid & Blossom Tree",
    badge: "Cinematic Film 🏹🌸",
    icon: "🏹",
    description: "A 4-act interactive film: gift unwrap gate, Cupid's bow shooting the beating heart, rose color flood, kinetic typography wish, blooming canvas tree with tap-to-read love notes, polaroid scrapbook & typewriter letter.",
    defaultTheme: {
      primary: "#d4235c",
      bgGradient: "radial-gradient(120% 88% at 50% 24%, #fff8f1 0%, #fff6ee 38%, #f9e2d2 74%, #f2c9b8 100%)",
      accent: "#ffcf6a"
    },
    defaultData: {
      recipientName: "My Love",
      senderName: "Cupid",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "ROMANTIC SCORE",
      audioSrc: "/audio/alfaaz.mp3",
      gateLabel: "tap to unwrap",
      eyebrow: "a little something, for you",
      hint: "pull & release",
      kEyebrow: "make a wish…",
      wLine1: "Happy",
      wLine2: "Birthday",
      kSub: "to someone worth celebrating",
      wEyebrow: "and… make it count",
      wHero: "Happy Birthday",
      wSub: "here’s to a year that blooms",
      loveHint: "✦ tap the blossoms ✦",
      loveNotes: [
        "You are the prettiest sight in my entire world 🌸",
        "Every moment with you feels like pure magic ✨",
        "Your smile is my absolute favourite thing in life 🥰",
        "I love you more than words can ever describe 💖",
        "Thank you for being my constant happy place 🫶",
        "Here's to a lifetime of love and unforgettable memories 🥂"
      ],
      scrapbookEyebrow: "a little scrapbook",
      scrapbookTitle: "Memory Lane",
      polaroids: [
        { image: "/images/sunset.jpg", caption: "Our favourite sunset walk 🌅" },
        { image: "/images/always_you.jpg", caption: "Always laughing with you 🫶" },
        { image: "/images/pretty.jpg", caption: "Your breathtaking smile ✨" },
        { image: "/images/dream_girl.jpg", caption: "Adventures of a lifetime 💫" },
        { image: "/images/queen.jpg", caption: "Forever my queen 👑" }
      ],
      reasons: [
        "The way your eyes light up whenever you laugh",
        "How you make every single day feel like home",
        "Your endless kindness and the purest heart",
        "How we can talk for hours about absolutely everything"
      ],
      shuffleCompliments: [
        "You make my entire universe brighter just by existing 🌟",
        "You are the definition of breathtaking beauty inside and out 💖",
        "I fall in love with you all over again every single day 🌸",
        "Your gentle touch calms any storm in my life 🕊️",
        "Nobody in the world could ever replace you 👑",
        "Your happiness is my highest priority forever and always ✨"
      ],
      letterText: "Dear you, Happy birthday! From the moment you walked into my life, you brought colors, laughter, and a warmth I never knew existed. Watching you grow, smile, and achieve your dreams is my greatest joy. Thank you for being my partner, my best friend, and my whole heart. Here is to celebrating you today and always. I love you endlessly. ♡"
    }
  },

  blossom: {
    id: "blossom",
    name: "Blossom Romance (Viral Reel)",
    badge: "Trending Reel 🌸",
    icon: "🌸",
    description: "The viral pastel aesthetic story: 'Touch the blossom' bloom opener, passcode keypad, birthday note, fire burn-away transition, pixel strawberry cake with blowable candles, 3D swipe cards, hanging pull-lamp with twilight switch, and wax-seal typewriter letter modal.",
    defaultTheme: {
      primary: "#f472b6",
      bgGradient: "radial-gradient(circle at 50% 35%, #fff1f2 0%, #fdf2f8 50%, #ffe4e6 100%)",
      accent: "#e11d48"
    },
    defaultData: {
      recipientName: "my gurll",
      senderName: "Yours",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "BLOSSOM LOVE",
      audioSrc: "/audio/alfaaz.mp3",
      // Scene 1: Touch the Blossom
      blossomPrompt: "Touch the blossom",
      // Scene 2: Passcode Keypad
      keypadTitle: "For you, my love",
      keypadSubtitle: "I love you",
      // Scene 3: Opening Note
      introHeading: "Hey Baby,",
      introLine1: "I know this isn't a normal birthday gift...",
      introLine2: "But I made this just for you.",
      // Scene 4: Flame button
      flamePrompt: "Touch the flame to light",
      // Scene 5: Pixel Cake
      cakeHeadline: "Happy Birthday, My Girl!",
      cakeSubtext: "Make a wish and tap the candles 🎂",
      // Scene 6: 3D Swipe Cards
      memoriesHeading: "BEAUTIFUL MEMORIES",
      memoriesSubtitle: "Swipe the cards ✨",
      cards: [
        { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
        { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
        { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
        { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
        { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
      ],
      // Scene 7: Hanging Lamp
      lampPrompt: "DRAG THE STRING DOWN TO PULL",
      // Scene 8: Letter Modal
      letterPrompt: "A Letter, Just For You",
      letterSubprompt: "Tap the envelope to unseal",
      letterModalTitle: "Happy Birthday ✨",
      letterModalSub: "Just for you ♡",
      letterBody: `Happiest birthday my gurll 🧚‍♀️ 🎂

I pray you achieve all your dreams, stay happy, and keep smiling the way you do...

because that smile is my favorite thing 🫶

Everyday is your day because you are the main character... and YOU KNOW IT 🥰

Let's share unlimited laughs, love, fights, and happiness 🧿 🫂

I love you forever and ever and ever

Thankyou for being my partner in every sense, happy 19th darlzzz 🧚‍♀️ 💋

I love you darlzzzz please be with mee chelloo 🥺 🤌`
    }
  },

  birthday: {
    id: "birthday",
    name: "Birthday Celebration",
    badge: "Most Popular 🎂",
    icon: "🎂",
    description: "Floating sky lanterns, 3D age milestone, photo loop ribbon, polaroid notes, Vogue flipbook, scratch card, VIP lanyard, and iMessage chat.",
    defaultTheme: {
      primary: "#d4af37",
      bgGradient: "radial-gradient(120% 88% at 50% 24%, #1c1815 0%, #13100e 65%, #0a0807 100%)",
      accent: "#e11d48"
    },
    defaultData: {
      recipientName: "My Special One",
      recipientPersona: "special",
      senderName: "Yours Truly",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: true,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "BIRTHDAY PLAYLIST",
      audioSrc: "/audio/alfaaz.mp3",
      age: "15",
      heroTitle: "Happy Birthday",
      heroSubtitle: "To the most special girl in my universe ✨",
      polaroids: [
        { title: "Baddie 😎", image: "/images/baddie.jpg", note: "You have that effortless aura and confidence that turns heads everywhere! 🌟" },
        { title: "Always You 🫶", image: "/images/always_you.jpg", note: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶" },
        { title: "Pretty ✨", image: "/images/pretty.jpg", note: "No poetry in this world can ever truly capture how breathtaking you look when you're just being yourself. 🌸" },
        { title: "Beautiful 🌸", image: "/images/beautiful.jpg", note: "Your heart is even more radiant than your smile, and that's saying a lot! ☀️" },
        { title: "Dream Girl 💫", image: "/images/dream_girl.jpg", note: "Before I met you, I thought perfection only existed in storybooks. 💖" },
        { title: "Queen 👑", image: "/images/queen.jpg", note: "May you always wear your invisible crown with happiness, peace, and endless love! 👑" }
      ],
      magazine: {
        title: "VOGUE SPECIAL EDITION",
        quote: "Being with you makes every ordinary day feel like the sweetest dream come true.",
        photo: "/images/sunset.jpg",
        reasons: [
          "Mesmerizing Eyes that freeze time",
          "Sweetest smile that melts away worries",
          "Pure heart that cares for everyone",
          "Infectious laughter that brightens the room",
          "My safest haven and happiest thought",
          "Unconditional love that heals my soul"
        ]
      },
      scratchWish: {
        title: "Happy Birthday!",
        message: "Wishing you the happiest year ahead filled with laughter, dreams achieved, and infinite love. You deserve the galaxy! 🎂✨"
      },
      chatMessages: [
        "Happppyeeee birthday! ❤️🎂",
        "ik last bday pr ek problem hogyi thi isliye ye wala bilkul special banaya! 🎁✨",
        "Hope this brings the biggest smile to your face today! 🥰"
      ]
    }
  },

  anniversary: {
    id: "anniversary",
    name: "Romantic Anniversary",
    badge: "Timeless Romance 💍",
    icon: "💍",
    description: "Live 'Together Since' love counter, golden memories gallery, emotional love letters, our journey timeline, and musical heart shower.",
    defaultTheme: {
      primary: "#d4af37",
      bgGradient: "linear-gradient(180deg, #120e17 0%, #1e1322 100%)",
      accent: "#ff758f"
    },
    defaultData: {
      recipientName: "My Love",
      senderName: "Forever Yours",
      eventDate: "2026-11-28T00:00",
      anniversaryStartDate: "2023-11-28T00:00",
      enableCountdownLock: true,
      passcode: "2026",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "ANNIVERSARY EDITION",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "Happy Anniversary",
      heroSubtitle: "Another year of choosing you, loving you, and growing with you ❤️",
      milestones: [
        { year: "The Day We Met", text: "When strangers turned into the best chapter of our lives." },
        { year: "Our First Trip", text: "Laughing under starry skies and realizing home is wherever you are." },
        { year: "Through Every Storm", text: "Standing together stronger, deeper, and more in love than yesterday." },
        { year: "Today & Forever", text: "I'd still choose you in every lifetime and every universe." }
      ],
      vows: [
        "I promise to always listen with an open heart, even on noisy days.",
        "I promise to celebrate your smallest victories as if they conquered the world.",
        "I promise to hold your hand through every twist and turn of life.",
        "I promise to keep falling in love with you more every single sunrise."
      ],
      polaroids: [
        { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I knew I never wanted to let go of your hand." },
        { title: "Always Laughing With You 🫶", image: "/images/always_you.jpg", note: "Every silly joke, every shared smile makes my life a dream." },
        { title: "My Beautiful Forever ✨", image: "/images/pretty.jpg", note: "I fall in love with you all over again every single morning." }
      ],
      letter: "Every single day with you is a reminder of how lucky I am. Thank you for being my anchor, my warmth, and my favorite hello and hardest goodbye. Happy Anniversary, my love."
    }
  },

  sorry: {
    id: "sorry",
    name: "Heartfelt Apology ('I'm Sorry')",
    badge: "Make Peace 🥺",
    icon: "🥺",
    description: "Deeply sincere apology letter, 'Reasons you mean the world', interactive mood slider, and runaway 'Will You Forgive Me?' button.",
    defaultTheme: {
      primary: "#d4af37",
      bgGradient: "linear-gradient(180deg, #181513 0%, #201a17 100%)",
      accent: "#f59e0b"
    },
    defaultData: {
      recipientName: "My Dearest",
      senderName: "Sincerely Yours",
      creatorPhoto: "/images/always_you.jpg",
      eventDate: "2026-11-22T00:00",
      enableCountdownLock: false,
      passcode: "0000",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "I'M SO SORRY",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "I'm Really Sorry",
      heroSubtitle: "My world feels heavy and empty when we aren't okay 🥺",
      apologyMessage: "I know I messed up, and seeing you upset hurts me more than anything. My intention was never to make you feel hurt or unheard. You mean everything to me, and I take full accountability.",
      reasonsToForgive: [
        "Because our bond is bigger and more precious than any silly mistake.",
        "Because I am genuinely learning and committed to being better for you.",
        "Because life is too short to let misunderstandings steal our joy.",
        "Because your smile is my favorite thing in the universe, and I miss it."
      ],
      promises: [
        "To listen first and understand before reacting.",
        "To never take your patience and love for granted.",
        "To communicate openly with gentleness and honesty."
      ],
      penances: [
        "Buy your favorite Iced Boba / Treat right now 🧋",
        "30-minute soothing massage whenever you ask 💆‍♀️",
        "Order whatever food you are craving tonight, my treat 🍕",
        "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
        "Fold all your laundry & do your chores this weekend 🧹",
        "Write 100 cute post-it notes of things I adore about you 📝"
      ],
      treatyClauses: [
        "Party A (The Cutest Girl) is officially declared 100% Right in all past, present, and future disputes.",
        "Party B must deliver hugs, kisses, and forehead kisses upon demand.",
        "Permanent hoodie and jacket theft rights are granted with zero retaliation.",
        "All future disagreements must be settled immediately with dessert and boba.",
        "No going to sleep angry ever again — cuddles are mandatory."
      ],
      polaroids: [
        { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your laugh so much 🌅" },
        { image: "/images/always_you.jpg", caption: "You are the brightest light in my world 🫶" },
        { image: "/images/pretty.jpg", caption: "I never want to see you hurt ever again ✨" }
      ],
      coupons: [
        { icon: "🎟️", title: "Get Out of Jail Free", desc: "Win any future argument instantly with no rebuttal!" },
        { icon: "🍫", title: "Midnight Craving Pass", desc: "Redeemable 24/7 for chocolates, snacks, or fast food." },
        { icon: "🧸", title: "Unlimited Bear Hugs", desc: "Non-expiring voucher for long, tight, comforting hugs." },
        { icon: "👑", title: "Queen For A Day", desc: "He must obey your every cute command for 24 hours." }
      ]
    }
  },

  valentine: {
    id: "valentine",
    name: "Valentine / Love Confession",
    badge: "Love Confession 💖",
    icon: "💖",
    description: "Falling rose petals, wax-sealed love letter, interactive 'Be My Valentine' proposal with playful runaway 'NO' button, and photo memories.",
    defaultTheme: {
      primary: "#ff3366",
      bgGradient: "linear-gradient(180deg, #1f0b18 0%, #2b0d20 100%)",
      accent: "#ffd166"
    },
    defaultData: {
      recipientName: "Sweetheart",
      senderName: "Your Secret Admirer",
      eventDate: "2026-11-24T00:00",
      enableCountdownLock: true,
      passcode: "1402",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "VALENTINE SPECIAL",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "To the Girl Who Stole My Heart",
      heroSubtitle: "Every love song makes complete sense now that you're in my life 🌹",
      proposalQuestion: "Will You Be My Valentine & Forever? ❤️",
      polaroids: [
        { title: "That Unforgettable Smile ✨", image: "/images/pretty.jpg", note: "The very first time you looked at me and smiled, my heart decided right then." },
        { title: "Our Favorite Adventures 🌅", image: "/images/sunset.jpg", note: "Every moment with you feels like a beautiful dream I never want to wake up from." },
        { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "The kindest, most radiant soul. I am truly the luckiest person in the world." }
      ],
      loveLetter: "You walked into my life so gently, but turned it into the most magical journey. Your smile is my daily dose of peace, and your voice makes everything else fade away. I want to spend all my tomorrows making you smile as bright as you make mine."
    }
  },

  bestie_girl: {
    id: "bestie_girl",
    name: "Girl Bestie (Soul Sister)",
    badge: "Girl Bestie 💅🌸",
    icon: "💅",
    description: "The viral Blossom-style girl bestie journey: Touch the Friendship Charm bloom opener, secret bestie passcode keypad, heartfelt intro note, match flame to light the celebration cake, tap-to-blow candles, 3D memory flip cards, hanging fairy light string pull, wax-sealed sisterhood letter, and bestie awards.",
    defaultTheme: {
      primary: "#f472b6",
      bgGradient: "radial-gradient(circle at 50% 35%, #fff1f2 0%, #fdf2f8 50%, #ffe4e6 100%)",
      accent: "#ec4899"
    },
    defaultData: {
      recipientName: "My Bestie",
      senderName: "Your Soul Sister",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Bestie Forever Soundtrack",
      audioSubtitle: "SOUL SISTER VIBES",
      audioSrc: "/audio/blossom_song.mp3",
      blossomPrompt: "Touch the friendship charm 🌸",
      keypadTitle: "Bestie Security Check 🔐",
      keypadSubtitle: "Enter our secret code",
      introHeading: "Hey Gorgeous ✨",
      introLine1: "We do crazy, unhinged things together every day...",
      introLine2: "So I made this special website just for you.",
      flamePrompt: "Touch the sparkler to light ✨",
      cakeHeadline: "Happy Birthday to My Bestie! 🎂",
      cakeSubtext: "Make a wish and tap the candles ✨",
      memoriesHeading: "CRAZY BESTIE MEMORIES",
      memoriesSubtitle: "Swipe the cards ✨",
      cards: [
        { image: "/images/sunset.jpg", caption: "Sunset gossips & iced coffee runs ☕🌅" },
        { image: "/images/always_you.jpg", caption: "Laughing so hard our stomachs hurt 😂" },
        { image: "/images/pretty.jpg", caption: "Serving absolute main character energy 💅" },
        { image: "/images/dream_girl.jpg", caption: "Partners in crime through everything 👯‍♀️" },
        { image: "/images/queen.jpg", caption: "Forever my favorite human in the world 👑" }
      ],
      lampPrompt: "DRAG THE FAIRY LIGHT STRING DOWN",
      letterPrompt: "A Letter, Just For You",
      letterSubprompt: "Tap the envelope to unseal",
      letterModalTitle: "Happy Birthday Bestie ✨",
      letterModalSub: "For my soul sister ♡",
      letterBody: `Happiest Birthday to my favorite girl! 🧚‍♀️💖

I honestly don’t know what I would do without our 2 AM rants, emergency outfit approvals, and laughing at things nobody else finds funny.

You are the sister I got to choose. Thank you for always listening, never judging, and being the warmest, brightest light in my life.

I hope this year brings you all the happiness, luxury, peace, and dreams you truly deserve. You are the main character and don’t you ever forget it! 🥰

I love you endlessly, my soul sister! 🫂🧿✨`
    }
  },

  bestie_boy: {
    id: "bestie_boy",
    name: "Bro Bestie (Ride or Die)",
    badge: "Bro Bestie 👊⚡",
    icon: "👊",
    description: "The ultimate interactive brotherhood journey: Fist-bump shockwave unlock, bro-code security keypad, hype intro note, lighter flame to ignite the celebration cake/torch, blowable candles, 3D polaroid roast & memory wall, tactical neon switch, and sealed brotherhood letter.",
    defaultTheme: {
      primary: "#38bdf8",
      bgGradient: "linear-gradient(180deg, #090e1a 0%, #0d1527 100%)",
      accent: "#0284c7"
    },
    defaultData: {
      recipientName: "Bhai / My Guy",
      senderName: "Your Bro",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Brotherhood Anthem",
      audioSubtitle: "RIDE OR DIE ⚡",
      audioSrc: "/audio/blossom_song.mp3",
      blossomPrompt: "Fist bump to unlock the bro vault 👊⚡",
      keypadTitle: "Bro-Code Security Vault 🛡️",
      keypadSubtitle: "Only real ones enter",
      introHeading: "Yo Brother 👑",
      introLine1: "No cringe emotional speeches, you already know what it is...",
      introLine2: "I built this legendary website just for you, my guy.",
      flamePrompt: "Touch the lighter flame to ignite 🔥",
      cakeHeadline: "Happy Birthday to My Brother! 🎂",
      cakeSubtext: "Make a wish and blow out the candles 👑",
      memoriesHeading: "LEGENDARY BRO MEMORIES",
      memoriesSubtitle: "Swipe the cards ✨",
      cards: [
        { image: "/images/sunset.jpg", caption: "Late night drives & deep life talks 🚗💨" },
        { image: "/images/always_you.jpg", caption: "Surviving chaos together since day one ⚡" },
        { image: "/images/dream_girl.jpg", caption: "Epic gaming sessions until 4 AM 🎮" },
        { image: "/images/pretty.jpg", caption: "Brothers by choice, legends by birth 👑" },
        { image: "/images/queen.jpg", caption: "To 100 more years of crazy adventures 🍻" }
      ],
      lampPrompt: "PULL DOWN THE TACTICAL NEON SWITCH",
      letterPrompt: "A Letter, Just For You",
      letterSubprompt: "Tap the seal to unlock",
      letterModalTitle: "Happy Birthday, My Brother 👑",
      letterModalSub: "Ride or Die Forever ⚡",
      letterBody: `Happiest Birthday, my brother! 👑🎂

People come and go, but having a brother who always has your back through every high and low is the rarest blessing in this world.

From late-night drives and gaming grinds to pushing each other to level up in life — thank you for being the most genuine, loyal guy I know.

I pray this year brings you unstoppable success, big money, peace, and everything you are grinding for.

Brothers for life, no matter where life takes us. Ride or die forever! 👊🔥🧿`
    }
  },

  friendship: {
    id: "friendship",
    name: "Bestie Celebration",
    badge: "Best Friends Forever 👯",
    icon: "👯",
    description: "Crazy memories hall of fame, certified Best Friend award, inside joke playlist, and heartfelt gratitude for your ride-or-die.",
    defaultTheme: {
      primary: "#20bf6b",
      bgGradient: "linear-gradient(180deg, #091a13 0%, #10261e 100%)",
      accent: "#f7b731"
    },
    defaultData: {
      recipientName: "Bestie",
      senderName: "Your Partner in Crime",
      eventDate: "2026-11-26T00:00",
      enableCountdownLock: false,
      passcode: "9999",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "BESTIE ANTHEM",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "Cheers to My Best Friend!",
      heroSubtitle: "To the one who knows all my secrets and still chooses to be seen in public with me! 😂",
      awardTitle: "OFFICIAL CERTIFICATE OF AWESOMENESS",
      awardReason: "Awarded for exceptional tolerance of my drama, late night gossips, and unmatched loyalty.",
      sillyMemories: [
        { title: "Late Night Talks", text: "Solving world problems at 2 AM instead of sleeping." },
        { title: "Unstoppable Laughs", text: "Laughing so hard at something nobody else found funny." },
        { title: "Always Having My Back", text: "Knowing exactly what I'm thinking with just one glance." }
      ],
      polaroids: [
        { title: "Partners In Crime 👯", image: "/images/sunset.jpg", note: "Late night drives, endless food runs, and gossip sessions." },
        { title: "Unstoppable Duo ⚡", image: "/images/always_you.jpg", note: "Through thick and thin, no one gets me like you do!" },
        { title: "Legendary Memories 📸", image: "/images/dream_girl.jpg", note: "A toast to 100 more years of crazy adventures together!" }
      ]
    }
  },

  mother: {
    id: "mother",
    name: "Mother Special (Maa)",
    badge: "For My Queen 👑🌸",
    icon: "🌸",
    description: "Tribute to Maa: Golden lotus sparkles, superpowers of Mom cards, Polaroid memory album, interactive 'Send Virtual Hug' heart shower, and wax-sealed gratitude letter.",
    defaultTheme: {
      primary: "#f43f5e",
      bgGradient: "radial-gradient(circle at 50% 30%, #fff1f2 0%, #fdf2f8 50%, #ffe4e6 100%)",
      accent: "#f59e0b"
    },
    defaultData: {
      recipientName: "Maa",
      senderName: "Your Child",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "FOR MY QUEEN",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "To My Queen, My Maa ❤️",
      heroSubtitle: "In your smile lies my entire universe, and in your prayers I find my greatest strength.",
      polaroids: [
        { title: "Her Gentle Smile 🌸", image: "/images/beautiful.jpg", note: "The warmth and peace that has always been my safe place." },
        { title: "Unconditional Support 🫶", image: "/images/always_you.jpg", note: "No matter how tough life gets, knowing you are praying for me gives me strength." },
        { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "A mother like no other, radiant, loving, and truly unforgettable." }
      ],
      letter: `Dear Maa,

No words or songs in this world will ever be enough to thank you for everything you do. 

From sleepless nights when I was sick, to silently sacrificing your own happiness just to see a smile on my face — you have been my angel on earth.

Everything good in me comes from you. I pray Allah blesses you with endless health, peace, and eternal smiles.

I love you more than words could ever describe, Maa! 🌸👑❤️`
    }
  },

  father: {
    id: "father",
    name: "Father Special (Papa)",
    badge: "For My Hero 🌟🛡️",
    icon: "🌟",
    description: "Tribute to Papa: Deep royal navy & constellation stars, pillars of strength wisdom cards, Best Dad in the World 3D trophy, Polaroid memories, and wax-seal letter.",
    defaultTheme: {
      primary: "#3b82f6",
      bgGradient: "linear-gradient(180deg, #090e1a 0%, #111a2e 100%)",
      accent: "#fbbf24"
    },
    defaultData: {
      recipientName: "Papa",
      senderName: "Your Proud Child",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "FOR MY HERO",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "To My First Hero, My Father 🌟",
      heroSubtitle: "A father's love is quiet, yet it moves mountains. Thank you for being my rock and greatest shield.",
      polaroids: [
        { title: "Quiet Strength 🛡️", image: "/images/sunset.jpg", note: "Working through sleepless days so our future would shine bright." },
        { title: "Life's Compass 🧭", image: "/images/always_you.jpg", note: "Teaching us integrity, honor, and how to stand tall in any storm." },
        { title: "My First Hero 🌟", image: "/images/dream_girl.jpg", note: "No cape, no armor, just a father who gave us everything." }
      ],
      letter: `Dear Papa,

You worked tirelessly through every storm without ever complaining, just so our future could shine bright.

Whenever I felt lost, your steady guidance was my compass. You showed me what honor, courage, and true sacrifice mean.

Thank you for being my biggest hero and greatest support. I am who I am today because of you.

Happy celebration, Papa! 🌟🛡️❤️`
    }
  },

  sister: {
    id: "sister",
    name: "Sister Special (Behna)",
    badge: "Partner in Crime 💅💖",
    icon: "💅",
    description: "Pastel lavender aesthetic: Sister survival rules, runaway 'Who is Smarter?' banter button, Polaroid blackmail & candid album, and forever bestie letter.",
    defaultTheme: {
      primary: "#c084fc",
      bgGradient: "radial-gradient(circle at 50% 30%, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)",
      accent: "#f472b6"
    },
    defaultData: {
      recipientName: "Behna",
      senderName: "Your Crazy Sibling",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "SISTER ANTHEM",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "To My Crazy, Annoying, Irreplaceable Sister 💅✨",
      heroSubtitle: "We fight, we steal each other's clothes, we drive each other insane... but no one has my back like you do!",
      polaroids: [
        { title: "Partner in Crime 💅", image: "/images/pretty.jpg", note: "From raiding each other's wardrobes to keeping the deepest secrets safe." },
        { title: "Chaos & Blackmail 📸", image: "/images/always_you.jpg", note: "Photos that could ruin each other's reputation, kept as supreme leverage! 😂" },
        { title: "Forever Bestie 💖", image: "/images/beautiful.jpg", note: "No matter how loud our fights get, you are the first person I run to." }
      ],
      letter: `Dear Behna,

Even though you steal my things and blame me for everything in front of Mom, I wouldn't trade you for the world!

Thank you for being my secret keeper, my 2 AM gossip buddy, and my forever best friend.

Whatever life throws at us, remember I will always be right by your side (and will still tease you forever).

Love you endlessly, my favourite sister! 💖💅✨`
    }
  },

  brother: {
    id: "brother",
    name: "Brother Special (Bhai)",
    badge: "The Living Legend 🤜🤛",
    icon: "🤜🤛",
    description: "Electric cobalt & cyan theme: The Sacred Bhai Code, Brotherhood Hall of Fame cards, interactive Fist Bump rumble blast, and heartfelt bro letter.",
    defaultTheme: {
      primary: "#06b6d4",
      bgGradient: "linear-gradient(180deg, #050b14 0%, #0c1829 100%)",
      accent: "#38bdf8"
    },
    defaultData: {
      recipientName: "Bhai",
      senderName: "Your Brother in Chaos",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "BROTHERHOOD CODE",
      audioSrc: "/audio/alfaaz.mp3",
      heroTitle: "To My Brother in Chaos, The Legend 🤜🤛🔥",
      heroSubtitle: "From wrestling over the TV remote to standing shoulder-to-shoulder through everything. Brotherhood forever!",
      polaroids: [
        { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
        { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
        { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
      ],
      letter: `Dear Bhai,

We've broken things, made crazy memories, fought like wild animals, and laughed until our stomachs hurt.

You're not just my brother; you're the one person I can count on anytime, anywhere, with zero questions asked.

Here's to the brotherhood that will never break. Keep being the absolute legend you are!

Fist bump forever, bro! 🤜🤛🔥`
    }
  }
};
