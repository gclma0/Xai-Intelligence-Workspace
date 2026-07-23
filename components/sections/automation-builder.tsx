import { automationSteps } from "@/data/experience";

export function AutomationBuilder() {
  return (
    <section id="automation-builder" className="section border-t border-[var(--line)] bg-[rgba(18,18,18,0.42)]">
      <div className="page-shell">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow">Automation builder</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[0]">Reusable reasoning chains for operational workflows.</h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          {automationSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.label} className="surface p-6">
                <Icon className="h-5 w-5 text-[var(--primary)]" />
                <p className="mt-8 text-lg font-semibold">{step.label}</p>
                <p className="mono mt-3 rounded border border-[var(--line)] bg-black px-3 py-2 text-xs text-[var(--text-soft)]">{step.value}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
