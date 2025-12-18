
import React from 'react';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartToggle }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-600">
              <Menu size={24} />
            </button>
            <span className="text-2xl font-bold tracking-tighter serif">LUXEBAG</span>
          </div>
          
          <div className="hidden lg:flex gap-8 text-sm font-medium text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Shop All</a>
            <a href="#" className="hover:text-black transition-colors">Handbags</a>
            <a href="#" className="hover:text-black transition-colors">Backpacks</a>
            <a href="#" className="hover:text-black transition-colors">Sale</a>
          </div>

          <div className="flex items-center gap-5 text-gray-600">
            <button className="hover:text-black transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-black transition-colors">
              <User size={20} />
            </button>
            <button 
              onClick={onCartToggle}
              className="relative hover:text-black transition-colors flex items-center gap-1"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
