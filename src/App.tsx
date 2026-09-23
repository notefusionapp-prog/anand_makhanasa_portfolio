import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PageLoader } from './components/PageLoader';
import { SpotlightCursor } from './components/SpotlightCursor';
import { ProjectEnquiryModal } from './components/ProjectEnquiryModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const enquiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto Project Enquiry Popup: Appears after 18s of interaction
  useEffect(() => {
    if (!isEnquiryOpen) {
      if (enquiryTimerRef.current) {
        clearTimeout(enquiryTimerRef.current);
      }
      enquiryTimerRef.current = setTimeout(() => {
        setIsEnquiryOpen(true);
      }, 18000);
    } else {
      if (enquiryTimerRef.current) {
        clearTimeout(enquiryTimerRef.current);
        enquiryTimerRef.current = null;
      }
    }

    return () => {
      if (enquiryTimerRef.current) {
        clearTimeout(enquiryTimerRef.current);
      }
    };
  }, [isEnquiryOpen]);

  const handleCloseEnquiry = () => {
    setIsEnquiryOpen(false);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-[#fbfdff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-100 flex flex-col font-sans selection:bg-[#0d6efd]/20 selection:text-[#0d6efd] relative transition-colors duration-300">
          
          {/* Minimal Premium Entrance Loader */}
          <AnimatePresence>
            {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>

          {/* Subtle Ambient Cursor */}
          <SpotlightCursor />

          {/* Persistent Navbar */}
          <Navbar onOpenResume={() => setIsResumeOpen(true)} />

          {/* Crawlable Route Outlets */}
          <Routes>
            {/* Primary Homepage with single H1 */}
            <Route path="/" element={<HomePage onOpenResume={() => setIsResumeOpen(true)} />} />

            {/* Dedicated Personal Profile Pages */}
            <Route path="/about" element={<AboutPage onOpenResume={() => setIsResumeOpen(true)} />} />
            <Route path="/anand-makhanasa" element={<AboutPage onOpenResume={() => setIsResumeOpen(true)} />} />

            {/* Published Apps & Projects Directory */}
            <Route path="/projects" element={<ProjectsPage />} />

            {/* Individual Project & SoftwareApplication Pages */}
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          {/* Persistent Footer */}
          <Footer onOpenResume={() => setIsResumeOpen(true)} />

          {/* Resume Modal */}
          <ResumeModal 
            isOpen={isResumeOpen} 
            onClose={() => setIsResumeOpen(false)} 
          />

          {/* Project Enquiry Modal */}
          <ProjectEnquiryModal 
            isOpen={isEnquiryOpen}
            onClose={handleCloseEnquiry}
          />

          {/* WhatsApp Direct Action Button */}
          <FloatingWhatsAppButton />

        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
