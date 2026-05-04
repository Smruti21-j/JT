import { Link } from "@tanstack/react-router";
import logo from "@/assets/JarvisTechnolabs_Logo.webp";
import {
  Linkedin,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
} from "lucide-react";
import type { ReactNode } from "react";

// ── Real brand logos from the PPT ──────────────────────────────────────────
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

/* ================= BRANDS CAROUSEL ================= */

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

function LogoRail({ reverse = false }: { reverse?: boolean }) {
  const logos = [...BRANDS, ...BRANDS];

  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-4 ${
          reverse ? "animate-brand-marquee-reverse" : "animate-brand-marquee"
        }`}
      >
        {logos.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex h-24 w-48 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white p-4 hover:border-orange-500/40 transition-colors duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="max-h-14 max-w-36 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function BrandsCarousel() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-24">
      {/* TECH BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent top-[50%]" />
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-14">
        <p className="text-xs tracking-[0.3em] text-white/40 mb-4 uppercase">
          Success Stories
        </p>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
            Brands we've{" "}
            <span className="text-orange-500">worked with</span>
          </h2>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed lg:text-right">
            Global leaders who turned bold ambition into scalable reality with
            our intelligence layer.
          </p>
        </div>
      </div>

      {/* Two-row carousel */}
      <div className="relative space-y-4">
        <LogoRail />
        <LogoRail reverse />
      </div>
    </section>
  );
}

/* ================= CTA ================= */
// The "Quantum Scale" hero-style CTA section has been removed.
// CTA now only conditionally renders the BrandsCarousel when showBrands={true}.
// Pages that called <CTA /> will no longer show that section.

type CTAProps = {
  showBrands?: boolean;
};

export function CTA({ showBrands = false }: CTAProps = {}) {
  return (
    <>
      {showBrands && <BrandsCarousel />}
    </>
  );
}

/* ================= FOOTER ================= */

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

      {/* TECH BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent animate-flow-x top-[25%]" />
        <div className="absolute w-[120%] h-[2px] bg-gradient-to-r from-transparent via-orange-400/20 to-transparent animate-flow-x-reverse top-[55%]" />

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-orange-400/40 rounded-full animate-pulse"
            style={{
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
            }}
          />
        ))}

        <div className="absolute right-20 bottom-20 w-[300px] h-[300px] border border-orange-500/10 rounded-full animate-ping-slow" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* GRID */}
        <div className="grid lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">

          {/* LEFT */}
          <div className="lg:col-span-5">
            <Link to="/">
              <img src={logo} className="h-12 mb-6" />
            </Link>

            <p className="text-2xl md:text-3xl font-semibold leading-tight max-w-md">
              Orchestrating Your Autonomous
              <span className="text-orange-500"> Future</span>
            </p>

            <div className="mt-8 space-y-2 text-sm">
              <a href="mailto:sales@jarvistechnolabs.com" className="block text-white/70 hover:text-orange-400">
                info@jarvistechnolabs.com
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-10">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <p className="text-xs tracking-widest text-orange-500 mb-5 uppercase">
                  {col.title}
                </p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to as any}
                        params={l.params as any}
                        className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition"
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

        {/* BOTTOM */}
        <div className="flex flex-wrap justify-between items-center pt-8 gap-6 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Jarvis Technolabs — Intelligent Systems Company
          </div>

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