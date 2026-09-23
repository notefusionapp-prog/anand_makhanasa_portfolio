import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  ExternalLink 
} from 'lucide-react';
import { OTHER_PROJECTS, Project } from '../data/portfolioData';

export const CommercialProjectsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#fbfdff] dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Sridix Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              COMMERCIAL SOLUTIONS
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Client & Enterprise Projects
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Enterprise platforms and specialized business systems engineered for companies during my tenure at CodExpert Solutions and Globalia Soft.
          </p>
        </motion.div>

        {/* 2-Column Grid with Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OTHER_PROJECTS.map((proj: Project, index: number) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-8 rounded-[28px] bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/90 dark:border-blue-900/60 hover:border-[#0d6efd]/50 dark:hover:border-blue-500/50 shadow-[0_4px_25px_rgba(11,27,61,0.04)] hover:shadow-[0_12px_35px_rgba(13,110,253,0.08)] transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider">
                      {proj.role}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight mt-0.5">
                      {proj.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#0B1B3D] dark:text-slate-200 bg-[#f8fbff] dark:bg-[#070d1e] px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900 shadow-2xs font-semibold">
                    <Smartphone className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
                    <span>{proj.platform.join(', ')}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                  {proj.description}
                </p>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D] dark:text-slate-200 mb-2">Key Features Implemented</h4>
                  <ul className="space-y-1.5 text-xs text-[#475569] dark:text-slate-400">
                    {proj.keyFeatures.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contributions */}
                <div className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/80 dark:border-blue-900/60 text-xs shadow-2xs">
                  <span className="font-bold block mb-1.5 text-[11px] uppercase tracking-wider text-[#0d6efd] dark:text-blue-400">
                    My Technical Contribution
                  </span>
                  <ul className="space-y-1 text-[#475569] dark:text-slate-300">
                    {proj.contribution.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#0d6efd] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-blue-100/70 dark:border-blue-900/60 flex flex-wrap gap-1.5">
                {proj.technologies.map((t: string, idx: number) => (
                  <span key={idx} className="px-3 py-1 rounded-full bg-[#f8fbff] dark:bg-[#0f1f42] text-[11px] text-[#0B1B3D] dark:text-slate-300 border border-blue-100 dark:border-blue-900/70 shadow-2xs font-semibold">
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
