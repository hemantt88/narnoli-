export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: 'gold' | 'diamond' | 'silver' | 'rajputi' | 'kundan' | 'silverware' | 'timepieces' | 'custom';
  collectionId?: string;
  price: number;
  originalPrice?: number;
  metal: string;
  purity: string;
  grossWeight: string;
  diamondWeight?: string;
  stoneDetails?: string;
  hallmark: string;
  certification?: string;
  images: string[];
  description: string;
  features: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  occasions: string[];
  sizes?: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  featuredCount: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  badge?: string;
  itemCount: number;
}

export interface NavigationSubItem {
  label: string;
  category?: string;
  collectionId?: string;
  isHighlight?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  page?: 'home' | 'shop' | 'collections' | 'about' | 'contact' | 'wishlist' | 'cart';
  categoryFilter?: string;
  collectionFilter?: string;
  subItems?: NavigationSubItem[];
}

export interface CartItem {
  id: string; // Unique identifier matching product.id
  product: Product;
  quantity: number;
  selectedSize?: string;
  engraving?: string;
}

export interface FilterState {
  category: string;
  metal: string;
  purity: string;
  occasion: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest';
  searchQuery: string;
}

export interface Showroom {
  city: string;
  name: string;
  address: string;
  phone: string;
  timing: string;
  isFlagship?: boolean;
}

export interface BrandConfig {
  name: string;
  wordmark: string;
  tagline: string;
  yearEstablished: number;
  foundingCity: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  showrooms: Showroom[];
  announcement: {
    enabled: boolean;
    text: string;
    actionText: string;
    actionHref: string;
  };
  trustPillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}
