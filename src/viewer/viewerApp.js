// src/viewer/viewerApp.js - Recipient Experience Orchestrator (100% Clean Viewer)

import { checkCountdownLock, renderCountdownGate } from './countdownGate.js';
import { initInteractiveSparkles } from './sparkleEffect.js';
import { initCardTilt } from './cardTilt.js';
import { initSwipeNavigation } from './swipeNavigation.js';
import { initDoubleTapHearts } from './doubleTapHearts.js';
import { initPlayfulDock } from './playfulDock.js';

import { renderTreeTemplate } from './templates/treeTemplate.js';
import { renderBlossomTemplate } from './templates/blossomTemplate.js';
import { renderBloomRevealTemplate } from './templates/bloomRevealTemplate.js';
import { renderBirthdayTemplate } from './templates/birthdayTemplate.js';
import { renderSorryTemplate } from './templates/sorryTemplate.js';
import { renderMuseumTemplate } from './templates/museumTemplate.js';
import { renderPaigaamTemplate } from './templates/paigaamTemplate.js';

export function renderViewerApp(container, templateId, data, isMakerReviewParam = false) {
  if (data?.primaryColor) {
    container.style.setProperty('--primary', data.primaryColor);
    container.style.setProperty('--primary-light', data.primaryColor + 'aa');
  }
  initInteractiveSparkles();
  const lockStatus = checkCountdownLock(data);
  const isMakerReview = isMakerReviewParam || lockStatus.isMakerReview || false;

  if (lockStatus.isLocked && !isMakerReview) {
    // Show countdown lock gate
    renderCountdownGate(container, data, (unlockedReview) => {
      renderUnlockedWebsite(container, templateId, data, unlockedReview);
    });
  } else {
    // Render full site directly
    renderUnlockedWebsite(container, templateId, data, isMakerReview);
  }
}

function renderUnlockedWebsite(container, templateId, data, isMakerReview) {
  if (templateId === 'birthday_paigaam' || templateId === 'paigaam') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100vh;"></div>';
    const root = container.querySelector('#templateRoot');
    renderPaigaamTemplate(root, data, isMakerReview);
    return;
  }

  if (templateId === 'bloom_reveal') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100vh;"></div>';
    const root = container.querySelector('#templateRoot');
    renderBloomRevealTemplate(root, data, isMakerReview);
    return;
  }

  if (templateId === 'our_museum') {
    if (container._museumCleanup) {
      try { container._museumCleanup(); } catch (e) {}
    }
    container.innerHTML = `
      ${isMakerReview ? `
        <div class="maker-review-banner" id="makerReviewBanner" style="position:fixed; top:0; left:0; width:100%; z-index:999999;">
          <div class="maker-banner-content">
            <span>👁️ <strong>Creator Preview Active:</strong> You are viewing the 3D Museum.</span>
            <a href="?edit=true" class="btn-banner-edit">✏️ Studio Editor</a>
          </div>
        </div>
      ` : ''}
      <div id="templateRoot" style="width:100%; height:100vh; overflow:hidden;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    renderMuseumTemplate(root, data, isMakerReview);
    return;
  }

  if (templateId === 'sorry') {
    container.innerHTML = `
      ${isMakerReview ? `
        <div class="maker-review-banner" id="makerReviewBanner">
          <div class="maker-banner-content">
            <span>👁️ <strong>Creator Preview Active:</strong> You are viewing the unlocked website.</span>
            <a href="?edit=true" class="btn-banner-edit">✏️ Studio Editor</a>
          </div>
        </div>
      ` : ''}
      <div id="templateRoot" style="width:100%; min-height:100vh;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    renderSorryTemplate(root, data, isMakerReview);
    return;
  }

  container.innerHTML = `
    ${isMakerReview ? `
      <div class="maker-review-banner" id="makerReviewBanner">
        <div class="maker-banner-content">
          <span>👁️ <strong>Creator Preview Active:</strong> You are viewing the unlocked website.</span>
          <a href="?edit=true" class="btn-banner-edit">✏️ Studio Editor</a>
        </div>
      </div>
    ` : ''}
    <div id="templateRoot"></div>
  `;

  const root = container.querySelector('#templateRoot');

  switch (templateId) {
    case 'long_romance':
    case 'blossom':
      renderBlossomTemplate(root, data, isMakerReview);
      break;
    case 'tree':
      renderTreeTemplate(root, data, isMakerReview);
      break;
    case 'sorry':
      renderSorryTemplate(root, data);
      break;
    case 'birthday':
    default:
      renderBirthdayTemplate(root, data);
      break;
  }

  // Initialize Playful Micro-Interactions & Tactile Suite across all templates
  try {
    initPlayfulDock(container, data);
    initCardTilt(root);
    initSwipeNavigation(root);
    initDoubleTapHearts(root);
  } catch (err) {
    console.error('Playful suite initialization error:', err);
  }
}
