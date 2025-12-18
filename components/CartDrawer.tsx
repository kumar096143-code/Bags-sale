
import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const total = items.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl serif font-bold uppercase tracking-widest">Shopping Bag ({items.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
                <p className="mb-4">Your bag is currently empty.</p>
                <button onClick={onClose} className="text-black font-bold border-b border-black">Continue Shopping</button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">${item.salePrice || item.price}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <button 
              disabled={items.length === 0}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-[0.2em] font-medium disabled:bg-gray-400 transition-colors"
            >
              Secure Checkout
            </button>
            <p className="mt-4 text-[10px] text-gray-400 text-center uppercase tracking-widest">
              Complimentary shipping on orders over $250
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
