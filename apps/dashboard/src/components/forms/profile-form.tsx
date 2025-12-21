'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Textarea, Label, Card, CardContent, Switch } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from '@portfolio/types';

interface ProfileFormProps {
  profile?: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    title: profile?.title || '',
    bio: profile?.bio || '',
    short_bio: profile?.short_bio || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    is_available_for_hire: profile?.is_available_for_hire ?? true,
    github: profile?.social_links?.github || '',
    linkedin: profile?.social_links?.linkedin || '',
    twitter: profile?.social_links?.twitter || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const supabase = createClient();
      const data = {
        full_name: formData.full_name,
        title: formData.title,
        bio: formData.bio,
        short_bio: formData.short_bio,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        is_available_for_hire: formData.is_available_for_hire,
        social_links: {
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
        },
      };

      if (profile) {
        const { error } = await supabase.from('profile').update(data).eq('id', profile.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('profile').insert([data]);
        if (error) throw error;
      }

      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Full-Stack Developer"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_bio">Short Bio *</Label>
            <Textarea
              id="short_bio"
              value={formData.short_bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, short_bio: e.target.value }))}
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Full Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              className="min-h-[200px]"
              required
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Social Links</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={formData.github}
                  onChange={(e) => setFormData((prev) => ({ ...prev, github: e.target.value }))}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData((prev) => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={formData.twitter}
                  onChange={(e) => setFormData((prev) => ({ ...prev, twitter: e.target.value }))}
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="is_available_for_hire"
              checked={formData.is_available_for_hire}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_available_for_hire: checked }))}
            />
            <Label htmlFor="is_available_for_hire">Available for hire</Label>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>
          )}
          {success && (
            <div className="p-3 rounded-lg bg-green-500/10 text-green-600 text-sm">
              Profile saved successfully!
            </div>
          )}

          <Button type="submit" isLoading={isLoading}>
            Save Profile
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
