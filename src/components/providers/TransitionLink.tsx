"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { usePageTransition } from "./PageTransition";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Drop-in <Link> that plays the curtain transition and handles in-page anchors smoothly. */
export function TransitionLink({ href, onClick, target, ...rest }: TransitionLinkProps) {
  const navigate = usePageTransition();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (!navigate || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || target === "_blank") return;
    e.preventDefault();
    navigate(href);
  };

  return <Link href={href} target={target} onClick={handleClick} {...rest} />;
}
