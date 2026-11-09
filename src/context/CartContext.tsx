import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, DietaryType, SelectedAddon, Order } from '../types';
import { restaurantConfig } from '../config/restaurantConfig';
import { INITIAL_USER, INITIAL_ORDERS } from '../data/mockUserData';

export interface AddToCartPayload {
  dishId: string;
  name: string;
  dietary: DietaryType;
  unitPrice: number;
  quantity?: number;
  portionName?: string;
  spiceLevel?: string;
  selectedAddons?: SelectedAddon[];
  specialInstructions?: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (payload: AddToCartPayload) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
  appliedCoupon: { code: string; discountAmount: number; description: string } | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  leaveAtDoor: boolean;
  setLeaveAtDoor: (val: boolean) => void;
  noPlasticCutlery: boolean;
  setNoPlasticCutlery: (val: boolean) => void;
  cookingInstructions: string;
  setCookingInstructions: (val: string) => void;
  selectedAddressId: string;
  setSelectedAddressId: (val: string) => void;
  // Calculations
  totalItemCount: number;
  itemSubtotal: number;
  deliveryFee: number;
  packagingFee: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  totalSavings: number;
  // Orders
  orders: Order[];
  placeOrder: () => Order;
  activeOrder: Order | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'pk_punjabi_cart_items_v1';
const COUPON_KEY = 'pk_punjabi_cart_coupon_v1';
const ORDERS_KEY = 'pk_punjabi_orders_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with the 3 default items matching the Stitch Cart screen
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed reading cart from localStorage', e);
    }
    // Default matching Stitch Shopping Cart screen
    return [
      {
        cartItemId: 'dal-makhani-half',
        dishId: 'dal-makhani',
        name: '24-Hour Dum Dal Makhani',
        dietary: 'veg',
        unitPrice: 355,
        quantity: 1,
        portionName: 'Half Handi • Medium Spicy',
        selectedAddons: [
          { id: 'extra-makhan', name: 'Extra White Makhan', price: 40 },
          { id: 'garlic-naan', name: 'Garlic Naan (1)', price: 65 },
        ],
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYhhSPsz_QDkoqIGK-zxiDLHDKe_3s6ib1Na9_ka5fOGjaUFPRw8NN-i65rnm4M-aKb7MiKapWtNlcg_o7pjOpWERFR00yMuKbVRmCggAZiU2mvVxVH4p78ILuC02XeSIxewd-DtilHWyV5eH8vIbCbL27Y2wN9i_YwGLm_2_76RZJ8CGqR4f7dEF9gw01sS14dpaXcXK0DAfEk8yzAaoNH18K_oLgvAzfHyysE0QG',
      },
      {
        cartItemId: 'butter-chicken-full',
        dishId: 'butter-chicken',
        name: 'Grand Trunk Road Butter Chicken',
        dietary: 'non-veg',
        unitPrice: 420,
        quantity: 1,
        portionName: 'Boneless Full (4 pcs) • Authentic Spice',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmaFhNsJDbjThbOc533KdoScpuI9ytcn-90KVQWDzjmIhRV-YveIo5UBv0Bf1T5d24I-DRFewfmo0b4A-h8j1HPLkN0fU4VvIfGhKTyxGNdIIsfwJcABd6g3UusZ_OWtE2QCg_nTove1_iqdIzOcc_7wv-uKQYBCba6XVCFfNjDOsapWrqIp-eKTGKa0g2bgGuwUijdFktGAnEcIEfEb5Bca42FPVHvKuB-Qy_1RXH',
      },
      {
        cartItemId: 'kesar-lassi-2',
        dishId: 'kesar-lassi',
        name: 'Patiala Shahi Kesar Lassi',
        dietary: 'veg',
        unitPrice: 120,
        quantity: 2,
        portionName: '400ml Chilled Earthen Matka',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6YJ0qMhLDPBlCZgf5S08i8gjRHVT-0fXg5WDvPERrbMuy_XoI4SBThozvCtpEZc97Pybh9gaXAxDTzLZIDd3cDAntk92wUO7FljlfrItm0hVZEmGNtaWNlONWzjSZJTl_7rII8Kg-z63watXZIU5s9PVQnU-Ww_Z5gtOitdD6eONyoIPaXn5FCAZX6BVR7DIqsbfr4lHuDmbP5WxckhjrdKVAlwcjyik_lGOm0HrH',
      },
    ];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountAmount: number;
    description: string;
  } | null>(() => {
    try {
      const saved = localStorage.getItem(COUPON_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    // Default coupon applied matching Stitch screen
    return {
      code: 'ROYALPK',
      discountAmount: 150,
      description: 'You saved ₹150 (25% Royal Discount)',
    };
  });

  const [leaveAtDoor, setLeaveAtDoor] = useState(true);
  const [noPlasticCutlery, setNoPlasticCutlery] = useState(true);
  const [cookingInstructions, setCookingInstructions] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(INITIAL_USER.savedAddresses[0].id);

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_ORDERS;
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToCart = (payload: AddToCartPayload) => {
    const qty = payload.quantity || 1;
    // Build unique key
    const addonKey = (payload.selectedAddons || []).map((a) => a.id).sort().join('-');
    const portionKey = payload.portionName || 'default';
    const cartItemId = `${payload.dishId}-${portionKey}-${addonKey}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          dishId: payload.dishId,
          name: payload.name,
          dietary: payload.dietary,
          unitPrice: payload.unitPrice,
          quantity: qty,
          portionName: payload.portionName,
          spiceLevel: payload.spiceLevel,
          selectedAddons: payload.selectedAddons,
          specialInstructions: payload.specialInstructions,
          image: payload.image,
        },
      ];
    });
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = restaurantConfig.financials.coupons.find((c) => c.code.toUpperCase() === clean);
    if (!found) {
      return { success: false, message: 'Invalid Royal coupon code.' };
    }
    if (itemSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Order must be at least ₹${found.minOrder} to apply ${found.code}.`,
      };
    }
    const couponObj = {
      code: found.code,
      discountAmount: found.discountAmount,
      description: found.description,
    };
    setAppliedCoupon(couponObj);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const itemSubtotal = cartItems.reduce((acc, item) => {
    const addonsTotal = (item.selectedAddons || []).reduce((s, a) => s + a.price, 0);
    return acc + (item.unitPrice + addonsTotal) * item.quantity;
  }, 0);

  const isFreeDelivery = itemSubtotal >= restaurantConfig.financials.freeDeliveryThreshold;
  const deliveryFee = totalItemCount > 0 ? (isFreeDelivery ? 0 : restaurantConfig.financials.deliveryFee) : 0;
  const packagingFee = totalItemCount > 0 ? restaurantConfig.financials.packagingCharge : 0;
  const taxAmount = totalItemCount > 0 ? Math.round(itemSubtotal * restaurantConfig.financials.gstRate * 100) / 100 : 0;

  const discountAmount = appliedCoupon && totalItemCount > 0 ? appliedCoupon.discountAmount : 0;

  const grandTotal = Math.max(
    0,
    Math.round((itemSubtotal + deliveryFee + packagingFee + taxAmount - discountAmount) * 100) / 100
  );

  const totalSavings = (isFreeDelivery && totalItemCount > 0 ? restaurantConfig.financials.deliveryFee : 0) + discountAmount;

  const activeOrder = orders.find((o) => o.status !== 'delivered') || orders[0] || null;

  const placeOrder = (): Order => {
    const address =
      INITIAL_USER.savedAddresses.find((a) => a.id === selectedAddressId) || INITIAL_USER.savedAddresses[0];

    const newOrderNumber = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `pk-order-${newOrderNumber}`,
      displayId: `#PK-${newOrderNumber}`,
      placedAt: 'Just now',
      status: 'cooking',
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.unitPrice * item.quantity,
        portion: item.portionName,
        dietary: item.dietary,
      })),
      itemTotal: itemSubtotal,
      deliveryFee,
      packagingFee,
      tax: taxAmount,
      discount: discountAmount,
      couponCode: appliedCoupon?.code,
      grandTotal,
      savings: totalSavings,
      deliveryAddress: address,
      deliveryInstructions: cookingInstructions,
      contactlessDelivery: leaveAtDoor,
      noPlasticCutlery,
      estimatedArrivalMinutes: 25,
      currentStage: 2,
      rider: {
        name: 'Harpreet Singh',
        phone: '+91 98140 12345',
        rating: 4.9,
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuCKzxA3ZK38LxzGndHGY2Bi4nwWrPPInIW4WtCYr13APQIsg1XItcPWTI1_PB9KndQ_Y_vdk-fx37KqwwWTqye56Qo1dtkxZNBMng2argH0j7oaUsJpMk-k5hf1h52Mp6zL1GcQVLqnvAdNboN0cyycR-zBYMgWQ8CZI6CmsQB6klvxrMQJQFma5AM2q04MRRkh-m0elhlqFmA2mdhECte0M-GKUUJlJing8yiRrSNk',
        deliveriesCount: 1420,
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        leaveAtDoor,
        setLeaveAtDoor,
        noPlasticCutlery,
        setNoPlasticCutlery,
        cookingInstructions,
        setCookingInstructions,
        selectedAddressId,
        setSelectedAddressId,
        totalItemCount,
        itemSubtotal,
        deliveryFee,
        packagingFee,
        taxAmount,
        discountAmount,
        grandTotal,
        totalSavings,
        orders,
        placeOrder,
        activeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

