# The Art of Being Happy · Singapore 2026 Flyer Photo Frame

A responsive, high-resolution photo framing web application for **Gurudev Sri Sri Ravi Shankar's Masterclass in Singapore: "The Art of Being Happy"** (6 December 2026, Sands Expo & Convention Center).

---

## 🌟 Key Features

1. **Dual Language Creatives**:
   - **English Creative**: *The Art of Being Happy* with the *"I am attending!"* polaroid photo frame.
   - **Chinese Creative (中文创意)**: *快乐的艺术* with the *"我会参加!"* polaroid photo frame.
   - Seamless instant switching: uploading or adjusting a photo preserves the exact position and zoom across both creatives.

2. **100% Client-Side Privacy**:
   - Zero database, zero backend, zero network data transmission.
   - All photo processing happens locally in device RAM using HTML5 `FileReader` and `<canvas>`.
   - Photos are never stored or uploaded anywhere.

3. **Precise Interactive Photo Controls**:
   - **Drag / Pan**: Move the photo freely within the frame (with 1:1 direct screen tracking calibrated to the polaroid's -10.5° tilt).
   - **Zoom**: Smooth slider (50% – 300%), `+` / `–` buttons, mouse scroll wheel, and touch pinch-to-zoom on mobile.
   - **Rotate**: 90° clockwise rotation.
   - **Reset**: 1-click button to re-center and fit.

4. **Master Quality Export**:
   - Generates a **2048 × 2048px** ultra-crisp master image directly in the browser.
   - Downloaded image matches the on-screen preview to the sub-pixel.
   - Direct sharing to WhatsApp / social platforms via the Web Share API.

---

## 📂 Project Structure

```
aolsg-frame/
├── public/
│   ├── aol-logo.png             # Official Art of Living Sun & Swans Logo
│   ├── singapore-flyer.jpg      # English Flyer Creative (1024x1024)
│   ├── singapore-flyer-zh.jpg   # Chinese Flyer Creative (1024x1024)
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ActionButtons.jsx    # Download (2K PNG) & Social Share
│   │   ├── CreativeSelector.jsx # English vs Chinese Creative Switcher
│   │   ├── FlyerCanvas.jsx      # Interactive Canvas with Pan/Zoom/Rotate
│   │   ├── Header.jsx           # Logo, Titles, Date & Venue
│   │   └── PhotoUploader.jsx    # Photo picker & drop zone
│   ├── data/
│   │   └── defaultTemplates.js  # Flyer dimensions & slot coordinates
│   ├── utils/
│   │   └── canvasRenderer.js    # Canvas rendering & 2K export engine
│   ├── App.jsx                  # Main coordinator
│   ├── index.css                # Tailwind CSS & custom styles
│   └── main.jsx                 # Entry point
├── dist/                        # Production build (deploy anywhere)
├── index.html                   # HTML template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 How to Run

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
The output will be in the `dist/` directory.

### Deploying
The `dist/` folder contains pure static files (`index.html`, JavaScript, CSS, and images). You can host it on any static hosting platform:
- **GitHub Pages**
- **Firebase Hosting** (`firebase deploy --only hosting`)
- **Cloudflare Pages**
- **Netlify** / **Vercel**
- **AWS S3 / CloudFront**
- Any standard web server (Apache, Nginx, cPanel)
