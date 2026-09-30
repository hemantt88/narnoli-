/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS, BRAND_CONFIG } from './data/brandConfig';

// Navigation Components
import { PromoBanner } from './components/navigation/PromoBanner';
import { Header } from './components/navigation/Header';
import { MobileMenu } from './components/navigation/MobileMenu';
import { Footer } from './components/navigation/Footer';

// Modals and Drawers
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { SearchModal } from './components/search/SearchModal';
import { QuickViewModal } from './components/product/QuickViewModal';
import { AccountModal } from './components/account/AccountModal';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Collections } from './pages/Collections';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Wishlist } from './pages/Wishlist';
import { CartPage } from './pages/CartPage';

// Persistence helpers
import {
  loadCartFromStorage,
  saveCartToStorage,
  loadWishlistFromStorage,
  saveWishlistToStorage,
} from './utils/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart & Wishlist state initialized from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => loadWishlistFromStorage());

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    saveCartToStorage(cartItems);
  }, [cartItems]);

  // Sync to localStorage whenever wishlistIds changes
  useEffect(() => {
    saveWishlistToStorage(wishlistIds);
  }, [wishlistIds]);

  // Scroll to top upon route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  const handleNavigate = (
    page: string,
    categoryFilter?: string,
    collectionFilter?: string
  ) => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    if (collectionFilter) {
      setSelectedCollectionId(collectionFilter);
    }
    setCurrentPage(page);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-details');
  };

  const handleAddToCart = (product: Product, size?: string) => {
    setCartItems((prev) => {
      const chosenSize = size || product.sizes?.[0];
      // Prevent duplicates: find by unique product.id
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );

      let next: CartItem[];
      if (existingIndex > -1) {
        next = prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: item.quantity + 1,
                selectedSize: chosenSize || item.selectedSize,
              }
            : item
        );
      } else {
        next = [
          ...prev,
          {
            id: product.id,
            product,
            quantity: 1,
            selectedSize: chosenSize,
          },
        ];
      }
      saveCartToStorage(next);
      return next;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) => {
        const next = prev.map((item) =>
          item.id === productId || item.product.id === productId
            ? { ...item, quantity }
            : item
        );
        saveCartToStorage(next);
        return next;
      });
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => {
      const next = prev.filter(
        (item) => item.id !== productId && item.product.id !== productId
      );
      saveCartToStorage(next);
      return next;
    });
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const isExisting = prev.includes(product.id);
      const next = isExisting
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id];
      saveWishlistToStorage(next);
      return next;
    });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const next = prev.filter((id) => id !== productId);
      saveWishlistToStorage(next);
      return next;
    });
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    saveCartToStorage([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211D]">
      {/* 1. Top Configurable Announcement Banner */}
      <PromoBanner onActionClick={() => handleNavigate('contact')} />

      {/* 2. Sticky Header with 3-Zone Contract */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => handleNavigate('wishlist')}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
      />

      {/* 3. Mobile Drawer Navigation */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* 4. Active Main Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home
            products={INITIAL_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onNavigate={handleNavigate}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'shop' && (
          <Shop
            products={INITIAL_PRODUCTS}
            initialCategory={selectedCategory}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentPage === 'product-details' && selectedProduct && (
          <ProductDetails
            product={selectedProduct}
            allProducts={INITIAL_PRODUCTS}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
            onBookAppointment={() => handleNavigate('contact')}
            wishlistIds={wishlistIds}
          />
        )}

        {currentPage === 'collections' && (
          <Collections
            selectedCollectionId={selectedCollectionId}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectCollection={(colId) => setSelectedCollectionId(colId)}
          />
        )}

        {currentPage === 'about' && <About onNavigate={handleNavigate} />}

        {currentPage === 'contact' && <Contact />}

        {currentPage === 'wishlist' && (
          <Wishlist
            products={INITIAL_PRODUCTS}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onCheckout={() => setIsCheckoutOpen(true)}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* 5. Luxury Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Global Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setIsCheckoutOpen(true)}
        onViewCartPage={() => handleNavigate('cart')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
        onViewAllResults={(query) => {
          setSelectedCategory('all');
          handleNavigate('shop');
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onViewDetails={handleSelectProduct}
        isWishlisted={
          quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
      />

      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onBookAppointment={() => handleNavigate('contact')}
      />
    </div>
  );
}
