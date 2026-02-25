import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useScrollReveal } from "@/lib/animations";
import { ChromaGrid } from "./reactbits/ChromaGrid";
import { TextScramble } from "./reactbits/TextScramble";

const machines = [
  { name: "CAT 390F Excavator", purpose: "Large-scale demolition", desc: "80-ton hydraulic excavator with extended reach for high-rise demolition." },
  { name: "Liebherr LTM 1300", purpose: "Heavy lifting & disassembly", desc: "300-ton mobile crane for precision lifting and structural element removal." },
  { name: "Komatsu PC210", purpose: "Mid-range demolition", desc: "Versatile 21-ton excavator fitted with crushers, shears, and grapples." },
  { name: "Volvo A40G Hauler", purpose: "Debris transport", desc: "40-ton articulated dump truck for efficient on-site and off-site hauling." },
  { name: "Atlas Copco HB 10000", purpose: "Concrete breaking", desc: "Hydraulic breaker attachment for reinforced concrete and rock demolition." },
  { name: "Fuchs MHL 370", purpose: "Scrap handling", desc: "Material handler with magnet and grapple for scrap yard operations." },
];

const Machinery = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="machinery" className="section-padding bg-secondary" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">Our Fleet</motion.p>
        <motion.h2 variants={fadeUp} className="section-title section-title-gradient mb-10 md:mb-12"><TextScramble text="Heavy Machinery" /></motion.h2>

        <motion.div variants={fadeUp}>
          <ChromaGrid
            items={machines.map((m) => ({
              title: m.name,
              subtitle: m.purpose,
              description: m.desc,
            }))}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Machinery;
