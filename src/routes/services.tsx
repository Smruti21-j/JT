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
import servicesImage from "@/assets/servicesimage.png";
import { ScrollToTop } from "@/components/site/ScrollToTop";

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
    stat: { value: null, label: null },
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
    stat: { value:  null, label:  null },
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
    stat: { value: null, label: null },
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
    stat: { value: null, label: null },
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
    stat: { value: null, label: null },
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
    stat: { value:  null, label:  null },
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
    stat: { value: null, label: null },
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
    stat: { value: null, label: null },
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

// ─── STYLES ───────────────────────────────────────────────────────────────
//
// TYPOGRAPHY ALIGNED TO index.tsx:
// - All eyebrow/label text (.svh-eyebrow, .svl-left-eyebrow, .svr-intro-eyebrow,
//   .lb-eyebrow) now matches the home page's font-mono eyebrows exactly:
//   font-family var(--font-mono), 10px, letter-spacing .3em, uppercase,
//   font-weight 400 (was a mix of 700-weight sans and inconsistent sizing).
// - The hero H1 (.svh-title) no longer hardcodes its own font-family/size/
//   weight/uppercase here — it now also carries the shared "section-title"
//   class in JSX (same class every H2 on the home page uses), so it will
//   always track whatever the home page's headings look like. Only
//   layout-specific rules (margin, animation) stay in this local class.
// - Italic accent lines (the second line of every big heading) now match the
//   home page's convention exactly: className="font-mono", italic,
//   font-weight 400, color var(--acc) — replacing the old Georgia-serif
//   fallback that didn't match the home page's display font at all.
// - Intro/body paragraphs (.svh-sub, .svr-intro-tagline, .svl-left-desc,
//   .lb-desc) are now all a flat 15px / line-height 1.75, matching the
//   fixed 15px paragraphs used under every heading on the home page (they
//   were previously a clamp()'d, slightly larger, non-matching scale).
// - Sub-category cards (.svr-card) are now VERTICAL boxes — image full-width
//   on top, text below in a fixed-width column — the same shape as the
//   "How you plug us in" tiles (.eng-tile) on the home page, laid out in a
//   responsive grid (.svr-list) instead of a single-column vertical stack.
//   Title/description font sizes now match those tiles exactly (19px/800
//   title, 13px/1.65 description) instead of the old font-display serif.
// ─────────────────────────────────────────────────────────────────────────
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
.svh-hero{
    position: relative;
    overflow: hidden;
}

.svh-inner{
    position: relative;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 clamp(20px,4vw,48px);
}

.svh-hero-image{
    position:absolute;
    right:0;
    top:50%;
    transform:translateY(-50%);
    width:min(42vw,700px);
    pointer-events:none;
    z-index:1;
}

.svh-hero-image img{
    width:100%;
    height:auto;
    display:block;
}

.svh-inner > *:not(.svh-hero-image){
    position:relative;
    z-index:2;
}

@media (max-width: 992px){

    .svh-hero-image{
        position:relative;
        width:100%;
        max-width:500px;
        margin:40px auto 0;
        top:auto;
        right:auto;
        transform:none;
    }

}

/* ══ EDITORIAL HERO ══ */
.svh-hero{
  padding:clamp(150px,20vh,210px) 0 0;
  background:
    radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
    var(--bg);
  font-family:var(--font-sans);
  border-bottom:1px solid var(--line);
}
.svh-inner{ max-width:1600px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }
.svh-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--ink-faint); margin-bottom:22px;
  animation:svhIn .6s cubic-bezier(.16,1,.3,1) both;
  display:flex; align-items:center; gap:10px;
}
.svh-eyebrow::before{
  content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0;
}
.svh-title{
  margin-bottom:28px;
  animation:svhIn .7s .08s cubic-bezier(.16,1,.3,1) both;
}
.svh-sub{
  font-size:15px; color:var(--ink-dim); line-height:1.75;
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

/* ══ SERVICES: left category nav + right stacked numbered cards ══ */
.svl-section{
  background:var(--bg);
  padding:clamp(64px,8vh,100px) 0 clamp(90px,10vh,130px);
  font-family:var(--font-sans);
}
.svl-inner{ max-width:1600px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }

.svl-layout{
  display:grid;
  grid-template-columns:300px 1fr;
  gap:56px;
  align-items:start;
}

/* ── Left: sticky intro + category nav ── */
.svl-left{
  position:sticky;
  top:110px;
}
.svl-left-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--ink-faint); margin-bottom:20px;
}
@keyframes svlActiveIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.svl-active{ animation:svlActiveIn .4s cubic-bezier(.16,1,.3,1) both; }
.svl-active-num{
  display:block; font-family:var(--font-display); font-weight:800; font-size:2.4rem;
  color:var(--acc); line-height:1; margin-bottom:12px;
}
.svl-left-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.7rem,2.6vw,2.3rem); line-height:1.08; color:var(--ink);
  margin-bottom:16px;
}
.svl-left-desc{
  font-size:15px; color:var(--ink-dim); line-height:1.75; margin-bottom:20px;
}
.svr-group{ margin-bottom:56px; }
.svr-group:last-child{ margin-bottom:0; }

/* ── Right: category intro strip + stacked numbered cards ── */
@keyframes svrIntroIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.svr-intro{
  padding-bottom:28px; margin-bottom:28px; border-bottom:1px solid var(--line);
  animation:svrIntroIn .4s cubic-bezier(.16,1,.3,1) both;
}
.svr-intro-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--acc); margin-bottom:10px;
}
.svr-intro-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.4rem,2.2vw,1.9rem); color:var(--ink); line-height:1.15; margin-bottom:10px;
}
.svr-intro-tagline{ font-size:15px; color:var(--ink-dim); line-height:1.75; max-width:640px; margin-bottom:16px; }
.svr-intro-stat{ display:inline-flex; align-items:baseline; gap:9px; }
.svr-intro-stat-val{ font-family:var(--font-display); font-weight:800; font-size:1.4rem; color:var(--acc); line-height:1; }
.svr-intro-stat-lbl{ font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); }

@keyframes svrCardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}

/* Grid of vertical boxes — image full-width on top, text below in a fixed
   column width, matching the home page's .eng-tile "How you plug us in"
   cards. This is what makes the description wrap onto multiple lines
   instead of stretching out as one long line: the text now lives in a
   constrained column instead of an unbounded flex-row remainder. */
.svr-list{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));
  gap:20px;
}
.svr-card{
  display:flex; flex-direction:column; align-items:stretch;
  background:var(--surface); border:1.5px solid color-mix(in oklch, var(--acc) 28%, var(--line)); border-radius:20px;
  overflow:hidden; padding:0; cursor:pointer; text-align:left;
  transition:border-color .3s ease, transform .3s ease, box-shadow .3s ease;
  opacity:0; transform:translateY(18px);
  animation:svrCardIn .55s cubic-bezier(.16,1,.3,1) both;
}
.svr-card:hover{
  border-color:color-mix(in oklch, var(--acc) 45%, var(--line));
  transform:translateY(-4px);
  box-shadow:0 22px 44px -26px color-mix(in oklch, var(--acc) 25%, transparent);
}
.svr-card-media{ position:relative; width:100%; aspect-ratio:16/10; overflow:hidden; }
.svr-card-media img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .6s cubic-bezier(.22,1,.36,1); }
.svr-card:hover .svr-card-media img{ transform:scale(1.07); }
.svr-card-num{
  position:absolute; left:14px; bottom:14px;
  font-family:var(--font-display); font-weight:800; font-size:1.6rem; color:#fff;
  line-height:1; text-shadow:0 2px 10px rgba(0,0,0,.35);
}
.svr-card-body{ flex:1; padding:22px 22px 26px; display:flex; flex-direction:column; justify-content:flex-start; gap:8px; min-width:0; }
.svr-card-title{
  font-weight:800; font-size:19px; color:var(--ink);
  line-height:1.25; letter-spacing:-.005em; margin:0;
}
.svr-card-desc{ font-size:13px; color:var(--ink-dim); line-height:1.65; margin:0; }
.svr-card-btn{
  display:inline-flex; align-items:center; gap:7px; margin-top:8px; width:fit-content;
  font-size:9.5px; letter-spacing:.14em; text-transform:uppercase; font-weight:700;
  color:var(--acc); border:1px solid color-mix(in oklch, var(--acc) 40%, var(--line));
  border-radius:999px; padding:8px 16px;
  transition:background .25s ease, color .25s ease;
}
.svr-card:hover .svr-card-btn{ background:var(--acc); color:var(--acc-fg); border-color:var(--acc); }

/* ── Lightbox ── */
@keyframes overlayIn{from{opacity:0}to{opacity:1}}
@keyframes zoomIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
.lb-overlay{position:fixed;inset:0;z-index:9999;background:rgba(10,10,10,.82);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;animation:overlayIn .22s ease both;cursor:zoom-out}
.lb-box{position:relative;width:min(820px,92vw);border-radius:20px;overflow:hidden;border:1px solid color-mix(in oklch, var(--acc) 16%, transparent);box-shadow:0 40px 140px rgba(0,0,0,.35);animation:zoomIn .3s cubic-bezier(.16,1,.3,1) both;cursor:default;background:var(--card)}
.lb-img{width:100%;height:320px;object-fit:cover;display:block}
.lb-body{padding:28px 36px 34px;display:flex;flex-direction:column;gap:12px;font-family:var(--font-sans)}
.lb-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  display:flex;align-items:center;gap:9px;color:var(--acc)
}
.lb-title{font-family:var(--font-display);font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:800;color:var(--ink);line-height:1.1}
.lb-rule{height:1px;opacity:.18;border:none;background:linear-gradient(to right,transparent,var(--ink),transparent)}
.lb-desc{font-size:15px;color:var(--ink-dim);line-height:1.75}
.lb-close{position:absolute;top:14px;right:14px;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease;z-index:10}
.lb-close:hover{background:rgba(255,255,255,.14);color:#fff}

@media(max-width:900px){
  .svl-layout{ grid-template-columns:1fr; }
  .svl-left{ position:static; }
}
@media(max-width:560px){
  .svr-card-body{ padding:18px 18px 22px; }
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

  return (
   <section className="svh-hero">
  <div className="svh-inner">

    <div className="svh-hero-image">
      <img src={servicesImage} alt="Services Illustration" />
    </div>
        <p className="svh-eyebrow">Full-Stack, AI-Native Delivery</p>
        <h1 className="svh-title section-title">
          Impact
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
          Witnessed
          </em>
        </h1>
        <p className="svh-sub">
          See your future in action. Explore the missions where we turned bold ambition into a scalable reality. 
          These global leaders didn't just build software - they used our intelligence layer to gain decision authority 
          and command their markets.
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
    </section>
  );
}

// ─── Left category nav + right stacked numbered cards ───────────────────────
function ServicesEditorial({ onCardClick }: { onCardClick: (item: LBItem) => void }) {
  const [active, setActive] = useState(0);
  const groupRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    groupRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const svc = SERVICE_GROUPS[active];
  const acc = PANEL_ACCENT[active];

  return (
    <section id="services-list" className="svl-section">
      <div className="svl-inner">
        <div className="svl-layout">
          {/* ── LEFT: sticky, shows ONLY the currently active category ── */}
          <div className="svl-left" style={{ ["--acc" as string]: acc }}>
            <p className="svl-left-eyebrow">Our Services</p>
            <div key={svc.title} className="svl-active">
              <span className="svl-active-num">{String(active + 1).padStart(2, "0")}</span>
              <h2 className="svl-left-title">{svc.title}</h2>
              <p className="svl-left-desc">{svc.tagline}</p>
              <div className="svr-intro-stat">
                <span className="svr-intro-stat-val">{svc.stat.value}</span>
                <span className="svr-intro-stat-lbl">{svc.stat.label}</span>
              </div>
            </div>
            <div className="svl-progress">
              {SERVICE_GROUPS.map((_, i) => (
                <span key={i} className={`svl-progress-dot${i === active ? " active" : ""}`} />
              ))}
            </div>
          </div>

          {/* ── RIGHT: every category's cards, stacked one after another ── */}
          <div className="svl-right">
            {SERVICE_GROUPS.map((group, gi) => (
              <div
                key={group.title}
                ref={(el) => { groupRefs.current[gi] = el; }}
                className="svr-group"
                style={{ ["--acc" as string]: PANEL_ACCENT[gi] }}
              >
                <div className="svr-intro">
                  <p className="svr-intro-eyebrow">{group.eyebrow}</p>
                  <h3 className="svr-intro-title">{group.title}</h3>
                </div>

                <div className="svr-list">
                  {group.subImages.map((img, i) => {
                    const { title, detail } = parseItem(group.items[i] ?? "");
                    return (
                      <button
                        key={img.label}
                        type="button"
                        className="svr-card"
                        onClick={() =>
                          onCardClick({
                            src: img.src,
                            label: img.label,
                            title,
                            detail,
                            acc: PANEL_ACCENT[gi],
                            svcTitle: group.title,
                          })
                        }
                      >
                        <div className="svr-card-media">
                          <img
                            src={img.src}
                            alt={img.label}
                            loading="lazy"
                            onError={(e) => { (e.target as HTMLImageElement).src = group.image as unknown as string; }}
                          />
                          <span className="svr-card-num">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <div className="svr-card-body">
                          <h4 className="svr-card-title">{title || img.label}</h4>
                          {detail && (
  <div className="svr-card-desc">
    {detail.split(",").map((item, index) => (
      <div key={index}>{item.trim()}</div>
    ))}
  </div>
)}
                          <span className="svr-card-btn">See Details →</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
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
       <ScrollToTop />
    </main>
  );
}