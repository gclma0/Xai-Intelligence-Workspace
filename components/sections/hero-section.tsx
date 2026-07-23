"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";
import { heroCapabilities, heroTrustIndicators } from "@/data/experience";

function IntelligenceCoreFallback() {
  return (
    <div className="intelligence-core" aria-hidden="true">
      <div className="intelligence-core__fallback">
        <div className="intelligence-core__glow" />
        <div className="ai-core-ring ai-core-ring--1" />
        <div className="ai-core-ring ai-core-ring--2" />
        <div className="ai-core-ring ai-core-ring--3" />
        <div className="ai-core-ring ai-core-ring--4" />
        <div className="ai-core-ring ai-core-ring--5" />
        <div className="intelligence-core__center">
          <div className="intelligence-core__diamond">
            <Lightbulb />
          </div>
          <span className="data-block data-block--1" />
          <span className="data-block data-block--2" />
          <span className="data-block data-block--3" />
          <span className="data-block data-block--4" />
          <span className="data-block data-block--5" />
        </div>
      </div>
    </div>
  );
}

const IntelligenceCore = dynamic(() => import("@/components/three/intelligence-core").then((mod) => mod.IntelligenceCore), {
  ssr: false,
  loading: () => <IntelligenceCoreFallback />
});

export function HeroSection() {
  const [activeCapability, setActiveCapability] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const activeHeroCapability = heroCapabilities[activeCapability];

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveCapability((current) => (current + 1) % heroCapabilities.length);
    }, 2600);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section id="top" className="page-shell hero-section">
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.11 } }
          }}
        >
          <motion.p className="hero-copy__brand" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.45 }}>
            Xai
          </motion.p>
          <motion.h1 variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.55 }}>
            Intelligence <br />
            Workspace
          </motion.h1>
          <motion.p className="hero-copy__text" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
            Connect enterprise data, uncover meaningful intelligence and automate better decisions from one intelligent workspace.
          </motion.p>

          <motion.div className="hero-actions" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
            <a className="button-primary focus-ring" href="#intelligence-dashboard">
              Explore Workspace
            </a>
            <a className="button-secondary focus-ring" href="#neural-pipeline">
              See How It Works
            </a>
          </motion.div>

          <motion.div className="hero-trust" variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.5 }}>
            <p>Trusted by enterprise teams worldwide</p>
            <div className="hero-logos" aria-label="Trusted teams">
              {heroTrustIndicators.map((indicator) => (
                <span key={indicator} className="hero-logo" aria-label={indicator} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="hero-core" aria-label="AI core visualization" initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.25 }}>
          <div className="hero-core__frame">
            <IntelligenceCore />
          </div>
        </motion.div>

        <motion.aside
          className="hero-capabilities"
          aria-label="Xai capabilities"
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { delayChildren: 0.55, staggerChildren: 0.38 } }
          }}
        >
          <div className="hero-capabilities__list">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroCapability.title}
                className="hero-capability hero-capability--single is-active"
                aria-live="polite"
                initial={shouldReduceMotion ? false : { opacity: 0, x: 28, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -18, filter: "blur(4px)" }}
                transition={{ duration: 0.58, ease: "easeOut" }}
              >
                <span className="hero-capability__dot" aria-hidden="true" />
                <span className="hero-capability__title">{activeHeroCapability.title}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
