import React, { useState, useEffect } from 'react';
import {
  Package,
  MapPin,
  Heart,
  LogOut,
  Plus,
  Trash2,
  MessageCircle,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useInventory } from '../context/InventoryContext';
import { useCart } from '../context/CartContext';
import { PAKISTAN_PROVINCES, PAKISTAN_CITIES } from '../data/products';
import { supabase } from '../supabaseClient';

interface AccountPageProps {
  onNavigateToCatalog: () => void;
  onSelectProduct: (productId: string) => void;
  onOpenOrderReceipt: (orderId: string) => void;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  onNavigateToCatalog,
  onSelectProduct,
  onOpenOrderReceipt
}) => {
  const { currentUser, orders, logout, saveAddress, deleteAddress, cancelOrder } = useAuth();
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const { products, restoreStock } = useInventory();
  const { addToCart } = useCart();

  const [isVerifyingAuth, setIsVerifyingAuth] = useState(true);

  // Protect private page with supabase.auth.getSession() — if no session, redirect to /login
  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          window.location.href = '/login';
          return;
        }
      } catch (err) {
        window.location.href = '/login';
        return;
      }

      if (isMounted) {
        setIsVerifyingAuth(false);
      }
    };

    checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [cancelFeedback, setCancelFeedback] = useState<string | null>(null);

  // New Address Form State
  const [addrLabel, setAddrLabel] = useState('Home');
  const [addrFullName, setAddrFullName] = useState(currentUser?.name || '');
  const [addrPhone, setAddrPhone] = useState(currentUser?.phone || '');
  const [addrProvince, setAddrProvince] = useState('Punjab');
  const [addrCity, setAddrCity] = useState('Lahore');
  const [addrArea, setAddrArea] = useState('');
  const [addrStreet, setAddrStreet] = useState('');
  const [addrIsDefault, setAddrIsDefault] = useState(false);

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  const handleCancelOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order || order.status !== 'Confirmed') return;

    const cancelled = cancelOrder(orderId);
    if (cancelled) {
      setCancelFeedback(`Order ${order.id} has been cancelled. Item stock has been restored to inventory.`);
      setTimeout(() => setCancelFeedback(null), 6000);
    }
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addrFullName.trim() || !addrPhone.trim() || !addrStreet.trim() || !addrArea.trim()) {
      return;
    }
    saveAddress({
      label: addrLabel,
      fullName: addrFullName.trim(),
      phone: addrPhone.trim(),
      province: addrProvince,
      city: addrCity.trim(),
      area: addrArea.trim(),
      address: addrStreet.trim(),
      isDefault: addrIsDefault
    });
    setShowAddAddressModal(false);
    setAddrArea('');
    setAddrStreet('');
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    logout();
    window.location.href = '/login';
  };

  if (isVerifyingAuth) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-xs uppercase tracking-widest text-[#8A8882] animate-pulse">
          Verifying patron access...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Account Header */}
      <div className="pb-8 border-b border-[#E8E5DE] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A8882]">
            Patron Account
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] mt-1">
            {currentUser?.name || 'My SJ Account'}
          </h1>
          <p className="text-xs text-[#8A8882] mt-1">
            {currentUser?.email} · {currentUser?.phone} · Pakistan
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 border border-[#D8D4CC] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E5DE] my-6 sm:my-8 gap-4 sm:gap-8 text-xs font-semibold uppercase tracking-[0.16em] overflow-x-auto pb-1 scrollbar-none whitespace-nowrap">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'orders'
              ? 'border-[#1A1A1A] text-[#1A1A1A]'
              : 'border-transparent text-[#8A8882] hover:text-[#1A1A1A]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'addresses'
              ? 'border-[#1A1A1A] text-[#1A1A1A]'
              : 'border-transparent text-[#8A8882] hover:text-[#1A1A1A]'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Addresses ({currentUser?.addresses?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors shrink-0 ${
            activeTab === 'wishlist'
              ? 'border-[#1A1A1A] text-[#1A1A1A]'
              : 'border-transparent text-[#8A8882] hover:text-[#1A1A1A]'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Wishlist ({wishlistedProducts.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {cancelFeedback && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{cancelFeedback}</span>
              </div>
              <button
                type="button"
                onClick={() => setCancelFeedback(null)}
                className="text-emerald-700 hover:text-emerald-900 underline text-[11px] ml-4 shrink-0"
              >
                Dismiss
              </button>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white border border-[#E8E5DE] p-8">
              <Package className="w-10 h-10 text-[#8A8882] mx-auto stroke-[1]" />
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">No Orders Placed Yet</h3>
              <p className="text-xs text-[#8A8882] max-w-sm mx-auto">
                Explore our collections to place your first luxury order with Cash on Delivery nationwide.
              </p>
              <button
                onClick={onNavigateToCatalog}
                className="mt-3 px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider"
              >
                Explore Collections
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                const waOrderUrl = `https://wa.me/923333368420?text=${encodeURIComponent(
                  `Hello SJ Collections, I would like to inquire about my order ${order.id}. Total: PKR ${order.total}. Status: ${order.status}.`
                )}`;

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-[#E8E5DE] p-6 space-y-5 shadow-xs"
                  >
                    {/* Order Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8E5DE] gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-[#1A1A1A] tabular-nums">
                            Order {order.id}
                          </span>
                          <span
                            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border ${
                              order.status === 'Confirmed'
                                ? 'bg-amber-50 text-amber-800 border-amber-200'
                                : order.status === 'Dispatched'
                                ? 'bg-blue-50 text-blue-800 border-blue-200'
                                : order.status === 'Delivered'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : 'bg-red-50 text-red-800 border-red-200'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-[#8A8882] mt-0.5">
                          Placed on{' '}
                          {new Date(order.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}{' '}
                          · Payment: {order.paymentMethod}
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-base font-semibold text-[#1A1A1A] tabular-nums">
                          {formatPKR(order.total)}
                        </span>
                        <p className="text-[11px] text-[#8A8882]">
                          {order.items.length} {order.items.length === 1 ? 'Creation' : 'Creations'}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="divide-y divide-[#E8E5DE]">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between text-xs gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-12 h-14 object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE]"
                            />
                            <div>
                              <h4 className="font-serif-luxury text-sm font-medium text-[#1A1A1A]">
                                {item.productName}
                              </h4>
                              <p className="text-[#8A8882] text-[11px]">
                                {item.size ? `Size: ${item.size} · ` : ''}Shade: {item.color} · Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold tabular-nums text-[#1A1A1A]">
                            {formatPKR(item.subtotal)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery & Tracking Information */}
                    <div className="p-3 bg-[#F9F8F4] border border-[#E8E5DE] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-[#555]">
                        <Truck className="w-4 h-4 text-[#1A1A1A]" />
                        <span>
                          Delivering to: {order.shippingAddress.area}, {order.shippingAddress.city} (
                          {order.shippingAddress.province})
                        </span>
                      </div>

                      {order.trackingNumber && (
                        <span className="text-[#8A8882]">
                          Tracking:{' '}
                          <span className="font-mono text-[#1A1A1A] font-semibold">
                            {order.trackingNumber}
                          </span>
                        </span>
                      )}
                    </div>

                    {/* Order Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onOpenOrderReceipt(order.id)}
                          className="text-[#1A1A1A] font-semibold underline underline-offset-4 hover:opacity-75"
                        >
                          View Official Receipt
                        </button>
                        <a
                          href={waOrderUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>WhatsApp Atelier</span>
                        </a>
                      </div>

                      {order.status === 'Confirmed' && (
                        <button
                          type="button"
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-700 hover:text-red-900 underline underline-offset-4 cursor-pointer font-medium"
                        >
                          Cancel Order & Restore Stock
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED ADDRESSES */}
      {activeTab === 'addresses' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#8A8882]">
              Manage delivery addresses for seamless Cash on Delivery ordering across Pakistan.
            </p>
            <button
              onClick={() => setShowAddAddressModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider hover:bg-black"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Address</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentUser?.addresses.map((addr) => (
              <div
                key={addr.id}
                className="bg-white border border-[#E8E5DE] p-5 space-y-3 relative shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] bg-[#EFECE4] px-2.5 py-0.5">
                    {addr.label} {addr.isDefault ? '· Default' : ''}
                  </span>
                  <button
                    onClick={() => deleteAddress(addr.id)}
                    className="text-[#8A8882] hover:text-red-700 p-1"
                    title="Delete Address"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-semibold text-sm text-[#1A1A1A]">{addr.fullName}</p>
                  <p className="text-[#555]">{addr.address}</p>
                  <p className="text-[#555]">
                    {addr.area}, {addr.city}
                  </p>
                  <p className="text-[#555] font-medium">{addr.province}, Pakistan</p>
                  <p className="text-[#1A1A1A] pt-1">Contact: {addr.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center space-y-3 bg-white border border-[#E8E5DE] p-8">
              <Heart className="w-10 h-10 text-[#8A8882] mx-auto stroke-[1]" />
              <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#8A8882] max-w-sm mx-auto">
                Save pieces you love while browsing to review them anytime.
              </p>
              <button
                onClick={onNavigateToCatalog}
                className="mt-3 px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider"
              >
                Discover Creations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full min-w-0">
              {wishlistedProducts.map((p) => {
                const price = p.salePrice ?? p.price;
                return (
                  <div key={p.id} className="bg-white border border-[#E8E5DE] flex flex-col justify-between w-full min-w-0">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#F0ECE1]">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover cursor-pointer"
                        onClick={() => onSelectProduct(p.id)}
                      />
                      <button
                        onClick={() => removeFromWishlist(p.id)}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 text-red-700 rounded-full hover:bg-white"
                        title="Remove from Wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>

                    <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-3 min-w-0">
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8A8882] block truncate">
                          {p.categoryLabel}
                        </span>
                        <h4
                          onClick={() => onSelectProduct(p.id)}
                          className="font-serif-luxury text-xs sm:text-base text-[#1A1A1A] hover:underline cursor-pointer line-clamp-1 mt-0.5"
                        >
                          {p.name}
                        </h4>
                        <span className="text-xs sm:text-sm font-semibold tabular-nums text-[#1A1A1A] block mt-1">
                          {formatPKR(price)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          addToCart(p, p.variants[0]);
                        }}
                        className="w-full py-2 bg-[#1A1A1A] text-[#F9F8F4] text-[10px] sm:text-xs font-medium uppercase tracking-wider hover:bg-black transition-colors"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddAddressModal(false)}
          />
          <div className="relative bg-[#F9F8F4] w-full max-w-lg p-6 sm:p-8 border border-[#E8E5DE] shadow-2xl z-10">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A] pb-3 border-b border-[#E8E5DE]">
              Add Delivery Address
            </h3>

            <form onSubmit={handleSaveAddress} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Address Label
                  </label>
                  <input
                    type="text"
                    required
                    value={addrLabel}
                    onChange={(e) => setAddrLabel(e.target.value)}
                    placeholder="e.g. Home, Office"
                    className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={addrPhone}
                    onChange={(e) => setAddrPhone(e.target.value)}
                    placeholder="0300 1234567"
                    className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={addrFullName}
                  onChange={(e) => setAddrFullName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    Province
                  </label>
                  <select
                    value={addrProvince}
                    onChange={(e) => setAddrProvince(e.target.value)}
                    className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                  >
                    {PAKISTAN_PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={addrCity}
                    onChange={(e) => setAddrCity(e.target.value)}
                    placeholder="e.g. Lahore"
                    className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Area / Sector *
                </label>
                <input
                  type="text"
                  required
                  value={addrArea}
                  onChange={(e) => setAddrArea(e.target.value)}
                  placeholder="e.g. DHA Phase 5, Block G"
                  className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
                  Complete Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={addrStreet}
                  onChange={(e) => setAddrStreet(e.target.value)}
                  placeholder="House / Apartment / Street"
                  className="w-full p-2.5 bg-white border border-[#D8D4CC] text-xs"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="defaultCheck"
                  checked={addrIsDefault}
                  onChange={(e) => setAddrIsDefault(e.target.checked)}
                  className="accent-[#1A1A1A]"
                />
                <label htmlFor="defaultCheck" className="text-xs text-[#1A1A1A] cursor-pointer">
                  Set as default shipping address
                </label>
              </div>

              <div className="pt-4 border-t border-[#E8E5DE] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddAddressModal(false)}
                  className="px-4 py-2 border border-[#D8D4CC] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider hover:bg-black"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
