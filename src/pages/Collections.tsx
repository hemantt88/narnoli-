import React from 'react';
import { ArrowRight, Sparkles, Gem, Award } from 'lucide-react';
import { COLLECTIONS, INITIAL_PRODUCTS } from '../data/brandConfig';
import { Collection, Product } from '../types';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { ProductCard } from '../components/product/ProductCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface CollectionsProps {
  selectedCollectionId?: string;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onSelectCollection: (colId: string) => void;
}

export const Collections: React.FC<CollectionsProps> = ({
  selectedCollectionId,
  onSelectProduct,
  onQuickView,
  wishlistIds,
  onToggleWishlist,
  onSelectCollection,
}) => {
  const activeCollection =
    COLLECTIONS.find((c) => c.id === selectedCollectionId) || COLLECTIONS[0];

  const collectionProducts = INITIAL_PRODUCTS.filter(
    (p) => p.collectionId === activeCollection.id
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 pb-24">
      {/* Editorial Header */}
      <div className="text-center mb-12">
        <SectionHeading
          kicker="High Jewellery Capsules"
          title="The Curated Collections"
          description="Each collection represents an unbroken chapter of Indian royal aesthetics, immortalized in pure hallmarked precious metals and syndicate uncut gems."
        />
      </div>

      {/* Collection Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
        {COLLECTIONS.map((col) => {
          const isActive = col.id === activeCollection.id;
          return (
            <button
              key={col.id}
              onClick={() => onSelectCollection(col.id)}
              className={`px-4 py-2.5 text-xs font-medium tracking-wider uppercase rounded-[11px] transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F5EFE6] text-[#54483B] hover:bg-[#EAE3D6] hover:text-[#1C1917] border border-[#E5DDD0]'
              }`}
            >
              {col.subtitle}
            </button>
          );
        })}
      </div>

      {/* Featured Collection Hero Banner */}
      <div className="relative rounded-[24px] overflow-hidden bg-[#24201D] text-[#FAF7F2] border border-[#3E362F] mb-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/9] lg:aspect-auto lg:h-[420px] overflow-hidden">
            <ImageWithFallback
              src={activeCollection.image}
              alt={activeCollection.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#24201D] via-transparent to-transparent opacity-80" />
          </div>

          <div className="lg:col-span-5 p-8 lg:p-12 space-y-4">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#C4A777] font-medium block">
              {activeCollection.badge || 'Signature Curation'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] leading-snug">
              {activeCollection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#C9BEB2] leading-relaxed font-light">
              {activeCollection.description}
            </p>
            <div className="pt-2 text-xs text-[#E8DFC8]">
              BIS Hallmarked · Jaipur Guild Master Crafted
            </div>
          </div>
        </div>
      </div>

      {/* Collection Product Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#E5DDD0] pb-4">
          <h3 className="font-serif text-2xl text-[#1C1917]">
            Pieces from {activeCollection.subtitle}
          </h3>
          <span className="text-xs text-[#7A6E60]">
            {collectionProducts.length} Heirloom pieces available
          </span>
        </div>

        {collectionProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {collectionProducts.map((product) => (
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
        ) : (
          <div className="py-12 text-center text-xs text-[#7A6E60]">
            Additional pieces from this collection are currently undergoing laser hallmark assaying at our Jaipur atelier.
          </div>
        )}
      </div>
    </div>
  );
};
