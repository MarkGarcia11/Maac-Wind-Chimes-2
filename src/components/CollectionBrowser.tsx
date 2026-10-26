"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { EASE, DUR } from "@/lib/motion";
import type { Product, Category } from "@/lib/data";

const ERAS = ["1930s", "1950s", "1960s", "2000s", "Storybook", "Game Day", "Anytime"];

export default function CollectionBrowser({
  products,
  categories,
  activeCategory,
  activeSort,
  activeEra,
  activeQuery,
}: {
  products: Product[];
  categories: Category[];
  activeCategory?: string;
  activeSort?: string;
  activeEra?: string;
  activeQuery?: string;
}) {
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);
  const [visible, setVisible] = useState(12);
  const [q, setQ] = useState(activeQuery ?? "");

  const url = useMemo(() => {
    return (patch: Record<string, string | undefined>) => {
      const p = new URLSearchParams();
      const merged: Record<string, string | undefined> = {
        category: activeCategory,
        sort: activeSort,
        era: activeEra,
        q: activeQuery,
        ...patch,
      };
      for (const [k, v] of Object.entries(merged)) if (v) p.set(k, v);
      const s = p.toString();
      return `/collection${s ? `?${s}` : ""}`;
    };
  }, [activeCategory, activeSort, activeEra, activeQuery]);

  const chips = [
    activeCategory && { label: categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory, clear: url({ category: undefined }) },
    activeEra && { label: activeEra, clear: url({ era: undefined }) },
    activeQuery && { label: `“${activeQuery}”`, clear: url({ q: undefined }) },
  ].filter(Boolean) as { label: string; clear: string }[];

  const show = products.slice(0, visible);

  return (
    <>
      {/* filter bar */}
      <div className="mt-10 flex flex-wrap items-center gap-3 border-y border-hairline py-4">
        <button
          onClick={() => setDrawer(true)}
          className="flex min-h-12 items-center gap-2 border border-espresso px-5 text-[12px] uppercase tracking-[0.2em] text-espresso hover:bg-espresso hover:text-ivory"
        >
          <SlidersHorizontal size={15} /> Filter & Sort
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(url({ q: q || undefined }));
          }}
          className="flex min-h-12 flex-1 items-center gap-2 border border-hairline bg-white/60 px-4 sm:max-w-xs"
        >
          <Search size={15} className="shrink-0 text-espresso-2/50" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search chimes…"
            aria-label="Search chimes"
            className="w-full bg-transparent py-2 text-[15px] focus:outline-none"
          />
        </form>
        <p className="ml-auto text-[13px] uppercase tracking-[0.16em] text-espresso-2/60" aria-live="polite">
          {products.length} {products.length === 1 ? "chime" : "chimes"}
        </p>
      </div>

      {/* active filter chips */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2" aria-label="Active filters">
          {chips.map((c) => (
            <button
              key={c.label}
              onClick={() => router.push(c.clear)}
              className="flex min-h-11 items-center gap-2 border border-brass/50 bg-brass/10 px-4 text-[13px] text-espresso-2"
            >
              {c.label} <X size={13} />
            </button>
          ))}
          <button onClick={() => router.push("/collection")} className="min-h-11 px-3 text-[13px] text-rust underline">
            Clear all
          </button>
        </div>
      )}

      {/* grid */}
      {show.length ? (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {show.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <p className="font-display text-3xl text-espresso">Nothing on that shelf yet.</p>
          <p className="mx-auto mt-3 max-w-md text-espresso-2/75">
            We’ve made about 390 designs over the years and are still photographing them all.{" "}
            <a href="/custom" className="text-brass underline">Ask us to make yours</a>.
          </p>
        </div>
      )}

      {visible < products.length && (
        <div className="mt-16 text-center">
          <button
            onClick={() => setVisible((v) => v + 12)}
            className="min-h-14 border border-espresso px-12 text-[13px] uppercase tracking-[0.25em] text-espresso transition-colors hover:bg-espresso hover:text-ivory"
          >
            Show more ({products.length - visible} remaining)
          </button>
        </div>
      )}

      {/* filter drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-espresso/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-[90] w-full max-w-sm overflow-y-auto bg-ivory p-7"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: DUR.med, ease: EASE }}
              aria-label="Filters"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl">Filter & sort</h2>
                <button aria-label="Close filters" onClick={() => setDrawer(false)} className="p-3">
                  <X size={20} />
                </button>
              </div>

              <h3 className="eyebrow mt-8">Memory</h3>
              <ul className="mt-3 space-y-1">
                <li>
                  <button
                    onClick={() => { router.push(url({ category: undefined })); setDrawer(false); }}
                    className={`block w-full px-2 py-2.5 text-left text-[16px] min-h-11 ${!activeCategory ? "text-brass" : "text-espresso-2"}`}
                  >
                    All memories
                  </button>
                </li>
                {categories.map((c) => (
                  <li key={c.slug}>
                    <button
                      onClick={() => { router.push(url({ category: c.slug })); setDrawer(false); }}
                      className={`block w-full px-2 py-2.5 text-left text-[16px] min-h-11 ${activeCategory === c.slug ? "text-brass" : "text-espresso-2 hover:text-espresso"}`}
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>

              <h3 className="eyebrow mt-8">Era</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {ERAS.map((e) => (
                  <button
                    key={e}
                    onClick={() => { router.push(url({ era: activeEra === e ? undefined : e })); setDrawer(false); }}
                    aria-pressed={activeEra === e}
                    className={`min-h-11 border px-4 text-[14px] ${activeEra === e ? "border-brass bg-brass/10 text-espresso" : "border-hairline text-espresso-2"}`}
                  >
                    {e}
                  </button>
                ))}
              </div>

              <h3 className="eyebrow mt-8">Sort by</h3>
              <ul className="mt-3 space-y-1">
                {[
                  ["", "Our order"],
                  ["name", "Name, A to Z"],
                  ["price-asc", "Price, low to high"],
                  ["price-desc", "Price, high to low"],
                ].map(([v, label]) => (
                  <li key={v || "default"}>
                    <button
                      onClick={() => { router.push(url({ sort: v || undefined })); setDrawer(false); }}
                      className={`block w-full px-2 py-2.5 text-left text-[16px] min-h-11 ${(activeSort ?? "") === v ? "text-brass" : "text-espresso-2"}`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
