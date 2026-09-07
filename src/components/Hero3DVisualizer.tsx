import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, Activity } from 'lucide-react';

export const Hero3DVisualizer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasFailedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    let renderer: THREE.WebGLRenderer;
    let animId: number;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      camera.position.z = 7.5;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Core Icosahedron - Cyan Tech Mesh
      const geometry = new THREE.IcosahedronGeometry(2.0, 2);
      const material = new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
      });
      const coreMesh = new THREE.Mesh(geometry, material);
      scene.add(coreMesh);

      // Inner Core Node - Amber Octahedron
      const innerGeo = new THREE.OctahedronGeometry(1.1, 1);
      const innerMat = new THREE.MeshBasicMaterial({
        color: 0xf59e0b,
        wireframe: true,
        transparent: true,
        opacity: 0.65,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      scene.add(innerMesh);

      // Orbit Ring - Violet Torus
      const ringGeo = new THREE.TorusGeometry(3.0, 0.02, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.45,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 3.5;
      scene.add(ringMesh);

      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
      };
      window.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        animId = requestAnimationFrame(animate);

        coreMesh.rotation.x += 0.003;
        coreMesh.rotation.y += 0.005;

        innerMesh.rotation.x -= 0.005;
        innerMesh.rotation.y -= 0.004;

        ringMesh.rotation.z += 0.002;

        coreMesh.rotation.y += (mouseX * 0.4 - coreMesh.rotation.y) * 0.05;
        coreMesh.rotation.x += (-mouseY * 0.4 - coreMesh.rotation.x) * 0.05;

        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        if (!container) return;
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        camera.aspect = newW / newH;
        camera.updateProjectionMatrix();
        renderer.setSize(newW, newH);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animId);
        if (container && renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.warn("Three.js initialization fallback:", err);
      canvasFailedRef.current = true;
    }
  }, []);

  return (
    <div className="relative w-full h-[380px] md:h-[480px] flex items-center justify-center">
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-0" />
      
      <div className="absolute bottom-4 left-4 right-4 bg-obsidian-950/80 backdrop-blur-md border border-obsidian-700/80 rounded-lg p-3 text-xs font-mono flex items-center justify-between z-10 shadow-lg">
        <div className="flex items-center gap-2 text-cyan-400">
          <Cpu className="w-4 h-4 animate-pulse" />
          <span>3D System Visualizer: Reactive Node Mesh</span>
        </div>
        <div className="flex items-center gap-2 text-amber-400">
          <Activity className="w-3.5 h-3.5" />
          <span>Circuit to Cloud</span>
        </div>
      </div>
    </div>
  );
};
