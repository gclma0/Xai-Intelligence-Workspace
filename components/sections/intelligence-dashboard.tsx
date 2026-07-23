"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Bell, Search, Sparkles } from "lucide-react";
import { dashboardFindings, dashboardNav, forecastBars } from "@/data/experience";

function EntityGraph() {
  return (
    <svg className="entity-graph" viewBox="0 0 320 240" aria-hidden="true">
      <defs>
        <radialGradient id="entity-node-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0070f3" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0070f3" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[40, 80, 120, 160, 200, 240, 280].map((x) => (
        <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="240" stroke="#1b2735" strokeWidth="0.6" />
      ))}
      {[40, 80, 120, 160, 200].map((y) => (
        <line key={`h-${y}`} x1="0" x2="320" y1={y} y2={y} stroke="#1b2735" strokeWidth="0.6" />
      ))}
      <path d="M42 174 L86 74 L126 98 L176 132 L248 70 L286 154" fill="none" stroke="#0070f3" strokeOpacity="0.75" strokeWidth="1" />
      <path d="M86 74 L142 184 L176 132 L234 164 L286 154" fill="none" stroke="#aec6ff" strokeOpacity="0.3" strokeWidth="1" />
      {[
        [42, 174],
        [86, 74],
        [126, 98],
        [142, 184],
        [176, 132],
        [234, 164],
        [248, 70],
        [286, 154]
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="16" fill="url(#entity-node-glow)" />
          <circle cx={x} cy={y} r="3" fill="#0070f3" />
        </g>
      ))}
    </svg>
  );
}

export function IntelligenceDashboard() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="intelligence-dashboard" className="dashboard-section">
      <div className="page-shell">
        <motion.div
          className="glass-surface dashboard-window"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="dashboard-topbar">
            <div className="dashboard-window-controls">
              <span className="dashboard-dot dashboard-dot--red" />
              <span className="dashboard-dot dashboard-dot--yellow" />
              <span className="dashboard-dot dashboard-dot--green" />
              <span className="dashboard-path">workspace / analytics / overview</span>
            </div>

            <div className="dashboard-tools">
              <Search aria-hidden="true" />
              <Bell aria-hidden="true" />
              <span className="dashboard-avatar">JD</span>
            </div>
          </div>

          <div className="dashboard-body">
            <motion.aside
              className="dashboard-sidebar"
              initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" }}
            >
              <nav className="dashboard-nav" aria-label="Workspace navigation">
                {dashboardNav.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <a key={item.label} className="focus-ring" href={item.href} aria-current={index === 0 ? "page" : undefined}>
                      <Icon aria-hidden="true" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </nav>
            </motion.aside>

            <main className="dashboard-main">
              <div className="dashboard-grid">
                <div className="dashboard-left">
                  <motion.section className="glass-surface dashboard-card dashboard-card--summary" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.16 }}>
                    <h3 className="dashboard-summary-title">
                      <Sparkles aria-hidden="true" />
                      Executive Intelligence Summary
                    </h3>
                    <p>
                      Operational efficiency has increased by <strong>12.4%</strong> this week. Analysis of CRM activity indicates a slight deviation in churn probability within
                      the SaaS segment, specifically related to response latency in Tier 2 support tickets.
                    </p>
                  </motion.section>

                  <motion.section className="glass-surface dashboard-card" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.24 }}>
                    <div className="dashboard-card__header">
                      <div>
                        <h4 className="dashboard-label">Root Cause Analysis</h4>
                        <div className="dashboard-question">Why did churn increase?</div>
                      </div>
                      <span className="confidence-badge">Confidence: 94.8%</span>
                    </div>

                    <ul className="findings-list">
                      {dashboardFindings.map((item) => (
                        <li key={item.finding} className="finding-row">
                          <span className="finding-row__dot" />
                          <span className="finding-row__text">{item.finding}</span>
                          <span className="finding-row__impact">{item.impact}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.section>
                </div>

                <div className="dashboard-right">
                  <motion.section className="glass-surface entity-card" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.3 }}>
                    <h4>Entity Relations</h4>
                    <EntityGraph />
                  </motion.section>

                  <motion.section className="glass-surface forecast-card" initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: 0.36 }}>
                    <h4>Growth Forecast</h4>
                    <div className="forecast-bars">
                      {forecastBars.map((bar, index) => (
                        <motion.span
                          key={bar.month}
                          className="forecast-bar"
                          style={{ height: `${bar.height}%` }}
                          initial={shouldReduceMotion ? false : { scaleY: 0, transformOrigin: "bottom" }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.42 + index * 0.06, ease: "easeOut" }}
                        />
                      ))}
                    </div>
                    <div className="forecast-labels">
                      {forecastBars.map((bar) => (
                        <span key={bar.month}>{bar.month}</span>
                      ))}
                    </div>
                  </motion.section>
                </div>
              </div>
            </main>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
