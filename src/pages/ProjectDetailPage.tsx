import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Smartphone, 
  Globe,
  Monitor,
  Layers, 
  ShieldCheck, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Network
} from 'lucide-react';
import { ALL_PROJECTS, PUBLISHED_APPS, PERSONAL_INFO, Project } from '../data/portfolioData';
import { SEOHead } from '../components/SEOHead';
import { OptimizedProjectImage } from '../components/OptimizedProjectImage';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Resolve slug or alias (e.g., 'art-puzzle-story' -> 'art-puzzle', 'doc-scanner-pro' -> 'doc-scanner')
  const app = ALL_PROJECTS.find((p) => {
    if (p.id === slug) return true;
    if (slug === 'art-puzzle-story' && p.id === 'art-puzzle') return true;
    if (slug === 'doc-scanner-pro' && p.id === 'doc-scanner') return true;
    if (slug === 'astrolivechat-partners' && p.id === 'astro-live-chat-partner') return true;
    return false;
  });

  if (!app) {
    return <Navigate to="/projects" replace />;
  }

  // Connected ecosystem projects
  const connectedProjects = app.relatedProjectIds
    ? ALL_PROJECTS.filter((p) => app.relatedProjectIds?.includes(p.id))
    : [];

  // Related apps/projects for the bottom section
  const relatedApps = ALL_PROJECTS.filter((p) => p.id !== app.id && !app.relatedProjectIds?.includes(p.id)).slice(0, 3);

  // Schema.org JSON-LD (WebSite, WebApplication or SoftwareApplication)
  const structuredData = app.deviceType === 'browser'
    ? {
        "@context": "https://schema.org",
        "@type": app.projectType === 'website' ? "WebSite" : "WebApplication",
        "@id": `https://anand-makhanasa-portfolio.netlify.app/projects/${app.id}#${app.projectType === 'website' ? 'website' : 'webapplication'}`,
        "name": app.name,
        "description": app.description,
        "url": app.liveUrl || `https://anand-makhanasa-portfolio.netlify.app/projects/${app.id}`,
        "image": app.screenshots && app.screenshots[0] ? `https://anand-makhanasa-portfolio.netlify.app${app.screenshots[0]}` : undefined,
        "author": {
          "@type": "Person",
          "@id": "https://anand-makhanasa-portfolio.netlify.app/#person",
          "name": "Anand Makhanasa",
          "jobTitle": "Senior Flutter & Mobile Application Developer",
          "url": "https://anand-makhanasa-portfolio.netlify.app/about"
        }
      }
    : {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": `https://anand-makhanasa-portfolio.netlify.app/projects/${app.id}#softwareapplication`,
        "name": app.name,
        "description": app.description,
        "applicationCategory": app.category ? `${app.category.charAt(0).toUpperCase() + app.category.slice(1)}Application` : "MobileApplication",
        "operatingSystem": "Android",
        "url": `https://anand-makhanasa-portfolio.netlify.app/projects/${app.id}`,
        "image": app.screenshots && app.screenshots[0] ? `https://anand-makhanasa-portfolio.netlify.app${app.screenshots[0]}` : undefined,
        "downloadUrl": app.playStoreUrl,
        "author": {
          "@type": "Person",
          "@id": "https://anand-makhanasa-portfolio.netlify.app/#person",
          "name": "Anand Makhanasa",
          "jobTitle": "Senior Flutter & Mobile Application Developer",
          "url": "https://anand-makhanasa-portfolio.netlify.app/about"
        }
      };

  const pageTitle = app.projectType === 'flutter-web'
    ? `${app.name} — Flutter Web Application | Anand Makhanasa`
    : app.projectType === 'website'
    ? `${app.name} — SEO Website | Anand Makhanasa`
    : `${app.name} — Flutter Mobile Application | Anand Makhanasa`;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#fbfdff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-100 transition-colors duration-300">
      <SEOHead 
        title={pageTitle}
        description={app.description.length > 150 ? `${app.description.slice(0, 147)}...` : app.description}
        canonicalPath={`/projects/${app.id}`}
        ogImage={app.screenshots && app.screenshots[0] ? `https://anand-makhanasa-portfolio.netlify.app${app.screenshots[0]}` : undefined}
        structuredData={structuredData}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-[#0d6efd] dark:hover:text-blue-400 transition-colors">Projects</Link>
          <span>/</span>
          <span className="text-[#0B1B3D] dark:text-white font-semibold truncate max-w-xs">{app.name}</span>
        </nav>

        {/* Back Link */}
        <div className="mb-6">
          <Link 
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0d6efd] dark:text-blue-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects &amp; Apps</span>
          </Link>
        </div>

        {/* Hero Header Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-[0_15px_45px_rgba(11,27,61,0.06)] relative overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4 sm:gap-6">
              {app.iconUrl && (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 shadow-md shrink-0 bg-slate-900/10">
                  <OptimizedProjectImage 
                    src={app.iconUrl} 
                    alt={`${app.name} Official Icon`}
                    width={96}
                    height={96}
                    loading="eager"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                </div>
              )}
              
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/70 text-xs font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider">
                    {app.projectType === 'flutter-web' ? 'Flutter Web' : app.projectType === 'website' ? 'SEO Website' : app.category || 'Mobile App'}
                  </span>
                  {app.playStoreUrl && (
                    <span className="px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Google Play Published
                    </span>
                  )}
                  {app.liveUrl && (
                    <span className="px-3 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/70 text-xs font-bold text-teal-600 dark:text-teal-400">
                      Live on Web
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1B3D] dark:text-white tracking-tight leading-tight">
                  {app.name}
                </h1>

                <p className="mt-1 text-sm sm:text-base font-medium text-slate-500 dark:text-slate-400">
                  {app.subtitle}
                </p>

                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Developer / Contributor:</span>
                  <Link to="/about" className="text-[#0d6efd] dark:text-blue-400 font-bold hover:underline">
                    Built by Anand Makhanasa ({app.role})
                  </Link>
                </div>
              </div>
            </div>

            {/* Direct Action Links */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {app.liveUrl && (
                <a
                  href={app.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open Live {app.projectType === 'flutter-web' ? 'Web App' : 'Website'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {app.playStoreUrl && (
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#0d6efd] hover:bg-[#0b5ed7] text-white text-sm font-bold shadow-lg shadow-blue-500/25 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Google Play</span>
                </a>
              )}
            </div>

          </div>
        </div>

        {/* Visual Screenshots Gallery */}
        {app.screenshots && app.screenshots.length > 0 && (
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-[#0B1B3D] dark:text-white mb-6 flex items-center gap-2.5">
              {app.deviceType === 'browser' ? (
                <Monitor className="w-6 h-6 text-[#0d6efd]" />
              ) : (
                <Smartphone className="w-6 h-6 text-[#0d6efd]" />
              )}
              <span>{app.deviceType === 'browser' ? 'Web Application Interface Previews' : 'Real Application Screenshots'}</span>
            </h2>

            {app.deviceType === 'browser' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {app.screenshots.map((screen, idx) => (
                  <div 
                    key={idx}
                    className="rounded-2xl bg-slate-900 border border-slate-700 shadow-xl overflow-hidden flex flex-col group hover:border-blue-500 transition-colors"
                  >
                    <div className="bg-[#0b1329] px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 truncate max-w-xs">{app.liveUrl || app.name}</span>
                      <div className="w-10" />
                    </div>
                    <div className="aspect-[16/10] bg-slate-950 flex items-center justify-center p-1">
                      <OptimizedProjectImage 
                        src={screen} 
                        alt={`${app.name} UI Preview Screen ${idx + 1}`}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        objectFit="contain"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {app.screenshots.map((screen, idx) => (
                  <div 
                    key={idx}
                    className="rounded-2xl sm:rounded-3xl p-2 bg-slate-900 border-2 border-slate-700 shadow-xl overflow-hidden aspect-[9/19] flex items-center justify-center"
                  >
                    <OptimizedProjectImage 
                      src={screen} 
                      alt={`${app.name} Flutter UI Screen ${idx + 1}`}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      objectFit="contain"
                      className="w-full h-full rounded-[14px]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Connected Ecosystem Section (Requirement 24: Apps <-> Websites <-> Admin Panels) */}
        {connectedProjects.length > 0 && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 dark:from-blue-950/40 dark:via-indigo-950/20 dark:to-[#0B1B3D] border-2 border-blue-200/80 dark:border-blue-800/80 mb-14 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-xl bg-[#0d6efd] text-white">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B1B3D] dark:text-white">
                  Connected Ecosystem Architecture
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Built by Anand Makhanasa — showcasing complete lifecycle cohesion from Mobile App to Web &amp; Admin Panel
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {connectedProjects.map((conn) => (
                <Link
                  key={conn.id}
                  to={`/projects/${conn.id}`}
                  className="p-4 rounded-2xl bg-white dark:bg-[#0B1B3D] border border-blue-100 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-500 transition-all flex items-center justify-between group shadow-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {conn.iconUrl && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-900/10">
                        <OptimizedProjectImage 
                          src={conn.iconUrl} 
                          alt={conn.name} 
                          width={48} 
                          height={48} 
                          objectFit="cover"
                          className="w-full h-full"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider">
                        {conn.projectType === 'flutter-web' ? 'Flutter Web Admin Panel' : conn.projectType === 'website' ? 'SEO Website' : 'Mobile Application'}
                      </span>
                      <h4 className="text-sm font-bold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] transition-colors truncate">
                        {conn.name}
                      </h4>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0d6efd] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Two-Column Deep Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
          
          {/* Left: Overview & Key Features */}
          <div className="lg:col-span-7 space-y-8">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white mb-4">
                Project Overview
              </h2>
              <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed">
                {app.description}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white mb-5 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0d6efd]" />
                <span>Key Features &amp; Technical Capabilities</span>
              </h2>

              <ul className="space-y-3">
                {app.keyFeatures.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right: Anand's Contribution & Tech Stack */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white mb-5 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-[#0d6efd]" />
                <span>My Technical Contributions</span>
              </h2>

              <ul className="space-y-3">
                {app.contribution.map((contrib, cIdx) => (
                  <li key={cIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#0d6efd] shrink-0 mt-2" />
                    <span>{contrib}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100 dark:border-blue-900/60 shadow-sm">
              <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0d6efd]" />
                <span>Technologies &amp; Architecture</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {app.technologies.map((tech, tIdx) => (
                  <span 
                    key={tIdx}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-xs font-semibold text-[#0d6efd] dark:text-blue-300 border border-blue-100 dark:border-blue-900/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* More Projects by Anand Makhanasa */}
        <div className="pt-10 border-t border-blue-100 dark:border-blue-900/60">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0B1B3D] dark:text-white">
              More Projects &amp; Applications Built by Anand Makhanasa
            </h2>
            <Link to="/projects" className="text-xs font-bold text-[#0d6efd] hover:underline flex items-center gap-1">
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedApps.map((rel) => (
              <Link
                key={rel.id}
                to={`/projects/${rel.id}`}
                className="p-5 rounded-2xl bg-white dark:bg-[#0B1B3D]/90 border border-blue-100/80 dark:border-blue-900/60 hover:border-blue-300 dark:hover:border-blue-600 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-[#0d6efd] dark:text-blue-400 uppercase tracking-wider mb-1">
                    {rel.projectType === 'flutter-web' ? 'Flutter Web' : rel.projectType === 'website' ? 'SEO Website' : rel.category || 'Mobile App'}
                  </div>
                  <h3 className="text-sm font-bold text-[#0B1B3D] dark:text-white group-hover:text-[#0d6efd] transition-colors line-clamp-1 mb-2">
                    {rel.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {rel.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#0d6efd]">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
