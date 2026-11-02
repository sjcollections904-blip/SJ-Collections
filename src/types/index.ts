export type ProductCategory = 
  | 'mens-clothing'
  | 'womens-clothing'
  | 'mens-footwear'
  | 'womens-footwear'
  | 'wallets'
  | 'bags'
  | 'accessories';

export type Gender = 'men' | 'women' | 'unisex';

export interface ProductVariant {
  id: string;
  sku: string;
  size?: string;
  color: string;
  colorHex: string;
  material?: string;
  fit?: string;
  dimensions?: string;
  stock: number;
  priceModifier?: number; // In case variant has different price
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  categoryLabel: string;
  gender: Gender;
  description: string;
  details: string[];
  price: number; // in PKR
  salePrice?: number; // in PKR if on sale
  images: string[];
  variants: ProductVariant[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  materials: string[];
  fit?: string;
  dimensions?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestseller?: boolean;
  createdAt: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique cart item id (e.g. productId_variantId)
  product: Product;
  variant: ProductVariant;
  quantity: number;
  unitPrice: number;
}

export interface CustomerAddress {
  id: string;
  label: string; // 'Home' | 'Work' | 'Other'
  fullName: string;
  phone: string;
  province: string;
  city: string;
  area: string;
  address: string;
  isDefault?: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  size?: string;
  color: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface Order {
  id: string; // e.g. SJC-2026-8942
  createdAt: string;
  customerName: string;
  customerEmail?: string;
  customerPhone: string;
  shippingAddress: {
    province: string;
    city: string;
    area: string;
    streetAddress: string;
    deliveryInstructions?: string;
  };
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)';
  status: 'pending_whatsapp_confirmation' | 'Pending Confirmation' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';
  trackingNumber?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: CustomerAddress[];
}

export interface FilterState {
  category: string;
  gender: string;
  sizes: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'popular';
  inStockOnly: boolean;
  searchQuery: string;
}
