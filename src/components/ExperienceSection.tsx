import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers,
  Smartphone,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  Play,
  Pause
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { WORK_EXPERIENCES, PUBLISHED_APPS, Project } from '../data/portfolioData';
import { PhoneMockup } from './PhoneMockup';
import { OptimizedProjectImage } from './OptimizedProjectImage';

// Reusable Auto-Rotating Carousel Component for Experience Apps
interface ExperienceAppsCarouselProps {
  projectIds: string[];
  companyName: string;
}

const ExperienceAppsCarousel: React.FC<ExperienceAppsCarouselProps> = ({ projectIds, companyName }) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects in the specified order
  const projects = projectIds
    .map(id => PUBLISHED_APPS.find(p => p.id === id))
    .filter((p): p is Project => Boolean(p));

  const total = projects.length;

  // Auto-scroll loop ("aa fariya karvu joye")
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setScrollIndex(prev => (prev + 1) % total);
    }, 3200);

    return () => clearInterval(timer);
  }, [isPaused, total]);

  // Sync horizontal scroll position when scrollIndex changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const card = container.children[scrollIndex] as HTMLElement | undefined;
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth'
      });
    }
  }, [scrollIndex]);

  const handleNext = () => {
    setScrollIndex(prev => (prev + 1) % total);
  };

  const handlePrev = () => {
    setScrollIndex(prev => (prev - 1 + total) % total);
  };

  if (total === 0) return null;

  return (
    <div 
      className="mt-6 pt-5 border-t border-blue-100/80 dark:border-blue-900/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Header with Title and Rotating Controls */}
      <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
          <span className="text-xs font-bold text-[#0B1B3D] dark:text-white uppercase tracking-wider">
            Key Apps Engineered at {companyName} ({total} Apps)
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/80 text-[10px] text-[#0d6efd] dark:text-blue-400 font-semibold border border-blue-200/60 dark:border-blue-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Auto-rotating
          </span>
        </div>

        {/* Carousel Navigation buttons & indicator */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 mr-1">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setScrollIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  idx === scrollIndex 
                    ? 'w-5 bg-[#0d6efd] dark:bg-blue-400' 
                    : 'w-1.5 bg-blue-200 dark:bg-blue-900 hover:bg-blue-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
            aria-label={isPaused ? "Play animation" : "Pause animation"}
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
          >
            {isPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
          </button>

          <button
            onClick={handlePrev}
            aria-label="Previous app"
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#0d6efd] hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next app"
            className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#0d6efd] hover:text-white dark:hover:bg-blue-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRightIcon className="w-4 h-4" />
          </button>

          <Link 
            to="/projects"
            className="ml-2 text-[11px] font-bold text-[#0d6efd] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Explore all</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Horizontally scrolling track with momentum and smooth scrolling */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project, idx) => {
          const firstScreen = project.screenshots && project.screenshots[0] 
            ? project.screenshots[0] 
            : '/images/projects/hira-diary/screen-01.webp';
          const isSelected = idx === scrollIndex;

          return (
            <div
              key={project.id}
              onClick={() => setScrollIndex(idx)}
              className={`snap-start shrink-0 w-[260px] sm:w-[280px] p-3 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                isSelected 
                  ? 'border-[#0d6efd] shadow-[0_8px_25px_-5px_rgba(13,110,253,0.25)] ring-2 ring-[#0d6efd]/30 scale-[1.01]' 
                  : 'border-blue-100 dark:border-blue-900/60 hover:border-[#0d6efd]/50 opacity-90 hover:opacity-100'
              }`}
            >
              <div>
                {/* App Header */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  {project.iconUrl ? (
                    <img 
                      src={project.iconUrl} 
                      alt={`${project.name} app icon`}
                      className="w-8 h-8 rounded-xl object-cover border border-blue-100 dark:border-blue-800 shadow-2xs shrink-0"
                      loading="lazy"
                      width={32}
                      height={32}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 flex items-center justify-center shrink-0">
                      <Smartphone className="w-4 h-4 text-[#0d6efd]" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#0B1B3D] dark:text-white truncate">
                      {project.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                      {project.platform.join(' • ')}
                    </span>
                  </div>
                </div>

                {/* Embedded Phone Mockup */}
                <div className="py-1 flex justify-center">
                  <PhoneMockup 
                    screenshotUrl={firstScreen}
                    appName={project.name}
                    accentColor={project.accentColor}
                    size="sm"
                    interactive={true}
                    badge="Live on Play Store"
                    className="scale-90 sm:scale-95 origin-center"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 pt-2.5 border-t border-blue-100/60 dark:border-blue-900/50 flex items-center justify-between text-[11px]">
                <Link
                  to={`/projects/${project.id}`}
                  className="font-bold text-[#0d6efd] dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${project.name} on Google Play Store`}
                    className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-[#0d6efd] dark:text-blue-300 border border-blue-200/80 dark:border-blue-800 text-[10.5px] font-semibold hover:bg-[#0d6efd] hover:text-white transition-colors flex items-center gap-1"
                  >
                    <span>Google Play</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Simple ChevronRight icon helper
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

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

                    {/* Associated Production Applications with Auto-Rotating Phone Mockup Carousel */}
                    {exp.associatedProjectIds && exp.associatedProjectIds.length > 0 && (
                      <ExperienceAppsCarousel 
                        projectIds={exp.associatedProjectIds}
                        companyName={exp.company}
                      />
                    )}

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
