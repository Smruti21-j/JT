import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Local image imports (Prime Directives + Story Chapters) ─────────────────
import philosophyImg from "@/assets/Philosophy.png";
import northStarImg from "@/assets/northstar.png";
import ethosImg from "@/assets/ethos.png";
import aboutHeroImg from "@/assets/abouthero.png";
import about1Img from "@/assets/about1.png";
import about2Img from "@/assets/about2.png";


import impactEchoImg from "@/assets/impactecho.png";
import syntheticIntuitionImg from "@/assets/syntheticintuition.png";
import infiniteBlueprintImg from "@/assets/infiniteblueprint.png";
import velocityParadoxImg from "@/assets/velocityparadox.png";
import unfilteredLightImg from "@/assets/unfilteredlight.png";

// ─── Image assets ─────────────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65f2_405c5347b7528106c9da19b52991b959_template-img-11.avif",
  fullBleed: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65ff_48c19f09c8468d5bc67a2efb745438e2_template-img-3.avif",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const STORY_CHAPTERS = [
  {
    n: "01",
    heading: "The Philosophy",
    sub: "Approach",
    body: "Imagine a world where software isn't a cost centre, but a scalable engine for economic value. This isn't about building tools — it's about engineering outcomes. By stripping away technical noise, the focus remains on clarity and measurable impact.",
    img: philosophyImg,
  },
  {
    n: "02",
    heading: "The North Star",
    sub: "Vision & Mission",
    body: "The Vision: To cultivate a legacy of trust by transmuting complex challenges into excellent value. The Mission: To ignite disruptive growth through the seamless integration of digital innovation and human ingenuity.",
    img: northStarImg,
  },
  {
    n: "03",
    heading: "The Ethos",
    sub: "Values",
    body: "Integrity is not a line in a contract; it is the bedrock upon which every grand ambition is built. In a world of shifting sands, transparency acts as the mortar — invisible yet essential.",
    img: ethosImg,
  },
];

const DIRECTIVES = [
  {
    n: "01",
    title: "The Impact Echo",
    question: "Does the signal reach the horizon?",
    body: "In the hunt for digital transformation, the goal isn't to 'finish' a task, but to create a permanent ripple. If the solution doesn't fundamentally shift the trajectory of the business, it is merely noise. True innovation is measured by the resonance it leaves behind — long after the code is deployed.",
    ask: "Is this a temporary fix, or a permanent evolution?",
    img: impactEchoImg,
  },
  {
    n: "02",
    title: "Synthetic Intuition",
    question: "Thinking beyond the human limit.",
    body: "The era of 'using' tools is over. The new standard is an AI-native pulse — a seamless blend of seasoned wisdom and algorithmic speed. By embedding automation into the very DNA of the strategy, the 'impossible' is decoded in real-time.",
    ask: "What could happen if your strategy thought a thousand times faster than your competitors?",
    img: syntheticIntuitionImg,
  },
  {
    n: "03",
    title: "The Infinite Blueprint",
    question: "Engineering the immortality of success.",
    body: "To scale is to ensure that brilliance never fades. By capturing 'lightning in a bottle' and turning it into a living, breathing digital map, success is no longer a lucky strike — it is a repeatable harvest.",
    ask: "Are you building a monument that stands still, or a city that grows itself?",
    img: infiniteBlueprintImg,
  },
  {
    n: "04",
    title: "The Velocity Paradox",
    question: "Doing less to achieve everything.",
    body: "The future belongs to the precise, not the busy. By isolating the 'Heart-Line' — the vital few movements that spark 80% of the value — innovation is delivered at a pace that feels like magic.",
    ask: "If you could only keep one feature to save the company, which one would it be?",
    img: velocityParadoxImg,
  },
  {
    n: "05",
    title: "Unfiltered Light",
    question: "The shortest path to the summit.",
    body: "Complexity often hides in the shadows of 'polite' feedback. Transformation requires the unvarnished truth. This is a partnership built on radical transparency — the kind that prioritises the health of the enterprise over the comfort of the boardroom.",
    ask: "Would you rather hear a beautiful lie, or see the map to a real solution?",
    img: unfilteredLightImg,
  },
];

// ─── Global styles ────────────────────────────────────────────────────────────
const STYLES = `
.abt-page{
  --bg:      var(--color-background);
  --surface: var(--color-card);
  --card:    var(--color-card);
  --ink:     var(--color-foreground);
  --ink-dim: var(--color-muted-foreground);
  --ink-faint: color-mix(in oklch, var(--color-muted-foreground) 75%, transparent);
  --line:    var(--color-border);
  --acc:     var(--color-primary);
  --acc-fg:  var(--color-primary-foreground);
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  min-height: 100vh;
}

@keyframes abtIn{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes abtLineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}

.abt-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--ink-faint); margin-bottom:20px;
  display:flex; align-items:center; gap:10px;
}
.abt-eyebrow::before{ content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0; }

.abt-section{ padding: clamp(5rem,9vw,8rem) 0; border-top: 1px solid var(--line); }
.abt-wrap{ max-width: 1600px; margin: 0 auto; padding: 0 clamp(20px,4vw,48px); }

/* ── Hero ── */
.abt-hero{
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
    var(--bg);
  border-bottom: 1px solid var(--line);
}
.abt-hero-inner{
  position: relative;
  z-index: 2;
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
  padding: 8rem clamp(20px,4vw,48px) 4rem;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 3rem;
  align-items: center;
}
.abt-hero-image{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.abt-hero-image img{
  width: 130%;
  max-width: none;
  height: auto;
  object-fit: contain;
  animation: abtHeroFloat 7s ease-in-out infinite;
}
@keyframes abtHeroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
@media (max-width: 900px){
  .abt-hero-inner{ grid-template-columns: 1fr; text-align: center; }
  .abt-hero-image{ order: -1; margin-bottom: 2rem; }
}
.abt-hero-title{ margin-bottom:28px; max-width: 820px; }
.abt-hero-sub{
  font-size:15px; color:var(--ink-dim); line-height:1.75;
  max-width:600px; margin-bottom:0;
}
.abt-hero-line{
  margin-top:36px; height:1px; width:120px;
  background:linear-gradient(to right, var(--acc), transparent);
  transform-origin:left;
  animation: abtLineGrow 1s cubic-bezier(.22,1,.36,1) .4s both;
}

/* ── Manifesto ── */
.manifesto-grid{
  display:grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(3rem,6vw,6rem);
  align-items:start;
}
.manifesto-h2{
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6.2vw, 6.6rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0;
}
.manifesto-h2 em{ font-style: italic; font-weight: 400; color: var(--acc); font-family: var(--font-display); }
.manifesto-rule{
  margin-top: 28px; height: 1px; background: var(--line);
  transform-origin: left; transform: scaleX(0);
  transition: transform 1s cubic-bezier(0.16,1,0.3,1) .3s;
}
.manifesto-rule.in{ transform: scaleX(1); }
.manifesto-body p{ font-size: 15px; line-height: 1.85; color: var(--ink-dim); margin: 0 0 1.1rem; }
.manifesto-body p em{ color: var(--ink); font-style: italic; }

.manifesto-imgcol{ position: relative; padding-bottom: clamp(2rem, 6vw, 3.5rem); padding-right: clamp(1.25rem, 5vw, 3rem); }
.manifesto-img-main{
  position: relative; aspect-ratio: 4/5; border-radius: 16px; overflow: hidden;
  border: 1px solid var(--line);
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.1s cubic-bezier(0.65,0,0.2,1);
}
.manifesto-img-main.in{ clip-path: inset(0 0 0% 0); }
.manifesto-img-main img{
  width: 100%; height: 100%; object-fit: cover; display: block;
  transform: scale(1.08); transition: transform 1.2s cubic-bezier(0.16,1,0.3,1);
}
.manifesto-img-main.in img{ transform: scale(1); }
.manifesto-img-accent{
  position: absolute; right: 0; bottom: 0; width: 46%; aspect-ratio: 5/4;
  border-radius: 14px; overflow: hidden; border: 5px solid var(--bg);
  box-shadow: 0 24px 48px -16px rgba(0,0,0,0.25);
  opacity: 0; transform: translate(32px, 24px) scale(0.96);
  transition: opacity .8s cubic-bezier(0.16,1,0.3,1) .4s, transform .8s cubic-bezier(0.16,1,0.3,1) .4s;
}
.manifesto-img-accent.in{ opacity: 1; transform: translate(0,0) scale(1); }
.manifesto-img-accent img{ width: 100%; height: 100%; object-fit: cover; display: block; }
.manifesto-img-tag{
  position: absolute; top: 14px; left: 14px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--ink); background: color-mix(in oklch, var(--bg) 75%, transparent);
  backdrop-filter: blur(6px); padding: 6px 12px; border: 1px solid var(--line);
  border-radius: 999px; opacity: 0; transition: opacity .6s ease .7s;
}
.manifesto-img-tag.in{ opacity: 1; }

/* ── Story Chapters ── */
.story-header{ max-width: 1600px; margin: 0 auto clamp(2.5rem,5vw,4rem); padding: 0 clamp(20px,4vw,48px); }
.story-chapters-wrap{ max-width: 1600px; margin: 0 auto; padding: 0 clamp(20px,4vw,48px); }

.story-chapter-row{
  display: grid; grid-template-columns: 70px 1fr 380px; gap: 0;
  border-bottom: 1px solid var(--line);
  position: relative; overflow: hidden;
  transition: background 0.3s ease;
}
.story-chapter-row:first-of-type{ border-top: 1px solid var(--line); }
.story-chapter-row:hover{ background: color-mix(in oklch, var(--acc) 3%, transparent); }
.story-chapter-row:hover .story-chapter-bar{ transform: scaleY(1); }

.story-chapter-bar{
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--acc);
  transform-origin: top; transform: scaleY(0);
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.story-chapter-n{
  font-family: var(--font-display); font-style: italic; font-weight: 700;
  font-size: clamp(1.6rem,3vw,2.6rem); color: var(--acc); line-height: 1;
  padding: 2.25rem 0; align-self: center; flex-shrink: 0; opacity: 0.65;
}
.story-chapter-meta{ display: flex; flex-direction: column; justify-content: center; gap: 6px; padding: 2.25rem 2.25rem 2.25rem 0; }
.story-chapter-sub{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--ink-faint);
}
.story-chapter-heading{
  font-family: var(--font-display); font-size: clamp(1.35rem,2.4vw,1.9rem); font-weight: 800;
  color: var(--ink); margin-bottom: 0.5rem; line-height: 1.12;
}
.story-chapter-body{ font-size: 13.5px; line-height: 1.75; color: var(--ink-dim); max-width: 46ch; margin: 0; }

.story-chapter-img-wrap{ position: relative; overflow: hidden; height: 200px; align-self: stretch; border-radius: 0; }
.story-chapter-img-wrap img{
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.14); transition: transform 1.3s cubic-bezier(0.16,1,0.3,1);
}
.story-chapter-row.curtain-open .story-chapter-img-wrap img{ transform: scale(1.0); }
.story-curtain{
  position: absolute; inset: 0; top: 0; bottom: 0; width: 50%; background: var(--bg); z-index: 2;
  transition: transform 1s cubic-bezier(0.65,0,0.35,1);
}
.story-curtain.left{ left: 0; transform: translateX(0); }
.story-curtain.right{ right: 0; transform: translateX(0); }
.story-chapter-row.curtain-open .story-curtain.left{ transform: translateX(-100%); }
.story-chapter-row.curtain-open .story-curtain.right{ transform: translateX(100%); }
.story-img-num{
  position: absolute; bottom: 0.7rem; right: 1rem;
  font-family: var(--font-display); font-size: clamp(2.5rem,6vw,4.5rem); font-weight: 800; line-height: 1;
  color: color-mix(in oklch, var(--card) 60%, white 10%); user-select: none; z-index: 1;
  opacity: 0; transition: opacity 0.6s ease 0.5s;
}
.story-chapter-row.curtain-open .story-img-num{ opacity: 1; }

@media (max-width: 900px){
  .story-chapter-row{ grid-template-columns: 52px 1fr; }
  .story-chapter-img-wrap{ display: none; }
}

/* ── Prime Directives ── */
.dir-header-grid{
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem,6vw,7rem);
  margin-bottom: clamp(2.5rem,5vw,4rem); align-items: end;
}
@media (max-width: 900px){ .dir-header-grid{ grid-template-columns: 1fr; gap: 1.5rem; } }
.dir-heading{
  font-family: var(--font-display); font-size: clamp(2.5rem, 6.2vw, 6.6rem); font-weight: 800;
  line-height: 1.08; letter-spacing: -0.01em; color: var(--ink); margin: 0;
}
.dir-heading em{ font-style: italic; font-weight: 400; color: var(--acc); font-family: var(--font-display); }
.dir-header-desc{ font-size: 15px; line-height: 1.8; color: var(--ink-dim); margin: 0; }

.dir-grid{ display: grid; grid-template-columns: 260px 1fr; border: 1px solid var(--line); border-radius: 20px; overflow: hidden; }
@media (max-width: 900px){ .dir-grid{ grid-template-columns: 1fr; } .dir-sidebar{ display: none; } }

.dir-sidebar{ border-right: 1px solid var(--line); }
.dir-tab{
  display: block; width: 100%; padding: 1.5rem 1.4rem;
  border: none; border-bottom: 1px solid var(--line); background: transparent;
  text-align: left; cursor: pointer; position: relative; overflow: hidden;
  transition: background 0.2s ease; color: inherit;
}
.dir-tab:last-child{ border-bottom: none; }
.dir-tab:hover{ background: color-mix(in oklch, var(--acc) 4%, transparent); }
.dir-tab.active{ background: color-mix(in oklch, var(--acc) 6%, transparent); }
.dir-tab-bar{
  position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--acc);
  transform: scaleY(0); transform-origin: top; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.dir-tab.active .dir-tab-bar{ transform: scaleY(1); }
.dir-tab-progress{ position: absolute; bottom: 0; left: 0; height: 2px; background: var(--acc); transition: width 0.05s linear; }
.dir-tab-n{
  font-family: var(--font-display); font-style: italic; font-weight: 700; font-size: 12px;
  color: var(--ink-faint); margin-bottom: 6px; transition: color 0.3s ease;
}
.dir-tab.active .dir-tab-n{ color: var(--acc); }
.dir-tab-title{
  font-family: var(--font-sans); font-size: 14px; font-weight: 700;
  color: var(--ink-dim); margin-bottom: 4px; transition: color 0.3s ease;
}
.dir-tab.active .dir-tab-title{ color: var(--ink); }
.dir-tab-q{ font-family: var(--font-display); font-style: italic; font-size: 11.5px; color: var(--ink-faint); line-height: 1.5; margin: 0; }

.dir-panel{ display: grid; grid-template-columns: 1fr 360px; min-height: 420px; animation: dirFadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }
@keyframes dirFadeUp{ from{ opacity: 0; transform: translateY(14px); } to{ opacity: 1; transform: none; } }
@media (max-width: 900px){ .dir-panel{ grid-template-columns: 1fr; } .dir-img-panel{ min-height: 220px; } }

.dir-content{ padding: clamp(2rem,4vw,3rem) clamp(1.75rem,3.5vw,3rem); display: flex; flex-direction: column; justify-content: space-between; }
.dir-directive-label{
  font-family: var(--font-mono, ui-monospace, monospace); font-size: 9px; letter-spacing: 0.25em;
  text-transform: uppercase; color: var(--ink-faint); margin-bottom: 1.25rem; display: flex; align-items: center; gap: 10px;
}
.dir-directive-label::after{ content: ''; flex: 1; height: 1px; background: var(--line); }
.dir-h3{ font-family: var(--font-display); font-size: clamp(1.8rem,3.2vw,2.8rem); font-weight: 800; line-height: 1.05; color: var(--ink); margin: 0 0 0.5rem; }
.dir-question{ font-family: var(--font-display); font-style: italic; font-size: 14.5px; color: rgb(237, 99, 35); margin: 0 0 1.5rem; }
.dir-body{ font-size: 14px; line-height: 1.85; color: var(--ink-dim); max-width: 46ch; margin: 0; }
.dir-ask{
  margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--line);
  font-family: var(--font-display); font-style: italic; font-size: 13.5px; color: rgb(237, 99, 35); line-height: 1.65;
}
.dir-dots{ display: flex; gap: 6px; margin-top: 1.5rem; align-items: center; }
.dir-dot{
  border: none; cursor: pointer; background: var(--line); height: 5px; border-radius: 3px;
  transition: all 0.4s ease; padding: 0;
}
.dir-dot.active{ background: var(--acc); width: 22px !important; }

.dir-img-panel{ position: relative; overflow: hidden; }
.dir-img-panel img{
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  transition: transform 1s cubic-bezier(0.4,0,0.2,1);
}
.dir-img-panel:hover img{ transform: scale(1.05); }
.dir-img-num{
  position: absolute; bottom: 1.25rem; right: 1.25rem;
  font-family: var(--font-display); font-size: clamp(3rem,8vw,7rem); font-weight: 800;
  line-height: 1; color: rgba(255,255,255,0.18); user-select: none;
}

/* ── CTA band ── */
.cta-band{ border-top: 1px solid var(--line); }
.cta-band-inner{ display: grid; grid-template-columns: 0.85fr 1.15fr; align-items: stretch; min-height: clamp(320px, 38vw, 460px); }
@media (max-width: 800px){ .cta-band-inner{ grid-template-columns: 1fr; } .cta-band-img{ min-height: 260px; } }
.cta-band-img{ position: relative; overflow: hidden; }
.cta-band-img img{ width: 100%; height: 100%; object-fit: cover; display: block; }
.cta-band-text{
  display: flex; flex-direction: column; align-items: flex-start; justify-content: center;
  gap: 26px; padding: clamp(2.5rem,5vw,4rem) clamp(2rem,5vw,4rem);
}
.cta-h2{
  font-family: var(--font-display); font-size: clamp(2rem,4.2vw,3.4rem); font-weight: 800;
  line-height: 1.12; letter-spacing: -0.01em; color: var(--ink); margin: 0;
}
.cta-h2 em{ font-style: italic; font-weight: 400; color: var(--acc); }
.cta-btn{
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--acc-fg); background: var(--acc); border-radius: 999px;
  padding: 15px 30px; cursor: pointer; text-decoration: none;
  box-shadow: 0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
  transition: transform 0.25s ease;
}
.cta-btn:hover{ transform: translateY(-2px); }
.cta-btn svg{ width: 14px; height: 14px; }
`;

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

// ─── Directive Cards ──────────────────────────────────────────────────────────
function DirectiveCards() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const DURATION = 6000;

  const goTo = useCallback((idx: number) => {
    setActiveIdx(idx);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (paused) { if (rafRef.current) cancelAnimationFrame(rafRef.current); return; }
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
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [paused, activeIdx]);

  const [sectionRef, sectionVis] = useInView(0.1);
  const active = DIRECTIVES[activeIdx];

  return (
    <div
      ref={sectionRef}
      style={{
        opacity: sectionVis ? 1 : 0,
        transform: sectionVis ? "none" : "translateY(28px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="dir-grid">
        <div className="dir-sidebar">
          {DIRECTIVES.map((d, i) => (
            <button
              key={d.n}
              className={`dir-tab ${i === activeIdx ? "active" : ""}`}
              onClick={() => { goTo(i); setPaused(false); }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="dir-tab-bar" />
              {i === activeIdx && (
                <div className="dir-tab-progress" style={{ width: `${progress}%` }} />
              )}
              <div className="dir-tab-n">{d.n}</div>
              <div className="dir-tab-title">{d.title}</div>
              <div className="dir-tab-q">{d.question}</div>
            </button>
          ))}
        </div>

        <div
          key={activeIdx}
          className="dir-panel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="dir-content">
            <div>
              <div className="dir-directive-label">Directive {active.n}</div>
              <h3 className="dir-h3">{active.title}</h3>
              <p className="dir-question">"{active.question}"</p>
              <p className="dir-body">{active.body}</p>
            </div>
            <div>
              <p className="dir-ask">{active.ask}</p>
              <div className="dir-dots">
                {DIRECTIVES.map((_, i) => (
                  <button
                    key={i}
                    className={`dir-dot ${i === activeIdx ? "active" : ""}`}
                    onClick={() => goTo(i)}
                    style={{ width: i === activeIdx ? "22px" : "5px" }}
                    aria-label={`Go to directive ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="dir-img-panel">
            <img src={active.img} alt="" />
            <div className="dir-img-num">{active.n}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Story Chapters with curtain-reveal animation ────────────────────────────
function StoryChapters() {
  const [ref, vis] = useInView(0.1);

  return (
    <section className="abt-section" style={{ paddingBottom: "clamp(5rem,9vw,8rem)" }}>
      <div className="story-header">
        <div ref={ref as React.RefObject<HTMLDivElement>}>
          <p className="abt-eyebrow" style={{ opacity: vis ? 1 : 0, transition: "opacity 0.6s ease" }}>
            The Evolution · Our Story
          </p>
          <h2
            className="dir-heading"
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(20px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Beyond the code.
            <br />
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
              The Narrative
            </em>
          </h2>
        </div>
      </div>

      <div className="story-chapters-wrap">
        {STORY_CHAPTERS.map((ch, i) => (
          <StoryChapterRow key={ch.n} ch={ch} i={i} />
        ))}
      </div>
    </section>
  );
}

function StoryChapterRow({ ch, i }: { ch: typeof STORY_CHAPTERS[0]; i: number }) {
  const [ref, vis] = useInView(0.15);
  const [curtainOpen, setCurtainOpen] = useState(false);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`story-chapter-row${curtainOpen ? " curtain-open" : ""}`}
      onMouseEnter={() => setCurtainOpen(true)}
      onMouseLeave={() => setCurtainOpen(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(18px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
      }}
    >
      <div className="story-chapter-bar" />
      <span className="story-chapter-n">{ch.n}</span>
      <div className="story-chapter-meta">
        <span className="story-chapter-sub">{ch.sub}</span>
        <span className="story-chapter-heading">{ch.heading}</span>
        <p className="story-chapter-body">{ch.body}</p>
      </div>
      <div className="story-chapter-img-wrap">
        <img src={ch.img} alt="" loading="lazy" />
        <div className="story-img-num">{ch.n}</div>
        <div className="story-curtain left" />
        <div className="story-curtain right" />
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
      { name: "description", content: "The Catalyst, Not the Vendor. Stop chasing the digital curve — chart it." },
      { property: "og:title", content: "About — Jarvis Technolabs" },
      { property: "og:description", content: "Technology is never a line item — it is an unfair advantage." },
    ],
  }),
});

// ─── Page ─────────────────────────────────────────────────────────────────────
function AboutPage() {
  const { theme, toggleTheme } = useThemeInit();

  const [manifestoRef, manifestoVis] = useInView(0.1);
  const [dirHeaderRef, dirHeaderVis] = useInView(0.1);

  const ruleRef = useRef<HTMLDivElement>(null);
  const [ruleVis, setRuleVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setRuleVis(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ruleRef.current) obs.observe(ruleRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="abt-page bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="abt-hero">
        <div className="abt-hero-inner">
          <div>
            <p className="abt-eyebrow">ABOUT US</p>
            <h1 className="abt-hero-title section-title">
              The Catalyst,
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
                not the vendor
              </em>
            </h1>
            <p className="abt-hero-sub">
              Stop chasing the digital curve — chart it. The world has enough vendors; it craves a catalyst.
              We transform bold ideas into intelligent systems that scale with confidence.
              From strategy to execution, every solution is engineered for impact, resilience, and lasting growth.
              The future doesn't belong to those who react—it belongs to those who build.
            </p>
            <div className="abt-hero-line" />
          </div>

          <div className="abt-hero-image">
            <img src={aboutHeroImg} alt="Jarvis Technolabs — about illustration" />
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div ref={manifestoRef as React.RefObject<HTMLDivElement>} className="manifesto-grid">
            <div
              style={{
                opacity: manifestoVis ? 1 : 0,
                transform: manifestoVis ? "none" : "translateY(28px)",
                transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p className="abt-eyebrow">The Catalyst Manifesto</p>
              <h2 className="manifesto-h2">
                The reactive <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>break-fix</em> script belongs to the past
              </h2>
              <div ref={ruleRef} className={`manifesto-rule ${ruleVis ? "in" : ""}`} />

              <div className="manifesto-body" style={{ marginTop: "2rem" }}>
                <p>
                  The world has enough vendors; it craves a catalyst. While the industry obsesses
                  over mere uptime, the real work lies in architecting what's next.
                </p>
                <p>
                  Technology is never a line item — it is an <em>unfair advantage</em>. By merging
                  radical foresight with technical grit, the "impossible" is transmuted into a
                  scalable industry benchmark.
                </p>
                <p>
                  To us, technology isn't a line item — it's your unfair advantage. By merging
                  radical foresight with technical grit, we turn your "impossible" into the industry
                  benchmark.
                </p>
              </div>
            </div>

           <div className="manifesto-imgcol">
  <div className={`manifesto-img-main${manifestoVis ? " in" : ""}`}>
    <img src={about1Img} alt="Studio interior" />
  </div>
  <div className={`manifesto-img-accent${manifestoVis ? " in" : ""}`}>
    <img src={about2Img} alt="" loading="lazy" />
    <span className={`manifesto-img-tag${manifestoVis ? " in" : ""}`}>At work</span>
  </div>
</div>
          </div>
        </div>
      </section>

      {/* ── STORY CHAPTERS ──────────────────────────────────────────────── */}
      <StoryChapters />

      {/* ── PRIME DIRECTIVES ────────────────────────────────────────────── */}
      <section className="abt-section">
        <div className="abt-wrap">
          <div
            ref={dirHeaderRef as React.RefObject<HTMLDivElement>}
            className="dir-header-grid"
            style={{
              opacity: dirHeaderVis ? 1 : 0,
              transform: dirHeaderVis ? "none" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div>
              <p className="abt-eyebrow">The Prime Directives</p>
              <h2 className="dir-heading">
                How the future is forged,
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}>
                  day by day
                </em>
              </h2>
            </div>
            <div>
              <p className="dir-header-desc">
                Five governing principles that shape every decision, every architecture, every
                partnership. Not guidelines — prime directives. Each one cycles automatically, or
                navigate at your own pace.
              </p>
            </div>
          </div>

          <DirectiveCards />
        </div>
      </section>

   

      <Footer theme={theme} />
    </main>
  );
}