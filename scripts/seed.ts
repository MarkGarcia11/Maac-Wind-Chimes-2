/**
 * Manual seed script — `npx tsx scripts/seed.ts`
 * (The app also auto-seeds on first request; this is for explicit reseeding.)
 */
import { config } from "dotenv";
config();

import { db } from "../src/db";
import { products, categories, events, reviews } from "../src/db/schema";
import { seedProducts, seedCategories, seedEvents, seedReviews } from "../src/db/seed-data";
import { sql } from "drizzle-orm";

async function main() {
  const [{ count }] = await db.select({ count: sql<number>`count(*)::int` }).from(products);
  if (count > 0) {
    console.log(`Database already has ${count} products — nothing to do.`);
    return;
  }
  await db.insert(categories).values(seedCategories);
  await db.insert(products).values(seedProducts);
  await db.insert(events).values(seedEvents);
  await db.insert(reviews).values(seedReviews);
  console.log(`Seeded: ${seedCategories.length} categories, ${seedProducts.length} products, ${seedEvents.length} events, ${seedReviews.length} reviews.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
