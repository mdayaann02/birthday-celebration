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
            <input type="text" class="form-input" id="edRecipient" value="${data.recipientName || ''}" placeholder="e.g. Sweety" />
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
                <input type="text" class="form-input cd-bg-input" data-i="${i}" value="${img}" placeholder="Image URL" />
                <label class="btn-file-upload-sm">
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
        <div class="editor-grid-2">
          <div class="form-group">
            <label class="form-label">Song Title</label>
            <input type="text" class="form-input" id="edAudioTitle" value="${data.audioTitle || ''}" placeholder="e.g. Sweety's Song" />
          </div>
          <div class="form-group">
            <label class="form-label">Song Subtitle</label>
            <input type="text" class="form-input" id="edAudioSub" value="${data.audioSubtitle || ''}" placeholder="e.g. BIRTHDAY PLAYLIST" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Audio URL / Upload MP3</label>
          <div style="display:flex; gap:8px;">
            <input type="text" class="form-input" id="edAudioSrc" value="${data.audioSrc || '/audio/song.mp3'}" placeholder="/audio/song.mp3 or https://..." />
            <label class="btn-file-upload">
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

  if (templateId === 'blossom') {
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
    `;
  } else if (templateId === 'birthday') {
    specificBox.innerHTML = `
      <div class="section-title">🎂 Birthday Special Content</div>
      <div class="form-group">
        <label class="form-label">Age / Milestone Number</label>
        <input type="text" class="form-input" id="edAge" value="${data.age || '15'}" />
      </div>
      
      <div style="font-weight:700; font-size:13px; color:var(--primary); margin: 16px 0 8px;">📸 Polaroid Photo Cards (Upload or Paste URL):</div>
      ${(data.polaroids || []).map((p, i) => `
        <div class="sub-card-editor">
          <div style="font-size:12px; font-weight:700; color:#fff; margin-bottom:6px;">Polaroid #${i+1}</div>
          <div class="editor-grid-2">
            <input type="text" class="form-input pol-t" data-i="${i}" value="${p.title}" placeholder="Caption" />
            <div style="display:flex; gap:6px;">
              <input type="text" class="form-input pol-img" data-i="${i}" value="${p.image}" placeholder="Image URL" />
              <label class="btn-file-upload-sm">
                📷
                <input type="file" class="file-upload-photo" data-i="${i}" accept="image/*" style="display:none;" />
              </label>
            </div>
          </div>
          <input type="text" class="form-input pol-n" data-i="${i}" style="margin-top:6px;" value="${p.note}" placeholder="Secret Note on Click" />
        </div>
      `).join('')}
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
    specificBox.innerHTML = `
      <div class="section-title">🥺 Apology Details</div>
      <div class="form-group">
        <label class="form-label">Sincere Apology Message</label>
        <textarea rows="3" class="form-textarea" id="edSorryMsg">${data.apologyMessage || ''}</textarea>
      </div>
    `;
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
  }

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
      alert("Upload failed. Please try a smaller audio file.");
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

    if (templateId === 'blossom') {
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
      if (elSorry) updated.apologyMessage = elSorry.value;
    } else if (templateId === 'valentine') {
      const elQ = container.querySelector('#edValQuestion');
      const elL = container.querySelector('#edValLetter');
      if (elQ) updated.proposalQuestion = elQ.value;
      if (elL) updated.loveLetter = elL.value;
    } else if (templateId === 'friendship') {
      const elR = container.querySelector('#edBffReason');
      if (elR) updated.awardReason = elR.value;
    }

    onChange(updated);
  }

  container.querySelectorAll('input:not([type="file"]), textarea').forEach(elem => {
    elem.addEventListener('input', emitChange);
    elem.addEventListener('change', emitChange);
  });
}
