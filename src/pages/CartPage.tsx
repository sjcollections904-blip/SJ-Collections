import React, { useState } from 'react';
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, Tag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartPageProps {
  onNavigateToCheckout: () => void;
  onNavigateToCatalog: () => void;
  onSelectProduct: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigateToCheckout,
  onNavigateToCatalog,
  onSelectProduct
}) => {
  const {
    items,
    itemCount,
    subtotal,
    shippingFee,
    discount,
    total,
    couponCode,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [deliveryNote, setDeliveryNote] = useState('');

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyCoupon(inputCoupon);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setInputCoupon('');
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#EFECE4] flex items-center justify-center mx-auto text-[#8A8882]">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#8A8882] max-w-md mx-auto">
          Explore our signature creations in menswear, womenswear, hand-welted shoes, and bespoke leather goods.
        </p>
        <button
          type="button"
          onClick={onNavigateToCatalog}
          className="mt-4 px-8 py-3.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-black transition-colors"
        >
          Explore Collections
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Title */}
      <div className="pb-8 border-b border-[#E8E5DE] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8882]">
            Review Selections
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] mt-1">
            Shopping Bag ({itemCount})
          </h1>
        </div>
        <button
          onClick={onNavigateToCatalog}
          className="text-xs font-medium uppercase tracking-wider text-[#8A8882] hover:text-[#1A1A1A] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Alert Box */}
      <div className="my-6 p-4 bg-[#EFECE4] border border-[#E8E5DE] rounded-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          {amountNeededForFreeShipping > 0 ? (
            <p className="text-[#1A1A1A]">
              Add <span className="font-semibold">{formatPKR(amountNeededForFreeShipping)}</span> more to your bag for{' '}
              <span className="font-semibold text-emerald-800">Complimentary Express Delivery</span> across Pakistan.
            </p>
          ) : (
            <p className="font-semibold text-emerald-800">
              ✓ Qualified for Complimentary Nationwide Express Delivery
            </p>
          )}
          <span className="text-[#8A8882] tabular-nums font-medium">Threshold: PKR 10,000</span>
        </div>
        <div className="w-full bg-[#D8D4CC] h-2 mt-2.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1A1A1A] h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Items Table */}
        <div className="lg:col-span-8 bg-white border border-[#E8E5DE] divide-y divide-[#E8E5DE]">
          <div className="hidden sm:grid grid-cols-12 p-4 text-[11px] font-semibold uppercase tracking-wider text-[#8A8882] bg-[#F9F8F4]">
            <span className="col-span-6">Creation</span>
            <span className="col-span-2 text-center">Unit Price</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Subtotal</span>
          </div>

          {items.map((item) => (
            <div key={item.id} className="p-4 sm:p-6 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center flex flex-col gap-4">
              {/* Product Info */}
              <div className="sm:col-span-6 flex gap-3 sm:gap-4 min-w-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 sm:w-24 aspect-[3/4] object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE] cursor-pointer"
                  onClick={() => onSelectProduct(item.product.id)}
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A8882] block truncate">
                    {item.product.categoryLabel}
                  </span>
                  <h3
                    className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A] hover:underline cursor-pointer line-clamp-1"
                    onClick={() => onSelectProduct(item.product.id)}
                  >
                    {item.product.name}
                  </h3>
                  <div className="text-xs text-[#8A8882] space-y-0.5">
                    {item.variant.size && <p>Size: {item.variant.size}</p>}
                    <p>Color: {item.variant.color}</p>
                    <p className="text-[10px] uppercase tracking-wider text-[#A09E97]">
                      SKU: {item.variant.sku}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="pt-1 text-xs text-red-700 hover:text-red-900 flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>

              {/* Desktop Unit Price */}
              <div className="hidden sm:block sm:col-span-2 text-center text-xs sm:text-sm tabular-nums text-[#1A1A1A]">
                {formatPKR(item.unitPrice)}
              </div>

              {/* Desktop Quantity Selector */}
              <div className="hidden sm:flex sm:col-span-2 sm:justify-center">
                <div className="flex items-center border border-[#D8D4CC] bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#F9F8F4]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums text-center min-w-[28px]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    disabled={item.quantity >= item.variant.stock}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`px-2.5 py-1 text-xs ${
                      item.quantity >= item.variant.stock
                        ? 'text-[#CCC] cursor-not-allowed'
                        : 'hover:bg-[#F9F8F4]'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Desktop Total Price */}
              <div className="hidden sm:block sm:col-span-2 text-right font-semibold text-sm tabular-nums text-[#1A1A1A]">
                {formatPKR(item.unitPrice * item.quantity)}
              </div>

              {/* Mobile Combined Controls Bar */}
              <div className="flex sm:hidden items-center justify-between pt-3 border-t border-[#E8E5DE]">
                <div className="flex items-center border border-[#D8D4CC] bg-white">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2.5 py-1 text-xs hover:bg-[#F9F8F4]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold tabular-nums text-center min-w-[28px]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    disabled={item.quantity >= item.variant.stock}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className={`px-2.5 py-1 text-xs ${
                      item.quantity >= item.variant.stock
                        ? 'text-[#CCC] cursor-not-allowed'
                        : 'hover:bg-[#F9F8F4]'
                    }`}
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm font-semibold tabular-nums text-[#1A1A1A] block">
                    {formatPKR(item.unitPrice * item.quantity)}
                  </span>
                  {item.quantity > 1 && (
                    <span className="text-[10px] text-[#8A8882] tabular-nums block">
                      {formatPKR(item.unitPrice)} each
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Delivery Instructions note */}
          <div className="p-4 sm:p-6 bg-[#F9F8F4]">
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Special Delivery Notes or Fitting Inquiries (Optional)
            </label>
            <textarea
              rows={2}
              value={deliveryNote}
              onChange={(e) => setDeliveryNote(e.target.value)}
              placeholder="e.g. Please call before arrival; deliver during business hours; gate 2."
              className="w-full text-xs p-3 bg-white border border-[#D8D4CC] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-4 bg-white border border-[#E8E5DE] p-6 space-y-6 shadow-xs sticky top-28">
          <h2 className="font-serif-luxury text-xl text-[#1A1A1A] pb-3 border-b border-[#E8E5DE]">
            Order Summary
          </h2>

          {/* Promo Code Form */}
          <div>
            {couponCode ? (
              <div className="flex items-center justify-between bg-[#F4F0E8] p-3 text-xs border border-[#E0DBCF]">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#1A1A1A]" />
                  <span className="font-semibold">{couponCode} (10% Off)</span>
                </div>
                <button onClick={removeCoupon} className="text-xs text-[#8A8882] hover:text-black underline">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="Voucher code (WELCOME10)"
                  className="flex-1 border border-[#D8D4CC] px-3 py-2 text-xs uppercase placeholder:normal-case placeholder:text-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-medium uppercase tracking-wider hover:bg-black"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
          </div>

          {/* Calculation */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#8A8882]">
              <span>Items Subtotal</span>
              <span className="tabular-nums text-[#1A1A1A]">{formatPKR(subtotal)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Promotional Savings</span>
                <span className="tabular-nums">-{formatPKR(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-[#8A8882]">
              <span>Nationwide Shipping</span>
              <span className="tabular-nums text-[#1A1A1A]">
                {shippingFee === 0 ? 'COMPLIMENTARY' : formatPKR(shippingFee)}
              </span>
            </div>

            <div className="flex justify-between text-base font-semibold text-[#1A1A1A] pt-3 border-t border-[#E8E5DE]">
              <span>Estimated Total</span>
              <span className="tabular-nums">{formatPKR(total)}</span>
            </div>
          </div>

          {/* COD Notice */}
          <div className="bg-[#F9F8F4] p-3 rounded-xs border border-[#E8E5DE] space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1A1A]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <p className="text-[11px] text-[#8A8882] leading-relaxed">
              No online payment or credit card required. Pay cash directly to the courier representative when the parcel arrives at your address.
            </p>
          </div>

          {/* Proceed to Checkout Button */}
          <button
            type="button"
            onClick={onNavigateToCheckout}
            className="w-full py-4 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.18em] hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
