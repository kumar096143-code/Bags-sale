
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Sparkles } from 'lucide-react';
import { Message, Product } from '../types';
import { getStylingAdvice } from '../services/geminiService';

interface AIChatProps {
  products: Product[];
}

const AIChat: React.FC<AIChatProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello, darling. I'm Luna, your LuxeBag stylist. How can I elevate your look today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = [...messages, userMsg];
    const responseText = await getStylingAdvice(history, products);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-black text-white p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-110 transition-transform group"
      >
        <Sparkles size={24} className="group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-medium text-sm tracking-widest uppercase px-2">Ask Luna</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-8 z-50 w-full max-w-[380px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-slide-up">
          <div className="bg-black p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-200 to-white flex items-center justify-center">
                <Sparkles size={16} className="text-black" />
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wider uppercase">Luna Stylist</h3>
                <span className="text-[10px] text-gray-400">Powered by Gemini</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-70 transition-opacity">
              <X size={20} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none shadow-md' 
                      : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm'
                  }`}
                >
                  <div className="prose prose-sm prose-invert max-w-none">
                    {m.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75" />
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-1"
            >
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Find me a travel bag..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-gray-800"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="text-black hover:scale-110 disabled:opacity-30 transition-transform p-2"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default AIChat;
