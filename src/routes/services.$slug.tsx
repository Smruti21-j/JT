import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import dataAiImg from "@/assets/service-data-ai.jpg";
import digitalImg from "@/assets/service-digital.jpg";
import productImg from "@/assets/service-product.jpg";
import appImg from "@/assets/service-app.jpg";
import uiuxImg from "@/assets/service-uiux.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import growthImg from "@/assets/service-growth.jpg";
import managedImg from "@/assets/service-managed.jpg";

type Detail = {
  slug: string;
  title: string;
  hero: string;
  eyebrow: string;
  intro: string;
  capabilities: { title: string; desc: string }[];
  approach: { step: string; title: string; desc: string }[];
  outcomes: string[];
  image: string;
};

const DETAILS: Record<string, Detail> = {
  "Artificial Intelligence": {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    hero: "Unlock significant business opportunities. Accelerate innovation at scale.",
    eyebrow: "SERVICE · 01",
    intro:
      "From first-party data foundations to fine-tuned generative AI — we engineer AI products that compound value over time.",
    capabilities: [
      { title: "Generative AI", desc: "Production LLM apps with retrieval, guardrails and evaluation." },
      { title: "Smart AI Assistant", desc: "Domain assistants grounded in your data and workflows." },
      { title: "AI Model Fine-tuning", desc: "Cost and latency optimised models for your specific tasks." },
      { title: "NLP & OCR", desc: "Document understanding, extraction and intelligent routing." },
      { title: "Sentiment & Chat Bots", desc: "Conversational interfaces that escalate with context." },
      { title: "Custom AI Apps", desc: "End-to-end AI products from prototype to scale." },
    ],
    approach: [
      { step: "01", title: "Discover", desc: "Map data, use cases and value drivers in 2 weeks." },
      { step: "02", title: "Prototype", desc: "Ship a usable AI v0 in 4 weeks for real users." },
      { step: "03", title: "Productionise", desc: "Evaluations, observability, cost guards." },
      { step: "04", title: "Scale", desc: "Iterate models and surfaces against business KPIs." },
    ],
    outcomes: ["3–10x faster knowledge work", "Lower CAC via personalisation", "New AI-native revenue lines"],
    image: dataAiImg,
  },
  "digital-transformation": {
    slug: "digital-transformation",
    title: "Digital Transformation",
    hero: "Drive a digital-first strategy across the enterprise.",
    eyebrow: "SERVICE · 02",
    intro:
      "Leading change enabled by technology — from enterprise architecture to cloud-native experiences.",
    capabilities: [
      { title: "Enterprise Mobility", desc: "Connected workflows on every device." },
      { title: "System Integration", desc: "ERP, CRM, commerce — wired up reliably." },
      { title: "Cloud Integration", desc: "Hybrid and multi-cloud connectivity." },
      { title: "Digital Experience", desc: "Customer-facing surfaces that perform." },
      { title: "Enterprise Architecture", desc: "Reference patterns that scale." },
      { title: "Application Modernization", desc: "Strangler patterns, no big-bang." },
    ],
    approach: [
      { step: "01", title: "Assess", desc: "Architecture and capability maturity baseline." },
      { step: "02", title: "Roadmap", desc: "Sequenced flights with clear ROI." },
      { step: "03", title: "Modernise", desc: "Ship in slices with safety nets." },
      { step: "04", title: "Operate", desc: "Run, observe and continuously improve." },
    ],
    outcomes: ["Faster release cadence", "Lower TCO", "Enterprise-grade resilience"],
    image: digitalImg,
  },
  "product-engineering": {
    slug: "product-engineering",
    title: "Product Engineering",
    hero: "Software product development for product-led growth.",
    eyebrow: "SERVICE · 03",
    intro:
      "From product assessment & design to platform engineering — we build digital products that drive growth and differentiation.",
    capabilities: [
      { title: "Product Assessment & Design", desc: "Vision, scope and technical feasibility." },
      { title: "Custom Product Development", desc: "Greenfield builds with senior pods." },
      { title: "Application Re-Engineering", desc: "Modernise without losing velocity." },
      { title: "Platform Engineering", desc: "Internal developer platforms." },
      { title: "DevOps", desc: "CI/CD, IaC and progressive delivery." },
      { title: "Quality Assurance", desc: "Automation pyramids that scale with you." },
    ],
    approach: [
      { step: "01", title: "Frame", desc: "Outcome → roadmap → MVP scope." },
      { step: "02", title: "Build", desc: "Senior engineers in 2-week iterations." },
      { step: "03", title: "Ship", desc: "Quality gates, feature flags, telemetry." },
      { step: "04", title: "Compound", desc: "Iterate against product analytics." },
    ],
    outcomes: ["Faster time-to-market", "Higher engineering throughput", "Lower defect escape rate"],
    image: productImg,
  },
  "application-development": {
    slug: "application-development",
    title: "Application Development",
    hero: "Bringing innovative products to market on every device and platform.",
    eyebrow: "SERVICE · 04",
    intro:
      "Mobile, web, cross-platform and PWAs — engineered for performance and delightful UX.",
    capabilities: [
      { title: "Mobile App Development", desc: "Native iOS & Android with deep integrations." },
      { title: "Responsive Web", desc: "Modern web stacks, edge-rendered." },
      { title: "Cross-Platform", desc: "React Native and Flutter at scale." },
      { title: "Progressive Web Apps", desc: "App-grade UX without the store." },
      { title: "API Development", desc: "Typed, documented, monitored." },
      { title: "Back-End", desc: "Reliable services with cost discipline." },
    ],
    approach: [
      { step: "01", title: "Define", desc: "User stories, design system, contracts." },
      { step: "02", title: "Design", desc: "High-fidelity flows in days, not weeks." },
      { step: "03", title: "Build", desc: "Pod-based delivery with weekly demos." },
      { step: "04", title: "Launch", desc: "Store releases, observability and iteration." },
    ],
    outcomes: ["Higher app-store ratings", "Lower crash rates", "Faster feature velocity"],
    image: appImg,
  },
  "ui-ux": {
    slug: "ui-ux",
    title: "UI / UX",
    hero: "Merging UX, CX and product experience into high-performing products.",
    eyebrow: "SERVICE · 05",
    intro:
      "Research-led UX with rich UI systems — building thousand tiny moments of delight.",
    capabilities: [
      { title: "Usability & UX Consulting", desc: "Audits and heuristics that move metrics." },
      { title: "UX Research", desc: "Qual & quant — clear hypotheses, real users." },
      { title: "User Experience", desc: "Information architecture & flows." },
      { title: "UX Design", desc: "Wireframes & interaction models." },
      { title: "UI Design", desc: "Component systems and motion." },
      { title: "UI/UX Design Team", desc: "Embedded design pods." },
    ],
    approach: [
      { step: "01", title: "Research", desc: "Listen → synthesise → frame." },
      { step: "02", title: "Design", desc: "Prototype, test, refine." },
      { step: "03", title: "System", desc: "Scalable components and tokens." },
      { step: "04", title: "Measure", desc: "Iterate against KPIs." },
    ],
    outcomes: ["Higher conversion", "Lower task time", "Brand consistency at scale"],
    image: uiuxImg,
  },
  consulting: {
    slug: "consulting",
    title: "Consulting",
    hero: "Partnering with leadership to bring enterprise-wide transformation to life.",
    eyebrow: "SERVICE · 06",
    intro:
      "Customer experience, technology, product and data strategy — pragmatic and outcome-driven.",
    capabilities: [
      { title: "Business & Stakeholder", desc: "Align goals across functions." },
      { title: "Customer Experience Strategy", desc: "Journey maps that ship." },
      { title: "Technology Strategy", desc: "Stack, build vs buy, talent." },
      { title: "Product Strategy", desc: "Vision, bets, roadmap." },
      { title: "Data Strategy", desc: "From source of truth to AI readiness." },
      { title: "Product Roadmapping", desc: "Sequenced and resourced." },
    ],
    approach: [
      { step: "01", title: "Listen", desc: "Workshops, interviews, data dive." },
      { step: "02", title: "Frame", desc: "Crisp problem statements." },
      { step: "03", title: "Decide", desc: "Options with trade-offs." },
      { step: "04", title: "Activate", desc: "Plans the team can execute." },
    ],
    outcomes: ["Decision velocity", "Resource clarity", "Aligned teams"],
    image: consultingImg,
  },
  "performance-growth": {
    slug: "performance-growth",
    title: "Performance & Growth",
    hero: "Continuous improvement programmes powered by data.",
    eyebrow: "SERVICE · 07",
    intro:
      "Experimentation, personalisation and BI — turning analytics into compounding outcomes.",
    capabilities: [
      { title: "Experience Optimisation", desc: "A/B and multivariate at scale." },
      { title: "Personalisation", desc: "Audience-aware experiences." },
      { title: "Continuous Improvement", desc: "Weekly ship cadence." },
      { title: "Tracking & Analytics", desc: "Clean event taxonomies." },
      { title: "SEO", desc: "Tech, content and authority." },
      { title: "BI & Dashboards", desc: "Decision-grade reporting." },
    ],
    approach: [
      { step: "01", title: "Instrument", desc: "Get the data right." },
      { step: "02", title: "Hypothesise", desc: "Bets ranked by ICE." },
      { step: "03", title: "Experiment", desc: "Ship and learn weekly." },
      { step: "04", title: "Scale", desc: "Productise winners." },
    ],
    outcomes: ["+CR / -CAC", "Compounding learnings", "Operational clarity"],
    image: growthImg,
  },
  "managed-services": {
    slug: "managed-services",
    title: "Managed Services",
    hero: "Keep IT secure, reliable and efficient — 24/7.",
    eyebrow: "SERVICE · 08",
    intro:
      "From application modernization to cloud and 24/7 operations — we run what we build.",
    capabilities: [
      { title: "Application Modernization", desc: "Continuous refactor, not big bangs." },
      { title: "DevOps", desc: "Pipelines, IaC, progressive delivery." },
      { title: "Cloud", desc: "AWS / GCP / Azure architecture." },
      { title: "Hosting & Infrastructure", desc: "Cost & performance optimised." },
      { title: "IT Operations & Support", desc: "L1 → L3 with SLAs." },
      { title: "Cybersecurity & Compliance", desc: "Hardening and audits." },
    ],
    approach: [
      { step: "01", title: "Onboard", desc: "Runbooks, baselines, access." },
      { step: "02", title: "Stabilise", desc: "Quick-wins on reliability." },
      { step: "03", title: "Optimise", desc: "Cost, perf, security." },
      { step: "04", title: "Evolve", desc: "Roadmap-driven improvements." },
    ],
    outcomes: ["Higher uptime", "Lower MTTR", "Predictable spend"],
    image: managedImg,
  },
};

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const detail = DETAILS[params.slug];
    if (!detail) throw notFound();
    return { detail };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.detail.title} — Jarvis Technolabs` },
          { name: "description", content: loaderData.detail.hero },
          { property: "og:title", content: `${loaderData.detail.title} — Jarvis Technolabs` },
          { property: "og:description", content: loaderData.detail.hero },
          { property: "og:image", content: loaderData.detail.image },
          { name: "twitter:image", content: loaderData.detail.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">404</p>
          <h1 className="font-display text-5xl mb-4">Service not found</h1>
          <Link to="/services" className="text-warm hover:underline">← Back to all services</Link>
        </div>
      </div>
    </main>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  useReveal();
  const { detail } = Route.useLoaderData();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <AnimatedHero
        bgImage={detail.image}
        eyebrow={detail.eyebrow}
        title={
          <>
            {detail.title.split(" ").slice(0, -1).join(" ")}{" "}
            <em className="text-shimmer not-italic font-light">
              {detail.title.split(" ").slice(-1).join(" ")}
            </em>
          </>
        }
        description={detail.hero}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
        >
          Start a conversation →
        </Link>
      </AnimatedHero>

      <section className="section-light border-t border-black/5">
        <div className="mx-auto max-w-5xl px-6 py-24 reveal">
          <p className="text-xs tracking-[0.3em] bracket-label mb-6 text-muted-foreground">
            OVERVIEW
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
            {detail.intro}
          </h2>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              CAPABILITIES
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              What we deliver.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {detail.capabilities.map((c) => (
              <div key={c.title} className="bg-background p-8 reveal">
                <h3 className="font-display text-xl mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14">
            <p className="text-xs tracking-[0.3em] bracket-label mb-6 text-muted-foreground">
              OUR APPROACH
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              How we ship.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.approach.map((s) => (
              <div key={s.step} className="reveal border border-black/10 rounded-2xl p-8 bg-white">
                <div className="text-warm font-display text-3xl mb-4">{s.step}</div>
                <h3 className="font-display text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-24 reveal">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
            OUTCOMES
          </p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-10">
            Measured by what <em className="text-warm not-italic font-light">moves the business.</em>
          </h2>
          <ul className="grid md:grid-cols-3 gap-6">
            {detail.outcomes.map((o) => (
              <li key={o} className="border border-white/10 rounded-2xl p-6 bg-gradient-to-b from-white/[0.03] to-transparent">
                <span className="text-warm">★</span>
                <p className="mt-3 text-foreground">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
