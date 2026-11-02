import React, { useState, useEffect } from 'react';
import { ArrowLeft, AlertCircle, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useInventory } from '../context/InventoryContext';
import { PAKISTAN_CITIES, PAKISTAN_PROVINCES } from '../data/products';

interface CheckoutPageProps {
  onOrderSuccess: (orderId: string) => void;
  onNavigateToCart: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderSuccess,
  onNavigateToCart
}) => {
  const { items, subtotal, shippingFee, discount, total, clearCart } = useCart();
  const { currentUser, createOrder } = useAuth();
  const { deductStock } = useInventory();

  // B. Billing Address Form States
  const [billingName, setBillingName] = useState(currentUser?.name || '');
  const [billingPhone, setBillingPhone] = useState(currentUser?.phone || '');
  const [billingEmail, setBillingEmail] = useState(currentUser?.email || '');
  const [billingAddress, setBillingAddress] = useState(currentUser?.addresses[0]?.address || '');
  const [billingCountry, setBillingCountry] = useState('Pakistan');
  const [billingCity, setBillingCity] = useState(currentUser?.addresses[0]?.city || 'Karachi');
  const [billingProvince, setBillingProvince] = useState(currentUser?.addresses[0]?.province || 'Sindh');
  const [billingArea, setBillingArea] = useState(currentUser?.addresses[0]?.area || '');
  const [billingPostalCode, setBillingPostalCode] = useState('');

  // C. Billing & Shipping Address Checkbox
  const [sameAsShipping, setSameAsShipping] = useState(true);

  // Separate Shipping Address States (if sameAsShipping === false)
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingCountry, setShippingCountry] = useState('Pakistan');
  const [shippingProvince, setShippingProvince] = useState('Sindh');
  const [shippingCity, setShippingCity] = useState('Karachi');
  const [shippingArea, setShippingArea] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync when user logs in or switches
  useEffect(() => {
    if (currentUser) {
      if (!billingName) setBillingName(currentUser.name);
      if (!billingEmail) setBillingEmail(currentUser.email);
      if (!billingPhone) setBillingPhone(currentUser.phone);
      if (currentUser.addresses.length > 0) {
        const defaultAddr = currentUser.addresses.find((a) => a.isDefault) || currentUser.addresses[0];
        setBillingProvince(defaultAddr.province);
        setBillingCity(defaultAddr.city);
        setBillingArea(defaultAddr.area);
        setBillingAddress(defaultAddr.address);
      }
    }
  }, [currentUser]);

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  // Pakistan phone validation: Accepts 03XXXXXXXXX and +923XXXXXXXXX
  const validatePhone = (p: string) => {
    const cleaned = p.replace(/[\s\-\(\)]/g, '');
    return /^(03\d{9}|\+923\d{9})$/.test(cleaned);
  };

  // Final Order Submission via WhatsApp
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate order creation
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
      return;
    }

    // 1. Validation of Billing fields
    if (!billingName.trim()) {
      setErrorMessage('Please enter your full name in the Billing Address section.');
      return;
    }

    if (!billingPhone.trim() || !validatePhone(billingPhone)) {
      setErrorMessage('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 333 3368420).');
      return;
    }

    if (!billingEmail.trim() || !billingEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!billingAddress.trim()) {
      setErrorMessage('Please enter your complete address.');
      return;
    }

    if (!billingCity.trim()) {
      setErrorMessage('Please select or specify your city.');
      return;
    }

    // 2. Separate shipping validation if different
    if (!sameAsShipping) {
      if (!shippingName.trim()) {
        setErrorMessage('Please enter the recipient name in the Shipping Address section.');
        return;
      }
      if (!shippingPhone.trim() || !validatePhone(shippingPhone)) {
        setErrorMessage('Please enter a valid recipient telephone number for delivery.');
        return;
      }
      if (!shippingAddress.trim()) {
        setErrorMessage('Please enter the complete shipping address.');
        return;
      }
      if (!shippingCity.trim()) {
        setErrorMessage('Please select the delivery city.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // 3. Inventory check & deduction on client state
      const stockItems = items.map((i) => ({
        productId: i.product.id,
        variantId: i.variant.id,
        sku: i.variant.sku,
        size: i.variant.size,
        color: i.variant.color,
        quantity: i.quantity
      }));

      const stockDeducted = deductStock(stockItems);
      if (!stockDeducted) {
        setErrorMessage('One or more selected items or sizes are no longer available in the requested quantity.');
        setIsSubmitting(false);
        return;
      }

      // 4. Prepare Order Items
      const orderItems = items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.images[0],
        sku: i.variant.sku,
        size: i.variant.size,
        color: i.variant.color,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        subtotal: i.unitPrice * i.quantity
      }));

      // Effective Delivery Details
      const effectiveName = sameAsShipping ? billingName.trim() : shippingName.trim();
      const effectivePhone = sameAsShipping ? billingPhone.trim() : shippingPhone.trim();
      const effectiveCity = sameAsShipping ? billingCity.trim() : shippingCity.trim();
      const effectiveProvince = sameAsShipping ? billingProvince.trim() : shippingProvince.trim();
      const effectiveArea = sameAsShipping ? billingArea.trim() : shippingArea.trim();
      const effectiveAddress = sameAsShipping ? billingAddress.trim() : shippingAddress.trim();

      // 5. Create persistent Order in state with status 'pending_whatsapp_confirmation'
      const newOrder = await createOrder({
        customerName: effectiveName,
        customerEmail: billingEmail.trim() || undefined,
        customerPhone: effectivePhone,
        shippingAddress: {
          province: effectiveProvince,
          city: effectiveCity,
          area: effectiveArea || effectiveCity,
          streetAddress: effectiveAddress,
          deliveryInstructions: deliveryInstructions.trim() || undefined
        },
        items: orderItems,
        subtotal,
        shippingFee,
        discount,
        total,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'pending_whatsapp_confirmation'
      });

      // 8. Generate exact requested WhatsApp message
      const itemsListFormatted = orderItems
        .map((i) => {
          const variantStr = i.size ? `${i.size} / ${i.color}` : i.color;
          return `${i.productName} — [${variantStr}] — Qty: ${i.quantity} — PKR ${i.unitPrice * i.quantity}`;
        })
        .join('\n');

      const waMessage = `Hello SJ Collections! I would like to confirm my Cash on Delivery order.

Order Number: ${newOrder.id}

Items:
${itemsListFormatted}

Subtotal: PKR ${subtotal}
Shipping: PKR ${shippingFee}
Total Payable: PKR ${total}

Customer Name: ${effectiveName}
Phone: ${effectivePhone}
Delivery City: ${effectiveCity}

Please confirm my order. Thank you!`;

      const waUrl = `https://wa.me/923333368420?text=${encodeURIComponent(waMessage)}`;

      // 9. Open official WhatsApp conversation
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (openErr) {
        console.warn('Could not open WhatsApp window automatically:', openErr);
      }

      // 10. Clear bag and navigate to order-confirmation
      clearCart();
      onOrderSuccess(newOrder.id);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to process order. Please verify your details or contact our WhatsApp concierge.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Back Link */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onNavigateToCart}
          className="text-xs font-semibold uppercase tracking-wider text-[#8A8882] hover:text-[#1A1A1A] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Shopping Bag</span>
        </button>
      </div>

      <div className="bg-white border border-[#E8E5DE] p-6 sm:p-10 shadow-xs">
        {/* A. Customer Access: GUEST Checkout */}
        <div className="mb-8">
          <div className="border border-[#D8D4CC] inline-block rounded-xs overflow-hidden select-none">
            <div className="py-2.5 sm:py-3 px-8 bg-[#EFECE4] text-[#1A1A1A] font-bold text-center uppercase tracking-[0.18em] text-[11px] sm:text-xs">
              GUEST
            </div>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handlePlaceOrder} className="space-y-8">
          
          {/* B. Billing Address Section — Exact Arrangement from Reference */}
          <div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#9C6F3B] font-medium tracking-wide">
              Billing Address
            </h2>
            <div className="h-[1px] bg-[#E8E5DE] mt-2 mb-6" />

            <div className="space-y-4 sm:space-y-5">
              {/* Row 1: NAME * & TELEPHONE * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    NAME <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    TELEPHONE <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={billingPhone}
                    onChange={(e) => setBillingPhone(e.target.value)}
                    placeholder="03xxxxxxxxx"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>
              </div>

              {/* Row 2: EMAIL * */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  EMAIL <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={billingEmail}
                  onChange={(e) => setBillingEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                />
              </div>

              {/* Row 3: ADDRESS * (Multiline textarea) */}
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  ADDRESS <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  placeholder="Address"
                  className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs resize-y"
                />
              </div>

              {/* Row 4: COUNTRY * & CITY * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    COUNTRY <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    CITY <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={billingCity}
                    onChange={(e) => {
                      setBillingCity(e.target.value);
                      const match = PAKISTAN_CITIES.find((c) => c.name === e.target.value);
                      if (match) setBillingProvince(match.province);
                    }}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Pakistan Region & Locality Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-1">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Province / Region <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={billingProvince}
                    onChange={(e) => setBillingProvince(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    {PAKISTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Area / Locality
                  </label>
                  <input
                    type="text"
                    value={billingArea}
                    onChange={(e) => setBillingArea(e.target.value)}
                    placeholder="e.g. DHA Phase 5, Clifton"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={billingPostalCode}
                    onChange={(e) => setBillingPostalCode(e.target.value)}
                    placeholder="e.g. 75500"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>
              </div>

              {/* C. Billing & Shipping Address Checkbox */}
              <div className="pt-3">
                <label className="flex items-center gap-3 text-xs text-[#1A1A1A] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={sameAsShipping}
                    onChange={(e) => setSameAsShipping(e.target.checked)}
                    className="w-4 h-4 accent-[#1A1A1A] cursor-pointer rounded-xs"
                  />
                  <span className="font-medium text-[#1A1A1A]">
                    Billing &amp; Shipping Addresses Are Same
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Conditional Separate Shipping Address Section */}
          {!sameAsShipping && (
            <div className="pt-6 border-t border-[#E8E5DE] space-y-5">
              <div>
                <h3 className="font-serif-luxury text-2xl text-[#9C6F3B] font-medium tracking-wide">
                  Shipping Address
                </h3>
                <div className="h-[1px] bg-[#E8E5DE] mt-2 mb-6" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    RECIPIENT NAME <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required={!sameAsShipping}
                    value={shippingName}
                    onChange={(e) => setShippingName(e.target.value)}
                    placeholder="Recipient Name"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    TELEPHONE <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required={!sameAsShipping}
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="03xxxxxxxxx"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                  DELIVERY ADDRESS <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required={!sameAsShipping}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Complete Delivery Address"
                  className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    COUNTRY <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={shippingCountry}
                    onChange={(e) => setShippingCountry(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    CITY <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={shippingCity}
                    onChange={(e) => {
                      setShippingCity(e.target.value);
                      const match = PAKISTAN_CITIES.find((c) => c.name === e.target.value);
                      if (match) setShippingProvince(match.province);
                    }}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                    <option value="Other">Other City</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Province / Region <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={shippingProvince}
                    onChange={(e) => setShippingProvince(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  >
                    {PAKISTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
                    Area / Sector
                  </label>
                  <input
                    type="text"
                    value={shippingArea}
                    onChange={(e) => setShippingArea(e.target.value)}
                    placeholder="e.g. F-8/2, Gulberg, Model Town"
                    className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Optional Delivery Instructions */}
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1.5">
              Delivery Notes / Landmarks (Optional)
            </label>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Ring bell twice; near landmark mosque; deliver after 2 PM"
              className="w-full px-3.5 py-3 bg-[#F4F4F4] sm:bg-[#F9F8F4] border border-[#E8E5DE] text-xs text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none focus:border-[#1A1A1A] rounded-xs"
            />
          </div>

          {/* D. Order Summary ("Your Order") */}
          <div className="pt-6 border-t border-[#E8E5DE] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E8E5DE]">
              <h2 className="font-serif-luxury text-2xl text-[#1A1A1A] font-medium">
                Your Order
              </h2>
              <span className="text-xs text-[#8A8882] font-semibold uppercase tracking-wider">
                {items.length} {items.length === 1 ? 'Creation' : 'Creations'}
              </span>
            </div>

            {/* Product items table / list */}
            <div className="divide-y divide-[#E8E5DE] border border-[#E8E5DE] bg-[#FDFCFA]">
              {items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-16 object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE]"
                    />
                    <div className="min-w-0">
                      <h4 className="font-serif-luxury text-sm font-medium text-[#1A1A1A] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-[#8A8882] text-[11px] mt-0.5">
                        {item.variant.size ? `Size: ${item.variant.size} · ` : ''}Shade: {item.variant.color}
                      </p>
                      <p className="text-[#555] text-[11px] mt-0.5">
                        Qty: {item.quantity} × {formatPKR(item.unitPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-semibold tabular-nums text-sm text-[#1A1A1A] shrink-0">
                    {formatPKR(item.unitPrice * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Cost breakdown */}
            <div className="p-5 bg-[#F9F8F4] border border-[#E8E5DE] space-y-2 text-xs">
              <div className="flex justify-between text-[#8A8882]">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium text-[#1A1A1A]">{formatPKR(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>Privilege Discount</span>
                  <span className="tabular-nums">-{formatPKR(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#8A8882]">
                <span>Shipping Fee</span>
                <span className="tabular-nums font-medium text-[#1A1A1A]">
                  {shippingFee === 0 ? 'Complimentary' : formatPKR(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-semibold text-[#1A1A1A] pt-3 border-t border-[#E8E5DE]">
                <span>Total Payable (PKR)</span>
                <span className="tabular-nums text-lg font-bold">{formatPKR(total)}</span>
              </div>
            </div>
          </div>

          {/* E. Payment Method — COD ONLY */}
          <div className="pt-6 border-t border-[#E8E5DE] space-y-3">
            <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">Payment Method</h3>
            
            <div className="p-4 border-2 border-[#1A1A1A] bg-[#F9F8F4] flex items-start gap-3">
              <input
                type="radio"
                checked
                readOnly
                className="mt-1 w-4 h-4 accent-[#1A1A1A] cursor-default"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                    Cash on Delivery (COD)
                  </span>
                  <span className="text-[10px] bg-[#1A1A1A] text-white font-medium px-2 py-0.5">
                    Standard
                  </span>
                </div>
                <p className="text-xs text-[#555]">
                  Pay in cash when your order is delivered.
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* F. Final WhatsApp Order Submission Button */}
          <div className="pt-4 space-y-3 text-center">
            <button
              type="submit"
              disabled={isSubmitting || items.length === 0}
              className={`w-full py-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md transition-all ${
                isSubmitting
                  ? 'bg-[#8A8882] text-white cursor-wait'
                  : 'bg-[#1A1A1A] text-[#F9F8F4] hover:bg-black hover:shadow-lg cursor-pointer'
              }`}
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>{isSubmitting ? 'GENERATING WHATSAPP ORDER...' : 'PLACE ORDER VIA WHATSAPP'}</span>
            </button>

            <p className="text-[11px] text-[#8A8882] leading-relaxed max-w-lg mx-auto">
              Clicking will register your order in our system and open the official SJ Collections WhatsApp concierge (+92 333 3368420). Please press <strong>Send</strong> in WhatsApp to submit your order details.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
