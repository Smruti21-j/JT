import { Bot, Brain, Database, Eye, MessageSquare, Network, Sparkles, Workflow } from "lucide-react";

const AI_CAPS = [
  { icon: Brain, title: "Generative AI", desc: "RAG pipelines, agentic workflows and fine-tuned models built on your proprietary data." },
  { icon: MessageSquare, title: "Conversational AI", desc: "Multilingual voice and chat agents with sub-second latency and brand-safe personality." },
  { icon: Eye, title: "Computer Vision", desc: "Visual quality control, in-store analytics and document intelligence at scale." },
  { icon: Workflow, title: "AI Automation", desc: "Agent swarms that coordinate across CRM, ERP and commerce stacks autonomously." },
  { icon: Database, title: "Data Engineering", desc: "Lakehouse, feature stores and real-time streaming ready for AI consumption." },
  { icon: Network, title: "MLOps & LLMOps", desc: "Production guardrails, eval harnesses, observability and continuous model delivery." },
  { icon: Bot, title: "Custom Copilots", desc: "Internal copilots wired to SOPs, CRMs and your knowledge graph for measurable lift." },
  { icon: Sparkles, title: "AI Strategy", desc: "Opportunity mapping, ROI modelling and a 90-day plan from idea to in-production." },
];

export function AICapabilities() {
  return (
    <section className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              AI CAPABILITIES
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              An <em className="text-warm not-italic font-light">AI-native</em> studio<br />
              for the post-software era.
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            We don't bolt AI on top of legacy products. We rebuild capabilities around models,
            agents and data — so every workflow you ship gets smarter the longer it runs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {AI_CAPS.map((c) => (
            <div
              key={c.title}
              className="group relative bg-background p-8 transition-all duration-500 hover:bg-white/[0.02]"
            >
              <div className="h-11 w-11 rounded-lg glass flex items-center justify-center mb-6 group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors">
                <c.icon className="h-5 w-5 text-warm" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
