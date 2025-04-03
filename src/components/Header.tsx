import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Menu, ShoppingBag, User } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-2xl font-bold text-red-500">
            iFood
          </Link>
          <Button variant="ghost" className="text-gray-700" asChild>
            <Link href="/restaurants">Restaurantes</Link>
          </Button>
          <Button variant="ghost" className="text-gray-700" asChild>
            <Link href="/markets">Mercados</Link>
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-2 mt-6">
              <Link 
                href="/restaurants" 
                className="p-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Restaurantes
              </Link>
              <Link 
                href="/markets" 
                className="p-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Mercados
              </Link>
              <Link 
                href="/orders" 
                className="p-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Meus Pedidos
              </Link>
              <Link 
                href="/profile" 
                className="p-3 text-lg font-medium text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Perfil
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}

export default Header