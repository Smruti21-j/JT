import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Menu,
  Bell,
  Terminal,
  KeyRound,
  ChevronRight,
  CheckCircle2,
  Users,
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
  "React", "TypeScript", "Node.js", "Go", "PostgreSQL",
  "Redis", "WebSockets", "Docker", "Kubernetes",
  "AWS KMS", "HashiCorp Vault", "AWS",
];

const CASE_META = [
  { label: "Sector", value: "Infrastructure & DevOps" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Platform, DevOps & Security Teams" },
];

const INTEGRATIONS = [
  "SSO / SAML login for centralized team access",
  "GitHub Actions & GitLab CI pipeline triggers",
  "Vault sync with 1Password and AWS Secrets Manager",
];

const CHALLENGES = [
  {
    title: "SSH keys everywhere",
    desc: "Every engineer held their own scattered SSH keys and .pem files across laptops, with no central way to revoke access when someone left the team.",
  },
  {
    title: "Secrets living in chat and spreadsheets",
    desc: "API keys, database credentials, and certificates were passed around informally, with no audit trail of who accessed what and when.",
  },
  {
    title: "Deploys disconnected from infrastructure",
    desc: "CI/CD lived in a separate tool from the servers it deployed to, making it hard to trace a bad deploy back to the exact session that ran it.",
  },
];

const FEATURES = [
  {
    title: "Browser-based terminal access",
    desc: "Full SSH terminal sessions to any registered server, straight from the browser, with no local keys or VPN setup required.",
  },
  {
    title: "Centralized secrets vault",
    desc: "API keys, credentials, and certificates stored, rotated, and shared from one encrypted vault instead of scattered files and chat threads.",
  },
  {
    title: "Built-in CI/CD pipelines",
    desc: "Pipelines trigger deploys directly against the infrastructure they run on, governed by the same access controls as everything else in the console.",
  },
  {
    title: "Session recording & audit logs",
    desc: "Every terminal session and secret access is logged, timestamped, and searchable for compliance and incident response.",
  },
  {
    title: "SSO & role-based access",
    desc: "Centralized login with granular, role-based permissions per server, environment, and secret.",
  },
  {
    title: "Real-time server health",
    desc: "Live CPU, memory, and uptime monitoring for every connected server, visible right alongside the terminal.",
  },
];

const OUTCOMES = [
  { value: "Zero-key", label: "No local SSH keys or shared credentials" },
  { value: "Encrypted", label: "Centralized secrets vault" },
  { value: "Audited", label: "Full session & access logging" },
  { value: "Unified", label: "Terminals, vault & CI/CD together" },
];

export const Route = createFileRoute("/case-studies/creditreport")({
  component: SSHManagerCaseStudy,
  head: () => ({
    meta: [
      { title: "Infrastructure Console — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built a browser-based console combining SSH terminals, a secrets vault, and CI/CD in one place.",
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

// ─── Phone 1: landing — reach a terminal or the vault ───────────────────────

function AccessPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "8px 14px 18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "18px" }}>
          <div className="flex items-center gap-1.5">
            <span style={{ width: "14px", height: "14px", borderRadius: "4px", background: aux.accent }} />
            <span style={{ fontSize: "11px", fontWeight: 700, color: aux.title }}>SSH Manager</span>
          </div>
          <Bell size={13} color={aux.desc} />
        </div>

        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: `${aux.accent}14`,
            border: `1px solid ${aux.accent}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Terminal size={22} color={aux.accent} />
        </div>

        <p style={{ fontSize: "10.5px", lineHeight: 1.5, color: aux.desc, textAlign: "center", marginBottom: "16px" }}>
          Reach any server or secret, anytime, anywhere.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { icon: Terminal, title: "Open Browser Terminal", sub: "42 servers connected" },
            { icon: KeyRound, title: "Open Secrets Vault", sub: "128 secrets stored" },
          ].map((row) => (
            <div
              key={row.title}
              className="flex items-center justify-between"
              style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "10px", padding: "9px 10px" }}
            >
              <div className="flex items-center gap-2">
                <row.icon size={13} color={aux.accent} />
                <div>
                  <p style={{ fontSize: "8.5px", fontWeight: 700, color: aux.title, margin: 0 }}>{row.title}</p>
                  <p className="font-mono" style={{ fontSize: "7px", color: aux.desc, margin: 0 }}>{row.sub}</p>
                </div>
              </div>
              <ChevronRight size={12} color={aux.desc} />
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 2: security score gauge + uptime history ─────────────────────────

function SecurityGauge({ aux, score }: { aux: ReturnType<typeof auxPalette>; score: number }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90">
      <circle cx="45" cy="45" r={r} fill="none" stroke={aux.cardBorder} strokeWidth="7" />
      <circle
        cx="45"
        cy="45"
        r={r}
        fill="none"
        stroke={aux.accent}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform="rotate(-90 45 45)"
      />
      <text x="45" y="42" textAnchor="middle" style={{ fontSize: "20px", fontWeight: 800, fill: aux.title }}>{score}</text>
      <text x="45" y="56" textAnchor="middle" style={{ fontSize: "7px", fill: aux.desc }}>/ 100</text>
    </svg>
  );
}

function SecurityScorePhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  const history = [58, 62, 60, 68, 71, 75, 79, 83, 86, 88, 90, 92];
  const maxH = Math.max(...history);
  const points = history
    .map((v, i) => `${(i / (history.length - 1)) * 100},${40 - (v / maxH) * 36}`)
    .join(" ");

  return (
    <PhoneFrame aux={aux} style={{ marginTop: "24px" }}>
      <div style={{ padding: "8px 14px 18px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "12px" }}>
          <Menu size={13} color={aux.desc} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: aux.title }}>SSH Manager</span>
          <Bell size={13} color={aux.desc} />
        </div>

        <p className="font-mono" style={{ fontSize: "8px", color: aux.desc, marginBottom: "6px" }}>Your Security Score</p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
          <SecurityGauge aux={aux} score={92} />
        </div>
        <p className="font-mono" style={{ fontSize: "8px", color: aux.accent, textAlign: "center", fontWeight: 700, margin: "0 0 2px" }}>▲ 4 pts</p>
        <p className="font-mono" style={{ fontSize: "7px", color: aux.desc, textAlign: "center", marginBottom: "12px" }}>Last scanned: Today</p>

        <div
          className="flex items-center justify-between"
          style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "9px", padding: "8px 10px", marginBottom: "10px" }}
        >
          <div className="flex items-center gap-2">
            <Users size={12} color={aux.accent} />
            <span style={{ fontSize: "8.5px", color: aux.title }}>Active Sessions</span>
          </div>
          <div className="flex items-center gap-1">
            <span style={{ fontSize: "9.5px", fontWeight: 700, color: aux.title }}>6</span>
            <CheckCircle2 size={11} color={aux.accent} />
          </div>
        </div>

        <p className="font-mono" style={{ fontSize: "6.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: aux.desc, marginBottom: "4px" }}>
          Uptime History
        </p>
        <svg viewBox="0 0 100 44" style={{ width: "100%", height: "40px" }}>
          <polyline points={points} fill="none" stroke={aux.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </PhoneFrame>
  );
}

function SSHManagerCaseStudy() {
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
                Every server,
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  one console
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                Browser-based terminals, a centralized secrets vault, and CI/CD pipelines — all in
                one console, with no local SSH keys scattered across laptops.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - access console + security score */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                <AccessPhoneMockup aux={aux} />
                <SecurityScorePhoneMockup aux={aux} />
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
                Infrastructure
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>without the sprawl</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief was to give infrastructure and security teams a single place to reach
                any server, manage every credential, and ship deployments — without juggling
                terminal windows, spreadsheets of API keys, and a separate CI tool.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "32px" }}>
                We built SSH Manager as a browser-based console: full terminal access to any
                registered server, an encrypted secrets vault for keys and certificates, and
                CI/CD pipelines that run right alongside the infrastructure they deploy to. Every
                session and every secret access is logged, so security teams get visibility
                without slowing anyone down.
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
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>zero-trust access</em>
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