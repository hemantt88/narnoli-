import React, { useState, useMemo } from 'react';
import { Product, FilterState } from '../types';
import { SectionHeading } from '../components/common/SectionHeading';
import { FilterControls } from '../components/product/FilterControls';
import { ProductGrid } from '../components/product/ProductGrid';

interface ShopProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

export const Shop: React.FC<ShopProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    metal: 'all',
    purity: 'all',
    occasion: 'all',
    minPrice: 0,
    maxPrice: 2000000,
    sortBy: 'featured',
    searchQuery: '',
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      metal: 'all',
      purity: 'all',
      occasion: 'all',
      minPrice: 0,
      maxPrice: 2000000,
      sortBy: 'featured',
      searchQuery: '',
    });
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (filters.category !== 'all' && product.category !== filters.category) {
          return false;
        }

        // Search query filter
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchMetal = product.metal.toLowerCase().includes(q);
          const matchSubtitle = product.subtitle?.toLowerCase().includes(q);
          const matchFeatures = product.features.some((f) => f.toLowerCase().includes(q));
          if (!matchName && !matchMetal && !matchSubtitle && !matchFeatures) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-low') return a.price - b.price;
        if (filters.sortBy === 'price-high') return b.price - a.price;
        if (filters.sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        return 0; // 'featured' keeps curated order
      });
  }, [products, filters]);

  const categoryTitles: Record<string, { title: string; desc: string }> = {
    all: {
      title: 'The High Jewellery Boutique',
      desc: 'Discover our certified collection of royal Rajputi ornaments, bridal Kundan Polki chokers, certified diamond solitaires, and 22K pure hallmarked gold.',
    },
    rajputi: {
      title: 'Traditional Rajputi Ornaments',
      desc: 'Noble 22K Aads, Timaniyas, and ceremonial adornments preserving the regal Mewar and Marwar heritage.',
    },
    kundan: {
      title: 'Imperial Kundan & Jadau Polki',
      desc: 'Natural uncut syndicate diamonds set in pure refined 24K gold foil with hand-painted Rajasthani meenakari.',
    },
    diamond: {
      title: 'Certified Natural Solitaires',
      desc: 'GIA & IGI graded conflict-free solitaires and bespoke fine diamond eternity bands.',
    },
    gold: {
      title: 'Hallmarked 22K Gold Heirlooms',
      desc: 'Guaranteed 916 laser hallmarked gold handcrafted by four generations of master karigars.',
    },
    silverware: {
      title: 'Royal Sterling Silverware',
      desc: '925 hallmarked sterling silver ceremonial dinner sets, engraved pooja thalis, and custom artifacts.',
    },
  };

  const currentMeta = categoryTitles[filters.category] || categoryTitles.all;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header Banner */}
      <div className="mb-10 text-center">
        <SectionHeading
          kicker="Narnoli Catalogue"
          title={currentMeta.title}
          description={currentMeta.desc}
        />
      </div>

      {/* Filter Controls Bar */}
      <FilterControls
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalCount={filteredProducts.length}
      />

      {/* Product Grid */}
      <ProductGrid
        products={filteredProducts}
        onSelectProduct={onSelectProduct}
        onQuickView={onQuickView}
        wishlistIds={wishlistIds}
        onToggleWishlist={onToggleWishlist}
        onResetFilters={handleResetFilters}
      />
    </div>
  );
};
