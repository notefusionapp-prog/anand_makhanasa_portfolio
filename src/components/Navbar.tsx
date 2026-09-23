import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['home', 'about', 'skills', 'experience', 'published-apps', 'workflow', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'published-apps', label: 'Published Apps' },
    { id: 'workflow', label: 'Workflow' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      id="main-navigation" 
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-2.5 sm:top-3.5 left-0 right-0 z-40 px-3 sm:px-6 transition-all duration-300 pointer-events-none`}
    >
      <div className={`max-w-6xl mx-auto rounded-full border transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto ${
        isScrolled 
          ? 'bg-white/90 dark:bg-[#0B1B3D]/90 backdrop-blur-xl border-blue-200/90 dark:border-blue-900/80 shadow-[0_12px_35px_rgba(11,27,61,0.08)] dark:shadow-[0_12px_35px_rgba(0,0,0,0.5)]' 
          : 'bg-white/75 dark:bg-[#0B1B3D]/75 backdrop-blur-md border-blue-100/80 dark:border-blue-900/50 shadow-[0_8px_25px_rgba(11,27,61,0.05)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.35)]'
      }`}>
        
        {/* Brand */}
        <motion.button 
          onClick={() => scrollTo('home')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2.5 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-[#0d6efd] to-[#2b85ff] p-[1.5px] shadow-[0_2px_10px_rgba(13,110,253,0.3)] group-hover:shadow-[0_4px_15px_rgba(13,110,253,0.4)] transition-shadow">
            <div className="w-full h-full bg-white dark:bg-[#070d1e] rounded-[10px] flex items-center justify-center font-mono font-black text-xs text-[#0d6efd] dark:text-blue-400">
              AM
            </div>
          </div>
          <div>
            <div className="font-bold text-[#0B1B3D] dark:text-white text-xs sm:text-sm tracking-tight group-hover:text-[#0d6efd] dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <span>{PERSONAL_INFO.name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] text-slate-500 dark:text-slate-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" />
              <span className="hidden sm:inline">Senior Flutter &amp; Mobile Application Developer</span>
              <span className="sm:hidden">Senior Flutter &amp; Mobile Dev</span>
            </div>
          </div>
        </motion.button>

        {/* Desktop Nav Items with Sridix Pill Indicator */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f4f7ff] dark:bg-[#070d1e]/80 border border-blue-100/80 dark:border-blue-900/60 rounded-full px-1.5 py-1 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
                  isActive 
                    ? 'text-[#0d6efd] dark:text-blue-300 font-bold' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white hover:bg-white/60 dark:hover:bg-blue-950/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full bg-white dark:bg-blue-600/20 border border-blue-200/80 dark:border-blue-500/30 -z-10 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action CTAs with ThemeToggle (Sridix Style) */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle />

          <motion.button
            onClick={onOpenResume}
            id="nav-resume-button"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold text-[#0B1B3D] dark:text-slate-200 bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/40 border border-blue-200/80 dark:border-blue-800/80 transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
            <span>Resume</span>
          </motion.button>

          <motion.button
            onClick={() => scrollTo('contact')}
            id="nav-contact-button"
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98, y: 0 }}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full text-xs font-bold text-white bg-[#0d6efd] hover:bg-[#0b5ed7] transition-all shadow-[0_4px_15px_rgba(13,110,253,0.3)] hover:shadow-[0_6px_20px_rgba(13,110,253,0.4)] cursor-pointer"
          >
            <span>Let's Talk</span>
            <Send className="w-3 h-3" />
          </motion.button>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-1.5">
          <ThemeToggle />

          <motion.button
            onClick={onOpenResume}
            whileTap={{ scale: 0.95 }}
            className="px-2.5 py-1.5 rounded-full text-xs font-medium text-[#0B1B3D] dark:text-slate-200 bg-white dark:bg-[#0f1f42] border border-blue-200 dark:border-blue-800 shadow-xs"
          >
            Resume
          </motion.button>
          
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full bg-white dark:bg-[#0f1f42] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-blue-200 dark:border-blue-800 shadow-xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

      </div>

      {/* Mobile Menu Dropdown with smooth AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="sm:hidden bg-white/95 dark:bg-[#0F172A]/95 border-b border-slate-200 dark:border-slate-800 px-4 py-5 shadow-xl backdrop-blur-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`py-2.5 px-3 rounded-lg text-left text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                  <span>View / Download Resume</span>
                </button>

                <button
                  onClick={() => scrollTo('contact')}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Let's Work Together</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
