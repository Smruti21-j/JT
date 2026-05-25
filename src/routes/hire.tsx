import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Cpu,
  Globe2,
  Layers3,
  Network,
  RadioTower,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useCallback, useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import secondaryVideo from "@/hero-video.mp4";
import hireImage1 from "@/assets/hire-image1.jpg";
import hireImage2 from "@/assets/hire-image2.jpg";
import hireImage3 from "@/assets/hire-image3.jpg";
import hireImage4 from "@/assets/hire-image4.jpg";
import hireImage5 from "@/assets/hire-image5.jpg";
import hireImage6 from "@/assets/hire-image6.jpg";

const REASONS = [
  {
    n: "01",
    title: "Agentic Workforce",
    kicker: "We don't just use AI tools; we build and deploy autonomous agents.",
    body: "Our specialists ensure your systems move beyond simple chat prompts to action logic - AI that reasons, plans, and executes missions independently while your team focuses on strategy.",
    image: hireImage1,
  },
  {
    n: "02",
    title: "Digital Sovereignty by Design",
    kicker: "Reclaim your digital destiny.",
    body: "Unlike agencies that lock you into black box platforms, our team forges the sovereign backbone you need. We build systems you own, manage, and evolve, ensuring your data remains your most private and powerful asset.",
    image: hireImage2,
  },
  {
    n: "03",
    title: "High-Velocity Substrate",
    kicker: "Nearly a decade of high-stakes engineering.",
    body: "With almost a decade of shipping into regulated and high-velocity markets, our playbook is already battle-tested. We skip the experimentation phase and move you directly to scaled impact.",
    image: hireImage3,
  },
  {
    n: "04",
    title: "Human-AI Symbiosis",
    kicker: "The Collective Mind approach.",
    body: "We don't replace humans; we amplify them. Our mission-ready squads are built on Human-AI Symbiosis: a seamless blend of intuition and precision that accelerates your time-to-market by 40%.",
    image: hireImage4,
  },
  {
    n: "05",
    title: "Architectural Resilience",
    kicker: "Engineered for infinite scale.",
    body: "We build on a composable, modular architecture. Whether you are disrupting a local market or entering a global frontier, our digital core is designed to adapt to 6G, edge computing, and whatever comes next.",
    image: hireImage5,
  },
  {
    n: "06",
    title: "Deciphered Outcomes",
    kicker: "Unvarnished business clarity.",
    body: "We cut through the AI hype to deliver measurable ROI. Every specialist we provide is trained to link technical performance to commercial return, giving you the receipts of impact you need to lead your industry.",
    image: hireImage6,
  },
];

const SYNC_POINTS = [
  {
    n: "01",
    icon: RadioTower,
    label: "Zero Latency Progress",
    d: "When one region logs off, the next picks up the torch. Your roadmap stays in a state of perpetual motion.",
    metric: "24h",
    metricLabel: "handoff cycle",
  },
  {
    n: "02",
    icon: Workflow,
    label: "The Single Thread",
    d: "Diversity of location doesn't mean a dilution of focus. You get one point of accountability: a single lead who orchestrates the global symphony so you don't have to.",
    metric: "1",
    metricLabel: "delivery lead",
  },
  {
    n: "03",
    icon: Network,
    label: "Async-First, Human-Always",
    d: "We've mastered the art of asynchronous documentation and deep-work cycles, ensuring that when we do meet, it's for high-value strategy, not status updates.",
    metric: "0",
    metricLabel: "status theatre",
  },
];

const DNA_GROUPS = [
  {
    title: "Frontend Systems",
    icon: Layers3,
    stack: ["React", "Next.js", "TypeScript", "Design Systems", "WebGL"],
  },
  {
    title: "Product Backbones",
    icon: Cpu,
    stack: ["Node.js", "Python", "FastAPI", "Postgres", "Redis"],
  },
  {
    title: "Mobile Surfaces",
    icon: Globe2,
    stack: ["React Native", "Flutter", "iOS Swift", "Android Kotlin"],
  },
  {
    title: "AI & Cloud Ops",
    icon: ShieldCheck,
    stack: ["AWS", "GCP", "Azure", "LangChain", "OpenAI", "PyTorch"],
  },
];

const HIRE_STYLES = `
@keyframes hireVideoDrift{0%,100%{transform:scale(1.04) translate3d(0,0,0)}50%{transform:scale(1.1) translate3d(-1.5%,-1%,0)}}
@keyframes hirePulseLine{0%{transform:translateX(-100%);opacity:0}18%,70%{opacity:1}100%{transform:translateX(280%);opacity:0}}
@keyframes hireOrbit{from{transform:rotate(0)}to{transform:rotate(360deg)}}
@keyframes hireSignal{0%,100%{opacity:.28;transform:scale(.96)}50%{opacity:.78;transform:scale(1)}}
@keyframes hireCardGlow{0%,100%{opacity:.35}50%{opacity:.85}}
.hire-video{animation:hireVideoDrift 18s ease-in-out infinite}
.hire-title{text-wrap:balance}
.hire-story-deck{perspective:1100px;perspective-origin:50% 35%}
.hire-story-card{transform-style:preserve-3d;will-change:transform,opacity,filter}
.hire-story-card:after{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(120deg,transparent 18%,rgba(255,255,255,.12),transparent 46%);transform:translateX(-125%);transition:transform .8s cubic-bezier(.22,1,.36,1)}
.hire-story-card.is-front:hover:after{transform:translateX(125%)}
.hire-story-image{clip-path:polygon(16% 0,100% 0,100% 100%,0 100%)}
.hire-story-title{overflow-wrap:anywhere;word-break:normal}
.hire-deck-glow{animation:hireCardGlow 4.2s ease-in-out infinite}
.hire-control-card{background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.018));border:1px solid rgba(255,255,255,.1);box-shadow:0 28px 90px -56px rgba(0,0,0,.95)}
.hire-control-card:before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 12%,rgba(255,130,50,.12),transparent 46%);transform:translateX(-120%);transition:transform .8s cubic-bezier(.22,1,.36,1)}
.hire-control-card:hover:before{transform:translateX(120%)}
.hire-flow-line{position:absolute;left:18px;right:18px;top:50%;height:1px;overflow:hidden;background:rgba(255,255,255,.08)}
.hire-flow-line:after{content:"";position:absolute;inset-block:0;width:42%;background:linear-gradient(90deg,transparent,rgba(255,130,50,.9),transparent);animation:hirePulseLine 3.8s ease-in-out infinite}
.hire-dna-panel{background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(145deg,rgba(255,255,255,.07),rgba(255,255,255,.015));background-size:34px 34px,34px 34px,100% 100%;border:1px solid rgba(255,255,255,.1)}
.hire-ring{position:absolute;inset:12%;border:1px solid rgba(255,130,50,.2);border-radius:999px;animation:hireSignal 4.5s ease-in-out infinite}
.hire-ring:nth-child(2){inset:25%;animation-delay:.8s}.hire-ring:nth-child(3){inset:38%;animation-delay:1.6s}.hire-orbit{animation:hireOrbit 26s linear infinite}
@media(max-width:900px){.hire-hero-grid,.hire-sync-grid,.hire-dna-grid{grid-template-columns:1fr!important}.hire-video-stack{min-height:360px!important}.hire-flow-line{display:none}}
@media(max-width:640px){.hire-hero-shell{padding-top:8rem!important}.hire-title{font-size:clamp(2.35rem,13vw,4rem)!important}}
`;

const DECK_OFFSETS = [
  { x: 34, y: -34, scale: 0.84, rotate: 5, brightness: 0.55 },
  { x: 22, y: -23, scale: 0.9, rotate: 3, brightness: 0.68 },
  { x: 10, y: -11, scale: 0.96, rotate: 1.2, brightness: 0.82 },
  { x: 0, y: 0, scale: 1, rotate: 0, brightness: 1 },
];

function StoryDeck() {
  const [deck, setDeck] = useState(REASONS.map((_, i) => i));
  const [falling, setFalling] = useState(false);
  const pausedRef = useRef(false);
  const movingRef = useRef(false);

  const advance = useCallback(() => {
    if (movingRef.current) return;
    movingRef.current = true;
    setFalling(true);
    window.setTimeout(() => {
      setDeck((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
      setFalling(false);
      movingRef.current = false;
    }, 560);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!pausedRef.current) advance();
    }, 3900);
    return () => window.clearInterval(timer);
  }, [advance]);

  const visible = deck.slice(-4);
  const active = deck[deck.length - 1];

  return (
    <div
      className="hire-story-deck relative mx-auto h-[520px] w-full max-w-[430px]"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="hire-deck-glow pointer-events-none absolute inset-8 rounded-full bg-orange-500/20 blur-3xl" />
      {visible.map((reasonIndex, position) => {
        const reason = REASONS[reasonIndex];
        const isFront = position === visible.length - 1;
        const off = DECK_OFFSETS[position + (DECK_OFFSETS.length - visible.length)];
        const transform =
          falling && isFront
            ? `translate3d(${off.x}px, ${off.y + 46}px, 0) rotateX(58deg) rotateZ(${off.rotate - 5}deg) scale(.83)`
            : `translate3d(${off.x}px, ${off.y}px, 0) rotateX(0deg) rotateZ(${off.rotate}deg) scale(${off.scale})`;

        return (
          <article
            key={reasonIndex}
            className={`hire-story-card absolute inset-0 overflow-hidden rounded-lg border p-7 ${isFront ? "is-front cursor-pointer" : ""}`}
            onClick={() => {
              if (isFront) advance();
            }}
            style={{
              zIndex: position + 1,
              background: isFront
                ? "linear-gradient(145deg, #f1eadf, #cfc4b2)"
                : "linear-gradient(145deg, rgba(241,234,223,.54), rgba(138,126,108,.46))",
              borderColor: isFront ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.16)",
              boxShadow: isFront ? "0 34px 90px rgba(0,0,0,.42)" : "none",
              color: "#150d03",
              filter: `brightness(${off.brightness})`,
              opacity: falling && isFront ? 0 : 1,
              transform,
              transformOrigin: "center top",
              transition:
                falling && isFront
                  ? "transform .5s cubic-bezier(.55,0,1,.45), opacity .28s ease .12s"
                  : "transform .58s cubic-bezier(.22,1,.36,1), opacity .35s ease, filter .35s ease",
            }}
          >
            <div className="hire-story-image absolute right-0 top-0 h-36 w-44 overflow-hidden opacity-35">
              <img
                src={reason.image}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#f1eadf]/35 to-[#f1eadf]" />
            </div>
            <div className="relative z-10 flex h-full flex-col">
              <div className="mb-10 flex items-center justify-between">
                <span className="font-mono text-[11px] tracking-[0.3em] text-black/32">
                  {reason.n} / 06
                </span>
                <span className="h-2 w-2 rounded-full bg-orange-600/70" />
              </div>
              <h3 className="hire-story-title max-w-[92%] font-display text-[clamp(1.9rem,3.2vw,2.75rem)] uppercase leading-[0.98] text-black">
                {reason.title}
              </h3>
              <div className="mt-auto pt-8">
                <p className="font-display text-lg leading-6 text-black/70">{reason.kicker}</p>
                <div className="my-5 h-px bg-black/10" />
                <p className="text-sm leading-7 text-black/52">{reason.body}</p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-black/30">
                    Click for next
                  </span>
                  <div className="flex gap-1.5">
                    {REASONS.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${active === i ? "bg-black/55" : "bg-black/15"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export const Route = createFileRoute("/hire")({
  component: HirePage,
  head: () => ({
    meta: [
      { title: "Hire Dedicated Talent - Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Deploy a global engineering pod built for continuous progress, single-thread accountability and AI-native delivery.",
      },
    ],
  }),
});

function HirePage() {
  useReveal();

  return (
    <main className="bg-background text-foreground min-h-screen">
      <style>{HIRE_STYLES}</style>
      <Nav />

      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="hire-video absolute inset-0 h-full w-full object-cover opacity-45"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.38)_100%)]" />
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-background to-transparent" />

        <div className="hire-hero-shell relative mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-32 md:px-12">
          <div className="hire-hero-grid grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="reveal max-w-3xl">
              <p className="bracket-label mb-6 text-xs tracking-[0.34em] text-warm">
                GLOBAL TALENT PODS
              </p>
              <h1 className="hire-title font-display text-[clamp(3rem,6.7vw,6.4rem)] font-semibold uppercase leading-[0.94] text-white">
                Are you ready to initialize the next sequence of
                <em className="mt-2 block not-italic text-warm">global growth?</em>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-white/58 md:text-lg">
                From your ambition to unvarnished impact. Enter the Impact Hub - a high-velocity
                studio designed for the world's most important decisions. Deploy a team that thinks
                like a partner and acts like an agent, turning your boldest ideas into autonomous
                reality.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="motion-link inline-flex items-center gap-3 rounded-md bg-orange-500 px-6 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-black"
                >
                  Deploy your team <ArrowRight size={16} />
                </Link>
                <span className="text-xs uppercase tracking-[0.24em] text-white/35">
                  Start in 7 days
                </span>
              </div>
            </div>

            <div className="hire-video-stack reveal relative min-h-[520px]">
              <div className="absolute right-0 top-0 h-[68%] w-[74%] overflow-hidden rounded-lg border border-white/12 bg-white/5 shadow-2xl">
                <video
                  className="h-full w-full object-cover opacity-80"
                  src={secondaryVideo}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-white/62">
                  <span>Live build room</span>
                  <span className="text-warm">Online</span>
                </div>
              </div>
              <div className="absolute bottom-8 left-0 h-[48%] w-[58%] overflow-hidden rounded-lg border border-orange-400/25 bg-black shadow-2xl">
                <video
                  className="h-full w-full object-cover opacity-70"
                  src="/hero-video-7.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute inset-x-5 top-5 h-px overflow-hidden bg-white/10">
                  <span
                    className="block h-full w-1/2 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
                    style={{ animation: "hirePulseLine 3s ease-in-out infinite" }}
                  />
                </div>
              </div>
              <div className="absolute bottom-0 right-6 w-56 rounded-lg border border-white/10 bg-black/75 p-5 backdrop-blur-xl">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/35">Throughput</p>
                <div className="mt-3 flex items-end gap-3">
                  <span className="font-display text-5xl text-white">3x</span>
                  <span className="pb-2 text-xs uppercase tracking-[0.18em] text-warm">
                    delivery lanes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 grid-bg opacity-35" />
        <div className="absolute right-0 top-0 h-96 w-96 bg-orange-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="reveal">
              <p className="bracket-label mb-6 text-xs tracking-[0.3em] text-warm">
                WHY HIRE JARVIS
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Why hire a team that follows tickets when you can deploy a collective that
                <em className="block not-italic text-warm">orchestrates outcomes?</em>
              </h2>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">
                Stop fighting for headcount and start acquiring decision authority. We provide the
                mission-ready experts needed to turn technical complexity into your unique
                competitive power.
              </p>
            </div>

            <div className="reveal">
              <StoryDeck />
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 grid-bg opacity-45" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="reveal mb-16 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="bracket-label mb-6 text-xs tracking-[0.3em] text-warm">
                GLOBAL SYNCHRONICITY ENGINE
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Engineering without borders.
                <em className="block not-italic text-warm">Innovation without sleep.</em>
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              In a world that never stops, your development shouldn't either. We've transcended the
              traditional outsourcing model to build a Global Synchronicity Engine. We don't just
              fill seats; we stitch together a high-velocity talent fabric across India, Europe, the
              Middle East and Africa (EMEA), and the Americas to ensure your product evolves while
              you sleep.
              <br />
              <br />
              Why wait for tomorrow when progress is happening now? We leverage the rotation of the
              Earth to turn linear timelines into exponential output.
            </p>
          </div>

          <div className="hire-sync-grid grid gap-5 lg:grid-cols-3">
            {SYNC_POINTS.map((pt, i) => {
              const Icon = pt.icon;
              return (
                <article
                  key={pt.n}
                  className="hire-control-card reveal relative overflow-hidden rounded-lg p-7"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="relative z-10">
                    <div className="mb-10 flex items-center justify-between">
                      <span className="font-mono text-[11px] tracking-[0.3em] text-white/32">
                        {pt.n}
                      </span>
                      <span className="grid h-11 w-11 place-items-center rounded-md border border-orange-400/25 bg-orange-500/10 text-warm">
                        <Icon size={20} />
                      </span>
                    </div>
                    <div className="mb-8">
                      <div className="font-display text-6xl leading-none text-white">
                        {pt.metric}
                      </div>
                      <div className="mt-2 text-[10px] uppercase tracking-[0.24em] text-warm/80">
                        {pt.metricLabel}
                      </div>
                    </div>
                    <h3 className="font-display text-2xl text-white">{pt.label}</h3>
                    <p className="mt-5 min-h-32 text-sm leading-7 text-white/48">{pt.d}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="relative mt-12 hidden h-20 lg:block">
            <div className="hire-flow-line" />
            <div className="absolute left-[15%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-orange-400 bg-background" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400 bg-background" />
            <div className="absolute right-[15%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border border-orange-400 bg-background" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="hire-dna-grid grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="reveal">
              <p className="bracket-label mb-6 text-xs tracking-[0.3em] text-muted-foreground">
                TECHNOLOGICAL DNA
              </p>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Forging Vision into
                <em className="block not-italic text-warm">Shipped Reality.</em>
              </h2>
              <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">
                Every pod is composed around product velocity, platform resilience and AI-enabled
                engineering workflows.
              </p>
            </div>

            <div className="hire-dna-panel reveal relative overflow-hidden rounded-lg p-6 md:p-8">
              <div className="pointer-events-none absolute right-8 top-8 h-52 w-52">
                <div className="hire-ring" />
                <div className="hire-ring" />
                <div className="hire-ring" />
                <div className="hire-orbit absolute inset-0 rounded-full border border-dashed border-orange-400/20" />
              </div>
              <div className="relative grid gap-4 sm:grid-cols-2">
                {DNA_GROUPS.map((group) => {
                  const Icon = group.icon;
                  return (
                    <article
                      key={group.title}
                      className="rounded-lg border border-white/10 bg-black/28 p-5 backdrop-blur-sm"
                    >
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-display text-xl text-white">{group.title}</h3>
                        <span className="grid h-10 w-10 place-items-center rounded-md bg-white/6 text-warm">
                          <Icon size={19} />
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-white/58 transition-colors hover:border-orange-400/40 hover:text-warm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="relative mt-6 grid gap-4 rounded-lg border border-orange-400/20 bg-orange-500/[0.06] p-5 md:grid-cols-3">
                {["AI-assisted QA", "Cloud cost control", "Security by default"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-white/62">
                    <span className="h-2 w-2 rounded-full bg-orange-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
