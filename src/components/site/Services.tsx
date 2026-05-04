import { Brain, Code2, Layers, LineChart, Smartphone, Sparkles, Settings, Rocket } from "lucide-react";

const SERVICES = [
  { icon: Brain, title: "Artificial Intelligence", desc: "Control of your first-party data to unlock lifetime value from your customers." },
  { icon: Layers, title: "Digital Transformation", desc: "Enabling businesses by leveraging technology and building a solid, sustained digital ecosystem." },
  { icon: Rocket, title: "Product Engineering", desc: "Driving value by engineering immersive digital products that support growth and differentiation." },
  { icon: Smartphone, title: "Application Development", desc: "Modern web, native and cross-platform apps with enterprise-grade mobility solutions." },
  { icon: Sparkles, title: "UI / UX", desc: "Building thousand tiny UX moments fueled by consistent rich UI and contemporary trends." },
  { icon: LineChart, title: "Performance & Growth", desc: "Programmes designed to optimise your digital platform through data-driven insights." },
  { icon: Code2, title: "Consulting", desc: "New strategies, technological innovation and a holistic approach to changing industry expectations." },
  { icon: Settings, title: "Managed Services", desc: "End-to-end application and infrastructure modernization with the support you need." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-20 text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
            WHAT WE DO
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            A full studio. <em className="text-warm not-italic font-light">Engineered for scale.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="group relative bg-background p-8 transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              </div>
              <div className="relative">
                <div className="h-11 w-11 rounded-lg glass flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors">
                  <s.icon className="h-5 w-5 text-warm" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
