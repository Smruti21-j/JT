import { useEffect, useState } from "react";
import { Cpu, Sparkles, Workflow, Layers3, Brain, Zap, Globe, Shield } from "lucide-react";

const PILLARS = [
  {
    id: "cx",
    label: "Interactions That Feel Alive.",
    title: "Reimagining every customer journey.",
    body: "Reimagining the customer journey as a living connection. By engineering sensory interfaces that adapt to human emotion and context, we make your digital presence unforgettable.",
    color: "oklch(0.72 0.16 45)",
    icon: Sparkles,
  },
  {
    id: "ma",
    label: "The Fuel for Your Reach.",
    title: "Right message. Right moment. Every channel.",
    body: "Your vision shouldn't be limited by your manual capacity. Our automated frameworks act as a force multiplier for your brand, ensuring you stay Top of Mind and Top of Feed.",
    color: "oklch(0.74 0.15 50)",
    icon: Cpu,
  },
  {
    id: "ops",
    label: "The Intelligence Layer",
    title: "Operations that observe, decide, act.",
    body: "Step into the era of autonomous operations. Deploy smart agents that manage your workflows, identify failures before they happen, and convert technical noise into unvarnished business growth.",
    color: "oklch(0.7 0.17 40)",
    icon: Workflow,
  },
  {
    id: "ea",
    label: "Your Scalable Blueprint",
    title: "Foundations built for AI-native commerce.",
    body: "Build on a foundation that never goes out of style. We architect digital systems that are strong enough to handle your growth today and flexible enough for whatever you build tomorrow.",
    color: "oklch(0.76 0.14 55)",
    icon: Layers3,
  },
];

const FLOATING_ICONS = [Brain, Zap, Globe, Shield, Cpu, Sparkles, Workflow, Layers3];

const CX_CENTER = 200;
const CY_CENTER = 200;
const AUTO_ADVANCE_MS = 3000;

function polarCoord(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX_CENTER + radius * Math.cos(a), y: CY_CENTER + radius * Math.sin(a) };
}

function pizzaSlice(startAngle: number, endAngle: number, outerR: number) {
  const o1 = polarCoord(startAngle, outerR);
  const o2 = polarCoord(endAngle, outerR);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${CX_CENTER} ${CY_CENTER} L ${o1.x} ${o1.y} A ${outerR} ${outerR} 0 ${large} 1 ${o2.x} ${o2.y} Z`;
}

export function Pillars() {
  const [active, setActive] = useState(0);
  const ActiveIcon = PILLARS[active].icon;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((c) => (c + 1) % PILLARS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="pillars" className="relative py-32 border-t border-white/5 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-20 text-center">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
            THE PLATFORM
          </p>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight">
            Pillars driving<em className="text-shimmer not-italic font-light"> CX.</em>
          </h2>
          <div className="mx-auto mt-7 h-px max-w-2xl overflow-hidden bg-white/10">
            <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent animate-breakthrough-scan" />
          </div>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            A rotating technical pizza of CX pillars. Each slice scrolls into focus automatically, or you can select a quadrant to inspect the system behind it.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: vertical menu */}
          <div className="lg:col-span-3 reveal order-2 lg:order-1">
            <ul>
              {PILLARS.map((p, i) => {
                const isAct = i === active;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => setActive(i)}
                      className={`w-full group flex items-center justify-between py-5 border-b border-white/5 transition-all ${
                        isAct ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className="h-1.5 w-1.5 rounded-full transition-all"
                          style={{
                            background: isAct ? p.color : "oklch(0.96 0.01 170 / 0.2)",
                            boxShadow: isAct ? `0 0 12px ${p.color}` : "none",
                          }}
                        />
                        <span className={`text-[11px] uppercase tracking-[0.25em] ${isAct ? "font-medium" : ""}`}>
                          {p.label}
                        </span>
                      </span>
                      <span className={`transition-all ${isAct ? "text-warm opacity-100" : "opacity-30 group-hover:opacity-80"}`}>
                        →
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CENTER: pizza */}
          <div className="lg:col-span-5 relative order-1 lg:order-2">
            <div className="relative aspect-square reveal select-none pizza-core">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-primary/8 blur-[80px] rounded-full" />

              {/* Floating AI icon particles */}
              {FLOATING_ICONS.map((Icon, idx) => {
                const angle = idx * 45;
                const radius = 46 + (idx % 3) * 4;
                return (
                  <div
                    key={idx}
                    className="absolute"
                    style={{
                      left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                      top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                      animation: `pizza-pop ${2 + idx * 0.3}s ease-in-out ${idx * 0.4}s infinite`,
                    }}
                  >
                    <Icon className="h-3.5 w-3.5 text-primary/40" strokeWidth={1.5} />
                  </div>
                );
              })}

              {/* Rotating dashed orbit rings */}
              <div className="absolute inset-[8%] rounded-full border border-dashed border-white/6 pizza-rotate" />
              <div className="absolute inset-[16%] rounded-full border border-white/4" style={{ animation: "pizza-spin 40s linear infinite reverse" }} />
              <div className="absolute inset-[3%] rounded-full border border-primary/10 animate-breakthrough-pulse" />

              {/* Orbiting dots */}
              <div className="pizza-orbit" style={{ animationDuration: "22s" }}>
                <span className="h-2 w-2 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_oklch(0.72_0.16_45)]" />
              </div>
              <div className="pizza-orbit" style={{ animationDuration: "18s", animationDelay: "-6s" }}>
                <span className="h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/60 shadow-[0_0_12px_oklch(0.96_0.01_170)]" />
              </div>

              <svg viewBox="0 0 400 400" className="relative w-full h-full">
                <defs>
                  {PILLARS.map((p, i) => (
                    <radialGradient key={`grad-${i}`} id={`sliceGrad${i}`} cx="50%" cy="50%" r="70%">
                      <stop offset="0%" stopColor={`${p.color.replace(")", " / 0.25)")}`} />
                      <stop offset="60%" stopColor={`${p.color.replace(")", " / 0.08)")}`} />
                      <stop offset="100%" stopColor="oklch(0.16 0.02 180 / 0)" />
                    </radialGradient>
                  ))}
                  <pattern id="pizzaHatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
                    <line x1="0" y1="0" x2="0" y2="5" stroke="oklch(0.96 0.01 170 / 0.06)" strokeWidth="0.5" />
                  </pattern>
                  <filter id="sliceGlow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Pizza crust ring */}
                <circle cx={CX_CENTER} cy={CY_CENTER} r="172" fill="none" stroke="oklch(0.72 0.16 45 / 0.2)" strokeWidth="3" strokeDasharray="8 4" />
                <circle cx={CX_CENTER} cy={CY_CENTER} r="176" fill="none" stroke="oklch(0.96 0.01 170 / 0.08)" strokeWidth="1" />

                {/* Tick marks */}
                {Array.from({ length: 48 }).map((_, idx) => {
                  const a = (idx * 7.5 - 90) * (Math.PI / 180);
                  const r1 = 178;
                  const r2 = 178 + (idx % 4 === 0 ? 10 : 5);
                  return (
                    <line
                      key={idx}
                      x1={(CX_CENTER + r1 * Math.cos(a)).toFixed(2)}
                      y1={(CY_CENTER + r1 * Math.sin(a)).toFixed(2)}
                      x2={(CX_CENTER + r2 * Math.cos(a)).toFixed(2)}
                      y2={(CY_CENTER + r2 * Math.sin(a)).toFixed(2)}
                      stroke="oklch(0.96 0.01 170 / 0.12)"
                      strokeWidth="0.8"
                    />
                  );
                })}

                {/* Pizza slices */}
                {PILLARS.map((p, i) => {
                  const gap = 3;
                  const startAngle = i * 90 + gap;
                  const endAngle = (i + 1) * 90 - gap;
                  const isAct = i === active;
                  const mid = i * 90 + 45;
                  const iconPos = polarCoord(mid, 110);
                  const labelPos = polarCoord(mid, 148);

                  // Pull active slice outward
                  const pullDist = isAct ? 14 : 0;
                  const pullAngle = ((mid - 90) * Math.PI) / 180;
                  const dx = Math.cos(pullAngle) * pullDist;
                  const dy = Math.sin(pullAngle) * pullDist;

                  return (
                    <g
                      key={p.id}
                      transform={`translate(${dx.toFixed(2)} ${dy.toFixed(2)})`}
                      style={{
                        transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                        cursor: "pointer",
                      }}
                      onClick={() => setActive(i)}
                      filter={isAct ? "url(#sliceGlow)" : undefined}
                    >
                      {/* Slice fill */}
                      <path d={pizzaSlice(startAngle, endAngle, 168)} fill="url(#pizzaHatch)" />
                      <path
                        d={pizzaSlice(startAngle, endAngle, 168)}
                        fill={`url(#sliceGrad${i})`}
                        stroke={isAct ? p.color : "oklch(0.96 0.01 170 / 0.1)"}
                        strokeWidth={isAct ? 2 : 0.8}
                        style={{
                          opacity: isAct ? 1 : 0.55,
                          transition: "all 500ms ease",
                        }}
                      />

                      {/* Separator line from center */}
                      <line
                        x1={CX_CENTER}
                        y1={CY_CENTER}
                        x2={polarCoord(startAngle, 168).x}
                        y2={polarCoord(startAngle, 168).y}
                        stroke="oklch(0.96 0.01 170 / 0.08)"
                        strokeWidth="0.5"
                      />

                      {/* Accent arc */}
                      <path
                        d={`M ${polarCoord(startAngle + 8, 150).x} ${polarCoord(startAngle + 8, 150).y} A 150 150 0 0 1 ${polarCoord(endAngle - 8, 150).x} ${polarCoord(endAngle - 8, 150).y}`}
                        fill="none"
                        stroke={isAct ? p.color : "oklch(0.96 0.01 170 / 0.15)"}
                        strokeWidth={isAct ? 1.5 : 0.8}
                        strokeDasharray={isAct ? "8 6" : "2 6"}
                        className={isAct ? "animate-pizza-dash" : ""}
                        style={{ transition: "all 500ms ease" }}
                      />

                      {/* Icon bubble */}
                      <g transform={`translate(${iconPos.x - 14} ${iconPos.y - 14})`}>
                        <circle
                          cx="14"
                          cy="14"
                          r="20"
                          fill="oklch(0.14 0.02 180)"
                          stroke={isAct ? p.color : "oklch(0.96 0.01 170 / 0.15)"}
                          strokeWidth={isAct ? 1.5 : 0.8}
                          style={{
                            filter: isAct ? `drop-shadow(0 0 14px ${p.color})` : "none",
                            transition: "all 500ms ease",
                          }}
                        />
                        <foreignObject x="2" y="2" width="24" height="24">
                          <div
                            className="h-6 w-6 flex items-center justify-center"
                            style={{
                              color: isAct ? p.color : "oklch(0.96 0.01 170 / 0.5)",
                              transition: "color 400ms ease",
                            }}
                          >
                            <p.icon className={`h-4 w-4 ${isAct ? "pizza-node" : ""}`} strokeWidth={1.5} />
                          </div>
                        </foreignObject>
                      </g>

                      {/* Slice label */}
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={isAct ? p.color : "oklch(0.96 0.01 170 / 0.35)"}
                        fontSize="10"
                        fontWeight="700"
                        letterSpacing="2"
                        style={{ transition: "fill 400ms ease" }}
                      >
                        {p.id.toUpperCase()}
                      </text>
                    </g>
                  );
                })}

                {/* Center hub — the "pizza center" */}
                <circle cx={CX_CENTER} cy={CY_CENTER} r="38" fill="oklch(0.12 0.02 180)" stroke="oklch(0.72 0.16 45 / 0.5)" strokeWidth="1.5" />
                <circle cx={CX_CENTER} cy={CY_CENTER} r="28" fill="none" stroke="oklch(0.72 0.16 45 / 0.25)" strokeWidth="1" strokeDasharray="3 4" className="animate-core-dash" />
                <circle cx={CX_CENTER} cy={CY_CENTER} r="18" fill="oklch(0.15 0.02 180)" stroke="oklch(0.72 0.16 45 / 0.35)" strokeWidth="0.8" />

                {/* Pulsing core dot */}
                <circle cx={CX_CENTER} cy={CY_CENTER} r="6" fill="oklch(0.72 0.16 45)">
                  <animate attributeName="r" values="5;9;5" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2.4s" repeatCount="indefinite" />
                </circle>
                <text x={CX_CENTER} y={CY_CENTER + 52} textAnchor="middle" className="font-display" fill="oklch(0.96 0.01 170 / 0.35)" fontSize="8" letterSpacing="3">
                  AXIS
                </text>

                {/* Signal flow lines from center to each slice */}
                {PILLARS.map((p, i) => {
                  const mid = i * 90 + 45;
                  const target = polarCoord(mid, 90);
                  return (
                    <line
                      key={`signal-${i}`}
                      x1={CX_CENTER}
                      y1={CY_CENTER}
                      x2={target.x}
                      y2={target.y}
                      stroke={i === active ? p.color : "oklch(0.96 0.01 170 / 0.08)"}
                      strokeWidth="1"
                      strokeDasharray="3 6"
                      className="animate-signal-flow"
                      style={{
                        animationDelay: `${i * -0.8}s`,
                        transition: "stroke 400ms ease",
                      }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* RIGHT: description */}
          <div className="lg:col-span-4 reveal order-3">
            <div key={PILLARS[active].id} className="animate-fade-up">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="h-10 w-10 rounded-md flex items-center justify-center"
                  style={{
                    background: `${PILLARS[active].color.replace(")", " / 0.12)")}`,
                    border: `1px solid ${PILLARS[active].color.replace(")", " / 0.4)")}`,
                  }}
                >
                  <ActiveIcon className="h-4 w-4" style={{ color: PILLARS[active].color }} strokeWidth={1.5} />
                </div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-warm">
                  {PILLARS[active].label}
                </p>
              </div>
              <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight">
                {PILLARS[active].title}
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">{PILLARS[active].body}</p>
              <button
                onClick={() => setActive((active + 1) % PILLARS.length)}
                className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase font-medium text-warm hover:translate-x-1 transition-transform"
              >
                Engage Next <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
