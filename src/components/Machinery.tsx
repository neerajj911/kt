import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useScrollReveal } from "@/lib/animations";
import machineExcavator from "@/assets/machine-excavator.jpg";
import machineCrane from "@/assets/machine-crane.jpg";
import machineKomatsu from "@/assets/machine-komatsu.jpg";
import machineHauler from "@/assets/machine-hauler.jpg";
import machineBreaker from "@/assets/machine-breaker.jpg";
import machineHandler from "@/assets/machine-handler.jpg";
import { ChromaGrid } from "./reactbits/ChromaGrid";

const machines = [
  { name: "CAT 390F Excavator", purpose: "Large-scale demolition", desc: "80-ton hydraulic excavator with extended reach for high-rise demolition.", img: machineExcavator },
  { name: "Liebherr LTM 1300", purpose: "Heavy lifting & disassembly", desc: "300-ton mobile crane for precision lifting and structural element removal.", img: machineCrane },
  { name: "Komatsu PC210", purpose: "Mid-range demolition", desc: "Versatile 21-ton excavator fitted with crushers, shears, and grapples.", img: machineKomatsu },
  { name: "Volvo A40G Hauler", purpose: "Debris transport", desc: "40-ton articulated dump truck for efficient on-site and off-site hauling.", img: machineHauler },
  { name: "Atlas Copco HB 10000", purpose: "Concrete breaking", desc: "Hydraulic breaker attachment for reinforced concrete and rock demolition.", img: machineBreaker },
  { name: "Fuchs MHL 370", purpose: "Scrap handling", desc: "Material handler with magnet and grapple for scrap yard operations.", img: machineHandler },
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
        <motion.h2 variants={fadeUp} className="section-title mb-12">Heavy Machinery</motion.h2>

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
