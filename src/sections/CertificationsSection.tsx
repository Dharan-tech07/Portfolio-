import React from 'react';
import { motion } from 'framer-motion';
import { CertificationItem, AchievementItem } from '../types/portfolio';
import { CertModalData } from '../components/CertModal';
import { Award, ShieldCheck, Search, Trophy, FileText } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  onViewCert: (cert: CertModalData) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  achievements,
  onViewCert,
}) => {
  return (
    <section id="certifications" className="py-20 relative bg-obsidian-950/40 border-y border-obsidian-700/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">08 // CREDENTIALS & ACHIEVEMENTS</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Verified Certifications & Hackathons
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Authentic credentials backed by official registration numbers, PDF documents, and verified completion certificates.
          </p>
        </div>

        {/* Certifications Gallery Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {certifications.map((c) => (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
              }}
              whileHover={{ y: -5, rotateX: 2, rotateY: -2, scale: 1.02 }}
              key={c.id}
              onClick={() => onViewCert({
                title: c.title,
                authority: c.authority,
                date: c.date,
                refId: c.refId,
                score: c.scoreBadge,
                docPath: c.docPath,
                docType: c.docType,
                details: c.details,
              })}
              className="glass-panel p-6 cursor-pointer flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300 group shadow-lg overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-md">
                    {c.authority}
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    {c.scoreBadge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100 group-hover:text-amber-400 transition-colors mb-2">
                  {c.title}
                </h3>

                <div className="text-xs font-mono text-slate-400 mb-3">
                  Issued: {c.date}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {c.details}
                </p>
              </div>

              <div className="pt-4 border-t border-obsidian-700/80 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  Ref: {c.refId}
                </span>
                <span className="text-xs font-mono text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <Search className="w-3.5 h-3.5" />
                  <span>Inspect Credential 🔍</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hackathon Achievement Spotlight */}
        {achievements.map((ach) => (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.02 }}
            key={ach.id}
            className="glass-panel glass-panel-gold p-8 border-amber-500/50 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
                    24-HOUR INNOVATION HACKATHON
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-100">{ach.title}</h3>
                <div className="text-xs font-mono text-cyan-400 mt-1">
                  {ach.organizer} • Date: {ach.date}
                </div>
              </div>

              <span className="px-3 py-1 text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full">
                {ach.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              {ach.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-obsidian-700/80">
              <span className="text-xs font-mono text-slate-400">
                Supported by NITI Aayog • AIC RAISE • Rathinam Global University
              </span>

              <button
                onClick={() =>
                  onViewCert({
                    title: ach.title,
                    authority: ach.organizer,
                    date: ach.date,
                    refId: 'CIH26-RATHINAM-NITI',
                    score: ach.badge,
                    docPath: ach.docPath,
                    docType: ach.docType,
                    details: ach.description,
                  })
                }
                className="flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold bg-amber-500 hover:bg-amber-400 text-obsidian-950 rounded-xl transition-colors shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <FileText className="w-4 h-4" />
                <span>Inspect Hackathon Certificate</span>
              </button>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};
