'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  contactCtaSiteContentSchema,
  footerSiteContentSchema,
  homeSiteContentSchema,
  pageHeaderPageSchema,
  type PageHeaderCopy,
  type SiteContentBundle,
} from '@portfolio/validation';
import { Button, Card, CardContent, Input, Label, Textarea } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@portfolio/ui';

type TabId = 'home' | 'footer' | 'projects' | 'experience' | 'skills' | 'contact_cta';

const tabs: { id: TabId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'footer', label: 'Footer' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills page' },
  { id: 'contact_cta', label: 'Contact CTA' },
];

type PagesEditorProps = {
  initial: SiteContentBundle;
};

export function PagesEditor({ initial }: PagesEditorProps) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>('home');
  const [home, setHome] = useState(initial.home);
  const [footer, setFooter] = useState(initial.footer);
  const [projects, setProjects] = useState(initial.projects);
  const [experience, setExperience] = useState(initial.experience);
  const [skillsPage, setSkillsPage] = useState(initial.skills);
  const [contactCta, setContactCta] = useState(initial.contact_cta);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const saveSlug = async (slug: TabId, content: unknown) => {
    setSaving(true);
    setMessage(null);
    setError(null);
    try {
      const supabase = createClient();
      const { error: upErr } = await supabase
        .from('site_pages')
        .upsert({ slug, content }, { onConflict: 'slug' });
      if (upErr) throw upErr;
      setMessage('Saved.');
      router.refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const saveHome = () => {
    const parsed = homeSiteContentSchema.parse(home);
    void saveSlug('home', parsed);
  };

  const saveFooter = () => {
    const parsed = footerSiteContentSchema.parse(footer);
    void saveSlug('footer', parsed);
  };

  const saveProjects = () => {
    const parsed = pageHeaderPageSchema.parse(projects);
    void saveSlug('projects', parsed);
  };

  const saveExperience = () => {
    const parsed = pageHeaderPageSchema.parse(experience);
    void saveSlug('experience', parsed);
  };

  const saveSkillsPage = () => {
    const parsed = pageHeaderPageSchema.parse(skillsPage);
    void saveSlug('skills', parsed);
  };

  const saveContactCta = () => {
    const parsed = contactCtaSiteContentSchema.parse(contactCta);
    void saveSlug('contact_cta', parsed);
  };

  const updateFooterNav = (
    index: number,
    field: 'href' | 'label',
    value: string
  ) => {
    setFooter((prev) => {
      const next = [...prev.footer_nav];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, footer_nav: next };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              tab === t.id
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {message && (
        <p className="text-sm text-emerald-600 dark:text-emerald-400">{message}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {tab === 'home' && (
        <Card>
          <CardContent className="space-y-6 p-6">
            <h2 className="text-lg font-semibold">Featured projects band</h2>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={home.featured_section.title}
                onChange={(e) =>
                  setHome((p) => ({
                    ...p,
                    featured_section: {
                      ...p.featured_section,
                      title: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea
                value={home.featured_section.subtitle}
                onChange={(e) =>
                  setHome((p) => ({
                    ...p,
                    featured_section: {
                      ...p.featured_section,
                      subtitle: e.target.value,
                    },
                  }))
                }
                rows={3}
              />
            </div>
            <h2 className="text-lg font-semibold">Skills preview band</h2>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={home.skills_preview.title}
                onChange={(e) =>
                  setHome((p) => ({
                    ...p,
                    skills_preview: {
                      ...p.skills_preview,
                      title: e.target.value,
                    },
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subtitle</Label>
              <Textarea
                value={home.skills_preview.subtitle}
                onChange={(e) =>
                  setHome((p) => ({
                    ...p,
                    skills_preview: {
                      ...p.skills_preview,
                      subtitle: e.target.value,
                    },
                  }))
                }
                rows={3}
              />
            </div>
            <Button type="button" onClick={saveHome} isLoading={saving}>
              Save home
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === 'footer' && (
        <Card>
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Brand mark</Label>
                <Input
                  value={footer.brand_mark}
                  onChange={(e) =>
                    setFooter((p) => ({ ...p, brand_mark: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Copyright name</Label>
                <Input
                  value={footer.copyright_holder}
                  onChange={(e) =>
                    setFooter((p) => ({
                      ...p,
                      copyright_holder: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Tagline</Label>
              <Textarea
                value={footer.tagline}
                onChange={(e) =>
                  setFooter((p) => ({ ...p, tagline: e.target.value }))
                }
                rows={3}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Quick links heading</Label>
                <Input
                  value={footer.quick_links_heading}
                  onChange={(e) =>
                    setFooter((p) => ({
                      ...p,
                      quick_links_heading: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Connect heading</Label>
                <Input
                  value={footer.connect_heading}
                  onChange={(e) =>
                    setFooter((p) => ({
                      ...p,
                      connect_heading: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label>Footer navigation</Label>
              {footer.footer_nav.map((item, i) => (
                <div key={i} className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Path"
                    value={item.href}
                    onChange={(e) => updateFooterNav(i, 'href', e.target.value)}
                  />
                  <Input
                    placeholder="Label"
                    value={item.label}
                    onChange={(e) => updateFooterNav(i, 'label', e.target.value)}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Social links use Profile settings (GitHub, LinkedIn, Twitter, email).
            </p>
            <Button type="button" onClick={saveFooter} isLoading={saving}>
              Save footer
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === 'projects' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <PageHeaderFields
              value={projects.page_header}
              onChange={(v) => setProjects({ page_header: v })}
            />
            <Button type="button" onClick={saveProjects} isLoading={saving}>
              Save projects page
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === 'experience' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <PageHeaderFields
              value={experience.page_header}
              onChange={(v) => setExperience({ page_header: v })}
            />
            <Button type="button" onClick={saveExperience} isLoading={saving}>
              Save experience page
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === 'skills' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <PageHeaderFields
              value={skillsPage.page_header}
              onChange={(v) => setSkillsPage({ page_header: v })}
            />
            <Button type="button" onClick={saveSkillsPage} isLoading={saving}>
              Save skills page
            </Button>
          </CardContent>
        </Card>
      )}

      {tab === 'contact_cta' && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <Label>Eyebrow</Label>
              <Input
                value={contactCta.eyebrow}
                onChange={(e) =>
                  setContactCta((p) => ({ ...p, eyebrow: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={contactCta.title}
                onChange={(e) =>
                  setContactCta((p) => ({ ...p, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Body</Label>
              <Textarea
                value={contactCta.body}
                onChange={(e) =>
                  setContactCta((p) => ({ ...p, body: e.target.value }))
                }
                rows={5}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Primary button</Label>
                <Input
                  value={contactCta.primary_label}
                  onChange={(e) =>
                    setContactCta((p) => ({
                      ...p,
                      primary_label: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Secondary button</Label>
                <Input
                  value={contactCta.secondary_label}
                  onChange={(e) =>
                    setContactCta((p) => ({
                      ...p,
                      secondary_label: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <Button type="button" onClick={saveContactCta} isLoading={saving}>
              Save contact CTA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PageHeaderFields({
  value,
  onChange,
}: {
  value: PageHeaderCopy;
  onChange: (v: PageHeaderCopy) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <Label>Eyebrow</Label>
        <Input
          value={value.eyebrow}
          onChange={(e) => onChange({ ...value, eyebrow: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={value.description}
          onChange={(e) =>
            onChange({ ...value, description: e.target.value })
          }
          rows={4}
        />
      </div>
    </>
  );
}
