import { Link } from "@tanstack/react-router";
import { StatCounter } from "@/components/site/StatCounter";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-40 pb-24 overflow-hidden">
      
      {/* VIDEO BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.45] contrast-125"
        >
          <source src="/hero-video-5.mp4" type="video/mp4" />
        </video>

        {/* STRONG OVERLAY (FIXED) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* GRID + GLOW */}
      <div className="absolute inset-0 grid-bg opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="absolute -top-40 right-0 h-[600px] w-[800px] rounded-full bg-primary/[0.06] blur-3xl animate-pulse-glow" />
      <div className="pointer-events-none absolute left-8 top-1/3 hidden h-40 w-px overflow-hidden bg-white/10 md:block">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-primary to-transparent animate-breakthrough-scan" />
      </div>
      <div className="pointer-events-none absolute right-10 top-1/4 hidden h-28 w-28 rounded-full border border-white/10 md:block animate-breakthrough-orbit">
        <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_18px_oklch(0.72_0.16_45)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        

        {/* CORNERS */}
        <div className="absolute top-10 left-6 h-6 w-6 border-l border-t border-white/20" />
        <div className="absolute top-10 right-6 h-6 w-6 border-r border-t border-white/20" />

        {/* CONTENT */}
        <div className="reveal text-center max-w-5xl mx-auto">
          
          <p className="text-xs tracking-[0.3em] text-white/60 mb-12">
            YOU THINK · WE CREATE
          </p>

          <div className="inline-flex items-center justify-center mb-10">
            <span className="text-primary text-2xl animate-pulse">✦</span>
          </div>

          {/* HEADING (FIXED CONTRAST) */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] tracking-tight text-white drop-shadow-[0_5px_30px_rgba(0,0,0,0.8)]">
            Orchestrating
            <br />
            <span className="font-light text-white/90">
              Your Autonomous
            </span>
            <br />
            <span className="text-primary">
              Future
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-10 text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Move decisively from experimentation to enterprise-scale impact. Build the autonomous intelligence layer that powers your future, delivering the resilient, sovereign, and mission-ready digital ecosystems essential for the AI-first economy.
          </p>

          {/* BUTTONS */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            
            <Link
              to="/contact"
              className="motion-link group inline-flex items-center gap-3 bg-primary text-primary-foreground rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] hover:shadow-[0_10px_40px_-10px_oklch(0.72_0.16_45_/_0.6)] transition-all"
            >
              Let's Talk
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>

            <Link
              to="/services"
              className="motion-link inline-flex items-center gap-3 border border-white/20 rounded-md px-7 py-3.5 text-xs tracking-[0.2em] uppercase text-white/70 hover:text-white hover:border-white/60 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* COUNTER */}
        <div className="relative mt-24 reveal">
          <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <StatCounter target={8.5} decimals={1} label="Era of Impact" />
            <StatCounter target={150} label=" Breakthroughs" />
            <StatCounter target={25} label="Global Reach" />
            <StatCounter target={50} suffix="%" label="Vision Architects" />
          </div>
        </div>

      </div>
    </section>
  );
}
