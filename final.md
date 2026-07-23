Read AGENTS.md and all referenced documentation before making any changes.

Implement the Neural Pipeline as the signature interaction of the landing page. Preserve the current layout, spacing, typography, colors, and responsive behavior exactly. Do not redesign the section—only enhance it with premium, coordinated animations.

Objective:
Transform the static pipeline into a believable AI processing workflow that tells a complete story:

INGEST DATA → ANALYZE WITH AI → GENERATE INSIGHTS

Animation Stack:
- GSAP + ScrollTrigger for the overall timeline.
- Framer Motion only for subtle hover and idle interactions.
- Reuse the existing React Three Fiber AI Core. Do not replace or redesign it.

Interaction Flow:

1. Section Trigger
- Start the animation once when approximately 40% of the section enters the viewport.
- The full sequence should run once and then remain in its completed state.
- Do not replay continuously while scrolling.

2. Ingest Data
- Sequentially activate the three source cards:
  1. PDF_REPORT_Q3.PDF
  2. CRM_LIVE_FEED
  3. ANALYTICS_V4.CSV
- Each card briefly glows with the brand accent color.
- Do NOT move the cards themselves.
- Instead, extract a thin glowing data pulse from the active card.
- The pulse travels through the connector line toward the AI Core.
- Repeat for each source with a short stagger.

3. AI Analysis
After each pulse reaches the AI Core:
- The core reacts with a subtle energy pulse.
- Orbital rings rotate slightly faster.
- Orbiting nodes accelerate briefly.
- Connection lines brighten.
- A soft circular wave expands outward.
- The effect should communicate "thinking", not "exploding".
- Keep this analysis sequence around 1.5–2 seconds.

4. Generate Insights
Once analysis finishes:
- A glowing pulse exits the AI Core and travels through the right connector line.

5. Sequential Output Reveal
Reveal only ONE output at a time.

A. Knowledge Graph
- Highlight the Knowledge Graph card.
- A floating preview panel appears beside it.
- Show a miniature interactive-looking node graph with connected entities.
- Keep it visible for approximately 2 seconds.
- Fade it away.
- Mark the card as completed with a subtle success indicator.

B. Real-time Insights
- Highlight the Real-time Insights card.
- Display a floating intelligence panel containing:
  - confidence score;
  - key insight;
  - short AI explanation;
  - miniature chart or KPI.
- Hold for approximately 2 seconds.
- Fade away.
- Mark completed.

C. Smart Automations
- Highlight the Smart Automations card.
- Display a floating workflow recommendation such as:
  "Recommend escalating enterprise accounts with elevated churn risk."
- Include a small workflow visualization or automation badge.
- Hold briefly.
- Fade away.
- Mark completed.

6. Final State
When the sequence finishes:
- All three output cards remain completed.
- Connector lines retain a subtle illuminated state.
- The AI Core returns to its calm idle animation.
- The section should feel alive but not distracting.

Animation Principles
- Slow, deliberate, enterprise-grade motion.
- No bouncing.
- No glitch effects.
- No exaggerated scaling.
- No flashy sci-fi effects.
- Prioritize clarity over spectacle.

Performance
- Animate only transform and opacity where possible.
- Use GSAP timelines efficiently.
- Respect prefers-reduced-motion.
- Clean up all ScrollTriggers correctly.
- Keep animations smooth on desktop and mobile.

Validation
- Run npm run lint.
- Run npm run build.
- Ensure no layout regressions occur.
- Verify the final static appearance remains identical to the approved design.

At completion, provide:
- files modified;
- animation timeline summary;
- performance considerations;
- reduced-motion behavior;
- lint result;
- build result.