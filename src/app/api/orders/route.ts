import { NextResponse } from "next/server";
import { createOrder } from "@/lib/data";
import { site } from "@/lib/site";

/** Checkout — validates cart items and stores the order. */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.company) return NextResponse.json({ ok: true, code: "MAAC-XXXXX" }); // honeypot

    const name = String(body.name ?? "").trim().slice(0, 120);
    const email = String(body.email ?? "").trim().slice(0, 200);
    if (!name || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Name and a valid email are required." }, { status: 400 });
    }
    const items = Array.isArray(body.items) ? body.items : [];
    const clean = items
      .map((i: Record<string, unknown>) => ({
        name: String(i.name ?? "").slice(0, 160),
        priceCents: Math.max(0, Math.min(100000, Number(i.priceCents) || 0)),
        qty: Math.max(1, Math.min(20, Number(i.qty) || 1)),
      }))
      .filter((i: { name: string; priceCents: number }) => i.name && i.priceCents >= 0);
    if (!clean.length) {
      return NextResponse.json({ ok: false, error: "Your cart is empty." }, { status: 400 });
    }

    const order = await createOrder({
      name,
      email,
      phone: String(body.phone ?? "").slice(0, 40),
      address: {
        street: String(body.street ?? "").slice(0, 200),
        city: String(body.city ?? "").slice(0, 120),
        state: String(body.state ?? "").slice(0, 60),
        zip: String(body.zip ?? "").slice(0, 20),
      },
      notes: String(body.notes ?? "").slice(0, 2000),
      items: clean,
      shippingCents: site.shippingFlatCents,
    });
    return NextResponse.json({ ok: true, code: order.code });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
