import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Move, 
  Sliders, 
  RotateCw, 
  Sparkles, 
  Check, 
  Trash2,
  HelpCircle,
  Eye
} from 'lucide-react';

export default function FrameCustomizerModal({
  isOpen,
  onClose,
  onSaveTemplate,
  existingTemplates = []
}) {
  const [flyerDataUrl, setFlyerDataUrl] = useState(null);
  const [templateName, setTemplateName] = useState('Singapore Celebration Flyer');
  const [heading, setHeading] = useState('Gurudev in Singapore, Dec 2026');
  const [subHeading, setSubHeading] = useState('Add your photo to the frame');
  const [heading2, setHeading2] = useState('Art of Being Happy');
  const [eventSubtitle, setEventSubtitle] = useState('6 December, Sands Expo & Convention Center');
  const [footerText, setFooterText] = useState('Art of Living, Singapore | Art of Being Happy with Gurudev Sri Sri Ravi Shankar');

  // Slot Configuration (in percentages for resolution-independence)
  const [slot, setSlot] = useState({
    xPercent: 25,
    yPercent: 49,
    widthPercent: 30,
    heightPercent: 37,
    rotation: 0,
    borderRadius: 4,
    shape: 'polaroid', // 'polaroid' | 'rect' | 'circle'
    tapeEffect: true,
    label: 'Add Your Photo Here'
  });

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'position' | 'text'
  const fileInputRef = useRef(null);
  const previewBoxRef = useRef(null);

  // Dragging the slot on preview
  const isDraggingSlot = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const startSlotPos = useRef({ xPercent: 25, yPercent: 49 });

  if (!isOpen) return null;

  const handleFlyerFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFlyerDataUrl(event.target.result);
        setActiveTab('position');
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag to reposition slot directly on the flyer preview
  const handleSlotMouseDown = (e) => {
    e.stopPropagation();
    isDraggingSlot.current = true;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    startSlotPos.current = { xPercent: slot.xPercent, yPercent: slot.yPercent };
  };

  const handlePreviewMouseMove = (e) => {
    if (!isDraggingSlot.current || !previewBoxRef.current) return;
    const rect = previewBoxRef.current.getBoundingClientRect();

    const deltaX = e.clientX - dragStartPos.current.x;
    const deltaY = e.clientY - dragStartPos.current.y;

    const deltaXPercent = (deltaX / rect.width) * 100;
    const deltaYPercent = (deltaY / rect.height) * 100;

    setSlot((prev) => ({
      ...prev,
      xPercent: Math.max(10, Math.min(90, Math.round(startSlotPos.current.xPercent + deltaXPercent))),
      yPercent: Math.max(10, Math.min(90, Math.round(startSlotPos.current.yPercent + deltaYPercent)))
    }));
  };

  const handleSlotMouseUp = () => {
    isDraggingSlot.current = false;
  };

  const handleSave = () => {
    const newTemplate = {
      id: 'custom-' + Date.now(),
      name: templateName,
      heading,
      subHeading,
      heading2,
      eventSubtitle,
      footerText,
      flyerUrl: flyerDataUrl, // base64 image
      width: 1200,
      height: 1200,
      aspectRatio: 1,
      slot: { ...slot },
      isCustom: true
    };

    onSaveTemplate(newTemplate);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onMouseUp={handleSlotMouseUp}
        onMouseMove={handlePreviewMouseMove}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/50">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#801414] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#c93b2b]" />
              <span>Flyer Studio · Upload & Configure Frame</span>
            </h2>
            <p className="text-xs text-stone-600">
              Upload your custom flyer design and set where people can add and zoom their photo.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Visual Flyer Preview & Slot Positioner */}
          <div className="md:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                Live Frame Preview
              </span>
              <span className="text-[11px] text-stone-500 flex items-center gap-1">
                <Move className="w-3 h-3 text-[#9b1b1b]" />
                Drag the framed box to position it
              </span>
            </div>

            {/* Flyer Preview Board */}
            <div 
              ref={previewBoxRef}
              className="relative w-full aspect-square bg-stone-100 rounded-2xl overflow-hidden border-2 border-stone-300 shadow-inner flex items-center justify-center select-none"
            >
              {flyerDataUrl ? (
                <img
                  src={flyerDataUrl}
                  alt="Custom Flyer"
                  className="w-full h-full object-contain pointer-events-none"
                />
              ) : (
                <div className="text-center p-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mb-3">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-800 mb-1">
                    No flyer design uploaded yet
                  </h4>
                  <p className="text-xs text-stone-500 max-w-xs mb-4">
                    Upload your campaign or event flyer (PNG, JPG) to configure the photo frame slot.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 rounded-xl bg-[#9b1b1b] text-white text-xs font-semibold hover:bg-[#801414] transition-colors"
                  >
                    Choose Flyer File
                  </button>
                </div>
              )}

              {/* Overlaid Draggable Photo Slot Box */}
              {flyerDataUrl && (
                <div
                  onMouseDown={handleSlotMouseDown}
                  style={{
                    position: 'absolute',
                    left: `${slot.xPercent}%`,
                    top: `${slot.yPercent}%`,
                    width: `${slot.widthPercent}%`,
                    height: `${slot.heightPercent}%`,
                    transform: `translate(-50%, -50%) rotate(${slot.rotation}deg)`,
                    borderRadius: slot.shape === 'circle' ? '50%' : `${slot.borderRadius}px`
                  }}
                  className="bg-white/90 backdrop-blur-xs border-2 border-dashed border-[#dc2626] shadow-xl cursor-move group transition-shadow hover:ring-2 hover:ring-[#dc2626]/40 flex flex-col items-center justify-center p-2"
                >
                  {/* Visual Tape Effect */}
                  {slot.tapeEffect && (
                    <div className="absolute -top-3 inset-x-0 mx-auto w-12 h-4 bg-amber-100/90 border border-amber-300/60 shadow-xs -rotate-2 pointer-events-none" />
                  )}

                  <div className="w-full h-full bg-amber-50/70 border border-stone-300 flex flex-col items-center justify-center text-center p-1 rounded">
                    <span className="text-base sm:text-lg">📷</span>
                    <span className="text-[10px] font-bold text-[#801414] leading-tight">
                      Photo Slot
                    </span>
                    <span className="text-[9px] text-stone-500">
                      {slot.widthPercent}% × {slot.heightPercent}%
                    </span>
                  </div>

                  <div className="absolute -bottom-6 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                    X: {slot.xPercent}% | Y: {slot.yPercent}% | {slot.rotation}°
                  </div>
                </div>
              )}
            </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFlyerFileChange}
                accept="image/*"
                className="hidden"
              />

            {flyerDataUrl && (
              <div className="w-full mt-3 flex justify-between items-center">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-semibold text-[#9b1b1b] hover:underline flex items-center gap-1"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change flyer file</span>
                </button>

                <button
                  onClick={() => setSlot({
                    xPercent: 25,
                    yPercent: 49,
                    widthPercent: 30,
                    heightPercent: 37,
                    rotation: 0,
                    borderRadius: 4,
                    shape: 'polaroid',
                    tapeEffect: true,
                    label: 'Add Your Photo Here'
                  })}
                  className="text-xs text-stone-500 hover:text-stone-800"
                >
                  Reset slot position
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Controls & Configuration */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {/* Template Title */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wide mb-1">
                  Design Name
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g. Rajyotsava 2026 Celebration"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#9b1b1b] focus:outline-none"
                />
              </div>

              {/* Slot Position & Size Controls */}
              <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 uppercase">
                    Photo Frame Slot Adjustments
                  </span>
                  <Sliders className="w-3.5 h-3.5 text-stone-500" />
                </div>

                {/* Width */}
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Frame Width</span>
                    <span className="font-mono font-bold">{slot.widthPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    value={slot.widthPercent}
                    onChange={(e) => setSlot(p => ({ ...p, widthPercent: parseInt(e.target.value) }))}
                    className="w-full accent-[#9b1b1b]"
                  />
                </div>

                {/* Height */}
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Frame Height</span>
                    <span className="font-mono font-bold">{slot.heightPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="70"
                    value={slot.heightPercent}
                    onChange={(e) => setSlot(p => ({ ...p, heightPercent: parseInt(e.target.value) }))}
                    className="w-full accent-[#9b1b1b]"
                  />
                </div>

                {/* Rotation / Tilt */}
                <div>
                  <div className="flex justify-between text-xs text-stone-600 mb-1">
                    <span>Tilt Angle (Rotation)</span>
                    <span className="font-mono font-bold">{slot.rotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="0.5"
                    value={slot.rotation}
                    onChange={(e) => setSlot(p => ({ ...p, rotation: parseFloat(e.target.value) }))}
                    className="w-full accent-[#9b1b1b]"
                  />
                </div>

                {/* Style & Shape */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Frame Style
                    </label>
                    <select
                      value={slot.shape}
                      onChange={(e) => setSlot(p => ({ ...p, shape: e.target.value }))}
                      className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="polaroid">Polaroid (Paper)</option>
                      <option value="rect">Clean Rectangle</option>
                      <option value="circle">Circle</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Tape Decor
                    </label>
                    <select
                      value={slot.tapeEffect ? 'yes' : 'no'}
                      onChange={(e) => setSlot(p => ({ ...p, tapeEffect: e.target.value === 'yes' }))}
                      className="w-full px-2 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    >
                      <option value="yes">With Tape Pinned</option>
                      <option value="no">Clean (No Tape)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Event Text Customization */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-700 uppercase block">
                  Header & Event Details
                </span>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Heading</label>
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="e.g. Gurudev in Singapore, Dec 2026"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Sub-heading</label>
                  <input
                    type="text"
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                    placeholder="e.g. Add your photo to the frame"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Heading 2</label>
                  <input
                    type="text"
                    value={heading2}
                    onChange={(e) => setHeading2(e.target.value)}
                    placeholder="e.g. Art of Being Happy"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Event Details</label>
                  <input
                    type="text"
                    value={eventSubtitle}
                    onChange={(e) => setEventSubtitle(e.target.value)}
                    placeholder="e.g. 6 December, Sands Expo & Convention Center"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-stone-600 mb-0.5">Footer</label>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    placeholder="e.g. Art of Living, Singapore | Art of Being Happy with Gurudev Sri Sri Ravi Shankar"
                    className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Modal Bottom Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!flyerDataUrl}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#9b1b1b] hover:bg-[#801414] active:scale-[0.99] disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md"
              >
                <Check className="w-4 h-4" />
                <span>Save & Activate Design</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
