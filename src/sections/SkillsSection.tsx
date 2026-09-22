import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SkillCategory } from '../types/portfolio';
import { Zap, Cpu, Cog, Code, Wifi, Activity, Layout, Terminal } from 'lucide-react';
import { 
  SiArduino, SiEspressif, SiSiemens, SiJavascript, 
  SiHtml5, SiCplusplus
} from 'react-icons/si';
import { 
  FaJava, FaPython, FaReact, FaGitAlt, FaGithub, FaPlug, FaMicrochip, FaCss3Alt 
} from 'react-icons/fa';
import { VscCircuitBoard, VscTerminalCmd } from "react-icons/vsc";
import { TbWaveSine, TbTopologyStarRing } from "react-icons/tb";

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

  const getSkillLogo = (skillName: string) => {
    const s = skillName.toLowerCase();
    if (s.includes('java') && !s.includes('script')) return <FaJava className="w-5 h-5 text-red-500" />;
    if (s.includes('python')) return <FaPython className="w-5 h-5 text-blue-400" />;
    if (s.includes('react')) return <FaReact className="w-5 h-5 text-cyan-400" />;
    if (s.includes('c / c++') || s.includes('c++')) return <SiCplusplus className="w-5 h-5 text-blue-500" />;
    if (s.includes('javascript')) return <SiJavascript className="w-5 h-5 text-yellow-400" />;
    if (s.includes('html')) return <SiHtml5 className="w-5 h-5 text-orange-500" />;
    if (s.includes('css')) return <FaCss3Alt className="w-5 h-5 text-blue-400" />;
    if (s.includes('git ') || s.includes('github')) return <FaGithub className="w-5 h-5 text-white" />;
    if (s.includes('arduino')) return <SiArduino className="w-5 h-5 text-teal-500" />;
    if (s.includes('esp32')) return <SiEspressif className="w-5 h-5 text-red-600" />;
    if (s.includes('siemens') || s.includes('plc')) return <SiSiemens className="w-5 h-5 text-teal-400" />;
    if (s.includes('matlab') || s.includes('comsol')) return <TbWaveSine className="w-5 h-5 text-purple-400" />;
    if (s.includes('vs code')) return <VscTerminalCmd className="w-5 h-5 text-blue-500" />;
    if (s.includes('sensor')) return <FaMicrochip className="w-5 h-5 text-slate-400" />;
    if (s.includes('circuit') || s.includes('panel') || s.includes('eplan')) return <VscCircuitBoard className="w-5 h-5 text-emerald-400" />;
    if (s.includes('wiring') || s.includes('testing')) return <FaPlug className="w-5 h-5 text-amber-500" />;
    if (s.includes('spi') || s.includes('i2c') || s.includes('uart') || s.includes('telemetry')) return <TbTopologyStarRing className="w-5 h-5 text-cyan-500" />;
    if (s.includes('motor') || s.includes('vfd')) return <Cog className="w-5 h-5 text-amber-400" />;
    return <Cpu className="w-5 h-5 text-slate-400" />; // Fallback
  };

  const getLevelBadgeStyle = (level: string) => {
    switch (level) {
      case 'Strong Foundation': return 'bg-amber-500/10 text-amber-400 border-amber-500/40 font-semibold';
      case 'Practical Exposure': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40 font-semibold';
      case 'Project Experience': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40';
      case 'Working Knowledge': return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Currently Learning': return 'bg-violet-500/10 text-violet-400 border-violet-500/40';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const filteredCategories = selectedCat === 'all'
    ? categories
    : categories.filter(c => c.code === selectedCat);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="section-eyebrow">03 // SKILLS MATRIX</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Technical Competencies & Standards
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Categorized technical competencies grounded in practical field internship exposure, embedded hardware projects, and academic coursework.
          </p>
        </motion.div>

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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredCategories.map((cat) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              key={cat.code}
              className="glass-panel p-6 flex flex-col justify-between hover:border-cyan-500/60 transition-all shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden group skill-card"
            >
              {/* Subtle hover background glow */}
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Card Top */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-obsidian-700/80">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="p-2 bg-obsidian-900 border border-obsidian-700/80 rounded-lg group-hover:scale-110 group-hover:border-cyan-500/50 transition-all duration-300"
                      whileHover={{ rotate: 180 }}
                    >
                      {getCategoryIcon(cat.icon)}
                    </motion.div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">{cat.title}</h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">{cat.code}</span>
                </div>

                {/* Skills Icon Grid Layout - Redesigned to show large icons per user request */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {cat.skills.map((s, sIdx) => (
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(6, 182, 212, 0.08)' }}
                      key={sIdx}
                      className="p-3 bg-obsidian-950/80 border border-obsidian-800/80 rounded-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col items-center justify-center text-center gap-2 relative group/item"
                      title={s.level}
                    >
                      {/* Real Technology Icon */}
                      <div className="p-2 bg-obsidian-900 rounded-lg border border-obsidian-700 group-hover/item:border-cyan-500/50 transition-colors shadow-sm">
                        {getSkillLogo(s.name)}
                      </div>
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-300 leading-tight">
                        {s.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Category Footer */}
              <div className="pt-4 mt-6 border-t border-obsidian-700/60 text-[10px] font-mono text-slate-500 flex justify-between relative z-10">
                <span>{cat.skills.length} Competencies</span>
                <span className="text-cyan-400 font-bold group-hover:animate-pulse">Verified</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
