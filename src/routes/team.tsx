import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/motion";
import { images, team } from "@/lib/data";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — AUREON ESTATES" },
      { name: "description", content: "Meet the advisers behind AUREON ESTATES." },
      { property: "og:title", content: "Team — AUREON ESTATES" },
      { property: "og:description", content: "Meet our private client advisers." },
    ],
  }),
  component: Team,
});

function Team() {
  return (
    <>
      <PageHero eyebrow="Team" title="The people behind every introduction" image={images.meeting} />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-3 lg:px-10">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.15} className="text-center">
            <div className="mx-auto aspect-square w-52 overflow-hidden rounded-full border border-gold p-1.5">
              <img src={m.image} alt={m.name} loading="lazy" className="h-full w-full rounded-full object-cover" />
            </div>
            <h2 className="mt-8 text-3xl">{m.name}</h2>
            <p className="eyebrow mt-2">{m.role}</p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
          </Reveal>
        ))}
      </section>
      <p className="pb-16 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">Demonstration profiles — fictional people</p>
    </>
  );
}
