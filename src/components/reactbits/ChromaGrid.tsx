interface ChromaGridItem {
  title: string;
  subtitle?: string;
  description: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
}

export const ChromaGrid = ({ items }: ChromaGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 group">
      {items.map((item) => (
        <div
          key={item.title}
          className="relative overflow-hidden border border-border/80 bg-card/80 aspect-square md:aspect-[4/3] transition-all duration-500 grayscale group-hover:grayscale-0 hover:scale-[1.01] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_45px_rgba(250,204,21,0.08)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,204,21,0.18),_transparent_55%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-transparent" />
          <div className="relative z-10 h-full flex flex-col justify-end p-6">
            {item.subtitle && (
              <p className="text-xs font-heading tracking-[0.25em] uppercase text-primary mb-1">
                {item.subtitle}
              </p>
            )}
            <h3 className="font-heading text-xl md:text-2xl tracking-wider mb-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

