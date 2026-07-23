Read AGENTS.md and only fix the Knowledge Graph visualization inside the Neural Pipeline popup.

Do not change the popup size, layout, colors, borders, typography, animations, or overall pipeline sequence.

The popup is already the correct size. The problem is ONLY the graph implementation.

Current issue:
The graph renders as a tiny cluster in the top-left corner while the graph container is almost empty. This means the graph viewport/layout is incorrect, not the popup.

Your task is to completely rebuild the graph visualization so it naturally fills the available graph area.

Requirements:

• Treat the graph as a responsive visualization, not a static image.
• The graph should occupy approximately 80–90% of the available graph canvas.
• Center the graph horizontally and vertically.
• Distribute nodes across the entire canvas rather than clustering them in one corner.
• Scale node positions relative to the container dimensions instead of using tiny fixed coordinates.
• Ensure connection lines span naturally across the graph.
• Increase node size and label readability.
• Use the full width and height of the graph container.

Implementation guidance:

If using SVG:
- Create a proper responsive SVG.
- Use width="100%" and height="100%".
- Use a correct viewBox matching the designed coordinate system.
- Remove any transform: scale(...) that shrinks the graph.
- Remove fixed pixel positioning that assumes a small canvas.

If using React Flow:
- Call fitView() after the popup finishes expanding.
- Recalculate layout after mount.
- Ensure the parent container has a real width and height before rendering.
- Disable excessive padding in fitView.

If using Canvas:
- Redraw using the actual container width and height.
- Compute node positions dynamically from the container size.
- Scale the graph proportionally.

Visual target:

The graph should resemble an enterprise knowledge graph:
- approximately 6–8 nodes
- evenly distributed
- one central entity
- several connected entities
- subtle blue connection lines
- soft node glow
- readable labels
- balanced spacing
- no overlapping nodes

The graph should immediately read as a complete visualization instead of a tiny preview.

After implementation:
- verify the graph fills the canvas;
- verify it remains responsive;
- run lint;
- run build;
- stop after this fix.