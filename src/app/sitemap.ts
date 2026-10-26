import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data";

const BASE = "https://maacwindchimes.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productUrls: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({ limit: 500 });
    productUrls = products.map((p) => ({
      url: `${BASE}/shop/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    /* db not reachable at build time */
  }
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/collection`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/custom`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/our-story`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/events`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/faq`, changeFrequency: "yearly", priority: 0.5 },
    ...productUrls,
  ];
}
