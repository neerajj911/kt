import { motion } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer, useScrollReveal } from "@/lib/animations";
import { TiltedCard } from "./reactbits/TiltedCard";
import { TextScramble } from "./reactbits/TextScramble";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const projects = [
  {
    img: project1,
    name: "Westfield Industrial Complex",
    location: "Dallas, TX",
    summary: "Complete demolition and site clearance of a 120,000 sq ft industrial facility. 92% material recovery rate achieved with zero safety incidents.",
  },
  {
    img: project2,
    name: "Metro Tower Deconstruction",
    location: "Chicago, IL",
    summary: "Selective demolition of a 6-story commercial building in downtown Chicago. Coordinated traffic management and noise abatement in dense urban area.",
  },
  {
    img: project3,
    name: "Greenfield Recycling Center",
    location: "Houston, TX",
    summary: "Processed 15,000 tons of mixed scrap from a decommissioned manufacturing plant. Materials sorted, graded, and sold to certified recyclers.",
  },
];

const Projects = () => {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="projects" className="section-padding" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">Portfolio</motion.p>
        <motion.h2 variants={fadeUp} className="section-title section-title-gradient mb-10 md:mb-12"><TextScramble text="Completed Projects" /></motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {projects.map((p) => (
            <motion.div key={p.name} variants={scaleIn}>
              <TiltedCard className="card-hover">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-primary text-xs font-heading tracking-widest uppercase">{p.location}</span>
                  <h3 className="font-heading text-xl tracking-wider mt-1 mb-3">{p.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.summary}</p>
                </div>
              </TiltedCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
