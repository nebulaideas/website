import { type Language } from './translations';

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
  updateMeta('name', 'keywords', 'AI strategy, automation consulting, technology assessment, software architecture, engineering leadership, product thinking, organizational clarity, Sprint Design, Design Thinking, remote software engineering');
  updateMeta('name', 'author', 'Nebula Ideas');
  updateMeta('property', 'og:title', title);
  updateMeta('property', 'og:description', ogDescription);
  updateMeta('property', 'og:site_name', siteName);
  updateMeta('name', 'twitter:title', title);
  updateMeta('name', 'twitter:description', ogDescription);
  updateMeta('property', 'og:locale', language === 'en' ? 'en_US' : 'es_MX');
  updateMeta('property', 'og:url', window.location.href);
  updateMeta('property', 'og:type', 'website');
  updateMeta('property', 'og:image', 'https://nebulaideas.com/assets/og_image.jpg');
  updateMeta('name', 'twitter:card', 'summary_large_image');
  updateMeta('name', 'twitter:site', '@nebulaideas');
  updateMeta('name', 'twitter:creator', '@nebulaideas');
  updateMeta('name', 'twitter:image', 'https://nebulaideas.com/assets/og_image.jpg');

  // Add canonical URL
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = window.location.href;
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nebula Ideas',
  url: 'https://nebulaideas.com',
  logo: 'https://nebulaideas.com/assets/logo.jpg',
  description:
    'Technology and AI strategy consultancy focused on organizational clarity, measurable outcomes, and practical AI adoption.',
  foundingDate: '2026',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressRegion: 'Mexico',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'contact@nebulaideas.com',
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
} as const;

const SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Nebula Ideas Technology Consulting',
  description: 'Technology and AI strategy consultancy focused on organizational clarity, measurable outcomes, and practical AI adoption.',
  provider: {
    '@type': 'Organization',
    name: 'Nebula Ideas',
    url: 'https://nebulaideas.com',
  },
  serviceType: [
    'AI Strategy Consulting',
    'Technology Assessment',
    'Software Architecture',
    'Engineering Leadership',
  ],
  areaServed: [
    {
      '@type': 'Country',
      name: 'Mexico',
    },
    {
      '@type': 'Country',
      name: 'United States',
    },
  ],
  availableLanguage: ['English', 'Spanish'],
} as const;

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Nebula Clarity Sprint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Nebula Clarity Sprint is a focused assessment designed to identify where technology, AI, automation, and organizational processes can create meaningful value. It evaluates business context, operational reality, technology landscape, and AI opportunities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the Clarity Sprint take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Clarity Sprint is designed to be efficient and focused, typically completed within 1-2 weeks depending on organizational complexity and scope.',
      },
    },
    {
      '@type': 'Question',
      name: 'What deliverables do I receive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You receive a current-state assessment, key risks and bottlenecks, an opportunity map, AI and automation recommendations, a prioritized roadmap, and strategic implementation guidance.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you work with organizations outside of Mexico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we work with companies in both Mexico and the USA. Our team is bilingual and can deliver services in English and Spanish.',
      },
    },
  ],
} as const;

export function injectJsonLd() {
  if (typeof window === 'undefined') {return;}
  const id = 'json-ld-org';
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.id = id;
    el.type = 'application/ld+json';
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(JSON_LD);

  // Inject FAQ schema
  const faqId = 'json-ld-faq';
  let faqEl = document.getElementById(faqId) as HTMLScriptElement | null;
  if (!faqEl) {
    faqEl = document.createElement('script');
    faqEl.id = faqId;
    faqEl.type = 'application/ld+json';
    document.head.appendChild(faqEl);
  }
  faqEl.textContent = JSON.stringify(FAQ_JSON_LD);

  // Inject Service schema
  const serviceId = 'json-ld-service';
  let serviceEl = document.getElementById(serviceId) as HTMLScriptElement | null;
  if (!serviceEl) {
    serviceEl = document.createElement('script');
    serviceEl.id = serviceId;
    serviceEl.type = 'application/ld+json';
    document.head.appendChild(serviceEl);
  }
  serviceEl.textContent = JSON.stringify(SERVICE_JSON_LD);
}
