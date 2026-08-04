import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  Globe2,
  Layers3,
  Network,
  RadioTower,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";

import { useRef, useState, useEffect, useCallback } from "react";
import hireCover1 from "@/assets/hire-cover1.jpg";
import hireCover2 from "@/assets/hire-cover2.jpg";
import hireCover3 from "@/assets/hire-cover3.jpg";
import hireBox1 from "@/assets/hire-box1.png";
import hireBox2 from "@/assets/hire-box2.png";
import hireBox3 from "@/assets/hire-box3.jpg";
import hireBox4 from "@/assets/hire-box4.png";
import hireBox5 from "@/assets/hire-box5.png";
import hireBox6 from "@/assets/hire-box6.png";
import heroBg from "@/assets/hirecover.webp";

const REASONS = [
  {
    n: "01",
    title: "Agentic Workforce",
    kicker: "We don't just use AI tools; we build and deploy autonomous agents.",
    body: "Our specialists ensure your systems move beyond simple chat prompts to action logic - AI that reasons, plans, and executes missions independently while your team focuses on strategy.",
    image: hireBox1,
  },
  {
    n: "02",
    title: "Digital Sovereignty by Design",
    kicker: "Reclaim your digital destiny.",
    body: "Unlike agencies that lock you into black box platforms, our team forges the sovereign backbone you need. We build systems you own, manage, and evolve, ensuring your data remains your most private and powerful asset.",
    image: hireBox2,
  },
  {
    n: "03",
    title: "High-Velocity Substrate",
    kicker: "Nearly a decade of high-stakes engineering.",
    body: "With almost a decade of shipping into regulated and high-velocity markets, our playbook is already battle-tested. We skip the experimentation phase and move you directly to scaled impact.",
    image: hireBox3,
  },
  {
    n: "04",
    title: "Human-AI Symbiosis",
    kicker: "The Collective Mind approach.",
    body: "We don't replace humans; we amplify them. Our mission-ready squads are built on Human-AI Symbiosis: a seamless blend of intuition and precision that accelerates your time-to-market by 40%.",
    image: hireBox4,
  },
  {
    n: "05",
    title: "Architectural Resilience",
    kicker: "Engineered for infinite scale.",
    body: "We build on a composable, modular architecture. Whether you are disrupting a local market or entering a global frontier, our digital core is designed to adapt to 6G, edge computing, and whatever comes next.",
    image: hireBox5,
  },
  {
    n: "06",
    title: "Deciphered Outcomes",
    kicker: "Unvarnished business clarity.",
    body: "We cut through the AI hype to deliver measurable ROI. Every specialist we provide is trained to link technical performance to commercial return, giving you the receipts of impact you need to lead your industry.",
    image: hireBox6,
  },
];

const SYNC_POINTS = [
  {
    n: "01",
    icon: RadioTower,
    label: "Zero Latency Progress",
    d: "When one region logs off, the next picks up the torch. Your roadmap stays in a state of perpetual motion.",
    metric: "24h",
    metricLabel: "handoff cycle",
  },
  {
    n: "02",
    icon: Workflow,
    label: "The Single Thread",
    d: "Diversity of location doesn't mean a dilution of focus. You get one point of accountability: a single lead who orchestrates the global symphony so you don't have to.",
    metric: "1",
    metricLabel: "delivery lead",
  },
  {
    n: "03",
    icon: Network,
    label: "Async-First, Human-Always",
    d: "We've mastered the art of asynchronous documentation and deep-work cycles, ensuring that when we do meet, it's for high-value strategy, not status updates.",
    metric: "0",
    metricLabel: "status theatre",
  },
];

const DNA_GROUPS = [
  {
    title: "Frontend Systems",
    icon: Layers3,
    stack: ["React", "Next.js", "TypeScript", "Design Systems", "WebGL"],
  },
  {
    title: "Product Backbones",
    icon: Cpu,
    stack: ["Node.js", "Python", "FastAPI", "Postgres", "Redis"],
  },
  {
    title: "Mobile Surfaces",
    icon: Globe2,
    stack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
  },
  {
    title: "AI & Cloud Ops",
    icon: ShieldCheck,
    stack: ["AWS", "GCP", "Azure", "LangChain", "OpenAI", "PyTorch"],
  },
];

const HIRE_STYLES = `
 

.hire-root {
    --orange: #E85D26;
    --dark-bg: #0C0C0B;
    --dark-ink: #F7F5F1;
    font-family: var(--font-sans);
}

  /* ── MARQUEE ── */
  @keyframes hireMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
  .hire-marquee-track { animation: hireMarquee 22s linear infinite; white-space: nowrap; }

  /* ── REASON ROW hover image reveal ── */
  .hire-reason-row { position: relative; }
  .hire-reason-img {
    position: absolute;
    right: 0; top: 50%;
    transform: translateY(-50%) scale(0.96);
    width: 340px; height: 220px;
    object-fit: cover;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.38s ease, transform 0.38s ease;
    z-index: 10;
  }
  .hire-reason-row:hover .hire-reason-img {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  .hire-reason-row:hover .hire-reason-num {
    color: var(--orange);
  }

  /* ── DNA tag hover ── */
  .hire-dna-tag { transition: background 0.18s, color 0.18s; }
  .hire-dna-tag:hover { background: var(--orange); color: #fff; }

  /* ── SYNC metric ── */
  .hire-sync-metric {
    font-family: var(--font-sans);
    font-style: italic;
  }

  /* ── hero image composite ── */
  @keyframes hireFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .hire-img-float { animation: hireFloat 7s ease-in-out infinite; }
  .hire-img-float2 { animation: hireFloat 9s ease-in-out infinite 1.5s; }

  /* ── SYNC SECTION ANIMATIONS ── */

  /* count-up number — slides up from below on enter */
  @keyframes syncNumEnter {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sync-num-anim {
    opacity: 0;
  }
  .sync-num-anim.is-visible {
    animation: syncNumEnter 0.85s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* label slides up after number */
  @keyframes syncLabelEnter {
    from { opacity: 0; transform: translateY(12px); letter-spacing: 0.5em; }
    to   { opacity: 1; transform: translateY(0);    letter-spacing: 0.3em; }
  }
  .sync-label-anim {
    opacity: 0;
  }
  .sync-label-anim.is-visible {
    animation: syncLabelEnter 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* card body content fades up */
  @keyframes syncBodyEnter {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sync-body-anim {
    opacity: 0;
  }
  .sync-body-anim.is-visible {
    animation: syncBodyEnter 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* column border draws down */
  @keyframes syncBorderDraw {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0% 0); }
  }
  .sync-col-border {
    position: relative;
  }
  .sync-col-border::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 1px; height: 100%;
    background: rgba(247,245,241,0.1);
    clip-path: inset(0 0 100% 0);
    transition: clip-path 0s;
  }
  .sync-col-border.is-visible::before {
    animation: syncBorderDraw 1s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* icon pulse on enter */
  @keyframes syncIconPulse {
    0%   { opacity: 0; transform: scale(0.5); }
    60%  { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  .sync-icon-anim {
    opacity: 0;
  }
  .sync-icon-anim.is-visible {
    animation: syncIconPulse 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
function hirePalette(theme: "light" | "dark") {
  if (theme === "light") {
    return { cream: "#F7F5F1", ink: "#0C0C0B", muted: "#8A8680", rule: "rgba(12,12,11,0.12)" };
  }
  return { cream: "#14120F", ink: "#F5F2ED", muted: "rgba(245,242,237,0.5)", rule: "rgba(245,242,237,0.14)" };
}
  .sync-card:hover .sync-accent-line {
    transform: scaleX(1) !important;
  }
    transition: background 0.25s ease;
    cursor: default;
  }
  .sync-card:hover {
    background: rgba(247,245,241,0.04);
  }
  .sync-card:hover .sync-num-val {
    color: var(--orange) !important;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    .hire-hero-cols { flex-direction: column !important; }
    .hire-reason-img { display: none; }
    .hire-sync-cols { flex-direction: column !important; }
    .hire-dna-cols { flex-direction: column !important; }
  }
`;
function hirePalette(theme: "light" | "dark") {
  if (theme === "light") {
    return { cream: "#F7F5F1", ink: "#0C0C0B", muted: "#8A8680", rule: "rgba(12,12,11,0.12)" };
  }
  return { cream: "#14120F", ink: "#F5F2ED", muted: "rgba(245,242,237,0.5)", rule: "rgba(245,242,237,0.14)" };
}
/* ── Animated sync card ── */
function SyncCard({
  pt,
  index,
  Icon,
}: {
  pt: (typeof SYNC_POINTS)[0];
  index: number;
  Icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayNum, setDisplayNum] = useState("0");

  // Parse numeric value from metric string like "24h", "1", "0"
  const numMatch = pt.metric.match(/\d+/);
  const numericVal = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = pt.metric.replace(/\d+/, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up animation when visible
  useEffect(() => {
    if (!visible || numericVal === 0) {
      setDisplayNum(pt.metric);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericVal);
      setDisplayNum(`${current}${suffix}`);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayNum(pt.metric);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  const delay = index * 150;

  return (
    <div
      ref={ref}
      className={`sync-card sync-col-border${visible ? " is-visible" : ""}`}
      style={{
        flex: 1,
        padding: "2rem 2.5rem",
        borderRight: "1px solid rgba(247,245,241,0.1)",
      }}
    >
      {/* top row: index + icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <span
          className={`sync-body-anim${visible ? " is-visible" : ""}`}
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "rgba(247,245,241,0.25)",
            transitionDelay: `${delay}ms`,
            animationDelay: `${delay}ms`,
          }}
        >
          {pt.n}
        </span>
        <span
          className={`sync-icon-anim${visible ? " is-visible" : ""}`}
          style={{ animationDelay: `${delay + 100}ms` }}
        >
          <Icon size={16} color="var(--orange)" />
        </span>
      </div>

      {/* big metric */}
      <div
        className={`sync-num-anim sync-num-val${visible ? " is-visible" : ""}`}
        style={{
          fontFamily: "'EB Garamond', serif",
          fontStyle: "italic",
          fontSize: "1.35rem",
          fontWeight: 400,
          color: "var(--dark-ink)",
          lineHeight: 1,
          marginBottom: "0.3rem",
          animationDelay: `${delay + 80}ms`,
          transition: "color 0.3s ease",
        }}
      >
        {displayNum}
      </div>

      {/* metric label — letter-spacing animates in */}
      <div
        className={`sync-label-anim${visible ? " is-visible" : ""}`}
        style={{
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--orange)",
          marginBottom: "1.5rem",
          animationDelay: `${delay + 200}ms`,
        }}
      >
        {pt.metricLabel}
      </div>

      {/* title */}
      <h3
        className={`sync-body-anim${visible ? " is-visible" : ""}`}
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "1.35rem",
          fontWeight: 400,
          color: "var(--dark-ink)",
          marginBottom: "0.75rem",
          animationDelay: `${delay + 260}ms`,
        }}
      >
        {pt.label}
      </h3>

      {/* body */}
      <p
        className={`sync-body-anim${visible ? " is-visible" : ""}`}
        style={{
          fontSize: "0.85rem",
          lineHeight: 1.75,
          color: "rgba(247,245,241,0.4)",
          minHeight: "7rem",
          animationDelay: `${delay + 320}ms`,
        }}
      >
        {pt.d}
      </p>

      {/* bottom accent line — draws right on hover via CSS */}
      <div style={{ marginTop: "1.5rem", height: "1px", background: "rgba(247,245,241,0.06)", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--orange)",
            transform: "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          }}
          className="sync-accent-line"
        />
      </div>
    </div>
  );
}

/* ── Reason rows (irinamoi work-list style) ── */
function ReasonList() {
  return (
    <div>
      {REASONS.map((r, i) => (
        <div
          key={r.n}
          className="hire-reason-row group"
          style={{
            borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
            borderBottom: "1px solid var(--rule)",
            position: "relative",
            padding: "2rem 0",
            cursor: "default",
          }}
        >
          {/* hover image */}
          <img src={r.image} alt="" className="hire-reason-img" aria-hidden="true" />

          <div style={{ display: "grid", gridTemplateColumns: "4rem 1fr auto", gap: "1.5rem", alignItems: "start", paddingRight: "360px" }}>
            {/* number */}
            <span
              className="hire-reason-num"
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "1rem",
                color: "var(--muted)",
                paddingTop: "0.15rem",
                transition: "color 0.2s",
                letterSpacing: "0.06em",
              }}
            >
              {r.n}
            </span>

            {/* content */}
            <div>
              <h3
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  marginTop: "0.6rem",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  letterSpacing: "0.03em",
                  maxWidth: "480px",
                  lineHeight: 1.7,
                }}
              >
                {r.kicker} — {r.body}
              </p>
            </div>

            {/* arrow on hover */}
            <span
              style={{
                opacity: 0,
                transition: "opacity 0.2s",
                color: "var(--orange)",
                paddingTop: "0.3rem",
              }}
              className="group-hover:opacity-100"
            >
              <ArrowRight size={18} />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Dedicated Talent - Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Deploy a global engineering pod built for continuous progress, single-thread accountability and AI-native delivery.",
      },
    ],
  }),
});

function HirePage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();
  const pal = hirePalette(theme);

  return (
    <main
      className="hire-root"
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        minHeight: "100vh",
        ["--cream" as any]: pal.cream,
        ["--ink" as any]: pal.ink,
        ["--muted" as any]: pal.muted,
        ["--rule" as any]: pal.rule,
      }}
    >
      <style>{HIRE_STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0",
          position: "relative",
          overflow: "hidden",
          background: "var(--dark-bg)",
        }}
      >
       {/* large background image */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            opacity: 0.28,
          }}
        />
        {/* vertical label — left edge */}
       <div
          style={{
            position: "absolute",
            left: "2rem",
            top: "50%",
            transform: "translateY(-50%) rotate(-90deg)",
            transformOrigin: "center center",
            fontSize: "0.65rem",
            letterSpacing: "0.38em",
            color: "rgba(247,245,241,0.4)",
            textTransform: "uppercase",
            fontFamily: "var(--font-sans)",
            whiteSpace: "nowrap",
          }}
        >
          [ Hire Jarvis ]
        </div>

        {/* hero body */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            margin: "0 auto",
            width: "100%",
            padding: "10rem 3rem 4rem",
          }}
        >
          {/* spaced label */}
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: "var(--orange)",
              marginBottom: "2rem",
            }}
          >
            H I R E &nbsp; J A R V I S
          </p>

          {/* title — split across a horizontal rule, devx-style */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(1.5rem, 4vw, 3.5rem)",
              flexWrap: "wrap",
              marginBottom: "1.5rem",
            }}
          >
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                fontWeight: 700,
                lineHeight: 0.95,
                color: "var(--dark-ink)",
                margin: 0,
              }}
            >
              Initialize
            </h1>
            <div
              style={{
                flex: "1 1 80px",
                minWidth: "60px",
                height: "1px",
                background: "rgba(247,245,241,0.35)",
              }}
            />
            <h1
              className="font-display"
              style={{
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
                lineHeight: 0.95,
                color: "var(--orange)",
                margin: 0,
              }}
            >
              global growth.
            </h1>
          </div>

          {/* bottom row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginTop: "6rem",
              paddingBottom: "2rem",
              borderTop: "1px solid rgba(247,245,241,0.12)",
              paddingTop: "1.5rem",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
           <p
              style={{
                maxWidth: "460px",
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "rgba(247,245,241,0.52)",
                margin: 0,
                fontFamily: "var(--font-sans)",
              }}
            >
              Deploy a team that thinks like a partner and acts like an agent — turning your boldest
              ideas into autonomous reality. Enter the Impact Hub.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <span
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(247,245,241,0.28)",
                }}
              >
                
              </span>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  background: "var(--orange)",
                  color: "#fff",
                  padding: "0.9rem 1.8rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Deploy your team <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* floating image composite — top right */}
        <div
          style={{
            position: "absolute",
            right: "4rem",
            top: "12%",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          className="hire-img-float"
        >
          <img
            src={hireCover2}
            alt=""
            style={{ width: 240, height: 160, objectFit: "cover", opacity: 0.6 }}
          />
          <img
            src={hireCover3}
            alt=""
            style={{ width: 180, height: 120, objectFit: "cover", opacity: 0.45, alignSelf: "flex-end" }}
            className="hire-img-float2"
          />
        </div>
      </section>

      {/* ════════════════════════════════════════
          MARQUEE DIVIDER
      ════════════════════════════════════════ */}
      <div
        style={{
          background: "var(--orange)",
          overflow: "hidden",
          padding: "0.75rem 0",
        }}
      >
        <div className="hire-marquee-track" style={{ display: "inline-flex", gap: "3rem" }}>
          {Array(12).fill("AGENTIC  ·  SOVEREIGN  ·  BATTLE-TESTED  ·  HUMAN-AI  ·  RESILIENT  ·  ROI-DRIVEN  ·").map((t, i) => (
            <span
              key={i}
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════
          WHY HIRE — editorial list
      ════════════════════════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "6rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 3rem" }}>

          {/* section header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "end",
              marginBottom: "4rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.34em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  marginBottom: "1.2rem",
                }}
              >
                W H Y &nbsp; H I R E &nbsp; J A R V I S
              </p>
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.02,
                  margin: 0,
                  color: "var(--ink)",
                }}
              >
                Why follow tickets
                <br />
                when you can
                <br />
                <em style={{ fontStyle: "italic", color: "var(--orange)" }}>orchestrate outcomes?</em>
              </h2>
            </div>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.8,
                color: "var(--muted)",
                maxWidth: "400px",
                alignSelf: "end",
              }}
            >
              Stop fighting for headcount and start acquiring decision authority. We provide
              mission-ready experts who turn technical complexity into your unique competitive power.
            </p>
          </div>

          {/* reason list */}
          <ReasonList />
        </div>
      </section>

      {/* ════════════════════════════════════════
          GLOBAL SYNCHRONICITY
      ════════════════════════════════════════ */}
      <section style={{ background: "var(--dark-bg)", padding: "7rem 0", overflow: "hidden" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 3rem" }}>

          {/* label */}
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
              color: "rgba(247,245,241,0.35)",
              marginBottom: "3rem",
            }}
          >
            G L O B A L &nbsp; S Y N C H R O N I C I T Y &nbsp; E N G I N E
          </p>

          {/* title + body split */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "end",
              marginBottom: "5rem",
              paddingBottom: "4rem",
              borderBottom: "1px solid rgba(247,245,241,0.1)",
            }}
          >
            <h2
              style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "clamp(2.6rem, 5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.0,
                color: "var(--dark-ink)",
                margin: 0,
              }}
            >
              Engineering
              <br />without borders.
              <br />
              <em style={{ color: "var(--orange)" }}>Innovation without sleep.</em>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(247,245,241,0.45)" }}>
              In a world that never stops, your development shouldn't either. We've transcended the
              traditional outsourcing model to build a Global Synchronicity Engine — stitching
              together high-velocity talent across India, EMEA, and the Americas so your product
              evolves while you sleep.
            </p>
          </div>

          {/* three sync metrics */}
          <div
            className="hire-sync-cols"
            style={{ display: "flex", gap: 0 }}
          >
            {SYNC_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <SyncCard key={pt.n} pt={pt} index={i} Icon={Icon} />
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TECHNOLOGICAL DNA
      ════════════════════════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "7rem 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 3rem" }}>

          {/* top label row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "4rem",
              paddingBottom: "2rem",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              T E C H N O L O G I C A L &nbsp; D N A
            </p>
            <span
              style={{
                fontFamily: "'EB Garamond', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--muted)",
              }}
            >
              Forging Vision into Shipped Reality.
            </span>
          </div>

          {/* two-col: heading left, grid right */}
          <div
            className="hire-dna-cols"
            style={{ display: "flex", gap: "5rem", alignItems: "start" }}
          >
            <div style={{ flexShrink: 0, width: "300px" }}>
              <h2
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: "clamp(2.2rem, 3.5vw, 3.6rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  color: "var(--ink)",
                  marginBottom: "1.5rem",
                }}
              >
                Every pod is built around product velocity.
              </h2>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--muted)" }}>
                Composable squads. Platform resilience. AI-enabled engineering workflows from day one.
              </p>

              <div style={{ marginTop: "3rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                {["AI-assisted QA", "Cloud cost control", "Security by default"].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      fontSize: "0.82rem",
                      color: "var(--muted)",
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--orange)", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* DNA groups */}
            <div style={{ flex: 1 }}>
              {DNA_GROUPS.map((group, i) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    style={{
                      borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
                      borderBottom: "1px solid var(--rule)",
                      padding: "1.6rem 0",
                      display: "grid",
                      gridTemplateColumns: "180px 1fr auto",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'EB Garamond', serif",
                        fontSize: "1.2rem",
                        fontWeight: 400,
                        color: "var(--ink)",
                        margin: 0,
                      }}
                    >
                      {group.title}
                    </h3>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {group.stack.map((item) => (
                        <span
                          key={item}
                          className="hire-dna-tag"
                          style={{
                            fontSize: "0.72rem",
                            padding: "0.3rem 0.8rem",
                            border: "1px solid var(--rule)",
                            color: "var(--muted)",
                            cursor: "default",
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <Icon size={16} color="var(--muted)" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CTA STRIP
      ════════════════════════════════════════ */}
      <section
        style={{
          background: "var(--orange)",
          padding: "5rem 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          S E E &nbsp; Y O U
        </p>
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "clamp(2.8rem, 6vw, 6rem)",
            fontWeight: 400,
            lineHeight: 0.95,
            color: "#fff",
            maxWidth: "700px",
            margin: 0,
          }}
        >
          Ready to deploy your global pod?
        </h2>
        <Link
          to="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "var(--ink)",
            color: "var(--dark-ink)",
            padding: "1rem 2.2rem",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontWeight: 500,
            marginTop: "0.5rem",
          }}
        >
          Start the conversation <ArrowRight size={14} />
        </Link>
      </section>

      <Footer theme={theme} />
    </main>
  );
}