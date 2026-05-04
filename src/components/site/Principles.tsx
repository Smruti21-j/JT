const PRINCIPLES = [
  {
    n: "01",
    title: "Client Obsession",
    body: "Every decision starts with the client outcome. We measure success by the transformation we deliver — not the deliverables we produce.",
  },
  {
    n: "02",
    title: "Hire & Train Exceptional Talent",
    body: "We seek AI-native minds combined with seasoned practitioners. Our teams don't just use AI tools — they think in AI-native paradigms.",
  },
  {
    n: "03",
    title: "Document to Scale",
    body: "Excellence in everything we build. We document our work, codify our learnings and scale our successes systematically.",
  },
  {
    n: "04",
    title: "80% Work In 20% Time",
    body: "Hyper-productivity through AI leverage. We amplify human capabilities and deliver exponentially more value in less time.",
  },
  {
    n: "05",
    title: "Only Ever Be Honest",
    body: "Unbiased perspective drives genuine transformation. We tell you what you need to hear — not what you want to hear.",
  },
];

export function Principles() {
  return (
    <section className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="absolute -top-32 right-1/4 h-72 w-72 bg-primary/10 blur-3xl animate-blob pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-64 w-64 bg-primary/[0.06] blur-3xl animate-drift pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="reveal mb-20">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
            OUR PRINCIPLES
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight max-w-3xl">
            How we <em className="text-warm not-italic font-light">build</em>, every single day.
          </h2>
        </div>

        <div className="space-y-px bg-white/5 border-y border-white/5">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.n}
              className="group reveal grid md:grid-cols-12 gap-6 bg-background py-10 md:py-14 px-2 md:px-6 transition-all hover:bg-white/[0.03] hover:pl-6 md:hover:pl-10"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="md:col-span-2 text-warm font-display text-2xl group-hover:translate-x-1 transition-transform">
                [{p.n}]
              </div>
              <h3 className="md:col-span-4 font-display text-3xl md:text-4xl tracking-tight group-hover:text-warm transition-colors">
                {p.title}
              </h3>
              <p className="md:col-span-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
