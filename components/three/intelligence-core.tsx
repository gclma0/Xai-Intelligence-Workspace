"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function DataLattice({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const core = useRef<Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 32 }, (_, index) => {
        const angle = (index / 32) * Math.PI * 2;
        const radius = 1.4 + (index % 4) * 0.18;
        return [Math.cos(angle) * radius, Math.sin(index) * 0.55, Math.sin(angle) * radius] as const;
      }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!core.current || prefersReducedMotion) return;
    core.current.rotation.x = clock.elapsedTime * 0.35 + pointer.y * 0.4;
    core.current.rotation.y = clock.elapsedTime * 0.28 + pointer.x * 0.7;
  });

  return (
    <group ref={core}>
      <mesh>
        <icosahedronGeometry args={[0.85, 2]} />
        <meshStandardMaterial color="#0070f3" wireframe emissive="#004397" emissiveIntensity={0.5} />
      </mesh>
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#ffffff" : "#0070f3"} emissive="#0070f3" emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function IntelligenceCore() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 5], fov: 46 }}
      dpr={[1, 1.5]}
      frameloop={prefersReducedMotion ? "demand" : "always"}
      gl={{ antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 4]} intensity={2.2} />
      <DataLattice prefersReducedMotion={prefersReducedMotion} />
      <OrbitControls enableZoom={false} enablePan={false} enableDamping={!prefersReducedMotion} autoRotate={!prefersReducedMotion} autoRotateSpeed={0.6} />
    </Canvas>
  );
}
