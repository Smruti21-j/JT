import { createFileRoute, Link } from "@tanstack/react-router";
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

const TITLE_TO_SLUG: Record<string, string> = {
  "Artificial Intelligence": "artificial-intelligence",
  "Digital Transformation": "digital-transformation",
  "Product Engineering": "product-engineering",
  "Application Development": "application-development",
  "UI / UX": "ui-ux",
  "Consulting": "consulting",
  "Performance & Growth": "performance-growth",
  "Managed Services": "managed-services",
};
const toSlug = (title: string) => TITLE_TO_SLUG[title] ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const SERVICE_GROUPS = [
  {
    title: "Artificial Intelligence",
    image: dataAiImg,
    intro: "Unlock significant business opportunities & accelerate innovation at scale.",
    items: [
      "Generative AI",
      "Smart AI Assistant",
      "AI Model Fine-tuning",
      "Natural Language Processing (LLM)",
      "Optical Character Recognition (OCR)",
      "Automated Optimization",
      "AI Integration",
      "Deep Learning",
      "Sentiment Analysis",
      "Chat Bots",
      "Custom AI App Development",
    ],
  },
  {
    title: "Digital Transformation",
    image: digitalImg,
    intro: "Drive a digital-first strategy for your entire enterprise — leading change, enabled by digital technology.",
    items: [
      "Enterprise Mobility Services",
      "Enterprise System Integration",
      "Cloud Integration",
      "Digital Experience",
      "Enterprise Architecture",
      "Business Intelligence",
      "Application Modernization",
    ],
  },
  {
    title: "Product Engineering",
    image: productImg,
    intro: "Software product development that supports product-led growth.",
    items: [
      "Product Assessment & Design",
      "Custom Product Development",
      "Application Re-Engineering",
      "Platform Engineering",
      "DevOps",
      "Quality Assurance",
      "Team Augmentation",
    ],
  },
  {
    title: "Application Development",
    image: appImg,
    intro: "Bringing innovative products to market on every device and platform.",
    items: [
      "Mobile App Development",
      "Responsive Web Applications",
      "Cross-Platform App Development",
      "Progressive Web Applications",
      "API Development & Integration",
      "Back-End Development",
    ],
  },
  {
    title: "UI / UX",
    image: uiuxImg,
    intro: "Merging UX, CX and product experience to develop high-performing digital products.",
    items: [
      "Usability and UX Consulting",
      "UX Research",
      "User Experience",
      "UX Design",
      "UI Design",
      "UI/UX Design Team",
    ],
  },
  {
    title: "Consulting",
    image: consultingImg,
    intro: "We partner with our clients to bring to life their vision of enterprise-wide transformation.",
    items: [
      "Business & Stakeholder Consultation",
      "Customer Experience Strategy",
      "Technology Strategy",
      "Product Strategy",
      "Data Strategy",
      "Product Roadmapping",
    ],
  },
  {
    title: "Performance & Growth",
    image: growthImg,
    intro: "Continuous improvement programmes that iteratively optimise your digital platform through data-driven insights.",
    items: [
      "Experience Optimisation",
      "Personalisation",
      "Continuous Improvement",
      "Tracking & Analytics",
      "SEO",
      "BI Consultancy",
      "Dashboards & Reporting",
    ],
  },
  {
    title: "Managed Services",
    image: managedImg,
    intro: "Keep your IT secure, reliable and efficient — from application modernization to 24/7 operations.",
    items: [
      "Application Modernization",
      "DevOps",
      "Cloud",
      "Hosting and Infrastructure",
      "IT Operations and Support",
      "Application Support",
      "Professional Services and Consultancy",
      "Cybersecurity and Compliance",
    ],
  },
];

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Build, scale and modernise apps with our services — Data & AI, Digital Transformation, Product Engineering, App Dev, UI/UX, Consulting and Managed Services.",
      },
      { property: "og:title", content: "Services — Jarvis Technolabs" },
      {
        property: "og:description",
        content:
          "A powerhouse of innovation, design and transformation fueled by disruptive technologies and agility.",
      },
    ],
  }),
});

function ServicesPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <AnimatedHero
        bgImage={dataAiImg}
        eyebrow="WHAT WE DO"
        title={
          <>
            Build, scale and <em className="text-shimmer not-italic font-light">modernise apps</em> with our services.
          </>
        }
        description="A powerhouse of innovation, design and transformation, fueled by disruptive technologies and agility."
      />

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-24">
            {SERVICE_GROUPS.map((g, i) => (
              <div
                key={g.title}
                className={`reveal grid md:grid-cols-12 gap-10 items-center ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="md:col-span-5 group">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 aspect-[4/3]">
                    <img
                      src={g.image}
                      alt={g.title}
                      width={1024}
                      height={768}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-background/70 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 text-[11px] tracking-[0.3em] uppercase text-warm bracket-label">
                      0{i + 1} / {String(SERVICE_GROUPS.length).padStart(2, "0")}
                    </div>
                  </div>
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-display text-3xl md:text-5xl tracking-tight mb-5">{g.title}</h2>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                    {g.intro}
                  </p>
                  <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    {g.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                        <span className="h-px w-4 bg-warm" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: toSlug(g.title) }}
                    className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-warm hover:gap-3 transition-all"
                  >
                    Explore {g.title} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="WHAT WE DO · SCOPE A PROJECT"
        title={
          <>
            Pick a service. <em className="text-warm not-italic font-light">We'll scope it in a week.</em>
          </>
        }
        description="Send a brief or jump on a 30-minute call. You'll leave with a clear roadmap, timeline and team shape."
        primaryLabel="Brief us →"
        secondaryLabel="Read insights"
        secondaryTo="/insights"
      />
      <Footer />
    </main>
  );
}

