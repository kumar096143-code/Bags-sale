
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discount = product.salePrice 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="group flex flex-col bg-white overflow-hidden transition-all duration-300">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            -{discount}%
          </div>
        )}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 right-4 bg-black text-white p-3 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div className="py-4 px-1">
        <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 block">
          {product.category}
        </span>
        <h3 className="text-lg text-gray-800 font-medium mb-1 truncate">{product.name}</h3>
        <div className="flex items-center gap-3">
          {product.salePrice ? (
            <>
              <span className="text-black font-semibold text-lg">${product.salePrice}</span>
              <span className="text-gray-400 line-through text-sm">${product.price}</span>
            </>
          ) : (
            <span className="text-black font-semibold text-lg">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
