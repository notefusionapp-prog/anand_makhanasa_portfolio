import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2, Layers, Eye } from 'lucide-react';
import { OptimizedProjectImage } from './OptimizedProjectImage';

interface ProjectPhoneShowcaseProps {
  screenshots?: string[];
  appName: string;
  accentColor?: string;
  category?: string;
  isReversed?: boolean;
  isAboveTheFold?: boolean;
  onOpenDetail?: () => void;
}

export const ProjectPhoneShowcase: React.FC<ProjectPhoneShowcaseProps> = ({
  screenshots,
  appName,
  accentColor = '#0d6efd',
  category,
  isReversed = false,
  isAboveTheFold = false,
  onOpenDetail,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(9 / 16);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fallback to prevent any broken state
  const validScreenshots = screenshots && screenshots.length > 0 
    ? screenshots 
    : ['/images/projects/hira-diary/screen-01.webp'];

  const total = validScreenshots.length;
  const currentScreenshot = validScreenshots[activeIndex];
  
  // Calculate exact image aspect ratio so NO text or edge graphics are ever cut off
  useEffect(() => {
    if (!currentScreenshot) return;
    const img = new Image();
    img.src = currentScreenshot;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [currentScreenshot]);
  
  // Secondary screenshot indexes (different real screens from the SAME app)
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;
  const leftScreenshot = validScreenshots[prevIndex];
  const rightScreenshot = validScreenshots[nextIndex];

  // Subtle 3D tilt tracking with spring physics (restrained 4 degrees max)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 26, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / width - 0.5);
    mouseY.set(y / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D Composition Smartphone Stage */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[360px] sm:max-w-[480px] md:max-w-[530px] aspect-[10/15] sm:aspect-[10/15] flex items-center justify-center p-2"
        style={{ perspective: 1200 }}
      >
        {/* Soft Atmospheric Glow Behind Center Phone */}
        <div 
          className="absolute inset-4 rounded-full blur-3xl opacity-15 dark:opacity-25 pointer-events-none transition-all duration-700"
          style={{ backgroundColor: accentColor }}
        />

        {/* 1. Left Secondary Phone (Behind Left, Spread Out & Angled) */}
        {total >= 2 && (
          <motion.div
            initial={false}
            animate={{
              x: total === 2 ? (isReversed ? 165 : -165) : -165,
              y: 8,
              rotateZ: total === 2 ? (isReversed ? 8 : -8) : -8,
              scale: 0.88,
              opacity: 0.92,
            }}
            whileHover={{
              x: total === 2 ? (isReversed ? 185 : -185) : -185,
              y: 0,
              opacity: 1,
              scale: 0.92,
              transition: { duration: 0.25 }
            }}
            onClick={() => setActiveIndex(prevIndex)}
            className="hidden sm:block absolute cursor-pointer z-0 drop-shadow-2xl"
            title={`Click to view screen ${prevIndex + 1}`}
          >
            <div className="w-[185px] md:w-[200px] aspect-[9/16] rounded-[28px] p-2 bg-slate-900 border-[3.5px] border-slate-700/80 shadow-2xl overflow-hidden relative">
              <div className="w-full h-full rounded-[20px] overflow-hidden bg-black flex items-center justify-center">
                <OptimizedProjectImage 
                  src={leftScreenshot} 
                  alt={`${appName} screen ${prevIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-slate-950/15 hover:bg-transparent transition-colors rounded-[28px]" />
              <div className="absolute bottom-2 inset-x-2 py-1 px-2 rounded-lg bg-black/85 backdrop-blur-xs text-[10px] text-white/95 text-center font-medium truncate border border-white/10 shadow-xs">
                Screen {prevIndex + 1}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Right Secondary Phone (Behind Right, Spread Out & Angled for apps with 3+ screens) */}
        {total >= 3 && (
          <motion.div
            initial={false}
            animate={{
              x: 165,
              y: 8,
              rotateZ: 8,
              scale: 0.88,
              opacity: 0.92,
            }}
            whileHover={{
              x: 185,
              y: 0,
              opacity: 1,
              scale: 0.92,
              transition: { duration: 0.25 }
            }}
            onClick={() => setActiveIndex(nextIndex)}
            className="hidden sm:block absolute cursor-pointer z-0 drop-shadow-2xl"
            title={`Click to view screen ${nextIndex + 1}`}
          >
            <div className="w-[185px] md:w-[200px] aspect-[9/16] rounded-[28px] p-2 bg-slate-900 border-[3.5px] border-slate-700/80 shadow-2xl overflow-hidden relative">
              <div className="w-full h-full rounded-[20px] overflow-hidden bg-black flex items-center justify-center">
                <OptimizedProjectImage 
                  src={rightScreenshot} 
                  alt={`${appName} screen ${nextIndex + 1}`}
                  loading="lazy"
                  decoding="async"
                  objectFit="contain"
                  className="w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-slate-950/15 hover:bg-transparent transition-colors rounded-[28px]" />
              <div className="absolute bottom-2 inset-x-2 py-1 px-2 rounded-lg bg-black/85 backdrop-blur-xs text-[10px] text-white/95 text-center font-medium truncate border border-white/10 shadow-xs">
                Screen {nextIndex + 1}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Primary Center Foreground Smartphone (Hero) */}
        <motion.div
          style={{
            aspectRatio: `${aspectRatio}`,
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{
            y: -5,
            scale: 1.015,
            transition: { duration: 0.25, ease: 'easeOut' }
          }}
          className="relative z-10 w-[250px] sm:w-[275px] md:w-[295px] rounded-[32px] p-2.5 sm:p-3 bg-slate-900 dark:bg-slate-950 shadow-[0_20px_45px_-10px_rgba(15,23,42,0.3)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] border-[4px] sm:border-[4.5px] border-slate-700/80 ring-1 ring-white/10 group cursor-pointer"
          onClick={() => onOpenDetail ? onOpenDetail() : setIsZoomOpen(true)}
        >
          {/* Subtle Metallic Specular Highlight */}
          <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/15 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />

          {/* Physical Side Buttons */}
          <div className="absolute -left-[5.5px] top-22 w-[2.5px] h-8 bg-slate-700 rounded-l-xs" />
          <div className="absolute -left-[5.5px] top-33 w-[2.5px] h-8 bg-slate-700 rounded-l-xs" />
          <div className="absolute -right-[5.5px] top-26 w-[2.5px] h-13 bg-slate-700 rounded-r-xs" />

          {/* Sleek Top Speaker & Camera in Bezel (Outside active screen area - prevents cutting top text) */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-800" />
            <div className="w-7 h-1 bg-slate-800/90 rounded-full" />
          </div>

          {/* Inner Phone Screen Display with Exact Proportions and Complete Text Visibility */}
          <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-black flex items-center justify-center">
            
            {/* Real Unaltered Screenshot with Smooth Motion Transition - object-contain ensures ZERO text cutoff */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative w-full h-full flex items-center justify-center bg-black"
              >
                <OptimizedProjectImage
                  src={currentScreenshot}
                  alt={`${appName} real screen ${activeIndex + 1}`}
                  loading={isAboveTheFold && activeIndex === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={isAboveTheFold && activeIndex === 0 ? 'high' : 'auto'}
                  objectFit="contain"
                  className="w-full h-full select-none pointer-events-none"
                />

                {/* Subtle Tap to Zoom / View Detail overlay chip */}
                <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/80 text-white/95 text-[10px] font-bold backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 border border-white/15 shadow-sm">
                  <Maximize2 className="w-3 h-3 text-[#0d6efd]" />
                  <span>Inspect</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Subtle Glass Reflection Sheen */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />

            {/* In-Frame Cycling Buttons */}
            {total > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 sm:group-hover:opacity-100 transition-all z-20 shadow-md"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center backdrop-blur-md opacity-0 sm:group-hover:opacity-100 transition-all z-20 shadow-md"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-white/35 rounded-full z-20 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Screenshot Switcher / Carousel Controls with ● ○ ○ ○ Indicators */}
      <div className="w-full max-w-[340px] sm:max-w-[380px] mt-2 flex items-center justify-between gap-2 px-2">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={total <= 1}
          className="px-3 py-1 rounded-full text-xs font-semibold text-[#0B1B3D] dark:text-slate-300 hover:text-[#0d6efd] bg-white dark:bg-[#0f1f42] border border-blue-100 dark:border-blue-900/60 flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Bullet Pagination Indicators: ● ○ ○ ○ */}
        <div className="flex items-center gap-2">
          {validScreenshots.map((_, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-6 h-2 bg-[#0d6efd] dark:bg-blue-400'
                    : 'w-2 h-2 bg-blue-200 dark:bg-blue-900 hover:bg-blue-300'
                }`}
                aria-label={`Go to screenshot ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={total <= 1}
          className="px-3 py-1 rounded-full text-xs font-semibold text-[#0B1B3D] dark:text-slate-300 hover:text-[#0d6efd] bg-white dark:bg-[#0f1f42] border border-blue-100 dark:border-blue-900/60 flex items-center gap-1 transition-all disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Screen Counter & Authentic Label */}
      <div className="mt-1.5 flex items-center justify-center gap-2 text-[11px] text-[#475569] dark:text-slate-400 font-medium">
        <span className="flex items-center gap-1">
          <Eye className="w-3 h-3 text-[#0d6efd]" />
          <span>Real App UI • Screen {activeIndex + 1} of {total}</span>
        </span>
      </div>

      {/* Modal Zoom View to inspect untouched full screenshot */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-lg max-h-[90vh] rounded-[24px] overflow-hidden shadow-2xl bg-black border border-white/20 p-3"
            >
              <div className="max-h-[80vh] w-auto mx-auto rounded-xl overflow-hidden flex items-center justify-center">
                <OptimizedProjectImage
                  src={currentScreenshot}
                  alt={`${appName} full screenshot`}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  objectFit="contain"
                  className="max-h-[80vh] w-auto mx-auto select-none pointer-events-auto"
                />
              </div>
              <div className="mt-3 text-center text-xs text-white/90 flex items-center justify-between px-3 py-1.5 bg-white/5 rounded-xl border border-white/10">
                <span className="font-bold">{appName}</span>
                <span className="font-mono text-blue-300">Screen {activeIndex + 1}/{total}</span>
                <button
                  onClick={() => setIsZoomOpen(false)}
                  className="px-3 py-1 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-bold cursor-pointer transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
