"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { BrainCircuit } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function StaticCore({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={`intelligence-core__fallback ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
      <div className="intelligence-core__glow" />
      <div className="ai-core-ring ai-core-ring--1" />
      <div className="ai-core-ring ai-core-ring--2" />
      <div className="ai-core-ring ai-core-ring--3" />
      <div className="ai-core-ring ai-core-ring--4" />
      <div className="ai-core-ring ai-core-ring--5" />
      <div className="intelligence-core__center">
        <div className="intelligence-core__diamond">
          <BrainCircuit />
        </div>
        <span className="data-block data-block--1" />
        <span className="data-block data-block--2" />
        <span className="data-block data-block--3" />
        <span className="data-block data-block--4" />
        <span className="data-block data-block--5" />
        <svg className="intelligence-core__lines" viewBox="0 0 200 200">
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="160" y1="100" y2="40" />
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="40" y1="100" y2="100" />
          <line stroke="#0070f3" strokeWidth="0.5" x1="100" x2="140" y1="100" y2="160" />
          <line stroke="#0070f3" strokeOpacity="0.4" strokeWidth="0.3" x1="160" x2="40" y1="40" y2="100" />
          <line stroke="#0070f3" strokeOpacity="0.4" strokeWidth="0.3" x1="40" x2="140" y1="100" y2="160" />
          <circle cx="160" cy="40" r="2" fill="#0070f3" />
          <circle cx="40" cy="100" r="2" fill="#0070f3" />
          <circle cx="140" cy="160" r="2" fill="#0070f3" />
        </svg>
      </div>
    </div>
  );
}

function CoreScene({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const groupRef = useRef<Group>(null);
  const nodePositions = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const angle = (index / 10) * Math.PI * 2;
        const radius = 1.65 + (index % 2) * 0.35;
        return [Math.cos(angle) * radius, Math.sin(index * 1.7) * 0.34, Math.sin(angle) * radius] as const;
      }),
    []
  );

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current || shouldReduceMotion) return;
    groupRef.current.rotation.x = pointer.y * 0.12;
    groupRef.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.18;
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.95, 0.95, 0.95]} />
        <meshStandardMaterial color="#0070f3" emissive="#004397" emissiveIntensity={0.75} roughness={0.35} metalness={0.2} />
      </mesh>

      {[1.15, 1.55, 1.95].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / (2.3 + index), Math.PI / (3.6 + index), 0]}>
          <torusGeometry args={[radius, 0.006, 8, 96]} />
          <meshBasicMaterial color={index === 1 ? "#414754" : "#0070f3"} transparent opacity={index === 1 ? 0.3 : 0.55} />
        </mesh>
      ))}

      {nodePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <boxGeometry args={[0.09, 0.09, 0.09]} />
          <meshStandardMaterial color={index % 3 === 0 ? "#ffffff" : "#0070f3"} emissive="#0070f3" emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}

export function IntelligenceCore() {
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="intelligence-core">
      <StaticCore hidden={isReady} />
      <div className="intelligence-core__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 44 }}
            dpr={[1, 1.5]}
            frameloop={shouldReduceMotion ? "demand" : "always"}
            gl={{ antialias: true, powerPreference: "high-performance" }}
            onCreated={() => setIsReady(true)}
          >
            <ambientLight intensity={1.1} />
            <directionalLight position={[3, 3, 4]} intensity={2} />
            <CoreScene shouldReduceMotion={shouldReduceMotion} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
