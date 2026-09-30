import React from 'react';
import { Trash2, Plus, Minus, ShieldCheck, Award, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/formatters';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface CartPageProps {
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  onNavigate: (page: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onNavigate,
}) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 pb-24">
      <div className="text-center mb-10">
        <SectionHeading
          kicker="Curated Heirloom Bag"
          title="Your Shopping Bag"
          description="Review your selected jewellery heirlooms prior to insured armored transit dispatch."
        />
      </div>

      {items.length === 0 ? (
        <div className="py-20 px-6 text-center bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-lg mx-auto">
          <ShoppingBag className="w-12 h-12 text-[#C4A777] mx-auto mb-4 stroke-[1.25]" />
          <h3 className="font-serif text-2xl text-[#1C1917] mb-2">
            Your Bag Is Currently Empty
          </h3>
          <p className="text-xs sm:text-sm text-[#736759] max-w-sm mx-auto mb-6 leading-relaxed">
            Discover our traditional Rajputi Aads, imperial Kundan Polki chokers, and certified solitaires.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('shop')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Jewellery Catalogue
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Items Table */}
          <div className="lg:col-span-8 bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[22px] p-6 sm:p-8 divide-y divide-[#EFE8DC] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
            <div className="pb-4 flex items-center justify-between text-xs text-[#8C7A65] uppercase tracking-wider font-medium">
              <span>Heirloom Description</span>
              <span>Total Price</span>
            </div>

            {items.map(({ product, quantity, selectedSize }) => (
              <div key={product.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-24 h-24 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[14px] overflow-hidden shrink-0 shadow-2xs">
                    <ImageWithFallback
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] tracking-wider uppercase text-[#8C7A65] block font-medium">
                      {product.metal} · {product.grossWeight}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-[#1C1917] font-medium">
                      {product.name}
                    </h3>
                    {selectedSize && (
                      <span className="text-xs text-[#6E6357] block">
                        Size: {selectedSize}
                      </span>
                    )}
                    <span className="text-[11px] text-[#A6854F] block">
                      {product.hallmark}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                  <span className="font-sans text-lg font-bold text-[#1C1917] tabular-nums">
                    {formatINR(product.price * quantity)}
                  </span>

                  <div className="flex items-center gap-3">
                    {/* Stepper */}
                    <div className="flex items-center border border-[#D5C7B4] rounded-[10px] bg-[#FAF7F2] p-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="p-1.5 text-[#6E6357] hover:text-[#1C1917] rounded-md hover:bg-[#F3EDE2] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-semibold tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="p-1.5 text-[#6E6357] hover:text-[#1C1917] rounded-md hover:bg-[#F3EDE2] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#9E8E7D] hover:text-[#B83E3E] p-1.5 transition-colors cursor-pointer rounded-full hover:bg-[#F3EDE2]"
                      title="Remove piece"
                    >
                      <Trash2 className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-[#F5EFE6] border border-[#E5DDD0]/90 rounded-[22px] p-6 sm:p-8 space-y-6 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
            <h3 className="font-serif text-xl text-[#1C1917] pb-3 border-b border-[#E0D5C3]">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-[#54483B]">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-medium text-[#1C1917]">
                  {items.reduce((acc, i) => acc + i.quantity, 0)} pieces
                </span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal (Net Price):</span>
                <span className="font-semibold text-[#1C1917] tabular-nums font-sans">
                  {formatINR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Armored Transit Courier:</span>
                <span className="text-[#A6854F] font-medium">Complimentary (₹0)</span>
              </div>
              <div className="flex justify-between">
                <span>Transit Insurance:</span>
                <span className="text-[#A6854F] font-medium">Included (100% Covered)</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & GST:</span>
                <span className="text-[#7A6E60]">Included in price</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0D5C3] flex items-baseline justify-between">
              <div>
                <span className="font-serif text-lg text-[#1C1917] block">
                  Grand Total:
                </span>
                <span className="text-[10px] text-[#8C7A65]">
                  Payable via Insured COD / UPI / Card
                </span>
              </div>
              <span className="font-sans text-2xl font-bold text-[#1C1917] tabular-nums">
                {formatINR(subtotal)}
              </span>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={onCheckout}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Secure Checkout
            </Button>

            {/* Reassurance list */}
            <div className="pt-4 border-t border-[#E0D5C3] space-y-2 text-[11px] text-[#6E6357]">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
                <span>100% BIS Hallmarked 916 with Laser HUID</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
                <span>Armored tamper-proof mahogany vault casket</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
                <span>Lifetime exchange and transparent buyback guarantee</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
