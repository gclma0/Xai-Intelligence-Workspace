import { ArrowRight } from "lucide-react";
import { automationSteps } from "@/data/experience";

export function AutomationBuilder() {
  return (
    <section id="automation-builder" className="automation-section">
      <div className="page-shell">
        <div className="automation-heading">
          <h2>Infinite Automation Possibilities</h2>
          <p>Build complex reasoning chains with zero friction.</p>
        </div>

        <div className="automation-flow" role="list" aria-label="Automation workflow">
          {automationSteps.map((step, index) => {
            const Icon = step.icon;
            const isAiNode = step.label === "AI Analysis";
            const isLast = index === automationSteps.length - 1;

            return (
              <div key={step.label} className="automation-flow__item" role="listitem">
                <article className={`technical-border automation-step ${isAiNode ? "automation-step--ai" : ""} ${isLast ? "automation-step--outcome" : ""}`}>
                  {isAiNode ? <span className="automation-step__badge">AI Engine</span> : null}
                  <Icon aria-hidden="true" />
                  <p className="automation-step__label">{step.label}</p>
                  <p className="automation-step__value">{step.value}</p>
                </article>

                {!isLast ? (
                  <span className="automation-arrow" aria-hidden="true">
                    <ArrowRight />
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
