/** Angled section break with hazard‑stripe accent */
const SectionDivider = ({ flip = false, className = "" }: { flip?: boolean; className?: string }) => (
  <div
    className={`relative w-full h-12 md:h-20 overflow-hidden ${className}`}
    aria-hidden
  >
    {/* Angled background slice */}
    <div
      className="absolute inset-0 bg-background"
      style={{
        clipPath: flip
          ? "polygon(0 0, 100% 40%, 100% 100%, 0 100%)"
          : "polygon(0 0, 100% 0, 100% 100%, 0 60%)",
      }}
    />
    {/* Hazard stripe accent along the angle */}
    <div
      className="absolute left-0 right-0 h-1 md:h-1.5"
      style={{
        top: flip ? undefined : "auto",
        bottom: flip ? undefined : "35%",
        ...(flip ? { top: "35%" } : {}),
        background:
          "repeating-linear-gradient(-45deg, hsl(var(--primary)) 0px, hsl(var(--primary)) 8px, transparent 8px, transparent 16px)",
        opacity: 0.7,
      }}
    />
  </div>
);

export default SectionDivider;
