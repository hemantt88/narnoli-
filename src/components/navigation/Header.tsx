import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS, BRAND_CONFIG } from '../../data/brandConfig';
import { NavigationItem } from '../../types';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, categoryFilter?: string, collectionFilter?: string) => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onOpenAccount: () => void;
  onToggleMobileMenu: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenAccount,
  onToggleMobileMenu,
  cartCount,
  wishlistCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: NavigationItem) => {
    setActiveDropdown(null);
    if (item.page) {
      onNavigate(item.page, item.categoryFilter, item.collectionFilter);
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full transition-all duration-300 bg-[#FAF7F2]/95 backdrop-blur-md border-b ${
        isScrolled
          ? 'border-[#E0D5C3]/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] py-3'
          : 'border-[#EDE5D8] py-4 lg:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile: Hamburger toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={onToggleMobileMenu}
              aria-label="Open menu"
              className="p-2 -ml-2 text-[#24211D] hover:text-[#A6854F] transition-colors rounded-[10px] hover:bg-[#F3EDE2] cursor-pointer"
            >
              <Menu className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Desktop & Mobile Brand Logo / Wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="group flex flex-col items-center justify-center text-center cursor-pointer focus-visible:outline-none py-0.5"
              aria-label="NARNOLI JEWELER"
            >
              <span className="font-serif text-lg sm:text-2xl lg:text-[25px] font-normal tracking-[0.22em] sm:tracking-[0.26em] text-[#1C1917] group-hover:text-[#A6854F] transition-colors uppercase whitespace-nowrap block select-none leading-tight">
                NARNOLI
              </span>
              <span className="font-serif text-[8.5px] sm:text-[9.5px] lg:text-[10.5px] font-medium tracking-[0.4em] sm:tracking-[0.44em] text-[#9E896F] group-hover:text-[#A6854F] transition-colors uppercase whitespace-nowrap block select-none pl-[0.4em] sm:pl-[0.44em] mt-0.5 sm:mt-1">
                JEWELER
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAVIGATION_ITEMS.map((item) => {
              const hasSub = item.subItems && item.subItems.length > 0;
              const isActive =
                item.page === currentPage &&
                (!item.categoryFilter || item.categoryFilter === 'all');

              return (
                <div
                  key={item.id}
                  className="relative py-2"
                  onMouseEnter={() => hasSub && setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.18em] uppercase transition-colors py-1 cursor-pointer ${
                      isActive
                        ? 'text-[#A6854F] border-b-2 border-[#A6854F]'
                        : 'text-[#3E3832] hover:text-[#A6854F]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {hasSub && (
                      <ChevronDown className="w-3 h-3 text-[#9E896F] stroke-[1.5] transition-transform duration-200" />
                    )}
                  </button>

                  {/* Flyout Submenu */}
                  {hasSub && activeDropdown === item.id && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 z-50">
                      <div className="bg-[#FAF7F2] border border-[#E5DDD0] shadow-[0_12px_36px_rgba(0,0,0,0.08)] rounded-[16px] p-2.5 text-left animate-in fade-in duration-200">
                        {item.subItems!.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveDropdown(null);
                              if (sub.collectionId) {
                                onNavigate('collections', undefined, sub.collectionId);
                              } else {
                                onNavigate('shop', sub.category);
                              }
                            }}
                            className="w-full text-left px-3.5 py-2 text-xs text-[#4F463D] hover:text-[#1C1917] hover:bg-[#F3EDE2] transition-colors rounded-[10px] flex items-center justify-between cursor-pointer"
                          >
                            <span>{sub.label}</span>
                            <span className="text-[10px] text-[#A3927E] opacity-0 group-hover:opacity-100">
                              →
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Icons (Search, Wishlist, Account, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              aria-label="Search catalogue"
              className="p-2.5 text-[#3E3832] hover:text-[#A6854F] transition-colors rounded-[11px] cursor-pointer hover:bg-[#F3EDE2]"
              title="Search Jewellery"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              aria-label={`Wishlist with ${wishlistCount} items`}
              className="relative p-2.5 text-[#3E3832] hover:text-[#A6854F] transition-colors rounded-[11px] cursor-pointer hover:bg-[#F3EDE2]"
              title="Saved Pieces"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#A6854F] text-[#FAF7F2] text-[10px] font-medium flex items-center justify-center rounded-full leading-none tabular-nums shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account / Concierge Button */}
            <button
              onClick={onOpenAccount}
              aria-label="User Account and Concierge"
              className="hidden sm:inline-flex p-2.5 text-[#3E3832] hover:text-[#A6854F] transition-colors rounded-[11px] cursor-pointer hover:bg-[#F3EDE2]"
              title="VIP Concierge"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
            </button>

            {/* Shopping Bag / Cart Button */}
            <button
              onClick={onOpenCart}
              aria-label={`Cart with ${cartCount} items`}
              className="relative p-2.5 text-[#3E3832] hover:text-[#A6854F] transition-colors rounded-[11px] cursor-pointer hover:bg-[#F3EDE2]"
              title="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#1C1917] text-[#FAF7F2] text-[10px] font-medium flex items-center justify-center rounded-full leading-none tabular-nums shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
