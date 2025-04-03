import { Restaurant } from "@/types";

export const categories = [
  { name: "Restaurantes", icon: "🍽️" },
  { name: "Lanches", icon: "🍔" },
  { name: "Pizza", icon: "🍕" },
  { name: "Japonesa", icon: "🍱" },
  { name: "Brasileira", icon: "🥘" },
  { name: "Bebidas", icon: "🥤" },
]

export const restaurants: Restaurant[] = [
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
  // ... other restaurants
]