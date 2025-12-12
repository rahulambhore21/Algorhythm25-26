import React from 'react';
import { Power, UploadCloud, Activity } from 'lucide-react';
import { Button } from "../ui/button";

export const BottomControls = () => {
  return (
    <div className="absolute bottom-24 left-6 flex items-end gap-6 z-25 pointer-events-auto font-orbitron">
      
      {/* Secondary Actions */}
      <div className="flex flex-col gap-2">
         {/* System Status */}
         <div className="bg-black/80 backdrop-blur-md rounded-sm border-l-2 border-green-500 w-44 p-2 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors group">
            <div className="flex flex-col">
               <span className="text-[9px] text-green-500 uppercase tracking-widest font-bold">System Status</span>
               <span className="text-white text-[11px] font-mono">ALL SYSTEMS GO</span>
            </div>
            <Activity size={14} className="text-green-500 group-hover:animate-pulse" />
         </div>

         {/* Deploy Project */}
         <div className="bg-black/80 backdrop-blur-md rounded-sm border-l-2 border-cyan-500 w-52 h-14 relative overflow-hidden group cursor-pointer hover:bg-white/5 transition-colors shadow-lg">
             <div className="absolute inset-0 bg-cyan-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
             <div className="relative z-10 h-full flex items-center px-3 justify-between">
                <div className="flex flex-col">
                   <span className="text-cyan-400 font-bold text-xs tracking-widest uppercase">Deploy Project</span>
                   <span className="text-[9px] text-slate-400">Upload to Mainframe</span>
                </div>
                <UploadCloud size={18} className="text-cyan-400" />
             </div>
         </div>
      </div>

      {/* Main Action: Initialize */}
      <div className="relative group cursor-pointer ml-6">
         {/* Glow effects */}
         <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
         
         <div className="w-60 h-20 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-sm shadow-[0_0_20px_rgba(234,179,8,0.3)] flex items-center justify-center relative active:scale-95 transition-transform clip-path-polygon border-t border-yellow-300">
             <div className="flex flex-col items-center">
                <span className="text-black font-black text-2xl tracking-[0.2em] drop-shadow-sm uppercase">Initialize</span>
                <span className="text-yellow-900 text-[9px] font-bold tracking-[0.5em] uppercase">Tech Fest 2025</span>
             </div>
             
             {/* Tech accents */}
             <div className="absolute top-1 right-1 w-2 h-2 bg-black/30" />
             <div className="absolute bottom-1 left-1 w-2 h-2 bg-black/30" />
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black/20" />
             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-black/20" />
         </div>
         
         {/* Connector lines */}
         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-yellow-500/50" />
         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-yellow-500/50" />
      </div>

    </div>
  );
};
