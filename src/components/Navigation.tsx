import React, { useState, useEffect } from 'react';
import { Menu, X, Layout, FileText, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
  viewMode: 'tabbed' | 'scroll';
  setViewMode: (mode: 'tabbed' | 'scroll') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  setActiveSection,
  viewMode,
  setViewMode,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'domains', label: 'Profile' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'journey', label: 'Journey' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-obsidian-950/90 backdrop-blur-md border-b border-obsidian-700/80 py-3 shadow-xl'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('hero');
            }}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#06b6d4]" />
            <span>DHARAN</span>
            <span className="text-cyan-400 font-mono">.B</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-obsidian-900/60 border border-obsidian-700/60 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)] font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-800/50'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'tabbed' ? 'scroll' : 'tabbed')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono bg-obsidian-900/80 hover:bg-obsidian-800 text-slate-300 hover:text-cyan-400 border border-obsidian-700/80 rounded-lg transition-all shadow-sm"
              title="Toggle View Mode"
            >
              {viewMode === 'tabbed' ? (
                <>
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="hidden sm:inline">Page Mode</span>
                </>
              ) : (
                <>
                  <Layout className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Scroll Mode</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 bg-obsidian-900/80 border border-obsidian-700/80 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 bg-obsidian-950 border-l border-obsidian-700/80 z-50 lg:hidden p-6 flex flex-col justify-between transform transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-obsidian-700/80">
            <span className="font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Navigation
            </span>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  setIsMobileOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded-lg text-sm font-mono transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-obsidian-900 hover:text-cyan-400'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-obsidian-700/80 text-xs font-mono text-slate-500">
          Dharan B // ECE Engineer
        </div>
      </div>
    </>
  );
};
