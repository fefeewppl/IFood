import Header from '@/components/Header'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const services = [
  {
    name: "Men's Haircut",
    duration: "30 min",
    price: 30,
    description: "Classic haircut including washing and styling"
  },
  {
    name: "Beard Trim",
    duration: "20 min",
    price: 20,
    description: "Professional beard trimming and shaping"
  },
  {
    name: "Hair & Beard Combo",
    duration: "45 min",
    price: 45,
    description: "Complete hair and beard grooming service"
  }
]

export default function Services() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.name}>
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{service.description}</p>
                <p className="text-2xl font-bold mt-4">${service.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}