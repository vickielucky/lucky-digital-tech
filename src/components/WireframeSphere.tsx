"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WireframeSphere() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, container.clientWidth < 768 ? 12 : 10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0x78ffb8, 0.55);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x80ffd5, 1.1, 20);
    pointLight.position.set(5, 5, 6);
    scene.add(pointLight);

    const radius = container.clientWidth < 775 ? 1.8 : 2.2;
    const sphereGeometry = new THREE.SphereGeometry(radius, 28, 28);
    const edgesGeometry = new THREE.EdgesGeometry(sphereGeometry);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff8fe4, transparent: true, opacity: 0.8 });
    const wireframe = new THREE.LineSegments(edgesGeometry, lineMaterial);
    scene.add(wireframe);

    const glowGeometry = new THREE.SphereGeometry(radius + 0.1, 28, 28);
    const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff9ce1, transparent: true, opacity: 0.08, side: THREE.BackSide });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    let frameId: number;
    const animate = () => {
      const elapsed = performance.now() * 0.00035;
      const hue = 0.95 + Math.sin(elapsed) * 0.18;
      const saturation = 0.84;
      const lightness = 0.65;
      lineMaterial.color.setHSL(hue, saturation, lightness);
      glowMaterial.color.setHSL(hue, saturation, lightness - 0.2);

      wireframe.rotation.y += 0.0028;
      wireframe.rotation.x += 0.0015;
      glowMesh.rotation.y += 0.0022;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      scene.clear();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0" />;
}
