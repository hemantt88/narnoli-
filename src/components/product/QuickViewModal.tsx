import React, { useState } from 'react';
import { Heart, ShoppingBag, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { Product } from '../../types';
import { formatINR, calculateDiscount } from '../../utils/formatters';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, size?: string) => void;
  onViewDetails: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onViewDetails,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!product) return null;

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    onClose();
  };

  const handleFullDetails = () => {
    onClose();
    onViewDetails(product);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* Left Column: Image preview */}
        <div className="space-y-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5EFE6] border border-[#E5DDD0]/80 rounded-[16px] shadow-xs">
            <ImageWithFallback
              src={product.images[activeImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3.5 left-3.5 bg-[#FAF7F2]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] tracking-widest uppercase text-[#54483B] border border-[#E5DDD0] rounded-[8px] shadow-2xs">
              {product.hallmark}
            </div>
          </div>

          {/* Quick thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIndex(idx)}
                  className={`w-14 h-14 rounded-[10px] overflow-hidden border cursor-pointer transition-all duration-200 ${
                    activeImgIndex === idx
                      ? 'border-[#1C1917] ring-1 ring-[#1C1917]'
                      : 'border-[#E5DDD0] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Specs & Actions */}
        <div className="flex flex-col justify-between h-full space-y-4">
          <div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-[#8C7A65] font-medium">
              {product.metal} · {product.grossWeight}
            </div>
            <h2 className="font-serif text-2xl text-[#1C1917] font-medium leading-tight mt-1">
              {product.name}
            </h2>
            {product.subtitle && (
              <p className="text-xs text-[#736759] mt-1">
                {product.subtitle}
              </p>
            )}

            {/* Price */}
            <div className="mt-4 pb-3 border-b border-[#EFE8DC] flex items-baseline gap-3">
              <span className="font-sans text-2xl font-semibold text-[#1C1917] tabular-nums">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9E8E7D] line-through tabular-nums">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {discount && (
                <span className="text-xs font-medium text-[#A6854F] bg-[#A6854F]/10 px-2 py-0.5 rounded-[6px]">
                  Save {discount}%
                </span>
              )}
            </div>

            {/* Key Specifications */}
            <div className="py-3 px-3.5 my-3 space-y-1.5 text-xs text-[#54483B] bg-[#F5EFE6]/70 rounded-[14px] border border-[#E5DDD0]/70">
              <div className="flex justify-between">
                <span className="text-[#8C7A65]">Purity:</span>
                <span className="font-medium text-[#1C1917]">{product.purity}</span>
              </div>
              {product.diamondWeight && (
                <div className="flex justify-between">
                  <span className="text-[#8C7A65]">Diamond Weight:</span>
                  <span className="font-medium text-[#1C1917]">{product.diamondWeight}</span>
                </div>
              )}
              {product.stoneDetails && (
                <div className="flex justify-between">
                  <span className="text-[#8C7A65]">Gemstones:</span>
                  <span className="font-medium text-[#1C1917]">{product.stoneDetails}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#8C7A65]">Certification:</span>
                <span className="font-medium text-[#1C1917]">{product.certification || 'BIS Hallmarked'}</span>
              </div>
            </div>

            {/* Size selection if applicable */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] tracking-wider uppercase text-[#8C7A65] block mb-2 font-medium">
                  Select Size / Dimensions:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 text-xs rounded-[10px] border cursor-pointer transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-[#1C1917] text-[#FAF7F2] border-[#1C1917] shadow-xs'
                          : 'bg-[#F5EFE6] text-[#473E35] border-[#DED4C5] hover:border-[#A6854F]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                fullWidth
                onClick={handleAdd}
                leftIcon={<ShoppingBag className="w-4 h-4 stroke-[1.5]" />}
              >
                Add to Bag
              </Button>
              <button
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-3 rounded-[12px] border transition-all duration-200 cursor-pointer ${
                  isWishlisted
                    ? 'border-[#B83E3E] bg-[#B83E3E]/10 text-[#B83E3E]'
                    : 'border-[#D5C7B4] text-[#54483B] hover:text-[#1C1917] hover:border-[#1C1917]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
              </button>
            </div>

            <Button
              variant="outline"
              fullWidth
              size="sm"
              onClick={handleFullDetails}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Full Heirloom Dossier
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
