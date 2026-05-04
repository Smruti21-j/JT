import { Link } from "@tanstack/react-router";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";

const PROJECTS = [
  { img: p1, tag: "Analytics", title: "Atlas — realtime decision dashboard", desc: "Streaming KPI intelligence for a Fortune 500 logistics network." },
  { img: p2, tag: "Conversational AI", title: "Vox — multilingual voice agent", desc: "Sub-second latency voice agent handling 1.2M monthly conversations." },
  { img: p3, tag: "Commerce", title: "Mercato — generative storefront", desc: "AI-personalised commerce platform with adaptive merchandising." },
  { img: p4, tag: "Mobile", title: "Halo — wellness companion", desc: "Cross-platform mobile app with on-device intelligence and health insights." },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal flex flex-wrap items-end justify-between gap-6 mb-20">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              SELECTED WORK · 2022—2026
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Crafted with <em className="text-warm not-italic font-light">obsessive precision.</em>
            </h2>
          </div>
          <Link
            to="/contact"
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-warm transition-colors"
          >
            Explore More →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="group reveal relative overflow-hidden rounded-2xl border border-white/5 bg-card"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-[11px] tracking-[0.25em] uppercase text-warm mb-2">{p.tag}</div>
                <h3 className="font-display text-2xl">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                  {p.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
