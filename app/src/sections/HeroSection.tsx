import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { ArrowDown } from 'lucide-react';
import * as THREE from 'three';

export default function HeroSection() {
  const { t } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Three.js constellation effect
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) {return;}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010409, 0.02);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x010409, 1);
    container.appendChild(renderer.domElement);

    // Particles - gold and muted blue
    const particleCount = 70;
    const particles: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.12, 6, 6);

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 0.4;
      const mat = new THREE.MeshBasicMaterial({
        color: isGold ? 0xd4af37 : 0x58a6ff,
        transparent: true,
        opacity: isGold ? 0.6 : 0.25,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
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
      scene.add(mesh);
      particles.push(mesh);
    }

    // Ambient glow light
    const pointLight = new THREE.PointLight(0xd4af37, 0.4, 30);
    pointLight.position.set(8, 5, 5);
    scene.add(pointLight);

    const blueLight = new THREE.PointLight(0x58a6ff, 0.2, 25);
    blueLight.position.set(-8, -5, 5);
    scene.add(blueLight);

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.08,
    });
    let linesMesh: THREE.LineSegments | null = null;

    const cameraTarget = { x: 0, y: 0 };
    let animFrameId: number;
    let isActive = true;

    function animate() {
      if (!isActive) {return;}
      animFrameId = requestAnimationFrame(animate);

      particles.forEach((p) => {
        p.position.add(p.userData.velocity);
        if (Math.abs(p.position.x) > 24) {p.userData.velocity.x *= -1;}
        if (Math.abs(p.position.y) > 15) {p.userData.velocity.y *= -1;}
        if (Math.abs(p.position.z) > 9) {p.userData.velocity.z *= -1;}
      });

      if (linesMesh) {
        scene.remove(linesMesh);
        linesMesh.geometry.dispose();
      }

      const positions: number[] = [];
      const maxDist = 7;
      let connectionCount = 0;
      const maxConnections = 180;

      for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const dist = particles[i].position.distanceTo(particles[j].position);
          if (dist < maxDist) {
            positions.push(
              particles[i].position.x, particles[i].position.y, particles[i].position.z,
              particles[j].position.x, particles[j].position.y, particles[j].position.z
            );
            connectionCount++;
          }
        }
      }

      if (positions.length > 0) {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
        scene.add(linesMesh);
      }

      cameraTarget.x += (mouseRef.current.x * 0.06 - cameraTarget.x) * 0.04;
      cameraTarget.y += (mouseRef.current.y * 0.06 - cameraTarget.y) * 0.04;
      camera.rotation.x = cameraTarget.y;
      camera.rotation.y = cameraTarget.x;

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    const timer = setTimeout(() => setLoaded(true), 300);

    return () => {
      isActive = false;
      cancelAnimationFrame(animFrameId);
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      if (linesMesh) {linesMesh.geometry.dispose();}
      sphereGeo.dispose();
      lineMaterial.dispose();
      particles.forEach((p) => { (p.material as THREE.Material).dispose(); });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header id="top" className="relative w-full flex flex-col items-center justify-center text-center min-h-[90vh] overflow-hidden">
      {/* Three.js Constellation Canvas */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* CSS Gradient Orbs Overlay (subtle enhancement) */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface-container-high/30 via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-margin-mobile md:px-margin-desktop py-28 md:py-40">
        {/* Headline */}
        <h1
          className={`font-display text-display-lg text-on-surface mb-10 tracking-tight leading-[1.05] transition-all duration-700 delay-100 max-w-[900px] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.6), 0 0 80px rgba(1,4,9,0.8)' }}
        >
          {t('hero_headline')}
        </h1>

        {/* Subheadline */}
        <p
          className={`font-body text-body-lg text-on-surface-variant max-w-3xl mx-auto mb-6 transition-all duration-700 delay-200 leading-relaxed ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ textShadow: '0 1px 20px rgba(0,0,0,0.5)' }}
        >
          {t('hero_subheadline')}
        </p>

        {/* Supporting text */}
        <p
          className={`font-body text-body-md text-on-surface-variant max-w-2xl mx-auto mb-8 transition-all duration-700 delay-250 leading-relaxed ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {t('hero_supporting')}
        </p>

        {/* Tags */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-14 transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {t('hero_tags').split(' \u00B7 ').map((tag) => (
            <span
              key={tag}
              className="font-tech text-tech-data text-nebula-gold/80 px-3 py-1.5 rounded border border-nebula-gold/20 bg-nebula-gold/5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-350 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <a
            href="#clarity-sprint"
            onClick={(e) => handleScrollTo(e, '#clarity-sprint')}
            className="bg-nebula-gold text-nebula-navy px-8 py-4 rounded font-tech text-tech-label font-bold hover:bg-nebula-gold-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-hover min-w-[200px]"
          >
            {t('hero_cta_primary')}
          </a>
          <a
            href="#schedule"
            onClick={(e) => handleScrollTo(e, '#schedule')}
            className="bg-transparent border border-outline-variant text-on-surface px-8 py-4 rounded font-tech text-tech-label hover:border-nebula-gold hover:text-nebula-gold transition-colors duration-200 flex items-center justify-center gap-2 min-w-[200px]"
          >
            {t('hero_cta_secondary')}
            <ArrowDown size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
