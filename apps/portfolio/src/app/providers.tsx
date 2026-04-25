'use client';

import dynamic from 'next/dynamic';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

const CommandPaletteLazy = dynamic(
  () =>
    import('@/components/command-palette/command-palette').then(
      (mod) => mod.CommandPalette
    ),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
        <CommandPaletteLazy />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
