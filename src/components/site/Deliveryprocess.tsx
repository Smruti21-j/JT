import { Sparkles, UserCheck } from "lucide-react";

const STAGES = [
  {
    n: "01",
    title: "Inquiry & Scoping",
    ai: "Instant requirement breakdown, effort & timeline estimates.",
    human: "Whether the idea is worth building at all.",
  },
  {
    n: "02",
    title: "Discovery & Architecture",
    ai: "Research synthesis, pattern matching from past builds.",
    human: "The architecture you'll live with for years.",
  },
  {
    n: "03",
    title: "Design",
    ai: "Rapid UI exploration, variants, accessibility checks.",
    human: "Whether it actually feels right to a real user.",
  },
  {
    n: "04",
    title: "Build",
    ai: "Codegen, scaffolding, test generation, refactors.",
    human: "Production-grade code review, security, scale.",
  },
  {
    n: "05",
    title: "QA",
    ai: "Automated test coverage, edge-case generation.",
    human: "Sign-off that it's genuinely done.",
  },
  {
    n: "06",
    title: "Delivery & Growth",
    ai: "Monitoring, anomaly detection, iteration speed.",
    human: "The roadmap that keeps you ahead.",
  },
];

export function DeliveryProcess() {
  return (
    <section className="relative py-32 border-t border-border overflow-hidden">
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative">
        <div className="reveal mb-20 max-w-3xl">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
            END-TO-END AI-POWERED DELIVERY
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
            AI runs through every step.
            <br />
            <em className="text-warm not-italic font-light">A senior human owns every one.</em>
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed text-base md:text-lg">
            From your first inquiry to final delivery, AI compresses the busywork at each
            stage. Here's where it speeds us up — and where judgment still calls the shots.
          </p>
        </div>

        {/* progress rail */}
        <div className="reveal relative mb-2 hidden md:block">
          <div className="absolute left-0 right-0 top-[13px] h-px bg-border" />
          <div className="grid grid-cols-6">
            {STAGES.map((s) => (
              <div key={s.n} className="flex justify-start">
                <span className="relative z-10 h-[27px] w-[27px] rounded-full border border-primary/50 bg-background flex items-center justify-center">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {STAGES.map((s, i) => (
            <div
              key={s.n}
              className="reveal group relative bg-background p-6 flex flex-col gap-5 transition-colors duration-500 hover:bg-muted/40"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div>
                <p className="text-[11px] tracking-[0.25em] text-muted-foreground mb-2">
                  STAGE {s.n}
                </p>
                <h3 className="font-display text-lg leading-tight">{s.title}</h3>
              </div>

              <div className="rounded-lg p-3.5" style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)" }}>
                <Sparkles className="h-3.5 w-3.5 text-warm mb-2" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground leading-relaxed">{s.ai}</p>
              </div>

              <div className="rounded-lg p-3.5 mt-auto glass">
                <UserCheck className="h-3.5 w-3.5 text-muted-foreground mb-2" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground leading-relaxed">{s.human}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}