// src/studio/templateSelector.js - Template Selection Gallery

import { TEMPLATES } from '../models/templateRegistry.js';

export function renderTemplateSelector(container, activeTemplateId, onSelectTemplate) {
  container.innerHTML = `
    <div class="template-selector-wrap">
      <div class="studio-subheading">STEP 1: SELECT OCCASION TEMPLATE</div>
      <div class="template-cards-grid">
        ${Object.values(TEMPLATES).map(tmpl => `
          <div class="template-card ${tmpl.id === activeTemplateId ? 'selected' : ''}" data-tid="${tmpl.id}">
            <div class="tmpl-badge">${tmpl.badge}</div>
            <div class="tmpl-icon">${tmpl.icon}</div>
            <h3 class="tmpl-name">${tmpl.name}</h3>
            <p class="tmpl-desc">${tmpl.description}</p>
          </div>
        `).join('')}
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
