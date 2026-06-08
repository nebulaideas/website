import { useLanguage } from '@/hooks/useLanguage';
import { Globe, Linkedin, Github } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { language, toggleLanguage, t, calendlyUrl } = useLanguage();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Nebula Ideas"
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
              <span className="font-headline text-headline-md font-bold text-on-surface tracking-tight">
                Nebula Ideas
              </span>
            </div>
            <p className="font-tech text-tech-data text-on-tertiary-container">
              &copy; {CURRENT_YEAR} {t('footer.copyright')}
            </p>
            <a
              href="mailto:hello@nebulaideas.com"
              className="font-tech text-tech-data text-nebula-gold hover:text-nebula-gold-hover transition-colors duration-200"
            >
              hello@nebulaideas.com
            </a>
            {/* Language toggle */}
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => language !== 'en' && toggleLanguage()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold font-tech tracking-wide border transition-all duration-200 ${
                  language === 'en'
                    ? 'border-nebula-gold bg-nebula-gold/10 text-nebula-gold'
                    : 'border-outline-variant text-on-surface-variant hover:border-nebula-gold hover:text-nebula-gold'
                }`}
              >
                <Globe size={12} />
                EN
              </button>
              <button
                onClick={() => language !== 'es' && toggleLanguage()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold font-tech tracking-wide border transition-all duration-200 ${
                  language === 'es'
                    ? 'border-nebula-gold bg-nebula-gold/10 text-nebula-gold'
                    : 'border-outline-variant text-on-surface-variant hover:border-nebula-gold hover:text-nebula-gold'
                }`}
              >
                <Globe size={12} />
                ES
              </button>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-6 flex flex-wrap gap-6 md:justify-end items-start font-tech text-tech-label">
            <a
              href="mailto:hello@nebulaideas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-tertiary-container hover:text-nebula-gold transition-colors duration-200"
            >
              {t('nav.contact')}
            </a>
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-tertiary-container hover:text-nebula-gold transition-colors duration-200"
            >
              {t('nav.schedule')}
            </a>
            <a
              href="https://www.linkedin.com/company/nebulaideas"
              className="text-on-tertiary-container hover:text-nebula-gold transition-colors duration-200 flex items-center gap-1"
            >
              <Linkedin size={14} />
              {t('footer.linkedin')}
            </a>
            <a
              href="https://github.com/nebulaideas"
              className="text-on-tertiary-container hover:text-nebula-gold transition-colors duration-200 flex items-center gap-1"
            >
              <Github size={14} />
              {t('footer.github')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
