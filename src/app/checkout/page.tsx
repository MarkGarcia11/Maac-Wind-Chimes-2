"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, ShieldCheck } from "lucide-react";
import { useStore } from "@/components/store";
import { money, site } from "@/lib/site";
import { Reveal } from "@/components/motion";

export default function CheckoutPage() {
  const { cart, subtotal, clear } = useStore();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          items: cart.map((c) => ({ name: c.name, priceCents: c.priceCents, qty: c.qty })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      clear();
      router.push(`/checkout/confirmation?code=${data.code}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-[800px] px-5 py-28 text-center">
        <h1 className="font-display text-5xl text-espresso">Your cart is empty.</h1>
        <p className="mt-4 text-espresso-2/75">Add a chime or two before checking out.</p>
        <Link href="/collection" className="mt-8 inline-block bg-espresso px-10 py-4 text-[13px] uppercase tracking-[0.25em] text-ivory hover:bg-brass">
          Browse the collection
        </Link>
      </div>
    );
  }

  const total = subtotal + site.shippingFlatCents;

  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-28 pt-12 lg:px-10 lg:pt-16">
      <p className="eyebrow">Checkout</p>
      <h1 className="font-display mt-3 text-5xl text-espresso lg:text-6xl">
        Almost <em className="italic text-brass">home.</em>
      </h1>

      <form onSubmit={submit} className="mt-12 grid gap-12 lg:grid-cols-[1fr_340px]">
        <Reveal>
          <div className="space-y-8">
            <fieldset>
              <legend className="font-display text-2xl text-espresso">Where should it fly?</legend>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="eyebrow">Full name</label>
                  <input id="name" name="name" required autoComplete="name" className="field mt-2" />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow">Email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" className="field mt-2" />
                </div>
                <div>
                  <label htmlFor="phone" className="eyebrow">Phone (optional)</label>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" className="field mt-2" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="street" className="eyebrow">Street address</label>
                  <input id="street" name="street" required autoComplete="street-address" className="field mt-2" />
                </div>
                <div>
                  <label htmlFor="city" className="eyebrow">City</label>
                  <input id="city" name="city" required autoComplete="address-level2" className="field mt-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="state" className="eyebrow">State</label>
                    <input id="state" name="state" required autoComplete="address-level1" className="field mt-2" />
                  </div>
                  <div>
                    <label htmlFor="zip" className="eyebrow">ZIP</label>
                    <input id="zip" name="zip" required autoComplete="postal-code" inputMode="numeric" className="field mt-2" />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-display text-2xl text-espresso">Anything we should know?</legend>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                className="field mt-5"
                placeholder="Gift wrap a bow of twine? It’s a present for Dad? Tell us here."
                aria-label="Order notes"
              />
            </fieldset>

            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <fieldset>
              <legend className="font-display text-2xl text-espresso">Payment</legend>
              <div className="mt-5 border border-dashed border-brass/60 bg-brass/5 p-6">
                <p className="flex items-center gap-2 text-[15px] text-espresso-2">
                  <ShieldCheck size={17} className="text-brass" />
                  <span>
                    <strong className="font-medium">[Stripe payment placeholder]</strong> — card payments arrive here at
                    launch. For now, place the order and we’ll call or email to arrange payment.
                  </span>
                </p>
              </div>
            </fieldset>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="h-fit border border-hairline bg-linen/60 p-7 lg:sticky lg:top-32">
            <h2 className="font-display text-2xl text-espresso">Your order</h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              {cart.map((c) => (
                <li key={c.slug} className="flex justify-between gap-3">
                  <span className="text-espresso-2">{c.qty} × {c.name}</span>
                  <span>{money(c.priceCents * c.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t border-hairline pt-4 text-[15px]">
              <div className="flex justify-between"><dt className="text-espresso-2/75">Subtotal</dt><dd>{money(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-espresso-2/75">Shipping</dt><dd>{money(site.shippingFlatCents)}</dd></div>
              <div className="flex justify-between pt-1 text-lg text-espresso"><dt>Total</dt><dd>{money(total)}</dd></div>
            </dl>
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={busy}
              className="mt-6 w-full bg-espresso py-4 text-[13px] uppercase tracking-[0.25em] text-ivory transition-colors hover:bg-brass disabled:opacity-50"
            >
              {busy ? "Placing your order…" : `Place order — ${money(total)}`}
            </motion.button>
            {error && <p role="alert" className="mt-3 text-[14px] text-rust">{error}</p>}
            <a href={site.phoneHref} className="mt-4 flex items-center justify-center gap-2 text-[14px] text-espresso-2 hover:text-brass">
              <Phone size={14} /> Prefer to order by phone? {site.phoneDisplay}
            </a>
          </aside>
        </Reveal>
      </form>
    </div>
  );
}
