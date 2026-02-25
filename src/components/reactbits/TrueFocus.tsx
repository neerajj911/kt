import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  words: string[];
  cycleDelay?: number;
  className?: string;
}

export const TrueFocus = ({ words, cycleDelay = 2400, className = "" }: TrueFocusProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;

    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, cycleDelay);

    return () => window.clearInterval(id);
  }, [cycleDelay, words.length]);

  return (
    <div className={`inline-flex items-center justify-start ${className}`}>
      <div className="relative px-3 py-2 sm:px-4 md:px-6 md:py-3 border border-primary/60 bg-background/60 backdrop-blur-sm">
        {/* focus brackets */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1 top-1 h-3 w-3 border-l border-t border-primary/80" />
          <div className="absolute right-1 top-1 h-3 w-3 border-r border-t border-primary/80" />
          <div className="absolute left-1 bottom-1 h-3 w-3 border-l border-b border-primary/80" />
          <div className="absolute right-1 bottom-1 h-3 w-3 border-r border-b border-primary/80" />
        </div>

        <div className="flex gap-2 md:gap-3 items-baseline">
          {words.map((word, index) => {
            const isActive = index === activeIndex;

            return (
              <motion.span
                key={word + index}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0.35,
                  filter: isActive ? "blur(0px)" : "blur(1.5px)",
                  scale: isActive ? 1.02 : 0.98,
                  y: isActive ? 0 : 1,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading uppercase tracking-[0.1em] sm:tracking-[0.14em] md:tracking-[0.18em] text-3xl sm:text-4xl md:text-6xl lg:text-8xl whitespace-nowrap"
              >
                {word}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

