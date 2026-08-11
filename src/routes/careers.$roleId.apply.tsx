import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import { useState } from "react";

const ROLE_TITLES: Record<string, string> = {
  bde: "BDE",
  "quality-analyst": "Quality Analyst",
};

export const Route = createFileRoute("/careers/$roleId/apply")({
  component: ApplyPage,
  loader: ({ params }) => {
    const title = ROLE_TITLES[params.roleId];
    if (!title) throw notFound();
    return { title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Apply — ${loaderData?.title ?? "Job"} — Jarvis Technolabs` }],
  }),
});

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.9rem",
  borderRadius: "8px",
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  fontSize: "14px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground)",
  marginBottom: "6px",
  display: "block",
};
function ApplyPage() {
  const loaderData = Route.useLoaderData();
  const title = loaderData?.title ?? "this role";
  const { theme, toggleTheme } = useThemeInit();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    noticePeriod: "",
  });

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Application — ${title}`;
    const body = [
      `Position: ${title}`,
      `First Name: ${form.firstName}`,
      `Last Name: ${form.lastName}`,
      `Email: ${form.email}`,
      `Mobile: ${form.mobile}`,
      `Notice Period: ${form.noticePeriod}`,
    ].join("\n");
    window.location.href = `mailto:talent@jarvistechnolabs.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <section style={{ padding: "8rem 0 6rem" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
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
          <h1 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, margin: "0 0 2.5rem" }}>
            {title}
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "20px",
              padding: "2.5rem",
            }}
          >
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-primary)", marginBottom: "1.5rem" }}>
              Basic Info
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input required style={inputStyle} value={form.firstName} onChange={update("firstName")} />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input required style={inputStyle} value={form.lastName} onChange={update("lastName")} />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input required type="email" style={inputStyle} value={form.email} onChange={update("email")} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "0.5rem" }}>
              <div>
                <label style={labelStyle}>Mobile *</label>
                <input required style={inputStyle} placeholder="+91" value={form.mobile} onChange={update("mobile")} />
              </div>
              <div>
                <label style={labelStyle}>Notice Period *</label>
                <select required style={inputStyle} value={form.noticePeriod} onChange={update("noticePeriod")}>
                  <option value="">Select</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                  <option value="Freshers Not Applicable">Freshers Not Applicable</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{
                marginTop: "1.5rem",
                width: "100%",
                background: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
                fontWeight: 700,
                fontSize: "13px",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                padding: "0.9rem",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Application
            </button>
          </form>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
}