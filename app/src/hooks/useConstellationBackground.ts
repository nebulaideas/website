import { useRef, useEffect, useState, type RefObject } from 'react';
import * as THREE from 'three';

interface ConstellationConfig {
  particleCount?: number;
  particleSize?: number;
  cameraZ?: number;
  fogColor?: number;
  fogDensity?: number;
  clearAlpha?: number;
  clearColor?: number;
  mouseTracking?: boolean;
  connectionOpacity?: number;
  connectionMaxDist?: number;
  connectionMaxConnections?: number;
  distribution?: 'uniform' | 'galaxy';
  lights?: boolean;
  goldRatio?: number;
  goldOpacity?: number;
  blueOpacity?: number;
  galaxySpread?: number;
}

export function useConstellationBackground(
  containerRef: RefObject<HTMLDivElement | null>,
  config: ConstellationConfig = {}
): { loaded: boolean } {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  const {
    particleCount = 70,
    particleSize = 0.12,
    cameraZ = 28,
    fogColor: fogColorVal = 0x010409,
    fogDensity = 0.02,
    clearAlpha = 1,
    clearColor = 0x010409,
    mouseTracking = true,
    connectionOpacity = 0.08,
    connectionMaxDist = 7,
    connectionMaxConnections = 180,
    distribution = 'uniform',
    lights: enableLights = true,
    goldRatio = 0.6,
    goldOpacity = 0.6,
    blueOpacity = 0.25,
  } = config;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {return;}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    if (fogColorVal !== undefined) {
      scene.fog = new THREE.FogExp2(fogColorVal, fogDensity);
    }

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(clearColor, clearAlpha);
    container.appendChild(renderer.domElement);

    // ── Particles as TWO Points objects (gold + blue) ──────────────────────
    const masterX = new Float32Array(particleCount);
    const masterY = new Float32Array(particleCount);
    const masterZ = new Float32Array(particleCount);
    const vx = new Float32Array(particleCount);
    const vy = new Float32Array(particleCount);
    const vz = new Float32Array(particleCount);
    const goldIndices: number[] = [];
    const blueIndices: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 1 - goldRatio;
      const vScale = distribution === 'galaxy' ? 0.005 : 0.01;

      if (distribution === 'galaxy') {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * (config.galaxySpread ?? 20);
        masterX[i] = Math.cos(angle) * radius + (Math.random() - 0.5) * 8;
        masterY[i] = Math.sin(angle) * radius * 0.4 + (Math.random() - 0.5) * 6;
        masterZ[i] = (Math.random() - 0.5) * 12;
      } else {
        masterX[i] = (Math.random() - 0.5) * 48;
        masterY[i] = (Math.random() - 0.5) * 30;
        masterZ[i] = (Math.random() - 0.5) * 18;
      }

      vx[i] = (Math.random() - 0.5) * vScale;
      vy[i] = (Math.random() - 0.5) * vScale;
      vz[i] = (Math.random() - 0.5) * (vScale * 0.5);

      if (isGold) {goldIndices.push(i);} else {blueIndices.push(i);}
    }

    type PointsGroup = {
      mesh: THREE.Points;
      geo: THREE.BufferGeometry;
      attr: THREE.BufferAttribute;
      mat: THREE.PointsMaterial;
      indices: number[];
    };

    const gold = createPointsGroup(goldIndices, 0xd4af37, goldOpacity);
    const blue = createPointsGroup(blueIndices, 0x58a6ff, blueOpacity);
    if (gold) {scene.add(gold.mesh);}
    if (blue) {scene.add(blue.mesh);}

    function createPointsGroup(
      indices: number[],
      color: number,
      opacity: number,
    ): PointsGroup | null {
      if (indices.length === 0) {return null;}
      const arr = new Float32Array(indices.length * 3);
      for (let gi = 0; gi < indices.length; gi++) {
        const mi = indices[gi];
        arr[gi * 3] = masterX[mi];
        arr[gi * 3 + 1] = masterY[mi];
        arr[gi * 3 + 2] = masterZ[mi];
      }
      const attr = new THREE.BufferAttribute(arr, 3);
      attr.setUsage(THREE.DynamicDrawUsage);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', attr);
      const mat = new THREE.PointsMaterial({
        size: particleSize,
        color,
        transparent: true,
        opacity,
        sizeAttenuation: true,
      });
      return { mesh: new THREE.Points(geo, mat), geo, attr, mat, indices };
    }

    // Ambient glow lights
    let pointLight: THREE.PointLight | null = null;
    let blueLight: THREE.PointLight | null = null;
    if (enableLights) {
      pointLight = new THREE.PointLight(0xd4af37, 0.4, 30);
      pointLight.position.set(8, 5, 5);
      scene.add(pointLight);

      blueLight = new THREE.PointLight(0x58a6ff, 0.2, 25);
      blueLight.position.set(-8, -5, 5);
      scene.add(blueLight);
    }

    // Connection lines — pre-allocated fixed buffer, updated in-place each frame
    const maxSlots = connectionMaxConnections;
    const linePositions = new Float32Array(maxSlots * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setDrawRange(0, 0);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: connectionOpacity,
    });
    const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    scene.add(linesMesh);

    const cameraTarget = { x: 0, y: 0 };
    let animFrameId: number;
    let isActive = true;

    function animate() {
      if (!isActive) {return;}
      animFrameId = requestAnimationFrame(animate);

      const bounds = distribution === 'galaxy'
        ? { x: 20, y: 10, z: 8 }
        : { x: 24, y: 15, z: 9 };

      // Update master positions
      for (let i = 0; i < particleCount; i++) {
        masterX[i] += vx[i];
        masterY[i] += vy[i];
        masterZ[i] += vz[i];
        if (Math.abs(masterX[i]) > bounds.x) {vx[i] *= -1;}
        if (Math.abs(masterY[i]) > bounds.y) {vy[i] *= -1;}
        if (Math.abs(masterZ[i]) > bounds.z) {vz[i] *= -1;}
      }

      // Copy master positions into gold/blue geometry buffers
      const syncGroup = (g: PointsGroup) => {
        const arr = g.attr.array as Float32Array;
        for (let gi = 0; gi < g.indices.length; gi++) {
          const mi = g.indices[gi];
          const gi3 = gi * 3;
          arr[gi3] = masterX[mi];
          arr[gi3 + 1] = masterY[mi];
          arr[gi3 + 2] = masterZ[mi];
        }
        g.attr.needsUpdate = true;
      };
      if (gold) {syncGroup(gold);}
      if (blue) {syncGroup(blue);}

      // Connection lines
      let writeIdx = 0;
      let connectionCount = 0;

      for (let i = 0; i < particleCount && connectionCount < maxSlots; i++) {
        for (let j = i + 1; j < particleCount && connectionCount < maxSlots; j++) {
          const dx = masterX[i] - masterX[j];
          const dy = masterY[i] - masterY[j];
          const dz = masterZ[i] - masterZ[j];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectionMaxDist) {
            const idx = writeIdx * 3;
            linePositions[idx] = masterX[i];
            linePositions[idx + 1] = masterY[i];
            linePositions[idx + 2] = masterZ[i];
            linePositions[idx + 3] = masterX[j];
            linePositions[idx + 4] = masterY[j];
            linePositions[idx + 5] = masterZ[j];
            writeIdx += 2;
            connectionCount++;
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.setDrawRange(0, writeIdx);

      if (mouseTracking) {
        cameraTarget.x += (mouseRef.current.x * 0.06 - cameraTarget.x) * 0.04;
        cameraTarget.y += (mouseRef.current.y * 0.06 - cameraTarget.y) * 0.04;
        camera.rotation.x = cameraTarget.y;
        camera.rotation.y = cameraTarget.x;
      }

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    const timer = setTimeout(() => setLoaded(true), 300);

    const handleMouseMove = mouseTracking
      ? (e: MouseEvent) => {
          mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
          mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
        }
      : null;

    if (handleMouseMove) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Only observe resize when animation loop is active (non-reduced-motion)
    if (!prefersReducedMotion) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      });
      resizeObserver.observe(container);

      return () => {
        isActive = false;
        cancelAnimationFrame(animFrameId);
        clearTimeout(timer);
        if (handleMouseMove) {
          window.removeEventListener('mousemove', handleMouseMove);
        }
        resizeObserver.disconnect();
        cleanupResources();
      };
    }

    return () => {
      isActive = false;
      cancelAnimationFrame(animFrameId);
      clearTimeout(timer);
      if (handleMouseMove) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cleanupResources();
    };

    function cleanupResources() {
      if (gold) { gold.geo.dispose(); gold.mat.dispose(); }
      if (blue) { blue.geo.dispose(); blue.mat.dispose(); }
      lineGeo.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (container?.contains(renderer.domElement)) {
        container?.removeChild(renderer.domElement);
      }
    }
  }, [
    containerRef,
    particleCount,
    particleSize,
    cameraZ,
    fogColorVal,
    fogDensity,
    clearAlpha,
    clearColor,
    mouseTracking,
    connectionOpacity,
    connectionMaxDist,
    connectionMaxConnections,
    distribution,
    enableLights,
    goldRatio,
    goldOpacity,
    blueOpacity,
    config.galaxySpread,
  ]);

  return { loaded };
}
