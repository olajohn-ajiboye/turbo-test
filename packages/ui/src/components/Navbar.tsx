
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/sheet";
import { Input } from "../primitives/input";
import { Button } from "../primitives/button";
import { Search, User, ShoppingCart, Menu, Heart, ChevronRight } from 'lucide-react';

const categories = [
  {
    title: "Home & Living",
    subcategories: ["Home Decor", "Furniture", "Lighting", "Storage"]
  },
  {
    title: "Art & Collectibles",
    subcategories: ["Prints", "Photography", "Paintings", "Sculptures"]
  },
  {
    title: "Jewelry",
    subcategories: ["Necklaces", "Rings", "Earrings", "Bracelets"]
  }
];

interface NavbarProps {
  role?: 'buyer' | 'seller';
}

export const Navbar: React.FC<NavbarProps> = ({ role = 'buyer' }) => {
  const isBuyer = role === 'buyer';

  return (
    <nav className="w-full bg-white shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button - Only for Buyers */}
          {isBuyer ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mb-4 bg-[#030A70] hover:bg-[#030A70]/90 text-white"
                  >
                    Sell on Giri
                  </Button>
                  <div className="space-y-4">
                    {categories.map((category) => (
                      <div key={category.title} className="space-y-2">
                        <div className="font-medium text-lg">{category.title}</div>
                        <div className="pl-4 space-y-2">
                          {category.subcategories.map((sub) => (
                            <div key={sub} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 mr-2" />
                              <a href="#" className="hover:text-[#030A70]">{sub}</a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            // Mobile Menu for Sellers
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="w-full mb-4 bg-[#030A70] hover:bg-[#030A70]/90 text-white"
                  >
                    Shop on Giri
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Logo */}
          <div className={`flex-shrink-0 flex items-center ${!isBuyer ? 'ml-4' : ''}`}>
            <img 
              src="/api/placeholder/120/40" 
              alt="Giri Logo" 
              className="h-8 w-auto"
            />
          </div>

          {/* Search Bar - Only for Buyers */}
          {isBuyer && (
            <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <Input
                 label=""
                  type="text"
                  placeholder="Search for anything"
                  className="w-full pl-10 pr-4 py-2"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          {/* Right Navigation Items */}
          <div className="flex items-center space-x-2">
            {/* Switch Platform Button - Hidden on mobile */}
            <Button 
              variant="default" 
              size="sm" 
              className="bg-[#030A70] hover:bg-[#030A70]/90 text-white hidden sm:flex"
            >
              {isBuyer ? 'Sell on Giri' : 'Shop on Giri'}
            </Button>

            {/* Sign In Button - Always Visible */}
            <Button variant="ghost" size="sm" className="text-sm">
              Sign In
            </Button>

            {/* Account Dropdown - Visible for both buyers and sellers */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hidden sm:flex">
                  <User className="h-5 w-5 mr-2" />
                  <span>Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Register</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Account Icon - Visible for both buyers and sellers */}
            <Button variant="ghost" className="sm:hidden">
              <User className="h-5 w-5" />
            </Button>

            {/* Buyer-only Navigation Items */}
            {isBuyer && (
              <>
                {/* Favorites Button */}
                <Button variant="ghost" className="relative">
                  <Heart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-[#030A70] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </Button>

                {/* Cart Icon */}
                <Button variant="ghost" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-[#030A70] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search (visible on small screens) - Only for Buyers */}
        {isBuyer && (
          <div className="lg:hidden py-2">
            <Input
              type="text"
              placeholder="Search for anything"
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Categories Navigation - Only for Buyers */}
      {isBuyer && (
        <div className="hidden lg:block border-t">
          <div className="container mx-auto px-4">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {categories.map((category) => (
                  <NavigationMenuItem key={category.title}>
                    <NavigationMenuTrigger>{category.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] p-4 gap-3">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory}>
                            <a
                              href="#"
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[#030A70]/10 hover:text-[#030A70]"
                            >
                              {subcategory}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      )}
    </nav>
  );
};

