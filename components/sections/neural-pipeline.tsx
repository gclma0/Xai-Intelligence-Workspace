"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { insightStages } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function NeuralPipeline() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const context = gsap.context(() => {
      gsap.fromTo(
        ".flow-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
            end: "bottom 55%",
            scrub: true
          }
        }
      );
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <section id="neural-pipeline" ref={rootRef} className="section border-y border-[var(--line)] bg-[rgba(18,18,18,0.42)]">
      <div className="page-shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Neural pipeline</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[0]">Raw signals become decisions in three visible stages.</h2>
        </div>
        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          <div className="flow-line absolute left-0 top-1/2 hidden h-px w-full bg-[var(--primary)] lg:block" />
          {insightStages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <motion.article
                key={stage.title}
                className="surface relative min-h-[280px] p-6 transition-colors hover:border-[var(--primary)]"
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
              >
                <div className="flex items-center justify-between">
                  <p className="eyebrow">{stage.eyebrow}</p>
                  <Icon className="h-5 w-5 text-[var(--primary)]" />
                </div>
                <h3 className="mt-10 text-2xl font-semibold">{stage.title}</h3>
                <p className="mt-4 leading-7 text-[var(--text-soft)]">{stage.copy}</p>
                <p className="mono mt-8 inline-flex rounded border border-[var(--line)] bg-black px-3 py-2 text-xs text-[var(--primary)]">
                  {stage.metric}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
