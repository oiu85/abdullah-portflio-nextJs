'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button, Input, Textarea, Label, Card, CardContent, Switch, Spinner } from '@portfolio/ui';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@portfolio/types';
import { RichTextEditor } from '@/components/rich-text-editor';

interface ProjectFormProps {
  project?: Project;
}

/** Shown as guidance only — uploads are not validated against these sizes. */
const RECOMMENDED_FEATURED_PX = '1200 × 675 px (16:9)';
const RECOMMENDED_GALLERY_PX = '1200 × 675 px (16:9) or larger';

function readFileDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not read image'));
    };
    img.src = url;
  });
}

function readUrlDimensions(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () =>
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = url;
  });
}

function formatDimensions(w: number, h: number) {
  return `${w} × ${h} px`;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: project?.title || '',
    slug: project?.slug || '',
    short_description: project?.short_description || '',
    description: project?.description || '',
    technologies: project?.technologies?.join(', ') || '',
    live_url: project?.live_url || '',
    github_url: project?.github_url || '',
    is_featured: project?.is_featured || false,
    is_published: project?.is_published || false,
    display_order: project?.display_order || 0,
    featured_image: project?.featured_image || '',
  });

  const [galleryImages, setGalleryImages] = useState<string[]>(project?.images || []);
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const [featuredDims, setFeaturedDims] = useState<{ width: number; height: number } | null>(null);
  const [galleryNewDims, setGalleryNewDims] = useState<{ width: number; height: number }[]>([]);
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const galleryImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    if (featuredImageFile) {
      readFileDimensions(featuredImageFile)
        .then((d) => {
          if (!cancelled) setFeaturedDims(d);
        })
        .catch(() => {
          if (!cancelled) setFeaturedDims(null);
        });
      return () => {
        cancelled = true;
      };
    }
    if (formData.featured_image && !featuredImageFile) {
      readUrlDimensions(formData.featured_image)
        .then((d) => {
          if (!cancelled) setFeaturedDims(d);
        })
        .catch(() => {
          if (!cancelled) setFeaturedDims(null);
        });
      return () => {
        cancelled = true;
      };
    }
    setFeaturedDims(null);
    return () => {
      cancelled = true;
    };
  }, [featuredImageFile, formData.featured_image]);

  useEffect(() => {
    let cancelled = false;
    if (galleryImageFiles.length === 0) {
      setGalleryNewDims([]);
      return;
    }
    Promise.all(galleryImageFiles.map((f) => readFileDimensions(f)))
      .then((dims) => {
        if (!cancelled) setGalleryNewDims(dims);
      })
      .catch(() => {
        if (!cancelled) setGalleryNewDims([]);
      });
    return () => {
      cancelled = true;
    };
  }, [galleryImageFiles]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
      .trim();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: !project ? generateSlug(title) : prev.slug,
    }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const supabase = createClient();
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('media').getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFeaturedImageFile(file);
    }
  };

  const handleGalleryImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setGalleryImageFiles((prev) => [...prev, ...files]);
    }
  };

  const removeGalleryImageFile = (index: number) => {
    setGalleryImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeGalleryImageUrl = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setUploadPhase('Preparing…');
    setError(null);

    if (
      !formData.description ||
      formData.description.trim() === '' ||
      formData.description === '<p></p>'
    ) {
      setError('Description is required');
      setUploadPhase(null);
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();

      let featuredImageUrl = formData.featured_image;
      if (featuredImageFile) {
        setUploadPhase('Uploading featured image…');
        featuredImageUrl = await uploadImage(featuredImageFile);
      }

      const newGalleryImageUrls: string[] = [];
      const totalGallery = galleryImageFiles.length;
      for (let i = 0; i < galleryImageFiles.length; i++) {
        setUploadPhase(
          totalGallery > 0
            ? `Uploading gallery images (${i + 1} / ${totalGallery})…`
            : 'Uploading gallery…'
        );
        const url = await uploadImage(galleryImageFiles[i]);
        newGalleryImageUrls.push(url);
      }

      const data = {
        ...formData,
        featured_image: featuredImageUrl,
        images: [...galleryImages, ...newGalleryImageUrls],
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      setUploadPhase(project ? 'Updating project…' : 'Saving project…');

      if (project) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(data)
          .eq('id', project.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase.from('projects').insert([data]);
        if (insertError) throw insertError;
      }

      setUploadPhase(null);
      router.push('/projects');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save project';
      setError(message);
    } finally {
      setUploadPhase(null);
      setIsLoading(false);
    }
  };

  const featuredPreviewUrl = useMemo(() => {
    if (featuredImageFile) return URL.createObjectURL(featuredImageFile);
    return null;
  }, [featuredImageFile]);

  useEffect(() => {
    return () => {
      if (featuredPreviewUrl) URL.revokeObjectURL(featuredPreviewUrl);
    };
  }, [featuredPreviewUrl]);

  const galleryPreviewUrls = useMemo(
    () => galleryImageFiles.map((f) => URL.createObjectURL(f)),
    [galleryImageFiles]
  );

  useEffect(() => {
    return () => {
      galleryPreviewUrls.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [galleryPreviewUrls]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      <Card>
        <CardContent className="space-y-6 p-6">
          {(isLoading || uploadPhase) && (
            <div
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 p-4"
              role="status"
              aria-live="polite"
            >
              <Spinner size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  {uploadPhase || 'Working…'}
                </p>
                <p className="text-xs text-muted-foreground">
                  Please keep this page open until finished.
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Project title"
              required
              disabled={isLoading}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, slug: e.target.value }))
              }
              placeholder="project-slug"
              required
              disabled={isLoading}
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-2">
            <div>
              <Label>Featured image</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Recommended size: {RECOMMENDED_FEATURED_PX}. Any dimensions are accepted — this
                is only a guide.
              </p>
            </div>
            <input
              type="file"
              ref={featuredImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFeaturedImageChange}
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              {(featuredImageFile || formData.featured_image) && (
                <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                  <img
                    src={featuredPreviewUrl ?? formData.featured_image}
                    alt="Featured"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFeaturedImageFile(null);
                      setFormData((prev) => ({ ...prev, featured_image: '' }));
                    }}
                    className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              {featuredDims && (
                <p className="text-xs text-muted-foreground">
                  Current file: {formatDimensions(featuredDims.width, featuredDims.height)}
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => featuredImageInputRef.current?.click()}
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {featuredImageFile || formData.featured_image
                  ? 'Change image'
                  : 'Upload image'}
              </Button>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="space-y-2">
            <div>
              <Label>Gallery images</Label>
              <p className="mt-1 text-xs text-muted-foreground">
                Recommended: {RECOMMENDED_GALLERY_PX}. Any dimensions are accepted — this is only a
                guide.
              </p>
            </div>
            <input
              type="file"
              ref={galleryImageInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleGalleryImageChange}
              multiple
              disabled={isLoading}
            />
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-2">
                {galleryImages.map((img, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border"
                  >
                    <img
                      src={img}
                      alt={`Gallery ${index}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImageUrl(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {galleryImageFiles.map((file, index) => (
                  <div
                    key={`new-${index}-${file.name}`}
                    className="relative h-24 w-24 overflow-hidden rounded-lg border"
                  >
                    <img
                      src={galleryPreviewUrls[index]}
                      alt={`New ${index}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImageFile(index)}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    {galleryNewDims[index] && (
                      <span className="absolute bottom-0 left-0 right-0 bg-black/60 px-1 py-0.5 text-center text-[10px] text-white">
                        {formatDimensions(
                          galleryNewDims[index].width,
                          galleryNewDims[index].height
                        )}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => galleryImageInputRef.current?.click()}
                disabled={isLoading}
              >
                <Upload className="mr-2 h-4 w-4" />
                Add images
              </Button>
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="short_description">Short description *</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  short_description: e.target.value,
                }))
              }
              placeholder="Brief project description"
              className="min-h-[80px]"
              required
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Full description *</Label>
            <RichTextEditor
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              placeholder="Detailed project description"
            />
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, technologies: e.target.value }))
              }
              placeholder="React, Node.js, PostgreSQL"
              disabled={isLoading}
            />
          </div>

          {/* URLs */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, live_url: e.target.value }))
                }
                placeholder="https://example.com"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, github_url: e.target.value }))
                }
                placeholder="https://github.com/..."
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Display Order */}
          <div className="space-y-2">
            <Label htmlFor="display_order">Display order</Label>
            <Input
              id="display_order"
              type="number"
              value={formData.display_order}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  display_order: parseInt(e.target.value, 10) || 0,
                }))
              }
              disabled={isLoading}
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <Switch
                id="is_featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_featured: checked }))
                }
                disabled={isLoading}
              />
              <Label htmlFor="is_featured">Featured</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, is_published: checked }))
                }
                disabled={isLoading}
              />
              <Label htmlFor="is_published">Published</Label>
            </div>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" isLoading={isLoading}>
              {project ? 'Update project' : 'Create project'}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/projects">Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
