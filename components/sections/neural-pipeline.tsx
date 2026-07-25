"use client";

import { BrainCircuit } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pipelineOutputDetails, pipelineOutputs, pipelineSources, pipelineStages } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

export function NeuralPipeline() {
  const rootRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;

    if (shouldReduceMotion) {
      rootRef.current.classList.add("is-complete");
      rootRef.current.querySelectorAll(".pipeline-output-card").forEach((card) => card.classList.add("is-complete"));
      return;
    }

    const context = gsap.context(() => {
      const sourceCards = gsap.utils.toArray<HTMLElement>(".pipeline-source-card");
      const outputCards = gsap.utils.toArray<HTMLElement>(".pipeline-output-card");
      const outputResults = gsap.utils.toArray<HTMLElement>(".pipeline-output-result");

      const placeResultPanel = (card: HTMLElement, result: HTMLElement) => {
        const cardRect = card.getBoundingClientRect();
        const resultWidth = result.offsetWidth || 520;
        const viewportPadding = 24;
        const maxLeft = window.innerWidth - viewportPadding - resultWidth;
        const viewportSafeLeft = Math.max(viewportPadding, Math.min(cardRect.left, maxLeft));
        const offset = viewportSafeLeft - cardRect.left;

        result.style.setProperty("--pipeline-result-left", `${offset}px`);
      };

      gsap.set([".section-heading", ".pipeline-stage-label", ".pipeline-core", ".pipeline-line", ".pipeline-source-card", ".pipeline-output-card", ".pipeline-completion"], { opacity: 0 });
      gsap.set(".section-heading", { y: -8 });
      gsap.set(".pipeline-stage-label", { y: -6 });
      gsap.set([".pipeline-source-card", ".pipeline-output-card", ".pipeline-completion"], { y: 10 });
      gsap.set([".pipeline-source-pulse", ".pipeline-data-pulse", ".pipeline-core__wave", ".pipeline-output-result"], { opacity: 0 });
      gsap.set(".pipeline-output-card", { x: 0 });
      gsap.set(".pipeline-output-result", { y: -8, scale: 0.98, transformOrigin: "top left" });
      gsap.set(".pipeline-core__wave", { scale: 0.42 });
      gsap.set(".pipeline-core__orbit", { opacity: 0.34, rotate: 0 });
      gsap.set([".pipeline-core__ring", ".pipeline-core__diamond", ".pipeline-core__orbit"], { transformOrigin: "50% 50%" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 60%",
          once: true
        }
      });
      timeline.timeScale(1.55);

      timeline.call(() => rootRef.current?.classList.add("is-running"));

      timeline
        .to(".section-heading", { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" }, 0)
        .to(".pipeline-stack:first-child .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, "+=0.08");

      sourceCards.forEach((card, index) => {
        const sourcePulse = card.querySelector(".pipeline-source-pulse");

        timeline
          .to(card, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, index === 0 ? "+=0.06" : "+=0.08")
          .to(card, { borderColor: "rgba(0,112,243,0.7)", boxShadow: "0 0 20px rgba(0,112,243,0.16)", duration: 0.2, ease: "power2.out" }, "-=0.06")
          .fromTo(sourcePulse, { opacity: 0, xPercent: -120, scaleX: 0.35 }, { opacity: 1, xPercent: 125, scaleX: 1, duration: 0.28, ease: "power1.inOut" }, "-=0.06")
          .to(card, { borderColor: "rgba(65,71,84,0.3)", boxShadow: "0 0 0 rgba(0,112,243,0)", duration: 0.24, ease: "power2.out" }, "-=0.12");
      });

      timeline
        .to(".pipeline-line--left", { opacity: 1, duration: 0.18, ease: "power2.out" }, "+=0.04")
        .to(".pipeline-core", { opacity: 1, duration: 0.24, ease: "power2.out" }, "-=0.02")
        .to(".pipeline-core .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "<")
        .fromTo(".pipeline-data-pulse--left", { opacity: 0, xPercent: -100, scaleX: 0.5 }, { opacity: 1, xPercent: 280, scaleX: 1, duration: 0.46, ease: "power1.inOut" }, "-=0.02")
        .to(".pipeline-data-pulse--left", { opacity: 0, duration: 0.12 }, ">-0.06")
        .to(".pipeline-core__ring", { scale: 1.13, boxShadow: "0 0 34px rgba(0,112,243,0.3)", borderColor: "rgba(0,112,243,0.86)", duration: 0.3, ease: "power2.out" }, "+=0.06")
        .to(".pipeline-core__orbit", { scale: 1.24, opacity: 0.78, duration: 0.3, ease: "power2.out" }, "<")
        .to(".pipeline-core__diamond", { scale: 1.1, boxShadow: "0 0 40px rgba(0,112,243,0.46)", duration: 0.3, ease: "power2.out" }, "<")
        .fromTo(".pipeline-core__wave", { opacity: 0.46, scale: 0.46 }, { opacity: 0, scale: 1.78, duration: 0.56, ease: "power2.out" }, "-=0.08")
        .to(".pipeline-core__orbit--wide", { rotate: 360, duration: 0.72, ease: "none" }, "-=0.42")
        .to(".pipeline-core__orbit--tilt", { rotate: -302, duration: 0.72, ease: "none" }, "<")
        .to(".pipeline-core__orbit--cross", { rotate: 252, duration: 0.72, ease: "none" }, "<")
        .to(".pipeline-core__ring", { scale: 1.02, boxShadow: "0 0 24px rgba(0,112,243,0.2)", duration: 0.3, ease: "power2.out" }, ">-0.12")
        .to(".pipeline-core__orbit", { scale: 1.05, opacity: 0.5, duration: 0.3, ease: "power2.out" }, "<")
        .to(".pipeline-core__diamond", { scale: 1, boxShadow: "0 0 24px rgba(0,112,243,0.3)", duration: 0.3, ease: "power2.out" }, "<")
        .to(".pipeline-line--right", { opacity: 1, duration: 0.18, ease: "power2.out" }, "-=0.04")
        .to(".pipeline-output-stack .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "<")
        .to(".pipeline-line--left, .pipeline-line--right", { filter: "drop-shadow(0 0 8px rgba(0,112,243,0.28))", duration: 0.28, ease: "power2.out" }, "<");

      outputCards.forEach((card, index) => {
        const result = outputResults[index];

        timeline
          .fromTo(".pipeline-data-pulse--right", { opacity: 0, xPercent: -120, scaleX: 0.5 }, { opacity: 1, xPercent: 285, scaleX: 1, duration: 0.46, ease: "power1.inOut" }, index === 0 ? "+=0.04" : "+=0.08")
          .to(".pipeline-data-pulse--right", { opacity: 0, duration: 0.1 }, ">-0.06")
          .call(() => {
            if (result) {
              placeResultPanel(card, result);
            }

            card.classList.add("is-revealing");
          })
          .to(card, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, "-=0.08")
          .to(card, { borderColor: "rgba(0,112,243,0.72)", boxShadow: "0 0 22px rgba(0,112,243,0.16)", duration: 0.2, ease: "power2.out" }, "-=0.04")
          .fromTo(result, { opacity: 0, y: -8, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.02")
          .to(result, { opacity: 1, duration: 0.66 })
          .to(result, { opacity: 0, y: 8, scale: 0.99, duration: 0.22, ease: "power2.inOut" })
          .call(() => card.classList.add("is-complete"))
          .call(() => card.classList.remove("is-revealing"))
          .to(card, { borderColor: "rgba(0,112,243,0.36)", boxShadow: "0 0 14px rgba(0,112,243,0.08)", duration: 0.22, ease: "power2.out" }, "<");
      });

      timeline
        .to(".pipeline-core__orbit", { opacity: 0.36, rotate: 0, duration: 0.36, ease: "power2.out" })
        .to(".pipeline-core__ring", { boxShadow: "0 0 18px rgba(0,112,243,0.12)", borderColor: "rgba(0,112,243,0.5)", duration: 0.34, ease: "power2.out" }, "<")
        .call(() => rootRef.current?.classList.add("is-complete"))
        .to(".pipeline-completion", { opacity: 1, y: 0, duration: 0.26, ease: "power2.out" });
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="neural-pipeline" className="pipeline-section" ref={rootRef}>
      <div className="page-shell">
        <div className="section-heading">
          <p className="eyebrow">Neural Pipeline</p>
          <h2>Seamless Data Translation</h2>
          <p className="section-desc">Raw data from every source — CRM, usage logs, billing, support — flows into the XAI core, processed in real time into structured insights and automated actions.</p>
        </div>

        <div className="pipeline-grid">
          <div className="pipeline-stack">
            <p className="pipeline-stage-label">{pipelineStages[0]}</p>
            {pipelineSources.map((source) => {
              const Icon = source.icon;

              return (
                <motion.article key={source.label} className="glass-surface pipeline-card pipeline-source-card" whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(0,112,243,0.46)" }} transition={{ duration: 0.2 }}>
                  <Icon aria-hidden="true" />
                  <span>{source.label}</span>
                  <span className="pipeline-source-pulse" aria-hidden="true" />
                </motion.article>
              );
            })}
          </div>

          <div className="pipeline-line pipeline-line--left" aria-hidden="true">
            <span className="pipeline-data-pulse pipeline-data-pulse--left" />
          </div>

          <div className="pipeline-core">
            <p className="pipeline-stage-label">{pipelineStages[1]}</p>
            <div className="pipeline-core__ring">
              <span className="pipeline-core__halo" aria-hidden="true" />
              <span className="pipeline-core__particle pipeline-core__particle--1" aria-hidden="true" />
              <span className="pipeline-core__particle pipeline-core__particle--2" aria-hidden="true" />
              <span className="pipeline-core__particle pipeline-core__particle--3" aria-hidden="true" />
              <span className="pipeline-core__orbit pipeline-core__orbit--wide" aria-hidden="true">
                <span className="pipeline-core__node pipeline-core__node--cube" />
                <span className="pipeline-core__node pipeline-core__node--dot" />
              </span>
              <span className="pipeline-core__orbit pipeline-core__orbit--tilt" aria-hidden="true">
                <span className="pipeline-core__node pipeline-core__node--cube" />
                <span className="pipeline-core__node pipeline-core__node--dot" />
              </span>
              <span className="pipeline-core__orbit pipeline-core__orbit--cross" aria-hidden="true">
                <span className="pipeline-core__node pipeline-core__node--cube" />
                <span className="pipeline-core__node pipeline-core__node--dot" />
              </span>
              <span className="pipeline-core__wave" aria-hidden="true" />
              <div className="pipeline-core__diamond">
                <BrainCircuit aria-hidden="true" />
              </div>
            </div>
            <p className="pipeline-core__label">XAI CORE v2.4</p>
          </div>

          <div className="pipeline-line pipeline-line--right" aria-hidden="true">
            <span className="pipeline-data-pulse pipeline-data-pulse--right" />
          </div>

          <div className="pipeline-stack pipeline-output-stack">
            <p className="pipeline-stage-label">{pipelineStages[2]}</p>
            {pipelineOutputs.map((output, index) => {
              const detail = pipelineOutputDetails[index];

              return (
                <motion.article key={output} className={`glass-surface pipeline-card pipeline-card--output pipeline-output-card ${index === 0 ? "pipeline-card--active" : ""}`} whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(0,112,243,0.46)" }} transition={{ duration: 0.2 }}>
                  <span className="pipeline-output-label">{output}</span>
                  <span className="pipeline-complete-dot" aria-hidden="true" />
                  <div className={`pipeline-output-result pipeline-output-result--${index + 1}`} aria-hidden="true">
                    <div className="pipeline-output-result__header">
                      <span>{index === 0 ? "Knowledge Graph" : index === 2 ? "Smart Automation" : detail.status}</span>
                      {(index === 0 || index === 2) && <span className="pipeline-output-result__close">x</span>}
                    </div>
                      {index === 0 && (
                        <div className="pipeline-mini-graph-shell">
                          <svg className="pipeline-mini-graph" width="100%" height="100%" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
                            <path className="pipeline-mini-graph__mesh" d="M116 116 L318 74 L500 280 L706 86 L884 128 M116 444 L292 492 L500 280 L708 480 L884 416 M116 116 L116 444 M884 128 L884 416 M318 74 L292 492 M706 86 L708 480" />
                            <path className="pipeline-mini-graph__link pipeline-mini-graph__link--wide" d="M500 280 L116 116 M500 280 L318 74 M500 280 L706 86 M500 280 L884 128 M500 280 L884 416 M500 280 L708 480 M500 280 L292 492 M500 280 L116 444" />
                            <path className="pipeline-mini-graph__link" d="M116 116 L318 74 M318 74 L706 86 M706 86 L884 128 M884 128 L884 416 M884 416 L708 480 M708 480 L292 492 M292 492 L116 444 M116 444 L116 116" />
                            <circle className="pipeline-mini-graph__halo pipeline-mini-graph__halo--outer" cx="500" cy="280" r="228" />
                            <circle className="pipeline-mini-graph__halo" cx="500" cy="280" r="146" />
                            <circle className="pipeline-mini-graph__signal" cx="500" cy="280" r="76" />
                            <circle className="pipeline-mini-graph__node pipeline-mini-graph__node--center" cx="500" cy="280" r="54" />
                            <circle className="pipeline-mini-graph__node" cx="116" cy="116" r="46" />
                            <circle className="pipeline-mini-graph__node" cx="318" cy="74" r="40" />
                            <circle className="pipeline-mini-graph__node" cx="706" cy="86" r="40" />
                            <circle className="pipeline-mini-graph__node" cx="884" cy="128" r="46" />
                            <circle className="pipeline-mini-graph__node" cx="884" cy="416" r="46" />
                            <circle className="pipeline-mini-graph__node" cx="708" cy="480" r="40" />
                            <circle className="pipeline-mini-graph__node" cx="292" cy="492" r="40" />
                            <circle className="pipeline-mini-graph__node" cx="116" cy="444" r="46" />
                            <text className="pipeline-mini-graph__label pipeline-mini-graph__label--center" x="500" y="289">XAI</text>
                          </svg>
                        </div>
                      )}
                      {index === 1 && (
                        <div className="pipeline-insight">
                          <div className="pipeline-insight__row">
                            <div className="pipeline-insight__arc-wrap">
                              <svg viewBox="0 0 120 120" className="pipeline-insight__arc" aria-hidden="true">
                                <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,112,243,0.12)" strokeWidth="7" />
                                <circle cx="60" cy="60" r="50" fill="none" stroke="#0070f3" strokeWidth="7"
                                  strokeDasharray="314" strokeDashoffset="13" strokeLinecap="round"
                                  transform="rotate(-90 60 60)"
                                  style={{ filter: "drop-shadow(0 0 6px rgba(0,112,243,0.6))" }} />
                              </svg>
                              <div className="pipeline-insight__arc-label">
                                <span className="pipeline-insight__pct">96%</span>
                                <span className="pipeline-insight__conf">CONF</span>
                              </div>
                            </div>
                            <div className="pipeline-insight__signals">
                              <div className="pipeline-insight__signal">
                                <span className="pipeline-insight__signal-name">Support Latency</span>
                                <div className="pipeline-insight__signal-track"><span className="pipeline-insight__signal-fill" style={{ width: "88%" }} /></div>
                                <span className="pipeline-insight__badge pipeline-insight__badge--high">HIGH</span>
                              </div>
                              <div className="pipeline-insight__signal">
                                <span className="pipeline-insight__signal-name">Integration Errors</span>
                                <div className="pipeline-insight__signal-track"><span className="pipeline-insight__signal-fill" style={{ width: "64%" }} /></div>
                                <span className="pipeline-insight__badge pipeline-insight__badge--med">MED</span>
                              </div>
                              <div className="pipeline-insight__signal">
                                <span className="pipeline-insight__signal-name">Product Usage Drop</span>
                                <div className="pipeline-insight__signal-track"><span className="pipeline-insight__signal-fill" style={{ width: "52%" }} /></div>
                                <span className="pipeline-insight__badge pipeline-insight__badge--med">MED</span>
                              </div>
                              <div className="pipeline-insight__signal">
                                <span className="pipeline-insight__signal-name">Billing Anomaly</span>
                                <div className="pipeline-insight__signal-track"><span className="pipeline-insight__signal-fill" style={{ width: "28%" }} /></div>
                                <span className="pipeline-insight__badge pipeline-insight__badge--low">LOW</span>
                              </div>
                            </div>
                          </div>
                          <div className="pipeline-insight__metrics">
                            <div className="pipeline-insight__metric">
                              <span className="pipeline-insight__metric-val">47</span>
                              <span className="pipeline-insight__metric-key">Accounts</span>
                            </div>
                            <div className="pipeline-insight__metric">
                              <span className="pipeline-insight__metric-val">$2.1M</span>
                              <span className="pipeline-insight__metric-key">ARR at Risk</span>
                            </div>
                            <div className="pipeline-insight__metric">
                              <span className="pipeline-insight__metric-val">6d</span>
                              <span className="pipeline-insight__metric-key">Avg Runway</span>
                            </div>
                          </div>
                        </div>
                      )}
                      {index === 2 && (
                        <div className="pipeline-mini-automation-shell">
                          <svg className="pipeline-mini-automation" width="100%" height="100%" viewBox="0 0 1000 310" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
                            <path className="pipeline-mini-automation__rail" d="M118 155 H814" />
                            <path className="pipeline-mini-automation__branch" d="M316 155 C316 99 392 77 454 77 H618 M548 155 C548 221 616 245 694 245 H818" />
                            <circle className="pipeline-mini-automation__pulse" cx="118" cy="155" r="72" />
                            <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--active" x="72" y="109" width="92" height="92" rx="14" />
                            <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--done" x="270" y="109" width="92" height="92" rx="14" />
                            <rect className="pipeline-mini-automation__node" x="502" y="109" width="92" height="92" rx="14" />
                            <rect className="pipeline-mini-automation__node" x="734" y="109" width="92" height="92" rx="14" />
                            <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--done" x="628" y="49" width="74" height="56" rx="12" />
                            <rect className="pipeline-mini-automation__node" x="818" y="217" width="86" height="56" rx="12" />
                            <path className="pipeline-mini-automation__arrow" d="M814 155 H910 M882 123 L914 155 L882 187" />
                            <path className="pipeline-mini-automation__icon" d="M98 155 H138 M118 135 V175 M296 137 H338 M296 155 H346 M296 173 H330 M526 135 H570 V177 H526 Z M758 133 H800 V177 H758 Z M648 71 H682 M648 87 H674 M840 237 H882 M840 253 H872" />
                            <text className="pipeline-mini-automation__step" x="118" y="233">Trigger</text>
                            <text className="pipeline-mini-automation__step" x="316" y="233">Collect</text>
                            <text className="pipeline-mini-automation__step" x="548" y="233">Generate</text>
                            <text className="pipeline-mini-automation__step" x="780" y="233">Deliver</text>
                          </svg>
                        </div>
                      )}
                    <p className="pipeline-output-result__summary">{detail.summary}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="pipeline-completion" aria-hidden="true">
          <span className="pipeline-completion__check">OK</span>
          <span>Analysis Complete</span>
          <i />
          <span>3 sources processed</span>
          <i />
          <span>3 insights generated</span>
          <i />
          <span>Pipeline complete</span>
        </div>
      </div>
    </section>
  );
}
