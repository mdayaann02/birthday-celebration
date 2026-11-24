// src/studio/creatorGuide.js - Interactive Step-by-Step Creator Guide & Onboarding

import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { renderStudioIcons } from './icons.js';

export function startStudioTour({ onSwitchTab, onOpenShare, onFocusEditor } = {}) {
  try {
    const driverObj = driver({
      showProgress: true,
      animate: true,
      allowClose: true,
      overlayColor: 'rgba(15, 10, 25, 0.78)',
      nextBtnText: 'Next →',
      prevBtnText: '← Back',
      doneBtnText: 'Start Creating ✨',
      onHighlightStarted: (element, step, opts) => {
        if (opts.index === 0 && onSwitchTab) {
          onSwitchTab('templates');
        } else if (opts.index === 1 && onSwitchTab) {
          onSwitchTab('editor');
        } else if (opts.index === 2 && onSwitchTab) {
          onSwitchTab('preview');
        }
      },
      steps: [
        {
          element: '#occQuickStripWrap',
          popover: {
            title: '🎨 1. Choose Occasion & Template',
            description: 'Pick who this celebration is for: Long Romance Masterpiece, Cupid & Tree, Birthday, Anniversary, Sorry, and more.',
            side: 'bottom',
            align: 'start'
          }
        },
        {
          element: '#tabEditorSection',
          popover: {
            title: '✏️ 2. Customize & Drag-and-Drop',
            description: 'Upload real polaroid photos, reorder them by dragging, choose background songs, and write heartfelt love letters.',
            side: 'top',
            align: 'start'
          }
        },
        {
          element: '#tabBtnPreview',
          popover: {
            title: '👁️ 3. Test Live Physics & 3D Album',
            description: 'Switch to Live Preview anytime to test realistic 3D paper flipbook physics, touch blooming petals, and launch twilight sky lanterns.',
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#btnSharePublish',
          popover: {
            title: '🚀 4. One-Tap WhatsApp Share Link',
            description: 'When your site is ready, click Get Share Link to generate your permanent, clickable URL for WhatsApp!',
            side: 'bottom',
            align: 'end'
          }
        }
      ]
    });

    driverObj.drive();
  } catch (err) {
    console.warn('Driver.js tour error:', err);
  }
}

export function renderCreatorGuide(container, { onSwitchTab, onOpenShare, onFocusEditor }) {
  if (!container) return;

  let currentStep = 1;
  let isCollapsed = true;

  const stepsData = [
    {
      num: 1,
      id: "occasion",
      tab: "templates",
      icon: "palette",
      shortLabel: "1. Occasion",
      title: "Step 1: Choose Occasion & Template",
      desc: "Pick who this special celebration is for: Romantic Blossom Love, Birthday, Sorry / Apology, Anniversary, Valentine, or for Mother, Father, Brother, Sister & Friends.",
      actionLabel: "Choose Occasion 🎨",
      action: () => {
        if (onSwitchTab) onSwitchTab('templates');
      }
    },
    {
      num: 2,
      id: "customize",
      tab: "editor",
      icon: "wand-2",
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
      icon: "eye",
      shortLabel: "3. Live Test",
      title: "Step 3: Test Live Website on Mobile",
      desc: "Experience your website interactively just like your recipient will — blow the cake candles, touch the blooming petals, flip the 3D memories album, and hear the music.",
      actionLabel: "Open Live Preview 👁️",
      action: () => {
        if (onSwitchTab) onSwitchTab('preview');
      }
    },
    {
      num: 4,
      id: "share",
      tab: "editor",
      icon: "share-2",
      shortLabel: "4. Share Link",
      title: "Step 4: Generate Clean Link & Share on WhatsApp",
      desc: "Click 'Get Share Link' to generate your permanent short URL (https://celebration-studio-02.vercel.app/s/...). Send it directly via WhatsApp with 1 tap — guaranteed blue clickable hyperlink!",
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
            <strong><i data-lucide="compass"></i> Step ${cur.num} of 4:</strong>
            <span style="color:#cbd5e1;">${cur.shortLabel}</span>
          </div>
          <button type="button" class="btn-guide-toggle" aria-label="Expand Guide">
            <span>Expand Guide</span>
            <i data-lucide="chevron-down"></i>
          </button>
        </div>
      `;

      renderStudioIcons(container);

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
              <span class="guide-logo-icon"><i data-lucide="compass"></i></span>
              <h3 class="guide-main-heading">How to Create Your Website</h3>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <button type="button" class="btn-guide-tour-chip" id="btnGuideInteractiveTour" title="Start interactive 30s tour">
                <i data-lucide="sparkles"></i>
                <span>Guided Tour</span>
              </button>
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
            <span class="guide-big-icon"><i data-lucide="${cur.icon}"></i></span>
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

    renderStudioIcons(container);

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

    container.querySelector('#btnGuideInteractiveTour')?.addEventListener('click', () => {
      startStudioTour({ onSwitchTab, onOpenShare, onFocusEditor });
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
    },
    startTour: () => {
      startStudioTour({ onSwitchTab, onOpenShare, onFocusEditor });
    }
  };
}
