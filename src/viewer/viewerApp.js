// src/viewer/viewerApp.js - Recipient Experience Orchestrator (100% Clean Viewer)

import { checkCountdownLock, renderCountdownGate } from './countdownGate.js';
import { initInteractiveSparkles } from './sparkleEffect.js';
import { renderTreeTemplate } from './templates/treeTemplate.js';
import { renderBlossomTemplate } from './templates/blossomTemplate.js';
import { renderBirthdayTemplate } from './templates/birthdayTemplate.js';
import { renderAnniversaryTemplate } from './templates/anniversaryTemplate.js';
import { renderSorryTemplate } from './templates/sorryTemplate.js';
import { renderValentineTemplate } from './templates/valentineTemplate.js';
import { renderFriendshipTemplate } from './templates/friendshipTemplate.js';
import { renderMotherTemplate } from './templates/motherTemplate.js';
import { renderFatherTemplate } from './templates/fatherTemplate.js';
import { renderSisterTemplate } from './templates/sisterTemplate.js';
import { renderBrotherTemplate } from './templates/brotherTemplate.js';

export function renderViewerApp(container, templateId, data, isMakerReviewParam = false) {
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
    case 'tree':
      renderTreeTemplate(root, data, isMakerReview);
      break;
    case 'blossom':
      renderBlossomTemplate(root, data, isMakerReview);
      break;
    case 'anniversary':
      renderAnniversaryTemplate(root, data);
      break;
    case 'sorry':
      renderSorryTemplate(root, data);
      break;
    case 'valentine':
      renderValentineTemplate(root, data);
      break;
    case 'friendship':
      renderFriendshipTemplate(root, data);
      break;
    case 'mother':
      renderMotherTemplate(root, data);
      break;
    case 'father':
      renderFatherTemplate(root, data);
      break;
    case 'sister':
      renderSisterTemplate(root, data);
      break;
    case 'brother':
      renderBrotherTemplate(root, data);
      break;
    case 'birthday':
    default:
      renderBirthdayTemplate(root, data);
      break;
  }
}
