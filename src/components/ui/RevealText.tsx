"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";

type RevealTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  /** ScrollTrigger start position. */
  start?: string;
};

/** Line-by-line masked reveal on scroll. Children must be static text (inline elements like <em> are fine). */
export function RevealText({ as: Tag = "p", children, className, id, delay = 0, start = "top 88%" }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const el = ref.current!;
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 115,
              duration: 1.2,
              ease: "expo.out",
              stagger: 0.09,
              delay,
              scrollTrigger: { trigger: el, start, once: true },
            }),
        });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
