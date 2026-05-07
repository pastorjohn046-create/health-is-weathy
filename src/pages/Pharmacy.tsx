import { useState } from 'react';
import { ShoppingCart, Search, Star, Plus, Tag, Zap, Heart, Truck, ShieldCheck, ChevronRight, Pill, Baby, Apple, HeartPulse, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const drugs = [
  { id: '1', name: 'Paracetamol 500mg', price: 12.99, originalPrice: 15.00, category: 'Pain Relief', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200', prescription: false, official: true, discount: 15 },
  { id: '2', name: 'Amoxicillin 250mg', price: 24.50, originalPrice: 30.00, category: 'Antibiotics', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1471864190281-a93a307246de?auto=format&fit=crop&q=80&w=200', prescription: true, official: true, discount: 18 },
  { id: '3', name: 'Vitamin C + Zinc', price: 18.20, originalPrice: 22.00, category: 'Supplements', rating: 4.7, reviews: 256, image: 'https://images.unsplash.com/photo-1626442654988-9710cc889f4b?auto=format&fit=crop&q=80&w=200', prescription: false, official: false, discount: 17 },
  { id: '4', name: 'Omeprazole 20mg', price: 15.75, category: 'Stomach', rating: 4.6, reviews: 54, image: 'https://images.unsplash.com/photo-1550572017-ed2302ca12e1?auto=format&fit=crop&q=80&w=200', prescription: true, official: true },
  { id: '5', name: 'Ibuprofen 400mg', price: 9.99, originalPrice: 12.00, category: 'Pain Relief', rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=200', prescription: false, official: false, discount: 16 },
  { id: '6', name: 'Loratadine 10mg', price: 14.30, category: 'Allergy', rating: 4.9, reviews: 77, image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?auto=format&fit=crop&q=80&w=200', prescription: false, official: true },
];

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Pain Relief', icon: Pill },
  { name: 'Supplements', icon: Apple },
  { name: 'Antibiotics', icon: ShieldCheck },
  { name: 'Stomach', icon: HeartPulse },
  { name: 'Baby Care', icon: Baby },
];

export default function Pharmacy() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{id: string, qty: number}[]>([]);

  const filteredDrugs = drugs.filter(drug => {
    const matchesCategory = activeCategory === 'All' || drug.category === activeCategory;
    const matchesSearch = drug.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (id: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const drug = drugs.find(d => d.id === item.id);
    return acc + (drug?.price || 0) * item.qty;
  }, 0);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Search and Cart Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search for drugs, supplements, and more..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/60 glass-panel border-white/40 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none shadow-sm"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none relative p-3 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest active:scale-95">
            <ShoppingCart size={20} />
            <span className="md:hidden">Cart</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Icons Row */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={cn(
              "flex flex-col items-center gap-2 p-3 min-w-[80px] transition-all rounded-2xl group",
              activeCategory === cat.name ? "bg-white/60 shadow-sm" : "hover:bg-white/30"
            )}
          >
            <div className={cn(
               "w-12 h-12 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110",
               activeCategory === cat.name ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "bg-white/40 text-slate-500"
            )}>
               <cat.icon size={24} strokeWidth={1.5} />
            </div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-widest text-center",
              activeCategory === cat.name ? "text-indigo-600" : "text-slate-400"
            )}>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Jumia Style Sale Banner */}
      <section className="relative rounded-[2.5rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-900"></div>
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="white" />
          </svg>
        </div>
        
        <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1 text-center md:text-left space-y-4">
              <div className="inline-flex items-center gap-2 bg-indigo-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                 <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Flash Sale • Up to 20% Off</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white font-display leading-[0.9] tracking-tighter">
                BOOST YOUR <br />
                IMMUNITY TODAY
              </h2>
              <p className="text-indigo-50 font-medium text-sm max-w-sm opacity-90">
                Premium medical supplies & vitamins delivered within 24 hours. Safe, Fast, Professional.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                 <button className="bg-white text-indigo-700 px-8 py-4 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-900/20 hover:scale-105 transition-all">
                   Shop Now
                 </button>
                 <div className="flex items-center gap-2 text-white/80">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                       <Truck size={18} />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest">Free Delivery over $50</span>
                 </div>
              </div>
           </div>
           
           <div className="w-full md:w-[320px] aspect-square rounded-[3rem] bg-white/20 backdrop-blur-2xl p-4 border border-white/30 hidden md:block group-hover:scale-105 transition-transform duration-700">
             <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-white to-indigo-50 p-8 flex items-center justify-center relative overflow-hidden">
                <Tag size={120} className="text-indigo-500/10 absolute -top-10 -right-10 rotate-12" />
                <img 
                  src="https://images.unsplash.com/photo-1626442654988-9710cc889f4b?auto=format&fit=crop&q=80&w=400" 
                  alt="Supplement" 
                  className="w-full h-full object-contain relative z-10"
                />
             </div>
           </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black text-slate-900 font-display uppercase tracking-tight">Today's Deals</h3>
            <div className="hidden sm:flex items-center gap-1.5 bg-rose-500 text-white px-2.5 py-1 rounded-lg">
               <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
               <span className="text-[9px] font-black uppercase tracking-widest line-clamp-1">Ending Soon</span>
            </div>
          </div>
          <button className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1 hover:gap-2 transition-all">
            See All <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredDrugs.map((drug, i) => (
              <motion.div
                layout
                key={drug.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-[2rem] p-2 sm:p-3 flex flex-col h-full group hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 relative"
              >
                {drug.discount && (
                  <div className="absolute top-2 right-2 z-10 bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-lg">
                    -{drug.discount}%
                  </div>
                )}
                
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/30 mb-3 group">
                  <img src={drug.image} alt={drug.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <button className="absolute bottom-2 right-2 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:text-white">
                    <Heart size={14} />
                  </button>
                </div>

                <div className="flex-1 px-1">
                   {drug.official && (
                      <div className="flex items-center gap-1 mb-1">
                         <span className="text-[7px] font-black uppercase tracking-widest bg-slate-900 text-white px-1.5 py-0.5 rounded-sm">Official Store</span>
                      </div>
                   )}
                  <h3 className="font-bold text-xs mb-1 line-clamp-2 min-h-[2rem] group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{drug.name}</h3>
                  
                  <div className="flex flex-col mb-2">
                    <p className="text-sm font-black text-slate-900">${drug.price}</p>
                    {drug.originalPrice && (
                      <p className="text-[10px] text-slate-400 line-through">${drug.originalPrice}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex items-center justify-between">
                       <div className="flex items-center gap-0.5">
                          <Star size={10} className="fill-amber-500 text-amber-500" />
                          <span className="text-[9px] font-black text-slate-700">{drug.rating}</span>
                          <span className="text-[9px] text-slate-400">({drug.reviews})</span>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCart(drug.id)}
                      className="w-full bg-indigo-600 hover:bg-slate-900 text-white py-2 rounded-xl transition-all active:scale-95 shadow-lg shadow-indigo-100 font-black text-[9px] uppercase tracking-widest"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
