import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Calendar } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@portfolio/ui';
import { getProfile, getExperience } from '@/lib/data';
import { formatDateRange } from '@portfolio/lib/utils';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';
import { PageSectionEnter } from '@/components/motion/page-section-enter';
import { SectionFrame } from '@/components/section-frame';
import { ResumeDownloadButton } from '@/components/resume-download-button';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Abdullah Alatrash, a Senior Mobile Developer specialized in Flutter and clean architecture.',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([getProfile(), getExperience()]);

  const bioParagraphs =
    profile?.bio
      ?.trim()
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean) ?? [];

  return (
    <PageShell>
      <SectionFrame>
        <PageHeader
          eyebrow="Story"
          title="About"
          description="The thinking behind the work — how I build, collaborate, and ship."
          maxWidthClassName="max-w-3xl"
        />

        <div className="mt-4 grid gap-12 lg:grid-cols-12 lg:gap-14">
          <aside className="lg:col-span-4">
            <PageSectionEnter className="lg:sticky lg:top-28 lg:space-y-6">
              <div className="glass-surface-soft relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-[1.5rem] ring-1 ring-border/45 lg:mx-0 lg:max-w-none">
                <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-80" />
                {profile?.avatar_url ? (
                  <Image
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 280px, 360px"
                  />
                ) : (
                  <div className="flex h-full min-h-[280px] w-full items-center justify-center text-4xl font-semibold text-muted-foreground">
                    {profile?.full_name?.charAt(0) || 'J'}
                  </div>
                )}
              </div>

              <Card className="glass-surface mt-8 transition-shadow hover:shadow-card-hover lg:mt-0">
                <CardContent className="space-y-4 p-5">
                  <p className="text-caption font-medium uppercase tracking-eyebrow text-muted-foreground">
                    Contact
                  </p>
                  {profile?.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/15">
                        <MapPin className="h-4 w-4 text-primary" aria-hidden />
                      </span>
                      {profile.location}
                    </div>
                  )}
                  {profile?.email && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/15">
                        <Mail className="h-4 w-4 text-primary" aria-hidden />
                      </span>
                      {profile.email}
                    </div>
                  )}
                  {profile?.is_available_for_hire && (
                    <Badge
                      variant="success"
                      className="w-full justify-center border border-emerald-500/20 shadow-sm"
                    >
                      Available for hire
                    </Badge>
                  )}
                </CardContent>
              </Card>

              {profile?.resume_url && (
                <ResumeDownloadButton className="mt-4 w-full shadow-card transition-shadow hover:shadow-card-hover" />
              )}
            </PageSectionEnter>
          </aside>

          <div className="space-y-block-gap lg:col-span-8">
            <PageSectionEnter delay={0.06}>
              {profile?.short_bio && (
                <blockquote className="glass-surface-strong border-l-2 border-accent-line/80 pl-6 pr-5 py-6 text-lg font-medium leading-relaxed text-foreground/95 md:text-xl md:leading-relaxed">
                  {profile.short_bio}
                </blockquote>
              )}
            </PageSectionEnter>

            <PageSectionEnter delay={0.1}>
              <div className="space-y-8">
                {bioParagraphs.length > 0 ? (
                  bioParagraphs.map((paragraph, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <p className="text-pretty text-xl font-medium leading-relaxed text-foreground/95 md:text-2xl md:leading-snug">
                          {paragraph}
                        </p>
                      ) : (
                        <p className="text-pretty text-body leading-relaxed text-muted-foreground md:text-lg">
                          {paragraph}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-pretty text-body leading-relaxed text-muted-foreground md:text-lg">
                    Senior Mobile Developer specialized in building high-performance Flutter
                    applications using clean and scalable architectures.
                  </p>
                )}
              </div>
            </PageSectionEnter>

            {experiences.length > 0 && (
              <PageSectionEnter delay={0.14}>
                <div className="border-t border-border/60 pt-10">
                  <h2 className="mb-2 text-caption font-semibold uppercase tracking-eyebrow text-muted-foreground">
                    Selected roles
                  </h2>
                  <p className="mb-8 max-w-content text-pretty text-muted-foreground">
                    A few recent chapters — see the full timeline on Experience.
                  </p>
                  <div className="relative space-y-0 pl-6">
                    <div
                      className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent-line/50 via-border to-transparent"
                      aria-hidden
                    />
                    {experiences.slice(0, 4).map((exp) => (
                      <div key={exp.id} className="relative pb-10 last:pb-0">
                        <div className="absolute -left-6 top-1.5 h-2 w-2 rounded-full bg-accent-line shadow-[0_0_0_4px_hsl(var(--background))]" />
                        <div className="glass-surface rounded-2xl p-5 transition-[box-shadow,border-color] hover:border-primary/20 hover:shadow-card-hover">
                          <div className="mb-2 flex flex-wrap items-center gap-2 text-caption text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                            {formatDateRange(exp.start_date, exp.end_date)}
                          </div>
                          <h3 className="text-title font-semibold tracking-tight">{exp.position}</h3>
                          <p className="mt-1 text-sm font-medium text-primary">{exp.company}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-8 shadow-sm" asChild>
                    <Link href="/experience">Full experience</Link>
                  </Button>
                </div>
              </PageSectionEnter>
            )}
          </div>
        </div>
      </SectionFrame>
    </PageShell>
  );
}
