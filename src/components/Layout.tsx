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
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-hidden">
      {/* Background Mesh Orbs */}
      <div className="fixed -top-20 -left-20 h-96 w-96 rounded-full bg-blue-300 opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300 opacity-20 blur-[100px] pointer-events-none"></div>

      {/* Main Container Wrapper */}
      <div className="relative flex h-screen lg:p-4 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 glass-panel border-r-0 lg:rounded-3xl lg:mr-4 hidden lg:flex flex-col z-50">
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <span className="font-bold text-xl font-display">P</span>
              </div>
              <span className="font-bold text-xl tracking-tight font-display text-slate-900">PulsePoint</span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-white/60 text-indigo-600 font-semibold shadow-sm border border-white/50" 
                      : "text-slate-500 hover:bg-white/30 hover:text-slate-900"
                  )}
                >
                  <Icon size={20} className={cn("transition-transform group-hover:scale-110", isActive ? "text-indigo-600" : "text-slate-400")} />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/20">
             <div className="bg-indigo-600/10 border border-indigo-200/30 rounded-2xl p-4">
                <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-wider mb-2">Emergency Hub</p>
                <p className="text-sm font-bold mb-3 text-slate-800">Need immediate help?</p>
                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-2 rounded-lg transition-colors shadow-md shadow-indigo-100">
                  CALL NOW
                </button>
             </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col glass-panel lg:rounded-3xl overflow-hidden relative">
          {/* Header */}
          {location.pathname !== '/chat' && (
            <header className="h-16 border-b border-white/20 flex items-center justify-between px-6 bg-white/20 backdrop-blur-md sticky top-0 z-40">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md w-full hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                  <input 
                    type="text" 
                    placeholder="Search medications, doctors..." 
                    className="w-full pl-10 pr-4 py-2 bg-white/40 border border-white/40 rounded-full text-sm focus:ring-2 focus:ring-indigo-400 transition-all outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:bg-white/40 rounded-full relative transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
                <div className="flex items-center gap-3 pl-4 border-l border-white/20">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold leading-none text-slate-900">John Doe</p>
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">Gold Member</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden bg-white/50">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100" alt="Avatar" className="w-full h-full object-cover" />
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
