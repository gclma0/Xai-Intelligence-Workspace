"use client";

import { BrainCircuit } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pipelineOutputs, pipelineSources } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function NeuralPipeline() {
  const rootRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || shouldReduceMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true
        }
      });

      timeline
        .from(".pipeline-source-card", { opacity: 0, y: 14, stagger: 0.08, duration: 0.35, ease: "power2.out" })
        .from(".pipeline-line--left", { scaleX: 0, duration: 0.35, ease: "power1.out" }, "-=0.12")
        .from(".pipeline-core__ring", { scale: 0.92, boxShadow: "0 0 0 rgba(0,112,243,0)", duration: 0.28, ease: "power2.out" })
        .from(".pipeline-line--right", { scaleX: 0, duration: 0.35, ease: "power1.out" })
        .from(".pipeline-output-card", { opacity: 0, y: 14, stagger: 0.08, duration: 0.35, ease: "power2.out" }, "-=0.05");
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="neural-pipeline" className="pipeline-section" ref={rootRef}>
      <div className="page-shell">
        <div className="section-heading">
          <p className="eyebrow">Neural Pipeline</p>
          <h2>Seamless Data Translation</h2>
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-stack">
            {pipelineSources.map((source) => {
              const Icon = source.icon;

              return (
                <article key={source.label} className="glass-surface pipeline-card pipeline-source-card">
                  <Icon aria-hidden="true" />
                  <span>{source.label}</span>
                </article>
              );
            })}
          </div>

          <div className="pipeline-line pipeline-line--left" aria-hidden="true" />

          <div className="pipeline-core">
            <div className="pipeline-core__ring">
              <div className="pipeline-core__diamond">
                <BrainCircuit aria-hidden="true" />
              </div>
            </div>
            <p>XAI CORE v2.4</p>
          </div>

          <div className="pipeline-line pipeline-line--right" aria-hidden="true" />

          <div className="pipeline-stack">
            {pipelineOutputs.map((output, index) => (
              <article key={output} className={`glass-surface pipeline-card pipeline-card--output pipeline-output-card ${index === 0 ? "pipeline-card--active" : ""}`}>
                {output}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
