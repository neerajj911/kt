import { motion } from "framer-motion";
import { fadeUp, staggerContainer, useScrollReveal } from "@/lib/animations";
import { Shield, Clock, Recycle, ThumbsUp } from "lucide-react";
import { TextScramble } from "./reactbits/TextScramble";

const reasons = [
  { icon: Shield, title: "Safety First", desc: "Strict OSHA compliance and zero-incident track record on every site." },
  { icon: Clock, title: "On-Time Delivery", desc: "We meet deadlines consistently with precise project planning." },
  { icon: Recycle, title: "Eco-Friendly", desc: "Up to 95% of materials recycled, minimizing landfill impact." },
  { icon: ThumbsUp, title: "Trusted by Industry", desc: "Preferred contractor for municipal and commercial clients." },
];

const About = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" className="section-padding bg-secondary" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">About Us</motion.p>
        <motion.h2 variants={fadeUp} className="section-title section-title-gradient mb-6 md:mb-8">
          <TextScramble text="15+ Years of" /><br /><TextScramble text="Industrial Excellence" />
        </motion.h2>
        <motion.p variants={fadeUp} className="text-muted-foreground max-w-2xl text-sm md:text-base leading-relaxed mb-8 md:mb-12">
          Kalwar Traders is a full-service demolition, debris removal, and scrap recycling company. 
          Founded in 2009, we've completed over 500 projects across commercial, industrial, and 
          residential sectors. Our mission is to deliver safe, efficient site solutions while 
          maximizing material recovery and minimizing environmental impact.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              className="card-industrial p-6 card-hover"
            >
              <r.icon className="text-primary mb-4" size={28} strokeWidth={1.5} />
              <h3 className="font-heading text-xl tracking-wider mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
