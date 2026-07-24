inspect `aicore-hero.html`, but do not replace or redesign the current Hero. Preserve the current AI Core design, layout, materials, colors, object count, container dimensions, surrounding text, and all existing Hero content exactly.

Only make these two corrections:

1. Animation smoothness
- Match the smooth motion behavior from `aicore-hero.html`.
- Use the same style of damped pointer interpolation, slow ambient rotation, scrubbed GSAP ScrollTrigger progression, and continuous `requestAnimationFrame` rendering.
- Remove visible stepping, sudden state changes, snapping, jitter, and abrupt speed changes.
- Use lerped/interpolated values rather than directly assigning positions or rotations.
- Keep the existing animation concept and visual objects unchanged.
- Ensure transitions remain smooth when scrolling both forward and backward.
- Do not change the page’s current scroll length or pinning behavior unless required to match the reference smoothness.

2. Final structured geometry visibility
- Keep the existing final structured geometry design unchanged.
- Make it as clearly visible as the structured grid in `aicore-hero.html`.
- During the final morph stage, ensure particles reach their final structured positions fully.
- Increase only the final structure’s visibility where necessary through line opacity, particle opacity, point size, contrast, or render order.
- Fade the structured connection lines in progressively during the latter part of the morph.
- Ensure the final structure remains clearly visible long enough to be understood before the section ends.
- Do not replace the final geometry, add new shapes, or change its composition.

Use `aicore-hero.html` only as the behavioral reference for interpolation, scroll-linked morphing, and final-geometry visibility. Its reference uses continuous particle interpolation and progressively reveals its structured lines during the final morph. :contentReference[oaicite:0]{index=0}

Before editing, identify the exact causes of:
- the current animation roughness;
- the final structured geometry being too faint or incomplete.

After editing:
- compare the current version before and after;
- verify that the visual design is unchanged;
- test scrolling forward and backward;
- test desktop and mobile;
- respect reduced motion;
- run `npm run lint`;
- run `npm run build`;
- stop after these two fixes and report the exact values or logic changed.