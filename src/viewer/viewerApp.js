// src/viewer/viewerApp.js - Recipient Experience Orchestrator

import { checkCountdownLock, renderCountdownGate } from './countdownGate.js';
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

export function renderViewerApp(container, templateId, data) {
  const lockStatus = checkCountdownLock(data);

  if (lockStatus.isLocked) {
    // Show countdown lock gate
    renderCountdownGate(container, data, (isMakerReview) => {
      renderUnlockedWebsite(container, templateId, data, isMakerReview);
    });
  } else {
    // Render full site directly
    renderUnlockedWebsite(container, templateId, data, lockStatus.isMakerReview);
  }
}

function renderUnlockedWebsite(container, templateId, data, isMakerReview) {
  container.innerHTML = `
    ${isMakerReview ? `
      <div class="maker-review-banner">
        <span>👁️ <strong>MAKER REVIEW MODE:</strong> You are previewing the unlocked website.</span>
        <button class="btn-banner-edit" id="btnBackToStudio">✏️ Edit in Studio</button>
      </div>
    ` : ''}
    <div id="templateRoot"></div>
  `;

  if (isMakerReview) {
    container.querySelector('#btnBackToStudio')?.addEventListener('click', () => {
      window.location.hash = "";
      window.location.reload();
    });
  }

  const root = container.querySelector('#templateRoot');

  switch (templateId) {
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
