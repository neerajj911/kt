import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, slideInLeft, slideInRight, useScrollReveal } from "@/lib/animations";
import { Phone, Mail, MapPin } from "lucide-react";
import StarBorder from "./reactbits/StarBorder";

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
    alert("Thank you! We'll be in touch shortly.");
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
        <motion.h2 variants={fadeUp} className="section-title mb-12">Contact Us</motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div variants={slideInLeft} className="space-y-8">
            <div className="flex items-start gap-4">
              <Phone className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Phone</h4>
                <p className="text-muted-foreground text-sm">(555) 234-5678</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Email</h4>
                <p className="text-muted-foreground text-sm">info@titandemo.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-primary mt-1 shrink-0" size={20} />
              <div>
                <h4 className="font-heading tracking-wider text-sm uppercase mb-1">Address</h4>
                <p className="text-muted-foreground text-sm">4200 Industrial Blvd, Suite 100<br />Dallas, TX 75212</p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form variants={slideInRight} onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <input
              type="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
            />
            <StarBorder type="submit" className="btn-primary w-full sm:w-auto" speed="5.5s">
              Send Message
            </StarBorder>
          </motion.form>
        </div>

        <motion.div variants={fadeUp} className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <p className="font-heading tracking-wider text-sm uppercase">Map</p>
              <p className="text-muted-foreground text-sm">
                {geo ? "Showing your current location." : "Showing our office location."}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" onClick={handleUseMyLocation} className="btn-outline py-2 px-5">
                Use My Location
              </button>
              {geo && (
                <button type="button" onClick={() => setGeo(null)} className="btn-outline py-2 px-5">
                  Reset
                </button>
              )}
            </div>
          </div>
          {geoError && <p className="text-sm text-muted-foreground mb-3">{geoError}</p>}
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
