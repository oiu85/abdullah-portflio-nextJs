'use client';

import { useEffect, useState } from 'react';
import { containsHtml } from '@/lib/sanitize';

interface SafeHtmlProps {
  content: string;
  className?: string;
}

export function SafeHtml({ content, className }: SafeHtmlProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    if (containsHtml(content)) {
      // Dynamically import DOMPurify only on client-side
      import('isomorphic-dompurify').then((DOMPurify) => {
        const config: any = {
          ALLOWED_TAGS: [
            'p',
            'br',
            'strong',
            'em',
            'u',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'ul',
            'ol',
            'li',
            'a',
            'span',
            'div',
            'blockquote',
          ],
          ALLOWED_ATTR: ['href', 'target', 'rel', 'style', 'class'],
          ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
          ALLOWED_STYLES: {
            '*': {
              'font-size': /^[\d.]+(px|em|rem|%)$/,
              'color': /^#[0-9a-fA-F]{3,6}$/,
              'text-align': /^(left|right|center|justify)$/,
            },
          },
          KEEP_CONTENT: true,
        };
        const sanitized = DOMPurify.default.sanitize(content, config);
        setSanitizedContent(String(sanitized));
      });
    } else {
      setSanitizedContent(content);
    }
  }, [content]);

  if (!isClient) {
    // Render plain text on server to avoid hydration mismatch
    return (
      <div className={className}>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  if (containsHtml(content) && sanitizedContent) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{
          __html: sanitizedContent,
        }}
      />
    );
  }

  // Fallback to plain text if sanitization not ready yet
  if (containsHtml(content) && !sanitizedContent) {
    return (
      <div className={className}>
        {content.split('\n\n').map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {content.split('\n\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

