import React from 'react';
import { Check, Globe } from 'lucide-react';

export default function CreativeSelector({
  templates,
  activeTemplateId,
  onSelectTemplate
}) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-[#e8ded4]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs sm:text-sm font-bold tracking-wider text-[#5a4e46] uppercase flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#9b1b1b]" />
          <span>1 · CHOOSE CREATIVE / 选择海报</span>
        </h3>
      </div>

      {/* Two Creative Options: English vs Chinese */}
      <div className="grid grid-cols-2 gap-3">
        {templates.map((tmpl) => {
          const isActive = tmpl.id === activeTemplateId;
          const isZh = tmpl.lang === 'zh';

          return (
            <button
              key={tmpl.id}
              onClick={() => onSelectTemplate(tmpl.id)}
              className={`group relative p-2.5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col justify-between focus:outline-none ${
                isActive
                  ? 'border-[#9b1b1b] bg-amber-50/40 ring-2 ring-[#9b1b1b]/20 shadow-md scale-[1.01]'
                  : 'border-[#e8ded4] bg-white hover:border-[#9b1b1b]/50 hover:bg-stone-50/60 hover:shadow-xs'
              }`}
            >
              {/* Top Bar with Thumbnail & Check badge */}
              <div className="w-full flex items-start gap-2.5 mb-2">
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 shadow-2xs relative">
                  <img
                    src={tmpl.flyerUrl}
                    alt={tmpl.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Polaroid mini highlight */}
                  <div className="absolute bottom-1 left-1 w-3.5 h-3.5 bg-white/90 border border-stone-300 rounded-[1px] rotate-[-10deg]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#801414] truncate">
                      {isZh ? '中文创意' : 'English'}
                    </span>
                    {isActive && (
                      <div className="w-4 h-4 rounded-full bg-[#9b1b1b] text-white flex items-center justify-center shadow-xs">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold text-stone-700 block truncate">
                    {tmpl.heading2}
                  </span>
                  <span className="text-[10px] text-stone-500 font-medium block truncate">
                    {isZh ? '我会参加!' : 'I am attending!'}
                  </span>
                </div>
              </div>

              {/* Bottom pill tag */}
              <div className="w-full pt-1.5 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                <span className={`font-semibold ${isActive ? 'text-[#9b1b1b]' : 'text-stone-500'}`}>
                  {isZh ? '中文版 (Chinese)' : 'English Edition'}
                </span>
                <span className="text-stone-400">6 Dec</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
