import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";

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

/* Responsive grid + sidebar behavior can't live in inline `style={{}}`
   objects (no media query support), so the two-column layout and the
   sticky sidebar are pulled into real CSS classes here. Below 900px the
   grid collapses to a single column and the sidebar drops its sticky
   positioning, so nothing gets squeezed or clipped on mobile. */
const JD_STYLES = `
.jd-grid{
  display:grid;
  grid-template-columns:1fr 320px;
  gap:2.5rem;
  align-items:start;
}
.jd-sidebar{
  position:sticky;
  top:100px;
}
@media (max-width:900px){
  .jd-grid{
    grid-template-columns:1fr;
    gap:1.5rem;
  }
  .jd-sidebar{
    position:static;
    top:auto;
  }
}
`;

export const Route = createFileRoute("/careers/$roleId/")({
  component: JobDetailPage,
  loader: ({ params }) => {
    const role = ROLES.find((r) => r.slug === params.roleId);
    if (!role) throw notFound();
    return role;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Job"} — Jarvis Technolabs` }],
  }),
});

function JobDetailPage() {
  const role = Route.useLoaderData();
  const { theme, toggleTheme } = useThemeInit();

  return (
    <main className="bg-background text-foreground min-h-screen" style={{ overflowX: "hidden" }}>
      <style>{JD_STYLES}</style>
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <section style={{ padding: "8rem 0 5rem", background: "var(--color-background)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: "10px",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              marginBottom: "18px",
            }}
          >
            Apply for
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 800,
              color: "var(--color-foreground)",
              margin: "0 0 2.5rem",
              lineHeight: 1.1,
            }}
          >
            {role.title}
          </h1>
<Link
  to="/careers"
  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
>
  ← Back to Careers
</Link>
          <div className="jd-grid">
            {/* LEFT: description */}
            <div
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "2rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "1rem", color: "var(--color-foreground)" }}>
                Job Description
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.8, color: "var(--color-muted-foreground)", marginBottom: "1.5rem" }}>
                {role.summary}
              </p>

              <h4 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem", color: "var(--color-foreground)" }}>
                Key Responsibilities
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {role.responsibilities.map((r) => (
                  <li
                    key={r}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "14px",
                      lineHeight: 1.7,
                      color: "var(--color-muted-foreground)",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "var(--color-primary)",
                        marginTop: "8px",
                      }}
                    />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT: requirements + apply */}
            <div
              className="jd-sidebar"
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: "var(--color-foreground)" }}>
                Requirements
              </h3>

              {[
                ["Work Experience", role.exp],
                ["Job Type", role.jobType],
                ["Posted On", role.postedOn],
                ["Department", role.dept],
              ].map(([label, value]) => (
                <div key={label} style={{ marginBottom: "1rem" }}>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-muted-foreground)", marginBottom: "2px" }}>
                    {label}
                  </p>
                  <p style={{ fontSize: "14px", color: "var(--color-foreground)", margin: 0 }}>{value}</p>
                </div>
              ))}

              <div style={{ marginBottom: "1.5rem" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-muted-foreground)", marginBottom: "6px" }}>
                  Skills
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {role.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: "11px",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "var(--color-muted)",
                        color: "var(--color-foreground)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/careers/$roleId/apply"
                params={{ roleId: role.slug }}
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "var(--color-primary)",
                  color: "var(--color-primary-foreground)",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: "0.9rem",
                  borderRadius: "10px",
                  textDecoration: "none",
                }}
              >
                Apply Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
}