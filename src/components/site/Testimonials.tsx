import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  "Jarvis built our platform in record time and the features are carefully crafted to our use case. It's comprehensive, scalable and has changed the game for our offline expansion.",
  "An AI-native partner that actually ships. Their team thinks in systems and delivers products that compound over time.",
  "From strategy to deployment, they have been an extension of our team. Our conversion lifted measurably within a quarter.",
  "Engineering quality is unreal. They turned a tangled legacy stack into a modular, observable platform we now ship to weekly.",
  "They speak product, not just code. Roadmaps tightened, cycle times dropped, and the team finally trusts the pipeline.",
];

const STYLES = `
  @keyframes fadeSlide {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes dotPulse {
    0%, 100% { opacity: 0.35; transform: scale(1); }
    50%       { opacity: 1;    transform: scale(1.4); }
  }
`;

function PlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    const NODE_COUNT = 38;
    const CONNECT_DIST = 260;

    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      glowRadius: number;
      brightness: number;
    };

    let nodes: Node[] = [];

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        glowRadius: Math.random() * 14 + 7,
        brightness: Math.random() * 0.3 + 0.12,
      }));
    }

    function drawGlowDot(x: number, y: number, r: number, bright: number) {
      const g1 = ctx.createRadialGradient(x, y, 0, x, y, r * 3.0);
      g1.addColorStop(0, `rgba(180,210,240,${(bright * 0.12).toFixed(3)})`);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath();
      ctx.arc(x, y, r * 3.0, 0, Math.PI * 2);
      ctx.fillStyle = g1;
      ctx.fill();

      const g2 = ctx.createRadialGradient(x, y, 0, x, y, r * 1.4);
      g2.addColorStop(0, `rgba(220,235,255,${(bright * 0.28).toFixed(3)})`);
      g2.addColorStop(1, "rgba(180,210,240,0)");
      ctx.beginPath();
      ctx.arc(x, y, r * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = g2;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,245,255,${(bright * 0.55).toFixed(3)})`;
      ctx.fill();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        const pad = 30;
        if (n.x < -pad) n.x = W + pad;
        if (n.x > W + pad) n.x = -pad;
        if (n.y < -pad) n.y = H + pad;
        if (n.y > H + pad) n.y = -pad;
      }

      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const t = 1 - dist / CONNECT_DIST;
            const avgBright = (nodes[a].brightness + nodes[b].brightness) / 2;

            const grad = ctx.createLinearGradient(
              nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y
            );
            const alpha = (t * avgBright * 0.30).toFixed(3);
            grad.addColorStop(0,   `rgba(170,200,235,${alpha})`);
            grad.addColorStop(0.5, `rgba(195,220,250,${(parseFloat(alpha) * 1.2).toFixed(3)})`);
            grad.addColorStop(1,   `rgba(170,200,235,${alpha})`);

            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = t * avgBright * 1.2 + 0.2;
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        drawGlowDot(n.x, n.y, n.glowRadius, n.brightness);
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const ro = new ResizeObserver(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}

export function Testimonials() {
  const [i, setI] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setI((p) => (p + 1) % TESTIMONIALS.length);
      setAnimKey((p) => p + 1);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return (
    <section
      className="relative py-32 overflow-hidden"
      style={{ background: "#000" }}
    >
      <style>{STYLES}</style>

      <div className="absolute inset-0 pointer-events-none">
        <PlexusCanvas />

        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(100,140,180,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,140,180,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.65) 0%, transparent 100%)",
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">

        <div className="flex items-center justify-between mb-12">
          <p className="text-xs tracking-[0.3em]" style={{ color: "rgba(249,115,22,0.7)" }}>
            TESTIMONIALS · {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to testimonial ${idx + 1}`}
                onClick={() => { setI(idx); setAnimKey((p) => p + 1); }}
                style={{
                  width: idx === i ? "22px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  border: "none",
                  padding: 0,
                  background: idx === i ? "rgba(249,115,22,0.9)" : "rgba(255,255,255,0.2)",
                  transition: "all 0.4s ease",
                  cursor: "pointer",
                  animation: idx === i ? "dotPulse 2s ease-in-out infinite" : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden">
          <blockquote
            key={animKey}
            className="text-2xl md:text-4xl leading-snug tracking-tight max-w-4xl mx-auto text-center px-8 md:px-16 py-16 md:py-20"
            style={{
              color: "rgba(255,255,255,0.93)",
              fontFamily: "'Georgia', serif",
              animation: "fadeSlide 0.6s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <span style={{ color: "rgba(249,115,22,0.65)", fontSize: "1.4em", lineHeight: 0, verticalAlign: "-0.1em" }}>"</span>
            {TESTIMONIALS[i]}
            <span style={{ color: "rgba(249,115,22,0.65)", fontSize: "1.4em", lineHeight: 0, verticalAlign: "-0.1em" }}>"</span>
          </blockquote>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-20"
            style={{ background: "linear-gradient(to right, rgba(0,0,0,0.8), transparent)" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20"
            style={{ background: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)" }} />
        </div>

        <div style={{
          height: "1px",
          background: "linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)",
          marginTop: "0.5rem",
        }} />
      </div>
    </section>
  );
}