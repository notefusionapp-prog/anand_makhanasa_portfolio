import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Code, 
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO, WORK_EXPERIENCES, EDUCATION_LIST } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const resumeText = `
ANAND MAKHANASA - FLUTTER DEVELOPER
Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone}
Location: ${PERSONAL_INFO.address}

PROFILE SUMMARY
${PERSONAL_INFO.summary}

PROFESSIONAL SKILLS
- Programming Languages: Dart, C, C++
- Framework & Widgets: Flutter Framework & Widgets, Cross-Platform Development (Android & iOS), Figma to Flutter code
- State Management: Bloc/Cubit, GetX, Provider, Riverpod
- API Integration: RESTful APIs, JSON handling, Socket.IO & Deep Linking
- Backend & Cloud: Firebase (Firestore, Auth, Push Notifications), Supabase, Razorpay Gateway
- Local Storage: Shared Preferences, Hive, SQFlite
- Clean Architecture / SOLID Principles
- Push Notifications & Maps & Location
- Version Control: Git & GitHub
- Deployment: Google Play Console, Apple App Store, TestFlight

WORK EXPERIENCE
1. CodExpert Solutions (April 2026 - Present) - Flutter Developer
- Developed & maintained cross-platform apps using Flutter & Dart for Android & iOS.
- Built pixel-perfect responsive UI from Figma designs.
- Scalable architecture using Bloc/Cubit, GetX, and Riverpod.
- REST APIs, Deep Linking, and Socket.IO for real-time sync & slot management.
- Successfully deployed apps on Google Play Store, App Store & TestFlight.

2. Globalia Soft LLP (April 2024 - March 2026) - Flutter Developer
- Developed cross-platform apps for Android and iOS.
- Astrologer App with real-time chat, video calls, and Razorpay payment gateway.
- E-Learning App featuring video courses, quizzes, and push notifications.
- Firebase Auth (OTP/password) and Firestore real-time data sync.
- Optimized app performance, build times, and widget trees.

EDUCATION
- Bachelor of Computer Application (BCA) | 2021-2024 | Vimal Tormal Poddar BCA College | CGPA: 7.54/10 (75.4%)
- Higher Secondary (GSHSEB) | 2021 | Khodiyar Vidhayalaya | 73%
- Secondary (GSEB) | 2019 | Khodiyar Vidhayalaya | 70%

LANGUAGES
English, Hindi, Gujarati
    `.trim();

    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          {/* Modal Card */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-800 dark:text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Control Bar (Hidden on print) */}
            <div className="no-print p-4 sm:px-6 bg-[#f8fbff] dark:bg-[#070d1e] border-b border-blue-100/70 dark:border-blue-900/60 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d6efd] animate-pulse" />
                <span className="font-extrabold text-sm sm:text-base text-[#0B1B3D] dark:text-slate-200">
                  Anand Makhanasa — Official Resume
                </span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={handleCopyText}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0f1f42] hover:bg-blue-50 dark:hover:bg-blue-900/50 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-[#0B1B3D] dark:text-slate-200 transition-colors cursor-pointer shadow-2xs"
                  title="Copy plain text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#0d6efd]" />}
                  <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                </motion.button>

                <motion.button
                  onClick={handlePrint}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white font-bold text-xs shadow-[0_2px_10px_rgba(13,110,253,0.3)] transition-colors cursor-pointer"
                  title="Print or Save as PDF"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </motion.button>

                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/50 text-slate-500 dark:text-slate-400 hover:text-[#0B1B3D] dark:hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Document Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 md:p-10 space-y-8 bg-white dark:bg-[#0B1B3D] text-[#475569] dark:text-slate-200 custom-scrollbar print:p-0 print:bg-white print:text-black">
              
              {/* Header */}
              <div className="border-b border-blue-100 dark:border-blue-900/60 pb-6 print:border-slate-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] dark:text-white tracking-tight uppercase print:text-black">
                      Anand Makhanasa
                    </h1>
                    <p className="text-[#0d6efd] dark:text-blue-400 font-bold text-base sm:text-lg mt-0.5 tracking-wide print:text-blue-700">
                      FLUTTER DEVELOPER
                    </p>
                  </div>

                  <div className="text-xs space-y-1 text-slate-500 dark:text-slate-400 print:text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400 print:text-black" />
                      <span>{PERSONAL_INFO.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400 print:text-black" />
                      <span>{PERSONAL_INFO.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#0d6efd] dark:text-blue-400 print:text-black" />
                      <span>{PERSONAL_INFO.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Summary */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#0d6efd] dark:text-blue-400 print:text-blue-800 mb-2">
                  Profile Summary
                </h2>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 print:text-slate-800 leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#0d6efd] dark:text-blue-400 print:text-blue-800 mb-3">
                  Technical Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900/60 print:border-slate-300 print:bg-slate-50">
                    <span className="font-bold text-[#0B1B3D] dark:text-white print:text-black block mb-1">Core & Architecture</span>
                    <span className="text-slate-600 dark:text-slate-400 print:text-slate-700 leading-relaxed">
                      Flutter, Dart, C, C++, Figma to Flutter code, Clean Architecture, SOLID Principles, Performance Profiling.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900/60 print:border-slate-300 print:bg-slate-50">
                    <span className="font-bold text-[#0B1B3D] dark:text-white print:text-black block mb-1">State Management</span>
                    <span className="text-slate-600 dark:text-slate-400 print:text-slate-700 leading-relaxed">
                      Bloc / Cubit, GetX, Provider, Riverpod.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900/60 print:border-slate-300 print:bg-slate-50">
                    <span className="font-bold text-[#0B1B3D] dark:text-white print:text-black block mb-1">Networking & Backend</span>
                    <span className="text-slate-600 dark:text-slate-400 print:text-slate-700 leading-relaxed">
                      RESTful APIs, JSON serialization, Socket.IO, Deep Linking, Firebase (Auth, Firestore, Push Notifications), Supabase, Razorpay Gateway.
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900/60 print:border-slate-300 print:bg-slate-50">
                    <span className="font-bold text-[#0B1B3D] dark:text-white print:text-black block mb-1">Storage & Stores</span>
                    <span className="text-slate-600 dark:text-slate-400 print:text-slate-700 leading-relaxed">
                      Shared Preferences, Hive, SQFlite, Google Play Console, Apple App Store, TestFlight, Android Studio, VS Code, Xcode.
                    </span>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#0d6efd] dark:text-blue-400 print:text-blue-800 mb-4">
                  Work Experience
                </h2>

                <div className="space-y-6">
                  {WORK_EXPERIENCES.map((exp, idx) => (
                    <div key={idx} className="border-l-2 border-[#0d6efd]/50 dark:border-blue-400/50 pl-4 space-y-2 print:border-blue-600">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                        <div>
                          <h3 className="font-extrabold text-sm sm:text-base text-[#0B1B3D] dark:text-white print:text-black">
                            {exp.company}
                          </h3>
                          <span className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 print:text-blue-700">
                            {exp.role} ({exp.type})
                          </span>
                        </div>
                        <span className="font-mono text-xs text-slate-500 dark:text-slate-400 print:text-slate-600">
                          {exp.duration}
                        </span>
                      </div>

                      <ul className="space-y-1.5 text-xs text-[#475569] dark:text-slate-300 print:text-slate-800">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2">
                            <span className="text-[#0d6efd] dark:text-blue-400 print:text-black font-bold">•</span>
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#0d6efd] dark:text-blue-400 print:text-blue-800 mb-3">
                  Education
                </h2>
                <div className="space-y-3">
                  {EDUCATION_LIST.map((edu, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#f8fbff] dark:bg-[#070d1e] border border-blue-100 dark:border-blue-900/60 print:border-slate-300 print:bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                      <div>
                        <span className="font-bold text-[#0B1B3D] dark:text-white print:text-black">{edu.degree}</span>
                        <span className="text-slate-500 dark:text-slate-400 print:text-slate-700 block">{edu.institution}</span>
                      </div>
                      <div className="text-left sm:text-right font-mono">
                        <span className="text-[#0d6efd] dark:text-blue-400 font-bold print:text-blue-700 block">{edu.scores}</span>
                        <span className="text-slate-500 dark:text-slate-400 print:text-slate-600">{edu.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h2 className="text-xs uppercase font-extrabold tracking-wider text-[#0d6efd] dark:text-blue-400 print:text-blue-800 mb-2">
                  Languages
                </h2>
                <p className="text-xs text-[#475569] dark:text-slate-300 print:text-slate-800 font-medium">
                  English • Hindi • Gujarati
                </p>
              </div>

            </div>

            {/* Footer info in modal */}
            <div className="no-print p-4 bg-[#f8fbff] dark:bg-[#070d1e] border-t border-blue-100/70 dark:border-blue-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium">Official Resume of Anand Makhanasa</span>
              <div className="flex items-center gap-3">
                <a 
                  href={`mailto:${PERSONAL_INFO.email}?subject=Flutter%20Developer%20Opportunity`}
                  className="text-[#0d6efd] dark:text-blue-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Anand</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[#0B1B3D] dark:text-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
