// src/viewer/templates/birthdayTemplate.js - Birthday Celebration Template Viewer

import { initMusicPlayer } from '../../components/musicPlayer.js';
import { initHeroSection } from '../../components/heroSection.js';
import { initPhotoRibbon } from '../../components/photoRibbon.js';
import { initPolaroidWall } from '../../components/polaroidWall.js';
import { initFlipBook } from '../../components/flipBook.js';
import { initScratchCard } from '../../components/scratchCard.js';
import { initVipLanyard } from '../../components/vipLanyard.js';
import { initPhoneChat } from '../../components/phoneChat.js';

export function renderBirthdayTemplate(container, data) {
  // Format config for components
  const config = {
    general: {
      recipientName: data.recipientName || "Sweety",
      age: data.age || "15",
      audioTitle: data.audioTitle || "Sweety's Song",
      audioSubtitle: data.audioSubtitle || "BIRTHDAY PLAYLIST",
      audioSrc: data.audioSrc || "/audio/song.mp3",
      heroTitle: data.heroTitle || "Happy Birthday",
      heroSubtitle: data.heroSubtitle || "To the most special girl in my universe ✨"
    },
    photoRibbon: data.polaroids || [
      { url: "/images/sunset.jpg", caption: "Sunset Glow" },
      { url: "/images/always_you.jpg", caption: "Always You" }
    ],
    polaroids: (data.polaroids || []).map((p, i) => ({
      id: i + 1,
      title: p.title,
      image: p.image,
      angle: i % 2 === 0 ? -4 : 4,
      noteBadge: `N° 0${i + 1}`,
      note: p.note
    })),
    magazine: {
      coverTag: "SWEET SPECIAL EDITION",
      vogueTitle: data.magazine?.title || "VOGUE",
      chapterTitle: "CHAPTER 01",
      chapterHeading: `THINGS ABOUT ${data.recipientName || 'SWEETY'}`,
      chapterSubheading: "GET TO KNOW MY SWEETEST GIRL",
      editorialQuote: data.magazine?.quote || "Being with you makes every ordinary day feel like the sweetest dream come true.",
      editorialPhoto: data.magazine?.photo || "/images/sunset.jpg",
      reasons: (data.magazine?.reasons || []).map((r, i) => ({
        num: i < 9 ? `0${i+1}` : `${i+1}`,
        title: typeof r === 'string' ? r : (r.title || `Reason ${i+1}`),
        desc: typeof r === 'string' ? "One of the countless reasons why you're adored." : (r.desc || "")
      }))
    },
    scratchCard: {
      badge: "WISHING YOU THE BEST DAY 💛",
      title: data.scratchWish?.title || `Happy Birthday ${data.recipientName || ''}`,
      subtitle: data.scratchWish?.message || "To the most beautiful soul, may your year ahead shine as brightly as your smile.",
      hiddenSecret: "You make this world so much brighter! 🎂✨"
    },
    vipLanyard: {
      badgeType: "ALL-ACCESS VIP PASS",
      recipient: (data.recipientName || "SWEETY").toUpperCase(),
      edition: "BIRTHDAY EDITION",
      photo: data.polaroids?.[1]?.image || "/images/always_you.jpg",
      accessLevel: "LEVEL: UNLIMITED LOVE & HAPPINESS",
      barcodeNum: `BDAY-${Date.now().toString().slice(-6)}`
    },
    phoneChat: {
      time: "7:25 PM",
      contactName: `${data.recipientName || 'Sweety'} ❤️`,
      contactStatus: "iMessage • online now",
      avatar: data.polaroids?.[0]?.image || "/images/dream_girl.jpg",
      messages: (data.chatMessages || []).map(msg => ({
        sender: "them",
        text: msg,
        time: "7:25 PM"
      }))
    }
  };

  container.innerHTML = `
    <div id="tpPlayerSlot"></div>
    <div id="tpHeroSlot"></div>
    <div id="tpRibbonSlot"></div>
    <div id="tpPolaroidSlot"></div>
    <div id="tpFlipSlot"></div>
    <div id="tpScratchSlot"></div>
    <div id="tpLanyardSlot"></div>
    <div id="tpChatSlot"></div>
  `;

  initMusicPlayer(container.querySelector('#tpPlayerSlot'), config);
  initHeroSection(container.querySelector('#tpHeroSlot'), config);
  initPhotoRibbon(container.querySelector('#tpRibbonSlot'), config);
  initPolaroidWall(container.querySelector('#tpPolaroidSlot'), config);
  initFlipBook(container.querySelector('#tpFlipSlot'), config);
  initScratchCard(container.querySelector('#tpScratchSlot'), config);
  initVipLanyard(container.querySelector('#tpLanyardSlot'), config);
  initPhoneChat(container.querySelector('#tpChatSlot'), config);
}
