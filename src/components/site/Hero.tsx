import { Link } from "@tanstack/react-router";
import { Rocket, BarChart3, Globe2, Bot, Cloud, Layers, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteTheme } from "@/hooks/use-theme-init";
import heroIllustrationDark from "@/assets/darktheme.png";
import heroIllustrationLight from "@/assets/lighttheme.png";

const ROTATING_WORDS = ["Sovereign", "Architected", "Pioneering", "Cohesive", "Catalytic"];

function RotatingWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block text-primary italic"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}

const STATS = [
  { icon: Rocket, value: "8.5", label: "Years of Impact" },
  { icon: BarChart3, value: "150+", label: "Breakthroughs Delivered" },
  { icon: Globe2, value: "25+", label: "Global Reach" },
];

const CALLOUTS = [
  { icon: Bot, label: "AI Agents", position: { top: "6%", right: "-4%" } },
  { icon: Cloud, label: "Cloud Native", position: { top: "38%", right: "-10%" } },
  { icon: TrendingUp, label: "Data Intelligence", position: { bottom: "10%", right: "-6%" } },
  { icon: Layers, label: "Scalable Solutions", position: { bottom: "2%", left: "-6%" } },
];

type HeroProps = {
  theme: SiteTheme;
};

// theme now actively picks the correct pre-rendered illustration image below -
// everything else in this component still works from CSS variables alone.
export function Hero({ theme }: HeroProps) {
  const heroIllustration = theme === "light" ? heroIllustrationLight : heroIllustrationDark;

  return (
    <section className="relative min-h-screen pt-36 pb-20 overflow-hidden bg-background">
      <div className="absolute -top-32 -left-20 h-[500px] w-[500px] rounded-full bg-primary/[0.08] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-[0.05] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)] pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT — headline + copy + CTAs (unchanged) */}
          <div>
            <h1
              className="font-bold text-foreground section-title"
               
            >
              Orchestrating
              <br />
              Your{" "}
              <span className="font-display f-400 inline-block min-w-[220px]">
                <RotatingWord />
              </span>
              <br />
              Future
            </h1>

            <div className="mt-4 h-1 w-16 bg-primary rounded-full" />

            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
              Not another AI pilot stuck behind glass. We build autonomous systems that think, adapt, and act at enterprise scale;  the intelligent infrastructure powering the businesses that refuse to wait for "eventually."
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-full px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
              >
                Let's Talk
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/services"
                className="inline-flex flex-col items-start gap-0.5 border border-border rounded-xl px-6 py-3 hover:border-foreground/30 transition-colors"
              >
                <span className="text-xs uppercase tracking-[0.15em] text-foreground font-medium">Innovation in Action →</span>
                
              </Link>
            </div>
          </div>

          {/* RIGHT — stat row + isometric illustration with floating callouts */}
          <div>
            {/* Stat cards row */}
            

            {/* Illustration with floating labeled callouts */}
            <div className="relative mx-auto max-w-xxl">
              <img src={heroIllustration} alt="" className="w-full h-auto select-none pointer-events-none" />

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}