
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AIChat from './components/AIChat';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
// Add ShoppingBag to the imports from lucide-react
import { Filter, SlidersHorizontal, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const categories = ['All', 'Handbags', 'Backpacks', 'Clutches', 'Travel'];

  const filteredProducts = PRODUCTS.filter(p => 
    filter === 'All' ? true : p.category === filter
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onCartToggle={() => setIsCartOpen(true)} />
      
      <main className="flex-1">
        <Hero />

        {/* Product Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl serif mb-2">Curated Collection</h2>
              <p className="text-gray-500 font-light italic">Artisanal craftsmanship meets modern design.</p>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
              <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                      filter === cat 
                        ? 'bg-white text-black shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600">
                <SlidersHorizontal size={16} />
                <span>Sort</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={addToCart} 
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400">No items found in this category.</p>
            </div>
          )}
        </section>

        {/* Feature Section */}
        <section className="bg-black text-white py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-16 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6 text-white/60">
                <Filter size={32} />
              </div>
              <h4 className="text-xl serif mb-4">Uncompromising Quality</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                Every bag is hand-inspected for stitching, structural integrity, and finish excellence.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6 text-white/60">
                <SlidersHorizontal size={32} />
              </div>
              <h4 className="text-xl serif mb-4">Ethical Sourcing</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                We partner only with tanneries and factories that uphold the highest environmental standards.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-6 text-white/60">
                <ShoppingBag size={32} />
              </div>
              <h4 className="text-xl serif mb-4">Seamless Experience</h4>
              <p className="text-gray-400 font-light leading-relaxed">
                From AI styling to doorstep delivery, we ensure your journey is as smooth as our leather.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <h2 className="text-3xl font-bold tracking-tighter serif mb-6">LUXEBAG</h2>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Crafting modern luxury with an AI touch. Join our community for exclusive early access to sales and new arrivals.
              </p>
              <div className="flex gap-4">
                <input 
                  placeholder="Enter your email" 
                  className="bg-gray-100 border-none rounded-lg px-6 py-3 flex-1 focus:ring-1 focus:ring-black"
                />
                <button className="bg-black text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Join
                </button>
              </div>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6">Explore</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Artisan Network</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Journal</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Wholesale</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs mb-6">Support</h5>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest">
            <span>&copy; 2024 LUXEBAG. All Rights Reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-black">Privacy Policy</a>
              <a href="#" className="hover:text-black">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      
      <AIChat products={PRODUCTS} />
    </div>
  );
};

export default App;
