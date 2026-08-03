import { useEffect, useRef, useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";
import { POSTS } from "@/data/insights";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Insights - Jarvis Technolabs" },
      { name: "description", content: "Field notes on AI, digital transformation and product engineering - from the team shipping for D2C brands and enterprises." },
      { property: "og:title", content: "Insights - Jarvis Technolabs" },
      { property: "og:description", content: "Field notes on AI, digital transformation and product engineering." },
    ],
  }),
});

// ─────────────────────────────────────────────────────────────────────────────
// THEME TOKENS
//
// Previously every color on this page was a hardcoded hex value assuming a
// permanently dark background (#0a0a0a everywhere), so there was no light
// theme at all — Nav/Footer were also called with no theme props, meaning
// they'd render in whatever their own defaults are, disconnected from the
// rest of the page. This palette function mirrors the pattern already used
// in services.tsx / index.tsx (pillarPalette / auxPalette), and Nav/Footer
// are now wired the same way: <Nav theme={theme} onToggleTheme={toggleTheme} />
// and <Footer theme={theme} />.
// ─────────────────────────────────────────────────────────────────────────────

function insightsPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      bg: "#faf9f6",
      cardBg: "#ffffff",
      cardBorder: "rgba(0,0,0,0.08)",
      ink: "#181818",
      inkDim: "rgba(25,25,25,0.55)",
      inkFaint: "rgba(25,25,25,0.35)",
      inkFainter: "rgba(25,25,25,0.22)",
      accent: "rgb(199,90,26)",
      line: "rgba(0,0,0,0.10)",
      lineSoft: "rgba(0,0,0,0.06)",
      quoteBg: "rgba(199,90,26,0.06)",
      tagBg: "rgba(199,90,26,0.08)",
      tagBorder: "rgba(199,90,26,0.22)",
      videoOpacity: 0,
    };
  }
  return {
    bg: "#0a0a0a",
    cardBg: "#111214",
    cardBorder: "rgba(255,255,255,0.08)",
    ink: "#f0e8df",
    inkDim: "rgba(240,232,220,0.5)",
    inkFaint: "rgba(255,255,255,0.35)",
    inkFainter: "rgba(255,255,255,0.22)",
    accent: "rgb(255,130,50)",
    line: "rgba(255,255,255,0.08)",
    lineSoft: "rgba(255,255,255,0.06)",
    quoteBg: "rgba(255,130,50,0.05)",
    tagBg: "rgba(255,130,50,0.1)",
    tagBorder: "rgba(255,130,50,0.2)",
    videoOpacity: 0.4,
  };
}

interface PostSection {
  type: "heading" | "subheading" | "paragraph" | "quote" | "list" | "divider";
  text?: string;
  items?: string[];
}

interface PostContent {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  sections: PostSection[];
}

const POST_CONTENT: PostContent[] = [
  {
    slug: "why-most-ai-pilots-never-reach-production",
    title: "Why Most AI Pilots Never Reach Production",
    subtitle: "A frank look at the gap between demo-day excitement and deployed value.",
    tags: ["AI", "Strategy", "Engineering"],
    sections: [
      { type: "paragraph", text: "Every week another company announces a successful AI pilot. Executives beam, dashboards glow green, and press releases speak of 'transformative outcomes.' Six months later, the same system is quietly mothballed. This is the AI pilot paradox — and it's more common than anyone admits." },
      { type: "heading", text: "The Demo-to-Deploy Chasm" },
      { type: "paragraph", text: "Pilots are optimised for impressiveness, not operability. Teams cherry-pick clean datasets, paper over edge cases, and benchmark against ideal conditions. The moment a model hits real user behaviour — messy inputs, adversarial prompts, unstructured data — performance degrades sharply." },
      { type: "paragraph", text: "We've audited over 40 stalled AI initiatives across D2C, logistics, and financial services. In 80% of cases, failure wasn't technical. It was organisational: no clear owner post-pilot, no feedback loop into retraining, and no tolerance for the 'good-enough-but-not-perfect' outputs that LLMs invariably produce." },
      { type: "quote", text: "The question isn't 'can we build it?' — it's 'can we run it, maintain it, and improve it 18 months from now when the original team has moved on?'" },
      { type: "heading", text: "Three Patterns That Actually Ship" },
      { type: "list", items: ["Narrow scope, measurable outcome. Replace one specific workflow rather than 'augmenting the whole team.' Pick something where a 15% improvement is provably valuable.", "Human-in-the-loop as a first-class feature. Don't hide the AI. Surface confidence scores, let users override, and log every correction — that's your training data for v2.", "Own the infra from day one. SaaS AI wrappers are fine for prototypes. Production systems need versioned prompts, eval harnesses, and rollback capability."] },
      { type: "heading", text: "What We Do Differently" },
      { type: "paragraph", text: "At Jarvis Technolabs, every AI engagement begins with a Production Readiness Assessment — a structured 2-week sprint that maps the delta between 'impressive demo' and 'maintainable system.' We look at data pipelines, model observability, user trust signals, and escalation paths before writing a single line of integration code." },
      { type: "paragraph", text: "If a use case can't survive that assessment, we say so early. The best thing we can do for a client is save them six months of sunk cost on a pilot that was never going to scale." },
      { type: "divider" },
      { type: "paragraph", text: "Want to run a Production Readiness Assessment on your current AI initiative? We're taking on three new engagements this quarter." },
    ],
  },
  {
    slug: "hidden-cost-of-legacy-commerce-platforms",
    title: "The Hidden Cost of Legacy Commerce Platforms",
    subtitle: "Technical debt isn't just an IT problem — it's a revenue problem.",
    tags: ["Commerce", "Performance", "Engineering"],
    sections: [
      { type: "paragraph", text: "When a D2C brand's conversion rate drops 0.3%, the marketing team rewrites ad copy. When checkout load time creeps from 1.8s to 2.4s, it barely registers in the weekly standup. But that 600ms delta is costing you — and the compounding is brutal." },
      { type: "heading", text: "The Numbers Nobody Tracks" },
      { type: "paragraph", text: "Google's research is unambiguous: a 1-second delay in mobile load time reduces conversions by up to 20%. For a brand doing ₹10 Cr monthly GMV, that's ₹2 Cr walking out the door — every month — while the platform team debates the next sprint." },
      { type: "paragraph", text: "Legacy platforms compound this in ways that aren't captured in any dashboard. Plugin conflicts that require workarounds that require workarounds. Custom checkout flows that break every time the platform auto-updates. An analytics stack so fragmented that nobody trusts the attribution data anymore." },
      { type: "quote", text: "Legacy debt isn't a balance-sheet item. It's a ceiling — invisible until you're pressed against it." },
      { type: "heading", text: "Replatforming Without the Horror Story" },
      { type: "list", items: ["Audit before you migrate. Understand what's actually used vs. what's just present. Most platforms carry 40% dead weight.", "Migrate data, not design. A replatform is an opportunity to kill the accumulated UI debt too. Resist the urge to 'replicate exactly.'", "Phase the cutover. Traffic splitting between old and new platforms for 4–6 weeks is standard practice — zero-downtime migration is a solved problem.", "Instrument everything before launch. You need a baseline. Without it, you can't prove the replatform worked."] },
      { type: "heading", text: "Our Track Record" },
      { type: "paragraph", text: "We've migrated 23 D2C brands off legacy platforms in the last three years. Average outcome: 31% improvement in Core Web Vitals, 18% lift in conversion rate within 90 days of launch." },
    ],
  },
  {
    slug: "designing-for-trust-ux-patterns-in-fintech",
    title: "Designing for Trust: UX Patterns in Fintech",
    subtitle: "How micro-decisions in interface design determine whether users hand over their money.",
    tags: ["Design", "Fintech", "UX"],
    sections: [
      { type: "paragraph", text: "Trust is the core product in financial services. Not returns, not features, not even security — trust. Everything else is downstream of it. And trust is built or broken in milliseconds, through interface decisions that most product teams make without realising their weight." },
      { type: "heading", text: "The Anatomy of a Trust Signal" },
      { type: "paragraph", text: "Users don't read security certifications. They feel safe or they don't, based on visual cues processed before conscious thought kicks in. Typography weight. Button radius. The precise shade of green on a confirmation state. These aren't aesthetic preferences — they're trust levers." },
      { type: "list", items: ["Density signals seriousness. Sparse, breathable layouts communicate leisure. Structured, information-dense layouts communicate competence. Financial products belong in the latter category.", "Predictability reduces anxiety. Every deviant interaction pattern generates a micro-dose of anxiety. In fintech, anxiety accumulates into abandonment.", "Errors must educate, not blame. 'Invalid account number' is a failure message. 'Account numbers are 11 digits — yours has 10' is a trust-building moment."] },
      { type: "heading", text: "Patterns We've Validated in Production" },
      { type: "paragraph", text: "Across eight fintech products shipped in the last two years, we've run controlled experiments on trust-related UX patterns. The findings consistently surprise clients who assume 'simpler is better.'" },
      { type: "quote", text: "Showing users their data — even data they didn't ask for — increases task completion rates. Transparency is a conversion tool." },
      { type: "paragraph", text: "The highest-impact change across all eight products was a single addition: a persistent, visible 'Why do we need this?' link next to every data input field. Average KYC abandonment dropped 34% across the board." },
    ],
  },
  {
    slug: "monolith-to-microservices-pragmatists-guide",
    title: "From Monolith to Microservices: A Pragmatist's Guide",
    subtitle: "When decomposition helps, when it hurts, and how to tell the difference.",
    tags: ["Architecture", "Engineering", "System Design"],
    sections: [
      { type: "paragraph", text: "Microservices are the answer to a specific question: 'How do we scale team autonomy and deployment independence for a system that has genuinely outgrown a single codebase?' If that's not your question, microservices are not your answer." },
      { type: "heading", text: "When Monoliths Are Correct" },
      { type: "paragraph", text: "A well-structured monolith with clear module boundaries, a disciplined data layer, and a CI/CD pipeline that deploys in under 10 minutes is genuinely competitive with a microservices architecture — and dramatically simpler to operate, debug, and evolve." },
      { type: "list", items: ["Team size under 15 engineers: organisational overhead of service ownership is not worth it.", "Domain not yet understood: decomposing too early freezes incorrect boundaries in distributed contracts that are expensive to undo.", "No dedicated platform/infra capability: microservices require operational maturity that most product teams underestimate by 10x."] },
      { type: "quote", text: "The microservices you build in year one will be the monolith you're decomposing in year three — because you didn't understand the domain yet." },
      { type: "heading", text: "When Decomposition Is the Right Move" },
      { type: "paragraph", text: "The trigger for decomposition isn't scale — it's organisational friction. When two teams are blocked by each other's deployments, when the same module is the critical path for six different features, when testing has become so slow that developers avoid it — that's when service extraction pays off." },
      { type: "heading", text: "A Migration Pattern That Works" },
      { type: "list", items: ["Strangle Fig pattern: route a specific traffic type to a new service while the monolith still handles everything else.", "Domain-first decomposition: extract by business capability, never by technical layer.", "Shared-nothing data: two services that share a database are one service.", "Event-sourced boundaries: use events, not direct calls, for cross-service communication."] },
    ],
  },
  {
    slug: "prompt-engineering-is-not-enough",
    title: "Prompt Engineering Is Not Enough",
    subtitle: "Why LLM reliability in production requires more than clever system prompts.",
    tags: ["AI", "LLMOps", "Engineering"],
    sections: [
      { type: "paragraph", text: "Prompt engineering became a job title before it became a discipline. The result: a generation of LLM-powered features held together by increasingly complex system prompts, with no eval harness, no regression suite, and no clear owner when the model provider pushes an update and everything breaks." },
      { type: "heading", text: "The Prompt-as-Code Fallacy" },
      { type: "paragraph", text: "Teams treat prompts as configuration — static strings that live in a .env file and get changed by whoever last Slacked about the AI being 'weird today.' This is the wrong mental model. Prompts are code. They need version control, peer review, staged rollouts, and automated testing." },
      { type: "quote", text: "When your prompt changes and user satisfaction drops 12%, do you know within an hour? Most teams find out in a quarterly review — if at all." },
      { type: "heading", text: "What Production LLM Systems Actually Need" },
      { type: "list", items: ["An eval harness: a curated set of inputs and expected outputs that run on every prompt change and every model version update.", "Prompt versioning: every change tracked, dated, and attributable. Rollback in under 5 minutes.", "Output validation layer: LLM outputs are not trusted inputs. Parse, validate, and sanitise before any downstream system consumes them.", "Observability: token counts, latency, output length distribution, and user feedback signals — all logged, all alertable.", "Fallback strategy: what happens when the model returns something unparseable? Your system should degrade gracefully, not throw a 500."] },
      { type: "heading", text: "RAG Is Not a Silver Bullet" },
      { type: "paragraph", text: "Retrieval-Augmented Generation solves the stale-knowledge problem but introduces retrieval quality as a new failure mode. We've rebuilt seven RAG pipelines for clients who found their initial implementation returning confidently wrong answers." },
    ],
  },
  {
    slug: "90-day-digital-transformation-playbook",
    title: "The 90-Day Digital Transformation Playbook",
    subtitle: "A structured approach to moving fast without creating new legacy debt.",
    tags: ["Strategy", "Transformation", "Process"],
    sections: [
      { type: "paragraph", text: "Digital transformation projects fail for predictable reasons: scope creep disguised as ambition, technology decisions made before problem understanding, and organisational change managed as an afterthought. After 150+ projects, we've distilled a repeatable 90-day pattern that avoids all three." },
      { type: "heading", text: "Days 1–30: Understand Before You Build" },
      { type: "paragraph", text: "The most valuable thing you can do in the first month is resist the urge to ship. Map every process you intend to transform. Interview the people who actually do the work — not their managers. Document the workarounds. The workarounds are the real system design." },
      { type: "list", items: ["Stakeholder interviews (minimum 12, across all levels touching the process)", "Current-state process mapping with time-on-task measurement", "Pain point prioritisation matrix: impact vs. frequency vs. feasibility", "Success metric definition with baseline measurement"] },
      { type: "heading", text: "Days 31–60: Build the Smallest Valuable Thing" },
      { type: "paragraph", text: "By day 31 you should have a clear hypothesis: 'If we do X, metric Y will improve by Z.' Build the minimum system that tests that hypothesis." },
      { type: "quote", text: "Transformation doesn't happen at launch. It happens at adoption. The gap between the two is always underestimated." },
      { type: "heading", text: "Days 61–90: Validate, Iterate, Expand" },
      { type: "paragraph", text: "By day 60 you have real production data. Now you make the first genuine decision: double down, pivot, or stop. Most projects should do some combination of all three." },
      { type: "paragraph", text: "Our 90-day engagements are fixed-scope, fixed-price, with a defined exit condition. At day 90 you own the system, the documentation, and the institutional knowledge." },
    ],
  },
];

// ─── Post Detail ──────────────────────────────────────────────────────────────

function PostDetail({
  post,
  content,
  onBack,
  theme,
}: {
  post: { title: string; img: string; tag: string; date: string };
  content: PostContent;
  onBack: () => void;
  theme: "light" | "dark";
}) {
  const p = insightsPalette(theme);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const headings = content.sections
    .filter((s) => s.type === "heading" && s.text)
    .map((s) => ({
      text: s.text!,
      id: s.text!.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

  return (
    <div style={{ background: p.bg, minHeight: "100vh" }}>
      <div style={{ background: p.cardBg, borderBottom: `1px solid ${p.line}`, padding: "0.8rem 1.5rem", position: "sticky", top: 0, zIndex: 40 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", fontFamily: "var(--font-mono, ui-monospace, monospace)", color: p.inkFainter }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: p.inkFaint, fontSize: "0.72rem", fontFamily: "inherit", padding: 0, transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = p.accent)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = p.inkFaint)}>
            Insights
          </button>
          <span style={{ color: p.inkFainter }}>/</span>
          <span style={{ color: p.inkFaint }}>{post.tag}</span>
          <span style={{ color: p.inkFainter }}>/</span>
          <span style={{ color: p.inkDim, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "400px" }}>{content.title}</span>
        </div>
      </div>

      <div className="post-page-layout" style={{ maxWidth: "1100px", margin: "0 auto", padding: "3.5rem 1.5rem 8rem", display: "grid", gridTemplateColumns: "1fr 240px", gap: "4rem", alignItems: "start" }}>
        <article style={{ minWidth: 0 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
            {content.tags.map((tag) => (
              <span key={tag} className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.2em", fontWeight: 600, color: p.accent, background: p.tagBg, padding: "0.3rem 0.7rem", borderRadius: "4px", border: `1px solid ${p.tagBorder}`, textTransform: "uppercase" }}>{tag}</span>
            ))}
          </div>
          <h1 className="font-display" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.03em", color: p.ink, marginBottom: "1rem" }}>{content.title}</h1>
          <p style={{ fontSize: "15px", color: p.inkDim, lineHeight: 1.75, marginBottom: "2rem" }}>{content.subtitle}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", paddingBottom: "2rem", marginBottom: "2.5rem", borderBottom: `1px solid ${p.line}` }}>
            <span className="font-mono" style={{ fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.accent, fontWeight: 600 }}>{post.tag}</span>
            <span style={{ color: p.inkFainter, fontSize: "0.7rem" }}>·</span>
            <span className="font-mono" style={{ fontSize: "0.68rem", color: p.inkFaint, letterSpacing: "0.1em" }}>{post.date}</span>
          </div>
          <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: "10px", overflow: "hidden", marginBottom: "3rem", border: `1px solid ${p.line}` }}>
            <img src={post.img} alt={content.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: theme === "light" ? "none" : "saturate(0.85) brightness(0.9)" }} />
          </div>
          {content.sections.map((section, i) => {
            if (section.type === "divider") return <hr key={i} style={{ border: "none", borderTop: `1px solid ${p.line}`, margin: "2.5rem 0" }} />;
            if (section.type === "heading") {
              const id = section.text!.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return <h2 key={i} id={id} className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, color: p.ink, marginTop: "2.75rem", marginBottom: "0.9rem", letterSpacing: "-0.02em", scrollMarginTop: "5rem" }}>{section.text}</h2>;
            }
            if (section.type === "paragraph") return <p key={i} style={{ fontSize: "1rem", lineHeight: 1.88, color: p.inkDim, marginBottom: "1.35rem" }}>{section.text}</p>;
            if (section.type === "quote") return (
              <blockquote key={i} style={{ margin: "2.25rem 0", padding: "1.25rem 1.75rem", borderLeft: `3px solid ${p.accent}`, background: p.quoteBg, borderRadius: "0 8px 8px 0" }}>
                <p className="font-display" style={{ fontSize: "1.08rem", lineHeight: 1.75, color: p.ink, opacity: 0.85, fontStyle: "italic", margin: 0 }}>"{section.text}"</p>
              </blockquote>
            );
            if (section.type === "list" && section.items) return (
              <ul key={i} style={{ listStyle: "none", padding: 0, margin: "1.25rem 0 1.75rem", display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                {section.items.map((item, j) => (
                  <li key={j} style={{ display: "flex", gap: "0.85rem", fontSize: "0.975rem", lineHeight: 1.78, color: p.inkDim }}>
                    <span style={{ flexShrink: 0, marginTop: "0.68rem", width: "5px", height: "5px", borderRadius: "50%", background: p.accent }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
            return null;
          })}
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${p.line}` }}>
            <button onClick={onBack} className="font-mono" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: p.accent, fontWeight: 700, padding: 0 }}>← All articles</button>
          </div>
        </article>

        <aside className="post-sidebar" style={{ position: "sticky", top: "4.5rem" }}>
          {headings.length > 0 && (
            <div style={{ padding: "1.4rem", border: `1px solid ${p.line}`, borderRadius: "10px", background: p.cardBg }}>
              <p className="font-mono" style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700, color: p.inkFainter, margin: "0 0 1rem 0" }}>On this page</p>
              <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {headings.map((h, i) => (
                  <li key={i}>
                    <button onClick={() => document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      style={{ fontSize: "0.78rem", lineHeight: 1.5, color: p.inkFaint, textDecoration: "none", display: "block", transition: "color 0.15s", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left", width: "100%" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = p.accent)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = p.inkFaint)}>
                      {i + 1}. {h.text}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .post-page-layout { grid-template-columns: 1fr !important; }
          .post-sidebar { display: none !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Corner-crosshair frame — the decorative element from the reference (image 2):
// a rectangle traced by two vertical + two horizontal lines, with a small "+"
// glyph at each of the four intersections. Purely decorative, themed via
// currentColor so it reads correctly on both light and dark.
// ─────────────────────────────────────────────────────────────────────────────

function CrosshairFrame({ color }: { color: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: "clamp(90px, 12vh, 140px) clamp(6%, 12vw, 220px)",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <div style={{ position: "absolute", inset: 0, border: `1px solid ${color}` }} />
      {[
        { top: 0, left: 0 },
        { top: 0, right: 0 },
        { bottom: 0, left: 0 },
        { bottom: 0, right: 0 },
      ].map((pos, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            width: "13px",
            height: "13px",
            transform: "translate(-50%, -50%)",
            ...pos,
          }}
        >
          <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: color, transform: "translateY(-50%)" }} />
          <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: color, transform: "translateX(-50%)" }} />
        </span>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function InsightsPage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();
  const p = insightsPalette(theme);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleOpen = useCallback((index: number) => {
    setActiveIndex(index);
    window.history.pushState({ __insightPost: index }, "");
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleBack = useCallback(() => {
    setActiveIndex(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      setActiveIndex((prev) => {
        if (prev !== null) {
          window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
          return null;
        }
        return prev;
      });
    };
    if (activeIndex !== null) {
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    }
  }, [activeIndex]);

  const nowLabel = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

  if (activeIndex !== null && POST_CONTENT[activeIndex]) {
    return (
      <main style={{ background: p.bg }}>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <PostDetail post={POSTS[activeIndex]} content={POST_CONTENT[activeIndex]} onBack={handleBack} theme={theme} />
        <Footer theme={theme} />
      </main>
    );
  }

  return (
    <main style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* VIDEO / CROSSHAIR HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: p.bg }}>
        {theme === "dark" && (
          <video
            ref={videoRef}
            autoPlay loop muted playsInline
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: p.videoOpacity, filter: "saturate(0.35) brightness(0.45)" }}
          >
             
          </video>
        )}

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: theme === "light"
          ? "linear-gradient(180deg,rgba(250,249,246,0.1) 0%,rgba(250,249,246,0) 35%,rgba(250,249,246,0.5) 80%,var(--faf9f6,#faf9f6) 100%)"
          : "linear-gradient(180deg,rgba(10,10,10,0.25) 0%,rgba(10,10,10,0.05) 35%,rgba(10,10,10,0.8) 80%,#0a0a0a 100%)", zIndex: 1 }} />
        

 

        {/* Hero text — centered */}
        <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 clamp(24px, 6vw, 80px)", width: "100%" }}>

          <p className="font-mono" style={{
            fontSize: "0.65rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: p.inkFaint,
            marginBottom: "2rem",
            fontWeight: 400,
          }}>
            [ Insights · Field Notes ]
          </p>

          <h1 className="font-display" style={{
            margin: 0,
            fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
          }}>
            <span style={{ fontWeight: 700, color: p.ink }}>
              Ideas worth{" "}
            </span>
            <span style={{ fontWeight: 400, color: p.accent, fontStyle: "italic" }}>
              building on.
            </span>
          </h1>

          <div style={{
            height: "1px",
            background: `linear-gradient(to right, transparent, ${p.accent}66, transparent)`,
            maxWidth: "420px",
            margin: "2.5rem auto",
          }} />

          <p style={{
            fontSize: "15px",
            color: p.inkDim,
            lineHeight: 1.85,
            maxWidth: "520px",
            margin: "0 auto",
            fontWeight: 400,
          }}>
            Perspectives on AI, transformation, and the craft of shipping software — written by the team behind 150+ projects.
          </p>

          {/* Stat row, like the reference screenshot */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.4rem", marginTop: "2.75rem" }}>
            <span className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.05em", color: p.inkDim }}>
              <strong style={{ color: p.ink, fontWeight: 700 }}>{POST_CONTENT.length}</strong> Articles
            </span>
            <span style={{ width: "1px", height: "12px", background: p.line }} />
            <span className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.05em", color: p.inkDim }}>
              <strong style={{ color: p.ink, fontWeight: 700 }}>12</strong> Contributors
            </span>
            <span style={{ width: "1px", height: "12px", background: p.line }} />
            <span className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.05em", color: p.inkDim }}>
              {nowLabel}
            </span>
          </div>
        </div>

        {/* Curated-by / scroll indicators, like the reference screenshot */}
        <span className="font-mono" style={{ position: "absolute", left: "clamp(20px,4vw,48px)", bottom: "28px", zIndex: 3, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.inkFainter }}>
          Curated by Jarvis Technolabs
        </span>
        <span className="font-mono" style={{ position: "absolute", right: "clamp(20px,4vw,48px)", bottom: "28px", zIndex: 3, fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.inkFainter, display: "flex", alignItems: "center", gap: "6px" }}>
          ↓ Scroll
        </span>
      </section>

      {/* POSTS GRID */}
      <section style={{ background: p.bg, borderTop: `1px solid ${p.lineSoft}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "6rem 1.5rem 8rem" }}>

          <div className="reveal" style={{ marginBottom: "3.5rem", display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem" }}>
            <div>
              <p className="font-mono" style={{ fontSize: "0.62rem", letterSpacing: "0.32em", textTransform: "uppercase", marginBottom: "0.9rem", color: p.inkFainter }}>LATEST</p>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.035em", color: p.ink, lineHeight: 1.08 }}>From the studio.</h2>
            </div>
            <Link
              to="/contact"
              className="font-mono"
              style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", border: `1px solid ${p.line}`, borderRadius: "6px", padding: "0.72rem 1.2rem", color: p.inkDim, textDecoration: "none", transition: "color 0.2s, border-color 0.2s" }}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = p.accent; el.style.borderColor = p.accent; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.color = p.inkDim; el.style.borderColor = p.line; }}
            >
              Subscribe →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1.5rem" }}>
            {POSTS.map((post, index) => (
              <div
                key={post.title}
                className="reveal"
                onClick={() => handleOpen(index)}
                style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${p.line}`, background: p.cardBg, cursor: "pointer", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, box-shadow 0.3s ease", animationDelay: `${index * 90}ms` }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-4px)"; el.style.borderColor = `${p.accent}59`; el.style.boxShadow = theme === "light" ? "0 16px 40px rgba(0,0,0,0.1)" : "0 16px 48px rgba(0,0,0,0.5)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = p.line; el.style.boxShadow = "none"; }}
              >
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <img src={post.img} alt={post.title} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: theme === "light" ? "none" : "saturate(0.8) brightness(0.8)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1), filter 0.4s ease" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1.06)"; if (theme === "dark") el.style.filter = "saturate(1) brightness(0.9)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "scale(1)"; if (theme === "dark") el.style.filter = "saturate(0.8) brightness(0.8)"; }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: theme === "light" ? "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 55%)" : "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 55%)" }} />
                </div>
                <div style={{ padding: "1.5rem 1.75rem 1.75rem" }}>
                  <div className="font-mono" style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.85rem", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
                    <span style={{ color: p.accent }}>{post.tag}</span>
                    <span style={{ color: p.inkFainter }}>·</span>
                    <span style={{ color: p.inkFaint }}>{post.date}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", fontWeight: 700, lineHeight: 1.28, color: p.ink, marginBottom: "0.6rem", letterSpacing: "-0.015em" }}>{post.title}</h3>
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.68, color: p.inkFaint, marginBottom: "1.1rem" }}>{post.excerpt}</p>
                  <div className="font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: p.accent, display: "flex", alignItems: "center", gap: "6px" }}>
                    Read note <span style={{ fontSize: "13px" }}>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="STAY IN THE LOOP"
        title={<>Field notes, <em style={{ color: p.accent, fontStyle: "normal", fontWeight: 300 }}>straight to your inbox.</em></>}
        description="One thoughtful note a month on AI, modernisation and shipping. No fluff, no spam."
        primaryLabel="Subscribe →"
        secondaryLabel="Browse services"
      />
      <Footer theme={theme} />
    </main>
  );
}