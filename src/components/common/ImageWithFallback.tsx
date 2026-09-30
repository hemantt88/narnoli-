import React, { useState, useEffect } from 'react';
import { Gem } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  containerClassName?: string;
}

/**
 * Resolves an image URL safely:
 * - Handles Vite bundled asset URLs
 * - Normalizes legacy /src/assets paths to root /images/ paths
 */
function resolveSafeImageUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('/src/assets/images/')) {
    const filename = url.replace('/src/assets/images/', '');
    return `/images/${filename}`;
  }
  return url;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Narnoli Fine Jewellery',
  fallbackText,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(() => resolveSafeImageUrl(src));
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriedPublicFallback, setHasTriedPublicFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(resolveSafeImageUrl(src));
    setHasError(false);
    setIsLoaded(false);
    setHasTriedPublicFallback(false);
  }, [src]);

  const handleImageError = () => {
    // If the image failed and hasn't tried the public fallback yet
    if (!hasTriedPublicFallback && currentSrc) {
      setHasTriedPublicFallback(true);
      // Extract just the filename to try the /images/ public root
      const parts = currentSrc.split('/');
      const filename = parts[parts.length - 1]?.split('?')[0];
      if (filename && !currentSrc.startsWith('/images/')) {
        setCurrentSrc(`/images/${filename}`);
        return;
      }
    }
    setHasError(true);
  };

  if (hasError || !currentSrc) {
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
          Narnoli Gems &amp; Jewellers
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
        src={currentSrc}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        {...props}
      />
    </div>
  );
};
