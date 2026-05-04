import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Principles } from "@/components/site/Principles";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import aboutImg from "@/assets/page-about.jpg";

const LEADERS = [
  { name: "Joyal J", role: "Managing Director", initial: "J" },
  { name: "Jainam", role: "Chief Technology Officer", initial: "J" },
  { name: "Heet", role: "Chief Operating Officer", initial: "H" },
];

const VMV = [
  {
    label: "Vision",
    body: "To earn the lifetime loyalty of our customers by consistently delivering the highest quality software services which offer excellent value to their business.",
  },
  {
    label: "Mission",
    body: "To enable businesses to leverage the power of digital innovation — by envisioning & building disruptive software products, services and experiences which drive growth, differentiation and real economic value.",
  },
  {
    label: "Values",
    body: "Our values reflect our brand ethos and help us operate with ethics, integrity, trust and dignity — with our partners, affiliates, customers and employees.",
  },
];

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Empowering innovation with excellence. A trusted Digital Engineering and Enterprise Modernization partner with 8.5+ years and 150+ success stories.",
      },
      { property: "og:title", content: "About — Jarvis Technolabs" },
      {
        property: "og:description",
        content:
          "We are not different. We lead by creating a difference — engineering ideas to improvise lives.",
      },
    ],
  }),
});

function AboutPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <AnimatedHero
        bgImage={aboutImg}
        eyebrow="ABOUT US"
        title={
          <>
            Empowering innovation <br />
            with <em className="text-shimmer not-italic font-light">excellence.</em>
          </>
        }
        description="The embodiment of customer-centric excellence, drive for sustainability and outstanding corporate citizenship."
      />

      {/* Lead paragraph */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-24 reveal">
          <p className="text-xs tracking-[0.3em] text-warm bracket-label mb-6">OUR STORY</p>
          <h2 className="font-display text-3xl md:text-5xl tracking-tight leading-tight">
            We are not different. <em className="text-warm not-italic font-light">We lead by creating a difference.</em>
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-3xl">
            Engineering ideas to improvise lives, Jarvis Technolabs over the past years has empowered
            ambitious change-makers around the world with sustained digital capabilities. We are a
            trusted Digital Engineering and Enterprise Modernization partner with offerings that
            enable our clients by creating a unique advantage.
          </p>
        </div>
      </section>

      <section className="border-t border-white/5">
  <div className="mx-auto max-w-5xl px-6 py-24 text-center">
    <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-8">
      OUR APPROACH
    </p>

    <h3 className="font-display text-3xl md:text-5xl leading-tight">
      We don’t just build software. <br />
      <em className="text-warm not-italic font-light">
        We engineer outcomes.
      </em>
    </h3>

    <p className="mt-8 text-muted-foreground max-w-2xl mx-auto">
      Every solution we design is driven by clarity, scalability, and long-term
      business value — not just code, but measurable impact.
    </p>
  </div>
</section>

  <section className="border-t border-white/5">
  <div className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-12 items-center">

    {/* Image */}
    <div className="reveal">
      <img
        src={aboutImg}
        alt="Jarvis team or workspace"
        className="rounded-2xl border border-white/10"
      />
    </div>

    {/* Content */}
    <div className="reveal">
      <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
        WHO WE ARE
      </p>

      <h2 className="font-display text-4xl md:text-5xl leading-tight">
        Built by thinkers. <br />
        <em className="text-warm not-italic font-light">
          Driven by outcomes.
        </em>
      </h2>

      <p className="mt-6 text-muted-foreground leading-relaxed">
        Jarvis Technolabs is a collective of engineers, designers, and strategists
        focused on solving complex business problems through technology.
        We combine deep technical expertise with a sharp understanding of
        real-world challenges to deliver meaningful results.
      </p>
    </div>

  </div>
</section>

      {/* VMV */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              DESIGNING THE FUTURE
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              For value <em className="text-warm not-italic font-light">and impact.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VMV.map((v) => (
              <div
                key={v.label}
                className="reveal border border-white/10 rounded-2xl p-8 bg-gradient-to-b from-white/[0.03] to-transparent"
              >
                <div className="text-[11px] tracking-[0.3em] uppercase text-warm mb-4">
                  {v.label}
                </div>
                <p className="text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Principles />
      <CTA
        eyebrow="OUR STORY · YOUR NEXT CHAPTER"
        title={
          <>
            Build the next decade <em className="text-warm not-italic font-light">with us.</em>
          </>
        }
        description="From a four-person studio to a 50-strong team — the next chapter is the one we write together."
        primaryLabel="Talk to leadership →"
        secondaryLabel="See our work"
        secondaryTo="/insights"
      />
      <Footer />
    </main>
  );
}
