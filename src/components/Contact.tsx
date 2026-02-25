import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft, slideInRight, useScrollReveal } from "@/lib/animations";
import { Phone, Mail, MapPin } from "lucide-react";
import StarBorder from "./reactbits/StarBorder";
import { toast } from "@/components/ui/sonner";
import { TextScramble } from "./reactbits/TextScramble";

const Contact = () => {
  const { ref, isInView } = useScrollReveal();
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [geo, setGeo] = useState<{ lat: number; lng: number } | null>(null);
  const [geoError, setGeoError] = useState<string | null>(null);

  const mapSrc = useMemo(() => {
    if (geo) {
      return `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=15&output=embed`;
    }
    const address = encodeURIComponent("4200 Industrial Blvd, Suite 100, Dallas, TX 75212");
    return `https://www.google.com/maps?q=${address}&z=14&output=embed`;
  }, [geo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent", {
      description: "Thanks for reaching out. We’ll be in touch shortly.",
    });
    setFormData({ name: "", phone: "", email: "", message: "" });
  };

  const handleUseMyLocation = () => {
    setGeoError(null);
    if (!("geolocation" in navigator)) {
      setGeoError("Geolocation isn’t available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        setGeoError("Location permission denied. Showing our office location instead.");
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    );
  };

  return (
    <section id="contact" className="section-padding bg-secondary" ref={ref}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto"
      >
        <motion.p variants={fadeUp} className="section-subtitle text-primary">Get in Touch</motion.p>
        <motion.h2 variants={fadeUp} className="section-title section-title-gradient mb-10 md:mb-12"><TextScramble text="Contact Us" /></motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div variants={slideInLeft} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border border-primary/30 bg-primary/5">
                <Phone className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Phone</h4>
                <p className="text-muted-foreground text-sm">(555) 234-5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border border-primary/30 bg-primary/5">
                <Mail className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">info@kalwartraders.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 border border-primary/30 bg-primary/5">
                <MapPin className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Address</h4>
                <p className="text-muted-foreground text-sm">4200 Industrial Blvd, Suite 100<br />Dallas, TX 75212</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={slideInRight} onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="contact-name" className="sr-only">Full Name</label>
            <input
              id="contact-name"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-card border border-border/60 border-l-2 border-l-primary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <label htmlFor="contact-phone" className="sr-only">Phone Number</label>
            <input
              id="contact-phone"
              type="tel"
              placeholder="Phone Number"
              autoComplete="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-card border border-border/60 border-l-2 border-l-primary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <label htmlFor="contact-email" className="sr-only">Email Address</label>
            <input
              id="contact-email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-card border border-border/60 border-l-2 border-l-primary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
            />
            <label htmlFor="contact-message" className="sr-only">Your Message</label>
            <textarea
              id="contact-message"
              placeholder="Your Message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-card border border-border/60 border-l-2 border-l-primary/40 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all resize-none"
            />
            <StarBorder type="submit" className="btn-primary w-full sm:w-auto" speed="5.5s">
              Send Message
            </StarBorder>
          </motion.form>
        </div>

        <motion.div variants={fadeUp} className="mt-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div>
              <p className="font-heading tracking-wider text-sm uppercase">Map</p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {geo ? "Showing your current location." : "Showing our office location."}
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button type="button" onClick={handleUseMyLocation} className="btn-outline py-2 px-4 sm:px-5 text-xs">
                Use My Location
              </button>
              {geo && (
                <button type="button" onClick={() => setGeo(null)} className="btn-outline py-2 px-4 sm:px-5 text-xs">
                  Reset
                </button>
              )}
            </div>
          </div>
          {geoError && <p className="text-sm text-muted-foreground mb-3" role="status" aria-live="polite">{geoError}</p>}
          <div className="overflow-hidden border border-border bg-card/40">
            <iframe
              title="Google Map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[320px] md:h-[420px]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
