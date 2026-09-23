import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Building2, 
  ChevronLeft, 
  ChevronRight, 
  Tag, 
  Maximize2,
  Calendar,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Project } from '../data/portfolioData';
import { OptimizedProjectImage } from './OptimizedProjectImage';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(9 / 16);

  const screenshots = project?.screenshots && project.screenshots.length > 0 
    ? project.screenshots 
    : ['/assets/projects/hira-diary/screenshot-1.jpg'];

  const totalScreens = screenshots.length;
  const currentScreen = screenshots[activeScreenIndex];

  // Detect image aspect ratio dynamically to prevent any text clipping
  useEffect(() => {
    if (!currentScreen) return;
    const img = new Image();
    img.src = currentScreen;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [currentScreen]);

  if (!isOpen || !project) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveScreenIndex((prev) => (prev === 0 ? totalScreens - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveScreenIndex((prev) => (prev === totalScreens - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Modal Header Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/40 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {project.iconUrl && (
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0">
                  <OptimizedProjectImage 
                    src={project.iconUrl} 
                    alt="" 
                    width={36}
                    height={36}
                    loading="eager"
                    decoding="async"
                    objectFit="cover"
                    className="w-full h-full"
                    containerClassName="w-full h-full !bg-transparent"
                  />
                </div>
              )}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {project.companyConnection ? `Associated with ${project.companyConnection}` : 'Independent Production Release'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body: Scrollable Content Grid */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Large Smartphone Mockup with Real App Screenshot */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div 
                  style={{ aspectRatio: `${aspectRatio}` }}
                  className="relative w-[245px] sm:w-[280px] rounded-[32px] p-2.5 bg-slate-900 shadow-2xl border-[4px] border-slate-700/80 ring-1 ring-white/10 group select-none"
                >
                  {/* Glass Glare */}
                  <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/10 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

                  {/* Sleek Top Speaker & Camera in Bezel (Outside active screen area - prevents cutting top text) */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-800" />
                    <div className="w-7 h-1 bg-slate-800/90 rounded-full" />
                  </div>

                  {/* Inner Real Screenshot Container */}
                  <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeScreenIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-full flex items-center justify-center cursor-zoom-in"
                        onClick={() => setIsZoomed(true)}
                      >
                        <OptimizedProjectImage
                          src={currentScreen}
                          alt={`${project.name} screen ${activeScreenIndex + 1}`}
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                          objectFit="contain"
                          className="w-full h-full"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Arrows inside frame */}
                    {totalScreens > 1 && (
                      <>
                        <button
                          onClick={handlePrev}
                          className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleNext}
                          className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 sm:group-hover:opacity-100 transition-all z-20 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </>
                    )}

                    {/* Home bar */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-white/35 rounded-full z-20 pointer-events-none" />
                  </div>
                </div>

                {/* Screenshot Thumbnails Strip */}
                <div className="mt-4 flex items-center gap-2">
                  {screenshots.map((shot, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => setActiveScreenIndex(sIdx)}
                      className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeScreenIndex === sIdx
                          ? 'border-[#0d6efd] scale-105 shadow-sm'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{ width: '38px', height: '56px' }}
                    >
                      <OptimizedProjectImage 
                        src={shot} 
                        alt="" 
                        loading="lazy"
                        decoding="async"
                        objectFit="contain"
                        className="w-full h-full"
                        containerClassName="w-full h-full" 
                      />
                    </button>
                  ))}
                </div>

                {/* Counter indicator */}
                <div className="mt-2 text-[11px] text-slate-500 font-medium">
                  Real Store UI • Screen {activeScreenIndex + 1} of {totalScreens}
                </div>
              </div>

              {/* Right Column: Case Study Breakdown & Technical Architecture */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Badges & Meta */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-cyan-500/10 text-indigo-700 dark:text-cyan-400 border border-indigo-200 dark:border-cyan-500/20">
                    {project.role}
                  </span>
                  {project.isPublished && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Google Play Published</span>
                    </span>
                  )}
                  {project.platform.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-full text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {p}
                    </span>
                  ))}
                </div>

                {/* Subtitle / Purpose */}
                <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {project.description}
                </p>

                {/* My Technical Contribution */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                    <span>My Technical Contributions & Architecture</span>
                  </h4>
                  <ul className="space-y-2">
                    {project.contribution.map((c, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
                        <span className="text-indigo-600 dark:text-cyan-400 font-bold">✓</span>
                        <span className="leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Store Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-cyan-400" />
                    <span>Store Features & App Capabilities</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: project.accentColor }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Technologies & Libraries</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Google Play Store Link Action */}
                {project.playStoreUrl && (
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs inline-flex items-center gap-2 shadow-sm transition-all"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                      </svg>
                      <span>View on Google Play Store</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-xs text-slate-400 font-mono">
                      Package: {project.playStoreUrl.split('id=')[1]?.split('&')[0]}
                    </span>
                  </div>
                )}

              </div>
            </div>
          </div>
        </motion.div>

        {/* Zoom Lightbox */}
        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            >
              <div className="max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center">
                <OptimizedProjectImage 
                  src={currentScreen} 
                  alt={`${project.name} full view`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  objectFit="contain"
                  className="max-h-[90vh] max-w-[90vw]"
                  containerClassName="max-h-[90vh] max-w-[90vw] !bg-transparent" 
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};
