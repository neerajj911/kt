import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── characters used for the scramble decode ── */
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&!?<>/\\|{}[]";
const pick = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

/**
 * Cinematic brand preloader:
 *  1. Black screen → glitch‑decode "KALWAR TRADERS" letter by letter
 *  2. Hazard stripe wipe reveals
 *  3. Everything slides away to show the page
 */
const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const BRAND = "KALWAR";
  const ACCENT = "TRADERS";
  const FULL = `${BRAND} ${ACCENT}`;

  const [displayed, setDisplayed] = useState(() => Array(FULL.length).fill(""));
  const [phase, setPhase] = useState<"decode" | "hold" | "exit">("decode");
  const resolved = useRef(0);
  const rafId = useRef(0);

  /* ── decode animation ── */
  const decode = useCallback(() => {
    const STEP_MS = 22; // ms between each character resolve
    const SCRAMBLE_TICKS = 3; // scramble cycles before locking a char
    let tick = 0;
    let lastTime = 0;

    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      if (time - lastTime < STEP_MS) {
        rafId.current = requestAnimationFrame(loop);
        return;
      }
      lastTime = time;
      tick++;

      setDisplayed((prev) => {
        const next = [...prev];
        for (let i = 0; i < FULL.length; i++) {
          if (i < resolved.current) {
            next[i] = FULL[i]; // already locked
          } else if (FULL[i] === " ") {
            next[i] = " ";
          } else {
            next[i] = pick(); // scramble
          }
        }
        return next;
      });

      // every SCRAMBLE_TICKS, lock the next character
      if (tick % SCRAMBLE_TICKS === 0 && resolved.current < FULL.length) {
        // skip spaces
        while (resolved.current < FULL.length && FULL[resolved.current] === " ") {
          resolved.current++;
        }
        resolved.current++;
      }

      if (resolved.current >= FULL.length) {
        setDisplayed(FULL.split(""));
        setPhase("hold");
        return;
      }

      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  }, [FULL]);

  useEffect(() => {
    // small delay before starting the decode
    const t = setTimeout(decode, 300);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(rafId.current);
    };
  }, [decode]);

  useEffect(() => {
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("exit"), 350);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null /* keep mounted until animation ends */}
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        animate={phase === "exit" ? { opacity: 0, scale: 0.97 } : { opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background"
      >
        {/* Scanline overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
          }}
        />

        {/* Brand text */}
        <div className="relative">
          <p
            className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-[0.15em] uppercase select-none"
            aria-label={FULL}
          >
            {displayed.map((char, i) => {
              const isBrand = i < BRAND.length;
              const isSpace = FULL[i] === " ";
              const isResolved = i < resolved.current || phase !== "decode";
              return (
                <span
                  key={i}
                  className={`inline-block transition-colors duration-150 ${
                    isSpace
                      ? "w-3 md:w-5"
                      : isResolved
                        ? isBrand
                          ? "text-foreground"
                          : "text-primary"
                        : "text-primary/40"
                  }`}
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    minWidth: isSpace ? undefined : "0.6em",
                    textAlign: "center",
                  }}
                >
                  {isSpace ? "\u00A0" : char}
                </span>
              );
            })}
          </p>

          {/* Underline wipe */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              phase === "hold" || phase === "exit"
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="h-0.5 md:h-1 bg-primary origin-left mt-2"
          />
        </div>

        {/* Tagline fades in after decode */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={
            phase === "hold" || phase === "exit"
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 8 }
          }
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-body text-muted-foreground text-xs sm:text-sm tracking-[0.25em] uppercase mt-4"
        >
          Demolition &middot; Debris &middot; Scrap &middot; Machinery
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default Preloader;
