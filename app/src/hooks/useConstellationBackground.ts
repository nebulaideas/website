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
    fogColor = 0x010409,
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
    if (fogColor !== undefined) {
      scene.fog = new THREE.FogExp2(fogColor, fogDensity);
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

    // Particles
    const particles: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(particleSize, 6, 6);

    const goldMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: goldOpacity,
    });
    const blueMat = new THREE.MeshBasicMaterial({
      color: 0x58a6ff,
      transparent: true,
      opacity: blueOpacity,
    });

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 1 - goldRatio;
      const mesh = new THREE.Mesh(sphereGeo, isGold ? goldMat : blueMat);

      if (distribution === 'galaxy') {
        const angle = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 20;
        mesh.position.set(
          Math.cos(angle) * radius + (Math.random() - 0.5) * 8,
          Math.sin(angle) * radius * 0.4 + (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 12
        );
        mesh.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.002
        );
      } else {
        mesh.position.set(
          (Math.random() - 0.5) * 48,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 18
        );
        mesh.userData.velocity = new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        );
      }

      scene.add(mesh);
      particles.push(mesh);
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
    const linePositions = new Float32Array(maxSlots * 6); // 2 vertices * 3 coords per connection
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

      particles.forEach((p) => {
        p.position.add(p.userData.velocity);
        if (Math.abs(p.position.x) > bounds.x) {p.userData.velocity.x *= -1;}
        if (Math.abs(p.position.y) > bounds.y) {p.userData.velocity.y *= -1;}
        if (Math.abs(p.position.z) > bounds.z) {p.userData.velocity.z *= -1;}
      });

      let writeIdx = 0;
      let connectionCount = 0;

      for (let i = 0; i < particles.length && connectionCount < maxSlots; i++) {
        for (let j = i + 1; j < particles.length && connectionCount < maxSlots; j++) {
          const dist = particles[i].position.distanceTo(particles[j].position);
          if (dist < connectionMaxDist) {
            const idx = writeIdx * 3;
            const px = particles[i].position;
            const py = particles[j].position;
            linePositions[idx]     = px.x;
            linePositions[idx + 1] = px.y;
            linePositions[idx + 2] = px.z;
            linePositions[idx + 3] = py.x;
            linePositions[idx + 4] = py.y;
            linePositions[idx + 5] = py.z;
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
      sphereGeo.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      goldMat.dispose();
      blueMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { loaded };
}
