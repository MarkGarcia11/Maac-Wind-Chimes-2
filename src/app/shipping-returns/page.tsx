import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { site, money } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Flat-rate US shipping, careful packing, and an honest 30-day promise on handmade Maac wind chimes.",
};

export default function ShippingReturnsPage() {
  return (
    <LegalPage
      eyebrow="No small print ambushes"
      title="Shipping & Returns"
      updated="January 2026"
      intro="We'd rather lose a sale than have a chime hang somewhere it isn't loved. Here's exactly how shipping and returns work."
      sections={[
        {
          h: "Shipping",
          p: `Flat ${money(site.shippingFlatCents)} anywhere in the United States, no matter how many chimes you order (within reason — for a whole fleet, call us). In-stock chimes ship within 2–3 days.`,
        },
        {
          h: "Made to order",
          p: "If a design is made to order, allow about a week before it ships. We'll email when it's on the workbench and again when it's on the truck.",
        },
        {
          h: "How we pack",
          p: "Tubes wrapped, car in its own little protective box, then the whole chime boxed snug. In nearly thirty years we've learned how to ship chimes that arrive ready to hang.",
        },
        {
          h: "Returns",
          p: `If your chime isn't right, call ${site.phoneDisplay} within 30 days. We'll exchange it, repair it, or refund it — your choice. Return shipping is on us if we made a mistake; otherwise we ask you to cover postage back.`,
        },
        {
          h: "Repairs",
          p: "String wears, storms happen. Send a tired chime back and we'll re-string it for the cost of postage. A Maac chime should outlive the car that inspired it.",
        },
      ]}
    />
  );
}
