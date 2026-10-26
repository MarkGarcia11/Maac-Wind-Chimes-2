import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getRelated, getReviews } from "@/lib/data";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";
import { Reveal, WaveDivider } from "@/components/motion";
import { money, site } from "@/lib/site";
import { Star, Truck, Ruler, CarFront } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return { title: "Chime not found" };
  return {
    title: `${p.name} Wind Chime`,
    description: `${p.name} — $${(p.priceCents / 100).toFixed(2)}. Handmade collectible wind chime from Elkhorn, Nebraska. ${p.specs}`,
    openGraph: { images: [p.image] },
  };
}

const AVAIL: Record<string, { label: string; tone: string }> = {
  in_stock: { label: "In stock, ready to ship", tone: "text-sage" },
  made_to_order: { label: "Made to order — give us about a week", tone: "text-rust" },
  call: { label: `Call for availability — ${site.phoneDisplay}`, tone: "text-brass" },
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const [related, reviews] = await Promise.all([getRelated(p), getReviews(p.slug)]);
  const avail = AVAIL[p.availability] ?? AVAIL.in_stock;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} Wind Chime`,
    sku: p.sku,
    image: p.image,
    description: p.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      price: (p.priceCents / 100).toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://maacwindchimes.com" },
      { "@type": "ListItem", position: 2, name: "Collection", item: "https://maacwindchimes.com/collection" },
      { "@type": "ListItem", position: 3, name: p.category.replace(/-/g, " "), item: `https://maacwindchimes.com/collection?category=${p.category}` },
      { "@type": "ListItem", position: 4, name: p.name },
    ],
  };

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-10 lg:px-10 lg:pt-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <nav aria-label="Breadcrumb" className="text-[13px] uppercase tracking-[0.18em] text-espresso-2/55">
        <Link href="/" className="hover:text-brass">Home</Link>
        <span aria-hidden className="mx-2">/</span>
        <Link href="/collection" className="hover:text-brass">Collection</Link>
        <span aria-hidden className="mx-2">/</span>
        <Link href={`/collection?category=${p.category}`} className="capitalize hover:text-brass">
          {p.category.replace(/-/g, " ")}
        </Link>
        <span aria-hidden className="mx-2">/</span>
        <span className="text-espresso-2">{p.name}</span>
      </nav>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* gallery */}
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <div className="card-zoom relative overflow-hidden border border-hairline bg-linen">
              <Image
                src={p.image}
                alt={p.imageAlt || `${p.name} — handmade Maac wind chime`}
                width={1000}
                height={1000}
                priority
                className="aspect-square w-full cursor-zoom-in object-cover transition-transform duration-[1200ms] hover:scale-110"
              />
            </div>
            <p className="mt-3 text-center text-[13px] text-espresso-2/55">
              Photographed at the workshop — colors may vary; each chime is unique.
            </p>
          </div>
        </Reveal>

        {/* details */}
        <div>
          <Reveal>
            <p className="eyebrow">{p.category.replace(/-/g, " ")} · {p.era}</p>
            <h1 className="font-display mt-3 text-5xl leading-[1.02] text-espresso lg:text-6xl">{p.name}</h1>
            <p className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl text-espresso">{money(p.priceCents)}</span>
              <span className="text-[14px] text-espresso-2/65">+ {money(site.shippingFlatCents)} shipping</span>
            </p>
            <p className={`mt-3 text-[14px] uppercase tracking-[0.16em] ${avail.tone}`}>{avail.label}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg leading-relaxed text-espresso-2/90">{p.description}</p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-7 space-y-3 border-y border-hairline py-6 text-[15px] text-espresso-2">
              <li className="flex items-center gap-3">
                <CarFront size={17} className="shrink-0 text-brass" />
                Cars are die cast, 1:40th scale
              </li>
              <li className="flex items-center gap-3">
                <Ruler size={17} className="shrink-0 text-brass" />
                Chime is 24&#8243; long — hang with room to sway
              </li>
              <li className="flex items-center gap-3">
                <Truck size={17} className="shrink-0 text-brass" />
                Ships flat-rate {money(site.shippingFlatCents)} within the US
              </li>
            </ul>
            <p className="mt-4 text-[13px] uppercase tracking-[0.16em] text-espresso-2/55">SKU {p.sku} · Handmade in Elkhorn, NE</p>
          </Reveal>

          <Reveal delay={0.26}>
            <ProductActions
              product={{
                slug: p.slug,
                name: p.name,
                priceCents: p.priceCents,
                image: p.image,
                availability: p.availability,
              }}
            />
          </Reveal>

          {/* FAQ accordion */}
          <Reveal delay={0.3}>
            <div className="mt-12 space-y-0 border-t border-hairline">
              {[
                {
                  q: "How do I hang and care for it?",
                  a: "Hang it from a hook where it can swing freely — a porch beam or shepherd's hook is perfect. Bring it inside in truly brutal weather and give the cars an occasional dusting.",
                },
                {
                  q: "When will it ship?",
                  a: "In-stock chimes usually ship within 2–3 days. Made-to-order pieces take about a week. We pack them carefully — the cars ride in their own little box.",
                },
                {
                  q: "Can I return it?",
                  a: `Yes. If it isn't right, call us at ${site.phoneDisplay} within 30 days and we'll make it right — exchange, repair, or refund.`,
                },
              ].map((f) => (
                <details key={f.q} className="group border-b border-hairline py-5">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-espresso [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="text-brass transition-transform duration-300 group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-2 pr-8 text-[15px] leading-relaxed text-espresso-2/85">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* reviews */}
      {reviews.length > 0 && (
        <section aria-labelledby="reviews" className="mt-24 border-t border-hairline pt-16">
          <h2 id="reviews" className="font-display text-4xl text-espresso">Kind words</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {reviews.map((r) => (
              <figure key={r.id} className="border border-hairline bg-linen/60 p-7">
                <div className="flex gap-1 text-brass" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                <blockquote className="font-display mt-4 text-xl leading-snug text-espresso">
                  “{r.text.replace(/^Placeholder review — /, "")}”
                </blockquote>
                <figcaption className="mt-4 text-[13px] uppercase tracking-[0.16em] text-espresso-2/60">
                  {r.author}{r.location ? ` · ${r.location}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-espresso-2/50">[placeholder reviews — real customer stories coming soon]</p>
        </section>
      )}

      <WaveDivider className="mt-20 opacity-60" />

      {/* related */}
      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="related" className="font-display text-4xl text-espresso lg:text-5xl">
              Complete the collection
            </h2>
            <Link href="/collection" className="btn-line text-[13px] uppercase tracking-[0.2em] text-espresso-2">
              View all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
            {related.map((r, i) => (
              <ProductCard key={r.slug} product={r} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
