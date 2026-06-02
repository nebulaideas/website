import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import CTAButton from '@/components/CTAButton';
import { ChevronDown } from 'lucide-react';
import * as THREE from 'three';

export default function HeroSection() {
  const { t, calendlyUrl } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Three.js constellation effect
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a192f, 0.025);

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
    renderer.setClearColor(0x0a192f, 1);
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 65;
    const particles: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.12, 6, 6);

    for (let i = 0; i < particleCount; i++) {
      const isAmber = Math.random() > 0.35;
      const mat = new THREE.MeshBasicMaterial({
        color: isAmber ? 0xffb800 : 0xffffff,
        transparent: true,
        opacity: isAmber ? 0.65 : 0.35,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18
      );
      mesh.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.012,
        (Math.random() - 0.5) * 0.006
      );
      scene.add(mesh);
      particles.push(mesh);
    }

    // Point light for glow
    const pointLight = new THREE.PointLight(0xffb800, 0.8, 25);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Lines for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffb800,
      transparent: true,
      opacity: 0.1,
    });
    let linesMesh: THREE.LineSegments | null = null;

    // Camera target for smooth interpolation
    const cameraTarget = { x: 0, y: 0 };

    let animFrameId: number;
    let isActive = true;

    function animate() {
      if (!isActive) return;
      animFrameId = requestAnimationFrame(animate);

      // Update particle positions
      particles.forEach((p) => {
        p.position.add(p.userData.velocity);
        if (Math.abs(p.position.x) > 22) p.userData.velocity.x *= -1;
        if (Math.abs(p.position.y) > 14) p.userData.velocity.y *= -1;
        if (Math.abs(p.position.z) > 9) p.userData.velocity.z *= -1;
      });

      // Update connections
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
              particles[i].position.x,
              particles[i].position.y,
              particles[i].position.z,
              particles[j].position.x,
              particles[j].position.y,
              particles[j].position.z
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

      // Mouse parallax
      cameraTarget.x += (mouseRef.current.x * 0.08 - cameraTarget.x) * 0.05;
      cameraTarget.y += (mouseRef.current.y * 0.08 - cameraTarget.y) * 0.05;
      camera.rotation.x = cameraTarget.y;
      camera.rotation.y = cameraTarget.x;

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static render for reduced motion
      renderer.render(scene, camera);
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      }
    });
    resizeObserver.observe(container);

    // Trigger text entrance
    const timer = setTimeout(() => setLoaded(true), 400);

    // Scroll listener for chevron
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      isActive = false;
      cancelAnimationFrame(animFrameId);
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
      if (linesMesh) {
        linesMesh.geometry.dispose();
      }
      sphereGeo.dispose();
      lineMaterial.dispose();
      particles.forEach((p) => {
        (p.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="top" className="relative w-full min-h-[100dvh] overflow-hidden bg-deep-blue">
      {/* Three.js Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex items-center min-h-[100dvh]">
        <div className="container-main py-24 md:py-0">
          <div className="max-w-[680px] mx-auto md:mx-0 text-center md:text-left">
            {/* Headline */}
            <h1
              className={`text-display text-white transition-all duration-800 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(10,25,47,0.8), 0 1px 3px rgba(0,0,0,0.6)',
              }}
            >
              {t('hero_headline')}
            </h1>

            {/* Subheadline */}
            <p
              className={`text-body text-white/80 mt-6 max-w-[560px] mx-auto md:mx-0 transition-all duration-800 delay-200 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                textShadow: '0 1px 10px rgba(0,0,0,0.4), 0 0 30px rgba(10,25,47,0.6), 0 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              {t('hero_subheadline')}
            </p>

            {/* CTA Group */}
            <div
              className={`flex flex-col sm:flex-row items-center gap-4 mt-10 transition-all duration-800 delay-400 ${
                loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
              }`}
              style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
            >
              <CTAButton href={calendlyUrl} external variant="primary">
                {t('hero_cta_primary')}
              </CTAButton>
              <CTAButton
                href="#process"
                variant="secondary"
                onClick={() => {
                  const el = document.getElementById('process');
                  if (el) {
                    const top = el.getBoundingClientRect().top + window.scrollY - 72;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }
                }}
              >
                {t('hero_cta_secondary')}
              </CTAButton>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="animate-bounce-subtle">
          <ChevronDown size={24} className="text-white/60" />
        </div>
      </div>
    </section>
  );
}
