import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || "Darshil Modi";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 3;
const submissions = new Map<string, number[]>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) return false;

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "contact@darshilmodi.in",
      to,
      subject,
      html
    });
    return !result.error;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}

async function sendAdminNotification(name: string, email: string, subject: string, message: string): Promise<void> {
  if (!ADMIN_EMAIL) return;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; color: #202020;">
      <h2>New portfolio contact</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Subject:</strong> ${escapeHtml(subject || "(No subject)")}</p>
      <hr />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`;

  await sendEmail(ADMIN_EMAIL, `Portfolio contact: ${subject || "(No subject)"}`, html);
}

async function sendAutoReply(name: string, email: string): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 640px; color: #202020;">
      <h2>Thanks for reaching out, ${escapeHtml(name)}.</h2>
      <p>I received your message from darshilmodi.in and will review it soon.</p>
      <p>— ${escapeHtml(ADMIN_NAME)}</p>
    </div>`;

  await sendEmail(email, "Thanks for contacting Darshil Modi", html);
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

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Contact storage is not configured." }, { status: 500 });
  }

  const { error: dbError } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject,
    message,
    is_read: false,
    created_at: new Date().toISOString()
  });

  if (dbError) {
    console.error("Database error:", dbError);
    return NextResponse.json({ ok: false, error: "Failed to save message." }, { status: 500 });
  }

  Promise.all([sendAdminNotification(name, email, subject, message), sendAutoReply(name, email)]).catch((error) => {
    console.error("Error sending emails:", error);
  });

  return NextResponse.json({ ok: true });
}
