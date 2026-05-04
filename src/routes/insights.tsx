import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import { POSTS } from "@/data/insights";
import insightsBg from "@/assets/page-insights.jpg";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Insights - Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Field notes on AI, digital transformation and product engineering - from the team shipping for D2C brands and enterprises.",
      },
      { property: "og:title", content: "Insights - Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Field notes on AI, digital transformation and product engineering.",
      },
      { property: "og:image", content: insightsBg },
      { name: "twitter:image", content: insightsBg },
    ],
  }),
});

function InsightsPage() {
  useReveal();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <AnimatedHero
        bgImage={insightsBg}
        eyebrow="INSIGHTS · FIELD NOTES"
        title={
          <>
            Ideas worth <em className="text-shimmer not-italic font-light">building on.</em>
          </>
        }
        description="Perspectives on AI, transformation, and the craft of shipping software - written by the team behind 150+ projects."
      />

      <section className="section-light border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] bracket-label mb-6 text-muted-foreground">
                LATEST
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                From the studio.
              </h2>
            </div>
            <Link
              to="/contact"
              className="text-[11px] tracking-[0.25em] uppercase border border-current/15 rounded-md px-5 py-3 hover:text-warm transition-colors"
            >
              Subscribe →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((p, index) => (
              <Link
                key={p.title}
                to="/insights/$slug"
                params={{ slug: p.slug }}
                className="reveal group rounded-2xl overflow-hidden border border-black/10 bg-white hover:-translate-y-1 transition-transform duration-500 flash-card"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase mb-4">
                    <span className="text-warm">{p.tag}</span>
                    <span className="text-black/30">·</span>
                    <span className="text-black/45">{p.date}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-snug group-hover:text-warm transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 text-[11px] tracking-[0.25em] uppercase text-warm">
                    Read note →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="STAY IN THE LOOP"
        title={
          <>
            Field notes, <em className="text-warm not-italic font-light">straight to your inbox.</em>
          </>
        }
        description="One thoughtful note a month on AI, modernisation and shipping. No fluff, no spam."
        primaryLabel="Subscribe →"
        secondaryLabel="Browse services"
      />
      <Footer />
    </main>
  );
}
