// src/studio/builderApp.js - 2-Luv Inspired Luxury Creator Website & Studio
// Reference: https://www.2-luv.com/en/event/birthday
// Features: Warm cream palette, interactive candle blower, party inside grid,
// occasion showcase, live iPhone 16 Pro simulator, and 1-tap free sharing.

import confetti from 'canvas-confetti';
import { TEMPLATES } from '../models/templateRegistry.js';
import { 
  saveLocalDraft, 
  getLocalDraft, 
  saveActiveCelebration, 
  getActiveCelebrationData 
} from '../models/siteStorage.js';
import { renderTemplateSelector } from './templateSelector.js';
import { renderVisualEditor } from './visualEditor.js';
import { openShareModal } from './shareModal.js';
import { renderViewerApp } from '../viewer/viewerApp.js';
import { renderCreatorGuide } from './creatorGuide.js';

export function renderStudioApp(root) {
  // Flag that editor mode is active so audio players never auto-play on click/touch in editor
  window.isCelebrationEditorMode = true;

  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash.replace(/^#/, '');
  const urlTid = searchParams.get('template') || (hash.startsWith('template=') ? hash.substring(9) : null) || (TEMPLATES[hash] ? hash : null);
  let activeTemplateId = (urlTid && TEMPLATES[urlTid]) ? urlTid : "blossom";
  let activeData = getActiveCelebrationData(activeTemplateId);
  let currentMobileTab = "editor"; // "templates" | "editor" | "preview"
  let demoAge = parseInt(activeData.age || "21", 10) || 21;

  root.innerHTML = `
    <div class="two-luv-page-wrap">
      
      <!-- 1. 2-Luv Floating Navigation Header -->
      <header class="two-luv-nav">
        <a href="#secHero" class="two-luv-brand">
          <div class="two-luv-logo-heart">♥</div>
          <span class="two-luv-logo-text">2luv</span>
        </a>

        <nav class="two-luv-nav-links">
          <a href="#secHero" class="two-luv-nav-link">The party</a>
          <a href="#secCandles" class="two-luv-nav-link">Candles</a>
          <a href="#secOccasions" class="two-luv-nav-link">Occasions</a>
          <a href="#studioWorkspaceSection" class="two-luv-nav-link">Live Studio</a>
          <a href="#secHowItWorks" class="two-luv-nav-link">How it works</a>
          <a href="#secFaq" class="two-luv-nav-link">FAQ</a>
        </nav>

        <div class="two-luv-nav-actions">
          <a href="#studioWorkspaceSection" class="btn-two-luv-cta" id="btnNavCreate">
            <span>✨ Create a Gift</span>
          </a>
          <button type="button" class="btn-two-luv-secondary" id="btnNavShare">
            <span>🚀 Free Link</span>
          </button>
        </div>
      </header>

      <!-- 2. Hero Section (2-Luv Layout & Placements) -->
      <section class="two-luv-hero" id="secHero">
        <div class="two-luv-tag-pill">
          <span>✨ DIGITAL BIRTHDAY GIFT • 100% FREE FOREVER ✨</span>
        </div>

        <h1 class="two-luv-hero-title">
          Turn your birthday wishes<br />into a personal digital gift.
        </h1>

        <p class="two-luv-hero-sub">
          Add your birthday message, photos and their favourite soundtrack to an interactive page-by-page digital celebration. Preview live, customize every moment, then share instantly by link or WhatsApp QR code.
        </p>

        <div class="two-luv-hero-btn-row">
          <a href="#studioWorkspaceSection" class="btn-two-luv-cta" style="font-size:15px; padding:13px 28px;">
            <span>✨ Create a Birthday Gift</span>
            <span>➔</span>
          </a>
          <button type="button" class="btn-two-luv-secondary" id="btnHeroJumpPreview" style="font-size:14px; padding:12px 24px;">
            <span>👁️ Test Interactive Preview</span>
          </button>
        </div>

        <div class="two-luv-trust-badge">
          <span>⭐ 4.8 / 5 Rating</span>
          <span>•</span>
          <span>370k+ celebrations created</span>
          <span>•</span>
          <span>Opens on any phone</span>
          <span>•</span>
          <span>100% Free</span>
        </div>

        <!-- 3. Interactive Hero Candle Showcase Widget (2-Luv Feature) -->
        <div class="two-luv-candle-widget" id="secCandles">
          <span class="two-luv-card-meta-pill">INTERACTIVE PREVIEW</span>
          <h2 class="two-luv-card-recipient-msg" id="demoCardHeading">
            Happy birthday, ${activeData.recipientName || 'Bia'}!
          </h2>
          <p class="two-luv-card-sub-msg" id="demoCardSub">
            Alex threw a little party just for you.
          </p>

          <!-- Interactive Age Stepper -->
          <div class="two-luv-age-stepper">
            <span class="two-luv-age-lbl">How old?</span>
            <button type="button" class="btn-stepper-round" id="btnAgeMinus">−</button>
            <span class="two-luv-age-val" id="demoAgeVal">${demoAge}</span>
            <button type="button" class="btn-stepper-round" id="btnAgePlus">+</button>
          </div>

          <!-- 3D Cake with Blowable Candles -->
          <div class="two-luv-cake-stage">
            <div class="two-luv-candles-row" id="demoCandlesRow">
              <div class="two-luv-candle-flame"></div>
              <div class="two-luv-candle-flame"></div>
              <div class="two-luv-candle-flame"></div>
            </div>
            <div class="two-luv-smoke-wisp" id="demoSmokeWisp">💨</div>
            <div class="two-luv-cake-base">🎂</div>
          </div>

          <div class="two-luv-blow-action-wrap">
            <button type="button" class="btn-hold-to-blow" id="btnHoldToBlow">
              💨 Hold to Blow Candles
            </button>
            <button type="button" class="btn-light-again" id="btnLightAgain">
              🔥 Light them again
            </button>
          </div>
          <p class="two-luv-candle-hint" id="demoCandleHint">
            In the gift, the birthday person blows into their phone's microphone to extinguish the candles. Here, just hold the button.
          </p>
        </div>
      </section>

      <!-- 4. "The Party Inside" — 8 Interactive Chapters Grid -->
      <section class="two-luv-party-inside" id="secParty">
        <div class="two-luv-section-header">
          <span class="two-luv-section-tag">THE PARTY INSIDE</span>
          <h2 class="two-luv-section-title">Every part of the letter<br />becomes a game.</h2>
          <p class="two-luv-section-sub">
            The gift is an interactive journey from one moment to the next. Only the parts you fill in appear.
          </p>
        </div>

        <div class="two-luv-features-grid">
          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">01</span>
            <h3 class="two-luv-feat-title">The Cover</h3>
            <p class="two-luv-feat-desc">The cake spins while your photos orbit as polaroids. They can spin it with a finger.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">02</span>
            <h3 class="two-luv-feat-title">The Letter</h3>
            <p class="two-luv-feat-desc">A pink wax envelope opens under a shower of confetti with live typewriter animation.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">03</span>
            <h3 class="two-luv-feat-title">What I Love / Dua Jar</h3>
            <p class="two-luv-feat-desc">A glowing glass jar of wishes: tap the jar to draw personalized prayers & reasons why they are adored.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">04</span>
            <h3 class="two-luv-feat-title">Photo Booth</h3>
            <p class="two-luv-feat-desc">Curtain, 3, 2, 1, flash: authentic polaroid strips come out with handwritten notes.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">05</span>
            <h3 class="two-luv-feat-title">The Song & Vinyl</h3>
            <p class="two-luv-feat-desc">A vintage spinning mini vinyl CD record player in the corner with the soundtrack you choose.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">06</span>
            <h3 class="two-luv-feat-title">The Date & Countdown</h3>
            <p class="two-luv-feat-desc">Send early: the party waits until midnight on their birthday, then opens with 3D velvet curtains.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">07</span>
            <h3 class="two-luv-feat-title">Interactive Games</h3>
            <p class="two-luv-feat-desc">Golden holographic scratch ticket, runaway banter buttons, and fist-bump rumble shockwaves.</p>
          </div>

          <div class="two-luv-feature-card">
            <span class="two-luv-feat-num">08</span>
            <h3 class="two-luv-feat-title">Imperial Citation</h3>
            <p class="two-luv-feat-desc">An official gold-foiled certificate of distinction crowning them as the world's best.</p>
          </div>
        </div>
      </section>

      <!-- 5. "Choose Who It's For" (Occasion Gallery Pills) -->
      <section class="two-luv-occasions-wrap" id="secOccasions">
        <div class="two-luv-section-header">
          <span class="two-luv-section-tag">WHO IT'S FOR</span>
          <h2 class="two-luv-section-title">To throw a party<br />for the one you love.</h2>
          <p class="two-luv-section-sub">Tap any occasion below to customize their special theme and interactive moments:</p>
        </div>

        <div class="two-luv-occasions-pills" id="twoLuvOccasionPills">
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'blossom' ? 'active' : ''}" data-tid="blossom">
            <span>🌸</span><span>Blossom Viral Reel</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'bestie_girl' ? 'active' : ''}" data-tid="bestie_girl">
            <span>👯‍♀️</span><span>Bestie Girl</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'bestie_boy' ? 'active' : ''}" data-tid="bestie_boy">
            <span>🤜🤛</span><span>Bestie Boy</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'mother' ? 'active' : ''}" data-tid="mother">
            <span>🌸</span><span>Mother (Maa)</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'father' ? 'active' : ''}" data-tid="father">
            <span>🌟</span><span>Father (Papa)</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'sister' ? 'active' : ''}" data-tid="sister">
            <span>👧</span><span>Sister (Behna)</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'brother' ? 'active' : ''}" data-tid="brother">
            <span>👦</span><span>Brother (Bhai)</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'birthday' ? 'active' : ''}" data-tid="birthday">
            <span>🎂</span><span>Birthday Special</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'anniversary' ? 'active' : ''}" data-tid="anniversary">
            <span>💍</span><span>Anniversary</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'valentine' ? 'active' : ''}" data-tid="valentine">
            <span>🌹</span><span>Valentine / Proposal</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'sorry' ? 'active' : ''}" data-tid="sorry">
            <span>🥺</span><span>Sincere Apology</span>
          </button>
          <button type="button" class="btn-two-luv-occ-pill ${activeTemplateId === 'friendship' ? 'active' : ''}" data-tid="friendship">
            <span>🏆</span><span>Best Friend</span>
          </button>
        </div>
      </section>

      <!-- 6. Embedded Live Creator Studio & Phone Simulator -->
      <section class="two-luv-studio-section" id="studioWorkspaceSection">
        <div class="two-luv-studio-card">
          
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:18px; flex-wrap:wrap; gap:10px;">
            <div>
              <span class="two-luv-tag-pill" style="margin-bottom:4px;">LIVE CREATOR STUDIO</span>
              <h2 style="font-family:'Playfair Display',serif; font-size:24px; color:#1a0e14; margin:0;">
                Customize Your Celebration
              </h2>
            </div>
            <div style="display:flex; gap:10px;">
              <button type="button" class="btn-two-luv-secondary" id="btnStudioSave">
                💾 <span>Save Website</span>
              </button>
              <button type="button" class="btn-two-luv-cta" id="btnStudioShare">
                🚀 <span>Get Free Share Link</span>
              </button>
            </div>
          </div>

          <!-- Mobile Segmented Tabs -->
          <nav class="studio-mobile-tabs" id="studioMobileTabs" aria-label="Editor View Tabs">
            <button class="mobile-tab-btn" data-tab="templates" id="tabBtnTemplates">
              <span class="tab-btn-icon">🎨</span>
              <span class="tab-btn-text">Occasions</span>
            </button>
            <button class="mobile-tab-btn active" data-tab="editor" id="tabBtnEditor">
              <span class="tab-btn-icon">✏️</span>
              <span class="tab-btn-text">Customize</span>
            </button>
            <button class="mobile-tab-btn" data-tab="preview" id="tabBtnPreview">
              <span class="tab-btn-icon">👁️</span>
              <span class="tab-btn-text">Live Preview</span>
              <span class="tab-live-pulse"></span>
            </button>
          </nav>

          <!-- Main Studio Workspace -->
          <div class="studio-workspace mobile-view-editor" id="studioWorkspace">
            <!-- Controls & Editor Sidebar -->
            <div class="studio-sidebar" id="studioSidebar">
              <div id="creatorGuideMount"></div>

              <!-- Section 1: Template Gallery (Tab "templates" on mobile) -->
              <div class="studio-tab-section studio-tab-templates" id="tabTemplatesSection">
                <div id="templateSelectorMount"></div>
              </div>

              <!-- Section 2: Visual Customization Form (Tab "editor" on mobile) -->
              <div class="studio-tab-section studio-tab-editor active" id="tabEditorSection">
                <div class="studio-occasion-banner" id="studioOccasionBanner"></div>
                <div class="studio-subheading step2-heading" style="margin-top:16px;">STEP 2: CUSTOMIZE EVERYTHING</div>
                <div id="visualEditorMount"></div>
              </div>
            </div>

            <!-- Live Real-Time Interactive Phone Preview Pane -->
            <div class="studio-preview-pane" id="studioPreviewPane">
              <div class="preview-device-header">
                <button class="btn-preview-back-mobile" id="btnMobileBackToEditor">
                  ✏️ Back to Edit
                </button>
                <span class="preview-url-bar" id="previewUrlBar">https://celebration.live/s/your-gift</span>
                <button class="btn-preview-share-mobile" id="btnMobilePreviewShare">
                  🚀 Share Link
                </button>
              </div>
              <div class="preview-frame-container" id="previewContainer"></div>
            </div>
          </div>

          <!-- Floating Bottom Dock on Mobile -->
          <div class="studio-mobile-bottom-bar" id="studioMobileBottomBar">
            <button class="btn-dock-item btn-dock-save" id="btnDockSaveDefault">
              <span class="dock-btn-icon">💾</span>
              <span class="dock-btn-label">Save Website</span>
            </button>
            <button class="btn-dock-item btn-dock-preview" id="btnDockPreviewToggle">
              <span class="dock-btn-icon">👁️</span>
              <span class="dock-btn-label">Live Preview</span>
            </button>
            <button class="btn-dock-item btn-dock-primary" id="btnDockPublish">
              <span class="dock-btn-icon">🚀</span>
              <span class="dock-btn-label">Share Link</span>
            </button>
          </div>
        </div>
      </section>

      <!-- 7. "How It Works" 3 Simple Steps -->
      <section class="two-luv-how-it-works" id="secHowItWorks">
        <div class="two-luv-section-header">
          <span class="two-luv-section-tag">EASY 3 STEPS</span>
          <h2 class="two-luv-section-title">A celebration link that opens<br />on any phone instantly.</h2>
          <p class="two-luv-section-sub">No downloads, no logins, no paywalls. Created in minutes.</p>
        </div>

        <div class="two-luv-steps-grid">
          <div class="two-luv-step-card">
            <div class="two-luv-step-badge">1</div>
            <h3 class="two-luv-step-title">Make it personal</h3>
            <p class="two-luv-step-desc">Pick your occasion, type your heartfelt message, choose your favorite photos and set their favourite song.</p>
          </div>

          <div class="two-luv-step-card">
            <div class="two-luv-step-badge">2</div>
            <h3 class="two-luv-step-title">Preview live on phone</h3>
            <p class="two-luv-step-desc">Interact with the real live website in the studio simulator. Test the candles, page flips, and games before sharing.</p>
          </div>

          <div class="two-luv-step-card">
            <div class="two-luv-step-badge">3</div>
            <h3 class="two-luv-step-title">Share free link or QR code</h3>
            <p class="two-luv-step-desc">Send the clean link on WhatsApp with 1 tap or print the custom QR code on a card. They open it immediately.</p>
          </div>
        </div>
      </section>

      <!-- 8. Frequently Asked Questions (2-Luv FAQ Section) -->
      <section class="two-luv-faq-wrap" id="secFaq">
        <div class="two-luv-section-header">
          <span class="two-luv-section-tag">FREQUENTLY ASKED QUESTIONS</span>
          <h2 class="two-luv-section-title">Before you light the candles.</h2>
        </div>

        <div class="two-luv-faq-item open">
          <div class="two-luv-faq-q">
            <span>What is the digital birthday celebration gift?</span>
            <span>▾</span>
          </div>
          <div class="two-luv-faq-a">
            A surprise link that opens an interactive party: 3D cake, blowable candles, page-by-page scrapbook, vintage spinning vinyl music player, and personal love letter. The recipient blows out candles right on their phone!
          </div>
        </div>

        <div class="two-luv-faq-item">
          <div class="two-luv-faq-q">
            <span>Is it completely free to create and share?</span>
            <span>▾</span>
          </div>
          <div class="two-luv-faq-a">
            Yes! 100% free with unlimited photo and music hosting. No credit cards, subscriptions, or hidden paywalls required.
          </div>
        </div>

        <div class="two-luv-faq-item">
          <div class="two-luv-faq-q">
            <span>Does the recipient need to download an app?</span>
            <span>▾</span>
          </div>
          <div class="two-luv-faq-a">
            No. The gift opens directly in the web browser of any iPhone, Android phone, tablet or computer with zero app downloads or accounts.
          </div>
        </div>

        <div class="two-luv-faq-item">
          <div class="two-luv-faq-q">
            <span>Can I lock it until their birthday?</span>
            <span>▾</span>
          </div>
          <div class="two-luv-faq-a">
            Yes! Enable the Countdown Lock in the editor, and the site will display a live countdown timer until midnight in their time zone, revealing the celebration with 3D velvet curtains.
          </div>
        </div>
      </section>

      <!-- 9. Minimalist Footer -->
      <footer class="two-luv-footer">
        <div style="font-family:'Playfair Display',serif; font-size:20px; font-weight:800; color:#1c1015; margin-bottom:8px;">
          2luv • Celebration Studio
        </div>
        <p style="margin:0 0 14px 0;">Made with love to celebrate the special people in your universe ✨</p>
        <div style="display:flex; justify-content:center; gap:16px; font-weight:700;">
          <a href="#secHero" style="color:#d4235c; text-decoration:none;">The Party</a>
          <a href="#secOccasions" style="color:#d4235c; text-decoration:none;">Occasions</a>
          <a href="#studioWorkspaceSection" style="color:#d4235c; text-decoration:none;">Studio</a>
          <a href="#secFaq" style="color:#d4235c; text-decoration:none;">FAQ</a>
        </div>
      </footer>

      <!-- Floating Saved Toast -->
      <div class="studio-floating-toast" id="studioFloatingToast">
        🎉 <strong>Website Saved!</strong><br />
        <span>Your custom celebration is ready to share.</span>
      </div>
    </div>
  `;

  // Core DOM Element Selectors
  const selectorMount = root.querySelector('#templateSelectorMount');
  const editorMount = root.querySelector('#visualEditorMount');
  const previewContainer = root.querySelector('#previewContainer');
  const occasionBannerMount = root.querySelector('#studioOccasionBanner');
  const studioWorkspace = root.querySelector('#studioWorkspace');
  const floatingToast = root.querySelector('#studioFloatingToast');

  const btnNavShare = root.querySelector('#btnNavShare');
  const btnStudioSave = root.querySelector('#btnStudioSave');
  const btnStudioShare = root.querySelector('#btnStudioShare');
  const btnDockPublish = root.querySelector('#btnDockPublish');
  const btnDockSaveDefault = root.querySelector('#btnDockSaveDefault');
  const btnMobileBackToEditor = root.querySelector('#btnMobileBackToEditor');
  const btnMobilePreviewShare = root.querySelector('#btnMobilePreviewShare');
  const btnDockPreviewToggle = root.querySelector('#btnDockPreviewToggle');
  const btnHeroJumpPreview = root.querySelector('#btnHeroJumpPreview');

  // Interactive Candle Blow Simulator Logic
  const flames = root.querySelectorAll('.two-luv-candle-flame');
  const smoke = root.querySelector('#demoSmokeWisp');
  const btnHoldBlow = root.querySelector('#btnHoldToBlow');
  const btnLightAgain = root.querySelector('#btnLightAgain');
  const candleHint = root.querySelector('#demoCandleHint');

  let blowTimer = null;
  let candlesBlown = false;

  function extinguishCandles() {
    if (candlesBlown) return;
    candlesBlown = true;
    flames.forEach(f => f.classList.add('extinguished'));
    smoke?.classList.add('visible');
    btnHoldBlow.style.display = 'none';
    btnLightAgain.style.display = 'inline-block';
    candleHint.innerHTML = "✨ <strong>Happy Birthday!</strong> Your wish has been sent into the stars! 🥳🎉";
    candleHint.style.color = "#d4235c";

    confetti({
      particleCount: 80,
      spread: 75,
      origin: { y: 0.4 },
      colors: ['#d4235c', '#fbbf24', '#ff4d6d', '#ffffff']
    });

    if (navigator.vibrate) navigator.vibrate([30, 60, 90]);
  }

  function reigniteCandles() {
    candlesBlown = false;
    flames.forEach(f => f.classList.remove('extinguished'));
    smoke?.classList.remove('visible');
    btnHoldBlow.style.display = 'inline-block';
    btnLightAgain.style.display = 'none';
    candleHint.innerHTML = "In the gift, the birthday person blows into their phone's microphone. Here, just hold the button.";
    candleHint.style.color = "#7a5868";
  }

  btnHoldBlow?.addEventListener('pointerdown', () => {
    btnHoldBlow.textContent = "💨 Blowing out candles...";
    blowTimer = setTimeout(extinguishCandles, 650);
  });

  btnHoldBlow?.addEventListener('pointerup', () => {
    if (!candlesBlown) {
      clearTimeout(blowTimer);
      btnHoldBlow.textContent = "💨 Hold to Blow Candles";
    }
  });

  btnHoldBlow?.addEventListener('click', extinguishCandles);
  btnLightAgain?.addEventListener('click', reigniteCandles);

  // Age Stepper Buttons
  const ageVal = root.querySelector('#demoAgeVal');
  root.querySelector('#btnAgeMinus')?.addEventListener('click', () => {
    if (demoAge > 1) {
      demoAge--;
      ageVal.textContent = demoAge;
      activeData.age = demoAge.toString();
      saveActiveCelebration(activeTemplateId, activeData);
      updateLivePreview();
    }
  });

  root.querySelector('#btnAgePlus')?.addEventListener('click', () => {
    demoAge++;
    ageVal.textContent = demoAge;
    activeData.age = demoAge.toString();
    saveActiveCelebration(activeTemplateId, activeData);
    updateLivePreview();
  });

  // Jump to Preview button
  btnHeroJumpPreview?.addEventListener('click', () => {
    const sec = root.querySelector('#studioWorkspaceSection');
    sec?.scrollIntoView({ behavior: 'smooth' });
    switchMobileTab('preview');
  });

  // Occasion Pills Click Listeners (Who It's For section)
  root.querySelectorAll('.btn-two-luv-occ-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const tid = btn.getAttribute('data-tid');
      if (tid && TEMPLATES[tid]) {
        root.querySelectorAll('.btn-two-luv-occ-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeTemplateId = tid;
        activeData = getActiveCelebrationData(activeTemplateId);

        // Update demo card heading
        const demoHeading = root.querySelector('#demoCardHeading');
        if (demoHeading) {
          demoHeading.textContent = `Happy celebration, ${activeData.recipientName || 'Bia'}!`;
        }

        mountTemplateSelector();
        mountEditor();
        updateLivePreview();

        const studioSec = root.querySelector('#studioWorkspaceSection');
        studioSec?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // FAQ Accordion Toggle Listeners
  root.querySelectorAll('.two-luv-faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      parent.classList.toggle('open');
    });
  });

  // Toast Helper
  function showToast(title = "🎉 Website Saved!", subtitle = "Your custom celebration is saved.") {
    floatingToast.innerHTML = `<strong>${title}</strong><br /><span>${subtitle}</span>`;
    floatingToast.classList.add('visible');
    if (navigator.vibrate) navigator.vibrate([20, 30]);
    setTimeout(() => {
      floatingToast.classList.remove('visible');
    }, 2800);
  }

  // Occasion Switcher Banner
  function renderOccasionBanner() {
    const tmpl = TEMPLATES[activeTemplateId] || TEMPLATES.blossom;
    occasionBannerMount.innerHTML = `
      <div class="occ-banner-card">
        <div class="occ-banner-left">
          <div class="occ-banner-icon-wrap">
            <span class="occ-banner-icon">${tmpl.icon}</span>
          </div>
          <div class="occ-banner-info">
            <span class="occ-banner-badge">${tmpl.badge}</span>
            <span class="occ-banner-name">${tmpl.name}</span>
          </div>
        </div>
        <button type="button" class="btn-switch-occasion" id="btnBannerSwitchOccasion">
          Change Occasion ▾
        </button>
      </div>
    `;

    occasionBannerMount.querySelector('#btnBannerSwitchOccasion')?.addEventListener('click', () => {
      switchMobileTab('templates');
      const studioSec = root.querySelector('#studioWorkspaceSection');
      studioSec?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Mobile Tab Switcher
  function switchMobileTab(tab) {
    currentMobileTab = tab;

    if (tab === 'templates') guideController?.setStep(1);
    else if (tab === 'editor') guideController?.setStep(2);
    else if (tab === 'preview') guideController?.setStep(3);

    root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });

    studioWorkspace.classList.remove('mobile-view-editor', 'mobile-view-templates', 'mobile-view-preview');
    studioWorkspace.classList.add(`mobile-view-${tab}`);

    const secTemplates = root.querySelector('#tabTemplatesSection');
    const secEditor = root.querySelector('#tabEditorSection');

    if (secTemplates) secTemplates.classList.toggle('active', tab === 'templates');
    if (secEditor) secEditor.classList.toggle('active', tab === 'editor');

    if (tab === 'preview') {
      updateLivePreview();
      if (btnDockPreviewToggle) {
        btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon">✏️</span><span class="dock-btn-label">Back to Edit</span>`;
        btnDockPreviewToggle.classList.add('dock-active-preview');
      }
    } else {
      if (btnDockPreviewToggle) {
        btnDockPreviewToggle.innerHTML = `<span class="dock-btn-icon">👁️</span><span class="dock-btn-label">Live Preview</span>`;
        btnDockPreviewToggle.classList.remove('dock-active-preview');
      }
    }
  }

  // Update Live Simulator Preview
  function updateLivePreview() {
    if (previewContainer) {
      previewContainer.querySelectorAll('audio').forEach(a => {
        try { a.pause(); a.currentTime = 0; } catch {}
      });
    }
    renderViewerApp(previewContainer, activeTemplateId, activeData);
  }

  // Mount Visual Editor Form
  function mountEditor() {
    renderOccasionBanner();
    renderVisualEditor(editorMount, activeTemplateId, activeData, (updatedData) => {
      activeData = updatedData;
      saveActiveCelebration(activeTemplateId, activeData);
      updateLivePreview();
    });
  }

  // Mount Template Selector
  function mountTemplateSelector() {
    renderTemplateSelector(selectorMount, activeTemplateId, (newTid) => {
      activeTemplateId = newTid;
      activeData = getActiveCelebrationData(activeTemplateId);

      // Sync active state on occasion pills
      root.querySelectorAll('.btn-two-luv-occ-pill').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-tid') === activeTemplateId);
      });

      mountTemplateSelector();
      mountEditor();
      updateLivePreview();
      switchMobileTab('editor');
    });
  }

  // Initial mounts
  mountTemplateSelector();
  mountEditor();
  updateLivePreview();
  renderOccasionBanner();

  // Creator Guide
  const guideMount = root.querySelector('#creatorGuideMount');
  const guideController = renderCreatorGuide(guideMount, {
    onSwitchTab: (tab) => switchMobileTab(tab),
    onOpenShare: () => triggerShare(),
    onFocusEditor: () => {
      const firstInput = root.querySelector('#tabEditorSection input[type="text"], #tabEditorSection textarea');
      if (firstInput) {
        firstInput.focus();
        firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Mobile tab click listeners
  root.querySelectorAll('.mobile-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (navigator.vibrate) navigator.vibrate(15);
      const tab = btn.getAttribute('data-tab');
      switchMobileTab(tab);
    });
  });

  // Dock preview toggle listener
  btnDockPreviewToggle?.addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(15);
    if (currentMobileTab === 'preview') {
      switchMobileTab('editor');
    } else {
      switchMobileTab('preview');
    }
  });

  btnMobileBackToEditor?.addEventListener('click', () => {
    switchMobileTab('editor');
  });

  // Save Website handler
  function handleSaveWebsite() {
    saveActiveCelebration(activeTemplateId, activeData);
    showToast("🎉 Website Saved!", "All custom photos, music & messages are saved.");
  }

  btnStudioSave?.addEventListener('click', handleSaveWebsite);
  btnDockSaveDefault?.addEventListener('click', handleSaveWebsite);

  // Share/Deploy triggers (100% Free, NO payment)
  function triggerShare() {
    saveActiveCelebration(activeTemplateId, activeData);
    guideController?.setStep(4);
    openShareModal(activeTemplateId, activeData);
  }

  btnNavShare?.addEventListener('click', triggerShare);
  btnStudioShare?.addEventListener('click', triggerShare);
  btnDockPublish?.addEventListener('click', triggerShare);
  btnMobilePreviewShare?.addEventListener('click', triggerShare);
}
