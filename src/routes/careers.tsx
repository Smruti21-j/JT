import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import careersImg from "@/assets/page-careers.jpg";
import celebrate from "@/assets/careers-celebrate.jpg";
import office from "@/assets/careers-office.jpg";
import team from "@/assets/careers-team.jpg";

const PERKS = [
  "Work-Life Balance",
  "Flexible Work Options",
  "Vibrant Work Culture",
  "No Hidden Policies",
  "Awesome Team Members",
  "Festival Celebrations",
  "Individual Achievement Perks",
  "Team Performance Perks",
];

const ROLES = [
  { title: "MERN Developer", exp: "3 – 5+ years of experience", loc: "Ahmedabad · In-office" },
  { title: "Quality Analyst", exp: "0 – 3+ years of experience", loc: "Ahmedabad · In-office" },
];

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Build a future you believe in. Join Jarvis Technolabs in Ahmedabad — open MERN Developer and Quality Analyst roles.",
      },
      { property: "og:title", content: "Careers — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Building experiences that are happier, engaging and meaningful.",
      },
    ],
  }),
});

function CareersPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      <AnimatedHero
        bgImage={careersImg}
        eyebrow="CAREERS · LIFE AT JARVIS"
        title={
          <>
            Build a future <em className="text-shimmer not-italic font-light">you believe in.</em>
          </>
        }
        description="Building experiences that are happier, engaging and meaningful — with a team that ships, learns and celebrates together."
      >
        <a
          href="mailto:talent@jarvistechnolabs.com"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
        >
          Shape the future →
        </a>
      </AnimatedHero>

      {/* Culture mosaic */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14 max-w-3xl">
            <p className="text-xs tracking-[0.3em] text-warm bracket-label mb-6">
              INSIDE JARVIS
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              People-first. <em className="text-warm not-italic font-light">Always.</em>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              From whiteboard mornings to festival evenings — this is what a typical season at the studio looks like.
            </p>
          </div>

          <div className="grid md:grid-cols-12 gap-5">
            <div className="md:col-span-7 reveal group relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src={office}
                alt="Open office at sunset"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-full object-cover aspect-[16/10] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-xs tracking-[0.25em] uppercase text-white">
                The studio · Ahmedabad
              </div>
            </div>
            <div className="md:col-span-5 reveal group relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src={team}
                alt="Team brainstorming"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-full object-cover aspect-[16/10] md:aspect-auto md:h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 text-xs tracking-[0.25em] uppercase text-white">
                Workshop wednesdays
              </div>
            </div>
            <div className="md:col-span-12 reveal group relative overflow-hidden rounded-2xl border border-white/10">
              <img
                src={celebrate}
                alt="Team celebrating festival"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-72 md:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-xs tracking-[0.25em] uppercase text-white">
                Festival nights · Diwali 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              REWARDING YOU
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              More than <em className="text-warm not-italic font-light">a paycheck.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {PERKS.map((p, i) => (
              <div
                key={p}
                className="bg-background p-8 reveal hover:bg-white/[0.03] transition-colors group"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="text-warm font-display text-2xl mb-3 group-hover:translate-x-1 transition-transform">
                  0{i + 1}
                </div>
                <h3 className="font-display text-xl group-hover:text-warm transition-colors">{p}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-5xl px-6 py-24">
          <div className="reveal mb-10">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              JOIN US · OPEN ROLES
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Currently <em className="text-warm not-italic font-light">hiring.</em>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">
              Share your updated resume at{" "}
              <a href="mailto:talent@jarvistechnolabs.com" className="text-warm hover:underline">
                talent@jarvistechnolabs.com
              </a>
              .
            </p>
          </div>

          <ul className="reveal divide-y divide-white/5 border-y border-white/5">
            {ROLES.map((r) => (
              <li
                key={r.title}
                className="py-8 flex flex-wrap items-center justify-between gap-6 group hover:px-3 transition-all"
              >
                <div>
                  <h3 className="font-display text-2xl group-hover:text-warm transition-colors">{r.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{r.exp} · {r.loc}</p>
                </div>
                <a
                  href={`mailto:talent@jarvistechnolabs.com?subject=Application — ${encodeURIComponent(r.title)}`}
                  className="text-[11px] tracking-[0.25em] uppercase border border-white/15 rounded-md px-5 py-3 hover:border-primary hover:text-primary transition-colors"
                >
                  Apply →
                </a>
              </li>
            ))}
          </ul>

          <p className="reveal mt-10 text-sm text-muted-foreground">
            * All roles are <em className="text-foreground not-italic">in-office at our Ahmedabad office</em>;
            we are considering only candidates residing in Ahmedabad.
          </p>
        </div>
      </section>

      <CTA
        eyebrow="JOIN US · LIFE AT JARVIS"
        title={
          <>
            Don't see your role? <em className="text-warm not-italic font-light">Write to us.</em>
          </>
        }
        description="We're always meeting curious engineers, designers and operators. Drop a note — we read every application."
        primaryLabel="Email talent team →"
        primaryTo="/contact"
        secondaryLabel="About Jarvis"
        secondaryTo="/about"
      />
      <Footer />
    </main>
  );
}
