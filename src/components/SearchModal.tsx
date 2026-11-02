import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onSelectCategory: (category: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.materials.some((m) => m.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const formatPKR = (amt: number) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amt).replace('PKR', 'PKR ');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Search Container */}
      <div className="relative min-h-screen flex items-start justify-center p-2.5 sm:p-6 lg:p-8 pt-10 sm:pt-24 pointer-events-none">
        <div className="w-full max-w-3xl bg-[#F9F8F4] shadow-2xl border border-[#E8E5DE] pointer-events-auto overflow-hidden">
          {/* Search Input Bar */}
          <div className="p-3 sm:p-6 border-b border-[#E8E5DE] flex items-center gap-2 sm:gap-3 bg-white">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#1A1A1A] stroke-[1.5] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search garments, shoes, wallets, bags..."
              className="w-full text-sm sm:text-lg bg-transparent text-[#1A1A1A] placeholder-[#8A8882] focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 text-[#8A8882] hover:text-[#1A1A1A]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-1 sm:ml-2 text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#8A8882] hover:text-[#1A1A1A] px-1.5 sm:px-2 py-1"
            >
              Close
            </button>
          </div>

          {/* Quick Categories Bar */}
          <div className="px-3 sm:px-6 py-2.5 sm:py-3 bg-[#F0ECE1] border-b border-[#E8E5DE] flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
            <span className="text-[#8A8882] uppercase tracking-wider text-[11px] font-semibold whitespace-nowrap">
              Explore:
            </span>
            <button
              onClick={() => {
                onClose();
                onSelectCategory('mens-clothing');
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-[#1A1A1A] rounded-xs whitespace-nowrap border border-[#D8D4CC]"
            >
              Men's Clothing
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectCategory('womens-clothing');
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-[#1A1A1A] rounded-xs whitespace-nowrap border border-[#D8D4CC]"
            >
              Women's Pret & Couture
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectCategory('bags');
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-[#1A1A1A] rounded-xs whitespace-nowrap border border-[#D8D4CC]"
            >
              Leather Bags
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectCategory('mens-footwear');
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#1A1A1A] hover:text-white transition-colors text-[#1A1A1A] rounded-xs whitespace-nowrap border border-[#D8D4CC]"
            >
              Handcrafted Footwear
            </button>
          </div>

          {/* Results Area */}
          <div className="max-h-[60vh] overflow-y-auto p-6">
            {query.trim() === '' ? (
              <div className="py-8 text-center text-[#8A8882] space-y-2">
                <p className="font-serif-luxury text-lg text-[#1A1A1A]">Discover luxury tailored pieces</p>
                <p className="text-xs">Type a keyword like "waistcoat", "silk", "oxford", "handbag", or "cashmere".</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-8 text-center text-[#8A8882] space-y-2">
                <p className="font-serif-luxury text-lg text-[#1A1A1A]">No pieces found matching "{query}"</p>
                <p className="text-xs">Try adjusting your search or explore all collections directly.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8A8882]">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'} Found
                </p>
                <div className="divide-y divide-[#E8E5DE]">
                  {filteredProducts.map((p) => {
                    const price = p.salePrice ?? p.price;
                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p.id);
                        }}
                        className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-white p-2 rounded transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-14 h-16 object-cover bg-[#F0ECE1] shrink-0 border border-[#E8E5DE]"
                          />
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-[#8A8882]">
                              {p.categoryLabel}
                            </span>
                            <h4 className="font-serif-luxury text-base text-[#1A1A1A] group-hover:underline">
                              {p.name}
                            </h4>
                            <span className="text-xs font-semibold tabular-nums text-[#1A1A1A]">
                              {formatPKR(price)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-xs uppercase tracking-wider text-[#8A8882] group-hover:text-[#1A1A1A]">
                          <span className="hidden sm:inline">View Piece</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
