import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState, useCallback } from "react";
import dataAiImg from "@/assets/service-data-ai.jpg";
import digitalImg from "@/assets/service-digital.jpg";
import productImg from "@/assets/service-product.jpg";
import appImg from "@/assets/service-app.jpg";
import uiuxImg from "@/assets/service-uiux.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import growthImg from "@/assets/service-growth.jpg";
import managedImg from "@/assets/service-managed.jpg";

const CAROUSEL_IMAGES = [
  "/services-c1.png", "/services-c2.png", "/services-c3.png",
  "/services-c4.png", "/services-c5.png",
];

const PANEL_ACCENT = [
  "rgb(255,130,50)", "rgb(160,200,255)", "rgb(255,160,60)",
  "rgb(255,100,80)", "rgb(140,220,180)", "rgb(255,160,60)",
  "rgb(255,130,50)", "rgb(160,200,255)",
];

const SERVICE_GROUPS = [
  {
    title: "Artificial Intelligence",
    titleTop: "ARTIFICIAL",
    titleBtm: "Intelligence",
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
    titleTop: "DIGITAL",
    titleBtm: "Transformation",
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
    titleTop: "PRODUCT",
    titleBtm: "Engineering",
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
    titleTop: "APPLICATION",
    titleBtm: "Transformation",
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
    titleTop: "UI / UX",
    titleBtm: "Design",
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
    titleTop: "STRATEGIC",
    titleBtm: "Consulting",
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
    titleTop: "PERFORMANCE",
    titleBtm: "& Growth",
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
    titleTop: "AUTONOMOUS",
    titleBtm: "Ops",
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

type Step =
  | { type: "wipe"; svcIdx: number }
  | { type: "card"; svcIdx: number; cardIdx: number };

function buildSteps(): Step[] {
  const out: Step[] = [];
  SERVICE_GROUPS.forEach((svc, si) => {
    if (si > 0) out.push({ type: "wipe", svcIdx: si });
    svc.subImages.forEach((_, ci) => {
      out.push({ type: "card", svcIdx: si, cardIdx: ci });
    });
  });
  return out;
}
const STEPS = buildSteps();
const SCROLL_PER_STEP = 350;

function parseItem(raw: string) {
  const c = raw.indexOf(":");
  return {
    title: c > -1 ? raw.slice(0, c).trim() : raw,
    detail: c > -1 ? raw.slice(c + 1).trim() : "",
  };
}

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,300;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

@keyframes heroIn    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
@keyframes lineExp   { from{transform:scaleX(0);transform-origin:left} to{transform:scaleX(1)} }
@keyframes kenBurns  { 0%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.07) translate(-1%,-0.6%)} 100%{transform:scale(1) translate(0,0)} }
@keyframes pipFill   { from{width:0%} to{width:100%} }
@keyframes scanLine  { 0%{top:-2px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0} }
@keyframes cardIn {
  0%   { opacity:0; transform:translateY(24px) scale(0.97); }
  100% { opacity:1; transform:translateY(0) scale(1); }
}
@keyframes panelTextIn  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
@keyframes panelTextInL { from{opacity:0;transform:translateX(-10px)} to{opacity:1;transform:none} }
@keyframes panelFadeIn  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
@keyframes panelFadeOut { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(-14px)} }
@keyframes shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
@keyframes ticker  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes overlayIn { from{opacity:0} to{opacity:1} }
@keyframes zoomIn    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
@keyframes dotPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(255,130,50,0)} 50%{box-shadow:0 0 0 4px rgba(255,130,50,0.2)} }

/* ─── Hero ─── */
.hs-slide { position:absolute;inset:0;opacity:0;transition:opacity 1.8s cubic-bezier(.4,0,.2,1); }
.hs-slide.active { opacity:1; }
.hs-slide .kb { position:absolute;inset:-4%;background-size:cover;background-position:center;filter:saturate(0.5) brightness(0.38);animation:kenBurns 22s ease-in-out infinite; }
.hs-pip { height:3px;border-radius:2px;border:none;cursor:pointer;padding:0;flex-shrink:0;overflow:hidden;position:relative;transition:width .4s cubic-bezier(.16,1,.3,1); }
.hs-pip-fill { position:absolute;top:0;left:0;height:100%;border-radius:2px;background:rgb(255,130,50);animation:pipFill 4s linear forwards; }

/* ─── Intro ─── */
.sv-intro { background:#050505;padding:100px clamp(28px,5vw,72px) 0;display:flex;align-items:flex-end;justify-content:space-between;gap:40px; }
.sv-intro-eyebrow { font-size:9px;letter-spacing:.42em;text-transform:uppercase;color:rgb(255,130,50);font-weight:700;display:flex;align-items:center;gap:12px;margin-bottom:20px; }
.sv-intro-eyebrow::before { content:'';width:28px;height:1.5px;background:currentColor;flex-shrink:0; }
.sv-intro-title { font-size:clamp(2.4rem,5vw,4.2rem);font-weight:900;color:#f0e8df;line-height:1.03;letter-spacing:-.04em;margin-bottom:14px; }
.sv-intro-title em { font-style:italic;font-weight:300;color:rgb(255,130,50);font-family:'Playfair Display',Georgia,serif;letter-spacing:-.02em; }
.sv-intro-sub { font-size:clamp(.84rem,1.1vw,.96rem);color:rgba(240,232,220,.38);line-height:1.78;max-width:430px; }
.sv-intro-count-num { font-size:clamp(3rem,7vw,5.5rem);font-weight:900;line-height:1;letter-spacing:-.06em;color:rgba(255,255,255,.05); }
.sv-intro-count-label { font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.14); }

/* ─── Scroll container: 100vh sticky, everything fits in viewport ─── */
.sv-outer { position:relative;background:#050505; }
.sv-sticky {
  position:sticky;top:0;
  height:100vh;
  overflow:hidden;
  display:grid;
  grid-template-columns:48px 1fr;
  grid-template-rows:2px 1fr 38px;
}

.sv-progress { grid-column:1/-1;grid-row:1;background:rgba(255,255,255,.05); }
.sv-progress-fill { height:100%;transition:width .12s linear;background:linear-gradient(to right,var(--acc,rgb(255,130,50)),rgba(255,180,80,.3)); }

.sv-rail { grid-column:1;grid-row:2;border-right:1px solid rgba(255,255,255,.05);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0; }
.sv-rail-label { writing-mode:vertical-rl;font-size:8px;letter-spacing:.34em;text-transform:uppercase;color:rgba(255,255,255,.15);font-weight:600;user-select:none; }
.sv-rail-sep { width:1px;height:28px;background:rgba(255,255,255,.08);margin:10px 0; }
.sv-rail-cur { font-size:11px;font-weight:800;letter-spacing:.04em; }
.sv-rail-total { font-size:9px;color:rgba(255,255,255,.18); }

/* panels fills the grid cell exactly; its children are absolute-positioned panels */
.sv-panels { grid-column:2;grid-row:2;position:relative;overflow:hidden; }

.sv-ticker { grid-column:1/-1;grid-row:3;overflow:hidden;border-top:1px solid rgba(255,255,255,.05);display:flex;align-items:center;background:rgba(5,5,5,.8);backdrop-filter:blur(4px); }
.sv-ticker-track { display:flex;animation:ticker 35s linear infinite;white-space:nowrap; }
.sv-ticker-item { display:flex;align-items:center;gap:0;font-size:8px;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.1);padding:0 24px;flex-shrink:0; }
.sv-ticker-dot { width:3px;height:3px;border-radius:50%;background:rgba(255,130,50,.35);margin-right:24px; }

/* ─── Panels ─── */
.sv-panel {
  position:absolute;inset:0;
  display:grid;
  grid-template-columns:48% 1fr;
  grid-template-rows:100%;   /* single row, both cols fill full height */
  pointer-events:none;
  opacity:0;
  will-change:opacity,transform;
  min-height:0;              /* prevent grid blowout */
}
.sv-panel.sv-current { pointer-events:auto;opacity:1;z-index:2; }
.sv-panel.sv-wipe-in  { animation:panelFadeIn  0.6s cubic-bezier(.16,1,.3,1) both;z-index:3; }
.sv-panel.sv-wipe-out { animation:panelFadeOut 0.5s cubic-bezier(.4,0,.2,1) both;z-index:1; }

/* ─── Left image ─── */
.sv-img { position:relative;overflow:hidden; }
.sv-img img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(0.55) brightness(0.5);animation:kenBurns 24s ease-in-out infinite; }
.sv-img-grad { position:absolute;inset:0;z-index:1;background:linear-gradient(100deg,transparent 38%,#050505 100%),linear-gradient(180deg,rgba(5,5,5,.25) 0%,transparent 30%,rgba(5,5,5,.5) 100%); }
.sv-img-stripes { position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.08;background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,.06) 0px,rgba(255,255,255,.06) 1px,transparent 1px,transparent 12px); }
.sv-img-index { position:absolute;bottom:32px;left:36px;z-index:3;font-size:clamp(4rem,8vw,7rem);font-weight:900;line-height:1;letter-spacing:-.07em;color:rgba(255,255,255,.06);user-select:none; }
.sv-stat { position:absolute;top:36px;left:36px;z-index:3; }
.sv-stat-val { display:block;font-size:clamp(2.6rem,4.5vw,3.8rem);font-weight:900;line-height:1;letter-spacing:-.05em;background:linear-gradient(90deg,#f0e8df 0%,var(--acc,rgb(255,130,50)) 40%,#f0e8df 60%,var(--acc,rgb(255,130,50)) 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 4s linear infinite; }
.sv-stat-lbl { font-size:9px;letter-spacing:.3em;text-transform:uppercase;color:rgba(240,232,220,.4);margin-top:4px;display:block; }

/* ─── Right content: fills full panel height, scrolls internally if needed ─── */
.sv-content {
  display:flex;
  flex-direction:column;
  padding:clamp(20px,2.5vh,36px) 28px clamp(16px,2vh,28px) 36px;
  position:relative;
  background:#050505;
  overflow-y:auto;
  overflow-x:hidden;
  scrollbar-width:none;
  height:100%;              /* fill the grid cell */
  min-height:0;             /* allow shrinking below content size */
  justify-content:center;   /* vertically center when content is shorter than panel */
}
.sv-content::-webkit-scrollbar { display:none; }
.sv-content::before { content:'';position:absolute;inset:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.03) 1px,transparent 1px);background-size:26px 26px; }
.sv-content-bar { position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(180deg,transparent,var(--acc,rgb(255,130,50)) 25%,var(--acc,rgb(255,130,50)) 75%,transparent); }
.sv-content-inner { position:relative;z-index:1;display:flex;flex-direction:column;gap:0; }

/* ─── Eyebrow ─── */
.sv-eyebrow { font-size:8.5px;letter-spacing:.38em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-shrink:0;animation:panelTextInL .45s .0s cubic-bezier(.16,1,.3,1) both; }
.sv-slash { font-size:1rem;font-weight:200;color:rgba(255,255,255,.14);margin:0 4px; }

/* ─── Title ─── */
.sv-title { line-height:1.0;letter-spacing:-.03em;margin-bottom:8px;flex-shrink:0;animation:panelTextIn .5s .06s cubic-bezier(.16,1,.3,1) both; }
.sv-title-top { display:block;font-size:clamp(1.4rem,2.4vw,2.6rem);font-weight:900;color:#f0e8df;letter-spacing:-.04em;text-transform:uppercase;line-height:1.0; }
.sv-title-btm { display:block;font-family:'Playfair Display',Georgia,serif;font-size:clamp(1.2rem,2.1vw,2.3rem);font-weight:300;font-style:italic;color:rgba(240,232,220,.62);letter-spacing:-.01em;line-height:1.1;margin-top:2px; }

/* ─── Tagline ─── */
.sv-tagline { font-size:clamp(.74rem,.9vw,.86rem);color:rgba(240,232,220,.36);line-height:1.65;max-width:400px;margin-bottom:10px;flex-shrink:0;animation:panelTextIn .5s .12s cubic-bezier(.16,1,.3,1) both; }

/* ─── Rule ─── */
.sv-rule { height:1px;width:100%;max-width:260px;margin-bottom:12px;flex-shrink:0;background:rgba(255,255,255,.07);position:relative;overflow:hidden;animation:panelTextIn .4s .16s ease both; }
.sv-rule::after { content:'';position:absolute;inset:0;background:linear-gradient(to right,var(--acc,rgb(255,130,50)),transparent);transform:scaleX(0);transform-origin:left;animation:lineExp .8s .35s cubic-bezier(.16,1,.3,1) both; }

/* ─── Cards grid: tighter gap ─── */
.sv-cards {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:8px;
  flex-shrink:0;
}

/* ─── Card ─── */
.sv-card {
  border:1px solid rgba(255,255,255,.12);
  border-radius:12px;overflow:hidden;cursor:pointer;
  background:#111114;position:relative;
  display:flex;flex-direction:column;
  opacity:0;
  transition:border-color .3s ease,box-shadow .3s ease,transform .3s ease;
}
.sv-card:hover { border-color:rgba(255,255,255,.28);box-shadow:0 14px 48px rgba(0,0,0,.6);transform:translateY(-3px); }
.sv-card::before { content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--acc,rgb(255,130,50));transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.16,1,.3,1);z-index:2; }
.sv-card:hover::before { transform:scaleX(1); }
.sv-card.sv-card-visible { animation:cardIn .65s cubic-bezier(.16,1,.3,1) both; }

/* ─── Card image: clamp height so cards never overflow the panel ─── */
.sv-card-img { width:100%;height:clamp(90px,12vh,140px);overflow:hidden;flex-shrink:0;position:relative; }
.sv-card-img img { width:100%;height:100%;object-fit:cover;display:block;filter:saturate(0.5) brightness(0.58);transition:filter .4s ease,transform .5s cubic-bezier(.16,1,.3,1); }
.sv-card:hover .sv-card-img img { filter:saturate(.9) brightness(.85);transform:scale(1.06); }
.sv-card-img::after { content:'';position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,transparent 30%,rgba(17,17,20,.9) 100%); }

/* ─── Card body: tighter padding so card fits within viewport ─── */
.sv-card-body { padding:10px 14px 12px;flex:1;display:flex;flex-direction:column;gap:4px; }

/* FIX: label now clearly visible with accent color at full opacity */
.sv-card-label {
  font-size:8px;
  letter-spacing:.32em;
  text-transform:uppercase;
  font-weight:700;
  color:var(--acc,rgb(255,130,50));
  opacity:1;
  display:flex;
  align-items:center;
  gap:7px;
}
.sv-card-label::before { content:'';width:9px;height:1px;background:currentColor;flex-shrink:0; }

/* FIX: title is now fully opaque warm white — was getting lost on dark bg */
.sv-card-title {
  font-size:.88rem;
  font-weight:800;
  color:#e8dfd4;
  line-height:1.25;
  letter-spacing:-.01em;
  opacity:1;
}

/* FIX: detail text opacity raised from .38 to .70 — much more readable */
.sv-card-detail {
  font-size:.74rem;
  color:rgba(232,223,212,.70);
  line-height:1.62;
  display:-webkit-box;
  -webkit-line-clamp:3;
  -webkit-box-orient:vertical;
  overflow:hidden;
}

.sv-card-arrow { margin-top:8px;font-size:8px;letter-spacing:.22em;text-transform:uppercase;color:var(--acc,rgb(255,130,50));opacity:0;transform:translateY(4px);transition:opacity .25s ease,transform .25s ease;display:flex;align-items:center;gap:4px; }
.sv-card-arrow::after { content:'↗';font-size:11px; }
.sv-card:hover .sv-card-arrow { opacity:1;transform:none; }

/* ─── Step badge ─── */
.sv-step-badge { display:flex;align-items:baseline;gap:6px;flex-shrink:0;padding-top:10px;margin-top:2px; }
.sv-step-cur { font-size:1.9rem;font-weight:900;line-height:1;letter-spacing:-.05em; }
.sv-step-label { font-size:8px;letter-spacing:.28em;text-transform:uppercase;color:rgba(255,255,255,.2); }

/* ─── Nav dots ─── */
.sv-dots { position:absolute;right:14px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;z-index:10; }
.sv-dot-wrap { position:relative;display:flex;align-items:center;width:20px;height:20px;cursor:pointer;justify-content:center; }
.sv-dot { width:5px;height:5px;border-radius:50%;border:none;padding:0;background:rgba(255,255,255,.16);cursor:pointer;transition:all .3s ease; }
.sv-dot.active { background:rgb(255,130,50);box-shadow:0 0 8px rgba(255,130,50,.6);animation:dotPulse 2s ease infinite; }
.sv-dot-wrap:hover .sv-dot { background:rgba(255,255,255,.5);transform:scale(1.5); }
.sv-dot-tip { position:absolute;right:24px;top:50%;transform:translateY(-50%);background:rgba(8,8,8,.92);border:1px solid rgba(255,255,255,.09);border-radius:4px;padding:4px 9px;white-space:nowrap;font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.65);opacity:0;pointer-events:none;transition:opacity .2s ease; }
.sv-dot-wrap:hover .sv-dot-tip { opacity:1; }

/* ─── Lightbox ─── */
.lb-overlay { position:fixed;inset:0;z-index:9999;background:rgba(3,3,3,.93);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;animation:overlayIn .22s ease both;cursor:zoom-out; }
.lb-box { position:relative;width:min(820px,92vw);border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,.1);box-shadow:0 40px 100px rgba(0,0,0,.8);animation:zoomIn .3s cubic-bezier(.16,1,.3,1) both;cursor:default;background:#0e0e10; }
.lb-img { width:100%;height:320px;object-fit:cover;display:block;filter:saturate(.8) brightness(.85); }
.lb-body { padding:26px 32px 32px;display:flex;flex-direction:column;gap:10px; }
.lb-eyebrow { font-size:9px;letter-spacing:.36em;text-transform:uppercase;font-weight:700;display:flex;align-items:center;gap:9px; }
.lb-eyebrow::before { content:'';width:14px;height:1.5px;background:currentColor;flex-shrink:0; }
.lb-title { font-size:clamp(1.4rem,2.6vw,1.9rem);font-weight:900;color:#f0e8df;line-height:1.08;letter-spacing:-.03em; }
.lb-rule { height:1px;opacity:.18;border:none; }
.lb-desc { font-size:.9rem;color:rgba(240,232,220,.62);line-height:1.78; }
.lb-close { position:absolute;top:14px;right:14px;width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.7);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s ease,color .2s ease;z-index:10; }
.lb-close:hover { background:rgba(255,130,50,.3);color:#fff; }

/* ─── Responsive ─── */
@media (max-width:1024px) {
  .sv-panel { grid-template-columns:42% 1fr; }
  .sv-content { padding:clamp(16px,2vh,28px) 18px clamp(14px,1.5vh,22px) 26px; }
  .sv-card-img { height:clamp(80px,10vh,120px); }
}
@media (max-width:700px) {
  .sv-panel { grid-template-columns:1fr; }
  .sv-img { display:none; }
  .sv-sticky { grid-template-columns:32px 1fr; height:100vh; }
  .sv-content { padding:16px 14px 16px 18px;justify-content:flex-start; }
  .sv-cards { grid-template-columns:1fr;gap:8px; }
  .sv-card-img { height:clamp(100px,14vh,150px); }
  .sv-dots { right:6px; }
}
@media (prefers-reduced-motion:reduce) {
  *,*::before,*::after { animation-duration:.01ms !important;transition-duration:.01ms !important; }
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
            {item.svcTitle}<span style={{ opacity:.35, margin:"0 6px" }}>/</span>{item.label}
          </div>
          <div className="lb-title">{item.title}</div>
          <hr className="lb-rule" style={{ background: item.acc }} />
          {item.detail && <p className="lb-desc">{item.detail}</p>}
        </div>
      </div>
    </div>
  );
}

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
    <section style={{ position:"relative", width:"100%", height:"100vh", overflow:"hidden", background:"#040403" }}>
      {CAROUSEL_IMAGES.map((src, i) => (
        <div key={src} className={`hs-slide${i === current ? " active" : ""}`}>
          <div className="kb" style={{ backgroundImage:`url(${src})` }} />
        </div>
      ))}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(4,4,3,.4) 0%,rgba(4,4,3,0) 25%,rgba(4,4,3,.55) 65%,rgba(4,4,3,1) 100%)" }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,rgba(4,4,3,.65) 0%,transparent 60%)" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize:"80px 80px" }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(255,110,30,.4),transparent)", animation:"scanLine 9s ease-in-out infinite" }} />
      </div>
      <div style={{ position:"absolute", top:"14%", bottom:"14%", left:0, width:"2px", background:"linear-gradient(180deg,transparent,rgb(255,110,30) 30%,rgb(255,110,30) 70%,transparent)" }} />
      <div style={{ position:"absolute", top:28, right:"clamp(24px,5vw,80px)", display:"flex", gap:6, alignItems:"center", zIndex:20 }}>
        {CAROUSEL_IMAGES.map((_, i) => (
          <button key={i} className="hs-pip"
            onClick={() => { setCurrent(i); setPipKey(k => k + 1); }}
            style={{ width:i===current?28:5, background:i===current?"rgba(255,130,50,.2)":"rgba(255,255,255,.18)" }}>
            {i === current && <span key={pipKey} className="hs-pip-fill" />}
          </button>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:78, right:"clamp(24px,5vw,80px)", display:"flex", alignItems:"baseline", gap:4, zIndex:10 }}>
        <span style={{ fontSize:20, fontWeight:800, color:"rgb(255,130,50)", lineHeight:1 }}>{String(current+1).padStart(2,"0")}</span>
        <span style={{ fontSize:10, color:"rgba(255,255,255,.18)", letterSpacing:".1em" }}>/ {String(CAROUSEL_IMAGES.length).padStart(2,"0")}</span>
      </div>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 clamp(24px,5vw,80px) 64px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:22, animation:"heroIn .6s .3s both", opacity:0 }}>
          <div style={{ width:26, height:1, background:"rgb(255,130,50)" }} />
          <span style={{ fontSize:9, letterSpacing:".42em", textTransform:"uppercase", color:"rgb(255,130,50)" }}>What We Do</span>
        </div>
        <h1 style={{ fontSize:"clamp(2.8rem,6.5vw,5.8rem)", fontWeight:900, lineHeight:1.0, letterSpacing:"-.032em", color:"#f0e8df", marginBottom:20, animation:"heroIn .7s .42s cubic-bezier(.4,0,.2,1) both", opacity:0 }}>
          IMPACT <em style={{ fontStyle:"italic", fontWeight:300, color:"rgb(255,130,50)" }}>WITNESSED</em>
        </h1>
        <div style={{ position:"relative", height:1, background:"rgba(255,255,255,.06)", marginBottom:20, maxWidth:450, overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgb(255,130,50),rgba(255,180,80,.22))", animation:"lineExp 1s .9s cubic-bezier(.4,0,.2,1) both", transformOrigin:"left" }} />
        </div>
        <p style={{ fontSize:"clamp(.88rem,1.25vw,1rem)", color:"rgba(240,232,220,.48)", lineHeight:1.75, maxWidth:510, animation:"heroIn .6s .58s cubic-bezier(.4,0,.2,1) both", opacity:0 }}>
          See your future in action. Explore the missions where we turned bold ambition into scalable reality.
        </p>
      </div>
    </section>
  );
}

function ServicesSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [svcIdx, setSvcIdx] = useState(0);
  const [wipingIn, setWipingIn] = useState<number | null>(null);
  const [wipingOut, setWipingOut] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<Map<number, Set<number>>>(
    () => new Map([[0, new Set()]])
  );
  const [progress, setProgress] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<LBItem | null>(null);

  const prevStepRef = useRef(-1);
  const prevSvcRef = useRef(0);
  const wipeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalScrollBudget = STEPS.length * SCROLL_PER_STEP;
  const outerHeight = totalScrollBudget + window.innerHeight;

  const triggerWipe = useCallback((newSvcIdx: number, oldSvcIdx: number) => {
    if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current);
    setWipingIn(newSvcIdx);
    setWipingOut(oldSvcIdx);
    wipeTimerRef.current = setTimeout(() => {
      setSvcIdx(newSvcIdx);
      setWipingIn(null);
      setWipingOut(null);
      // FIX: pre-populate the first card of the incoming service so cards
      // are visible immediately after the wipe animation completes
      setVisibleCards(prev => {
        const next = new Map(prev);
        if (!next.has(newSvcIdx)) next.set(newSvcIdx, new Set());
        return next;
      });
    }, 600);
  }, []);

  const onScroll = useCallback(() => {
    if (!outerRef.current) return;
    const scrolled = -(outerRef.current.getBoundingClientRect().top);
    if (scrolled < 0) return;
    const stepIdx = Math.min(Math.floor(scrolled / SCROLL_PER_STEP), STEPS.length - 1);
    setProgress(Math.min(1, scrolled / totalScrollBudget));
    if (stepIdx === prevStepRef.current) return;
    prevStepRef.current = stepIdx;
    const step = STEPS[stepIdx];
    if (step.type === "wipe") {
      const old = prevSvcRef.current;
      if (step.svcIdx !== old) { prevSvcRef.current = step.svcIdx; triggerWipe(step.svcIdx, old); }
    } else {
      const { svcIdx: si } = step;
      // Build visible cards map from all steps up to and including current
      const newMap = new Map<number, Set<number>>();
      for (let i = 0; i <= stepIdx; i++) {
        const s = STEPS[i];
        if (s.type === "card") {
          if (!newMap.has(s.svcIdx)) newMap.set(s.svcIdx, new Set());
          newMap.get(s.svcIdx)!.add(s.cardIdx);
        }
      }
      setVisibleCards(newMap);
      if (si !== prevSvcRef.current) { prevSvcRef.current = si; setSvcIdx(si); }
    }
  }, [totalScrollBudget, triggerWipe]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (wipeTimerRef.current) clearTimeout(wipeTimerRef.current);
    };
  }, [onScroll]);

  function scrollToService(targetSvcIdx: number) {
    if (!outerRef.current) return;
    const firstStep = STEPS.findIndex(s => s.type === "card" && s.svcIdx === targetSvcIdx);
    if (firstStep === -1) return;
    const top = outerRef.current.getBoundingClientRect().top + window.scrollY + firstStep * SCROLL_PER_STEP;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const acc = PANEL_ACCENT[svcIdx];

  return (
    <>
      <div className="sv-intro">
        <div>
          <div className="sv-intro-eyebrow">What We Do</div>
          <h2 className="sv-intro-title">Services Built For <em>Scale</em></h2>
          <p className="sv-intro-sub">Eight capability areas. Every service engineered to compound — each mission we complete builds leverage for the next.</p>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div className="sv-intro-count-num">{SERVICE_GROUPS.length}</div>
          <div className="sv-intro-count-label">Service Pillars</div>
        </div>
      </div>

      <div ref={outerRef} className="sv-outer" style={{ height: outerHeight }}>
        <div className="sv-sticky" style={{ ["--acc" as string]: acc }}>

          <div className="sv-progress">
            <div className="sv-progress-fill" style={{ width:`${progress * 100}%` }} />
          </div>

          <div className="sv-rail">
            <span className="sv-rail-label">Services</span>
            <div className="sv-rail-sep" />
            <span className="sv-rail-cur" style={{ color:acc }}>{String(svcIdx+1).padStart(2,"0")}</span>
            <div className="sv-rail-sep" />
            <span className="sv-rail-total">{String(SERVICE_GROUPS.length).padStart(2,"0")}</span>
          </div>

          <div className="sv-panels">
            {SERVICE_GROUPS.map((svc, si) => {
              const svcAcc = PANEL_ACCENT[si];
              const isCurrent = si === svcIdx && wipingIn === null;
              const isWipingIn = si === wipingIn;
              const isWipingOut = si === wipingOut;
              const revealed = visibleCards.get(si) ?? new Set<number>();
              let panelClass = "sv-panel";
              if (isCurrent)    panelClass += " sv-current";
              if (isWipingIn)   panelClass += " sv-wipe-in";
              if (isWipingOut)  panelClass += " sv-wipe-out";

              return (
                <div key={svc.title} className={panelClass} style={{ ["--acc" as string]: svcAcc }}>

                  {/* Left: hero image */}
                  <div className="sv-img">
                    <img src={svc.image as unknown as string} alt={svc.title} loading={si < 2 ? "eager" : "lazy"} />
                    <div className="sv-img-grad" />
                    <div className="sv-img-stripes" />
                    <div className="sv-img-index">{String(si+1).padStart(2,"0")}</div>
                    <div className="sv-stat">
                      <span className="sv-stat-val">{svc.stat.value}</span>
                      <span className="sv-stat-lbl">{svc.stat.label}</span>
                    </div>
                  </div>

                  {/* Right: content column */}
                  <div className="sv-content">
                    <div className="sv-content-bar" />
                    <div className="sv-content-inner" key={`content-${si}-${isWipingIn?"in":"stable"}`}>

                      {/* Eyebrow */}
                      <div className="sv-eyebrow" style={{ color:svcAcc }}>
                        <div style={{ width:18, height:"1.5px", background:"currentColor", flexShrink:0 }} />
                        {svc.eyebrow}
                        <span className="sv-slash">/</span>
                        <span style={{ color:"rgba(255,255,255,.18)", fontWeight:400 }}>
                          {String(si+1).padStart(2,"0")}&nbsp;of&nbsp;{String(SERVICE_GROUPS.length).padStart(2,"0")}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="sv-title">
                        <span className="sv-title-top">{svc.titleTop}</span>
                        <span className="sv-title-btm">{svc.titleBtm}</span>
                      </div>

                      {/* Tagline */}
                      <p className="sv-tagline">{svc.tagline}</p>

                      {/* Rule */}
                      <div className="sv-rule" />

                      {/* Cards */}
                      <div className="sv-cards">
                        {svc.subImages.map((img, ci) => {
                          const { title, detail } = parseItem(svc.items[ci] ?? "");
                          const isVisible = revealed.has(ci);
                          return (
                            <div
                              key={img.label}
                              className={`sv-card${isVisible ? " sv-card-visible" : ""}`}
                              style={{ ["--acc" as string]: svcAcc, animationDelay: isVisible ? `${ci * 0.08}s` : "0s" }}
                              onClick={() => isVisible && setLightboxItem({ src:img.src, label:img.label, title, detail, acc:svcAcc, svcTitle:svc.title })}
                            >
                              <div className="sv-card-img">
                                <img src={img.src} alt={img.label} loading={si < 2 ? "eager" : "lazy"} />
                              </div>
                              <div className="sv-card-body">
                                <div className="sv-card-label">{img.label}</div>
                                <div className="sv-card-title">{title}</div>
                                {detail && <div className="sv-card-detail">{detail}</div>}
                                <div className="sv-card-arrow">Explore</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Step badge */}
                      <div className="sv-step-badge">
                        <span className="sv-step-cur" style={{ color:svcAcc }}>
                          {String(revealed.size).padStart(2,"0")}
                          <span style={{ fontSize:"0.9rem", fontWeight:300, color:"rgba(255,255,255,.18)", margin:"0 4px" }}>/</span>
                          {String(svc.subImages.length).padStart(2,"0")}
                        </span>
                        <span className="sv-step-label">Capabilities</span>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}

            {/* Nav dots */}
            <div className="sv-dots">
              {SERVICE_GROUPS.map((svc, di) => (
                <div key={di} className="sv-dot-wrap" onClick={() => scrollToService(di)}>
                  <button
                    className={`sv-dot${di === svcIdx ? " active" : ""}`}
                    style={{ background: di === svcIdx ? PANEL_ACCENT[di] : undefined }}
                  />
                  <div className="sv-dot-tip">{svc.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sv-ticker">
            <div className="sv-ticker-track">
              {[...Array(6)].flatMap((_, ri) =>
                SERVICE_GROUPS.map(s => (
                  <div key={`${ri}-${s.title}`} className="sv-ticker-item">
                    <div className="sv-ticker-dot" />{s.title}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

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
  return (
    <main className="bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav />
      <VideoHero />
      <ServicesSection />
    </main>
  );
}