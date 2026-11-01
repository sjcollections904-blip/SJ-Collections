import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerAddress, Order, UserProfile } from '../types';
import { useInventory } from './InventoryContext';
import { supabase } from '../supabaseClient';

interface AuthContextType {
  currentUser: UserProfile | null;
  orders: Order[];
  isAuthenticated: boolean;
  login: (email: string, phone?: string) => Promise<boolean>;
  register: (name: string, email: string, phone: string) => Promise<boolean>;
  logout: () => void;
  saveAddress: (address: Omit<CustomerAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: Order['status'] }) => Promise<Order>;
  cancelOrder: (orderId: string) => boolean;
  getOrderById: (orderId: string) => Order | undefined;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';
}

const USER_STORAGE_KEY = 'sj_collections_user_v1';
const ORDERS_STORAGE_KEY = 'sj_collections_orders_v1';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { restoreStock } = useInventory();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'SJC-2026-4821',
        createdAt: '2026-03-24T14:30:00Z',
        customerName: 'Hamza Khan',
        customerEmail: 'hamza.khan@gmail.com',
        customerPhone: '03001234567',
        shippingAddress: {
          province: 'Punjab',
          city: 'Lahore',
          area: 'DHA Phase 5, Block G',
          streetAddress: 'House 142, Street 8, DHA Phase 5',
          deliveryInstructions: 'Please call before arrival.'
        },
        items: [
          {
            productId: 'sjc-mc-001',
            productName: 'Bespoke Charcoal Wool & Silk Tailored Waistcoat',
            productImage: '/src/assets/images/mens_tailored_collection_1793376932020.jpg',
            sku: 'SJC-MC-001-40-CHR',
            size: '40 (M)',
            color: 'Midnight Charcoal',
            quantity: 1,
            unitPrice: 21500,
            subtotal: 21500
          }
        ],
        subtotal: 21500,
        shippingFee: 0,
        discount: 0,
        total: 21500,
        paymentMethod: 'Cash on Delivery (COD)',
        status: 'Confirmed',
        trackingNumber: 'TRX-PK-884920'
      }
    ];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    // 1. Initial check for existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const email = session.user.email || '';
        setCurrentUser((prev) => {
          if (prev && prev.email === email) return prev;
          return {
            id: session.user.id,
            name: session.user.user_metadata?.name || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            email,
            phone: session.user.user_metadata?.phone || '',
            addresses: prev?.addresses || []
          };
        });
      }
    });

    // 2. Subscribe to auth state updates
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const email = session.user.email || '';
        setCurrentUser((prev) => ({
          id: session.user.id,
          name: session.user.user_metadata?.name || prev?.name || email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
          email,
          phone: session.user.user_metadata?.phone || prev?.phone || '',
          addresses: prev?.addresses || []
        }));
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, phone?: string): Promise<boolean> => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      email,
      phone: phone || '03333368420',
      addresses: currentUser?.addresses || []
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return true;
  };

  const register = async (name: string, email: string, phone: string): Promise<boolean> => {
    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      addresses: []
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    return true;
  };

  const logout = () => {
    supabase.auth.signOut().catch(() => {});
    setCurrentUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  const saveAddress = (address: Omit<CustomerAddress, 'id'>) => {
    if (!currentUser) return;
    const newAddress: CustomerAddress = {
      ...address,
      id: `addr-${Date.now()}`
    };

    const updatedAddresses = address.isDefault
      ? [...currentUser.addresses.map((a) => ({ ...a, isDefault: false })), newAddress]
      : [...currentUser.addresses, newAddress];

    setCurrentUser({
      ...currentUser,
      addresses: updatedAddresses
    });
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    setCurrentUser({
      ...currentUser,
      addresses: currentUser.addresses.filter((a) => a.id !== id)
    });
  };

  const createOrder = async (
    orderData: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: Order['status'] }
  ): Promise<Order> => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const { status, ...restData } = orderData;
    const newOrder: Order = {
      ...restData,
      id: `SJC-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
      status: status || 'pending_whatsapp_confirmation',
      trackingNumber: `TRX-PK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const cancelOrder = (orderId: string): boolean => {
    const target = orders.find((o) => o.id === orderId);
    if (!target || (target.status !== 'Confirmed' && target.status !== 'pending_whatsapp_confirmation')) {
      return false;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'Cancelled' as const } : o))
    );

    // Increment and restore product stock levels back into InventoryContext state
    const itemsToRestore = target.items.map((i) => ({
      productId: i.productId,
      sku: i.sku,
      size: i.size,
      color: i.color,
      quantity: i.quantity
    }));
    restoreStock(itemsToRestore);

    return true;
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        orders,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        saveAddress,
        deleteAddress,
        createOrder,
        cancelOrder,
        getOrderById,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
