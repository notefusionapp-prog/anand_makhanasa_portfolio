import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { OptimizedProjectImage } from './OptimizedProjectImage';

interface PhoneMockupProps {
  screenshotUrl?: string;
  appName?: string;
  accentColor?: string;
  interactive?: boolean;
  floating?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  badge?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  // Kept for backward compatibility
  type?: string;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ 
  screenshotUrl = '/images/projects/hira-diary/screen-01.webp',
  appName = 'Flutter Mobile App',
  accentColor = '#0d6efd',
  interactive = true,
  floating = false,
  size = 'md',
  className = '',
  onClick,
  badge,
  loading = 'lazy',
  fetchPriority,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(9 / 16);

  // Automatically detect screenshot's natural proportions (e.g. 9:16 or 9:20) so NO text is ever clipped
  useEffect(() => {
    if (!screenshotUrl) return;
    const img = new Image();
    img.src = screenshotUrl;
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight);
      }
    };
  }, [screenshotUrl]);

  // Subtle 3D tilt tracking with spring physics (restrained 3-5 degrees max)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 220 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseClientX = e.clientX - rect.left;
    const mouseClientY = e.clientY - rect.top;
    mouseX.set(mouseClientX / width - 0.5);
    mouseY.set(mouseClientY / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Proportional dimensions based on size prop - adaptive aspect ratio ensures zero text cutoff
  const sizeClasses = {
    sm: 'w-[185px] sm:w-[210px] rounded-[28px] p-2 border-[3.5px]',
    md: 'w-[255px] sm:w-[280px] md:w-[300px] rounded-[32px] p-2.5 border-[4px]',
    lg: 'w-[285px] sm:w-[320px] md:w-[340px] rounded-[36px] p-3 border-[4.5px]',
  };

  const screenRadiusClasses = {
    sm: 'rounded-[18px]',
    md: 'rounded-[22px]',
    lg: 'rounded-[26px]',
  };

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Soft Atmospheric Studio Glow */}
      <div 
        className="absolute inset-2 rounded-full blur-2xl opacity-15 dark:opacity-25 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: accentColor }}
      />

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          aspectRatio: `${aspectRatio}`,
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={floating ? {
          y: [0, -5, 0],
        } : {}}
        transition={floating ? {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        } : {}}
        whileHover={interactive ? {
          y: -4,
          scale: 1.015,
          transition: { duration: 0.25, ease: 'easeOut' }
        } : {}}
        className={`relative z-10 bg-slate-900 dark:bg-slate-950 border-slate-700/80 dark:border-slate-800 shadow-[0_18px_45px_-12px_rgba(15,23,42,0.25)] dark:shadow-[0_22px_55px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${sizeClasses[size]} ${onClick ? 'cursor-pointer' : ''}`}
      >
        {/* Subtle Metallic Bevel Glare */}
        <div className="absolute inset-0 rounded-[28px] pointer-events-none border border-white/12 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

        {/* Physical Side Buttons Silhouettes */}
        <div className="absolute -left-[5.5px] top-20 w-[2.5px] h-7 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[5.5px] top-30 w-[2.5px] h-7 bg-slate-700 rounded-l-xs" />
        <div className="absolute -right-[5.5px] top-24 w-[2.5px] h-12 bg-slate-700 rounded-r-xs" />

        {/* Sleek Top Speaker & Camera in Bezel (Outside active screen area - prevents cutting top text) */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 pointer-events-none">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-950 border border-slate-800" />
          <div className="w-7 h-1 bg-slate-800/90 rounded-full" />
        </div>

        {/* Screen Bezel Container with complete image visibility */}
        <div className={`relative w-full h-full overflow-hidden bg-black flex items-center justify-center ${screenRadiusClasses[size]}`}>
          
          {/* Optimized Real Application UI Screenshot */}
          <OptimizedProjectImage
            src={screenshotUrl}
            alt={`${appName} Real App UI`}
            loading={loading}
            decoding="async"
            fetchPriority={fetchPriority}
            objectFit="contain"
            className="w-full h-full"
          />

          {/* Physical Glass Reflection Angle (Subtle Apple-style studio sheen) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />

          {/* Bottom Home Indicator Bar */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/35 rounded-full z-20 pointer-events-none backdrop-blur-xs" />

          {/* Optional Badge (e.g. "Live App" or "Flutter 3.x") */}
          {badge && (
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-medium text-white/90 border border-white/10 z-20 shadow-xs">
              {badge}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
