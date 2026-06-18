import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 4, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const cols = 48, rows = 32, spacing = 0.35;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(cols * rows * 3);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        positions[i++] = (x - cols / 2) * spacing;
        positions[i++] = 0;
        positions[i++] = (z - rows / 2) * spacing;
      }
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xC9542C,
      size: 0.045,
      transparent: true,
      opacity: 0.55
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let frame = 0;
    let visible = true;
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!visible || reduced) return;
      frame += 0.012;
      const pos = geometry.attributes.position;
      for (let x = 0; x < cols; x++) {
        for (let z = 0; z < rows; z++) {
          const idx = (x * rows + z) * 3 + 1;
          pos.array[idx] = Math.sin(x * 0.3 + frame) * 0.35 + Math.cos(z * 0.3 + frame) * 0.35;
        }
      }
      pos.needsUpdate = true;
      points.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    animate();

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(mount);

    const handleResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true" />;
}
