# 🎂 Interactive Birthday Celebration Website

A bespoke, responsive, and fully editable birthday celebration website inspired by the video showcase.

---

## 🌟 Key Features

1. **🎵 Floating Ambient Music Player Bar**
   - Floating top pill with rotating vinyl album art.
   - Track title ("Sweety's Song"), playlist label, play/pause controls, time indicator, and interactive scrubber.
   - Plays the authentic song extracted from the video (`/audio/song.mp3`).

2. **🏮 Lantern Night Sky & 3D Milestone Number ("15")**
   - Romantic night gradient with gently ascending, glowing paper lanterns.
   - Dimensional 3D typography for milestone age ("15") with perspective depth and pulsating glow.
   - Romantic headings and smooth scroll-to-explore indicator.

3. **🎢 3D Looping Photo Rollercoaster Ribbon**
   - Smooth 3D figure-8 / loop-de-loop ribbon carrying photographic memories.
   - Interactive touch/mouse drag to glide smoothly along the ribbon of photos with depth sorting.

4. **📸 Polaroid Memory Wall & Secret Note Modals**
   - Realistically textured polaroid cards with natural rotations and red heart pins.
   - Animated fluttering butterflies.
   - Captions: *Baddie 😎*, *Always You 🫶*, *Pretty ✨*, *Beautiful 🌸*, *Dream Girl 💫*, *Queen 👑*.
   - Clicking **any** polaroid opens a sleek romantic note card modal (e.g. *"Is butterfly ki tarah meri har khushi ka raasta bhi aakhir tum tak hi aakar rukta hai, Sweety. 🫶"*).

5. **📖 Landscape Editorial & Vogue Flipbook**
   - "VOGUE SWEETY SPECIAL BIRTHDAY ISSUE" cover style.
   - Auto-Flip toggle (`▶ AUTO FLIP`), rotate 16:9 view, page flip curl animations, and previous/next page controls.
   - Chapter 01: *"Things About Sweety - Get to know my sweetest girl & the love of my life"*.
   - 12 Numbered Adorable Reasons / Traits with elegant editorial layout.
   - "Film & Share" button with confetti burst!

6. **✨ Scratch-To-Reveal Birthday Card**
   - Interactive canvas-based scratch-off golden foil.
   - Rub with finger or mouse cursor to reveal: *"Wishing you the best day - Happy Birthday Sweety"*.
   - Automatically cleans foil and triggers a celebratory confetti blast when scratched > 40%!

7. **🎫 Interactive 3D Swinging VIP Lanyard Pass**
   - Hanging neck lanyard ribbon with metallic clasp.
   - 3D physics-like tilting and swinging card following cursor or touch movement.
   - Displays recipient name, badge photo, barcode, and "Unlimited Love & Happiness" access tier.

8. **📱 Interactive iPhone 16 Pro Chat Simulator**
   - Realistic iPhone frame with Dynamic Island and status bar (7:25 PM, 5G, 100%).
   - Contact header: *Sweety ❤️ (iMessage • online now)*.
   - Preloaded heartfelt chat messages (*"Happppyeeee birthday Sweety ❤️"*, *"ik last bday pr ek problem hogyi thi isliye ye wala bilkul special banaya! 🎁✨"*).
   - Interactive input bar: type any message and press Send to see real-time chat bubbles and automatic sweet replies!

9. **🛠️ Visual Template Customizer Drawer (`✨ Customize Template`)**
   - Sticky button in the bottom right corner.
   - Slide-over panel with categorized tabs: **General**, **Polaroids**, **Editorial**, **Scratch Card**, **VIP Pass**, **Chat**.
   - Customize recipient name, age, audio source, captions, photos, quotes, and notes.
   - **Save & Apply**: persists to `localStorage` and re-renders live without page reload.
   - **Copy Share Link**: encodes your customized configuration into a shareable URL hash (`#data=...`) so anyone opening the link sees your custom setup immediately!
   - **Reset**: easily revert back to initial defaults anytime.

---

## 🚀 Running Locally

```bash
cd ~/birthday-website
npm run dev
```

Visit `http://localhost:5173` on your browser.

---

## 🌐 Deploy to Vercel

### Option 1: Temporary Live Link (Ready Now)
- **Live Preview URL**: `https://express-magenta-m8z9nbu.tmp.now`
- **Claim & Keep Permanently**: [Claim Deployment](https://vercel.com/claim-deployment?code=57f8f21e-c5c2-4166-ad81-6fe421c2c85b)

### Option 2: Deploy to your own Vercel Account
1. Login to Vercel via CLI:
   ```bash
   npx vercel login
   ```
2. Deploy directly:
   ```bash
   npx vercel --prod
   ```
   Or if you have a Vercel Token:
   ```bash
   npx vercel --prod --token <YOUR_VERCEL_TOKEN>
   ```

### Option 3: Push to GitHub & Import in Vercel
1. Create a repository on GitHub.
2. Push your code:
   ```bash
   git remote add origin https://github.com/<username>/<repo-name>.git
   git push -u origin main
   ```
3. Go to [vercel.com/new](https://vercel.com/new) and select the repository to deploy automatically with zero configuration.
