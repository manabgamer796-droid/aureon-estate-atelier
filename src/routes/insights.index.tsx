import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/motion";
import { articles, images } from "@/lib/data";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Insights — AUREON ESTATES" },
      { name: "description", content: "Market analysis, design and investment perspectives on Dubai prime property." },
      { property: "og:title", content: "Insights — AUREON ESTATES" },
      { property: "og:description", content: "The AUREON journal." },
    ],
  }),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHero eyebrow="Journal" title="Perspectives on prime property" image={images.detail} />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-3 lg:px-10">
        {articles.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.12}>
            <Link to="/insights/$slug" params={{ slug: a.slug }} className="group block">
              <div className="aspect-[3/2] overflow-hidden"><img src={a.image} alt={a.title} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-105" /></div>
              <p className="eyebrow mt-6">{a.category} · {a.date}</p>
              <h2 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-gold">{a.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{a.excerpt}</p>
            </Link>
          </Reveal>
        ))}
      </section>
    </>
  );
}
