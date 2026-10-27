import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { ease } from "./motion";

const nav = [
  { to: "/properties", label: "Properties" },
  { to: "/investment", label: "Investment" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const solid = scrolled || path !== "/";
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${solid ? "bg-ink/95 py-4 backdrop-blur" : "py-7"} text-ink-foreground`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link to="/" className="font-serif text-2xl tracking-[0.3em]">
            AUREON<span className="text-gold"> ·</span> <span className="text-sm tracking-[0.4em] text-gold">ESTATES</span>
          </Link>
          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className="link-underline text-[0.7rem] uppercase tracking-[0.25em] text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                {n.label}
              </Link>
            ))}
          </nav>
          <button aria-label="Open menu" className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu className="h-6 w-6" strokeWidth={1.2} />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-8 py-7 text-ink-foreground"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl tracking-[0.3em]">AUREON</span>
              <button aria-label="Close menu" onClick={() => setOpen(false)}><X className="h-6 w-6" strokeWidth={1.2} /></button>
            </div>
            <nav className="mt-16 flex flex-col gap-6">
              {[{ to: "/", label: "Home" } as const, ...nav].map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease }}>
                  <Link to={n.to} className="font-serif text-4xl hover:text-gold">{n.label}</Link>
                </motion.div>
              ))}
            </nav>
            <p className="mt-auto text-xs tracking-[0.25em] text-gold">DUBAI · +971 4 000 0000</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-4 lg:px-10">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl tracking-[0.3em]">AUREON</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/60">Private real estate advisory for the world's most considered buyers. Dubai, since 2006.</p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow mb-4">Explore</p>
          {nav.map((n) => <Link key={n.to} to={n.to} className="link-underline block w-fit text-ink-foreground/70 hover:text-ink-foreground">{n.label}</Link>)}
        </div>
        <div className="space-y-3 text-sm text-ink-foreground/70">
          <p className="eyebrow mb-4">Office</p>
          <p>Level 42, Boulevard Plaza<br />Downtown Dubai, UAE</p>
          <p>advisory@aureon.example</p>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-6 text-center text-xs tracking-[0.2em] text-ink-foreground/40">© 2026 AUREON ESTATES · DEMONSTRATION SITE</div>
    </footer>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();
  return (
    <motion.main key={path} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }}>
      {children}
    </motion.main>
  );
}

export function PageHero({ eyebrow, title, image, children }: { eyebrow: string; title: string; image: string; children?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative flex h-[62vh] min-h-[440px] items-end overflow-hidden bg-ink text-ink-foreground">
      <motion.img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" initial={reduce ? false : { scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }} />
      <div className="overlay-hero absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pb-16 lg:px-10">
        <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>{eyebrow}</motion.p>
        <h1 className="mt-4 max-w-4xl text-5xl leading-[1.05] md:text-7xl">
          {title.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span className="inline-block" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ delay: 0.2 + i * 0.07, duration: 1.1, ease }}>{w}&nbsp;</motion.span>
            </span>
          ))}
        </h1>
        {children}
      </div>
    </section>
  );
}
