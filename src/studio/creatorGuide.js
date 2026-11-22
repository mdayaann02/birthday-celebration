// src/studio/creatorGuide.js - Interactive Step-by-Step Creator Guide & Onboarding

export function renderCreatorGuide(container, { onSwitchTab, onOpenShare, onFocusEditor }) {
  if (!container) return;

  let currentStep = 1;
  let isCollapsed = false;

  const stepsData = [
    {
      num: 1,
      id: "occasion",
      tab: "templates",
      icon: "🎨",
      shortLabel: "1. Occasion",
      title: "Step 1: Choose Occasion & Template",
      desc: "Pick who this special celebration is for: Romantic Blossom Love, Birthday, Sorry / Apology, Anniversary, Valentine, or for Mother, Father, Brother, Sister & Friends.",
      actionLabel: "Choose Occasion 🎨",
      action: () => {
        if (onSwitchTab) onSwitchTab('templates');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      num: 2,
      id: "customize",
      tab: "editor",
      icon: "✏️",
      shortLabel: "2. Customize",
      title: "Step 2: Add Photos, Love Letters & Music",
      desc: "Personalize the recipient's name, upload memorable photos to the polaroid gallery, write heartfelt love notes, select romantic songs, and set a countdown lock with your secret passcode.",
      actionLabel: "Start Customizing ↓",
      action: () => {
        if (onSwitchTab) onSwitchTab('editor');
        if (onFocusEditor) onFocusEditor();
      }
    },
    {
      num: 3,
      id: "preview",
      tab: "preview",
      icon: "👁️",
      shortLabel: "3. Live Test",
      title: "Step 3: Test Live Website on Mobile",
      desc: "Experience your website interactively just like your recipient will — blow the cake candles, touch the blooming petals, flip the 3D memories album, and hear the music.",
      actionLabel: "Open Live Preview 👁️",
      action: () => {
        if (onSwitchTab) onSwitchTab('preview');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    {
      num: 4,
      id: "share",
      tab: "editor",
      icon: "🚀",
      shortLabel: "4. Share Link",
      title: "Step 4: Generate Clean Link & Share on WhatsApp",
      desc: "Click 'Get Share Link' to generate your permanent short URL (https://birthday-website-phi-one.vercel.app/s/...). Send it directly via WhatsApp with 1 tap — guaranteed blue clickable hyperlink!",
      actionLabel: "Get Share Link Now 🚀",
      action: () => {
        if (onOpenShare) onOpenShare();
      }
    }
  ];

  function render() {
    const cur = stepsData[currentStep - 1];

    if (isCollapsed) {
      container.innerHTML = `
        <div class="creator-guide-collapsed" id="btnExpandGuide">
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="guide-sparkle-dot"></span>
            <strong>🧭 Step ${cur.num} of 4:</strong>
            <span style="color:#cbd5e1;">${cur.shortLabel}</span>
          </div>
          <button type="button" class="btn-guide-toggle" aria-label="Expand Guide">
            Expand Guide ▾
          </button>
        </div>
      `;

      container.querySelector('#btnExpandGuide')?.addEventListener('click', () => {
        isCollapsed = false;
        render();
      });
      return;
    }

    container.innerHTML = `
      <div class="creator-guide-card">
        <!-- Header Stepper Progress -->
        <div class="guide-header">
          <div class="guide-title-row">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="guide-logo-icon">🧭</span>
              <h3 class="guide-main-heading">How to Create Your Website</h3>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="guide-step-counter">Step ${cur.num} of 4</span>
              <button type="button" class="btn-guide-minimize" id="btnCollapseGuide" title="Collapse guide">−</button>
            </div>
          </div>

          <!-- Step navigation chips -->
          <div class="guide-stepper-bar">
            ${stepsData.map(s => `
              <button type="button" class="guide-step-chip ${s.num === currentStep ? 'active' : ''} ${s.num < currentStep ? 'completed' : ''}" data-step="${s.num}">
                <span class="step-chip-num">${s.num < currentStep ? '✓' : s.num}</span>
                <span class="step-chip-text">${s.shortLabel}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Active Step Details Card -->
        <div class="guide-step-body">
          <div class="guide-step-icon-wrap">
            <span class="guide-big-icon">${cur.icon}</span>
          </div>
          <div class="guide-step-content">
            <h4 class="guide-step-title">${cur.title}</h4>
            <p class="guide-step-desc">${cur.desc}</p>

            <div class="guide-actions-row">
              <button type="button" class="btn-guide-action-primary" id="btnGuideStepAction">
                ${cur.actionLabel}
              </button>

              <div class="guide-nav-buttons">
                ${currentStep > 1 ? `
                  <button type="button" class="btn-guide-nav" id="btnGuidePrev">
                    ← Back
                  </button>
                ` : ''}
                ${currentStep < 4 ? `
                  <button type="button" class="btn-guide-nav next" id="btnGuideNext">
                    Next Step →
                  </button>
                ` : `
                  <button type="button" class="btn-guide-nav done" id="btnGuideDone">
                    Done ✓
                  </button>
                `}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Step chip click listeners
    container.querySelectorAll('.guide-step-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const targetStep = parseInt(chip.getAttribute('data-step'), 10);
        if (!isNaN(targetStep)) {
          currentStep = targetStep;
          render();
        }
      });
    });

    // Primary action button listener
    container.querySelector('#btnGuideStepAction')?.addEventListener('click', () => {
      cur.action();
    });

    // Navigation buttons
    container.querySelector('#btnGuidePrev')?.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        render();
      }
    });

    container.querySelector('#btnGuideNext')?.addEventListener('click', () => {
      if (currentStep < 4) {
        currentStep++;
        render();
      }
    });

    container.querySelector('#btnGuideDone')?.addEventListener('click', () => {
      isCollapsed = true;
      render();
    });

    container.querySelector('#btnCollapseGuide')?.addEventListener('click', () => {
      isCollapsed = true;
      render();
    });
  }

  render();

  return {
    setStep: (stepNum) => {
      if (stepNum >= 1 && stepNum <= 4) {
        currentStep = stepNum;
        render();
      }
    },
    expand: () => {
      isCollapsed = false;
      render();
    },
    collapse: () => {
      isCollapsed = true;
      render();
    }
  };
}
