import { useState } from 'react';
import { Activity, Thermometer, Brain, Zap, Plus, X, Heart, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const symptoms = [
  { id: 'headache', label: 'Headache', icon: Brain, color: 'text-purple-500', bg: 'bg-purple-100' },
  { id: 'fever', label: 'Fever', icon: Thermometer, color: 'text-orange-500', bg: 'bg-orange-100' },
  { id: 'fatigue', label: 'Fatigue', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100' },
  { id: 'cough', label: 'Cough', icon: Wind, color: 'text-blue-500', bg: 'bg-blue-100' },
  { id: 'heart', label: 'Palpitations', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-100' },
];

export default function SymptomTracker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [isLogging, setIsLogging] = useState(false);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleLog = () => {
    setIsLogging(true);
    setTimeout(() => {
      setIsLogging(false);
      setSelectedSymptoms([]);
    }, 1500);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-3 font-display text-slate-800">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Activity size={20} />
          </div>
          Symptom Tracker
        </h2>
      </div>

      <div className="glass-card rounded-[2.5rem] p-8 border-rose-100 relative overflow-hidden">
        {/* Abstract Background Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-wrap gap-4">
            {symptoms.map((symptom) => {
              const isSelected = selectedSymptoms.includes(symptom.id);
              const Icon = symptom.icon;
              return (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-[2rem] min-w-[100px] transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-white border-rose-200 shadow-xl shadow-rose-100/50 scale-105' 
                      : 'bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isSelected ? symptom.bg : 'bg-slate-100'} ${isSelected ? symptom.color : 'text-slate-400'} transition-colors`}>
                    <Icon size={24} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-slate-800' : 'text-slate-400'}`}>
                    {symptom.label}
                  </span>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-white border-2 border-white"
                    >
                      <X size={10} />
                    </motion.div>
                  )}
                </button>
              );
            })}
            <button className="flex flex-col items-center gap-3 p-4 rounded-[2rem] min-w-[100px] bg-slate-50/50 border border-dashed border-slate-200 hover:border-indigo-300 transition-all group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white text-slate-400 group-hover:text-indigo-600 transition-colors">
                <Plus size={24} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-600">Other</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <p className="text-slate-500 text-xs font-medium">
              {selectedSymptoms.length > 0 
                ? `${selectedSymptoms.length} symptom${selectedSymptoms.length > 1 ? 's' : ''} selected`
                : 'No symptoms selected today'}
            </p>
            <button
              disabled={selectedSymptoms.length === 0 || isLogging}
              onClick={handleLog}
              className={`px-8 py-3.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all relative overflow-hidden ${
                selectedSymptoms.length > 0 
                  ? 'bg-rose-600 text-white shadow-xl shadow-rose-200 hover:bg-rose-700 active:scale-95' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <AnimatePresence mode="wait">
                {isLogging ? (
                  <motion.span
                    key="logging"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    Logging...
                  </motion.span>
                ) : (
                  <motion.span
                    key="log"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                  >
                    Log Symptoms
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
