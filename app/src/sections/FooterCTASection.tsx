import { useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar } from 'lucide-react';
import * as THREE from 'three';

export default function FooterCTASection() {
  const { t, calendlyUrl } = useLanguage();
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Subtle Three.js galaxy effect
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) {return;}

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x010409, 0);
    container.appendChild(renderer.domElement);

    // Galaxy particles - sparser than hero, more spread out
    const particleCount = 50;
    const particles: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.1, 6, 6);

    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 0.5;
      const mat = new THREE.MeshBasicMaterial({
        color: isGold ? 0xd4af37 : 0x58a6ff,
        transparent: true,
        opacity: isGold ? 0.35 : 0.15,
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      // Spread in a wider disk/galaxy pattern
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
      scene.add(mesh);
      particles.push(mesh);
    }

    // Connection lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.05,
    });
    let linesMesh: THREE.LineSegments | null = null;

    let animFrameId: number;
    let isActive = true;

    function animate() {
      if (!isActive) {return;}
      animFrameId = requestAnimationFrame(animate);

      particles.forEach((p) => {
        p.position.add(p.userData.velocity);
        if (Math.abs(p.position.x) > 20) {p.userData.velocity.x *= -1;}
        if (Math.abs(p.position.y) > 10) {p.userData.velocity.y *= -1;}
        if (Math.abs(p.position.z) > 8) {p.userData.velocity.z *= -1;}
      });

      if (linesMesh) {
        scene.remove(linesMesh);
        linesMesh.geometry.dispose();
      }

      const positions: number[] = [];
      const maxDist = 6;
      let connectionCount = 0;
      const maxConnections = 120;

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

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderer.render(scene, camera);
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

  return (
    <section id="schedule" className="relative w-full py-28 md:py-36 bg-obsidian-base text-center overflow-hidden">
      {/* Three.js Galaxy Canvas */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-0" aria-hidden="true" />

      {/* Content */}
      <div className="container-main max-w-3xl relative z-10">
        <h2
          className="font-display text-display-md text-on-surface mb-6"
          style={{ textShadow: '0 2px 30px rgba(0,0,0,0.5)' }}
        >
          {t('footer_cta_headline')}
        </h2>
        <p className="font-body text-body-lg text-on-surface-variant mb-4 max-w-2xl mx-auto">
          {t('footer_cta_desc')}
        </p>
        <p className="font-body text-body-md text-on-surface-variant mb-10 max-w-xl mx-auto">
          {t('footer_cta_body')}
        </p>
        <a
          href={calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-nebula-gold text-nebula-navy px-10 py-5 rounded font-tech text-[16px] font-bold hover:bg-nebula-gold-hover transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-strong inline-flex items-center gap-3"
        >
          {t('footer_cta_button')}
          <Calendar size={20} />
        </a>
      </div>
    </section>
  );
}
