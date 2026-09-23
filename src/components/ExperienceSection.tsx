import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { WORK_EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive scroll tracking for timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 60%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" ref={containerRef} className="py-24 bg-[#fbfdff] dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300 overflow-hidden">
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
              WORK EXPERIENCE
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Professional Work Experience
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Detailed career timeline with production cross-platform mobile engineering across commercial startups, client teams, and scalable products.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Base Background Track */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-blue-100 dark:bg-blue-950" />

          {/* Animated Scroll Progress Line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 sm:left-8 top-3 bottom-3 w-0.5 bg-gradient-to-b from-[#0d6efd] via-[#2b85ff] to-[#0d6efd]" 
          />

          <div className="space-y-12">
            {WORK_EXPERIENCES.map((exp, index) => {
              const isExpanded = expandedIndex === index;
              const isCurrent = exp.duration.toLowerCase().includes('present');

              return (
                <div key={index} className="relative pl-12 sm:pl-20">
                  
                  {/* Timeline Node Badge with Glow */}
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    className={`absolute left-2 sm:left-6 -translate-x-1/2 top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center z-10 ${
                      isCurrent 
                        ? 'border-[#0d6efd] bg-white dark:bg-[#070d1e] shadow-[0_0_12px_rgba(13,110,253,0.5)] ring-4 ring-blue-100 dark:ring-blue-900/40' 
                        : 'border-blue-200 dark:border-blue-800 bg-white dark:bg-[#070d1e]'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-[#0d6efd] animate-pulse' : 'bg-slate-400'}`} />
                  </motion.div>

                  {/* Experience Card with Slide-in and Hover */}
                  <motion.div 
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -2 }}
                    className={`p-6 sm:p-8 rounded-[24px] bg-white dark:bg-[#0f1f42] border transition-all duration-300 shadow-[0_4px_25px_rgba(11,27,61,0.04)] ${
                      isCurrent 
                        ? 'border-blue-300 dark:border-blue-700 ring-2 ring-blue-100 dark:ring-blue-900/30' 
                        : 'border-blue-100/90 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
                  >
                    
                    {/* Header Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
                            {exp.company}
                          </h3>
                          {isCurrent && (
                            <span className="px-3 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
                              Current Role
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-bold text-[#0d6efd] dark:text-blue-400 mt-1 flex items-center gap-1.5">
                          <span>{exp.role}</span>
                          <span className="text-slate-300 dark:text-slate-600">•</span>
                          <span className="text-slate-500 dark:text-slate-400 font-medium">{exp.type}</span>
                        </div>
                      </div>

                      {/* Duration & Location */}
                      <div className="text-left sm:text-right font-mono text-xs text-slate-500 dark:text-slate-400 space-y-0.5">
                        <div className="inline-flex items-center gap-1.5 text-[#0B1B3D] dark:text-slate-200 bg-[#f8fbff] dark:bg-[#070d1e] px-3 py-1 rounded-full border border-blue-100 dark:border-blue-900/60 shadow-2xs">
                          <Calendar className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
                          <span className="font-semibold">{exp.duration}</span>
                        </div>
                        <div className="flex items-center sm:justify-end gap-1 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                          <MapPin className="w-3 h-3" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Short Role Description */}
                    <p className="mt-4 text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Key Highlights Pill Row */}
                    <div className="mt-4 p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100/70 dark:border-blue-900/50 shadow-2xs">
                      <div className="text-[11px] font-bold text-[#0B1B3D] dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Key Project Impacts</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#475569] dark:text-slate-300">
                        {exp.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0d6efd] dark:bg-blue-400 mt-1.5 shrink-0" />
                            <span className="leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Responsibilities Accordion with AnimatePresence */}
                    <div className="mt-5 pt-4 border-t border-blue-100/80 dark:border-blue-900/60">
                      <button
                        onClick={() => toggleExpand(index)}
                        className="w-full flex items-center justify-between text-xs font-bold text-[#0d6efd] dark:text-blue-400 hover:text-[#0b5ed7] py-1 transition-colors cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                          <span>Detailed Responsibilities ({exp.responsibilities.length} items from resume)</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.ul 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="mt-3 space-y-2 text-xs text-[#475569] dark:text-slate-300 overflow-hidden"
                          >
                            {exp.responsibilities.map((resp, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-2.5">
                                <span className="text-[#0d6efd] dark:text-blue-400 font-mono mt-0.5">•</span>
                                <span className="leading-relaxed">{resp}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Technologies Row */}
                    <div className="mt-5 pt-4 border-t border-blue-100/60 dark:border-blue-900/50">
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mb-2">Technologies & Tooling:</div>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-3 py-1 rounded-full text-[11px] bg-[#f0f6ff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900/50 font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
