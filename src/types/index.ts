// Restaurant and menu related types
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export type Restaurant = {
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  minOrder: string;
  image: string;
  category: string;
  location: {
    address: string;
    coordinates: { lat: number; lng: number };
  };
  menu: {
    categories: string[];
    items: MenuItem[];
  };
}

// Cart related types
export type CartItem = MenuItem & {
  quantity: number;
  notes?: string;
}

// Checkout related types
export type CheckoutInfo = {
  name: string;
  phone: string;
  address: string;
  addressDetails: string;
  city: string;
  state: string;
  paymentMethod: string;
  change?: string;
}