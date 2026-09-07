import React from 'react';
import { ExploringNode } from '../types/portfolio';
import { Sparkles, ArrowUpRight } from 'lucide-react';

interface ExploringSectionProps {
  nodes: ExploringNode[];
}

export const ExploringSection: React.FC<ExploringSectionProps> = ({ nodes }) => {
  return (
    <section id="exploring" className="py-20 relative bg-obsidian-950/40 border-y border-obsidian-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">10 // ACTIVE LEARNING NODES</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Currently Exploring & Experimenting
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Active technical domains currently being studied, modeled in simulation, or prototyped in the lab.
          </p>
        </div>

        {/* Exploring Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="glass-panel p-6 flex flex-col justify-between hover:border-violet-500/50 transition-all duration-300 group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-violet-400 font-semibold tracking-wider">
                    NODE {node.num}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-violet-500/10 text-violet-400 border border-violet-500/30 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>{node.tag}</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-violet-400 transition-colors mb-2">
                  {node.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {node.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-obsidian-700/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Active Research Phase</span>
                <ArrowUpRight className="w-4 h-4 text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
