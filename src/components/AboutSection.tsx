import React from 'react';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  Languages, 
  MapPin, 
  Smartphone, 
  Layers, 
  Cpu, 
  Zap, 
  CheckCircle2,
  FileText
} from 'lucide-react';
import { PERSONAL_INFO, EDUCATION_LIST } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenResume: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="about" className="py-24 bg-[#fbfdff] dark:bg-[#070d1e] border-t border-blue-100/60 dark:border-blue-950/60 relative transition-colors duration-300 overflow-hidden">
      {/* Modern background decorative ring */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 border border-blue-100/50 dark:border-blue-900/20 rounded-full opacity-60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern-style Section Header with horizontal line eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 tracking-widest uppercase">
              ABOUT THE DEVELOPER
            </span>
            <div className="w-12 h-[2px] bg-[#0d6efd]/30" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Crafting Resilient Cross-Platform Software
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#475569] dark:text-slate-400 leading-relaxed">
            Focused on Flutter and modern Dart architecture for over 2.5 years, transforming complex business logic and Figma prototypes into fluid, high-performing mobile experiences.
          </p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Background, Core Mindset, Education */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            
            {/* Story & Background Card (Modern Style) */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-white dark:bg-[#0f1f42] border border-blue-100/80 dark:border-blue-900/60 shadow-[0_4px_25px_rgba(11,27,61,0.04)] space-y-4">
              <h3 className="text-xl font-bold text-[#0B1B3D] dark:text-white tracking-tight flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d6efd]" />
                <span>Professional Background</span>
              </h3>
              
              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                I am a dedicated <strong className="text-[#0B1B3D] dark:text-white font-bold">Senior Flutter &amp; Mobile Application Developer</strong> based in Surat, Gujarat, with over 2.5 years of hands-on software development experience. My primary focus is building robust, production-grade applications that maintain 60fps UI performance across both Android and iOS devices.
              </p>

              <p className="text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                Throughout my career at <span className="text-[#0d6efd] dark:text-blue-400 font-semibold">CodExpert Solutions</span> and <span className="text-[#0d6efd] dark:text-blue-400 font-semibold">Globalia Soft LLP</span>, I have engineered diverse applications—from diamond valuation ledger systems (<em className="text-[#0B1B3D] dark:text-slate-200">Hira Diary</em>) and financial vault notes (<em className="text-[#0B1B3D] dark:text-slate-200">Smart NoteFusion</em>) to live health & fitness platforms (<em className="text-[#0B1B3D] dark:text-slate-200">Vyonic</em>) with Socket.IO real-time data sync and Razorpay payments.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                  <span>Surat, Gujarat, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                  <span>Languages: English, Hindi, Gujarati</span>
                </div>
              </div>
            </div>

            {/* Verified Education History */}
            <div className="p-6 sm:p-8 rounded-[24px] bg-white dark:bg-[#0f1f42] border border-blue-100/80 dark:border-blue-900/60 shadow-[0_4px_25px_rgba(11,27,61,0.04)]">
              <h3 className="text-lg font-bold text-[#0B1B3D] dark:text-white tracking-tight flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#f0f6ff] dark:bg-blue-950/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 border border-blue-100 dark:border-blue-900/60">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>Academic Credentials</span>
              </h3>

              <div className="space-y-4">
                {EDUCATION_LIST.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#f8fbff] dark:bg-[#0a142c] border border-blue-100/70 dark:border-blue-900/40">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h4 className="text-sm font-bold text-[#0B1B3D] dark:text-white">{edu.degree}</h4>
                      <span className="font-mono text-xs font-semibold text-[#0d6efd] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-blue-200/80 dark:border-blue-800/40">
                        {edu.duration}
                      </span>
                    </div>

                    <div className="text-xs text-[#475569] dark:text-slate-300 mt-1">{edu.institution}</div>
                    
                    <div className="mt-2 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-3 gap-y-1">
                      <span className="text-[#10b981] font-semibold">{edu.scores}</span>
                      <span className="text-slate-400 dark:text-slate-500">• {edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: "What I Bring To Teams" Bento Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            
            <div className="p-6 sm:p-7 rounded-[24px] bg-white dark:bg-[#0f1f42] border border-blue-100/80 dark:border-blue-900/60 shadow-[0_4px_25px_rgba(11,27,61,0.04)] space-y-5">
              <h3 className="text-lg font-bold text-[#0B1B3D] dark:text-white tracking-tight">
                What I Do Best
              </h3>

              <div className="space-y-3.5 text-xs">
                
                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#0a142c] border border-blue-100/70 dark:border-blue-900/40 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] dark:text-white text-xs">Figma to Flutter Pixel Perfection</h4>
                    <p className="text-[#475569] dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      Exact translation of complex UI designs into responsive, adaptive widgets that behave natively on iOS & Android.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#0a142c] border border-blue-100/70 dark:border-blue-900/40 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] dark:text-white text-xs">Clean Architecture & State Management</h4>
                    <p className="text-[#475569] dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      Production-tested with Bloc, Cubit, GetX, and Riverpod. Strict separation of Data, Domain, and Presentation layers.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#0a142c] border border-blue-100/70 dark:border-blue-900/40 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/60 flex items-center justify-center text-[#0d6efd] dark:text-blue-400 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] dark:text-white text-xs">Real-Time Sync & Native Hardware</h4>
                    <p className="text-[#475569] dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      Socket.IO bi-directional streaming, Firebase Push Notifications, Google Maps geolocation, and biometric authentication.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 3 }}
                  className="flex gap-3.5 p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#0a142c] border border-blue-100/70 dark:border-blue-900/40 transition-colors hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center text-[#10b981] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0B1B3D] dark:text-white text-xs">App Store & Play Store Deployment</h4>
                    <p className="text-[#475569] dark:text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                      End-to-end release lifecycle: signing keys, App Bundle generation, TestFlight testing, and Google Play Console publishing.
                    </p>
                  </div>
                </motion.div>

              </div>

              {/* View Resume Action (Modern Style Pill) */}
              <div className="pt-2">
                <motion.button
                  onClick={onOpenResume}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  className="w-full py-3 px-5 rounded-full bg-[#f0f6ff] hover:bg-blue-100/80 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/80 text-xs font-bold text-[#0d6efd] dark:text-blue-300 flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0d6efd] dark:text-blue-400" />
                  <span>View Official Verified Resume</span>
                </motion.button>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
