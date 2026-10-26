import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Simple, fair terms for using the Maac Wind Chimes website and ordering handmade chimes.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Fair and plain"
      title="Terms of Use"
      updated="January 2026"
      intro="By using this site or ordering from us, you agree to the straightforward terms below. Nothing here is designed to surprise you."
      sections={[
        {
          h: "Handmade means unique",
          p: "All chimes are unique and might be one-of-a-kind. Colors of die-cast cars may vary from photographs. Small variations are part of being handmade since 1998 — not defects.",
        },
        {
          h: "Orders and payment",
          p: "Placing an order sends us a request; we confirm by email or phone and arrange payment before shipping. Prices are in US dollars and may change over time.",
        },
        {
          h: "Shipping",
          p: `Shipping is a flat ${(site.shippingFlatCents / 100).toFixed(0)} dollars within the US. We pack each chime carefully; if it arrives damaged, call us and we'll make it right.`,
        },
        {
          h: "Our content",
          p: "The photographs, words, and designs on this site belong to Maac Wind Chimes. Please don't reuse them without asking — but do share links freely; that's what they're for.",
        },
        {
          h: "Contact",
          p: `Questions about these terms: ${site.email} or ${site.phoneDisplay} — Elkhorn, Nebraska.`,
        },
      ]}
    />
  );
}
