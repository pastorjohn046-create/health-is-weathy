import { FileText, Download, Search, Plus, Filter, MoreVertical, Calendar, User, Tag } from 'lucide-react';
import { motion } from 'motion/react';

const records = [
  {
    id: '1',
    title: 'Annual Blood Test Results',
    date: 'Oct 15, 2026',
    doctor: 'Dr. Sarah Wilson',
    type: 'Lab Result',
    size: '1.2 MB',
    status: 'Verified'
  },
  {
    id: '2',
    title: 'Cardiology Consultation Report',
    date: 'Oct 10, 2026',
    doctor: 'Dr. Michael Chen',
    type: 'Report',
    size: '2.4 MB',
    status: 'Verified'
  },
  {
    id: '3',
    title: 'Amoxicillin Prescription',
    date: 'Sep 28, 2026',
    doctor: 'Dr. Elena Rossi',
    type: 'Prescription',
    size: '0.5 MB',
    status: 'Expired'
  },
  {
    id: '4',
    title: 'MRI Brain Scan',
    date: 'Sep 15, 2026',
    doctor: 'Dr. James Miller',
    type: 'Lab Result',
    size: '15.8 MB',
    status: 'Verified'
  }
];

const categories = ['All Records', 'Lab Results', 'Prescriptions', 'Reports', 'Imaging'];

export default function HealthRecords() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight font-display text-slate-800">
            Health <span className="text-gradient">Records</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-2">Access and manage your digital medical documents securely.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
            <Plus size={18} />
            Upload Document
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Documents', value: '24', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Recent Uploads', value: '3', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Review', value: '1', icon: Filter, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 rounded-[2rem] flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800 font-display">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="space-y-6">
        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  i === 0 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white/60 text-slate-500 hover:bg-white border border-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group min-w-[240px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
            <input
              type="text"
              placeholder="Search records..."
              className="w-full pl-11 pr-4 py-3 bg-white/60 border border-white/60 rounded-2xl text-xs focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder:text-slate-400 font-bold uppercase tracking-widest"
            />
          </div>
        </div>

        {/* Records List */}
        <div className="grid gap-4">
          {records.map((record, i) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-200 transition-all duration-500"
            >
              {/* File Icon */}
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                <FileText size={32} />
              </div>

              {/* Record Info */}
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800 font-display group-hover:text-indigo-600 transition-colors">{record.title}</h3>
                  <span className={`inline-block px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider mx-auto md:mx-0 ${
                    record.type === 'Lab Result' ? 'bg-indigo-100 text-indigo-600' :
                    record.type === 'Prescription' ? 'bg-emerald-100 text-emerald-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {record.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <Calendar size={14} className="text-indigo-500" />
                    {record.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <User size={14} className="text-slate-300" />
                    {record.doctor}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                    <Tag size={14} className="text-slate-300" />
                    {record.size}
                  </div>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-center flex-1 md:flex-none ${
                  record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                  {record.status}
                </div>
                <button className="p-3.5 bg-white text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all border border-indigo-100 shadow-sm hover:shadow-lg hover:shadow-indigo-200">
                  <Download size={20} />
                </button>
                <button className="p-3.5 text-slate-400 hover:text-slate-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
