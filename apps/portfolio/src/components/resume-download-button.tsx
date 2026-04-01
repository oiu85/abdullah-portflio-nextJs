'use client';

import { useCallback, useState } from 'react';
import { Download } from 'lucide-react';
import { Button, cn, type ButtonProps } from '@portfolio/ui';

export type ResumeDownloadButtonProps = Omit<
  ButtonProps,
  'asChild' | 'children' | 'onClick' | 'type'
> & {
  /** Button label (default: Download Resume). */
  label?: string;
};

function filenameFromContentDisposition(header: string | null): string {
  if (!header) return 'resume.pdf';
  const match = /filename\*?=(?:UTF-8''|")?([^";\n]+)/i.exec(header);
  if (!match?.[1]) return 'resume.pdf';
  const raw = match[1].replace(/"/g, '').trim();
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/**
 * Triggers a real file download via `/api/resume`, which sets
 * `Content-Disposition: attachment`. Shows a loading indicator while the file
 * is fetched.
 */
export function ResumeDownloadButton({
  label = 'Download Resume',
  className,
  variant = 'default',
  size = 'default',
  disabled,
  ...props
}: ResumeDownloadButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    if (isLoading || disabled) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/resume', { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Resume request failed: ${response.status}`);
      }
      const blob = await response.blob();
      const filename = filenameFromContentDisposition(
        response.headers.get('Content-Disposition')
      );
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.rel = 'noopener';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, disabled]);

  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      disabled={disabled}
      isLoading={isLoading}
      onClick={handleDownload}
      aria-busy={isLoading}
      {...props}
      type="button"
    >
      {!isLoading && (
        <Download className="mr-2 h-4 w-4 shrink-0" aria-hidden />
      )}
      {label}
    </Button>
  );
}
