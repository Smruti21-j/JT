import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { CTA, Footer } from "@/components/site/CTA";
import { useReveal } from "@/hooks/use-reveal";
import { useEffect, useRef, useState } from "react";
import careersHeroImg from "@/assets/careersherosection.png";
import career01 from "@/assets/career01.png";
import career02 from "@/assets/career02.png";
import career03 from "@/assets/career03.png";
import career04 from "@/assets/career04.png";
import career05 from "@/assets/career05.png";
import career06 from "@/assets/career06.png";
import career07 from "@/assets/career07.png";
import { useThemeInit } from "@/hooks/use-theme-init";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PERKS = [
  {
    num: "01",
    titlePlain: "Non-Linear",
    titleItalic: "Timeframes",
    desc: "Forget the 9-to-5 grind. With flexible work options, you define your own peak productivity hours.",
    stat: { value: "", label: "" },
    image: career01,
  },
  {
    num: "02",
    titlePlain: "Zero-Lag",
    titleItalic: "Communication",
    desc: "We operate with no hidden policies, ensuring complete transparency across every layer of the organization.",
    stat: { value: "", label: "" },
    image: career02,
  },
  {
    num: "03",
    titlePlain: "Sustainable",
    titleItalic: "Innovation",
    desc: "To keep your creative engine running, we prioritize work-life balance as a core functional requirement.",
    stat: { value: "", label: "" },
    image: career03,
  },
  {
    num: "04",
    titlePlain: "The Hive",
    titleItalic: "Mind",
    desc: "You’ll be surrounded by awesome team members in a vibrant work culture designed to spark \"eureka\" moments daily.",
    stat: { value: "", label: "" },
    image: career04,
  },
  {
    num: "05",
    titlePlain: "Personal",
    titleItalic: "Breakthroughs",
    desc: "We celebrate your unique contributions with individual achievement perks.",
    stat: { value: "", label: "" },
    image: career05,
  },
  {
    num: "06",
    titlePlain: "Collective",
    titleItalic: "Victory",
    desc: "When the team wins, everyone wins. Our team performance perks ensure our shared success translates into shared rewards.",
    stat: { value: "", label: "" },
    image: career06,
  },

];

// Stories / culture gallery items — served from /public, so paths are absolute from root
const CULTURE_STORIES = [
  {
    image: "/careers1.png",
    title: "The studio",
    sub: "Ahmedabad",
    tag: "Inside Jarvis",
  },
  {
    image: "/careers2.png",
    title: "Sacred Soirée",
    sub: "Timeless Traditions",
    tag: "Culture",
  },
  {
    image: "/careers3.png",
    title: "Carnival Corner",
    sub: "Grand Arcade",
    tag: "Celebrations",
  },
  {
    image: "/careers4.jpg",
    title: " Corporate Escape",
    sub: "Team Odyssey",
    tag: "Delivery",
  },
  {
    image: "/careers7.png",
    title: "Adventure Retreat",
    sub: "Travel Chronicles",
    tag: "Workshop",
  },
  {
    image: "/careers5.jpg",
    title: "Frosted Festivities",
    sub: "Year-End Affair",
    tag: "Celebrations",
  },
  {
    image: "/careers6.png",
    title: "Smile Connect",
    sub: "Wellness check",
    tag: "People",
  },
  {
    image: "/careers8.jpg",
    title: "Cultural Connect",
    sub: "Rooted by Traditions",
    tag: "Focus",
  },
];

const ROLES = [
  {
    slug: "bde",
    title: "BDE",
    dept: "Sales and Marketing",
    exp: "3+ years of experience",
    loc: "Ahmedabad · In-office",
    jobType: "FULL TIME",
    postedOn: "05 Aug 2026",
    skills: ["Lead Generation", "B2B Sales", "CRM", "Client Relations", "Digital Marketing"],
    summary:
      "Our growing company is seeking a resourceful Business Development Executive with 3+ years of experience to develop and implement growth opportunities across existing and new markets. We're searching for professionals with a solid track record of creating long-term value for organizations. We need a leader who understands how to leverage real data and capitalize on business trends and opportunities. The ideal candidate should be customer-obsessed and ready to solve the changing needs of our clients.",
    responsibilities: [
      "Analyze and identify projects across various channels.",
      "Assist in the bidding process to secure new business.",
      "Define the scope of projects in collaboration with clients.",
      "Determine the resources (time, money, etc.) required to complete projects.",
      "Identify and contact new prospective clients globally.",
      "Utilize digital marketing, lead generation, cold calling, emails, and scheduling meetings with clients.",
      "Promote the company's image as a leader in technology services.",
      "Highlight the benefits of the company's software products and services.",
      "Develop sustainable relationships with decision-makers.",
      "Develop and implement new strategies to increase sales.",
      "Arrange and provide software demonstrations to customers.",
      "Develop sales within both existing and new business accounts.",
      "Advise clients on IT implementation and training.",
      "Arrange for post-sale support to clients.",
      "Write proposals for prospective clients.",
      "Follow up on leads with phone calls and other communications.",
    ],
    requirements: [
      "Proven track record of success in business development, sales, or a related field.",
      "Bachelor's degree in Business Administration, Marketing, or a related field.",
      "Strong understanding of market dynamics and customer needs.",
      "Excellent communication and interpersonal skills.",
      "Proficiency in CRM software such as HubSpot and Zoho.",
      "Ability to work independently and as part of a team.",
      "Strong analytical and problem-solving skills.",
      "Experience with lead generation tools and platforms like LinkedIn Sales Navigator or others.",
      "Proficiency in creating proposals, presentations, and other sales documents using Microsoft Office Suite (Word, PowerPoint, Excel) or Google Workspace.",
      "Ability to handle multiple projects simultaneously.",
      "Experience in the technology or software industry.",
      "Knowledge of digital marketing strategies and tools.",
    ],
  },
  {
    slug: "quality-analyst",
    title: "Quality Analyst",
    dept: "QA",
    exp: "2 – 5+ years of experience",
    loc: "Ahmedabad · In-office",
    jobType: "FULL TIME",
    postedOn: "05 Aug 2026",
    skills: ["Manual Testing", "Automation", "API Testing", "SDLC", "Agile/Scrum"],
    summary:
      "We are looking for a 2-5+ years experienced Software Quality Assurance Engineer who possesses a passion for pushing mobile and web technologies to the limits and will work with our team of talented engineers to test and build the next generation of applications, by developing and executing exploratory and automated tests to ensure product quality.",
    responsibilities: [
      "Develop and drive QA tests, formulate testing strategy and test plans, and implement them across our product offerings and client projects.",
      "Review requirements, specifications and technical design documents to provide timely and meaningful feedback.",
      "Estimate, prioritize, plan and coordinate testing activities.",
      "Execute test cases based on functional specifications for new products as well as change requests (defects, enhancements, new features functionality).",
      "Work with cross-functional teams — mobile, web and backend — to ensure quality throughout the software development life cycle.",
      "Identify, record, and document bugs thoroughly on tools such as Redmine, Jira, Azure DevOps, Gitlab etc. depending upon the project.",
      "Perform thorough regression testing.",
      "Interact with internal teams (e.g., developers, support team and product managers) to identify system requirements.",
      "Track quality assurance metrics, like defect densities and open defect counts.",
      "Design, develop and execute automation scripts using open-source tools.",
      "Stay up-to-date with new testing tools and test strategies.",
      "Be able to write basic scripting or code.",
      "Initial day-to-day responsibilities: Manual Functional Testing, and Automated Test Scripts using third-party tools.",
    ],
    requirements: [
      "BS/MS degree in Computer Science, Engineering or a related subject.",
      "Proven work experience in software development and software quality assurance of at least 2+ years in mobile and/or web technologies.",
      "Strong knowledge of software QA methodologies, tools and processes.",
      "Experience in writing clear, concise and comprehensive test plans and test cases.",
      "Hands-on experience with both white box and black box testing.",
      "Hands-on experience with automated testing tools.",
      "Experience working in an Agile/Scrum development process.",
      "Experience with performance and/or security testing is a plus.",
    ],
  },
];

function careersPalette(theme: "light" | "dark") {
  if (theme === "light") {
    return {
      bg: "#fbfaf7",
      cardBg: "#ffffff",
      ink: "#181818",
      inkDim: "rgba(25,25,25,0.55)",
      inkFaint: "rgba(25,25,25,0.35)",
      inkFainter: "rgba(25,25,25,0.22)",
      accent: "#ed6323",
      line: "rgba(0,0,0,0.08)",
      lineSoft: "rgba(0,0,0,0.05)",
      panelShade: (i: number) => `hsl(30, 15%, ${96 - i * 1.2}%)`,
      imgFilter: "saturate(0.9) brightness(0.96)",
    };
  }
  return {
    bg: "#080604",
    cardBg: "#0a0806",
    ink: "#f0e8df",
    inkDim: "rgba(240,232,223,0.55)",
    inkFaint: "rgba(240,232,223,0.32)",
    inkFainter: "rgba(255,255,255,0.2)",
    accent: "rgb(255,130,50)",
    line: "rgba(255,255,255,0.06)",
    lineSoft: "rgba(255,255,255,0.05)",
    panelShade: (i: number) => `hsl(25, 10%, ${5 + i * 1.2}%)`,
    imgFilter: "brightness(0.5) saturate(0.55)",
  };
}

// ─── Keyframes ─────────────────────────────────────────────────────────────
const KEYFRAMES = `
  @keyframes pkHeaderIn {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pkNumIn {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 0.55; transform: translateX(0); }
  }
  @keyframes pkTextIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes pkImgZoom {
    from { transform: scale(1.1); }
    to   { transform: scale(1); }
  }
  @keyframes pkLineGrow {
    from { width: 0; }
    to   { width: 44px; }
  }
  @keyframes storySlideIn {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lightboxFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lightboxImgIn {
    from { opacity: 0; transform: scale(0.96); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* Story gallery */
  .story-card {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .story-card.s-vis {
    opacity: 1;
    transform: translateY(0);
  }
  .story-card:nth-child(1) { transition-delay: 0s; }
  .story-card:nth-child(2) { transition-delay: 0.07s; }
  .story-card:nth-child(3) { transition-delay: 0.14s; }
  .story-card:nth-child(4) { transition-delay: 0.21s; }
  .story-card:nth-child(5) { transition-delay: 0.28s; }
  .story-card:nth-child(6) { transition-delay: 0.35s; }
  .story-card:nth-child(7) { transition-delay: 0.42s; }
  .story-card:nth-child(8) { transition-delay: 0.49s; }

  .story-img {
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .story-card:hover .story-img {
    transform: scale(1.06);
  }

  /* Roles */
  .role-row {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .role-row.r-vis {
    opacity: 1;
    transform: translateY(0);
  }

  /* Benefit cards */
  .benefit-card {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .benefit-card.b-vis {
    opacity: 1;
    transform: translateY(0);
  }
  .benefit-card:nth-child(1) { transition-delay: 0s; }
  .benefit-card:nth-child(2) { transition-delay: 0.06s; }
  .benefit-card:nth-child(3) { transition-delay: 0.12s; }
  .benefit-card:nth-child(4) { transition-delay: 0.18s; }
  .benefit-card:nth-child(5) { transition-delay: 0.24s; }
  .benefit-card:nth-child(6) { transition-delay: 0.3s; }
  .benefit-card:nth-child(7) { transition-delay: 0.36s; }

  /* ── Careers Hero — same pattern as Services page hero ── */
  @keyframes svhIn{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}

  .svh-hero{
    --bg: var(--color-background);
    --ink: var(--color-foreground);
    --ink-dim: var(--color-muted-foreground);
    --ink-faint: color-mix(in oklch, var(--color-muted-foreground) 75%, transparent);
    --line: var(--color-border);
    --acc: var(--color-primary);
    --acc-fg: var(--color-primary-foreground);
    position: relative;
    overflow: hidden;
    padding: clamp(150px,20vh,210px) 0 clamp(100px,12vh,150px);
    background:
      radial-gradient(circle at 12% 0%, color-mix(in oklch, var(--acc) 9%, transparent) 0%, transparent 48%),
      var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .svh-inner{
    position: relative;
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 clamp(20px,4vw,48px);
  }
  .svh-inner > *:not(.svh-hero-image){
    position: relative;
    z-index: 2;
  }
  .svh-hero-image{
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: min(42vw,700px);
    pointer-events: none;
    z-index: 1;
  }
  .svh-hero-image img{
    width: 100%;
    height: auto;
    display: block;
  }
  @media (max-width: 992px){
    .svh-hero-image{
      position: relative;
      width: 100%;
      max-width: 500px;
      margin: 40px auto 0;
      top: auto;
      right: auto;
      transform: none;
    }
  }
  .svh-eyebrow{
    font-family: var(--font-mono, ui-monospace, monospace);
    font-size: 10px; letter-spacing: .3em; text-transform: uppercase; font-weight: 400;
    color: var(--ink-faint); margin-bottom: 22px;
    animation: svhIn .6s cubic-bezier(.16,1,.3,1) both;
    display: flex; align-items: center; gap: 10px;
  }
  .svh-eyebrow::before{
    content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--acc); flex-shrink: 0;
  }
  .svh-title{
    margin-bottom: 28px;
    animation: svhIn .7s .08s cubic-bezier(.16,1,.3,1) both;
  }
  .svh-sub{
    font-size: 15px; color: var(--ink-dim); line-height: 1.75;
    max-width: 600px; margin-bottom: 44px;
    animation: svhIn .7s .16s cubic-bezier(.16,1,.3,1) both;
  }
  .svh-ctas{
    display: flex; flex-wrap: wrap; gap: 14px;
    animation: svhIn .7s .22s cubic-bezier(.16,1,.3,1) both;
  }
  .svh-cta-primary{
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--acc); color: var(--acc-fg);
    font-size: 12px; letter-spacing: .08em; text-transform: uppercase; font-weight: 600;
    padding: 15px 28px; border-radius: 999px;
    transition: transform .25s ease, box-shadow .25s ease;
    box-shadow: 0 18px 40px color-mix(in oklch, var(--acc) 25%, transparent);
  }
  .svh-cta-primary:hover{ transform: translateY(-2px); }
`;

// ─── Lightbox ──────────────────────────────────────────────────────────────
function Lightbox({ image, title, sub, onClose, theme }: { image: string; title: string; sub: string; onClose: () => void; theme: "light" | "dark" }) {
  const p = careersPalette(theme);  
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(8,6,4,0.92)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5vh 5vw",
        animation: "lightboxFadeIn 0.25s ease both",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: "24px",
          right: "28px",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.04)",
          color: "rgba(240,232,223,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s, color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,130,50,0.6)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,90,20,0.1)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgb(255,160,90)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
          (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,232,223,0.7)";
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(1100px, 92vw)",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "lightboxImgIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            maxWidth: "100%",
            maxHeight: "78vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: "4px",
            boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
          }}
        />
        <div style={{ marginTop: "18px", textAlign: "center" }}>
          <h3 style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: "18px",
            color: "#f0e8df",
            margin: 0,
            marginBottom: "4px",
          }}>
            {title}
          </h3>
          <p style={{
            fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)", margin: 0,
          }}>
            {sub}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Stories Gallery ─────────────────────────────
function CultureGallery({ theme }: { theme: "light" | "dark" }) {
  const p = careersPalette(theme);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState<number | null>(null);

  useEffect(() => {
    const hEl = headerRef.current;
    if (hEl) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { hEl.style.animation = "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both"; obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(hEl);
    }

    const gEl = gridRef.current;
    if (gEl) {
      const cards = gEl.querySelectorAll(".story-card");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("s-vis"); } });
        },
        { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
      );
      cards.forEach((c) => obs.observe(c));
      return () => obs.disconnect();
    }
  }, []);

  return (
  <section className="bg1 border-t border-white/5" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
  <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
  <p className="svh-eyebrow" style={{ marginBottom: "14px" }}>
    [LIFE AT JARVIS]
  </p>
  <h2 className="section-title" style={{ margin: 0 }}>
    Culture you can
    <br />
    <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: p.accent }}>
      feel in the room
    </em>
  </h2>
</div>

      <div
        ref={gridRef}
        className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14"
        style={{
          columnCount: 3,
          columnGap: "16px",
        }}
      >
        {CULTURE_STORIES.map((story, i) => (
          <div
            key={story.title}
            className="story-card"
            onClick={() => setActiveStory(i)}
            style={{
              breakInside: "avoid",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
              cursor: "pointer",
              background: p.cardBg,
            }}
          >
            <img
              src={story.image}
              alt={story.title}
              className="story-img"
              style={{
                display: "block",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        ))}
      </div>

      {activeStory !== null && (
       <Lightbox
  image={CULTURE_STORIES[activeStory].image}
  title={CULTURE_STORIES[activeStory].title}
  sub={CULTURE_STORIES[activeStory].sub}
  onClose={() => setActiveStory(null)}
  theme={theme}
/>
      )}
    </section>
  );
}

/// ─── Careers Hero ────────────────────
function CareersHero() {
  return (
    <section className="svh-hero">
      <div className="svh-inner">
        <div className="svh-hero-image">
          <img src={careersHeroImg} alt="Careers at Jarvis" />
        </div>
        <p className="svh-eyebrow">CAREERS · LIFE AT JARVIS</p>
        <h1 className="svh-title section-title">
          The next big thing is{" "}
          <br /> <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "var(--acc)" }}> 
            You
          </em>  <br />
        </h1>
        <p className="svh-sub">
          In the world of IT, you're either ahead of the curve or part of the past. We're looking for enthusiasts who are all ears for new ideas and ready to hit the ground running on global scales. At Jarvis, we don't just play the game; we change the way it's played.
        </p>
        <div className="svh-ctas">
          <a href="mailto:talent@jarvistechnolabs.com" className="svh-cta-primary">
            Shape the future <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Currently Hiring ──
function CurrentlyHiringSection({ theme }: { theme: "light" | "dark" }) {
  const p = careersPalette(theme);
  const headerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const hEl = headerRef.current;
    if (hEl) {
      hEl.style.animation = "fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both";
    }
    const t = setTimeout(() => setRevealed(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="border-t border-white/5" style={{ paddingTop: "6rem", paddingBottom: "7rem" }}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div
          ref={headerRef}
          style={{
            opacity: 0,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "24px",
            marginBottom: "48px",
          }}
        >
          <div>
            <p className="svh-eyebrow" style={{ marginBottom: "14px" }}>
              [OPEN ROLES]
            </p>
            <h2 className="section-title" style={{ margin: 0 }}>
              Currently hiring
              <br />
              <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "rgb(237, 99, 35)" }}>
                across the stack
              </em>
            </h2>
          </div>
          <p className="svh-sub" style={{ margin: 0, maxWidth: "340px" }}>
            Don't see your role? Write to{" "}
            <a href="mailto:talent@jarvistechnolabs.com" style={{ color: p.accent }}>
              talent@jarvistechnolabs.com
            </a>{" "}
            with what you want to do — if it lands in the quarter, we'll respond.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1.4fr 1.4fr 1.2fr auto",
            gap: "16px",
            padding: "0 0 16px",
            borderBottom: `1px solid ${p.line}`,
          }}
        >
          {["POSITION", "DEPARTMENT", "EXPERIENCE", "MODE", ""].map((h) => (
            <span key={h} style={{
              fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
              color: p.inkFaint,
            }}>
              {h}
            </span>
          ))}
        </div>

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {ROLES.map((r, i) => (
            <li
              key={r.title}
              className="role-row"
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.4fr 1.4fr 1.2fr auto",
                gap: "16px",
                alignItems: "center",
                padding: "26px 0",
                borderBottom: i < ROLES.length - 1 ? `1px solid ${p.lineSoft}` : "none",
                opacity: revealed ? 1 : 0,
                transform: revealed ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <h3 style={{
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontSize: "clamp(20px, 2.2vw, 28px)",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                color: p.ink,
                margin: 0,
              }}>
                {r.title}
              </h3>
              <span style={{ fontSize: "13px", color: p.inkDim }}>{r.dept}</span>
              <span style={{ fontSize: "13px", color: p.inkDim }}>{r.exp}</span>
              <span style={{
                display: "inline-flex", width: "fit-content",
                fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
                color: p.accent,
                border: `1px solid ${theme === "light" ? "rgba(237,99,35,0.35)" : "rgba(255,130,50,0.3)"}`,
                borderRadius: "999px",
                padding: "5px 12px",
              }}>
                {r.loc.split("·")[1]?.trim() ?? r.loc}
              </span>
              <Link
                to="/careers/$roleId"
                params={{ roleId: r.slug }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase",
                  color: p.accent,
                  border: `1px solid ${theme === "light" ? "rgba(237,99,35,0.3)" : "rgba(255,130,50,0.25)"}`,
                  borderRadius: "4px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "border-color 0.2s, color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = p.accent;
                  (e.currentTarget as HTMLAnchorElement).style.background = theme === "light" ? "rgba(237,99,35,0.08)" : "rgba(255,90,20,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = theme === "light" ? "rgba(237,99,35,0.3)" : "rgba(255,130,50,0.25)";
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                Apply →
              </Link>
            </li>
          ))}
        </ul>

        <p style={{
          marginTop: "32px", fontSize: "13px", lineHeight: 1.7,
          color: p.inkFaint,
        }}>
          * Please note that these are <em style={{ color: p.inkDim, fontStyle: "normal" }}>in-office</em> positions,
          and we are exclusively seeking local visionaries residing in Ahmedabad, Gujarat.
        </p>
      </div>
    </section>
  );
}

// ─── Benefits ──
function BenefitsSection({ theme }: { theme: "light" | "dark" }) {
  const p = careersPalette(theme);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hEl = headerRef.current;
    if (hEl) {
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { hEl.style.animation = "pkHeaderIn 0.9s cubic-bezier(0.22,1,0.36,1) both"; obs.disconnect(); } },
        { threshold: 0.2 }
      );
      obs.observe(hEl);
    }

    const gEl = gridRef.current;
    if (gEl) {
      const cards = gEl.querySelectorAll(".benefit-card");
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("b-vis"); } });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      cards.forEach((c) => obs.observe(c));
      return () => obs.disconnect();
    }
  }, []);

  return (
    <section className="bg1 border-t border-white/5" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
  <div ref={headerRef} className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14" style={{ opacity: 0 }}>
        <p className="svh-eyebrow" style={{ marginBottom: "14px" }}>
          [LIFE  AT JARVIS]
        </p>
        <h2 className="section-title" style={{ margin: 0, marginBottom: "16px" }}>
          Benefits designed
          <br />
          <em className="font-display" style={{ fontStyle: "italic", fontWeight: 400, color: "rgb(237, 99, 35)" }}>
            for the long time haul
          </em>
        </h2>
        <p className="svh-sub" style={{ margin: 0, maxWidth: "560px" }}>
          The non-headline stuff that makes year three feel as good as year one.
        </p>
      </div>

      <div
  ref={gridRef}
  className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 mb-14"
  style={{
    border: `1px solid ${p.line}`,
    borderRadius: "20px",
    overflow: "hidden",
  }}
>
  {(() => {
    const cols = 3;
    const rows: (typeof PERKS)[] = [];
    for (let i = 0; i < PERKS.length; i += cols) rows.push(PERKS.slice(i, i + cols));
    return rows.map((row, rIdx) => (
      <div
        key={rIdx}
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${row.length}, 1fr)`,
          borderBottom: rIdx < rows.length - 1 ? `1px solid ${p.line}` : "none",
        }}
      >
        {row.map((perk, cIdx) => (
          <div
            key={perk.num}
            className="benefit-card"
            style={{
              background: p.cardBg,
              padding: "56px 48px",
              minHeight: "220px",
              borderRight: cIdx < row.length - 1 ? `1px solid ${p.line}` : "none",
              borderLeft: "3px solid transparent",
              transition: "border-color 0.25s ease, background 0.25s ease",
            }}  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = p.accent;
                    (e.currentTarget as HTMLDivElement).style.background = theme === "light" ? "#fdf1ea" : "#100b08";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderLeftColor = "transparent";
                    (e.currentTarget as HTMLDivElement).style.background = p.cardBg;
                  }}
                >
                  <span style={{
                    display: "block",
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    color: p.inkFaint,
                    marginBottom: "22px",
                  }}>
                    {perk.num}
                  </span>
                  <h3 style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: "19px",
                    fontWeight: 600,
                    textTransform: "none",
                    letterSpacing: "0",
                    color: p.ink,
                    margin: 0,
                    marginBottom: "12px",
                    lineHeight: 1.3,
                  }}>
                    {perk.titlePlain} {perk.titleItalic}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "14px", lineHeight: 1.75, color: p.inkDim, margin: 0, fontWeight: 400 }}>
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          ));
        })()}
      </div>
    </section>
  );
}

// ─── Route & Page ─────────────────────────────────────────────────────────────
export const Route = createFileRoute("/careers/")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Jarvis Technolabs" },
      {
        name: "description",
        content: "Build a future you believe in. Join Jarvis Technolabs in Ahmedabad — open BDE and Quality Analyst roles.",
      },
      { property: "og:title", content: "Careers — Jarvis Technolabs" },
      {
        property: "og:description",
        content: "Building experiences that are happier, engaging and meaningful.",
      },
    ],
  }),
});

function CareersPage() {
  useReveal();
  const { theme, toggleTheme } = useThemeInit();
  return (
   <main className="bg-background text-foreground min-h-screen">
  <style>{KEYFRAMES}</style>
  <Nav theme={theme} onToggleTheme={toggleTheme} />

      <CareersHero />

      <CurrentlyHiringSection theme={theme} />
      <BenefitsSection theme={theme} />
      <CultureGallery theme={theme} />

      <Footer theme={theme} />
    </main>
  );
}