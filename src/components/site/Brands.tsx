import esnaad from "@/assets/brands/image107.png";
import dubaiCulture from "@/assets/brands/image113.png";
import lifelong from "@/assets/brands/image119.png";
import abuDhabiSchool from "@/assets/brands/image122.png";
import pensionFund from "@/assets/brands/image125.png";
import chequeScore from "@/assets/brands/image133.png";
import numoo from "@/assets/brands/image138.png";
import creditReport from "@/assets/brands/image141.png";
import twentyFour from "@/assets/brands/image143.png";
import bloodCenter from "@/assets/brands/image152.png";
import jarvisMart from "@/assets/brands/image155.png";
import bni from "@/assets/brands/image160.png";
import kago from "@/assets/brands/image167.png";
import drBrothers from "@/assets/brands/image172.png";
import lifelongAlt from "@/assets/brands/image198.png";
import guardbay from "@/assets/brands/image203.png";
import sail from "@/assets/brands/image204.png";
import roleplayLabs from "@/assets/brands/image24.png";
import homeMark from "@/assets/brands/image97.png";

const BRANDS = [
  { name: "Esnaad", logo: esnaad },
  { name: "Dubai Culture", logo: dubaiCulture },
  { name: "Lifelong Learning", logo: lifelong },
  { name: "Abu Dhabi School of Government", logo: abuDhabiSchool },
  { name: "Abu Dhabi Pension Fund", logo: pensionFund },
  { name: "ChequeScore", logo: chequeScore },
  { name: "Numoo", logo: numoo },
  { name: "CreditReport", logo: creditReport },
  { name: "24", logo: twentyFour },
  { name: "Ahmedabad Red Cross", logo: bloodCenter },
  { name: "Jarvis Mart", logo: jarvisMart },
  { name: "BNI Athena Parousia", logo: bni },
  { name: "KaGo", logo: kago },
  { name: "DR Brothers", logo: drBrothers },
  { name: "Lifelong Learning", logo: lifelongAlt },
  { name: "GuardBay", logo: guardbay },
  { name: "Sail", logo: sail },
  { name: "RoleplayLabs.ai", logo: roleplayLabs },
  { name: "Home", logo: homeMark },
];

function LogoRail({ reverse = false }: { reverse?: boolean }) {
  const logos = [...BRANDS, ...BRANDS];

  return (
    <div className="brand-rail overflow-hidden">
      <div className={`flex w-max gap-5 ${reverse ? "animate-brand-marquee-reverse" : "animate-brand-marquee"}`}>
        {logos.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="brand-card flex h-28 w-52 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white p-5"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              loading="lazy"
              className="max-h-16 max-w-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Brands() {
  return (
    <section id="brands" className="relative overflow-hidden border-t border-white/5 py-32">
      <div className="absolute inset-0 grid-bg opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      <div className="absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="reveal mb-16 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-xs tracking-[0.3em] text-muted-foreground bracket-label mb-6">
              SUCCESS STORIES
            </p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              Impact <em className="text-shimmer not-italic font-light">Witnessed.</em>
            </h2>
          </div>
          <p className="lg:col-span-4 text-muted-foreground leading-relaxed">
            See your future in action. Explore the missions where we turned bold ambition into a scalable reality. These global leaders didn't just build software - they used our intelligence layer to gain decision authority and command their markets.
          </p>
        </div>

        <div className="space-y-5">
          <LogoRail />
          <LogoRail reverse />
        </div>
      </div>
    </section>
  );
}
