interface LogoItem {
  name: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
}

export const LogoLoop = ({ logos }: LogoLoopProps) => {
  if (!logos.length) return null;

  const rows = [0, 1];

  return (
    <div className="relative overflow-hidden border border-border/80 bg-secondary/60 py-6 md:py-8">
      {rows.map((row) => (
        <div
          key={row}
          className="logo-loop-row"
          aria-hidden={row === 1}
        >
          {logos.map((logo) => (
            <div
              key={`${logo.name}-${row}`}
              className="flex items-center justify-center px-6 py-2 md:px-8 md:py-3 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm min-w-[160px]"
            >
              <span className="font-heading text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

