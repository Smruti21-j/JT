import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import { Menu, Sparkles, ThumbsUp, ThumbsDown, Copy, Download, Info, X, AlertTriangle, ChevronDown } from "lucide-react";

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
  "PostgreSQL", "Redis", "OpenAI API", "Anthropic API",
  "Docker", "AWS", "WebSockets",
];

const CASE_META = [
  { label: "Sector", value: "Privacy & AI Infrastructure" },
  { label: "Engagement", value: "Full Product Build" },
  { label: "Users", value: "Individuals, Families & Pros" },
];

const CHALLENGES = [
  {
    title: "Fragmented AI usage",
    desc: "People were already juggling multiple AI models across separate tabs, apps, and accounts, with no single place to compare outputs or track what they'd shared.",
  },
  {
    title: "Invisible data exposure",
    desc: "Sensitive information — names, addresses, financial details — was routinely typed into prompts with no visibility into what was retained, by whom, or for how long.",
  },
  {
    title: "No corrective path",
    desc: "Once sensitive data was sent, there was no way to flag it, mask it retroactively, or understand the real privacy risk of a given conversation.",
  },
];

const FEATURES = [
  {
    title: "Multi-model workspace",
    desc: "A single interface to run prompts against multiple AI models in parallel, compare responses side by side, and pick the best answer without juggling tabs.",
  },
  {
    title: "Real-time sensitivity detection",
    desc: "Every prompt and response is scanned as it's typed and generated, flagging personal data, financial details, and other sensitive content before it leaves the browser.",
  },
  {
    title: "Anonymization & masking",
    desc: "One-click redaction lets users mask or anonymize sensitive fields in a conversation retroactively, without losing the surrounding context of the response.",
  },
  {
    title: "Feedback & evaluation layer",
    desc: "Users rate and annotate model responses, building a running quality signal that helps them learn which model to trust for which kind of task.",
  },
  {
    title: "Privacy analytics dashboard",
    desc: "A running view of exposure trends over time — what kinds of sensitive data get shared most often, and how usage habits shift as awareness grows.",
  },
  {
    title: "Granular access controls",
    desc: "Family and team accounts with per-member visibility settings, so guardians and admins can review usage without seeing raw conversation content.",
  },
];

const OUTCOMES = [
  { value: "Real-time", label: "Sensitive data detection latency" },
  { value: "Multi-model", label: "Parallel AI comparison support" },
  { value: "1-click", label: "Anonymization & masking workflow" },
  { value: "End-to-end", label: "Privacy-first architecture" },
];

export const Route = createFileRoute("/case-studies/pryvasee-ai")({
  component: PrivacyAICaseStudy,
  head: () => ({
    meta: [
      { title: "Privacy-First AI Platform — Case Study | Jarvis Technolabs" },
      {
        name: "description",
        content:
          "How we built a secure, multi-model AI interaction platform that detects and protects sensitive data in real time.",
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

function NaturalSceneArt({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <svg
      viewBox="0 0 200 200"
      style={{ width: "100%", height: "100%", display: "block" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${aux.accent}33`} />
          <stop offset="100%" stopColor={`${aux.accent}0D`} />
        </linearGradient>
        <linearGradient id="hillGradBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${aux.accent}55`} />
          <stop offset="100%" stopColor={`${aux.accent}33`} />
        </linearGradient>
        <linearGradient id="hillGradFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={aux.accent} />
          <stop offset="100%" stopColor={`${aux.accent}CC`} />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect x="0" y="0" width="200" height="200" fill="url(#skyGrad)" />

      {/* sun */}
      <circle cx="150" cy="46" r="18" fill={aux.accent} opacity="0.85" />
      <circle cx="150" cy="46" r="28" fill="none" stroke={aux.accent} strokeWidth="1" opacity="0.3" />

      {/* clouds */}
      <g opacity="0.5" fill={aux.cardBg}>
        <ellipse cx="46" cy="40" rx="20" ry="8" />
        <ellipse cx="60" cy="36" rx="14" ry="7" />
        <ellipse cx="34" cy="36" rx="12" ry="6" />
      </g>

      {/* back hill */}
      <path d="M0,130 Q50,95 100,120 T200,110 V200 H0 Z" fill="url(#hillGradBack)" />

      {/* front hill */}
      <path d="M0,160 Q60,115 120,150 T200,140 V200 H0 Z" fill="url(#hillGradFront)" />

      {/* tree cluster */}
      <g transform="translate(38,150)">
        <rect x="-1.5" y="14" width="3" height="16" fill={aux.title} opacity="0.5" />
        <circle cx="0" cy="8" r="12" fill={aux.title} opacity="0.55" />
      </g>
      <g transform="translate(168,158) scale(0.8)">
        <rect x="-1.5" y="14" width="3" height="16" fill={aux.title} opacity="0.45" />
        <circle cx="0" cy="8" r="12" fill={aux.title} opacity="0.5" />
      </g>
    </svg>
  );
}

function ChatPhoneMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux}>
      <div style={{ padding: "10px 14px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "14px" }}>
          <Menu size={15} color={aux.desc} />
          <span style={{ fontSize: "11.5px", fontWeight: 700, color: aux.title }}>DataShieldAI</span>
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
          generate an image of a natural scene
        </div>

       <div
  style={{
    aspectRatio: "1 / 1",
    borderRadius: "10px",
    overflow: "hidden",
    border: `1px solid ${aux.cardBorder}`,
    marginBottom: "10px",
  }}
>
  <NaturalSceneArt aux={aux} />
</div>

        <div className="flex items-center gap-3" style={{ opacity: 0.6 }}>
          <ThumbsUp size={12} color={aux.desc} />
          <ThumbsDown size={12} color={aux.desc} />
          <Copy size={12} color={aux.desc} />
          <Download size={12} color={aux.desc} />
          <Info size={12} color={aux.desc} />
        </div>
      </div>
    </PhoneFrame>
  );
}

const PRIVACY_ROWS = [
  { label: "Email", value: "test@gmail.com" },
  { label: "Phone", value: "+91 1234 5678 90" },
  { label: "Address", value: "456 Willow Creek Drive" },
  { label: "Credit Card", value: "1234 5678 9012" },
  { label: "Passport", value: "123456789" },
];

function PrivacyModalMockup({ aux }: { aux: ReturnType<typeof auxPalette> }) {
  return (
    <PhoneFrame aux={aux} style={{ marginTop: "44px", marginLeft: "-28px" }}>
      <div style={{ padding: "10px 14px 16px" }}>
        <div className="flex items-center justify-between" style={{ marginBottom: "8px" }}>
          <X size={13} color={aux.desc} />
          <span style={{ fontSize: "10.5px", fontWeight: 700, color: aux.title, textAlign: "center", flex: 1 }}>
            Sensitive Information Detected
          </span>
          <Info size={13} color={aux.desc} />
        </div>

        <p style={{ fontSize: "8.5px", lineHeight: 1.5, color: aux.desc, marginBottom: "10px" }}>
          Sharing personal information with AI models may pose privacy risks.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "6px",
            background: `${aux.accent}14`,
            border: `1px solid ${aux.accent}33`,
            borderRadius: "8px",
            padding: "8px 9px",
            marginBottom: "10px",
          }}
        >
          <AlertTriangle size={12} color={aux.accent} style={{ flexShrink: 0, marginTop: "1px" }} />
          <span className="font-mono" style={{ fontSize: "7.5px", lineHeight: 1.5, color: aux.title }}>
            We detected {PRIVACY_ROWS.length} instances of potentially sensitive information.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
          {PRIVACY_ROWS.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between"
              style={{
                background: aux.cardBg,
                border: `1px solid ${aux.cardBorder}`,
                borderRadius: "8px",
                padding: "6px 9px",
              }}
            >
              <div>
                <p className="font-mono" style={{ fontSize: "7px", color: aux.accent, margin: 0, letterSpacing: "0.05em" }}>
                  {row.label.toUpperCase()}
                </p>
                <p style={{ fontSize: "8px", color: aux.title, margin: 0 }}>{row.value}</p>
              </div>
              <ChevronDown size={11} color={aux.desc} />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span
            className="font-mono"
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "8px",
              color: aux.title,
              border: `1px solid ${aux.cardBorder}`,
              borderRadius: "999px",
              padding: "7px 0",
            }}
          >
            Edit Query
          </span>
          <span
            className="font-mono"
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "8px",
              color: "#fff",
              background: aux.accent,
              borderRadius: "999px",
              padding: "7px 0",
            }}
          >
            Processed
          </span>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PrivacyAICaseStudy() {
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
                className="font-display"
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
                Privacy, built
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
                  into every interaction.
                </em>
              </h1>

              <p style={{ maxWidth: "720px", fontSize: "16px", lineHeight: 1.8, color: pal.headerParaColor, marginTop: "24px" }}>
                A secure, multi-model AI interaction platform that lets people use AI without giving up
                control of their data — built from the ground up around real-time privacy protection.
              </p>
            </div>

            {/* Coded phone mockups (not an image) - chat + privacy detection flow */}
            <div className="flex justify-center lg:justify-end">
              <div className="flex items-start" style={{ padding: "20px 0" }}>
                <ChatPhoneMockup aux={aux} />
                <PrivacyModalMockup aux={aux} />
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
              <h2 className="font-display" style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0 }}>
                A privacy-first
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>AI ecosystem.</em>
              </h2>
            </div>

            <div className="lg:col-span-8">
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The brief was to design and build a platform that lets people use multiple AI models
                side by side — without the usual trade-off of handing over sensitive information with
                every prompt. Most AI tools treat privacy as an afterthought, buried in a settings menu
                nobody reads. We set out to make it the default, visible in every interaction.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor, marginBottom: "20px" }}>
                The result is a single workspace that centralizes AI usage across models, while
                continuously scanning, flagging, and protecting sensitive information in real time —
                combining AI interaction, privacy protection, feedback, and analytics into one ecosystem.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.85, color: pal.headerParaColor }}>
                Users don't just generate responses — they evaluate them, catch sensitive data exposure
                before it becomes a problem, and take corrective action like anonymizing or masking
                information on the spot. It turns everyday AI usage into something secure,
                insight-driven, and fully under the user's control.
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
            className="font-display"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px", maxWidth: "700px" }}
          >
            Three problems{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
              nobody was solving together.
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
            className="font-display"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px", maxWidth: "760px" }}
          >
            Every layer designed around{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>user control.</em>
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
            className="font-display"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "40px" }}
          >
            What shipped.
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
            className="font-display"
            style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700, color: pal.headerHeadingColor, margin: 0, marginBottom: "28px" }}
          >
            Built on a{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: aux.accent }}>
              modern, production-grade
            </em>{" "}
            stack.
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