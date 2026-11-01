import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToCart: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToCart,
  onContinueShopping
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
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const result = applyCoupon(inputCoupon);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setInputCoupon('');
    }
  };

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F9F8F4] shadow-2xl flex flex-col border-l border-[#E8E5DE]">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8E5DE] flex items-center justify-between bg-[#F9F8F4]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#1A1A1A] stroke-[1.5]" />
              <h2 className="font-serif-luxury text-xl font-medium tracking-wide text-[#1A1A1A]">
                Shopping Bag
              </h2>
              <span className="text-xs text-[#8A8882] tabular-nums font-medium">({itemCount})</span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#1A1A1A] hover:text-[#8A8882] focus:outline-none"
              aria-label="Close shopping bag"
            >
              <X className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

          {/* Complimentary Shipping Progress Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#EFECE4] border-b border-[#E8E5DE]">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-xs text-[#1A1A1A] leading-tight">
                Add <span className="font-semibold">{formatPKR(amountNeededForFreeShipping)}</span> more for{' '}
                <span className="font-semibold text-emerald-800">Complimentary Nationwide Shipping</span>
              </p>
            ) : (
              <p className="text-xs font-semibold text-emerald-800 leading-tight">
                ✓ You have qualified for Complimentary Nationwide Delivery!
              </p>
            )}
            <div className="w-full bg-[#D8D4CC] h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-[#1A1A1A] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-[#E8E5DE]">
            {items.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#8A8882] stroke-[1] mx-auto opacity-50" />
                <p className="font-serif-luxury text-lg text-[#1A1A1A]">Your shopping bag is empty</p>
                <p className="text-xs text-[#8A8882] max-w-xs mx-auto">
                  Explore our luxury collections of menswear, womenswear, footwear, and bespoke leather goods.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onContinueShopping();
                  }}
                  className="mt-4 inline-block bg-[#1A1A1A] text-[#F9F8F4] px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors"
                >
                  Explore Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE]"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif-luxury text-sm font-medium text-[#1A1A1A] leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#8A8882] hover:text-red-700 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      <div className="mt-1 text-xs text-[#8A8882] space-y-0.5">
                        {item.variant.size && <p>Size: {item.variant.size}</p>}
                        <p>Color: {item.variant.color}</p>
                        <p className="text-[10px] uppercase tracking-wider text-[#A3A19C]">
                          SKU: {item.variant.sku}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8D4CC] bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#1A1A1A] hover:bg-[#F9F8F4]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-semibold tabular-nums text-center min-w-[24px]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={item.quantity >= item.variant.stock}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className={`px-2 py-0.5 text-xs ${
                            item.quantity >= item.variant.stock
                              ? 'text-[#CCC] cursor-not-allowed'
                              : 'text-[#1A1A1A] hover:bg-[#F9F8F4]'
                          }`}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#1A1A1A] tabular-nums">
                          {formatPKR(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Subtotal, Voucher, COD Notice, Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-[#FFFFFF] border-t border-[#E8E5DE] space-y-3 sm:space-y-4 shadow-lg">
              {/* Voucher Code Form */}
              <div className="space-y-1">
                {couponCode ? (
                  <div className="flex items-center justify-between bg-[#F4F0E8] px-3 py-2 text-xs border border-[#E0DBCF]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5 text-[#1A1A1A]" />
                      <span className="font-semibold">{couponCode} (10% Off)</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-[#8A8882] hover:text-black underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (e.g. WELCOME10)"
                      className="flex-1 border border-[#D8D4CC] px-3 py-2 text-xs uppercase placeholder:normal-case placeholder:text-[#8A8882] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-medium uppercase tracking-wider hover:bg-black"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600">{couponError}</p>}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs pt-1">
                <div className="flex justify-between text-[#8A8882]">
                  <span>Subtotal</span>
                  <span className="tabular-nums text-[#1A1A1A]">{formatPKR(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Privilege Discount</span>
                    <span className="tabular-nums">-{formatPKR(discount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#8A8882]">
                  <span>Shipping across Pakistan</span>
                  <span className="tabular-nums text-[#1A1A1A]">
                    {shippingFee === 0 ? 'COMPLIMENTARY' : formatPKR(shippingFee)}
                  </span>
                </div>

                <div className="flex justify-between text-base font-semibold text-[#1A1A1A] pt-2 border-t border-[#E8E5DE]">
                  <span>Estimated Total</span>
                  <span className="tabular-nums">{formatPKR(total)}</span>
                </div>
              </div>

              {/* Cash On Delivery Assurance */}
              <div className="bg-[#F9F8F4] p-2.5 rounded border border-[#E8E5DE] flex items-center gap-2 text-[11px] text-[#555]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Cash on Delivery (COD) · Pay cash upon doorstep delivery</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    onNavigateToCart();
                  }}
                  className="w-full py-2.5 bg-white border border-[#D8D4CC] text-[#1A1A1A] text-xs font-medium uppercase tracking-[0.14em] hover:border-[#1A1A1A] transition-colors"
                >
                  View Full Cart Page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
