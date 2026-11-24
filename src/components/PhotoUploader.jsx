import React, { useRef } from 'react';
import { Camera, RefreshCw, Trash2 } from 'lucide-react';

export default function PhotoUploader({
  hasUserImage,
  onImageSelected,
  onRemoveImage,
  fileInputRef,
  lang = 'en'
}) {
  const localInputRef = useRef(null);
  const inputRef = fileInputRef || localInputRef;
  const isZh = lang === 'zh';

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please choose an image file (JPEG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        onImageSelected(img);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-[#e8ded4]"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#5a4e46] uppercase mb-3">
        {isZh ? '2 · ADD YOUR PHOTO / 添加照片' : '2 · ADD YOUR PHOTO'}
      </h3>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Main Choose Photo Button */}
      {!hasUserImage ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full py-3.5 px-4 rounded-xl border-2 border-[#9b1b1b] text-[#9b1b1b] bg-white hover:bg-amber-50/50 active:bg-amber-100/50 font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow"
        >
          <Camera className="w-5 h-5 text-[#9b1b1b]" />
          <span>{isZh ? '选择照片 (Choose photo)' : 'Choose photo'}</span>
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button
            onClick={() => inputRef.current?.click()}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-[#9b1b1b] text-[#9b1b1b] bg-amber-50/40 hover:bg-amber-100/60 font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isZh ? '更换照片 (Change photo)' : 'Change photo'}</span>
          </button>
          
          <button
            onClick={onRemoveImage}
            className="p-3 rounded-xl border border-stone-200 text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Remove photo"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Helper text matching reference design */}
      <p className="text-xs text-[#7a6f68] mt-3 leading-relaxed">
        {isZh 
          ? '拖动照片调整位置。使用滑块、鼠标滚轮或双指缩放照片。'
          : 'Drag the photo to position it. Pinch, scroll or use the slider to zoom.'
        }
      </p>
    </div>
  );
}
