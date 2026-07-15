import { randomUUID } from "crypto";
import { createElement } from "react";
import { ContactAdminEmail } from "@/components/emails/contact-admin-email";
import { ContactConfirmationEmail } from "@/components/emails/contact-confirmation-email";
import { sendEmail, type EmailSendResult } from "@/lib/email";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || "Darshil Modi";
const CONTACT_REPLY_TO_EMAIL = process.env.CONTACT_REPLY_TO_EMAIL || "darshilmodi99@gmail.com";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

type ContactStorageResult = {
  stored: boolean;
  submissionId?: string;
  createdAt: string;
  error?: string;
};

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    submissions.set(ip, recent);
    return true;
  }
  submissions.set(ip, [...recent, now]);
  return false;
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata"
  }).format(new Date(date));
}

function buildAdminText(input: { name: string; email: string; subject: string; message: string; submittedAt: string; submissionId?: string; storageWarning?: string }) {
  return [
    "DARSHIL MODI - Portfolio contact",
    input.storageWarning ? `Storage warning: ${input.storageWarning}` : undefined,
    `Sender: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    `Submitted: ${input.submittedAt}`,
    `Source: darshilmodi.in${input.submissionId ? ` / ${input.submissionId}` : ""}`,
    "",
    "Message:",
    input.message
  ].filter(Boolean).join("\n");
}

function buildConfirmationText(input: { firstName: string; subject: string; message: string; submittedAt: string }) {
  return [
    `Thanks for reaching out, ${input.firstName}.`,
    "",
    "I received your message and will read it soon. Here is a quick copy of what you sent.",
    "",
    `Subject: ${input.subject}`,
    `Date submitted: ${input.submittedAt}`,
    "",
    "Your message:",
    input.message,
    "",
    "You can reply directly to this email if you need to add anything.",
    "",
    "Darshil Modi",
    "AI/ML and Software Engineering",
    "https://darshilmodi.in"
  ].join("\n");
}

async function storeContactMessage(input: { name: string; email: string; subject: string; message: string }): Promise<ContactStorageResult> {
  const createdAtFallback = new Date().toISOString();
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    console.error("[CONTACT_DB_ERROR] Supabase admin client is not configured");
    return { stored: false, createdAt: createdAtFallback, error: "Supabase is not configured" };
  }

  const { data, error } = await supabase
    .from("contact_messages")
    .insert({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.message,
      is_read: false
    })
    .select("id, created_at")
    .single();

  if (error) {
    console.error("[CONTACT_DB_ERROR]", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    return { stored: false, createdAt: createdAtFallback, error: error.message };
  }

  return { stored: true, submissionId: data.id, createdAt: data.created_at || createdAtFallback };
}

async function sendAdminNotification(input: { name: string; email: string; subject: string; message: string; submittedAt: string; submissionId?: string; storageWarning?: string; idempotencyKey: string }): Promise<EmailSendResult> {
  if (!ADMIN_EMAIL) {
    console.error("Missing environment variable: ADMIN_EMAIL");
    return { ok: false, error: "ADMIN_EMAIL is not configured" };
  }

  const result = await sendEmail({
    to: ADMIN_EMAIL,
    subject: `New portfolio message from ${input.name}: ${input.subject}`,
    react: createElement(ContactAdminEmail, { name: input.name, email: input.email, subject: input.subject, message: input.message, submittedAt: input.submittedAt, submissionId: input.submissionId, storageWarning: input.storageWarning }),
    text: buildAdminText(input),
    replyTo: input.email,
    tags: [
      { name: "source", value: "portfolio_contact" },
      { name: "type", value: "admin_notification" },
      { name: "submission", value: input.idempotencyKey }
    ]
  });

  if (!result.ok) {
    console.error("[CONTACT_ADMIN_EMAIL_ERROR]", result.error || "Unknown admin email error");
  }

  return result;
}

async function sendConfirmationEmail(input: { name: string; email: string; subject: string; message: string; submittedAt: string; idempotencyKey: string }): Promise<EmailSendResult> {
  const visitorFirstName = firstName(input.name);
  const result = await sendEmail({
    to: input.email,
    subject: `I received your message, ${visitorFirstName}`,
    react: createElement(ContactConfirmationEmail, { firstName: visitorFirstName, subject: input.subject, message: input.message, submittedAt: input.submittedAt }),
    text: buildConfirmationText({ firstName: visitorFirstName, subject: input.subject, message: input.message, submittedAt: input.submittedAt }),
    replyTo: CONTACT_REPLY_TO_EMAIL,
    tags: [
      { name: "source", value: "portfolio_contact" },
      { name: "type", value: "visitor_confirmation" },
      { name: "submission", value: input.idempotencyKey }
    ]
  });

  if (!result.ok) {
    console.error("[CONTACT_CONFIRMATION_EMAIL_ERROR]", result.error || "Unknown confirmation email error");
  }

  return result;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (body?.website) {
    return NextResponse.json({ ok: true });
  }

  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const subject = String(body?.subject || "").trim();
  const message = String(body?.message || "").trim();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ ok: false, error: "Please fill in name, email, subject, and message." }, { status: 400 });
  }

  if (name.length < 2 || subject.length < 3 || message.length < 20) {
    return NextResponse.json({ ok: false, error: "Please provide a little more detail before sending." }, { status: 400 });
  }

  if (message.length > 4000 || subject.length > 120) {
    return NextResponse.json({ ok: false, error: "Message is too long." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const ip = getClientIP(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later or use LinkedIn." }, { status: 429 });
  }

  const idempotencyKey = randomUUID();
  const storage = await storeContactMessage({ name, email, subject, message });
  const submittedAt = formatDate(storage.createdAt);
  const storageWarning = storage.stored ? undefined : "The message was delivered by email but could not be saved.";

  const [adminResult, confirmationResult] = await Promise.all([
    sendAdminNotification({ name, email, subject, message, submittedAt, submissionId: storage.submissionId || idempotencyKey, storageWarning, idempotencyKey }),
    sendConfirmationEmail({ name, email, subject, message, submittedAt, idempotencyKey })
  ]);

  if (!storage.stored && !adminResult.ok) {
    return NextResponse.json(
      { ok: false, error: "Message could not be saved or emailed. Please contact me directly by email or LinkedIn." },
      { status: 500 }
    );
  }

  const response = {
    ok: true,
    submissionId: storage.submissionId,
    stored: storage.stored,
    adminEmailSent: adminResult.ok,
    confirmationEmailSent: confirmationResult.ok,
    warning: storage.stored ? undefined : "The message was delivered by email but could not be saved.",
    ...(process.env.NODE_ENV !== "production"
      ? {
          debug: {
            adminEmailId: adminResult.id,
            confirmationEmailId: confirmationResult.id,
            storageError: storage.error,
            adminEmailError: adminResult.error,
            confirmationEmailError: confirmationResult.error
          }
        }
      : {})
  };

  return NextResponse.json(response);
}
