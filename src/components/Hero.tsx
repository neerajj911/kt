import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { fadeUp, staggerContainer, clipReveal } from "@/lib/animations";
import { TrueFocus } from "./reactbits/TrueFocus";
import StarBorder from "./reactbits/StarBorder";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroBg}
          alt="Demolition site with heavy machinery"
          className="w-full h-full object-cover scale-110"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3QgZmlsdGVyPSJ1cmwoI2EpIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIi8+PC9zdmc=')]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ opacity: textOpacity }}
        className="relative z-10 max-w-7xl mx-auto w-full px-4 md:px-8"
      >
        <motion.div variants={clipReveal} className="mb-4">
          <p className="section-subtitle text-primary text-xs sm:text-sm md:text-base flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="whitespace-nowrap">Demolition</span>
            <span className="opacity-60 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">Debris Removal</span>
            <span className="opacity-60 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">Scrap Buying</span>
            <span className="opacity-60 hidden sm:inline">•</span>
            <span className="whitespace-nowrap">Machinery Rental</span>
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-4">
          <TrueFocus
            words={["DEMOLISH", "REBUILD"]}
            className="drop-shadow-[0_0_40px_rgba(0,0,0,0.6)]"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-foreground/80 text-base md:text-lg max-w-xl mb-8 font-body leading-relaxed"
        >
          A new standard of industrial demolition and recycling. Powering clean,
          safe, and efficient site clearance across the nation.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
          <StarBorder as="a" href="#contact" className="btn-primary text-center" speed="5.5s">
            Get a Quote
          </StarBorder>
          <StarBorder as="a" href="#projects" className="btn-outline text-center" speed="7s" thickness={1}>
            View Projects
          </StarBorder>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-5 h-8 border border-foreground/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
