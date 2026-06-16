import { type Language, translations } from './translations';

// Helper to update a meta tag by name/property, creating it if missing
const updateMeta = (attrKey: 'name' | 'property', attrValue: string, contentValue: string) => {
  // Use CSS.escape if available to prevent selector injection and protect against special characters
  const escapedValue = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(attrValue) : attrValue;
  const selector = `meta[${attrKey}="${escapedValue}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrKey, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contentValue);
};

interface MetaInput {
  title: string;
  description: string;
  ogDescription: string;
  siteName: string;
  language: Language;
}

export function updateMetaTags({
  title,
  description,
  ogDescription,
  siteName,
  language,
}: MetaInput) {
  if (typeof window === 'undefined') {return;}

  document.title = title;

  updateMeta('name', 'description', description);
  updateMeta('name', 'keywords', 'Nebula Ideas, AI strategy, Clarity Sprint, automation consulting, technology assessment, software architecture, engineering leadership, product thinking, organizational clarity, AI amplifier');
  updateMeta('name', 'author', 'Nebula Ideas');
  updateMeta('property', 'og:title', title);
  updateMeta('property', 'og:description', ogDescription);
  updateMeta('property', 'og:site_name', siteName);
  updateMeta('name', 'twitter:title', title);
  updateMeta('name', 'twitter:description', ogDescription);
  updateMeta('property', 'og:locale', language === 'en' ? 'en_US' : 'es_MX');
  updateMeta('property', 'og:url', window.location.href);
  updateMeta('property', 'og:type', 'website');
  updateMeta('property', 'og:image', 'https://nebulaideas.com/assets/logo.webp');
  updateMeta('name', 'twitter:card', 'summary_large_image');
  updateMeta('name', 'twitter:site', '@nebulaideas');
  updateMeta('name', 'twitter:creator', '@nebulaideas');
  updateMeta('name', 'twitter:image', 'https://nebulaideas.com/assets/logo.webp');

  // Add canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = window.location.href;
}

function buildJsonLd(language: Language) {
  const t = translations[language].seo;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nebula Ideas',
    url: 'https://nebulaideas.com',
    logo: 'https://nebulaideas.com/assets/logo.webp',
    description: t.json_ld_description,
    foundingDate: '2026',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MX',
      addressRegion: 'Mexico',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@nebulaideas.com',
      availableLanguage: ['English', 'Spanish'],
    },
    sameAs: [
      'https://www.linkedin.com/company/nebula-ideas',
      'https://github.com/nebulaideas',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Automation',
      'Technology Strategy',
      'Engineering Leadership',
      'Product Strategy',
      'Organizational Alignment',
      'Software Architecture',
      'Sprint Design',
      'Design Thinking',
      'Remote Software Engineering',
    ],
  };
}

function buildFaqJsonLd(language: Language) {
  const t = translations[language].seo;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t.faq_what_is_question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.faq_what_is_answer,
        },
      },
      {
        '@type': 'Question',
        name: t.faq_duration_question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.faq_duration_answer,
        },
      },
      {
        '@type': 'Question',
        name: t.faq_deliverables_question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.faq_deliverables_answer,
        },
      },
      {
        '@type': 'Question',
        name: t.faq_location_question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: t.faq_location_answer,
        },
      },
    ],
  };
}

export function injectJsonLd(language: Language) {
  if (typeof window === 'undefined') {return;}
  const jsonLd = buildJsonLd(language);
  const faqJsonLd = buildFaqJsonLd(language);

  const id = 'json-ld-org';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(jsonLd);

  const faqId = 'json-ld-faq';
  let faqEl = document.getElementById(faqId) as HTMLScriptElement | null;
  if (!faqEl) {
    faqEl = document.createElement('script');
    faqEl.id = faqId;
    faqEl.type = 'application/ld+json';
    document.head.appendChild(faqEl);
  }
  faqEl.textContent = JSON.stringify(faqJsonLd);
}
