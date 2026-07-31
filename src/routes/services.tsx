import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";
import { useEffect, useRef, useState } from "react";
import dataAiImg from "@/assets/service-data-ai.jpg";
import digitalImg from "@/assets/service-digital.jpg";
import productImg from "@/assets/service-product.jpg";
import appImg from "@/assets/service-app.jpg";
import uiuxImg from "@/assets/service-uiux.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import growthImg from "@/assets/service-growth.jpg";
import managedImg from "@/assets/service-managed.jpg";

const PANEL_ACCENT = [
  "var(--color-primary)", "var(--color-primary)", "var(--color-primary)",
  "var(--color-primary)", "var(--color-primary)", "var(--color-primary)",
  "var(--color-primary)", "var(--color-primary)",
];

// ─── data (fully preserved — same categories and sub-categories, untouched) ──
const SERVICE_GROUPS = [
  {
    title: "Artificial Intelligence",
    titleTop: "ARTIFICIAL",
    titleBtm: "Intelligence",
    image: dataAiImg,
    eyebrow: "Neural Command Layer",
    tagline: "Move from AI that talks to AI that acts. A focused set of systems for building, deploying and operating production-grade intelligence.",
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
    titleTop: "DIGITAL",
    titleBtm: "Transformation",
    image: digitalImg,
    eyebrow: "Enterprise Singularity",
    tagline: "Reclaim your digital destiny. Transform legacy chaos into a self-evolving operating model.",
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
    titleTop: "PRODUCT",
    titleBtm: "Engineering",
    image: productImg,
    eyebrow: "Precision Build Matrix",
    tagline: "Forge the impossible with future-fit engineering built for infinite scale.",
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
    titleTop: "APPLICATION",
    titleBtm: "Transformation",
    image: appImg,
    eyebrow: "Omniscreen Deployment",
    tagline: "High-velocity platforms engineered for a real-time, always-connected world.",
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
    titleTop: "UI / UX",
    titleBtm: "Design",
    image: uiuxImg,
    eyebrow: "Neuro-Experience Design",
    tagline: "Interfaces that sense human intent and feel inevitable, from first click to last.",
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
    titleTop: "STRATEGIC",
    titleBtm: "Consulting",
    image: consultingImg,
    eyebrow: "Strategic Foresight Engine",
    tagline: "Turn technical complexity into unvarnished business clarity, before you build.",
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
    titleTop: "PERFORMANCE",
    titleBtm: "& Growth",
    image: growthImg,
    eyebrow: "Perpetual Optimisation Loop",
    tagline: "Stop chasing vanity metrics; start commanding results that compound.",
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
    titleTop: "AUTONOMOUS",
    titleBtm: "Ops",
    image: managedImg,
    eyebrow: "Autonomous Operations Grid",
    tagline: "The self-healing backbone for your digital core, watched around the clock.",
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

function parseItem(raw: string) {
  const c = raw.indexOf(":");
  return {
    title: c > -1 ? raw.slice(0, c).trim() : raw,
    detail: c > -1 ? raw.slice(c + 1).trim() : "",
  };
}

// ─── STYLES — devx labs "blogs" editorial direction ──────────────────────────
const STYLES = `
 

.svc-page{
  --bg:      var(--color-background);
  --surface: var(--color-card);
  --surface-strong: var(--color-muted);
  --card:    var(--color-card);
  --ink:     var(--color-foreground);
  --ink-dim: var(--color-muted-foreground);
  --ink-faint: color-mix(in oklch, var(--color-muted-foreground) 75%, transparent);
  --line:    var(--color-border);
  --acc:     var(--color-primary);
  --acc-fg:  var(--color-primary-foreground);
}

@keyframes svhIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ══ EDITORIAL HERO ══ */
.svh-hero{
  padding:clamp(150px,20vh,210px) 0 0;
  background:
    radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
    var(--bg);
  font-family:var(--font-sans);
  border-bottom:1px solid var(--line);
}
.svh-inner{ max-width:1180px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }
.svh-eyebrow{
  font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-weight:700;
  color:var(--acc); margin-bottom:22px;
  animation:svhIn .6s cubic-bezier(.16,1,.3,1) both;
  display:flex; align-items:center; gap:10px;
}
.svh-eyebrow::before{
  content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0;
}
.svh-title{
  font-family:var(--font-display); font-weight:800; letter-spacing:-.02em;
  font-size:clamp(3rem,9vw,7rem); line-height:.92; color:var(--ink);
  margin-bottom:28px; text-transform:uppercase;
  animation:svhIn .7s .08s cubic-bezier(.16,1,.3,1) both;
}
.svh-title em{ font-style:italic; font-weight:300; color:var(--acc); text-transform:none; font-family:Georgia,serif; }
.svh-sub{
  font-size:clamp(1rem,1.4vw,1.15rem); color:var(--ink-dim); line-height:1.75;
  max-width:600px; margin-bottom:44px;
  animation:svhIn .7s .16s cubic-bezier(.16,1,.3,1) both;
}
.svh-ctas{
  display:flex; flex-wrap:wrap; gap:14px; margin-bottom:56px;
  animation:svhIn .7s .22s cubic-bezier(.16,1,.3,1) both;
}
.svh-cta-primary{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--acc); color:var(--acc-fg);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:15px 28px;border-radius:999px;
  transition:transform .25s ease, box-shadow .25s ease;
  box-shadow:0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
}
.svh-cta-primary:hover{ transform:translateY(-2px); }
.svh-cta-secondary{
  display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--line); color:var(--ink);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:15px 28px;border-radius:999px;
  background:transparent; cursor:pointer;
  transition:border-color .25s ease, color .25s ease;
}
.svh-cta-secondary:hover{ border-color:var(--acc); color:var(--acc); }

.svh-ticker{
  overflow:hidden;
  border-top:1px solid var(--line);
  background:var(--surface);
  animation:svhIn .7s .3s cubic-bezier(.16,1,.3,1) both;
}
.svh-ticker-track{
  display:flex; width:max-content;
  animation:tickerScroll 32s linear infinite;
}
.svh-ticker-item{
  display:flex; align-items:center; gap:14px;
  padding:16px 32px; white-space:nowrap;
  font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; font-weight:600;
  color:var(--ink-dim); font-family:var(--font-sans);
  border-right:1px solid var(--line);
}
.svh-ticker-item strong{ color:var(--ink); font-weight:800; }
.svh-ticker-item .dot{ color:var(--acc); }

/* ══ FEATURED (cover-story) SERVICE PANEL ══ */
.svl-section{
  background:var(--bg);
  padding:clamp(64px,8vh,100px) 0 clamp(90px,10vh,130px);
  font-family:var(--font-sans);
}
.svl-inner{ max-width:1180px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }
.svl-header{ margin-bottom:clamp(36px,5vh,52px); display:flex; align-items:flex-end; justify-content:space-between; gap:24px; flex-wrap:wrap; }
.svl-header-eyebrow{
  font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-weight:700;
  color:var(--acc); margin-bottom:14px;
}
.svl-header-title{
  font-family:var(--font-display); font-weight:800; letter-spacing:-.015em;
  font-size:clamp(1.8rem,3.4vw,2.7rem); line-height:1.08; color:var(--ink);
  text-transform:uppercase;
}
.svl-header-title em{ font-style:italic; font-weight:300; color:var(--acc); text-transform:none; font-family:Georgia,serif; }
.svl-header-count{
  font-family:var(--font-display); font-size:13px; letter-spacing:.1em; color:var(--ink-faint);
  white-space:nowrap; padding-bottom:6px;
}

@keyframes svlFeatIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
.svl-featured{
  display:grid; grid-template-columns:1.1fr 1fr; gap:0;
  border:1px solid var(--line); border-radius:24px; overflow:hidden;
  background:var(--surface); margin-bottom:56px;
  animation:svlFeatIn .5s cubic-bezier(.16,1,.3,1) both;
}
.svl-feat-media{ position:relative; min-height:360px; overflow:hidden; }
.svl-feat-media img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.svl-feat-media::after{
  content:""; position:absolute; inset:0;
  background:linear-gradient(to top, color-mix(in oklch, var(--ink) 55%, transparent) 0%, transparent 55%);
}
.svl-feat-tag{
  position:absolute; top:20px; left:20px;
  font-size:9px; letter-spacing:.25em; text-transform:uppercase; font-weight:700;
  color:#fff; background:color-mix(in oklch, var(--acc) 85%, black 10%);
  padding:7px 14px; border-radius:999px; z-index:1;
}
.svl-feat-num{
  position:absolute; bottom:20px; left:20px; z-index:1;
  font-family:var(--font-display); font-size:13px; font-weight:700; color:#fff;
  letter-spacing:.15em;
}
.svl-feat-body{ padding:clamp(32px,3.6vw,48px); display:flex; flex-direction:column; }
.svl-feat-eyebrow{
  font-size:10px;letter-spacing:.28em;text-transform:uppercase;font-weight:700;
  color:var(--acc); margin-bottom:14px;
}
.svl-feat-title{
  font-family:var(--font-display); font-weight:800; letter-spacing:-.015em;
  font-size:clamp(1.6rem,2.8vw,2.3rem); color:var(--ink); line-height:1.12; margin-bottom:16px;
  text-transform:uppercase;
}
.svl-feat-tagline{ font-size:.96rem; color:var(--ink-dim); line-height:1.8; margin-bottom:26px; }
.svl-feat-stat{
  display:inline-flex; align-items:baseline; gap:10px;
  padding:16px 0 26px; border-bottom:1px solid var(--line); margin-bottom:26px;
}
.svl-feat-stat-val{ font-family:var(--font-display); font-weight:800; font-size:1.9rem; color:var(--acc); line-height:1; }
.svl-feat-stat-lbl{ font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }

.svl-offerings-label, .svl-caps-label{
  font-size:9.5px; letter-spacing:.24em; text-transform:uppercase; font-weight:700;
  color:var(--ink-faint); margin-bottom:14px;
}
.svl-offerings{ list-style:none; margin-bottom:28px; display:grid; gap:10px; }
.svl-offerings li{ font-size:.9rem; color:var(--ink-dim); line-height:1.6; padding-left:18px; position:relative; }
.svl-offerings li::before{
  content:""; position:absolute; left:0; top:.55em; width:6px; height:6px; border-radius:50%;
  background:var(--acc);
}
.svl-offerings li strong{ color:var(--ink); font-weight:600; }

.svl-caps-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(88px,1fr)); gap:10px; margin-top:auto; }
.svl-cap-thumb{
  position:relative; aspect-ratio:1/1; border-radius:10px; overflow:hidden;
  border:1px solid var(--line); background:var(--card); cursor:pointer; padding:0;
}
.svl-cap-thumb img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
.svl-cap-thumb:hover img{ transform:scale(1.08); }
.svl-cap-thumb span{
  position:absolute; left:0; right:0; bottom:0; padding:7px 9px;
  font-size:9px; letter-spacing:.06em; text-transform:uppercase; font-weight:600; color:#fff;
  background:linear-gradient(to top, rgba(0,0,0,.72), transparent);
}

/* ══ SERVICE GRID (blog-card style — image, tag, title, arrow) ══ */
.svl-grid-label{
  font-size:9.5px; letter-spacing:.24em; text-transform:uppercase; font-weight:700;
  color:var(--ink-faint); margin-bottom:22px;
}
.svl-card-grid{
  display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:24px;
}
@keyframes svlCardIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.svl-card{
  display:flex; flex-direction:column; text-align:left;
  background:var(--surface); border:1px solid var(--line); border-radius:18px;
  overflow:hidden; cursor:pointer; padding:0;
  transition:border-color .3s ease, transform .3s ease, box-shadow .3s ease;
  opacity:0; transform:translateY(20px);
  animation:svlCardIn .6s cubic-bezier(.16,1,.3,1) both;
}
.svl-card:hover{
  border-color:color-mix(in oklch, var(--acc) 45%, var(--line));
  transform:translateY(-4px);
  box-shadow:0 24px 48px -24px color-mix(in oklch, var(--acc) 25%, transparent);
}
.svl-card.active{ border-color:var(--acc); }
.svl-card-media{ position:relative; aspect-ratio:16/10; overflow:hidden; }
.svl-card-media img{ width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.22,1,.36,1); }
.svl-card:hover .svl-card-media img{ transform:scale(1.06); }
.svl-card-num{
  position:absolute; top:12px; left:12px;
  font-family:var(--font-display); font-size:11px; font-weight:700; color:#fff;
  background:rgba(0,0,0,.45); backdrop-filter:blur(6px);
  border-radius:999px; padding:4px 10px; letter-spacing:.1em;
}
.svl-card-body{ padding:20px 20px 22px; display:flex; flex-direction:column; gap:8px; flex:1; }
.svl-card-tag{
  font-size:9px; letter-spacing:.18em; text-transform:uppercase; font-weight:700;
  color:var(--acc);
}
.svl-card-title{
  font-family:var(--font-display); font-weight:700; font-size:1.02rem; color:var(--ink);
  line-height:1.25; letter-spacing:-.005em;
}
.svl-card-tagline{ font-size:.82rem; color:var(--ink-dim); line-height:1.55; flex:1; }
.svl-card-arrow{
  display:inline-flex; align-items:center; gap:6px; margin-top:6px;
  font-size:10px; letter-spacing:.15em; text-transform:uppercase; font-weight:600; color:var(--acc);
}

/* ── Lightbox ── */
@keyframes overlayIn{from{opacity:0}to{opacity:1}}
@keyframes zoomIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
.lb-overlay{position:fixed;inset:0;z-index:9999;background:rgba(10,10,10,.82);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;animation:overlayIn .22s ease both;cursor:zoom-out}
.lb-box{position:relative;width:min(820px,92vw);border-radius:20px;overflow:hidden;border:1px solid color-mix(in oklch, var(--acc) 16%, transparent);box-shadow:0 40px 140px rgba(0,0,0,.35);animation:zoomIn .3s cubic-bezier(.16,1,.3,1) both;cursor:default;background:var(--card)}
.lb-img{width:100%;height:320px;object-fit:cover;display:block}
.lb-body{padding:28px 36px 34px;display:flex;flex-direction:column;gap:12px;font-family:var(--font-sans)}
.lb-eyebrow{font-size:9px;letter-spacing:.3em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:9px;color:var(--acc)}
.lb-title{font-family:var(--font-sans);font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:900;color:var(--ink);line-height:1.1;text-transform:uppercase}
.lb-rule{height:1px;opacity:.18;border:none;background:linear-gradient(to right,transparent,var(--ink),transparent)}
.lb-desc{font-size:.95rem;color:var(--ink-dim);line-height:1.8}
.lb-close{position:absolute;top:14px;right:14px;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease;z-index:10}
.lb-close:hover{background:rgba(255,255,255,.14);color:#fff}

@media(max-width:900px){
  .svl-featured{ grid-template-columns:1fr; }
  .svl-feat-media{ min-height:240px; }
}
@media(max-width:640px){
  .svh-ticker-item{ padding:14px 22px; font-size:9.5px; }
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important}
}
`;

type LBItem = { src: string; label: string; title: string; detail: string; acc: string; svcTitle: string };

function Lightbox({ item, onClose }: { item: LBItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-box" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose}>✕</button>
        <img className="lb-img" src={item.src} alt={item.label} />
        <div className="lb-body">
          <div className="lb-eyebrow" style={{ color: item.acc }}>
            {item.svcTitle}<span style={{ opacity: .35, margin: "0 6px" }}>/</span>{item.label}
          </div>
          <div className="lb-title">{item.title}</div>
          <hr className="lb-rule" style={{ background: item.acc }} />
          {item.detail && <p className="lb-desc">{item.detail}</p>}
        </div>
      </div>
    </div>
  );
}

function ServicesHero() {
  const scrollToList = () => {
    document.getElementById("services-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const tickerItems = [
    <>8 <strong>Disciplines</strong></>,
    <>30+ <strong>Sub-Capabilities</strong></>,
    <>AI-Accelerated <strong>Delivery</strong></>,
    <>Est. <strong>2018</strong></>,
  ];

  return (
    <section className="svh-hero">
      <div className="svh-inner">
        <p className="svh-eyebrow">Full-Stack, AI-Native Delivery</p>
        <h1 className="svh-title">
          The Full Stack.
          <br />
          <em>Built to last.</em>
        </h1>
        <p className="svh-sub">
          Web, mobile, AI, design and infrastructure — engineered under one AI-native roof,
          with a senior human owning every decision that matters.
        </p>
        <div className="svh-ctas">
          <Link to="/contact" className="svh-cta-primary">
            Let's Talk <span>→</span>
          </Link>
          <button type="button" onClick={scrollToList} className="svh-cta-secondary">
            See our services
          </button>
        </div>
      </div>

      <div className="svh-ticker">
        <div className="svh-ticker-track">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((it, i) => (
            <span key={i} className="svh-ticker-item">
              {it} <span className="dot">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesEditorial({ onCardClick }: { onCardClick: (item: LBItem) => void }) {
  const [active, setActive] = useState(0);
  const svc = SERVICE_GROUPS[active];
  const acc = PANEL_ACCENT[active];

  return (
    <section id="services-list" className="svl-section">
      <div className="svl-inner">
        <div className="svl-header">
          <div>
            <p className="svl-header-eyebrow">Featured</p>
            <h2 className="svl-header-title">
              Every discipline,
              <br />
              <em>AI-accelerated.</em>
            </h2>
          </div>
          <span className="svl-header-count">
            {String(active + 1).padStart(2, "0")} / {String(SERVICE_GROUPS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="svl-featured" style={{ ["--acc" as string]: acc }} key={svc.title}>
          <div className="svl-feat-media">
            <img src={svc.image} alt={svc.title} />
            <span className="svl-feat-tag">{svc.eyebrow}</span>
            <span className="svl-feat-num">{String(active + 1).padStart(2, "0")} / {String(SERVICE_GROUPS.length).padStart(2, "0")}</span>
          </div>

          <div className="svl-feat-body">
            <p className="svl-feat-eyebrow">{svc.eyebrow}</p>
            <h3 className="svl-feat-title">{svc.title}</h3>
            <p className="svl-feat-tagline">{svc.tagline}</p>

            <div className="svl-feat-stat">
              <span className="svl-feat-stat-val">{svc.stat.value}</span>
              <span className="svl-feat-stat-lbl">{svc.stat.label}</span>
            </div>

            <p className="svl-offerings-label">Offerings</p>
            <ul className="svl-offerings">
              {svc.items.map((raw) => {
                const { title, detail } = parseItem(raw);
                return (
                  <li key={title}>
                    <strong>{title}</strong>
                    {detail ? `: ${detail}` : ""}
                  </li>
                );
              })}
            </ul>

            <p className="svl-caps-label">Capabilities</p>
            <div className="svl-caps-grid">
              {svc.subImages.map((img) => (
                <button
                  key={img.label}
                  type="button"
                  className="svl-cap-thumb"
                  onClick={() => {
                    const { title, detail } = parseItem(
                      svc.items[svc.subImages.indexOf(img)] ?? ""
                    );
                    onCardClick({
                      src: img.src,
                      label: img.label,
                      title,
                      detail,
                      acc,
                      svcTitle: svc.title,
                    });
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = svc.image as unknown as string; }}
                  />
                  <span>{img.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="svl-grid-label">All Services</p>
        <div className="svl-card-grid">
          {SERVICE_GROUPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className={`svl-card${i === active ? " active" : ""}`}
              style={{ animationDelay: `${(i % 8) * 0.06}s` }}
              onClick={() => {
                setActive(i);
                document.getElementById("services-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              <div className="svl-card-media">
                <img src={s.image} alt={s.title} loading="lazy" />
                <span className="svl-card-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="svl-card-body">
                <span className="svl-card-tag">{s.eyebrow}</span>
                <h4 className="svl-card-title">{s.title}</h4>
                <p className="svl-card-tagline">{s.tagline}</p>
                <span className="svl-card-arrow">Explore →</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [lightboxItem, setLightboxItem] = useState<LBItem | null>(null);

  return (
    <>
      <ServicesEditorial onCardClick={setLightboxItem} />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
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
  const { theme, toggleTheme } = useThemeInit();

  return (
    <main className="svc-page bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <ServicesHero />
      <ServicesSection />
      <Footer theme={theme} />
    </main>
  );
}