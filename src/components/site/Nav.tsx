import { Link } from "@tanstack/react-router";
import logo from "@/assets/JarvisTechnolabs_Logo.webp";

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
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-background/55 backdrop-blur-xl nav-chrome">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center" aria-label="Jarvis Technolabs home">
          <img
            src={logo}
            alt="Jarvis Technolabs"
            className="h-10 w-auto object-contain"
            width={420}
            height={92}
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
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA BUTTON */}
        <Link
          to="/contact"
          className="motion-link text-[11px] tracking-[0.2em] uppercase border border-white/15 rounded-md px-5 py-3 hover:border-primary hover:text-primary transition-colors"
        >
          Let's talk
        </Link>
      </div>
    </header>
  );
}
