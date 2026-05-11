import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import contactImg from "@/assets/page-contact.jpg";

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const CONTACT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,700;0,800;0,900;1,300;1,400&display=swap');

  @keyframes ct-fadeUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ct-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes ct-lineGrowY {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes ct-glowPulse {
    0%, 100% { opacity: 0.07; transform: scale(1); }
    50%       { opacity: 0.15; transform: scale(1.1); }
  }
  @keyframes ct-scanLine {
    from { transform: translateY(-100%); }
    to   { transform: translateY(100vh); }
  }
  @keyframes ct-orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -20px) scale(1.05); }
    66%       { transform: translate(-20px, 15px) scale(0.97); }
  }
  @keyframes ct-textReveal {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0% 0 0); }
  }
  @keyframes ct-borderTrace {
    0%   { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
    25%  { clip-path: polygon(0 0, 100% 0, 100% 0, 0 0); }
    50%  { clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%); }
    75%  { clip-path: polygon(100% 100%, 0 100%, 0 100%, 100% 100%); }
    100% { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
  }
  @keyframes ct-flicker {
    0%, 95%, 100% { opacity: 1; }
    96%            { opacity: 0.4; }
    97%            { opacity: 1; }
    98%            { opacity: 0.6; }
  }
  @keyframes ct-numberCount {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ct-pulseRing {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(2.5); opacity: 0; }
  }
  @keyframes ct-signalFlow {
    0%   { stroke-dashoffset: 1000; opacity: 0; }
    20%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0.4; }
  }
  @keyframes ct-gridShift {
    0%, 100% { background-position: 0 0; }
    50%       { background-position: 20px 20px; }
  }
  @keyframes ct-sourceWave {
    0% { transform: translate3d(-8%, 6%, 0) scale(0.96) rotate(0deg); opacity: 0.28; }
    45% { transform: translate3d(7%, -5%, 0) scale(1.08) rotate(9deg); opacity: 0.58; }
    100% { transform: translate3d(-8%, 6%, 0) scale(0.96) rotate(0deg); opacity: 0.28; }
  }
  @keyframes ct-dataRain {
    from { transform: translateY(-120%); opacity: 0; }
    12%, 75% { opacity: 0.65; }
    to { transform: translateY(120vh); opacity: 0; }
  }

  .ct-vis {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1);
  }
  .ct-vis.is-visible {
    opacity: 1;
    transform: none;
  }

  .ct-input {
    width: 100%;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 4px;
    padding: 18px 20px;
    font-size: 13px;
    color: rgba(240,232,220,0.8);
    outline: none;
    transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
    font-family: inherit;
    letter-spacing: 0.02em;
  }
  .ct-input::placeholder {
    color: rgba(240,232,220,0.2);
    font-style: italic;
    font-size: 12px;
  }
  .ct-input:focus {
    border-color: rgba(255,110,30,0.5);
    background: rgba(255,90,20,0.04);
    box-shadow: 0 0 0 3px rgba(255,90,20,0.06), inset 0 0 20px rgba(255,90,20,0.03);
  }
  .ct-form-grid {
    display: grid;
    grid-template-columns: 1fr 420px;
    gap: 64px;
    align-items: start;
  }
  .ct-source-veil {
    position: absolute;
    inset: 8% 10% auto auto;
    width: min(720px, 58vw);
    height: 48vh;
    border-radius: 999px;
    background:
      radial-gradient(circle at 30% 42%, rgba(255, 170, 72, 0.28), transparent 24%),
      radial-gradient(circle at 58% 52%, rgba(255, 92, 24, 0.32), transparent 22%),
      radial-gradient(circle at 78% 34%, rgba(255, 210, 120, 0.18), transparent 20%);
    filter: blur(38px);
    mix-blend-mode: screen;
    animation: ct-sourceWave 13s ease-in-out infinite;
    pointer-events: none;
  }
  .ct-rain-line {
    position: absolute;
    top: 0;
    width: 1px;
    height: 28vh;
    background: linear-gradient(to bottom, transparent, rgba(255,130,50,.45), transparent);
    animation: ct-dataRain 7s linear infinite;
  }

  .ct-channel-item {
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  .ct-channel-item::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, transparent, rgba(255,110,30,0.8), transparent);
    transform: scaleY(0);
    transformOrigin: center;
    transition: transform 0.4s ease;
  }
  .ct-channel-item:hover::before {
    transform: scaleY(1);
  }
  .ct-channel-item:hover {
    background: rgba(255,90,20,0.04) !important;
    padding-left: 28px !important;
  }
  .ct-channel-item:hover .ct-channel-label {
    color: rgba(255,130,50,0.9) !important;
  }

  .ct-submit-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
  }
  .ct-submit-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%);
    transform: translateX(-100%) skewX(-20deg);
    transition: transform 0.5s ease;
  }
  .ct-submit-btn:hover::before {
    transform: translateX(150%) skewX(-20deg);
  }
  .ct-submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 40px -8px rgba(255,90,20,0.5), 0 0 0 1px rgba(255,130,50,0.3);
  }
  .ct-submit-btn:active {
    transform: translateY(-1px);
  }

  .ct-coord-dot {
    animation: ct-pulseRing 2.5s ease-out infinite;
  }

  .ct-hero-title span {
    display: inline-block;
    opacity: 0;
    transform: translateY(60px) rotateX(30deg);
    animation: ct-wordIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  @keyframes ct-wordIn {
    to { opacity: 1; transform: none; }
  }
  @media (max-width: 980px) {
    .ct-form-grid {
      grid-template-columns: 1fr;
      gap: 48px;
    }
  }
`;

/* ─── Helpers ────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
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

/* ─── Animated hero title ────────────────────────────────────────────────── */
function HeroTitle() {
  const words = ["Plug", "Into", "the", "Source."];
  return (
    <h1
      style={{
        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
        fontSize: "clamp(60px, 10vw, 140px)",
        fontWeight: 900,
        textTransform: "uppercase",
        letterSpacing: "-0.03em",
        lineHeight: 0.9,
        margin: 0,
        color: "#f0e8df",
        perspective: "800px",
      }}
    >
      {words.map((w, i) => (
        <span
          key={w}
          style={{
            display: i < 3 ? "inline" : "block",
            marginRight: i < 3 ? "0.25em" : 0,
            opacity: 0,
            transform: "translateY(60px) rotateX(30deg)",
            animation: `ct-wordIn 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.12}s forwards`,
            display: "inline-block",
          }}
        >
          {i === 3 ? (
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgb(255,130,50)",
                fontFamily: "Georgia, serif",
                textTransform: "none",
              }}
            >
              {w}
            </em>
          ) : (
            w
          )}
          {i < 3 && "\u00A0"}
        </span>
      ))}
    </h1>
  );
}

/* ─── Animated scan line ─────────────────────────────────────────────────── */
function ScanLine() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(to right, transparent, rgba(255,130,50,0.6), transparent)",
        animation: "ct-scanLine 4s linear infinite",
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── Signal SVG decoration ──────────────────────────────────────────────── */
function SignalDecor() {
  return (
    <svg
      viewBox="0 0 400 300"
      style={{
        position: "absolute",
        right: "-60px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "400px",
        height: "300px",
        opacity: 0.06,
        pointerEvents: "none",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx="200"
          cy="150"
          r={40 + i * 35}
          fill="none"
          stroke="rgb(255,130,50)"
          strokeWidth="0.8"
          strokeDasharray="4 8"
          style={{
            animation: `ct-pulseRing ${2 + i * 0.5}s ease-out ${i * 0.3}s infinite`,
          }}
        />
      ))}
    </svg>
  );
}

/* ─── File Upload component ──────────────────────────────────────────────── */
function FileUpload() {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = Array.from(e.dataTransfer.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...dropped]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `1px dashed ${dragging ? "rgba(255,110,30,0.6)" : "rgba(255,255,255,0.12)"}`,
        borderRadius: "4px",
        padding: "28px 20px",
        background: dragging ? "rgba(255,90,20,0.05)" : "rgba(255,255,255,0.01)",
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        style={{ display: "none" }}
        onChange={(e) => {
          const picked = Array.from(e.target.files || []).map((f) => f.name);
          setFiles((prev) => [...prev, ...picked]);
        }}
      />
      <div style={{ marginBottom: "8px" }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,130,50,0.5)"
          strokeWidth="1.5"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      {files.length === 0 ? (
        <p
          style={{
            fontSize: "11px",
            color: "rgba(240,232,220,0.2)",
            fontStyle: "italic",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          Drop your blueprints, resumes, or proposals here.
        </p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
          {files.map((f, i) => (
            <span
              key={i}
              style={{
                fontSize: "10px",
                background: "rgba(255,100,20,0.12)",
                border: "1px solid rgba(255,100,20,0.25)",
                borderRadius: "3px",
                padding: "3px 8px",
                color: "rgba(255,180,100,0.8)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Direct channel item ────────────────────────────────────────────────── */
function ChannelItem({
  label,
  value,
  href,
  delay = 0,
}: {
  label: string;
  value: string;
  href: string;
  delay?: number;
}) {
  const [ref, vis] = useInView(0.1);
  return (
    <div
      ref={ref}
      className="ct-channel-item"
      style={{
        padding: "18px 20px 18px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateX(-20px)",
        transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, background 0.3s ease, padding 0.3s ease`,
      }}
    >
      <div
        className="ct-channel-label"
        style={{
          fontSize: "9px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,130,50,0.5)",
          marginBottom: "6px",
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </div>
      <a
        href={href}
        style={{
          fontSize: "13px",
          color: "rgba(240,232,220,0.75)",
          textDecoration: "none",
          fontFamily: "Georgia, serif",
          transition: "color 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgb(255,160,80)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,232,220,0.75)")}
      >
        {value}
      </a>
    </div>
  );
}

/* ─── Route ──────────────────────────────────────────────────────────────── */
export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Jarvis Technolabs" },
      {
        name: "description",
        content: "Plug into the source. Contact Jarvis Technolabs in Ahmedabad.",
      },
      { property: "og:title", content: "Contact — Jarvis Technolabs" },
      { property: "og:description", content: "The signal starts here." },
    ],
  }),
});

/* ─── Page ───────────────────────────────────────────────────────────────── */
function ContactPage() {
  useReveal();

  const [formRef, formVis] = useInView(0.08);
  const [infoRef, infoVis] = useInView(0.08);
  const [coordRef, coordVis] = useInView(0.1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Signal from ${data.get("name")}`);
    const body = encodeURIComponent(
      `From: ${data.get("name")} <${data.get("email_phone")}>\n\n${data.get("message") ?? ""}`,
    );
    window.location.href = `mailto:sales@jarvistechnolabs.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main
      style={{
        background: "#0a0806",
        color: "#f0e8df",
        minHeight: "100vh",
        fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
      }}
    >
      <style>{CONTACT_STYLES}</style>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* BG Image */}
        <img
          src={contactImg}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.18,
            filter: "saturate(0.2) brightness(0.6)",
            animation: "ct-glowPulse 8s ease-in-out infinite",
          }}
        />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "ct-gridShift 20s ease-in-out infinite",
          }}
        />

        {/* Orange signal field */}
        <div className="ct-source-veil" />
        {[12, 24, 39, 58, 73, 88].map((left, i) => (
          <span
            key={left}
            className="ct-rain-line"
            style={{ left: `${left}%`, animationDelay: `${i * 0.85}s` }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "15%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,90,20,0.12) 0%, transparent 65%)",
            animation: "ct-orbFloat 12s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            width: "350px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,60,0,0.08) 0%, transparent 65%)",
            animation: "ct-orbFloat 16s ease-in-out 3s infinite",
            pointerEvents: "none",
          }}
        />

        <ScanLine />
        <SignalDecor />

        {/* Bottom gradient */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, #0a0806 40%, transparent)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 pb-20 w-full" style={{ zIndex: 2 }}>
          {/* Eyebrow */}
          <p
            style={{
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "rgba(255,130,50,0.6)",
              marginBottom: "32px",
              opacity: 0,
              animation: "ct-fadeUp 0.8s ease 0.2s forwards",
            }}
          >
            GET IN TOUCH · SIGNAL RECEIVED WITHIN 24 CYCLES
          </p>

          <HeroTitle />

          {/* Sub */}
          <p
            style={{
              maxWidth: "640px",
              fontSize: "15px",
              lineHeight: 1.85,
              color: "rgba(240,232,220,0.4)",
              marginTop: "28px",
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontWeight: 400,
              opacity: 0,
              animation: "ct-fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s forwards",
            }}
          >
            Why wait for the dust to settle when you can clear the air? Stop searching for the
            "right time" to connect. Whether you're looking to build, to join, or to provide, the
            signal starts here. Drop the deadwood and let's engineer a new standard together.
          </p>

          {/* Animated line */}
          <div
            style={{
              marginTop: "40px",
              height: "1px",
              width: "280px",
              background: "linear-gradient(to right, rgba(255,110,30,0.7), transparent)",
              transformOrigin: "left",
              opacity: 0,
              animation: "ct-lineGrow 1.2s cubic-bezier(0.22,1,0.36,1) 0.7s forwards",
            }}
          />
        </div>
      </section>

      {/* ── MAIN FORM SECTION ────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "80px",
          paddingBottom: "100px",
          overflow: "hidden",
        }}
      >
        {/* Bg ambient */}
        <div
          style={{
            position: "absolute",
            top: "-5%",
            left: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,80,10,0.06) 0%, transparent 65%)",
            animation: "ct-glowPulse 7s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6" style={{ zIndex: 1 }}>
          <div className="ct-form-grid">
            {/* ── LEFT: Form ─────────────────────────────────────────────── */}
            <div
              ref={formRef}
              style={{
                opacity: formVis ? 1 : 0,
                transform: formVis ? "none" : "translateY(40px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {/* Section eyebrow */}
              <div style={{ marginBottom: "36px" }}>
                <p
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "rgba(255,130,50,0.6)",
                    marginBottom: "14px",
                  }}
                >
                  INITIATE UPLINK
                </p>
                <h2
                  style={{
                    fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                    fontSize: "clamp(32px, 4vw, 52px)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    lineHeight: 0.95,
                    color: "#f0e8df",
                    margin: 0,
                  }}
                >
                  SYNC WITH US.
                </h2>
                <div
                  style={{
                    marginTop: "16px",
                    height: "1px",
                    width: "120px",
                    background: "linear-gradient(to right, rgba(255,110,30,0.7), transparent)",
                    transformOrigin: "left",
                    transform: formVis ? "scaleX(1)" : "scaleX(0)",
                    transition: "transform 1s cubic-bezier(0.22,1,0.36,1) 0.3s",
                  }}
                />
              </div>

              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
                {/* Name */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    CALLSIGN
                  </label>
                  <input
                    required
                    name="name"
                    placeholder="Who is initiating this uplink?"
                    className="ct-input"
                  />
                </div>

                {/* Email / Phone */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    RESPONSE FREQUENCY
                  </label>
                  <input
                    required
                    name="email_phone"
                    placeholder="Where shall we beam our response?"
                    className="ct-input"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    TRANSMISSION
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe the catalyst. Are we building a legacy, joining forces, or scaling new heights? Give us the raw data."
                    className="ct-input"
                    style={{ resize: "none" }}
                  />
                </div>

                {/* File upload */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "9px",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    ATTACH BLUEPRINTS
                  </label>
                  <FileUpload />
                </div>

                {/* Submit */}
                <div style={{ paddingTop: "8px" }}>
                  <button
                    type="submit"
                    className="ct-submit-btn"
                    style={{
                      background: "linear-gradient(135deg, rgb(255,90,20) 0%, rgb(220,60,0) 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "18px 48px",
                      fontSize: "11px",
                      letterSpacing: "0.4em",
                      textTransform: "uppercase",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {submitted ? "SIGNAL SENT" : "CONNECT"}
                    {!submitted && (
                      <span style={{ display: "flex", gap: "3px", alignItems: "center" }}>
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            style={{
                              width: "3px",
                              height: "3px",
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.6)",
                              animation: `ct-numberCount 0.5s ease ${i * 0.15}s infinite alternate`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* ── RIGHT: Channels + Address ──────────────────────────────── */}
            <div
              ref={infoRef}
              style={{
                opacity: infoVis ? 1 : 0,
                transform: infoVis ? "none" : "translateX(30px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
              }}
            >
              {/* Direct Channels */}
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.015)",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    padding: "20px 20px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    background: "rgba(255,90,20,0.04)",
                  }}
                >
                  <p
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.35em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.7)",
                      margin: 0,
                    }}
                  >
                    DIRECT CHANNELS
                  </p>
                </div>

                <ChannelItem
                  label="Architect the Future"
                  value="sales@jarvistechnolabs.com"
                  href="mailto:sales@jarvistechnolabs.com"
                  delay={0}
                />
                <ChannelItem
                  label="Join the Hive Mind"
                  value="talent@jarvistechnolabs.com"
                  href="mailto:talent@jarvistechnolabs.com"
                  delay={0.07}
                />
                <ChannelItem
                  label="General Frequency"
                  value="info@jarvistechnolabs.com"
                  href="mailto:info@jarvistechnolabs.com"
                  delay={0.14}
                />
                <ChannelItem
                  label="Instant Uplink - WhatsApp"
                  value="+91 98259 26347"
                  href="https://wa.me/919825926347"
                  delay={0.21}
                />
              </div>

              {/* Coordinates */}
              <div
                ref={coordRef}
                style={{
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "8px",
                  padding: "24px 20px",
                  background: "rgba(255,255,255,0.015)",
                  position: "relative",
                  overflow: "hidden",
                  opacity: coordVis ? 1 : 0,
                  transform: coordVis ? "none" : "translateY(20px)",
                  transition:
                    "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.3s",
                }}
              >
                {/* Animated corner accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(225deg, rgba(255,90,20,0.08) 0%, transparent 60%)",
                    borderBottomLeftRadius: "40px",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  <div style={{ position: "relative", width: "10px", height: "10px" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "rgb(255,130,50)",
                        zIndex: 1,
                      }}
                    />
                    <div
                      className="ct-coord-dot"
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        border: "1px solid rgba(255,130,50,0.6)",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.35em",
                      textTransform: "uppercase",
                      color: "rgba(255,130,50,0.7)",
                      margin: 0,
                    }}
                  >
                    OUR PHYSICAL COORDINATES
                  </p>
                </div>

                <p
                  style={{
                    fontSize: "13px",
                    lineHeight: 1.85,
                    color: "rgba(240,232,220,0.5)",
                    margin: "0 0 20px",
                    fontFamily: "Georgia, serif",
                  }}
                >
                  B-603, Titanium Business Park,
                  <br />
                  Near Makarba Underbridge, Corporate Road,
                  <br />
                  Ahmedabad, Gujarat - 380051, India
                </p>

                <div
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    paddingTop: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      fontFamily: "Georgia, serif",
                      fontStyle: "italic",
                      color: "rgba(255,180,100,0.5)",
                      margin: "0 0 6px",
                      lineHeight: 1.6,
                    }}
                  >
                    "Barking up the right tree starts with a single seed."
                  </p>
                  <p
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      margin: 0,
                    }}
                  >
                    We process inquiries within 24 cycles (hours)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
