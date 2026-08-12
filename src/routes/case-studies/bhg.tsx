import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Menu,
  Sparkles,
  Lock,
  Timer,
  Copy,
  Eye,
  Clock,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

function pillarPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      sectionBorder: "border-border",
      headerLabelColor: "rgba(25,25,25,0.42)",
      headerHeadingColor: "#181818",
      headerParaColor: "rgba(25,25,25,0.5)",
    };
  }
  return {
    sectionBorder: "border-border",
    headerLabelColor: "rgba(240,232,223,0.32)",
    headerHeadingColor: "#f0e8df",
    headerParaColor: "rgba(240,232,223,0.36)",
  };
}

function auxPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      cardBg: "#ffffff",
      cardBorder: "rgba(0,0,0,0.08)",
      title: "#181818",
      desc: "rgba(25,25,25,0.55)",
      accent: "#ed6323",
    };
  }
  return {
    cardBg: "#0a1c18",
    cardBorder: "rgba(255,255,255,0.08)",
    title: "#f0e8df",
    desc: "rgba(240,232,223,0.45)",
    accent: "rgb(255,130,50)",
  };
}

const TECH_STACK = [
  "React", "TypeScript", "Node.js", "PostgreSQL", "Redis",
  "AWS S3", "CloudFront", "Docker", "AWS", "Resend",
  "WebSockets", "REST APIs",
];

const CASE_META = [
  { label: "Sector", value: "AgencyOps & Portfolio Sharing" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Agencies, Freelancers & Prospects" },
];

const CHALLENGES = [
  {
    title: "Scattered portfolio presentation",
    desc: "Agencies were sending prospects a mix of Google Drive folders, PDFs, and screenshots with no consistent branding, structure, or narrative.",
  },
  {
    title: "No visibility into engagement",
    desc: "Once a case study or proposal was sent, there was no way to know if it was opened, how long someone spent on it, or which pieces actually landed.",
  },
  {
    title: "Insecure, unmanaged sharing",
    desc: "Links stayed open indefinitely with no expiration, no access control, and no way to revoke access once a deal went cold.",
  },
];

const FEATURES = [
  {
    title: "Branded secure links",
    desc: "Every shared portfolio is wrapped in the sender's own branding and served through a private, revocable link instead of a generic file share.",
  },
  {
    title: "Curated case study builder",
    desc: "A drag-and-drop composer for assembling work samples, case studies, and proposals into a single polished, presentable narrative.",
  },
  {
    title: "Real-time engagement analytics",
    desc: "See exactly when a link was opened, which sections held attention longest, and how many times a prospect came back to it.",
  },
  {
    title: "Access controls & expiry",
    desc: "Set password protection, expiration dates, or view limits per prospect without ever touching the underlying content.",
  },
  {
    title: "Multi-workspace organization",
    desc: "Organize case studies by client, industry, or campaign, and reuse individual pieces across future proposals in seconds.",
  },
  {
    title: "Prospect activity feed",
    desc: "A live feed of opens, scrolls, and revisits, so account teams know exactly when — and who — to follow up with.",
  },
];

const OUTCOMES = [
  { value: "Branded", label: "Every link carries client-specific branding" },
  { value: "Real-time", label: "Prospect engagement tracking" },
  { value: "Revocable", label: "Full access control per link" },
  { value: "Reusable", label: "Modular case study components" },
];

export const Route = createFileRoute("/case-studies/bhg")({
  component: EchoShowcaseCaseStudy,
  head: () => ({
    meta: [
      { title: "Portfolio Sharing Platform — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built a branded, secure portfolio-sharing platform with real-time prospect engagement analytics.",
      },
    ],
  }),
});

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <p
      className="font-mono"
      style={{
        fontSize: "10px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color,
        marginBottom: "22px",
      }}
    >
      {children}
    </p>
  );
}

function PhoneFrame({
  aux,
  style,
  children,
}: {
  aux: ReturnType<typeof auxPalette>;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "180px",
        borderRadius: "30px",
        border: `6px solid ${aux.cardBorder}`,
        background: aux.cardBg,
        overflow: "hidden",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.4)",
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "72px",
          height: "16px",
          background: aux.cardBorder,
          borderRadius: "0 0 10px 10px",
          zIndex: 2,
        }}
      />
      <div style={{ paddingTop: "22px" }}>{children}</div>
    </div>
  );
}

function PhoneHeader({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
      <Menu size={13} color={aux.desc} />
      <span style={{ fontSize: "10px", fontWeight: 700, color: aux.title }}>EchoShowcase</span>
      <Sparkles size={13} color={aux.accent} />
    </div>
  );
}

// ─── Phone 1: curate — branded showcase list ────────────────────────────────

const SHOWCASE_ITEMS = [
  { title: "Brand Refresh — Q3", tag: "Case Study" },
  { title: "Growth Campaign Deck", tag: "Proposal" },
  { title: "Product Launch Kit", tag: "Portfolio" },
];

function CuratePhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "8px 12px 14px" }}>
        <PhoneHeader aux={aux} />
        <div
          style={{
            background: `${aux.accent}14`,
            border: `1px solid ${aux.accent}33`,
            borderRadius: "10px",
            padding: "8px 10px",
            marginBottom: "10px",
          }}
        >
          <p className="font-mono" style={{ fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: aux.accent, margin: 0 }}>
            Prepared for
          </p>
          <p style={{ fontSize: "9.5px", fontWeight: 700, color: aux.title, margin: "2px 0 0" }}>Meridian Co.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {SHOWCASE_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className="flex items-center justify-between"
              style={{
                background: aux.cardBg,
                border: `1px solid ${aux.cardBorder}`,
                borderRadius: "9px",
                padding: "7px 9px",
              }}
            >
              <div className="flex items-center gap-2" style={{ minWidth: 0 }}>
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "6px",
                    background: `${aux.accent}${i === 0 ? "" : ""}`,
                    opacity: 1 - i * 0.22,
                    flexShrink: 0,
                    backgroundColor: aux.accent,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "8.5px", fontWeight: 700, color: aux.title, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {item.title}
                  </p>
                  <p className="font-mono" style={{ fontSize: "7px", color: aux.desc, margin: 0 }}>{item.tag}</p>
                </div>
              </div>
              <ChevronRight size={11} color={aux.desc} />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 2: share — secure link + access controls ─────────────────────────

function SharePhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "26px" }}>
      <div style={{ padding: "8px 12px 14px" }}>
        <PhoneHeader aux={aux} />

        <p className="font-mono" style={{ fontSize: "7px", letterSpacing: "0.08em", textTransform: "uppercase", color: aux.desc, marginBottom: "5px" }}>
          Secure Link
        </p>
        <div
          className="font-mono"
          style={{
            fontSize: "7.5px",
            color: aux.title,
            background: aux.cardBg,
            border: `1px solid ${aux.cardBorder}`,
            borderRadius: "8px",
            padding: "7px 9px",
            marginBottom: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          echoshowcase.io/meridian-co
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "10px" }}>
          {[
            { icon: Lock, label: "Password protected", on: true },
            { icon: Timer, label: "Expires in 7 days", on: true },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between"
              style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "8px", padding: "6px 9px" }}
            >
              <div className="flex items-center gap-2">
                <row.icon size={11} color={aux.accent} />
                <span style={{ fontSize: "8px", color: aux.title }}>{row.label}</span>
              </div>
              <span
                style={{
                  width: "20px",
                  height: "11px",
                  borderRadius: "999px",
                  background: aux.accent,
                  position: "relative",
                  display: "inline-block",
                }}
              >
                <span style={{ position: "absolute", top: "1.5px", right: "1.5px", width: "8px", height: "8px", borderRadius: "50%", background: "#fff" }} />
              </span>
            </div>
          ))}
        </div>

        <div
          className="font-mono flex items-center justify-center gap-2"
          style={{
            fontSize: "8px",
            color: "#fff",
            background: aux.accent,
            borderRadius: "999px",
            padding: "7px 0",
          }}
        >
          <Copy size={10} /> Copy Secure Link
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 3: measure — engagement analytics ────────────────────────────────

const ACTIVITY_FEED = [
  { icon: Eye, label: "Link opened", time: "2m ago" },
  { icon: Clock, label: "Viewed case study", time: "5m ago" },
  { icon: RotateCcw, label: "Returned visit", time: "1h ago" },
];

function MeasurePhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  const bars = [4, 6, 5, 8, 7, 9, 6];
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "48px" }}>
      <div style={{ padding: "8px 12px 14px" }}>
        <PhoneHeader aux={aux} />

        <div className="grid grid-cols-3 gap-1.5" style={{ marginBottom: "10px" }}>
          {[
            { label: "Opens", value: "24" },
            { label: "Avg. Time", value: "3m 12s" },
            { label: "Revisits", value: "6" },
          ].map((s) => (
            <div key={s.label} style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "8px", padding: "6px 5px" }}>
              <p style={{ fontSize: "10px", fontWeight: 800, color: aux.title, margin: 0 }}>{s.value}</p>
              <p className="font-mono" style={{ fontSize: "6px", letterSpacing: "0.05em", textTransform: "uppercase", color: aux.desc, margin: "2px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "4px",
            height: "36px",
            marginBottom: "10px",
            padding: "0 2px",
          }}
        >
          {bars.map((v, i) => (
            <span
              key={i}
              style={{
                flex: 1,
                height: `${(v / 9) * 100}%`,
                background: aux.accent,
                opacity: 0.4 + (v / 9) * 0.6,
                borderRadius: "3px 3px 0 0",
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {ACTIVITY_FEED.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: `${aux.accent}1A`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <a.icon size={9} color={aux.accent} />
              </span>
              <span style={{ fontSize: "7.5px", color: aux.title, flex: 1 }}>{a.label}</span>
              <span className="font-mono" style={{ fontSize: "6.5px", color: aux.desc }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function EchoShowcaseCaseStudy() {
  const { theme, toggleTheme } = useThemeInit();
  const pal = pillarPalette(theme);
  const aux = auxPalette(theme);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* ─── Hero ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "9rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link
            to="/services"
            className="font-mono inline-flex items-center gap-2"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: pal.headerLabelColor,
              marginBottom: "28px",
            }}
          >
            ← Back to Services
          </Link>

          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionLabel color={aux.accent}>[Case Study]</SectionLabel>

              <h1
                style={{
                  fontSize: "clamp(41.6px, 70.656px, 75.2px)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "-0.01em",
                  color: pal.headerHeadingColor,
                  margin: 0,
                  marginBottom: "16px",
                  maxWidth: "900px",
                }}
              >
                Work that shows
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  who opened it
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                A portfolio-sharing platform that lets agencies curate their work, share it as
                branded, secure links, and see exactly how prospects engage with it afterward.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - curate / share / measure flow */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start gap-4" style={{ padding: "20px 0" }}>
                <CuratePhoneMockup aux={aux} />
                <SharePhoneMockup aux={aux} />
                <MeasurePhoneMockup aux={aux} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Meta strip ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CASE_META.map((m) => (
              <div key={m.label}>
                <p className="font-mono" style={{ fontSize: "9.5px", letterSpacing: "0.14em", textTransform: "uppercase", color: pal.headerLabelColor, marginBottom: "8px" }}>
                  {m.label}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 600, color: pal.headerHeadingColor, margin: 0 }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Overview ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel color={pal.headerLabelColor}>[Overview]</SectionLabel>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0 }}>
                A showcase
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>that reports back</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief was to give agencies and freelancers a single, branded home for their
                best work — something more credible than a shared drive folder, and more useful
                than a static PDF that disappears into an inbox.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                We built EchoShowcase as a curation layer on top of an agency's existing work:
                case studies, proposals, and portfolio pieces get assembled into a single branded
                view and shared as a private, revocable link — never a public, indexable page.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor }}>
                Every link reports back. Account teams see when it was opened, what got the most
                attention, and when a prospect returns to it — turning a one-way send into a
                two-way signal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Challenges ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionLabel color={pal.headerLabelColor}>[The Challenge]</SectionLabel>
          <h2
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px", maxWidth: "700px" }}
          >
            Three problems{" "}
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
              nobody was solving together
            </em>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {CHALLENGES.map((c, i) => (
              <div
                key={c.title}
                style={{
                  background: aux.cardBg,
                  border: `1px solid ${aux.cardBorder}`,
                  borderRadius: "18px",
                  padding: "28px 26px",
                }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: "11px", letterSpacing: "0.2em", color: aux.accent, display: "block", marginBottom: "16px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: aux.title, margin: 0, marginBottom: "10px" }}>
                  {c.title}
                </h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: aux.desc, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Approach / what we built ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionLabel color={pal.headerLabelColor}>[What We Built]</SectionLabel>
          <h2
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px", maxWidth: "760px" }}
          >
            Every layer designed around{" "}
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>trust and visibility</em>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  background: aux.cardBg,
                  border: `1px solid ${aux.cardBorder}`,
                  borderRadius: "18px",
                  padding: "26px 24px",
                }}
              >
                <h3 style={{ fontSize: "16.5px", fontWeight: 700, color: aux.title, margin: 0, marginBottom: "10px" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "13px", lineHeight: 1.65, color: aux.desc, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Outcomes ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionLabel color={pal.headerLabelColor}>[Outcome]</SectionLabel>
          <h2
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px" }}
          >
            What shipped
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OUTCOMES.map((o) => (
              <div
                key={o.label}
                style={{
                  background: aux.cardBg,
                  border: `1px solid ${aux.cardBorder}`,
                  borderRadius: "16px",
                  padding: "24px 20px",
                }}
              >
                <p className="font-display" style={{ fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 800, color: aux.accent, margin: 0, lineHeight: 1 }}>
                  {o.value}
                </p>
                <p style={{ fontSize: "12px", color: aux.desc, marginTop: "10px" }}>{o.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Tech stack ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <SectionLabel color={pal.headerLabelColor}>[Tech Stack]</SectionLabel>
          <h2
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "28px" }}
          >
            Built on a{" "}
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
              modern, production-grade
            </em>{" "}
            stack
          </h2>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="font-mono"
                style={{
                  fontSize: "12.5px",
                  letterSpacing: "0.04em",
                  color: aux.title,
                  background: aux.cardBg,
                  border: `1px solid ${aux.cardBorder}`,
                  borderRadius: "999px",
                  padding: "9px 18px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "6rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 text-center">
          <h2 className="font-display" style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0 }}>
            Ready to build{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>your own?</em>
          </h2>
          <div style={{ marginTop: "28px" }}>
            <Link
              to="/contact"
              className="font-mono inline-flex items-center gap-2"
              style={{
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#fff",
                background: aux.accent,
                borderRadius: "999px",
                padding: "14px 30px",
              }}
            >
              Start a Conversation →
            </Link>
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
}