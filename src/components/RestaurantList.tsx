"use client";

import { Restaurant } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type RestaurantListProps = {
  restaurants: Restaurant[];
  onSelectRestaurant: (restaurant: Restaurant) => void;
};

export default function RestaurantList({ restaurants, onSelectRestaurant }: RestaurantListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {restaurants.length > 0 ? (
        restaurants.map((restaurant) => (
          <Card 
            key={restaurant.name} 
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectRestaurant(restaurant)}
          >
            <div className="relative h-48">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{restaurant.rating}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{restaurant.category}</span>
              </div>
              <div className="text-sm text-gray-500">
                <p>{restaurant.deliveryTime} min • R$ {restaurant.deliveryFee} entrega</p>
                <p>Pedido mínimo R$ {restaurant.minOrder}</p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-full text-center py-8 text-gray-500">
          Nenhum restaurante ou item encontrado
        </div>
      )}
    </div>
  );
}