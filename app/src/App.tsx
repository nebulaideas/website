import { LanguageProvider } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import SocialProofSection from '@/sections/SocialProofSection';
import MarketRealitySection from '@/sections/MarketRealitySection';
import PillarsSection from '@/sections/PillarsSection';
import EngineeringDNASection from '@/sections/EngineeringDNASection';
import ClaritySprintSection from '@/sections/ClaritySprintSection';
import AboutSection from '@/sections/AboutSection';
import PhilosophySection from '@/sections/PhilosophySection';
import BlogSection from '@/sections/BlogSection';
import FooterCTASection from '@/sections/FooterCTASection';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-obsidian-base text-on-surface font-body antialiased selection:bg-nebula-gold selection:text-nebula-navy">
        <Navigation />
        <main>
          <HeroSection />
          <SocialProofSection />
          <MarketRealitySection />
          <PillarsSection />
          <EngineeringDNASection />
          <ClaritySprintSection />
          <AboutSection />
          <PhilosophySection />
          <BlogSection />
          <FooterCTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
