import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search the Collection",
  description: "Search handmade Maac wind chimes by car, team, character, or memory.",
};

async function Results({ q }: { q: string }) {
  const products = q ? await getProducts({ search: q }) : [];
  return (
    <section aria-live="polite" className="mt-12">
      <p className="text-[13px] uppercase tracking-[0.2em] text-espresso-2/60">
        {q ? `${products.length} ${products.length === 1 ? "result" : "results"} for “${q}”` : "Type something above to begin"}
      </p>
      {products.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {products.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
      {q && products.length === 0 && (
        <p className="mt-8 max-w-md text-espresso-2/75">
          Nothing matched — but we’ve made about 390 designs, so it may just not be photographed
          yet. <a href="/custom" className="text-brass underline">Ask us</a> — odds are good.
        </p>
      )}
    </section>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-28 pt-14 lg:px-10 lg:pt-20">
      <p className="eyebrow">Search</p>
      <h1 className="font-display mt-3 text-5xl text-espresso lg:text-7xl">
        What do you <em className="italic text-brass">remember?</em>
      </h1>
      <form action="/search" className="mt-10 flex max-w-2xl border-b-2 border-espresso">
        <input
          name="q"
          defaultValue={q ?? ""}
          placeholder="“1957 Chevy”, “Corvette”, “Dalmatians”…"
          aria-label="Search the collection"
          className="font-display w-full bg-transparent py-4 text-2xl text-espresso placeholder:text-espresso/30 focus:outline-none"
        />
        <button className="px-4 text-[12px] uppercase tracking-[0.22em] text-brass">Search</button>
      </form>
      <Suspense>
        <Results q={q ?? ""} />
      </Suspense>
    </div>
  );
}
