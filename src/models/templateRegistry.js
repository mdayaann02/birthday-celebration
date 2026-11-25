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

  sorry: {
    id: "sorry",
    name: "Heartfelt Apology ('I'm Sorry')",
    badge: "Warm Candlelit Sanctuary 🕯️🕊️",
    icon: "🕊️",
    description: "Ultra-aesthetic intimate sanctuary: Candlelit gateway, illuminated wax-sealed parchment confession, four sacred understanding pillars, Lovable cascading polaroids with audio note, and hold-to-heal olive branch.",
    defaultTheme: {
      primary: "#e07a5f",
      bgGradient: "radial-gradient(120% 90% at 50% 10%, #24191d 0%, #171115 50%, #0d090c 100%)",
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
  }
};
