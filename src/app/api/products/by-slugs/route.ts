import { NextResponse } from "next/server";
import { getProducts } from "@/lib/data";

/** Look up minimal product data for a list of slugs (wishlist hydration). */
export async function POST(req: Request) {
  try {
    const { slugs } = await req.json();
    if (!Array.isArray(slugs)) return NextResponse.json({ products: [] });
    const all = await getProducts({ limit: 500 });
    const wanted = new Set(slugs.map((s: unknown) => String(s)));
    const products = all
      .filter((p) => wanted.has(p.slug))
      .map((p) => ({ slug: p.slug, name: p.name, priceCents: p.priceCents, image: p.image }));
    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ products: [] });
  }
}
