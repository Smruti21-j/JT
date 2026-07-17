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

// ─── static assets ────────────────────────────────────────────────────────────
const CAROUSEL_IMAGES = [
  "/services-c1.png", "/services-c2.png", "/services-c3.png",
  "/services-c4.png", "/services-c5.png",
];

const PANEL_ACCENT = [
  "#FF8232", "#FF8232", "#FF8232",
  "#FF8232", "#FF8232", "#FF8232",
  "#FF8232", "#FF8232",
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

// ─── STYLES ───────────────────────────────────────────────────────────────────
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root{
  --bg:      #08090c;
  --surface: #10131a;
  --surface-strong: #141821;
  --card:    #131722;
  --ink:     #f7f7f8;
  --ink-dim: rgba(247,247,248,.68);
  --ink-faint: rgba(247,247,248,.45);
  --line:    rgba(255,130,50,.14);
  --acc:     #ff7a20;
}

/* ══ HERO — dark cinematic feel ══ */
@keyframes heroIn    {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes lineExp   {from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1)}}
@keyframes kenBurns  {0%{transform:scale(1) translate(0,0)}50%{transform:scale(1.06) translate(-1%,-0.8%)}100%{transform:scale(1) translate(0,0)}}
@keyframes pipFill   {from{width:0%}to{width:100%}}
@keyframes scanLine  {0%{top:-2px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0}}

.hs-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.8s cubic-bezier(.4,0,.2,1)}
.hs-slide.active{opacity:1}
.hs-slide .kb{position:absolute;inset:-4%;background-size:cover;background-position:center;filter:saturate(0.5) brightness(0.44);animation:kenBurns 24s ease-in-out infinite}
.hs-pip{height:3px;border-radius:2px;border:none;cursor:pointer;padding:0;flex-shrink:0;overflow:hidden;position:relative;transition:width .4s cubic-bezier(.16,1,.3,1)}
.hs-pip-fill{position:absolute;top:0;left:0;height:100%;border-radius:2px;background:var(--acc);animation:pipFill 4s linear forwards}

/* ══ SERVICES — dark structured sections ══ */
.svc-section{ background:radial-gradient(circle at top, rgba(255,122,32,.08) 0%, transparent 28%), linear-gradient(180deg,#0b0d12 0%,#090a0f 32%,#0d0f14 100%); padding:clamp(84px,10vh,128px) 0 clamp(48px,7vh,84px); position:relative; z-index:1; isolation:isolate; }

.svc-group{
  display:grid;
  grid-template-columns:minmax(250px,320px) 1fr;
  gap:clamp(32px,3.5vw,56px);
  align-items:start;
  padding:clamp(34px,5vh,64px) clamp(24px,4vw,64px);
  border:1px solid rgba(255,255,255,.05);
  border-radius:28px;
  background:rgba(12,14,19,.92);
  box-shadow:0 24px 120px rgba(0,0,0,.25);
}
.svc-group + .svc-group{ margin-top:28px; }

/* ── left pinned intro ── */
.svc-intro-col{ position:sticky; top:clamp(88px,10vh,120px); }
.svc-intro-icon{ display:flex; gap:4px; margin-bottom:18px; }
.svc-intro-icon span{ width:6px;height:18px;border-radius:999px; background:var(--acc); }
.svc-intro-eyebrow{
  font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-weight:700;
  color:var(--acc); display:flex; align-items:center; gap:8px; margin-bottom:18px;
}
.svc-intro-title{
  font-family:'Inter',sans-serif; font-weight:900; text-transform:uppercase;
  font-size:clamp(1.9rem,3.2vw,2.8rem); line-height:1.02; letter-spacing:-.02em;
  color:var(--ink); margin-bottom:18px;
}
.svc-intro-sub{
  font-size:.97rem; color:var(--ink-dim); line-height:1.8; max-width:360px; margin-bottom:24px;
}
.svc-intro-count{
  display:inline-flex; align-items:baseline; gap:10px;
  padding-top:16px; border-top:1px solid rgba(255,255,255,.08);
}
.svc-intro-count-num{ font-family:'Inter',sans-serif; font-weight:900; font-size:2rem; color:var(--acc); line-height:1; }
.svc-intro-count-lbl{ font-size:9px; letter-spacing:.22em; text-transform:uppercase; color:var(--ink-faint); }

/* ── right: stacked product-style cards ── */
.svc-list{ display:flex; flex-direction:column; gap:clamp(20px,2.2vw,28px); }

.pr-row{
  display:grid;
  grid-template-columns:minmax(240px,34%) 1fr;
  background:rgba(14,16,22,.96);
  border:1px solid rgba(255,255,255,.08);
  border-radius:22px;
  overflow:hidden;
  box-shadow:0 24px 40px rgba(0,0,0,.22);
  opacity:0;
  transform:translateY(36px);
  transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1),
             box-shadow .3s ease, transform .3s ease;
}
.pr-row.visible{opacity:1;transform:none}
.pr-row:hover{ box-shadow:0 32px 80px rgba(0,0,0,.28); }

.pr-img{
  position:relative;
  min-height:clamp(220px,24vw,310px);
  overflow:hidden;
}
.pr-img img{
  position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  filter:saturate(1.05) brightness(0.9);
  transform:scale(1.04);
  transition:transform .8s cubic-bezier(.4,0,.2,1);
}
.pr-row:hover .pr-img img{ transform:scale(1.09); }
.pr-img-scrim{
  position:absolute; left:0; right:0; bottom:0; height:56%;
  background:linear-gradient(180deg, transparent 0%, rgba(255,122,32,.94) 92%);
  opacity:.78;
  pointer-events:none;
}
.pr-num{
  position:absolute;left:20px;bottom:18px;z-index:2;
  font-family:'Inter',sans-serif;font-weight:900;
  font-size:clamp(2.2rem,3.4vw,3.2rem);line-height:1;
  color:#fff;letter-spacing:-.04em;
}

.pr-content{
  padding:clamp(24px,3vw,34px) clamp(24px,3.2vw,36px);
  display:flex;flex-direction:column;justify-content:center;gap:14px;
  min-width:0;
}
.pr-label{
  font-size:9px;letter-spacing:.28em;text-transform:uppercase;font-weight:700;
  color:var(--acc);
}
.pr-title{
  font-family:'Inter',sans-serif;font-weight:800;text-transform:uppercase;
  font-size:clamp(1.1rem,1.8vw,1.45rem);color:var(--ink);line-height:1.18;letter-spacing:-.01em;
}
.pr-detail{
  font-size:.92rem;color:var(--ink-dim);line-height:1.75;max-width:520px;
}
.pr-btn{
  margin-top:6px;
  display:inline-flex;align-items:center;gap:10px;width:fit-content;
  font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;
  color:#10131a;background:linear-gradient(135deg,rgba(255,122,32,1),rgba(255,160,70,.95));
  padding:12px 24px;border-radius:999px;
  box-shadow:0 18px 40px rgba(255,122,32,.16);
  transition:filter .25s ease,transform .25s ease,box-shadow .25s ease;
}
.pr-row:hover .pr-btn{filter:brightness(1.05);transform:translateX(2px);box-shadow:0 20px 38px rgba(255,122,32,.22)}
.pr-btn-dot{width:4px;height:4px;border-radius:50%;background:#fff;opacity:.95}

/* ── Lightbox — preserved ── */
@keyframes overlayIn{from{opacity:0}to{opacity:1}}
@keyframes zoomIn{from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
.lb-overlay{position:fixed;inset:0;z-index:9999;background:rgba(10,10,10,.82);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;animation:overlayIn .22s ease both;cursor:zoom-out}
.lb-box{position:relative;width:min(820px,92vw);border-radius:20px;overflow:hidden;border:1px solid rgba(255,122,32,.16);box-shadow:0 40px 140px rgba(0,0,0,.35);animation:zoomIn .3s cubic-bezier(.16,1,.3,1) both;cursor:default;background:#0f1220}
.lb-img{width:100%;height:320px;object-fit:cover;display:block}
.lb-body{padding:28px 36px 34px;display:flex;flex-direction:column;gap:12px}
.lb-eyebrow{font-size:9px;letter-spacing:.3em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:9px;color:var(--acc)}
.lb-title{font-family:'Inter',sans-serif;font-size:clamp(1.3rem,2.4vw,1.7rem);font-weight:900;color:var(--ink);line-height:1.1;text-transform:uppercase}
.lb-rule{height:1px;opacity:.18;border:none;background:linear-gradient(to right,transparent,rgba(255,255,255,.22),transparent)}
.lb-desc{font-size:.95rem;color:var(--ink-dim);line-height:1.8}
.lb-close{position:absolute;top:14px;right:14px;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease;z-index:10}
.lb-close:hover{background:rgba(255,255,255,.14);color:#fff}

/* ── Responsive ── */
@media(max-width:880px){
  .svc-group{grid-template-columns:1fr}
  .svc-intro-col{position:relative;top:0;margin-bottom:16px}
  .pr-row{grid-template-columns:1fr}
  .pr-img{min-height:220px}
}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important}
}
`;

// ─── Lightbox — preserved ─────────────────────────────────────────────────────
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

// ─── VideoHero — preserved ────────────────────────────────────────────────────
function VideoHero() {
  const [current, setCurrent] = useState(0);
  const [pipKey, setPipKey] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % CAROUSEL_IMAGES.length);
      setPipKey(k => k + 1);
    }, 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", background: "#2c2c2f" }}>
      {CAROUSEL_IMAGES.map((src, i) => (
        <div key={src} className={`hs-slide${i === current ? " active" : ""}`}>
          <div className="kb" style={{ backgroundImage: `url(${src})` }} />
        </div>
      ))}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(40,40,44,.42) 0%,rgba(40,40,44,.08) 25%,rgba(60,60,64,.55) 68%,#e9ebef 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,rgba(40,40,44,.6) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,rgba(255,110,30,.4),transparent)", animation: "scanLine 9s ease-in-out infinite" }} />
      </div>
      <div style={{ position: "absolute", top: "14%", bottom: "14%", left: 0, width: "2px", background: "linear-gradient(180deg,transparent,rgb(255,110,30) 30%,rgb(255,110,30) 70%,transparent)" }} />
      <div style={{ position: "absolute", top: 28, right: "clamp(24px,5vw,80px)", display: "flex", gap: 6, alignItems: "center", zIndex: 20 }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button key={i} className="hs-pip"
            onClick={() => { setCurrent(i); setPipKey(k => k + 1); }}
            style={{ width: i === current ? 28 : 5, background: i === current ? "rgba(255,130,50,.2)" : "rgba(255,255,255,.18)" }}>
            {i === current && <span key={pipKey} className="hs-pip-fill" />}
          </button>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 78, right: "clamp(24px,5vw,80px)", display: "flex", alignItems: "baseline", gap: 4, zIndex: 10 }}>
        <span style={{ fontSize: 20, fontWeight: 800, color: "rgb(255,130,50)", lineHeight: 1 }}>{String(current + 1).padStart(2, "0")}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,.18)", letterSpacing: ".1em" }}>/ {String(CAROUSEL_IMAGES.length).padStart(2, "0")}</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 clamp(24px,5vw,80px) 64px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, animation: "heroIn .6s .3s both", opacity: 0 }}>
          <div style={{ width: 26, height: 1, background: "rgb(255,130,50)" }} />
          <span style={{ fontSize: 9, letterSpacing: ".42em", textTransform: "uppercase", color: "rgb(255,130,50)" }}>What We Do</span>
        </div>
        <h1 style={{ fontSize: "clamp(2.8rem,6.5vw,5.8rem)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-.032em", color: "#f0e8df", marginBottom: 20, animation: "heroIn .7s .42s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          IMPACT <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgb(255,130,50)" }}>WITNESSED</em>
        </h1>
        <div style={{ position: "relative", height: 1, background: "rgba(255,255,255,.06)", marginBottom: 20, maxWidth: 450, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgb(255,130,50),rgba(255,180,80,.22))", animation: "lineExp 1s .9s cubic-bezier(.4,0,.2,1) both", transformOrigin: "left" }} />
        </div>
        <p style={{ fontSize: "clamp(.88rem,1.25vw,1rem)", color: "rgba(240,232,220,.48)", lineHeight: 1.75, maxWidth: 510, animation: "heroIn .6s .58s cubic-bezier(.4,0,.2,1) both", opacity: 0 }}>
          See your future in action. Explore the missions where we turned bold ambition into scalable reality.
        </p>
      </div>
    </section>
  );
}

// ─── one product-style row within a category ─────────────────────────────────
function ProductRow({
  img,
  title,
  detail,
  index,
  acc,
  svcTitle,
  svcImage,
  onClick,
}: {
  img: { src: string; label: string };
  title: string;
  detail: string;
  index: number;
  acc: string;
  svcTitle: string;
  svcImage: string;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`pr-row${visible ? " visible" : ""}`}
      style={{ ["--acc" as string]: acc, transitionDelay: visible ? `${Math.min(index, 3) * 0.09}s` : "0s" }}
      onClick={onClick}
    >
      <div className="pr-img">
        <img
          src={img.src}
          alt={img.label}
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = svcImage; }}
        />
        <div className="pr-img-scrim" />
        <div className="pr-num">{String(index + 1).padStart(2, "0")}</div>
      </div>
      <div className="pr-content">
        <div className="pr-label">{svcTitle} · {img.label}</div>
        <div className="pr-title">{title}</div>
        {detail && <p className="pr-detail">{detail}</p>}
        <div className="pr-btn">
          View Capability <span className="pr-btn-dot" />
        </div>
      </div>
    </div>
  );
}

// ─── one category block: pinned intro + its own product-style row stack ─────
function ServiceGroup({
  svc,
  svcIdx,
  acc,
  onCardClick,
}: {
  svc: typeof SERVICE_GROUPS[0];
  svcIdx: number;
  acc: string;
  onCardClick: (item: LBItem) => void;
}) {
  const cards = svc.subImages.map((img, ci) => {
    const { title, detail } = parseItem(svc.items[ci] ?? "");
    return { img, title, detail, ci };
  });

  return (
    <div className="svc-group" style={{ ["--acc" as string]: acc }}>
      <div className="svc-intro-col">
        <div className="svc-intro-icon">
          <span style={{ background: acc }} />
          <span style={{ background: acc, opacity: .4 }} />
        </div>
        <div className="svc-intro-eyebrow">{svc.eyebrow}</div>
        <h2 className="svc-intro-title">{svc.title}</h2>
        <p className="svc-intro-sub">{svc.tagline}</p>
        <div className="svc-intro-count">
          <span className="svc-intro-count-num">{svc.stat.value}</span>
          <span className="svc-intro-count-lbl">{svc.stat.label}</span>
        </div>
      </div>

      <div className="svc-list">
        {cards.map(({ img, title, detail, ci }) => (
          <ProductRow
            key={img.label}
            img={img}
            title={title}
            detail={detail}
            index={ci}
            acc={acc}
            svcTitle={svc.title}
            svcImage={svc.image as unknown as string}
            onClick={() => onCardClick({
              src: img.src,
              label: img.label,
              title,
              detail,
              acc,
              svcTitle: svc.title,
            })}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Full Services Section ────────────────────────────────────────────────────
function ServicesSection() {
  const [lightboxItem, setLightboxItem] = useState<LBItem | null>(null);

  return (
    <>
      <section className="svc-section">
        {SERVICE_GROUPS.map((svc, si) => (
          <ServiceGroup
            key={svc.title}
            svc={svc}
            svcIdx={si}
            acc={PANEL_ACCENT[si]}
            onCardClick={setLightboxItem}
          />
        ))}
      </section>

      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </>
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
      <ServicesSection />
    </main>
  );
}