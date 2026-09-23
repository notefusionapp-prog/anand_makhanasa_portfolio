import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Layers, 
  Zap, 
  Cloud, 
  Database, 
  Boxes, 
  Cpu, 
  Wrench, 
  Sparkles,
  Search
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, any> = {
    'Core Mobile & Languages': Code2,
    'State Management': Layers,
    'Networking & Real-Time': Zap,
    'Backend & Cloud Services': Cloud,
    'Local Storage & Caching': Database,
    'Architecture & Standards': Boxes,
    'Device Features & APIs': Cpu,
    'Tools, Store & CI/CD': Wrench,
  };

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.title !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const hasMatchingSkill = cat.skills.some(
        s => s.name.toLowerCase().includes(query) || (s.description && s.description.toLowerCase().includes(query))
      );
      return cat.title.toLowerCase().includes(query) || hasMatchingSkill;
    }
    return true;
  });

  return (
    <section id="skills" className="py-24 bg-white dark:bg-[#081226] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Sridix Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              TECH STACK & CAPABILITIES
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Verified Technical Skills
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Technologies, frameworks, and architecture patterns verified directly from real production applications and client mobile deliverables.
          </p>

          {/* Search bar & Category filters */}
          <div className="mt-8 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input (Sridix Style) */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills (e.g. Bloc, Hive)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900 text-xs text-[#0B1B3D] dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#0d6efd] dark:focus:border-blue-500 shadow-2xs transition-colors"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#0d6efd] text-white font-bold shadow-[0_4px_12px_rgba(13,110,253,0.3)]'
                    : 'bg-[#f4f7ff] dark:bg-[#0f1f42] text-[#475569] dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white border border-blue-100 dark:border-blue-900/60 shadow-2xs'
                }`}
              >
                All Categories ({SKILL_CATEGORIES.length})
              </button>

              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat.title}
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.title
                      ? 'bg-[#0d6efd] text-white font-bold shadow-[0_4px_12px_rgba(13,110,253,0.3)]'
                      : 'bg-[#f4f7ff] dark:bg-[#0f1f42] text-[#475569] dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white border border-blue-100 dark:border-blue-900/60 shadow-2xs'
                  }`}
                >
                  {cat.title.split('&')[0].trim()}
                </button>
              ))}
            </div>

          </div>
        </motion.div>

        {/* Skills Cards Bento Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((category, index) => {
              const Icon = categoryIcons[category.title] || Code2;

              return (
                <motion.div
                  key={category.title}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3 }}
                  className="p-6 rounded-[24px] bg-[#fbfdff] dark:bg-[#0B1B3D]/80 border border-blue-100/80 dark:border-blue-900/70 hover:border-blue-300 dark:hover:border-blue-500/50 shadow-[0_4px_25px_rgba(11,27,61,0.03)] hover:shadow-[0_10px_35px_rgba(11,27,61,0.07)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div 
                        whileHover={{ rotate: 8, scale: 1.05 }}
                        className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/70 border border-blue-100 dark:border-blue-900/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 group-hover:bg-[#0d6efd] group-hover:text-white transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h3 className="font-extrabold text-[#0B1B3D] dark:text-white text-base leading-tight group-hover:text-[#0d6efd] dark:group-hover:text-blue-300 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-[11px] text-[#475569] dark:text-slate-400 mt-0.5">
                          {category.description}
                        </p>
                      </div>
                    </div>

                    {/* Skills List in Category */}
                    <div className="mt-4 space-y-2.5">
                      {category.skills.map((skill, sIdx) => (
                        <motion.div 
                          key={sIdx}
                          whileHover={{ x: 2 }}
                          className={`p-2.5 rounded-2xl border transition-all ${
                            skill.featured 
                              ? 'bg-blue-50/70 dark:bg-[#070d1e] border-blue-200/80 dark:border-blue-800/60' 
                              : 'bg-white dark:bg-[#070d1e]/50 border-blue-100/70 dark:border-blue-950 hover:border-blue-200 dark:hover:border-blue-800'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${skill.featured ? 'text-[#0d6efd] dark:text-blue-300' : 'text-[#0B1B3D] dark:text-slate-200'}`}>
                              {skill.name}
                            </span>
                            {skill.featured && (
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-100 text-[#0d6efd] dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono font-bold">
                                Core
                              </span>
                            )}
                          </div>

                          {skill.description && (
                            <p className="text-[10.5px] text-[#475569] dark:text-slate-400 mt-1 leading-snug">
                              {skill.description}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Card footer indicator */}
                  <div className="mt-5 pt-3 border-t border-blue-100/70 dark:border-blue-900/50 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                    <span>{category.skills.length} verified competencies</span>
                    <span className="text-[#0d6efd] dark:text-blue-400 font-mono text-[10px] font-bold">Dart / Flutter</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Quick Tech Highlights Banner with Motion (Sridix Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 p-6 rounded-[24px] bg-[#f0f6ff] dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_4px_25px_rgba(11,27,61,0.03)]"
        >
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-extrabold text-[#0B1B3D] dark:text-white flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-4 h-4 text-[#0d6efd]" />
              <span>Full-Stack Mobile Integrations</span>
            </h4>
            <p className="text-xs text-[#475569] dark:text-slate-300 max-w-xl">
              Experienced in end-to-end integration: from REST APIs & real-time Socket.IO to Razorpay payment processing and Apple TestFlight / Google Play deployment pipelines.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center shrink-0">
            <span className="px-3.5 py-1 rounded-full bg-white dark:bg-[#070d1e] text-xs text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900 font-semibold shadow-2xs">Dart 3.x</span>
            <span className="px-3.5 py-1 rounded-full bg-white dark:bg-[#070d1e] text-xs text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900 font-semibold shadow-2xs">Flutter 3.x</span>
            <span className="px-3.5 py-1 rounded-full bg-white dark:bg-[#070d1e] text-xs text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900 font-semibold shadow-2xs">Bloc & GetX</span>
            <span className="px-3.5 py-1 rounded-full bg-white dark:bg-[#070d1e] text-xs text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900 font-semibold shadow-2xs">Socket.IO</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
