import React, { useState, useEffect } from 'react';
import { InventoryProvider, useInventory } from './context/InventoryContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AccountPage } from './pages/AccountPage';
import { StaticPages } from './pages/StaticPages';
import { NotFoundPage } from './pages/NotFoundPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Product } from './types';
import { supabase } from './supabaseClient';

function MainApp() {
  const { products, getProductById } = useInventory();

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (path === 'signin' || path === 'login') return 'signin';
      if (path === 'signup' || path === 'register') return 'signup';
      if (path === 'account' || path === 'dashboard' || path === 'profile') return 'account';
    }
    return 'home';
  });
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Protect private pages on initial load / URL change with supabase.auth.getSession()
  useEffect(() => {
    const privatePages = ['account', 'dashboard', 'profile'];
    if (privatePages.includes(currentPage)) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          window.location.href = '/login';
        }
      }).catch(() => {
        window.location.href = '/login';
      });
    }
  }, [currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, routeParams]);

  const handleNavigate = async (page: string, params: Record<string, string> = {}) => {
    const privatePages = ['account', 'dashboard', 'profile'];
    if (privatePages.includes(page)) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          window.location.href = '/login';
          return;
        }
      } catch {
        window.location.href = '/login';
        return;
      }
    }
    setCurrentPage(page);
    setRouteParams(params);
  };

  const handleSelectProduct = (productId: string) => {
    setCurrentPage('product-detail');
    setRouteParams({ productId });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleOrderSuccess = (orderId: string) => {
    setCurrentPage('order-confirmation');
    setRouteParams({ orderId });
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            products={products}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleQuickView}
            onNavigate={handleNavigate}
          />
        );

      case 'catalog':
        return (
          <CatalogPage
            key={routeParams.category || 'all'}
            products={products}
            initialCategory={routeParams.category || 'all'}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleQuickView}
            onNavigate={handleNavigate}
          />
        );

      case 'product-detail': {
        const prodId = routeParams.productId;
        const targetProduct = prodId ? getProductById(prodId) : undefined;
        if (!targetProduct) {
          return (
            <NotFoundPage
              onNavigateHome={() => handleNavigate('home')}
              onNavigateCatalog={() => handleNavigate('catalog')}
            />
          );
        }
        return (
          <ProductDetailPage
            product={targetProduct}
            allProducts={products}
            onSelectProduct={handleSelectProduct}
            onQuickView={handleQuickView}
            onNavigateToCheckout={() => handleNavigate('checkout')}
            onNavigate={handleNavigate}
          />
        );
      }

      case 'cart':
        return (
          <CartPage
            onNavigateToCheckout={() => handleNavigate('checkout')}
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onSelectProduct={handleSelectProduct}
          />
        );

      case 'checkout':
        return (
          <CheckoutPage
            onOrderSuccess={handleOrderSuccess}
            onNavigateToCart={() => handleNavigate('cart')}
          />
        );

      case 'order-confirmation':
        return (
          <OrderConfirmationPage
            orderId={routeParams.orderId || ''}
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onNavigateToOrders={() => handleNavigate('account')}
          />
        );

      case 'account':
      case 'dashboard':
      case 'profile':
      case 'wishlist':
        return (
          <AccountPage
            onNavigateToCatalog={() => handleNavigate('catalog')}
            onSelectProduct={handleSelectProduct}
            onOpenOrderReceipt={(orderId) => {
              setCurrentPage('order-confirmation');
              setRouteParams({ orderId });
            }}
          />
        );

      case 'signin':
      case 'login':
        return (
          <SignIn
            onNavigate={handleNavigate}
            initialEmail={routeParams.email}
            registered={routeParams.registered === 'true'}
          />
        );

      case 'signup':
      case 'register':
        return <SignUp onNavigate={handleNavigate} />;

      case 'about':
      case 'contact':
      case 'shipping-policy':
      case 'returns-policy':
      case 'faq':
      case 'privacy-policy':
      case 'terms':
        return (
          <StaticPages
            pageType={currentPage as any}
            onNavigateToCatalog={() => handleNavigate('catalog')}
          />
        );

      default:
        return (
          <NotFoundPage
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCatalog={() => handleNavigate('catalog')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full min-w-0 overflow-x-hidden flex flex-col bg-[#F9F8F4] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#F9F8F4]">
      {/* Global Navigation Header */}
      <Header
        currentPage={currentPage}
        currentCategory={routeParams.category}
        onNavigate={handleNavigate}
        onSearchOpen={() => setIsSearchOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full min-w-0 overflow-x-hidden">{renderCurrentView()}</main>

      {/* Global Luxury Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Slide-out Shopping Bag Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout')}
        onNavigateToCart={() => handleNavigate('cart')}
        onContinueShopping={() => handleNavigate('catalog')}
      />

      {/* Global Search Drawer / Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={handleSelectProduct}
        onSelectCategory={(category) => handleNavigate('catalog', { category })}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetails={handleSelectProduct}
      />

      {/* Customer Auth / Sign In Modal */}
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <InventoryProvider>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </InventoryProvider>
  );
}
