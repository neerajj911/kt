import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Machinery from "@/components/Machinery";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Statistics from "@/components/Statistics";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";
import Manifesto from "@/components/Manifesto";

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <div className="hazard-stripe" />
    <About />
    <Manifesto />
    <SectionDivider />
    <Services />
    <Statistics />
    <SectionDivider flip />
    <Machinery />
    <SectionDivider />
    <Projects />
    <div className="glow-line" />
    <Clients />
    <SectionDivider flip />
    <Contact />
    <div className="hazard-stripe" />
    <Footer />
  </>
);

export default Index;
