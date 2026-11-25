// src/models/templateRegistry.js - Templates Registry & Schema

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
    name: "Birthday Celebration",
    badge: "Most Popular 🎂",
    icon: "🎂",
    description: "Floating sky lanterns, 3D age milestone, photo loop ribbon, polaroid notes, Vogue flipbook, scratch card, VIP lanyard, and iMessage chat.",
    defaultTheme: {
      primary: "#f59e0b",
      bgGradient: "radial-gradient(circle at 50% 12%, #1e1938 0%, #111124 55%, #080812 100%)",
      accent: "#fbbf24"
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
      bgGradient: "radial-gradient(circle at 50% 15%, #2a1622 0%, #180c13 55%, #0c050a 100%)",
      accent: "#fde047"
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
    badge: "Kintsugi & Reconciliation 🥺🕊️",
    icon: "🥺",
    description: "Ultra-aesthetic heartfelt reconciliation: Interactive Kintsugi heart mending, cathartic venting room with projectile arsenal, legally binding penance deed, flip memories polaroids with voice apology memo, The Sweetheart Accords peace treaty with royal signature canvas, scratch-off reconciliation coupons, and runaway verdict.",
    defaultTheme: {
      primary: "#6366f1",
      bgGradient: "radial-gradient(circle at 50% 15%, #181c33 0%, #0f1222 55%, #070913 100%)",
      accent: "#fbbf24"
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
      primary: "#f43f5e",
      bgGradient: "radial-gradient(circle at 50% 15%, #350815 0%, #1e030b 55%, #0c0104 100%)",
      accent: "#fb7185"
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
      bgGradient: "radial-gradient(circle at 50% 12%, #1e293b 0%, #0f172a 55%, #020617 100%)",
      accent: "#f59e0b"
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
      primary: "#f59e0b",
      bgGradient: "radial-gradient(circle at 50% 12%, #fffcf0 0%, #fef3c7 45%, #fde68a 100%)",
      accent: "#d97706"
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
      bgGradient: "radial-gradient(circle at 50% 12%, #141c2e 0%, #0b111e 55%, #05080e 100%)",
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
    badge: "Barbie & Teddy Bear 🧸🎀",
    icon: "🎀",
    description: "Barbie Dreamhouse pink & plushie teddy bear sanctuary: 60FPS hanging plushie teddy bear swing arena with physics oscillations and tickle reactions, stolen wardrobe & teddy heist court, gossip safe dial, blackmail polaroids, and sisterhood crown.",
    defaultTheme: {
      primary: "#ec4899",
      bgGradient: "radial-gradient(circle at 50% 15%, #fff0f7 0%, #fce7f3 45%, #fbcfe8 100%)",
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
    badge: "Superbike & Bro-Code 🏍️💨",
    icon: "🏍️",
    description: "Asphalt speedway & nitro carbon-weave theme: 60FPS Superbike Highway Sprint arena with revving throttle and nitro afterburners, slamming fist bump centerpiece, Sacred Bhai Bro-Code Constitution with rubber stamp ratification, and brothers hall of fame.",
    defaultTheme: {
      primary: "#f59e0b",
      bgGradient: "radial-gradient(ellipse at 50% 0%, #1a2337 0%, #0e1524 50%, #070a10 100%)",
      accent: "#06b6d4"
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
        { title: "Gaming Battles 🎮", image: "/images/vogue_cover.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
        { title: "Brothers for Life 🤜🤛", image: "/images/sunset.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
      ],
      broCodeClauses: [
        { id: 1, title: "Clause 1: Never Snitch to Mom 🤐", text: "What happens in the sibling chaos stays strictly in the sibling chaos. Zero exceptions under parent interrogation." },
        { id: 2, title: "Clause 2: The Sacred Last Slice Rule 🍕", text: "You must always loudly ask 'Anyone want this?' while already taking a huge bite out of it." },
        { id: 3, title: "Clause 3: TV Controller & Shotgun Privilege 🎮", text: "He who shouts 'SHOTGUN' or grabs the player 1 controller first owns the sovereign rights forever." },
        { id: 4, title: "Clause 4: 2 AM Bailout Guarantee 🚗", text: "No questions asked. If your brother calls at 2 AM stranded with a flat tire or bad date, you pull up immediately." },
        { id: 5, title: "Clause 5: Instant Defense in Public 🛡️", text: "We might roast and tackle each other at home, but if anyone from the outside touches a hair on you, they answer to me." }
      ],
      letter: `Dear Bhai,

We've broken things, made crazy memories, fought like wild animals, and laughed until our stomachs hurt.

You're not just my brother; you're the one person I can count on anytime, anywhere, with zero questions asked.

Here's to the brotherhood that will never break. Keep being the absolute legend you are!

Fist bump forever, bro! 🤜🤛🔥`
    }
  }
};
