import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Layout";
import { Reveal } from "@/components/site/motion";
import { articles } from "@/lib/data";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const a = articles.find((x) => x.slug === params.slug);
    if (!a) throw notFound();
    return a;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — AUREON ESTATES` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
        ]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <div className="pt-40 text-center"><h1 className="text-4xl">Article not found</h1></div>,
  component: Article,
});

function Article() {
  const a = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow={`${a.category} · ${a.read}`} title={a.title} image={a.image} />
      <article className="mx-auto max-w-2xl px-6 py-20">
        {a.body.map((p, i) => <Reveal key={i} delay={i * 0.05}><p className={`mb-8 leading-relaxed ${i === 0 ? "font-serif text-2xl" : "text-lg text-muted-foreground"}`}>{p}</p></Reveal>)}
        <Link to="/insights" className="link-underline mt-8 inline-block text-xs uppercase tracking-[0.25em]">All insights</Link>
      </article>
    </>
  );
}
