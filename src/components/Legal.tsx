import { PendulumTitle, Reveal } from "@/components/motion";

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div className="mx-auto max-w-[820px] px-5 pb-28 pt-14 lg:pt-20">
      <p className="eyebrow">{eyebrow}</p>
      <PendulumTitle text={title} className="font-display mt-4 text-5xl text-espresso lg:text-6xl" italicWords={[]} />
      <Reveal delay={0.1}>
        <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-espresso-2/50">Last updated · {updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-espresso-2/90">{intro}</p>
        <div className="mt-10 space-y-9">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-2xl text-espresso">{s.h}</h2>
              <p className="mt-3 leading-relaxed text-espresso-2/85">{s.p}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 border-t border-hairline pt-6 text-[14px] text-espresso-2/60">
          Plain words, because that’s how we’d want to read it. Questions? Call or write — details on the contact page.
        </p>
      </Reveal>
    </div>
  );
}
