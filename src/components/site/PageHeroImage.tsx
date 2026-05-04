type Props = {
  src: string;
  alt: string;
  caption?: string;
};

export function PageHeroImage({ src, alt, caption }: Props) {
  return (
    <div className="reveal mx-auto max-w-6xl px-6 mt-4 mb-16">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-[21/9]">
        <img
          src={src}
          alt={alt}
          width={1600}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1500ms] ease-out animate-float-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-20 mix-blend-overlay" />
        {caption && (
          <div className="absolute bottom-6 left-6 text-[11px] tracking-[0.3em] uppercase text-warm bracket-label">
            {caption}
          </div>
        )}
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-warm animate-pulse-glow" />
      </div>
    </div>
  );
}
