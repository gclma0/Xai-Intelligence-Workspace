"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";

function IntelligenceCoreFallback() {
  return (
    <div className="intelligence-core intelligence-core--hero" aria-hidden="true">
      <div className="intelligence-core__fallback">
        <div className="intelligence-core__fallback-lattice">
          {Array.from({ length: 64 }, (_, index) => (
            <span key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

const IntelligenceCore = dynamic<{ progressRef: MutableRefObject<number> }>(() => import("@/components/three/intelligence-core").then((mod) => mod.IntelligenceCore), {
  ssr: false,
  loading: () => <IntelligenceCoreFallback />
});

const stages = ["RAW DATA", "STRUCTURE", "INSIGHT", "AUTOMATION"];

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let animationFrame = 0;
    let lastTime = performance.now();

    function updateProgress() {
      frame = 0;

      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));

      targetProgressRef.current = shouldReduceMotion ? 0.72 : Math.min(1, progress / 0.86);
    }

    function requestUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    }

    function animateProgress(now: number) {
      const delta = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const damping = shouldReduceMotion ? 1 : 1 - Math.exp(-delta * 5.2);

      progressRef.current += (targetProgressRef.current - progressRef.current) * damping;

      const roundedProgress = Math.round(progressRef.current * 1000) / 1000;
      setScrollProgress((current) => (Math.abs(current - roundedProgress) > 0.004 ? roundedProgress : current));
      setActiveStage(Math.min(stages.length - 1, Math.floor(progressRef.current * stages.length)));
      animationFrame = window.requestAnimationFrame(animateProgress);
    }

    updateProgress();
    animationFrame = window.requestAnimationFrame(animateProgress);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [shouldReduceMotion]);

  return (
    <>
      <section id="top" className="hero-scroll-section" ref={heroRef}>
        <div className="hero-ambient" aria-hidden="true">
          <IntelligenceCore progressRef={progressRef} />
        </div>
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />

        <aside className="hero-stage-rail" aria-label="AI core stages">
          <div className="hero-stage-rail__inner">
            {stages.map((stage, index) => (
              <div key={stage} className={`hero-stage-rail__stage ${index === activeStage ? "is-active" : ""}`}>
                <span className="hero-stage-rail__num">{String(index + 1).padStart(2, "0")}</span>
                <span className="hero-stage-rail__bar" aria-hidden="true" />
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </aside>

        <div className="hero-pin">
          <motion.h1 className="hero-scroll-headline" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.01, delay: 0.3 }}>
            <span className="hero-scroll-headline__row">
              <motion.span initial={shouldReduceMotion ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                Turn Raw Data into
              </motion.span>
            </span>
            <span className="hero-scroll-headline__row">
              <motion.span initial={shouldReduceMotion ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}>
                <span className="hero-scroll-headline__accent">Structured Intelligence.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className="hero-scroll-subtext" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: scrollProgress > 0.7 ? 0 : 1 }} transition={{ duration: 0.8, delay: 0.85 }}>
            Raw data enters as noise. The core resolves it into structure, structure into insight, and insight into automations that act on their own.
          </motion.p>

          <motion.div className="hero-panel-tag hero-panel-tag--left" initial={false} animate={{ opacity: scrollProgress > 0.2 ? 1 : 0, y: scrollProgress > 0.2 ? -8 : 0 }}>
            <span className="hero-panel-tag__dot" />
            node.cluster_04
          </motion.div>
          <motion.div className="hero-panel-tag hero-panel-tag--right-low" initial={false} animate={{ opacity: scrollProgress > 0.3 ? 1 : 0, y: scrollProgress > 0.3 ? -8 : 0 }}>
            <span className="hero-panel-tag__dot" />
            throughput: 12.4k/s
          </motion.div>
          <motion.div className="hero-panel-tag hero-panel-tag--right-high" initial={false} animate={{ opacity: scrollProgress > 0.45 ? 1 : 0, y: scrollProgress > 0.45 ? -8 : 0 }}>
            <span className="hero-panel-tag__dot" />
            schema: resolved
          </motion.div>
        </div>
      </section>

      <section className="hero-next-section" aria-label="What the core does next">
        <div className="hero-next-section__inner">
          <motion.p
            className="hero-next-section__kicker"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {String.raw`// WHAT THE CORE DOES NEXT`}
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Xai turns fragmented inputs into <strong>decision-ready insight</strong>, then connects those insights to AI automations built for product-quality workflows.
          </motion.h2>
        </div>
      </section>
    </>
  );
}
