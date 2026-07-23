"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { automationSteps } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function AutomationBuilder() {
  const rootRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current || shouldReduceMotion) return;

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 76%",
            once: true
          }
        })
        .from(".automation-heading", { opacity: 0, y: 16, duration: 0.35, ease: "power2.out" })
        .from(".automation-step", { opacity: 0, y: 14, stagger: 0.12, duration: 0.35, ease: "power2.out" })
        .from(".automation-arrow", { opacity: 0, x: -8, stagger: 0.08, duration: 0.25, ease: "power2.out" }, "-=0.25")
        .to(".automation-step", { boxShadow: "0 0 20px rgba(0,112,243,0.16)", stagger: 0.1, duration: 0.18, yoyo: true, repeat: 1 }, "-=0.05")
        .to(".automation-step--outcome", { borderColor: "#ffffff", boxShadow: "0 0 24px rgba(255,255,255,0.12)", duration: 0.25 });
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="automation-builder" className="automation-section" ref={rootRef}>
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
