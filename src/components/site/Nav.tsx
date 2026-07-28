import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import logoFullDark from "@/assets/JT_ondark.png";
import logoIconDark from "@/assets/JT logo-bk.svg";
import logoFullLight from "@/assets/JT logo-original.svg";
import logoIconLight from "@/assets/JT logo-original - icon.svg";
import type { SiteTheme } from "@/hooks/use-theme-init";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/insights", label: "Insights" },
  { to: "/hire", label: "Hire" },
  { to: "/careers", label: "Careers" },
  { to: "/about", label: "About" },
  
] as const;

type NavProps = {
  theme: SiteTheme;
  onToggleTheme: () => void;
};

export function Nav({ theme, onToggleTheme }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLight = theme === "light";
  const fullLogo = isLight ? logoFullLight : logoFullDark;
  const iconLogo = isLight ? logoIconLight : logoIconDark;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex justify-center"
      style={{
        padding: scrolled ? "14px 16px 0" : "0",
        transition: "padding 0.35s ease",
      }}
    >
      <header
        className="w-full"
        style={{
          maxWidth: scrolled ? "1152px" : "100%",
          borderRadius: scrolled ? "999px" : "0px",
          background: scrolled ? "var(--nav-solid)" : "var(--nav-transparent)",
          border: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
          boxShadow: scrolled ? "var(--nav-shadow)" : "none",
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          transition: "max-width 0.35s ease, border-radius 0.35s ease, background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        <div
          className="mx-auto flex max-w-7xl items-center justify-between px-8"
          style={{
            paddingTop: scrolled ? "0.85rem" : "1.35rem",
            paddingBottom: scrolled ? "0.85rem" : "1.35rem",
            transition: "padding 0.3s ease",
          }}
        >
          <Link to="/" className="flex items-center" aria-label="Jarvis Technolabs home">
            <div
              className="relative"
              style={{
                height: scrolled ? "40px" : "48px",
                transition: "height 0.3s ease",
              }}
            >
              {/* Full logo (icon + wordmark) — visible unscrolled, fades out on scroll */}
              <img
                src={fullLogo}
                alt="Jarvis Technolabs"
                style={{
                  display: scrolled ? "none" : "block",
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                  opacity: scrolled ? 0 : 1,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Icon-only mark — visible once scrolled */}
              <img
                src={iconLogo}
                alt="Jarvis Technolabs"
                style={{
                  display: scrolled ? "block" : "none",
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                  opacity: scrolled ? 1 : 0,
                  filter: isLight ? "none" : "brightness(0) invert(1)",
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </Link>

          <nav
            className="hidden items-center gap-8 text-[12px] uppercase tracking-[0.2em] md:flex"
          >
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                className="nav-link py-1 transition-colors"
                style={{ color: "var(--nav-link)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${isLight ? "dark" : "light"} theme`}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors"
              style={{
                border: "1px solid var(--nav-border)",
                color: "var(--nav-link)",
                background: "var(--nav-button)",
              }}
            >
              {isLight ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            <Link
  to="/contact"
  className="hidden items-center gap-2 rounded-full px-5 py-3 text-[12px] uppercase tracking-[0.2em] font-semibold transition-all sm:inline-flex"
  style={{
    border: "none",
    color: "var(--color-primary-foreground)",
    background: "var(--color-primary)",
  }}
>
  Contact <span>↗</span>
</Link>

            <button
              type="button"
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span
                className="block h-[1.5px] w-6 transition-transform duration-300"
                style={{
                  background: "var(--nav-link)",
                  transform: mobileOpen ? "translateY(6.5px) rotate(45deg)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] w-6 transition-opacity duration-200"
                style={{
                  background: "var(--nav-link)",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-[1.5px] w-6 transition-transform duration-300"
                style={{
                  background: "var(--nav-link)",
                  transform: mobileOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        <div
          className="overflow-hidden md:hidden"
          style={{
            maxHeight: mobileOpen ? "520px" : "0px",
            opacity: mobileOpen ? 1 : 0,
            background: "var(--nav-solid)",
            borderTop: mobileOpen ? "1px solid var(--nav-border)" : "1px solid transparent",
            transition: "max-height 0.35s ease, opacity 0.25s ease",
          }}
        >
          <nav className="flex flex-col gap-5 px-8 py-6 text-[13px] uppercase tracking-[0.2em]">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                style={{ color: "var(--nav-link)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
}