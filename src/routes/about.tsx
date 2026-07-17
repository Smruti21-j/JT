import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useEffect, useRef, useState, useCallback } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// ─── Local image imports (Prime Directives + Story Chapters) ─────────────────
import philosophyImg from "@/assets/Philosophy.png";
import northStarImg from "@/assets/northstar.png";
import ethosImg from "@/assets/ethos.png";

import impactEchoImg from "@/assets/impactecho.png";
import syntheticIntuitionImg from "@/assets/syntheticintuition.png";
import infiniteBlueprintImg from "@/assets/infiniteblueprint.png";
import velocityParadoxImg from "@/assets/velocityparadox.png";
import unfilteredLightImg from "@/assets/unfilteredlight.png";

// ─── Image assets ─────────────────────────────────────────────────────────────
const IMAGES = {
  hero: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65f2_405c5347b7528106c9da19b52991b959_template-img-11.avif",
  studioA: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e6522_9fe2584dffc769833f62af721c87891c_template-default-image.avif",
  studioB: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e654b_c867a87cf8ce66dae84c6816be227b28_template-default-img.avif",
  studioC: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65eb_43cf149531ad742914381340bb01fd4a_default-image-tiny-3.avif",
  studioD: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65e4_03e6bb447bac5610614f4ff2fe54d051_vert-1.avif",
  principles: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65a5_6e16db245e0860324599e869fed2c635_template-default-img.avif",
  manifesto: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e6539_bbed3a321b78f03a78aca1785b589c5b_template-default-img.avif",
  fullBleed: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e6294/6a060cd7503d72ff714e65ff_48c19f09c8468d5bc67a2efb745438e2_template-img-3.avif",
  dir1: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e629a/6a0b555a9896f08c0ede8603_staircase-1.avif",
  dir2: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e629a/6a0b55154e49860ec2fb8469_interior-design-10.avif",
  dir3: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e629a/6a0b5508c60c76eabf4898f7_interior-service-43.avif",
  dir4: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e629a/6a108b2049a6a6dca89fb586_homestaging-5.avif",
  dir5: "https://cdn.prod.website-files.com/6a060cd7503d72ff714e629a/6a0b54cf47e90151576ed31f_interior-shot-6.avif",
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const VMV = [
  {
    label: "Vision",
    number: "01",
    body: "To cultivate a legacy of trust by transmuting complex challenges into excellent value — building an enduring enterprise that makes the impossible the industry benchmark.",
    img: IMAGES.dir4,
  },
  {
    label: "Mission",
    number: "02",
    body: "To ignite disruptive growth through the seamless integration of digital innovation and human ingenuity — enabling businesses to leverage technology as an unfair advantage.",
    img: IMAGES.dir5,
  },
  {
    label: "Values",
    number: "03",
    body: "Integrity is not a line in a contract — it is the bedrock upon which every grand ambition is built. Transparency, dignity, and trust are the mortar between every stone we lay.",
    img: IMAGES.manifesto,
  },
];

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
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&family=Barlow+Condensed:wght@300;400;600;700&display=swap');

  .abt-root, .abt-root *, .abt-root *::before, .abt-root *::after {
    box-sizing: border-box;
  }

  .abt-root {
    background: #0a0a09;
    color: #f5f3ef;
    font-family: 'DM Sans', system-ui, sans-serif;
    min-height: 100vh;
  }

  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.in { opacity: 1; transform: none; }

  .img-zoom { overflow: hidden; }
  .img-zoom img {
    transition: transform 1.1s cubic-bezier(0.4,0,0.2,1);
    transform: scale(1.02);
  }
  .img-zoom:hover img { transform: scale(1.07); }

  .hero {
    position: relative;
    min-height: 100svh;
    display: grid;
    grid-template-rows: 1fr auto;
    overflow: hidden;
    background: #0a0a09;
    margin: 0;
  }
  .hero-img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0.4;
    transform: scale(1.04);
    animation: heroScale 14s ease-out forwards;
  }
  @keyframes heroScale {
    to { transform: scale(1); }
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(10,10,9,0.92) 0%, rgba(10,10,9,0.35) 50%, rgba(10,10,9,0.55) 100%);
  }
  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: clamp(5rem,10vw,9rem) clamp(1.5rem,5vw,5rem) clamp(3rem,6vw,5rem);
  }
  .hero-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.45);
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: rgba(245,243,239,0.35);
    flex-shrink: 0;
  }
  .hero-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(3rem, 8vw, 7.5rem);
    font-weight: 400;
    line-height: 1.0;
    color: #f5f3ef;
    letter-spacing: -0.02em;
    max-width: 14ch;
    margin: 0;
  }
  .hero-title em {
    font-style: italic;
    font-weight: 400;
  }
  .hero-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: clamp(13px, 1.4vw, 15px);
    line-height: 1.8;
    color: rgba(245,243,239,0.5);
    max-width: 42ch;
    margin-top: 1.75rem;
  }

  .section { padding: clamp(5rem,9vw,8rem) 0; border-top: 1px solid rgba(245,243,239,0.08); margin: 0; }
  .wrap { max-width: 1280px; margin: 0 auto; padding: 0 clamp(1.5rem,5vw,5rem); }

  .eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.35);
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 0 1.5rem;
  }
  .eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: rgba(245,243,239,0.25);
    flex-shrink: 0;
  }

  .manifesto-grid {
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(3rem,6vw,6rem);
    align-items: start;
  }
  .manifesto-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.75rem);
    font-weight: 400;
    line-height: 1.05;
    color: #f5f3ef;
    letter-spacing: -0.02em;
    margin: 0;
    position: relative;
  }
  .manifesto-h2 em { font-style: italic; }
  .manifesto-quote-mark {
    position: absolute;
    top: -2.5rem;
    left: -0.75rem;
    font-family: 'Playfair Display', serif;
    font-size: clamp(6rem, 12vw, 11rem);
    line-height: 1;
    color: rgba(245,243,239,0.05);
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }
  .manifesto-rule {
    margin-top: 2.5rem;
    height: 1px;
    background: rgba(245,243,239,0.14);
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .manifesto-rule.in { transform: scaleX(1); }
  .manifesto-body p {
    font-size: 15px;
    line-height: 1.9;
    color: rgba(245,243,239,0.5);
    margin: 0 0 1.25rem;
  }
  .manifesto-body p em { color: #f5f3ef; font-style: italic; }

  .manifesto-imgcol {
    position: relative;
    padding-bottom: clamp(2.5rem, 8vw, 5rem);
    padding-right: clamp(1.5rem, 6vw, 3.5rem);
  }
  .manifesto-img-main {
    position: relative;
    aspect-ratio: 4/5;
    border-radius: 2px;
    overflow: hidden;
    clip-path: inset(0 0 100% 0);
    transition: clip-path 1.2s cubic-bezier(0.65,0,0.2,1);
  }
  .manifesto-img-main.in { clip-path: inset(0 0 0% 0); }
  .manifesto-img-main img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.1);
    transition: transform 1.4s cubic-bezier(0.16,1,0.3,1);
  }
  .manifesto-img-main.in img { transform: scale(1); }
  .manifesto-img-accent {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 48%;
    aspect-ratio: 5/4;
    border-radius: 2px;
    overflow: hidden;
    border: 6px solid #0a0a09;
    box-shadow: 0 24px 48px -12px rgba(0,0,0,0.6);
    opacity: 0;
    transform: translate(36px, 28px) scale(0.96);
    transition: opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.45s;
  }
  .manifesto-img-accent.in { opacity: 1; transform: translate(0,0) scale(1); }
  .manifesto-img-accent img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.4,0,0.2,1);
  }
  .manifesto-img-accent:hover img { transform: scale(1.08); }
  .manifesto-img-tag {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.7);
    background: rgba(10,10,9,0.45);
    backdrop-filter: blur(6px);
    padding: 6px 12px;
    border: 1px solid rgba(245,243,239,0.18);
    border-radius: 999px;
    opacity: 0;
    transition: opacity 0.7s ease 0.8s;
  }
  .manifesto-img-main.in ~ .manifesto-img-tag,
  .manifesto-img-tag.in { opacity: 1; }

  .studio-grid {
    display: grid;
    grid-template-columns: 0.95fr 1.05fr;
    gap: clamp(3rem,6vw,6rem);
    align-items: center;
  }
  .studio-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.75rem,3vw,2.75rem);
    font-weight: 400;
    line-height: 1.2;
    color: #f5f3ef;
    letter-spacing: -0.015em;
    margin: 0 0 1.5rem;
  }
  .studio-h2 em { font-style: italic; }
  .studio-p {
    font-size: 15px;
    line-height: 1.9;
    color: rgba(245,243,239,0.5);
    margin: 0;
  }
  .studio-img-wrap {
    position: relative;
    display: flex;
    align-items: stretch;
  }
  .studio-vert-label {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.32);
    padding-right: 1.25rem;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .studio-img-frame {
    position: relative;
    flex: 1;
    aspect-ratio: 4/5;
    border-radius: 2px;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }
  .studio-img-frame img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.12);
    transition: transform 1.4s cubic-bezier(0.16,1,0.3,1);
  }
  .studio-img-frame.in img { transform: scale(1); }
  .studio-float-card {
    position: absolute;
    left: -1.5rem;
    bottom: 2rem;
    background: #0a0a09;
    border: 1px solid rgba(245,243,239,0.12);
    padding: 1.5rem 1.75rem;
    max-width: 230px;
    box-shadow: 0 20px 44px -10px rgba(0,0,0,0.55);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s;
  }
  .studio-float-card.in { opacity: 1; transform: translateY(0); }
  .studio-float-card-n {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(1.8rem,3vw,2.4rem);
    color: rgb(255,150,90);
    line-height: 1;
    margin-bottom: 6px;
  }
  .studio-float-card-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.5);
    line-height: 1.5;
  }

  .story-section {
    padding: clamp(5rem,9vw,8rem) 0;
    border-top: 1px solid rgba(245,243,239,0.08);
    margin: 0;
  }
  .story-header {
    max-width: 1280px;
    margin: 0 auto clamp(3rem,6vw,5rem);
    padding: 0 clamp(1.5rem,5vw,5rem);
  }
  .story-chapters-wrap {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 clamp(1.5rem,5vw,5rem);
  }
  .story-chapter-row {
    display: grid;
    grid-template-columns: 80px 1fr 420px;
    gap: 0;
    border-bottom: 1px solid rgba(245,243,239,0.08);
    padding: 0;
    position: relative;
    overflow: hidden;
    cursor: default;
    transition: background 0.4s ease;
    margin: 0;
  }
  .story-chapter-row:first-of-type { border-top: 1px solid rgba(245,243,239,0.08); }
  .story-chapter-row:hover { background: rgba(245,243,239,0.02); }
  .story-chapter-row:hover .story-chapter-bar { transform: scaleY(1); }
  .story-chapter-row:hover .story-chapter-n { color: rgba(245,243,239,0.28); }

  .story-chapter-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: #f5f3ef;
    transform-origin: top;
    transform: scaleY(0);
    transition: transform 0.55s cubic-bezier(0.16,1,0.3,1);
  }
  .story-chapter-n {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: clamp(2rem,4vw,3.5rem);
    color: rgba(245,243,239,0.12);
    line-height: 1;
    padding: 2.5rem 0;
    align-self: center;
    transition: color 0.4s ease;
    flex-shrink: 0;
    margin: 0;
  }
  .story-chapter-meta {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    padding: 2.5rem 2.5rem 2.5rem 0;
  }
  .story-chapter-sub {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.32);
  }
  .story-chapter-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(1.2rem,2.2vw,1.8rem);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    line-height: 1.1;
    color: #f5f3ef;
    margin-bottom: 0.6rem;
  }
  .story-chapter-body {
    font-size: 13px;
    line-height: 1.85;
    color: rgba(245,243,239,0.42);
    max-width: 44ch;
    margin: 0;
  }

  .story-chapter-img-wrap {
    position: relative;
    overflow: hidden;
    height: 220px;
    align-self: stretch;
  }
  .story-chapter-img-wrap img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transform: scale(1.18);
    transition: transform 1.4s cubic-bezier(0.16,1,0.3,1);
  }
  .story-chapter-row.curtain-open .story-chapter-img-wrap img {
    transform: scale(1.0);
  }
  .story-chapter-row:hover .story-chapter-img-wrap img {
    transform: scale(1.08);
  }
  .story-curtain {
    position: absolute;
    inset: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    background: #0a0a09;
    z-index: 2;
    transition: transform 1.1s cubic-bezier(0.65,0,0.35,1);
  }
  .story-curtain.left { left: 0; transform: translateX(0); }
  .story-curtain.right { right: 0; transform: translateX(0); }
  .story-chapter-row.curtain-open .story-curtain.left { transform: translateX(-100%); }
  .story-chapter-row.curtain-open .story-curtain.right { transform: translateX(100%); }
  .story-chapter-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, #0a0a09 0%, transparent 30%);
    pointer-events: none;
    z-index: 1;
  }
  .story-img-num {
    position: absolute;
    bottom: 0.75rem;
    right: 1rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(3rem,7vw,6rem);
    font-weight: 700;
    line-height: 1;
    color: rgba(245,243,239,0.1);
    user-select: none;
    letter-spacing: -0.04em;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease 0.6s;
    margin: 0;
  }
  .story-chapter-row.curtain-open .story-img-num { opacity: 1; }
  .story-curtain-seam {
    position: absolute;
    left: 50%;
    top: 0; bottom: 0;
    width: 1px;
    background: rgba(245,243,239,0.4);
    z-index: 3;
    opacity: 0;
    transform: scaleY(0);
    transition: opacity 0.3s ease 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s;
  }
  .story-chapter-row.curtain-open .story-curtain-seam {
    opacity: 1;
    transform: scaleY(1);
  }

  .dir-grid {
    display: grid;
    grid-template-columns: 260px 1fr;
    border-top: 1px solid rgba(245,243,239,0.08);
    margin: 0;
  }
  .dir-sidebar { border-right: 1px solid rgba(245,243,239,0.08); margin: 0; }
  .dir-tab {
    display: block;
    width: 100%;
    padding: 1.75rem 1.5rem;
    border: none;
    border-bottom: 1px solid rgba(245,243,239,0.06);
    background: transparent;
    text-align: left;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: background 0.2s ease;
    color: inherit;
    margin: 0;
  }
  .dir-tab:hover { background: rgba(245,243,239,0.03); }
  .dir-tab.active { background: rgba(245,243,239,0.045); }
  .dir-tab-bar {
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 1.5px;
    background: #f5f3ef;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .dir-tab.active .dir-tab-bar { transform: scaleY(1); }
  .dir-tab-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 1px;
    background: rgba(245,243,239,0.4);
    transition: width 0.05s linear;
  }
  .dir-tab-n {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 11px;
    color: rgba(245,243,239,0.3);
    margin-bottom: 6px;
    transition: color 0.3s ease;
  }
  .dir-tab.active .dir-tab-n { color: rgba(245,243,239,0.6); }
  .dir-tab-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(245,243,239,0.42);
    margin-bottom: 3px;
    transition: color 0.3s ease;
  }
  .dir-tab.active .dir-tab-title { color: #f5f3ef; }
  .dir-tab-q {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 11px;
    color: rgba(245,243,239,0.3);
    line-height: 1.5;
    margin: 0;
  }
  .dir-panel {
    display: grid;
    grid-template-columns: 1fr 380px;
    min-height: 440px;
    animation: fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    margin: 0;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: none; }
  }
  .dir-content {
    padding: clamp(2.5rem,5vw,4rem) clamp(2rem,4vw,3.5rem);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid rgba(245,243,239,0.08);
  }
  .dir-directive-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 9px;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(245,243,239,0.32);
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dir-directive-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(245,243,239,0.12);
  }
  .dir-h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem,4vw,3.5rem);
    font-weight: 400;
    line-height: 1.0;
    color: #f5f3ef;
    letter-spacing: -0.02em;
    margin: 0 0 0.5rem;
  }
  .dir-question {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 15px;
    color: rgba(245,243,239,0.4);
    margin: 0 0 2rem;
  }
  .dir-body {
    font-size: 14px;
    line-height: 1.95;
    color: rgba(245,243,239,0.55);
    max-width: 46ch;
    margin: 0;
  }
  .dir-ask {
    margin-top: 2.5rem;
    padding-top: 1.75rem;
    border-top: 1px solid rgba(245,243,239,0.08);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 14px;
    color: rgba(245,243,239,0.5);
    line-height: 1.7;
  }
  .dir-dots {
    display: flex;
    gap: 6px;
    margin-top: 2rem;
    align-items: center;
  }
  .dir-dot {
    border: none;
    cursor: pointer;
    background: rgba(245,243,239,0.16);
    height: 5px;
    border-radius: 3px;
    transition: all 0.4s ease;
    padding: 0;
    margin: 0;
  }
  .dir-dot.active { background: #f5f3ef; width: 22px !important; }
  .dir-img-panel {
    position: relative;
    overflow: hidden;
    margin: 0;
  }
  .dir-img-panel img {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 1.1s cubic-bezier(0.4,0,0.2,1);
    margin: 0;
  }
  .dir-img-panel:hover img { transform: scale(1.05); }
  .dir-img-num {
    position: absolute;
    bottom: 1.5rem;
    right: 1.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: clamp(4rem,10vw,9rem);
    font-weight: 700;
    line-height: 1;
    color: rgba(245,243,239,0.09);
    user-select: none;
    letter-spacing: -0.04em;
    margin: 0;
  }

  /* ── CTA BAND — simple split layout: image left, text right ─────────── */
  .cta-band {
    background: #0a0a09;
    border-top: 1px solid rgba(245,243,239,0.08);
    margin: 0;
  }
  .cta-band-inner {
    display: grid;
    grid-template-columns: 0.85fr 1.15fr;
    align-items: stretch;
    min-height: clamp(360px, 42vw, 520px);
  }
  .cta-band-img {
    position: relative;
    overflow: hidden;
  }
  .cta-band-img img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .cta-band-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2.25rem;
    padding: clamp(3rem,6vw,5rem) clamp(2rem,5vw,5rem);
  }
  .cta-h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem,4.5vw,3.5rem);
    font-weight: 400;
    line-height: 1.15;
    color: #f5f3ef;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .cta-h2 em { font-style: italic; }
  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #f5f3ef;
    background: transparent;
    border: 1px solid rgba(245,243,239,0.3);
    padding: 14px 32px;
    cursor: pointer;
    transition: background 0.3s ease, border-color 0.3s ease;
    text-decoration: none;
    margin: 0;
  }
  .cta-btn:hover { background: rgba(245,243,239,0.08); border-color: rgba(245,243,239,0.6); }
  .cta-btn svg { width: 14px; height: 14px; }

  @media (max-width: 800px) {
    .cta-band-inner { grid-template-columns: 1fr; }
    .cta-band-img { min-height: 280px; }
  }

  @media (max-width: 900px) {
    .manifesto-grid, .studio-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .manifesto-imgcol { padding-right: 0; }
    .manifesto-img-accent { width: 56%; }
    .studio-img-wrap { flex-direction: column; }
    .studio-vert-label { writing-mode: horizontal-tb; transform: none; padding-right: 0; padding-bottom: 0.75rem; }
    .studio-float-card { left: 1rem; right: 1rem; max-width: none; }
    .story-chapter-row { grid-template-columns: 56px 1fr; }
    .story-chapter-img-wrap { display: none; }
    .dir-grid { grid-template-columns: 1fr; }
    .dir-sidebar { display: none; }
    .dir-panel { grid-template-columns: 1fr; }
    .dir-img-panel { min-height: 240px; }
  }
  @media (max-width: 600px) {
    .story-chapter-row { grid-template-columns: 48px 1fr; }
  }
`;

// ─── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
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
        transform: sectionVis ? "none" : "translateY(32px)",
        transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
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

          <div className="dir-img-panel img-zoom">
            <img src={active.img} alt="" />
            <div
              style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(10,10,9,0.05) 0%, transparent 40%)",
              }}
            />
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
    <section className="story-section">
      <div className="story-header">
        <div ref={ref}>
          <p
            className="eyebrow"
            style={{
              opacity: vis ? 1 : 0,
              transition: "opacity 0.7s ease",
            }}
          >
            The Evolution · Our Story
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.2rem,5vw,4.25rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#f5f3ef",
              margin: "0 0 clamp(2.5rem,5vw,4rem)",
              opacity: vis ? 1 : 0,
              transform: vis ? "none" : "translateY(24px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            Beyond the code.<br />
            <em style={{ fontStyle: "italic" }}>The Narrative.</em>
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
      ref={ref}
      className={`story-chapter-row${curtainOpen ? " curtain-open" : ""}`}
      onMouseEnter={() => setCurtainOpen(true)}
      onMouseLeave={() => setCurtainOpen(false)}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(20px)",
        transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
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
        <div className="story-chapter-img-overlay" />
        <div className="story-img-num">{ch.n}</div>
        <div className="story-curtain left" />
        <div className="story-curtain right" />
        <div className="story-curtain-seam" />
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
  const [heroContentRef, heroVis] = useInView(0.05);
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
    <main className="abt-root">
      <style>{STYLES}</style>
      <Nav />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <img className="hero-img" src={IMAGES.hero} alt="Modern interior" />
        <div className="hero-overlay" />

        <div className="hero-content" ref={heroContentRef as React.RefObject<HTMLDivElement>}>
          <p
            className="hero-eyebrow"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(14px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            About Us
          </p>
          <h1
            className="hero-title"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.35s",
            }}
          >
            The Catalyst,<br />
            <em>Not the Vendor.</em>
          </h1>
          <p
            className="hero-desc"
            style={{
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(20px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.5s",
            }}
          >
            Stop chasing the digital curve — chart it. The world has enough vendors; it craves a catalyst.
          </p>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div ref={manifestoRef as React.RefObject<HTMLDivElement>} className="manifesto-grid">
            <div
              style={{
                opacity: manifestoVis ? 1 : 0,
                transform: manifestoVis ? "none" : "translateY(36px)",
                transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <p className="eyebrow">The Catalyst Manifesto</p>
              <h2 className="manifesto-h2">
                <span className="manifesto-quote-mark" aria-hidden="true">&ldquo;</span>
                The reactive<br />
                <em>"break-fix"</em><br />
                script belongs<br />
                to the past.
              </h2>
              <div ref={ruleRef} className={`manifesto-rule ${ruleVis ? "in" : ""}`} />

              <div className="manifesto-body" style={{ marginTop: "2.5rem" }}>
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

            {/* Overlapping image collage */}
            <div className="manifesto-imgcol">
              <div className={`manifesto-img-main${manifestoVis ? " in" : ""}`}>
                <img src={IMAGES.studioA} alt="Studio interior" />
              </div>
              <div className={`manifesto-img-accent${manifestoVis ? " in" : ""}`}>
                <img src={IMAGES.dir4} alt="" loading="lazy" />
                <span className={`manifesto-img-tag${manifestoVis ? " in" : ""}`}>At work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY CHAPTERS (curtain-reveal images) ─────────────────────────── */}
      <StoryChapters />

      {/* ── PRIME DIRECTIVES ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div
            ref={dirHeaderRef as React.RefObject<HTMLDivElement>}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem,6vw,7rem)",
              marginBottom: "clamp(2.5rem,5vw,4rem)",
              alignItems: "end",
              opacity: dirHeaderVis ? 1 : 0,
              transform: dirHeaderVis ? "none" : "translateY(28px)",
              transition: "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div>
              <p className="eyebrow">The Prime Directives</p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.2rem,5vw,4.25rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "#f5f3ef",
                  margin: 0,
                }}
              >
                How the future<br />
                is forged,<br />
                <em style={{ fontStyle: "italic" }}>day by day.</em>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: "15px", lineHeight: 1.85, color: "rgba(245,243,239,0.5)", margin: 0 }}>
                Five governing principles that shape every decision, every architecture, every
                partnership. Not guidelines — prime directives. Each one cycles automatically, or
                navigate at your own pace.
              </p>
            </div>
          </div>

          <DirectiveCards />
        </div>
      </section>

      {/* ── CTA BAND — simple split layout: image + text ─────────────────── */}
      <div className="cta-band">
        <div className="cta-band-inner">
          <div className="cta-band-img">
            <img src={IMAGES.fullBleed} alt="" loading="lazy" />
          </div>
          <div className="cta-band-text">
            <p className="eyebrow" style={{ marginBottom: 0 }}>Get in touch</p>
            <h2 className="cta-h2">
              Have a project in mind?<br />
              <em>Let us hear about it.</em>
            </h2>
            <a href="/contact" className="cta-btn">
              <span>Start a conversation</span>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7h12M8 3l5 4-5 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}