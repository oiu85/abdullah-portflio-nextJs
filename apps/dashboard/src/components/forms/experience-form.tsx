'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button, Input, Textarea, Label, Card, CardContent, Switch } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import type { Experience } from '@portfolio/types';

interface ExperienceFormProps {
  experience?: Experience;
}

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(experience?.company_logo || null);

  const [formData, setFormData] = useState({
    company: experience?.company || '',
    position: experience?.position || '',
    description: experience?.description || '',
    location: experience?.location || '',
    company_url: experience?.company_url || '',
    start_date: experience?.start_date || '',
    end_date: experience?.end_date || '',
    is_current: experience?.is_current || false,
    is_published: experience?.is_published ?? true,
    technologies: experience?.technologies?.join(', ') || '',
    display_order: experience?.display_order || 0,
  });

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const data = {
        ...formData,
        end_date: formData.is_current ? null : formData.end_date || null,
        technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      };

      if (experience) {
        // Upload logo if selected
        let logoUrl = experience.company_logo;
        if (logoFile) {
          logoUrl = await uploadImage(logoFile);
        } else if (logoPreview === null && experience.company_logo) {
          // If logo was removed, set to null
          logoUrl = null as unknown as string;
        }

        const { error } = await supabase.from('experience').update({
          ...data,
          company_logo: logoUrl
        }).eq('id', experience.id);
        if (error) throw error;
      } else {
        // Upload logo if selected
        let logoUrl = null;
        if (logoFile) {
          logoUrl = await uploadImage(logoFile);
        }

        const { error } = await supabase.from('experience').insert([{
          ...data,
          company_logo: logoUrl
        }]);
        if (error) throw error;
      }

      router.push('/experience');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/experience">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Experience
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6 space-y-6">
          {/* Company Logo Upload */}
          <div className="space-y-2">
            <Label>Company Logo</Label>
            <input
              type="file"
              ref={logoInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleLogoChange}
            />
            <div className="flex flex-col gap-2">
              {logoPreview && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                  <img
                    src={logoPreview}
                    alt="Logo preview"
                    className="w-full h-full object-contain bg-white p-2"
                  />
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => logoInputRef.current?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {logoPreview ? 'Change Logo' : 'Upload Logo'}
              </Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="min-h-[150px]"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company_url">Company URL</Label>
              <Input
                id="company_url"
                type="url"
                value={formData.company_url}
                onChange={(e) => setFormData((prev) => ({ ...prev, company_url: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData((prev) => ({ ...prev, end_date: e.target.value }))}
                disabled={formData.is_current}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
            />
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_current"
                checked={formData.is_current}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_current: checked }))}
              />
              <Label htmlFor="is_current">Currently working here</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading}>
              {experience ? 'Update' : 'Create'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/experience">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
