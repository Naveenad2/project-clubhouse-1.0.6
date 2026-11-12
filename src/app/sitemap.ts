import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { photos } from "@/data/images";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITE.lastUpdated);
  return [
    {
      url: `${SITE.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE.url}/opengraph-image.jpg`],
    },
    {
      url: `${SITE.url}/menu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [photos.rotisserieChicken, photos.heroBurger, photos.croissant].map((p) => `${SITE.url}${p.src.src}`),
    },
  ];
}
