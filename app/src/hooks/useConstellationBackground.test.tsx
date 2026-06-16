import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRef, type RefObject } from 'react';
import { useConstellationBackground } from './useConstellationBackground';

const { disposeRenderer, disposeGeo, disposePointsMat, disposeLineMat, mockThreeRef } = vi.hoisted(() => {
  const disposeRenderer = vi.fn();
  const disposeGeo = vi.fn();
  const disposePointsMat = vi.fn();
  const disposeLineMat = vi.fn();

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
        dispose: disposeRenderer,
      };
    }),
    PointsMaterial: vi.fn(function () {
      return { dispose: disposePointsMat, size: 1, color: 0, transparent: false, opacity: 1 };
    }),
    Points: vi.fn(function () {
      return { geometry: {}, material: {} };
    }),
    PointLight: vi.fn(function () {
      return { position: { x: 0, y: 0, z: 0, set: vi.fn() } };
    }),
    FogExp2: vi.fn(),
    BufferGeometry: vi.fn(function () {
      const attrs: Record<string, { needsUpdate: boolean }> = {};
      return {
        attributes: attrs,
        setAttribute: vi.fn((name: string, attr: { needsUpdate: boolean }) => { attrs[name] = attr; }),
        setDrawRange: vi.fn(),
        dispose: disposeGeo,
      };
    }),
    BufferAttribute: vi.fn(function (array: Float32Array, itemSize: number) {
      return { array, itemSize, needsUpdate: false, setUsage: vi.fn() };
    }),
    LineBasicMaterial: vi.fn(function () {
      return { dispose: disposeLineMat, color: 0, transparent: false, opacity: 1 };
    }),
    LineSegments: vi.fn(function () { return { geometry: {}, material: {} }; }),
    Vector3: vi.fn(function (x = 0, y = 0, z = 0) {
      return { x, y, z, set: vi.fn(), distanceTo: vi.fn(() => 0) };
    }),
    DynamicDrawUsage: 1,
  };

  return { disposeRenderer, disposeGeo, disposePointsMat, disposeLineMat, mockThreeRef: { current: mockThree } };
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

  // Deterministic Math.random that produces gold and blue particles
  let randIndex = 0;
  beforeEach(() => {
    randIndex = 0;
    vi.spyOn(Math, 'random').mockImplementation(() => {
      const vals = [
        0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, // particle 0 (isGold=0.1<0.6 → gold)
        0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, // particle 1 (isGold=0.7>0.6 → blue)
        0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, // particle 2 (gold)
        0.7, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, // particle 3 (blue)
        0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, // particle 4 (gold)
      ];
      const v = vals[randIndex % vals.length];
      randIndex++;
      return v;
    });
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
    function SingleGroupTest() {
      const ref = useRef<HTMLDivElement>(null);
      const { loaded } = useConstellationBackground(ref as RefObject<HTMLDivElement | null>, {
        particleCount: 5,
        goldRatio: 1,
        mouseTracking: true,
        lights: true,
      });
      return (
        <div>
          <div ref={ref} data-testid="container" />
          <span data-testid="loaded">{loaded ? 'true' : 'false'}</span>
        </div>
      );
    }
    const { unmount } = render(<SingleGroupTest />);
    unmount();
    expect(disposeRenderer).toHaveBeenCalledTimes(1);
    // BufferGeometry: 1 (gold points) + 1 (lines) = 2
    expect(disposeGeo).toHaveBeenCalledTimes(2);
    // PointsMaterial: 1 (gold only)
    expect(disposePointsMat).toHaveBeenCalledTimes(1);
    // LineBasicMaterial: 1
    expect(disposeLineMat).toHaveBeenCalledTimes(1);
  });
});
