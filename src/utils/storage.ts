import { CartItem, Product } from '../types';

export const CART_STORAGE_KEY = 'narnoli_cart';
export const WISHLIST_STORAGE_KEY = 'narnoli_wishlist';

/**
 * Loads cart from localStorage.
 */
export function loadCartFromStorage(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item: any) => {
        const product: Product | undefined = item.product;
        if (!product || !product.id) return null;
        const id = item.id || product.id;
        const quantity =
          typeof item.quantity === 'number' && item.quantity > 0
            ? Math.floor(item.quantity)
            : 1;

        return {
          id,
          product,
          quantity,
          selectedSize: item.selectedSize,
          engraving: item.engraving,
        } as CartItem;
      })
      .filter((item): item is CartItem => item !== null);
  } catch (error) {
    console.error('Error reading narnoli_cart from localStorage:', error);
    return [];
  }
}

/**
 * Saves cart to localStorage.
 */
export function saveCartToStorage(cart: CartItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving narnoli_cart to localStorage:', error);
  }
}

/**
 * Loads wishlist from localStorage.
 */
export function loadWishlistFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Filter to valid unique string IDs
    const validIds = parsed.filter(
      (id): id is string => typeof id === 'string' && id.trim().length > 0
    );
    return Array.from(new Set(validIds));
  } catch (error) {
    console.error('Error reading narnoli_wishlist from localStorage:', error);
    return [];
  }
}

/**
 * Saves wishlist to localStorage.
 */
export function saveWishlistToStorage(wishlist: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const unique = Array.from(new Set(wishlist));
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(unique));
  } catch (error) {
    console.error('Error saving narnoli_wishlist to localStorage:', error);
  }
}
