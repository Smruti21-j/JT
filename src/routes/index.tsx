import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Pillars } from "@/components/site/Pillars";
import { Industries } from "@/components/site/Industries";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { StatCounter } from "@/components/site/StatCounter";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Service card icons ───────────────────────────────────────────────────────
const ServiceIcons: Record<string, JSX.Element> = {
  "Intelligence that Acts": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6.5-6 7.4V20h-2v-3.6C7.5 15.5 5 12.5 5 9a7 7 0 0 1 7-7z"/>
      <path d="M9 21h6"/><path d="M10 9l2 2 4-4"/>
    </svg>
  ),
  "The AI-First Core": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
      <path d="M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M15.6 8.4l-2.1 2.1M8.4 15.6l-2.1 2.1"/>
    </svg>
  ),
  "Digital Engineering at Scale": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      <line x1="19" y1="12" x2="5" y2="12"/>
    </svg>
  ),
  "Next-Gen Ecosystems": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
      <circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <path d="M7 5h10M5 7v10M19 7v10M7 19h10"/>
    </svg>
  ),
  "Design with Purpose": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
      <path d="M15 5l3 3"/>
    </svg>
  ),
  "Accelerated Value Chains": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
};

// ─── Mosaic grid data — image + text tiles alternating ────────────────────────
// Images are dark-toned, desaturated, tech-themed from Unsplash
const HOME_SERVICES = [
  {
    title: "Intelligence that Acts",
    desc: "Transition from generative prompts to agentic workflows that resolve complex tasks with zero friction.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80", // robot face / humanoid AI close-up
  },
  {
    title: "The AI-First Core",
    desc: "Embed intelligence into the substrate of your business to create a self-evolving, future-proof operating model.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80", // dark abstract geometric — deep space / tech mesh
  },
  {
    title: "Digital Engineering at Scale",
    desc: "Accelerate your time-to-impact with battle-tested engineering playbooks and frontier technology stacks.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80", // open-plan dark dev office, multiple monitors
  },
  {
    title: "Next-Gen Ecosystems",
    desc: "Build the connected, cloud-native infrastructure required for a resilient and sovereign digital future.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80", // earth from space / global network
  },
  {
    title: "Design with Purpose",
    desc: "Amplify human potential through sensory UX that balances high-tech precision with human-centric empathy.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80", // hand touching glass UI / holographic wireframe
  },
  {
    title: "Accelerated Value Chains",
    desc: "Unlock pervasive efficiencies across your entire enterprise with data-driven insights that act as your growth catalyst.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&q=80", // dark abstract stock chart / financial data stream
  },
];

// ─── Mosaic bento grid — AppVista-style image/text alternating tiles ──────────
// Row 1: [image][text][image]
// Row 2: [text][image][text]
// 3-col grid, 2 rows, each cell same height. Images fill cell fully.
// Text cells have zero border, just the dark background with a subtle orange top-edge glow on hover.

function ServiceMosaic() {
  // Cell order: alternating starts with image on odd cells
  // Pattern: img, txt, img, txt, img, txt → but we want AppVista checkerboard
  // Row1: IMG(0) | TXT(1) | IMG(2)
  // Row2: TXT(3) | IMG(4) | TXT(5)
  const cells = HOME_SERVICES.map((s, i) => ({
    ...s,
    isImage: i === 0 || i === 2 || i === 4,
  }));

  return (
    <div
      className="w-full"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(2, 320px)",
        gap: "2px",
        background: "rgba(255,255,255,0.04)", // gap colour = subtle grid line
        borderRadius: "20px",
        overflow: "hidden",
        // Outer warm haze — the key shadow effect
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px -12px rgba(0,0,0,0.7), 0 0 60px 0 rgba(255,80,10,0.06)",
      }}
    >
      {cells.map((cell, i) =>
        cell.isImage ? (
          // ── Image tile ────────────────────────────────────────────────────
          <div
            key={cell.title}
            className="relative overflow-hidden group"
            style={{ background: "#0a0806" }}
          >
            <img
              src={cell.image}
              alt={cell.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                filter: "brightness(0.38) saturate(0.5) sepia(0.15)",
              }}
            />
            {/* Warm corner overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,80,10,0.1) 0%, transparent 55%, rgba(0,0,0,0.4) 100%)",
              }}
            />
            {/* Hover — image brightens slightly */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(255,90,10,0.06)" }}
            />
            {/* Bottom-left service label on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{
                    background: "rgba(255,90,20,0.18)",
                    border: "1px solid rgba(255,110,30,0.35)",
                    color: "rgb(255,125,45)",
                  }}
                >
                  <div style={{ transform: "scale(0.72)" }}>{ServiceIcons[cell.title]}</div>
                </div>
                <span
                  className="font-display text-sm font-medium"
                  style={{ color: "rgba(255,230,200,0.7)" }}
                >
                  {cell.title}
                </span>
              </div>
            </div>
          </div>
        ) : (
          // ── Text tile ─────────────────────────────────────────────────────
          <Link
            key={cell.title}
            to="/services"
            className="group relative flex flex-col justify-between overflow-hidden"
            style={{
              background: "#0e0c0a",
              padding: "2.5rem 2.25rem",
              textDecoration: "none",
            }}
          >
            {/* Top-edge orange glow line — slides in on hover */}
            <span
              aria-hidden
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,110,30,0.7) 50%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            />
            {/* Radial warm glow from top-left on hover */}
            <span
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                top: "-50px",
                left: "-30px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,90,10,0.1) 0%, transparent 70%)",
                opacity: 0,
                transition: "opacity 0.35s ease",
              }}
            />

            {/* CSS hover via sibling pseudo trick — use inline style + onMouseEnter */}
            {/* We'll rely on Tailwind group-hover for the spans above via inline override */}
            <style>{`
              .mosaic-text-cell:hover .mosaic-top-line { opacity: 1 !important; }
              .mosaic-text-cell:hover .mosaic-glow-spot { opacity: 1 !important; }
              .mosaic-text-cell:hover { background: #120f0b !important; }
            `}</style>

            {/* Icon */}
            <div
              className="w-12 h-12 flex items-center justify-center rounded-xl mb-6 relative z-10"
              style={{
                background: "rgba(255,90,20,0.08)",
                border: "1px solid rgba(255,100,30,0.2)",
                color: "rgb(255,125,45)",
                boxShadow: "0 0 18px rgba(255,90,10,0.13), inset 0 1px 0 rgba(255,120,40,0.1)",
                transition: "box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              {ServiceIcons[cell.title]}
            </div>

            {/* Title */}
            <div className="relative z-10 flex-1">
              <h3
                className="font-display text-xl mb-3 transition-colors duration-250"
                style={{ color: "#e8ddd4" }}
              >
                {cell.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(232,221,212,0.38)" }}
              >
                {cell.desc}
              </p>
            </div>

            {/* CTA */}
            <span
              className="mt-6 inline-flex text-[11px] tracking-[0.25em] uppercase relative z-10 transition-colors duration-250"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              Know more →
            </span>
          </Link>
        )
      )}
    </div>
  );
}

// ─── Insight cards ────────────────────────────────────────────────────────────
const INSIGHT_CARDS = [
  {
    tag: "AI Strategy",
    title: "Agentic AI: Beyond the Chatbot Era",
    excerpt: "How autonomous agents are rewriting the rules of enterprise automation—and what it means for your 2025 roadmap.",
    date: "Apr 2025",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80", // humanoid robot face
  },
  {
    tag: "Engineering",
    title: "Scaling LLM Inference Without Breaking the Bank",
    excerpt: "Cost-effective patterns for production AI workloads: batching, caching, and quantisation at scale.",
    date: "Mar 2025",
    image: "https://images.unsplash.com/photo-1597733336794-db7b869fda1f?w=1600&q=80", // dark GPU/chip macro
  },
  {
    tag: "CX Innovation",
    title: "Sensory UX: Designing for the Post-Screen World",
    excerpt: "Voice, haptics, and ambient interfaces are converging. Here's how to lead the transition gracefully.",
    date: "Mar 2025",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80", // hand on holographic UI
  },
  {
    tag: "Data & Cloud",
    title: "Sovereign Data for Regulated Industries",
    excerpt: "Building cloud-native platforms that satisfy compliance requirements without sacrificing product velocity.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80", // earth / global cloud
  },
  {
    tag: "Future of Work",
    title: "The Human-AI Operating Model",
    excerpt: "Rethinking org design when 40 % of tasks are delegated to digital colleagues who never sleep.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80", // dark open-plan office
  },
  {
    tag: "Platform Eng.",
    title: "Internal Developer Platforms That Get Adopted",
    excerpt: "Product thinking applied to infrastructure: why golden paths beat mandates every time.",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1600&q=80", // dark financial data chart
  },
];

// ─── Full-Width Vertical Insight Carousel ────────────────────────────────────
function InsightFlashcards() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"down" | "up">("down");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = INSIGHT_CARDS.length;

  const go = useCallback(
    (next: number, dir: "down" | "up" = "down") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(next);
        setAnimating(false);
      }, 600);
    },
    [animating]
  );

  const advance = useCallback(() => {
    go((active + 1) % total, "down");
  }, [active, go, total]);

  useEffect(() => {
    timerRef.current = setInterval(advance, 4500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [advance]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 4500);
  };

  const goTo = (i: number) => {
    if (i === active || animating) return;
    go(i, i > active ? "down" : "up");
    resetTimer();
  };

  const prev = () => { go((active - 1 + total) % total, "up"); resetTimer(); };
  const next = () => { advance(); resetTimer(); };

  const card = INSIGHT_CARDS[active];

  return (
    <section className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-4">LATEST THINKING</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Insights &amp; <em className="text-warm not-italic font-light">Perspectives</em>
            </h2>
          </div>
          <Link to="/insights" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-warm transition-colors">
            All insights →
          </Link>
        </div>
      </div>

      <div className="relative w-full overflow-hidden" style={{ height: "min(88vh, 640px)" }}>
        <div
          key={active}
          className="absolute inset-0 w-full h-full"
          style={{
            animation: animating
              ? `slideOut${direction === "down" ? "Up" : "Down"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`
              : `slideIn${direction === "down" ? "Down" : "Up"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`,
          }}
        >
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.42) saturate(0.75) hue-rotate(8deg)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 42%)" }} />
          <div className="absolute bottom-0 left-0" style={{ width: "65%", height: "2px", background: "linear-gradient(to right, rgba(255,100,30,1) 0%, rgba(255,160,60,0.45) 60%, transparent 100%)" }} />
          <div className="absolute top-0 bottom-0 left-0" style={{ width: "3px", background: "linear-gradient(to bottom, transparent 5%, rgba(255,110,30,0.8) 35%, rgba(255,110,30,0.8) 65%, transparent 95%)" }} />
          <div className="absolute bottom-0 left-0" style={{ width: "420px", height: "180px", background: "radial-gradient(ellipse at bottom left, rgba(255,80,10,0.2) 0%, transparent 70%)" }} />

          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
            <div className="max-w-2xl">
              <span style={{ display: "inline-block", fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 500, color: "rgb(255,130,50)", border: "1px solid rgba(255,130,50,0.35)", background: "rgba(255,100,20,0.1)", borderRadius: "999px", padding: "5px 14px", marginBottom: "1.5rem" }}>
                {card.tag}
              </span>
              <h3 className="font-display leading-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "#f0e8df" }}>
                {card.title}
              </h3>
              <p style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)", lineHeight: 1.7, color: "rgba(240,232,223,0.6)", maxWidth: "560px", marginBottom: "2.5rem" }}>
                {card.excerpt}
              </p>
              <div className="flex items-center gap-8">
                <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>{card.date}</span>
                <Link to="/insights" style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,130,50,0.9)" }} className="hover:text-warm transition-colors">Read more →</Link>
              </div>
            </div>
          </div>
        </div>

        <button onClick={prev} aria-label="Previous insight" className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/12 bg-black/30 backdrop-blur-sm hover:border-warm/50 hover:text-warm transition-all" style={{ color: "rgba(255,255,255,0.45)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <button onClick={next} aria-label="Next insight" className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/12 bg-black/30 backdrop-blur-sm hover:border-warm/50 hover:text-warm transition-all" style={{ color: "rgba(255,255,255,0.45)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4 px-6">
          <div className="w-full max-w-xs h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div key={`${active}-bar`} className="h-full rounded-full" style={{ background: "rgb(255,130,50)", animation: "progressBar 4.5s linear forwards" }} />
          </div>
          <div className="flex items-center gap-2">
            {INSIGHT_CARDS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to insight ${i + 1}`}
                style={{ width: i === active ? "28px" : "7px", height: "7px", borderRadius: "4px", background: i === active ? "rgb(255,130,50)" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInDown  { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideInUp    { from { transform: translateY(100%);  opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideOutUp   { from { transform: translateY(0);     opacity: 1; } to { transform: translateY(-100%); opacity: 0; } }
        @keyframes slideOutDown { from { transform: translateY(0);     opacity: 1; } to { transform: translateY(100%); opacity: 0; } }
        @keyframes progressBar  { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </section>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jarvis Technolabs — You Think, We Create" },
      { name: "description", content: "Navigating your digital transformation from first principles. AI-native partner for products, automation and enterprise platforms." },
      { property: "og:title", content: "Jarvis Technolabs — You Think, We Create" },
      { property: "og:description", content: "Fueling businesses with sustained digital capabilities and next-gen AI solutions." },
    ],
  }),
});

function Index() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <Hero />

      {/* ── The Architect of Autonomy — AppVista-style mosaic bento grid ─── */}
      <section className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">

          {/* Section header */}
          <div className="reveal flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">WHAT WE DO</p>
              <h2 className="font-display text-4xl md:text-6xl tracking-tight">
                The <em className="text-warm not-italic font-light">Architect</em>
                <span className="font-display text-4xl md:text-6xl tracking-tight block">of&nbsp;Autonomy</span>
              </h2>
            </div>
            <Link to="/services" className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-warm transition-colors">
              All services →
            </Link>
          </div>

          {/*
            Mosaic grid — inspired by AppVista "Builders of a better working world":
            • 3 columns × 2 rows, each cell 320px tall
            • Image cells (positions 0,2,4) — full-bleed dark photo, warm tinted
            • Text cells (positions 1,3,5) — dark bg, icon + title + desc + CTA
            • Gap between cells is 2px — acts as a subtle grid line / separator
            • The outer boxShadow gives the warm amber haze "shadow" effect requested
            • On hover: image cells brighten slightly, text cells get top-edge glow + warm spot
          */}
          <ServiceMosaic />
        </div>
      </section>

      <Pillars />
      <InsightFlashcards />
      <Industries />
      <Testimonials />

      <CTA showBrands={true} />
      <Footer />
    </main>
  );
}