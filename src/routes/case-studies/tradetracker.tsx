import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import {
  Menu,
  Bell,
  Bot,
  GitBranch,
  CheckCircle2,
  Circle,
  AlertCircle,
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
  "TypeScript", "Node.js", "Model Context Protocol", "PostgreSQL",
  "pgvector", "Redis", "Docker", "AWS", "GraphQL",
  "WebSockets", "Git", "Anthropic API",
];

const CASE_META = [
  { label: "Sector", value: "AI Context Layer & DevTools" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Engineering Teams & AI Coding Agents" },
];

const CHALLENGES = [
  {
    title: "Context scattered everywhere",
    desc: "Code, docs, tickets, and design decisions lived across a dozen tools, so every AI coding agent started each task from zero context.",
  },
  {
    title: "No shared memory between agents",
    desc: "Claude Code, Cursor, and other agents working on the same repo had no way to share what they'd already learned, tried, or decided.",
  },
  {
    title: "Context that goes stale fast",
    desc: "Static prompt files and README dumps couldn't keep pace with a fast-moving codebase, so agents kept working off outdated assumptions.",
  },
];

const FEATURES = [
  {
    title: "Universal MCP context server",
    desc: "A single MCP endpoint that briefs any connected AI coding agent with exactly the context it needs for the task at hand.",
  },
  {
    title: "Live repository indexing",
    desc: "Continuously indexes code, docs, and commit history so agents work from current state instead of a stale snapshot.",
  },
  {
    title: "Cross-agent memory",
    desc: "Decisions, conventions, and findings from one agent's session persist, so the next agent picks up mid-thread instead of starting over.",
  },
  {
    title: "Scoped context briefs",
    desc: "Per-task context packages — only the files, docs, and history relevant to what the agent is actually working on, nothing more.",
  },
  {
    title: "Agent activity dashboard",
    desc: "Real-time visibility into which agents are active, what they're querying, and how much context they're pulling from each repo.",
  },
  {
    title: "Access & permission controls",
    desc: "Fine-grained control over which repos, docs, and secrets each agent or team is allowed to see, enforced at the context layer.",
  },
];

const OUTCOMES = [
  { value: "Universal", label: "MCP-based context for any AI agent" },
  { value: "Real-time", label: "Live-indexed repo & doc context" },
  { value: "Cross-agent", label: "Shared memory across sessions" },
  { value: "Scoped", label: "Per-task context, not everything" },
];

export const Route = createFileRoute("/case-studies/tradetracker")({
  component: ContextBrainCaseStudy,
  head: () => ({
    meta: [
      { title: "AI Context Layer — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built an MCP context layer that briefs every AI coding agent with live, scoped, cross-agent context.",
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

// ─── Phone 1: Dashboard — context served, sync stats, query volume chart ───

function DashboardPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  const bars = [3, 5, 4, 7, 6, 8, 7, 9, 8, 10, 9, 11];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const maxBar = Math.max(...bars);

  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "8px 13px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
          <Menu size={14} color={aux.desc} />
          <span className="font-mono" style={{ fontSize: "8px", color: aux.desc }}>Last 30 Days</span>
          <Bell size={14} color={aux.desc} />
        </div>

        <p style={{ fontSize: "13px", fontWeight: 700, color: aux.title, margin: "0 0 6px" }}>Dashboard</p>

        <p className="font-mono" style={{ fontSize: "8px", color: aux.desc, margin: "0 0 2px" }}>Context Served</p>
        <p className="font-display" style={{ fontSize: "26px", fontWeight: 800, color: aux.title, margin: "0 0 10px", lineHeight: 1 }}>
          1.2M <span style={{ fontSize: "13px", fontWeight: 700, color: aux.accent }}>tok</span>
        </p>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "42px", marginBottom: "12px" }}>
          {bars.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
              <span
                style={{
                  width: "100%",
                  height: `${(v / maxBar) * 100}%`,
                  background: aux.accent,
                  opacity: 0.45 + (v / maxBar) * 0.55,
                  borderRadius: "2px 2px 0 0",
                }}
              />
              <span className="font-mono" style={{ fontSize: "5.5px", color: aux.desc }}>{months[i]}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: "Sync Latency", value: "84ms" },
            { label: "Cache Hit", value: "97.2%" },
            { label: "Accuracy", value: "99.1%" },
          ].map((s) => (
            <div key={s.label} style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "8px", padding: "6px 5px" }}>
              <p style={{ fontSize: "9.5px", fontWeight: 800, color: aux.title, margin: 0 }}>{s.value}</p>
              <p className="font-mono" style={{ fontSize: "5.5px", letterSpacing: "0.04em", textTransform: "uppercase", color: aux.desc, margin: "2px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

// ─── Phone 2: Agent Requests — live feed of context pulls, ticket-style ────

const AGENT_REQUESTS = [
  { agent: "Claude Code", task: "Refactor auth module for OAuth2 rollout", repo: "core-api", time: "3m", status: "active" },
  { agent: "Cursor", task: "Add tests for the billing API layer", repo: "billing-svc", time: "18m", status: "active" },
  { agent: "Windsurf", task: "Investigate flaky CI on integration suite", repo: "web-app", time: "1h", status: "blocked" },
];

function statusColor(status: string, aux: ReturnType<typeof auxPalette>) {
  if (status === "active") return aux.accent;
  if (status === "blocked") return "#DC2626";
  return aux.desc;
}

function AgentRequestsPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "10px" }}>
      <div style={{ padding: "8px 13px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "10px" }}>
          <Menu size={14} color={aux.desc} />
          <span style={{ fontSize: "11px", fontWeight: 700, color: aux.title }}>Requests</span>
          <Bell size={14} color={aux.desc} />
        </div>

        <div
          className="flex items-center justify-between"
          style={{ background: `${aux.accent}14`, border: `1px solid ${aux.accent}33`, borderRadius: "10px", padding: "8px 10px", marginBottom: "8px" }}
        >
          <span style={{ fontSize: "15px", fontWeight: 800, color: aux.title }}>3</span>
          <span className="font-mono" style={{ fontSize: "8px", color: aux.desc }}>Active this hour</span>
        </div>

        <div className="grid grid-cols-3 gap-1.5" style={{ marginBottom: "10px" }}>
          {[
            { label: "Active", value: "2", icon: CheckCircle2 },
            { label: "Idle", value: "5", icon: Circle },
            { label: "Blocked", value: "1", icon: AlertCircle },
          ].map((s) => (
            <div key={s.label} style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "8px", padding: "6px 5px", textAlign: "center" }}>
              <p style={{ fontSize: "10px", fontWeight: 800, color: aux.title, margin: 0 }}>{s.value}</p>
              <p className="font-mono" style={{ fontSize: "5.5px", letterSpacing: "0.04em", textTransform: "uppercase", color: aux.desc, margin: "2px 0 0" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <p className="font-mono" style={{ fontSize: "6.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: aux.desc, marginBottom: "6px" }}>
          Latest Requests
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {AGENT_REQUESTS.map((r) => (
            <div key={r.task} style={{ background: aux.cardBg, border: `1px solid ${aux.cardBorder}`, borderRadius: "9px", padding: "7px 9px" }}>
              <div className="flex items-center justify-between" style={{ marginBottom: "3px" }}>
                <div className="flex items-center gap-1.5">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: statusColor(r.status, aux), flexShrink: 0 }} />
                  <Bot size={9} color={aux.accent} />
                  <span className="font-mono" style={{ fontSize: "7px", fontWeight: 700, color: aux.title }}>{r.agent}</span>
                </div>
                <span className="font-mono" style={{ fontSize: "6.5px", color: aux.desc }}>{r.time}</span>
              </div>
              <p style={{ fontSize: "7.5px", color: aux.title, margin: "0 0 3px", lineHeight: 1.4 }}>{r.task}</p>
              <div className="flex items-center gap-1">
                <GitBranch size={8} color={aux.desc} />
                <span className="font-mono" style={{ fontSize: "6.5px", color: aux.desc }}>{r.repo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function ContextBrainCaseStudy() {
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
                One brief,
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  every agent
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                Context Brain is the context layer that briefs every AI coding agent over MCP —
                live-indexed, scoped to the task, and shared across every agent working the
                same codebase.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - live dashboard + agent request feed */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start gap-5" style={{ padding: "20px 0" }}>
                <DashboardPhoneMockup aux={aux} />
                <AgentRequestsPhoneMockup aux={aux} />
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
                A context layer
                <br />
                <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>for AI agents</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief was simple to state and hard to build: every AI coding agent touching
                a codebase should start from the same, current understanding of it — not a
                stale README, and not whatever fit in that session's context window.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                We built Context Brain as an MCP server that sits between a team's codebase and
                every agent that touches it — Claude Code, Cursor, Windsurf, or anything else
                speaking MCP — continuously indexing code, docs, and history into scoped,
                task-specific briefs.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor }}>
                Agents don't just receive context, they contribute to it. Decisions and findings
                from one session persist so the next agent — or the next engineer — picks up
                exactly where things left off.
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
            <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>shared context</em>
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