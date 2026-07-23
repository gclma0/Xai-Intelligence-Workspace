"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { reasoningEvents, reasoningHighlights, reasoningRecommendation } from "@/data/experience";

function KnowledgeGraphBackdrop({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 420 420" aria-hidden="true">
      {[
        [52, 108],
        [360, 156],
        [114, 356],
        [314, 390]
      ].map(([cx, cy], index) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="2"
          fill="#0070f3"
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 3.5 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <line x1="52" x2="360" y1="108" y2="156" stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" />
      <line x1="360" x2="314" y1="156" y2="390" stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" />
      <line x1="314" x2="114" y1="390" y2="356" stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" />
      <line x1="114" x2="52" y1="356" y2="108" stroke="#0070f3" strokeDasharray="4 4" strokeWidth="0.5" />
    </svg>
  );
}

function eventColor(tone: string) {
  if (tone === "error") return "text-[var(--error)]";
  if (tone === "primary") return "text-[var(--primary)]";
  if (tone === "muted") return "text-[var(--muted)]";
  return "text-white";
}

export function ReasoningEngine() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="reasoning-engine" className="relative overflow-hidden border-t border-[var(--line)] py-20 md:py-28">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[rgba(0,112,243,0.45)] to-transparent" />
      <div className="page-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          className="space-y-8"
          initial={shouldReduceMotion ? false : { opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <p className="eyebrow">The Reasoning Engine</p>
            <h2 className="mt-8 max-w-lg text-4xl font-normal leading-tight tracking-[0] sm:text-5xl">
              Observe AI logic <br />
              in real-time.
            </h2>
            <p className="mt-8 max-w-xl text-sm leading-6 text-[var(--text-soft)]">
              No more black boxes. Xai allows you to audit the exact reasoning path our models take to reach business critical recommendations.
            </p>
          </div>

          <div className="space-y-4">
            {reasoningHighlights.map((highlight) => (
              <article key={highlight.title} className="flex items-start gap-4">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)] text-[var(--primary)]">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{highlight.title}</span>
                  <span className="block text-xs leading-5 text-[var(--text-soft)]">{highlight.copy}</span>
                </span>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative flex min-h-[480px] items-center justify-center sm:min-h-[600px]"
          initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <KnowledgeGraphBackdrop shouldReduceMotion={shouldReduceMotion} />
          <div className="absolute inset-[-40px] opacity-10" aria-hidden="true">
            <svg className="h-full w-full" viewBox="0 0 520 520">
              <path d="M60 280 C160 120 260 420 458 180" fill="none" stroke="#0070f3" strokeWidth="1" />
              <path d="M92 162 C220 88 318 284 430 344" fill="none" stroke="#aec6ff" strokeOpacity="0.45" strokeWidth="1" />
            </svg>
          </div>

          <article className="surface relative z-10 flex min-h-[480px] w-full max-w-[620px] flex-col border-[rgba(0,112,243,0.35)] bg-[rgba(18,18,18,0.9)] p-5 shadow-[0_0_50px_rgba(0,112,243,0.15)] sm:min-h-[520px] sm:p-8">
            <header className="mb-8 flex flex-col items-start justify-between gap-3 border-b border-[rgba(65,71,84,0.45)] pb-5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 items-center gap-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                <h3 className="mono truncate text-xs tracking-[0] text-white sm:text-sm">REASONING_ENGINE::THREAD_492</h3>
              </div>
              <span className="mono rounded border border-[rgba(0,112,243,0.3)] bg-[var(--primary-soft)] px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-[var(--primary)]">
                Live Stream
              </span>
            </header>

            <div className="flex-1 space-y-6">
              {reasoningEvents.map((event, index) => (
                <motion.div
                  key={event.time}
                  className={`mono flex flex-col gap-1 text-xs sm:flex-row sm:gap-4 ${index >= 2 ? "border-l border-[rgba(0,112,243,0.32)] pl-4" : ""}`}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                >
                  <span className="text-[var(--primary)]">[{event.time}]</span>
                  <span className={eventColor(event.tone)}>{event.message}</span>
                </motion.div>
              ))}

              <div className="relative mt-8 overflow-hidden rounded border border-[rgba(0,112,243,0.3)] bg-[rgba(0,112,243,0.06)] p-6 pl-8">
                <div className="absolute left-0 top-0 h-full w-1 bg-[var(--primary)]" aria-hidden="true" />
                <p className="mono mb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--primary)]">Recommendation Generated</p>
                <p className="text-sm italic leading-6 text-white">&quot;{reasoningRecommendation}&quot;</p>
              </div>
            </div>

            <footer className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[rgba(65,71,84,0.32)] pt-5 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)] sm:flex-row sm:items-center">
              <span className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgba(111,211,163,0.75)]" aria-hidden="true" />
                Status: Operational
              </span>
              <span>Load: 4.1%</span>
            </footer>
          </article>
        </motion.div>
      </div>
    </section>
  );
}
