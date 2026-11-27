// src/viewer/templates/birthdayThemes.js
// Centralized Relationship-Adaptive Theme Engine + Default Copy + Web Audio Gentle Melody Fallback

export const RELATIONSHIP_CATEGORIES = [
  { id: 'family', label: 'Family', icon: '🏡' },
  { id: 'friends', label: 'Friends', icon: '🥂' },
  { id: 'special', label: 'Mentors, Work & Special', icon: '✨' }
];

const BASE_DEFAULTS = {
  tracks: [
    { id: 1, title: 'Golden Birthday Acoustic', artist: 'Warm Guitar & Piano', src: '/audio/song.mp3', tag: 'BIRTHDAY THEME', duration: '2:45' },
    { id: 2, title: 'Blossom Reverie', artist: 'Orchestral Strings', src: '/audio/blossom_song.mp3', tag: 'CELEBRATION', duration: '3:58' },
    { id: 3, title: 'Alfaaz (Instrumental)', artist: 'Acoustic Ensemble', src: '/audio/alfaaz.mp3', tag: 'KEEPSAKE', duration: '3:42' }
  ],
  photos: [
    { image: '/images/sunset.jpg', date: 'Golden Hour', category: 'Milestones', caption: 'Chasing sunlit horizons and unforgettable evenings together.' },
    { image: '/images/always_you.jpg', date: 'Pure Joy', category: 'Candid', caption: 'The kind of laughter that makes time stand completely still.' },
    { image: '/images/pretty.jpg', date: 'Brightest Day', category: 'Portraits', caption: 'A radiant spirit that brings warmth into every single room.' },
    { image: '/images/dream_girl.jpg', date: 'Adventures', category: 'Travel', caption: 'Every journey feels lighter and brighter with you around.' },
    { image: '/images/queen.jpg', date: 'Celebration', category: 'Special', caption: 'Here is to another year of strength, grace, and big wins.' }
  ]
};

export const RELATIONSHIP_THEMES = {
  father: {
    id: 'father',
    category: 'family',
    label: 'Father',
    shortLabel: 'Dad / Father',
    emoji: '🧭',
    mood: 'Legacy & Steadfast Pride',
    palette: {
      bgDark: '#09101d',
      bgMid: '#131d31',
      bgCard: 'rgba(18, 28, 46, 0.86)',
      surfaceLight: '#f9f3e6',
      inkDark: '#1c1814',
      inkLight: '#f8f2e4',
      primary: '#d4a853',
      accent: '#e8c77b',
      secondary: '#6b4c35',
      glow: 'rgba(212, 168, 83, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'embers',
    revealType: 'compass',
    heroVisual: 'oak',
    acts: {
      preloaderSub: 'Unlocking a tribute of legacy & gratitude',
      act1Prompt: 'TOUCH TO UNLOCK COMPASS',
      act1Stage2Prompt: 'PULL THE BRASS LATCH TO BEGIN',
      act1Stage2Btn: 'Open Tribute',
      act2Kicker: 'A TRIBUTE TO STRENGTH & WISDOM',
      act2Tagline: 'Thank you for being our steady North Star through every season.',
      act3Chapter: 'CHAPTER II • THE HERITAGE CHRONICLE',
      act3Title: 'Milestones of Guidance & Pride',
      act4Chapter: 'CHAPTER III • SOUNDTRACK & GRATITUDE',
      act4Title: 'The Soundtrack of Our Memories',
      act4AppreciationTitle: "Reasons You're an Incredible Dad",
      act5Chapter: 'CHAPTER IV • KEEPSAKE ARCHIVE',
      act5Title: 'Moments Worth Framing Forever',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'Words From the Heart',
      act7Chapter: 'CHAPTER VI • NIGHT SKY WISHES',
      act7Title: 'Lanterns for the Year Ahead',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • OFFICIAL KEEPSAKE',
      act8Title: 'Certificate of Eternal Gratitude',
      act8Badge: 'HONORED & SEALED',
      finaleTitle: 'Always Proud to Call You Dad',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Dad',
      nickname: 'Hero',
      senderName: 'Your Family',
      age: '',
      heroNotes: [
        { label: 'North Star', text: 'Your quiet strength has always been the compass guiding our whole family.' },
        { label: 'Work Ethic', text: 'You taught us integrity not by lecturing, but by how you lived every day.' },
        { label: 'Safe Harbor', text: 'No matter how stormy life gets, one conversation with you brings calm.' },
        { label: 'Dad Jokes', text: 'Even the corniest jokes somehow always make the whole table laugh.' },
        { label: 'Generosity', text: 'You always put everyone else first without ever asking for applause.' },
        { label: 'Wisdom', text: 'Your advice ages like gold—we still carry your words everywhere.' }
      ],
      milestones: [
        { num: '01', tag: 'THE FOUNDATION', date: 'Early Years', title: 'Teaching Us to Stand Tall', desc: 'From bike rides to life lessons, you gave us the courage to try and never fear falling.' },
        { num: '02', tag: 'THE ANCHOR', date: 'Growing Up', title: 'Always Showing Up', desc: 'Through every school event, late-night drive, and big decision, you were always in our corner.' },
        { num: '03', tag: 'THE WISDOM', date: 'Turning Points', title: 'Steady Hands in Every Storm', desc: 'Watching how calmly you handle challenges taught us what true resilience looks like.' },
        { num: '04', tag: 'THE LAUGHS', date: 'Family Time', title: 'Weekend Stories & Warmth', desc: 'The best memories are simply sitting around together listening to your stories.' },
        { num: '05', tag: 'THE LEGACY', date: 'Today & Always', title: 'A Year of Health & Joy', desc: 'Today we celebrate the man who built so much love and strength around us.' }
      ],
      appreciationReasons: [
        'You lead with quiet dignity, patience, and an unshakeable heart.',
        'You always know how to fix what is broken—whether a bike or a tough day.',
        'Your sacrifices built the foundation for every dream we chase today.',
        'You listen without judgment and advise with genuine care.',
        'Simply being around you makes any place feel grounded and safe.'
      ],
      letterSalutation: 'Dearest Dad,',
      letterBody: 'Today is all about celebrating you—your wisdom, your humor, and the countless quiet ways you have supported us year after year.\n\nThank you for every lesson, every sacrifice, and every moment you stood firm so we could dream bigger. Everything good in us carries a piece of your example.\n\nWishing you a birthday filled with peace, great health, and deep pride in the family that loves you endlessly.',
      letterSignoff: 'With endless respect & love,',
      lanternWishes: [
        'May this year bring you calm mornings and deep contentment.',
        'Wishing you vibrant health, strength, and effortless joy.',
        'May every dream you still hold quietly come to life.',
        'Here is to more laughter around the dinner table together.',
        'May you always feel how deeply you are appreciated.'
      ],
      pactTitle: 'Certificate of Eternal Gratitude',
      pactVow: 'Hereby honoring a lifetime of steadfast love, wisdom, and quiet strength. May the year ahead reward you with health, adventure, and every happiness you deserve.',
      pactWitness: 'Signed with pride & gratitude',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  mother: {
    id: 'mother',
    category: 'family',
    label: 'Mother',
    shortLabel: 'Mom / Mother',
    emoji: '🌷',
    mood: 'Warmth, Grace & Blooming Love',
    palette: {
      bgDark: '#231317',
      bgMid: '#3a1f25',
      bgCard: 'rgba(46, 25, 31, 0.85)',
      surfaceLight: '#fdf6ef',
      inkDark: '#2b1b1e',
      inkLight: '#fdf6ef',
      primary: '#d97a76',
      accent: '#e2b46b',
      secondary: '#7a9a7e',
      glow: 'rgba(217, 122, 118, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'petals',
    revealType: 'peony',
    heroVisual: 'blossom',
    acts: {
      preloaderSub: 'Unfolding a blooming tribute of love',
      act1Prompt: 'TOUCH TO UNWRAP THE BLOOM',
      act1Stage2Prompt: 'PULL THE SILK RIBBON TO OPEN',
      act1Stage2Btn: 'Unfold Tribute',
      act2Kicker: 'HEART OF OUR HOME',
      act2Tagline: 'Your love is the warmth that makes every season bloom.',
      act3Chapter: 'CHAPTER II • BLOOMING MEMORIES',
      act3Title: 'Seasons of Grace & Care',
      act4Chapter: 'CHAPTER III • MELODIES & ADMIRATION',
      act4Title: 'Songs for Your Heart',
      act4AppreciationTitle: "Reasons You're an Extraordinary Mom",
      act5Chapter: 'CHAPTER IV • CHERISHED ALBUM',
      act5Title: 'Our Favorite Moments Together',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'A Letter Written in Gratitude',
      act7Chapter: 'CHAPTER VI • BLESSING LANTERNS',
      act7Title: 'Wishes Rising for You',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • KEEPSAKE TRIBUTE',
      act8Title: 'Tribute of Infinite Love',
      act8Badge: 'CHERISHED FOREVER',
      finaleTitle: 'Forever Grateful for You, Mom',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Mom',
      nickname: 'Sunshine',
      senderName: 'With All My Love',
      age: '',
      heroNotes: [
        { label: 'Warmest Hug', text: 'No matter how old we get, your hug still fixes everything in seconds.' },
        { label: 'Quiet Magic', text: 'You turn ordinary days into cozy memories without even trying.' },
        { label: 'Endless Grace', text: 'Your patience and kindness are the heartbeat of our whole family.' },
        { label: 'Best Cook', text: 'Nothing anywhere in the world compares to the comfort of your kitchen.' },
        { label: 'Biggest Cheerleader', text: 'You believed in us long before we knew how to believe in ourselves.' },
        { label: 'Radiant Soul', text: 'Your smile lights up every room the moment you walk in.' }
      ],
      milestones: [
        { num: '01', tag: 'FIRST LOVE', date: 'Day One', title: 'The Warmth That Raised Us', desc: 'Every lullaby, gentle word, and midnight comfort shaped the people we are today.' },
        { num: '02', tag: 'THE NURTURER', date: 'Growing Years', title: 'A Thousand Little Sacrifices', desc: 'You always noticed the smallest details and made sure everyone felt seen and cared for.' },
        { num: '03', tag: 'THE STRENGTH', date: 'Every Season', title: 'Grace Under Pressure', desc: 'You carry so much with such warmth and poise—you are truly our role model.' },
        { num: '04', tag: 'THE JOY', date: 'Shared Laughs', title: 'Tea Talks & Golden Mornings', desc: 'Sitting and chatting with you over tea remains our favorite therapy in the world.' },
        { num: '05', tag: 'TODAY', date: 'Your Birthday', title: 'Now It Is Your Turn to Shine', desc: 'Today we spoil you, celebrate you, and wish you a year of pure rest and joy.' }
      ],
      appreciationReasons: [
        'Your heart has an endless capacity to forgive, comfort, and love.',
        'You remember everyone’s favorite things and make every occasion feel magical.',
        'Your strength is gentle yet unbreakable—the true anchor of our home.',
        'You taught us empathy, warmth, and how to care deeply for others.',
        'Just hearing your voice on the phone makes any hard day feel lighter.'
      ],
      letterSalutation: 'Dearest Mom,',
      letterBody: 'Happy Birthday to the woman who gave us everything—warmth, patience, laughter, and a home filled with unconditional love.\n\nWe do not say it nearly enough, but every single good thing in our lives carries your fingerprints. Thank you for always being our safe place.\n\nMay this new year wrap you in the same tenderness and joy you so freely give to everyone around you.',
      letterSignoff: 'Always your grateful child,',
      lanternWishes: [
        'May your mornings be peaceful, unhurried, and full of sunlight.',
        'Wishing you glowing health and effortless happiness.',
        'May every prayer in your heart be answered gently.',
        'Here is to a year where you get pampered the way you deserve.',
        'May you always feel surrounded by the love you built.'
      ],
      pactTitle: 'Tribute of Infinite Love',
      pactVow: 'Dedicated to the heart of our family—promising more unhurried mornings, shared laughter, and endless appreciation for all that you are.',
      pactWitness: 'Sealed with infinite love',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  sister: {
    id: 'sister',
    category: 'family',
    label: 'Sister',
    shortLabel: 'Sister',
    emoji: '🦋',
    mood: 'Sparkle, Chaos & Unbreakable Bond',
    palette: {
      bgDark: '#1c1029',
      bgMid: '#2e1942',
      bgCard: 'rgba(41, 22, 60, 0.85)',
      surfaceLight: '#faf5ff',
      inkDark: '#231333',
      inkLight: '#faf5ff',
      primary: '#e11d74',
      accent: '#f5c469',
      secondary: '#c084fc',
      glow: 'rgba(225, 29, 116, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'sparkles',
    revealType: 'ribbon',
    heroVisual: 'blossom',
    acts: {
      preloaderSub: 'Unwrapping sparkles & sisterhood magic',
      act1Prompt: 'TOUCH TO UNWRAP KEEPSAKE',
      act1Stage2Prompt: 'PULL THE SATIN RIBBON',
      act1Stage2Btn: 'Untie & Celebrate',
      act2Kicker: 'BUILT-IN BEST FRIEND FOR LIFE',
      act2Tagline: 'Half chaos, half comfort, 100% irreplaceable.',
      act3Chapter: 'CHAPTER II • SISTERHOOD TIMELINE',
      act3Title: 'From Childhood Chaos to Forever',
      act4Chapter: 'CHAPTER III • OUR PLAYLIST & HYPE',
      act4Title: 'The Sisterhood Soundtrack',
      act4AppreciationTitle: "Why You're the Best Sister Ever",
      act5Chapter: 'CHAPTER IV • CORE MEMORIES',
      act5Title: 'Snapshots of Our Chaos & Joy',
      act6Chapter: 'CHAPTER V • THE SEALED NOTE',
      act6Title: 'Just Between Us',
      act7Chapter: 'CHAPTER VI • WISHES IN THE SKY',
      act7Title: 'Lanterns for Your Brightest Year',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • SISTERHOOD PACT',
      act8Title: 'Official Sisterhood Pact',
      act8Badge: 'SISTERHOOD VERIFIED',
      finaleTitle: 'Always in Your Corner, Sis',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Sis',
      nickname: 'Queen',
      senderName: 'Your Sibling',
      age: '',
      heroNotes: [
        { label: 'Secret Keeper', text: 'You know all my secrets and somehow still love me anyway.' },
        { label: 'Wardrobe Thief', text: 'Yes, you look better in my clothes—consider this your birthday pass.' },
        { label: 'Main Character', text: 'Your energy lights up every single room you walk into.' },
        { label: '2 AM Therapist', text: 'Always one call away with honest advice and zero judgment.' },
        { label: 'Inside Jokes', text: 'One look across the room and we are both trying not to laugh.' },
        { label: 'Unstoppable', text: 'Watching you chase your goals makes me so ridiculously proud.' }
      ],
      milestones: [
        { num: '01', tag: 'THE BEGINNING', date: 'Childhood', title: 'Partners in Crime Since Day One', desc: 'Fighting over the TV remote one minute, teaming up against the world the next.' },
        { num: '02', tag: 'THE SECRETS', date: 'Teen Years', title: 'Late-Night Whisper Sessions', desc: 'Countless hours talking about everything and nothing when we were supposed to be asleep.' },
        { num: '03', tag: 'THE GLOW UP', date: 'Growing Up', title: 'Becoming Best Friends', desc: 'Somewhere along the way, being siblings turned into the best friendship imaginable.' },
        { num: '04', tag: 'THE HYPE', date: 'Big Wins', title: 'Your Loudest Cheerleader', desc: 'Every milestone you hit feels like a win for both of us.' },
        { num: '05', tag: 'THIS YEAR', date: 'Birthday', title: 'Your Brightest Chapter Yet', desc: 'Get ready for big dreams, endless laughs, and unforgettable memories.' }
      ],
      appreciationReasons: [
        'You always tell me the truth, even when I need a reality check.',
        'You turn boring errands into hilarious mini-adventures.',
        'Your kindness and loyalty to the people you love is unmatched.',
        'You never let me settle for less than I deserve.',
        'Life would be way too quiet and boring without you in it.'
      ],
      letterSalutation: 'Hey Sis,',
      letterBody: 'Happy Birthday to my built-in best friend, my favorite hype woman, and the only person who truly gets all our family inside jokes.\n\nThank you for every late-night talk, every laugh until our stomachs hurt, and for always having my back no matter what.\n\nGo make this year unforgettable—you deserve every single sparkle coming your way!',
      letterSignoff: 'Love you forever,',
      lanternWishes: [
        'May this year bring bold wins and zero stress.',
        'Wishing you glowing confidence and nonstop laughter.',
        'May every dream on your vision board come true.',
        'Here is to more spontaneous coffee runs and road trips.',
        'Always remember how deeply loved you are.'
      ],
      pactTitle: 'Official Sisterhood Pact',
      pactVow: 'Hereby bound by lifetime loyalty: unlimited 2 AM phone calls, honest outfit checks, shared snacks, and cheering each other on forever.',
      pactWitness: 'Signed & sealed by your sibling',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  brother: {
    id: 'brother',
    category: 'family',
    label: 'Brother',
    shortLabel: 'Brother',
    emoji: '⚡',
    mood: 'Loyalty, Adventure & Brotherhood',
    palette: {
      bgDark: '#0b1120',
      bgMid: '#162038',
      bgCard: 'rgba(20, 30, 52, 0.88)',
      surfaceLight: '#f8fafc',
      inkDark: '#0f172a',
      inkLight: '#f8fafc',
      primary: '#f59e0b',
      accent: '#38bdf8',
      secondary: '#94a3b8',
      glow: 'rgba(245, 158, 11, 0.4)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'sparks',
    revealType: 'flare',
    heroVisual: 'constellation',
    acts: {
      preloaderSub: 'Igniting the brotherhood celebration',
      act1Prompt: 'TOUCH TO IGNITE THE VAULT',
      act1Stage2Prompt: 'PULL THE IGNITION LEVER',
      act1Stage2Btn: 'Launch Celebration',
      act2Kicker: 'DAY-ONE BROTHERHOOD',
      act2Tagline: 'Respect, loyalty, and a lifetime of having each other’s backs.',
      act3Chapter: 'CHAPTER II • THE BROTHERHOOD LOG',
      act3Title: 'Milestones & Shared Adventures',
      act4Chapter: 'CHAPTER III • ANTHEMS & RESPECT',
      act4Title: 'The Brotherhood Mixtape',
      act4AppreciationTitle: "Why You're a Legend, Bro",
      act5Chapter: 'CHAPTER IV • MEMORY REEL',
      act5Title: 'Snapshots from the Journey',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'Real Talk on Your Birthday',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Wishes for Your Next Level',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • BROTHERHOOD OATH',
      act8Title: 'Official Brotherhood Oath',
      act8Badge: 'OATH SEALED',
      finaleTitle: 'Always Got Your Back, Bro',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Bro',
      nickname: 'Legend',
      senderName: 'Your Sibling',
      age: '',
      heroNotes: [
        { label: 'Day-One Ally', text: 'No matter what happens, I always know you are in my corner.' },
        { label: 'Clutch Factor', text: 'When things get tough, you stay calm and step up every single time.' },
        { label: 'Humor', text: 'Nobody else can make a serious situation hilarious in two seconds.' },
        { label: 'Drive', text: 'Seeing you level up year after year is genuinely inspiring.' },
        { label: 'Loyalty', text: 'Family loyalty with you is never just words—it is action.' },
        { label: 'Next Level', text: 'This next year is going to be your biggest breakthrough yet.' }
      ],
      milestones: [
        { num: '01', tag: 'ORIGIN STORY', date: 'Childhood', title: 'Growing Up Side by Side', desc: 'Backyard games, friendly rivalries, and learning how to take on the world together.' },
        { num: '02', tag: 'THE TEAM', date: 'School Days', title: 'Always Having Each Other’s Back', desc: 'Through every awkward phase and big win, we were always a united front.' },
        { num: '03', tag: 'THE GRIND', date: 'Leveling Up', title: 'Watching You Become Who You Are', desc: 'Seeing your discipline, ambition, and character grow has been awesome.' },
        { num: '04', tag: 'THE HANGOUTS', date: 'Late Nights', title: 'Food Runs & Real Talks', desc: 'Late-night drives and honest conversations that recharge the soul.' },
        { num: '05', tag: 'NEW CHAPTER', date: 'Today', title: 'To Bigger Wins Ahead', desc: 'Here is to conquering new goals and celebrating every step.' }
      ],
      appreciationReasons: [
        'You never hesitate to show up when someone in the family needs help.',
        'You bring confidence and good energy wherever you go.',
        'You keep things real—no fake hype, just genuine support.',
        'You work hard for your goals without complaining.',
        'Proud to call you my brother today and every day.'
      ],
      letterSalutation: 'Happy Birthday Bro,',
      letterBody: 'We might not always get super sentimental, but today is worth saying it out loud: I am genuinely proud of the person you are.\n\nThank you for always having my back, for all the laughs, and for being someone I can always count on without a second thought.\n\nGo crush this next year—bigger wins, great health, and unforgettable adventures await.',
      letterSignoff: 'Respect & love always,',
      lanternWishes: [
        'May every goal you are grinding for land in your hands.',
        'Wishing you unstoppable momentum and rock-solid health.',
        'Here is to epic trips and unforgettable nights ahead.',
        'May peace and success follow every move you make.',
        'Keep shining and staying true to yourself.'
      ],
      pactTitle: 'Brotherhood Oath',
      pactVow: 'Always in each other’s corner, always keeping it real, and always celebrating each other’s wins—no matter where life takes us.',
      pactWitness: 'Signed in brotherhood',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  grandparent: {
    id: 'grandparent',
    category: 'family',
    label: 'Grandparent',
    shortLabel: 'Grandma / Grandpa',
    emoji: '🕰️',
    mood: 'Timeless Heirloom & Blessings',
    palette: {
      bgDark: '#1f0e13',
      bgMid: '#361821',
      bgCard: 'rgba(44, 19, 27, 0.88)',
      surfaceLight: '#f7efe2',
      inkDark: '#261318',
      inkLight: '#f7efe2',
      primary: '#d4a853',
      accent: '#f0d290',
      secondary: '#8c2f39',
      glow: 'rgba(212, 168, 83, 0.4)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'candlelight',
    revealType: 'locket',
    heroVisual: 'oak',
    acts: {
      preloaderSub: 'Opening a timeless family heirloom',
      act1Prompt: 'TOUCH TO OPEN HEIRLOOM LOCKET',
      act1Stage2Prompt: 'UNCLASP THE GOLDEN LOCKET',
      act1Stage2Btn: 'Enter Celebration',
      act2Kicker: 'ROOTS OF OUR FAMILY TREE',
      act2Tagline: 'Your stories, blessings, and warmth are our greatest treasure.',
      act3Chapter: 'CHAPTER II • TIMELESS CHAPTERS',
      act3Title: 'A Legacy Written in Love',
      act4Chapter: 'CHAPTER III • GOLDEN MELODIES',
      act4Title: 'Timeless Classics & Blessings',
      act4AppreciationTitle: 'Why You Mean the World to Us',
      act5Chapter: 'CHAPTER IV • FAMILY TREASURY',
      act5Title: 'Cherished Moments Across Generations',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'With Deepest Affection',
      act7Chapter: 'CHAPTER VI • CANDLELIGHT WISHES',
      act7Title: 'Lanterns of Health & Peace',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • FAMILY HEIRLOOM',
      act8Title: 'Family Heirloom Tribute',
      act8Badge: 'BLESSED & HONORED',
      finaleTitle: 'Forever Cherished Across Generations',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Dearest Grandparent',
      nickname: 'Heart of Our Family',
      senderName: 'Your Grandchildren',
      age: '',
      heroNotes: [
        { label: 'Storyteller', text: 'Your stories connect us to our roots and fill our hearts with wonder.' },
        { label: 'Warmest Welcome', text: 'Visiting you always feels like stepping into the coziest place on earth.' },
        { label: 'Gentle Wisdom', text: 'A few kind words from you carry decades of grace and perspective.' },
        { label: 'Pure Joy', text: 'Your smile when the whole family gathers is priceless.' },
        { label: 'Blessings', text: 'Your prayers and love have carried our family through every season.' },
        { label: 'Timeless', text: 'Every year with you is a gift we never take for granted.' }
      ],
      milestones: [
        { num: '01', tag: 'THE ROOTS', date: 'Heritage', title: 'Building a Family of Love', desc: 'Everything our family enjoys today grew from the kindness and values you planted.' },
        { num: '02', tag: 'THE STORIES', date: 'Golden Memories', title: 'Afternoons of Stories & Treats', desc: 'Your kitchen table and cozy living room hold our sweetest childhood memories.' },
        { num: '03', tag: 'THE GUIDANCE', date: 'Wisdom', title: 'Patience & Grace', desc: 'You taught us to slow down, appreciate simple joys, and stay united.' },
        { num: '04', tag: 'THE GATHERINGS', date: 'Celebrations', title: 'Laughter Across Generations', desc: 'Nothing beats seeing everyone together smiling around you.' },
        { num: '05', tag: 'TODAY', date: 'Birthday', title: 'Celebrating Your Beautiful Life', desc: 'Wishing you comfort, laughter, and radiant health every single day.' }
      ],
      appreciationReasons: [
        'Your hugs carry a warmth that nothing else in the world can match.',
        'You always spoil us with love, patience, and gentle encouragement.',
        'Your life is a living example of resilience, kindness, and grace.',
        'Every family tradition feels richer because of you.',
        'We are endlessly grateful to celebrate another year with you.'
      ],
      letterSalutation: 'Dearest Grandparent,',
      letterBody: 'Happy Birthday to the sweetest soul in our family! Every memory we have with you—from your warm stories to your gentle smile—is something we hold close to our hearts.\n\nThank you for loving us unconditionally and for being the beautiful foundation of our whole family.\n\nMay this year bring you peaceful days, bright health, and endless reasons to smile.',
      letterSignoff: 'With all our love and blessings,',
      lanternWishes: [
        'Wishing you gentle mornings, comfort, and radiant health.',
        'May every day be filled with family warmth and sweet laughter.',
        'May your heart feel how deeply you are treasured.',
        'Here is to many more joyous celebrations together.',
        'Blessings of peace and happiness today and always.'
      ],
      pactTitle: 'Family Heirloom Tribute',
      pactVow: 'Honoring the cherished roots of our family with endless gratitude, more shared stories, and unhurried afternoons together.',
      pactWitness: 'Signed by your loving family',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  child: {
    id: 'child',
    category: 'family',
    label: 'Son / Daughter',
    shortLabel: 'Son / Daughter',
    emoji: '🌟',
    mood: 'Pure Joy, Pride & Bright Futures',
    palette: {
      bgDark: '#101730',
      bgMid: '#1d2852',
      bgCard: 'rgba(24, 34, 68, 0.86)',
      surfaceLight: '#fffaf0',
      inkDark: '#171d36',
      inkLight: '#fffaf0',
      primary: '#fbbf24',
      accent: '#fb7185',
      secondary: '#60a5fa',
      glow: 'rgba(251, 191, 36, 0.4)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'sparkles',
    revealType: 'ribbon',
    heroVisual: 'constellation',
    acts: {
      preloaderSub: 'Opening a birthday keepsake full of pride',
      act1Prompt: 'TOUCH TO UNWRAP YOUR SURPRISE',
      act1Stage2Prompt: 'PULL THE GOLDEN RIBBON',
      act1Stage2Btn: 'Open Celebration',
      act2Kicker: 'OUR GREATEST JOY',
      act2Tagline: 'Watching you grow into who you are is the greatest privilege of our lives.',
      act3Chapter: 'CHAPTER II • GROWING UP BRIGHT',
      act3Title: 'Milestones That Made Us Smile',
      act4Chapter: 'CHAPTER III • JOYFUL MELODIES',
      act4Title: 'Your Celebration Soundtrack',
      act4AppreciationTitle: 'Things We Love Most About You',
      act5Chapter: 'CHAPTER IV • MEMORY ALBUM',
      act5Title: 'Golden Moments Through the Years',
      act6Chapter: 'CHAPTER V • A NOTE FROM US',
      act6Title: 'Always Proud of You',
      act7Chapter: 'CHAPTER VI • WISHING SKY',
      act7Title: 'Lanterns for Your Bright Future',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • FOREVER BLESSING',
      act8Title: "Parent's Forever Blessing",
      act8Badge: 'LOVED BEYOND MEASURE',
      finaleTitle: 'Shoot for the Stars, Sweetheart',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Sweetheart',
      nickname: 'Star',
      senderName: 'Mom & Dad',
      age: '',
      heroNotes: [
        { label: 'Bright Mind', text: 'Your curiosity and creativity amaze us every single day.' },
        { label: 'Kind Heart', text: 'The way you care for others makes us prouder than words can say.' },
        { label: 'Pure Joy', text: 'Your laugh is still our favorite sound in the entire world.' },
        { label: 'Courage', text: 'Never be afraid to dream big—we will always catch you if you stumble.' },
        { label: 'Unique You', text: 'Stay true to your wonderful, original self.' },
        { label: 'Limitless', text: 'The whole world is waiting for the magic you bring.' }
      ],
      milestones: [
        { num: '01', tag: 'FIRST BREATH', date: 'Day One', title: 'The Day You Changed Our World', desc: 'From the very first moment we held you, life became brighter and infinitely more meaningful.' },
        { num: '02', tag: 'FIRST STEPS', date: 'Little Years', title: 'Endless Wonder & Giggles', desc: 'Every tiny discovery and bedtime story is etched in our hearts forever.' },
        { num: '03', tag: 'GROWING', date: 'School & Dreams', title: 'Finding Your Own Spark', desc: 'Watching you discover your passions and talents fills us with joy.' },
        { num: '04', tag: 'CHARACTER', date: 'Today', title: 'Kind, Brave & Brilliant', desc: 'Seeing the wonderful person you are becoming is our proudest reward.' },
        { num: '05', tag: 'THE FUTURE', date: 'Ahead', title: 'Your Brightest Year Awaits', desc: 'Dream boldly, laugh loudly, and know you are always deeply loved.' }
      ],
      appreciationReasons: [
        'Your smile brings instant sunshine into our home.',
        'You have a generous, thoughtful heart that shines naturally.',
        'Your determination when you care about something is inspiring.',
        'You make every family moment ten times happier.',
        'We love you more than all the stars in the sky.'
      ],
      letterSalutation: 'Dearest Sweetheart,',
      letterBody: 'Happy Birthday! No matter how tall you grow or how many candles are on the cake, you will always be our greatest joy.\n\nBe brave enough to chase every dream, kind enough to lift others up, and gentle enough to enjoy every little moment.\n\nWe are cheering for you today, tomorrow, and always.',
      letterSignoff: 'With endless love,',
      lanternWishes: [
        'May your year be packed with laughter, learning, and magic.',
        'Wishing you courage to chase every big dream.',
        'May you always stay surrounded by true friends and warmth.',
        'Here is to confidence, health, and pure happiness.',
        'Remember: you are loved beyond measure.'
      ],
      pactTitle: "Parent's Forever Blessing",
      pactVow: 'No matter how far you fly or how big you dream, you will always have a safe harbor, our loudest applause, and unconditional love at home.',
      pactWitness: 'Signed with endless pride',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  relative: {
    id: 'relative',
    category: 'family',
    label: 'Uncle / Aunt',
    shortLabel: 'Uncle / Aunt',
    emoji: '🌿',
    mood: 'Cherished Family Bond',
    palette: {
      bgDark: '#0d1f22',
      bgMid: '#173439',
      bgCard: 'rgba(18, 42, 46, 0.86)',
      surfaceLight: '#faf4ea',
      inkDark: '#16282a',
      inkLight: '#faf4ea',
      primary: '#e2a84b',
      accent: '#6ee7b7',
      secondary: '#94a3b8',
      glow: 'rgba(226, 168, 75, 0.4)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'golddust',
    revealType: 'scroll',
    heroVisual: 'oak',
    acts: {
      preloaderSub: 'Preparing a warm family birthday tribute',
      act1Prompt: 'TOUCH TO UNSEAL TRIBUTE',
      act1Stage2Prompt: 'OPEN THE GOLDEN CREST',
      act1Stage2Btn: 'Begin Celebration',
      act2Kicker: 'CHERISHED FAMILY FAVORITE',
      act2Tagline: 'Always bringing wisdom, warmth, and the best energy to every gathering.',
      act3Chapter: 'CHAPTER II • FAMILY MEMORIES',
      act3Title: 'Moments We Always Smile About',
      act4Chapter: 'CHAPTER III • MUSIC & APPRECIATION',
      act4Title: 'A Warm Birthday Score',
      act4AppreciationTitle: 'Why You Are Everyone’s Favorite',
      act5Chapter: 'CHAPTER IV • KEEPSAKE PHOTOS',
      act5Title: 'Snapshots of Family Joy',
      act6Chapter: 'CHAPTER V • SEALED WISHES',
      act6Title: 'A Heartfelt Birthday Note',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Lanterns of Joy & Prosperity',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • GRATITUDE SEAL',
      act8Title: 'Family Gratitude Seal',
      act8Badge: 'HONORED & APPRECIATED',
      finaleTitle: 'Wishing You a Wonderful Year Ahead',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Favorite Uncle / Aunt',
      nickname: 'Family Legend',
      senderName: 'With Warmest Wishes',
      age: '',
      heroNotes: [
        { label: 'Best Advice', text: 'Always ready with wise perspective and zero judgment.' },
        { label: 'Life of the Party', text: 'Every family gathering gets ten times livelier when you arrive.' },
        { label: 'Generous Spirit', text: 'Your kindness and generosity leave a mark on everyone.' },
        { label: 'Great Stories', text: 'We could listen to your stories and jokes all evening.' },
        { label: 'Role Model', text: 'We admire the warmth and grace you carry every day.' },
        { label: 'Cheers', text: 'Here is to health, happiness, and new adventures!' }
      ],
      milestones: [
        { num: '01', tag: 'WARMTH', date: 'Always', title: 'The Coolest Presence in the Family', desc: 'Somehow you always bridge generations with effortless humor and care.' },
        { num: '02', tag: 'GATHERINGS', date: 'Holidays', title: 'Unforgettable Family Celebrations', desc: 'Meals, laughs, and late evening chats that everyone remembers fondly.' },
        { num: '03', tag: 'GUIDANCE', date: 'Life Advice', title: 'Always in Our Corner', desc: 'Thank you for encouraging us and cheering on every milestone.' },
        { num: '04', tag: 'TODAY', date: 'Birthday', title: 'Celebrating You Big Time', desc: 'Wishing you a year full of peace, travel, and great company.' }
      ],
      appreciationReasons: [
        'You make every family event warmer and brighter.',
        'Your kindness and generosity never go unnoticed.',
        'You always know how to make people feel welcome and heard.',
        'Your sense of humor keeps everyone smiling.',
        'We are so lucky to have you in our family!'
      ],
      letterSalutation: 'Dear Uncle / Aunt,',
      letterBody: 'Happy Birthday! Thank you for always bringing warmth, laughter, and encouragement into our lives.\n\nEvery family is blessed when they have someone as thoughtful and joyful as you. Wishing you radiant health, exciting adventures, and a year filled with happiness.',
      letterSignoff: 'Warmest birthday wishes,',
      lanternWishes: [
        'Wishing you vibrant health and peaceful days.',
        'May this year bring exciting travels and new joys.',
        'Cheers to more unforgettable family dinners together.',
        'May every wish in your heart come true.'
      ],
      pactTitle: 'Family Gratitude Seal',
      pactVow: 'Honoring a cherished family bond with endless respect, warm wishes, and many more joyful gatherings ahead.',
      pactWitness: 'Signed with family love',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  cousin: {
    id: 'cousin',
    category: 'family',
    label: 'Cousin',
    shortLabel: 'Cousin',
    emoji: '🎉',
    mood: 'Built-In Bestie & Family',
    palette: {
      bgDark: '#20122c',
      bgMid: '#341e47',
      bgCard: 'rgba(46, 26, 63, 0.86)',
      surfaceLight: '#fff7ed',
      inkDark: '#23142e',
      inkLight: '#fff7ed',
      primary: '#fb923c',
      accent: '#f472b6',
      secondary: '#a78bfa',
      glow: 'rgba(251, 146, 60, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'confetti',
    revealType: 'ribbon',
    heroVisual: 'memoryTree',
    acts: {
      preloaderSub: 'Loading cousin chaos & birthday vibes',
      act1Prompt: 'TOUCH TO UNWRAP SURPRISE',
      act1Stage2Prompt: 'PULL TO LAUNCH THE PARTY',
      act1Stage2Btn: 'Let’s Celebrate',
      act2Kicker: 'FIRST FRIEND, FOREVER FAMILY',
      act2Tagline: 'Childhood chaos, secret alliances, and non-stop laughs.',
      act3Chapter: 'CHAPTER II • COUSIN CHRONICLES',
      act3Title: 'From Kid Table to Today',
      act4Chapter: 'CHAPTER III • MIXTAPE & VIBES',
      act4Title: 'The Cousin Crew Soundtrack',
      act4AppreciationTitle: "Why You're the Best Cousin Ever",
      act5Chapter: 'CHAPTER IV • MEMORY REEL',
      act5Title: 'Snapshots of Our Best Times',
      act6Chapter: 'CHAPTER V • SEALED NOTE',
      act6Title: 'Birthday Note Just for You',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Send Your Wishes Up',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • COUSINHOOD PACT',
      act8Title: 'Official Cousinhood Pact',
      act8Badge: 'CREW VERIFIED',
      finaleTitle: 'Cheers to Another Epic Year!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Cuz',
      nickname: 'Partner in Crime',
      senderName: 'Your Favorite Cousin',
      age: '',
      heroNotes: [
        { label: 'Kids Table', text: 'Surviving family gatherings was always 10x better with you around.' },
        { label: 'Zero Filter', text: 'One glance across the room and we already know what the other is thinking.' },
        { label: 'Core Memories', text: 'Sleepovers, late-night snacks, and laughing until nobody could breathe.' },
        { label: 'Support', text: 'No matter how busy life gets, we always pick right back up.' },
        { label: 'Iconic', text: 'Honestly, we are the elite branch of the family tree.' }
      ],
      milestones: [
        { num: '01', tag: 'DAY ONE', date: 'Childhood', title: 'Ruling the Kids Table', desc: 'Making up games and causing harmless chaos at every family party.' },
        { num: '02', tag: 'THE SECRETS', date: 'Growing Up', title: 'Midnight Talks & Snacks', desc: 'Sneaking snacks and talking way past bedtime.' },
        { num: '03', tag: 'ADULTHOOD', date: 'Now', title: 'Friends by Choice, Family by Blood', desc: 'Still my favorite person to catch up with and laugh alongside.' },
        { num: '04', tag: 'NEXT UP', date: 'This Year', title: 'Big Wins & Epic Hangouts', desc: 'Wishing you a year of huge milestones and unforgettable memories.' }
      ],
      appreciationReasons: [
        'You make every family occasion genuinely fun.',
        'You get all the family lore without any explanation needed.',
        'You are always down for a good laugh and good food.',
        'Your energy and kindness light up every room.',
        'Lucky to have a cousin who feels like a best friend!'
      ],
      letterSalutation: 'Hey Cuz,',
      letterBody: 'Happy Birthday!! Honestly, family gatherings wouldn’t be half as fun without you.\n\nThank you for all the laughs, the inside jokes, and for always being my built-in best friend. Hope this next year brings you massive wins, great health, and epic adventures!',
      letterSignoff: 'Your favorite cousin,',
      lanternWishes: [
        'May this year bring big wins and zero drama.',
        'Cheers to more late-night laughs and great food.',
        'Wishing you happiness, success, and pure good vibes.',
        'May every dream you chase land effortlessly.'
      ],
      pactTitle: 'Official Cousinhood Pact',
      pactVow: 'Hereby promising to always sit together at family events, keep each other’s secrets, and celebrate every milestone together.',
      pactWitness: 'Signed by your favorite cousin',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  'best-friend': {
    id: 'best-friend',
    category: 'friends',
    label: 'Best Friend',
    shortLabel: 'Bestie',
    emoji: '✨',
    mood: 'Electric Nostalgia & Core Memories',
    palette: {
      bgDark: '#12142d',
      bgMid: '#1f234d',
      bgCard: 'rgba(24, 28, 61, 0.88)',
      surfaceLight: '#fff8ef',
      inkDark: '#151836',
      inkLight: '#fff8ef',
      primary: '#fb7185',
      accent: '#fbbf24',
      secondary: '#818cf8',
      glow: 'rgba(251, 113, 133, 0.45)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'confetti',
    revealType: 'confetti',
    heroVisual: 'memoryTree',
    acts: {
      preloaderSub: 'Cueing up core memories & birthday confetti',
      act1Prompt: 'TOUCH TO POP THE SURPRISE',
      act1Stage2Prompt: 'PULL FOR CONFETTI LAUNCH',
      act1Stage2Btn: 'Blast Off',
      act2Kicker: 'CERTIFIED LIFETIME BESTIE',
      act2Tagline: 'Thank you for turning ordinary days into legendary core memories.',
      act3Chapter: 'CHAPTER II • CORE MEMORY TIMELINE',
      act3Title: 'Our Greatest Hits Together',
      act4Chapter: 'CHAPTER III • MIXTAPE & HYPE',
      act4Title: 'Our Unofficial Soundtrack',
      act4AppreciationTitle: "Why You're My Favorite Bestie",
      act5Chapter: 'CHAPTER IV • PHOTO VAULT',
      act5Title: 'Snapshots of Pure Chaos & Joy',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'Real Appreciation Hours',
      act7Chapter: 'CHAPTER VI • WISHING SKY',
      act7Title: 'Launch Birthday Lanterns',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • BESTIE CONTRACT',
      act8Title: 'Lifetime Bestie Contract',
      act8Badge: 'BESTIES FOR LIFE',
      finaleTitle: 'Here’s to 100 More Years of Friendship!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Bestie',
      nickname: 'Day One',
      senderName: 'Your Best Friend',
      age: '',
      heroNotes: [
        { label: 'Core Memory', text: 'Nobody else on earth could make me laugh until my ribs ache like you do.' },
        { label: 'Zero Judgment', text: 'You know my weirdest thoughts and still hype me up every single day.' },
        { label: '2 AM Call', text: 'Emergency rant or random meme—you always answer with the best energy.' },
        { label: 'Main Character', text: 'This is officially your main-character year. Own every second of it!' },
        { label: 'Ride or Die', text: 'Through every plot twist, you have been my absolute rock.' },
        { label: 'Iconic Duo', text: 'Honestly, we deserve a documentary for how iconic we are.' }
      ],
      milestones: [
        { num: '01', tag: 'THE CROSSOVER', date: 'Day One', title: 'How Did We Even Become Friends?', desc: 'One random conversation turned into an unbreakable bond that changed everything.' },
        { num: '02', tag: 'THE CHAOS', date: 'Golden Era', title: 'Laughing Over Literally Nothing', desc: 'Inside jokes so niche nobody else would ever understand them.' },
        { num: '03', tag: 'THE ANCHOR', date: 'Tough Days', title: 'Showing Up When It Mattered', desc: 'You never flinched when things got messy—you just showed up with snacks and advice.' },
        { num: '04', tag: 'THE ADVENTURES', date: 'Recently', title: 'Spontaneous Plans & Best Nights', desc: 'The best nights were always the ones we never even planned.' },
        { num: '05', tag: 'NEXT SEASON', date: 'Today', title: 'Your Best Year Yet Begins Now', desc: 'Bigger wins, louder laughs, and zero bad vibes allowed!' }
      ],
      appreciationReasons: [
        'You bring instant serotonin the second you walk into the room.',
        'You tell me the honest truth with love and zero ego.',
        'You celebrate my wins like they are your own.',
        'You make even boring errands feel like a comedy show.',
        'Life is genuinely 100x better because you are my best friend.'
      ],
      letterSalutation: 'To my favorite human,',
      letterBody: 'Happy Birthday!! I put this together because a regular text message could never capture how grateful I am to have you in my life.\n\nThank you for every late-night voice note, every reality check, every uncontrollable laugh, and for being the most loyal best friend anyone could ask for.\n\nI hope this year brings you everything you have been praying for—and then some!',
      letterSignoff: 'Forever your bestie,',
      lanternWishes: [
        'May this year bring massive wins and effortless peace.',
        'Wishing you endless laughs, good health, and bold adventures.',
        'May every door you knock on swing wide open.',
        'Here is to more spontaneous coffee runs and road trips.',
        'Never forget you are truly one in a billion!'
      ],
      pactTitle: 'Lifetime Bestie Contract',
      pactVow: 'Hereby renewed for another 365 days: unlimited voice notes, honest pep talks, shared fries, and unconditional loyalty forever.',
      pactWitness: 'Signed by your Day-One Bestie',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  'female-friend': {
    id: 'female-friend',
    category: 'friends',
    label: 'Female Friend',
    shortLabel: 'Female Friend',
    emoji: '🌸',
    mood: 'Radiant, Aesthetic & Thoughtful',
    palette: {
      bgDark: '#24151b',
      bgMid: '#38222b',
      bgCard: 'rgba(46, 28, 35, 0.86)',
      surfaceLight: '#fff4ee',
      inkDark: '#2b181f',
      inkLight: '#fff4ee',
      primary: '#e5989b',
      accent: '#e2b46b',
      secondary: '#84a98c',
      glow: 'rgba(229, 152, 155, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'petals',
    revealType: 'starflower',
    heroVisual: 'blossom',
    acts: {
      preloaderSub: 'Preparing a thoughtful & radiant celebration',
      act1Prompt: 'TOUCH TO BLOOM THE STARFLOWER',
      act1Stage2Prompt: 'PULL THE CHAMPAGNE RIBBON',
      act1Stage2Btn: 'Open Celebration',
      act2Kicker: 'A RADIANT & THOUGHTFUL FRIEND',
      act2Tagline: 'Celebrating your warmth, grace, and the bright energy you bring to every room.',
      act3Chapter: 'CHAPTER II • FRIENDSHIP MILESTONES',
      act3Title: 'Moments of Genuine Friendship',
      act4Chapter: 'CHAPTER III • PLAYLIST & APPRECIATION',
      act4Title: 'Aesthetic Soundtracks & Good Vibes',
      act4AppreciationTitle: 'Things I Truly Admire About You',
      act5Chapter: 'CHAPTER IV • MEMORY GALLERY',
      act5Title: 'Snapshots of Great Times',
      act6Chapter: 'CHAPTER V • THE SEALED NOTE',
      act6Title: 'A Thoughtful Birthday Note',
      act7Chapter: 'CHAPTER VI • STARLIGHT WISHES',
      act7Title: 'Lanterns for Your Year Ahead',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • FRIENDSHIP SEAL',
      act8Title: 'Friendship Keepsake Seal',
      act8Badge: 'TRUE FRIENDSHIP',
      finaleTitle: 'Wishing You a Radiant Year Ahead!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Friend',
      nickname: 'Star',
      senderName: 'Your Friend',
      age: '',
      heroNotes: [
        { label: 'Warm Presence', text: 'You have a rare gift for making everyone around you feel welcome and valued.' },
        { label: 'Great Taste', text: 'From playlists to coffee spots, your recommendations never miss.' },
        { label: 'Genuine Kindness', text: 'Your thoughtfulness shows up in the little details others overlook.' },
        { label: 'Bright Mind', text: 'Conversations with you are always refreshing, inspiring, and fun.' },
        { label: 'Poise & Grace', text: 'You handle challenges with such calm confidence and positivity.' },
        { label: 'Cheers', text: 'Wishing you a year filled with peace, joy, and big milestones!' }
      ],
      milestones: [
        { num: '01', tag: 'FIRST HELLO', date: 'How We Met', title: 'An Effortless Connection', desc: 'Right from the start, talking with you felt easy, genuine, and uplifting.' },
        { num: '02', tag: 'GREAT TALKS', date: 'Catch-Ups', title: 'Coffee & Deep Conversations', desc: 'Hours fly by whenever we sit down to catch up on life and dreams.' },
        { num: '03', tag: 'SUPPORT', date: 'Good & Tough Days', title: 'Always Encouraging', desc: 'Thank you for always bringing steady positivity and kind words.' },
        { num: '04', tag: 'CELEBRATION', date: 'Today', title: 'A Toast to Your New Year', desc: 'Celebrating the wonderful friend you are and everything ahead of you.' }
      ],
      appreciationReasons: [
        'Your kindness is genuine, thoughtful, and effortless.',
        'You bring calm, positive energy into every conversation.',
        'You listen attentively and always offer grounded perspective.',
        'You celebrate your friends’ achievements with real warmth.',
        'Grateful to have such a classy, dependable friend in my life!'
      ],
      letterSalutation: 'Dear Friend,',
      letterBody: 'Happy Birthday! Wanted to send you something more thoughtful than a quick text to celebrate your day.\n\nThank you for being such a genuine, supportive, and uplifting friend. Your kindness and bright spirit make every catch-up a highlight.\n\nWishing you a year overflowing with good health, exciting opportunities, peaceful mornings, and endless reasons to smile!',
      letterSignoff: 'Warmest wishes, your friend,',
      lanternWishes: [
        'Wishing you a year of calm joy and bright milestones.',
        'May every project and dream you pursue flourish.',
        'Here is to great coffee, great laughs, and true friendships.',
        'May your new year be as kind to you as you are to others.'
      ],
      pactTitle: 'Friendship Keepsake Seal',
      pactVow: 'Here is to another year of genuine friendship, thoughtful catch-ups, cheering on each other’s wins, and unforgettable memories.',
      pactWitness: 'Sealed with genuine appreciation',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  'male-friend': {
    id: 'male-friend',
    category: 'friends',
    label: 'Male Friend / Buddy',
    shortLabel: 'Buddy / Bro',
    emoji: '📸',
    mood: 'Good Vibes & Day-One Loyalty',
    palette: {
      bgDark: '#091b22',
      bgMid: '#122f3b',
      bgCard: 'rgba(15, 39, 49, 0.88)',
      surfaceLight: '#f7f3e9',
      inkDark: '#0d2229',
      inkLight: '#f7f3e9',
      primary: '#f59e0b',
      accent: '#2dd4bf',
      secondary: '#94a3b8',
      glow: 'rgba(245, 158, 11, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'bokeh',
    revealType: 'camera',
    heroVisual: 'constellation',
    acts: {
      preloaderSub: 'Cueing up good vibes & birthday highlights',
      act1Prompt: 'TOUCH FOR FLASH IGNITION',
      act1Stage2Prompt: 'PULL THE SHUTTER RELEASE',
      act1Stage2Btn: 'Roll the Highlights',
      act2Kicker: 'DAY-ONE LOYALTY & GOOD VIBES',
      act2Tagline: 'Solid friendship, zero drama, and legendary memories.',
      act3Chapter: 'CHAPTER II • HIGHLIGHT REEL',
      act3Title: 'The Friendship Timeline',
      act4Chapter: 'CHAPTER III • SOUNDTRACK & RESPECT',
      act4Title: 'The Hangout Mixtape',
      act4AppreciationTitle: "Why You're a Top-Tier Friend",
      act5Chapter: 'CHAPTER IV • PHOTO ARCHIVE',
      act5Title: 'Good Times Caught on Camera',
      act6Chapter: 'CHAPTER V • BIRTHDAY NOTE',
      act6Title: 'A Quick Note From the Crew',
      act7Chapter: 'CHAPTER VI • WISHING SKY',
      act7Title: 'Lanterns for Big Wins Ahead',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • FRIENDSHIP SEAL',
      act8Title: 'Day-One Friendship Seal',
      act8Badge: 'DAY-ONE VERIFIED',
      finaleTitle: 'Have an Epic Birthday, Man!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Buddy',
      nickname: 'Champ',
      senderName: 'Your Friend',
      age: '',
      heroNotes: [
        { label: 'Always Solid', text: 'One of the few people who always keeps their word.' },
        { label: 'Top Humor', text: 'Guaranteed laughs every single time we link up.' },
        { label: 'Clutch Advice', text: 'Real perspective when it counts—never fake.' },
        { label: 'Ambition', text: 'Watching you crush your goals this year has been awesome.' },
        { label: 'Good Vibes', text: 'Zero drama, just solid friendship and good times.' }
      ],
      milestones: [
        { num: '01', tag: 'LINK UP', date: 'Day One', title: 'Where the Friendship Started', desc: 'Started with a casual hangout and turned into a rock-solid friendship.' },
        { num: '02', tag: 'HANGOUTS', date: 'Good Times', title: 'Late-Night Food & Stories', desc: 'Unplanned nights that somehow became our favorite memories.' },
        { num: '03', tag: 'LOYALTY', date: 'Always', title: 'Real Ones Show Up', desc: 'Grateful for a friend who is always dependable.' },
        { num: '04', tag: 'THIS YEAR', date: 'Birthday', title: 'Next Level Loading', desc: 'Wishing you big wins, health, and great adventures!' }
      ],
      appreciationReasons: [
        'You bring solid, laid-back energy everywhere you go.',
        'You are dependable when someone actually needs a hand.',
        'Your sense of humor makes every hangout a good time.',
        'You keep it genuine and grounded.',
        'Proud to call you a real friend!'
      ],
      letterSalutation: 'Hey man,',
      letterBody: 'Happy Birthday! Wanted to send over something cooler than a basic text to celebrate your day.\n\nAppreciate you always being a solid, dependable friend and bringing good vibes every time we hang out. Wishing you a massive year ahead—great health, big wins, and unforgettable memories!',
      letterSignoff: 'Cheers, your friend,',
      lanternWishes: [
        'Wishing you big wins, health, and good fortune.',
        'Here is to more epic trips and late-night food runs.',
        'May every goal you set this year click into place.',
        'Stay legendary!'
      ],
      pactTitle: 'Day-One Friendship Seal',
      pactVow: 'Hereby locking in another year of solid loyalty, zero-drama hangouts, and cheering on every big win ahead.',
      pactWitness: 'Signed by your Day-One Friend',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  friend: {
    id: 'friend',
    category: 'friends',
    label: 'Friend',
    shortLabel: 'Friend',
    emoji: '🌅',
    mood: 'Golden-Hour Memories & Shared Adventures',
    palette: {
      bgDark: '#17152b',
      bgMid: '#262247',
      bgCard: 'rgba(32, 28, 60, 0.86)',
      surfaceLight: '#fff8ef',
      inkDark: '#1b1834',
      inkLight: '#fff8ef',
      primary: '#f59e0b',
      accent: '#f47264',
      secondary: '#fbbf24',
      glow: 'rgba(245, 158, 11, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'bokeh',
    revealType: 'confetti',
    heroVisual: 'memoryTree',
    acts: {
      preloaderSub: 'Golden-hour birthday wishes loading',
      act1Prompt: 'TOUCH TO UNWRAP BIRTHDAY WISH',
      act1Stage2Prompt: 'PULL TO LAUNCH CELEBRATION',
      act1Stage2Btn: 'Celebrate Now',
      act2Kicker: 'GOLDEN-HOUR FRIENDSHIP',
      act2Tagline: 'Grateful for every laugh, adventure, and bright memory we share.',
      act3Chapter: 'CHAPTER II • SHARED ADVENTURES',
      act3Title: 'Milestones Along the Way',
      act4Chapter: 'CHAPTER III • MIXTAPE & APPRECIATION',
      act4Title: 'The Celebration Soundtrack',
      act4AppreciationTitle: 'Things I Appreciate About You',
      act5Chapter: 'CHAPTER IV • MEMORY GALLERY',
      act5Title: 'Snapshots of Great Days',
      act6Chapter: 'CHAPTER V • BIRTHDAY LETTER',
      act6Title: 'A Note for Your New Year',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Release Your Birthday Wishes',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • FRIENDSHIP PACT',
      act8Title: 'Friendship Appreciation Pact',
      act8Badge: 'SEALED WITH JOY',
      finaleTitle: 'Wishing You the Happiest Year!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Alex',
      nickname: 'Friend',
      senderName: 'Maya',
      age: '',
      heroNotes: [
        { label: 'Warmth', text: 'You bring genuine warmth and positivity to every table.' },
        { label: 'Great Laughs', text: 'Your laugh is contagious enough to lift anyone’s mood.' },
        { label: 'Dependable', text: 'Thank you for always being a friend people can count on.' },
        { label: 'Adventures', text: 'Here is to chasing more sunsets and unforgettable weekends!' },
        { label: 'Big Year', text: 'Every goal you set this year is yours for the taking.' }
      ],
      milestones: [
        { num: '01', tag: 'THE START', date: 'First Memory', title: 'How Our Friendship Began', desc: 'Grateful for the moment our paths crossed and clicked.' },
        { num: '02', tag: 'LAUGHS', date: 'Good Times', title: 'Turning Ordinary Days Into Gold', desc: 'Coffee runs, road trips, and conversations that fly by.' },
        { num: '03', tag: 'GROWTH', date: 'Every Season', title: 'Cheering Each Other On', desc: 'Celebrating every step forward together.' },
        { num: '04', tag: 'TODAY', date: 'Birthday', title: 'Another Bright Trip Around the Sun', desc: 'May this year bring calm mornings, big wins, and great company.' }
      ],
      appreciationReasons: [
        'Always brings genuine warmth to every room.',
        'A friend everyone can count on when it matters.',
        'Contagious laugh that lifts the whole table.',
        'Turns ordinary days into favorite memories.',
        'Deserves the absolute best year ahead!'
      ],
      letterSalutation: 'Dear Friend,',
      letterBody: 'Happy Birthday! Wishing you a year filled with laughter, big milestones, and everything you have been hoping for.\n\nThank you for being such a wonderful friend and bringing so much light into the lives around you. Enjoy every single moment of today!',
      letterSignoff: 'Cheers & warm wishes,',
      lanternWishes: [
        'Wishing you health, peace, and endless reasons to celebrate.',
        'May new adventures and bright opportunities find you.',
        'Here is to more golden-hour memories together.',
        'May this be your happiest year yet!'
      ],
      pactTitle: 'Friendship Appreciation Pact',
      pactVow: 'Here is to another year of genuine friendship, shared adventures, and celebrating every bright milestone together.',
      pactWitness: 'Signed with gratitude',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  'childhood-friend': {
    id: 'childhood-friend',
    category: 'friends',
    label: 'Childhood Friend',
    shortLabel: 'Childhood Friend',
    emoji: '🚲',
    mood: 'Day-One Nostalgia & Timeless Bond',
    palette: {
      bgDark: '#1b1626',
      bgMid: '#2c243d',
      bgCard: 'rgba(38, 31, 53, 0.86)',
      surfaceLight: '#fef8ee',
      inkDark: '#1f192b',
      inkLight: '#fef8ee',
      primary: '#f5b841',
      accent: '#60a5fa',
      secondary: '#f472b6',
      glow: 'rgba(245, 184, 65, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'bokeh',
    revealType: 'locket',
    heroVisual: 'oak',
    acts: {
      preloaderSub: 'Opening our childhood time capsule',
      act1Prompt: 'TOUCH TO OPEN TIME CAPSULE',
      act1Stage2Prompt: 'PULL TO UNLOCK MEMORIES',
      act1Stage2Btn: 'Open Time Capsule',
      act2Kicker: 'FRIENDS SINCE THE BEGINNING',
      act2Tagline: 'From playground days to today—some bonds never fade.',
      act3Chapter: 'CHAPTER II • TIME CAPSULE',
      act3Title: 'Years That Shaped Us',
      act4Chapter: 'CHAPTER III • THROWBACK MIXTAPE',
      act4Title: 'Songs That Take Us Back',
      act4AppreciationTitle: 'Why Our Day-One Bond Is Rare',
      act5Chapter: 'CHAPTER IV • NOSTALGIA REEL',
      act5Title: 'Snapshots Through the Years',
      act6Chapter: 'CHAPTER V • SEALED LETTER',
      act6Title: 'From Then Until Now',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Wishes Under the Same Sky',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • DAY-ONE PACT',
      act8Title: 'Day-One Friendship Pact',
      act8Badge: 'TIMELESS BOND',
      finaleTitle: 'Always Glad We Grew Up Together',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Old Friend',
      nickname: 'Day-One',
      senderName: 'Your Childhood Friend',
      age: '',
      heroNotes: [
        { label: 'Day One', text: 'You knew me back before we even figured out who we were.' },
        { label: 'Zero Distance', text: 'Even when months pass, one hello feels like yesterday.' },
        { label: 'Core Lore', text: 'We share a whole encyclopedia of childhood stories.' },
        { label: 'Growth', text: 'Seeing how far you have come makes me so proud.' },
        { label: 'Forever', text: 'Childhood friends are a rare kind of treasure.' }
      ],
      milestones: [
        { num: '01', tag: 'THE PLAYGROUND', date: 'Way Back', title: 'Where It All Started', desc: 'Bikes, backpacks, and endless afternoons without a single worry.' },
        { num: '02', tag: 'GROWING UP', date: 'School Years', title: 'Figuring Out Life Together', desc: 'Awkward phases, big dreams, and always sticking together.' },
        { num: '03', tag: 'TODAY', date: 'Still Here', title: 'Time Never Changed Us', desc: 'Still laughing at the exact same jokes after all these years.' },
        { num: '04', tag: 'AHEAD', date: 'Birthday', title: 'To Many More Decades', desc: 'Wishing you health, joy, and every success!' }
      ],
      appreciationReasons: [
        'You know my entire backstory and still cheer me on.',
        'Time and distance never weaken our friendship.',
        'Nobody else remembers those legendary childhood moments.',
        'You have grown into someone truly admirable.',
        'Grateful to still celebrate birthdays together!'
      ],
      letterSalutation: 'Hey old friend,',
      letterBody: 'Happy Birthday!! Looking back at how long we have known each other is honestly wild—and I wouldn’t trade those memories for anything.\n\nThank you for still being in my life after all these seasons. Wishing you an amazing year ahead filled with peace, success, and joy.',
      letterSignoff: 'Always your day-one friend,',
      lanternWishes: [
        'May this year bring you deep joy and big wins.',
        'Here is to catching up in person soon!',
        'Wishing you health, warmth, and bright days ahead.'
      ],
      pactTitle: 'Day-One Friendship Pact',
      pactVow: 'No matter how busy life gets or how many years fly by, we will always pick right back up like no time passed at all.',
      pactWitness: 'Signed by your Day-One Friend',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  squad: {
    id: 'squad',
    category: 'friends',
    label: 'Squad / Group',
    shortLabel: 'The Squad',
    emoji: '🥂',
    mood: 'Unstoppable Crew & Big Energy',
    palette: {
      bgDark: '#101228',
      bgMid: '#1d2147',
      bgCard: 'rgba(22, 26, 58, 0.88)',
      surfaceLight: '#fff8f0',
      inkDark: '#131630',
      inkLight: '#fff8f0',
      primary: '#f43f5e',
      accent: '#fbbf24',
      secondary: '#38bdf8',
      glow: 'rgba(244, 63, 94, 0.42)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'confetti',
    revealType: 'flare',
    heroVisual: 'constellation',
    acts: {
      preloaderSub: 'The whole squad is celebrating you',
      act1Prompt: 'TOUCH TO IGNITE THE PARTY',
      act1Stage2Prompt: 'PULL FOR SQUAD CONFETTI',
      act1Stage2Btn: 'Enter the Party',
      act2Kicker: 'FROM THE ENTIRE CREW',
      act2Tagline: 'Life is simply way more fun with you in the group chat.',
      act3Chapter: 'CHAPTER II • SQUAD ARCHIVES',
      act3Title: 'Our Greatest Group Moments',
      act4Chapter: 'CHAPTER III • PARTY PLAYLIST',
      act4Title: 'The Official Squad Mixtape',
      act4AppreciationTitle: 'Why the Squad Loves You',
      act5Chapter: 'CHAPTER IV • PHOTO DUMP',
      act5Title: 'Certified Squad Memories',
      act6Chapter: 'CHAPTER V • GROUP LETTER',
      act6Title: 'A Note From All of Us',
      act7Chapter: 'CHAPTER VI • SKY LANTERNS',
      act7Title: 'Group Wishes to the Sky',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • SQUAD CHARTER',
      act8Title: 'Official Squad Charter',
      act8Badge: 'SQUAD APPROVED',
      finaleTitle: 'Love From the Whole Squad!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'MVP',
      nickname: 'Squad Legend',
      senderName: 'The Whole Squad',
      age: '',
      heroNotes: [
        { label: 'Group Chat MVP', text: 'The chat would literally be dead without your energy.' },
        { label: 'Always Down', text: 'First to say yes when someone drops a wild plan.' },
        { label: 'Heart of Gold', text: 'Always looking out for everyone in the crew.' },
        { label: 'Iconic Laugh', text: 'When you start laughing, the whole table loses it.' },
        { label: 'Celebration Time', text: 'Tonight we celebrate YOU properly!' }
      ],
      milestones: [
        { num: '01', tag: 'ASSEMBLE', date: 'Origin', title: 'How the Squad Formed', desc: 'Somehow the best group of people all ended up in one place.' },
        { num: '02', tag: 'TRIPS', date: 'Adventures', title: 'Unforgettable Group Trips', desc: 'Missed turns, late dinners, and stories we still retell.' },
        { num: '03', tag: 'SUPPORT', date: 'Always', title: 'Everyone’s Loudest Hype Crew', desc: 'Showing up for every birthday, win, and milestone.' },
        { num: '04', tag: 'TONIGHT', date: 'Birthday', title: 'All Eyes on You', desc: 'Here is to another legendary year together!' }
      ],
      appreciationReasons: [
        'You keep the whole crew connected and laughing.',
        'You bring unstoppable energy to every hangout.',
        'You genuinely care about every single person in the group.',
        'You make every trip and dinner unforgettable.',
        'The squad wouldn’t be the squad without you!'
      ],
      letterSalutation: 'To our favorite person,',
      letterBody: 'Happy Birthday from the entire crew!! We teamed up to make sure you know how much you mean to all of us.\n\nThank you for every laugh, every hangout, and for keeping the squad together. Wishing you an unforgettable year ahead!',
      letterSignoff: 'With love, the whole squad,',
      lanternWishes: [
        'Wishing you massive wins and non-stop good vibes!',
        'Here is to another year of epic squad trips.',
        'May this year top every single one before it!'
      ],
      pactTitle: 'Official Squad Charter',
      pactVow: 'Hereby signed on behalf of the entire crew: more group trips, zero skipped birthdays, and lifetime friendship.',
      pactWitness: 'Signed by the Squad',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  mentor: {
    id: 'mentor',
    category: 'special',
    label: 'Mentor / Teacher',
    shortLabel: 'Mentor / Teacher',
    emoji: '🏛️',
    mood: 'Refined Prestige & Appreciation',
    palette: {
      bgDark: '#081b15',
      bgMid: '#0f2d23',
      bgCard: 'rgba(13, 38, 30, 0.88)',
      surfaceLight: '#f8f4ea',
      inkDark: '#18221e',
      inkLight: '#f8f4ea',
      primary: '#d4af37',
      accent: '#e8d082',
      secondary: '#34d399',
      glow: 'rgba(212, 175, 55, 0.4)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'golddust',
    revealType: 'scroll',
    heroVisual: 'oak',
    acts: {
      preloaderSub: 'Unsealing a tribute of respect & gratitude',
      act1Prompt: 'TOUCH TO BREAK WAX SEAL',
      act1Stage2Prompt: 'UNROLL THE PARCHMENT SCROLL',
      act1Stage2Btn: 'Open Tribute',
      act2Kicker: 'GUIDANCE THAT SHAPES FUTURES',
      act2Tagline: 'Thank you for your wisdom, patience, and belief in our potential.',
      act3Chapter: 'CHAPTER II • LESSONS & IMPACT',
      act3Title: 'Milestones of Inspiration',
      act4Chapter: 'CHAPTER III • CLASSICAL SCORE & ADMIRATION',
      act4Title: 'A Distinguished Birthday Score',
      act4AppreciationTitle: 'Reasons Your Guidance Matters',
      act5Chapter: 'CHAPTER IV • COMMEMORATIVE GALLERY',
      act5Title: 'Moments of Learning & Growth',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'A Note of Deep Appreciation',
      act7Chapter: 'CHAPTER VI • LANTERNS OF HONOR',
      act7Title: 'Wishes for Continued Excellence',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • CERTIFICATE OF APPRECIATION',
      act8Title: 'Certificate of Appreciation',
      act8Badge: 'HONORED MENTOR',
      finaleTitle: 'With Deepest Respect & Gratitude',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Respected Mentor',
      nickname: 'Guide',
      senderName: 'Your Grateful Student',
      age: '',
      heroNotes: [
        { label: 'Clarity', text: 'You have a gift for turning complex challenges into clear steps.' },
        { label: 'Patience', text: 'Your patience gave us the confidence to keep learning and growing.' },
        { label: 'High Standards', text: 'You pushed us to aim higher than we thought we could reach.' },
        { label: 'Integrity', text: 'Your character and professionalism inspire everyone you teach.' },
        { label: 'Lasting Impact', text: 'The lessons you shared will guide us for a lifetime.' }
      ],
      milestones: [
        { num: '01', tag: 'THE SPARK', date: 'First Lesson', title: 'Opening New Doors of Curiosity', desc: 'From day one, your passion and clarity made every lesson meaningful.' },
        { num: '02', tag: 'ENCOURAGEMENT', date: 'Turning Point', title: 'Believing Before We Did', desc: 'Your encouraging words arrived at the exact moment we needed confidence.' },
        { num: '03', tag: 'EXCELLENCE', date: 'Growth', title: 'Learning Beyond the Classroom', desc: 'You taught not just skills, but discipline, curiosity, and kindness.' },
        { num: '04', tag: 'TODAY', date: 'Birthday', title: 'Honoring Your Impact', desc: 'Wishing you vibrant health, fulfillment, and continued inspiration.' }
      ],
      appreciationReasons: [
        'You invest genuine care into the growth of everyone you mentor.',
        'Your wisdom is paired with humility and warmth.',
        'You challenge us kindly and celebrate every step of progress.',
        'You lead by example in integrity and excellence.',
        'Thank you for leaving a permanent positive mark on our journey.'
      ],
      letterSalutation: 'Dear Mentor,',
      letterBody: 'Wishing you a very Happy Birthday! Few people have the gift of shaping others’ confidence and perspective the way you do.\n\nThank you for your patience, your high standards, and every piece of guidance you so generously shared. May this year bring you great health, deep fulfillment, and every success.',
      letterSignoff: 'With deepest respect and gratitude,',
      lanternWishes: [
        'Wishing you continued health, wisdom, and joy.',
        'May your passion continue to inspire countless others.',
        'Here is to a year of peace, fulfillment, and proud moments.'
      ],
      pactTitle: 'Certificate of Appreciation',
      pactVow: 'Presented in sincere recognition of extraordinary mentorship, patience, and guidance that continues to illuminate our path.',
      pactWitness: 'Signed with utmost respect',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  colleague: {
    id: 'colleague',
    category: 'special',
    label: 'Colleague',
    shortLabel: 'Colleague',
    emoji: '💼',
    mood: 'Respect, Excellence & Camaraderie',
    palette: {
      bgDark: '#0b1c1c',
      bgMid: '#132d2d',
      bgCard: 'rgba(16, 38, 38, 0.88)',
      surfaceLight: '#f7f4ec',
      inkDark: '#142424',
      inkLight: '#f7f4ec',
      primary: '#d4a853',
      accent: '#5eead4',
      secondary: '#94a3b8',
      glow: 'rgba(212, 175, 55, 0.38)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'golddust',
    revealType: 'scroll',
    heroVisual: 'constellation',
    acts: {
      preloaderSub: 'Preparing a celebratory team tribute',
      act1Prompt: 'TOUCH TO UNSEAL TRIBUTE',
      act1Stage2Prompt: 'OPEN THE CELEBRATION SCROLL',
      act1Stage2Btn: 'Open Tribute',
      act2Kicker: 'EXCELLENCE & TEAM SPIRIT',
      act2Tagline: 'Grateful to work alongside someone so sharp, kind, and dependable.',
      act3Chapter: 'CHAPTER II • HIGHLIGHTS',
      act3Title: 'Milestones & Wins Together',
      act4Chapter: 'CHAPTER III • MUSIC & RECOGNITION',
      act4Title: 'Celebration Soundtrack',
      act4AppreciationTitle: 'What Makes Working With You Great',
      act5Chapter: 'CHAPTER IV • TEAM MOMENTS',
      act5Title: 'Snapshots of Collaboration',
      act6Chapter: 'CHAPTER V • BIRTHDAY NOTE',
      act6Title: 'Warm Wishes From Us',
      act7Chapter: 'CHAPTER VI • WISHING SKY',
      act7Title: 'Lanterns for Big Wins Ahead',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • CERTIFICATE OF APPRECIATION',
      act8Title: 'Certificate of Appreciation',
      act8Badge: 'HIGHLY APPRECIATED',
      finaleTitle: 'Wishing You a Fantastic Year Ahead!',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'Colleague',
      nickname: 'Star Performer',
      senderName: 'Your Team',
      age: '',
      heroNotes: [
        { label: 'Dependable', text: 'Always the calmest, sharpest presence when deadlines get real.' },
        { label: 'Team Player', text: 'Generous with your time, ideas, and encouragement.' },
        { label: 'Great Energy', text: 'You make busy workdays genuinely enjoyable.' },
        { label: 'Excellence', text: 'Your attention to craft raises the bar for everyone.' },
        { label: 'Cheers', text: 'Wishing you big career wins and well-deserved rest!' }
      ],
      milestones: [
        { num: '01', tag: 'COLLABORATION', date: 'Projects', title: 'Building Great Things Together', desc: 'Every project runs smoother with your insight and steady energy.' },
        { num: '02', tag: 'CAMARADERIE', date: 'Coffee Breaks', title: 'Laughs Between Meetings', desc: 'Quick chats and coffee breaks that brighten the whole week.' },
        { num: '03', tag: 'TODAY', date: 'Birthday', title: 'Celebrating Your Day', desc: 'Take a well-earned break and enjoy every moment!' }
      ],
      appreciationReasons: [
        'You bring clarity and calm to fast-moving days.',
        'Always ready to lend a hand without hesitation.',
        'Your professionalism is matched by genuine warmth.',
        'Great humor that keeps morale high.',
        'A privilege to have you on the team!'
      ],
      letterSalutation: 'Happy Birthday!',
      letterBody: 'Wishing you a wonderful birthday and a year ahead filled with exciting milestones, great health, and plenty of time to unwind.\n\nThank you for being such a thoughtful, dependable, and inspiring colleague to work with every day!',
      letterSignoff: 'Best wishes,',
      lanternWishes: [
        'Wishing you continued success and smooth sailing.',
        'May this year bring exciting new achievements and balance.',
        'Enjoy a fantastic celebration today!'
      ],
      pactTitle: 'Certificate of Appreciation',
      pactVow: 'Recognizing outstanding camaraderie, sharp craft, and positive energy—wishing you a remarkable year ahead.',
      pactWitness: 'Signed with appreciation',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  },

  partner: {
    id: 'partner',
    category: 'special',
    label: 'Partner / Lover',
    shortLabel: 'Partner / Love',
    emoji: '🌹',
    mood: 'Timeless Romance & Devotion',
    palette: {
      bgDark: '#210913',
      bgMid: '#381021',
      bgCard: 'rgba(46, 14, 27, 0.86)',
      surfaceLight: '#fff5f7',
      inkDark: '#290c17',
      inkLight: '#fff5f7',
      primary: '#fb7185',
      accent: '#f5c469',
      secondary: '#f43f5e',
      glow: 'rgba(251, 113, 133, 0.45)'
    },
    typography: {
      display: "'Playfair Display', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
      script: "'Cormorant Garamond', Georgia, serif"
    },
    particles: 'hearts',
    revealType: 'blossom',
    heroVisual: 'blossom',
    acts: {
      preloaderSub: 'Preparing your romantic birthday keepsake',
      act1Prompt: 'TOUCH TO UNWRAP MY HEART',
      act1Stage2Prompt: 'PULL THE VELVET RIBBON',
      act1Stage2Btn: 'Enter Our Story',
      act2Kicker: 'TO MY FAVORITE SOUL',
      act2Tagline: 'Every day with you feels like my favorite chapter.',
      act3Chapter: 'CHAPTER II • OUR LOVE STORY',
      act3Title: 'Milestones of Us',
      act4Chapter: 'CHAPTER III • OUR SONG & ADORATION',
      act4Title: 'The Soundtrack of Us',
      act4AppreciationTitle: 'Why I Fall for You Every Day',
      act5Chapter: 'CHAPTER IV • OUR GALLERY',
      act5Title: 'Snapshots of Forever',
      act6Chapter: 'CHAPTER V • THE SEALED LETTER',
      act6Title: 'From My Heart to Yours',
      act7Chapter: 'CHAPTER VI • TWILIGHT LANTERNS',
      act7Title: 'Wishes Under the Stars',
      act7Button: 'Release Birthday Lanterns',
      act8Chapter: 'CHAPTER VII • ETERNAL COVENANT',
      act8Title: 'Eternal Birthday Covenant',
      act8Badge: 'FOREVER YOURS',
      finaleTitle: 'I Love You Endlessly',
      finaleButton: 'Relive This Celebration from the Beginning'
    },
    defaults: {
      recipientName: 'My Love',
      nickname: 'Sweetheart',
      senderName: 'Yours Forever',
      age: '',
      heroNotes: [
        { label: 'Your Smile', text: 'Still the single sight that stops time and brightens my whole day.' },
        { label: 'Safe Harbor', text: 'Being next to you feels like home no matter where we are.' },
        { label: 'Little Things', text: 'I notice every sweet detail—and fall a little deeper every time.' },
        { label: 'Our Laughs', text: 'Nobody makes me laugh harder or feel softer than you.' },
        { label: 'Forever', text: 'Cannot wait to celebrate dozens more birthdays side by side.' }
      ],
      milestones: [
        { num: '01', tag: 'THE SPARK', date: 'First Chapter', title: 'Where Our Story Began', desc: 'One glance that quietly turned into the most meaningful chapter of my life.' },
        { num: '02', tag: 'THE FALL', date: 'Late Nights', title: 'Falling for Your Soul', desc: 'Talking until 3 AM and realizing I never wanted the conversation to end.' },
        { num: '03', tag: 'THE ANCHOR', date: 'Through It All', title: 'Stronger Together', desc: 'Every challenge only proved how deeply we belong in each other’s corner.' },
        { num: '04', tag: 'TODAY', date: 'Your Birthday', title: 'Celebrating You, My Heart', desc: 'Today is all about spoiling you and making you feel as loved as you are.' }
      ],
      appreciationReasons: [
        'Your eyes light up the whole room when you laugh.',
        'You make every ordinary day feel warm and magical.',
        'Your kindness and gentle heart inspire me endlessly.',
        'You are my partner, my comfort, and my favorite person.',
        'Loving you is the easiest, sweetest thing I have ever known.'
      ],
      letterSalutation: 'My Dearest Love,',
      letterBody: 'Happy Birthday to the person who holds my whole heart. From the moment you walked into my life, you brought colors, laughter, and a warmth I never knew existed.\n\nThank you for every shared dream, every quiet hug, and every moment of joy. Here is to celebrating you today and across a lifetime of tomorrows.',
      letterSignoff: 'Endlessly yours,',
      lanternWishes: [
        'May this year bring you pure joy and soft mornings.',
        'Wishing you every dream your heart quietly holds.',
        'Here is to a lifetime of birthdays side by side.'
      ],
      pactTitle: 'Eternal Birthday Covenant',
      pactVow: 'I promise to cherish your laugh, stand beside you in every storm, and love you deeper with every passing birthday.',
      pactWitness: 'Signed with all my heart',
      tracks: BASE_DEFAULTS.tracks,
      photos: BASE_DEFAULTS.photos
    }
  }
};

export function getRelationshipTheme(relationId) {
  if (!relationId) return RELATIONSHIP_THEMES.friend;
  // Legacy persona mapping for backwards compatibility with existing saved wishes
  const legacyMap = {
    bestfriend_female: 'female-friend',
    bestfriend: 'best-friend',
    teacher: 'mentor',
    special: 'partner'
  };
  const key = legacyMap[relationId] || relationId;
  return RELATIONSHIP_THEMES[key] || RELATIONSHIP_THEMES.friend;
}

// Built-in Web Audio API gentle music-box / piano-pad Birthday Melody fallback
export class GentleBirthdaySynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.step = 0;
    // Happy Birthday melody notes in Hz (soft C major / F major music-box arrangement)
    this.melody = [
      { f: 392.00, d: 0.36 }, { f: 392.00, d: 0.24 }, { f: 440.00, d: 0.6 },
      { f: 392.00, d: 0.6 },  { f: 523.25, d: 0.6 },  { f: 493.88, d: 1.0 },
      { f: 392.00, d: 0.36 }, { f: 392.00, d: 0.24 }, { f: 440.00, d: 0.6 },
      { f: 392.00, d: 0.6 },  { f: 587.33, d: 0.6 },  { f: 523.25, d: 1.0 },
      { f: 392.00, d: 0.36 }, { f: 392.00, d: 0.24 }, { f: 783.99, d: 0.6 },
      { f: 659.25, d: 0.6 },  { f: 523.25, d: 0.6 },  { f: 493.88, d: 0.6 }, { f: 440.00, d: 0.9 },
      { f: 698.46, d: 0.36 }, { f: 698.46, d: 0.24 }, { f: 659.25, d: 0.6 },
      { f: 523.25, d: 0.6 },  { f: 587.33, d: 0.6 },  { f: 523.25, d: 1.2 }
    ];
  }

  _ensureCtx() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) this.ctx = new AudioCtx();
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  playTone(freq, dur = 0.5, vol = 0.08, type = 'sine') {
    const ctx = this._ensureCtx();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      overtone.type = 'triangle';
      overtone.frequency.setValueAtTime(freq * 2, now);

      const overGain = ctx.createGain();
      overGain.gain.setValueAtTime(0.15, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(vol, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

      osc.connect(gain);
      overtone.connect(overGain);
      overGain.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      overtone.start(now);
      osc.stop(now + dur + 0.05);
      overtone.stop(now + dur + 0.05);
    } catch {}
  }

  playChime() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      setTimeout(() => this.playTone(f, 0.55, 0.09, 'triangle'), idx * 75);
    });
  }

  playSpark() {
    this.playTone(880, 0.18, 0.07, 'sine');
    setTimeout(() => this.playTone(1318.5, 0.25, 0.06, 'triangle'), 60);
  }

  startLoop() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const tick = () => {
      if (!this.isPlaying) return;
      const note = this.melody[this.step % this.melody.length];
      this.playTone(note.f, note.d * 1.15, 0.065, 'sine');
      this.step = (this.step + 1) % this.melody.length;
      this.timer = setTimeout(tick, note.d * 1000);
    };
    tick();
  }

  stopLoop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  destroy() {
    this.stopLoop();
    if (this.ctx) {
      try { this.ctx.close(); } catch {}
      this.ctx = null;
    }
  }
}
