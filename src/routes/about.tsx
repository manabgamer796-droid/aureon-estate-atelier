import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Founder } from "@/components/site/Founder";
import { ImageReveal, Reveal } from "@/components/site/motion";
import { images } from "@/lib/data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AUREON ESTATES" },
      { name: "description", content: "Two decades of discreet, principal-level real estate advisory in Dubai." },
      { property: "og:title", content: "About — AUREON ESTATES" },
      { property: "og:description", content: "Our story, founder and approach." },
    ],
  }),
  component: About,
});

const timeline = [
  { y: "2006", t: "Founded in Dubai with a single client mandate." },
  { y: "2012", t: "Opened the Palm Jumeirah waterfront practice." },
  { y: "2019", t: "Launched investment advisory for family offices." },
  { y: "2026", t: "AED 4.2B in transactions advised." },
];

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Counsel, not commission" image={images.penthouse} />
      <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:grid-cols-2 lg:px-10">
        <Reveal><p className="font-serif text-3xl leading-snug">AUREON is a private advisory representing a deliberately small portfolio of Dubai's most distinctive homes.</p></Reveal>
        <ImageReveal src={images.kitchen} alt="Luxury kitchen interior" className="aspect-[4/3]" />
      </section>
      <Founder />
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Reveal><p className="eyebrow">Timeline</p></Reveal>
          <div className="mt-12 grid gap-10 border-t border-ink-foreground/15 pt-10 md:grid-cols-4">
            {timeline.map((x, i) => (
              <Reveal key={x.y} delay={i * 0.12}>
                <p className="font-serif text-5xl text-gold">{x.y}</p>
                <p className="mt-4 text-sm leading-relaxed text-ink-foreground/70">{x.t}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
