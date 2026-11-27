// src/viewer/viewerApp.js - Recipient Experience Orchestrator (100% Clean Viewer)

import { checkCountdownLock, renderCountdownGate } from './countdownGate.js';
import { initInteractiveSparkles } from './sparkleEffect.js';
import { initCardTilt } from './cardTilt.js';
import { initSwipeNavigation } from './swipeNavigation.js';
import { initDoubleTapHearts } from './doubleTapHearts.js';
import { initPlayfulDock } from './playfulDock.js';

import { renderTreeTemplate } from './templates/treeTemplate.js';
import { renderBlossomTemplate } from './templates/blossomTemplate.js';
import { renderBlossomReelTemplate } from './templates/blossomReelTemplate.js';
import { renderBloomRevealTemplate } from './templates/bloomRevealTemplate.js';
import { renderBirthdayTemplate } from './templates/birthdayTemplate.js';
import { renderSorryTemplate } from './templates/sorryTemplate.js';
import { renderMuseumTemplate } from './templates/museumTemplate.js';
import { renderPaigaamTemplate } from './templates/paigaamTemplate.js';
import { renderWeddingTemplate } from './templates/weddingTemplate.js';
import { renderKittenWishTemplate } from './templates/kittenWishTemplate.js';
import { renderEverTideTemplate } from './templates/everTideTemplate.js';
import { renderKintsugiApologyTemplate } from './templates/kintsugiApologyTemplate.js';

function cleanupContainer(container) {
  if (!container) return;
  if (container._cleanup) {
    try { container._cleanup(); } catch (e) {}
    container._cleanup = null;
  }
  if (container._museumCleanup) {
    try { container._museumCleanup(); } catch (e) {}
    container._museumCleanup = null;
  }
  const existingDock = document.getElementById('playfulReactionDock');
  if (existingDock) existingDock.remove();
}

export function renderViewerApp(container, templateId, data, isMakerReviewParam = false) {
  if (data?.primaryColor) {
    container.style.setProperty('--primary', data.primaryColor);
    container.style.setProperty('--primary-light', data.primaryColor + 'aa');
  }
  initInteractiveSparkles();
  const lockStatus = checkCountdownLock(data);
  const isMakerReview = isMakerReviewParam || lockStatus.isMakerReview || false;

  // Persistent floating "Back to Editor" pill when opened as standalone Recipient View from studio
  const isStandaloneViewer = typeof window !== 'undefined' && !window.isCelebrationEditorMode && !container.closest('.studio-preview-pane') && !container.closest('#landingPreviewMount');
  const existingBackPill = document.getElementById('floatingBackToEditorPill');
  if (existingBackPill) existingBackPill.remove();
  if (isStandaloneViewer && isMakerReview) {
    const backPill = document.createElement('a');
    backPill.id = 'floatingBackToEditorPill';
    backPill.href = `/?template=${encodeURIComponent(templateId)}&edit=true`;
    backPill.className = 'floating-creator-back-pill';
    backPill.innerHTML = '<span>← Back to Editor</span>';
    document.body.appendChild(backPill);
  }

  if (lockStatus.isLocked && !isMakerReview) {
    // Show countdown lock gate
    cleanupContainer(container);
    renderCountdownGate(container, data, (unlockedReview) => {
      renderUnlockedWebsite(container, templateId, data, unlockedReview);
    });
  } else {
    // Render full site directly
    renderUnlockedWebsite(container, templateId, data, isMakerReview);
  }
}

function renderUnlockedWebsite(container, templateId, data, isMakerReview) {
  cleanupContainer(container);

  const editHref = `/?template=${encodeURIComponent(templateId)}&edit=true`;
  const renderReviewBanner = (label = 'You are viewing the unlocked website.') => isMakerReview ? `
    <div class="maker-review-banner" id="makerReviewBanner">
      <div class="maker-banner-content">
        <span>👁️ <strong>Creator Preview Active:</strong> ${label}</span>
        <a href="${editHref}" class="btn-banner-edit">✏️ Studio Editor</a>
      </div>
    </div>
  ` : '';

  if (templateId === 'ever_tide') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; height:100vh; overflow:hidden;"></div>';
    const root = container.querySelector('#templateRoot');
    renderEverTideTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'kitten_wish' || templateId === 'kitten_sorry') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100dvh;"></div>';
    const root = container.querySelector('#templateRoot');
    const payload = templateId === 'kitten_sorry' ? { ...data, mode: 'sorry', templateId: 'kitten_sorry' } : data;
    renderKittenWishTemplate(root, payload, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'wedding_invite' || templateId === 'wedding' || templateId === 'shubh_weds') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100vh;"></div>';
    const root = container.querySelector('#templateRoot');
    renderWeddingTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'birthday_paigaam' || templateId === 'paigaam') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100vh;"></div>';
    const root = container.querySelector('#templateRoot');
    renderPaigaamTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'bloom_reveal') {
    container.innerHTML = '<div id="templateRoot" style="width:100%; min-height:100vh;"></div>';
    const root = container.querySelector('#templateRoot');
    const cleanup = renderBloomRevealTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (typeof cleanup === 'function') cleanup();
    };
    return;
  }

  if (templateId === 'our_museum') {
    container.innerHTML = `
      ${isMakerReview ? `
        <div class="maker-review-banner" id="makerReviewBanner" style="position:fixed; top:0; left:0; width:100%; z-index:999999;">
          <div class="maker-banner-content">
            <span>👁️ <strong>Creator Preview Active:</strong> You are viewing the 3D Museum.</span>
            <a href="${editHref}" class="btn-banner-edit">✏️ Studio Editor</a>
          </div>
        </div>
      ` : ''}
      <div id="templateRoot" style="width:100%; height:100vh; overflow:hidden;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    renderMuseumTemplate(root, data, isMakerReview);
    container._museumCleanup = () => {
      if (root && root._museumCleanup) root._museumCleanup();
    };
    return;
  }

  if (templateId === 'kintsugi_apology') {
    container.innerHTML = `
      ${renderReviewBanner()}
      <div id="templateRoot" style="width:100%; height:100dvh; overflow:hidden;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    renderKintsugiApologyTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'sorry') {
    container.innerHTML = `
      ${renderReviewBanner()}
      <div id="templateRoot" style="width:100%; min-height:100vh;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    renderSorryTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  if (templateId === 'birthday') {
    container.innerHTML = `
      ${renderReviewBanner()}
      <div id="templateRoot" style="width:100%; min-height:100dvh;"></div>
    `;
    const root = container.querySelector('#templateRoot');
    const cleanup = renderBirthdayTemplate(root, data, isMakerReview);
    container._cleanup = () => {
      if (typeof cleanup === 'function') cleanup();
      if (root && root._cleanup) root._cleanup();
    };
    return;
  }

  container.innerHTML = `
    ${renderReviewBanner()}
    <div id="templateRoot"></div>
  `;

  const root = container.querySelector('#templateRoot');
  let tmplCleanup = null;

  switch (templateId) {
    case 'long_romance':
      tmplCleanup = renderBlossomTemplate(root, data, isMakerReview);
      break;
    case 'blossom':
      tmplCleanup = renderBlossomReelTemplate(root, data, isMakerReview);
      break;
    case 'tree':
      tmplCleanup = renderTreeTemplate(root, data, isMakerReview);
      break;
    case 'birthday':
    default:
      tmplCleanup = renderBirthdayTemplate(root, data);
      break;
  }

  container._cleanup = () => {
    if (typeof tmplCleanup === 'function') tmplCleanup();
    if (root && root._cleanup) root._cleanup();
  };

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
