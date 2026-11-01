import React, { useState } from 'react';
import { Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { HERO_IMAGE } from '../data/products';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onQuickView }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [imgSrc, setImgSrc] = useState(product.images[0]);

  // Calculate total stock across variants
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isOutOfStock = totalStock <= 0;
  const isLowStock = !isOutOfStock && totalStock <= 5;

  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(product.price).replace('PKR', 'PKR ');

  const formattedSalePrice = product.salePrice
    ? new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        maximumFractionDigits: 0
      }).format(product.salePrice).replace('PKR', 'PKR ')
    : null;

  return (
    <div className="group relative flex flex-col bg-[#FFFFFF] border border-[#E8E5DE] transition-all duration-300 hover:shadow-md w-full min-w-0">
      {/* Image Container - Aspect ratio 3/4 preserved on all screens */}
      <div
        className="relative aspect-[3/4] overflow-hidden bg-[#F4F2EC] cursor-pointer"
        onClick={() => onSelect(product.id)}
      >
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(HERO_IMAGE)}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Fallback styling placeholder */}
        <div className="absolute inset-0 bg-[#E8E5DE]/10 pointer-events-none" />

        {/* Wishlist Button - 40px+ touch target */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? 'bg-[#1A1A1A] text-white shadow-md'
              : 'bg-[#F9F8F4]/85 backdrop-blur-sm text-[#1A1A1A] hover:bg-white shadow-xs'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
        </button>

        {/* Status Indicators */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1 z-10">
          {product.newArrival && (
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#1A1A1A] text-[#F9F8F4] px-1.5 sm:px-2 py-0.5">
              New
            </span>
          )}
          {product.salePrice && (
            <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#9E2A2B] text-white px-1.5 sm:px-2 py-0.5">
              Privilege
            </span>
          )}
        </div>

        {/* Quick View Button on Desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hidden sm:flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 bg-[#1A1A1A] text-[#F9F8F4] py-2 px-3 text-xs uppercase tracking-[0.14em] font-medium hover:bg-black transition-colors flex items-center justify-center gap-1.5 shadow-md min-h-[38px]"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Details Section - Touch optimized for mobile */}
      <div className="p-2.5 sm:p-5 flex flex-col flex-1 justify-between min-w-0">
        <div className="cursor-pointer min-w-0" onClick={() => onSelect(product.id)}>
          {/* Category & Stock text */}
          <div className="flex items-center justify-between text-[9px] sm:text-[11px] text-[#8A8882] uppercase tracking-[0.14em] min-w-0">
            <span className="truncate pr-1">{product.categoryLabel}</span>
            {isOutOfStock ? (
              <span className="text-[#9E2A2B] font-medium shrink-0">Sold Out</span>
            ) : isLowStock ? (
              <span className="text-[#B07D38] font-medium shrink-0">Low Stock</span>
            ) : (
              <span className="text-[#555] shrink-0 hidden sm:inline">Ready to Ship</span>
            )}
          </div>

          {/* Product Title */}
          <h3 className="font-serif-luxury text-xs sm:text-base font-medium text-[#1A1A1A] mt-1 sm:mt-1.5 line-clamp-2 group-hover:underline underline-offset-4 leading-snug min-w-0">
            {product.name}
          </h3>

          {/* Available Colors preview */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2.5">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full border border-[#D0CCC3]"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-[#8A8882]">+{product.colors.length - 3}</span>
              )}
            </div>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="mt-2 sm:mt-4 pt-2 sm:pt-3 border-t border-[#E8E5DE] flex flex-col xs:flex-row xs:items-baseline xs:justify-between gap-1 min-w-0">
          <div className="tabular-nums min-w-0">
            {formattedSalePrice ? (
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-1.5 min-w-0">
                <span className="text-xs sm:text-base font-semibold text-[#1A1A1A] truncate block">
                  {formattedSalePrice}
                </span>
                <span className="text-[10px] sm:text-xs text-[#8A8882] line-through truncate block">
                  {formattedPrice}
                </span>
              </div>
            ) : (
              <span className="text-xs sm:text-base font-semibold text-[#1A1A1A] truncate block">
                {formattedPrice}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSelect(product.id)}
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-[#8A8882] group-hover:text-[#1A1A1A] transition-colors flex items-center justify-start xs:justify-end shrink-0 pt-0.5"
          >
            Discover
          </button>
        </div>
      </div>
    </div>
  );
};
