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

  it('should use CSS.escape fallback if CSS.escape is defined', () => {
    const originalCSS = globalThis.CSS;

    const mockEscape = vi.fn().mockImplementation((val) => val);
    globalThis.CSS = {
      escape: mockEscape,
      supports: vi.fn(),
    } as unknown as typeof CSS;

    updateMetaTags({ title: 'Escape Test', description: 'Test CSS escape', language: 'en', ...defaults });

    expect(mockEscape).toHaveBeenCalled();

    globalThis.CSS = originalCSS;
  });
});
