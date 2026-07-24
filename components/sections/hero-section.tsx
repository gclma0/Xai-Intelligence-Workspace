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

function formatUtcTime() {
  return `${new Date().toUTCString().split(" ")[4]} UTC`;
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const targetProgressRef = useRef(0);
  const progressRef = useRef(0);
  const shouldReduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const [clock, setClock] = useState("00:00:00 UTC");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    setClock(formatUtcTime());
    const timer = window.setInterval(() => setClock(formatUtcTime()), 1000);

    return () => window.clearInterval(timer);
  }, []);

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

        <div className="hero-system-nav" aria-hidden="true">
          <div className="hero-system-nav__mark">AI CORE</div>
          <div className="hero-system-nav__clock">{clock}</div>
        </div>

        <aside className="hero-stage-rail" aria-label="AI core stages">
          {stages.map((stage, index) => (
            <div key={stage} className={`hero-stage-rail__stage ${index === activeStage ? "is-active" : ""}`}>
              <span className="hero-stage-rail__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="hero-stage-rail__bar" aria-hidden="true" />
              <span>{stage}</span>
            </div>
          ))}
        </aside>

        <div className="hero-pin">
          <motion.p className="hero-scroll-eyebrow" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <span className="hero-scroll-eyebrow__rule" aria-hidden="true" />
            SYSTEM ONLINE - INGESTING SIGNAL
          </motion.p>

          <motion.h1 className="hero-scroll-headline" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.01, delay: 0.3 }}>
            <span className="hero-scroll-headline__row">
              <motion.span initial={shouldReduceMotion ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                Every stray
              </motion.span>
            </span>
            <span className="hero-scroll-headline__row">
              <motion.span initial={shouldReduceMotion ? false : { y: "110%" }} animate={{ y: "0%" }} transition={{ duration: 0.9, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}>
                signal becomes <span className="hero-scroll-headline__accent">a system.</span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p className="hero-scroll-subtext" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: scrollProgress > 0.7 ? 0 : 1 }} transition={{ duration: 0.8, delay: 0.85 }}>
            Raw data enters as noise. The core resolves it into structure, structure into insight, and insight into automations that act on their own.
          </motion.p>

          <motion.div className="hero-scroll-cue" initial={shouldReduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }} aria-hidden="true">
            <span>SCROLL TO RESOLVE</span>
            <span className="hero-scroll-cue__track" />
          </motion.div>

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
          <p className="hero-next-section__kicker">{String.raw`// WHAT THE CORE DOES NEXT`}</p>
          <h2>
            Once structured, the same lattice <strong>surfaces the signals worth acting on</strong> and hands them to automations that run without waiting for a human in the loop.
          </h2>
        </div>
      </section>
    </>
  );
}
