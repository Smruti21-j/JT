import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Industries } from "@/components/site/Industries";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Inline SVG icons (text tiles only) ──────────────────────────────────────
const ServiceIcons: Record<string, JSX.Element> = {
  "Intelligence that Acts": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6.5-6 7.4V20h-2v-3.6C7.5 15.5 5 12.5 5 9a7 7 0 0 1 7-7z"/>
      <path d="M9 21h6"/><path d="M10 9l2 2 4-4"/>
    </svg>
  ),
  "The AI-First Core": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="3"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3"/>
    </svg>
  ),
  "Digital Engineering at Scale": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      <line x1="19" y1="12" x2="5" y2="12"/>
    </svg>
  ),
  "Next-Gen Ecosystems": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/><circle cx="5" cy="5" r="2"/><circle cx="19" cy="5" r="2"/>
      <circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/>
      <path d="M7 5h10M5 7v10M19 7v10M7 19h10"/>
    </svg>
  ),
  "Design with Purpose": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/>
    </svg>
  ),
  "Accelerated Value Chains": (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
};

// ─── Per-service infographic stats shown on text tiles ────────────────────────
const ServiceStats: Record<string, { value: string; label: string }[]> = {
  "The AI-First Core": [
    { value: "10×", label: "Faster decisions" },
    { value: "87%", label: "Task automation" },
  ],
  "Next-Gen Ecosystems": [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "3×", label: "Deploy speed" },
  ],
  "Accelerated Value Chains": [
    { value: "40%", label: "Cost reduction" },
    { value: "2.4×", label: "Revenue lift" },
  ],
};

// ─── Mosaic grid data ─────────────────────────────────────────────────────────
const HOME_SERVICES = [
  {
    title: "Intelligence that Acts",
    desc: "Transition from generative prompts to agentic workflows that resolve complex tasks with zero friction.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=80",
  },
  {
    title: "The AI-First Core",
    desc: "Embed intelligence into the substrate of your business to create a self-evolving, future-proof operating model.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80",
  },
  {
    title: "Digital Engineering at Scale",
    desc: "Accelerate your time-to-impact with battle-tested engineering playbooks and frontier technology stacks.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80",
  },
  {
    title: "Next-Gen Ecosystems",
    desc: "Build the connected, cloud-native infrastructure required for a resilient and sovereign digital future.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80",
  },
  {
    title: "Design with Purpose",
    desc: "Amplify human potential through sensory UX that balances high-tech precision with human-centric empathy.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80",
  },
  {
    title: "Accelerated Value Chains",
    desc: "Unlock pervasive efficiencies across your entire enterprise with data-driven insights that act as your growth catalyst.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&q=80",
  },
];

// ─── Mosaic grid ──────────────────────────────────────────────────────────────
function ServiceMosaic() {
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
        background: "rgba(255,255,255,0.04)",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.05), 0 32px 80px -12px rgba(0,0,0,0.7), 0 0 60px 0 rgba(255,80,10,0.06)",
      }}
    >
      {cells.map((cell) =>
        cell.isImage ? (
          <div
            key={cell.title}
            className="relative overflow-hidden group"
            style={{ background: "#0a0806" }}
          >
            <img
              src={cell.image}
              alt={cell.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ filter: "brightness(0.40) saturate(0.55) sepia(0.1)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(255,80,10,0.08) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)" }} />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "rgba(255,90,10,0.07)" }} />
            <div className="absolute bottom-0 left-0 right-0 px-6 py-5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)" }}>
              <p className="text-sm font-medium tracking-wide" style={{ color: "rgba(255,225,190,0.65)" }}>
                {cell.title}
              </p>
            </div>
            <div className="absolute bottom-0 left-0" style={{ width: "50%", height: "2px", background: "linear-gradient(to right, rgba(255,110,30,0.7), transparent)" }} />
          </div>
        ) : (
          <Link
            key={cell.title}
            to="/services"
            className="group relative flex flex-col justify-between overflow-hidden"
            style={{ background: "#0e0c0a", padding: "2.25rem 2rem", textDecoration: "none", transition: "background 0.3s ease" }}
          >
            <span aria-hidden className="absolute top-0 left-0 right-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,110,30,0.7), transparent)" }} />
            <span aria-hidden className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350" style={{ top: "-50px", left: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,90,10,0.1) 0%, transparent 70%)" }} />
            <div className="w-11 h-11 flex items-center justify-center rounded-xl mb-5 relative z-10 transition-all duration-300"
              style={{ background: "rgba(255,90,20,0.08)", border: "1px solid rgba(255,100,30,0.2)", color: "rgb(255,125,45)", boxShadow: "0 0 16px rgba(255,90,10,0.12)" }}>
              {ServiceIcons[cell.title]}
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="font-display text-lg mb-2 group-hover:text-orange-400 transition-colors duration-250" style={{ color: "#e8ddd4" }}>
                {cell.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(232,221,212,0.40)" }}>
                {cell.desc}
              </p>
            </div>
            {ServiceStats[cell.title] && (
              <div className="relative z-10 mt-5 flex gap-5 border-t border-white/5 pt-4">
                {ServiceStats[cell.title].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-xl font-semibold leading-none" style={{ color: "rgb(255,130,50)" }}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] tracking-[0.15em] uppercase mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {!ServiceStats[cell.title] && (
              <span className="mt-5 inline-flex text-[11px] tracking-[0.25em] uppercase relative z-10 group-hover:text-orange-400 transition-colors duration-250" style={{ color: "rgba(255,255,255,0.22)" }}>
                Know more →
              </span>
            )}
            {ServiceStats[cell.title] && (
              <span className="mt-3 inline-flex text-[11px] tracking-[0.25em] uppercase relative z-10 group-hover:text-orange-400 transition-colors duration-250" style={{ color: "rgba(255,255,255,0.22)" }}>
                Know more →
              </span>
            )}
          </Link>
        )
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ██████████  PIETERKOOPT-STYLE STACKED PILLARS  ██████████████████████████████
// ─────────────────────────────────────────────────────────────────────────────

const CX_PILLARS = [
  {
    num: "01",
    label: "Discovery",
    titlePlain: "INTELLIGENCE",
    titleItalic: "that listens",
    desc: "We start by mapping your business deeply — goals, friction points, and untapped opportunities — turning raw context into a precise transformation blueprint.",
    stat: { value: "48h", label: "Initial assessment" },
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80",
  },
  {
    num: "02",
    label: "Architecture",
    titlePlain: "SYSTEMS",
    titleItalic: "built to last",
    desc: "Our architects design AI-native cores and cloud-resilient infrastructure tailored to your scale — no off-the-shelf blueprints, no technical debt.",
    stat: { value: "3×", label: "Deploy velocity" },
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80",
  },
  {
    num: "03",
    label: "Delivery",
    titlePlain: "MOMENTUM",
    titleItalic: "in every sprint",
    desc: "Cross-functional squads ship working software fast. We apply battle-tested playbooks to keep quality high and timelines honest — from MVP to full-scale rollout.",
    stat: { value: "99.9%", label: "Uptime SLA" },
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
  },
  {
    num: "04",
    label: "Evolution",
    titlePlain: "ALWAYS",
    titleItalic: "getting smarter",
    desc: "Post-launch, our models retrain on your live data, dashboards surface new signals, and our teams iterate continuously — so your platform improves itself.",
    stat: { value: "10×", label: "Faster decisions" },
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  },
];

// Keyframes for the new pillars section
const PK_KEYFRAMES = `
  @keyframes pkHeaderIn {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pkNumIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 0.6; transform: translateX(0); }
  }
  @keyframes pkImgZoom {
    from { transform: scale(1.1); }
    to   { transform: scale(1); }
  }
  @keyframes pkTextIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

// Single stacked card component
function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof CX_PILLARS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("pk-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Stagger sticky tops so cards peek behind each other like PieterKoopt
  const stickyTop = 72 + index * 20;

  return (
    <div
      ref={cardRef}
      className="pk-card"
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index + 1,
        // Extra bottom margin so next card has space to reveal below
        marginBottom: index < CX_PILLARS.length - 1 ? "0px" : "0px",
      }}
    >
      <div
        className="pk-card-inner"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "520px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.06)",
          background: `hsl(${25 + index * 3}, 10%, ${5 + index * 0.5}%)`,
          boxShadow:
            "0 28px 72px -10px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* ── LEFT pane ── */}
        <div
          style={{
            padding: "52px 56px 52px 60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRight: "1px solid rgba(255,255,255,0.04)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle bottom-left warm glow */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,90,20,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Large italic number — top */}
          <div
            className="pk-num"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(88px, 9vw, 130px)",
              fontWeight: 400,
              fontStyle: "italic",
              lineHeight: 1,
              color: "rgb(255,130,50)",
              opacity: 0,
              letterSpacing: "-0.02em",
              userSelect: "none",
            }}
          >
            {pillar.num}
          </div>

          {/* Bottom text block */}
          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Step label */}
            <p
              className="pk-text"
              style={{
                fontSize: "9px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgb(255,130,50)",
                marginBottom: "14px",
                opacity: 0,
              }}
            >
              {pillar.label}
            </p>

            {/* Title: condensed caps + italic serif (exactly like PieterKoopt) */}
            <h3
              className="pk-text"
              style={{
                margin: 0,
                padding: 0,
                lineHeight: 1.0,
                marginBottom: "22px",
                opacity: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily:
                    "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(30px, 3.2vw, 48px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  color: "#f0e8df",
                }}
              >
                {pillar.titlePlain}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(24px, 2.6vw, 40px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "rgba(240,232,223,0.65)",
                  letterSpacing: "0.01em",
                  marginTop: "2px",
                }}
              >
                {pillar.titleItalic}
              </span>
            </h3>

            {/* Thin orange line separator */}
            <div
              className="pk-text"
              style={{
                width: "44px",
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,130,50,0.9), transparent)",
                marginBottom: "18px",
                opacity: 0,
              }}
            />

            {/* Description */}
            <p
              className="pk-text"
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(240,232,223,0.38)",
                maxWidth: "380px",
                marginBottom: "28px",
                opacity: 0,
              }}
            >
              {pillar.desc}
            </p>

            {/* Stat + CTA row */}
            <div
              className="pk-text"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "18px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                opacity: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: "30px",
                    fontWeight: 700,
                    color: "rgb(255,130,50)",
                    lineHeight: 1,
                  }}
                >
                  {pillar.stat.value}
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.27)",
                  }}
                >
                  {pillar.stat.label}
                </span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(255,130,50,0.45)",
                }}
              >
                Know more →
              </span>
            </div>
          </div>
        </div>

        {/* ── RIGHT pane: image ── */}
        <div style={{ position: "relative", overflow: "hidden", background: "#060504" }}>
          <img
            ref={imgRef}
            src={pillar.image}
            alt={pillar.titlePlain}
            className="pk-img"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.52) saturate(0.55)",
              transformOrigin: "center center",
            }}
          />

          {/* Gradient overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)" }} />

          {/* Orange bottom edge accent — exact PieterKoopt detail */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "55%",
              height: "2px",
              background: "linear-gradient(to right, rgba(255,110,30,0.9), transparent)",
            }}
          />

          {/* Step badge top-right */}
          <div
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              padding: "5px 13px",
              background: "rgba(255,90,20,0.08)",
              border: "1px solid rgba(255,110,30,0.22)",
              borderRadius: "999px",
              fontSize: "9px",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,200,140,0.6)",
            }}
          >
            {pillar.label}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PieterKoopt-style section ─────────────────────────────────────────────────
function PillarsHowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.animation =
            "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="relative border-t border-white/5"
      style={{ paddingTop: "6rem", paddingBottom: "14rem" }}
    >
      <style>{`
        ${PK_KEYFRAMES}

        /* Card entrance */
        .pk-card {
          opacity: 0;
          transform: translateY(64px) scale(0.984);
          transition:
            opacity 0.85s cubic-bezier(0.22,1,0.36,1),
            transform 0.85s cubic-bezier(0.22,1,0.36,1);
        }
        .pk-card.pk-vis {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        /* Number slides in */
        .pk-card.pk-vis .pk-num {
          animation: pkNumIn 1s cubic-bezier(0.22,1,0.36,1) 0.2s both;
        }

        /* Text elements stagger in */
        .pk-card.pk-vis .pk-text:nth-child(1) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .pk-card.pk-vis .pk-text:nth-child(2) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.38s both; }
        .pk-card.pk-vis .pk-text:nth-child(3) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
        .pk-card.pk-vis .pk-text:nth-child(4) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
        .pk-card.pk-vis .pk-text:nth-child(5) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.56s both; }

        /* Image zoom on reveal */
        .pk-card.pk-vis .pk-img {
          animation: pkImgZoom 1.6s cubic-bezier(0.22,1,0.36,1) 0.05s both;
        }

        /* Hover elevation */
        .pk-card-inner:hover {
          box-shadow:
            0 48px 100px -12px rgba(0,0,0,0.85),
            0 0 0 1px rgba(255,130,50,0.1),
            0 0 48px rgba(255,90,10,0.07);
        }

        /* Card-specific transition delays (stagger on scroll) */
        .pk-card:nth-child(1) { transition-delay: 0s; }
        .pk-card:nth-child(2) { transition-delay: 0.06s; }
        .pk-card:nth-child(3) { transition-delay: 0.12s; }
        .pk-card:nth-child(4) { transition-delay: 0.18s; }
      `}</style>

      {/* ── Section header ── */}
      <div
        ref={headerRef}
        className="mx-auto max-w-7xl px-6 mb-16"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          {/* Left */}
          <div>
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,232,223,0.32)",
                marginBottom: "22px",
              }}
            >
              HOW WE WORK
            </p>
            <h2
              style={{
                fontFamily:
                  "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontSize: "clamp(44px, 7vw, 96px)",
                fontWeight: 700,
                lineHeight: 0.9,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "#f0e8df",
                margin: 0,
              }}
            >
              PILLARS
              <br />
              <em
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "rgb(255,130,50)",
                  textTransform: "none",
                  fontSize: "0.82em",
                  letterSpacing: "0em",
                }}
              >
                driving CX
              </em>
            </h2>
          </div>

          {/* Right descriptor */}
          <p
            style={{
              maxWidth: "340px",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(240,232,223,0.36)",
              textAlign: "right",
            }}
          >
            At Jarvis Technolabs, we keep things focused, fast, and impactful.
            Follow the pillars below — and we take care of the rest.
          </p>
        </div>
      </div>

      {/* ── Stacked sticky cards ── */}
      <div className="mx-auto max-w-7xl px-6">
        {CX_PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.num} pillar={pillar} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── Insight cards ────────────────────────────────────────────────────────────
const INSIGHT_CARDS = [
  {
    tag: "AI Strategy",
    title: "Agentic AI: Beyond the Chatbot Era",
    excerpt: "How autonomous agents are rewriting the rules of enterprise automation—and what it means for your 2025 roadmap.",
    date: "Apr 2025",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
  },
  {
    tag: "CX Innovation",
    title: "Sensory UX: Designing for the Post-Screen World",
    excerpt: "Voice, haptics, and ambient interfaces are converging. Here's how to lead the transition gracefully.",
    date: "Mar 2025",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80",
  },
  {
    tag: "Data & Cloud",
    title: "Sovereign Data for Regulated Industries",
    excerpt: "Building cloud-native platforms that satisfy compliance requirements without sacrificing product velocity.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  },
  {
    tag: "Future of Work",
    title: "The Human-AI Operating Model",
    excerpt: "Rethinking org design when 40 % of tasks are delegated to digital colleagues who never sleep.",
    date: "Feb 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80",
  },
  {
    tag: "Platform Eng.",
    title: "Internal Developer Platforms That Get Adopted",
    excerpt: "Product thinking applied to infrastructure: why golden paths beat mandates every time.",
    date: "Jan 2025",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1600&q=80",
  },
];

// ─── Insight Carousel ─────────────────────────────────────────────────────────
function InsightFlashcards() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = INSIGHT_CARDS.length;

  const goTo = useCallback((next: number) => {
    if (transitioning || next === active) return;
    setLeaving(active);
    setTransitioning(true);
    setActive(next);
    setTimeout(() => {
      setLeaving(null);
      setTransitioning(false);
    }, 600);
  }, [transitioning, active]);

  const advance = useCallback(() => goTo((active + 1) % total), [active, goTo, total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, 4800);
  }, [advance]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const card = INSIGHT_CARDS[active];
  const leavingCard = leaving !== null ? INSIGHT_CARDS[leaving] : null;

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
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.42) saturate(0.75) hue-rotate(8deg)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 42%)" }} />
          <div className="absolute bottom-0 left-0" style={{ width: "65%", height: "2px", background: "linear-gradient(to right, rgba(255,100,30,1) 0%, rgba(255,160,60,0.45) 60%, transparent 100%)" }} />
          <div className="absolute top-0 bottom-0 left-0" style={{ width: "3px", background: "linear-gradient(to bottom, transparent 5%, rgba(255,110,30,0.8) 35%, rgba(255,110,30,0.8) 65%, transparent 95%)" }} />
          <div className="absolute bottom-0 left-0" style={{ width: "420px", height: "180px", background: "radial-gradient(ellipse at bottom left, rgba(255,80,10,0.2) 0%, transparent 70%)" }} />
          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center" style={{ zIndex: 3 }}>
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

        {leavingCard && (
          <div className="absolute inset-0 w-full h-full" style={{ zIndex: 3, opacity: transitioning ? 0 : 1, transition: "opacity 0.6s ease" }}>
            <img src={leavingCard.image} alt={leavingCard.title} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "brightness(0.42) saturate(0.75) hue-rotate(8deg)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.08) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 42%)" }} />
          </div>
        )}

        <button onClick={() => { goTo((active - 1 + total) % total); resetTimer(); }} aria-label="Previous" className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/12 bg-black/30 backdrop-blur-sm hover:border-orange-500/50 transition-all" style={{ color: "rgba(255,255,255,0.45)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>
        <button onClick={() => { advance(); resetTimer(); }} aria-label="Next" className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/12 bg-black/30 backdrop-blur-sm hover:border-orange-500/50 transition-all" style={{ color: "rgba(255,255,255,0.45)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>

        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4 px-6">
          <div className="w-full max-w-xs h-[1px] bg-white/10 rounded-full overflow-hidden">
            <div key={`bar-${active}`} className="h-full rounded-full" style={{ background: "rgb(255,130,50)", animation: "progressBar 4.8s linear forwards" }} />
          </div>
          <div className="flex items-center gap-2">
            {INSIGHT_CARDS.map((_, i) => (
              <button key={i} onClick={() => { goTo(i); resetTimer(); }}
                style={{ width: i === active ? "28px" : "7px", height: "7px", borderRadius: "4px", background: i === active ? "rgb(255,130,50)" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`@keyframes progressBar { from { width: 0% } to { width: 100% } }`}</style>
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

      {/* ── The Architect of Autonomy ────────────────────────────────────── */}
      <section className="relative py-32 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6">
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
          <ServiceMosaic />
        </div>
      </section>

      {/* ── PieterKoopt-style stacked Pillars ── */}
      <PillarsHowItWorks />

      <InsightFlashcards />
      <Industries />
      <Testimonials />
      <CTA showBrands={true} />
      <Footer />
    </main>
  );
}