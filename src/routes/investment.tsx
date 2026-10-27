import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHero } from "@/components/site/Layout";
import { AnimatedNumber, Reveal, ease } from "@/components/site/motion";
import { images } from "@/lib/data";

type Search = { price?: number; yield?: number };

export const Route = createFileRoute("/investment")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const out: Search = {};
    if (s["price"]) out.price = Number(s["price"]);
    if (s["yield"]) out.yield = Number(s["yield"]);
    return out;
  },
  head: () => ({
    meta: [
      { title: "Investment Calculator — AUREON ESTATES" },
      { name: "description", content: "Project rental yield, appreciation and total return on prime Dubai property." },
      { property: "og:title", content: "Investment Calculator — AUREON ESTATES" },
      { property: "og:description", content: "Model returns on prime Dubai residences." },
    ],
  }),
  component: Investment,
});

export function projectReturns(price: number, yieldPct: number, growthPct: number, years: number) {
  const rows = [];
  let value = price;
  let rent = 0;
  for (let y = 0; y <= years; y++) {
    rows.push({ year: `Y${y}`, value: Math.round(value), rent: Math.round(rent) });
    rent += value * (yieldPct / 100);
    value *= 1 + growthPct / 100;
  }
  const last = rows[rows.length - 1]!;
  return { rows, annualRent: price * (yieldPct / 100), finalValue: last.value, totalRent: last.rent, totalReturn: last.value - price + last.rent };
}

const aed = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");

function Field({ label, value, min, max, step, onChange, fmt }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; fmt: (n: number) => string }) {
  return (
    <label className="block">
      <div className="flex justify-between text-xs uppercase tracking-[0.2em]"><span className="text-muted-foreground">{label}</span><span>{fmt(value)}</span></div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-4 w-full accent-[var(--gold)]" />
    </label>
  );
}

function Investment() {
  const s = Route.useSearch();
  const [price, setPrice] = useState(s.price ?? 5000000);
  const [yld, setYld] = useState(s.yield ?? 6);
  const [growth, setGrowth] = useState(5);
  const [years, setYears] = useState(10);
  const r = useMemo(() => projectReturns(price, yld, growth, years), [price, yld, growth, years]);

  return (
    <>
      <PageHero eyebrow="Investment" title="Clarity before commitment" image={images.downtown} />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-5 lg:px-10">
        <Reveal className="space-y-10 lg:col-span-2">
          <h2 className="text-4xl">Your assumptions</h2>
          <Field label="Purchase price" value={price} min={1000000} max={50000000} step={250000} onChange={setPrice} fmt={aed} />
          <Field label="Gross rental yield" value={yld} min={2} max={10} step={0.1} onChange={setYld} fmt={(n) => n.toFixed(1) + "%"} />
          <Field label="Annual appreciation" value={growth} min={0} max={12} step={0.5} onChange={setGrowth} fmt={(n) => n.toFixed(1) + "%"} />
          <Field label="Holding period" value={years} min={1} max={20} step={1} onChange={setYears} fmt={(n) => n + " years"} />
          <p className="text-xs leading-relaxed text-muted-foreground">Illustrative only. Excludes fees, service charges and financing. Not financial advice.</p>
        </Reveal>
        <div className="lg:col-span-3">
          <div className="grid grid-cols-2 gap-px bg-border">
            {[
              { l: "Annual rental income", v: r.annualRent },
              { l: `Value after ${years} years`, v: r.finalValue },
              { l: "Cumulative rent", v: r.totalRent },
              { l: "Total return", v: r.totalReturn, hl: true },
            ].map((x, i) => (
              <motion.div key={i} className={`p-6 md:p-8 ${x.hl ? "bg-ink text-ink-foreground" : "bg-background"}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.9, ease }}>
                <p className="text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">{x.l}</p>
                <p className={`mt-3 font-serif text-2xl md:text-4xl ${x.hl ? "text-gold" : ""}`}><AnimatedNumber value={x.v} format={aed} /></p>
              </motion.div>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10 h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={r.rows} margin={{ left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--gold)" stopOpacity={0.45} /><stop offset="100%" stopColor="var(--gold)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" vertical={false} />
                <XAxis dataKey="year" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => (v / 1e6).toFixed(0) + "M"} tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={40} />
                <Tooltip formatter={(v: number) => aed(v)} contentStyle={{ background: "var(--ink)", border: "none", color: "var(--ink-foreground)" }} />
                <Area type="monotone" dataKey="value" name="Property value" stroke="var(--gold)" strokeWidth={1.5} fill="url(#g)" animationDuration={900} />
                <Area type="monotone" dataKey="rent" name="Cumulative rent" stroke="var(--foreground)" strokeWidth={1} fill="transparent" animationDuration={900} />
              </AreaChart>
            </ResponsiveContainer>
          </Reveal>
        </div>
      </section>
    </>
  );
}
