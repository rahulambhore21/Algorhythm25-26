import React from 'react';
import { ChevronUp, Radio } from 'lucide-react';

export const Navigation = () => {
  const navItems = ['SECTORS', 'PROTOCOLS', 'ALLIANCE', 'ARCHIVES'];

  return (
    <div className="absolute bottom-0 right-0 left-0 px-6 py-3 flex justify-between items-end z-20 pointer-events-none font-orbitron">
       {/* News Feed - Repositioned */}
       <div className="flex flex-col items-start gap-2 pointer-events-auto mb-2">
          <div className="bg-black/80 backdrop-blur-md rounded-sm px-3 py-1.5 flex items-center gap-2 border-l-2 border-cyan-500 w-[350px] shadow-lg">
             <div className="bg-cyan-500/20 px-1 py-0.5 rounded text-cyan-400">
                <Radio size={12} className="animate-pulse" />
             </div>
             <span className="text-cyan-500 text-[9px] uppercase font-bold tracking-wider">Live</span>
             <span className="text-slate-200 text-[10px] truncate flex-1 font-mono">Hackathon registrations closing in T-Minus 2 hours...</span>
          </div>
       </div>

       {/* Bottom Right Nav */}
       <div className="flex items-end gap-2 pointer-events-auto bg-gradient-to-t from-slate-900/80 to-transparent p-4 pb-1 border-b border-white/10">
          {navItems.map((item, idx) => (
            <div key={item} className="flex flex-col items-center gap-1 group cursor-pointer w-24">
               <div className="w-full h-8 flex items-center justify-center border border-transparent group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 rounded-sm transition-all duration-300 relative overflow-hidden">
                  <span className="text-slate-400 text-[11px] font-bold tracking-[0.15em] group-hover:text-cyan-400 transition-all z-10">{item}</span>
                  <div className="absolute inset-0 bg-cyan-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
               </div>
               
               {/* Indicator */}
               <div className={`h-0.5 w-full bg-slate-700 transition-all duration-300 ${idx === 0 ? 'bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]' : 'group-hover:bg-cyan-500'}`} />
            </div>
          ))}
          
          <div className="ml-6 w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-cyan-500/20 rounded-sm transition-colors border border-slate-700 hover:border-cyan-500 group">
             <ChevronUp size={20} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
          </div>
       </div>
    </div>
  );
};
