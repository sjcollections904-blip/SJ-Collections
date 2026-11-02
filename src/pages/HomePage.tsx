import React from 'react';
import { ArrowRight, Sparkles, Shield, Compass, Truck, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import {
  HERO_IMAGE,
  MENS_TAILORED_IMAGE,
  WOMENS_COUTURE_IMAGE,
  LEATHER_BAG_IMAGE,
  FOOTWEAR_IMAGE
} from '../data/products';

interface HomePageProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onNavigate
}) => {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Grand Editorial Hero Banner */}
      <section className="relative bg-[#1A1A1A] text-[#F9F8F4] overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center min-h-[580px] sm:min-h-[640px]">
          
          {/* Editorial Headline Column */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-center z-10 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#8A8882]">
                Autumn / Winter 2026 Collection
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#F9F8F4] leading-[1.1] text-balance">
                The Art of Sartorial Modernity
              </h1>
            </div>

            <p className="text-sm sm:text-base text-[#D0CCC3] leading-relaxed max-w-md font-light">
              Crafted in Pakistan for the world’s most discerning patrons. Tailored wool waistcoats, artisanal raw silk, hand-welted leather footwear, and structured leather goods.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onNavigate('catalog', { category: 'all' })}
                className="bg-[#F9F8F4] text-[#1A1A1A] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>Explore Creations</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://wa.me/923333368420?text=Hello%20SJ%20Collections%2C%20I%20would%20like%20to%20inquire%20about%20your%20luxury%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#8A8882] text-[#F9F8F4] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Atelier Concierge</span>
              </a>
            </div>

            {/* Micro Reassurances */}
            <div className="pt-4 border-t border-[#333333] flex items-center gap-6 text-[11px] text-[#8A8882] tracking-wider uppercase">
              <span>Cash on Delivery</span>
              <span aria-hidden="true">·</span>
              <span>Complimentary Delivery &gt; PKR 10k</span>
            </div>
          </div>

          {/* Hero Visual Asset Column */}
          <div className="lg:col-span-7 h-full relative min-h-[400px] lg:min-h-[640px]">
            <img
              src={HERO_IMAGE}
              alt="SJ Collections Campaign Editorial"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-transparent to-transparent hidden lg:block opacity-60" />
          </div>
        </div>
      </section>

      {/* 2. Curated Pillars / Category Gateways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A8882] font-semibold">
            The Atelier Collections
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] mt-2">
            Curated Categories of Refinement
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 w-full min-w-0">
          {/* Tile 1: Men's Clothing */}
          <div
            onClick={() => onNavigate('catalog', { category: 'mens-clothing' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src={MENS_TAILORED_IMAGE}
                alt="Men's Tailored Clothing"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Bespoke</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Men's Wear</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Tile 2: Women's Clothing */}
          <div
            onClick={() => onNavigate('catalog', { category: 'womens-clothing' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src={WOMENS_COUTURE_IMAGE}
                alt="Women's Couture Pret"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Couture</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Women's Pret</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Tile 3: Dedicated Leather Wallets */}
          <div
            onClick={() => onNavigate('catalog', { category: 'wallets' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
                alt="Dedicated Leather Wallets"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Fine Calfskin</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Wallets</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Tile 4: Premium Footwear */}
          <div
            onClick={() => onNavigate('catalog', { category: 'mens-footwear' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src={FOOTWEAR_IMAGE}
                alt="Handcrafted Footwear"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Goodyear Welt</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Footwear</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Tile 5: Bags & Luggage */}
          <div
            onClick={() => onNavigate('catalog', { category: 'bags' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src={LEATHER_BAG_IMAGE}
                alt="Bespoke Leather Bags"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Full-Grain</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Bags & Totes</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          {/* Tile 6: Accessories */}
          <div
            onClick={() => onNavigate('catalog', { category: 'accessories' })}
            className="group cursor-pointer relative bg-white border border-[#E8E5DE] overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[4/5] overflow-hidden bg-[#F0ECE1]">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                alt="Curated Accessories"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between border-t border-[#E8E5DE] bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-[#8A8882] block">Heirloom</span>
                <h3 className="font-serif-luxury text-sm sm:text-base text-[#1A1A1A]">Accessories</h3>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#1A1A1A] transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Masterpieces */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#E8E5DE] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A8882] font-semibold">
              Curated Showcase
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
              Featured Creations
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog', { category: 'all' })}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] hover:text-[#8A8882] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full min-w-0">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 4. Atelier Craftsmanship Editorial Spotlight */}
      <section className="bg-[#EFECE4] border-y border-[#E8E5DE] py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8A8882]">
              The Craft of SJ Collections
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A] leading-snug">
              Every Stitch Tells a Tale of Pakistan's Artisanal Mastery
            </h2>
            <p className="text-sm text-[#555] leading-relaxed">
              At SJ Collections, luxury is not born from haste. Our garments and leather goods are created by generational master cordwainers, zardozi needleworkers, and bespoke tailors across Lahore, Karachi, and Peshawar.
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs">
              <div className="border-t border-[#D8D4CC] pt-3">
                <span className="font-semibold text-[#1A1A1A] block">100% Full-Grain Leathers</span>
                <span className="text-[#8A8882] mt-0.5 block">Hand-patinated French & Italian calfskin</span>
              </div>
              <div className="border-t border-[#D8D4CC] pt-3">
                <span className="font-semibold text-[#1A1A1A] block">Pure Handloom Silks</span>
                <span className="text-[#8A8882] mt-0.5 block">Indigenous Katan raw silk & organza</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto bg-[#1A1A1A] text-[#F9F8F4] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-black transition-colors text-center"
              >
                Discover Our Heritage
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] bg-white p-2.5 sm:p-3 border border-[#E8E5DE] shadow-sm">
            <img
              src={LEATHER_BAG_IMAGE}
              alt="Artisanal Leatherwork"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#E8E5DE] gap-4">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A8882] font-semibold">
              Fresh from the Atelier
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('catalog', { category: 'all' })}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-[#1A1A1A] hover:text-[#8A8882] flex items-center gap-1.5 transition-colors"
          >
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 w-full min-w-0">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* 6. Cash On Delivery Nationwide Trust Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1A1A1A] text-[#F9F8F4] p-8 sm:p-12 border border-[#2A2A2A] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8A8882]">
              Secure Luxury Shopping in Pakistan
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#F9F8F4]">
              Cash on Delivery (COD) Nationwide
            </h3>
            <p className="text-xs sm:text-sm text-[#D0CCC3] leading-relaxed">
              Experience seamless convenience with 100% Cash on Delivery across Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, Quetta, and every district of Pakistan. Pay securely when your luxury parcel reaches your door.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('catalog', { category: 'all' })}
              className="bg-[#F9F8F4] text-[#1A1A1A] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-center hover:bg-white transition-colors"
            >
              Shop Ready-to-Ship Pieces
            </button>
            <a
              href="https://wa.me/923333368420"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#444] text-[#F9F8F4] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Support</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
