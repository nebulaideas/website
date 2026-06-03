import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ScrollReveal from './ScrollReveal';

describe('ScrollReveal component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render its children', () => {
    render(
      <ScrollReveal>
        <div data-testid="child">Hello World</div>
      </ScrollReveal>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('should be immediately visible if prefers-reduced-motion matches reduce', () => {
    // Override matchMedia mock to return true for prefers-reduced-motion
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { container } = render(
      <ScrollReveal>
        <div>Content</div>
      </ScrollReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.opacity).toBe('1');
    expect(wrapper.style.transform).toBe('translate(0, 0)');

    // Restore original matchMedia mock
    window.matchMedia = originalMatchMedia;
  });

  it('should start invisible and use IntersectionObserver if reduced motion is false', () => {
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    // Track observer instances
    let observeCallback: (entries: IntersectionObserverEntry[]) => void = () => {};
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();

    // Redefine MockIntersectionObserver locally to capture callback
    class TestIntersectionObserver {
      constructor(callback: (entries: IntersectionObserverEntry[]) => void) {
        observeCallback = callback;
      }
      observe = mockObserve;
      unobserve = vi.fn();
      disconnect = mockDisconnect;
    }

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: TestIntersectionObserver,
    });

    const { container } = render(
      <ScrollReveal>
        <div>Content</div>
      </ScrollReveal>
    );

    const wrapper = container.firstChild as HTMLElement;
    
    // Starts invisible
    expect(wrapper.style.opacity).toBe('0');
    expect(wrapper.style.transform).toBe('translateY(40px)'); // default direction up
    expect(mockObserve).toHaveBeenCalledWith(wrapper);

    // Trigger intersection
    act(() => {
      observeCallback([
        { isIntersecting: true, target: wrapper } as unknown as IntersectionObserverEntry,
      ]);
    });

    // Should become visible
    expect(wrapper.style.opacity).toBe('1');
    expect(wrapper.style.transform).toBe('translate(0, 0)');

    // Unmount should disconnect observer
    const { unmount } = render(
      <ScrollReveal>
        <div>Content</div>
      </ScrollReveal>
    );
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
    // Restore window mock
    window.matchMedia = originalMatchMedia;
  });
});
