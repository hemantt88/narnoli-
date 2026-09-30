import React, { useState } from 'react';
import { X, ChevronRight, Phone, MapPin } from 'lucide-react';
import { NAVIGATION_ITEMS, BRAND_CONFIG, CATEGORIES } from '../../data/brandConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string, categoryFilter?: string, collectionFilter?: string) => void;
  onOpenSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenSearch,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLinkClick = (page?: string, cat?: string, col?: string) => {
    onClose();
    if (page) onNavigate(page, cat, col);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-out Drawer */}
      <div className="relative w-4/5 max-w-sm h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between overflow-y-auto text-[#24211D] border-r border-[#E5DDD0]">
        {/* Top Header */}
        <div className="p-5 border-b border-[#E5DDD0] flex items-center justify-between bg-[#F5EFE6]/60">
          <button
            onClick={() => handleLinkClick('home')}
            className="group flex flex-col items-center text-center cursor-pointer focus-visible:outline-none"
            aria-label="NARNOLI JEWELER"
          >
            <span className="font-serif text-xl tracking-[0.24em] text-[#1C1917] group-hover:text-[#A6854F] transition-colors uppercase block font-normal leading-tight">
              NARNOLI
            </span>
            <span className="font-serif text-[9px] tracking-[0.42em] text-[#9E896F] group-hover:text-[#A6854F] transition-colors uppercase block font-medium pl-[0.42em] mt-1">
              JEWELER
            </span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-1.5 text-[#54483B] hover:text-[#1C1917] transition-colors rounded-full hover:bg-[#EAE3D6] cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="p-5 space-y-4 flex-1">
          {/* Quick Search Bar */}
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center justify-between px-4 py-2.5 bg-[#F0EAE0] text-[#7A6E60] text-xs rounded-[12px] border border-[#E0D5C3] cursor-pointer hover:bg-[#EAE3D6] transition-colors shadow-2xs"
          >
            <span className="tracking-wide">Search jewellery, polki, gold...</span>
            <span className="text-[11px] text-[#A6854F] font-medium">SEARCH</span>
          </button>

          <nav className="divide-y divide-[#EBE4D8] pt-2">
            {NAVIGATION_ITEMS.map((item) => {
              const hasSub = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedSection === item.id;

              return (
                <div key={item.id} className="py-2.5">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (hasSub) {
                          setExpandedSection(isExpanded ? null : item.id);
                        } else {
                          handleLinkClick(item.page, item.categoryFilter);
                        }
                      }}
                      className="text-left font-serif text-base tracking-wider uppercase text-[#1C1917] hover:text-[#A6854F] transition-colors flex-1 py-1 cursor-pointer"
                    >
                      {item.label}
                    </button>
                    {hasSub && (
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : item.id)}
                        className="p-2 text-[#8C7A65] hover:text-[#1C1917] transition-colors cursor-pointer rounded-full"
                      >
                        <ChevronRight
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90 text-[#A6854F]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu Accordion */}
                  {hasSub && isExpanded && (
                    <div className="pl-3 mt-2 space-y-2 border-l-2 border-[#DDCFBE] py-1 bg-[#F5EFE6]/40 rounded-r-[12px]">
                      {item.subItems!.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (sub.collectionId) {
                              handleLinkClick('collections', undefined, sub.collectionId);
                            } else {
                              handleLinkClick('shop', sub.category);
                            }
                          }}
                          className="w-full text-left text-xs text-[#5E5244] hover:text-[#1C1917] py-1.5 px-2 rounded-[8px] block cursor-pointer transition-colors hover:bg-[#FAF7F2]"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Quick Category Spotlights */}
          <div className="pt-4 border-t border-[#EBE4D8]">
            <span className="text-[10px] font-medium tracking-[0.2em] text-[#8C7A65] uppercase block mb-2">
              Featured Categories
            </span>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.slice(0, 4).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleLinkClick('shop', cat.slug)}
                  className="p-3 text-left bg-[#F3EDE2] hover:bg-[#EAE3D6] text-xs text-[#3E3832] rounded-[12px] transition-all duration-200 cursor-pointer border border-[#E5DDD0]/70 shadow-2xs hover:-translate-y-0.5"
                >
                  <span className="font-serif block text-sm font-medium">{cat.name}</span>
                  <span className="text-[10px] text-[#8C7A65] block">{cat.featuredCount}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Contact & Showroom Help */}
        <div className="p-5 bg-[#F5EFE6] border-t border-[#E5DDD0] text-xs space-y-2 text-[#5E5244]">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>{BRAND_CONFIG.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#A6854F]" />
            <span>Jaipur Flagship Atelier · M.I. Road</span>
          </div>
          <div className="pt-2 text-[10px] text-[#8C7A65] border-t border-[#E0D5C3]">
            100% BIS Hallmarked · Certified Conflict-Free Natural Diamonds
          </div>
        </div>
      </div>
    </div>
  );
};
