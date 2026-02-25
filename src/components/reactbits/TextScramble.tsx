import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@&!%";
const pick = () => CHARS[Math.floor(Math.random() * CHARS.length)];

interface TextScrambleProps {
  text: string;
  /** Extra Tailwind classes applied to the wrapper <span> */
  className?: string;
  /** How fast each character resolves (ms) — lower = faster */
  speed?: number;
  /** Scramble cycles per character before it locks */
  cycles?: number;
}

/**
 * Renders text that "decodes" from random characters when it enters the viewport.
 * Designed for section headings — drops in as a replacement for static text.
 */
export const TextScramble = ({
  text,
  className = "",
  speed = 18,
  cycles = 2,
}: TextScrambleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState(text);
  const hasRun = useRef(false);

  const scramble = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    let resolved = 0;
    let tick = 0;
    let lastTime = 0;

    const loop = (time: number) => {
      if (!lastTime) lastTime = time;
      if (time - lastTime < speed) {
        requestAnimationFrame(loop);
        return;
      }
      lastTime = time;
      tick++;

      const next: string[] = [];
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          next.push(text[i]);
        } else if (i < resolved) {
          next.push(text[i]);
        } else {
          next.push(pick());
        }
      }
      setDisplayed(next.join(""));

      if (tick % cycles === 0) {
        // skip whitespace
        while (resolved < text.length && (text[resolved] === " " || text[resolved] === "\n")) {
          resolved++;
        }
        resolved++;
      }

      if (resolved >= text.length) {
        setDisplayed(text);
        return;
      }
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  }, [text, speed, cycles]);

  useEffect(() => {
    if (isInView) scramble();
  }, [isInView, scramble]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed}
    </span>
  );
};
