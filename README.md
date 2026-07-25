# Xai - Intelligence Workspace

Interactive single-page product experience for the RacoAI frontend challenge.

The product narrative is:

`raw data -> structured intelligence -> actionable insight -> AI automations`

This is built as a product-quality interactive UI, not a marketing landing page. The experience uses a dark technical workspace style, restrained typography, purposeful motion, and a meaningful 3D centerpiece to explain how Xai turns fragmented raw data into structured intelligence and automated business action.

## Product Overview

Xai - Intelligence Workspace visualizes the transformation from disconnected operational data into AI-assisted decisions. The page walks through four connected product moments:

1. Raw data enters the system.
2. Xai structures that data into a coherent intelligence layer.
3. The workspace surfaces insights, forecasts, risks, and recommendations.
4. Approved intelligence becomes auditable AI automation.

The goal is to communicate an AI product for decision-makers: calm, technically confident, structured, and clear.

## Page Structure

- Hero Section: introduces Xai with a minimal headline, supporting copy, and a React Three Fiber intelligence core that morphs raw particles into a structured lattice as the user scrolls.
- Interactive Insight Flow: shows the required three-stage flow: Ingest Data, Analyze with AI, and Generate Insight. GSAP ScrollTrigger coordinates line movement, source cards, the core processor, and output panels.
- Intelligence Dashboard Preview: presents a mock product workspace with sidebar navigation, a main content panel, charts, cards, a table, and stateful tab switching.
- Signature Interaction: the hero intelligence core reacts to scroll and cursor movement, creating the primary 3D motion moment. The reasoning section also adds depth-based pointer interaction and an auditable reasoning log.
- Automation Builder: demonstrates intelligence becoming execution through an AI-powered workflow that activates step by step.

## Technical Approach

The implementation uses a section-based architecture so each major product moment is independently maintainable. Shared narrative data lives in `data/experience.ts`, while visual sections live in `components/sections/`. The Three.js scene is isolated in `components/three/` and dynamically loaded from the hero to avoid server-rendering issues.

Animations are separated by responsibility:

- Framer Motion handles UI entrances, hover states, tab transitions, and lightweight component choreography.
- GSAP ScrollTrigger handles timeline-based scroll choreography in the insight flow, reasoning section, and automation builder.
- React Three Fiber / Three.js powers the meaningful 3D intelligence core.
- CSS keyframes support subtle continuous motion such as pulses, graph traces, and calm ambient effects.

The interface uses mock data only. No backend is required.

## Technology Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP with ScrollTrigger
- React Three Fiber
- Three.js
- Lucide React

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Create a production build:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Project Structure

- `app/` - Next.js route, layout, and global styles
- `components/sections/` - page sections matching the challenge deliverables
- `components/three/` - React Three Fiber intelligence core
- `data/` - mock product data and navigation content
- `docs/` - product documentation for the challenge submission
- `lib/` - shared utility helpers

## Design And Interaction Decisions

- The visual system uses a dark technical workspace aesthetic inspired by premium enterprise tools.
- Electric blue is reserved for primary actions, active system states, data flow, and focus cues.
- The hero avoids stock imagery and Lottie files; the central visual is custom Three.js geometry.
- The insight flow uses geometry-based line and panel animation to make the data transformation understandable without relying on long copy.
- The dashboard is built as a mock product UI with real interface structure: sidebar navigation, operational summary, table, forecast chart, entity graph, and tabs.
- Motion is intentionally restrained so it supports the product story instead of becoming decorative.
- Reduced-motion preferences are respected across the main animated sections.
