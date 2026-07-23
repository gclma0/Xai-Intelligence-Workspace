"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

function DataLattice() {
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
    if (!core.current) return;
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
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 46 }} dpr={[1, 1.8]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 4, 4]} intensity={2.2} />
      <DataLattice />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}
