import i1 from "@/assets/insight-1.jpg";
import i2 from "@/assets/insight-2.jpg";
import i3 from "@/assets/insight-3.jpg";
import i4 from "@/assets/insight-4.jpg";
import i5 from "@/assets/insight-5.jpg";
import i6 from "@/assets/insight-6.jpg";

export const POSTS = [
  {
    slug: "generative-ai-enterprise-beyond-demo",
    img: i1,
    tag: "Artificial Intelligence",
    date: "Apr 2026",
    title: "Generative AI in the enterprise - beyond the demo.",
    excerpt:
      "How we move LLM pilots into production with retrieval, evaluation harnesses and cost-aware orchestration for first-party data.",
    intro:
      "The future of AI is not another isolated chatbot. For a business like the ones Jarvis Technolabs partners with, the real value starts when AI is connected to first-party data, governed workflows, and measurable operating outcomes.",
    sections: [
      {
        title: "From prompt experiments to operating systems",
        body:
          "Enterprise AI becomes useful when it can retrieve trusted context, follow domain rules, trigger actions, and report back with traceable decisions. That means retrieval, evaluation, cost controls, and human review are part of the product architecture from day one.",
      },
      {
        title: "What Jarvis builds around it",
        body:
          "Our AI-native approach connects copilots, automations, CRMs, knowledge bases, analytics, and cloud platforms into one resilient layer. The goal is not novelty; it is faster decisions, fewer manual handoffs, and software that compounds operational intelligence.",
      },
      {
        title: "The next wave",
        body:
          "As agentic systems mature, the winners will be companies that treat AI as infrastructure. Models will change, but the advantage will sit in clean data, secure orchestration, evaluation discipline, and digital products designed to improve continuously.",
      },
    ],
  },
  {
    slug: "modernising-legacy-stacks-without-breaking-business",
    img: i2,
    tag: "Digital Transformation",
    date: "Mar 2026",
    title: "Modernising legacy stacks without breaking the business.",
    excerpt:
      "A pragmatic playbook for application modernization - strangler patterns, cloud integration and enterprise architecture done in flights.",
    intro:
      "Modernization works best when it protects current revenue while opening room for future platforms, AI workflows, and better customer experiences.",
    sections: [
      {
        title: "Modernization in controlled flights",
        body:
          "Instead of forcing a risky rebuild, we split legacy systems into replaceable domains. APIs, cloud integration, observability, and incremental releases help teams move without stopping the business.",
      },
      {
        title: "Why it matters for AI",
        body:
          "AI systems need accessible data, reliable events, and clear process ownership. Modern architecture gives future copilots and agents the clean pathways they need to act safely.",
      },
      {
        title: "Future-ready architecture",
        body:
          "The target is a digital core that supports product engineering, automation, analytics, and managed services without creating another generation of technical debt.",
      },
    ],
  },
  {
    slug: "cross-platform-vs-native-next-five-years",
    img: i3,
    tag: "Application Development",
    date: "Mar 2026",
    title: "Cross-platform vs native - choosing for the next 5 years.",
    excerpt:
      "When React Native, Flutter or fully native delivers compounding ROI for D2C brands and enterprise mobility.",
    intro:
      "The best app stack is the one that supports your product roadmap, team capacity, performance needs, and future AI experiences.",
    sections: [
      {
        title: "Choose for the product, not the trend",
        body:
          "Cross-platform stacks are strong when speed, shared teams, and consistent experiences matter. Native stacks are stronger when deep device capabilities, performance constraints, or platform-specific polish drive the product value.",
      },
      {
        title: "AI changes the interface",
        body:
          "Future apps will include copilots, personalization, voice, vision, and predictive workflows. The application architecture should make these capabilities easier to ship, test, and improve.",
      },
      {
        title: "How Jarvis approaches delivery",
        body:
          "We align UI/UX, application development, backend systems, analytics, and cloud foundations so mobile products can evolve without expensive rewrites.",
      },
    ],
  },
  {
    slug: "cloud-cost-as-product-metric",
    img: i4,
    tag: "Managed Services",
    date: "Feb 2026",
    title: "Cloud cost as a product metric.",
    excerpt:
      "Treat infra spend like CAC - instrument, attribute and iterate. A FinOps framework for high-growth platforms.",
    intro:
      "Cloud spend is not just an operations concern. In AI-first products, infrastructure cost directly shapes margins, user experience, and the ability to scale.",
    sections: [
      {
        title: "Make cost visible",
        body:
          "Teams need cost attribution by product, customer, feature, and workload. Once cost is visible, engineering decisions become easier to connect to business impact.",
      },
      {
        title: "AI needs active controls",
        body:
          "Model calls, vector search, data pipelines, and automation can scale quickly. Guardrails, caching, routing, and evaluation help keep intelligent systems financially sustainable.",
      },
      {
        title: "Managed for growth",
        body:
          "Managed services should cover uptime, performance, security, and spend efficiency together. That is how platforms stay ready for growth without wasting capital.",
      },
    ],
  },
  {
    slug: "analytics-to-action-experimentation-loop",
    img: i5,
    tag: "Performance & Growth",
    date: "Feb 2026",
    title: "From analytics to action - closing the experimentation loop.",
    excerpt:
      "Tracking, BI and personalisation programmes that ship outcomes weekly instead of quarterly reports.",
    intro:
      "Data creates value only when teams can turn it into shipped improvements. The future belongs to businesses that connect analytics, personalization, and experimentation into one weekly rhythm.",
    sections: [
      {
        title: "Measure what can move",
        body:
          "Dashboards are useful, but they are not the finish line. We focus on events, funnels, cohorts, and conversion signals that can guide product, marketing, and operational decisions.",
      },
      {
        title: "AI as an action layer",
        body:
          "AI can summarize patterns, recommend next actions, personalize journeys, and help teams prioritize experiments. The key is grounding those actions in trusted business data.",
      },
      {
        title: "A faster operating cadence",
        body:
          "When analytics, product engineering, and growth workflows are connected, teams can learn faster and ship smaller improvements with confidence.",
      },
    ],
  },
  {
    slug: "platform-engineering-product-led-growth",
    img: i6,
    tag: "Product Engineering",
    date: "Jan 2026",
    title: "Platform engineering for product-led growth.",
    excerpt:
      "DevOps, internal developer platforms and quality gates that let small teams ship like large ones.",
    intro:
      "Product-led growth depends on speed, reliability, and repeatable delivery. Platform engineering gives teams the paved paths they need to build without waiting on manual coordination.",
    sections: [
      {
        title: "Developer experience becomes business leverage",
        body:
          "Internal platforms, CI/CD, observability, quality gates, and reusable cloud patterns reduce friction. That lets product teams focus on customer value instead of release mechanics.",
      },
      {
        title: "Ready for AI-native delivery",
        body:
          "AI-assisted engineering works best when the codebase, test strategy, environments, and deployment process are structured. Platform discipline makes future automation safer and more useful.",
      },
      {
        title: "Small teams, larger output",
        body:
          "The aim is not to add process. It is to remove repeated setup, reduce defects, and let focused teams ship dependable software at a higher tempo.",
      },
    ],
  },
] as const;

export type InsightPost = (typeof POSTS)[number];

export function getPostBySlug(slug: string) {
  return POSTS.find((post) => post.slug === slug);
}
