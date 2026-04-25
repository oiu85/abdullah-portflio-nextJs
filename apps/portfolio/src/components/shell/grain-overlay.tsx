/**
 * Fixed film grain — pointer-events none, sits above page background only.
 * SVG feTurbulence; blend mode differs by theme (globals).
 */
export function GrainOverlay() {
  return (
    <div
      className="grain-overlay pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}
