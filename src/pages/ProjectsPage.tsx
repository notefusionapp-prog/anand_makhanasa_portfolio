import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ExternalLink, 
  ArrowRight, 
  Smartphone, 
  Layers, 
  ShieldCheck, 
  Download,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PUBLISHED_APPS, OTHER_PROJECTS, Project } from '../data/portfolioData';
import { SEOHead } from '../components/SEOHead';
import { OptimizedProjectImage } from '../components/OptimizedProjectImage';

export const ProjectsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'productivity' | 'lifestyle' | 'utilities'>('all');

  const filteredApps = PUBLISHED_APPS.filter((app) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'productivity') return app.category === 'productivity' || app.category === 'education';
    if (selectedFilter === 'lifestyle') return app.category === 'lifestyle' || app.category === 'health' || app.category === 'business';
    if (selectedFilter === 'utilities') return app.category === 'utilities' || app.category === 'entertainment';
    return true;
  });

  const projectsCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://anandmakhanasa.com/projects#webpage",
    "url": "https://anandmakhanasa.com/projects",
    "name": "Published Mobile Applications & Engineering Projects — Anand Makhanasa",
    "description": "Production Flutter and cross-platform mobile applications engineered and maintained by Anand Makhanasa for Android and iOS on Google Play Store.",
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://anandmakhanasa.com/#website",
      "url": "https://anandmakhanasa.com/",
      "name": "Anand Makhanasa"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": PUBLISHED_APPS.map((app, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": app.name,
          "description": app.description,
          "url": `https://anandmakhanasa.com/projects/${app.id}`,
          "downloadUrl": app.playStoreUrl,
          "applicationCategory": app.category || "MobileApplication",
          "operatingSystem": "Android",
          "author": {
            "@type": "Person",
            "name": "Anand Makhanasa",
            "url": "https://anandmakhanasa.com/"
          }
        }
      }))
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#fbfdff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-100 transition-colors duration-300">
      <SEOHead 
        title="Published Mobile Applications & Projects — Anand Makhanasa"
        description="Explore 8 production mobile applications engineered with Flutter, Dart, Firebase, Bloc, and REST APIs by Senior Mobile Developer Anand Makhanasa on Google Play Store."
        canonicalPath="/projects"
        structuredData={projectsCollectionSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0B1B3D] dark:text-white font-semibold">Published Applications &amp; Projects</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-xs font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider mb-3">
            Production Portfolio
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight">
            Published Mobile Applications
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
            All 8 production applications listed below were engineered with Flutter and Dart, featuring robust architectures, real-time sync, and production deployments on the Google Play Store.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'all'
                  ? 'bg-[#0d6efd] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900 text-slate-600 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              All Published Apps ({PUBLISHED_APPS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('productivity')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'productivity'
                  ? 'bg-[#0d6efd] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900 text-slate-600 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              Productivity &amp; Notes
            </button>
            <button
              onClick={() => setSelectedFilter('lifestyle')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'lifestyle'
                  ? 'bg-[#0d6efd] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900 text-slate-600 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              Lifestyle, Health &amp; Chat
            </button>
            <button
              onClick={() => setSelectedFilter('utilities')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === 'utilities'
                  ? 'bg-[#0d6efd] text-white shadow-md shadow-blue-500/20'
                  : 'bg-white dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900 text-slate-600 dark:text-slate-300 hover:border-blue-300'
              }`}
            >
              Utilities &amp; Puzzles
            </button>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {filteredApps.map((app) => (
            <div 
              key={app.id}
              className="rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/80 dark:border-blue-900/60 shadow-[0_10px_35px_rgba(11,27,61,0.05)] hover:shadow-[0_15px_45px_rgba(11,27,61,0.1)] transition-all flex flex-col justify-between overflow-hidden group"
            >
              {/* App Card Header */}
              <div className="p-6">
                <div className="flex items-start gap-3.5 mb-4">
                  {app.iconUrl && (
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                      <OptimizedProjectImage 
                        src={app.iconUrl} 
                        alt={`${app.name} icon`}
                        width={56}
                        height={56}
                        loading="lazy"
                        objectFit="cover"
                        className="w-full h-full"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-[11px] font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider">
                      {app.category} • {app.role}
                    </div>
                    <h2 className="text-lg font-bold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] transition-colors leading-snug">
                      {app.name}
                    </h2>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                  {app.description}
                </p>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {app.technologies.slice(0, 4).map((tech, tIdx) => (
                    <span 
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-blue-50/80 dark:bg-blue-950/60 text-[11px] font-medium text-slate-700 dark:text-slate-300 border border-blue-100 dark:border-blue-900/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {app.technologies.length > 4 && (
                    <span className="px-2 py-1 text-[11px] text-slate-400 font-medium">
                      +{app.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Preview Snapshot */}
                {app.screenshots && app.screenshots[0] && (
                  <div className="h-44 rounded-2xl overflow-hidden bg-black/90 relative border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <OptimizedProjectImage 
                      src={app.screenshots[0]} 
                      alt={`${app.name} screenshot`}
                      loading="lazy"
                      objectFit="contain"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="p-4 bg-slate-50/80 dark:bg-[#070d1e]/60 border-t border-blue-50 dark:border-blue-950/60 flex items-center justify-between gap-3">
                <Link
                  to={`/projects/${app.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0d6efd] dark:text-blue-400 hover:underline"
                >
                  <span>Detailed Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {app.playStoreUrl && (
                  <a
                    href={app.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs transition-colors"
                  >
                    <span>Google Play</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Commercial & Client Applications Section */}
        <div className="mt-16 pt-12 border-t border-blue-100 dark:border-blue-900/60">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-[#0B1B3D] dark:text-white">
              Commercial &amp; Enterprise Client Projects
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Contract and corporate mobile solutions built for international businesses, featuring payment systems, real-time consultation dispatchers, and complex backends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_PROJECTS.map((proj) => (
              <div 
                key={proj.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/80 dark:border-blue-900/60 shadow-sm"
              >
                <div className="text-xs font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider mb-1">
                  {proj.role}
                </div>
                <h3 className="text-lg font-bold text-[#0B1B3D] dark:text-white mb-2">
                  {proj.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 mb-4 leading-relaxed">
                  {proj.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
