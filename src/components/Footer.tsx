const Footer = () => (
  <footer className="bg-background border-t border-border px-4 md:px-8 py-16">
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4">
          <span className="font-heading text-2xl tracking-widest uppercase">
            TITAN<span className="text-primary">DEMO</span>
          </span>
          <p className="text-muted-foreground text-sm mt-3 max-w-md leading-relaxed">
            Full‑service demolition, debris removal, scrap buying, and heavy machinery rental for
            industrial, commercial, and municipal sites. Safety-led planning, clean execution, and
            maximum material recovery.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Licensed", "Bonded", "Insured", "OSHA‑Compliant"].map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-heading tracking-[0.25em] uppercase text-muted-foreground border border-border/70 px-3 py-1 bg-secondary/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-muted-foreground">
          <div>
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase mb-3 text-foreground">
              Services
            </p>
            <ul className="space-y-2">
              <li>Building Demolition</li>
              <li>Debris Removal</li>
              <li>Scrap Buying</li>
              <li>Machinery Rental</li>
            </ul>
          </div>
          <div>
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase mb-3 text-foreground">
              Company
            </p>
            <ul className="space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#about">About</a></li>
              <li><a className="hover:text-primary transition-colors" href="#projects">Projects</a></li>
              <li><a className="hover:text-primary transition-colors" href="#clients">Partners</a></li>
              <li><a className="hover:text-primary transition-colors" href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase mb-3 text-foreground">
              Office
            </p>
            <p>4100 Industrial Way</p>
            <p>Dallas, TX 75201</p>
            <p className="mt-3">Mon–Fri: 7:00 – 18:00</p>
            <p>24/7 Emergency Response</p>
          </div>
          <div>
            <p className="font-heading text-[11px] tracking-[0.3em] uppercase mb-3 text-foreground">
              Contact
            </p>
            <p>+1 (555) 013-8800</p>
            <p>estimating@titandemo.com</p>
            <p className="mt-3">info@titandemo.com</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-t border-border/60 pt-6">
        <p className="text-muted-foreground text-[11px] tracking-wider">
          © {new Date().getFullYear()} TitanDemo Industries. All rights reserved.
        </p>
        <p className="text-muted-foreground text-[11px] tracking-wider">
          Safety Plans · Permit Support · Recycling Documentation · Site Security
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
