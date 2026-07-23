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

      timeline.call(() => rootRef.current?.classList.add("is-running"));

      timeline
        .to(".section-heading", { opacity: 1, y: 0, duration: 0.36, ease: "power2.out" }, 0)
        .to(".pipeline-stack:first-child .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" }, "+=0.16");

      sourceCards.forEach((card, index) => {
        const sourcePulse = card.querySelector(".pipeline-source-pulse");

        timeline
          .to(card, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, index === 0 ? "+=0.12" : "+=0.16")
          .to(card, { borderColor: "rgba(0,112,243,0.7)", boxShadow: "0 0 24px rgba(0,112,243,0.18)", duration: 0.28, ease: "power2.out" }, "-=0.08")
          .fromTo(sourcePulse, { opacity: 0, xPercent: -120, scaleX: 0.35 }, { opacity: 1, xPercent: 125, scaleX: 1, duration: 0.42, ease: "power1.inOut" }, "-=0.08")
          .to(card, { borderColor: "rgba(65,71,84,0.3)", boxShadow: "0 0 0 rgba(0,112,243,0)", duration: 0.34, ease: "power2.out" }, "-=0.18");
      });

      timeline
        .to(".pipeline-line--left", { opacity: 1, duration: 0.24, ease: "power2.out" }, "+=0.08")
        .to(".pipeline-core", { opacity: 1, duration: 0.32, ease: "power2.out" }, "-=0.02")
        .to(".pipeline-core .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, "<")
        .fromTo(".pipeline-data-pulse--left", { opacity: 0, xPercent: -100, scaleX: 0.5 }, { opacity: 1, xPercent: 280, scaleX: 1, duration: 0.72, ease: "power1.inOut" }, "-=0.02")
        .to(".pipeline-data-pulse--left", { opacity: 0, duration: 0.16 }, ">-0.08")
        .to(".pipeline-core__ring", { scale: 1.13, boxShadow: "0 0 42px rgba(0,112,243,0.34)", borderColor: "rgba(0,112,243,0.86)", duration: 0.42, ease: "power2.out" }, "+=0.12")
        .to(".pipeline-core__orbit", { scale: 1.24, opacity: 0.78, duration: 0.42, ease: "power2.out" }, "<")
        .to(".pipeline-core__diamond", { scale: 1.1, boxShadow: "0 0 48px rgba(0,112,243,0.52)", duration: 0.42, ease: "power2.out" }, "<")
        .fromTo(".pipeline-core__wave", { opacity: 0.46, scale: 0.46 }, { opacity: 0, scale: 1.78, duration: 0.9, ease: "power2.out" }, "-=0.12")
        .to(".pipeline-core__orbit--wide", { rotate: 360, duration: 1.18, ease: "none" }, "-=0.66")
        .to(".pipeline-core__orbit--tilt", { rotate: -302, duration: 1.18, ease: "none" }, "<")
        .to(".pipeline-core__orbit--cross", { rotate: 252, duration: 1.18, ease: "none" }, "<")
        .to(".pipeline-core__ring", { scale: 1.02, boxShadow: "0 0 28px rgba(0,112,243,0.22)", duration: 0.44, ease: "power2.out" }, ">-0.16")
        .to(".pipeline-core__orbit", { scale: 1.05, opacity: 0.5, duration: 0.44, ease: "power2.out" }, "<")
        .to(".pipeline-core__diamond", { scale: 1, boxShadow: "0 0 28px rgba(0,112,243,0.34)", duration: 0.44, ease: "power2.out" }, "<")
        .to(".pipeline-line--right", { opacity: 1, duration: 0.24, ease: "power2.out" }, "-=0.06")
        .to(".pipeline-output-stack .pipeline-stage-label", { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, "<")
        .to(".pipeline-line--left, .pipeline-line--right", { filter: "drop-shadow(0 0 10px rgba(0,112,243,0.32))", duration: 0.42, ease: "power2.out" }, "<");

      outputCards.forEach((card, index) => {
        const result = outputResults[index];

        timeline
          .fromTo(".pipeline-data-pulse--right", { opacity: 0, xPercent: -120, scaleX: 0.5 }, { opacity: 1, xPercent: 285, scaleX: 1, duration: 0.72, ease: "power1.inOut" }, index === 0 ? "+=0.08" : "+=0.18")
          .to(".pipeline-data-pulse--right", { opacity: 0, duration: 0.14 }, ">-0.08")
          .call(() => {
            if (result) {
              placeResultPanel(card, result);
            }

            card.classList.add("is-revealing");
          })
          .to(card, { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" }, "-=0.1")
          .to(card, { borderColor: "rgba(0,112,243,0.72)", boxShadow: "0 0 28px rgba(0,112,243,0.18)", duration: 0.26, ease: "power2.out" }, "-=0.04")
          .fromTo(result, { opacity: 0, y: -8, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.42, ease: "power2.out" }, "-=0.02")
          .to(result, { opacity: 1, duration: 1.45 })
          .to(result, { opacity: 0, y: 8, scale: 0.99, duration: 0.28, ease: "power2.inOut" })
          .call(() => card.classList.add("is-complete"))
          .call(() => card.classList.remove("is-revealing"))
          .to(card, { borderColor: "rgba(0,112,243,0.36)", boxShadow: "0 0 16px rgba(0,112,243,0.08)", duration: 0.28, ease: "power2.out" }, "<");
      });

      timeline
        .to(".pipeline-core__orbit", { opacity: 0.36, rotate: 0, duration: 0.6, ease: "power2.out" })
        .to(".pipeline-core__ring", { boxShadow: "0 0 18px rgba(0,112,243,0.12)", borderColor: "rgba(0,112,243,0.5)", duration: 0.54, ease: "power2.out" }, "<")
        .call(() => rootRef.current?.classList.add("is-complete"))
        .to(".pipeline-completion", { opacity: 1, y: 0, duration: 0.34, ease: "power2.out" });
    }, rootRef);

    return () => context.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="neural-pipeline" className="pipeline-section" ref={rootRef}>
      <div className="page-shell">
        <div className="section-heading">
          <p className="eyebrow">Neural Pipeline</p>
          <h2>Seamless Data Translation</h2>
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
                          <circle className="pipeline-mini-graph__node pipeline-mini-graph__node--center" cx="500" cy="280" r="46" />
                          <circle className="pipeline-mini-graph__node" cx="116" cy="116" r="34" />
                          <circle className="pipeline-mini-graph__node" cx="318" cy="74" r="32" />
                          <circle className="pipeline-mini-graph__node" cx="706" cy="86" r="32" />
                          <circle className="pipeline-mini-graph__node" cx="884" cy="128" r="34" />
                          <circle className="pipeline-mini-graph__node" cx="884" cy="416" r="34" />
                          <circle className="pipeline-mini-graph__node" cx="708" cy="480" r="32" />
                          <circle className="pipeline-mini-graph__node" cx="292" cy="492" r="32" />
                          <circle className="pipeline-mini-graph__node" cx="116" cy="444" r="34" />
                          <text className="pipeline-mini-graph__label pipeline-mini-graph__label--center" x="500" y="289">XAI</text>
                          <text className="pipeline-mini-graph__label" x="116" y="68">CRM</text>
                          <text className="pipeline-mini-graph__label" x="318" y="26">Usage</text>
                          <text className="pipeline-mini-graph__label" x="706" y="38">Revenue</text>
                          <text className="pipeline-mini-graph__label" x="884" y="80">Support</text>
                          <text className="pipeline-mini-graph__label" x="884" y="480">Risk</text>
                          <text className="pipeline-mini-graph__label" x="708" y="536">Forecast</text>
                          <text className="pipeline-mini-graph__label" x="292" y="546">Account</text>
                          <text className="pipeline-mini-graph__label" x="116" y="508">Intent</text>
                        </svg>
                      </div>
                    )}
                    {index === 1 && (
                      <div className="pipeline-mini-kpi">
                        <span>Churn Risk</span>
                        <strong>+32%</strong>
                        <div className="pipeline-mini-bars" aria-hidden="true">
                          <span />
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    )}
                    {index === 2 && (
                      <div className="pipeline-mini-automation-shell">
                        <svg className="pipeline-mini-automation" width="100%" height="100%" viewBox="0 0 1000 420" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">
                          <text className="pipeline-mini-automation__label" x="48" y="58">Recommended Workflow</text>
                          <text className="pipeline-mini-automation__copy" x="48" y="96">Automate monthly report generation</text>
                          <path className="pipeline-mini-automation__rail" d="M118 210 H814" />
                          <path className="pipeline-mini-automation__branch" d="M316 210 C316 154 392 132 454 132 H618 M548 210 C548 276 616 300 694 300 H818" />
                          <circle className="pipeline-mini-automation__pulse" cx="118" cy="210" r="72" />
                          <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--active" x="72" y="164" width="92" height="92" rx="14" />
                          <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--done" x="270" y="164" width="92" height="92" rx="14" />
                          <rect className="pipeline-mini-automation__node" x="502" y="164" width="92" height="92" rx="14" />
                          <rect className="pipeline-mini-automation__node" x="734" y="164" width="92" height="92" rx="14" />
                          <rect className="pipeline-mini-automation__node pipeline-mini-automation__node--done" x="628" y="104" width="74" height="56" rx="12" />
                          <rect className="pipeline-mini-automation__node" x="818" y="272" width="86" height="56" rx="12" />
                          <path className="pipeline-mini-automation__arrow" d="M814 210 H910 M882 178 L914 210 L882 242" />
                          <path className="pipeline-mini-automation__icon" d="M98 210 H138 M118 190 V230 M296 192 H338 M296 210 H346 M296 228 H330 M526 190 H570 V232 H526 Z M758 188 H800 V232 H758 Z M648 126 H682 M648 142 H674 M840 292 H882 M840 308 H872" />
                          <text className="pipeline-mini-automation__step" x="118" y="288">Trigger</text>
                          <text className="pipeline-mini-automation__step" x="316" y="288">Collect</text>
                          <text className="pipeline-mini-automation__step" x="548" y="288">Generate</text>
                          <text className="pipeline-mini-automation__step" x="780" y="288">Deliver</text>
                          <text className="pipeline-mini-automation__label" x="48" y="356">Est. time saved</text>
                          <text className="pipeline-mini-automation__impact" x="244" y="356">12.4 hrs / month</text>
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
