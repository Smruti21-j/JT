const MAILER_BASE = "http://mailer.jprojects.in/api";
const ACCESS_TOKEN = import.meta.env.VITE_MAILER_ACCESS_TOKEN as string;

export class MailerError extends Error {}

/** Verifies a fresh reCAPTCHA token with the backend. Throws MailerError on failure. */
async function verifyCaptcha(token: string): Promise<void> {
  const res = await fetch(`${MAILER_BASE}/captcha/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ captchaToken: token }),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new MailerError(data?.message || "Captcha verification failed. Please try again.");
  }
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: File[];
  /** reCAPTCHA action name — keep distinct per form for clearer analytics on Google's side */
  captchaAction?: string;
  captchaToken: string;
}

/** Verifies captcha, then sends the email with optional attachments. Throws MailerError on failure. */
export async function sendMail({
  to,
  subject,
  html,
  attachments = [],
  captchaToken,
}: SendEmailOptions): Promise<void> {
  if (!ACCESS_TOKEN) {
    throw new MailerError("Mailer access token is not configured (VITE_MAILER_ACCESS_TOKEN).");
  }

  await verifyCaptcha(captchaToken);

  const formData = new FormData();
  formData.append("To", to);
  formData.append("Subject", subject);
  formData.append("Html", html);
  attachments.forEach((file) => formData.append("Attachments", file));

  const res = await fetch(`${MAILER_BASE}/Email/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new MailerError(errText || "Failed to send email. Please try again.");
  }
}