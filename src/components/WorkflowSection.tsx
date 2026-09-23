import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../data/portfolioData';

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="py-24 bg-[#fbfdff] dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300">
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
              DEVELOPMENT PROCESS
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            How I Approach Mobile Engineering
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            A disciplined, production-proven workflow from initial product requirements to app store release and performance tuning.
          </p>
        </motion.div>

        {/* Workflow Steps Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-[26px] bg-white dark:bg-[#0B1B3D]/80 border border-blue-100/90 dark:border-blue-900/60 hover:border-[#0d6efd]/50 dark:hover:border-blue-500/50 shadow-[0_4px_20px_rgba(11,27,61,0.03)] hover:shadow-[0_12px_30px_rgba(13,110,253,0.08)] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-blue-200 dark:text-blue-900/70 group-hover:text-[#0d6efd] transition-colors">
                    {step.step}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 group-hover:bg-[#0d6efd] group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-extrabold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-xs sm:text-sm text-[#475569] dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-blue-100/70 dark:border-blue-900/60 flex items-center text-[11px] text-[#0d6efd] dark:text-blue-400 font-bold">
                <span>Phase {step.step} of 06</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
