import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useScrollReveal, AnimatedCounter } from "@/lib/animations";

const stats = [
  { value: 500, suffix: "+", label: "Projects Completed" },
  { value: 15, suffix: "+", label: "Years in Business" },
  { value: 45000, suffix: "", label: "Tons Recycled" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

const Statistics = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="section-padding bg-card border-y border-border relative overflow-hidden" ref={ref}>
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="relative"
            >
              <AnimatedCounter end={s.value} suffix={s.suffix} />
              <p className="font-heading text-xs md:text-sm tracking-widest uppercase text-muted-foreground mt-2">
                {s.label}
              </p>
              {/* Divider between items (desktop) */}
              {i < stats.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-12 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default Statistics;
