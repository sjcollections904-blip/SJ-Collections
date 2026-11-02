import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, ChevronDown, Check, RefreshCw } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/products';

interface CatalogPageProps {
  products: Product[];
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
  onNavigate: (page: string, params?: Record<string, string>) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  products,
  initialCategory = 'all',
  onSelectProduct,
  onQuickView,
  onNavigate
}) => {
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    gender: 'all',
    sizes: [],
    colors: [],
    minPrice: 0,
    maxPrice: 65000,
    sortBy: 'featured',
    inStockOnly: false,
    searchQuery: ''
  });

  // Extract all available sizes and colors from products
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.sizes.forEach((s) => set.add(s)));
    return Array.from(set);
  }, [products]);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    products.forEach((p) =>
      p.colors.forEach((c) => {
        if (!map.has(c.name)) map.set(c.name, c.hex);
      })
    );
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Apply filters
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category check
      if (filters.category !== 'all' && p.category !== filters.category) {
        return false;
      }

      // Gender check
      if (filters.gender !== 'all' && p.gender !== filters.gender && p.gender !== 'unisex') {
        return false;
      }

      // In stock only
      if (filters.inStockOnly) {
        const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
        if (totalStock <= 0) return false;
      }

      // Price range
      const effectivePrice = p.salePrice ?? p.price;
      if (effectivePrice < filters.minPrice || effectivePrice > filters.maxPrice) {
        return false;
      }

      // Size check
      if (filters.sizes.length > 0) {
        const hasMatchingSize = p.sizes.some((s) => filters.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Color check
      if (filters.colors.length > 0) {
        const hasMatchingColor = p.colors.some((c) => filters.colors.includes(c.name));
        if (!hasMatchingColor) return false;
      }

      return true;
    }).sort((a, b) => {
      const priceA = a.salePrice ?? a.price;
      const priceB = b.salePrice ?? b.price;

      if (filters.sortBy === 'price-low') return priceA - priceB;
      if (filters.sortBy === 'price-high') return priceB - priceA;
      if (filters.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (filters.sortBy === 'popular') return b.rating - a.rating;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [products, filters]);

  const activeCategoryLabel =
    CATEGORIES.find((c) => c.id === filters.category)?.label || 'All Collections';

  const resetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      sizes: [],
      colors: [],
      minPrice: 0,
      maxPrice: 65000,
      sortBy: 'featured',
      inStockOnly: false,
      searchQuery: ''
    });
  };

  const toggleSizeFilter = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColorFilter = (colorName: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.includes(colorName)
        ? prev.colors.filter((c) => c !== colorName)
        : [...prev.colors, colorName]
    }));
  };

  const activeFilterCount =
    (filters.category !== 'all' ? 1 : 0) +
    (filters.gender !== 'all' ? 1 : 0) +
    filters.sizes.length +
    filters.colors.length +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 65000 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Editorial Header & Breadcrumb */}
      <div className="pb-8 border-b border-[#E8E5DE]">
        <div className="flex items-center gap-2 text-xs text-[#8A8882] tracking-wider uppercase mb-3">
          <button onClick={() => onNavigate('home')} className="hover:text-[#1A1A1A]">
            Home
          </button>
          <span>/</span>
          <span className="text-[#1A1A1A] font-semibold">{activeCategoryLabel}</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif-luxury text-3xl sm:text-4xl text-[#1A1A1A]">
              {activeCategoryLabel}
            </h1>
            <p className="text-xs sm:text-sm text-[#8A8882] mt-1.5 max-w-xl">
              Authentic Pakistani luxury fashion, bespoke menswear, women’s couture pret, and hand-patinated leather creations. Available with Cash on Delivery nationwide.
            </p>
          </div>

          <span className="text-xs text-[#8A8882] tracking-wider uppercase tabular-nums">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'Creation' : 'Creations'} Available
          </span>
        </div>

        {/* Clean Category Segmented Bar */}
        <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilters((prev) => ({ ...prev, category: cat.id }))}
                className={`px-4 py-2 text-xs tracking-wider uppercase whitespace-nowrap transition-colors border ${
                  isActive
                    ? 'bg-[#1A1A1A] text-[#F9F8F4] border-[#1A1A1A] font-semibold'
                    : 'bg-white text-[#555] border-[#D8D4CC] hover:border-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting & Filter Trigger Bar */}
      <div className="py-4 flex items-center justify-between border-b border-[#E8E5DE] text-xs">
        {/* Left: Mobile & Desktop Filter Trigger */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-[#D8D4CC] bg-white text-[#1A1A1A] hover:border-[#1A1A1A] font-medium uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1A1A1A] text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#8A8882] hover:text-[#1A1A1A] underline underline-offset-4 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Sort By Selector */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="text-[#8A8882] uppercase tracking-wider text-[11px] hidden sm:inline">
            Sort By:
          </span>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))
            }
            className="bg-white border border-[#D8D4CC] text-[#1A1A1A] px-2 sm:px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-[#1A1A1A] max-w-[135px] xs:max-w-[170px] sm:max-w-none truncate"
          >
            <option value="featured">Featured Selection</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="popular">Client Rating</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      <div className="pt-8 w-full min-w-0">
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <h3 className="font-serif-luxury text-2xl text-[#1A1A1A]">
              No creations found matching your refined criteria
            </h3>
            <p className="text-xs text-[#8A8882] max-w-md mx-auto">
              Please reset your filters or explore all collections to view our full catalog.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 px-6 py-2.5 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-[0.16em]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 w-full min-w-0">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filter Sidebar / Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 max-w-full flex pr-6 sm:pr-10">
            <div className="w-screen max-w-[310px] sm:max-w-sm bg-[#F9F8F4] shadow-2xl flex flex-col border-r border-[#E8E5DE]">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-[#E8E5DE] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#1A1A1A]" />
                  <h3 className="font-serif-luxury text-xl text-[#1A1A1A]">Refine Collection</h3>
                </div>
                <button
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-1.5 text-[#8A8882] hover:text-[#1A1A1A]"
                >
                  <X className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Filter Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 divide-y divide-[#E8E5DE]">
                {/* Gender Filter */}
                <div className="space-y-3 pt-0">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] block">
                    Wardrobe Line
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {['all', 'men', 'women'].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
                        className={`py-2 text-xs font-medium uppercase tracking-wider border text-center transition-colors ${
                          filters.gender === g
                            ? 'bg-[#1A1A1A] text-[#F9F8F4] border-[#1A1A1A]'
                            : 'bg-white text-[#555] border-[#D8D4CC] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {g === 'all' ? 'All' : g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Status Filter */}
                <div className="pt-6 space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] block">
                    Availability
                  </span>
                  <label className="flex items-center gap-3 cursor-pointer text-xs text-[#1A1A1A]">
                    <input
                      type="checkbox"
                      checked={filters.inStockOnly}
                      onChange={(e) =>
                        setFilters((prev) => ({ ...prev, inStockOnly: e.target.checked }))
                      }
                      className="w-4 h-4 accent-[#1A1A1A]"
                    />
                    <span>Show ready-to-ship pieces only</span>
                  </label>
                </div>

                {/* Price Range */}
                <div className="pt-6 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A]">
                      Price Range (PKR)
                    </span>
                    <span className="tabular-nums text-[#8A8882]">
                      Up to PKR {filters.maxPrice.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="65000"
                    step="2500"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                    }
                    className="w-full accent-[#1A1A1A] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#8A8882] tabular-nums">
                    <span>PKR 5,000</span>
                    <span>PKR 65,000</span>
                  </div>
                </div>

                {/* Size Filter */}
                {allSizes.length > 0 && (
                  <div className="pt-6 space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] block">
                      Sizes
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {allSizes.map((s) => {
                        const isChecked = filters.sizes.includes(s);
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => toggleSizeFilter(s)}
                            className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                              isChecked
                                ? 'bg-[#1A1A1A] text-[#F9F8F4] border-[#1A1A1A]'
                                : 'bg-white text-[#1A1A1A] border-[#D8D4CC] hover:border-[#1A1A1A]'
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Color Swatch Filter */}
                {allColors.length > 0 && (
                  <div className="pt-6 space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#1A1A1A] block">
                      Color Palette
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {allColors.map((c) => {
                        const isChecked = filters.colors.includes(c.name);
                        return (
                          <button
                            key={c.name}
                            type="button"
                            onClick={() => toggleColorFilter(c.name)}
                            className={`flex items-center gap-2 p-2 border text-left text-xs transition-colors ${
                              isChecked
                                ? 'border-[#1A1A1A] bg-white font-semibold'
                                : 'border-[#E8E5DE] bg-white/60 hover:border-[#1A1A1A]'
                            }`}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                              style={{ backgroundColor: c.hex }}
                            />
                            <span className="truncate">{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-6 border-t border-[#E8E5DE] bg-white flex gap-3">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex-1 py-3 border border-[#D8D4CC] text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider hover:border-[#1A1A1A]"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 bg-[#1A1A1A] text-[#F9F8F4] text-xs font-semibold uppercase tracking-wider hover:bg-black"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
