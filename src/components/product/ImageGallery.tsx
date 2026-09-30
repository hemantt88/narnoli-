import React, { useState } from 'react';
import { Award, ZoomIn, ShieldCheck } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  hallmarkText: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  hallmarkText,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Showcase Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6] border border-[#E5DDD0]/80 rounded-[20px] shadow-sm group">
        <ImageWithFallback
          src={activeImage}
          alt={`${productName} view ${activeIndex + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        />

        {/* Hallmark Assurance Badge Overlay */}
        <div className="absolute top-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#E0D5C3]/80 shadow-xs rounded-[10px] flex items-center gap-2">
          <Award className="w-4 h-4 text-[#A6854F] stroke-[1.5]" />
          <span className="text-[10px] tracking-[0.2em] font-medium text-[#24211D] uppercase">
            {hallmarkText}
          </span>
        </div>

        {/* Zoom Hint */}
        <button
          onClick={() => setIsZoomed(!isZoomed)}
          className="absolute bottom-4 right-4 p-2.5 bg-[#FAF7F2]/85 backdrop-blur-xs text-[#54483B] hover:text-[#1C1917] hover:bg-[#FAF7F2] transition-all rounded-[10px] shadow-xs cursor-pointer"
          title={isZoomed ? 'Zoom Out' : 'Zoom In'}
        >
          <ZoomIn className="w-4 h-4 stroke-[1.5]" />
        </button>
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveIndex(idx);
                setIsZoomed(false);
              }}
              className={`relative w-20 h-20 shrink-0 rounded-[12px] overflow-hidden border transition-all duration-200 cursor-pointer ${
                activeIndex === idx
                  ? 'border-[#1C1917] ring-2 ring-[#1C1917]/20 shadow-xs scale-102'
                  : 'border-[#E5DDD0] opacity-70 hover:opacity-100 hover:border-[#BFA888]'
              }`}
            >
              <ImageWithFallback
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Trust reassurance below gallery */}
      <div className="flex items-center justify-between text-[11px] text-[#7A6E60] pt-2 px-2 border-t border-[#EFE8DC]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A6854F]" />
          <span>Laser HUID Authenticity</span>
        </div>
        <span>·</span>
        <span>Photographed in Natural Salon Lighting</span>
        <span>·</span>
        <span>Original Jaipur Craft</span>
      </div>
    </div>
  );
};
