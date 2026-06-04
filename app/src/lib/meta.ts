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
  updateMeta('property', 'og:title', title);
  updateMeta('property', 'og:description', ogDescription);
  updateMeta('property', 'og:site_name', siteName);
  updateMeta('name', 'twitter:title', title);
  updateMeta('name', 'twitter:description', ogDescription);
  updateMeta('property', 'og:locale', language === 'en' ? 'en_US' : 'es_MX');
  updateMeta('property', 'og:url', window.location.href);
  updateMeta('property', 'og:type', 'website');
  updateMeta('property', 'og:image', 'https://nebulaideas.com/assets/logo.png');
  updateMeta('name', 'twitter:card', 'summary_large_image');
  updateMeta('name', 'twitter:site', '@nebulaideas');
  updateMeta('name', 'twitter:creator', '@nebulaideas');
  updateMeta('name', 'twitter:image', 'https://nebulaideas.com/assets/logo.png');
}
