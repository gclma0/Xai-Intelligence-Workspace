"use client";

import { useEffect, useRef } from "react";
import { BrainCircuit } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
      gsap.fromTo(
        ".pipeline-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
            end: "bottom 70%",
            scrub: true
          }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="neural-pipeline" ref={rootRef} className="py-28">
      <div className="page-shell">
        <motion.div
          className="mb-16 text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="eyebrow">Neural Pipeline</p>
          <h2 className="mt-4 text-base font-medium tracking-[0] text-white">Seamless Data Translation</h2>
        </motion.div>

        <div className="grid items-center gap-8 md:grid-cols-[1fr_1fr_160px_1fr_1fr]">
          <motion.div
            className="space-y-4"
            initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {pipelineSources.map((source) => {
              const Icon = source.icon;

              return (
                <article key={source.label} className="surface flex h-14 items-center gap-4 px-4 transition-colors hover:border-[var(--primary)]">
                  <Icon className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
                  <p className="mono text-xs text-white">{source.label}</p>
                </article>
              );
            })}
          </motion.div>

          <div className="hidden items-center md:flex" aria-hidden="true">
            <div className="pipeline-line h-px w-full bg-gradient-to-r from-transparent via-[var(--line)] to-[var(--primary)]" />
          </div>

          <motion.div
            className="flex flex-col items-center justify-center"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[rgba(0,112,243,0.45)]">
              <div className="flex h-16 w-16 rotate-45 items-center justify-center rounded-lg bg-[var(--primary)] shadow-[0_0_32px_rgba(0,112,243,0.35)]">
                <BrainCircuit className="h-7 w-7 -rotate-45 text-white" aria-hidden="true" />
              </div>
            </div>
            <p className="mono mt-6 text-xs font-semibold text-[var(--primary)]">XAI CORE v2.4</p>
          </motion.div>

          <div className="hidden items-center md:flex" aria-hidden="true">
            <div className="pipeline-line h-px w-full bg-gradient-to-r from-[var(--primary)] via-[var(--line)] to-transparent" />
          </div>

          <motion.div
            className="space-y-4"
            initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            {pipelineOutputs.map((output, index) => (
              <article
                key={output}
                className={`surface flex h-14 items-center justify-center px-4 text-center text-sm font-semibold transition-colors hover:border-[var(--primary)] ${
                  index === 0 ? "border-l-4 border-l-[var(--primary)]" : ""
                }`}
              >
                {output}
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
