import { createFileRoute, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/CTA";
import { useThemeInit } from "@/hooks/use-theme-init";
import { useRecaptchaScript, getRecaptchaToken } from "@/hooks/use-recaptcha";
import { sendMail, MailerError } from "@/lib/mailer";
import { useRef, useState } from "react";

const ROLE_TITLES: Record<string, string> = {
  bde: "BDE",
  "quality-analyst": "Quality Analyst",
};

const RECIPIENT_EMAIL = "talent@jarvistechnolabs.com";

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
  padding: "1rem 1.1rem",
  borderRadius: "10px",
  border: "1px solid var(--color-border)",
  background: "var(--color-background)",
  color: "var(--color-foreground)",
  fontSize: "15px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground)",
  marginBottom: "8px",
  display: "block",
};

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: "1.3rem",
  fontWeight: 700,
  color: "var(--color-primary)",
  marginBottom: "1.75rem",
};

// ─── Drag-and-drop upload zone ───────────────────────────────────────────
function UploadZone({
  label,
  accept,
  fileTypeLabels,
  file,
  onFile,
  circular = false,
}: {
  label: string;
  accept: string;
  fileTypeLabels: string[];
  file: File | null;
  onFile: (f: File | null) => void;
  circular?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  return (
    <div>
      <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-foreground)", marginBottom: "1rem" }}>
        {label}
      </p>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onFile(f);
        }}
        style={{
          border: `2px dashed ${dragOver ? "var(--color-primary)" : "var(--color-border)"}`,
          borderRadius: "14px",
          padding: "2.5rem 1.5rem",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver
            ? "color-mix(in oklch, var(--color-primary) 6%, transparent)"
            : "color-mix(in oklch, var(--color-primary) 3%, transparent)",
          transition: "border-color 0.2s ease, background 0.2s ease",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: "none" }}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />

        {circular ? (
          <div
            style={{
              width: "84px",
              height: "84px",
              borderRadius: "50%",
              border: "2px dashed var(--color-border)",
              margin: "0 auto 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              background: "var(--color-muted)",
            }}
          >
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: "28px" }}>🙂</span>
            )}
          </div>
        ) : (
          <div style={{ fontSize: "28px", marginBottom: "0.75rem" }}>⬆️</div>
        )}

        <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-foreground)", marginBottom: "0.5rem" }}>
          {file ? file.name : `Upload or Drag your ${circular ? "photo" : "Resume"} here`}
        </p>
        {!file && (
          <>
            <p style={{ fontSize: "11px", color: "var(--color-muted-foreground)", marginBottom: "0.75rem" }}>
              — OR —
            </p>
            <span
              style={{
                display: "inline-block",
                fontSize: "13px",
                fontWeight: 600,
                padding: "0.5rem 1.2rem",
                borderRadius: "8px",
                background: "var(--color-muted)",
                color: "var(--color-foreground)",
              }}
            >
              Browse
            </span>
          </>
        )}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
        {fileTypeLabels.map((t) => (
          <span
            key={t}
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              padding: "3px 8px",
              borderRadius: "5px",
              background: "#111",
              color: "#fff",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ApplyPage() {
  const loaderData = Route.useLoaderData();
  const title = loaderData?.title ?? "this role";
  const { theme, toggleTheme } = useThemeInit();
  useRecaptchaScript();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    noticePeriod: "",
    highestQualification: "",
    currentEmployer: "",
    totalExperience: "",
    currentSalary: "",
    skillSet: "",
    street: "",
    zip: "",
    city: "",
    state: "",
    country: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setStatus("submitting");

    try {
      // Fresh token, generated right before the send — never reused, never stale
      const token = await getRecaptchaToken("apply_submit");

      const html = `
        <h2>New Application — ${title}</h2>
        <p><strong>Name:</strong> ${form.firstName} ${form.lastName}</p>
        <p><strong>Email:</strong> ${form.email}</p>
        <p><strong>Mobile:</strong> ${form.countryCode} ${form.mobile}</p>
        <p><strong>Notice Period:</strong> ${form.noticePeriod}</p>
        <hr/>
        <p><strong>Highest Qualification:</strong> ${form.highestQualification}</p>
        <p><strong>Current Employer:</strong> ${form.currentEmployer}</p>
        <p><strong>Total Experience:</strong> ${form.totalExperience} yrs</p>
        <p><strong>Current Salary:</strong> ${form.currentSalary} LPA</p>
        <p><strong>Skill Set:</strong> ${form.skillSet}</p>
        <hr/>
        <p><strong>Address:</strong> ${form.street}, ${form.city}, ${form.state}, ${form.country} ${form.zip}</p>
      `;

      const attachments = [resumeFile, photoFile].filter((f): f is File => f !== null);

      await sendMail({
        to: RECIPIENT_EMAIL,
        subject: `Application — ${title} — ${form.firstName} ${form.lastName}`,
        html,
        attachments,
        captchaToken: token,
      });

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof MailerError
          ? err.message
          : "Something went wrong sending your application. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <main className="bg-background text-foreground min-h-screen">
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <section style={{ padding: "10rem 0 6rem", textAlign: "center" }}>
          <div style={{ maxWidth: "520px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
            <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>
              Application sent
            </h1>
            <p style={{ fontSize: "15px", color: "var(--color-muted-foreground)" }}>
              Thanks for applying for {title}. Our talent team will review your details and get
              back to you soon.
            </p>
          </div>
        </section>
        <Footer theme={theme} />
      </main>
    );
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav theme={theme} onToggleTheme={toggleTheme} />

      <section style={{ padding: "9rem 0 7rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
          <p
            style={{
              fontFamily: "var(--font-mono, ui-monospace, monospace)",
              fontSize: "11px",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "var(--color-primary)",
              marginBottom: "20px",
            }}
          >
            Apply for
          </p>
          <h1 style={{ fontSize: "clamp(2.2rem,4.5vw,3.4rem)", fontWeight: 800, margin: "0 0 3rem" }}>
            {title}
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "28px",
              padding: "3.5rem",
              boxShadow: "0 30px 70px -40px rgba(0,0,0,0.25)",
            }}
          >
            {/* ── Basic Info ── */}
            <h3 style={sectionHeadingStyle}>Basic Info</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.75rem" }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
              <div>
                <label style={labelStyle}>Mobile *</label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <select
                    style={{ ...inputStyle, width: "110px", flexShrink: 0 }}
                    value={form.countryCode}
                    onChange={update("countryCode")}
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <input
                    required
                    style={inputStyle}
                    placeholder="98765 43210"
                    value={form.mobile}
                    onChange={update("mobile")}
                  />
                </div>
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

            {/* ── Professional Details ── */}
            <h3 style={sectionHeadingStyle}>Professional Details</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.75rem" }}>
              <div>
                <label style={labelStyle}>Highest Qualification Held *</label>
                <select
                  required
                  style={inputStyle}
                  value={form.highestQualification}
                  onChange={update("highestQualification")}
                >
                  <option value="">Select</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Current Employer *</label>
                <input
                  required
                  style={inputStyle}
                  value={form.currentEmployer}
                  onChange={update("currentEmployer")}
                />
              </div>
              <div>
                <label style={labelStyle}>Total Experience (in Year) *</label>
                <input
                  required
                  style={inputStyle}
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.totalExperience}
                  onChange={update("totalExperience")}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
              <div>
                <label style={labelStyle}>Current Salary (in LPA) *</label>
                <input
                  required
                  style={inputStyle}
                  type="number"
                  min="0"
                  step="0.1"
                  value={form.currentSalary}
                  onChange={update("currentSalary")}
                />
              </div>
              <div>
                <label style={labelStyle}>Skill Set *</label>
                <input
                  required
                  style={inputStyle}
                  placeholder="e.g. React, Node.js, SQL"
                  value={form.skillSet}
                  onChange={update("skillSet")}
                />
              </div>
            </div>

            {/* ── Address Details ── */}
            <h3 style={sectionHeadingStyle}>Address Details</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div>
                <label style={labelStyle}>Street</label>
                <input style={inputStyle} value={form.street} onChange={update("street")} />
              </div>
              <div>
                <label style={labelStyle}>Zip / Postal Code</label>
                <input style={inputStyle} value={form.zip} onChange={update("zip")} />
              </div>
              <div>
                <label style={labelStyle}>City *</label>
                <input required style={inputStyle} value={form.city} onChange={update("city")} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
              <div>
                <label style={labelStyle}>State / Province</label>
                <input style={inputStyle} value={form.state} onChange={update("state")} />
              </div>
              <div>
                <label style={labelStyle}>Country *</label>
                <select required style={inputStyle} value={form.country} onChange={update("country")}>
                  <option value="">Select</option>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="UAE">UAE</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ height: "1px", background: "var(--color-border)", marginBottom: "2.5rem" }} />

            {/* ── Uploads ── */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", marginBottom: "3rem" }}>
              <UploadZone
                label="Upload Resume/CV"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                fileTypeLabels={["PDF", "DOC", "DOCX", "JPG", "JPEG", "PNG"]}
                file={resumeFile}
                onFile={setResumeFile}
              />
              <UploadZone
                label="Upload Profile Picture"
                accept=".jpg,.jpeg,.png"
                fileTypeLabels={["JPG", "PNG", "JPEG"]}
                file={photoFile}
                onFile={setPhotoFile}
                circular
              />
            </div>

            {errorMsg && (
              <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "1rem" }}>{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              style={{
                marginTop: "2rem",
                width: "100%",
                background: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
                fontWeight: 700,
                fontSize: "14px",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "1.05rem",
                borderRadius: "12px",
                border: "none",
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                opacity: status === "submitting" ? 0.7 : 1,
              }}
            >
              {status === "submitting" ? "Sending…" : "Send Application"}
            </button>

            <p style={{ fontSize: "10.5px", color: "var(--color-muted-foreground)", marginTop: "14px", textAlign: "center" }}>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">Terms of Service</a> apply.
            </p>
          </form>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
}