import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Award,
  Truck,
  RefreshCw,
  ChevronRight,
  Phone,
  Calendar,
  Check,
  Share2,
} from 'lucide-react';
import { Product } from '../types';
import { formatINR, calculateDiscount } from '../utils/formatters';
import { ImageGallery } from '../components/product/ImageGallery';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { BRAND_CONFIG } from '../data/brandConfig';

interface ProductDetailsProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onNavigate: (page: string, categoryFilter?: string) => void;
  onBookAppointment: () => void;
  wishlistIds: string[];
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNavigate,
  onBookAppointment,
  wishlistIds,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [activeTab, setActiveTab] = useState<'craft' | 'hallmark' | 'delivery' | 'buyback'>('craft');
  const [copiedLink, setCopiedLink] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const discount = calculateDiscount(product.price, product.originalPrice);

  const handleAdd = () => {
    onAddToCart(product, selectedSize);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-24">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[#8C7A65]">
        <button
          onClick={() => onNavigate('home')}
          className="hover:text-[#1C1917] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-[#A89885]" />
        <button
          onClick={() => onNavigate('shop', product.category)}
          className="hover:text-[#1C1917] transition-colors uppercase tracking-wider cursor-pointer"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3 h-3 text-[#A89885]" />
        <span className="text-[#1C1917] font-medium truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main PDP Grid: Sticky Gallery (Left) & Contiguous Purchase Module (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7">
          <ImageGallery
            images={product.images}
            productName={product.name}
            hallmarkText={product.hallmark}
          />
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 bg-[#FAF7F2] p-6 sm:p-8 border border-[#E5DDD0]/80 rounded-[22px] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
          {/* Metadata Kicker */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#9E896F]">
              {product.metal} · {product.grossWeight}
            </span>
            <button
              onClick={handleShare}
              className="text-xs text-[#7A6E60] hover:text-[#1C1917] flex items-center gap-1 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1C1917] font-normal leading-tight">
              {product.name}
            </h1>
            {product.subtitle && (
              <p className="text-xs sm:text-sm text-[#6E6357] mt-1.5 leading-relaxed">
                {product.subtitle}
              </p>
            )}
          </div>

          {/* Price Box */}
          <div className="py-4 border-y border-[#EFE8DC] flex items-baseline gap-3">
            <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#1C1917] tabular-nums tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[#9E8E7D] line-through tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {discount && (
              <span className="text-xs font-semibold text-[#A6854F] bg-[#A6854F]/10 px-2.5 py-0.5 rounded-[6px]">
                Save {discount}%
              </span>
            )}
            <span className="text-[11px] text-[#8C7A65] ml-auto block">
              Inclusive of all taxes
            </span>
          </div>

          {/* Quick Specs Table */}
          <div className="space-y-2 text-xs text-[#54483B] bg-[#F5EFE6]/70 p-4 sm:p-5 rounded-[16px] border border-[#E5DDD0]/80">
            <div className="flex justify-between">
              <span className="text-[#8C7A65]">Purity Grade:</span>
              <span className="font-medium text-[#1C1917]">{product.purity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8C7A65]">Gross Weight:</span>
              <span className="font-medium text-[#1C1917]">{product.grossWeight}</span>
            </div>
            {product.diamondWeight && (
              <div className="flex justify-between">
                <span className="text-[#8C7A65]">Diamond Weight:</span>
                <span className="font-medium text-[#1C1917]">{product.diamondWeight}</span>
              </div>
            )}
            {product.stoneDetails && (
              <div className="flex justify-between">
                <span className="text-[#8C7A65]">Stone Details:</span>
                <span className="font-medium text-[#1C1917]">{product.stoneDetails}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#8C7A65]">Hallmark / HUID:</span>
              <span className="font-medium text-[#1C1917]">{product.hallmark}</span>
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8C7A65] font-medium">
                  Dimensions / Size:
                </span>
                <button
                  onClick={onBookAppointment}
                  className="text-[11px] text-[#A6854F] underline hover:text-[#1C1917]"
                >
                  Need Custom Sizing?
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3.5 py-2 text-xs rounded-[10px] border transition-all duration-200 cursor-pointer ${
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

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleAdd}
                leftIcon={<ShoppingBag className="w-4 h-4 stroke-[1.5]" />}
              >
                {addedNotice ? 'Added to Bag ✓' : 'Add to Shopping Bag'}
              </Button>

              <button
                onClick={() => onToggleWishlist(product)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`p-3.5 rounded-[12px] border transition-all duration-200 cursor-pointer ${
                  isWishlisted
                    ? 'border-[#B83E3E] bg-[#B83E3E]/10 text-[#B83E3E]'
                    : 'border-[#D5C7B4] text-[#54483B] hover:text-[#1C1917] hover:border-[#1C1917]'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
              </button>
            </div>

            <Button
              variant="outline"
              fullWidth
              size="md"
              onClick={onBookAppointment}
              leftIcon={<Calendar className="w-4 h-4 text-[#A6854F]" />}
            >
              Book Private Salon Appointment
            </Button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 border-t border-[#EFE8DC] grid grid-cols-2 gap-3 text-[11px] text-[#6E6357]">
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
              <span>100% BIS Hallmarked</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
              <span>Insured Armored Courier</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
              <span>Conflict-Free Diamonds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-[#A6854F] shrink-0" />
              <span>Lifetime Buyback Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Product Dossier Tabs */}
      <div className="mt-16 pt-12 border-t border-[#E5DDD0]">
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#E5DDD0] pb-px">
          {[
            { id: 'craft', label: 'Artisanal Craftsmanship' },
            { id: 'hallmark', label: 'BIS Hallmark & Purity' },
            { id: 'delivery', label: 'Armored Transit Courier' },
            { id: 'buyback', label: 'Lifetime Exchange & Buyback' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-3 px-4 text-xs font-medium tracking-wider uppercase transition-colors border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1C1917] text-[#1C1917]'
                  : 'border-transparent text-[#7A6E60] hover:text-[#1C1917]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl text-sm leading-relaxed text-[#54483B]">
          {activeTab === 'craft' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917]">
                Jaipur Courtly Karigari Legacy
              </h3>
              <p>{product.description}</p>
              <ul className="space-y-2 pt-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-[#3E3832]">
                    <Check className="w-4 h-4 text-[#A6854F] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'hallmark' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917]">
                Bureau of Indian Standards (BIS) Purity Certification
              </h3>
              <p>
                Every gold piece created at Narnoli Gems & Jewellers undergoes independent laboratory XRF assay and laser stamping by Bureau of Indian Standards (BIS) recognized assay centers.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[14px] text-xs shadow-2xs">
                  <strong className="block text-[#1C1917] mb-1">Laser HUID Stamping</strong>
                  Unique 6-digit alphanumeric code verifiable directly on the BIS Care Portal.
                </div>
                <div className="p-4 bg-[#F5EFE6] border border-[#E5DDD0] rounded-[14px] text-xs shadow-2xs">
                  <strong className="block text-[#1C1917] mb-1">IGI / GIA Dossier</strong>
                  All natural diamond solitaires include official laboratory certificates of grading.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917]">
                Armored Transit Courier Protocol
              </h3>
              <p>
                Your heirloom is placed in our velvet-lined royal mahogany casket and sealed inside an armored tamper-evident security vault container. We partner exclusively with specialized high-value security couriers (Brink's / Sequel Logistics) with 100% transit insurance.
              </p>
              <p className="text-xs text-[#7A6E60]">
                Delivery requires secret OTP verification and recipient signature. Expected transit time across India is 2 to 4 business days.
              </p>
            </div>
          )}

          {activeTab === 'buyback' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl text-[#1C1917]">
                Narnoli Lifetime Value Assurance
              </h3>
              <p>
                We stand behind every heirloom we craft for eternity. Enjoy transparent gold value appraisal across all our salons in Jaipur, Delhi, and Mumbai.
              </p>
              <div className="text-xs space-y-1 pt-1">
                <div>· <strong>100% Gold Value Exchange:</strong> Based on current prevailing 22K/18K market gold rates.</div>
                <div>· <strong>90% Diamond Value Buyback:</strong> Verified against original GIA/IGI certificate.</div>
                <div>· <strong>Lifetime Ultrasonic Cleaning:</strong> Complimentary polish and inspection at any Narnoli salon.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Pieces Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-[#E5DDD0]">
          <div className="mb-8">
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#9E896F]">
              Harmonious Complements
            </span>
            <h3 className="font-serif text-2xl text-[#1C1917]">
              Complete Your Royal Trousseau
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onQuickView={() => {}}
                isWishlisted={wishlistIds.includes(p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
