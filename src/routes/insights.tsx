import { useEffect, useRef, useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { POSTS } from "@/data/insights";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Insights - Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Field notes on AI, digital transformation and product engineering - from the team shipping for D2C brands and enterprises.",
      },
      { property: "og:title", content: "Insights - Jarvis Technolabs" },
      {
        property: "og:description",
        content:
          "Field notes on AI, digital transformation and product engineering.",
      },
    ],
  }),
});

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Content ─────────────────────────────────────────────────────────────────

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

// ─── Post Detail (full white page) ───────────────────────────────────────────

function PostDetail({
  post,
  content,
  onBack,
}: {
  post: { title: string; img: string; tag: string; date: string };
  content: PostContent;
  onBack: () => void;
}) {
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
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e8e8e8",
          padding: "0.8rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.72rem",
            color: "#aaa",
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#888",
              fontSize: "0.72rem",
              padding: 0,
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c2692a")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#888")}
          >
            Insights
          </button>
          <span style={{ color: "#ccc" }}>/</span>
          <span style={{ color: "#aaa" }}>{post.tag}</span>
          <span style={{ color: "#ccc" }}>/</span>
          <span
            style={{
              color: "#444",
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "400px",
            }}
          >
            {content.title}
          </span>
        </div>
      </div>

      {/* Main layout */}
      <div
        className="post-page-layout"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 1.5rem 7rem",
          display: "grid",
          gridTemplateColumns: "1fr 260px",
          gap: "4rem",
          alignItems: "start",
          background: "#ffffff",
        }}
      >
        {/* Article */}
        <article style={{ minWidth: 0, background: "#ffffff" }}>
          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
            {content.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                  color: "#555",
                  background: "#f2f2f2",
                  padding: "0.28rem 0.65rem",
                  borderRadius: "0.25rem",
                  border: "1px solid #e0e0e0",
                  textTransform: "capitalize",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display, Georgia, serif)",
              fontSize: "clamp(1.9rem, 4.5vw, 2.8rem)",
              fontWeight: 400,
              lineHeight: 1.18,
              letterSpacing: "-0.03em",
              color: "#0f0f0f",
              marginBottom: "1rem",
            }}
          >
            {content.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.05rem",
              color: "#555",
              lineHeight: 1.65,
              marginBottom: "1.75rem",
            }}
          >
            {content.subtitle}
          </p>

          {/* Author row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              paddingBottom: "2rem",
              marginBottom: "2.5rem",
              borderBottom: "1px solid #ebebeb",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c2692a, #8b3a10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              J
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600, color: "#111" }}>
                Jarvis Team
              </p>
              <p style={{ margin: 0, fontSize: "0.7rem", color: "#999", marginTop: "0.1rem" }}>
                {post.date}
              </p>
            </div>
          </div>

          {/* Hero image */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              borderRadius: "0.75rem",
              overflow: "hidden",
              marginBottom: "2.75rem",
              border: "1px solid #ebebeb",
            }}
          >
            <img
              src={post.img}
              alt={content.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Body */}
          {content.sections.map((section, i) => {
            if (section.type === "divider") {
              return (
                <hr key={i} style={{ border: "none", borderTop: "1px solid #ebebeb", margin: "2.5rem 0" }} />
              );
            }
            if (section.type === "heading") {
              const id = section.text!.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <h2
                  key={i}
                  id={id}
                  style={{
                    fontFamily: "var(--font-display, Georgia, serif)",
                    fontSize: "1.35rem",
                    fontWeight: 400,
                    color: "#111",
                    marginTop: "2.75rem",
                    marginBottom: "0.9rem",
                    letterSpacing: "-0.015em",
                    scrollMarginTop: "5rem",
                  }}
                >
                  {section.text}
                </h2>
              );
            }
            if (section.type === "paragraph") {
              return (
                <p
                  key={i}
                  style={{
                    fontSize: "1rem",
                    lineHeight: 1.85,
                    color: "#333",
                    marginBottom: "1.35rem",
                  }}
                >
                  {section.text}
                </p>
              );
            }
            if (section.type === "quote") {
              return (
                <blockquote
                  key={i}
                  style={{
                    margin: "2.25rem 0",
                    padding: "1.25rem 1.75rem",
                    borderLeft: "3px solid #c2692a",
                    background: "rgba(194,105,42,0.04)",
                    borderRadius: "0 0.5rem 0.5rem 0",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display, Georgia, serif)",
                      fontSize: "1.1rem",
                      lineHeight: 1.75,
                      color: "#222",
                      fontStyle: "italic",
                      margin: 0,
                    }}
                  >
                    "{section.text}"
                  </p>
                </blockquote>
              );
            }
            if (section.type === "list" && section.items) {
              return (
                <ul
                  key={i}
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "1.25rem 0 1.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.9rem",
                  }}
                >
                  {section.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        gap: "0.85rem",
                        fontSize: "0.975rem",
                        lineHeight: 1.75,
                        color: "#333",
                      }}
                    >
                      <span
                        style={{
                          flexShrink: 0,
                          marginTop: "0.65rem",
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#c2692a",
                        }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}

          {/* Back */}
          <div
            style={{
              marginTop: "4rem",
              paddingTop: "2rem",
              borderTop: "1px solid #ebebeb",
            }}
          >
            <button
              onClick={onBack}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c2692a",
                fontWeight: 600,
                padding: 0,
              }}
            >
              ← All articles
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="post-sidebar" style={{ position: "sticky", top: "4.5rem" }}>
          {/* TOC */}
          {headings.length > 0 && (
            <div
              style={{
                padding: "1.4rem",
                border: "1px solid #e8e8e8",
                borderRadius: "0.75rem",
                marginBottom: "1.25rem",
                background: "#fafafa",
              }}
            >
              <p
                style={{
                  fontSize: "0.58rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: "#aaa",
                  marginBottom: "0.85rem",
                  margin: "0 0 0.85rem 0",
                }}
              >
                On this page
              </p>
              <ol
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {headings.map((h, i) => (
                  <li key={i}>
                    <a
                      href={`#${h.id}`}
                      style={{
                        fontSize: "0.78rem",
                        lineHeight: 1.5,
                        color: "#555",
                        textDecoration: "none",
                        display: "block",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#c2692a")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#555")}
                    >
                      {i + 1}. {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Author card */}
          <div
            style={{
              padding: "1.4rem",
              border: "1px solid #e8e8e8",
              borderRadius: "0.75rem",
              background: "#fafafa",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c2692a, #8b3a10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "0.85rem",
              }}
            >
              J
            </div>
            <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 600, color: "#111" }}>
              Jarvis Team
            </p>
            <p
              style={{
                margin: "0.2rem 0 0.75rem",
                fontSize: "0.7rem",
                color: "#999",
              }}
            >
              Jarvis Technolabs
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.78rem",
                lineHeight: 1.6,
                color: "#666",
              }}
            >
              The team behind 150+ AI and commerce projects for D2C brands and enterprises.
            </p>
          </div>
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

// ─── Page ────────────────────────────────────────────────────────────────────

function InsightsPage() {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const handleOpen = useCallback((index: number) => {
    setActiveIndex(index);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleBack = useCallback(() => {
    setActiveIndex(null);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // ── POST DETAIL PAGE ──
  if (activeIndex !== null && POST_CONTENT[activeIndex]) {
    return (
      <main style={{ background: "#ffffff" }}>
        <Nav />
        <PostDetail
          post={POSTS[activeIndex]}
          content={POST_CONTENT[activeIndex]}
          onBack={handleBack}
        />
        <Footer />
      </main>
    );
  }

  // ── LIST PAGE ──
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* VIDEO HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/Insights-v.mp4" type="video/mp4" />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.52)",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            color: "white",
            padding: "6rem 1.5rem",
            maxWidth: "56rem",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            [ INSIGHTS · FIELD NOTES ]
          </p>
          <h1 className="font-display text-5xl md:text-7xl tracking-tight leading-tight mb-6">
            Ideas worth{" "}
            <em className="text-shimmer not-italic font-light">building on.</em>
          </h1>
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "42rem",
              margin: "0 auto",
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Perspectives on AI, transformation, and the craft of shipping
            software — written by the team behind 150+ projects.
          </p>
        </div>
      </section>

      {/* POSTS GRID — original 3-column layout */}
      <section className="section-light border-t border-black/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-xs tracking-[0.3em] bracket-label mb-6 text-muted-foreground">
                LATEST
              </p>
              <h2 className="font-display text-4xl md:text-5xl tracking-tight">
                From the studio.
              </h2>
            </div>
            <Link
              to="/contact"
              className="text-[11px] tracking-[0.25em] uppercase border border-current/15 rounded-md px-5 py-3 hover:text-warm transition-colors"
            >
              Subscribe →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((p, index) => (
              <div
                key={p.title}
                onClick={() => handleOpen(index)}
                className="reveal group rounded-2xl overflow-hidden border border-black/10 bg-white hover:-translate-y-1 transition-transform duration-500 flash-card cursor-pointer"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase mb-4">
                    <span className="text-warm">{p.tag}</span>
                    <span className="text-black/30">·</span>
                    <span className="text-black/45">{p.date}</span>
                  </div>
                  <h3 className="font-display text-2xl leading-snug group-hover:text-warm transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.excerpt}
                  </p>
                  <div className="mt-5 text-[11px] tracking-[0.25em] uppercase text-warm">
                    Read note →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="STAY IN THE LOOP"
        title={
          <>
            Field notes,{" "}
            <em className="text-warm not-italic font-light">
              straight to your inbox.
            </em>
          </>
        }
        description="One thoughtful note a month on AI, modernisation and shipping. No fluff, no spam."
        primaryLabel="Subscribe →"
        secondaryLabel="Browse services"
      />
      <Footer />
    </main>
  );
}