import { describe, it, expect, beforeEach, vi } from 'vitest';
import { updateMetaTags } from './meta';

describe('updateMetaTags', () => {
  beforeEach(() => {
    // Clear head elements to start fresh
    document.head.innerHTML = '';
    document.title = '';
    vi.restoreAllMocks();
  });

  it('should update document title', () => {
    updateMetaTags('New Title', 'New Description', 'en');
    expect(document.title).toBe('New Title');
  });

  it('should create and update meta tags', () => {
    updateMetaTags('Home', 'Welcome to Nebula', 'en');

    const descMeta = document.querySelector('meta[name="description"]');
    expect(descMeta).toBeInTheDocument();
    expect(descMeta).toHaveAttribute('content', 'Welcome to Nebula');

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    expect(ogTitleMeta).toBeInTheDocument();
    expect(ogTitleMeta).toHaveAttribute('content', 'Home');

    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    expect(ogDescMeta).toBeInTheDocument();
    expect(ogDescMeta).toHaveAttribute('content', 'Welcome to Nebula');

    const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
    expect(ogLocaleMeta).toBeInTheDocument();
    expect(ogLocaleMeta).toHaveAttribute('content', 'en_US');

    // Update again to ensure they are updated and not duplicated
    updateMetaTags('New Home', 'Updated description', 'es');
    
    const descriptions = document.querySelectorAll('meta[name="description"]');
    expect(descriptions.length).toBe(1);
    expect(descriptions[0]).toHaveAttribute('content', 'Updated description');

    const ogLocaleMetaEs = document.querySelector('meta[property="og:locale"]');
    expect(ogLocaleMetaEs).toHaveAttribute('content', 'es_MX');
  });

  it('should use CSS.escape fallback if CSS.escape is defined', () => {
    const originalCSS = globalThis.CSS;
    
    // Mock CSS.escape
    const mockEscape = vi.fn().mockImplementation((val) => val);
    globalThis.CSS = {
      escape: mockEscape,
      supports: vi.fn(),
    } as unknown as typeof CSS;

    updateMetaTags('Escape Test', 'Test CSS escape', 'en');

    expect(mockEscape).toHaveBeenCalled();

    // Restore CSS
    globalThis.CSS = originalCSS;
  });
});
