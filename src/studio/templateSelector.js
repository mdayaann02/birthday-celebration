// src/studio/templateSelector.js - Ultra-Aesthetic Occasion Bento Gallery with Instant Actions

import { TEMPLATES } from '../models/templateRegistry.js';
import { renderStudioIcons } from './icons.js';

export function renderTemplateSelector(container, activeTemplateId, onSelectTemplate, initialCategory = 'all') {
  let activeFilter = initialCategory;

  const categories = [
    { id: 'all', icon: 'sparkles', label: `All (${Object.keys(TEMPLATES).length})` },
    { id: 'wedding', icon: 'gem', label: 'Wedding 💍' },
    { id: 'museum', icon: 'landmark', label: '3D Museum' },
    { id: 'romance', icon: 'heart', label: 'Romance' },
    { id: 'birthday', icon: 'calendar', label: 'Birthday' },
    { id: 'sorry', icon: 'heart-crack', label: 'Apology' }
  ];

  function getTemplateCategory(tid) {
    if (['wedding_invite', 'wedding', 'shubh_weds'].includes(tid)) return 'wedding';
    if (['our_museum'].includes(tid)) return 'museum';
    if (['long_romance', 'tree', 'blossom', 'bloom_reveal', 'kitten_wish', 'ever_tide'].includes(tid)) return 'romance';
    if (['birthday', 'birthday_paigaam', 'paigaam'].includes(tid)) return 'birthday';
    if (['sorry'].includes(tid)) return 'sorry';
    return 'all';
  }

  function render() {
    const uniqueTemplates = Array.from(new Map(Object.values(TEMPLATES).map(t => [t.id, t])).values());
    const list = uniqueTemplates.filter(t => {
      if (activeFilter === 'all') return true;
      return getTemplateCategory(t.id) === activeFilter;
    });

    container.innerHTML = `
      <div class="template-selector-wrap" id="templatesSelectorWrap">
        <!-- Filter Chips Strip -->
        <div class="template-filter-chips" id="tmplFilterChips" role="tablist" aria-label="Filter occasions">
          ${categories.map(c => `
            <button type="button" role="tab" aria-selected="${c.id === activeFilter}" class="tmpl-filter-chip ${c.id === activeFilter ? 'active' : ''}" data-cat="${c.id}">
              <i data-lucide="${c.icon}"></i>
              <span>${c.label}</span>
            </button>
          `).join('')}
        </div>

        <!-- Responsive Bento Grid -->
        <div class="template-cards-bento-grid">
          ${list.map(tmpl => {
            const isSel = tmpl.id === activeTemplateId;
            return `
              <div class="template-bento-card ${isSel ? 'selected' : ''}" data-tid="${tmpl.id}">
                <div class="tmpl-card-header">
                  <span class="tmpl-badge">${tmpl.badge}</span>
                  ${isSel ? '<span class="tmpl-active-badge"><i data-lucide="check-circle-2"></i> Selected</span>' : ''}
                </div>

                <div class="tmpl-card-main">
                  <div class="tmpl-icon-gem">
                    <span class="tmpl-icon">${tmpl.icon}</span>
                  </div>
                  <div class="tmpl-card-text">
                    <h4 class="tmpl-title">${tmpl.name}</h4>
                    <p class="tmpl-description">${tmpl.description}</p>
                  </div>
                </div>

                <div class="tmpl-card-meta">
                  <span class="tmpl-meta-tag"><i data-lucide="sparkles" style="width:11px; height:11px;"></i> 60FPS Physics</span>
                  <span class="tmpl-meta-tag"><i data-lucide="music" style="width:11px; height:11px;"></i> Audio Soundtrack</span>
                </div>

                <div class="tmpl-card-actions">
                  <button type="button" class="btn-card-action btn-card-customize ${isSel ? 'active' : ''}" data-action="customize" data-tid="${tmpl.id}" aria-label="Customize ${tmpl.name}">
                    <i data-lucide="${isSel ? 'check' : 'wand-2'}"></i>
                    <span>${isSel ? 'Editing Now' : 'Customize Wish'}</span>
                  </button>
                  <button type="button" class="btn-card-action btn-card-preview" data-action="preview" data-tid="${tmpl.id}" title="Preview in device viewport" aria-label="Preview ${tmpl.name}">
                    <i data-lucide="eye"></i>
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
    container.querySelectorAll('.btn-card-customize').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (navigator.vibrate) navigator.vibrate(18);
        const tid = btn.getAttribute('data-tid');
        onSelectTemplate(tid, 'customize');
      });
    });

    container.querySelectorAll('.btn-card-preview').forEach(btn => {
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
