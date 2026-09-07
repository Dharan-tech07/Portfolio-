import React from 'react';
import { JourneyStage } from '../types/portfolio';
import { Compass, CheckCircle2 } from 'lucide-react';

interface JourneySectionProps {
  journey: JourneyStage[];
}

export const JourneySection: React.FC<JourneySectionProps> = ({ journey }) => {
  return (
    <section id="journey" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">09 // ENGINEERING ROADMAP</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            My Engineering Journey
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Interactive timeline tracking key milestones in my progression from circuit fundamentals to industrial automation and intelligent systems.
          </p>
        </div>

        {/* Journey Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {journey.map((item, idx) => (
            <div
              key={item.stage}
              className="glass-panel p-6 relative flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-obsidian-700/80">
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/30">
                    STAGE {item.stage}
                  </span>
                  <Compass className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-1">
                  {item.title}
                </h3>

                <div className="text-xs font-mono text-amber-400/90 mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-obsidian-700/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Milestone
                </span>
                <span>Stage {idx + 1} of {journey.length}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
