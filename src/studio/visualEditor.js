// src/studio/visualEditor.js - Comprehensive Customization Editor Form with File Uploads

import { uploadFile } from '../models/siteStorage.js';
import Sortable from 'sortablejs';
import { renderStudioIcons } from './icons.js';

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
    <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 18px 0 8px;">📸 ${label}:</div>
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
              <span class="bcard-num-badge">📸 Polaroid #${i+1}</span>
              <input type="text" class="form-input gen-pol-title" data-prefix="${prefix}" data-i="${i}" value="${p.title || ''}" placeholder="Title / Caption (e.g. Unforgettable Smile)" />
            </div>
          </div>
          <div class="bcard-presets-chips">
            <span class="preset-chip-label">Quick Pick:</span>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/pretty.jpg"><img src="/images/pretty.jpg" class="preset-chip-img" /> Pretty</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/dream_girl.jpg"><img src="/images/dream_girl.jpg" class="preset-chip-img" /> Dream Girl</button>
            <button type="button" class="btn-quick-gen-preset" data-prefix="${prefix}" data-i="${i}" data-src="/images/queen.jpg"><img src="/images/queen.jpg" class="preset-chip-img" /> Queen</button>
          </div>
          <input type="text" class="form-input gen-pol-img" data-prefix="${prefix}" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera to upload)" />
          <input type="text" class="form-input gen-pol-note" data-prefix="${prefix}" data-i="${i}" style="margin-top:6px;" value="${p.note || ''}" placeholder="Secret Note / Memory on Tap" />
        </div>
      `).join('')}
    </div>
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
      <div class="editor-section" id="secStyling">
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
      <div class="editor-section highlight-section" id="secCountdown">
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
            <label class="form-label">Audio URL / Upload MP3</label>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <input type="text" class="form-input" id="edAudioSrc" value="${data.audioSrc || '/audio/alfaaz.mp3'}" placeholder="/audio/alfaaz.mp3 or https://..." style="flex:1; min-width:180px;" />
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
      <div class="editor-form-footer" style="margin-top:20px; padding-top:16px; border-top:1px solid rgba(212,175,55,0.25); display:flex; gap:10px; flex-wrap:wrap;">
        <button type="button" class="btn-studio-action btn-footer-save" id="btnBottomSave" style="flex:1; justify-content:center; padding:12px 18px; font-weight:700;">
          <i data-lucide="save"></i>
          <span>Save Website</span>
        </button>
        <button type="button" class="btn-studio-primary btn-footer-share" id="btnBottomShare" style="flex:1; justify-content:center; padding:12px 18px; font-weight:700;">
          <i data-lucide="share-2"></i>
          <span>Get Share Link</span>
        </button>
      </div>
    </div>
  `;

  const specificBox = container.querySelector('#templateSpecificFields');

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
  } else if (templateId === 'long_romance' || templateId === 'blossom' || templateId === 'bestie_girl' || templateId === 'bestie_boy') {
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
    const bdayPolaroids = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { title: "Baddie 😎", image: "/images/baddie.jpg", note: "You have that effortless aura and confidence that turns heads everywhere! 🌟" },
      { title: "Always You 🫶", image: "/images/always_you.jpg", note: "Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai. 🫶" },
      { title: "Pretty ✨", image: "/images/pretty.jpg", note: "No poetry in this world can ever truly capture how breathtaking you look when you're just being yourself. 🌸" },
      { title: "Beautiful 🌸", image: "/images/beautiful.jpg", note: "Your heart is even more radiant than your smile, and that's saying a lot! ☀️" },
      { title: "Dream Girl 💫", image: "/images/dream_girl.jpg", note: "Before I met you, I thought perfection only existed in storybooks. 💖" },
      { title: "Queen 👑", image: "/images/queen.jpg", note: "May you always wear your invisible crown with happiness, peace, and endless love! 👑" }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🎂 Birthday Special Content & Themes</div>

      <!-- Recipient Persona Theme Selector -->
      <div class="form-group" style="background: rgba(212, 175, 55, 0.08); border: 1px solid rgba(212, 175, 55, 0.35); border-radius: 14px; padding: 14px; margin-bottom: 18px;">
        <label class="form-label" style="font-weight: 800; color: #fbbf24; display: flex; align-items: center; gap: 6px;">
          <span>🎭 Recipient Theme Persona (Adaptive Styling & Messages)</span>
        </label>
        <div class="editor-help-text" style="margin-bottom: 10px;">
          Select who you are sending this to! The website dynamically adapts colors, quotes, magazine chapter, scratch surprise, and VIP pass based on the persona:
        </div>
        <select class="form-select" id="edRecipientPersona" style="width: 100%; font-size: 13.5px; padding: 10px 12px; border-radius: 10px; background: rgba(20, 16, 26, 0.9); color: #fff; border: 1px solid rgba(255, 255, 255, 0.22);">
          <option value="bestfriend_female" ${data.recipientPersona === 'bestfriend_female' ? 'selected' : ''}>👯‍♀️ Best Female Friend (Soul Sister • Blossom Rose & Gold)</option>
          <option value="bestfriend" ${data.recipientPersona === 'bestfriend' ? 'selected' : ''}>🤜🤛 Best Friend / Bro (Bro Bestie • Electric Cyan & Slate)</option>
          <option value="brother" ${data.recipientPersona === 'brother' ? 'selected' : ''}>👦 Brother (Bhai / Legend • Royal Cobalt & Amber)</option>
          <option value="sister" ${data.recipientPersona === 'sister' ? 'selected' : ''}>👧 Sister (Behna • Lavender Silk & Peach)</option>
          <option value="teacher" ${data.recipientPersona === 'teacher' ? 'selected' : ''}>🎓 Teacher / Mentor (Scholarly Emerald, Warm Parchment & Regal Gold)</option>
          <option value="mother" ${data.recipientPersona === 'mother' ? 'selected' : ''}>👩 Mother (Maa / Queen • Soft Rose & Warm Pearl)</option>
          <option value="father" ${data.recipientPersona === 'father' ? 'selected' : ''}>👨 Father (Papa / Hero • Classic Navy & Bronze Gold)</option>
          <option value="special" ${(!data.recipientPersona || data.recipientPersona === 'special') ? 'selected' : ''}>💖 Special Someone / Romantic (Velvet Rose & Champagne Gold)</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Age / Milestone Number</label>
        <input type="text" class="form-input" id="edAge" value="${data.age || '15'}" />
      </div>
      
      <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 16px 0 8px;">📸 Polaroid Photo Cards (Upload or Quick Pick):</div>
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
                <span class="bcard-num-badge">📸 Polaroid #${i+1}</span>
                <input type="text" class="form-input pol-t" data-i="${i}" value="${p.title}" placeholder="Caption (e.g. Sunset Glow)" />
              </div>
            </div>
            <div class="bcard-presets-chips">
              <span class="preset-chip-label">Quick Pick:</span>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/always_you.jpg"><img src="/images/always_you.jpg" class="preset-chip-img" /> Always You</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/sunset.jpg"><img src="/images/sunset.jpg" class="preset-chip-img" /> Sunset</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/dream_girl.jpg"><img src="/images/dream_girl.jpg" class="preset-chip-img" /> Dream Girl</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/beautiful.jpg"><img src="/images/beautiful.jpg" class="preset-chip-img" /> Beautiful</button>
            </div>
            <input type="text" class="form-input pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap camera to upload)" />
            <input type="text" class="form-input pol-n" data-i="${i}" style="margin-top:6px;" value="${p.note}" placeholder="Secret Note on Click (e.g. My favorite memory)" />
          </div>
        `).join('')}
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

    specificBox.innerHTML = `
      <div class="section-title">🥺 Multi-Page Apology Details (Stage 1 to 7)</div>

      <!-- Target Face Photo for Stage 2 Vent Room -->
      <div class="form-group" style="background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.32); border-radius: 14px; padding: 14px; margin-bottom: 18px;">
        <label class="form-label" style="font-weight: 800; color: #fbbf24; display: flex; align-items: center; gap: 6px;">
          <span>🎯 Your Photo for Vent Room (Stage 2 Target Face)</span>
        </label>
        <div class="editor-help-text" style="margin-bottom: 10px;">
          Upload your face! In Stage 2, your partner can tap items (Birthday Cake, Teddy Bear, Tomato, Slipper, Water Balloon, Egg) to throw them at your face, and they dynamically splat & stick onto your picture!
        </div>
        <div style="display: flex; gap: 14px; align-items: center;">
          <div style="position: relative; width: 68px; height: 68px; border-radius: 50%; overflow: hidden; border: 2.5px solid #fbbf24; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.4);">
            <img src="${data.creatorPhoto || '/images/always_you.jpg'}" id="sorryCreatorThumb" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='/images/always_you.jpg'" />
            <label class="btn-thumb-upload" title="Upload Face Photo" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.55); cursor: pointer; color: #fff; font-size: 16px;">
              📷
              <input type="file" id="fileUploadSorryCreator" accept="image/*" style="display: none;" />
            </label>
          </div>
          <div style="flex: 1;">
            <input type="text" class="form-input" id="edSorryCreatorPhoto" value="${data.creatorPhoto || '/images/always_you.jpg'}" placeholder="Image URL (or tap 📷 to upload from phone)" />
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">Sincere Apology Message (Letter)</label>
        <textarea rows="4" class="form-textarea" id="edSorryMsg">${data.apologyMessage || ''}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">My Penance / Punishment Tasks (1 per line)</label>
        <div class="editor-help-text" style="margin-bottom:6px;">Tasks and deeds you agree to perform for her:</div>
        <textarea rows="5" class="form-textarea" id="edSorryPenance">${(data.penances || [
          "Buy your favorite Iced Boba / Treat right now 🧋",
          "30-minute soothing massage whenever you ask 💆‍♀️",
          "Order whatever food you are craving tonight, my treat 🍕",
          "Watch 3 chick flicks / K-dramas with zero groaning 🍿",
          "Fold all your laundry & do your chores this weekend 🧹",
          "Write 100 cute post-it notes of things I adore about you 📝"
        ]).join('\n')}</textarea>
      </div>

      <div class="form-group">
        <label class="form-label">Official Peace Treaty Clauses (1 per line)</label>
        <div class="editor-help-text" style="margin-bottom:6px;">Playful legal articles stamped by her fingerprint:</div>
        <textarea rows="5" class="form-textarea" id="edSorryTreaty">${(data.treatyClauses || [
          "Party A (The Cutest Girl) is officially declared 100% Right in all past, present, and future disputes.",
          "Party B must deliver hugs, kisses, and forehead kisses upon demand.",
          "Permanent hoodie and jacket theft rights are granted with zero retaliation.",
          "All future disagreements must be settled immediately with dessert and boba.",
          "No going to sleep angry ever again — cuddles are mandatory."
        ]).join('\n')}</textarea>
      </div>

      <!-- Memory Polaroids -->
      <div style="margin-top:16px;">
        <label class="form-label" style="font-weight:700; color:var(--primary);">📸 Reconciliation Memory Photos (Stage 4):</label>
        <div id="sorryPolsList">
          ${sorryPols.map((p, i) => `
            <div class="sub-card-editor sorry-pol-row" data-i="${i}">
              <div class="bcard-top-row">
                <div class="bcard-thumb-wrap">
                  <img src="${p.image}" class="bcard-thumb" id="sorryPolThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                  <label class="btn-thumb-upload" title="Upload Photo">
                    📷
                    <input type="file" class="file-upload-sorry-photo" data-i="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
                <div class="bcard-caption-col">
                  <span class="bcard-num-badge">📸 Memory #${i+1}</span>
                  <input type="text" class="form-input sorry-pol-cap" data-i="${i}" value="${p.caption || ''}" placeholder="Front Caption (e.g. Our favorite sunset walk)" />
                </div>
              </div>
              <input type="text" class="form-input sorry-pol-note" data-i="${i}" style="margin-top:6px;" value="${p.note || ''}" placeholder="Secret Note on Back of Polaroid" />
              <input type="text" class="form-input sorry-pol-img" data-i="${i}" style="margin-top:6px;" value="${p.image}" placeholder="Image URL (or tap 📷 to upload)" />
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
      { title: "Gaming Battles 🎮", image: "/images/always_you.jpg", note: "Yelling at the TV screen, blaming the controller, and legendary 3 AM tournament wins." },
      { title: "Brothers for Life 🤜🤛", image: "/images/dream_girl.jpg", note: "No matter how much we roast each other, you are the one person I can always count on." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🤜🤛 Brother Special (Bhai) Details</div>
      <div class="form-group">
        <label class="form-label">Letter to My Brother in Chaos</label>
        <textarea rows="5" class="form-textarea" id="edBroLetter">${data.letter || ''}</textarea>
      </div>
      ${renderGenPolaroidsBlock('bro', 'Brotherhood Hall of Fame Polaroids', broPols)}
    `;
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

  // Bind text input listeners
  function emitChange() {
    const updated = { ...data };

    function extractGenPols(prefix) {
      const rows = container.querySelectorAll(`.gen-polaroid-row[data-prefix="${prefix}"]`);
      if (rows.length === 0) return null;
      const arr = [];
      rows.forEach(row => {
        const img = row.querySelector('.gen-pol-img')?.value || '/images/sunset.jpg';
        const title = row.querySelector('.gen-pol-title')?.value || '';
        const note = row.querySelector('.gen-pol-note')?.value || '';
        arr.push({ image: img, title, note });
      });
      return arr;
    }
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

    if (elRec) updated.recipientName = elRec.value;
    if (elSend) updated.senderName = elSend.value;
    if (elHeroT) updated.heroTitle = elHeroT.value;
    if (elHeroS) updated.heroSubtitle = elHeroS.value;
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
    } else if (templateId === 'long_romance' || templateId === 'blossom' || templateId === 'bestie_girl' || templateId === 'bestie_boy') {
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
      if (elAge) updated.age = elAge.value;
      const elPersona = container.querySelector('#edRecipientPersona');
      if (elPersona) updated.recipientPersona = elPersona.value;

      const polRows = container.querySelectorAll('.bday-polaroid-row');
      if (polRows.length > 0) {
        const newPols = [];
        polRows.forEach(row => {
          const title = row.querySelector('.pol-t')?.value || '';
          const image = row.querySelector('.pol-img')?.value || '/images/always_you.jpg';
          const note = row.querySelector('.pol-n')?.value || '';
          newPols.push({ title, image, note });
        });
        updated.polaroids = newPols;
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
      const elPenance = container.querySelector('#edSorryPenance');
      const elTreaty = container.querySelector('#edSorryTreaty');
      const elCreator = container.querySelector('#edSorryCreatorPhoto');
      if (elSorry) updated.apologyMessage = elSorry.value;
      if (elPenance) updated.penances = elPenance.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elTreaty) updated.treatyClauses = elTreaty.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elCreator) updated.creatorPhoto = elCreator.value;

      const sorryPols = [];
      container.querySelectorAll('.sorry-pol-row').forEach(row => {
        const img = row.querySelector('.sorry-pol-img')?.value || '/images/sunset.jpg';
        const cap = row.querySelector('.sorry-pol-cap')?.value || '';
        const note = row.querySelector('.sorry-pol-note')?.value || '';
        sorryPols.push({ image: img, caption: cap, note });
      });
      if (sorryPols.length > 0) updated.polaroids = sorryPols;
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
      if (broPols) updated.polaroids = broPols;
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
  const sortableLists = container.querySelectorAll('#blossomCardsList, #treePolaroidsList, #polaroidCardsList, #cdPhotosGrid, [id$="PolaroidsList"]');
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
