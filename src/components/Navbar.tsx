import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, FileText, Send, Smartphone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      if (isHomePage) {
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
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavClick = (path: string, sectionId?: string) => {
    setMobileMenuOpen(false);

    if (sectionId) {
      if (isHomePage) {
        const element = document.getElementById(sectionId);
        if (element) {
          const yOffset = -75;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        navigate(`/#${sectionId}`);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
        
        {/* Brand: AM Monogram + Anand Makhanasa */}
        <Link 
          to="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
              <span className="hidden sm:inline">Senior Flutter &amp; Mobile Developer</span>
              <span className="sm:hidden">Flutter Developer</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items with Crawlable Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#f4f7ff] dark:bg-[#070d1e]/80 border border-blue-100/80 dark:border-blue-900/60 rounded-full px-1.5 py-1 backdrop-blur-md">
          <Link
            to="/"
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
              isHomePage && activeSection === 'home'
                ? 'text-[#0d6efd] dark:text-blue-300 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white'
            }`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
              location.pathname === '/about'
                ? 'text-[#0d6efd] dark:text-blue-300 font-bold bg-white dark:bg-blue-950/60 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white'
            }`}
          >
            About
          </Link>

          <Link
            to="/projects"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all ${
              location.pathname.startsWith('/projects')
                ? 'text-[#0d6efd] dark:text-blue-300 font-bold bg-white dark:bg-blue-950/60 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white'
            }`}
          >
            Published Apps (8)
          </Link>

          <button
            onClick={() => handleNavClick('/', 'experience')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
              isHomePage && activeSection === 'experience'
                ? 'text-[#0d6efd] dark:text-blue-300 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white'
            }`}
          >
            Experience
          </button>

          <button
            onClick={() => handleNavClick('/', 'contact')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all cursor-pointer ${
              isHomePage && activeSection === 'contact'
                ? 'text-[#0d6efd] dark:text-blue-300 font-bold'
                : 'text-slate-600 dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Actions: Theme Toggle + Resume + Enquiry */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Download/View Resume CTA */}
          <motion.button
            onClick={onOpenResume}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-800/80 bg-blue-50/70 dark:bg-blue-950/40 text-[#0d6efd] dark:text-blue-400 hover:bg-blue-100/70 dark:hover:bg-blue-900/50 text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </motion.button>

          {/* Direct Contact Button */}
          <motion.button
            onClick={() => handleNavClick('/', 'contact')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs font-semibold shadow-xs shadow-blue-500/25 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hire Me</span>
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-[#0d6efd] dark:hover:text-white focus:outline-hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden mt-2 max-w-6xl mx-auto rounded-3xl bg-white/95 dark:bg-[#0B1B3D]/95 backdrop-blur-xl border border-blue-100 dark:border-blue-900/80 shadow-2xl p-4 pointer-events-auto"
          >
            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-left text-xs font-bold text-[#0B1B3D] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center justify-between"
              >
                <span>Home</span>
              </Link>

              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-left text-xs font-bold text-[#0B1B3D] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center justify-between"
              >
                <span>About Anand Makhanasa</span>
              </Link>

              <Link
                to="/projects"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-left text-xs font-bold text-[#0B1B3D] dark:text-white hover:bg-blue-50 dark:hover:bg-blue-950/60 flex items-center justify-between"
              >
                <span>8 Published Apps</span>
              </Link>

              <button
                onClick={() => handleNavClick('/', 'experience')}
                className="px-4 py-2.5 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60"
              >
                Professional Experience
              </button>

              <button
                onClick={() => handleNavClick('/', 'contact')}
                className="px-4 py-2.5 rounded-xl text-left text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/60"
              >
                Contact &amp; Hire
              </button>

              <div className="pt-2 mt-2 border-t border-blue-50 dark:border-blue-950/60 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0d6efd] dark:text-blue-400 text-center flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>

                <button
                  onClick={() => handleNavClick('/', 'contact')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0d6efd] text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Get In Touch</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
