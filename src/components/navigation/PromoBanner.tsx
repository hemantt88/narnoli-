import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BRAND_CONFIG } from '../../data/brandConfig';

interface PromoBannerProps {
  onActionClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onActionClick }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const { announcement } = BRAND_CONFIG;

  if (!announcement.enabled || isDismissed) return null;

  return (
    <div className="relative z-40 bg-[#F2ECE1] border-b border-[#E4DACB] text-[#5E5244] text-[11px] sm:text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-normal tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span>{announcement.text}</span>
          {announcement.actionText && (
            <button
              onClick={onActionClick}
              className="font-medium text-[#1C1917] underline underline-offset-2 hover:text-[#A6854F] transition-colors ml-1 cursor-pointer"
            >
              {announcement.actionText} →
            </button>
          )}
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          aria-label="Dismiss banner"
          className="text-[#8A7965] hover:text-[#1C1917] p-1 ml-2 transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5 stroke-[1.5]" />
        </button>
      </div>
    </div>
  );
};
