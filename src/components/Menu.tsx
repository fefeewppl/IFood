"use client";

import { Restaurant, CartItem, MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Minus, X } from 'lucide-react'; // Add X to the import
import Image from "next/image";

type MenuProps = {
  restaurant: Restaurant | null;
  showMenu: boolean;
  onCloseMenu: () => void;
  cart: CartItem[];
  itemNotes: { [key: string]: string };
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onUpdateNotes: (itemId: string, notes: string) => void;
  onClearCart: () => void;
  onRemoveFromCart: (itemId: string) => void;
  onCheckout: () => void;
};

export default function Menu({
  restaurant,
  showMenu,
  onCloseMenu,
  cart,
  itemNotes,
  onAddToCart,
  onUpdateNotes,
  onClearCart,
  onRemoveFromCart,
  onCheckout
}: MenuProps) {
  if (!restaurant) return null;

  // Function to handle quantity changes
  const handleQuantityChange = (item: MenuItem, currentQuantity: number, change: number) => {
    const newQuantity = Math.max(1, currentQuantity + change);
    onAddToCart(item, newQuantity);
  };

  // Get current quantity of an item in cart
  const getItemQuantity = (itemId: string): number => {
    const cartItem = cart.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <Dialog open={showMenu} onOpenChange={onCloseMenu}>
      <DialogContent className="max-w-4xl sm:max-w-4xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">Cardápio - {restaurant.name}</DialogTitle>
          {/* Remove our custom close button */}
        </DialogHeader>
        
        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {restaurant.menu.items.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-4 p-4 hover:bg-gray-50 rounded-lg">
              <div className="relative h-32 md:h-24 w-full md:w-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <p className="text-lg font-medium">R$ {item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col gap-3 w-full md:min-w-[200px]">
                <textarea
                  placeholder="Alguma observação?"
                  className="w-full p-2 text-sm border rounded-md"
                  value={itemNotes[item.id] || ''}
                  onChange={(e) => onUpdateNotes(item.id, e.target.value)}
                />
                <div className="flex items-center gap-2">
                  {/* Quantity controls */}
                  <div className="flex items-center border rounded-md">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-9 px-2"
                      onClick={() => handleQuantityChange(item, getItemQuantity(item.id), -1)}
                      disabled={getItemQuantity(item.id) <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-2 min-w-[30px] text-center">
                      {getItemQuantity(item.id) || 1}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="h-9 px-2"
                      onClick={() => handleQuantityChange(item, getItemQuantity(item.id), 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => onAddToCart(item, getItemQuantity(item.id) || 1)}
                  >
                    Adicionar
                    {getItemQuantity(item.id) > 0 && (
                      <span className="ml-2 bg-red-500 text-white rounded-full px-2">
                        {getItemQuantity(item.id)}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {cart.length > 0 && (
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Seu pedido</h3>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onClearCart}
                className="text-red-500 hover:text-red-700"
              >
                Limpar carrinho
              </Button>
            </div>
            <div className="space-y-2 mb-4">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span>{item.quantity}x</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 p-1 h-auto"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {item.notes && (
                    <p className="text-sm text-gray-500 ml-6">Obs: {item.notes}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>
                R$ {cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={onCheckout}
            >
              Finalizar pedido
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}