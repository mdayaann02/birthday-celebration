// src/studio/visualEditor.js - Comprehensive Customization Editor Form with File Uploads

import { uploadFile } from '../models/siteStorage.js';
import Sortable from 'sortablejs';
import { renderStudioIcons } from './icons.js';
import { RELATIONSHIP_CATEGORIES, RELATIONSHIP_THEMES, getRelationshipTheme } from '../viewer/templates/birthdayThemes.js';

let activePreviewAudio = null;
let activePreviewBtn = null;

function toggleSongPreview(src, btn) {
  if (activePreviewAudio && !activePreviewAudio.paused) {
    activePreviewAudio.pause();
    activePreviewAudio.currentTime = 0;
    if (activePreviewBtn) {
      activePreviewBtn.innerHTML = '<i data-lucide="play"></i>';
      activePreviewBtn.classList.remove('playing');
      renderStudioIcons(activePreviewBtn);
    }
    if (activePreviewBtn === btn) {
      activePreviewAudio = null;
      activePreviewBtn = null;
      return;
    }
  }

  btn.innerHTML = '<i data-lucide="volume-2"></i>';
  btn.classList.add('playing');
  renderStudioIcons(btn);
  activePreviewBtn = btn;

  activePreviewAudio = new Audio(src);
  activePreviewAudio.volume = 0.8;
  activePreviewAudio.play().catch(() => {
    btn.innerHTML = '<i data-lucide="play"></i>';
    btn.classList.remove('playing');
    renderStudioIcons(btn);
  });

  activePreviewAudio.onended = () => {
    btn.innerHTML = '<i data-lucide="play"></i>';
    btn.classList.remove('playing');
    renderStudioIcons(btn);
    activePreviewAudio = null;
    activePreviewBtn = null;
  };
}

function renderGenPolaroidsBlock(prefix, label, polaroids) {
  return `
    <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 18px 0 8px; display:flex; align-items:center; justify-content:space-between;">
      <span>📸 ${label}:</span>
      <span style="font-size:11px; color:#94a3b8;">${polaroids.length} Photo${polaroids.length !== 1 ? 's' : ''}</span>
    </div>
    <div id="${prefix}PolaroidsList">
      ${polaroids.map((p, i) => `
        <div class="sub-card-editor gen-polaroid-row" data-prefix="${prefix}" data-i="${i}">
          <div class="bcard-top-row">
            <div class="bcard-drag-handle" title="Drag to reorder"><i data-lucide="grip-vertical"></i></div>
            <div class="bcard-thumb-wrap">
              <img src="${p.image}" class="bcard-thumb" id="${prefix}PolThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
              <label class="btn-thumb-upload" title="Upload Photo">
                <i data-lucide="camera"></i>
                <input type="file" class="file-upload-gen-polaroid" data-prefix="${prefix}" data-i="${i}" accept="image/*" style="display:none;" />
              </label>
            </div>
            <div class="bcard-caption-col">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                <span class="bcard-num-badge">📸 Polaroid #${i+1}</span>
                <button type="button" class="btn-del-gen-polaroid" data-prefix="${prefix}" data-i="${i}" title="Remove photo" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#f87171; border-radius:6px; padding:2px 8px; font-size:11px; cursor:pointer;">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
              <input type="text" class="form-input gen-pol-title" data-prefix="${prefix}" data-i="${i}" value="${p.title || ''}" placeholder="Title / Caption (e.g. Unforgettable Smile)" />
            </div>
          </div>
          <div class="bcard-presets-chips">
            <span class="preset-chip-label">Quick Pick:</span>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/vogue_cover.jpg"><img src="/images/vogue_cover.jpg" class="preset-chip-img" /> Magazine</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/pretty.jpg"><img src="/images/pretty.jpg" class="preset-chip-img" /> Pretty</button>
          </div>
          <input type="text" class="form-input gen-pol-img" data-prefix="${prefix}" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera to upload)" />
          <input type="text" class="form-input gen-pol-note" data-prefix="${prefix}" data-i="${i}" style="margin-top:6px;" value="${p.note || ''}" placeholder="Secret Note / Memory on Tap" />
        </div>
      `).join('')}
    </div>
    <button type="button" class="btn-add-gen-polaroid" data-prefix="${prefix}" style="margin-top:8px; width:100%; background:rgba(245,158,11,0.15); border:1.5px dashed #f59e0b; color:#fbbf24; padding:8px 14px; border-radius:10px; font-size:12px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
      <i data-lucide="plus-circle"></i> Add Polaroid Photo
    </button>
  `;
}

function renderBroClausesBlock(clauses) {
  const safeClauses = Array.isArray(clauses) ? clauses : [];
  return `
    <div style="font-weight:700; font-size:13px; color:#fbbf24; margin: 20px 0 8px; display:flex; align-items:center; justify-content:space-between;">
      <span>📜 Bhai Bro-Code Constitution Clauses:</span>
      <span style="font-size:11px; color:#94a3b8;">${safeClauses.length} Clause${safeClauses.length !== 1 ? 's' : ''}</span>
    </div>
    <div id="broClausesList">
      ${safeClauses.length === 0 ? `
        <div style="text-align:center; padding:16px; background:rgba(245,158,11,0.06); border:1.5px dashed rgba(245,158,11,0.3); border-radius:12px; margin-bottom:10px; color:#94a3b8; font-size:12px;">
          No clauses in constitution yet. Click below to add one!
        </div>
      ` : safeClauses.map((c, i) => `
        <div class="clause-editor-card" data-idx="${i}">
          <div class="clause-editor-header">
            <span style="font-size:11px; font-weight:800; color:#f59e0b;">CLAUSE #${i + 1}</span>
            <button type="button" class="btn-del-clause" data-idx="${i}">
              <i data-lucide="trash-2"></i> Delete
            </button>
          </div>
          <div class="form-group" style="margin-bottom:6px;">
            <label class="form-label" style="font-size:11px;">Clause Title / Rule Name</label>
            <input type="text" class="form-input ed-clause-title" data-idx="${i}" value="${c.title || ''}" placeholder="e.g. Clause 1: Never Snitch to Mom 🤐" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:11px;">Clause Text / Constitution Rule</label>
            <textarea rows="2" class="form-textarea ed-clause-text" data-idx="${i}" placeholder="Enter the non-negotiable sibling rule...">${c.text || ''}</textarea>
          </div>
        </div>
      `).join('')}
    </div>
    <button type="button" id="btnAddBroClause" class="btn-add-bro-clause" style="width:100%; justify-content:center; margin-top:8px;">
      <i data-lucide="plus-circle"></i> Add New Bro-Code Clause
    </button>
  `;
}

export function renderVisualEditor(container, templateId, data, onChange) {
  container.innerHTML = `
    <div class="visual-editor-wrap">
      <!-- Section A: General Info -->
      <div class="editor-section" id="secBasicDetails">
        <div class="editor-section-header">
          <div class="section-title">
            <i data-lucide="sparkles"></i>
            <span>Basic Details</span>
          </div>
          <span class="section-collapse-arrow"><i data-lucide="chevron-down"></i></span>
        </div>
        <div class="editor-section-body">
          <div class="editor-grid-2">
            <div class="form-group">
              <label class="form-label">Recipient's Name</label>
              <input type="text" class="form-input" id="edRecipient" value="${data.recipientName || ''}" placeholder="e.g. My Special One, Maa, Bhai, Sweetheart" />
            </div>
            <div class="form-group">
              <label class="form-label">Your Name (Creator)</label>
              <input type="text" class="form-input" id="edSender" value="${data.senderName || ''}" placeholder="e.g. Yours Truly" />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Hero Title</label>
            <input type="text" class="form-input" id="edHeroTitle" value="${data.heroTitle || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Hero Subtitle</label>
            <input type="text" class="form-input" id="edHeroSubtitle" value="${data.heroSubtitle || ''}" />
          </div>
        </div>
      </div>

      <!-- Section A2: Luxury Theme & Color Styling -->
      <div class="editor-section collapsed" id="secStyling">
        <div class="editor-section-header">
          <div class="section-title">
            <i data-lucide="palette"></i>
            <span>Luxury Styling & Theme Palette</span>
          </div>
          <span class="section-collapse-arrow"><i data-lucide="chevron-down"></i></span>
        </div>
        <div class="editor-section-body">
          <div class="editor-help-text" style="margin-bottom:12px;">
            Choose your celebration's signature accent color. Live updates reflect instantly across hearts, buttons, glows, and chapter rings!
          </div>
          <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:8px;">
              <button type="button" class="btn-theme-swatch" id="btnThemeColorPicker" title="Tap to open pro color picker" style="background:${data.primaryColor || '#d4235c'}; width:38px; height:38px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 12px rgba(212,35,92,0.4); cursor:pointer; flex-shrink:0;"></button>
              <input type="text" class="form-input" id="edPrimaryColor" value="${data.primaryColor || '#d4235c'}" style="width:110px; font-weight:700; font-family:monospace;" />
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:11px; color:#cbd5e1; font-weight:600;">1-Tap Presets:</span>
              <button type="button" class="btn-color-preset" data-color="#d4235c" style="background:#d4235c; color:#fff; border:none; border-radius:12px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">🌹 Rose</button>
              <button type="button" class="btn-color-preset" data-color="#ec4899" style="background:#ec4899; color:#fff; border:none; border-radius:12px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">🌸 Blossom</button>
              <button type="button" class="btn-color-preset" data-color="#d97706" style="background:#d97706; color:#fff; border:none; border-radius:12px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">👑 Gold</button>
              <button type="button" class="btn-color-preset" data-color="#8b5cf6" style="background:#8b5cf6; color:#fff; border:none; border-radius:12px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">💜 Lavender</button>
              <button type="button" class="btn-color-preset" data-color="#2563eb" style="background:#2563eb; color:#fff; border:none; border-radius:12px; padding:4px 10px; font-size:11px; font-weight:700; cursor:pointer;">💙 Cobalt</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section B: Countdown Lock & Event Date -->
      <div class="editor-section highlight-section collapsed" id="secCountdown">
        <div class="editor-section-header">
          <div class="section-title">
            <i data-lucide="calendar"></i>
            <span>Event Date & Countdown Lock</span>
          </div>
          <span class="section-collapse-arrow"><i data-lucide="chevron-down"></i></span>
        </div>
        <div class="editor-section-body">
          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" id="edCountdownLock" ${data.enableCountdownLock ? 'checked' : ''} />
              <span><strong>Lock with Birthday Countdown</strong> (Only opens on the event day!)</span>
            </label>
          </div>

          <div class="editor-grid-2">
            <div class="form-group">
              <label class="form-label">Event Date & Time (Unlocks At)</label>
              <input type="datetime-local" class="form-input" id="edEventDate" value="${data.eventDate ? data.eventDate.slice(0, 16) : ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Maker Passcode (For early review)</label>
              <input type="text" class="form-input" id="edPasscode" value="${data.passcode || '1234'}" placeholder="e.g. 1234" />
            </div>
          </div>
          <div class="editor-help-text">
            💡 When locked, the recipient sees a live romantic countdown clock. You can review the unlocked site anytime using your Maker Passcode.
          </div>

          <div style="margin-top:16px;">
            <label class="form-label" style="font-weight:700; color:var(--primary);">📸 Photos Behind Date Timer (Slideshow):</label>
            <div class="editor-help-text" style="margin-bottom:8px;">
              Add photos that will gently float and crossfade behind the countdown timer for a romantic cinematic effect.
            </div>
            <div class="countdown-photos-grid" id="cdPhotosGrid">
              ${((data.countdownBackgroundImages && data.countdownBackgroundImages.length > 0) ? data.countdownBackgroundImages : ["/images/sunset.jpg", "/images/always_you.jpg"]).map((img, i) => `
                <div class="sub-card-editor" style="display:flex; gap:8px; align-items:center; margin-bottom:6px;">
                  <div class="bcard-drag-handle" title="Drag to reorder"><i data-lucide="grip-vertical"></i></div>
                  <input type="text" class="form-input cd-bg-input" data-i="${i}" value="${img}" placeholder="Image URL" style="flex:1; min-width:0;" />
                  <label class="btn-file-upload-sm" style="flex-shrink:0;">
                    <i data-lucide="camera"></i>
                    <input type="file" class="file-upload-cd-photo" data-i="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
              `).join('')}
            </div>
            <label class="btn-file-upload" style="margin-top:8px; display:inline-flex;">
              <i data-lucide="camera"></i>
              <span>Add / Upload Timer Background Photo</span>
              <input type="file" id="uploadTimerBgPhoto" accept="image/*" style="display:none;" />
            </label>
          </div>
        </div>
      </div>

      <!-- Section C: Music Player & MP3 Upload -->
      <div class="editor-section" id="secMusic">
        <div class="editor-section-header">
          <div class="section-title">
            <i data-lucide="music"></i>
            <span>Background Music & Song</span>
          </div>
          <span class="section-collapse-arrow"><i data-lucide="chevron-down"></i></span>
        </div>
        <div class="editor-section-body">
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label" style="font-size:12px; color:var(--primary); font-weight:700;">⚡ Choose Song Preset (Tap to Select / Preview):</label>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <div class="song-preset-item" style="display:inline-flex; align-items:center; background:rgba(244,114,182,0.12); border:1px solid #f472b6; border-radius:10px; padding:2px 4px;">
                <button type="button" class="btn-song-preset" data-src="/audio/alfaaz.mp3" data-title="Alfaaz - Hamza Malik & Zain Zohaib" data-sub="ROMANTIC SOUNDTRACK" style="background:none; border:none; color:#f472b6; padding:6px 10px; font-size:12px; font-weight:700; cursor:pointer;">
                  🎵 Alfaaz (Hamza Malik)
                </button>
                <button type="button" class="btn-song-preview-toggle" data-src="/audio/alfaaz.mp3" title="Listen to preview" style="background:none; border:none; color:#f472b6; cursor:pointer; padding:4px 6px;">
                  <i data-lucide="play" style="width:13px; height:13px;"></i>
                </button>
              </div>

              <div class="song-preset-item" style="display:inline-flex; align-items:center; background:rgba(244,114,182,0.12); border:1px solid #f472b6; border-radius:10px; padding:2px 4px;">
                <button type="button" class="btn-song-preset" data-src="/audio/blossom_song.mp3" data-title="Blossom Romance Soundtrack" data-sub="LOVELY MELODY" style="background:none; border:none; color:#f472b6; padding:6px 10px; font-size:12px; font-weight:700; cursor:pointer;">
                  🌸 Blossom Theme
                </button>
                <button type="button" class="btn-song-preview-toggle" data-src="/audio/blossom_song.mp3" title="Listen to preview" style="background:none; border:none; color:#f472b6; cursor:pointer; padding:4px 6px;">
                  <i data-lucide="play" style="width:13px; height:13px;"></i>
                </button>
              </div>

              <div class="song-preset-item" style="display:inline-flex; align-items:center; background:rgba(244,114,182,0.12); border:1px solid #f472b6; border-radius:10px; padding:2px 4px;">
                <button type="button" class="btn-song-preset" data-src="/audio/song.mp3" data-title="Happy Birthday Acoustic Track" data-sub="CELEBRATION" style="background:none; border:none; color:#f472b6; padding:6px 10px; font-size:12px; font-weight:700; cursor:pointer;">
                  🎂 Birthday Song
                </button>
                <button type="button" class="btn-song-preview-toggle" data-src="/audio/song.mp3" title="Listen to preview" style="background:none; border:none; color:#f472b6; cursor:pointer; padding:4px 6px;">
                  <i data-lucide="play" style="width:13px; height:13px;"></i>
                </button>
              </div>
            </div>
          </div>

          <div class="editor-grid-2">
            <div class="form-group">
              <label class="form-label">Song Title</label>
              <input type="text" class="form-input" id="edAudioTitle" value="${data.audioTitle || ''}" placeholder="e.g. Alfaaz - Hamza Malik & Zain Zohaib" />
            </div>
            <div class="form-group">
              <label class="form-label">Song Subtitle</label>
              <input type="text" class="form-input" id="edAudioSub" value="${data.audioSubtitle || ''}" placeholder="e.g. ROMANTIC SOUNDTRACK" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Soundtrack Preset or Upload MP3</label>
            <div class="asset-picker-row" style="margin-bottom:8px;">
              <button type="button" class="asset-thumb-chip btn-audio-preset ${(data.audioSrc || '/audio/alfaaz.mp3') === '/audio/alfaaz.mp3' ? 'active' : ''}" data-src="/audio/alfaaz.mp3" data-title="Alfaaz - Hamza Malik" data-sub="ROMANTIC SOUNDTRACK">Alfaaz</button>
              <button type="button" class="asset-thumb-chip btn-audio-preset ${data.audioSrc === '/audio/blossom_song.mp3' ? 'active' : ''}" data-src="/audio/blossom_song.mp3" data-title="Blossom Symphony" data-sub="SOFT INSTRUMENTAL">Blossom Symphony</button>
              <button type="button" class="asset-thumb-chip btn-audio-preset ${data.audioSrc === '/audio/song.mp3' ? 'active' : ''}" data-src="/audio/song.mp3" data-title="Birthday Acoustic" data-sub="CELEBRATION THEME">Birthday Acoustic</button>
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input type="text" class="form-input" id="edAudioSrc" value="${data.audioSrc || '/audio/alfaaz.mp3'}" placeholder="Custom audio URL or upload MP3" style="flex:1; min-width:0;" />
              <label class="btn-file-upload" style="flex-shrink:0;">
                <i data-lucide="upload-cloud"></i>
                <span>Upload MP3</span>
                <input type="file" id="fileUploadSong" accept="audio/*" style="display:none;" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Section D: Template Specific Content -->
      <div class="editor-section" id="templateSpecificFields"></div>

      <!-- Section E: Quick Action Footer -->
      <div class="editor-form-footer">
        <button type="button" class="btn-studio-action btn-footer-save neu-btn" id="btnBottomSave">
          <i data-lucide="save"></i>
          <span>Save Website</span>
        </button>
        <button type="button" class="btn-studio-primary btn-footer-share neu-btn-primary" id="btnBottomShare">
          <i data-lucide="share-2"></i>
          <span>Get Share Link</span>
        </button>
      </div>
    </div>
  `;

  const specificBox = container.querySelector('#templateSpecificFields');

  const isWedding = (templateId === 'wedding_invite' || templateId === 'wedding' || templateId === 'shubh_weds');
  if (isWedding) {
    const secBasic = container.querySelector('#secBasicDetails');
    const secStyling = container.querySelector('#secStyling');
    const secCountdown = container.querySelector('#secCountdown');
    const secMusic = container.querySelector('#secMusic');
    if (secBasic) secBasic.style.display = 'none';
    if (secStyling) secStyling.style.display = 'none';
    if (secCountdown) secCountdown.style.display = 'none';
    if (secMusic) secMusic.style.display = 'none';

    const wrap = container.querySelector('.visual-editor-wrap');
    if (wrap && specificBox) {
      wrap.insertBefore(specificBox, wrap.firstChild);
    }
  }

  if (templateId === 'tree') {
    const treePolaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { image: "/images/sunset.jpg", caption: "Our favourite sunset walk 🌅" },
      { image: "/images/always_you.jpg", caption: "Always laughing with you 🫶" },
      { image: "/images/pretty.jpg", caption: "Your breathtaking smile ✨" },
      { image: "/images/dream_girl.jpg", caption: "Adventures of a lifetime 💫" },
      { image: "/images/queen.jpg", caption: "Forever my queen 👑" }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🏹 Cupid & Blossom Tree Cinematic Details</div>
      
      <div class="editor-grid-2">
        <div class="form-group">
          <label class="form-label">Gate Label (Unwrap Prompt)</label>
          <input type="text" class="form-input" id="edTreeGateLabel" value="${data.gateLabel || 'tap to unwrap'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Bow Hint (Act 1)</label>
          <input type="text" class="form-input" id="edTreeHint" value="${data.hint || 'pull & release'}" />
        </div>
      </div>

      <div class="editor-grid-2">
        <div class="form-group">
          <label class="form-label">Kinetic Line 1 (Act 3)</label>
          <input type="text" class="form-input" id="edTreeWLine1" value="${data.wLine1 || 'Happy'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Kinetic Line 2 (Act 3)</label>
          <input type="text" class="form-input" id="edTreeWLine2" value="${data.wLine2 || 'Birthday'}" />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Kinetic Subtitle (Act 3)</label>
        <input type="text" class="form-input" id="edTreeKSub" value="${data.kSub || 'to someone worth celebrating'}" />
      </div>

      <div class="form-group">
        <label class="form-label">Blossom Tree Canopy Hero Wish (Act 4)</label>
        <input type="text" class="form-input" id="edTreeWHero" value="${data.wHero || 'Happy Birthday'}" />
      </div>

      <div class="form-group">
        <label class="form-label">Blossom Subtitle (Act 4)</label>
        <input type="text" class="form-input" id="edTreeWSub" value="${data.wSub || 'here’s to a year that blooms'}" />
      </div>

      <div class="form-group">
        <label class="form-label">Act 5 Sealed Envelope Letter (Typewriter Animation)</label>
        <textarea class="form-textarea" id="edTreeLetter" rows="4">${data.letterText || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Secret Blossom Love Notes (1 per line - revealed on tap)</label>
        <textarea class="form-textarea" id="edTreeLoveNotes" rows="4">${(data.loveNotes || []).join('\n')}</textarea>
      </div>

      <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 16px 0 8px;">📸 Scrapbook Polaroid Photos:</div>
      <div id="treePolaroidsList">
        ${treePolaroids.map((p, i) => `
          <div class="sub-card-editor tree-polaroid-row" data-i="${i}">
            <div class="bcard-top-row">
              <div class="bcard-drag-handle" title="Drag to reorder"><i data-lucide="grip-vertical"></i></div>
              <div class="bcard-thumb-wrap">
                <img src="${p.image}" class="bcard-thumb" id="treePolThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                <label class="btn-thumb-upload" title="Upload from phone">
                  <i data-lucide="camera"></i>
                  <input type="file" class="file-upload-tree-polaroid" data-i="${i}" accept="image/*" style="display:none;" />
                </label>
              </div>
              <div class="bcard-caption-col">
                <span class="bcard-num-badge">📸 Polaroid #${i+1}</span>
                <input type="text" class="form-input tree-pol-cap" data-i="${i}" value="${p.caption || ''}" placeholder="Caption (e.g. Our favorite sunset walk)" />
              </div>
            </div>
            <div class="bcard-presets-chips">
              <span class="preset-chip-label">Quick Pick:</span>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/dream_girl.jpg"><img src="/images/dream_girl.jpg" class="preset-chip-img" /> Dream Girl</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/queen.jpg"><img src="/images/queen.jpg" class="preset-chip-img" /> Queen</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/baddie.jpg"><img src="/images/baddie.jpg" class="preset-chip-img" /> Baddie</button>
            </div>
            <input type="text" class="form-input tree-pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera to upload)" />
          </div>
        `).join('')}
      </div>
    `;
  } else if (templateId === 'long_romance') {
    const milestones = (data.milestones && data.milestones.length > 0) ? data.milestones : [
      { num: "01", icon: "✨", tag: "THE SPARK", title: "Where Our Story Began", date: "June 14, 2022", image: "/images/sunset.jpg", desc: "One single glance that stopped time. A brief hello that quietly turned into the most meaningful connection of my entire life." },
      { num: "02", icon: "🌙", tag: "THE CONFESSION", title: "Falling in Love with Your Soul", date: "August 28, 2022", image: "/images/always_you.jpg", desc: "Laughing so hard our ribs hurt, talking until 4 AM about childhood dreams and life philosophies. I realized I was falling completely." },
      { num: "03", icon: "🛡️", tag: "THE ANCHOR", title: "Weathering Every Storm Together", date: "February 12, 2023", image: "/images/pretty.jpg", desc: "Life isn't always sunny, but standing shoulder-to-shoulder with you proved that we can conquer any challenge as a team." },
      { num: "04", icon: "📸", tag: "THE ADVENTURES", title: "A Thousand Unfiltered Memories", date: "October 05, 2023", image: "/images/dream_girl.jpg", desc: "Spontaneous road trips, messy cooking experiments, late-night grocery runs. The ordinary world becomes pure magic with you." },
      { num: "05", icon: "💍", tag: "ETERNITY", title: "Today, Tomorrow & Across Lifetimes", date: "Forever & Always", image: "/images/queen.jpg", desc: "In a world of fleeting moments, choosing you is the easiest decision I'll ever make. My heart is, and will forever be, your home." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🌸 Long Romance Masterpiece Continuous Customization</div>
      
      <!-- Mixtape & Audio Integration -->
      <div style="background:rgba(212,35,92,0.04); border:1px solid rgba(212,35,92,0.18); border-radius:14px; padding:16px; margin-bottom:20px;">
        <label class="form-label" style="font-weight:800; color:var(--primary); font-size:15px; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>📻</span> Mixtape, Spotify &amp; YouTube Player
        </label>
        <div class="editor-help-text" style="margin-bottom:12px;">
          Customize the music that plays during the continuous romance journey. Paste a Spotify track/playlist embed link or a YouTube video link!
        </div>
        <div class="form-group">
          <label class="form-label">Spotify Embed Link or Playlist URL</label>
          <input type="text" class="form-input" id="edRomanceSpotify" value="${data.spotifyUrl || ''}" placeholder="e.g. https://open.spotify.com/playlist/... or track/..." />
        </div>
        <div class="form-group">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label class="form-label" style="margin:0; font-weight:700;">YouTube Video / Playlist URL</label>
            <button type="button" id="btnFetchYoutubeSongs" class="btn-fetch-yt" style="background:linear-gradient(135deg, #d4235c, #e11d48); color:#fff; border:none; padding:5px 12px; font-size:11px; font-weight:800; border-radius:999px; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 3px 10px rgba(212,35,92,0.3); transition:all 0.15s ease;">
              <span class="yt-fetch-icon">⚡</span> Auto-Fetch Songs from Link
            </button>
          </div>
          <input type="text" class="form-input" id="edRomanceYoutube" value="${data.youtubeUrl || ''}" placeholder="e.g. https://www.youtube.com/playlist?list=... or watch?v=..." />
          <div id="ytFetchStatus" style="font-size:11.5px; font-weight:600; margin-top:6px; display:none; padding:6px 10px; border-radius:8px; line-height:1.4;"></div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Song Title (on Cassette Label)</label>
            <input type="text" class="form-input" id="edRomanceAudioTitle" value="${data.audioTitle || 'Our Romantic Theme'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Native Audio MP3 Source</label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="text" class="form-input" id="edRomanceAudioSrc" value="${data.audioSrc || '/audio/alfaaz.mp3'}" style="flex:1;" />
              <input type="file" id="fileUploadRomanceSong" accept="audio/*" style="display:none;" />
              <button type="button" class="btn-nav-glass" id="btnUploadRomanceSong" style="white-space:nowrap; padding:8px 12px; font-size:12px; font-weight:700; border-radius:8px; display:inline-flex; align-items:center; gap:6px; cursor:pointer;" title="Upload custom MP3 audio">
                <span>📁</span> Upload MP3
              </button>
            </div>
          </div>
        </div>

        <!-- Mixtape Playlist Tracklist Editor -->
        <div style="margin-top:16px; padding-top:14px; border-top:1px dashed rgba(212,35,92,0.25);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <label class="form-label" style="font-weight:800; color:var(--primary); font-size:13px; margin:0;">
              🌸 Mixtape Songs Tracklist (Interactive in Chapter V)
            </label>
            <button type="button" class="btn-add-track" id="btnAddRomanceTrack" style="padding:4px 10px; font-size:11px; font-weight:700; background:#d4235c; color:#fff; border:none; border-radius:999px; cursor:pointer;">+ Add Song</button>
          </div>
          <div class="editor-help-text" style="margin-bottom:10px;">
            These songs appear in the interactive playlist inside Chapter V. Viewers can tap any song to see and play it!
          </div>
          <div id="romanceTracksList">
            ${(data.playlist && data.playlist.length > 0 ? data.playlist : [
              { id: 1, title: data.audioTitle || "Alfaaz", artist: data.audioSubtitle || "Hamza Malik & Zain Zohaib", src: data.audioSrc || "/audio/alfaaz.mp3", tag: "OUR THEME 🌸" },
              { id: 2, title: "Blossom Romance Symphony", artist: "Romantic Instrumental", src: "/audio/blossom_song.mp3", tag: "FIRST DATE 🫶" },
              { id: 3, title: "Happy Birthday Acoustic Wish", artist: "Acoustic Guitar & Piano", src: "/audio/song.mp3", tag: "SPECIAL CELEBRATION ✨" },
              { id: 4, title: "Always In My Heart", artist: "Soft Piano Reverie", src: "/audio/alfaaz.mp3", tag: "SWEET MOMENTS 💖" },
              { id: 5, title: "Golden Hour Sakura", artist: "Orchestral Blossom", src: "/audio/blossom_song.mp3", tag: "FOREVER YOURS 👑" }
            ]).map((t, idx) => `
              <div class="sub-card-editor romance-track-row" data-t-idx="${idx}" style="margin-bottom:8px; border-radius:10px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span style="font-weight:800; font-size:11px; color:#d4235c;">#0${idx + 1} • TRACK</span>
                  <button type="button" class="btn-del-track" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;">✕</button>
                </div>
                <div class="editor-grid-2" style="margin-bottom:6px;">
                  <input type="text" class="form-input rtrack-title" value="${t.title || ''}" placeholder="Song Title" />
                  <input type="text" class="form-input rtrack-artist" value="${t.artist || ''}" placeholder="Artist" />
                </div>
                <div style="display:flex; gap:6px; align-items:center;">
                  <input type="text" class="form-input rtrack-src" value="${t.src || ''}" placeholder="Audio URL (.mp3)" style="flex:1;" />
                  <input type="text" class="form-input rtrack-tag" value="${t.tag || ''}" placeholder="Tag (e.g. OUR THEME)" style="width:115px;" />
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Storytelling Milestones Editor -->
      <div style="background:rgba(251,191,36,0.06); border:1px solid rgba(251,191,36,0.25); border-radius:14px; padding:16px; margin-bottom:20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <label class="form-label" style="font-weight:800; color:#b45309; font-size:15px; margin:0; display:flex; align-items:center; gap:8px;">
            <span>🍃</span> Storytelling Milestones (Flying Leaf Transitions)
          </label>
          <button type="button" class="btn-add-milestone" id="btnAddRomanceMilestone" style="padding:4px 10px; font-size:12px; font-weight:700; background:#d4235c; color:#fff; border:none; border-radius:9999px; cursor:pointer;">+ Add Milestone</button>
        </div>
        <div class="editor-help-text" style="margin-bottom:12px;">
          Each milestone is presented as a full-screen story chapter with image and text, dynamically swept by flying leaves.
        </div>
        <div id="romanceMilestonesList">
          ${milestones.map((m, i) => `
            <div class="sub-card-editor romance-milestone-row" data-m-idx="${i}" style="margin-bottom:14px; border-radius:12px; padding:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-weight:800; font-size:12px; color:#d4235c;">#${m.num || ('0' + (i+1))} • ${m.tag || 'MILESTONE'}</span>
                <button type="button" class="btn-del-milestone" data-i="${i}" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px;">✕</button>
              </div>
              <div class="editor-grid-2" style="margin-bottom:8px;">
                <input type="text" class="form-input rmilestone-title" value="${m.title || ''}" placeholder="Milestone Title" />
                <input type="text" class="form-input rmilestone-date" value="${m.date || ''}" placeholder="Date (e.g. June 14, 2022)" />
              </div>
              <div style="margin-bottom:8px;">
                <input type="text" class="form-input rmilestone-img" value="${m.image || ''}" placeholder="Image URL (e.g. /images/sunset.jpg)" />
              </div>
              <div>
                <textarea rows="3" class="form-textarea rmilestone-desc" placeholder="Story text for this milestone...">${m.desc || ''}</textarea>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Sacred Letter & Vow Treaty -->
      <div style="background:rgba(212,35,92,0.04); border:1px solid rgba(212,35,92,0.18); border-radius:14px; padding:16px; margin-bottom:20px;">
        <label class="form-label" style="font-weight:800; color:var(--primary); font-size:15px; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span>💌</span> Sacred Match Burning Letter
        </label>
        <div class="form-group">
          <label class="form-label">Love Letter Body (Revealed after burning wax seal)</label>
          <textarea rows="6" class="form-textarea" id="edRomanceLetter">${data.letterText || ''}</textarea>
        </div>
        <div class="form-group" style="margin-top:14px;">
          <label class="form-label" style="font-weight:800; color:#b45309;">💍 Treaty of Eternal Devotion Vow Text</label>
          <textarea rows="3" class="form-textarea" id="edRomanceTreatyVow">${data.treatyVow || 'I promise to love you on peaceful mornings and in wild storms, to cherish your laugh, to support your dreams, and to walk hand-in-hand with you through every tomorrow.'}</textarea>
        </div>
      </div>
    `;

    // Hook add/delete buttons for milestones
    const btnAddM = specificBox.querySelector('#btnAddRomanceMilestone');
    const mList = specificBox.querySelector('#romanceMilestonesList');
    btnAddM?.addEventListener('click', () => {
      const idx = mList.querySelectorAll('.romance-milestone-row').length;
      const row = document.createElement('div');
      row.className = 'sub-card-editor romance-milestone-row';
      row.setAttribute('data-m-idx', idx);
      row.style.cssText = 'margin-bottom:14px; border-radius:12px; padding:12px;';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-weight:800; font-size:12px; color:#d4235c;">#0${idx + 1} • NEW MILESTONE</span>
          <button type="button" class="btn-del-milestone" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px;">✕</button>
        </div>
        <div class="editor-grid-2" style="margin-bottom:8px;">
          <input type="text" class="form-input rmilestone-title" value="" placeholder="Milestone Title" />
          <input type="text" class="form-input rmilestone-date" value="" placeholder="Date (e.g. Today)" />
        </div>
        <div style="margin-bottom:8px;">
          <input type="text" class="form-input rmilestone-img" value="/images/sunset.jpg" placeholder="Image URL" />
        </div>
        <div>
          <textarea rows="3" class="form-textarea rmilestone-desc" placeholder="Story text for this milestone..."></textarea>
        </div>
      `;
      row.querySelector('.btn-del-milestone').addEventListener('click', () => row.remove());
      mList.appendChild(row);
    });

    specificBox.querySelectorAll('.btn-del-milestone').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('.romance-milestone-row');
        if (row) row.remove();
        emitChange();
      });
    });

    const btnAddT = specificBox.querySelector('#btnAddRomanceTrack');
    const tList = specificBox.querySelector('#romanceTracksList');
    btnAddT?.addEventListener('click', () => {
      const idx = tList.querySelectorAll('.romance-track-row').length;
      const row = document.createElement('div');
      row.className = 'sub-card-editor romance-track-row';
      row.setAttribute('data-t-idx', idx);
      row.style.cssText = 'margin-bottom:8px; border-radius:10px; padding:10px;';
      row.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span style="font-weight:800; font-size:11px; color:#d4235c;">#0${idx + 1} • TRACK</span>
          <button type="button" class="btn-del-track" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;">✕</button>
        </div>
        <div class="editor-grid-2" style="margin-bottom:6px;">
          <input type="text" class="form-input rtrack-title" value="" placeholder="Song Title" />
          <input type="text" class="form-input rtrack-artist" value="" placeholder="Artist" />
        </div>
        <div style="display:flex; gap:6px; align-items:center;">
          <input type="text" class="form-input rtrack-src" value="/audio/alfaaz.mp3" placeholder="Audio URL" style="flex:1;" />
          <input type="text" class="form-input rtrack-tag" value="SPECIAL 🌸" placeholder="Tag" style="width:115px;" />
        </div>
      `;
      row.querySelector('.btn-del-track').addEventListener('click', () => { row.remove(); emitChange(); });
      tList.appendChild(row);
      emitChange();
    });

    specificBox.querySelectorAll('.btn-del-track').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const row = e.target.closest('.romance-track-row');
        if (row) { row.remove(); emitChange(); }
      });
    });

    const fileRomanceSong = specificBox.querySelector('#fileUploadRomanceSong');
    const btnRomanceSong = specificBox.querySelector('#btnUploadRomanceSong');
    btnRomanceSong?.addEventListener('click', () => fileRomanceSong?.click());
    fileRomanceSong?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const inpAudio = specificBox.querySelector('#edRomanceAudioSrc');
      const genAudio = container.querySelector('#edAudioSrc');
      if (inpAudio) inpAudio.value = "Uploading song...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (inpAudio) inpAudio.value = res.url;
        if (genAudio) genAudio.value = res.url;
        emitChange();
      } else {
        if (inpAudio) inpAudio.value = data.audioSrc || '/audio/alfaaz.mp3';
        alert(res.error || "Upload failed. Please choose an audio preset or paste an MP3 URL.");
      }
    });

    // ⚡ Auto-Fetch Songs from YouTube Playlist or Video URL
    const ytInp = specificBox.querySelector('#edRomanceYoutube');
    const btnFetchYt = specificBox.querySelector('#btnFetchYoutubeSongs');
    const statusYt = specificBox.querySelector('#ytFetchStatus');
    let lastFetchedYt = '';

    async function autoFetchYoutubeSongs(rawUrl) {
      if (!rawUrl || !rawUrl.trim()) return;
      const url = rawUrl.trim();
      if (url === lastFetchedYt) return;

      const isYt = url.includes('youtube.com') || url.includes('youtu.be') || /^(PL|RD|FL|UU|LL)[a-zA-Z0-9_-]+$/.test(url);
      if (!isYt) return;

      if (statusYt) {
        statusYt.style.display = 'block';
        statusYt.style.background = 'rgba(212,35,92,0.08)';
        statusYt.style.border = '1px solid rgba(212,35,92,0.2)';
        statusYt.style.color = '#be123c';
        statusYt.innerHTML = '⚡ <b>Fetching songs from YouTube link...</b> Please wait a moment.';
      }
      if (btnFetchYt) {
        btnFetchYt.disabled = true;
        btnFetchYt.style.opacity = '0.65';
      }

      try {
        let result = null;
        // 1. Try local / Vercel API endpoint
        try {
          const res = await fetch(`/api/fetch-playlist?url=${encodeURIComponent(url)}`);
          if (res.ok) {
            result = await res.json();
          }
        } catch (_) {}

        // 2. Client-side fallback to YouTube oEmbed API
        if (!result || !result.success || !result.tracks || result.tracks.length === 0) {
          try {
            const oeRes = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
            if (oeRes.ok) {
              const oe = await oeRes.json();
              const cleanTitle = (oe.title || 'Romantic Melody').replace(/[\(\[](Official|Music Video|Video|Lyrics|Audio|HD|4K|Visualizer|Lyric Video)[\)\]]/gi, '').trim();
              result = {
                success: true,
                playlistTitle: cleanTitle,
                tracks: [
                  {
                    id: 1,
                    title: cleanTitle,
                    artist: oe.author_name || 'YouTube Music',
                    src: url,
                    tag: 'OUR THEME 🌸',
                    duration: '3:45'
                  }
                ]
              };
            }
          } catch (_) {}
        }

        if (result && result.success && result.tracks && result.tracks.length > 0) {
          lastFetchedYt = url;
          const tracks = result.tracks;

          // Render into romanceTracksList
          if (tList) {
            tList.innerHTML = tracks.map((t, idx) => `
              <div class="sub-card-editor romance-track-row" data-t-idx="${idx}" style="margin-bottom:8px; border-radius:10px; padding:10px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                  <span style="font-weight:800; font-size:11px; color:#d4235c;">#0${idx + 1} • TRACK</span>
                  <button type="button" class="btn-del-track" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;">✕</button>
                </div>
                <div class="editor-grid-2" style="margin-bottom:6px;">
                  <input type="text" class="form-input rtrack-title" value="${(t.title || '').replace(/"/g, '&quot;')}" placeholder="Song Title" />
                  <input type="text" class="form-input rtrack-artist" value="${(t.artist || '').replace(/"/g, '&quot;')}" placeholder="Artist" />
                </div>
                <div style="display:flex; gap:6px; align-items:center;">
                  <input type="text" class="form-input rtrack-src" value="${(t.src || '').replace(/"/g, '&quot;')}" placeholder="Audio URL (.mp3 or YouTube)" style="flex:1;" />
                  <input type="text" class="form-input rtrack-tag" value="${(t.tag || `TRACK 0${idx + 1}`).replace(/"/g, '&quot;')}" placeholder="Tag" style="width:115px;" />
                </div>
              </div>
            `).join('');

            // Re-bind delete buttons and inputs
            tList.querySelectorAll('.btn-del-track').forEach(b => {
              b.addEventListener('click', (e) => {
                const row = e.target.closest('.romance-track-row');
                if (row) { row.remove(); emitChange(); }
              });
            });
            tList.querySelectorAll('input').forEach(inp => {
              inp.addEventListener('input', emitChange);
            });
          }

          // Update Song Title on Cassette if default
          const elAudTitle = specificBox.querySelector('#edRomanceAudioTitle');
          if (elAudTitle && result.playlistTitle) {
            elAudTitle.value = result.playlistTitle;
          }

          if (statusYt) {
            statusYt.style.display = 'block';
            statusYt.style.background = 'rgba(16,185,129,0.08)';
            statusYt.style.border = '1px solid rgba(16,185,129,0.25)';
            statusYt.style.color = '#059669';
            statusYt.innerHTML = `✅ <b>Success!</b> Auto-fetched ${tracks.length} song${tracks.length > 1 ? 's' : ''} directly from YouTube playlist!`;
          }

          emitChange();
        } else {
          if (statusYt) {
            statusYt.style.display = 'block';
            statusYt.style.background = 'rgba(239,68,68,0.08)';
            statusYt.style.border = '1px solid rgba(239,68,68,0.2)';
            statusYt.style.color = '#dc2626';
            statusYt.innerHTML = '⚠️ Could not auto-fetch songs from this link. You can add songs manually using the button below.';
          }
        }
      } catch (err) {
        if (statusYt) {
          statusYt.style.display = 'block';
          statusYt.style.background = 'rgba(239,68,68,0.08)';
          statusYt.style.border = '1px solid rgba(239,68,68,0.2)';
          statusYt.style.color = '#dc2626';
          statusYt.innerHTML = '⚠️ Auto-fetch error: ' + (err.message || 'Network error');
        }
      } finally {
        if (btnFetchYt) {
          btnFetchYt.disabled = false;
          btnFetchYt.style.opacity = '1';
        }
      }
    }

    btnFetchYt?.addEventListener('click', () => {
      if (ytInp && ytInp.value) autoFetchYoutubeSongs(ytInp.value);
    });

    ytInp?.addEventListener('paste', () => {
      setTimeout(() => {
        if (ytInp && ytInp.value) autoFetchYoutubeSongs(ytInp.value);
      }, 120);
    });

    ytInp?.addEventListener('blur', () => {
      if (ytInp && ytInp.value) autoFetchYoutubeSongs(ytInp.value);
    });

  } else if (templateId === 'blossom' || templateId === 'bestie_girl' || templateId === 'bestie_boy') {
    const isGirl = templateId === 'bestie_girl';
    const isBoy = templateId === 'bestie_boy';
    const sectionTitle = isGirl ? "💅 Girl Bestie (Soul Sister) Details" : isBoy ? "👊 Bro Bestie (Ride or Die) Details" : "🌸 Blossom Romance Details (Viral Pastel Story)";
    const blossomCards = (data.cards && data.cards.length > 0) ? data.cards : [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ];

    specificBox.innerHTML = `
      <div class="section-title">${sectionTitle}</div>
      <div class="editor-grid-2">
        <div class="form-group">
          <label class="form-label">4-Digit Passcode (Keypad)</label>
          <input type="text" class="form-input" id="edBlossomPin" maxlength="4" value="${data.passcode || '1234'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Keypad Header</label>
          <input type="text" class="form-input" id="edBlossomKeypadTitle" value="${data.keypadTitle || 'For you, my love'}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Scene 1 Blossom Prompt</label>
        <input type="text" class="form-input" id="edBlossomPrompt" value="${data.blossomPrompt || 'Touch the blossom'}" />
      </div>
      <div class="form-group">
        <label class="form-label">Scene 3 Opening Note (Line 1)</label>
        <input type="text" class="form-input" id="edBlossomIntro1" value="${data.introLine1 || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Scene 3 Opening Note (Line 2)</label>
        <input type="text" class="form-input" id="edBlossomIntro2" value="${data.introLine2 || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Scene 5 Cake Headline</label>
        <input type="text" class="form-input" id="edBlossomCakeHead" value="${data.cakeHeadline || 'Happy Birthday, My Girl!'}" />
      </div>
      <div class="form-group">
        <label class="form-label">Scene 8 Love Letter Body (Typewriter)</label>
        <textarea rows="6" class="form-textarea" id="edBlossomLetter">${data.letterBody || ''}</textarea>
      </div>

      <!-- Scene 5 Memory Photo Cards Editor -->
      <div style="margin-top:20px; border-top:1px dashed #fbcfe8; padding-top:16px;">
        <label class="form-label" style="font-weight:700; color:var(--primary); font-size:15px;">📸 Scene 6 Memory Photo Cards (Swipeable Gallery)</label>
        <div class="editor-help-text" style="margin-bottom:12px;">
          Add or edit the pictures and romantic captions shown in the 3D swipeable memory deck.
        </div>
        <div id="blossomCardsList">
          ${blossomCards.map((c, i) => `
            <div class="sub-card-editor blossom-card-row" data-card-idx="${i}">
              <div class="bcard-top-row">
                <div class="bcard-drag-handle" title="Drag to reorder"><i data-lucide="grip-vertical"></i></div>
                <div class="bcard-thumb-wrap">
                  <img src="${c.image}" class="bcard-thumb" id="bcardThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                  <label class="btn-thumb-upload" title="Upload Photo">
                    <i data-lucide="camera"></i>
                    <input type="file" class="file-upload-blossom-card" data-i="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
                <div class="bcard-caption-col">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="bcard-num-badge">✨ Memory #${i+1}</span>
                    <button type="button" class="btn-del-blossom-card" data-i="${i}" title="Delete Card"><i data-lucide="trash-2"></i></button>
                  </div>
                  <input type="text" class="form-input bcard-cap" data-i="${i}" value="${c.caption || ''}" placeholder="Caption (e.g. Sweet moments with you)" />
                </div>
              </div>

              <!-- Quick Pick Photo Chips -->
              <div class="bcard-presets-chips">
                <span class="preset-chip-label">Quick Pick:</span>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/dream_girl.jpg"><img src="/images/dream_girl.jpg" class="preset-chip-img" /> Dream Girl</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/queen.jpg"><img src="/images/queen.jpg" class="preset-chip-img" /> Queen</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/baddie.jpg"><img src="/images/baddie.jpg" class="preset-chip-img" /> Baddie</button>
              </div>

              <div class="bcard-url-row">
                <input type="text" class="form-input bcard-img" data-i="${i}" value="${c.image}" placeholder="Image URL (or tap camera to upload)" />
              </div>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn-file-upload" id="btnAddBlossomCard" style="margin-top:6px; display:inline-flex; width:auto; font-size:13px;">
          ➕ Add Another Memory Card
        </button>
      </div>
    `;
  } else if (templateId === 'birthday') {
    const activeRel = getRelationshipTheme(data.relationship || data.recipientPersona || 'best-friend');
    const relDefaults = activeRel.defaults;
    const heroNotes = (Array.isArray(data.heroNotes) && data.heroNotes.length > 0) ? data.heroNotes : relDefaults.heroNotes;
    const milestones = (Array.isArray(data.milestones) && data.milestones.length > 0) ? data.milestones : relDefaults.milestones;
    const bdayPolaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : relDefaults.photos.map(p => ({
      title: p.category || 'Memory',
      date: p.date || 'Moment',
      category: p.category || 'Moments',
      image: p.image,
      note: p.caption || ''
    }));
    const appreciationText = (Array.isArray(data.appreciationReasons) && data.appreciationReasons.length > 0)
      ? data.appreciationReasons.join('\n')
      : relDefaults.appreciationReasons.join('\n');
    const lanternText = (Array.isArray(data.lanternWishes) && data.lanternWishes.length > 0)
      ? data.lanternWishes.join('\n')
      : relDefaults.lanternWishes.join('\n');

    specificBox.innerHTML = `
      <div class="section-title">🎂 Relationship-Adaptive Birthday Studio</div>

      <!-- Categorized Relationship Selector -->
      <div class="form-group" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14); border-radius: 16px; padding: 14px; margin-bottom: 18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
          <label class="form-label" style="margin:0; font-weight:800; color:#fbbf24;">🎭 Who Are You Wishing?</label>
          <label style="display:inline-flex; align-items:center; gap:6px; font-size:11.5px; color:rgba(255,255,255,0.8); cursor:pointer;">
            <input type="checkbox" id="edPreserveBdayText" />
            <span>Preserve already-edited text</span>
          </label>
        </div>
        <input type="hidden" id="edRecipientPersona" value="${activeRel.id}" />
        ${RELATIONSHIP_CATEGORIES.map(cat => {
          const items = Object.values(RELATIONSHIP_THEMES).filter(t => t.category === cat.id);
          return `
            <div style="margin-bottom:12px;">
              <div style="font-size:11px; font-weight:800; letter-spacing:1.2px; text-transform:uppercase; color:rgba(255,255,255,0.62); margin-bottom:6px;">${cat.icon} ${cat.label}</div>
              <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(125px, 1fr)); gap:8px;">
                ${items.map(t => {
                  const isSel = t.id === activeRel.id;
                  return `
                    <button type="button" class="bday-rel-card" data-rel-id="${t.id}" style="text-align:left; padding:9px 10px; border-radius:12px; border:1.5px solid ${isSel ? t.palette.primary : 'rgba(255,255,255,0.12)'}; background:${isSel ? 'rgba(255,255,255,0.12)' : 'rgba(15,16,28,0.65)'}; color:#fff; cursor:pointer;">
                      <div style="display:flex; align-items:center; gap:6px; font-weight:700; font-size:12.5px;">
                        <span>${t.emoji}</span><span>${t.label}</span>
                      </div>
                      <div style="font-size:10px; color:rgba(255,255,255,0.62); margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.mood}</div>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Identity & Theme Overrides -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">Nickname (Optional)</label>
          <input type="text" class="form-input" id="edBdayNickname" value="${(data.nickname ?? relDefaults.nickname ?? '').replace(/"/g, '&quot;')}" placeholder="e.g. Day One, Sunshine" />
        </div>
        <div class="form-group">
          <label class="form-label">Age / Milestone (Optional)</label>
          <input type="text" class="form-input" id="edAge" value="${(data.age || '').replace(/"/g, '&quot;')}" placeholder="e.g. 21, 30th" />
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">Accent Override (Optional)</label>
          <input type="color" class="form-input" id="edBdayAccentColor" value="${data.accentColor || activeRel.palette.accent}" style="height:40px; padding:4px;" />
        </div>
        <div class="form-group">
          <label class="form-label">Font Mood</label>
          <select class="form-select" id="edBdayFontMood">
            <option value="'Playfair Display', Georgia, serif" ${(!data.fontMood || data.fontMood.includes('Playfair')) ? 'selected' : ''}>Classic Editorial Serif</option>
            <option value="'Cormorant Garamond', Georgia, serif" ${(data.fontMood && data.fontMood.includes('Cormorant')) ? 'selected' : ''}>Calligraphic Storybook</option>
            <option value="'Plus Jakarta Sans', system-ui, sans-serif" ${(data.fontMood && data.fontMood.includes('Jakarta')) ? 'selected' : ''}>Modern Clean Display</option>
          </select>
        </div>
      </div>

      <!-- Interactive Hero Notes -->
      <div class="section-title" style="margin-top:16px;">✦ Interactive Hero Notes (5–8 Tappable Wishes)</div>
      <div id="bdayHeroNotesList">
        ${heroNotes.map((n, i) => `
          <div class="sub-card-editor bday-hero-note-row" data-i="${i}" style="display:grid; grid-template-columns:1fr 2fr auto; gap:8px; align-items:center;">
            <input type="text" class="form-input bday-hn-label" value="${(n.label || '').replace(/"/g, '&quot;')}" placeholder="Node Label" />
            <input type="text" class="form-input bday-hn-text" value="${(n.text || '').replace(/"/g, '&quot;')}" placeholder="Wish revealed on tap..." />
            <button type="button" class="btn-remove-bday-row" title="Remove" style="background:rgba(239,68,68,0.18); color:#fca5a5; border:none; border-radius:8px; padding:8px 10px; cursor:pointer;">✕</button>
          </div>
        `).join('')}
      </div>
      <button type="button" class="btn-file-upload" id="btnAddBdayHeroNote" style="margin:6px 0 14px; width:auto; font-size:12.5px;">➕ Add Hero Note</button>

      <!-- Timeline Milestones -->
      <div class="section-title">📍 Timeline Milestones (Act III)</div>
      <div id="bdayMilestonesList">
        ${milestones.map((m, i) => `
          <div class="sub-card-editor bday-ms-row" data-i="${i}">
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:8px; margin-bottom:6px;">
              <input type="text" class="form-input bday-ms-tag" value="${(m.tag || '').replace(/"/g, '&quot;')}" placeholder="Tag (e.g. DAY ONE)" />
              <input type="text" class="form-input bday-ms-date" value="${(m.date || '').replace(/"/g, '&quot;')}" placeholder="Date / Era" />
              <input type="text" class="form-input bday-ms-title" value="${(m.title || '').replace(/"/g, '&quot;')}" placeholder="Title" />
              <button type="button" class="btn-remove-bday-row" title="Remove" style="background:rgba(239,68,68,0.18); color:#fca5a5; border:none; border-radius:8px; padding:6px 10px; cursor:pointer;">✕</button>
            </div>
            <input type="text" class="form-input bday-ms-desc" value="${(m.desc || '').replace(/"/g, '&quot;')}" placeholder="Milestone story..." />
          </div>
        `).join('')}
      </div>
      <button type="button" class="btn-file-upload" id="btnAddBdayMilestone" style="margin:6px 0 14px; width:auto; font-size:12.5px;">➕ Add Milestone</button>

      <!-- Soundtrack Links & Appreciation Reasons -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">Spotify Playlist URL (Optional)</label>
          <input type="text" class="form-input" id="edBdaySpotify" value="${(data.spotifyUrl || '').replace(/"/g, '&quot;')}" placeholder="https://open.spotify.com/..." />
        </div>
        <div class="form-group">
          <label class="form-label">YouTube Track URL (Optional)</label>
          <input type="text" class="form-input" id="edBdayYoutube" value="${(data.youtubeUrl || '').replace(/"/g, '&quot;')}" placeholder="https://youtube.com/..." />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Appreciation Reasons (One per line, Act IV)</label>
        <textarea rows="4" class="form-textarea" id="edBdayAppreciation">${appreciationText}</textarea>
      </div>

      <!-- Memory Reel Photos -->
      <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 16px 0 8px;">📸 Memory Reel Photos (3D Carousel & Book View):</div>
      <div id="polaroidCardsList">
        ${bdayPolaroids.map((p, i) => `
          <div class="sub-card-editor bday-polaroid-row" data-i="${i}">
            <div class="bcard-top-row">
              <div class="bcard-drag-handle" title="Drag to reorder"><i data-lucide="grip-vertical"></i></div>
              <div class="bcard-thumb-wrap">
                <img src="${p.image}" class="bcard-thumb" id="polThumb_${i}" onerror="this.src='/images/always_you.jpg'" />
                <label class="btn-thumb-upload" title="Upload from phone">
                  <i data-lucide="camera"></i>
                  <input type="file" class="file-upload-photo" data-i="${i}" accept="image/*" style="display:none;" />
                </label>
              </div>
              <div class="bcard-caption-col">
                <span class="bcard-num-badge">📸 Memory #${i+1}</span>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:6px;">
                  <input type="text" class="form-input pol-t" data-i="${i}" value="${(p.category || p.title || 'Moments').replace(/"/g, '&quot;')}" placeholder="Category Tag" />
                  <input type="text" class="form-input pol-date" data-i="${i}" value="${(p.date || 'Golden Hour').replace(/"/g, '&quot;')}" placeholder="Date" />
                </div>
              </div>
            </div>
            <div class="bcard-presets-chips">
              <span class="preset-chip-label">Quick Pick:</span>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/dream_girl.jpg"><img src="/images/dream_girl.jpg" class="preset-chip-img" /> Dream</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/beautiful.jpg"><img src="/images/beautiful.jpg" class="preset-chip-img" /> Radiant</button>
            </div>
            <input type="text" class="form-input pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera to upload)" />
            <input type="text" class="form-input pol-n" data-i="${i}" style="margin-top:6px;" value="${(p.note || p.caption || '').replace(/"/g, '&quot;')}" placeholder="Memory caption..." />
          </div>
        `).join('')}
      </div>

      <!-- Sealed Birthday Letter -->
      <div class="section-title" style="margin-top:18px;">✉️ Sealed Birthday Letter (Act VI)</div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div class="form-group">
          <label class="form-label">Salutation</label>
          <input type="text" class="form-input" id="edBdayLetterSal" value="${(data.letterSalutation || relDefaults.letterSalutation).replace(/"/g, '&quot;')}" />
        </div>
        <div class="form-group">
          <label class="form-label">Sign-off</label>
          <input type="text" class="form-input" id="edBdayLetterSign" value="${(data.letterSignoff || relDefaults.letterSignoff).replace(/"/g, '&quot;')}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Letter Body</label>
        <textarea rows="4" class="form-textarea" id="edBdayLetterBody">${data.letterBody || relDefaults.letterBody}</textarea>
      </div>

      <!-- Sky Lanterns & Closing Pact -->
      <div class="form-group">
        <label class="form-label">Sky Lantern Wishes (One per line, Act VII)</label>
        <textarea rows="3" class="form-textarea" id="edBdayLanterns">${lanternText}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Closing Pact / Certificate Title</label>
        <input type="text" class="form-input" id="edBdayPactTitle" value="${(data.pactTitle || relDefaults.pactTitle).replace(/"/g, '&quot;')}" />
      </div>
      <div class="form-group">
        <label class="form-label">Closing Pact / Certificate Wording</label>
        <textarea rows="2" class="form-textarea" id="edBdayPactVow">${data.pactVow || relDefaults.pactVow}</textarea>
      </div>
    `;
  } else if (templateId === 'anniversary') {
    const anniPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Our First Sunset Walk 🌅", image: "/images/sunset.jpg", note: "The day I knew I never wanted to let go of your hand." },
      { title: "Always Laughing With You 🫶", image: "/images/always_you.jpg", note: "Every silly joke, every shared smile makes my life a dream." },
      { title: "My Beautiful Forever ✨", image: "/images/pretty.jpg", note: "I fall in love with you all over again every single morning." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">💍 Anniversary Details</div>
      <div class="form-group">
        <label class="form-label">Anniversary Start Date (Together Since)</label>
        <input type="datetime-local" class="form-input" id="edAnniStart" value="${data.anniversaryStartDate ? data.anniversaryStartDate.slice(0, 16) : ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Love Letter to Recipient</label>
        <textarea rows="3" class="form-textarea" id="edAnniLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('anni', 'Cherished Anniversary Moments & Polaroids', anniPols)}
    `;
  } else if (templateId === 'sorry') {
    const sorryPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your laugh so much 🌅", note: "You looked so peaceful here. I promise to always protect your happiness." },
      { image: "/images/always_you.jpg", caption: "You are the brightest light in my world 🫶", note: "Even on my gloomiest days, one smile from you fixes everything." },
      { image: "/images/pretty.jpg", caption: "I never want to see you hurt ever again ✨", note: "You deserve the gentlest, sweetest love in the universe." }
    ];
    const reasonsText = (Array.isArray(data.reasonsToForgive) && data.reasonsToForgive.length > 0)
      ? data.reasonsToForgive.join('\n')
      : [
          "Because our bond is bigger and more precious than any silly mistake.",
          "Because I am genuinely learning and committed to being better for you.",
          "Because life is too short to let misunderstandings steal our joy.",
          "Because your smile is my favorite thing in the universe, and I miss it."
        ].join('\n');
    const promisesText = (Array.isArray(data.promises) && data.promises.length > 0)
      ? data.promises.join('\n')
      : [
          "To listen first and understand before reacting.",
          "To never take your patience and love for granted.",
          "To communicate openly with gentleness and honesty."
        ].join('\n');
    const penancesText = (Array.isArray(data.penances) && data.penances.length > 0)
      ? data.penances.join('\n')
      : [
          "Buy your favorite Iced Boba / Treat right now 🧋",
          "30-minute soothing massage whenever you ask 💆‍♀️",
          "Order whatever food you are craving tonight, my treat 🍕",
          "Watch 3 chick flicks / K-dramas with zero groaning 🍿"
        ].join('\n');
    const treatyText = (Array.isArray(data.treatyClauses) && data.treatyClauses.length > 0)
      ? data.treatyClauses.join('\n')
      : [
          "Party A is officially declared 100% Right in all past, present, and future disputes.",
          "Party B must deliver hugs, forehead kisses, and warm comfort upon demand.",
          "Permanent hoodie and jacket theft rights are granted with zero retaliation.",
          "No going to sleep angry ever again — dessert & comfort come first."
        ].join('\n');
    const creatorImg = data.creatorPhoto || '/images/always_you.jpg';

    specificBox.innerHTML = `
      <div class="section-title">🕊️ Moonlit Sanctuary Apology Customization</div>

      <div class="form-group">
        <label class="form-label">Hero Headline</label>
        <input type="text" class="form-input" id="edSorryHeroTitle" value="${(data.heroTitle || "I'm Really Sorry").replace(/"/g, '&quot;')}" placeholder="e.g. I'm Really Sorry" />
      </div>

      <div class="form-group">
        <label class="form-label">Hero Subtitle</label>
        <input type="text" class="form-input" id="edSorryHeroSub" value="${(data.heroSubtitle || "My world feels heavy and quiet when you are hurt 🥺").replace(/"/g, '&quot;')}" placeholder="Subtitle..." />
      </div>

      <div class="form-group">
        <label class="form-label">Sincere Confession Letter</label>
        <div class="editor-help-text" style="margin-bottom:6px;">Illuminates word-by-word when they unseal the wax envelope:</div>
        <textarea rows="5" class="form-textarea" id="edSorryMsg">${data.apologyMessage || ''}</textarea>
      </div>

      <!-- Vent Room Photo -->
      <div class="sub-card-editor" style="margin-bottom:14px;">
        <div class="bcard-top-row">
          <div class="bcard-thumb-wrap">
            <img src="${creatorImg}" class="bcard-thumb" id="sorryCreatorThumb" onerror="this.src='/images/always_you.jpg'" />
            <label class="btn-thumb-upload" title="Upload Your Photo for Vent Room">
              <i data-lucide="camera"></i>
              <input type="file" id="fileUploadSorryCreator" accept="image/*" style="display:none;" />
            </label>
          </div>
          <div class="bcard-caption-col">
            <span class="bcard-num-badge">🥊 Vent Room Target Photo</span>
            <input type="text" class="form-input" id="edSorryCreatorPhoto" value="${creatorImg.replace(/"/g, '&quot;')}" placeholder="Your photo URL for the Vent Room" />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Why Us / Reasons to Forgive (1 per line)</label>
        <textarea rows="4" class="form-textarea" id="edSorryReasons">${reasonsText}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">My Sacred Promises (1 per line)</label>
        <textarea rows="3" class="form-textarea" id="edSorryPromises">${promisesText}</textarea>
      </div>

      <div class="editor-grid-2">
        <div class="form-group">
          <label class="form-label">Claimable Penances (1 per line)</label>
          <textarea rows="4" class="form-textarea" id="edSorryPenances">${penancesText}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Peace Treaty Clauses (1 per line)</label>
          <textarea rows="4" class="form-textarea" id="edSorryTreaty">${treatyText}</textarea>
        </div>
      </div>

      <!-- Memory Polaroids -->
      <div style="margin-top:16px;">
        <label class="form-label" style="font-weight:700; color:var(--primary);">📸 Cherished Reconciliation Memories:</label>
        <div class="editor-help-text" style="margin-bottom:8px;">Interactive 3D flip polaroids with secret back notes:</div>
        <div id="sorryPolsList">
          ${sorryPols.map((p, i) => `
            <div class="sub-card-editor sorry-pol-row" data-i="${i}">
              <div class="bcard-top-row">
                <div class="bcard-thumb-wrap">
                  <img src="${p.image}" class="bcard-thumb" id="sorryPolThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                  <label class="btn-thumb-upload" title="Upload Photo">
                    <i data-lucide="camera"></i>
                    <input type="file" class="file-upload-sorry-photo" data-i="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
                <div class="bcard-caption-col">
                  <span class="bcard-num-badge">📸 Memory #${i+1}</span>
                  <input type="text" class="form-input sorry-pol-cap" data-i="${i}" value="${(p.caption || '').replace(/"/g, '&quot;')}" placeholder="Front Caption (e.g. Our favorite sunset walk)" />
                </div>
              </div>
              <input type="text" class="form-input sorry-pol-note" data-i="${i}" style="margin-top:6px;" value="${(p.note || '').replace(/"/g, '&quot;')}" placeholder="Secret Note on Back of Polaroid" />
              <input type="text" class="form-input sorry-pol-img" data-i="${i}" style="margin-top:6px;" value="${(p.image || '').replace(/"/g, '&quot;')}" placeholder="Image URL (or tap camera to upload)" />
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Creator Face Photo upload listener for Vent Room
    const creatorInput = specificBox.querySelector('#fileUploadSorryCreator');
    creatorInput?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const res = await uploadFile(file);
      if (res.success && res.url) {
        const imgInput = specificBox.querySelector('#edSorryCreatorPhoto');
        const thumb = specificBox.querySelector('#sorryCreatorThumb');
        if (imgInput) imgInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      }
    });

    // File upload listeners for sorry photos
    specificBox.querySelectorAll('.file-upload-sorry-photo').forEach(input => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const i = input.getAttribute('data-i');
        const res = await uploadFile(file);
        if (res.success && res.url) {
          const imgInput = specificBox.querySelector(`.sorry-pol-img[data-i="${i}"]`);
          const thumb = specificBox.querySelector(`#sorryPolThumb_${i}`);
          if (imgInput) imgInput.value = res.url;
          if (thumb) thumb.src = res.url;
          emitChange();
        }
      });
    });
  } else if (templateId === 'our_museum') {
    const museumPhotos = (data.photos && data.photos.length > 0) ? data.photos : (data.polaroids && data.polaroids.length > 0 ? data.polaroids.map((p, i) => ({
      id: i + 1,
      image: p.image,
      title: p.caption || p.title || `Exhibit #${i + 1}`,
      date: p.date || 'Curated Moment',
      desc: p.note || ''
    })) : [
      { id: 1, image: "/images/sunset.jpg", title: "The Golden Spark", date: "The Day We Met", desc: "The exact moment our paths crossed. Every ordinary thing became magical." },
      { id: 2, image: "/images/always_you.jpg", title: "Unstoppable Laughter", date: "Summer Afternoon", desc: "Laughing until our stomachs ached over silly inside jokes." },
      { id: 3, image: "/images/pretty.jpg", title: "Quiet Sanctuary", date: "Late Night Talks", desc: "Sitting under the city lights, talking about childhood dreams until 3 AM." },
      { id: 4, image: "/images/dream_girl.jpg", title: "Breathtaking Grace", date: "An Unforgettable Evening", desc: "In a room full of people, my eyes only ever search for you." },
      { id: 5, image: "/images/vogue_cover.jpg", title: "High Fashion & Adventure", date: "Our Roadtrip", desc: "Singing along at the top of our lungs with the windows down." },
      { id: 6, image: "/images/queen.jpg", title: "My Eternal Muse", date: "Forever & Always", desc: "You are not just a chapter in my story — you are the entire book." }
    ]);

    specificBox.innerHTML = `
      <div class="section-title">🏛️ 3D Virtual Museum & Gallery Setup</div>
      <div class="editor-help-text" style="margin-bottom:14px;">
        Giftvera-style 3D walkthrough art gallery with entrance brass dedication plaque, spotlighted gold frames, and centerpiece cinema proposal.
      </div>

      <!-- 1. Entrance Brass Plaque -->
      <div style="background:rgba(197,160,89,0.08); border:1.5px solid rgba(197,160,89,0.25); border-radius:12px; padding:14px; margin-bottom:16px;">
        <div style="font-weight:800; font-size:13px; color:#d4af37; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>🏛️ Entrance Brass Dedication Plaque</span>
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Museum Exhibition Title</label>
          <input type="text" class="form-input" id="edMuseumTitle" value="${data.museumTitle || 'The Museum of Us'}" placeholder="e.g. The Museum of Us" />
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Dedication Subtitle</label>
          <input type="text" class="form-input" id="edMuseumSubtitle" value="${data.museumSubtitle || `Dedicated to ${data.recipientName || 'My Beloved'}`}" placeholder="e.g. Dedicated to My One & Only" />
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Dedication Plaque Message</label>
          <textarea rows="3" class="form-textarea" id="edMuseumDedication" placeholder="Heartfelt dedication etched onto the brass entrance plaque...">${data.museumDedication || 'A curated exhibition of our smiles, quiet nights, and an eternal love that words could never hold.'}</textarea>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Establishment Tag / Date</label>
          <input type="text" class="form-input" id="edEstablishmentDate" value="${data.establishmentDate || 'Est. November 2026'}" placeholder="e.g. Est. November 2026" />
        </div>
      </div>

      <!-- 2. Grand Centerpiece & Proposal Screen -->
      <div style="background:rgba(212,35,92,0.08); border:1.5px solid rgba(212,35,92,0.25); border-radius:12px; padding:14px; margin-bottom:16px;">
        <div style="font-weight:800; font-size:13px; color:#f472b6; margin-bottom:10px; display:flex; align-items:center; gap:6px;">
          <span>🎬 Grand Centerpiece & Cinema Proposal Screen</span>
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Proposal / Big Question</label>
          <input type="text" class="form-input" id="edMuseumQuestion" value="${data.proposalQuestion || 'Will you walk through every chapter of life with me?'}" placeholder="e.g. Will you marry me? / Will you be mine forever?" />
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Proposal Subtitle / Love Note</label>
          <textarea rows="2" class="form-textarea" id="edMuseumQuestionSub" placeholder="Heartfelt explanation...">${data.proposalSubtitle || 'Every single day with you is my greatest adventure. Will you be mine forever?'}</textarea>
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Yes Button Label</label>
          <input type="text" class="form-input" id="edMuseumYesBtn" value="${data.proposalYesBtn || 'Yes, Forever & Always! 💍💖'}" />
        </div>
        <div class="form-group" style="margin-bottom:10px;">
          <label class="form-label">Centerpiece Artwork Title</label>
          <input type="text" class="form-input" id="edCenterpieceTitle" value="${data.centerpieceTitle || 'The Masterpiece: You & Me'}" />
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Centerpiece Image (Cinema Focal Screen)</label>
          <div style="display:flex; gap:10px; align-items:center;">
            <img src="${data.centerpieceImage || '/images/queen.jpg'}" id="museumCpThumb" style="width:52px; height:52px; border-radius:8px; object-fit:cover; border:1px solid #d4af37;" />
            <input type="text" class="form-input" id="edCenterpieceImage" value="${data.centerpieceImage || '/images/queen.jpg'}" style="flex:1;" />
            <label class="btn-file-upload-sm" title="Upload Centerpiece Photo" style="cursor:pointer; background:rgba(212,35,92,0.15); border:1px solid #d4235c; color:#f472b6; border-radius:8px; padding:8px 12px; display:inline-flex; align-items:center; gap:4px; position:relative; flex-shrink:0;">
              <i data-lucide="camera"></i>
              <input type="file" id="fileUploadMuseumCenterpiece" accept="image/*" style="display:none;" />
            </label>
          </div>
        </div>

        <div class="form-group" style="margin-top:14px; margin-bottom:0; border-top:1px dashed rgba(212,175,55,0.3); padding-top:14px;">
          <label class="form-label" style="display:flex; justify-content:space-between; align-items:center;">
            <span>🎬 Cinema Memory Video (Plays when sitting together)</span>
            <span style="font-size:11px; color:#f472b6; font-weight:700;">MP4 / WebM</span>
          </label>
          <div style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
            <input type="text" class="form-input" id="edCenterpieceVideo" value="${data.centerpieceVideo || '/video/couple_memories.mp4'}" placeholder="/video/couple_memories.mp4 or direct MP4 URL" style="flex:1;" />
            <label class="btn-file-upload-sm" id="btnUploadMuseumVideoLabel" title="Upload MP4 Video" style="cursor:pointer; background:linear-gradient(135deg, rgba(212,35,92,0.25), rgba(197,160,89,0.25)); border:1.5px solid #d4af37; color:#f5e6ca; border-radius:8px; padding:8px 12px; display:inline-flex; align-items:center; gap:6px; position:relative; flex-shrink:0; font-size:12px; font-weight:700;">
              <i data-lucide="film"></i> <span id="museumVideoBtnText">Upload MP4</span>
              <input type="file" id="fileUploadMuseumVideo" accept="video/mp4,video/webm,video/*" style="display:none;" />
            </label>
          </div>
          <div id="museumVideoUploadProgress" style="display:none; font-size:11px; color:#d4af37; font-weight:700; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
            <span id="museumVideoUploadProgressText">Uploading: 0%</span>
          </div>
          <div id="museumVideoPreviewBox" style="position:relative; width:100%; border-radius:8px; overflow:hidden; background:#0a0808; border:1px solid rgba(212,175,55,0.3);">
            <video id="museumVideoPreview" src="${data.centerpieceVideo || '/video/couple_memories.mp4'}" controls style="width:100%; max-height:160px; display:block; object-fit:contain; background:#000;"></video>
          </div>
          <div style="font-size:11px; color:#94a3b8; margin-top:6px; display:flex; align-items:center; gap:4px;">
            <i data-lucide="sparkles" style="width:12px; height:12px; color:#d4af37;"></i>
            <span>This video screens on the grand cinema rotunda wall automatically when both lovers sit together on the gallery bench.</span>
          </div>
        </div>
      </div>

      <!-- 3. Curated Gallery Artworks -->
      <div style="font-weight:700; font-size:13px; color:#d4af37; margin: 18px 0 8px; display:flex; align-items:center; justify-content:space-between;">
        <span>🖼️ Curated Exhibition Artworks (Frames on Left & Right):</span>
        <span style="font-size:11px; color:#94a3b8;">${museumPhotos.length} Artwork${museumPhotos.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="editor-help-text" style="margin-bottom:10px;">
        Photos will be hung in 3D gold frames along the museum corridor with individual spotlights and brass nameplates:
      </div>

      <div id="museumArtworksList">
        ${museumPhotos.map((p, i) => `
          <div class="sub-card-editor museum-photo-row" data-i="${i}" style="background:rgba(20,16,14,0.6); border:1px solid rgba(212,175,55,0.2); border-radius:12px; padding:12px; margin-bottom:12px;">
            <div class="bcard-top-row" style="display:flex; gap:10px; align-items:center; margin-bottom:8px;">
              <div class="bcard-drag-handle" title="Drag to reorder" style="cursor:grab; color:#94a3b8;"><i data-lucide="grip-vertical"></i></div>
              <div class="bcard-thumb-wrap" style="position:relative; width:52px; height:52px;">
                <img src="${p.image}" class="bcard-thumb" id="museumThumb_${i}" onerror="this.src='/images/sunset.jpg'" style="width:52px; height:52px; border-radius:8px; object-fit:cover; border:1px solid #d4af37;" />
                <label class="btn-museum-cam-badge" title="Upload Photo" style="position:absolute; bottom:-4px; right:-4px; top:auto; left:auto; background:#111; color:#d4af37; border-radius:50%; width:22px; height:22px; display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:10px; border:1px solid #d4af37; z-index:3;">
                  <i data-lucide="camera" style="width:12px; height:12px;"></i>
                  <input type="file" class="file-upload-museum-photo" data-i="${i}" accept="image/*" style="display:none;" />
                </label>
              </div>
              <div class="bcard-caption-col" style="flex:1;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span class="bcard-num-badge" style="font-size:11px; font-weight:800; color:#d4af37;">🖼️ EXHIBIT #${i+1}</span>
                  <button type="button" class="btn-del-museum-photo" data-i="${i}" title="Remove artwork" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#f87171; border-radius:6px; padding:2px 8px; font-size:11px; cursor:pointer;">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
                <input type="text" class="form-input museum-photo-title" data-i="${i}" value="${p.title || ''}" placeholder="Artwork Title (e.g. The Golden Spark)" />
              </div>
            </div>
            
            <div class="bcard-presets-chips" style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="preset-chip-label" style="font-size:11px; color:#94a3b8; align-self:center;">Quick Pick:</span>
              <button type="button" class="btn-quick-museum-preset" data-i="${i}" data-src="/images/sunset.jpg">Sunset</button>
              <button type="button" class="btn-quick-museum-preset" data-i="${i}" data-src="/images/always_you.jpg">Always You</button>
              <button type="button" class="btn-quick-museum-preset" data-i="${i}" data-src="/images/pretty.jpg">Pretty</button>
              <button type="button" class="btn-quick-museum-preset" data-i="${i}" data-src="/images/dream_girl.jpg">Dream Girl</button>
              <button type="button" class="btn-quick-museum-preset" data-i="${i}" data-src="/images/queen.jpg">Queen</button>
            </div>

            <div style="display:flex; gap:8px; margin-bottom:6px;">
              <input type="text" class="form-input museum-photo-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera icon)" style="flex:2;" />
              <input type="text" class="form-input museum-photo-date" data-i="${i}" value="${p.date || ''}" placeholder="Date / Tag (e.g. Summer 2023)" style="flex:1;" />
            </div>
            <textarea rows="2" class="form-textarea museum-photo-desc" data-i="${i}" placeholder="Curatorial Memory Note (shown when inspected in 3D)...">${p.desc || ''}</textarea>
          </div>
        `).join('')}
      </div>

      <button type="button" class="btn-add-museum-photo" id="btnAddMuseumPhoto" style="margin-top:8px; width:100%; background:rgba(197,160,89,0.15); border:1.5px dashed #c5a059; color:#f5e6ca; padding:10px 14px; border-radius:10px; font-size:13px; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px;">
        <i data-lucide="plus-circle"></i> Add Exhibition Artwork
      </button>
    `;

    // Centerpiece photo upload
    const cpUpload = specificBox.querySelector('#fileUploadMuseumCenterpiece');
    cpUpload?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const res = await uploadFile(file);
      if (res.success && res.url) {
        const cpImg = specificBox.querySelector('#edCenterpieceImage');
        const cpThumb = specificBox.querySelector('#museumCpThumb');
        if (cpImg) cpImg.value = res.url;
        if (cpThumb) cpThumb.src = res.url;
        emitChange();
      }
    });

    // Centerpiece couple video upload & change listeners
    const videoUpload = specificBox.querySelector('#fileUploadMuseumVideo');
    const edVideoInput = specificBox.querySelector('#edCenterpieceVideo');
    const videoPreview = specificBox.querySelector('#museumVideoPreview');
    const videoBtnText = specificBox.querySelector('#museumVideoBtnText');
    const videoProgressBox = specificBox.querySelector('#museumVideoUploadProgress');
    const videoProgressText = specificBox.querySelector('#museumVideoUploadProgressText');

    videoUpload?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 1. Instant local preview
      try {
        const instantUrl = URL.createObjectURL(file);
        if (videoPreview) {
          videoPreview.src = instantUrl;
          videoPreview.load();
        }
        if (edVideoInput) edVideoInput.value = instantUrl;
      } catch {}

      if (videoProgressBox) videoProgressBox.style.display = 'flex';
      if (videoProgressText) videoProgressText.textContent = 'Uploading: 0%...';
      if (videoBtnText) videoBtnText.textContent = 'Uploading...';

      const res = await uploadFile(file, (pct) => {
        if (videoProgressText) videoProgressText.textContent = `Uploading: ${pct}%...`;
      });

      if (res && res.success && res.url) {
        if (edVideoInput) edVideoInput.value = res.url;
        if (videoPreview) {
          videoPreview.src = res.url;
          videoPreview.load();
        }
        if (videoProgressText) {
          videoProgressText.textContent = '✓ Video uploaded successfully!';
          videoProgressText.style.color = '#34d399';
        }
        if (videoBtnText) videoBtnText.textContent = 'Change MP4';
        emitChange();
      } else {
        if (videoProgressText) {
          videoProgressText.textContent = res?.error || 'Upload error. Video saved locally.';
          videoProgressText.style.color = '#f87171';
        }
        if (videoBtnText) videoBtnText.textContent = 'Retry Upload';
        emitChange();
      }
    });

    edVideoInput?.addEventListener('input', () => {
      if (videoPreview) {
        videoPreview.src = edVideoInput.value;
        videoPreview.load();
      }
      emitChange();
    });

    // Artworks list upload listeners
    specificBox.querySelectorAll('.file-upload-museum-photo').forEach(inp => {
      inp.addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const i = inp.getAttribute('data-i');
        const res = await uploadFile(file);
        if (res.success && res.url) {
          const imgInput = specificBox.querySelector(`.museum-photo-img[data-i="${i}"]`);
          const thumb = specificBox.querySelector(`#museumThumb_${i}`);
          if (imgInput) imgInput.value = res.url;
          if (thumb) thumb.src = res.url;
          emitChange();
        }
      });
    });

    // Preset chips
    specificBox.querySelectorAll('.btn-quick-museum-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const i = btn.getAttribute('data-i');
        const src = btn.getAttribute('data-src');
        const imgInput = specificBox.querySelector(`.museum-photo-img[data-i="${i}"]`);
        const thumb = specificBox.querySelector(`#museumThumb_${i}`);
        if (imgInput) imgInput.value = src;
        if (thumb) thumb.src = src;
        emitChange();
      });
    });

    // Delete photo
    specificBox.querySelectorAll('.btn-del-museum-photo').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-i'), 10);
        const rows = specificBox.querySelectorAll('.museum-photo-row');
        const currentPhotos = Array.from(rows).map((row, i) => ({
          id: i + 1,
          image: row.querySelector('.museum-photo-img')?.value || '/images/sunset.jpg',
          title: row.querySelector('.museum-photo-title')?.value || `Exhibit #${i + 1}`,
          date: row.querySelector('.museum-photo-date')?.value || '',
          desc: row.querySelector('.museum-photo-desc')?.value || ''
        }));
        currentPhotos.splice(idx, 1);
        data.photos = currentPhotos;
        data.polaroids = currentPhotos.map(p => ({ image: p.image, caption: p.title, date: p.date, note: p.desc }));
        renderVisualEditor(container, templateId, data, onChange);
        emitChange();
      });
    });

    // Add photo
    const btnAddMuseumPhoto = specificBox.querySelector('#btnAddMuseumPhoto');
    btnAddMuseumPhoto?.addEventListener('click', () => {
      const rows = specificBox.querySelectorAll('.museum-photo-row');
      const currentPhotos = Array.from(rows).map((row, i) => ({
        id: i + 1,
        image: row.querySelector('.museum-photo-img')?.value || '/images/sunset.jpg',
        title: row.querySelector('.museum-photo-title')?.value || `Exhibit #${i + 1}`,
        date: row.querySelector('.museum-photo-date')?.value || '',
        desc: row.querySelector('.museum-photo-desc')?.value || ''
      }));
      currentPhotos.push({
        id: currentPhotos.length + 1,
        image: '/images/sunset.jpg',
        title: 'New Exhibition Artwork',
        date: 'Precious Memory',
        desc: 'A golden memory preserved forever in our museum.'
      });
      data.photos = currentPhotos;
      data.polaroids = currentPhotos.map(p => ({ image: p.image, caption: p.title, date: p.date, note: p.desc }));
      renderVisualEditor(container, templateId, data, onChange);
      emitChange();
    });

  } else if (templateId === 'valentine') {
    const valPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "That Unforgettable Smile ✨", image: "/images/pretty.jpg", note: "The very first time you looked at me and smiled, my heart decided right then." },
      { title: "Our Favorite Adventures 🌅", image: "/images/sunset.jpg", note: "Every moment with you feels like a beautiful dream I never want to wake up from." },
      { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "The kindest, most radiant soul. I am truly the luckiest person in the world." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">💖 Valentine Proposal Details</div>
      <div class="form-group">
        <label class="form-label">Proposal Question</label>
        <input type="text" class="form-input" id="edValQuestion" value="${data.proposalQuestion || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Wax-Sealed Love Letter</label>
        <textarea rows="3" class="form-textarea" id="edValLetter">${data.loveLetter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('val', 'Valentine Cherished Polaroids', valPols)}
    `;
  } else if (templateId === 'friendship') {
    const bffPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Partners In Crime 👯", image: "/images/sunset.jpg", note: "Late night drives, endless food runs, and gossip sessions." },
      { title: "Unstoppable Duo ⚡", image: "/images/always_you.jpg", note: "Through thick and thin, no one gets me like you do!" },
      { title: "Legendary Memories 📸", image: "/images/dream_girl.jpg", note: "A toast to 100 more years of crazy adventures together!" }
    ];

    specificBox.innerHTML = `
      <div class="section-title">👯 Friendship Details</div>
      <div class="form-group">
        <label class="form-label">Certificate Award Reason</label>
        <textarea rows="2" class="form-textarea" id="edBffReason">${data.awardReason || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('bff', 'Bestie Hall of Fame Polaroids', bffPols)}
    `;
  } else if (templateId === 'mother') {
    const momPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Her Gentle Smile 🌸", image: "/images/beautiful.jpg", note: "The warmth and peace that has always been my safe place." },
      { title: "Unconditional Support 🫶", image: "/images/always_you.jpg", note: "No matter how tough life gets, knowing you are praying for me gives me strength." },
      { title: "Forever My Queen 👑", image: "/images/queen.jpg", note: "A mother like no other, radiant, loving, and truly unforgettable." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🌸 Mother Special (Maa) Details</div>
      <div class="form-group">
        <label class="form-label">Heartfelt Letter to Maa</label>
        <textarea rows="5" class="form-textarea" id="edMomLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('mom', 'Cherished Memories With Maa', momPols)}
    `;
  } else if (templateId === 'father') {
    const dadPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Quiet Strength 🛡️", image: "/images/sunset.jpg", note: "Working through sleepless days so our future would shine bright." },
      { title: "Life's Compass 🧭", image: "/images/always_you.jpg", note: "Teaching us integrity, honor, and how to stand tall in any storm." },
      { title: "My First Hero 🌟", image: "/images/dream_girl.jpg", note: "No cape, no armor, just a father who gave us everything." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🌟 Father Special (Papa) Details</div>
      <div class="form-group">
        <label class="form-label">Letter of Gratitude & Honor to Papa</label>
        <textarea rows="5" class="form-textarea" id="edDadLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('dad', 'Memories With Papa', dadPols)}
    `;
  } else if (templateId === 'sister') {
    const sisPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Partner in Crime 💅", image: "/images/pretty.jpg", note: "From raiding each other's wardrobes to keeping the deepest secrets safe." },
      { title: "Chaos & Blackmail 📸", image: "/images/always_you.jpg", note: "Photos that could ruin each other's reputation, kept as supreme leverage! 😂" },
      { title: "Forever Bestie 💖", image: "/images/beautiful.jpg", note: "No matter how loud our fights get, you are the first person I run to." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">💅 Sister Special (Behna) Details</div>
      <div class="form-group">
        <label class="form-label">Letter to My Crazy Sister</label>
        <textarea rows="5" class="form-textarea" id="edSisLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('sis', 'Sister Memories & Blackmail Polaroids', sisPols)}
    `;
  } else if (templateId === 'brother') {
    const broPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Chaos & Adventures 🚗", image: "/images/sunset.jpg", note: "Late night drives, wild plans that almost got us into trouble, and countless memories." },
      { title: "Gaming Battles 🎮", image: "/images/vogue_cover.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
      { title: "Brothers for Life 🤜🤛", image: "/images/sunset.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
    ];

    const defaultClauses = [
      { id: 1, title: "Clause 1: Never Snitch to Mom 🤐", text: "What happens in the sibling chaos stays strictly in the sibling chaos. Zero exceptions under parent interrogation." },
      { id: 2, title: "Clause 2: The Sacred Last Slice Rule 🍕", text: "You must always loudly ask 'Anyone want this?' while already taking a huge bite out of it." },
      { id: 3, title: "Clause 3: TV Controller & Shotgun Privilege 🎮", text: "He who shouts 'SHOTGUN' or grabs the player 1 controller first owns the sovereign rights forever." },
      { id: 4, title: "Clause 4: 2 AM Bailout Guarantee 🚗", text: "No questions asked. If your brother calls at 2 AM stranded with a flat tire or bad date, you pull up immediately." },
      { id: 5, title: "Clause 5: Instant Defense in Public 🛡️", text: "We might roast and tackle each other at home, but if anyone from the outside touches a hair on you, they answer to me." }
    ];
    const broClauses = Array.isArray(data.broCodeClauses) ? data.broCodeClauses : defaultClauses;

    specificBox.innerHTML = `
      <div class="section-title">🤜🤛 Brother Special (Bhai) Details</div>
      <div class="form-group">
        <label class="form-label">Letter to My Brother in Chaos</label>
        <textarea rows="5" class="form-textarea" id="edBroLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('bro', 'Brotherhood Hall of Fame Polaroids', broPols)}
      ${renderBroClausesBlock(broClauses)}
    `;
  } else if (templateId === 'bloom_reveal') {
    const bloomPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Sweet Beginning 🌸", image: "/bloom/p1.png", note: "Where our journey quietly began, full of tender smiles." },
      { title: "Pure Joy ✨", image: "/bloom/p2.png", note: "Sunlight and carefree laughs that stay with me forever." },
      { title: "Quiet Moments ☕", image: "/bloom/p3.png", note: "Just peaceful afternoons together lost in time." },
      { title: "Golden Hour 🌅", image: "/bloom/p4.png", note: "The warm sky that couldn't compare to your radiance." },
      { title: "Holding Hands 💫", image: "/bloom/p5.png", note: "Finding home in the gentle warmth of your hand." },
      { title: "Little Surprises 🎁", image: "/bloom/p6.png", note: "Every sweet memory we built step by step." },
      { title: "Endless Laughter 🫶", image: "/bloom/p7.png", note: "Unfiltered giggles that erase every worry." },
      { title: "Dreaming Big 🌙", image: "/bloom/p8.png", note: "Talking for hours under late night stars." },
      { title: "Always Beside You 🕊️", image: "/bloom/p9.png", note: "Through sunny days and stormy seasons." },
      { title: "Forever & Ever 👑", image: "/bloom/p10.png", note: "My whole heart belongs entirely to you." }
    ];

    const reasons = (data.reasonsList && data.reasonsList.length > 0) ? data.reasonsList : [
      { title: "Your Virtual Good Morning Smiles", body: "Waking up to your sleepy face on our morning video calls instantly brightens my entire day." },
      { title: "The Way You Laugh at My Bad Jokes", body: "I know my sense of humor can be terrible, but you always let out the most genuine, joyful laugh anyway." },
      { title: "Your Unwavering Support", body: "Whenever I feel overwhelmed by a busy week, you always know exactly the right words to encourage me." }
    ];

    const spotifyTracks = (data.spotifyTracks && data.spotifyTracks.length > 0) ? data.spotifyTracks.join(', ') : '6Qyc6fS4DsZjB2mRW9DsQs, 7sapKrjDij2fpDVj0GxP66, 3vsNteZn6E5qBSSBO78W7b, 1EzrEOXmMH3G43AXT1y7pA, 1JSTJqkT5qHq8MDJnJbRE1';

    specificBox.innerHTML = `
      <div class="section-title">🌸 Bloom Reveal Surprise Settings</div>
      
      <!-- Bloom PIN & Gate Settings -->
      <div style="background:rgba(54,15,90,0.08); border:1px solid rgba(54,15,90,0.2); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:var(--primary); font-size:14px; font-weight:700; margin-bottom:8px;">🔐 4-Digit Secret Reveal PIN</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Recipient PIN Code (4 Digits)</label>
            <input type="text" maxlength="4" class="form-input" id="edBloomPin" value="${data.bloomPin || '0000'}" placeholder="0000" style="font-size:18px; font-weight:700; letter-spacing:4px;" />
            <div class="editor-help-text">The recipient enters this PIN on the tactile keypad to trigger the 88-flower vortex reveal!</div>
          </div>
          <div class="form-group">
            <label class="form-label">Gate Greeting Title</label>
            <input type="text" class="form-input" id="edBloomGreeting" value="${data.gateGreeting || 'Hi, beautiful'}" placeholder="e.g. Hi, beautiful" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Gate Subtitle / Prompt</label>
          <input type="text" class="form-input" id="edBloomSubtitle" value="${data.gateSubtitle || 'Enter the correct password to see your surprise :)'}" />
        </div>
      </div>

      <!-- Section 1: Reasons Accordion -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:var(--primary); font-size:14px; font-weight:700; margin-bottom:8px;">💖 Section 1: Reasons Accordion</h4>
        <div class="form-group">
          <label class="form-label">Accordion Section Title</label>
          <input type="text" class="form-input" id="edBloomReasonsTitle" value="${data.reasonsTitle || '10 things I love about you'}" />
        </div>
        <div id="bloomReasonsListContainer">
          ${reasons.map((r, i) => `
            <div class="sub-card-editor bloom-reason-edit-row" data-i="${i}" style="margin-bottom:10px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:var(--primary); font-size:12px;">Reason #${i + 1}</strong>
                ${reasons.length > 1 ? `<button type="button" class="btn-remove-bloom-reason" data-i="${i}" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:11px;">✕ Remove</button>` : ''}
              </div>
              <div class="form-group" style="margin-bottom:6px;">
                <label class="form-label" style="font-size:11px;">Title</label>
                <input type="text" class="form-input bloom-reason-input-title" data-i="${i}" value="${r.title || ''}" placeholder="e.g. Your Virtual Good Morning Smiles" />
              </div>
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:11px;">Body / Explanation</label>
                <textarea rows="2" class="form-textarea bloom-reason-input-body" data-i="${i}" placeholder="Why you love this...">${r.body || ''}</textarea>
              </div>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn-action-outline" id="btnAddBloomReason" style="margin-top:6px; width:100%;">+ Add Another Reason</button>
      </div>

      <!-- Section 2: Polaroid Photos -->
      <div style="margin-bottom:18px;">
        ${renderGenPolaroidsBlock('bloom', 'Bloom Cherished Memories (10 Polaroids)', bloomPols)}
      </div>

      <!-- Section 3: Parchment Love Letter -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:var(--primary); font-size:14px; font-weight:700; margin-bottom:8px;">📜 Section 3: Scroll-Illuminated Parchment Letter</h4>
        <div class="form-group">
          <label class="form-label">Letter Salutation</label>
          <input type="text" class="form-input" id="edBloomLetterTitle" value="${data.letterTitle || 'My Dearest,'}" />
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Heartfelt Letter (Words light up dynamically as the reader scrolls!)</label>
          <textarea rows="7" class="form-textarea" id="edBloomLetterText">${data.letterText || ''}</textarea>
        </div>
      </div>

      <!-- Section 4: Spotify Songs -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:var(--primary); font-size:14px; font-weight:700; margin-bottom:8px;">🎵 Section 4: Our Top Songs (Spotify Embeds)</h4>
        <div class="form-group">
          <label class="form-label">Section Heading</label>
          <input type="text" class="form-input" id="edBloomSongsTitle" value="${data.songsTitle || 'Our Top Songs'}" />
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Spotify Track IDs (comma separated)</label>
          <input type="text" class="form-input" id="edBloomSpotifyTracks" value="${spotifyTracks}" placeholder="6Qyc6fS4DsZjB2mRW9DsQs, 7sapKrjDij2fpDVj0GxP66..." />
          <div class="editor-help-text">Paste Spotify track IDs separated by commas.</div>
        </div>
      </div>

      <!-- Section 5: Devotion Finale -->
      <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.1); border-radius:12px; padding:16px;">
        <h4 style="color:var(--primary); font-size:14px; font-weight:700; margin-bottom:8px;">🌙 Section 5: Typewriter Devotion Finale</h4>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Typewriter Ending Quote</label>
          <input type="text" class="form-input" id="edBloomEndingQuote" value="${data.endingQuote || 'I love you, to the moon and back.'}" />
        </div>
      </div>
    `;
  } else if (templateId === 'birthday_paigaam' || templateId === 'paigaam') {
    const paigaamPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids.map(p => ({
      title: p.caption || p.title || '',
      image: p.image || '/paigaam/bp-memory-1.jpg',
      note: p.note || ''
    })) : [
      { title: "sunset ice-creams 🍦", image: "/paigaam/bp-memory-1.jpg", note: "You stole a bite of mine and pretended you didn’t." },
      { title: "our cafe ☕", image: "/paigaam/bp-memory-2.jpg", note: "Same table, same order, every single time." },
      { title: "rain walk ☔", image: "/paigaam/bp-memory-3.jpg", note: "Best soggy shoes of my life." },
      { title: "the road trip!", image: "/paigaam/bp-memory-4.jpg", note: "Singing at the top of our lungs off-key." },
      { title: "picnic day 🌸", image: "/paigaam/bp-memory-5.jpg", note: "Sandwiches, sunshine, and your giggles." },
      { title: "movie night", image: "/paigaam/bp-memory-6.jpg", note: "You fell asleep 10 minutes in. A record." }
    ];

    const loveNotes = (data.loveNotes && data.loveNotes.length > 0) ? data.loveNotes.join('\n') : [
      "Your laugh (especially the snort)",
      "How you remember the tiny things",
      "Your terrible-but-perfect dance moves",
      "The way you make everyone feel at home",
      "Your 2am thoughts",
      "How brave you are, even when you’re scared"
    ].join('\n');

    const reasons = (data.reasonsList && data.reasonsList.length > 0) ? data.reasonsList.map(r => typeof r === 'object' ? (r.title || r.body) : r).join('\n') : (data.reasons && data.reasons.length > 0 ? data.reasons.join('\n') : [
      "You make ordinary days feel like little adventures.",
      "You are kind even when nobody is watching.",
      "You turn my bad days around without even trying.",
      "You are the first person I want to tell everything.",
      "The world is softer with you in it."
    ].join('\n'));

    const noMsgs = (data.noMessages && data.noMessages.length > 0) ? data.noMessages.join('\n') : [
      "How dare you click NO!",
      "Excuse me?? Try that again 😤",
      "Wrong button, birthday star 🙄",
      "I’m telling everyone you said no 😭",
      "My heart just did a tiny crack 💔",
      "The YES button is getting lonely…",
      "Okay now you’re just being silly 🙈",
      "Fine. NO is officially out of order."
    ].join('\n');

    specificBox.innerHTML = `
      <div class="section-title">💌 Birthday Paigaam Experience Settings</div>
      
      <!-- 1. Passcode & Cameo Photo -->
      <div style="background:rgba(194,24,91,0.08); border:1px solid rgba(194,24,91,0.2); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#C2185B; font-size:14px; font-weight:700; margin-bottom:8px;">🔐 Screen 1: Passcode & Cameo Frame</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">4-Digit Passcode</label>
            <input type="text" maxlength="4" class="form-input" id="edPaigaamPasscode" value="${data.passcode || '1234'}" placeholder="1234" style="font-size:18px; font-weight:700; letter-spacing:4px;" />
          </div>
          <div class="form-group">
            <label class="form-label">Passcode Hint</label>
            <input type="text" class="form-input" id="edPaigaamPasscodeHint" value="${data.passcodeHint || 'Psst… it’s 1 2 3 4'}" placeholder="Psst… it’s 1 2 3 4" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Cameo Photo URL</label>
          <input type="text" class="form-input" id="edPaigaamCameoImage" value="${data.cameoImage || data.recipientPhoto || '/paigaam/bp-share.jpg'}" placeholder="Image URL (or /paigaam/bp-share.jpg)" />
        </div>
      </div>

      <!-- 2. Mascot & Playful Question -->
      <div style="background:rgba(255,193,7,0.08); border:1px solid rgba(255,193,7,0.25); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#b45309; font-size:14px; font-weight:700; margin-bottom:8px;">🐰 Screen 2: Mascot Question & Escaping NO Button</h4>
        <div class="form-group">
          <label class="form-label">Question Text</label>
          <input type="text" class="form-input" id="edPaigaamQuestion" value="${data.questionPrompt || 'I have a little surprise for you. Wanna see it?'}" />
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">NO Button Funny Escalations (One per line)</label>
          <textarea rows="4" class="form-textarea" id="edPaigaamNoMessages">${noMsgs}</textarea>
        </div>
      </div>

      <!-- 3. Wax-Sealed Unfolding Love Letter -->
      <div style="background:rgba(238,157,180,0.12); border:1px solid rgba(238,157,180,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#C2185B; font-size:14px; font-weight:700; margin-bottom:8px;">✉️ Screen 3: Wax-Sealed Unfolding Letter</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Salutation</label>
            <input type="text" class="form-input" id="edPaigaamLetterSalutation" value="${data.letterSalutation || 'Dear ' + (data.recipientName || 'Meher') + ','}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sign-Off</label>
            <input type="text" class="form-input" id="edPaigaamLetterSignoff" value="${data.letterSignoff || 'Forever yours,'}" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Letter Body (Separate paragraphs with double Enter)</label>
          <textarea rows="6" class="form-textarea" id="edPaigaamLetterText">${data.letterText || 'Happy birthday, my favourite human.\n\nI wanted to give you something you can open again and again — so I made you this little corner of the internet, full of us.\n\nThank you for the laughs that make my stomach hurt, the late-night talks, and for being exactly, wonderfully you. I hope this year is soft on you, and full of everything you wish for.\n\nNow keep going — there’s more.'}</textarea>
        </div>
      </div>

      <!-- 4. Cassette Voice Note & 5. Retro Vinyl Song -->
      <div style="background:rgba(169,142,216,0.12); border:1px solid rgba(169,142,216,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#7c3aed; font-size:14px; font-weight:700; margin-bottom:8px;">📼 Screens 4 & 5: Voice Note & Music Box Soundtrack</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Voice Note Heading</label>
            <input type="text" class="form-input" id="edPaigaamVoiceTitle" value="${data.voiceTitle || 'Press play, I have something to say'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Voice Note Audio URL</label>
            <input type="text" class="form-input" id="edPaigaamVoiceUrl" value="${data.voiceUrl || '/paigaam/bp-voice-demo.mp3'}" placeholder="/paigaam/bp-voice-demo.mp3" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Song Title</label>
            <input type="text" class="form-input" id="edPaigaamSongTitle" value="${data.songTitle || 'Happy Birthday'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Custom Song Audio URL (leave blank for music box)</label>
            <input type="text" class="form-input" id="edPaigaamSongUrl" value="${data.songUrl || ''}" placeholder="Leave empty for synthesized music box" />
          </div>
        </div>
      </div>

      <!-- 6. Scrapbook Memories & Love Notes -->
      <div style="background:rgba(254,243,199,0.2); border:1px solid rgba(245,158,11,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#d97706; font-size:14px; font-weight:700; margin-bottom:8px;">📖 Screen 6: Scrapbook Polaroids & Love Notes</h4>
        ${renderGenPolaroidsBlock('paigaam', 'Scrapbook Polaroids (tap card to see note on back)', paigaamPols)}
        <div class="form-group" style="margin-top:14px;">
          <label class="form-label">Things I Love About You (One per line)</label>
          <textarea rows="4" class="form-textarea" id="edPaigaamLoveNotes">${loveNotes}</textarea>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Reasons You’re Special Checklist (One per line)</label>
          <textarea rows="4" class="form-textarea" id="edPaigaamReasons">${reasons}</textarea>
        </div>
      </div>

      <!-- 7. Cake & Finale -->
      <div style="background:rgba(244,114,182,0.1); border:1px solid rgba(244,114,182,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#db2777; font-size:14px; font-weight:700; margin-bottom:8px;">🎂 Screen 7: Birthday Cake & WhatsApp Thank-You</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Finale Greeting</label>
            <input type="text" class="form-input" id="edPaigaamFinaleTitle" value="${data.finaleTitle || 'Happy Birthday, ' + (data.recipientName || 'Meher') + '!'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Closing Line</label>
            <input type="text" class="form-input" id="edPaigaamFinaleLine" value="${data.finaleLine || 'Here’s to you — today, and every day after.'}" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">WhatsApp Thank-You Message</label>
          <input type="text" class="form-input" id="edPaigaamThankYouText" value="${data.thankYouText || 'I just opened my birthday surprise 🥹💕 Thank you, ' + (data.senderName || 'Rahul') + '!'}" />
        </div>
      </div>
    `;
  } else if (templateId === 'ever_tide') {
    const etPols = (data.photos && data.photos.length > 0)
      ? data.photos.map(p => ({ title: p.title || '', image: p.image || '/images/sunset.jpg', note: p.desc || '' }))
      : ((data.polaroids && data.polaroids.length > 0)
          ? data.polaroids.map(p => ({ title: p.caption || p.title || '', image: p.image || '/images/sunset.jpg', note: p.note || '' }))
          : [
              { title: "Golden Horizon", image: "/images/sunset.jpg", note: "Standing by the tide watching the sky catch fire while talking for hours." },
              { title: "Salt Air & Laughter", image: "/images/always_you.jpg", note: "Windows rolled down, ocean breeze in your hair, and laughter that never fades." },
              { title: "Lantern Twilight", image: "/images/pretty.jpg", note: "Quiet whispers beside the shoreline bonfire under the emerging stars." },
              { title: "Breathtaking Grace", image: "/images/dream_girl.jpg", note: "Even the brightest sunset fades beside the warmth of your smile." },
              { title: "Island Footprints", image: "/images/vogue_cover.jpg", note: "Two sets of footprints side by side along the wet shore." },
              { title: "My Forever Tide", image: "/images/queen.jpg", note: "Like the ocean and the shore, my heart always returns to you." }
            ]);

    specificBox.innerHTML = `
      <div class="section-title">🌅✈️ Ever Tide 3D Sunset Island</div>
      <div class="editor-help-text" style="margin-bottom:14px;">
        Full-3D coastal sunset island with real-time reflective ocean, sky banner biplane, driftwood memory easels, sunset pier cinema, and live multiplayer proposal.
      </div>

      <div style="background:rgba(251,146,60,0.08); border:1px solid rgba(251,146,60,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#ea580c; font-size:14px; font-weight:700; margin-bottom:10px;">🏝️ Island Banner &amp; Carved Sand Heart</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Island Title</label>
            <input type="text" class="form-input" id="edEtIslandTitle" value="${data.islandTitle || 'Ever Tide Island'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Island Subtitle</label>
            <input type="text" class="form-input" id="edEtIslandSubtitle" value="${data.islandSubtitle || 'A Private Sunset Cove Built For Us'}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Sky Airplane Banner Message</label>
          <input type="text" class="form-input" id="edEtPlaneMessage" value="${data.planeMessage || 'Sophie, will you marry me? ~ Daniel'}" />
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Sand Name 1</label>
            <input type="text" class="form-input" id="edEtSandSender" value="${data.sandSender || data.senderName || 'Daniel'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sand Name 2</label>
            <input type="text" class="form-input" id="edEtSandRecipient" value="${data.sandRecipient || data.recipientName || 'Sophie'}" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Couple Photo (Sky Banner &amp; Pier Screen)</label>
          <div style="display:flex; gap:10px; align-items:center;">
            <img src="${data.couplePhoto || '/images/sunset.jpg'}" id="etCoupleThumb" style="width:48px; height:48px; border-radius:8px; object-fit:cover; border:1px solid #fb923c;" onerror="this.src='/images/sunset.jpg'" />
            <input type="text" class="form-input" id="edEtCouplePhoto" value="${data.couplePhoto || '/images/sunset.jpg'}" style="flex:1;" />
            <label class="btn-file-upload-sm" title="Upload Couple Photo" style="cursor:pointer; background:rgba(251,146,60,0.16); border:1px solid #fb923c; color:#ea580c; border-radius:8px; padding:8px 12px; display:inline-flex; align-items:center; gap:4px; flex-shrink:0;">
              <i data-lucide="camera"></i>
              <input type="file" id="fileUploadEtCouplePhoto" accept="image/*" style="display:none;" />
            </label>
          </div>
        </div>
      </div>

      <div style="background:rgba(244,63,94,0.08); border:1px solid rgba(244,63,94,0.28); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#f43f5e; font-size:14px; font-weight:700; margin-bottom:10px;">💍 Pier Cinema &amp; Sunset Proposal</h4>
        <div class="form-group">
          <label class="form-label">Proposal / Big Question</label>
          <input type="text" class="form-input" id="edEtQuestion" value="${data.proposalQuestion || 'Will you walk every shoreline of life with me?'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Proposal Love Note</label>
          <textarea rows="2" class="form-textarea" id="edEtQuestionSub">${data.proposalSubtitle || 'From golden sunsets to starlit tides, every wave brings me closer to you.'}</textarea>
        </div>
        <div class="editor-grid-2">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Yes Button Label</label>
            <input type="text" class="form-input" id="edEtYesBtn" value="${data.proposalYesBtn || 'Yes, Forever & Always! 💍💖'}" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Pier Cinema Video URL (MP4)</label>
            <input type="text" class="form-input" id="edEtCenterpieceVideo" value="${data.centerpieceVideo || '/video/couple_memories.mp4'}" />
          </div>
        </div>
      </div>

      ${renderGenPolaroidsBlock('et', 'Boardwalk Driftwood Memory Frames', etPols)}
    `;

    const etPhotoUpload = specificBox.querySelector('#fileUploadEtCouplePhoto');
    etPhotoUpload?.addEventListener('change', async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const res = await uploadFile(file);
      if (res.success && res.url) {
        const inp = specificBox.querySelector('#edEtCouplePhoto');
        const thumb = specificBox.querySelector('#etCoupleThumb');
        if (inp) inp.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      }
    });
  } else if (templateId === 'kitten_wish') {
    specificBox.innerHTML = `
      <div style="background:rgba(134,117,244,0.08); border:1px solid rgba(134,117,244,0.28); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#6d5be6; font-size:14px; font-weight:700; margin-bottom:10px;">🐱💌 Kitten Wish Letter &amp; Question</h4>
        <div class="form-group">
          <label class="form-label">Letter Title</label>
          <input type="text" class="form-input" id="edKwLetterTitle" value="${data.letterTitle || 'A little note before I ask you something'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Letter Paragraphs (blank line = new paragraph)</label>
          <textarea rows="5" class="form-textarea" id="edKwLetterText">${data.letterText || ''}</textarea>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Sign-off</label>
            <input type="text" class="form-input" id="edKwSignOff" value="${data.signOff || 'With love'}" />
          </div>
          <div class="form-group">
            <label class="form-label">The Question (Yes / No)</label>
            <input type="text" class="form-input" id="edKwQuestion" value="${data.question || 'Will you go on a date with me?'}" />
          </div>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Celebration Note (when they click Yes)</label>
          <input type="text" class="form-input" id="edKwYesSubtitle" value="${data.yesSubtitle || 'Saturday at seven. I am already smiling.'}" />
        </div>
      </div>
    `;
  } else if (templateId === 'kintsugi_apology') {
    const ackLines = Array.isArray(data.acknowledgmentLines) && data.acknowledgmentLines.length > 0
      ? data.acknowledgmentLines
      : [
          'I let my pride speak louder than my care for you, and that was unfair.',
          'You deserved patience, honesty, and to feel genuinely heard.',
          'I am not here to make excuses — only to own the hurt I caused.'
        ];
    const promises = Array.isArray(data.promises) && data.promises.length > 0
      ? data.promises
      : [
          { title: 'Listen Before Reacting', detail: 'When things feel tense, I will pause, breathe, and truly hear your side first.' },
          { title: 'Own My Mistakes Early', detail: 'No defensiveness or silence — I will take responsibility the moment I slip up.' },
          { title: 'Protect Your Peace', detail: 'Your feelings matter more than winning an argument. I will guard our calm.' },
          { title: 'Show Up Consistently', detail: 'Not just in grand apologies, but in the small, everyday ways you deserve.' }
        ];
    const optPhotos = Array.isArray(data.optionalPhotos)
      ? data.optionalPhotos.map(p => ({ title: p.caption || '', image: p.image || '', note: '' }))
      : [];

    specificBox.innerHTML = `
      <div class="section-title">🌧️✨ After the Rain · Kintsugi Apology</div>
      <div class="editor-help-text" style="margin-bottom:14px;">
        5-Act WebGL apology journey with midnight rain, Kintsugi gold-veined 3D heart repair, distraction-free letter, and no-pressure closing.
      </div>

      <div style="background:rgba(229,184,122,0.08); border:1px solid rgba(229,184,122,0.28); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#e5b87a; font-size:14px; font-weight:700; margin-bottom:10px;">🕯️ Opening &amp; Visual Mood</h4>
        <div class="form-group">
          <label class="form-label">Act 1 Opening Hook</label>
          <input type="text" class="form-input" id="edKaOpeningHook" value="${data.openingHook || 'I messed up, and you deserve more than a quick text.'}" />
        </div>
        <div class="editor-grid-2">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Accent Mood</label>
            <select class="form-select" id="edKaMood">
              <option value="Midnight Rain" ${(data.accentMood || 'Midnight Rain') === 'Midnight Rain' ? 'selected' : ''}>Midnight Rain</option>
              <option value="Warm Kintsugi" ${data.accentMood === 'Warm Kintsugi' ? 'selected' : ''}>Warm Kintsugi</option>
              <option value="Soft Rose Dusk" ${data.accentMood === 'Soft Rose Dusk' ? 'selected' : ''}>Soft Rose Dusk</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label">Optional WhatsApp Number (for Reply button)</label>
            <input type="text" class="form-input" id="edKaWhatsapp" value="${data.whatsappNumber || ''}" placeholder="e.g. 919876543210" />
          </div>
        </div>
        <div class="form-group" style="margin-top:10px; margin-bottom:0;">
          <label class="form-label">Optional Custom Reply Link (overrides WhatsApp if set)</label>
          <input type="text" class="form-input" id="edKaReplyLink" value="${data.replyLink || ''}" placeholder="https://..." />
        </div>
      </div>

      <div style="background:rgba(217,155,155,0.08); border:1px solid rgba(217,155,155,0.28); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#d99b9b; font-size:14px; font-weight:700; margin-bottom:10px;">📜 Act 2 &amp; 3 · Acknowledgment &amp; Letter</h4>
        <div class="form-group">
          <label class="form-label">Acknowledgment Lines (1 per line, 2–3 recommended)</label>
          <textarea rows="3" class="form-textarea" id="edKaAckLines">${ackLines.join('\n')}</textarea>
        </div>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Heartfelt Letter Body (blank line = new paragraph)</label>
          <textarea rows="6" class="form-textarea" id="edKaLetterBody">${data.letterBody || ''}</textarea>
        </div>
      </div>

      <div style="background:rgba(167,139,250,0.08); border:1px solid rgba(167,139,250,0.28); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#c4b5fd; font-size:14px; font-weight:700; margin-bottom:10px;">🤝 Act 4 · Concrete Promises (up to 4)</h4>
        ${[0, 1, 2, 3].map((i) => {
          const pr = promises[i] || { title: '', detail: '' };
          return `
            <div class="sub-card-editor ka-promise-row" data-i="${i}" style="margin-bottom:10px;">
              <input type="text" class="form-input ka-promise-title-inp" data-i="${i}" value="${pr.title || ''}" placeholder="Promise #${i + 1} Title" style="margin-bottom:6px;" />
              <textarea rows="2" class="form-textarea ka-promise-detail-inp" data-i="${i}" placeholder="Promise #${i + 1} Detail">${pr.detail || ''}</textarea>
            </div>
          `;
        }).join('')}
      </div>

      ${renderGenPolaroidsBlock('ka', 'Optional Shared Photos (leave empty to hide)', optPhotos)}
    `;
  } else if (templateId === 'wedding_invite' || templateId === 'wedding' || templateId === 'shubh_weds') {
    const fns = (data.functions && data.functions.length > 0) ? data.functions : [
      { id: 'haldi', name: 'Haldi', subtitle: 'Mangal Snanam', time: '10:00 AM - 1:00 PM', date: 'Friday, 19th February 2027', venueName: 'Poolside Courtyard', venueAddress: 'The Palace Lawns, Udaipur', mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur', dressCode: 'Shades of Yellow', accent: '#E8B85C', image: 'https://media.shubhweds.in/template-6/function-haldi.webp' },
      { id: 'mehendi', name: 'Mehendi', subtitle: 'Henna & Melodies', time: '4:00 PM - 8:00 PM', date: 'Friday, 19th February 2027', venueName: 'Garden Terrace', venueAddress: 'The Palace Lawns, Udaipur', mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur', dressCode: 'Greens & Pastels', accent: '#9DAA80', image: 'https://media.shubhweds.in/template-6/function-mehendi.webp' },
      { id: 'sangeet', name: 'Sangeet', subtitle: 'Music, Dance & Celebration', time: '7:30 PM - 11:30 PM', date: 'Saturday, 20th February 2027', venueName: 'Grand Ballroom', venueAddress: 'The Palace Lawns, Udaipur', mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur', dressCode: 'Indo-Western Glam', accent: '#C78A9A', image: 'https://media.shubhweds.in/template-6/function-sangeet.webp' },
      { id: 'wedding', name: 'Wedding', subtitle: 'Shubh Vivah', time: '7:00 PM Onwards', date: 'Sunday, 21st February 2027', venueName: 'The Palace Lawns', venueAddress: 'Udaipur, Rajasthan', mapUrl: 'https://maps.google.com/?q=The+Palace+Lawns+Udaipur', dressCode: 'Traditional Ethnic', accent: '#A8485E', image: 'https://media.shubhweds.in/template-6/function-wedding.webp' }
    ];

    const gal = (data.gallery && data.gallery.length > 0) ? data.gallery : [
      { src: '/images/sunset.jpg', caption: 'Where our journey began', note: 'A serendipitous meeting that turned into a lifetime promise.' },
      { src: '/images/always_you.jpg', caption: 'Hand in hand towards forever', note: 'Through every sunset, laughter, and adventure.' },
      { src: '/images/pretty.jpg', caption: 'Our little world of joy', note: 'Every moment with you feels like home.' },
      { src: '/images/queen.jpg', caption: 'Forever begins here', note: 'Looking ahead to a lifetime of love and togetherness.' }
    ];

    const blessingsList = (data.blessings && data.blessings.length > 0) ? data.blessings.join('\n') : [
      'May you keep choosing each other, every single day.',
      'Wishing you a lifetime of laughter, harmony and long talks.',
      'May your home always bloom with peace and prosperity.',
      'Two souls, two families, one eternal love story.',
      'May every tomorrow be sweeter than today.',
      'Here’s to a blessed lifetime of joy, laughter and togetherness.',
      'May Lord Ganesha shower your union with unending happiness.',
      'Blessings, divine light and boundless love to you both.'
    ].join('\n');

    let rsvpsCount = 0;
    try {
      const stored = JSON.parse(localStorage.getItem('shubh_wedding_rsvps') || '[]');
      rsvpsCount = stored.length;
    } catch (e) {}

    specificBox.innerHTML = `
      <div class="section-title">💍 Royal Wedding Invitation Settings (ShubhWeds)</div>

      <!-- 1. Couple & Lineage -->
      <div style="background:rgba(168,72,94,0.08); border:1px solid rgba(168,72,94,0.22); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#a8485e; font-size:14px; font-weight:700; margin-bottom:10px;">👑 Groom, Bride & Family Lineage</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Groom's Name</label>
            <input type="text" class="form-input" id="edWeddingGroom" value="${data.groomName || 'Vihaan'}" placeholder="Groom's Name" />
          </div>
          <div class="form-group">
            <label class="form-label">Groom's Parents (S/O)</label>
            <input type="text" class="form-input" id="edWeddingGroomParents" value="${data.groomParents || 'S/O Shri Rajiv Kapoor & Smt. Meera Kapoor'}" placeholder="S/O Parents' Names" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Bride's Name</label>
            <input type="text" class="form-input" id="edWeddingBride" value="${data.brideName || 'Anaya'}" placeholder="Bride's Name" />
          </div>
          <div class="form-group">
            <label class="form-label">Bride's Parents (D/O)</label>
            <input type="text" class="form-input" id="edWeddingBrideParents" value="${data.brideParents || 'D/O Shri Arvind Shah & Smt. Kavita Shah'}" placeholder="D/O Parents' Names" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Families Signoff Line</label>
            <input type="text" class="form-input" id="edWeddingFamiliesLine" value="${data.familiesLine || 'the Kapoor and Shah families'}" placeholder="e.g. the Kapoor and Shah families" />
          </div>
          <div class="form-group">
            <label class="form-label">Wedding Hashtag</label>
            <input type="text" class="form-input" id="edWeddingHashtag" value="${data.hashtag || '#VihaanWedsAnaya'}" placeholder="#VihaanWedsAnaya" />
          </div>
        </div>
      </div>

      <!-- 2. Sacred Invocation & Shloka -->
      <div style="background:rgba(201,169,110,0.1); border:1px solid rgba(201,169,110,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#8f6f3c; font-size:14px; font-weight:700; margin-bottom:10px;">🕉️ Sacred Ganesh Invocation & Shloka</h4>
        <div class="form-group">
          <label class="form-label">Invocation Line</label>
          <input type="text" class="form-input" id="edWeddingInvocation" value="${data.invocation || '॥ श्री गणेशाय नमः ॥'}" />
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Sanskrit Shloka Line 1</label>
            <input type="text" class="form-input" id="edWeddingShloka1" value="${data.shlokaLine1 || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Sanskrit Shloka Line 2</label>
            <input type="text" class="form-input" id="edWeddingShloka2" value="${data.shlokaLine2 || 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥'}" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Blessing Intro</label>
            <input type="text" class="form-input" id="edWeddingBlessingIntro" value="${data.blessingIntro || 'With the blessings of Lord Ganesha'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Invitation Kicker</label>
            <input type="text" class="form-input" id="edWeddingInvitationKicker" value="${data.invitationKicker || 'we request the honour of your presence at the wedding celebration of'}" />
          </div>
        </div>
      </div>

      <!-- 3. Wedding Date, Venue & Save the Date -->
      <div style="background:rgba(85,101,63,0.08); border:1px solid rgba(85,101,63,0.22); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#55653f; font-size:14px; font-weight:700; margin-bottom:10px;">📅 Wedding Muhurat, Venue & Scratch Card</h4>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Muhurat Date &amp; Time (auto-fills display &amp; scratch card)</label>
            <input type="datetime-local" class="form-input" id="edWeddingEventDate" value="${(data.eventDate || '2027-02-21T19:00').substring(0, 16)}" />
          </div>
          <div class="form-group">
            <label class="form-label">Wedding Display Date (optional override)</label>
            <input type="text" class="form-input" id="edWeddingDateDisplay" value="${data.weddingDateDisplay || 'Sunday, 21st February 2027'}" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Ceremony Title</label>
            <input type="text" class="form-input" id="edWeddingCeremonyTitle" value="${data.ceremonyTitle || 'Shubh Vivah'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Venue Name</label>
            <input type="text" class="form-input" id="edWeddingVenueName" value="${data.venueName || 'The Oberoi Udaivilas'}" />
          </div>
        </div>
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Venue City</label>
            <input type="text" class="form-input" id="edWeddingVenueCity" value="${data.venueCity || 'Udaipur, Rajasthan'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Google Maps Directions URL</label>
            <input type="text" class="form-input" id="edWeddingMapUrl" value="${data.mapUrl || 'https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur'}" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Venue Full Address</label>
          <input type="text" class="form-input" id="edWeddingVenueAddress" value="${data.venueAddress || 'Haridas Ji Ki Magri, Mulla Talai, Udaipur, Rajasthan 313001'}" />
        </div>

        <div style="font-size:12px; font-weight:700; color:#55653f; margin-top:12px; margin-bottom:6px;">Scratch Card Date Elements (auto-synced, editable):</div>
        <div class="editor-grid-4" style="display:grid; grid-template-columns: repeat(4, 1fr); gap:8px;">
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:10px;">Day</label>
            <input type="text" class="form-input" id="edWeddingSaveDay" value="${data.saveDateDay || 'Sunday'}" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:10px;">Date Num</label>
            <input type="text" class="form-input" id="edWeddingSaveNum" value="${data.saveDateNum || '21'}" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:10px;">Month</label>
            <input type="text" class="form-input" id="edWeddingSaveMonth" value="${data.saveDateMonth || 'February'}" />
          </div>
          <div class="form-group" style="margin-bottom:0;">
            <label class="form-label" style="font-size:10px;">Year</label>
            <input type="text" class="form-input" id="edWeddingSaveYear" value="${data.saveDateYear || '2027'}" />
          </div>
        </div>
      </div>

      <!-- 4. Wedding Functions & Itinerary -->
      <div style="background:rgba(232,184,92,0.1); border:1px solid rgba(232,184,92,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
          <h4 style="color:#b45309; font-size:14px; font-weight:700; margin:0;">✨ Wedding Itinerary & Ceremonies (${fns.length})</h4>
          <button type="button" id="btnAddWeddingFn" style="background:rgba(245,158,11,0.2); border:1px solid #f59e0b; color:#b45309; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:700; cursor:pointer;">
            + Add Ceremony
          </button>
        </div>

        <div id="weddingFnsList">
          ${fns.map((fn, i) => `
            <div class="sub-card-editor wedding-fn-card" data-idx="${i}" style="margin-bottom:12px; background:rgba(255,255,255,0.7); border:1px solid rgba(205,177,126,0.5); border-radius:10px; padding:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-weight:700; font-size:12px; color:var(--text);">Ceremony #${i+1}: ${fn.name}</span>
                <button type="button" class="btn-del-wedding-fn" data-idx="${i}" style="background:rgba(239,68,68,0.15); border:1px solid rgba(239,68,68,0.3); color:#f87171; border-radius:6px; padding:2px 8px; font-size:11px; cursor:pointer;">
                  <i data-lucide="trash-2"></i> Delete
                </button>
              </div>

              <div class="editor-grid-2">
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Event Name</label>
                  <input type="text" class="form-input wfn-name" value="${fn.name}" placeholder="e.g. Haldi, Sangeet" />
                </div>
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Subtitle</label>
                  <input type="text" class="form-input wfn-sub" value="${fn.subtitle || ''}" placeholder="e.g. Mangal Snanam" />
                </div>
              </div>

              <div class="editor-grid-2">
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Date</label>
                  <input type="text" class="form-input wfn-date" value="${fn.date}" placeholder="Friday, 19th February 2027" />
                </div>
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Time</label>
                  <input type="text" class="form-input wfn-time" value="${fn.time}" placeholder="10:00 AM - 1:00 PM" />
                </div>
              </div>

              <div class="editor-grid-2">
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Venue Name</label>
                  <input type="text" class="form-input wfn-venue" value="${fn.venueName}" placeholder="Poolside Courtyard" />
                </div>
                <div class="form-group" style="margin-bottom:6px;">
                  <label class="form-label" style="font-size:10px;">Dress Code</label>
                  <input type="text" class="form-input wfn-dress" value="${fn.dressCode || ''}" placeholder="Shades of Yellow" />
                </div>
              </div>

              <div class="form-group" style="margin-bottom:6px;">
                <label class="form-label" style="font-size:10px;">Venue Full Address</label>
                <input type="text" class="form-input wfn-address" value="${fn.venueAddress || ''}" placeholder="The Palace Lawns, Udaipur" />
              </div>

              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" style="font-size:10px;">Ceremony Photo URL (or tap to upload)</label>
                <div style="display:flex; gap:6px;">
                  <input type="text" class="form-input wfn-img" value="${fn.image}" />
                  <label class="btn-thumb-upload" title="Upload photo" style="cursor:pointer; padding:6px 10px; background:#fff; border:1px solid #ccc; border-radius:6px;">
                    <i data-lucide="camera"></i>
                    <input type="file" class="file-upload-wedding-fn" data-idx="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Couple Moments Gallery -->
      <div style="background:rgba(205,177,126,0.12); border:1px solid rgba(205,177,126,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#8f6f3c; font-size:14px; font-weight:700; margin-bottom:10px;">📸 Romantic Moments Gallery (4 Photos)</h4>
        <div id="weddingGalList">
          ${gal.map((g, i) => `
            <div class="sub-card-editor wedding-gal-card" data-idx="${i}" style="margin-bottom:10px; background:rgba(255,255,255,0.7); border:1px solid rgba(205,177,126,0.4); border-radius:8px; padding:10px;">
              <div style="display:flex; gap:10px; align-items:center; margin-bottom:6px;">
                <img src="${g.src}" style="width:48px; height:48px; object-fit:cover; border-radius:6px; border:1px solid #cdb17e;" id="wgalThumb_${i}" onerror="this.src='/images/sunset.jpg' />
                <div style="flex:1;">
                  <input type="text" class="form-input wgal-caption" value="${g.caption || ''}" placeholder="Caption (e.g. Where it all began)" style="font-size:12px; margin-bottom:4px;" />
                  <input type="text" class="form-input wgal-src" value="${g.src}" placeholder="Image URL" style="font-size:11px;" />
                </div>
                <label class="btn-thumb-upload" title="Upload photo" style="cursor:pointer; padding:8px 10px; background:#fff; border:1px solid #ccc; border-radius:6px;">
                  <i data-lucide="camera"></i>
                  <input type="file" class="file-upload-wedding-gal" data-idx="${i}" accept="image/*" style="display:none;" />
                </label>
              </div>
              <input type="text" class="form-input wgal-note" value="${g.note || ''}" placeholder="Romantic memory note (optional)" style="font-size:11px;" />
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 6. RSVP, Blessings & Guest Responses -->
      <div style="background:rgba(168,72,94,0.08); border:1px solid rgba(168,72,94,0.22); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#a8485e; font-size:14px; font-weight:700; margin-bottom:10px;">💌 RSVP & Wedding Blessings</h4>
        <div class="form-group">
          <label class="form-label">RSVP Reply-by Deadline</label>
          <input type="text" class="form-input" id="edWeddingRsvpDeadline" value="${data.rsvpDeadline || 'Kindly reply by 10 January 2027'}" />
        </div>
        <div class="form-group">
          <label class="form-label">Family Gratitude Message</label>
          <textarea rows="2" class="form-textarea" id="edWeddingThanksMessage">${data.thanksMessage || 'for your love and blessings. Our celebration will not be complete without you.'}</textarea>
        </div>
        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label">Wedding Blessings (One quote per line for butterflies)</label>
          <textarea rows="5" class="form-textarea" id="edWeddingBlessings">${blessingsList}</textarea>
        </div>

        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:10px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <span style="font-weight:700; font-size:13px; color:var(--text);">Guest RSVPs Collected:</span>
            <span style="margin-left:6px; font-size:13px; font-weight:800; color:#a8485e;">${rsvpsCount} response${rsvpsCount !== 1 ? 's' : ''}</span>
          </div>
          <button type="button" id="btnViewWeddingRsvps" style="background:rgba(168,72,94,0.12); border:1px solid #a8485e; color:#a8485e; border-radius:6px; padding:4px 12px; font-size:11px; font-weight:700; cursor:pointer;">
            View Guest List
          </button>
        </div>
      </div>

      <!-- 7. Royal Wedding Soundtrack -->
      <div style="background:rgba(201,169,110,0.1); border:1px solid rgba(201,169,110,0.3); border-radius:12px; padding:16px; margin-bottom:18px;">
        <h4 style="color:#8f6f3c; font-size:14px; font-weight:700; margin-bottom:10px;">🎵 Royal Shehnai Soundtrack</h4>
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Audio Track URL (Sunehra Shehnai)</label>
          <input type="text" class="form-input" id="edWeddingAudioSrc" value="${data.audioSrc || 'https://media.shubhweds.in/videos/sunehra.mp3'}" placeholder="https://media.shubhweds.in/videos/sunehra.mp3" />
        </div>
      </div>
    `;

    // View RSVPs Modal/Alert
    container.querySelector('#btnViewWeddingRsvps')?.addEventListener('click', () => {
      try {
        const stored = JSON.parse(localStorage.getItem('shubh_wedding_rsvps') || '[]');
        if (stored.length === 0) {
          alert('No guest RSVPs received yet! Once guests submit their RSVP on your wedding invitation, they will appear right here.');
        } else {
          const summary = stored.map((r, i) => `${i+1}. ${r.fullName} (${r.phone || 'No phone'}) - ${r.attending ? '✅ Attending with ' + r.guestsCount + ' guests' : '❌ Regrets'}${r.message ? ' | Wish: "' + r.message + '"' : ''}`).join('\n\n');
          alert(`=== GUEST RSVPS (${stored.length}) ===\n\n${summary}`);
        }
      } catch (e) {
        alert('Could not read guest RSVPs.');
      }
    });

    // Add ceremony button
    container.querySelector('#btnAddWeddingFn')?.addEventListener('click', (e) => {
      e.preventDefault();
      const currentFns = extractWeddingFns();
      currentFns.push({
        id: 'fn_' + Date.now(),
        name: 'Reception',
        subtitle: 'Dinner & Celebrations',
        date: 'Monday, 22nd February 2027',
        time: '7:30 PM Onwards',
        venueName: 'The Palace Gardens',
        venueAddress: 'Udaipur, Rajasthan',
        dressCode: 'Black Tie / Evening Glam',
        accent: '#a8485e',
        image: 'https://media.shubhweds.in/template-6/function-wedding.webp',
        mapUrl: ''
      });
      data.functions = currentFns;
      renderVisualEditor(container, templateId, data, onChange);
      emitChange();
    });

    // Delete ceremony button
    container.querySelectorAll('.btn-del-wedding-fn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const idx = parseInt(btn.getAttribute('data-idx'));
        const currentFns = extractWeddingFns();
        if (idx >= 0 && idx < currentFns.length) {
          currentFns.splice(idx, 1);
          data.functions = currentFns;
          renderVisualEditor(container, templateId, data, onChange);
          emitChange();
        }
      });
    });

    // Ceremony photo uploads
    container.querySelectorAll('.file-upload-wedding-fn').forEach(inp => {
      inp.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const idx = inp.getAttribute('data-idx');
        const card = container.querySelector(`.wedding-fn-card[data-idx="${idx}"]`);
        const textInput = card ? card.querySelector('.wfn-img') : null;
        if (textInput) textInput.value = 'Uploading photo...';
        const res = await uploadFile(file);
        if (res.success && res.url) {
          if (textInput) textInput.value = res.url;
          emitChange();
        } else {
          alert(res.error || 'Upload failed.');
        }
      });
    });

    // Gallery photo uploads
    container.querySelectorAll('.file-upload-wedding-gal').forEach(inp => {
      inp.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const idx = inp.getAttribute('data-idx');
        const card = container.querySelector(`.wedding-gal-card[data-idx="${idx}"]`);
        const textInput = card ? card.querySelector('.wgal-src') : null;
        const thumb = container.querySelector(`#wgalThumb_${idx}`);
        if (textInput) textInput.value = 'Uploading photo...';
        const res = await uploadFile(file);
        if (res.success && res.url) {
          if (textInput) textInput.value = res.url;
          if (thumb) thumb.src = res.url;
          emitChange();
        } else {
          alert(res.error || 'Upload failed.');
        }
      });
    });
  }

  // Bind song preset buttons
  container.querySelectorAll('.btn-song-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const sub = btn.getAttribute('data-sub');
      const elSrc = container.querySelector('#edAudioSrc');
      const elTitle = container.querySelector('#edAudioTitle');
      const elSub = container.querySelector('#edAudioSub');
      if (elSrc) elSrc.value = src;
      if (elTitle) elTitle.value = title;
      if (elSub) elSub.value = sub;
      emitChange();
    });
  });

  // Bind quick pick photo chips
  container.querySelectorAll('.btn-quick-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const idx = btn.getAttribute('data-i');
      const textInput = container.querySelector(`.bcard-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#bcardThumb_${idx}`);
      if (textInput) textInput.value = src;
      if (thumb) thumb.src = src;
      if (navigator.vibrate) navigator.vibrate(15);
      emitChange();
    });
  });

  container.querySelectorAll('.btn-quick-pol-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const idx = btn.getAttribute('data-i');
      const textInput = container.querySelector(`.pol-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#polThumb_${idx}`);
      if (textInput) textInput.value = src;
      if (thumb) thumb.src = src;
      if (navigator.vibrate) navigator.vibrate(15);
      emitChange();
    });
  });

  // Birthday Relationship-Adaptive Studio events
  if (templateId === 'birthday') {
    container.querySelectorAll('.bday-rel-card').forEach(card => {
      card.addEventListener('click', () => {
        const relId = card.getAttribute('data-rel-id');
        const nextTheme = getRelationshipTheme(relId);
        const preserve = container.querySelector('#edPreserveBdayText')?.checked;
        const hiddenInp = container.querySelector('#edRecipientPersona');
        if (hiddenInp) hiddenInp.value = nextTheme.id;

        container.querySelectorAll('.bday-rel-card').forEach(c => {
          const isMe = c.getAttribute('data-rel-id') === nextTheme.id;
          c.style.borderColor = isMe ? nextTheme.palette.primary : 'rgba(255,255,255,0.12)';
          c.style.background = isMe ? 'rgba(255,255,255,0.12)' : 'rgba(15,16,28,0.65)';
        });

        const accentInp = container.querySelector('#edBdayAccentColor');
        if (accentInp) accentInp.value = nextTheme.palette.accent;

        if (!preserve) {
          const nd = nextTheme.defaults;
          const setVal = (sel, val) => { const el = container.querySelector(sel); if (el) el.value = val; };
          setVal('#edBdayNickname', nd.nickname || '');
          setVal('#edBdayAppreciation', (nd.appreciationReasons || []).join('\n'));
          setVal('#edBdayLetterSal', nd.letterSalutation || '');
          setVal('#edBdayLetterSign', nd.letterSignoff || '');
          setVal('#edBdayLetterBody', nd.letterBody || '');
          setVal('#edBdayLanterns', (nd.lanternWishes || []).join('\n'));
          setVal('#edBdayPactTitle', nd.pactTitle || '');
          setVal('#edBdayPactVow', nd.pactVow || '');
          setVal('#edHeroSubtitle', nextTheme.acts.act2Tagline || '');
        }
        emitChange();
      });
    });

    container.querySelector('#btnAddBdayHeroNote')?.addEventListener('click', () => {
      const list = container.querySelector('#bdayHeroNotesList');
      if (!list) return;
      const row = document.createElement('div');
      row.className = 'sub-card-editor bday-hero-note-row';
      row.style.cssText = 'display:grid; grid-template-columns:1fr 2fr auto; gap:8px; align-items:center;';
      row.innerHTML = `
        <input type="text" class="form-input bday-hn-label" value="New Wish" placeholder="Node Label" />
        <input type="text" class="form-input bday-hn-text" value="Wishing you the brightest year ahead!" placeholder="Wish revealed on tap..." />
        <button type="button" class="btn-remove-bday-row" title="Remove" style="background:rgba(239,68,68,0.18); color:#fca5a5; border:none; border-radius:8px; padding:8px 10px; cursor:pointer;">✕</button>
      `;
      list.appendChild(row);
      emitChange();
    });

    container.querySelector('#btnAddBdayMilestone')?.addEventListener('click', () => {
      const list = container.querySelector('#bdayMilestonesList');
      if (!list) return;
      const row = document.createElement('div');
      row.className = 'sub-card-editor bday-ms-row';
      row.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr auto; gap:8px; margin-bottom:6px;">
          <input type="text" class="form-input bday-ms-tag" value="MEMORY" placeholder="Tag" />
          <input type="text" class="form-input bday-ms-date" value="Special Day" placeholder="Date / Era" />
          <input type="text" class="form-input bday-ms-title" value="New Milestone" placeholder="Title" />
          <button type="button" class="btn-remove-bday-row" title="Remove" style="background:rgba(239,68,68,0.18); color:#fca5a5; border:none; border-radius:8px; padding:6px 10px; cursor:pointer;">✕</button>
        </div>
        <input type="text" class="form-input bday-ms-desc" value="A cherished chapter worth celebrating." placeholder="Milestone story..." />
      `;
      list.appendChild(row);
      emitChange();
    });

    container.addEventListener('click', (e) => {
      const rmBtn = e.target.closest('.btn-remove-bday-row');
      if (rmBtn) {
        const row = rmBtn.closest('.sub-card-editor');
        if (row) {
          row.remove();
          emitChange();
        }
      }
    });
  }

  // Bind photo preset selects
  container.querySelectorAll('.select-bcard-preset').forEach(sel => {
    sel.addEventListener('change', () => {
      const val = sel.value;
      if (!val) return;
      const idx = sel.getAttribute('data-i');
      const textInput = container.querySelector(`.bcard-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#bcardThumb_${idx}`);
      if (textInput) textInput.value = val;
      if (thumb) thumb.src = val;
      emitChange();
    });
  });

  // Bind file upload inputs
  const fileSong = container.querySelector('#fileUploadSong');
  fileSong?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const inpAudio = container.querySelector('#edAudioSrc');
    if (inpAudio) inpAudio.value = "Uploading song...";
    const res = await uploadFile(file);
    if (res.success) {
      if (inpAudio) inpAudio.value = res.url;
      emitChange();
    } else {
      if (inpAudio) inpAudio.value = data.audioSrc || '/audio/alfaaz.mp3';
      alert(res.error || "Upload failed. Please choose one of the preset tracks (like Alfaaz) or paste an MP3 URL.");
    }
  });

  container.querySelectorAll('.file-upload-photo').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.pol-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#polThumb_${idx}`);
      const origVal = textInput ? textInput.value : '';
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
        if (textInput) textInput.value = origVal;
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  // Countdown timer background photos upload
  container.querySelectorAll('.file-upload-cd-photo').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.cd-bg-input[data-i="${idx}"]`);
      const origVal = textInput ? textInput.value : '';
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (textInput) textInput.value = res.url;
        emitChange();
      } else {
        if (textInput) textInput.value = origVal;
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  // Blossom memory card photo uploads
  container.querySelectorAll('.file-upload-blossom-card').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.bcard-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#bcardThumb_${idx}`);
      const origVal = textInput ? textInput.value : '';
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
        if (textInput) textInput.value = origVal;
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  const btnAddBCard = container.querySelector('#btnAddBlossomCard');
  btnAddBCard?.addEventListener('click', () => {
    data.cards = (data.cards && data.cards.length > 0) ? [...data.cards] : [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ];
    data.cards.push({ image: "/images/sunset.jpg", caption: "Our unforgettable moment" });
    renderVisualEditor(container, templateId, data, onChange);
    onChange(data);
  });

  container.querySelectorAll('.btn-del-blossom-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-i'), 10);
      data.cards = (data.cards && data.cards.length > 0) ? [...data.cards] : [
        { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
        { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
        { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
        { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
        { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
      ];
      data.cards.splice(idx, 1);
      renderVisualEditor(container, templateId, data, onChange);
      onChange(data);
    });
  });

  // Tree template polaroids presets & upload
  container.querySelectorAll('.btn-quick-tree-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = btn.getAttribute('data-i');
      const src = btn.getAttribute('data-src');
      const imgInp = container.querySelector(`.tree-pol-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#treePolThumb_${idx}`);
      if (imgInp) imgInp.value = src;
      if (thumb) thumb.src = src;
      emitChange();
    });
  });

  container.querySelectorAll('.file-upload-tree-polaroid').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.tree-pol-img[data-i="${idx}"]`);
      const thumb = container.querySelector(`#treePolThumb_${idx}`);
      const origVal = textInput ? textInput.value : '';
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
        if (textInput) textInput.value = origVal;
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  const uploadTimerBg = container.querySelector('#uploadTimerBgPhoto');
  uploadTimerBg?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res.success && res.url) {
      data.countdownBackgroundImages = data.countdownBackgroundImages || ["/images/sunset.jpg", "/images/always_you.jpg"];
      data.countdownBackgroundImages.push(res.url);
      renderVisualEditor(container, templateId, data, onChange);
      onChange(data);
    }
  });

  // Gen polaroids quick-pick and file upload listeners
  container.querySelectorAll('.btn-quick-gen-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const prefix = btn.getAttribute('data-prefix');
      const idx = btn.getAttribute('data-i');
      const src = btn.getAttribute('data-src');
      const imgInp = container.querySelector(`.gen-pol-img[data-prefix="${prefix}"][data-i="${idx}"]`);
      const thumb = container.querySelector(`#${prefix}PolThumb_${idx}`);
      if (imgInp) imgInp.value = src;
      if (thumb) thumb.src = src;
      emitChange();
    });
  });

  container.querySelectorAll('.file-upload-gen-polaroid').forEach(fileInput => {
    fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const prefix = fileInput.getAttribute('data-prefix');
      const idx = fileInput.getAttribute('data-i');
      const textInput = container.querySelector(`.gen-pol-img[data-prefix="${prefix}"][data-i="${idx}"]`);
      const thumb = container.querySelector(`#${prefix}PolThumb_${idx}`);
      const origVal = textInput ? textInput.value : '';
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success && res.url) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
        if (textInput) textInput.value = origVal;
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  // Hoisted helper extractors for dynamic sections
  function extractGenPols(prefix) {
    const rows = container.querySelectorAll(`.gen-polaroid-row[data-prefix="${prefix}"]`);
    if (rows.length === 0) return [];
    const arr = [];
    rows.forEach(row => {
      const img = row.querySelector('.gen-pol-img')?.value || '/images/sunset.jpg';
      const title = row.querySelector('.gen-pol-title')?.value || '';
      const note = row.querySelector('.gen-pol-note')?.value || '';
      arr.push({ image: img, title, note });
    });
    return arr;
  }

  function extractBroCodeClauses() {
    const cards = container.querySelectorAll('.clause-editor-card');
    if (cards.length === 0) return [];
    const list = [];
    cards.forEach((card, i) => {
      const title = card.querySelector('.ed-clause-title')?.value || `Clause ${i + 1}`;
      const text = card.querySelector('.ed-clause-text')?.value || '';
      list.push({ id: i + 1, title, text });
    });
    return list;
  }

  // Bro-Code clause add/delete buttons
  container.querySelectorAll('.btn-del-clause').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute('data-idx'));
      const clauses = extractBroCodeClauses();
      if (idx >= 0 && idx < clauses.length) {
        clauses.splice(idx, 1);
        data.broCodeClauses = clauses;
        renderVisualEditor(container, templateId, data, onChange);
        emitChange();
      }
    });
  });

  container.querySelector('#btnAddBroClause')?.addEventListener('click', (e) => {
    e.preventDefault();
    const clauses = extractBroCodeClauses();
    const num = clauses.length + 1;
    clauses.push({
      id: Date.now(),
      title: `Clause ${num}: Sibling Rule 🤜🤛`,
      text: ''
    });
    data.broCodeClauses = clauses;
    renderVisualEditor(container, templateId, data, onChange);
    emitChange();
  });

  // Generic polaroid add/delete buttons
  container.querySelectorAll('.btn-del-gen-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefix = btn.getAttribute('data-prefix');
      const idx = parseInt(btn.getAttribute('data-i'));
      const pols = extractGenPols(prefix);
      if (idx >= 0 && idx < pols.length) {
        pols.splice(idx, 1);
        data.polaroids = pols;
        if (prefix === 'et') {
          data.photos = pols.map((p, i) => ({ id: i + 1, image: p.image, title: p.title, date: 'Coastal Chapter', desc: p.note || '' }));
        }
        renderVisualEditor(container, templateId, data, onChange);
        emitChange();
      }
    });
  });

  container.querySelectorAll('.btn-add-gen-polaroid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const prefix = btn.getAttribute('data-prefix');
      const pols = extractGenPols(prefix);
      pols.push({
        title: `Memory #${pols.length + 1} 📸`,
        image: '/images/sunset.jpg',
        note: ''
      });
      data.polaroids = pols;
      if (prefix === 'et') {
        data.photos = pols.map((p, i) => ({ id: i + 1, image: p.image, title: p.title, date: 'Coastal Chapter', desc: p.note || '' }));
      }
      renderVisualEditor(container, templateId, data, onChange);
      emitChange();
    });
  });

  // Bloom Reason add/delete handlers
  const btnAddReason = container.querySelector('#btnAddBloomReason');
  if (btnAddReason) {
    btnAddReason.addEventListener('click', (e) => {
      e.preventDefault();
      const reasons = Array.isArray(data.reasonsList) ? [...data.reasonsList] : [];
      reasons.push({
        title: `Reason #${reasons.length + 1}`,
        body: 'Another beautiful reason why you mean the entire world to me.'
      });
      data.reasonsList = reasons;
      renderVisualEditor(container, templateId, data, onChange);
      emitChange();
    });
  }

  container.querySelectorAll('.btn-remove-bloom-reason').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-i'));
      const reasons = Array.isArray(data.reasonsList) ? [...data.reasonsList] : [];
      if (idx >= 0 && idx < reasons.length) {
        reasons.splice(idx, 1);
        data.reasonsList = reasons;
        renderVisualEditor(container, templateId, data, onChange);
        emitChange();
      }
    });
  });

  
  function extractWeddingFns() {
    const cards = container.querySelectorAll('.wedding-fn-card');
    if (cards.length === 0) return data.functions || [];
    const origFns = data.functions || [];
    const list = [];
    cards.forEach((c, idx) => {
      const orig = origFns[idx] || {};
      const fullDate = c.querySelector('.wfn-date')?.value || orig.date || '';
      let weekday = orig.weekday || '';
      if (!weekday && fullDate.includes(',')) {
        weekday = fullDate.split(',')[0].trim();
      }
      list.push({
        id: orig.id || ('fn_' + (idx + 1)),
        name: c.querySelector('.wfn-name')?.value || orig.name || 'Ceremony',
        subtitle: c.querySelector('.wfn-sub')?.value || orig.subtitle || '',
        weekday: weekday,
        date: fullDate,
        time: c.querySelector('.wfn-time')?.value || orig.time || '',
        venueName: c.querySelector('.wfn-venue')?.value || orig.venueName || '',
        venueAddress: c.querySelector('.wfn-address')?.value || orig.venueAddress || '',
        dressCode: c.querySelector('.wfn-dress')?.value || orig.dressCode || '',
        image: c.querySelector('.wfn-img')?.value || orig.image || 'https://media.shubhweds.in/template-6/function-wedding.webp',
        accent: orig.accent || '#a8485e',
        mapUrl: orig.mapUrl || ''
      });
    });
    return list;
  }

  function extractWeddingGal() {
    const cards = container.querySelectorAll('.wedding-gal-card');
    if (cards.length === 0) return data.gallery || [];
    const list = [];
    cards.forEach(c => {
      list.push({
        src: c.querySelector('.wgal-src')?.value || '/images/sunset.jpg',
        caption: c.querySelector('.wgal-caption')?.value || '',
        note: c.querySelector('.wgal-note')?.value || ''
      });
    });
    return list;
  }

  // Bind text input listeners
  function emitChange() {
    const updated = { ...data };
    const elRec = container.querySelector('#edRecipient');
    const elSend = container.querySelector('#edSender');
    const elHeroT = container.querySelector('#edHeroTitle');
    const elHeroS = container.querySelector('#edHeroSubtitle');
    const elLock = container.querySelector('#edCountdownLock');
    const elDate = container.querySelector('#edEventDate');
    const elPass = container.querySelector('#edPasscode');
    const elAudT = container.querySelector('#edAudioTitle');
    const elAudS = container.querySelector('#edAudioSub');
    const elAudSrc = container.querySelector('#edAudioSrc');
    const elPrimaryColor = container.querySelector('#edPrimaryColor');

    if (!isWedding) {
      if (elRec) updated.recipientName = elRec.value;
      if (elSend) updated.senderName = elSend.value;
      if (elHeroT) updated.heroTitle = elHeroT.value;
      if (elHeroS) updated.heroSubtitle = elHeroS.value;
    }
    if (elLock) updated.enableCountdownLock = elLock.checked;
    if (elDate) updated.eventDate = elDate.value;
    if (elPass) updated.passcode = elPass.value;
    if (elAudT) updated.audioTitle = elAudT.value;
    if (elAudS) updated.audioSubtitle = elAudS.value;
    if (elAudSrc) updated.audioSrc = elAudSrc.value;
    if (elPrimaryColor && elPrimaryColor.value.trim()) updated.primaryColor = elPrimaryColor.value.trim();

    const cdBgInputs = container.querySelectorAll('.cd-bg-input');
    if (cdBgInputs.length > 0) {
      updated.countdownBackgroundImages = Array.from(cdBgInputs).map(i => i.value.trim()).filter(Boolean);
    }

    if (templateId === 'tree') {
      const elGate = container.querySelector('#edTreeGateLabel');
      const elHint = container.querySelector('#edTreeHint');
      const elW1 = container.querySelector('#edTreeWLine1');
      const elW2 = container.querySelector('#edTreeWLine2');
      const elKSub = container.querySelector('#edTreeKSub');
      const elWHero = container.querySelector('#edTreeWHero');
      const elWSub = container.querySelector('#edTreeWSub');
      const elLet = container.querySelector('#edTreeLetter');
      const elLove = container.querySelector('#edTreeLoveNotes');

      if (elGate) updated.gateLabel = elGate.value;
      if (elHint) updated.hint = elHint.value;
      if (elW1) updated.wLine1 = elW1.value;
      if (elW2) updated.wLine2 = elW2.value;
      if (elKSub) updated.kSub = elKSub.value;
      if (elWHero) updated.wHero = elWHero.value;
      if (elWSub) updated.wSub = elWSub.value;
      if (elLet) updated.letterText = elLet.value;
      if (elLove) {
        updated.loveNotes = elLove.value.split('\n').map(s => s.trim()).filter(Boolean);
      }

      const treeRows = container.querySelectorAll('.tree-polaroid-row');
      if (treeRows.length > 0) {
        const polsArr = [];
        treeRows.forEach(row => {
          const imgInp = row.querySelector('.tree-pol-img');
          const capInp = row.querySelector('.tree-pol-cap');
          if (imgInp && imgInp.value.trim()) {
            polsArr.push({
              image: imgInp.value.trim(),
              caption: capInp ? capInp.value.trim() : ""
            });
          }
        });
        if (polsArr.length > 0) updated.polaroids = polsArr;
      }
    } else if (templateId === 'long_romance') {
      const elSpotify = container.querySelector('#edRomanceSpotify');
      const elYoutube = container.querySelector('#edRomanceYoutube');
      const elAudTitle = container.querySelector('#edRomanceAudioTitle');
      const elAudSrc = container.querySelector('#edRomanceAudioSrc');
      const elLetter = container.querySelector('#edRomanceLetter');
      const elTreaty = container.querySelector('#edRomanceTreatyVow');

      if (elSpotify) updated.spotifyUrl = elSpotify.value.trim();
      if (elYoutube) updated.youtubeUrl = elYoutube.value.trim();
      if (elAudTitle && elAudTitle.value.trim()) updated.audioTitle = elAudTitle.value.trim();
      if (elAudSrc && elAudSrc.value.trim()) updated.audioSrc = elAudSrc.value.trim();
      if (elLetter) updated.letterText = elLetter.value;
      if (elTreaty) updated.treatyVow = elTreaty.value;

      const trackRows = container.querySelectorAll('.romance-track-row');
      if (trackRows.length > 0) {
        const tArr = [];
        trackRows.forEach((row, i) => {
          const title = row.querySelector('.rtrack-title')?.value || `Track ${i + 1}`;
          const artist = row.querySelector('.rtrack-artist')?.value || '';
          const src = row.querySelector('.rtrack-src')?.value || '/audio/alfaaz.mp3';
          const tag = row.querySelector('.rtrack-tag')?.value || `TRACK 0${i + 1}`;
          tArr.push({
            id: i + 1,
            title,
            artist,
            src,
            tag,
            duration: "3:40"
          });
        });
        updated.playlist = tArr;
      }

      const milestoneRows = container.querySelectorAll('.romance-milestone-row');
      if (milestoneRows.length > 0) {
        const mArr = [];
        milestoneRows.forEach((row, i) => {
          const t = row.querySelector('.rmilestone-title')?.value || '';
          const d = row.querySelector('.rmilestone-date')?.value || '';
          const img = row.querySelector('.rmilestone-img')?.value || '/images/sunset.jpg';
          const desc = row.querySelector('.rmilestone-desc')?.value || '';
          mArr.push({
            num: (i + 1 < 10 ? '0' : '') + (i + 1),
            tag: `CHAPTER ${i + 1}`,
            title: t,
            date: d,
            image: img,
            desc: desc
          });
        });
        updated.milestones = mArr;
      }
    } else if (templateId === 'blossom' || templateId === 'bestie_girl' || templateId === 'bestie_boy') {
      const elPin = container.querySelector('#edBlossomPin');
      const elKeyTitle = container.querySelector('#edBlossomKeypadTitle');
      const elPrompt = container.querySelector('#edBlossomPrompt');
      const elIn1 = container.querySelector('#edBlossomIntro1');
      const elIn2 = container.querySelector('#edBlossomIntro2');
      const elCake = container.querySelector('#edBlossomCakeHead');
      const elLet = container.querySelector('#edBlossomLetter');

      if (elPin) updated.passcode = elPin.value;
      if (elKeyTitle) updated.keypadTitle = elKeyTitle.value;
      if (elPrompt) updated.blossomPrompt = elPrompt.value;
      if (elIn1) updated.introLine1 = elIn1.value;
      if (elIn2) updated.introLine2 = elIn2.value;
      if (elCake) updated.cakeHeadline = elCake.value;
      if (elLet) updated.letterBody = elLet.value;

      const bcardRows = container.querySelectorAll('.blossom-card-row');
      if (bcardRows.length > 0) {
        const cardsArr = [];
        bcardRows.forEach(row => {
          const imgInp = row.querySelector('.bcard-img');
          const capInp = row.querySelector('.bcard-cap');
          if (imgInp && imgInp.value.trim()) {
            cardsArr.push({
              image: imgInp.value.trim(),
              caption: capInp ? capInp.value.trim() : ""
            });
          }
        });
        updated.cards = cardsArr;
        updated.polaroids = cardsArr;
      }
    } else if (templateId === 'birthday') {
      const elAge = container.querySelector('#edAge');
      if (elAge) updated.age = elAge.value.trim();
      const elPersona = container.querySelector('#edRecipientPersona');
      if (elPersona) {
        updated.recipientPersona = elPersona.value;
        updated.relationship = elPersona.value;
      }
      const elNick = container.querySelector('#edBdayNickname');
      if (elNick) updated.nickname = elNick.value.trim();
      const elAccent = container.querySelector('#edBdayAccentColor');
      if (elAccent) updated.accentColor = elAccent.value;
      const elFont = container.querySelector('#edBdayFontMood');
      if (elFont) updated.fontMood = elFont.value;
      const elSpot = container.querySelector('#edBdaySpotify');
      if (elSpot) updated.spotifyUrl = elSpot.value.trim();
      const elYt = container.querySelector('#edBdayYoutube');
      if (elYt) updated.youtubeUrl = elYt.value.trim();
      const elApprec = container.querySelector('#edBdayAppreciation');
      if (elApprec) updated.appreciationReasons = elApprec.value.split('\n').map(s => s.trim()).filter(Boolean);
      const elLetSal = container.querySelector('#edBdayLetterSal');
      if (elLetSal) updated.letterSalutation = elLetSal.value.trim();
      const elLetSign = container.querySelector('#edBdayLetterSign');
      if (elLetSign) updated.letterSignoff = elLetSign.value.trim();
      const elLetBody = container.querySelector('#edBdayLetterBody');
      if (elLetBody) updated.letterBody = elLetBody.value;
      const elLant = container.querySelector('#edBdayLanterns');
      if (elLant) updated.lanternWishes = elLant.value.split('\n').map(s => s.trim()).filter(Boolean);
      const elPactTitle = container.querySelector('#edBdayPactTitle');
      if (elPactTitle) updated.pactTitle = elPactTitle.value.trim();
      const elPactVow = container.querySelector('#edBdayPactVow');
      if (elPactVow) updated.pactVow = elPactVow.value.trim();

      const hnRows = container.querySelectorAll('.bday-hero-note-row');
      if (hnRows.length > 0) {
        updated.heroNotes = Array.from(hnRows).map(r => ({
          label: r.querySelector('.bday-hn-label')?.value.trim() || 'Wish',
          text: r.querySelector('.bday-hn-text')?.value.trim() || ''
        })).filter(n => n.text);
      }

      const msRows = container.querySelectorAll('.bday-ms-row');
      if (msRows.length > 0) {
        updated.milestones = Array.from(msRows).map((r, idx) => ({
          num: String(idx + 1).padStart(2, '0'),
          tag: r.querySelector('.bday-ms-tag')?.value.trim() || 'MILESTONE',
          date: r.querySelector('.bday-ms-date')?.value.trim() || '',
          title: r.querySelector('.bday-ms-title')?.value.trim() || '',
          desc: r.querySelector('.bday-ms-desc')?.value.trim() || ''
        })).filter(m => m.title || m.desc);
      }

      const polRows = container.querySelectorAll('.bday-polaroid-row');
      if (polRows.length > 0) {
        const newPols = [];
        polRows.forEach(row => {
          const cat = row.querySelector('.pol-t')?.value || 'Moments';
          const date = row.querySelector('.pol-date')?.value || 'Memory';
          const image = row.querySelector('.pol-img')?.value || '/images/always_you.jpg';
          const note = row.querySelector('.pol-n')?.value || '';
          newPols.push({ title: cat, category: cat, date, image, note, caption: note });
        });
        updated.polaroids = newPols;
        updated.photos = newPols.map(p => ({ image: p.image, date: p.date, category: p.category, caption: p.caption }));
      }
    } else if (templateId === 'anniversary') {
      const elAnniStart = container.querySelector('#edAnniStart');
      const elAnniLetter = container.querySelector('#edAnniLetter');
      if (elAnniStart) updated.anniversaryStartDate = elAnniStart.value;
      if (elAnniLetter) updated.letter = elAnniLetter.value;
      const anniPols = extractGenPols('anni');
      if (anniPols) updated.polaroids = anniPols;
    } else if (templateId === 'sorry') {
      const elSorry = container.querySelector('#edSorryMsg');
      const elSorryTitle = container.querySelector('#edSorryHeroTitle');
      const elSorrySub = container.querySelector('#edSorryHeroSub');
      const elCreatorPhoto = container.querySelector('#edSorryCreatorPhoto');
      const elReasons = container.querySelector('#edSorryReasons');
      const elPromises = container.querySelector('#edSorryPromises');
      const elPenances = container.querySelector('#edSorryPenances');
      const elTreaty = container.querySelector('#edSorryTreaty');
      if (elSorry) updated.apologyMessage = elSorry.value;
      if (elSorryTitle) updated.heroTitle = elSorryTitle.value;
      if (elSorrySub) updated.heroSubtitle = elSorrySub.value;
      if (elCreatorPhoto && elCreatorPhoto.value.trim()) updated.creatorPhoto = elCreatorPhoto.value.trim();
      if (elReasons) updated.reasonsToForgive = elReasons.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elPromises) updated.promises = elPromises.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elPenances) updated.penances = elPenances.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elTreaty) updated.treatyClauses = elTreaty.value.split('\n').map(s => s.trim()).filter(Boolean);

      const sorryPols = [];
      container.querySelectorAll('.sorry-pol-row').forEach(row => {
        const img = row.querySelector('.sorry-pol-img')?.value || '/images/sunset.jpg';
        const cap = row.querySelector('.sorry-pol-cap')?.value || '';
        const note = row.querySelector('.sorry-pol-note')?.value || '';
        sorryPols.push({ image: img, caption: cap, note });
      });
      if (sorryPols.length > 0) updated.polaroids = sorryPols;
    } else if (templateId === 'our_museum') {
      const elMTitle = container.querySelector('#edMuseumTitle');
      const elMSub = container.querySelector('#edMuseumSubtitle');
      const elMDed = container.querySelector('#edMuseumDedication');
      const elEst = container.querySelector('#edEstablishmentDate');
      const elMQ = container.querySelector('#edMuseumQuestion');
      const elMQSub = container.querySelector('#edMuseumQuestionSub');
      const elMYes = container.querySelector('#edMuseumYesBtn');
      const elCpTitle = container.querySelector('#edCenterpieceTitle');
      const elCpImg = container.querySelector('#edCenterpieceImage');
      const elCpVideo = container.querySelector('#edCenterpieceVideo');

      if (elMTitle) updated.museumTitle = elMTitle.value;
      if (elMSub) updated.museumSubtitle = elMSub.value;
      if (elMDed) updated.museumDedication = elMDed.value;
      if (elEst) updated.establishmentDate = elEst.value;
      if (elMQ) updated.proposalQuestion = elMQ.value;
      if (elMQSub) updated.proposalSubtitle = elMQSub.value;
      if (elMYes) updated.proposalYesBtn = elMYes.value;
      if (elCpTitle) updated.centerpieceTitle = elCpTitle.value;
      if (elCpImg) updated.centerpieceImage = elCpImg.value;
      if (elCpVideo) updated.centerpieceVideo = elCpVideo.value;

      const photoRows = container.querySelectorAll('.museum-photo-row');
      if (photoRows.length > 0) {
        const pArr = [];
        photoRows.forEach((row, idx) => {
          const img = row.querySelector('.museum-photo-img')?.value || '/images/sunset.jpg';
          const title = row.querySelector('.museum-photo-title')?.value || `Exhibit #${idx + 1}`;
          const date = row.querySelector('.museum-photo-date')?.value || '';
          const desc = row.querySelector('.museum-photo-desc')?.value || '';
          pArr.push({ id: idx + 1, image: img, title, date, desc });
        });
        updated.photos = pArr;
        updated.polaroids = pArr.map(p => ({ image: p.image, caption: p.title, date: p.date, note: p.desc }));
      }
    } else if (templateId === 'valentine') {
      const elQ = container.querySelector('#edValQuestion');
      const elL = container.querySelector('#edValLetter');
      if (elQ) updated.proposalQuestion = elQ.value;
      if (elL) updated.loveLetter = elL.value;
      const valPols = extractGenPols('val');
      if (valPols) updated.polaroids = valPols;
    } else if (templateId === 'friendship') {
      const elR = container.querySelector('#edBffReason');
      if (elR) updated.awardReason = elR.value;
      const bffPols = extractGenPols('bff');
      if (bffPols) updated.polaroids = bffPols;
    } else if (templateId === 'mother') {
      const elML = container.querySelector('#edMomLetter');
      if (elML) updated.letter = elML.value;
      const momPols = extractGenPols('mom');
      if (momPols) updated.polaroids = momPols;
    } else if (templateId === 'father') {
      const elDL = container.querySelector('#edDadLetter');
      if (elDL) updated.letter = elDL.value;
      const dadPols = extractGenPols('dad');
      if (dadPols) updated.polaroids = dadPols;
    } else if (templateId === 'sister') {
      const elSL = container.querySelector('#edSisLetter');
      if (elSL) updated.letter = elSL.value;
      const sisPols = extractGenPols('sis');
      if (sisPols) updated.polaroids = sisPols;
    } else if (templateId === 'brother') {
      const elBL = container.querySelector('#edBroLetter');
      if (elBL) updated.letter = elBL.value;
      const broPols = extractGenPols('bro');
      if (Array.isArray(broPols)) updated.polaroids = broPols;
      const clauses = extractBroCodeClauses();
      if (Array.isArray(clauses)) updated.broCodeClauses = clauses;
    } else if (templateId === 'bloom_reveal') {
      const elPin = container.querySelector('#edBloomPin');
      const elGreet = container.querySelector('#edBloomGreeting');
      const elSub = container.querySelector('#edBloomSubtitle');
      const elRTitle = container.querySelector('#edBloomReasonsTitle');
      const elLTitle = container.querySelector('#edBloomLetterTitle');
      const elLText = container.querySelector('#edBloomLetterText');
      const elSTitle = container.querySelector('#edBloomSongsTitle');
      const elTracks = container.querySelector('#edBloomSpotifyTracks');
      const elQuote = container.querySelector('#edBloomEndingQuote');

      if (elPin) updated.bloomPin = elPin.value.trim();
      if (elGreet) updated.gateGreeting = elGreet.value;
      if (elSub) updated.gateSubtitle = elSub.value;
      if (elRTitle) updated.reasonsTitle = elRTitle.value;
      if (elLTitle) updated.letterTitle = elLTitle.value;
      if (elLText) updated.letterText = elLText.value;
      if (elSTitle) updated.songsTitle = elSTitle.value;
      if (elQuote) updated.endingQuote = elQuote.value;

      if (elTracks) {
        updated.spotifyTracks = elTracks.value.split(',').map(s => s.trim()).filter(Boolean);
      }

      const reasonRows = container.querySelectorAll('.bloom-reason-edit-row');
      if (reasonRows.length > 0) {
        const list = [];
        reasonRows.forEach(row => {
          const tInput = row.querySelector('.bloom-reason-input-title');
          const bInput = row.querySelector('.bloom-reason-input-body');
          list.push({
            title: tInput ? tInput.value : '',
            body: bInput ? bInput.value : ''
          });
        });
        updated.reasonsList = list;
      }

      const bloomPols = extractGenPols('bloom');
      if (Array.isArray(bloomPols)) updated.polaroids = bloomPols;
    } else if (templateId === 'birthday_paigaam' || templateId === 'paigaam') {
      const elPass = container.querySelector('#edPaigaamPasscode');
      const elHint = container.querySelector('#edPaigaamPasscodeHint');
      const elCameo = container.querySelector('#edPaigaamCameoImage');
      const elQ = container.querySelector('#edPaigaamQuestion');
      const elNo = container.querySelector('#edPaigaamNoMessages');
      const elLSal = container.querySelector('#edPaigaamLetterSalutation');
      const elLSig = container.querySelector('#edPaigaamLetterSignoff');
      const elLText = container.querySelector('#edPaigaamLetterText');
      const elVTit = container.querySelector('#edPaigaamVoiceTitle');
      const elVUrl = container.querySelector('#edPaigaamVoiceUrl');
      const elSTit = container.querySelector('#edPaigaamSongTitle');
      const elSUrl = container.querySelector('#edPaigaamSongUrl');
      const elNotes = container.querySelector('#edPaigaamLoveNotes');
      const elReasons = container.querySelector('#edPaigaamReasons');
      const elFTit = container.querySelector('#edPaigaamFinaleTitle');
      const elFLine = container.querySelector('#edPaigaamFinaleLine');
      const elTY = container.querySelector('#edPaigaamThankYouText');

      if (elPass) updated.passcode = elPass.value.trim();
      if (elHint) updated.passcodeHint = elHint.value;
      if (elCameo) updated.cameoImage = elCameo.value;
      if (elQ) updated.questionPrompt = elQ.value;
      if (elNo) updated.noMessages = elNo.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elLSal) updated.letterSalutation = elLSal.value;
      if (elLSig) updated.letterSignoff = elLSig.value;
      if (elLText) updated.letterText = elLText.value;
      if (elVTit) updated.voiceTitle = elVTit.value;
      if (elVUrl) updated.voiceUrl = elVUrl.value;
      if (elSTit) updated.songTitle = elSTit.value;
      if (elSUrl) updated.songUrl = elSUrl.value;
      if (elNotes) updated.loveNotes = elNotes.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elReasons) updated.reasonsList = elReasons.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elFTit) updated.finaleTitle = elFTit.value;
      if (elFLine) updated.finaleLine = elFLine.value;
      if (elTY) updated.thankYouText = elTY.value;

      const paigaamPols = extractGenPols('paigaam');
      if (Array.isArray(paigaamPols) && paigaamPols.length > 0) {
        updated.polaroids = paigaamPols.map(p => ({
          image: p.image,
          caption: p.title,
          title: p.title,
          note: p.note
        }));
      }
    }
    else if (templateId === 'ever_tide') {
      const elTitle = container.querySelector('#edEtIslandTitle');
      const elSub = container.querySelector('#edEtIslandSubtitle');
      const elPlane = container.querySelector('#edEtPlaneMessage');
      const elSand1 = container.querySelector('#edEtSandSender');
      const elSand2 = container.querySelector('#edEtSandRecipient');
      const elPhoto = container.querySelector('#edEtCouplePhoto');
      const elQ = container.querySelector('#edEtQuestion');
      const elQSub = container.querySelector('#edEtQuestionSub');
      const elYes = container.querySelector('#edEtYesBtn');
      const elVid = container.querySelector('#edEtCenterpieceVideo');
      if (elTitle) updated.islandTitle = elTitle.value;
      if (elSub) updated.islandSubtitle = elSub.value;
      if (elPlane) updated.planeMessage = elPlane.value;
      if (elSand1) updated.sandSender = elSand1.value;
      if (elSand2) updated.sandRecipient = elSand2.value;
      if (elPhoto) updated.couplePhoto = elPhoto.value;
      if (elQ) updated.proposalQuestion = elQ.value;
      if (elQSub) updated.proposalSubtitle = elQSub.value;
      if (elYes) updated.proposalYesBtn = elYes.value;
      if (elVid) updated.centerpieceVideo = elVid.value;
      const etPols = extractGenPols('et');
      if (Array.isArray(etPols) && etPols.length > 0) {
        updated.photos = etPols.map((p, idx) => ({
          id: idx + 1,
          image: p.image,
          title: p.title || `Sunset Memory #${idx + 1}`,
          date: 'Coastal Chapter',
          desc: p.note || ''
        }));
        updated.polaroids = etPols;
      }
    }
    else if (templateId === 'kitten_wish') {
      const elKwTitle = container.querySelector('#edKwLetterTitle');
      const elKwText = container.querySelector('#edKwLetterText');
      const elKwSign = container.querySelector('#edKwSignOff');
      const elKwQuestion = container.querySelector('#edKwQuestion');
      const elKwYesSub = container.querySelector('#edKwYesSubtitle');
      if (elKwTitle) updated.letterTitle = elKwTitle.value;
      if (elKwText) updated.letterText = elKwText.value;
      if (elKwSign) updated.signOff = elKwSign.value;
      if (elKwQuestion) updated.question = elKwQuestion.value;
      if (elKwYesSub) updated.yesSubtitle = elKwYesSub.value;
    }
    else if (templateId === 'kintsugi_apology') {
      const elHook = container.querySelector('#edKaOpeningHook');
      const elMood = container.querySelector('#edKaMood');
      const elWa = container.querySelector('#edKaWhatsapp');
      const elReply = container.querySelector('#edKaReplyLink');
      const elAck = container.querySelector('#edKaAckLines');
      const elLetter = container.querySelector('#edKaLetterBody');
      if (elHook) updated.openingHook = elHook.value;
      if (elMood) updated.accentMood = elMood.value;
      if (elWa) updated.whatsappNumber = elWa.value.trim();
      if (elReply) updated.replyLink = elReply.value.trim();
      if (elAck) {
        updated.acknowledgmentLines = elAck.value
          .split('\n')
          .map(s => s.trim())
          .filter(Boolean);
      }
      if (elLetter) updated.letterBody = elLetter.value;

      const kaPromises = [];
      container.querySelectorAll('.ka-promise-row').forEach(row => {
        const title = row.querySelector('.ka-promise-title-inp')?.value.trim() || '';
        const detail = row.querySelector('.ka-promise-detail-inp')?.value.trim() || '';
        if (title || detail) kaPromises.push({ title, detail });
      });
      if (kaPromises.length > 0) updated.promises = kaPromises;

      const kaPols = extractGenPols('ka');
      updated.optionalPhotos = Array.isArray(kaPols)
        ? kaPols.filter(p => p && p.image).map(p => ({ image: p.image, caption: p.title || '' }))
        : [];
    }
    else if (templateId === 'wedding_invite' || templateId === 'wedding' || templateId === 'shubh_weds') {
      const elGroom = container.querySelector('#edWeddingGroom');
      const elGroomParents = container.querySelector('#edWeddingGroomParents');
      const elBride = container.querySelector('#edWeddingBride');
      const elBrideParents = container.querySelector('#edWeddingBrideParents');
      const elFamiliesLine = container.querySelector('#edWeddingFamiliesLine');
      const elHashtag = container.querySelector('#edWeddingHashtag');
      const elEventDate = container.querySelector('#edWeddingEventDate');
      const elDateDisplay = container.querySelector('#edWeddingDateDisplay');
      const elCeremonyTitle = container.querySelector('#edWeddingCeremonyTitle');
      const elVenueName = container.querySelector('#edWeddingVenueName');
      const elVenueCity = container.querySelector('#edWeddingVenueCity');
      const elVenueAddress = container.querySelector('#edWeddingVenueAddress');
      const elMapUrl = container.querySelector('#edWeddingMapUrl');
      const elInvocation = container.querySelector('#edWeddingInvocation');
      const elShloka1 = container.querySelector('#edWeddingShloka1');
      const elShloka2 = container.querySelector('#edWeddingShloka2');
      const elBlessingIntro = container.querySelector('#edWeddingBlessingIntro');
      const elInvitationKicker = container.querySelector('#edWeddingInvitationKicker');
      const elSaveDay = container.querySelector('#edWeddingSaveDay');
      const elSaveNum = container.querySelector('#edWeddingSaveNum');
      const elSaveMonth = container.querySelector('#edWeddingSaveMonth');
      const elSaveYear = container.querySelector('#edWeddingSaveYear');
      const elRsvpDeadline = container.querySelector('#edWeddingRsvpDeadline');
      const elThanksMessage = container.querySelector('#edWeddingThanksMessage');
      const elBlessings = container.querySelector('#edWeddingBlessings');

      if (elGroom) updated.groomName = elGroom.value;
      if (elGroomParents) updated.groomParents = elGroomParents.value;
      if (elBride) updated.brideName = elBride.value;
      if (elBrideParents) updated.brideParents = elBrideParents.value;
      if (elFamiliesLine) updated.familiesLine = elFamiliesLine.value;
      if (elHashtag) updated.hashtag = elHashtag.value;
      if (elEventDate) updated.eventDate = elEventDate.value;
      if (elDateDisplay) updated.weddingDateDisplay = elDateDisplay.value;
      if (elCeremonyTitle) updated.ceremonyTitle = elCeremonyTitle.value;
      if (elVenueName) updated.venueName = elVenueName.value;
      if (elVenueCity) updated.venueCity = elVenueCity.value;
      if (elVenueAddress) updated.venueAddress = elVenueAddress.value;
      if (elMapUrl) updated.mapUrl = elMapUrl.value;
      if (elInvocation) updated.invocation = elInvocation.value;
      if (elShloka1) updated.shlokaLine1 = elShloka1.value;
      if (elShloka2) updated.shlokaLine2 = elShloka2.value;
      if (elBlessingIntro) updated.blessingIntro = elBlessingIntro.value;
      if (elInvitationKicker) updated.invitationKicker = elInvitationKicker.value;
      if (elSaveDay) updated.saveDateDay = elSaveDay.value;
      if (elSaveNum) updated.saveDateNum = elSaveNum.value;
      if (elSaveMonth) updated.saveDateMonth = elSaveMonth.value;
      if (elSaveYear) updated.saveDateYear = elSaveYear.value;
      if (elRsvpDeadline) updated.rsvpDeadline = elRsvpDeadline.value;
      if (elThanksMessage) updated.thanksMessage = elThanksMessage.value;
      if (elBlessings) updated.blessings = elBlessings.value.split('\n').map(s => s.trim()).filter(Boolean);
      const elWeddingAudio = container.querySelector('#edWeddingAudioSrc');
      if (elWeddingAudio && elWeddingAudio.value.trim()) updated.audioSrc = elWeddingAudio.value.trim();

      updated.recipientName = `${updated.groomName || 'Vihaan'} & ${updated.brideName || 'Anaya'}`;
      updated.senderName = updated.familiesLine || 'the Kapoor and Shah families';

      const fns = extractWeddingFns();
      if (Array.isArray(fns) && fns.length > 0) updated.functions = fns;
      const gal = extractWeddingGal();
      if (Array.isArray(gal) && gal.length > 0) updated.gallery = gal;
    }

    onChange(updated);
  }

  let inputDebounceTimer = null;
  function debouncedEmitChange() {
    if (inputDebounceTimer) clearTimeout(inputDebounceTimer);
    inputDebounceTimer = setTimeout(() => {
      emitChange();
    }, 280);
  }

  container.querySelectorAll('input:not([type="file"]), textarea').forEach(elem => {
    elem.addEventListener('input', debouncedEmitChange);
    elem.addEventListener('change', emitChange);
  });

  // Container-level delegation for dynamically inserted template elements
  container.addEventListener('input', (e) => {
    if (e.target && e.target.matches('input:not([type="file"]), textarea, select')) {
      debouncedEmitChange();
    }
  });
  container.addEventListener('change', (e) => {
    if (e.target && e.target.matches('input:not([type="file"]), textarea, select')) {
      emitChange();
    }
  });

  // Vanilla Picker luxury color picker
  const btnColorPicker = container.querySelector('#btnThemeColorPicker');
  const inpColor = container.querySelector('#edPrimaryColor');
  if (btnColorPicker && inpColor) {
    let pickerInst = null;
    btnColorPicker.addEventListener('click', async (e) => {
      e.preventDefault();
      if (pickerInst) {
        pickerInst.destroy();
        pickerInst = null;
        return;
      }
      if (typeof window !== 'undefined') {
        try {
          const PickerMod = await import('vanilla-picker');
          const Picker = PickerMod.default || PickerMod;
          pickerInst = new Picker({
            parent: btnColorPicker,
            color: inpColor.value || '#d4235c',
            popup: 'bottom',
            onChange: (col) => {
              const hex = col.hex.slice(0, 7);
              inpColor.value = hex;
              btnColorPicker.style.backgroundColor = hex;
              document.documentElement.style.setProperty('--primary', hex);
              emitChange();
            },
            onClose: () => {
              pickerInst = null;
            }
          });
          pickerInst.show();
        } catch (err) {
          console.warn('Vanilla-picker error:', err);
        }
      }
    });

    container.querySelectorAll('.btn-color-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        const col = btn.getAttribute('data-color');
        if (inpColor) inpColor.value = col;
        if (btnColorPicker) btnColorPicker.style.backgroundColor = col;
        document.documentElement.style.setProperty('--primary', col);
        emitChange();
      });
    });
  }

  // SortableJS drag-and-drop reordering on all polaroid & card lists
  const sortableLists = container.querySelectorAll('#blossomCardsList, #treePolaroidsList, #polaroidCardsList, #cdPhotosGrid, #museumArtworksList, [id$="PolaroidsList"]');
  sortableLists.forEach(listEl => {
    try {
      Sortable.create(listEl, {
        animation: 200,
        handle: '.bcard-drag-handle',
        delay: 80,
        delayOnTouchOnly: true,
        touchStartThreshold: 5,
        ghostClass: 'sortable-ghost',
        chosenClass: 'sortable-chosen',
        dragClass: 'sortable-drag',
        onEnd: () => {
          listEl.querySelectorAll('.bcard-num-badge').forEach((badge, idx) => {
            const isCard = badge.textContent.includes('Memory') || badge.textContent.includes('Card');
            badge.innerHTML = `${isCard ? '✨ Memory' : '📸 Polaroid'} #${idx + 1}`;
          });
          emitChange();
        }
      });
    } catch (err) {
      console.warn('Sortable init error:', err);
    }
  });

  // Soundtrack preset chips
  container.querySelectorAll('.btn-audio-preset').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      const title = btn.getAttribute('data-title');
      const sub = btn.getAttribute('data-sub');
      const inpSrc = container.querySelector('#edAudioSrc');
      const inpTitle = container.querySelector('#edAudioTitle');
      const inpSub = container.querySelector('#edAudioSub');
      if (inpSrc && src) inpSrc.value = src;
      if (inpTitle && title && !inpTitle.value) inpTitle.value = title;
      if (inpSub && sub && !inpSub.value) inpSub.value = sub;
      container.querySelectorAll('.btn-audio-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      emitChange();
    });
  });

  // Auto-derive Wedding Display Date & Scratch Card fields from single Muhurat date picker
  const weddingIsoInp = container.querySelector('#edWeddingEventDate');
  weddingIsoInp?.addEventListener('change', () => {
    const dt = new Date(weddingIsoInp.value);
    if (Number.isNaN(dt.getTime())) return;
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayName = weekdays[dt.getDay()];
    const dayNum = dt.getDate();
    const monthName = months[dt.getMonth()];
    const yearNum = String(dt.getFullYear());
    const ord = (n) => (n % 10 === 1 && n !== 11 ? 'st' : n % 10 === 2 && n !== 12 ? 'nd' : n % 10 === 3 && n !== 13 ? 'rd' : 'th');

    const elDisp = container.querySelector('#edWeddingDateDisplay');
    const elDay = container.querySelector('#edWeddingSaveDay');
    const elNum = container.querySelector('#edWeddingSaveNum');
    const elMon = container.querySelector('#edWeddingSaveMonth');
    const elYr = container.querySelector('#edWeddingSaveYear');
    if (elDisp) elDisp.value = `${dayName}, ${dayNum}${ord(dayNum)} ${monthName} ${yearNum}`;
    if (elDay) elDay.value = dayName;
    if (elNum) elNum.value = String(dayNum);
    if (elMon) elMon.value = monthName;
    if (elYr) elYr.value = yearNum;
    emitChange();
  });

  // Song preview snippet toggle
  container.querySelectorAll('.btn-song-preview-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.getAttribute('data-src');
      if (src) toggleSongPreview(src, btn);
    });
  });

  // Collapsible accordion headers
  container.querySelectorAll('.editor-section-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const parent = hdr.closest('.editor-section');
      if (parent) {
        parent.classList.toggle('collapsed');
      }
    });
  });

  // Bottom action buttons
  container.querySelector('#btnBottomSave')?.addEventListener('click', () => {
    const btnSave = document.getElementById('btnHeaderSave');
    if (btnSave) btnSave.click();
  });
  container.querySelector('#btnBottomShare')?.addEventListener('click', () => {
    const btnShare = document.getElementById('btnSharePublish');
    if (btnShare) btnShare.click();
  });

  renderStudioIcons(container);
}
