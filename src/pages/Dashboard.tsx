import { Activity, Thermometer, Droplets, Heart, Calendar, Plus, ArrowRight, TrendingUp, Pill, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import SymptomTracker from '../components/SymptomTracker';

const stats = [
  { label: 'Heart Rate', value: '72 bpm', trend: '+2% from yesterday', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100/50', border: 'border-rose-200' },
  { label: 'Temperature', value: '36.6 °C', trend: 'Normal range', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-100/50', border: 'border-orange-200' },
  { label: 'Hydration', value: '80%', trend: '+5% from yesterday', icon: Droplets, color: 'text-sky-500', bg: 'bg-sky-100/50', border: 'border-sky-200' },
  { label: 'Activity', value: '8.4k steps', trend: 'Goal: 10k steps', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-100/50', border: 'border-emerald-200' },
];

const appointments = [
  { doctor: 'Dr. Sarah Wilson', type: 'Cardiologist', time: 'Today, 2:30 PM', avatar: 'https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=100' },
  { doctor: 'Dr. Michael Chen', type: 'Dermatologist', time: 'Tomorrow, 10:00 AM', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100' },
];

const medications = [
  { name: 'Vitamin D3', dosage: '2000 IU', time: '8:00 AM', taken: true },
  { name: 'Omega 3', dosage: '1000 mg', time: '1:00 PM', taken: false },
  { name: 'Magnesium', dosage: '400 mg', time: '8:00 PM', taken: false },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-display text-slate-800">
            Good morning, <span className="text-gradient">John</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Here's a summary of your health and schedule today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/appointments" className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-indigo-200 transition-all hover:scale-105 active:scale-95">
            <Plus size={20} />
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Vitals Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
            className={`glass-card p-6 rounded-[2rem] border ${stat.border} relative overflow-hidden group`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity transform group-hover:scale-150 duration-500">
              <stat.icon size={80} className={stat.color} />
            </div>
            <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
              <stat.icon size={28} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-black mt-2 tracking-tight text-slate-800">{stat.value}</p>
            <div className="flex items-center gap-1 mt-4 text-[11px] font-bold text-slate-400">
              <TrendingUp size={12} className={stat.color} />
              <span>{stat.trend}</span>
            </div>
          </motion.div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Appointments */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3 font-display text-slate-800">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Calendar size={20} />
                </div>
                Upcoming Consultations
              </h2>
              <Link to="/appointments" className="text-indigo-600 text-xs font-bold hover:text-indigo-700 flex items-center gap-1 group uppercase tracking-widest transition-colors bg-white/50 px-4 py-2 rounded-xl border border-white/60">
                View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-4">
              {appointments.map((app, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={app.doctor} 
                  className="glass-card p-5 rounded-[2rem] flex items-center gap-5 group hover:border-indigo-200"
                >
                <img src={app.avatar} alt={app.doctor} className="w-16 h-16 rounded-2xl object-cover shadow-md group-hover:scale-105 transition-transform" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors tracking-tight text-slate-800">{app.doctor}</h3>
                  <p className="text-slate-500 text-sm font-medium">{app.type}</p>
                  <div className="inline-flex items-center gap-1.5 mt-2 bg-indigo-50 px-3 py-1 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.1em]">{app.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pr-2">
                  <Link to="/chat" className="p-3.5 bg-white text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm hover:shadow-lg hover:shadow-indigo-200">
                    <Activity size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Medications */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-3 font-display text-slate-800">
              <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600">
                <Pill size={20} />
              </div>
              Medications
            </h2>
          </div>
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            {medications.map((med, i) => (
              <div key={med.name} className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-white/60 hover:bg-white/80 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${med.taken ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                    {med.taken && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">{med.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{med.dosage} • {med.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Symptom Tracker */}
        <SymptomTracker />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Nutrition Progress */}
          <section className="space-y-4">
             <h2 className="text-xl font-bold font-display">Nutrition</h2>
             <div className="glass-panel p-6 rounded-[2rem] space-y-6">
                {[
                  { label: 'Calories', current: 1250, goal: 2000, unit: 'kcal', color: 'bg-indigo-500' },
                  { label: 'Protein', current: 45, goal: 80, unit: 'g', color: 'bg-rose-500' },
                  { label: 'Water', current: 1.8, goal: 3, unit: 'L', color: 'bg-sky-500' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                      <span className="text-xs font-bold text-slate-700">{item.current} / {item.goal} <span className="text-[9px] text-slate-400">{item.unit}</span></span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.current / item.goal) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Health Tip */}
          <section className="space-y-4">
           <h2 className="text-xl font-bold font-display">Health Tips</h2>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl shadow-indigo-900/20">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                 <Activity size={160} />
               </div>
               <div className="relative z-10">
                 <div className="inline-block bg-indigo-500/20 px-3 py-1 rounded-lg mb-4 backdrop-blur-md border border-indigo-400/30">
                   <p className="text-indigo-300 font-bold text-[10px] uppercase tracking-[0.2em]">Daily Insight</p>
                 </div>
                 <h3 className="text-2xl font-bold leading-tight mb-4 font-display">Drinking water first thing in the morning can boost your metabolism.</h3>
                 <p className="text-slate-300 text-sm leading-relaxed mb-8 font-medium">Stay hydrated and keep your energy levels consistent throughout the day for optimal performance.</p>
                 <button className="w-full bg-white text-slate-900 px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all active:scale-95 shadow-xl shadow-black/20">
                   Read Full Article
                 </button>
               </div>
            </div>
        </section>

        {/* Quick Access Records */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display">Recent Records</h2>
          <div className="glass-panel p-4 rounded-[2rem] space-y-3">
             <div className="flex items-center gap-3 p-3 bg-white/40 rounded-2xl border border-white/50 group cursor-pointer hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                   <FileText size={20} />
                </div>
                <div className="flex-1">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-700">Blood Test</p>
                   <p className="text-[9px] text-slate-400 font-bold">Oct 15, 2026</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
             </div>
             <Link to="/records" className="block text-center text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] py-2 hover:underline">
                View All Records
             </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
