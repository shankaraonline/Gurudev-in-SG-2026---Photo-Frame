import { renderFlyerBackground } from './flyerArtwork.js';

/**
 * Calculates absolute pixel metrics from template percentages
 */
export function getSlotDimensions(template, canvasWidth, canvasHeight) {
  const slot = template.slot || {
    xPercent: 23.3,
    yPercent: 69.8,
    widthPercent: 34.26,
    heightPercent: 33.98,
    rotation: -10.5,
    borderRadius: 4,
    shape: 'rect',
    label: 'Add Your Photo Here'
  };

  const cx = (slot.xPercent / 100) * canvasWidth;
  const cy = (slot.yPercent / 100) * canvasHeight;
  const width = (slot.widthPercent / 100) * canvasWidth;
  const height = (slot.heightPercent / 100) * canvasHeight;
  const rotationRad = ((slot.rotation || 0) * Math.PI) / 180;

  return {
    cx,
    cy,
    width,
    height,
    rotationRad,
    rotationDeg: slot.rotation || 0,
    borderRadius: (slot.borderRadius || 4) * (canvasWidth / 1024),
    shape: slot.shape || 'rect',
    tapeEffect: slot.tapeEffect === true,
    label: slot.label || 'Add Your Photo Here',
    sublabel: slot.sublabel || 'Tap to choose photo'
  };
}

/**
 * Main draw function used by both live preview canvas and high-res download exporter
 */
export function renderCanvas({
  ctx,
  width,
  height,
  template,
  customFlyerImg = null,
  userImg = null,
  userTransform = { scale: 1, x: 0, y: 0, rotation: 0 },
  isExport = false
}) {
  ctx.save();
  ctx.clearRect(0, 0, width, height);

  // High quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Draw Flyer Background
  if (customFlyerImg && customFlyerImg.complete && customFlyerImg.naturalWidth > 0) {
    ctx.drawImage(customFlyerImg, 0, 0, width, height);
  } else {
    renderFlyerBackground(ctx, template, width, height);
  }

  // 2. Compute Slot Dimensions
  const slot = getSlotDimensions(template, width, height);

  // 3. Render Photo Slot
  drawPhotoSlot({
    ctx,
    slot,
    userImg,
    userTransform,
    isExport,
    canvasWidth: width
  });

  ctx.restore();
}

/**
 * Renders the photo slot cleanly inside the polaroid frame
 */
function drawPhotoSlot({ ctx, slot, userImg, userTransform, isExport, canvasWidth }) {
  const { cx, cy, width, height, rotationRad, borderRadius = 4 } = slot;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rotationRad);

  const halfW = width / 2;
  const halfH = height / 2;

  if (!userImg || !userImg.complete || userImg.naturalWidth === 0) {
    // Empty state: Clean interactive placeholder over the cloud/hill illustration
    ctx.save();
    // Semi-transparent warm backing
    ctx.fillStyle = 'rgba(255, 255, 255, 0.90)';
    drawRoundedRect(ctx, -halfW, -halfH, width, height, borderRadius);
    ctx.fill();

    // Subtle dashed border
    ctx.strokeStyle = '#c4b5a2';
    ctx.lineWidth = Math.max(2, width * 0.012);
    ctx.setLineDash([width * 0.035, width * 0.025]);
    drawRoundedRect(ctx, -halfW, -halfH, width, height, borderRadius);
    ctx.stroke();
    ctx.setLineDash([]);

    // Camera / Picture icon in center
    const iconScale = Math.min(width, height) * 0.28;
    drawPlaceholderIcon(ctx, 0, -height * 0.12, iconScale);

    // Label: "Add Your Photo Here" or "在此添加您的照片"
    const isZh = slot.label && slot.label.includes('照片');
    ctx.fillStyle = '#451a03';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.max(14, Math.round(width * 0.066))}px Inter, sans-serif`;
    
    if (isZh) {
      ctx.fillText('在此添加', 0, height * 0.14);
      ctx.fillText('您的照片', 0, height * 0.26);
    } else {
      ctx.fillText('Add Your', 0, height * 0.14);
      ctx.fillText('Photo Here', 0, height * 0.25);
    }

    // Helper text
    ctx.fillStyle = '#8c7e75';
    ctx.font = `500 ${Math.max(10, Math.round(width * 0.04))}px Inter, sans-serif`;
    ctx.fillText(slot.sublabel || (isZh ? '点击选择照片' : 'Tap to choose photo'), 0, height * 0.38);

    ctx.restore();
  } else {
    // User Photo is uploaded: Clip to the exact photo area inside the polaroid
    ctx.save();
    ctx.beginPath();
    drawRoundedRect(ctx, -halfW, -halfH, width, height, borderRadius);
    ctx.clip();

    // Dark background behind photo in case of scaling
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(-halfW, -halfH, width, height);

    // Scale user translation proportionally from base 1024px canvas to current canvas
    const scaleRatio = canvasWidth / 1024;
    const transX = (userTransform.x || 0) * scaleRatio;
    const transY = (userTransform.y || 0) * scaleRatio;

    ctx.translate(transX, transY);
    ctx.rotate(((userTransform.rotation || 0) * Math.PI) / 180);

    // Base scale to cover the frame window
    const scaleCover = Math.max(
      width / userImg.naturalWidth,
      height / userImg.naturalHeight
    );
    const finalScale = scaleCover * (userTransform.scale || 1);

    const drawW = userImg.naturalWidth * finalScale;
    const drawH = userImg.naturalHeight * finalScale;

    ctx.drawImage(userImg, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();

    // Subtle inner border for crisp blending with the polaroid paper
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.lineWidth = Math.max(1.5, width * 0.008);
    drawRoundedRect(ctx, -halfW, -halfH, width, height, borderRadius);
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
}

/**
 * Draws placeholder picture/mountain icon
 */
function drawPlaceholderIcon(ctx, cx, cy, size) {
  ctx.save();
  ctx.translate(cx, cy);

  ctx.fillStyle = '#9c8c7c';
  ctx.strokeStyle = '#9c8c7c';
  ctx.lineWidth = size * 0.08;

  // Outer rounded frame for icon
  const boxW = size;
  const boxH = size * 0.8;
  drawRoundedRect(ctx, -boxW / 2, -boxH / 2, boxW, boxH, size * 0.12);
  ctx.stroke();

  // Sun / Circle in icon
  ctx.beginPath();
  ctx.arc(-boxW * 0.2, -boxH * 0.15, size * 0.12, 0, Math.PI * 2);
  ctx.fill();

  // Mountains in icon
  ctx.beginPath();
  ctx.moveTo(-boxW * 0.4, boxH * 0.35);
  ctx.lineTo(-boxW * 0.1, -boxH * 0.05);
  ctx.lineTo(boxW * 0.1, boxH * 0.15);
  ctx.lineTo(boxW * 0.25, -boxH * 0.02);
  ctx.lineTo(boxW * 0.42, boxH * 0.35);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * Helper to draw a rounded rectangle path
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.lineTo(x + width, y + height - r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.lineTo(x + r, y + height);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

/**
 * High-resolution export helper: returns a Promise<Blob>
 * Renders at exact 2048x2048 (2x scale) with perfectly proportional transforms
 */
export async function exportHighResFlyer({
  template,
  customFlyerImg = null,
  userImg = null,
  userTransform = { scale: 1, x: 0, y: 0, rotation: 0 },
  targetWidth = 2048 // Full 2K Master Export
}) {
  const offscreen = document.createElement('canvas');
  const targetHeight = targetWidth; // Square 1:1
  offscreen.width = targetWidth;
  offscreen.height = targetHeight;

  const ctx = offscreen.getContext('2d');

  renderCanvas({
    ctx,
    width: targetWidth,
    height: targetHeight,
    template,
    customFlyerImg,
    userImg,
    userTransform, // pass userTransform directly, scaled by canvasWidth / 1024 inside renderCanvas!
    isExport: true
  });

  return new Promise((resolve) => {
    offscreen.toBlob((blob) => {
      resolve(blob);
    }, 'image/png');
  });
}
