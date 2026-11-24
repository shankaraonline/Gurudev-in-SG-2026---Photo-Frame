import React from 'react';

export default function Header({ 
  heading = 'Gurudev in Singapore, Dec 2026', 
  subHeading = 'Add your photo to the frame', 
  heading2 = 'The Art of Being Happy',
  eventSubtitle = '6 December, Sands Expo & Convention Center'
}) {
  return (
    <header className="w-full pt-6 pb-3 sm:pt-8 sm:pb-4 text-center">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Top Centre Logo: The Art of Living */}
        <div className="mb-4 sm:mb-5">
          <img 
            src="/aol-logo.png" 
            alt="The Art of Living" 
            className="h-14 sm:h-20 w-auto object-contain mx-auto drop-shadow-xs"
          />
        </div>

        {/* Heading: Gurudev in Singapore, Dec 2026 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#801414] tracking-tight drop-shadow-sm mb-1">
          {heading}
        </h1>

        {/* Sub-heading: Add your photo to the frame */}
        <h2 className="text-base sm:text-xl md:text-2xl font-bold text-[#422006] mb-2.5">
          {subHeading}
        </h2>

        {/* Heading 2 & Event Date/Venue */}
        <div className="inline-flex flex-col items-center">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-100/90 text-[#801414] text-sm sm:text-base font-bold tracking-wide mb-1 border border-amber-200 shadow-2xs">
            {heading2}
          </div>
          <p className="text-xs sm:text-sm text-[#7a6f68] font-semibold">
            {eventSubtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
