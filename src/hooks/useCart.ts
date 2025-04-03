import { useState } from "react";
import { CartItem, MenuItem } from "@/types";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [itemNotes, setItemNotes] = useState<{ [key: string]: string }>({});

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: quantity, notes: itemNotes[item.id] }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity, notes: itemNotes[item.id] }];
    });
    // Clear notes after adding to cart
    setItemNotes(prev => ({ ...prev, [item.id]: '' }));
  };

  const clearCart = () => {
    setCart([]);
    setItemNotes({});
  };

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
    setItemNotes(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const updateNotes = (itemId: string, notes: string) => {
    setItemNotes(prev => ({ ...prev, [itemId]: notes }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return {
    cart,
    itemNotes,
    addToCart,
    clearCart,
    removeFromCart,
    updateNotes,
    getCartTotal
  };
}