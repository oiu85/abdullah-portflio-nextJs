import { Spinner } from '@portfolio/ui';

export default function Loading() {
  return (
    <div className="relative flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-fade bg-grid opacity-[0.06]"
        aria-hidden
      />
      <Spinner size="lg" className="[&_svg]:text-primary" />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}

