import React, { useState } from 'react';
import { Search, X, ArrowRight, Gem } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Product } from '../../types';
import { INITIAL_PRODUCTS } from '../../data/brandConfig';
import { formatINR } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onViewAllResults: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onViewAllResults,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const trendingQueries = [
    'Rajputi Aad',
    'Kundan Polki Choker',
    'Solitaire Ring',
    '22K Temple Bangles',
    'Basra Pearls',
    'Sterling Silver Thali',
  ];

  const filteredProducts = searchTerm.trim()
    ? INITIAL_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.metal.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSelect = (product: Product) => {
    onClose();
    onSelectProduct(product);
  };

  const handleTrendingClick = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="2xl">
      <div className="space-y-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2 stroke-[1.5]" />
          <input
            type="text"
            autoFocus
            placeholder="Search our high jewellery collection..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-10 py-3.5 bg-[#F5EFE6]/70 border border-[#DED4C5] rounded-[14px] text-base text-[#1C1917] placeholder:text-[#8C7A65] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all shadow-2xs"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C7A65] hover:text-[#1C1917] p-1 rounded-full cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Trending Searches */}
        {!searchTerm && (
          <div className="space-y-2.5">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#8C7A65] uppercase block">
              Trending Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {trendingQueries.map((term) => (
                <button
                  key={term}
                  onClick={() => handleTrendingClick(term)}
                  className="px-3.5 py-1.5 bg-[#F5EFE6] hover:bg-[#EAE3D6] text-xs text-[#54483B] rounded-[10px] border border-[#E0D5C3] transition-all duration-200 cursor-pointer hover:shadow-2xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {searchTerm && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#7A6E60]">
                Found {filteredProducts.length} matching pieces
              </span>
              {filteredProducts.length > 0 && (
                <button
                  onClick={() => {
                    onClose();
                    onViewAllResults(searchTerm);
                  }}
                  className="text-xs text-[#A6854F] hover:text-[#1C1917] font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>View in catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto divide-y divide-[#EFE8DC]">
              {filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#7A6E60]">
                  No matching jewellery found for "{searchTerm}".
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleSelect(p)}
                    className="py-2.5 px-3 flex items-center justify-between hover:bg-[#F5EFE6] rounded-[12px] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-[10px] border border-[#E5DDD0]"
                      />
                      <div>
                        <h4 className="font-serif text-sm text-[#1C1917] font-medium">
                          {p.name}
                        </h4>
                        <span className="text-[11px] text-[#8C7A65]">
                          {p.metal} · {p.grossWeight}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#1C1917] tabular-nums font-sans">
                      {formatINR(p.price)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
