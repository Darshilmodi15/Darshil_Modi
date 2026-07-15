import type { ReactNode } from "react";

export type EmailOptions = {
  to: string | string[];
  subject: string;
  react?: ReactNode;
  html?: string;
  text: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
};

export type EmailSendResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

let resendClient: import("resend").Resend | null = null;

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Missing environment variable: RESEND_API_KEY");
    return null;
  }

  if (!resendClient) {
    const { Resend } = require("resend") as typeof import("resend");
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function normalizeSender(value: string | undefined) {
  const fallback = "Darshil Modi <contact@darshilmodi.in>";
  const sender = (value || fallback).trim();

  if (/^[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+$/.test(sender)) {
    return `Darshil Modi <${sender}>`;
  }

  if (/^[^<>]+<[^<>\s@]+@[^<>\s@]+\.[^<>\s@]+>$/.test(sender)) {
    return sender;
  }

  console.error("CONTACT_FROM_EMAIL is invalid. Falling back to default sender.");
  return fallback;
}

function sanitizeTags(tags: EmailOptions["tags"]) {
  return (tags || []).map((tag) => ({
    name: tag.name.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50),
    value: tag.value.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 50)
  }));
}

export async function sendEmail(options: EmailOptions): Promise<EmailSendResult> {
  const resend = getResendClient();
  if (!resend) {
    return { ok: false, error: "Resend is not configured" };
  }

  try {
    const result = await resend.emails.send({
      from: normalizeSender(process.env.CONTACT_FROM_EMAIL),
      to: options.to,
      subject: options.subject,
      react: options.react,
      html: options.html,
      text: options.text,
      replyTo: options.replyTo,
      tags: sanitizeTags(options.tags)
    });

    if (result.error) {
      const message = result.error.message || "Unknown Resend error";
      console.error("[CONTACT_EMAIL_ERROR]", message);
      return { ok: false, error: message };
    }

    const id = result.data?.id;
    console.log("[CONTACT_EMAIL_SENT]", id || "no_id");
    return { ok: true, id };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown email error";
    console.error("[CONTACT_EMAIL_ERROR]", message);
    return { ok: false, error: message };
  }
}
