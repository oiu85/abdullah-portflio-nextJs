'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

/** Static composite: portrait + “Contact me” (see `public/images/`). */
export const CONTACT_HERO_IMAGE = '/images/my_iamge_coantact_me.png';

type ContactHeroImageProps = {
  src: string;
  alt: string;
};

/**
 * Contact page hero art — subtle scroll parallax + existing float class.
 */
export function ContactHeroImage({ src, alt }: ContactHeroImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduceMotion ? 0 : -28]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="contact-hero-float pointer-events-none w-full max-w-[min(100%,420px)] select-none lg:max-w-[min(420px,44vw)]"
    >
      <Image
        src={src}
        alt={alt}
        width={960}
        height={540}
        className="h-auto w-full object-contain drop-shadow-2xl"
        sizes="(max-width: 1024px) 92vw, 420px"
        priority
      />
    </motion.div>
  );
}
