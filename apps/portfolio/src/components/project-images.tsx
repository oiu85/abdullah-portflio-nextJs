'use client';

import { useState, useMemo, createContext, useContext } from 'react';
import Image from 'next/image';
import { ImageLightbox } from './image-lightbox';
import { cn } from '@portfolio/ui';

interface ProjectImagesContextType {
  openLightbox: (index: number) => void;
  allImages: string[];
  projectTitle: string;
}

const ProjectImagesContext = createContext<ProjectImagesContextType | null>(null);

interface ProjectImagesProviderProps {
  featuredImage?: string | null;
  galleryImages?: string[] | null;
  projectTitle: string;
  children: React.ReactNode;
}

function ProjectImagesProvider({
  featuredImage,
  galleryImages,
  projectTitle,
  children,
}: ProjectImagesProviderProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Combine featured image and gallery images for lightbox
  const allImages = useMemo(() => {
    const images: string[] = [];
    if (featuredImage) {
      images.push(featuredImage);
    }
    if (galleryImages && galleryImages.length > 0) {
      images.push(...galleryImages);
    }
    return images;
  }, [featuredImage, galleryImages]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <ProjectImagesContext.Provider value={{ openLightbox, allImages, projectTitle }}>
      {children}
      {allImages.length > 0 && (
        <ImageLightbox
          images={allImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          alt={projectTitle}
        />
      )}
    </ProjectImagesContext.Provider>
  );
}

interface ProjectImagesProps {
  showGallery?: boolean;
}

function ProjectFeaturedImage({ featuredImage }: { featuredImage: string }) {
  const context = useContext(ProjectImagesContext);
  if (!context) return null;

  const { openLightbox } = context;

  return (
    <div
      className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-8 cursor-pointer group"
      onClick={() => openLightbox(0)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(0);
        }
      }}
      aria-label="Click to view full-size image"
    >
      <Image
        src={featuredImage}
        alt={context.projectTitle}
        fill
        className="object-cover transition-transform group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
          Click to view full size
        </div>
      </div>
    </div>
  );
}

function ProjectGallery({
  galleryImages,
  featuredImage,
}: {
  galleryImages: string[];
  featuredImage?: string | null;
}) {
  const context = useContext(ProjectImagesContext);
  if (!context) return null;

  const { openLightbox, projectTitle } = context;

  if (galleryImages.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {galleryImages.map((image, index) => {
          // Calculate the index in the combined array (featured + gallery)
          const imageIndex = featuredImage ? index + 1 : index;
          return (
            <div
              key={index}
              className="relative aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer group"
              onClick={() => openLightbox(imageIndex)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(imageIndex);
                }
              }}
              aria-label={`Click to view full-size image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${projectTitle} screenshot ${index + 1}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                  Click to view full size
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ProjectImages({
  featuredImage,
  galleryImages,
  projectTitle,
  showGallery = false,
}: {
  featuredImage?: string | null;
  galleryImages?: string[] | null;
  projectTitle: string;
  showGallery?: boolean;
}) {
  if (showGallery) {
    // This should be used inside ProjectImagesProvider
    if (!galleryImages || galleryImages.length === 0) return null;
    return <ProjectGallery galleryImages={galleryImages} featuredImage={featuredImage} />;
  }

  // This should be used inside ProjectImagesProvider
  if (!featuredImage) return null;
  return <ProjectFeaturedImage featuredImage={featuredImage} />;
}

export { ProjectImagesProvider };

