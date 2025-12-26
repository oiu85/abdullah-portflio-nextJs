'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
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
  const [iconFile, setIconFile] = useState<File | null>(null);
  const iconInputRef = useRef<HTMLInputElement>(null);

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

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `icons/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleIconFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      // Clear URL input when file is selected
      setFormData((prev) => ({ ...prev, icon: '' }));
    }
  };

  const handleIconUrlChange = (url: string) => {
    setFormData((prev) => ({ ...prev, icon: url }));
    // Clear file when URL is entered
    setIconFile(null);
    if (iconInputRef.current) {
      iconInputRef.current.value = '';
    }
  };

  const clearIcon = () => {
    setIconFile(null);
    setFormData((prev) => ({ ...prev, icon: '' }));
    if (iconInputRef.current) {
      iconInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();

      // Upload icon file if selected
      let iconUrl = formData.icon;
      if (iconFile) {
        iconUrl = await uploadImage(iconFile);
      }

      const data = {
        ...formData,
        icon: iconUrl || null,
      };

      if (skill) {
        const { error } = await supabase.from('skills').update(data).eq('id', skill.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('skills').insert([data]);
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

          {/* Icon */}
          <div className="space-y-2">
            <Label htmlFor="icon">Icon</Label>
            <div className="space-y-3">
              {/* Icon URL Input */}
              <div className="space-y-2">
                <Input
                  id="icon"
                  type="url"
                  value={formData.icon}
                  onChange={(e) => handleIconUrlChange(e.target.value)}
                  placeholder="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg"
                  disabled={!!iconFile}
                />
                <p className="text-xs text-muted-foreground">
                  Enter an icon URL (e.g., from Simple Icons, DevIcons, etc.)
                </p>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Icon File Upload */}
              <div className="space-y-2">
                <input
                  type="file"
                  ref={iconInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleIconFileChange}
                  disabled={!!formData.icon}
                />
                <div className="flex flex-col gap-2">
                  {(iconFile || formData.icon) && (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border bg-muted flex items-center justify-center">
                      <img
                        src={iconFile ? URL.createObjectURL(iconFile) : formData.icon}
                        alt="Skill icon"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <button
                        type="button"
                        onClick={clearIcon}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 hover:bg-destructive/90 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => iconInputRef.current?.click()}
                    disabled={!!formData.icon}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {iconFile || formData.icon ? 'Change Icon' : 'Upload Icon'}
                  </Button>
                </div>
              </div>
            </div>
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
