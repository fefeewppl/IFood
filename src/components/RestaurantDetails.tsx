"use client";

import { Restaurant } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

type RestaurantDetailsProps = {
  restaurant: Restaurant | null;
  onClose: () => void;
  onViewMenu: () => void;
};

export default function RestaurantDetails({ 
  restaurant, 
  onClose, 
  onViewMenu 
}: RestaurantDetailsProps) {
  if (!restaurant) return null;

  return (
    <Dialog open={!!restaurant} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">{restaurant.name}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <div className="relative h-56 rounded-lg overflow-hidden">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium">{restaurant.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">{restaurant.category}</span>
                </div>
                <div className="text-gray-500">
                  {restaurant.deliveryTime} min
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Informações do restaurante</h3>
                <p className="text-gray-600">Entrega: R$ {restaurant.deliveryFee}</p>
                <p className="text-gray-600">Pedido mínimo: R$ {restaurant.minOrder}</p>
              </div>
              <div className="border-t pt-4">
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={onViewMenu}
                >
                  Ver cardápio completo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}