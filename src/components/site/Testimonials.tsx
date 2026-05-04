import { useEffect, useRef, useState } from "react";

const TESTIMONIALS = [
  "Jarvis built our platform in record time and the features are carefully crafted to our use case. It's comprehensive, scalable and has changed the game for our offline expansion.",
  "An AI-native partner that actually ships. Their team thinks in systems and delivers products that compound over time.",
  "From strategy to deployment, they have been an extension of our team. Our conversion lifted measurably within a quarter.",
  "Engineering quality is unreal. They turned a tangled legacy stack into a modular, observable platform we now ship to weekly.",
  "They speak product, not just code. Roadmaps tightened, cycle times dropped, and the team finally trusts the pipeline.",
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      setI((p) => (p + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  const go = (n: number) => {
    setI((n + TESTIMONIALS.length) % TESTIMONIALS.length);
    if (timer.current) window.clearInterval(timer.current);
  };

  return (
    <section className="relative py-32 border-t border-white/5 overflow-hidden">
      {/* Ambient tech grid + glow */}
      <div className="absolute inset-0 grid-bg opacity-[0.18] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-warm/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="reveal flex items-center justify-between mb-12">
          <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label">
            TESTIMONIALS · {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
          </p>
          <div className="hidden md:flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
            <span className="h-px w-10 bg-white/20" />
          
          </div>
        </div>

        {/* Carousel viewport */}
        <div className="relative">
          {/* Decorative frame corners */}
          <div className="absolute -inset-px rounded-2xl border border-white/10 pointer-events-none" />
          <div className="absolute -top-2 -left-2 h-6 w-6 border-t-2 border-l-2 border-warm/70" />
          <div className="absolute -top-2 -right-2 h-6 w-6 border-t-2 border-r-2 border-warm/70" />
          <div className="absolute -bottom-2 -left-2 h-6 w-6 border-b-2 border-l-2 border-warm/70" />
          <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-warm/70" />

          <div className="relative overflow-hidden rounded-2xl glass">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {TESTIMONIALS.map((quote, idx) => (
                <div
                  key={idx}
                  className="min-w-full px-8 md:px-16 py-16 md:py-20 relative"
                  aria-hidden={idx !== i}
                >
                  <div className="absolute top-6 left-8 font-display text-7xl leading-none text-warm/60 select-none">
                    "
                  </div>
                  <div className="absolute bottom-6 right-8 font-display text-7xl leading-none text-warm/30 rotate-180 select-none">
                    "
                  </div>
                  <blockquote className="relative font-display text-2xl md:text-4xl leading-snug tracking-tight text-foreground max-w-4xl mx-auto text-center">
                    {quote}
                  </blockquote>
                  {/* Tech meta line */}
                  <div className="mt-10 flex items-center justify-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-warm animate-pulse" />
                    <span> {String(idx + 1).padStart(3, "0")}</span>
                    <span className="h-px w-10 bg-white/20" />
                    <span className="text-warm">★★★★★</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Edge fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => go(i - 1)}
              className="group flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-warm transition-colors"
              aria-label="Previous testimonial"
            >
              <span className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-warm group-hover:bg-warm/5 transition-all">
                ←
              </span>
              Prev
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => go(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className="group relative h-2 overflow-hidden rounded-full transition-all"
                  style={{ width: idx === i ? 48 : 16 }}
                >
                  <span className="absolute inset-0 bg-white/15" />
                  {idx === i && (
                    <span className="absolute inset-0 bg-gradient-to-r from-warm to-primary animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => go(i + 1)}
              className="group flex items-center gap-3 text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-warm transition-colors"
              aria-label="Next testimonial"
            >
              Next
              <span className="h-10 w-10 rounded-full border border-white/15 flex items-center justify-center group-hover:border-warm group-hover:bg-warm/5 transition-all">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
