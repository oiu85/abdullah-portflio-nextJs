'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button, Input, Label, Card, CardContent, Switch, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import type { Skill, SkillCategory } from '@portfolio/types';

const categories = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'tools', label: 'Tools' },
  { value: 'design', label: 'Design' },
  { value: 'soft_skills', label: 'Soft Skills' },
  { value: 'other', label: 'Other' },
];

interface SkillFormProps {
  skill?: Skill;
}

export function SkillForm({ skill }: SkillFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    category: SkillCategory;
    proficiency: number;
    icon: string;
    is_published: boolean;
    display_order: number;
  }>({
    name: skill?.name || '',
    category: skill?.category || 'frontend',
    proficiency: skill?.proficiency || 80,
    icon: skill?.icon || '',
    is_published: skill?.is_published ?? true,
    display_order: skill?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      if (skill) {
        const { error } = await supabase.from('skills').update(formData).eq('id', skill.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('skills').insert([formData]);
        if (error) throw error;
      }

      router.push('/skills');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save skill');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/skills">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Skills
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="React, Node.js, etc."
              required
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as SkillCategory }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Proficiency */}
          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency (1-100) *</Label>
            <Input
              id="proficiency"
              type="number"
              min="1"
              max="100"
              value={formData.proficiency}
              onChange={(e) => setFormData((prev) => ({ ...prev, proficiency: parseInt(e.target.value) || 0 }))}
              required
            />
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${formData.proficiency}%` }}
              />
            </div>
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="display_order">Display Order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData((prev) => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
            />
          </div>

          {/* Published Toggle */}
          <div className="flex items-center gap-2">
            <Switch
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
            />
            <Label htmlFor="is_published">Published</Label>
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading}>
              {skill ? 'Update Skill' : 'Create Skill'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/skills">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
