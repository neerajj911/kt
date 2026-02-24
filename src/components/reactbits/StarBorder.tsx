import React from "react";

type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties["animationDuration"];
  thickness?: number;
};

const StarBorder = <T extends React.ElementType = "button">({
  as,
  className = "",
  color = "hsl(var(--primary))",
  speed = "6s",
  thickness = 1,
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = (as ?? "button") as React.ElementType;

  return (
    <Component
      className={`relative inline-flex items-center justify-center ${className}`}
      {...rest}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ padding: thickness }}
      >
        <span className="absolute inset-0 overflow-hidden">
          {/* bottom sparkle pass */}
          <span
            className="absolute bottom-0 left-0 h-[2px] w-[140%] animate-star-movement-bottom opacity-70"
            style={{
              animationDuration: speed,
              background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 60%)`,
            }}
          />
          {/* top sparkle pass */}
          <span
            className="absolute top-0 left-0 h-[2px] w-[140%] animate-star-movement-top opacity-70"
            style={{
              animationDuration: speed,
              background: `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 60%)`,
            }}
          />
        </span>
      </span>

      <span className="relative z-10">{children}</span>
    </Component>
  );
};

export default StarBorder;

