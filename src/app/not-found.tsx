import type { Metadata } from "next";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { SwissCross } from "@/components/brand/SwissCross";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-forest-900 px-6 py-32 text-center text-cream-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_40%_at_50%_50%,rgba(201,164,92,0.2),transparent_70%)]" />
      <SwissCross className="relative mb-10 size-10" />
      <p className="eyebrow relative text-cream-100/60">Error 404</p>
      <h1 className="display relative mt-6 max-w-[14ch] text-[clamp(3rem,9vw,8rem)]">
        This table <em className="text-brass">isn&apos;t set.</em>
      </h1>
      <p className="relative mt-6 max-w-[40ch] leading-relaxed text-cream-100/70">
        The page you were looking for has wandered off down Princess Street. Let&apos;s get you back to the good stuff.
      </p>
      <div className="relative mt-10 flex flex-wrap justify-center gap-3">
        <TransitionLink href="/" className="eyebrow rounded-full bg-cream-100 px-7 py-4 text-forest-900 transition-colors hover:bg-brass">
          Back home
        </TransitionLink>
        <TransitionLink href="/menu" className="eyebrow rounded-full border border-cream-100/25 px-7 py-4 transition-colors hover:border-cream-100">
          See the menu
        </TransitionLink>
      </div>
    </section>
  );
}
