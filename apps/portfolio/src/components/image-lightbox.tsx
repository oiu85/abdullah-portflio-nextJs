'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@portfolio/ui';
import { Button } from '@portfolio/ui';
import { cn } from '@portfolio/ui';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { motionDuration, motionEase } from '@/lib/motion';

interface ImageLightboxProps {
  images: string[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  alt?: string;
}

export function ImageLightbox({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  alt = 'Image',
}: ImageLightboxProps) {
  const reduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-h-[95vh] w-full max-w-7xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden [&>div]:bg-black/88 [&>div]:backdrop-blur-md"
        onInteractOutside={onClose}
      >
        <DialogTitle className="sr-only">
          Image Lightbox - {alt} {currentIndex + 1} of {images.length}
        </DialogTitle>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: motionDuration.sm,
            ease: motionEase.out,
          }}
          className="relative flex h-full w-full items-center justify-center"
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-50 rounded-full border border-border/40 bg-background/85 text-foreground shadow-card backdrop-blur-md transition-shadow hover:bg-background hover:shadow-card-hover"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </Button>

          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-border/40 bg-background/85 text-foreground shadow-card backdrop-blur-md hover:bg-background hover:shadow-card-hover"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full border border-border/40 bg-background/85 text-foreground shadow-card backdrop-blur-md hover:bg-background hover:shadow-card-hover"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          <div className="relative flex h-full max-h-[95vh] w-full max-w-7xl items-center justify-center p-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{
                  duration: motionDuration.xs,
                  ease: motionEase.out,
                }}
                className="relative h-full min-h-[40vh] w-full"
              >
                <Image
                  src={currentImage}
                  alt={`${alt} ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-border/40 bg-background/85 px-4 py-2 text-sm text-foreground shadow-card backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {images.length > 1 && images.length <= 10 && (
            <div className="absolute bottom-16 left-1/2 z-50 flex max-w-full -translate-x-1/2 gap-2 overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                    currentIndex === index
                      ? 'scale-110 border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
