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
import heroVideoSrc from "@/assets/hero-video.mp4";

// ── Alternating panel backgrounds: black → dark-grey → orange-tint ────────────
const PANEL_BG = [
  "#0a0a0a",          // 1 — deep black
  "#141414",          // 2 — dark grey
  "#120a00",          // 3 — dark orange tint
  "#0a0a0a",          // 4 — deep black
  "#141414",          // 5 — dark grey
  "#120a00",          // 6 — dark orange tint
  "#0a0a0a",          // 7 — deep black
  "#141414",          // 8 — dark grey
];

// Matching accent colours per panel
const PANEL_ACCENT = [
  "rgb(255,130,50)",          // black → full orange
  "rgb(180,180,180)",         // grey  → light grey accent
  "rgb(255,160,60)",          // orange tint → brighter orange
  "rgb(255,130,50)",
  "rgb(180,180,180)",
  "rgb(255,160,60)",
  "rgb(255,130,50)",
  "rgb(180,180,180)",
];

const PANEL_NUM_COLOR = [
  "rgba(255,130,50,0.10)",
  "rgba(255,255,255,0.06)",
  "rgba(255,160,60,0.13)",
  "rgba(255,130,50,0.10)",
  "rgba(255,255,255,0.06)",
  "rgba(255,160,60,0.13)",
  "rgba(255,130,50,0.10)",
  "rgba(255,255,255,0.06)",
];

// ─── Data ─────────────────────────────────────────────────────────────────────
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
      { src: "/AI1.png", label: "Design Forge" },
      { src: "/AI2.png", label: "Scale Logic" },
      { src: "/AI3.png", label: "Velocity" },
      { src: "/AI4.png", label: "Resource" },
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
      { src: "/AI1.png", label: "Web Logic" },
      { src: "/AI2.png", label: "Mobile Core" },
      { src: "/AI3.png", label: "Foundation" },
      { src: "/AI4.png", label: "Integration" },
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
      { src: "/AI1.png", label: "Research" },
      { src: "/AI2.png", label: "Craft" },
      { src: "/AI3.png", label: "Strategy" },
      { src: "/AI4.png", label: "Squads" },
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
      { src: "/AI1.png", label: "Strategic Core" },
      { src: "/AI2.png", label: "Plan Forge" },
      { src: "/AI3.png", label: "Milestones" },
      { src: "/AI4.png", label: "CX Strategy" },
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
      { src: "/AI1.png", label: "Engines" },
      { src: "/AI2.png", label: "Intelligence" },
      { src: "/AI3.png", label: "Clarity" },
      { src: "/AI4.png", label: "Dashboards" },
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
      { src: "/AI1.png", label: "Reliability" },
      { src: "/AI2.png", label: "Security" },
      { src: "/AI3.png", label: "Evolution" },
      { src: "/AI4.png", label: "Strategic Support" },
    ],
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
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

  /* Enter animations — applied via .panel-entered class */
  @keyframes titleIn {
    from { opacity: 0; transform: translateX(-60px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes imgRise {
    from { opacity: 0; transform: translateY(60px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes numIn {
    from { opacity: 0; transform: translateX(40px) scale(0.8); }
    to   { opacity: 1; transform: translateX(0) scale(1); }
  }

  /* Hidden by default */
  .p-title   { opacity: 0; }
  .p-img-0   { opacity: 0; }
  .p-img-1   { opacity: 0; }
  .p-img-2   { opacity: 0; }
  .p-img-3   { opacity: 0; }
  .p-eyebrow { opacity: 0; }
  .p-tagline { opacity: 0; }
  .p-tags    { opacity: 0; }
  .p-bignum  { opacity: 0; }

  /* Fire when panel enters viewport */
  .panel-entered .p-title   { animation: titleIn 0.72s cubic-bezier(0.16,1,0.3,1) 0.02s both; }
  .panel-entered .p-img-0   { animation: imgRise  0.65s cubic-bezier(0.16,1,0.3,1) 0.08s both; }
  .panel-entered .p-img-1   { animation: imgRise  0.65s cubic-bezier(0.16,1,0.3,1) 0.18s both; }
  .panel-entered .p-img-2   { animation: imgRise  0.65s cubic-bezier(0.16,1,0.3,1) 0.28s both; }
  .panel-entered .p-img-3   { animation: imgRise  0.65s cubic-bezier(0.16,1,0.3,1) 0.38s both; }
  .panel-entered .p-eyebrow { animation: fadeUp   0.5s  cubic-bezier(0.16,1,0.3,1) 0.36s both; }
  .panel-entered .p-tagline { animation: fadeUp   0.5s  cubic-bezier(0.16,1,0.3,1) 0.46s both; }
  .panel-entered .p-tags    { animation: fadeUp   0.5s  cubic-bezier(0.16,1,0.3,1) 0.54s both; }
  .panel-entered .p-bignum  { animation: numIn    0.7s  cubic-bezier(0.16,1,0.3,1) 0.12s both; }

  /* Image cards */
  .svc-img-card {
    flex: 1;
    min-width: 0;
    position: relative;
    overflow: hidden;
    border-radius: 3px;
    background: #1a1a1a;
    cursor: pointer;
  }
  .svc-img-card img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .svc-img-card:hover img { transform: scale(1.07); }
  .svc-img-card::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1);
    z-index: 2;
  }
  .svc-img-card:hover::before { transform: scaleX(1); }
  .svc-img-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 44px 14px 10px;
    background: linear-gradient(to top, rgba(0,0,0,0.88), transparent);
    font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase;
    color: rgba(255,255,255,0.35);
    transition: color 0.2s;
    z-index: 1;
  }
  .svc-img-card:hover .svc-img-label { color: var(--accent); }

  /* Tag pills */
  .svc-tag {
    display: inline-block;
    font-size: 10.5px; letter-spacing: 0.03em;
    color: rgba(255,255,255,0.28);
    padding: 5px 12px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    transition: color 0.2s, border-color 0.2s, background 0.2s;
    cursor: default;
    white-space: nowrap;
  }
  .svc-tag:hover {
    color: var(--accent);
    border-color: var(--accent-faint);
    background: var(--accent-bg);
  }

  /* Dot nav */
  .svc-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    transition: all 0.25s;
    flex-shrink: 0;
  }
  .svc-dot.active {
    transform: scale(1.5);
  }
`;

// ─── Video Hero ────────────────────────────────────────────────────────────────
function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { videoRef.current?.play().catch(() => {}); }, []);

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#050403" }}>
      <video ref={videoRef} src={heroVideoSrc} autoPlay loop muted playsInline
        onCanPlay={() => setLoaded(true)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: loaded ? 0.45 : 0, filter: "saturate(0.6) brightness(0.6)", transition: "opacity 1.4s ease" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(5,4,3,.3) 0%,rgba(5,4,3,.05) 35%,rgba(5,4,3,.6) 70%,rgba(5,4,3,1) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(5,4,3,.55) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,110,30,.5),transparent)", animation: "scanLine 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "15%", bottom: "15%", left: 0, width: "2px", background: "linear-gradient(180deg,transparent,rgb(255,110,30) 30%,rgb(255,110,30) 70%,transparent)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(24px,5vw,80px) 72px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, animation: "heroIn .6s .3s both", opacity: 0 }}>
          <div style={{ width: 32, height: 1, background: "rgb(255,130,50)" }} />
          <span style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgb(255,130,50)", fontWeight: 400 }}>What We Do</span>
        </div>
        <h1 style={{ fontSize: "clamp(2.8rem,6vw,5.5rem)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.025em", color: "#f0e8df", marginBottom: 24, animation: "heroIn .7s .42s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          IMPACT <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgb(255,130,50)" }}>WITNESSED</em>
        </h1>
        <div style={{ position: "relative", height: 1, background: "rgba(255,255,255,.08)", marginBottom: 24, maxWidth: 480, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgb(255,130,50),rgba(255,180,80,.3))", animation: "lineExpand 1s .9s cubic-bezier(.4,0,.2,1) both", transformOrigin: "left" }} />
        </div>
        <div style={{ animation: "heroIn .6s .58s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          <p style={{ fontSize: "clamp(.9rem,1.3vw,1.05rem)", color: "rgba(240,232,220,.55)", lineHeight: 1.75, maxWidth: 560 }}>
            See your future in action. Explore the missions where we turned bold ambition into scalable reality. These global leaders didn't just build software — they used our intelligence layer to gain decision authority and command their markets.
          </p>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, animation: "heroIn .6s 1.1s both", opacity: 0 }}>
        <span style={{ fontSize: 8, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,.25)" }}>Scroll</span>
        <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom,rgba(255,130,50,.6),transparent)", animation: "scanLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── Single service panel ─────────────────────────────────────────────────────
function ServicePanel({
  g,
  index,
  total,
}: {
  g: (typeof SERVICE_GROUPS)[0];
  index: number;
  total: number;
}) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(index === 0);
  const enteredRef = useRef(index === 0);

  const bg     = PANEL_BG[index];
  const accent = PANEL_ACCENT[index];
  const numCol = PANEL_NUM_COLOR[index];
  const isLast = index === total - 1;

  // ── Intersection: fire enter animations once ──────────────────────────────
  useEffect(() => {
    if (enteredRef.current) return;
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          enteredRef.current = true;
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Scroll: clip-path wipe-out (T11 mechanic) ────────────────────────────
  useEffect(() => {
    const wrap  = wrapRef.current;
    const panel = panelRef.current;
    if (!wrap || !panel || isLast) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      // rect.top is 0 when sticky starts, goes negative as we scroll exit zone
      const progress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
      panel.style.clipPath = progress > 0
        ? `inset(${progress * 100}% 0 0 0)`
        : "inset(0% 0 0 0)";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isLast]);

  return (
    // 200vh wrapper: first 100vh = sticky visible, second 100vh = scroll-exit clip
    <div
      ref={wrapRef}
      style={{ height: isLast ? "100vh" : "200vh", position: "relative" }}
    >
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <div
          ref={panelRef}
          className={entered ? "panel-entered" : ""}
          style={{
            // CSS vars for accent colour — used in child CSS classes
            "--accent"      : accent,
            "--accent-faint": accent.replace("rgb", "rgba").replace(")", ",0.35)"),
            "--accent-bg"   : accent.replace("rgb", "rgba").replace(")", ",0.06)"),
            position        : "absolute",
            inset           : 0,
            background      : bg,
            display         : "flex",
            flexDirection   : "column",
            // Fixed padding — NO flex trickery on height, children are sized explicitly
            padding         : "clamp(56px,7vh,90px) clamp(24px,5vw,80px) 56px",
            gap             : "clamp(18px,2.8vh,32px)",
            overflow        : "hidden",
          } as React.CSSProperties}
        >
          {/* Subtle grid texture */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

          {/* Left accent bar */}
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: `linear-gradient(180deg,transparent,${accent} 20%,${accent} 80%,transparent)`, opacity: 0.65 }} />

          {/* ── 1. HUGE TITLE ── */}
          <h2
            className="p-title"
            style={{
              fontSize     : "clamp(2.6rem,8vw,7.5rem)",
              fontWeight   : 800,
              lineHeight   : 1,
              letterSpacing: "-0.035em",
              color        : "#f0e8df",
              flexShrink   : 0,
              position     : "relative",
              zIndex       : 1,
            }}
          >
            {g.title}
          </h2>

          {/* ── 2. FOUR IMAGES — fixed height, no overlap ── */}
          <div
            style={{
              display   : "flex",
              gap       : "clamp(6px,0.9vw,14px)",
              height    : "clamp(180px,26vh,295px)",    // explicit fixed height
              flexShrink: 0,
              position  : "relative",
              zIndex    : 1,
            }}
          >
            {g.subImages.map((si, idx) => (
              <div key={idx} className={`svc-img-card p-img-${idx}`}>
                <img src={si.src} alt={si.label} loading="lazy" />
                <div className="svc-img-label">{si.label}</div>
              </div>
            ))}
          </div>

          {/* ── 3. BOTTOM ROW — eyebrow + tagline + tags LEFT | (0N) RIGHT ── */}
          {/* Uses explicit sizing, not flex:1, to avoid any overlap */}
          <div
            style={{
              display        : "flex",
              alignItems     : "flex-end",
              justifyContent : "space-between",
              gap            : "clamp(20px,4vw,64px)",
              position       : "relative",
              zIndex         : 1,
              flexShrink     : 0,
            }}
          >
            {/* LEFT */}
            <div style={{ flex: 1, maxWidth: 560, display: "flex", flexDirection: "column", gap: 10 }}>

              {/* Eyebrow */}
              <p className="p-eyebrow" style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: accent, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <span style={{ display: "inline-block", width: 22, height: 1, background: accent, flexShrink: 0 }} />
                {g.eyebrow}
              </p>

              {/* Tagline */}
              <p className="p-tagline" style={{ fontSize: "clamp(.95rem,1.5vw,1.25rem)", fontWeight: 600, lineHeight: 1.5, color: "rgba(240,232,220,.82)", flexShrink: 0 }}>
                {g.tagline}
              </p>

              {/* Tag pills */}
              <div className="p-tags" style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {g.items.map((item, i) => (
                  <span key={i} className="svc-tag">{item}</span>
                ))}
              </div>
            </div>

            {/* RIGHT — big ghost number */}
            <div className="p-bignum" style={{ fontSize: "clamp(68px,10vw,138px)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em", color: numCol, userSelect: "none", flexShrink: 0, alignSelf: "flex-end" }}>
              ({String(index + 1).padStart(2, "0")})
            </div>
          </div>

          {/* ── Bottom bar ── */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 48,
            borderTop: "1px solid rgba(255,255,255,.07)",
            background: `${bg}e0`,
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "0 clamp(24px,5vw,80px)",
            zIndex: 10,
          }}>
            {/* Counter + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: accent }}>{String(index + 1).padStart(2, "0")}</span>
              <div style={{ width: 1, height: 14, background: "rgba(255,255,255,.12)" }} />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.20)", letterSpacing: "0.06em" }}>{String(total).padStart(2, "0")}</span>
              <div style={{ width: 1, height: 14, background: "rgba(255,255,255,.06)" }} />
              <span style={{ fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,.24)" }}>{g.title}</span>
            </div>

            {/* Progress bar */}
            <div style={{ flex: 1, maxWidth: 280, height: 1, background: "rgba(255,255,255,.08)", margin: "0 clamp(16px,3vw,40px)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${((index + 1) / total) * 100}%`, background: `linear-gradient(90deg,${accent},transparent)` }} />
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {SERVICE_GROUPS.map((_, di) => (
                <div
                  key={di}
                  className={`svc-dot${di === index ? " active" : ""}`}
                  style={{ background: di === index ? accent : "rgba(255,255,255,.18)" }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Services section ─────────────────────────────────────────────────────────
function ServicesScrollSection() {
  return (
    <section>
      {SERVICE_GROUPS.map((g, i) => (
        <ServicePanel key={g.title} g={g} index={i} total={SERVICE_GROUPS.length} />
      ))}
    </section>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Jarvis Technolabs" },
      { name: "description", content: "Build, scale and modernise apps with our services." },
      { property: "og:title", content: "Services — Jarvis Technolabs" },
      { property: "og:description", content: "A powerhouse of innovation, design and transformation fueled by disruptive technologies and agility." },
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