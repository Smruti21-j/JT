import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState, useCallback } from "react";
import aboutImg from "@/assets/page-about.jpg";
import aboutImg2 from "/public/About1.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────
const VMV = [
  {
    label: "Vision",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    body: "To cultivate a legacy of trust by transmuting complex challenges into excellent value — building an enduring enterprise that makes the impossible the industry benchmark.",
  },
  {
    label: "Mission",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    body: "To ignite disruptive growth through the seamless integration of digital innovation and human ingenuity — enabling businesses to leverage technology as an unfair advantage.",
  },
  {
    label: "Values",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    body: "Integrity is not a line in a contract — it is the bedrock upon which every grand ambition is built. Transparency, dignity, and trust are the mortar between every stone we lay.",
  },
];

const STORY_CHAPTERS = [
  {
    n: "01",
    heading: "The Philosophy",
    sub: "Approach",
    body: "Imagine a world where software isn't a cost centre, but a scalable engine for economic value. This isn't about building tools — it's about engineering outcomes. By stripping away technical noise, the focus remains on clarity and measurable impact. Every architecture is a bridge to the future, designed to turn complex bottlenecks into streamlined, automated pathways.",
  },
  {
    n: "02",
    heading: "The North Star",
    sub: "Vision & Mission",
    body: "The Vision: To cultivate a legacy of trust by transmuting complex challenges into excellent value. The Mission: To ignite disruptive growth through the seamless integration of digital innovation and human ingenuity.",
  },
  {
    n: "03",
    heading: "The Ethos",
    sub: "Values",
    body: "Integrity is not a line in a contract; it is the bedrock upon which every grand ambition is built. In a world of shifting sands, transparency acts as the mortar — invisible yet essential. By honouring every interaction with dignity, a fortress of trust is constructed, ensuring the foundation remains unshakable as the enterprise scales.",
  },
];

const DIRECTIVES = [
  {
    n: "01",
    title: "The Impact Echo",
    question: "Does the signal reach the horizon?",
    body: "In the hunt for digital transformation, the goal isn't to 'finish' a task, but to create a permanent ripple. If the solution doesn't fundamentally shift the trajectory of the business, it is merely noise. True innovation is measured by the resonance it leaves behind — long after the code is deployed.",
    ask: "Is this a temporary fix, or a permanent evolution?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Synthetic Intuition",
    question: "Thinking beyond the human limit.",
    body: "The era of 'using' tools is over. The new standard is an AI-native pulse — a seamless blend of seasoned wisdom and algorithmic speed. By embedding automation into the very DNA of the strategy, the 'impossible' is decoded in real-time.",
    ask: "What could happen if your strategy thought a thousand times faster than your competitors?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44L5 12h2M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44L19 12h-2" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "The Infinite Blueprint",
    question: "Engineering the immortality of success.",
    body: "To scale is to ensure that brilliance never fades. By capturing 'lightning in a bottle' and turning it into a living, breathing digital map, success is no longer a lucky strike — it is a repeatable harvest. These scalable solutions ensure that today's peak becomes tomorrow's basecamp.",
    ask: "Are you building a monument that stands still, or a city that grows itself?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "The Velocity Paradox",
    question: "Doing less to achieve everything.",
    body: "The future belongs to the precise, not the busy. By isolating the 'Heart-Line' — the vital few movements that spark 80% of the value — innovation is delivered at a pace that feels like magic. It is the art of arriving at the destination while others are still packing their bags.",
    ask: "If you could only keep one feature to save the company, which one would it be?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Unfiltered Light",
    question: "The shortest path to the summit.",
    body: "Complexity often hides in the shadows of 'polite' feedback. Transformation requires the unvarnished truth. This is a partnership built on radical transparency — the kind that prioritises the health of the enterprise over the comfort of the boardroom.",
    ask: "Would you rather hear a beautiful lie, or see the map to a real solution?",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
];

// ─── Global styles ─────────────────────────────────────────────────────────────
const ABOUT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap');

  @keyframes abt-fadeUp {
    from { opacity: 0; transform: translateY(36px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes abt-fadeLeft {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes abt-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes abt-lineGrowY {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes abt-numIn {
    from { opacity: 0; transform: translateY(20px) skewY(4deg); }
    to   { opacity: 1; transform: translateY(0) skewY(0deg); }
  }
  @keyframes abt-glowPulse {
    0%, 100% { opacity: 0.06; }
    50%       { opacity: 0.12; }
  }
  @keyframes abt-counterUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes abt-marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes abt-chapterReveal {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes abt-orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    40%       { transform: translate(20px, -15px) scale(1.04); }
    70%       { transform: translate(-15px, 10px) scale(0.97); }
  }
  @keyframes abt-scanLine {
    from { transform: translateX(-100%); }
    to   { transform: translateX(200%); }
  }
  @keyframes abt-gridIn {
    from { opacity: 0; }
    to   { opacity: 0.03; }
  }
  @keyframes abt-particleDrift {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
  }
  @keyframes abt-borderPulse {
    0%, 100% { border-color: rgba(255,110,30,0.12); }
    50%       { border-color: rgba(255,110,30,0.35); }
  }
  @keyframes abt-numberRoll {
    from { transform: translateY(40px); opacity: 0; }
    to   { transform: translateY(0); opacity: 1; }
  }
  @keyframes abt-lineExpand {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes abt-activeGlow {
    0%, 100% { box-shadow: 0 0 20px rgba(255,90,20,0.15); }
    50%       { box-shadow: 0 0 40px rgba(255,90,20,0.3); }
  }
  @keyframes abt-progressFill {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes abt-cardFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes abt-heatBloom {
    0%, 100% { transform: translate3d(-4%, 4%, 0) scale(0.95) rotate(-2deg); opacity: 0.22; }
    40% { transform: translate3d(5%, -3%, 0) scale(1.08) rotate(5deg); opacity: 0.52; }
    70% { transform: translate3d(1%, 5%, 0) scale(1.02) rotate(-4deg); opacity: 0.36; }
  }
  @keyframes abt-titleFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes abt-sparkFall {
    from { transform: translateY(-120px); opacity: 0; }
    18%, 72% { opacity: 0.75; }
    to { transform: translateY(620px); opacity: 0; }
  }

  .abt-vis {
    animation: abt-fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both;
  }
  .abt-vis-left {
    animation: abt-fadeLeft 0.7s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* Chapter row hover */
  .chapter-row {
    transition: background 0.3s ease;
    cursor: default;
  }
  .chapter-row:hover { background: rgba(255,90,20,0.03) !important; }
  .chapter-row:hover .chapter-num { opacity: 0.35 !important; color: rgb(255,130,50) !important; }
  .chapter-row:hover .chapter-accent { opacity: 1 !important; transform: scaleY(1) !important; }

  /* VMV card hover */
  .vmv-card {
    transition: background 0.3s ease, transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease;
  }
  .vmv-card:hover {
    background: rgba(255,90,20,0.04) !important;
    transform: translateY(-4px);
    box-shadow: 0 24px 48px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,110,30,0.12) !important;
  }
  .vmv-card:hover .vmv-icon {
    background: rgba(255,90,20,0.16) !important;
    border-color: rgba(255,110,30,0.5) !important;
    box-shadow: 0 0 20px rgba(255,90,10,0.2) !important;
  }

  /* Directive card — new card-based design */
  .dir-card {
    position: relative;
    transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    cursor: pointer;
  }
  .dir-card:hover .dir-card-num {
    color: rgba(255,130,50,0.6) !important;
  }
  .dir-card.is-active {
    animation: abt-activeGlow 3s ease-in-out infinite;
  }
  .dir-card-progress {
    position: absolute;
    bottom: 0; left: 0; height: 2px;
    background: linear-gradient(to right, rgba(255,110,30,0.8), rgba(255,60,0,0.4));
    transform-origin: left;
    transition: width 0.05s linear;
  }

  /* Statement marquee */
  .abt-marquee {
    animation: abt-marquee 30s linear infinite;
  }

  /* Glow bg */
  .abt-glow {
    animation: abt-glowPulse 5s ease-in-out infinite;
  }

  /* Particle */
  .abt-particle {
    animation: abt-particleDrift linear infinite;
  }
  .abt-forge-glow {
    position: absolute;
    inset: 6% 8% auto auto;
    width: min(820px, 70vw);
    height: 480px;
    border-radius: 999px;
    background:
      radial-gradient(circle at 24% 42%, rgba(255, 208, 122, 0.22), transparent 22%),
      radial-gradient(circle at 48% 52%, rgba(255, 116, 38, 0.38), transparent 27%),
      radial-gradient(circle at 76% 34%, rgba(255, 90, 20, 0.24), transparent 24%);
    filter: blur(42px);
    mix-blend-mode: screen;
    animation: abt-heatBloom 14s ease-in-out infinite;
    pointer-events: none;
  }
  .abt-forge-title {
    animation: abt-titleFloat 8s ease-in-out infinite;
  }
  .abt-spark {
    position: absolute;
    top: 0;
    width: 2px;
    height: 92px;
    background: linear-gradient(to bottom, transparent, rgba(255,130,50,.58), transparent);
    animation: abt-sparkFall 8s linear infinite;
    pointer-events: none;
  }
`;

// ─── Animated counter ─────────────────────────────────────────────────────────
function Counter({
  to,
  suffix = "",
  decimals = 0,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const dur = 1800;
          const tick = () => {
            const p = Math.min(1, (Date.now() - start) / dur);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(parseFloat((ease * to).toFixed(decimals)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, decimals]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// ─── useInView helper ─────────────────────────────────────────────────────────
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ─── Chapter row ──────────────────────────────────────────────────────────────
function ChapterRow({ ch, index }: { ch: (typeof STORY_CHAPTERS)[0]; index: number }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="chapter-row"
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr 1fr",
        gap: "0",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "#0c0a07",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s, background 0.3s ease`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Left orange accent line */}
      <div
        className="chapter-accent"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: "2px",
          background: "linear-gradient(to bottom, transparent, rgba(255,110,30,0.7), transparent)",
          transformOrigin: "top",
          transform: "scaleY(0)",
          opacity: 0,
          transition: "transform 0.5s ease, opacity 0.3s ease",
        }}
      />

      {/* Number */}
      <div style={{ padding: "44px 40px 44px 44px", display: "flex", alignItems: "flex-start" }}>
        <span
          className="chapter-num"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(3.5rem,6vw,5.5rem)",
            fontWeight: 400,
            fontStyle: "italic",
            lineHeight: 1,
            color: "rgba(255,130,50,0.12)",
            letterSpacing: "-0.02em",
            transition: "opacity 0.3s ease, color 0.3s ease",
            userSelect: "none",
          }}
        >
          {ch.n}
        </span>
      </div>

      {/* Heading */}
      <div
        style={{
          padding: "44px 40px",
          borderLeft: "1px solid rgba(255,255,255,0.05)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "8px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "rgb(255,130,50)",
            marginBottom: "10px",
          }}
        >
          {ch.sub}
        </span>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            fontSize: "clamp(22px, 2.5vw, 34px)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            lineHeight: 1.05,
            color: "#f0e8df",
            margin: 0,
          }}
        >
          {ch.heading}
        </h3>
      </div>

      {/* Body */}
      <div style={{ padding: "44px 44px 44px 40px", display: "flex", alignItems: "center" }}>
        <p
          style={{ fontSize: "13px", lineHeight: 1.85, color: "rgba(240,232,220,0.4)", margin: 0 }}
        >
          {ch.body}
        </p>
      </div>
    </div>
  );
}

// ─── NEW: Directive Card (cinematic card-based design) ─────────────────────────
function DirectiveCards() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const progressRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const DURATION = 6000; // ms per card

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = (now: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;
      progressRef.current = Math.min(progressRef.current + (delta / DURATION) * 100, 100);
      setProgress(progressRef.current);
      if (progressRef.current >= 100) {
        setActiveIdx((prev) => {
          const next = (prev + 1) % DIRECTIVES.length;
          progressRef.current = 0;
          lastTimeRef.current = now;
          setProgress(0);
          return next;
        });
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    lastTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [paused, activeIdx]);

  const [sectionRef, sectionVis] = useInView(0.1);
  const active = DIRECTIVES[activeIdx];

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: sectionVis ? 1 : 0,
        transform: sectionVis ? "none" : "translateY(40px)",
        transition:
          "opacity 1s cubic-bezier(0.22,1,0.36,1), transform 1s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Main layout: sidebar tabs + feature card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: "2px",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {/* ── LEFT: Tab list ──────────────────────────────────────────────── */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", background: "#0b0908" }}>
          {DIRECTIVES.map((d, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={d.n}
                onClick={() => {
                  goTo(i);
                  setPaused(false);
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="dir-card"
                style={{
                  padding: "22px 24px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  background: isActive ? "rgba(255,90,20,0.06)" : "transparent",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Active left bar */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "3px",
                    background: isActive
                      ? "linear-gradient(to bottom, rgba(255,110,30,0.9), rgba(255,60,0,0.5))"
                      : "transparent",
                    transition: "background 0.4s ease",
                  }}
                />

                {/* Progress bar at bottom */}
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: "1.5px",
                      width: `${progress}%`,
                      background:
                        "linear-gradient(to right, rgba(255,110,30,0.9), rgba(255,60,0,0.4))",
                      transition: "width 0.05s linear",
                    }}
                  />
                )}

                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span
                    className="dir-card-num"
                    style={{
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "11px",
                      color: isActive ? "rgba(255,130,50,0.7)" : "rgba(255,255,255,0.2)",
                      transition: "color 0.3s ease",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    {d.n}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                        fontSize: "15px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        color: isActive ? "rgb(255,150,60)" : "rgba(240,232,220,0.55)",
                        lineHeight: 1.2,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {d.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Georgia, serif",
                        fontStyle: "italic",
                        fontSize: "11px",
                        color: "rgba(240,232,220,0.22)",
                        marginTop: "3px",
                        lineHeight: 1.4,
                      }}
                    >
                      {d.question}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT: Feature panel ─────────────────────────────────────────── */}
        <div
          key={activeIdx}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{
            position: "relative",
            padding: "48px 52px",
            background: "#0d0b09",
            overflow: "hidden",
            minHeight: "420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            animation: "abt-fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        >
          {/* Ambient orb */}
          <div
            style={{
              position: "absolute",
              top: "-20%",
              right: "-10%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,90,20,0.07) 0%, transparent 65%)",
              animation: "abt-orbFloat 10s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />

          {/* Scan line */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,130,50,0.4), transparent)",
              animation: "abt-scanLine 3s linear infinite",
              pointerEvents: "none",
            }}
          />

          {/* Floating particles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="abt-particle"
              style={{
                position: "absolute",
                width: "2px",
                height: "2px",
                borderRadius: "50%",
                background: "rgba(255,130,50,0.4)",
                left: `${20 + i * 15}%`,
                bottom: "10%",
                animationDuration: `${3 + i * 0.8}s`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Number + icon */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255,110,30,0.25)",
                  background: "rgba(255,90,20,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgb(255,130,50)",
                  flexShrink: 0,
                }}
              >
                {active.icon}
              </div>
              <div>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "12px",
                    color: "rgba(255,130,50,0.5)",
                    display: "block",
                    marginBottom: "2px",
                  }}
                >
                  Directive {active.n}
                </span>
                <div
                  style={{
                    height: "1px",
                    width: "60px",
                    background: "linear-gradient(to right, rgba(255,110,30,0.6), transparent)",
                    animation: "abt-lineExpand 0.8s cubic-bezier(0.22,1,0.36,1) forwards",
                  }}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontSize: "clamp(32px, 3.5vw, 52px)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                lineHeight: 0.95,
                color: "#f0e8df",
                margin: "0 0 8px",
              }}
            >
              {active.title}
            </h3>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "14px",
                color: "rgba(255,160,80,0.5)",
                margin: "0 0 28px",
              }}
            >
              "{active.question}"
            </p>

            {/* Body */}
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.9,
                color: "rgba(240,232,220,0.48)",
                maxWidth: "520px",
              }}
            >
              {active.body}
            </p>
          </div>

          {/* Bottom ask card */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: "36px",
              padding: "20px 24px",
              borderRadius: "8px",
              background: "rgba(255,100,20,0.05)",
              border: "1px solid rgba(255,100,20,0.14)",
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              animation: "abt-borderPulse 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                border: "1px solid rgba(255,110,30,0.3)",
                background: "rgba(255,90,20,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: "1px",
              }}
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgb(255,130,50)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: "13px",
                color: "rgba(255,180,100,0.65)",
                lineHeight: 1.75,
              }}
            >
              {active.ask}
            </span>
          </div>

          {/* Nav dots */}
          <div
            style={{
              position: "absolute",
              bottom: "24px",
              right: "28px",
              display: "flex",
              gap: "6px",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {DIRECTIVES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                style={{
                  width: i === activeIdx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === activeIdx ? "rgb(255,130,50)" : "rgba(255,255,255,0.15)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Jarvis Technolabs" },
      {
        name: "description",
        content: "The Catalyst, Not the Vendor. Stop chasing the digital curve — chart it.",
      },
      { property: "og:title", content: "About — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Technology is never a line item — it is an unfair advantage.",
      },
    ],
  }),
});

// ─── Page ─────────────────────────────────────────────────────────────────────
function AboutPage() {
  useReveal();

  const manifestoRef = useRef<HTMLElement>(null);
  const [manifestoVis, setManifestoVis] = useState(false);
  const vmvRef = useRef<HTMLDivElement>(null);
  const [vmvVis, setVmvVis] = useState(false);
  const directivesHeaderRef = useRef<HTMLDivElement>(null);
  const [dirHeaderVis, setDirHeaderVis] = useState(false);

  useEffect(() => {
    const entries: [React.RefObject<HTMLElement | HTMLDivElement>, (v: boolean) => void][] = [
      [manifestoRef, setManifestoVis],
      [vmvRef, setVmvVis],
      [directivesHeaderRef, setDirHeaderVis],
    ];
    const observers = entries.map(([ref, setter]) => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            setter(true);
            obs.disconnect();
          }
        },
        { threshold: 0.12 },
      );
      if (ref.current) obs.observe(ref.current);
      return obs;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen" style={{ background: "#0a0806" }}>
      <style>{ABOUT_STYLES}</style>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <AnimatedHero
        bgImage={aboutImg}
        eyebrow="ABOUT US"
        title={
          <>
            The Catalyst, <em className="text-shimmer not-italic font-light">Not the Vendor.</em>
          </>
        }
        description="Stop chasing the digital curve — chart it. The world has enough vendors; it craves a catalyst."
      />

      {/* ── MANIFESTO — full-bleed two-col editorial ─────────────────────── */}
      <section
        ref={manifestoRef}
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
          paddingTop: "7rem",
          paddingBottom: "7rem",
        }}
      >
        {/* Ambient background glow */}
        <div
          className="abt-glow"
          style={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,90,20,0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Decorative large faint text */}
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(100px, 16vw, 220px)",
            fontWeight: 900,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.018)",
            letterSpacing: "-0.04em",
            userSelect: "none",
            pointerEvents: "none",
            lineHeight: 1,
          }}
        >
          CATALYST
        </div>

        <div className="mx-auto max-w-7xl px-6" style={{ position: "relative", zIndex: 1 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "rgba(255,130,50,0.65)",
              marginBottom: "56px",
              opacity: manifestoVis ? 1 : 0,
              transform: manifestoVis ? "none" : "translateY(14px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            THE CATALYST MANIFESTO
          </p>

          {/* Main layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "start",
            }}
          >
            {/* LEFT */}
            <div
              style={{
                opacity: manifestoVis ? 1 : 0,
                transform: manifestoVis ? "none" : "translateY(40px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(44px, 6.5vw, 90px)",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                  color: "#f0e8df",
                  margin: 0,
                }}
              >
                THE REACTIVE
                <br />
                <span
                  style={{
                    color: "rgb(255,130,50)",
                    fontWeight: 300,
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    textTransform: "none",
                    fontSize: "0.82em",
                  }}
                >
                  "break-fix"
                </span>
                <br />
                SCRIPT BELONGS
                <br />
                TO THE PAST.
              </h2>

              <div
                style={{
                  marginTop: "40px",
                  height: "1px",
                  width: "80%",
                  background: "linear-gradient(to right, rgba(255,110,30,0.6), transparent)",
                  transformOrigin: "left",
                  transform: manifestoVis ? "scaleX(1)" : "scaleX(0)",
                  transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.5s",
                }}
              />
            </div>

            {/* RIGHT */}
            <div
              style={{
                opacity: manifestoVis ? 1 : 0,
                transform: manifestoVis ? "none" : "translateY(40px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.22s",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "rgba(240,232,220,0.48)",
                  marginBottom: "20px",
                }}
              >
                The world has enough vendors; it craves a catalyst. While the industry obsesses over
                mere uptime, the real work lies in architecting what's next.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "rgba(240,232,220,0.48)",
                  marginBottom: "20px",
                }}
              >
                Technology is never a line item — it is an{" "}
                <span style={{ color: "#f0e8df", fontStyle: "italic" }}>unfair advantage</span>. By
                merging radical foresight with technical grit, the "impossible" is transmuted into a
                scalable industry benchmark.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.85,
                  color: "rgba(240,232,220,0.48)",
                  marginBottom: "40px",
                }}
              >
                To us, technology isn't a line item — it's your unfair advantage. By merging radical
                foresight with technical grit, we turn your "impossible" into the industry
                benchmark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY CHAPTERS ────────────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div
            className="reveal"
            style={{
              marginBottom: "48px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "end",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(240,232,223,0.3)",
                  marginBottom: "18px",
                }}
              >
                THE EVOLUTION · OUR STORY
              </p>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(38px, 5.5vw, 72px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.015em",
                  lineHeight: 0.92,
                  color: "#f0e8df",
                  margin: 0,
                }}
              >
                BEYOND THE CODE.
                <br />
                <em
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "rgb(255,130,50)",
                    textTransform: "none",
                    fontSize: "0.82em",
                  }}
                >
                  The Narrative.
                </em>
              </h2>
            </div>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.8,
                color: "rgba(240,232,220,0.38)",
                paddingBottom: "4px",
              }}
            >
              In an era where "digital transformation" is often a buzzword for mere survival, the
              real quest is for enduring relevance. The journey begins with one question: what
              stands between your current scale and your ultimate potential? This narrative isn't
              about a company's history — it is about the unfolding chapters of your future, powered
              by innovation that refuses to settle for the status quo.
            </p>
          </div>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {STORY_CHAPTERS.map((ch, i) => (
              <ChapterRow key={ch.n} ch={ch} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRIME DIRECTIVES — cinematic auto-rotating card layout ─────────── */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="abt-forge-glow" />
        {[9, 18, 31, 47, 63, 79, 92].map((left, i) => (
          <span
            key={left}
            className="abt-spark"
            style={{ left: `${left}%`, animationDelay: `${i * 0.65}s` }}
          />
        ))}
        {/* Bg image */}
        <img
          src={aboutImg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.03,
            filter: "saturate(0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 50% 60% at 85% 40%, rgba(255,80,0,0.06) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-20" style={{ zIndex: 1 }}>
          {/* Header */}
          <div
            ref={directivesHeaderRef}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "end",
              marginBottom: "56px",
              opacity: dirHeaderVis ? 1 : 0,
              transform: dirHeaderVis ? "none" : "translateY(28px)",
              transition:
                "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,130,50,0.65)",
                  marginBottom: "18px",
                }}
              >
                THE PRIME DIRECTIVES
              </p>
              <h2
                className="abt-forge-title"
                style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(38px, 5.5vw, 72px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.015em",
                  lineHeight: 0.92,
                  color: "#f0e8df",
                  margin: 0,
                }}
              >
                HOW THE FUTURE
                <br />
                IS FORGED,
                <br />
                <em
                  style={{
                    fontFamily: "Georgia, serif",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "rgb(255,130,50)",
                    textTransform: "none",
                    fontSize: "0.78em",
                  }}
                >
                  day by day.
                </em>
              </h2>
            </div>
            <div style={{ paddingBottom: "6px" }}>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.85,
                  color: "rgba(240,232,220,0.38)",
                  margin: 0,
                }}
              >
                Five governing principles that shape every decision, every architecture, every
                partnership. Not guidelines — prime directives. Each one cycles automatically, or
                navigate at your own pace.
              </p>
            </div>
          </div>

          {/* Directive Cards */}
          <DirectiveCards />
        </div>
      </section>

      <Footer />
    </main>
  );
}
