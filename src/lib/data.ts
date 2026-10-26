import { db } from "@/db";
import {
  products,
  categories,
  events,
  reviews,
  orders,
  orderItems,
  inquiries,
  newsletter,
} from "@/db/schema";
import { seedProducts, seedCategories, seedEvents, seedReviews } from "@/db/seed-data";
import { eq, desc, asc, like, or, and, type SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";

let seedPromise: Promise<void> | null = null;

/**
 * Auto-seed: keeps the repo+Vercel flow simple. Content ships with the code
 * and is inserted the first time any page hits an empty database.
 */
export function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      const [{ count }] = await db
        .select({ count: sql<number>`count(*)::int` })
        .from(products);
      if (count > 0) return;
      await db.insert(categories).values(seedCategories);
      await db.insert(products).values(seedProducts);
      await db.insert(events).values(seedEvents);
      await db.insert(reviews).values(seedReviews);
    })().catch((e) => {
      seedPromise = null;
      throw e;
    });
  }
  return seedPromise;
}

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type EventRow = typeof events.$inferSelect;
export type Review = typeof reviews.$inferSelect;

export async function getCategories(): Promise<Category[]> {
  await ensureSeeded();
  return db.select().from(categories).orderBy(asc(categories.sort));
}

export type ProductQuery = {
  category?: string;
  search?: string;
  sort?: string;
  era?: string;
  availability?: string;
  limit?: number;
  offset?: number;
};

export async function getProducts(q: ProductQuery = {}): Promise<Product[]> {
  await ensureSeeded();
  const where: SQL[] = [];
  if (q.category) where.push(eq(products.category, q.category));
  if (q.era) where.push(eq(products.era, q.era));
  if (q.availability) where.push(eq(products.availability, q.availability));
  if (q.search) {
    const s = `%${q.search}%`;
    where.push(or(like(products.name, s), like(products.description, s), like(products.sku, s))!);
  }
  let orderBy;
  switch (q.sort) {
    case "name":
      orderBy = asc(products.name);
      break;
    case "price-desc":
      orderBy = desc(products.priceCents);
      break;
    case "price-asc":
      orderBy = asc(products.priceCents);
      break;
    default:
      orderBy = asc(products.id);
  }
  return db
    .select()
    .from(products)
    .where(where.length ? and(...where) : undefined)
    .orderBy(orderBy)
    .limit(q.limit ?? 200)
    .offset(q.offset ?? 0);
}

export async function getFeatured(): Promise<Product[]> {
  await ensureSeeded();
  return db.select().from(products).where(eq(products.featured, true)).limit(8);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await ensureSeeded();
  const rows = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return rows[0];
}

export async function getRelated(p: Product): Promise<Product[]> {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.category, p.category))
    .limit(5);
  const rest = rows.filter((r) => r.id !== p.id).slice(0, 4);
  if (rest.length >= 4) return rest;
  const more = await db.select().from(products).limit(6);
  const merged = [...rest];
  for (const m of more) {
    if (merged.length >= 4) break;
    if (m.id !== p.id && !merged.find((r) => r.id === m.id)) merged.push(m);
  }
  return merged.slice(0, 4);
}

export async function getEvents(): Promise<EventRow[]> {
  await ensureSeeded();
  return db.select().from(events).orderBy(asc(events.startAt));
}

export async function getNextEvent(): Promise<EventRow | undefined> {
  const all = await getEvents();
  const now = new Date();
  return all.find((e) => new Date(e.endAt) >= now) ?? all[all.length - 1];
}

export async function getReviews(productSlug?: string): Promise<Review[]> {
  await ensureSeeded();
  if (productSlug) {
    return db.select().from(reviews).where(eq(reviews.productSlug, productSlug));
  }
  return db.select().from(reviews).orderBy(desc(reviews.id)).limit(6);
}

export async function searchSuggestions(term: string): Promise<Product[]> {
  return getProducts({ search: term, limit: 6 });
}

/* ---------- mutations ---------- */

export async function createInquiry(row: {
  kind: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  payload?: Record<string, unknown>;
}) {
  await ensureSeeded();
  const [r] = await db
    .insert(inquiries)
    .values({
      kind: row.kind,
      name: row.name,
      email: row.email,
      phone: row.phone ?? "",
      subject: row.subject ?? "",
      message: row.message,
      payload: row.payload ?? {},
    })
    .returning();
  return r;
}

export async function subscribeNewsletter(email: string) {
  await ensureSeeded();
  await db.insert(newsletter).values({ email });
}

export async function createOrder(row: {
  name: string;
  email: string;
  phone?: string;
  address: Record<string, unknown>;
  notes?: string;
  items: { productId?: number; name: string; priceCents: number; qty: number }[];
  shippingCents: number;
}) {
  await ensureSeeded();
  const subtotal = row.items.reduce((a, i) => a + i.priceCents * i.qty, 0);
  const shipping = row.items.length ? row.shippingCents : 0;
  const code = `MAAC-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const [order] = await db
    .insert(orders)
    .values({
      code,
      name: row.name,
      email: row.email,
      phone: row.phone ?? "",
      address: row.address,
      notes: row.notes ?? "",
      subtotalCents: subtotal,
      shippingCents: shipping,
      totalCents: subtotal + shipping,
    })
    .returning();
  for (const item of row.items) {
    await db.insert(orderItems).values({
      orderId: order.id,
      productId: item.productId ?? null,
      name: item.name,
      priceCents: item.priceCents,
      qty: item.qty,
    });
  }
  return order;
}

export async function getOrder(code: string) {
  await ensureSeeded();
  const [o] = await db.select().from(orders).where(eq(orders.code, code)).limit(1);
  if (!o) return undefined;
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, o.id));
  return { order: o, items };
}

/* ---------- admin ---------- */

export async function adminData() {
  await ensureSeeded();
  const [p, e, i, o, n] = await Promise.all([
    db.select().from(products).orderBy(asc(products.id)),
    db.select().from(events).orderBy(asc(events.startAt)),
    db.select().from(inquiries).orderBy(desc(inquiries.id)).limit(50),
    db.select().from(orders).orderBy(desc(orders.id)).limit(50),
    db.select().from(newsletter).orderBy(desc(newsletter.id)).limit(50),
  ]);
  return { products: p, events: e, inquiries: i, orders: o, newsletter: n };
}

export async function adminUpdateProduct(
  id: number,
  data: Partial<Pick<Product, "name" | "priceCents" | "availability" | "image" | "description" | "sku" | "category" | "featured">>
) {
  await db.update(products).set(data).where(eq(products.id, id));
}

export async function adminAddEvent(data: {
  slug: string;
  title: string;
  description: string;
  venue: string;
  address: string;
  space: string;
  startAt: Date;
  endAt: Date;
  image: string;
}) {
  await db.insert(events).values(data);
}
