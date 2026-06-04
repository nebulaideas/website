import { LanguageProvider } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import SocialProofSection from '@/sections/SocialProofSection';
import WhyOrganizationsStruggleSection from '@/sections/WhyOrganizationsStruggleSection';
import ClaritySprintSection from '@/sections/ClaritySprintSection';
import WhatWeHelpSection from '@/sections/WhatWeHelpSection';
import OurApproachSection from '@/sections/OurApproachSection';
import PrinciplesSection from '@/sections/PrinciplesSection';
import AboutSection from '@/sections/AboutSection';
import BlogSection from '@/sections/BlogSection';
import FooterCTASection from '@/sections/FooterCTASection';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen overflow-x-hidden bg-obsidian-base text-on-surface font-body antialiased selection:bg-nebula-gold selection:text-nebula-navy">
        <Navigation />
        <main>
          <HeroSection />
          <SocialProofSection />
          <WhyOrganizationsStruggleSection />
          <ClaritySprintSection />
          <WhatWeHelpSection />
          <OurApproachSection />
          <PrinciplesSection />
          <AboutSection />
          <BlogSection />
          <FooterCTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
