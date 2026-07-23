"use client";

import { motion } from "framer-motion";
import { reasoningEvents, workflowNodes } from "@/data/experience";

export function ReasoningEngine() {
  return (
    <section id="reasoning-engine" className="section border-t border-[var(--line)]">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="eyebrow">Reasoning engine</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[0]">A data cluster reorganizes into an auditable action path.</h2>
          <p className="mt-5 max-w-xl leading-8 text-[var(--text-soft)]">
            The section is structured for a richer scroll timeline: independent nodes can morph from scattered data into a deterministic workflow while the reasoning log updates in sync.
          </p>
        </div>
        <div className="surface relative min-h-[560px] overflow-hidden p-6">
          <div className="grid h-full gap-5 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[300px]">
              {workflowNodes.map((Icon, index) => (
                <motion.div
                  key={index}
                  className="absolute flex h-16 w-16 items-center justify-center rounded border border-[var(--primary)] bg-[var(--primary-soft)]"
                  initial={{ x: [20, 170, 70, 210][index], y: [40, 90, 210, 260][index], rotate: index * 12 }}
                  whileInView={{ x: 58, y: 62 + index * 86, rotate: 0 }}
                  whileHover={{ scale: 1.08 }}
                  viewport={{ once: false, amount: 0.65 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: "easeInOut" }}
                >
                  <Icon className="h-6 w-6 text-[var(--primary)]" />
                </motion.div>
              ))}
              <div className="absolute left-[90px] top-[92px] h-[260px] w-px bg-[var(--primary)] opacity-60" />
            </div>
            <div className="rounded border border-[var(--line)] bg-black p-5">
              <div className="mb-6 flex items-center justify-between border-b border-[var(--line)] pb-4">
                <span className="mono text-sm">REASONING_THREAD_492</span>
                <span className="mono text-xs text-[var(--success)]">OPERATIONAL</span>
              </div>
              <div className="space-y-5">
                {reasoningEvents.map((event, index) => (
                  <motion.div
                    key={event.time}
                    className="grid grid-cols-[72px_1fr] gap-3 text-sm"
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <span className="mono text-[var(--primary)]">{event.time}</span>
                    <span>
                      <span className="block text-[var(--muted)]">{event.label}</span>
                      <span className="mono text-white">{event.value}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
