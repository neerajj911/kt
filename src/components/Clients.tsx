import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useScrollReveal } from "@/lib/animations";
import { TiltedCard } from "./reactbits/TiltedCard";
import { LogoLoopRB } from "./reactbits/LogoLoopRB";

const partners = [
  { name: "Urban Build Group", sector: "Commercial Construction", initials: "UB" },
  { name: "Metro Municipality", sector: "Municipal Works", initials: "MM" },
  { name: "Ironclad Steel", sector: "Steel & Fabrication", initials: "IS" },
  { name: "Northridge Developers", sector: "Real Estate Development", initials: "ND" },
  { name: "Prime Construct", sector: "Infrastructure", initials: "PC" },
  { name: "Global Logistics", sector: "Industrial Logistics", initials: "GL" },
  { name: "Central Rail Authority", sector: "Transport & Rail", initials: "CR" },
  { name: "Skyline Hotels", sector: "Hospitality", initials: "SH" },
];

const Clients = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="clients" className="section-padding bg-secondary" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">
          Trusted Partners
        </motion.p>
        <motion.h2 variants={fadeUp} className="section-title mb-6">
          Clients &amp; Partners
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed mb-10"
        >
          We partner with leading contractors, municipalities, and industrial operators to deliver
          safe, efficient demolition and material recovery on complex, time-sensitive sites.
        </motion.p>

        <motion.div variants={fadeUp} className="mb-8">
          <LogoLoopRB
            logos={partners.map((p) => ({
              node: (
                <div className="flex items-center gap-3 px-5 py-2 rounded-full border border-border/70 bg-background/40 backdrop-blur-sm">
                  <span className="h-8 w-8 rounded-md bg-primary/10 border border-primary/40 flex items-center justify-center font-heading text-xs tracking-[0.2em] text-primary">
                    {p.initials}
                  </span>
                  <span className="font-heading text-[11px] tracking-[0.25em] uppercase text-muted-foreground whitespace-nowrap">
                    {p.name}
                  </span>
                </div>
              ),
            }))}
            speedSeconds={22}
            gap={18}
            logoHeight={28}
            pauseOnHover
            fadeOut
            fadeOutColor="hsl(var(--secondary))"
          />
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Clients;

