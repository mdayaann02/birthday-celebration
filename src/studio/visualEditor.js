// src/studio/visualEditor.js - Comprehensive Customization Editor Form with File Uploads

import { uploadFile } from '../models/siteStorage.js';

export function renderVisualEditor(container, templateId, data, onChange) {
  container.innerHTML = `
    <div class="visual-editor-wrap">
      <!-- Section A: General Info -->
      <div class="editor-section">
        <div class="section-title">🌟 Basic Details</div>
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

      <!-- Section B: Countdown Lock & Event Date -->
      <div class="editor-section highlight-section">
        <div class="section-title">⏰ Birthday / Event Date & Countdown Lock</div>
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
                <input type="text" class="form-input cd-bg-input" data-i="${i}" value="${img}" placeholder="Image URL" style="flex:1; min-width:0;" />
                <label class="btn-file-upload-sm" style="flex-shrink:0;">
                  📷
                  <input type="file" class="file-upload-cd-photo" data-i="${i}" accept="image/*" style="display:none;" />
                </label>
              </div>
            `).join('')}
          </div>
          <label class="btn-file-upload" style="margin-top:8px; display:inline-flex;">
            📷 Add / Upload Timer Background Photo
            <input type="file" id="uploadTimerBgPhoto" accept="image/*" style="display:none;" />
          </label>
        </div>
      </div>

      <!-- Section C: Music Player & MP3 Upload -->
      <div class="editor-section">
        <div class="section-title">🎵 Background Music & Song</div>

        <div class="form-group" style="margin-bottom:12px;">
          <label class="form-label" style="font-size:12px; color:var(--primary); font-weight:700;">⚡ Choose Romantic Song Preset (1-Tap):</label>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" class="btn-song-preset" data-src="/audio/alfaaz.mp3" data-title="Alfaaz - Hamza Malik & Zain Zohaib" data-sub="ROMANTIC SOUNDTRACK" style="background:rgba(244,114,182,0.15); border:1px solid #f472b6; color:#f472b6; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
              🎵 Alfaaz (Hamza Malik)
            </button>
            <button type="button" class="btn-song-preset" data-src="/audio/blossom_song.mp3" data-title="Blossom Romance Soundtrack" data-sub="LOVELY MELODY" style="background:rgba(244,114,182,0.15); border:1px solid #f472b6; color:#f472b6; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
              🌸 Blossom Theme
            </button>
            <button type="button" class="btn-song-preset" data-src="/audio/song.mp3" data-title="Happy Birthday Acoustic Track" data-sub="CELEBRATION" style="background:rgba(244,114,182,0.15); border:1px solid #f472b6; color:#f472b6; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; cursor:pointer;">
              🎂 Birthday Song
            </button>
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
              📁 Upload Song
              <input type="file" id="fileUploadSong" accept="audio/*" style="display:none;" />
            </label>
          </div>
        </div>
      </div>

      <!-- Section D: Template Specific Content -->
      <div class="editor-section" id="templateSpecificFields"></div>
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
              <div class="bcard-thumb-wrap">
                <img src="${p.image}" class="bcard-thumb" id="treePolThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                <label class="btn-thumb-upload" title="Upload from phone">
                  📷
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
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/sunset.jpg">Sunset</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/always_you.jpg">Always You</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/dream_girl.jpg">Dream Girl</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/queen.jpg">Queen</button>
              <button type="button" class="btn-quick-tree-preset" data-i="${i}" data-src="/images/baddie.jpg">Baddie</button>
            </div>
            <input type="text" class="form-input tree-pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap 📷 to upload)" />
          </div>
        `).join('')}
      </div>
    `;
  } else if (templateId === 'blossom') {
    const blossomCards = (data.cards && data.cards.length > 0) ? data.cards : [
      { image: "/images/blossom/memory_1.jpg", caption: "Sweet moments with you" },
      { image: "/images/blossom/memory_2.jpg", caption: "Adventures in cold snow" },
      { image: "/images/blossom/memory_3.jpg", caption: "Campfire songs & warmth" },
      { image: "/images/blossom/memory_4.jpg", caption: "Painting our memories together" },
      { image: "/images/blossom/memory_5.jpg", caption: "Riding into the sunset" }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🌸 Blossom Romance Details (Viral Pastel Story)</div>
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
                <div class="bcard-thumb-wrap">
                  <img src="${c.image}" class="bcard-thumb" id="bcardThumb_${i}" onerror="this.src='/images/sunset.jpg'" />
                  <label class="btn-thumb-upload" title="Upload Photo">
                    📷
                    <input type="file" class="file-upload-blossom-card" data-i="${i}" accept="image/*" style="display:none;" />
                  </label>
                </div>
                <div class="bcard-caption-col">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span class="bcard-num-badge">✨ Memory #${i+1}</span>
                    <button type="button" class="btn-del-blossom-card" data-i="${i}" title="Delete Card">🗑️</button>
                  </div>
                  <input type="text" class="form-input bcard-cap" data-i="${i}" value="${c.caption || ''}" placeholder="Caption (e.g. Sweet moments with you)" />
                </div>
              </div>

              <!-- Quick Pick Photo Chips -->
              <div class="bcard-presets-chips">
                <span class="preset-chip-label">Quick Pick:</span>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/sunset.jpg">Sunset</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/always_you.jpg">Always You</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/dream_girl.jpg">Dream Girl</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/queen.jpg">Queen</button>
                <button type="button" class="btn-quick-preset" data-i="${i}" data-src="/images/baddie.jpg">Baddie</button>
              </div>

              <div class="bcard-url-row">
                <input type="text" class="form-input bcard-img" data-i="${i}" value="${c.image}" placeholder="Image URL (or tap 📷 to upload)" />
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
    specificBox.innerHTML = `
      <div class="section-title">🎂 Birthday Special Content</div>
      <div class="form-group">
        <label class="form-label">Age / Milestone Number</label>
        <input type="text" class="form-input" id="edAge" value="${data.age || '15'}" />
      </div>
      
      <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 16px 0 8px;">📸 Polaroid Photo Cards (Upload or Quick Pick):</div>
      <div id="polaroidCardsList">
        ${(data.polaroids || []).map((p, i) => `
          <div class="sub-card-editor bday-polaroid-row" data-i="${i}">
            <div class="bcard-top-row">
              <div class="bcard-thumb-wrap">
                <img src="${p.image}" class="bcard-thumb" id="polThumb_${i}" onerror="this.src='/images/always_you.jpg'" />
                <label class="btn-thumb-upload" title="Upload from phone">
                  📷
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
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/always_you.jpg">Always You</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/sunset.jpg">Sunset</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/dream_girl.jpg">Dream Girl</button>
              <button type="button" class="btn-quick-pol-preset" data-i="${i}" data-src="/images/beautiful.jpg">Beautiful</button>
            </div>
            <input type="text" class="form-input pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL (or tap 📷 to upload)" />
            <input type="text" class="form-input pol-n" data-i="${i}" style="margin-top:6px;" value="${p.note}" placeholder="Secret Note on Click (e.g. My favorite memory)" />
          </div>
        `).join('')}
      </div>
    `;
  } else if (templateId === 'anniversary') {
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
    `;
  } else if (templateId === 'sorry') {
    const sorryPols = (data.polaroids && data.polaroids.length > 0) ? data.polaroids : [
      { image: "/images/sunset.jpg", caption: "Our sunset walk... I miss your laugh so much 🌅", note: "You looked so peaceful here. I promise to always protect your happiness." },
      { image: "/images/always_you.jpg", caption: "You are the brightest light in my world 🫶", note: "Even on my gloomiest days, one smile from you fixes everything." },
      { image: "/images/pretty.jpg", caption: "I never want to see you hurt ever again ✨", note: "You deserve the gentlest, sweetest love in the universe." }
    ];

    specificBox.innerHTML = `
      <div class="section-title">🥺 Multi-Page Apology Details (Stage 1 to 7)</div>
      
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
          triggerChange();
        }
      });
    });
  } else if (templateId === 'valentine') {
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
    `;
  } else if (templateId === 'friendship') {
    specificBox.innerHTML = `
      <div class="section-title">👯 Friendship Details</div>
      <div class="form-group">
        <label class="form-label">Certificate Award Reason</label>
        <textarea rows="2" class="form-textarea" id="edBffReason">${data.awardReason || ''}</textarea>
      </div>
    `;
  } else if (templateId === 'mother') {
    specificBox.innerHTML = `
      <div class="section-title">🌸 Mother Special (Maa) Details</div>
      <div class="form-group">
        <label class="form-label">Heartfelt Letter to Maa</label>
        <textarea rows="5" class="form-textarea" id="edMomLetter">${data.letter || ''}</textarea>
      </div>
    `;
  } else if (templateId === 'father') {
    specificBox.innerHTML = `
      <div class="section-title">🌟 Father Special (Papa) Details</div>
      <div class="form-group">
        <label class="form-label">Letter of Gratitude & Honor to Papa</label>
        <textarea rows="5" class="form-textarea" id="edDadLetter">${data.letter || ''}</textarea>
      </div>
    `;
  } else if (templateId === 'sister') {
    specificBox.innerHTML = `
      <div class="section-title">💅 Sister Special (Behna) Details</div>
      <div class="form-group">
        <label class="form-label">Letter to My Crazy Sister</label>
        <textarea rows="5" class="form-textarea" id="edSisLetter">${data.letter || ''}</textarea>
      </div>
    `;
  } else if (templateId === 'brother') {
    specificBox.innerHTML = `
      <div class="section-title">🤜🤛 Brother Special (Bhai) Details</div>
      <div class="form-group">
        <label class="form-label">Letter to My Brother in Chaos</label>
        <textarea rows="5" class="form-textarea" id="edBroLetter">${data.letter || ''}</textarea>
      </div>
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
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success) {
        if (textInput) textInput.value = res.url;
        emitChange();
      } else {
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
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success) {
        if (textInput) textInput.value = res.url;
        emitChange();
      } else {
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
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
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
      if (textInput) textInput.value = "Uploading photo...";
      const res = await uploadFile(file);
      if (res.success) {
        if (textInput) textInput.value = res.url;
        if (thumb) thumb.src = res.url;
        emitChange();
      } else {
        alert(res.error || "Upload failed. Please try a different photo.");
      }
    });
  });

  const uploadTimerBg = container.querySelector('#uploadTimerBgPhoto');
  uploadTimerBg?.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const res = await uploadFile(file);
    if (res.success) {
      data.countdownBackgroundImages = data.countdownBackgroundImages || ["/images/sunset.jpg", "/images/always_you.jpg"];
      data.countdownBackgroundImages.push(res.url);
      renderVisualEditor(container, templateId, data, onChange);
      onChange(data);
    }
  });

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
          const idx = row.getAttribute('data-i');
          const imgInp = row.querySelector(`.tree-pol-img[data-i="${idx}"]`);
          const capInp = row.querySelector(`.tree-pol-cap[data-i="${idx}"]`);
          if (imgInp && imgInp.value.trim()) {
            polsArr.push({
              image: imgInp.value.trim(),
              caption: capInp ? capInp.value.trim() : ""
            });
          }
        });
        if (polsArr.length > 0) updated.polaroids = polsArr;
      }
    } else if (templateId === 'blossom') {
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
          const idx = row.getAttribute('data-card-idx');
          const imgInp = row.querySelector(`.bcard-img[data-i="${idx}"]`);
          const capInp = row.querySelector(`.bcard-cap[data-i="${idx}"]`);
          if (imgInp && imgInp.value.trim()) {
            cardsArr.push({
              image: imgInp.value.trim(),
              caption: capInp ? capInp.value.trim() : ""
            });
          }
        });
        updated.cards = cardsArr;
      }
    } else if (templateId === 'birthday') {
      const elAge = container.querySelector('#edAge');
      if (elAge) updated.age = elAge.value;

      const newPols = [...(updated.polaroids || [])];
      container.querySelectorAll('.pol-t').forEach(inp => {
        const i = parseInt(inp.getAttribute('data-i'), 10);
        if (newPols[i]) newPols[i].title = inp.value;
      });
      container.querySelectorAll('.pol-img').forEach(inp => {
        const i = parseInt(inp.getAttribute('data-i'), 10);
        if (newPols[i]) newPols[i].image = inp.value;
      });
      container.querySelectorAll('.pol-n').forEach(inp => {
        const i = parseInt(inp.getAttribute('data-i'), 10);
        if (newPols[i]) newPols[i].note = inp.value;
      });
      updated.polaroids = newPols;
    } else if (templateId === 'anniversary') {
      const elAnniStart = container.querySelector('#edAnniStart');
      const elAnniLetter = container.querySelector('#edAnniLetter');
      if (elAnniStart) updated.anniversaryStartDate = elAnniStart.value;
      if (elAnniLetter) updated.letter = elAnniLetter.value;
    } else if (templateId === 'sorry') {
      const elSorry = container.querySelector('#edSorryMsg');
      const elPenance = container.querySelector('#edSorryPenance');
      const elTreaty = container.querySelector('#edSorryTreaty');
      if (elSorry) updated.apologyMessage = elSorry.value;
      if (elPenance) updated.penances = elPenance.value.split('\n').map(s => s.trim()).filter(Boolean);
      if (elTreaty) updated.treatyClauses = elTreaty.value.split('\n').map(s => s.trim()).filter(Boolean);

      const sorryPols = [];
      container.querySelectorAll('.sorry-pol-row').forEach(row => {
        const i = row.getAttribute('data-i');
        const img = row.querySelector(`.sorry-pol-img[data-i="${i}"]`)?.value || '/images/sunset.jpg';
        const cap = row.querySelector(`.sorry-pol-cap[data-i="${i}"]`)?.value || '';
        const note = row.querySelector(`.sorry-pol-note[data-i="${i}"]`)?.value || '';
        sorryPols.push({ image: img, caption: cap, note });
      });
      if (sorryPols.length > 0) updated.polaroids = sorryPols;
    } else if (templateId === 'valentine') {
      const elQ = container.querySelector('#edValQuestion');
      const elL = container.querySelector('#edValLetter');
      if (elQ) updated.proposalQuestion = elQ.value;
      if (elL) updated.loveLetter = elL.value;
    } else if (templateId === 'friendship') {
      const elR = container.querySelector('#edBffReason');
      if (elR) updated.awardReason = elR.value;
    } else if (templateId === 'mother') {
      const elML = container.querySelector('#edMomLetter');
      if (elML) updated.letter = elML.value;
    } else if (templateId === 'father') {
      const elDL = container.querySelector('#edDadLetter');
      if (elDL) updated.letter = elDL.value;
    } else if (templateId === 'sister') {
      const elSL = container.querySelector('#edSisLetter');
      if (elSL) updated.letter = elSL.value;
    } else if (templateId === 'brother') {
      const elBL = container.querySelector('#edBroLetter');
      if (elBL) updated.letter = elBL.value;
    }

    onChange(updated);
  }

  container.querySelectorAll('input:not([type="file"]), textarea').forEach(elem => {
    elem.addEventListener('input', emitChange);
    elem.addEventListener('change', emitChange);
  });
}
