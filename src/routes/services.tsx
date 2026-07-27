import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
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

// ─── STYLES ───────────────────────────────────────────────────────────────────
// Theme-aware (aliased to index.css design tokens). VideoHero's styles have
// been removed along with the component; the old stacked pinned-intro /
// product-row layout has been replaced with a numbered 01–08 hover list +
// detail panel, matching the indianic.com/what-we-do reference.
const STYLES = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

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

/* ══ SIMPLE TEXT HERO (replaces the removed video/image carousel) ══ */
@keyframes svhIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

.svh-hero{
  padding:clamp(140px,18vh,190px) 0 clamp(64px,8vh,96px);
  background:
    radial-gradient(circle at 15% 0%, color-mix(in oklch, var(--acc) 10%, transparent) 0%, transparent 45%),
    var(--bg);
  font-family:var(--font-sans);
}
.svh-inner{ max-width:1180px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }
.svh-eyebrow{
  font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-weight:700;
  color:var(--ink-faint); margin-bottom:20px;
  animation:svhIn .6s cubic-bezier(.16,1,.3,1) both;
}
.svh-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(2.3rem,5.4vw,4rem); line-height:1.08; color:var(--ink);
  max-width:900px; margin-bottom:24px;
  animation:svhIn .7s .08s cubic-bezier(.16,1,.3,1) both;
}
.svh-title em{ font-style:italic; font-weight:300; color:var(--acc); }
.svh-sub{
  font-size:clamp(.95rem,1.3vw,1.08rem); color:var(--ink-dim); line-height:1.75;
  max-width:640px; margin-bottom:36px;
  animation:svhIn .7s .16s cubic-bezier(.16,1,.3,1) both;
}
.svh-ctas{
  display:flex; flex-wrap:wrap; gap:14px; margin-bottom:48px;
  animation:svhIn .7s .22s cubic-bezier(.16,1,.3,1) both;
}
.svh-cta-primary{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--acc); color:var(--acc-fg);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:14px 26px;border-radius:999px;
  transition:transform .25s ease, box-shadow .25s ease;
  box-shadow:0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
}
.svh-cta-primary:hover{ transform:translateY(-2px); }
.svh-cta-secondary{
  display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--line); color:var(--ink);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:14px 26px;border-radius:999px;
  background:transparent; cursor:pointer;
  transition:border-color .25s ease, color .25s ease;
}
.svh-cta-secondary:hover{ border-color:var(--acc); color:var(--acc); }
.svh-stats{
  display:flex; flex-wrap:wrap; gap:clamp(28px,4vw,56px);
  padding-top:32px; border-top:1px solid var(--line);
  animation:svhIn .7s .3s cubic-bezier(.16,1,.3,1) both;
}
.svh-stat-val{
  font-family:var(--font-display); font-weight:700; font-size:clamp(1.4rem,2.4vw,1.9rem);
  color:var(--ink); line-height:1;
}
.svh-stat-lbl{
  font-size:9.5px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint);
  margin-top:8px;
}

/* ══ SERVICES — numbered 01–08 hover list + detail panel ══ */
.svl-section{
  background:var(--bg);
  padding:clamp(60px,7vh,96px) 0 clamp(84px,10vh,128px);
  font-family:var(--font-sans);
}
.svl-inner{ max-width:1180px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }
.svl-header{ margin-bottom:clamp(36px,5vh,56px); max-width:720px; }
.svl-header-eyebrow{
  font-size:10px;letter-spacing:.32em;text-transform:uppercase;font-weight:700;
  color:var(--acc); margin-bottom:16px;
}
.svl-header-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.9rem,3.6vw,2.9rem); line-height:1.1; color:var(--ink); margin-bottom:14px;
}
.svl-header-title em{ font-style:italic; font-weight:300; color:var(--acc); }
.svl-header-sub{ font-size:.97rem; color:var(--ink-dim); line-height:1.75; }

.svl-grid{
  display:grid; grid-template-columns:minmax(260px,360px) 1fr;
  gap:clamp(24px,3vw,48px);
  border:1px solid var(--line); border-radius:24px; overflow:hidden;
  background:var(--surface);
}

.svl-list{ display:flex; flex-direction:column; }
.svl-item{
  display:flex; align-items:center; gap:16px;
  width:100%; text-align:left; background:transparent; border:none; cursor:pointer;
  padding:18px clamp(18px,2.4vw,28px);
  border-bottom:1px solid var(--line);
  color:var(--ink-dim);
  transition:background .25s ease, color .25s ease;
  font-family:var(--font-sans);
}
.svl-item:last-child{ border-bottom:none; }
.svl-item:hover{ background:color-mix(in oklch, var(--acc) 6%, transparent); color:var(--ink); }
.svl-item.active{
  background:color-mix(in oklch, var(--acc) 10%, transparent);
  color:var(--ink);
}
.svl-num{
  font-family:var(--font-display); font-weight:700; font-size:.85rem;
  color:var(--ink-faint); flex-shrink:0; width:26px;
}
.svl-item.active .svl-num{ color:var(--acc); }
.svl-item-title{ font-size:.98rem; font-weight:600; flex:1; letter-spacing:-.005em; }
.svl-arrow{
  font-size:.9rem; color:var(--acc); opacity:0; transform:translateX(-4px);
  transition:opacity .25s ease, transform .25s ease; flex-shrink:0;
}
.svl-item.active .svl-arrow, .svl-item:hover .svl-arrow{ opacity:1; transform:translateX(0); }

@keyframes svlPanelIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.svl-panel{
  padding:clamp(28px,3.4vw,44px) clamp(24px,3vw,40px);
  animation:svlPanelIn .4s cubic-bezier(.16,1,.3,1) both;
}
.svl-panel-eyebrow{
  font-size:10px;letter-spacing:.28em;text-transform:uppercase;font-weight:700;
  color:var(--acc); margin-bottom:14px;
}
.svl-panel-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.5rem,2.6vw,2.1rem); color:var(--ink); line-height:1.15; margin-bottom:14px;
}
.svl-panel-tagline{
  font-size:.95rem; color:var(--ink-dim); line-height:1.75; max-width:560px; margin-bottom:24px;
}
.svl-panel-stat{
  display:inline-flex; align-items:baseline; gap:10px;
  padding:14px 0 24px; border-bottom:1px solid var(--line); margin-bottom:24px; width:100%;
}
.svl-panel-stat-val{ font-family:var(--font-display); font-weight:700; font-size:1.7rem; color:var(--acc); line-height:1; }
.svl-panel-stat-lbl{ font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); }

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

.svl-caps-grid{ display:grid; grid-template-columns:repeat(auto-fill,minmax(96px,1fr)); gap:12px; }
.svl-cap-thumb{
  position:relative; aspect-ratio:1/1; border-radius:12px; overflow:hidden;
  border:1px solid var(--line); background:var(--card); cursor:pointer; padding:0;
}
.svl-cap-thumb img{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .5s ease; }
.svl-cap-thumb:hover img{ transform:scale(1.08); }
.svl-cap-thumb span{
  position:absolute; left:0; right:0; bottom:0; padding:8px 10px;
  font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; font-weight:600; color:#fff;
  background:linear-gradient(to top, rgba(0,0,0,.72), transparent);
}

/* ── Lightbox — overlay intentionally stays dark-tinted in both themes
   (standard modal-scrim pattern), card content follows theme tokens ── */
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

/* ── Responsive ── */
@media(max-width:880px){
  .svl-grid{ grid-template-columns:1fr; }
  .svl-item{ padding:16px 18px; }
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

// ─── Simple text hero (replaces the removed VideoHero carousel) ─────────────
// Stat figures reused from Hero.tsx / StatCounter for consistency with the
// rest of the site, rather than inventing new numbers.
function ServicesHero() {
  const scrollToList = () => {
    document.getElementById("services-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="svh-hero">
      <div className="svh-inner">
        <p className="svh-eyebrow">[Full-Stack, AI-Native Delivery]</p>
        <h1 className="svh-title">
          We ship software that thinks,
          <br />
          <em>ships, and scales.</em>
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
        <div className="svh-stats">
          <div>
            <div className="svh-stat-val">8.5</div>
            <div className="svh-stat-lbl">Era of Impact</div>
          </div>
          <div>
            <div className="svh-stat-val">150+</div>
            <div className="svh-stat-lbl">Breakthroughs</div>
          </div>
          <div>
            <div className="svh-stat-val">25+</div>
            <div className="svh-stat-lbl">Global Reach</div>
          </div>
          <div>
            <div className="svh-stat-val">50+</div>
            <div className="svh-stat-lbl">Vision Architects</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Numbered 01–08 hover list + detail panel ────────────────────────────────
function ServicesInteractive({ onCardClick }: { onCardClick: (item: LBItem) => void }) {
  const [active, setActive] = useState(0);
  const svc = SERVICE_GROUPS[active];
  const acc = PANEL_ACCENT[active];

  return (
    <section id="services-list" className="svl-section">
      <div className="svl-inner">
        <div className="svl-header">
          <p className="svl-header-eyebrow">[Services]</p>
          <h2 className="svl-header-title">
            Every discipline,
            <br />
            <em>AI-accelerated.</em>
          </h2>
          <p className="svl-header-sub">
            Hover or tap any discipline to see what's inside — offerings, capabilities and the
            outcome we hold ourselves to.
          </p>
        </div>

        <div className="svl-grid" style={{ ["--acc" as string]: acc }}>
          <div className="svl-list">
            {SERVICE_GROUPS.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className={`svl-item${i === active ? " active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="svl-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="svl-item-title">{s.title}</span>
                <span className="svl-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="svl-panel" key={svc.title}>
            <p className="svl-panel-eyebrow">{svc.eyebrow}</p>
            <h3 className="svl-panel-title">{svc.title}</h3>
            <p className="svl-panel-tagline">{svc.tagline}</p>

            <div className="svl-panel-stat">
              <span className="svl-panel-stat-val">{svc.stat.value}</span>
              <span className="svl-panel-stat-lbl">{svc.stat.label}</span>
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
      </div>
    </section>
  );
}

// ─── Full Services Section ────────────────────────────────────────────────────
function ServicesSection() {
  const [lightboxItem, setLightboxItem] = useState<LBItem | null>(null);

  return (
    <>
      <ServicesInteractive onCardClick={setLightboxItem} />
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
  const { theme, toggleTheme } = useThemeInit();

  return (
    <main className="svc-page bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />
      <ServicesHero />
      <ServicesSection />
    </main>
  );
}