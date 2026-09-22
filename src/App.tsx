import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { ProjectItem } from './types/portfolio';
import { AmbientCanvas } from './components/AmbientCanvas';
import { Navigation } from './components/Navigation';
import { ProjectModal } from './components/ProjectModal';
import { CertModal, CertModalData } from './components/CertModal';
import { Toast } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';

import { HeroSection } from './sections/HeroSection';
import { EngineeringProfile } from './sections/EngineeringProfile';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { EngineeringDashboard } from './sections/EngineeringDashboard';
import { ExperienceSection } from './sections/ExperienceSection';
import { EducationSection } from './sections/EducationSection';
import { CertificationsSection } from './sections/CertificationsSection';
import { JourneySection } from './sections/JourneySection';
import { ExploringSection } from './sections/ExploringSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [viewMode, setViewMode] = useState<'tabbed' | 'scroll'>('scroll');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedCert, setSelectedCert] = useState<CertModalData | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Intersection detection for active section link highlighting
      const sections = ['hero', 'domains', 'about', 'skills', 'projects', 'dashboard', 'journey', 'experience', 'education', 'certifications', 'exploring', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-slate-100 selection:bg-cyan-500 selection:text-obsidian-950">
      
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Reactive Circuit Ambient Background */}
      <AmbientCanvas />

      {/* Sticky Navigation Bar */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {viewMode === 'scroll' ? (
          <>
            <HeroSection personal={PORTFOLIO_DATA.personal} onNavigate={handleNavigate} />
            <EngineeringProfile domains={PORTFOLIO_DATA.domains} />
            <AboutSection personal={PORTFOLIO_DATA.personal} />
            <SkillsSection categories={PORTFOLIO_DATA.skillsCategories || PORTFOLIO_DATA.skills || []} />
            <ProjectsSection projects={PORTFOLIO_DATA.projects} onSelectProject={setSelectedProject} />
            <EngineeringDashboard data={PORTFOLIO_DATA} onNavigate={handleNavigate} />
            <ExperienceSection experiences={PORTFOLIO_DATA.experiences} onViewCert={setSelectedCert} />
            <EducationSection personal={PORTFOLIO_DATA.personal} />
            <CertificationsSection
              certifications={PORTFOLIO_DATA.certifications}
              achievements={PORTFOLIO_DATA.achievements}
              onViewCert={setSelectedCert}
            />
            <JourneySection journey={PORTFOLIO_DATA.journey} />
            <ExploringSection nodes={PORTFOLIO_DATA.currentlyExploring || PORTFOLIO_DATA.exploring || []} />
            <ContactSection personal={PORTFOLIO_DATA.personal} triggerToast={triggerToast} />
          </>
        ) : (
          /* Tabbed View Mode */
          <div className="pt-24 min-h-[80vh] max-w-7xl mx-auto px-4">
            {activeSection === 'hero' && <HeroSection personal={PORTFOLIO_DATA.personal} onNavigate={handleNavigate} />}
            {activeSection === 'domains' && <EngineeringProfile domains={PORTFOLIO_DATA.domains} />}
            {activeSection === 'about' && <AboutSection personal={PORTFOLIO_DATA.personal} />}
            {activeSection === 'skills' && <SkillsSection categories={PORTFOLIO_DATA.skillsCategories || PORTFOLIO_DATA.skills || []} />}
            {activeSection === 'projects' && <ProjectsSection projects={PORTFOLIO_DATA.projects} onSelectProject={setSelectedProject} />}
            {activeSection === 'dashboard' && <EngineeringDashboard data={PORTFOLIO_DATA} onNavigate={handleNavigate} />}
            {activeSection === 'experience' && <ExperienceSection experiences={PORTFOLIO_DATA.experiences} onViewCert={setSelectedCert} />}
            {activeSection === 'education' && <EducationSection personal={PORTFOLIO_DATA.personal} />}
            {activeSection === 'certifications' && (
              <CertificationsSection
                certifications={PORTFOLIO_DATA.certifications}
                achievements={PORTFOLIO_DATA.achievements}
                onViewCert={setSelectedCert}
              />
            )}
            {activeSection === 'journey' && <JourneySection journey={PORTFOLIO_DATA.journey} />}
            {activeSection === 'exploring' && <ExploringSection nodes={PORTFOLIO_DATA.currentlyExploring || PORTFOLIO_DATA.exploring || []} />}
            {activeSection === 'contact' && <ContactSection personal={PORTFOLIO_DATA.personal} triggerToast={triggerToast} />}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Modals & Telemetry Toasts */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} triggerToast={triggerToast} />
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
