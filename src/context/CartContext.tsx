import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '../types';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  couponCode: string | null;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CART_STORAGE_KEY = 'sj_collections_cart_v1';
const FREE_SHIPPING_THRESHOLD = 10000; // 10,000 PKR
const FLAT_SHIPPING_FEE = 350; // 350 PKR nationwide

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error persisting cart:', e);
    }
  }, [items]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (product: Product, variant: ProductVariant, quantity: number = 1): { success: boolean; message: string } => {
    const cartItemId = `${product.id}_${variant.id}`;
    const existing = items.find((item) => item.id === cartItemId);
    const currentQtyInCart = existing ? existing.quantity : 0;
    const requestedTotalQty = currentQtyInCart + quantity;

    if (requestedTotalQty > variant.stock) {
      return {
        success: false,
        message: variant.stock <= 0
          ? 'Selected variant is currently out of stock.'
          : `Only ${variant.stock} units available in stock.`
      };
    }

    const unitPrice = product.salePrice ?? product.price;

    setItems((prev) => {
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: requestedTotalQty } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          product,
          variant,
          quantity,
          unitPrice
        }
      ];
    });

    setIsCartOpen(true);
    return { success: true, message: 'Added to your shopping bag' };
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          const maxAllowed = item.variant.stock;
          const adjustedQty = Math.min(quantity, maxAllowed);
          return { ...item, quantity: adjustedQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'WELCOME10' || trimmed === 'SJLUXURY' || trimmed === 'LAUNCH10') {
      setCouponCode(trimmed);
      return { success: true, message: '10% Launch Privilege applied!' };
    }
    return { success: false, message: 'Invalid promotional voucher code.' };
  };

  const removeCoupon = () => {
    setCouponCode(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE;
  const discount = couponCode ? Math.round(subtotal * 0.1) : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        shippingFee,
        discount,
        total,
        couponCode,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
