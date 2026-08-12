import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Lightbulb,
  Sparkles,
  Home,
  Send,
  Clock3,
  Menu as MenuIcon,
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
  "PostgreSQL", "Redis", "OpenAI API", "Stripe API",
  "DocuSign API", "Docker", "AWS",
];

const CASE_META = [
  { label: "Sector", value: "Sales & Proposals AI" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Agencies, Consultants & Sales Teams" },
];

const INTEGRATIONS = [
  "Stripe & QuickBooks for line-item pricing",
  "E-signature via DocuSign",
  "CRM sync with HubSpot & Salesforce",
];

const CHALLENGES = [
  {
    title: "Hours lost to scoping and formatting",
    desc: "Every proposal started from a blank document, with scope, deliverables, and pricing rebuilt by hand each time.",
  },
  {
    title: "No visibility after sending",
    desc: "Once a proposal went out, there was no way to see if it had been opened, how it compared to others, or where it stood in the pipeline.",
  },
  {
    title: "Pricing inconsistency across the team",
    desc: "Different reps quoted the same type of work differently, with no shared reference for what a fair, winning price actually looked like.",
  },
];

const FEATURES = [
  {
    title: "Idea-to-proposal drafting",
    desc: "Describe a project in plain language, and Proposal Creator drafts scope, deliverables, timeline, and pricing automatically.",
  },
  {
    title: "Smart, consistent pricing",
    desc: "Pricing suggestions pull from past proposals and win rates, so every rep quotes from the same informed baseline.",
  },
  {
    title: "Client-ready formatting",
    desc: "Every draft renders as a polished, on-brand document ready to send — not a rough outline that needs rebuilding.",
  },
  {
    title: "Proposal status tracking",
    desc: "See every proposal's status — Draft, Sent, Viewed, Won, Lost — in one pipeline view instead of scattered email threads.",
  },
  {
    title: "E-signature & approval flow",
    desc: "Send for signature directly from the platform, with automatic reminders and a clear paper trail on every approval.",
  },
  {
    title: "Win/loss analytics",
    desc: "Understand which sections, price points, and structures actually close deals, based on real outcome data.",
  },
];

const OUTCOMES = [
  { value: "Minutes", label: "Idea to client-ready proposal" },
  { value: "Consistent", label: "Shared pricing baseline across reps" },
  { value: "Tracked", label: "Full status visibility post-send" },
  { value: "Data-driven", label: "Win/loss insight on every proposal" },
];

export const Route = createFileRoute("/case-studies/bni")({
  component: ProposalCreatorCaseStudy,
  head: () => ({
    meta: [
      { title: "AI Proposal Platform — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built an AI proposal generator that turns a rough idea into a client-ready, costed proposal.",
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
  children,
  bottomBar,
}: {
  aux: ReturnType<typeof auxPalette>;
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "182px",
        borderRadius: "28px",
        border: `7px solid ${aux.cardBorder}`,
        background: aux.cardBg,
        overflow: "hidden",
        boxShadow: "0 30px 60px -30px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "70px",
          height: "16px",
          background: aux.cardBorder,
          borderRadius: "0 0 10px 10px",
          zIndex: 2,
        }}
      />
      <div style={{ paddingTop: "20px", paddingBottom: bottomBar ? "44px" : "16px", position: "relative" }}>
        {children}
      </div>
      {bottomBar && (
        <div
          style={{
            position: "absolute",
            bottom: "8px",
            left: "8px",
            right: "8px",
            background: aux.accent,
            borderRadius: "999px",
            padding: "8px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          {bottomBar}
        </div>
      )}
    </div>
  );
}

function BannerPhone({
  aux,
  caption,
  children,
  bottomBar,
}: {
  aux: ReturnType<typeof auxPalette>;
  caption: string;
  children: React.ReactNode;
  bottomBar?: React.ReactNode;
}) {
  return (
    <div style={{ width: "182px" }}>
      <div
        style={{
          background: aux.accent,
          borderRadius: "18px 18px 0 0",
          padding: "18px 16px 46px",
          clipPath: "polygon(0 0, 100% 0, 100% 62%, 0 100%)",
        }}
      >
        <p style={{ color: "#fff", fontWeight: 800, fontSize: "14.5px", lineHeight: 1.3, margin: 0 }}>
          {caption}
        </p>
      </div>
      <div style={{ marginTop: "-46px" }}>
        <PhoneFrame aux={aux} bottomBar={bottomBar}>
          {children}
        </PhoneFrame>
      </div>
    </div>
  );
}

// ─── Phone 1: idea → draft ───────────────────────────────────────────────────

function DraftPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <BannerPhone
      aux={aux}
      caption={"Turn an idea into a proposal"}
      bottomBar={
        <>
          <Home size={13} color="#fff" />
          <Sparkles size={13} color="#fff" />
          <Send size={13} color="#fff" />
          <MenuIcon size={13} color="#fff" />
        </>
      }
    >
      <div style={{ padding: "0 14px" }}>
        <div className="flex items-center gap-1.5" style={{ marginBottom: "10px" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: aux.accent }} />
          <span style={{ fontSize: "9.5px", fontWeight: 700, color: aux.title }}>Proposal Creator</span>
        </div>

        <p style={{ fontSize: "11px", color: aux.title, margin: "0 0 12px" }}>
          Welcome <span style={{ fontWeight: 800, color: aux.accent }}>Ravi</span>
        </p>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: `${aux.accent}14`,
            border: `1px solid ${aux.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 12px",
          }}
        >
          <Lightbulb size={20} color={aux.accent} />
        </div>

        <p className="font-mono" style={{ fontSize: "7px", letterSpacing: "0.06em", textTransform: "uppercase", color: aux.desc, marginBottom: "5px" }}>
          Describe your project
        </p>
        <div
          style={{
            background: aux.cardBg,
            border: `1px solid ${aux.cardBorder}`,
            borderRadius: "9px",
            padding: "9px 10px",
            marginBottom: "12px",
            minHeight: "44px",
          }}
        >
          <span style={{ fontSize: "8px", color: aux.desc, lineHeight: 1.5 }}>
            Website redesign + CMS migration for a 12-page marketing site...
          </span>
        </div>

        <div
          className="flex items-center justify-center gap-2"
          style={{ background: aux.accent, color: "#fff", borderRadius: "999px", padding: "9px 0" }}
        >
          <Sparkles size={12} />
          <span className="font-mono" style={{ fontSize: "8.5px", fontWeight: 700 }}>Draft Proposal</span>
        </div>
      </div>
    </BannerPhone>
  );
}

// ─── Phone 2: proposal history / status ─────────────────────────────────────

const PROPOSAL_HISTORY = [
  { title: "Website Redesign", client: "Solace Studio", status: "Won" },
  { title: "Q3 Marketing Retainer", client: "Northline Co.", status: "Sent" },
  { title: "Brand Identity Refresh", client: "Ferro & Co.", status: "Draft" },
  { title: "App Discovery Sprint", client: "Baseline Labs", status: "Lost" },
];

function statusStyle(status: string, aux: ReturnType<typeof auxPalette>) {
  if (status === "Won") return { color: "#1F9D55", bg: "rgba(31,157,85,0.12)" };
  if (status === "Sent") return { color: aux.accent, bg: `${aux.accent}1A` };
  if (status === "Lost") return { color: "#DC2626", bg: "rgba(220,38,38,0.12)" };
  return { color: aux.desc, bg: aux.cardBorder };
}

function HistoryPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <BannerPhone
      aux={aux}
      caption={"Track every proposal you send"}
      bottomBar={
        <>
          <Home size={13} color="#fff" />
          <Clock3 size={13} color="#fff" />
          <Send size={13} color="#fff" />
          <MenuIcon size={13} color="#fff" />
        </>
      }
    >
      <div style={{ padding: "0 14px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, color: aux.title, margin: "0 0 10px" }}>
          Proposal History
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {PROPOSAL_HISTORY.map((p) => {
            const s = statusStyle(p.status, aux);
            return (
              <div
                key={p.title}
                style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "9px", padding: "7px 9px" }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "2px" }}>
                  <span style={{ fontSize: "8px", fontWeight: 700, color: aux.title }}>{p.title}</span>
                  <span
                    className="font-mono"
                    style={{ fontSize: "6.5px", fontWeight: 700, color: s.color, background: s.bg, borderRadius: "999px", padding: "2px 7px" }}
                  >
                    {p.status}
                  </span>
                </div>
                <span className="font-mono" style={{ fontSize: "6.5px", color: aux.desc }}>{p.client}</span>
              </div>
            );
          })}
        </div>
      </div>
    </BannerPhone>
  );
}

function ProposalCreatorCaseStudy() {
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
                An idea in,
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  a proposal out
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                Proposal Creator turns a rough idea — typed or dictated — into a structured,
                priced, client-ready proposal in minutes, not hours.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - draft from idea + proposal history */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                <DraftPhoneMockup aux={aux} />
                <HistoryPhoneMockup aux={aux} />
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
                From idea
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>to signed deal</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief came from sales and consulting teams who could describe what a client
                needed in five minutes, but spent hours turning that into an actual proposal
                document — scoping, pricing, and formatting from scratch every time.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "32px" }}>
                We built Proposal Creator as an AI drafting layer: describe the project, and it
                drafts scope, deliverables, timeline, and pricing into a structured, client-ready
                document. Every proposal stays editable and trackable after it's sent, so teams
                see status at a glance instead of digging through email threads.
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
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>speed and trust</em>
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