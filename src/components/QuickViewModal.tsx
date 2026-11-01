import React, { useState } from 'react';
import { X, Check, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetails
}) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0] || {
      id: 'default',
      sku: product.sku,
      color: product.colors[0]?.name || 'Standard',
      colorHex: product.colors[0]?.hex || '#1A1A1A',
      stock: 5
    }
  );
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<string | null>(null);

  const price = product.salePrice ?? product.price;
  const formattedPrice = new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    maximumFractionDigits: 0
  }).format(price).replace('PKR', 'PKR ');

  const handleVariantChange = (size?: string, colorName?: string) => {
    const targetSize = size || selectedVariant.size;
    const targetColor = colorName || selectedVariant.color;

    const matched = product.variants.find(
      (v) => (v.size === targetSize || !v.size) && (v.color === targetColor || !v.color)
    );

    if (matched) {
      setSelectedVariant(matched);
      if (quantity > matched.stock) {
        setQuantity(Math.max(1, matched.stock));
      }
    }
  };

  const handleAdd = () => {
    const result = addToCart(product, selectedVariant, quantity);
    setFeedback(result.message);
    if (result.success) {
      setTimeout(() => {
        onClose();
      }, 1000);
    }
  };

  const waInquiryUrl = `https://wa.me/923333368420?text=${encodeURIComponent(
    `Hello SJ Collections, I would like to inquire about the ${product.name} (SKU: ${selectedVariant.sku}, Size: ${selectedVariant.size || 'N/A'}, Color: ${selectedVariant.color}). Is this available for immediate dispatch?`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#F9F8F4] w-full max-w-3xl rounded-none shadow-2xl border border-[#E8E5DE] z-10 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#1A1A1A] hover:opacity-70 bg-white/80 rounded-full"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 bg-[#F0ECE1] relative aspect-[4/3] md:aspect-auto">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] bg-[#1A1A1A] text-[#F9F8F4] px-2.5 py-1">
              {product.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content & Selectors */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#8A8882]">
              SKU: {selectedVariant.sku}
            </div>

            <h2 className="font-serif-luxury text-2xl font-normal text-[#1A1A1A] mt-1 leading-snug">
              {product.name}
            </h2>

            {/* Price */}
            <div className="mt-2 text-lg font-semibold text-[#1A1A1A] tabular-nums">
              {formattedPrice}
            </div>

            <p className="text-xs text-[#555] mt-3 line-clamp-3 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                  <span className="uppercase tracking-wider font-semibold">Select Size</span>
                  <span className="text-[#8A8882]">{selectedVariant.size || 'Choose size'}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map((s) => {
                    const isSelected = selectedVariant.size === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => handleVariantChange(s, undefined)}
                        className={`px-3 py-2 text-xs font-medium border text-center transition-colors ${
                          isSelected
                            ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#F9F8F4]'
                            : 'border-[#D8D4CC] bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-[#1A1A1A]">
                  <span className="uppercase tracking-wider font-semibold">Select Color</span>
                  <span className="text-[#8A8882]">{selectedVariant.color}</span>
                </div>
                <div className="flex items-center gap-2.5 mt-2">
                  {product.colors.map((c) => {
                    const isSelected = selectedVariant.color === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleVariantChange(undefined, c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-transform p-0.5 ${
                          isSelected ? 'border-[#1A1A1A] scale-110' : 'border-transparent'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full block border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Stock Availability */}
            <div className="mt-4 text-xs">
              {selectedVariant.stock > 0 ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({selectedVariant.stock} available for immediate dispatch)
                </span>
              ) : (
                <span className="text-red-700 font-medium">Currently Sold Out</span>
              )}
            </div>

            {/* Quantity Selector */}
            {selectedVariant.stock > 0 && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">Quantity:</span>
                <div className="flex items-center border border-[#D8D4CC] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1 text-sm font-medium hover:bg-[#F9F8F4]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
                    className="px-3 py-1 text-sm font-medium hover:bg-[#F9F8F4]"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {feedback && (
              <div className="mt-3 text-xs text-[#1A1A1A] bg-[#E8E5DE] p-2 text-center font-medium">
                {feedback}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-4 border-t border-[#E8E5DE] space-y-2">
            <button
              type="button"
              disabled={selectedVariant.stock <= 0}
              onClick={handleAdd}
              className={`w-full py-3 px-4 text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 transition-colors ${
                selectedVariant.stock > 0
                  ? 'bg-[#1A1A1A] text-[#F9F8F4] hover:bg-black'
                  : 'bg-[#D8D4CC] text-[#8A8882] cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{selectedVariant.stock > 0 ? 'Add to Shopping Bag' : 'Sold Out'}</span>
            </button>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={waInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 border border-[#1A1A1A] text-[#1A1A1A] text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#1A1A1A] hover:text-[#F9F8F4] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Atelier</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onViewFullDetails(product.id);
                }}
                className="flex-1 py-2 px-3 bg-white border border-[#D8D4CC] text-[#1A1A1A] text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-1 hover:border-[#1A1A1A] transition-colors"
              >
                <span>Full Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
