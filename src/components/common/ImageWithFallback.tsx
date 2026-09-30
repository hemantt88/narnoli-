import React, { useState } from 'react';
import { Gem } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Narnoli Fine Jewellery',
  fallbackText,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#F3EDE2] text-[#8C7A65] p-6 text-center border border-[#E5DDD0]/60 ${containerClassName}`}
        role="img"
        aria-label={alt}
      >
        <Gem className="w-8 h-8 text-[#C4A777] stroke-[1.25] mb-2 opacity-80" />
        <span className="font-serif text-sm tracking-wider uppercase text-[#54483B]">
          {fallbackText || alt}
        </span>
        <span className="text-[11px] text-[#A3927E] mt-1 tracking-wide">
          Narnoli
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F7F3EB] ${containerClassName}`}>
      {/* Subtle loader shimmer prior to load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5EFE6] via-[#EAE3D6] to-[#F5EFE6] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
