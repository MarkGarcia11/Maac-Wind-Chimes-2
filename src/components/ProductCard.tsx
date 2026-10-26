"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Eye, Bell } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/components/store";
import { money } from "@/lib/site";
import { Tilt } from "@/components/motion";
import type { Product } from "@/lib/data";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWish, wished, add, chime } = useStore();
  const [added, setAdded] = useState(false);
  const reduce = useReducedMotion();
  const isWished = wished(product.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduce ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 }}
      className="group"
    >
      <Tilt>
        <div className="relative overflow-hidden border border-hairline bg-linen">
          <Link href={`/shop/${product.slug}`} aria-label={`View ${product.name}`} className="card-zoom block">
            <Image
              src={product.image}
              alt={product.imageAlt || `${product.name} handmade wind chime`}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
              loading="lazy"
            />
          </Link>

          {product.availability === "made_to_order" && (
            <span className="absolute left-3 top-3 bg-rust px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-ivory">
              Made to order
            </span>
          )}

          <button
            aria-label={isWished ? `Remove ${product.name} from your saved list` : `Save ${product.name} to your list`}
            onClick={() => toggleWish(product.slug)}
            className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-ivory/90 text-espresso-2 shadow-sm transition-colors hover:text-rust"
          >
            <Heart size={17} fill={isWished ? "currentColor" : "none"} className={isWished ? "text-rust" : ""} />
          </button>

          {/* quick actions slide up */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ivory/95 backdrop-blur-sm transition-transform duration-500 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
            <div className="flex">
              <Link
                href={`/shop/${product.slug}`}
                className="pointer-events-auto flex min-h-12 flex-1 items-center justify-center gap-2 text-[13px] uppercase tracking-[0.18em] text-espresso-2 hover:text-brass"
              >
                <Eye size={15} /> Quick view
              </Link>
              <button
                onClick={() => {
                  add({ slug: product.slug, name: product.name, priceCents: product.priceCents, image: product.image });
                  chime();
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1500);
                }}
                className="pointer-events-auto flex min-h-12 flex-1 items-center justify-center gap-2 border-l border-hairline text-[13px] uppercase tracking-[0.18em] text-espresso-2 hover:text-brass"
              >
                {added ? (
                  <motion.span initial={{ scale: 0.6 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-brass">
                    <Bell size={15} /> Added
                  </motion.span>
                ) : (
                  "Add to cart"
                )}
              </button>
            </div>
          </div>
        </div>
      </Tilt>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <Link href={`/shop/${product.slug}`} className="btn-line">
            <h3 className="font-display text-[21px] leading-tight text-espresso">{product.name}</h3>
          </Link>
          <p className="mt-0.5 text-[13px] uppercase tracking-[0.15em] text-espresso-2/60">SKU {product.sku}</p>
        </div>
        <p className="pt-0.5 text-[17px] text-espresso-2">{money(product.priceCents)}</p>
      </div>
    </motion.article>
  );
}
