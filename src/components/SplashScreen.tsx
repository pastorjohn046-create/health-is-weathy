import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] aspect-square rounded-full bg-indigo-50 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [180, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-blue-50 blur-[120px]" 
        />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.16, 1, 0.3, 1],
            scale: { type: "spring", damping: 15 }
          }}
          className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 mb-8 relative group"
        >
          <motion.div
            animate={{ 
              boxShadow: ["0 0 0px rgba(79,70,229,0.4)", "0 0 40px rgba(79,70,229,0.2)", "0 0 0px rgba(79,70,229,0.4)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-[2.5rem]"
          />
          <Activity size={48} strokeWidth={2.5} />
        </motion.div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl font-black text-slate-900 font-display tracking-tighter"
          >
            Nexus Health
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm font-black uppercase tracking-[0.4em] text-indigo-500/60"
          >
            Advanced Healthcare
          </motion.p>
        </div>

        {/* Loading Indicator */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1.5, ease: "circOut" }}
          className="h-1 bg-slate-100 rounded-full mt-12 overflow-hidden relative"
        >
          <motion.div 
            animate={{ x: [-120, 120] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-indigo-600 w-1/2 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"
          />
        </motion.div>
      </div>

      {/* Trust Badge at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 flex items-center gap-6"
      >
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">HIPAA Compliant</div>
        <div className="w-1 h-1 bg-slate-300 rounded-full" />
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Network</div>
      </motion.div>
    </motion.div>
  );
}
