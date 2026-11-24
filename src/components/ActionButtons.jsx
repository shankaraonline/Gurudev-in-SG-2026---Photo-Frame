import React, { useState } from 'react';
import { Download, Share2, Shield, Loader2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ActionButtons({
  onDownload,
  onShare,
  isProcessing,
  lang = 'en'
}) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isZh = lang === 'zh';

  const handleDownloadClick = async () => {
    try {
      await onDownload();
      // Celebration confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#c93b2b', '#f7b928', '#22c55e', '#ffffff']
      });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('Download error:', err);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-[#e8ded4] space-y-3">
      <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#5a4e46] uppercase">
        {isZh ? '3 · SAVE & SHARE / 保存与分享' : '3 · SAVE & SHARE'}
      </h3>

      {/* Download Image Button (matches dusty rose / salmon color of reference) */}
      <button
        onClick={handleDownloadClick}
        disabled={isProcessing}
        className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-50"
        style={{
          backgroundColor: downloadSuccess ? '#059669' : '#c97a7e'
        }}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>{isZh ? '正在生成高清海报...' : 'Generating High-Res Flyer...'}</span>
          </>
        ) : downloadSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>{isZh ? '已保存至下载文件夹!' : 'Saved to Downloads!'}</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>{isZh ? '下载海报 (Download image)' : 'Download image'}</span>
          </>
        )}
      </button>

      {/* Share to WhatsApp / Facebook Button (matches soft sage green color of reference) */}
      <button
        onClick={onShare}
        disabled={isProcessing}
        className="w-full py-3.5 px-4 rounded-xl text-white font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 transition-all shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-50"
        style={{
          backgroundColor: '#7ebd9f'
        }}
      >
        <Share2 className="w-5 h-5" />
        <span>{isZh ? '分享至 WhatsApp / Facebook' : 'Share to WhatsApp / Facebook'}</span>
      </button>

      {/* Privacy Guarantee Note */}
      <div className="pt-2 px-3 py-2.5 bg-emerald-50/80 rounded-xl border border-emerald-200/60 flex items-center justify-center gap-2 text-xs text-emerald-800">
        <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
        <span className="font-medium text-center">
          {isZh
            ? '100% 隐私保护：照片完全在您的设备本地处理，绝不上传到任何服务器或数据库。'
            : '100% Private: Your photo is processed entirely on your device and is never uploaded or saved to any database.'
          }
        </span>
      </div>
    </div>
  );
}
