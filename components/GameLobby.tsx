import React from 'react';
import { TopBar } from './TopBar';
import { SideBanners } from './SideBanners';
import { BottomControls } from './BottomControls';
import { Navigation } from './Navigation';
import { Wifi, BatteryMedium, Signal, Globe, RotateCcw } from 'lucide-react';

export const GameLobby = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black select-none font-sans">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&display=swap');
          .font-orbitron { font-family: 'Orbitron', sans-serif; }
          .clip-path-polygon { clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%); }
          .text-shadow-glow { text-shadow: 0 0 10px rgba(6,182,212,0.8); }
          
          /* Mobile Portrait Mode - Hide main content */
          @media (max-width: 768px) and (orientation: portrait) {
            .mobile-landscape-only {
              display: none;
            }
            .rotation-prompt {
              display: flex;
            }
          }
          
          /* Mobile Landscape Mode - Show main content */
          @media (max-width: 768px) and (orientation: landscape) {
            .mobile-landscape-only {
              display: flex;
            }
            .rotation-prompt {
              display: none;
            }
          }
          
          /* Desktop - Always show main content */
          @media (min-width: 769px) {
            .mobile-landscape-only {
              display: flex;
            }
            .rotation-prompt {
              display: none;
            }
          }
        `}
      </style>

      {/* Mobile Portrait Rotation Prompt */}
      <div className="rotation-prompt hidden absolute inset-0 bg-black items-center justify-center z-50 font-orbitron">
        <div className="flex flex-col items-center gap-8 text-center px-8">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-cyan-500/50 rounded-lg flex items-center justify-center animate-pulse">
              <RotateCcw size={40} className="text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-lg animate-ping" />
          </div>
          
          <div className="flex flex-col gap-4">
            <h2 className="text-cyan-400 text-2xl font-bold tracking-[0.2em] uppercase">
              Rotate Device
            </h2>
            <p className="text-slate-300 text-sm font-mono tracking-wider">
              Please rotate your device to landscape mode<br />
              for the optimal Tech Fest experience
            </p>
          </div>
          
          <div className="flex items-center gap-3 text-cyan-500/60 text-xs font-mono">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>LANDSCAPE MODE REQUIRED</span>
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Game Lobby Content */}
      <div className="mobile-landscape-only flex-col w-full h-full">
        {/* Main Background - Space Portal Video */}
        <div className="absolute inset-0 z-0">
          <video 
            src="/blue.mp4" 
            className="w-full h-full object-cover opacity-60"
            autoPlay
            muted
            loop
            playsInline
          />
          {/* Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-radial-gradient-vignette opacity-80 pointer-events-none" />
        </div>

        {/* UI Layers */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <TopBar />
          
          {/* Middle section */}
          <div className="flex-1 relative pt-16 pb-32">
             <SideBanners />
             
             {/* Center Tech Graphic / Holo Emitter - Repositioned */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[400px] h-[400px] max-w-[60vw] max-h-[60vh] border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite] flex items-center justify-center opacity-30">
                   <div className="w-[320px] h-[320px] max-w-[48vw] max-h-[48vh] border border-cyan-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse] flex items-center justify-center">
                      <div className="w-[240px] h-[240px] max-w-[36vw] max-h-[36vh] border border-cyan-500/30 rounded-full animate-pulse flex items-center justify-center">
                         <div className="text-cyan-500/50 font-orbitron font-bold text-xs md:text-sm tracking-[0.3em] uppercase text-center">
                            Tech Fest 2025
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="relative">
             <BottomControls />
             <Navigation />
             
             {/* Status Bar */}
             <div className="absolute bottom-1 left-4 flex items-center gap-4 text-cyan-500/60 text-[9px] z-30 font-mono tracking-widest uppercase">
                <div className="flex items-center gap-1.5">
                   <Globe size={10} className="text-cyan-500" />
                   <span className="hidden sm:inline">Server: US-East-1</span>
                   <span className="sm:hidden">US-E1</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <Signal size={10} className="text-cyan-500" />
                   <span>12ms</span>
                </div>
                <span className="bg-cyan-900/20 border border-cyan-500/20 px-1.5 py-0.5 rounded text-[8px] text-cyan-400">SECURE</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
