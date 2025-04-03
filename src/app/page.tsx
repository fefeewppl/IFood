"use client"

import Image from "next/image";
import Header from '@/components/Header'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

const categories = [
  { name: "Restaurantes", icon: "🍽️" },
  { name: "Lanches", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Japonesa", icon: "🍱" },
  { name: "Brasileira", icon: "🥘" },
  { name: "Bebidas", icon: "🥤" },
]

// Add menu item type
type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Single Restaurant type definition with menu
type Restaurant = {
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

// Single restaurants constant with menu data
const restaurants: Restaurant[] = [
  {
    name: "Burger House",
    location: {
      address: "Rua Augusta, 500 - São Paulo",
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    rating: 4.8,
    deliveryTime: "25-35",
    deliveryFee: "5.99",
    minOrder: "15.00",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=800",
    category: "Lanches",
    menu: {
      categories: ["Burgers", "Acompanhamentos", "Bebidas"],
      items: [
        {
          id: "1",
          name: "Classic Burger",
          description: "Hambúrguer artesanal, queijo, alface e tomate",
          price: 28.90,
          image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800",
          category: "Burgers"
        },
        {
          id: "2",
          name: "Cheese Fries",
          description: "Batata frita com queijo cheddar e bacon",
          price: 18.90,
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=800",
          category: "Acompanhamentos"
        }
      ]
    }
  },
  {
    name: "Pizza Express",
    location: {
      address: "Rua Consolação, 200 - São Paulo",
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    rating: 4.6,
    deliveryTime: "30-45",
    deliveryFee: "4.99",
    minOrder: "20.00",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800",
    category: "Pizza",
    menu: {
      categories: ["Pizzas", "Sobremesas", "Bebidas"],
      items: [
        {
          id: "1",
          name: "Margherita",
          description: "Molho de tomate, mussarela, manjericão fresco",
          price: 45.90,
          image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800",
          category: "Pizzas"
        }
      ]
    }
  },
  {
    name: "Sushi Master",
    location: {
      address: "Av. Paulista, 1000 - São Paulo",
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    rating: 4.9,
    deliveryTime: "40-50",
    deliveryFee: "6.99",
    minOrder: "25.00",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800",
    category: "Japonesa",
    menu: {
      categories: ["Sushi", "Sashimi", "Temaki", "Bebidas"],
      items: [
        {
          id: "1",
          name: "Combo Sushi",
          description: "20 peças variadas de sushi",
          price: 89.90,
          image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800",
          category: "Sushi"
        }
      ]
    }
  }
]

// Add new state for menu dialog
// Add CartItem type and cart state
// Update CartItem type to include notes
type CartItem = MenuItem & {
  quantity: number;
  notes?: string;
}

export default function Home() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [showMenu, setShowMenu] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [itemNotes, setItemNotes] = useState<{ [key: string]: string }>({})
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = restaurants.filter(restaurant => {
    const searchLower = searchQuery.toLowerCase()
    return (
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.category.toLowerCase().includes(searchLower) ||
      restaurant.menu.items.some(item => 
        item.name.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower)
      )
    )
  })

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(cartItem => cartItem.id === item.id)
      
      if (existingItem) {
        return currentCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: quantity, notes: itemNotes[item.id] }
            : cartItem
        )
      }

      return [...currentCart, { ...item, quantity, notes: itemNotes[item.id] }]
    })
    // Clear notes after adding to cart
    setItemNotes(prev => ({ ...prev, [item.id]: '' }))
  }

  const clearCart = () => {
    setCart([])
    setItemNotes({})
  }

  const removeFromCart = (itemId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== itemId));
    setItemNotes(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Card 
                  key={restaurant.name} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedRestaurant(restaurant)}
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
        </div>
      </section>

      {/* Restaurant Details Dialog */}
      <Dialog open={!!selectedRestaurant} onOpenChange={() => setSelectedRestaurant(null)}>
        <DialogContent className="max-w-3xl">
          {selectedRestaurant && (
            <>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">{selectedRestaurant.name}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <div className="relative h-56 rounded-lg overflow-hidden">
                    <Image
                      src={selectedRestaurant.image}
                      alt={selectedRestaurant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-4 mt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-medium">{selectedRestaurant.rating}</span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-500">{selectedRestaurant.category}</span>
                      </div>
                      <div className="text-gray-500">
                        {selectedRestaurant.deliveryTime} min
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-2">Informações do restaurante</h3>
                      <p className="text-gray-600">Entrega: R$ {selectedRestaurant.deliveryFee}</p>
                      <p className="text-gray-600">Pedido mínimo: R$ {selectedRestaurant.minOrder}</p>
                    </div>
                    <div className="border-t pt-4">
                      <Button 
                        className="w-full" 
                        size="lg" 
                        onClick={() => setShowMenu(true)}
                      >
                        Ver cardápio completo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Menu Dialog */}
      <Dialog open={showMenu} onOpenChange={setShowMenu}>
        <DialogContent className="max-w-4xl">
          {selectedRestaurant && (
            <>
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">Cardápio - {selectedRestaurant.name}</DialogTitle>
              </DialogHeader>
              <div className="flex overflow-x-auto space-x-4 mb-6">
                {selectedRestaurant.menu.categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="flex-shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                {selectedRestaurant.menu.items.map((item) => (
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
                        onChange={(e) => setItemNotes(prev => ({ ...prev, [item.id]: e.target.value }))}
                      />
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          className="w-20 p-2 border rounded-md"
                          defaultValue="1"
                          onChange={(e) => addToCart(item, parseInt(e.target.value))}
                        />
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => addToCart(item)}
                        >
                          Adicionar
                          {(cart.find(cartItem => cartItem.id === item.id)?.quantity ?? 0) > 0 && (
                            <span className="ml-2 bg-red-500 text-white rounded-full px-2">
                              {cart.find(cartItem => cartItem.id === item.id)?.quantity}
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
                      onClick={clearCart}
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
                              onClick={() => removeFromCart(item.id)}
                            >
                              ✕
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
                  <Button className="w-full mt-4" size="lg">
                    Finalizar pedido
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
