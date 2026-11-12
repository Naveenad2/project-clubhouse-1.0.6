import { NAV_LINKS, SITE } from "@/data/site";
import { Logo } from "@/components/brand/Logo";
import { SwissCross } from "@/components/brand/SwissCross";
import { TransitionLink } from "@/components/providers/TransitionLink";
import { Magnetic } from "@/components/ui/Magnetic";
import { BackToTop, CurrentYear, FooterReveal, HoursList, KochiClock } from "./FooterClient";

export function Footer() {
  return (
    <footer className="relative bg-ink text-cream-100" aria-labelledby="footer-title">
      <FooterReveal>
        <div className="mx-auto max-w-[1680px] px-5 pt-24 sm:px-8 lg:px-12 lg:pt-32">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="footer-title" className="display max-w-[12ch] text-[clamp(3rem,9vw,8.5rem)]">
              Pull up a <em className="text-brass">chair.</em>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <a href={SITE.phone.href} className="eyebrow inline-flex items-center gap-3 rounded-full bg-cream-100 px-7 py-5 text-forest-900 transition-colors hover:bg-brass">
                  Call {SITE.phone.display}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-flex items-center gap-3 rounded-full border border-cream-100/25 px-7 py-5 transition-colors hover:border-cream-100"
                >
                  Get directions ↗
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="mt-20 grid gap-12 border-t border-cream-100/10 pt-12 text-[0.95rem] sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow mb-4 text-cream-100/45">Find us</p>
              <address className="not-italic leading-relaxed text-cream-100/80">
                {SITE.address.building}
                <br />
                {SITE.address.street}, {SITE.address.area}
                <br />
                {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                <br />
                <span className="text-cream-100/50">{SITE.address.landmark}</span>
              </address>
            </div>
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4 text-cream-100/45">Hours</p>
              <HoursList className="max-w-sm text-cream-100/80" />
            </div>
            <div className="lg:col-span-2">
              <p className="eyebrow mb-4 text-cream-100/45">Explore</p>
              <ul className="space-y-2 text-cream-100/80">
                {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((l) => (
                  <li key={l.href}>
                    <TransitionLink href={l.href} className="transition-colors hover:text-brass">
                      {l.label}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-3">
              <p className="eyebrow mb-4 text-cream-100/45">Say hello</p>
              <ul className="space-y-2 text-cream-100/80">
                <li>
                  <a href={SITE.phone.href} className="transition-colors hover:text-brass">
                    {SITE.phone.display}
                  </a>
                </li>
                {SITE.instagramUrl && (
                  <li>
                    <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brass">
                      Instagram ↗
                    </a>
                  </li>
                )}
                <li>
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-brass">
                    Google Maps ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1680px] overflow-hidden px-5 pt-20 sm:px-8 lg:px-12">
          <div data-footer-word className="mx-auto w-full max-w-[1040px] text-cream-100">
            <Logo className="h-auto w-full" showPlace={false} decorative />
          </div>
        </div>

        <div className="mx-auto flex max-w-[1680px] flex-col gap-6 px-5 py-8 text-xs text-cream-100/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p className="flex items-center gap-2">
            <SwissCross className="size-3" />
            © <CurrentYear fallback={SITE.lastUpdated.slice(0, 4)} /> {SITE.legalName}. All rights reserved.
          </p>
          <p className="eyebrow text-[0.625rem]">
            <KochiClock />
          </p>
          <BackToTop />
        </div>
      </FooterReveal>
    </footer>
  );
}
