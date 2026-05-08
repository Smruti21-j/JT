import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const REASONS = [
  {
    n: "01",
    t: "Agentic Workforce",
    d: "AI that reasons, plans, and executes missions independently while your team focuses on strategy.",
  },
  {
    n: "02",
    t: "Digital Sovereignty",
    d: "Build systems you own, manage, and evolve — your data stays your most private and powerful asset.",
  },
  {
    n: "03",
    t: "High-Velocity Substrate",
    d: "Nearly a decade of battle-tested shipping. We skip the experimentation phase and move you to scaled impact.",
  },
  {
    n: "04",
    t: "Human–AI Symbiosis",
    d: "Mission-ready squads that blend human intuition with AI precision — accelerating time-to-market by 40%.",
  },
  {
    n: "05",
    t: "Architectural Resilience",
    d: "Composable, modular architecture designed to adapt to 6G, edge computing, and whatever comes next.",
  },
  {
    n: "06",
    t: "Deciphered Outcomes",
    d: "Every specialist links technical performance to commercial return — measurable ROI, no hype.",
  },
];

const SYNC_POINTS = [
  {
    n: "01",
    label: "Zero Latency Progress",
    d: "When one region logs off, the next picks up the torch. Your roadmap stays in a state of perpetual motion.",
  },
  {
    n: "02",
    label: "The Single Thread",
    d: "Diversity of location doesn't mean a dilution of focus. You get one point of accountability: a single lead who orchestrates the global symphony so you don't have to.",
  },
  {
    n: "03",
    label: "Async-First, Human-Always",
    d: "We've mastered the art of asynchronous documentation and deep-work cycles, ensuring that when we do meet, it's for high-value strategy, not status updates.",
  },
];

const STACK_DATA = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI",
  "React Native", "Flutter", "iOS Swift", "Android Kotlin",
  "AWS", "GCP", "Azure", "Postgres", "MongoDB", "Redis",
  "LangChain", "OpenAI", "Anthropic", "PyTorch",
];

// back[0]=furthest back, [3]=front
const OFFSETS = [
  { x: 18, y: -24, scale: 0.87, brightness: 0.70 },
  { x: 11, y: -15, scale: 0.92, brightness: 0.81 },
  { x:  4, y:  -6, scale: 0.965, brightness: 0.92 },
  { x:  0, y:   0, scale: 1.00,  brightness: 1.00 },
];

type Phase = "idle" | "falling";

// ─── CARD DECK (pieterkoopt-style fall animation) ─────────────────────────────
function CardDeck() {
  const [deck, setDeck]   = useState(REASONS.map((_, i) => i));
  const [phase, setPhase] = useState<Phase>("idle");
  const pausedRef = useRef(false);
  const phaseRef  = useRef<Phase>("idle");

  const advance = useCallback(() => {
    if (phaseRef.current !== "idle") return;
    phaseRef.current = "falling";
    setPhase("falling");
    setTimeout(() => {
      setDeck(prev => { const n = [...prev]; n.unshift(n.pop()!); return n; });
      phaseRef.current = "idle";
      setPhase("idle");
    }, 600);
  }, []);

  useEffect(() => {
    const t = setInterval(() => { if (!pausedRef.current) advance(); }, 3400);
    return () => clearInterval(t);
  }, [advance]);

  const visible = deck.slice(-4);

  return (
    <div
      style={{
        position: "relative",
        width: "360px",
        height: "460px",
        flexShrink: 0,
        perspective: "900px",
        perspectiveOrigin: "50% 40%",
      }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      {visible.map((reasonIdx, pos) => {
        const isFront   = pos === visible.length - 1;
        const off       = OFFSETS[pos + (OFFSETS.length - visible.length)];
        const r         = REASONS[reasonIdx];
        const isFalling = isFront && phase === "falling";

        const idleT = `translateX(${off.x}px) translateY(${off.y}px) rotateX(0deg) scale(${off.scale})`;
        const fallT = `translateX(${off.x}px) translateY(${off.y + 28}px) rotateX(52deg) scale(0.84)`;

        return (
          <div
            key={reasonIdx}
            onClick={() => { if (isFront) advance(); }}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "18px",
              background: isFront ? "#f3ede2" : `hsl(40, 20%, ${80 - (3 - pos) * 5}%)`,
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "36px 32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: isFront ? "pointer" : "default",
              zIndex: pos + 1,
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
              transform: isFalling ? fallT : idleT,
              opacity: isFalling ? 0 : 1,
              filter: `brightness(${off.brightness})`,
              transition: isFalling
                ? "transform 0.52s cubic-bezier(0.55,0,1,0.45), opacity 0.38s ease 0.12s"
                : "transform 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, filter 0.3s ease",
              willChange: "transform, opacity",
              boxShadow: isFront
                ? "0 28px 72px rgba(0,0,0,0.22), 0 6px 20px rgba(0,0,0,0.10)"
                : "none",
              overflow: "hidden",
            }}
          >
            <span style={{
              display: "block",
              fontFamily: "monospace",
              fontSize: "10px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: isFront ? "rgba(18,10,2,0.28)" : "rgba(18,10,2,0.12)",
              marginBottom: "16px",
            }}>
              {r.n} — 06
            </span>

            <div style={{ flex: 1 }}>
              <h3 style={{
                fontSize: "clamp(2.2rem,5vw,3rem)",
                fontWeight: 700,
                color: isFront ? "#150d03" : "rgba(21,13,3,0.18)",
                lineHeight: 1.0,
                letterSpacing: "-0.022em",
                fontFamily: "var(--font-display, 'Georgia', serif)",
                textTransform: "uppercase",
                margin: 0,
              }}>
                {r.t}
              </h3>
            </div>

            {isFront && (
              <div style={{ marginTop: "auto", paddingTop: "22px" }}>
                <div style={{ height: "1px", background: "rgba(18,10,2,0.08)", marginBottom: "14px" }} />
                <p style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "13px",
                  color: "rgba(18,10,2,0.46)",
                  lineHeight: 1.75,
                  margin: 0,
                }}>
                  {r.d}
                </p>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: "14px",
                }}>
                  <span style={{
                    fontFamily: "monospace",
                    fontSize: "9px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "rgba(18,10,2,0.22)",
                  }}>
                    NEXT →
                  </span>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {REASONS.map((_, i) => (
                      <span key={i} style={{
                        width: "5px", height: "5px", borderRadius: "50%",
                        display: "inline-block",
                        background: deck[deck.length - 1] === i
                          ? "rgba(18,10,2,0.5)" : "rgba(18,10,2,0.12)",
                        transition: "background 0.3s",
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {isFront && (
              <div style={{
                position: "absolute", bottom: "26px", right: "26px",
                width: "20px", height: "20px",
                borderRight: "1px solid rgba(18,10,2,0.1)",
                borderBottom: "1px solid rgba(18,10,2,0.1)",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── ROUTE ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Dedicated Talent — Jarvis Technolabs" },
      { name: "description", content: "Deploy a mission-ready collective that orchestrates outcomes." },
      { property: "og:title", content: "Hire Dedicated Talent — Jarvis Technolabs" },
      { property: "og:description", content: "Stop fighting for headcount. Start acquiring decision authority." },
    ],
  }),
});

// ─── PAGE ─────────────────────────────────────────────────────────────────────
function HirePage() {
  useReveal();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "#0a0806", minHeight: "100vh", display: "flex", alignItems: "center" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute pointer-events-none" style={{
          left: "32%", top: "50%", transform: "translate(-50%,-50%)",
          width: "900px", height: "900px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,80,0,0.08) 0%, transparent 62%)",
        }} />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 w-full py-24">
          <div style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "80px", flexWrap: "wrap",
          }}>
            {/* LEFT */}
            <div style={{ flex: "1 1 380px", maxWidth: "520px" }}>
              <p style={{
                fontSize: "11px", letterSpacing: "0.28em",
                color: "rgba(255,130,50,0.75)", textTransform: "uppercase",
                marginBottom: "22px", fontFamily: "sans-serif",
              }}>
                IMPACT HUB · DEPLOY YOUR TEAM
              </p>
              <h1 style={{
                fontSize: "clamp(2.4rem,5.5vw,4.6rem)", fontWeight: 800,
                color: "#f0e8df", lineHeight: 1.03, letterSpacing: "-0.028em",
                textTransform: "uppercase", marginBottom: "26px",
                fontFamily: "var(--font-display, sans-serif)",
              }}>
                ARE YOU READY TO<br />
                INITIALIZE THE NEXT<br />
                SEQUENCE OF
                <em style={{
                  display: "block", fontStyle: "italic", fontWeight: 300,
                  color: "rgb(255,130,50)", fontSize: "0.88em", marginTop: "4px",
                }}>
                  GLOBAL GROWTH?
                </em>
              </h1>
              <p style={{
                fontSize: "14px", color: "rgba(240,232,220,0.5)",
                lineHeight: 1.75, maxWidth: "400px", marginBottom: "40px",
              }}>
                From your ambition to unvarnished impact. Enter the Impact Hub — a
                high-velocity studio designed for the world's most important decisions.
                Deploy a team that thinks like a partner and acts like an agent, turning
                your boldest ideas into autonomous reality.
              </p>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "12px",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  padding: "15px 28px", fontSize: "11px", letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.65)",
                  textDecoration: "none", borderRadius: "2px", transition: "all 0.25s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgb(255,130,50)";
                  (e.currentTarget as HTMLElement).style.color = "rgb(255,130,50)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                }}
              >
                DEPLOY YOUR TEAM
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>

            {/* RIGHT: card deck */}
            <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CardDeck />
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING WITHOUT BORDERS ───────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-28">

          {/* Header */}
          <div className="reveal mb-16 max-w-4xl">
            <p className="text-xs tracking-[0.3em] text-warm bracket-label mb-6">
              GLOBAL SYNCHRONICITY ENGINE
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-tight mb-8">
              Engineering Without Borders.{" "}
              <em className="text-warm not-italic font-light">Innovation Without Sleep.</em>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                In a world that never stops, your development shouldn't either. We've transcended
                the traditional "outsourcing" model to build a{" "}
                <span className="text-foreground">Global Synchronicity Engine</span>. We don't
                just fill seats; we stitch together a high-velocity talent fabric across India,
                Europe, the Middle East and Africa (EMEA), and the Americas to ensure your product
                evolves while you sleep.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Why wait for tomorrow when progress is happening now? We leverage the rotation of
                the Earth to turn linear timelines into{" "}
                <span className="text-foreground">exponential output</span>.
              </p>
            </div>
          </div>

          {/* Three sync points */}
          <div className="reveal divide-y divide-white/8">
            {SYNC_POINTS.map((pt, i) => (
              <div
                key={pt.n}
                className="grid md:grid-cols-12 gap-6 py-10 group"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Number */}
                <div className="md:col-span-1">
                  <span className="font-mono text-[10px] tracking-[0.28em] text-muted-foreground">
                    {pt.n}
                  </span>
                </div>

                {/* Label */}
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl md:text-2xl font-light text-foreground group-hover:text-warm transition-colors duration-300 leading-tight">
                    {pt.label}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-7">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {pt.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH DNA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-12">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              TECHNOLOGICAL DNA
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-tight max-w-2xl">
              Forging Vision into{" "}
              <em className="text-warm not-italic font-light">Shipped Reality.</em>
            </h2>
          </div>
          <div className="reveal flex flex-wrap gap-3">
            {STACK_DATA.map((s, i) => (
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CTA
        eyebrow="HIRE TALENT · START IN 7 DAYS"
        title={
          <>
            Plug in a pod that{" "}
            <em className="text-warm not-italic font-light">ships from week one.</em>
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