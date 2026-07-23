"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { heroCapabilities, heroTrustIndicators } from "@/data/experience";

const IntelligenceCore = dynamic(() => import("@/components/three/intelligence-core").then((mod) => mod.IntelligenceCore), {
  ssr: false
});

export function HeroSection() {
  const [activeCapability, setActiveCapability] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveCapability((current) => (current + 1) % heroCapabilities.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section
      id="top"
      className="page-shell grid min-h-[calc(100vh-56px)] items-center gap-8 overflow-hidden py-12 md:min-h-[820px] md:py-16 lg:grid-cols-10"
      onPointerMove={(event) => {
        if (shouldReduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) / 28);
        y.set((event.clientY - rect.top - rect.height / 2) / 28);
      }}
    >
      <motion.div
        className="z-10 space-y-8 lg:col-span-3"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      >
        <div className="space-y-4">
          <p className="text-2xl font-black text-[var(--primary)]">Xai</p>
          <h1 className="max-w-[400px] text-[42px] font-bold leading-[1.05] tracking-[0] sm:text-[48px] md:text-[56px]">
            Intelligence <br />
            Workspace
          </h1>
          <p className="max-w-sm text-[15px] leading-6 text-[var(--text-soft)]">
            Connect enterprise data, uncover meaningful intelligence and automate better decisions from one intelligent workspace.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a className="focus-ring rounded px-8 py-4 text-center text-sm font-semibold text-white bg-[var(--primary)]" href="#intelligence-dashboard">
            Explore Workspace
          </a>
          <a
            className="focus-ring rounded border border-[var(--line)] px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--surface-2)]"
            href="#neural-pipeline"
          >
            See How It Works
          </a>
        </div>

        <div className="space-y-4 border-t border-[rgba(65,71,84,0.45)] pt-8">
          <p className="mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
            Trusted by enterprise teams worldwide
          </p>
          <div className="flex flex-wrap items-center gap-4 opacity-45 grayscale sm:gap-6">
            {heroTrustIndicators.map((indicator) => (
              <span key={indicator} className="surface mono flex h-6 w-20 items-center justify-center rounded-sm text-[10px] text-[var(--muted)]">
                {indicator}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        style={{ x, y }}
        className="relative flex min-h-[320px] items-center justify-center sm:min-h-[420px] lg:col-span-4 lg:min-h-[500px]"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        aria-label="Animated AI core visualization"
      >
        <div className="absolute h-64 w-64 rounded-full bg-[rgba(0,112,243,0.1)] blur-[80px]" />
        <div className="relative h-[320px] w-full max-w-[520px] scale-100 sm:h-[420px] lg:h-[520px] lg:scale-125">
          <IntelligenceCore />
        </div>
      </motion.div>

      <aside className="flex h-full flex-col justify-center border-t border-[rgba(65,71,84,0.45)] pt-8 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
        <div className="relative space-y-6">
          {heroCapabilities.map((capability, index) => {
            const isActive = index === activeCapability;

            return (
              <motion.button
                key={capability.title}
                type="button"
                className={`focus-ring group flex w-full items-start gap-4 text-left transition-opacity ${
                  isActive ? "opacity-100" : "opacity-30 hover:opacity-100"
                }`}
                onClick={() => setActiveCapability(index)}
                aria-pressed={isActive}
                animate={isActive && !shouldReduceMotion ? { x: 0 } : { x: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <span
                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? "bg-[var(--primary)]" : "border border-[var(--muted)]"}`}
                  aria-hidden="true"
                />
                <span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${capability.title}-${isActive}`}
                      className="block text-xl font-medium leading-7 text-white"
                      initial={shouldReduceMotion ? false : { opacity: 0.65, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {capability.title}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </motion.button>
            );
          })}
          <div className="absolute -right-4 top-0 hidden h-full flex-col justify-between py-2 lg:flex" aria-hidden="true">
            {heroCapabilities.map((capability, index) => (
              <span
                key={capability.title}
                className={`h-1/3 w-0.5 ${index === activeCapability ? "bg-[var(--primary)]" : "bg-[rgba(65,71,84,0.35)]"}`}
              />
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}
