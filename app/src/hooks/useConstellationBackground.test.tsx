import { render, waitFor } from '@testing-library/react';
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
});
