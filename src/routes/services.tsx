import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
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
// video assets
import heroVideoSrc from "@/assets/hero-video.mp4";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICE_GROUPS = [
  {
    title: "Artificial Intelligence",
    image: dataAiImg,
    eyebrow: "Neural Command Layer",
    tagline: "Move from AI that talks to AI that acts. We build the proactive engines that reason, plan, and execute missions across your entire business. ",
    
    stat: { value: "10×", label: "Decision velocity" },
    items: [
      "Generative AI & LLM Orchestration",
      "Autonomous Agent",
      "Smart AI Assistants",
      "LLM Substrates",
      "Deep Learning",
      "Model Fine-tuning",
      "Sentiment & Context Analysis",
      "Deep Learning & Neural Architectures",
      "Real-Time Sentiment & Intent Engine",
      "Conversational AI & Hyper-Bots",
      "Custom AI Application Foundries",
    ],
  },
  {
    title: "Digital Transformation",
    image: digitalImg,
    eyebrow: "Enterprise Singularity",
    tagline: "Reclaim your digital destiny. We transform legacy chaos into a self-evolving operating model where you own the data and the results .",
    
    stat: { value: "3×", label: "Time-to-market compression" },
    items: [
      "Enterprise Architecture",
      "Business Intelligence",
      "Architecture Resurgence (App Modernization)",
      "Sovereign System Integration",
      "Cloud & Hybrid Core",
      "Immersive Digital Experience",
      "Enterprise Mobility",
    ],
  },
  {
    title: "Product Engineering",
    image: productImg,
    eyebrow: "Precision Build Matrix",
    tagline: "Forge the impossible with future-fit engineering. We build resilient digital products designed for your infinite scale",
    //intro:
      //"We deploy elite engineering squads who treat software as a living organism — continuously evolving, self-healing and optimised for growth. From quantum-ready architectures to edge-deployed microservices, every system we craft is hardened for the demands of a world where downtime is extinction.",
    stat: { value: "98%", label: "On-time delivery rate" },
    items: [
      "Product Assessment & Design",
      "Application Re-Engineering",
      "Platform Engineering",
      "Custom High-Stakes Development",
      "Battle-Tested DevOps",
      "Precision Quality Assurance",
      "Elite Team Augmentation",
    ],
  },
  {
    title: "Application Transformation",
    image: appImg,
    eyebrow: "Omniscreen Deployment",
    tagline: "High-velocity platforms for a real-time world. We deploy the composable applications you need to optimize operations in near-real-time.  ",
    //intro:
      //"We engineer applications that exist seamlessly across every surface — from foldable screens to spatial computing environments. Our cross-platform architecture eliminates the ceiling between native performance and universal reach, delivering sub-second experiences that feel native to every device, OS and network condition.",
    stat: { value: "4.9★", label: "Avg. app store rating" },
    items: [
      "Responsive Web Ecosystem",
      "Progressive Web Apps (PWA)",
      "Mobile App Development",
      "Cross-Platform Architectures",
      "API Substrates & Integration",
      "Scalable Back-End",
    ],
  },
  {
    title: "UI / UX Design",
    image: uiuxImg,
    eyebrow: "Neuro-Experience Design",
    tagline: "Interfaces that sense human intent. We design the human-AI symbiosis that makes your brand feel natural and inevitable.  ",
    //intro:
      //"We design from the limbic system outward. Every micro-interaction, spatial rhythm and typographic choice is calibrated against neuroscience and behavioural data — creating digital environments where users feel effortlessly guided, emotionally connected and compelled to return. Design so precise it becomes invisible.",
    stat: { value: "62%", label: "Avg. engagement uplift" },
    items: [
      "Cognitive UX Research",
      "Usability Consulting",
      "Precision UX Design",
      "Intuitive UI Craftsmanship",
      "User Experience Strategy",
      "Specialized Design Squads",
    ],
  },
  {
    title: "Consulting",
    image: consultingImg,
    eyebrow: "Strategic Foresight Engine",
    tagline: "Turn technical complexity into unvarnished business clarity. We provide the blueprint for your world’s most important decisions.",
    //intro:
      //"Before a single line of code, we run your strategy through our proprietary foresight framework — mapping threat vectors, opportunity corridors and technology inflection points that most organisations won't see for two years. You leave every engagement with a high-conviction execution blueprint, not a deck of recommendations.",
    stat: { value: "85%", label: "Clients advance to build" },
    items: [
      "Business & Stakeholder Value",
      "Technology Strategy",
      "Product Strategy",
      "Sovereign Data Strategy",
      "Impact-Driven Roadmapping",
      "CX Strategy",
    ],
  },
  {
    title: "Performance & Growth",
    image: growthImg,
    eyebrow: "Perpetual Optimisation Loop",
    tagline: "Stop chasing vanity metrics; start commanding results. Activate a continuous cycle of optimization that drives your growth.",
    //intro:
      //"We install a self-improving intelligence layer on top of your existing digital estate. Behavioural signals feed predictive models that autonomously surface friction, personalise journeys and redistribute traffic — creating a flywheel of compounding growth that accelerates while your competitors are still reading last quarter's analytics.",
    stat: { value: "2.4×", label: "Avg. revenue multiplier" },
    items: [
      "Experience & Conversion Optimization",
      "1:1 Personalization",
      "Real-Time Tracking & Analytics",
      "SEO (GEO & AIO)",
      "Intelligent BI Consultancy, Impact Dashboard",
      
    ],
  },
  {
    title: "Managed Services",
    image: managedImg,
    eyebrow: "Autonomous Operations Grid",
    tagline: "The self-healing backbone for your digital core. We keep your IT secure and invisible so you can focus purely on your scale.",
    //intro:
      //"We operate your digital estate like a mission-critical spacecraft — with autonomous threat neutralisation, predictive capacity scaling and zero-downtime deployment protocols running continuously in the background. Your engineering team focuses on innovation. We ensure the ground beneath them never shifts.",
    stat: { value: "99.9%", label: "Guaranteed uptime SLA" },
    items: [
      "Intelligent IT Ops & Support, 24/7 Application Support.",
      "Preemptive Cybersecurity, Compliance & Risk Governance",
      "Architecture Resurgence, Sovereign Cloud Hosting.",
    ],
  },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const STYLES = `
  @keyframes imgEnter {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes imgExit {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(-28px) scale(1.02); }
  }
  @keyframes txtEnter {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes numEnter {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroTextIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroLineIn {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes scanDown {
    0%   { top: 0; opacity: 0.7; }
    100% { top: 100%; opacity: 0; }
  }
  @keyframes videoFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .fa-img-enter { animation: imgEnter 0.55s cubic-bezier(0.22,1,0.36,1) both; }
  .fa-img-exit  { animation: imgExit  0.4s  cubic-bezier(0.4,0,1,1) both; }
  .fa-txt-enter { animation: txtEnter 0.5s  cubic-bezier(0.22,1,0.36,1) both; }
  .fa-txt-enter-d1 { animation: txtEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.06s both; }
  .fa-txt-enter-d2 { animation: txtEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
  .fa-txt-enter-d3 { animation: txtEnter 0.5s cubic-bezier(0.22,1,0.36,1) 0.18s both; }
  .fa-num-enter { animation: numEnter 0.6s cubic-bezier(0.22,1,0.36,1) both; }

  .fa-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(255,255,255,0.2);
    transition: background 0.3s ease, transform 0.3s ease;
    flex-shrink: 0;
  }
  .fa-dot.active {
    background: rgb(255,130,50);
    transform: scale(1.4);
  }

  .svc-item {
    display: flex; align-items: center; gap: 12px;
    font-size: 12px; line-height: 1.6;
    color: rgba(240,232,223,0.38);
    transition: color 0.2s ease;
  }
  .svc-item:hover { color: rgba(240,232,223,0.7); }
`;

// ─── Video Hero ───────────────────────────────────────────────────────────────
function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#080604",
      }}
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        src={heroVideoSrc}
        autoPlay
        loop
        muted={muted}
        playsInline
        onCanPlay={() => setLoaded(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 0.55 : 0,
          filter: "saturate(0.7) brightness(0.65)",
          transition: "opacity 1.2s ease",
          animation: loaded ? "videoFadeIn 1.2s ease forwards" : "none",
        }}
      />

      {/* Gradient overlays — bottom darkens for text legibility */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,4,0.25) 0%, rgba(8,6,4,0.1) 40%, rgba(8,6,4,0.72) 80%, rgba(8,6,4,1) 100%)" }} />
      {/* Left gradient for text area */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(8,6,4,0.5) 0%, transparent 55%)" }} />
      {/* Orange radial glow bottom-left */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "600px", height: "400px", background: "radial-gradient(ellipse at bottom left, rgba(255,80,10,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Scanning line effect */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,100,30,0.6), transparent)",
        animation: "scanDown 6s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* Orange left-edge accent */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "3px", background: "linear-gradient(to bottom, transparent 10%, rgba(255,110,30,0.8) 40%, rgba(255,110,30,0.8) 70%, transparent 90%)" }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* ── Text content — bottom-left, cinematic ── */}
      <div style={{
        position: "absolute",
        bottom: "80px",
        left: 0,
        right: 0,
        padding: "0 64px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        <div style={{ maxWidth: "720px" }}>

          {/* Eyebrow */}
          <p style={{
            fontSize: "10px", letterSpacing: "0.35em", textTransform: "uppercase",
            color: "rgb(255,130,50)", marginBottom: "20px",
            animation: "heroTextIn 0.6s 0.3s cubic-bezier(0.4,0,0.2,1) both",
            opacity: 0,
          }}>
            WHAT WE DO
          </p>

          {/* Main heading */}
          <h1 style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 700,
            color: "#f0e8df",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            marginBottom: "24px",
            animation: "heroTextIn 0.7s 0.42s cubic-bezier(0.4,0,0.2,1) both",
            opacity: 0,
          }}>
            IMPACT{" "}
            <em style={{ fontStyle: "italic", fontWeight: 300, color: "rgb(255,130,50)" }}>
              WITNESSED
            </em>{" "}
           
          </h1>

          {/* Animated orange underline */}
          <div style={{ position: "relative", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px", maxWidth: "480px", overflow: "hidden" }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgb(255,130,50), rgba(255,180,80,0.3))",
              animation: "heroLineIn 1s 0.9s cubic-bezier(0.4,0,0.2,1) both",
              width: 0,
            }} />
          </div>

          {/* Description */}
          <p style={{
            fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)",
            color: "rgba(240,232,220,0.55)",
            lineHeight: 1.75,
            maxWidth: "560px",
            animation: "heroTextIn 0.6s 0.58s cubic-bezier(0.4,0,0.2,1) both",
            opacity: 0,
          }}>
            See your future in action. Explore the missions where we turned bold ambition into a scalable reality. These global leaders didn't just build software - they used our intelligence layer to gain decision authority and command their markets.
          </p>
        </div>
      </div>

      {/* ── Controls: mute toggle + scroll cue ── */}
      <div style={{ position: "absolute", bottom: "32px", right: "48px", display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Mute toggle */}
        <button
          onClick={() => setMuted(m => !m)}
          style={{
            background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "50%", width: "40px", height: "40px",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "rgba(255,255,255,0.55)", transition: "all 0.2s",
          }}
          title={muted ? "Unmute" : "Mute"}
        >
          {muted ? (
            // Muted icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            // Sound on icon
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          )}
        </button>
      </div>

      {/* Scroll cue arrow */}
      <div style={{
        position: "absolute", bottom: "28px", left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
        animation: "heroTextIn 0.6s 1.1s both",
        opacity: 0,
      }}>
        <span style={{ fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}>Scroll</span>
        <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(255,130,50,0.6), transparent)", animation: "scanDown 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}

// ─── The fromanother-style scroll-driven services section ─────────────────────
function ServicesScrollSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeRef = useRef(0);
  const ticking = useRef(false);

  const total = SERVICE_GROUPS.length;
  const SCROLL_PER = 1.2;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrolled = -rect.top;
        const totalScrollable = section.offsetHeight - window.innerHeight;
        const raw = Math.max(0, Math.min(1, scrolled / totalScrollable));
        const newActive = Math.min(total - 1, Math.floor(raw * total));

        if (newActive !== activeRef.current) {
          setPrevActive(activeRef.current);
          setIsTransitioning(true);
          activeRef.current = newActive;
          setActive(newActive);
          setTimeout(() => {
            setPrevActive(null);
            setIsTransitioning(false);
          }, 450);
        }
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [total]);

  const g = SERVICE_GROUPS[active];
  const prevG = prevActive !== null ? SERVICE_GROUPS[prevActive] : null;

  return (
    <section
      ref={sectionRef}
      style={{
        height: `calc(100vh + ${total * SCROLL_PER * 100}vh)`,
        position: "relative",
      }}
    >
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: "#0b0907", display: "flex", flexDirection: "column",
      }}>
        <div style={{
          flex: 1, display: "grid",
          gridTemplateColumns: "64px 1fr 320px",
          gridTemplateRows: "1fr",
          position: "relative",
        }}>
          {/* LEFT SIDEBAR */}
          <div style={{
            display: "flex", flexDirection: "column", justifyContent: "center",
            alignItems: "center", gap: "20px", padding: "60px 0",
            borderRight: "1px solid rgba(255,255,255,0.05)", position: "relative",
          }}>
            {SERVICE_GROUPS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative", width: "100%", justifyContent: "flex-end", paddingRight: "16px" }}>
                {i === active && (
                  <div style={{ position: "absolute", right: "28px", display: "flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap", animation: "txtEnter 0.4s cubic-bezier(0.22,1,0.36,1) both" }}>
                    <span style={{ display: "block", width: "16px", height: "1px", background: "rgb(255,130,50)" }} />
                    <span style={{ fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,130,50,0.8)" }}>{s.title.split(" ")[0]}</span>
                  </div>
                )}
                <span style={{ fontSize: "10px", color: i === active ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.18)", fontVariantNumeric: "tabular-nums", transition: "color 0.3s ease", lineHeight: 1 }}>
                  {i + 1}
                </span>
              </div>
            ))}
          </div>

          {/* CENTER IMAGE */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div key={`num-${active}`} className="fa-num-enter" style={{ position: "absolute", bottom: "20px", left: "32px", fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif", fontSize: "clamp(100px,14vw,200px)", fontWeight: 800, lineHeight: 1, color: "rgba(255,255,255,0.06)", letterSpacing: "-0.04em", userSelect: "none", zIndex: 0, pointerEvents: "none" }}>
              {String(active + 1).padStart(2, "0")}
            </div>

            {prevG && (
              <div className="fa-img-exit" style={{ position: "absolute", width: "min(420px,55%)", aspectRatio: "4/3", borderRadius: "4px", overflow: "hidden", zIndex: 2, pointerEvents: "none" }}>
                <img src={prevG.image} alt={prevG.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            )}

            <div key={`img-${active}`} className="fa-img-enter" style={{ position: "relative", width: "min(420px,55%)", aspectRatio: "4/3", borderRadius: "4px", overflow: "hidden", zIndex: 3, boxShadow: "0 40px 80px -20px rgba(0,0,0,0.8),0 0 0 1px rgba(255,255,255,0.06)" }}>
              <img src={g.image} alt={g.title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.9) saturate(0.85)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 55%,rgba(0,0,0,0.35) 100%)" }} />
              <div style={{ position: "absolute", bottom: "14px", right: "14px", padding: "8px 12px", background: "rgba(10,8,6,0.88)", border: "1px solid rgba(255,100,30,0.3)", backdropFilter: "blur(8px)", borderRadius: "6px", textAlign: "right" }}>
                <div style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1, color: "rgb(255,130,50)", fontFamily: "'Barlow Condensed',sans-serif" }}>{g.stat.value}</div>
                <div style={{ fontSize: "8px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", marginTop: "3px" }}>{g.stat.label}</div>
              </div>
            </div>

            {prevG && prevActive !== null && prevActive < active && (
              <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "min(420px,55%)", height: "80px", overflow: "hidden", borderRadius: "0 0 4px 4px", opacity: 0.35, pointerEvents: "none", zIndex: 1 }}>
                <img src={prevG.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", filter: "brightness(0.6) blur(1px)" }} />
              </div>
            )}
          </div>

          {/* RIGHT TEXT */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 48px 60px 24px", borderLeft: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "30%", right: 0, width: "220px", height: "220px", borderRadius: "50%", background: "radial-gradient(circle,rgba(255,90,20,0.06) 0%,transparent 70%)", pointerEvents: "none" }} />
            <div key={`txt-${active}`} style={{ position: "relative", zIndex: 1 }}>
              <p className="fa-txt-enter" style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgb(255,130,50)", marginBottom: "12px", opacity: 0 }}>{g.eyebrow}</p>
              <h2 className="fa-txt-enter-d1" style={{ fontFamily: "'Barlow Condensed','Arial Narrow',sans-serif", fontSize: "clamp(22px,2.2vw,32px)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.02em", lineHeight: 1.05, color: "#f0e8df", margin: 0, marginBottom: "8px", opacity: 0 }}>{g.title}</h2>
              <p className="fa-txt-enter-d1" style={{ fontFamily: "Georgia,serif", fontStyle: "italic", fontSize: "13px", lineHeight: 1.6, color: "rgba(255,200,140,0.65)", marginBottom: "16px", opacity: 0 }}>{g.tagline}</p>
              <p className="fa-txt-enter-d2" style={{ fontSize: "13px", lineHeight: 1.8, color: "rgba(240,232,223,0.42)", marginBottom: "24px", opacity: 0 }}>{g.intro}</p>
              <div style={{ width: "32px", height: "1px", background: "linear-gradient(to right,rgba(255,130,50,0.7),transparent)", marginBottom: "18px" }} />
              <ul className="fa-txt-enter-d3" style={{ listStyle: "none", padding: 0, margin: 0, opacity: 0 }}>
                {g.items.slice(0, 6).map(item => (
                  <li key={item} className="svc-item" style={{ marginBottom: "8px" }}>
                    <span style={{ width: "14px", height: "1px", flexShrink: 0, background: "rgb(255,130,50)", display: "block" }} />
                    {item}
                  </li>
                ))}
                {g.items.length > 6 && (
                  <li style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,130,50,0.45)", textTransform: "uppercase", marginTop: "4px", paddingLeft: "26px" }}>+{g.items.length - 6} more</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: "44px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(11,9,7,0.9)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,130,50,0.6)" }}>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.1)", display: "block" }} />
            <span key={`label-${active}`} className="fa-txt-enter" style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", opacity: 0 }}>{g.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)" }}>Scroll</span>
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {SERVICE_GROUPS.map((_, i) => (
                <div key={i} className={`fa-dot${i === active ? " active" : ""}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Jarvis Technolabs" },
      { name: "description", content: "Build, scale and modernise apps with our services — AI, Digital Transformation, Product Engineering, App Dev, UI/UX, Consulting, Growth and Managed Services." },
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

      {/* ── VIDEO HERO — replaces AnimatedHero ── */}
      <VideoHero />

      {/* ── fromanother scroll-driven services ── */}
      <ServicesScrollSection />

      <Footer />
    </main>
  );
}