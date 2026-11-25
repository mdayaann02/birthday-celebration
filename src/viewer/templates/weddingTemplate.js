// src/viewer/templates/weddingTemplate.js - Royal Indian Wedding Invitation Template (ShubhWeds)
// Exact match to https://shubhweds.in/demo/template-6/
// 1. Carved Sage Doors Video Opener with Tap-to-Open Seal & Monogram
// 2. Sunehra Royal Shehnai Soundtrack with Interactive Music Player
// 3. Sacred Invocation: ॥ श्री गणेशाय नमः ॥ & Sanskrit Shloka with Swaying Jhumars
// 4. Grand Couple & Lineage Announcement: Vihaan & Anaya with Parents
// 5. Save the Date Interactive Scratch Card with Canvas Physics & Confetti Burst
// 6. Multiday Ceremony Itinerary (Haldi, Mehendi, Sangeet, Vivah) with Dress Codes & Directions
// 7. Live Real-time Muhurat Countdown Clock with Days, Hours, Minutes, Seconds
// 8. Romantic Couple Moments Gallery with Fullscreen Lightbox & Arched Thumbnails
// 9. Interactive RSVP Form with Guest Stepper & Instant Confirmation
// 10. Warm Family Gratitude, Falling Rose Petals & Blessing Butterflies

import './wedding.css';

export function renderWeddingTemplate(container, data = {}, isMakerReview = false) {
  // Teardown previous instance if any
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
  }

  const isEditorMode = Boolean(
    isMakerReview ||
    (typeof window !== 'undefined' && window.isCelebrationEditorMode) ||
    document.body.classList.contains('is-editor-mode') ||
    Boolean(container.closest('.preview-frame-container'))
  );

  const groomName = data.groomName || 'Vihaan';
  const groomParents = data.groomParents || 'S/O Shri Rajiv Kapoor & Smt. Meera Kapoor';
  const brideName = data.brideName || 'Anaya';
  const brideParents = data.brideParents || 'D/O Shri Arvind Shah & Smt. Kavita Shah';
  const familiesLine = data.familiesLine || 'the Kapoor and Shah families';
  const hashtag = data.hashtag || '#VihaanWedsAnaya';

  const weddingDateStr = data.eventDate || '2027-02-13T18:00';
  const weddingDateDisplay = data.weddingDateDisplay || 'Saturday, 13th February 2027';
  const ceremonyTitle = data.ceremonyTitle || 'Shubh Vivah';
  const venueName = data.venueName || 'The Oberoi Udaivilas';
  const venueCity = data.venueCity || 'Udaipur, Rajasthan';
  const venueAddress = data.venueAddress || 'Haridas Ji Ki Magri, Mulla Talai, Udaipur, Rajasthan 313001';
  const mapUrl = data.mapUrl || 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur';

  const invocation = data.invocation || '॥ श्री गणेशाय नमः ॥';
  const shlokaLine1 = data.shlokaLine1 || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।';
  const shlokaLine2 = data.shlokaLine2 || 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥';
  const blessingIntro = data.blessingIntro || 'With the blessings of Lord Ganesha';
  const invitationKicker = data.invitationKicker || 'we request the honour of your presence at the wedding celebration of';

  const saveDateDay = data.saveDateDay || 'Saturday';
  const saveDateNum = data.saveDateNum || '13';
  const saveDateMonth = data.saveDateMonth || 'February';
  const saveDateYear = data.saveDateYear || '2027';

  const audioSrc = data.audioSrc || 'https://media.shubhweds.in/videos/sunehra.mp3';
  const videoSrc = data.introVideoSrc || 'https://media.shubhweds.in/template-6/template-6-intro-preview.mp4';
  const posterSrc = data.introPoster || 'https://media.shubhweds.in/template-6/intro-poster.webp';
  const endPosterSrc = data.introEnd || 'https://media.shubhweds.in/template-6/intro-end.webp';

  const functionsList = (data.functions && data.functions.length > 0) ? data.functions : [
    {
      id: 'haldi',
      name: 'Haldi',
      subtitle: 'Mangal Snanam',
      weekday: 'Friday',
      time: '10:00 AM - 1:00 PM',
      date: '19th February 2027',
      venueName: 'Poolside Courtyard',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Shades of Yellow',
      accent: '#E8B85C',
      image: 'https://media.shubhweds.in/template-6/function-haldi.webp'
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      subtitle: 'Henna & Melodies',
      weekday: 'Friday',
      time: '4:00 PM - 8:00 PM',
      date: '19th February 2027',
      venueName: 'Garden Terrace',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Greens & Pastels',
      accent: '#9DAA80',
      image: 'https://media.shubhweds.in/template-6/function-mehendi.webp'
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      subtitle: 'Music, Dance & Celebration',
      weekday: 'Saturday',
      time: '7:30 PM - 11:30 PM',
      date: '20th February 2027',
      venueName: 'Grand Ballroom',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Indo-Western Glam',
      accent: '#C78A9A',
      image: 'https://media.shubhweds.in/template-6/function-sangeet.webp'
    },
    {
      id: 'wedding',
      name: 'Wedding',
      subtitle: 'Shubh Vivah',
      weekday: 'Sunday',
      time: '7:00 PM Onwards',
      date: '21st February 2027',
      venueName: 'The Palace Lawns',
      venueAddress: 'Udaipur, Rajasthan',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Traditional Ethnic',
      accent: '#A8485E',
      image: 'https://media.shubhweds.in/template-6/function-wedding.webp'
    }
  ];

  const gallery = (data.gallery && data.gallery.length > 0) ? data.gallery : [
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-01.webp',
      caption: 'Where our journey began',
      note: 'A serendipitous meeting that turned into a lifetime promise.'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-02.webp',
      caption: 'Hand in hand towards forever',
      note: 'Through every sunset, laughter, and adventure.'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-03.webp',
      caption: 'Our little world of joy',
      note: 'Every moment with you feels like home.'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-04.webp',
      caption: 'Forever begins here',
      note: 'Looking ahead to a lifetime of love and togetherness.'
    }
  ];

  const rsvpDeadline = data.rsvpDeadline || 'Kindly reply by 10 January 2027';
  const thanksMessage = data.thanksMessage || 'for your love and blessings. Our celebration will not be complete without you.';
  const blessings = (data.blessings && data.blessings.length > 0) ? data.blessings : [
    'May you keep choosing each other, every single day.',
    'Wishing you a lifetime of laughter, harmony and long talks.',
    'May your home always bloom with peace and prosperity.',
    'Two souls, two families, one eternal love story.',
    'May every tomorrow be sweeter than today.',
    'Here’s to a blessed lifetime of joy, laughter and togetherness.',
    'May Lord Ganesha shower your union with unending happiness.',
    'Blessings, divine light and boundless love to you both.'
  ];

  // Monogram initials
  const initials = `${(groomName.charAt(0) || 'V')} & ${(brideName.charAt(0) || 'A')}`;

  // Build template markup
  container.innerHTML = `
    <div class="wedding-site js ${isEditorMode ? 'is-ready' : ''}">
      <!-- SVG Sprite -->
      <svg width="0" height="0" class="sprite" style="position:absolute; width:0; height:0; overflow:hidden;" aria-hidden="true">
        <symbol id="heart" viewBox="0 0 100 90">
          <path d="M50 87C22 67 2 50 2 27 2 12 13 2 26 2c11 0 19 6 24 15C55 8 63 2 74 2c13 0 24 10 24 25 0 23-20 40-48 60Z" vector-effect="non-scaling-stroke" />
        </symbol>
        <symbol id="vine" viewBox="0 0 240 28">
          <g fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round">
            <path d="M108 14c-10-9-22-9-30-2s-20 7-28 0M50 12c-6-5-14-6-22-2M28 10H4" />
            <path d="M132 14c10-9 22-9 30-2s20 7 28 0M190 12c6-5 14-6 22-2M212 10h24" />
          </g>
          <g fill="currentColor">
            <path d="M120 4l5 10-5 10-5-10z" />
            <circle cx="104" cy="14" r="1.6" />
            <circle cx="136" cy="14" r="1.6" />
            <path d="M66 6c4-4 9-4 11-2-3 3-7 4-11 2zM174 6c-4-4-9-4-11-2 3 3 7 4 11 2z" opacity=".75" />
            <path d="M40 14c3 4 8 5 11 3-3-3-7-4-11-3zM200 14c-3 4-8 5-11 3 3-3 7-4 11-3z" opacity=".75" />
          </g>
        </symbol>
      </svg>

      <!-- Audio Track -->
      <audio id="weddingMusic" preload="auto" loop src="${audioSrc}"></audio>

      <!-- Music Toggle Floating Button -->
      <button class="music-toggle is-muted is-shown" id="musicToggleBtn" type="button" aria-label="Turn music on">
        <span class="music-toggle__ring" aria-hidden="true"></span>
        <svg class="music-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M11 5L6 9H2v6h4l5 4V5z"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
        </svg>
        <svg class="music-toggle__slash" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- 1. Intro Film & Doors ============================================= -->
      <header class="intro ${isEditorMode ? 'is-ended is-still' : ''}" id="weddingIntro">
        ${isEditorMode ? `
          <button class="editor-door-toggle" id="btnEditorDoorToggle" type="button" title="Test doors opening animation">
            <span>🚪</span> <span>Replay Doors</span>
          </button>
        ` : ''}

        <div class="intro__backdrop" aria-hidden="true">
          <i class="intro__bg intro__bg--cover"></i>
          <i class="intro__bg intro__bg--end"></i>
        </div>

        <div class="film" id="weddingFilm">
          <div class="film__scene">
            <video class="film__video" id="filmVideo"
                   poster="${posterSrc}"
                   muted playsinline preload="auto"
                   disablepictureinpicture disableremoteplayback
                   aria-hidden="true">
              <source src="${videoSrc}" type="video/mp4">
            </video>

            <img class="film__cover" id="filmCover" src="${posterSrc}" width="1080" height="1920" alt="" aria-hidden="true" style="${isEditorMode ? 'display:none;' : ''}">
            <img class="film__end" id="filmEnd" src="${endPosterSrc}" width="1080" height="1920" alt="" aria-hidden="true" style="${isEditorMode ? 'opacity:1;' : ''}">

            <button class="film__play" id="filmPlayBtn" type="button" aria-label="Open the invitation" style="${isEditorMode ? 'display:none;' : ''}">
              <span class="seal" aria-hidden="true">
                <span class="seal__monogram">${initials}</span>
                <span class="seal__cta">Tap to open</span>
              </span>
            </button>
            <span class="film__spinner" aria-hidden="true"></span>
          </div>
        </div>

        <div class="hero" id="weddingHero">
          <p class="hero__lead" style="--d: .2s">Together with their families</p>
          <h1 class="hero__names">
            <span class="hero__name" style="--d: .6s">${groomName}</span>
            <span class="hero__amp" style="--d: 1.35s">&amp;</span>
            <span class="hero__name" style="--d: 1.6s">${brideName}</span>
          </h1>
          <svg class="hero__vine" style="--d: 2.5s" aria-hidden="true"><use href="#vine" /></svg>
          <p class="hero__tag" style="--d: 2.8s">${hashtag || 'are getting married'}</p>
        </div>

        <div class="motes" aria-hidden="true">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>

        <button class="film__skip" id="filmSkipBtn" type="button" aria-label="Skip video and view invitation" style="${isEditorMode ? 'display:none;' : ''}">Skip to invite</button>
        <a class="scroll-cue" id="scrollCueBtn" href="#invitation" aria-label="Scroll to invitation">
          <span>Scroll</span>
          <i></i>
        </a>
      </header>

      <!-- 2. Sacred Invitation Arch ========================================= -->
      <section class="invitation" id="invitation">
        <div class="invitation__stage">
          <img class="jhumar jhumar--1" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true">
          <img class="jhumar jhumar--2" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true">
          <img class="jhumar jhumar--3" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true">

          <div class="arch reveal is-visible">
            <p class="invocation" lang="hi" style="--i: 0">${invocation}</p>

            <p class="shloka" lang="sa" style="--i: 1">
              <span>${shlokaLine1}</span>
              <span>${shlokaLine2}</span>
            </p>

            <p class="blessing" style="--i: 2">${blessingIntro}</p>
            <p class="kicker" style="--i: 3">${invitationKicker}</p>

            <img class="arch__divider" src="https://media.shubhweds.in/template-6/divider-pearl-rose.webp" width="1000" height="132" alt="" aria-hidden="true" style="--i: 4">

            <h2 class="couple" style="--i: 5">
              <span class="person">
                <span class="person__name">${groomName}</span>
                <span class="person__parents">${groomParents}</span>
              </span>
              <span class="couple__and" aria-hidden="true">&amp;</span>
              <span class="person">
                <span class="person__name">${brideName}</span>
                <span class="person__parents">${brideParents}</span>
              </span>
            </h2>

            <img class="arch__divider" src="https://media.shubhweds.in/template-6/divider-pearl-rose.webp" width="1000" height="132" alt="" aria-hidden="true" style="--i: 6">

            <div class="details" style="--i: 7">
              <p class="details__date">${weddingDateDisplay}</p>
              <p class="details__ceremony">${ceremonyTitle}</p>
              <p class="details__venue">${venueName}, ${venueCity}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Save the Date Scratch Card ==================================== -->
      <section class="save-date" id="save-date" aria-labelledby="save-date-title">
        <header class="save-date__head reveal is-visible">
          <p class="save-date__kicker">Save the Date</p>
          <h2 class="save-date__title" id="save-date-title">Scratch to Reveal</h2>
          <svg class="save-date__vine" aria-hidden="true"><use href="#vine" /></svg>
        </header>

        <div class="heart reveal is-visible" id="scratchHeart" tabindex="0" role="button" aria-label="Scratch the heart to reveal the wedding date">
          <svg class="heart__ground" viewBox="0 0 100 90" aria-hidden="true"><use href="#heart" /></svg>

          <div class="heart__face">
            <p class="heart__prize">
              <span class="heart__day">${saveDateDay}</span>
              <span class="heart__num">${saveDateNum}</span>
              <span class="heart__month">${saveDateMonth}</span>
              <span class="heart__year">${saveDateYear}</span>
            </p>
            <canvas class="heart__foil" id="scratchCanvas" width="360" height="324" aria-hidden="true"></canvas>
          </div>

          <svg class="heart__edge" viewBox="0 0 100 90" aria-hidden="true">
            <use href="#heart" />
            <use class="heart__edge-inner" href="#heart" transform="translate(50 44) scale(.92) translate(-50 -44)" />
          </svg>

          <div class="heart__burst" id="scratchBurst" aria-hidden="true"></div>
        </div>

        <p class="save-date__hint" id="scratchHint" aria-live="polite">Scratch the gold foil to reveal our date ✨</p>

        <button class="save-btn" id="saveCalBtn" type="button">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>
          <span>Save to Calendar</span>
        </button>
      </section>

      <!-- 4. Functions & Ceremonies ======================================== -->
      <section class="functions" id="functions" aria-labelledby="functions-title">
        <header class="functions__head reveal is-visible">
          <p class="functions__kicker">Join us for</p>
          <h2 class="functions__title" id="functions-title">The Celebrations</h2>
        </header>

        <div class="functions__list" id="functionsList">
          ${functionsList.map((fn, idx) => `
            <article class="fn-card reveal is-visible is-in" style="--accent: ${fn.accent || '#a8485e'};">
              <span class="fn-card__ring" aria-hidden="true"></span>
              <div class="fn-card__art">
                <img src="${fn.image}" width="320" height="320" alt="${fn.name}" loading="lazy">
              </div>

              <div class="fn-card__body">
                <h3 class="fn-card__name" style="--k: 0">${fn.name}</h3>
                ${fn.subtitle ? `<p class="fn-card__subtitle" style="--k: 1">${fn.subtitle}</p>` : ''}
                <span class="fn-card__divider" style="--k: 2" aria-hidden="true"></span>

                <div class="fn-card__date fn-card__line" style="--k: 3">
                  <span class="fn-card__weekday">${fn.weekday || ''}</span>
                  <time>${fn.date}</time>
                </div>

                <p class="fn-card__time fn-card__line" style="--k: 4">
                  <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>${fn.time}</span>
                </p>

                <div class="fn-card__venue" style="--k: 5">
                  <p class="fn-card__venue-name">${fn.venueName}</p>
                  <p class="fn-card__address fn-card__line">
                    <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>${fn.venueAddress}</span>
                  </p>
                </div>

                ${fn.dressCode ? `
                  <div class="fn-card__dress" style="--k: 6">
                    <p class="fn-card__label">Dress Code</p>
                    <p class="fn-card__dress-text">${fn.dressCode}</p>
                  </div>
                ` : ''}

                <div class="fn-card__actions" style="--k: 7">
                  <a class="fn-btn" href="${fn.mapUrl || mapUrl}" target="_blank" rel="noopener noreferrer">
                    <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- 5. Real-Time Muhurat Countdown Plaque ============================== -->
      <section class="countdown" id="countdown" aria-labelledby="countdown-title">
        <header class="countdown__head reveal is-visible">
          <p class="countdown__kicker">Counting down the moments</p>
          <h2 class="countdown__title" id="countdown-title">Until the Muhurat</h2>
          <svg class="countdown__vine" aria-hidden="true"><use href="#vine" /></svg>
        </header>

        <div class="plaque reveal is-visible">
          <img class="plaque__art" src="https://media.shubhweds.in/template-6/countdown-frame.webp" width="1200" height="648" alt="" aria-hidden="true">
          <ol class="plaque__windows">
            <li class="plaque__window">
              <span class="plaque__num" id="cdDays">00</span>
              <span class="plaque__label">Days</span>
            </li>
            <li class="plaque__window">
              <span class="plaque__num" id="cdHours">00</span>
              <span class="plaque__label">Hours</span>
            </li>
            <li class="plaque__window">
              <span class="plaque__num" id="cdMins">00</span>
              <span class="plaque__label">Mins</span>
            </li>
            <li class="plaque__window">
              <span class="plaque__num" id="cdSecs">00</span>
              <span class="plaque__label">Secs</span>
            </li>
          </ol>
        </div>

        <p class="countdown__note reveal is-visible" id="countdownNote">Until we begin our forever together</p>
      </section>

      <!-- 6. Couple Moments Gallery & Arched Thumbs ========================== -->
      <section class="gallery" id="gallery" aria-labelledby="gallery-title">
        <header class="gallery__head reveal is-visible">
          <p class="gallery__kicker">Cherished moments</p>
          <h2 class="gallery__title" id="gallery-title">Our Story</h2>
          <svg class="gallery__vine" aria-hidden="true"><use href="#vine" /></svg>
        </header>

        <div class="album">
          <div class="album__viewer reveal is-visible">
            <div class="album__stage" id="albumStage" tabindex="0" role="button" aria-label="Tap to view photo in fullscreen">
              <div class="album__window">
                <img class="album__photo" id="albumCurrentPhoto" src="${gallery[0]?.src || ''}" alt="${gallery[0]?.caption || ''}">
              </div>
              <img class="album__art" src="https://media.shubhweds.in/template-6/gallery-frame-rect.webp" width="900" height="1180" alt="" aria-hidden="true">
              <button class="album__arrow album__arrow--prev" id="albumPrevBtn" type="button" aria-label="Previous photo">
                <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button class="album__arrow album__arrow--next" id="albumNextBtn" type="button" aria-label="Next photo">
                <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            <p class="album__caption" id="albumCaption">
              <span class="is-on" id="albumCaptionText">${gallery[0]?.caption || ''}</span>
            </p>

            <div class="album__dots" id="albumDots">
              ${gallery.map((_, i) => `<button class="album__dot ${i===0 ? 'is-on' : ''}" data-idx="${i}" type="button" aria-label="Photo ${i+1}"><i></i></button>`).join('')}
            </div>

            <div class="album__thumbs" id="albumThumbs">
              ${gallery.map((item, i) => `
                <button class="thumb ${i===0 ? 'is-on' : ''}" data-idx="${i}" type="button" aria-label="View photo ${i+1}">
                  <span class="thumb__window">
                    <img src="${item.src}" alt="${item.caption || ''}">
                  </span>
                  <img class="thumb__art" src="https://media.shubhweds.in/template-6/gallery-frame-arch.webp" width="270" height="381" alt="" aria-hidden="true">
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- 7. RSVP Section =================================================== -->
      <section class="rsvp" id="rsvp" aria-labelledby="rsvp-title">
        <header class="rsvp__head reveal is-visible">
          <p class="rsvp__kicker">We look forward to celebrating with you</p>
          <h2 class="rsvp__title" id="rsvp-title">Will You Join Us?</h2>
          <svg class="rsvp__vine" aria-hidden="true"><use href="#vine" /></svg>
        </header>

        <form class="rsvp__form reveal is-visible" id="rsvpForm">
          <p class="rsvp__deadline">${rsvpDeadline}</p>

          <fieldset class="rsvp__choice">
            <legend class="rsvp__choice-label">Your RSVP:</legend>
            <div class="rsvp__choice-options">
              <button class="rsvp__choice-btn" id="rsvpBtnAccept" type="button" aria-pressed="true">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                <span>Joyfully Accept</span>
              </button>
              <button class="rsvp__choice-btn" id="rsvpBtnDecline" type="button" aria-pressed="false">
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                <span>Regretfully Decline</span>
              </button>
            </div>
          </fieldset>

          <div class="rsvp__field">
            <label class="rsvp__label" for="rsvpName">Your Full Name *</label>
            <input class="rsvp__input" id="rsvpName" name="fullName" type="text" required placeholder="e.g. Priya Sharma" autocomplete="name">
          </div>

          <div class="rsvp__field">
            <label class="rsvp__label" for="rsvpPhone">Phone / WhatsApp</label>
            <input class="rsvp__input" id="rsvpPhone" name="phone" type="tel" placeholder="+91 98765 43210" autocomplete="tel">
          </div>

          <div class="rsvp__field" id="rsvpGuestsField">
            <label class="rsvp__label" for="rsvpGuests">Number of Guests Attending</label>
            <div class="rsvp__stepper">
              <button class="rsvp__step-btn" id="rsvpStepMinus" type="button" aria-label="Decrease guest count">-</button>
              <input class="rsvp__input rsvp__input--num" id="rsvpGuests" name="guestCount" type="number" min="1" max="10" value="1" readonly>
              <button class="rsvp__step-btn" id="rsvpStepPlus" type="button" aria-label="Increase guest count">+</button>
            </div>
          </div>

          <div class="rsvp__field">
            <label class="rsvp__label" for="rsvpMessage">Wishes for the Couple</label>
            <textarea class="rsvp__input rsvp__input--area" id="rsvpMessage" name="wishes" rows="3" placeholder="Write a heartfelt blessing for Vihaan & Anaya..."></textarea>
          </div>

          <button class="rsvp__submit" id="rsvpSubmitBtn" type="submit">
            <span id="rsvpSubmitLabel">Send RSVP</span>
          </button>
        </form>

        <div class="rsvp__card rsvp__card--thanks" id="rsvpThanks" hidden>
          <div class="rsvp__card-art" aria-hidden="true">💍✨</div>
          <h3 class="rsvp__card-title">Thank You, <span id="rsvpGuestName">Friend</span>!</h3>
          <p class="rsvp__card-text">We are thrilled to celebrate our special day with you. Your presence means the world to us!</p>
          <button class="rsvp__again-btn" id="rsvpAgainBtn" type="button">Update RSVP</button>
        </div>

        <div class="rsvp__card rsvp__card--regret" id="rsvpRegrets" hidden>
          <div class="rsvp__card-art" aria-hidden="true">💌</div>
          <h3 class="rsvp__card-title">We Will Miss You, <span id="rsvpRegretName">Friend</span></h3>
          <p class="rsvp__card-text">Thank you for letting us know. You will be in our thoughts as we exchange our vows.</p>
          <button class="rsvp__again-btn" id="rsvpAgainDeclineBtn" type="button">Change RSVP</button>
        </div>
      </section>

      <!-- 8. Gratitude, Blessings & Falling Petals =========================== -->
      <section class="thanks" id="thanks">
        <div class="thanks__sky" id="thanksSky" aria-hidden="true">
          <div class="thanks__motes"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
          <div class="thanks__petals"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
        </div>

        <div class="thanks__garden">
          <img class="thanks__art" src="https://media.shubhweds.in/template-6/thanks-garden.webp" width="1080" height="920" alt="" aria-hidden="true">

          <div class="thanks__words reveal is-visible">
            <p class="thanks__kicker">With Love & Gratitude</p>
            <h2 class="thanks__title">Thank You</h2>
            <svg class="thanks__vine" aria-hidden="true"><use href="#vine" /></svg>
            <p class="thanks__lead">${thanksMessage}</p>
            <p class="thanks__signoff">— ${familiesLine} —</p>
            <p class="thanks__hashtag">${hashtag}</p>

            <button class="thanks__btn" id="btnSendBlessing" type="button" aria-label="Send a butterfly blessing">
              <span>🦋</span>
              <span>Leave us a blessing</span>
            </button>
          </div>
        </div>

        <div class="blessing-toast" id="blessingToast"></div>
      </section>

      <!-- Lightbox Modal -->
      <div class="wedding-lightbox" id="weddingLightbox" aria-hidden="true">
        <button class="wedding-lightbox__close" id="lightboxCloseBtn" type="button" aria-label="Close photo preview">✕</button>
        <button class="wedding-lightbox__nav wedding-lightbox__prev" id="lightboxPrevBtn" type="button" aria-label="Previous">❮</button>
        <button class="wedding-lightbox__nav wedding-lightbox__next" id="lightboxNextBtn" type="button" aria-label="Next">❯</button>
        <div class="wedding-lightbox__content">
          <img class="wedding-lightbox__img" id="lightboxImg" src="" alt="">
          <p class="wedding-lightbox__caption" id="lightboxCaption"></p>
        </div>
      </div>
    </div>
  `;

  // === INTERACTIVE LOGIC & CONTROLS ==========================================
  const root = container.querySelector('.wedding-site');
  const musicAudio = root.querySelector('#weddingMusic');
  const musicToggleBtn = root.querySelector('#musicToggleBtn');
  const filmVideo = root.querySelector('#filmVideo');
  const filmPlayBtn = root.querySelector('#filmPlayBtn');
  const filmCover = root.querySelector('#filmCover');
  const filmEnd = root.querySelector('#filmEnd');
  const filmSkipBtn = root.querySelector('#filmSkipBtn');
  const introEl = root.querySelector('#weddingIntro');
  const btnEditorDoorToggle = root.querySelector('#btnEditorDoorToggle');
  let isMusicPlaying = false;

  // 1. Audio Toggle
  function toggleMusic(forceState) {
    if (isEditorMode && !forceState) {
      // In editor mode, user manual click on button can toggle
    }
    const play = forceState !== undefined ? forceState : !isMusicPlaying;
    if (play) {
      musicAudio.volume = 0.85;
      musicAudio.play().then(() => {
        isMusicPlaying = true;
        musicToggleBtn.classList.remove('is-muted');
        musicToggleBtn.setAttribute('aria-label', 'Turn music off');
      }).catch(() => {});
    } else {
      musicAudio.pause();
      isMusicPlaying = false;
      musicToggleBtn.classList.add('is-muted');
      musicToggleBtn.setAttribute('aria-label', 'Turn music on');
    }
  }

  musicToggleBtn.addEventListener('click', () => toggleMusic());

  // 2. Opening Film Animation
  function openDoors() {
    introEl.classList.remove('is-ended', 'is-still');
    introEl.classList.add('is-playing');
    filmPlayBtn.style.pointerEvents = 'none';
    filmPlayBtn.style.opacity = '0';
    if (navigator.vibrate) navigator.vibrate(25);

    // Play background music unless in editor preview
    if (!isEditorMode) {
      toggleMusic(true);
    }

    // Start video
    if (filmVideo) {
      filmVideo.currentTime = 0;
      filmVideo.play().catch(() => {});
      filmVideo.addEventListener('ended', onFilmFinished, { once: true });
    }

    // Safety fallback: if video doesn't end or fails, finish after 6.2s
    setTimeout(() => {
      if (!introEl.classList.contains('is-ended')) {
        onFilmFinished();
      }
    }, 6200);
  }

  function onFilmFinished() {
    introEl.classList.add('is-ended');
    introEl.classList.add('is-still');
    introEl.classList.remove('is-playing');
    root.classList.add('is-ready');
    document.documentElement.classList.add('is-ready');
    document.documentElement.classList.remove('is-locked');
    if (filmCover) filmCover.style.display = 'none';
    if (filmEnd) filmEnd.style.opacity = '1';
    if (filmPlayBtn) filmPlayBtn.style.display = 'none';
    if (filmSkipBtn) filmSkipBtn.style.display = 'none';

    // Reveal hero
    const hero = root.querySelector('#weddingHero');
    if (hero) hero.classList.add('is-visible');
  }

  filmPlayBtn.addEventListener('click', openDoors);
  filmCover.addEventListener('click', openDoors);

  filmSkipBtn.addEventListener('click', () => {
    onFilmFinished();
    if (!isEditorMode) toggleMusic(true);
    const inv = root.querySelector('#invitation');
    if (inv) inv.scrollIntoView({ behavior: 'smooth' });
  });

  if (btnEditorDoorToggle) {
    btnEditorDoorToggle.addEventListener('click', () => {
      if (introEl.classList.contains('is-ended')) {
        introEl.classList.remove('is-ended', 'is-still');
        if (filmCover) filmCover.style.display = 'block';
        if (filmEnd) filmEnd.style.opacity = '0';
        if (filmPlayBtn) {
          filmPlayBtn.style.display = 'grid';
          filmPlayBtn.style.opacity = '1';
          filmPlayBtn.style.pointerEvents = 'auto';
        }
        btnEditorDoorToggle.innerHTML = '<span>▶️</span> <span>Open Doors</span>';
      } else {
        openDoors();
        btnEditorDoorToggle.innerHTML = '<span>🚪</span> <span>Replay Doors</span>';
      }
    });
  }

  // If in editor preview mode, start with doors open so creator can see everything immediately
  if (isEditorMode) {
    onFilmFinished();
  }

  // 3. Save the Date Scratch Card Physics
  const scratchCanvas = root.querySelector('#scratchCanvas');
  const scratchHint = root.querySelector('#scratchHint');
  const scratchBurst = root.querySelector('#scratchBurst');
  let isScratching = false;
  let scratchedPercent = 0;
  let isRevealed = false;

  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d');
    const width = scratchCanvas.width;
    const height = scratchCanvas.height;

    // Fill foil with luxury metallic gold gradient and sparkle flecks
    function initFoil() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#caa259');
      grad.addColorStop(0.25, '#f4e5ba');
      grad.addColorStop(0.5, '#b8893d');
      grad.addColorStop(0.75, '#f9ebcb');
      grad.addColorStop(1, '#a6772a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold shimmer specks
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = (i % 2 === 0) ? 'rgba(255,255,255,0.35)' : 'rgba(140,90,20,0.2)';
        ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
      }
    }
    initFoil();

    function scratchAt(x, y) {
      if (isRevealed) return;
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 28, 0, Math.PI * 2);
      ctx.fill();

      checkScratched();
    }

    function checkScratched() {
      if (isRevealed) return;
      const imgData = ctx.getImageData(0, 0, width, height);
      let transparentCount = 0;
      const totalPixels = imgData.data.length / 4;
      const step = 8;

      for (let i = 3; i < imgData.data.length; i += 4 * step) {
        if (imgData.data[i] === 0) transparentCount += step;
      }

      scratchedPercent = (transparentCount / totalPixels) * 100;
      if (scratchedPercent > 32) {
        revealDateCelebration();
      }
    }

    function revealDateCelebration() {
      if (isRevealed) return;
      isRevealed = true;
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

      scratchCanvas.style.transition = 'opacity 0.6s ease';
      scratchCanvas.style.opacity = '0';
      setTimeout(() => {
        scratchCanvas.style.display = 'none';
      }, 600);

      scratchHint.textContent = 'Date Revealed! Save to your calendar below 📅✨';
      scratchHint.style.color = 'var(--gold-text)';

      burstConfetti();
    }

    function burstConfetti() {
      if (!scratchBurst) return;
      const colors = ['#caa259', '#e8b85c', '#a8485e', '#fffdf8', '#8e9c7b'];
      for (let i = 0; i < 35; i++) {
        const p = document.createElement('span');
        p.className = 'confetti-particle';
        const color = colors[i % colors.length];
        const size = Math.random() * 8 + 4;
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 60;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity - 40;

        p.style.cssText = `
          left: 50%;
          top: 50%;
          width: ${size}px;
          height: ${size * 0.7}px;
          background: ${color};
          transform: translate(-50%, -50%);
          transition: transform 0.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.8s ease;
        `;
        scratchBurst.appendChild(p);

        requestAnimationFrame(() => {
          p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${Math.random() * 720}deg)`;
          p.style.opacity = '0';
        });

        setTimeout(() => p.remove(), 900);
      }
    }

    function getCoords(e) {
      const rect = scratchCanvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: (clientX - rect.left) * (width / rect.width),
        y: (clientY - rect.top) * (height / rect.height)
      };
    }

    scratchCanvas.addEventListener('mousedown', (e) => {
      isScratching = true;
      const c = getCoords(e);
      scratchAt(c.x, c.y);
    });
    window.addEventListener('mousemove', (e) => {
      if (!isScratching) return;
      const c = getCoords(e);
      scratchAt(c.x, c.y);
    });
    window.addEventListener('mouseup', () => { isScratching = false; });

    scratchCanvas.addEventListener('touchstart', (e) => {
      isScratching = true;
      const c = getCoords(e);
      scratchAt(c.x, c.y);
    }, { passive: true });
    scratchCanvas.addEventListener('touchmove', (e) => {
      if (!isScratching) return;
      const c = getCoords(e);
      scratchAt(c.x, c.y);
    }, { passive: true });
    scratchCanvas.addEventListener('touchend', () => { isScratching = false; });
  }

  // 4. Save to Calendar .ics Download
  const saveCalBtn = root.querySelector('#saveCalBtn');
  if (saveCalBtn) {
    saveCalBtn.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(15);
      const title = `${groomName} & ${brideName}'s Wedding`;
      const location = `${venueName}, ${venueAddress || venueCity}`;
      const description = `We warmly invite you to celebrate the Shubh Vivah of ${groomName} & ${brideName}.`;

      const start = new Date(weddingDateStr);
      const end = new Date(start.getTime() + 5 * 3600 * 1000);
      const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

      const icsData = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//CelebrationStudio//WeddingInvitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${title}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${groomName.toLowerCase()}-${brideName.toLowerCase()}-wedding.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // 5. Countdown Clock Logic
  const cdDays = root.querySelector('#cdDays');
  const cdHours = root.querySelector('#cdHours');
  const cdMins = root.querySelector('#cdMins');
  const cdSecs = root.querySelector('#cdSecs');
  const cdNote = root.querySelector('#countdownNote');
  const targetDate = new Date(weddingDateStr).getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = targetDate - now;

    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      if (cdNote) cdNote.textContent = 'The celebrations have begun! 🌸💍';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  }

  updateCountdown();
  const cdInterval = setInterval(updateCountdown, 1000);

  // 6. Our Story Gallery Album Controller
  const albumCurrentPhoto = root.querySelector('#albumCurrentPhoto');
  const albumCaptionText = root.querySelector('#albumCaptionText');
  const albumPrevBtn = root.querySelector('#albumPrevBtn');
  const albumNextBtn = root.querySelector('#albumNextBtn');
  const albumStage = root.querySelector('#albumStage');
  const albumDots = root.querySelectorAll('.album__dot');
  const albumThumbs = root.querySelectorAll('.thumb');
  let currentPhotoIdx = 0;

  function setAlbumPhoto(idx) {
    if (idx < 0) idx = gallery.length - 1;
    if (idx >= gallery.length) idx = 0;
    currentPhotoIdx = idx;
    const photo = gallery[idx];

    // Transition photo
    albumCurrentPhoto.classList.remove('is-bleeding');
    void albumCurrentPhoto.offsetWidth;
    albumCurrentPhoto.src = photo.src;
    albumCurrentPhoto.alt = photo.caption || '';
    albumCurrentPhoto.classList.add('is-bleeding');

    if (albumCaptionText) {
      albumCaptionText.textContent = photo.caption || '';
    }

    // Update dots
    albumDots.forEach((dot, i) => {
      dot.classList.toggle('is-on', i === idx);
    });

    // Update thumbs
    albumThumbs.forEach((thumb, i) => {
      thumb.classList.toggle('is-on', i === idx);
    });
  }

  albumPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setAlbumPhoto(currentPhotoIdx - 1);
  });
  albumNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    setAlbumPhoto(currentPhotoIdx + 1);
  });

  albumDots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-idx') || '0', 10);
      setAlbumPhoto(idx);
    });
  });

  albumThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-idx') || '0', 10);
      setAlbumPhoto(idx);
    });
  });

  // Lightbox
  const lightbox = root.querySelector('#weddingLightbox');
  const lightboxImg = root.querySelector('#lightboxImg');
  const lightboxCaption = root.querySelector('#lightboxCaption');
  const lightboxCloseBtn = root.querySelector('#lightboxCloseBtn');
  const lightboxPrevBtn = root.querySelector('#lightboxPrevBtn');
  const lightboxNextBtn = root.querySelector('#lightboxNextBtn');

  function openLightbox(idx) {
    currentPhotoIdx = idx;
    const item = gallery[idx];
    lightboxImg.src = item.src;
    lightboxCaption.textContent = item.caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  albumStage?.addEventListener('click', () => openLightbox(currentPhotoIdx));
  lightboxCloseBtn?.addEventListener('click', closeLightbox);
  lightboxPrevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextIdx = (currentPhotoIdx - 1 + gallery.length) % gallery.length;
    openLightbox(nextIdx);
  });
  lightboxNextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const nextIdx = (currentPhotoIdx + 1) % gallery.length;
    openLightbox(nextIdx);
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // 7. Interactive RSVP Form
  const rsvpForm = root.querySelector('#rsvpForm');
  const rsvpBtnAccept = root.querySelector('#rsvpBtnAccept');
  const rsvpBtnDecline = root.querySelector('#rsvpBtnDecline');
  const rsvpGuestsField = root.querySelector('#rsvpGuestsField');
  const rsvpGuests = root.querySelector('#rsvpGuests');
  const rsvpStepMinus = root.querySelector('#rsvpStepMinus');
  const rsvpStepPlus = root.querySelector('#rsvpStepPlus');
  const rsvpSubmitBtn = root.querySelector('#rsvpSubmitBtn');
  const rsvpSubmitLabel = root.querySelector('#rsvpSubmitLabel');
  const rsvpThanks = root.querySelector('#rsvpThanks');
  const rsvpRegrets = root.querySelector('#rsvpRegrets');
  const rsvpGuestName = root.querySelector('#rsvpGuestName');
  const rsvpRegretName = root.querySelector('#rsvpRegretName');
  const rsvpAgainBtn = root.querySelector('#rsvpAgainBtn');
  const rsvpAgainDeclineBtn = root.querySelector('#rsvpAgainDeclineBtn');
  let isAttending = true;

  function setAttending(attending) {
    isAttending = attending;
    rsvpBtnAccept.setAttribute('aria-pressed', attending ? 'true' : 'false');
    rsvpBtnDecline.setAttribute('aria-pressed', attending ? 'false' : 'true');
    rsvpGuestsField.hidden = !attending;
    rsvpSubmitLabel.textContent = attending ? 'Send RSVP' : 'Send my regrets';
  }

  rsvpBtnAccept.addEventListener('click', () => setAttending(true));
  rsvpBtnDecline.addEventListener('click', () => setAttending(false));

  rsvpStepMinus.addEventListener('click', () => {
    const val = Math.max(1, (parseInt(rsvpGuests.value, 10) || 1) - 1);
    rsvpGuests.value = val;
  });
  rsvpStepPlus.addEventListener('click', () => {
    const val = Math.min(10, (parseInt(rsvpGuests.value, 10) || 1) + 1);
    rsvpGuests.value = val;
  });

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (navigator.vibrate) navigator.vibrate(20);
    const fullName = root.querySelector('#rsvpName').value.trim();
    const phone = root.querySelector('#rsvpPhone').value.trim();
    const guestsCount = isAttending ? (parseInt(rsvpGuests.value, 10) || 1) : 0;
    const message = root.querySelector('#rsvpMessage').value.trim();
    const firstName = fullName.split(' ')[0] || 'Friend';

    const rsvpEntry = {
      fullName,
      phone,
      attending: isAttending,
      guestsCount,
      message,
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage
    try {
      const storedKey = 'shubh_wedding_rsvps';
      const existing = JSON.parse(localStorage.getItem(storedKey) || '[]');
      existing.push(rsvpEntry);
      localStorage.setItem(storedKey, JSON.stringify(existing));
    } catch (err) {}

    rsvpSubmitBtn.disabled = true;
    rsvpSubmitLabel.textContent = 'Sending…';

    setTimeout(() => {
      rsvpForm.hidden = true;
      if (isAttending) {
        rsvpGuestName.textContent = firstName;
        rsvpThanks.hidden = false;
      } else {
        rsvpRegretName.textContent = firstName;
        rsvpRegrets.hidden = false;
      }
      rsvpSubmitBtn.disabled = false;
      rsvpSubmitLabel.textContent = isAttending ? 'Send RSVP' : 'Send my regrets';
    }, 400);
  });

  function resetRsvp() {
    rsvpThanks.hidden = true;
    rsvpRegrets.hidden = true;
    rsvpForm.hidden = false;
    root.querySelector('#rsvpName').focus();
  }
  rsvpAgainBtn?.addEventListener('click', resetRsvp);
  rsvpAgainDeclineBtn?.addEventListener('click', resetRsvp);

  // 8. "Leave us a blessing" Butterfly & Toast
  const btnSendBlessing = root.querySelector('#btnSendBlessing');
  const blessingToast = root.querySelector('#blessingToast');
  const thanksSky = root.querySelector('#thanksSky');
  let blessingIdx = 0;
  let toastTimer = null;

  btnSendBlessing.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(18);
    const quote = blessings[blessingIdx % blessings.length];
    blessingIdx++;

    // Show toast message
    blessingToast.textContent = `🦋 "${quote}"`;
    blessingToast.classList.add('is-shown');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      blessingToast.classList.remove('is-shown');
    }, 4500);

    // Spawn 3D flapping butterfly drifting upwards across the garden
    const bf = document.createElement('div');
    bf.className = 'bf-flight bf-flight--left';
    bf.style.cssText = `
      position: absolute;
      left: ${Math.random() * 60 + 20}%;
      bottom: 20px;
      z-index: 50;
      transition: transform 3.8s ease-out, opacity 3.8s ease;
      pointer-events: none;
    `;
    bf.innerHTML = `
      <div class="bf-tilt">
        <div class="bf-wings">
          <img class="bf-wing bf-wing--left" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-left.png" width="240" height="157" alt="">
          <img class="bf-wing bf-wing--right" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-right.png" width="240" height="157" alt="">
          <img class="bf-body" src="https://media.shubhweds.in/template-6/butterfly-pink-body.png" width="240" height="157" alt="">
        </div>
      </div>
    `;
    thanksSky.appendChild(bf);

    requestAnimationFrame(() => {
      const destX = (Math.random() - 0.5) * 160;
      const destY = -(Math.random() * 280 + 200);
      bf.style.transform = `translate(${destX}px, ${destY}px) scale(0.65) rotate(${Math.random() * 30 - 15}deg)`;
      bf.style.opacity = '0';
    });

    setTimeout(() => bf.remove(), 4000);
  });

  // 9. Scroll Reveal Observers
  const scrollRoot = container.closest('.preview-frame-container') || null;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('fn-card')) {
          entry.target.classList.add('is-in');
        }
      }
    });
  }, { root: scrollRoot, threshold: 0.1 });

  root.querySelectorAll('.reveal, .fn-card').forEach(el => observer.observe(el));

  // If in editor mode, ensure immediate visibility
  if (isEditorMode) {
    root.querySelectorAll('.reveal, .arch').forEach(el => el.classList.add('is-visible'));
    root.querySelectorAll('.fn-card').forEach(el => el.classList.add('is-in'));
  }

  // Store cleanup function
  container._cleanup = () => {
    clearInterval(cdInterval);
    if (toastTimer) clearTimeout(toastTimer);
    if (musicAudio) {
      musicAudio.pause();
      musicAudio.src = '';
    }
    observer.disconnect();
  };
}
