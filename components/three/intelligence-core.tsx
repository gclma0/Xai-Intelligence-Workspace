"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Line, Sparkles } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense, useMemo, useRef } from "react";
import type { MutableRefObject, PointerEvent } from "react";
import type { Group } from "three";
import { AdditiveBlending, MathUtils, Vector3 } from "three";

type CorePointer = {
  x: number;
  y: number;
};

type RingId = "a" | "b" | "c";

type RingConfig = {
  id: RingId;
  radius: number;
  tilt: [number, number, number];
  speed: number;
  opacity: number;
  color: string;
};

type NodeConfig = {
  id: number;
  ring: RingId;
  angle: number;
  size: number;
  opacity: number;
};

const rings: RingConfig[] = [
  { id: "a", radius: 1, tilt: [0, 0, 0], speed: 0.11, opacity: 0.34, color: "#3aa0ff" },
  { id: "b", radius: 1.25, tilt: [MathUtils.degToRad(60), MathUtils.degToRad(-25), 0], speed: -0.15, opacity: 0.28, color: "#0070f3" },
  { id: "c", radius: 0.72, tilt: [MathUtils.degToRad(82), MathUtils.degToRad(12), MathUtils.degToRad(10)], speed: 0.09, opacity: 0.22, color: "#9ecbff" }
];

const nodes: NodeConfig[] = [
  { id: 1, ring: "b", angle: -90, size: 0.1, opacity: 0.88 },
  { id: 2, ring: "a", angle: 30, size: 0.1, opacity: 0.9 },
  { id: 3, ring: "b", angle: 150, size: 0.1, opacity: 0.86 },
  { id: 4, ring: "c", angle: 90, size: 0.095, opacity: 0.78 },
  { id: 5, ring: "a", angle: 210, size: 0.1, opacity: 0.88 },
  { id: 6, ring: "c", angle: -30, size: 0.095, opacity: 0.76 }
];

function polarPoint(radius: number, angle: number): [number, number, number] {
  const radians = MathUtils.degToRad(angle);
  return [Math.cos(radians) * radius, Math.sin(radians) * radius, 0];
}

function StaticCore({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={`intelligence-core__fallback ${hidden ? "is-hidden" : ""}`} aria-hidden="true">
      <div className="intelligence-core__glow" />
    </div>
  );
}

function CoreNode({ config }: { config: NodeConfig }) {
  const ring = rings.find((item) => item.id === config.ring);
  const position = ring ? polarPoint(ring.radius, config.angle) : ([0, 0, 0] satisfies [number, number, number]);

  return (
    <group position={position} rotation={[MathUtils.degToRad(25), MathUtils.degToRad(35), MathUtils.degToRad(45)]}>
      <mesh>
        <boxGeometry args={[config.size, config.size, config.size]} />
        <meshPhysicalMaterial color="#0d7cff" emissive="#0070f3" emissiveIntensity={0.85} roughness={0.18} metalness={0.18} clearcoat={0.8} clearcoatRoughness={0.22} transparent opacity={config.opacity} />
        <Edges color="#b8dcff" threshold={10} />
      </mesh>
      <mesh scale={1.9}>
        <boxGeometry args={[config.size, config.size, config.size]} />
        <meshBasicMaterial color="#0070f3" transparent opacity={0.12} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

function OrbitalSystem({ ring, children }: { ring: RingConfig; children?: React.ReactNode }) {
  const orbitRef = useRef<Group>(null);
  const shouldReduceMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (!orbitRef.current || shouldReduceMotion) return;
    orbitRef.current.rotation.z = clock.elapsedTime * ring.speed;
  });

  return (
    <group ref={orbitRef} rotation={ring.tilt}>
      <mesh>
        <torusGeometry args={[ring.radius, 0.0055, 12, 256]} />
        <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={1.002}>
        <torusGeometry args={[ring.radius, 0.014, 8, 256]} />
        <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity * 0.13} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      {children}
    </group>
  );
}

function CoreScene({ pointerTarget, shouldReduceMotion }: { pointerTarget: MutableRefObject<CorePointer>; shouldReduceMotion: boolean | null }) {
  const sceneRef = useRef<Group>(null);
  const coreRef = useRef<Group>(null);
  const pointerPosition = useRef<CorePointer>({ x: 0, y: 0 });

  const connectionLines = useMemo(
    () => [
      [new Vector3(...polarPoint(1.25, -90)), new Vector3(0, 0, 0)],
      [new Vector3(...polarPoint(1, 30)), new Vector3(0, 0, 0)],
      [new Vector3(...polarPoint(1, 210)), new Vector3(0, 0, 0)],
      [new Vector3(...polarPoint(1.25, 150)), new Vector3(...polarPoint(0.7, -30))]
    ],
    []
  );

  useFrame(({ clock }, delta) => {
    if (!sceneRef.current || !coreRef.current || shouldReduceMotion) return;

    pointerPosition.current.x = MathUtils.damp(pointerPosition.current.x, pointerTarget.current.x, 4.2, delta);
    pointerPosition.current.y = MathUtils.damp(pointerPosition.current.y, pointerTarget.current.y, 4.2, delta);

    sceneRef.current.rotation.x = MathUtils.damp(sceneRef.current.rotation.x, 0.08 + pointerPosition.current.y * 0.11, 3.1, delta);
    sceneRef.current.rotation.y = MathUtils.damp(sceneRef.current.rotation.y, -0.18 + pointerPosition.current.x * 0.14, 3.1, delta);
    sceneRef.current.position.x = MathUtils.damp(sceneRef.current.position.x, -0.1 + pointerPosition.current.x * 0.05, 2.8, delta);
    sceneRef.current.position.y = MathUtils.damp(sceneRef.current.position.y, 0.28 + pointerPosition.current.y * 0.035, 2.8, delta);

    coreRef.current.rotation.x = clock.elapsedTime * 0.08;
    coreRef.current.rotation.y = Math.PI / 4 + clock.elapsedTime * 0.12;
    const scale = 1 + Math.sin(clock.elapsedTime * 0.7) * 0.015;
    coreRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={sceneRef} position={[-0.1, 0.28, 0]} rotation={[0.08, -0.18, 0]} scale={0.76}>
      <Sparkles count={34} scale={[3, 2.4, 1.4]} size={1.1} speed={0.22} opacity={0.28} color="#6db7ff" />

      <group ref={coreRef}>
        <mesh>
          <octahedronGeometry args={[0.56, 0]} />
          <meshPhysicalMaterial color="#003f9f" emissive="#002f8f" emissiveIntensity={0.82} roughness={0.16} metalness={0.34} clearcoat={1} clearcoatRoughness={0.16} reflectivity={0.82} transparent opacity={0.96} />
          <Edges color="#d7ebff" threshold={12} />
        </mesh>
        <mesh scale={0.62} rotation={[MathUtils.degToRad(18), MathUtils.degToRad(34), 0]}>
          <octahedronGeometry args={[0.56, 0]} />
          <meshPhysicalMaterial color="#0b55c8" emissive="#0042bd" emissiveIntensity={0.75} roughness={0.08} metalness={0.12} clearcoat={1} clearcoatRoughness={0.08} transparent opacity={0.3} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh scale={1.22}>
          <octahedronGeometry args={[0.56, 0]} />
          <meshBasicMaterial color="#0070f3" transparent opacity={0.18} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh scale={1.55}>
          <octahedronGeometry args={[0.56, 0]} />
          <meshBasicMaterial color="#78bdff" transparent opacity={0.06} blending={AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {rings.map((ring) => (
        <OrbitalSystem key={ring.id} ring={ring}>
          {nodes
            .filter((node) => node.ring === ring.id)
            .map((node) => (
              <CoreNode key={node.id} config={node} />
            ))}
        </OrbitalSystem>
      ))}

      {connectionLines.map((points, index) => (
        <Line key={index} points={points} color="#5fb0ff" transparent opacity={0.18} lineWidth={0.75} />
      ))}
    </group>
  );
}

export function IntelligenceCore() {
  const shouldReduceMotion = useReducedMotion();
  const pointerTarget = useRef<CorePointer>({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerTarget.current.x = MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    pointerTarget.current.y = MathUtils.clamp(-((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
  }

  function handlePointerLeave() {
    pointerTarget.current.x = 0;
    pointerTarget.current.y = 0;
  }

  return (
    <div className="intelligence-core" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
      <StaticCore hidden />
      <div className="intelligence-core__canvas" aria-hidden="true">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0.08, 0.08, 5.5], fov: 33 }}
            dpr={[1, 1.5]}
            frameloop={shouldReduceMotion ? "demand" : "always"}
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.18} color="#10213a" />
            <pointLight color="#9ccfff" position={[2.8, 3.4, 3]} intensity={1.85} />
            <pointLight color="#0070f3" position={[-3, 1.4, 2.2]} intensity={1.2} />
            <pointLight color="#214dff" position={[0, -2.6, -2.4]} intensity={0.7} />
            <CoreScene pointerTarget={pointerTarget} shouldReduceMotion={shouldReduceMotion} />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}
