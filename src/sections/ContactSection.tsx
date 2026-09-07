import React, { useState } from 'react';
import { PersonalInfo } from '../types/portfolio';
import { Mail, Linkedin, Github, Send, FileText, MapPin, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  personal: PersonalInfo;
  triggerToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ personal, triggerToast }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerToast('Thank you! Your message has been transmitted successfully.');
      setForm({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="section-eyebrow">11 // CONNECT</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
            Let's Build Something Intelligent.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-2">
            Open for engineering internships, collaborative R&D projects, and technical discussions across embedded systems and industrial automation.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Direct Links & Credentials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Email Card */}
            <div className="glass-panel p-6 border-cyan-500/40 hover:border-cyan-500/70 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-lg">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">DIRECT EMAIL</div>
                  <div className="text-sm font-bold text-slate-100">{personal.email}</div>
                </div>
              </div>
              <a
                href={`mailto:${personal.email}`}
                className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1 mt-2"
              >
                <span>Send Direct Email</span> ➔
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="glass-panel p-6 border-amber-500/40 hover:border-amber-500/70 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-lg">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">LINKEDIN PROFILE</div>
                  <div className="text-sm font-bold text-slate-100">linkedin.com/in/dharanbabu</div>
                </div>
              </div>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1 mt-2"
              >
                <span>Visit LinkedIn Profile</span> ➔
              </a>
            </div>

            {/* Location & Resume Link */}
            <div className="glass-panel p-6 space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">LOCATION</div>
                  <div className="text-xs font-semibold text-slate-200">{personal.location}</div>
                </div>
              </div>

              <div className="pt-3 border-t border-obsidian-700/60 flex items-center justify-between">
                <div className="text-xs font-mono text-slate-400">
                  {personal.degree} • {personal.institution}
                </div>
              </div>
            </div>

          </div>

          {/* Right Interactive Form */}
          <div className="lg:col-span-7 glass-panel p-8 border-obsidian-700/80 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-100 mb-2">Transmit a Message</h3>
            <p className="text-xs text-slate-400 mb-6">
              Fill out the message fields below to initiate communication.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-slate-400 mb-1.5">
                  YOUR NAME / RECRUITER TITLE
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="e.g. Recruiter / Internship Coordinator"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-slate-400 mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="e.g. recruiter@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-slate-400 mb-1.5">
                  MESSAGE CONTENT
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Hello Dharan, I am reaching out regarding..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-obsidian-950 border border-obsidian-700 focus:border-cyan-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-mono font-bold bg-cyan-500 hover:bg-cyan-400 text-obsidian-950 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Transmitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
