import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { PublishedAppsSection } from './components/PublishedAppsSection';
import { CommercialProjectsSection } from './components/CommercialProjectsSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { PageLoader } from './components/PageLoader';
import { SpotlightCursor } from './components/SpotlightCursor';
import { ProjectEnquiryModal } from './components/ProjectEnquiryModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const enquiryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto Project Enquiry Popup: Appears every 15s, restarts on close/dismiss
  useEffect(() => {
    // Only schedule if modal is not open
    if (!isEnquiryOpen) {
      if (enquiryTimerRef.current) {
        clearTimeout(enquiryTimerRef.current);
      }
      enquiryTimerRef.current = setTimeout(() => {
        setIsEnquiryOpen(true);
      }, 15000);
    } else {
      // Clear pending timer while modal is currently open to prevent duplicates
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
    // Setting state to false triggers the useEffect above to restart the 15-second timer cleanly
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#fbfdff] dark:bg-[#070d1e] text-[#0B1B3D] dark:text-slate-100 flex flex-col font-sans selection:bg-[#0d6efd]/20 selection:text-[#0d6efd] relative transition-colors duration-300">
        
        {/* Minimal Premium Page Entrance Loader */}
        <AnimatePresence>
          {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>

        {/* Subtle Desktop Ambient Spotlight Cursor */}
        <SpotlightCursor />

        {/* Navigation Bar with Theme Toggle */}
        <Navbar onOpenResume={() => setIsResumeOpen(true)} />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <HeroSection onOpenResume={() => setIsResumeOpen(true)} />

          {/* 2. About Me */}
          <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

          {/* 3. Skills / Tech Stack */}
          <SkillsSection />

          {/* 4. Professional Experience */}
          <ExperienceSection />

          {/* 5. Published Applications (Google Play Store & App Store) */}
          <PublishedAppsSection />

          {/* 6. Commercial & Client Projects */}
          <CommercialProjectsSection />

          {/* 7. Development Expertise Capabilities */}
          <ExpertiseSection />

          {/* 8. Development Workflow */}
          <WorkflowSection />

          {/* 9. Contact & Inquiries */}
          <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
        </main>

        {/* Footer */}
        <Footer onOpenResume={() => setIsResumeOpen(true)} />

        {/* Resume Modal (View, Copy & Print PDF) */}
        <ResumeModal 
          isOpen={isResumeOpen} 
          onClose={() => setIsResumeOpen(false)} 
        />

        {/* Instant Project Enquiry Popup (Auto 15s Reminder) */}
        <ProjectEnquiryModal 
          isOpen={isEnquiryOpen}
          onClose={handleCloseEnquiry}
        />

        {/* Permanent Floating WhatsApp Action Button */}
        <FloatingWhatsAppButton />

      </div>
    </ThemeProvider>
  );
}
