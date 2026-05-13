import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, 
  Settings, Users, Maximize, Shield, Monitor, MoreVertical 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function VideoCall() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: '1', text: "Hello John, I'm reviewing your latest blood test results. Everything looks normal overall.", sender: 'doctor', time: '10:15 AM' }
  ]);
  const [callTime, setCallTime] = useState(0);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 2000);
    const interval = setInterval(() => {
      if (!isConnecting) setCallTime(prev => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isConnecting]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    navigate('/appointments');
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: chatInput,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setChatInput('');

    // Simulate doctor typing
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I'll make a note of that in your records. Anything else you'd like to discuss during this call?",
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-hidden text-white font-sans">
      <AnimatePresence>
        {isConnecting && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[110] bg-slate-900 flex flex-col items-center justify-center space-y-6"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=200" 
                className="absolute inset-2 w-20 h-20 rounded-full object-cover"
                alt="Doctor"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold font-display">Connecting with Dr. Wilson...</h2>
              <p className="text-slate-400 mt-2">Securing clinical video channel</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <header className="p-6 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent absolute top-0 left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="font-bold text-lg font-display tracking-tight">Telehealth Consultation</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live • {formatTime(callTime)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 backdrop-blur-md">
            <Users size={20} />
          </button>
          <button className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10 backdrop-blur-md">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Video Feed */}
      <main className="flex-1 relative flex items-center justify-center p-4">
        <div className="w-full h-full max-w-6xl max-h-[80vh] rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl relative border border-white/10">
          {/* Main Feed: Doctor */}
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover"
            alt="Doctor Feed"
          />
          
          <div className="absolute bottom-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10">
             <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-indigo-500">
               <img src="https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
             </div>
             <span className="font-bold text-sm">Dr. Sarah Wilson</span>
          </div>

          {/* User PIP Feed */}
          <motion.div 
            drag
            dragConstraints={{ left: -500, right: 0, top: 0, bottom: 400 }}
            className="absolute top-8 right-8 w-48 h-64 bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 cursor-move"
          >
            {isCameraOff ? (
              <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <VideoOff size={40} className="text-slate-600" />
              </div>
            ) : (
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                className="w-full h-full object-cover"
                alt="User Feed"
              />
            )}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
               {isMuted && <MicOff size={12} className="text-rose-500" />}
               <span className="text-[10px] font-bold bg-black/40 px-2 py-1 rounded-lg backdrop-blur-md">You</span>
            </div>
          </motion.div>

          {/* Floating UI Elements */}
          <div className="absolute top-8 left-8 flex flex-col gap-3">
             <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-500/30 backdrop-blur-md flex items-center gap-2">
                <Shield size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
             </div>
          </div>
        </div>
      </main>

      {/* Control Bar */}
      <footer className="h-28 flex items-center justify-center gap-4 px-8 pb-4">
        <div className="bg-slate-900/80 backdrop-blur-2xl px-8 py-4 rounded-[2.5rem] flex items-center gap-6 border border-white/10 shadow-2xl">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn(
              "p-4 rounded-2xl transition-all active:scale-95",
              isMuted ? "bg-rose-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          
          <button 
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={cn(
              "p-4 rounded-2xl transition-all active:scale-95",
              isCameraOff ? "bg-rose-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            {isCameraOff ? <VideoOff size={24} /> : <Video size={24} />}
          </button>

          <button className="p-4 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all active:scale-95">
            <Monitor size={24} />
          </button>

          <div className="w-px h-8 bg-white/10 mx-2" />

          <button 
            onClick={() => setShowChat(!showChat)}
            className={cn(
              "p-4 rounded-2xl transition-all active:scale-95 relative",
              showChat ? "bg-indigo-600 text-white" : "bg-white/10 text-white hover:bg-white/20"
            )}
          >
            <MessageSquare size={24} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-400 rounded-full ring-2 ring-slate-900" />
          </button>

          <button className="p-4 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all active:scale-95">
            <Maximize size={24} />
          </button>

          <button 
            onClick={handleEndCall}
            className="p-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl transition-all active:scale-95 shadow-xl shadow-rose-900/40"
          >
            <PhoneOff size={24} />
          </button>

          <button className="p-4 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all active:scale-95">
            <MoreVertical size={24} />
          </button>
        </div>
      </footer>

      {/* Side Panels (Chat/Participants) */}
      <AnimatePresence>
        {showChat && (
          <motion.aside 
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            className="absolute top-6 right-6 bottom-32 w-96 bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex flex-col shadow-2xl z-30"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-bold text-lg font-display">Session Chat</h3>
              <button onClick={() => setShowChat(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all text-slate-400">
                <Maximize size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex flex-col gap-2", msg.sender === 'user' ? "items-end" : "items-start")}>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {msg.sender === 'user' ? 'You' : 'Dr. Sarah Wilson'} • {msg.time}
                  </span>
                  <div className={cn(
                    "p-4 rounded-2xl max-w-[85%] border shadow-lg",
                    msg.sender === 'user' ? "bg-indigo-600 border-indigo-500 text-white rounded-tr-none" : "bg-slate-800 border-white/5 text-white rounded-tl-none"
                  )}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex flex-col items-start gap-2">
                   <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1">
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                   </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-white/10">
                 <input 
                  type="text" 
                  placeholder="Type a message..." 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-transparent border-none outline-none px-3 text-sm placeholder:text-slate-500 text-white"
                 />
                 <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                  className="bg-indigo-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-900/20 disabled:opacity-50"
                 >
                   <MessageSquare size={18} />
                 </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
