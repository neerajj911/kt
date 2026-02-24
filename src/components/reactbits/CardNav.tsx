import { useState } from "react";
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
  const [active, setActive] = useState<string>(links[0]?.href ?? "#home");

  const handleNavClick = (href: string) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between gap-6">
        <a
          href="#home"
          className="relative inline-flex items-center gap-1.5"
        >
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-[0.10em] text-foreground uppercase">
            {brand}
          </span>
          <span className="font-heading text-2xl md:text-3xl font-bold tracking-[0.10em] text-primary uppercase ml-1">
            {brandAccent}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-heading text-[12px] tracking-[0.22em] uppercase transition-colors ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {ctaLabel && ctaHref && (
            <a href={ctaHref} className="btn-primary text-[12px] py-2 px-7">
              {ctaLabel}
            </a>
          )}
        </div>

        {/* mobile menu toggle */}
        <button
          className="md:hidden text-foreground"
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* dull background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/55 md:hidden"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="relative z-50 md:hidden bg-background/95 border-t border-border/80 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full rounded-lg border border-border/80 bg-secondary/60 px-4 py-3 font-heading text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-primary transition-colors"
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

