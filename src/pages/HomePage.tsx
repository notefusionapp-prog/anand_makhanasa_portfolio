import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { SkillsSection } from '../components/SkillsSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { PublishedAppsSection } from '../components/PublishedAppsSection';
import { ExpertiseSection } from '../components/ExpertiseSection';
import { WorkflowSection } from '../components/WorkflowSection';
import { ContactSection } from '../components/ContactSection';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  onOpenResume: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenResume }) => {
  return (
    <>
      <SEOHead 
        title="Anand Makhanasa | Senior Flutter & Mobile Application Developer"
        description="Anand Makhanasa is a Senior Flutter & Mobile Application Developer specializing in Flutter, Dart, Firebase, APIs, Bloc/Cubit, and cross-platform mobile apps."
        canonicalPath="/"
      />

      <main className="flex-1">
        {/* 1. Hero Section: Contains the ONE AND ONLY primary H1 on the homepage */}
        <HeroSection onOpenResume={onOpenResume} />

        {/* 2. About Anand Makhanasa */}
        <AboutSection onOpenResume={onOpenResume} />

        {/* 3. Skills & Technologies */}
        <SkillsSection />

        {/* 4. Professional Experience */}
        <ExperienceSection />

        {/* 5. Published Applications (8+ Google Play Store Apps) */}
        <PublishedAppsSection />

        {/* 6. Development Expertise */}
        <ExpertiseSection />

        {/* 8. Development Workflow */}
        <WorkflowSection />

        {/* 9. Contact & Inquiries */}
        <ContactSection onOpenResume={onOpenResume} />
      </main>
    </>
  );
};
