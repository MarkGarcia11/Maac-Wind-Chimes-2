import type { Metadata } from "next";
import { PendulumTitle, Reveal } from "@/components/motion";
import { site, money } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Care, hanging, shipping, returns and custom questions about Maac handmade wind chimes.",
};

const FAQS = [
  {
    q: "What are the chimes made of?",
    a: "Each chime pairs aluminum chime tubes with a die-cast 1:40 scale car, truck, or character centerpiece, strung on strong line. The chime is 24\u2033 long. Cars may vary in color — that's part of being handmade.",
  },
  {
    q: "How long is the chime and how big are the cars?",
    a: "The chimes hang 24 inches long, and the die-cast cars are 1:40th scale — roughly matchbox-to-hand size.",
  },
  {
    q: "How do I hang it?",
    a: "From any sturdy hook with room to sway: a porch beam, shepherd's hook, or tree limb. Avoid tight corners where the tubes can't move — wind chimes need wind.",
  },
  {
    q: "How do I care for it?",
    a: "Dust now and then; bring it in during truly severe weather. The cars are die-cast metal and hold up beautifully outdoors for years.",
  },
  {
    q: "What does shipping cost?",
    a: `Flat ${money(site.shippingFlatCents)} anywhere in the US. In-stock chimes ship in 2–3 days; made-to-order pieces take about a week.`,
  },
  {
    q: "Can I return a chime?",
    a: `Yes — if it isn't right, call ${site.phoneDisplay} within 30 days. We'll exchange, repair, or refund. We'd rather you love it.`,
  },
  {
    q: "Do you take custom orders?",
    a: "Happily. Many of our best chimes started as customer ideas. Visit the Custom Chimes page and tell us the story — or just call.",
  },
  {
    q: "Are all the chimes really one-of-a-kind?",
    a: "All chimes are unique and might be one-of-a-kind. When you're hand-making things since 1998, no two ever come out exactly alike.",
  },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mx-auto max-w-[860px] px-5 pb-28 pt-14 lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="eyebrow">Good questions</p>
      <PendulumTitle
        text="Things people ask us."
        className="font-display mt-4 text-5xl leading-[1.04] text-espresso lg:text-6xl"
        italicWords={["ask"]}
      />
      <Reveal delay={0.15}>
        <div className="mt-12">
          {FAQS.map((f) => (
            <details key={f.q} className="group border-b border-hairline py-6">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 text-[19px] font-medium text-espresso [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-xl text-brass transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="pb-2 pr-10 leading-relaxed text-espresso-2/85">{f.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
      <p className="mt-10 text-[15px] text-espresso-2/75">
        Something else on your mind? Call <a href={site.phoneHref} className="text-brass underline">{site.phoneDisplay}</a> — we like questions.
      </p>
    </div>
  );
}
