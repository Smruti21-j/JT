import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import hireImg from "@/assets/page-hire.jpg";
import hireTeam from "@/assets/hire-team.jpg";
import hirePods from "@/assets/hire-pods.jpg";

const REASONS = [
  { n: "01", t: "Bespoke Engagement Models", d: "Engagement structures tailored to scope, velocity and risk profile." },
  { n: "02", t: "Effective Communication", d: "Daily standups, shared dashboards and a single point of accountability." },
  { n: "03", t: "Expert Talent with Experience", d: "Senior engineers vetted across multi-year delivery in production." },
  { n: "04", t: "Flexible & Scalable Approach", d: "Ramp up or down across pods without losing institutional context." },
  { n: "05", t: "Real-Time Monitoring", d: "Iterate weekly with transparent burn-down and quality signals." },
  { n: "06", t: "Lower Overhead Costs", d: "Skip recruiting, infra and management overhead — start in 7 days." },
];

const STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "React Native", "Flutter", "iOS Swift", "Android Kotlin",
  "AWS", "GCP", "Azure", "Postgres", "MongoDB", "Redis",
  "LangChain", "OpenAI", "Anthropic", "PyTorch",
];

export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Dedicated Talent — Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Hire dedicated web, mobile and AI talent. Increase your team strength with our team extension services and start in days.",
      },
      { property: "og:title", content: "Hire Dedicated Talent — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Become an extension of your team — bespoke engagement, expert talent, scalable pods.",
      },
    ],
  }),
});

function HirePage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      <AnimatedHero
        bgImage={hireImg}
        eyebrow="HIRE · EXTEND YOUR TEAM"
        title={
          <>
            Hire dedicated <em className="text-shimmer not-italic font-light">web, mobile & AI</em> talent.
          </>
        }
        description="Increase your team's strength and boost their innovativeness with our team extension services. We aim to become an integral part of your team and deliver software solutions alongside you."
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
        >
          Get in touch →
        </Link>
      </AnimatedHero>

      {/* Fill the gap — with image */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-6 reveal">
              <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
                WHY HIRE FROM JARVIS
              </p>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                Fill the gap. <em className="text-warm not-italic font-light">Skip the overhead.</em>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-xl">
                Plug in senior engineers, designers and AI specialists in days — not quarters.
                Our pods slot into your roadmap, sprint cadence and tooling without the recruiting,
                onboarding or management drag.
              </p>
            </div>
            <div className="lg:col-span-6 reveal">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 group">
                <img
                  src={hireTeam}
                  alt="Engineering team workspace"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105 animate-float-slow"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-primary/10" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {REASONS.map((r, i) => (
              <div
                key={r.n}
                className="bg-background p-8 reveal hover:bg-white/[0.03] transition-colors group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="text-warm font-display text-2xl mb-4 group-hover:translate-x-1 transition-transform">
                  [{r.n}]
                </div>
                <h3 className="font-display text-xl mb-2 group-hover:text-warm transition-colors">{r.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributed pods */}
      <section className="border-t border-white/5 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 reveal order-2 lg:order-1">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 group">
                <img
                  src={hirePods}
                  alt="Distributed engineering pods"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute -top-20 -left-10 h-60 w-60 bg-primary/30 blur-3xl animate-blob pointer-events-none" />
              </div>
            </div>
            <div className="lg:col-span-6 reveal order-1 lg:order-2">
              <p className="text-xs tracking-[0.3em] text-warm bracket-label mb-6">
                DISTRIBUTED PODS
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                One team, <em className="text-warm not-italic font-light">many time zones.</em>
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                A single point of accountability with talent stitched across India, EMEA and the
                Americas. Continuous progress, async-friendly delivery and weekly demos that turn
                your roadmap into shipped software.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              EXPERT TALENT — PLATFORM PROFICIENCY
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl">
              The stack we ship in <em className="text-warm not-italic font-light">production.</em>
            </h2>
          </div>
          <div className="reveal flex flex-wrap gap-3">
            {STACK.map((s, i) => (
              <span
                key={s}
                className="text-sm tracking-[0.1em] glass rounded-full px-5 py-2.5 text-muted-foreground hover:text-warm hover:border-warm/40 hover:-translate-y-0.5 transition-all"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="HIRE TALENT · START IN 7 DAYS"
        title={
          <>
            Plug in a pod that <em className="text-warm not-italic font-light">ships from week one.</em>
          </>
        }
        description="Tell us the role, the stack and the start date. We assemble a vetted pod and kick off in days."
        primaryLabel="Request talent →"
        secondaryLabel="Browse services"
      />
      <Footer />
    </main>
  );
}
