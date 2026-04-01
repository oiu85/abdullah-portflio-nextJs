import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Download, Calendar } from 'lucide-react';
import { Button, Badge, Card, CardContent } from '@portfolio/ui';
import { getProfile, getExperience } from '@/lib/data';
import { formatDateRange } from '@portfolio/lib/utils';
import { PageShell } from '@/components/page-shell';
import { PageHeader } from '@/components/page-header';
import { Reveal } from '@/components/motion/reveal';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Abdullah Alatrash, a Senior Mobile Developer specialized in Flutter and clean architecture.',
};

export const revalidate = 3600;

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([getProfile(), getExperience()]);

  return (
    <PageShell>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          eyebrow="Profile"
          title="About Me"
          description="Get to know the person behind the code"
          maxWidthClassName="max-w-4xl"
        />

        {/* Profile Section */}
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 grid gap-8 md:grid-cols-3">
            {/* Avatar & Quick Info */}
            <div className="md:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Avatar */}
                <Reveal>
                <div className="glass-surface-soft relative mx-auto h-48 w-48 overflow-hidden rounded-2xl ring-1 ring-border/45">
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/15 via-transparent to-transparent opacity-80" />
                  {profile?.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.full_name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl font-semibold text-muted-foreground">
                      {profile?.full_name?.charAt(0) || 'J'}
                    </div>
                  )}
                </div>
                </Reveal>

                {/* Quick Info */}
                <Reveal>
                <Card className="glass-surface transition-shadow hover:shadow-card-hover">
                  <CardContent className="space-y-3 p-4">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/15">
                          <MapPin className="h-4 w-4 text-primary" />
                        </span>
                        {profile.location}
                      </div>
                    )}
                    {profile?.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="rounded-lg bg-primary/10 p-1.5 ring-1 ring-primary/15">
                          <Mail className="h-4 w-4 text-primary" />
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
                </Reveal>

                {/* Resume Download */}
                {profile?.resume_url && (
                  <Reveal>
                  <Button
                    className="w-full shadow-card transition-shadow hover:shadow-card-hover"
                    asChild
                  >
                    <a href={profile.resume_url} download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                  </Reveal>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-8 md:col-span-2">
              <Reveal>
              <div className="glass-surface-strong rounded-2xl p-6 md:p-8">
                <h2 className="mb-2 text-2xl font-semibold tracking-tight">
                  {profile?.full_name || 'John Doe'}
                </h2>
                <p className="mb-6 text-lg font-medium text-primary">
                  {profile?.title || 'Senior Mobile Developer (Flutter)'}
                </p>
                <div className="prose prose-neutral max-w-none dark:prose-invert">
                  {profile?.bio?.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="leading-relaxed text-muted-foreground">
                      {paragraph}
                    </p>
                  )) || (
                    <p className="leading-relaxed text-muted-foreground">
                      Senior Mobile Developer specialized in building high-performance Flutter applications using clean and scalable architectures.
                    </p>
                  )}
                </div>
              </div>
              </Reveal>

              {/* Experience Timeline */}
              {experiences.length > 0 && (
                <Reveal>
                <div>
                  <h3 className="mb-6 text-lg font-semibold tracking-tight">
                    Experience
                  </h3>
                  <div className="space-y-4">
                    {experiences.slice(0, 3).map((exp) => (
                      <div
                        key={exp.id}
                        className="glass-surface rounded-2xl p-5 transition-[box-shadow,border-color] hover:border-primary/25 hover:shadow-card-hover"
                      >
                        <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 shrink-0" />
                          {formatDateRange(exp.start_date, exp.end_date)}
                        </div>
                        <h4 className="font-semibold">{exp.position}</h4>
                        <p className="text-sm text-primary">{exp.company}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="mt-8 shadow-sm" asChild>
                    <Link href="/experience">View Full Experience</Link>
                  </Button>
                </div>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
