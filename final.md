Read AGENTS.md and all referenced project documentation before making any changes.

The current static implementation is visually close to the approved Figma. Preserve the existing layout, spacing, typography, colors, content, proportions, and responsive structure exactly.

Implement the motion system required by the assessment while also improving the styling architecture with a careful hybrid CSS approach.

==============================
PRIMARY GOAL
==============================

Complete the animation milestone using:

- Framer Motion
- GSAP with ScrollTrigger
- React Three Fiber or Three.js

At the same time, organize styling so each type of CSS is used in the correct place without performing a risky full rewrite.

Do not redesign the page.
Do not change approved visuals.
Do not add new content.
Do not replace working layout code unless necessary.
Do not migrate the entire codebase to Tailwind in one pass.

==============================
STYLING STRATEGY
==============================

Use a hybrid styling architecture.

1. Keep app/globals.css for truly global concerns only:

- CSS variables and design tokens
- reset and base element styles
- body background
- font declarations
- global container utilities
- shared section spacing
- reduced-motion rules
- global focus styles
- custom keyframes used across multiple sections
- shared helpers such as .page-shell, .section, .surface, .mono and .eyebrow

Do not move component-specific styles into globals.css.

2. Use Tailwind CSS for common component styling where it improves readability:

- flex and grid layouts
- responsive breakpoints
- spacing
- width and height
- alignment
- typography sizing
- borders
- radii
- colors that map clearly to design tokens
- hover, focus and active states
- standard transitions

Before using Tailwind, inspect package.json and confirm whether Tailwind is already installed and configured.

If Tailwind is not configured:
- install and configure it correctly for the current Next.js version;
- do not break existing CSS;
- preserve globals.css;
- use Tailwind only for components touched during this milestone;
- do not perform a full-project conversion.

3. Use CSS Modules or small component-level CSS files for styles that are too complex or unreadable as utility classes:

- AI Core composition
- complex SVG and connector-line styling
- dashboard graph visuals
- layered floating-card effects
- unusual pseudo-elements
- section-specific keyframes
- GSAP preparation states

4. Use inline styles only for genuinely dynamic values:

- calculated transforms
- chart heights from data
- animation progress values
- CSS custom properties passed from React

Do not use inline styles for static design values.

5. Avoid:

- giant Tailwind class strings that are difficult to maintain
- duplicating the same CSS in multiple places
- moving all styling into globals.css
- rewriting working styles purely for stylistic preference
- mixing multiple approaches inconsistently inside one component

==============================
MOTION RESPONSIBILITIES
==============================

Use each animation library only for its intended role.

Framer Motion:
- initial page-load reveals
- staggered content
- hover and focus feedback
- capability-statement transitions
- dashboard-card reveals
- simple opacity, scale and translate effects

GSAP + ScrollTrigger:
- Neural Pipeline sequence
- Reasoning Engine sequence
- Automation Builder execution sequence
- coordinated section timelines
- scroll-triggered choreography

React Three Fiber or Three.js:
- meaningful Hero Intelligence Core
- orbital geometry
- depth
- slow rotation
- subtle particles or orbiting data nodes
- restrained pointer-responsive motion

CSS keyframes:
- simple infinite loops
- slow ring rotation
- subtle floating
- gentle pulsing
- ambient glow

Do not use GSAP for simple hover effects.
Do not use Framer Motion for complex scroll timelines.
Do not use Three.js outside the Hero AI Core unless clearly justified.

==============================
SECTION ANIMATION SPEC
==============================

1. Site Header — Framer Motion

- Fade and move down subtly on first load.
- Preserve sticky behavior.
- Add restrained hover and focus transitions.
- Do not repeatedly animate the header during normal scrolling.

2. Hero Content — Framer Motion

Stagger:

- Xai label
- headline
- supporting copy
- CTA buttons
- trust indicators

Use only opacity and a small upward movement.

Complete the main reveal in approximately 1.0–1.2 seconds.

3. Hero Capability Statements — Framer Motion

Rotate through:

- Connect fragmented data.
- Reveal meaningful intelligence.
- Automate business decisions.

Requirements:

- one active statement at a time;
- inactive statements remain visible but muted;
- change every 3.5 seconds;
- crossfade with 8–12px vertical movement;
- no typing, glitch or scrambling effects.

4. Hero Intelligence Core — React Three Fiber

Preserve the existing outer container size and position.

Create a meaningful 3D visualization with:

- central blue diamond or polyhedral core;
- multiple thin orbital rings;
- small orbiting nodes or data blocks;
- subtle depth and lighting;
- slow rotation;
- gentle pulse;
- restrained blue glow;
- very subtle pointer-responsive tilt.

Do not use:

- full-screen WebGL;
- heavy shaders;
- imported 3D models;
- camera fly-throughs;
- excessive particles;
- visually noisy effects.

Lazy-load the canvas if appropriate.
Provide a static fallback.
Reduce or stop continuous movement when reduced motion is enabled.

5. Neural Pipeline — GSAP + ScrollTrigger

When the section enters the viewport:

- reveal source cards with a small stagger;
- animate the left connector toward the center;
- pulse the central Xai Core once;
- animate the right connector;
- reveal output cards sequentially;
- optionally move small light pulses through the lines.

The main timeline should run once.

6. Intelligence Dashboard — Framer Motion and/or GSAP

- reveal the dashboard window upward with opacity;
- stagger sidebar, summary, root-cause panel, graph and forecast;
- animate forecast bars from zero to their final values;
- keep every final dimension unchanged;
- do not alter text content.

7. Reasoning Engine — GSAP + ScrollTrigger

Sequence:

- left content reveals;
- background knowledge graph activates subtly;
- floating reasoning card enters with slight depth;
- reasoning events appear one by one;
- recommendation panel appears last.

The result should communicate reasoning, not loading.

8. Automation Builder — GSAP + ScrollTrigger

- reveal heading and description;
- activate workflow nodes left to right;
- animate connectors;
- pulse each node once on completion;
- finish with a restrained Outcome completion state.

Run once when entering the viewport.

9. Footer — Framer Motion

Use only a simple opacity reveal.

==============================
REDUCED MOTION
==============================

Respect prefers-reduced-motion globally.

When reduced motion is enabled:

- disable or greatly reduce continuous loops;
- skip large stagger delays;
- avoid pointer parallax;
- simplify GSAP timelines;
- keep all content immediately available;
- preserve essential focus and hover feedback.

==============================
CODE QUALITY
==============================

- Keep existing component architecture.
- Add "use client" only where required.
- Keep animation logic out of large JSX blocks where practical.
- Use reusable motion variants or hooks only when they genuinely improve maintainability.
- Register and clean up ScrollTrigger correctly.
- Use gsap.context or equivalent cleanup.
- Avoid hydration errors.
- Avoid unnecessary re-renders.
- Animate transform and opacity wherever possible.
- Preserve semantic HTML and keyboard accessibility.
- Do not introduce unnecessary dependencies.

==============================
IMPLEMENTATION ORDER
==============================

1. Inspect the current CSS architecture and Tailwind setup.
2. Decide which existing styles remain in globals.css.
3. Configure Tailwind only if needed.
4. Implement Framer Motion page-load and component interactions.
5. Implement the React Three Fiber Hero Core.
6. Implement GSAP timelines section by section.
7. Add reduced-motion handling.
8. Test desktop, tablet and mobile.
9. Run a visual comparison against screen.png.
10. Run lint and build.

==============================
VALIDATION
==============================

Run:

- npm run lint
- npm run build

Fix all errors introduced.

Verify:

- Framer Motion is meaningfully used.
- GSAP ScrollTrigger is meaningfully used.
- React Three Fiber or Three.js is meaningfully used.
- The static resting state still matches the approved design.
- No layout regressions occurred.
- Desktop, tablet and mobile remain usable.
- Reduced-motion mode works.
- No console errors or hydration warnings appear.

==============================
FINAL REPORT
==============================

Provide:

- files modified;
- files created;
- CSS architecture decisions;
- which styles remain global;
- where Tailwind is used;
- where CSS Modules or component CSS are used;
- where each animation library is used;
- reduced-motion behavior;
- performance considerations;
- lint result;
- build result;
- any remaining visual differences or risks.

Stop after motion integration and styling-architecture cleanup.
Do not continue to unrelated redesign or feature work.