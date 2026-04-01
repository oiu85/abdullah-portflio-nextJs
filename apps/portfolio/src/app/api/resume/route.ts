import { NextResponse } from 'next/server';
import { getProfile } from '@/lib/data';

/**
 * Proxies the profile resume from Supabase storage with `Content-Disposition:
 * attachment` so the browser saves the file. The raw `download` attribute on a
 * cross-origin `<a>` is ignored by browsers; same-origin `/api/resume` fixes that.
 */
export async function GET() {
  const profile = await getProfile();
  const resumeUrl = profile?.resume_url;

  if (!resumeUrl) {
    return NextResponse.json(
      { error: 'Resume not available' },
      { status: 404 }
    );
  }

  let parsed: URL;
  try {
    parsed = new URL(resumeUrl);
  } catch {
    return NextResponse.json({ error: 'Invalid resume URL' }, { status: 400 });
  }

  const supabaseBase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseBase) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
  }

  const allowedOrigin = new URL(supabaseBase).origin;
  if (parsed.origin !== allowedOrigin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const upstream = await fetch(resumeUrl, { cache: 'no-store' });
  if (!upstream.ok) {
    return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 502 });
  }

  const contentType =
    upstream.headers.get('content-type') || 'application/octet-stream';
  const blob = await upstream.blob();

  const pathSegment =
    parsed.pathname.split('/').filter(Boolean).pop() || 'resume';
  const filename = pathSegment.includes('.') ? pathSegment : `${pathSegment}.pdf`;

  return new NextResponse(blob, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename.replace(/"/g, '')}"`,
      'Cache-Control': 'private, max-age=3600',
    },
  });
}
