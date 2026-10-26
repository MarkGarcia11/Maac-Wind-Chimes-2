"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart, Share2, Trash2, Check, ShoppingBag } from "lucide-react";
import { useStore } from "@/components/store";
import { Reveal } from "@/components/motion";

/**
 * Saved list — persists locally, and can be shared as a simple link that
 * pre-fills the other person's cart link list on this same device family.
 */
export default function WishlistPage() {
  const { wishlist, toggleWish, add, chime } = useStore();
  const [copied, setCopied] = useState(false);

  // product data is looked up client-side from a small manifest fetched once
  const [items, setItems] = useState<{ slug: string; name: string; priceCents: number; image: string }[] | null>(null);
  useEffect(() => {
    if (!wishlist.length) {
      setItems([]);
      return;
    }
    let alive = true;
    fetch("/api/products/by-slugs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slugs: wishlist }),
    })
      .then((r) => r.json())
      .then((d) => alive && setItems(d.products ?? []))
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, [wishlist]);

  const share = async () => {
    const url = `${window.location.origin}/search?q=${encodeURIComponent(wishlist.join(" "))}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-28 pt-14 lg:px-10 lg:pt-20">
      <p className="eyebrow">Saved for later</p>
      <h1 className="font-display mt-3 text-5xl text-espresso lg:text-6xl">
        Our <em className="italic text-brass">list.</em>
      </h1>
      <p className="mt-4 max-w-xl text-espresso-2/80">
        Couples decide together — that’s the point of this page. Save chimes here, then
        share the link with the person you’re choosing with.
      </p>

      {wishlist.length > 0 && (
        <button
          onClick={share}
          className="mt-8 flex min-h-12 items-center gap-2 border border-espresso px-6 text-[12px] uppercase tracking-[0.2em] text-espresso hover:bg-espresso hover:text-ivory"
        >
          {copied ? <Check size={15} className="text-sage" /> : <Share2 size={15} />}
          {copied ? "Link copied — text it over" : "Share this list"}
        </button>
      )}

      {wishlist.length === 0 ? (
        <Reveal className="mt-16 text-center">
          <Heart size={28} className="mx-auto text-brass/60" />
          <p className="font-display mt-5 text-3xl text-espresso">Nothing saved yet.</p>
          <p className="mx-auto mt-3 max-w-md text-espresso-2/75">
            Tap the heart on any chime and it will wait for you here — no account needed.
          </p>
          <Link href="/collection" className="mt-8 inline-block bg-espresso px-10 py-4 text-[13px] uppercase tracking-[0.25em] text-ivory hover:bg-brass">
            Find one to love
          </Link>
        </Reveal>
      ) : (
        <ul className="mt-12 divide-y divide-hairline border-y border-hairline">
          {(items ?? []).filter((i) => wishlist.includes(i.slug)).map((item) => (
            <li key={item.slug} className="flex flex-wrap items-center gap-5 py-5">
              <Link href={`/shop/${item.slug}`} className="h-20 w-20 shrink-0 overflow-hidden border border-hairline bg-linen">
                <Image src={item.image} alt={item.name} width={80} height={80} className="h-full w-full object-cover" />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/shop/${item.slug}`} className="font-display text-2xl leading-tight text-espresso hover:text-brass">
                  {item.name}
                </Link>
                <p className="text-[15px] text-espresso-2/70">${(item.priceCents / 100).toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { add(item); chime(); }}
                  className="flex min-h-12 items-center gap-2 border border-espresso px-5 text-[12px] uppercase tracking-[0.16em] text-espresso hover:bg-espresso hover:text-ivory"
                >
                  <ShoppingBag size={15} /> Add to cart
                </button>
                <button
                  aria-label={`Remove ${item.name} from saved list`}
                  onClick={() => toggleWish(item.slug)}
                  className="min-h-12 min-w-12 p-3 text-espresso-2/50 hover:text-rust"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
