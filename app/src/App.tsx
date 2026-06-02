import { LanguageProvider } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/sections/HeroSection';
import SocialProofSection from '@/sections/SocialProofSection';
import ServicesSection from '@/sections/ServicesSection';
import ProcessSection from '@/sections/ProcessSection';
import AboutSection from '@/sections/AboutSection';
import PhilosophySection from '@/sections/PhilosophySection';
import TechnologySection from '@/sections/TechnologySection';
import BlogSection from '@/sections/BlogSection';
import ContactSection from '@/sections/ContactSection';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <HeroSection />
          <SocialProofSection />
          <ServicesSection />
          <ProcessSection />
          <AboutSection />
          <PhilosophySection />
          <TechnologySection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
