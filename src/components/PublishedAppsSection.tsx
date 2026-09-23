import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ExternalLink, 
  Layers, 
  Sparkles,
  Building2,
  Tag,
  ArrowRight,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PUBLISHED_APPS, Project } from '../data/portfolioData';
import { ProjectPhoneShowcase } from './ProjectPhoneShowcase';
import { ProjectDetailModal } from './ProjectDetailModal';
import { OptimizedProjectImage } from './OptimizedProjectImage';

type FilterCategory = 'all' | 'productivity' | 'lifestyle' | 'utilities-games';

export const PublishedAppsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(null);

  // Category filtering
  const filteredApps = PUBLISHED_APPS.filter((app) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'productivity') return app.category === 'productivity';
    if (activeFilter === 'lifestyle') return app.category === 'lifestyle' || app.category === 'business' || app.category === 'health';
    if (activeFilter === 'utilities-games') return app.category === 'utilities' || app.category === 'entertainment' || app.category === 'education';
    return true;
  });

  const filterTabs: { id: FilterCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Published Apps', count: PUBLISHED_APPS.length },
    { id: 'productivity', label: 'Productivity & Notes', count: PUBLISHED_APPS.filter(a => a.category === 'productivity').length },
    { id: 'lifestyle', label: 'Lifestyle & Real-Time Chat', count: PUBLISHED_APPS.filter(a => a.category === 'lifestyle' || a.category === 'business' || a.category === 'health').length },
    { id: 'utilities-games', label: 'Utilities & Puzzle Games', count: PUBLISHED_APPS.filter(a => a.category === 'utilities' || a.category === 'entertainment' || a.category === 'education').length },
  ];

  return (
    <section id="published-apps" className="py-24 sm:py-32 bg-white dark:bg-[#081226] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300 overflow-hidden">
      {/* Sridix Background Ambient Lighting & Geometric rings */}
      <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] border border-blue-100/40 dark:border-blue-900/20 rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 -left-20 w-[500px] h-[500px] border border-blue-50/50 dark:border-blue-950/30 rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#0d6efd]/5 dark:bg-blue-600/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Sridix Style) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              PORTFOLIO APPS
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Apps I've Worked On
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
            Real production applications published on the Google Play Store and iOS App Store. All mockups display authentic application interfaces and store screenshots.
          </p>

          {/* Interactive Category Filter Pills (Sridix Style Rounded Full) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-full bg-[#f4f7ff] dark:bg-[#070d1e] border border-blue-100/90 dark:border-blue-900/60 shadow-xs backdrop-blur-md">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0d6efd] text-white font-bold shadow-[0_4px_12px_rgba(13,110,253,0.3)]'
                      : 'text-[#475569] dark:text-slate-300 hover:text-[#0B1B3D] dark:hover:text-white hover:bg-white/80 dark:hover:bg-blue-950/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono ${
                    isActive 
                      ? 'bg-white/25 text-white' 
                      : 'bg-blue-100/60 dark:bg-blue-950 text-[#0d6efd] dark:text-blue-300'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Project Cards Stack */}
        <div className="space-y-16 sm:space-y-24">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => {
              const isReversed = index % 2 === 1;

              return (
                <motion.div 
                  key={app.id}
                  id={`project-${app.id}`}
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="p-6 sm:p-8 lg:p-10 rounded-[28px] bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/90 dark:border-blue-900/70 hover:shadow-[0_15px_45px_rgba(11,27,61,0.09)] transition-all duration-300 shadow-[0_10px_35px_rgba(11,27,61,0.05)] relative overflow-hidden"
                >
                  {/* Sridix Brand Top Accent Ribbon */}
                  <div 
                    className="absolute top-0 inset-x-0 h-1 opacity-90"
                    style={{ backgroundColor: app.accentColor || '#0d6efd' }}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                    
                    {/* Visual Smartphone Column with Real Google Play Screenshots */}
                    <div className={`lg:col-span-6 flex flex-col items-center justify-center ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <ProjectPhoneShowcase 
                        screenshots={app.screenshots}
                        appName={app.name}
                        accentColor={app.accentColor}
                        category={app.category}
                        isReversed={isReversed}
                        isAboveTheFold={index === 0}
                        onOpenDetail={() => setSelectedDetailProject(app)}
                      />
                    </div>

                    {/* Content & Technical Architecture Column */}
                    <div className={`lg:col-span-6 space-y-6 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      
                      {/* App Header with Official Icon */}
                      <div className="flex items-start gap-4">
                        {app.iconUrl && (
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm border border-blue-100 dark:border-blue-900 bg-white dark:bg-[#070d1e] p-0.5">
                            <OptimizedProjectImage 
                              src={app.iconUrl} 
                              alt={`${app.name} icon`} 
                              width={64}
                              height={64}
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
                              fetchPriority={index === 0 ? "high" : "auto"}
                              objectFit="cover"
                              className="w-full h-full rounded-[14px]"
                              containerClassName="w-full h-full rounded-[14px] !bg-transparent"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0d6efd] dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-3 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800/60">
                              {app.category}
                            </span>
                            {app.companyConnection && (
                              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-200 dark:border-slate-700">
                                <Building2 className="w-3 h-3 text-slate-400" />
                                <span>{app.companyConnection}</span>
                              </span>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight leading-snug">
                            {app.name}
                          </h3>

                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                            Role: {app.role}
                          </p>
                        </div>
                      </div>

                      {/* Clean Project Description */}
                      <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 font-normal leading-relaxed">
                        {app.description}
                      </p>

                      {/* My Contribution Section (Sridix Style Box) */}
                      <div className="bg-[#f8fbff] dark:bg-[#070d1e] p-4 sm:p-5 rounded-2xl border border-blue-100/80 dark:border-blue-900/60">
                        <div className="text-xs font-bold text-[#0B1B3D] dark:text-white mb-2.5 flex items-center gap-1.5 uppercase tracking-wide">
                          <Layers className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
                          <span>My Key Contributions</span>
                        </div>
                        <ul className="space-y-2">
                          {app.contribution.slice(0, 3).map((item, cIdx) => (
                            <li key={cIdx} className="text-xs text-[#475569] dark:text-slate-300 flex items-start gap-2">
                              <span className="text-[#0d6efd] dark:text-blue-400 font-bold">✓</span>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Chips */}
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-xs text-slate-400 dark:text-slate-500 mr-1 flex items-center gap-1 font-medium">
                          <Tag className="w-3 h-3 text-[#0d6efd]" /> Tech:
                        </span>
                        {app.technologies.slice(0, 6).map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f0f6ff] dark:bg-[#0f1f42] text-[#0B1B3D] dark:text-slate-200 border border-blue-100 dark:border-blue-900/60"
                          >
                            {tech}
                          </span>
                        ))}
                        {app.technologies.length > 6 && (
                          <span className="text-xs text-slate-500 font-medium px-1.5">
                            +{app.technologies.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Card Action Buttons: "View Project" Case Study & "Google Play" Store */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        {/* Crawlable Deep Project Case Study Link */}
                        <Link
                          to={`/projects/${app.id}`}
                          className="px-5 py-2.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(13,110,253,0.3)] hover:shadow-[0_6px_20px_rgba(13,110,253,0.4)] transition-all cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Detailed Case Study</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                        </Link>

                        {/* Google Play Store Direct Link */}
                        {app.playStoreUrl && (
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${app.name} on Google Play Store`}
                            className="px-4.5 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-[0_4px_16px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
                          >
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                              <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <span>View on Google Play</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View Full 8 Apps Directory Bottom Callout */}
        <div className="mt-14 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-[#0B1B3D] border border-blue-200 dark:border-blue-900 text-xs sm:text-sm font-bold text-[#0B1B3D] dark:text-white hover:border-[#0d6efd] shadow-sm hover:shadow-md transition-all group"
          >
            <span>Explore All 8 Apps in Dedicated Software Directory</span>
            <ArrowRight className="w-4 h-4 text-[#0d6efd] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      <ProjectDetailModal
        project={selectedDetailProject}
        isOpen={Boolean(selectedDetailProject)}
        onClose={() => setSelectedDetailProject(null)}
      />
    </section>
  );
};
