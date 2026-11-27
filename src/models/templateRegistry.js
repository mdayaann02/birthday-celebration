// src/models/templateRegistry.js - Templates Registry & Schema

function getFutureIsoDate(daysAhead = 14) {
  const d = new Date(Date.now() + daysAhead * 86400000);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T18:00`;
}

export const TEMPLATES = {
  long_romance: {
    id: "long_romance",
    name: "Long Romance Masterpiece",
    badge: "Cupid + Tree + Reel 🏹🌸",
    icon: "🏹🌸",
    description: "The complete, continuous long romance website: Viral Reel blossom opener, Cupid's recurve bow & arrow arena, living canvas blossom tree, 3D Polaroid memories scrapbook, ember burn-away letter, and twilight sky lanterns with sticky chapter progress dock and mini CD music player.",
    defaultTheme: {
      primary: "#d4235c",
      bgGradient: "radial-gradient(120% 88% at 50% 24%, #fff8f1 0%, #fff6ee 38%, #f9e2d2 74%, #f2c9b8 100%)",
      accent: "#ffcf6a"
    },
    defaultData: {
      recipientName: "My Love",
      senderName: "Yours Forever",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "ROMANTIC MASTERPIECE",
      audioSrc: "/audio/alfaaz.mp3",
      spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
      youtubeUrl: "https://www.youtube.com/watch?v=0yW7w8F2TVA",
      playlist: [
        { id: 1, title: "Alfaaz", artist: "Hamza Malik & Zain Zohaib", src: "/audio/alfaaz.mp3", tag: "OUR THEME 🌸", duration: "3:42" },
        { id: 2, title: "Blossom Romance Symphony", artist: "Romantic Instrumental", src: "/audio/blossom_song.mp3", tag: "FIRST DATE 🫶", duration: "3:58" },
        { id: 3, title: "Happy Birthday Acoustic Wish", artist: "Acoustic Guitar & Piano", src: "/audio/song.mp3", tag: "SPECIAL CELEBRATION ✨", duration: "2:45" },
        { id: 4, title: "Always In My Heart", artist: "Soft Piano Reverie", src: "/audio/alfaaz.mp3", tag: "SWEET MOMENTS 💖", duration: "3:42" },
        { id: 5, title: "Golden Hour Sakura", artist: "Orchestral Blossom", src: "/audio/blossom_song.mp3", tag: "FOREVER YOURS 👑", duration: "3:58" }
      ],
      heroTitle: "To My One & Only Love 🌸",
      heroSubtitle: "A continuous story of us, blooming through every season.",
      polaroids: [
        { image: "/images/sunset.jpg", caption: "Our favourite sunset walk 🌅", note: "The golden hour that made me realize I want forever with you." },
        { image: "/images/always_you.jpg", caption: "Always laughing with you 🫶", note: "Pure joy, uncontrolled giggles, and zero worries." },
        { image: "/images/pretty.jpg", caption: "Your breathtaking smile ✨", note: "The sight that lights up my entire universe every single day." },
        { image: "/images/dream_girl.jpg", caption: "Adventures of a lifetime 💫", note: "Every moment by your side is an adventure I cherish." },
        { image: "/images/queen.jpg", caption: "Forever my queen 👑", note: "Kind, radiant, and the most beautiful soul on earth." }
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
      letterText: "Dearest you,\n\nFrom the moment you walked into my life, you brought colors, laughter, and a warmth I never knew existed.\n\nWatching you grow, smile, and achieve your dreams is my greatest joy. Thank you for being my partner, my best friend, and my whole heart.\n\nHere is to celebrating you today, tomorrow, and across a lifetime of blooming love.\n\nI love you endlessly. ♡",
      treatyVow: "I promise to love you on peaceful mornings and in wild storms, to cherish your laugh, to support your dreams, and to walk hand-in-hand with you through every tomorrow.",
      constellations: [
        { title: "The First Spark", date: "Where It Began", note: "The exact moment the universe guided my eyes to yours, and my world changed forever.", x: 20, y: 32 },
        { title: "Midnight Drives", date: "2 AM Talks", note: "Late-night drives with windows down, singing along, sharing every quiet dream.", x: 45, y: 22 },
        { title: "Quiet Safe Harbor", date: "The Comfort", note: "Finding the only person in the world where silence feels completely peaceful and safe.", x: 78, y: 35 },
        { title: "The Turning Point", date: "I Just Knew", note: "The day I caught myself smiling at nothing, realizing I never want a tomorrow without you.", x: 32, y: 72 },
        { title: "Our North Star", date: "Forever Yours", note: "Through every storm, change of seasons, and adventure, you are my eternal guiding light.", x: 68, y: 76 }
      ],
      milestones: [
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
          date: "October 05, 2023",
          image: "/images/dream_girl.jpg",
          desc: "Spontaneous road trips, messy cooking experiments, late-night grocery runs. The ordinary world becomes pure magic with you."
        },
        {
          num: "05",
          icon: "💍",
          tag: "ETERNITY",
          title: "Today, Tomorrow & Across Lifetimes",
          date: "Forever & Always",
          image: "/images/queen.jpg",
          desc: "In a world of fleeting moments, choosing you is the easiest decision I'll ever make. My heart is, and will forever be, your home."
        }
      ]
    }
  },

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

  bloom_reveal: {
    id: "bloom_reveal",
    name: "Bloom Reveal Surprise",
    badge: "Bloom Reveal 🌸💜",
    icon: "🌸",
    description: "The viral flower-reveal romance template: Interactive 4-digit PIN gate, 88-flower spiral vortex curtain parting reveal, 10 Things I Love About You glass accordion, 10 Polaroid memories gallery, scroll-illuminated parchment love letter, Spotify top songs, and typewriter devotion finale.",
    defaultTheme: {
      primary: "#360f5a",
      bgGradient: "linear-gradient(180deg, #fbf7f5 0%, #edd9ed 100%)",
      accent: "#d4235c"
    },
    defaultData: {
      recipientName: "Beautiful",
      senderName: "Yours Forever",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      bloomPin: "0000",
      gateGreeting: "Hi, beautiful",
      gateSubtitle: "Enter the correct password to see your surprise :)",
      reasonsTitle: "10 things I love about you",
      reasonsList: [
        {
          title: "Your Virtual Good Morning Smiles",
          body: "Waking up to your sleepy face on our morning video calls instantly brightens my entire day. Even when we are miles apart, that sweet smile makes me feel like you are right beside me."
        },
        {
          title: "The Way You Laugh at My Bad Jokes",
          body: "I know my sense of humor can be terrible, but you always let out the most genuine, joyful laugh anyway. Hearing that sound over the phone is absolute music to my ears."
        },
        {
          title: "Your Unwavering Support",
          body: "Whenever I feel overwhelmed by a busy week, you always know exactly the right words to encourage me. Your belief in my dreams pushes me to be the best version of myself every single day."
        },
        {
          title: "Our Late-Night Movie Syncs",
          body: "There is nothing better than counting down from three so we can press play on a movie at the exact same time. Hearing you gasp or laugh at the same moments makes the distance between us completely disappear."
        },
        {
          title: "The Little Care Packages You Send",
          body: "Opening the mail to find my favorite snacks and a handwritten letter from you always brings tears to my eyes. It is a beautiful physical reminder of how deeply you love and care for me."
        },
        {
          title: "Your Passion for Your Hobbies",
          body: "Watching you light up while talking about your digital illustrations or new projects is incredibly inspiring. Your dedication to your creative pursuits is just one of the many reasons I fell for you."
        },
        {
          title: "The Way You Remember Small Details",
          body: "You always surprise me by bringing up a random passing comment I made weeks ago. It shows me how intently you listen and how much you genuinely value our conversations."
        },
        {
          title: "Your Sweet Voice Notes",
          body: "Sometimes I wake up to random voice recordings of you singing or just telling me about your day. I play them on repeat whenever I am missing you a little extra."
        },
        {
          title: "The Comfort of Your Advice",
          body: "You have an incredible ability to look at any problem I face with a calm and logical perspective. I can always rely on your quiet wisdom to help me navigate through stressful situations."
        },
        {
          title: "Dreaming About Our Future Together",
          body: "We spend hours talking about the day we finally close the gap and can share the same space permanently. Just the thought of building a life with you keeps me going through the toughest of times."
        }
      ],
      polaroids: [
        { title: "Sweet Beginning 🌸", image: "/bloom/p1.png", note: "Where our journey quietly began, full of tender smiles." },
        { title: "Pure Joy ✨", image: "/bloom/p2.png", note: "Sunlight and carefree laughs that stay with me forever." },
        { title: "Quiet Moments ☕", image: "/bloom/p3.png", note: "Just peaceful afternoons together lost in time." },
        { title: "Golden Hour 🌅", image: "/bloom/p4.png", note: "The warm sky that couldn't compare to your radiance." },
        { title: "Holding Hands 💫", image: "/bloom/p5.png", note: "Finding home in the gentle warmth of your hand." },
        { title: "Little Surprises 🎁", image: "/bloom/p6.png", note: "Every sweet memory we built step by step." },
        { title: "Endless Laughter 🫶", image: "/bloom/p7.png", note: "Unfiltered giggles that erase every worry." },
        { title: "Dreaming Big 🌙", image: "/bloom/p8.png", note: "Talking for hours under late night stars." },
        { title: "Always Beside You 🕊️", image: "/bloom/p9.png", note: "Through sunny days and stormy seasons." },
        { title: "Forever & Ever 👑", image: "/bloom/p10.png", note: "My whole heart belongs entirely to you." }
      ],
      letterTitle: "My Dearest,",
      letterText: "My Dearest, I am writing this because words sometimes catch in my throat when I look at you, overwhelmed by how much you mean to me. Please keep this little note as a token of my heart—a small reminder of a love that belongs entirely to you, even when we are apart. Lately, the distance between us feels a little heavier, and I find myself yearning for you in the quietest moments of the day. I miss the simple warmth of your hand in mine, the soft sound of your laughter, and the way the world just makes sense whenever you are near. You are my peace, my constant joy, and the brightest part of my life. No matter where we are or how long the days feel before I can hold you again, please never forget how deeply, truly, and completely you are loved. You have my whole heart, today and for all the days to come. Forever and always yours, With all my love",
      songsTitle: "Our Top Songs",
      spotifyTracks: [
        "6Qyc6fS4DsZjB2mRW9DsQs",
        "7sapKrjDij2fpDVj0GxP66",
        "3vsNteZn6E5qBSSBO78W7b",
        "1EzrEOXmMH3G43AXT1y7pA",
        "1JSTJqkT5qHq8MDJnJbRE1"
      ],
      endingQuote: "I love you, to the moon and back.",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "BLOOM REVEAL SURPRISE",
      audioSrc: "/audio/alfaaz.mp3"
    }
  },

  birthday: {
    id: "birthday",
    name: "Relationship-Adaptive Birthday Studio",
    badge: "Cinematic Multi-Act 🎂✨",
    icon: "🎂",
    description: "Relationship-adaptive 8-act interactive celebration: tactile two-stage unwrap, SVG hero notes, glowing milestone timeline, retro cassette player, 3D photo carousel, wax-seal letter, sky lanterns & golden-ink keepsake pact.",
    defaultTheme: {
      primary: "#fb7185",
      bgGradient: "radial-gradient(circle at 50% 15%, #1f234d 0%, #12142d 68%, #070811 100%)",
      accent: "#fbbf24"
    },
    defaultData: {
      relationship: "best-friend",
      recipientPersona: "best-friend",
      recipientName: "Alex",
      nickname: "Day One",
      senderName: "Maya",
      eventDate: getFutureIsoDate(14),
      enableCountdownLock: false,
      passcode: "",
      audioTitle: "Golden Birthday Acoustic",
      audioSubtitle: "BIRTHDAY MIXTAPE",
      audioSrc: "/audio/song.mp3",
      spotifyUrl: "https://open.spotify.com/",
      youtubeUrl: "https://www.youtube.com/",
      age: "",
      heroTitle: "Happy Birthday",
      heroSubtitle: "Thank you for turning ordinary days into legendary core memories.",
      polaroids: [
        { title: "Golden Hour 🌅", date: "Golden Hour", category: "Milestones", image: "/images/sunset.jpg", note: "Chasing sunlit horizons and unforgettable evenings together." },
        { title: "Pure Joy 🫶", date: "Pure Joy", category: "Candid", image: "/images/always_you.jpg", note: "The kind of laughter that makes time stand completely still." },
        { title: "Brightest Day ✨", date: "Brightest Day", category: "Portraits", image: "/images/pretty.jpg", note: "A radiant spirit that brings warmth into every single room." },
        { title: "Adventures 💫", date: "Adventures", category: "Travel", image: "/images/dream_girl.jpg", note: "Every journey feels lighter and brighter with you around." },
        { title: "Celebration 👑", date: "Celebration", category: "Special", image: "/images/queen.jpg", note: "Here is to another year of strength, grace, and big wins." }
      ]
    }
  },

  sorry: {
    id: "sorry",
    name: "Heartfelt Apology ('I'm Sorry')",
    badge: "Midnight Rose 3D Sanctuary 🌹🕯️",
    icon: "🕊️",
    description: "Page-by-page Three.js moonlit rose sanctuary: Interactive 3D starlight & floating petals, wax-sealed illuminated confession letter, tactile venting room, sacred promises, 3D flip polaroids, peace treaty, and hold-to-heal finale.",
    defaultTheme: {
      primary: "#fb7185",
      bgGradient: "radial-gradient(120% 90% at 50% 10%, #151934 0%, #0d1024 55%, #070914 100%)",
      accent: "#f5d08a"
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

  our_museum: {
    id: "our_museum",
    name: "Our Museum (3D Interactive Gallery)",
    badge: "Virtual 3D Gallery 🏛️✨",
    icon: "🏛️",
    description: "Giftvera-inspired 3D virtual art museum: Stroll through sunlit marble & oak galleries, view your memories in spotlighted gold frames, read curatorial memory plaques, take a seat on the gallery bench, and experience the grand centerpiece cinema proposal with falling heart confetti.",
    defaultTheme: {
      primary: "#c5a059",
      bgGradient: "radial-gradient(120% 90% at 50% 10%, #1a1614 0%, #120e0d 50%, #090707 100%)",
      accent: "#f5e6ca"
    },
    defaultData: {
      recipientName: "My Beloved",
      senderName: "Yours Always",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      audioTitle: "Alfaaz - Hamza Malik & Zain Zohaib",
      audioSubtitle: "MUSEUM AMBIENCE & STRINGS",
      audioSrc: "/audio/alfaaz.mp3",
      museumTitle: "The Museum of Us",
      museumSubtitle: "A Lifetime of Curated Wonders",
      museumDedication: "Dedicated to the one who turned everyday moments into priceless works of art. Every hall in this museum is built from our smiles, our quiet midnight talks, and the love that holds my universe together.",
      establishmentDate: "Est. November 2026",
      centerpieceTitle: "The Masterpiece: You & Me",
      centerpieceImage: "/images/queen.jpg",
      centerpieceVideo: "/video/couple_memories.mp4",
      proposalQuestion: "Will you walk through every chapter of life with me?",
      proposalSubtitle: "Every single day with you is my greatest adventure. Will you be mine forever?",
      proposalYesBtn: "Yes, Forever & Always! 💍💖",
      proposalCelebrateTitle: "She Said Yes! 💍✨",
      proposalCelebrateMsg: "From this moment until eternity, my heart is completely yours. Welcome to our forever.",
      photos: [
        {
          id: 1,
          image: "/images/sunset.jpg",
          title: "The Golden Spark",
          date: "The Day We Met",
          desc: "The exact moment our paths crossed. The light hit your eyes just right, and suddenly every ordinary thing became magical."
        },
        {
          id: 2,
          image: "/images/always_you.jpg",
          title: "Unstoppable Laughter",
          date: "Summer Afternoon",
          desc: "Laughing until our stomachs ached over silly inside jokes that nobody else would ever understand."
        },
        {
          id: 3,
          image: "/images/pretty.jpg",
          title: "Quiet Sanctuary",
          date: "Late Night Talks",
          desc: "Sitting under the city lights, talking about childhood dreams and future hopes until 3 AM."
        },
        {
          id: 4,
          image: "/images/dream_girl.jpg",
          title: "Breathtaking Grace",
          date: "An Unforgettable Evening",
          desc: "In a room full of people, my eyes only ever search for you. You take my breath away every single day."
        },
        {
          id: 5,
          image: "/images/vogue_cover.jpg",
          title: "High Fashion & Adventure",
          date: "Our Roadtrip",
          desc: "Singing along at the top of our lungs with the windows rolled down. Anywhere with you is paradise."
        },
        {
          id: 6,
          image: "/images/baddie.jpg",
          title: "Pure Confidence & Charm",
          date: "Unfiltered Magic",
          desc: "Fierce, brilliant, and hopelessly adorable. The way you light up any room you walk into is pure magic."
        },
        {
          id: 7,
          image: "/images/beautiful.jpg",
          title: "The Sweetest Soul",
          date: "Gentle Mornings",
          desc: "Your boundless kindness, the warm coffee mornings, and the endless gentleness you bring into this world."
        },
        {
          id: 8,
          image: "/images/queen.jpg",
          title: "My Eternal Muse",
          date: "Forever & Always",
          desc: "You are not just a chapter in my story — you are the entire book. My muse, my best friend, and my whole heart."
        }
      ]
    }
  },

  birthday_paigaam: {
    id: "birthday_paigaam",
    name: "Birthday Paigaam (Love Letter Scrapbook)",
    badge: "Paigaam Love Letter 💌🎂",
    icon: "💌",
    description: "Authentic Paigaam-style 7-stage celebration: Secret PIN Cameo unlock, playful bunny question with escaping NO button, wax-sealed unfolding love letter, nostalgic cassette voice note, retro turntable music box, flipbook polaroid memory scrapbook with love notes, and blowable cake candles with confetti & fireworks.",
    defaultTheme: {
      primary: "#C2185B",
      bgGradient: "radial-gradient(120% 88% at 50% 24%, #FFF4D6 0%, #F9C6D4 50%, #FFD9B8 100%)",
      accent: "#C2185B",
      blush: "#F9C6D4",
      cream: "#FFF4D6",
      peach: "#FFD9B8",
      lavender: "#D9C8F5"
    },
    defaultData: {
      recipientName: "Meher",
      senderName: "Rahul",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: false,
      passcode: "1234",
      passcodeHint: "Psst… it’s 1 2 3 4",
      cameoImage: "/paigaam/bp-share.jpg",
      questionPrompt: "I have a little surprise for you. Wanna see it?",
      noMessages: [
        "How dare you click NO!",
        "Excuse me?? Try that again 😤",
        "Wrong button, birthday star 🙄",
        "I’m telling everyone you said no 😭",
        "My heart just did a tiny crack 💔",
        "The YES button is getting lonely…",
        "Okay now you’re just being silly 🙈",
        "Fine. NO is officially out of order."
      ],
      letterTitle: "for Meher",
      letterSalutation: "Dear Meher,",
      letterText: "Happy birthday, my favourite human.\n\nI wanted to give you something you can open again and again — so I made you this little corner of the internet, full of us.\n\nThank you for the laughs that make my stomach hurt, the late-night talks, and for being exactly, wonderfully you. I hope this year is soft on you, and full of everything you wish for.\n\nNow keep going — there’s more.",
      letterSignoff: "Forever yours,",
      voiceTitle: "Press play, I have something to say",
      voiceSubtitle: "a voice note, just for you",
      voiceUrl: "/paigaam/bp-voice-demo.mp3",
      voiceLabel: "for Meher ♡ side A",
      songTitle: "Happy Birthday",
      songArtist: "a little music box",
      songUrl: "",
      polaroids: [
        { image: "/paigaam/bp-memory-1.jpg", caption: "sunset ice-creams 🍦", note: "You stole a bite of mine and pretended you didn’t." },
        { image: "/paigaam/bp-memory-2.jpg", caption: "our cafe ☕", note: "Same table, same order, every single time." },
        { image: "/paigaam/bp-memory-3.jpg", caption: "rain walk ☔", note: "Best soggy shoes of my life." },
        { image: "/paigaam/bp-memory-4.jpg", caption: "the road trip!", note: "Singing at the top of our lungs off-key." },
        { image: "/paigaam/bp-memory-5.jpg", caption: "picnic day 🌸", note: "Sandwiches, sunshine, and your giggles." },
        { image: "/paigaam/bp-memory-6.jpg", caption: "movie night", note: "You fell asleep 10 minutes in. A record." }
      ],
      loveNotes: [
        "Your laugh (especially the snort)",
        "How you remember the tiny things",
        "Your terrible-but-perfect dance moves",
        "The way you make everyone feel at home",
        "Your 2am thoughts",
        "How brave you are, even when you’re scared"
      ],
      reasonsList: [
        "You make ordinary days feel like little adventures.",
        "You are kind even when nobody is watching.",
        "You turn my bad days around without even trying.",
        "You are the first person I want to tell everything.",
        "The world is softer with you in it."
      ],
      finaleTitle: "Happy Birthday, Meher!",
      finaleLine: "Here’s to you — today, and every day after.",
      cakeHint: "Make a wish… then tap the candles to blow them out 🕯️",
      thankYouText: "I just opened my birthday surprise 🥹💕 Thank you, Rahul!"
    }
  },

  wedding_invite: {
    id: "wedding_invite",
    name: "Royal Wedding Invitation",
    badge: "Royal Wedding 🏰💍",
    icon: "💍",
    description: "The luxury Indian wedding card (ShubhWeds): Carved sage doors video opener, Sunehra royal shehnai score, sacred Ganesh Shloka, interactive scratch-to-reveal Save the Date, multi-event ceremony itinerary (Haldi, Mehendi, Sangeet, Vivah), live countdown clock, romantic portraits gallery, interactive RSVP, and blessing butterflies.",
    defaultTheme: {
      primary: "#a8485e",
      bgGradient: "linear-gradient(180deg, #fbf7f0 0%, #f5eee2 100%)",
      accent: "#a98450"
    },
    defaultData: {
      recipientName: "Vihaan & Anaya",
      senderName: "Kapoor & Shah Families",
      groomName: "Vihaan",
      groomParents: "S/O Shri Rajiv Kapoor & Smt. Meera Kapoor",
      brideName: "Anaya",
      brideParents: "D/O Shri Arvind Shah & Smt. Kavita Shah",
      familiesLine: "the Kapoor and Shah families",
      hashtag: "#VihaanWedsAnaya",
      
      eventDate: "2027-02-21T19:00",
      weddingDateDisplay: "Sunday, 21st February 2027",
      ceremonyTitle: "Shubh Vivah",
      venueName: "The Oberoi Udaivilas",
      venueCity: "Udaipur, Rajasthan",
      venueAddress: "Haridas Ji Ki Magri, Mulla Talai, Udaipur, Rajasthan 313001",
      mapUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
      
      invocation: "॥ श्री गणेशाय नमः ॥",
      shlokaLine1: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।",
      shlokaLine2: "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
      blessingIntro: "With the blessings of Lord Ganesha",
      invitationKicker: "we request the honour of your presence at the wedding celebration of",
      
      saveDateDay: "Sunday",
      saveDateNum: "21",
      saveDateMonth: "February",
      saveDateYear: "2027",
      
      audioTitle: "Sunehra - Royal Wedding Shehnai",
      audioSubtitle: "ROYAL WEDDING SCORE",
      audioSrc: "https://media.shubhweds.in/videos/sunehra.mp3",
      introVideoSrc: "https://media.shubhweds.in/template-6/template-6-intro-preview.mp4",
      introPoster: "https://media.shubhweds.in/template-6/intro-poster.webp",
      introEnd: "https://media.shubhweds.in/template-6/intro-end.webp",
      
      functions: [
        {
          id: "haldi",
          name: "Haldi",
          subtitle: "Mangal Snanam",
          time: "10:00 AM - 1:00 PM",
          date: "Friday, 19th February 2027",
          venueName: "Poolside Courtyard",
          venueAddress: "The Palace Lawns, Udaipur",
          mapUrl: "https://maps.google.com/?q=The+Palace+Lawns+Udaipur",
          dressCode: "Shades of Yellow",
          accent: "#E8B85C",
          image: "https://media.shubhweds.in/template-6/function-haldi.webp"
        },
        {
          id: "mehendi",
          name: "Mehendi",
          subtitle: "Henna & Melodies",
          time: "4:00 PM - 8:00 PM",
          date: "Friday, 19th February 2027",
          venueName: "Garden Terrace",
          venueAddress: "The Palace Lawns, Udaipur",
          mapUrl: "https://maps.google.com/?q=The+Palace+Lawns+Udaipur",
          dressCode: "Greens & Pastels",
          accent: "#9DAA80",
          image: "https://media.shubhweds.in/template-6/function-mehendi.webp"
        },
        {
          id: "sangeet",
          name: "Sangeet",
          subtitle: "Music, Dance & Celebration",
          time: "7:30 PM - 11:30 PM",
          date: "Saturday, 20th February 2027",
          venueName: "Grand Ballroom",
          venueAddress: "The Palace Lawns, Udaipur",
          mapUrl: "https://maps.google.com/?q=The+Palace+Lawns+Udaipur",
          dressCode: "Indo-Western Glam",
          accent: "#C78A9A",
          image: "https://media.shubhweds.in/template-6/function-sangeet.webp"
        },
        {
          id: "wedding",
          name: "Wedding",
          subtitle: "Shubh Vivah",
          time: "7:00 PM Onwards",
          date: "Sunday, 21st February 2027",
          venueName: "The Palace Lawns",
          venueAddress: "Udaipur, Rajasthan",
          mapUrl: "https://maps.google.com/?q=The+Palace+Lawns+Udaipur",
          dressCode: "Traditional Ethnic",
          accent: "#A8485E",
          image: "https://media.shubhweds.in/template-6/function-wedding.webp"
        }
      ],
      
      gallery: [
        {
          src: "/images/sunset.jpg",
          caption: "Where our journey began",
          note: "A serendipitous meeting that turned into a lifetime promise."
        },
        {
          src: "/images/always_you.jpg",
          caption: "Hand in hand towards forever",
          note: "Through every sunset, laughter, and adventure."
        },
        {
          src: "/images/pretty.jpg",
          caption: "Our little world of joy",
          note: "Every moment with you feels like home."
        },
        {
          src: "/images/queen.jpg",
          caption: "Forever begins here",
          note: "Looking ahead to a lifetime of love and togetherness."
        }
      ],
      
      rsvpDeadline: "Kindly reply by 10 January 2027",
      thanksMessage: "for your love and blessings. Our celebration will not be complete without you.",
      blessings: [
        "May you keep choosing each other, every single day.",
        "Wishing you a lifetime of laughter, harmony and long talks.",
        "May your home always bloom with peace and prosperity.",
        "Two souls, two families, one eternal love story.",
        "May every tomorrow be sweeter than today.",
        "Here's to a blessed lifetime of joy, laughter and togetherness.",
        "May Lord Ganesha shower your union with unending happiness.",
        "Blessings, divine light and boundless love to you both."
      ]
    }
  },
  kitten_wish: {
    id: "kitten_wish",
    name: "Kitten Wish",
    badge: "3D Plush Kitten 🐱💌",
    icon: "🐱💌",
    description: "An adorable 3D plush kitten walks in carrying an airmail letter, asks your custom question, reacts with tears if they say no, and celebrates with confetti when they say yes!",
    defaultTheme: {
      primary: "#f43f5e",
      bgGradient: "radial-gradient(circle at 50% 38%, #fff7f0 0%, #ffe6d4 54%, #ffd0b5 100%)",
      accent: "#fb923c"
    },
    defaultData: {
      mode: "wish",
      bgTheme: "peach",
      recipientName: "Lily",
      senderName: "Ethan",
      letterTitle: "A little note before I ask you something",
      letterText: "Lily, I have been trying to find the right moment for weeks, so I asked a very small, very serious kitten to help me.\n\nYou make ordinary days feel like a good song on repeat. I laugh more since I met you, I notice the sky more, and I catch myself smiling at my phone like an idiot.\n\nSo here is the thing I have been too nervous to say out loud.",
      signOff: "With love",
      question: "Will you go on a date with me?",
      yesSubtitle: "Saturday at seven. I am already smiling."
    }
  },
  kitten_sorry: {
    id: "kitten_sorry",
    name: "Comedy Sorry Kitten",
    badge: "Peach 3D Apology 🐱🍑",
    icon: "🐱🥺",
    description: "Warm peach 3D plush kitten apology: delivers an emergency comedy petition to stop being mad at you, cries 4K HD tears if she clicks 'Still mad', and wins her back with confetti & a treat coupon!",
    defaultTheme: {
      primary: "#fb7185",
      bgGradient: "radial-gradient(circle at 50% 38%, #fff7f0 0%, #ffe6d4 54%, #ffd0b5 100%)",
      accent: "#fb923c"
    },
    defaultData: {
      mode: "sorry",
      bgTheme: "peach",
      recipientName: "Cutie",
      senderName: "Your Certified Idiot",
      letterTitle: "Official Petition to Stop Being Mad at Me",
      letterText: "Cutie, I sent this very small, very dramatic kitten because I messed up and my brain clearly went on vacation without telling me.\n\nExhibit A: I am 100% an idiot. Exhibit B: Nobody else will share their fries with you AND still look at you like you're literal magic.\n\nSo please accept this tiny kitten, my formal apology, and let me make you fall for me all over again.",
      signOff: "Forever sorry (and yours)",
      question: "Do you forgive me & let me make you fall for me again?",
      yesBtnLabel: "Fine, forgiven 💖",
      noBtnLabel: "Still mad 😤",
      yesSubtitle: "Case closed! Preparing unlimited hugs, snacks, and making you fall for me all over again.",
      couponText: "🎟️ REDEEM: 1 Free Hug + Your Favorite Treat (No Expiry)"
    }
  },
  ever_tide: {
    id: "ever_tide",
    name: "Ever Tide Island",
    badge: "3D Sunset Multiplayer 🌅✈️",
    icon: "🌅✈️",
    description: "Explore a photoreal Three.js sunset beach cove together in real-time multiplayer: walk the sculpted dunes and wooden pier, inspect seaside memory easels, release sky lanterns, fly a custom airplane banner, sit by the sunset cinema, and propose under the floral gazebo.",
    defaultTheme: {
      primary: "#f43f5e",
      bgGradient: "linear-gradient(135deg, #3b2458 0%, #d86c70 50%, #ffd480 100%)",
      accent: "#fb923c"
    },
    defaultData: {
      recipientName: "Sophie",
      senderName: "Daniel",
      islandTitle: "Ever Tide Island",
      islandSubtitle: "A Private Sunset Cove Built For Us",
      planeMessage: "Sophie, will you marry me? ~ Daniel",
      sandSender: "Daniel",
      sandRecipient: "Sophie",
      couplePhoto: "/images/sunset.jpg",
      centerpieceTitle: "Our Sunset Horizon",
      centerpieceVideo: "/video/couple_memories.mp4",
      proposalQuestion: "Will you walk every shoreline of life with me?",
      proposalSubtitle: "From golden sunsets to starlit tides, every wave brings me closer to you.",
      proposalYesBtn: "Yes, Forever & Always! 💍💖",
      proposalCelebrateTitle: "She Said YES! 💍🌅",
      proposalCelebrateMsg: "Under the golden horizon and drifting lanterns, our forever begins.",
      audioTitle: "Ever Tide Sunset",
      audioSubtitle: "ISLAND SERENADE",
      audioSrc: "/audio/alfaaz.mp3",
      photos: [
        { id: 1, image: "/images/sunset.jpg", title: "Golden Horizon", date: "First Sunset", desc: "Standing by the tide watching the sky catch fire while talking for hours." },
        { id: 2, image: "/images/always_you.jpg", title: "Salt Air & Laughter", date: "Coastal Drive", desc: "Windows rolled down, ocean breeze in your hair, and laughter that never fades." },
        { id: 3, image: "/images/pretty.jpg", title: "Lantern Twilight", date: "Midnight Cove", desc: "Quiet whispers beside the shoreline bonfire under the emerging stars." },
        { id: 4, image: "/images/dream_girl.jpg", title: "Breathtaking Grace", date: "Golden Hour", desc: "Even the brightest sunset fades beside the warmth of your smile." },
        { id: 5, image: "/images/vogue_cover.jpg", title: "Island Footprints", date: "Our Escape", desc: "Two sets of footprints side by side along the wet shore." },
        { id: 6, image: "/images/queen.jpg", title: "My Forever Tide", date: "Always & Forever", desc: "Like the ocean and the shore, my heart always returns to you." }
      ]
    }
  },
  kintsugi_apology: {
    id: "kintsugi_apology",
    name: "After the Rain · Kintsugi",
    badge: "5-Act 3D Apology 🌧️✨",
    icon: "🌧️✨",
    description: "An intimate, emotionally restrained 5-Act WebGL apology journey: midnight rain, Kintsugi gold-veined 3D heart repair, distraction-free letter, interactive promise cards, and a respectful no-pressure closing.",
    defaultTheme: {
      primary: "#e5b87a",
      bgGradient: "linear-gradient(160deg, #0a0f1a 0%, #151e2e 55%, #3a2628 100%)",
      accent: "#d99b9b"
    },
    defaultData: {
      recipientName: "Maya",
      senderName: "Alex",
      openingHook: "I messed up, and you deserve more than a quick text.",
      acknowledgmentLines: [
        "I let my pride speak louder than my care for you, and that was unfair.",
        "You deserved patience, honesty, and to feel genuinely heard.",
        "I am not here to make excuses — only to own the hurt I caused."
      ],
      letterBody: "I've been sitting with the quiet since we last spoke, replaying how I handled things and wishing I had paused before speaking.\n\nYou mean far too much to me to leave things heavy between us. Even when I fall short, my care for you has never wavered.\n\nI don't expect an instant fix. I just wanted to put my heart somewhere calm, with no pressure and no noise — only the truth of how sorry I am.",
      promises: [
        {
          title: "Listen Before Reacting",
          detail: "When things feel tense, I will pause, breathe, and truly hear your side first."
        },
        {
          title: "Own My Mistakes Early",
          detail: "No defensiveness or silence — I will take responsibility the moment I slip up."
        },
        {
          title: "Protect Your Peace",
          detail: "Your feelings matter more than winning an argument. I will guard our calm."
        },
        {
          title: "Show Up Consistently",
          detail: "Not just in grand apologies, but in the small, everyday ways you deserve."
        }
      ],
      optionalPhotos: [],
      replyLink: "",
      whatsappNumber: "",
      accentMood: "Midnight Rain"
    }
  }
};

// Aliases for seamless routing and backward compatibility
TEMPLATES.wedding = TEMPLATES.wedding_invite;
TEMPLATES.shubh_weds = TEMPLATES.wedding_invite;

