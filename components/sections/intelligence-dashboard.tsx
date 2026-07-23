"use client";

import { Bell, Search, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { dashboardFindings, dashboardNav, forecastBars } from "@/data/experience";

export function IntelligenceDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="intelligence-dashboard" className="bg-[rgba(14,14,14,0.78)] py-16">
      <div className="page-shell">
        <motion.div
          className="overflow-hidden rounded-lg border border-[rgba(65,71,84,0.75)] bg-[rgba(18,18,18,0.82)] shadow-[0_24px_80px_rgba(0,0,0,0.42)]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="flex h-14 items-center justify-between border-b border-[rgba(65,71,84,0.75)] bg-[rgba(19,19,19,0.82)] px-6">
            <div className="flex items-center gap-4">
              <div className="flex gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full border border-red-500/50 bg-red-500/20" />
                <span className="h-2.5 w-2.5 rounded-full border border-yellow-500/50 bg-yellow-500/20" />
                <span className="h-2.5 w-2.5 rounded-full border border-green-500/50 bg-green-500/20" />
              </div>
              <p className="mono text-xs text-[var(--muted)]">workspace / analytics / overview</p>
            </div>
            <div className="flex items-center gap-5 text-[var(--muted)]">
              <Search className="h-4 w-4" aria-hidden="true" />
              <Bell className="h-4 w-4" aria-hidden="true" />
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--primary)] bg-[var(--primary-soft)] text-xs font-bold text-[var(--primary)]">
                JD
              </span>
            </div>
          </div>

          <div className="grid min-h-[700px] lg:grid-cols-[248px_1fr]">
            <aside className="border-r border-[rgba(65,71,84,0.75)] bg-[rgba(14,14,14,0.55)] px-4 py-6">
              <nav className="space-y-1" aria-label="Workspace navigation">
                {dashboardNav.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = index === 0;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      className={`focus-ring flex w-full items-center gap-3 rounded px-4 py-3 text-left text-sm transition-colors hover:bg-[var(--surface-2)] ${
                        isActive ? "border-l-2 border-[var(--primary)] bg-[var(--surface-2)] text-[var(--primary)]" : "text-[var(--text-soft)]"
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <main className="grid gap-6 p-8 xl:grid-cols-[1.7fr_0.9fr]">
              <div className="space-y-6">
                <section className="surface bg-[rgba(0,112,243,0.05)] p-8">
                  <h3 className="flex items-center gap-3 text-xl font-medium">
                    <Sparkles className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
                    Executive Intelligence Summary
                  </h3>
                  <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[var(--text-soft)]">
                    Operational efficiency has increased by <strong className="font-semibold text-white">12.4%</strong> this week. Analysis of CRM activity indicates a slight
                    deviation in churn probability within the SaaS segment, specifically related to response latency in Tier 2 support tickets.
                  </p>
                </section>

                <section className="surface p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Root Cause Analysis</p>
                      <h3 className="mt-2 text-2xl font-medium">Why did churn increase?</h3>
                    </div>
                    <p className="mono rounded-full border border-[rgba(0,112,243,0.35)] bg-[var(--primary-soft)] px-4 py-2 text-xs text-[var(--primary)]">
                      Confidence: 94.8%
                    </p>
                  </div>

                  <ul className="mt-8 space-y-4">
                    {dashboardFindings.map((item, index) => (
                      <motion.li
                        key={item.finding}
                        className="flex items-center gap-4 rounded border border-[rgba(65,71,84,0.35)] bg-[var(--surface-2)] p-4"
                        initial={shouldReduceMotion ? false : { opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                      >
                        <span className="h-2 w-2 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                        <span className="flex-1 text-sm leading-5 text-white">{item.finding}</span>
                        <span className="mono text-xs text-[var(--primary)]">{item.impact}</span>
                      </motion.li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-6">
                <section className="surface relative h-64 overflow-hidden p-6">
                  <h3 className="mono relative z-10 text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Entity Relations</h3>
                  <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 320 240" aria-hidden="true">
                    <defs>
                      <radialGradient id="dashboard-node-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#0070f3" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#0070f3" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    {[40, 80, 120, 160, 200, 240, 280].map((x) => (
                      <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="240" stroke="#1b2735" strokeWidth="0.6" />
                    ))}
                    {[40, 80, 120, 160, 200].map((y) => (
                      <line key={`h-${y}`} x1="0" x2="320" y1={y} y2={y} stroke="#1b2735" strokeWidth="0.6" />
                    ))}
                    <path d="M64 168 L126 98 L176 132 L248 70" fill="none" stroke="#0070f3" strokeOpacity="0.75" strokeWidth="1" />
                    <path d="M86 72 L126 98 L142 184 L176 132 L234 164" fill="none" stroke="#aec6ff" strokeOpacity="0.28" strokeWidth="1" />
                    {[
                      [64, 168],
                      [86, 72],
                      [126, 98],
                      [142, 184],
                      [176, 132],
                      [234, 164],
                      [248, 70]
                    ].map(([x, y], index) => (
                      <g key={`${x}-${y}`}>
                        <motion.circle
                          cx={x}
                          cy={y}
                          r="18"
                          fill="url(#dashboard-node-glow)"
                          initial={shouldReduceMotion ? false : { opacity: 0.35 }}
                          animate={shouldReduceMotion ? { opacity: 0.55 } : { opacity: [0.25, 0.75, 0.25] }}
                          transition={{ duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <circle cx={x} cy={y} r="3" fill="#0070f3" />
                      </g>
                    ))}
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent" />
                </section>

                <section className="surface p-6">
                  <h3 className="mono text-xs uppercase tracking-[0.08em] text-[var(--muted)]">Growth Forecast</h3>
                  <div className="mt-8 flex h-40 items-end gap-3 px-2">
                    {forecastBars.map((bar, index) => (
                      <div key={bar.month} className="flex flex-1 flex-col items-center gap-3">
                        <motion.div
                          className="w-full rounded-t border-x border-t border-[rgba(0,112,243,0.55)] bg-[var(--primary-soft)]"
                          style={{ height: `${bar.height}%` }}
                          initial={shouldReduceMotion ? false : { scaleY: 0, transformOrigin: "bottom" }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                        />
                        <span className="mono text-[10px] text-[var(--muted)]">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
