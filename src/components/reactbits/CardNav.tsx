import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

interface CardNavProps {
  brand: string;
  brandAccent: string;
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

export const CardNav = ({ brand, brandAccent, links, ctaLabel, ctaHref }: CardNavProps) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>(links[0]?.href ?? "#home");
  const navRef = useRef<HTMLElement>(null);

  /* ---- scroll shadow ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- active section spy ---- */
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [links]);

  /* ---- body scroll lock + Escape + hash change ---- */
  useEffect(() => {
    if (!open) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onHash = () => setOpen(false);

    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      document.body.style.overflow = orig;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  /* ---- close drawer on desktop resize ---- */
  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setActive(href);
    setOpen(false);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 9999 }}
      className={`border-b transition-colors duration-300 ${
        scrolled
          ? "border-border/70 bg-background shadow-lg shadow-black/20 md:bg-background/90 md:backdrop-blur-xl"
          : "border-transparent bg-background/70 md:bg-transparent md:backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16 md:h-[72px]">
        {/* ---- brand ---- */}
        <a
          href="#home"
          className="inline-flex items-center gap-1 whitespace-nowrap"
          onClick={() => setOpen(false)}
        >
          <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.1em] text-foreground uppercase">
            {brand}
          </span>
          <span className="font-heading text-xl sm:text-2xl md:text-3xl font-semibold tracking-[0.1em] text-primary uppercase ml-0.5 md:ml-1.5">
            {brandAccent}
          </span>
        </a>

        {/* ---- desktop links ---- */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative font-heading text-[11px] lg:text-[12px] tracking-[0.22em] uppercase transition-colors py-1 ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {ctaLabel && ctaHref && (
            <a href={ctaHref} className="btn-primary text-[11px] py-2 px-6">
              {ctaLabel}
            </a>
          )}
        </div>

        {/* ---- hamburger ---- */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 -mr-2 rounded-md border border-border bg-background text-foreground active:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ position: "relative", zIndex: 10000 }}
          aria-label="Toggle navigation"
          aria-expanded={open}
          aria-controls="mobile-nav-drawer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ---- mobile drawer ---- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 md:hidden"
              style={{ zIndex: 9997 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-0 right-0 md:hidden bg-background border-t border-border overflow-y-auto"
              style={{ top: "100%", zIndex: 9998, maxHeight: "calc(100dvh - 4rem)" }}
            >
              <div className="px-4 py-4 flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`w-full rounded-lg border px-4 py-3 font-heading text-xs tracking-[0.22em] uppercase transition-colors ${
                      active === link.href
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-secondary/60 text-muted-foreground active:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
                {ctaLabel && ctaHref && (
                  <a
                    href={ctaHref}
                    onClick={() => setOpen(false)}
                    className="btn-primary text-[11px] w-full mt-1 text-center"
                  >
                    {ctaLabel}
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

