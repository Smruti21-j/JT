import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useThemeInit } from "@/hooks/use-theme-init";
import dataAiImg from "@/assets/service-data-ai.jpg";
import digitalImg from "@/assets/service-digital.jpg";
import productImg from "@/assets/service-product.jpg";
import appImg from "@/assets/service-app.jpg";
import uiuxImg from "@/assets/service-uiux.jpg";
import consultingImg from "@/assets/service-consulting.jpg";
import growthImg from "@/assets/service-growth.jpg";
import managedImg from "@/assets/service-managed.jpg";
import { ScrollToTop } from "@/components/site/ScrollToTop";

/* ─────────────────────────────────────────────────────────────────────────
   DATA
   Each service = { slug, title, number, image, headline, intro, sections,
   whyItMatters, closing }.
   `sections` = array of { category, image, items: [{ title, hook, body }] }

   `section.image` matches the exact per-category image used for that same
   category's card on /services, so the detail page shows the picture the
   user actually clicked on — not a repeated hero image.
───────────────────────────────────────────────────────────────────────── */

type Item = { title: string; hook?: string; body: string };
type Section = { category: string; image?: string; items: Item[] };
type ServiceDetail = {
  slug: string;
  title: string;
  number: string;
  image: string;
  headline: { line1: string; line2: string };
  intro: string;
  sections: Section[];
  whyItMatters: string[];
  closing: { line1: string; line2: string; body: string };
};

/* Turns a category name like "Core Systems" into "core-systems" so it can
   be used both as a DOM id here and as a Link `hash` on the cards page. */
function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const SERVICES: ServiceDetail[] = [
  {
    slug: "artificial-intelligence",
    title: "Artificial Intelligence",
    number: "01",
    image: dataAiImg,
    headline: {
      line1: "The Part of AI",
      line2: "Nobody Shows You in the Demo",
    },
    intro:
      "Every flashy AI demo hides the same thing: the substrate underneath. Generative models, agents that act instead of just chat, intelligence tuned to your data, tools that quietly handle the grunt work - this is the engine room where the actual thinking happens. Everything else is just a UI on top of it.",
    sections: [
      {
        category: "Core Systems",
        image: "/AI1.png",
        items: [
          {
            title: "Generative AI",
            hook: "The output speed you can't hire for",
            body: "A team of ten can't out-produce what one well-tuned model generates before lunch. We build generative systems tuned to your brand's voice - so speed doesn't cost you quality control.",
          },
          {
            title: "LLM Substrates",
            hook: "Generic intelligence is a liability, not a feature",
            body: "Off-the-shelf models know the internet. They don't know your business. We fine-tune the language layer beneath every system we build until it understands your domain - not just English.",
          },
          {
            title: "Deep Learning",
            hook: "It catches what your team is too busy to see",
            body: "Pattern recognition at a scale no dashboard can replicate - trained on your real data, so problems get flagged before they become the thing everyone's scrambling to fix on a Friday.",
          },
        ],
      },
      {
        category: "Action Agents",
        image: "/AI2.png",
        items: [
          {
            title: "Smart AI Assistants",
            hook: "An assistant that finishes the task, not just describes it",
            body: "Most \"AI assistants\" summarize your problem back to you. Ours executes - booking, updating, resolving, reporting - while your team focuses on the decisions only humans should make.",
          },
          {
            title: "Autonomous Chatbots",
            hook: "The conversation that doesn't stall at \"let me transfer you\"",
            body: "Built to actually resolve, not just deflect. These agents handle context, memory, and multi-step requests - so customers stop hitting dead ends disguised as customer service.",
          },
        ],
      },
      {
        category: "Intelligence",
        image: "/AI3.png",
        items: [
          {
            title: "Model Fine-Tuning",
            hook: "Off-the-shelf accuracy has a ceiling. We remove it",
            body: "A base model gets you 70% of the way there. We close the gap - tuning on your real data until the system stops guessing and starts knowing.",
          },
          {
            title: "Natural Language Processing (NLP)",
            hook: "Language is messy. Your systems shouldn't be",
            body: "Contracts, tickets, transcripts, reviews - unstructured text most companies never fully use. We turn it into structured signal your business can actually act on.",
          },
          {
            title: "Sentiment & Context Analysis",
            hook: "Knowing what was said isn't the same as knowing what was meant",
            body: "We build systems that read tone, urgency, and intent - not just keywords - so the response your business gives actually matches the moment.",
          },
        ],
      },
      {
        category: "Tools",
        image: "/AI4.png",
        items: [
          {
            title: "Optical Intelligence (OCR)",
            hook: "Every scanned document is data you're not using yet",
            body: "Invoices, forms, IDs, handwritten notes - we turn paper-trapped information into searchable, usable data, without a human retyping a single field.",
          },
          {
            title: "Automated Performance Optimization",
            hook: "Systems that tune themselves while your team sleeps",
            body: "No more manual audits to catch what's slowing you down. These systems monitor, adjust, and optimize in real time - so performance improves quietly, continuously, without a ticket filed.",
          },
        ],
      },
    ],
    whyItMatters: [
      "Decisions that took a sprint now take seconds; powered by a core that reasons, not just recalls",
      "Requests that used to sit in a queue get resolved by agents that act, not just answer",
      "Unstructured data: documents, tickets, conversations - finally becomes something your business can act on, not just store",
      "Fewer people stuck doing work a model should've caught first, monitored first, or optimized first",
    ],
    closing: {
      line1: "Every Great System",
      line2: "Starts With Intelligence That Thinks - and Acts.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    number: "02",
    image: digitalImg,
    headline: {
      line1: "Your Legacy System",
      line2: "Is Costing You More Than You Think",
    },
    intro:
      "Every year you run on patched-together infrastructure, you're paying a tax nobody put on the invoice. We rebuild the core - so the data, the logic, and the outcomes belong to you again, not a vendor's roadmap.",
    sections: [
      {
        category: "Core Logic",
        image: "/DT1.png",
        items: [
          { title: "Enterprise Architecture", body: "Reference patterns and system design that scale without collapsing under their own weight." },
          { title: "Business Intelligence", body: "Decision-grade reporting built on data your teams can actually trust." },
        ],
      },
      {
        category: "Modernization",
        image: "/DT2.png",
        items: [
          { title: "Architecture Resurgence (App Modernization)", body: "Strangler-pattern rebuilds - no big-bang rewrites, no downtime gambles." },
        ],
      },
      {
        category: "Integration",
        image: "/DT3.png",
        items: [
          { title: "Sovereign System Integration", body: "ERP, CRM and commerce systems wired together reliably, on your terms." },
          { title: "Cloud & Hybrid Core", body: "Hybrid and multi-cloud connectivity that doesn't lock you into one vendor's roadmap." },
        ],
      },
      {
        category: "Experience",
        image: "/DT4.png",
        items: [
          { title: "Immersive Digital Experience", body: "Customer-facing surfaces engineered to perform, not just look good in a deck." },
          { title: "Enterprise Mobility", body: "Connected workflows that follow your team onto every device." },
        ],
      },
    ],
    whyItMatters: [
      "Systems that finally share one source of truth instead of five conflicting ones",
      "Release cycles measured in days, not quarters",
      "Infrastructure costs that reflect what you actually use",
      "A core your team can extend, instead of one only the original vendor understands",
    ],
    closing: {
      line1: "Modernization Isn't a Rewrite.",
      line2: "It's Taking Your Core Back.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "product-engineering",
    title: "Product Engineering",
    number: "03",
    image: productImg,
    headline: {
      line1: "\"Impossible\" Is Just",
      line2: "A Timeline We Haven't Quoted Yet",
    },
    intro:
      "Every product here started as a \"can we actually build this?\" conversation. We engineer for the scale you haven't hit yet, so growth doesn't become the thing that finally breaks you.",
    sections: [
      {
        category: "Design Forge",
        image: "/PE1.png",
        items: [
          { title: "Product Assessment & Design", body: "Vision, scope and technical feasibility, validated before a line of code ships." },
          { title: "Application Re-Engineering", body: "Modernizing what exists without losing the velocity of what's next." },
        ],
      },
      {
        category: "Scale Logic",
        image: "/PE2.png",
        items: [
          { title: "Platform Engineering", body: "Internal developer platforms that let your team ship faster without breaking things." },
          { title: "Custom High-Stakes Development", body: "Built for the load, traffic and edge cases you haven't hit yet - but will." },
        ],
      },
      {
        category: "Velocity",
        image: "/PE3.png",
        items: [
          { title: "Battle-Tested DevOps", body: "CI/CD, infrastructure-as-code and progressive delivery that doesn't break at 2am." },
          { title: "Precision Quality Assurance", body: "Automation pyramids that scale with the product instead of slowing it down." },
        ],
      },
      {
        category: "Resource",
        image: "/PE4.png",
        items: [
          { title: "Elite Team Augmentation", body: "Senior engineers embedded in your team - not a black-box outsourced pod." },
        ],
      },
    ],
    whyItMatters: [
      "Products engineered for the scale you'll hit, not just the scale you're at",
      "Faster time-to-market without the technical debt bill later",
      "Higher engineering throughput from day one",
      "A lower defect-escape rate that keeps customer trust intact",
    ],
    closing: {
      line1: "Great Products Aren't Built Twice.",
      line2: "We Build Them Right the First Time.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "application-transformation",
    title: "Application Transformation",
    number: "04",
    image: appImg,
    headline: {
      line1: "Your Customers",
      line2: "Live in Real Time. Does Your App?",
    },
    intro:
      "Batch processing was fine when the world moved slower. It doesn't anymore. We build composable systems that operate at the speed your business actually competes at - now, not next quarter's release.",
    sections: [
      {
        category: "Web Logic",
        image: "/AT1.png",
        items: [
          { title: "Responsive Web Ecosystems", body: "Modern web stacks, edge-rendered for speed on every connection." },
          { title: "Progressive Web Apps (PWA)", body: "App-grade experience, no App Store approval queue required." },
        ],
      },
      {
        category: "Mobile Core",
        image: "/AT2.png",
        items: [
          { title: "Mobile App Development", body: "Native iOS & Android builds with the deep integrations your product actually needs." },
          { title: "Cross-Platform Architectures", body: "One codebase, native performance, half the maintenance overhead." },
        ],
      },
      {
        category: "Foundation",
        image: "/AT3.png",
        items: [
          { title: "API Substrates & Integration", body: "Typed, documented, monitored - APIs that don't become the next bottleneck." },
          { title: "Scalable Back-End", body: "Services built for real-time load, not just the demo traffic." },
        ],
      },
    ],
    whyItMatters: [
      "Applications that respond in real time, not on the next batch cycle",
      "Fewer dropped sessions from slow, brittle integrations",
      "A back-end that scales with demand instead of buckling under it",
      "One codebase to maintain instead of three divergent platform builds",
    ],
    closing: {
      line1: "Speed Isn't a Feature.",
      line2: "It's the Whole Product Now.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    number: "05",
    image: uiuxImg,
    headline: {
      line1: "Great Design",
      line2: "Disappears. That's the Point",
    },
    intro:
      "The best interface is the one your users never notice - because they already knew what they needed. We design the human-AI layer that makes complexity invisible, and your brand feel inevitable.",
    sections: [
      {
        category: "Research",
        image: "/UI1.png",
        items: [
          { title: "Cognitive UX Research", body: "Real users, real hypotheses - not assumptions dressed up as insight." },
          { title: "Usability Consulting", body: "Audits and heuristics that point directly at what's costing you conversions." },
        ],
      },
      {
        category: "Craft",
        image: "/UI2.png",
        items: [
          { title: "Precision UX Design", body: "Information architecture and flows built around how people actually think." },
          { title: "Intuitive UI Craftsmanship", body: "Component systems and motion that feel effortless, never accidental." },
        ],
      },
      {
        category: "Strategy",
        image: "/UI4.png",
        items: [
          { title: "User Experience Strategy", body: "A design direction tied to business outcomes, not just aesthetics." },
          { title: "Specialized Design Squads", body: "Embedded designers who ship inside your team's actual cadence." },
        ],
      },
    ],
    whyItMatters: [
      "Higher conversion from interfaces built around real user behavior",
      "Lower task time across the flows that matter most",
      "Brand consistency that holds up across every surface and platform",
      "Fewer support tickets caused by confusing, unintuitive design",
    ],
    closing: {
      line1: "Design That Works",
      line2: "Is Design Nobody Talks About.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "consulting",
    title: "Consulting",
    number: "06",
    image: consultingImg,
    headline: {
      line1: "Everyone Has Opinions",
      line2: "We Bring the Blueprint",
    },
    intro:
      "Complexity isn't your problem - confusion dressed up as strategy is. We turn technical noise into decisions you can actually defend in the boardroom, backed by logic instead of vibes.",
    sections: [
      {
        category: "Strategic Core",
        image: "/C1.png",
        items: [
          { title: "Business & Stakeholder Value", body: "Aligning goals across functions before a single roadmap gets drawn." },
          { title: "Technology Strategy", body: "Stack decisions, build-vs-buy calls, and the talent plan to support them." },
        ],
      },
      {
        category: "Plan Forge",
        image: "/C2.png",
        items: [
          { title: "Product Strategy", body: "Vision, bets and roadmap sequencing that survive contact with reality." },
          { title: "Sovereign Data Strategy", body: "From single source of truth to genuine AI-readiness." },
        ],
      },
      {
        category: "Milestones",
        image: "/C3.png",
        items: [
          { title: "Impact-Driven Roadmapping", body: "Sequenced, resourced plans - not a slide that gets shelved after the kickoff." },
          { title: "CX Strategy", body: "Journey maps that actually make it into production, not just a workshop." },
        ],
      },
    ],
    whyItMatters: [
      "Decisions made faster, with trade-offs everyone actually understands",
      "Resource plans that match the ambition of the roadmap",
      "Teams aligned on the same problem statement, not five different ones",
      "A strategy that survives the first hard quarter, not just the pitch deck",
    ],
    closing: {
      line1: "Strategy Without Execution",
      line2: "Is Just an Expensive Opinion.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "performance-growth",
    title: "Performance & Growth",
    number: "07",
    image: growthImg,
    headline: {
      line1: "Vanity Metrics",
      line2: "Don't Pay Your Bills.",
    },
    intro:
      "Impressions, likes, \"engagement\" - none of it means anything if it doesn't move a number that matters. We build the optimization loop that turns attention into outcomes you can actually bank.",
    sections: [
      {
        category: "Engines",
        image: "/PG1.png",
        items: [
          { title: "Experience & Conversion Optimization", body: "A/B and multivariate testing run at a cadence that actually compounds." },
          { title: "1:1 Personalization", body: "Audience-aware experiences that adapt instead of broadcasting the same page to everyone." },
        ],
      },
      {
        category: "Intelligence",
        image: "/PG2.png",
        items: [
          { title: "Real-Time Tracking & Analytics", body: "Clean event taxonomies your team can trust, not fight." },
          { title: "SEO (GEO & AIO)", body: "Technical, content and authority strategy built for how search actually works now." },
        ],
      },
      {
        category: "Clarity",
        image: "/PG3.png",
        items: [
          { title: "Intelligent BI Consultancy", body: "Reporting built for decisions, not dashboards nobody opens." },
          { title: "Impact Dashboards", body: "The numbers that matter, visible to the people who can act on them." },
        ],
      },
    ],
    whyItMatters: [
      "Conversion gains that compound instead of resetting every quarter",
      "Lower acquisition costs from experiences tailored to real intent",
      "Analytics your team trusts enough to actually act on",
      "Growth decisions backed by data, not internal debate",
    ],
    closing: {
      line1: "Growth Isn't Luck.",
      line2: "It's a Loop You Run on Purpose.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
  {
    slug: "autonomous-ops",
    title: "Autonomous Ops",
    number: "08",
    image: managedImg,
    headline: {
      line1: "The Best Infrastructure",
      line2: "Is the One You Forget Exists.",
    },
    intro:
      "If your team is thinking about uptime, something already went wrong. We build the self-healing backbone that watches, patches, and defends itself - so \"IT emergency\" stops being a phrase you hear.",
    sections: [
      {
        category: "Reliability",
        image: "/AO1.png",
        items: [
          { title: "Intelligent IT Ops & Support", body: "Systems monitored and maintained before issues become incidents." },
          { title: "24/7 Application Support", body: "Coverage that doesn't depend on someone being awake at 3am." },
        ],
      },
      {
        category: "Security",
        image: "/AO2.png",
        items: [
          { title: "Preemptive Cybersecurity", body: "Hardening built in from the start, not bolted on after an incident." },
          { title: "Compliance & Risk Governance", body: "Audits and controls that hold up when it matters most." },
        ],
      },
      {
        category: "Evolution",
        image: "/AO3.png",
        items: [
          { title: "Architecture Resurgence", body: "Infrastructure that evolves continuously instead of decaying quietly." },
          { title: "Sovereign Cloud Hosting", body: "Hosting on your terms, optimized for cost and performance." },
        ],
      },
      {
        category: "Strategic Support",
        image: "/AO4.png",
        items: [
          { title: "Professional Services", body: "Senior expertise on call when you need it, not locked behind a retainer you don't use." },
          { title: "Lifecycle DevOps", body: "Pipelines and infrastructure that keep pace with the product, not slow it down." },
        ],
      },
    ],
    whyItMatters: [
      "Higher uptime that your customers never have to notice",
      "Lower mean-time-to-resolution when something does go wrong",
      "Predictable infrastructure spend, no year-end surprises",
      "A security posture that's proactive, not reactive to the last incident",
    ],
    closing: {
      line1: "The Infrastructure Nobody Talks About",
      line2: "Is the One That Never Breaks.",
      body: "Let's talk about what that looks like inside your business - not a generic pitch, an honest conversation about what's actually possible with your data, your stack, your timeline.",
    },
  },
];

const BY_SLUG: Record<string, ServiceDetail> = Object.fromEntries(
  SERVICES.map((s) => [s.slug, s])
);

/* ─────────────────────────────────────────────────────────────────────────
   STYLES
   Hero / eyebrow / CTAs / why-it-matters / closing are unchanged from
   before. The category sections are rebuilt as bordered cards: eyebrow +
   big title + italic accent line + "OFFERINGS" label + a two-column
   bullet grid, with the category image alternating sides (left on even
   cards, right on odd) via inline `order` — no RTL hacks needed.
───────────────────────────────────────────────────────────────────────── */
const STYLES = `
.svc-page{
  --bg:      var(--color-background);
  --surface: var(--color-card);
  --card:    var(--color-card);
  --ink:     var(--color-foreground);
  --ink-dim: var(--color-muted-foreground);
  --ink-faint: color-mix(in oklch, var(--color-muted-foreground) 75%, transparent);
  --line:    var(--color-border);
  --acc:     var(--color-primary);
  --acc-fg:  var(--color-primary-foreground);
}

@keyframes svhIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

.svh-hero{
  padding:clamp(150px,20vh,210px) 0 clamp(64px,8vh,96px);
  background:
    radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
    var(--bg);
  font-family:var(--font-sans);
  border-bottom:1px solid var(--line);
}
.svh-inner{ max-width:1120px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }

.svd-back{
  display:inline-flex; align-items:center; gap:8px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px; letter-spacing:.3em; text-transform:uppercase; font-weight:400;
  color:var(--ink-dim); margin-bottom:28px;
  transition:color .2s ease;
}
.svd-back:hover{ color:var(--acc); }

.svh-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--ink-faint); margin-bottom:22px;
  animation:svhIn .6s cubic-bezier(.16,1,.3,1) both;
  display:flex; align-items:center; gap:10px;
}
.svh-eyebrow::before{
  content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0;
}

.svh-title{
  margin-bottom:28px;
  animation:svhIn .7s .08s cubic-bezier(.16,1,.3,1) both;
}

.svh-sub{
  font-size:15px; color:var(--ink-dim); line-height:1.75;
  max-width:680px; margin-bottom:44px;
  animation:svhIn .7s .16s cubic-bezier(.16,1,.3,1) both;
}

.svh-ctas{
  display:flex; flex-wrap:wrap; gap:14px;
  animation:svhIn .7s .22s cubic-bezier(.16,1,.3,1) both;
}
.svh-cta-primary{
  display:inline-flex;align-items:center;gap:8px;
  background:var(--acc); color:var(--acc-fg);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:15px 28px;border-radius:999px;
  transition:transform .25s ease, box-shadow .25s ease;
  box-shadow:0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
}
.svh-cta-primary:hover{ transform:translateY(-2px); }
.svh-cta-secondary{
  display:inline-flex;align-items:center;gap:8px;
  border:1px solid var(--line); color:var(--ink);
  font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;
  padding:15px 28px;border-radius:999px;
  background:transparent; cursor:pointer;
  transition:border-color .25s ease, color .25s ease;
}
.svh-cta-secondary:hover{ border-color:var(--acc); color:var(--acc); }

/* ── Sections wrapper ── */
.svd-section{
  background:var(--bg);
  padding:clamp(64px,8vh,100px) 0;
  font-family:var(--font-sans);
  border-bottom:1px solid var(--line);
}
.svd-section:last-of-type{ border-bottom:none; }
.svd-inner{ max-width:1120px; margin:0 auto; padding:0 clamp(20px,4vw,48px); }

/* ── Category card ── */
.svd-cat-card{
  background:var(--surface);
  border:1px solid var(--line);
  border-radius:24px;
  padding:clamp(28px,4vw,48px);
  margin-bottom:28px;
  scroll-margin-top:110px;
}
.svd-cat-card:last-child{ margin-bottom:0; }

.svd-cat-grid{
  display:grid;
  grid-template-columns:1fr;
  gap:36px;
  align-items:center;
}
@media(min-width:900px){
  .svd-cat-grid{ grid-template-columns:1.15fr .85fr; }
}

.svd-cat-eyebrow{
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size:10px;letter-spacing:.3em;text-transform:uppercase;font-weight:400;
  color:var(--acc); margin-bottom:16px;
  display:flex; align-items:center; gap:10px;
}
.svd-cat-eyebrow::before{
  content:""; width:7px; height:7px; border-radius:50%; background:var(--acc); flex-shrink:0;
}

.svd-cat-title{
  font-family:var(--font-display); font-weight:800; letter-spacing:-.01em;
  font-size:clamp(1.9rem,3.4vw,2.6rem); line-height:1.08; color:var(--ink);
  margin-bottom:14px;
}

/* The accent line — now uses font-display italic (same swashy serif italic
   as the hero headline accent), matching the reference style across the
   whole page instead of a plain sans italic. */
.svd-cat-hook{
  font-style:italic; font-weight:400;
  font-size:17px; color:var(--acc); line-height:1.4; margin-bottom:28px;
  max-width:520px;
}

.svd-cat-label{
  font-size:10px; letter-spacing:.2em; text-transform:uppercase; font-weight:700;
  color:var(--ink-faint); margin-bottom:18px;
}

.svd-cat-offerings{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));
  gap:22px 28px;
}
.svd-offering{ display:flex; gap:11px; align-items:flex-start; }
.svd-offering-dot{
  width:6px; height:6px; border-radius:50%; background:var(--acc);
  margin-top:8px; flex-shrink:0;
}
.svd-offering-title{
  font-weight:700; font-size:15px; color:var(--ink); line-height:1.4; margin:0;
}
.svd-offering-hook{
  font-style:italic; font-weight:400;
  font-size:13.5px; color:var(--acc); margin:3px 0 0; line-height:1.4;
}
.svd-offering-body{
  font-size:12.5px; color:var(--ink-dim); margin:5px 0 0; line-height:1.6;
}

/* ── Category media — fixed box size so every card's image sits in an
   identical frame, regardless of the source image's own aspect ratio
   or how tall its card's text column happens to be. ── */
.svd-cat-media{
  width:100%;
  height:320px;
  border-radius:18px; overflow:hidden;
  border:1px solid var(--line);
  flex-shrink:0;
}
.svd-cat-media img{ width:100%; height:100%; object-fit:cover; display:block; }

@media(max-width:640px){
  .svd-cat-media{ height:240px; }
}

/* ── Why it matters ── */
.svd-why-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.6rem,3.1vw,2.2rem); line-height:1.15; color:var(--ink);
  margin-bottom:28px;
}
.svd-why-list{ display:flex; flex-direction:column; gap:16px; }
.svd-why-item{
  display:flex; gap:14px; align-items:flex-start;
  font-size:15px; color:var(--ink-dim); line-height:1.75;
}
.svd-why-item::before{
  content:"★"; color:var(--acc); font-size:14px; line-height:1.75; flex-shrink:0;
}

/* ── Closing block ── */
.svd-closing{
  background:var(--surface);
  text-align:center;
}
.svd-closing-inner{ max-width:760px; margin:0 auto; padding:clamp(80px,10vh,120px) clamp(20px,4vw,48px); }
.svd-closing-title{
  font-family:var(--font-display); font-weight:700; letter-spacing:-.01em;
  font-size:clamp(1.9rem,4vw,3rem); line-height:1.15; color:var(--ink);
  margin-bottom:20px;
}
.svd-closing-accent{
  display:block;
  font-family:var(--font-display); font-style:italic; font-weight:400;
  color:var(--acc);
}
.svd-closing-body{
  font-size:15px; color:var(--ink-dim); line-height:1.75;
  max-width:560px; margin:0 auto 36px;
}
.svd-closing-ctas{
  display:flex; flex-wrap:wrap; gap:14px; justify-content:center;
}

@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important}
}
`;

export const Route = createFileRoute("/services_/$slug")({
  loader: ({ params }) => {
    const detail = BY_SLUG[params.slug];
    if (!detail) throw notFound();
    return { detail };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.detail.title} — Jarvis Technolabs` },
          { name: "description", content: loaderData.detail.intro },
          { property: "og:title", content: `${loaderData.detail.title} — Jarvis Technolabs` },
          { property: "og:description", content: loaderData.detail.intro },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="bg-background text-foreground min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-xs tracking-[0.3em] text-muted-foreground mb-6">404</p>
          <h1 className="font-display text-5xl mb-4">Service not found</h1>
          <Link to="/services" className="text-primary hover:underline">
            ← Back to all services
          </Link>
        </div>
      </div>
    </main>
  ),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();
  const { detail } = Route.useLoaderData();

  return (
    <main className="svc-page bg-background text-foreground min-h-screen">
      <style>{STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      {/* ── HERO ── */}
      <section className="svh-hero">
        <div className="svh-inner">
          <Link to="/services" className="svd-back">
            ← Back to Services
          </Link>

          <p className="svh-eyebrow">
            {detail.number}. {detail.title.toUpperCase()}
          </p>

          <h1 className="svh-title section-title">
            {detail.headline.line1}
            <br />
            <em
              className="font-display"
              style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}
            >
              {detail.headline.line2}
            </em>
          </h1>

          <p className="svh-sub">{detail.intro}</p>

          <div className="svh-ctas">
            <Link to="/contact" className="svh-cta-primary">
              Let's Talk <span>→</span>
            </Link>
            <Link to="/services" className="svh-cta-secondary">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTIONS — one bordered card per category, image alternating
          sides (left on even index, right on odd) via inline `order`. ── */}
      <section className="svd-section">
        <div className="svd-inner">
          {detail.sections.map((section, index) => {
            const imageFirst = index % 2 === 0; // even → image left, odd → image right
            const headlineHook = section.items[0]?.hook;

            return (
              <div
                key={section.category}
                id={slugify(section.category)}
                className="svd-cat-card reveal"
              >
                <div className="svd-cat-grid">
                  <div style={{ order: imageFirst ? 1 : 0 }}>
                    <p className="svd-cat-eyebrow">
                      0{index + 1} · {section.category}
                    </p>
                    <h2 className="svd-cat-title">{section.category}</h2>

                    {headlineHook && (
                      <p className="svd-cat-hook font-display" style={{ fontStyle: "italic" }}>
                        {headlineHook}
                      </p>
                    )}

                    <p className="svd-cat-label">Offerings</p>
                    <div className="svd-cat-offerings">
                      {section.items.map((item) => (
                        <div key={item.title} className="svd-offering">
                          <span className="svd-offering-dot" />
                          <div>
                            <p className="svd-offering-title">{item.title}</p>
                            {item.hook && (
                              <p className="svd-offering-hook font-display" style={{ fontStyle: "italic" }}>
                                {item.hook}
                              </p>
                            )}
                            <p className="svd-offering-body">{item.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {section.image && (
                    <div className="svd-cat-media" style={{ order: imageFirst ? 0 : 1 }}>
                      <img src={section.image} alt={section.category} loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="svd-section">
        <div className="svd-inner">
          <p className="svh-eyebrow">Why It Matters</p>
          <h2 className="svd-why-title">What actually changes once this is live:</h2>
          <ul className="svd-why-list">
            {detail.whyItMatters.map((point) => (
              <li key={point} className="svd-why-item">
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="svd-closing">
        <div className="svd-closing-inner">
          <h2 className="svd-closing-title">
            {detail.closing.line1}
            <br />
            <em className="font-display svd-closing-accent">{detail.closing.line2}</em>
          </h2>
          <p className="svd-closing-body">{detail.closing.body}</p>
          <div className="svd-closing-ctas">
            <Link to="/contact" className="svh-cta-primary">
              Let's Talk <span>→</span>
            </Link>
            <Link to="/services" className="svh-cta-secondary">
              See Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer theme={theme} />
      <ScrollToTop />
    </main>
  );
}