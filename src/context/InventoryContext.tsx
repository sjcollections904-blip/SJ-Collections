import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

interface InventoryContextType {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getVariantStock: (productId: string, variantId: string) => number;
  deductStock: (items: { productId: string; variantId?: string; sku?: string; quantity: number }[]) => boolean;
  restoreStock: (items: { productId: string; variantId?: string; sku?: string; size?: string; color?: string; quantity: number }[]) => void;
  updateProductStock: (productId: string, variantId: string, newStock: number) => void;
}

const STORAGE_KEY = 'sj_collections_inventory_v3';

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        // Merge missing products from INITIAL_PRODUCTS so newly added catalog items always appear
        const existingIds = new Set(parsed.map((p) => p.id));
        const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
        if (missing.length > 0) {
          return [...parsed, ...missing];
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save inventory to localStorage', e);
    }
  }, [products]);

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  const getVariantStock = (productId: string, variantId: string): number => {
    const product = products.find((p) => p.id === productId);
    if (!product) return 0;
    const variant = product.variants.find((v) => v.id === variantId);
    return variant ? variant.stock : 0;
  };

  const deductStock = (items: { productId: string; variantId?: string; sku?: string; quantity: number }[]): boolean => {
    // First verify all items have enough stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return false;
      const variant = product.variants.find(
        (v) => (item.variantId && v.id === item.variantId) || (item.sku && v.sku && v.sku.toLowerCase() === item.sku.toLowerCase())
      );
      if (!variant || variant.stock < item.quantity) {
        return false;
      }
    }

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const itemsForProduct = items.filter((i) => i.productId === prod.id);
        if (itemsForProduct.length === 0) return prod;

        const updatedVariants = prod.variants.map((v) => {
          const matchingItems = itemsForProduct.filter(
            (i) => (i.variantId && i.variantId === v.id) || (i.sku && v.sku && i.sku.toLowerCase() === v.sku.toLowerCase())
          );
          if (matchingItems.length > 0) {
            const deductedQty = matchingItems.reduce((sum, i) => sum + i.quantity, 0);
            return { ...v, stock: Math.max(0, v.stock - deductedQty) };
          }
          return v;
        });

        return { ...prod, variants: updatedVariants };
      })
    );

    return true;
  };

  const restoreStock = (items: { productId: string; variantId?: string; sku?: string; size?: string; color?: string; quantity: number }[]) => {
    if (!items || items.length === 0) return;

    setProducts((prev) =>
      prev.map((prod) => {
        const itemsForProduct = items.filter((i) => i.productId === prod.id);
        if (itemsForProduct.length === 0) return prod;

        let anyMatched = false;
        const updatedVariants = prod.variants.map((v) => {
          const matches = itemsForProduct.filter((item) => {
            if (item.variantId && item.variantId === v.id) return true;
            if (item.sku && v.sku && item.sku.trim().toLowerCase() === v.sku.trim().toLowerCase()) return true;
            if (item.size && item.color && v.size === item.size && v.color === item.color) return true;
            if (item.sku && v.sku && (item.sku.includes(v.sku) || v.sku.includes(item.sku))) return true;
            return false;
          });

          if (matches.length > 0) {
            anyMatched = true;
            const addedQty = matches.reduce((sum, m) => sum + (m.quantity || 1), 0);
            return { ...v, stock: v.stock + addedQty };
          }
          return v;
        });

        // Fallback: If no exact variant matched (e.g. single variant item with loose SKU), restore to first variant
        if (!anyMatched && prod.variants.length > 0) {
          const totalQty = itemsForProduct.reduce((sum, m) => sum + (m.quantity || 1), 0);
          return {
            ...prod,
            variants: prod.variants.map((v, idx) =>
              idx === 0 ? { ...v, stock: v.stock + totalQty } : v
            )
          };
        }

        return { ...prod, variants: updatedVariants };
      })
    );
  };

  const updateProductStock = (productId: string, variantId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        return {
          ...prod,
          variants: prod.variants.map((v) => (v.id === variantId ? { ...v, stock: Math.max(0, newStock) } : v))
        };
      })
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        getProductById,
        getVariantStock,
        deductStock,
        restoreStock,
        updateProductStock
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
