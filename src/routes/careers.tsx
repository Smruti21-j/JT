import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import careersImg from "@/assets/page-careers1.png";
import careers1Img from "@/assets/careers1.jpg";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PERKS = [
  {
    num: "01",
    titlePlain: "Non-Linear",
    titleItalic: "Timeframes",
    desc: "Forget the 9-to-5 grind. With flexible work options, you define your own peak productivity hours.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85",
  },
  {
    num: "02",
    titlePlain: "Zero-Lag",
    titleItalic: "Communication",
    desc: "We operate with no hidden policies, ensuring complete transparency across every layer of the organization.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1400&q=85",
  },
  {
    num: "03",
    titlePlain: "Sustainable",
    titleItalic: "Innovation",
    desc: "To keep your creative engine running, we prioritize work-life balance as a core functional requirement.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85",
  },
  {
    num: "04",
    titlePlain: "The Hive",
    titleItalic: "Mind",
    desc: "You’ll be surrounded by awesome team members in a vibrant work culture designed to spark \"eureka\" moments daily.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&q=85",
  },
  {
    num: "05",
    titlePlain: "Personal",
    titleItalic: "Breakthroughs",
    desc: "We celebrate your unique contributions with individual achievement perks.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85",
  },
  {
    num: "06",
    titlePlain: "Collective",
    titleItalic: "Victory",
    desc: "When the team wins, everyone wins. Our team performance perks ensure our shared success translates into shared rewards.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85",
  },
  {
    num: "07",
    titlePlain: "Moments of",
    titleItalic: "Connection",
    desc: "We pause to recharge and reconnect through meaningful festival celebrations.",
    stat: { value: "", label: "" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=85",
  },
];

// Stories / culture gallery items — using PieterKoopt CDN images
const CULTURE_STORIES = [
  {
    image: "/careers1.jpg",
    title: "The studio",
    sub: "Ahmedabad",
    tag: "Inside Jarvis",
  },
  {
    image: "careers2.png",
    title: "Workshop Wednesdays",
    sub: "Weekly rituals",
    tag: "Culture",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691c4d8b22aff485a6ca46a9_Dion_Doornik_4K9A9906%20kopie%202.webp",
    title: "Festival Nights",
    sub: "Diwali 2025",
    tag: "Celebrations",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691c4e7246d8c647dc57cdfb_Dion_Doornik_4K9A9901%20kopie%202.webp",
    title: "Team Sprint",
    sub: "Q4 Launch",
    tag: "Delivery",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691c4ed522aff485a6cab7ca_Dion_Doornik_4K9A9900%20kopie%202.webp",
    title: "Brainstorm Day",
    sub: "Design system v3",
    tag: "Workshop",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691c4fb01c9e660bdfc1fdc6_Dion_Doornik_4K9A9905%20kopie%202.webp",
    title: "Year-end Party",
    sub: "December 2024",
    tag: "Celebrations",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691c4df8d7840c1a31b13fed_Dion_Doornik_4K9A9897%20kopie%202.webp",
    title: "Office Portraits",
    sub: "Team of builders",
    tag: "People",
  },
  {
    image: "https://cdn.prod.website-files.com/67890d3b1a9365a1173c957d/691d7d68dc73e7c9ab2b8bc0_IMG_5227%20kopienew.webp",
    title: "Quiet Hours",
    sub: "Deep work sessions",
    tag: "Focus",
  },
];

const ROLES = [
  { title: "BDE", exp: "2 – 5+ years of experience", loc: "Ahmedabad · In-office" },
  { title: "Quality Analyst", exp: "0 – 3+ years of experience", loc: "Ahmedabad · In-office" },
];

// ─── Keyframes ─────────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes pkHeaderIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pkNumIn {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 0.55; transform: translateX(0); }
  }
  @keyframes pkTextIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pkImgZoom {
    from { transform: scale(1.1); }
    to   { transform: scale(1); }
  }
  @keyframes pkLineGrow {
    from { width: 0; }
    to   { width: 44px; }
  }
  @keyframes storySlideIn {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Story gallery */
  .story-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .story-card.s-vis {
    opacity: 1;
    transform: translateY(0);
  }
  .story-card:nth-child(1) { transition-delay: 0s; }
  .story-card:nth-child(2) { transition-delay: 0.07s; }
  .story-card:nth-child(3) { transition-delay: 0.14s; }
  .story-card:nth-child(4) { transition-delay: 0.21s; }
  .story-card:nth-child(5) { transition-delay: 0.28s; }
  .story-card:nth-child(6) { transition-delay: 0.35s; }
  .story-card:nth-child(7) { transition-delay: 0.42s; }
  .story-card:nth-child(8) { transition-delay: 0.49s; }

  .story-img {
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .story-card:hover .story-img {
    transform: scale(1.06);
  }

  /* Roles */
  .role-row {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .role-row.r-vis {
    opacity: 1;
    transform: translateY(0);
  }
`;



// ─── Stories Gallery (PieterKoopt /stories style) ─────────────────────────────
function CultureGallery() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header animation
    const hEl = headerRef.current;
    if (hEl) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { hEl.style.animation = "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both"; obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(hEl);
    }

    // Story cards stagger
    const gEl = gridRef.current;
    if (gEl) {
      const cards = gEl.querySelectorAll(".story-card");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("s-vis"); } });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      cards.forEach((c) => obs.observe(c));
      return () => obs.disconnect();
    }
  }, []);

  return (
    <section className="border-t border-white/5" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      {/* Header */}
      <div
        ref={headerRef}
        className="mx-auto max-w-7xl px-6 mb-16"
        style={{ opacity: 0 }}
      >
        {/* PieterKoopt /stories hero header style */}
        <div style={{ maxWidth: "700px" }}>
          <p style={{
            fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(240,232,223,0.32)", marginBottom: "20px",
          }}>
            INSIDE JARVIS
          </p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            fontSize: "clamp(40px, 6vw, 88px)",
            fontWeight: 700,
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "#f0e8df",
            margin: 0,
          }}>
            PEOPLE-FIRST.
            <br />
            <em style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgb(255,130,50)",
              textTransform: "none",
              fontSize: "0.82em",
            }}>
              Always.
            </em>
          </h2>
          
        </div>
      </div>

      {/* Masonry-style story grid — PieterKoopt /stories layout */}
      <div
        ref={gridRef}
        className="mx-auto max-w-7xl px-6"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3px",
        }}
      >
        {CULTURE_STORIES.map((story, i) => {
          // First item spans 2 cols and 2 rows like PieterKoopt featured image
          const isFeatured = i === 0;
          const isTall = i === 3 || i === 6;

          return (
            <div
              key={story.title}
              className="story-card"
              style={{
                gridColumn: isFeatured ? "span 2" : "span 1",
                gridRow: isFeatured || isTall ? "span 2" : "span 1",
                position: "relative",
                overflow: "hidden",
                borderRadius: "4px",
                cursor: "pointer",
                aspectRatio: isFeatured ? undefined : isTall ? undefined : "3/4",
                minHeight: isFeatured ? "580px" : isTall ? "520px" : "260px",
                background: "#0a0806",
              }}
            >
              <img
                src={story.image}
                alt={story.title}
                className="story-img"
                style={{
                  position: "absolute", inset: 0, width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.6) saturate(0.7)",
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)",
              }} />

              {/* Top tag */}
              <div style={{
                position: "absolute", top: "16px", left: "16px",
                padding: "4px 10px",
                background: "rgba(255,90,20,0.1)",
                border: "1px solid rgba(255,110,30,0.25)",
                borderRadius: "999px",
                fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase",
                color: "rgba(255,200,140,0.7)",
              }}>
                {story.tag}
              </div>

              {/* Bottom text */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: isFeatured ? "28px 28px" : "16px 18px",
              }}>
                <h3 style={{
                  fontFamily: isFeatured
                    ? "'Barlow Condensed', sans-serif"
                    : "Georgia, serif",
                  fontSize: isFeatured ? "clamp(22px, 2.5vw, 34px)" : "14px",
                  fontWeight: isFeatured ? 700 : 400,
                  fontStyle: isFeatured ? "normal" : "italic",
                  textTransform: isFeatured ? "uppercase" : "none",
                  color: "#f0e8df",
                  margin: 0,
                  lineHeight: 1.1,
                  marginBottom: "4px",
                }}>
                  {story.title}
                </h3>
                <p style={{
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)", margin: 0,
                }}>
                  {story.sub}
                </p>

                {isFeatured && (
                  <div style={{
                    marginTop: "14px",
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                    color: "rgba(255,130,50,0.8)",
                  }}>
                    View story →
                  </div>
                )}
              </div>

              {/* Bottom orange edge accent */}
              <div style={{
                position: "absolute", bottom: 0, left: 0,
                width: "40%", height: "2px",
                background: "linear-gradient(to right, rgba(255,110,30,0.7), transparent)",
              }} />
            </div>
          );
        })}
      </div>

      {/* Scroll-through label like PieterKoopt */}
      <div style={{
        textAlign: "center", marginTop: "48px",
        fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.2)",
      }}>
        Scroll through our culture
      </div>
    </section>
  );
}

// ─── Perks Section — scroll-driven horizontal panel reveal ────────────────────
// The section pins to the viewport while the user scrolls. Each perk panel
// clips open from left→right as scroll progresses, revealing the image and
// text underneath. A thin progress bar at the bottom tracks position.
// Completely different from the homepage stacked-card pattern.
function PerksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Header entrance
    const hEl = headerRef.current;
    if (hEl) {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            hEl.style.animation = "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both";
            obs.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(hEl);
    }

    // Scroll-driven horizontal reveal
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !track) return;

    const panels = Array.from(track.querySelectorAll<HTMLElement>(".perk-panel"));
    const total = panels.length;

    function onScroll() {
      const rect = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const winH = window.innerHeight;

      // How far we've scrolled through the sticky zone (0 → 1)
      // sticky zone = sectionH - winH
      const scrolled = -rect.top;
      const scrollable = sectionH - winH;
      const raw = Math.max(0, Math.min(1, scrolled / scrollable));

      // Update progress bar
      if (progress) progress.style.width = `${raw * 100}%`;

      // Each panel occupies 1/total of the scroll range
      panels.forEach((panel, i) => {
        const panelStart = i / total;
        const panelEnd = (i + 1) / total;
        // local progress within this panel 0→1
        const local = Math.max(0, Math.min(1, (raw - panelStart) / (1 / total)));

        // Clip-path reveal: right edge moves from 0% → 100%
        const clipPct = Math.round(local * 100);
        panel.style.clipPath = `inset(0 ${100 - clipPct}% 0 0)`;

        // Image parallax — slight rightward drift on the inner img
        const img = panel.querySelector<HTMLElement>(".perk-img-inner");
        if (img) {
          const drift = (1 - local) * 40; // px offset
          img.style.transform = `translateX(${drift}px) scale(1.08)`;
        }

        // Text reveal — slide up from below
        const textEls = panel.querySelectorAll<HTMLElement>(".perk-txt");
        textEls.forEach((t, ti) => {
          const delay = ti * 0.12;
          const txtProgress = Math.max(0, Math.min(1, (local - delay) / 0.4));
          t.style.opacity = String(txtProgress);
          t.style.transform = `translateY(${(1 - txtProgress) * 22}px)`;
        });
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial paint
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Total scroll height = winH + (panels × winH × 0.8) so each panel gets ~80vh of scroll
  const PANEL_SCROLL = 0.85; // fraction of viewport per panel

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/5"
      style={{
        // Height = one viewport (sticky header) + scroll space for each panel
        height: `calc(100vh + ${PERKS.length * PANEL_SCROLL * 100}vh)`,
        position: "relative",
      }}
    >
      {/* Sticky wrapper — stays fixed while parent scrolls */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* ── Section header — always visible at top of sticky frame ── */}
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            flexShrink: 0,
            padding: "48px 60px 32px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "24px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            background: "linear-gradient(to bottom, #0b0907 0%, rgba(11,9,7,0.95) 100%)",
            zIndex: 10,
            position: "relative",
          }}
        >
          <div>
            <p style={{
              fontSize: "9px", letterSpacing: "0.32em", textTransform: "uppercase",
              color: "rgba(240,232,223,0.3)", marginBottom: "14px",
            }}>
              [ Rewiring The Experience ]
            </p>
            <h2 style={{
              fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
              fontSize: "clamp(36px, 5.5vw, 76px)",
              fontWeight: 700,
              lineHeight: 0.9,
              textTransform: "uppercase",
              letterSpacing: "-0.01em",
              color: "#f0e8df",
              margin: 0,
            }}>
             The Future Isn’t Found.
              <em style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontWeight: 300,
                color: "rgb(255,130,50)",
                textTransform: "none",
                fontSize: "0.82em",
                marginLeft: "16px",
              }}>

                It’s Built.
              </em>
            </h2>
          </div>
          {/* Perk counter dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingBottom: "6px" }}>
            {PERKS.map((p) => (
              <div key={p.num} style={{
                width: "28px", height: "1px",
                background: "rgba(255,130,50,0.35)",
              }} />
            ))}
          </div>
        </div>

        {/* ── Panel stage — full remaining height ── */}
        <div
          ref={trackRef}
          style={{
            flex: 1,
            position: "relative",
            background: "#080604",
          }}
        >
          {PERKS.map((perk, i) => (
            <div
              key={perk.num}
              className="perk-panel"
              style={{
                position: "absolute",
                inset: 0,
                clipPath: "inset(0 100% 0 0)", // starts fully hidden
                zIndex: i + 1,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {/* LEFT: text */}
              <div style={{
                background: `hsl(25, 10%, ${5 + i * 1.2}%)`,
                padding: "40px 56px 40px 60px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: "1px solid rgba(255,255,255,0.04)",
                position: "relative",
                overflow: "hidden",
              }}>
                {/* Ambient glow */}
                <div style={{
                  position: "absolute", top: 0, right: 0,
                  width: "300px", height: "300px", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(255,90,20,0.06) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />

                {/* Number top */}
                <div className="perk-txt" style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "clamp(72px, 8vw, 110px)",
                  fontWeight: 400,
                  fontStyle: "italic",
                  lineHeight: 1,
                  color: "rgb(255,130,50)",
                  opacity: 0,
                  letterSpacing: "-0.02em",
                  userSelect: "none",
                }}>
                  {perk.num}
                </div>

                {/* Bottom block */}
                <div style={{ position: "relative", zIndex: 1 }}>
                  <h3 className="perk-txt" style={{ margin: 0, lineHeight: 1, marginBottom: "20px", opacity: 0 }}>
                    <span style={{
                      display: "block",
                      fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                      fontSize: "clamp(28px, 3vw, 46px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.03em",
                      color: "#f0e8df",
                    }}>
                      {perk.titlePlain}
                    </span>
                    <span style={{
                      display: "block",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontSize: "clamp(22px, 2.4vw, 38px)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      color: "rgba(240,232,223,0.6)",
                      marginTop: "2px",
                    }}>
                      {perk.titleItalic}
                    </span>
                  </h3>

                  {/* Separator */}
                  <div className="perk-txt" style={{
                    width: "44px", height: "1px", marginBottom: "16px", opacity: 0,
                    background: "linear-gradient(to right, rgba(255,130,50,0.9), transparent)",
                  }} />

                  <p className="perk-txt" style={{
                    fontSize: "13px", lineHeight: 1.8,
                    color: "rgba(240,232,223,0.36)",
                    maxWidth: "360px", marginBottom: "24px", opacity: 0,
                  }}>
                    {perk.desc}
                  </p>

                  <div className="perk-txt" style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.05)", opacity: 0,
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
                      <span style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontSize: "28px", fontWeight: 700,
                        color: "rgb(255,130,50)", lineHeight: 1,
                      }}>
                        {perk.stat.value}
                      </span>
                      <span style={{
                        fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.27)",
                      }}>
                        {perk.stat.label}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: image */}
              <div style={{ position: "relative", overflow: "hidden", background: "#060504" }}>
                <img
                  src={perk.image}
                  alt={perk.titlePlain}
                  className="perk-img-inner"
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.5) saturate(0.55)",
                    transformOrigin: "left center",
                    willChange: "transform",
                  }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.35) 0%, transparent 55%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 45%)" }} />
                {/* Orange wipe edge — follows the clip-path reveal front */}
                <div style={{
                  position: "absolute", top: 0, bottom: 0, right: 0,
                  width: "3px",
                  background: "linear-gradient(to bottom, transparent 5%, rgba(255,110,30,0.8) 35%, rgba(255,110,30,0.8) 65%, transparent 95%)",
                  pointerEvents: "none",
                }} />
                {/* Badge */}
                <div style={{
                  position: "absolute", top: "20px", right: "20px",
                  padding: "4px 12px",
                  background: "rgba(255,90,20,0.08)",
                  border: "1px solid rgba(255,110,30,0.2)",
                  borderRadius: "999px",
                  fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "rgba(255,200,140,0.55)",
                }}>
                  {perk.titlePlain}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Scroll progress bar — bottom edge ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.06)",
          zIndex: 20,
        }}>
          <div
            ref={progressRef}
            style={{
              height: "100%", width: "0%",
              background: "linear-gradient(to right, rgb(255,100,30), rgb(255,160,60))",
              transition: "width 0.05s linear",
            }}
          />
        </div>

        {/* SCROLL DOWN hint — fades out as user scrolls */}
        <div style={{
          position: "absolute", bottom: "24px", right: "28px",
          fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.18)",
          zIndex: 20,
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span>Scroll</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ─── Open Roles ────────────────────────────────────────────────────────────────
// FIX: rows were stuck at opacity:0 because they only ever became visible
// when an IntersectionObserver event fired. If that observer never fires
// for an element (e.g. it's already in the viewport when the effect runs,
// or a fast route transition / StrictMode double-mount drops the event),
// the row stays invisible forever — which is exactly the empty gap you saw
// between the table borders. The fix below adds an immediate visibility
// check on mount as a safety net, and unobserves each row individually
// once revealed instead of relying on one shared observer.
function OpenRoles() {
  const headerRef = useRef<HTMLDivElement>(null);
  // Mount-time reveal — no IntersectionObserver. This guarantees the rows
  // become visible a beat after the component mounts, regardless of scroll
  // position, ancestor overflow/sticky context, or observer timing quirks.
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const hEl = headerRef.current;
    if (hEl) {
      hEl.style.animation = "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both";
    }
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <div ref={headerRef} style={{ opacity: 0, marginBottom: "40px" }}>
          <p style={{
            fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(240,232,223,0.32)", marginBottom: "20px",
          }}>
            [Decoding Tomorrow]
          </p>
          <h2 style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 700,
            lineHeight: 0.92,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "#f0e8df",
            margin: 0,
            marginBottom: "16px",
          }}>
            Are you the missing variable in {" "}
            <em style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              color: "rgb(255,130,50)",
              textTransform: "none",
            }}>
              Jarvis Equation.
            </em>
          </h2>
          <p style={{ fontSize: "15px", lineHeight: 1.7, color: "rgba(240,232,223,0.38)", maxWidth: "480px" }}>
            Ready to synchronize with our team? If you reside in Ahmedabad, we want to hear from you.Join Jarvis Technolabs today and turn your technical prowess into a legacy.
            Share your updated resume at{" "}
            <a href="mailto:talent@jarvistechnolabs.com" style={{ color: "rgb(255,130,50)" }}>
              talent@jarvistechnolabs.com
            </a>
            .
          </p>
        </div>

        <ul
          style={{
            listStyle: "none", padding: 0, margin: 0,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {ROLES.map((r, i) => (
            <li
              key={r.title}
              style={{
                padding: "32px 0",
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "24px",
                borderBottom: i < ROLES.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, padding 0.3s ease`,
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  color: "#f0e8df",
                  margin: 0,
                  marginBottom: "6px",
                }}>
                  {r.title}
                </h3>
                <p style={{
                  fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: "rgba(240,232,223,0.32)", margin: 0,
                }}>
                  {r.exp} · {r.loc}
                </p>
              </div>
              <a
                href={`mailto:talent@jarvistechnolabs.com?subject=Application — ${encodeURIComponent(r.title)}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                  color: "rgba(255,130,50,0.8)",
                  border: "1px solid rgba(255,130,50,0.25)",
                  borderRadius: "4px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,130,50,0.7)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,90,20,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,130,50,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                Apply →
              </a>
            </li>
          ))}
        </ul>

        <p style={{
          marginTop: "32px", fontSize: "13px", lineHeight: 1.7,
          color: "rgba(240,232,223,0.3)",
        }}>
          * Please note that these are <em style={{ color: "rgba(240,232,223,0.55)", fontStyle: "normal" }}>in-office</em>;
          positions, and we are exclusively seeking local visionaries residing in Ahmedabad, Gujarat.
        </p>
      </div>
    </section>
  );
}

// ─── Route & Page ─────────────────────────────────────────────────────────────
export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Jarvis Technolabs" },
      {
        name: "description",
        content: "Build a future you believe in. Join Jarvis Technolabs in Ahmedabad — open BDE and Quality Analyst roles.",
      },
      { property: "og:title", content: "Careers — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Building experiences that are happier, engaging and meaningful.",
      },
    ],
  }),
});

function CareersPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <style>{KEYFRAMES}</style>
      <Nav />

      <AnimatedHero
        bgImage={careersImg}
        eyebrow="CAREERS · LIFE AT JARVIS"
        title={
          <>
            The next big thing is  <em className="text-shimmer not-italic font-light">YOU</em>
          </>
        }
        description="In the world of IT, you’re either ahead of the curve or part of the past. We’re looking for enthusiasts who are all ears for new ideas and ready to hit the ground running on global scales. At Jarvis, we don’t just play the game; we change the way it’s played."
      >
        <a
          href="mailto:talent@jarvistechnolabs.com"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
        >
          Shape the future →
        </a>
      </AnimatedHero>

      {/* ── People-first: PieterKoopt /stories style gallery ── */}
      <CultureGallery />

      {/* ── More than a paycheck: PieterKoopt /how-it-works sticky cards ── */}
      <PerksSection />

      {/* ── Open Roles ── */}
      <OpenRoles />

      <CTA
        eyebrow="JOIN US · LIFE AT JARVIS"
        title={
          <>
            Don't see your role?{" "}
            <em className="text-warm not-italic font-light">Write to us.</em>
          </>
        }
        description="We're always meeting curious engineers, designers and operators. Drop a note — we read every application."
        primaryLabel="Email talent team →"
        primaryTo="/contact"
        secondaryLabel="About Jarvis"
        secondaryTo="/about"
      />
      <Footer />
    </main>
  );
}