# Xai - Intelligence Workspace

Interactive single-page product experience for the RacoAI frontend challenge. The product narrative is:

`raw data -> structured intelligence -> actionable insight -> AI automations`

## Stack

- Next.js App Router
- TypeScript
- Framer Motion for UI choreography
- GSAP ScrollTrigger for scroll-linked timelines
- React Three Fiber / Three.js for the hero intelligence core
- Lucide React for product UI icons

## Structure

- `app/` - Next.js route, layout, and global styles
- `components/sections/` - page sections matching the required challenge deliverables
- `components/three/` - React Three Fiber scene code
- `components/ui/` - small reusable interface primitives
- `data/` - mock product data and navigation content
- `docs/` - product/design documentation for the challenge submission

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Animation Approach

The experience separates section-level choreography from reusable UI. Framer Motion handles component entrances, hover states, tab transitions, and the signature interaction. GSAP ScrollTrigger owns scroll-linked geometry progress in the insight flow. React Three Fiber renders the meaningful 3D hero object and responds to pointer movement through the surrounding hero section.

## Submission Notes

Add the public Figma link, live deployment URL, and video walkthrough link before final submission.
