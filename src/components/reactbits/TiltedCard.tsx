import { useRef } from "react";
import type { HTMLAttributes, MouseEvent } from "react";

type TiltedCardProps = HTMLAttributes<HTMLDivElement>;

export const TiltedCard = ({ className = "", children, ...rest }: TiltedCardProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, 0, 0)`;
  };

  const handleMouseLeave = () => {
    const element = ref.current;
    if (!element) return;
    element.style.transform = "rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative bg-card border border-border/60 overflow-hidden transition-transform duration-200 ease-out will-change-transform hover:border-primary/30 hover:shadow-[0_4px_60px_rgba(200,140,40,0.12)] ${className}`}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.12),_transparent_60%)] transition-opacity duration-500" />
      {children}
    </div>
  );
};

