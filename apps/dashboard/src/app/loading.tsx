import { Spinner } from '@portfolio/ui';

export default function RootLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <Spinner size="lg" />
      <p className="text-sm text-muted-foreground">Loading…</p>
    </div>
  );
}
