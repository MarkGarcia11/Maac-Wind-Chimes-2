import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/data";
import CollectionBrowser from "@/components/CollectionBrowser";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Collection — Handmade Wind Chimes",
  description:
    "Browse the Maac Wind Chimes catalog: classic Chevys, Mustangs, Corvettes, Volkswagens, trucks, characters and more — each handmade in Nebraska, $25.00.",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const category = typeof sp.category === "string" ? sp.category : undefined;
  const sort = typeof sp.sort === "string" ? sp.sort : undefined;
  const q = typeof sp.q === "string" ? sp.q : undefined;
  const era = typeof sp.era === "string" ? sp.era : undefined;

  const [products, categories] = await Promise.all([
    getProducts({ category, sort, search: q, era }),
    getCategories(),
  ]);

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://maacwindchimes.com" },
      { "@type": "ListItem", position: 2, name: "Collection", item: "https://maacwindchimes.com/collection" },
    ],
  };

  const active = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-12 lg:px-10 lg:pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <nav aria-label="Breadcrumb" className="text-[13px] uppercase tracking-[0.18em] text-espresso-2/55">
        <Link href="/" className="hover:text-brass">Home</Link>
        <span aria-hidden className="mx-2">/</span>
        <span className="text-espresso-2">Collection</span>
        {active && (
          <>
            <span aria-hidden className="mx-2">/</span>
            <span className="text-brass">{active.name}</span>
          </>
        )}
      </nav>

      <header className="mt-8 max-w-2xl">
        <h1 className="font-display text-5xl leading-[1.02] text-espresso lg:text-7xl">
          {active ? active.name : (
            <>The <em className="italic text-brass">collection.</em></>
          )}
        </h1>
        <p className="mt-5 text-espresso-2/80">
          {active
            ? active.tagline
            : "Every chime below is handmade in our Elkhorn workshop — die-cast 1:40 scale cars on a 24\u2033 chime, $25.00 each. All chimes are unique and might be one-of-a-kind."}
        </p>
      </header>

      <CollectionBrowser
        products={products}
        categories={categories}
        activeCategory={category}
        activeSort={sort}
        activeEra={era}
        activeQuery={q}
      />
    </div>
  );
}
