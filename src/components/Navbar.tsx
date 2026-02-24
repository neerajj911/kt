import { CardNav } from "./reactbits/CardNav";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Machinery", href: "#machinery" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => (
  <CardNav
    brand="KALWAR"
    brandAccent="TRADERS"
    links={navLinks}
    ctaLabel="Get Quote"
    ctaHref="#contact"
  />
);

export default Navbar;
