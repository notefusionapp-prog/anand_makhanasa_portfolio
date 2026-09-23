import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Download, 
  ShieldCheck, 
  Sparkles,
  Award,
  Upload,
  Camera,
  RotateCcw,
  CheckCircle2,
  Smartphone
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  // Primary profile image from user's imgbb link with local high-res fallbacks
  const IBB_PHOTO_URL = 'https://i.ibb.co/ksdfXGZ5/image.png';
  const LOCAL_PROFILE_WEBP = '/profile.webp';
  const LOCAL_PROFILE_PHOTO = '/profile.png';
  const LOCAL_OPT_PHOTO = '/assets/anand-makhanasa-opt.jpg';
  const LOCAL_FULL_PHOTO = '/assets/anand-makhanasa.png';

  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    return localStorage.getItem('anand_profile_photo_v5') || IBB_PHOTO_URL;
  });
  const [fallbackAttempt, setFallbackAttempt] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fallback chain: ImgBB -> Local WebP -> Local PNG -> Local Opt -> Local Full
  const handleImageError = () => {
    if (fallbackAttempt === 0) {
      setFallbackAttempt(1);
      setProfilePhoto(LOCAL_PROFILE_WEBP);
    } else if (fallbackAttempt === 1) {
      setFallbackAttempt(2);
      setProfilePhoto(LOCAL_PROFILE_PHOTO);
    } else if (fallbackAttempt === 2) {
      setFallbackAttempt(3);
      setProfilePhoto(LOCAL_OPT_PHOTO);
    } else if (fallbackAttempt === 3) {
      setFallbackAttempt(4);
      setProfilePhoto(LOCAL_FULL_PHOTO);
    }
  };

  // Helper to process uploaded file (from input or drag-and-drop)
  const processImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfilePhoto(result);
          try {
            localStorage.setItem('anand_profile_photo_v3', result);
          } catch {
            // Storage quota handled gracefully
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('anand_profile_photo_v3');
    setProfilePhoto(IBB_PHOTO_URL);
    setFallbackAttempt(0);
  };

  const isCustomPhoto = profilePhoto !== IBB_PHOTO_URL && profilePhoto !== LOCAL_OPT_PHOTO && profilePhoto !== LOCAL_FULL_PHOTO;

  // Motion variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[92vh] pt-32 pb-16 lg:pt-38 lg:pb-24 flex items-center overflow-hidden bg-[#fbfdff] dark:bg-[#070d1e] transition-colors duration-300"
    >
      {/* Sridix Signature Concentric Geometric Background Rings */}
      <div className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[620px] h-[620px] border border-blue-100/70 dark:border-blue-900/30 rounded-full opacity-60 pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-[0%] -translate-y-1/2 w-[880px] h-[880px] border border-blue-50/70 dark:border-blue-950/40 rounded-full opacity-50 pointer-events-none -z-10" />
      <div className="absolute top-20 right-24 w-3 h-3 bg-[#0d6efd] rounded-full opacity-40 pointer-events-none -z-10" />
      <div className="absolute bottom-24 left-16 w-2.5 h-2.5 bg-[#0d6efd] rounded-full opacity-35 pointer-events-none -z-10" />

      {/* Sridix Ambient Blue Light Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[400px] bg-gradient-to-tr from-[#0d6efd]/10 via-[#2b85ff]/8 to-transparent dark:from-[#0d6efd]/15 dark:via-blue-600/10 dark:to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#0d6efd]/5 dark:bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Subtle Sridix dot grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.03] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#0d6efd 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Typography & Direct CTAs */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-start text-left"
          >
            
            {/* Sridix Style Pill Eyebrow */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f0f6ff] dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/80 text-xs font-semibold text-[#0d6efd] dark:text-blue-400 mb-6 shadow-xs"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d6efd] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d6efd]" />
              </span>
              <span className="text-[#0B1B3D] dark:text-white uppercase tracking-wider text-[11px] font-bold">
                Flutter Developer
              </span>
              <span className="text-blue-300 dark:text-blue-800">•</span>
              <span className="text-[#0d6efd] dark:text-blue-400 font-mono font-semibold">
                2.5+ Years Experience
              </span>
            </motion.div>

            {/* Primary H1: Anand Makhanasa — Senior Flutter & Mobile Application Developer */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight leading-[1.08]"
            >
              Anand Makhanasa
              <span className="block mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-[#0d6efd] dark:text-blue-400 tracking-tight">
                Senior Flutter &amp; Mobile Application Developer
              </span>
            </motion.h1>

            {/* SEO & Human-Readable Hero Introduction */}
            <motion.p 
              variants={itemVariants}
              className="mt-5 text-base sm:text-lg text-[#475569] dark:text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              Senior Flutter &amp; Mobile Application Developer building high-performance, cross-platform Android &amp; iOS applications with Flutter, Dart, Firebase, REST APIs, and Bloc/Cubit architecture. Proud developer with 8 published production applications on the Google Play Store.
            </motion.p>

            {/* Verified Credentials Checklist */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 flex flex-wrap gap-y-2 gap-x-4 text-xs text-[#475569] dark:text-slate-300 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                <span>8 Published Apps</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0d6efd] dark:text-blue-400 shrink-0" />
                <span>Bloc, GetX & Riverpod</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0d6efd] dark:text-blue-400 shrink-0" />
                <span>Real-Time WebSockets & Razorpay</span>
              </div>
            </motion.div>

            {/* Action Buttons: Sridix Rounded Pill CTAs */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto"
            >
              <a
                href="#published-apps"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-bold text-sm shadow-[0_10px_25px_rgba(13,110,253,0.25)] hover:shadow-[0_14px_30px_rgba(13,110,253,0.35)] transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50/70 dark:hover:bg-blue-900/40 text-[#0B1B3D] dark:text-white border border-blue-200/90 dark:border-blue-800/80 font-semibold text-sm shadow-xs transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                <span>Download Resume</span>
              </button>
            </motion.div>

            {/* Quick Metrics */}
            <motion.div 
              variants={itemVariants}
              className="mt-10 pt-6 border-t border-blue-100/80 dark:border-blue-900/60 grid grid-cols-3 gap-6 w-full max-w-lg"
            >
              <div>
                <div className="font-mono text-2xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">2.5+</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Years Experience</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-extrabold text-[#10b981] tracking-tight">8</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Published Store Apps</div>
              </div>
              <div>
                <div className="font-mono text-2xl font-extrabold text-[#0d6efd] dark:text-blue-400 tracking-tight">100%</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Production Code</div>
              </div>
            </motion.div>

          </motion.div>

          {/* Right Hero Column: Primary Profile Image Presentation Area (Replaces Device Mockups) */}
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative select-none"
          >
            {/* Ambient Radial Backlight */}
            <div className="absolute w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full bg-gradient-to-tr from-[#0d6efd]/20 via-blue-500/15 to-transparent dark:from-[#0d6efd]/25 dark:via-blue-600/15 blur-3xl pointer-events-none -z-10" />

            {/* Main Floating Portrait Container with Drag & Drop */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ y: -9, scale: 1.012, transition: { duration: 0.25 } }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative p-3 sm:p-4 rounded-[34px] sm:rounded-[38px] bg-white/85 dark:bg-[#0c1938]/85 backdrop-blur-xl border ${
                isDragging 
                  ? 'border-[#0d6efd] ring-4 ring-blue-500/30' 
                  : 'border-blue-200/80 dark:border-blue-800/60'
              } shadow-[0_20px_60px_-15px_rgba(13,110,253,0.18)] dark:shadow-[0_25px_65px_-15px_rgba(0,0,0,0.65)] ring-1 ring-white/40 dark:ring-white/5 transition-all group`}
            >
              {/* Inner Frame with 3:4 Aspect Ratio preserving exact camera portrait proportions */}
              <div className="relative w-[280px] sm:w-[325px] md:w-[355px] aspect-[3/4] rounded-[26px] sm:rounded-[30px] overflow-hidden bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-inner">
                
                {/* The Profile Portrait Image */}
                <img 
                  src={profilePhoto} 
                  alt="Anand Makhanasa — Senior Flutter & Mobile Application Developer" 
                  width={355}
                  height={473}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  onLoad={() => setIsImageLoaded(true)}
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover object-[center_18%] transition-all duration-700 ease-out group-hover:scale-[1.03] ${
                    isImageLoaded ? 'opacity-100' : 'opacity-90'
                  }`}
                />

                {/* Subtle vignette gradient at bottom for legibility */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Subtle Glass Corner Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[26px] sm:rounded-[30px]" />

                {/* Integrated Name & Role Tag at the bottom of the photo */}
                <div className="absolute bottom-3.5 inset-x-3.5 py-2 px-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 text-white flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="text-xs sm:text-sm font-bold tracking-tight text-white flex items-center gap-1.5 truncate">
                      <span>Anand Makhanasa</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0d6efd] fill-[#0d6efd]/20 shrink-0" />
                    </div>
                    <div className="text-[10px] text-slate-300 font-medium truncate">
                      Senior Flutter & Dart Specialist
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 font-semibold whitespace-nowrap">
                    Surat, IN
                  </span>
                </div>

                {/* Quality of Life: Hidden File Input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
                />

                {/* Prominent & Always-Visible Photo Controls */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30">
                  {isCustomPhoto && (
                    <button
                      onClick={handleResetPhoto}
                      title="Reset to default portrait"
                      className="p-1.5 rounded-full bg-black/75 hover:bg-black text-white/90 hover:text-white backdrop-blur-md border border-white/10 shadow-md transition-transform hover:scale-110 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload or change profile photo"
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black text-white/95 backdrop-blur-md border border-white/15 shadow-md text-[10.5px] font-semibold transition-all hover:scale-105 cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                {/* Drag-over active overlay */}
                {isDragging && (
                  <div className="absolute inset-0 bg-[#0d6efd]/80 backdrop-blur-sm flex flex-col items-center justify-center text-white z-40 p-4 text-center">
                    <Upload className="w-10 h-10 mb-2 animate-bounce" />
                    <span className="font-bold text-sm">Drop your photo here</span>
                    <span className="text-[11px] text-blue-100">Supports JPG, PNG & WebP</span>
                  </div>
                )}
              </div>

              {/* Floating Badge 1: Top-Right "Senior Flutter Specialist" */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-blue-100 dark:border-blue-900/60 shadow-xl rounded-2xl px-3.5 py-2 flex items-center gap-2.5 z-20"
              >
                <div className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                    Production Flutter Lead
                  </div>
                  <div className="text-[9.5px] text-slate-500 dark:text-slate-400 font-medium leading-tight">
                    Cross-Platform iOS & Android
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 2: Bottom-Left "8+ Published Apps" */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-blue-100 dark:border-blue-900/60 shadow-xl rounded-2xl px-3.5 py-2.5 flex items-center gap-3 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f0f6ff] dark:bg-blue-950/70 border border-blue-200/80 dark:border-blue-800/80 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shadow-xs">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">8 Published Apps</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                      Live
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    Google Play Store & App Store
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Subtle Career Tagline Pill Under Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400" />
              <span className="font-medium">Clean Architecture</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium">Bloc & Riverpod</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-medium">WebSockets & APIs</span>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
