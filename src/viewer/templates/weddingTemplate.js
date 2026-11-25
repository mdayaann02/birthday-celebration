// src/viewer/templates/weddingTemplate.js - Exact ShubhWeds Template-6 (Vihaan & Anaya)
// Matches https://shubhweds.in/demo/template-6/ pixel-for-pixel

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
      subtitle: '',
      weekday: 'Friday',
      time: '10:00 AM - 1:00 PM',
      date: '19 February 2027',
      venueName: 'Poolside Courtyard',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Shades of yellow',
      accent: '#E8B85C',
      image: 'https://media.shubhweds.in/template-6/function-haldi.webp',
      butterfly: 'https://media.shubhweds.in/template-6/butterfly-pink'
    },
    {
      id: 'mehendi',
      name: 'Mehendi',
      subtitle: '',
      weekday: 'Friday',
      time: '4:00 PM - 8:00 PM',
      date: '19 February 2027',
      venueName: 'Garden Terrace',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Greens & pastels',
      accent: '#9DAA80',
      image: 'https://media.shubhweds.in/template-6/function-mehendi.webp',
      butterfly: 'https://media.shubhweds.in/template-6/butterfly-pink'
    },
    {
      id: 'sangeet',
      name: 'Sangeet',
      subtitle: '',
      weekday: 'Saturday',
      time: '7:30 PM - 11:30 PM',
      date: '20 February 2027',
      venueName: 'Grand Ballroom',
      venueAddress: 'The Palace Lawns, Udaipur',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Indo-western glam',
      accent: '#C78A9A',
      image: 'https://media.shubhweds.in/template-6/function-sangeet.webp',
      butterfly: 'https://media.shubhweds.in/template-6/butterfly-pink'
    },
    {
      id: 'wedding',
      name: 'Wedding',
      subtitle: 'Shubh Vivah',
      weekday: 'Sunday',
      time: '7:00 PM Onwards',
      date: '21 February 2027',
      venueName: 'The Palace Lawns',
      venueAddress: 'Udaipur, Rajasthan',
      mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur',
      dressCode: 'Traditional ethnic',
      accent: '#A8485E',
      image: 'https://media.shubhweds.in/template-6/function-wedding.webp',
      butterfly: 'https://media.shubhweds.in/template-6/butterfly-pink'
    }
  ];

  const gallery = (data.gallery && data.gallery.length > 0) ? data.gallery : [
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-01.webp',
      caption: 'Where it all began',
      focus: '50% 32%'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-02.webp',
      caption: 'Hand in hand',
      focus: '55% 45%'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-03.webp',
      caption: 'Our little world',
      focus: '50% 50%'
    },
    {
      src: 'https://shubhweds.in/demo/template-6/assets/media/gallery-photo-04.webp',
      caption: 'Forever starts here',
      focus: '45% 50%'
    }
  ];

  const rsvpDeadline = data.rsvpDeadline || 'Kindly reply by 10 January 2027';
  const thanksMessage = data.thanksMessage || 'for your love and blessings. Our celebration will not be complete without you.';
  const blessings = (data.blessings && data.blessings.length > 0) ? data.blessings : [
    'May you keep choosing each other, every single day.',
    'Wishing you a lifetime of laughter and long talks.',
    'May your home always bloom like this garden.',
    'Two hearts, one beautiful story.',
    'May every morning feel like your wedding day.',
    'Here’s to forever, and then some.',
    'May love grow sweeter with every season.',
    'Blessings, light and endless happiness to you both.'
  ];

  // Build template markup matching ShubhWeds template-6 exact DOM
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

      <!-- 1. Opening Film & Doors ============================================= -->
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

            <img class="film__cover" id="filmCover" src="${posterSrc}" width="1080" height="1920" alt="" aria-hidden="true" fetchpriority="high" style="${isEditorMode ? 'display:none;' : ''}">
            <img class="film__end" id="filmEnd" src="${endPosterSrc}" width="1080" height="1920" alt="" aria-hidden="true" style="${isEditorMode ? 'opacity:1;' : ''}">
          </div>

          <button class="film__play" id="filmPlayBtn" type="button" aria-label="Open the invitation" style="${isEditorMode ? 'display:none;' : ''}">
            <span class="seal" aria-hidden="true">
              <span class="seal__cta">Tap to open</span>
            </span>
            <span class="film__spinner" aria-hidden="true"></span>
          </button>

          <!-- Inside .film so names scale with --u directly above fountain -->
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
        </div>

        <button class="film__skip" id="filmSkipBtn" type="button" style="${isEditorMode ? 'display:none;' : ''}">Skip intro</button>

        <a class="scroll-cue" id="scrollCueBtn" href="#invitation">
          <span>Scroll</span>
          <i aria-hidden="true"></i>
        </a>
      </header>

      <!-- Background audio & toggle button -->
      <audio class="music" id="weddingMusic" src="${audioSrc}" loop preload="none"></audio>

      <button class="music-toggle is-muted is-shown" id="musicToggleBtn" type="button" aria-pressed="false" aria-label="Turn music on">
        <span class="music-toggle__ring" aria-hidden="true"></span>
        <svg class="music-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <svg class="music-toggle__slash" viewBox="0 0 24 24" aria-hidden="true">
          <line x1="3" y1="3" x2="21" y2="21" />
        </svg>
      </button>

      <main>
        <!-- 2. Sacred Invitation Arch ========================================= -->
        <section class="invitation" id="invitation">
          <div class="invitation__stage">
            <img class="jhumar jhumar--1" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true" decoding="async">
            <img class="jhumar jhumar--2" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true" decoding="async">
            <img class="jhumar jhumar--3" src="https://media.shubhweds.in/template-6/invite-jhumar.webp" width="366" height="1464" alt="" aria-hidden="true" decoding="async">

            <div class="arch reveal is-visible">
              <p class="invocation" lang="hi" style="--i: 0">${invocation}</p>

              <p class="shloka" lang="sa" style="--i: 1">
                <span>${shlokaLine1}</span>
                <span>${shlokaLine2}</span>
              </p>

              <p class="blessing" style="--i: 2">${blessingIntro}</p>
              <p class="kicker" style="--i: 3">${invitationKicker}</p>

              <img class="arch__divider" src="https://media.shubhweds.in/template-6/divider-pearl-rose.webp" width="1000" height="132" alt="" aria-hidden="true" decoding="async" style="--i: 4">

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

              <img class="arch__divider" src="https://media.shubhweds.in/template-6/divider-pearl-rose.webp" width="1000" height="132" alt="" aria-hidden="true" decoding="async" style="--i: 6">

              <div class="details" style="--i: 7">
                <p class="details__date">${weddingDateDisplay}</p>
                <p class="details__ceremony">${ceremonyTitle}</p>
                <p class="details__venue">${venueName}, ${venueCity}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Save the Date (Scratch to Reveal) ============================= -->
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

            <svg class="heart__hand" id="scratchHand" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 14a8 8 0 0 1-8 8" />
              <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
              <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
              <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
              <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
            </svg>

            <div class="heart__burst" id="scratchBurst" aria-hidden="true"></div>
          </div>

          <p class="save-date__hint" id="scratchHint" aria-live="polite">Scratch the heart to reveal our date</p>

          <a class="save-btn" id="saveCalBtn" href="#" download="${groomName.toLowerCase()}-${brideName.toLowerCase()}-wedding.ics">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
              <path d="M3 9.5h18M8 2.5v4M16 2.5v4M9.5 15l2 2 3.5-3.5" />
            </svg>
            Save the Date
          </a>
        </section>

        <!-- 4. Functions & Ceremonies ======================================== -->
        <section class="functions" id="functions" aria-labelledby="functions-title">
          <header class="functions__head reveal is-visible">
            <p class="functions__kicker">Join us for</p>
            <h2 class="functions__title" id="functions-title">The Celebrations</h2>
          </header>

          <div class="functions__list" id="functionsList">
            <span class="functions__string" aria-hidden="true"></span>

            ${functionsList.map((fn, idx) => `
              <article class="fn-card reveal is-visible is-in" style="--accent: ${fn.accent || '#a8485e'};" aria-labelledby="fn-${fn.id}-name">
                <span class="fn-card__ring" aria-hidden="true"></span>
                <div class="fn-card__art">
                  <img src="${fn.image}" width="320" height="320" alt="${fn.name} ceremony illustration" loading="lazy" decoding="async">
                </div>

                <div class="fn-card__body">
                  <h3 class="fn-card__name" id="fn-${fn.id}-name" style="--k: 0">${fn.name}</h3>
                  ${fn.subtitle ? `<p class="fn-card__subtitle" style="--k: 1">${fn.subtitle}</p>` : ''}
                  <span class="fn-card__divider" style="--k: 2" aria-hidden="true"></span>

                  <p class="fn-card__line fn-card__date" style="--k: 3">
                    <time>
                      <span class="fn-card__weekday">${fn.weekday || ''}</span>
                      <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/>
                        <path d="M3 9.5h18M8 2.5v4M16 2.5v4"/>
                      </svg>
                      ${fn.date}
                    </time>
                  </p>

                  <p class="fn-card__line fn-card__time" style="--k: 4">
                    <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9"/>
                      <path d="M12 7v5l3 2"/>
                    </svg>
                    <span>${fn.time}</span>
                  </p>

                  <div class="fn-card__venue" style="--k: 5">
                    <p class="fn-card__line fn-card__venue-name">
                      <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20 10c0 4.99-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 14.99 4 10a8 8 0 0 1 16 0"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>${fn.venueName}</span>
                    </p>
                    <p class="fn-card__address">${fn.venueAddress}</p>
                  </div>

                  ${fn.dressCode ? `
                    <div class="fn-card__dress" style="--k: 6">
                      <p class="fn-card__line fn-card__label">
                        <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23Z"/>
                        </svg>
                        <span>Dress code</span>
                      </p>
                      <p class="fn-card__dress-text">${fn.dressCode}</p>
                    </div>
                  ` : ''}

                  <div class="fn-card__actions" style="--k: 7">
                    <a class="fn-btn fn-btn--map" href="${fn.mapUrl || mapUrl}" target="_blank" rel="noopener noreferrer">
                      <svg class="fn-icon" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M9 4 3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z"/>
                        <path d="M9 4v13.5M15 6.5V20"/>
                      </svg>
                      <span>View on Map</span>
                    </a>
                  </div>
                </div>

                <!-- Perched butterfly on the arch -->
                <div class="bf-flight bf-flight--${idx % 2 ? 'right' : 'left'} is-perched" aria-hidden="true">
                  <div class="bf-tilt">
                    <div class="bf-wings">
                      <img class="bf-wing bf-wing--left" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-left.png" width="240" height="157" alt="" decoding="async">
                      <img class="bf-wing bf-wing--right" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-right.png" width="240" height="157" alt="" decoding="async">
                      <img class="bf-body" src="https://media.shubhweds.in/template-6/butterfly-pink-body.png" width="240" height="157" alt="" decoding="async">
                    </div>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </section>

        <!-- 5. Counting Down Plaque ========================================== -->
        <section class="countdown" id="countdown" aria-labelledby="countdown-title">
          <header class="countdown__head reveal is-visible">
            <p class="countdown__kicker">Counting down to</p>
            <h2 class="countdown__title" id="countdown-title">Our Forever</h2>
          </header>

          <div class="plaque reveal is-visible">
            <img class="plaque__art" src="https://media.shubhweds.in/template-6/countdown-plaque.webp" width="1200" height="648" alt="" aria-hidden="true" decoding="async">
            <ol class="plaque__windows" role="timer" aria-live="off">
              <li class="plaque__window">
                <span class="plaque__num" id="cdDays" data-unit="days">00</span>
                <span class="plaque__label">Days</span>
              </li>
              <li class="plaque__window">
                <span class="plaque__num" id="cdHours" data-unit="hours">00</span>
                <span class="plaque__label">Hours</span>
              </li>
              <li class="plaque__window">
                <span class="plaque__num" id="cdMins" data-unit="minutes">00</span>
                <span class="plaque__label">Minutes</span>
              </li>
              <li class="plaque__window">
                <span class="plaque__num" id="cdSecs" data-unit="seconds">00</span>
                <span class="plaque__label">Seconds</span>
              </li>
            </ol>
          </div>

          <p class="countdown__note" id="countdownNote">until we say &ldquo;I do&rdquo;</p>
        </section>

        <!-- 6. Our Moments Gallery =========================================== -->
        <section class="gallery" id="gallery" aria-labelledby="gallery-title">
          <header class="gallery__head reveal is-visible">
            <p class="gallery__kicker">Captured with love</p>
            <h2 class="gallery__title" id="gallery-title">Our Moments</h2>
          </header>

          <div class="album">
            <div class="album__viewer reveal is-visible">
              <div class="album__stage" id="albumStage" tabindex="0" role="button" aria-haspopup="dialog" aria-label="View photo full screen">
                <div class="album__window">
                  <img class="album__photo is-on" id="albumCurrentPhoto" src="${gallery[0]?.src || ''}" alt="${gallery[0]?.caption || ''}" style="object-position: ${gallery[0]?.focus || '50% 30%'};">
                </div>
                <img class="album__art" src="https://media.shubhweds.in/template-6/gallery-frame-rect.webp" width="900" height="1180" alt="" aria-hidden="true">
              </div>
              <button class="album__arrow album__arrow--prev" id="albumPrevBtn" type="button" aria-label="Previous photo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
              </button>
              <button class="album__arrow album__arrow--next" id="albumNextBtn" type="button" aria-label="Next photo">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>

            <p class="album__caption" id="albumCaption" aria-live="polite">
              <span class="is-on" id="albumCaptionText">${gallery[0]?.caption || ''}</span>
              <span></span>
            </p>

            <div class="album__dots" id="albumDots" aria-label="Choose a photo">
              ${gallery.map((_, i) => `<button class="album__dot ${i===0 ? 'is-on' : ''}" data-idx="${i}" type="button" aria-label="Photo ${i+1}"><i></i></button>`).join('')}
            </div>

            <div class="album__thumbs" id="albumThumbs" aria-label="All photos">
              ${gallery.map((item, i) => `
                <button class="thumb ${i===0 ? 'is-on' : ''}" data-idx="${i}" type="button" aria-label="Photo ${i+1}">
                  <span class="thumb__window">
                    <img src="${item.src}" alt="${item.caption || ''}" style="object-position: ${item.focus || '50% 30%'};">
                  </span>
                  <img class="thumb__art" src="https://media.shubhweds.in/template-6/gallery-frame-arch.webp" width="270" height="381" alt="" aria-hidden="true">
                </button>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- 7. RSVP ========================================================== -->
        <section class="rsvp" id="rsvp" aria-labelledby="rsvp-title">
          <header class="rsvp__head reveal is-visible">
            <p class="rsvp__kicker">${rsvpDeadline}</p>
            <h2 class="rsvp__title" id="rsvp-title">Will You Join Us?</h2>
          </header>

          <div class="rsvp__card reveal is-visible">
            <form class="rsvp__form" id="rsvp-form">
              <p class="rsvp__intro">Your presence would make our day complete.</p>

              <div class="rsvp__field">
                <label class="rsvp__label" for="rsvp-name">Your name</label>
                <input class="rsvp__input" id="rsvp-name" name="fullName" type="text" autocomplete="name" placeholder="Full name" required>
              </div>

              <div class="rsvp__field">
                <label class="rsvp__label" for="rsvp-phone">Phone number</label>
                <input class="rsvp__input" id="rsvp-phone" name="phoneNumber" type="tel" autocomplete="tel" inputmode="tel" placeholder="+91 98765 43210" pattern="[0-9+()\\s\\-]{7,}" required>
              </div>

              <fieldset class="rsvp__field">
                <legend class="rsvp__label">Will you be there?</legend>
                <div class="rsvp__choices" data-choice="attendingStatus">
                  <button class="rsvp__choice" id="rsvpBtnAccept" type="button" aria-pressed="true">Joyfully accept</button>
                  <button class="rsvp__choice" id="rsvpBtnDecline" type="button" aria-pressed="false">Regretfully decline</button>
                </div>
              </fieldset>

              <div class="rsvp__field" id="rsvp-guests-field">
                <label class="rsvp__label" for="rsvp-guests">Number of guests</label>
                <div class="rsvp__stepper">
                  <button class="rsvp__step" id="rsvpStepMinus" type="button" data-step="-1" aria-label="One fewer guest">&minus;</button>
                  <input class="rsvp__input rsvp__count" id="rsvp-guests" name="numberOfGuests" type="number" inputmode="numeric" min="1" max="10" value="1">
                  <button class="rsvp__step" id="rsvpStepPlus" type="button" data-step="1" aria-label="One more guest">+</button>
                </div>
              </div>

              <div class="rsvp__field">
                <label class="rsvp__label" for="rsvp-message">A message for us <span>(optional)</span></label>
                <textarea class="rsvp__input" id="rsvp-message" name="message" rows="3" placeholder="Your blessings &amp; wishes&hellip;"></textarea>
              </div>

              <button class="rsvp__send" type="submit" id="rsvp-send">
                <span id="rsvp-send-label">Send RSVP</span>
              </button>
            </form>

            <div class="rsvp__done" id="rsvp-thanks" tabindex="-1" hidden>
              <svg class="rsvp__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>
              <h3 class="rsvp__done-title">Thank you, <span id="rsvpGuestName">friend</span>!</h3>
              <p class="rsvp__done-note">Your seat is saved. We cannot wait to celebrate with you on ${saveDateNum} ${saveDateMonth}.</p>
              <button class="rsvp__again" id="rsvpAgainBtn" type="button">Change my reply</button>
            </div>

            <div class="rsvp__done" id="rsvp-regrets" tabindex="-1" hidden>
              <svg class="rsvp__heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>
              <h3 class="rsvp__done-title">You will be missed, <span id="rsvpRegretName">friend</span></h3>
              <p class="rsvp__done-note">Thank you for your love and blessings. We will feel them with us on the day.</p>
              <button class="rsvp__again" id="rsvpAgainDeclineBtn" type="button">Change my reply</button>
            </div>
          </div>
        </section>

        <!-- 8. Thank You (Garden Terrace & Falling Petals) ===================== -->
        <section class="thanks" id="thanks" aria-labelledby="thanks-title">
          <div class="thanks__scene" aria-hidden="true">
            <picture>
              <source media="(min-aspect-ratio: 1/1)" srcset="https://media.shubhweds.in/template-6/thanks-garden-wide.webp" width="1671" height="941">
              <img class="thanks__art" src="https://media.shubhweds.in/template-6/thanks-garden.webp" width="941" height="1672" alt="" decoding="async">
            </picture>
          </div>

          <div class="thanks__words reveal is-visible">
            <p class="thanks__kicker">With love &amp; gratitude</p>
            <h2 class="thanks__title" id="thanks-title">Thank You</h2>
            <span class="functions__divider" aria-hidden="true"><i></i><i></i><i></i></span>

            <p class="thanks__message">${thanksMessage}</p>

            <p class="thanks__sign">
              <span class="thanks__with">With love,</span>
              <span class="thanks__names">${groomName} &amp; ${brideName}</span>
              <span class="thanks__families">&amp; ${familiesLine}</span>
            </p>

            <p class="thanks__tag">${hashtag}</p>
          </div>

          <div class="thanks__petals" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </div>

          <div class="motes" aria-hidden="true">
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
          </div>

          <!-- Wandering butterflies round the fountain -->
          <div class="thanks__sky" id="thanksSky" aria-hidden="true"></div>
        </section>

        <!-- 9. The Walkway Footer (Walkway Artwork & Send a Blessing) ========== -->
        <footer class="foot">
          <img class="foot__art" src="https://media.shubhweds.in/template-6/thanks-walk.webp" width="1671" height="521" alt="" aria-hidden="true" decoding="async">

          <div class="foot__wish">
            <p class="foot__kicker">Leave us a blessing</p>
            <button class="foot__send" id="btnFootSend" type="button">
              <svg viewBox="0 0 32 24" aria-hidden="true">
                <path d="M16 7.5c-1.6-3.6-5-6-8.6-6C4.6 1.5 2.5 3.4 2.5 6c0 3.5 3.3 5.4 7.3 5.8-3.1.8-5.3 2.8-5.3 5.3 0 2.4 1.9 4.4 4.4 4.4 3.3 0 5.7-3.2 7.1-7.2 1.4 4 3.8 7.2 7.1 7.2 2.5 0 4.4-2 4.4-4.4 0-2.5-2.2-4.5-5.3-5.3 4-.4 7.3-2.3 7.3-5.8 0-2.6-2.1-4.5-4.9-4.5-3.6 0-7 2.4-8.6 6Z"/>
                <path d="M16 7.5v13"/>
              </svg>
              <span>Send a blessing</span>
            </button>
            <p class="foot__note" id="footNote" aria-live="polite">A butterfly will carry it up to us.</p>
          </div>

          <span class="functions__divider" aria-hidden="true"><i></i><i></i><i></i></span>

          <p class="foot__when">${weddingDateDisplay}<span aria-hidden="true"> · </span><br class="foot__br">${venueName}, ${venueCity}</p>
          <p class="foot__made">
            Made with <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg> for our people
          </p>
          <p class="foot__credit">A little piece of forever, crafted by <a href="https://shubhweds.in" target="_blank" rel="noopener">ShubhWeds</a>.</p>

          <div class="foot__flight" id="footFlight" aria-hidden="true"></div>
        </footer>
      </main>

      <!-- Fullscreen Lightbox Modal -->
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

  // === INTERACTIVE CONTROLLER ================================================
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
    const play = forceState !== undefined ? forceState : !isMusicPlaying;
    if (play) {
      musicAudio.volume = 0.85;
      musicAudio.play().then(() => {
        isMusicPlaying = true;
        musicToggleBtn.classList.remove('is-muted');
        musicToggleBtn.setAttribute('aria-pressed', 'true');
        musicToggleBtn.setAttribute('aria-label', 'Turn music off');
      }).catch(() => {});
    } else {
      musicAudio.pause();
      isMusicPlaying = false;
      musicToggleBtn.classList.add('is-muted');
      musicToggleBtn.setAttribute('aria-pressed', 'false');
      musicToggleBtn.setAttribute('aria-label', 'Turn music on');
    }
  }

  musicToggleBtn.addEventListener('click', () => toggleMusic());

  // 2. Opening Film Animation
  function openDoors() {
    introEl.classList.remove('is-ended', 'is-still');
    introEl.classList.add('is-opening', 'is-playing');
    filmPlayBtn.style.pointerEvents = 'none';
    filmPlayBtn.style.opacity = '0';
    if (navigator.vibrate) navigator.vibrate(25);

    if (!isEditorMode) {
      toggleMusic(true);
    }

    if (filmVideo) {
      filmVideo.currentTime = 0;
      filmVideo.play().catch(() => {});
      filmVideo.addEventListener('ended', onFilmFinished, { once: true });
    }

    // Fallback if video fails or ends
    setTimeout(() => {
      if (!introEl.classList.contains('is-ended')) {
        onFilmFinished();
      }
    }, 6200);
  }

  function onFilmFinished() {
    introEl.classList.add('is-opening', 'is-playing', 'is-ended', 'is-still');
    root.classList.add('is-ready');
    if (!isEditorMode) {
      document.documentElement.classList.add('is-ready');
      document.documentElement.classList.remove('is-locked');
    }
    if (filmCover) filmCover.style.display = 'none';
    if (filmEnd) filmEnd.style.opacity = '1';
    if (filmPlayBtn) filmPlayBtn.style.display = 'none';
    if (filmSkipBtn) filmSkipBtn.style.display = 'none';

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
        introEl.classList.remove('is-ended', 'is-still', 'is-opening', 'is-playing');
        if (filmCover) filmCover.style.display = 'block';
        if (filmEnd) filmEnd.style.opacity = '0';
        if (filmPlayBtn) {
          filmPlayBtn.style.display = 'grid';
          filmPlayBtn.style.opacity = '1';
          filmPlayBtn.style.pointerEvents = 'auto';
        }
        if (filmSkipBtn) filmSkipBtn.style.display = 'block';
        if (filmVideo) {
          try {
            filmVideo.pause();
            filmVideo.currentTime = 0;
          } catch {}
        }
        btnEditorDoorToggle.innerHTML = '<span>▶️</span> <span>Open Doors</span>';
      } else {
        openDoors();
        btnEditorDoorToggle.innerHTML = '<span>🚪</span> <span>Replay Doors</span>';
      }
    });
  }

  // In editor mode, start with doors open so user sees content immediately
  if (isEditorMode) {
    onFilmFinished();
  } else {
    document.documentElement.classList.add('is-locked');
  }

  // Responsive thanks garden framing
  function updateThanksHeight() {
    const rootEl = container.closest('.wedding-site') || root;
    const clientW = rootEl.clientWidth || window.innerWidth;
    const clientH = rootEl.clientHeight || window.innerHeight;
    const thanksH = Math.max(600, Math.min(window.innerHeight, clientH));
    rootEl.style.setProperty('--thanks-h', `${thanksH}px`);
    rootEl.classList.toggle('thanks-framed', clientW > thanksH * 941 / 1672);
  }
  updateThanksHeight();
  window.addEventListener('resize', updateThanksHeight);

  // 3. Save the Date Scratch Card Physics
  const scratchCanvas = root.querySelector('#scratchCanvas');
  const scratchHint = root.querySelector('#scratchHint');
  const scratchBurst = root.querySelector('#scratchBurst');
  const scratchHand = root.querySelector('#scratchHand');
  const scratchHeart = root.querySelector('#scratchHeart');
  const saveDateSection = root.querySelector('#save-date');
  const saveCalBtn = root.querySelector('#saveCalBtn');
  let isScratching = false;
  let isRevealed = false;

  // Initialize Calendar Data URL on saveCalBtn
  if (saveCalBtn) {
    const startIso = weddingDateStr.includes(':') ? (weddingDateStr.length === 16 ? weddingDateStr + ':00+05:30' : weddingDateStr) : '2027-02-13T18:00:00+05:30';
    const endIso = '2027-02-13T23:30:00+05:30';
    const fmt = (d) => d.replace(/[-:]/g, '').split('.')[0];
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//ShubhWeds//Invitation//EN',
      'BEGIN:VEVENT',
      `UID:${fmt(startIso)}-wedding@shubhweds.in`,
      `DTSTAMP:${fmt(new Date().toISOString())}`,
      `DTSTART:${fmt(startIso)}`,
      `DTEND:${fmt(endIso)}`,
      `SUMMARY:${groomName} & ${brideName}'s Wedding`,
      `LOCATION:${venueName}, ${venueAddress || venueCity}`,
      `DESCRIPTION:We warmly invite you to celebrate the Shubh Vivah of ${groomName} & ${brideName}.`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    saveCalBtn.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
  }

  if (scratchCanvas) {
    const ctx = scratchCanvas.getContext('2d', { willReadFrequently: true });
    const width = scratchCanvas.width;
    const height = scratchCanvas.height;
    const heartSvgPath = 'M50 87C22 67 2 50 2 27 2 12 13 2 26 2c11 0 19 6 24 15C55 8 63 2 74 2c13 0 24 10 24 25 0 23-20 40-48 60Z';

    function initFoil() {
      const path = new Path2D();
      path.addPath(new Path2D(heartSvgPath), new DOMMatrix().scale(width / 100, height / 90));
      ctx.save();
      ctx.clip(path);

      // Authentic sage & gold glitter gradient
      const grad = ctx.createRadialGradient(width * 0.42, height * 0.3, 0, width * 0.5, height * 0.45, width * 0.7);
      grad.addColorStop(0, '#b7c3a1');
      grad.addColorStop(0.35, '#8d9c76');
      grad.addColorStop(0.75, '#64744f');
      grad.addColorStop(1, '#4a5938');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold & pearl glitter particles
      const count = Math.round((width * height) / 90);
      for (let i = 0; i < count; i++) {
        const r = Math.random();
        ctx.fillStyle = r < 0.55 ? `rgba(255, 249, 230, ${0.25 + Math.random() * 0.6})` :
                        r < 0.8 ? `rgba(226, 200, 140, ${0.4 + Math.random() * 0.5})` :
                                  `rgba(36, 44, 26, ${0.15 + Math.random() * 0.3})`;
        const sz = 0.5 + Math.random() * 1.5;
        ctx.fillRect(Math.random() * width, Math.random() * height, sz, sz);
      }

      // Cross star sparkles
      ctx.fillStyle = 'rgba(255, 250, 235, .95)';
      for (let i = 0; i < 26; i++) {
        const sx = Math.random() * width;
        const sy = Math.random() * height;
        const arm = 2 + Math.random() * 4;
        ctx.fillRect(sx - arm, sy - 0.5, arm * 2, 1);
        ctx.fillRect(sx - 0.5, sy - arm, 1, arm * 2);
      }
      ctx.restore();
    }
    initFoil();

    function scratchAt(x, y) {
      if (isRevealed) return;
      if (scratchHand && !scratchHand.hidden) scratchHand.hidden = true;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 26, 0, Math.PI * 2);
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

      const percent = (transparentCount / totalPixels) * 100;
      if (percent > 30) {
        revealDateCelebration();
      }
    }

    function revealDateCelebration() {
      if (isRevealed) return;
      isRevealed = true;
      if (navigator.vibrate) navigator.vibrate([40, 60, 40]);

      scratchHeart.classList.add('is-revealed');
      saveDateSection.classList.add('is-revealed');
      scratchHint.textContent = 'We can’t wait to celebrate with you';
      scratchHint.style.color = 'var(--rose)';

      // Burst hearts
      burstHeartSvgs();

      scratchCanvas.style.transition = 'opacity 0.7s ease';
      scratchCanvas.style.opacity = '0';
      setTimeout(() => {
        scratchCanvas.remove();
      }, 700);
    }

    function burstHeartSvgs() {
      if (!scratchBurst) return;
      const colors = ['#a8615f', '#c3a165', '#55653f', '#e2b3a8', '#8e9c7b'];
      const szBase = scratchHeart.offsetWidth;
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
        const dist = szBase * (0.35 + Math.random() * 0.3);
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 90');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        use.setAttribute('href', '#heart');
        svg.appendChild(use);

        svg.style.setProperty('--s', `${Math.round(szBase * (0.04 + Math.random() * 0.05))}px`);
        svg.style.setProperty('--c', colors[i % colors.length]);
        svg.style.setProperty('--dx', `${Math.round(Math.cos(angle) * dist)}px`);
        svg.style.setProperty('--dy', `${Math.round(Math.sin(angle) * dist * 0.8 - szBase * 0.1)}px`);
        svg.style.setProperty('--r', `${Math.round((Math.random() - 0.5) * 60)}deg`);
        svg.style.setProperty('--w', `${Math.round(Math.random() * 180)}ms`);
        scratchBurst.appendChild(svg);
      }
      setTimeout(() => {
        scratchBurst.textContent = '';
      }, 2000);
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

  // 4. Real-time Countdown
  const cdDays = root.querySelector('#cdDays');
  const cdHours = root.querySelector('#cdHours');
  const cdMins = root.querySelector('#cdMins');
  const cdSecs = root.querySelector('#cdSecs');
  const cdNote = root.querySelector('#countdownNote');
  const targetDate = new Date(weddingDateStr).getTime();

  function updateCountdown() {
    const diff = targetDate - Date.now();
    if (diff <= 0) {
      if (cdDays) cdDays.textContent = '00';
      if (cdHours) cdHours.textContent = '00';
      if (cdMins) cdMins.textContent = '00';
      if (cdSecs) cdSecs.textContent = '00';
      if (cdNote) cdNote.textContent = 'The celebrations have begun! 🌸💍';
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = String(d).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(m).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(s).padStart(2, '0');
  }
  updateCountdown();
  const cdInterval = setInterval(updateCountdown, 1000);

  // 5. Gallery Album Controller
  const albumCurrentPhoto = root.querySelector('#albumCurrentPhoto');
  const albumCaptionText = root.querySelector('#albumCaptionText');
  const albumPrevBtn = root.querySelector('#albumPrevBtn');
  const albumNextBtn = root.querySelector('#albumNextBtn');
  const albumStage = root.querySelector('#albumStage');
  const albumDots = root.querySelectorAll('.album__dot');
  const albumThumbs = root.querySelectorAll('.thumb');
  let currentPhotoIdx = 0;
  let galleryTimer = null;

  function setAlbumPhoto(idx) {
    if (idx < 0) idx = gallery.length - 1;
    if (idx >= gallery.length) idx = 0;
    currentPhotoIdx = idx;
    const photo = gallery[idx];

    albumCurrentPhoto.classList.remove('is-bleeding');
    void albumCurrentPhoto.offsetWidth;
    albumCurrentPhoto.src = photo.src;
    albumCurrentPhoto.alt = photo.caption || '';
    albumCurrentPhoto.style.objectPosition = photo.focus || '50% 30%';
    albumCurrentPhoto.classList.add('is-bleeding');

    if (albumCaptionText) albumCaptionText.textContent = photo.caption || '';

    albumDots.forEach((dot, i) => dot.classList.toggle('is-on', i === idx));
    albumThumbs.forEach((thumb, i) => thumb.classList.toggle('is-on', i === idx));

    resetAutoPlay();
  }

  function resetAutoPlay() {
    if (galleryTimer) clearInterval(galleryTimer);
    galleryTimer = setInterval(() => {
      setAlbumPhoto((currentPhotoIdx + 1) % gallery.length);
    }, 5500);
  }
  resetAutoPlay();

  albumPrevBtn?.addEventListener('click', (e) => { e.stopPropagation(); setAlbumPhoto(currentPhotoIdx - 1); });
  albumNextBtn?.addEventListener('click', (e) => { e.stopPropagation(); setAlbumPhoto(currentPhotoIdx + 1); });
  albumDots.forEach(dot => dot.addEventListener('click', () => setAlbumPhoto(parseInt(dot.getAttribute('data-idx') || '0', 10))));
  albumThumbs.forEach(thumb => thumb.addEventListener('click', () => setAlbumPhoto(parseInt(thumb.getAttribute('data-idx') || '0', 10))));

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
  lightboxPrevBtn?.addEventListener('click', (e) => { e.stopPropagation(); openLightbox((currentPhotoIdx - 1 + gallery.length) % gallery.length); });
  lightboxNextBtn?.addEventListener('click', (e) => { e.stopPropagation(); openLightbox((currentPhotoIdx + 1) % gallery.length); });
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // 6. Interactive RSVP Form
  const rsvpForm = root.querySelector('#rsvp-form');
  const rsvpBtnAccept = root.querySelector('#rsvpBtnAccept');
  const rsvpBtnDecline = root.querySelector('#rsvpBtnDecline');
  const rsvpGuestsField = root.querySelector('#rsvp-guests-field');
  const rsvpGuests = root.querySelector('#rsvp-guests');
  const rsvpStepMinus = root.querySelector('#rsvpStepMinus');
  const rsvpStepPlus = root.querySelector('#rsvpStepPlus');
  const rsvpSubmitBtn = root.querySelector('#rsvp-send');
  const rsvpSubmitLabel = root.querySelector('#rsvp-send-label');
  const rsvpThanks = root.querySelector('#rsvp-thanks');
  const rsvpRegrets = root.querySelector('#rsvp-regrets');
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
    rsvpGuests.value = Math.max(1, (parseInt(rsvpGuests.value, 10) || 1) - 1);
  });
  rsvpStepPlus.addEventListener('click', () => {
    rsvpGuests.value = Math.min(10, (parseInt(rsvpGuests.value, 10) || 1) + 1);
  });

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (navigator.vibrate) navigator.vibrate(20);
    const fullName = root.querySelector('#rsvp-name').value.trim();
    const phone = root.querySelector('#rsvp-phone').value.trim();
    const guestsCount = isAttending ? (parseInt(rsvpGuests.value, 10) || 1) : 0;
    const message = root.querySelector('#rsvp-message').value.trim();
    const firstName = fullName.split(' ')[0] || 'Friend';

    const rsvpEntry = {
      fullName,
      phone,
      attending: isAttending,
      guestsCount,
      message,
      submittedAt: new Date().toISOString()
    };

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
        rsvpThanks.focus();
      } else {
        rsvpRegretName.textContent = firstName;
        rsvpRegrets.hidden = false;
        rsvpRegrets.focus();
      }
      rsvpSubmitBtn.disabled = false;
      rsvpSubmitLabel.textContent = isAttending ? 'Send RSVP' : 'Send my regrets';
    }, 450);
  });

  function resetRsvp() {
    rsvpThanks.hidden = true;
    rsvpRegrets.hidden = true;
    rsvpForm.hidden = false;
    root.querySelector('#rsvp-name').focus();
  }
  rsvpAgainBtn?.addEventListener('click', resetRsvp);
  rsvpAgainDeclineBtn?.addEventListener('click', resetRsvp);

  // 7. Wandering Butterflies round Fountain in .thanks__sky
  const thanksSky = root.querySelector('#thanksSky');
  if (thanksSky) {
    for (let i = 0; i < 2; i++) {
      const bf = document.createElement('div');
      bf.className = 'bf-flight bf-free is-flying';
      bf.style.setProperty('--bf-w', `${i === 0 ? 34 : 28}px`);
      bf.style.position = 'absolute';
      bf.style.left = `${35 + i * 28}%`;
      bf.style.top = `${60 + i * 8}%`;
      bf.style.animation = `fn-float ${3.5 + i * 1.2}s ease-in-out infinite alternate`;
      bf.innerHTML = `
        <div class="bf-tilt">
          <div class="bf-wings">
            <img class="bf-wing bf-wing--left" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-left.png" width="240" height="157" alt="" decoding="async">
            <img class="bf-wing bf-wing--right" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-right.png" width="240" height="157" alt="" decoding="async">
            <img class="bf-body" src="https://media.shubhweds.in/template-6/butterfly-pink-body.png" width="240" height="157" alt="" decoding="async">
          </div>
        </div>
      `;
      thanksSky.appendChild(bf);
    }
  }

  // 8. Walkway Footer "Send a blessing" with 3D Butterfly Flight & Petal Puffs
  const btnFootSend = root.querySelector('#btnFootSend');
  const footNote = root.querySelector('#footNote');
  const footFlight = root.querySelector('#footFlight');
  let blessingIdx = 0;
  let blessingTimer = null;

  btnFootSend?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(18);
    const quote = blessings[blessingIdx % blessings.length];
    blessingIdx++;

    clearTimeout(blessingTimer);
    footNote.classList.add('is-hidden');
    blessingTimer = setTimeout(() => {
      footNote.textContent = `“${quote}”`;
      footNote.classList.add('is-blessing');
      footNote.classList.remove('is-hidden');
    }, 220);

    // Spawn 3D flapping butterfly flying from button upwards across the screen
    const rect = btnFootSend.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + 4;

    const flyBf = document.createElement('div');
    flyBf.className = 'bf-flight bf-free is-flying';
    flyBf.style.setProperty('--bf-w', '44px');
    flyBf.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      z-index: 9999;
      pointer-events: none;
      transition: transform 3.6s cubic-bezier(.35, .1, .45, 1), opacity 3.6s ease;
    `;
    flyBf.innerHTML = `
      <div class="bf-tilt">
        <div class="bf-wings">
          <img class="bf-wing bf-wing--left" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-left.png" width="240" height="157" alt="" decoding="async">
          <img class="bf-wing bf-wing--right" src="https://media.shubhweds.in/template-6/butterfly-pink-wing-right.png" width="240" height="157" alt="" decoding="async">
          <img class="bf-body" src="https://media.shubhweds.in/template-6/butterfly-pink-body.png" width="240" height="157" alt="" decoding="async">
        </div>
      </div>
    `;
    footFlight.appendChild(flyBf);

    requestAnimationFrame(() => {
      const targetX = (Math.random() - 0.5) * window.innerWidth * 0.6;
      const targetY = -window.innerHeight - 80;
      flyBf.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.6) rotate(${(Math.random() - 0.5) * 40}deg)`;
      flyBf.style.opacity = '0';
    });

    // Petal puffs
    for (let p = 0; p < 8; p++) {
      const puff = document.createElement('i');
      puff.className = 'foot__puff';
      puff.style.left = `${startX}px`;
      puff.style.top = `${startY}px`;
      puff.style.transition = 'transform 0.8s cubic-bezier(.2, .7, .4, 1), opacity 0.8s ease';
      footFlight.appendChild(puff);

      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.4;
      const dist = 40 + Math.random() * 55;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist + 20;

      requestAnimationFrame(() => {
        puff.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.round(Math.random() * 360)}deg)`;
        puff.style.opacity = '0';
      });

      setTimeout(() => puff.remove(), 900);
    }

    setTimeout(() => flyBf.remove(), 3800);
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

  if (isEditorMode) {
    root.querySelectorAll('.reveal, .arch').forEach(el => el.classList.add('is-visible'));
    root.querySelectorAll('.fn-card').forEach(el => el.classList.add('is-in'));
  }

  // Teardown cleanup
  container._cleanup = () => {
    clearInterval(cdInterval);
    if (galleryTimer) clearInterval(galleryTimer);
    if (blessingTimer) clearTimeout(blessingTimer);
    if (musicAudio) {
      musicAudio.pause();
      musicAudio.src = '';
    }
    window.removeEventListener('resize', updateThanksHeight);
    document.documentElement.classList.remove('is-locked');
    observer.disconnect();
  };
}
