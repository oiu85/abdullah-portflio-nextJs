import Image from 'next/image';

/** Static composite: portrait + “Contact me” (see `public/images/`). */
export const CONTACT_HERO_IMAGE = '/images/my_iamge_coantact_me.png';

type ContactHeroImageProps = {
  src: string;
  alt: string;
};

/**
 * Contact page hero art only — no panel/border; sits beside the title on large screens.
 */
export function ContactHeroImage({ src, alt }: ContactHeroImageProps) {
  return (
    <div className="pointer-events-none w-full max-w-[min(100%,420px)] select-none lg:max-w-[min(420px,44vw)]">
      <Image
        src={src}
        alt={alt}
        width={960}
        height={540}
        className="h-auto w-full object-contain drop-shadow-2xl"
        sizes="(max-width: 1024px) 92vw, 420px"
        priority
      />
    </div>
  );
}
