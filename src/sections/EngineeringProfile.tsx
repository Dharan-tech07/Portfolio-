import React, { useState } from 'react';
import { DomainItem } from '../types/portfolio';
import { Cpu, Cog, Wifi, Zap, Sliders, Code, Activity, Brain, ChevronDown } from 'lucide-react';

interface EngineeringProfileProps {
  domains: DomainItem[];
}

export const EngineeringProfile: React.FC<EngineeringProfileProps> = ({ domains }) => {
  const [activeDomain, setActiveDomain] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Cog': return <Cog className="w-5 h-5 text-amber-400" />;
      case 'Wifi': return <Wifi className="w-5 h-5 text-cyan-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Sliders': return <Sliders className="w-5 h-5 text-emerald-400" />;
      case 'Code': return <Code className="w-5 h-5 text-violet-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-cyan-400" />;
      case 'Brain': return <Brain className="w-5 h-5 text-amber-400" />;
      default: return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="domains" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">01 // ENGINEERING DOMAINS</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Technical Expertise & Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Interactive overview of core domains spanning embedded hardware, industrial automation, IoT, software logic, and multiphysics simulation.
          </p>
        </div>

        {/* Domains Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {domains.map((dom) => {
            const isExpanded = activeDomain === dom.id;
            return (
              <div
                key={dom.id}
                onClick={() => setActiveDomain(isExpanded ? null : dom.id)}
                className={`glass-panel p-6 cursor-pointer flex flex-col justify-between group transition-all duration-300 ${
                  isExpanded ? 'glass-panel-gold border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.15)]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-obsidian-900/80 border border-obsidian-700/80 rounded-xl group-hover:border-cyan-500/40 transition-colors">
                      {getIcon(dom.icon)}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 group-hover:text-amber-400 transition-colors">
                      <span>{isExpanded ? 'Collapse' : 'Details'}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${isExpanded ? 'rotate-180 text-amber-400' : ''}`} />
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                    {dom.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {dom.description}
                  </p>

                  {/* Expanded Detail Box */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-obsidian-700/80 text-xs text-slate-300 leading-relaxed animate-fade-in bg-obsidian-950/50 p-3 rounded-lg mb-4">
                      {dom.details}
                    </div>
                  )}
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-obsidian-700/60">
                  {dom.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 border border-obsidian-700/80 text-cyan-400/90 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
