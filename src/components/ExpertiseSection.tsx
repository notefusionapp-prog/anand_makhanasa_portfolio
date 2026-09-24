import React from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone, 
  Palette, 
  Layers, 
  Zap, 
  Cloud, 
  Database, 
  MapPin, 
  CreditCard, 
  UploadCloud, 
  Gauge,
  CheckCircle2
} from 'lucide-react';
import { DEVELOPMENT_EXPERTISE_AREAS } from '../data/portfolioData';

export const ExpertiseSection: React.FC = () => {
  const iconMap: Record<string, any> = {
    Smartphone,
    Palette,
    Layers,
    Zap,
    Cloud,
    Database,
    MapPin,
    CreditCard,
    UploadCloud,
    Gauge
  };

  return (
    <section id="expertise" className="py-24 bg-white dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Modern Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              DEVELOPMENT EXPERTISE
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Comprehensive Mobile Capabilities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Every capability listed here is backed by actual production code and project contributions from my professional work experience.
          </p>
        </motion.div>

        {/* Capabilities Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEVELOPMENT_EXPERTISE_AREAS.map((item, idx) => {
            const Icon = iconMap[item.icon] || Smartphone;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="p-7 rounded-[26px] bg-[#fbfdff] dark:bg-[#0B1B3D]/80 border border-blue-100/90 dark:border-blue-900/60 hover:border-[#0d6efd]/50 dark:hover:border-blue-500/50 shadow-[0_4px_20px_rgba(11,27,61,0.03)] hover:shadow-[0_10px_30px_rgba(13,110,253,0.08)] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 group-hover:bg-[#0d6efd] group-hover:text-white transition-colors mb-5 shadow-2xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-base font-extrabold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs sm:text-[13px] text-[#475569] dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-blue-100/70 dark:border-blue-900/60 flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
