# Celebration Studio — Project Status & Handover Documentation

**Last Updated:** November 25, 2026

---

## 📌 Project Overview
- **Repository Root:** `/data/data/com.termux/files/home/birthday-website`
- **Standalone Kitty Letter:** `/data/data/com.termux/files/home/kitty-letter`
- **GitHub Remote:** `https://github.com/mdayaann02/celebration-studio.git` (branch `main`)
- **Live Vercel Site:** `https://celebration-studio-02.vercel.app`
- **Oracle Cloud Server:** `http://155.248.255.29:3000` (SSH key: `~/.ssh/oracle-key.key`, user: `ubuntu`, PM2 process: `celebration-studio`)

---

## 🚀 Recent Implementations & State

### 1. Ever Tide Island (`ever_tide`) — **NEW & FULLY OPERATIONAL**
- **File:** `src/viewer/templates/everTideTemplate.js`
- **Features:**
  - "Super Real" Three.js procedural sunset sky dome with sun flare/corona glow
  - Custom vertex & fragment water shader with waves, Fresnel reflection, sun path specular highlights
  - PBR sand island with organically displaced coastline and carved names in sand
  - Realistic palm trees with curved trunks, fronds, and coconuts
  - Floral wedding arch with green vines and rose clusters
  - Striped beach umbrella, bench, rowboat, scattered seashells/rocks/grass
  - Towing sky airplane with custom message & couple photo
  - Multiplayer using `museumAvatar.js` & `museumMultiplayer.js` with zero-lag 12Hz throttled sync
  - Action buttons: Wave 👋, Hearts 💖, Propose 💍, Sit 🪑, Hold Hands 🤝, Fly Banner ✈️, plus live chat bubbles
- **Registered in:**
  - `src/models/templateRegistry.js`
  - `src/studio/templateSelector.js`
  - `src/studio/visualEditor.js`
  - `src/viewer/viewerApp.js`

### 2. Kitten Wish (`kitten_wish`) — **NEW & INTEGRATED**
- **File:** `src/viewer/templates/kittenWishTemplate.js`
- **Features:** 3D plush kitten, airmail letter card, yes/no proposal/wish interaction, heart bursts.
- Fully registered and editable in the studio editor.

### 3. Museum 3D Music Player Fix
- **File:** `src/components/musicPlayer.js`
- Fixed issue where custom uploaded audio in Museum template wasn't playing (added fallback support for `config.src`, `config.title`, `config.subtitle`).

### 4. Mobile Text Clipping Fix
- **File:** `src/style.css`
- Improved editor responsive padding and font clipping on mobile displays.

---

## 🛠️ Build & Deploy Commands

### Local Build:
```bash
cd ~/birthday-website
npm run build
```

### Deploy to Vercel:
```bash
cd ~/birthday-website
npx --yes vercel --prod --yes
```

### Deploy to Oracle Cloud:
```bash
# 1. Sync updated files
scp -i ~/.ssh/oracle-key.key -o BatchMode=yes \
  ~/birthday-website/src/viewer/templates/everTideTemplate.js \
  ~/birthday-website/src/viewer/templates/kittenWishTemplate.js \
  ubuntu@155.248.255.29:~/birthday-celebration/src/viewer/templates/

scp -i ~/.ssh/oracle-key.key -o BatchMode=yes \
  ~/birthday-website/src/components/musicPlayer.js \
  ubuntu@155.248.255.29:~/birthday-celebration/src/components/

scp -i ~/.ssh/oracle-key.key -o BatchMode=yes \
  ~/birthday-website/src/models/templateRegistry.js \
  ubuntu@155.248.255.29:~/birthday-celebration/src/models/

scp -i ~/.ssh/oracle-key.key -o BatchMode=yes \
  ~/birthday-website/src/studio/templateSelector.js \
  ~/birthday-website/src/studio/visualEditor.js \
  ubuntu@155.248.255.29:~/birthday-celebration/src/studio/

scp -i ~/.ssh/oracle-key.key -o BatchMode=yes \
  ~/birthday-website/src/viewer/viewerApp.js \
  ubuntu@155.248.255.29:~/birthday-celebration/src/viewer/

# 2. Build and restart on server
ssh -i ~/.ssh/oracle-key.key -o BatchMode=yes ubuntu@155.248.255.29 \
  "cd ~/birthday-celebration && npm run build && pm2 restart celebration-studio && sleep 2 && curl -s http://localhost:3000/api/health"
```

---

## 💡 How to Continue in a New Antigravity Session
If opening a fresh chat or switching accounts, simply prompt:
> **"Read `PROJECT_STATUS.md` in ~/birthday-website and continue from where we left off."**
The agent will immediately have full context of all templates, architectures, server credentials, and deployments.
