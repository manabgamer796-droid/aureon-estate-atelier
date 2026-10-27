import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/site/Layout";
import { ImageReveal, ease } from "@/components/site/motion";
import { images } from "@/lib/data";

type Search = { property?: string };

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): Search => (typeof s["property"] === "string" ? { property: s["property"] } : {}),
  head: () => ({
    meta: [
      { title: "Contact — AUREON ESTATES" },
      { name: "description", content: "Arrange a private consultation with an AUREON adviser in Dubai." },
      { property: "og:title", content: "Contact — AUREON ESTATES" },
      { property: "og:description", content: "Arrange a private consultation." },
    ],
  }),
  component: Contact,
});

function Input({ name, label, type = "text", value, onChange, error, textarea }: { name: string; label: string; type?: string; value: string; onChange: (v: string) => void; error?: string | undefined; textarea?: boolean }) {
  const cls = "peer w-full border-b border-input bg-transparent pb-2 pt-6 outline-none transition-colors focus:border-gold";
  return (
    <div className="relative">
      {textarea ? (
        <textarea id={name} rows={4} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={cls} />
      ) : (
        <input id={name} type={type} placeholder=" " value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={cls} />
      )}
      <label htmlFor={name} className="pointer-events-none absolute left-0 top-6 text-sm text-muted-foreground transition-all duration-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">{label}</label>
      <AnimatePresence>{error && <motion.p role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-destructive">{error}</motion.p>}</AnimatePresence>
    </div>
  );
}

function Contact() {
  const { property } = Route.useSearch();
  const [f, setF] = useState({ name: "", email: "", message: property ? `I'd like to arrange a viewing of ${property}.` : "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er["name"] = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er["email"] = "Please enter a valid email.";
    if (f.message.trim().length < 10) er["message"] = "Please add a few more details.";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Begin a private conversation" image={images.bedroom} />
      <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 lg:px-10">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div key="ok" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="flex flex-col justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold"><Check className="h-6 w-6" /></span>
              <h2 className="mt-8 text-4xl">Thank you, {f.name.split(" ")[0]}.</h2>
              <p className="mt-4 text-muted-foreground">An adviser will be in touch within one business day.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <Input name="name" label="Full name" value={f.name} onChange={(v) => setF({ ...f, name: v })} error={errors["name"]} />
              <Input name="email" label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} error={errors["email"]} />
              <Input name="message" label="How can we help?" textarea value={f.message} onChange={(v) => setF({ ...f, message: v })} error={errors["message"]} />
              <button type="submit" className="btn-lux">Send enquiry</button>
            </motion.form>
          )}
        </AnimatePresence>
        <ImageReveal src={images.desert} alt="Courtyard villa at dusk" className="aspect-[4/5]" />
      </section>
    </>
  );
}
