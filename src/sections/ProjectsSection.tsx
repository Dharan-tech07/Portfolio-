import React, { useState, useMemo } from 'react';
import { ProjectItem } from '../types/portfolio';
import { ArchitectureFlow } from '../components/ArchitectureFlow';
import { ArrowRight, Layers, Cpu, CheckCircle } from 'lucide-react';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (proj: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterOptions = ['All', 'Embedded', 'IoT', 'Automation', 'Simulation'];

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter(
      (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
    );
  }, [activeFilter, projects]);

  return (
    <section id="projects" className="py-20 relative bg-obsidian-950/40 border-y border-obsidian-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="section-eyebrow">04 // PROJECTS & CASE STUDIES</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-2">
              In-depth case studies structured around Problem → Engineering Approach → Implementation → Key Results.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2 bg-obsidian-900/80 p-1.5 rounded-xl border border-obsidian-700/80">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveFilter(opt)}
                className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-all ${
                  activeFilter === opt
                    ? 'bg-cyan-500 text-obsidian-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-800'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel p-6 flex flex-col justify-between group hover:border-amber-500/50 transition-all duration-300 shadow-lg"
            >
              <div>
                {/* Project Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                    PROJECT {proj.num}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-mono border rounded-full ${
                    proj.isLearning
                      ? 'bg-violet-500/10 text-violet-400 border-violet-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium'
                  }`}>
                    {proj.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors mb-2">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {proj.shortDesc}
                </p>

                {/* Architecture Flow Diagram Preview */}
                {proj.architecture && <ArchitectureFlow steps={proj.architecture} />}

                {/* Key Result Highlight Box */}
                <div className="bg-obsidian-950/80 p-3 rounded-lg border border-obsidian-800 text-xs text-slate-300 my-4">
                  <span className="text-amber-400 font-semibold font-mono">OUTCOME: </span>
                  <span>{proj.result}</span>
                </div>
              </div>

              {/* Technologies & CTA */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-obsidian-700/60">
                  {proj.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 border border-obsidian-700/80 text-cyan-400 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono font-bold bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/60 rounded-xl transition-all group-hover:bg-cyan-500 group-hover:text-obsidian-950"
                >
                  <span>View Complete Case Study</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
