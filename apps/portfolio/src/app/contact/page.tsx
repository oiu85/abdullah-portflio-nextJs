import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@portfolio/ui';
import { getProfile } from '@/lib/data';
import { ContactForm } from '@/components/contact-form';
import {
  CONTACT_HERO_IMAGE,
  ContactHeroImage,
} from '@/components/contact-hero-image';
import { PageShell } from '@/components/page-shell';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Abdullah Alatrash for Flutter development opportunities, collaborations, or just to say hello.',
};

export const revalidate = 3600;

export default async function ContactPage() {
  const profile = await getProfile();

  const contactHeroAlt = profile?.full_name
    ? `Contact ${profile.full_name} — available for freelance or collaboration`
    : 'Contact me — available for freelance or collaboration';

  return (
    <PageShell className="overflow-x-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title row: heading left, hero art right (same band as reference — no extra panel) */}
        <section className="relative mx-auto mb-14 max-w-6xl lg:mb-16">
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="relative z-10 w-full max-w-2xl text-center lg:max-w-xl lg:text-left">
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-eyebrow text-muted-foreground md:text-xs">
                Contact
              </p>
              <h1 className="mb-4 text-balance text-4xl font-semibold tracking-display md:text-5xl lg:text-6xl">
                Get in Touch
              </h1>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              </p>
            </div>
            <div className="relative z-0 flex w-full shrink-0 justify-center lg:w-auto lg:justify-end">
              <ContactHeroImage src={CONTACT_HERO_IMAGE} alt={contactHeroAlt} />
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-4 lg:col-span-1">
            {profile?.email && (
              <Card className="border-border/60 shadow-card transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-xl bg-primary/10 p-2.5 ring-1 ring-primary/15">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${profile.email}`}
                      className="font-medium transition-colors hover:text-primary"
                    >
                      {profile.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile?.phone && (
              <Card className="border-border/60 shadow-card transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-xl bg-primary/10 p-2.5 ring-1 ring-primary/15">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${profile.phone}`}
                      className="font-medium transition-colors hover:text-primary"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            )}

            {profile?.location && (
              <Card className="border-border/60 shadow-card transition-shadow hover:shadow-card-hover">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="rounded-xl bg-primary/10 p-2.5 ring-1 ring-primary/15">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{profile.location}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="border-border/60 shadow-card">
              <CardHeader className="space-y-1 pb-2">
                <CardTitle className="text-xl font-semibold tracking-tight">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
