import React from 'react';
import { Terminal, Users, Shield, Cpu } from 'lucide-react';
import { Button } from "../ui/button";

export const TopBar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-30 pointer-events-none font-orbitron">
      {/* Top Left: Operator Profile */}
      <div className="flex items-center gap-4 pointer-events-auto">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="w-12 h-12 rounded-sm border border-cyan-500/50 bg-black/80 shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Operator" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-cyan-900/90 text-[8px] font-bold px-1 py-0.5 rounded-sm text-cyan-200 border border-cyan-500/50">
              LVL 42
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-cyan-500 text-[9px] font-bold tracking-[0.2em] uppercase mb-0.5">Operator ID</span>
            <span className="text-white font-bold text-sm tracking-widest text-shadow-glow group-hover:text-cyan-200 transition-colors">SKYWALKER</span>
            <div className="h-0.5 w-24 bg-slate-800 rounded-sm mt-1 overflow-hidden border border-slate-700">
              <div className="h-full bg-cyan-500 w-[65%] shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
            </div>
          </div>
        </div>
        
        {/* Squadron Inline */}
        <div className="flex items-center gap-2 ml-4">
           <Button variant="ghost" className="h-7 bg-black/40 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-200 text-[10px] px-2 rounded-sm font-mono tracking-wider">
             INVITE SQUAD
           </Button>
           <div className="flex -space-x-1">
              {[1, 2].map((i) => (
                 <div key={i} className="w-7 h-7 rounded-sm bg-slate-900 border border-slate-700 flex items-center justify-center relative z-0 hover:z-10 transition-all hover:scale-110 cursor-pointer">
                    <Users size={12} className="text-slate-500" />
                 </div>
              ))}
           </div>
        </div>
      </div>

      {/* Top Right: System Status */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm border-l-2 border-cyan-500 px-3 py-1.5 skew-x-[-10deg]">
           <div className="skew-x-[10deg] flex flex-col items-end">
              <span className="text-[9px] text-cyan-500 uppercase tracking-widest">System</span>
              <span className="text-white font-mono font-bold text-xs">98.4%</span>
           </div>
           <Cpu size={16} className="text-cyan-400 skew-x-[10deg] ml-1 animate-pulse" />
        </div>
        
        <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm border-l-2 border-yellow-500 px-3 py-1.5 skew-x-[-10deg]">
           <div className="skew-x-[10deg] flex flex-col items-end">
              <span className="text-[9px] text-yellow-500 uppercase tracking-widest">Security</span>
              <span className="text-white font-mono font-bold text-xs">SECURE</span>
           </div>
           <Shield size={16} className="text-yellow-400 skew-x-[10deg] ml-1" />
        </div>
      </div>
    </div>
  );
};
