---
name: Lumina Mono
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c1c6d7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8b90a0'
  outline-variant: '#414754'
  surface-tint: '#aec6ff'
  primary: '#aec6ff'
  on-primary: '#002e6b'
  primary-container: '#0070f3'
  on-primary-container: '#ffffff'
  inverse-primary: '#0059c5'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c7c6c6'
  on-tertiary: '#303031'
  tertiary-container: '#767676'
  on-tertiary-container: '#ffffff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#004397'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-code:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for deep focus and technical clarity, catering to developers, data scientists, and power users. The aesthetic is "Technical Minimalist"—a blend of high-utility toolsets and premium editorial polish. 

It draws inspiration from performance-oriented workspaces where the interface recedes to prioritize content and computation. The emotional response is one of confidence, precision, and "quiet power." Expect a UI that feels responsive and structured, utilizing a strict monochromatic foundation punctuated by a singular, high-energy functional accent.

- **Minimalism:** Aggressive reduction of non-functional elements.
- **Corporate / Modern:** Systematic, predictable, and robust.
- **Technically Confident:** High information density without clutter, utilizing monospaced accents for data-driven contexts.

## Colors

The palette is strictly functional, optimized for OLED displays and long-duration usage. 

- **Background:** Deep black (#050505) provides infinite depth and high contrast for text.
- **Surface:** Elevated layers use #121212 to distinguish interactive zones from the canvas.
- **Accents:** Electric Blue (#0070F3) is used exclusively for primary actions, focus states, and progress indicators. 
- **Typography:** Pure white (#FFFFFF) for primary content; Medium Gray (#888888) for metadata, labels, and disabled states.
- **Semantic Colors:** Success, Warning, and Error states should use desaturated versions of green, amber, and red to maintain the sophisticated dark aesthetic.

## Typography

This design system utilizes a dual-font strategy. **Inter** handles all standard prose and interface elements, providing industry-standard legibility and a neutral tone. **Geist** (or a similar technical mono/sans) is used for labels, buttons, and data readouts to inject a "developer-tool" feel.

- **Hierarchy:** Use weight over size to establish hierarchy in tight spaces.
- **Tracking:** Headlines use tight tracking (-0.01em to -0.02em) for a more compact, modern look. Labels use slightly expanded tracking for readability at small scales.
- **Mobile:** Headline-xl and Headline-lg scale down by 20% on mobile devices to ensure comfortable reading without excessive wrapping.

## Layout & Spacing

The system is built on a rigid 8px grid. All dimensions, padding, and margins must be multiples of 8. For micro-adjustments (like icon alignment or small tags), a 4px half-step is permitted.

- **Grid Model:** A 12-column fluid grid is used for main dashboards, with 24px gutters. 
- **Sidebars:** Fixed-width navigation (240px or 280px) is preferred over fluid sidebars to maintain consistent tool accessibility.
- **Safe Areas:** Maintain a minimum 24px margin from the edge of the viewport on desktop and 16px on mobile.
- **Density:** High density is encouraged for workspace views; increase whitespace only for "empty state" or "onboarding" flows.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Subtle Outlines** rather than heavy shadows.

- **Layer 0 (Canvas):** #050505. The base for all content.
- **Layer 1 (Card/Surface):** #121212. Used for containers resting on the canvas. These should feature a 1px border of #222222.
- **Layer 2 (Popovers/Modals):** #1A1A1A. Used for floating elements. These require a subtle, 25% opacity black shadow with a 20px blur to separate them from Layer 1.
- **Inner Glow:** For primary buttons or active states, a subtle 1px top-inner-border (white at 10% opacity) can be used to simulate a physical "edge" catching light.

## Shapes

The design system uses a "Soft" corner logic. It avoids the playfulness of fully rounded circles in favor of a precise, architectural feel.

- **Standard (4px):** Used for input fields, small buttons, and tags.
- **Large (8px):** Used for cards, modals, and container surfaces.
- **Extra Large (12px):** Reserved for major layout sections or featured hero cards.
- **Interactive States:** On hover, shapes do not change their radius, but their border-color may transition from #222222 to #444444.

## Components

- **Buttons:** 
  - *Primary:* Solid Electric Blue (#0070F3) with White text. 
  - *Secondary:* Ghost style with #222222 border and White text. 
  - *Tertiary:* Transparent background with Secondary Text color, turning White on hover.
- **Input Fields:** Background #050505, 1px border #222222. On focus, the border changes to #0070F3 with a subtle 2px outer glow of the same color at 20% opacity.
- **Cards:** Background #121212, 1px border #222222. No shadow for resting cards; use a 1px #444444 border for hover states.
- **Chips/Tags:** Monospace font (Geist), 12px size. Dark gray background with subtle borders. Used for status, categories, or "command" hints.
- **Lists:** Clean rows separated by 1px #222222 dividers. High horizontal padding (16px) and vertical padding (12px).
- **Navigation:** Vertical sidebar with icons + text. Active state indicated by a 2px Electric Blue vertical line on the left edge or a subtle #1A1A1A background highlight.