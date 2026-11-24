import React from 'react';
import { Check } from 'lucide-react';

export default function DesignSelector({
  templates,
  activeTemplateId,
  onSelectTemplate
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-[#e8ded4]">
      <div className="flex items-center justify-between mb-3.5">
        <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#5a4e46] uppercase">
          1 · CHOOSE A DESIGN
        </h3>
      </div>

      {/* Grid of Design Thumbnails */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {templates.map((tmpl) => {
          const isActive = tmpl.id === activeTemplateId;
          return (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 text-left focus:outline-none ${
                isActive
                  ? 'border-[#9b1b1b] ring-2 ring-[#9b1b1b]/20 shadow-md scale-[1.02]'
                  : 'border-[#e8ded4] hover:border-[#9b1b1b]/50 hover:shadow-sm'
              }`}
            >
              {/* Thumbnail preview graphic */}
              {tmpl.thumbnail ? (
                <img
                  src={tmpl.thumbnail}
                  alt={tmpl.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : tmpl.flyerUrl ? (
                <img
                  src={tmpl.flyerUrl}
                  alt={tmpl.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#fbf5e7] flex flex-col justify-between p-1.5 relative overflow-hidden">
                  <div className="w-full flex justify-between items-start">
                    <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                    <div className="w-8 h-2 rounded bg-[#dc2626]/60" />
                  </div>
                  <div className="flex items-center justify-between my-auto">
                    <div className="w-7 h-9 bg-white rounded-[2px] shadow-sm border border-stone-300 flex items-center justify-center -rotate-3">
                      <span className="text-[7px]">📷</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#fde68a] border border-amber-400 flex items-center justify-center">
                      <span className="text-[9px]">🙏</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#991b1b]/80" />
                </div>
              )}

              {/* Active checkmark badge */}
              {isActive && (
                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#9b1b1b] text-white flex items-center justify-center shadow-md">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Template Label / Badge */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs px-1 py-0.5 text-center">
                <span className="text-[10px] font-semibold text-white truncate block">
                  {tmpl.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
