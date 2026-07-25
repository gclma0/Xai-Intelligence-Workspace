"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { Component, Suspense, useMemo, useRef } from "react";
import type { MutableRefObject, ReactNode } from "react";
import type { BufferAttribute, Group, Points } from "three";
import { AdditiveBlending, BufferGeometry, Color, Float32BufferAttribute, IcosahedronGeometry, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshBasicMaterial } from "three";

type IntelligenceCoreProps = {
  progressRef?: MutableRefObject<number>;
  quality?: "desktop" | "mobile";
};

type BoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

const POINT_COUNT_DESKTOP = 2600;
const POINT_COUNT_MOBILE = 1200;
const GRID_X = 20;
const GRID_Y = 13;
const GRID_Z = 5;

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;

  return value - Math.floor(value);
}

function randomSpherePoint(index: number, radius: number) {
  const u = seededRandom(index + 1);
  const v = seededRandom(index + 97);
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const r = radius * Math.cbrt(seededRandom(index + 311) * 0.6 + 0.4);

  return [r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)] as const;
}

function buildGridPoints() {
  const points: number[][] = [];

  for (let z = 0; z < GRID_Z; z += 1) {
    for (let y = 0; y < GRID_Y; y += 1) {
      for (let x = 0; x < GRID_X; x += 1) {
        points.push([(x / (GRID_X - 1) - 0.5) * 8.6, (y / (GRID_Y - 1) - 0.5) * 5.2, (z / (GRID_Z - 1) - 0.5) * 2.7]);
      }
    }
  }

  return points;
}

function buildSceneData(pointCount: number) {
  const chaotic = new Float32Array(pointCount * 3);
  const structured = new Float32Array(pointCount * 3);
  const colors = new Float32Array(pointCount * 3);
  const cold = new Color("#0070f3");
  const hot = new Color("#aec6ff");
  const lineGrid = buildGridPoints();
  const grid = [...lineGrid].sort((a, b) => seededRandom(a[0] * 13 + a[1] * 17 + a[2] * 19) - seededRandom(b[0] * 13 + b[1] * 17 + b[2] * 19));

  for (let index = 0; index < pointCount; index += 1) {
    const chaos = randomSpherePoint(index, 4.1);
    const structuredPoint = grid[index % grid.length];
    const pointIndex = index * 3;

    chaotic[pointIndex] = chaos[0];
    chaotic[pointIndex + 1] = chaos[1];
    chaotic[pointIndex + 2] = chaos[2];

    structured[pointIndex] = structuredPoint[0] + (seededRandom(index + 701) - 0.5) * 0.018;
    structured[pointIndex + 1] = structuredPoint[1] + (seededRandom(index + 809) - 0.5) * 0.018;
    structured[pointIndex + 2] = structuredPoint[2] + (seededRandom(index + 907) - 0.5) * 0.018;

    const color = cold.clone().lerp(hot, seededRandom(index + 43) * 0.28);
    color.toArray(colors, pointIndex);
  }

  return { chaotic, structured, colors, lineGrid };
}

function buildLineGeometry(grid: number[][]) {
  const linePositions: number[] = [];
  const layerSize = GRID_X * GRID_Y;

  for (let z = 0; z < GRID_Z; z += 1) {
    for (let y = 0; y < GRID_Y; y += 1) {
      for (let x = 0; x < GRID_X - 1; x += 1) {
        const start = grid[z * layerSize + y * GRID_X + x];
        const end = grid[z * layerSize + y * GRID_X + x + 1];

        linePositions.push(...start, ...end);
      }
    }
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(linePositions, 3));

  return geometry;
}

class CoreBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function StaticCore() {
  return (
    <div className="intelligence-core__fallback" aria-hidden="true">
      <div className="intelligence-core__fallback-lattice">
        {Array.from({ length: 64 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
}

function ParticleLattice({ progressRef, shouldReduceMotion, pointCount }: { progressRef: MutableRefObject<number>; shouldReduceMotion: boolean | null; pointCount: number }) {
  const pointsRef = useRef<Points>(null);
  const groupRef = useRef<Group>(null);
  const lineRef = useRef<LineSegments>(null);
  const coreRef = useRef<Mesh>(null);
  const morphRef = useRef(shouldReduceMotion ? 0.72 : 0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const data = useMemo(() => buildSceneData(pointCount), [pointCount]);
  const geometry = useMemo(() => {
    const pointGeometry = new BufferGeometry();
    pointGeometry.setAttribute("position", new Float32BufferAttribute(data.chaotic.slice(), 3));
    pointGeometry.setAttribute("color", new Float32BufferAttribute(data.colors.slice(), 3));

    return pointGeometry;
  }, [data]);
  const lineGeometry = useMemo(() => buildLineGeometry(data.lineGrid), [data.lineGrid]);
  const lines = useMemo(() => new LineSegments(lineGeometry, new LineBasicMaterial({ color: "#aec6ff", transparent: true, opacity: 0 })), [lineGeometry]);
  const core = useMemo(() => new Mesh(new IcosahedronGeometry(1.05, 1), new MeshBasicMaterial({ color: "#414754", wireframe: true, transparent: true, opacity: 0.32 })), []);

  useFrame(({ clock, pointer }, delta) => {
    const elapsed = clock.getElapsedTime();
    const targetProgress = shouldReduceMotion ? 0.72 : progressRef.current;
    morphRef.current = MathUtils.damp(morphRef.current, targetProgress, shouldReduceMotion ? 100 : 5.8, delta);
    pointerRef.current.x = MathUtils.damp(pointerRef.current.x, pointer.x, 7.2, delta);
    pointerRef.current.y = MathUtils.damp(pointerRef.current.y, pointer.y, 7.2, delta);

    const morph = morphRef.current;
    const position = geometry.getAttribute("position") as BufferAttribute;
    const color = geometry.getAttribute("color") as BufferAttribute;
    const positionArray = position.array as Float32Array;
    const colorArray = color.array as Float32Array;

    for (let index = 0; index < pointCount; index += 1) {
      const pointIndex = index * 3;
      const resolveDelay = seededRandom(index + 501) * 0.08 * (1 - morph);
      const localMorph = MathUtils.smoothstep(MathUtils.clamp((morph - resolveDelay) / 0.9, 0, 1), 0, 1);

      positionArray[pointIndex] = MathUtils.lerp(data.chaotic[pointIndex], data.structured[pointIndex], localMorph);
      positionArray[pointIndex + 1] = MathUtils.lerp(data.chaotic[pointIndex + 1], data.structured[pointIndex + 1], localMorph);
      positionArray[pointIndex + 2] = MathUtils.lerp(data.chaotic[pointIndex + 2], data.structured[pointIndex + 2], localMorph);

      colorArray[pointIndex] = MathUtils.lerp(0.0, 0.68, localMorph);
      colorArray[pointIndex + 1] = MathUtils.lerp(0.44, 0.78, localMorph);
      colorArray[pointIndex + 2] = MathUtils.lerp(0.95, 1, localMorph);
    }

    position.needsUpdate = true;
    color.needsUpdate = true;

    if (groupRef.current) {
      const pointerInfluence = 1 - morph * 0.12;
      groupRef.current.rotation.y = (shouldReduceMotion ? 0 : elapsed * 0.018) + pointerRef.current.x * 0.35 * pointerInfluence;
      groupRef.current.rotation.x = pointerRef.current.y * -0.22 * pointerInfluence;
      groupRef.current.position.y = MathUtils.damp(groupRef.current.position.y, -morph * 0.28, 5.2, delta);
      groupRef.current.scale.setScalar(MathUtils.damp(groupRef.current.scale.x, 0.78 + morph * 0.08, 5.2, delta));
    }

    if (lineRef.current) {
      const lineProgress = MathUtils.smoothstep(Math.max(0, (morph - 0.48) / 0.52), 0, 1);
      (lineRef.current.material as LineBasicMaterial).opacity = lineProgress * 0.58;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = elapsed * 0.03;
      coreRef.current.rotation.y = elapsed * 0.05;
      (coreRef.current.material as MeshBasicMaterial).opacity = 0.32 * (1 - morph * 0.64);
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={geometry}>
        <pointsMaterial size={0.034} vertexColors transparent opacity={1} depthWrite={false} blending={AdditiveBlending} />
      </points>
      <primitive object={lines} ref={lineRef} />
      <primitive object={core} ref={coreRef} />
    </group>
  );
}

export function IntelligenceCore({ progressRef, quality = "desktop" }: IntelligenceCoreProps) {
  const internalProgressRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const activeProgressRef = progressRef ?? internalProgressRef;
  const isMobileQuality = quality === "mobile";
  const pointCount = isMobileQuality ? POINT_COUNT_MOBILE : POINT_COUNT_DESKTOP;

  return (
    <div className="intelligence-core intelligence-core--hero">
      <CoreBoundary fallback={<StaticCore />}>
        <Suspense fallback={<StaticCore />}>
          <Canvas camera={{ position: [0, 0, isMobileQuality ? 9 : 8.4], fov: isMobileQuality ? 48 : 52 }} dpr={isMobileQuality ? [1, 1.2] : [1, 1.6]} gl={{ alpha: true, antialias: !isMobileQuality, powerPreference: "high-performance" }} frameloop={shouldReduceMotion ? "demand" : "always"}>
            <ambientLight intensity={0.35} color="#10213a" />
            <ParticleLattice progressRef={activeProgressRef} shouldReduceMotion={shouldReduceMotion} pointCount={pointCount} />
          </Canvas>
        </Suspense>
      </CoreBoundary>
    </div>
  );
}
