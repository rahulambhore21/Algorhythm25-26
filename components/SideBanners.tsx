import React from 'react';
import { ChevronRight, Code, Bot, ShieldAlert, Gamepad2 } from 'lucide-react';

export const SideBanners = () => {
  const events = [
    { name: 'HACKATHON', icon: Code, color: 'text-blue-400', border: 'border-blue-500', bg: 'from-blue-900/80', desc: 'Code The Future' },
    { name: 'ROBOTICS', icon: Bot, color: 'text-yellow-400', border: 'border-yellow-500', bg: 'from-yellow-900/80', desc: 'Mech Assembly' },
    { name: 'CYBERWAR', icon: ShieldAlert, color: 'text-red-400', border: 'border-red-500', bg: 'from-red-900/80', desc: 'Capture The Flag' },
    { name: 'GAMING', icon: Gamepad2, color: 'text-green-400', border: 'border-green-500', bg: 'from-green-900/80', desc: 'Esports Arena' },
  ];

  return (
    <div className="absolute top-20 right-0 flex flex-col items-end gap-3 z-20 w-80 pointer-events-none font-orbitron">
      <div className="flex flex-col gap-2 pointer-events-auto w-full items-end pr-4">
        
        {events.map((event, index) => (
          <div key={event.name} className={`w-56 h-14 bg-gradient-to-r ${event.bg} to-black/80 rounded-l-sm relative overflow-hidden shadow-lg cursor-pointer hover:w-64 transition-all duration-300 origin-right border-r-4 ${event.border} group`}>
             <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
             <div className="relative z-10 p-2.5 pl-4 text-white flex items-center justify-between h-full">
               <div className="flex items-center gap-2.5">
                 <event.icon size={20} className={`${event.color} drop-shadow-[0_0_5px_currentColor]`} />
                 <div className="flex flex-col">
                    <span className={`font-bold text-sm italic uppercase leading-none tracking-wider ${event.color} drop-shadow-md`}>{event.name}</span>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest">{event.desc}</span>
                 </div>
               </div>
               <ChevronRight size={14} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
             </div>
          </div>
        ))}

        {/* Live Stream - Repositioned */}
        <div className="mt-6 w-full flex justify-end pr-4">
           <div className="w-20 h-20 border border-cyan-500/30 bg-black/40 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center relative group cursor-pointer hover:border-cyan-400 transition-colors">
              <div className="absolute inset-0 bg-cyan-500/5 animate-pulse rounded-lg" />
              <div className="w-10 h-10 bg-cyan-900/20 rounded-full flex items-center justify-center border border-cyan-500/50 mb-1 group-hover:scale-110 transition-transform">
                 <span className="text-cyan-400 font-bold text-[10px]">LIVE</span>
              </div>
              <span className="text-[8px] text-cyan-500 uppercase tracking-widest">Stream</span>
           </div>
        </div>

      </div>
    </div>
  );
};
