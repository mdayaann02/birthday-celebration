// src/models/templateRegistry.js - Templates Registry & Schema

export const TEMPLATES = {
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
      audioTitle: "Romantic Story",
      audioSubtitle: "BLOSSOM LOVE",
      audioSrc: "/audio/blossom_song.mp3",
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
      primary: "#ff4d6d",
      bgGradient: "linear-gradient(180deg, #0c0d14 0%, #171824 100%)",
      accent: "#d4af37"
    },
    defaultData: {
      recipientName: "Sweety",
      senderName: "Yours Truly",
      eventDate: "2026-11-25T00:00",
      enableCountdownLock: true,
      passcode: "1234",
      audioTitle: "Sweety's Song",
      audioSubtitle: "BIRTHDAY PLAYLIST",
      audioSrc: "/audio/song.mp3",
      age: "15",
      heroTitle: "Happy Birthday",
      heroSubtitle: "To the most special girl in my universe ✨",
      polaroids: [
        { title: "Baddie 😎", image: "/images/baddie.jpg", note: "You have that effortless aura and confidence that turns heads everywhere! 🌟" },
        { title: "Always You 🫶", image: "/images/always_you.jpg", note: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai, Sweety. 🫶" },
        { title: "Pretty ✨", image: "/images/pretty.jpg", note: "No poetry in this world can ever truly capture how breathtaking you look when you're just being yourself. 🌸" },
        { title: "Beautiful 🌸", image: "/images/beautiful.jpg", note: "Your heart is even more radiant than your smile, and that's saying a lot! ☀️" },
        { title: "Dream Girl 💫", image: "/images/dream_girl.jpg", note: "Before I met you, I thought perfection only existed in storybooks. 💖" },
        { title: "Queen 👑", image: "/images/queen.jpg", note: "May you always wear your invisible crown with happiness, peace, and endless love! 👑" }
      ],
      magazine: {
        title: "VOGUE SWEETY EDITION",
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
        title: "Happy Birthday Sweety!",
        message: "Wishing you the happiest year ahead filled with laughter, dreams achieved, and infinite love. You deserve the galaxy! 🎂✨"
      },
      chatMessages: [
        "Happppyeeee birthday Sweety ❤️🎂",
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
      audioTitle: "Our Love Symphony",
      audioSubtitle: "ANNIVERSARY EDITION",
      audioSrc: "/audio/song.mp3",
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
      primary: "#748ffc",
      bgGradient: "linear-gradient(180deg, #0e111a 0%, #171b29 100%)",
      accent: "#ff8787"
    },
    defaultData: {
      recipientName: "My Dearest",
      senderName: "Sincerely Yours",
      eventDate: "2026-11-22T00:00",
      enableCountdownLock: false,
      passcode: "0000",
      audioTitle: "Words From My Heart",
      audioSubtitle: "I'M SO SORRY",
      audioSrc: "/audio/song.mp3",
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
      audioTitle: "Can't Help Falling in Love",
      audioSubtitle: "VALENTINE SPECIAL",
      audioSrc: "/audio/song.mp3",
      heroTitle: "To the Girl Who Stole My Heart",
      heroSubtitle: "Every love song makes complete sense now that you're in my life 🌹",
      proposalQuestion: "Will You Be My Valentine & Forever? ❤️",
      loveLetter: "You walked into my life so gently, but turned it into the most magical journey. Your smile is my daily dose of peace, and your voice makes everything else fade away. I want to spend all my tomorrows making you smile as bright as you make mine."
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
      audioTitle: "Memories & Laughter",
      audioSubtitle: "BESTIE ANTHEM",
      audioSrc: "/audio/song.mp3",
      heroTitle: "Cheers to My Best Friend!",
      heroSubtitle: "To the one who knows all my secrets and still chooses to be seen in public with me! 😂",
      awardTitle: "OFFICIAL CERTIFICATE OF AWESOMENESS",
      awardReason: "Awarded for exceptional tolerance of my drama, late night gossips, and unmatched loyalty.",
      sillyMemories: [
        { title: "Late Night Talks", text: "Solving world problems at 2 AM instead of sleeping." },
        { title: "Unstoppable Laughs", text: "Laughing so hard at something nobody else found funny." },
        { title: "Always Having My Back", text: "Knowing exactly what I'm thinking with just one glance." }
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
      letter: `Dear Bhai,

We've broken things, made crazy memories, fought like wild animals, and laughed until our stomachs hurt.

You're not just my brother; you're the one person I can count on anytime, anywhere, with zero questions asked.

Here's to the brotherhood that will never break. Keep being the absolute legend you are!

Fist bump forever, bro! 🤜🤛🔥`
    }
  }
};
