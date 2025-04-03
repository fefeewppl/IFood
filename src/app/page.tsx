"use client"

import { useState } from "react";
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import RestaurantList from '@/components/RestaurantList';
import RestaurantDetails from '@/components/RestaurantDetails';
import Menu from '@/components/Menu';
import Checkout from '@/components/Checkout';
import { useCart } from '@/hooks/useCart';
import { useAddressSearch } from '@/hooks/useAddressSearch';
import { categories, restaurants } from '@/data';
import { CheckoutInfo, Restaurant } from '@/types';

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo>({
    name: "",
    phone: "",
    address: "",
    addressDetails: "",
    city: "",
    state: "",
    paymentMethod: "credit",
    change: ""
  });

  const { 
    cart, 
    itemNotes, 
    addToCart, 
    clearCart, 
    removeFromCart, 
    updateNotes, 
    getCartTotal 
  } = useCart();

  const {
    addressSuggestions,
    isLoadingAddress,
    addressError,
    searchAddress,
    selectAddress
  } = useAddressSearch(checkoutInfo, setCheckoutInfo);

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const placeOrder = () => {
    console.log("Order placed:", {
      restaurant: selectedRestaurant,
      customer: {
        name: checkoutInfo.name,
        phone: checkoutInfo.phone,
        address: `${checkoutInfo.address}, ${checkoutInfo.addressDetails}`,
        city: checkoutInfo.city,
        state: checkoutInfo.state
      },
      items: cart,
      total: getCartTotal() + (selectedRestaurant ? parseFloat(selectedRestaurant.deliveryFee) : 0),
      paymentMethod: checkoutInfo.paymentMethod,
      change: checkoutInfo.change
    });
    
    setOrderPlaced(true);
    
    setTimeout(() => {
      clearCart();
      setShowCheckout(false);
      setShowMenu(false);
      setSelectedRestaurant(null);
      setOrderPlaced(false);
      setCheckoutInfo({
        name: "",
        phone: "",
        address: "",
        addressDetails: "",
        city: "",
        state: "",
        paymentMethod: "credit",
        change: ""
      });
    }, 3000);
  };

  const updateCheckoutInfo = (info: Partial<CheckoutInfo>) => {
    setCheckoutInfo(prev => ({ ...prev, ...info }));
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchLower = searchQuery.toLowerCase();
    return (
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.category.toLowerCase().includes(searchLower) ||
      restaurant.menu.items.some(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Section */}
      <section className="bg-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Busque por item ou loja"
              className="w-full py-3 px-12 rounded-lg shadow-lg text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {categories.map((category) => (
              <Button
                key={category.name}
                variant="outline"
                className="flex-shrink-0 text-lg"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Restaurantes</h2>
          <RestaurantList 
            restaurants={filteredRestaurants} 
            onSelectRestaurant={setSelectedRestaurant} 
          />
        </div>
      </section>

      {/* Restaurant Details Dialog */}
      <RestaurantDetails 
        restaurant={selectedRestaurant} 
        onClose={() => setSelectedRestaurant(null)} 
        onViewMenu={() => setShowMenu(true)} 
      />

      {/* Menu Dialog */}
      <Menu 
        restaurant={selectedRestaurant}
        showMenu={showMenu}
        onCloseMenu={() => setShowMenu(false)}
        cart={cart}
        itemNotes={itemNotes}
        onAddToCart={addToCart}
        onUpdateNotes={updateNotes}
        onClearCart={clearCart}
        onRemoveFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />

      {/* Checkout Dialog */}
      <Checkout 
        showCheckout={showCheckout}
        onCloseCheckout={() => setShowCheckout(false)}
        checkoutInfo={checkoutInfo}
        onUpdateCheckoutInfo={updateCheckoutInfo}
        cart={cart}
        restaurant={selectedRestaurant}
        orderPlaced={orderPlaced}
        onPlaceOrder={placeOrder}
        addressSuggestions={addressSuggestions}
        isLoadingAddress={isLoadingAddress}
        addressError={addressError}
        onSearchAddress={searchAddress}
        onSelectAddress={selectAddress}
      />
    </div>
  );
}