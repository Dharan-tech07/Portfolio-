import React from 'react';
import { motion } from 'framer-motion';
import { ExperienceItem } from '../types/portfolio';
import { CertModalData } from '../components/CertModal';
import { Briefcase, MapPin, Search, CheckCircle2 } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: ExperienceItem[];
  onViewCert: (cert: CertModalData) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  onViewCert,
}) => {
  return (
    <section id="experience" className="py-20 relative bg-obsidian-950/40 border-y border-obsidian-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">06 // EXPERIENCE & TRAINING</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Industry Internships & Practical Field Training
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Verified field exposure highlighting industrial wiring, Siemens TIA Portal PLC logic, SCADA screen layout, VFD drive setup, and software development.
          </p>
        </div>

        {/* Vertical Progress Timeline */}
        <motion.div 
          className="relative border-l-2 border-obsidian-700/80 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
          }}
        >
          {experiences.map((exp) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              key={exp.id} 
              className="relative group"
            >
              
              {/* Timeline Dot */}
              <motion.div 
                whileHover={{ scale: 1.5 }}
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-obsidian-950 border-2 border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)] group-hover:scale-125 transition-transform origin-center" 
              />

              {/* Experience Card */}
              <div className="glass-panel p-6 sm:p-8 hover:border-amber-500/50 transition-all duration-300 shadow-xl">
                
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider block mb-1">
                      {exp.period}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100">{exp.role}</h3>
                    <div className="text-xs sm:text-sm font-semibold text-cyan-400 flex items-center gap-1.5 mt-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Ref Badge & Inspect CTA */}
                  <button
                    onClick={() =>
                      onViewCert({
                        title: `${exp.role} Certificate`,
                        authority: exp.company,
                        date: exp.period,
                        refId: exp.refId,
                        score: 'Verified Field Training',
                        docPath: exp.certPath,
                        docType: exp.certType,
                        details: `${exp.role} at ${exp.company} (${exp.location}). ${exp.learned}`,
                      })
                    }
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-lg transition-colors"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Inspect Document (Ref: {exp.refId})</span>
                  </button>
                </div>

                {/* Practical Engineering Responsibilities */}
                <div className="mt-4">
                  <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                    Key Responsibilities & Practical Exposure:
                  </div>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Learned Takeaway Box */}
                <div className="bg-obsidian-950/80 p-3.5 rounded-lg border border-obsidian-800 text-xs text-slate-300 mt-6">
                  <span className="text-amber-400 font-semibold font-mono">ENGINEERING EXPOSURE: </span>
                  <span>{exp.learned}</span>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-obsidian-700/60">
                  {exp.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-mono bg-obsidian-900 border border-obsidian-700/80 text-cyan-400 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
