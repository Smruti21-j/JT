import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { Brands } from "@/components/site/Brands";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import { useThemeInit } from "@/hooks/use-theme-init";
import iconAiAgents from "../assets/icon-ai-agents.png";  
// ─── Local image imports ──────────────────────────────────────────────────────
import pillarImg1 from "/index-image1.png";
import pillarImg2 from "/index-image2.png";
import pillarImg3 from "/index-image3.jpg";
import pillarImg4 from "/index-image4.jpg";
import pillarImg5 from "/index-image5.jpg";
import pillarImg6 from "/index-image6.jpg";
import pillarImg7 from "/index-image7.png";
import pillarImg8 from "/index-image8.png";

import archPattern1 from "../assets/1.svg";
import archPattern2 from "../assets/2.svg";
import archPattern3 from "../assets/3.svg";
import archPattern4 from "../assets/4.svg";
import archPattern5 from "../assets/5.svg";

const PK_KEYFRAMES = `
  @keyframes pkHeaderIn {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

function pillarPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      numColor: "rgb(199,90,26)",
      sectionBorder: "border-border",
      headerLabelColor: "rgba(25,25,25,0.42)",
      headerHeadingColor: "#181818",
      headerParaColor: "rgba(25,25,25,0.5)",
    };
  }
  return {
    numColor: "rgb(255,130,50)",
    sectionBorder: "border-border",
    headerLabelColor: "rgba(240,232,223,0.32)",
    headerHeadingColor: "#f0e8df",
    headerParaColor: "rgba(240,232,223,0.36)",
  };
}

function auxPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      cardBg: "#ffffff",
      cardBorder: "rgba(0,0,0,0.08)",
      gridLineColor: "rgba(0,0,0,0.08)",
      title: "#181818",
      desc: "rgba(25,25,25,0.55)",
      accent: "#ed6323",
      lineColor: "rgba(0,0,0,0.12)",
      dotFill: "#fbfaf7",
      aiRowBg: "#EFEBFC",
      aiBadgeBg: "#7C5CFC",
      humanRowBg: "#FDECDC",
      humanBadgeBg: "rgb(199,90,26)",
      pillBg: "#ffffff",
      pillBorder: "rgba(0,0,0,0.1)",
    };
  }
  return {
    cardBg: "#0a1c18",
    cardBorder: "rgba(255,255,255,0.08)",
    gridLineColor: "rgba(255,255,255,0.08)",
    title: "#f0e8df",
    desc: "rgba(240,232,223,0.45)",
    accent: "rgb(255,130,50)",
    lineColor: "rgba(255,255,255,0.14)",
    dotFill: "#061512",
    aiRowBg: "rgba(124,92,252,0.14)",
    aiBadgeBg: "#8b74f7",
    humanRowBg: "rgba(255,130,50,0.12)",
    humanBadgeBg: "rgb(255,130,50)",
    pillBg: "#0a1c18",
    pillBorder: "rgba(255,255,255,0.1)",
  };
}

const HOVER_TINTS_LIGHT = [
  "#FBD3D3", "#FCE3B8", "#CDEED3", "#CBE2FC",
  "#E2D3FC", "#FCD3EE", "#CDF5EC", "#FFEBB0",
];
const HOVER_TINTS_DARK = [
  "rgba(255,90,90,0.18)", "rgba(255,160,60,0.18)", "rgba(80,220,150,0.18)", "rgba(90,160,255,0.18)",
  "rgba(160,110,255,0.18)", "rgba(255,110,200,0.18)", "rgba(80,220,200,0.18)", "rgba(255,210,90,0.18)",
];

function hoverTint(theme: "light" | "dark", index: number) {
  const arr = theme === "light" ? HOVER_TINTS_LIGHT : HOVER_TINTS_DARK;
  return arr[index % arr.length];
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1 — "How you plug us in." 6 engagement-model tiles, image-led,
// each linking to /services.
// ─────────────────────────────────────────────────────────────────────────────

const ENGAGEMENT_TILES = [
  {
    badge: null,
    tag: "Agentic AI · Core",
    title: "Intelligence that Acts",
    desc: "Transition from generative prompts to agentic workflows that resolve complex tasks with zero friction.",
    image: pillarImg1,
  },
  {
    badge: null,
    tag: "Platform · Foundation",
    title: "The AI-First Core",
    desc: "mbed intelligence into the substrate of your business to create a self-evolving, future-proof operating model.",
    image: pillarImg2,
  },
  {
    badge: null,
    tag: "Engineering · Scale",
    title: "Digital Engineering at Scale",
    desc: "Accelerate your time-to-impact with battle-tested engineering playbooks and frontier technology stacks.",
    image: pillarImg3,
  },
  {
    badge: null,
    tag: "Infrastructure · Cloud",
    title: "Next-Gen Ecosystems",
    desc: "Build the connected, cloud-native infrastructure required for a resilient and sovereign digital future.",
    image: pillarImg4,
  },
  {
    badge: null,
    tag: "Design · Experience",
    title: "Design with Purpose",
    desc: "Amplify human potential through sensory UX that balances high-tech precision with human-centric empathy.",
    image: pillarImg5,
  },
  {
    badge: null,
    tag: "Data · Growth",
    title: "Accelerated Value Chains",
    desc: "Unlock pervasive efficiencies across your entire enterprise with data-driven insights that act as your growth catalyst.",
    image: pillarImg6,
  },
  {
    badge: null,
    tag: "Strategy · Governance",
    title: "The Architects of Intent",
    desc: "Before you build autonomy, you must engineer the intent. We map your industry’s future friction points to design custom governance and cognitive blueprints, ensuring your proprietary intelligence remains entirely your own.",
    image: pillarImg7,
  },
  {
    badge: null,
    tag: "AgencyOps · Dev Hub",
    title: "The Engine of Perpetual Motion",
    desc: "Autonomy isn't set and forget - it is a living ecosystem. Our engineering squads continuously tune, optimize, & defend your agentic workflows and self-healing infrastructure in real time.",
    image: pillarImg8,
  },
];

function EngagementTile({
  tile,
  index,
  theme,
}: {
  tile: (typeof ENGAGEMENT_TILES)[0];
  index: number;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const aux = auxPalette(theme);
  const tint = hoverTint(theme, index);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("eng-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      to="/services"
      ref={ref as any}
      className="eng-tile group"
      style={{
        display: "block",
        background: aux.cardBg,
        border: `1.5px solid ${theme === "light" ? "rgba(199,90,26,0.28)" : "rgba(255,130,50,0.22)"}`,
        borderRadius: "20px",
        overflow: "hidden",
        transitionDelay: `${(index % 6) * 0.07}s`,
        ["--eng-hover-bg" as any]: tint,
        ["--eng-hover-border" as any]: theme === "light" ? "rgba(199,90,26,0.55)" : "rgba(255,130,50,0.45)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
        <img
          src={tile.image}
          alt={tile.title}
          className="eng-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
        {tile.badge && (
          <span
            className="font-mono"
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: aux.accent,
              background: aux.cardBg,
              border: `1px solid ${aux.accent}`,
              borderRadius: "999px",
              padding: "5px 12px",
            }}
          >
            {tile.badge}
          </span>
        )}
      </div>
   <div style={{ padding: "22px 22px 26px" }}>
  <span
    className="font-mono"
    style={{
      display: "inline-block",
      fontSize: "9.5px",
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: aux.accent,
      marginBottom: "8px",
    }}
  >
    {tile.tag}
  </span>
  <h3 style={{ fontSize: "19px", fontWeight: 800, color: aux.title, marginBottom: "8px" }}>
    {tile.title}
  </h3>
        <p style={{ fontSize: "13px", lineHeight: 1.65, color: aux.desc, margin: 0 }}>
          {tile.desc}
        </p>
      </div>
    </Link>
  );
}

function HowYouPlugUsIn({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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
    <section className={`relative border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .eng-tile {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, border-color 0.3s ease;
        }
        .eng-tile.eng-vis { opacity: 1; transform: translateY(0); }
        .eng-tile:hover { background: var(--eng-hover-bg); border-color: var(--eng-hover-border); }
        .eng-tile:hover .eng-img { transform: scale(1.06); }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
          [SERVICES]
        </p>

        <h2 className= "section-title"  style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "16px" }}>
          The Architect of 
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
            Autonomy.
          </em>
        </h2>

        <p className="font-mono" style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "10px" }}>
       
        </p>
        <p style={{ maxWidth: "540px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
         
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGAGEMENT_TILES.map((tile, i) => (
            <EngagementTile key={tile.title} tile={tile} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2 — "The part nobody tells you."
// ─────────────────────────────────────────────────────────────────────────────

const BLUEPRINT_CHECKS = [
  "Holds 10,000 concurrent users",
  "Passes a real security audit",
  "Plugs into your existing, messy stack",
  "Holds up at 2 a.m. when something breaks",
];

function IconCheck({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconDragHandle({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7 4 12l4 5M16 7l4 5-4 5" />
    </svg>
  );
}

const STAT_CARDS = [
  { label: "Total Users", value: "625", delta: "▲ 8%", up: true, bars: [3,4,3,5,4,6,5,7,6,8] },
  { label: "Applications", value: "702", delta: "▲ 14%", up: true, bars: [4,5,4,6,5,7,6,8,7,9] },
  { label: "Reports Gen.", value: "1,890", delta: "▲ 5%", up: true, bars: [5,5,6,5,7,6,7,8,7,8] },
  { label: "Subscriptions", value: "64", delta: "▼ 2", up: false, bars: [7,6,7,5,6,5,4,5,4,3] },
];

const RECORD_ROWS = [
  { id: "APP-2604", label: "Home Loan", meta: "Ahmedabad · ₹10.00 Cr+", icon: "home", status: "Disbursed", bars: [3,5,4,7,6,8] },
  { id: "APP-2603", label: "CC/OD · MSME", meta: "Surat · ₹1.00 Cr+", icon: "dollar", status: "Sanctioned", bars: [4,4,5,4,6,5] },
  { id: "APP-2602", label: "Home Loan", meta: "Rajkot · ₹10.00 Cr+", icon: "home", status: "Pending", bars: [2,3,2,4,3,3] },
  { id: "APP-2601", label: "Home Loan", meta: "Vadodara · ₹10.00 Cr+", icon: "home", status: "Disbursed", bars: [5,6,5,7,8,8] },
  { id: "APP-2600", label: "CC/OD · MSME", meta: "Kolkata · ₹1.00 Cr+", icon: "dollar", status: "Rejected", bars: [1,2,1,2,1,1] },
];

function recordStatusColor(status: string, theme: "light" | "dark") {
  if (status === "Disbursed") return theme === "light" ? "#1F9D55" : "#4ADE80";
  if (status === "Sanctioned") return theme === "light" ? "#2563EB" : "#60A5FA";
  if (status === "Pending") return theme === "light" ? "#B45309" : "#FBBF24";
  return theme === "light" ? "#DC2626" : "#F87171";
}

function MiniBars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "2.5px", height: "18px" }}>
      {values.map((v, i) => (
        <span
          key={i}
          style={{
            width: "3px",
            height: `${Math.max(15, (v / max) * 100)}%`,
            background: color,
            borderRadius: "2px",
            opacity: 0.35 + (v / max) * 0.65,
          }}
        />
      ))}
    </div>
  );
}

function BlueprintProductionSlider({ theme }: { theme: "light" | "dark" }) {
  const aux = auxPalette(theme);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  };

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromClientX(clientX);
    };
    const onUp = () => { draggingRef.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const rowIcon = (key: string) => (key === "home" ? IconHome : IconDollar);

  const bpBg = "#0c1f4d";
  const bpGridMinor = "rgba(255,255,255,0.07)";
  const bpGridMajor = "rgba(255,255,255,0.14)";
  const bpLine = "rgba(255,255,255,0.85)";
  const bpMuted = "rgba(255,255,255,0.6)";
  const bpBright = "#ffffff";

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl"
      style={{
        aspectRatio: "16 / 12",
        border: `1px solid ${aux.cardBorder}`,
        cursor: "ew-resize",
        touchAction: "none",
        boxShadow: theme === "light" ? "0 30px 60px -30px rgba(0,0,0,0.25)" : "0 30px 60px -30px rgba(0,0,0,0.6)",
      }}
      onMouseDown={(e) => { draggingRef.current = true; updateFromClientX(e.clientX); }}
      onTouchStart={(e) => { draggingRef.current = true; updateFromClientX(e.touches[0].clientX); }}
    >
      <div className="absolute inset-0" style={{ background: "#ffffff", padding: "22px", overflow: "hidden" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#1F9D55", boxShadow: "0 0 0 3px rgba(31,157,85,0.18)" }} />
            <div>
              <p className="font-display" style={{ fontSize: "16px", fontWeight: 800, color: "#181818", margin: 0 }}>
                Admin Dashboard
              </p>
              <p className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(25,25,25,0.42)", marginTop: "2px" }}>
                Real-time · Last 30d
              </p>
            </div>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(25,25,25,0.55)", background: "#F1EEE8", borderRadius: "999px", padding: "5px 12px" }}
          >
            Last 30D ▾
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5" style={{ marginBottom: "16px" }}>
          {STAT_CARDS.map((s) => (
            <div key={s.label} style={{ background: "#F8F6F1", borderRadius: "12px", padding: "10px 12px", border: "1px solid rgba(0,0,0,0.04)" }}>
              <p className="font-mono" style={{ fontSize: "7.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(25,25,25,0.42)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {s.label}
              </p>
              <p className="font-display" style={{ fontSize: "17px", fontWeight: 800, color: "#181818", margin: "3px 0 2px", lineHeight: 1 }}>
                {s.value}
              </p>
              <p className="font-mono" style={{ fontSize: "8px", color: s.up ? "#1F9D55" : "#DC2626", margin: "0 0 6px", fontWeight: 700 }}>
                {s.delta}
              </p>
              <MiniBars values={s.bars} color="#ed6323" />
            </div>
          ))}
        </div>

        <div style={{ background: "#F8F6F1", borderRadius: "12px", padding: "14px 14px 8px", marginBottom: "14px", position: "relative" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "6px" }}>
            <p className="font-display" style={{ fontSize: "12.5px", fontWeight: 700, color: "#181818", margin: 0 }}>
              Applications · 30d
            </p>
            <div className="flex items-center gap-3">
              <span className="font-mono" style={{ fontSize: "8px", display: "flex", alignItems: "center", gap: "4px", color: "rgba(25,25,25,0.5)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ed6323" }} /> New
              </span>
              <span className="font-mono" style={{ fontSize: "8px", display: "flex", alignItems: "center", gap: "4px", color: "rgba(25,25,25,0.5)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#1F9D55" }} /> Disbursed
              </span>
              <span className="font-mono" style={{ fontSize: "8px", color: "#1F9D55", background: "rgba(31,157,85,0.12)", borderRadius: "999px", padding: "2px 7px", fontWeight: 700 }}>▲ 8.2%</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <svg viewBox="0 0 300 52" style={{ width: "100%", height: "44px" }}>
              <polyline points="0,44 30,36 60,40 90,24 120,32 150,17 180,28 210,20 240,30 270,15 300,22" fill="none" stroke="#ed6323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="0,48 30,44 60,46 90,38 120,42 150,32 180,40 210,34 240,42 270,28 300,36" fill="none" stroke="#1F9D55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div
              className="font-mono"
              style={{
                position: "absolute", top: "-6px", left: "58%", transform: "translateX(-50%)",
                background: "#181818", color: "#fff", borderRadius: "8px", padding: "5px 9px",
                fontSize: "9px", whiteSpace: "nowrap", boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              <strong style={{ fontSize: "10px" }}>178</strong> sanctioned today
            </div>
          </div>
        </div>

        <p className="font-mono" style={{ fontSize: "8.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(25,25,25,0.4)", marginBottom: "8px" }}>
          Recent Applications
        </p>
        <div className="flex flex-col gap-1.5">
          {RECORD_ROWS.map((row) => {
            const RowIcon = rowIcon(row.icon);
            return (
              <div key={row.id} className="flex items-center justify-between" style={{ padding: "5px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", minWidth: 0 }}>
                  <span style={{ width: "26px", height: "26px", borderRadius: "8px", background: "#F1EEE8", display: "flex", alignItems: "center", justifyContent: "center", color: "#181818", flexShrink: 0 }}>
                    <RowIcon size={13} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#181818", margin: 0, whiteSpace: "nowrap" }}>{row.label}</p>
                    <p className="font-mono" style={{ fontSize: "8.5px", color: "rgba(25,25,25,0.45)", margin: 0, whiteSpace: "nowrap" }}>{row.meta}</p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
                  <MiniBars values={row.bars} color={recordStatusColor(row.status, theme)} />
                  <span
                    className="font-mono"
                    style={{ fontSize: "8.5px", fontWeight: 700, color: recordStatusColor(row.status, theme), background: `${recordStatusColor(row.status, theme)}18`, borderRadius: "999px", padding: "3px 8px", whiteSpace: "nowrap" }}
                  >
                    {row.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute inset-0"
        style={{
          background: bpBg,
          backgroundImage: `
            linear-gradient(${bpGridMajor} 1px, transparent 1px),
            linear-gradient(90deg, ${bpGridMajor} 1px, transparent 1px),
            linear-gradient(${bpGridMinor} 1px, transparent 1px),
            linear-gradient(90deg, ${bpGridMinor} 1px, transparent 1px)
          `,
          backgroundSize: "88px 88px, 88px 88px, 22px 22px, 22px 22px",
          padding: "22px",
          overflow: "hidden",
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      >
        {[
          { top: 10, left: 10, bt: true, bl: true },
          { top: 10, right: 10, bt: true, br: true },
          { bottom: 10, left: 10, bb: true, bl: true },
          { bottom: 10, right: 10, bb: true, br: true },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute", width: "14px", height: "14px",
              top: c.top, bottom: (c as any).bottom, left: c.left, right: (c as any).right,
              borderTop: c.bt ? `1.5px solid ${bpMuted}` : undefined,
              borderBottom: c.bb ? `1.5px solid ${bpMuted}` : undefined,
              borderLeft: c.bl ? `1.5px solid ${bpMuted}` : undefined,
              borderRight: c.br ? `1.5px solid ${bpMuted}` : undefined,
            }}
          />
        ))}

        <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
          <div>
            <p className="font-mono" style={{ fontSize: "13px", fontWeight: 700, color: bpBright, margin: 0 }}>admin_dashboard.spec</p>
            <p className="font-mono" style={{ fontSize: "9px", color: bpMuted, marginTop: "2px" }}>rev. 004 · draft</p>
          </div>
          <span className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.1em", textTransform: "uppercase", color: bpBright, border: `1px solid ${bpLine}`, borderRadius: "999px", padding: "5px 12px" }}>
            Concept
          </span>
        </div>

       <div className="grid grid-cols-4 gap-2.5" style={{ marginBottom: "16px" }}>
          {STAT_CARDS.map((s, i) => (
            <div key={s.label} style={{ border: `1.5px dashed ${bpLine}`, borderRadius: "10px", padding: "10px", position: "relative" }}>
              <span className="font-mono" style={{ position: "absolute", top: "6px", right: "8px", fontSize: "8px", color: bpMuted }}>
                #{String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-mono" style={{ fontSize: "7.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: bpMuted, margin: "0 0 6px" }}>
                {s.label}
              </p>
              <p className="font-mono" style={{ fontSize: "15px", fontWeight: 700, color: bpBright, margin: "0 0 8px" }}>
                {s.value}
              </p>
              <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "16px" }}>
                {s.bars.map((v, bi) => (
                  <span key={bi} style={{ width: "3px", height: `${(v / Math.max(...s.bars)) * 100}%`, background: "rgba(255,255,255,0.4)", borderRadius: "1px" }} />
                ))}
              </div>
            </div>
          ))}
        </div>

       <div style={{ border: `1.5px dashed ${bpLine}`, borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
            <p className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.06em", textTransform: "uppercase", color: bpMuted, margin: 0 }}>
              Applications · 30d trend
            </p>
            <p className="font-mono" style={{ fontSize: "9px", color: bpBright, margin: 0 }}>
              ▲ 8.2%
            </p>
          </div>
          <svg viewBox="0 0 300 46" style={{ width: "100%", height: "38px" }}>
            <polyline points="0,28 40,20 80,32 120,16 160,26 200,13 240,24 280,18 300,23" fill="none" stroke={bpLine} strokeWidth="1.6" strokeDasharray="5 4" opacity="0.85" />
          </svg>
        </div>

        <p className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase", color: bpMuted, marginBottom: "10px" }}>
          Recent Applications · list × {RECORD_ROWS.length}
        </p>
        <div className="flex flex-col gap-2.5">
          {RECORD_ROWS.map((row, i) => (
            <div key={i} className="flex items-center justify-between">
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                <span style={{ width: "26px", height: "26px", borderRadius: "8px", border: `1.5px dashed ${bpLine}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="font-mono" style={{ fontSize: "8px", color: bpMuted }}>{i + 1}</span>
                </span>
                <div>
                  <p className="font-mono" style={{ fontSize: "10.5px", color: bpBright, margin: 0 }}>{row.label}</p>
                  <p className="font-mono" style={{ fontSize: "8.5px", color: bpMuted, margin: 0 }}>{row.id}</p>
                </div>
              </div>
              <span className="font-mono" style={{ fontSize: "9px", color: bpBright, border: `1px solid ${bpLine}`, borderRadius: "999px", padding: "3px 8px" }}>
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${pos}%`, width: "3px", background: aux.accent, transform: "translateX(-1.5px)", pointerEvents: "none", boxShadow: `0 0 24px 2px ${aux.accent}` }}
      >
        <div
          className="absolute top-1/2"
          style={{
            left: "50%", transform: "translate(-50%, -50%)", width: "38px", height: "38px", borderRadius: "50%",
            background: aux.accent, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 0 0 5px rgba(255,255,255,0.15)",
          }}
        >
          <IconDragHandle size={18} />
        </div>
      </div>

      <span
        className="font-mono absolute bottom-4"
        style={{ left: `${pos}%`, transform: "translateX(-50%)", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#fff", background: "rgba(0,0,0,0.55)", borderRadius: "999px", padding: "4px 10px", pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        Drag to compare
      </span>
    </div>
  );
}
function PrototypeBlueprint({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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
    <section className={`relative bg1 border-t ${pal.sectionBorder}`} style={{ paddingTop: "7rem", paddingBottom: "7rem" }}>
      <style>{PK_KEYFRAMES}</style>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={headerRef} style={{ opacity: 0 }}>
            <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
            [AUTONOMOUS BLUEPRINT]
            </p>
            <h2 className= "section-title"  style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "16px" }}>
              Concepts spark change.
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
                Solutions create it.
              </em>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: pal.headerParaColor, marginBottom: "22px" }}>
              A demo wins meetings. A product survives reality.
              We bridge the gap between impressive and production-ready.
            </p>
            <div className="flex flex-col gap-3">
              {BLUEPRINT_CHECKS.map((check) => (
                <div key={check} className="flex items-center gap-3">
                  <span style={{ color: aux.accent, flexShrink: 0 }}>
                    <IconCheck />
                  </span>
                  <span style={{ fontSize: "14px", color: pal.headerHeadingColor }}>{check}</span>
                </div>
              ))}
            </div>
          </div>

          <BlueprintProductionSlider theme={theme} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3 — "The receipts."
// ─────────────────────────────────────────────────────────────────────────────

const RECEIPT_STATS = [
  { value: "8.5", label: "Era of Impact" },
  { value: "150+", label: "Breakthroughs" },
  { value: "25+", label: "Global Reach" },
  { value: "50+", label: "Vision Architects" },
  { value: "3×", label: "Faster with AI in the loop" },
  { value: "99.4%", label: "Merged clean, first pass" },
  { value: "8", label: "Industries with deep playbooks" },
  { value: "24/7", label: "Delivery & support coverage" },
];

function CountUp({ value, color, duration = 1500 }: { value: string; color: string; duration?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [display, setDisplay] = useState("0");
  const startedRef = useRef(false);

  useEffect(() => {
    const match = value.match(/^([\d.]+)(.*)$/);
    const numStr = match ? match[1] : "0";
    const suffix = match ? match[2] : "";
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const target = parseFloat(numStr);

    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            setDisplay(current.toFixed(decimals) + suffix);
            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(numStr + suffix);
            }
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  return (
    <p ref={ref} style={{ fontSize: "clamp(2.4rem,4.5vw,3.6rem)", fontWeight: 800, color, margin: 0, lineHeight: .9 , letterSpacing: "-.03em"}}>
      {display}
    </p>
  );
}

function ReceiptCard({ stat, theme }: { stat: (typeof RECEIPT_STATS)[0]; theme: "light" | "dark" }) {
  const aux = auxPalette(theme);
  return (
    <div
      style={{
        background: aux.cardBg,
        border: `1px solid ${aux.cardBorder}`,
        borderRadius: "16px",
        padding: "24px 20px 22px",
      }}
    >
      <CountUp value={stat.value} color={aux.title} />
      <p style={{ fontSize: "12.5px", color: aux.desc, marginTop: "8px" }}>{stat.label}</p>
    </div>
  );
}

function TheReceipts({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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
    <section className={`relative border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
      `}</style>
      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
          [EXPERIENCE]
        </p>
        <h2 className= "section-title"  style={{ color: pal.headerHeadingColor, margin: 0 }}>
          Impact Delivered
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
            Measured by outcomes.
          </em>
        </h2>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RECEIPT_STATS.map((stat) => (
            <ReceiptCard key={stat.label} stat={stat} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4 — "Not just hands for hire." (Tech Tools bucket, card treatment)
// ─────────────────────────────────────────────────────────────────────────────

function IconPlug({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v5M15 2v5" />
      <path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0Z" />
      <path d="M12 15.5V22" />
    </svg>
  );
}

function IconGrid({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  );
}

function IconStack({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="4.5" rx="1.4" />
      <rect x="4" y="10" width="16" height="4.5" rx="1.4" />
      <rect x="4" y="16" width="16" height="4.5" rx="1.4" />
    </svg>
  );
}

function IconBrainSimple({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 3.5a3 3 0 0 0-3 3 2.8 2.8 0 0 0-1.5 5 2.8 2.8 0 0 0 1.5 5 3 3 0 0 0 3 3" />
      <path d="M14.5 3.5a3 3 0 0 1 3 3 2.8 2.8 0 0 1 1.5 5 2.8 2.8 0 0 1-1.5 5 3 3 0 0 1-3 3" />
      <path d="M9.5 3.5v16M14.5 3.5v16" />
      <path d="M9.5 8.5h5M9.5 15.5h5" />
    </svg>
  );
}

function IconTerminal({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <path d="M7 9.5 10.5 12 7 14.5" />
      <path d="M12.5 14.5h4.5" />
    </svg>
  );
}

function IconPresentation({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="12" rx="1.6" />
      <path d="M9 20l3-4 3 4" />
      <path d="M7 9l3 2.5L14 8l3 2" />
    </svg>
  );
}

function IconDocument({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5M9.5 16h5" />
    </svg>
  );
}

const TECH_TOOL_ITEMS = [
  {
    tag: "Case Study · AI Privacy",
    title: "Privacy-First AI Platform",
    desc: "A secure, multi-model AI workspace that protects sensitive data in real time.",
    icon: IconPlug,
    slug: "pryvasee-ai",
  },
  {
    tag: "AgencyOps · Dev Hub",
    title: "EchoAce",
    desc: "A client-safe project workspace that wraps your repos and agents.",
    icon: IconGrid,
  },
  {
    tag: "AgencyOps · Portfolio Sharing",
    title: "EchoShowcase",
    desc: "Curate work, share it as branded secure links, and measure how prospects engage.",
    icon: IconStack,
  },
  {
    tag: "AI Context Layer",
    title: "Context Brain",
    desc: "The context layer that briefs every AI coding agent over MCP.",
    icon: IconBrainSimple,
  },
  {
    tag: "Infrastructure · DevOps",
    title: "SSH Manager",
    desc: "Browser terminals, a secrets vault, and CI/CD in one console.",
    icon: IconTerminal,
  },
  {
    tag: "Presentations · AI",
    title: "Deck Forge",
    desc: "On-brand decks forged fast — brand applied at render time.",
    icon: IconPresentation,
  },
  {
    tag: "Proposals · AI",
    title: "Proposal Creator",
    desc: "From a rough idea to a client-ready, costed proposal.",
    icon: IconDocument,
  },
];

// ─── Generative wireframe art (replaces the icon on each card) ──────────────
function WireframeArt({ index }: { index: number }) {
  const variant = index % 3;
  const N = variant === 2 ? 56 : 32 + (index % 2) * 6;
  const cx = 100, cy = 100, r = 76;
  const pts = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
  });

  let d = "";
  if (variant === 2) {
    d = pts.map(([x, y]) => `M${cx},${cy} L${x},${y}`).join(" ");
  } else {
    const offset = variant === 0 ? 5 + index : 9 + index;
    d = pts
      .map(([x, y], i) => {
        const [x2, y2] = pts[(i + offset) % N];
        return `M${x},${y} L${x2},${y2}`;
      })
      .join(" ");
  }

 return (
    <svg viewBox="0 0 200 200" className="animate-spin-slow" style={{ width: "100%", height: "100%" }}>
      <path d={d} fill="none" stroke="rgba(255,107,26,1)" strokeWidth="0.6" />
      {variant === 2 && <circle cx={cx} cy={cy} r="2.4" fill="rgb(237,99,35)" />}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(237,99,35,0.35)" strokeWidth="0.8" />
    </svg>
  );
}
const ARCH_PATTERNS = [archPattern1, archPattern2, archPattern3, archPattern4, archPattern5];
// ─── Architecture-component card ─────────────────────────────────────────────
function ArchCard({
  item,
  index,
  active,
  theme,
}: {
  item: (typeof TECH_TOOL_ITEMS)[0];
  index: number;
  active: boolean;
  theme: "light" | "dark";
}) {
  const content = (
    <>
      <div className="arc-card-top">
        <span className="arc-card-tag font-mono">{item.tag}</span>
        <h3 className=" arc-card-title">{item.title}</h3>
        <p className="arc-card-desc">{item.desc}</p>
      </div>
      <div className="arc-card-art">
        <img
          src={ARCH_PATTERNS[index % ARCH_PATTERNS.length]}
          alt="" 
          className="animate-spin-slow"
          style={{ width: "86%", height: "86%", margin: "0 auto" }}
        />
      </div>
    </>
  );

  const className = `arc-card${active ? " arc-active" : ""}${theme === "light" ? " arc-light" : ""}`;

  if ("slug" in item && item.slug) {
    return (
      <Link to="/case-studies/$slug" params={{ slug: item.slug }} className={className}>
        {content}
      </Link>
    );
  }

  return <div className={className}>{content}</div>;
}

// ─── Architecture Components — pinned section, horizontal reveal on scroll ──
function TechToolsSection({ theme }: { theme: "light" | "dark" }) {
  const pal = pillarPalette(theme);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    function onScroll() {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      const total = rect.height - winH;
      const scrolled = -rect.top;
      const progress = total > 0 ? Math.min(1, Math.max(0, scrolled / total)) : 0;

      const maxScroll = track.scrollWidth - track.clientWidth;
      track.scrollLeft = progress * maxScroll;

      const idx = Math.round(progress * (TECH_TOOL_ITEMS.length - 1));
      setActive(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg1"
      style={{ height: `${100 + TECH_TOOL_ITEMS.length * 32}vh` }}
    >
      <style>{`
        .arc-track{ display:flex; gap:20px; overflow:hidden; }
        .arc-card{
          flex:0 0 clamp(260px,26vw,340px);
          height:clamp(360px,46vw,440px);
          background:#111113;
          border:1px solid rgba(255,255,255,0.08);
          border-radius:16px;
          display:flex; flex-direction:column;
          overflow:hidden;
          transition: opacity .4s ease;
          opacity:.5;
        }
        .arc-card.arc-active{ opacity:1; }
        .arc-card-top{ padding:26px 24px 0; }
        .arc-card-tag{ font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; color:rgba(0,0,0,0.4); }
        .arc-card-title{ font-size:1.15rem; font-weight:600; color:#f5f2ec; margin:10px 0 8px; line-height:1.25; }
        .arc-card-desc{ font-size:.82rem; line-height:1.55; color:rgba(255,255,255,0.5); }
        .arc-card-art{ flex:1; padding:12px 28px 28px; }
        .arc-card.arc-light{
  background: #ffffff;
  border-color: rgba(0,0,0,0.1);
}
.arc-light .arc-card-tag{ color: rgba(0,0,0,0.4); }
.arc-light .arc-card-title{ color: #181818; }
.arc-light .arc-card-desc{ color: rgba(0,0,0,0.55); }
      `}</style>

      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 xl:px-16 mb-10 flex items-end justify-between">
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: pal.headerLabelColor,
                marginBottom: "18px",
              }}
            >
              [Architecture Components]
            </p>
            <h2 className="section-title" style={{ color: pal.headerHeadingColor, margin: 0 }}>
              More than development.
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
                End-to-end ownership.
              </em>
            </h2>
          </div>
          <span
            className="font-mono"
            style={{ fontSize: "11px", letterSpacing: "0.1em", color: pal.headerLabelColor, whiteSpace: "nowrap" }}
          >
            {String(active + 1).padStart(2, "0")} / {String(TECH_TOOL_ITEMS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mx-auto max-w-[1600px] w-full px-5 sm:px-8 lg:px-12 xl:px-16">
          <div ref={trackRef} className="arc-track">
           {TECH_TOOL_ITEMS.map((item, i) => (
  <ArchCard key={item.title} item={item} index={i} active={i === active} theme={theme} />
))}
          </div>
        </div>
      </div>
    </section>
  );
}
// ─── Icon set ────────────────────────────────────────────────────────────────

function IconBot({ size = 48  }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="9.5" width="15" height="10" rx="2.5" />
      <path d="M9 9.5V6.8a3 3 0 0 1 6 0v2.7" />
      <circle cx="9.2" cy="14.2" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="14.2" r="1" fill="currentColor" stroke="none" />
      <path d="M8 17.5h8" />
    </svg>
  );
}
function IconLink({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="4" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13" width="7" height="7" rx="1.6" />
      <path d="M9 11v2a2 2 0 0 0 2 2h2" />
    </svg>
  );
}
function IconChart({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19h16" />
      <path d="M4 15.5 9 10l3.5 3.2L20 6" />
      <path d="M15.5 6H20v4.5" />
    </svg>
  );
}
function IconEye({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function IconCpu({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="7" width="10" height="10" rx="1.6" />
      <rect x="10" y="10" width="4" height="4" rx="0.6" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </svg>
  );
}
function IconMessage({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v10.5H9.5L5.5 19v-3H4z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </svg>
  );
}
function IconSparkles({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5c.5 2.7 1.3 3.5 4 4-2.7.5-3.5 1.3-4 4-.5-2.7-1.3-3.5-4-4 2.7-.5 3.5-1.3 4-4Z" />
      <path d="M19 14c.3 1.5.7 1.9 2 2.2-1.3.3-1.7.7-2 2.2-.3-1.5-.7-1.9-2-2.2 1.3-.3 1.7-.7 2-2.2Z" />
    </svg>
  );
}
function IconActivity({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l2.2-7 4 14 2.2-7H21" />
    </svg>
  );
}
function IconSpark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
    </svg>
  );
}
function IconUser({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c1-4 4.2-6 7-6s6 2 7 6" />
    </svg>
  );
}
function IconStethoscope({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v6a4 4 0 0 0 8 0V3" />
      <path d="M6 3H4.5M14 3h1.5" />
      <path d="M10 13v2a5 5 0 0 0 10 0v-1.5" />
      <circle cx="20" cy="12" r="1.6" />
    </svg>
  );
}
function IconDollar({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5v19" />
      <path d="M17 6.5c0-1.8-2-3-5-3s-5 1.4-5 3.2 2 2.8 5 3.3 5 1.5 5 3.3-2 3.2-5 3.2-5-1.2-5-3" />
    </svg>
  );
}
function IconTv({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="12" rx="1.6" />
      <path d="M8 21h8M8 3l4 3 4-3" />
    </svg>
  );
}
function IconTruck({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="12" height="9" rx="1" />
      <path d="M14 10h4l4 3v3h-8z" />
      <circle cx="6.5" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  );
}
function IconShoppingBag({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
function IconGraduationCap({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9.5 12 5l10 4.5-10 4.5-10-4.5Z" />
      <path d="M6 11.7v4.3c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4.3" />
      <path d="M21 9.5v6" />
    </svg>
  );
}
function IconHome({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11 12 4l8 7" />
      <path d="M6 9.5V20h12V9.5" />
      <path d="M10 20v-5.5h4V20" />
    </svg>
  );
}
function IconScale({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 21h8" />
      <path d="M5 7h6M13 7h6" />
      <path d="M5 7 2 13a3 3 0 0 0 6 0L5 7ZM19 7l-3 6a3 3 0 0 0 6 0l-3-6Z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI CAPABILITIES
// ─────────────────────────────────────────────────────────────────────────────

const AI_CAPABILITIES = [
  { image: iconAiAgents, title: "AI Agents", desc: "Autonomous, AI-native agents that do the work, not just answer questions." },
  { icon: IconLink, title: "Workflow & Business Automation", desc: "Wire AI into the operations that drain your team's hours." },
  { icon: IconChart, title: "Data Science & Analytics", desc: "Turn the data you're sitting on into decisions you can act on." },
  { icon: IconEye, title: "Computer Vision", desc: "Systems that see — inspection, recognition, real-world visual intelligence." },
  { icon: IconCpu, title: "Custom Models & ML", desc: "Models trained on your domain, your data, your edge cases." },
  { icon: IconMessage, title: "NLP Solutions", desc: "Language understanding tuned to your industry's actual vocabulary." },
  { icon: IconSparkles, title: "Generative AI", desc: "Production-grade GenAI features, not weekend-demo gimmicks." },
  { icon: IconActivity, title: "AI Operations (MLOps)", desc: "Keeping models reliable, monitored, and honest in production." },
];

function AICapabilityCard({
  cap,
  index,
  theme,
}: {
  cap: (typeof AI_CAPABILITIES)[0] & { image?: string };
  index: number;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const aux = auxPalette(theme);
  const Icon = cap.icon;
  const tint = hoverTint(theme, index);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ac-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ac-card"
      style={{
        background: aux.cardBg,
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        minHeight: "168px",
        transitionDelay: `${(index % 4) * 0.06}s`,
        ["--ac-hover-bg" as any]: tint,
      }}
    >
      <div
        style={{
          color: aux.accent,
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {cap.image ? (
          <img
            src={cap.image}
            alt={cap.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: "scale(1.6)", // compensates for empty padding baked into the PNG
            }}
          />
        ) : (
          Icon && <Icon />
        )}
      </div>
      <h3  style={{ margin: 0, fontSize: "18px", fontWeight: 800, color: aux.title }}>
        {cap.title}
      </h3>
      <p style={{ margin: 0, fontSize: "13px", lineHeight: 1.65, color: aux.desc }}>
        {cap.desc}
      </p>
    </div>
  );
}

function AICapabilities({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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
    <section className={`relative border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .ac-card {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1),
            background 0.3s ease;
        }
        .ac-card.ac-vis { opacity: 1; transform: translateY(0); }
        .ac-card:hover { background: var(--ac-hover-bg); }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
         [ARCHITECTURE COMPONENTS]
        </p>
        <h2 className= "section-title" style={{  color: pal.headerHeadingColor, margin: 0, marginBottom: "18px" }}>
          AI, Built for
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323", textTransform: "none", fontSize: "0.85em", letterSpacing: "0em" }}>
            Actually Scales.
          </em>
        </h2>
        <p style={{ maxWidth: "620px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          Deeply engineered solutions tailored to your business—built by professionals who've solved production challenges, not just explored the technology.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-xl overflow-hidden border"
          style={{ borderColor: aux.gridLineColor, background: aux.gridLineColor }}
        >
          {AI_CAPABILITIES.map((cap, i) => (
            <AICapabilityCard key={cap.title} cap={cap} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// END-TO-END AI-POWERED DELIVERY
//
// Colored badge treatment restored: each stage card shows an "AI" row
// (purple pill badge + tinted background) and a "Human call" row (accent
// orange pill badge + tinted background), matching the original reference
// design. Colors come from aux.aiRowBg / aux.aiBadgeBg / aux.humanRowBg /
// aux.humanBadgeBg, so both themes stay correct with zero hardcoded hex.
// ─────────────────────────────────────────────────────────────────────────────

const DELIVERY_STAGES = [
  {
    num: "01",
    title: "Discovery & Strategy",
    ai: "AI analyzes business goals, requirements, scope, and timelines.",
    human: "Experts define the strategy, priorities, and execution plan."
  },
  {
    num: "02",
    title: "Architecture & Planning",
    ai: "AI evaluates technologies, workflows, and implementation paths.",
    human: "Engineers design scalable, secure, future-ready architecture."
  },
  {
    num: "03",
    title: "Design & Experience",
    ai: "AI generates concepts, design variations, and usability insights.",
    human: "Designers craft intuitive experiences users genuinely enjoy."
  },
  {
    num: "04",
    title: "Development",
    ai: "AI accelerates coding, testing, documentation, and integrations.",
    human: "Developers build reliable, production-ready software at scale."
  },
  {
    num: "05",
    title: "Quality & Security",
    ai: "AI detects issues, automates testing, and validates performance.",
    human: "Experts ensure security, stability, and release readiness."
  },
  {
    num: "06",
    title: "Launch & Growth",
    ai: "AI monitors performance, usage patterns, and optimization opportunities.",
    human: "Our team continuously improves, scales, and supports your product."
  }
];

function StageCard({
  stage,
  index,
  theme,
}: {
  stage: (typeof DELIVERY_STAGES)[0];
  index: number;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const aux = auxPalette(theme);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("dp-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

 return (
   <div
  ref={ref}
  className="dp-card"
  style={{
    background: aux.cardBg,
    border: `1px solid ${aux.cardBorder}`,
    borderRadius: "16px",
    padding: "22px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    height: "100%",
    boxSizing: "border-box",
    transitionDelay: `${index * 0.15}s`,
  }}
>
   <div style={{ minHeight: "70px" }}>
  <span
    className="font-mono"
    style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: aux.accent, fontWeight: 600 }}
  >
    Stage {stage.num}
  </span>
  <h4 style={{ margin: "6px 0 0", fontSize: "17px", fontWeight: 700, color: aux.title, lineHeight: 1.25 }}>
    {stage.title}
  </h4>
</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* AI row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            background: aux.aiRowBg,
            borderRadius: "10px",
            padding: "10px 12px",
            minHeight: "76px",
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: aux.aiBadgeBg,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            <IconSpark size={12} />
          </span>
          <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.55, color: aux.title }}>
            {stage.ai}
          </p>
        </div>

        {/* Human row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            background: aux.humanRowBg,
            borderRadius: "10px",
            padding: "10px 12px",
            minHeight: "76px",
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: aux.humanBadgeBg,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1px",
            }}
          >
            <IconUser size={12} />
          </span>
          <p style={{ margin: 0, fontSize: "12.5px", lineHeight: 1.55, color: aux.title, fontWeight: 500 }}>
            {stage.human}
          </p>
        </div>
      </div>
    </div>
  );
}

function AIDeliveryProcess({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("dp-line-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`relative bg1 border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "8rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .dp-card {
          opacity: 0;
          transform: translateY(26px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .dp-card.dp-vis { opacity: 1; transform: translateY(0); }
        .dp-fill { width: 0%; transition: width 1.6s cubic-bezier(0.22,1,0.36,1); }
        .dp-line-vis .dp-fill { width: 100%; }
        .dp-dot { opacity: 0; transform: scale(0.4); transition: opacity 0.45s ease, transform 0.45s cubic-bezier(0.22,1,0.36,1); }
        .dp-line-vis .dp-dot { opacity: 1; transform: scale(1); }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
        [END TO END DELIVERY]
        </p>
        <h2  className= "section-title" style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "22px" }}>
          AI at every step
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
            Every move, enhanced by AI.
          </em>
        </h2>
        <p style={{ maxWidth: "620px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          AI streamlines the workflow from first conversation to final launch. Experienced engineers guide every critical decision along the way.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div ref={lineRef} className="relative hidden lg:block" style={{ marginBottom: "40px", padding: "0 4%" }}>
          <div style={{ position: "relative", height: "2px", background: aux.lineColor, borderRadius: "2px", overflow: "hidden" }}>
            <div className="dp-fill" style={{ position: "absolute", top: 0, left: 0, height: "100%", background: aux.accent }} />
          </div>
          <div className="relative flex justify-between" style={{ marginTop: "-5px" }}>
            {DELIVERY_STAGES.map((s, i) => (
              <div
                key={s.num}
                className="dp-dot"
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: aux.dotFill,
                  border: `2px solid ${aux.accent}`,
                  transitionDelay: `${i * 0.18}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-stretch">
          {DELIVERY_STAGES.map((stage, i) => (
            <StageCard key={stage.num} stage={stage} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INSIGHT CARDS DATA
// ─────────────────────────────────────────────────────────────────────────────

const INSIGHT_CARDS = 
[
  {
    tag: "Artificial Intelligence",
    title: "Building AI That Delivers Beyond the Demo",
    excerpt: "What separates impressive AI demonstrations from production-ready solutions that create measurable business value.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
  },
  {
    tag: "Software Architecture",
    title: "Designing Systems Built to Scale",
    excerpt: "How thoughtful architecture, modern technologies, and clean engineering create products ready for long-term growth.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
  },
  {
    tag: "Product Engineering",
    title: "Accelerating Development with AI",
    excerpt: "How AI enhances development workflows while experienced engineers ensure quality, reliability, and maintainability.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&q=80",
  },
  {
    tag: "Cybersecurity",
    title: "Building Security into Every Release",
    excerpt: "Why secure development practices, continuous testing, and proactive monitoring matter from day one.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1600&q=80",
  },
  {
    tag: "Digital Transformation",
    title: "Delivering Software That Drives Growth",
    excerpt: "From strategy to deployment, discover how modern engineering helps businesses innovate faster and scale with confidence.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1600&q=80",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ENGINEERING NOTES (was "LatestSignal" / "Notes from the build floor.")
// ─────────────────────────────────────────────────────────────────────────────

function SignalCard({
  item,
  index,
  theme,
}: {
  item: (typeof INSIGHT_CARDS)[0];
  index: number;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const aux = auxPalette(theme);
  const tint = hoverTint(theme, index);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("sg-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link
      to="/insights"
      ref={ref as any}
      className="sg-card group"
      style={{
        display: "block",
        position: "relative",
        borderRadius: "20px",
        padding: "14px 14px 4px",
        transitionDelay: `${index * 0.08}s`,
        ["--sg-hover-glow" as any]: tint,
      }}
    >
      <div className="sg-glow" aria-hidden="true" />
      <div style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: "16 / 11", marginBottom: "18px" }}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="sg-img"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)" }}
        />
        <span
          className="font-mono"
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            fontSize: "10px",
            letterSpacing: "0.1em",
            color: "#fff",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "999px",
            padding: "5px 10px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="font-mono" style={{ position: "relative", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: aux.accent, fontWeight: 600, marginBottom: "8px" }}>
        {item.tag}
      </p>
      <h3 className=" sg-title" style={{ position: "relative", fontSize: "19px", fontWeight: 700, lineHeight: 1.25, color: aux.title, marginBottom: "8px", transition: "color 0.3s ease" }}>
        {item.title}
      </h3>
      <p style={{ position: "relative", fontSize: "13.5px", lineHeight: 1.6, color: aux.desc }}>
        {item.excerpt}
      </p>
      <span
        className="font-mono sg-arrow"
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "12px",
          marginBottom: "18px",
          fontSize: "11px",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: aux.accent,
          opacity: 0,
          transform: "translateX(-6px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        Read more →
      </span>
    </Link>
  );
}

function EngineeringNotes({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

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
    <section className={`relative border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .sg-card { opacity: 0; transform: translateY(30px); transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1); }
        .sg-card.sg-vis { opacity: 1; transform: translateY(0); }
        .sg-card:hover { transform: translateY(-6px); }
        .sg-card.sg-vis:hover { transform: translateY(-6px); }
        .sg-card:hover .sg-img { transform: scale(1.06); }
        .sg-card:hover .sg-title { color: ${aux.accent}; }
        .sg-card:hover .sg-arrow { opacity: 1; transform: translateX(0); }
        .sg-glow {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: radial-gradient(120% 100% at 50% 0%, var(--sg-hover-glow) 0%, transparent 65%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }
        .sg-card:hover .sg-glow { opacity: 1; }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
             [BLOCKCHAIN & AI INSIGHTS]
            </p>
            <h2 className= "section-title" style={{  color: pal.headerHeadingColor, margin: 0 }}>
              INSIGHTS FROM
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323", textTransform: "none", fontSize: "0.85em", letterSpacing: "0em" }}>
               The Frontlines.
              </em>
            </h2>
          </div>
          <Link
            to="/insights"
            className="font-mono"
            style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: pal.numColor, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            Read the blog →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {INSIGHT_CARDS.slice(0, 3).map((item, i) => (
            <SignalCard key={item.title} item={item} index={i} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SHIPPED INDUSTRIES — "We've already shipped in your industry."
//
// Hover treatment updated: instead of a flat full-card tint swap, each card
// now reveals a soft radial-gradient glow in the top-right corner on hover
// (color driven by hoverTint per card index), matching the softer look in
// the reference screenshot. Card content sits in a positioned wrapper above
// the glow layer via z-index/position so text stays crisp.
// ─────────────────────────────────────────────────────────────────────────────

const SHIPPED_INDUSTRIES = [
  { icon: IconStethoscope, title: "Healthcare", desc: "Telemedicine, EHR, and clinical AI built for compliance." },
  { icon: IconDollar, title: "Finance", desc: "Banking, payments, and trading systems that can't break." },
  { icon: IconTv, title: "Media & OTT", desc: "Streaming, DRM, and content discovery built for scale." },
  { icon: IconTruck, title: "Logistics", desc: "Real-time tracking and routing across messy operations." },
  { icon: IconShoppingBag, title: "Retail", desc: "Commerce, personalization, and fulfillment across every channel." },
  { icon: IconGraduationCap, title: "Education", desc: "Learning platforms built to keep students engaged." },
  { icon: IconHome, title: "Real Estate", desc: "Listings, transactions, and property management tools." },
  { icon: IconScale, title: "Legal", desc: "Document intelligence and workflow for legal teams." },
];

function IndustryCard({
  item,
  index,
  theme,
}: {
  item: (typeof SHIPPED_INDUSTRIES)[0];
  index: number;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const aux = auxPalette(theme);
  const Icon = item.icon;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ind-vis");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="ind-card"
      style={{
        position: "relative",
        overflow: "hidden",
        background: aux.cardBg,
        border: `1px solid ${aux.cardBorder}`,
        borderRadius: "18px",
        padding: "28px 24px",
        transitionDelay: `${(index % 8) * 0.05}s`,
      }}
    >
      <span className="ind-underline" style={{ background: aux.accent }} aria-hidden="true" />
      <div className="ind-icon" style={{ position: "relative", color: aux.accent, marginBottom: "18px" }}>
        <Icon />
      </div>
      <h3  style={{ position: "relative", fontSize: "18px", fontWeight: 600, color: aux.title, marginBottom: "8px" }}>
        {item.title}
      </h3>
      <p style={{ position: "relative", fontSize: "12.5px", lineHeight: 1.6, color: aux.desc, margin: 0 }}>
        {item.desc}
      </p>
    </div>
  );
}

function ShippedIndustries({ theme }: { theme: "light" | "dark" }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const pal = pillarPalette(theme);

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
    <section className={`relative bg1 border-t ${pal.sectionBorder}`} style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <style>{`
        ${PK_KEYFRAMES}
        .ind-card {
          opacity: 0;
          transform: scale(0.82) rotate(-2deg);
          transition: opacity 0.6s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .ind-card.ind-vis { opacity: 1; transform: scale(1) rotate(0deg); }
        .ind-card:hover {
          box-shadow: ${theme === "light" ? "0 20px 40px -20px rgba(199,90,26,0.25)" : "0 20px 40px -20px rgba(0,0,0,0.5)"};
          border-color: ${theme === "light" ? "rgba(199,90,26,0.4)" : "rgba(255,130,50,0.35)"};
        }
        .ind-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          width: 100%;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .ind-card:hover .ind-underline { transform: scaleX(1); }
        .ind-icon { transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
        .ind-card:hover .ind-icon { transform: rotate(-8deg) scale(1.15); }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
          [INDUSTRY EXPERIENCE]
        </p>  
        <h2 className= "section-title" style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "18px" }}>
          Experience that spans
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323", textTransform: "none", fontSize: "0.85em", letterSpacing: "0em" }}>
            Multiple Industries.
          </em>
        </h2>
        <p style={{ maxWidth: "640px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          Nearly a decade of cross-industry delivery means we show up with playbooks, not questions — not learning your domain on your budget.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SHIPPED_INDUSTRIES.map((item, i) => (
            <IndustryCard key={item.title} item={item} index={i} theme={theme} />
          ))}
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
  const { theme, toggleTheme } = useThemeInit();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <HowYouPlugUsIn theme={theme} />
      <PrototypeBlueprint theme={theme} />
      <TheReceipts theme={theme} />
      <TechToolsSection theme={theme} />
      <AICapabilities theme={theme} />
      <AIDeliveryProcess theme={theme} />
      <EngineeringNotes theme={theme} />
      <ShippedIndustries theme={theme} />
      <Brands />
      <CTA />
      <Footer theme={theme} />
      <ScrollToTop />
    </main>
  );
}