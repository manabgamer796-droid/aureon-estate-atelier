import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Bath, BedDouble, Check, Maximize, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Reveal, ease } from "@/components/site/motion";
import { PropertyCard } from "@/components/site/PropertyCard";
import { formatAED, properties } from "@/lib/data";

export const Route = createFileRoute("/properties/$id")({
  loader: ({ params }) => {
    const p = properties.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title}, ${loaderData.location} — AUREON ESTATES` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — AUREON ESTATES` },
          { property: "og:description", content: loaderData.summary },
        ]
      : [{ title: "Property not found — AUREON ESTATES" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 pt-24">
      <h1 className="text-4xl">Residence not found</h1>
      <Link to="/properties" className="btn-lux">Back to collection</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const p = Route.useLoaderData();
  const [i, setI] = useState(0);
  const specs = [
    { icon: BedDouble, label: "Bedrooms", v: p.beds },
    { icon: Bath, label: "Bathrooms", v: p.baths },
    { icon: Maximize, label: "Sq ft", v: p.area.toLocaleString() },
    { icon: TrendingUp, label: "Est. yield", v: p.yield + "%" },
  ];
  return (
    <div className="pt-24">
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <Link to="/properties" className="link-underline inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground"><ArrowLeft className="h-3 w-3" /> Collection</Link>
        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal><p className="eyebrow">{p.location} · {p.type} · {p.status}</p></Reveal>
            <Reveal delay={0.1}><h1 className="mt-4 text-5xl md:text-7xl">{p.title}</h1></Reveal>
          </div>
          <Reveal delay={0.2}><p className="font-serif text-4xl text-gold">{formatAED(p.price)}</p></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="relative aspect-[16/10] overflow-hidden bg-ink md:aspect-[16/8]">
          <AnimatePresence mode="sync">
            <motion.img key={p.gallery[i]} src={p.gallery[i]} alt={`${p.title} photograph ${i + 1}`} className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.2, ease }} />
          </AnimatePresence>
          <span className="absolute bottom-5 right-5 bg-ink/70 px-3 py-1 text-xs tracking-[0.2em] text-ink-foreground">{i + 1} / {p.gallery.length}</span>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {p.gallery.map((g, k) => (
            <button key={k} onClick={() => setI(k)} aria-label={`Show photograph ${k + 1}`} className={`relative aspect-[3/2] overflow-hidden transition-all duration-500 ${k === i ? "ring-1 ring-gold ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-100"}`}>
              <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-3 lg:px-10">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
            {specs.map((s, k) => (
              <motion.div key={s.label} className="bg-background p-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.1, duration: 0.9, ease }}>
                <s.icon className="h-5 w-5 text-gold" strokeWidth={1.2} />
                <p className="mt-4 font-serif text-3xl">{s.v}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </div>
          <Reveal><p className="mt-12 font-serif text-2xl leading-relaxed">{p.summary}</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-14 text-3xl">Features</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {p.features.map((f) => <li key={f} className="flex items-center gap-3 border-b pb-4 text-sm"><Check className="h-4 w-4 text-gold" />{f}</li>)}
            </ul>
          </Reveal>
        </div>
        <aside className="h-fit bg-ink p-8 text-ink-foreground lg:sticky lg:top-28">
          <p className="eyebrow">Arrange a viewing</p>
          <p className="mt-4 font-serif text-2xl">Speak privately with an adviser about {p.title}.</p>
          <Link to="/contact" search={{ property: p.title }} className="btn-lux mt-8 w-full justify-center">Enquire</Link>
          <Link to="/investment" search={{ price: p.price, yield: p.yield }} className="btn-ghost-lux mt-3 w-full justify-center">Model returns</Link>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <h2 className="text-3xl">You may also consider</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {properties.filter((x) => x.id !== p.id).slice(0, 3).map((x, k) => <Reveal key={x.id} delay={k * 0.1}><PropertyCard p={x} /></Reveal>)}
        </div>
      </section>
    </div>
  );
}
