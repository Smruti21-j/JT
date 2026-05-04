const INDUSTRIES = [
  "Retail & D2C",
  "E-commerce",
  "Fashion & Lifestyle",
  "Beauty & Wellness",
  "Healthcare",
  "Fintech",
  "BFSI",
  "Logistics",
  "SaaS",
  "Manufacturing",
  "Real Estate",
  "EdTech",
  "Hospitality",
  "Media & Entertainment",
  "Travel",
  "Food & Beverage",
];

export function Industries() {
  // duplicate for seamless marquee
  const row = [...INDUSTRIES, ...INDUSTRIES];
  return (
    <section className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-12">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              Global Footprint
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl">
              The Engine for Your <em className="text-warm not-italic font-light">Next Breakthrough.</em>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
            Forget the limits of your category. Bringing the experience of hundreds of global projects to your specific goals.
            From high-stakes regulated sectors to fast-moving consumer brands, we build the sovereign systems you need to win in an AI-first world.  
          </p>
        </div>
      </div>

      <div className="relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-3 animate-marquee w-max">
          {row.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-sm tracking-[0.15em] uppercase whitespace-nowrap glass rounded-full px-6 py-3 text-muted-foreground"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
