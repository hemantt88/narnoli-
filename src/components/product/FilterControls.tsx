import React from 'react';
import { Filter, ArrowUpDown, X, Search } from 'lucide-react';
import { FilterState } from '../../types';

interface FilterControlsProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const categories = [
    { id: 'all', label: 'All Pieces' },
    { id: 'rajputi', label: 'Rajputi' },
    { id: 'kundan', label: 'Kundan & Jadau' },
    { id: 'diamond', label: 'Solitaire & Diamond' },
    { id: 'gold', label: '22K Gold' },
    { id: 'silverware', label: 'Silverware' },
  ];

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.metal !== 'all' ||
    filters.searchQuery !== '' ||
    filters.sortBy !== 'featured';

  return (
    <div className="bg-[#FAF7F2] border border-[#E5DDD0]/90 rounded-[20px] p-5 sm:p-6 mb-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.03)]">
      {/* Category Segmented Buttons Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-0 scrollbar-none border-b sm:border-b-0 border-[#EFE8DC] mb-4 sm:mb-0">
        <span className="text-[11px] font-medium tracking-[0.2em] text-[#8C7A65] uppercase hidden sm:inline mr-2 shrink-0">
          Category:
        </span>
        {categories.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ category: cat.id })}
              className={`px-4 py-2 text-xs font-medium tracking-wider uppercase rounded-[11px] transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#1C1917] text-[#FAF7F2] shadow-xs'
                  : 'bg-[#F3EDE2] text-[#54483B] hover:bg-[#EAE3D6] hover:text-[#1C1917]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Row: Search, Sort, Clear */}
      <div className="mt-4 pt-4 border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#8C7A65] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by gem, purity, craft..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="w-full pl-9 pr-3.5 py-2 bg-[#F5EFE6] border border-[#DED4C5]/80 rounded-[12px] text-xs text-[#24211D] placeholder:text-[#8C7A65] focus:outline-none focus:border-[#A6854F] focus:ring-1 focus:ring-[#A6854F]/30 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7A65] hover:text-[#1C1917]"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Right side: Count & Sort */}
        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
          <span className="text-xs text-[#7A6E60] font-normal">
            Showing <strong className="text-[#1C1917] font-semibold tabular-nums">{totalCount}</strong> exquisite pieces
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7A65]" />
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="bg-[#F5EFE6] border border-[#DED4C5]/80 rounded-[12px] text-xs text-[#24211D] px-3 py-2 focus:outline-none focus:border-[#A6854F] cursor-pointer transition-all"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-[11px] text-[#A6854F] hover:text-[#1C1917] font-medium tracking-wider uppercase underline underline-offset-2 cursor-pointer ml-1 whitespace-nowrap"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
