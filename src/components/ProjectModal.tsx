import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../types/portfolio';
import { ArchitectureFlow } from './ArchitectureFlow';
import { X, ExternalLink, Github, AlertTriangle, Lightbulb, CheckCircle, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="bg-obsidian-950 border border-obsidian-700/90 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Header */}
        <div className="p-6 border-b border-obsidian-700/80 flex items-start justify-between bg-obsidian-900/60">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                CASE STUDY // PROJECT {project.num}
              </span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
                {project.category}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-100">{project.title}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-obsidian-800 hover:bg-obsidian-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm leading-relaxed">
          {/* Architecture Flow Diagram */}
          {project.architecture && <ArchitectureFlow steps={project.architecture} />}

          {/* Problem & Approach Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-obsidian-900/60 border border-obsidian-700/80 rounded-xl p-4">
              <h3 className="text-amber-400 font-semibold text-xs font-mono uppercase flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4" /> 1. Problem Statement
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{project.problem}</p>
            </div>

            <div className="bg-obsidian-900/60 border border-obsidian-700/80 rounded-xl p-4">
              <h3 className="text-cyan-400 font-semibold text-xs font-mono uppercase flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4" /> 2. Engineering Approach
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{project.approach}</p>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="bg-obsidian-900/60 border border-obsidian-700/80 rounded-xl p-4">
            <h3 className="text-emerald-400 font-semibold text-xs font-mono uppercase flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4" /> 3. Technical Implementation
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{project.implementation}</p>
          </div>

          {/* Key Results */}
          <div className="bg-obsidian-900/60 border border-amber-500/30 rounded-xl p-4 bg-amber-500/5">
            <h3 className="text-amber-400 font-semibold text-xs font-mono uppercase flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" /> 4. Outcome & Key Results
            </h3>
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-medium">{project.result}</p>
          </div>

          {/* Technologies Badges */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technologies & Standards Used:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-mono bg-obsidian-900 border border-obsidian-700 text-cyan-300 rounded-md"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Challenges & Future Scope */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-obsidian-950 border border-obsidian-700/80 p-3.5 rounded-lg">
              <div className="text-xs font-mono text-amber-400 font-semibold mb-1">
                ENGINEERING CHALLENGE:
              </div>
              <p className="text-xs text-slate-400">{project.challenges}</p>
            </div>

            <div className="bg-obsidian-950 border border-obsidian-700/80 p-3.5 rounded-lg">
              <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">
                FUTURE IMPROVEMENTS:
              </div>
              <p className="text-xs text-slate-400">{project.futureScope}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-obsidian-700/80 bg-obsidian-900/80 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-500">
            Verified Case Study • Dharan B Portfolio
          </div>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-obsidian-800 hover:bg-obsidian-700 text-slate-200 border border-obsidian-700 rounded-lg transition-colors"
              >
                <Github className="w-3.5 h-3.5" /> Repository
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 font-bold rounded-lg transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Live Demo
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono bg-obsidian-800 hover:bg-obsidian-700 text-slate-300 rounded-lg"
            >
              Close Case Study
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
