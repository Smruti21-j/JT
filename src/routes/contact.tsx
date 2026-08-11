import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";
import { useEffect, useRef, useState } from "react";
import contactHeroImg from "@/assets/contacthero.png";

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const CONTACT_STYLES = `
.ctp-page{
  --bg:      var(--color-background);
  --surface: var(--color-card);
  --card:    var(--color-card);
  --ink:     var(--color-foreground);
  --ink-dim: var(--color-muted-foreground);
  --ink-faint: color-mix(in oklch, var(--color-muted-foreground) 75%, transparent);
  --line:    var(--color-border);
  --acc:     var(--color-primary);
  --acc-fg:  var(--color-primary-foreground);
}

@keyframes ctpIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
@keyframes ctpLineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes ctpPulseRing{0%{transform:scale(0.8);opacity:0.8}100%{transform:scale(2.4);opacity:0}}

/* ── Hero ── */
.ctp-hero{
  position: relative;
  overflow: hidden;
  padding: clamp(150px,20vh,210px) 0 clamp(70px,9vh,110px);
  background:
    radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
    var(--bg);
  font-family: var(--font-sans);
  border-bottom: 1px solid var(--line);
}
.ctp-inner{
  position: relative;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 clamp(20px,4vw,48px);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.ctp-hero-copy{ max-width: 620px; }
.ctp-hero-img-wrap{
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ctp-hero-img-wrap img{
  width: 100%;
  max-width: 520px;
  height: auto;
  object-fit: contain;
}
@keyframes ctpImgFloat{ 0%,100%{ transform: translateY(0); } 50%{ transform: translateY(-10px); } }
.ctp-hero-img-wrap img{ animation: ctpImgFloat 7s ease-in-out infinite; }

@media (max-width: 900px){
  .ctp-inner{ grid-template-columns: 1fr; text-align: center; }
  .ctp-hero-copy{ max-width: none; margin: 0 auto; }
  .ctp-hero-img-wrap{ order: -1; margin-bottom: 2rem; }
  .ctp-eyebrow{ justify-content: center; }
  .ctp-line{ margin-left: auto; margin-right: auto; }
}
.ctp-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--ink-faint); margin-bottom:22px;
  animation:ctpIn .6s cubic-bezier(.16,1,.3,1) both;
  display:flex; align-items:center; gap:10px;
}
.ctp-eyebrow::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0; }
.ctp-title{ margin-bottom:28px; animation:ctpIn .7s .08s cubic-bezier(.16,1,.3,1) both; max-width: 820px; }
.ctp-sub{
  font-size:15px; color:var(--ink-dim); line-height:1.75;
  max-width:640px; margin-bottom:0;
  animation:ctpIn .7s .16s cubic-bezier(.16,1,.3,1) both;
}
.ctp-line{
  margin-top:36px; height:1px; width:120px;
  background:linear-gradient(to right, var(--acc), transparent);
  transform-origin:left;
  animation:ctpLineGrow 1s cubic-bezier(.22,1,.36,1) .5s both;
}

/* ── Sub-section heading (form / location) — smaller than hero ── */
.ctp-subheading{
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.01em;
  font-size: clamp(1.9rem, 3vw, 2.75rem);
  line-height: 1.05;
  color: var(--ink);
  margin: 0;
}

/* ── Quick-stat strip under hero ── */
.ctp-stats{
  border-top:1px solid var(--line);
  background:var(--surface);
}
.ctp-stats-inner{
  max-width:1600px; margin:0 auto; padding: 0 clamp(20px,4vw,48px);
  display:grid; grid-template-columns:repeat(3,1fr);
}
.ctp-stat{
  padding: 28px clamp(12px,2vw,28px);
  border-right:1px solid var(--line);
  display:flex; flex-direction:column; gap:4px;
}
.ctp-stat:last-child{ border-right:none; }
.ctp-stat-label{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9.5px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint);
}
.ctp-stat-val{ font-size:14px; color:var(--ink); font-weight:600; }
@media (max-width:760px){
  .ctp-stats-inner{ grid-template-columns:1fr; }
  .ctp-stat{ border-right:none; border-bottom:1px solid var(--line); }
  .ctp-stat:last-child{ border-bottom:none; }
}

/* ── Form section ── */
.ctp-section{ padding:clamp(64px,8vh,100px) 0 clamp(90px,10vh,130px); font-family:var(--font-sans); }
.ctp-section-inner{ max-width:1600px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }

.ctp-form-grid{
  display:grid;
  grid-template-columns: 1fr 400px;
  gap:64px;
  align-items:start;
}
@media (max-width:980px){
  .ctp-form-grid{ grid-template-columns:1fr; gap:56px; }
}

.ctp-field{ margin-bottom:26px; }
.ctp-label{
  display:block;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9.5px; letter-spacing:.2em; text-transform:uppercase;
  color:var(--ink-faint); margin-bottom:10px;
}
.ctp-input, .ctp-textarea{
  width:100%;
  background:transparent;
  border:none;
  border-bottom:1.5px solid var(--line);
  padding: 12px 2px;
  font-size:15px;
  color:var(--ink);
  outline:none;
  font-family:var(--font-sans);
  transition: border-color .25s ease;
}
.ctp-input::placeholder, .ctp-textarea::placeholder{ color:var(--ink-faint); }
.ctp-input:focus, .ctp-textarea:focus{ border-color:var(--acc); }
.ctp-textarea{ resize:none; }

.ctp-upload{
  border:1.5px dashed var(--line);
  border-radius:10px;
  padding:22px 18px;
  text-align:center;
  cursor:pointer;
  transition: border-color .25s ease, background .25s ease;
  color:var(--ink-faint);
}
.ctp-upload:hover, .ctp-upload.dragging{
  border-color: color-mix(in oklch, var(--acc) 55%, var(--line));
  background: color-mix(in oklch, var(--acc) 5%, transparent);
}
.ctp-upload-text{ font-size:12px; margin:8px 0 0; }
.ctp-upload-file{
  font-size:10.5px;
  background: color-mix(in oklch, var(--acc) 12%, transparent);
  border:1px solid color-mix(in oklch, var(--acc) 35%, var(--line));
  border-radius:999px;
  padding:4px 11px;
  color:var(--acc);
  display:inline-block;
}

.ctp-submit{
  display:inline-flex; align-items:center; gap:10px;
  background:var(--acc); color:var(--acc-fg);
  font-size:12px; letter-spacing:.1em; text-transform:uppercase; font-weight:600;
  padding:16px 34px; border-radius:999px; border:none; cursor:pointer;
  transition: transform .25s ease, box-shadow .25s ease;
  box-shadow: 0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
  margin-top:8px;
}
.ctp-submit:hover{ transform:translateY(-2px); }

/* ── Right rail: channels + address ── */
.ctp-rail-card{
  border:1px solid var(--line);
  border-radius:16px;
  overflow:hidden;
  background:var(--card);
  margin-bottom:20px;
}
.ctp-rail-head{
  padding:18px 22px;
  border-bottom:1px solid var(--line);
  background: color-mix(in oklch, var(--acc) 5%, transparent);
}
.ctp-rail-head p{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9.5px; letter-spacing:.25em; text-transform:uppercase; color:var(--acc); margin:0;
}
.ctp-channel{
  padding:16px 22px;
  border-bottom:1px solid var(--line);
  transition: background .25s ease, padding-left .25s ease;
}
.ctp-channel:last-child{ border-bottom:none; }
.ctp-channel:hover{
  background: color-mix(in oklch, var(--acc) 5%, transparent);
  padding-left:28px;
}
.ctp-channel-label{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:5px;
}
.ctp-channel-value{ font-size:14px; color:var(--ink); text-decoration:none; transition:color .2s ease; }
.ctp-channel:hover .ctp-channel-value{ color:var(--acc); }

.ctp-addr-card{ padding:22px; }
.ctp-addr-tag{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9px; letter-spacing:.2em; text-transform:uppercase; color:var(--acc);
  border:1px solid color-mix(in oklch, var(--acc) 35%, var(--line));
  border-radius:999px; padding:4px 11px; display:inline-block; margin-bottom:14px;
}
.ctp-addr-text{ font-size:14px; line-height:1.85; color:var(--ink-dim); margin:0 0 18px; }
.ctp-addr-quote{
  border-top:1px solid var(--line); padding-top:14px;
  font-size:13px; font-style:italic; color:var(--ink-dim); margin:0 0 6px;
}
.ctp-addr-note{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:9px; letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); margin:0;
}

/* ── Location section ── */
.ctp-loc-grid{ display:grid; grid-template-columns:1.3fr 1fr; gap:32px; align-items:stretch; }
@media (max-width:980px){ .ctp-loc-grid{ grid-template-columns:1fr; } }
.ctp-map-frame{
  position:relative; border-radius:16px; overflow:hidden;
  border:1px solid var(--line); min-height:380px; background:var(--surface);
}
.ctp-map-pin{ position:absolute; display:flex; flex-direction:column; align-items:center; transform:translate(-50%,-100%); z-index:2; }
.ctp-map-pin-dot{
  width:12px; height:12px; border-radius:50%; background:var(--acc);
  box-shadow: 0 0 0 4px color-mix(in oklch, var(--acc) 20%, transparent), 0 0 24px 4px color-mix(in oklch, var(--acc) 40%, transparent);
  position:relative; z-index:2;
}
.ctp-map-pin-ring{
  position:absolute; width:12px; height:12px; border-radius:50%;
  border:1px solid color-mix(in oklch, var(--acc) 60%, transparent);
  animation: ctpPulseRing 2.2s ease-out infinite;
}
.ctp-map-pin-label{
  margin-top:10px; font-size:9px; letter-spacing:.2em; text-transform:uppercase;
  color:var(--acc); white-space:nowrap;
  background:var(--card); border:1px solid color-mix(in oklch, var(--acc) 30%, var(--line));
  border-radius:4px; padding:5px 10px;
}

.ctp-directions{
  align-self:flex-start; display:inline-flex; align-items:center; gap:9px;
  border:1px solid var(--line); border-radius:999px; padding:12px 22px;
  font-size:11px; letter-spacing:.14em; text-transform:uppercase; font-weight:600;
  color:var(--ink); text-decoration:none; background:transparent;
  transition:border-color .25s ease, color .25s ease, background .25s ease;
}
.ctp-directions:hover{
  border-color:var(--acc); color:var(--acc);
  background: color-mix(in oklch, var(--acc) 6%, transparent);
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

/* ─── File Upload ────────────────────────────────────────────────────────── */
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
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`ctp-upload${dragging ? " dragging" : ""}`}
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto" }}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
      </svg>
      {files.length === 0 ? (
        <p className="ctp-upload-text">Drop your blueprints, resumes, or proposals here.</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center", marginTop: "10px" }}>
          {files.map((f, i) => (
            <span key={i} className="ctp-upload-file">{f}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Channel item ───────────────────────────────────────────────────────── */
function ChannelItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div className="ctp-channel">
      <div className="ctp-channel-label">{label}</div>
      <a href={href} className="ctp-channel-value">{value}</a>
    </div>
  );
}

/* ─── Location section ───────────────────────────────────────────────────── */
const GOOGLE_MAPS_QUERY = "Titanium Business Park, Makarba, Ahmedabad, Gujarat 380051";
const GOOGLE_MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(GOOGLE_MAPS_QUERY)}`;
const GOOGLE_MAPS_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(GOOGLE_MAPS_QUERY)}&output=embed`;

function LocationSection({ theme }: { theme: "light" | "dark" }) {
  const [ref, vis] = useInView(0.08);

  return (
    <section
      ref={ref}
      className="ctp-section"
      style={{
        borderTop: "1px solid var(--line)",
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(24px)",
        transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div className="ctp-section-inner">
        <div style={{ marginBottom: "28px" }}>
          <p className="ctp-eyebrow">OUR LOCATION</p>
          <h2 className="ctp-subheading">
            Where the signal{" "}
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
              originates.
            </em>
          </h2>
        </div>

        <div className="ctp-loc-grid">
          <div className="ctp-map-frame">
            <iframe
  title="Jarvis Technolabs Location"
  src={GOOGLE_MAPS_EMBED_SRC}
  width="100%"
  height="100%"
  style={{
    position: "absolute",
    inset: 0,
    border: 0,
    filter: theme === "dark"
      ? "invert(90%) hue-rotate(180deg) brightness(0.95) contrast(0.9)"
      : "none",
  }}
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
            <div className="ctp-map-pin" style={{ left: "50%", top: "48%" }}>
              <div style={{ position: "relative", width: "12px", height: "12px" }}>
                <div className="ctp-map-pin-dot" />
                <div className="ctp-map-pin-ring" />
              </div>
              <span className="ctp-map-pin-label">JARVIS TECHNOLABS</span>
            </div>
          </div>

          <div className="ctp-rail-card" style={{ marginBottom: 0, display: "flex", flexDirection: "column" }}>
            <div className="ctp-addr-card" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <span className="ctp-addr-tag">Headquarters</span>
              <h3 style={{ fontSize: "22px", fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
                Ahmedabad
              </h3>
              <p className="ctp-addr-text" style={{ flex: 1 }}>
                B-603, Titanium Business Park,
                <br />
                Near Makarba Underbridge, Corporate Road,
                <br />
                Ahmedabad, Gujarat - 380051, India
              </p>
              <a href={GOOGLE_MAPS_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" className="ctp-directions">
                Get Directions
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Route ──────────────────────────────────────────────────────────────── */
export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Jarvis Technolabs" },
      { name: "description", content: "Plug into the source. Contact Jarvis Technolabs in Ahmedabad." },
      { property: "og:title", content: "Contact — Jarvis Technolabs" },
      { property: "og:description", content: "The signal starts here." },
    ],
  }),
});

/* ─── Page ───────────────────────────────────────────────────────────────── */
function ContactPage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();

  const [formRef, formVis] = useInView(0.08);
  const [infoRef, infoVis] = useInView(0.08);
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
    <main className="ctp-page bg-background text-foreground min-h-screen">
      <style>{CONTACT_STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
<section className="ctp-hero">
  <div className="ctp-inner">
    <div className="ctp-hero-copy">
      <p className="ctp-eyebrow">GET IN TOUCH · RESPONSE WITHIN 24 HOURS</p>
      <h1 className="ctp-title section-title">
        Plug into
        <br />
        <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
          the source
        </em>
      </h1>
      <p className="ctp-sub">
        Why wait for the dust to settle when you can clear the air? Stop searching for the
        "right time" to connect. Whether you're looking to build, to join, or to provide, the
        signal starts here. Drop the deadwood and let's engineer a new standard together.
      </p>
      <div className="ctp-line" />
    </div>

    <div className="ctp-hero-img-wrap">
      <img src={contactHeroImg} alt="Contact Jarvis Technolabs" />
    </div>
  </div>
</section>

      {/* ── QUICK STATS STRIP ───────────────────────────────────────────── */}
      <div className="ctp-stats">
        <div className="ctp-stats-inner">
          <div className="ctp-stat">
            <span className="ctp-stat-label">Sales</span>
            <span className="ctp-stat-val">sales@jarvistechnolabs.com</span>
          </div>
          <div className="ctp-stat">
            <span className="ctp-stat-label">WhatsApp</span>
            <span className="ctp-stat-val">+91 98259 26347</span>
          </div>
          <div className="ctp-stat">
            <span className="ctp-stat-label">Location</span>
            <span className="ctp-stat-val">Ahmedabad, India</span>
          </div>
        </div>
      </div>

      {/* ── FORM SECTION ────────────────────────────────────────────────── */}
      <section className="ctp-section">
        <div className="ctp-section-inner">
          <div className="ctp-form-grid">
            {/* LEFT: Form */}
            <div
              ref={formRef}
              style={{
                opacity: formVis ? 1 : 0,
                transform: formVis ? "none" : "translateY(28px)",
                transition: "opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <div style={{ marginBottom: "28px" }}>
                <p className="ctp-eyebrow">INITIATE UPLINK</p>
                <h2 className="ctp-subheading">
                  Sync with{" "}
                  <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
                    us.
                  </em>
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="ctp-field">
                  <label className="ctp-label">Callsign</label>
                  <input required name="name" placeholder="Who is initiating this uplink?" className="ctp-input" />
                </div>

                <div className="ctp-field">
                  <label className="ctp-label">Response Frequency</label>
                  <input required name="email_phone" placeholder="Where shall we beam our response?" className="ctp-input" />
                </div>

                <div className="ctp-field">
                  <label className="ctp-label">Transmission</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Describe the catalyst. Are we building a legacy, joining forces, or scaling new heights? Give us the raw data."
                    className="ctp-textarea"
                  />
                </div>

                <div className="ctp-field">
                  <label className="ctp-label">Attach Blueprints</label>
                  <FileUpload />
                </div>

                <button type="submit" className="ctp-submit">
                  {submitted ? "Signal Sent" : "Connect"}
                  {!submitted && <span>→</span>}
                </button>
              </form>
            </div>

            {/* RIGHT: Channels + Address */}
            <div
              ref={infoRef}
              style={{
                opacity: infoVis ? 1 : 0,
                transform: infoVis ? "none" : "translateY(28px)",
                transition: "opacity .8s cubic-bezier(.22,1,.36,1) .1s, transform .8s cubic-bezier(.22,1,.36,1) .1s",
              }}
            >
              <div className="ctp-rail-card">
                <div className="ctp-rail-head">
                  <p>Direct Channels</p>
                </div>
                <ChannelItem label="Architect the Future" value="sales@jarvistechnolabs.com" href="mailto:sales@jarvistechnolabs.com" />
                <ChannelItem label="Join the Hive Mind" value="talent@jarvistechnolabs.com" href="mailto:talent@jarvistechnolabs.com" />
                <ChannelItem label="General Frequency" value="info@jarvistechnolabs.com" href="mailto:info@jarvistechnolabs.com" />
                <ChannelItem label="Instant Uplink - WhatsApp" value="+91 98259 26347" href="https://wa.me/919825926347" />
              </div>

              <div className="ctp-rail-card">
                <div className="ctp-addr-card">
                  <span className="ctp-addr-tag">Coordinates</span>
                  <p className="ctp-addr-text">
                    B-603, Titanium Business Park,
                    <br />
                    Near Makarba Underbridge, Corporate Road,
                    <br />
                    Ahmedabad, Gujarat - 380051, India
                  </p>
                  <p className="ctp-addr-quote">"Barking up the right tree starts with a single seed."</p>
                  <p className="ctp-addr-note">We process inquiries within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOCATION SECTION ────────────────────────────────────────────── */}
      <LocationSection theme={theme} />

      <Footer theme={theme} />
    </main>
  );
}