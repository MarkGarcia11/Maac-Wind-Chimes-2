"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Phone, Trash2 } from "lucide-react";
import { useStore } from "@/components/store";
import { money, site } from "@/lib/site";
import { Reveal } from "@/components/motion";

export default function CartPage() {
  const { cart, setQty, remove, subtotal } = useStore();

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-28 pt-12 lg:px-10 lg:pt-16">
      <p className="eyebrow">Your cart</p>
      <h1 className="font-display mt-3 text-5xl text-espresso lg:text-6xl">
        The chimes you <em className="italic text-brass">chose.</em>
      </h1>

      {cart.length === 0 ? (
        <Reveal className="mt-16 text-center">
          <p className="font-display text-2xl text-espresso-2">It’s quiet in here.</p>
          <p className="mx-auto mt-3 max-w-md text-espresso-2/75">
            No chimes yet. The whole collection is waiting — and it sings.
          </p>
          <Link
            href="/collection"
            className="mt-8 inline-block bg-espresso px-10 py-4 text-[13px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brass"
          >
            Browse the collection
          </Link>
        </Reveal>
      ) : (
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
          <ul className="divide-y divide-hairline border-y border-hairline">
            {cart.map((item) => (
              <li key={item.slug} className="flex gap-5 py-6">
                <Link href={`/shop/${item.slug}`} className="h-24 w-24 shrink-0 overflow-hidden border border-hairline bg-linen">
                  <Image src={item.image} alt={item.name} width={96} height={96} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/shop/${item.slug}`} className="font-display text-2xl leading-tight text-espresso hover:text-brass">
                      {item.name}
                    </Link>
                    <button aria-label={`Remove ${item.name}`} onClick={() => remove(item.slug)} className="p-2 text-espresso-2/50 hover:text-rust">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="mt-1 text-[14px] text-espresso-2/65">{money(item.priceCents)} each</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center border border-hairline">
                      <button aria-label="Decrease quantity" className="min-h-11 min-w-11 p-2" onClick={() => setQty(item.slug, item.qty - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-7 text-center">{item.qty}</span>
                      <button aria-label="Increase quantity" className="min-h-11 min-w-11 p-2" onClick={() => setQty(item.slug, item.qty + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-lg">{money(item.priceCents * item.qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit border border-hairline bg-linen/60 p-7 lg:sticky lg:top-32">
            <h2 className="font-display text-2xl text-espresso">Summary</h2>
            <dl className="mt-5 space-y-2.5 text-[15px]">
              <div className="flex justify-between"><dt className="text-espresso-2/75">Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-espresso-2/75">Shipping (flat)</dt><dd>{money(site.shippingFlatCents)}</dd></div>
              <div className="flex justify-between border-t border-hairline pt-3 text-lg text-espresso">
                <dt>Total</dt><dd>{money(subtotal + site.shippingFlatCents)}</dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="mt-6 block bg-espresso py-4 text-center text-[13px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brass"
            >
              Checkout
            </Link>
            <a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 text-[14px] text-espresso-2 hover:text-brass">
              <Phone size={14} /> Prefer to order by phone?
            </a>
          </aside>
        </div>
      )}
    </div>
  );
}
