"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { automationSteps } from "@/data/experience";

export function AutomationBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const timer = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % automationSteps.length);
    }, 1400);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <section id="automation-builder" className="border-y border-[var(--line)] bg-[rgba(28,27,27,0.92)] py-20">
      <div className="page-shell">
        <motion.div
          className="mb-12 text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="text-xl font-medium tracking-[0]">Infinite Automation Possibilities</h2>
          <p className="mt-4 text-sm text-[var(--text-soft)]">Build complex reasoning chains with zero friction.</p>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          {automationSteps.map((step, index) => {
            const Icon = step.icon;
            const isAiNode = step.label === "AI Analysis";
            const isLast = index === automationSteps.length - 1;
            const isActive = index === activeStep;

            return (
              <div key={step.label} className="flex flex-col items-center gap-6 md:flex-row">
                <motion.article
                  className={`relative min-w-[180px] rounded-lg border p-6 text-center transition-colors ${
                    isAiNode
                      ? "border-[rgba(0,112,243,0.72)] bg-[rgba(0,112,243,0.06)] text-[var(--primary)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-white"
                  } ${isLast ? "border-white" : ""}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  animate={
                    isActive && !shouldReduceMotion
                      ? { boxShadow: "0 0 28px rgba(0,112,243,0.2)", borderColor: "rgba(0,112,243,0.72)" }
                      : { boxShadow: "0 0 0 rgba(0,112,243,0)", borderColor: isAiNode ? "rgba(0,112,243,0.72)" : isLast ? "#ffffff" : "var(--line)" }
                  }
                  whileHover={{ borderColor: "var(--primary)" }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                >
                  {isAiNode ? (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
                      AI Engine
                    </span>
                  ) : null}
                  <Icon className={`mx-auto h-5 w-5 ${isAiNode ? "text-[var(--primary)]" : "text-[var(--text-soft)]"}`} aria-hidden="true" />
                  <p className={`mono mt-4 text-xs font-semibold uppercase tracking-[0.08em] ${isAiNode ? "text-[var(--primary)]" : "text-white"}`}>{step.label}</p>
                  <p
                    className={`mono mt-3 rounded border px-3 py-2 text-[10px] ${
                      isAiNode
                        ? "border-[rgba(0,112,243,0.35)] bg-[var(--primary-soft)] text-[var(--primary)]"
                        : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--text-soft)]"
                    }`}
                  >
                    {step.value}
                  </p>
                </motion.article>

                {!isLast ? (
                  <motion.span
                    animate={!shouldReduceMotion && activeStep > index ? { opacity: 1, x: 2 } : { opacity: 0.45, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    aria-hidden="true"
                  >
                    <ArrowRight className="h-4 w-4 rotate-90 text-[var(--muted)] md:rotate-0" />
                  </motion.span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
