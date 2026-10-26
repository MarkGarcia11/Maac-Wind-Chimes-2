"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import { Package, CalendarDays, Mail, ShoppingBag, Users } from "lucide-react";
import { updateProductAction, addEventAction } from "@/app/admin/actions";
import { money } from "@/lib/site";
import type { Product, EventRow } from "@/lib/data";

type Inquiry = { id: number; kind: string; name: string; email: string; subject: string; message: string; createdAt: Date };
type Order = { id: number; code: string; name: string; email: string; totalCents: number; status: string; createdAt: Date };
type Sub = { id: number; email: string; createdAt: Date };

const TABS = [
  { id: "products", label: "Products", icon: Package },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "mail", label: "Inquiries", icon: Mail },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "newsletter", label: "Newsletter", icon: Users },
] as const;

export default function AdminClient({
  products,
  events,
  inquiries,
  orders,
  newsletter,
}: {
  products: Product[];
  events: EventRow[];
  inquiries: Inquiry[];
  orders: Order[];
  newsletter: Sub[];
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("products");
  const [pending, start] = useTransition();
  const [flash, setFlash] = useState("");

  const say = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2200);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-2 border-b border-hairline" role="tablist" aria-label="Admin sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex min-h-12 items-center gap-2 border-b-2 px-5 text-[13px] uppercase tracking-[0.16em] transition-colors ${
              tab === t.id ? "border-brass text-espresso" : "border-transparent text-espresso-2/55 hover:text-espresso"
            }`}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>
      {flash && (
        <p role="status" className="mt-4 inline-block border border-sage/40 bg-sage/10 px-4 py-2 text-[14px] text-espresso-2">
          {flash}
        </p>
      )}

      {tab === "products" && (
        <div className="mt-8 overflow-x-auto" role="tabpanel">
          <table className="w-full min-w-[760px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-hairline text-[12px] uppercase tracking-[0.16em] text-espresso-2/60">
                <th className="py-3 pr-4 font-medium">Chime</th>
                <th className="py-3 pr-4 font-medium">SKU</th>
                <th className="py-3 pr-4 font-medium">Price</th>
                <th className="py-3 pr-4 font-medium">Availability</th>
                <th className="py-3 font-medium">Featured</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-hairline/60">
                  <td className="flex items-center gap-3 py-3 pr-4">
                    <Image src={p.image} alt="" width={44} height={44} className="h-11 w-11 border border-hairline object-cover" />
                    <span className="font-medium text-espresso">{p.name}</span>
                  </td>
                  <td className="py-3 pr-4 text-espresso-2/70">{p.sku}</td>
                  <td className="py-3 pr-4">
                    <input
                      defaultValue={(p.priceCents / 100).toFixed(2)}
                      aria-label={`Price for ${p.name}`}
                      className="w-24 border border-hairline bg-white px-2 py-1.5"
                      onBlur={(e) => {
                        const cents = Math.round(parseFloat(e.target.value || "0") * 100);
                        if (cents > 0 && cents !== p.priceCents)
                          start(async () => { await updateProductAction(p.id, { priceCents: cents }); say(`Saved ${p.name} — ${money(cents)}`); });
                      }}
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <select
                      defaultValue={p.availability}
                      aria-label={`Availability for ${p.name}`}
                      className="border border-hairline bg-white px-2 py-1.5"
                      onChange={(e) =>
                        start(async () => { await updateProductAction(p.id, { availability: e.target.value }); say(`Saved ${p.name}`); })
                      }
                    >
                      <option value="in_stock">In stock</option>
                      <option value="made_to_order">Made to order</option>
                      <option value="call">Call for availability</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <input
                      type="checkbox"
                      defaultChecked={p.featured}
                      aria-label={`Feature ${p.name} on homepage`}
                      className="h-5 w-10 accent-[#b08d57]"
                      onChange={(e) =>
                        start(async () => { await updateProductAction(p.id, { featured: e.target.checked }); say("Homepage updated"); })
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pending && <p className="mt-3 text-[14px] text-espresso-2/60">Saving…</p>}
        </div>
      )}

      {tab === "events" && (
        <div className="mt-8 grid gap-10 lg:grid-cols-2" role="tabpanel">
          <div>
            <h2 className="font-display text-2xl text-espresso">On the calendar</h2>
            <ul className="mt-4 space-y-4">
              {events.map((e) => (
                <li key={e.id} className="border border-hairline bg-linen/50 p-5">
                  <p className="font-medium text-espresso">{e.title}</p>
                  <p className="mt-1 text-[14px] text-espresso-2/70">
                    {new Date(e.startAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" })}
                    {" · "}{e.venue}, {e.address} {e.space && `· ${e.space}`}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <form
            className="h-fit space-y-4 border border-hairline bg-linen/50 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              start(async () => {
                await addEventAction({
                  title: String(fd.get("title")),
                  venue: String(fd.get("venue")),
                  address: String(fd.get("address")),
                  space: String(fd.get("space") ?? ""),
                  description: String(fd.get("description") ?? ""),
                  date: String(fd.get("date")),
                  start: String(fd.get("start")),
                  end: String(fd.get("end")),
                });
                say("Event added");
                (e.target as HTMLFormElement).reset();
              });
            }}
          >
            <h2 className="font-display text-2xl text-espresso">Add a show</h2>
            <input name="title" required placeholder="Show name" className="field" aria-label="Show name" />
            <input name="venue" required placeholder="Venue" className="field" aria-label="Venue" />
            <input name="address" required placeholder="Address" className="field" aria-label="Address" />
            <input name="space" placeholder="Booth / space #" className="field" aria-label="Booth or space number" />
            <div className="grid grid-cols-3 gap-3">
              <input name="date" type="date" required className="field" aria-label="Date" />
              <input name="start" type="time" required className="field" aria-label="Start time" />
              <input name="end" type="time" required className="field" aria-label="End time" />
            </div>
            <textarea name="description" rows={3} placeholder="A sentence or two about the show" className="field" aria-label="Description" />
            <button className="min-h-12 bg-espresso px-8 text-[12px] uppercase tracking-[0.2em] text-ivory hover:bg-brass">
              Add event
            </button>
          </form>
        </div>
      )}

      {tab === "mail" && (
        <div className="mt-8 space-y-4" role="tabpanel">
          {inquiries.length === 0 && <p className="text-espresso-2/70">No mail yet — the inbox is quiet.</p>}
          {inquiries.map((i) => (
            <article key={i.id} className="border border-hairline bg-linen/40 p-6">
              <div className="flex flex-wrap items-center gap-3 text-[13px] uppercase tracking-[0.16em] text-espresso-2/60">
                <span className="border border-brass/40 px-2 py-0.5 text-brass">{i.kind}</span>
                <span>{new Date(i.createdAt).toLocaleDateString("en-US")}</span>
              </div>
              <p className="mt-3 font-medium text-espresso">
                {i.name} — <a href={`mailto:${i.email}`} className="text-brass underline">{i.email}</a>
              </p>
              {i.subject && <p className="mt-1 text-[15px] text-espresso-2">{i.subject}</p>}
              <p className="mt-2 whitespace-pre-wrap text-[15px] leading-relaxed text-espresso-2/85">{i.message}</p>
            </article>
          ))}
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-8 space-y-4" role="tabpanel">
          {orders.length === 0 && <p className="text-espresso-2/70">No orders yet.</p>}
          {orders.map((o) => (
            <article key={o.id} className="flex flex-wrap items-center justify-between gap-4 border border-hairline bg-linen/40 p-6">
              <div>
                <p className="font-medium text-espresso">{o.code} · {o.name}</p>
                <p className="text-[14px] text-espresso-2/70">{o.email} · {new Date(o.createdAt).toLocaleDateString("en-US")}</p>
              </div>
              <div className="text-right">
                <p className="text-lg">{money(o.totalCents)}</p>
                <p className="text-[12px] uppercase tracking-[0.16em] text-sage">{o.status}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      {tab === "newsletter" && (
        <div className="mt-8" role="tabpanel">
          {newsletter.length === 0 && <p className="text-espresso-2/70">No subscribers yet.</p>}
          <ul className="divide-y divide-hairline border-y border-hairline">
            {newsletter.map((n) => (
              <li key={n.id} className="flex justify-between py-3 text-[15px]">
                <span>{n.email}</span>
                <span className="text-espresso-2/55">{new Date(n.createdAt).toLocaleDateString("en-US")}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
