import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FlyerCanvas from './components/FlyerCanvas';
import CreativeSelector from './components/CreativeSelector';
import PhotoUploader from './components/PhotoUploader';
import ActionButtons from './components/ActionButtons';
import { 
  DEFAULT_TEMPLATES, 
  STORAGE_KEY_ACTIVE_TEMPLATE 
} from './data/defaultTemplates';
import { exportHighResFlyer } from './utils/canvasRenderer';

export default function App() {
  // Active creative language selection: 'singapore-en' | 'singapore-zh'
  const [activeTemplateId, setActiveTemplateId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_ACTIVE_TEMPLATE) || DEFAULT_TEMPLATES[0].id;
    } catch {
      return DEFAULT_TEMPLATES[0].id;
    }
  });

  const activeTemplate = DEFAULT_TEMPLATES.find((t) => t.id === activeTemplateId) || DEFAULT_TEMPLATES[0];

  // Preload both English & Chinese flyer images for instant, flicker-free switching
  const [cachedImages, setCachedImages] = useState({});

  useEffect(() => {
    DEFAULT_TEMPLATES.forEach((tmpl) => {
      const img = new Image();
      img.onload = () => {
        setCachedImages((prev) => ({ ...prev, [tmpl.id]: img }));
      };
      img.src = tmpl.flyerUrl;
    });
  }, []);

  const customFlyerImg = cachedImages[activeTemplate.id] || null;

  // User uploaded photo & transform state (preserved across creative switches!)
  const [userImg, setUserImg] = useState(null);
  const [userTransform, setUserTransform] = useState({
    scale: 1,
    x: 0,
    y: 0,
    rotation: 0
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Hidden file input ref
  const fileInputRef = useRef(null);

  // Switch between English and Chinese creative
  const handleSelectTemplate = (id) => {
    setActiveTemplateId(id);
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE_TEMPLATE, id);
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  };

  // User photo selection
  const handleImageSelected = (img) => {
    setUserImg(img);
    // Reset transform centered with 1.0 scale
    setUserTransform({
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0
    });
  };

  const handleRemoveImage = () => {
    setUserImg(null);
    setUserTransform({
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0
    });
  };

  // High resolution download handler
  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      const blob = await exportHighResFlyer({
        template: activeTemplate,
        customFlyerImg,
        userImg,
        userTransform,
        targetWidth: 2048 // Full 2K Master Export
      });

      if (!blob) throw new Error('Failed to create flyer image blob');

      const isZh = activeTemplate.lang === 'zh';
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const filename = isZh 
        ? 'kuai-le-de-yi-shu-singapore-attending.png' 
        : 'the-art-of-being-happy-singapore-attending.png';
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error('Download error:', err);
      alert('Could not generate the flyer. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Social share handler (Web Share API with file attachment + WhatsApp fallback)
  const handleShare = async () => {
    setIsProcessing(true);
    try {
      const blob = await exportHighResFlyer({
        template: activeTemplate,
        customFlyerImg,
        userImg,
        userTransform,
        targetWidth: 1600
      });

      const isZh = activeTemplate.lang === 'zh';
      const filename = isZh 
        ? `kuai-le-de-yi-shu-${Date.now()}.png` 
        : `the-art-of-being-happy-${Date.now()}.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      const shareTitle = isZh
        ? '古儒德夫尊者 2026年12月到访新加坡 · 快乐的艺术'
        : 'Gurudev in Singapore, Dec 2026 - The Art of Being Happy';

      const shareDesc = isZh
        ? '我会参加2026年12月6日新加坡滨海湾金沙《快乐的艺术》大师面对面！这是我的专属海报：'
        : 'I am attending The Art of Being Happy Masterclass with Gurudev Sri Sri Ravi Shankar on 6 December at Sands Expo & Convention Center! Here is my flyer:';

      // Try native share sheet (mobile Chrome, Safari, Android, iOS)
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: shareTitle,
          text: shareDesc,
          files: [file]
        });
        return;
      }

      // Fallback: Download image and open WhatsApp share prompt
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();

      const shareText = encodeURIComponent(
        `${shareTitle} - 6 Dec Sands Expo & Convention Center! Create your flyer: ${window.location.href}`
      );
      window.open(`https://api.whatsapp.com/send?text=${shareText}`, '_blank');
    } catch (err) {
      console.log('Share canceled or not supported:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf5ec] flex flex-col justify-between selection:bg-amber-200">
      {/* Top Header */}
      <Header
        heading={activeTemplate.heading}
        subHeading={activeTemplate.subHeading}
        heading2={activeTemplate.heading2}
        eventSubtitle={activeTemplate.eventSubtitle}
      />

      {/* Main Two-Column App Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Flyer Preview & Controls (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <FlyerCanvas
              template={activeTemplate}
              customFlyerImg={customFlyerImg}
              userImg={userImg}
              userTransform={userTransform}
              setUserTransform={setUserTransform}
              onPickPhoto={() => fileInputRef.current?.click()}
            />
          </div>

          {/* Right Column: 3-Step Guided Sidebar (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {/* Step 1: Choose Creative (English vs Chinese) */}
            <CreativeSelector
              templates={DEFAULT_TEMPLATES}
              activeTemplateId={activeTemplate.id}
              onSelectTemplate={handleSelectTemplate}
            />

            {/* Step 2: Add Your Photo */}
            <PhotoUploader
              hasUserImage={!!userImg}
              onImageSelected={handleImageSelected}
              onRemoveImage={handleRemoveImage}
              fileInputRef={fileInputRef}
              lang={activeTemplate.lang}
            />

            {/* Step 3: Save & Share */}
            <ActionButtons
              onDownload={handleDownload}
              onShare={handleShare}
              isProcessing={isProcessing}
              lang={activeTemplate.lang}
            />
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <footer className="w-full py-5 text-center text-xs text-[#7a6f68] border-t border-[#e8ded4] mt-8 bg-[#faf5ec]">
        <p className="font-medium tracking-wide">
          {activeTemplate.footerText}
        </p>
      </footer>
    </div>
  );
}
