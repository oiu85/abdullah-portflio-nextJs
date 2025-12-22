import { Spinner } from '@portfolio/ui';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" />
    </div>
  );
}

