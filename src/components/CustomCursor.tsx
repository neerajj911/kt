import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * Custom cursor — a small dot + larger ring that scales up over interactive elements.
 * Only rendered on pointer (non‑touch) devices.
 */
const CustomCursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only show on pointer devices
    const mql = window.matchMedia("(pointer: fine)");
    if (!mql.matches) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .card-hover, .card-industrial")
      ) {
        setHovered(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer, .card-hover, .card-industrial")
      ) {
        setHovered(false);
      }
    };
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    // RAF loop for smooth cursor follow
    let raf: number;
    const loop = () => {
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      // ring follows with slight lag
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[99990] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{
            width: hovered ? 10 : 6,
            height: hovered ? 10 : 6,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="rounded-full bg-white -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* Ring */}
      <div
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[99989] mix-blend-difference"
        style={{ willChange: "transform" }}
      >
        <motion.div
          animate={{
            width: hovered ? 56 : 36,
            height: hovered ? 56 : 36,
            borderWidth: hovered ? 2 : 1,
            opacity: hovered ? 1 : 0.5,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="rounded-full border-white -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </>
  );
};

export default CustomCursor;
