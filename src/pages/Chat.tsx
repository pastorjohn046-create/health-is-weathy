import { useState, useRef, useEffect } from 'react';
import { Send, Phone, Video, Info, MoreVertical, CheckCheck, Paperclip, Smile, Search, X, Mic, MicOff, Video as VideoIcon, VideoOff, Settings, SignalHigh, SignalMedium, SignalLow, PhoneOff } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const contacts = [
  { id: '1', name: 'Dr. Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1559839734-2b71f153671e?auto=format&fit=crop&q=80&w=100', lastMessage: 'The results look normal.', time: '10:30 AM', online: true },
  { id: '2', name: 'Dr. Michael Chen', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=100', lastMessage: 'See you tomorrow at 10.', time: 'Yesterday', online: false },
  { id: '3', name: 'Medi-Bot Support', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=100', lastMessage: 'Your prescription is ready.', time: 'Tue', online: true },
];

const initialMessages = [
  { id: '1', text: 'Hello John, how are you feeling today?', sender: 'doctor', time: '10:00 AM' },
  { id: '2', text: 'I am feeling much better, thank you!', sender: 'user', time: '10:05 AM' },
  { id: '3', text: 'That is great to hear. Have you been taking the prescribed multivitamins?', sender: 'doctor', time: '10:10 AM' },
  { id: '4', text: 'Yes, every morning after breakfast.', sender: 'user', time: '10:15 AM' },
];

type VideoQuality = 'low' | 'medium' | 'high';

export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [videoQuality, setVideoQuality] = useState<VideoQuality>('high');
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isVideoCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isVideoCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMessage]);
    setInput('');
    
    // Fake bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "I'll review that. Anything else bothering you?",
        sender: 'doctor',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 2000);
  };

  return (
    <div className="flex h-full overflow-hidden bg-white/20">
      {/* WhatsApp Style Contacts Sidebar */}
      <aside className={cn(
        "hidden md:flex w-96 flex-col border-r border-white/20 bg-white/30 backdrop-blur-3xl",
        "transition-all duration-300"
      )}>
        <div className="p-4 bg-white/40 border-b border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black font-display text-slate-900 tracking-tight">Chats</h2>
            <div className="flex gap-1">
               <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-xl transition-all"><Smile size={18} /></button>
               <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-xl transition-all"><MoreVertical size={18} /></button>
            </div>
          </div>
          <div className="relative group">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
             <input 
                type="text" 
                placeholder="Search or start new chat" 
                className="w-full pl-10 pr-4 py-2.5 bg-white/40 border border-white/40 rounded-[1.25rem] text-sm focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-400 font-medium" 
             />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={cn(
                "w-full p-4 flex items-center gap-4 transition-all hover:bg-white/40 text-left relative group",
                activeContact.id === contact.id ? "bg-white/60 shadow-inner" : ""
              )}
            >
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                </div>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-sm animate-pulse"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-sm text-slate-900 truncate tracking-tight">{contact.name}</h3>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest shrink-0">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 truncate leading-tight font-medium opacity-80">{contact.lastMessage}</p>
                </div>
              </div>
              {activeContact.id === contact.id && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-indigo-600 rounded-l-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"></div>
              )}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Messaging Interface */}
      <section className="flex-1 flex flex-col bg-slate-900/5 backdrop-blur-md">
        {/* Chat Header - Pro WhatsApp Style */}
        <header className="p-4 bg-white/40 border-b border-white/20 backdrop-blur-xl flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-4">
             <div className="relative">
                <img src={activeContact.avatar} alt={activeContact.name} className="w-11 h-11 rounded-2xl object-cover shadow-md border-2 border-white" />
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm",
                  activeContact.online ? "bg-emerald-500" : "bg-slate-300"
                )}></div>
             </div>
             <div>
                <h3 className="font-bold text-base text-slate-900 font-display tracking-tight leading-none">{activeContact.name}</h3>
                <p className="text-[10px] text-indigo-500 font-black uppercase tracking-[0.2em] mt-2 flex items-center gap-1.5">
                  {activeContact.online ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      Active Now
                    </>
                  ) : (
                    "Last seen today at 09:12"
                  )}
                </p>
             </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-2xl transition-all active:scale-90"><Phone size={20} /></button>
            <button 
              onClick={() => setIsVideoCallActive(true)}
              className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-2xl transition-all active:scale-90"
            >
              <Video size={20} />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block"></div>
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-white/60 rounded-2xl transition-all active:scale-90"><Info size={20} /></button>
          </div>
        </header>

        {/* Messages List - Professional Layout */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat opacity-[0.98]">
          <div className="flex justify-center">
             <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/60 backdrop-blur-md text-slate-400 px-4 py-1.5 rounded-full border border-white/40 shadow-sm">
               Encrypted Chat Session
             </span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => {
              const isUser = msg.sender === 'user';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className={cn(
                    "flex flex-col group max-w-[85%] sm:max-w-[70%]",
                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "p-4 rounded-[2rem] text-sm relative shadow-xl min-w-[120px] transition-all",
                    isUser 
                      ? "bg-indigo-600 text-white rounded-tr-none shadow-indigo-100/30" 
                      : "bg-white/90 text-slate-800 rounded-tl-none border border-white/50 shadow-slate-200/20"
                  )}>
                    <div className="font-medium leading-relaxed">{msg.text}</div>
                    <div className={cn(
                      "flex items-center gap-1.5 mt-2 justify-end opacity-70",
                      isUser ? "text-indigo-100" : "text-slate-400"
                    )}>
                      <span className="text-[10px] font-bold uppercase tracking-tight">{msg.time}</span>
                      {isUser && <CheckCheck size={14} className="text-indigo-200" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Chat Input Area - Normal Professional Interface */}
        <div className="p-4 bg-white/40 border-t border-white/20 backdrop-blur-xl">
           <div className="flex items-center gap-3 bg-white/80 p-2 rounded-[2rem] border border-white shadow-xl shadow-indigo-100/10">
              <div className="flex items-center">
                <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors active:scale-90"><Smile size={22} /></button>
                <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors active:scale-90"><Paperclip size={20} /></button>
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your healthcare query..."
                className="flex-1 bg-transparent text-sm py-2.5 outline-none font-medium placeholder:text-slate-300"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-3.5 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center",
                  input.trim() 
                    ? "bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700" 
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                )}
              >
                <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
              </button>
           </div>
        </div>
      </section>

      {/* Telehealth Video Call Overlay */}
      <AnimatePresence>
        {isVideoCallActive && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-slate-900 flex flex-col"
          >
            {/* Call Header - Updated for cleaner look */}
            <header className="p-6 flex items-center justify-between text-white absolute top-0 left-0 right-0 z-20">
              <div className="flex items-center gap-4 bg-black/20 backdrop-blur-xl p-2 pr-6 rounded-[2rem] border border-white/5">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg">
                   <img src={activeContact.avatar} alt={activeContact.name} className="w-full h-full object-cover" />
                </div>
                <div>
                   <h2 className="font-bold text-lg font-display tracking-tight leading-none">{activeContact.name}</h2>
                   <div className="flex items-center gap-2 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{formatTime(callDuration)}</span>
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className="relative group">
                    <button 
                      onClick={() => setIsQualityMenuOpen(!isQualityMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                    >
                       <Settings size={16} className={cn("text-white/60 transition-transform", isQualityMenuOpen ? "rotate-90" : "")} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/80">{videoQuality}</span>
                       <div className="flex items-center gap-0.5 ml-1">
                          {videoQuality === 'high' && <SignalHigh size={12} className="text-emerald-400" />}
                          {videoQuality === 'medium' && <SignalMedium size={12} className="text-yellow-400" />}
                          {videoQuality === 'low' && <SignalLow size={12} className="text-rose-400" />}
                       </div>
                    </button>
                    
                    <AnimatePresence>
                      {isQualityMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-3 w-48 bg-black/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-2 shadow-2xl z-30"
                        >
                          {(['low', 'medium', 'high'] as VideoQuality[]).map((q) => (
                            <button
                              key={q}
                              onClick={() => {
                                setVideoQuality(q);
                                setIsQualityMenuOpen(false);
                              }}
                              className={cn(
                                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all",
                                videoQuality === q 
                                  ? "bg-indigo-600 text-white" 
                                  : "text-white/60 hover:bg-white/10 hover:text-white"
                              )}
                            >
                              {q} Quality
                              {videoQuality === q && <CheckCheck size={14} />}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                 </div>
              </div>
            </header>

            {/* Video Canvas Container */}
            <div className="flex-1 relative overflow-hidden group bg-slate-950">
               {/* Main Remote Video (Simulated) */}
               <div className="absolute inset-0">
                  <motion.img 
                    key={videoQuality}
                    src={activeContact.avatar.replace('w=100', 'w=1200')} 
                    alt="Doctor" 
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      videoQuality === 'low' ? "blur-xl lg:blur-2xl opacity-80" : videoQuality === 'medium' ? "blur-md" : "blur-0"
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
               </div>

               {/* Local User Video (Small Picture-in-Picture) */}
               <motion.div 
                 drag
                 dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                 initial={{ x: 20, y: 20 }}
                 className="absolute bottom-32 right-8 w-44 sm:w-72 aspect-video bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 z-10 cursor-move touch-none group/pip transition-transform hover:scale-105"
               >
                  <div className="w-full h-full relative">
                    {!isVideoOff ? (
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                          alt="You" 
                          className={cn(
                            "w-full h-full object-cover",
                            videoQuality === 'low' ? "blur-sm" : "blur-0"
                          )}
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                           <VideoOff size={24} className="text-slate-500" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Camera Off</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                       <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-lg text-[9px] font-black uppercase tracking-widest text-white/90 border border-white/10">You</div>
                    </div>
                  </div>
               </motion.div>

               {/* Call Status Overlay (Center) */}
               <AnimatePresence>
                 {videoQuality !== 'high' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-none"
                    >
                      <div className="bg-rose-500/10 backdrop-blur-xl px-6 py-2 rounded-full border border-rose-500/20 flex items-center gap-3">
                         <SignalLow size={14} className="text-rose-500 animate-pulse" />
                         <span className="text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">{videoQuality} Quality Mode</span>
                      </div>
                    </motion.div>
                 )}
               </AnimatePresence>
            </div>

            {/* Call Controls Footer */}
            <footer className="p-10 pb-16 flex items-center justify-center gap-8 text-white absolute bottom-0 left-0 right-0 z-20">
               <button 
                onClick={() => setIsMuted(!isMuted)}
                title={isMuted ? "Unmute" : "Mute"}
                className={cn(
                  "w-16 h-16 rounded-[1.75rem] flex items-center justify-center transition-all active:scale-90 border-2",
                  isMuted ? "bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-900/40" : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                )}
               >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
               </button>

               <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                title={isVideoOff ? "Turn Camera On" : "Turn Camera Off"}
                className={cn(
                  "w-16 h-16 rounded-[1.75rem] flex items-center justify-center transition-all active:scale-90 border-2",
                  isVideoOff ? "bg-rose-600 text-white border-rose-500 shadow-xl shadow-rose-900/40" : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                )}
               >
                  {isVideoOff ? <VideoOff size={24} /> : <VideoIcon size={24} />}
               </button>

               <div className="w-px h-12 bg-white/10" />

               <button 
                onClick={() => setIsVideoCallActive(false)}
                className="w-20 h-20 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-2xl shadow-rose-900/60 hover:bg-rose-700 transition-all active:scale-95 group relative overflow-hidden"
               >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <PhoneOff size={32} />
               </button>
            </footer>

            {/* Connectivity Feedback Toast */}
            {videoQuality === 'low' && (
              <motion.div 
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30"
              >
                <div className="bg-rose-500 text-white px-4 py-2 rounded-2xl flex items-center gap-3 shadow-2xl animate-pulse">
                   <SignalLow size={16} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Weak connection: Adjusted to Low Quality</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
