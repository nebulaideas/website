import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { key: 'nav_home', href: '#top' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_process', href: '#process' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_blog', href: '#blog' },
  { key: 'nav_contact', href: '#contact' },
] as const;

export default function Navigation() {
  const { t, language, toggleLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const target = document.querySelector(href);
      if (target) {
        const navHeight = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(10,25,47,0.85)] backdrop-blur-[12px] shadow-nav'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main w-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="flex-shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="Nebula Ideas"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-[15px] font-medium tracking-[0.01em] transition-colors duration-250 hover:text-amber ${
                  activeSection === link.href.slice(1)
                    ? 'text-amber'
                    : 'text-white'
                }`}
              >
                {t(link.key)}
              </a>
            ))}
          </div>

          {/* Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-button text-sm font-semibold tracking-[0.05em] border transition-all duration-250 ${
                language === 'en'
                  ? 'border-amber bg-amber-10 text-amber'
                  : 'border-white/30 text-white hover:border-amber hover:text-amber'
              }`}
            >
              <Globe size={14} />
              {language === 'en' ? t('nav_toggle_es') : t('nav_toggle_en')}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-deep-blue/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.key}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className={`text-2xl font-medium transition-colors duration-250 hover:text-amber ${
              activeSection === link.href.slice(1) ? 'text-amber' : 'text-white'
            }`}
          >
            {t(link.key)}
          </a>
        ))}
        <button
          onClick={() => {
            toggleLanguage();
            setMobileOpen(false);
          }}
          className="mt-4 flex items-center gap-2 px-6 py-3 rounded-button border border-amber text-amber font-semibold"
        >
          <Globe size={16} />
          {language === 'en' ? t('nav_toggle_es') : t('nav_toggle_en')}
        </button>
      </div>
    </>
  );
}
