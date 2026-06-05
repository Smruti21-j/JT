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
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(40px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-40px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .hero-carousel-slide {
    position: absolute; inset: 0;
    background-size: cover; background-position: center;
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

  /* ── Split layout ── */
  .split-section {
    display: flex;
    min-height: 100vh;
    background: #0a0a0a;
    position: relative;
  }

  /* LEFT — sticky text panel */
  .split-left {
    width: 42%;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(40px,6vw,90px) clamp(24px,4vw,60px) clamp(40px,6vw,90px) clamp(24px,5vw,80px);
    border-right: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
  }

  /* RIGHT — scrollable image panels */
  .split-right {
    flex: 1;
    min-width: 0;
  }

  /* Each service block on the right takes full viewport height */
  .svc-right-block {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(32px,5vh,64px) clamp(24px,4vw,56px);
    gap: 12px;
    position: relative;
  }

  /* Image grid inside each right block */
  .svc-img-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    height: calc(100vh - clamp(64px,10vh,128px));
  }

  /* Image card */
  .svc-img-card {
    position: relative; overflow: hidden;
    border-radius: 8px; background: #1a1a1a; cursor: pointer;
  }
  .svc-img-card img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .svc-img-card:hover img { transform: scale(1.07); }
  .svc-img-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent); transform: scaleX(0); transform-origin: left;
    transition: transform 0.38s cubic-bezier(0.16,1,0.3,1); z-index: 2;
  }
  .svc-img-card:hover::before { transform: scaleX(1); }
  .svc-img-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 44px 14px 12px;
    background: linear-gradient(to top, rgba(0,0,0,0.88), transparent);
    font-size: 9px; letter-spacing: 0.26em; text-transform: uppercase;
    color: rgba(255,255,255,0.4); transition: color 0.2s; z-index: 1;
  }
  .svc-img-card:hover .svc-img-label { color: var(--accent); }

  .svc-img-overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 32px 14px 14px;
    background: linear-gradient(to top, rgba(0,0,0,0.97) 65%, rgba(0,0,0,0.7) 85%, transparent 100%);
    transform: translateY(100%);
    transition: transform 0.48s cubic-bezier(0.16,1,0.3,1); z-index: 4;
  }
  .svc-img-card:hover .svc-img-overlay { transform: translateY(0); }
  .svc-img-overlay-cat {
    font-size: 8px; letter-spacing: 0.30em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 7px;
    display: flex; align-items: center; gap: 8px;
  }
  .svc-img-overlay-cat::before {
    content: ''; display: inline-block; width: 16px; height: 1px;
    background: var(--accent); flex-shrink: 0;
  }
  .svc-img-overlay-text {
    font-size: 10.5px; line-height: 1.68;
    color: rgba(255,255,255,0.76); letter-spacing: 0.01em;
  }

  /* Left text animations triggered by .is-active on the block */
  .left-content { transition: opacity 0.5s ease, transform 0.5s ease; }

  /* progress dots */
  .svc-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: rgba(255,255,255,0.18);
    transition: all 0.25s; flex-shrink: 0; cursor: pointer;
  }
  .svc-dot.active { transform: scale(1.6); }
`;

/* ── Video Hero (unchanged) ─────────────────────────────────────────────────── */
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

/* ── Split Services Section ─────────────────────────────────────────────────── */
function ServicesScrollSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver — whichever right block is most visible sets the left panel
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    blockRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIdx(i);
        },
        { threshold: 0.5 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const g = SERVICE_GROUPS[activeIdx];
  const accent = PANEL_ACCENT[activeIdx];

  return (
    <section className="split-section">
      <style>{`
        @keyframes leftFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .left-animated {
          animation: leftFadeIn 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>

      {/* ── LEFT sticky panel ── */}
      <div className="split-left" style={{ background: "#0a0a0a" }}>
        {/* accent bar */}
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, transparent, ${accent} 20%, ${accent} 80%, transparent)`, opacity: 0.7, transition: "background 0.5s ease" }} />

        {/* grid texture */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.012) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

        <div
          key={activeIdx}   // re-mount = re-animate on service change
          className="left-animated"
          style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 20 }}
        >
          {/* index */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: accent, fontWeight: 600 }}>
              {String(activeIdx + 1).padStart(2, "0")}
            </span>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.5 }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>
              {String(SERVICE_GROUPS.length).padStart(2, "0")}
            </span>
          </div>

          {/* eyebrow */}
          <p style={{ fontSize: 9, letterSpacing: "0.38em", textTransform: "uppercase", color: accent, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 22, height: 1, background: accent, flexShrink: 0 }} />
            {g.eyebrow}
          </p>

          {/* title */}
          <h2 style={{ fontSize: "clamp(2rem,4vw,3.6rem)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f0e8df" }}>
            {g.title}
          </h2>

          {/* divider */}
          <div style={{ height: 1, background: `linear-gradient(to right, ${accent}, transparent)`, opacity: 0.35, maxWidth: 280 }} />

          {/* tagline */}
          <p style={{ fontSize: "clamp(0.88rem,1.2vw,1.05rem)", lineHeight: 1.72, color: "rgba(240,232,220,0.6)", maxWidth: 380 }}>
            {g.tagline}
          </p>

          {/* stat */}
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 8 }}>
            <span style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 800, color: accent, lineHeight: 1, letterSpacing: "-0.03em" }}>
              {g.stat.value}
            </span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              {g.stat.label}
            </span>
          </div>

          {/* dots nav */}
          <div style={{ display: "flex", gap: 6, marginTop: 16 }}>
            {SERVICE_GROUPS.map((_, di) => (
              <button
                key={di}
                className={`svc-dot${di === activeIdx ? " active" : ""}`}
                style={{
                  background: di === activeIdx ? accent : "rgba(255,255,255,0.18)",
                  border: "none", cursor: "pointer", padding: 0,
                }}
                onClick={() => {
                  blockRefs.current[di]?.scrollIntoView({ behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT scrollable blocks ── */}
      <div className="split-right">
        {SERVICE_GROUPS.map((svc, i) => {
          const acc = PANEL_ACCENT[i];
          return (
            <div
              key={svc.title}
              ref={(el) => { blockRefs.current[i] = el; }}
              className="svc-right-block"
              style={{ "--accent": acc } as React.CSSProperties}
            >
              {/* 2×2 image grid */}
              <div className="svc-img-grid">
                {svc.subImages.map((si, idx) => {
                  const colonIdx = svc.items[idx]?.indexOf(":") ?? -1;
                  const cat    = colonIdx > -1 ? svc.items[idx].slice(0, colonIdx).trim() : "";
                  const detail = colonIdx > -1 ? svc.items[idx].slice(colonIdx + 1).trim() : svc.items[idx] ?? "";
                  return (
                    <div key={si.label} className="svc-img-card">
                      <img src={si.src} alt={si.label} loading="lazy" />
                      <div className="svc-img-label">{si.label}</div>
                      <div className="svc-img-overlay">
                        {cat && <div className="svc-img-overlay-cat">{cat}</div>}
                        <div className="svc-img-overlay-text">{detail}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
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