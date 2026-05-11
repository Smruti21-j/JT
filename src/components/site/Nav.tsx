import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/JarvisTechnolabs_Logo_white.png";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/insights", label: "Insights" },
  { to: "/hire", label: "Hire" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 nav-chrome"
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.08)"
          : "1px solid transparent",
        background: scrolled
          ? "rgba(10,8,6,0.82)"
          : "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
        transition:
          "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center"
          aria-label="Jarvis Technolabs home"
        >
          <img
            src={logo}
            alt="Jarvis Technolabs"
            className="h-10 w-auto object-contain"
            width={420}
            height={92}
            style={{
              // Force the logo to always be fully visible on dark backgrounds.
              // drop-shadow adds a subtle dark halo so the light parts of the
              // logo pop even against a near-black hero.
              mixBlendMode: "screen" as const,
              filter: "brightness(1.3) contrast(1.1) saturate(1.2)",
            }}
          />
          <span className="sr-only">Jarvis Technolabs</span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.2em] uppercase">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground",
              }}
              className="nav-link transition-colors"
              style={{
                // on the transparent hero area make links slightly brighter
                textShadow: scrolled ? "none" : "0 1px 6px rgba(0,0,0,0.6)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <Link
          to="/contact"
          className="motion-link text-[11px] tracking-[0.2em] uppercase rounded-md px-5 py-3 transition-colors"
          style={{
            border: scrolled
              ? "1px solid rgba(255,255,255,0.15)"
              : "1px solid rgba(255,255,255,0.35)",
            color: scrolled
              ? "rgba(255,255,255,0.65)"
              : "rgba(255,255,255,0.9)",
            boxShadow: scrolled ? "none" : "0 1px 12px rgba(0,0,0,0.4)",
            transition: "border-color 0.3s, color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor =
              "rgb(255,130,50)";
            (e.currentTarget as HTMLElement).style.color = "rgb(255,130,50)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = scrolled
              ? "rgba(255,255,255,0.15)"
              : "rgba(255,255,255,0.35)";
            (e.currentTarget as HTMLElement).style.color = scrolled
              ? "rgba(255,255,255,0.65)"
              : "rgba(255,255,255,0.9)";
          }}
        >
          Let's talk
        </Link>
      </div>
    </header>
  );
}