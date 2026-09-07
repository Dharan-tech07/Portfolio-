import React from 'react';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-obsidian-950 border-t border-obsidian-700/80 py-12 relative text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-obsidian-700/60">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DHARAN</span>
              <span className="text-cyan-400">.B</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              ECE Undergraduate Engineer specializing in Embedded Hardware, Industrial Automation (PLC/SCADA), IoT Telemetry, and Multiphysics Simulation.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-6 flex flex-wrap gap-4 md:justify-end">
            {['hero', 'domains', 'about', 'skills', 'projects', 'dashboard', 'certifications', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(id);
                }}
                className="hover:text-cyan-400 transition-colors uppercase"
              >
                {id}
              </a>
            ))}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Personal Portfolio • Anna University Register No: 711522106013</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with Vite • React • TypeScript • Tailwind CSS • Three.js</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
