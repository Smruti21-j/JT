import { useEffect } from "react";

const RECAPTCHA_SITE_KEY = "6LepWIUtAAAAAJyTSQ8gGHy_deuEu9Lr6LvNDNY4";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

/** Loads the Google reCAPTCHA v3 script once, no matter how many forms use it. */
export function useRecaptchaScript() {
  useEffect(() => {
    if (document.querySelector('script[src*="recaptcha"]')) return;
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);
  }, []);
}

/** Call this immediately before submitting — tokens expire in ~2 minutes and are single-use. */
export async function getRecaptchaToken(action = "submit"): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.grecaptcha) {
      reject(new Error("reCAPTCHA hasn't loaded yet. Please wait a moment and try again."));
      return;
    }
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(reject);
    });
  });
}