import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHero } from "@/components/site/Layout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { ease } from "@/components/site/motion";
import { images, properties, type PropertyType } from "@/lib/data";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "Properties — AUREON ESTATES" },
      { name: "description", content: "Browse penthouses, villas, apartments and townhouses across Dubai's finest addresses." },
      { property: "og:title", content: "Properties — AUREON ESTATES" },
      { property: "og:description", content: "Browse prime Dubai residences." },
    ],
  }),
  component: Properties,
});

const types: ("All" | PropertyType)[] = ["All", "Penthouse", "Villa", "Apartment", "Townhouse"];
const sorts = { featured: "Featured", "price-asc": "Price: low to high", "price-desc": "Price: high to low", yield: "Highest yield" } as const;

function Properties() {
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof typeof sorts>("featured");

  const list = useMemo(() => {
    let l = properties.filter((p) => (type === "All" || p.type === type) && (p.title + p.location).toLowerCase().includes(q.toLowerCase()));
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "yield") l = [...l].sort((a, b) => b.yield - a.yield);
    return l;
  }, [type, q, sort]);

  return (
    <>
      <PageHero eyebrow="The Collection" title="Exceptional homes across Dubai" image={images.tower} />
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {types.map((t) => (
              <button key={t} onClick={() => setType(t)} className="relative px-4 py-2 text-xs uppercase tracking-[0.2em]">
                {type === t && <motion.span layoutId="filter" className="absolute inset-0 bg-ink" transition={{ duration: 0.6, ease }} />}
                <span className={`relative transition-colors duration-500 ${type === t ? "text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}>{t}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <label className="flex items-center gap-3 border-b border-input pb-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search location or name" aria-label="Search properties" className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground sm:w-56" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} aria-label="Sort" className="border-b border-input bg-transparent pb-2 text-sm outline-none">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">{list.length} residences</p>
        <motion.div layout className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.div key={p.id} layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.8, delay: i * 0.06, ease }}>
                <PropertyCard p={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-20 text-center font-serif text-2xl text-muted-foreground">No residences match your search.</p>}
      </section>
    </>
  );
}
