import { Activity, Thermometer, Droplets, Heart, Calendar, Plus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Heart Rate', value: '72 bpm', icon: Heart, color: 'text-red-500', bg: 'bg-red-50' },
  { label: 'Temp', value: '36.6 °C', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-50' },
  { label: 'Hydration', value: '80%', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'Activity', value: '8.4k steps', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-50' },
];

const appointments = [
  { doctor: 'Dr. Sarah Wilson', type: 'Cardiologist', time: 'Today, 2:30 PM', avatar: 'https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=100' },
  { doctor: 'Dr. Michael Chen', type: 'Dermatologist', time: 'Tomorrow, 10:00 AM', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-6xl">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-display">Good morning, John</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your health today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/appointments" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95">
            <Plus size={20} />
            Book Appointment
          </Link>
        </div>
      </header>

      {/* Vitals Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-3xl"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-black mt-1 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Appointments */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2 font-display">
              <Calendar className="text-indigo-600" size={24} />
              Upcoming
            </h2>
            <Link to="/appointments" className="text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1 group uppercase tracking-widest">
              View all <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid gap-4">
            {appointments.map((app) => (
              <div key={app.doctor} className="glass-card p-4 rounded-3xl flex items-center gap-4 group">
                <img src={app.avatar} alt={app.doctor} className="w-16 h-16 rounded-2xl object-cover shadow-sm" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{app.doctor}</h3>
                  <p className="text-slate-500 text-xs font-medium">{app.type}</p>
                  <p className="text-indigo-600 text-[10px] font-black mt-1 uppercase tracking-[0.2em]">{app.time}</p>
                </div>
                <div className="flex items-center gap-2 pr-2">
                  <Link to="/chat" className="p-3 bg-white/60 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-white/40 shadow-sm">
                    <Activity size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Health Tip */}
        <section className="space-y-4">
           <h2 className="text-xl font-bold font-display">Health Tips</h2>
           <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity size={120} />
              </div>
              <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">Did you know?</p>
              <h3 className="text-xl font-bold leading-tight mb-4 font-display">Drinking water first thing in the morning can boost your metabolism by 25%.</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 font-medium">Stay hydrated and keep your energy levels consistent throughout the day.</p>
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-black/20">
                Learn More
              </button>
           </div>
        </section>
      </div>
    </div>
  );
}
