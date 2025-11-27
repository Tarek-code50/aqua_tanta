import React, { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ComparisonSlider: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMove = (event: React.MouseEvent | React.TouchEvent | React.ChangeEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setSliderPosition(Number(event.target.value));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-center mb-6 text-brand-700 dark:text-brand-400">
        {t.comparison.title}
      </h3>
      <div className="relative w-full h-[300px] sm:h-[400px] rounded-xl overflow-hidden cursor-ew-resize select-none" ref={containerRef}>
        {/* Background Image: Old/Dirty (Originally Left in prev version, now Right) */}
        <img
          src="https://picsum.photos/id/425/800/600?grayscale" // Dirty Filter
          alt="Dirty Filter"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        {/* Label for Background (Right Side now visually) */}
        <div className="absolute top-4 right-4 bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
          {t.comparison.before}
        </div>

        {/* Overlay Image: New/Clean (Originally Right, now Left/Overlay) */}
        {/* Width increases as slider moves right, revealing more of the Clean filter */}
        <div
          className="absolute top-0 left-0 h-full w-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src="https://picsum.photos/id/400/800/600" // Clean Filter
            alt="Clean Filter"
            className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          />
           {/* Label for Overlay (Left Side) */}
           <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
            {t.comparison.after}
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-brand-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>

        {/* Hidden Range Input for Interaction */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleMove}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>
    </div>
  );
};

export default ComparisonSlider;