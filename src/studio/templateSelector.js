// src/studio/templateSelector.js - Template Selection Gallery

import { TEMPLATES } from '../models/templateRegistry.js';

export function renderTemplateSelector(container, activeTemplateId, onSelectTemplate) {
  container.innerHTML = `
    <div class="template-selector-wrap">
      <div class="template-selector-header">
        <div class="studio-subheading">STEP 1: SELECT OCCASION (${Object.keys(TEMPLATES).length} AVAILABLE)</div>
        <div class="template-selector-subhint">Tap any occasion below to customize its special story & animations:</div>
      </div>
      <div class="template-cards-grid">
        ${Object.values(TEMPLATES).map(tmpl => {
          const isSel = tmpl.id === activeTemplateId;
          return `
          <div class="template-card ${isSel ? 'selected' : ''}" data-tid="${tmpl.id}">
            <div class="tmpl-card-top">
              <span class="tmpl-badge">${tmpl.badge}</span>
              ${isSel ? '<span class="tmpl-check-pill">✓ Selected</span>' : ''}
            </div>
            <div class="tmpl-card-body">
              <div class="tmpl-icon">${tmpl.icon}</div>
              <div class="tmpl-info">
                <h3 class="tmpl-name">${tmpl.name}</h3>
                <p class="tmpl-desc">${tmpl.description}</p>
              </div>
            </div>
          </div>
        `;
        }).join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      const tid = card.getAttribute('data-tid');
      onSelectTemplate(tid);
    });
  });
}
