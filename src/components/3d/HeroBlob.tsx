"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

// ─── Inner blob mesh ──────────────────────────────────────────────────────────

function BlobMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();
  const velocityRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Scroll speed tracker
  const scrollRef = useRef({ y: 0, speed: 0, prev: 0 });

  useMemo(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      scrollRef.current.speed = Math.abs(current - scrollRef.current.prev);
      scrollRef.current.prev = current;
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Mouse velocity
    velocityRef.current.x = mouse.x - prevMouseRef.current.x;
    velocityRef.current.y = mouse.y - prevMouseRef.current.y;
    prevMouseRef.current = { x: mouse.x, y: mouse.y };

    const speed = Math.sqrt(velocityRef.current.x ** 2 + velocityRef.current.y ** 2);
    const scrollIntensity = Math.min(scrollRef.current.speed * 0.01, 0.8);

    // Slow scroll speed decay
    scrollRef.current.speed *= 0.92;

    // Target distort: pointer speed + scroll
    const targetDistort = 0.25 + speed * 4 + scrollIntensity;

    // Apply to material
    const mat = meshRef.current.material as THREE.ShaderMaterial & { distort: number; speed: number };
    mat.distort = THREE.MathUtils.lerp(mat.distort ?? 0.25, Math.min(targetDistort, 1.1), 0.06);

    // Slow rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x, mouse.y * 0.3, 0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y, mouse.x * 0.3 + state.clock.elapsedTime * 0.08, 0.05
    );

    // Follow mouse subtly
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x, (mouse.x * viewport.width) / 8, 0.03
    );
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y, (mouse.y * viewport.height) / 8, 0.03
    );
  });

  return (
    <Sphere ref={meshRef} args={[1.6, 128, 128]}>
      <MeshDistortMaterial
        color="#feb300"
        distort={0.25}
        speed={1.5}
        roughness={0.1}
        metalness={0.3}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────

function BlobScene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#feb300" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#9333ea" />
      <BlobMesh />
    </>
  );
}

// ─── Export (wraps Canvas) ────────────────────────────────────────────────────

export default function HeroBlob() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <BlobScene />
    </Canvas>
  );
}
