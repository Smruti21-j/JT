import type { ReactNode } from "react";

type Props = {
  bgImage: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
};

/**
 * Cinematic hero with animated background image (ken-burns) + gradient veil + grid.
 * Used across services, hire, careers, about, contact, insights subpages.
 */
export function AnimatedHero({ bgImage, eyebrow, title, description, children }: Props) {
  return (
    <section className="relative pt-44 pb-24 overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${bgImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 grid-bg opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="absolute -top-40 right-10 h-80 w-[500px] rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-20 left-1/4 h-60 w-[400px] rounded-full bg-primary/10 blur-3xl animate-drift" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center reveal">
        <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
          {eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-[1.05]">
          {title}
        </h1>
        {description && (
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
