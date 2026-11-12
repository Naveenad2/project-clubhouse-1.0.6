import { SITE } from "@/data/site";
import { SwissCross } from "@/components/brand/SwissCross";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";
import { OpenStatus } from "@/components/layout/OpenStatus";
import { HoursList } from "@/components/layout/FooterClient";

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative bg-cream-100 py-24 text-forest-900 lg:py-40">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-12">
        <div className="mb-14 flex items-center justify-between gap-6 border-b border-forest-900/15 pb-5 lg:mb-20">
          <p className="eyebrow flex items-center gap-3">
            <SwissCross className="size-3.5" /> (06) Visit
          </p>
          <OpenStatus className="eyebrow text-forest-900/70" />
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <RevealText as="h2" id="visit-title" className="display text-[clamp(3rem,7vw,8rem)]">
              Come as <em className="text-forest-600">you are.</em>
            </RevealText>

            <div className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="eyebrow mb-4 text-forest-900/50">Address</h3>
                <address className="not-italic text-lg leading-relaxed">
                  {SITE.address.building}
                  <br />
                  {SITE.address.street}, {SITE.address.area}
                  <br />
                  {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
                </address>
                <p className="mt-3 text-sm text-forest-900/60">{SITE.address.landmark}, at the start of Princess Street.</p>
              </div>
              <div>
                <h3 className="eyebrow mb-4 text-forest-900/50">Opening hours</h3>
                <HoursList className="text-[0.95rem]" todayClassName="font-semibold text-forest-600" />
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
              <Magnetic>
                <a
                  href={SITE.phone.href}
                  className="eyebrow inline-flex items-center gap-3 rounded-full bg-forest-900 px-7 py-5 text-cream-100 transition-colors hover:bg-forest-700"
                >
                  Call to book · {SITE.phone.display}
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow inline-flex items-center gap-3 rounded-full border border-forest-900/25 px-7 py-5 transition-colors hover:border-forest-900"
                >
                  Open in Google Maps ↗
                </a>
              </Magnetic>
            </div>
            <p className="mt-6 text-sm text-forest-900/55">
              Around ₹{SITE.costForTwo} for two · {SITE.cuisines.slice(0, 3).join(", ")}
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full border border-forest-900/15 bg-cream-200 shadow-[0_50px_100px_-40px_rgba(20,34,26,0.45)]">
              {/* shown until the lazy map paints over it */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center text-forest-900/60" aria-hidden="true">
                <SwissCross className="size-8" />
                <p className="eyebrow">{SITE.address.street}</p>
              </div>
              <iframe
                title="Map showing Club House on Princess Street, Fort Kochi"
                src={SITE.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-tint absolute inset-0 size-full border-0"
              />
              <div className="pointer-events-none absolute inset-0 rounded-t-full ring-[10px] ring-inset ring-cream-100/60" aria-hidden="true" />
            </div>
            <p className="mt-5 text-center font-hand text-2xl text-forest-700">look for the arches &amp; the red cross</p>
          </div>
        </div>
      </div>
    </section>
  );
}
