import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ChevronRight, Activity, ShieldCheck, ArrowLeft, User, Phone } from 'lucide-react';

export default function SignUp({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate signup
    onAuthSuccess();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-indigo-200 blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-blue-100 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 mb-8 transition-colors group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>

        <div className="glass-panel p-8 sm:p-10 rounded-[3rem] shadow-2xl shadow-indigo-100/30 border-white/40">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-200 mb-4">
               <Activity size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 font-display tracking-tight">Create Account</h1>
            <p className="text-slate-500 text-sm font-medium mt-2">Join Nexus Health to manage your healthcare journey professionaly.</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/40 border border-white/40 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-300 font-medium"
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Create Account
                <ChevronRight size={18} />
              </button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-white/20 text-center">
            <p className="text-slate-500 text-xs font-medium">
              Already have an account? {' '}
              <Link to="/login" className="text-indigo-600 font-black uppercase tracking-widest hover:underline">Secure Login</Link>
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              Data Privacy Ensured
           </div>
           <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
              <Lock size={14} />
              Secure Authentication
           </div>
        </div>
      </motion.div>
    </div>
  );
}
