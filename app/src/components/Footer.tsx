import { useLanguage } from '@/hooks/useLanguage';
import { Linkedin, Github } from 'lucide-react';

const footerLinks = [
  { key: 'nav_home', href: '#top' },
  { key: 'nav_services', href: '#services' },
  { key: 'nav_process', href: '#process' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_blog', href: '#blog' },
  { key: 'nav_contact', href: '#contact' },
  { key: 'footer_privacy', href: '#privacy' },
] as const;

export default function Footer() {
  const { t, language, toggleLanguage } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#privacy') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-deep-blue text-white">
      <div className="container-main py-16 pb-8">
        {/* Row 1: Logo + Copyright + Language */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <img
            src="/assets/logo.png"
            alt="Nebula Ideas"
            className="h-9 w-auto brightness-0 invert"
          />
          <span className="text-caption text-white/50">{t('footer_copyright')}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold tracking-[0.05em] border transition-all duration-250 ${
                language === 'en'
                  ? 'border-amber bg-amber-10 text-amber'
                  : 'border-white/30 text-white/60 hover:border-amber hover:text-amber'
              }`}
            >
              EN
            </button>
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold tracking-[0.05em] border transition-all duration-250 ${
                language === 'es'
                  ? 'border-amber bg-amber-10 text-amber'
                  : 'border-white/30 text-white/60 hover:border-amber hover:text-amber'
              }`}
            >
              ES
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Row 2: Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-body-sm text-white/60 hover:text-amber transition-colors duration-250"
            >
              {t(link.key)}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6" />

        {/* Row 3: Social */}
        <div className="flex items-center justify-center gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-caption text-white/50 hover:text-amber transition-colors duration-250"
          >
            <Linkedin size={18} />
            <span>{t('footer_linkedin')}</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-caption text-white/50 hover:text-amber transition-colors duration-250"
          >
            <Github size={18} />
            <span>{t('footer_github')}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
