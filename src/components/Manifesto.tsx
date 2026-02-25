import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = [
  "We", "don't", "just", "tear", "things", "down.", "||",
  "We", "clear", "the", "way", "for", "what's", "next.", "||",
  "500+", "projects.", "Zero", "compromises.", "||",
  "Precision.", "Power.", "Purpose.",
];

/**
 * Scroll‑driven word‑highlight manifesto.
 * Each word transitions from muted → bright as you scroll through the section.
 * The "||" token creates a line break.
 */
const Manifesto = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.3"],
  });

  // Flatten words (exclude line‑break tokens for counting)
  const realWords = WORDS.filter((w) => w !== "||");
  const totalWords = realWords.length;

  let wordIndex = 0;

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-40 lg:py-52 px-4 md:px-8 overflow-hidden bg-background"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        <p className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] tracking-wide uppercase">
          {WORDS.map((token, i) => {
            if (token === "||") {
              return <br key={`br-${i}`} />;
            }

            const idx = wordIndex;
            wordIndex++;

            // Each word gets a portion of the scroll progress
            const start = idx / totalWords;
            const end = (idx + 1) / totalWords;

            return (
              <Word
                key={`${token}-${i}`}
                word={token}
                scrollProgress={scrollYProgress}
                range={[start, end]}
              />
            );
          })}
        </p>
      </div>
    </section>
  );
};

/* ── Single word that animates based on scroll position ── */
const Word = ({
  word,
  scrollProgress,
  range,
}: {
  word: string;
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) => {
  const opacity = useTransform(scrollProgress, range, [0.15, 1]);
  const color = useTransform(
    scrollProgress,
    range,
    ["hsl(220 10% 35%)", "hsl(0 0% 95%)"],
  );

  // Highlight numbers and strong words with primary
  const isPrimary = /^\d|precision|power|purpose|zero/i.test(word);

  const finalColor = useTransform(
    scrollProgress,
    range,
    isPrimary
      ? ["hsl(220 10% 35%)", "hsl(35 90% 55%)"]
      : ["hsl(220 10% 35%)", "hsl(0 0% 95%)"],
  );

  return (
    <motion.span
      style={{ opacity, color: finalColor }}
      className="inline-block mr-[0.3em] transition-none"
    >
      {word}
    </motion.span>
  );
};

export default Manifesto;
