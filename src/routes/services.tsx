import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import dataAiImg from "@/assets/service-data-ai.jpg";
import digitalImg from "@/assets/service-digital.jpg";
import productImg from "@/assets/service-product.jpg";
import appImg from "@/assets/service-app.jpg";
import uiuxImg from "@/assets/service-uiux.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import growthImg from "@/assets/service-growth.jpg";
import managedImg from "@/assets/service-managed.jpg";

const CAROUSEL_IMAGES = [
  "/services-c1.png",
  "/services-c2.png",
  "/services-c3.png",
  "/services-c4.png",
  "/services-c5.png",
];

const PANEL_ACCENT = [
  "rgb(255,130,50)",
  "rgb(180,180,180)",
  "rgb(255,160,60)",
  "rgb(255,130,50)",
  "rgb(180,180,180)",
  "rgb(255,160,60)",
  "rgb(255,130,50)",
  "rgb(180,180,180)",
];

const SERVICE_GROUPS = [
  {
    title: "Artificial Intelligence",
    image: dataAiImg,
    eyebrow: "Neural Command Layer",
    tagline: "Move from AI that talks to AI that acts. We build the proactive engines that reason, plan, and execute missions across your entire business.",
    stat: { value: "10×", label: "Decision velocity" },
    items: [
      "Core Systems: Generative AI, LLM Substrates, Deep Learning",
      "Action Agents: Smart AI Assistants, Autonomous Chatbots",
      "Intelligence: Model Fine-tuning, NLP, Sentiment & Context Analysis",
      "Tools: Optical Intelligence (OCR), Automated Performance Optimization",
    ],
    subImages: [
      { src: "/AI1.png", label: "Core Systems" },
      { src: "/AI2.png", label: "AI Agents" },
      { src: "/AI3.png", label: "Intelligence" },
      { src: "/AI4.png", label: "Tools" },
    ],
  },
  {
    title: "Digital Transformation",
    image: digitalImg,
    eyebrow: "Enterprise Singularity",
    tagline: "Reclaim your digital destiny. We transform legacy chaos into a self-evolving operating model where you own the data and the results.",
    stat: { value: "3×", label: "Time-to-market compression" },
    items: [
      "Core Logic: Enterprise Architecture, Business Intelligence",
      "Modernization: Architecture Resurgence (App Modernization)",
      "Integration: Sovereign System Integration, Cloud & Hybrid Core",
      "Experience: Immersive Digital Experience, Enterprise Mobility",
    ],
    subImages: [
      { src: "/DT1.png", label: "Core Logic" },
      { src: "/DT2.png", label: "Modernization" },
      { src: "/DT3.png", label: "Integration" },
      { src: "/DT4.png", label: "Experience" },
    ],
  },
  {
    title: "Product Engineering",
    image: productImg,
    eyebrow: "Precision Build Matrix",
    tagline: "Forge the impossible with future-fit engineering. We build resilient digital products designed for your infinite scale.",
    stat: { value: "98%", label: "On-time delivery rate" },
    items: [
      "Design Forge: Product Assessment & Design, Application Re-Engineering",
      "Scale Logic: Platform Engineering, Custom High-Stakes Development",
      "Velocity: Battle-Tested DevOps, Precision Quality Assurance",
      "Resource: Elite Team Augmentation",
    ],
    subImages: [
      { src: "/PE1.png", label: "Design Forge" },
      { src: "/PE2.png", label: "Scale Logic" },
      { src: "/PE3.png", label: "Velocity" },
      { src: "/PE4.png", label: "Resource" },
    ],
  },
  {
    title: "Application Transformation",
    image: appImg,
    eyebrow: "Omniscreen Deployment",
    tagline: "High-velocity platforms for a real-time world. We deploy the composable applications you need to optimize operations in near-real-time.",
    stat: { value: "4.9★", label: "Avg. app store rating" },
    items: [
      "Web Logic: Responsive Web Ecosystems, Progressive Web Apps (PWA)",
      "Mobile Core: Mobile App Development, Cross-Platform Architectures",
      "Foundation: API Substrates & Integration, Scalable Back-End",
    ],
    subImages: [
      { src: "/AT1.png", label: "Web Logic" },
      { src: "/AT2.png", label: "Mobile Core" },
      { src: "/AT3.png", label: "Foundation" },
      { src: "/AT4.png", label: "Integration" },
    ],
  },
  {
    title: "UI / UX Design",
    image: uiuxImg,
    eyebrow: "Neuro-Experience Design",
    tagline: "Interfaces that sense human intent. We design the human-AI symbiosis that makes your brand feel natural and inevitable.",
    stat: { value: "62%", label: "Avg. engagement uplift" },
    items: [
      "Research: Cognitive UX Research, Usability Consulting",
      "Craft: Precision UX Design, Intuitive UI Craftsmanship",
      "Strategy: User Experience Strategy, Specialized Design Squads",
    ],
    subImages: [
      { src: "/UI1.png", label: "Research" },
      { src: "/UI2.png", label: "Craft" },
      { src: "/UI4.png", label: "Squads" },
    ],
  },
  {
    title: "Consulting",
    image: consultingImg,
    eyebrow: "Strategic Foresight Engine",
    tagline: "Turn technical complexity into unvarnished business clarity. We provide the blueprint for your world's most important decisions.",
    stat: { value: "85%", label: "Clients advance to build" },
    items: [
      "Strategic Core: Business & Stakeholder Value, Technology Strategy",
      "Plan Forge: Product Strategy, Sovereign Data Strategy",
      "Milestones: Impact-Driven Roadmapping, CX Strategy",
    ],
    subImages: [
      { src: "/C1.png", label: "Strategic Core" },
      { src: "/C2.png", label: "Plan Forge" },
      { src: "/C3.png", label: "Milestones" },
    ],
  },
  {
    title: "Performance & Growth",
    image: growthImg,
    eyebrow: "Perpetual Optimisation Loop",
    tagline: "Stop chasing vanity metrics; start commanding results. Activate a continuous cycle of optimization that drives your growth.",
    stat: { value: "2.4×", label: "Avg. revenue multiplier" },
    items: [
      "Engines: Experience & Conversion Optimization, 1:1 Personalization",
      "Intelligence: Real-Time Tracking & Analytics, SEO (GEO & AIO)",
      "Clarity: Intelligent BI Consultancy, Impact Dashboards",
    ],
    subImages: [
      { src: "/PG1.png", label: "Engines" },
      { src: "/PG2.png", label: "Intelligence" },
      { src: "/PG3.png", label: "Clarity" },
    ],
  },
  {
    title: "Autonomous Ops",
    image: managedImg,
    eyebrow: "Autonomous Operations Grid",
    tagline: "The self-healing backbone for your digital core. We keep your IT secure and invisible so you can focus purely on your scale.",
    stat: { value: "99.9%", label: "Guaranteed uptime SLA" },
    items: [
      "Reliability: Intelligent IT Ops & Support, 24/7 Application Support",
      "Security: Preemptive Cybersecurity, Compliance & Risk Governance",
      "Evolution: Architecture Resurgence, Sovereign Cloud Hosting",
      "Strategic Support: Professional Services, Lifecycle DevOps",
    ],
    subImages: [
      { src: "/AO1.png", label: "Reliability" },
      { src: "/AO2.png", label: "Security" },
      { src: "/AO3.png", label: "Evolution" },
      { src: "/AO4.png", label: "Strategic Support" },
    ],
  },
];

/* ─── flat list of every card across all groups ─── */
type CardEntry = {
  src: string;
  label: string;
  itemTitle: string;
  detail: string;
  svcIdx: number;
  acc: string;
  svcTitle: string;
  cardIdx: number; /* position within group */
};

function buildFlatCards(): CardEntry[] {
  const out: CardEntry[] = [];
  SERVICE_GROUPS.forEach((svc, si) => {
    svc.subImages.forEach((img, ii) => {
      const raw = svc.items[ii] ?? "";
      const colon = raw.indexOf(":");
      out.push({
        src: img.src,
        label: img.label,
        itemTitle: colon > -1 ? raw.slice(0, colon).trim() : img.label,
        detail: colon > -1 ? raw.slice(colon + 1).trim() : raw,
        svcIdx: si,
        acc: PANEL_ACCENT[si],
        svcTitle: svc.title,
        cardIdx: ii,
      });
    });
  });
  return out;
}

const FLAT_CARDS = buildFlatCards();

const STYLES = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scanLine {
    0%   { top: -2px; opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes lineExpand {
    from { transform: scaleX(0); transform-origin: left; }
    to   { transform: scaleX(1); transform-origin: left; }
  }
  @keyframes kenBurns {
    0%   { transform: scale(1)    translateX(0)    translateY(0); }
    25%  { transform: scale(1.06) translateX(-1%)  translateY(-0.5%); }
    50%  { transform: scale(1.04) translateX(1%)   translateY(0.5%); }
    75%  { transform: scale(1.07) translateX(-0.5%) translateY(1%); }
    100% { transform: scale(1)    translateX(0)    translateY(0); }
  }
  @keyframes pipProgress {
    from { width: 0%; }
    to   { width: 100%; }
  }
  @keyframes leftFadeIn {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes zoomIn {
    from { opacity: 0; transform: scale(0.88); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── HERO ── */
  .hero-carousel-slide {
    position: absolute; inset: 0;
    opacity: 0;
    transition: opacity 1.8s cubic-bezier(0.4,0,0.2,1);
    will-change: opacity;
  }
  .hero-carousel-slide.active { opacity: 1; }
  .hero-carousel-slide .kb-inner {
    position: absolute; inset: -4%;
    background-size: cover; background-position: center;
    filter: saturate(0.55) brightness(0.42);
    animation: kenBurns 18s ease-in-out infinite;
    will-change: transform;
  }
  .carousel-pip {
    height: 4px; border-radius: 2px; border: none; cursor: pointer;
    padding: 0; transition: width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.4s ease;
    flex-shrink: 0;
  }
  .carousel-pip-track {
    position: absolute; top: 0; left: 0; height: 100%;
    border-radius: 2px; background: rgb(255,130,50);
    animation: pipProgress 4s linear forwards;
  }

  /* ── SPLIT LAYOUT ── */
  .split-section {
    display: flex;
    align-items: flex-start;
    background: #0a0a0a;
  }

  /* LEFT sticky panel */
  .split-left {
    width: 38%;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 clamp(28px,4vw,60px) 0 clamp(28px,5vw,72px);
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    background: #0a0a0a;
  }
  .left-animated {
    animation: leftFadeIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
    display: flex; flex-direction: column; gap: 18px;
    position: relative; z-index: 1;
  }
  .svc-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    transition: all 0.25s; flex-shrink: 0;
    cursor: pointer; border: none; padding: 0;
  }
  .svc-dot.active { transform: scale(1.6); }

  /* RIGHT scrollable column */
  .split-right {
    flex: 1;
    min-width: 0;
    padding: 32px 36px;
  }

  /* Service group block */
  .svc-service-block { margin-bottom: 4px; }

  /* group heading */
  .svc-group-heading {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .svc-group-number {
    font-size: 10px; font-weight: 700;
    letter-spacing: 0.25em;
    opacity: 0.7;
  }
  .svc-group-name {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  /* divider between service groups */
  .svc-service-divider {
    height: 1px;
    background: linear-gradient(to right, var(--accent), transparent);
    opacity: 0.2;
    margin: 18px 0 20px;
  }

  /* ── CARD: fixed height, image left, text right ── */
  .svc-card {
    display: flex;
    align-items: stretch;
    height: 120px;           /* fixed uniform height for all cards */
    background: #111214;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 10px;
    cursor: pointer;
    position: relative;
    transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
  }
  .svc-card:hover {
    border-color: var(--accent);
    background: #16181a;
    box-shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  /* accent top bar */
  .svc-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; z-index: 3;
    background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .svc-card:hover::before { transform: scaleX(1); }

  /* image thumbnail — fixed width, full card height */
  .svc-card-img {
    width: 160px;
    flex-shrink: 0;
    overflow: hidden;
    position: relative;
  }
  .svc-card-img img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    filter: saturate(0.75) brightness(0.78);
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1), filter 0.35s ease;
  }
  .svc-card:hover .svc-card-img img {
    transform: scale(1.07);
    filter: saturate(1) brightness(0.92);
  }
  /* numeric badge inside image */
  .svc-card-num {
    position: absolute; bottom: 8px; left: 10px;
    font-size: 24px; font-weight: 800; line-height: 1;
    color: rgba(255,255,255,0.15);
    letter-spacing: -0.04em;
    pointer-events: none; user-select: none;
  }

  /* text area */
  .svc-card-body {
    flex: 1; min-width: 0;
    padding: 16px 20px;
    display: flex; flex-direction: column;
    justify-content: center; gap: 6px;
  }
  .svc-card-eyebrow {
    font-size: 8.5px; letter-spacing: 0.32em; text-transform: uppercase;
    color: var(--accent); font-weight: 600;
    display: flex; align-items: center; gap: 8px;
  }
  .svc-card-eyebrow::before {
    content: ''; display: inline-block;
    width: 14px; height: 1.5px;
    background: var(--accent); flex-shrink: 0;
  }
  .svc-card-title {
    font-size: 0.94rem; font-weight: 700;
    color: #f0e8df; line-height: 1.25;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .svc-card-desc {
    font-size: 0.8rem;
    color: rgba(240,232,220,0.42);
    line-height: 1.55;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* view icon on right */
  .svc-card-arrow {
    width: 40px; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.12);
    transition: color 0.25s ease, transform 0.25s ease;
    font-size: 18px;
  }
  .svc-card:hover .svc-card-arrow {
    color: var(--accent);
    transform: scale(1.2);
  }

  /* ── LIGHTBOX / ZOOM OVERLAY ── */
  .svc-lightbox {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5,4,3,0.92);
    display: flex; align-items: center; justify-content: center;
    animation: overlayIn 0.25s ease both;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    cursor: zoom-out;
  }
  .svc-lightbox-inner {
    position: relative;
    width: min(780px, 90vw);
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 32px 80px rgba(0,0,0,0.7);
    animation: zoomIn 0.3s cubic-bezier(0.16,1,0.3,1) both;
    cursor: default;
    background: #111214;
  }
  .svc-lightbox-img {
    width: 100%;
    height: 340px;
    object-fit: cover;
    display: block;
    filter: saturate(0.85) brightness(0.88);
  }
  .svc-lightbox-body {
    padding: 28px 32px 32px;
    display: flex; flex-direction: column; gap: 10px;
  }
  .svc-lightbox-eyebrow {
    font-size: 9px; letter-spacing: 0.38em; text-transform: uppercase;
    font-weight: 600;
    display: flex; align-items: center; gap: 10px;
  }
  .svc-lightbox-eyebrow::before {
    content: ''; display: inline-block;
    width: 18px; height: 1.5px; flex-shrink: 0;
    background: currentColor;
  }
  .svc-lightbox-title {
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    font-weight: 800; color: #f0e8df;
    line-height: 1.1; letter-spacing: -0.025em;
  }
  .svc-lightbox-divider {
    height: 1px;
    opacity: 0.25;
    border: none;
    background: currentColor;
  }
  .svc-lightbox-desc {
    font-size: 0.92rem;
    color: rgba(240,232,220,0.55);
    line-height: 1.72;
  }
  .svc-lightbox-close {
    position: absolute; top: 14px; right: 14px;
    width: 34px; height: 34px; border-radius: 50%;
    background: rgba(0,0,0,0.55); border: 1px solid rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.7); font-size: 16px; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.2s ease, color 0.2s ease;
    z-index: 10;
  }
  .svc-lightbox-close:hover { background: rgba(255,130,50,0.25); color: #fff; }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .split-section { flex-direction: column; }
    .split-left {
      width: 100%; position: relative;
      height: auto; min-height: 50vh;
      padding: 48px 24px;
    }
    .split-right { padding: 20px 16px; }
    .svc-card { height: auto; min-height: 100px; }
    .svc-card-img { width: 120px; }
  }
  @media (max-width: 480px) {
    .svc-card { flex-direction: column; height: auto; }
    .svc-card-img { width: 100%; height: 140px; }
    .svc-lightbox-img { height: 220px; }
    .svc-lightbox-body { padding: 20px; }
  }
`;

/* ── Lightbox component ── */
type LightboxCard = CardEntry | null;

function Lightbox({ card, onClose }: { card: LightboxCard; onClose: () => void }) {
  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div className="svc-lightbox" onClick={onClose}>
      <div className="svc-lightbox-inner" onClick={(e) => e.stopPropagation()}>
        <button className="svc-lightbox-close" onClick={onClose} aria-label="Close">✕</button>
        <img className="svc-lightbox-img" src={card.src} alt={card.label} />
        <div className="svc-lightbox-body">
          <div className="svc-lightbox-eyebrow" style={{ color: card.acc }}>
            {card.svcTitle} — {card.label}
          </div>
          <h3 className="svc-lightbox-title">{card.itemTitle}</h3>
          <hr className="svc-lightbox-divider" style={{ background: card.acc }} />
          {card.detail && <p className="svc-lightbox-desc">{card.detail}</p>}
        </div>
      </div>
    </div>
  );
}

/* ── Video Hero ── */
function VideoHero() {
  const [current, setCurrent] = useState(0);
  const [pipKey, setPipKey] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % CAROUSEL_IMAGES.length);
      setPipKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#050403" }}>
      {CAROUSEL_IMAGES.map((src, i) => (
        <div key={src} className={`hero-carousel-slide${i === current ? " active" : ""}`}>
          <div className="kb-inner" style={{ backgroundImage: `url(${src})` }} />
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(5,4,3,.35) 0%,rgba(5,4,3,.05) 30%,rgba(5,4,3,.65) 68%,rgba(5,4,3,1) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(5,4,3,.6) 0%,transparent 65%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,110,30,.5),transparent)", animation: "scanLine 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "15%", bottom: "15%", left: 0, width: "2px", background: "linear-gradient(180deg,transparent,rgb(255,110,30) 30%,rgb(255,110,30) 70%,transparent)" }} />
      <div style={{ position: "absolute", top: 28, right: "clamp(24px,5vw,80px)", display: "flex", gap: 6, alignItems: "center", zIndex: 20 }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button key={i} className="carousel-pip" onClick={() => { setCurrent(i); setPipKey(k => k + 1); }}
            style={{ width: i === current ? 28 : 6, background: i === current ? "rgba(255,130,50,0.25)" : "rgba(255,255,255,0.2)", position: "relative", overflow: "hidden" }}>
            {i === current && <span key={pipKey} className="carousel-pip-track" />}
          </button>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 80, right: "clamp(24px,5vw,80px)", display: "flex", alignItems: "baseline", gap: 4, zIndex: 10 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "rgb(255,130,50)", lineHeight: 1 }}>{String(current + 1).padStart(2, "0")}</span>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>/ {String(CAROUSEL_IMAGES.length).padStart(2, "0")}</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(24px,5vw,80px) 72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, animation: "heroIn .6s .3s both", opacity: 0 }}>
          <div style={{ width: 32, height: 1, background: "rgb(255,130,50)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgb(255,130,50)" }}>What We Do</span>
        </div>
        <h1 style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em", color: "#f0e8df", marginBottom: 24, animation: "heroIn .7s .42s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          IMPACT <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgb(255,130,50)" }}>WITNESSED</em>
        </h1>
        <div style={{ position: "relative", height: 1, background: "rgba(255,255,255,.08)", marginBottom: 24, maxWidth: 480, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgb(255,130,50),rgba(255,180,80,.3))", animation: "lineExpand 1s .9s cubic-bezier(.4,0,.2,1) both", transformOrigin: "left" }} />
        </div>
        <div style={{ animation: "heroIn .6s .58s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          <p style={{ fontSize: "clamp(.9rem,1.3vw,1.05rem)", color: "rgba(240,232,220,.55)", lineHeight: 1.75, maxWidth: 560 }}>
            See your future in action. Explore the missions where we turned bold ambition into scalable reality.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Services Split Section ── */
function ServicesScrollSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomedCard, setZoomedCard] = useState<CardEntry | null>(null);
  const groupRefs = useRef<{ el: HTMLDivElement; svcIdx: number }[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    groupRefs.current.forEach(({ el, svcIdx }) => {
      const io = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(svcIdx); },
        { threshold: 0.25, rootMargin: "-10% 0px -50% 0px" }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const g = SERVICE_GROUPS[activeIdx];
  const accent = PANEL_ACCENT[activeIdx];

  return (
    <>
      <section className="split-section">
        {/* LEFT sticky panel */}
        <div className="split-left">
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: 2,
            background: `linear-gradient(180deg, transparent, ${accent} 20%, ${accent} 80%, transparent)`,
            opacity: 0.7, transition: "background 0.5s ease",
          }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

          <div key={activeIdx} className="left-animated">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 11, letterSpacing: "0.3em", color: accent, fontWeight: 600 }}>
                {String(activeIdx + 1).padStart(2, "0")}
              </span>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.45, maxWidth: 80 }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>
                {String(SERVICE_GROUPS.length).padStart(2, "0")}
              </span>
            </div>

            <p style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: accent, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 22, height: 1, background: accent, flexShrink: 0 }} />
              {g.eyebrow}
            </p>

            <h2 style={{ fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight: 800, lineHeight: 1.04, letterSpacing: "-0.03em", color: "#f0e8df" }}>
              {g.title}
            </h2>

            <div style={{ height: 1, background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.3, maxWidth: 260 }} />

            <p style={{ fontSize: "clamp(0.82rem,1.1vw,0.98rem)", lineHeight: 1.76, color: "rgba(240,232,220,0.52)", maxWidth: 360 }}>
              {g.tagline}
            </p>

            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 4 }}>
              <span style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
                {g.stat.value}
              </span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {g.stat.label}
              </span>
            </div>

            <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
              {SERVICE_GROUPS.map((_, di) => {
                const firstGroup = groupRefs.current.find((c) => c.svcIdx === di);
                return (
                  <button
                    key={di}
                    className={`svc-dot${di === activeIdx ? " active" : ""}`}
                    style={{ background: di === activeIdx ? accent : "rgba(255,255,255,0.18)" }}
                    onClick={() => firstGroup?.el.scrollIntoView({ behavior: "smooth" })}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT — scrollable card list */}
        <div className="split-right">
          {SERVICE_GROUPS.map((svc, si) => {
            const acc = PANEL_ACCENT[si];
            return (
              <div
                key={svc.title}
                className="svc-service-block"
                ref={(el) => { if (el) groupRefs.current.push({ el, svcIdx: si }); }}
              >
                {si > 0 && (
                  <div className="svc-service-divider" style={{ "--accent": acc } as React.CSSProperties} />
                )}

                {/* group heading */}
                <div className="svc-group-heading">
                  <span className="svc-group-number" style={{ color: acc }}>
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <div style={{ width: 18, height: 1, background: acc, opacity: 0.4 }} />
                  <span className="svc-group-name">{svc.title}</span>
                </div>

                {/* cards */}
                {svc.subImages.map((img, ii) => {
                  const raw = svc.items[ii] ?? "";
                  const colon = raw.indexOf(":");
                  const itemTitle = colon > -1 ? raw.slice(0, colon).trim() : img.label;
                  const detail = colon > -1 ? raw.slice(colon + 1).trim() : raw;
                  const cardEntry: CardEntry = { src: img.src, label: img.label, itemTitle, detail, svcIdx: si, acc, svcTitle: svc.title, cardIdx: ii };

                  return (
                    <div
                      key={img.label}
                      className="svc-card"
                      style={{ "--accent": acc } as React.CSSProperties}
                      onClick={() => setZoomedCard(cardEntry)}
                    >
                      {/* image left */}
                      <div className="svc-card-img">
                        <img src={img.src} alt={img.label} loading={si === 0 && ii === 0 ? "eager" : "lazy"} />
                        <div className="svc-card-num">{String(ii + 1).padStart(2, "0")}</div>
                      </div>

                      {/* text right */}
                      <div className="svc-card-body">
                        <div className="svc-card-eyebrow" style={{ "--accent": acc } as React.CSSProperties}>
                          {img.label}
                        </div>
                        <div className="svc-card-title">{itemTitle}</div>
                        {detail && <div className="svc-card-desc">{detail}</div>}
                      </div>

                      {/* arrow */}
                      <div className="svc-card-arrow" style={{ "--accent": acc } as React.CSSProperties}>
                        ↗
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox card={zoomedCard} onClose={() => setZoomedCard(null)} />
    </>
  );
}

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Jarvis Technolabs" },
      { name: "description", content: "Build, scale and modernise apps with our services." },
      { property: "og:title", content: "Services — Jarvis Technolabs" },
      { property: "og:description", content: "A powerhouse of innovation, design and transformation." },
    ],
  }),
});

function ServicesPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav />
      <VideoHero />
      <ServicesScrollSection />
    </main>
  );
}