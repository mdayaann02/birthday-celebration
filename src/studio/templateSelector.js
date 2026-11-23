// src/studio/templateSelector.js - Clean Authentic Business Template Gallery

import { TEMPLATES } from '../models/templateRegistry.js';
import { renderStudioIcons } from './icons.js';

export function renderTemplateSelector(container, activeTemplateId, onSelectTemplate, initialCategory = 'all') {
  let activeFilter = initialCategory;

  const categories = [
    { id: 'all', label: `All (${Object.keys(TEMPLATES).length})` },
    { id: 'romance', label: 'Romance' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'family', label: 'Family' },
    { id: 'friends', label: 'Friends' }
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
      <div class="template-selector-wrap" id="templatesSelectorWrap">
        <!-- Filter Chips Strip (1 Consistent Button Style) -->
        <div class="template-filter-chips" id="tmplFilterChips" role="tablist" aria-label="Filter occasions">
          ${categories.map(c => `
            <button type="button" role="tab" aria-selected="${c.id === activeFilter}" class="btn-studio-secondary tmpl-filter-chip ${c.id === activeFilter ? 'active' : ''}" data-cat="${c.id}">
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Responsive Clean Grid -->
        <div class="template-cards-bento-grid">
          ${list.map(tmpl => {
            const isSel = tmpl.id === activeTemplateId;
            return `
              <div class="template-bento-card ${isSel ? 'selected' : ''}" data-tid="${tmpl.id}">
                <div class="tmpl-card-header">
                  <span class="tmpl-badge">${tmpl.badge}</span>
                  ${isSel ? '<span class="tmpl-active-badge">Active</span>' : ''}
                </div>

                <div class="tmpl-card-main">
                  <div class="tmpl-card-text">
                    <h4 class="tmpl-title">${tmpl.name}</h4>
                    <p class="tmpl-description">${tmpl.description}</p>
                  </div>
                </div>

                <div class="tmpl-card-meta">
                  <span class="tmpl-meta-tag">60 FPS Canvas</span>
                  <span class="tmpl-meta-tag">Audio Soundtrack</span>
                  <span class="tmpl-meta-tag">Private Link</span>
                </div>

                <div class="tmpl-card-actions">
                  <button type="button" class="btn-studio-primary btn-card-action ${isSel ? 'active' : ''}" data-action="customize" data-tid="${tmpl.id}" aria-label="Select ${tmpl.name}">
                    <span>${isSel ? 'Active Template' : 'Select Template'}</span>
                  </button>
                  <button type="button" class="btn-studio-secondary btn-card-action" data-action="preview" data-tid="${tmpl.id}" title="Preview in device viewport" aria-label="Preview ${tmpl.name}">
                    <span>Preview</span>
                  </button>
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
        if (navigator.vibrate) navigator.vibrate(10);
        activeFilter = btn.getAttribute('data-cat');
        render();
      });
    });

    // Bind card actions
    container.querySelectorAll('[data-action="customize"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navigator.vibrate) navigator.vibrate(18);
        const tid = btn.getAttribute('data-tid');
        onSelectTemplate(tid, 'customize');
      });
    });

    container.querySelectorAll('[data-action="preview"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navigator.vibrate) navigator.vibrate(14);
        const tid = btn.getAttribute('data-tid');
        onSelectTemplate(tid, 'preview');
      });
    });

    // Whole card tap (defaults to customize)
    container.querySelectorAll('.template-bento-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        if (navigator.vibrate) navigator.vibrate(15);
        const tid = card.getAttribute('data-tid');
        onSelectTemplate(tid, 'customize');
      });
    });
  }

  render();

  return {
    setCategory: (cat) => {
      if (categories.some(c => c.id === cat)) {
        activeFilter = cat;
        render();
      }
    }
  };
}
