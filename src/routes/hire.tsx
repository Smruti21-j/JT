import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  Globe2,
  Layers3,
  Network,
  RadioTower,
  ShieldCheck,
  Workflow,
  Atom,
  Triangle,
  FileCode2,
  Palette,
  Box,
  Server,
  FileTerminal,
  Zap,
  Database,
  HardDrive,
  Smartphone,
  Apple,
  Bot,
  Cloud,
  CloudCog,
  Wind,
  Link2,
  Sparkles,
  Brain,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";
import { ScrollToTop } from "@/components/site/ScrollToTop";
import { useRef, useState, useEffect } from "react";
 
import heroCover from "@/assets/hirecover.png";

const REASONS = [
  {
    n: "01",
    title: "Agentic Workforce",
    kicker: "We don't just use AI tools; we build and deploy autonomous agents.",
    body: "Our specialists ensure your systems move beyond simple chat prompts to action logic - AI that reasons, plans, and executes missions independently while your team focuses on strategy.",
     
  },
  {
    n: "02",
    title: "Digital Sovereignty by Design",
    kicker: "Reclaim your digital destiny.",
    body: "Unlike agencies that lock you into black box platforms, our team forges the sovereign backbone you need. We build systems you own, manage, and evolve, ensuring your data remains your most private and powerful asset.",
   
  },
  {
    n: "03",
    title: "High-Velocity Substrate",
    kicker: "Nearly a decade of high-stakes engineering.",
    body: "With almost a decade of shipping into regulated and high-velocity markets, our playbook is already battle-tested. We skip the experimentation phase and move you directly to scaled impact.",
    
  },
  {
    n: "04",
    title: "Human-AI Symbiosis",
    kicker: "The Collective Mind approach.",
    body: "We don't replace humans; we amplify them. Our mission-ready squads are built on Human-AI Symbiosis: a seamless blend of intuition and precision that accelerates your time-to-market by 40%.",
    
  },
  {
    n: "05",
    title: "Architectural Resilience",
    kicker: "Engineered for infinite scale.",
    body: "We build on a composable, modular architecture. Whether you are disrupting a local market or entering a global frontier, our digital core is designed to adapt to 6G, edge computing, and whatever comes next.",
   
  },
  {
    n: "06",
    title: "Deciphered Outcomes",
    kicker: "Unvarnished business clarity.",
    body: "We cut through the AI hype to deliver measurable ROI. Every specialist we provide is trained to link technical performance to commercial return, giving you the receipts of impact you need to lead your industry.",
 
  },
];

const SYNC_POINTS = [
  {
    n: "01",
    icon: RadioTower,
    label: "Zero Latency Progress",
    d: "When one region logs off, the next picks up the torch. Your roadmap stays in a state of perpetual motion.",
    metric: "24h",
    metricLabel: "handoff cycle",
  },
  {
    n: "02",
    icon: Workflow,
    label: "The Single Thread",
    d: "Diversity of location doesn't mean a dilution of focus. You get one point of accountability: a single lead who orchestrates the global symphony so you don't have to.",
    metric: "1",
    metricLabel: "delivery lead",
  },
  {
    n: "03",
    icon: Network,
    label: "Async-First, Human-Always",
    d: "We've mastered the art of asynchronous documentation and deep-work cycles, ensuring that when we do meet, it's for high-value strategy, not status updates.",
    metric: "0",
    metricLabel: "status theatre",
  },
];

const DNA_GROUPS = [
  {
    title: "Frontend Systems",
    icon: Layers3,
    stack: ["React", "Next.js", "TypeScript", "Design Systems", "WebGL"],
  },
  {
    title: "Product Backbones",
    icon: Cpu,
    stack: ["Node.js", "Python", "FastAPI", "Postgres", "Redis"],
  },
  {
    title: "Mobile Surfaces",
    icon: Globe2,
    stack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
  },
  {
    title: "AI & Cloud Ops",
    icon: ShieldCheck,
    stack: ["AWS", "GCP", "Azure", "LangChain", "OpenAI", "PyTorch"],
  },
];
const TECH_ICONS: Record<string, React.ElementType> = {
  // Frontend Systems
  "React": Atom,
  "Next.js": Triangle,
  "TypeScript": FileCode2,
  "Design Systems": Palette,
  "WebGL": Box,
  // Product Backbones
  "Node.js": Server,
  "Python": FileTerminal,
  "FastAPI": Zap,
  "Postgres": Database,
  "Redis": HardDrive,
  // Mobile Surfaces
  "React Native": Smartphone,
  "Flutter": Wind,
  "iOS Swift": Apple,
  "Android Kotlin": Bot,
  // AI & Cloud Ops
  "AWS": Cloud,
  "GCP": CloudCog,
  "Azure": Cloud,
  "LangChain": Link2,
  "OpenAI": Sparkles,
  "PyTorch": Brain,
};

function hirePalette(_theme: "light" | "dark") {
  return {
    cream: "var(--color-background)",
    ink: "var(--color-foreground)",
    muted: "var(--color-muted-foreground)",
    rule: "var(--color-border)",
  };
}

const HIRE_STYLES = `
.hire-root {
    --orange: #E85D26;
    --dark-bg: #0C0C0B;
    --dark-ink: #F7F5F1;
    font-family: var(--font-sans);
}
.hire-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;
  letter-spacing:.3em;
  text-transform:uppercase;
  font-weight:400;
  color: var(--muted);
}
   
 
 /* ===========================
   IndiaNIC Style Cards
=========================== */

.reason-grid-modern{
display:grid;
grid-template-columns: repeat(3,minmax(320px,1fr));
gap:1px;
background:var(--rule);
border:1px solid var(--rule);
border-radius:16px;
overflow:hidden;
}

.reason-modern-card{
position:relative;
padding:36px;
min-height:250px;
display:flex;
flex-direction:column;
justify-content:flex-start;
background:var(--cream);
overflow:hidden;
transition:
background .35s,
transform .35s;
}

.reason-modern-card::after{

content:"";

position:absolute;

inset:0;

background:
radial-gradient(circle at top left,
rgba(232,93,38,.16),
transparent 65%);

opacity:0;

transition:.35s;

pointer-events:none;

}
.reason-modern-card:hover{
background:rgba(232,93,38,.03);
transform:translateY(-2px);
}
.reason-modern-card:hover::after{
opacity:1;
}
.reason-number{
display:block;
font-size:12px;
letter-spacing:.2em;

font-weight:700;

font-size:11px;
letter-spacing:.22em;
margin-bottom:30px;

color:var(--orange);

}

.reason-modern-title{

font-size:26px;
line-height:1.2;
font-weight:700;
margin-bottom:14px;

font-weight:700;

line-height:1.15;

margin-bottom:20px;

color:var(--ink);

transition:.3s;

}

.reason-modern-card:hover .reason-modern-title{

color:#E85D26;

}

.reason-modern-desc{

font-size:13px;
line-height:1.7;
max-width:95%;
color:var(--muted);

}

@media(max-width:900px){

.reason-grid-modern{

grid-template-columns:repeat(2,1fr);

}

}

@media(max-width:640px){

.reason-grid-modern{

grid-template-columns:1fr;

}

.reason-modern-card{

padding:36px;

}

}

  /* ── DNA tag hover ── */
  .hire-dna-tag { transition: background 0.18s, color 0.18s; }
  .hire-dna-tag:hover { background: var(--orange); color: #fff; }

  /* ── SYNC metric ── */
  .hire-sync-metric {
    font-family: var(--font-sans);
    font-style: italic;
  }

  /* ── hero image composite ── */
  @keyframes hireFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  .hire-img-float { animation: hireFloat 7s ease-in-out infinite; }
  .hire-img-float2 { animation: hireFloat 9s ease-in-out infinite 1.5s; }

  /* ── SYNC SECTION ANIMATIONS ── */

  /* count-up number — slides up from below on enter */
  @keyframes syncNumEnter {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sync-num-anim {
    opacity: 0;
  }
  .sync-num-anim.is-visible {
    animation: syncNumEnter 0.85s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* label slides up after number */
  @keyframes syncLabelEnter {
    from { opacity: 0; transform: translateY(12px); letter-spacing: 0.5em; }
    to   { opacity: 1; transform: translateY(0);    letter-spacing: 0.3em; }
  }
  .sync-label-anim {
    opacity: 0;
  }
  .sync-label-anim.is-visible {
    animation: syncLabelEnter 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* card body content fades up */
  @keyframes syncBodyEnter {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .sync-body-anim {
    opacity: 0;
  }
  .sync-body-anim.is-visible {
    animation: syncBodyEnter 0.75s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* column border draws down */
  @keyframes syncBorderDraw {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0% 0); }
  }
  .sync-col-border {
    position: relative;
  }
  .sync-col-border::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 1px; height: 100%;
    background: rgba(247,245,241,0.1);
    clip-path: inset(0 0 100% 0);
    transition: clip-path 0s;
  }
  .sync-col-border.is-visible::before {
    animation: syncBorderDraw 1s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  /* icon pulse on enter */
  @keyframes syncIconPulse {
    0%   { opacity: 0; transform: scale(0.5); }
    60%  { transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  .sync-icon-anim {
    opacity: 0;
  }
  .sync-icon-anim.is-visible {
    animation: syncIconPulse 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }

  .sync-card {
    transition: background 0.25s ease;
    cursor: default;
  }
  .sync-card{

transition:
transform .35s,
background .35s,
box-shadow .35s;

}

.sync-card:hover{

transform:translateY(-8px);

background:rgba(232,93,38,.04);

box-shadow:0 24px 60px rgba(0,0,0,.08);

}
  .sync-card:hover .sync-num-val {
    color: var(--orange) !important;
    transition: color 0.3s ease;
  }
   

 @media (max-width: 768px) {
    .hire-hero-cols { grid-template-columns: 1fr !important; text-align: center; }
    .hire-hero-cols > div:last-child { order: -1; margin-bottom: 2rem; }
    .hire-sync-cols { flex-direction: column !important; }
    .hire-dna-cols { flex-direction: column !important; }
  }
`;

/* ── Animated sync card ── */
function SyncCard({
  pt,
  index,
  Icon,
  theme
}: {
  pt: (typeof SYNC_POINTS)[0];
  index: number;
  Icon: React.ElementType;
  theme: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [displayNum, setDisplayNum] = useState("0");

  // Parse numeric value from metric string like "24h", "1", "0"
  const numMatch = pt.metric.match(/\d+/);
  const numericVal = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = pt.metric.replace(/\d+/, "");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Count-up animation when visible
  useEffect(() => {
    if (!visible || numericVal === 0) {
      setDisplayNum(pt.metric);
      return;
    }
    const duration = 1200;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericVal);
      setDisplayNum(`${current}${suffix}`);
      if (step >= steps) {
        clearInterval(timer);
        setDisplayNum(pt.metric);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [visible]);

  const delay = index * 150;

  return (
    <div
  ref={ref}
  className={`sync-card sync-col-border${visible ? " is-visible" : ""}`}
  style={{
    flex: 1,
    padding: "2rem 2.5rem",

   background:
  theme === "dark"
    ? "#121212"
    : "#FFFFFF",

    borderRight:
      theme === "dark"
        ? "1px solid rgba(255,255,255,.10)"
        : "1px solid rgba(0,0,0,.10)",
  }}
>
      {/* top row: index + icon */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <span
          className={`sync-body-anim${visible ? " is-visible" : ""}`}
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color:
  theme === "dark"
    ? "rgba(247,245,241,.25)"
    : "rgba(23,22,20,.20)",
            transitionDelay: `${delay}ms`,
            animationDelay: `${delay}ms`,
          }}
        >
          {pt.n}
        </span>
        <span
          className={`sync-icon-anim${visible ? " is-visible" : ""}`}
          style={{ animationDelay: `${delay + 100}ms` }}
        >
          <Icon size={16} color="var(--orange)" />
        </span>
      </div>

      {/* big metric */}
      <div
        className={`sync-num-anim sync-num-val font-display${visible ? " is-visible" : ""}`}
        style={{
  fontStyle: "italic",
  fontSize: "3rem",
  fontWeight: 300,
  color:
  theme === "dark"
    ? "rgba(255,255,255,.12)"
    : "rgba(0,0,0,.12)",
  lineHeight: 1,
  marginBottom: "0.3rem",
  animationDelay: `${delay + 80}ms`,
  transition: "color .3s ease",
}}
      >
        {displayNum}
      </div>

      {/* metric label — letter-spacing animates in */}
    <div
  className={`sync-label-anim${visible ? " is-visible" : ""}`}
  style={{
    fontSize: "11px",
    letterSpacing: ".28em",
    textTransform: "uppercase",
    color: "#E85D26",
    marginBottom: "24px",
    animationDelay: `${delay + 200}ms`,
  }}
>
        {pt.metricLabel}
      </div>

      {/* title */}
      <h3
        className={`sync-body-anim ${visible ? " is-visible" : ""}`}
        style={{
  fontSize: "34px",
  fontWeight: 300,
  color:
  theme === "dark"
    ? "#F7F5F1"
    : "#171614",
  marginBottom: "16px",
  animationDelay: `${delay + 260}ms`,
}}
      >
        {pt.label}
      </h3>

      {/* body */}
     <p
  className={`sync-body-anim${visible ? " is-visible" : ""}`}
  style={{
    fontSize: "15px",
    lineHeight: 1.8,
    color:
  theme === "dark"
    ? "rgba(247,245,241,.65)"
    : "rgba(0,0,0,.55)",
    minHeight: "120px",
    animationDelay: `${delay + 320}ms`,
  }}
>
        {pt.d}
      </p>

      
    </div>
  );
}

/* ── Reason rows (irinamoi work-list style) ── */
/* ── Capability grid (IndiaNIC-style bordered panel) ── */
function ReasonList({ theme }: { theme: "light" | "dark" }) {
  return (
    <div className="reason-grid-modern">
      {REASONS.map((r) => (
        <div className="reason-modern-card" key={r.n}>
          <div className="reason-number">{r.n}</div>

          <h3 className="reason-modern-title">
            {r.title}
          </h3>

          <p
            className="reason-modern-desc"
            style={{
              color:
                theme === "dark"
                  ? "rgba(247,245,241,.65)"
                  : "rgba(0,0,0,.55)",
            }}
          >
            {r.kicker} {r.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function TechDnaSection({ theme }: { theme: "light" | "dark" }) {
  const [active, setActive] = useState(0);
  const activeGroup = DNA_GROUPS[active];

  return (
    <section style={{ background: "var(--cream)", padding: "7rem 0" }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 3rem" }}>

        <p className="hire-eyebrow" style={{ marginBottom: "1.2rem" }}>
          [Technological DNA]
        </p>

        <h2
          style={{
            fontSize: "clamp(2.5rem, 6.2vw, 6.6rem)",
            fontWeight: 800,
            lineHeight: 1.08,
            maxWidth: "900px",
            margin: 0,
            color: "var(--ink)",
          }}
        >
          <span style={{ whiteSpace: "nowrap" }}>
            Every pod is built around
          </span>
          <br />
          <em
            className="font-display"
            style={{
              fontStyle: "italic",
              fontWeight: 400,
              color: "var(--orange)",
            }}
          >
            product velocity
          </em>
        </h2>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.75,
            color: "var(--muted)",
            maxWidth: "560px",
            margin: "1.75rem 0 3rem",
          }}
        >
          Composable squads. Platform resilience. AI-enabled engineering
          workflows from day one.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.7rem",
            marginBottom: "3rem",
          }}
        >
          {DNA_GROUPS.map((group, i) => {
            const isActive = i === active;
            return (
              <button
                key={group.title}
                type="button"
                onClick={() => setActive(i)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.65rem 1.4rem",
                  borderRadius: "999px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid var(--orange)"
                    : "1px solid var(--rule)",
                  background: isActive ? "var(--orange)" : "transparent",
                  color: isActive ? "#fff" : "var(--ink)",
                  transition: "all .25s ease",
                }}
              >
                {group.title}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {activeGroup.stack.map((item) => {
  const Icon = TECH_ICONS[item] || activeGroup.icon;
  return (
              <div
                key={item}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: "0.9rem",
                  padding: "2rem 1rem",
                  borderRadius: "16px",
                  border: "1px solid var(--rule)",
                  background:
                    theme === "dark"
                      ? "rgba(255,255,255,.02)"
                      : "rgba(0,0,0,.015)",
                }}
              >
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      theme === "dark"
                        ? "rgba(232,93,38,.12)"
                        : "rgba(232,93,38,.08)",
                  }}
                >
                  <Icon size={18} color="var(--orange)" />
                </span>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Dedicated Talent - Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Deploy a global engineering pod built for continuous progress, single-thread accountability and AI-native delivery.",
      },
    ],
  }),
});

function HirePage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();
  const pal = hirePalette(theme);

  return (
    <main
      className="hire-root"
      style={{
        background: "var(--cream)",
        color: "var(--ink)",
        minHeight: "100vh",
        ["--cream" as any]: pal.cream,
        ["--ink" as any]: pal.ink,
        ["--muted" as any]: pal.muted,
        ["--rule" as any]: pal.rule,
      }}
    >
      <style>{HIRE_STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
     <section
  style={{
    minHeight: "100svh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    background: `
      radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--orange) 9%, transparent) 0%, transparent 48%),
      var(--cream)
    `,
    borderBottom: "1px solid var(--rule)",
  }}
>
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1600px",
            margin: "0 auto",
            width: "100%",
            padding: "8rem 3rem 4rem",
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hire-hero-cols"
        >
          {/* left: copy */}
          <div>
           <h1
              
              style={{
                fontSize: "clamp(2.5rem, 6.2vw, 6.6rem)",
                fontWeight: 800,
                lineHeight: 1.02,
                color: "var(--ink)",
                margin: 0,
              }}
            >
              Initialize
              <br />
               
              <em
  className="font-display"
  style={{
    fontStyle: "italic",
    fontWeight: 400,
    color: "var(--orange)",
  }}
>
               global growth
              </em>
              <br />
               
            </h1>

            <div
              style={{
                width: "56px",
                height: "2px",
                background: "var(--orange)",
                margin: "1.75rem 0",
                
                
              }}
            />

            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.75,
                color: "var(--muted)",
                maxWidth: "460px",
                marginBottom: "2.5rem",
              }}
            >
              Deploy a team that thinks like a partner and acts like an agent —
              turning your boldest ideas into autonomous reality. Enter the
              Impact Hub.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link
                to="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "var(--orange)",
                  color: "#fff",
                  padding: "0.9rem 1.6rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Let's Talk <ArrowRight size={14} />
              </Link>
              <a
                href="#why-hire"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "transparent",
                  border: "1px solid var(--rule)",
                  color: "var(--ink)",
                  padding: "0.9rem 1.6rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Innovation in Action <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* right: isometric graphic */}
          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img  
              src={heroCover}
              alt="Jarvis Technolabs digital ecosystem illustration"
              className="hire-img-float"
              style={{
                width: "100%",
                maxWidth: "560px",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </section>

      

      {/* ════════════════════════════════════════
          WHY HIRE — editorial list
      ════════════════════════════════════════ */}
      <section style={{ background: "var(--cream)", padding: "5rem 0" }}>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 3rem" }}>

          {/* section header */}
          <div
            style={{
              display: "grid",
               
              gap: "32rem",
              alignItems: "end",
              marginBottom: "3rem",
              paddingBottom: "2.5rem",
              borderBottom: "1px solid var(--rule)",
            }}
          >
            <div>
             <p className="hire-eyebrow" style={{ marginBottom: "1.2rem" }}>[Why Hire Jarvis]</p>
             <h2
                style={{
  fontSize: "clamp(2.5rem, 6.2vw, 6.6rem)",
  fontWeight: 800,
  lineHeight: 1.08,
  maxWidth: "900px",
  margin: 0,
  color: "var(--ink)",
}}
              >
                <span style={{ whiteSpace: "nowrap" }}>
                  Why follow tickets when,
                </span>
                <br />
                <em
                  className="font-display"
                  style={{
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: "var(--orange)",
                  }}
                >
                  orchestrate outcomes
                </em>
              </h2>
              <div
                style={{
                  width: "56px",
                  height: "2px",
                  background: "var(--orange)",
                  margin: "1.75rem 0 0",
                }}
              />
            </div>
           
          </div>

          {/* reason list */}
<ReasonList theme={theme} />
        </div>
      </section>

      {/* ════════════════════════════════════════
          GLOBAL SYNCHRONICITY
      ════════════════════════════════════════ */}
      <section
  style={{
    background:
      theme === "dark"
        ? `
          radial-gradient(circle at top left,
          rgba(232,93,38,.08),
          transparent 45%),
          linear-gradient(180deg,#0B0B0B 0%,#121212 100%)
        `
        : `
          radial-gradient(circle at top left,
          rgba(232,93,38,.08),
          transparent 45%),
          linear-gradient(180deg,#FCF9F4 0%,#F6F3EE 100%)
        `,
    padding: "9rem 0",
    overflow: "hidden",
    position: "relative",
  }}
>
        <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "0 3rem" }}>

          {/* label */}
          <p
  style={{
    fontSize: "0.65rem",
    letterSpacing: "0.34em",
    textTransform: "uppercase",
    color:
      theme === "dark"
        ? "rgba(247,245,241,.35)"
        : "rgba(23,22,20,.35)",
    marginBottom: "22px",
  }}
>
  [G L O B A L &nbsp; S Y N C H R O N I C I T Y &nbsp; E N G I N E]
</p>

          {/* title + body split */}
         <div
  style={{
    display: "grid",
    gridTemplateColumns: "1.2fr .8fr",
    gap: "6rem",
    alignItems: "center",
    marginBottom: "5rem",
  }}
>
           <h2
  style={{
    fontSize: "clamp(2.5rem, 6.2vw, 6.6rem)",
    fontWeight: 800,
    lineHeight: 1.0,
    color: theme === "dark" ? "#F7F5F1" : "#171614",
    margin: 0,
  }}
>
              Engineering
              <br />without borders.
              <br />
             <em
  className="font-display"
  style={{
    fontStyle: "italic",
    fontWeight: 400,
    color: "var(--orange)",
  }}
>
  Innovation without sleep
</em>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: "rgba(0,0,0,.60)" }}>
              In a world that never stops, your development shouldn't either. We've transcended the
              traditional outsourcing model to build a Global Synchronicity Engine — stitching
              together high-velocity talent across India, EMEA, and the Americas so your product
              evolves while you sleep.
            </p>
          </div>

          {/* three sync metrics */}
 <div
  className="hire-sync-cols"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    overflow: "hidden",
    borderRadius: "32px",

    border:
      theme === "dark"
        ? "1px solid rgba(255,255,255,.08)"
        : "1px solid rgba(0,0,0,.10)",

   background:
  theme === "dark"
    ? "#121212"
    : "#FFFFFF",

    backdropFilter: "blur(10px)",
  }}
>
            {SYNC_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <SyncCard
    key={pt.n}
    pt={pt}
    index={i}
    Icon={Icon}
    theme={theme}
/>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TECHNOLOGICAL DNA
      ════════════════════════════════════════ */}
      <TechDnaSection theme={theme} />

      {/* ════════════════════════════════════════
          CTA STRIP
      ════════════════════════════════════════ */}
      <section
      
      >
      
     
      </section>

      <Footer theme={theme} />
      <ScrollToTop />
    </main>
  );
}