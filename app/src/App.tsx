import { lazy, Suspense } from 'react';
import { LanguageProvider } from '@/hooks/useLanguage';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ClaritySprintSection from '@/sections/ClaritySprintSection';
import BeyondClaritySprintSection from '@/sections/BeyondClaritySprintSection';

const HeroSection = lazy(() => import('@/sections/HeroSection'));

function App() {
  return (
    <LanguageProvider>
      <Navigation />
      <div className="min-h-screen overflow-x-hidden bg-obsidian-base text-on-surface font-body antialiased selection:bg-nebula-gold selection:text-nebula-navy">
        <main>
          <Suspense fallback={<div className="min-h-screen" />}>
            <HeroSection />
          </Suspense>
          <ClaritySprintSection />
          <BeyondClaritySprintSection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
