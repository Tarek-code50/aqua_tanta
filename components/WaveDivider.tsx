import React from 'react';

interface WaveDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  flip?: boolean;
}

const WaveDivider: React.FC<WaveDividerProps> = ({ position = 'bottom', color = 'text-white dark:text-slate-900', flip = false }) => {
  const transform = flip ? 'scaleX(-1)' : '';
  const verticalTransform = position === 'top' ? 'rotate(180deg)' : '';

  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-[0] ${position === 'top' ? '-top-1' : '-bottom-1'} z-0 ${color}`}
      style={{ transform: verticalTransform }}
    >
      <svg 
        className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[120px]" 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        style={{ transform }}
      >
        <path 
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

export default WaveDivider;