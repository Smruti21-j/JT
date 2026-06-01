import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  "Jarvis built our platform in record time and the features are carefully crafted to our use case. It's comprehensive, scalable and has changed the game for our offline expansion.",
  "An AI-native partner that actually ships. Their team thinks in systems and delivers products that compound over time.",
  "From strategy to deployment, they have been an extension of our team. Our conversion lifted measurably within a quarter.",
  "Engineering quality is unreal. They turned a tangled legacy stack into a modular, observable platform we now ship to weekly.",
  "They speak product, not just code. Roadmaps tightened, cycle times dropped, and the team finally trusts the pipeline.",
];

const STYLES = `
  @keyframes orbFloat1 {
    0%   { transform: translate(0px, 0px) scale(1); }
    33%  { transform: translate(40px, -30px) scale(1.08); }
    66%  { transform: translate(-20px, 20px) scale(0.95); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes orbFloat2 {
    0%   { transform: translate(0px, 0px) scale(1); }
    33%  { transform: translate(-35px, 25px) scale(1.05); }
    66%  { transform: translate(25px, -20px) scale(0.97); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes orbFloat3 {
    0%   { transform: translate(0px, 0px) scale(1); }
    50%  { transform: translate(20px, 30px) scale(1.06); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.15; }
    50%       { opacity: 0.85; }
  }
  @keyframes drift {
    0%   { transform: translateY(0px); }
    50%  { transform: translateY(-6px); }
    100% { transform: translateY(0px); }
  }
  @keyframes scanline {
    0%   { transform: translateX(-100%); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateX(100vw); opacity: 0; }
  }
  @keyframes ringPulse {
    0%   { transform: translate(-50%, -50%) scale(0.4); opacity: 0.6; }
    100% { transform: translate(-50%, -50%) scale(2.8); opacity: 0; }
  }
`;

export function Testimonials() {
  const [i, setI] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<number | null>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  // Auto-advance
  useEffect(() => {
    timer.current = window.setInterval(() => {
      setI((p) => (p + 1) % TESTIMONIALS.length);
      setAnimKey((p) => p + 1);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  // Star field
  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;
    for (let s = 0; s < 55; s++) {
      const star = document.createElement("div");
      const size = Math.random() * 2.5 + 0.8;
      const twinkleDur = `${(Math.random() * 4 + 2).toFixed(2)}s`;
      const driftDur = `${(Math.random() * 6 + 4).toFixed(2)}s`;
      const delay = `${(Math.random() * -10).toFixed(2)}s`;
      Object.assign(star.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "#fff",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: (Math.random() * 0.5 + 0.1).toFixed(2),
        animation: `twinkle ${twinkleDur} linear ${delay} infinite, drift ${driftDur} ease-in-out ${delay} infinite`,
      });
      container.appendChild(star);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="relative py-32 overflow-hidden">
      <style>{STYLES}</style>

      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.18] grid-bg" />

        {/* Star field */}
        <div ref={starsRef} className="absolute inset-0" />

        {/* Slow horizontal scanlines */}
        {[0, 1, 2].map((n) => (
          <div
            key={n}
            style={{
              position: "absolute",
              top: `${28 + n * 22}%`,
              left: 0,
              width: "30%",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(249,115,22,0.25), transparent)",
              animation: `scanline ${18 + n * 7}s linear ${-(n * 5)}s infinite`,
            }}
          />
        ))}

        {/* Concentric ring pulses — bottom centre */}
        {[0, 1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              position: "absolute",
              bottom: "-15%",
              left: "50%",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              border: "1px solid rgba(249,115,22,0.18)",
              animation: `ringPulse 8s ease-out ${-(n * 2)}s infinite`,
            }}
          />
        ))}

        {/* Orb 1 — orange, left */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "-5%",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "rgba(234,88,12,0.22)",
            filter: "blur(90px)",
            animation: "orbFloat1 14s ease-in-out infinite",
          }}
        />

        {/* Orb 2 — amber, right */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "-8%",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "rgba(249,115,22,0.16)",
            filter: "blur(100px)",
            animation: "orbFloat2 18s ease-in-out infinite",
            animationDelay: "-6s",
          }}
        />

        {/* Orb 3 — deep orange, bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "35%",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background: "rgba(194,65,12,0.18)",
            filter: "blur(80px)",
            animation: "orbFloat3 20s ease-in-out infinite",
            animationDelay: "-10s",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative mx-auto max-w-6xl px-6">

        {/* Header row */}
        <div className="reveal flex items-center justify-between mb-12">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label">
            TESTIMONIALS · {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>
          <div className="hidden md:flex items-center gap-3">
            <span className="h-px w-10 bg-white/20" />
          </div>
        </div>

        {/* Quote */}
        <div className="relative overflow-hidden">
          <blockquote
            key={animKey}
            className="font-display text-2xl md:text-4xl leading-snug tracking-tight text-foreground max-w-4xl mx-auto text-center px-8 md:px-16 py-16 md:py-20"
            style={{ animation: "fadeSlide 0.6s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <span className="text-warm/70">"</span>
            {TESTIMONIALS[i]}
            <span className="text-warm/70">"</span>
          </blockquote>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
        </div>

      </div>
    </section>
  );
}