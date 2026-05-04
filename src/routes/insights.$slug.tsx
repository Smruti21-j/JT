import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { getPostBySlug } from "@/data/insights";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return post;
  },
  component: InsightDetailPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.title} - Jarvis Technolabs` },
      { name: "description", content: loaderData.excerpt },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.excerpt },
      { property: "og:image", content: loaderData.img },
      { name: "twitter:image", content: loaderData.img },
    ],
  }),
});

function InsightDetailPage() {
  const post = Route.useLoaderData();
  useReveal();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      <article>
        <section className="relative pt-44 pb-20 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={post.img}
              alt=""
              className="h-full w-full object-cover opacity-25 animate-ken-burns"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/90 to-background" />
            <div className="absolute inset-0 grid-bg opacity-15 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 reveal">
            <Link
              to="/insights"
              className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground hover:text-warm transition-colors"
            >
              ← All insights
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-[10px] tracking-[0.25em] uppercase">
              <span className="text-warm">{post.tag}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{post.date}</span>
            </div>
            <h1 className="mt-6 font-display text-4xl md:text-7xl leading-[1.05] tracking-tight">
              {post.title}
            </h1>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {post.intro}
            </p>
          </div>
        </section>

        <section className="section-light border-t border-black/5">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-12">
            <aside className="reveal lg:col-span-4">
              <div className="sticky top-28 border-l border-black/10 pl-6">
                <p className="text-xs tracking-[0.3em] bracket-label text-muted-foreground">
                  JARVIS VIEW
                </p>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Built around AI-native product engineering, digital transformation, application development,
                  UI/UX, consulting, and managed services.
                </p>
              </div>
            </aside>

            <div className="lg:col-span-8 space-y-10">
              {post.sections.map((section, index) => (
                <section
                  key={section.title}
                  className="reveal rounded-2xl border border-black/10 bg-white p-8 flash-card"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <p className="text-[11px] tracking-[0.25em] uppercase text-warm">
                    0{index + 1}
                  </p>
                  <h2 className="mt-4 font-display text-3xl tracking-tight">
                    {section.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CTA
        eyebrow="BUILD THE NEXT SYSTEM"
        title={
          <>
            Turn the idea into an <em className="text-warm not-italic font-light">AI-ready product.</em>
          </>
        }
        description="Talk to Jarvis Technolabs about products, platforms, automation, and future-ready digital systems."
        primaryLabel="Start a project →"
        secondaryLabel="Explore services"
      />
      <Footer />
    </main>
  );
}
