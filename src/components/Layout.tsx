import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, ShoppingBag, Calendar, User, Search, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const navItems = [
  { path: '/', icon: Home, label: 'Dashboard' },
  { path: '/chat', icon: MessageSquare, label: 'Messages' },
  { path: '/pharmacy', icon: ShoppingBag, label: 'Pharmacy' },
  { path: '/appointments', icon: Calendar, label: 'Schedule' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden relative bg-slate-50">
      {/* Premium Animated Background Mesh */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Container Wrapper */}
      <div className="relative flex h-screen lg:p-4 overflow-hidden z-10">
        {/* Desktop Sidebar */}
        <aside className="w-[280px] glass-panel border-r-0 lg:rounded-[2rem] lg:mr-4 hidden lg:flex flex-col z-50 shadow-2xl shadow-indigo-100/50">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 ring-1 ring-white/50">
                <span className="font-bold text-2xl font-display">P</span>
              </div>
              <span className="font-bold text-2xl tracking-tight font-display text-slate-800">PulsePoint</span>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isActive 
                      ? "bg-white text-indigo-600 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
                      : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-transparent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={22} className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", isActive ? "text-indigo-600" : "text-slate-400")} />
                  <span className="relative z-10 font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 mt-auto">
             <div className="relative bg-gradient-to-br from-indigo-900 to-violet-900 rounded-[2rem] p-6 text-white overflow-hidden shadow-xl shadow-indigo-900/20">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-2">Emergency</p>
                  <p className="text-base font-display font-medium mb-4 leading-tight">Need immediate assistance?</p>
                  <button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 text-sm font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
                    Call Now
                  </button>
                </div>
             </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col glass-panel lg:rounded-[2rem] overflow-hidden relative shadow-2xl shadow-slate-200/50 border-white/60">
          {/* Header */}
          {location.pathname !== '/chat' && (
            <header className="h-20 border-b border-white/40 flex items-center justify-between px-8 bg-white/40 backdrop-blur-xl sticky top-0 z-40 transition-all">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md w-full hidden md:block">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search for doctors, medications, or health tips..." 
                    className="w-full pl-12 pr-4 py-3 bg-white/60 border border-white/60 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 transition-all outline-none placeholder:text-slate-400 shadow-sm hover:bg-white/80"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-white/80 rounded-full relative transition-all shadow-sm bg-white/40">
                  <Bell size={20} />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
                </button>
                <div className="flex items-center gap-4 pl-6 border-l border-slate-200/60">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold leading-none text-slate-800">John Doe</p>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1.5">Premium Member</p>
                  </div>
                  <div className="w-12 h-12 rounded-full ring-4 ring-white shadow-md overflow-hidden bg-slate-100 cursor-pointer hover:scale-105 transition-transform">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className={cn(
            "flex-1",
            location.pathname === '/chat' ? "overflow-hidden p-0 pb-16 lg:pb-0" : "overflow-y-auto p-6 md:p-8 pb-24 lg:pb-8"
          )}>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 1.02 }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className={cn(location.pathname === '/chat' ? "h-full" : "min-h-full")}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/60 backdrop-blur-xl border-t border-white/30 lg:hidden flex items-center justify-around px-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors",
                isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-xl transition-all",
                isActive && "bg-white/80 shadow-sm border border-white/50"
              )}>
                <Icon size={20} />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.1em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
