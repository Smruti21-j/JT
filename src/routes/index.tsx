import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { Brands } from "@/components/site/Brands";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import React, { JSX, useEffect, useRef, useState } from "react";
import { useThemeInit } from "@/hooks/use-theme-init";
//-----icons used -----
import iconAiAgents from "../assets/icon-ai-agents.png";  
import iconOverflow from "../assets/icon-overflow.png";
import iconci from "../assets/iconci.png";
import iconML from "../assets/icon-ML.png";
import icondata from "../assets/icon-data.png";
import iconnlp from "../assets/iconnlp.png";
import iconai from "../assets/iconai.png";
import iconops from "../assets/iconops.png";
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

import { POSTS } from "@/data/insights";

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
      aiRowBg: "rgba(0,0,0,0.045)",
      aiBadgeBg: "#8a8a8a",
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
    aiRowBg: "rgba(255,255,255,0.06)",
    aiBadgeBg: "#9a9a9a",
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
    tag: "Artificial Intelligence",
    title: "Intelligence that Acts",
    desc: "Transition from generative prompts to agentic workflows that resolve complex tasks with zero friction.",
    image: pillarImg1,
  },
  {
    badge: null,
    tag: "Digital Transformation",
    title: "The AI-First Core",
    desc: "Embed intelligence into the substrate of your business to create a self-evolving, future-proof operating model.",
    image: pillarImg2,
  },
  {
    badge: null,
    tag: "Product Engineering",
    title: "Digital Engineering at Scale",
    desc: "Accelerate your time-to-impact with battle-tested engineering playbooks and frontier technology stacks.",
    image: pillarImg3,
  },
  {
    badge: null,
    tag: "Application Transformation",
    title: "Next-Gen Ecosystems",
    desc: "Build the connected, cloud-native infrastructure required for a resilient and sovereign digital future.",
    image: pillarImg4,
  },
  {
    badge: null,
    tag: "UI / UX Design",
    title: "Design with Purpose",
    desc: "Amplify human potential through sensory UX that balances high-tech precision with human-centric empathy.",
    image: pillarImg5,
  },
  {
    badge: null,
    tag: "Digital Consulting",
    title: "Accelerated Value Chains",
    desc: "Unlock pervasive efficiencies across your entire enterprise with data-driven insights that act as your growth catalyst.",
    image: pillarImg6,
  },
  {
    badge: null,
    tag: "Performance & Growth",
    title: "The Architects of Intent",
    desc: "Before you build autonomy, you must engineer the intent. We map your industry’s future friction points to design custom governance and cognitive blueprints, ensuring your proprietary intelligence remains entirely your own.",
    image: pillarImg7,
  },
  {
    badge: null,
    tag: "Autonomous Ops",
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
            Autonomy
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
  "Real spreadsheet logic, rebuilt into autonomous digital workflows",
  "Seamless API pipelines connecting every tool in your stack",
  "Self-monitoring architecture that fixes itself before you notice",
  "Complex data, made instantly readable for every human on your team",
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

  // Real-Excel palette for the spreadsheet mockup panel
  const excelBg = "#ffffff";
  const excelHeaderBg = "#f3f2f1";
  const excelGrid = "#d4d4d4";
  const excelHeaderText = "#616161";
  const excelText = "#000000";
  const excelGreen = "#217346";
  const excelPositive = "#107C41";
  const excelNegative = "#C00000";

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

      {/* Excel-style spreadsheet mockup (revealed by drag slider) */}
      <div
        className="absolute inset-0"
        style={{
          background: excelBg,
          overflow: "hidden",
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          fontFamily: "Calibri, 'Segoe UI', Arial, sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between"
          style={{
            padding: "6px 12px",
            background: excelHeaderBg,
            borderBottom: `1px solid ${excelGrid}`,
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "3px",
                background: excelGreen,
                color: "#fff",
                fontSize: "9px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              X
            </span>
            <p style={{ fontSize: "12px", fontWeight: 600, color: "#1a1a1a", margin: 0 }}>
              admin_dashboard.xlsx
            </p>
          </div>
          <span
            className="font-mono"
            style={{
              fontSize: "8px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: excelGreen,
              background: "rgba(33,115,70,0.1)",
              border: `1px solid ${excelGreen}55`,
              borderRadius: "3px",
              padding: "2px 8px",
              fontWeight: 700,
            }}
          >
            AutoSave On
          </span>
        </div>

        {/* Formula bar */}
        <div
          className="flex items-center gap-2"
          style={{
            padding: "5px 10px",
            background: excelBg,
            borderBottom: `1px solid ${excelGrid}`,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              color: excelText,
              background: "#fff",
              border: `1px solid ${excelGrid}`,
              borderRadius: "2px",
              padding: "2px 8px",
              minWidth: "42px",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            B2
          </span>
          <span style={{ fontSize: "11px", color: excelHeaderText, fontStyle: "italic", padding: "0 4px" }}>fx</span>
          <span style={{ fontSize: "11px", color: excelText }}>
            =SUM(Applications[Status]="Disbursed")
          </span>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
          {/* Column letters */}
          <div style={{ display: "grid", gridTemplateColumns: "26px repeat(4, 1fr)", background: excelHeaderBg }}>
            <div style={{ borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }} />
            {["A", "B", "C", "D"].map((col) => (
              <div
                key={col}
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: excelHeaderText,
                  textAlign: "center",
                  padding: "4px 0",
                  borderRight: `1px solid ${excelGrid}`,
                  borderBottom: `1px solid ${excelGrid}`,
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Row 1 — headers */}
          <div style={{ display: "grid", gridTemplateColumns: "26px repeat(4, 1fr)" }}>
            <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "8px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>1</div>
            {STAT_CARDS.map((s) => (
              <div key={s.label} style={{ padding: "8px 8px", borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>
                <p style={{ fontSize: "10.5px", fontWeight: 700, color: excelText, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2 — values, B2 selected */}
          <div style={{ display: "grid", gridTemplateColumns: "26px repeat(4, 1fr)" }}>
            <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "10px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>2</div>
            {STAT_CARDS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "6px 8px",
                  borderRight: `1px solid ${excelGrid}`,
                  borderBottom: `1px solid ${excelGrid}`,
                  outline: i === 1 ? `2px solid ${excelGreen}` : "none",
                  outlineOffset: "-2px",
                  position: "relative",
                }}
              >
                <p style={{ fontSize: "15px", fontWeight: 700, color: excelText, margin: 0 }}>{s.value}</p>
                <p style={{ fontSize: "9px", color: s.up ? excelPositive : excelNegative, margin: "1px 0 0", fontWeight: 600 }}>{s.delta}</p>
                {i === 1 && (
                  <span
                    style={{
                      position: "absolute",
                      right: "-2px",
                      bottom: "-2px",
                      width: "6px",
                      height: "6px",
                      background: excelGreen,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Row 3 — sparkline */}
          <div style={{ display: "grid", gridTemplateColumns: "26px repeat(4, 1fr)" }}>
            <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "10px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>3</div>
            {STAT_CARDS.map((s) => (
              <div key={s.label} style={{ padding: "8px 8px", borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}`, display: "flex", gap: "2px", alignItems: "flex-end", height: "20px" }}>
                {s.bars.map((v, bi) => (
                  <span key={bi} style={{ width: "3px", height: `${(v / Math.max(...s.bars)) * 100}%`, background: excelGreen, opacity: 0.7 }} />
                ))}
              </div>
            ))}
          </div>

          {/* Row 4 — section label */}
          <div style={{ display: "grid", gridTemplateColumns: "26px 1fr" }}>
            <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "6px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>4</div>
            <div style={{ padding: "6px 10px", borderBottom: `1px solid ${excelGrid}` }}>
              <span style={{ fontSize: "10.5px", fontWeight: 700, color: excelText }}>Recent Applications</span>
            </div>
          </div>

          {/* Row 5 — column labels */}
          <div style={{ display: "grid", gridTemplateColumns: "26px 1.6fr 1fr 1fr" }}>
            <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "5px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>5</div>
            {["Loan ID", "Type", "Status"].map((h) => (
              <div key={h} style={{ padding: "5px 10px", borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>
                <span style={{ fontSize: "9.5px", fontWeight: 700, color: excelHeaderText }}>{h}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {RECORD_ROWS.map((row, i) => (
            <div key={row.id} style={{ display: "grid", gridTemplateColumns: "26px 1.6fr 1fr 1fr" }}>
              <div style={{ fontSize: "10px", color: excelHeaderText, textAlign: "center", padding: "7px 0", background: excelHeaderBg, borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>
                {6 + i}
              </div>
              <div style={{ padding: "7px 10px", borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>
                <span style={{ fontSize: "10.5px", color: excelText }}>{row.id}</span>
              </div>
              <div style={{ padding: "7px 10px", borderRight: `1px solid ${excelGrid}`, borderBottom: `1px solid ${excelGrid}` }}>
                <span style={{ fontSize: "10px", color: excelText }}>{row.label}</span>
              </div>
              <div
                style={{
                  padding: "7px 10px",
                  borderRight: `1px solid ${excelGrid}`,
                  borderBottom: `1px solid ${excelGrid}`,
                  background: `${recordStatusColor(row.status, "light")}22`,
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: 600, color: recordStatusColor(row.status, "light") }}>
                  {row.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sheet tabs */}
        <div
          className="flex items-center gap-0.5"
          style={{ padding: "4px 8px 0", background: excelHeaderBg, borderTop: `1px solid ${excelGrid}`, flexShrink: 0 }}
        >
          <span style={{ fontSize: "10.5px", fontWeight: 600, color: excelText, background: "#fff", borderRadius: "4px 4px 0 0", padding: "5px 14px", borderTop: `2px solid ${excelGreen}`, borderLeft: `1px solid ${excelGrid}`, borderRight: `1px solid ${excelGrid}` }}>
            Sheet1
          </span>
          <span style={{ fontSize: "10.5px", color: excelHeaderText, padding: "5px 14px" }}>Sheet2</span>
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
            [AUTONOMOUS ARCHITECTURE]
            </p>
            <h2 className= "section-title"  style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "16px" }}>
              Everyone builds the dashboard
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
                We build what powers it
              </em>
            </h2>
            <p style={{ fontSize: "15px", lineHeight: 1.8, color: pal.headerParaColor, marginBottom: "22px" }}>
            Drag the line and watch it happen - the same numbers, transformed from a static sheet into a system that runs, thinks, and adapts on its own. That's the difference between software you maintain and software that maintains itself.
            </p>
            <div className="flex flex-col gap-3">
              {BLUEPRINT_CHECKS.map((check) => (
                <div key={check} className="flex items-center gap-3">
                  <span
                    style={{
                      flexShrink: 0,
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: aux.accent,
                    }}
                  />
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
  { value: "9+", label: "Years Building Software" },
  { value: "200+", label: "Products Shipped" },
  { value: "30+", label: "Industries Served" },
  { value: "50+", label: "Engineers & Architects" },
  { value: "4×", label: "Faster Delivery with AI-Assisted Dev" },
  { value: "98.7%", label: "Client Retention Rate" },
  { value: "12", label: "Domains with Proven Playbooks" },
  { value: "24/7", label: "Global Delivery Coverage" },
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
          Years in the Making
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
           Built to Outlast Trends
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

function IconLayers({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2.5 8 12 13l9.5-5Z" />
      <path d="M2.5 12 12 17l9.5-5" />
      <path d="M2.5 16 12 21l9.5-5" />
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
    tag: "Case Study · Digital Lending",
    title: "LendNova",
    desc: "A multi-lender digital marketplace that matches borrowers with the right lender in one application.",
    icon: IconLayers,
    slug: "lendnova",
  },
  {
    tag: "AgencyOps · Portfolio Sharing",
    title: "EchoShowcase",
    desc: "Curate work, share it as branded secure links, and measure how prospects engage.",
    icon: IconStack,
    slug: "bhg",
  },
  {
    tag: "AI Context Layer",
    title: "Context Brain",
    desc: "The context layer that briefs every AI coding agent over MCP.",
    icon: IconBrainSimple,
    slug:"tradetracker",
  },
  {
    tag: "Infrastructure · DevOps",
    title: "SSH Manager",
    desc: "Browser terminals, a secrets vault, and CI/CD in one console.",
    icon: IconTerminal,
    slug:"creditreport",
  },
  {
    tag: "Presentations · AI",
    title: "Deck Forge",
    desc: "On-brand decks forged fast — brand applied at render time.",
    icon: IconPresentation,
    slug:"ircs",
  },
  {
    tag: "Proposals · AI",
    title: "Proposal Creator",
    desc: "From a rough idea to a client-ready, costed proposal.",
    icon: IconDocument,
    slug:"proposal-creator",
  },
] as const;

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
  item: (typeof TECH_TOOL_ITEMS)[number];
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
      <Link to={`/case-studies/${item.slug}` as any} className={className}>
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
              [CASE STUDIES]
            </p>
            <h2 className="section-title" style={{ color: pal.headerHeadingColor, margin: 0 }}>
              This Isn't a Pitch Deck
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
                It's a Track Record
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
function IconShield({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function IconLandmark({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M4.5 21V10M9 21V10M15 21V10M19.5 21V10" />
      <path d="M2.5 10 12 4l9.5 6Z" />
    </svg>
  );
}
function IconFactory({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21V11l6 4v-4l6 4V6.5L21 11v10Z" />
      <path d="M3 21h18" />
      <path d="M7 21v-4M12 21v-4M17 21v-4" />
    </svg>
  );
}
function IconPlane({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 16 21 8.5c1.2-.5 2 .8 1.2 1.7L15 17.5l.7 4.5-2.7-1.8-1.5-3.4-6-1.3L2.5 16Z" />
      <path d="M9.5 15.5 8 21" />
    </svg>
  );
}
function IconBolt({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}
function IconGamepad({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="8" width="19" height="10" rx="5" />
      <path d="M7 11v4M5 13h4" />
      <circle cx="15.5" cy="11.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="18" cy="14" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconCar({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 16v-3l2-4.5h13l2 4.5v3" />
      <path d="M3.5 16h17M5 16v2M19 16v2" />
      <circle cx="7" cy="16" r="1.6" />
      <circle cx="17" cy="16" r="1.6" />
    </svg>
  );
}
function IconPackage({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 7.5 12 3l8.5 4.5V16L12 20.5 3.5 16Z" />
      <path d="M3.5 7.5 12 12l8.5-4.5M12 12v8.5" />
    </svg>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// AI CAPABILITIES
// ─────────────────────────────────────────────────────────────────────────────

const AI_CAPABILITIES = [
  { image: iconAiAgents, title: "AI Agents", desc: "Autonomous systems that execute tasks end-to-end;  not chatbots that just answer questions." },
  { image: iconOverflow, title: "Workflow & Business Automation", desc: "We wire intelligence into the manual work eating your team's hours, so it disappears quietly." },
  { image: icondata, title: "Data Science & Analytics", desc: "Your data has been talking. We build the systems that finally listen - and act." },
  { image: iconci, title: "Computer Vision", desc: "Machines that see what your team can't scale to watch - inspection, detection, real-time response." },
  { image: iconML, title: "Custom Models & ML", desc: "Off-the-shelf models solve generic problems. We train ones that solve yours." },
  { image: iconnlp, title: "NLP Solutions", desc: "From documents to conversations, we turn unstructured language into structured decisions." },
  { image: iconai, title: "Generative AI", desc: "Content, code, and creative output generated on demand - tuned to your brand, not a template." },
  { image: iconops, title: "AI Operations (MLOps)", desc: "Models that stay accurate in production, not just in a notebook- monitored, retrained, maintained." },
];

function AICapabilityCard({
  cap,
  index,
  theme,
}: {
  cap: (typeof AI_CAPABILITIES)[0] & { image?: string; icon?: (props: { size?: number }) => JSX.Element };
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
        className="ac-icon-wrap"
        style={{
          color: aux.accent,
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
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
              transform: "scale(1.6)",
              opacity:"0.8" // compensates for empty padding baked into the PNG
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

        .ac-icon-wrap {
          transition: transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
        }
        .ac-card:hover .ac-icon-wrap {
          transform: translateY(-6px) scale(1.12) rotate(-4deg);
        }
        .ac-icon-wrap img {
          transition: filter 0.35s ease;
        }
        .ac-card:hover .ac-icon-wrap img {
          filter: drop-shadow(0 8px 14px rgba(237,99,35,0.35));
        }
      `}</style>

      <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "22px" }}>
         [INTELLIGENCE STACK]
        </p>
        <h2 className= "section-title" style={{  color: pal.headerHeadingColor, margin: 0, marginBottom: "18px" }}>
          We Don't Bolt On AI
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323", textTransform: "none", fontSize: "0.85em", letterSpacing: "0em" }}>
            We Build Around It
          </em>
        </h2>
        <p style={{ maxWidth: "620px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          Every service here is engineered by people who've deployed AI into real production systems;  not just demoed it in a sandbox. If it doesn't hold up under real traffic, real data, and real deadlines, we don't ship it.
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
    title: "Discovery",
    tagline: "Every build starts as a question worth interrogating.",
    ai: "Scans requirements in hours, not weeks; surfacing feasibility before assumptions calcify",
    human: "Asks the harder question;  should we build this, and how, before asking how fast"
  },
  {
    num: "02",
    title: "Architecture",
    tagline: "The blueprint decides everything that comes after.",
    ai: "Simulates the entire stack before a single server exists",
    human: "Designs for the failure modes no simulation saw coming; zero trust, by default"
  },
  {
    num: "03",
    title: "Experience",
    tagline: "Interfaces people actually want to open.",
    ai: "Generates UI variants and predicts where users will click, scroll, and stall",
    human: "Adds the ergonomic, emotional judgment that makes software feel considered, not generated"
  },
  {
    num: "04",
    title: "Develop & Deploy",
    tagline: "Where code becomes consequence.",
    ai: "Synthesizes production code and ships it live with zero-downtime precision",
    human: "Owns the final call - every release reviewed, audited, and signed off by someone accountable"
  },
  {
    num: "05",
    title: "Security & QA",
    tagline: "Trust isn't a checkbox - it's a posture.",
    ai: "Watches every endpoint, every hour, catching anomalies before they become incidents",
    human: "Certifies compliance and governance where \"the model flagged it\" isn't good enough"
  },
  {
    num: "06",
    title: "Growth",
    tagline: "Launch day is the beginning, not the finish line.",
    ai: "Reads real-time telemetry and scales infrastructure ahead of demand, not behind it",
    human: "Keeps evolving the product with dedicated engineering - because done software is dying software"
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
   <div style={{ minHeight: "88px" }}>
  <span
    className="font-mono"
    style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: aux.accent, fontWeight: 600 }}
  >
    Stage {stage.num}
  </span>
  <h4 style={{ margin: "6px 0 6px", fontSize: "17px", fontWeight: 700, color: aux.title, lineHeight: 1.25 }}>
    {stage.title}
  </h4>
  <p
  className="font-display"
  style={{
    margin: 0,
    fontSize: "13px",
    lineHeight: 1.5,
    fontStyle: "italic",
    fontWeight: 400,
    color: "#ed6323",
  }}
>
  {stage.tagline}
</p>
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
         Engineering at AI Speed
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323" }}>
          Judgment at Human Depth
          </em>
        </h2>
        <p style={{ maxWidth: "620px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          Machines move fast. Humans make it matter. Every stage below runs on both - AI compresses the timeline, and our engineers make sure nothing important gets compressed with it.
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

const INSIGHT_CARDS = POSTS.slice(0, 3).map((post) => ({
  tag: post.tag,
  title: post.title,
  excerpt: post.excerpt,
  image: post.img,
  slug: post.slug,
}));

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
  search={{ post: item.slug }}
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
               The Frontlines
              </em>
            </h2>
          </div>
          <Link
            to="/insights"
            search={{ post: undefined }}
            className="font-mono"
            style={{ fontSize: "12px", letterSpacing: "0.2em", textTransform: "uppercase", color: pal.numColor, fontWeight: 500, whiteSpace: "nowrap" }}>
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
  { icon: IconDollar, title: "Finance & Fintech" },
  { icon: IconTv, title: "Media & OTT" },
  { icon: IconShield, title: "Banking & Insurance" },
  { icon: IconTruck, title: "Logistics & Supply Chain" },
  { icon: IconLandmark, title: "Government & Public Sector" },
  { icon: IconGraduationCap, title: "Education & EdTech" },
  { icon: IconShoppingBag, title: "Retail & E-commerce" },
  { icon: IconFactory, title: "Manufacturing & Industry " },
  { icon: IconPlane, title: "Travel & Hospitality" },
  { icon: IconHome, title: "Real Estate & PropTech" },
  { icon: IconBolt, title: "Energy & Utilities" },
  { icon: IconGamepad, title: "Gaming & Entertainment" },
  { icon: IconCar, title: "Automotive & Mobility" },
  { icon: IconPackage, title: "Consumer & CPG" },
  { icon: IconStethoscope, title: "Healthcare" },
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
        borderRadius: "14px",
        padding: "18px 16px",
        transitionDelay: `${(index % 8) * 0.05}s`,
      }}
    >
      <span className="ind-underline" style={{ background: aux.accent }} aria-hidden="true" />
      <div className="ind-icon" style={{ position: "relative", color: aux.accent, marginBottom: "10px", width: "28px", height: "28px" }}>
        <Icon size={28} />
      </div>
      <h3 style={{ position: "relative", fontSize: "13.5px", fontWeight: 600, color: aux.title, margin: 0, lineHeight: 1.3 }}>
        {item.title}
      </h3>
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
          [INDUSTRIES]
        </p>  
        <h2 className= "section-title" style={{ color: pal.headerHeadingColor, margin: 0, marginBottom: "18px" }}>
          We've Already Been
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "#ed6323", textTransform: "none", fontSize: "0.85em", letterSpacing: "0em" }}>
            Where You're Headed
          </em>
        </h2>
        <p style={{ maxWidth: "640px", fontSize: "15px", lineHeight: 1.75, color: pal.headerParaColor }}>
          Nearly a decade of shipping across industries means we show up already fluent in your compliance, your edge cases, your users. No learning curve billed to your timeline.
        </p>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
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