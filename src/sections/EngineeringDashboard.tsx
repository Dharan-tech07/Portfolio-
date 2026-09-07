import React from 'react';
import { PortfolioData } from '../types/portfolio';
import { Activity, ShieldCheck, Cpu, Award, Zap, ChevronRight } from 'lucide-react';

interface EngineeringDashboardProps {
  data: PortfolioData;
  onNavigate: (sectionId: string) => void;
}

export const EngineeringDashboard: React.FC<EngineeringDashboardProps> = ({ data, onNavigate }) => {
  return (
    <section id="dashboard" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="section-eyebrow">05 // CONTROL DASHBOARD</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Engineering Profile Telemetry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Miniature engineering control dashboard summarizing verified metrics, domain interconnects, active hardware nodes, and credentials.
          </p>
        </div>

        {/* Control Room Panel Frame */}
        <div className="bg-obsidian-950 border border-obsidian-700/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8 relative overflow-hidden">
          
          {/* Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-obsidian-700/80">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]" />
              <span className="text-xs font-mono font-bold text-slate-200 tracking-wider">
                CONTROL ROOM // SYSTEM STATUS: ALL NODES OPERATIONAL
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              <Activity className="w-3.5 h-3.5" />
              <span>Real-Time Telemetry Dashboard</span>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-obsidian-900/90 border border-obsidian-700/80 p-4 rounded-xl">
              <div className="text-[10px] font-mono text-slate-500 uppercase">TECHNICAL DOMAINS</div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-1">08</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Core ECE Areas</div>
            </div>

            <div className="bg-obsidian-900/90 border border-obsidian-700/80 p-4 rounded-xl">
              <div className="text-[10px] font-mono text-slate-500 uppercase">FEATURED CASE STUDIES</div>
              <div className="text-3xl font-extrabold font-mono text-amber-400 mt-1">04</div>
              <div className="text-[11px] text-slate-400 mt-0.5">IoT / PLC / FEA</div>
            </div>

            <div className="bg-obsidian-900/90 border border-obsidian-700/80 p-4 rounded-xl">
              <div className="text-[10px] font-mono text-slate-500 uppercase">AUTHENTICATED CERTS</div>
              <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-1">04</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Verified Records</div>
            </div>

            <div className="bg-obsidian-900/90 border border-obsidian-700/80 p-4 rounded-xl">
              <div className="text-[10px] font-mono text-slate-500 uppercase">NPTEL SCORE</div>
              <div className="text-3xl font-extrabold font-mono text-violet-400 mt-1">72%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">4 IIT Credits</div>
            </div>
          </div>

          {/* System Interconnection Flow Matrix */}
          <div className="bg-obsidian-900/60 border border-obsidian-700/80 p-5 rounded-xl">
            <div className="text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase mb-3 flex items-center justify-between">
              <span>SYSTEM DOMAIN INTERCONNECTIONS MATRIX</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 text-slate-300">
                <span className="text-cyan-400 font-bold block mb-1">01. HARDWARE LAYER</span>
                Sensors • Relays • ESP32 • Control Panels
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 text-slate-300">
                <span className="text-amber-400 font-bold block mb-1">02. AUTOMATION LOGIC</span>
                Siemens TIA Portal • Ladder Logic • VFD Drives
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 text-slate-300">
                <span className="text-emerald-400 font-bold block mb-1">03. TELEMETRY & CLOUD</span>
                Wi-Fi MQTT • Python Ingestion • Dashboards
              </div>
              <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700 text-slate-300">
                <span className="text-violet-400 font-bold block mb-1">04. MULTIPHYSICS R&D</span>
                COMSOL Electromagnetics • MATLAB
              </div>
            </div>
          </div>

          {/* Verified Credentials Quick Digest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-obsidian-900/60 border border-obsidian-700/80 p-4 rounded-xl">
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-3 flex items-center justify-between">
                <span>INTERNSHIPS & FIELD TRAINING</span>
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="space-y-2">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="p-2.5 bg-obsidian-950 rounded-lg border border-obsidian-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-200">{exp.role}</div>
                      <div className="text-[10px] text-slate-400">{exp.company}</div>
                    </div>
                    <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                      Ref: {exp.refId}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-obsidian-900/60 border border-obsidian-700/80 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-amber-400 font-semibold mb-3 flex items-center justify-between">
                  <span>SYSTEM SUMMARY</span>
                  <Award className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Dharan B's portfolio integrates physical electronics, Siemens industrial automation PLC workflows, low-power IoT telemetry loops, and COMSOL multiphysics modeling into a cohesive engineering record.
                </p>
              </div>

              <button
                onClick={() => onNavigate('projects')}
                className="mt-4 flex items-center justify-center gap-2 py-2 text-xs font-mono bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 rounded-lg transition-colors"
              >
                <span>Inspect Active System Case Studies</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
