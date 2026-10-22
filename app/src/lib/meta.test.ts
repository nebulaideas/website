import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateMetaTags } from './meta';

describe('updateMetaTags', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    document.title = '';
    vi.restoreAllMocks();
  });

  const defaults = {
    ogDescription: 'An og description',
    siteName: 'Nebula Ideas',
  };

  it('should update document title', () => {
    updateMetaTags({ title: 'New Title', description: 'New Description', language: 'en', ...defaults });
    expect(document.title).toBe('New Title');
  });

  it('should create and update meta tags', () => {
    updateMetaTags({ title: 'Home', description: 'Welcome to Nebula', language: 'en', ...defaults });

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toBeInTheDocument();
    expect(descMeta).toHaveAttribute('content', 'Welcome to Nebula');

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    expect(ogTitleMeta).toBeInTheDocument();
    expect(ogTitleMeta).toHaveAttribute('content', 'Home');

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    expect(ogDescMeta).toBeInTheDocument();
    expect(ogDescMeta).toHaveAttribute('content', 'An og description');

    const ogSiteNameMeta = document.querySelector('meta[property="og:site_name"]');
    expect(ogSiteNameMeta).toBeInTheDocument();
    expect(ogSiteNameMeta).toHaveAttribute('content', 'Nebula Ideas');

    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
    expect(ogLocaleMeta).toBeInTheDocument();
    expect(ogLocaleMeta).toHaveAttribute('content', 'en_US');

    // Update again to ensure they are updated and not duplicated
    updateMetaTags({
      title: 'New Home',
      description: 'Updated description',
      ogDescription: 'Updated og description',
      siteName: 'Nebula Ideas',
      language: 'es',
    });

    const descriptions = document.querySelectorAll('meta[name="description"]');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0]).toHaveAttribute('content', 'Updated description');

    const ogLocaleMetaEs = document.querySelector('meta[property="og:locale"]');
    expect(ogLocaleMetaEs).toHaveAttribute('content', 'es_MX');

    const ogDescMetaUpdated = document.querySelector('meta[property="og:description"]');
    expect(ogDescMetaUpdated).toHaveAttribute('content', 'Updated og description');
  });

  it('should set canonical and OG image to the canonical domain', () => {
    updateMetaTags({ title: 'Home', description: 'Desc', language: 'en', ...defaults });

    const canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    expect(canonical).toHaveAttribute('href', 'https://nebulaideas.com/');

    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl).toHaveAttribute('content', 'https://nebulaideas.com/');

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage).toHaveAttribute('content', 'https://nebulaideas.com/og-image.png');

    const twImage = document.querySelector('meta[name="twitter:image"]');
    expect(twImage).toHaveAttribute('content', 'https://nebulaideas.com/og-image.png');
  });

  it('should set OG image dimensions and alt text', () => {
    updateMetaTags({ title: 'Home', description: 'Desc', language: 'en', ...defaults });

    const width = document.querySelector('meta[property="og:image:width"]');
    expect(width).toHaveAttribute('content', '1200');
    const height = document.querySelector('meta[property="og:image:height"]');
    expect(height).toHaveAttribute('content', '630');
    const alt = document.querySelector('meta[property="og:image:alt"]');
    expect(alt).toHaveAttribute('content', 'Home');
  });

  it('should not duplicate canonical when updated twice', () => {
    updateMetaTags({ title: 'Home', description: 'Desc', language: 'en', ...defaults });
    updateMetaTags({ title: 'Home', description: 'Desc', language: 'es', ...defaults });
    expect(document.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(document.querySelectorAll('meta[property="og:image"]').length).toBe(1);
  });

  it('should work when CSS is undefined', () => {
    const originalCSS = globalThis.CSS;
    // @ts-expect-error deleting CSS to test fallback
    delete globalThis.CSS;

    updateMetaTags({ title: 'No CSS', description: 'Fallback path', language: 'en', ...defaults });

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toHaveAttribute('content', 'Fallback path');

    globalThis.CSS = originalCSS;
  });
});
