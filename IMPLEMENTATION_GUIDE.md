# Xai — Implementation Guide

---

# 1. Purpose

This document defines how the Xai Intelligence Workspace should be implemented.

Its purpose is to ensure that every engineering decision follows a single, consistent implementation strategy.

This document is **not** a replacement for the product documentation or design system.

Instead, it explains **how** those resources should be translated into production-quality frontend code.

---

# 2. Sources of Truth

Always follow the project resources in the following order.

1. Latest approved Figma
2. DESIGN.md
3. docs/product-documentation.md
4. IMPLEMENTATION_GUIDE.md

If two documents appear to conflict, stop and request clarification rather than making assumptions.

Never invent product behavior.

Never redesign existing approved interfaces.

---

# 3. Project Goal

Build a premium, production-quality frontend experience for Xai.

The implementation should demonstrate:

- frontend architecture
- component design
- motion design
- engineering quality
- maintainability
- accessibility
- performance

The finished project should resemble software that could realistically ship to production.

---

# 4. Repository Structure

The project uses the Next.js App Router.

The existing repository structure should be preserved.

Current architecture:

app/

components/
    sections/
    three/
    ui/

data/

docs/

lib/

public/

Do not reorganize folders unless there is a clear architectural benefit.

---

# 5. Component Structure

Every major page section owns its own component.

Current sections:

- Site Header
- Hero Section
- Neural Pipeline
- Intelligence Dashboard
- Reasoning Engine
- Automation Builder
- Site Footer

Each section should be independently maintainable.

Large components should be split only when readability clearly improves.

Avoid unnecessary abstraction.

---

# 6. Technology Stack

Framework

- Next.js App Router

Language

- TypeScript

Styling

- Tailwind CSS

Animation

- Framer Motion
- GSAP

3D

- React Three Fiber
- Drei

Icons

- Lucide React

Do not introduce additional dependencies unless there is a clear technical justification.

---

# 7. Engineering Principles

The implementation should prioritize:

1. Correctness
2. Maintainability
3. Readability
4. Accessibility
5. Performance
6. Design fidelity

Never sacrifice code quality for visual effects.

Never sacrifice accessibility for animation.

---

# 8. Design References

IMPLEMENTATION_GUIDE.md intentionally does not duplicate the design system.

Instead:

DESIGN.md defines:

- colors
- typography
- spacing
- elevation
- UI rules

The latest approved Figma defines:

- layout
- proportions
- hierarchy
- composition

docs/product-documentation.md defines:

- messaging
- product narrative
- section purpose

Implementation should reference these documents rather than duplicate them.

---

# 9. General Coding Rules

Use semantic HTML.

Prefer readable code over clever code.

Avoid deeply nested JSX.

Avoid duplicated logic.

Prefer composition over inheritance.

Strongly type all props.

Avoid the use of `any`.

Remove unused imports immediately.

Remove commented-out code.

Remove temporary debugging code before completion.

Every component should have one clear responsibility.

---

# 10. Naming Conventions

Files

kebab-case

Components

PascalCase

Variables

camelCase

Functions

camelCase

Constants

UPPER_SNAKE_CASE only when appropriate.

Maintain consistency throughout the project.

---

# 11. Motion System

Motion is a communication tool, not decoration.

Every animation should help users understand one of the following:

- information entering the system
- processing
- relationships
- reasoning
- execution
- completion

If an animation does not improve understanding, remove it.

Animations should feel calm, premium and deliberate.

Avoid playful, exaggerated or distracting effects.

---

# 12. Motion Library Responsibilities

Each animation library has a specific responsibility.

## Framer Motion

Use Framer Motion for:

- page load animations
- component reveals
- hover interactions
- button states
- staggered children
- opacity transitions
- layout transitions

Framer Motion is the default animation library.

---

## GSAP

Use GSAP only where timeline orchestration is required.

Examples:

- ScrollTrigger
- pinned sections
- multi-step timelines
- synchronized animations

Do not use GSAP for simple fades or hover animations.

---

## React Three Fiber

React Three Fiber exists only to power the AI Core.

Its responsibilities include:

- orbital geometry
- particles
- lighting
- subtle depth
- animated nodes

The landing page should never become a Three.js demo.

---

## CSS Keyframes

CSS animations should be reserved for:

- slow orbital rotation
- floating geometry
- subtle glow
- continuous pulsing

Do not recreate complex GSAP animations using CSS.

---

# 13. Animation Timing

Preferred durations

Micro interaction

150–250ms

Component reveal

300–500ms

Section reveal

500–800ms

Hero introduction

800–1200ms

Continuous loops

8–30 seconds

Animations should never feel rushed.

---

# 14. Easing

Preferred easing

- easeOut
- easeInOut
- circOut
- expoOut

Avoid

- bounce
- elastic
- excessive overshoot

The overall experience should feel stable and intentional.

---

# 15. Animation Order

Each section should animate in a predictable order.

Typical sequence

Container

↓

Heading

↓

Supporting text

↓

Primary visual

↓

Supporting UI

↓

Secondary details

Avoid revealing everything simultaneously.

---

# 16. Scroll Behaviour

Scrolling should feel natural.

Do not pin sections unless the experience clearly benefits.

Avoid scroll hijacking.

If smooth scrolling is introduced later, it must not interfere with accessibility.

Users should always remain in control.

---

# 17. Hover Behaviour

Hover states should be subtle.

Preferred interactions

- slight elevation
- slight glow
- slight opacity adjustment
- gentle scale

Avoid

- rotation
- bounce
- dramatic movement

Hover should reinforce interactivity without drawing unnecessary attention.

---

# 18. Reduced Motion

Respect the user's operating system preferences.

If reduced motion is enabled:

- disable continuous loops where practical
- remove large transitions
- reduce stagger delays
- keep essential UI feedback

The interface must remain fully usable.

---

# 19. Global Layout Rules

Every page section should align to the same content container.

Maintain consistent horizontal padding.

Maintain consistent vertical rhythm.

Avoid arbitrary spacing values.

Follow the spacing system defined in DESIGN.md.

---

# 20. Responsive Strategy

Desktop is the primary experience.

Tablet should preserve the same hierarchy while simplifying layout.

Mobile should preserve the narrative while reducing visual complexity.

Never remove sections solely because of screen size.

Instead:

- stack layouts
- reduce spacing where appropriate
- reduce animation intensity
- preserve information hierarchy

---

# 21. Reusable Components

Create reusable UI components only when repetition exists.

Examples:

- Button
- Badge
- Metric Card
- Section Label

Avoid creating generic components that are used only once.

Prefer clarity over abstraction.

---

# 22. Shared Data

Repeated content should live in the data directory.

Examples include:

- navigation links
- product statements
- dashboard metrics
- workflow labels

Avoid duplicating identical strings across components.

---

# 23. Error Handling

Components should fail gracefully.

Guard against:

- missing data
- undefined props
- failed async operations
- future API integration

Never allow a single component failure to break the page.

---

# 24. Logging

Development logging is acceptable during implementation.

Before completing a milestone:

- remove console.log
- remove temporary debugging utilities
- remove commented-out experimental code

Production code should remain clean.

---

# 25. Section Specifications

Each page section is implemented independently.

A section is considered complete only when:

- Layout matches the approved Figma.
- Responsive behavior is correct.
- Motion follows the Motion System.
- Accessibility requirements are satisfied.
- Lint passes.
- Build passes.

Never begin the next milestone before the current section satisfies these requirements.

---

# 26. Site Header

Component

components/sections/site-header.tsx

Purpose

Provide branding, navigation and the primary call-to-action.

Responsibilities

- Display the Xai logo.
- Display navigation links.
- Display the primary CTA.
- Maintain consistent spacing.
- Remain lightweight.

Behavior

- Transparent over the Hero.
- Becomes solid after scrolling.
- Sticky after initial scroll.

Animations

Framer Motion

- Fade downward.
- Small opacity transition.

Do Not

- Add dropdown menus.
- Add additional navigation items.
- Change the approved navigation structure.

Acceptance Criteria

- Matches the Figma.
- Sticky behavior works.
- Keyboard accessible.
- Responsive.
- Build passes.

---

# 27. Hero Section

Components

components/sections/hero-section.tsx

components/three/intelligence-core.tsx

Purpose

Introduce Xai and communicate its value within the first screen.

Layout

Three-column layout.

Left

- Product label
- Main headline
- Supporting copy
- Primary CTA
- Secondary CTA
- Trust indicators

Center

AI Core

Right

Rotating capability statements

Responsibilities

- Reuse the existing AI Core.
- Match the Figma hierarchy.
- Maintain visual balance.

Animations

Framer Motion

- Heading reveal
- CTA reveal
- Statement crossfade

CSS

- Orbital rotation
- Floating geometry
- Gentle pulse

React Three Fiber

- AI Core only

Do Not

- Replace the AI Core.
- Add additional CTAs.
- Modify product messaging.
- Change layout proportions.

Acceptance Criteria

- Pixel-close to Figma.
- AI Core centered.
- Rotating statements work.
- Responsive.
- Smooth at 60 FPS.

---

# 28. Neural Pipeline

Component

components/sections/neural-pipeline.tsx

Purpose

Explain how fragmented information becomes structured intelligence.

Responsibilities

- Show information entering the system.
- Show processing.
- Show outputs.

Animation Sequence

Input

↓

Connection

↓

Processing

↓

Output

Libraries

GSAP

Section choreography.

CSS

Continuous line animation.

Framer Motion

Reveal.

Acceptance Criteria

Users understand the workflow without reading every label.

---

# 29. Intelligence Dashboard

Component

components/sections/intelligence-dashboard.tsx

Purpose

Demonstrate the practical output of Xai.

Responsibilities

- Display metrics.
- Display insights.
- Display recommendations.
- Display forecasts.

Animations

- Card reveal.
- Counter animation.
- Chart reveal.

Avoid fake dashboard elements.

Every panel should communicate useful information.

Acceptance Criteria

Looks like production enterprise software.

---

# 30. Reasoning Engine

Component

components/sections/reasoning-engine.tsx

Purpose

Explain how Xai reaches conclusions.

Responsibilities

- Display knowledge graph.
- Display reasoning steps.
- Display recommendations.

Animation Order

Knowledge

↓

Reasoning

↓

Recommendation

Acceptance Criteria

The animation communicates thinking rather than loading.

---

# 31. Automation Builder

Component

components/sections/automation-builder.tsx

Purpose

Show how intelligence becomes execution.

Responsibilities

- Display workflow.
- Display execution.
- Display completion.

Animation

Workflow activates left-to-right.

Nodes activate sequentially.

Final node confirms success.

Acceptance Criteria

Workflow is understandable without explanation.

---

# 32. Site Footer

Component

components/sections/site-footer.tsx

Purpose

Conclude the experience.

Responsibilities

- Brand
- Navigation
- Copyright
- Final CTA

Animation

Simple fade.

Nothing more.

Acceptance Criteria

Matches the design language.

---

# 33. Section Consistency Rules

Every section must:

- Follow the same content width.
- Follow the same spacing system.
- Use semantic HTML.
- Use the shared design language.
- Support reduced motion.
- Maintain visual rhythm.

Avoid creating sections that feel disconnected from the rest of the experience.

---

# 34. Performance Standards

Performance is a product feature.

Every implementation decision should consider runtime performance.

General Guidelines

- Lazy-load heavy components when appropriate.
- Minimize unnecessary re-renders.
- Prefer CSS transforms over layout animations.
- Optimize images and assets.
- Dispose of Three.js resources correctly.
- Memoize expensive calculations only when necessary.

Animation Guidelines

Prefer animating:

- transform
- opacity

Avoid animating:

- width
- height
- top
- left
- margin

Performance Targets

Desktop

- Smooth 60 FPS animations.
- Fast initial page render.
- Responsive interactions.

Never sacrifice usability for visual effects.

---

# 35. Accessibility Standards

Accessibility is required.

Every section should support:

- Semantic HTML
- Keyboard navigation
- Visible focus indicators
- Screen readers
- Logical heading hierarchy

Interactive elements must always use the correct semantic element.

Examples

Buttons → button

Navigation → nav

Links → a

Sections → section

Respect prefers-reduced-motion.

If reduced motion is enabled:

- Disable continuous animations where practical.
- Reduce animation intensity.
- Preserve usability.

---

# 36. Quality Checklist

Before completing any milestone verify:

- Lint passes.
- Build passes.
- No TypeScript errors.
- No unused imports.
- No console logging.
- No commented-out code.
- Responsive layout verified.
- Accessibility verified.
- Design matches the latest approved Figma.
- Motion follows the Motion System.
- Components remain modular.

---

# 37. Development Workflow

Every milestone should follow the same process.

1.

Read:

- IMPLEMENTATION_GUIDE.md
- DESIGN.md
- docs/product-documentation.md

2.

Inspect the current implementation.

3.

Identify reusable components.

4.

Create an implementation plan.

5.

Implement the requested milestone only.

6.

Run validation.

7.

Provide a concise implementation report.

Do not begin the next milestone until the current one is complete.

---

# 38. Milestone Roadmap

Milestone 1

Architecture

Status

Completed

---

Milestone 2

Header

Hero

Goal

Complete a pixel-close Hero implementation matching the approved Figma.

---

Milestone 3

Neural Pipeline

Goal

Visualize information entering and flowing through Xai.

---

Milestone 4

Intelligence Dashboard

Goal

Present actionable intelligence using production-quality dashboard UI.

---

Milestone 5

Reasoning Engine

Goal

Demonstrate how Xai reaches conclusions.

---

Milestone 6

Automation Builder

Goal

Show intelligence becoming automated execution.

---

Milestone 7

Motion Integration

Goal

Complete all Framer Motion, GSAP and React Three Fiber interactions.

---

Milestone 8

Responsive Refinement

Goal

Refine desktop, tablet and mobile layouts.

---

Milestone 9

Performance & Accessibility

Goal

Optimize performance and complete accessibility review.

---

Milestone 10

Final Review

Goal

Prepare the project for production-quality submission.

---

# 39. Definition of Done

A milestone is complete only when:

- Visual implementation matches the approved Figma.
- Product narrative is preserved.
- Motion follows the Motion System.
- Responsive behavior is correct.
- Accessibility requirements are satisfied.
- Performance remains smooth.
- Lint passes.
- Build passes.
- Code is maintainable and readable.

---

# 40. Codex Collaboration Protocol

Codex should operate as a senior frontend engineer working within an existing engineering team.

Before implementation:

- Read IMPLEMENTATION_GUIDE.md.
- Read DESIGN.md.
- Read docs/product-documentation.md.
- Inspect the existing code.
- Understand the current milestone.

During implementation:

- Modify only files related to the current milestone.
- Prefer reuse over replacement.
- Preserve project conventions.
- Keep components focused.
- Avoid unnecessary abstractions.
- Explain architectural decisions when significant changes are made.

After implementation:

Run:

- npm run lint
- npm run build

Fix any issues introduced.

Provide a concise report including:

- Files modified
- Files created
- Components updated
- Validation results
- Remaining work
- Recommended next milestone

Never continue to the next milestone automatically.

Wait for approval before proceeding.

---

# 41. Final Engineering Principles

Every implementation decision should prioritize:

1. Correctness
2. Maintainability
3. Accessibility
4. Performance
5. Design Fidelity
6. Motion Quality
7. Developer Experience

If a proposed solution improves one area while significantly harming another, choose the more balanced solution.

The objective is not to create the most visually complex landing page.

The objective is to build a polished, maintainable, production-quality frontend experience that faithfully communicates the Xai product narrative.

---

# End of Implementation Guide