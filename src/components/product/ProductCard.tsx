import React, { useState } from 'react';
import { Heart, Eye, Award } from 'lucide-react';
import { Product } from '../../types';
import { formatINR, calculateDiscount } from '../../utils/formatters';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const discount = calculateDiscount(product.price, product.originalPrice);

  return (
    <div
      className="group relative flex flex-col bg-[#FAF7F2] border border-[#EAE2D5]/80 hover:border-[#D5C7B4] rounded-[20px] transition-all duration-300 ease-out shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Showcase Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6]">
        <button
          onClick={() => onSelect(product)}
          className="w-full h-full block focus-visible:outline-none cursor-pointer"
        >
          <ImageWithFallback
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
        </button>

        {/* Wishlist Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onToggleWishlist(product);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3.5 right-3.5 p-2 rounded-full backdrop-blur-md transition-all duration-300 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-[#FAF7F2] text-[#B83E3E]'
              : 'bg-[#FAF7F2]/85 text-[#54483B] hover:text-[#1C1917] hover:bg-[#FAF7F2] hover:scale-105'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-125 ${
              isWishlisted ? 'fill-[#B83E3E]' : 'stroke-[1.5]'
            }`}
          />
        </button>

        {/* Hallmark / Tag (Top-Left) */}
        <div className="absolute top-3.5 left-3.5 flex flex-col gap-1 pointer-events-none">
          {product.isNewArrival && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-[#7D6B56] bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded-[8px] border border-[#E5DDD0]/80 shadow-2xs">
              New Piece
            </span>
          )}
          {product.isBestseller && (
            <span className="text-[10px] tracking-[0.18em] uppercase font-medium text-[#99794D] bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 rounded-[8px] border border-[#E5DDD0]/80 shadow-2xs">
              Heritage Iconic
            </span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div
          className={`absolute inset-x-3.5 bottom-3.5 flex items-center justify-center transition-all duration-300 ease-out ${
            isHovered
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 px-4 bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] text-[#1C1917] text-[11px] font-medium tracking-[0.18em] uppercase shadow-md backdrop-blur-sm border border-[#D5C7B4]/80 rounded-[12px] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
          >
            <Eye className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Subtle Category & Metal Kicker */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8C7A65] tracking-wider uppercase mb-1.5">
            <span>{product.metal}</span>
            <span aria-hidden="true">·</span>
            <span>{product.grossWeight}</span>
          </div>

          {/* Product Title */}
          <button
            onClick={() => onSelect(product)}
            className="text-left w-full group-hover:text-[#A6854F] transition-colors focus-visible:outline-none cursor-pointer"
          >
            <h3 className="font-serif text-base sm:text-lg text-[#1C1917] font-medium leading-snug line-clamp-1">
              {product.name}
            </h3>
          </button>

          {/* Subtitle / Stones */}
          {product.subtitle && (
            <p className="text-xs text-[#736759] line-clamp-1 mt-1 font-normal">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Hallmark Baseline */}
        <div className="mt-4 pt-3.5 border-t border-[#EFE8DC] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans text-base sm:text-lg font-semibold text-[#1C1917] tabular-nums tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#9E8E7D] line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {discount && (
              <span className="text-[11px] font-medium text-[#A6854F]">
                ({discount}% OFF)
              </span>
            )}
          </div>

          <div
            className="flex items-center text-[10px] text-[#8C7A65] tracking-widest uppercase bg-[#F5EFE6] px-2 py-0.5 rounded-[6px] border border-[#E5DDD0]/60"
            title={product.hallmark}
          >
            <Award className="w-3 h-3 text-[#C4A777] mr-1 shrink-0" />
            <span>BIS 916</span>
          </div>
        </div>
      </div>
    </div>
  );
};
