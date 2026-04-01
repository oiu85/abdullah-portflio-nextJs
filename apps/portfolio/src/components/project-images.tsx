'use client';

import { useState, useMemo, useEffect, useCallback, createContext, useContext } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageLightbox } from './image-lightbox';
import { cn, Button } from '@portfolio/ui';

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

function SingleProjectHeroImage({
  src,
  projectTitle,
  onOpen,
}: {
  src: string;
  projectTitle: string;
  onOpen: () => void;
}) {
  return (
    <div className="mb-8">
      <button
        type="button"
        className="glass-surface group relative aspect-video w-full overflow-hidden rounded-2xl text-left outline-none transition-[box-shadow,transform] hover:shadow-card-hover focus-visible:ring-2 focus-visible:ring-ring"
        onClick={onOpen}
        aria-label="Open image in fullscreen"
      >
        <Image
          src={src}
          alt={projectTitle}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <span className="glass-chip pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden />
          Fullscreen
        </span>
      </button>
    </div>
  );
}

const AUTO_SLIDE_MS = 2_000;

function ProjectImageSlider({
  allImages,
  projectTitle,
  onOpenLightbox,
}: {
  allImages: string[];
  projectTitle: string;
  onOpenLightbox: (index: number) => void;
}) {
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: AUTO_SLIDE_MS,
        playOnInit: true,
        // stopOnFocusIn + stopOnInteraction together can stop autoplay with no restart (slideFocusStart)
        stopOnFocusIn: false,
        // false: after drag/swipe, pointerUp restarts the timer (see embla-carousel-autoplay)
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    []
  );

  const emblaOptions = useMemo(
    () => ({
      loop: allImages.length > 1,
      align: 'start' as const,
      dragFree: false,
    }),
    [allImages.length]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions, [autoplayPlugin]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const plugin = emblaApi.plugins().autoplay as
      | { play: () => void; stop: () => void }
      | undefined;
    if (!plugin) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq.matches) plugin.stop();
      else plugin.play();
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  return (
    <div className="mb-8 space-y-4">
      <div
        className="glass-surface relative overflow-hidden rounded-2xl"
        role="region"
        aria-roledescription="carousel"
        aria-label={`${projectTitle} screenshots`}
      >
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div className="flex touch-pan-y">
            {allImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="relative min-w-0 shrink-0 grow-0 basis-full"
              >
                <button
                  type="button"
                  className="group relative aspect-video w-full cursor-zoom-in overflow-hidden bg-muted text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                  onClick={() => onOpenLightbox(index)}
                  aria-label={`View image ${index + 1} of ${allImages.length} in fullscreen`}
                >
                  <Image
                    src={src}
                    alt={`${projectTitle} — image ${index + 1} of ${allImages.length}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 896px"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  <span className="glass-chip pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden />
                    Fullscreen
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn(
            'glass-chip absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full transition-shadow hover:shadow-card-hover',
            !canPrev && 'pointer-events-none opacity-40'
          )}
          onClick={scrollPrev}
          disabled={!canPrev}
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="icon"
          className={cn(
            'glass-chip absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full transition-shadow hover:shadow-card-hover',
            !canNext && 'pointer-events-none opacity-40'
          )}
          onClick={scrollNext}
          disabled={!canNext}
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        <div
          className="glass-chip pointer-events-none absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground"
          aria-live="polite"
        >
          {selectedIndex + 1} / {allImages.length}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 px-1">
        {allImages.map((src, index) => (
          <button
            key={`dot-${src}-${index}`}
            type="button"
            onClick={() => scrollTo(index)}
            className={cn(
              'relative h-2 min-w-2 rounded-full transition-all duration-300',
              selectedIndex === index
                ? 'w-7 bg-foreground shadow-sm'
                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
            )}
            aria-label={`Go to image ${index + 1}`}
            aria-current={selectedIndex === index}
          />
        ))}
      </div>

      {allImages.length <= 12 && (
        <div className="flex gap-2 overflow-x-auto pb-1 pt-1 [scrollbar-width:thin]">
          {allImages.map((src, index) => (
            <button
              key={`thumb-${src}-${index}`}
              type="button"
              onClick={() => scrollTo(index)}
              className={cn(
                'relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                selectedIndex === index
                  ? 'border-primary shadow-md'
                  : 'border-transparent opacity-70 hover:opacity-100'
              )}
              aria-label={`Show image ${index + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectImageCarousel() {
  const context = useContext(ProjectImagesContext);
  if (!context) return null;

  const { openLightbox, allImages, projectTitle } = context;

  if (allImages.length === 0) return null;

  if (allImages.length === 1) {
    return (
      <SingleProjectHeroImage
        src={allImages[0]}
        projectTitle={projectTitle}
        onOpen={() => openLightbox(0)}
      />
    );
  }

  return (
    <ProjectImageSlider
      allImages={allImages}
      projectTitle={projectTitle}
      onOpenLightbox={openLightbox}
    />
  );
}

export function ProjectImages({
  featuredImage: _featuredImage,
  galleryImages: _galleryImages,
  projectTitle: _projectTitle,
  showGallery: _showGallery,
}: {
  featuredImage?: string | null;
  galleryImages?: string[] | null;
  projectTitle: string;
  /** @deprecated Gallery is merged into the hero carousel; ignored. */
  showGallery?: boolean;
}) {
  void _featuredImage;
  void _galleryImages;
  void _projectTitle;
  void _showGallery;
  return <ProjectImageCarousel />;
}

export { ProjectImagesProvider };
