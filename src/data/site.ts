/**
 * Single source of truth for business details.
 * Everything here is reused by the UI, JSON-LD structured data, sitemap and metadata.
 * Details were gathered from public listings (Google, Tripadvisor, Swiggy Dineout) — please verify.
 */

export type DayHours =
  | { day: string; short: string; closed: true }
  | { day: string; short: string; closed?: false; opens: string; closes: string };

/** Indexed like `Date#getDay()` — 0 is Sunday. Times are 24h, Asia/Kolkata. A close earlier than open means "past midnight". */
export const HOURS: DayHours[] = [
  { day: "Sunday", short: "Sun", opens: "07:30", closes: "01:00" },
  { day: "Monday", short: "Mon", opens: "07:30", closes: "01:00" },
  { day: "Tuesday", short: "Tue", opens: "07:30", closes: "01:00" },
  { day: "Wednesday", short: "Wed", closed: true },
  { day: "Thursday", short: "Thu", opens: "07:30", closes: "01:00" },
  { day: "Friday", short: "Fri", opens: "07:30", closes: "01:00" },
  { day: "Saturday", short: "Sat", opens: "07:30", closes: "01:00" },
];

export const SITE = {
  name: "Club House",
  fullName: "Club House Fort Kochi",
  legalName: "Club House Café & Restaurant",
  tagline: "Where the glow meets the gathering",
  description:
    "Club House is a café & restaurant in a heritage house at the start of Princess Street, Fort Kochi — rotisserie chicken, smash burgers, butter croissants, French omelettes and great coffee from 7:30 AM till 1 AM.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.clubhousefortkochi.com").replace(/\/$/, ""),
  locale: "en_IN",
  phone: { display: "+91 94478 17715", href: "tel:+919447817715", e164: "+919447817715" },
  address: {
    building: "Kapithan House",
    street: "1/689 Princess Street",
    area: "Fort Nagar",
    locality: "Fort Kochi",
    city: "Kochi",
    region: "Kerala",
    postalCode: "682001",
    country: "IN",
    landmark: "Opposite Fort Kochi Park",
  },
  geoLabel: "9.96° N · 76.24° E",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Club+House+Restaurant%2C+Kapithan+House%2C+Princess+Street%2C+Fort+Kochi%2C+Kerala+682001",
  mapEmbedUrl:
    "https://www.google.com/maps?q=Club+House+Restaurant,+Kapithan+House,+Princess+Street,+Fort+Kochi,+Kerala+682001&output=embed",
  /** Paste the full profile URL (e.g. https://www.instagram.com/yourhandle/) to enable Instagram links. */
  instagramUrl: "",
  rating: { value: 4.7, count: 570, source: "Google" },
  costForTwo: 600,
  priceRange: "₹₹",
  cuisines: ["Continental", "Burgers", "Café", "Kerala"],
  lastUpdated: "2026-11-02",
} as const;

export const NAV_LINKS = [
  { label: "Menu", href: "/menu" },
  { label: "Signatures", href: "/#signatures" },
  { label: "The House", href: "/#the-house" },
  { label: "Visit", href: "/#visit" },
] as const;

export const fullAddress = `${SITE.address.building}, ${SITE.address.street}, ${SITE.address.area}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postalCode}`;
