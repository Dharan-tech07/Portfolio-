import React from 'react';
import { motion } from 'framer-motion';
import { PersonalInfo } from '../types/portfolio';
import { User, Cpu, BookOpen, Target, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  personal: PersonalInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ personal }) => {
  return (
    <section id="about" className="py-20 relative bg-obsidian-950/40 border-y border-obsidian-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">02 // ABOUT ME</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Hands-On Engineering & Academic Background
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Developing practical experience across physical computing, industrial control, microcontrollers, and multiphysics simulation.
          </p>
        </div>

        {/* Split Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          
          {/* Left 4 Structured Highlight Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Who I Am */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              className="glass-panel p-6 border-amber-500/40 hover:border-amber-500/70 shadow-[0_0_15px_rgba(245,158,11,0.05)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400">
                    <User className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">Who I Am</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {personal.aboutHighlights.whoIAm}
                </p>
                <div className="text-xs text-slate-400 bg-obsidian-950 p-2.5 rounded-md border border-obsidian-700/80 font-mono">
                  <div>🎓 {personal.degree}</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">{personal.institution}</div>
                  <div className="text-amber-400 text-[10px] mt-0.5">Register No: {personal.registerNo}</div>
                </div>
              </div>
            </motion.div>

            {/* What I Build */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              className="glass-panel p-6 flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">What I Build</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {personal.aboutHighlights.whatIBuild}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-700/60">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-cyan-400 rounded">ESP32 IoT</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-cyan-400 rounded">PLC Ladder</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-cyan-400 rounded">Java / Python</span>
              </div>
            </motion.div>

            {/* What I Am Learning */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              className="glass-panel p-6 flex flex-col justify-between hover:border-violet-500/50 hover:shadow-[0_0_15px_rgba(139,92,246,0.1)] transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-violet-500/10 border border-violet-500/30 rounded-lg text-violet-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">What I Am Learning</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {personal.aboutHighlights.whatIAmLearning}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-700/60">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-violet-400 rounded">COMSOL FEA</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-violet-400 rounded">Siemens TIA</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-violet-400 rounded">Wireless Telemetry</span>
              </div>
            </motion.div>

            {/* What I Want To Work On */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              whileHover={{ y: -5, rotateX: 2, rotateY: -2 }}
              className="glass-panel p-6 flex flex-col justify-between hover:border-emerald-500/50 hover:shadow-[0_0_15px_rgba(16,185,129,0.1)] transition-all"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100">What I Want To Work On</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {personal.aboutHighlights.whatIWantToWorkOn}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-700/60">
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-emerald-400 rounded">Industrial Systems</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-emerald-400 rounded">Embedded Hardware</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-obsidian-900 text-emerald-400 rounded">R&D Roles</span>
              </div>
            </motion.div>

          </div>

          {/* Right Technical Workflow Diagram */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
            }}
            whileHover={{ scale: 1.01 }}
            className="lg:col-span-4 bg-obsidian-900/80 border border-obsidian-700/80 rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/30 transition-all"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400 font-semibold tracking-wider uppercase mb-2">
                ENGINEERING WORKFLOW DISCIPLINE
              </div>
              <h4 className="text-lg font-bold text-slate-100 mb-4">
                Circuit to Cloud Architecture Paradigm
              </h4>

              <div className="space-y-4 font-mono text-xs">
                <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>01. Physical Transducers</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>02. Microcontroller & Firmware</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>03. PLC / SCADA Field Logic</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>

                <div className="bg-obsidian-950 p-3 rounded-lg border border-obsidian-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-violet-400">
                    <span className="w-2 h-2 rounded-full bg-violet-400" />
                    <span>04. Cloud Telemetry & UI</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-obsidian-700/60 text-xs text-slate-400">
              <span className="text-amber-400 font-semibold font-mono">HANDS-ON APPROACH:</span> Understanding system behavior by physically wiring panels, debugging signal noise, and verifying logic on live hardware.
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};
