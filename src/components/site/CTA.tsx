import { Link } from "@tanstack/react-router";
import logo from "@/assets/JarvisTechnolabs_Logo_white.png";
import { Linkedin, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";

// ── Brand logo imports ────────────────────────────────────────────────────────
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

/* ─── Brands list ────────────────────────────────────────────────────────────── */
const BRANDS = [
  { name: "Esnaad", logo: esnaad },
  { name: "Dubai Culture", logo: dubaiCulture },
  { name: "Lifelong Learning", logo: lifelong },
  { name: "Abu Dhabi School of Government", logo: abuDhabiSchool },
  { name: "Abu Dhabi Pension Fund", logo: pensionFund },
  { name: "ChequeScore", logo: chequeScore },
  { name: "Numoo", logo: numoo },
  { name: "CreditReport", logo: creditReport },
  { name: "24", logo: twentyFour },
  { name: "Ahmedabad Red Cross", logo: bloodCenter },
  { name: "Jarvis Mart", logo: jarvisMart },
  { name: "BNI Athena Parousia", logo: bni },
  { name: "KaGo", logo: kago },
  { name: "DR Brothers", logo: drBrothers },
  { name: "Lifelong Learning Alt", logo: lifelongAlt },
  { name: "GuardBay", logo: guardbay },
  { name: "Sail", logo: sail },
  { name: "RoleplayLabs.ai", logo: roleplayLabs },
  { name: "Home", logo: homeMark },
];

// ─── Single marquee row — NO overlap, proper sizing ──────────────────────────
// FIX 3: Replaced two-row overlapping layout with a single clean marquee row.
// Each logo card has a fixed width/height, flex-shrink-0, and the track is
// a single continuous flex row duplicated for the infinite illusion.
function LogoRail({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          width: "max-content",
          gap: "16px",
          animation: `${reverse ? "marqueeReverse" : "marquee"} 38s linear infinite`,
        }}
      >
        {doubled.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            style={{
              flexShrink: 0,
              width: "160px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "#ffffff",
              padding: "12px 16px",
              transition: "border-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.5)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              style={{ maxHeight: "44px", maxWidth: "120px", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Brands section ─────────────────────────────────────────────────────────── */
function BrandsCarousel() {
  return (
    <section
      className="relative border-t border-white/10"
      style={{ padding: "80px 0", overflow: "hidden" }}
    >
      {/* Subtle grid bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.025, backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "120px", background: "linear-gradient(to right, #000 0%, transparent 100%)" }} />
      <div className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none" style={{ width: "120px", background: "linear-gradient(to left, #000 0%, transparent 100%)" }} />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-6 mb-12 z-20">
        <p style={{ fontSize: "11px", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "12px" }}>
          Trusted by Leaders
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "16px" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>
            Brands we've{" "}
            <span style={{ color: "rgb(249,115,22)" }}>worked with</span>
          </h2>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", maxWidth: "360px", lineHeight: 1.65 }}>
            From government enterprises to fast-moving startups — global leaders who turned bold ambition into scalable digital reality.
          </p>
        </div>
      </div>

      {/* Single marquee row */}
      <div className="relative z-20" style={{ paddingLeft: "24px", paddingRight: "24px" }}>
        <LogoRail />
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes marquee        { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes marqueeReverse { from { transform: translateX(-50%) } to { transform: translateX(0) } }
      `}</style>
    </section>
  );
}

/* ─── CTA export ─────────────────────────────────────────────────────────────── */
type CTAProps = { showBrands?: boolean };

export function CTA({ showBrands = false }: CTAProps = {}) {
  return <>{showBrands && <BrandsCarousel />}</>;
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */
const FOOTER_COLS = [
  {
    title: "AI Systems",
    links: [
      { label: "Autonomous Workflows", to: "/services/$slug", params: { slug: "digital-transformation" } },
      { label: "Decision Intelligence", to: "/services/$slug", params: { slug: "data-ai" } },
      { label: "AI Infrastructure", to: "/services/$slug", params: { slug: "managed-services" } },
    ],
  },
  {
    title: "CX Pillars",
    links: [
      { label: "Personalization", to: "/services" },
      { label: "Real-time Intelligence", to: "/services" },
      { label: "Adaptive Systems", to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Insights", to: "/insights" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

const SOCIALS = [
  { icon: Linkedin, href: "https://www.linkedin.com/company/jarvis-technolabs/" },
  { icon: Instagram, href: "https://www.instagram.com/jarvistechnolabs/" },
  { icon: Twitter, href: "https://www.x.com/Jarvis_Techno" },
  { icon: Youtube, href: "https://www.youtube.com/channel/UCEZSQCoL_1lja1UsQX_uoUw" },
  { icon: Facebook, href: "https://www.facebook.com/498711123977909" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black text-white overflow-hidden">

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right,white 1px,transparent 1px),linear-gradient(to bottom,white 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-flow-x top-[25%]" />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-flow-x-reverse top-[55%]" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-pulse"
            style={{ top: `${20 + i * 10}%`, left: `${10 + i * 12}%` }} />
        ))}
        <div className="absolute right-20 bottom-20 w-[300px] h-[300px] border border-orange-500/10 rounded-full animate-ping-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <Link to="/">
              <img src={logo} alt="Jarvis Technolabs" className="h-12 mb-6" />
            </Link>

            {/* FIX 4a: Added tagline description */}
            <p className="text-2xl md:text-3xl font-semibold leading-tight max-w-md mb-4">
              Orchestrating Your Autonomous
              <span className="text-orange-500"> Future</span>
            </p>

            {/* FIX 4b: Added description paragraph */}
            <p className="text-sm leading-relaxed max-w-sm mb-8" style={{ color: "rgba(255,255,255,0.45)" }}>
              We are an AI-native digital engineering company helping enterprises and high-growth brands build intelligent products, automate operations, and deliver exceptional customer experiences.
            </p>

            {/* FIX 4c: Contact details with icons */}
            <div className="space-y-3">
              {/* Email with icon */}
              <a
                href="mailto:info@jarvistechnolabs.com"
                className="flex items-center gap-3 text-sm group transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <span
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}
                >
                  <Mail size={14} style={{ color: "rgb(249,115,22)" }} />
                </span>
                <span className="group-hover:text-orange-400 transition-colors">
                  info@jarvistechnolabs.com
                </span>
              </a>

              {/* Phone with icon */}
              <a
                href="tel:+917203030707"
                className="flex items-center gap-3 text-sm group transition-colors"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <span
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}
                >
                  <Phone size={14} style={{ color: "rgb(249,115,22)" }} />
                </span>
                <span className="group-hover:text-orange-400 transition-colors">
                  +91 720 303 0707
                </span>
              </a>

              {/* Location with icon */}
              <div className="flex items-start gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                <span
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg mt-0.5"
                  style={{ background: "rgba(255,90,20,0.1)", border: "1px solid rgba(255,100,30,0.2)" }}
                >
                  <MapPin size={14} style={{ color: "rgb(249,115,22)" }} />
                </span>
                <span>Ahmedabad, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMNS ───────────────────────────────────────────── */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs tracking-widest text-orange-500 mb-5 uppercase">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to as any}
                        params={l.params as any}
                        className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap justify-between items-center pt-8 gap-6 text-xs text-white/50">
          <div>© {new Date().getFullYear()} Jarvis Technolabs — Intelligent Systems Company</div>
          <div className="flex gap-5">
            {SOCIALS.map((s, i) => {
              const Icon = s.icon;
              return (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}