
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-gray-900">
      <img 
        src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2000"
        alt="Luxe Hero"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-white text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in">Limited Season Event</span>
        <h1 className="text-white text-5xl md:text-7xl mb-8 serif">The Art of Carrying</h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-10 font-light italic">
          Elevate your daily ritual with pieces that blend timeless elegance with modern utility. 
          Discover our curated sale selection.
        </p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-100 transition-all">
            Shop The Sale
          </button>
          <button className="border border-white text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
            New Arrivals
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
