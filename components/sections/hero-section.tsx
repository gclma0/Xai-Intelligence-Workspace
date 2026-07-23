"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { MetricCard } from "@/components/ui/metric-card";
import { heroStats } from "@/data/experience";

const IntelligenceCore = dynamic(() => import("@/components/three/intelligence-core").then((mod) => mod.IntelligenceCore), {
  ssr: false
});

export function HeroSection() {
  const x = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });

  return (
    <section
      id="top"
      className="page-shell grid min-h-[calc(100vh-64px)] items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) / 28);
        y.set((event.clientY - rect.top - rect.height / 2) / 28);
      }}
    >
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
        <p className="eyebrow">Data to intelligence</p>
        <h1 className="mt-5 max-w-[620px] text-5xl font-semibold leading-[1.02] tracking-[0] md:text-7xl">
          Xai Intelligence Workspace
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--text-soft)]">
          A calm product interface that turns raw enterprise data into structured intelligence, actionable insight, and auditable AI automations.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="focus-ring rounded bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white" href="#neural-pipeline">
            Explore Flow
          </a>
          <a className="focus-ring rounded border border-[var(--line)] px-5 py-3 text-sm font-semibold text-white" href="#reasoning-engine">
            View Interaction
          </a>
        </div>
        <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
          {heroStats.map((stat) => (
            <MetricCard key={stat.label} {...stat} />
          ))}
        </div>
      </motion.div>

      <motion.div style={{ x, y }} className="relative h-[560px] overflow-hidden rounded-lg border border-[var(--line)] bg-[rgba(18,18,18,0.62)]">
        <div className="absolute inset-x-8 top-8 z-10 flex justify-between text-xs text-[var(--muted)]">
          <span className="mono">RAW_STREAM</span>
          <span className="mono">STRUCTURED_GRAPH</span>
        </div>
        <IntelligenceCore />
      </motion.div>
    </section>
  );
}
