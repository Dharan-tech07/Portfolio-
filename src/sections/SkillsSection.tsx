import React, { useState } from 'react';
import { SkillCategory } from '../types/portfolio';
import { Zap, Cpu, Cog, Code, Wifi, Activity, Layout, Terminal, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  categories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ categories }) => {
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Cog': return <Cog className="w-4 h-4 text-amber-400" />;
      case 'Code': return <Code className="w-4 h-4 text-violet-400" />;
      case 'Wifi': return <Wifi className="w-4 h-4 text-cyan-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-emerald-400" />;
      case 'Layout': return <Layout className="w-4 h-4 text-cyan-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      default: return <Zap className="w-4 h-4 text-cyan-400" />;
    }
  };

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'Strong Foundation':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/40 font-semibold';
      case 'Practical Exposure':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 font-semibold';
      case 'Project Experience':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
      case 'Working Knowledge':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Currently Learning':
        return 'bg-violet-500/10 text-violet-400 border-violet-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const filteredCategories = selectedCat === 'all'
    ? categories
    : categories.filter(c => c.code === selectedCat);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10">
          <div className="section-eyebrow">03 // SKILLS MATRIX</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Technical Competencies & Standards
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Categorized technical competencies grounded in practical field internship exposure, embedded hardware projects, and academic coursework.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all ${
              selectedCat === 'all'
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.2)] font-bold'
                : 'bg-obsidian-900 text-slate-400 border-obsidian-700/80 hover:text-slate-200'
            }`}
          >
            All Categories ({categories.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.code}
              onClick={() => setSelectedCat(cat.code)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-all flex items-center gap-1.5 ${
                selectedCat === cat.code
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 shadow-[0_0_12px_rgba(245,158,11,0.2)] font-bold'
                  : 'bg-obsidian-900 text-slate-400 border-obsidian-700/80 hover:text-slate-200'
              }`}
            >
              <span>{cat.code}.</span>
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.code}
              className="glass-panel p-6 flex flex-col justify-between hover:border-cyan-500/40 transition-all"
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-obsidian-700/80">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-obsidian-900 border border-obsidian-700/80 rounded-lg">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{cat.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{cat.code}</span>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {cat.skills.map((s, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-2.5 bg-obsidian-950/60 border border-obsidian-800/80 rounded-lg hover:border-obsidian-700 transition-colors"
                    >
                      <div className="text-xs font-medium text-slate-200 flex items-center justify-between mb-1.5">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{s.name}</span>
                        </span>
                      </div>
                      <div className="flex justify-end">
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono border rounded ${getLevelBadgeStyle(
                            s.level
                          )}`}
                        >
                          {s.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category Footer */}
              <div className="pt-4 mt-4 border-t border-obsidian-700/60 text-[10px] font-mono text-slate-500 flex justify-between">
                <span>{cat.skills.length} Competencies</span>
                <span className="text-cyan-400">Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
