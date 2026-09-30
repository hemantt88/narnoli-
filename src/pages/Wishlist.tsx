import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';

interface WishlistProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onRemoveFromWishlist?: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (page: string) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onRemoveFromWishlist,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  onNavigate,
}) => {
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleRemove = (product: Product) => {
    if (onRemoveFromWishlist) {
      onRemoveFromWishlist(product.id);
    } else {
      onToggleWishlist(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 pb-24">
      <div className="text-center mb-10">
        <SectionHeading
          kicker="Your Personal Vault"
          title="Saved Jewellery & Heirlooms"
          description="Curate your personal collection of royal ornaments, bridal pieces, and solitaires for private viewing."
        />
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="py-20 px-6 text-center bg-[#FAF7F2] border border-[#E5DDD0]/80 rounded-[22px] shadow-[0_4px_24px_rgba(0,0,0,0.03)] max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-[#C4A777] mx-auto mb-4 stroke-[1.25]" />
          <h3 className="font-serif text-2xl text-[#1C1917] mb-2">
            Your Wishlist Is Empty
          </h3>
          <p className="text-xs sm:text-sm text-[#736759] max-w-sm mx-auto mb-6 leading-relaxed">
            Explore our Rajputi royal Aads, bridal Kundan Polki chokers, and certified solitaires to save pieces to your vault.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('shop')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Explore Catalogue
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-4">
            <span className="text-xs text-[#7A6E60]">
              You have <strong className="text-[#1C1917] font-semibold tabular-nums">{wishlistedProducts.length}</strong> saved pieces
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {wishlistedProducts.map((product) => (
              <div key={product.id} className="flex flex-col">
                <ProductCard
                  product={product}
                  onSelect={onSelectProduct}
                  onQuickView={onQuickView}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                />
                <div className="flex items-center gap-2 mt-3.5">
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => onAddToCart(product)}
                    leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
                  >
                    Move to Shopping Bag
                  </Button>
                  <button
                    onClick={() => handleRemove(product)}
                    className="p-2.5 text-[#9E8E7D] hover:text-[#B83E3E] rounded-[10px] border border-[#E5DDD0] hover:border-[#B83E3E]/40 hover:bg-[#FBEBEB] transition-colors cursor-pointer shrink-0"
                    title="Remove from wishlist"
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
