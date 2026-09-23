import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Smartphone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#070d1e] border-t border-blue-100/70 dark:border-blue-950/70 py-12 text-[#475569] dark:text-slate-400 text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-blue-100/60 dark:border-blue-900/60">
          
          {/* Brand & Title */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#0d6efd] text-white flex items-center justify-center font-mono font-bold text-xs shadow-[0_2px_10px_rgba(13,110,253,0.35)]">
                AM
              </div>
              <span className="font-extrabold text-[#0B1B3D] dark:text-white text-base tracking-tight">{PERSONAL_INFO.name}</span>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400 mt-1">
              Flutter Developer • Cross-Platform Mobile Applications (Android & iOS)
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#0B1B3D] dark:text-slate-300">
            <a href="#about" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Experience</a>
            <a href="#published-apps" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Published Apps</a>
            <a href="#workflow" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Workflow</a>
            <button onClick={onOpenResume} className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors cursor-pointer">
              Resume
            </button>
            <a href="#contact" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-[#f8fbff] dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/50 text-[#0B1B3D] dark:text-slate-200 hover:text-[#0d6efd] border border-blue-100 dark:border-blue-900/80 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer font-bold"
            aria-label="Back to top"
          >
            <span className="text-xs">Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
          </button>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11.5px] text-slate-400 dark:text-slate-500">
          <div>
            © {new Date().getFullYear()} Anand Makhanasa. All rights reserved. Sridix Enterprise Mobile Portfolio.
          </div>

          <div className="flex items-center gap-3.5 font-medium">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <span>•</span>
            <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">
              {PERSONAL_INFO.phone}
            </a>
            <span>•</span>
            <a 
              href={PERSONAL_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#0a66c2] dark:hover:text-[#70b5f9] transition-colors font-semibold"
            >
              LinkedIn
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
