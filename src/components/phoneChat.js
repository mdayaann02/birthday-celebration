// src/components/phoneChat.js - Interactive iPhone 16 Pro Chat Simulator

import confetti from 'canvas-confetti';

export function initPhoneChat(container, config) {
  const { phoneChat } = config;
  const messages = [...(phoneChat.messages || [])];

  container.innerHTML = `
    <section class="phone-section" id="phoneSection">
      <div class="section-tag">A HEARTFELT SURPRISE</div>
      <h2 class="section-heading">Late Night Messages</h2>

      <div class="iphone-16-pro" id="iphoneFrame">
        <!-- Titanium Frame Reflection Glare -->
        <div class="phone-glass-glare"></div>

        <!-- Dynamic Island with animated waveform -->
        <div class="dynamic-island-pro">
          <div class="di-artwork">
            <img src="${phoneChat.avatar || '/images/dream_girl.jpg'}" alt="Thumb" />
          </div>
          <div class="di-wave">
            <span></span><span></span><span></span><span></span>
          </div>
        </div>

        <div class="phone-screen">
          <div class="phone-status-bar">
            <span>${phoneChat.time || "7:25 PM"}</span>
            <div style="display: flex; gap: 6px; align-items: center;">
              <svg width="14" height="11" viewBox="0 0 16 12" fill="currentColor">
                <rect x="0" y="8" width="3" height="4" rx="1"/>
                <rect x="4" y="5" width="3" height="7" rx="1"/>
                <rect x="8" y="2" width="3" height="10" rx="1"/>
                <rect x="12" y="0" width="3" height="12" rx="1"/>
              </svg>
              <span>5G</span>
              <div class="battery-pill"><div class="battery-charge"></div></div>
            </div>
          </div>

          <div class="phone-chat-header">
            <div class="chat-avatar">
              <img src="${phoneChat.avatar || '/images/dream_girl.jpg'}" alt="Avatar" />
            </div>
            <div class="chat-contact-info">
              <span class="chat-contact-name">${phoneChat.contactName || "Sweety ❤️"}</span>
              <span class="chat-contact-status">${phoneChat.contactStatus || "iMessage • online now"}</span>
            </div>
          </div>

          <div class="messages-area" id="messagesArea">
            <div class="chat-date-pill">TODAY ${phoneChat.time || "7:25 PM"}</div>
            ${messages.map(m => `
              <div class="chat-bubble ${m.sender === 'me' ? 'bubble-me' : 'bubble-them'}">
                <div class="bubble-text">${m.text}</div>
                <div class="bubble-time">${m.time || ''}</div>
              </div>
            `).join('')}
          </div>

          <div class="chat-input-bar">
            <input 
              type="text" 
              class="chat-input" 
              id="chatInput" 
              placeholder="Send a birthday wish..." 
              autocomplete="off"
            />
            <button class="btn-chat-send" id="btnChatSend" aria-label="Send Message">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  const messagesArea = document.getElementById("messagesArea");
  const chatInput = document.getElementById("chatInput");
  const btnSend = document.getElementById("btnChatSend");

  function scrollToBottom() {
    messagesArea.scrollTop = messagesArea.scrollHeight;
  }
  scrollToBottom();

  function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble bubble-me";
    bubble.innerHTML = `
      <div class="bubble-text">${text}</div>
      <div class="bubble-time">${time}</div>
    `;
    messagesArea.appendChild(bubble);
    chatInput.value = "";
    scrollToBottom();

    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.85 }
    });

    // Realistic typing indicator before reply
    const typingBubble = document.createElement("div");
    typingBubble.className = "chat-bubble bubble-them typing-indicator";
    typingBubble.innerHTML = `<span></span><span></span><span></span>`;
    messagesArea.appendChild(typingBubble);
    scrollToBottom();

    setTimeout(() => {
      typingBubble.remove();
      const reply = document.createElement("div");
      reply.className = "chat-bubble bubble-them";
      reply.innerHTML = `
        <div class="bubble-text">Aww thank you so much! You made my day truly magical ❤️🥺</div>
        <div class="bubble-time">${time}</div>
      `;
      messagesArea.appendChild(reply);
      scrollToBottom();
    }, 1400);
  }

  btnSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}
