import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import NavLink from '@/components/NavLink';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { key: 'nav_problem', href: '#why-struggle' },
  { key: 'nav_services', href: '#what-we-help' },
  { key: 'nav_sprint', href: '#clarity-sprint' },
  { key: 'nav_approach', href: '#our-approach' },
  { key: 'nav_blog', href: '#blog' },
  { key: 'nav_contact', href: '#schedule' },
] as const;

export default function Navigation() {
  const { t, language, toggleLanguage, calendlyUrl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.href.slice(1));
      if (el) {observer.observe(el);}
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 64;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-obsidian-base/90 backdrop-blur-md border-b border-outline-variant transition-all duration-300">
        <div className="container-main flex justify-between items-center py-4">
          {/* Brand */}
          <a href="#top" onClick={(e) => handleNavClick(e, '#top')} className="flex items-center gap-3 flex-shrink-0">
            <img src="/assets/logo.png" alt="Nebula Ideas" className="h-10 w-auto" />
            <span className="font-headline text-headline-md font-bold text-on-surface hidden lg:block tracking-tight whitespace-nowrap">
              Nebula Ideas
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.key}
                labelKey={link.key}
                href={link.href}
                isActive={activeSection === link.href.slice(1)}
                variant="desktop"
                onClick={handleNavClick}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleLanguage}
              className="hidden lg:flex items-center gap-1.5 font-tech text-tech-label text-on-surface-variant hover:text-nebula-gold transition-colors duration-200 cursor-pointer"
            >
              <Globe size={14} />
              {language === 'en' ? t('nav_toggle_es') : t('nav_toggle_en')}
            </button>

            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nebula-gold text-nebula-navy px-5 py-2.5 rounded font-tech text-tech-label font-bold hover:bg-nebula-gold-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-gold-strong whitespace-nowrap"
            >
              {t('nav_schedule')}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-on-surface p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu-overlay"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-0 z-40 bg-obsidian-base/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.key}
            labelKey={link.key}
            href={link.href}
            isActive={activeSection === link.href.slice(1)}
            variant="mobile"
            onClick={handleNavClick}
          />
        ))}
        <button
          onClick={() => {
            toggleLanguage();
            setMobileOpen(false);
          }}
          className="mt-4 flex items-center gap-2 px-6 py-3 rounded border border-nebula-gold text-nebula-gold font-tech font-semibold"
        >
          <Globe size={16} />
          {language === 'en' ? t('nav_toggle_es') : t('nav_toggle_en')}
        </button>
      </div>
    </>
  );
}
