import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Industries } from "@/components/site/Industries";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA, Footer, Accreditations } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Local image imports ──────────────────────────────────────────────────────
import pillarImg1 from "/index-image1.png";
import pillarImg2 from "/index-image2.png";
import pillarImg3 from "/index-image3.jpg";
import pillarImg4 from "/index-image4.jpg";
import pillarImg5 from "/index-image5.jpg";
import pillarImg6 from "/index-image6.jpg";
import pillarImg7 from "/index-image7.png";
import pillarImg8 from "/index-image8.png";

// ─────────────────────────────────────────────────────────────────────────────
// PILLARS
// ─────────────────────────────────────────────────────────────────────────────

const CX_PILLARS = [
  {
    num: "01",
    titlePlain: "INTELLIGENCE",
    titleItalic: "that Acts",
    desc: "Transition from generative prompts to agentic workflows that resolve complex tasks with zero friction.",
    stat: { value: "", label: "" },
    image: pillarImg1,
  },
  {
    num: "02",
    titlePlain: "THE AI-",
    titleItalic: "First Core",
    desc: "Embed intelligence into the substrate of your business to create a self-evolving, future-proof operating model.",
    stat: { value: "", label: "" },
    image: "/index-image2.png",
  },
  {
    num: "03",
    titlePlain: "DIGITAL ENGINEERING",
    titleItalic: "At Scale",
    desc: "Accelerate your time-to-impact with battle-tested engineering playbooks and frontier technology stacks.",
    stat: { value: "", label: "" },
    image: "/index-image3.jpg",
  },
  {
    num: "04",
    titlePlain: "NEXT GEN",
    titleItalic: "Ecosystems",
    desc: "Build the connected, cloud-native infrastructure required for a resilient and sovereign digital future.",
    stat: { value: "", label: "" },
    image: "/index-image4.jpg",
  },
  {
    num: "05",
    titlePlain: "DESIGN WITH",
    titleItalic: "PURPOSE",
    desc: "Amplify human potential through sensory UX that balances high-tech precision with human-centric empathy.",
    stat: { value: "", label: "" },
    image: "/index-image5.jpg",
  },
  {
    num: "06",
    titlePlain: "ACCELERATED VALUE",
    titleItalic: "Chains",
    desc: "Unlock pervasive efficiencies across your entire enterprise with data-driven insights that act as your growth catalyst.",
    stat: { value: "", label: "" },
    image: "/index-image6.jpg",
  },
  {
    num: "07",
    titlePlain: "THE ARCHITECTS",
    titleItalic: "Of Intent",
    desc: "Before you build autonomy, you must engineer the intent. We map your industry's future friction points to design custom governance and cognitive blueprints, ensuring your proprietary intelligence remains entirely your own.",
    stat: { value: "", label: "" },
    image: "/index-image7.png",
  },
  {
    num: "08",
    titlePlain: "THE ENGINE OF",
    titleItalic: "Perpetual Motion",
    desc: "Autonomy isn't set and forget - it is a living ecosystem. Our engineering squads continuously tune, optimize, & defend your agentic workflows and self-healing infrastructure in real time.",
    stat: { value: "", label: "" },
    image: "/index-image8.png",
  },
];

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

  const stickyTop = 72 + index * 20;

  return (
    <div
      ref={cardRef}
      className="pk-card"
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index + 1,
        marginBottom: 0,
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
          boxShadow: "0 28px 72px -10px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        {/* LEFT pane */}
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
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "260px",
              height: "260px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,90,20,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
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
          <div style={{ position: "relative", zIndex: 1 }}>
            <p className="pk-text" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgb(255,130,50)", marginBottom: "14px", opacity: 0 }}>
              {pillar.label}
            </p>
            <h3 className="pk-text" style={{ margin: 0, padding: 0, lineHeight: 1.0, marginBottom: "22px", opacity: 0 }}>
              <span style={{ display: "block", fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: "clamp(30px, 3.2vw, 48px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.03em", color: "#f0e8df" }}>
                {pillar.titlePlain}
              </span>
              <span style={{ display: "block", fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(24px, 2.6vw, 40px)", fontWeight: 300, fontStyle: "italic", color: "rgba(240,232,223,0.65)", letterSpacing: "0.01em", marginTop: "2px" }}>
                {pillar.titleItalic}
              </span>
            </h3>
            <div className="pk-text" style={{ width: "44px", height: "1px", background: "linear-gradient(to right, rgba(255,130,50,0.9), transparent)", marginBottom: "18px", opacity: 0 }} />
            <p className="pk-text" style={{ fontSize: "14px", lineHeight: 1.8, color: "rgba(240,232,223,0.38)", maxWidth: "380px", marginBottom: "28px", opacity: 0 }}>
              {pillar.desc}
            </p>
            <div className="pk-text" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "18px", borderTop: "1px solid rgba(255,255,255,0.05)", opacity: 0 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "30px", fontWeight: 700, color: "rgb(255,130,50)", lineHeight: 1 }}>{pillar.stat.value}</span>
                <span style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.27)" }}>{pillar.stat.label}</span>
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,130,50,0.45)" }}>Know more →</span>
            </div>
          </div>
        </div>

        {/* RIGHT pane */}
        <div style={{ position: "relative", overflow: "hidden", background: "#060504" }}>
          <img
            ref={imgRef}
            src={pillar.image}
            alt={pillar.titlePlain}
            className="pk-img"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.52) saturate(0.55)", transformOrigin: "center center" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 55%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 45%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, width: "55%", height: "2px", background: "linear-gradient(to right, rgba(255,110,30,0.9), transparent)" }} />
          <div style={{ position: "absolute", top: "24px", right: "24px", padding: "5px 13px", background: "rgba(255,90,20,0.08)", border: "1px solid rgba(255,110,30,0.22)", borderRadius: "999px", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,200,140,0.6)" }}>
            {pillar.label}
          </div>
        </div>
      </div>
    </div>
  );
}

function PillarsHowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.animation = "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both";
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative border-t border-white/5" style={{ paddingTop: "6rem", paddingBottom: "14rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .pk-card { opacity: 0; transform: translateY(64px) scale(0.984); transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1); }
        .pk-card.pk-vis { opacity: 1; transform: translateY(0) scale(1); }
        .pk-card.pk-vis .pk-num { animation: pkNumIn 1s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .pk-card.pk-vis .pk-text:nth-child(1) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .pk-card.pk-vis .pk-text:nth-child(2) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.38s both; }
        .pk-card.pk-vis .pk-text:nth-child(3) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.44s both; }
        .pk-card.pk-vis .pk-text:nth-child(4) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
        .pk-card.pk-vis .pk-text:nth-child(5) { animation: pkTextIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.56s both; }
        .pk-card.pk-vis .pk-img { animation: pkImgZoom 1.6s cubic-bezier(0.22,1,0.36,1) 0.05s both; }
        .pk-card-inner:hover { box-shadow: 0 48px 100px -12px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,130,50,0.1), 0 0 48px rgba(255,90,10,0.07); }
        .pk-card:nth-child(1) { transition-delay: 0s; }
        .pk-card:nth-child(2) { transition-delay: 0.06s; }
        .pk-card:nth-child(3) { transition-delay: 0.12s; }
        .pk-card:nth-child(4) { transition-delay: 0.18s; }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-7xl px-6 mb-16" style={{ opacity: 0 }}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(240,232,223,0.32)", marginBottom: "22px" }}>
              [PILLARS]
            </p>
            <h2 style={{ fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif", fontSize: "clamp(44px, 7vw, 96px)", fontWeight: 700, lineHeight: 0.9, textTransform: "uppercase", letterSpacing: "-0.01em", color: "#f0e8df", margin: 0 }}>
              THE ARCHITECT OF
              <br />
              <em style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 300, color: "rgb(255,130,50)", textTransform: "none", fontSize: "0.82em", letterSpacing: "0em" }}>
                AUTONOMY
              </em>
            </h2>
          </div>
          <p style={{ maxWidth: "340px", fontSize: "15px", lineHeight: 1.75, color: "rgba(240,232,223,0.36)", textAlign: "right" }}>
            The foundation for your global growth, built on nearly a decade of high-velocity engineering.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        {CX_PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.num} pillar={pillar} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHT CARDS DATA
// ─────────────────────────────────────────────────────────────────────────────

const INSIGHT_CARDS = [
  {
    tag: "AI Strategy",
    title: "Agentic AI: Beyond the Chatbot Era",
    excerpt: "How autonomous agents are rewriting the rules of enterprise automation—and what it means for your 2025 roadmap.",
    image: "Insights1.png",
  },
  {
    tag: "CX Innovation",
    title: "Sensory UX: Designing for the Post-Screen World",
    excerpt: "Voice, haptics, and ambient interfaces are converging. Here's how to lead the transition gracefully.",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1600&q=80",
  },
  {
    tag: "Data & Cloud",
    title: "Sovereign Data for Regulated Industries",
    excerpt: "Building cloud-native platforms that satisfy compliance requirements without sacrificing product velocity.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  },
  {
    tag: "Future of Work",
    title: "The Human-AI Operating Model",
    excerpt: "Rethinking org design when 40% of tasks are delegated to digital colleagues who never sleep.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80",
  },
  {
    tag: "Platform Eng.",
    title: "Internal Developer Platforms That Get Adopted",
    excerpt: "Product thinking applied to infrastructure: why golden paths beat mandates every time.",
    image: "/InsightsPE6.jpg",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHT FLASHCARDS — scroll-hijack + directional slide wipe animation
// ─────────────────────────────────────────────────────────────────────────────

function InsightFlashcards() {
  const total = INSIGHT_CARDS.length;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [active, setActive]       = useState(0);
  const [prev, setPrev]           = useState<number | null>(null);
  const [dir, setDir]             = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused]       = useState(false);

  // refs so event handlers always see fresh values
  const activeRef    = useRef(0);
  const lockedRef    = useRef(false);
  const pausedRef    = useRef(false);
  const animRef      = useRef(false);
  const scrollAccum  = useRef(0);
  const THRESHOLD    = 80;

  // ── core navigation ──────────────────────────────────────────────────────
  const goTo = useCallback((next: number, direction: "next" | "prev") => {
    if (animRef.current) return;
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (clamped === activeRef.current) return;

    setDir(direction);
    setPrev(activeRef.current);
    setAnimating(true);
    animRef.current = true;
    activeRef.current = clamped;
    setActive(clamped);
    scrollAccum.current = 0;

    // animation duration matches CSS (700ms)
    setTimeout(() => {
      setAnimating(false);
      setPrev(null);
      animRef.current = false;
    }, 700);
  }, [total]);

  // ── scroll hijack ────────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault();
      if (pausedRef.current || animRef.current) return;

      scrollAccum.current += e.deltaY;

      if (scrollAccum.current >= THRESHOLD) {
        const next = activeRef.current + 1;
        if (next >= total) {
          lockedRef.current = false;
          scrollAccum.current = 0;
          return;
        }
        goTo(next, "next");
      } else if (scrollAccum.current <= -THRESHOLD) {
        const next = activeRef.current - 1;
        if (next < 0) {
          lockedRef.current = false;
          scrollAccum.current = 0;
          return;
        }
        goTo(next, "prev");
      }
    };

    section.addEventListener("wheel", onWheel, { passive: false });
    return () => section.removeEventListener("wheel", onWheel);
  }, [goTo, total]);

  // ── intersection lock ─────────────────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        lockedRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      },
      { threshold: 0.5 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // ── auto-advance ──────────────────────────────────────────────────────────
  useEffect(() => { pausedRef.current = paused; }, [paused]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (pausedRef.current || !lockedRef.current || animRef.current) return;
      const next = activeRef.current + 1;
      if (next < total) goTo(next, "next");
    }, 5000);
    return () => clearInterval(id);
  }, [paused, goTo, total]);

  // ── touch swipe ───────────────────────────────────────────────────────────
  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(activeRef.current + (diff > 0 ? 1 : -1), diff > 0 ? "next" : "prev");
  };

  const card     = INSIGHT_CARDS[active];
  const prevCard = prev !== null ? INSIGHT_CARDS[prev] : null;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-white/5"
      style={{ minHeight: "100vh" }}
      onClick={() => setPaused((p) => !p)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        /* ── Slide wipe keyframes ── */
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0%);   }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0%);    }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0%);    }
          to   { transform: translateX(-100%); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0%);   }
          to   { transform: translateX(100%); }
        }

        /* Background image moves slightly slower = parallax depth */
        @keyframes bgParallaxRight {
          from { transform: translateX(6%) scale(1.06); }
          to   { transform: translateX(0%) scale(1);    }
        }
        @keyframes bgParallaxLeft {
          from { transform: translateX(-6%) scale(1.06); }
          to   { transform: translateX(0%)  scale(1);    }
        }

        /* Text elements stagger up */
        @keyframes textUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* Incoming card */
        .ic-enter-next { animation: slideInRight  0.72s cubic-bezier(0.22,1,0.36,1) both; }
        .ic-enter-prev { animation: slideInLeft   0.72s cubic-bezier(0.22,1,0.36,1) both; }

        /* Outgoing card */
        .ic-exit-next  { animation: slideOutLeft  0.65s cubic-bezier(0.4,0,0.6,1) both; }
        .ic-exit-prev  { animation: slideOutRight 0.65s cubic-bezier(0.4,0,0.6,1) both; }

        /* BG parallax */
        .ic-bg-next { animation: bgParallaxRight 0.78s cubic-bezier(0.22,1,0.36,1) both; }
        .ic-bg-prev { animation: bgParallaxLeft  0.78s cubic-bezier(0.22,1,0.36,1) both; }

        /* Staggered text */
        .ic-t1 { animation: textUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
        .ic-t2 { animation: textUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.22s both; }
        .ic-t3 { animation: textUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.30s both; }
        .ic-t4 { animation: textUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.37s both; }

        /* Progress bar */
        @keyframes barGrow { from { width: 0% } to { width: 100% } }
        .ic-bar { animation: barGrow 5s linear forwards; }
      `}</style>

      {/* ── Section header ── */}
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-4">
              [LATEST THINKING]
            </p>
            <h2 className="font-display text-4xl md:text-5xl tracking-tight">
              Insights &amp; <em className="text-warm not-italic font-light">Perspectives</em>
            </h2>
          </div>
          <Link
            to="/insights"
            onClick={(e) => e.stopPropagation()}
            className="text-xs tracking-[0.25em] uppercase text-muted-foreground hover:text-warm transition-colors"
          >
            All insights →
          </Link>
        </div>
      </div>

      {/* ── Slide stage ── */}
      <div
        ref={trackRef}
        className="relative w-full overflow-hidden"
        style={{ height: "min(86vh, 620px)" }}
      >

        {/* ── OUTGOING slide — exits while new one enters ── */}
        {animating && prevCard && (
          <div
            className={`absolute inset-0 w-full h-full ${dir === "next" ? "ic-exit-next" : "ic-exit-prev"}`}
            style={{ zIndex: 2, willChange: "transform" }}
          >
            <img
              src={prevCard.image}
              alt={prevCard.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "brightness(0.38) saturate(0.7) hue-rotate(8deg)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.06) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 44%)" }} />
          </div>
        )}

        {/* ── INCOMING slide — the active card ── */}
        <div
          key={active}
          className={`absolute inset-0 w-full h-full ${animating ? (dir === "next" ? "ic-enter-next" : "ic-enter-prev") : ""}`}
          style={{ zIndex: 3, willChange: "transform" }}
        >
          {/* Background image with parallax offset */}
          <img
            src={card.image}
            alt={card.title}
            className={`absolute inset-0 w-full h-full object-cover ${animating ? (dir === "next" ? "ic-bg-next" : "ic-bg-prev") : ""}`}
            style={{ filter: "brightness(0.38) saturate(0.7) hue-rotate(8deg)", willChange: "transform" }}
          />

          {/* Overlays */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.93) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.06) 100%)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 44%)" }} />

          {/* Left accent bar */}
          <div className="absolute top-0 bottom-0 left-0" style={{ width: "3px", background: "linear-gradient(to bottom, transparent 5%, rgba(255,110,30,0.85) 35%, rgba(255,110,30,0.85) 65%, transparent 95%)" }} />
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0" style={{ width: "65%", height: "2px", background: "linear-gradient(to right, rgba(255,100,30,1) 0%, rgba(255,160,60,0.4) 60%, transparent 100%)" }} />
          {/* Corner glow */}
          <div className="absolute bottom-0 left-0" style={{ width: "380px", height: "160px", background: "radial-gradient(ellipse at bottom left, rgba(255,80,10,0.18) 0%, transparent 70%)" }} />

          {/* ── Text content — staggered entrance ── */}
          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-14 flex flex-col justify-center" style={{ zIndex: 3 }}>
            <div className="max-w-2xl">

              {/* Tag pill */}
              <span
                className="ic-t1"
                style={{
                  display: "inline-block",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "rgb(255,130,50)",
                  border: "1px solid rgba(255,130,50,0.35)",
                  background: "rgba(255,100,20,0.1)",
                  borderRadius: "999px",
                  padding: "5px 14px",
                  marginBottom: "1.4rem",
                }}
              >
                {card.tag}
              </span>

              {/* Title */}
              <h3
                className="font-display leading-tight mb-5 ic-t2"
                style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", color: "#f0e8df" }}
              >
                {card.title}
              </h3>

              {/* Excerpt */}
              <p
                className="ic-t3"
                style={{
                  fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)",
                  lineHeight: 1.75,
                  color: "rgba(240,232,223,0.58)",
                  maxWidth: "540px",
                  marginBottom: "2.2rem",
                }}
              >
                {card.excerpt}
              </p>

              {/* CTA */}
              <div className="flex items-center ic-t4">
                <Link
                  to="/insights"
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,130,50,0.9)" }}
                  className="hover:text-warm transition-colors"
                >
                  Read more →
                </Link>
              </div>

            </div>
          </div>
        </div>

        {/* ── Arrow buttons ── */}
        <button
          onClick={(e) => { e.stopPropagation(); goTo(active - 1, "prev"); }}
          disabled={active === 0}
          aria-label="Previous"
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm hover:border-orange-500/50 transition-all disabled:opacity-20"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); goTo(active + 1, "next"); }}
          disabled={active === total - 1}
          aria-label="Next"
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm hover:border-orange-500/50 transition-all disabled:opacity-20"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>

        {/* ── Bottom controls ── */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-3 px-6">

           

        

          {/* Scroll hint */}
          <p style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: active === total - 1 ? "rgba(255,130,50,0.55)" : "rgba(255,255,255,0.25)",
            marginTop: "2px",
            transition: "color 0.4s ease",
          }}>
          
          </p>
        </div>
      </div>
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
      <PillarsHowItWorks />
      <InsightFlashcards />
      <Industries />
      <Testimonials />
      <Accreditations />
      <CTA showBrands={true} />
      <Footer />
    </main>
  );
}