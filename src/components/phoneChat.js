// src/components/phoneChat.js - Interactive iPhone Chat Simulator

import confetti from 'canvas-confetti';

export function initPhoneChat(container, config) {
  const { phoneChat } = config;
  const messages = [...(phoneChat.messages || [])];

  container.innerHTML = `
    <section class="phone-section" id="phoneSection">
      <div class="section-tag">PERSONAL MESSAGES</div>
      <h2 class="section-heading">A Heartfelt Text</h2>

      <div class="iphone-frame" id="iphoneFrame">
        <div class="dynamic-island"></div>

        <div class="phone-screen">
          <div class="phone-status-bar">
            <span>${phoneChat.time || "7:25 PM"}</span>
            <div style="display: flex; gap: 4px; align-items: center;">
              <span>5G</span>
              <span>100%</span>
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

    // Trigger celebratory mini-confetti
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.85 }
    });

    // Auto sweet response after 1.5 seconds if sent by user
    setTimeout(() => {
      const reply = document.createElement("div");
      reply.className = "chat-bubble bubble-them";
      reply.innerHTML = `
        <div class="bubble-text">Aww thank you so much! You made my birthday truly unforgettable ❤️🥺</div>
        <div class="bubble-time">${time}</div>
      `;
      messagesArea.appendChild(reply);
      scrollToBottom();
    }, 1200);
  }

  btnSend.addEventListener("click", sendMessage);
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
}
