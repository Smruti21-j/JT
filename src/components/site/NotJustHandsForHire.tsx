import {
  MessageCircle, ShoppingCart, Plane, Home, Mail, Star,
  FileText, Image as ImageIcon, ClipboardList, Camera, Users, Eye,
} from "lucide-react";

/**
 * Placeholder tile content — swap in Jarvis Technolabs' own internal
 * products / accelerators. Structured after IndiaNIC's "Not just hands for
 * hire" section: three buckets, tiles only, no outbound links per your
 * request (7).
 */
const BUCKETS = [
  {
    label: "Bucket 01",
    title: "Business Solutions",
    tiles: [
      { icon: MessageCircle, tag: "Live chat · AI · Video", name: "Product Name", desc: "One-line description of the live product." },
      { icon: ShoppingCart, tag: "E-commerce · Voice AI", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Plane, tag: "Travel · Automation", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Home, tag: "Property Ops", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Mail, tag: "Email · SMS · WhatsApp", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Star, tag: "Reputation · AI Replies", name: "Product Name", desc: "One-line description of the live product." },
    ],
  },
  {
    label: "Bucket 02",
    title: "Tech Tools",
    tiles: [
      { icon: FileText, tag: "Dev Tooling", name: "Product Name", desc: "One-line description of the live product." },
      { icon: ClipboardList, tag: "AgencyOps", name: "Product Name", desc: "One-line description of the live product." },
      { icon: ImageIcon, tag: "AI Context Layer", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Users, tag: "Infra · DevOps", name: "Product Name", desc: "One-line description of the live product." },
    ],
  },
  {
    label: "Bucket 03",
    title: "Proof of Concepts",
    tiles: [
      { icon: Camera, tag: "Computer Vision", name: "Product Name", desc: "One-line description of the live product." },
      { icon: Eye, tag: "Surveillance AI", name: "Product Name", desc: "One-line description of the live product." },
    ],
  },
];

export function NotJustHandsForHire() {
  return (
    <section className="relative py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="reveal mb-20 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              NOT JUST HANDS FOR HIRE
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight leading-[1.05]">
              We don't just do the work.
              <br />
              <em className="text-warm not-italic font-light">We own the products.</em>
            </h2>
          </div>
          <p className="lg:col-span-5 text-muted-foreground leading-relaxed">
            Beyond the team you extend or stand up, we bring a head start: live products our
            own teams build and run — across categories you're probably trying to build in
            right now.
          </p>
        </div>

        <div className="space-y-16">
          {BUCKETS.map((bucket) => (
            <div key={bucket.title} className="reveal">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-[11px] tracking-[0.25em] text-warm uppercase">{bucket.label}</span>
                <h3 className="font-display text-xl">{bucket.title}</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                {bucket.tiles.map((t, i) => (
                  <div
                    key={`${bucket.title}-${i}`}
                    className="group relative bg-background p-7 transition-all duration-500 hover:bg-muted/40"
                  >
                    <div className="h-10 w-10 rounded-lg glass flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:border-primary/30 transition-colors">
                      <t.icon className="h-4.5 w-4.5 text-warm" strokeWidth={1.5} />
                    </div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                      {t.tag}
                    </p>
                    <h4 className="font-display text-lg mb-1.5">{t.name}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}