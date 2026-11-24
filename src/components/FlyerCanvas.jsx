import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Maximize2, Move } from 'lucide-react';
import { renderCanvas, getSlotDimensions } from '../utils/canvasRenderer';

export default function FlyerCanvas({
  template,
  customFlyerImg,
  userImg,
  userTransform,
  setUserTransform,
  onPickPhoto
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Interaction dragging & touch pinch state
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialTransformRef = useRef({ x: 0, y: 0 });
  const touchDistanceRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Internal canvas resolution matching native 1024x1024 flyer
  const BASE_WIDTH = 1024;
  const BASE_HEIGHT = 1024;

  // Render canvas whenever template, user image, or transform changes
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    renderCanvas({
      ctx,
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      template,
      customFlyerImg,
      userImg,
      userTransform,
      isExport: false
    });
  }, [template, customFlyerImg, userImg, userTransform, BASE_WIDTH, BASE_HEIGHT]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  // Handle Resize for responsive canvas
  useEffect(() => {
    const handleResize = () => redraw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redraw]);

  // Mouse & Touch Pan Handling
  const handlePointerDown = (e) => {
    if (!userImg) {
      // If no photo, click to upload
      onPickPhoto();
      return;
    }

    isDraggingRef.current = true;
    setIsInteracting(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    dragStartRef.current = { x: clientX, y: clientY };
    initialTransformRef.current = { x: userTransform.x, y: userTransform.y };

    if (e.touches && e.touches.length === 2) {
      // Initialize pinch distance
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchDistanceRef.current = Math.hypot(dx, dy);
    }
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current || !userImg) return;

    // Handle touch pinch
    if (e.touches && e.touches.length === 2 && touchDistanceRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const newDist = Math.hypot(dx, dy);
      const ratio = newDist / touchDistanceRef.current;

      setUserTransform((prev) => ({
        ...prev,
        scale: Math.max(0.4, Math.min(4.0, prev.scale * ratio))
      }));
      touchDistanceRef.current = newDist;
      return;
    }

    // Pan movement - direct 1:1 screen-to-canvas mapping
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const canvasPerScreen = BASE_WIDTH / rect.width;

    const screenDeltaX = (clientX - dragStartRef.current.x) * canvasPerScreen;
    const screenDeltaY = (clientY - dragStartRef.current.y) * canvasPerScreen;

    // Account for polaroid frame tilt (-10.5 degrees) so movement directly follows mouse/touch
    const rotRad = ((template.slot?.rotation || -10.5) * Math.PI) / 180;
    const localDeltaX = screenDeltaX * Math.cos(rotRad) + screenDeltaY * Math.sin(rotRad);
    const localDeltaY = -screenDeltaX * Math.sin(rotRad) + screenDeltaY * Math.cos(rotRad);

    setUserTransform((prev) => ({
      ...prev,
      x: initialTransformRef.current.x + localDeltaX,
      y: initialTransformRef.current.y + localDeltaY
    }));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    touchDistanceRef.current = null;
    setIsInteracting(false);
  };

  // Wheel zoom
  const handleWheel = (e) => {
    if (!userImg) return;
    e.preventDefault();
    const zoomDelta = e.deltaY * -0.0015;
    setUserTransform((prev) => ({
      ...prev,
      scale: Math.max(0.4, Math.min(4.0, prev.scale + zoomDelta))
    }));
  };

  // Zoom Slider & Button Helpers
  const handleZoomSliderChange = (e) => {
    const newScale = parseFloat(e.target.value);
    setUserTransform((prev) => ({ ...prev, scale: newScale }));
  };

  const handleRotate = () => {
    setUserTransform((prev) => ({
      ...prev,
      rotation: (prev.rotation + 90) % 360
    }));
  };

  const handleReset = () => {
    setUserTransform({
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Canvas Frame Card */}
      <div 
        ref={containerRef}
        className={`relative w-full aspect-square bg-white rounded-2xl p-2 sm:p-3 shadow-card hover:shadow-card-lg transition-all duration-300 border border-[#e8ded4] overflow-hidden ${
          !userImg ? 'cursor-pointer hover:border-[#c93b2b]/40' : isInteracting ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
        onWheel={handleWheel}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); handlePointerUp(); }}
      >
        <canvas
          ref={canvasRef}
          width={BASE_WIDTH}
          height={BASE_HEIGHT}
          className="w-full h-full object-contain rounded-xl block canvas-wrapper select-none"
        />

        {/* Floating helper badges */}
        {!userImg && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Subtle pulsate border around canvas */}
            <div className="bg-[#801414]/90 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-2 animate-bounce">
              <span>Tap to choose your photo</span>
            </div>
          </div>
        )}

        {userImg && isHovering && (
          <div className="absolute top-4 right-4 pointer-events-none bg-black/60 text-white text-[11px] px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center gap-1.5 opacity-90 transition-opacity">
            <Move className="w-3 h-3" />
            <span>Drag to position photo</span>
          </div>
        )}
      </div>

      {/* Toolbar Controls below canvas: Zoom & Rotate */}
      <div className="w-full mt-3 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-[#e8ded4] shadow-sm flex items-center justify-between gap-3 sm:gap-4">
        {/* Zoom Slider */}
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs font-semibold text-[#5a4e46] min-w-[36px]">Zoom</span>
          <ZoomOut 
            className="w-3.5 h-3.5 text-[#8c7e75] cursor-pointer hover:text-[#9b1b1b]" 
            onClick={() => setUserTransform(p => ({ ...p, scale: Math.max(0.4, p.scale - 0.15) }))}
          />
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.05"
            value={userTransform.scale}
            onChange={handleZoomSliderChange}
            disabled={!userImg}
            className="flex-1 h-1.5 accent-[#9b1b1b] cursor-pointer disabled:opacity-40"
            title="Zoom photo in or out"
          />
          <ZoomIn 
            className="w-3.5 h-3.5 text-[#8c7e75] cursor-pointer hover:text-[#9b1b1b]" 
            onClick={() => setUserTransform(p => ({ ...p, scale: Math.min(3.5, p.scale + 0.15) }))}
          />
          <span className="text-[11px] font-mono text-[#8c7e75] w-9 text-right">
            {Math.round(userTransform.scale * 100)}%
          </span>
        </div>

        {/* Rotate & Reset Buttons */}
        <div className="flex items-center gap-1.5 border-l border-[#e8ded4] pl-3">
          <button
            onClick={handleRotate}
            disabled={!userImg}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#5a4e46] hover:text-[#9b1b1b] hover:bg-amber-50 active:bg-amber-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
            title="Rotate photo 90 degrees"
          >
            <RotateCw className="w-3.5 h-3.5 text-[#9b1b1b]" />
            <span>Rotate</span>
          </button>

          <button
            onClick={handleReset}
            disabled={!userImg}
            className="inline-flex items-center p-1.5 rounded-lg text-xs font-medium text-[#7a6f68] hover:text-[#9b1b1b] hover:bg-amber-50 disabled:opacity-30 transition-colors"
            title="Reset position & zoom"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
