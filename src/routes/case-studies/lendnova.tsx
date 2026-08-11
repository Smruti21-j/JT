import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Menu,
  Sparkles,
  CheckCircle2,
  Circle,
  Building2,
  ChevronRight,
  Percent,
  Info,
  X,
  Clock,
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
  "PostgreSQL", "Redis", "AI Underwriting Engine", "Flutter",
  "Docker", "AWS", "REST APIs",
];

const CASE_META = [
  { label: "Sector", value: "Digital Lending & Fintech" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Borrowers, Lenders & Partners" },
];

const CHALLENGES = [
  {
    title: "Fragmented lender access",
    desc: "Borrowers had to approach banks, NBFCs, and MSME lenders one at a time, filling out the same paperwork repeatedly with no way to compare offers side by side.",
  },
  {
    title: "Slow, opaque underwriting",
    desc: "Loan decisions took weeks, and applicants were left guessing where their application stood or why it had stalled, with no visibility into the process.",
  },
  {
    title: "No unified partner layer",
    desc: "DSAs, CAs, and referral partners had no shared system to submit leads, track commissions, or follow application status across different lenders.",
  },
];

const FEATURES = [
  {
    title: "Multi-lender marketplace",
    desc: "One digital application routed intelligently across a network of banks, NBFCs, and MSME lenders, so borrowers compare real offers instead of chasing them.",
  },
  {
    title: "AI-driven loan structuring",
    desc: "Applications are pre-scored and structured against each lender's criteria automatically, surfacing the best-fit offers before a human underwriter steps in.",
  },
  {
    title: "Real-time application tracking",
    desc: "Borrowers and partners see exactly where an application stands, from submission through sanction to disbursal, with no manual follow-up required.",
  },
  {
    title: "Partner & DSA portal",
    desc: "A dedicated workspace for DSAs and CAs to submit leads, track commissions, and monitor every application they've referred in one place.",
  },
  {
    title: "Pre-vetted borrower profiles",
    desc: "Structured intake and upfront document verification cut down back-and-forth and give lenders a cleaner first look at every applicant.",
  },
  {
    title: "Unified lender dashboard",
    desc: "Banks and NBFCs get a single queue of pre-qualified, structured applications instead of inconsistent paperwork arriving through separate channels.",
  },
];

const OUTCOMES = [
  { value: "One App", label: "Digital application, multiple lenders" },
  { value: "AI-Structured", label: "Automated loan structuring & scoring" },
  { value: "Real-time", label: "Application status tracking" },
  { value: "End-to-end", label: "Borrower-to-disbursal architecture" },
];

export const Route = createFileRoute("/case-studies/lendnova")({
  component: LendNovaCaseStudy,
  head: () => ({
    meta: [
      { title: "Digital Lending Marketplace — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built a multi-lender digital lending marketplace that structures, matches, and tracks loan applications in real time.",
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
        width: "220px",
        borderRadius: "34px",
        border: `7px solid ${aux.cardBorder}`,
        background: aux.cardBg,
        overflow: "hidden",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.4)",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90px",
          height: "20px",
          background: aux.cardBorder,
          borderRadius: "0 0 12px 12px",
          zIndex: 2,
        }}
      />
      <div style={{ paddingTop: "26px" }}>{children}</div>
    </div>
  );
}

// ─── Phone 1: chat-style loan match request ─────────────────────────────────

const LENDER_OFFERS = [
  { name: "Horizon Bank", rate: "8.4%", tag: "Best rate" },
  { name: "Anchorpoint NBFC", rate: "8.9%", tag: "Fastest" },
  { name: "Meridian Finance", rate: "9.1%", tag: "Flexible" },
];

function LoanMatchPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "10px 14px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "14px" }}>
          <Menu size={15} color={aux.desc} />
          <span style={{ fontSize: "11.5px", fontWeight: 700, color: aux.title }}>LendNova</span>
          <Sparkles size={15} color={aux.accent} />
        </div>

        <div
          className="font-mono"
          style={{
            marginLeft: "auto",
            width: "fit-content",
            maxWidth: "85%",
            fontSize: "10px",
            color: "#fff",
            background: aux.accent,
            borderRadius: "12px 12px 2px 12px",
            padding: "8px 11px",
            marginBottom: "12px",
          }}
        >
          find me the best home loan offer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {LENDER_OFFERS.map((o) => (
            <div
              key={o.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: aux.cardBg,
                border: `1px solid ${aux.cardBorder}`,
                borderRadius: "10px",
                padding: "8px 10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "7px",
                    background: `${aux.accent}1A`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Building2 size={12} color={aux.accent} />
                </span>
                <div>
                  <p style={{ fontSize: "9.5px", fontWeight: 700, color: aux.title, margin: 0 }}>{o.name}</p>
                  <p className="font-mono" style={{ fontSize: "7.5px", color: aux.desc, margin: 0 }}>{o.tag}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Percent size={9} color={aux.accent} />
                <span className="font-mono" style={{ fontSize: "9.5px", fontWeight: 700, color: aux.accent }}>{o.rate}</span>
                <ChevronRight size={12} color={aux.desc} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 2: application status tracker ────────────────────────────────────

const STATUS_STEPS = [
  { label: "Application submitted", done: true },
  { label: "Documents verified", done: true },
  { label: "Matched with lenders", done: true },
  { label: "Sanctioned", done: false, active: true },
  { label: "Disbursed", done: false },
];

function StatusTrackerPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "44px", marginLeft: "-28px" }}>
      <div style={{ padding: "10px 14px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
          <X size={13} color={aux.desc} />
          <span style={{ fontSize: "10.5px", fontWeight: 700, color: aux.title, textAlign: "center", flex: 1 }}>
            Application Status
          </span>
          <Info size={13} color={aux.desc} />
        </div>

        <p style={{ fontSize: "8.5px", lineHeight: 1.5, color: aux.desc, marginBottom: "12px" }}>
          APP-4521 · Home Loan · ₹42,00,000
        </p>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: "12px" }}>
          {STATUS_STEPS.map((s, i) => (
            <div key={s.label} style={{ display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {s.done ? (
                  <CheckCircle2 size={14} color={aux.accent} />
                ) : s.active ? (
                  <Clock size={14} color={aux.accent} />
                ) : (
                  <Circle size={14} color={aux.cardBorder} />
                )}
                {i < STATUS_STEPS.length - 1 && (
                  <span
                    style={{
                      width: "1.5px",
                      flex: 1,
                      minHeight: "14px",
                      background: s.done ? aux.accent : aux.cardBorder,
                    }}
                  />
                )}
              </div>
              <p
                className="font-mono"
                style={{
                  fontSize: "8px",
                  color: s.done || s.active ? aux.title : aux.desc,
                  fontWeight: s.active ? 700 : 500,
                  margin: "0 0 12px",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div
          className="font-mono"
          style={{
            textAlign: "center",
            fontSize: "8px",
            color: "#fff",
            background: aux.accent,
            borderRadius: "999px",
            padding: "7px 0",
          }}
        >
          View Sanction Letter
        </div>
      </div>
    </PhoneFrame>
  );
}

function LendNovaCaseStudy() {
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
                Lending, built
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  without the wait
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                A multi-lender digital marketplace that connects borrowers with banks, NBFCs, and MSME
                lenders through one application — structured, matched, and tracked without the usual
                back-and-forth.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - loan match + status tracker flow */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start" style={{ padding: "20px 0" }}>
                <LoanMatchPhoneMockup aux={aux} />
                <StatusTrackerPhoneMockup aux={aux} />
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
                A digital lending
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>marketplace</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief was to redefine how businesses and individuals access credit. Borrowers were
                stuck approaching lenders one at a time, resubmitting the same documents and waiting
                weeks for a decision with no visibility into where things stood.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                We built LendNova as a single digital marketplace that connects borrowers with a wide
                network of lenders — banks, NBFCs, and MSME-focused institutions — through one
                structured application, enabling faster, more tailored financial decisions.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor }}>
                Built on transparency and trust, the platform gives borrowers real-time visibility into
                every stage of their application, gives lenders pre-qualified leads instead of raw
                paperwork, and gives DSAs and CAs a shared system to track every referral end to end.
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
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>faster decisions</em>
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