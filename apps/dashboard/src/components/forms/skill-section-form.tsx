'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Button,
  Card,
  CardContent,
  Input,
  Label,
  Switch,
} from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import type { SkillSection } from '@portfolio/types';

type SkillSectionFormProps = {
  section?: SkillSection;
};

export function SkillSectionForm({ section }: SkillSectionFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    slug: section?.slug ?? '',
    label: section?.label ?? '',
    display_order: section?.display_order ?? 0,
    is_published: section?.is_published ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const slug = formData.slug.trim().toLowerCase().replace(/\s+/g, '_');
      if (!/^[a-z0-9_]+$/.test(slug)) {
        throw new Error('Slug: lowercase letters, numbers, underscores only.');
      }

      if (section) {
        const { error: upErr } = await supabase
          .from('skill_sections')
          .update({
            label: formData.label.trim(),
            display_order: formData.display_order,
            is_published: formData.is_published,
          })
          .eq('id', section.id);
        if (upErr) throw upErr;
      } else {
        const payload = {
          slug,
          label: formData.label.trim(),
          display_order: formData.display_order,
          is_published: formData.is_published,
        };
        const { error: insErr } = await supabase
          .from('skill_sections')
          .insert([payload]);
        if (insErr) throw insErr;
      }

      router.push('/skills/sections');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/skills/sections">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to sections
        </Link>
      </Button>

      <Card>
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((p) => ({ ...p, slug: e.target.value }))
              }
              placeholder="e.g. mobile_or_cloud"
              required
              disabled={!!section}
            />
            {section && (
              <p className="text-xs text-muted-foreground">
                Slug cannot be changed after creation.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Display label *</Label>
            <Input
              id="label"
              value={formData.label}
              onChange={(e) =>
                setFormData((p) => ({ ...p, label: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="display_order">Display order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  display_order: parseInt(e.target.value, 10) || 0,
                }))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) =>
                setFormData((p) => ({ ...p, is_published: checked }))
              }
            />
            <Label htmlFor="is_published">Published (visible on portfolio)</Label>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading}>
              {section ? 'Update section' : 'Create section'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/skills/sections">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
