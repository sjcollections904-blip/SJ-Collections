import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, string>) => void;
  onSearchOpen: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, onSearchOpen }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { currentUser, isAuthenticated, openAuthModal } = useAuth();

  const handleNav = (page: string, params?: Record<string, string>) => {
    setMobileMenuOpen(false);
    onNavigate(page, params);
  };

  return (
    <>
      {/* Top Announcement Bar - Optimized for single-line mobile readability */}
      <div className="bg-[#1A1A1A] text-[#F9F8F4] text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase py-2 px-3 sm:px-4 font-medium border-b border-[#2C2C2C] select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="hidden md:inline-block text-[#8A8882]">ATELIER LAHORE · EST. 2026</span>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-1 sm:gap-3 text-center">
            <span>COMPLIMENTARY DELIVERY &gt; PKR 10K</span>
            <span className="hidden xs:inline opacity-40" aria-hidden="true">·</span>
            <span>CASH ON DELIVERY NATIONWIDE</span>
          </div>
          <a
            href="https://wa.me/923333368420?text=Hello%20SJ%20Collections%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20collection."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-[#E8E5DE] hover:text-white transition-colors"
          >
            <span>WHATSAPP VIP</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F9F8F4]/95 backdrop-blur-md border-b border-[#E8E5DE] transition-all">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-15 sm:h-20 lg:h-24">
            
            {/* Left Zone: Mobile Hamburger & Desktop Navigation */}
            <div className="flex items-center gap-1 sm:gap-4 flex-1 min-w-0">
              {/* Mobile Menu Button - 44px touch target */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE4] rounded-sm transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#1A1A1A] shrink-0"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] xl:text-[13px] tracking-[0.14em] uppercase font-medium">
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'all' })}
                  className={`cursor-pointer transition-colors hover:text-[#1A1A1A] py-1 ${
                    currentPage === 'catalog' ? 'text-[#1A1A1A] font-semibold' : 'text-[#8A8882]'
                  }`}
                >
                  Collections
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'mens-clothing' })}
                  className="cursor-pointer transition-colors text-[#8A8882] hover:text-[#1A1A1A] py-1"
                >
                  Men
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'womens-clothing' })}
                  className="cursor-pointer transition-colors text-[#8A8882] hover:text-[#1A1A1A] py-1"
                >
                  Women
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'mens-footwear' })}
                  className="cursor-pointer transition-colors text-[#8A8882] hover:text-[#1A1A1A] py-1"
                >
                  Footwear
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'wallets' })}
                  className="cursor-pointer transition-colors text-[#8A8882] hover:text-[#1A1A1A] py-1"
                >
                  Wallets
                </button>
                <button
                  type="button"
                  onClick={() => handleNav('catalog', { category: 'bags' })}
                  className="cursor-pointer transition-colors text-[#8A8882] hover:text-[#1A1A1A] py-1"
                >
                  Bags
                </button>
              </nav>
            </div>

            {/* Center Zone: Official SJ Collections Logo (Guaranteed Centered on All Screens) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto z-10">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className="inline-flex items-center justify-center p-0.5 sm:p-1 cursor-pointer focus:outline-none"
                aria-label="SJ Collections Home"
              >
                <img
                  src="/sj-logo.svg"
                  alt="SJ Collections"
                  className="h-7 sm:h-9 md:h-12 w-auto max-w-[125px] xs:max-w-[145px] sm:max-w-[190px] md:max-w-[240px] aspect-[320/90] object-contain hover:opacity-85 transition-opacity"
                />
              </button>
            </div>

            {/* Right Zone: Actions (Search, Wishlist, Account, Shopping Bag) */}
            <div className="flex items-center justify-end gap-0.5 sm:gap-2 flex-1 min-w-0">
              {/* Search Button */}
              <button
                type="button"
                onClick={onSearchOpen}
                className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[#1A1A1A] hover:text-[#8A8882] hover:bg-[#EFECE4] rounded-sm transition-colors focus:outline-none shrink-0"
                aria-label="Search collections"
                title="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => handleNav('wishlist')}
                className="relative w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center text-[#1A1A1A] hover:text-[#8A8882] hover:bg-[#EFECE4] rounded-sm transition-colors focus:outline-none shrink-0"
                aria-label={`Wishlist (${wishlistCount})`}
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 sm:top-2 sm:right-2 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1A1A1A] text-[#F9F8F4] text-[8px] sm:text-[9px] font-semibold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Account Button */}
              <button
                type="button"
                onClick={() => {
                  if (isAuthenticated) {
                    handleNav('account');
                  } else {
                    openAuthModal('login');
                  }
                }}
                className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center text-[#1A1A1A] hover:text-[#8A8882] hover:bg-[#EFECE4] rounded-sm transition-colors focus:outline-none hidden sm:inline-flex shrink-0"
                aria-label="Customer Account"
                title="Account"
              >
                <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
              </button>

              {/* Shopping Bag Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative h-9 sm:h-11 px-2 sm:px-3 flex items-center justify-center gap-1 text-[#1A1A1A] hover:text-[#8A8882] hover:bg-[#EFECE4] rounded-sm transition-colors focus:outline-none shrink-0"
                aria-label={`Shopping Bag with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.5]" />
                <span className="text-[11px] sm:text-xs font-semibold tabular-nums tracking-tight">
                  ({itemCount})
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer with Touch Targets >= 44px */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-[85vw] w-80 bg-[#F9F8F4] shadow-2xl flex flex-col justify-between z-50 border-r border-[#E8E5DE] overflow-y-auto">
            <div className="p-5 sm:p-6">
              {/* Drawer Brand Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E5DE]">
                <img
                  src="/sj-logo.svg"
                  alt="SJ Collections"
                  className="h-8 w-auto max-w-[140px] aspect-[320/90] object-contain"
                />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE4] rounded-sm"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Category Links with Touch Targets >= 44px */}
              <div className="py-5 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8A8882] font-semibold px-2 mb-2">
                  Atelier Catalog
                </p>
                
                {[
                  { id: 'all', label: 'All Collections' },
                  { id: 'mens-clothing', label: "Men's Clothing" },
                  { id: 'womens-clothing', label: "Women's Clothing" },
                  { id: 'mens-footwear', label: "Men's Footwear" },
                  { id: 'womens-footwear', label: "Women's Footwear" },
                  { id: 'wallets', label: 'Leather Wallets (New)' },
                  { id: 'bags', label: 'Bags & Luggage' },
                  { id: 'accessories', label: 'Fashion Accessories' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleNav('catalog', { category: cat.id })}
                    className="w-full min-h-[44px] flex items-center justify-between px-2 text-sm text-[#1A1A1A] font-medium hover:bg-[#EFECE4] rounded-sm transition-colors text-left"
                  >
                    <span>{cat.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8A8882]" />
                  </button>
                ))}
              </div>

              {/* Client Services Links */}
              <div className="pt-4 border-t border-[#E8E5DE] space-y-1 text-xs text-[#8A8882]">
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8A8882] font-semibold px-2 mb-1">
                  Client Care
                </p>
                <button
                  onClick={() => handleNav('about')}
                  className="w-full min-h-[38px] flex items-center px-2 hover:text-[#1A1A1A] transition-colors text-left"
                >
                  The SJ Heritage
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="w-full min-h-[38px] flex items-center px-2 hover:text-[#1A1A1A] transition-colors text-left"
                >
                  Contact Atelier
                </button>
                <button
                  onClick={() => handleNav('shipping-policy')}
                  className="w-full min-h-[38px] flex items-center px-2 hover:text-[#1A1A1A] transition-colors text-left"
                >
                  Shipping & COD Policy
                </button>
                <button
                  onClick={() => handleNav('returns-policy')}
                  className="w-full min-h-[38px] flex items-center px-2 hover:text-[#1A1A1A] transition-colors text-left"
                >
                  7-Day Size Exchange
                </button>
                <button
                  onClick={() => handleNav('faq')}
                  className="w-full min-h-[38px] flex items-center px-2 hover:text-[#1A1A1A] transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </div>
            </div>

            {/* Mobile Drawer Bottom User Section */}
            <div className="p-5 sm:p-6 bg-[#EFECE4] border-t border-[#E8E5DE] space-y-3">
              {isAuthenticated && currentUser ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#8A8882] uppercase tracking-wider">Patron</p>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{currentUser.name}</p>
                  </div>
                  <button
                    onClick={() => handleNav('account')}
                    className="min-h-[38px] px-3 py-1.5 bg-white border border-[#D8D4CC] text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]"
                  >
                    My Account
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full min-h-[44px] bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em] text-center flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Customer Sign In</span>
                </button>
              )}

              <a
                href="https://wa.me/923333368420"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[40px] border border-[#2C2C2C] text-[#1A1A1A] text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-2 bg-white"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: +92 333 3368420</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
