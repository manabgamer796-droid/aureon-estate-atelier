import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Counter, ImageReveal, Parallax, Reveal, SplitText, ease } from "@/components/site/motion";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Founder } from "@/components/site/Founder";
import { articles, images, properties } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AUREON ESTATES — Prime Dubai Residences" },
      { name: "description", content: "Penthouses, waterfront villas and investment residences across Dubai, curated by a private advisory." },
      { property: "og:title", content: "AUREON ESTATES — Prime Dubai Residences" },
      { property: "og:description", content: "Penthouses, waterfront villas and investment residences across Dubai." },
    ],
  }),
  component: Home,
});

function Home() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      <section ref={ref} className="relative h-[100svh] min-h-[620px] overflow-hidden bg-ink text-ink-foreground">
        <motion.div style={{ y }} className="absolute inset-0">
          <motion.img src={images.hero} alt="Dubai waterfront skyline at dusk" className="h-full w-full object-cover" initial={reduce ? false : { scale: 1.25 }} animate={{ scale: 1.05 }} transition={{ duration: 3.2, ease }} />
        </motion.div>
        <div className="overlay-hero absolute inset-0" />
        <motion.div style={{ opacity: fade }} className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 lg:px-10 lg:pb-28">
          <motion.p className="eyebrow" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 1.2, ease }}>Private Real Estate Advisory · Dubai</motion.p>
          <h1 className="mt-6 max-w-5xl text-[2.9rem] leading-[1.02] sm:text-6xl md:text-8xl">
            <SplitText text="Residences of rare" delay={0.5} />
            <br />
            <SplitText text="distinction." delay={0.8} className="italic text-gold-soft" />
          </h1>
          <motion.div className="mt-10 flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 1, ease }}>
            <Link to="/properties" className="btn-lux">View Collection <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="btn-ghost-lux">Private Consultation</Link>
          </motion.div>
        </motion.div>
        <motion.div className="absolute bottom-8 right-8 hidden h-16 w-px origin-top bg-gold md:block" animate={reduce ? {} : { scaleY: [0, 1, 0] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-4 lg:px-10">
        {[
          { n: 20, s: "+", l: "Years of advisory" },
          { n: 4.2, s: "B", p: "AED ", d: 1, l: "Transactions closed" },
          { n: 640, s: "", l: "Private clients" },
          { n: 6.4, s: "%", d: 1, l: "Average net yield" },
        ].map((x, i) => (
          <Reveal key={x.l} delay={i * 0.1}>
            <p className="font-serif text-5xl text-foreground md:text-6xl"><Counter to={x.n} suffix={x.s} prefix={x.p} decimals={x.d ?? 0} /></p>
            <div className="my-4 h-px w-10 bg-gold" />
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{x.l}</p>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-28 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><p className="eyebrow">The Collection</p><h2 className="mt-4 text-4xl md:text-6xl">Featured residences</h2></Reveal>
          <Reveal delay={0.2}><Link to="/properties" className="link-underline text-xs uppercase tracking-[0.25em]">All properties</Link></Reveal>
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
          {properties.slice(0, 3).map((p, i) => <Reveal key={p.id} delay={i * 0.15}><PropertyCard p={p} /></Reveal>)}
        </div>
      </section>

      <section className="relative">
        <Parallax src={images.villa} alt="Palm Jumeirah villa with infinity pool" className="h-[80vh] min-h-[480px]" strength={120} />
        <div className="overlay-hero absolute inset-0" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-6 text-ink-foreground lg:px-10">
            <Reveal><p className="eyebrow">Our Philosophy</p></Reveal>
            <Reveal delay={0.15}><h2 className="mt-6 max-w-3xl text-4xl leading-tight md:text-6xl">We represent fewer homes, so that each receives <em className="text-gold-soft">our full attention.</em></h2></Reveal>
          </div>
        </div>
      </section>

      <Founder />

      <section className="bg-ink py-28 text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:grid-cols-2 lg:px-10">
          <ImageReveal src={images.meeting} alt="Property consultation" className="aspect-[4/3]" />
          <div>
            <Reveal><p className="eyebrow">Investment Advisory</p></Reveal>
            <Reveal delay={0.1}><h2 className="mt-5 text-4xl md:text-5xl">Model your returns before you commit.</h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 max-w-md leading-relaxed text-ink-foreground/70">Our interactive calculator projects rental yield, appreciation and total return for any residence in the collection.</p></Reveal>
            <Reveal delay={0.3}><Link to="/investment" className="btn-lux mt-10">Open Calculator <ArrowRight className="h-4 w-4" /></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <Reveal><p className="eyebrow">Insights</p><h2 className="mt-4 text-4xl md:text-6xl">From the journal</h2></Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal key={a.slug} delay={i * 0.12}>
              <Link to="/insights/$slug" params={{ slug: a.slug }} className="group block">
                <div className="aspect-[3/2] overflow-hidden"><img src={a.image} alt={a.title} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-105" /></div>
                <p className="eyebrow mt-6">{a.category} · {a.read}</p>
                <h3 className="mt-3 text-2xl leading-snug transition-colors group-hover:text-gold">{a.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
