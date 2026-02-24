import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "./LogoLoopRB.css";

export interface LogoLoopItem {
  node: React.ReactNode;
}

interface LogoLoopRBProps {
  logos: LogoLoopItem[];
  speedSeconds?: number;
  gap?: number;
  logoHeight?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  className?: string;
  ariaLabel?: string;
}

export const LogoLoopRB = ({
  logos,
  speedSeconds = 18,
  gap = 28,
  logoHeight = 28,
  pauseOnHover = true,
  fadeOut = true,
  fadeOutColor,
  className = "",
  ariaLabel = "Partner logos",
}: LogoLoopRBProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [distance, setDistance] = useState(0);
  const [paused, setPaused] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const list = listRef.current;
    if (!container || !list) return;

    const compute = () => {
      // distance to move left to show the second copy seamlessly
      const listWidth = list.getBoundingClientRect().width;
      setDistance(-Math.ceil(listWidth));
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    ro.observe(list);
    return () => ro.disconnect();
  }, [logos.length, gap, logoHeight]);

  const rootClass = useMemo(() => {
    const base = ["logoloop", fadeOut ? "logoloop--fade" : null, className].filter(Boolean);
    return base.join(" ");
  }, [className, fadeOut]);

  if (!logos.length) return null;

  return (
    <div
      ref={containerRef}
      className={rootClass}
      aria-label={ariaLabel}
      data-paused={paused ? "true" : "false"}
      style={
        {
          "--logoloop-gap": `${gap}px`,
          "--logoloop-logoHeight": `${logoHeight}px`,
          "--logoloop-distance": `${distance}px`,
          ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : null),
        } as React.CSSProperties
      }
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        className="logoloop__track"
        data-anim="left"
        style={{ animationDuration: `${speedSeconds}s` }}
      >
        <div ref={listRef} className="logoloop__list" aria-hidden={false}>
          {logos.map((logo, idx) => (
            <div key={idx} className="logoloop__item">
              <div className="logoloop__node">{logo.node}</div>
            </div>
          ))}
        </div>
        {/* copy for seamless loop */}
        <div className="logoloop__list" aria-hidden>
          {logos.map((logo, idx) => (
            <div key={`copy-${idx}`} className="logoloop__item">
              <div className="logoloop__node">{logo.node}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

