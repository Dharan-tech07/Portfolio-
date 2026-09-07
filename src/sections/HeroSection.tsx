import React from 'react';
import { PersonalInfo } from '../types/portfolio';
import { Hero3DVisualizer } from '../components/Hero3DVisualizer';
import { ArrowRight, FileText, Send, Award, Layers } from 'lucide-react';

interface HeroSectionProps {
  personal: PersonalInfo;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ personal, onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-obsidian-900/90 border border-obsidian-700/80 text-xs font-mono text-slate-300 backdrop-blur-md">
              <span className="pulse-indicator" />
              <span>{personal.statusText}</span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100">
                Dharan <span className="gradient-text">B</span>
              </h1>
              <div className="text-lg sm:text-2xl font-semibold text-cyan-400 font-mono mt-2 tracking-wide">
                {personal.headline}
              </div>
            </div>

            {/* Subtitle / Department Info */}
            <div className="text-sm font-mono text-slate-400 border-l-2 border-amber-500/80 pl-4 py-1">
              <div>{personal.degree}</div>
              <div className="text-slate-500 text-xs mt-0.5">{personal.institution} ({personal.affiliation})</div>
            </div>

            {/* Bio Paragraph */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              {personal.bio}
            </p>

            {/* CTA Buttons Grid */}
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('projects')}
                className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('domains')}
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono font-medium bg-obsidian-900/90 hover:bg-obsidian-800 text-slate-200 border border-obsidian-700 hover:border-cyan-500/50 rounded-xl transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Engineering Profile</span>
              </button>

              <button
                onClick={() => onNavigate('certifications')}
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono font-medium bg-obsidian-900/90 hover:bg-obsidian-800 text-amber-400 border border-amber-500/40 hover:border-amber-500/70 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.1)]"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Certifications</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-mono font-medium bg-obsidian-900/90 hover:bg-obsidian-800 text-slate-300 border border-obsidian-700 hover:border-slate-500 rounded-xl transition-all"
              >
                <Send className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-6 border-t border-obsidian-700/60 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-xl font-bold font-mono text-cyan-400">B.E. ECE</div>
                <div className="text-[11px] font-mono text-slate-500">Degree Program</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-amber-400">72% NPTEL</div>
                <div className="text-[11px] font-mono text-slate-500">IoT Certification</div>
              </div>
              <div>
                <div className="text-xl font-bold font-mono text-emerald-400">Siemens TIA</div>
                <div className="text-[11px] font-mono text-slate-500">PLC Field Exposure</div>
              </div>
            </div>

          </div>

          {/* Right 3D Visualizer Column */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <Hero3DVisualizer />
          </div>

        </div>
      </div>
    </section>
  );
};
