import { Link } from "@tanstack/react-router";
import logo from "@/assets/JT_white.png";
import { useEffect, useRef } from "react";
import { Linkedin, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

import esnaad from "@/assets/brands/image107.png";
import dubaiCulture from "@/assets/brands/image113.png";
import lifelong from "@/assets/brands/image119.png";
import abuDhabiSchool from "@/assets/brands/image122.png";
import pensionFund from "@/assets/brands/image125.png";
import chequeScore from "@/assets/brands/image133.png";
import numoo from "@/assets/brands/image138.png";
import creditReport from "@/assets/brands/image141.png";
import twentyFour from "@/assets/brands/image143.png";
import bloodCenter from "@/assets/brands/image152.png";
import jarvisMart from "@/assets/brands/image155.png";
import bni from "@/assets/brands/image160.png";
import kago from "@/assets/brands/image167.png";
import drBrothers from "@/assets/brands/image172.png";
import lifelongAlt from "@/assets/brands/image198.png";
import guardbay from "@/assets/brands/image203.png";
import sail from "@/assets/brands/image204.png";
import roleplayLabs from "@/assets/brands/image24.png";
import homeMark from "@/assets/brands/image97.png";
import accreditations from "@/assets/acredtions.png";

const BRANDS = [
  { name: "Esnaad",            logo: esnaad,         bg: "#f0f0f0" },
  { name: "Dubai Culture",     logo: dubaiCulture,   bg: "#1a1a1a" },
  { name: "Lifelong",          logo: lifelong,       bg: "#fbbf24" },
  { name: "Abu Dhabi School",  logo: abuDhabiSchool, bg: "#f9a8d4" },
  { name: "Pension Fund",      logo: pensionFund,    bg: "#86efac" },
  { name: "ChequeScore",       logo: chequeScore,    bg: "#c4b5fd" },
  { name: "Numoo",             logo: numoo,          bg: "#fdba74" },
  { name: "CreditReport",      logo: creditReport,   bg: "#7dd3fc" },
  { name: "24",                logo: twentyFour,     bg: "#f87171" },
  { name: "Red Cross",         logo: bloodCenter,    bg: "#fca5a5" },
  { name: "Jarvis Mart",       logo: jarvisMart,     bg: "#4ade80" },
  { name: "BNI",               logo: bni,            bg: "#fb923c" },
  { name: "KaGo",              logo: kago,           bg: "#f0f0f0" },
  { name: "DR Brothers",       logo: drBrothers,     bg: "#a78bfa" },
  { name: "Lifelong Alt",      logo: lifelongAlt,    bg: "#fef08a" },
  { name: "GuardBay",          logo: guardbay,       bg: "#bfdbfe" },
  { name: "Sail",              logo: sail,           bg: "#fecaca" },
  { name: "RoleplayLabs",      logo: roleplayLabs,   bg: "#d9f99d" },
  { name: "Home",              logo: homeMark,       bg: "#fed7aa" },
] as const;

const SCATTER: { tx: number; ty: number; rot: number }[] = [
  { tx: -320, ty: -80,  rot: -6  },
  { tx: -160, ty: -110, rot:  4  },
  { tx:  -40, ty: -95,  rot: -5  },
  { tx:  120, ty: -115, rot:  6  },
  { tx:  260, ty: -85,  rot: -4  },
  { tx:  380, ty: -100, rot:  5  },
  { tx:  500, ty: -90,  rot: -6  },
  { tx:  620, ty: -105, rot:  4  },
  { tx:  740, ty: -80,  rot: -5  },
  { tx:  860, ty: -95,  rot:  6  },
  { tx: -360, ty:  80,  rot:  5  },
  { tx: -200, ty:  95,  rot: -6  },
  { tx:  -60, ty:  75,  rot:  4  },
  { tx:   80, ty:  100, rot: -5  },
  { tx:  200, ty:  80,  rot:  6  },
  { tx:  340, ty:  90,  rot: -4  },
  { tx:  460, ty:  70,  rot:  5  },
  { tx:  580, ty:  95,  rot: -6  },
  { tx:  700, ty:  80,  rot:  4  },
];

function BrandsCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function onScroll() {
      const rect = section!.getBoundingClientRect();
      const winH = window.innerHeight;
      const raw = 1 - rect.top / (winH * 0.8);
      const progress = Math.max(0, Math.min(1, raw));

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const s = SCATTER[i] ?? { tx: 0, ty: 0, rot: 0 };
        const tx  = s.tx  * (1 - progress);
        const ty  = s.ty  * (1 - progress);
        const rot = s.rot * (1 - progress);
        const scale = 0.82 + 0.18 * progress;
        card.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${scale})`;
        card.style.opacity = String(0.3 + 0.7 * progress);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#000",          // ← BLACK background
        padding: "120px 0 80px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* heading — white text on black */}
      <div style={{ textAlign: "center", marginBottom: "56px" }}>
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "10px" }}>
          [Trusted by Leaders]
        </p>
        <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
          The Ecosystem You <span style={{ color: "rgb(249,115,22)" }}>Trust</span>
        </h2>
      </div>

      {/* 6-column grid — larger cards matching your screenshot */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",   // ← 6 columns like screenshot
          gap: "12px",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {BRANDS.map((brand, i) => (
          <div
            key={brand.name}
            ref={(el) => { cardsRef.current[i] = el; }}
            style={{
              aspectRatio: "1 / 1",
              background: brand.bg,
              borderRadius: "12px",              // ← rounder corners like screenshot
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14%",                    // ← generous padding so logo is large
              willChange: "transform, opacity",
              transition: "transform 0.05s linear, opacity 0.05s linear",
              boxSizing: "border-box",
            }}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",            // ← fills the card fully
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Accreditations ──────────────────────────────────────────────────────── */
// Combined ISO 9001 / ISO 27001 badge image. The source PNG is white/mono
// line-art, so it's placed inside a subtle card so it doesn't look like a
// stray white rectangle sitting directly on the black background.
export function Accreditations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: "#000", padding: "80px 0 100px" }}>
      <div ref={sectionRef} style={{ textAlign: "center" }}>
        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          [Accreditations]
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "40px",
          }}
        >
          Certified <span style={{ color: "rgb(249,115,22)" }}>Standards</span>
        </h2>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "28px 48px",
          }}
        >
          <img
            src={accreditations}
            alt="ISO 9001 and ISO 27001 Certified"
            style={{ height: "84px", width: "auto", maxWidth: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
type CTAProps = { showBrands?: boolean };
export function CTA({ showBrands = false }: CTAProps = {}) {
  return <>{showBrands && <BrandsCarousel />}</>;
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
const FOOTER_COLS = [
  {
    title: "AI Systems",
    links: [
      { label: "Autonomous Workflows", to: "/services/$slug", params: { slug: "digital-transformation" } },
      { label: "Decision Intelligence",  to: "/services/$slug", params: { slug: "data-ai" } },
      { label: "AI Infrastructure",      to: "/services/$slug", params: { slug: "managed-services" } },
    ],
  },
  {
    title: "CX Pillars",
    links: [
      { label: "Personalization",        to: "/services" },
      { label: "Real-time Intelligence", to: "/services" },
      { label: "Adaptive Systems",       to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",    to: "/about" },
      { label: "Careers",  to: "/careers" },
      { label: "Insights", to: "/insights" },
      { label: "Contact",  to: "/contact" },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin,  href: "https://www.linkedin.com/company/jarvis-technolabs/" },
  { icon: Instagram, href: "https://www.instagram.com/jarvistechnolabs/" },
  { icon: Twitter,   href: "https://www.x.com/Jarvis_Techno" },
  { icon: Youtube,   href: "https://www.youtube.com/channel/UCEZSQCoL_1lja1UsQX_uoUw" },
  { icon: Facebook,  href: "https://www.facebook.com/498711123977909" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute inset-0" style={{ opacity: 0.04, backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 py-20" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          <div className="lg:col-span-5">
            <Link to="/"><img src={logo} alt="Jarvis Technolabs" className="h-20 w-auto object-contain mb-6" /></Link>
            <p className="text-2xl md:text-3xl font-semibold leading-tight max-w-md mb-4">
              Orchestrating Your <span className="text-orange-500">Autonomous</span> Future
            </p>
            <p className="text-sm leading-relaxed max-w-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              We are an AI-native digital engineering company helping enterprises and high-growth brands build intelligent products, automate operations, and deliver exceptional customer experiences.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@jarvistechnolabs.com" className="flex items-center gap-3 text-sm group" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}><Mail size={14} style={{ color: "rgb(249,115,22)" }} /></span>
                <span className="group-hover:text-orange-400 transition-colors">info@jarvistechnolabs.com</span>
              </a>
              <a href="tel:+917203030707" className="flex items-center gap-3 text-sm group" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg" style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}><Phone size={14} style={{ color: "rgb(249,115,22)" }} /></span>
                <span className="group-hover:text-orange-400 transition-colors">+91 720 303 0707</span>
              </a>
              <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg mt-0.5" style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}><MapPin size={14} style={{ color: "rgb(249,115,22)" }} /></span>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs tracking-widest text-orange-500 mb-5 uppercase">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {"params" in l ? (
                        <Link to="/services/$slug" params={l.params} className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">{l.label}</Link>
                      ) : (
                        <Link to={l.to} className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center pt-8 gap-6 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Jarvis Technolabs — Intelligent Systems Company</div>
          <div className="flex gap-5">
            {SOCIALS.map((s, i) => { const Icon = s.icon; return <a key={i} href={s.href} target="_blank" rel="noreferrer" className="hover:text-orange-400 transition"><Icon size={16} /></a>; })}
          </div>
        </div>
      </div>
    </footer>
  );
}