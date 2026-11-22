// src/studio/templateSelector.js - Ultra-Aesthetic Occasion Gallery with Category Filters

import { TEMPLATES } from '../models/templateRegistry.js';
import { renderStudioIcons } from './icons.js';

export function renderTemplateSelector(container, activeTemplateId, onSelectTemplate) {
  let activeFilter = 'all';

  const categories = [
    { id: 'all', icon: 'sparkles', label: `All (${Object.keys(TEMPLATES).length})` },
    { id: 'romance', icon: 'heart', label: 'Romance' },
    { id: 'birthday', icon: 'calendar', label: 'Birthday' },
    { id: 'family', icon: 'shield-check', label: 'Family' },
    { id: 'friends', icon: 'sparkle', label: 'Friends' }
  ];

  function getTemplateCategory(tid) {
    if (['long_romance', 'tree', 'blossom', 'valentine', 'anniversary', 'sorry'].includes(tid)) return 'romance';
    if (['birthday'].includes(tid)) return 'birthday';
    if (['mother', 'father', 'sister', 'brother'].includes(tid)) return 'family';
    if (['friendship', 'bestie_girl', 'bestie_boy'].includes(tid)) return 'friends';
    return 'all';
  }

  function render() {
    const list = Object.values(TEMPLATES).filter(t => {
      if (activeFilter === 'all') return true;
      return getTemplateCategory(t.id) === activeFilter;
    });

    container.innerHTML = `
      <div class="template-selector-wrap">
        <div class="template-selector-header">
          <div class="studio-subheading">
            <i data-lucide="palette"></i>
            <span>STEP 1: CHOOSE OCCASION</span>
          </div>
          <div class="template-selector-subhint">Tap any occasion below to customize its special story, live physics & animations:</div>
        </div>

        <!-- Filter Chips -->
        <div class="template-filter-chips" id="tmplFilterChips">
          ${categories.map(c => `
            <button type="button" class="tmpl-filter-chip ${c.id === activeFilter ? 'active' : ''}" data-cat="${c.id}">
              <i data-lucide="${c.icon}"></i>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>

        <div class="template-cards-grid">
          ${list.map(tmpl => {
            const isSel = tmpl.id === activeTemplateId;
            return `
              <div class="template-card ${isSel ? 'selected' : ''}" data-tid="${tmpl.id}">
                <div class="tmpl-card-top">
                  <span class="tmpl-badge">${tmpl.badge}</span>
                  ${isSel ? '<span class="tmpl-check-pill"><i data-lucide="check-circle-2"></i> Active</span>' : ''}
                </div>
                <div class="tmpl-card-body">
                  <div class="tmpl-icon-box">
                    <span class="tmpl-icon">${tmpl.icon}</span>
                  </div>
                  <div class="tmpl-info">
                    <h3 class="tmpl-name">${tmpl.name}</h3>
                    <p class="tmpl-desc">${tmpl.description}</p>
                    <div class="tmpl-card-footer">
                      <span class="tmpl-stat-pill">✨ 60FPS Physics</span>
                      <span class="tmpl-stat-pill">🎵 Music</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    renderStudioIcons(container);

    // Bind category filter clicks
    container.querySelectorAll('.tmpl-filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(12);
        activeFilter = btn.getAttribute('data-cat');
        render();
      });
    });

    // Bind card selection clicks
    container.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        if (navigator.vibrate) navigator.vibrate(20);
        const tid = card.getAttribute('data-tid');
        onSelectTemplate(tid);
      });
    });
  }

  render();
}
