import { useEffect, useRef, useState, useCallback } from "react";

const TESTIMONIALS: { quote: React.ReactNode }[] = [
  {
    quote: (
      <>
        Jarvis built our platform in record time and the features are{" "}
        <strong style={{ fontWeight: 700 }}>carefully crafted to our use case.</strong>{" "}
        It&apos;s comprehensive, scalable and has changed the game for our offline expansion.
      </>
    ),
  },
  {
    quote: (
      <>
        An AI-native partner that{" "}
        <strong style={{ fontWeight: 700 }}>actually ships.</strong>{" "}
        Their team thinks in systems and delivers products that compound over time.
      </>
    ),
  },
  {
    quote: (
      <>
        From strategy to deployment, they have been an extension of our team.{" "}
        <strong style={{ fontWeight: 700 }}>
          Our conversion lifted measurably within a quarter.
        </strong>
      </>
    ),
  },
  {
    quote: (
      <>
        Engineering quality is unreal. They turned a tangled legacy stack into{" "}
        <strong style={{ fontWeight: 700 }}>
          a modular, observable platform we now ship to weekly.
        </strong>
      </>
    ),
  },
  {
    quote: (
      <>
        They speak product, not just code.{" "}
        <strong style={{ fontWeight: 700 }}>Roadmaps tightened, cycle times dropped,</strong>{" "}
        and the team finally trusts the pipeline.
      </>
    ),
  },
];

type CardState = "enter-below" | "enter-above" | "idle" | "exit-up" | "exit-down";

function TestimonialCard({ quote, state }: { quote: React.ReactNode; state: CardState }) {
  let transform: string;
  let opacity: number;
  let transition: string;

  switch (state) {
    case "enter-below":
      transform = "translate(-50%, 130%) rotate(1deg)";
      opacity = 0;
      transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease";
      break;
    case "enter-above":
      transform = "translate(-50%, -160%) rotate(-1deg)";
      opacity = 0;
      transition = "transform 0.65s cubic-bezier(0.22,1,0.36,1), opacity 0.4s ease";
      break;
    case "exit-up":
      transform = "translate(-50%, -160%) rotate(-1deg)";
      opacity = 0;
      transition = "transform 0.5s cubic-bezier(0.55,0,1,0.45), opacity 0.35s ease";
      break;
    case "exit-down":
      transform = "translate(-50%, 130%) rotate(1deg)";
      opacity = 0;
      transition = "transform 0.5s cubic-bezier(0.55,0,1,0.45), opacity 0.35s ease";
      break;
    default:
      transform = "translate(-50%, -50%) rotate(0deg)";
      opacity = 1;
      transition = "none";
  }

  return (
   <div
  style={{
    position: "absolute",
    left: "50%",
    top: "50%",
    width: "900px",
    maxWidth: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    willChange: "transform, opacity",
    transform,
    opacity,
    transition,
    zIndex: state === "idle" ? 2 : 1,
  }}
>
       

     <blockquote
  style={{
    fontSize: "clamp(2rem, 3.8vw, 3rem)",
    lineHeight: 1.45,
    color: "#fff",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    fontStyle: "italic",
    fontWeight: 300,
    textAlign: "center",
    margin: 0,
    maxWidth: "1100px",
    letterSpacing: "-0.02em",
  }}
>
        <span
          style={{
            color: "rgba(249,115,22,0.65)",
            fontSize: "2em",
            lineHeight: 0,
            verticalAlign: "-0.15em",
            marginRight: "4px",
            fontStyle: "normal",
            display: "inline-block",
          }}
        >
          "
        </span>
        {quote}
        <span
          style={{
            color: "rgba(249,115,22,0.65)",
            fontSize: "2em",
            lineHeight: 0,
            verticalAlign: "-0.15em",
            marginLeft: "4px",
            fontStyle: "normal",
            display: "inline-block",
          }}
        >
          "
        </span>
      </blockquote>
    </div>
  );
}

function PlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;
    const NODE_COUNT = 38;
    const CONNECT_DIST = 260;
    type Node = {
      x: number; y: number; vx: number; vy: number;
      glowRadius: number; brightness: number;
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
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.55, vy: (Math.random() - 0.5) * 0.55,
        glowRadius: Math.random() * 14 + 7, brightness: Math.random() * 0.3 + 0.12,
      }));
    }
    function drawGlowDot(x: number, y: number, r: number, bright: number) {
      const g1 = ctx.createRadialGradient(x, y, 0, x, y, r * 3.0);
      g1.addColorStop(0, `rgba(180,210,240,${(bright * 0.12).toFixed(3)})`);
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.beginPath(); ctx.arc(x, y, r * 3.0, 0, Math.PI * 2);
      ctx.fillStyle = g1; ctx.fill();
      const g2 = ctx.createRadialGradient(x, y, 0, x, y, r * 1.4);
      g2.addColorStop(0, `rgba(220,235,255,${(bright * 0.28).toFixed(3)})`);
      g2.addColorStop(1, "rgba(180,210,240,0)");
      ctx.beginPath(); ctx.arc(x, y, r * 1.4, 0, Math.PI * 2);
      ctx.fillStyle = g2; ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,245,255,${(bright * 0.55).toFixed(3)})`; ctx.fill();
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        const pad = 30;
        if (n.x < -pad) n.x = W + pad; if (n.x > W + pad) n.x = -pad;
        if (n.y < -pad) n.y = H + pad; if (n.y > H + pad) n.y = -pad;
      }
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const t = 1 - dist / CONNECT_DIST;
            const avg = (nodes[a].brightness + nodes[b].brightness) / 2;
            const grad = ctx.createLinearGradient(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y);
            const alpha = (t * avg * 0.3).toFixed(3);
            grad.addColorStop(0, `rgba(170,200,235,${alpha})`);
            grad.addColorStop(0.5, `rgba(195,220,250,${(parseFloat(alpha) * 1.2).toFixed(3)})`);
            grad.addColorStop(1, `rgba(170,200,235,${alpha})`);
            ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.strokeStyle = grad; ctx.lineWidth = t * avg * 1.2 + 0.2; ctx.stroke();
          }
        }
      }
      for (const n of nodes) drawGlowDot(n.x, n.y, n.glowRadius, n.brightness);
      rafRef.current = requestAnimationFrame(draw);
    }
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { ctx.setTransform(1, 0, 0, 1, 0, 0); resize(); });
    ro.observe(canvas);
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    />
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollAccum = useRef(0);
  const SCROLL_THRESHOLD = 80;

  const navigate = useCallback(
  (dir: 1 | -1) => {
    if (transitioning) return;

    // Stop at last testimonial
    if (dir === 1 && current === TESTIMONIALS.length - 1) return;

    // Stop at first testimonial
    if (dir === -1 && current === 0) return;

    const next = current + dir;

    setDirection(dir);
    setTransitioning(true);
    setPrev(current);

    setTimeout(() => {
      setCurrent(next);
      setPrev(null);

      setTimeout(() => {
        setTransitioning(false);
      }, 700);
    }, 500);
  },
  [current, transitioning]
);

  // Auto-advance
  useEffect(() => {
    timerRef.current = window.setInterval(() => navigate(1), 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [navigate]);

  // Wheel scroll direction detection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
      if (!inView) return;
      e.preventDefault();
      scrollAccum.current += e.deltaY;
      if (scrollAccum.current > SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        if (timerRef.current) clearInterval(timerRef.current);
        navigate(1);
        timerRef.current = window.setInterval(() => navigate(1), 5500);
      } else if (scrollAccum.current < -SCROLL_THRESHOLD) {
        scrollAccum.current = 0;
        if (timerRef.current) clearInterval(timerRef.current);
        navigate(-1);
        timerRef.current = window.setInterval(() => navigate(1), 5500);
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate]);

  const prevState: CardState =
    prev !== null ? (direction === 1 ? "exit-up" : "exit-down") : "idle";
  const currState: CardState =
    prev !== null ? (direction === 1 ? "enter-below" : "enter-above") : "idle";

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#000",
        height: "100vh",
        minHeight: "600px",
        maxHeight: "900px",
      }}
    >
     {/* Solid Black Background */}
<div
  style={{
    position: "absolute",
    inset: 0,
    background: "#000",
  }}
/>

      {/* Background TESTIMONIALS text — sized to always fit full width */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          padding: "0 1rem",
        }}
      >
        <span
          style={{
            fontSize: "clamp(2rem, 9.5vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "0.05em",
            color: "rgba(249,115,22,0.22)",
            fontFamily: "'Arial Black', 'Impact', sans-serif",
            textTransform: "uppercase",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "block",
            width: "100%",
            textAlign: "center",
          }}
        >
          TESTIMONIALS
        </span>
      </div>

      {/* Cards */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {prev !== null && (
          <TestimonialCard key={`prev-${prev}`} {...TESTIMONIALS[prev]} state={prevState} />
        )}
        <TestimonialCard
          key={`curr-${current}`}
          {...TESTIMONIALS[current]}
          state={currState}
        />
      </div>
    </section>
  );
}