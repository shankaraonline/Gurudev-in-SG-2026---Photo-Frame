/**
 * Generates rich, crisp procedural SVG & canvas artwork for the flyer templates
 * based closely on the user's reference screenshot:
 * - Red & Yellow Karnataka gradient & map silhouette
 * - Jog falls and Mysore Palace heritage motifs
 * - Gurudev portrait in traditional white attire
 * - Elegant calligraphy & Karnataka Rajyotsava typography
 * - Date badge (29th NOV | Bengaluru)
 * - Folk drum artist (Dollu Kunitha)
 */

export function renderFlyerBackground(ctx, template, width, height) {
  // Clear canvas
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  const theme = template.theme || 'karnataka';

  // 1. Warm cream paper texture base
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#fefbf4');
  bgGrad.addColorStop(0.5, '#fbf5e7');
  bgGrad.addColorStop(1, '#f7edd7');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Decorative border vignette
  ctx.strokeStyle = '#e8d9c5';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, width - 14, height - 14);

  // Inner thin border
  ctx.strokeStyle = '#dfc8b0';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, width - 40, height - 40);

  // 2. Top Header Artwork: The Art of Living Sun Logo
  drawAolLogo(ctx, 130, 80);

  // 3. Heritage Monuments at Top Right (Mysore Palace / Stone Chariot)
  drawHeritageSkyline(ctx, width, height);

  // 4. Vibrant Karnataka Map Silhouette (Yellow & Red splash)
  drawKarnatakaMapSplash(ctx, width, height, theme);

  // 5. Gurudev's Radiant Portrait Silhouette / Illustration
  drawGurudevPortrait(ctx, width, height);

  // 6. Typography & Banners
  drawFlyerTypography(ctx, width, height, template);

  // 7. Bottom Elements: Folk Drummer (Dollu Kunitha) & Flowers
  drawFolkElements(ctx, width, height);

  // 8. Event Date Badge ("29th NOV | Bengaluru")
  drawEventBadge(ctx, width, height);

  ctx.restore();
}

function drawAolLogo(ctx, cx, cy) {
  ctx.save();
  // Sunburst
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(cx, cy - 8, 16, Math.PI, 0, false);
  ctx.fill();

  // Rays
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 9; i++) {
    const angle = Math.PI + (i * Math.PI) / 8;
    const x1 = cx + Math.cos(angle) * 18;
    const y1 = cy - 8 + Math.sin(angle) * 18;
    const x2 = cx + Math.cos(angle) * 28;
    const y2 = cy - 8 + Math.sin(angle) * 28;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  // Text
  ctx.fillStyle = '#451a03';
  ctx.font = 'bold 12px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('THE ART OF LIVING', cx, cy + 18);
  ctx.restore();
}

function drawHeritageSkyline(ctx, w, h) {
  ctx.save();
  // Mysore Palace golden domes illustration at top-right
  const startX = w * 0.42;
  const topY = 40;
  
  // Jog Falls soft water cascade visual on top left
  const waterGrad = ctx.createLinearGradient(startX - 220, topY, startX - 80, topY + 120);
  waterGrad.addColorStop(0, 'rgba(56, 189, 248, 0.25)');
  waterGrad.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
  ctx.fillStyle = waterGrad;
  ctx.beginPath();
  ctx.roundRect(startX - 230, topY + 20, 160, 100, 12);
  ctx.fill();

  // Palace silhouettes (warm golden brown with arch details)
  ctx.fillStyle = '#b45309';
  ctx.globalAlpha = 0.85;

  // Center grand dome
  ctx.beginPath();
  ctx.arc(startX + 180, topY + 90, 40, Math.PI, 0);
  ctx.fill();
  // Center finial
  ctx.fillRect(startX + 178, topY + 32, 4, 20);

  // Left & Right twin domes
  ctx.beginPath();
  ctx.arc(startX + 90, topY + 105, 25, Math.PI, 0);
  ctx.arc(startX + 270, topY + 105, 25, Math.PI, 0);
  ctx.fill();

  // Palace pillar arcade
  ctx.fillRect(startX + 50, topY + 115, 280, 45);
  ctx.fillStyle = '#78350f';
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(startX + 75 + i * 38, topY + 135, 12, Math.PI, 0);
    ctx.fill();
  }

  // Hampi Stone Chariot wheel / temple tower at right
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  ctx.moveTo(w - 180, topY + 150);
  ctx.lineTo(w - 140, topY + 60);
  ctx.lineTo(w - 100, topY + 150);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawKarnatakaMapSplash(ctx, w, h, theme) {
  ctx.save();
  // Vibrant yellow Karnataka map silhouette splash
  const cx = w * 0.38;
  const cy = h * 0.38;

  // Golden Yellow splash behind
  const yellowGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 320);
  yellowGrad.addColorStop(0, '#facc15');
  yellowGrad.addColorStop(0.7, '#eab308');
  yellowGrad.addColorStop(1, 'rgba(234, 179, 8, 0)');

  ctx.fillStyle = yellowGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, 300, 0, Math.PI * 2);
  ctx.fill();

  // Red Karnataka flag energetic swoop
  const redGrad = ctx.createLinearGradient(cx - 200, cy + 100, cx + 250, cy - 80);
  redGrad.addColorStop(0, '#dc2626');
  redGrad.addColorStop(0.5, '#b91c1c');
  redGrad.addColorStop(1, '#991b1b');

  ctx.fillStyle = redGrad;
  ctx.beginPath();
  ctx.moveTo(w * 0.08, h * 0.65);
  ctx.bezierCurveTo(w * 0.25, h * 0.60, w * 0.35, h * 0.70, w * 0.55, h * 0.55);
  ctx.bezierCurveTo(w * 0.70, h * 0.45, w * 0.65, h * 0.35, w * 0.60, h * 0.30);
  ctx.bezierCurveTo(w * 0.40, h * 0.42, w * 0.20, h * 0.48, w * 0.08, h * 0.65);
  ctx.closePath();
  ctx.fill();

  // Flag ribbon accent on bottom-left
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(w * 0.08, h * 0.66);
  ctx.bezierCurveTo(w * 0.18, h * 0.63, w * 0.28, h * 0.68, w * 0.38, h * 0.62);
  ctx.lineTo(w * 0.35, h * 0.66);
  ctx.bezierCurveTo(w * 0.25, h * 0.71, w * 0.16, h * 0.66, w * 0.08, h * 0.69);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawGurudevPortrait(ctx, w, h) {
  ctx.save();
  // Gurudev image representation on right
  const px = w * 0.72;
  const py = h * 0.46;
  const radius = 175;

  // Soft halo behind
  const haloGrad = ctx.createRadialGradient(px, py - 30, 40, px, py - 30, 220);
  haloGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
  haloGrad.addColorStop(0.5, 'rgba(253, 224, 71, 0.4)');
  haloGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = haloGrad;
  ctx.beginPath();
  ctx.arc(px, py - 30, 220, 0, Math.PI * 2);
  ctx.fill();

  // Clip to portrait circle/oval
  ctx.save();
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.clip();

  // Warm background in circle
  const portraitBg = ctx.createLinearGradient(px - radius, py - radius, px + radius, py + radius);
  portraitBg.addColorStop(0, '#fef3c7');
  portraitBg.addColorStop(1, '#fde68a');
  ctx.fillStyle = portraitBg;
  ctx.fillRect(px - radius, py - radius, radius * 2, radius * 2);

  // Traditional robes & serene smiling persona artistic silhouette
  // Flowing white robes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(px - 140, py + 180);
  ctx.quadraticCurveTo(px - 80, py + 80, px - 40, py + 40);
  ctx.quadraticCurveTo(px, py + 60, px + 50, py + 40);
  ctx.quadraticCurveTo(px + 100, py + 90, px + 150, py + 180);
  ctx.closePath();
  ctx.fill();

  // Orange & Red stole (Angavastram) border
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 9;
  ctx.beginPath();
  ctx.moveTo(px + 45, py + 45);
  ctx.lineTo(px + 120, py + 180);
  ctx.stroke();

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(px + 52, py + 45);
  ctx.lineTo(px + 128, py + 180);
  ctx.stroke();

  // Serene Face
  const faceY = py - 40;
  ctx.fillStyle = '#f6cfa9';
  ctx.beginPath();
  ctx.ellipse(px, faceY, 52, 62, 0, 0, Math.PI * 2);
  ctx.fill();

  // Flowing beard & hair (classic long hair and white/grey beard)
  ctx.fillStyle = '#6b7280';
  ctx.beginPath();
  // Hair on sides
  ctx.arc(px, faceY - 20, 64, Math.PI * 0.8, Math.PI * 2.2);
  ctx.fill();

  // White flowing beard
  const beardGrad = ctx.createLinearGradient(px, faceY + 10, px, faceY + 110);
  beardGrad.addColorStop(0, '#9ca3af');
  beardGrad.addColorStop(0.3, '#e5e7eb');
  beardGrad.addColorStop(1, '#ffffff');
  ctx.fillStyle = beardGrad;
  ctx.beginPath();
  ctx.moveTo(px - 45, faceY + 15);
  ctx.quadraticCurveTo(px - 55, faceY + 80, px, faceY + 115);
  ctx.quadraticCurveTo(px + 55, faceY + 80, px + 45, faceY + 15);
  ctx.closePath();
  ctx.fill();

  // Forehead Kumkum / Tilak
  ctx.fillStyle = '#b91c1c';
  ctx.beginPath();
  ctx.arc(px, faceY - 22, 4.5, 0, Math.PI * 2);
  ctx.fill();

  // Smiling warm eyes
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  ctx.arc(px - 20, faceY - 12, 10, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + 20, faceY - 12, 10, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();

  // Gentle smile
  ctx.strokeStyle = '#991b1b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(px, faceY + 16, 14, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  ctx.restore(); // end clip

  // Radiant gold border around Gurudev portrait
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(px, py, radius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

function drawFlyerTypography(ctx, w, h, template) {
  ctx.save();

  // 1. Event Sub-banner above main title
  ctx.save();
  ctx.translate(w * 0.44, h * 0.31);
  ctx.rotate(-0.04);

  ctx.fillStyle = '#1e1b18';
  ctx.font = 'italic 700 26px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('Gurudev in Singapore · Dec 2026', 0, 0);
  ctx.restore();

  // 2. Main Event Title: "Art of" "Being Happy"
  ctx.fillStyle = '#dc2626';
  ctx.font = '800 52px "Noto Sans", Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Art of', w * 0.38, h * 0.41);

  // "Being Happy"
  ctx.save();
  ctx.shadowColor = 'rgba(120, 20, 20, 0.3)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = '#7f1d1d';
  ctx.font = 'italic 900 60px "Brush Script MT", "Caveat", cursive, Georgia, serif';
  ctx.fillText('Being Happy', w * 0.38, h * 0.47);
  ctx.restore();

  // 3. Center-bottom Event Banner
  ctx.textAlign = 'center';
  ctx.fillStyle = '#7f1d1d';
  ctx.font = 'bold 36px "Inter", sans-serif';
  ctx.fillText(template.heading2 || 'Art of Being Happy', w * 0.42, h * 0.68);

  ctx.fillStyle = '#572018';
  ctx.font = '600 22px Inter, sans-serif';
  ctx.fillText(template.eventSubtitle || '6 December, Sands Expo & Convention Center', w * 0.42, h * 0.72);

  ctx.restore();
}

function drawEventBadge(ctx, w, h) {
  ctx.save();
  const bx = w * 0.42;
  const by = h * 0.58;

  // Calendar Icon Box
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 3;
  ctx.strokeRect(bx - 120, by - 40, 50, 48);

  // Calendar top bar
  ctx.fillStyle = '#92400e';
  ctx.fillRect(bx - 120, by - 40, 50, 14);

  // Text inside calendar: 6
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 22px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('6', bx - 95, by - 6);

  // Vertical divider line
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bx - 55, by - 40);
  ctx.lineTo(bx - 55, by + 12);
  ctx.stroke();

  // Date Text: 6th DEC
  ctx.textAlign = 'left';
  ctx.fillStyle = '#78350f';
  ctx.font = '800 36px Inter, sans-serif';
  ctx.fillText('6th', bx - 45, by - 12);

  ctx.font = '700 24px Inter, sans-serif';
  ctx.fillText('DEC', bx - 45, by + 12);

  // Singapore Ribbon at bottom center
  const ribbonX = w * 0.42;
  const ribbonY = h * 0.78;
  const rw = 260;
  const rh = 40;

  const ribbonGrad = ctx.createLinearGradient(ribbonX - rw/2, ribbonY, ribbonX + rw/2, ribbonY);
  ribbonGrad.addColorStop(0, '#7f1d1d');
  ribbonGrad.addColorStop(0.5, '#991b1b');
  ribbonGrad.addColorStop(1, '#7f1d1d');

  ctx.fillStyle = ribbonGrad;
  ctx.beginPath();
  ctx.roundRect(ribbonX - rw/2, ribbonY - rh/2, rw, rh, 20);
  ctx.fill();

  // Location pin icon + Singapore
  ctx.fillStyle = '#fef08a';
  ctx.beginPath();
  ctx.arc(ribbonX - 65, ribbonY, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Singapore', ribbonX + 10, ribbonY + 7);

  // Helper text: "Tap the photo box to add your photo"
  ctx.fillStyle = '#ffffff';
  ctx.font = '600 15px Inter, sans-serif';
  ctx.fillText('Tap the photo box to add your photo', ribbonX, ribbonY + 36);

  ctx.restore();
}

function drawFolkElements(ctx, w, h) {
  ctx.save();
  // Bottom Left: Folk Drummer (Dollu Kunitha artist) & Marigold flowers
  const fx = w * 0.12;
  const fy = h * 0.74;

  // Drummer silhouette outline
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;

  // Turban
  ctx.beginPath();
  ctx.ellipse(fx, fy - 60, 22, 14, 0, 0, Math.PI * 2);
  ctx.stroke();

  // Head
  ctx.beginPath();
  ctx.arc(fx, fy - 45, 12, 0, Math.PI * 2);
  ctx.stroke();

  // Torso
  ctx.beginPath();
  ctx.moveTo(fx, fy - 33);
  ctx.lineTo(fx, fy);
  ctx.stroke();

  // Drum (Dollu)
  ctx.fillStyle = '#d97706';
  ctx.beginPath();
  ctx.ellipse(fx + 10, fy - 10, 28, 20, 0.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Drum rim ropes
  ctx.beginPath();
  ctx.moveTo(fx - 14, fy - 22);
  ctx.lineTo(fx + 30, fy);
  ctx.stroke();

  // Yakshagana Crown ornament on right
  const yx = w * 0.58;
  const yy = h * 0.72;
  ctx.strokeStyle = '#92400e';
  ctx.beginPath();
  ctx.arc(yx, yy, 36, 0, Math.PI * 2);
  ctx.stroke();
  for (let a = 0; a < Math.PI * 2; a += Math.PI / 8) {
    ctx.moveTo(yx + Math.cos(a) * 36, yy + Math.sin(a) * 36);
    ctx.lineTo(yx + Math.cos(a) * 48, yy + Math.sin(a) * 48);
  }
  ctx.stroke();

  // Marigold & Jasmine decorative floral garlands at bottom left
  const flowerColors = ['#f59e0b', '#dc2626', '#fef08a', '#ea580c'];
  for (let i = 0; i < 18; i++) {
    const flX = 40 + (i * 22) + (Math.sin(i * 1.5) * 12);
    const flY = h - 60 + (Math.cos(i * 1.8) * 18);
    ctx.fillStyle = flowerColors[i % flowerColors.length];
    ctx.beginPath();
    ctx.arc(flX, flY, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#b45309';
    ctx.beginPath();
    ctx.arc(flX, flY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stone Fort / Chariot pillars at bottom right
  ctx.fillStyle = '#78350f';
  ctx.globalAlpha = 0.8;
  ctx.fillRect(w - 240, h - 180, 50, 140);
  ctx.fillRect(w - 180, h - 210, 60, 170);
  ctx.fillRect(w - 110, h - 160, 70, 120);

  ctx.restore();
}
