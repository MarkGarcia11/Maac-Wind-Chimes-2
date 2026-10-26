"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Phone } from "lucide-react";
import { useStore } from "@/components/store";
import { money, site } from "@/lib/site";
import { EASE, DUR } from "@/lib/motion";

export default function MiniCart() {
  const { cart, cartOpen, setCartOpen, setQty, remove, subtotal } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-espresso/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-ivory"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: DUR.med, ease: EASE }}
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
              <h2 className="font-display text-2xl">Your Chimes</h2>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)} className="p-3">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="mt-10 text-center text-espresso-2/70">
                  <p className="font-display text-xl text-espresso">Quiet in here.</p>
                  <p className="mt-2 text-[15px]">No chimes yet — let’s fix that.</p>
                  <Link
                    href="/collection"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 inline-block border border-espresso px-6 py-3 text-sm uppercase tracking-[0.2em] hover:bg-espresso hover:text-ivory"
                  >
                    Browse the collection
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {cart.map((item) => (
                    <li key={item.slug} className="flex gap-4">
                      <div className="h-20 w-20 shrink-0 overflow-hidden border border-hairline bg-linen">
                        <Image src={item.image} alt={item.name} width={80} height={80} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[15px] font-medium leading-snug">{item.name}</p>
                          <button
                            aria-label={`Remove ${item.name}`}
                            onClick={() => remove(item.slug)}
                            className="p-2 text-espresso-2/50 hover:text-rust"
                          >
                            <X size={15} />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-hairline">
                            <button aria-label="Decrease quantity" className="min-h-10 min-w-10 p-2" onClick={() => setQty(item.slug, item.qty - 1)}>
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button aria-label="Increase quantity" className="min-h-10 min-w-10 p-2" onClick={() => setQty(item.slug, item.qty + 1)}>
                              <Plus size={13} />
                            </button>
                          </div>
                          <p className="text-[15px]">{money(item.priceCents * item.qty)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-hairline px-6 py-5">
                <div className="flex justify-between text-[15px]">
                  <span className="text-espresso-2/75">Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="mt-1 flex justify-between text-[15px]">
                  <span className="text-espresso-2/75">Shipping (flat)</span>
                  <span>{money(site.shippingFlatCents)}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="mt-5 block bg-espresso py-4 text-center text-[13px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brass"
                >
                  Checkout — {money(subtotal + site.shippingFlatCents)}
                </Link>
                <a href={site.phoneHref} className="mt-3 flex items-center justify-center gap-2 py-2 text-[14px] text-espresso-2 hover:text-brass">
                  <Phone size={14} /> Prefer to order by phone? {site.phoneDisplay}
                </a>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
