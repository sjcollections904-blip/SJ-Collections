import React, { useState, useEffect } from 'react';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RefreshCw,
  MessageCircle,
  Ruler,
  Check,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNavigateToCheckout: () => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onSelectProduct,
  onQuickView,
  onNavigateToCheckout,
  onNavigate
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
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
  const [notification, setNotification] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Sync variant if product changes
  useEffect(() => {
    if (product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  const isWishlisted = isInWishlist(product.id);
  const price = product.salePrice ?? product.price;

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  const handleVariantSelect = (size?: string, colorName?: string) => {
    const targetSize = size ?? selectedVariant.size;
    const targetColor = colorName ?? selectedVariant.color;

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

  const handleAddToCart = () => {
    const res = addToCart(product, selectedVariant, quantity);
    setNotification(res.message);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBuyNow = () => {
    const res = addToCart(product, selectedVariant, quantity);
    if (res.success) {
      onNavigateToCheckout();
    } else {
      setNotification(res.message);
    }
  };

  // WhatsApp concierge prefilled link
  const waProductUrl = `https://wa.me/923333368420?text=${encodeURIComponent(
    `Hello SJ Collections Atelier, I would like to inquire about purchasing: ${product.name} (SKU: ${selectedVariant.sku}, Size: ${selectedVariant.size || 'N/A'}, Shade: ${selectedVariant.color}). Price: PKR ${price.toLocaleString()}. Is this ready for Cash on Delivery dispatch?`
  )}`;

  // Related products from same category or gender
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender))
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="pb-6 text-xs text-[#8A8882] flex items-center gap-2 uppercase tracking-wider">
        <button onClick={() => onNavigate('home')} className="hover:text-[#1A1A1A]">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate('catalog', { category: product.category })}
          className="hover:text-[#1A1A1A]"
        >
          {product.categoryLabel}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1A1A1A] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
        {/* Left: Gallery (Sticky on Desktop) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4 sticky top-28">
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 sm:w-20 aspect-[3/4] border transition-all overflow-hidden bg-[#F4F0E8] ${
                    activeImageIndex === idx ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E8E5DE] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Visual Frame */}
          <div className="flex-1 relative aspect-[3/4] bg-[#F4F0E8] border border-[#E8E5DE] overflow-hidden group">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md ${
                isWishlisted
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white/80 backdrop-blur-sm text-[#1A1A1A] hover:bg-white'
              }`}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : 'stroke-[1.5]'}`} />
            </button>
          </div>
        </div>

        {/* Right: Contiguous Purchase Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header Info */}
          <div className="border-b border-[#E8E5DE] pb-6">
            <div className="flex items-center justify-between text-xs text-[#8A8882] uppercase tracking-[0.18em]">
              <span>{product.categoryLabel}</span>
              <span>SKU: {selectedVariant.sku}</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] mt-2 leading-tight">
              {product.name}
            </h1>

            {/* Price Presentation */}
            <div className="mt-4 flex items-baseline gap-3 tabular-nums">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-semibold text-[#1A1A1A]">
                    {formatPKR(product.salePrice)}
                  </span>
                  <span className="text-base text-[#8A8882] line-through">
                    {formatPKR(product.price)}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#9E2A2B] font-semibold">
                    Privilege Savings
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold text-[#1A1A1A]">
                  {formatPKR(product.price)}
                </span>
              )}
            </div>

            <div className="mt-2 text-xs text-[#8A8882]">
              Tax included. Cash on Delivery available at doorstep across Pakistan.
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#444] leading-relaxed">
            {product.description}
          </p>

          {/* Sizing Selector */}
          {product.sizes.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  Selected Size:{' '}
                  <span className="font-normal text-[#8A8882]">{selectedVariant.size}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="flex items-center gap-1 text-[#8A8882] hover:text-[#1A1A1A] underline underline-offset-4"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size & Fitting Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedVariant.size === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => handleVariantSelect(s, undefined)}
                      className={`px-3 sm:px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border text-center transition-colors ${
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

          {/* Color Palette Selector */}
          {product.colors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  Shade:{' '}
                  <span className="font-normal text-[#8A8882]">{selectedVariant.color}</span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((c) => {
                  const isSelected = selectedVariant.color === c.name;
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => handleVariantSelect(undefined, c.name)}
                      className={`p-1 rounded-full border-2 transition-transform ${
                        isSelected ? 'border-[#1A1A1A] scale-110' : 'border-transparent'
                      }`}
                      title={c.name}
                    >
                      <span
                        className="w-7 h-7 rounded-full block border border-black/10"
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-time Inventory Feedback */}
          <div className="p-3 bg-[#EFECE4] border border-[#E8E5DE] text-xs">
            {selectedVariant.stock > 0 ? (
              <div className="flex items-center justify-between">
                <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-700" />
                  In Stock & Ready for Immediate Dispatch
                </span>
                <span className="text-[#8A8882] tabular-nums">
                  {selectedVariant.stock} available
                </span>
              </div>
            ) : (
              <span className="text-red-700 font-medium">
                Variant Currently Sold Out — Contact Atelier on WhatsApp for Bespoke Order
              </span>
            )}
          </div>

          {/* Quantity & CTAs */}
          {selectedVariant.stock > 0 && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1A1A1A]">
                  Quantity
                </span>
                <div className="flex items-center border border-[#D8D4CC] bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-sm font-medium hover:bg-[#F9F8F4]"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold tabular-nums min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={quantity >= selectedVariant.stock}
                    onClick={() => setQuantity((q) => Math.min(selectedVariant.stock, q + 1))}
                    className="px-3.5 py-1.5 text-sm font-medium hover:bg-[#F9F8F4]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-white border border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-[#1A1A1A] hover:text-[#F9F8F4] transition-colors"
                >
                  Buy Now (COD)
                </button>
              </div>

              {notification && (
                <div className="p-2.5 bg-[#E8E5DE] text-xs text-[#1A1A1A] text-center font-medium animate-in fade-in">
                  {notification}
                </div>
              )}
            </div>
          )}

          {/* WhatsApp Direct Inquiry Button */}
          <div className="pt-2">
            <a
              href={waProductUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 border border-[#2C2C2C] bg-transparent text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.16em] flex items-center justify-center gap-2 hover:bg-[#1A1A1A] hover:text-[#F9F8F4] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Inquire on WhatsApp (+92 333 3368420)</span>
            </a>
          </div>

          {/* Delivery & Assurance Badges */}
          <div className="pt-6 border-t border-[#E8E5DE] space-y-3 text-xs text-[#555]">
            <div className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1A1A]">Complimentary Nationwide Express Delivery</strong>
                <p className="text-[#8A8882]">3-5 business days via tracked luxury courier service across Pakistan.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1A1A]">Cash on Delivery (COD) Only</strong>
                <p className="text-[#8A8882]">Inspect your packaging and pay cash at your doorstep safely.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <RefreshCw className="w-4 h-4 text-[#1A1A1A] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A1A1A]">7-Day Size & Fitting Exchange</strong>
                <p className="text-[#8A8882]">Unworn items in pristine condition eligible for complimentary exchange.</p>
              </div>
            </div>
          </div>

          {/* Garment Details & Material Specifications */}
          <div className="pt-6 border-t border-[#E8E5DE] space-y-4">
            <h3 className="font-serif-luxury text-lg text-[#1A1A1A]">Craftsmanship & Details</h3>
            <ul className="space-y-2 text-xs text-[#555]">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#1A1A1A] font-bold">·</span>
                  <span>{detail}</span>
                </li>
              ))}
              {product.materials.length > 0 && (
                <li className="flex items-start gap-2">
                  <span className="text-[#1A1A1A] font-bold">·</span>
                  <span>Primary Materials: {product.materials.join(', ')}</span>
                </li>
              )}
              {product.fit && (
                <li className="flex items-start gap-2">
                  <span className="text-[#1A1A1A] font-bold">·</span>
                  <span>Fit Profile: {product.fit}</span>
                </li>
              )}
              {product.dimensions && (
                <li className="flex items-start gap-2">
                  <span className="text-[#1A1A1A] font-bold">·</span>
                  <span>Dimensions: {product.dimensions}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Related Pieces */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E8E5DE]">
          <div className="flex items-baseline justify-between mb-8">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A]">
              Complementary Creations
            </h3>
            <button
              onClick={() => onNavigate('catalog', { category: product.category })}
              className="text-xs uppercase tracking-wider font-semibold text-[#8A8882] hover:text-[#1A1A1A]"
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full min-w-0">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </section>
      )}

      {/* Sizing Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-[#F9F8F4] w-full max-w-xl p-6 sm:p-8 border border-[#E8E5DE] shadow-2xl z-10">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E5DE]">
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">SJ Size & Fitting Guide</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="text-[#8A8882] hover:text-[#1A1A1A]">
                ✕
              </button>
            </div>
            <div className="py-4 text-xs text-[#555] space-y-4">
              <p>
                Our bespoke cuts are calibrated for contemporary luxury silhouettes. If you desire bespoke measurements, our atelier provides custom tailoring via WhatsApp.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-[#D8D4CC] text-xs">
                  <thead>
                    <tr className="bg-[#EFECE4]">
                      <th className="p-2 border border-[#D8D4CC]">Size</th>
                      <th className="p-2 border border-[#D8D4CC]">Chest (Inches)</th>
                      <th className="p-2 border border-[#D8D4CC]">Shoulder (Inches)</th>
                      <th className="p-2 border border-[#D8D4CC]">Length (Inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border border-[#D8D4CC] font-semibold">38 (Small)</td>
                      <td className="p-2 border border-[#D8D4CC]">38 - 40</td>
                      <td className="p-2 border border-[#D8D4CC]">17.5</td>
                      <td className="p-2 border border-[#D8D4CC]">28.5</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-[#D8D4CC] font-semibold">40 (Medium)</td>
                      <td className="p-2 border border-[#D8D4CC]">41 - 42</td>
                      <td className="p-2 border border-[#D8D4CC]">18.5</td>
                      <td className="p-2 border border-[#D8D4CC]">29.5</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-[#D8D4CC] font-semibold">42 (Large)</td>
                      <td className="p-2 border border-[#D8D4CC]">43 - 44</td>
                      <td className="p-2 border border-[#D8D4CC]">19.5</td>
                      <td className="p-2 border border-[#D8D4CC]">30.5</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-[#D8D4CC] font-semibold">44 (X-Large)</td>
                      <td className="p-2 border border-[#D8D4CC]">45 - 46</td>
                      <td className="p-2 border border-[#D8D4CC]">20.5</td>
                      <td className="p-2 border border-[#D8D4CC]">31.5</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="pt-4 border-t border-[#E8E5DE] text-right">
              <button
                type="button"
                onClick={() => setIsSizeGuideOpen(false)}
                className="px-5 py-2 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
