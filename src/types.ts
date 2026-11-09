export type DietaryType = 'veg' | 'non-veg';

export interface PortionOption {
  name: string;
  price: number;
  description?: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface Dish {
  id: string;
  name: string;
  category: string;
  dietary: DietaryType;
  spiceLevel: number; // 0 to 3
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
  prepTime?: string;
  portionOptions?: PortionOption[];
  addonOptions?: AddonOption[];
  tags?: string[];
}

export interface SelectedAddon {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string; // unique key combining dishId and options
  dishId: string;
  name: string;
  dietary: DietaryType;
  unitPrice: number;
  quantity: number;
  portionName?: string;
  spiceLevel?: string;
  selectedAddons?: SelectedAddon[];
  specialInstructions?: string;
  image: string;
}

export interface Address {
  id: string;
  label: 'Home' | 'Work' | 'Other';
  addressLine: string;
  area: string;
  city: string;
  isPrimary?: boolean;
}

export type OrderStatus = 'placed' | 'cooking' | 'packed' | 'out_for_delivery' | 'delivered';

export interface OrderItemSummary {
  name: string;
  quantity: number;
  price: number;
  portion?: string;
  dietary: DietaryType;
}

export interface Order {
  id: string;
  displayId: string;
  placedAt: string;
  status: OrderStatus;
  items: OrderItemSummary[];
  itemTotal: number;
  deliveryFee: number;
  packagingFee: number;
  tax: number;
  discount: number;
  couponCode?: string;
  grandTotal: number;
  savings: number;
  deliveryAddress: Address;
  deliveryInstructions?: string;
  contactlessDelivery?: boolean;
  noPlasticCutlery?: boolean;
  estimatedArrivalMinutes: number;
  currentStage: number; // 1 to 5
  rider?: {
    name: string;
    phone: string;
    rating: number;
    avatar: string;
    deliveriesCount: number;
  };
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  loyaltyTier: string;
  royaltyPoints: number;
  savedAddresses: Address[];
  vegOnlyMode: boolean;
  notificationsEnabled: boolean;
}

