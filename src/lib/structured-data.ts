import { HOURS, SITE } from "@/data/site";
import { MENU, lowestPrice } from "@/data/menu";

const url = SITE.url;
const RESTAURANT_ID = `${url}/#restaurant`;

function openingHours() {
  // Group days that share the same opening times into one specification.
  const groups = new Map<string, string[]>();
  for (const h of HOURS) {
    if (h.closed) continue;
    const key = `${h.opens}-${h.closes}`;
    groups.set(key, [...(groups.get(key) ?? []), h.day]);
  }
  return [...groups.entries()].map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: days.map((d) => `https://schema.org/${d}`), opens, closes };
  });
}

export function siteJsonLd() {
  const sameAs = SITE.instagramUrl ? [SITE.instagramUrl] : undefined;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Restaurant", "CafeOrCoffeeShop"],
        "@id": RESTAURANT_ID,
        name: SITE.name,
        alternateName: [SITE.fullName, SITE.legalName],
        slogan: SITE.tagline,
        description: SITE.description,
        url,
        telephone: SITE.phone.e164,
        image: [`${url}/opengraph-image.jpg`],
        logo: `${url}/icons/icon-512.png`,
        priceRange: SITE.priceRange,
        currenciesAccepted: "INR",
        servesCuisine: SITE.cuisines,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${SITE.address.building}, ${SITE.address.street}, ${SITE.address.area}`,
          addressLocality: SITE.address.locality,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        hasMap: SITE.mapsUrl,
        openingHoursSpecification: openingHours(),
        hasMenu: { "@id": `${url}/menu#menu` },
        ...(sameAs && { sameAs }),
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE.fullName,
        inLanguage: "en-IN",
        publisher: { "@id": RESTAURANT_ID },
      },
    ],
  };
}

export function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Menu",
        "@id": `${url}/menu#menu`,
        name: `${SITE.name} Menu`,
        url: `${url}/menu`,
        inLanguage: "en-IN",
        provider: { "@id": RESTAURANT_ID },
        hasMenuSection: MENU.map((category) => ({
          "@type": "MenuSection",
          name: category.title,
          description: category.description,
          hasMenuItem: category.items.map((item) => ({
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            offers: { "@type": "Offer", price: lowestPrice(item.price), priceCurrency: "INR" },
            ...(item.diet === "veg" && { suitableForDiet: "https://schema.org/VegetarianDiet" }),
          })),
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${url}/` },
          { "@type": "ListItem", position: 2, name: "Menu", item: `${url}/menu` },
        ],
      },
    ],
  };
}
