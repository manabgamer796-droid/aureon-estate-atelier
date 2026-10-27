import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { formatAED, type Property } from "@/lib/data";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link to="/properties/$id" params={{ id: p.id }} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <img src={p.image} alt={p.title} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-110" />
        <div className="overlay-card absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="absolute left-5 top-5 bg-ivory/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.25em] text-foreground">{p.status}</span>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ink-foreground">
          <div>
            <p className="eyebrow">{p.location}</p>
            <p className="mt-2 text-sm opacity-0 transition-all duration-700 group-hover:opacity-100">{p.beds} Beds · {p.baths} Baths · {p.area.toLocaleString()} sq ft</p>
          </div>
          <span className="flex h-11 w-11 translate-y-3 items-center justify-center rounded-full border border-gold text-gold opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl transition-colors group-hover:text-gold">{p.title}</h3>
        <p className="shrink-0 text-sm tracking-wide text-muted-foreground">{formatAED(p.price)}</p>
      </div>
    </Link>
  );
}
