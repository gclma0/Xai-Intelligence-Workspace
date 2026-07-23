"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { dashboardNav, tableRows } from "@/data/experience";

const tabs = ["Signals", "Causality", "Actions"];

export function IntelligenceDashboard() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <section id="intelligence-dashboard" className="section">
      <div className="page-shell">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Intelligence dashboard</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[0]">A product workspace, not marketing cards.</h2>
          </div>
          <div className="flex rounded border border-[var(--line)] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`focus-ring rounded px-4 py-2 text-sm transition-colors ${activeTab === tab ? "bg-[var(--primary)] text-white" : "text-[var(--text-soft)]"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          className="surface overflow-hidden"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex h-14 items-center justify-between border-b border-[var(--line)] px-5">
            <span className="mono text-sm text-[var(--muted)]">workspace / intelligence / {activeTab.toLowerCase()}</span>
            <span className="mono rounded bg-[var(--primary-soft)] px-3 py-1 text-xs text-[var(--primary)]">LIVE</span>
          </div>
          <div className="grid min-h-[620px] lg:grid-cols-[240px_1fr]">
            <aside className="border-r border-[var(--line)] p-4">
              {dashboardNav.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`focus-ring mb-2 flex w-full items-center gap-3 rounded px-3 py-3 text-left text-sm transition-colors hover:bg-[var(--surface-2)] ${
                      index === 0 ? "border-l-2 border-[var(--primary)] bg-[var(--surface-2)] text-white" : "text-[var(--text-soft)]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </aside>
            <div className="grid gap-5 p-5 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <div className="surface p-5">
                  <p className="eyebrow">Executive summary</p>
                  <p className="mt-4 text-xl leading-8">
                    Churn risk increased in the enterprise SaaS segment after support latency crossed the agreed SLA threshold.
                  </p>
                </div>
                <div className="surface overflow-hidden">
                  <div className="grid grid-cols-4 border-b border-[var(--line)] px-4 py-3 text-xs text-[var(--muted)]">
                    <span>Signal</span>
                    <span>Owner</span>
                    <span>Impact</span>
                    <span>Action</span>
                  </div>
                  {tableRows.map((row) => (
                    <div key={row[0]} className="grid grid-cols-4 px-4 py-4 text-sm text-[var(--text-soft)] transition-colors hover:bg-[var(--surface-2)]">
                      {row.map((cell) => (
                        <span key={cell}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="surface p-5">
                <p className="eyebrow">Forecast confidence</p>
                <div className="mt-8 flex h-64 items-end gap-3">
                  {[34, 46, 58, 72, 88, 79].map((height, index) => (
                    <div key={index} className="flex-1 rounded-t border border-[rgba(0,112,243,0.35)] bg-[var(--primary-soft)]" style={{ height: `${height}%` }} />
                  ))}
                </div>
                <p className="mono mt-5 text-sm text-[var(--muted)]">Tab state: {activeTab}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
