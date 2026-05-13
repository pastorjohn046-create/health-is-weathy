import { Calendar as CalendarIcon, Clock, MapPin, Video, ChevronRight, Filter, Plus, Search, MoreHorizontal, User } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const appointments = [
  { 
    id: '1', 
    doctor: 'Dr. Sarah Wilson', 
    specialty: 'Cardiology Specialist', 
    date: 'Oct 24, 2026', 
    time: '14:30', 
    status: 'upcoming', 
    type: 'Clinical Visit', 
    location: 'Central Wing, Unit 402',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=150'
  },
  { 
    id: '2', 
    doctor: 'Dr. Michael Chen', 
    specialty: 'Senior Dermatologist', 
    date: 'Oct 25, 2026', 
    time: '10:00', 
    status: 'upcoming', 
    type: 'Video Call', 
    location: 'Secure Virtual Room',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=150'
  },
  { 
    id: '3', 
    doctor: 'Dr. Elena Rossi', 
    specialty: 'General Physician', 
    date: 'Oct 12, 2026', 
    time: '09:15', 
    status: 'completed', 
    type: 'Clinical Visit', 
    location: 'Ground Floor, Unit 105',
    avatar: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=150'
  },
];

export default function Appointments() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-display text-slate-800">
            Medical <span className="text-gradient">Schedule</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2">Manage your professional consultations and health track.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
            <input 
              type="text" 
                placeholder="Search events..." 
                className="pl-9 pr-4 py-2.5 bg-white/40 border border-white/40 rounded-xl text-xs focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 font-bold uppercase tracking-widest w-48"
            />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus size={18} />
            New Appointment
          </button>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Appointments Timeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Upcoming Timeline</h2>
            <button className="text-indigo-600 text-[10px] font-black uppercase tracking-widest hover:underline text-right">Mark all read</button>
          </div>

          <div className="space-y-4">
            {appointments.filter(a => a.status === 'upcoming').map((app, i) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex gap-6"
              >
                {/* Time Indicator */}
                <div className="flex flex-col items-center pt-2">
                  <div className="w-14 h-14 glass-panel rounded-2xl flex flex-col items-center justify-center border-none shadow-indigo-100/10 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <span className="text-[9px] font-black uppercase tracking-tighter opacity-60">OCT</span>
                    <span className="text-xl font-black font-display leading-none">{app.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  <div className="flex-1 w-px bg-indigo-100/30 my-4" />
                </div>

                {/* Event Card */}
                <div className="flex-1 glass-card rounded-[2.5rem] p-6 group-hover:border-indigo-200 transition-all duration-500 flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative shrink-0">
                    <img src={app.avatar} alt={app.doctor} className="w-16 h-16 rounded-[1.25rem] object-cover shadow-md border-2 border-white" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-lg flex items-center justify-center text-white border-2 border-white">
                      {app.type === 'Video Call' ? <Video size={10} /> : <User size={10} />}
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-bold text-slate-800 font-display">{app.doctor}</h3>
                      <span className={cn(
                        "inline-block px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider mx-auto sm:mx-0",
                        app.type === 'Video Call' ? "bg-purple-100 text-purple-600" : "bg-emerald-100 text-emerald-600"
                      )}>
                        {app.type}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{app.specialty}</p>
                    <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <Clock size={14} className="text-indigo-500" />
                        {app.time}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                        <MapPin size={14} className="text-indigo-300" />
                        {app.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {app.type === 'Video Call' ? (
                      <Link 
                        to={`/video-call/${app.id}`}
                        className="flex-1 sm:flex-none bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                      >
                        <Video size={14} />
                        Join Call
                      </Link>
                    ) : (
                      <button className="flex-1 sm:flex-none glass-card border-none hover:bg-white text-indigo-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all">
                        Details
                      </button>
                    )}
                    <button className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-600 p-3.5 rounded-2xl transition-all active:scale-90 flex items-center justify-center">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* mini stats */}
          <section className="glass-panel rounded-[2.5rem] p-6 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Monthly Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/40 rounded-2xl border border-white/50">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                       <CalendarIcon size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Total Bookings</span>
                 </div>
                 <span className="text-sm font-black font-display">12</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/40 rounded-2xl border border-white/50">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
                       <Filter size={16} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Cancellations</span>
                 </div>
                 <span className="text-sm font-black font-display">1</span>
              </div>
            </div>
          </section>

          {/* History / Past */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 px-2">History Log</h3>
            <div className="glass-panel border-white/20 rounded-[2.5rem] overflow-hidden divide-y divide-white/20">
              {appointments.filter(a => a.status === 'completed').map((app) => (
                <div key={app.id} className="p-4 flex items-center justify-between hover:bg-white/40 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <img src={app.avatar} alt={app.doctor} className="w-10 h-10 rounded-xl object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                    <div>
                      <h4 className="font-bold text-[10px] uppercase tracking-tight text-slate-700">{app.doctor}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{app.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-black bg-emerald-100/50 text-emerald-600 px-2 py-0.5 rounded-lg uppercase tracking-widest">Done</span>
                    <MoreHorizontal size={14} className="text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Promo or Info */}
          <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white text-center relative overflow-hidden group shadow-2xl shadow-indigo-100">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CalendarIcon size={140} />
             </div>
             <p className="text-indigo-400 text-[9px] font-black uppercase tracking-[0.3em] mb-2">Sync Account</p>
             <h4 className="text-lg font-bold font-display leading-tight mb-4">Sync your schedule with Google Calendar?</h4>
             <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all active:scale-95 shadow-lg shadow-black/20">
                Connect Now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
