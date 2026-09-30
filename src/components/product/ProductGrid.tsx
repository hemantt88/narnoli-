import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Gem } from 'lucide-react';
import { Button } from '../common/Button';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onResetFilters?: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  onResetFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="py-20 px-4 text-center bg-[#FAF7F2] border border-[#E5DDD0] rounded-sm max-w-xl mx-auto my-12">
        <Gem className="w-10 h-10 text-[#C4A777] mx-auto mb-4 stroke-[1.25]" />
        <h3 className="font-serif text-2xl text-[#1C1917] mb-2">
          No Heirlooms Found
        </h3>
        <p className="text-sm text-[#736759] max-w-sm mx-auto mb-6">
          We could not find jewellery matching your selected criteria. Try adjusting your filter parameters or search term.
        </p>
        {onResetFilters && (
          <Button variant="outline" size="sm" onClick={onResetFilters}>
            View All Creations
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
          onQuickView={onQuickView}
          isWishlisted={wishlistIds.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
};
