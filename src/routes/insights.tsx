import { useEffect, useRef, useState } from "react";
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

// Map each post (by index) to its PDF in /public
const PDF_PATHS = [
  "/Insights-1.pdf",
  "/Insights-2.pdf",
  "/Insights-3.pdf",
  "/Insights-4.pdf",
  "/Insights-5.pdf",
  "/Insights-6.pdf",
];

function PdfModal({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.80)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          height: "90vh",
          background: "#fff",
          borderRadius: "1rem",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
            background: "#fafafa",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#666",
              fontWeight: 500,
            }}
          >
            {title}
          </span>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            {/* Download button */}
            <a
              href={src}
              download
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c2692a",
                textDecoration: "none",
                border: "1px solid #c2692a",
                borderRadius: "0.375rem",
                padding: "0.35rem 0.85rem",
              }}
            >
              Download ↓
            </a>
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1.4rem",
                lineHeight: 1,
                color: "#444",
                padding: "0.25rem 0.5rem",
              }}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* PDF iframe */}
        <iframe
          src={src}
          title={title}
          style={{
            flex: 1,
            width: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
}

function InsightsPage() {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activePdf, setActivePdf] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />

      {/* ── VIDEO HERO ── */}
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
            software - written by the team behind 150+ projects.
          </p>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
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
                onClick={() =>
                  setActivePdf({
                    src: PDF_PATHS[index] ?? p.pdf,
                    title: p.title,
                  })
                }
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

      {/* ── PDF MODAL ── */}
      {activePdf && (
        <PdfModal
          src={activePdf.src}
          title={activePdf.title}
          onClose={() => setActivePdf(null)}
        />
      )}
    </main>
  );
}