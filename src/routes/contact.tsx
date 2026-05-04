import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { AnimatedHero } from "@/components/site/AnimatedHero";
import { useReveal } from "@/hooks/use-reveal";
import contactImg from "@/assets/page-contact.jpg";

const CONTACT_BLOCKS = [
  { label: "For careers", value: "talent@jarvistechnolabs.com", href: "mailto:talent@jarvistechnolabs.com" },
  { label: "For clients", value: "sales@jarvistechnolabs.com", href: "mailto:sales@jarvistechnolabs.com" },
  { label: "General enquiries", value: "info@jarvistechnolabs.com", href: "mailto:info@jarvistechnolabs.com" },
  { label: "WhatsApp", value: "+91 98259 26347", href: "https://wa.me/919825926347" },
];

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Jarvis Technolabs" },
      {
        name: "description",
        content:
          "Let's set a new standard together. Contact Jarvis Technolabs in Ahmedabad — sales, careers and general enquiries.",
      },
      { property: "og:title", content: "Contact — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Drop us a line — we reply within 24 hours.",
      },
    ],
  }),
});

function ContactPage() {
  useReveal();
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <AnimatedHero
        bgImage={contactImg}
        eyebrow="GET IN TOUCH · REPLY WITHIN 24 HRS"
        title={
          <>
            Let's set a new <em className="text-shimmer not-italic font-light">standard together.</em>
          </>
        }
        description="Drop us a line — we reply within 24 hours."
      />

      <section className="relative py-24">
        <div className="relative mx-auto max-w-5xl px-6">

          <div className="grid md:grid-cols-5 gap-10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const subject = encodeURIComponent(`Inquiry from ${data.get("name")}`);
                const body = encodeURIComponent(
                  `From: ${data.get("name")} <${data.get("email")}>\nPhone: ${data.get("phone")}\n\n${data.get("message") ?? ""}`,
                );
                window.location.href = `mailto:sales@jarvistechnolabs.com?subject=${subject}&body=${body}`;
              }}
              className="reveal md:col-span-3 space-y-5 border border-white/10 rounded-2xl p-8 bg-gradient-to-b from-white/[0.03] to-transparent"
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-warm">Drop us a line</p>
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  required
                  name="name"
                  placeholder="Name *"
                  className="w-full bg-card border border-white/10 rounded-md px-5 py-4 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email *"
                  className="w-full bg-card border border-white/10 rounded-md px-5 py-4 text-sm focus:outline-none focus:border-primary/60 transition-colors"
                />
              </div>
              <input
                required
                name="phone"
                placeholder="Phone Number *"
                className="w-full bg-card border border-white/10 rounded-md px-5 py-4 text-sm focus:outline-none focus:border-primary/60 transition-colors"
              />
              <textarea
                name="message"
                rows={6}
                placeholder="Tell us about your project..."
                className="w-full bg-card border border-white/10 rounded-md px-5 py-4 text-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground rounded-md px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:translate-y-[-2px] transition-all"
              >
                Send →
              </button>
            </form>

            <div className="reveal md:col-span-2 space-y-6">
              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-warm mb-4">Say Hello.</p>
                <ul className="space-y-5">
                  {CONTACT_BLOCKS.map((b) => (
                    <li key={b.label}>
                      <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-1">
                        {b.label}
                      </div>
                      <a
                        href={b.href}
                        className="text-foreground hover:text-warm transition-colors"
                      >
                        {b.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="text-[11px] tracking-[0.3em] uppercase text-warm mb-3">
                  Jarvis Technolabs
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  B-603, Titanium Business Park, Near Makarba Underbridge, Corporate Road,
                  Ahmedabad, Gujarat – 380051, IN
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <div>
                    <span className="text-white/90 hover:text-white transition-colors">Careers: </span>
                    <a href="tel:+917863092536" className="hover:text-warm transition-colors">
                      +91 78630 92536
                    </a>
                  </div>
                  <div>
                    <span className="text-white/90 hover:text-white transition-colors">Clients: </span>
                    <a href="tel:+919825926347" className="hover:text-warm transition-colors">
                      +91 98259 26347
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA
        eyebrow="VISIT US · AHMEDABAD"
        title={
          <>
            Or simply <em className="text-warm not-italic font-light">drop by the studio.</em>
          </>
        }
        description="Coffee's on us. We're a 5-minute walk from Makarba underbridge — open Monday to Friday, 10am to 7pm IST."
        primaryLabel="Open in Maps →"
        primaryTo="/contact"
        secondaryLabel="See open roles"
        secondaryTo="/careers"
      />
      <Footer />
    </main>
  );
}
