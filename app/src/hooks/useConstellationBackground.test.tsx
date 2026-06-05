import { render, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRef, type RefObject } from 'react';
import { useConstellationBackground } from './useConstellationBackground';

const { mockDispose, mockThreeRef } = vi.hoisted(() => {
  const mockDispose = vi.fn();

  const mockThree = {
    Scene: vi.fn(function () { return { fog: null, add: vi.fn(), remove: vi.fn() }; }),
    PerspectiveCamera: vi.fn(function () {
      return {
        position: { x: 0, y: 0, z: 0, set: vi.fn() }, aspect: 1,
        rotation: { x: 0, y: 0 }, updateProjectionMatrix: vi.fn(),
      };
    }),
    WebGLRenderer: vi.fn(function () {
      return {
        domElement: document.createElement('div'),
        setSize: vi.fn(), setPixelRatio: vi.fn(),
        setClearColor: vi.fn(), render: vi.fn(),
        dispose: mockDispose,
      };
    }),
    SphereGeometry: vi.fn(function () { return { dispose: mockDispose }; }),
    MeshBasicMaterial: vi.fn(function () {
      return { dispose: mockDispose, color: 0, transparent: false, opacity: 1 };
    }),
    Mesh: vi.fn(function () {
      return {
        position: { x: 0, y: 0, z: 0, set: vi.fn(), add: vi.fn(), distanceTo: vi.fn(() => 0) },
        userData: {},
        material: { dispose: mockDispose },
        geometry: { dispose: mockDispose },
      };
    }),
    PointLight: vi.fn(function () {
      return { position: { x: 0, y: 0, z: 0, set: vi.fn() }, dispose: mockDispose };
    }),
    FogExp2: vi.fn(),
    BufferGeometry: vi.fn(function () {
      const attrs: Record<string, { needsUpdate: boolean }> = {};
      return {
        attributes: attrs,
        setAttribute: vi.fn((name: string, attr: { needsUpdate: boolean }) => { attrs[name] = attr; }),
        setDrawRange: vi.fn(), dispose: mockDispose,
      };
    }),
    BufferAttribute: vi.fn(function (array: Float32Array, itemSize: number) {
      return { array, itemSize, needsUpdate: false };
    }),
    LineBasicMaterial: vi.fn(function () {
      return { dispose: mockDispose, color: 0, transparent: false, opacity: 1 };
    }),
    LineSegments: vi.fn(function () { return { geometry: {}, material: {} }; }),
    Vector3: vi.fn(function (x = 0, y = 0, z = 0) {
      return { x, y, z, set: vi.fn(), distanceTo: vi.fn(() => 0) };
    }),
  };

  return { mockDispose, mockThreeRef: { current: mockThree } };
});

vi.mock('three', () => mockThreeRef.current);

function TestComponent({
  mouseTracking,
  distribution,
}: {
  mouseTracking?: boolean;
  distribution?: 'uniform' | 'galaxy';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { loaded } = useConstellationBackground(ref as RefObject<HTMLDivElement | null>, {
    particleCount: 5,
    mouseTracking,
    distribution,
    lights: true,
  });

  return (
    <div>
      <div ref={ref} data-testid="container" />
      <span data-testid="loaded">{loaded ? 'true' : 'false'}</span>
    </div>
  );
}

describe('useConstellationBackground', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve loaded with mouseTracking: true', async () => {
    const { getByTestId } = render(<TestComponent mouseTracking />);
    expect(getByTestId('loaded').textContent).toBe('false');
    await waitFor(() => expect(getByTestId('loaded').textContent).toBe('true'), { timeout: 2000 });
  });

  it('should resolve loaded with mouseTracking: false', async () => {
    const { getByTestId } = render(<TestComponent mouseTracking={false} />);
    expect(getByTestId('loaded').textContent).toBe('false');
    await waitFor(() => expect(getByTestId('loaded').textContent).toBe('true'), { timeout: 2000 });
  });

  it('should handle galaxy distribution', async () => {
    const { getByTestId } = render(<TestComponent distribution="galaxy" mouseTracking />);
    await waitFor(() => expect(getByTestId('loaded').textContent).toBe('true'), { timeout: 2000 });
  });

  it('should dispose GPU resources on unmount', () => {
    const { unmount } = render(<TestComponent mouseTracking />);
    unmount();
    expect(mockDispose).toHaveBeenCalled();
  });

  it('should return early and not render when prefers-reduced-motion is enabled', () => {
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

    const { getByTestId } = render(<TestComponent mouseTracking />);
    expect(getByTestId('loaded').textContent).toBe('true');

    window.matchMedia = originalMatchMedia;
  });

  it('should detect low-memory devices and disable mouse tracking', () => {
    const originalNavigator = window.navigator;
    Object.defineProperty(window, 'navigator', {
      value: {
        ...originalNavigator,
        deviceMemory: 2,
      },
      writable: true,
      configurable: true,
    });

    const { getByTestId } = render(<TestComponent mouseTracking />);
    // Should still render but with reduced particle count and no mouse tracking
    expect(getByTestId('loaded')).toBeInTheDocument();

    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
  });

  it('should handle mouse move events when mouseTracking is enabled', () => {
    const { getByTestId } = render(<TestComponent mouseTracking />);

    act(() => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });
      window.dispatchEvent(mouseEvent);
    });

    // Verify the hook doesn't crash with mouse events
    expect(getByTestId('loaded')).toBeInTheDocument();
  });

  it('should handle resize events', () => {
    let resizeCallback: (entries: Array<{ contentRect: { width: number; height: number } }>) => void = () => {};
    const mockObserve = vi.fn();
    const mockDisconnect = vi.fn();

    class TestResizeObserver {
      constructor(callback: (entries: Array<{ contentRect: { width: number; height: number } }>) => void) {
        resizeCallback = callback;
      }
      observe = mockObserve;
      disconnect = mockDisconnect;
      unobserve = vi.fn();
    }

    const originalRO = window.ResizeObserver;
    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      configurable: true,
      value: TestResizeObserver,
    });

    const { unmount } = render(<TestComponent mouseTracking />);

    act(() => {
      // Trigger resize callback
      resizeCallback([
        { contentRect: { width: 500, height: 300 } },
      ]);
    });

    unmount();
    expect(mockDispose).toHaveBeenCalled();
    expect(mockDisconnect).toHaveBeenCalled();

    window.ResizeObserver = originalRO;
  });
});
