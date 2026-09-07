import React from 'react';
import { ArchitectureStep } from '../types/portfolio';
import { ChevronRight } from 'lucide-react';

interface ArchitectureFlowProps {
  steps: ArchitectureStep[];
}

export const ArchitectureFlow: React.FC<ArchitectureFlowProps> = ({ steps }) => {
  return (
    <div className="bg-obsidian-950/80 border border-obsidian-700/80 rounded-xl p-4 my-4 shadow-inner">
      <div className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase mb-3 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        System Architecture & Data Flow:
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className={`flex-1 bg-obsidian-900/90 border p-3 rounded-lg flex flex-col justify-between transition-all ${
              idx === steps.length - 1
                ? 'border-amber-500/50 bg-amber-500/5 shadow-[0_0_12px_rgba(245,158,11,0.1)]'
                : 'border-obsidian-700/80 hover:border-cyan-500/40'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-slate-500">STEP {step.step}</span>
                {idx === steps.length - 1 && (
                  <span className="text-[9px] font-mono text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                    OUTPUT
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-slate-100">{step.label}</div>
              <div className="text-[11px] text-slate-400 mt-1">{step.desc}</div>
            </div>

            {idx < steps.length - 1 && (
              <div className="flex items-center justify-center py-1 md:py-0 text-cyan-400/60">
                <ChevronRight className="w-5 h-5 transform rotate-90 md:rotate-0" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
