import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../../types';
import { formatINR } from '../../utils/formatters';
import { Button } from '../common/Button';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onViewCartPage: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onViewCartPage,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between z-10 border-l border-[#E5DDD0]">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E5DDD0] flex items-center justify-between bg-[#F5EFE6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#A6854F] stroke-[1.5]" />
            <h2 className="font-serif text-lg tracking-wider text-[#1C1917] uppercase">
              Shopping Bag ({items.reduce((acc, item) => acc + item.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-[#6E6357] hover:text-[#1C1917] rounded-full transition-colors cursor-pointer hover:bg-[#EAE3D6]"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Item List or Empty State */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EFE8DC]">
          {items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#C4A777] mx-auto opacity-75 stroke-[1.25]" />
              <h3 className="font-serif text-xl text-[#1C1917]">Your Bag Is Empty</h3>
              <p className="text-xs text-[#736759] max-w-xs mx-auto">
                Discover our royal Rajputi aads, bridal kundan chokers, and certified solitaires.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="mt-2"
              >
                Browse Jewellery
              </Button>
            </div>
          ) : (
            items.map(({ product, quantity, selectedSize }) => (
              <div key={product.id} className="py-4 flex gap-4 items-start">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[14px] overflow-hidden shrink-0 shadow-2xs">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] tracking-wider uppercase text-[#8C7A65]">
                    {product.metal}
                  </div>
                  <h4 className="font-serif text-sm font-medium text-[#1C1917] truncate">
                    {product.name}
                  </h4>
                  {selectedSize && (
                    <div className="text-[11px] text-[#736759] mt-0.5">
                      Size: {selectedSize}
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-sans text-sm font-semibold text-[#1C1917] tabular-nums">
                      {formatINR(product.price * quantity)}
                    </span>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#D5C7B4] rounded-[10px] bg-[#FAF7F2] p-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="p-1 text-[#6E6357] hover:text-[#1C1917] rounded-md hover:bg-[#F3EDE2] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="p-1 text-[#6E6357] hover:text-[#1C1917] rounded-md hover:bg-[#F3EDE2] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemoveItem(product.id)}
                  aria-label={`Remove ${product.name}`}
                  className="text-[#9E8E7D] hover:text-[#B83E3E] p-1.5 transition-colors cursor-pointer rounded-full hover:bg-[#F3EDE2]"
                >
                  <Trash2 className="w-4 h-4 stroke-[1.5]" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom Actions */}
        {items.length > 0 && (
          <div className="p-5 bg-[#F5EFE6] border-t border-[#E5DDD0] space-y-4">
            {/* Reassurance */}
            <div className="flex items-center gap-2 text-xs text-[#5E5244] bg-[#FAF7F2] p-3 rounded-[12px] border border-[#E5DDD0] shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#A6854F] shrink-0" />
              <span>Complimentary insured shipping & tamper-proof vault box.</span>
            </div>

            {/* Subtotal */}
            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#736759] font-medium block">
                  Subtotal (Inc. Taxes)
                </span>
                <span className="text-[11px] text-[#8C7A65]">
                  Free Insured Armored Transit
                </span>
              </div>
              <span className="font-sans text-xl font-bold text-[#1C1917] tabular-nums">
                {formatINR(subtotal)}
              </span>
            </div>

            {/* CTAs */}
            <div className="space-y-2">
              <Button
                variant="primary"
                fullWidth
                size="md"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
              >
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                fullWidth
                size="sm"
                onClick={() => {
                  onClose();
                  onViewCartPage();
                }}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                View Detailed Bag & Invoice
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
