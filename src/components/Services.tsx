import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, useScrollReveal } from "@/lib/animations";
import { TiltedCard } from "./reactbits/TiltedCard";
import { TextScramble } from "./reactbits/TextScramble";
import serviceDebris from "@/assets/service-debris.jpg";
import serviceDemolition from "@/assets/service-demolition.jpg";
import serviceScrap from "@/assets/service-scrap.jpg";
import serviceMachinery from "@/assets/service-machinery.jpg";

const services = [
  {
    num: "01",
    title: "Debris Removal",
    img: serviceDebris,
    desc: "Fast, thorough site clearance for construction, renovation, and disaster recovery projects.",
    features: ["Same-day emergency service", "Residential & commercial", "Eco-friendly disposal", "Fully insured operations"],
  },
  {
    num: "02",
    title: "Building Demolition",
    img: serviceDemolition,
    desc: "Controlled structural demolition with precision engineering and strict safety protocols.",
    features: ["Selective & full demolition", "Implosion capability", "Asbestos abatement", "Permit management"],
  },
  {
    num: "03",
    title: "Scrap Buying",
    img: serviceScrap,
    desc: "Competitive pricing for ferrous and non-ferrous scrap metals. We handle pickup and processing.",
    features: ["Fair market pricing", "On-site pickup", "Certified weighing", "Instant payment"],
  },
  {
    num: "04",
    title: "Machinery Rental",
    img: serviceMachinery,
    desc: "Access our fleet of heavy machinery for your construction and demolition needs.",
    features: ["Excavators & cranes", "Operated or bare rental", "Flexible terms", "24/7 support"],
  },
];

const Services = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="services" className="section-padding" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">What We Do</motion.p>
        <motion.h2 variants={fadeUp} className="section-title section-title-gradient mb-10 md:mb-12"><TextScramble text="Our Services" /></motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {services.map((s) => (
            <motion.div
              key={s.num}
              variants={scaleIn}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <TiltedCard className="card-hover">
                <div className="aspect-[4/3] sm:aspect-square overflow-hidden relative">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5">
                  <span className="numbered-label">{s.num}</span>
                  <h3 className="font-heading text-lg tracking-wider mt-2 mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{s.desc}</p>
                  <ul className="space-y-1.5">
                    {s.features.map((f) => (
                      <li key={f} className="text-muted-foreground text-xs flex items-center gap-2">
                        <span className="w-1 h-1 bg-primary inline-block shrink-0 rotate-45" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
