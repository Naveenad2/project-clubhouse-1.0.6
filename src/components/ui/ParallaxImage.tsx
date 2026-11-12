"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Photo } from "@/data/images";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  photo: Photo;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Travel in % of the image height (keep ≤ 11 — the image is over-scanned by 15%). */
  speed?: number;
  preload?: boolean;
  cursor?: string;
};

export function ParallaxImage({ photo, sizes, className, imageClassName, speed = 9, preload, cursor }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-parallax-inner]",
          { yPercent: -speed },
          { yPercent: speed, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden bg-forest-800", className)} data-cursor={cursor}>
      <div data-parallax-inner className="absolute inset-x-0 -inset-y-[15%] will-change-transform">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={preload}
          quality={70}
          className={cn("object-cover", imageClassName)}
        />
      </div>
    </div>
  );
}
