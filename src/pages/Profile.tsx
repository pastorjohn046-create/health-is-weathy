import { User, Shield, CreditCard, Bell, LogOut, ChevronRight, FileText, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const sections = [
  { icon: User, label: 'Personal Information', sub: 'Details about you and your contact points' },
  { icon: Shield, label: 'Insurance & Privacy', sub: 'Manage your policy and data sharing' },
  { icon: CreditCard, label: 'Payment Methods', sub: 'Manage cards and billing history' },
  { icon: Bell, label: 'Notifications', sub: 'Customize how you hear from us' },
  { icon: FileText, label: 'Medical Records', sub: 'Access your health history and reports' },
];

export default function Profile({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate();

  const handleSignOutClick = () => {
    onSignOut();
    navigate('/login');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative group">
           <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl shadow-blue-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200" 
                alt="Profile" 
                className="w-full h-full object-cover rounded-[2.3rem]" 
              />
           </div>
           <button className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-2xl border-4 border-white shadow-lg hover:scale-110 transition-transform">
             <Activity size={18} />
           </button>
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight font-display">John Doe</h1>
          <p className="text-slate-500 text-sm font-medium">Patient ID: #PP-8829</p>
          <div className="flex items-center justify-center gap-2 mt-2">
             <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Pro Member</span>
             <span className="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-center">A+ Positive</span>
          </div>
        </div>
      </header>

      <section className="grid sm:grid-cols-2 gap-4">
         <div className="glass-card p-6 rounded-3xl text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Savings</p>
            <p className="text-2xl font-black text-indigo-600 tracking-tight font-display">$428.50</p>
         </div>
         <div className="glass-card p-6 rounded-3xl text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Health Score</p>
            <p className="text-2xl font-black text-emerald-600 tracking-tight font-display">92 / 100</p>
         </div>
      </section>

      <section className="glass-panel border-white/20 rounded-[2.5rem] overflow-hidden shadow-xl shadow-indigo-100/10">
        <div className="divide-y divide-white/20">
          {sections.map((section, i) => (
            <motion.button
              key={section.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="w-full p-5 flex items-center gap-4 hover:bg-white/40 transition-all text-left group"
            >
              <div className="w-12 h-12 bg-white/60 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm border border-white/50">
                <section.icon size={22} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 leading-none text-sm uppercase tracking-tight">{section.label}</h3>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">{section.sub}</p>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </motion.button>
          ))}
          
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sections.length * 0.05 }}
            onClick={handleSignOutClick}
            className="w-full p-5 flex items-center gap-4 hover:bg-rose-50 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm border border-rose-100">
              <LogOut size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-rose-600 leading-none text-sm uppercase tracking-tight">Sign Out</h3>
              <p className="text-[11px] text-rose-400 mt-1 font-medium">Clear session and exit</p>
            </div>
            <ChevronRight size={18} className="text-rose-300" />
          </motion.button>
        </div>
      </section>

      <footer className="pt-8">
         <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">PulsePoint v1.0.0 • Privacy Policy • Terms</p>
      </footer>
    </div>
  );
}
