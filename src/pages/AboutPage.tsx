import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Award,
  Layers,
  Sparkles,
  Smartphone,
  ArrowRight,
  Terminal,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PERSONAL_INFO, PUBLISHED_APPS, WORK_EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';
import { SEOHead } from '../components/SEOHead';
import { OptimizedProjectImage } from '../components/OptimizedProjectImage';

interface AboutPageProps {
  onOpenResume: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenResume }) => {
  const profileStructuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://anandmakhanasa.com/about#webpage",
        "url": "https://anandmakhanasa.com/about",
        "name": "About Anand Makhanasa — Senior Flutter & Mobile Application Developer",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://anandmakhanasa.com/#website",
          "url": "https://anandmakhanasa.com/",
          "name": "Anand Makhanasa"
        },
        "mainEntity": {
          "@id": "https://anandmakhanasa.com/#person"
        },
        "description": "Professional biography, Flutter expertise, mobile engineering portfolio, verified experience, and production applications of Anand Makhanasa."
      },
      {
        "@type": "Person",
        "@id": "https://anandmakhanasa.com/#person",
        "name": "Anand Makhanasa",
        "jobTitle": "Senior Flutter & Mobile Application Developer",
        "url": "https://anandmakhanasa.com/about",
        "image": "https://anandmakhanasa.com/profile.webp",
        "email": "mailto:anandmakhanasa1631@gmail.com",
        "telephone": "+919537107504",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Surat",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.linkedin.com/in/anand-makhanasa-144b1229a"
        ],
        "knowsAbout": [
          "Flutter Mobile App Development",
          "Dart Programming Language",
          "Android Native & Cross-Platform",
          "iOS App Development",
          "Bloc / Cubit Architecture",
          "Riverpod State Management",
          "GetX Framework",
          "Firebase Firestore & Authentication",
          "RESTful APIs Integration",
          "Socket.IO Real-Time WebSockets",
          "Razorpay Payment Gateway",
          "Google Maps Platform SDK",
          "Google Play Console Deployment",
          "Apple TestFlight & App Store Connect"
        ]
      }
    ]
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#fbfdff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-100 transition-colors duration-300">
      <SEOHead 
        title="About Anand Makhanasa — Senior Flutter & Mobile Application Developer"
        description="Learn about Anand Makhanasa, a Senior Flutter & Mobile Application Developer with 2.5+ years building production Android & iOS applications, with 8+ apps on Google Play."
        canonicalPath="/about"
        ogType="profile"
        structuredData={profileStructuredData}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0B1B3D] dark:text-white font-semibold">About Anand Makhanasa</span>
        </nav>

        {/* Hero Identity Profile Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-[0_15px_45px_rgba(11,27,61,0.06)] relative overflow-hidden mb-12">
          <div className="absolute -right-24 -top-24 w-80 h-80 bg-[#0d6efd]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Profile Photo */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl">
                <img 
                  src="/profile.webp" 
                  alt="Anand Makhanasa — Senior Flutter & Mobile Application Developer"
                  width={240}
                  height={240}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-[center_18%]"
                />
              </div>

              {/* Status Badge */}
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Available for Mobile Development Projects
              </div>
            </div>

            {/* Profile Intro & Title */}
            <div className="lg:col-span-8 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider">
                Official Profile
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight leading-tight">
                Anand Makhanasa
              </h1>

              <p className="text-xl sm:text-2xl font-bold text-[#0d6efd] dark:text-blue-400">
                Senior Flutter &amp; Mobile Application Developer
              </p>

              <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
                {PERSONAL_INFO.summary}
              </p>

              {/* Key Verified Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xl font-black text-[#0d6efd] dark:text-blue-400">2.5+ Yrs</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Professional Exp</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">8+ Apps</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Google Play Store</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">Android &amp; iOS</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Platforms Supported</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400">Clean Arch</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Bloc, Cubit, GetX</div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={onOpenResume}
                  className="px-5 py-2.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume</span>
                </button>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <Link
                  to="/projects"
                  className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[#0B1B3D] dark:text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  <Smartphone className="w-4 h-4 text-[#0d6efd]" />
                  <span>View 8+ Published Apps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Section 2: Technical Philosophy & Core Competencies */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0B1B3D] dark:text-white mb-4 flex items-center gap-2.5">
                <Terminal className="w-6 h-6 text-[#0d6efd]" />
                <span>Flutter &amp; Mobile Engineering Expertise</span>
              </h2>

              <div className="space-y-4 text-sm text-[#475569] dark:text-slate-300 leading-relaxed">
                <p>
                  As a dedicated <strong>Senior Flutter &amp; Mobile Application Developer</strong> based in Surat, Gujarat, India, I specialize in architecting scalable, maintainable, and high-performance cross-platform applications that deliver native-grade fluidity on both Android and iOS devices.
                </p>
                <p>
                  My core development workflow is grounded in <strong>Clean Architecture principles</strong>, strictly separating presentation, domain, and data layers. By utilizing <strong>Bloc / Cubit</strong>, <strong>Riverpod</strong>, and <strong>GetX</strong> state management, I guarantee predictable state mutations, testability, and resilient offline capabilities.
                </p>
                <p>
                  I have engineered enterprise-grade features including <strong>Socket.IO real-time event streaming</strong> for live booking consultations, <strong>Google Maps SDK</strong> for geolocation discovery, <strong>Razorpay payment gateway</strong> integrations, and automated <strong>Google ML Kit OCR pipelines</strong>.
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6efd] shrink-0 mt-0.5" />
                  <span>Pixel-perfect responsive UIs directly from Figma &amp; Adobe XD</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6efd] shrink-0 mt-0.5" />
                  <span>Offline persistence with Hive, SQFlite, &amp; Shared Preferences</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6efd] shrink-0 mt-0.5" />
                  <span>FCM Push Notifications, Deep Linking &amp; Universal Links</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0d6efd] shrink-0 mt-0.5" />
                  <span>Google Play Console &amp; Apple App Store deployment workflows</span>
                </div>
              </div>
            </div>

            {/* Verified Professional Experience strictly based on resume */}
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-2xl font-bold text-[#0B1B3D] dark:text-white mb-6 flex items-center gap-2.5">
                <Briefcase className="w-6 h-6 text-[#0d6efd]" />
                <span>Verified Employment &amp; Career History</span>
              </h2>

              <div className="space-y-6">
                {WORK_EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="pb-6 border-b last:border-0 border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h3 className="text-lg font-bold text-[#0B1B3D] dark:text-white">
                        {exp.role} <span className="text-[#0d6efd] dark:text-blue-400 font-medium">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#0d6efd] dark:text-blue-300 w-fit">
                        {exp.duration}
                      </span>
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-3">
                      <span>{exp.location}</span>
                      <span>•</span>
                      <span>{exp.type}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed mb-3">
                      {exp.description}
                    </p>

                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {exp.responsibilities.slice(0, 3).map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d6efd] shrink-0 mt-1.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Contact info & Published apps shortcut */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#0d6efd]" />
                <span>Contact Information</span>
              </h2>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <Mail className="w-4 h-4 text-[#0d6efd] shrink-0" />
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold text-slate-700 dark:text-slate-200 hover:text-[#0d6efd] truncate">
                    {PERSONAL_INFO.email}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-600">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">
                    Surat, Gujarat, India (Kamrej, 394185)
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#070d1e]/60 border border-slate-200/80 dark:border-slate-800">
                  <Linkedin className="w-4 h-4 text-[#0077b5] shrink-0" />
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#0077b5] hover:underline truncate">
                    linkedin.com/in/anand-makhanasa
                  </a>
                </div>
              </div>
            </div>

            {/* Published Apps Showcase Strip */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-[#0d6efd]" />
                  <span>Published Applications</span>
                </h2>
                <Link to="/projects" className="text-xs font-bold text-[#0d6efd] hover:underline flex items-center gap-1">
                  <span>View All 8+</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Verified mobile applications built and maintained by Anand Makhanasa on Google Play Store:
              </p>

              <div className="space-y-2.5">
                {PUBLISHED_APPS.map((app) => (
                  <Link
                    key={app.id}
                    to={`/projects/${app.id}`}
                    className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 bg-slate-50/70 dark:bg-[#070d1e]/50 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {app.iconUrl && (
                        <div className="w-9 h-9 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
                          <OptimizedProjectImage 
                            src={app.iconUrl} 
                            alt="" 
                            width={36}
                            height={36}
                            loading="lazy"
                            objectFit="cover"
                            className="w-full h-full"
                          />
                        </div>
                      )}
                      <div className="truncate">
                        <div className="text-xs font-bold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] transition-colors truncate">
                          {app.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {app.role}
                        </div>
                      </div>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0d6efd] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  to="/projects"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#0d6efd] dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors"
                >
                  <span>Explore In-Depth Project Case Studies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
