import React from 'react';
import { PersonalInfo } from '../types/portfolio';
import { GraduationCap, Award, BookOpen, Layers } from 'lucide-react';

interface EducationSectionProps {
  personal: PersonalInfo;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ personal }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">07 // ACADEMIC BACKGROUND</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Education & Academic Timeline
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Degree coursework in Electronics and Communication Engineering at Anna University affiliated institution.
          </p>
        </div>

        {/* Education Card & Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Degree Card */}
          <div className="lg:col-span-8 glass-panel p-8 border-amber-500/40 hover:border-amber-500/70 shadow-2xl relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider block mb-1">
                  ACADEMIC TIMELINE // {personal.academicYears}
                </span>
                <h3 className="text-2xl font-bold text-slate-100">{personal.degree}</h3>
                <div className="text-sm font-semibold text-cyan-400 mt-1">
                  {personal.institution}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {personal.affiliation} • Location: {personal.location}
                </div>
              </div>
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-obsidian-700/80">
              <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                <div className="text-[10px] font-mono text-slate-500 uppercase">UNIVERSITY REGISTER NO</div>
                <div className="text-base font-mono font-bold text-amber-400 mt-0.5">{personal.registerNo}</div>
              </div>

              <div className="bg-obsidian-950 p-4 rounded-xl border border-obsidian-800">
                <div className="text-[10px] font-mono text-slate-500 uppercase">ACADEMIC CREDENTIALS</div>
                <div className="text-base font-mono font-bold text-cyan-400 mt-0.5">4 NPTEL IIT Credits</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Core Academic Domains & Subjects:
              </div>
              <div className="flex flex-wrap gap-2">
                {['Digital Electronics', 'Signals & Systems', 'Microcontrollers & Embedded', 'Control Systems', 'Communication Engineering', 'Electromagnetic Fields'].map((sub, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs font-mono bg-obsidian-900 border border-obsidian-700/80 text-slate-300 rounded-lg">
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ECE Focus Visualization */}
          <div className="lg:col-span-4 bg-obsidian-900/80 border border-obsidian-700/80 rounded-2xl p-6 space-y-4">
            <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-1">
              ECE ENGINEERING SPECIALIZATIONS
            </div>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 flex items-center justify-between">
                <span className="text-slate-300">Embedded Microcontrollers</span>
                <span className="text-amber-400 font-bold">ESP32 / C++</span>
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 flex items-center justify-between">
                <span className="text-slate-300">Industrial Automation</span>
                <span className="text-cyan-400 font-bold">PLC / Siemens</span>
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 flex items-center justify-between">
                <span className="text-slate-300">Multiphysics Simulation</span>
                <span className="text-violet-400 font-bold">COMSOL FEA</span>
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 flex items-center justify-between">
                <span className="text-slate-300">IoT Telemetry</span>
                <span className="text-emerald-400 font-bold">Sensors / Web</span>
              </div>
            </div>

            <div className="pt-4 border-t border-obsidian-700/60 text-xs text-slate-400">
              Structured engineering curriculum paired with practical physical system building.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
