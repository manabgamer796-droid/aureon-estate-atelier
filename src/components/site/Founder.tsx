import { motion, useReducedMotion } from "framer-motion";
import { images } from "@/lib/data";
import { ImageReveal, Reveal, ease } from "./motion";

export function Founder() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-28 lg:grid-cols-12 lg:px-10">
      <div className="lg:col-span-5">
        <motion.div
          className="relative mx-auto aspect-square w-64 sm:w-80"
          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
        >
          <div className="gold-ring absolute -inset-[3px] rounded-full opacity-80" />
          <div className="absolute inset-0 rounded-full bg-background" />
          <div className="absolute inset-2 overflow-hidden rounded-full border border-gold/60">
            <img src={images.founder} alt="Alexander Vane, founder (demonstration portrait)" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </motion.div>
        <p className="mt-6 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">Demonstration portrait — fictional founder</p>
      </div>
      <div className="lg:col-span-4">
        <Reveal><p className="eyebrow">Founder</p></Reveal>
        <Reveal delay={0.1}><h2 className="mt-4 text-4xl md:text-5xl">Alexander Vane</h2></Reveal>
        <Reveal delay={0.15}><p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">Founder & Managing Director</p></Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 font-serif text-2xl italic leading-snug">"A great home is never simply bought. It is found, negotiated and protected."</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">After two decades advising private clients in London and Monaco, Alexander founded AUREON to bring discreet, principal-level counsel to Dubai's prime market.</p>
        </Reveal>
      </div>
      <ImageReveal src={images.detail} alt="Travertine and brass architectural detail" className="hidden aspect-[3/4] lg:col-span-3 lg:block" />
    </section>
  );
}
