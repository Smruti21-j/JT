import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Menu,
  Bell,
  Sparkles,
  ArrowLeft,
  Minus,
  Plus,
  ChevronDown,
  LayoutTemplate,
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
  "React", "TypeScript", "Node.js", "Python", "FastAPI",
  "PostgreSQL", "Redis", "OpenAI API", "Google Slides API",
  "PowerPoint API", "Docker", "AWS",
];

const CASE_META = [
  { label: "Sector", value: "Presentations & AI" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Sales, Marketing & Agency Teams" },
];

const INTEGRATIONS = [
  "Google Slides & PowerPoint export",
  "Brand kit sync from Figma",
  "Slack notifications on deck completion",
];

const CHALLENGES = [
  {
    title: "Brand drift across decks",
    desc: "Every team member built decks by duplicating old files, so fonts, colors, and logos slowly drifted away from the actual brand guidelines.",
  },
  {
    title: "Hours lost to formatting",
    desc: "Presenters spent more time nudging text boxes and aligning logos than actually writing the narrative the deck was supposed to carry.",
  },
  {
    title: "No single source of brand truth",
    desc: "When the brand refreshed, every existing deck stayed outdated — there was no way to re-apply the new brand kit at scale.",
  },
];

const FEATURES = [
  {
    title: "Outline-to-deck generation",
    desc: "Write a rough outline or paste existing notes, and Deck Forge assembles a structured, narrative-ready deck automatically.",
  },
  {
    title: "Brand applied at render time",
    desc: "Logos, colors, type, and layout rules live in a brand kit and are applied when the deck renders, not hardcoded into each slide.",
  },
  {
    title: "Instant re-render on rebrand",
    desc: "Update the brand kit once, and every deck built from it can be re-rendered to match instantly, no manual rework required.",
  },
  {
    title: "Template & layout library",
    desc: "A library of on-brand slide layouts for common sections — title, problem, solution, roadmap, pricing — that adapt to content length.",
  },
  {
    title: "Export to Slides & PowerPoint",
    desc: "One-click export to Google Slides or PowerPoint, fully editable, with brand styling intact on every slide.",
  },
  {
    title: "Version history & rollback",
    desc: "Every render is versioned, so teams can compare, roll back, or branch a deck without losing earlier work.",
  },
];

const OUTCOMES = [
  { value: "Render-time", label: "Brand applied at generation, not by hand" },
  { value: "Instant", label: "Re-render any deck after a rebrand" },
  { value: "On-brand", label: "Zero manual formatting drift" },
  { value: "Exportable", label: "Slides & PowerPoint, fully editable" },
];

export const Route = createFileRoute("/case-studies/ircs")({
  component: DeckForgeCaseStudy,
  head: () => ({
    meta: [
      { title: "AI Presentation Platform — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built an AI deck generator that applies brand kits at render time, so presentations stay on-brand automatically.",
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
        width: "200px",
        borderRadius: "32px",
        border: `7px solid ${aux.cardBorder}`,
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
          width: "80px",
          height: "18px",
          background: aux.cardBorder,
          borderRadius: "0 0 11px 11px",
          zIndex: 2,
        }}
      />
      <div style={{ paddingTop: "24px" }}>{children}</div>
    </div>
  );
}

// ─── Phone 1: welcome dashboard — brand kit, recent renders, generate CTA ──

function DashboardPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "8px 14px 18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
          <div className="flex items-center gap-1.5">
            <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: aux.accent }} />
            <span style={{ fontSize: "10px", fontWeight: 700, color: aux.title }}>Deck Forge</span>
          </div>
          <Bell size={13} color={aux.desc} />
        </div>

        <p style={{ fontSize: "12px", color: aux.title, margin: "0 0 12px" }}>
          Welcome <span style={{ fontWeight: 800, color: aux.accent }}>Priya</span>
        </p>

        <div className="grid grid-cols-2 gap-2" style={{ marginBottom: "12px" }}>
          {[
            { value: "58", label: "Decks Generated" },
            { value: "Nova Kit", label: "Active Brand Kit" },
            { value: "Today", label: "Last Rendered" },
            { value: "12 Slides", label: "Avg. Deck Size" },
          ].map((s) => (
            <div key={s.label} style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "10px", padding: "8px 9px" }}>
              <p style={{ fontSize: "10.5px", fontWeight: 800, color: aux.title, margin: 0 }}>{s.value}</p>
              <p className="font-mono" style={{ fontSize: "6px", letterSpacing: "0.04em", textTransform: "uppercase", color: aux.desc, margin: "3px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-center gap-2"
          style={{ background: aux.accent, color: "#fff", borderRadius: "999px", padding: "9px 0", marginBottom: "12px" }}
        >
          <Sparkles size={12} />
          <span className="font-mono" style={{ fontSize: "9px", fontWeight: 700 }}>Generate a Deck</span>
        </div>

        <div
          style={{
            borderRadius: "10px",
            overflow: "hidden",
            border: `1px solid ${aux.cardBorder}`,
            aspectRatio: "16 / 9",
            background: `linear-gradient(135deg, ${aux.accent}33, ${aux.accent}0D)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LayoutTemplate size={20} color={aux.accent} />
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 2: deck summary — itemized sections, brand code, generate ────────

const DECK_SECTIONS = [
  { label: "Cover", count: 1 },
  { label: "Problem", count: 2 },
  { label: "Solution", count: 3 },
  { label: "Pricing", count: 1 },
];

function DeckSummaryPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  const totalSlides = DECK_SECTIONS.reduce((a, s) => a + s.count, 0);
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "24px" }}>
      <div style={{ paddingTop: 0 }}>
        <div
          className="flex items-center gap-2"
          style={{ background: aux.accent, color: "#fff", padding: "16px 14px 10px" }}
        >
          <ArrowLeft size={13} />
          <span style={{ fontSize: "11px", fontWeight: 700 }}>Deck Summary</span>
        </div>

        <div style={{ padding: "10px 14px 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginBottom: "10px" }}>
            {DECK_SECTIONS.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between"
                style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "8px", padding: "6px 8px" }}
              >
                <span style={{ fontSize: "8.5px", color: aux.title }}>{s.label}</span>
                <div className="flex items-center gap-1.5">
                  <Minus size={9} color={aux.desc} />
                  <span style={{ fontSize: "9px", fontWeight: 700, color: aux.title, minWidth: "10px", textAlign: "center" }}>{s.count}</span>
                  <Plus size={9} color={aux.accent} />
                </div>
              </div>
            ))}
          </div>

          <p className="font-mono" style={{ fontSize: "6.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: aux.desc, marginBottom: "4px" }}>
            Brand Kit Code
          </p>
          <div className="flex items-center gap-1.5" style={{ marginBottom: "10px" }}>
            <div style={{ flex: 1, background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "7px", padding: "6px 8px" }}>
              <span className="font-mono" style={{ fontSize: "7.5px", color: aux.desc }}>NOVA-KIT</span>
            </div>
            <span className="font-mono" style={{ fontSize: "7px", fontWeight: 700, color: "#fff", background: aux.accent, borderRadius: "7px", padding: "6px 9px" }}>
              Apply
            </span>
          </div>

          <p className="font-mono" style={{ fontSize: "6.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: aux.desc, marginBottom: "4px" }}>
            Select Template
          </p>
          <div
            className="flex items-center justify-between"
            style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "7px", padding: "7px 9px", marginBottom: "10px" }}
          >
            <span style={{ fontSize: "8px", color: aux.title }}>Investor Pitch</span>
            <ChevronDown size={11} color={aux.desc} />
          </div>

          <div style={{ borderTop: `1px solid ${aux.cardBorder}`, paddingTop: "8px", marginBottom: "10px" }}>
            <div className="flex items-center justify-between" style={{ marginBottom: "3px" }}>
              <span className="font-mono" style={{ fontSize: "7px", color: aux.desc }}>Total Slides</span>
              <span style={{ fontSize: "8px", fontWeight: 700, color: aux.title }}>{totalSlides}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono" style={{ fontSize: "7px", color: aux.desc }}>Est. Render Time</span>
              <span style={{ fontSize: "8px", fontWeight: 700, color: aux.title }}>18s</span>
            </div>
          </div>

          <div
            className="flex items-center justify-center"
            style={{ background: aux.accent, color: "#fff", borderRadius: "8px", padding: "9px 0" }}
          >
            <span className="font-mono" style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em" }}>GENERATE DECK</span>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function DeckForgeCaseStudy() {
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
                Decks, forged
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  at render time
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                Deck Forge turns a rough outline into a fully on-brand presentation — colors,
                fonts, and logo applied automatically at render time, not stitched together
                by hand.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - dashboard + deck build summary */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                <DashboardPhoneMockup aux={aux} />
                <DeckSummaryPhoneMockup aux={aux} />
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

      {/* ─── Overview + Integrations ─── */}
      <section className="relative border-t border-border" style={{ paddingTop: "5rem", paddingBottom: "5rem" }}>
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <SectionLabel color={pal.headerLabelColor}>[Overview]</SectionLabel>
              <h2 style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0 }}>
                Brand, applied
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>not maintained</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief came from teams producing so many decks — sales pitches, proposals,
                board updates — that keeping every single one on-brand had quietly become a
                full-time job of its own.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "32px" }}>
                We built Deck Forge as a generation engine that separates content from brand: you
                write the outline, and a brand kit — logo, colors, type, layout rules — is applied
                automatically at render time. Every deck can be re-rendered instantly against an
                updated brand kit, so a rebrand doesn't mean redoing hundreds of old decks by hand.
              </p>

              <div
                style={{
                  background: aux.cardBg,
                  border: `1px solid ${aux.cardBorder}`,
                  borderRadius: "16px",
                  padding: "24px 26px",
                }}
              >
                <p className="font-mono" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: aux.accent, fontWeight: 700, marginBottom: "14px" }}>
                  Integrations
                </p>
                <div className="flex flex-col gap-3">
                  {INTEGRATIONS.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span style={{ flexShrink: 0, width: "6px", height: "6px", borderRadius: "50%", background: aux.accent }} />
                      <span style={{ fontSize: "13.5px", color: aux.title }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>content, not formatting</em>
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